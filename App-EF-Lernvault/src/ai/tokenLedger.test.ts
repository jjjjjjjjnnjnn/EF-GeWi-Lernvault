import { describe, it, expect, beforeEach } from "vitest";
import {
  getTokenLedger,
  recordTokenUsage,
  getTokenSummary,
  loadTokenBudget,
  saveTokenBudget,
  checkTokenBudget,
  clearTokenLedger,
} from "./tokenLedger";

describe("src/ai/tokenLedger.ts - Token Management and Budgeting", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("records token usage entries and maintains ledger", () => {
    expect(getTokenLedger()).toEqual([]);

    recordTokenUsage({
      endpointId: "ep-lmstudio",
      model: "qwen2.5:7b",
      promptTokens: 450,
      completionTokens: 120,
      totalTokens: 570,
      savedTokensCCR: 80,
    });

    const ledger = getTokenLedger();
    expect(ledger.length).toBe(1);
    expect(ledger[0].totalTokens).toBe(570);
    expect(ledger[0].savedTokensCCR).toBe(80);
  });

  it("aggregates token summaries accurately", () => {
    recordTokenUsage({
      endpointId: "ep-deepseek",
      model: "deepseek-chat",
      promptTokens: 1000,
      completionTokens: 200,
      totalTokens: 1200,
      savedTokensCCR: 300,
    });

    recordTokenUsage({
      endpointId: "ep-lmstudio",
      model: "qwen2.5:7b",
      promptTokens: 500,
      completionTokens: 100,
      totalTokens: 600,
      savedTokensCCR: 150,
    });

    const summary = getTokenSummary();
    expect(summary.requestCount).toBe(2);
    expect(summary.promptTotal).toBe(1500);
    expect(summary.completionTotal).toBe(300);
    expect(summary.allTimeTotal).toBe(1800);
    expect(summary.todayTotal).toBe(1800);
    expect(summary.savedTotalCCR).toBe(450);
  });

  it("handles daily budget limits and warnings", () => {
    saveTokenBudget(2000);
    expect(loadTokenBudget()).toBe(2000);

    recordTokenUsage({
      endpointId: "ep-groq",
      model: "llama-3",
      promptTokens: 1500,
      completionTokens: 600,
      totalTokens: 2100,
    });

    const budgetStatus = checkTokenBudget();
    expect(budgetStatus.current).toBe(2100);
    expect(budgetStatus.limit).toBe(2000);
    expect(budgetStatus.exceeded).toBe(true);
    expect(budgetStatus.pct).toBe(100);
  });

  it("clears ledger cleanly", () => {
    recordTokenUsage({
      endpointId: "ep-groq",
      model: "llama-3",
      promptTokens: 100,
      completionTokens: 50,
      totalTokens: 150,
    });
    expect(getTokenLedger().length).toBe(1);

    clearTokenLedger();
    expect(getTokenLedger()).toEqual([]);
    expect(getTokenSummary().allTimeTotal).toBe(0);
  });
});
