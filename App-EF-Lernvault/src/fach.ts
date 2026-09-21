// 10 canonical Gymnasium EF subjects (NRW). Single source of truth.
import type { Lang } from "./i18n";

export type FachId =
  | "Deutsch"
  | "Englisch"
  | "Mathe"
  | "Physik"
  | "Chemie"
  | "Bio"
  | "Philosophie"
  | "SoWi"
  | "Musik"
  | "Sport";

export interface FachInfo {
  id: FachId;
  kurz: string;
  nameDE: string;
  nameZH: string;
}

export const FAECHER: FachInfo[] = [
  { id: "Deutsch", kurz: "DE", nameDE: "Deutsch", nameZH: "德语" },
  { id: "Englisch", kurz: "EN", nameDE: "Englisch", nameZH: "英语" },
  { id: "Mathe", kurz: "MA", nameDE: "Mathematik", nameZH: "数学" },
  { id: "Physik", kurz: "PH", nameDE: "Physik", nameZH: "物理" },
  { id: "Chemie", kurz: "CH", nameDE: "Chemie", nameZH: "化学" },
  { id: "Bio", kurz: "BI", nameDE: "Biologie", nameZH: "生物" },
  { id: "Philosophie", kurz: "PL", nameDE: "Philosophie", nameZH: "哲学" },
  { id: "SoWi", kurz: "SW", nameDE: "Sozialwissenschaften", nameZH: "社会科学" },
  { id: "Musik", kurz: "MU", nameDE: "Musik", nameZH: "音乐" },
  { id: "Sport", kurz: "SP", nameDE: "Sport", nameZH: "体育" },
];

const FACH_MAP = new Map<string, FachInfo>(FAECHER.map((f) => [f.id.toLowerCase(), f]));
FAECHER.forEach((f) => {
  FACH_MAP.set(f.kurz.toLowerCase(), f);
});

export function getFach(idOrKurz: string): FachInfo | undefined {
  return FACH_MAP.get(idOrKurz.trim().toLowerCase());
}

export function getFachLabel(f: FachInfo, lang: Lang): string {
  return lang === "de" ? f.nameDE : f.nameZH;
}
