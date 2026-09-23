// Token 消耗追踪、账本统计与预算配额管理 (Clean-Room 原生实现)
// 记录 Prompt Token、Completion Token 以及 CCR 压缩算法节约的 Token，并支持每日预算告警

export interface TokenRecord {
  id: string;
  timestamp: number;
  endpointId: string;
  model: string;
  promptTokens: number;
  completionTokens: number;
  totalTokens: number;
  savedTokensCCR?: number;
}

export interface TokenSummary {
  todayTotal: number;
  allTimeTotal: number;
  promptTotal: number;
  completionTotal: number;
  savedTotalCCR: number;
  requestCount: number;
}

const TOKEN_LEDGER_KEY = "eflernvault:token_ledger:v1";
const TOKEN_BUDGET_KEY = "eflernvault:token_budget:v1";
const DEFAULT_DAILY_BUDGET = 100000; // 默认每日预算 10 万 Token
const MAX_RECORDS_STORED = 500; // 最多保留近 500 次调用记录，防止 localStorage 膨胀

/**
 * 获取完整 Token 记录列表
 */
export function getTokenLedger(): TokenRecord[] {
  try {
    const raw = localStorage.getItem(TOKEN_LEDGER_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

/**
 * 记录一次 LLM 调用的 Token 消耗
 */
export function recordTokenUsage(
  entry: Omit<TokenRecord, "id" | "timestamp">
): TokenRecord {
  const records = getTokenLedger();
  const newRecord: TokenRecord = {
    ...entry,
    id: `tr-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
    timestamp: Date.now(),
    savedTokensCCR: entry.savedTokensCCR ?? 0,
  };

  const updated = [newRecord, ...records].slice(0, MAX_RECORDS_STORED);
  try {
    localStorage.setItem(TOKEN_LEDGER_KEY, JSON.stringify(updated));
  } catch {
    // 忽略异常
  }

  return newRecord;
}

/**
 * 聚合统计：今日、总计、Prompt、Completion、CCR 节约量
 */
export function getTokenSummary(): TokenSummary {
  const records = getTokenLedger();
  const now = new Date();
  const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();

  let todayTotal = 0;
  let allTimeTotal = 0;
  let promptTotal = 0;
  let completionTotal = 0;
  let savedTotalCCR = 0;

  for (const r of records) {
    allTimeTotal += r.totalTokens || 0;
    promptTotal += r.promptTokens || 0;
    completionTotal += r.completionTokens || 0;
    savedTotalCCR += r.savedTokensCCR || 0;

    if (r.timestamp >= startOfDay) {
      todayTotal += r.totalTokens || 0;
    }
  }

  return {
    todayTotal,
    allTimeTotal,
    promptTotal,
    completionTotal,
    savedTotalCCR,
    requestCount: records.length,
  };
}

/**
 * 读取每日预算阈值（Token 数）
 */
export function loadTokenBudget(): number {
  try {
    const raw = localStorage.getItem(TOKEN_BUDGET_KEY);
    if (!raw) return DEFAULT_DAILY_BUDGET;
    const val = Number(raw);
    return isNaN(val) || val <= 0 ? DEFAULT_DAILY_BUDGET : val;
  } catch {
    return DEFAULT_DAILY_BUDGET;
  }
}

/**
 * 保存每日预算阈值
 */
export function saveTokenBudget(budget: number): void {
  try {
    localStorage.setItem(TOKEN_BUDGET_KEY, String(Math.max(1000, budget)));
  } catch {
    // 忽略异常
  }
}

/**
 * 检查今日预算是否超额
 */
export function checkTokenBudget(): {
  exceeded: boolean;
  current: number;
  limit: number;
  pct: number;
} {
  const summary = getTokenSummary();
  const limit = loadTokenBudget();
  const pct = Math.min(100, Math.round((summary.todayTotal / limit) * 100));
  return {
    exceeded: summary.todayTotal >= limit,
    current: summary.todayTotal,
    limit,
    pct,
  };
}

/**
 * 清空 Token 账本历史
 */
export function clearTokenLedger(): void {
  try {
    localStorage.removeItem(TOKEN_LEDGER_KEY);
  } catch {
    // 忽略异常
  }
}
