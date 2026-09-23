import Fuse from "fuse.js";
import { BM25Index, normalizeSearchText, type BM25Doc } from "./bm25";

export { normalizeSearchText } from "./bm25";

export interface IndexDoc {
  id: string;
  thema: string;
  sub: string;
  text: string;
  fach?: string;
  tags?: string[];
  datum?: string;
}

export type SearchRankingHook = (doc: IndexDoc) => number;

export interface SearchIndexOptions {
  rankingWeight?: SearchRankingHook;
}

export interface SearchIndex {
  query: (q: string) => string[];
}

interface SearchDocument {
  id: string;
  thema: string;
  sub: string;
  text: string;
  fach: string;
  tags: string[];
  order: number;
}

interface Candidate {
  id: string;
  order: number;
  exactField: number;
  exactPosition: number;
  bm25Rank: number;
  fuseRank: number;
  score: number;
}

function exactMatch(document: SearchDocument, query: string): { field: number; position: number } {
  const titlePosition = document.thema.indexOf(query);
  if (titlePosition >= 0) return { field: 0, position: titlePosition };

  const subjectPositions = [document.sub.indexOf(query), document.fach.indexOf(query)].filter(
    (position) => position >= 0
  );
  if (subjectPositions.length > 0) {
    return { field: 1, position: Math.min(...subjectPositions) };
  }

  const bodyPosition = document.text.indexOf(query);
  if (bodyPosition >= 0) return { field: 2, position: bodyPosition };
  return { field: 3, position: 0 };
}

export function buildSearchIndex(
  docs: IndexDoc[],
  options: SearchIndexOptions | SearchRankingHook = {}
): SearchIndex {
  const config: SearchIndexOptions = typeof options === "function" ? { rankingWeight: options } : options;
  const rankingWeight = config.rankingWeight;
  const originalById = new Map(docs.map((doc) => [doc.id, doc]));
  const searchDocuments: SearchDocument[] = docs.map((doc, order) => ({
    id: doc.id,
    thema: normalizeSearchText(doc.thema),
    sub: normalizeSearchText(doc.sub),
    text: normalizeSearchText(doc.text),
    fach: normalizeSearchText(doc.fach ?? ""),
    tags: (doc.tags ?? []).map((tag) => normalizeSearchText(tag)),
    order,
  }));
  const documentById = new Map(searchDocuments.map((document) => [document.id, document]));

  const fuse = new Fuse<SearchDocument>(searchDocuments, {
    keys: [
      { name: "thema", weight: 2 },
      { name: "sub", weight: 1 },
      { name: "fach", weight: 1 },
      { name: "text", weight: 1 },
    ],
    threshold: 0.45,
    ignoreLocation: true,
  });

  const bm25 = new BM25Index();
  const bm25Docs: BM25Doc[] = searchDocuments.map((document) => ({
    id: document.id,
    thema: document.thema,
    text: `${document.fach} ${document.sub} ${document.text}`.trim(),
    tags: document.tags,
    fach: document.fach,
  }));
  bm25.build(bm25Docs);

  return {
    query: (q: string): string[] => {
      const trimmed = q.trim();
      if (!trimmed) return docs.map((doc) => doc.id);

      const normalizedQuery = normalizeSearchText(trimmed);
      if (!normalizedQuery) return [];

      const candidates = new Map<string, Candidate>();
      const getCandidate = (document: SearchDocument): Candidate => {
        const existing = candidates.get(document.id);
        if (existing) return existing;
        const exact = exactMatch(document, normalizedQuery);
        const original = originalById.get(document.id);
        const weight = original && rankingWeight ? rankingWeight(original) : 0;
        const candidate: Candidate = {
          id: document.id,
          order: document.order,
          exactField: exact.field,
          exactPosition: exact.position,
          bm25Rank: 0,
          fuseRank: 0,
          score: Number.isFinite(weight) ? weight : 0,
        };
        candidates.set(document.id, candidate);
        return candidate;
      };

      let hasExactMatch = false;
      for (const document of searchDocuments) {
        if (exactMatch(document, normalizedQuery).field < 3) {
          hasExactMatch = true;
          getCandidate(document);
        }
      }

      if (hasExactMatch) {
        return Array.from(candidates.values())
          .sort((a, b) => {
            if (a.exactField !== b.exactField) return a.exactField - b.exactField;
            if (Math.abs(a.score - b.score) > 1e-12) return b.score - a.score;
            if (a.exactPosition !== b.exactPosition) return a.exactPosition - b.exactPosition;
            return a.order - b.order;
          })
          .map((candidate) => candidate.id);
      }

      const bm25Hits = bm25.search(normalizedQuery, Math.max(1, searchDocuments.length));
      for (let index = 0; index < bm25Hits.length; index++) {
        const document = documentById.get(bm25Hits[index].id);
        if (document) getCandidate(document).bm25Rank = index + 1;
      }

      if (searchDocuments.length > 0) {
        const fuseHits = fuse.search(normalizedQuery, { limit: searchDocuments.length });
        for (let index = 0; index < fuseHits.length; index++) {
          const document = documentById.get(fuseHits[index].item.id);
          if (document) getCandidate(document).fuseRank = index + 1;
        }
      }

      return Array.from(candidates.values())
        .map((candidate) => {
          const bm25Contribution = candidate.bm25Rank > 0 ? 1 / (60 + candidate.bm25Rank) : 0;
          const fuseContribution = candidate.fuseRank > 0 ? 1 / (60 + candidate.fuseRank) : 0;
          return { ...candidate, score: candidate.score + bm25Contribution + fuseContribution };
        })
        .sort((a, b) => {
          if (a.exactField !== b.exactField) return a.exactField - b.exactField;
          if (Math.abs(a.score - b.score) > 1e-12) return b.score - a.score;
          if (a.exactPosition !== b.exactPosition) return a.exactPosition - b.exactPosition;
          if (a.bm25Rank !== b.bm25Rank) {
            if (a.bm25Rank === 0) return 1;
            if (b.bm25Rank === 0) return -1;
            return a.bm25Rank - b.bm25Rank;
          }
          if (a.fuseRank !== b.fuseRank) {
            if (a.fuseRank === 0) return 1;
            if (b.fuseRank === 0) return -1;
            return a.fuseRank - b.fuseRank;
          }
          return a.order - b.order;
        })
        .map((candidate) => candidate.id);
    },
  };
}
