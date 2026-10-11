import React, { useState } from "react";

export interface LogicBlockBuilderProps {
  title?: string;
  lang?: "de" | "zh";
  onValidate?: (isValid: boolean, conclusion: string) => void;
  /**
   * 预设逻辑原型：同一论证引擎在不同课程中挂载不同默认原型与使命。
   * 缺省 "modus_ponens"（社会国家涵摄，SoWi 现状，零回归）。
   */
  archetypeId?: LogicArchetypeId;
}

/**
 * 课程→默认原型选路：形式逻辑按论证任务分流，纯函数，可单测；
 * 未知输入一律回退 modus_ponens（零回归）。
 */
export function resolveLogicArchetype(title: string, summary = ""): LogicArchetypeId {
  const hay = `${title} ${summary}`.toLowerCase();
  if (/kant|utilitarismus|mill|bentham|trolley|ethik|dilemma|widerleg|kritik|falsifik|theodizee/.test(hay))
    return "modus_tollens";
  if (/drama|faust|kafka|lyrik|rhetorik|argumentation|erörterung|comment|mediation|speech|shakespeare|miller|orwell|dystopia/.test(hay))
    return "disjunctive_syllogism";
  if (/fehlschluss|trugschluss|fallacy|strohmann|straw|korrelation|kausal|scheinkorrelation/.test(hay))
    return "affirming_consequent";
  return "modus_ponens";
}

export const LOGIC_MISSIONS: Record<string, { missionDe: string; missionZh: string }> = {
  modus_ponens: {
    missionDe: "[ Mission: Subsumtion ] Rekonstruiere die sozialstaatliche Argumentation als gültigen Schluss.",
    missionZh: "[ 任务使命 ] 涵摄推演：将社会国家论证重构为有效三段论。",
  },
  modus_tollens: {
    missionDe: "[ Mission: Widerlegung ] Prüfe die ethische These durch Falsifikation der notwendigen Bedingung.",
    missionZh: "[ 任务使命 ] 反证检验：以必要条件证伪来审查伦理命题。",
  },
  disjunctive_syllogism: {
    missionDe: "[ Mission: Alternativen-Entscheidung ] Eliminiere die ausgeschlossene Lesart und sichere die Deutung.",
    missionZh: "[ 任务使命 ] 选言排除：排除被否定的解读，锁定文本立论。",
  },
  affirming_consequent: {
    missionDe: "[ Mission: Fehlschluss-Diagnose ] Entlarve den Diagnosefehler in der vorgelegten Argumentation.",
    missionZh: "[ 任务使命 ] 谬误诊断：揪出论证中的肯定后件式诊断错误。",
  },
};

export function logicMissionFor(archetypeId: LogicArchetypeId): { missionDe: string; missionZh: string } {
  return LOGIC_MISSIONS[archetypeId] || LOGIC_MISSIONS.modus_ponens;
}

export type SlotId = "premise1" | "premise2" | "conclusion";

export type LogicArchetypeId =
  | "modus_ponens"
  | "modus_tollens"
  | "disjunctive_syllogism"
  | "affirming_consequent"
  | "false_causality"
  | "naturalistic_fallacy"
  | "begging_question"
  | "straw_man";

export interface LogicBlockItem {
  id: string;
  slotType: SlotId;
  formula: string;
  de: string;
  zh: string;
  archetypeId: LogicArchetypeId;
}

export interface ArchetypeDefinition {
  id: LogicArchetypeId;
  nameDe: string;
  nameZh: string;
  category: "deductive" | "fallacy";
  formulaPattern: string;
  p1Id: string;
  p2Id: string;
  concId: string;
  isValid: boolean;
  fallacyNameDe?: string;
  fallacyNameZh?: string;
  scoreNP: number;
  scoreBreakdown: {
    formalValidity: number; // 0-5 NP
    premiseSoundness: number; // 0-5 NP
    klausurPrecision: number; // 0-5 NP
  };
  explanationDe: string;
  explanationZh: string;
  klausurSatzDe: string;
  klausurSatzZh: string;
}

// 预置逻辑知识块题库 (Prämissen- und Konklusionskatalog)
const BLOCK_CATALOG: LogicBlockItem[] = [
  // Modus Ponens (Abtrennungsregel)
  {
    id: "mp_p1",
    slotType: "premise1",
    formula: "p -> q",
    de: "Wenn eine Person das soziokulturelle Existenzminimum unterschreitet, greift das verfassungsrechtliche Sozialstaatsgebot.",
    zh: "若当事人的基本生活水平低于社会文化最低保障线，则宪法规定的社会福利国家原则必然介入。",
    archetypeId: "modus_ponens",
  },
  {
    id: "mp_p2",
    slotType: "premise2",
    formula: "p",
    de: "Bürger X verfügt über keine Rücklagen und unterschreitet nachweisbar das Existenzminimum.",
    zh: "公民 X 缺乏储蓄且经核实实际所得低于法定基本生活保障线。",
    archetypeId: "modus_ponens",
  },
  {
    id: "mp_k",
    slotType: "conclusion",
    formula: "∴ q",
    de: "Folglich hat Bürger X einen zwingenden Rechtsanspruch auf staatliche Grundsicherungsleistungen.",
    zh: "因此，公民 X 依法享有国家兜底基本社会保障金的强制请求权。",
    archetypeId: "modus_ponens",
  },

  // Modus Tollens (Widerlegungsregel)
  {
    id: "mt_p1",
    slotType: "premise1",
    formula: "p -> q",
    de: "Wenn ein staatlicher Eingriff verhältnismäßig ist, muss er das mildeste gleichermaßen geeignete Mittel darstellen (Erforderlichkeit).",
    zh: "若一项国家干预行为符合比例原则，则其必须属于同等有效且侵害最小的手段（必要性原则）。",
    archetypeId: "modus_tollens",
  },
  {
    id: "mt_p2",
    slotType: "premise2",
    formula: "¬q",
    de: "Der verhängte vollständige Berufsstop stellt nachweislich nicht das mildeste Mittel dar.",
    zh: "经审查，所下达的全面停业禁令显然并非侵害最小的手段。",
    archetypeId: "modus_tollens",
  },
  {
    id: "mt_k",
    slotType: "conclusion",
    formula: "∴ ¬p",
    de: "Folglich ist der staatliche Grundrechtseingriff verfassungswidrig und unverhältnismäßig.",
    zh: "因此，该项针对基本权利的国家干预因违反比例原则而属于违宪行为。",
    archetypeId: "modus_tollens",
  },

  // Disjunktiver Syllogismus
  {
    id: "ds_p1",
    slotType: "premise1",
    formula: "p ∨ q",
    de: "Zur Schließung der Haushaltslücke stehen entweder Steuererhöhungen oder investive Ausgabenkürzungen zur Wahl.",
    zh: "为弥补财政赤字缺口，政府要么增税，要么削减投资性财政支出。",
    archetypeId: "disjunctive_syllogism",
  },
  {
    id: "ds_p2",
    slotType: "premise2",
    formula: "¬p",
    de: "Eine Erhöhung der Einkommen- und Unternehmenssteuern wird von der Parlamentsmehrheit rechtlich ausgeschlossen.",
    zh: "议会多数派已在法律层面明确排除了提高所得税与企业税的可能。",
    archetypeId: "disjunctive_syllogism",
  },
  {
    id: "ds_k",
    slotType: "conclusion",
    formula: "∴ q",
    de: "Folglich müssen Ausgabenkürzungen im Bundeshaushalt beschlossen und umgesetzt werden.",
    zh: "因此，必须在联邦财政预算中决议并执行支出削减方案。",
    archetypeId: "disjunctive_syllogism",
  },

  // Affirming the Consequent (Fehlschluss: Bejahung des Konsequens)
  {
    id: "ac_p1",
    slotType: "premise1",
    formula: "p -> q",
    de: "Wenn die Leitzinsen der Zentralbank massiv steigen, kühlt sich die gesamtwirtschaftliche Bauinvestition ab.",
    zh: "若中央银行基准利率大幅上升，则宏观经济中的整体建筑投资必将趋于冷却。",
    archetypeId: "affirming_consequent",
  },
  {
    id: "ac_p2",
    slotType: "premise2",
    formula: "q",
    de: "Die statistisch erfassten Bauinvestitionen im Inland haben sich im letzten Quartal spürbar abgekühlt.",
    zh: "统计数据显示，上个季度国内建筑投资确实出现了显著冷却。",
    archetypeId: "affirming_consequent",
  },
  {
    id: "ac_k",
    slotType: "conclusion",
    formula: "∴ p (Trugschluss)",
    de: "Folglich hat die Zentralbank im letzten Quartal zwingend die Leitzinsen erhöht.",
    zh: "因此，中央银行在上个季度必然上调了基准利率（逻辑谬误）。",
    archetypeId: "affirming_consequent",
  },

  // False Causality (Post hoc ergo propter hoc)
  {
    id: "fc_p1",
    slotType: "premise1",
    formula: "A ante B",
    de: "Im Monat nach der Einführung des gesetzlichen Mindestlohns von 12 Euro stieg die Arbeitslosenquote in Region R um 0,3 Prozent.",
    zh: "在法定12欧元最低工资生效后的次月，R地区的登记失业率上升了0.3个百分点。",
    archetypeId: "false_causality",
  },
  {
    id: "fc_p2",
    slotType: "premise2",
    formula: "Post hoc",
    de: "Die gesetzliche Mindestlohnregelung trat zeitlich vor dem gemessenen Anstieg der Arbeitslosenzahlen in Kraft.",
    zh: "法定最低工资生效事件在时间序列上早于失业人口统计指标的上升。",
    archetypeId: "false_causality",
  },
  {
    id: "fc_k",
    slotType: "conclusion",
    formula: "∴ A causa B",
    de: "Folglich ist die Mindestlohneinführung die alleinige kausale Ursache für die gestiegene Arbeitslosigkeit.",
    zh: "因此，最低工资的引入是导致失业率上升的唯一因果决定要素。",
    archetypeId: "false_causality",
  },

  // Naturalistic Fallacy (Naturalistischer Fehlschluss / Sein-Sollen)
  {
    id: "nf_p1",
    slotType: "premise1",
    formula: "Sein (Deskriptiv)",
    de: "In der biologischen Natur dominiert in der Nahrungskette das physisch stärkere Lebewesen gegenüber dem schwächeren.",
    zh: "在生物演化的自然界中，食物链中的生理强者恒常支配着弱者（实然描述）。",
    archetypeId: "naturalistic_fallacy",
  },
  {
    id: "nf_p2",
    slotType: "premise2",
    formula: "Subsumtion",
    de: "Der Mensch und menschliche Wirtschaftsgesellschaften sind aus der natürlichen Evolution hervorgegangen.",
    zh: "人类及其经济社会组织均是由自然演化史塑造而来的生物学物种。",
    archetypeId: "naturalistic_fallacy",
  },
  {
    id: "nf_k",
    slotType: "conclusion",
    formula: "∴ Sollen (Normativ)",
    de: "Folglich soll der Staat schwächere Marktteilnehmer nicht unterstützen, da Konkurrenzauslese natürlich ist.",
    zh: "因此，国家不应当援助处于竞争劣势的市场主体，因为残酷竞争本属自然常理（应然推导谬误）。",
    archetypeId: "naturalistic_fallacy",
  },

  // Begging the Question (Zirkelschluss / Petitio Principii)
  {
    id: "bq_p1",
    slotType: "premise1",
    formula: "p = Voraussetzung",
    de: "Vollkommen unregulierte Märkte führen prinzipiell zum größtmöglichen gesellschaftlichen Wohlstand.",
    zh: "完全不受监管的自由市场在原则上必将产生最大的全社会总体福祉。",
    archetypeId: "begging_question",
  },
  {
    id: "bq_p2",
    slotType: "premise2",
    formula: "Definitorische Identität",
    de: "Wohlstand wird ökonomisch dadurch definiert, dass keine staatlichen Regulierungen die Marktpreise verzerren.",
    zh: "所谓福祉在经济学上的定义，就是没有任何国家监管力量扭曲自由形成的均衡市价。",
    archetypeId: "begging_question",
  },
  {
    id: "bq_k",
    slotType: "conclusion",
    formula: "∴ p (Zirkulär)",
    de: "Folglich maximiert die Abwesenheit staatlicher Eingriffe den gesellschaftlichen Wohlstand.",
    zh: "因此，不存在任何国家干预的状态即是社会福祉最大化的状态（同义反复）。",
    archetypeId: "begging_question",
  },

  // Straw Man (Strohmann-Argument)
  {
    id: "sm_p1",
    slotType: "premise1",
    formula: "Thesis A",
    de: "Befürworter fordern eine schrittweise Erhöhung der CO2-Abgabe zur Erreichung der Pariser Klimaziele.",
    zh: "支持者倡议循序渐进提高碳排放定价，以落实巴黎气候协议所约定的温控目标。",
    archetypeId: "straw_man",
  },
  {
    id: "sm_p2",
    slotType: "premise2",
    formula: "Verzerrung A'",
    de: "Kritiker behaupten, dieser Vorschlag bedeute die sofortige Stilllegung der gesamten Industrie und Rückkehr zur Vorindustrielle.",
    zh: "反对者断言，这项提议实质上等同于强制立即关停全部实体工业、迫使现代人退回前工业文明时代。",
    archetypeId: "straw_man",
  },
  {
    id: "sm_k",
    slotType: "conclusion",
    formula: "∴ Widerlegung A'",
    de: "Da eine Zerstörung der Industriebasis inakzeptabel ist, muss jede Form von CO2-Abgabe abgelehnt werden.",
    zh: "鉴于摧毁实体工业基础是绝对不可接受的，因此必须坚决全盘否定任何形式的碳排放定价政策。",
    archetypeId: "straw_man",
  },
];

// 原型逻辑图谱元数据
const ARCHETYPES: Record<LogicArchetypeId, ArchetypeDefinition> = {
  modus_ponens: {
    id: "modus_ponens",
    nameDe: "Modus Ponens (Abtrennungsregel)",
    nameZh: "假言推理 (肯定前件律)",
    category: "deductive",
    formulaPattern: "p -> q, p ⊢ q",
    p1Id: "mp_p1",
    p2Id: "mp_p2",
    concId: "mp_k",
    isValid: true,
    scoreNP: 15,
    scoreBreakdown: { formalValidity: 5, premiseSoundness: 5, klausurPrecision: 5 },
    explanationDe:
      "Formal deduktiv zwingend. Aus einer wahren Implikation (Obersatz) und der Verifizierung der Vorbedingung (Untersatz) folgt die Konklusion unausweichlich.",
    explanationZh:
      "形式演绎完全有效。大前提（条件蕴涵）与小前提（前件满足）在逻辑结构上必然产生该结论，不存在例外反例。",
    klausurSatzDe:
      "Der vorliegende Schluss folgt der formal-logischen Figur des Modus Ponens (Abtrennungsregel). Da die normative Prämisse [...] zutrifft und der konkrete Fall [...] darunter subsumiert wird, ist die Konklusion [...] deduktiv zwingend begründet.",
    klausurSatzZh:
      "本项论证严格遵循肯定前件律（Modus Ponens）的形式逻辑构型。鉴于大前提所设定的规范要件成立，且小前提个案完全涵盖于该构成要件下，结论具有不可动摇的演绎必然性。",
  },
  modus_tollens: {
    id: "modus_tollens",
    nameDe: "Modus Tollens (Widerlegungsregel)",
    nameZh: "否定后件律 (反证驳斥构型)",
    category: "deductive",
    formulaPattern: "p -> q, ¬q ⊢ ¬p",
    p1Id: "mt_p1",
    p2Id: "mt_p2",
    concId: "mt_k",
    isValid: true,
    scoreNP: 15,
    scoreBreakdown: { formalValidity: 5, premiseSoundness: 5, klausurPrecision: 5 },
    explanationDe:
      "Formal deduktiv zwingend durch Kontraposition. Wird die notwendige Folge (Konsequens) negiert, kann die Ausgangsannahme (Antezedens) nicht wahr sein.",
    explanationZh:
      "形式演绎完全有效（逆否推导）。若结论所要求的必然结果被证实不成立，则初始前提假设必然为假。",
    klausurSatzDe:
      "Die Argumentation rekonstruiert sich als formal valider Modus Tollens: Die Falsifikation der notwendigen Bedingung [...] führt unweigerlich zur Zurückweisung der ursprünglichen Behauptung [...].",
    klausurSatzZh:
      "该项论证展现出严谨的否定后件律结构：由于必要充分条件在现实中被证伪，原命题自然被逻辑必然性彻底推翻。",
  },
  disjunctive_syllogism: {
    id: "disjunctive_syllogism",
    nameDe: "Disjunktiver Syllogismus (Trennungsregel)",
    nameZh: "析取三段论 (选言排除演绎)",
    category: "deductive",
    formulaPattern: "p ∨ q, ¬p ⊢ q",
    p1Id: "ds_p1",
    p2Id: "ds_p2",
    concId: "ds_k",
    isValid: true,
    scoreNP: 13,
    scoreBreakdown: { formalValidity: 5, premiseSoundness: 4, klausurPrecision: 4 },
    explanationDe:
      "Formal logisch valide. Im sozialwissenschaftlichen Kontext ist jedoch stets zu prüfen, ob die Disjunktion erschöpfend ist oder ein 'falsches Dilemma' vorliegt.",
    explanationZh:
      "形式逻辑完全有效。但在文科社科考查中需额外审视：二选一的前提是否属于人为构建的“虚假两难”（False Dilemma）。",
    klausurSatzDe:
      "Der Argumentationsstrang vollzieht einen disjunktiven Syllogismus. Unter der Voraussetzung, dass die Disjunktion [...] vollständig ist, erzwingt der Ausschluss der ersten Alternative [...] die Annahme der verbleibenden Option [...].",
    klausurSatzZh:
      "该论述采纳析取三段论架构。在确认选言支完备的前提下，对第一种方案的否定必然导向第二种备选路径的成立。",
  },
  affirming_consequent: {
    id: "affirming_consequent",
    nameDe: "Fehlschluss der Konsequenz-Bejahung",
    nameZh: "肯定后件谬误 (倒置推导)",
    category: "fallacy",
    formulaPattern: "p -> q, q ⊬ p",
    p1Id: "ac_p1",
    p2Id: "ac_p2",
    concId: "ac_k",
    isValid: false,
    fallacyNameDe: "Bejahung des Konsequens (Affirming the Consequent)",
    fallacyNameZh: "肯定后件谬误 (混淆充分条件与必要条件)",
    scoreNP: 4,
    scoreBreakdown: { formalValidity: 1, premiseSoundness: 2, klausurPrecision: 1 },
    explanationDe:
      "Formaler Denkfehler. Das Eintreten der Wirkung (q) beweist keineswegs die spezifische Ursache (p), da viele andere Einflussfaktoren (z.B. Rohstoffpreise, Nachfrageschocks) q hervorrufen können.",
    explanationZh:
      "典型形式谬误。后件结果（q）的发生不能反向推导前件原因（p）必然发生，因为可能存在其他多元诱发机制。",
    klausurSatzDe:
      "Die vorgelegte Beweisführung unterliegt dem formalen Fehlschluss der Bejahung des Konsequens: Aus der Beobachtung des Phänomens [...] lässt sich nicht zwingend auf die spezifische Ursache [...] schließen, da intervenierende Drittfaktoren ignoriert werden.",
    klausurSatzZh:
      "该论点犯了肯定后件的形式逻辑谬误：仅仅观察到结果现象并不能单一倒推定是某特定因素所致，作者忽略了外生干扰变量。",
  },
  false_causality: {
    id: "false_causality",
    nameDe: "Falsche Kausalität (Post hoc ergo propter hoc)",
    nameZh: "事后归因谬误 (时序混同因果)",
    category: "fallacy",
    formulaPattern: "A ante B ⊬ A causa B",
    p1Id: "fc_p1",
    p2Id: "fc_p2",
    concId: "fc_k",
    isValid: false,
    fallacyNameDe: "Post hoc ergo propter hoc (Scheinkorrelation)",
    fallacyNameZh: "事后归因 / 虚假相关性谬误",
    scoreNP: 5,
    scoreBreakdown: { formalValidity: 2, premiseSoundness: 2, klausurPrecision: 1 },
    explanationDe:
      "Inhaltlicher Fehlschluss. Eine rein zeitliche Abfolge zweier Ereignisse begründet keinen physikalischen oder ökonomischen Kausalzusammenhang.",
    explanationZh:
      "经验认知谬误。两个事件在时间顺序上的先后发生，绝不等同于二者存在因果关联，极可能属于虚假相关。",
    klausurSatzDe:
      "Der Verfasser verwechselt eine zeitliche Koinzidenz mit einem gesicherten Kausalzusammenhang (Post hoc ergo propter hoc). Der zeitliche Vorlauf von [...] begründet ohne empirisches Kontrollsetting keinen kausalen Wirkungsnachweis für [...].",
    klausurSatzZh:
      "作者将时间先后偶合混淆为实质因果机制（Post hoc ergo propter hoc）。若无严谨控制变量对照，单凭事件先后无法论证因果有效性。",
  },
  naturalistic_fallacy: {
    id: "naturalistic_fallacy",
    nameDe: "Naturalistischer Fehlschluss (Humes Gesetz)",
    nameZh: "自然主义谬误 (休谟实然-应然鸿沟)",
    category: "fallacy",
    formulaPattern: "Sein (Deskription) ⊬ Sollen (Norm)",
    p1Id: "nf_p1",
    p2Id: "nf_p2",
    concId: "nf_k",
    isValid: false,
    fallacyNameDe: "Naturalistischer Fehlschluss (Is-Ought Fallacy)",
    fallacyNameZh: "自然主义谬误 (从'实然'跳跃到'应然')",
    scoreNP: 3,
    scoreBreakdown: { formalValidity: 1, premiseSoundness: 1, klausurPrecision: 1 },
    explanationDe:
      "Ethischer Kardinalfehler. Aus rein empirisch-deskriptiven Tatsachenfeststellungen ('So ist es') lässt sich logisch kein normatives Werturteil ('So soll es sein') ableiten.",
    explanationZh:
      "伦理学根本谬误。从经验事实的客观描述（'事实如此'）无法直接跨越逻辑鸿沟推导出道德或政治规范（'应当如此'）。",
    klausurSatzDe:
      "Die Argumentation begeht einen klassischen naturalistischen Fehlschluss (Humesches Gesetz): Aus der rein deskriptiven Beobachtung von Naturgegebenheiten [...] wird unzulässigerweise eine normative Handlungsanweisung [...] abgeleitet.",
    klausurSatzZh:
      "该推论陷入了典型的自然主义谬误（休谟法则）：从对客观自然现象的描述性陈述，非法推演出了社会制度构建的规范性要求。",
  },
  begging_question: {
    id: "begging_question",
    nameDe: "Zirkelschluss (Petitio Principii)",
    nameZh: "循环论证 (偷换假定同义反复)",
    category: "fallacy",
    formulaPattern: "p ⊢ p (Tautologie)",
    p1Id: "bq_p1",
    p2Id: "bq_p2",
    concId: "bq_k",
    isValid: false,
    fallacyNameDe: "Petitio Principii / Zirkelschluss",
    fallacyNameZh: "循环论证 / 窃取论题",
    scoreNP: 2,
    scoreBreakdown: { formalValidity: 1, premiseSoundness: 1, klausurPrecision: 0 },
    explanationDe:
      "Scheinargument. Die zu begründende These wird in den Prämissen durch verdeckte Begriffsdefinitionen bereits als wahr vorausgesetzt.",
    explanationZh:
      "虚妄论证。待证明的命题已经在前提的定义中被直接设定为真，没有任何有效的信息增量。",
    klausurSatzDe:
      "Es liegt eine Petitio Principii (Zirkelschluss) vor: Die These [...] wird nicht durch unabhängige Argumente gestützt, sondern setzt ihre eigene Richtigkeit bereits in der Definition der Prämissen voraus.",
    klausurSatzZh:
      "此处存在明显的循环论证（Petitio Principii）：该论点并未获得独立论据的支撑，反而在大前提的概念界定中早已将其自证为真。",
  },
  straw_man: {
    id: "straw_man",
    nameDe: "Strohmann-Argument (Verzerrung)",
    nameZh: "稻草人谬误 (曲解攻击反方)",
    category: "fallacy",
    formulaPattern: "A' ≠ A, Widerlegung(A') ⊬ Widerlegung(A)",
    p1Id: "sm_p1",
    p2Id: "sm_p2",
    concId: "sm_k",
    isValid: false,
    fallacyNameDe: "Strohmann-Fehlschluss (Straw Man)",
    fallacyNameZh: "稻草人谬误 (树立靶子歪曲原意)",
    scoreNP: 4,
    scoreBreakdown: { formalValidity: 1, premiseSoundness: 2, klausurPrecision: 1 },
    explanationDe:
      "Rhetorischer Ablenkungsfehlschluss. Die eigentliche Gegenposition wird ins Extreme verzerrt dargestellt und anschließend dieses künstliche Zerrbild attackiert.",
    explanationZh:
      "修辞误导。故意将对手立场极端化歪曲为荒谬的假想敌（稻草人），随后通过击倒这个稻草人来宣称自己取得了胜利。",
    klausurSatzDe:
      "Die Kritik operiert mit einem Strohmann-Argument: Die differenzierte Position [...] wird ins Extrem verzerrt dargeboten, um die vermeintliche Widerlegung dieser Verzerrung als Sieg über die Ausgangsthese auszugeben.",
    klausurSatzZh:
      "该驳斥运用了稻草人论辩策略：先将对方关于 [...] 的审慎主张极端化曲解，再通过击溃这一畸变靶子来宣布驳倒对方原意。",
  },
};

export const LogicBlockBuilder: React.FC<LogicBlockBuilderProps> = ({
  title,
  lang = "de",
  onValidate,
  archetypeId = "modus_ponens",
}) => {
  const isDe = lang === "de";
  const initialDef = ARCHETYPES[archetypeId] || ARCHETYPES.modus_ponens;
  const mission = logicMissionFor(initialDef.id);

  // 当前槽位已装载的 block id（跟随课程预设原型，不再全课同一套 Modus Ponens）
  const [slotP1, setSlotP1] = useState<string>(initialDef.p1Id);
  const [slotP2, setSlotP2] = useState<string>(initialDef.p2Id);
  const [slotConc, setSlotConc] = useState<string>(initialDef.concId);

  // 当前活动选择器目标槽位（或 null 表示关闭选择面板）
  const [activePickerSlot, setActivePickerSlot] = useState<SlotId | null>(null);

  // 验证结果状态
  const [validationResult, setValidationResult] = useState<{
    checked: boolean;
    isValid: boolean;
    archetypeId: LogicArchetypeId | "custom_invalid";
    titleText: string;
    fallacyName?: string;
    npScore: number;
    breakdown: { formal: number; soundness: number; precision: number };
    explanation: string;
    klausurSatz: string;
  } | null>({
    checked: true,
    isValid: initialDef.isValid,
    archetypeId: initialDef.id,
    titleText: isDe ? initialDef.nameDe : initialDef.nameZh,
    fallacyName: isDe ? initialDef.fallacyNameDe : initialDef.fallacyNameZh,
    npScore: initialDef.scoreNP,
    breakdown: { formal: initialDef.scoreBreakdown.formalValidity, soundness: initialDef.scoreBreakdown.premiseSoundness, precision: initialDef.scoreBreakdown.klausurPrecision },
    explanation: isDe ? initialDef.explanationDe : initialDef.explanationZh,
    klausurSatz: isDe ? initialDef.klausurSatzDe : initialDef.klausurSatzZh,
  });

  // 获取槽位对象
  const bP1 = BLOCK_CATALOG.find((b) => b.id === slotP1);
  const bP2 = BLOCK_CATALOG.find((b) => b.id === slotP2);
  const bConc = BLOCK_CATALOG.find((b) => b.id === slotConc);

  // 加载预设题型
  const handleLoadArchetype = (archId: LogicArchetypeId) => {
    const def = ARCHETYPES[archId];
    setSlotP1(def.p1Id);
    setSlotP2(def.p2Id);
    setSlotConc(def.concId);

    const res = {
      checked: true,
      isValid: def.isValid,
      archetypeId: def.id,
      titleText: isDe ? def.nameDe : def.nameZh,
      fallacyName: isDe ? def.fallacyNameDe : def.fallacyNameZh,
      npScore: def.scoreNP,
      breakdown: {
        formal: def.scoreBreakdown.formalValidity,
        soundness: def.scoreBreakdown.premiseSoundness,
        precision: def.scoreBreakdown.klausurPrecision,
      },
      explanation: isDe ? def.explanationDe : def.explanationZh,
      klausurSatz: isDe ? def.klausurSatzDe : def.klausurSatzZh,
    };
    setValidationResult(res);

    if (onValidate) {
      const concItem = BLOCK_CATALOG.find((b) => b.id === def.concId);
      onValidate(def.isValid, concItem ? (isDe ? concItem.de : concItem.zh) : "");
    }
  };

  // 执行逻辑检查
  const handleValidate = () => {
    if (!slotP1 || !slotP2 || !slotConc) {
      setValidationResult({
        checked: true,
        isValid: false,
        archetypeId: "custom_invalid",
        titleText: isDe ? "Unvollständige Argumentation" : "论证结构不完整",
        npScore: 0,
        breakdown: { formal: 0, soundness: 0, precision: 0 },
        explanation: isDe
          ? "Bitte besetzen Sie alle 3 Positionen (Prämisse 1, Prämisse 2 und Konklusion), um eine formale Rekonstruktion durchzuführen."
          : "请完整填入大前提、小前提与结论三项槽位，方可开展形式逻辑推演。",
        klausurSatz: isDe
          ? "Das Fragment genügt nicht den formalen Kriterien einer vollständigen Syllogistik."
          : "当前残篇未达完整三段论之基础构成要件。",
      });
      return;
    }

    // 检查是否恰好匹配某个典范原型
    const matchedArchetype = (Object.keys(ARCHETYPES) as LogicArchetypeId[]).find((key) => {
      const def = ARCHETYPES[key];
      return def.p1Id === slotP1 && def.p2Id === slotP2 && def.concId === slotConc;
    });

    if (matchedArchetype) {
      const def = ARCHETYPES[matchedArchetype];
      const res = {
        checked: true,
        isValid: def.isValid,
        archetypeId: def.id,
        titleText: isDe ? def.nameDe : def.nameZh,
        fallacyName: isDe ? def.fallacyNameDe : def.fallacyNameZh,
        npScore: def.scoreNP,
        breakdown: {
          formal: def.scoreBreakdown.formalValidity,
          soundness: def.scoreBreakdown.premiseSoundness,
          precision: def.scoreBreakdown.klausurPrecision,
        },
        explanation: isDe ? def.explanationDe : def.explanationZh,
        klausurSatz: isDe ? def.klausurSatzDe : def.klausurSatzZh,
      };
      setValidationResult(res);
      if (onValidate && bConc) {
        onValidate(def.isValid, isDe ? bConc.de : bConc.zh);
      }
      return;
    }

    // 若非预设标准配对，分析跨源匹配与非因果断裂
    const res = {
      checked: true,
      isValid: false,
      archetypeId: "custom_invalid" as const,
      titleText: isDe ? "Invalider Non-Sequitur Schluss" : "无效推论 (非因果断裂 / 不搭调)",
      fallacyName: isDe ? "Non Sequitur (Folgt nicht)" : "推不出 (Non Sequitur)",
      npScore: 3,
      breakdown: { formal: 1, soundness: 1, precision: 1 },
      explanation: isDe
        ? "Die ausgewählten Prämissen und die Konklusion entstammen unverbundenen Diskursen oder verletzen die logische Kohärenz. Aus den gesetzten Annahmen lässt sich der Schlussatz formal nicht deduzieren."
        : "所选的大前提、小前提与结论属于不同语境或逻辑构型发生断裂。在此设定下，结论无法从前述前提中被有效推导得出。",
      klausurSatz: isDe
        ? "In der Klausuranalyse ist festzuhalten, dass die Konklusion nicht aus den Prämissen folgt (Non sequitur). Die logische Brücke zwischen Obersatz und Schlusssatz bricht ab."
        : "在考试作答分析中必须指出，该结论无法自前提中得出（Non sequitur）。大前提与结论之间的逻辑桥梁已然断裂。",
    };
    setValidationResult(res);
    if (onValidate && bConc) {
      onValidate(false, isDe ? bConc.de : bConc.zh);
    }
  };

  // 清空或选择重置
  const handleClearAll = () => {
    setSlotP1("");
    setSlotP2("");
    setSlotConc("");
    setValidationResult(null);
  };

  return (
    <div className="w-full border border-[var(--line)] bg-[var(--paper)] text-[var(--ink)] font-sans">
      {/* 模块头部栏 */}
      <div className="border-b border-[var(--line)] px-4 py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2 bg-[var(--paper-subtle)]">
        <div>
          <div className="text-xs font-mono uppercase tracking-wider text-[var(--ink-muted)]">
            {isDe ? "MicroWorld Modul 1 · Formale & Informale Logik" : "微世界模块 1 · 形式与非形式逻辑工坊"}
          </div>
          <h2 className="text-sm font-bold tracking-tight">
            {title || (isDe ? "Logik-Block-Baukasten (Argumentationsanalyse)" : "论证推理与因果积木")}
          </h2>
          <div className="text-[11px] font-serif text-[var(--ink)] mt-0.5">
            {isDe ? mission.missionDe : mission.missionZh}
          </div>
        </div>

        {/* 预设典范快速加载器 */}
        <div className="flex items-center gap-2">
          <label className="text-xs font-mono text-[var(--ink-muted)]">
            {isDe ? "Archetyp laden:" : "载入经典原型:"}
          </label>
          <select
            value={
              Object.keys(ARCHETYPES).find(
                (k) =>
                  ARCHETYPES[k as LogicArchetypeId].p1Id === slotP1 &&
                  ARCHETYPES[k as LogicArchetypeId].p2Id === slotP2 &&
                  ARCHETYPES[k as LogicArchetypeId].concId === slotConc
              ) || ""
            }
            onChange={(e) => {
              if (e.target.value) {
                handleLoadArchetype(e.target.value as LogicArchetypeId);
              }
            }}
            aria-label={isDe ? "Archetyp auswählen" : "选择逻辑原型"}
            className="text-xs font-mono px-2 py-1 border border-[var(--line)] bg-[var(--paper)] text-[var(--ink)] focus:outline-none cursor-pointer"
          >
            <option value="">{isDe ? "-- Freie Montage / Eigene Auswahl --" : "-- 自定义组装探索 --"}</option>
            {(Object.keys(ARCHETYPES) as LogicArchetypeId[]).map((archKey) => {
              const item = ARCHETYPES[archKey];
              return (
                <option key={archKey} value={archKey}>
                  [{item.isValid ? "GÜLTIG" : "FEHLER"}] {isDe ? item.nameDe : item.nameZh}
                </option>
              );
            })}
          </select>
        </div>
      </div>

      {/* SVG 逻辑推演流线图 (Data-Ink 纯黑白几何可视化) */}
      <div className="p-4 border-b border-[var(--line)] bg-[var(--paper)]">
        <div className="text-xs font-mono text-[var(--ink-muted)] mb-2 flex items-center justify-between">
          <span>{isDe ? "SYNTHESE-VEKTOR (DEDUKTIONSPFAD)" : "演绎向量路径图 (DEDUCTION PIPELINE)"}</span>
          <span className="font-mono">
            {validationResult?.checked
              ? validationResult.isValid
                ? "[VALIDE DEDUKTION]"
                : "[FEHLSCHLUSS ERKANNT]"
              : "[BEREIT ZUR PRÜFUNG]"}
          </span>
        </div>

        <div className="w-full overflow-x-auto border border-[var(--line)] bg-[var(--paper-subtle)] p-2">
          <svg
            viewBox="0 0 760 180"
            className="w-full max-w-[760px] mx-auto block text-[var(--ink)]"
            aria-label={isDe ? "Logik-Flussdiagramm" : "逻辑推理推导流图"}
          >
            <defs>
              <marker
                id="logic-arrow-solid"
                viewBox="0 0 10 10"
                refX="6"
                refY="5"
                markerWidth="6"
                markerHeight="6"
                orient="auto-start-reverse"
              >
                <path d="M 0 1 L 8 5 L 0 9 z" fill="currentColor" />
              </marker>
              <marker
                id="logic-arrow-cross"
                viewBox="0 0 10 10"
                refX="5"
                refY="5"
                markerWidth="6"
                markerHeight="6"
                orient="auto"
              >
                <line x1="2" y1="2" x2="8" y2="8" stroke="currentColor" strokeWidth="1.5" />
                <line x1="8" y1="2" x2="2" y2="8" stroke="currentColor" strokeWidth="1.5" />
              </marker>
            </defs>

            {/* 背景对齐基准细线 */}
            <line x1="20" y1="90" x2="740" y2="90" stroke="var(--line)" strokeWidth="1" strokeDasharray="2 4" />

            {/* 槽位 1 框体: Prämisse 1 */}
            <g
              style={{ transformOrigin: "125px 45px", transformBox: "view-box" }}
              className="transition-transform duration-150"
            >
              <rect
                x="20"
                y="15"
                width="210"
                height="60"
                fill="var(--paper)"
                stroke="var(--line)"
                strokeWidth="1.5"
              />
              <text x="30" y="32" className="text-[10px] font-mono font-bold" fill="var(--ink)">
                PRÄMISSE 1 (OBERSATZ)
              </text>
              <text x="30" y="47" className="text-[9px] font-mono" fill="var(--ink-muted)">
                {bP1 ? `FORMEL: ${bP1.formula}` : "[LEER / BITTE WÄHLEN]"}
              </text>
              <text x="30" y="62" className="text-[9px] font-mono" fill="var(--ink)">
                {bP1 ? (isDe ? bP1.de.slice(0, 28) + "..." : bP1.zh.slice(0, 16) + "...") : "---"}
              </text>
            </g>

            {/* 槽位 2 框体: Prämisse 2 */}
            <g
              style={{ transformOrigin: "125px 135px", transformBox: "view-box" }}
              className="transition-transform duration-150"
            >
              <rect
                x="20"
                y="105"
                width="210"
                height="60"
                fill="var(--paper)"
                stroke="var(--line)"
                strokeWidth="1.5"
              />
              <text x="30" y="122" className="text-[10px] font-mono font-bold" fill="var(--ink)">
                PRÄMISSE 2 (UNTERSATZ)
              </text>
              <text x="30" y="137" className="text-[9px] font-mono" fill="var(--ink-muted)">
                {bP2 ? `FORMEL: ${bP2.formula}` : "[LEER / BITTE WÄHLEN]"}
              </text>
              <text x="30" y="152" className="text-[9px] font-mono" fill="var(--ink)">
                {bP2 ? (isDe ? bP2.de.slice(0, 28) + "..." : bP2.zh.slice(0, 16) + "...") : "---"}
              </text>
            </g>

            {/* 连接向量: P1 -> 中心算子 */}
            <path
              d="M 230 45 C 290 45, 300 90, 340 90"
              fill="none"
              stroke="var(--ink)"
              strokeWidth={validationResult?.isValid ? "1.8" : "1.2"}
              strokeDasharray={validationResult?.isValid ? "none" : "3 3"}
            />

            {/* 连接向量: P2 -> 中心算子 */}
            <path
              d="M 230 135 C 290 135, 300 90, 340 90"
              fill="none"
              stroke="var(--ink)"
              strokeWidth={validationResult?.isValid ? "1.8" : "1.2"}
              strokeDasharray={validationResult?.isValid ? "none" : "3 3"}
            />

            {/* 核心算子节点 (Syntheseknoten) */}
            <g
              style={{ transformOrigin: "370px 90px", transformBox: "view-box" }}
              className="transition-transform duration-150"
            >
              <circle
                cx="370"
                cy="90"
                r="28"
                fill="var(--paper)"
                stroke="var(--ink)"
                strokeWidth="2"
              />
              <text
                x="370"
                y="86"
                textAnchor="middle"
                className="text-[12px] font-mono font-bold"
                fill="var(--ink)"
              >
                {validationResult?.checked
                  ? validationResult.isValid
                    ? "⊢"
                    : "⊬"
                  : "∧"}
              </text>
              <text
                x="370"
                y="102"
                textAnchor="middle"
                className="text-[8px] font-mono"
                fill="var(--ink-muted)"
              >
                {validationResult?.checked
                  ? validationResult.isValid
                    ? "VALID"
                    : "FEHLER"
                  : "SYNTHESE"}
              </text>
            </g>

            {/* 连接向量: 中心算子 -> 结论 */}
            <path
              d="M 398 90 L 510 90"
              fill="none"
              stroke="var(--ink)"
              strokeWidth={validationResult?.isValid ? "2.2" : "1.5"}
              strokeDasharray={validationResult?.isValid ? "none" : "4 4"}
              markerEnd={
                validationResult?.checked && !validationResult.isValid
                  ? "url(#logic-arrow-cross)"
                  : "url(#logic-arrow-solid)"
              }
            />

            {/* 槽位 3 框体: Konklusion */}
            <g
              style={{ transformOrigin: "630px 90px", transformBox: "view-box" }}
              className="transition-transform duration-150"
            >
              <rect
                x="520"
                y="40"
                width="220"
                height="100"
                fill="var(--paper)"
                stroke={validationResult?.isValid ? "var(--ink)" : "var(--line)"}
                strokeWidth={validationResult?.isValid ? "2" : "1.5"}
              />
              <text x="532" y="60" className="text-[10px] font-mono font-bold" fill="var(--ink)">
                KONKLUSION (FOLGERUNG)
              </text>
              <text x="532" y="76" className="text-[9px] font-mono" fill="var(--ink-muted)">
                {bConc ? `FORMEL: ${bConc.formula}` : "[LEER / BITTE WÄHLEN]"}
              </text>
              <text x="532" y="94" className="text-[9px] font-mono" fill="var(--ink)">
                {bConc
                  ? (isDe ? bConc.de.slice(0, 32) : bConc.zh.slice(0, 18)) + "..."
                  : "---"}
              </text>
              <text x="532" y="112" className="text-[9px] font-mono" fill="var(--ink)">
                {bConc && (isDe ? bConc.de.slice(32, 64) : bConc.zh.slice(18, 36))}
              </text>
              <rect
                x="532"
                y="122"
                width="80"
                height="12"
                fill="var(--paper-subtle)"
                stroke="var(--line)"
                strokeWidth="1"
              />
              <text x="536" y="131" className="text-[8px] font-mono font-bold" fill="var(--ink)">
                {validationResult?.isValid ? "STATUS: ERWIESEN" : "STATUS: UNGESICHERT"}
              </text>
            </g>
          </svg>
        </div>
      </div>

      {/* 工作台三联卡槽 (Die 3 Montage-Slots) */}
      <div className="p-4 grid grid-cols-1 md:grid-cols-3 gap-3 border-b border-[var(--line)]">
        {/* Slot 1: Prämisse 1 */}
        <div className="border border-[var(--line)] p-3 bg-[var(--paper)] flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-1 mb-2 border-b border-[var(--line)]">
              <span className="text-xs font-mono font-bold">
                [SLOT 1] {isDe ? "Prämisse 1 (Obersatz)" : "大前提 (普遍公理)"}
              </span>
              <span className="text-[10px] font-mono px-1 border border-[var(--line)] bg-[var(--paper-subtle)]">
                {bP1 ? bP1.formula : "EMPTY"}
              </span>
            </div>
            <div className="min-h-[72px] text-xs font-mono leading-relaxed">
              {bP1 ? (
                <div>
                  <p className="text-[var(--ink)] mb-1">{isDe ? bP1.de : bP1.zh}</p>
                </div>
              ) : (
                <div className="text-[var(--ink-muted)] text-[11px]">
                  {isDe ? "Kein Baustein eingesetzt." : "尚未置入论证积木。"}
                </div>
              )}
            </div>
          </div>
          <div className="flex items-center gap-2 mt-2 pt-2 border-t border-[var(--line)]">
            <button
              type="button"
              onClick={() => setActivePickerSlot(activePickerSlot === "premise1" ? null : "premise1")}
              className="flex-1 text-xs font-mono px-2 py-1 border border-[var(--line)] hover:border-[var(--ink)] bg-[var(--paper-subtle)] cursor-pointer"
            >
              {activePickerSlot === "premise1"
                ? (isDe ? "Schließen" : "收起")
                : (isDe ? "Baustein wählen ->" : "选取积木 ->")}
            </button>
            {slotP1 && (
              <button
                type="button"
                onClick={() => setSlotP1("")}
                className="text-xs font-mono px-2 py-1 border border-[var(--line)] hover:border-[var(--ink)] text-[var(--ink-muted)] cursor-pointer"
              >
                [X]
              </button>
            )}
          </div>
        </div>

        {/* Slot 2: Prämisse 2 */}
        <div className="border border-[var(--line)] p-3 bg-[var(--paper)] flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-1 mb-2 border-b border-[var(--line)]">
              <span className="text-xs font-mono font-bold">
                [SLOT 2] {isDe ? "Prämisse 2 (Untersatz)" : "小前提 (具体案例)"}
              </span>
              <span className="text-[10px] font-mono px-1 border border-[var(--line)] bg-[var(--paper-subtle)]">
                {bP2 ? bP2.formula : "EMPTY"}
              </span>
            </div>
            <div className="min-h-[72px] text-xs font-mono leading-relaxed">
              {bP2 ? (
                <div>
                  <p className="text-[var(--ink)] mb-1">{isDe ? bP2.de : bP2.zh}</p>
                </div>
              ) : (
                <div className="text-[var(--ink-muted)] text-[11px]">
                  {isDe ? "Kein Baustein eingesetzt." : "尚未置入论证积木。"}
                </div>
              )}
            </div>
          </div>
          <div className="flex items-center gap-2 mt-2 pt-2 border-t border-[var(--line)]">
            <button
              type="button"
              onClick={() => setActivePickerSlot(activePickerSlot === "premise2" ? null : "premise2")}
              className="flex-1 text-xs font-mono px-2 py-1 border border-[var(--line)] hover:border-[var(--ink)] bg-[var(--paper-subtle)] cursor-pointer"
            >
              {activePickerSlot === "premise2"
                ? (isDe ? "Schließen" : "收起")
                : (isDe ? "Baustein wählen ->" : "选取积木 ->")}
            </button>
            {slotP2 && (
              <button
                type="button"
                onClick={() => setSlotP2("")}
                className="text-xs font-mono px-2 py-1 border border-[var(--line)] hover:border-[var(--ink)] text-[var(--ink-muted)] cursor-pointer"
              >
                [X]
              </button>
            )}
          </div>
        </div>

        {/* Slot 3: Konklusion */}
        <div className="border border-[var(--line)] p-3 bg-[var(--paper)] flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-1 mb-2 border-b border-[var(--line)]">
              <span className="text-xs font-mono font-bold">
                [SLOT 3] {isDe ? "Konklusion (Schlusssatz)" : "推导结论 (逻辑推断)"}
              </span>
              <span className="text-[10px] font-mono px-1 border border-[var(--line)] bg-[var(--paper-subtle)]">
                {bConc ? bConc.formula : "EMPTY"}
              </span>
            </div>
            <div className="min-h-[72px] text-xs font-mono leading-relaxed">
              {bConc ? (
                <div>
                  <p className="text-[var(--ink)] mb-1">{isDe ? bConc.de : bConc.zh}</p>
                </div>
              ) : (
                <div className="text-[var(--ink-muted)] text-[11px]">
                  {isDe ? "Keine Konklusion eingesetzt." : "尚未置入结论。"}
                </div>
              )}
            </div>
          </div>
          <div className="flex items-center gap-2 mt-2 pt-2 border-t border-[var(--line)]">
            <button
              type="button"
              onClick={() => setActivePickerSlot(activePickerSlot === "conclusion" ? null : "conclusion")}
              className="flex-1 text-xs font-mono px-2 py-1 border border-[var(--line)] hover:border-[var(--ink)] bg-[var(--paper-subtle)] cursor-pointer"
            >
              {activePickerSlot === "conclusion"
                ? (isDe ? "Schließen" : "收起")
                : (isDe ? "Baustein wählen ->" : "选取积木 ->")}
            </button>
            {slotConc && (
              <button
                type="button"
                onClick={() => setSlotConc("")}
                className="text-xs font-mono px-2 py-1 border border-[var(--line)] hover:border-[var(--ink)] text-[var(--ink-muted)] cursor-pointer"
              >
                [X]
              </button>
            )}
          </div>
        </div>
      </div>

      {/* 展开的备选积木选择面板 */}
      {activePickerSlot && (
        <div className="p-4 bg-[var(--paper-subtle)] border-b border-[var(--line)]">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-mono font-bold">
              {isDe ? `BAUSTEIN-AUSWAHL FÜR ${activePickerSlot.toUpperCase()}` : `选择置入 ${activePickerSlot.toUpperCase()} 的知识积木`}
            </span>
            <button
              type="button"
              onClick={() => setActivePickerSlot(null)}
              className="text-xs font-mono text-[var(--ink-muted)] hover:text-[var(--ink)] cursor-pointer"
            >
              [CLOSE]
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 max-h-56 overflow-y-auto">
            {BLOCK_CATALOG.filter((b) => b.slotType === activePickerSlot).map((item) => {
              const isSelected =
                (activePickerSlot === "premise1" && slotP1 === item.id) ||
                (activePickerSlot === "premise2" && slotP2 === item.id) ||
                (activePickerSlot === "conclusion" && slotConc === item.id);

              return (
                <div
                  key={item.id}
                  onClick={() => {
                    if (activePickerSlot === "premise1") setSlotP1(item.id);
                    if (activePickerSlot === "premise2") setSlotP2(item.id);
                    if (activePickerSlot === "conclusion") setSlotConc(item.id);
                    setActivePickerSlot(null);
                  }}
                  className={`p-2.5 border text-xs font-mono cursor-pointer transition-colors ${
                    isSelected
                      ? "border-[var(--ink)] bg-[var(--paper)] font-bold"
                      : "border-[var(--line)] bg-[var(--paper)] hover:border-[var(--ink)]"
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-[10px] text-[var(--ink-muted)]">
                      {item.formula} · {item.archetypeId}
                    </span>
                    {isSelected && (
                      <span className="text-[10px] px-1 border border-[var(--ink)] bg-[var(--ink)] text-[var(--paper)]">
                        AKTIV
                      </span>
                    )}
                  </div>
                  <p className="line-clamp-2 leading-relaxed">{isDe ? item.de : item.zh}</p>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* 验证操作栏 */}
      <div className="p-4 bg-[var(--paper)] flex flex-wrap items-center justify-between gap-3 border-b border-[var(--line)]">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleValidate}
            className="text-xs font-mono font-bold px-4 py-2 border border-[var(--ink)] bg-[var(--ink)] text-[var(--paper)] hover:bg-[var(--paper)] hover:text-[var(--ink)] transition-colors cursor-pointer"
          >
            {isDe ? "Gültigkeit prüfen ->" : "执行逻辑验证 ->"}
          </button>
          <button
            type="button"
            onClick={handleClearAll}
            className="text-xs font-mono px-3 py-2 border border-[var(--line)] hover:border-[var(--ink)] bg-[var(--paper-subtle)] text-[var(--ink)] cursor-pointer"
          >
            {isDe ? "Alle leeren" : "重置全部槽位"}
          </button>
        </div>

        <div className="text-xs font-mono text-[var(--ink-muted)]">
          {isDe
            ? "Gymnasiale Oberstufe: Bewertung nach AFB II / AFB III Kriterien (0-15 NP)"
            : "北威州高中会考标准：AFB II / AFB III 结构化评分体系 (0-15 NP)"}
        </div>
      </div>

      {/* 实时反馈与 15 NP 评分卡片 */}
      {validationResult && validationResult.checked && (
        <div className="p-4 bg-[var(--paper-subtle)] space-y-4">
          {/* 状态徽章与总分看板 */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[var(--line)]">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span
                  className={`text-xs font-mono px-2 py-0.5 border ${
                    validationResult.isValid
                      ? "border-[var(--ink)] bg-[var(--ink)] text-[var(--paper)] font-bold"
                      : "border-[var(--line)] bg-[var(--paper)] text-[var(--ink)] font-bold"
                  }`}
                >
                  {validationResult.isValid
                    ? (isDe ? "LOGISCH VALIDE" : "逻辑有效")
                    : (isDe ? "FEHLSCHLUSS" : "存在逻辑谬误")}
                </span>
                <span className="text-sm font-bold tracking-tight">
                  {validationResult.titleText}
                </span>
              </div>
              {validationResult.fallacyName && (
                <div className="text-xs font-mono text-[var(--ink)]">
                  {isDe ? "Identifizierter Fehlschluss:" : "已捕获谬误类型:"}{" "}
                  <span className="font-bold underline">{validationResult.fallacyName}</span>
                </div>
              )}
            </div>

            {/* 15 Notenpunkte (NP) 卡牌 */}
            <div className="flex items-center gap-3 bg-[var(--paper)] border border-[var(--line)] px-3 py-2">
              <div className="text-right">
                <div className="text-[10px] font-mono text-[var(--ink-muted)] uppercase">
                  {isDe ? "Abitur-Punkte (AFB II/III)" : "会考考核量分 (AFB II/III)"}
                </div>
                <div className="text-xs font-mono">
                  {validationResult.npScore >= 13
                    ? (isDe ? "Sehr gut (1)" : "优秀等级 (1)")
                    : validationResult.npScore >= 10
                    ? (isDe ? "Gut (2)" : "良好等级 (2)")
                    : validationResult.npScore >= 7
                    ? (isDe ? "Befriedigend (3)" : "中等等级 (3)")
                    : (isDe ? "Mangelhaft (5)" : "不及格 (5)")}
                </div>
              </div>
              <div className="border-l border-[var(--line)] pl-3">
                <div className="text-2xl font-bold font-mono tracking-tight text-[var(--ink)]">
                  {validationResult.npScore} <span className="text-xs font-normal">/ 15 NP</span>
                </div>
              </div>
            </div>
          </div>

          {/* 三重细分评分依据矩阵 (Sub-Kriterien) */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs font-mono">
            <div className="border border-[var(--line)] bg-[var(--paper)] p-2">
              <div className="text-[var(--ink-muted)] text-[10px] uppercase">
                {isDe ? "1. Formale Validität" : "1. 形式逻辑有效性"}
              </div>
              <div className="text-sm font-bold my-0.5">
                {validationResult.breakdown.formal} / 5 NP
              </div>
              <p className="text-[10px] text-[var(--ink-muted)] leading-tight">
                {isDe
                  ? "Deduktive Zwingung des Schlusses aus den Prämissen."
                  : "结论是否由前提在形式上必然产生。"}
              </p>
            </div>

            <div className="border border-[var(--line)] bg-[var(--paper)] p-2">
              <div className="text-[var(--ink-muted)] text-[10px] uppercase">
                {isDe ? "2. Prämissen-Haltbarkeit" : "2. 前提实质真伪度"}
              </div>
              <div className="text-sm font-bold my-0.5">
                {validationResult.breakdown.soundness} / 5 NP
              </div>
              <p className="text-[10px] text-[var(--ink-muted)] leading-tight">
                {isDe
                  ? "Empirische und normative Tragfähigkeit der Annahmen."
                  : "经验与规范层面上前提的可靠性与事实支撑。"}
              </p>
            </div>

            <div className="border border-[var(--line)] bg-[var(--paper)] p-2">
              <div className="text-[var(--ink-muted)] text-[10px] uppercase">
                {isDe ? "3. Klausur-Präzision" : "3. 考场论证严谨度"}
              </div>
              <div className="text-sm font-bold my-0.5">
                {validationResult.breakdown.precision} / 5 NP
              </div>
              <p className="text-[10px] text-[var(--ink-muted)] leading-tight">
                {isDe
                  ? "Exakte Operator-Verwendung (begründen/analysieren)."
                  : "精确运用考纲指令动词（论证/分析/评判）。"}
              </p>
            </div>
          </div>

          {/* 深度逻辑阐释与考点解析 */}
          <div className="border border-[var(--line)] bg-[var(--paper)] p-3 space-y-2">
            <div className="text-xs font-mono font-bold text-[var(--ink)]">
              {isDe ? "LOGISCHE REKONSTRUKTION & URTEILSBILDUNG:" : "逻辑结构重构与深度评析:"}
            </div>
            <p className="text-xs leading-relaxed text-[var(--ink)]">
              {validationResult.explanation}
            </p>

            <div className="pt-2 border-t border-[var(--line)]">
              <div className="text-[10px] font-mono uppercase text-[var(--ink-muted)] mb-1">
                {isDe ? "Klausur-Satzbaustein (Abitur-Musterformulierung):" : "考场满分话术模板 (可直接运用于论述题答卷):"}
              </div>
              <div className="p-2 border border-[var(--line)] bg-[var(--paper-subtle)] text-xs font-mono leading-relaxed select-all">
                {validationResult.klausurSatz}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
