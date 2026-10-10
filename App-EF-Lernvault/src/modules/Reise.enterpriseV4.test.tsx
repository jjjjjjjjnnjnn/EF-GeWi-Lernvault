import { describe, expect, it } from "vitest";
import { parseReiseFile, type SchrittAusprobieren, type SchrittSzenario } from "../reise";
import fs from "fs";
import path from "path";

describe("Enterprise-v4 Courses & Version Coexistence Integration", () => {
  const lernreiseDir = path.resolve(__dirname, "../../../Lernreise");

  const v4CourseFiles = [
    {
      file: "SoWi-Mietendeckel-und-Preisinterventionen-L1.md",
      fach: "SoWi",
      expectedTool: "markt-sim",
      archetype: "A",
    },
    {
      file: "Physik-Gleichmaessig-beschleunigte-Bewegung-L1.md",
      fach: "Physik",
      expectedTool: "kinematik",
      archetype: "D",
    },
    {
      file: "Deutsch-Schiller-Die-Raeuber-Figurenkonflikt-L1.md",
      fach: "Deutsch",
      expectedTool: "highlighter",
      archetype: "C",
    },
    {
      file: "Mathe-Integralrechnung-als-Flaecheninhaltsrechnung-L1.md",
      fach: "Mathe",
      expectedTool: "tangent-slider",
      archetype: "D",
    },
    {
      file: "Philosophie-Utilitarismus-Bentham-Mill-L1.md",
      fach: "Philosophie",
      expectedTool: "ethik-waage",
      archetype: "B",
    },
  ];

  for (const item of v4CourseFiles) {
    it(`parses ${item.file} cleanly into 5 steps with tool ${item.expectedTool}`, () => {
      const fullPath = path.join(lernreiseDir, item.file);
      expect(fs.existsSync(fullPath)).toBe(true);

      const raw = fs.readFileSync(fullPath, "utf-8");
      const parsed = parseReiseFile(item.file, raw);

      expect(parsed).not.toBeNull();
      if (!parsed) return;

      expect(parsed.fach).toBe(item.fach);
      expect(parsed.level).toBe(1);
      expect(parsed.ziel).toBe("Klausur");
      expect(parsed.xp).toBe(100);

      // Exactly 5 steps
      expect(parsed.schritte.length).toBe(5);

      // Step types
      expect(parsed.schritte[0].typ).toBe("entdecken");
      expect(parsed.schritte[1].typ).toBe("ausprobieren");
      expect(parsed.schritte[2].typ).toBe("entdecken");
      expect(parsed.schritte[3].typ).toBe("check");
      expect(parsed.schritte[4].typ).toBe("szenario");

      // Tool matching on step 2
      const step2 = parsed.schritte[1] as SchrittAusprobieren;
      expect(step2.toolId).toBe(item.expectedTool);

      // Step 5 Szenario must have workable rubricPoints (>= 2) to prevent gating lockout
      const step5 = parsed.schritte[4] as SchrittSzenario;
      expect(step5.rubricPoints.length).toBeGreaterThanOrEqual(2);
      expect(step5.situation.length).toBeGreaterThan(10);
    });
  }

  it("handles coexistence of legacy 8-step Lesson-v3 and new 5-step Enterprise-v4 without regression", () => {
    const legacyPath = path.join(lernreiseDir, "Sowi-Soziale-Marktwirtschaft-L1.md");
    if (fs.existsSync(legacyPath)) {
      const rawLegacy = fs.readFileSync(legacyPath, "utf-8");
      const parsedLegacy = parseReiseFile("Sowi-Soziale-Marktwirtschaft-L1.md", rawLegacy);
      expect(parsedLegacy).not.toBeNull();
      if (parsedLegacy) {
        expect(parsedLegacy.schritte.length).toBeGreaterThanOrEqual(7);
      }
    }

    const v4Path = path.join(lernreiseDir, "SoWi-Mietendeckel-und-Preisinterventionen-L1.md");
    const rawV4 = fs.readFileSync(v4Path, "utf-8");
    const parsedV4 = parseReiseFile("SoWi-Mietendeckel-und-Preisinterventionen-L1.md", rawV4);
    expect(parsedV4).not.toBeNull();
    if (parsedV4) {
      expect(parsedV4.schritte.length).toBe(5);
      expect(parsedV4.schritte[1].title).toContain("Interaktives Experiment & Praxis");
      expect(parsedV4.schritte[4].title).toContain("Klausur-Transfer & Szenario");
    }
  });
});
