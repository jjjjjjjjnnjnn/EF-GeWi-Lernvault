// Shared keyboard contract. Rendered in HelpOverlay (?), enforced in App + modules.
export function isTyping(): boolean {
  const el = document.activeElement as HTMLElement | null;
  return !!el && (el.tagName === "INPUT" || el.tagName === "TEXTAREA" || el.isContentEditable);
}

export interface Shortcut {
  keys: string;
  de: string;
  zh: string;
}

export const GLOBAL_SHORTCUTS: Shortcut[] = [
  { keys: "Strg/⌘ K", de: "Befehlspalette", zh: "命令面板" },
  { keys: "/", de: "Suche fokussieren", zh: "聚焦搜索" },
  { keys: "Alt 1–6", de: "Modul wechseln", zh: "切换模块" },
  { keys: "L", de: "Sprache DE/ZH", zh: "中德切换" },
  { keys: "?", de: "Tastaturhilfe", zh: "快捷键帮助" },
  { keys: "Esc", de: "Schließen / zurück", zh: "关闭/返回" },
];

export const CARD_SHORTCUTS: Shortcut[] = [
  { keys: "Space / Enter", de: "Karte umdrehen", zh: "翻卡" },
  { keys: "1 · 2 · 3 · 4", de: "Again · Hard · Good · Easy", zh: "评分" },
  { keys: "← / → ziehen", de: "Again (links) / Good (rechts)", zh: "左滑重来/右滑掌握" },
];

export const QUIZ_SHORTCUTS: Shortcut[] = [
  { keys: "Space", de: "Timer starten / stoppen", zh: "计时开始/停止" },
];

export const LIBRARY_SHORTCUTS: Shortcut[] = [
  { keys: "j / k · ↑ / ↓", de: "Notiz wechseln", zh: "切换笔记" },
];
