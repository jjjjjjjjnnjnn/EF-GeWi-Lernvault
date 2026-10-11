// Duolingo-style Lesson Step Flow Compiler (多邻国式微课步编译器)
// 结构升级：严格遵守“新知课程与互动实验在前，考场闯关与达标实测在后”的第一性原理教学法
// Strictly complies with Tufte clean rules: NO EMOJIS, ASCII arrows only (->).

import type { ParsedQuestNode } from "./bookIngestParser";
import {
  distillConcept,
  type DistilledConcept,
  type IntuitionDilemmaData,
  type StoryHookData,
  type FeynmanExplanationData,
  type TwoBrillenData,
  type FunFactData,
  type StudyMateProbesData,
  type AttachedNoteData,
} from "./conceptDistiller";

export type LessonStepType =
  | "lecture"     // 1. 新知精讲微课 (Phase 1: Vorlesung & Kausalkette - 沉浸阅读吸收)
  | "microworld"  // 2. 互动实验微世界 (Phase 1: Interaktives Labor-Experiment - 动手探究)
  | "puzzle"      // 3. 核心公理与现实对决拼图 (Phase 1: Konzept-Puzzle & Prämissen-Check)
  | "concept"     // 4. 核心机制挑战 (Phase 2: Konzept-Duell - 考纲核心机制精准辨析挑战)
  | "trap"        // 5. 考场陷阱排雷 (Phase 2: Klausurfalle & Fehlerquellen-Abwehr)
  | "quiz"        // 6. 15 NP 会考标答 (Phase 2: 15-NP-Meistersatz & Abschluss-Check)
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
  intuitionDilemma?: IntuitionDilemmaData;
  storyHook?: StoryHookData;
  feynmanExplanation?: FeynmanExplanationData;
  twoBrillen?: TwoBrillenData;
  funFact?: FunFactData;
  studyMateProbes?: StudyMateProbesData;
  attachedNote?: AttachedNoteData;
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
      intuitionDilemma: distilled.intuitionDilemma,
      storyHook: distilled.storyHook,
      feynmanExplanation: distilled.feynmanExplanation,
      twoBrillen: distilled.twoBrillen,
      funFact: distilled.funFact,
      studyMateProbes: distilled.studyMateProbes,
      attachedNote: distilled.attachedNote,
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
        questNode.interactiveType === "markt-sim"
          ? "Bediene den Schieberegler, um die Verschiebung der Angebotskurve und die Anpassung des Marktgleichgewichts G* zu beobachten."
          : "Bediene die Parameter-Schieberegler, um die Systemdynamik und Ursache-Wirkungs-Kette praktisch zu erfahren.",
      missionPromptZH:
        questNode.interactiveType === "markt-sim"
          ? "拖动右侧【生产成本】滑块，观察供给曲线平移及均衡点 G* 的自发调整。"
          : "调节参数滑块，观察动态因果曲线与系统稳态演化。",
      targetCriteriaDE:
        questNode.interactiveType === "markt-sim"
          ? "Produktionskosten auf +50% Zielmarke justiert."
          : "Parameter im stabilen Zielkorridor justiert.",
      targetCriteriaZH:
        questNode.interactiveType === "markt-sim"
          ? "生产成本已调整至 +50% 靶心目标区间。"
          : "参数已调整至稳态目标区间。",
      learningTakeawayDE:
        questNode.interactiveType === "markt-sim"
          ? "Erkenntnis: Der Preismechanismus führt bei Angebotskontraktion zu einem höheren Gleichgewichtspreis und räumt den Markt ohne zentrale Steuerung."
          : "Erkenntnis: In komplexen Systemen erzeugt jeder Eingriff direkte Wechselwirkungen und erfordert eine differenzierte Abwägung.",
      learningTakeawayZH:
        questNode.interactiveType === "markt-sim"
          ? "实验规律：供给收缩下价格机制自发推高均衡价格并平抑需求，在无行政命令干预下实现市场出清。"
          : "实验规律：在复杂系统中，任何变量的微调都会引发联动反应，必须在考场作答中进行多维度权衡。",
    },
    xpReward: 35,
  };

  // 3. 核心机制挑战 (Phase 2: 考场挑战 - 基于新知与实验现象的精准辨析)
  // fach自适应：SoWi保留市场/社会国家对决口径，他科走通用考纲术语口径（防跨学科穿帮）
  const isSoWi = fach === "SoWi";
  const stepConcept: LessonStep = {
    id: `${questNode.id}-step-3`,
    type: "concept",
    phase: "challenge",
    stepNumber: 3,
    titleDE: "Schritt 3: KLP-Fachbegriff & Mechanismus-Duell",
    titleZH: "第 3 步：考纲专业术语与机制精准对决",
    promptDE: `Welche exakte didaktische Funktion und Kausalität beschreibt den Fachbegriff »${primaryTerm.termDE}« nach KLP NRW?`,
    promptZH: isSoWi
      ? `依据考纲规范与刚刚的实验探究，专业术语 »${primaryTerm.termDE} (${primaryTerm.termZH})« 在经济机制中发挥的核心调控职能是？`
      : `依据考纲规范与刚刚的实验探究，专业术语 »${primaryTerm.termDE} (${primaryTerm.termZH})« 的核心内涵与因果机制是？`,
    options: [
      {
        id: "term-correct",
        textDE: primaryTerm.definitionDE,
        textZH: primaryTerm.definitionZH,
        isCorrect: true,
        explanationDE:
          "Präzise formuliert! Exakt diese Kausallogik verlangt der Erwartungshorizont in AFB I/II.",
        explanationZH: isSoWi
          ? "定义极其精确！完全吻合考纲第一与第二认知领域（AFB I/II）标准踩分要求：价格自发出清，实现微观配置效率。"
          : "定义极其精确！完全吻合考纲第一与第二认知领域（AFB I/II）标准踩分要求：抓住该术语的规范内涵与因果链条。",
      },
      {
        id: "term-distractor",
        textDE: isSoWi
          ? "Als ordnungspolitisches Instrument des Staates, das durch gesetzliche Höchstpreise die Grundversorgung der Bürger sichert."
          : `Als bloßes Alltagsphänomen ohne systematische Kausalität und ohne prüfbare KLP-Kriterien zu »${primaryTerm.termDE}«.`,
        textZH: isSoWi
          ? "作为国家宏观协调的社会保障工具，通过法定限价与福利干预确保商品不超出居民承受能力。"
          : `把 »${primaryTerm.termZH}« 当作日常经验现象，否认其系统性因果机制与考纲可检验标准。`,
        isCorrect: false,
        explanationDE: isSoWi
          ? "Achtung, Klausurfalle: Verwechsle nicht das freie Marktmodell mit der staatlichen Sozialpolitik der Sozialen Marktwirtschaft!"
          : "Achtung, Klausurfalle: Alltagsplausibilität ersetzt keine KLP-Fachbegriffsdefinition mit Kausalkette!",
        explanationZH: isSoWi
          ? "注意考场高频失分陷阱：完全竞争市场模型纯属自发机制，严禁混淆自由市场出清与国家社会福利干预！"
          : "注意考场高频失分陷阱：日常经验不能替代考纲术语定义，必须给出规范内涵与因果链条！",
      },
    ],
    xpReward: 25,
  };

  // 4. 考场排雷卡 (Phase 2: 考场挑战 - 真实 0 分答案找茬诊断与雷区精准排雷)
  const trapInfo = distilled.fehlerquellen[0] || {
    trapTitleDE: "Verwechslung von Korrelation und Kausalität",
    trapDescriptionDE: "Verfrühte Verallgemeinerung ohne Differenzierung.",
    trapDescriptionZH:
      "未加辨析就匆忙推导结论，混淆了表面相关与真实因果。",
    howToAvoidDE:
      "Immer die konkreten Rahmenbedingungen und Ausnahmen nennen.",
  };

  const trapOptions: LessonOption[] =
    distilled.examTrapCorrection?.diagnosticOptions &&
    distilled.examTrapCorrection.diagnosticOptions.length > 0
      ? distilled.examTrapCorrection.diagnosticOptions
      : [
          {
            id: "trap-correct",
            textDE: trapInfo.howToAvoidDE,
            textZH: isSoWi
              ? "严密论证前提条件：指出该观点混淆了理论模型的出清效率与现实社会福利，规范引用考纲专业术语。"
              : "严密论证前提条件：划定理论适用边界并辨析易混概念，规范引用考纲专业术语。",
            isCorrect: true,
            explanationDE:
              "Exzellent! Mit dieser Strategie sicherst du dir die volle Punktzahl in AFB II.",
            explanationZH:
              "诊断卓越！用严格的前提边界与概念辨析破除认知陷阱，稳稳拿满 AFB II 采分点。",
          },
          {
            id: "trap-distractor",
            textDE: trapInfo.trapDescriptionDE,
            textZH: trapInfo.trapDescriptionZH,
            isCorrect: false,
            explanationDE: `Genau dies ist die Fehlerfalle: ${trapInfo.trapTitleDE}!`,
            explanationZH: `这恰恰是考场中最容易中招的经典雷区：${trapInfo.trapTitleDE}！`,
          },
        ];

  const stepTrap: LessonStep = {
    id: `${questNode.id}-step-4`,
    type: "trap",
    phase: "challenge",
    stepNumber: 4,
    titleDE: "Schritt 4: Klausurfalle & 0-NP-Absturz-Diagnose",
    titleZH: "第 4 步：考场排雷 · 真实 0 分答案诊断 (Absturz-Falle)",
    promptDE: "Klausur-Absturz · Diagnostiziere den fatalen Denkfehler im 0-NP-Schülerzitat",
    promptZH: "考场排雷 · 诊断 0 分考卷的致命逻辑漏洞",
    options: trapOptions,
    xpReward: 30,
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
        explanationDE: isSoWi
          ? "15-NP-Meisterleistung! Perfekte Synthese aus Sachurteil (Allokationseffizienz) und Werturteil (Sozialstaatsgebot nach GG Art. 20)."
          : "15-NP-Meisterleistung! Perfekte Synthese aus Sachurteil (Kausalkette mit Fachbegriffen) und Werturteil (kriteriengeleitete Reflexion nach KLP NRW).",
        explanationZH: isSoWi
          ? "15 NP 满分水准！严密融合了事实评价（Sachurteil：市场自发配置效率）与价值评价（Werturteil：基本法第 20 条社会国家原则），达到北威州最高评分标准。"
          : "15 NP 满分水准！严密融合了事实评价（Sachurteil：规范因果链条）与价值评价（Werturteil：考纲标准反思），达到北威州最高评分标准。",
      },
      {
        id: "muster-distractor-market",
        textDE: isSoWi
          ? "Der Preismechanismus des vollkommenen Marktes führt stets zu optimalen Wohlfahrtsergebnissen, weshalb staatliche Markteingriffe ausnahmslos als wohlstandsmindernd abzulehnen sind."
          : `Die Einseitigkeitsthese zu »${primaryTerm.termDE}« ohne Gegenperspektive und ohne KLP-Kriterien erfüllt den Erwartungshorizont nicht.`,
        textZH: isSoWi
          ? "完全竞争市场的价格机制始终能实现最优福利结果，因此国家任何干预无一例外都会损害经济繁荣，应当予以彻底抵制。"
          : `对 »${primaryTerm.termZH}« 的片面论述：缺反视角、缺考纲标准，不满足评分细则。`,
        isCorrect: false,
        explanationDE: isSoWi
          ? "Punktabzug in AFB III: Dies ist eine einseitige Markt-Apologie ohne Werturteil. Im NRW-Abitur muss stets das Spannungsverhältnis zum Sozialstaatsgebot reflektiert werden!"
          : "Punktabzug in AFB III: Einseitige Darstellung ohne Werturteil und ohne KLP-Kriterien erfüllt den Erwartungshorizont nicht!",
        explanationZH: isSoWi
          ? "AFB III 严重扣分项：这是片面的单一效率论述，缺乏价值评判。北威州高考要求必须辩证权衡市场效率与基本法社会国家原则之间的张力！"
          : "AFB III 严重扣分项：片面论述、缺价值评判与考纲标准，不满足期望视野！",
      },
      {
        id: "muster-distractor-planned",
        textDE: isSoWi
          ? "Die Soziale Marktwirtschaft erfordert die flächendeckende Ersetzung des freien Preismechanismus durch staatliche Festpreise, um absolute Verteilungsgerechtigkeit zu erzwingen."
          : `Der Allgemeinplatz zu »${primaryTerm.termDE}« ohne Fachbegriffe und ohne kausale Beweisführung ist keine Klausurleistung.`,
        textZH: isSoWi
          ? "社会市场经济要求在全行业以国家统制定价彻底取代自由价格机制，以强制实现绝对的结果均等。"
          : `对 »${primaryTerm.termZH}« 的空泛议论：无考纲术语、无因果论证，不是会考作答。`,
        isCorrect: false,
        explanationDE: isSoWi
          ? "Theoriefehler: Die Soziale Marktwirtschaft basiert auf dem Prinzip »So viel Markt wie möglich, so viel Staat wie nötig«. Preiskontrollen zerstören die Signalfunktion."
          : "Theoriefehler: Ohne KLP-Fachbegriffe und Kausalkette gibt es im Erwartungshorizont keine Punkte.",
        explanationZH: isSoWi
          ? "概念性严重错误：德国社会市场经济的基石是‘尽可能多的市场，尽可能少的国家’。全面统制定价会直接摧毁价格的信号与出清职能。"
          : "概念性严重错误：没有考纲术语与因果链条，在评分细则中拿不到分。",
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

  // 教学流序列化：针对 markt-sim，将微观供求平衡实验与四大假设拼图串行化为递进 5 步
  if (questNode.interactiveType === "markt-sim" && distilled.konzeptPuzzle) {
    const stepPuzzle: LessonStep = {
      id: `${questNode.id}-step-puzzle`,
      type: "puzzle",
      phase: "learn",
      stepNumber: 3,
      titleDE: "Schritt 3: 4-Prämissen-Puzzle & Realitäts-Check",
      titleZH: "第 3 步：四大假设现实对决拼图",
      promptDE: "Ordne die 4 Modell-Prämissen des vollkommenen Marktes ihren realen Konsequenzen zu.",
      promptZH: "将完全竞争市场的 4 大理想公理前提与其现实破绽进行精准配对。",
      xpReward: 30,
    };

    return {
      distilled,
      steps: [
        stepLecture,
        stepMicroWorld,
        stepPuzzle,
        {
          ...stepTrap,
          stepNumber: 4,
        },
        {
          ...stepQuiz,
          stepNumber: 5,
        },
      ],
      flowMode: "interactive_deep",
    };
  }

  return {
    distilled,
    steps: [stepLecture, stepMicroWorld, stepConcept, stepTrap, stepQuiz],
    flowMode: "interactive_deep",
  };
}
