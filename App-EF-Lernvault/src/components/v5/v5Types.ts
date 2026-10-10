export interface KernsatzData {
  text: string;
  subjekt?: string;
  mechanismus?: string;
  urteil?: string;
  selbsttest?: string;
  rawText?: string;
}

export interface ErwartungshorizontRow {
  teilleistung: string;
  punkte: string;
  punkteNum: number;
  alternativweg?: string;
  afb?: "I" | "II" | "III";
}

export interface ErwartungshorizontData {
  title?: string;
  totalPoints: number;
  rows: ErwartungshorizontRow[];
  musterKlausursatz?: string;
}

export interface AufloesungData {
  title?: string;
  mechanismusA?: string;
  mechanismusB?: string;
  kausaleEssenz?: string;
  klausurSatz?: string;
  rawExplanation?: string;
}
