// Tests für die pädagogischen Komponenten (Satzbau-Lego, BalanceBoard, TextHighlighter)
import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { SatzbauLego, PRESET_TEMPLATES } from "./SatzbauLego";
import { BalanceBoard, PRESET_CASES } from "./BalanceBoard";
import { TextHighlighter, PRESET_PASSAGES } from "./TextHighlighter";

describe("Pädagogische Komponenten (Pedagogy UI Library)", () => {
  describe("SatzbauLego", () => {
    it("rendert alle 4 leeren Steck-Slots initial", () => {
      render(<SatzbauLego lang="zh" />);
      expect(screen.getByText("句式积木 (Satzbau-Lego)")).toBeDefined();
      expect(screen.getAllByText("① 出处与情境").length).toBeGreaterThanOrEqual(1);
      expect(screen.getAllByText("② 分析性动词").length).toBeGreaterThanOrEqual(1);
      expect(screen.getAllByText("③ 手法与论据").length).toBeGreaterThanOrEqual(1);
      expect(screen.getAllByText("④ 效果与结论").length).toBeGreaterThanOrEqual(1);
    });

    it("steckt Baustein per Klick in den passenden Slot", () => {
      render(<SatzbauLego lang="zh" />);
      const firstBlock = PRESET_TEMPLATES[0].availableBlocks[0]; // "In Zeile 14–18"
      const blockBtn = screen.getByText(firstBlock.textDE);
      fireEvent.click(blockBtn);

      // Jetzt sollte der Text im Slot erscheinen
      const occurrences = screen.getAllByText(firstBlock.textDE);
      expect(occurrences.length).toBeGreaterThanOrEqual(1);
    });

    it("generiert vollständigen Satz wenn alle 4 Slots belegt sind", () => {
      const onComplete = vi.fn();
      render(<SatzbauLego lang="zh" onSentenceComplete={onComplete} />);

      // Klicke jeweils einen Baustein aus jeder Kategorie
      const fBlock = PRESET_TEMPLATES[0].availableBlocks.find((b) => b.category === "fundstelle")!;
      const vBlock = PRESET_TEMPLATES[0].availableBlocks.find((b) => b.category === "verb")!;
      const mBlock = PRESET_TEMPLATES[0].availableBlocks.find((b) => b.category === "mittel")!;
      const wBlock = PRESET_TEMPLATES[0].availableBlocks.find((b) => b.category === "wirkung")!;

      fireEvent.click(screen.getByText(fBlock.textDE));
      fireEvent.click(screen.getByText(vBlock.textDE));
      fireEvent.click(screen.getByText(mBlock.textDE));
      fireEvent.click(screen.getByText(wBlock.textDE));

      expect(screen.getByText("拼装完成的高分考纲句")).toBeDefined();
    });
  });

  describe("BalanceBoard", () => {
    it("rendert den Waagebalken und die beiden Spalten", () => {
      render(<BalanceBoard lang="zh" />);
      expect(screen.getByText("辩证天平 (Dialektische Waage)")).toBeDefined();
      expect(screen.getByText("+ " + PRESET_CASES[0].labelProDE)).toBeDefined();
      expect(screen.getByText("− " + PRESET_CASES[0].labelContraDE)).toBeDefined();
    });

    it("kippt die Waage bei Klick auf ein Gewicht und errechnet Punkte", () => {
      render(<BalanceBoard lang="zh" />);
      const proWeight = PRESET_CASES[0].availableWeights.find((w) => w.side === "pro")!;
      const weightBtn = screen.getByText(proWeight.textDE);
      fireEvent.click(weightBtn);

      // Pro sollte nun Punkte anzeigen
      expect(screen.getByText(`Pro: ${proWeight.weight} Pkt (1 项论据)`)).toBeDefined();
      expect(screen.getByText("▲ 偏向赞同 (Pro)")).toBeDefined();
    });

    it("erzeugt theoriegeleitetes Urteil nach AFB III", () => {
      render(<BalanceBoard lang="zh" />);
      const proWeight = PRESET_CASES[0].availableWeights.find((w) => w.side === "pro")!;
      fireEvent.click(screen.getByText(proWeight.textDE));

      expect(screen.getByText("自动合成的考纲级裁决 (AFB III Werturteil)")).toBeDefined();
    });
  });

  describe("TextHighlighter", () => {
    it("rendert die Textpassage und Farbpalette", () => {
      render(<TextHighlighter lang="zh" />);
      expect(screen.getByText("荧光标注解构画板 (Text-Dekonstruierer)")).toBeDefined();
      expect(screen.getByText("① 核心论点 (These)")).toBeDefined();
      expect(screen.getByText("② 事实与论据 (Argument)")).toBeDefined();
    });

    it("ermöglicht das Umschalten von Markierungen per Klick", () => {
      render(<TextHighlighter lang="zh" />);
      const span = PRESET_PASSAGES[0].spans[0];
      const spanElem = screen.getByText(span.text);

      // Klick toggelt den aktiven Marker
      fireEvent.click(spanElem);
      expect(screen.getByText("实时论证层级树 (Gliederung):")).toBeDefined();
    });
  });
});
