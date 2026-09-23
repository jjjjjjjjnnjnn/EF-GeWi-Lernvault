// BM25 词法倒排检索引擎 (德文/中文多语言支持)
// 适用于法律法条 (Art. 9 GG)、德语复合词以及中文对照的精准关键词定位

export interface BM25Doc {
  id: string;
  thema: string;
  text: string;
  tags?: string[];
  fach?: string;
}

export interface BM25Options {
  k1?: number; // 词频饱和度，默认 1.2
  b?: number;  // 长度归一化权重，默认 0.75
  themaWeight?: number; // 标题加权，默认 3.0
  tagsWeight?: number;  // 标签加权，默认 2.0
}

// 常见德语基础停用词 (避免无意义词汇淹没倒排索引)
const DE_STOPWORDS = new Set([
  "aber", "als", "am", "an", "auch", "auf", "aus", "bei", "bin", "bis", "bist",
  "da", "dadurch", "daher", "darum", "das", "dass", "dein", "deine", "dem",
  "den", "der", "des", "dessen", "deshalb", "die", "dies", "diese", "dieser",
  "dieses", "doch", "dort", "du", "durch", "ein", "eine", "einem", "einen",
  "einer", "eines", "er", "es", "euer", "eure", "für", "hatte", "hatten",
  "hier", "hin", "hinter", "ich", "ihr", "ihre", "im", "in", "ist", "ja",
  "jede", "jedem", "jeden", "jeder", "jedes", "kann", "können", "könnte",
  "machen", "man", "mit", "nach", "nein", "nicht", "noch", "nun", "nur",
  "oder", "sehr", "sein", "seine", "sind", "so", "soll", "sollte", "über",
  "um", "und", "uns", "unser", "unter", "vom", "von", "vor", "wann", "war",
  "waren", "was", "weiter", "weitere", "wenn", "wer", "werde", "werden",
  "wie", "wieder", "will", "wir", "wird", "wirst", "wo", "zu", "zum", "zur"
]);

/**
 * 多语言分词器：
 * 1. 德语/拉丁语系按标点、空格、连字符分词并小写化，剔除单字符标点与停用词。
 * 2. 中文字符逐字与二元切分 (bi-gram) 以支持中文检索。
 */
export function tokenize(text: string): string[] {
  if (!text) return [];
  const tokens: string[] = [];
  const normalized = text.toLowerCase();

  // 1. 匹配法律法规条文结构 (如 "art. 9", "abs. 3", "§ 20")
  const legalMatches = normalized.match(/(?:art\.|artikel|abs\.|absatz|§)\s*\d+[a-z]?/gu) || [];
  for (const lm of legalMatches) {
    tokens.push(lm.replace(/\s+/, " "));
  }

  // 2. 提取拉丁/数字/连字符词元
  const latinMatches = normalized.match(/[\p{L}\p{N}]+(?:[-.][\p{L}\p{N}]+)*/gu) || [];
  for (const token of latinMatches) {
    const clean = token.replace(/^[.-]+|[.-]+$/g, "");
    if (!clean) continue;
    // 如果包含连字符，同时将拆分的单子词加入
    if (clean.includes("-")) {
      for (const part of clean.split("-")) {
        if (part.length >= 2 && !DE_STOPWORDS.has(part)) tokens.push(part);
      }
    }
    if ((clean.length >= 2 || /\d/.test(clean)) && !DE_STOPWORDS.has(clean)) {
      tokens.push(clean);
    }
  }

  // 3. 提取 CJK 字符并生成 unigram & bigram
  const cjkChars: string[] = [];
  for (const char of text) {
    if (/[\u4e00-\u9fff]/.test(char)) {
      cjkChars.push(char);
    }
  }
  for (let i = 0; i < cjkChars.length; i++) {
    tokens.push(cjkChars[i]); // unigram
    if (i < cjkChars.length - 1) {
      tokens.push(cjkChars[i] + cjkChars[i + 1]); // bigram
    }
  }

  return tokens;
}

export interface Posting {
  docId: string;
  tf: number; // 考虑了字段权重的加权词频
}

export interface BM25SearchResult {
  id: string;
  score: number;
}

export class BM25Index {
  private k1: number;
  private b: number;
  private themaWeight: number;
  private tagsWeight: number;

  private postings = new Map<string, Posting[]>();
  private docLengths = new Map<string, number>();
  private docMap = new Map<string, BM25Doc>();
  private totalDocs = 0;
  private avgDocLength = 0;

  constructor(options: BM25Options = {}) {
    this.k1 = options.k1 ?? 1.2;
    this.b = options.b ?? 0.75;
    this.themaWeight = options.themaWeight ?? 3.0;
    this.tagsWeight = options.tagsWeight ?? 2.0;
  }

  /** 构建或重建 BM25 倒排索引 */
  public build(docs: BM25Doc[]): void {
    this.postings.clear();
    this.docLengths.clear();
    this.docMap.clear();
    this.totalDocs = docs.length;

    let totalLength = 0;

    for (const doc of docs) {
      this.docMap.set(doc.id, doc);

      // 计算字段加权词频
      const termFreqs = new Map<string, number>();

      const themaTokens = tokenize(doc.thema);
      for (const t of themaTokens) {
        termFreqs.set(t, (termFreqs.get(t) ?? 0) + this.themaWeight);
      }

      const tagsTokens = (doc.tags ?? []).flatMap((tg) => tokenize(tg));
      for (const t of tagsTokens) {
        termFreqs.set(t, (termFreqs.get(t) ?? 0) + this.tagsWeight);
      }

      const textTokens = tokenize(doc.text);
      for (const t of textTokens) {
        termFreqs.set(t, (termFreqs.get(t) ?? 0) + 1.0);
      }

      const docLen =
        themaTokens.length * this.themaWeight +
        tagsTokens.length * this.tagsWeight +
        textTokens.length;

      this.docLengths.set(doc.id, docLen);
      totalLength += docLen;

      // 填充倒排列表
      for (const [term, tf] of termFreqs.entries()) {
        let list = this.postings.get(term);
        if (!list) {
          list = [];
          this.postings.set(term, list);
        }
        list.push({ docId: doc.id, tf });
      }
    }

    this.avgDocLength = this.totalDocs > 0 ? totalLength / this.totalDocs : 1;
  }

  /** BM25 查询打分 */
  public search(query: string, topK = 20): BM25SearchResult[] {
    if (!query.trim() || this.totalDocs === 0) return [];

    const queryTokens = tokenize(query);
    if (queryTokens.length === 0) return [];

    const scores = new Map<string, number>();
    const trimmedLower = query.trim().toLowerCase();

    for (const token of queryTokens) {
      const postingsList = this.postings.get(token);
      if (!postingsList || postingsList.length === 0) continue;

      // Robertson-Spärck Jones IDF (加 1 避免负值)
      const nq = postingsList.length;
      const idf = Math.log(1 + (this.totalDocs - nq + 0.5) / (nq + 0.5));

      for (const { docId, tf } of postingsList) {
        const docLen = this.docLengths.get(docId) ?? this.avgDocLength;
        const normFactor = 1 - this.b + this.b * (docLen / this.avgDocLength);
        const termScore = idf * ((tf * (this.k1 + 1)) / (tf + this.k1 * normFactor));

        scores.set(docId, (scores.get(docId) ?? 0) + termScore);
      }
    }

    // 精确短语加分 (Exact Phrase Boost)
    // 如果文档全文或标题包含完整查询字符串，给予显著额外加权
    for (const [docId, baseScore] of scores.entries()) {
      const doc = this.docMap.get(docId);
      if (!doc) continue;
      let boost = 0;
      if (doc.thema.toLowerCase().includes(trimmedLower)) {
        boost += 5.0;
      }
      if (doc.text.toLowerCase().includes(trimmedLower)) {
        boost += 2.5;
      }
      if (boost > 0) {
        scores.set(docId, baseScore + boost);
      }
    }

    return Array.from(scores.entries())
      .map(([id, score]) => ({ id, score }))
      .sort((a, b) => b.score - a.score)
      .slice(0, topK);
  }
}
