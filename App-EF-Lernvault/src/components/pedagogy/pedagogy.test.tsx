import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { SatzbauLego, PRESET_TEMPLATES } from "./SatzbauLego";
import { BalanceBoard, PRESET_CASES } from "./BalanceBoard";
import { TextHighlighter, PRESET_PASSAGES } from "./TextHighlighter";
import { TangentSlider } from "./TangentSlider";
import FormulaScaffold from "./FormulaScaffold";
import OralExamTimer from "./OralExamTimer";
import { TitrationSimulator } from "./TitrationSimulator";
import { BoxOptimizerSim } from "./BoxOptimizerSim";
import { EthikWaageSim } from "./EthikWaageSim";
import { MagischesViereckSim } from "./MagischesViereckSim";
import { SchiefeEbeneSim } from "./SchiefeEbeneSim";
import { GiniAllocatorSim } from "./GiniAllocatorSim";
import { GeWiReadingLab } from "./GeWiReadingLab";

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

  describe("FormulaScaffold", () => {
    it("rendert alle 4 Schritte initial und laedt ein MINT-Beispiel", () => {
      const onComplete = vi.fn();
      render(<FormulaScaffold lang="zh" fach="Physik" onFormulaStepComplete={onComplete} />);
      expect(screen.getByText("理科四步规范解题手架")).toBeInTheDocument();
      expect(screen.getByText("(Physik)")).toBeInTheDocument();

      fireEvent.click(screen.getByText("载入典型范例"));
      expect(screen.getByDisplayValue(/s\(t\)/)).toBeInTheDocument();
      expect(screen.getByDisplayValue((val) => val.includes("a = 2.5"))).toBeInTheDocument();

      fireEvent.click(screen.getByText("带入作答框"));
      expect(onComplete).toHaveBeenCalled();
      expect(onComplete.mock.calls[0][0]).toContain("[Physik] 4-Schritte-Lösungsweg");
    });
  });

  describe("OralExamTimer", () => {
    it("rendert 15-Minuten-Vorbereitungsphase und 3-teiliges Vortragsraster", () => {
      const onGenerated = vi.fn();
      render(<OralExamTimer lang="zh" fach="Musik" onOutlineGenerated={onGenerated} />);
      expect(screen.getByText("口试试场全真模拟矩阵")).toBeInTheDocument();
      expect(screen.getByRole("timer")).toHaveTextContent("15:00");

      fireEvent.click(screen.getByText("5分钟独立陈述"));
      expect(screen.getByRole("timer")).toHaveTextContent("05:00");

      fireEvent.click(screen.getByText("载入典型范例"));
      expect(screen.getByDisplayValue(/贝多芬/)).toBeInTheDocument();

      fireEvent.click(screen.getByText("带入作答框"));
      expect(onGenerated).toHaveBeenCalled();
      expect(onGenerated.mock.calls[0][0]).toContain("[Musik] Mündliche Prüfung");
    });
  });

  describe("TitrationSimulator", () => {
    it("rendert Titrationslabor mit Ausgangsbedingungen und berechnet pH-Wert", async () => {
      render(<TitrationSimulator lang="zh" />);
      expect(screen.getByText("酸碱滴定与 pH-V 曲线")).toBeInTheDocument();
      expect(screen.getByText("强酸起点 pH=1.00, 等当点 pH=7。")).toBeInTheDocument();
      expect(screen.getAllByText("1.00").length).toBeGreaterThan(0);

      // AP-Button springt zum Aequivalenzpunkt (V = 20 mL, rAF holt auf)
      fireEvent.click(screen.getByText("AP"));
      const eqMarks = await screen.findAllByText("等当点(中性, pH 7)", {}, { timeout: 10000 });
      expect(eqMarks.length).toBeGreaterThan(0);
      const phMarks = await screen.findAllByText("7.00", {}, { timeout: 10000 });
      expect(phMarks.length).toBeGreaterThan(0);
    });

    it("wechselt Indikator zu Phenolphthalein und aendert Farbanzeige", async () => {
      render(<TitrationSimulator lang="de" />);
      fireEvent.click(screen.getByText("Phenolphth. 8,2"));
      expect(await screen.findByText("Aktuell: Farblos (pH < 8,2)", {}, { timeout: 3000 })).toBeInTheDocument();

      // Slider auf 30 mL schieben (rAF holt auf, pH springt ueber 8,2)
      const slider = screen.getByRole("slider");
      fireEvent.change(slider, { target: { value: "30" } });
      expect(await screen.findByText("Aktuell: Pink (pH > 8,2)", {}, { timeout: 10000 })).toBeInTheDocument();
    });
  });

  describe("BoxOptimizerSim", () => {
    it("rendert Schachtelproblem mit Karton-Skizze und berechnet Volumen", () => {
      render(<BoxOptimizerSim lang="zh" />);
      expect(screen.getByText("导数极值与约束条件最优化实验室")).toBeInTheDocument();
      expect(screen.getByText("正方形纸板折盒")).toBeInTheDocument();

      // Klick auf exaktes Optimum (x = 4 cm)
      fireEvent.click(screen.getByText("跳转理论极值点 (4 cm)"));
      expect(screen.getByText("✓ 达成极值！")).toBeInTheDocument();
      expect(screen.getAllByText(/1024/).length).toBeGreaterThan(0);
    });
  });

  describe("EthikWaageSim", () => {
    it("rendert Ethik-Waage und Dilemma-Auswahl", () => {
      render(<EthikWaageSim lang="zh" />);
      expect(screen.getByText("伦理道德天平与双轨决策工坊 (Ethik-Waage: Utilitarismus vs. Kant)")).toBeInTheDocument();
      expect(screen.getByText("1. 经典电车难题：变道拉杆 vs. 桥上推人")).toBeInTheDocument();
    });
  });

  describe("MagischesViereckSim", () => {
    it("rendert Magisches Viereck und Szenarien", () => {
      render(<MagischesViereckSim lang="zh" />);
      expect(screen.getByText("魔术四角形：四大目标博弈与宏观调控动态沙盘")).toBeInTheDocument();
      expect(screen.getByText("四角理想稳态（黄金平衡）")).toBeInTheDocument();
    });
  });

  describe("SchiefeEbeneSim", () => {
    it("rendert Kraeftezerlegung und reagiert auf Neigungswinkel", () => {
      render(<SchiefeEbeneSim lang="zh" />);
      expect(screen.getByText("斜面动力学：下滑分力与摩擦阻力动态博弈")).toBeInTheDocument();

      const angleSlider = screen.getByRole("slider", { name: "斜面倾角 α：" });
      // Grossen Winkel einstellen damit der Klotz rutscht
      fireEvent.change(angleSlider, { target: { value: "45" } });
      expect(screen.getByText(/滑块加速滑落！/)).toBeInTheDocument();

      // Kleinen Winkel einstellen damit der Klotz ruht
      fireEvent.change(angleSlider, { target: { value: "10" } });
      expect(screen.getByText("滑块静止（静摩擦阻力平衡下滑分力）")).toBeInTheDocument();
    });
  });

  describe("GiniAllocatorSim", () => {
    it("rendert Lorenz-Kurve und berechnet Gini-Koeffizienten bei Umverteilung", () => {
      render(<GiniAllocatorSim lang="zh" />);
      expect(screen.getByText("洛伦兹曲线与基尼系数动态再分配")).toBeInTheDocument();
      expect(screen.getByText("G = 0.44")).toBeInTheDocument();

      const slider = screen.getByRole("slider");
      fireEvent.change(slider, { target: { value: "50" } });
      // Gini sinkt bei starker Umverteilung
      expect(screen.getByText("50%")).toBeInTheDocument();
    });
  });

  describe("GeWiReadingLab", () => {
    it("rendert Faust Nacht initial und zeigt Zeilen und Analyse", () => {
      render(<GeWiReadingLab lang="zh" defaultExcerptId="faust-monolog" />);
      expect(screen.getAllByText(/Faust/).length).toBeGreaterThan(0);
      expect(screen.getByText("Habe nun, ach! Philosophie,")).toBeInTheDocument();
      expect(screen.getByText("会考原典精读 · 逐题深入")).toBeInTheDocument();
    });

    it("laedt Nathan der Weise mit dramatischer Konfliktleiste und Sprecherrollen", () => {
      render(<GeWiReadingLab lang="zh" defaultExcerptId="nathan-ringparabel" />);
      expect(screen.getByText(/Nathan der Weise/)).toBeInTheDocument();
      expect(screen.getByText("戏剧冲突态势与人物博弈:")).toBeInTheDocument();
      expect(screen.getAllByText(/Nathan/).length).toBeGreaterThan(0);
      expect(screen.getByText(/Vor grauen Jahren/)).toBeInTheDocument();
    });

    it("laedt Kabale und Liebe mit Miller und Praesident Sprecherdialog", () => {
      render(<GeWiReadingLab lang="zh" defaultExcerptId="kabale-miller-praesident" />);
      expect(screen.getByText(/Kabale und Liebe/)).toBeInTheDocument();
      expect(screen.getAllByText(/Miller/).length).toBeGreaterThan(0);
      expect(screen.getAllByText(/Präsident/).length).toBeGreaterThan(0);
    });

    it("unterstuetzt Metrik-Linse bei Willkommen und Abschied", () => {
      render(<GeWiReadingLab lang="zh" defaultExcerptId="goethe-willkommen-abschied" />);
      expect(screen.getByText(/Willkommen und Abschied/)).toBeInTheDocument();
      expect(screen.getByText("格律形制:")).toBeInTheDocument();
      expect(screen.getByText(/vierhebiger Jambus/)).toBeInTheDocument();

      // Metrum-Linse ist standardmaessig aktiv und zeigt Metrum-Markup
      expect(screen.getAllByText(/˘\s+´/).length).toBeGreaterThan(0);

      // Klick auf Toggle schaltet Linse um
      const toggleBtn = screen.getByText("音步透镜: 开启");
      fireEvent.click(toggleBtn);
      expect(screen.getByText("音步透镜: 关闭")).toBeInTheDocument();
    });

    it("beantwortet eine Pruefungsfrage und navigiert durch Diagnose-Reiter", () => {
      render(<GeWiReadingLab lang="zh" defaultExcerptId="goethe-willkommen-abschied" />);
      const optA = screen.getByText(/从弱到强的抑扬格/);
      fireEvent.click(optA);

      // Diagnose-Tabs erscheinen
      expect(screen.getByText("正解依据与锚点")).toBeInTheDocument();
      expect(screen.getByText("干扰项深度诊断")).toBeInTheDocument();
      expect(screen.getByText("时代思潮与哲学")).toBeInTheDocument();
      expect(screen.getByText("高分句与EHZ")).toBeInTheDocument();
      expect(screen.getByText("全景展开")).toBeInTheDocument();

      // Klick auf EHZ-Tab
      fireEvent.click(screen.getByText("高分句与EHZ"));
      expect(screen.getByText(/德语高分答题句式/)).toBeInTheDocument();
      expect(screen.getByText(/官方评分期望标准/)).toBeInTheDocument();
    });

    it("laedt Thomas Hobbes Leviathan und analysiert Naturzustand", () => {
      render(<GeWiReadingLab lang="zh" defaultExcerptId="hobbes-leviathan" filterFach="Philosophie" />);
      expect(screen.getAllByText(/Leviathan/).length).toBeGreaterThan(0);
      expect(screen.getByText(/Schwächste Kraft genug hat/)).toBeInTheDocument();
      expect(screen.getByText(/einsam, armselig, ekelhaft/)).toBeInTheDocument();
      expect(screen.getByText(/人性假设与自然状态三大冲突根源/)).toBeInTheDocument();
    });

    it("laedt Hannah Arendt und untersucht Pluralitaet und Natalitaet", () => {
      render(<GeWiReadingLab lang="zh" defaultExcerptId="arendt-totalitarismus" filterFach="Philosophie" />);
      expect(screen.getAllByText(/Hannah Arendt/).length).toBeGreaterThan(0);
      expect(screen.getAllByText(/Pluralität/).length).toBeGreaterThan(0);
      expect(screen.getByText(/Funken des Neuanfangs/)).toBeInTheDocument();
      expect(screen.getByText(/极权主义的本质定义与总体恐怖的运转逻辑/)).toBeInTheDocument();
    });

    it("laedt Max Weber Herrschaftssoziologie und analysiert Idealtypen", () => {
      render(<GeWiReadingLab lang="zh" defaultExcerptId="weber-herrschaft" filterFach="SoWi" />);
      expect(screen.getAllByText(/Max Weber/).length).toBeGreaterThan(0);
      expect(screen.getAllByText(/Macht bedeutet jede Chance/).length).toBeGreaterThan(0);
      expect(screen.getAllByText(/Gehäuse der Hörigkeit/).length).toBeGreaterThan(0);
      expect(screen.getByText(/社会学核心基石：权力与支配的范畴分界/)).toBeInTheDocument();
    });

    it("laedt Juergen Habermas Strukturwandel der Oeffentlichkeit", () => {
      render(<GeWiReadingLab lang="zh" defaultExcerptId="habermas-oeffentlichkeit" filterFach="SoWi" />);
      expect(screen.getAllByText(/Jürgen Habermas/).length).toBeGreaterThan(0);
      expect(screen.getAllByText(/zwanglose Zwang des besseren Arguments/).length).toBeGreaterThan(0);
      expect(screen.getAllByText(/Refeudalisierung der Öffentlichkeit/).length).toBeGreaterThan(0);
      expect(screen.getByText(/启蒙市民公共领域的规范性理想与三大支柱/)).toBeInTheDocument();
    });

    it("laedt Franz Kafka Die Verwandlung und dekonstruiert Entfremdung", () => {
      render(<GeWiReadingLab lang="zh" defaultExcerptId="kafka-verwandlung" filterFach="Deutsch" />);
      expect(screen.getAllByText(/Die Verwandlung/).length).toBeGreaterThan(0);
      expect(screen.getAllByText(/ungeheuren Ungeziefer/).length).toBeGreaterThan(0);
      expect(screen.getAllByText(/panzerartig harten Rücken/).length).toBeGreaterThan(0);
      expect(screen.getByText(/叙事视角与冷静文体特征/)).toBeInTheDocument();
    });

    it("laedt Martin Luther King I Have a Dream und analysiert Rhetorik", () => {
      render(<GeWiReadingLab lang="zh" defaultExcerptId="mlk-dream" filterFach="Englisch" />);
      expect(screen.getAllByText(/Martin Luther King/).length).toBeGreaterThan(0);
      expect(screen.getAllByText(/Five score years ago/).length).toBeGreaterThan(0);
      expect(screen.getAllByText(/promissory note/).length).toBeGreaterThan(0);
      expect(screen.getByText(/金融商业扩展隐喻的功能与机制/)).toBeInTheDocument();
    });

    it("laedt John Stuart Mill Utilitarismus und prueft qualitatives Glueck", () => {
      render(<GeWiReadingLab lang="zh" defaultExcerptId="mill-utilitarismus" filterFach="Philosophie" />);
      expect(screen.getAllByText(/John Stuart Mill/).length).toBeGreaterThan(0);
      expect(screen.getAllByText(/Prinzip des größten Glücks/).length).toBeGreaterThan(0);
      expect(screen.getAllByText(/unzufriedener Sokrates/).length).toBeGreaterThan(0);
      expect(screen.getByText(/功利原理与四大核心要素/)).toBeInTheDocument();
    });
  });
});




