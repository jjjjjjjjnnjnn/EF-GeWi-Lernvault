// CC-Switch 风格多端点管理与配置核心 (Clean-Room 原生实现)
// 支持多端点独立配置、延迟探测、连通状态监控与活跃路由切换
// 零外部代码依赖，严格遵守项目规范与 MIT/Apache 署名契约

export interface AiEndpoint {
  id: string;
  name: string;
  providerId: string; // e.g. "lmstudio" | "ollama" | "deepseek" | "openrouter" | "siliconflow" | "custom"
  baseUrl: string;
  apiKey: string;
  model: string;
  enabled: boolean;
  isPreset?: boolean;
  status?: "online" | "offline" | "untested" | "checking";
  latencyMs?: number | null;
  lastChecked?: number;
  description?: string;
}

export const PRESET_ENDPOINTS: AiEndpoint[] = [
  {
    id: "ep-lmstudio",
    name: "LM Studio (本地 1234)",
    providerId: "ollama",
    baseUrl: "http://localhost:1234/v1",
    apiKey: "",
    model: "qwen2.5:7b",
    enabled: true,
    isPreset: true,
    status: "untested",
    description: "本地独立显卡/CPU 推理，免填 Key，100% 隐私",
  },
  {
    id: "ep-ollama",
    name: "Ollama (本地 11434)",
    providerId: "ollama",
    baseUrl: "http://localhost:11434/v1",
    apiKey: "",
    model: "qwen2.5:7b",
    enabled: true,
    isPreset: true,
    status: "untested",
    description: "本地轻量级 Ollama 守护进程，免填 Key",
  },
  {
    id: "ep-deepseek",
    name: "DeepSeek (官方 API)",
    providerId: "deepseek",
    baseUrl: "https://api.deepseek.com/v1",
    apiKey: "",
    model: "deepseek-chat",
    enabled: true,
    isPreset: true,
    status: "untested",
    description: "高性价比、超强中文与逻辑理解，需填 Key",
  },
  {
    id: "ep-openrouter",
    name: "OpenRouter (免费池 & 聚合)",
    providerId: "openrouter",
    baseUrl: "https://openrouter.ai/api/v1",
    apiKey: "",
    model: "openai/gpt-oss-20b:free",
    enabled: true,
    isPreset: true,
    status: "untested",
    description: "汇聚数十款免费与商业大模型",
  },
  {
    id: "ep-siliconflow",
    name: "SiliconFlow (硅基流动)",
    providerId: "siliconflow",
    baseUrl: "https://api.siliconflow.cn/v1",
    apiKey: "",
    model: "Qwen/Qwen3-8B",
    enabled: true,
    isPreset: true,
    status: "untested",
    description: "Qwen3-8B 永久免费极速体验",
  },
  {
    id: "ep-sensenova",
    name: "SenseNova (商汤日日新)",
    providerId: "sensenova",
    baseUrl: "https://token.sensenova.cn/v1",
    apiKey: "",
    model: "SenseChat-5",
    enabled: true,
    isPreset: true,
    status: "untested",
    description: "国内商用大模型，支持支付宝支付",
  },
];

const ENDPOINTS_STORAGE_KEY = "eflernvault:endpoints:v1";
const ACTIVE_ENDPOINT_KEY = "eflernvault:active_endpoint:v1";
const FALLBACK_ENDPOINT_KEY = "eflernvault:fallback_endpoint:v1";

/**
 * 加载所有配置端点（包含内置预设与用户自定义端点，并自动迁移旧配置）
 */
export function loadEndpoints(): AiEndpoint[] {
  try {
    const raw = localStorage.getItem(ENDPOINTS_STORAGE_KEY);
    if (!raw) {
      // 首次加载初始化预设
      saveEndpoints(PRESET_ENDPOINTS);
      return PRESET_ENDPOINTS;
    }
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed) || parsed.length === 0) {
      saveEndpoints(PRESET_ENDPOINTS);
      return PRESET_ENDPOINTS;
    }

    // 确保内置预设存在（如新增预设则合并）
    const merged = [...parsed];
    for (const preset of PRESET_ENDPOINTS) {
      if (!merged.some((e) => e.id === preset.id)) {
        merged.push(preset);
      }
    }
    return merged;
  } catch {
    return PRESET_ENDPOINTS;
  }
}

/**
 * 保存端点列表至 localStorage
 */
export function saveEndpoints(endpoints: AiEndpoint[]): void {
  try {
    localStorage.setItem(ENDPOINTS_STORAGE_KEY, JSON.stringify(endpoints));
  } catch {
    // 忽略异常
  }
}

/**
 * 获取当前活跃的主端点 ID
 */
export function getActiveEndpointId(): string {
  try {
    const active = localStorage.getItem(ACTIVE_ENDPOINT_KEY);
    if (active) return active;
  } catch {
    // 忽略异常
  }
  return "ep-lmstudio";
}

/**
 * 设置活跃主端点
 */
export function setActiveEndpointId(id: string): void {
  try {
    localStorage.setItem(ACTIVE_ENDPOINT_KEY, id);
  } catch {
    // 忽略异常
  }
}

/**
 * 获取备用端点 ID（故障自动转移时使用）
 */
export function getFallbackEndpointId(): string | null {
  try {
    return localStorage.getItem(FALLBACK_ENDPOINT_KEY);
  } catch {
    return null;
  }
}

/**
 * 设置备用端点 ID
 */
export function setFallbackEndpointId(id: string | null): void {
  try {
    if (!id) {
      localStorage.removeItem(FALLBACK_ENDPOINT_KEY);
    } else {
      localStorage.setItem(FALLBACK_ENDPOINT_KEY, id);
    }
  } catch {
    // 忽略异常
  }
}

/**
 * 获取当前活跃端点对象（若未找到则安全降级回第一个可用预设）
 */
export function getActiveEndpoint(): AiEndpoint {
  const all = loadEndpoints();
  const activeId = getActiveEndpointId();
  const found = all.find((e) => e.id === activeId);
  if (found) return found;
  return all[0] || PRESET_ENDPOINTS[0];
}

/**
 * 添加新的自定义端点
 */
export function addEndpoint(endpoint: Omit<AiEndpoint, "id"> & { id?: string }): AiEndpoint {
  const all = loadEndpoints();
  const id = endpoint.id || `ep-custom-${Date.now()}`;
  const newEp: AiEndpoint = {
    ...endpoint,
    id,
    enabled: true,
    isPreset: false,
    status: "untested",
  };
  const updated = [...all, newEp];
  saveEndpoints(updated);
  return newEp;
}

/**
 * 更新指定端点配置
 */
export function updateEndpoint(id: string, patch: Partial<AiEndpoint>): AiEndpoint | null {
  const all = loadEndpoints();
  let updatedEp: AiEndpoint | null = null;
  const next = all.map((ep) => {
    if (ep.id === id) {
      updatedEp = { ...ep, ...patch };
      return updatedEp;
    }
    return ep;
  });
  if (updatedEp) {
    saveEndpoints(next);
  }
  return updatedEp;
}

/**
 * 删除自定义端点（内置预设不可删除，仅可禁用）
 */
export function deleteEndpoint(id: string): boolean {
  const all = loadEndpoints();
  const target = all.find((e) => e.id === id);
  if (!target || target.isPreset) return false;

  const next = all.filter((e) => e.id !== id);
  saveEndpoints(next);

  // 若删除的是活跃端点，回退至默认端点
  if (getActiveEndpointId() === id) {
    setActiveEndpointId(next[0]?.id || "ep-lmstudio");
  }
  if (getFallbackEndpointId() === id) {
    setFallbackEndpointId(null);
  }
  return true;
}

/**
 * 单个端点测速与连通性探针 (Ping)
 */
export async function pingEndpoint(
  endpoint: AiEndpoint,
  timeoutMs = 4000
): Promise<{ status: "online" | "offline"; latencyMs: number; error?: string }> {
  const start = performance.now();
  const base = endpoint.baseUrl.trim().replace(/\/$/, "");
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);

  const headers: Record<string, string> = {};
  if (endpoint.apiKey.trim()) {
    headers.Authorization = `Bearer ${endpoint.apiKey.trim()}`;
  }

  try {
    const res = await fetch(`${base}/models`, {
      method: "GET",
      headers,
      signal: controller.signal,
    });
    clearTimeout(timer);
    const latency = Math.round(performance.now() - start);

    if (res.ok || res.status === 401 || res.status === 403) {
      // 401/403 说明服务器在线且响应，仅凭据需校验
      return { status: "online", latencyMs: latency };
    }
    return { status: "offline", latencyMs: latency, error: `HTTP ${res.status}` };
  } catch (err) {
    clearTimeout(timer);
    const latency = Math.round(performance.now() - start);
    const msg = err instanceof DOMException && err.name === "AbortError" ? "Timeout" : "Connection Failed";
    return { status: "offline", latencyMs: latency, error: msg };
  }
}
