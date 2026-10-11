import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { KonzeptPuzzle } from "./KonzeptPuzzle";
import type { KonzeptPuzzleData } from "../../engine/conceptDistiller";

describe("KonzeptPuzzle Component (Tufte 4-vs-4 Prämisse-Realität Pairing)", () => {
  const customPuzzleData: KonzeptPuzzleData = {
    instructionDE: "Ordne die Prämissen den Realitätsbrüchen zu:",
    instructionZH: "将理想假设与现实偏差配对：",
    pairs: [
      {
        id: "p1",
        premiseDE: "Homogene Güter",
        premiseZH: "同质商品",
        realityDE: "Produktdifferenzierung",
        realityZH: "产品差异化",
        consequenceDE: "Markenmonopole",
        consequenceZH: "品牌垄断",
      },
      {
        id: "p2",
        premiseDE: "Volle Markttransparenz",
        premiseZH: "完全市场透明度",
        realityDE: "Informationsasymmetrie",
        realityZH: "信息不对称",
        consequenceDE: "Fehlallokation",
        consequenceZH: "资源错配",
      },
    ],
  };

  it("renders with fallback data when no custom data provided", () => {
    render(
      <KonzeptPuzzle
        title="Modell des vollkommenen Marktes"
        lang="de"
        fach="SoWi"
      />
    );

    expect(screen.getByText(/Konzept-Puzzle/i)).toBeInTheDocument();
    expect(screen.getByText(/0 \/ 4 Paare gekoppelt/i)).toBeInTheDocument();
  });

  it("renders custom pairs and supports interactive matching", () => {
    const onAllMatched = vi.fn();
    render(
      <KonzeptPuzzle
        puzzleData={customPuzzleData}
        lang="de"
        onAllMatched={onAllMatched}
      />
    );

    expect(screen.getByText(/0 \/ 2 Paare gekoppelt/i)).toBeInTheDocument();
    expect(screen.getByText("Homogene Güter")).toBeInTheDocument();
    expect(screen.getByText("Produktdifferenzierung")).toBeInTheDocument();

    // 1. Click Left item (Homogene Güter)
    const left1 = screen.getByText("Homogene Güter").closest("button");
    expect(left1).toBeDefined();
    fireEvent.click(left1!);

    // 2. Click Mismatched Right item (Informationsasymmetrie)
    const rightWrong = screen.getByText("Informationsasymmetrie").closest("button");
    fireEvent.click(rightWrong!);

    // Should indicate mismatch
    expect(screen.getByText(/Keine Kausalübereinstimmung/i)).toBeInTheDocument();
    expect(screen.getByText(/0 \/ 2 Paare gekoppelt/i)).toBeInTheDocument();

    // 3. Click Left item again
    fireEvent.click(left1!);

    // 4. Click Matched Right item (Produktdifferenzierung)
    const rightCorrect = screen.getByText("Produktdifferenzierung").closest("button");
    fireEvent.click(rightCorrect!);

    // Should be paired!
    expect(screen.getByText(/1 \/ 2 Paare gekoppelt/i)).toBeInTheDocument();
    expect(screen.getByText(/Markenmonopole/i)).toBeInTheDocument();

    // 5. Match the second pair
    const left2 = screen.getByText("Volle Markttransparenz").closest("button");
    fireEvent.click(left2!);
    fireEvent.click(rightWrong!);

    // All pairs matched!
    expect(screen.getByText(/2 \/ 2 Paare gekoppelt/i)).toBeInTheDocument();
    expect(screen.getByText(/Theoretisches Referenzmodell/i)).toBeInTheDocument();
    expect(onAllMatched).toHaveBeenCalledTimes(1);
  });

  it("supports bilingual Chinese rendering", () => {
    render(
      <KonzeptPuzzle
        puzzleData={customPuzzleData}
        lang="zh"
      />
    );

    expect(screen.getByText(/概念机制拼图/i)).toBeInTheDocument();
    expect(screen.getByText(/将理想假设与现实偏差配对：/i)).toBeInTheDocument();
    expect(screen.getByText("同质商品")).toBeInTheDocument();
  });
});
