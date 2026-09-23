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
});
