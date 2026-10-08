import type { VaultCard, VaultNote } from "../vault/parser";

export type KnowledgeSourceType = "preset" | "user" | "folder";

export interface KnowledgeNote extends VaultNote {
  sourceType?: KnowledgeSourceType;
  isCustom?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface KnowledgeCard extends VaultCard {
  sourceType?: KnowledgeSourceType;
  isCustom?: boolean;
  createdAt?: string;
}

export interface KnowledgePackage {
  schemaVersion: 1;
  appVersion: string;
  exportedAt: string;
  name: string;
  description?: string;
  subjects: string[];
  notes: KnowledgeNote[];
  cards: KnowledgeCard[];
}

export interface ImportResult {
  success: boolean;
  importedNotesCount: number;
  importedCardsCount: number;
  errors: string[];
  warnings: string[];
}

export interface FachPlugin {
  id: string; // e.g. "Deutsch", "Informatik"
  kurz: string; // e.g. "DE", "IF"
  nameDE: string;
  nameZH: string;
  category: "gewi" | "mint" | "sprachen" | "kuenste" | "sport";
  operators: string[];
  isDefault: boolean;
  descriptionDE?: string;
  descriptionZH?: string;
}

export interface KnowledgeStats {
  totalNotes: number;
  presetNotes: number;
  userNotes: number;
  totalCards: number;
  presetCards: number;
  userCards: number;
  subjectsCount: number;
  hasExternalVault: boolean;
}
