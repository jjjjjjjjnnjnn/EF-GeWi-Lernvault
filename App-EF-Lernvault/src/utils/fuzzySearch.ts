import type { KnowledgeNode } from "../engine/skillTree";
import { getSubjectTermDictionary } from "../i18n/nodeLocalization";

/**
 * 文本标准化：去重重音符号、小写化、德语变音符号等价映射 (ä->ae/a, ö->oe/o, ü->ue/u, ß->ss)
 */
export function normalizeSearchString(text: string): string {
  if (!text) return "";
  return text
    .normalize("NFD")
    .toLowerCase()
    .replace(/ä|a\u0308/g, "ae")
    .replace(/ö|o\u0308/g, "oe")
    .replace(/ü|u\u0308/g, "ue")
    .replace(/ß/g, "ss")
    .replace(/[\u0300-\u036f]/g, "") // 移除重音标
    .replace(/[&+\-_/\\|.,;:!?()[\]{}'"`~*#]/g, " ") // 标点符号统一为空格
    .replace(/\s+/g, " ")
    .trim();
}

/**
 * 模糊子序列判定 (Subsequence Match with Gap Penalty)
 * 检查 target 是否按序包含 token 中的所有字符
 */
function isSubsequenceMatch(target: string, token: string): boolean {
  if (token.length > target.length) return false;
  let targetIdx = 0;
  for (let tokenIdx = 0; tokenIdx < token.length; tokenIdx++) {
    const char = token[tokenIdx];
    const foundIdx = target.indexOf(char, targetIdx);
    if (foundIdx === -1) return false;
    targetIdx = foundIdx + 1;
  }
  return true;
}

/**
 * 简易编辑距离 (Levenshtein Distance)
 * 用于当输入字符数 >= 4 时的微小错别字容错 (1次字符错漏/插入/替换)
 */
function isLevenshteinClose(a: string, b: string, maxDist = 1): boolean {
  if (Math.abs(a.length - b.length) > maxDist) return false;
  let mismatches = 0;
  let i = 0;
  let j = 0;
  while (i < a.length && j < b.length) {
    if (a[i] !== b[j]) {
      mismatches++;
      if (mismatches > maxDist) return false;
      if (a.length > b.length) {
        i++;
      } else if (a.length < b.length) {
        j++;
      } else {
        i++;
        j++;
      }
    } else {
      i++;
      j++;
    }
  }
  return true;
}

/**
 * 单个查询词 (Token) 与目标文本的模糊匹配度评分
 * 返回 0 表示不匹配，> 0 表示匹配得分
 */
export function matchToken(normalizedTarget: string, token: string): number {
  if (!token) return 1;
  if (!normalizedTarget) return 0;

  // 1. 完全包含 (Exact Substring)
  const exactIndex = normalizedTarget.indexOf(token);
  if (exactIndex !== -1) {
    // 词首匹配赋予额外高分加权
    if (exactIndex === 0 || normalizedTarget[exactIndex - 1] === " ") {
      return 10 + (token.length / normalizedTarget.length) * 5;
    }
    return 6 + (token.length / normalizedTarget.length) * 3;
  }

  // 2. 单词词首前缀匹配
  const words = normalizedTarget.split(/\s+/).filter(Boolean);
  for (const w of words) {
    if (w.startsWith(token)) {
      return 8;
    }
  }

  // 3. 错别字容错 (仅当 token 长度 >= 4 时针对单个单词比对)
  if (token.length >= 4) {
    for (const w of words) {
      if (isLevenshteinClose(w, token, 1)) {
        return 4;
      }
    }
  }

  // 4. 连续子序列匹配 (例如 "prmech" 匹配 "preismechanismus")
  if (token.length >= 3 && isSubsequenceMatch(normalizedTarget.replace(/\s+/g, ""), token)) {
    return 3;
  }

  return 0;
}

/**
 * 多词查询与目标多字段比对：每个 token 必须在目标字段中至少命中一处 (AND 语义)
 */
export function fuzzyMatchFields(
  fieldValues: Array<string | undefined | null>,
  query: string
): { matched: boolean; score: number } {
  const trimmed = query.trim();
  if (!trimmed) return { matched: true, score: 0 };

  const rawTokens = trimmed.split(/\s+/).filter(Boolean);
  const normalizedTokens = rawTokens.map(normalizeSearchString).filter(Boolean);
  if (normalizedTokens.length === 0) return { matched: true, score: 0 };

  // 预先标准化所有待检测字段
  const normalizedFields = fieldValues
    .filter((f): f is string => Boolean(f && f.trim()))
    .map((f) => normalizeSearchString(f));

  if (normalizedFields.length === 0) return { matched: false, score: 0 };

  let totalScore = 0;

  // 每个 token 必须在至少一个字段中匹配
  for (const token of normalizedTokens) {
    let bestTokenScore = 0;
    for (let fIdx = 0; fIdx < normalizedFields.length; fIdx++) {
      const fieldText = normalizedFields[fIdx];
      const s = matchToken(fieldText, token);
      if (s > bestTokenScore) {
        // 前 2 个字段（通常是主副标题）权重更高
        const fieldWeight = fIdx === 0 ? 2.5 : fIdx === 1 ? 2.0 : 1.0;
        bestTokenScore = s * fieldWeight;
      }
    }

    if (bestTokenScore <= 0) {
      // 当前 token 未在任何字段命中，整体判定为不匹配
      return { matched: false, score: 0 };
    }

    totalScore += bestTokenScore;
  }

  return { matched: true, score: totalScore };
}

/**
 * 针对知识节点 (KnowledgeNode) 进行全语言、全要素模糊检索匹配
 */
export function fuzzyMatchNode(
  node: KnowledgeNode,
  query: string
): { matched: boolean; score: number } {
  if (!query.trim()) return { matched: true, score: 0 };

  // 获取该节点可能挂载的独立字典重载词汇
  const dict = getSubjectTermDictionary(node.fach);
  const override = dict ? dict[node.id] : undefined;

  // 收集节点包含的全部文本资源 (德、中、术语、标签、公式、易错点、代码)
  const candidateFields: Array<string | undefined | null> = [
    node.titleZH,
    node.titleDE,
    override?.zh,
    override?.de,
    node.id,
    node.fach,
    node.category,
    node.tags?.join(" "),
    node.summaryZH,
    node.summaryDE,
    node.keyFormulaOrSentence,
    node.klausurTip,
    node.commonFallacy,
    node.curriculumTier,
    node.linkedNoteId,
    node.linkedReiseId,
  ];

  return fuzzyMatchFields(candidateFields, query);
}

/**
 * 针对节点集合进行模糊过滤并按相关度得分降序排列
 */
export function fuzzyFilterAndRankNodes<T extends KnowledgeNode>(
  nodes: readonly T[],
  query: string
): T[] {
  if (!query.trim()) return [...nodes];

  const scored: Array<{ node: T; score: number }> = [];

  for (const node of nodes) {
    const res = fuzzyMatchNode(node, query);
    if (res.matched) {
      scored.push({ node, score: res.score });
    }
  }

  scored.sort((a, b) => b.score - a.score);
  return scored.map((item) => item.node);
}
