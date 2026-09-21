import { parseFrontmatter, parseBody, type Block } from "./vault/parser";
import exemplarCourseRaw from "../../Lernreise/Sowi-Soziale-Marktwirtschaft-L1.md?raw";

export type SchrittTyp = "entdecken" | "ausprobieren" | "check" | "szenario" | "muendlich";

export interface SchrittBase {
  typ: SchrittTyp;
  stepNumber: number;
  title: string;
}

export interface SchrittEntdecken extends SchrittBase {
  typ: "entdecken";
  rawText: string;
  blocks: Block[];
}

export interface SchrittAusprobieren extends SchrittBase {
  typ: "ausprobieren";
  aufgabe: string;
  hilfe?: string;
  antwort?: string;
}

export interface CheckItem {
  id: string;
  frage: string;
  antwort: string;
}

export interface SchrittCheck extends SchrittBase {
  typ: "check";
  items: CheckItem[];
}

export interface SchrittSzenario extends SchrittBase {
  typ: "szenario";
  rolle: string;
  situation: string;
  rubric: string;
  rubricPoints: string[];
}

export interface SchrittMuendlich extends SchrittBase {
  typ: "muendlich";
  ziehung: string;
  zeitSec: number;
  selbstcheck: string[];
}

export type Schritt =
  | SchrittEntdecken
  | SchrittAusprobieren
  | SchrittCheck
  | SchrittSzenario
  | SchrittMuendlich;

export interface Reise {
  id: string;
  path: string;
  fach: string;
  thema: string;
  level: number;
  ziel: "Klausur" | "Verstehen" | "Muendlich" | string;
  xp: number;
  datum?: string;
  tags?: string[];
  schritte: Schritt[];
}

function extractValue(text: string, prefix: string): string {
  const reg = new RegExp(`^${prefix}:?\\s*(.*)$`, "im");
  const match = text.match(reg);
  return match ? match[1].trim() : "";
}

export function parseReiseFile(path: string, raw: string): Reise | null {
  const { meta, body } = parseFrontmatter(raw);
  const fach = meta.fach?.trim() ?? "";
  const thema = meta.thema?.trim() ?? "";
  if (!fach || !thema) return null;

  const level = Number(meta.level) || 1;
  const ziel = meta.ziel?.trim() || "Klausur";
  const xp = Number(meta.xp) || 100;
  const datum = meta.datum?.trim();

  // Split steps by "## Schritt N — <typ>"
  const stepRegex = /##\s*Schritt\s*(\d+)\s*[-—]\s*(\w+)/gi;
  const matches: { index: number; stepNum: number; typ: SchrittTyp; header: string }[] = [];
  let m: RegExpExecArray | null;

  while ((m = stepRegex.exec(body)) !== null) {
    const rawTyp = m[2].toLowerCase();
    const typ: SchrittTyp =
      rawTyp === "entdecken" ||
      rawTyp === "ausprobieren" ||
      rawTyp === "check" ||
      rawTyp === "szenario" ||
      rawTyp === "muendlich"
        ? (rawTyp as SchrittTyp)
        : "entdecken";

    matches.push({
      index: m.index,
      stepNum: Number(m[1]),
      typ,
      header: m[0],
    });
  }

  if (matches.length === 0) return null;

  const schritte: Schritt[] = [];

  for (let i = 0; i < matches.length; i++) {
    const cur = matches[i];
    const nextIndex = i + 1 < matches.length ? matches[i + 1].index : body.length;
    const content = body.slice(cur.index + cur.header.length, nextIndex).trim();

    if (cur.typ === "entdecken") {
      schritte.push({
        typ: "entdecken",
        stepNumber: cur.stepNum,
        title: "Entdecken · 知识讲解",
        rawText: content,
        blocks: parseBody(content),
      });
    } else if (cur.typ === "ausprobieren") {
      const aufgabe = extractValue(content, "AUFGABE") || content;
      const hilfe = extractValue(content, "HILFE");
      const antwort = extractValue(content, "ANTWORT");
      schritte.push({
        typ: "ausprobieren",
        stepNumber: cur.stepNum,
        title: "Ausprobieren · 动手实操",
        aufgabe,
        hilfe: hilfe || undefined,
        antwort: antwort || undefined,
      });
    } else if (cur.typ === "check") {
      const items: CheckItem[] = [];
      const lines = content.split("\n").map((l) => l.trim()).filter(Boolean);
      let count = 0;
      for (const line of lines) {
        if (/^FRAGE:/i.test(line)) {
          count++;
          const parts = line.replace(/^FRAGE:\s*/i, "").split(/\s*\|\s*ANTWORT:\s*/i);
          items.push({
            id: `q${count}`,
            frage: parts[0]?.trim() ?? "",
            antwort: parts[1]?.trim() ?? "",
          });
        }
      }
      schritte.push({
        typ: "check",
        stepNumber: cur.stepNum,
        title: "Check · 过关自测",
        items,
      });
    } else if (cur.typ === "szenario") {
      const rolle = extractValue(content, "ROLLE");
      const situation = extractValue(content, "SITUATION");
      const rubric = extractValue(content, "RUBRIC");
      const rubricPoints = rubric ? rubric.split(/\s*\|\s*/).filter(Boolean) : [];
      schritte.push({
        typ: "szenario",
        stepNumber: cur.stepNum,
        title: "Szenario · 场景实战",
        rolle,
        situation,
        rubric,
        rubricPoints,
      });
    } else if (cur.typ === "muendlich") {
      const ziehung = extractValue(content, "ZIEHUNG");
      const zeitStr = extractValue(content, "ZEIT");
      const zeitSec = Number(zeitStr.replace(/\D/g, "")) || 180;
      const selbstcheckRaw = extractValue(content, "SELBSTCHECK");
      const selbstcheck = selbstcheckRaw ? selbstcheckRaw.split(/\s*\|\s*/).filter(Boolean) : [];
      schritte.push({
        typ: "muendlich",
        stepNumber: cur.stepNum,
        title: "Mündlich · 口述模拟",
        ziehung,
        zeitSec,
        selbstcheck,
      });
    }
  }

  return {
    id: path,
    path,
    fach,
    thema,
    level,
    ziel,
    xp,
    datum,
    schritte,
  };
}

// Built-in exemplar course parsed from vault Lernreise/Sowi-Soziale-Marktwirtschaft-L1.md
export const exemplarReise: Reise | null = parseReiseFile(
  "Lernreise/Sowi-Soziale-Marktwirtschaft-L1.md",
  exemplarCourseRaw
);
