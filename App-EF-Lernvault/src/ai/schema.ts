// Strukturierte Schema-Definitionen und robuste Parser für Klausur- und Vergleich-Bewertungen.
// Verhindert fatale falsch-positive Treffer bei Verneinungen (z.B. "Operator nicht verfehlt").

export interface KlausurEvaluationResult {
  operatorVerfehlt: boolean;
  fachbegriffFalsch: boolean;
  belegFehlt: boolean;
  vorgehenFalsch: boolean;
  points: number; // 0 bis 15 Notenpunkte
  feedbackDE: string;
  feedbackZH: string;
  citation: string;
}

/**
 * Erzeugt einen Prompt, der das LLM explizit um eine saubere JSON-Antwort bittet.
 */
export function buildKlausurJsonPrompt(
  thema: string,
  materialQuote: string,
  notePath: string,
  tasks: { kind?: string; promptDE: string }[],
  answers: string[]
): string {
  return `Du bist ein strenger Klausurkorrektor für die gymnasiale Oberstufe (EF, SoWi/Philosophie).
Thema: ${thema}
Material: ${materialQuote}
Notizpfad: ${notePath}

Aufgaben und Schülerantworten:
${tasks
  .map(
    (t, i) => `${i + 1}. [${t.kind ?? "standard"}] ${t.promptDE}
Antwort: ${answers[i] || "(keine Antwort eingegeben)"}`
  )
  .join("\n")}

Bewerte die Antwort nach den 4 EF-Kriterien und gib das Ergebnis STRENG als JSON-Objekt zurück:
\`\`\`json
{
  "operatorVerfehlt": false,
  "fachbegriffFalsch": false,
  "belegFehlt": false,
  "vorgehenFalsch": false,
  "points": 13,
  "feedbackDE": "Sachliche Kritik und Lob auf Deutsch (inkl. Beleghinweis [${notePath}#Zeile]).",
  "feedbackZH": "Kurze chinesische Zusammenfassung und Lernimpuls.",
  "citation": "${notePath}#1"
}
\`\`\`
Wichtig: Setze die Flags nur dann auf true, wenn der Fehler TATSÄCHLICH vorliegt!
Zitiere für Sachkritik exakt [${notePath}#Zeile]. Punkte von 0 bis 15.`;
}

export function buildVergleichJsonPrompt(
  fach: string,
  thema: string,
  selectedOption: string | null,
  correctOption: string,
  begruendung: string,
  sourceRef: string
): string {
  return `Du bist ein strenger Klausurkorrektor für die gymnasiale Oberstufe (EF, ${fach}).
Thema: ${thema}
Wahl des Schülers: Option ${selectedOption ?? "-"} (Musterlösung: Option ${correctOption})
Begründung des Schülers: ${begruendung || "(keine Begründung angegeben)"}
Gültiger Beleg im Vault: ${sourceRef}

Prüfe die Begründung und gib das Ergebnis STRENG als JSON-Objekt zurück:
\`\`\`json
{
  "operatorVerfehlt": false,
  "fachbegriffFalsch": false,
  "belegFehlt": false,
  "vorgehenFalsch": false,
  "points": 12,
  "feedbackDE": "Fachliches Feedback zur Differenzierung und Begründungstiefe.",
  "feedbackZH": "中文诊断与后续建议。",
  "citation": "${sourceRef}"
}
\`\`\`
Punkte: 0-15. Zitiere exakt [${sourceRef}].`;
}

/**
 * Prüft eine Textzeile/einen Kontext auf eine Fehlerflagge unter Beachtung von Verneinungen.
 * Gibt true zurück, wenn der Fehler WIRKLICH beanstandet wird.
 */
function checkCriterion(
  text: string,
  topicRegex: RegExp,
  faultRegex: RegExp,
  okRegex: RegExp
): boolean {
  // In Zeilen und Sätze zerlegen
  const clauses = text.split(/[\r\n;]+/).map((l) => l.trim()).filter(Boolean);
  for (const clause of clauses) {
    if (topicRegex.test(clause)) {
      if (okRegex.test(clause)) return false;
      if (faultRegex.test(clause)) return true;
    }
  }
  // Wenn global die positive Formulierung steht
  if (okRegex.test(text)) return false;
  return faultRegex.test(text);
}

/**
 * Robuster Parser für Klausur-Rückmeldungen.
 * 1. Versuch: Strukturiertes JSON (auch innerhalb von ```json Codeblöcken)
 * 2. Fallback: Fehlertolerante Zustandsmaschine mit Verneinungsprüfung gegen falsche Positivtreffer.
 */
export function parseKlausurEvaluation(raw: string, fallbackCitation: string): KlausurEvaluationResult {
  const trimmed = raw.trim();

  // 1. JSON-Extraktion versuchen
  const jsonMatch = trimmed.match(/```json\s*([\s\S]*?)\s*```/) || trimmed.match(/\{[\s\S]*\}/);
  if (jsonMatch) {
    try {
      const parsed = JSON.parse(jsonMatch[1] ?? jsonMatch[0]);
      if (typeof parsed === "object" && parsed !== null) {
        const points =
          typeof parsed.points === "number" && !isNaN(parsed.points)
            ? Math.max(0, Math.min(15, Math.round(parsed.points)))
            : 10;
        return {
          operatorVerfehlt: Boolean(parsed.operatorVerfehlt),
          fachbegriffFalsch: Boolean(parsed.fachbegriffFalsch),
          belegFehlt: Boolean(parsed.belegFehlt),
          vorgehenFalsch: Boolean(parsed.vorgehenFalsch),
          points,
          feedbackDE: String(parsed.feedbackDE || trimmed.slice(0, 300)),
          feedbackZH: String(parsed.feedbackZH || "已完成模型批改，详见考点建议。"),
          citation: String(parsed.citation || fallbackCitation),
        };
      }
    } catch {
      // JSON syntaktisch ungültig -> Fallback auf semantische Heuristik
    }
  }

  // 2. Semantische Heuristik mit Verneinungsschutz auf Satzebene
  const opFail = checkCriterion(
    trimmed,
    /operator/i,
    /verfehlt|missachtet|nicht\s+eingehalten|unvollst[äa]ndig/i,
    /nicht\s+verfehlt|nicht\s+missachtet|eingehalten|erf[üu]llt|korrekt|pr[äa]zise|zutreffend|gelungen/i
  );

  const termFail = checkCriterion(
    trimmed,
    /fachbegriff|terminologie|begriff/i,
    /falsch|fehlt|unpr[äa]zise|verwechselt|fehlerhaft/i,
    /nicht\s+falsch|korrekt|pr[äa]zise|richtig|zutreffend/i
  );

  const belegFail = checkCriterion(
    trimmed,
    /beleg|zitat|textbeleg/i,
    /fehlt|unzureichend|nicht\s+vorhanden|kein\s+beleg/i,
    /fehlt\s+nicht|nicht\s+fehlt|vorhanden|korrekt|belegt|nachgewiesen/i
  );

  const vorgehenFail = checkCriterion(
    trimmed,
    /vorgehen|verfahren|begr[üu]ndung/i,
    /falsch|fehlt|unlogisch|verfehlt|fehlerhaft/i,
    /nicht\s+falsch|korrekt|schl[üu]ssig|[üu]berzeugend|nachvollziehbar/i
  );

  // Punkte Heuristik: "12/15", "12 Punkte", "Notenpunkte: 12"
  let points = 10;
  const ptMatch = trimmed.match(/(\d{1,2})\s*(?:\/\s*15|Punkte|Notenpunkte)/i);
  if (ptMatch) {
    const p = parseInt(ptMatch[1], 10);
    if (!isNaN(p) && p >= 0 && p <= 15) points = p;
  } else {
    // Wenn Fehler vorliegen, Punktabzug
    const faultsCount = [opFail, termFail, belegFail, vorgehenFail].filter(Boolean).length;
    points = Math.max(4, 14 - faultsCount * 3);
  }

  // Zitat finden
  const citeMatch = trimmed.match(/\[([A-Za-z0-9_\-./äöüÄÖÜß]+\.md#\d+)\]/);
  const citation = citeMatch ? citeMatch[1] : fallbackCitation;

  return {
    operatorVerfehlt: opFail,
    fachbegriffFalsch: termFail,
    belegFehlt: belegFail,
    vorgehenFalsch: vorgehenFail,
    points,
    feedbackDE: trimmed.slice(0, 350) || "Korrektur abgeschlossen.",
    feedbackZH: "模型批改已完成，已通过容错状态机解析，详见考点建议。",
    citation,
  };
}
