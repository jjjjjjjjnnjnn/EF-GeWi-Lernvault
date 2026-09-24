import { MASTERY_STORAGE_KEY } from "../engine/storageKeys";
import type {
  BaumNode,
  BaumStatus,
  FachBaum,
  MasteryEintrag,
  NotizStichwort,
  SuchEintrag,
} from "./types";

export function flacheBaum(baum: FachBaum): BaumNode[] {
  const ergebnis: BaumNode[] = [];
  const gehe = (knoten: BaumNode): void => {
    ergebnis.push(knoten);
    for (const kind of knoten.children) {
      gehe(kind);
    }
  };
  gehe(baum.root);
  return ergebnis;
}

export function elternKarte(baum: FachBaum): Map<string, string | null> {
  const karte = new Map<string, string | null>();
  const gehe = (knoten: BaumNode, elternId: string | null): void => {
    karte.set(knoten.id, elternId);
    for (const kind of knoten.children) {
      gehe(kind, knoten.id);
    }
  };
  gehe(baum.root, null);
  return karte;
}

export function baueSuchIndex(baeume: FachBaum[]): SuchEintrag[] {
  const eintraege: SuchEintrag[] = [];
  for (const baum of baeume) {
    const gehe = (knoten: BaumNode, pfadDE: string[], pfadZH: string[]): void => {
      const neuDE = [...pfadDE, knoten.titleDE];
      const neuZH = [...pfadZH, knoten.titleZH];
      const pfadDeText = neuDE.join(" › ");
      const pfadZhText = neuZH.join(" › ");
      const roh = [
        pfadDeText,
        pfadZhText,
        knoten.code,
        ...knoten.operatoren,
        knoten.leitfrageDE,
        knoten.leitfrageZH,
        ...knoten.noteKeywords,
      ].join(" ");
      const heuhaufen = roh.toLowerCase().replace(/\s+/g, " ").trim();
      eintraege.push({
        nodeId: knoten.id,
        fach: baum.fach,
        level: knoten.level,
        pfadDE: pfadDeText,
        pfadZH: pfadZhText,
        heuhaufen,
      });
      for (const kind of knoten.children) {
        gehe(kind, neuDE, neuZH);
      }
    };
    gehe(baum.root, [], []);
  }
  return eintraege;
}

export function sucheBaum(index: SuchEintrag[], query: string): SuchEintrag[] {
  const normalisiert = query.trim().toLowerCase();
  if (normalisiert === "") {
    return [];
  }
  const tokens = normalisiert.split(/\s+/).filter((t) => t.length > 0);
  if (tokens.length === 0) {
    return [];
  }
  const treffer = index.filter((eintrag) => tokens.every((token) => eintrag.heuhaufen.includes(token)));
  treffer.sort((a, b) => {
    if (a.level !== b.level) {
      return a.level - b.level;
    }
    if (a.pfadDE < b.pfadDE) {
      return -1;
    }
    if (a.pfadDE > b.pfadDE) {
      return 1;
    }
    return 0;
  });
  return treffer;
}

export function findeNotizen(knoten: BaumNode, notizen: NotizStichwort[]): string[] {
  const keywords = knoten.noteKeywords
    .map((k) => k.toLowerCase().trim())
    .filter((k) => k.length > 0);
  if (keywords.length === 0) {
    return [];
  }
  const gesehen = new Set<string>();
  const ergebnis: string[] = [];
  for (const notiz of notizen) {
    const heuhaufen = `${notiz.thema} ${notiz.text}`.toLowerCase();
    const trifft = keywords.some((k) => heuhaufen.includes(k));
    if (trifft && !gesehen.has(notiz.id)) {
      gesehen.add(notiz.id);
      ergebnis.push(notiz.id);
    }
  }
  return ergebnis;
}

export function masteryFuerKnoten(knoten: BaumNode, eintraege: MasteryEintrag[]): number | null {
  const keywords = knoten.noteKeywords
    .map((k) => k.toLowerCase().trim())
    .filter((k) => k.length > 0);
  if (keywords.length === 0) {
    return null;
  }
  let bester: number | null = null;
  for (const eintrag of eintraege) {
    const thema = eintrag.thema.toLowerCase().trim();
    if (thema.length === 0) {
      continue;
    }
    const passt = keywords.some((k) => thema.includes(k) || k.includes(thema));
    if (passt && (bester === null || eintrag.pMastery > bester)) {
      bester = eintrag.pMastery;
    }
  }
  return bester;
}

export function statusFuer(trefferAnzahl: number, pMastery: number | null): BaumStatus {
  if (trefferAnzahl === 0) {
    return "luecke";
  }
  if (pMastery !== null && pMastery !== undefined && pMastery >= 0.8) {
    return "beherrscht";
  }
  if (pMastery !== null && pMastery !== undefined && pMastery >= 0.35) {
    return "aktiv";
  }
  if (trefferAnzahl > 0) {
    return "offen";
  }
  return "luecke";
}

export function ladeMasteryEintraege(): MasteryEintrag[] {
  try {
    if (typeof localStorage === "undefined") return [];
    const roh = localStorage.getItem(MASTERY_STORAGE_KEY);
    if (!roh) return [];
    const liste = JSON.parse(roh) as Array<{ thema?: unknown; fach?: unknown; pMastery?: unknown }>;
    if (!Array.isArray(liste)) return [];
    return liste
      .filter((e) => typeof e.thema === "string" && typeof e.fach === "string" && Number.isFinite(e.pMastery))
      .map((e) => ({ thema: e.thema as string, fach: e.fach as string, pMastery: e.pMastery as number }));
  } catch {
    return [];
  }
}
