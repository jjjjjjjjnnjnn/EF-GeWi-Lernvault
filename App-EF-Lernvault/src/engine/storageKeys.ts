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

export const STORAGE_SYNC_POLICY = {
  learningProgress: "sync",
  credentials: "local-only",
  syncConfiguration: "local-only",
  deviceLocalAccounting: "local-only",
} as const;

export type StorageSyncDecision = (typeof STORAGE_SYNC_POLICY)[keyof typeof STORAGE_SYNC_POLICY];

export interface StorageSyncPolicyEntry {
  readonly key: string;
  readonly decision: StorageSyncDecision;
  readonly reason: string;
}

export const SYNC_STORAGE_ALLOWLIST = [
  {
    key: PERSISTED_STORAGE_KEYS.fsrs,
    decision: "sync",
    reason: "Card scheduling is learning progress and should follow the learner across devices.",
  },
  {
    key: PERSISTED_STORAGE_KEYS.xp,
    decision: "sync",
    reason: "Experience points and streak are learning progress and should follow the learner across devices.",
  },
  {
    key: PERSISTED_STORAGE_KEYS.vergleich,
    decision: "sync",
    reason: "Comparison notes are learner study state and belong with the learner's cross-device progress.",
  },
  {
    key: PERSISTED_STORAGE_KEYS.feedback,
    decision: "sync",
    reason: "Feedback is part of the learner's study record and belongs with cross-device progress.",
  },
  {
    key: PERSISTED_STORAGE_KEYS.plan,
    decision: "sync",
    reason: "The learning plan and its completion state are cross-device study progress.",
  },
  {
    key: PERSISTED_STORAGE_KEYS.onboarding,
    decision: "sync",
    reason: "Onboarding progress is study progress and should follow the learner across devices.",
  },
  {
    key: PERSISTED_STORAGE_KEYS.language,
    decision: "sync",
    reason: "The UI language is a non-sensitive study preference and should follow the learner across devices.",
  },
  {
    key: PERSISTED_STORAGE_KEYS.mastery,
    decision: "sync",
    reason: "BKT mastery is learning progress and should follow the learner across devices.",
  },
  {
    key: PERSISTED_STORAGE_KEYS.dailyStreak,
    decision: "sync",
    reason: "The daily sprint streak is learning progress, not provider or device accounting.",
  },
  {
    key: PERSISTED_STORAGE_KEYS.interleave,
    decision: "sync",
    reason: "Interleaving settings are study preferences that belong with the learner's study setup.",
  },
  {
    key: PERSISTED_STORAGE_KEYS.tutorPedagogyMode,
    decision: "sync",
    reason: "The pedagogy mode is a study preference and should follow the learner across devices.",
  },
  {
    key: PERSISTED_STORAGE_KEYS.thinkingIntensity,
    decision: "sync",
    reason: "Thinking intensity is a study preference and should follow the learner across devices.",
  },
] as const satisfies readonly StorageSyncPolicyEntry[];

export const LOCAL_ONLY_STORAGE_POLICIES = [
  {
    key: PERSISTED_STORAGE_KEYS.sync,
    decision: "local-only",
    reason: "Sync configuration contains the endpoint and bearer token and must never be uploaded.",
  },
  {
    key: PERSISTED_STORAGE_KEYS.aiConfig,
    decision: "local-only",
    reason: "AI provider configuration may contain credentials or sensitive provider settings.",
  },
  {
    key: PERSISTED_STORAGE_KEYS.aiEndpoints,
    decision: "local-only",
    reason: "AI endpoint configuration may contain credentials or sensitive endpoint settings.",
  },
  {
    key: PERSISTED_STORAGE_KEYS.activeAiEndpoint,
    decision: "local-only",
    reason: "The active AI endpoint is device-local provider configuration and must not leave the device.",
  },
  {
    key: PERSISTED_STORAGE_KEYS.fallbackAiEndpoint,
    decision: "local-only",
    reason: "The fallback AI endpoint is device-local provider configuration and must not leave the device.",
  },
  {
    key: PERSISTED_STORAGE_KEYS.tokenLedger,
    decision: "local-only",
    reason: "The token ledger is device or provider usage accounting, not learning progress.",
  },
  {
    key: PERSISTED_STORAGE_KEYS.tokenBudget,
    decision: "local-only",
    reason: "The token budget is local AI resource accounting, not learning progress.",
  },
] as const satisfies readonly StorageSyncPolicyEntry[];

export const STORAGE_SYNC_POLICIES = [
  ...SYNC_STORAGE_ALLOWLIST,
  ...LOCAL_ONLY_STORAGE_POLICIES,
] as const satisfies readonly StorageSyncPolicyEntry[];

export const SYNCED_STORAGE_KEYS = SYNC_STORAGE_ALLOWLIST.map(({ key }) => key);
export const LOCAL_ONLY_STORAGE_KEYS = LOCAL_ONLY_STORAGE_POLICIES.map(({ key }) => key);

export function allPersistedKeys(): string[] {
  return [...new Set(Object.values(PERSISTED_STORAGE_KEYS))];
}
