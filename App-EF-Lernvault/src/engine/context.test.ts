import { describe, it, expect, beforeEach } from "vitest";
import { estimateTokens, budgetContext, assembleOptimizedContext } from "./context";
import { clearCCR } from "../storage/ccrStore";
import type { TextChunk } from "./rag";
import type { ChatMsg } from "../ai/engine";

describe("src/engine/context.ts - Token Budgeting & Multi-Zone Assembly", () => {
  beforeEach(async () => {
    await clearCCR();
  });

  it("schätzt Tokenanzahl für gemischte deutsche und chinesische Texte sinnvoll", () => {
    const german = "Dies ist ein einfacher Satz zur Prüfung."; // 40 Zeichen -> ~12 Tokens
    const zh = "这是一个测试句子"; // 8 CJK Zeichen -> 12 Tokens
    expect(estimateTokens(german)).toBeGreaterThan(8);
    expect(estimateTokens(german)).toBeLessThan(20);
    expect(estimateTokens(zh)).toBe(12);
  });

  it("schneidet Chunks und Dialoge innerhalb des Budgets ab", () => {
    const dummyChunks: TextChunk[] = Array.from({ length: 10 }, (_, i) => ({
      id: `note-${i}#1`,
      path: `note-${i}.md`,
      fach: "SoWi",
      thema: `Thema ${i}`,
      operatoren: ["darstellen"],
      kind: "text",
      lang: "de",
      text: "Ausführlicher Beispieltext für das Chunken mit einer gewissen Mindestlänge für Token.".repeat(3),
    }));

    const dummyHistory: ChatMsg[] = Array.from({ length: 10 }, (_, i) => ({
      role: i % 2 === 0 ? "user" : "assistant",
      content: `Nachricht ${i} mit weiterem Text zur Erzeugung von Token-Last.`,
    }));

    const budgeted = budgetContext(dummyChunks, dummyHistory, {
      maxContextTokens: 600,
      systemReserve: 100,
      generationReserve: 150,
    });

    // Content-Budget ist 600 - 150 - 100 = 350 Tokens.
    expect(budgeted.fittedChunks.length).toBeLessThan(10);
    expect(budgeted.fittedChunks.length).toBeGreaterThanOrEqual(1);
    expect(budgeted.fittedHistory.length).toBeLessThan(10);
    expect(budgeted.fittedHistory.length).toBeGreaterThanOrEqual(1);
    expect(budgeted.totalTokens).toBeLessThanOrEqual(600);
  });

  it("assembles optimized 3-zone context (Hot/Warm/Live) with compression stats", async () => {
    const dummyChunks: TextChunk[] = [
      {
        id: "sowi/ungl#1",
        path: "08_SoWi/Ungleichheit.md",
        fach: "SoWi",
        thema: "Ungleichheit",
        operatoren: ["darstellen"],
        kind: "text",
        lang: "de",
        text: "Top-1 Chunk bleibt stets komplett erhalten.",
      },
      {
        id: "sowi/gini#1",
        path: "08_SoWi/Gini.md",
        fach: "SoWi",
        thema: "Gini-Koeffizient",
        operatoren: ["analysieren"],
        kind: "text",
        lang: "de",
        text: "Langer Vorlauf ohne Substanz.\nKlausur-Satz: Der Gini-Koeffizient misst die Ungleichverteilung von 0 bis 1.\nLanger Nachlauf.",
      },
    ];

    const dummyHistory: ChatMsg[] = [
      { role: "user", content: "Was ist der Gini-Koeffizient?" },
      { role: "assistant", content: "Der Gini-Koeffizient ist ein statistisches Maß. " + "Langer Text... ".repeat(20) },
      { role: "user", content: "Wie hoch ist er in Deutschland?" },
      { role: "assistant", content: "In Deutschland liegt der Netto-Gini bei etwa 0,29 bis 0,31." },
    ];

    const opt = await assembleOptimizedContext(dummyChunks, dummyHistory, {
      query: "Wie interpretiert man die Lorenzkurve?",
      intensityModifier: "Kurz und prägnant",
      maxContextTokens: 2000,
    });

    // Struktur prüfen
    expect(opt.messages.length).toBeGreaterThanOrEqual(3);
    expect(opt.messages[0].role).toBe("system");
    expect(opt.messages[0].content).toContain("Du bist ein lokaler KI-Tutor"); // Hot-Zone
    expect(opt.messages[0].content).toContain("Modus-Vorgabe: Kurz und prägnant");
    expect(opt.messages[opt.messages.length - 1].content).toBe("Wie interpretiert man die Lorenzkurve?");

    // Stats prüfen
    expect(opt.stats.hotTokens).toBeGreaterThan(0);
    expect(opt.stats.warmTokens).toBeGreaterThan(0);
    expect(opt.stats.liveTokens).toBeGreaterThan(0);
    expect(opt.stats.totalTokens).toBeGreaterThan(0);
  });

  it("injects cross-subject vernetzung bridge into Warm-Zone with low token footprint", async () => {
    const dummyChunks: TextChunk[] = [
      {
        id: "mathe/ableitung#1",
        path: "03_Mathe/Analysis.md",
        fach: "Mathe",
        thema: "Differentialrechnung",
        operatoren: ["berechnen"],
        kind: "text",
        lang: "de",
        text: "Die 1. Ableitung f'(x) gibt die Steigung der Tangente an.",
      },
    ];

    const opt = await assembleOptimizedContext(dummyChunks, [], {
      query: "Welche Bedeutung hat die Ableitung für die Momentangeschwindigkeit in der Physik?",
      currentSubject: "Mathe",
      maxContextTokens: 2000,
    });

    expect(opt.vernetzungBridge).not.toBeNull();
    expect(opt.vernetzungBridge?.targetSubject).toBe("Physik");
    expect(opt.messages[0].content).toContain("Fachübergreifende Vernetzung: [Physik]");
  });
});

