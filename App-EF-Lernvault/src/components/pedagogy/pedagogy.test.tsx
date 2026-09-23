import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { SatzbauLego, PRESET_TEMPLATES } from "./SatzbauLego";
import { BalanceBoard, PRESET_CASES } from "./BalanceBoard";
import { TextHighlighter, PRESET_PASSAGES } from "./TextHighlighter";
import { TangentSlider } from "./TangentSlider";

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
      const firstBlock = PRESET_TEMPLATES[0].availableBlocks[0];
      const blockBtn = screen.getByText(firstBlock.textDE);
      expect(screen.getAllByText(firstBlock.textDE)).toHaveLength(1);

      fireEvent.click(blockBtn);

      expect(screen.getAllByText(firstBlock.textDE)).toHaveLength(2);
      fireEvent.click(screen.getByRole("button", { name: "取下积木 / Baustein lösen" }));
      expect(screen.getAllByText(firstBlock.textDE)).toHaveLength(1);
    });

    it("generiert vollständigen Satz wenn alle 4 Slots belegt sind", async () => {
      const user = userEvent.setup();
      const onComplete = vi.fn();
      const writeText = vi.fn().mockResolvedValue(undefined);
      Object.defineProperty(navigator, "clipboard", { configurable: true, value: { writeText } });
      render(<SatzbauLego lang="zh" onSentenceComplete={onComplete} />);

      const fBlock = PRESET_TEMPLATES[0].availableBlocks.find((b) => b.category === "fundstelle")!;
      const vBlock = PRESET_TEMPLATES[0].availableBlocks.find((b) => b.category === "verb")!;
      const mBlock = PRESET_TEMPLATES[0].availableBlocks.find((b) => b.category === "mittel")!;
      const wBlock = PRESET_TEMPLATES[0].availableBlocks.find((b) => b.category === "wirkung")!;

      fireEvent.click(screen.getByText(fBlock.textDE));
      fireEvent.click(screen.getByText(vBlock.textDE));
      fireEvent.click(screen.getByText(mBlock.textDE));
      fireEvent.click(screen.getByText(wBlock.textDE));

      const expected =
        "In Zeile 14–18 verdeutlicht der Autor mithilfe eines normativen Arguments um die gesellschaftliche Dringlichkeit hervorzuheben.";
      expect(screen.getByText(`„${expected}“`)).toBeInTheDocument();
      fireEvent.click(screen.getByText("考纲标准度校验"));
      expect(screen.getByText(/完美组合！完全契合北威州评分细目表/)).toBeInTheDocument();

      await user.click(screen.getByText("复制句子 / Kopieren"));
      expect(writeText).toHaveBeenCalledWith(expected);
      expect(onComplete).toHaveBeenCalledWith(expected);
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
      const onUrteil = vi.fn();
      const writeText = vi.fn().mockResolvedValue(undefined);
      Object.defineProperty(navigator, "clipboard", { configurable: true, value: { writeText } });
      render(<BalanceBoard lang="zh" onUrteilGenerated={onUrteil} />);
      const proWeight = PRESET_CASES[0].availableWeights.find((w) => w.side === "pro")!;
      fireEvent.click(screen.getByText(proWeight.textDE));

      const expected =
        "Unter Abwägung der Argumente überwiegen die Pro-Argumente. Obwohl gewichtige Einwände hinsichtlich Marktkonformität bestehen, erweist sich das Kriterium Soziale Gerechtigkeit in diesem Kontext als prioritär, da der verfassungs- bzw. ordnungspolitische Schutzzweck die partiellen Risiken legitimiert.";
      expect(screen.getByText(`„${expected}“`)).toBeInTheDocument();
      fireEvent.click(screen.getByText("复制裁决文本 / Urteil kopieren"));
      expect(writeText).toHaveBeenCalledWith(expected);
      expect(onUrteil).toHaveBeenCalledWith(expected);
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

      expect(spanElem).toHaveAttribute("aria-pressed", "true");
      expect(screen.getByText("7/7 个片段已标注")).toBeInTheDocument();
      fireEvent.click(spanElem);
      expect(spanElem).toHaveAttribute("aria-pressed", "false");
      expect(screen.getByText("6/7 个片段已标注")).toBeInTheDocument();
    });
  });

  describe("TangentSlider", () => {
    it("rendert den Tangenten-Simulator mit f(x) = x^2 und Koordinatennetz", () => {
      render(<TangentSlider lang="zh" />);
      expect(screen.getByTestId("tangent-slider")).toBeDefined();
      expect(screen.getByText("割线逼近切线沙盘：直观理解导数 (Δx → 0)")).toBeDefined();
      expect(screen.getByText("f(x) = x²")).toBeDefined();
    });

    it("berechnet Differenzenquotienten dynamisch bei Veränderung von deltaX", () => {
      render(<TangentSlider lang="zh" />);
      const deltaSlider = screen.getByRole("slider", { name: "步长 Δx / Intervallbreite Δx" });

      expect(screen.getByText("3.500")).toBeInTheDocument();
      expect(screen.getByText("2.00")).toBeInTheDocument();
      fireEvent.change(deltaSlider, { target: { value: "0.50" } });
      expect(screen.getByText("2.500")).toBeInTheDocument();
      expect(screen.getByText("0.50")).toBeInTheDocument();
      fireEvent.change(deltaSlider, { target: { value: "0.02" } });
      expect(screen.getByText("2.020")).toBeInTheDocument();
      expect(screen.getByText("2.00")).toBeInTheDocument();
    });

    it("übernimmt Klausursatz bei Klick auf den Übernehmen-Button", () => {
      const onGenerated = vi.fn();
      render(<TangentSlider lang="zh" onFormulaGenerated={onGenerated} />);

      const copyBtn = screen.getByText("带入此导数分析结论与 Klausursatz");
      fireEvent.click(copyBtn);

      expect(onGenerated).toHaveBeenCalled();
      const calledFormula = onGenerated.mock.calls[0][0];
      expect(calledFormula).toContain("差商 Δy/Δx");
      expect(calledFormula).toContain("瞬时变化率");
    });
  });
});

