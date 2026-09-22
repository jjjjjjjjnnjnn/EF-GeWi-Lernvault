// Vault content model: parsed from real Obsidian md/csv. Mock data in data.ts stays as fallback.
export interface VaultNote {
  id: string;
  path: string;
  fach: string;
  thema: string;
  operatoren: string[];
  klausurrelevant: boolean;
  datum: string;
  tags: string[];
  blocks: Block[];
}

export interface Block {
  kind: "h2" | "h3" | "p" | "li" | "quote" | "math";
  text: string;
  lang: "zh" | "de";
}

export interface VaultCard {
  id: string;
  front: string;
  back: string;
  example: string;
  fach: string;
  thema: string;
  source: string;
}

const FACH = new Set(["Deutsch", "Englisch", "Mathe", "Physik", "Chemie", "Bio", "Philosophie", "SoWi", "Musik", "Sport"]);

function splitList(v: string): string[] {
  const m = v.match(/^\[(.*)\]$/);
  if (!m) return v ? [v] : [];
  return m[1].split(",").map((s) => s.trim()).filter(Boolean);
}

export function parseFrontmatter(raw: string): { meta: Record<string, string>; body: string } {
  const meta: Record<string, string> = {};
  if (!raw.startsWith("---")) return { meta, body: raw };
  const end = raw.indexOf("\n---", 3);
  if (end < 0) return { meta, body: raw };
  for (const line of raw.slice(3, end).split("\n")) {
    const i = line.indexOf(":");
    if (i < 0) continue;
    const k = line.slice(0, i).trim();
    let v = line.slice(i + 1).trim().replace(/^"(.*)"$/, "$1");
    if (k) meta[k] = v;
  }
  return { meta, body: raw.slice(end + 4) };
}

function hasCJK(s: string): boolean {
  let cjk = 0;
  for (const ch of s) {
    if (/[\u4e00-\u9fff]/.test(ch)) cjk++;
    if (cjk >= 2) return true;
  }
  return false;
}

function inline(text: string): string {
  return text.replace(/\*\*(.+?)\*\*/g, "$1").replace(/^#+\s*/, "").replace(/^[-*]\s+/, "").trim();
}

export function parseBody(body: string): Block[] {
  const blocks: Block[] = [];
  let inMath = false;
  let mathBuf: string[] = [];
  for (const rawLine of body.split("\n")) {
    const line = rawLine.trim();
    if (line.startsWith("```")) {
      if (inMath) {
        const code = mathBuf.join("\n").trim();
        if (code) blocks.push({ kind: "math", text: code, lang: "de" });
        mathBuf = [];
        inMath = false;
      } else {
        inMath = true;
      }
      continue;
    }
    if (inMath) {
      mathBuf.push(rawLine);
      continue;
    }
    if (!line) continue;
    if (line.startsWith(">")) {
      const text = line.replace(/^>+\s*/, "").trim();
      if (text) blocks.push({ kind: "quote", text: inline(text), lang: hasCJK(text) ? "zh" : "de" });
      continue;
    }
    if (line.startsWith("### ")) blocks.push({ kind: "h3", text: inline(line), lang: hasCJK(line) ? "zh" : "de" });
    else if (line.startsWith("## ")) blocks.push({ kind: "h2", text: inline(line), lang: hasCJK(line) ? "zh" : "de" });
    else if (/^[-*]\s+/.test(line)) blocks.push({ kind: "li", text: inline(line), lang: hasCJK(line) ? "zh" : "de" });
    else if (!line.startsWith("#")) blocks.push({ kind: "p", text: inline(line), lang: hasCJK(line) ? "zh" : "de" });
  }
  return blocks;
}

export function parseNoteFile(path: string, raw: string): VaultNote | null {
  const { meta, body } = parseFrontmatter(raw);
  const fach = meta.fach ?? "";
  if (!FACH.has(fach)) return null;
  return {
    id: path,
    path,
    fach,
    thema: meta.thema || path.split("/").pop()?.replace(/\.md$/, "") || "?",
    operatoren: splitList(meta.operatoren ?? ""),
    klausurrelevant: meta.klausurrelevant === "true",
    datum: meta.datum ?? "",
    tags: splitList(meta.tags ?? ""),
    blocks: parseBody(body),
  };
}

const CSV_HEADER = new Set(["deutsch", "begriff", "vokabel", "term"]);

export function parseCsv(path: string, raw: string): VaultCard[] {
  const cards: VaultCard[] = [];
  const dirFach = path.split("/")[0];
  let n = 0;
  let first = true;
  for (const line of raw.split("\n")) {
    const t = line.trim();
    if (!t) continue;
    const cols = t.split(";");
    if (cols.length < 2) continue;
    if (first) {
      first = false;
      // Skip header row (Deutsch;Chinesisch;Beispielsatz;Fach;Thema), never a card.
      if (CSV_HEADER.has(cols[0].trim().toLowerCase())) continue;
    }
    if (cols.length !== 5) continue; // malformed: warn downstream, never shift fields
    n++;
    cards.push({
      id: `${path}#${n}`,
      front: cols[0].trim(),
      back: cols[1].trim(),
      example: (cols[2] ?? "").trim(),
      fach: (cols[3] ?? "").trim() || dirFach,
      thema: (cols[4] ?? "").trim(),
      source: path,
    });
  }
  return cards;
}
