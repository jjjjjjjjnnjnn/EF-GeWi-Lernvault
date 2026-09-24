export type ModuleId =
  | "home"
  | "library"
  | "flashcards"
  | "quiz"
  | "klausursim"
  | "tutor"
  | "planner"
  | "mindmap"
  | "lernbaum"
  | "reise"
  | "werkzeuge"
  | "einstellungen";

export type LearnModuleId = Exclude<ModuleId, "einstellungen">;
export type ModifierMatch = boolean | "any";

export interface KeyMatch {
  key: string | readonly string[];
  code?: string | readonly string[];
  alt?: ModifierMatch;
  ctrl?: ModifierMatch;
  meta?: ModifierMatch;
  shift?: ModifierMatch;
  primary?: boolean;
}

export interface BilingualLabel {
  de: string;
  zh: string;
}

export interface KeyBinding {
  id: string;
  match: KeyMatch;
  keys: string;
  label: BilingualLabel;
  altHint?: string;
}

export interface ModuleKeyBinding extends KeyBinding {
  module: ModuleId;
}

export function isTyping(): boolean {
  if (typeof document === "undefined") return false;
  const element = document.activeElement as HTMLElement | null;
  return !!element && (element.tagName === "INPUT" || element.tagName === "TEXTAREA" || element.isContentEditable);
}

function values(value: string | readonly string[]): readonly string[] {
  return typeof value === "string" ? [value] : value;
}

function sameKey(expected: string, actual: string): boolean {
  if (expected.length === 1 && actual.length === 1) return expected.toLowerCase() === actual.toLowerCase();
  return expected === actual;
}

function modifierMatches(required: ModifierMatch | undefined, actual: boolean): boolean {
  return required === "any" || (required ?? false) === actual;
}

export interface KeyMatchOptions {
  allowWhileTyping?: boolean;
}

export function matchesKey(
  event: KeyboardEvent,
  binding: KeyBinding,
  options: KeyMatchOptions = {}
): boolean {
  if (isTyping() && !options.allowWhileTyping) return false;

  const keyMatches = values(binding.match.key).some((key) => sameKey(key, event.key));
  const codeMatches = !!binding.match.code && values(binding.match.code).some((code) => code === event.code);
  if (!keyMatches && !codeMatches) return false;

  if (!modifierMatches(binding.match.alt, event.altKey)) return false;
  if (!modifierMatches(binding.match.shift, event.shiftKey)) return false;
  if (binding.match.primary) {
    if (!event.ctrlKey && !event.metaKey) return false;
  } else {
    if (!modifierMatches(binding.match.ctrl, event.ctrlKey)) return false;
    if (!modifierMatches(binding.match.meta, event.metaKey)) return false;
  }
  return true;
}

export const MODULE_KEYS: readonly ModuleKeyBinding[] = [
  {
    id: "module-home",
    module: "home",
    match: { key: "1", code: "Digit1", alt: true },
    keys: "Alt 1",
    altHint: "Alt 1",
    label: { de: "Start", zh: "主页" },
  },
  {
    id: "module-library",
    module: "library",
    match: { key: "2", code: "Digit2", alt: true },
    keys: "Alt 2",
    altHint: "Alt 2",
    label: { de: "Bibliothek", zh: "笔记库" },
  },
  {
    id: "module-flashcards",
    module: "flashcards",
    match: { key: "3", code: "Digit3", alt: true },
    keys: "Alt 3",
    altHint: "Alt 3",
    label: { de: "Karteikarten", zh: "背卡" },
  },
  {
    id: "module-quiz",
    module: "quiz",
    match: { key: "4", code: "Digit4", alt: true },
    keys: "Alt 4",
    altHint: "Alt 4",
    label: { de: "Quiz", zh: "刷题" },
  },
  {
    id: "module-klausursim",
    module: "klausursim",
    match: { key: "5", code: "Digit5", alt: true },
    keys: "Alt 5",
    altHint: "Alt 5",
    label: { de: "Klausur-Sim", zh: "模拟考" },
  },
  {
    id: "module-tutor",
    module: "tutor",
    match: { key: "6", code: "Digit6", alt: true },
    keys: "Alt 6",
    altHint: "Alt 6",
    label: { de: "KI-Tutor", zh: "AI 导师" },
  },
  {
    id: "module-planner",
    module: "planner",
    match: { key: "7", code: "Digit7", alt: true },
    keys: "Alt 7",
    altHint: "Alt 7",
    label: { de: "Lernplan", zh: "学习计划" },
  },
  {
    id: "module-mindmap",
    module: "mindmap",
    match: { key: "8", code: "Digit8", alt: true },
    keys: "Alt 8",
    altHint: "Alt 8",
    label: { de: "Mindmap", zh: "知识图谱" },
  },
  {
    id: "module-reise",
    module: "reise",
    match: { key: "9", code: "Digit9", alt: true },
    keys: "Alt 9",
    altHint: "Alt 9",
    label: { de: "Lernreise", zh: "互动旅程" },
  },
  {
    id: "module-lernbaum",
    module: "lernbaum",
    match: { key: "b", code: "KeyB", alt: true },
    keys: "Alt B",
    altHint: "Alt B",
    label: { de: "Lernbaum", zh: "学习树" },
  },
  {
    id: "module-werkzeuge",
    module: "werkzeuge",
    match: { key: "w", code: "KeyW", alt: true },
    keys: "Alt W",
    altHint: "Alt W",
    label: { de: "Fach-Werkzeuge", zh: "学科教具" },
  },
  {
    id: "module-einstellungen",
    module: "einstellungen",
    match: { key: "0", code: "Digit0", alt: true },
    keys: "Alt 0",
    altHint: "Alt 0",
    label: { de: "Einstellungen", zh: "设置" },
  },
];

export const GLOBAL_KEYS: readonly KeyBinding[] = [
  {
    id: "command-palette",
    match: { key: "k", primary: true, alt: false },
    keys: "Strg/⌘ K",
    label: { de: "Befehlspalette", zh: "命令面板" },
  },
  {
    id: "export-fsrs",
    match: { key: "e", primary: true, alt: false },
    keys: "Strg/⌘ E",
    label: { de: "FSRS Fortschritt exportieren", zh: "导出 FSRS 进度" },
  },
  {
    id: "search",
    match: { key: "/", alt: false, shift: "any" },
    keys: "/",
    label: { de: "Suche fokussieren", zh: "聚焦搜索" },
  },
  {
    id: "language",
    match: { key: "l", alt: false },
    keys: "L",
    label: { de: "Sprache DE/ZH", zh: "中德切换" },
  },
  {
    id: "help",
    match: { key: "?", alt: false, shift: true },
    keys: "?",
    label: { de: "Tastaturhilfe", zh: "快捷键帮助" },
  },
  {
    id: "escape",
    match: { key: "Escape", alt: false },
    keys: "Esc",
    label: { de: "Schließen / zurück", zh: "关闭/返回" },
  },
];

export const PER_MODULE_KEYS: Readonly<Record<LearnModuleId, readonly KeyBinding[]>> = {
  home: [],
  library: [
    {
      id: "library-next",
      match: { key: ["j", "ArrowDown"] },
      keys: "j / ↓",
      label: { de: "Nächste Notiz", zh: "下一条笔记" },
    },
    {
      id: "library-previous",
      match: { key: ["k", "ArrowUp"] },
      keys: "k / ↑",
      label: { de: "Vorige Notiz", zh: "上一条笔记" },
    },
  ],
  flashcards: [
    {
      id: "cards-flip",
      match: { key: [" ", "Spacebar", "Enter"] },
      keys: "Space / Enter",
      label: { de: "Karte umdrehen", zh: "翻卡" },
    },
    {
      id: "cards-rate-again",
      match: { key: "1", code: "Digit1" },
      keys: "1",
      label: { de: "Again", zh: "重来" },
    },
    {
      id: "cards-rate-hard",
      match: { key: "2", code: "Digit2" },
      keys: "2",
      label: { de: "Hard", zh: "困难" },
    },
    {
      id: "cards-rate-good",
      match: { key: "3", code: "Digit3" },
      keys: "3",
      label: { de: "Good", zh: "掌握" },
    },
    {
      id: "cards-rate-easy",
      match: { key: "4", code: "Digit4" },
      keys: "4",
      label: { de: "Easy", zh: "轻松" },
    },
  ],
  quiz: [
    {
      id: "quiz-timer",
      match: { key: [" ", "Spacebar"] },
      keys: "Space",
      label: { de: "Timer starten / stoppen", zh: "计时开始/停止" },
    },
    {
      id: "quiz-option",
      match: { key: ["1", "2"] },
      keys: "1 / 2",
      label: { de: "Option A / B wählen", zh: "选择选项 A / B" },
    },
    {
      id: "quiz-discrimination",
      match: { key: "d" },
      keys: "D",
      label: { de: "Diskriminationsaufgabe", zh: "辨别题" },
    },
    {
      id: "quiz-contrast",
      match: { key: "v" },
      keys: "V",
      label: { de: "Kontrastaufgabe", zh: "对比题" },
    },
  ],
  klausursim: [],
  tutor: [],
  planner: [],
  mindmap: [],
  lernbaum: [
    {
      id: "lernbaum-search",
      match: { key: "f", code: "KeyF" },
      keys: "F",
      label: { de: "Baumsuche fokussieren", zh: "聚焦树搜索" },
    },
    {
      id: "lernbaum-toggle-all",
      match: { key: "e", code: "KeyE" },
      keys: "E",
      label: { de: "Alle Äste auf-/zuklappen", zh: "展开/折叠全部" },
    },
    {
      id: "lernbaum-zoom-in",
      match: { key: ["+", "="], code: ["Equal", "NumpadAdd"] },
      keys: "+",
      label: { de: "Vergrößern", zh: "放大" },
    },
    {
      id: "lernbaum-zoom-out",
      match: { key: ["-", "_"], code: ["Minus", "NumpadSubtract"] },
      keys: "-",
      label: { de: "Verkleinern", zh: "缩小" },
    },
    {
      id: "lernbaum-zoom-reset",
      match: { key: "0", code: "Digit0" },
      keys: "0",
      label: { de: "Ansicht zurücksetzen", zh: "重置视图" },
    },
  ],
  reise: [
    {
      id: "reise-next",
      match: { key: ["Enter", "ArrowRight"] },
      keys: "Enter / →",
      label: { de: "Nächster Schritt / einreichen", zh: "下一步/提交" },
    },
    {
      id: "reise-timer",
      match: { key: [" ", "Spacebar"] },
      keys: "Space",
      label: { de: "Szenario-Timer starten / stoppen", zh: "场景计时开始/停止" },
    },
  ],
  werkzeuge: [],
};

export const ONBOARDING_KEYS: readonly KeyBinding[] = [
  {
    id: "onboarding-next",
    match: { key: "Enter" },
    keys: "Enter",
    label: { de: "Weiter (außer in Eingabefeldern)", zh: "下一步（输入框内除外）" },
  },
];

export interface Shortcut {
  keys: string;
  de: string;
  zh: string;
}

function shortcuts(bindings: readonly KeyBinding[]): Shortcut[] {
  return bindings.map((binding) => ({
    keys: binding.keys,
    de: binding.label.de,
    zh: binding.label.zh,
  }));
}

export const GLOBAL_SHORTCUTS: Shortcut[] = shortcuts([...GLOBAL_KEYS, ...MODULE_KEYS]);
export const CARD_SHORTCUTS: Shortcut[] = [
  ...shortcuts(PER_MODULE_KEYS.flashcards),
  { keys: "← / → ziehen", de: "Again (links) / Good (rechts)", zh: "左滑重来/右滑掌握" },
];
export const QUIZ_SHORTCUTS: Shortcut[] = shortcuts(PER_MODULE_KEYS.quiz);
export const LIBRARY_SHORTCUTS: Shortcut[] = shortcuts(PER_MODULE_KEYS.library);
export const REISE_SHORTCUTS: Shortcut[] = shortcuts(PER_MODULE_KEYS.reise);
export const LERNBAUM_SHORTCUTS: Shortcut[] = shortcuts(PER_MODULE_KEYS.lernbaum);
export const ONBOARDING_SHORTCUTS: Shortcut[] = shortcuts(ONBOARDING_KEYS);
