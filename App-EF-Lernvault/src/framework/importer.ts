import { parseNoteFile, parseCsv, type Block } from "../vault/parser";
import type { ImportResult, KnowledgeCard, KnowledgeNote, KnowledgePackage } from "./types";

function extractBlocksFromPlainMarkdown(text: string): Block[] {
  const blocks: Block[] = [];
  const lines = text.split("\n");
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) continue;
    if (trimmed.startsWith("### ")) {
      blocks.push({ kind: "h3", text: trimmed.slice(4).trim(), lang: "de" });
    } else if (trimmed.startsWith("## ")) {
      blocks.push({ kind: "h2", text: trimmed.slice(3).trim(), lang: "de" });
    } else if (trimmed.startsWith("- ") || trimmed.startsWith("* ")) {
      blocks.push({ kind: "li", text: trimmed.slice(2).trim(), lang: "de" });
    } else if (trimmed.startsWith("$$") || trimmed.startsWith("\\[")) {
      blocks.push({ kind: "math", text: trimmed.replace(/^(\$\$|\\\[)|(\$\$|\\\])$/g, "").trim(), lang: "de" });
    } else {
      const hasChinese = /[\u4e00-\u9fff]/.test(trimmed);
      blocks.push({ kind: "p", text: trimmed, lang: hasChinese ? "zh" : "de" });
    }
  }
  return blocks;
}

export function importMarkdownNote(
  filename: string,
  rawContent: string,
  defaultFach = "SoWi"
): KnowledgeNote {
  const cleanPath = filename.replace(/\\/g, "/");
  const parsed = parseNoteFile(cleanPath, rawContent);

  if (parsed && parsed.blocks.length > 0) {
    return {
      ...parsed,
      sourceType: "user",
      isCustom: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
  }

  // Fallback: note without standard frontmatter
  const themaName = filename.replace(/\.md$/i, "").split(/[/\\]/).pop() || "Notiz";
  const blocks = extractBlocksFromPlainMarkdown(rawContent);

  return {
    id: `user/${filename}`,
    path: `custom/${filename}`,
    fach: defaultFach,
    thema: themaName,
    operatoren: ["darstellen"],
    klausurrelevant: true,
    datum: new Date().toISOString().slice(0, 10),
    tags: ["EF", defaultFach, "Custom"],
    blocks: blocks.length > 0 ? blocks : [{ kind: "p", text: rawContent, lang: "de" }],
    sourceType: "user",
    isCustom: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
}

export function importCsvCards(
  filename: string,
  rawContent: string,
  defaultFach = "SoWi"
): KnowledgeCard[] {
  const cleanPath = filename.replace(/\\/g, "/");
  const parsed = parseCsv(cleanPath, rawContent);

  if (parsed.length > 0) {
    return parsed.map((c) => ({
      ...c,
      sourceType: "user",
      isCustom: true,
      createdAt: new Date().toISOString(),
    }));
  }

  // Graceful 2-column or 3-column fallback (Front;Back or Front;Back;Example)
  const cards: KnowledgeCard[] = [];
  const lines = rawContent.split("\n");
  let idx = 0;
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) continue;
    const parts = trimmed.split(";").map((p) => p.trim());
    if (parts.length >= 2) {
      idx++;
      cards.push({
        id: `user-card/${filename}#${idx}`,
        front: parts[0],
        back: parts[1],
        example: parts[2] ?? "",
        fach: parts[3] ?? defaultFach,
        thema: parts[4] ?? filename.replace(/\.csv$/i, ""),
        source: cleanPath,
        sourceType: "user",
        isCustom: true,
        createdAt: new Date().toISOString(),
      });
    }
  }

  return cards;
}

export function importKnowledgePackage(rawJson: string): ImportResult {
  const result: ImportResult = {
    success: false,
    importedNotesCount: 0,
    importedCardsCount: 0,
    errors: [],
    warnings: [],
  };

  try {
    const data = JSON.parse(rawJson) as Partial<KnowledgePackage>;
    if (!data || typeof data !== "object") {
      result.errors.push("Ungültiges JSON-Format.");
      return result;
    }

    if (data.schemaVersion !== 1) {
      result.warnings.push(`Schema-Version ${data.schemaVersion ?? "unbekannt"} erkannt. Versuche Import...`);
    }

    if (!Array.isArray(data.notes) && !Array.isArray(data.cards)) {
      result.errors.push("Das Paket enthält weder eine Notizen- noch eine Karteikarten-Liste.");
      return result;
    }

    const notes = Array.isArray(data.notes) ? data.notes : [];
    const cards = Array.isArray(data.cards) ? data.cards : [];

    result.importedNotesCount = notes.length;
    result.importedCardsCount = cards.length;
    result.success = notes.length > 0 || cards.length > 0;

    if (!result.success) {
      result.warnings.push("Das Paket enthält weder Notizen noch Karteikarten.");
    }
  } catch (err) {
    result.errors.push(`JSON-Parse-Fehler: ${(err as Error).message}`);
  }

  return result;
}
