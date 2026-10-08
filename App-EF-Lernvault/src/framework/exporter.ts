import type { KnowledgeCard, KnowledgeNote, KnowledgePackage } from "./types";

export function exportToJsonPackage(
  notes: KnowledgeNote[],
  cards: KnowledgeCard[],
  options?: { name?: string; description?: string; fach?: string }
): KnowledgePackage {
  const filteredNotes = options?.fach && options.fach !== "alle"
    ? notes.filter((n) => n.fach.toLowerCase() === options.fach!.toLowerCase())
    : notes;
  const filteredCards = options?.fach && options.fach !== "alle"
    ? cards.filter((c) => c.fach.toLowerCase() === options.fach!.toLowerCase())
    : cards;

  const subjects = Array.from(new Set([...filteredNotes.map((n) => n.fach), ...filteredCards.map((c) => c.fach)]));

  return {
    schemaVersion: 1,
    appVersion: "0.2.0",
    exportedAt: new Date().toISOString(),
    name: options?.name || "EF-Lernvault-Wissenspaket",
    description: options?.description || "Exportiertes Lernpaket für Gymnasium EF / Oberstufe.",
    subjects,
    notes: filteredNotes,
    cards: filteredCards,
  };
}

export function exportNoteToMarkdown(note: KnowledgeNote): string {
  const frontmatter = [
    "---",
    `fach: ${note.fach}`,
    `thema: "${note.thema}"`,
    `operatoren: [${note.operatoren.join(", ")}]`,
    `klausurrelevant: ${note.klausurrelevant}`,
    `datum: ${note.datum || new Date().toISOString().slice(0, 10)}`,
    `tags: [${note.tags.join(", ")}]`,
    "---",
    "",
  ].join("\n");

  const body = note.blocks
    .map((b) => {
      switch (b.kind) {
        case "h2":
          return `## ${b.text}\n`;
        case "h3":
          return `### ${b.text}\n`;
        case "li":
          return `- ${b.text}`;
        case "math":
          return `$$\n${b.text}\n$$`;
        case "quote":
          return `> ${b.text}`;
        case "p":
        default:
          return `${b.text}\n`;
      }
    })
    .join("\n");

  return `${frontmatter}\n${body}`;
}

export function exportCardsToAnkiCsv(cards: KnowledgeCard[]): string {
  const header = "Deutsch;Chinesisch;Beispielsatz;Fach;Thema";
  const rows = cards.map((c) => {
    const cleanFront = c.front.replace(/;/g, ",").replace(/\r?\n/g, " ");
    const cleanBack = c.back.replace(/;/g, ",").replace(/\r?\n/g, " ");
    const cleanEx = (c.example || "").replace(/;/g, ",").replace(/\r?\n/g, " ");
    const cleanFach = c.fach.replace(/;/g, ",");
    const cleanThema = (c.thema || "").replace(/;/g, ",");
    return `${cleanFront};${cleanBack};${cleanEx};${cleanFach};${cleanThema}`;
  });

  return [header, ...rows].join("\n");
}

export function downloadFile(filename: string, content: string, mimeType = "text/plain;charset=utf-8"): void {
  if (typeof window === "undefined") return;
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  anchor.click();
  window.setTimeout(() => URL.revokeObjectURL(url), 1000);
}
