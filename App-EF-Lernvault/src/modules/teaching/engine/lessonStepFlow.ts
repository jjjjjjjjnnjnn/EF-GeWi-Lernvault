// Duolingo-style Lesson Step Flow Compiler (多邻国式微课步编译器)
// 将任意 DAG 关卡节点与学科概念编译为 5 步高交互递进题卡

import type { ParsedQuestNode } from "./bookIngestParser";
import { distillConcept, type DistilledConcept } from "./conceptDistiller";

export type LessonStepType =
  | "intuition"   // 1. 生活直觉站队
  | "concept"     // 2. 考纲核心机制配对
  | "microworld"  // 3. 微世界动手目标挑战
  | "trap"        // 4. 考场失分陷阱排雷
  | "quiz";       // 5. 15 NP 会考标答冲刺

export type FlowMode = "interactive_deep" | "concept_light";

export interface LessonOption {
  id: string;
  textDE: string;
  textZH: string;
  isCorrect: boolean;
  explanationDE: string;
  explanationZH: string;
}

export interface MicroWorldChallengePayload {
  toolId: string;
  toolType: string;
  missionPromptDE: string;
  missionPromptZH: string;
  targetCriteriaDE: string;
  targetCriteriaZH: string;
}

export interface LessonStep {
  id: string;
  type: LessonStepType;
  stepNumber: number;
  titleDE: string;
  titleZH: string;
  promptDE: string;
  promptZH: string;
  options?: LessonOption[];
  microWorldPayload?: MicroWorldChallengePayload;
  klausurMusterSatzDE?: string;
  klausurOperator?: string;
  scoringKeywords?: string[];
  xpReward: number;
}

/**
 * 将任意关卡编译为多邻国递进上课流
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

  // 1. 直觉站队卡
  const stepIntuition: LessonStep = {
    id: `${questNode.id}-step-1`,
    type: "intuition",
    stepNumber: 1,
    titleDE: "Schritt 1: Alltags-Intuition & Phänomen",
    titleZH: "第 1 步：生活直觉与现象唤醒",
    promptDE: `Wie verhält sich das System intuitiv im Kontext von »${questNode.title}«?`,
    promptZH: `在面对 »${questNode.title}« 相关的实际情境时，你的第一直觉是什么？`,
    options: [
      {
        id: "opt-1",
        textDE: distilled.mentalModelAnalogy.explanationDE.slice(0, 100) + "...",
        textZH: distilled.mentalModelAnalogy.explanationZH.slice(0, 80) + "...",
        isCorrect: true,
        explanationDE: "Genau richtig! Dies entspricht dem grundlegenden Wirkungsprinzip.",
        explanationZH: "完全正确！这正是该系统运行的底层第一性原理。",
      },
      {
        id: "opt-2",
        textDE: "Das System reagiert völlig unabhängig von institutionellen Regeln oder Marktkräften.",
        textZH: "系统运行完全独立于规则与外力，不会产生任何连带连锁反应。",
        isCorrect: false,
        explanationDE: "Nicht zutreffend: In komplexen Systemen erzeugt jeder Eingriff direkte Wechselwirkungen.",
        explanationZH: "不符合现实：在复杂社会与科学系统中，任何输入都会引发连锁反应。",
      },
    ],
    xpReward: 20,
  };

  // 2. 概念配对卡
  const primaryTerm = distilled.klpTermini[0] || {
    termDE: questNode.title,
    termZH: questNode.title,
    definitionDE: "Zentraler Mechanismus",
    definitionZH: "核心运作机制",
  };
  const stepConcept: LessonStep = {
    id: `${questNode.id}-step-2`,
    type: "concept",
    stepNumber: 2,
    titleDE: "Schritt 2: KLP-Fachbegriff & Definition",
    titleZH: "第 2 步：考纲专业术语与机制精准匹配",
    promptDE: `Welche exakte Definition entspricht dem Fachbegriff »${primaryTerm.termDE}« nach KLP NRW?`,
    promptZH: `根据考纲规范，专业术语 »${primaryTerm.termDE} (${primaryTerm.termZH})« 的准确核心定义是？`,
    options: [
      {
        id: "term-correct",
        textDE: primaryTerm.definitionDE,
        textZH: primaryTerm.definitionZH,
        isCorrect: true,
        explanationDE: "Präzise formuliert. Das ist die korrekte Definition für Klausuren AFB I/II.",
        explanationZH: "定义极其精确，完全符合会考第一与第二认知领域（AFB I/II）标准踩分要求。",
      },
      {
        id: "term-distractor",
        textDE: "Ein umgangssprachlicher Sammelbegriff ohne institutionelle oder mathematische Bindung.",
        textZH: "一个日常通俗的大杂烩词汇，缺乏严格的机制界定与边界约束。",
        isCorrect: false,
        explanationDE: "Achtung: Umgangssprachliche Begriffe führen in Klausuren zu Punktabzügen!",
        explanationZH: "注意：在德语会考中混淆口语与考纲专业学术术语会导致失分！",
      },
    ],
    xpReward: 25,
  };

  // 3. 微世界动手挑战卡
  const stepMicroWorld: LessonStep = {
    id: `${questNode.id}-step-3`,
    type: "microworld",
    stepNumber: 3,
    titleDE: "Schritt 3: Mikrowelt-Experiment & Zielaufgabe",
    titleZH: "第 3 步：可动微世界仿真动手目标挑战",
    promptDE: `Bediene das interaktive Werkzeug »${questNode.matchedToolName}«, um die Gleichgewichtsparameter zu stabilisieren.`,
    promptZH: `请动手操作交互教具 »${questNode.matchedToolName}«，通过调整参数观察系统响应并达成平衡目标。`,
    microWorldPayload: {
      toolId: questNode.matchedToolId,
      toolType: questNode.interactiveType,
      missionPromptDE: `Verschiebe die Regler oder Gewichte und beobachte die dynamische Ursache-Wirkungs-Kette.`,
      missionPromptZH: `拖动滑块或增减砝码权重，观察动态因果曲线与力矩变化。`,
      targetCriteriaDE: "Parameter im stabilen Zielkorridor justiert.",
      targetCriteriaZH: "参数已调整至稳态目标区间。",
    },
    xpReward: 35,
  };

  // 4. 考场排雷卡
  const trapInfo = distilled.fehlerquellen[0] || {
    trapTitleDE: "Verwechslung von Korrelation und Kausalität",
    trapDescriptionDE: "Verfrühte Verallgemeinerung ohne Differenzierung.",
    trapDescriptionZH: "未加辨析就匆忙推导结论，混淆了表面相关与真实因果。",
    howToAvoidDE: "Immer die konkreten Rahmenbedingungen und Ausnahmen nennen.",
  };
  const stepTrap: LessonStep = {
    id: `${questNode.id}-step-4`,
    type: "trap",
    stepNumber: 4,
    titleDE: "Schritt 4: Klausurfalle & Fehlerquellen-Abwehr",
    titleZH: "第 4 步：会考高频失分雷区精准排雷",
    promptDE: `Typische Klausurfalle bei »${questNode.title}«: Welches Vorgehen vermeidet den typischen Punktverlust?`,
    promptZH: `针对 »${questNode.title}« 的考场经典易错点：哪种作答策略能够有效避免失分？`,
    options: [
      {
        id: "trap-correct",
        textDE: trapInfo.howToAvoidDE,
        textZH: "严密论证前提条件，区分主要矛盾与次生影响，规范引用考纲专业术语。",
        isCorrect: true,
        explanationDE: "Exzellent! Mit dieser Strategie sicherst du dir die volle Punktzahl in AFB II.",
        explanationZH: "卓越！采用这种作答结构能确保在论述大题中稳稳拿满踩分点。",
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

  // 5. 15 NP 会考小测卡
  const stepQuiz: LessonStep = {
    id: `${questNode.id}-step-5`,
    type: "quiz",
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
        explanationDE: "15-NP-Meisterleistung! Alle Kernbegriffe und Kausalbeziehungen sind makellos enthalten.",
        explanationZH: "15 NP 满级水准！核心考点、因果链与专业术语严密无缝。",
      },
      {
        id: "muster-distractor",
        textDE: "Das Thema ist wichtig, aber es gibt keine klaren Richtlinien für eine fundierte Urteilsbildung.",
        textZH: "该主题虽有一定意义，但缺乏明确的标准，考生只能凭感觉主观发挥。",
        isCorrect: false,
        explanationDE: "Zu oberflächlich: In Oberstufen-Klausuren wird ein differenziertes Sach- und Werturteil gefordert.",
        explanationZH: "过于空泛：高中阶段要求考生必须结合事实评价（Sachurteil）与价值评价（Werturteil）展开深入论述。",
      },
    ],
    klausurMusterSatzDE: distilled.klausurSatz15NP.musterSatzDE,
    klausurOperator: distilled.klausurSatz15NP.operator,
    scoringKeywords: distilled.klausurSatz15NP.scoringKeywords,
    xpReward: 35,
  };

  if (effectiveMode === "concept_light") {
    // 3 步轻量流：① 生活直觉 -> ② 核心概念 -> ③ 15 NP 会考标答小测
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
        { ...stepIntuition, xpReward: 30 },
        { ...stepConcept, xpReward: 35 },
        lightQuiz,
      ],
      flowMode: "concept_light",
    };
  }

  return {
    distilled,
    steps: [stepIntuition, stepConcept, stepMicroWorld, stepTrap, stepQuiz],
    flowMode: "interactive_deep",
  };
}
