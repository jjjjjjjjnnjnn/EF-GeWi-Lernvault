import { TUTOR_PEDAGOGY_MODE_STORAGE_KEY } from "../engine/storageKeys";

// socratic.ts: Didaktische Lehrstufen (Sokratisch vs. Klausur-Direkt)
// und fehlertolerante Erfassung von Fehlerlog-Eintraegen (Patches fuer Obsidian).

export type TutorPedagogyMode = "socratic" | "direct";

export interface FehlerlogDraft {
  id: string;
  fach: string;
  thema: string;
  fehlertyp: "Wissenslücke" | "Logik/Begründung" | "Fachsprache/Ausdruck" | "Aufgabenbezug/AFB";
  frage: string;
  meinFehler: string;
  korrektur: string;
  klausursatz: string;
  datum: string;
}

const STORAGE_KEY_MODE = TUTOR_PEDAGOGY_MODE_STORAGE_KEY;

/**
 * Laedt den gespeicherten Lehrmodus oder gibt "socratic" als Standard zurueck.
 */
export function loadTutorPedagogyMode(): TutorPedagogyMode {
  try {
    const val = localStorage.getItem(STORAGE_KEY_MODE);
    if (val === "socratic" || val === "direct") {
      return val;
    }
  } catch {
    // Fallback bei SSR oder fehlendem localStorage
  }
  return "socratic";
}

/**
 * Speichert den gewaehlten Lehrmodus.
 */
export function saveTutorPedagogyMode(mode: TutorPedagogyMode): void {
  try {
    localStorage.setItem(STORAGE_KEY_MODE, mode);
  } catch {
    // Ignorieren
  }
}

/**
 * Erzeugt die systemspezifische Anweisung fuer das LLM basierend auf dem Lehrmodus.
 */
export function buildPedagogyModeModifier(mode: TutorPedagogyMode): string {
  if (mode === "socratic") {
    return (
      "Pädagogischer Modus: SOKRATISCH (Mäeutik / Scaffolding).\n" +
      "- Gib dem Schüler NICHT sofort die fertige Musterlösung oder den vollständigen Klausursatz vor.\n" +
      "- Führe den Schüler stattdessen durch 1-2 gezielte, schrittweise Leitfragen an die Lösung heran.\n" +
      "- Decke gedankliche Lücken, unbegründete Prämissen oder vage Formulierungen auf.\n" +
      "- Ermutige den Schüler, Kriterien (z. B. Effizienz vs. Legitimität in SoWi, Pflicht vs. Neigung in Philo, oder Beleg+Zeile in Deutsch) eigenständig anzuwenden.\n" +
      "- Erst wenn der Schüler den Kern selbst erfasst hat, bestätige und veredle die Antwort mit dem präzisen Fachbegriff."
    );
  }

  return (
    "Pädagogischer Modus: KLAUSUR-DIREKT (Erwartungshorizont & AFB-Fokus).\n" +
    "- Strukturiere die Auskunft unverzüglich nach dem offiziellen NRW-Erwartungshorizont (EHZ):\n" +
    "  1. [AFB-Zuordnung & Kernforderung]: Prägnante Antwort auf Klausurniveau.\n" +
    "  2. [Muster-Klausursatz]: 1-2 kopierfertige, elaborierte deutsche Sätze mit zwingenden Fachtermini.\n" +
    "  3. [Fehlerfalle / Punkteabzug]: Typische Fehlvorstellung von Schülern und worauf Korrektoren achten."
  );
}

/**
 * Formatiert eine Zeile gemaess der tabellarischen Fehlerlog-Konvention:
 * | Datum | Thema | Fehlertyp | Eigener Fehler / Fehlvorstellung | Korrektur & Klausursatz |
 */
export function formatFehlerlogMarkdownRow(draft: FehlerlogDraft): string {
  const datum = draft.datum || new Date().toISOString().slice(0, 10);
  const thema = draft.thema.trim() || "Allgemein";
  const typ = draft.fehlertyp;
  const fehler = (draft.meinFehler.trim() || "Unvollständige Begründung").replace(/\|/g, "\\|");
  
  const korrekturPart = draft.korrektur.trim().replace(/\|/g, "\\|");
  const klausursatzPart = draft.klausursatz.trim() ? ` — *Merksatz:* ${draft.klausursatz.trim().replace(/\|/g, "\\|")}` : "";
  const loesung = `${korrekturPart}${klausursatzPart}`.trim() || "—";

  return `| ${datum} | ${thema} | ${typ} | ${fehler} | ${loesung} |`;
}

/**
 * Erzeugt einen vollstaendigen Text-Patch zur Anzeige und zum Kopieren in die Zwischenablage.
 * Befolgt strikt die Vault-Vorgabe: App liest nur, schreibt nicht selbst in Dateien.
 */
export function formatFehlerlogPatch(draft: FehlerlogDraft): string {
  const row = formatFehlerlogMarkdownRow(draft);
  const fachFolder = getFachFolderName(draft.fach);

  return [
    `<!-- EF-Lernvault Fehlerlog-Patch -->`,
    `<!-- Zielort: ${fachFolder}/Klausur-Training/Fehlerlog.md -->`,
    ``,
    `| Datum | Thema | Fehlertyp | Eigener Fehler / Fehlvorstellung | Korrektur & Klausursatz |`,
    `|---|---|---|---|---|`,
    row,
  ].join("\n");
}

/**
 * Mappt den Fachnamen auf das standardisierte Vault-Verzeichnis.
 */
export const FACH_FOLDER_NAMES: Readonly<Record<string, string>> = {
  deutsch: "01_Deutsch",
  englisch: "02_Englisch",
  mathe: "03_Mathe",
  physik: "04_Physik",
  chemie: "05_Chemie",
  bio: "06_Bio",
  philosophie: "07_Philosophie",
  sowi: "08_SoWi",
  musik: "09_Musik-mündl",
  sport: "10_Sport-mündl",
};

export function getFachFolderName(fach: string): string {
  const folder = FACH_FOLDER_NAMES[fach.trim().toLowerCase()];
  if (typeof folder !== "string") throw new Error(`Unbekanntes Fach: ${fach}`);
  return folder;
}

/**
 * Extrahiert Heuristiken aus einem Dialog-Turn, um einen Fehlerlog-Entwurf vorauszuhaengen.
 */
export function extractFehlerDraftFromMessage(
  userQuery: string,
  botReply: string,
  fallbackFach: string = "SoWi",
  fallbackThema: string = ""
): FehlerlogDraft {
  const datum = new Date().toISOString().slice(0, 10);
  
  // 1. Thema schaetzen
  let thema = fallbackThema;
  if (!thema) {
    const topicPattern = /(?:im|in|zu|zum|zur|über|Thema)\s+([A-ZÄÖÜ][a-zA-Z0-9\-_]+(?:\s+[A-ZÄÖÜ][a-zA-Z0-9\-_]+)?)/i;
    const match = userQuery.match(topicPattern);
    if (match) {
      thema = match[1];
    } else {
      const cleanQ = userQuery.replace(/^(Was ist|Erkläre|Wie|Warum|Kannst du)\s+/i, "").trim();
      thema = cleanQ.length > 30 ? `${cleanQ.slice(0, 28)}…` : cleanQ || "Klausur-Thema";
    }
  }

  // 2. Fehlertyp einschaetzen
  let fehlertyp: FehlerlogDraft["fehlertyp"] = "Wissenslücke";
  const lowerQ = userQuery.toLowerCase();
  const lowerR = botReply.toLowerCase();

  if (lowerQ.includes("begründ") || lowerQ.includes("argument") || lowerR.includes("logik") || lowerR.includes("prämisse")) {
    fehlertyp = "Logik/Begründung";
  } else if (lowerQ.includes("begriff") || lowerQ.includes("operator") || lowerR.includes("fachbegriff") || lowerR.includes("ausdruck")) {
    fehlertyp = "Fachsprache/Ausdruck";
  } else if (lowerQ.includes("klausur") || lowerQ.includes("afb") || lowerR.includes("anforderungsbereich")) {
    fehlertyp = "Aufgabenbezug/AFB";
  }

  // 3. Klausursatz extrahieren (falls vorhanden, z.B. Anfuehrungszeichen oder Kursivdruck)
  let klausursatz = "";
  const quoteMatch = botReply.match(/„([^“]{15,140})“/) || botReply.match(/"([^"]{15,140})"/);
  if (quoteMatch) {
    klausursatz = quoteMatch[1];
  } else {
    // Erste prägnante Zeile der Antwort
    const lines = botReply.split("\n").map(l => l.trim()).filter(l => l.length > 15 && !l.startsWith("#") && !l.startsWith(">"));
    klausursatz = lines[0] ? (lines[0].length > 120 ? `${lines[0].slice(0, 118)}…` : lines[0]) : "";
  }

  return {
    id: `err-${Date.now()}`,
    fach: fallbackFach,
    thema,
    fehlertyp,
    frage: userQuery,
    meinFehler: `Unsicherheit bei: ${thema}`,
    korrektur: "Wichtig: Fachkriterien explizit anwenden und Klausursatz verankern.",
    klausursatz,
    datum,
  };
}
