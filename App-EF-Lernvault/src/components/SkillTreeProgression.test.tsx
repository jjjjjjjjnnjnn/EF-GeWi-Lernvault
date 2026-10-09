import { describe, it, expect, beforeEach } from "vitest";
import { render, screen, fireEvent, within, waitFor, act } from "@testing-library/react";
import { SkillTreeCanvas } from "./SkillTreeCanvas";
import {
  graphRegistry,
  computeGraphUnlockStates,
  markNodeMasteredByCourseId,
  setNodeMastered,
  getStoredMasteredNodeIds,
  EF_SKILLTREE_MASTERED_KEY,
} from "../engine/skillTree";
import { xpStore } from "../engine/stores";

describe("SkillTreeProgression (微课通关与知识图谱状态机闭环测试)", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  describe("1. 微课通关数据穿透与持久化闭环 (Penetration & Persistence)", () => {
    it("calling xpStore.markDone sets monotonic step progress in xpStore", () => {
      xpStore.markDone("Sowi-Preismechanismus-Markt-L1", 8);
      const data = xpStore.load();
      expect(data.done["Sowi-Preismechanismus-Markt-L1"]).toBe(8);

      // Re-invoking with smaller step preserves completion
      xpStore.markDone("Sowi-Preismechanismus-Markt-L1", 5);
      expect(xpStore.load().done["Sowi-Preismechanismus-Markt-L1"]).toBe(8);
    });

    it("markNodeMasteredByCourseId maps course ID to knowledge graph node and persists to localStorage", () => {
      // Sowi-Preismechanismus-Markt-L1 corresponds to sowi-preismechanismus
      const result = markNodeMasteredByCourseId("Sowi-Preismechanismus-Markt-L1", "SoWi");
      expect(result.success).toBe(true);
      expect(result.nodeId).toBe("sowi-preismechanismus");

      // Verifies storage in both subject-specific key and shared ef_skilltree_mastered key
      const storedSoWi = getStoredMasteredNodeIds("SoWi");
      expect(storedSoWi.has("sowi-preismechanismus")).toBe(true);

      const rawEfMastered = localStorage.getItem(EF_SKILLTREE_MASTERED_KEY);
      expect(rawEfMastered).not.toBeNull();
      expect(JSON.parse(rawEfMastered!)).toContain("sowi-preismechanismus");

      const rawFachMastered = localStorage.getItem("skill_tree_mastered_SoWi");
      expect(rawFachMastered).not.toBeNull();
      expect(JSON.parse(rawFachMastered!)).toContain("sowi-preismechanismus");
    });

    it("supports fallback penetration when course ID does not match predefined linkedReiseId", () => {
      const result = markNodeMasteredByCourseId("custom-micro-lecture-01", "SoWi");
      expect(result.success).toBe(true);
      expect(result.nodeId).toBe("custom-micro-lecture-01");

      const stored = getStoredMasteredNodeIds("SoWi");
      expect(stored.has("custom-micro-lecture-01")).toBe(true);
    });
  });

  describe("2. 图谱依赖演算与状态机跃迁 (DAG State Machine Transitions)", () => {
    it("transitions downstream nodes from locked to available when all prereqs are mastered", () => {
      const sowiGraph = graphRegistry.get("SoWi");
      expect(sowiGraph).toBeDefined();

      const preismechanismusNode = sowiGraph!.nodes.find((n) => n.id === "sowi-preismechanismus");
      expect(preismechanismusNode).toBeDefined();
      const prereqs = preismechanismusNode!.prerequisites;
      expect(prereqs.length).toBeGreaterThan(0);

      // Initially no nodes mastered: initial root nodes are available, preismechanismus is locked
      const emptyMastered = new Set<string>();
      const initialStates = computeGraphUnlockStates(sowiGraph!, emptyMastered);
      expect(initialStates.get("sowi-beduerfnis-knappheit")).toBe("available");
      expect(initialStates.get("sowi-preismechanismus")).toBe("locked");

      // Master all prerequisites of sowi-preismechanismus
      const masteredPrereqs = new Set<string>(prereqs);
      const updatedStates = computeGraphUnlockStates(sowiGraph!, masteredPrereqs);
      expect(updatedStates.get("sowi-preismechanismus")).toBe("available");

      // Master sowi-preismechanismus itself: it transitions to mastered
      const masteredCurrent = new Set<string>([...prereqs, "sowi-preismechanismus"]);
      const finalStates = computeGraphUnlockStates(sowiGraph!, masteredCurrent);
      expect(finalStates.get("sowi-preismechanismus")).toBe("mastered");
    });
  });

  describe("3. SkillTreeCanvas 状态同步与研习抽屉呈现 (Canvas Sync & Drawer)", () => {
    it("synchronizes mastered node set from props and storage on mount", () => {
      localStorage.setItem("ef_skilltree_mastered_SoWi", JSON.stringify(["sowi-beduerfnis-knappheit"]));

      render(<SkillTreeCanvas lang="zh" initialFach="SoWi" />);

      // Preismechanismus node should exist
      expect(screen.getByTestId("skill-node-sowi-preismechanismus")).toBeInTheDocument();
      // Beduerfnis node has ink ripple wave indicating mastered state
      expect(screen.getByTestId("ink-ripple-sowi-beduerfnis-knappheit")).toBeInTheDocument();
    });

    it("reactively updates mastered state upon receiving SKILL_TREE_MASTERED_EVENT", async () => {
      render(<SkillTreeCanvas lang="zh" initialFach="SoWi" />);

      // Initially sowi-beduerfnis-knappheit does not have ink-ripple
      expect(screen.queryByTestId("ink-ripple-sowi-beduerfnis-knappheit")).toBeNull();

      // Trigger mastery event (e.g. course completed)
      act(() => {
        setNodeMastered("SoWi", "sowi-beduerfnis-knappheit", true);
      });

      // Canvas reacts to event and renders ink ripple wave
      await waitFor(() => {
        expect(screen.getByTestId("ink-ripple-sowi-beduerfnis-knappheit")).toBeInTheDocument();
      });
    });

    it("drawer clearly displays '已掌握 / Gekonnt' and lists directly unlocked successors", () => {
      setNodeMastered("SoWi", "sowi-beduerfnis-knappheit", true);

      render(<SkillTreeCanvas lang="zh" initialFach="SoWi" />);

      // Click the mastered node to open drawer
      fireEvent.click(screen.getByTestId("skill-node-sowi-beduerfnis-knappheit"));

      const drawer = screen.getByTestId("skill-tree-node-drawer");
      expect(drawer).toBeInTheDocument();

      // Drawer badge and summary card clearly display "已掌握 / Gekonnt"
      expect(screen.getByTestId("drawer-node-status-badge")).toHaveTextContent(/已掌握 \/ Gekonnt/);
      expect(screen.getByTestId("drawer-mastered-summary")).toBeInTheDocument();
      expect(within(screen.getByTestId("drawer-mastered-summary")).getByText(/考点研习状态：已掌握 \/ Gekonnt/)).toBeInTheDocument();

      // Direct successors list is displayed
      const successorsList = screen.getByTestId("direct-unlocked-successors-list");
      expect(successorsList).toBeInTheDocument();

      // sowi-preismechanismus is a direct successor of sowi-beduerfnis-knappheit
      expect(screen.getByTestId("unlocked-successor-sowi-preismechanismus")).toBeInTheDocument();

      // Clicking successor in drawer switches focus
      fireEvent.click(screen.getByTestId("unlocked-successor-sowi-preismechanismus"));
      expect(within(drawer).getByRole("heading", { name: "价格形成机制与市场均衡十字" })).toBeInTheDocument();
    });

    it("German mode displays 'Gekonnt' and German successor titles", () => {
      setNodeMastered("SoWi", "sowi-beduerfnis-knappheit", true);

      render(<SkillTreeCanvas lang="de" initialFach="SoWi" />);

      fireEvent.click(screen.getByTestId("skill-node-sowi-beduerfnis-knappheit"));

      expect(screen.getByTestId("drawer-node-status-badge")).toHaveTextContent("Gekonnt");
      expect(screen.getByText("Knoten-Status: Gekonnt")).toBeInTheDocument();
      expect(screen.getByText("Direkt freigeschaltete Folge-Knoten")).toBeInTheDocument();
    });
  });

  describe("4. 连线样式与纯墨波纹视觉动效 (Visual & Solid Ink Lines)", () => {
    it("renders solid ink lines for dependencies originating from mastered nodes", () => {
      setNodeMastered("SoWi", "sowi-beduerfnis-knappheit", true);

      const { container } = render(<SkillTreeCanvas lang="zh" initialFach="SoWi" />);

      // Check SVG edge path elements
      const edgePaths = container.querySelectorAll("svg path[d*='M']");
      const hasSolidInkEdge = Array.from(edgePaths).some((path) => {
        const stroke = path.getAttribute("stroke");
        const dash = path.getAttribute("stroke-dasharray");
        return stroke === "var(--ink)" && (dash === "none" || !dash);
      });

      expect(hasSolidInkEdge).toBe(true);
    });

    it("renders ink-ripple-wave SVG element using index.css tokens with zero active shadows", () => {
      setNodeMastered("SoWi", "sowi-beduerfnis-knappheit", true);

      render(<SkillTreeCanvas lang="zh" initialFach="SoWi" />);

      const rippleCircle = screen.getByTestId("ink-ripple-sowi-beduerfnis-knappheit");
      expect(rippleCircle).toBeInTheDocument();
      expect(rippleCircle).toHaveClass("ink-ripple-wave");
      expect(rippleCircle).toHaveAttribute("stroke", "var(--ink)");
    });
  });

  describe("5. 规范遵从检验 (Zero Emoji & Zero Tailwind Shadow Classes)", () => {
    it("contains zero prohibited emojis across rendered skill tree container and drawer", () => {
      setNodeMastered("SoWi", "sowi-beduerfnis-knappheit", true);

      render(<SkillTreeCanvas lang="zh" initialFach="SoWi" />);
      fireEvent.click(screen.getByTestId("skill-node-sowi-beduerfnis-knappheit"));

      const container = screen.getByTestId("skill-tree-canvas-container");
      const textContent = container.textContent || "";

      // Prohibited emojis contract check: ➔, ✕, ✓, 🌌, etc.
      expect(textContent).not.toMatch(/[➔✕✓🌌🚀✨🎉💡🔥]/);
    });

    it("contains zero Tailwind shadow-md / shadow-lg / shadow-2xl classes", () => {
      const { container } = render(<SkillTreeCanvas lang="zh" initialFach="SoWi" />);

      const shadowElements = container.querySelectorAll("[class*='shadow-md'], [class*='shadow-lg'], [class*='shadow-2xl']");
      expect(shadowElements.length).toBe(0);
    });
  });
});
