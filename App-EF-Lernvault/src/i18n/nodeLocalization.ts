import type { KnowledgeNode } from "../engine/skillTree";
import type { Lang, NodeLanguageMode, NodeLocalizedContent } from "./types";

/**
 * 知识图谱节点多语言本地化引擎 (Pluggable Node Localization Engine)
 * 
 * 核心特性：
 * 1. 消除“仅中文显示”痛点：支持 DE (德语考纲规范)、ZH (中文理解)、Bilingual (双语并置)；
 * 2. 模块化与插拔性：支持按学科挂载独立词典包 (Subject Dictionaries)；
 * 3. 稳健降级：当任一语种缺失时自动平滑回退，杜绝空标牌。
 */

type NodeLike = Pick<KnowledgeNode, "id" | "fach" | "titleDE" | "titleZH"> & {
  summaryDE?: string;
  summaryZH?: string;
};

// 学科外挂术语字典库 (Subject Dictionary Overrides - 可运行时热插拔注册)
const subjectTermDictionaries = new Map<string, Record<string, { de?: string; zh?: string }>>();

export function registerSubjectTermDictionary(
  fach: string,
  terms: Record<string, { de?: string; zh?: string }>
): void {
  const key = fach.toLowerCase();
  const current = subjectTermDictionaries.get(key) || {};
  subjectTermDictionaries.set(key, { ...current, ...terms });
}

export function getSubjectTermDictionary(fach: string): Record<string, { de?: string; zh?: string }> | undefined {
  return subjectTermDictionaries.get(fach.toLowerCase());
}

export function resolveNodeLanguage(
  node: NodeLike,
  mode: NodeLanguageMode = "bilingual",
  _appLang: Lang = "zh"
): NodeLocalizedContent {
  const fachKey = String(node.fach || "").toLowerCase();
  const dict = subjectTermDictionaries.get(fachKey);
  const override = dict ? dict[node.id] : undefined;

  const rawDE = (override?.de || node.titleDE || "").trim();
  const rawZH = (override?.zh || node.titleZH || "").trim();

  // 若某一边为空，智能降级到另一边
  const titleDE = rawDE || rawZH || node.id;
  const titleZH = rawZH || rawDE || node.id;

  const summaryDE = (node.summaryDE || "").trim();
  const summaryZH = (node.summaryZH || "").trim();

  switch (mode) {
    case "de":
      return {
        primaryTitle: titleDE,
        secondaryTitle: "",
        primarySummary: summaryDE || summaryZH,
        secondarySummary: undefined,
        isBilingual: false,
        pillText: titleDE,
      };

    case "bilingual":
      return {
        primaryTitle: _appLang === "de" ? titleDE : titleZH,
        secondaryTitle: _appLang === "de" ? titleZH : titleDE,
        primarySummary: _appLang === "de" ? (summaryDE || summaryZH) : (summaryZH || summaryDE),
        secondarySummary: _appLang === "de" ? summaryZH : summaryDE,
        isBilingual: true,
        pillText: titleDE === titleZH ? titleDE : `${titleDE} · ${titleZH}`,
      };

    case "zh":
    default:
      return {
        primaryTitle: titleZH,
        secondaryTitle: "",
        primarySummary: summaryZH || summaryDE,
        secondarySummary: undefined,
        isBilingual: false,
        pillText: titleZH,
      };
  }
}
