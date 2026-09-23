import { describe, it, expect, vi, beforeEach } from "vitest";
import { probeAiConnection, pullModelList, subscribeHeartbeat } from "./heartbeat";
import * as providers from "./providers";

describe("src/ai/heartbeat.ts - AI Engine Heartbeat & Probe", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("meldet status 'disabled' wenn KI-Engine ausgeschaltet ist", async () => {
    vi.spyOn(providers, "loadAiConfig").mockReturnValue({
      version: 1,
      engine: "off",
      providerId: "off",
      apiKey: "",
      model: "",
      baseUrl: "",
      embedModel: "",
      vectorMode: "auto",
      hfMirror: "",
    });

    const res = await probeAiConnection();
    expect(res.status).toBe("disabled");
  });

  it("meldet status 'online' mit Latenz und Modellen bei erreichbarem /models Endpunkt", async () => {
    vi.spyOn(providers, "loadAiConfig").mockReturnValue({
      version: 1,
      engine: "api",
      providerId: "ollama",
      apiKey: "",
      model: "qwen3:8b",
      baseUrl: "http://localhost:11434/v1",
      embedModel: "",
      vectorMode: "auto",
      hfMirror: "",
    });

    const mockFetch = vi.fn().mockResolvedValue({
      ok: true,
      status: 200,
      json: async () => ({
        data: [{ id: "qwen3:8b" }, { id: "llama3.2:3b" }],
      }),
    });

    const res = await probeAiConnection(mockFetch as unknown as typeof fetch);
    expect(res.status).toBe("online");
    expect(res.detectedModels).toEqual(["qwen3:8b", "llama3.2:3b"]);
    expect(res.latencyMs).toBeGreaterThanOrEqual(0);
  });

  it("meldet status 'offline' bei Netzwerkfehlern oder Timeout", async () => {
    vi.spyOn(providers, "loadAiConfig").mockReturnValue({
      version: 1,
      engine: "api",
      providerId: "ollama",
      apiKey: "",
      model: "qwen3:8b",
      baseUrl: "http://localhost:11434/v1",
      embedModel: "",
      vectorMode: "auto",
      hfMirror: "",
    });

    const mockFetch = vi.fn().mockRejectedValue(new Error("Connection refused"));

    const res = await probeAiConnection(mockFetch as unknown as typeof fetch);
    expect(res.status).toBe("offline");
    expect(res.error).toContain("Connection refused");
  });

  it("manueller pull: haengender endpoint bricht nach timeoutMs ab", async () => {
    vi.spyOn(providers, "loadAiConfig").mockReturnValue({
      version: 1,
      engine: "api",
      providerId: "custom",
      apiKey: "sk-x",
      model: "",
      baseUrl: "https://relay.example/v1",
      embedModel: "",
      vectorMode: "auto",
      hfMirror: "",
    });

    // nie antwortend + abort beachten (ccswitch-pull darf nicht haengen)
    const mockFetch = vi.fn().mockImplementation((_url: string, opts?: { signal?: AbortSignal }) => {
      return new Promise((_resolve, reject) => {
        opts?.signal?.addEventListener("abort", () => reject(new DOMException("aborted", "AbortError")));
      });
    });

    const res = await probeAiConnection(mockFetch as unknown as typeof fetch, 500);
    expect(res.status).toBe("offline");
    expect(mockFetch).toHaveBeenCalledOnce();
    const calledUrl = mockFetch.mock.calls[0][0] as string;
    expect(calledUrl).toBe("https://relay.example/v1/models");
  });

  it("benachrichtigt Abonnenten über Zustandsänderungen", async () => {
    vi.spyOn(providers, "loadAiConfig").mockReturnValue({
      version: 1,
      engine: "off",
      providerId: "off",
      apiKey: "",
      model: "",
      baseUrl: "",
      embedModel: "",
      vectorMode: "auto",
      hfMirror: "",
    });

    const received: string[] = [];
    const unsubscribe = subscribeHeartbeat((s) => received.push(s.status));

    await probeAiConnection();
    expect(received).toContain("disabled");

    unsubscribe();
  });

  it("pull: dev-proxy zuerst (CORS-frei)", async () => {
    const mockFetch = vi.fn().mockImplementation((url: string) => {
      if (String(url).includes("/__models?")) {
        return Promise.resolve({
          ok: true,
          json: async () => ({ ok: true, status: 200, body: JSON.stringify({ data: [{ id: "a" }, { id: "b" }, {}] }) }),
        });
      }
      return Promise.reject(new Error("darf nicht direkt"));
    });
    const r = await pullModelList("https://relay.example/v1", "sk-x", 8000, mockFetch as unknown as typeof fetch);
    expect(r.via).toBe("proxy");
    expect(r.models).toEqual(["a", "b"]);
  });

  it("pull: ohne proxy -> direkt fallback + HTTP-status durchgereicht", async () => {
    const mockFetch = vi.fn().mockImplementation((url: string) => {
      if (String(url).includes("/__models?")) {
        return Promise.resolve({ ok: false, json: async () => ({}) }); // kein envelope
      }
      return Promise.resolve({ ok: false, status: 401, json: async () => ({}) });
    });
    const r = await pullModelList("https://relay.example/v1/", "sk-x", 8000, mockFetch as unknown as typeof fetch);
    expect(r.via).toBe("direct");
    expect(r.error).toBe("HTTP 401");
    expect(r.models).toEqual([]);
  });

  it("pull: browser-CORS (TypeError) -> CORS_BLOCK statt kauderwelsch", async () => {
    const mockFetch = vi.fn().mockImplementation((url: string) => {
      if (String(url).includes("/__models?")) return Promise.reject(new TypeError("fetch failed"));
      return Promise.reject(new TypeError("Failed to fetch"));
    });
    const r = await pullModelList("https://relay.example/v1", "sk-x", 8000, mockFetch as unknown as typeof fetch);
    expect(r.via).toBe("direct");
    expect(r.error).toBe("CORS_BLOCK");
  });
});
