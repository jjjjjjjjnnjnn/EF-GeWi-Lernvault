import { useState } from "react";
import { t, type Lang } from "../i18n";
import {
  PROVIDERS,
  getProvider,
  loadAiConfig,
  saveAiConfig,
  engineLabel,
  type AiConfig,
  type AiEngine,
} from "../ai/providers";
import { isWebGpuAvailable, localModelName, resetLocalEngine } from "../ai/engine";
import {
  ensureLocalEmbedder,
  isLocalEmbedderReady,
  resetLocalEmbedder,
} from "../engine/embed";

// KI-Einstellungen: Engine-Umschalter (API | Lokal | Aus) + Provider-Key-Modell.
// Alles liegt in localStorage, nichts im Repo. Anleitung: App-EF-Lernvault/AI-SETUP.md
export default function AiSettings({
  lang,
  onChanged,
}: {
  lang: Lang;
  onChanged?: () => void;
}) {
  const tr = t(lang);
  const [cfg, setCfg] = useState<AiConfig>(() => loadAiConfig());
  const [showKey, setShowKey] = useState(false);
  const [vecPct, setVecPct] = useState<number | null>(null);
  const [vecReady, setVecReady] = useState(() => isLocalEmbedderReady());

  const update = (patch: Partial<AiConfig>) => {
    const next = { ...cfg, ...patch };
    // Providerwechsel füllt Modell-Startwert (nur wenn leer oder alter Default).
    if (patch.providerId && patch.providerId !== cfg.providerId) {
      const oldDef = getProvider(cfg.providerId).defaultModel;
      if (!cfg.model.trim() || cfg.model.trim() === oldDef) {
        next.model = getProvider(patch.providerId).defaultModel;
      }
    }
    setCfg(next);
    saveAiConfig(next);
    onChanged?.();
  };

  const engines: AiEngine[] = ["api", "local", "off"];

  return (
    <div className="border-b border-[#E5E1D8] bg-[#FAF9F6] px-4 py-3">
      {/* Engine-Umschalter */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="font-mono text-[11px] uppercase tracking-wider text-[#6B675C]">
          {lang === "de" ? "KI-Engine" : "AI引擎"}
        </span>
        <div className="flex overflow-hidden rounded-sm border border-[#E5E1D8]" role="group">
          {engines.map((e) => (
            <button
              key={e}
              onClick={() => update({ engine: e })}
              aria-pressed={cfg.engine === e}
              className={`px-3 py-1.5 font-sans text-xs transition-colors duration-150 ${
                cfg.engine === e
                  ? "bg-[#1C1B17] text-[#FAFAF7]"
                  : "bg-white text-[#6B675C] hover:text-[#4338CA]"
              }`}
            >
              {engineLabel(e, lang)}
            </button>
          ))}
        </div>
        {cfg.engine === "local" && (
          <span className="font-mono text-[11px] text-[#6B675C]">
            {localModelName() ?? (isWebGpuAvailable() ? (lang === "de" ? "lädt beim ersten Aufruf (~1–2 GB)" : "首次调用时下载 (~1–2 GB)") : tr.aiNoWebgpu)}
          </span>
        )}
        {(cfg.engine === "local" || localModelName()) && (
          <button
            type="button"
            onClick={() => {
              resetLocalEngine();
              onChanged?.();
            }}
            title={tr.aiLocalReset}
            className="font-mono text-[11px] text-[#6B675C] hover:text-[#4338CA] underline underline-offset-2"
          >
            {tr.aiLocalReset}
          </button>
        )}
      </div>

      {/* API-Details */}
      {cfg.engine === "api" && (
        <div className="mt-3 grid gap-2 sm:grid-cols-2">
          <label className="block">
            <span className="font-sans text-xs text-[#6B675C]">{tr.aiProvider}</span>
            <select
              value={cfg.providerId}
              onChange={(e) => update({ providerId: e.target.value })}
              className="mt-1 block w-full rounded-sm border border-[#E5E1D8] bg-white px-2 py-1.5 font-sans text-sm text-[#1C1B17] focus:border-[#4338CA] focus:outline-none"
            >
              {PROVIDERS.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name}{p.free ? ` · ${p.free}` : ""}
                </option>
              ))}
            </select>
          </label>
          <label className="block">
            <span className="font-sans text-xs text-[#6B675C]">{tr.aiModel}</span>
            <input
              value={cfg.model}
              onChange={(e) => update({ model: e.target.value })}
              placeholder={getProvider(cfg.providerId).defaultModel}
              spellCheck={false}
              className="mt-1 block w-full rounded-sm border border-[#E5E1D8] bg-white px-2 py-1.5 font-mono text-xs text-[#1C1B17] focus:border-[#4338CA] focus:outline-none"
            />
          </label>
          <label className="block">
            <span className="font-sans text-xs text-[#6B675C]">{tr.aiEmbedModel}</span>
            <input
              value={cfg.embedModel}
              onChange={(e) => update({ embedModel: e.target.value })}
              placeholder="text-embedding-3-small"
              spellCheck={false}
              className="mt-1 block w-full rounded-sm border border-[#E5E1D8] bg-white px-2 py-1.5 font-mono text-xs text-[#1C1B17] focus:border-[#4338CA] focus:outline-none"
            />
          </label>
          {cfg.providerId === "custom" && (
            <label className="block sm:col-span-2">
              <span className="font-sans text-xs text-[#6B675C]">{tr.aiBaseUrl}</span>
              <input
                value={cfg.baseUrl}
                onChange={(e) => update({ baseUrl: e.target.value })}
                placeholder="https://…/v1"
                spellCheck={false}
                className="mt-1 block w-full rounded-sm border border-[#E5E1D8] bg-white px-2 py-1.5 font-mono text-xs text-[#1C1B17] focus:border-[#4338CA] focus:outline-none"
              />
            </label>
          )}
          {getProvider(cfg.providerId).needsKey && (
            <label className="block sm:col-span-2">
              <span className="font-sans text-xs text-[#6B675C]">{tr.aiApiKey}</span>
              <span className="flex gap-2">
                <input
                  type={showKey ? "text" : "password"}
                  value={cfg.apiKey}
                  onChange={(e) => update({ apiKey: e.target.value })}
                  placeholder="sk-…"
                  spellCheck={false}
                  autoComplete="off"
                  className="mt-1 block w-full rounded-sm border border-[#E5E1D8] bg-white px-2 py-1.5 font-mono text-xs text-[#1C1B17] focus:border-[#4338CA] focus:outline-none"
                />
                <button
                  onClick={() => setShowKey((s) => !s)}
                  className="mt-1 shrink-0 rounded-sm border border-[#E5E1D8] px-2 font-mono text-[11px] text-[#6B675C] hover:text-[#4338CA]"
                >
                  {showKey ? "···" : "abc"}
                </button>
              </span>
            </label>
          )}
          <p className="font-sans text-[11px] leading-relaxed text-[#6B675C] sm:col-span-2">
            {tr.aiManualHint}
            {getProvider(cfg.providerId).keyUrl && (
              <>
                {" · "}
                <a
                  href={getProvider(cfg.providerId).keyUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-[#4338CA] underline underline-offset-2"
                >
                  Key holen →
                </a>
              </>
            )}
          </p>
        </div>
      )}

      {/* Lokale Vektorsuche L1: NIE still laden — nur per knopf (anti-haenger) */}
      <div className="mt-3 grid gap-2 border-t border-[#E5E1D8] pt-3">
        <div className="flex flex-wrap items-center gap-2">
          <span className="font-sans text-xs text-[#6B675C]">{tr.aiVector}</span>
          <select
            value={cfg.vectorMode}
            onChange={(e) => update({ vectorMode: e.target.value as AiConfig["vectorMode"] })}
            className="rounded-sm border border-[#E5E1D8] bg-white px-2 py-1 font-mono text-[11px] text-[#1C1B17] focus:border-[#4338CA] focus:outline-none"
          >
            <option value="off">{tr.aiVectorOff}</option>
            <option value="auto">{tr.aiVectorAuto}</option>
            <option value="on">{tr.aiVectorOn}</option>
          </select>
          <span className="font-mono text-[11px] text-[#6B675C]">
            {vecReady ? tr.aiVectorReady : vecPct !== null ? `${Math.round(vecPct * 100)} %` : tr.aiVectorIdle}
          </span>
        </div>
        <label className="block">
          <span className="font-sans text-xs text-[#6B675C]">{tr.aiMirror}</span>
          <input
            value={cfg.hfMirror}
            onChange={(e) => update({ hfMirror: e.target.value })}
            placeholder="https://hf-mirror.com"
            spellCheck={false}
            className="mt-1 block w-full rounded-sm border border-[#E5E1D8] bg-white px-2 py-1.5 font-mono text-xs text-[#1C1B17] focus:border-[#4338CA] focus:outline-none"
          />
        </label>
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            disabled={vecPct !== null || vecReady}
            onClick={() => {
              setVecPct(0);
              void ensureLocalEmbedder((p) => setVecPct(p))
                .then(() => {
                  setVecReady(true);
                  setVecPct(null);
                  onChanged?.();
                })
                .catch(() => setVecPct(null));
            }}
            className="rounded-sm border border-[#E5E1D8] bg-white px-3 py-1.5 font-sans text-xs text-[#1C1B17] hover:border-[#4338CA] hover:text-[#4338CA] active:scale-95 transition-all disabled:opacity-50"
          >
            {tr.aiVectorLoad}
          </button>
          {vecReady && (
            <button
              type="button"
              onClick={() => {
                resetLocalEmbedder();
                setVecReady(false);
                onChanged?.();
              }}
              className="font-mono text-[11px] text-[#6B675C] hover:text-[#4338CA] underline underline-offset-2"
            >
              {tr.aiLocalReset}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
