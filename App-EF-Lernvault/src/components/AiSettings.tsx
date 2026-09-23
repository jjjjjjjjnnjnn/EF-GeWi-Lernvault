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
  type AuthFieldType,
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

const MODEL_DISPLAY_NAMES: Record<string, string> = {
  "llama-3-sauerkrautlm-8b-instruct": "Llama 3 (Sauerkraut 8B)",
  "qwen2.5:7b": "Qwen 2.5 (7B)",
  "deepseek-chat": "DeepSeek V3",
  "deepseek-reasoner": "DeepSeek R1",
  "SenseChat-5": "SenseChat 5",
  "SenseChat-5-Cantonese": "SenseChat 粤语",
  "SenseChat-Turbo": "SenseChat Turbo",
  "gpt-4o-mini": "GPT-4o Mini",
  "Qwen/Qwen3-8B": "Qwen 3 (8B)",
};

function BoltIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M9.2 1.8L4.3 8.2h3.4l-.9 6 4.9-6.4H8.3z" />
    </svg>
  );
}

function ChatIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M2.5 3.2h11a1 1 0 0 1 1 1v6.3a1 1 0 0 1-1 1H7l-3 2v-2H2.5a1 1 0 0 1-1-1V4.2a1 1 0 0 1 1-1z" />
    </svg>
  );
}

function InfoIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true">
      <circle cx="8" cy="8" r="6" />
      <path d="M8 7v4M8 4.7v.2" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true">
      <path d="M3.5 3.5l9 9M12.5 3.5l-9 9" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M3 8.5l3 3L13 4.5" />
    </svg>
  );
}

function DownloadIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M8 2.5v7M5 7l3 3 3-3M3 13.5h10" />
    </svg>
  );
}

function ExternalLinkIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M6.5 3.5h-3v9h9v-3M9.5 3.5h3v3M12.5 3.5l-5 5" />
    </svg>
  );
}

function StatusIcon({ ok }: { ok: boolean }) {
  return ok ? <CheckIcon /> : <CloseIcon />;
}

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={open ? "rotate-180" : ""}>
      <path d="M4 6l4 4 4-4" />
    </svg>
  );
}

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

  // 保存操作反馈提示
  const [saveFeedback, setSaveFeedback] = useState<string | null>(null);

  // 简单模式下的自主模型输入与密码显隐
  const activeEndpoint = endpoints.find((e) => e.id === activeEpId) || getActiveEndpoint();
  const [simpleModelInput, setSimpleModelInput] = useState(activeEndpoint.model);
  const [simpleApiKeyInput, setSimpleApiKeyInput] = useState(activeEndpoint.apiKey);
  const [showSimpleKey, setShowSimpleKey] = useState(false);

  // CC-Switch 风格端点编辑视图状态
  const [editingEp, setEditingEp] = useState<AiEndpoint | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [formName, setFormName] = useState("");
  const [formBaseUrl, setFormBaseUrl] = useState("");
  const [formApiKey, setFormApiKey] = useState("");
  const [formModel, setFormModel] = useState("");
  const [formModelFast, setFormModelFast] = useState("");
  const [formModelDeep, setFormModelDeep] = useState("");
  const [formUpstreamFormat, setFormUpstreamFormat] = useState<"openai" | "anthropic" | "custom">("openai");
  const [formCustomPort, setFormCustomPort] = useState<string>("");
  const [formIsFullUrl, setFormIsFullUrl] = useState<boolean>(false);
  const [formAuthHeaderType, setFormAuthHeaderType] = useState<AuthFieldType>("ANTHROPIC_AUTH_TOKEN");
  const [formCustomAuthHeader, setFormCustomAuthHeader] = useState<string>("");
  const [showEditorKey, setShowEditorKey] = useState(false);
  const [advancedOpen, setAdvancedOpen] = useState(false);

  // 测速与探测状态
  const [pingingAll, setPingingAll] = useState(false);
  const [testingEpId, setTestingEpId] = useState<string | null>(null);
  const [testResultMap, setTestResultMap] = useState<Record<string, EndpointTestResult>>({});
  const [modalTesting, setModalTesting] = useState(false);
  const [modalTestResult, setModalTestResult] = useState<EndpointTestResult | null>(null);

  // 模型拉取状态
  const [pullingEpId, setPullingEpId] = useState<string | null>(null);
  const [pulledModelsMap, setPulledModelsMap] = useState<Record<string, string[]>>({});

  // 高级向量状态
  const [vecPct, setVecPct] = useState<number | null>(null);
  const [vecReady, setVecReady] = useState(() => isLocalEmbedderReady());

  // 同步简单模式下的当前端点输入
  useEffect(() => {
    setSimpleModelInput(activeEndpoint.model);
    setSimpleApiKeyInput(activeEndpoint.apiKey);
  }, [activeEpId, activeEndpoint.model, activeEndpoint.apiKey]);

  // 刷新 Token 统计
  const refreshTokens = () => {
    setTokenSummary(getTokenSummary());
    setRecentRecords(getTokenLedger().slice(0, 8));
    setBudgetStatus(checkTokenBudget());
  };

  useEffect(() => {
    refreshTokens();
  }, [tab]);

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
          remedyTip:
            res.status === "offline"
              ? ep.baseUrl.includes("1234")
                ? lang === "de"
                  ? "LM Studio: Bitte Server starten (Port 1234) & 'Enable CORS' aktivieren."
                  : "LM Studio 用户：请确认 Local Server 已启动（端口 1234），且已勾选「Enable CORS」！"
                : lang === "de"
                ? "Dienst offline oder nicht erreichbar."
                : "服务未启动或网络端口不可达。"
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
      const prompt =
        lang === "de"
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
  const handlePullModelsForEp = async (targetBaseUrl: string, targetApiKey: string, cacheKey: string) => {
    if (pullingEpId) return;
    setPullingEpId(cacheKey);
    try {
      const res = await pullModelList(targetBaseUrl, targetApiKey, 6000);
      if (res.models.length > 0) {
        setPulledModelsMap((prev) => ({ ...prev, [cacheKey]: res.models }));
      }
    } finally {
      setPullingEpId(null);
    }
  };

  // 保存简单模式配置
  const handleSaveSimpleConfig = () => {
    const updatedModel = simpleModelInput.trim() || activeEndpoint.model;
    const updatedKey = simpleApiKeyInput.trim();

    updateEndpoint(activeEndpoint.id, {
      model: updatedModel,
      apiKey: updatedKey,
    });

    const nextCfg: AiConfig = {
      ...cfg,
      engine: "api",
      providerId: activeEndpoint.providerId,
      baseUrl: activeEndpoint.baseUrl,
      apiKey: updatedKey,
      model: updatedModel,
    };
    setCfg(nextCfg);
    saveAiConfig(nextCfg);
    setEndpoints(loadEndpoints());

    setSaveFeedback(lang === "de" ? "Einstellungen gespeichert / 设置已保存" : "设置已成功保存 / Einstellungen gespeichert");
    setTimeout(() => setSaveFeedback(null), 2500);
    onChanged?.();
  };

  // 打开编辑抽屉 (CC-Switch 风格)
  const handleOpenEditor = (ep: AiEndpoint) => {
    setEditingEp(ep);
    setIsAdding(false);
    setFormName(ep.name);
    setFormBaseUrl(ep.baseUrl);
    setFormApiKey(ep.apiKey);
    setFormModel(ep.model);
    setFormModelFast(ep.modelFast || "");
    setFormModelDeep(ep.modelDeep || "");
    setFormUpstreamFormat(ep.upstreamFormat || "openai");
    setFormCustomPort(ep.customPort ? String(ep.customPort) : "");
    setFormIsFullUrl(!!ep.isFullUrl);
    setFormAuthHeaderType(
      ep.authHeaderType || (ep.upstreamFormat === "anthropic" ? "ANTHROPIC_AUTH_TOKEN" : "Bearer")
    );
    setFormCustomAuthHeader(ep.customAuthHeader || "");
    setShowEditorKey(false);
    setAdvancedOpen(false);
    setModalTestResult(null);
  };

  // 打开新增抽屉
  const handleOpenAdd = () => {
    setIsAdding(true);
    setEditingEp(null);
    setFormName("");
    setFormBaseUrl("https://");
    setFormApiKey("");
    setFormModel("deepseek-chat");
    setFormModelFast("");
    setFormModelDeep("");
    setFormUpstreamFormat("openai");
    setFormCustomPort("");
    setFormIsFullUrl(false);
    setFormAuthHeaderType("Bearer");
    setFormCustomAuthHeader("");
    setShowEditorKey(false);
    setAdvancedOpen(false);
    setModalTestResult(null);
  };

  // 在弹窗内即时深度测试该端点配置 (CC-Switch 风格)
  const handleTestInsideModal = async () => {
    if (modalTesting) return;
    setModalTesting(true);
    setModalTestResult(null);
    try {
      const parsedPort = formCustomPort.trim() ? parseInt(formCustomPort.trim(), 10) : undefined;
      const tempEp: AiEndpoint = {
        id: editingEp?.id || "temp",
        name: formName.trim() || "测试端点",
        providerId: editingEp?.providerId || (formUpstreamFormat === "anthropic" ? "sensenova" : "custom"),
        baseUrl: formBaseUrl.trim(),
        apiKey: formApiKey.trim(),
        model: formModel.trim() || (formUpstreamFormat === "anthropic" ? "sensenova-6.8-flash-lite" : "default"),
        enabled: true,
        upstreamFormat: formUpstreamFormat,
        authHeaderType: formAuthHeaderType,
        customAuthHeader: formCustomAuthHeader.trim() || undefined,
        customPort: !isNaN(parsedPort as number) && (parsedPort as number) > 0 ? parsedPort : undefined,
        isFullUrl: formIsFullUrl,
      };
      const prompt =
        lang === "de"
          ? "Hallo! Bestätige bitte kurz deine Bereitschaft für EF-Lernvault."
          : "你好！请简短确认你可以正常协助高中 EF 备考。";
      const res = await testEndpointChat(tempEp, prompt, 10000);
      setModalTestResult(res);
      if (editingEp?.id) {
        updateEndpoint(editingEp.id, {
          status: res.ok ? "online" : "offline",
          latencyMs: res.latencyMs,
          lastChecked: Date.now(),
          lastTestResult: res,
        });
        setEndpoints(loadEndpoints());
      }
    } finally {
      setModalTesting(false);
    }
  };

  // 保存供应商编辑 (CC-Switch 风格保存)
  const handleSaveEditor = () => {
    if (!formName.trim() || !formBaseUrl.trim()) return;

    const trimmedModel = formModel.trim() || "gpt-4o-mini";
    const trimmedBaseUrl = formBaseUrl.trim().replace(/\/+$/, "");
    const parsedPort = formCustomPort.trim() ? parseInt(formCustomPort.trim(), 10) : undefined;
    const finalPort = !isNaN(parsedPort as number) && (parsedPort as number) > 0 ? parsedPort : undefined;

    if (isAdding) {
      const created = addEndpoint({
        name: formName.trim(),
        providerId: "custom",
        baseUrl: trimmedBaseUrl,
        apiKey: formApiKey.trim(),
        model: trimmedModel,
        modelFast: formModelFast.trim() || undefined,
        modelDeep: formModelDeep.trim() || undefined,
        upstreamFormat: formUpstreamFormat,
        authHeaderType: formAuthHeaderType,
        customAuthHeader: formCustomAuthHeader.trim() || undefined,
        customPort: finalPort,
        isFullUrl: formIsFullUrl,
        enabled: true,
      });
      setEndpoints(loadEndpoints());
      handleSelectActive(created.id);
    } else if (editingEp) {
      updateEndpoint(editingEp.id, {
        name: formName.trim(),
        baseUrl: trimmedBaseUrl,
        apiKey: formApiKey.trim(),
        model: trimmedModel,
        modelFast: formModelFast.trim() || undefined,
        modelDeep: formModelDeep.trim() || undefined,
        upstreamFormat: formUpstreamFormat,
        authHeaderType: formAuthHeaderType,
        customAuthHeader: formCustomAuthHeader.trim() || undefined,
        customPort: finalPort,
        isFullUrl: formIsFullUrl,
      });
      setEndpoints(loadEndpoints());
      handleSelectActive(editingEp.id);
    }

    setIsAdding(false);
    setEditingEp(null);
    setSaveFeedback(
      lang === "de"
        ? "Anbieterkonfiguration gespeichert und aktiviert / 供应商配置已成功保存并启用"
        : "供应商配置已成功保存并设为当前主路由 / Anbieterkonfiguration gespeichert und aktiviert"
    );
    setTimeout(() => setSaveFeedback(null), 2500);
    onChanged?.();
  };

  // 删除端点
  const handleDeleteEp = (id: string) => {
    const confirmMsg =
      lang === "de" ? "Diesen Endpunkt wirklich löschen?" : "确认删除该自定义端点吗？";
    if (!window.confirm(confirmMsg)) return;

    deleteEndpoint(id);
    setEndpoints(loadEndpoints());
    setActiveEpId(getActiveEndpointId());
    onChanged?.();
  };

  // 极简预设卡片激活
  const handleQuickActivate = (type: "vault" | "lmstudio" | "deepseek" | "siliconflow" | "sensenova") => {
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
    if (type === "sensenova") targetId = "ep-sensenova";

    handleSelectActive(targetId);
  };

  function updateLegacyCfg(patch: Partial<AiConfig>) {
    const next = { ...cfg, ...patch };
    setCfg(next);
    saveAiConfig(next);
    onChanged?.();
  }

  // 推荐模型快速列表
  const currentRecommended =
    activeEndpoint.recommendedModels || [
      "SenseChat-5",
      "llama-3-sauerkrautlm-8b-instruct",
      "qwen2.5:7b",
      "deepseek-chat",
      "gpt-4o-mini",
    ];

  return (
    <div className="border-b border-[var(--line)] bg-[var(--paper)]">
      {/* 顶部状态与 Tab 导航条 */}
      <div className="flex flex-wrap items-center justify-between border-b border-[var(--line)] px-4 py-2.5 bg-[var(--surface)]">
        <div className="flex items-center gap-2">
          <span className="font-mono text-[var(--text-meta)] uppercase tracking-wider text-[var(--gray)]">
            {lang === "de" ? "Aktiver Endpunkt" : "当前活跃端点"}:
          </span>
          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-[var(--radius)] text-[var(--text-meta)] font-mono bg-[var(--paper)] border border-[var(--line)] text-[var(--ink)]">
            <span
              className={`w-1.5 h-1.5 rounded-full ${
                cfg.engine === "off"
                  ? "bg-[var(--gray)]"
                  : activeEndpoint.status === "online"
                  ? "bg-[var(--success)]"
                  : activeEndpoint.status === "offline"
                  ? "bg-[var(--warning)]"
                  : "bg-[var(--warning)]"
              }`}
            />
            {cfg.engine === "off"
              ? lang === "de"
                ? "Aus (Offline)"
                : "关闭 (离线)"
              : `${activeEndpoint.name} · ${activeEndpoint.model}`}
            {activeEndpoint.latencyMs !== undefined && activeEndpoint.latencyMs !== null && (
              <span className="text-[var(--gray)]">({activeEndpoint.latencyMs}ms)</span>
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
              onClick={() => {
                setTab(tItem.id);
                setEditingEp(null);
                setIsAdding(false);
              }}
              className={`px-2.5 py-1 text-xs font-sans rounded-[var(--radius)] transition-colors cursor-pointer ${
                tab === tItem.id
                  ? "bg-[var(--ink)] text-[var(--paper)] font-medium"
                  : "text-[var(--gray)] hover:text-[var(--ink)] hover:bg-[var(--paper)]"
              }`}
            >
              {lang === "de" ? tItem.labelDE : tItem.labelZH}
            </button>
          ))}
        </div>
      </div>

      <div className="p-4">
        {/* 全局保存反馈提示 */}
        {saveFeedback && (
          <div className="mb-3 flex items-center justify-between rounded-[var(--radius)] border border-[var(--success)] bg-[var(--paper-subtle)] px-3 py-1.5 font-mono text-xs text-[var(--success)]">
            <span>{saveFeedback}</span>
            <button
              type="button"
              onClick={() => setSaveFeedback(null)}
              aria-label={lang === "de" ? "Hinweis schließen / 关闭提示" : "关闭提示 / Hinweis schließen"}
              className="rounded-[var(--radius)] text-[var(--success)] hover:opacity-70"
            >
              <CloseIcon />
            </button>
          </div>
        )}

        {/* ==================== TAB 1: 极简推荐 (Simple Mode) ==================== */}
        {tab === "simple" && (
          <div className="space-y-4">
            <p className="font-sans text-xs text-[var(--gray)]">
              {lang === "de"
                ? "Wähle eine der drei empfohlenen Routen für Klausur-Vorbereitung und Prüfungssimulation:"
                : "为高中复习与模考选择最合适的运行路线（一键切换，免复杂配置）："}
            </p>

            <div className="grid gap-3 sm:grid-cols-3">
              {/* 卡片 1: 离线原生 */}
              <div
                className={`flex flex-col justify-between rounded-[var(--radius)] border p-3.5 transition-colors ${
                  cfg.engine === "off"
                    ? "border-[var(--accent)] bg-[var(--surface)]  ring-1 ring-[var(--accent)]/20"
                    : "border-[var(--line)] bg-[var(--surface)] hover:border-[var(--gray)]"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="font-mono text-xs  text-[var(--ink)]">
                      {lang === "de" ? "Vault-Nativ" : "知识库原生"}
                    </span>
                    <span className="text-[var(--text-meta)] font-mono px-1.5 py-0.2 rounded-[var(--radius)] bg-[var(--paper-subtle)] text-[var(--gray)]">
                      {lang === "de" ? "100% Offline" : "完全离线"}
                    </span>
                  </div>
                  <p className="font-sans text-xs text-[var(--gray)] leading-relaxed">
                    {lang === "de"
                      ? "Kein Modell erforderlich. Antworten & Aufgaben werden direkt aus den 38 Vault-Notizen extrahiert."
                      : "零配置、零费用。回答与试题直接从本地 38 篇考纲笔记中精确提炼，绝不漂移。"}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => handleQuickActivate("vault")}
                  className={`mt-3 w-full py-1.5 text-xs font-sans rounded-[var(--radius)] transition-colors cursor-pointer ${
                    cfg.engine === "off"
                      ? "bg-[var(--accent)] text-white"
                      : "border border-[var(--line)] text-[var(--ink)] hover:bg-[var(--paper)]"
                  }`}
                >
                  {cfg.engine === "off"
                    ? lang === "de" ? "Aktiv / 正在使用" : "正在使用 / Aktiv"
                    : lang === "de" ? "Auswählen" : "选择此路线"}
                </button>
              </div>

              {/* 卡片 2: 本地大模型 */}
              <div
                className={`flex flex-col justify-between rounded-[var(--radius)] border p-3.5 transition-colors ${
                  cfg.engine === "api" && (activeEpId === "ep-lmstudio" || activeEpId === "ep-ollama")
                    ? "border-[var(--accent)] bg-[var(--surface)]  ring-1 ring-[var(--accent)]/20"
                    : "border-[var(--line)] bg-[var(--surface)] hover:border-[var(--gray)]"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="font-mono text-xs  text-[var(--ink)]">
                      {lang === "de" ? "LM Studio (Lokal)" : "本机算力 (LM Studio)"}
                    </span>
                    <span className="text-[var(--text-meta)] font-mono px-1.5 py-0.2 rounded-[var(--radius)] bg-[var(--paper-subtle)] text-[var(--success)]">
                      Port 1234
                    </span>
                  </div>
                  <p className="font-sans text-xs text-[var(--gray)] leading-relaxed">
                    {lang === "de"
                      ? "Nutzt deine lokale GPU/CPU. Keine API-Kosten, 100% datenschutzkonform, Port 1234 oder 11434."
                      : "利用本机显卡，免填 Key，数据完全不出机器。支持自由提问与全真模考批改。"}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => handleQuickActivate("lmstudio")}
                  className={`mt-3 w-full py-1.5 text-xs font-sans rounded-[var(--radius)] transition-colors cursor-pointer ${
                    cfg.engine === "api" && (activeEpId === "ep-lmstudio" || activeEpId === "ep-ollama")
                      ? "bg-[var(--accent)] text-white"
                      : "border border-[var(--line)] text-[var(--ink)] hover:bg-[var(--paper)]"
                  }`}
                >
                  {cfg.engine === "api" && (activeEpId === "ep-lmstudio" || activeEpId === "ep-ollama")
                    ? lang === "de" ? "Aktiv / 正在使用" : "正在使用 / Aktiv"
                    : lang === "de" ? "Ein-Klick Verbinden" : "一键连接"}
                </button>
              </div>

              {/* 卡片 3: 云端精选 (DeepSeek / SenseNova / SiliconFlow) */}
              <div
                className={`flex flex-col justify-between rounded-[var(--radius)] border p-3.5 transition-colors ${
                  cfg.engine === "api" && (activeEpId === "ep-deepseek" || activeEpId === "ep-sensenova" || activeEpId === "ep-siliconflow")
                    ? "border-[var(--accent)] bg-[var(--surface)]  ring-1 ring-[var(--accent)]/20"
                    : "border-[var(--line)] bg-[var(--surface)] hover:border-[var(--gray)]"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="font-mono text-xs  text-[var(--ink)]">
                      {lang === "de" ? "DeepSeek / SenseNova" : "云端大模型 (商汤/DeepSeek)"}
                    </span>
                    <span className="text-[var(--text-meta)] font-mono px-1.5 py-0.2 rounded-[var(--radius)] bg-[var(--paper-subtle)] text-[var(--accent)]">
                      {lang === "de" ? "Hohe Präzision" : "深度推理"}
                    </span>
                  </div>
                  <p className="font-sans text-xs text-[var(--gray)] leading-relaxed">
                    {lang === "de"
                      ? "SenseNova SenseChat-5 oder DeepSeek. Höchste logische Schärfe für AFB III Klausurfragen."
                      : "支持商汤 SenseNova、DeepSeek 等国内主流服务。适合复杂论述与哲学推演。"}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => handleQuickActivate("deepseek")}
                  className={`mt-3 w-full py-1.5 text-xs font-sans rounded-[var(--radius)] transition-colors cursor-pointer ${
                    cfg.engine === "api" && (activeEpId === "ep-deepseek" || activeEpId === "ep-sensenova" || activeEpId === "ep-siliconflow")
                      ? "bg-[var(--accent)] text-white"
                      : "border border-[var(--line)] text-[var(--ink)] hover:bg-[var(--paper)]"
                  }`}
                >
                  {cfg.engine === "api" && (activeEpId === "ep-deepseek" || activeEpId === "ep-sensenova" || activeEpId === "ep-siliconflow")
                    ? lang === "de" ? "Aktiv / 正在使用" : "正在使用 / Aktiv"
                    : lang === "de" ? "Aktivieren & Key prüfen" : "激活并填 Key"}
                </button>
              </div>
            </div>

            {/* 当前活跃端点的精细配置：模型输入、API Key、显式保存与实时诊断 */}
            {cfg.engine === "api" && (
              <div className="mt-4 rounded-[var(--radius)] border border-[var(--line)] bg-[var(--surface)] p-4 space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[var(--line)] pb-2.5">
                  <div className="flex items-center gap-2">
                    <span className="font-sans text-xs  text-[var(--ink)]">
                      {lang === "de" ? "Aktiver Endpunkt:" : "当前主路由端点:"} {activeEndpoint.name}
                    </span>
                    <span className="text-[var(--text-meta)] font-mono px-1.5 py-0.5 rounded-[var(--radius)] bg-[var(--paper)] border border-[var(--line)] text-[var(--gray)]">
                      {activeEndpoint.baseUrl}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span
                      className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded-[var(--radius)] text-[var(--text-meta)] font-mono ${
                        activeEndpoint.status === "online"
                          ? "bg-[var(--paper-subtle)] text-[var(--success)]"
                          : activeEndpoint.status === "offline"
                          ? "bg-[var(--paper-subtle)] text-[var(--warning)]"
                          : "bg-[var(--surface)] text-[var(--gray)] border border-[var(--line)]"
                      }`}
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${
                          activeEndpoint.status === "online"
                            ? "bg-[var(--success)]"
                            : activeEndpoint.status === "offline"
                            ? "bg-[var(--warning)]"
                            : "bg-[var(--gray)]"
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

                {/* 1. 自主模型选择与直接输入 (用户核心需求) */}
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-xs font-sans font-medium text-[var(--ink)]">
                      {lang === "de" ? "Modell wählen oder manuell eingeben:" : "自主选择或填写模型名称 (Model ID):"}
                    </label>
                    <button
                      type="button"
                      onClick={() =>
                        handlePullModelsForEp(activeEndpoint.baseUrl, activeEndpoint.apiKey, activeEndpoint.id)
                      }
                      disabled={pullingEpId === activeEndpoint.id}
                      className="text-[var(--text-meta)] font-mono text-[var(--accent)] hover:underline cursor-pointer flex items-center gap-1"
                    >
                      <DownloadIcon />
                      <span>{pullingEpId === activeEndpoint.id ? "拉取中..." : "获取在线模型列表"}</span>
                    </button>
                  </div>
                  <input
                    type="text"
                    value={simpleModelInput}
                    onChange={(e) => setSimpleModelInput(e.target.value)}
                    placeholder="例如: SenseChat-5, deepseek-chat, llama-3-sauerkrautlm-8b-instruct..."
                    className="w-full rounded-[var(--radius)] border border-[var(--line)] bg-[var(--surface)] px-2.5 py-1.5 text-xs font-mono text-[var(--ink)] focus:border-[var(--accent)]"
                  />
                  {/* 推荐模型标签 */}
                  <div className="mt-1.5 flex flex-wrap items-center gap-1.5">
                    <span className="text-[var(--text-meta)] font-mono text-[var(--gray)]">推荐/常用:</span>
                    {currentRecommended.map((mName) => (
                      <button
                        key={mName}
                        type="button"
                        onClick={() => setSimpleModelInput(mName)}
                        className={`px-1.5 py-0.5 rounded-[var(--radius)] border text-[var(--text-meta)] font-mono cursor-pointer transition-colors ${
                          simpleModelInput === mName
                            ? "bg-[var(--ink)] text-white border-[var(--ink)]"
                            : "bg-[var(--paper)] text-[var(--ink)] border-[var(--line)] hover:border-[var(--accent)]"
                        }`}
                      >
                        {MODEL_DISPLAY_NAMES[mName] || mName.split("/").pop()}
                      </button>
                    ))}
                    {pulledModelsMap[activeEndpoint.id]?.map((mName) => (
                      <button
                        key={mName}
                        type="button"
                        onClick={() => setSimpleModelInput(mName)}
                        className={`px-1.5 py-0.5 rounded-[var(--radius)] border text-[var(--text-meta)] font-mono cursor-pointer transition-colors ${
                          simpleModelInput === mName
                            ? "bg-[var(--ink)] text-white border-[var(--ink)]"
                            : "bg-[var(--paper-subtle)] text-[var(--success)] border-[var(--success)] hover:border-[var(--success)]"
                        }`}
                      >
                        {mName.split("/").pop()}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 2. API Key 输入框 (带显隐切换) */}
                {activeEndpoint.providerId !== "ollama" && (
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="text-xs font-sans text-[var(--gray)]">API Key:</label>
                      {activeEndpoint.websiteUrl && (
                        <a
                          href={activeEndpoint.websiteUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="text-[var(--text-meta)] font-mono text-[var(--accent)] hover:underline"
                        >
                          <span className="inline-flex items-center gap-1">
                          {lang === "de" ? "API Key anfordern" : "获取 API Key"}
                          <ExternalLinkIcon />
                        </span>
                        </a>
                      )}
                    </div>
                    <div className="relative flex items-center">
                      <input
                        type={showSimpleKey ? "text" : "password"}
                        value={simpleApiKeyInput}
                        onChange={(e) => setSimpleApiKeyInput(e.target.value)}
                        placeholder="sk-..."
                        className="w-full rounded-[var(--radius)] border border-[var(--line)] bg-[var(--surface)] px-2.5 py-1.5 pr-8 text-xs font-mono focus:border-[var(--accent)]"
                      />
                      <button
                        type="button"
                        onClick={() => setShowSimpleKey((s) => !s)}
                        title={showSimpleKey ? "隐藏密钥" : "显示密钥"}
                        className="absolute right-2 text-[var(--gray)] hover:text-[var(--ink)]"
                      >
                        <svg width="16" height="16" aria-hidden="true" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                          {showSimpleKey ? (
                            <path d="M2 2l12 12M6.7 6.8a2 2 0 0 0 2.5 2.5M4.1 4.3C2.8 5.3 1.5 8 1.5 8s2.5 4.5 6.5 4.5c1.4 0 2.7-.4 3.7-1.1M6.2 3.6c.6-.1 1.2-.1 1.8-.1 4 0 6.5 4.5 6.5 4.5s-.8 1.5-2.1 2.7" />
                          ) : (
                            <>
                              <path d="M1.5 8s2.5-4.5 6.5-4.5 6.5 4.5 6.5 4.5-2.5 4.5-6.5 4.5-6.5-4.5-6.5-4.5z" />
                              <circle cx="8" cy="8" r="2" />
                            </>
                          )}
                        </svg>
                      </button>
                    </div>
                  </div>
                )}

                {/* 3. 显式“保存设置”与测试动作栏 */}
                <div className="flex flex-wrap items-center justify-between gap-2 border-t border-[var(--line)] pt-3">
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => handleTestPing(activeEndpoint)}
                      disabled={testingEpId === activeEndpoint.id}
                      className="inline-flex items-center rounded-[var(--radius)] border border-[var(--line)] bg-[var(--surface)] px-3 py-1.5 text-xs font-sans text-[var(--ink)] hover:border-[var(--accent)] hover:text-[var(--accent)] disabled:opacity-50 cursor-pointer transition-colors"
                    >
                      {testingEpId === activeEndpoint.id ? (
                        <span>{lang === "de" ? "Verbindung wird getestet … / 测试中…" : "测试中 … / Verbindung wird getestet"}</span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5">
                          <BoltIcon />
                          {lang === "de" ? "Verbindung testen / 测试连接" : "测试连接 / Verbindung testen"}
                        </span>
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={() => handleTestChatProbe(activeEndpoint)}
                      disabled={testingEpId === activeEndpoint.id}
                      className="inline-flex items-center rounded-[var(--radius)] border border-[var(--accent)] bg-[var(--surface)] px-3 py-1.5 text-xs font-sans text-[var(--accent)] hover:bg-[var(--accent)] hover:text-white disabled:opacity-50 cursor-pointer transition-colors"
                    >
                      {testingEpId === activeEndpoint.id ? (
                        <span>{lang === "de" ? "Chat-Test läuft … / 探针发送中…" : "探针发送中 … / Chat-Test läuft"}</span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5">
                          <ChatIcon />
                          {lang === "de" ? "Chat-Test / 实时对话探针" : "实时对话探针 / Chat-Test"}
                        </span>
                      )}
                    </button>
                  </div>

                  {/* 显式“保存当前配置”按钮 (CC-Switch 风格) */}
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={handleSaveSimpleConfig}
                      className="inline-flex items-center gap-1.5 rounded-[var(--radius)] bg-[var(--accent)] px-5 py-1.5 text-xs font-sans font-medium text-white hover:bg-[var(--accent)]  active:scale-[0.98] transition-colors cursor-pointer"
                    >
                      <svg width="16" height="16" aria-hidden="true" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6">
                        <path d="M12.5 13.5H3.5a1 1 0 0 1-1-1v-9a1 1 0 0 1 1-1h6.5l3.5 3.5v6.5a1 1 0 0 1-1 1z" />
                        <path d="M10.5 13.5v-4h-5v4M4.5 2.5v3h5" />
                      </svg>
                      <span>{lang === "de" ? "Einstellungen speichern" : "保存设置"}</span>
                    </button>
                  </div>
                </div>

                {/* 实时诊断反馈面板 */}
                {testResultMap[activeEndpoint.id] && (
                  <div
                    className={`rounded-[var(--radius)] border p-2.5 text-xs font-mono leading-relaxed transition-colors ${
                      testResultMap[activeEndpoint.id].ok
                        ? "border-[var(--success)] bg-[var(--paper-subtle)] text-[var(--success)]"
                        : "border-[var(--warning)] bg-[var(--paper-subtle)] text-[var(--warning)]"
                    }`}
                  >
                    <div className="flex items-center justify-between  mb-1">
                      <span>
                        <span className="inline-flex items-center gap-1.5">
                          <StatusIcon ok={testResultMap[activeEndpoint.id].ok} />
                          {testResultMap[activeEndpoint.id].ok
                            ? lang === "de" ? "Erfolgreich verbunden / 连通成功" : "连通成功 / Erfolgreich verbunden"
                            : lang === "de" ? "Verbindung fehlgeschlagen / 连通失败" : "连通失败 / Verbindung fehlgeschlagen"}
                          {` (${testResultMap[activeEndpoint.id].latencyMs}ms)`}
                        </span>
                      </span>
                      {testResultMap[activeEndpoint.id].modelDetected && (
                        <span className="text-[var(--text-meta)] text-[var(--accent)] bg-[var(--surface)] px-1.5 py-0.5 rounded-[var(--radius)] border border-[var(--accent)]">
                          {testResultMap[activeEndpoint.id].modelDetected}
                        </span>
                      )}
                    </div>
                    {testResultMap[activeEndpoint.id].replyText && (
                      <p className="mt-1 text-[var(--text-meta)] bg-[var(--surface)]/70 p-1.5 rounded-[var(--radius)] text-[var(--ink)]">
                        <span className="">{lang === "de" ? "Modell-Antwort: " : "模型回复: "}</span>
                        {testResultMap[activeEndpoint.id].replyText}
                      </p>
                    )}
                    {testResultMap[activeEndpoint.id].errorMessage && (
                      <p className="mt-1 text-[var(--text-meta)] text-[var(--warning)]">
                        {testResultMap[activeEndpoint.id].errorMessage}
                      </p>
                    )}
                    {testResultMap[activeEndpoint.id].remedyTip && (
                      <p className="mt-1 text-[var(--text-meta)] text-[var(--warning)] bg-[var(--paper-subtle)] p-1.5 rounded-[var(--radius)] border border-[var(--warning)]">
                        <span className="">{lang === "de" ? "Hinweis: " : "排查建议: "}</span>
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
            {/* 模式 A: 供应商编辑视图 (参考 CC-Switch 截图 102424.png & 102431.png) */}
            {editingEp || isAdding ? (
              <div className="rounded-[var(--radius)] border border-[var(--line)] bg-[var(--surface)] p-5  space-y-4">
                {/* 顶部返回与标题 */}
                <div className="flex items-center justify-between border-b border-[var(--line)] pb-3">
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        setEditingEp(null);
                        setIsAdding(false);
                      }}
                      className="p-1 rounded-[var(--radius)] border border-[var(--line)] bg-[var(--paper)] text-[var(--ink)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors"
                      title="返回端点列表"
                    >
                      <svg width="16" height="16" aria-hidden="true" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8">
                        <path d="M10 3.5L5.5 8l4.5 4.5" />
                      </svg>
                    </button>
                    <h3 className="font-sans text-sm  text-[var(--ink)]">
                      {isAdding
                        ? lang === "de" ? "Neuen Anbieter hinzufügen" : "新增供应商"
                        : lang === "de" ? `Anbieter bearbeiten: ${editingEp?.name}` : `编辑供应商: ${editingEp?.name}`}
                    </h3>
                  </div>
                  {editingEp && (
                    <span className="font-mono text-[var(--text-meta)] px-2 py-0.5 rounded-[var(--radius)] bg-[var(--paper)] border border-[var(--line)] text-[var(--gray)]">
                      ID: {editingEp.id}
                    </span>
                  )}
                </div>

                {/* 1. 供应商名称 */}
                <div>
                  <label className="block text-xs font-sans text-[var(--gray)] mb-1">
                    {lang === "de" ? "Anbieter-Name:" : "供应商名称:"}
                  </label>
                  <input
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                    placeholder="如: SenseNova 商汤 / LM Studio 本地 / 自建中继"
                    className="w-full rounded-[var(--radius)] border border-[var(--line)] px-3 py-1.5 text-xs font-sans text-[var(--ink)] focus:border-[var(--accent)]"
                  />
                </div>

                {/* 2. API Key (带显隐切换) */}
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-xs font-sans text-[var(--gray)]">API Key:</label>
                    {editingEp?.websiteUrl && (
                      <a
                        href={editingEp.websiteUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-[var(--text-meta)] font-mono text-[var(--accent)] hover:underline"
                      >
                        <span className="inline-flex items-center gap-1">
                          {lang === "de" ? "API Key anfordern" : "获取 API Key"}
                          <ExternalLinkIcon />
                        </span>
                      </a>
                    )}
                  </div>
                  <div className="relative flex items-center">
                    <input
                      type={showEditorKey ? "text" : "password"}
                      value={formApiKey}
                      onChange={(e) => setFormApiKey(e.target.value)}
                      placeholder="sk-..."
                      className="w-full rounded-[var(--radius)] border border-[var(--line)] px-3 py-1.5 pr-8 text-xs font-mono text-[var(--ink)] focus:border-[var(--accent)]"
                    />
                    <button
                      type="button"
                      onClick={() => setShowEditorKey((s) => !s)}
                      className="absolute right-2 text-[var(--gray)] hover:text-[var(--ink)]"
                    >
                      <svg width="16" height="16" aria-hidden="true" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                        {showEditorKey ? (
                          <path d="M2 2l12 12M6.7 6.8a2 2 0 0 0 2.5 2.5M4.1 4.3C2.8 5.3 1.5 8 1.5 8s2.5 4.5 6.5 4.5c1.4 0 2.7-.4 3.7-1.1M6.2 3.6c.6-.1 1.2-.1 1.8-.1 4 0 6.5 4.5 6.5 4.5s-.8 1.5-2.1 2.7" />
                        ) : (
                          <>
                            <path d="M1.5 8s2.5-4.5 6.5-4.5 6.5 4.5 6.5 4.5-2.5 4.5-6.5 4.5-6.5-4.5-6.5-4.5z" />
                            <circle cx="8" cy="8" r="2" />
                          </>
                        )}
                      </svg>
                    </button>
                  </div>
                </div>

                {/* 3. 请求地址 (Base URL) + 完整 URL 开关 + 端口 + CC-Switch 风格提示框 */}
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-xs font-sans text-[var(--gray)]">
                      {lang === "de" ? "Anfrage-Adresse (Base-URL):" : "请求地址 (Base URL):"}
                    </label>
                    <div className="flex items-center gap-3">
                      <label className="flex items-center gap-1.5 cursor-pointer text-xs font-sans text-[var(--gray)] select-none">
                        <input
                          type="checkbox"
                          checked={formIsFullUrl}
                          onChange={(e) => setFormIsFullUrl(e.target.checked)}
                          className="rounded-[var(--radius)] border-[var(--line)] text-[var(--accent)] cursor-pointer"
                        />
                        <span>{lang === "de" ? "Vollständige URL" : "完整 URL"}</span>
                      </label>
                      <button
                        type="button"
                        onClick={handleTestInsideModal}
                        disabled={modalTesting}
                        className="text-[var(--text-meta)] font-mono text-[var(--accent)] hover:underline flex items-center gap-1 cursor-pointer"
                      >
                        <BoltIcon />
                        <span>
                          {modalTesting
                            ? (lang === "de" ? "Prüfe..." : "测试中...")
                            : (lang === "de" ? "Adresse testen" : "测试连接")}
                        </span>
                      </button>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <input
                      value={formBaseUrl}
                      onChange={(e) => setFormBaseUrl(e.target.value)}
                      placeholder={
                        formUpstreamFormat === "anthropic"
                          ? "https://token.sensenova.cn"
                          : "https://api.openai.com/v1 或 http://127.0.0.1:1234/v1"
                      }
                      className="flex-1 rounded-[var(--radius)] border border-[var(--line)] px-3 py-1.5 text-xs font-mono text-[var(--ink)] focus:border-[var(--accent)]"
                    />
                    <div className="w-28 shrink-0">
                      <input
                        value={formCustomPort}
                        onChange={(e) => setFormCustomPort(e.target.value)}
                        placeholder="端口 (如 1234)"
                        className="w-full rounded-[var(--radius)] border border-[var(--line)] px-2 py-1.5 text-xs font-mono text-[var(--ink)] focus:border-[var(--accent)]"
                        title="指定服务端口（选填）"
                      />
                    </div>
                  </div>
                  {/* CC-Switch 风格提示黄色横条 */}
                  <div className="mt-1.5 rounded-[var(--radius)] border border-[var(--warning)] bg-[var(--paper-subtle)] p-2 text-[var(--text-meta)] font-mono text-[var(--warning)] flex items-center gap-1.5">
                    <InfoIcon />
                    <span>
                      {formUpstreamFormat === "anthropic"
                        ? (lang === "de"
                            ? "Anthropic Messages / Claude API kompatible Basis-URL eingeben, ohne Slash am Ende."
                            : "填写兼容 Claude API 的服务端点地址，不要以斜杠结尾")
                        : (lang === "de"
                            ? "OpenAI Chat-kompatible Basis-URL eingeben, ohne Slash am Ende."
                            : "填写兼容 OpenAI Chat Completions 的服务端点地址，不要以斜杠结尾")}
                    </span>
                  </div>
                </div>

                {/* 4. 高级选项 (可折叠) */}
                <div className="border border-[var(--line)] rounded-[var(--radius)] bg-[var(--paper)] p-2.5">
                  <button
                    type="button"
                    onClick={() => setAdvancedOpen((o) => !o)}
                    className="flex w-full items-center justify-between font-sans text-xs font-medium text-[var(--ink)]"
                  >
                    <span className="inline-flex items-center gap-1.5">
                      <ChevronIcon open={advancedOpen} />
                      {lang === "de" ? "Erweiterte Optionen (Protokoll & Authentifizierung) / 高级选项（协议与认证）" : "高级选项（上游格式、认证字段与代理） / Erweiterte Optionen"}
                    </span>
                    <span className="font-mono text-[var(--text-meta)] text-[var(--gray)]">{advancedOpen ? "收起" : "展开"}</span>
                  </button>
                  {advancedOpen && (
                    <div className="mt-2.5 space-y-2.5 border-t border-[var(--line)] pt-2.5 text-xs">
                      <div>
                        <span className="text-[var(--gray)] block mb-1">上游格式 (协议标准):</span>
                        <select
                          value={formUpstreamFormat}
                          onChange={(e) => {
                            const fmt = e.target.value as "openai" | "anthropic" | "custom";
                            setFormUpstreamFormat(fmt);
                            if (fmt === "anthropic" && formAuthHeaderType === "Bearer") {
                              setFormAuthHeaderType("ANTHROPIC_AUTH_TOKEN");
                            } else if (fmt === "openai" && formAuthHeaderType === "ANTHROPIC_AUTH_TOKEN") {
                              setFormAuthHeaderType("Bearer");
                            }
                          }}
                          className="w-full rounded-[var(--radius)] border border-[var(--line)] bg-[var(--surface)] px-2 py-1 font-mono text-xs"
                        >
                          <option value="openai">OpenAI Chat Completions (标准兼容)</option>
                          <option value="anthropic">Anthropic Messages (原生，如商汤/Claude)</option>
                          <option value="custom">自建网关 / 代理</option>
                        </select>
                      </div>

                      <div>
                        <span className="text-[var(--gray)] block mb-1">认证字段 (写入请求头或认证名):</span>
                        <select
                          value={formAuthHeaderType}
                          onChange={(e) => setFormAuthHeaderType(e.target.value as AuthFieldType)}
                          className="w-full rounded-[var(--radius)] border border-[var(--line)] bg-[var(--surface)] px-2 py-1 font-mono text-xs"
                        >
                          <option value="ANTHROPIC_AUTH_TOKEN">ANTHROPIC_AUTH_TOKEN (默认，附带 x-api-key & anthropic-version)</option>
                          <option value="Bearer">Authorization: Bearer [token]</option>
                          <option value="x-api-key">x-api-key [token]</option>
                          <option value="custom">自定义 Header</option>
                        </select>
                      </div>

                      {formAuthHeaderType === "custom" && (
                        <div>
                          <span className="text-[var(--gray)] block mb-1">自定义 Header 名称:</span>
                          <input
                            value={formCustomAuthHeader}
                            onChange={(e) => setFormCustomAuthHeader(e.target.value)}
                            placeholder="如: X-API-Token"
                            className="w-full rounded-[var(--radius)] border border-[var(--line)] bg-[var(--surface)] px-2 py-1 font-mono text-xs"
                          />
                        </div>
                      )}

                      <p className="text-[var(--text-meta)] font-mono text-[var(--gray)] leading-relaxed">
                        本地开发已接入统一无感代理 (/__ai_proxy)，远程云端接口（如 SenseNova 商汤）自动转发全部凭据头并解除浏览器 CORS。
                      </p>
                    </div>
                  )}
                </div>

                {/* 5. 模型选择与模型映射 (CC-Switch 风格核心) */}
                <div className="border-t border-[var(--line)] pt-3">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                    <span className="font-sans text-xs  text-[var(--ink)]">
                      {lang === "de" ? "Modell-Zuordnung & Eingabe:" : "模型选择与映射 (支持自主填写与列表拉取):"}
                    </span>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() =>
                          handlePullModelsForEp(formBaseUrl, formApiKey, editingEp?.id || "temp")
                        }
                        disabled={pullingEpId === (editingEp?.id || "temp")}
                        className="rounded-[var(--radius)] border border-[var(--line)] bg-[var(--surface)] px-2.5 py-1 text-xs font-sans text-[var(--accent)] hover:border-[var(--accent)] flex items-center gap-1 cursor-pointer transition-colors"
                      >
                        <DownloadIcon />
                        <span>{pullingEpId === (editingEp?.id || "temp") ? "获取中..." : "获取模型列表"}</span>
                      </button>
                    </div>
                  </div>

                  {/* 主模型填写框 */}
                  <div className="space-y-1 mb-2">
                    <label className="text-[var(--text-meta)] font-mono text-[var(--gray)]">
                      实际请求模型 ID (Primary Model):
                    </label>
                    <input
                      value={formModel}
                      onChange={(e) => setFormModel(e.target.value)}
                      placeholder="如: SenseChat-5, deepseek-chat, llama-3-sauerkrautlm-8b-instruct..."
                      className="w-full rounded-[var(--radius)] border border-[var(--line)] px-2.5 py-1.5 text-xs font-mono text-[var(--ink)] focus:border-[var(--accent)]"
                    />
                  </div>

                  {/* 推荐或拉取到的模型一键填入 */}
                  <div className="mb-3 flex flex-wrap gap-1">
                    <span className="text-[var(--text-meta)] font-mono text-[var(--gray)] py-0.5">点击填入:</span>
                    {(editingEp?.recommendedModels || [
                      "SenseChat-5",
                      "llama-3-sauerkrautlm-8b-instruct",
                      "qwen2.5:7b",
                      "deepseek-chat",
                      "gpt-4o-mini",
                    ]).map((m) => (
                      <button
                        key={m}
                        type="button"
                        onClick={() => setFormModel(m)}
                        className={`px-1.5 py-0.5 rounded-[var(--radius)] border text-[var(--text-meta)] font-mono cursor-pointer ${
                          formModel === m
                            ? "bg-[var(--ink)] text-white border-[var(--ink)]"
                            : "bg-[var(--paper)] text-[var(--ink)] border-[var(--line)] hover:border-[var(--accent)]"
                        }`}
                      >
                        {m.split("/").pop()}
                      </button>
                    ))}
                    {pulledModelsMap[editingEp?.id || "temp"]?.map((m) => (
                      <button
                        key={m}
                        type="button"
                        onClick={() => setFormModel(m)}
                        className="px-1.5 py-0.5 rounded-[var(--radius)] border bg-[var(--paper-subtle)] text-[var(--success)] border-[var(--success)] text-[var(--text-meta)] font-mono cursor-pointer hover:border-[var(--success)]"
                      >
                        {m.split("/").pop()}
                      </button>
                    ))}
                  </div>

                  {/* 细分角色映射表格 (CC-Switch 风格) */}
                  <div className="border border-[var(--line)] rounded-[var(--radius)] overflow-hidden">
                    <table className="w-full text-left font-mono text-xs">
                      <thead className="bg-[var(--paper)] border-b border-[var(--line)] text-[var(--gray)]">
                        <tr>
                          <th className="p-2 w-1/3">功能角色</th>
                          <th className="p-2">实际请求模型 (自定义填写)</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[var(--line)] bg-[var(--surface)]">
                        <tr>
                          <td className="p-2 text-[var(--ink)]">主对话与考纲解答 (Chat)</td>
                          <td className="p-1.5">
                            <input
                              value={formModel}
                              onChange={(e) => setFormModel(e.target.value)}
                              className="w-full rounded-[var(--radius)] border border-[var(--line)] px-2 py-1 text-xs font-mono focus:border-[var(--accent)]"
                            />
                          </td>
                        </tr>
                        <tr>
                          <td className="p-2 text-[var(--ink)]">深度推理与模考批改 (Opus/Deep)</td>
                          <td className="p-1.5">
                            <input
                              value={formModelDeep}
                              onChange={(e) => setFormModelDeep(e.target.value)}
                              placeholder={formModel || "默认沿用主模型"}
                              className="w-full rounded-[var(--radius)] border border-[var(--line)] px-2 py-1 text-xs font-mono focus:border-[var(--accent)]"
                            />
                          </td>
                        </tr>
                        <tr>
                          <td className="p-2 text-[var(--ink)]">快速闪卡与问答 (Haiku/Fast)</td>
                          <td className="p-1.5">
                            <input
                              value={formModelFast}
                              onChange={(e) => setFormModelFast(e.target.value)}
                              placeholder={formModel || "默认沿用主模型"}
                              className="w-full rounded-[var(--radius)] border border-[var(--line)] px-2 py-1 text-xs font-mono focus:border-[var(--accent)]"
                            />
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* 实时测试反馈卡片 (CC-Switch 风格应用内即时闭环) */}
                {modalTestResult && (
                  <div
                    className={`rounded-[var(--radius)] border p-3 text-xs font-mono leading-relaxed transition-colors ${
                      modalTestResult.ok
                        ? "border-[var(--success)] bg-[var(--paper-subtle)] text-[var(--success)]"
                        : "border-[var(--warning)] bg-[var(--paper-subtle)] text-[var(--warning)]"
                    }`}
                  >
                    <div className="flex items-center justify-between  mb-1">
                      <span>
                        <span className="inline-flex items-center gap-1.5">
                          <StatusIcon ok={modalTestResult.ok} />
                          {modalTestResult.ok
                            ? lang === "de" ? "Erfolgreich verbunden / 连通成功" : "连通成功 / Erfolgreich verbunden"
                            : lang === "de" ? "Verbindung fehlgeschlagen / 连通失败" : "连通失败 / Verbindung fehlgeschlagen"}
                          {` (${modalTestResult.latencyMs}ms)`}
                        </span>
                      </span>
                      {modalTestResult.modelDetected && (
                        <span className="text-[var(--text-meta)] text-[var(--accent)] bg-[var(--surface)] px-1.5 py-0.5 rounded-[var(--radius)] border border-[var(--accent)]">
                          {modalTestResult.modelDetected}
                        </span>
                      )}
                    </div>
                    {modalTestResult.replyText && (
                      <p className="mt-1 text-[var(--text-meta)] bg-[var(--surface)]/70 p-2 rounded-[var(--radius)] text-[var(--ink)]">
                        <span className="">{lang === "de" ? "Modell-Antwort: " : "模型回复: "}</span>
                        {modalTestResult.replyText}
                      </p>
                    )}
                    {modalTestResult.errorMessage && (
                      <p className="mt-1 text-[var(--text-meta)] text-[var(--warning)]">
                        {modalTestResult.errorMessage}
                      </p>
                    )}
                    {modalTestResult.remedyTip && (
                      <p className="mt-1.5 text-[var(--text-meta)] text-[var(--warning)] bg-[var(--paper-subtle)] p-2 rounded-[var(--radius)] border border-[var(--warning)]">
                        <span className="">{lang === "de" ? "Hinweis: " : "排查建议: "}</span>
                        {modalTestResult.remedyTip}
                      </p>
                    )}
                  </div>
                )}

                {/* 底部保存与测试按钮 (CC-Switch 经典蓝底保存按钮，参考 102424.png / 102431.png) */}
                <div className="flex items-center justify-between border-t border-[var(--line)] pt-3">
                  <button
                    type="button"
                    onClick={() => {
                      setEditingEp(null);
                      setIsAdding(false);
                      setModalTestResult(null);
                    }}
                    className="rounded-[var(--radius)] border border-[var(--line)] px-4 py-1.5 text-xs font-sans text-[var(--gray)] hover:text-[var(--ink)] cursor-pointer"
                  >
                    {lang === "de" ? "Abbrechen" : "取消"}
                  </button>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={handleTestInsideModal}
                      disabled={modalTesting}
                      className="rounded-[var(--radius)] border border-[var(--accent)] bg-[var(--surface)] px-3.5 py-1.5 text-xs font-sans text-[var(--accent)] hover:bg-[var(--paper-subtle)] disabled:opacity-50 transition-colors flex items-center gap-1.5 cursor-pointer font-medium"
                    >
                      <BoltIcon />
                      <span>
                        {modalTesting
                          ? (lang === "de" ? "Teste..." : "正在测试...")
                          : (lang === "de" ? "Verbindung testen" : "测试连通性")}
                      </span>
                    </button>

                    <button
                      type="button"
                      onClick={handleSaveEditor}
                      className="inline-flex items-center gap-1.5 rounded-[var(--radius)] bg-[var(--accent)] text-white px-6 py-1.5 text-xs font-sans font-medium hover:bg-[var(--accent)]  active:scale-[0.98] transition-colors cursor-pointer"
                    >
                      <svg width="16" height="16" aria-hidden="true" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6">
                        <path d="M12.5 13.5H3.5a1 1 0 0 1-1-1v-9a1 1 0 0 1 1-1h6.5l3.5 3.5v6.5a1 1 0 0 1-1 1z" />
                        <path d="M10.5 13.5v-4h-5v4M4.5 2.5v3h5" />
                      </svg>
                      <span>{lang === "de" ? "Speichern" : "保存"}</span>
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              /* 模式 B: 端点与供应商列表 (参考 CC-Switch 截图 102402.png) */
              <>
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[var(--line)] pb-3">
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={handlePingAll}
                      disabled={pingingAll}
                      className="rounded-[var(--radius)] border border-[var(--line)] bg-[var(--surface)] px-2.5 py-1 text-xs font-sans text-[var(--ink)] hover:border-[var(--accent)] hover:text-[var(--accent)] disabled:opacity-50 transition-colors cursor-pointer"
                    >
                      {pingingAll ? (
                        <span>{lang === "de" ? "Endpunkte werden geprüft … / 测速中…" : "测速中 … / Endpunkte werden geprüft"}</span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5">
                          <BoltIcon />
                          {lang === "de" ? "Alle Endpunkte prüfen / 全部测速" : "全部测速 / Alle Endpunkte prüfen"}
                        </span>
                      )}
                    </button>
                    <button
                      type="button"
                      onClick={handleOpenAdd}
                      className="rounded-[var(--radius)] bg-[var(--ink)] text-[var(--paper)] px-3 py-1 text-xs font-sans hover:bg-[var(--accent)] transition-colors cursor-pointer"
                    >
                      {lang === "de" ? "+ Endpunkt hinzufügen" : "+ 新增端点"}
                    </button>
                  </div>

                  {/* 故障转移备用端点设置 */}
                  <div className="flex items-center gap-2 text-xs font-sans">
                    <span className="text-[var(--gray)]">
                      {lang === "de" ? "Automatischer Fallback-Endpunkt:" : "自动容灾备用端点:"}
                    </span>
                    <select
                      value={fallbackEpId || ""}
                      onChange={(e) => handleSelectFallback(e.target.value || null)}
                      className="rounded-[var(--radius)] border border-[var(--line)] bg-[var(--surface)] px-2 py-1 text-xs font-mono focus:border-[var(--accent)]"
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

                    return (
                      <div
                        key={ep.id}
                        className={`rounded-[var(--radius)] border p-3.5 bg-[var(--surface)] transition-colors flex flex-col justify-between ${
                          isActive
                            ? "border-[var(--accent)] ring-1 ring-[var(--accent)]/20 "
                            : "border-[var(--line)] hover:border-[var(--gray)]"
                        }`}
                      >
                        <div>
                          {/* 标题 & 状态药丸 */}
                          <div className="flex items-center justify-between mb-1.5">
                            <div className="flex items-center gap-1.5">
                              <span className="font-mono text-xs  text-[var(--ink)]">
                                {ep.name}
                              </span>
                              {ep.isPreset ? (
                                <span className="text-[var(--text-meta)] font-mono px-1 py-0.2 rounded-[var(--radius)] bg-[var(--paper-subtle)] text-[var(--gray)]">
                                  Preset
                                </span>
                              ) : (
                                <span className="text-[var(--text-meta)] font-mono px-1 py-0.2 rounded-[var(--radius)] bg-[var(--paper-subtle)] text-[var(--accent)]">
                                  Custom
                                </span>
                              )}
                              <span className="text-[var(--text-meta)] font-mono px-1 py-0.2 rounded-[var(--radius)] bg-[var(--paper)] border border-[var(--line)] text-[var(--gray)]">
                                {ep.baseUrl.includes("localhost") || ep.baseUrl.includes("127.0.0.1")
                                  ? "本地直连"
                                  : "网关代理 (免CORS)"}
                              </span>
                              {ep.upstreamFormat === "anthropic" && (
                                <span className="text-[var(--text-meta)] font-mono px-1 py-0.2 rounded-[var(--radius)] bg-[var(--paper-subtle)] text-[var(--warning)] border border-[var(--warning)]">
                                  Claude/Anthropic
                                </span>
                              )}
                              {ep.customPort && (
                                <span className="text-[var(--text-meta)] font-mono px-1 py-0.2 rounded-[var(--radius)] bg-[var(--paper)] border border-[var(--line)] text-[var(--gray)]">
                                  :{ep.customPort}
                                </span>
                              )}
                            </div>
                            <div className="flex items-center gap-1">
                              {isFallback && (
                                <span className="text-[var(--text-meta)] font-mono px-1.5 py-0.5 rounded-[var(--radius)] bg-[var(--paper-subtle)] text-[var(--warning)]">
                                  Fallback
                                </span>
                              )}
                              <span
                                className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded-[var(--radius)] text-[var(--text-meta)] font-mono ${
                                  ep.status === "online"
                                    ? "bg-[var(--paper-subtle)] text-[var(--success)]"
                                    : ep.status === "offline"
                                    ? "bg-[var(--paper-subtle)] text-[var(--warning)]"
                                    : "bg-[var(--paper-subtle)] text-[var(--gray)]"
                                }`}
                              >
                                <span
                                  className={`w-1.5 h-1.5 rounded-full ${
                                    ep.status === "online"
                                      ? "bg-[var(--success)]"
                                      : ep.status === "offline"
                                      ? "bg-[var(--warning)]"
                                      : "bg-[var(--gray)]"
                                  }`}
                                />
                                {ep.latencyMs
                                  ? `${ep.latencyMs}ms`
                                  : ep.status === "online"
                                  ? "Online"
                                  : ep.status === "offline"
                                  ? "Offline"
                                  : "Ping"}
                              </span>
                            </div>
                          </div>

                          {/* URL & 模型 */}
                          <p className="font-mono text-[var(--text-meta)] text-[var(--gray)] truncate mb-1" title={ep.baseUrl}>
                            {ep.baseUrl}
                          </p>
                          <div className="flex items-center gap-1.5 mb-2">
                            <span className="text-[var(--text-meta)] font-mono text-[var(--gray)]">Model:</span>
                            <span className="text-xs font-mono font-medium text-[var(--ink)] bg-[var(--paper)] px-1.5 py-0.5 rounded-[var(--radius)] border border-[var(--line)]">
                              {ep.model}
                            </span>
                          </div>

                          {/* 内嵌诊断反馈卡片 */}
                          {testResultMap[ep.id] && (
                            <div
                              className={`mt-2 rounded-[var(--radius)] border p-2 text-[var(--text-meta)] font-mono leading-relaxed ${
                                testResultMap[ep.id].ok
                                  ? "border-[var(--success)] bg-[var(--paper-subtle)] text-[var(--success)]"
                                  : "border-[var(--warning)] bg-[var(--paper-subtle)] text-[var(--warning)]"
                              }`}
                            >
                              <div className="flex items-center justify-between ">
                                <span>
                                  <span className="inline-flex items-center gap-1">
                                    <StatusIcon ok={testResultMap[ep.id].ok} />
                                    {testResultMap[ep.id].ok ? "Online / 在线" : "Offline / 离线"}
                                    {` (${testResultMap[ep.id].latencyMs}ms)`}
                                  </span>
                                </span>
                                {testResultMap[ep.id].modelDetected && (
                                  <span className="text-[var(--accent)] truncate max-w-[120px]">
                                    {testResultMap[ep.id].modelDetected}
                                  </span>
                                )}
                              </div>
                              {testResultMap[ep.id].replyText && (
                                <p className="mt-1 bg-[var(--surface)]/70 p-1 rounded-[var(--radius)] text-[var(--ink)] line-clamp-2">
                                  {testResultMap[ep.id].replyText}
                                </p>
                              )}
                              {testResultMap[ep.id].errorMessage && (
                                <p className="mt-0.5 text-[var(--warning)]">
                                  {testResultMap[ep.id].errorMessage}
                                </p>
                              )}
                              {testResultMap[ep.id].remedyTip && (
                                <p className="mt-0.5 text-[var(--warning)] bg-[var(--paper-subtle)] p-1 rounded-[var(--radius)] border border-[var(--warning)]">
                                  {testResultMap[ep.id].remedyTip}
                                </p>
                              )}
                            </div>
                          )}
                        </div>

                        {/* 底部按钮栏 (所有端点包括预设均可编辑!) */}
                        <div className="flex items-center justify-between border-t border-[var(--line)]/60 pt-2 mt-2">
                          <div className="flex items-center gap-1.5">
                            <button
                              type="button"
                              onClick={() => handleTestPing(ep)}
                              disabled={testingEpId === ep.id}
                              className="text-[var(--text-meta)] font-mono text-[var(--gray)] hover:text-[var(--accent)] px-1 disabled:opacity-50 cursor-pointer"
                            >
                              {testingEpId === ep.id ? (
                                <span>{lang === "de" ? "Prüfung … / 测试中…" : "测试中 … / Prüfung"}</span>
                              ) : (
                                <span className="inline-flex items-center gap-1">
                                  <BoltIcon />
                                  {lang === "de" ? "Verbindung testen / 测试连接" : "测试连接 / Verbindung testen"}
                                </span>
                              )}
                            </button>
                            <button
                              type="button"
                              onClick={() => handleTestChatProbe(ep)}
                              disabled={testingEpId === ep.id}
                              className="text-[var(--text-meta)] font-mono text-[var(--accent)] hover:underline px-1 disabled:opacity-50 cursor-pointer"
                            >
                              {testingEpId === ep.id ? (
                                <span>{lang === "de" ? "Chat-Test … / 探针发送中…" : "探针发送中 … / Chat-Test"}</span>
                              ) : (
                                <span className="inline-flex items-center gap-1">
                                  <ChatIcon />
                                  {lang === "de" ? "Chat-Test / 对话探针" : "对话探针 / Chat-Test"}
                                </span>
                              )}
                            </button>
                            <button
                              type="button"
                              onClick={() => handleOpenEditor(ep)}
                              className="text-[var(--text-meta)] font-mono text-[var(--ink)] hover:text-[var(--accent)] px-1 cursor-pointer font-medium"
                            >
                              {lang === "de" ? "Bearbeiten" : "编辑"}
                            </button>
                            {!ep.isPreset && (
                              <button
                                type="button"
                                onClick={() => handleDeleteEp(ep.id)}
                                className="text-[var(--text-meta)] font-mono text-[var(--warning)] hover:underline px-1 cursor-pointer"
                              >
                                {lang === "de" ? "Löschen" : "删除"}
                              </button>
                            )}
                          </div>

                          {isActive ? (
                            <span className="font-mono text-[var(--text-meta)]  text-[var(--accent)]">
{lang === "de" ? "Aktiviert / 当前主路由" : "当前主路由 / Aktiviert"}
                            </span>
                          ) : (
                            <button
                              type="button"
                              onClick={() => handleSelectActive(ep.id)}
                              className="rounded-[var(--radius)] border border-[var(--line)] bg-[var(--surface)] px-2 py-0.5 text-xs font-sans hover:border-[var(--accent)] hover:text-[var(--accent)] cursor-pointer"
                            >
                              {lang === "de" ? "Als Aktiv setzen" : "设为主路由"}
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </>
            )}
          </div>
        )}

        {/* ==================== TAB 3: Token 看板 (Token Ledger) ==================== */}
        {tab === "tokens" && (
          <div className="space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[var(--line)] pb-2">
              <span className="font-sans text-xs text-[var(--gray)]">
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
                className="text-[var(--text-meta)] font-mono text-[var(--warning)] hover:underline cursor-pointer"
              >
                {lang === "de" ? "Historie leeren" : "清空统计账本"}
              </button>
            </div>

            {/* 核心指标卡 (Tufte 风格) */}
            <div className="grid gap-3 sm:grid-cols-4">
              <div className="rounded-[var(--radius)] border border-[var(--line)] bg-[var(--surface)] p-3">
                <span className="font-mono text-[var(--text-meta)] uppercase tracking-wider text-[var(--gray)] block mb-1">
                  {lang === "de" ? "Heute Verbraucht" : "今日消耗"}
                </span>
                <span className="font-mono text-lg  text-[var(--ink)]">
                  {tokenSummary.todayTotal.toLocaleString()}
                </span>
                <div className="mt-2 w-full bg-[var(--paper)] h-1.5 rounded-full overflow-hidden border border-[var(--line)]">
                  <div
                    className={`h-full ${budgetStatus.exceeded ? "bg-[var(--warning)]" : "bg-[var(--accent)]"}`}
                    style={{ width: `${budgetStatus.pct}%` }}
                  />
                </div>
                <span className="text-[var(--text-meta)] font-mono text-[var(--gray)] mt-1 block">
                  {budgetStatus.pct}% {lang === "de" ? "von Tagesbudget" : "每日预算限额"}
                </span>
              </div>

              <div className="rounded-[var(--radius)] border border-[var(--line)] bg-[var(--surface)] p-3">
                <span className="font-mono text-[var(--text-meta)] uppercase tracking-wider text-[var(--gray)] block mb-1">
                  {lang === "de" ? "Gesamt Token" : "历史总消耗"}
                </span>
                <span className="font-mono text-lg  text-[var(--ink)]">
                  {tokenSummary.allTimeTotal.toLocaleString()}
                </span>
                <span className="text-[var(--text-meta)] font-mono text-[var(--gray)] block mt-2">
                  In {tokenSummary.promptTotal} / Out {tokenSummary.completionTotal}
                </span>
              </div>

              <div className="rounded-[var(--radius)] border border-[var(--success)] bg-[var(--paper-subtle)] p-3">
                <span className="font-mono text-[var(--text-meta)] uppercase tracking-wider text-[var(--success)] block mb-1">
                  <span className="inline-flex items-center gap-1">
                    <BoltIcon />
                    {lang === "de" ? "CCR Algorithmus-Ersparnis / CCR 压缩节省" : "CCR 压缩算法节省 / CCR Algorithmus-Ersparnis"}
                  </span>
                </span>
                <span className="font-mono text-lg  text-[var(--success)]">
                  +{tokenSummary.savedTotalCCR.toLocaleString()}
                </span>
                <span className="text-[var(--text-meta)] font-mono text-[var(--success)] block mt-2">
                  {lang === "de" ? "Token durch Headroom CCR gerettet" : "无损缓存已为您省下的 Token"}
                </span>
              </div>

              <div className="rounded-[var(--radius)] border border-[var(--line)] bg-[var(--surface)] p-3">
                <span className="font-mono text-[var(--text-meta)] uppercase tracking-wider text-[var(--gray)] block mb-1">
                  {lang === "de" ? "Anfragen Total" : "累计调用轮次"}
                </span>
                <span className="font-mono text-lg  text-[var(--ink)]">
                  {tokenSummary.requestCount}
                </span>
                <span className="text-[var(--text-meta)] font-mono text-[var(--gray)] block mt-2">
                  {tokenSummary.requestCount > 0
                    ? `Ø ~${Math.round(tokenSummary.allTimeTotal / tokenSummary.requestCount)} tok/Req`
                    : "0 tok/Req"}
                </span>
              </div>
            </div>

            {/* 每日预算设置 */}
            <div className="rounded-[var(--radius)] border border-[var(--line)] bg-[var(--surface)] p-3 flex flex-wrap items-center justify-between gap-2">
              <span className="text-xs font-sans text-[var(--ink)]">
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
                  className="w-32 rounded-[var(--radius)] border border-[var(--line)] px-2 py-1 text-xs font-mono focus:border-[var(--accent)]"
                />
                <span className="text-xs font-mono text-[var(--gray)]">Tokens/Tag</span>
              </div>
            </div>

            {/* 最近调用明细表 */}
            <div>
              <h4 className="font-mono text-xs  text-[var(--ink)] mb-2">
                {lang === "de" ? "Letzte Aufrufe (Auszug)" : "近期调用流水 (近 8 次)"}:
              </h4>
              {recentRecords.length === 0 ? (
                <p className="font-mono text-xs text-[var(--gray)] py-2">
                  {lang === "de" ? "Noch keine Token-Aufrufe verzeichnet." : "暂无调用记录。提问后将自动入账。"}
                </p>
              ) : (
                <div className="overflow-x-auto border border-[var(--line)] rounded-[var(--radius)]">
                  <table className="w-full text-left font-mono text-xs">
                    <thead className="bg-[var(--paper)] border-b border-[var(--line)] text-[var(--gray)]">
                      <tr>
                        <th className="p-2">Zeit</th>
                        <th className="p-2">Endpunkt</th>
                        <th className="p-2">Modell</th>
                        <th className="p-2">Prompt</th>
                        <th className="p-2">Output</th>
                        <th className="p-2">Total</th>
                        <th className="p-2 text-[var(--success)]">CCR Saved</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[var(--line)] bg-[var(--surface)]">
                      {recentRecords.map((r) => (
                        <tr key={r.id}>
                          <td className="p-2 text-[var(--gray)]">
                            {new Date(r.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                          </td>
                          <td className="p-2 text-[var(--ink)]">{r.endpointId.replace("ep-", "")}</td>
                          <td className="p-2 text-[var(--ink)] truncate max-w-[120px]">{r.model.split("/").pop()}</td>
                          <td className="p-2 text-[var(--gray)]">{r.promptTokens}</td>
                          <td className="p-2 text-[var(--gray)]">{r.completionTokens}</td>
                          <td className="p-2  text-[var(--ink)]">{r.totalTokens}</td>
                          <td className="p-2 text-[var(--success)]">+{r.savedTokensCCR || 0}</td>
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
            <div className="rounded-[var(--radius)] border border-[var(--line)] bg-[var(--surface)] p-3">
              <label className="block text-xs font-sans text-[var(--gray)] mb-2">
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
                    className={`px-3 py-1.5 rounded-[var(--radius)] font-sans text-xs transition-colors cursor-pointer ${
                      cfg.engine === e
                        ? "bg-[var(--ink)] text-white"
                        : "border border-[var(--line)] text-[var(--ink)] hover:bg-[var(--paper)]"
                    }`}
                  >
                    {engineLabel(e, lang)}
                  </button>
                ))}
              </div>
            </div>

            {/* 向量检索与镜像 */}
            <div className="rounded-[var(--radius)] border border-[var(--line)] bg-[var(--surface)] p-3 space-y-3">
              <h4 className="font-mono text-xs  text-[var(--ink)]">
                {lang === "de" ? "Lokale Vektorsuche & Embeddings (L1 / L2)" : "本地向量检索与语义嵌入 (L1/L2)"}
              </h4>
              <div className="flex flex-wrap items-center gap-3">
                <span className="font-sans text-xs text-[var(--gray)]">{tr.aiVector}</span>
                <select
                  value={cfg.vectorMode}
                  onChange={(e) => updateLegacyCfg({ vectorMode: e.target.value as AiConfig["vectorMode"] })}
                  className="rounded-[var(--radius)] border border-[var(--line)] px-2 py-1 text-xs font-mono focus:border-[var(--accent)]"
                >
                  <option value="off">{tr.aiVectorOff}</option>
                  <option value="auto">{tr.aiVectorAuto}</option>
                  <option value="on">{tr.aiVectorOn}</option>
                </select>
                <span className="font-mono text-xs text-[var(--gray)]">
                  {vecReady ? tr.aiVectorReady : vecPct !== null ? `${Math.round(vecPct * 100)} %` : tr.aiVectorIdle}
                </span>
              </div>

              <div>
                <label className="block text-xs font-sans text-[var(--gray)] mb-1">
                  {tr.aiMirror}:
                </label>
                <input
                  value={cfg.hfMirror}
                  onChange={(e) => updateLegacyCfg({ hfMirror: e.target.value })}
                  placeholder="https://hf-mirror.com"
                  className="w-full rounded-[var(--radius)] border border-[var(--line)] px-2.5 py-1 text-xs font-mono focus:border-[var(--accent)]"
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
                  className="rounded-[var(--radius)] border border-[var(--line)] bg-[var(--surface)] px-3 py-1.5 font-sans text-xs hover:border-[var(--accent)] hover:text-[var(--accent)] disabled:opacity-50 cursor-pointer"
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
                    className="font-mono text-xs text-[var(--gray)] hover:text-[var(--accent)] underline"
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
}
