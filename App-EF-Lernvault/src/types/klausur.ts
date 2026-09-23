// 德国高中 Oberstufe (EF/Q1/Q2/Abitur) 全真三段式考试数据模型与 EPA 评分标准
// 严格遵循 KMK/NRW Einheitliche Prüfungsanforderungen (AFB I: ~25%, AFB II: ~45%, AFB III: ~30%)

export type AFBLevel = "AFB I" | "AFB II" | "AFB III";

export interface KlausurAufgabe {
  afb: AFBLevel;
  operator: string;      // 例如 Darstellen, Analysieren, Beurteilen
  promptDE: string;      // 德语考卷题目
  promptZH: string;      // 中文引导解析
  maxPoints: number;     // 题分 (例如 25 / 45 / 30)
  expectedPoints: string[]; // Erwartungshorizont 评分期望要点 (来自笔记中的 Klausur-Sätze)
  sampleSolution: string;   // 德语示范句
}

export interface KlausurMaterial {
  title: string;
  authorOrSource: string;
  text: string;          // 案例/争议文本材料
  keywords: string[];
}

export interface KlausurExam {
  id: string;
  fach: string;
  thema: string;
  sourceNotePath: string;
  material: KlausurMaterial;
  aufgaben: [KlausurAufgabe, KlausurAufgabe, KlausurAufgabe];
  recommendedMinutes: number; // 建议时长 (默认 45 或 90 分钟)
}

export interface KlausurGradingResult {
  afbScores: {
    afb: AFBLevel;
    points: number;
    maxPoints: number;
    feedbackDE: string;
    missingKeyPoints: string[];
  }[];
  darstellungScore: {
    points: number; // 0 - 20
    maxPoints: number;
    feedbackDE: string;
  };
  totalPoints: number;     // 总得分
  maxTotalPoints: number;  // 卷面满分 (120: Inhaltsleistung 100 + Darstellungsleistung 20)
  percentage: number;      // 得分率 (0 - 100%)
  notenpunkte: number;     // 德国高中 0 - 15 Notenpunkte
  deutscheNote: string;    // 1+ 到 6 等第
  fehlerlogPatch: string[];// 自动提取的失分点，用于更新 Fehlerlog
}

/** 德国高中 Oberstufe 官方百分比折算 0 - 15 Notenpunkte (KMK 规范) */
export function percentToNotenpunkte(pct: number): { notenpunkte: number; noteStr: string } {
  const p = Math.round(pct);
  if (p >= 95) return { notenpunkte: 15, noteStr: "1+ (sehr gut)" };
  if (p >= 90) return { notenpunkte: 14, noteStr: "1 (sehr gut)" };
  if (p >= 85) return { notenpunkte: 13, noteStr: "1- (sehr gut)" };
  if (p >= 80) return { notenpunkte: 12, noteStr: "2+ (gut)" };
  if (p >= 75) return { notenpunkte: 11, noteStr: "2 (gut)" };
  if (p >= 70) return { notenpunkte: 10, noteStr: "2- (gut)" };
  if (p >= 65) return { notenpunkte: 9, noteStr: "3+ (befriedigend)" };
  if (p >= 60) return { notenpunkte: 8, noteStr: "3 (befriedigend)" };
  if (p >= 55) return { notenpunkte: 7, noteStr: "3- (befriedigend)" };
  if (p >= 50) return { notenpunkte: 6, noteStr: "4+ (ausreichend)" };
  if (p >= 45) return { notenpunkte: 5, noteStr: "4 (ausreichend)" };
  if (p >= 40) return { notenpunkte: 4, noteStr: "4- (ausreichend, schwach)" };
  if (p >= 33) return { notenpunkte: 3, noteStr: "5+ (mangelhaft)" };
  if (p >= 27) return { notenpunkte: 2, noteStr: "5 (mangelhaft)" };
  if (p >= 20) return { notenpunkte: 1, noteStr: "5- (mangelhaft)" };
  return { notenpunkte: 0, noteStr: "6 (ungenügend)" };
}
