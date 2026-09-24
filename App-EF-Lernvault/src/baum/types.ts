import type { FachId } from "../fach";

export type BaumLevel = 0 | 1 | 2 | 3;

export type BaumStatus = "luecke" | "offen" | "aktiv" | "beherrscht";

export interface BaumNode {
  readonly id: string;
  readonly level: BaumLevel;
  readonly code: string;
  readonly titleDE: string;
  readonly titleZH: string;
  readonly operatoren: readonly string[];
  readonly klausurDE: string;
  readonly klausurZH: string;
  readonly leitfrageDE: string;
  readonly leitfrageZH: string;
  readonly noteKeywords: readonly string[];
  readonly children: readonly BaumNode[];
}

export interface FachBaum {
  readonly fach: FachId;
  readonly nameDE: string;
  readonly nameZH: string;
  readonly klpReferenz: string;
  readonly klausurFokusDE: string;
  readonly klausurFokusZH: string;
  readonly root: BaumNode;
}

export interface SuchEintrag {
  readonly nodeId: string;
  readonly fach: FachId;
  readonly level: BaumLevel;
  readonly pfadDE: string;
  readonly pfadZH: string;
  readonly heuhaufen: string;
}

export interface NotizStichwort {
  readonly id: string;
  readonly fach: string;
  readonly thema: string;
  readonly text: string;
  readonly operatoren: readonly string[];
}

export interface MasteryEintrag {
  readonly thema: string;
  readonly fach: string;
  readonly pMastery: number;
}
