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
});
