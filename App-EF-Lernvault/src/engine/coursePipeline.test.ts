import { describe, it, expect } from "vitest";
import {
  matchPedagogicalTool,
  parseBookTableOfContents,
  generateCampaignUniverse,
  runCourseSeriesPipeline,
  type BookInput,
} from "./coursePipeline";
import { parseReiseFile } from "../reise";

describe("Course Series Pipeline (书本-课程集生成流水线引擎测试)", () => {
  it("matches suitable pedagogical tools based on subject and keywords", () => {
    // 经济与通胀 -> 魔法四角沙盘
    const sowiTool = matchPedagogicalTool("SoWi", "Inflation und Wirtschaftswachstum");
    expect(sowiTool.id).toBe("magisches-viereck");

    // 哲学伦理 -> 伦理辩证天平
    const philoTool = matchPedagogicalTool("Philosophie", "Kant und der kategorische Imperativ");
    expect(philoTool.id).toBe("ethik-waage");

    // 数学微积分 -> 切线逼近沙盘
    const mathTool = matchPedagogicalTool("Mathe", "Ableitung und Steigung der Tangente");
    expect(mathTool.id).toBe("tangent-slider");

    // 生物细胞渗透 -> 渗透实验沙盘
    const bioTool = matchPedagogicalTool("Bio", "Osmose und Biomembranen");
    expect(bioTool.id).toBe("osmose-lab");

    // 物理运动学 -> 速度与重力沙盘
    const physTool = matchPedagogicalTool("Physik", "Freier Fall und Beschleunigung");
    expect(physTool.id).toBe("kinematik-sim");
  });

  it("parses raw text outline into structured chapters and subtopics", () => {
    const rawOutline = `
## Kapitel 1: Grundlagen der Marktwirtschaft
- Preisbildung durch Angebot und Nachfrage
- Marktversagen und externe Effekte
## Kapitel 2: Wirtschaftspolitik
- Das Magische Viereck im Zielkonflikt
- Fiskalpolitik vs. Geldpolitik
    `;

    const input: BookInput = {
      title: "SoWi Lehrbuch EF",
      fach: "SoWi",
      rawText: rawOutline,
    };

    const chapters = parseBookTableOfContents(input);
    expect(chapters.length).toBe(2);
    expect(chapters[0].title).toBe("Grundlagen der Marktwirtschaft");
    expect(chapters[0].subtopics?.length).toBe(2);
    expect(chapters[1].title).toBe("Wirtschaftspolitik");
    expect(chapters[1].subtopics?.length).toBe(2);
  });

  it("creates high-stakes campaign universes with crises and roles", () => {
    const campaign = generateCampaignUniverse("Wirtschaftspolitik Kompakt", "SoWi", "adventure");
    expect(campaign.campaignTitle).toContain("Wirtschaftspolitik Kompakt");
    expect(campaign.defaultRole).toContain("Wirtschaftsberater");
    expect(campaign.crisisTemplates.length).toBeGreaterThan(0);
    expect(campaign.crisisTemplates[0]).toContain("通胀");
  });

  it("runs the full pipeline end-to-end and outputs valid playable Lernreise markdown", () => {
    const bookInput: BookInput = {
      title: "Kritik der praktischen Vernunft",
      fach: "Philosophie",
      level: 2,
      rawText: `
## 1. Das moralische Gesetz
- Der kategorische Imperativ
## 2. Freiheit und Autonomie
- Willensfreiheit als Postulat
      `,
    };

    const coursePack = runCourseSeriesPipeline(bookInput);

    expect(coursePack.bookTitle).toBe("Kritik der praktischen Vernunft");
    expect(coursePack.fach).toBe("Philosophie");
    expect(coursePack.totalEpisodes).toBe(2);
    expect(coursePack.totalXp).toBeGreaterThanOrEqual(200);

    const firstEp = coursePack.episodes[0];
    expect(firstEp.episodeTitle).toBe("Der kategorische Imperativ");
    expect(firstEp.matchedToolId).toBe("ethik-waage");
    expect(firstEp.keyTerms.length).toBe(3);

    // 核心验证：生成的 Markdown 必须完全通过项目中官方的 parseReiseFile 校验！
    const parsedReise = parseReiseFile("virtual-test.md", firstEp.markdownContent);
    expect(parsedReise).not.toBeNull();
    expect(parsedReise?.thema).toBe("Der kategorische Imperativ");
    expect(parsedReise?.fach).toBe("Philosophie");
    expect(parsedReise?.schritte.length).toBe(8);

    // 验证关键交互步骤
    const step1 = parsedReise?.schritte[0];
    expect(step1?.typ).toBe("entdecken");
    expect(step1?.title).toContain("Ziele & Phänomen-Einstieg");

    const step4 = parsedReise?.schritte[3];
    expect(step4?.typ).toBe("ausprobieren");
    expect(step4?.toolId).toBe("ethik-waage");

    const step6 = parsedReise?.schritte[5];
    expect(step6?.typ).toBe("check");

    const step7 = parsedReise?.schritte[6];
    expect(step7?.typ).toBe("szenario");
  });
});
