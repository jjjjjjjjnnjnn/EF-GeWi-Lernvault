import { defaultVaultNotes, cards as presetCards } from "../data";
import type { VaultData } from "../vault/loader";
import { importCsvCards, importKnowledgePackage, importMarkdownNote } from "./importer";
import type {
  ImportResult,
  KnowledgeCard,
  KnowledgeNote,
  KnowledgePackage,
  KnowledgeStats,
} from "./types";

const STORAGE_KEY_USER_NOTES = "ef_user_custom_notes_v1";
const STORAGE_KEY_USER_CARDS = "ef_user_custom_cards_v1";

export class KnowledgeRepository {
  private userNotes: KnowledgeNote[] = [];
  private userCards: KnowledgeCard[] = [];
  private externalVault: VaultData | null = null;
  private listeners: Set<() => void> = new Set();

  constructor() {
    this.loadFromStorage();
  }

  private loadFromStorage(): void {
    if (typeof localStorage === "undefined") return;
    try {
      const rawNotes = localStorage.getItem(STORAGE_KEY_USER_NOTES);
      if (rawNotes) {
        this.userNotes = JSON.parse(rawNotes);
      }
      const rawCards = localStorage.getItem(STORAGE_KEY_USER_CARDS);
      if (rawCards) {
        this.userCards = JSON.parse(rawCards);
      }
    } catch {
      // Storage parsing failed, keep in-memory
    }
  }

  private saveToStorage(): void {
    if (typeof localStorage === "undefined") return;
    try {
      localStorage.setItem(STORAGE_KEY_USER_NOTES, JSON.stringify(this.userNotes));
      localStorage.setItem(STORAGE_KEY_USER_CARDS, JSON.stringify(this.userCards));
    } catch {
      // Storage write failed
    }
    this.notify();
  }

  public subscribe(listener: () => void): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  private notify(): void {
    this.listeners.forEach((fn) => {
      try {
        fn();
      } catch {
        // ignore subscriber errors
      }
    });
  }

  public setExternalVault(vault: VaultData | null): void {
    this.externalVault = vault;
    this.notify();
  }

  public getExternalVault(): VaultData | null {
    return this.externalVault;
  }

  public getAllNotes(): KnowledgeNote[] {
    const baseNotes: KnowledgeNote[] = (this.externalVault?.notes ?? defaultVaultNotes).map((n) => ({
      ...n,
      sourceType: this.externalVault ? "folder" : "preset",
      isCustom: false,
    }));

    const userMap = new Map(this.userNotes.map((n) => [n.id, n]));
    const result: KnowledgeNote[] = [];

    // Filter out overridden base notes
    for (const bn of baseNotes) {
      if (userMap.has(bn.id)) {
        result.push(userMap.get(bn.id)!);
        userMap.delete(bn.id);
      } else {
        result.push(bn);
      }
    }

    // Add remaining custom notes
    result.push(...userMap.values());
    return result;
  }

  public getAllCards(): KnowledgeCard[] {
    const baseCards: KnowledgeCard[] = (this.externalVault?.cards ?? presetCards).map((c) => ({
      id: c.id,
      front: c.front,
      back: c.back,
      example: c.example,
      fach: c.fach,
      thema: "thema" in c ? (c as any).thema : c.fach,
      source: "source" in c ? (c as any).source : "data.ts",
      sourceType: this.externalVault ? "folder" : "preset",
      isCustom: false,
    }));

    const userCardMap = new Map(this.userCards.map((c) => [c.id, c]));
    const result: KnowledgeCard[] = [];

    for (const bc of baseCards) {
      if (userCardMap.has(bc.id)) {
        result.push(userCardMap.get(bc.id)!);
        userCardMap.delete(bc.id);
      } else {
        result.push(bc);
      }
    }

    result.push(...userCardMap.values());
    return result;
  }

  public addCustomNote(data: {
    fach: string;
    thema: string;
    operatoren?: string[];
    contentZH?: string;
    contentDE?: string;
    tags?: string[];
  }): KnowledgeNote {
    const id = `custom/${data.fach.toLowerCase()}-${Date.now()}`;
    const blocks = [];
    if (data.contentZH) {
      blocks.push({ kind: "p" as const, text: data.contentZH, lang: "zh" as const });
    }
    if (data.contentDE) {
      blocks.push({ kind: "p" as const, text: data.contentDE, lang: "de" as const });
    }
    if (blocks.length === 0) {
      blocks.push({ kind: "p" as const, text: `Wissenspunkt zu ${data.thema}`, lang: "de" as const });
    }

    const newNote: KnowledgeNote = {
      id,
      path: `custom/${data.fach}/${data.thema.replace(/\s+/g, "-")}.md`,
      fach: data.fach,
      thema: data.thema,
      operatoren: data.operatoren && data.operatoren.length > 0 ? data.operatoren : ["darstellen"],
      klausurrelevant: true,
      datum: new Date().toISOString().slice(0, 10),
      tags: ["EF", data.fach, ...(data.tags ?? [])],
      blocks,
      sourceType: "user",
      isCustom: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    this.userNotes.unshift(newNote);
    this.saveToStorage();
    return newNote;
  }

  public updateCustomNote(id: string, updates: Partial<KnowledgeNote>): void {
    const idx = this.userNotes.findIndex((n) => n.id === id);
    if (idx >= 0) {
      this.userNotes[idx] = {
        ...this.userNotes[idx],
        ...updates,
        updatedAt: new Date().toISOString(),
      };
      this.saveToStorage();
    }
  }

  public deleteCustomNote(id: string): void {
    this.userNotes = this.userNotes.filter((n) => n.id !== id);
    this.saveToStorage();
  }

  public addCustomCard(data: {
    front: string;
    back: string;
    example?: string;
    fach: string;
    thema?: string;
  }): KnowledgeCard {
    const id = `custom-card/${Date.now()}`;
    const newCard: KnowledgeCard = {
      id,
      front: data.front,
      back: data.back,
      example: data.example ?? "",
      fach: data.fach,
      thema: data.thema ?? data.fach,
      source: "custom",
      sourceType: "user",
      isCustom: true,
      createdAt: new Date().toISOString(),
    };

    this.userCards.unshift(newCard);
    this.saveToStorage();
    return newCard;
  }

  public deleteCustomCard(id: string): void {
    this.userCards = this.userCards.filter((c) => c.id !== id);
    this.saveToStorage();
  }

  public importFromText(
    filename: string,
    rawContent: string,
    defaultFach = "SoWi"
  ): { notesCount: number; cardsCount: number } {
    let notesCount = 0;
    let cardsCount = 0;

    if (filename.endsWith(".json")) {
      const res = this.importFromJson(rawContent);
      return { notesCount: res.importedNotesCount, cardsCount: res.importedCardsCount };
    }

    if (filename.endsWith(".csv")) {
      const cards = importCsvCards(filename, rawContent, defaultFach);
      this.userCards.push(...cards);
      cardsCount = cards.length;
      this.saveToStorage();
      return { notesCount: 0, cardsCount };
    }

    // Default to markdown note
    const note = importMarkdownNote(filename, rawContent, defaultFach);
    if (note) {
      this.userNotes.unshift(note);
      notesCount = 1;
      this.saveToStorage();
    }

    return { notesCount, cardsCount };
  }

  public importFromJson(jsonString: string): ImportResult {
    const result = importKnowledgePackage(jsonString);
    if (!result.success) return result;

    try {
      const data = JSON.parse(jsonString) as KnowledgePackage;
      if (Array.isArray(data.notes)) {
        const markedNotes = data.notes.map((n) => ({ ...n, sourceType: "user" as const, isCustom: true }));
        this.userNotes.push(...markedNotes);
      }
      if (Array.isArray(data.cards)) {
        const markedCards = data.cards.map((c) => ({ ...c, sourceType: "user" as const, isCustom: true }));
        this.userCards.push(...markedCards);
      }
      this.saveToStorage();
    } catch (err) {
      result.errors.push(`Fehler beim Speichern: ${(err as Error).message}`);
    }

    return result;
  }

  public resetCustomData(): void {
    this.userNotes = [];
    this.userCards = [];
    this.saveToStorage();
  }

  public getStats(): KnowledgeStats {
    const allNotes = this.getAllNotes();
    const allCards = this.getAllCards();
    const subjects = new Set([...allNotes.map((n) => n.fach), ...allCards.map((c) => c.fach)]);

    return {
      totalNotes: allNotes.length,
      presetNotes: defaultVaultNotes.length,
      userNotes: this.userNotes.length,
      totalCards: allCards.length,
      presetCards: presetCards.length,
      userCards: this.userCards.length,
      subjectsCount: subjects.size,
      hasExternalVault: Boolean(this.externalVault),
    };
  }
}

export const repository = new KnowledgeRepository();
