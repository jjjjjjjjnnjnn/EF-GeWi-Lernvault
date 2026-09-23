// Reciprocal Rank Fusion (RRF) 混合检索引擎
// 结合 BM25 词法排序与 Vector 语义排序，实现毫秒级高精度知识库召回

import { BM25Index, type BM25Doc } from "./bm25";
import { cosSim } from "./embed";

export interface SearchFilter {
  fach?: string;
  klausurrelevant?: boolean;
  operatoren?: string[];
  tags?: string[];
}

export interface HybridSearchDoc extends BM25Doc {
  operatoren?: string[];
  klausurrelevant?: boolean;
  embedding?: number[];
}

export interface RRFSearchResult {
  id: string;
  score: number;
  bm25Rank?: number;
  vectorRank?: number;
  doc: HybridSearchDoc;
}

export interface RRFOptions {
  k?: number;          // RRF 常数，默认 60
  bm25Weight?: number; // BM25 权重，默认 1.0
  vectorWeight?: number; // 向量语义权重，默认 1.0
}

export class RRFSearchEngine {
  private bm25: BM25Index;
  private docs: HybridSearchDoc[] = [];
  private docMap = new Map<string, HybridSearchDoc>();
  private k: number;
  private bm25Weight: number;
  private vectorWeight: number;

  constructor(options: RRFOptions = {}) {
    this.k = options.k ?? 60;
    this.bm25Weight = options.bm25Weight ?? 1.0;
    this.vectorWeight = options.vectorWeight ?? 1.0;
    this.bm25 = new BM25Index();
  }

  /** 构建或刷新文档池与倒排索引 */
  public build(docs: HybridSearchDoc[]): void {
    this.docs = docs;
    this.docMap.clear();
    for (const d of docs) {
      this.docMap.set(d.id, d);
    }
    this.bm25.build(docs);
  }

  /**
   * 执行 RRF 融合搜索
   * @param query 用户查询词
   * @param queryVector 可选的用户查询向量 (如已加载 L1/L2 向量引擎)
   * @param filter 可选的多维度考纲/学科过滤条件
   * @param topK 返回前 K 条结果
   */
  public search(
    query: string,
    queryVector?: number[],
    filter?: SearchFilter,
    topK = 15
  ): RRFSearchResult[] {
    const trimmed = query.trim();
    if (!trimmed && !queryVector) return [];

    // 1. 获取 BM25 排序列表
    const bm25Hits = trimmed ? this.bm25.search(trimmed, this.docs.length) : [];
    const bm25RankMap = new Map<string, number>();
    bm25Hits.forEach((hit, idx) => {
      bm25RankMap.set(hit.id, idx + 1); // 1-based rank
    });

    // 2. 获取 Vector 排序列表 (如果传入了 queryVector)
    const vectorRankMap = new Map<string, number>();
    if (queryVector && queryVector.length > 0) {
      const vectorHits: { id: string; sim: number }[] = [];
      for (const doc of this.docs) {
        if (doc.embedding && doc.embedding.length === queryVector.length) {
          const sim = cosSim(queryVector, doc.embedding);
          vectorHits.push({ id: doc.id, sim });
        }
      }
      vectorHits.sort((a, b) => b.sim - a.sim);
      vectorHits.forEach((hit, idx) => {
        vectorRankMap.set(hit.id, idx + 1);
      });
    }

    // 3. 计算所有候选文档的 RRF 融合得分
    const candidateIds = new Set<string>([
      ...bm25RankMap.keys(),
      ...vectorRankMap.keys(),
    ]);

    const scoredResults: RRFSearchResult[] = [];

    for (const id of candidateIds) {
      const doc = this.docMap.get(id);
      if (!doc) continue;

      // 评估过滤条件
      if (filter) {
        if (filter.fach && doc.fach && doc.fach !== filter.fach) continue;
        if (
          filter.klausurrelevant !== undefined &&
          doc.klausurrelevant !== undefined &&
          doc.klausurrelevant !== filter.klausurrelevant
        ) {
          continue;
        }
        if (filter.operatoren && filter.operatoren.length > 0) {
          const docOps = doc.operatoren ?? [];
          const hasOp = filter.operatoren.some((op) => docOps.includes(op));
          if (!hasOp) continue;
        }
        if (filter.tags && filter.tags.length > 0) {
          const docTags = doc.tags ?? [];
          const hasTag = filter.tags.some((tag) => docTags.includes(tag));
          if (!hasTag) continue;
        }
      }

      const bm25Rank = bm25RankMap.get(id);
      const vectorRank = vectorRankMap.get(id);

      let rrfScore = 0;
      if (bm25Rank !== undefined) {
        rrfScore += this.bm25Weight / (this.k + bm25Rank);
      }
      if (vectorRank !== undefined) {
        rrfScore += this.vectorWeight / (this.k + vectorRank);
      }

      scoredResults.push({
        id,
        score: rrfScore,
        bm25Rank,
        vectorRank,
        doc,
      });
    }

    // 4. 按 RRF 融合得分由高到低排序截断
    return scoredResults.sort((a, b) => b.score - a.score).slice(0, topK);
  }
}
