export type Lang = "de" | "zh";

export const t = (lang: Lang) => ({
  search: lang === "de" ? "Suchen …" : "搜索笔记 / 卡片 / 术语…",
  library: lang === "de" ? "Bibliothek" : "笔记库",
  flashcards: lang === "de" ? "Karteikarten" : "背卡",
  quiz: lang === "de" ? "Quiz & Klausur" : "刷题自测",
  tutor: lang === "de" ? "KI-Tutor" : "AI 助教",
  planner: lang === "de" ? "Lernplan" : "学习规划",
  mindmap: lang === "de" ? "Mindmap" : "思维导图",
  due: lang === "de" ? "fällig" : "到期",
  showAnswer: lang === "de" ? "Antwort zeigen" : "显示答案",
  again: "Again",
  hard: "Hard",
  good: "Good",
  easy: "Easy",
  offline: lang === "de"
    ? "LM Studio ist offline — starte LM Studio für KI-Funktionen."
    : "LM Studio 未启动——AI 功能需先启动 LM Studio。",
});
