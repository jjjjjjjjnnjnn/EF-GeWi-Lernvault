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
  { keys: "Alt 1–8", de: "Modul wechseln (8 = Einstellungen unten)", zh: "切换模块（8=底部设置）" },
  { keys: "L", de: "Sprache DE/ZH", zh: "中德切换" },
  { keys: "?", de: "Tastaturhilfe", zh: "快捷键帮助" },
  { keys: "Strg/⌘ E", de: "FSRS Fortschritt exportieren", zh: "导出FSRS进度" },
  { keys: "Esc", de: "Schließen / zurück", zh: "关闭/返回" },
];

export const CARD_SHORTCUTS: Shortcut[] = [
  { keys: "Space / Enter", de: "Karte umdrehen", zh: "翻卡" },
  { keys: "1 · 2 · 3 · 4", de: "Again · Hard · Good · Easy", zh: "评分" },
  { keys: "← / → ziehen", de: "Again (links) / Good (rechts)", zh: "左滑重来/右滑掌握" },
];

export const QUIZ_SHORTCUTS: Shortcut[] = [
  { keys: "Space", de: "Timer starten / stoppen", zh: "计时开始/停止" },
  { keys: "1 · 2", de: "Option A / B wählen (Vergleich)", zh: "选择选项 A / B（对比辨析）" },
  { keys: "D", de: "Diskriminationsaufgabe (Verfahren wählen + begründen)", zh: "辨别题（选程序+说理）" },
  { keys: "V", de: "Kontrastaufgabe (Lösungen A/B vergleichen)", zh: "对比题（AB两解对比）" },
];

export const LIBRARY_SHORTCUTS: Shortcut[] = [
  { keys: "j / k · ↑ / ↓", de: "Notiz wechseln", zh: "切换笔记" },
];

export const REISE_SHORTCUTS: Shortcut[] = [
  { keys: "Enter / →", de: "Nächster Schritt / einreichen", zh: "下一步/提交" },
  { keys: "Space", de: "Szenario-Timer starten / stoppen", zh: "场景计时开始/停止" },
];

export const ONBOARDING_SHORTCUTS: Shortcut[] = [
  { keys: "Enter", de: "Weiter (außer in Eingabefeldern)", zh: "下一步（输入框内除外）" },
];
