export type Lang = "de" | "zh";

export const t = (lang: Lang) => ({
  search: lang === "de" ? "Suchen …" : "搜索笔记 / 卡片 / 术语…",
  library: lang === "de" ? "Bibliothek" : "笔记库",
  flashcards: lang === "de" ? "Karteikarten" : "背卡",
  quiz: lang === "de" ? "Quiz & Klausur" : "刷题自测",
  tutor: lang === "de" ? "KI-Tutor" : "AI 助教",
  planner: lang === "de" ? "Lernplan" : "学习规划",
  mindmap: lang === "de" ? "Mindmap" : "思维导图",
  reise: lang === "de" ? "Lernreise" : "互动旅程",
  due: lang === "de" ? "fällig" : "到期",
  showAnswer: lang === "de" ? "Antwort zeigen" : "显示答案",
  again: "Again",
  hard: "Hard",
  good: "Good",
  easy: "Easy",
  offline:
    lang === "de"
      ? "LM Studio ist offline — starte LM Studio für KI-Funktionen."
      : "LM Studio 未启动——AI 功能需先启动 LM Studio。",

  // UI-SPEC-V3 bilingual strings
  dueToday: (n: number, m: number) =>
    lang === "de" ? `fällig ${n} / ${m}` : `到期 ${n} / 共 ${m}`,
  newCards: (k: number) => (lang === "de" ? `Neue ${k}` : `新卡 ${k}`),
  doneToday: lang === "de" ? "Fertig für heute" : "今天已完成",
  browseAnyway: lang === "de" ? "Trotzdem weiter" : "继续浏览",
  nextDue: (x: string | number) => (lang === "de" ? `→ ${x}d` : `${x}天后`),
  lmDown:
    lang === "de"
      ? "LM Studio nicht erreichbar — Vorlagen-Modus"
      : "LM 未连接——模板模式",
  noSource: lang === "de" ? "ohne Beleg" : "无出处",
  copyPatch: lang === "de" ? "Kopieren" : "复制",
  copied: lang === "de" ? "Kopiert ✓" : "已复制",
  daysLeft: (x: number, date?: string) =>
    lang === "de"
      ? `Noch ${x} Tage bis Klausur${date ? ` (${date})` : ""}`
      : `距考试 ${x} 天${date ? ` (${date})` : ""}`,
  exportFsrs:
    lang === "de"
      ? "FSRS Fortschritt exportieren"
      : "导出FSRS进度",
});
