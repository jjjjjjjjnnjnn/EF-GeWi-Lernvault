import { describe, it, expect } from "vitest";
import {
  distillConcept,
  listSupportedPreloadedTopics,
  type DistilledConcept,
} from "./conceptDistiller";

describe("Concept Distillation Engine: conceptDistiller", () => {
  const allowedOperators = ["analysieren", "darstellen", "beurteilen", "eroertern"] as const;

  function validateDistilledConcept(res: DistilledConcept) {
    expect(res.topicTitle).toBeTruthy();
    expect(res.fach).toBeTruthy();

    // Analogy
    expect(res.mentalModelAnalogy.analogyTitle).toBeTruthy();
    expect(res.mentalModelAnalogy.explanationDE).toBeTruthy();
    expect(res.mentalModelAnalogy.explanationZH).toBeTruthy();

    // KLP Termini
    expect(res.klpTermini.length).toBeGreaterThanOrEqual(2);
    for (const t of res.klpTermini) {
      expect(t.termDE).toBeTruthy();
      expect(t.definitionDE).toBeTruthy();
      expect(t.termZH).toBeTruthy();
      expect(t.definitionZH).toBeTruthy();
    }

    // Fehlerquellen
    expect(res.fehlerquellen.length).toBeGreaterThanOrEqual(2);
    for (const f of res.fehlerquellen) {
      expect(f.trapTitleDE).toBeTruthy();
      expect(f.trapDescriptionDE).toBeTruthy();
      expect(f.trapDescriptionZH).toBeTruthy();
      expect(f.howToAvoidDE).toBeTruthy();
    }

    // 15NP Klausursatz
    expect(res.klausurSatz15NP.musterSatzDE).toBeTruthy();
    expect(allowedOperators).toContain(res.klausurSatz15NP.operator);
    expect(res.klausurSatz15NP.scoringKeywords.length).toBeGreaterThanOrEqual(3);
    expect(res.klausurSatz15NP.explanationZH).toBeTruthy();

    // Socratic Probes
    expect(res.socraticProbes.length).toBeGreaterThanOrEqual(2);
    for (const p of res.socraticProbes) {
      expect(p.questionDE).toBeTruthy();
      expect(p.questionZH).toBeTruthy();
      expect(p.counterPerspectiveDE).toBeTruthy();
    }

    // Intuitions-Check Dilemma (Schritt 1)
    expect(res.intuitionDilemma).toBeDefined();
    expect(res.intuitionDilemma?.scenarioZH).toBeTruthy();
    expect(res.intuitionDilemma?.questionZH).toBeTruthy();
    expect(res.intuitionDilemma?.choiceA.textZH).toBeTruthy();
    expect(res.intuitionDilemma?.choiceA.reactionZH).toBeTruthy();
    expect(res.intuitionDilemma?.choiceB.textZH).toBeTruthy();
    expect(res.intuitionDilemma?.choiceB.reactionZH).toBeTruthy();
    expect(res.intuitionDilemma?.mechanismTakeawayZH).toBeTruthy();
    expect(res.intuitionDilemma?.klpCoreLogicZH).toBeTruthy();

    // Study-Mate Enriched Pedagogical Fields
    expect(res.storyHook).toBeDefined();
    expect(res.storyHook?.roleDE).toBeTruthy();
    expect(res.storyHook?.scenarioDE).toBeTruthy();

    expect(res.feynmanExplanation).toBeDefined();
    expect(res.feynmanExplanation?.summaryZH).toBeTruthy();
    expect(res.feynmanExplanation?.summaryDE).toBeTruthy();

    expect(res.twoBrillen).toBeDefined();
    expect(res.twoBrillen?.perspectiveA.titleDE).toBeTruthy();
    expect(res.twoBrillen?.perspectiveB.titleDE).toBeTruthy();
    expect(res.twoBrillen?.synthesisDE).toBeTruthy();

    expect(res.funFact).toBeDefined();
    expect(res.funFact?.titleDE).toBeTruthy();
    expect(res.funFact?.factDE).toBeTruthy();

    expect(res.studyMateProbes).toBeDefined();
    expect(res.studyMateProbes?.simplerHintDE).toBeTruthy();
    expect(res.studyMateProbes?.deeperChallengeDE).toBeTruthy();
    expect(res.studyMateProbes?.quizQuestionDE).toBeTruthy();

    expect(res.attachedNote).toBeDefined();
    expect(res.attachedNote?.title).toBeTruthy();
    expect(res.attachedNote?.fach).toBeTruthy();
    expect(res.attachedNote?.feynmanSummaryZH).toBeTruthy();
    expect(res.attachedNote?.methodSnippetZH).toBeTruthy();
    expect(res.attachedNote?.klausurSatzbausteinDE).toBeTruthy();

    // Konzept-Puzzle (Schritt 2) & Exam-Trap (Schritt 4)
    expect(res.konzeptPuzzle).toBeDefined();
    expect(res.konzeptPuzzle?.pairs.length).toBeGreaterThanOrEqual(4);
    for (const p of res.konzeptPuzzle!.pairs) {
      expect(p.premiseDE).toBeTruthy();
      expect(p.realityDE).toBeTruthy();
    }

    expect(res.examTrapCorrection).toBeDefined();
    expect(res.examTrapCorrection?.studentAnswerDE).toBeTruthy();
    expect(res.examTrapCorrection?.fatalFlawPointDE).toBeTruthy();
    expect(res.examTrapCorrection?.examinerVerdictDE).toBeTruthy();
  }

  it("lists supported preloaded canonical topics", () => {
    const list = listSupportedPreloadedTopics();
    expect(list.length).toBeGreaterThanOrEqual(10);
  });

  it("distills Modell des vollkommenen Marktes (Angebot & Nachfrage) with authentic salmon pricing paradox", () => {
    const res = distillConcept("Modell des vollkommenen Marktes (Angebot & Nachfrage)", "SoWi");
    validateDistilledConcept(res);
    expect(res.fach).toBe("SoWi");
    expect(res.intuitionDilemma?.scenarioZH).toContain("大西洋三文鱼");
    expect(res.intuitionDilemma?.choiceA.textZH).toContain("温和下滑");
    expect(res.intuitionDilemma?.choiceB.textZH).toContain("暴跌至 0");
    expect(res.intuitionDilemma?.choiceA.reactionZH).toContain("现实生活");
    expect(res.intuitionDilemma?.choiceB.reactionZH).toContain("价格接受者");
    expect(res.konzeptPuzzle?.pairs.length).toBe(4);
    expect(res.examTrapCorrection?.fatalFlawPointZH).toContain("Referenzmodell");
    expect(res.klausurSatz15NP.scoringKeywords).toContain("Allokationsfunktion");
  });

  it("distills Wahlsystem / Bundestag (SoWi) from key words", () => {
    const res = distillConcept("Kapitel 2: Bundestagswahl und Erststimme vs Zweitstimme", "SoWi");
    validateDistilledConcept(res);
    expect(res.fach).toBe("SoWi");
    expect(res.mentalModelAnalogy.analogyTitle).toContain("Saalbestuhlung");
    expect(res.klpTermini.some((k) => k.termDE.includes("Personalisierte Verhaeltniswahl"))).toBe(true);
    expect(res.fehlerquellen.some((f) => f.trapTitleDE.includes("Erststimme"))).toBe(true);
  });

  it("distills Rawls / Schleier des Nichtwissens (Philosophie)", () => {
    const res = distillConcept("Rawls Gerechtigkeitstheorie: Der Urzustand und der Schleier des Nichtwissens", "Philosophie");
    validateDistilledConcept(res);
    expect(res.mentalModelAnalogy.analogyTitle).toContain("Kuchenschneiden");
    expect(res.klausurSatz15NP.operator).toBe("beurteilen");
    expect(res.klpTermini.some((k) => k.termDE.includes("Differenzprinzip"))).toBe(true);
  });

  it("distills Magisches Viereck / StabG (SoWi)", () => {
    const res = distillConcept("Wirtschaftspolitische Ziele: Das Magische Viereck", "SoWi");
    validateDistilledConcept(res);
    expect(res.mentalModelAnalogy.analogyTitle).toContain("Trampolin");
    expect(res.klausurSatz15NP.operator).toBe("eroertern");
    expect(res.klausurSatz15NP.scoringKeywords).toContain("Phillips-Kurve");
  });

  it("distills Gini-Koeffizient & Lorenz-Kurve (SoWi)", () => {
    const res = distillConcept("Einkommens- und Vermoegensverteilung: Gini-Koeffizient und Lorenz-Kurve", "SoWi");
    validateDistilledConcept(res);
    expect(res.mentalModelAnalogy.analogyTitle).toContain("Bananen-Bauch");
    expect(res.klpTermini.some((k) => k.termDE.includes("Lorenz-Kurve"))).toBe(true);
  });

  it("distills Immanuel Kant: Kategorischer Imperativ (Philosophie)", () => {
    const res = distillConcept("Kants Pflichtethik: Der Kategorische Imperativ", "Philosophie");
    validateDistilledConcept(res);
    expect(res.mentalModelAnalogy.analogyTitle).toContain("Gesetzes-Stresstest");
    expect(res.klausurSatz15NP.operator).toBe("darstellen");
    expect(res.fehlerquellen.some((f) => f.trapTitleDE.includes("Goldenen Regel"))).toBe(true);
  });

  it("distills Utilitarismus: Bentham & Mill (Philosophie)", () => {
    const res = distillConcept("Klassischer Utilitarismus: Bentham und das hedonistische Kalkuel", "Philosophie");
    validateDistilledConcept(res);
    expect(res.mentalModelAnalogy.analogyTitle).toContain("Gluecks-Buchhaltung");
    expect(res.klausurSatz15NP.operator).toBe("beurteilen");
  });

  it("distills Utilitarismus vs. Kategorischer Imperativ benchmark (Philosophie)", () => {
    const res = distillConcept("Utilitarismus vs. Kategorischer Imperativ", "Philosophie");
    validateDistilledConcept(res);
    expect(res.intuitionDilemma?.scenarioZH).toContain("失控电车");
    expect(res.konzeptPuzzle?.pairs.length).toBe(4);
    expect(res.examTrapCorrection?.diagnosticOptions?.length).toBe(3);
    expect(res.klausurSatz15NP.scoringKeywords).toContain("Konsequentialismus");
    expect(res.klausurSatz15NP.scoringKeywords).toContain("Menschenwuerde");
  });

  it("distills Sachtextanalyse & Toulmin-Modell (Deutsch)", () => {
    const res = distillConcept("Sachtextanalyse und Argumentationsstruktur nach Toulmin", "Deutsch");
    validateDistilledConcept(res);
    expect(res.mentalModelAnalogy.analogyTitle).toContain("Statik eines Textes");
    expect(res.klausurSatz15NP.operator).toBe("analysieren");
  });

  it("distills Sachtextanalyse: Argumentation und Leserlenkung benchmark (Deutsch)", () => {
    const res = distillConcept("Sachtextanalyse: Argumentation und Leserlenkung", "Deutsch");
    validateDistilledConcept(res);
    expect(res.intuitionDilemma?.scenarioZH).toContain("方案");
    expect(res.konzeptPuzzle?.pairs.length).toBe(4);
    expect(res.examTrapCorrection?.diagnosticOptions?.length).toBe(3);
    expect(res.klausurSatz15NP.scoringKeywords).toContain("Argumentationsgang");
    expect(res.klausurSatz15NP.scoringKeywords).toContain("Leserlenkung");
  });

  it("distills Political Speech: Rhetoric and Comment benchmark (Englisch)", () => {
    const res = distillConcept("Political Speech: Rhetoric and Comment (MLK, I Have a Dream)", "Englisch");
    validateDistilledConcept(res);
    expect(res.fach).toBe("Englisch");
    expect(res.intuitionDilemma?.scenarioZH).toContain("提货券");
    expect(res.intuitionDilemma?.questionZH).toContain("期票");
    expect(res.konzeptPuzzle?.pairs.length).toBe(4);
    expect(res.examTrapCorrection?.diagnosticOptions?.length).toBe(3);
    expect(res.klausurSatz15NP.scoringKeywords).toContain("promissory note");
    expect(res.klausurSatz15NP.scoringKeywords).toContain("rhetorical triad");
  });

  it("distills Differentialrechnung: Tangente & Ableitung (Mathe)", () => {
    const res = distillConcept("Differentialrechnung: Tangente, Ableitung & Aenderungsrate", "Mathe");
    validateDistilledConcept(res);
    expect(res.mentalModelAnalogy.analogyTitle).toContain("Tachometer");
    expect(res.klausurSatz15NP.operator).toBe("darstellen");
  });

  it("distills Ableitung als lokale Aenderungsrate benchmark (Mathe)", () => {
    const res = distillConcept("Ableitung als lokale Aenderungsrate: Von der Sekante zur Tangente", "Mathe");
    validateDistilledConcept(res);
    expect(res.fach).toBe("Mathe");
    expect(res.intuitionDilemma?.scenarioZH).toContain("汉堡到柏林");
    expect(res.konzeptPuzzle?.pairs.length).toBe(4);
    expect(res.examTrapCorrection?.diagnosticOptions?.length).toBe(3);
    expect(res.klausurSatz15NP.scoringKeywords).toContain("Differenzenquotient");
  });

  it("distills Energieerhaltungssatz & Dissipation (Physik)", () => {
    const res = distillConcept("Mechanische Energie und der Energieerhaltungssatz", "Physik");
    validateDistilledConcept(res);
    expect(res.mentalModelAnalogy.analogyTitle).toContain("Universums-Bankkonto");
    expect(res.klausurSatz15NP.operator).toBe("analysieren");
  });

  it("distills Gleichmaessig beschleunigte Bewegung benchmark (Physik)", () => {
    const res = distillConcept("Gleichmaessig beschleunigte Bewegung und freier Fall", "Physik");
    validateDistilledConcept(res);
    expect(res.fach).toBe("Physik");
    expect(res.intuitionDilemma?.scenarioZH).toContain("铁球");
    expect(res.intuitionDilemma?.scenarioZH).toContain("木球");
    expect(res.konzeptPuzzle?.pairs.length).toBe(4);
    expect(res.examTrapCorrection?.diagnosticOptions?.length).toBe(3);
    expect(res.klausurSatz15NP.operator).toBe("analysieren");
    expect(res.klausurSatz15NP.scoringKeywords).toContain("s-t-Parabel");
    expect(res.klausurSatz15NP.scoringKeywords).toContain("masseunabhaengig");
  });

  it("distills Saeure-Base-Gleichgewichte benchmark (Chemie)", () => {
    const res = distillConcept("Saeure-Base-Gleichgewichte und pH-Wert", "Chemie");
    validateDistilledConcept(res);
    expect(res.fach).toBe("Chemie");
    expect(res.intuitionDilemma?.scenarioZH).toContain("盐酸 HCl 与醋酸 CH3COOH");
    expect(res.konzeptPuzzle?.pairs.length).toBe(4);
    expect(res.examTrapCorrection?.diagnosticOptions?.length).toBe(3);
    expect(res.klausurSatz15NP.operator).toBe("analysieren");
    expect(res.klausurSatz15NP.scoringKeywords).toContain("Protonendonator");
    expect(res.klausurSatz15NP.scoringKeywords).toContain("Dissoziationsgrad");
  });

  it("distills Biomembran & Osmose benchmark (Bio)", () => {
    const res = distillConcept("Biomembran, Transportmechanismen und Osmose", "Bio");
    validateDistilledConcept(res);
    expect(res.fach).toBe("Bio");
    expect(res.intuitionDilemma?.scenarioZH).toContain("小番茄");
    expect(res.konzeptPuzzle?.pairs.length).toBe(4);
    expect(res.examTrapCorrection?.diagnosticOptions?.length).toBe(3);
    expect(res.klausurSatz15NP.operator).toBe("darstellen");
    expect(res.klausurSatz15NP.scoringKeywords).toContain("Osmose");
    expect(res.klausurSatz15NP.scoringKeywords).toContain("Plasmolyse");
  });

  it("distills Sonatenhauptsatzform benchmark (Musik)", () => {
    const res = distillConcept("Sonatenhauptsatzform: Exposition, Durchfuehrung, Reprise", "Musik");
    validateDistilledConcept(res);
    expect(res.fach).toBe("Musik");
    expect(res.intuitionDilemma?.scenarioZH).toContain("快板乐章");
    expect(res.konzeptPuzzle?.pairs.length).toBe(4);
    expect(res.examTrapCorrection?.diagnosticOptions?.length).toBe(3);
    expect(res.klausurSatz15NP.operator).toBe("analysieren");
    expect(res.klausurSatz15NP.scoringKeywords).toContain("Themen-Dualismus");
    expect(res.klausurSatz15NP.scoringKeywords).toContain("Wiener Klassik");
  });

  it("distills Weitsprung benchmark (Sport)", () => {
    const res = distillConcept("Bewegungsanalyse Weitsprung: Vier Phasen", "Sport");
    validateDistilledConcept(res);
    expect(res.fach).toBe("Sport");
    expect(res.intuitionDilemma?.scenarioZH).toContain("校运会");
    expect(res.konzeptPuzzle?.pairs.length).toBe(4);
    expect(res.examTrapCorrection?.diagnosticOptions?.length).toBe(3);
    expect(res.klausurSatz15NP.operator).toBe("analysieren");
    expect(res.klausurSatz15NP.scoringKeywords).toContain("Anlaufgeschwindigkeit");
    expect(res.klausurSatz15NP.scoringKeywords).toContain("Flugparabel");
  });

  it("keeps Chemie/Bio fallback free of SoWi jargon and calculus", () => {
    const chem = distillConcept("Unbekanntes Spezialthema ohne Bankeintrag", "Chemie");
    const blob = JSON.stringify(chem);
    expect(blob).not.toContain("割线极限逼近切线");
    expect(blob).not.toContain("f'(x)");
    expect(blob).not.toContain("社会市场经济");
    const bio = distillConcept("Unbekanntes Spezialthema ohne Bankeintrag", "Bio");
    expect(JSON.stringify(bio)).not.toContain("割线极限逼近切线");
  });

  it("handles arbitrary topics gracefully via heuristic subject archetypes", () => {    const arbitrarySoWi = distillConcept("Europaeische Zentralbank und Leitzinssenkung", "SoWi");
    validateDistilledConcept(arbitrarySoWi);
    expect(arbitrarySoWi.fach).toBe("SoWi");
    expect(arbitrarySoWi.topicTitle).toBe("Europaeische Zentralbank und Leitzinssenkung");

    const arbitraryPhilo = distillConcept("Das Leib-Seele-Problem und der Dualismus", "Philosophie");
    validateDistilledConcept(arbitraryPhilo);
    expect(arbitraryPhilo.fach).toBe("Philosophie");
    expect(arbitraryPhilo.klausurSatz15NP.operator).toBe("beurteilen");

    const arbitraryDeutsch = distillConcept("Gedichtanalyse Expressionismus Grossstadtlyrik", "Deutsch");
    validateDistilledConcept(arbitraryDeutsch);
    expect(arbitraryDeutsch.fach).toBe("Deutsch");

    const arbitraryMathe = distillConcept("Lineare Gleichungssysteme und Gau-Verfahren", "Mathe");
    validateDistilledConcept(arbitraryMathe);
    expect(arbitraryMathe.fach).toBe("Mathe");

    const arbitraryPhysik = distillConcept("Optische Brechung am Prisma und Dispersion", "Physik");
    validateDistilledConcept(arbitraryPhysik);
    expect(arbitraryPhysik.fach).toBe("Physik");
  });

  it("verifies clean text rules (no emojis or forbidden unicode arrows)", () => {
    const topicsToTest = [
      "Bundestagswahl",
      "Rawls",
      "Magisches Viereck",
      "Gini-Koeffizient",
      "Kategorischer Imperativ",
      "Utilitarismus",
      "Toulmin",
      "Tangente",
      "Energieerhaltung",
      "Unbekanntes Thema X",
    ];

    const forbiddenCharRegex = /[\uD800-\uDFFF\u2190-\u2199\u27A1\u2794\u279C\u279D\u279E\u279F\u2B05-\u2B07\u2B95]/;

    for (const t of topicsToTest) {
      const res = distillConcept(t, "SoWi");
      const serialized = JSON.stringify(res);
      expect(forbiddenCharRegex.test(serialized)).toBe(false);
    }
  });
});
