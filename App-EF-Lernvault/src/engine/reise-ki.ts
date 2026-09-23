// Reise-KI (D2/D3): prompt-bau fuer entdecken/ausprobieren/check/szenario.
// Aufrufe (chat) bleiben in der komponente; hier nur reine strings + tests.
import type { ChatMsg } from "../ai/engine";

export const REISE_SYSTEM = `Du bist ein geduldiger EF-Tutor (NRW, gymnasiale Oberstufe) mitten in einer interaktiven Lernreise.
- Sprich den Lernenden direkt an (du), deutsch mit knapper chinesischer Verständnishilfe.
- Sokratisch: erst Denkanstoß, dann Erklärung — nie nur die Lösung hinknallen.
- Zitierpflicht: Sachbehauptungen mit [Pfad#Zeile] aus dem mitgegebenen Kontext belegen.
- EF-Niveau, kurze Sätze, max. 150 Wörter pro Antwort.`;

export function buildExplainPrompt(
  fach: string,
  thema: string,
  stepTitle: string,
  stepText: string,
  context: string
): ChatMsg[] {
  return [
    { role: "system", content: REISE_SYSTEM },
    {
      role: "user",
      content: `Kurs: ${thema} (${fach}). Schritt: ${stepTitle}.\nSchritt-Text:\n${stepText.slice(0, 1500)}\n\nVault-Kontext:\n${context.slice(0, 1500)}\n\nErkläre den Kern dieses Schritts in 3 kurzen Absätzen (Denkanstoß → Erklärung → Merksatz), mit Belegen.`,
    },
  ];
}

export function buildTryFeedbackPrompt(
  thema: string,
  aufgabe: string,
  musterPunkte: string,
  studentText: string
): ChatMsg[] {
  return [
    { role: "system", content: REISE_SYSTEM },
    {
      role: "user",
      content: `Thema: ${thema}.\nAufgabe: ${aufgabe.slice(0, 800)}\nErwartete Punkte: ${musterPunkte.slice(0, 800)}\n\nSchülerantwort:\n${studentText.slice(0, 1200)}\n\nGib formatives Feedback (FelloFish-Stil): 2 Stärken + 1 konkrete Korrektur mit Satzgerüst + 1 Überarbeitungsimpuls. Kein Urteil, nur Lernimpuls.`,
    },
  ];
}

export function buildCheckExplainPrompt(frage: string, erwarteteAntwort: string, thema: string): ChatMsg[] {
  return [
    { role: "system", content: REISE_SYSTEM },
    {
      role: "user",
      content: `Thema: ${thema}.\nFrage: ${frage}\nErwartete Antwort: ${erwarteteAntwort}\n\nDer Lernende hat es nicht gewusst. Erkläre in 3 Sätzen das Warum + nenne, zu welchem Schritt er zurückgehen soll.`,
    },
  ];
}

// FelloFish-schleife fuers check:默写→打分→错因→纠错→教学→再练
export function buildCheckScorePrompt(
  frage: string,
  erwarteteAntwort: string,
  studentText: string,
  thema: string
): ChatMsg[] {
  return [
    { role: "system", content: REISE_SYSTEM },
    {
      role: "user",
      content: `Thema: ${thema}.\nFrage: ${frage}\nErwartete Antwort: ${erwarteteAntwort}\n\n默写 des Lernenden (合书回忆写出):\n${studentText.slice(0, 1200)}\n\nKorrigiere wie FelloFish — genau 4 Abschnitte:\n1. PUNKTE: 0-3 Sterne (3/3 voll richtig / 2/3 fast / 1/3 ein Kern fehlt / 0 falsch) + ein Satz Urteil.\n2. FEHLERANALYSE: Was fehlt/falsch ist — zitiere die Stelle aus der默写 wörtlich.\n3. KORREKTUR: Die richtige Antwort in 2 Sätzen + ein Satzgerüst zum Abschreiben-und-Anpassen.\n4. LEHRE: Ein Merkhaken (Eselsbrücke/Bild) + zu welchem Schritt zurück (z.B. "Schritt 2 Begriffe").\nDeutsch schreiben, danach knappe chinesische Zusammenfassung (2 Sätze).`,
    },
  ];
}

export function buildSzenarioScorePrompt(
  fach: string,
  thema: string,
  situation: string,
  rubricPoints: string[],
  studentText: string
): ChatMsg[] {
  return [
    { role: "system", content: REISE_SYSTEM },
    {
      role: "user",
      content: `Fach: ${fach}. Thema: ${thema}.\nSituation: ${situation.slice(0, 600)}\nRubric (${rubricPoints.length} Punkte):\n${rubricPoints.map((p, i) => `${i + 1}. ${p}`).join("\n")}\n\nPlädoyer des Lernenden:\n${studentText.slice(0, 1500)}\n\nKalibriere wie ein Klausur-Korrektor (FelloFish-Stil):\n1. Pro Rubric-Punkt: ERFÜLLT / TEILWEISE / FEHLT + ein Satz Begründung mit Beleg [Pfad#Zeile].\n2. Punkte 0-15.\n3. Lehre konkret: pro fehlendem Punkt ein Satzgerüst + einen Beispielsatz zum Abschreiben-und-Anpassen.\nDeutsch schreiben, danach knappe chinesische Zusammenfassung (2 Sätze).`,
    },
  ];
}
