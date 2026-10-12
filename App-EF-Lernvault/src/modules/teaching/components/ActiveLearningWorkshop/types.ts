// Types and definitions for ActiveLearningWorkshop (动态研学闭环)
// Strictly complies with Tufte clean rules: NO EMOJIS, ASCII arrows only (->).

export type WorkshopPhase = "lecture" | "labor" | "notes" | "quiz" | "mastery";

export interface WorkshopPhaseConfig {
  id: WorkshopPhase;
  stepNumber: number;
  titleDE: string;
  titleZH: string;
  shortLabelDE: string;
  shortLabelZH: string;
  descriptionDE: string;
  descriptionZH: string;
}

export const WORKSHOP_PHASES: WorkshopPhaseConfig[] = [
  {
    id: "lecture",
    stepNumber: 1,
    titleDE: "Phase 1: Vorlesung & Kausalitaet",
    titleZH: "阶段 1 · 新知微课与因果推演",
    shortLabelDE: "1. Vorlesung",
    shortLabelZH: "① 新知微课",
    descriptionDE: "Intuition wecken, Kausalketten dekonstruieren und KLP-Begriffe erschliessen.",
    descriptionZH: "场景启发导入，解构因果传导链条，打牢考纲核心概念。",
  },
  {
    id: "labor",
    stepNumber: 2,
    titleDE: "Phase 2: Interaktives Labor",
    titleZH: "阶段 2 · 仿真探究与参数实验",
    shortLabelDE: "2. Labor",
    shortLabelZH: "② 仿真探究",
    descriptionDE: "Theorie an dynamischen Modellen manipulieren, Schocks testen und Gesetzmaessigkeiten validieren.",
    descriptionZH: "参数动态扰动，观察系统响应，验证公理规律与模型假说。",
  },
  {
    id: "notes",
    stepNumber: 3,
    titleDE: "Phase 3: KLP-Wissensnotiz",
    titleZH: "阶段 3 · 笔记精练与解题提炼",
    shortLabelDE: "3. Notiz",
    shortLabelZH: "③ 笔记精练",
    descriptionDE: "Erwartungshorizont sichern, 15-NP-Meistersatz einpraegen und Klausurfallen abwehren.",
    descriptionZH: "沉淀第一性原理笔记，锁定15分高分考句，识破考场扣分陷阱。",
  },
  {
    id: "quiz",
    stepNumber: 4,
    titleDE: "Phase 4: Klausur-Drill",
    titleZH: "阶段 4 · 刷题挑战与即时自测",
    shortLabelDE: "4. Klausur-Drill",
    shortLabelZH: "④ 刷题挑战",
    descriptionDE: "Operatorengerechte Aufgabenstellungen (AFB I bis III) unter Zeitdruck meistern.",
    descriptionZH: "全真对齐 AFB I/II/III 指令动词，限时实战，即时反馈剖析。",
  },
  {
    id: "mastery",
    stepNumber: 5,
    titleDE: "Phase 5: Meisterschaft & Transfer",
    titleZH: "阶段 5 · 掌握度结算与闭环达标",
    shortLabelDE: "5. Abschluss",
    shortLabelZH: "⑤ 闭环达标",
    descriptionDE: "Kompetenzradar auswerten, XP verbuchen und Fehlerstellen im Fehlerlog dokumentieren.",
    descriptionZH: "多维能力雷达评定，XP 进阶结算，错题归档生成补丁。",
  },
];

export interface QuizOption {
  id: string;
  textDE: string;
  textZH: string;
  isCorrect: boolean;
  explanationDE: string;
  explanationZH: string;
}

export interface WorkshopQuizQuestion {
  id: string;
  afb: "AFB I" | "AFB II" | "AFB III";
  operator: string;
  promptDE: string;
  promptZH: string;
  options: QuizOption[];
  trapWarningDE?: string;
  trapWarningZH?: string;
  klausurCriteria?: string[];
}

export interface WorkshopQuizResult {
  score: number;
  totalQuestions: number;
  correctCount: number;
  mistakes: string[];
  timeSpentSeconds: number;
}

export interface WorkshopMasteryRadarData {
  konzeptScore: number;     // 概念认知
  laborScore: number;       // 仿真探究
  notizScore: number;       // 笔记提炼
  operatorScore: number;    // 动词规范
  urteilScore: number;      // 价值评判
}

export interface WorkshopSummary {
  topicTitle: string;
  fach: string;
  earnedXp: number;
  quizResult: WorkshopQuizResult;
  radarData: WorkshopMasteryRadarData;
  completedPhases: WorkshopPhase[];
  completedAt: string;
}
