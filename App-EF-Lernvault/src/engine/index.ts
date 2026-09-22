// Einheitliche retrieval-schicht (Phase A): exakte substring-suche (altes
// verhalten, garantiert keine regression) ∪ fuse.js fuzzy-suche (typos,
// cjk-teilstrings). Module filtern ueber ids, ranking-reihenfolge = quellreihenfolge.
import Fuse from "fuse.js";

export interface IndexDoc {
  id: string;
  thema: string;
  sub: string;
  text: string;
}

export interface SearchIndex {
  query: (q: string) => string[];
}

export function buildSearchIndex(docs: IndexDoc[]): SearchIndex {
  const fuse = new Fuse(docs, {
    keys: [
      { name: "thema", weight: 2 },
      { name: "sub", weight: 1 },
      { name: "text", weight: 1 },
    ],
    threshold: 0.45,
    ignoreLocation: true,
  });
  return {
    query: (q: string): string[] => {
      const needle = q.trim().toLowerCase();
      if (!needle) return docs.map((d) => d.id);
      // praezision zuerst: exakte treffer schlagen fuzzy (kein ueber-recall,
      // z.b. bei pfad-queries wie "08_SoWi/v.md").
      const exact = docs.filter(
        (d) =>
          d.thema.toLowerCase().includes(needle) ||
          d.sub.toLowerCase().includes(needle) ||
          d.text.toLowerCase().includes(needle)
      );
      if (exact.length > 0) return exact.map((d) => d.id);
      const hit = new Set<string>();
      for (const r of fuse.search(q.trim())) hit.add(r.item.id);
      return docs.filter((d) => hit.has(d.id)).map((d) => d.id);
    },
  };
}
