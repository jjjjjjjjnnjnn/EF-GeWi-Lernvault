import { describe, it, expect } from "vitest";
import { GENERATED_SUBJECT_GRAPHS } from "../generatedGraphs";
import { graphRegistry, validateKnowledgeGraph } from "./skillTree";
import type { SubjectKnowledgeGraph } from "./skillTree";

/**
 * 编译期图谱防漂移守卫 (Anti-Drift Guard)
 *
 * `src/generatedGraphs.ts` 由 `scripts/export-vault-data.py` 从
 * `00_META/presets/*-graph.json` 编译而成。本测试是预设与生成物之间的
 * 唯一自动化契约：预设被改坏、学科被漏掉、或有人手改生成物，都会在此报红。
 *
 * 图谱数据契约见 `00_META/presets/README.md`。
 */

/** 十门规范学科的 fach id 与其 UI 显示名（`SkillTreeCanvas` 学科按钮按此渲染）。 */
const CANONICAL_SUBJECTS: ReadonlyArray<readonly [string, string]> = [
  ["Deutsch", "德语 (Deutsch)"],
  ["Englisch", "英语 (Englisch)"],
  ["Mathe", "数学 (Mathe)"],
  ["Physik", "物理 (Physik)"],
  ["Chemie", "化学 (Chemie)"],
  ["Bio", "生物 (Bio)"],
  ["Philosophie", "哲学 (Philosophie)"],
  ["SoWi", "社会科学 (SoWi)"],
  ["Musik", "音乐 (Musik)"],
  ["Sport", "体育 (Sport)"],
];

/**
 * 已随 App 发布的 21 个节点 ID：用户学习进度以
 * `localStorage["skill_tree_mastered_<fach>"]` 按 ID 持久化，重命名即清空进度。
 * 其标题字符串另有 `SkillTreeCanvas.test.tsx` 的断言保护。
 */
const FROZEN_IDS: ReadonlyArray<readonly [string, string, string]> = [
  // [id, titleZH, fach]
  ["sowi-beduerfnis-knappheit", "稀缺性公理与经济人假说批判", "SoWi"],
  ["sowi-preismechanismus", "价格形成机制与市场均衡十字", "SoWi"],
  ["sowi-marktversagen", "市场失灵与负外部性困境", "SoWi"],
  ["sowi-marktformen-monopol", "市场形态、垄断寡头与卡特尔监管", "SoWi"],
  ["sowi-spieltheorie-nash", "博弈论与纳什均衡 (大学先修)", "SoWi"],
  ["sowi-soziale-marktwirtschaft", "社会市场经济与秩序自由主义", "SoWi"],
  ["sowi-magisches-viereck", "宏观经济魔术四角与目标冲突", "SoWi"],
  ["sowi-ezb-geldpolitik", "欧洲央行利率政策与通胀治理", "SoWi"],
  ["sowi-keynes-vs-friedman", "凯恩斯需求论 vs 货币主义 (大学先修)", "SoWi"],
  ["sowi-soziale-schichtung", "社会阶层分化与代际流动壁垒", "SoWi"],
  ["sowi-buergergeld-transfer", "公民金与社会国二次转移支付", "SoWi"],
  ["sowi-soziale-ungleichheit", "社会不平等、基尼系数与再分配终极评析", "SoWi"],
  ["mathe-aenderungsrate-sekante", "平均变化率与割线斜率", "Mathe"],
  ["mathe-lokale-ableitung-grenzwert", "瞬时导数定义与切线极限逼近", "Mathe"],
  ["mathe-ableitungsregeln-polynom", "多项式导数运算法则", "Mathe"],
  ["mathe-kurvendiskussion-kriterien", "函数性质判别：驻点、极值与拐点", "Mathe"],
  ["mathe-extremwert-optimierung", "实际几何与经济最优化建模", "Mathe"],
  ["philo-hedonismus-bentham", "边沁量化算盘与古典功利主义", "Philosophie"],
  ["philo-utilitarismus-mill", "密尔高阶快乐与质的功利主义", "Philosophie"],
  ["philo-kant-kategorischer-imperativ", "康德定言命令与先验自律义务论", "Philosophie"],
  ["philo-dilemma-diskurs", "道德两难案例与哲学评价 (AFB III)", "Philosophie"],
];

function byFach(): Map<string, SubjectKnowledgeGraph> {
  return new Map(GENERATED_SUBJECT_GRAPHS.map((g) => [g.fach, g]));
}

describe("编译期学科图谱 (GENERATED_SUBJECT_GRAPHS)", () => {
  it("覆盖全部十门规范学科，且 fach 与 UI 显示名严格一致", () => {
    expect(GENERATED_SUBJECT_GRAPHS).toHaveLength(CANONICAL_SUBJECTS.length);

    const graphs = byFach();
    for (const [fach, nameZH] of CANONICAL_SUBJECTS) {
      const graph = graphs.get(fach);
      expect(graph, `缺少学科图谱: ${fach}`).toBeDefined();
      expect(graph?.nameZH, `学科 ${fach} 的 nameZH 必须是可被学科按钮匹配的精确串`).toBe(nameZH);
      expect(graph?.schemaVersion).toBe(1);
      expect(graph?.isCustomSubject).toBe(false);
    }
  });

  it("每科 60-80 个知识点、4-6 个分类星区，且每个星区 >= 6 个知识点", () => {
    for (const graph of GENERATED_SUBJECT_GRAPHS) {
      expect(graph.nodes.length, `${graph.fach} 节点数应在 60-80`).toBeGreaterThanOrEqual(60);
      expect(graph.nodes.length, `${graph.fach} 节点数应在 60-80`).toBeLessThanOrEqual(80);

      expect(graph.categories?.length, `${graph.fach} 应有 4-6 个星区`).toBeGreaterThanOrEqual(4);
      expect(graph.categories?.length, `${graph.fach} 应有 4-6 个星区`).toBeLessThanOrEqual(6);

      const perCategory = new Map<string, number>();
      for (const node of graph.nodes) {
        const category = node.category ?? "";
        perCategory.set(category, (perCategory.get(category) ?? 0) + 1);
      }
      for (const category of graph.categories ?? []) {
        expect(
          perCategory.get(category) ?? 0,
          `${graph.fach} 的星区 ${category} 少于 6 个知识点会失去视觉厚度`
        ).toBeGreaterThanOrEqual(6);
      }
    }
  });

  it("通过应用侧校验，且 15NP 核心句与易错误区零缺口（0 error / 0 warning）", () => {
    for (const graph of GENERATED_SUBJECT_GRAPHS) {
      const result = validateKnowledgeGraph(graph);
      expect(result.errors, `${graph.fach} 存在校验错误`).toEqual([]);
      expect(
        result.warnings,
        `${graph.fach} 存在质量缺口（缺 category / 15NP 核心句 / 易错误区）`
      ).toEqual([]);
      expect(result.stats.scoringSentencesCount).toBe(graph.nodes.length);
      expect(result.stats.commonFallaciesCount).toBe(graph.nodes.length);
    }
  });

  it("每科都有多前置汇聚节点与终极大题节点", () => {
    for (const graph of GENERATED_SUBJECT_GRAPHS) {
      const convergence = graph.nodes.filter((n) => n.prerequisites.length >= 3);
      expect(convergence.length, `${graph.fach} 的多前置汇聚节点应 >= 3`).toBeGreaterThanOrEqual(3);

      const abitur = graph.nodes.filter(
        (n) =>
          n.curriculumTier === "Q2" &&
          n.level === 3 &&
          n.stage === "klausur_praxis" &&
          n.prerequisites.length >= 3
      );
      expect(abitur.length, `${graph.fach} 缺少 Q2/AFB III/klausur_praxis 的终极大题汇聚节点`).toBeGreaterThanOrEqual(1);

      const uniConvergence = graph.nodes.filter(
        (n) => n.curriculumTier === "Uni_Prep" && n.prerequisites.length >= 3
      );
      expect(uniConvergence.length, `${graph.fach} 缺少 Uni_Prep 理论汇聚节点`).toBeGreaterThanOrEqual(1);
    }
  });

  it("五重轨道全覆盖：Sek_I / EF / Q1 / Q2 / Uni_Prep 均有节点", () => {
    const tiers = ["Sek_I", "EF", "Q1", "Q2", "Uni_Prep"];
    for (const graph of GENERATED_SUBJECT_GRAPHS) {
      const present = new Set(graph.nodes.map((n) => n.curriculumTier));
      for (const tier of tiers) {
        expect(present.has(tier), `${graph.fach} 缺少 ${tier} 轨道节点`).toBe(true);
      }
    }
  });

  it("21 个已发布节点 ID 与其中文标题逐字保留（保护用户既有学习进度）", () => {
    const graphs = byFach();
    for (const [id, titleZH, fach] of FROZEN_IDS) {
      const graph = graphs.get(fach);
      const node = graph?.nodes.find((n) => n.id === id);
      expect(node, `冻结节点丢失: ${id}（${fach}）`).toBeDefined();
      expect(node?.titleZH, `冻结节点 ${id} 的中文标题被改写`).toBe(titleZH);
    }
  });

  it("注册进 graphRegistry 后按需完成引力排布，且节点坐标互不重叠", () => {
    for (const [fach] of CANONICAL_SUBJECTS) {
      const graph = graphRegistry.get(fach);
      expect(graph, `${fach} 未注册进图谱中心`).toBeDefined();
      expect(graph?.nodes.length).toBeGreaterThanOrEqual(60);

      const seen = new Set<string>();
      for (const node of graph?.nodes ?? []) {
        const position = node.coordinates;
        expect(position, `${fach} 的节点 ${node.id} 未完成引力排布`).toBeDefined();
        const key = `${Math.round(position?.x ?? 0)},${Math.round(position?.y ?? 0)}`;
        expect(seen.has(key), `${fach} 存在坐标重叠节点: ${key}`).toBe(false);
        seen.add(key);
      }
    }
  });

  it("图谱中心的学科列表与十门规范学科一致", () => {
    const listed = graphRegistry.listSubjects().map((s) => s.fach);
    for (const [fach] of CANONICAL_SUBJECTS) {
      expect(listed, `学科列表缺少 ${fach}`).toContain(fach);
    }
  });
});
