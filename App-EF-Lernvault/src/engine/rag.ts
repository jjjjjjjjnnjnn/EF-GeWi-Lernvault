// RAG-stufe L0 (B1): block-chunks mit path#zeile-referenz, keyword-retrieval,
// prompt-bau (aus Tutor/Quiz hierher gezogen, wortgleich) + support-verifier.
// L1 (lokal-vektor) / L2 (api-vektor) kommen als austauschbare scorer spaeter.
import type { VaultNote } from "../vault/parser";
import { buildSearchIndex } from "./index";

export interface TextChunk {
  id: string; // path#zeile (1-basiert, block-index)
  path: string;
  fach: string;
  thema: string;
  operatoren: string[];
  kind: string;
  lang: "zh" | "de";
  text: string;
}

export function chunkNote(note: VaultNote): TextChunk[] {
  const path = note.path || `${note.fach}/${note.thema}.md`;
  return note.blocks.map((b, i) => ({
    id: `${path}#${i + 1}`,
    path,
    fach: note.fach,
    thema: note.thema,
    operatoren: note.operatoren,
    kind: b.kind,
    lang: b.lang,
    text: b.text,
  }));
}

export function chunkNotes(notes: VaultNote[]): TextChunk[] {
  return notes.flatMap(chunkNote);
}

/** L0-retrieval: exakte treffer zuerst (quelle-reihenfolge), fuzzy fallback. */
export function retrieveL0(chunks: TextChunk[], query: string, topK = 8): TextChunk[] {
  if (!query.trim()) return chunks.slice(0, topK);
  const idx = buildSearchIndex(
    chunks.map((c) => ({ id: c.id, thema: c.thema, sub: c.path, text: c.text }))
  );
  const byId = new Map(chunks.map((c) => [c.id, c]));
  const out: TextChunk[] = [];
  for (const id of idx.query(query)) {
    const c = byId.get(id);
    if (c) out.push(c);
    if (out.length >= topK) break;
  }
  return out;
}

// ---------- Tutor-prompts (wortgleich aus Tutor.tsx uebernommen) ----------

export const TUTOR_SYSTEM = `Du bist ein lokaler KI-Tutor für die gymnasiale Oberstufe (Einführungsphase EF, NRW).
- Niveau: Präzise deutsche Fachbegriffe (EF-Niveau), gefolgt von einer knappen chinesischen Übersetzung/Erklärung.
- Zitierpflicht: Jede Sachbehauptung MUSS mit der genauen Quelle im Notizen-Vault belegt werden, im Format: [Fach/Dateiname.md#Zeile] oder [Thema].
- Relevanzgrenze: Beziehe dich streng auf den Lehrplan und die Vault-Notizen. Wenn ein Konzept den EF-Rahmen übersteigt oder nicht in den Notizen vorkommt, lehne die Beantwortung höflich ab (Hinweis: „liegt außerhalb des EF-Vaults / 超纲“).`;

export function buildTutorSystem(chunks: TextChunk[]): string {
  const ctx = chunks
    .map((c) => `[${c.id}]: ${c.thema} (${c.fach}) - ${c.text.slice(0, 160)}`)
    .join("\n");
  return `${TUTOR_SYSTEM}\n\nAktuell im Vault verfügbar:\n${ctx}`;
}

/** Vorlagen-modus treffer (thema/tags/fach), wortgleich aus Tutor.tsx. */
export function findFallbackNote(notes: VaultNote[], q: string): VaultNote | null {
  const needle = q.toLowerCase();
  return (
    notes.find(
      (n) =>
        needle.includes(n.thema.toLowerCase()) ||
        n.tags.some((tg) => needle.includes(tg.toLowerCase())) ||
        needle.includes(n.fach.toLowerCase())
    ) ?? null
  );
}

// ---------- Korrektor-prompts (wortgleich aus Quiz.tsx uebernommen) ----------

export const KORREKTOR_SYSTEM =
  "Du bist ein Klausur-Korrektor. Antworte sachlich, gib zu jeder Bemerkung einen Beleg [Pfad#Zeile].";

export function buildKlausurPrompt(
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

Prüfe für jede Teilaufgabe:
- Operator verfehlt?
- Fachbegriff falsch?
- Beleg fehlt?
- Vorgehen falsch? (falsches Verfahren / falscher Begriff gewählt oder Warum nicht begründet)
Zitiere für jede Sachkritik exakt [${notePath}#Zeile].
Gib die Punkte (0-15) an.`;
}

export function buildVergleichPrompt(
  fach: string,
  thema: string,
  selectedOption: string | null,
  correctOption: string,
  begruendung: string,
  sourceRef: string
): string {
  return `Du bist ein strenger Klausurkorrektor für die gymnasiale Oberstufe (EF, ${fach}).
Thema: ${thema}
Wahl: Option ${selectedOption ?? "-"} (korrekt: Option ${correctOption})
Begründung: ${begruendung || "(keine Angabe)"}
Beleg: ${sourceRef}

Prüfe:
- Operator verfehlt?
- Fachbegriff falsch?
- Beleg fehlt?
- Vorgehen falsch? (falsches Verfahren / falscher Begriff gewählt oder Warum nicht begründet)
Zitiere für jede Sachkritik exakt [${sourceRef}].`;
}

export interface RubricFlags {
  operatorVerfehlt: boolean;
  fachbegriffFalsch: boolean;
  belegFehlt: boolean;
  vorgehenFalsch: boolean;
}

/** Die 4 regex-regeln (einmalig hier, klausur + vergleich teilen sie). */
export function parseRubricFlags(content: string): RubricFlags {
  return {
    operatorVerfehlt: /operator verfehlt/i.test(content),
    fachbegriffFalsch: /fachbegriff (falsch|fehlt)/i.test(content),
    belegFehlt: /beleg fehlt/i.test(content),
    vorgehenFalsch: /vorgehen falsch/i.test(content),
  };
}

// ---------- Support-verifier (string-stufe; semantik-stufe folgt mit L1) ----------

export interface SupportReport {
  supported: boolean;
  refs: string[];
  missing: string[];
}

const REF_RE = /\[([A-Za-z0-9_\-./äöüÄÖÜß]+\.md#\d+)\]/g;

/** Jede [pfad.md#n]-referenz muss in den gereichten chunks vorkommen. */
export function verifySupport(answer: string, chunks: TextChunk[]): SupportReport {
  const ids = new Set(chunks.map((c) => c.id));
  const refs: string[] = [];
  let m: RegExpExecArray | null;
  REF_RE.lastIndex = 0;
  while ((m = REF_RE.exec(answer)) !== null) {
    if (!refs.includes(m[1])) refs.push(m[1]);
  }
  const missing = refs.filter((r) => !ids.has(r));
  return { supported: missing.length === 0, refs, missing };
}
