import { describe, expect, it } from "vitest";
import {
  buildDiagramPrompt,
  clearDiagramCache,
  diagramCacheKey,
  getCachedSvg,
  sanitizeSvg,
  setCachedSvg,
} from "./diagram";

describe("buildDiagramPrompt", () => {
  it("system-regeln + user-vorlage drin", () => {
    const msgs = buildDiagramPrompt("A --> B", "Markt", "SoWi");
    expect(msgs[0].role).toBe("system");
    expect(msgs[0].content).toContain("NUR mit dem <svg");
    expect(msgs[1].content).toContain("A --> B");
  });
});

describe("sanitizeSvg", () => {
  const good = `<svg viewBox="0 0 400 260"><g><rect x="1" y="1" width="10" height="10"/><text>Markt 市场</text></g></svg>`;

  it("gueltig passiert", () => {
    expect(sanitizeSvg(good)).toBe(good);
  });

  it("markdown-huellen werden abgestreift, svg extrahiert", () => {
    expect(sanitizeSvg(`hier:\n\`\`\`svg\n${good}\n\`\`\``)).toBe(good);
  });

  it("event-attribute werden gestrippt, rest bleibt; script/foreignObject -> null", () => {
    const stripped = sanitizeSvg(`<svg viewBox="0 0 1 1"><rect onclick="x()" x="1"/></svg>`);
    expect(stripped).not.toBeNull();
    expect(stripped!).not.toMatch(/onclick/i);
    expect(sanitizeSvg(`<svg viewBox="0 0 1 1"><script>alert(1)</script></svg>`)).toBeNull();
    expect(sanitizeSvg(`<svg viewBox="0 0 1 1"><foreignObject/></svg>`)).toBeNull();
  });

  it("javascript-uri / kein viewBox / kein svg -> null", () => {
    expect(sanitizeSvg(`<svg viewBox="0 0 1 1"><a href="javascript:alert(1)">x</a></svg>`)).toBeNull();
    expect(sanitizeSvg(`<svg><rect/></svg>`)).toBeNull();
    expect(sanitizeSvg("nur text")).toBeNull();
    expect(sanitizeSvg("")).toBeNull();
  });
});

describe("diagram-cache", () => {
  it("key/set/get/clear", () => {
    clearDiagramCache();
    const k = diagramCacheKey("kurs", 3, 0);
    expect(getCachedSvg(k)).toBeUndefined();
    setCachedSvg(k, "<svg/>");
    expect(getCachedSvg(k)).toBe("<svg/>");
    clearDiagramCache();
    expect(getCachedSvg(k)).toBeUndefined();
  });
});
