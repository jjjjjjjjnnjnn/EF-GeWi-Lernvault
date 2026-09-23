import { describe, expect, it } from "vitest";
import {
  PROVIDERS,
  effectiveBaseUrl,
  getProvider,
  DEFAULT_AI,
} from "./providers";

const cfg = (over: Record<string, unknown> = {}) => ({ ...DEFAULT_AI, ...over });

describe("provider-presets", () => {
  it("neue presets vorhanden (zen/sensenova/custom letzt)", () => {
    const ids = PROVIDERS.map((p) => p.id);
    expect(ids).toContain("opencode-zen");
    expect(ids).toContain("sensenova");
    expect(ids[ids.length - 1]).toBe("custom"); // fallback-anker
    expect(getProvider("opencode-zen").baseUrl).toBe("https://opencode.ai/zen/v1");
    expect(getProvider("sensenova").baseUrl).toBe("https://token.sensenova.cn/v1");
  });

  it("unbekannte id faellt auf custom zurueck", () => {
    expect(getProvider("r4qodes").id).toBe("custom");
  });

  it("effectiveBaseUrl: preset / override / custom", () => {
    expect(effectiveBaseUrl(cfg({ providerId: "groq", baseUrl: "" }))).toBe(
      "https://api.groq.com/openai/v1"
    );
    // override schlaegt preset (freie relays)
    expect(effectiveBaseUrl(cfg({ providerId: "groq", baseUrl: "https://relay.example/v1 " }))).toBe(
      "https://relay.example/v1"
    );
    expect(effectiveBaseUrl(cfg({ providerId: "custom", baseUrl: "https://token.sensenova.cn/v1" }))).toBe(
      "https://token.sensenova.cn/v1"
    );
  });
});
