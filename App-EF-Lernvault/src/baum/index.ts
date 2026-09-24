import type { FachId } from "../fach";
import type { FachBaum } from "./types";
import { bioBaum } from "./bio";
import { chemieBaum } from "./chemie";
import { deutschBaum } from "./deutsch";
import { englischBaum } from "./englisch";
import { matheBaum } from "./mathe";
import { musikBaum } from "./musik";
import { philosophieBaum } from "./philosophie";
import { physikBaum } from "./physik";
import { sowiBaum } from "./sowi";
import { sportBaum } from "./sport";

export const BAEUME: Record<FachId, FachBaum> = {
  Deutsch: deutschBaum,
  Englisch: englischBaum,
  Mathe: matheBaum,
  Physik: physikBaum,
  Chemie: chemieBaum,
  Bio: bioBaum,
  Philosophie: philosophieBaum,
  SoWi: sowiBaum,
  Musik: musikBaum,
  Sport: sportBaum,
};

export const BAEUME_LISTE: FachBaum[] = [
  deutschBaum,
  englischBaum,
  matheBaum,
  physikBaum,
  chemieBaum,
  bioBaum,
  philosophieBaum,
  sowiBaum,
  musikBaum,
  sportBaum,
];

export function getBaum(fach: string): FachBaum | undefined {
  const treffer = BAEUME_LISTE.find((b) => b.fach.toLowerCase() === fach.trim().toLowerCase());
  return treffer;
}
