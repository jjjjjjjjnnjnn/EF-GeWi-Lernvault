export const FSRS_STORAGE_KEY = "eflernvault:fsrs:v1";
export const XP_STORAGE_KEY = "eflernvault:xp:v1";
export const VERGLEICH_STORAGE_KEY = "eflernvault:vergleich:v1";
export const FEEDBACK_STORAGE_KEY = "eflernvault:feedback:v1";
export const PLAN_STORAGE_KEY = "eflernvault:plan:v1";
export const ONBOARDING_STORAGE_KEY = "eflernvault:onboarding:v1";
export const LANG_STORAGE_KEY = "eflernvault:lang";
export const MASTERY_STORAGE_KEY = "ef_lernvault_mastery_state_v1";
export const DAILY_STREAK_STORAGE_KEY = "ef_lernvault_daily_streak_v1";
export const INTERLEAVE_STORAGE_KEY = "eflernvault:interleave:v1";
export const TUTOR_PEDAGOGY_MODE_STORAGE_KEY = "eflernvault:tutor:pedagogy_mode:v1";
export const SYNC_STORAGE_KEY = "eflernvault:sync:v1";
export const AI_CONFIG_STORAGE_KEY = "eflernvault:ai:v1";
export const AI_ENDPOINTS_STORAGE_KEY = "eflernvault:endpoints:v1";
export const ACTIVE_AI_ENDPOINT_STORAGE_KEY = "eflernvault:active_endpoint:v1";
export const FALLBACK_AI_ENDPOINT_STORAGE_KEY = "eflernvault:fallback_endpoint:v1";
export const THINKING_INTENSITY_STORAGE_KEY = "eflernvault:thinking_intensity:v1";
export const TOKEN_LEDGER_STORAGE_KEY = "eflernvault:token_ledger:v1";
export const TOKEN_BUDGET_STORAGE_KEY = "eflernvault:token_budget:v1";

export const PERSISTED_STORAGE_KEYS = {
  fsrs: FSRS_STORAGE_KEY,
  xp: XP_STORAGE_KEY,
  vergleich: VERGLEICH_STORAGE_KEY,
  feedback: FEEDBACK_STORAGE_KEY,
  plan: PLAN_STORAGE_KEY,
  onboarding: ONBOARDING_STORAGE_KEY,
  language: LANG_STORAGE_KEY,
  mastery: MASTERY_STORAGE_KEY,
  dailyStreak: DAILY_STREAK_STORAGE_KEY,
  interleave: INTERLEAVE_STORAGE_KEY,
  tutorPedagogyMode: TUTOR_PEDAGOGY_MODE_STORAGE_KEY,
  sync: SYNC_STORAGE_KEY,
  aiConfig: AI_CONFIG_STORAGE_KEY,
  aiEndpoints: AI_ENDPOINTS_STORAGE_KEY,
  activeAiEndpoint: ACTIVE_AI_ENDPOINT_STORAGE_KEY,
  fallbackAiEndpoint: FALLBACK_AI_ENDPOINT_STORAGE_KEY,
  thinkingIntensity: THINKING_INTENSITY_STORAGE_KEY,
  tokenLedger: TOKEN_LEDGER_STORAGE_KEY,
  tokenBudget: TOKEN_BUDGET_STORAGE_KEY,
} as const;

export const SYNCED_STORAGE_KEYS: readonly string[] = [
  FSRS_STORAGE_KEY,
  XP_STORAGE_KEY,
  VERGLEICH_STORAGE_KEY,
  FEEDBACK_STORAGE_KEY,
  PLAN_STORAGE_KEY,
  ONBOARDING_STORAGE_KEY,
  LANG_STORAGE_KEY,
  MASTERY_STORAGE_KEY,
  DAILY_STREAK_STORAGE_KEY,
  INTERLEAVE_STORAGE_KEY,
];

export function allPersistedKeys(): string[] {
  return [...new Set(Object.values(PERSISTED_STORAGE_KEYS))];
}
