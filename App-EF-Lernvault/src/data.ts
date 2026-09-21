export interface Note {
  id: string;
  fach: string;
  thema: string;
  zh: string;
  operatoren: string[];
  klausurrelevant: boolean;
  bodyDE: string[];
  bodyZH: string[];
}

export interface Card {
  id: string;
  front: string;
  back: string;
  example: string;
  fach: string;
  dueIn: string;
}

export const notes: Note[] = [
  {
    id: "sowi-ungleichheit",
    fach: "SoWi",
    thema: "Soziale Ungleichheit",
    zh: "社会不平等",
    operatoren: ["darstellen", "analysieren", "beurteilen"],
    klausurrelevant: true,
    bodyDE: [
      "Dimensionen: Einkommen, Bildung, Geschlecht, Herkunft.",
      "Ursachen werden mit Fachbegriffen analysiert, Folgen für Akteure benannt.",
      "Urteil braucht explizite Kriterien (z. B. Chancengerechtigkeit).",
    ],
    bodyZH: ["维度：收入、教育、性别、出身。", "用术语分析原因，指出对行动者的后果。", "评价必须先亮标准（如机会公平）。"],
  },
  {
    id: "philo-menschenbild",
    fach: "Philosophie",
    thema: "Menschenbilder im Überblick",
    zh: "人性观总览",
    operatoren: ["darstellen", "vergleichen"],
    klausurrelevant: true,
    bodyDE: [
      "Verschiedene Menschenbilder prägen ethische Argumente.",
      "Vergleich: Gemeinsamkeiten und Differenzen sauber trennen.",
    ],
    bodyZH: ["不同人性观塑造伦理论证。", "比较时异同分开写。"],
  },
  {
    id: "philo-util-kant",
    fach: "Philosophie",
    thema: "Utilitarismus vs. Kant",
    zh: "功利主义 vs 康德",
    operatoren: ["analysieren", "erörtern", "beurteilen"],
    klausurrelevant: true,
    bodyDE: [
      "Utilitarismus: Folgenorientierung, größtes Glück der größten Zahl.",
      "Kant: Pflichtethik, kategorischer Imperativ, Würde des Menschen.",
      "Erörterung wägt beide Positionen kriteriengeleitet ab.",
    ],
    bodyZH: ["功利主义看后果：最大多数人的最大幸福。", "康德看义务：绝对命令、人的尊严。", "论述时按标准权衡双方。"],
  },
  {
    id: "mathe-formeln",
    fach: "Mathe",
    thema: "Formel-Spickzettel EF",
    zh: "核心公式速查",
    operatoren: [],
    klausurrelevant: true,
    bodyDE: [
      "Potenzregel: $$(x^n)' = n \\cdot x^{n-1}$$",
      "Mittlere Änderungsrate: $$m = \\frac{f(x_2)-f(x_1)}{x_2-x_1}$$",
      "Die Ableitung an der Stelle $x_0$ gibt die lokale Änderungsrate (Tangentensteigung) an.",
    ],
    bodyZH: [
      "幂函数求导法则：$$(x^n)' = n \\cdot x^{n-1}$$",
      "平均变化率公式：$$m = \\frac{f(x_2)-f(x_1)}{x_2-x_1}$$",
      "函数在 $x_0$ 处的导数即为局部瞬时变化率（切线斜率）。",
    ],
  },
];

export const cards: Card[] = [
  { id: "c1", front: "soziale Mobilität", back: "社会流动", example: "Bildung ermöglicht soziale Mobilität.", fach: "SoWi", dueIn: "heute" },
  { id: "c2", front: "Chancengerechtigkeit", back: "机会公平", example: "Klausur-Urteil braucht dieses Kriterium.", fach: "SoWi", dueIn: "heute" },
  { id: "c3", front: "kategorischer Imperativ", back: "绝对命令", example: "Handle nur nach der Maxime … (Kant).", fach: "Philosophie", dueIn: "morgen" },
  { id: "c4", front: "Utilitarismus", back: "功利主义", example: "Größtes Glück der größten Zahl.", fach: "Philosophie", dueIn: "morgen" },
  { id: "c5", front: "Sozialstaat", back: "社会国家/福利国家", example: "Der Sozialstaat federt Ungleichheit ab.", fach: "SoWi", dueIn: "in 3 Tagen" },
];

export const quizSteps = [
  { op: "darstellen", de: "Worum geht es im Material? (3-Satz-Einleitung: Thema + Material + These)", zh: "材料讲什么？（三句导语：主题+材料+论点）" },
  { op: "analysieren", de: "Ursachen, Folgen, Akteure — mit Fachbegriffen belegen.", zh: "原因、后果、行动者——用术语论证。" },
  { op: "beurteilen", de: "Kriterien nennen, dann eigenes Urteil formulieren.", zh: "先亮标准，再下判断。" },
];

export const planWeek = [
  { day: "Mo", task: "SoWi: 12 Karten + Ungleichheit wiederholen", done: true },
  { day: "Di", task: "Philo: Utilitarismus-vs-Kant Quiz (30 Min)", done: true },
  { day: "Mi", task: "SoWi: Karikatur-Analyse üben", done: false },
  { day: "Do", task: "12 Karten + Fehlerlog sichten", done: false },
  { day: "Fr", task: "Probeklausur SoWi (90 Min, 30/40/30)", done: false },
];

export const mindmapNodes = [
  { label: "Soziale Ungleichheit 社会不平等", x: 400, y: 40, root: true },
  { label: "Dimensionen 维度", x: 120, y: 160 },
  { label: "Einkommen 收入", x: 40, y: 260 },
  { label: "Bildung 教育", x: 200, y: 260 },
  { label: "Ursachen 原因", x: 400, y: 160 },
  { label: "Folgen 后果", x: 560, y: 160 },
  { label: "Sozialstaat 社会国家", x: 680, y: 160 },
];
