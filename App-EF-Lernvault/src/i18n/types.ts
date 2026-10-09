export type Lang = "de" | "zh";

export type NodeLanguageMode = "de" | "zh" | "bilingual";

export interface I18nModule<T = Record<string, any>> {
  readonly id: string;
  readonly name: string;
  readonly getStrings: (lang: Lang) => T;
}

export interface NodeLocalizedContent {
  readonly primaryTitle: string;
  readonly secondaryTitle: string;
  readonly primarySummary?: string;
  readonly secondarySummary?: string;
  readonly isBilingual: boolean;
  readonly pillText: string;
}
