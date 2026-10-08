import { describe, it, expect } from "vitest";
import {
  computeGraphUnlockStates,
  detectGraphCycles,
  topologicalSort,
  getPrerequisiteChain,
  calculateSubjectProgress,
  insertKnowledgeNode,
  removeKnowledgeNode,
  connectKnowledgeNodes,
  disconnectKnowledgeNodes,
  attachExternalResource,
  updateKnowledgeNode,
  addNodeTag,
  removeNodeTag,
  computePlanetaryRadialLayout,
  filterKnowledgeGraph,
  validateKnowledgeGraph,
  graphRegistry,
  BUILTIN_SOWI_GRAPH,
  BUILTIN_MATHE_GRAPH,
  type KnowledgeNode,
  type SubjectKnowledgeGraph,
  type ExternalResourceSlot,
} from "./skillTree";

describe("Skill Tree & Extensible Knowledge Graph Engine", () => {
  describe("1. 节点状态机与前置依赖判定 (Prerequisite Gatekeeper Engine)", () => {
    it("unlocks zero-prerequisite entry nodes as available initially", () => {
      const emptyProgress = new Set<string>();
      const states = computeGraphUnlockStates(BUILTIN_SOWI_GRAPH, emptyProgress);

      // 第一步稀缺性节点应该立即解锁
      expect(states.get("sowi-beduerfnis-knappheit")).toBe("available");
      // 后续价格机制节点必须被锁定
      expect(states.get("sowi-preismechanismus")).toBe("locked");
      // 宏观魔术四角与不平等节点必须被锁定
      expect(states.get("sowi-magisches-viereck")).toBe("locked");
      expect(states.get("sowi-soziale-ungleichheit")).toBe("locked");
    });

    it("transitions downstream nodes to available upon mastering prerequisites", () => {
      const progress = new Set<string>(["sowi-beduerfnis-knappheit"]);
      const states = computeGraphUnlockStates(BUILTIN_SOWI_GRAPH, progress);

      expect(states.get("sowi-beduerfnis-knappheit")).toBe("mastered");
      expect(states.get("sowi-preismechanismus")).toBe("available");
      // 依然后续节点锁定
      expect(states.get("sowi-marktversagen")).toBe("locked");
    });

    it("handles multi-prerequisite AND-gate convergence strictly", () => {
      // 魔术四角依赖 sowi-marktversagen AND sowi-soziale-marktwirtschaft
      const partialProgress = new Set<string>([
        "sowi-beduerfnis-knappheit",
        "sowi-preismechanismus",
        "sowi-marktversagen",
      ]);

      const partialStates = computeGraphUnlockStates(BUILTIN_SOWI_GRAPH, partialProgress);
      // 只掌握了市场失灵，还未掌握社会市场经济 -> 魔术四角必须仍然 locked
      expect(partialStates.get("sowi-magisches-viereck")).toBe("locked");

      // 补齐社会市场经济
      partialProgress.add("sowi-soziale-marktwirtschaft");
      const completeStates = computeGraphUnlockStates(BUILTIN_SOWI_GRAPH, partialProgress);
      // 两个前置均满足 -> 魔术四角成功解锁 available!
      expect(completeStates.get("sowi-magisches-viereck")).toBe("available");
    });

    it("supports OR-logic prerequisites when configured", () => {
      const mockGraph: SubjectKnowledgeGraph = {
        schemaVersion: 1,
        fach: "Mathe",
        nameDE: "Test",
        nameZH: "测试",
        nodes: [
          {
            id: "path-a",
            fach: "Mathe",
            titleDE: "Weg A",
            titleZH: "路径A",
            stage: "einfuehrung",
            level: 1,
            xpReward: 50,
            estimatedMinutes: 5,
            prerequisites: [],
          },
          {
            id: "path-b",
            fach: "Mathe",
            titleDE: "Weg B",
            titleZH: "路径B",
            stage: "einfuehrung",
            level: 1,
            xpReward: 50,
            estimatedMinutes: 5,
            prerequisites: [],
          },
          {
            id: "target-or",
            fach: "Mathe",
            titleDE: "Ziel OR",
            titleZH: "目标OR",
            stage: "vertiefung",
            level: 2,
            xpReward: 100,
            estimatedMinutes: 10,
            prerequisites: ["path-a", "path-b"],
            unlockLogic: "OR",
          },
        ],
        edges: [],
      };

      const states0 = computeGraphUnlockStates(mockGraph, new Set());
      expect(states0.get("target-or")).toBe("locked");

      // 只完成 path-b，但由于是 OR 门，target-or 即可解锁
      const states1 = computeGraphUnlockStates(mockGraph, new Set(["path-b"]));
      expect(states1.get("target-or")).toBe("available");
    });
  });

  describe("2. 拓扑排序与前置溯源链路 (Progression Flow & Prerequisite Tracing)", () => {
    it("computes valid topological sorting for linear and branching structures", () => {
      const res = topologicalSort(BUILTIN_MATHE_GRAPH);
      expect(res.success).toBe(true);
      expect(res.sortedNodeIds.length).toBe(BUILTIN_MATHE_GRAPH.nodes.length);

      // 验证顺序符合认知逻辑：割线斜率必须在极限导数之前
      const idxSekante = res.sortedNodeIds.indexOf("mathe-aenderungsrate-sekante");
      const idxAbleitung = res.sortedNodeIds.indexOf("mathe-lokale-ableitung-grenzwert");
      const idxKurvendiskussion = res.sortedNodeIds.indexOf("mathe-kurvendiskussion-kriterien");
      const idxOptimierung = res.sortedNodeIds.indexOf("mathe-extremwert-optimierung");

      expect(idxSekante).toBeLessThan(idxAbleitung);
      expect(idxAbleitung).toBeLessThan(idxKurvendiskussion);
      expect(idxKurvendiskussion).toBeLessThan(idxOptimierung);
    });

    it("traces complete prerequisite chain backwards for any target node", () => {
      // 欲学习数学最终最优化建模，倒推必须掌握的完整路径
      const chain = getPrerequisiteChain(BUILTIN_MATHE_GRAPH, "mathe-extremwert-optimierung");
      expect(chain).toContain("mathe-aenderungsrate-sekante");
      expect(chain).toContain("mathe-lokale-ableitung-grenzwert");
      expect(chain).toContain("mathe-ableitungsregeln-polynom");
      expect(chain).toContain("mathe-kurvendiskussion-kriterien");
      expect(chain[chain.length - 1]).toBe("mathe-extremwert-optimierung");
    });
  });

  describe("3. 防死锁环路检测 (Cycle Detection)", () => {
    it("returns null for acyclic graphs", () => {
      expect(detectGraphCycles(BUILTIN_SOWI_GRAPH)).toBeNull();
      expect(detectGraphCycles(BUILTIN_MATHE_GRAPH)).toBeNull();
    });

    it("detects circular deadlock dependencies and returns the offending path", () => {
      const cyclicGraph: SubjectKnowledgeGraph = {
        schemaVersion: 1,
        fach: "Philosophie",
        nameDE: "Zyklus",
        nameZH: "死锁环",
        nodes: [
          {
            id: "node-1",
            fach: "Philosophie",
            titleDE: "N1",
            titleZH: "节点1",
            stage: "einfuehrung",
            level: 1,
            xpReward: 50,
            estimatedMinutes: 5,
            prerequisites: ["node-3"], // 1 依赖 3
          },
          {
            id: "node-2",
            fach: "Philosophie",
            titleDE: "N2",
            titleZH: "节点2",
            stage: "grundlagen",
            level: 2,
            xpReward: 50,
            estimatedMinutes: 5,
            prerequisites: ["node-1"], // 2 依赖 1
          },
          {
            id: "node-3",
            fach: "Philosophie",
            titleDE: "N3",
            titleZH: "节点3",
            stage: "vertiefung",
            level: 3,
            xpReward: 50,
            estimatedMinutes: 5,
            prerequisites: ["node-2"], // 3 依赖 2 -> 形成 1->2->3->1 闭环死锁
          },
        ],
        edges: [],
      };

      const cycle = detectGraphCycles(cyclicGraph);
      expect(cycle).not.toBeNull();
      expect(cycle!.length).toBeGreaterThanOrEqual(3);

      const topo = topologicalSort(cyclicGraph);
      expect(topo.success).toBe(false);
      expect(topo.cycleNodes).toBeDefined();
    });
  });

  describe("4. 节点与连线随时热插拔 (Hot-Pluggable Operators)", () => {
    it("inserts and updates knowledge nodes dynamically", () => {
      const newNode: KnowledgeNode = {
        id: "sowi-inflation-geldpolitik",
        fach: "SoWi",
        titleDE: "Inflation & EZB Geldpolitik",
        titleZH: "通货膨胀与欧洲央行货币政策",
        stage: "vertiefung",
        level: 2,
        xpReward: 130,
        estimatedMinutes: 15,
        prerequisites: ["sowi-magisches-viereck"],
        linkedToolId: "ezb-geldpolitik-sim",
      };

      const updatedGraph = insertKnowledgeNode(BUILTIN_SOWI_GRAPH, newNode);
      expect(updatedGraph.nodes.length).toBe(BUILTIN_SOWI_GRAPH.nodes.length + 1);
      expect(updatedGraph.nodes.some((n) => n.id === "sowi-inflation-geldpolitik")).toBe(true);

      // 自动生成的 edge 应当包含
      expect(
        updatedGraph.edges.some(
          (e) => e.from === "sowi-magisches-viereck" && e.to === "sowi-inflation-geldpolitik"
        )
      ).toBe(true);
    });

    it("removes knowledge node and cascades cleanup of references", () => {
      const reducedGraph = removeKnowledgeNode(BUILTIN_SOWI_GRAPH, "sowi-marktversagen");
      expect(reducedGraph.nodes.some((n) => n.id === "sowi-marktversagen")).toBe(false);

      // 验证依赖它的魔术四角节点已清理该前置
      const viereckNode = reducedGraph.nodes.find((n) => n.id === "sowi-magisches-viereck");
      expect(viereckNode?.prerequisites).not.toContain("sowi-marktversagen");

      // 验证连线已清理
      expect(reducedGraph.edges.some((e) => e.from === "sowi-marktversagen" || e.to === "sowi-marktversagen")).toBe(false);
    });

    it("connects nodes with deadlock prevention rollbacks", () => {
      // 尝试建立正常连接：数学幂函数法则 -> 最优化建模
      const connResult = connectKnowledgeNodes(
        BUILTIN_MATHE_GRAPH,
        "mathe-ableitungsregeln-polynom",
        "mathe-extremwert-optimierung",
        { type: "synergy", descriptionZH: "导数运算法则是最优化求极值的计算基础" }
      );
      expect(connResult.success).toBe(true);
      expect(
        connResult.graph.edges.some(
          (e) => e.from === "mathe-ableitungsregeln-polynom" && e.to === "mathe-extremwert-optimierung"
        )
      ).toBe(true);

      // 尝试逆向连接：从下游最优化建模连回到上游割线斜率（产生死锁环路）
      const badConn = connectKnowledgeNodes(
        BUILTIN_MATHE_GRAPH,
        "mathe-extremwert-optimierung",
        "mathe-aenderungsrate-sekante"
      );
      expect(badConn.success).toBe(false);
      expect(badConn.error).toContain("Zyklische Abhängigkeit");
    });

    it("disconnects nodes and unlinks prerequisites", () => {
      const disconnected = disconnectKnowledgeNodes(
        BUILTIN_SOWI_GRAPH,
        "sowi-beduerfnis-knappheit",
        "sowi-preismechanismus"
      );

      const preismechanismus = disconnected.nodes.find((n) => n.id === "sowi-preismechanismus");
      expect(preismechanismus?.prerequisites).not.toContain("sowi-beduerfnis-knappheit");
      expect(
        disconnected.edges.some(
          (e) => e.from === "sowi-beduerfnis-knappheit" && e.to === "sowi-preismechanismus"
        )
      ).toBe(false);
    });

    it("attaches external resources to a knowledge node for future book/web ingestion", () => {
      const slot: ExternalResourceSlot = {
        id: "res-bpb-01",
        type: "web_page",
        title: "bpb: Soziale Marktwirtschaft Verstehen",
        urlOrPath: "https://www.bpb.de/themen/wirtschaft/soziale-marktwirtschaft/",
        summaryZH: "联邦政治教育中心权威评析：战后秩序自由主义的制度渊源。",
        addedAt: new Date().toISOString(),
      };

      const enriched = attachExternalResource(
        BUILTIN_SOWI_GRAPH,
        "sowi-soziale-marktwirtschaft",
        slot
      );

      const target = enriched.nodes.find((n) => n.id === "sowi-soziale-marktwirtschaft");
      expect(target?.externalResources).toBeDefined();
      expect(target?.externalResources?.length).toBe(1);
      expect(target?.externalResources?.[0].id).toBe("res-bpb-01");
    });
  });

  describe("5. 学科板块动态扩展与自定义学科支持 (Subject Extensibility)", () => {
    it("registers and retrieves builtin standard subjects", () => {
      const sowi = graphRegistry.get("SoWi");
      const mathe = graphRegistry.get("Mathe");
      const philo = graphRegistry.get("Philosophie");

      expect(sowi).toBeDefined();
      expect(mathe).toBeDefined();
      expect(philo).toBeDefined();

      const subjects = graphRegistry.listSubjects();
      expect(subjects.length).toBeGreaterThanOrEqual(3);
    });

    it("creates, registers, and interacts with a completely new custom subject", () => {
      // 动态新建计算机科学 (Informatik) 自定义学科
      const infoGraph = graphRegistry.createCustomSubject(
        "Informatik",
        "Informatik",
        "计算机科学 (Informatik)",
        "面向北威州高中高中阶段算法、数据结构与面向对象编程"
      );

      expect(infoGraph.fach).toBe("Informatik");
      expect(infoGraph.isCustomSubject).toBe(true);

      // 为新学科插拔知识点
      const n1: KnowledgeNode = {
        id: "inf-variablen-kontrollstrukturen",
        fach: "Informatik",
        titleDE: "Kontrollstrukturen & Typen",
        titleZH: "变量、数据类型与分支循环控制结构",
        stage: "einfuehrung",
        level: 1,
        xpReward: 60,
        estimatedMinutes: 10,
        prerequisites: [],
      };
      const n2: KnowledgeNode = {
        id: "inf-objektorientierung",
        fach: "Informatik",
        titleDE: "Objektorientierte Modellierung (Klassen & Objekte)",
        titleZH: "面向对象建模：类、对象与封装",
        stage: "grundlagen",
        level: 2,
        xpReward: 120,
        estimatedMinutes: 15,
        prerequisites: ["inf-variablen-kontrollstrukturen"],
      };

      let dynamicGraph = insertKnowledgeNode(infoGraph, n1);
      dynamicGraph = insertKnowledgeNode(dynamicGraph, n2);
      graphRegistry.register(dynamicGraph);

      const retrieved = graphRegistry.get("Informatik");
      expect(retrieved?.nodes.length).toBe(2);

      const states = computeGraphUnlockStates(retrieved!, new Set());
      expect(states.get("inf-variablen-kontrollstrukturen")).toBe("available");
      expect(states.get("inf-objektorientierung")).toBe("locked");
    });
  });

  describe("6. 学科宏观学习进度统计 (Subject Progress & Next Recommended Step)", () => {
    it("calculates progress percentages and recommends the next best action node", () => {
      const progressEmpty = calculateSubjectProgress(BUILTIN_SOWI_GRAPH, new Set());
      expect(progressEmpty.progressPercent).toBe(0);
      expect(progressEmpty.masteredNodes).toBe(0);
      expect(progressEmpty.availableNodes).toBe(1);
      expect(progressEmpty.recommendedNextNodeId).toBe("sowi-beduerfnis-knappheit");

      // 完成第一个节点后，推荐的下一个节点应当是价格机制
      const completedOne = new Set(["sowi-beduerfnis-knappheit"]);
      const progressOne = calculateSubjectProgress(BUILTIN_SOWI_GRAPH, completedOne);
      expect(progressOne.masteredNodes).toBe(1);
      expect(progressOne.progressPercent).toBe(Math.round((1 / BUILTIN_SOWI_GRAPH.nodes.length) * 100));
      expect(progressOne.recommendedNextNodeId).toBe("sowi-preismechanismus");
    });
  });

  describe("7. 行星引力与径向布局引擎 (Planetary Gravitational Radial Layout)", () => {
    it("partitions categories into angular sectors and assigns concentric radial coordinates", () => {
      const layouted = computePlanetaryRadialLayout(BUILTIN_SOWI_GRAPH);
      expect(layouted.nodes.length).toBe(BUILTIN_SOWI_GRAPH.nodes.length);
      expect(layouted.categories?.length).toBeGreaterThanOrEqual(3);

      for (const node of layouted.nodes) {
        expect(node.radialPosition).toBeDefined();
        expect(node.radialPosition?.orbitRadius).toBeGreaterThan(0);
        expect(node.radialPosition?.angleDeg).toBeGreaterThanOrEqual(0);
        expect(node.radialPosition?.angleDeg).toBeLessThanOrEqual(360);
        expect(node.coordinates?.x).toBeTypeOf("number");
        expect(node.coordinates?.y).toBeTypeOf("number");
      }
    });

    it("places higher curriculum tiers (Q1/Q2/Uni_Prep) on progressively larger radial orbits", () => {
      const layouted = computePlanetaryRadialLayout(BUILTIN_SOWI_GRAPH);
      const efNode = layouted.nodes.find((n) => n.id === "sowi-beduerfnis-knappheit");
      const uniNode = layouted.nodes.find((n) => n.id === "sowi-spieltheorie-nash");

      expect(efNode?.radialPosition?.orbitRadius).toBeDefined();
      expect(uniNode?.radialPosition?.orbitRadius).toBeDefined();
      expect(uniNode!.radialPosition!.orbitRadius).toBeGreaterThan(efNode!.radialPosition!.orbitRadius);
    });
  });

  describe("8. 动态节点编辑与多维标签管理 (Node Updating & Tagging)", () => {
    it("updates existing node fields and mutates tags safely", () => {
      let graph = BUILTIN_SOWI_GRAPH;
      const targetId = "sowi-beduerfnis-knappheit";

      // 动态添加标签
      graph = addNodeTag(graph, targetId, "Abitur-2026-Fokus");
      const updatedNode1 = graph.nodes.find((n) => n.id === targetId);
      expect(updatedNode1?.tags).toContain("Abitur-2026-Fokus");

      // 动态移除标签
      graph = removeNodeTag(graph, targetId, "Basis");
      const updatedNode2 = graph.nodes.find((n) => n.id === targetId);
      expect(updatedNode2?.tags).not.toContain("Basis");

      // 动态修改公式
      graph = updateKnowledgeNode(graph, targetId, {
        keyFormulaOrSentence: "Neuer 15 NP Merksatz zur Knappheit.",
      });
      const updatedNode3 = graph.nodes.find((n) => n.id === targetId);
      expect(updatedNode3?.keyFormulaOrSentence).toBe("Neuer 15 NP Merksatz zur Knappheit.");
    });

    it("filters nodes by category, tag, curriculumTier, and full-text search", () => {
      const nodes = BUILTIN_SOWI_GRAPH.nodes;

      // 分类过滤
      const makroNodes = filterKnowledgeGraph(nodes, { category: "Makrooekonomie" });
      expect(makroNodes.every((n) => n.category === "Makrooekonomie")).toBe(true);
      expect(makroNodes.length).toBeGreaterThan(0);

      // 标签过滤
      const tagFiltered = filterKnowledgeGraph(nodes, { tag: "EZB" });
      expect(tagFiltered.some((n) => n.id === "sowi-ezb-geldpolitik")).toBe(true);

      // 全文检索 (针对德语或中文关键字)
      const searched = filterKnowledgeGraph(nodes, { searchQuery: "Inflation" });
      expect(searched.length).toBeGreaterThan(0);
      expect(searched.some((n) => n.id === "sowi-ezb-geldpolitik")).toBe(true);
    });
  });

  describe("9. 自动化质量门禁与死锁检测器 (Quality Gate & Validation Engine)", () => {
    it("validates a healthy graph successfully", () => {
      const res = validateKnowledgeGraph(BUILTIN_SOWI_GRAPH);
      expect(res.valid).toBe(true);
      expect(res.errors.length).toBe(0);
      expect(res.stats.totalNodes).toBe(BUILTIN_SOWI_GRAPH.nodes.length);
      expect(res.stats.categoriesCount).toBeGreaterThan(0);
    });

    it("detects cycle deadlocks and reports precise cycle chain", () => {
      const badGraph: SubjectKnowledgeGraph = {
        schemaVersion: 1,
        fach: "TestFach",
        nameDE: "Test",
        nameZH: "测试",
        nodes: [
          {
            id: "node-a",
            fach: "TestFach",
            titleDE: "A",
            titleZH: "甲",
            stage: "grundlagen",
            level: 1,
            xpReward: 50,
            estimatedMinutes: 5,
            prerequisites: ["node-b"],
          },
          {
            id: "node-b",
            fach: "TestFach",
            titleDE: "B",
            titleZH: "乙",
            stage: "grundlagen",
            level: 1,
            xpReward: 50,
            estimatedMinutes: 5,
            prerequisites: ["node-a"],
          },
        ],
        edges: [],
      };

      const res = validateKnowledgeGraph(badGraph);
      expect(res.valid).toBe(false);
      expect(res.errors.some((e) => e.includes("死锁循环"))).toBe(true);
    });

    it("catches nonexistent prerequisites", () => {
      const orphanGraph: SubjectKnowledgeGraph = {
        schemaVersion: 1,
        fach: "OrphanFach",
        nameDE: "Orphan",
        nameZH: "孤儿依赖",
        nodes: [
          {
            id: "n-1",
            fach: "OrphanFach",
            titleDE: "N1",
            titleZH: "节点1",
            stage: "grundlagen",
            level: 1,
            xpReward: 50,
            estimatedMinutes: 5,
            prerequisites: ["nonexistent-prereq-xyz"],
          },
        ],
        edges: [],
      };

      const res = validateKnowledgeGraph(orphanGraph);
      expect(res.valid).toBe(false);
      expect(res.errors.some((e) => e.includes("nonexistent-prereq-xyz"))).toBe(true);
    });
  });

  describe("10. 外部 JSON 自动化导入与导出 (Import & Export Workflow)", () => {
    it("exports valid JSON and re-imports it with auto planetary layout", () => {
      const exportedJson = graphRegistry.exportGraphJSON("SoWi");
      expect(exportedJson).toContain('"fach": "SoWi"');

      // 导入新学科测试
      const customImport = JSON.stringify({
        schemaVersion: 1,
        fach: "BioInformatik",
        nameDE: "Bioinformatik",
        nameZH: "生物信息学",
        nodes: [
          {
            id: "bioinf-dna-sequenzierung",
            fach: "BioInformatik",
            titleDE: "DNA Sequenzierung",
            titleZH: "DNA 测序算法",
            category: "Genomik",
            curriculumTier: "Uni_Prep",
            stage: "grundlagen",
            level: 2,
            xpReward: 120,
            estimatedMinutes: 15,
            prerequisites: [],
            keyFormulaOrSentence: "Needleman-Wunsch Algorithmus für globales Alignment.",
            commonFallacy: "Verwechslung von globalem und lokalem Alignment (Smith-Waterman).",
            tags: ["Genetik", "Algorithmen"],
          },
        ],
        edges: [],
      });

      const importRes = graphRegistry.importGraphJSON(customImport);
      expect(importRes.success).toBe(true);
      expect(importRes.graph).toBeDefined();
      expect(importRes.graph?.fach).toBe("BioInformatik");
      expect(importRes.graph?.nodes[0].radialPosition).toBeDefined();

      const registered = graphRegistry.get("BioInformatik");
      expect(registered).toBeDefined();
    });
  });
});
