import { describe, it, expect, beforeEach, vi } from "vitest";
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
  PRESET_ENDPOINTS,
} from "./endpoints";

describe("src/ai/endpoints.ts - CC-Switch Style Endpoint Management", () => {
  beforeEach(() => {
    localStorage.clear();
    vi.restoreAllMocks();
  });

  it("initializes preset endpoints on first launch", () => {
    const endpoints = loadEndpoints();
    expect(endpoints.length).toBeGreaterThanOrEqual(PRESET_ENDPOINTS.length);
    expect(endpoints.find((e) => e.id === "ep-lmstudio")).toBeDefined();
    expect(endpoints.find((e) => e.id === "ep-deepseek")).toBeDefined();
  });

  it("manages active and fallback endpoints cleanly", () => {
    expect(getActiveEndpointId()).toBe("ep-lmstudio");

    setActiveEndpointId("ep-deepseek");
    expect(getActiveEndpointId()).toBe("ep-deepseek");

    const activeEp = getActiveEndpoint();
    expect(activeEp.id).toBe("ep-deepseek");
    expect(activeEp.name).toContain("DeepSeek");

    expect(getFallbackEndpointId()).toBeNull();
    setFallbackEndpointId("ep-openrouter");
    expect(getFallbackEndpointId()).toBe("ep-openrouter");
    setFallbackEndpointId(null);
    expect(getFallbackEndpointId()).toBeNull();
  });

  it("adds, updates and deletes custom endpoints without touching presets", () => {
    const custom = addEndpoint({
      name: "School Proxy Relay",
      providerId: "custom",
      baseUrl: "https://proxy.school.edu/v1",
      apiKey: "sk-school-123",
      model: "gpt-4o",
      enabled: true,
    });

    expect(custom.id).toMatch(/^ep-custom-/);
    expect(custom.isPreset).toBe(false);

    // Update
    const updated = updateEndpoint(custom.id, { model: "gpt-4o-mini" });
    expect(updated?.model).toBe("gpt-4o-mini");

    // Cannot delete preset
    const deletePresetRes = deleteEndpoint("ep-lmstudio");
    expect(deletePresetRes).toBe(false);

    // Can delete custom
    const deleteCustomRes = deleteEndpoint(custom.id);
    expect(deleteCustomRes).toBe(true);

    const reloaded = loadEndpoints();
    expect(reloaded.find((e) => e.id === custom.id)).toBeUndefined();
  });

  it("pings endpoint and measures latency", async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      status: 200,
    } as unknown as Response);

    const ep = getActiveEndpoint();
    const res = await pingEndpoint(ep);
    expect(res.status).toBe("online");
    expect(res.latencyMs).toBeGreaterThanOrEqual(0);
  });

  it("tests in-app chat probe with valid messages payload and parses reply", async () => {
    const { testEndpointChat } = await import("./endpoints");
    let capturedBody: any = null;

    global.fetch = vi.fn().mockImplementation(async (_url, init) => {
      capturedBody = JSON.parse(init.body as string);
      return {
        ok: true,
        status: 200,
        json: async () => ({
          model: "llama-3-sauerkrautlm-8b-instruct",
          choices: [{ message: { content: "Bereit für Klausurfragen." } }],
        }),
      } as unknown as Response;
    });

    const ep = getActiveEndpoint();
    const probeRes = await testEndpointChat(ep, "Hallo Test");

    expect(probeRes.ok).toBe(true);
    expect(probeRes.replyText).toBe("Bereit für Klausurfragen.");
    expect(probeRes.modelDetected).toBe("llama-3-sauerkrautlm-8b-instruct");
    // 验证请求体 messages 字段绝对非空
    expect(capturedBody).toBeDefined();
    expect(Array.isArray(capturedBody.messages)).toBe(true);
    expect(capturedBody.messages.length).toBeGreaterThan(0);
    expect(capturedBody.messages[0].role).toBe("user");
  });

  it("provides helpful remedy tips when LM Studio port or CORS fails", async () => {
    const { testEndpointChat } = await import("./endpoints");
    global.fetch = vi.fn().mockRejectedValue(new TypeError("Failed to fetch"));

    const ep = getActiveEndpoint(); // baseUrl: http://localhost:1234/v1
    const probeRes = await testEndpointChat(ep);

    expect(probeRes.ok).toBe(false);
    expect(probeRes.errorType).toBe("cors");
    expect(probeRes.remedyTip).toContain("Enable CORS");
  });

  it("builds correct headers and URLs for Anthropic Messages, custom ports, and full URLs", async () => {
    const { buildEndpointHeaders, buildEndpointUrl } = await import("./endpoints");

    // 1. Anthropic format headers
    const anthropicEp = {
      id: "ep-sensenova",
      name: "SenseNova",
      providerId: "sensenova" as const,
      baseUrl: "https://token.sensenova.cn",
      apiKey: "sk-sensenova-test",
      model: "sensenova-6.8-flash-lite",
      enabled: true,
      upstreamFormat: "anthropic" as const,
      authHeaderType: "ANTHROPIC_AUTH_TOKEN" as const,
    };

    const headers = buildEndpointHeaders(anthropicEp);
    expect(headers["x-api-key"]).toBe("sk-sensenova-test");
    expect(headers["anthropic-version"]).toBe("2023-06-01");
    expect(headers["Authorization"]).toBe("Bearer sk-sensenova-test");

    // 2. Anthropic format chat URL
    const anthropicUrl = buildEndpointUrl(anthropicEp, "chat");
    expect(anthropicUrl).toBe("https://token.sensenova.cn/v1/messages");

    // 3. Custom port URL
    const portEp = {
      ...anthropicEp,
      baseUrl: "http://192.168.1.100",
      customPort: 8080,
    };
    const portUrl = buildEndpointUrl(portEp, "chat");
    expect(portUrl).toBe("http://192.168.1.100:8080/v1/messages");

    // 4. Full URL toggle
    const fullUrlEp = {
      ...anthropicEp,
      baseUrl: "https://my-relay.internal/custom-path",
      isFullUrl: true,
    };
    const fullUrl = buildEndpointUrl(fullUrlEp, "chat");
    expect(fullUrl).toBe("https://my-relay.internal/custom-path");

    // 5. Custom Auth Header
    const customHeaderEp = {
      ...anthropicEp,
      authHeaderType: "custom" as const,
      customAuthHeader: "X-Custom-Token",
    };
    const customHeaders = buildEndpointHeaders(customHeaderEp);
    expect(customHeaders["X-Custom-Token"]).toBe("sk-sensenova-test");
  });
});
