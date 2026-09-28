import { parseFrontmatter, parseBody, type Block } from "./vault/parser";
import exemplarCourseRaw from "../../Lernreise/Sowi-Soziale-Marktwirtschaft-L1.md?raw";
import sowiDepotRaw from "../../Lernreise/SoWi-Wertpapierdepot-Orderarten-L1.md?raw";
import sowiDepotDeRaw from "../../Lernreise/SoWi-Wertpapierdepot-Orderarten-DE-L1.md?raw";

export type SchrittTyp = "entdecken" | "ausprobieren" | "check" | "szenario" | "muendlich" | "reflexion";

export interface SchrittBase {
  typ: SchrittTyp;
  stepNumber: number;
  title: string;
  toolId?: string;
}

export interface SchrittEntdecken extends SchrittBase {
  typ: "entdecken";
  rawText: string;
  blocks: Block[];
}

export interface SchrittReflexion extends SchrittBase {
  typ: "reflexion";
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
  | SchrittMuendlich
  | SchrittReflexion;

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
  const reg = new RegExp(`^${prefix}(?:\\s*\\([^)]*\\))?[:：]?\\s*(.*)$`, "im");
  const match = text.match(reg);
  return match ? match[1].trim() : "";
}

function resolveStepTitle(stepNum: number, typ: SchrittTyp, customTitle?: string): string {
  if (customTitle && customTitle.trim().length > 1) {
    return customTitle.trim();
  }
  switch (stepNum) {
    case 1: return "Ziele & Phänomen-Einstieg";
    case 2: return "Fachbegriffe & Pre-Training";
    case 3: return "Kernkonzept & Wirkungsmodell";
    case 4: return "Interaktives Experiment & Praxis";
    case 5: return "Verfahrensvergleich & Abgrenzung";
    case 6: return "Selbsttest (Verständnisprüfung)";
    case 7: return "Klausur-Transfer & Szenario";
    case 8: return "Takeaway & Reflexion";
    default:
      switch (typ) {
        case "entdecken": return "Erkundung & Konzept";
        case "ausprobieren": return "Interaktive Praxis";
        case "check": return "Verständnisprüfung";
        case "szenario": return "Klausurtransfer";
        case "muendlich": return "Mündliche Prüfung";
        case "reflexion": return "Takeaway & Reflexion";
      }
  }
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

  // Split steps by "## Schritt N — <typ>[: <customTitle>]"
  const stepRegex = /##\s*Schritt\s*(\d+)\s*[-—]\s*(\w+)(?:[:：]\s*([^\n\r]+))?/gi;
  const matches: { index: number; stepNum: number; typ: SchrittTyp; header: string; customTitle?: string }[] = [];
  let m: RegExpExecArray | null;

  while ((m = stepRegex.exec(body)) !== null) {
    const rawTyp = m[2].toLowerCase();
    const stepNum = Number(m[1]);
    const typ: SchrittTyp =
      rawTyp === "entdecken" ||
      rawTyp === "ausprobieren" ||
      rawTyp === "check" ||
      rawTyp === "szenario" ||
      rawTyp === "muendlich" ||
      rawTyp === "reflexion" ||
      rawTyp === "takeaway"
        ? (rawTyp === "takeaway" ? "reflexion" : (rawTyp as SchrittTyp))
        : (stepNum === 8 ? "reflexion" : "entdecken");

    matches.push({
      index: m.index,
      stepNum,
      typ,
      header: m[0],
      customTitle: m[3]?.trim(),
    });
  }

  if (matches.length === 0) return null;

  const schritte: Schritt[] = [];

  for (let i = 0; i < matches.length; i++) {
    const cur = matches[i];
    const nextIndex = i + 1 < matches.length ? matches[i + 1].index : body.length;
    const content = body.slice(cur.index + cur.header.length, nextIndex).trim();

    const toolMatch = /\[Werkzeug:\s*([a-zA-Z0-9_\-]+)\]/i.exec(content);
    const toolId = toolMatch ? toolMatch[1] : undefined;

    if (cur.typ === "entdecken" || cur.typ === "reflexion") {
      let cachedBlocks: Block[] | null = null;
      schritte.push({
        typ: cur.typ,
        stepNumber: cur.stepNum,
        title: resolveStepTitle(cur.stepNum, cur.typ, cur.customTitle),
        rawText: content,
        get blocks(): Block[] {
          if (!cachedBlocks) {
            cachedBlocks = parseBody(content);
          }
          return cachedBlocks;
        },
        set blocks(val: Block[]) {
          cachedBlocks = val;
        },
        toolId,
      });
    } else if (cur.typ === "ausprobieren") {
      const aufgabeMatch = content.match(/AUFGABE(?:\s*\([^)]*\))?[:：]?\s*([\s\S]*?)(?=(?:\n(?:HILFE|ANTWORT|MUSTERLÖSUNG|MUSTERLOESUNG|KLAUSUR-SATZ)[:：]|$))/i);
      const aufgabe = aufgabeMatch ? aufgabeMatch[1].trim() : (extractValue(content, "AUFGABE") || content);
      const hilfe = extractValue(content, "HILFE");
      const antwort = extractValue(content, "ANTWORT") || extractValue(content, "MUSTERLÖSUNG") || extractValue(content, "MUSTERLOESUNG");
      schritte.push({
        typ: "ausprobieren",
        stepNumber: cur.stepNum,
        title: resolveStepTitle(cur.stepNum, "ausprobieren", cur.customTitle),
        aufgabe,
        hilfe: hilfe || undefined,
        antwort: antwort || undefined,
        toolId,
      });
    } else if (cur.typ === "check") {
      const items: CheckItem[] = [];
      const lines = content.split("\n").map((l) => l.trim()).filter(Boolean);
      let count = 0;
      for (const line of lines) {
        if (/^(?:[-*\d.)]+\s*)?FRAGE[:：]/i.test(line)) {
          count++;
          const cleanLine = line.replace(/^(?:[-*\d.)]+\s*)?FRAGE[:：]\s*/i, "");
          const parts = cleanLine.split(/\s*\|\s*ANTWORT[:：]\s*/i);
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
        title: resolveStepTitle(cur.stepNum, "check", cur.customTitle),
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
        title: resolveStepTitle(cur.stepNum, "szenario", cur.customTitle),
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
        title: resolveStepTitle(cur.stepNum, "muendlich", cur.customTitle),
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

// Statically bundle all Lernreise courses from vault
const reisenFiles: Record<string, string> = import.meta.glob("../../Lernreise/*.md", {
  query: "?raw",
  import: "default",
  eager: true,
});

const fallbackDepotCourses: Reise[] = [
  parseReiseFile("Lernreise/SoWi-Wertpapierdepot-Orderarten-L1.md", sowiDepotRaw),
  parseReiseFile("Lernreise/SoWi-Wertpapierdepot-Orderarten-DE-L1.md", sowiDepotDeRaw),
].filter((r): r is Reise => r !== null);

const parsedReisen = Object.entries(reisenFiles)
  .map(([path, raw]) => {
    const cleanPath = path.replace(/^.*\/Lernreise\//, "Lernreise/");
    return parseReiseFile(cleanPath, String(raw));
  })
  .filter((r): r is Reise => r !== null);

const reisenMap = new Map<string, Reise>();
fallbackDepotCourses.forEach((r) => reisenMap.set(r.id, r));
parsedReisen.forEach((r) => reisenMap.set(r.id, r));

export const defaultVaultReisen: Reise[] = Array.from(reisenMap.values())
  .sort((a, b) => a.fach.localeCompare(b.fach) || a.thema.localeCompare(b.thema));


// Built-in exemplar course parsed from vault
export const exemplarReise: Reise | null =
  defaultVaultReisen.find((r) => r.path.includes("Sowi-Soziale-Marktwirtschaft-L1")) ??
  parseReiseFile("Lernreise/Sowi-Soziale-Marktwirtschaft-L1.md", exemplarCourseRaw) ??
  defaultVaultReisen[0] ??
  null;

export function getExemplarReise(lang?: string): Reise | null {
  if (lang === "de") {
    const deCourse = defaultVaultReisen.find((r) => r.path.includes("Sowi-Soziale-Marktwirtschaft-DE-L1"));
    if (deCourse) return deCourse;
  }
  return exemplarReise;
}

export function getStepTitle(typ: SchrittTyp, lang: "de" | "zh", stepNum?: number): string {
  if (stepNum === 8 || typ === "reflexion") {
    return lang === "de" ? "Takeaway & Reflexion" : "考点精粹与元认知反思";
  }
  if (stepNum === 6) {
    return lang === "de" ? "Selbstüberprüfung" : "概念过关自测";
  }
  if (stepNum === 7) {
    return lang === "de" ? "Klausur-Transfer" : "考试情境实战";
  }
  if (lang === "de") {
    switch (typ) {
      case "entdecken": return "Erkundung & Konzept";
      case "ausprobieren": return "Interaktive Praxis";
      case "check": return "Verständnisprüfung";
      case "szenario": return "Klausurtransfer & Rubric";
      case "muendlich": return "Mündliche Prüfung";
    }
  }
  switch (typ) {
    case "entdecken": return "概念探索与精讲";
    case "ausprobieren": return "动手实操与实验";
    case "check": return "过关理解自测";
    case "szenario": return "考试情境实战";
    case "muendlich": return "口述模拟演练";
  }
}

export function resolveCourseForAudience(course: Reise, allCourses: Reise[], lang: string): Reise {
  if (lang === "de" && !course.path.includes("-DE-")) {
    const deMatch = allCourses.find(
      (c) =>
        c.path.includes("-DE-") &&
        c.fach.toLowerCase() === course.fach.toLowerCase() &&
        (c.path.replace("-DE-", "-").replace(/-DE\./, ".") === course.path ||
          c.thema.toLowerCase() === course.thema.toLowerCase())
    );
    if (deMatch) return deMatch;
  }
  return course;
}

