// 从 Vault 笔记结构中动态抽取并组装全真三段式 Klausur 考卷
// 算法解析: 争议/辨析 (Material) -> 德语 Klausur-Sätze (AFB I-III) -> Fehlerlog (评分要点警示)

import type { KlausurExam, KlausurAufgabe, KlausurGradingResult } from "../types/klausur";
import { percentToNotenpunkte } from "../types/klausur";
import { tokenize } from "./bm25";

export interface RawNoteInput {
  path: string;
  fach: string;
  thema: string;
  content: string; // Markdown 源码
  operatoren?: string[];
  klausurrelevant?: boolean;
}

/** 提取 Markdown 中指定标题二级或三级章节内容 */
function extractSection(content: string, headingRegex: RegExp): string {
  const lines = content.split("\n");
  let capturing = false;
  const captured: string[] = [];

  for (const line of lines) {
    if (/^##\s+/.test(line)) {
      if (capturing) break;
      if (headingRegex.test(line)) {
        capturing = true;
        continue;
      }
    }
    if (capturing) {
      captured.push(line);
    }
  }

  return captured.join("\n").trim();
}

/** 提取德语 Klausur-Sätze 中的各个 Operator 句子 */
function extractOperatorSentences(klausurSection: string): Record<string, string[]> {
  const result: Record<string, string[]> = {
    darstellen: [],
    analysieren: [],
    beurteilen: [],
    vergleichen: [],
    eroertern: [],
  };

  const lines = klausurSection.split("\n");
  for (const line of lines) {
    const trimmed = line.replace(/^[-*]\s+/, "").trim();
    const match = trimmed.match(/^([A-Za-zäöüÄÖÜ]+)\s*:\s*`?([^`]+)`?/i);
    if (match) {
      const op = match[1].toLowerCase();
      const sentence = match[2].trim();
      if (result[op]) {
        result[op].push(sentence);
      } else {
        result[op] = [sentence];
      }
    }
  }

  return result;
}

/** 从笔记源码算法抽取生成 KlausurExam */
export function extractKlausurFromNote(note: RawNoteInput): KlausurExam {
  const controversySec = extractSection(note.content, /(争议|辨析|Pro|Contra|Kontroverse)/i);
  const klausurSaetzeSec = extractSection(note.content, /(Klausur-Sätze|Operatoren|德语)/i);
  const opMap = extractOperatorSentences(klausurSaetzeSec);

  // 1. 组装材料 (Material / Textgrundlage)
  let materialText = controversySec;
  if (!materialText || materialText.length < 50) {
    // 降级使用正文第一部分 (中文/概念梳理)
    const firstSec = extractSection(note.content, /(讲一遍|Feynman|Grundlagen|Einführung)/i);
    materialText = firstSec || note.content.slice(0, 500);
  }

  // 提取关键词
  const keywords = Array.from(new Set(tokenize(`${note.thema} ${materialText}`))).slice(0, 10);

  // 2. 构造 Aufgabe 1 (AFB I: Darstellen / Zusammenfassen, 25 Punkte)
  const darstellenSentences = opMap.darstellen || [];
  const afb1: KlausurAufgabe = {
    afb: "AFB I",
    operator: "Darstellen",
    promptDE: `Stellen Sie die zentralen Begriffsmerkmale und Dimensionen von „${note.thema}“ strukturiert und in präziser Fachsprache dar.`,
    promptZH: "阐述核心概念与基本维度，注意语言客观中立，严禁带入主观评价。",
    maxPoints: 25,
    expectedPoints:
      darstellenSentences.length > 0
        ? darstellenSentences
        : [`Präzise Definition von ${note.thema}`, "Nennung der wesentlichen Dimensionen und Akteure"],
    sampleSolution:
      darstellenSentences[0] ||
      `${note.thema} bezeichnet die strukturellen Merkmale und institutionellen Rahmenbedingungen auf EF-Niveau.`,
  };

  // 3. 构造 Aufgabe 2 (AFB II: Analysieren / Vergleichen, 45 Punkte)
  const analysierenSentences = opMap.analysieren || opMap.vergleichen || [];
  const afb2: KlausurAufgabe = {
    afb: "AFB II",
    operator: "Analysieren",
    promptDE: `Analysieren Sie die Ursachen, Zusammenhänge und gegensätzlichen Positionen am vorliegenden Material unter Einbezug relevanter fachwissenschaftlicher Modelle.`,
    promptZH: "结合所给材料，运用学科理论剖析深层成因与对立立场，注意紧扣材料并引用论据。",
    maxPoints: 45,
    expectedPoints:
      analysierenSentences.length > 0
        ? analysierenSentences
        : ["Herausarbeiten der zentralen Thesen und Argumentationsstrukturen", "Theoriebezogene Verknüpfung der Wirkungsketten"],
    sampleSolution:
      analysierenSentences[0] ||
      `Am Material wird deutlich, dass strukturelle Ursachen die Handlungsspielräume der Akteure maßgeblich bestimmen.`,
  };

  // 4. 构造 Aufgabe 3 (AFB III: Beurteilen / Erörtern, 30 Punkte)
  const beurteilenSentences = opMap.beurteilen || opMap.eroertern || [];
  const afb3: KlausurAufgabe = {
    afb: "AFB III",
    operator: "Beurteilen",
    promptDE: `Beurteilen Sie die im Material dargestellten Maßnahmen oder Forderungen kriteriengeleitet (z. B. nach Effizienz und Chancengerechtigkeit) und formulieren Sie ein eigenständiges Fazit.`,
    promptZH: "依据明确的标准（如效率与正义/合法性）进行双向权衡论证，亮明评判基准，给出逻辑自洽的最终结论。",
    maxPoints: 30,
    expectedPoints:
      beurteilenSentences.length > 0
        ? beurteilenSentences
        : ["Explizite Nennung von Beurteilungskriterien", "Gegenüberstellung von Pro- und Contra-Argumenten", "Abschließendes begründetes Sachurteil"],
    sampleSolution:
      beurteilenSentences[0] ||
      `Nach dem Kriterium der Chancengerechtigkeit und Effizienz erweist sich eine differenzierte politische Steuerung als legitim.`,
  };

  return {
    id: `klausur-${note.path.replace(/[^a-zA-Z0-9]/g, "-")}`,
    fach: note.fach,
    thema: note.thema,
    sourceNotePath: note.path,
    material: {
      title: `Materialgrundlage: Kontroversen zu ${note.thema}`,
      authorOrSource: `Vault Fallstudie (${note.fach})`,
      text: materialText,
      keywords,
    },
    aufgaben: [afb1, afb2, afb3],
    recommendedMinutes: 45,
  };
}

/** 本地极速启发式评分器 (零延迟评分，作为本地离线与基准打分) */
export function evaluateKlausurLocally(
  exam: KlausurExam,
  studentAnswers: [string, string, string] // AFB I, II, III 作答内容
): KlausurGradingResult {
  const afbScores = exam.aufgaben.map((aufgabe, idx) => {
    const answer = (studentAnswers[idx] || "").trim();
    const answerTokens = new Set(tokenize(answer));

    let hitPoints = 0;
    const missing: string[] = [];

    // 检查每个期望得分要点的关键词覆盖度
    for (const exp of aufgabe.expectedPoints) {
      const expTokens = tokenize(exp);
      const matched = expTokens.filter((t) => answerTokens.has(t));
      if (matched.length >= Math.min(2, expTokens.length)) {
        hitPoints++;
      } else {
        missing.push(exp);
      }
    }

    // 长度与论证基线评估 (简答与详述合理兼顾)
    const wordCount = answer.split(/\s+/).filter(Boolean).length;
    let lengthFactor = 1.0;
    if (idx === 0 && wordCount < 10) lengthFactor = 0.6;
    if (idx === 1 && wordCount < 15) lengthFactor = 0.6;
    if (idx === 2 && wordCount < 15) lengthFactor = 0.6;

    // AFB III 特别检查：是否显式指明了 Kriterium (如 Kriterium, Effizienz, Gerechtigkeit)
    let criteriaBonus = 1.0;
    if (idx === 2) {
      const hasCriteriaWord = /(kriterium|effizienz|legitimität|gerechtigkeit|angemessen|verfassung)/i.test(answer);
      if (!hasCriteriaWord) {
        criteriaBonus = 0.7; // 缺少标准扣除部分分数
        missing.push("Kriterienurteil fehlt (z. B. Effizienz, Legitimität oder Gerechtigkeit)");
      }
    }

    const ratio = aufgabe.expectedPoints.length > 0 ? hitPoints / aufgabe.expectedPoints.length : 0.6;
    const points = Math.min(
      aufgabe.maxPoints,
      Math.round(aufgabe.maxPoints * (0.35 + 0.65 * ratio) * lengthFactor * criteriaBonus)
    );

    let feedback = "";
    if (points >= aufgabe.maxPoints * 0.8) {
      feedback = "Hervorragende Bearbeitung mit treffender Fachterminologie.";
    } else if (points >= aufgabe.maxPoints * 0.6) {
      feedback = "Solide Argumentation, jedoch sollten die Theorien und Fachbegriffe noch präziser herausgearbeitet werden.";
    } else {
      feedback = "Wesentliche Prüfungselemente fehlen oder sind unzureichend aus dem Material belegt.";
    }

    return {
      afb: aufgabe.afb,
      points: Math.max(0, points),
      maxPoints: aufgabe.maxPoints,
      feedbackDE: feedback,
      missingKeyPoints: missing,
    };
  });

  // 表述分 (Darstellungsleistung, max 20 Punkte)
  const totalWords = studentAnswers.join(" ").split(/\s+/).filter(Boolean).length;
  let darstellungPoints = 14;
  if (totalWords >= 80) darstellungPoints = 18;
  else if (totalWords >= 40) darstellungPoints = 16;
  else if (totalWords < 20) darstellungPoints = 8;

  const darstellungFeedback =
    darstellungPoints >= 16
      ? "Klar strukturierte Gedankenführung im akademischen Klausurstil."
      : "Verbindungssätze und Operatoren-gerechte Einleitungen sollten vertieft werden.";

  const inhaltsPoints = afbScores.reduce((sum, s) => sum + s.points, 0);
  const totalPoints = inhaltsPoints + darstellungPoints;
  const maxTotalPoints = 120; // 100 Inhaltsleistung + 20 Darstellungsleistung
  const percentage = Math.round((totalPoints / maxTotalPoints) * 100);

  const { notenpunkte, noteStr } = percentToNotenpunkte(percentage);

  // 整理补丁到 Fehlerlog
  const fehlerlogPatch: string[] = [];
  afbScores.forEach((s) => {
    s.missingKeyPoints.forEach((m) => {
      fehlerlogPatch.push(`- [ ] ${exam.thema} (${s.afb}): ${m}`);
    });
  });

  return {
    afbScores,
    darstellungScore: {
      points: darstellungPoints,
      maxPoints: 20,
      feedbackDE: darstellungFeedback,
    },
    totalPoints,
    maxTotalPoints,
    percentage,
    notenpunkte,
    deutscheNote: noteStr,
    fehlerlogPatch,
  };
}
