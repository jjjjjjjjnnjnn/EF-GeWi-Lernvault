import type {
  KernsatzData,
  ErwartungshorizontData,
  ErwartungshorizontRow,
  AufloesungData,
} from "./v5Types";

export function isKernsatzHeader(text: string): boolean {
  return /^(?:>?\s*)?KERNSATZ(?:\s*\([^)]*\))?[:：]?/i.test(text.trim());
}

export function isAufloesungHeader(text: string): boolean {
  return /^(?:>?\s*)?AUFL[OÖ]SUNG(?:\s*\([^)]*\))?[:：]?/i.test(text.trim());
}

export function isErwartungshorizontHeader(text: string): boolean {
  return /^(?:>?\s*)?ERWARTUNGSHORIZONT(?:\s*\([^)]*\))?[:：]?/i.test(text.trim());
}

/**
 * Extracts structured Kernsatz data (axiom sentence, 3-part decomposition, cloze self-test)
 */
export function parseKernsatzFromText(text: string): KernsatzData | null {
  if (!/KERNSATZ/i.test(text)) return null;

  // Only consider content starting from the KERNSATZ header
  const headerIdx = text.search(/KERNSATZ/i);
  const relevantText = headerIdx >= 0 ? text.slice(headerIdx) : text;
  const lines = relevantText.split("\n").map((l) => l.trim()).filter(Boolean);
  let sentence = "";
  let subjekt: string | undefined;
  let mechanismus: string | undefined;
  let urteil: string | undefined;
  let selbsttest: string | undefined;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Check if line contains the header with inline sentence: KERNSATZ: `...`
    const inlineMatch = /KERNSATZ(?:\s*\([^)]*\))?[:：]?\s*[`"']([^`"']{10,})[`"']/i.exec(line);
    if (inlineMatch && !sentence) {
      sentence = inlineMatch[1].trim();
      continue;
    }

    // Check standalone backtick line or quoted sentence
    if (!sentence && (line.startsWith("`") || line.startsWith("> `") || line.startsWith("> \"") || line.startsWith("Kernsatz:"))) {
      const clean = line
        .replace(/^>\s*/, "")
        .replace(/^Kernsatz[:：]?\s*/i, "")
        .replace(/^[`"']|[`"']$/g, "")
        .trim();
      if (clean.length > 10) {
        sentence = clean;
        continue;
      }
    }

    // Check Zerlegung / Aufschlüsselung header or content line
    if (/^[-*]?\s*(?:Zerlegung|Aufschluesselung|Aufschlüsselung)[:：]/i.test(line)) {
      // Could be "- Zerlegung: Subjekt | Mechanismus | Urteil"
      // or "- Aufschluesselung: Subjekt = ... | Mechanismus = ... | Urteil = ..."
      const body = line.replace(/^[-*]?\s*(?:Zerlegung|Aufschluesselung|Aufschlüsselung)[:：]\s*/i, "");
      if (body.includes("=") || (body.includes("|") && !/Subjekt\s*\|\s*Mechanismus/i.test(body))) {
        parseDreisatzLine(body);
      }
      continue;
    }

    // Next line might be the values of Zerlegung: "- Subjekt ... | Mechanismus ... | Urteil ..."
    if (/[-*]?\s*[^|]+\|[^|]+\|[^|]+/i.test(line) && !line.includes("Teilleistung") && !line.includes("FRAGE")) {
      const clean = line.replace(/^[-*]\s*/, "");
      parseDreisatzLine(clean);
      continue;
    }

    // Selbsttest: "- Selbsttest: ... ___ ..."
    if (/^[-*]?\s*Selbsttest[:：]/i.test(line)) {
      selbsttest = line.replace(/^[-*]?\s*Selbsttest[:：]\s*/i, "").trim();
      continue;
    }
  }

  function parseDreisatzLine(raw: string) {
    if (raw.includes("=")) {
      // Subjekt = ... | Mechanismus = ... | Urteil = ...
      const parts = raw.split("|").map((p) => p.trim());
      for (const p of parts) {
        if (/^Subjekt\s*=/i.test(p)) subjekt = p.replace(/^Subjekt\s*=\s*/i, "").trim();
        else if (/^Mechanismus\s*=/i.test(p)) mechanismus = p.replace(/^Mechanismus\s*=\s*/i, "").trim();
        else if (/^Urteil\s*=/i.test(p)) urteil = p.replace(/^Urteil\s*=\s*/i, "").trim();
      }
    } else {
      const parts = raw.split("|").map((p) => p.trim());
      if (parts.length >= 3) {
        subjekt = parts[0];
        mechanismus = parts[1];
        urteil = parts[2];
      }
    }
  }

  // Fallback sentence if none found via specific patterns
  if (!sentence) {
    for (const l of lines) {
      if (l.includes("`")) {
        const m = /`([^`]+)`/.exec(l);
        if (m && m[1].length > 15) {
          sentence = m[1].trim();
          break;
        }
      }
    }
  }

  if (!sentence) return null;

  return {
    text: sentence,
    subjekt,
    mechanismus,
    urteil,
    selbsttest,
    rawText: text,
  };
}

/**
 * Extracts structured Aufloesung data (Option A vs B mechanisms, causal essence, exam axiom)
 */
export function parseAufloesungFromText(text: string): AufloesungData | null {
  if (!/AUFL[OÖ]SUNG/i.test(text)) return null;

  let mechanismusA: string | undefined;
  let mechanismusB: string | undefined;
  let kausaleEssenz: string | undefined;
  let klausurSatz: string | undefined;

  const matchA = /Mechanismus\s+(?:zu\s+)?Option\s+A[:：]\s*([\s\S]*?)(?=(?:Mechanismus\s+(?:zu\s+)?Option\s+B|一句话因果本质|Kausale\s+Essenz|Klausur-Satz|$))/i.exec(text);
  if (matchA) mechanismusA = matchA[1].trim();

  const matchB = /Mechanismus\s+(?:zu\s+)?Option\s+B[:：]\s*([\s\S]*?)(?=(?:一句话因果本质|Kausale\s+Essenz|Klausur-Satz|$))/i.exec(text);
  if (matchB) mechanismusB = matchB[1].trim();

  const matchEssenz = /(?:一句话因果本质|Kausale\s+Essenz)[:：]\s*([\s\S]*?)(?=(?:Klausur-Satz|$))/i.exec(text);
  if (matchEssenz) kausaleEssenz = matchEssenz[1].trim();

  const matchSatz = /Klausur-Satz[:：]\s*[`"']?([^`"'\n]+)[`"']?/i.exec(text);
  if (matchSatz) klausurSatz = matchSatz[1].trim();

  if (!mechanismusA && !mechanismusB && !kausaleEssenz && !klausurSatz) {
    return null;
  }

  return {
    title: "AUFLÖSUNG · KAUSALMECHANISMUS",
    mechanismusA,
    mechanismusB,
    kausaleEssenz,
    klausurSatz,
    rawExplanation: text,
  };
}

/**
 * Extracts structured Erwartungshorizont data (15 NP matrix, criteria rows, 15 NP model sentence)
 */
export function parseErwartungshorizontFromText(text: string): ErwartungshorizontData | null {
  if (!/ERWARTUNGSHORIZONT/i.test(text)) return null;

  const rows: ErwartungshorizontRow[] = [];
  const lines = text.split("\n").map((l) => l.trim()).filter(Boolean);

  let inTable = false;
  let musterKlausursatz: string | undefined;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Model sentence detection
    const musterMatch = /(?:15\s*NP\s*MUSTER-KLAUSURSATZ|>*\s*MUSTER-KLAUSURSATZ\s*\((?:15\s*NP)?\))[:：]?\s*(.*)$/i.exec(line);
    if (musterMatch) {
      let rawSentence = musterMatch[1].replace(/^[>`"']+|[`"']+$/g, "").trim();
      if (!rawSentence && i + 1 < lines.length) {
        rawSentence = lines[i + 1].replace(/^[>`"']+|[`"']+$/g, "").trim();
      }
      if (rawSentence.length > 10) {
        musterKlausursatz = rawSentence;
      }
    }

    if (line.includes("Teilleistung") && line.includes("Punkte")) {
      inTable = true;
      continue;
    }

    if (inTable) {
      if (/^[:\-\|\s]+$/.test(line)) continue; // Table divider line
      if (line.startsWith("KERNSATZ") || line.includes("MUSTER-KLAUSURSATZ")) {
        inTable = false;
        continue;
      }

      if (line.includes("|")) {
        const parts = line.split("|").map((p) => p.trim());
        // Could be 3 columns: Teilleistung | Punkte | Alternativweg
        if (parts.length >= 2) {
          const teilleistung = parts[0];
          const punkte = parts[1];
          const alternativweg = parts[2] || undefined;
          const numMatch = /(\d+)/.exec(punkte);
          const punkteNum = numMatch ? Number(numMatch[1]) : 5;

          let afb: "I" | "II" | "III" | undefined;
          if (/\bAFB\s*III\b/i.test(teilleistung) || /\bAFB\s*3\b/i.test(teilleistung) || /Urteil|Synthese|Bewertung/i.test(teilleistung)) {
            afb = "III";
          } else if (/\bAFB\s*II\b/i.test(teilleistung) || /\bAFB\s*2\b/i.test(teilleistung) || /Analyse|Berechnung|Rechnung/i.test(teilleistung)) {
            afb = "II";
          } else if (/\bAFB\s*I\b/i.test(teilleistung) || /\bAFB\s*1\b/i.test(teilleistung) || /Darstellung|Ansatz/i.test(teilleistung)) {
            afb = "I";
          }

          rows.push({
            teilleistung,
            punkte,
            punkteNum,
            alternativweg,
            afb,
          });
        }
      }
    }
  }

  if (rows.length === 0) return null;

  const totalPoints = rows.reduce((sum, r) => sum + r.punkteNum, 0);

  return {
    title: "ERWARTUNGSHORIZONT (15 NP)",
    totalPoints: totalPoints || 15,
    rows,
    musterKlausursatz,
  };
}
