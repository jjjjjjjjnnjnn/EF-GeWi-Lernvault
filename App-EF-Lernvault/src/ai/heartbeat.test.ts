import { describe, it, expect, vi, beforeEach } from "vitest";
import { probeAiConnection, subscribeHeartbeat } from "./heartbeat";
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
});
