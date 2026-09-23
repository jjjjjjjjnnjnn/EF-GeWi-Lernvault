import { useState, useEffect } from "react";
import { t, type Lang } from "../i18n";
import {
  loadAiConfig,
  saveAiConfig,
  engineLabel,
  type AiConfig,
  type AiEngine,
} from "../ai/providers";
import {
  loadEndpoints,
  getActiveEndpointId,
  setActiveEndpointId,
  getActiveEndpoint,
  getFallbackEndpointId,
  setFallbackEndpointId,
  addEndpoint,
  updateEndpoint,
  deleteEndpoint,
  pingEndpoint,
  testEndpointChat,
  type AiEndpoint,
  type EndpointTestResult,
} from "../ai/endpoints";
import {
  getTokenSummary,
  getTokenLedger,
  loadTokenBudget,
  saveTokenBudget,
  checkTokenBudget,
  clearTokenLedger,
  type TokenSummary,
  type TokenRecord,
} from "../ai/tokenLedger";
import { pullModelList } from "../ai/heartbeat";
import {
  ensureLocalEmbedder,
  isLocalEmbedderReady,
  resetLocalEmbedder,
} from "../engine/embed";

type TabId = "simple" | "endpoints" | "tokens" | "advanced";

export default function AiSettings({
  lang,
  onChanged,
}: {
  lang: Lang;
  onChanged?: () => void;
}) {
  const tr = t(lang);
  const [tab, setTab] = useState<TabId>("simple");

  // 端点状态
  const [endpoints, setEndpoints] = useState<AiEndpoint[]>(() => loadEndpoints());
  const [activeEpId, setActiveEpId] = useState<string>(() => getActiveEndpointId());
  const [fallbackEpId, setFallbackEpIdState] = useState<string | null>(() => getFallbackEndpointId());

  // 引擎总配置
  const [cfg, setCfg] = useState<AiConfig>(() => loadAiConfig());

  // Token 状态
  const [tokenSummary, setTokenSummary] = useState<TokenSummary>(() => getTokenSummary());
  const [recentRecords, setRecentRecords] = useState<TokenRecord[]>(() => getTokenLedger().slice(0, 8));
  const [budgetLimit, setBudgetLimit] = useState<number>(() => loadTokenBudget());
  const [budgetStatus, setBudgetStatus] = useState(() => checkTokenBudget());

  // 新增/编辑端点抽屉弹窗
  const [editingEp, setEditingEp] = useState<AiEndpoint | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [formName, setFormName] = useState("");
  const [formBaseUrl, setFormBaseUrl] = useState("");
  const [formApiKey, setFormApiKey] = useState("");
  const [formModel, setFormModel] = useState("");

  // 测速状态
  const [pingingAll, setPingingAll] = useState(false);

  // 高级向量状态
  const [vecPct, setVecPct] = useState<number | null>(null);
  const [vecReady, setVecReady] = useState(() => isLocalEmbedderReady());

  // 模型拉取状态
  const [pullingEpId, setPullingEpId] = useState<string | null>(null);
  const [pulledModelsMap, setPulledModelsMap] = useState<Record<string, string[]>>({});

  // 实时测试与诊断状态
  const [testingEpId, setTestingEpId] = useState<string | null>(null);
  const [testResultMap, setTestResultMap] = useState<Record<string, EndpointTestResult>>({});

  // 刷新 Token 统计
  const refreshTokens = () => {
    setTokenSummary(getTokenSummary());
    setRecentRecords(getTokenLedger().slice(0, 8));
    setBudgetStatus(checkTokenBudget());
  };

  // 单端点连通性测试 (Ping)
  const handleTestPing = async (ep: AiEndpoint) => {
    if (testingEpId) return;
    setTestingEpId(ep.id);
    try {
      const res = await pingEndpoint(ep, 4000);
      updateEndpoint(ep.id, {
        status: res.status,
        latencyMs: res.latencyMs,
        lastChecked: Date.now(),
      });
      setEndpoints(loadEndpoints());
      setTestResultMap((prev) => ({
        ...prev,
        [ep.id]: {
          ok: res.status === "online",
          latencyMs: res.latencyMs,
          errorMessage: res.error,
          remedyTip: res.status === "offline"
            ? (ep.baseUrl.includes("1234")
                ? (lang === "de"
                    ? "LM Studio: Bitte Server starten (Port 1234) & 'Enable CORS' aktivieren."
                    : "LM Studio 用户：请确认 Local Server 已启动（端口 1234），且已勾选「Enable CORS」！")
                : (lang === "de" ? "Dienst offline oder nicht erreichbar." : "服务未启动或网络端口不可达。"))
            : undefined,
        },
      }));
    } finally {
      setTestingEpId(null);
    }
  };

  // 深度应用内对话探针测试 (Chat Probe)
  const handleTestChatProbe = async (ep: AiEndpoint) => {
    if (testingEpId) return;
    setTestingEpId(ep.id);
    try {
      const prompt = lang === "de"
        ? "Hallo! Bestätige bitte kurz deine Bereitschaft für EF-Lernvault."
        : "你好！请简短确认你可以正常协助高中 EF 备考。";
      const res = await testEndpointChat(ep, prompt, 6000);
      updateEndpoint(ep.id, {
        status: res.ok ? "online" : "offline",
        latencyMs: res.latencyMs,
        lastChecked: Date.now(),
        lastTestResult: res,
      });
      setEndpoints(loadEndpoints());
      setTestResultMap((prev) => ({
        ...prev,
        [ep.id]: res,
      }));
    } finally {
      setTestingEpId(null);
    }
  };

  useEffect(() => {
    refreshTokens();
  }, [tab]);

  // 切换活跃端点
  const handleSelectActive = (id: string) => {
    setActiveEndpointId(id);
    setActiveEpId(id);
    const target = endpoints.find((e) => e.id === id);
    if (target) {
      const next: AiConfig = {
        ...cfg,
        engine: "api",
        providerId: target.providerId,
        baseUrl: target.baseUrl,
        apiKey: target.apiKey,
        model: target.model,
      };
      setCfg(next);
      saveAiConfig(next);
    }
    onChanged?.();
  };

  // 切换备用端点
  const handleSelectFallback = (id: string | null) => {
    setFallbackEndpointId(id);
    setFallbackEpIdState(id);
    onChanged?.();
  };

  // 全量端点测速
  const handlePingAll = async () => {
    if (pingingAll) return;
    setPingingAll(true);
    const updated = [...endpoints];
    for (let i = 0; i < updated.length; i++) {
      const ep = updated[i];
      const res = await pingEndpoint(ep, 3500);
      updated[i] = {
        ...ep,
        status: res.status,
        latencyMs: res.latencyMs,
        lastChecked: Date.now(),
      };
      setEndpoints([...updated]);
    }
    setPingingAll(false);
  };

  // 拉取指定端点的模型列表
  const handlePullModelsForEp = async (ep: AiEndpoint) => {
    if (pullingEpId) return;
    setPullingEpId(ep.id);
    try {
      const res = await pullModelList(ep.baseUrl, ep.apiKey, 6000);
      if (res.models.length > 0) {
        setPulledModelsMap((prev) => ({ ...prev, [ep.id]: res.models }));
      }
    } finally {
      setPullingEpId(null);
    }
  };

  // 保存新增/编辑自定义端点
  const handleSaveEndpointForm = () => {
    if (!formName.trim() || !formBaseUrl.trim()) return;

    if (isAdding) {
      const created = addEndpoint({
        name: formName.trim(),
        providerId: "custom",
        baseUrl: formBaseUrl.trim(),
        apiKey: formApiKey.trim(),
        model: formModel.trim() || "gpt-4o-mini",
        enabled: true,
      });
      setEndpoints(loadEndpoints());
      handleSelectActive(created.id);
    } else if (editingEp) {
      updateEndpoint(editingEp.id, {
        name: formName.trim(),
        baseUrl: formBaseUrl.trim(),
        apiKey: formApiKey.trim(),
        model: formModel.trim(),
      });
      setEndpoints(loadEndpoints());
      if (activeEpId === editingEp.id) {
        handleSelectActive(editingEp.id);
      }
    }

    setIsAdding(false);
    setEditingEp(null);
  };

  // 删除端点
  const handleDeleteEp = (id: string) => {
    const confirmMsg =
      lang === "de"
        ? "Diesen Endpunkt wirklich löschen?"
        : "确认删除该自定义端点吗？";
    if (!window.confirm(confirmMsg)) return;

    deleteEndpoint(id);
    setEndpoints(loadEndpoints());
    setActiveEpId(getActiveEndpointId());
    onChanged?.();
  };

  // 极简预设卡片激活
  const handleQuickActivate = (type: "vault" | "lmstudio" | "deepseek" | "siliconflow") => {
    if (type === "vault") {
      const next: AiConfig = { ...cfg, engine: "off" };
      setCfg(next);
      saveAiConfig(next);
      onChanged?.();
      return;
    }

    let targetId = "ep-lmstudio";
    if (type === "deepseek") targetId = "ep-deepseek";
    if (type === "siliconflow") targetId = "ep-siliconflow";

    handleSelectActive(targetId);
  };

  const activeEndpoint = getActiveEndpoint();

  return (
    <div className="border-b border-[#E5E1D8] bg-[#FAF9F6]">
      {/* 顶部状态与 Tab 导航条 */}
      <div className="flex flex-wrap items-center justify-between border-b border-[#E5E1D8] px-4 py-2.5 bg-white">
        <div className="flex items-center gap-2">
          <span className="font-mono text-[11px] uppercase tracking-wider text-[#6B675C]">
            {lang === "de" ? "Aktiver Endpunkt" : "当前活跃端点"}:
          </span>
          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-xs text-[11px] font-mono bg-[#FAFAF7] border border-[#E5E1D8] text-[#1C1B17]">
            <span
              className={`w-1.5 h-1.5 rounded-full ${
                cfg.engine === "off"
                  ? "bg-[#6B675C]"
                  : activeEndpoint.status === "online"
                  ? "bg-[#2E7D32]"
                  : activeEndpoint.status === "offline"
                  ? "bg-[#C62828]"
                  : "bg-[#D97706]"
              }`}
            />
            {cfg.engine === "off" ? (lang === "de" ? "Aus (Offline)" : "关闭 (离线)") : activeEndpoint.name}
            {activeEndpoint.latencyMs !== undefined && activeEndpoint.latencyMs !== null && (
              <span className="text-[#6B675C]">({activeEndpoint.latencyMs}ms)</span>
            )}
          </span>
        </div>

        {/* Tab 切换 */}
        <div className="flex items-center gap-1">
          {(
            [
              { id: "simple", labelDE: "Empfohlen", labelZH: "极简推荐" },
              { id: "endpoints", labelDE: "Routing & Endpunkte", labelZH: "端点与路由" },
              { id: "tokens", labelDE: "Token-Ledger", labelZH: "Token 看板" },
              { id: "advanced", labelDE: "Erweitert", labelZH: "高级检索" },
            ] as { id: TabId; labelDE: string; labelZH: string }[]
          ).map((tItem) => (
            <button
              key={tItem.id}
              onClick={() => setTab(tItem.id)}
              className={`px-2.5 py-1 text-xs font-sans rounded-xs transition-colors cursor-pointer ${
                tab === tItem.id
                  ? "bg-[#1C1B17] text-[#FAFAF7] font-medium"
                  : "text-[#6B675C] hover:text-[#1C1B17] hover:bg-[#FAF9F6]"
              }`}
            >
              {lang === "de" ? tItem.labelDE : tItem.labelZH}
            </button>
          ))}
        </div>
      </div>

      <div className="p-4">
        {/* ==================== TAB 1: 极简推荐 (Simple Mode) ==================== */}
        {tab === "simple" && (
          <div className="space-y-4">
            <p className="font-sans text-xs text-[#6B675C]">
              {lang === "de"
                ? "Wähle eine der drei empfohlenen Routen für Klausur-Vorbereitung und Prüfungssimulation:"
                : "为高中复习与模考选择最合适的运行路线（一键切换，免复杂配置）："}
            </p>

            <div className="grid gap-3 sm:grid-cols-3">
              {/* 卡片 1: 离线原生 */}
              <div
                className={`flex flex-col justify-between rounded-sm border p-3.5 transition-all ${
                  cfg.engine === "off"
                    ? "border-[#4338CA] bg-white shadow-xs ring-1 ring-[#4338CA]/20"
                    : "border-[#E5E1D8] bg-white hover:border-[#6B675C]"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="font-mono text-xs font-semibold text-[#1C1B17]">
                      {lang === "de" ? "Vault-Nativ" : "知识库原生"}
                    </span>
                    <span className="text-[10px] font-mono px-1.5 py-0.2 rounded-xs bg-[#E5E1D8]/50 text-[#6B675C]">
                      {lang === "de" ? "100% Offline" : "完全离线"}
                    </span>
                  </div>
                  <p className="font-sans text-xs text-[#6B675C] leading-relaxed">
                    {lang === "de"
                      ? "Kein Modell erforderlich. Antworten & Aufgaben werden direkt aus den 38 Vault-Notizen extrahiert."
                      : "零配置、零费用。回答与试题直接从本地 38 篇考纲笔记中精确提炼，绝不漂移。"}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => handleQuickActivate("vault")}
                  className={`mt-3 w-full py-1.5 text-xs font-sans rounded-xs transition-colors cursor-pointer ${
                    cfg.engine === "off"
                      ? "bg-[#4338CA] text-white"
                      : "border border-[#E5E1D8] text-[#1C1B17] hover:bg-[#FAF9F6]"
                  }`}
                >
                  {cfg.engine === "off"
                    ? lang === "de" ? "✓ Aktiv" : "✓ 正在使用"
                    : lang === "de" ? "Auswählen" : "选择此路线"}
                </button>
              </div>

              {/* 卡片 2: 本地大模型 */}
              <div
                className={`flex flex-col justify-between rounded-sm border p-3.5 transition-all ${
                  cfg.engine === "api" && (activeEpId === "ep-lmstudio" || activeEpId === "ep-ollama")
                    ? "border-[#4338CA] bg-white shadow-xs ring-1 ring-[#4338CA]/20"
                    : "border-[#E5E1D8] bg-white hover:border-[#6B675C]"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="font-mono text-xs font-semibold text-[#1C1B17]">
                      {lang === "de" ? "LM Studio (Lokal)" : "本机算力 (LM Studio)"}
                    </span>
                    <span className="text-[10px] font-mono px-1.5 py-0.2 rounded-xs bg-[#EBF5EE] text-[#2E7D32]">
                      Port 1234
                    </span>
                  </div>
                  <p className="font-sans text-xs text-[#6B675C] leading-relaxed">
                    {lang === "de"
                      ? "Nutzt deine lokale GPU/CPU. Keine API-Kosten, 100% datenschutzkonform, Port 1234 oder 11434."
                      : "利用本机显卡，免填 Key，数据完全不出机器。支持自由提问与全真模考批改。"}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => handleQuickActivate("lmstudio")}
                  className={`mt-3 w-full py-1.5 text-xs font-sans rounded-xs transition-colors cursor-pointer ${
                    cfg.engine === "api" && (activeEpId === "ep-lmstudio" || activeEpId === "ep-ollama")
                      ? "bg-[#4338CA] text-white"
                      : "border border-[#E5E1D8] text-[#1C1B17] hover:bg-[#FAF9F6]"
                  }`}
                >
                  {cfg.engine === "api" && (activeEpId === "ep-lmstudio" || activeEpId === "ep-ollama")
                    ? lang === "de" ? "✓ Aktiv" : "✓ 正在使用"
                    : lang === "de" ? "Ein-Klick Verbinden" : "一键连接"}
                </button>
              </div>

              {/* 卡片 3: 云端精选 (DeepSeek / SiliconFlow) */}
              <div
                className={`flex flex-col justify-between rounded-sm border p-3.5 transition-all ${
                  cfg.engine === "api" && (activeEpId === "ep-deepseek" || activeEpId === "ep-siliconflow")
                    ? "border-[#4338CA] bg-white shadow-xs ring-1 ring-[#4338CA]/20"
                    : "border-[#E5E1D8] bg-white hover:border-[#6B675C]"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="font-mono text-xs font-semibold text-[#1C1B17]">
                      {lang === "de" ? "DeepSeek / Cloud" : "云端大模型 (DeepSeek)"}
                    </span>
                    <span className="text-[10px] font-mono px-1.5 py-0.2 rounded-xs bg-[#C7D2FE]/40 text-[#4338CA]">
                      {lang === "de" ? "Hohe Präzision" : "深度推理"}
                    </span>
                  </div>
                  <p className="font-sans text-xs text-[#6B675C] leading-relaxed">
                    {lang === "de"
                      ? "DeepSeek V3 / R1 oder SiliconFlow. Höchste logische Schärfe für AFB III Klausurfragen."
                      : "适合复杂的论述题与哲学家观点推演。需配置 API Key，高性价比与超强逻辑。"}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => handleQuickActivate("deepseek")}
                  className={`mt-3 w-full py-1.5 text-xs font-sans rounded-xs transition-colors cursor-pointer ${
                    cfg.engine === "api" && (activeEpId === "ep-deepseek" || activeEpId === "ep-siliconflow")
                      ? "bg-[#4338CA] text-white"
                      : "border border-[#E5E1D8] text-[#1C1B17] hover:bg-[#FAF9F6]"
                  }`}
                >
                  {cfg.engine === "api" && (activeEpId === "ep-deepseek" || activeEpId === "ep-siliconflow")
                    ? lang === "de" ? "✓ Aktiv" : "✓ 正在使用"
                    : lang === "de" ? "Aktivieren & Key prüfen" : "激活并填 Key"}
                </button>
              </div>
            </div>

            {/* 当前活跃端点的状态诊断与快速测试控制台 (不再对 LM Studio / Ollama 隐藏) */}
            {cfg.engine === "api" && (
              <div className="mt-4 rounded-sm border border-[#E5E1D8] bg-[#FAF9F6] p-3.5 space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#E5E1D8]/60 pb-2">
                  <div className="flex items-center gap-2">
                    <span className="font-sans text-xs font-semibold text-[#1C1B17]">
                      {lang === "de" ? "Aktiver Endpunkt:" : "当前主路由端点:"} {activeEndpoint.name}
                    </span>
                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded-xs bg-white border border-[#E5E1D8] text-[#6B675C]">
                      {activeEndpoint.model}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span
                      className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded-xs text-[10px] font-mono ${
                        activeEndpoint.status === "online"
                          ? "bg-[#EBF5EE] text-[#2E7D32]"
                          : activeEndpoint.status === "offline"
                          ? "bg-[#FDEDEC] text-[#C62828]"
                          : "bg-white text-[#6B675C] border border-[#E5E1D8]"
                      }`}
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${
                          activeEndpoint.status === "online"
                            ? "bg-[#2E7D32]"
                            : activeEndpoint.status === "offline"
                            ? "bg-[#C62828]"
                            : "bg-[#6B675C]"
                        }`}
                      />
                      {activeEndpoint.latencyMs
                        ? `${activeEndpoint.latencyMs}ms`
                        : activeEndpoint.status === "online"
                        ? "Online"
                        : activeEndpoint.status === "offline"
                        ? "Offline"
                        : "Untested"}
                    </span>
                  </div>
                </div>

                {/* API Key 输入框 (对于非本地免 Key 端点) */}
                {activeEndpoint.providerId !== "ollama" && (
                  <div>
                    <label className="block text-xs font-sans text-[#6B675C] mb-1">
                      API Key:
                    </label>
                    <input
                      type="password"
                      value={activeEndpoint.apiKey}
                      onChange={(e) => {
                        updateEndpoint(activeEndpoint.id, { apiKey: e.target.value });
                        setEndpoints(loadEndpoints());
                        updateLegacyCfg({ apiKey: e.target.value });
                      }}
                      placeholder="sk-..."
                      className="w-full rounded-xs border border-[#E5E1D8] bg-white px-2.5 py-1 text-xs font-mono focus:border-[#4338CA] focus:outline-none"
                    />
                  </div>
                )}

                {/* 连通与对话测试动作按钮 */}
                <div className="flex flex-wrap items-center gap-2 pt-1">
                  <button
                    type="button"
                    onClick={() => handleTestPing(activeEndpoint)}
                    disabled={testingEpId === activeEndpoint.id}
                    className="inline-flex items-center rounded-xs border border-[#E5E1D8] bg-white px-3 py-1 text-xs font-sans text-[#1C1B17] hover:border-[#4338CA] hover:text-[#4338CA] disabled:opacity-50 cursor-pointer transition-colors"
                  >
                    {testingEpId === activeEndpoint.id ? (
                      <>
                        <svg className="animate-spin -ml-0.5 mr-1.5 h-3 w-3 text-[#4338CA]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        {lang === "de" ? "Teste Ping..." : "测试连接中..."}
                      </>
                    ) : (
                      lang === "de" ? "⚡ Ping testen" : "⚡ 测试连接"
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() => handleTestChatProbe(activeEndpoint)}
                    disabled={testingEpId === activeEndpoint.id}
                    className="inline-flex items-center rounded-xs border border-[#4338CA] bg-white px-3 py-1 text-xs font-sans text-[#4338CA] hover:bg-[#4338CA] hover:text-white disabled:opacity-50 cursor-pointer transition-colors"
                  >
                    {testingEpId === activeEndpoint.id ? (
                      <>
                        <svg className="animate-spin -ml-0.5 mr-1.5 h-3 w-3 text-[#4338CA]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        {lang === "de" ? "Sende Testnachricht..." : "发送探针中..."}
                      </>
                    ) : (
                      lang === "de" ? "💬 In-App Test-Dialog" : "💬 实时对话探针"
                    )}
                  </button>

                  <span className="text-[11px] font-mono text-[#6B675C]">
                    {lang === "de"
                      ? "Verbindet direkt im App-Fenster ohne externe Tools."
                      : "完全在应用内部调用，无需切换到外部软件。"}
                  </span>
                </div>

                {/* 实时诊断反馈面板 */}
                {testResultMap[activeEndpoint.id] && (
                  <div
                    className={`rounded-xs border p-2.5 text-xs font-mono leading-relaxed transition-all ${
                      testResultMap[activeEndpoint.id].ok
                        ? "border-[#A7F3D0] bg-[#ECFDF5] text-[#065F46]"
                        : "border-[#FECACA] bg-[#FEF2F2] text-[#991B1B]"
                    }`}
                  >
                    <div className="flex items-center justify-between font-semibold mb-1">
                      <span>
                        {testResultMap[activeEndpoint.id].ok
                          ? `✓ ${lang === "de" ? "Erfolgreich verbunden" : "连通成功"} (${testResultMap[activeEndpoint.id].latencyMs}ms)`
                          : `✕ ${lang === "de" ? "Verbindung fehlgeschlagen" : "连通失败"} (${testResultMap[activeEndpoint.id].latencyMs}ms)`}
                      </span>
                      {testResultMap[activeEndpoint.id].modelDetected && (
                        <span className="text-[10px] text-[#4338CA] bg-white px-1.5 py-0.5 rounded-xs border border-[#C7D2FE]">
                          {testResultMap[activeEndpoint.id].modelDetected}
                        </span>
                      )}
                    </div>
                    {testResultMap[activeEndpoint.id].replyText && (
                      <p className="mt-1 text-[11px] bg-white/70 p-1.5 rounded-xs text-[#1C1B17]">
                        <span className="font-semibold">{lang === "de" ? "Modell-Antwort: " : "模型回复: "}</span>
                        {testResultMap[activeEndpoint.id].replyText}
                      </p>
                    )}
                    {testResultMap[activeEndpoint.id].errorMessage && (
                      <p className="mt-1 text-[11px] text-[#991B1B]">
                        {testResultMap[activeEndpoint.id].errorMessage}
                      </p>
                    )}
                    {testResultMap[activeEndpoint.id].remedyTip && (
                      <p className="mt-1 text-[10px] text-[#B45309] bg-[#FFFBEB] p-1.5 rounded-xs border border-[#FDE68A]">
                        <span className="font-semibold">{lang === "de" ? "Hinweis: " : "排查建议: "}</span>
                        {testResultMap[activeEndpoint.id].remedyTip}
                      </p>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* ==================== TAB 2: 端点与路由管理 (CC-Switch 风格) ==================== */}
        {tab === "endpoints" && (
          <div className="space-y-4">
            {/* 操作控制栏 */}
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#E5E1D8] pb-3">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handlePingAll}
                  disabled={pingingAll}
                  className="rounded-xs border border-[#E5E1D8] bg-white px-2.5 py-1 text-xs font-sans text-[#1C1B17] hover:border-[#4338CA] hover:text-[#4338CA] disabled:opacity-50 transition-colors cursor-pointer"
                >
                  {pingingAll
                    ? lang === "de" ? "Prüfe..." : "测速中..."
                    : lang === "de" ? "⚡ Alle Endpunkte anpingen" : "⚡ 全部测速 (Ping All)"}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsAdding(true);
                    setEditingEp(null);
                    setFormName("");
                    setFormBaseUrl("https://");
                    setFormApiKey("");
                    setFormModel("");
                  }}
                  className="rounded-xs bg-[#1C1B17] text-[#FAFAF7] px-2.5 py-1 text-xs font-sans hover:bg-[#4338CA] transition-colors cursor-pointer"
                >
                  {lang === "de" ? "+ Endpunkt hinzufügen" : "+ 新增端点"}
                </button>
              </div>

              {/* 故障转移备用端点设置 */}
              <div className="flex items-center gap-2 text-xs font-sans">
                <span className="text-[#6B675C]">
                  {lang === "de" ? "Automatischer Fallback-Endpunkt:" : "自动容灾备用端点:"}
                </span>
                <select
                  value={fallbackEpId || ""}
                  onChange={(e) => handleSelectFallback(e.target.value || null)}
                  className="rounded-xs border border-[#E5E1D8] bg-white px-2 py-1 text-xs font-mono focus:border-[#4338CA] focus:outline-none"
                >
                  <option value="">{lang === "de" ? "Keiner (Direkt zu Vault)" : "无 (直接兜底 Vault)"}</option>
                  {endpoints
                    .filter((e) => e.id !== activeEpId)
                    .map((e) => (
                      <option key={e.id} value={e.id}>
                        {e.name} ({e.model})
                      </option>
                    ))}
                </select>
              </div>
            </div>

            {/* 端点卡片列表 (CC-Switch 风格) */}
            <div className="grid gap-2.5 sm:grid-cols-2">
              {endpoints.map((ep) => {
                const isActive = activeEpId === ep.id;
                const isFallback = fallbackEpId === ep.id;
                const pulledList = pulledModelsMap[ep.id] || [];

                return (
                  <div
                    key={ep.id}
                    className={`rounded-sm border p-3 bg-white transition-all flex flex-col justify-between ${
                      isActive
                        ? "border-[#4338CA] ring-1 ring-[#4338CA]/20 shadow-xs"
                        : "border-[#E5E1D8] hover:border-[#6B675C]"
                    }`}
                  >
                    <div>
                      {/* 标题 & 状态药丸 */}
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center gap-1.5">
                          <span className="font-mono text-xs font-semibold text-[#1C1B17]">
                            {ep.name}
                          </span>
                          {ep.isPreset && (
                            <span className="text-[9px] font-mono px-1 py-0.2 rounded-xs bg-[#ECE7DC] text-[#6B675C]">
                              Preset
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-1">
                          {isFallback && (
                            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded-xs bg-[#FEF3C7] text-[#92400E]">
                              Fallback
                            </span>
                          )}
                          <span
                            className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded-xs text-[10px] font-mono ${
                              ep.status === "online"
                                ? "bg-[#EBF5EE] text-[#2E7D32]"
                                : ep.status === "offline"
                                ? "bg-[#FDEDEC] text-[#C62828]"
                                : "bg-[#F4F4F2] text-[#6B675C]"
                            }`}
                          >
                            <span
                              className={`w-1.5 h-1.5 rounded-full ${
                                ep.status === "online"
                                  ? "bg-[#2E7D32]"
                                  : ep.status === "offline"
                                  ? "bg-[#C62828]"
                                  : "bg-[#6B675C]"
                              }`}
                            />
                            {ep.latencyMs ? `${ep.latencyMs}ms` : ep.status === "online" ? "Online" : ep.status === "offline" ? "Offline" : "Ping"}
                          </span>
                        </div>
                      </div>

                      {/* URL & 模型 */}
                      <p className="font-mono text-[11px] text-[#6B675C] truncate mb-1" title={ep.baseUrl}>
                        {ep.baseUrl}
                      </p>
                      <div className="flex items-center gap-1 mb-2">
                        <span className="text-[10px] font-mono text-[#6B675C]">Model:</span>
                        <span className="text-xs font-mono font-medium text-[#1C1B17] bg-[#FAF9F6] px-1.5 py-0.5 rounded-xs border border-[#E5E1D8]">
                          {ep.model}
                        </span>
                        <button
                          type="button"
                          onClick={() => handlePullModelsForEp(ep)}
                          disabled={pullingEpId === ep.id}
                          className="text-[10px] font-mono text-[#4338CA] hover:underline px-1 cursor-pointer"
                        >
                          {pullingEpId === ep.id ? "..." : "⇩ 查模型"}
                        </button>
                      </div>

                      {/* 动态查到的模型下拉推荐 */}
                      {pulledList.length > 0 && (
                        <div className="mb-2 p-1.5 rounded-xs bg-[#FAF9F6] border border-[#E5E1D8] text-[10px] font-mono max-h-24 overflow-y-auto">
                          <span className="text-[#6B675C] block mb-1">选择检测到的模型:</span>
                          <div className="flex flex-wrap gap-1">
                            {pulledList.slice(0, 10).map((mName) => (
                              <button
                                key={mName}
                                type="button"
                                onClick={() => {
                                  updateEndpoint(ep.id, { model: mName });
                                  setEndpoints(loadEndpoints());
                                  if (isActive) updateLegacyCfg({ model: mName });
                                }}
                                className={`px-1.5 py-0.5 rounded-xs border ${
                                  ep.model === mName
                                    ? "bg-[#1C1B17] text-white border-[#1C1B17]"
                                    : "bg-white text-[#1C1B17] border-[#E5E1D8] hover:border-[#4338CA]"
                                }`}
                              >
                                {mName.split("/").pop()}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                      {/* 内嵌诊断反馈卡片 */}
                      {testResultMap[ep.id] && (
                        <div
                          className={`mt-2 rounded-xs border p-2 text-[10px] font-mono leading-relaxed ${
                            testResultMap[ep.id].ok
                              ? "border-[#A7F3D0] bg-[#ECFDF5] text-[#065F46]"
                              : "border-[#FECACA] bg-[#FEF2F2] text-[#991B1B]"
                          }`}
                        >
                          <div className="flex items-center justify-between font-semibold">
                            <span>
                              {testResultMap[ep.id].ok ? "✓ 在线" : "✕ 离线"} ({testResultMap[ep.id].latencyMs}ms)
                            </span>
                            {testResultMap[ep.id].modelDetected && (
                              <span className="text-[#4338CA] truncate max-w-[120px]">
                                {testResultMap[ep.id].modelDetected}
                              </span>
                            )}
                          </div>
                          {testResultMap[ep.id].replyText && (
                            <p className="mt-1 bg-white/70 p-1 rounded-xs text-[#1C1B17] line-clamp-2">
                              {testResultMap[ep.id].replyText}
                            </p>
                          )}
                          {testResultMap[ep.id].errorMessage && (
                            <p className="mt-0.5 text-[#991B1B]">
                              {testResultMap[ep.id].errorMessage}
                            </p>
                          )}
                          {testResultMap[ep.id].remedyTip && (
                            <p className="mt-0.5 text-[#B45309] bg-[#FFFBEB] p-1 rounded-xs border border-[#FDE68A]">
                              {testResultMap[ep.id].remedyTip}
                            </p>
                          )}
                        </div>
                      )}
                    </div>

                    {/* 底部按钮栏 */}
                    <div className="flex items-center justify-between border-t border-[#E5E1D8]/60 pt-2 mt-2">
                      <div className="flex items-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => handleTestPing(ep)}
                          disabled={testingEpId === ep.id}
                          className="text-[11px] font-mono text-[#6B675C] hover:text-[#4338CA] px-1 disabled:opacity-50 cursor-pointer"
                        >
                          {testingEpId === ep.id ? "..." : "⚡ 测试连接"}
                        </button>
                        <button
                          type="button"
                          onClick={() => handleTestChatProbe(ep)}
                          disabled={testingEpId === ep.id}
                          className="text-[11px] font-mono text-[#4338CA] hover:underline px-1 disabled:opacity-50 cursor-pointer"
                        >
                          {testingEpId === ep.id ? "..." : "💬 对话探针"}
                        </button>
                        {!ep.isPreset && (
                          <>
                            <button
                              type="button"
                              onClick={() => {
                                setEditingEp(ep);
                                setIsAdding(false);
                                setFormName(ep.name);
                                setFormBaseUrl(ep.baseUrl);
                                setFormApiKey(ep.apiKey);
                                setFormModel(ep.model);
                              }}
                              className="text-[11px] font-mono text-[#6B675C] hover:text-[#1C1B17] px-1 cursor-pointer"
                            >
                              {lang === "de" ? "Bearbeiten" : "编辑"}
                            </button>
                            <button
                              type="button"
                              onClick={() => handleDeleteEp(ep.id)}
                              className="text-[11px] font-mono text-[#C62828] hover:underline px-1 cursor-pointer"
                            >
                              {lang === "de" ? "Löschen" : "删除"}
                            </button>
                          </>
                        )}
                      </div>

                      {isActive ? (
                        <span className="font-mono text-[11px] font-semibold text-[#4338CA]">
                          ✓ {lang === "de" ? "Aktiviert" : "当前主路由"}
                        </span>
                      ) : (
                        <button
                          type="button"
                          onClick={() => handleSelectActive(ep.id)}
                          className="rounded-xs border border-[#E5E1D8] bg-white px-2 py-0.5 text-xs font-sans hover:border-[#4338CA] hover:text-[#4338CA] cursor-pointer"
                        >
                          {lang === "de" ? "Als Aktiv setzen" : "设为主路由"}
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* 新增/编辑端点抽屉 */}
            {(isAdding || editingEp) && (
              <div className="mt-4 rounded-sm border border-[#4338CA]/30 bg-white p-4 shadow-sm">
                <h4 className="font-mono text-xs font-semibold text-[#1C1B17] mb-3">
                  {isAdding
                    ? lang === "de" ? "Neuen Endpunkt konfigurieren" : "添加自定义端点 (CC-Switch 风格)"
                    : lang === "de" ? `Endpunkt bearbeiten: ${editingEp?.name}` : `编辑端点: ${editingEp?.name}`}
                </h4>
                <div className="grid gap-2.5 sm:grid-cols-2">
                  <div>
                    <label className="block text-xs font-sans text-[#6B675C] mb-1">
                      {lang === "de" ? "Name:" : "端点名称:"}
                    </label>
                    <input
                      value={formName}
                      onChange={(e) => setFormName(e.target.value)}
                      placeholder="z.B. Mein Schul-Relay"
                      className="w-full rounded-xs border border-[#E5E1D8] px-2 py-1.5 text-xs font-sans focus:border-[#4338CA] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-sans text-[#6B675C] mb-1">
                      Base-URL:
                    </label>
                    <input
                      value={formBaseUrl}
                      onChange={(e) => setFormBaseUrl(e.target.value)}
                      placeholder="https://api.openai.com/v1"
                      className="w-full rounded-xs border border-[#E5E1D8] px-2 py-1.5 text-xs font-mono focus:border-[#4338CA] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-sans text-[#6B675C] mb-1">
                      API Key (optional):
                    </label>
                    <input
                      type="password"
                      value={formApiKey}
                      onChange={(e) => setFormApiKey(e.target.value)}
                      placeholder="sk-..."
                      className="w-full rounded-xs border border-[#E5E1D8] px-2 py-1.5 text-xs font-mono focus:border-[#4338CA] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-sans text-[#6B675C] mb-1">
                      {lang === "de" ? "Standard-Modell:" : "默认模型名:"}
                    </label>
                    <input
                      value={formModel}
                      onChange={(e) => setFormModel(e.target.value)}
                      placeholder="gpt-4o-mini / deepseek-chat"
                      className="w-full rounded-xs border border-[#E5E1D8] px-2 py-1.5 text-xs font-mono focus:border-[#4338CA] focus:outline-none"
                    />
                  </div>
                </div>
                <div className="mt-3 flex items-center justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setIsAdding(false);
                      setEditingEp(null);
                    }}
                    className="rounded-xs border border-[#E5E1D8] px-3 py-1 text-xs font-sans text-[#6B675C] hover:text-[#1C1B17] cursor-pointer"
                  >
                    {lang === "de" ? "Abbrechen" : "取消"}
                  </button>
                  <button
                    type="button"
                    onClick={handleSaveEndpointForm}
                    className="rounded-xs bg-[#1C1B17] text-white px-4 py-1 text-xs font-sans hover:bg-[#4338CA] cursor-pointer"
                  >
                    {lang === "de" ? "Speichern" : "保存端点"}
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ==================== TAB 3: Token 看板 (Token Ledger) ==================== */}
        {tab === "tokens" && (
          <div className="space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#E5E1D8] pb-2">
              <span className="font-sans text-xs text-[#6B675C]">
                {lang === "de"
                  ? "Transparente Token-Statistiken aller Tutor- und Prüfungssitzungen:"
                  : "透明记录所有 AI 提问、模考批改中的 Token 实际消耗与算法节约："}
              </span>
              <button
                type="button"
                onClick={() => {
                  if (window.confirm(lang === "de" ? "Token-Historie leeren?" : "确认重置清空 Token 历史账本？")) {
                    clearTokenLedger();
                    refreshTokens();
                  }
                }}
                className="text-[11px] font-mono text-[#C62828] hover:underline cursor-pointer"
              >
                {lang === "de" ? "Historie leeren" : "清空统计账本"}
              </button>
            </div>

            {/* 核心指标卡 (Tufte 风格) */}
            <div className="grid gap-3 sm:grid-cols-4">
              <div className="rounded-sm border border-[#E5E1D8] bg-white p-3">
                <span className="font-mono text-[10px] uppercase tracking-wider text-[#6B675C] block mb-1">
                  {lang === "de" ? "Heute Verbraucht" : "今日消耗"}
                </span>
                <span className="font-mono text-lg font-bold text-[#1C1B17]">
                  {tokenSummary.todayTotal.toLocaleString()}
                </span>
                <div className="mt-2 w-full bg-[#FAF9F6] h-1.5 rounded-full overflow-hidden border border-[#E5E1D8]">
                  <div
                    className={`h-full ${budgetStatus.exceeded ? "bg-[#C62828]" : "bg-[#4338CA]"}`}
                    style={{ width: `${budgetStatus.pct}%` }}
                  />
                </div>
                <span className="text-[10px] font-mono text-[#6B675C] mt-1 block">
                  {budgetStatus.pct}% {lang === "de" ? "von Tagesbudget" : "每日预算限额"}
                </span>
              </div>

              <div className="rounded-sm border border-[#E5E1D8] bg-white p-3">
                <span className="font-mono text-[10px] uppercase tracking-wider text-[#6B675C] block mb-1">
                  {lang === "de" ? "Gesamt Token" : "历史总消耗"}
                </span>
                <span className="font-mono text-lg font-bold text-[#1C1B17]">
                  {tokenSummary.allTimeTotal.toLocaleString()}
                </span>
                <span className="text-[10px] font-mono text-[#6B675C] block mt-2">
                  In {tokenSummary.promptTotal} / Out {tokenSummary.completionTotal}
                </span>
              </div>

              <div className="rounded-sm border border-[#A7F3D0] bg-[#ECFDF5] p-3">
                <span className="font-mono text-[10px] uppercase tracking-wider text-[#047857] block mb-1">
                  ⚡ {lang === "de" ? "CCR Algorithmus-Ersparnis" : "CCR 压缩算法节省"}
                </span>
                <span className="font-mono text-lg font-bold text-[#047857]">
                  +{tokenSummary.savedTotalCCR.toLocaleString()}
                </span>
                <span className="text-[10px] font-mono text-[#047857] block mt-2">
                  {lang === "de" ? "Token durch Headroom CCR gerettet" : "无损缓存已为您省下的 Token"}
                </span>
              </div>

              <div className="rounded-sm border border-[#E5E1D8] bg-white p-3">
                <span className="font-mono text-[10px] uppercase tracking-wider text-[#6B675C] block mb-1">
                  {lang === "de" ? "Anfragen Total" : "累计调用轮次"}
                </span>
                <span className="font-mono text-lg font-bold text-[#1C1B17]">
                  {tokenSummary.requestCount}
                </span>
                <span className="text-[10px] font-mono text-[#6B675C] block mt-2">
                  {tokenSummary.requestCount > 0
                    ? `Ø ~${Math.round(tokenSummary.allTimeTotal / tokenSummary.requestCount)} tok/Req`
                    : "0 tok/Req"}
                </span>
              </div>
            </div>

            {/* 每日预算设置 */}
            <div className="rounded-sm border border-[#E5E1D8] bg-white p-3 flex flex-wrap items-center justify-between gap-2">
              <span className="text-xs font-sans text-[#1C1B17]">
                {lang === "de" ? "Tägliche Warnschwelle für Token-Verbrauch:" : "每日 Token 消耗预警限额:"}
              </span>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  value={budgetLimit}
                  onChange={(e) => {
                    const val = Number(e.target.value);
                    setBudgetLimit(val);
                    saveTokenBudget(val);
                    setBudgetStatus(checkTokenBudget());
                  }}
                  step="10000"
                  min="10000"
                  className="w-32 rounded-xs border border-[#E5E1D8] px-2 py-1 text-xs font-mono focus:border-[#4338CA] focus:outline-none"
                />
                <span className="text-xs font-mono text-[#6B675C]">Tokens/Tag</span>
              </div>
            </div>

            {/* 最近调用明细表 */}
            <div>
              <h4 className="font-mono text-xs font-semibold text-[#1C1B17] mb-2">
                {lang === "de" ? "Letzte Aufrufe (Auszug)" : "近期调用流水 (近 8 次)"}:
              </h4>
              {recentRecords.length === 0 ? (
                <p className="font-mono text-xs text-[#6B675C] py-2">
                  {lang === "de" ? "Noch keine Token-Aufrufe verzeichnet." : "暂无调用记录。提问后将自动入账。"}
                </p>
              ) : (
                <div className="overflow-x-auto border border-[#E5E1D8] rounded-xs">
                  <table className="w-full text-left font-mono text-xs">
                    <thead className="bg-[#FAF9F6] border-b border-[#E5E1D8] text-[#6B675C]">
                      <tr>
                        <th className="p-2">Zeit</th>
                        <th className="p-2">Endpunkt</th>
                        <th className="p-2">Modell</th>
                        <th className="p-2">Prompt</th>
                        <th className="p-2">Output</th>
                        <th className="p-2">Total</th>
                        <th className="p-2 text-[#047857]">CCR Saved</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#E5E1D8] bg-white">
                      {recentRecords.map((r) => (
                        <tr key={r.id}>
                          <td className="p-2 text-[#6B675C]">
                            {new Date(r.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                          </td>
                          <td className="p-2 text-[#1C1B17]">{r.endpointId.replace("ep-", "")}</td>
                          <td className="p-2 text-[#1C1B17] truncate max-w-[120px]">{r.model.split("/").pop()}</td>
                          <td className="p-2 text-[#6B675C]">{r.promptTokens}</td>
                          <td className="p-2 text-[#6B675C]">{r.completionTokens}</td>
                          <td className="p-2 font-bold text-[#1C1B17]">{r.totalTokens}</td>
                          <td className="p-2 text-[#047857]">+{r.savedTokensCCR || 0}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ==================== TAB 4: 高级检索与向量 (Advanced) ==================== */}
        {tab === "advanced" && (
          <div className="space-y-4">
            {/* 全局引擎三态切换 */}
            <div className="rounded-sm border border-[#E5E1D8] bg-white p-3">
              <label className="block text-xs font-sans text-[#6B675C] mb-2">
                {lang === "de" ? "Globale KI-Engine Betriebsart:" : "全局 AI 引擎运行模式:"}
              </label>
              <div className="flex gap-2">
                {(["api", "local", "off"] as AiEngine[]).map((e) => (
                  <button
                    key={e}
                    type="button"
                    onClick={() => {
                      updateLegacyCfg({ engine: e });
                    }}
                    className={`px-3 py-1.5 rounded-xs font-sans text-xs transition-colors cursor-pointer ${
                      cfg.engine === e
                        ? "bg-[#1C1B17] text-white"
                        : "border border-[#E5E1D8] text-[#1C1B17] hover:bg-[#FAF9F6]"
                    }`}
                  >
                    {engineLabel(e, lang)}
                  </button>
                ))}
              </div>
            </div>

            {/* 向量检索与镜像 */}
            <div className="rounded-sm border border-[#E5E1D8] bg-white p-3 space-y-3">
              <h4 className="font-mono text-xs font-semibold text-[#1C1B17]">
                {lang === "de" ? "Lokale Vektorsuche & Embeddings (L1 / L2)" : "本地向量检索与语义嵌入 (L1/L2)"}
              </h4>
              <div className="flex flex-wrap items-center gap-3">
                <span className="font-sans text-xs text-[#6B675C]">{tr.aiVector}</span>
                <select
                  value={cfg.vectorMode}
                  onChange={(e) => updateLegacyCfg({ vectorMode: e.target.value as AiConfig["vectorMode"] })}
                  className="rounded-xs border border-[#E5E1D8] px-2 py-1 text-xs font-mono focus:border-[#4338CA] focus:outline-none"
                >
                  <option value="off">{tr.aiVectorOff}</option>
                  <option value="auto">{tr.aiVectorAuto}</option>
                  <option value="on">{tr.aiVectorOn}</option>
                </select>
                <span className="font-mono text-xs text-[#6B675C]">
                  {vecReady ? tr.aiVectorReady : vecPct !== null ? `${Math.round(vecPct * 100)} %` : tr.aiVectorIdle}
                </span>
              </div>

              <div>
                <label className="block text-xs font-sans text-[#6B675C] mb-1">
                  {tr.aiMirror}:
                </label>
                <input
                  value={cfg.hfMirror}
                  onChange={(e) => updateLegacyCfg({ hfMirror: e.target.value })}
                  placeholder="https://hf-mirror.com"
                  className="w-full rounded-xs border border-[#E5E1D8] px-2.5 py-1 text-xs font-mono focus:border-[#4338CA] focus:outline-none"
                />
              </div>

              <div className="flex items-center gap-2 pt-1">
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
                  className="rounded-xs border border-[#E5E1D8] bg-white px-3 py-1.5 font-sans text-xs hover:border-[#4338CA] hover:text-[#4338CA] disabled:opacity-50 cursor-pointer"
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
                    className="font-mono text-xs text-[#6B675C] hover:text-[#4338CA] underline"
                  >
                    {tr.aiLocalReset}
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  function updateLegacyCfg(patch: Partial<AiConfig>) {
    const next = { ...cfg, ...patch };
    setCfg(next);
    saveAiConfig(next);
    onChanged?.();
  }
}
