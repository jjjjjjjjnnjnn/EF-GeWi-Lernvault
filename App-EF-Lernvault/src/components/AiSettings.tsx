import { useState, useEffect } from "react";
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
  probeAiConnection,
  pullModelList,
  subscribeHeartbeat,
  getLastProbe,
  type ProbeResult,
  type ModelPullResult,
} from "../ai/heartbeat";
import {
  ensureLocalEmbedder,
  isLocalEmbedderReady,
  resetLocalEmbedder,
} from "../engine/embed";
import { applyQuickPreset } from "../ai/autoDispatch";

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
  const [probe, setProbe] = useState<ProbeResult>(() => getLastProbe());
  // ccswitch-stil: manueller modell-pull (volle /models-liste, klick-uebernahme)
  const [pulling, setPulling] = useState(false);
  const [showAllModels, setShowAllModels] = useState(false);
  const [pulled, setPulled] = useState<ModelPullResult | null>(null);

  const pullModels = () => {
    if (pulling) return;
    setPulling(true);
    setShowAllModels(true);
    const base = cfg.baseUrl.trim() || getProvider(cfg.providerId).baseUrl;
    void pullModelList(base, cfg.apiKey, 8000)
      .then((r) => {
        setPulled(r);
        if (r.models.length > 0) setShowAllModels(true);
        void probeAiConnection(); // status-pill synchron halten
      })
      .finally(() => setPulling(false));
  };

  const pullErrorText = (e: string): string => {
    if (e === "CORS_BLOCK")
      return lang === "de"
        ? "Browser blockt Direktzugriff (CORS). Läuft WebUI ohne Proxy? Einmal neu starten (.\\scripts\\webui.ps1) — dann zieht der lokale Proxy."
        : "浏览器拦截了直连（CORS）。WebUI是旧进程？重启一次（.\\scripts\\webui.ps1），本地代理就会接管拉取。";
    return e;
  };

  // Anzeige-liste: frischer pull schlaegt heartbeat-chips
  const listModels = pulled && (pulled.models.length > 0 || pulled.error) ? pulled.models : probe.detectedModels;

  useEffect(() => {
    const unsub = subscribeHeartbeat(setProbe);
    probeAiConnection();
    setPulled(null); // endpoint/key-wechsel -> alte pull-liste ungültig
    return unsub;
  }, [cfg.engine, cfg.providerId, cfg.baseUrl, cfg.apiKey]);

  const update = (patch: Partial<AiConfig>) => {
    const next = { ...cfg, ...patch };
    // Providerwechsel füllt Modell-Startwert (nur wenn leer oder alter Default).
    if (patch.providerId && patch.providerId !== cfg.providerId) {
      const oldDef = getProvider(cfg.providerId).defaultModel;
      if (!cfg.model.trim() || cfg.model.trim() === oldDef) {
        next.model = getProvider(patch.providerId).defaultModel;
      }
      // Base-URL-override nicht verschleppen (ausser custom bleibt custom).
      if (patch.providerId !== "custom") next.baseUrl = "";
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
        {/* Heartbeat Status */}
        {cfg.engine !== "off" && (
          <div className="flex items-center gap-1.5 ml-1">
            {probe.status === "online" && (
              <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[11px] font-mono bg-[#EBF5EE] text-[#2E7D32] border border-[#C8E6C9]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#2E7D32]"></span>
                {probe.latencyMs}ms · Online
              </span>
            )}
            {probe.status === "offline" && (
              <span
                className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[11px] font-mono bg-[#FDEDEC] text-[#C62828] border border-[#FFCDD2]"
                title={probe.error || "Offline"}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#C62828]"></span>
                {lang === "de" ? "Nicht erreichbar" : "不可达"}
              </span>
            )}
            {probe.status === "checking" && (
              <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[11px] font-mono bg-[#F4F4F2] text-[#6B675C] border border-[#E5E1D8]">
                Ping...
              </span>
            )}
            <button
              type="button"
              onClick={() => probeAiConnection()}
              className="text-[10px] font-mono underline text-[#6B675C] hover:text-[#1C1B17] px-1"
              title="Verbindung prüfen"
            >
              Ping
            </button>
          </div>
        )}
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

      {/* Ein-Klick-Schnellkonfigurationen */}
      <div className="mt-2.5 flex flex-wrap items-center gap-1.5 pt-2 border-t border-[#E5E1D8]/60">
        <span className="font-mono text-[10px] uppercase tracking-wider text-[#6B675C]">
          {lang === "de" ? "Schnellprofile" : "一键配置"}:
        </span>
        <button
          type="button"
          onClick={() => {
            const next = applyQuickPreset("local-fast");
            setCfg(next);
            onChanged?.();
          }}
          className="rounded-xs border border-[#E5E1D8] bg-white px-2 py-0.5 font-mono text-[11px] text-[#1C1B17] hover:border-[#4338CA] hover:text-[#4338CA] transition-colors"
          title="LM Studio / Ollama (Port 1234), 极速模式"
        >
          ⚡ {lang === "de" ? "Lokal-Schnell (1234)" : "本地极速 (1234)"}
        </button>
        <button
          type="button"
          onClick={() => {
            const next = applyQuickPreset("deep-study");
            setCfg(next);
            onChanged?.();
          }}
          className="rounded-xs border border-[#E5E1D8] bg-white px-2 py-0.5 font-mono text-[11px] text-[#1C1B17] hover:border-[#4338CA] hover:text-[#4338CA] transition-colors"
          title="深度考点多维解析模式"
        >
          🧠 {lang === "de" ? "Tiefen-Analyse" : "深度考点解析"}
        </button>
        <button
          type="button"
          onClick={() => {
            const next = applyQuickPreset("cloud-free-fast");
            setCfg(next);
            onChanged?.();
          }}
          className="rounded-xs border border-[#E5E1D8] bg-white px-2 py-0.5 font-mono text-[11px] text-[#1C1B17] hover:border-[#4338CA] hover:text-[#4338CA] transition-colors"
          title="SiliconFlow Qwen3-8B 永久免费极速"
        >
          🌐 {lang === "de" ? "Cloud-Free (Qwen3)" : "免密云端 (Qwen3)"}
        </button>
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
            {listModels.length > 0 && (
              <div className="mt-1 flex flex-wrap items-center gap-1">
                <span className="font-mono text-[10px] text-[#6B675C]">
                  {lang === "de" ? "Erkannt:" : "发现:"}
                </span>
                {(showAllModels ? listModels : listModels.slice(0, 3)).map((mName) => (
                  <button
                    key={mName}
                    type="button"
                    onClick={() => update({ model: mName })}
                    className="font-mono text-[10px] bg-[#ECE7DC]/70 hover:bg-[#4338CA]/10 hover:text-[#4338CA] px-1.5 py-0.5 rounded-xs"
                    title={mName}
                  >
                    {mName.split("/").pop()}
                  </button>
                ))}
              </div>
            )}
            {showAllModels && listModels.length > 8 && (
              <p className="mt-0.5 font-mono text-[10px] text-[#6B675C]">
                {listModels.length} {lang === "de" ? "Modelle (klicken übernimmt)" : "个模型（点选即用）"}
                {pulled && pulled.models.length > 0 && (pulled.via === "proxy" ? (lang === "de" ? " · via lokal-proxy" : " · 经本地代理") : "")}
              </p>
            )}
            <div className="mt-1 flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={pullModels}
                disabled={pulling}
                className="rounded-xs border border-[#E5E1D8] bg-white px-2 py-0.5 font-mono text-[11px] text-[#1C1B17] hover:border-[#4338CA] hover:text-[#4338CA] transition-colors disabled:opacity-50"
                title={lang === "de" ? "GET {base}/models (8s-Timeout, Key wird mitgesendet)" : "请求 {base}/models（8秒超时，自动带Key）"}
              >
                {pulling
                  ? (lang === "de" ? "Rufe ab …" : "拉取中…")
                  : (lang === "de" ? "⇩ Modelle abrufen" : "⇩ 拉取模型列表")}
              </button>
              {pulled?.error ? (
                <span className="font-mono text-[10px] text-[#C62828]" title={pulled.error}>
                  {lang === "de" ? "Abruf fehlgeschlagen: " : "拉取失败："}
                  {pullErrorText(pulled.error).length > 90 ? `${pullErrorText(pulled.error).slice(0, 90)}…` : pullErrorText(pulled.error)}
                </span>
              ) : probe.status === "offline" && probe.error ? (
                <span className="font-mono text-[10px] text-[#C62828]" title={probe.error}>
                  {lang === "de" ? "Abruf fehlgeschlagen: " : "拉取失败："}
                  {probe.error.length > 60 ? `${probe.error.slice(0, 60)}…` : probe.error}
                </span>
              ) : null}
              {probe.status === "online" && probe.detectedModels.length === 0 && (
                <span className="font-mono text-[10px] text-[#6B675C]">
                  {lang === "de" ? "Online, aber /models leer (Modellname von Hand eintragen)" : "已连通但/models为空（请手填模型名）"}
                </span>
              )}
            </div>
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
          {cfg.providerId === "custom" ? (
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
          ) : (
            <label className="block sm:col-span-2">
              <span className="font-sans text-xs text-[#6B675C]">
                {lang === "de" ? "Base-URL-Override (leer = Preset)" : "Base-URL改写（空=用预设）"}
              </span>
              <input
                value={cfg.baseUrl}
                onChange={(e) => update({ baseUrl: e.target.value })}
                placeholder={getProvider(cfg.providerId).baseUrl}
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
