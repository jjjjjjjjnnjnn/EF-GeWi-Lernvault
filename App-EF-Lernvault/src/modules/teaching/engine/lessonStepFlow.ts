// Duolingo-style Lesson Step Flow Compiler (多邻国式微课步编译器)
// 结构升级：严格遵守“新知课程与互动实验在前，考场闯关与达标实测在后”的第一性原理教学法
// Strictly complies with Tufte clean rules: NO EMOJIS, ASCII arrows only (->).

import type { ParsedQuestNode } from "./bookIngestParser";
import { distillConcept, type DistilledConcept } from "./conceptDistiller";

export type LessonStepType =
  | "lecture"     // 1. 新知精讲微课 (Phase 1: Vorlesung & Kausalkette - 沉浸阅读吸收)
  | "microworld"  // 2. 互动实验微世界 (Phase 1: Interaktives Labor-Experiment - 动手探究)
  | "concept"     // 3. 核心机制挑战 (Phase 2: Konzept-Duell - 考纲核心机制精准辨析挑战)
  | "trap"        // 4. 考场陷阱排雷 (Phase 2: Klausurfalle & Fehlerquellen-Abwehr)
  | "quiz"        // 5. 15 NP 会考标答 (Phase 2: 15-NP-Meistersatz & Abschluss-Check)
  | "intuition";  // 兼容别名

export type LessonPhase = "learn" | "challenge";

export type FlowMode = "interactive_deep" | "concept_light";

export interface LessonOption {
  id: string;
  textDE: string;
  textZH: string;
  isCorrect: boolean;
  explanationDE: string;
  explanationZH: string;
}

export interface LectureContentPayload {
  hookDE: string;
  hookZH: string;
  analogyTitle: string;
  analogyExplanationDE: string;
  analogyExplanationZH: string;
  klpTermini: Array<{
    termDE: string;
    definitionDE: string;
    termZH: string;
    definitionZH: string;
  }>;
  causalChainDE: string[];
  causalChainZH: string[];
  socraticPromptDE: string;
  socraticPromptZH: string;
  learningTakeawayDE: string;
  learningTakeawayZH: string;
}

export interface MicroWorldChallengePayload {
  toolId: string;
  toolType: string;
  missionPromptDE: string;
  missionPromptZH: string;
  targetCriteriaDE: string;
  targetCriteriaZH: string;
  learningTakeawayDE?: string;
  learningTakeawayZH?: string;
}

export interface LessonStep {
  id: string;
  type: LessonStepType;
  phase: LessonPhase;
  stepNumber: number;
  titleDE: string;
  titleZH: string;
  promptDE: string;
  promptZH: string;
  lecturePayload?: LectureContentPayload;
  options?: LessonOption[];
  microWorldPayload?: MicroWorldChallengePayload;
  klausurMusterSatzDE?: string;
  klausurOperator?: string;
  scoringKeywords?: string[];
  xpReward: number;
}

/**
 * 将任意关卡编译为递进微课流
 * 核心升级：前置新知精讲微课与动手实验，后置冲刺考场关卡
 * 支持 interactive_deep (5 步深入流) 与 concept_light (3 步轻量流)
 */
export function compileLessonSteps(
  questNode: ParsedQuestNode,
  fach: string,
  mode?: FlowMode
): {
  distilled: DistilledConcept;
  steps: LessonStep[];
  flowMode: FlowMode;
} {
  const effectiveMode: FlowMode =
    mode ||
    (questNode.lessonType === "concept" && (!questNode.matchedToolId || questNode.matchedToolId === "none")
      ? "concept_light"
      : "interactive_deep");

  const distilled = distillConcept(questNode.title, fach, questNode.summary);

  const primaryTerm = distilled.klpTermini[0] || {
    termDE: questNode.title,
    termZH: questNode.title,
    definitionDE: "Zentraler Mechanismus und Kausalitaet nach KLP NRW.",
    definitionZH: "北威州考纲规定的核心机制与因果规律。",
  };

  // 1. 新知精讲微课 (Phase 1: 新知研习 - 沉浸式阅读吸收，无答题压力)
  const stepLecture: LessonStep = {
    id: `${questNode.id}-step-1`,
    type: "lecture",
    phase: "learn",
    stepNumber: 1,
    titleDE: "Schritt 1: Neues Fachwissen & KLP-Konzept",
    titleZH: "第 1 步：新知精讲微课与考纲图谱",
    promptDE: `Theorie & Wirkungsmechanismus zu »${distilled.topicTitle || questNode.title}«`,
    promptZH: `»${distilled.topicTitle || questNode.title}« 考纲核心理论精讲与运行机理`,
    lecturePayload: {
      hookDE: distilled.mentalModelAnalogy.explanationDE,
      hookZH: distilled.mentalModelAnalogy.explanationZH,
      analogyTitle: distilled.mentalModelAnalogy.analogyTitle,
      analogyExplanationDE: distilled.mentalModelAnalogy.explanationDE,
      analogyExplanationZH: distilled.mentalModelAnalogy.explanationZH,
      klpTermini:
        distilled.klpTermini.length > 0
          ? distilled.klpTermini.slice(0, 3)
          : [
              {
                termDE: questNode.title,
                definitionDE: "Zentraler Mechanismus und Kausalitaet nach KLP NRW.",
                termZH: questNode.title,
                definitionZH: "北威州考纲规定的核心机制与因果规律。",
              },
            ],
      causalChainDE: [
        `Ausgangslage: Problemstellung und Systemrahmen von »${questNode.title}«`,
        `Wirkungskanal: Dynamische Vermittlung über ${primaryTerm.termDE}`,
        `Systemreaktion: Gleichgewichtsausrichtung & Rückkopplungseffekt`,
        `Klausurfazit: Fundiertes Sach- und Werturteil nach KLP NRW Standards`,
      ],
      causalChainZH: [
        `现实起点：»${questNode.title}« 的制度背景与现实挑战`,
        `传导过程：通过 ${primaryTerm.termZH} 产生定向传导与激励调节`,
        `系统效应：驱动各方达成新的稳态均衡，避免机制失灵`,
        `会考定论：严格遵循考纲标准的客观事实与价值双重评价`,
      ],
      socraticPromptDE:
        questNode.socraticPrompt ||
        distilled.socraticProbes[0]?.questionDE ||
        "Wie wirkt sich dieser Mechanismus in der Praxis aus?",
      socraticPromptZH:
        distilled.socraticProbes[0]?.questionZH ||
        "这一机制在现实中会带来何种深远后果？",
      learningTakeawayDE:
        "Verinnerliche die Kausalkette, bevor du das interaktive Experiment bedienst.",
      learningTakeawayZH:
        "掌握上述因果逻辑链条，为接下来的动手实验打下坚实理论基础。",
    },
    xpReward: 25,
  };

  // 2. 动手探究实验微世界 (Phase 1: 实验探究 - 先动手玩、探索参数响应与发现规律)
  const stepMicroWorld: LessonStep = {
    id: `${questNode.id}-step-2`,
    type: "microworld",
    phase: "learn",
    stepNumber: 2,
    titleDE: "Schritt 2: Interaktives Labor-Experiment",
    titleZH: "第 2 步：动手探究实验与微世界探索",
    promptDE: `Hands-on-Labor: Erprobe »${questNode.matchedToolName || "die Simulation"}« und beobachte die Systemreaktionen.`,
    promptZH: `动手探究实验室：操作交互教具 »${questNode.matchedToolName || "仿真教具"}«，观察参数变动对系统的即时影响。`,
    microWorldPayload: {
      toolId: questNode.matchedToolId,
      toolType: questNode.interactiveType,
      missionPromptDE:
        "Bediene die Parameter oder Gewichte, um die dynamische Ursache-Wirkungs-Kette praktisch zu erfahren.",
      missionPromptZH:
        "拖动滑块或调整平衡砝码，观察动态因果曲线与力矩变化。",
      targetCriteriaDE: "Parameter im stabilen Zielkorridor justiert.",
      targetCriteriaZH: "参数已调整至稳态目标区间。",
      learningTakeawayDE:
        "Erkenntnis: In komplexen Systemen erzeugt jeder Eingriff direkte Wechselwirkungen und erfordert eine differenzierte Abwägung.",
      learningTakeawayZH:
        "实验规律：在复杂系统中，任何变量的微调都会引发联动反应，必须在考场作答中进行多维度权衡。",
    },
    xpReward: 35,
  };

  // 3. 核心机制挑战 (Phase 2: 考场挑战 - 基于新知与实验现象的精准辨析)
  const stepConcept: LessonStep = {
    id: `${questNode.id}-step-3`,
    type: "concept",
    phase: "challenge",
    stepNumber: 3,
    titleDE: "Schritt 3: KLP-Fachbegriff & Mechanismus-Duell",
    titleZH: "第 3 步：考纲专业术语与机制精准对决",
    promptDE: `Welche exakte Definition entspricht dem Fachbegriff »${primaryTerm.termDE}« nach KLP NRW?`,
    promptZH: `根据考纲规范与刚刚的实验探究，专业术语 »${primaryTerm.termDE} (${primaryTerm.termZH})« 的准确核心定义是？`,
    options: [
      {
        id: "term-correct",
        textDE: primaryTerm.definitionDE,
        textZH: primaryTerm.definitionZH,
        isCorrect: true,
        explanationDE:
          "Präzise formuliert. Das ist die korrekte Definition für Klausuren AFB I/II.",
        explanationZH:
          "定义极其精确，完全符合会考第一与第二认知领域（AFB I/II）标准踩分要求。",
      },
      {
        id: "term-distractor",
        textDE:
          "Ein umgangssprachlicher Sammelbegriff ohne institutionelle oder mathematische Bindung.",
        textZH:
          "一个日常通俗的大杂烩词汇，缺乏严格的机制界定与边界约束。",
        isCorrect: false,
        explanationDE:
          "Achtung: Umgangssprachliche Begriffe führen in Klausuren zu Punktabzügen!",
        explanationZH:
          "注意：在德语会考中混淆口语与考纲专业学术术语会导致失分！",
      },
    ],
    xpReward: 25,
  };

  // 4. 考场排雷卡 (Phase 2: 考场挑战 - 会考高频失分雷区精准排雷)
  const trapInfo = distilled.fehlerquellen[0] || {
    trapTitleDE: "Verwechslung von Korrelation und Kausalität",
    trapDescriptionDE: "Verfrühte Verallgemeinerung ohne Differenzierung.",
    trapDescriptionZH:
      "未加辨析就匆忙推导结论，混淆了表面相关与真实因果。",
    howToAvoidDE:
      "Immer die konkreten Rahmenbedingungen und Ausnahmen nennen.",
  };
  const stepTrap: LessonStep = {
    id: `${questNode.id}-step-4`,
    type: "trap",
    phase: "challenge",
    stepNumber: 4,
    titleDE: "Schritt 4: Klausurfalle & Fehlerquellen-Abwehr",
    titleZH: "第 4 步：会考高频失分雷区精准排雷",
    promptDE: `Typische Klausurfalle bei »${questNode.title}«: Welches Vorgehen vermeidet den typischen Punktverlust?`,
    promptZH: `针对 »${questNode.title}« 的考场经典易错点：哪种作答策略能够有效避免失分？`,
    options: [
      {
        id: "trap-correct",
        textDE: trapInfo.howToAvoidDE,
        textZH:
          "严密论证前提条件，区分主要矛盾与次生影响，规范引用考纲专业术语。",
        isCorrect: true,
        explanationDE:
          "Exzellent! Mit dieser Strategie sicherst du dir die volle Punktzahl in AFB II.",
        explanationZH:
          "卓越！采用这种作答结构能确保在论述大题中稳稳拿满踩分点。",
      },
      {
        id: "trap-distractor",
        textDE: trapInfo.trapDescriptionDE,
        textZH: trapInfo.trapDescriptionZH,
        isCorrect: false,
        explanationDE: `Genau dies ist die Fehlerfalle: ${trapInfo.trapTitleDE}!`,
        explanationZH: `这恰恰是考场中最容易中招的经典雷区：${trapInfo.trapTitleDE}！`,
      },
    ],
    xpReward: 25,
  };

  // 5. 15 NP 会考小测卡 (Phase 2: 考场挑战 - 15 NP 会考金句与终局达标考核)
  const stepQuiz: LessonStep = {
    id: `${questNode.id}-step-5`,
    type: "quiz",
    phase: "challenge",
    stepNumber: 5,
    titleDE: "Schritt 5: 15-NP-Meistersatz & Abschluss-Check",
    titleZH: "第 5 步：15 NP 会考金句与终局达标考核",
    promptDE: `Klausuraufgabe (${distilled.klausurSatz15NP.operator}): Wie lautet der 15-NP-Muster-Satz für dieses Thema?`,
    promptZH: `终局会考大题考查 (${distilled.klausurSatz15NP.operator})：以下哪一项是标准的 15 Notenpunkte 满分踩分句？`,
    options: [
      {
        id: "muster-correct",
        textDE: distilled.klausurSatz15NP.musterSatzDE,
        textZH: distilled.klausurSatz15NP.explanationZH,
        isCorrect: true,
        explanationDE:
          "15-NP-Meisterleistung! Alle Kernbegriffe und Kausalbeziehungen sind makellos enthalten.",
        explanationZH:
          "15 NP 满级水准！核心考点、因果链与专业术语严密无缝。",
      },
      {
        id: "muster-distractor",
        textDE:
          "Das Thema ist wichtig, aber es gibt keine klaren Richtlinien für eine fundierte Urteilsbildung.",
        textZH:
          "该主题虽有一定意义，但缺乏明确的标准，考生只能凭感觉主观发挥。",
        isCorrect: false,
        explanationDE:
          "Zu oberflächlich: In Oberstufen-Klausuren wird ein differenziertes Sach- und Werturteil gefordert.",
        explanationZH:
          "过于空泛：高中阶段要求考生必须结合事实评价（Sachurteil）与价值评价（Werturteil）展开深入论述。",
      },
    ],
    klausurMusterSatzDE: distilled.klausurSatz15NP.musterSatzDE,
    klausurOperator: distilled.klausurSatz15NP.operator,
    scoringKeywords: distilled.klausurSatz15NP.scoringKeywords,
    xpReward: 35,
  };

  if (effectiveMode === "concept_light") {
    // 3 步轻量流：① 新知精讲微课 (Phase 1) -> ② 核心概念对决 (Phase 2) -> ③ 15 NP 会考标答冲刺 (Phase 2)
    const lightQuiz: LessonStep = {
      ...stepQuiz,
      id: `${questNode.id}-step-3`,
      stepNumber: 3,
      titleDE: "Schritt 3: 15-NP-Meistersatz & Abschluss-Check",
      titleZH: "第 3 步：15 NP 会考金句与终局达标考核",
      xpReward: 45,
    };
    return {
      distilled,
      steps: [
        { ...stepLecture, xpReward: 35 },
        { ...stepConcept, stepNumber: 2, xpReward: 40 },
        lightQuiz,
      ],
      flowMode: "concept_light",
    };
  }

  return {
    distilled,
    steps: [stepLecture, stepMicroWorld, stepConcept, stepTrap, stepQuiz],
    flowMode: "interactive_deep",
  };
}
