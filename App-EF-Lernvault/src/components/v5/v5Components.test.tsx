import { render, screen, fireEvent } from "@testing-library/react";
import { describe, expect, it, vi, beforeEach } from "vitest";
import {
  KernsatzCard,
  ErwartungshorizontDrawer,
  AufloesungCard,
  parseKernsatzFromText,
  parseAufloesungFromText,
  parseErwartungshorizontFromText,
} from "./index";

describe("v5 Didactic Components & Parser Standalone Tests", () => {
  beforeEach(() => {
    Object.assign(navigator, {
      clipboard: {
        writeText: vi.fn().mockImplementation(() => Promise.resolve()),
      },
    });
  });

  const sowiKernsatzSnippet = `
KERNSATZ (auswendig):
\`Ein staatlicher Hoechstpreis unterhalb des Gleichgewichtspreises verhindert die Marktraeumung und verwandelt offene Preiskonkurrenz in verdeckte Warteschlangen- und Schattenmarktkonkurrenz.\`
- Zerlegung: Subjekt | Mechanismus | Urteil
- Ein staatlicher Hoechstpreis unterhalb des Gleichgewichts | verhindert Marktraeumung und verwandelt Preiskonkurrenz in Warteschlangen- und Schattenmarktkonkurrenz | Kurzfrist-Entlastung ja, Dauerloesung nein, Transfers vorzugswuerdig
- Selbsttest: Ein staatlicher Hoechstpreis unterhalb des Gleichgewichtspreises ___ die Marktraeumung und verwandelt offene Preiskonkurrenz in verdeckte Warteschlangen- und Schattenmarktkonkurrenz.
`;

  const matheKernsatzSnippet = `
KERNSATZ (auswendig):
- Kernsatz: \`Das bestimmte Integral ist der Grenzwert der Riemann-Summe fuer $n$ -> unendlich und wird ueber Zerlegung -> Riemann-Summe -> Grenzwert dargestellt.\`
- Zerlegung: Subjekt | Mechanismus | Urteil
- Aufschluesselung: Subjekt = das bestimmte Integral | Mechanismus = Grenzwert der Riemann-Summe fuer $n$ -> unendlich | Urteil = Darstellung ueber Zerlegung -> Riemann-Summe -> Grenzwert
- Selbsttest: Das bestimmte Integral ist der ___ der Riemann-Summe fuer $n$ -> unendlich und wird ueber Zerlegung -> Riemann-Summe -> Grenzwert dargestellt.
`;

  const sowiAufloesungSnippet = `
AUFLÖSUNG (nach der Wahl lesen)

Mechanismus zu Option A: 价格在这里执行筛选和供给激励功能, 高租金一方面把需求压下去, 一方面把新房东和建筑商吸引进来, 市场靠高价实现出清, 代价是分配不公。

Mechanismus zu Option B: 限价把价格信号冻住, 需求被低价刺激变大, 供给被低回报压住变小, 缺口只能用排队、关系和黑市来消化, 名义公平掩盖了实际短缺。

一句话因果本质: 限价压住了租金数字, 却压不住租房缺口, 缺口从价格上消失, 就会在排队和黑市里重新出现。

Klausur-Satz: \`Ein staatlicher Hoechstpreis unterhalb des Gleichgewichtspreises verhindert die Marktraeumung und verwandelt offene Preiskonkurrenz in verdeckte Warteschlangen- und Schattenmarktkonkurrenz.\`
`;

  const sowiErwartungshorizontSnippet = `
ERWARTUNGSHORIZONT:
Teilleistung | Punkte | Alternativweg
Effizienz: Deckel blockiert Marktraeumung und erzeugt Ueberhang plus Wohlfahrtsverlust | 6 NP | Wohlfahrtsdreieck oder Anreizkette als Beleg akzeptieren
Gerechtigkeit: Sozialstaatsgebot und Kurzfrist-Entlastung einkommensschwacher Haushalte | 4 NP | Energiearmut-Argument mit anderem Beleg akzeptieren
Synthese: Direkttransfers statt Giesskannen-Deckel mit Effizienz-Gerechtigkeits-Abwaegung | 5 NP | Alternative mit gleicher Abwaegungslogik akzeptieren

15 NP MUSTER-KLAUSURSATZ:

> "Während ein Strompreisdeckel unterhalb des Gleichgewichts kurzfristig einkommensschwache Haushalte entlastet und dem Sozialstaatsgebot entspricht, verzerrt er das Preissignal, vergrössert den Nachfrageüberhang und erzeugt Wohlfahrtsverluste durch Mehrverbrauch und Investitionsrückgang; ordnungspolitisch vorzugswürdig sind daher einkommensgeprüfte Direkttransfers, die Effizienz und Gerechtigkeit ohne Blockade der Markträumung verbinden."
`;

  describe("v5Parser tests", () => {
    it("parses SoWi Kernsatz with Dreisatz and Selbsttest", () => {
      const parsed = parseKernsatzFromText(sowiKernsatzSnippet);
      expect(parsed).not.toBeNull();
      expect(parsed?.text).toContain("Ein staatlicher Hoechstpreis");
      expect(parsed?.subjekt).toContain("Ein staatlicher Hoechstpreis");
      expect(parsed?.mechanismus).toContain("verhindert Marktraeumung");
      expect(parsed?.urteil).toContain("Kurzfrist-Entlastung ja");
      expect(parsed?.selbsttest).toContain("___");
    });

    it("parses Mathe Kernsatz with Aufschluesselung format and math tokens", () => {
      const parsed = parseKernsatzFromText(matheKernsatzSnippet);
      expect(parsed).not.toBeNull();
      expect(parsed?.text).toContain("Grenzwert der Riemann-Summe");
      expect(parsed?.subjekt).toBe("das bestimmte Integral");
      expect(parsed?.mechanismus).toContain("Grenzwert der Riemann-Summe");
      expect(parsed?.urteil).toContain("Darstellung ueber Zerlegung");
      expect(parsed?.selbsttest).toContain("___");
    });

    it("parses Aufloesung mechanisms, causal essence, and exam axiom", () => {
      const parsed = parseAufloesungFromText(sowiAufloesungSnippet);
      expect(parsed).not.toBeNull();
      expect(parsed?.mechanismusA).toContain("价格在这里执行筛选和供给激励功能");
      expect(parsed?.mechanismusB).toContain("限价把价格信号冻住");
      expect(parsed?.kausaleEssenz).toContain("限价压住了租金数字, 却压不住租房缺口");
      expect(parsed?.klausurSatz).toContain("Ein staatlicher Hoechstpreis");
    });

    it("parses hyphenated Aufloesung with Mechanismus A/B and Ein-Satz-Kern", () => {
      const snippet = `
AUFLÖSUNG (nach der Wahl lesen)
Erst nach der Wahl von Weg A oder Weg B lesen:
- Mechanismus A: Kontinuierliche Fortleitung ohne Myelin
- Mechanismus B: Saltatorische Fortleitung von Schnuerring zu Schnuerring
- Ein-Satz-Kern: Natrium oeffnet Depolarisation, Kalium schliesst Repolarisation.

Klausur-Satz: \`Natrium oeffnet Depolarisation und Kalium schliesst Repolarisation.\`
`;
      const parsed = parseAufloesungFromText(snippet);
      expect(parsed).not.toBeNull();
      expect(parsed?.mechanismusA).toContain("Kontinuierliche Fortleitung");
      expect(parsed?.mechanismusB).toContain("Saltatorische Fortleitung");
      expect(parsed?.kausaleEssenz).toContain("Natrium oeffnet Depolarisation");
      expect(parsed?.klausurSatz).toContain("Natrium oeffnet Depolarisation");
    });

    it("parses Erwartungshorizont criteria, points, alternative paths, and model sentence", () => {
      const parsed = parseErwartungshorizontFromText(sowiErwartungshorizontSnippet);
      expect(parsed).not.toBeNull();
      expect(parsed?.rows).toHaveLength(3);
      expect(parsed?.rows[0].teilleistung).toContain("Effizienz");
      expect(parsed?.rows[0].punkteNum).toBe(6);
      expect(parsed?.rows[0].alternativweg).toContain("Wohlfahrtsdreieck");
      expect(parsed?.rows[1].punkteNum).toBe(4);
      expect(parsed?.rows[2].punkteNum).toBe(5);
      expect(parsed?.totalPoints).toBe(15);
      expect(parsed?.musterKlausursatz).toContain("Während ein Strompreisdeckel");
    });
  });

  describe("KernsatzCard component tests", () => {
    it("renders sentence, Dreisatz grid, and copies text to clipboard", async () => {
      const parsed = parseKernsatzFromText(sowiKernsatzSnippet)!;
      render(<KernsatzCard data={parsed} lang="de" />);

      expect(screen.getByText(/KERNSATZ · KLAUSUR-AXIOM/)).toBeInTheDocument();
      expect(screen.getByText(/Dreisatz-Zerlegung/)).toBeInTheDocument();
      expect(screen.getByText(/Subjekt \/ 主体/)).toBeInTheDocument();
      expect(screen.getByText(/Mechanismus \/ 机理/)).toBeInTheDocument();
      expect(screen.getByText(/Urteil \/ 结论/)).toBeInTheDocument();

      const copyBtn = screen.getByRole("button", { name: /Klausur-Satz kopieren/i });
      fireEvent.click(copyBtn);

      expect(navigator.clipboard.writeText).toHaveBeenCalledWith(
        expect.stringContaining("Ein staatlicher Hoechstpreis")
      );
      expect(screen.getByText("Kopiert!")).toBeInTheDocument();
    });

    it("toggles Selbsttest cloze reveal", () => {
      const parsed = parseKernsatzFromText(sowiKernsatzSnippet)!;
      render(<KernsatzCard data={parsed} lang="de" />);

      expect(screen.getByText(/Selbsttest/)).toBeInTheDocument();
      const revealBtn = screen.getByText("Lösung einblenden");
      fireEvent.click(revealBtn);

      expect(screen.getByText("Vollständiger Satz:")).toBeInTheDocument();
      expect(screen.getByText("Lücke wieder verdecken")).toBeInTheDocument();
    });
  });

  describe("ErwartungshorizontDrawer component tests", () => {
    it("renders criteria, calculates live points on click, and copies 15 NP model sentence", () => {
      const parsed = parseErwartungshorizontFromText(sowiErwartungshorizontSnippet)!;
      const onScoreChange = vi.fn();
      render(<ErwartungshorizontDrawer data={parsed} lang="de" onScoreChange={onScoreChange} />);

      expect(screen.getByText(/ERWARTUNGSHORIZONT/)).toBeInTheDocument();
      expect(screen.getByText("0 / 15 NP")).toBeInTheDocument();

      // Click first criterion (6 NP)
      const firstRow = screen.getByText(/Effizienz:/).closest("div[class*='cursor-pointer']")!;
      fireEvent.click(firstRow);

      expect(screen.getByText("6 / 15 NP")).toBeInTheDocument();
      expect(onScoreChange).toHaveBeenCalledWith(6);

      // Click second criterion (4 NP) -> 10 NP total
      const secondRow = screen.getByText(/Gerechtigkeit:/).closest("div[class*='cursor-pointer']")!;
      fireEvent.click(secondRow);

      expect(screen.getByText("10 / 15 NP")).toBeInTheDocument();
      expect(onScoreChange).toHaveBeenCalledWith(10);

      // Copy 15 NP model sentence
      const copyBtn = screen.getByText("Kopieren");
      fireEvent.click(copyBtn);

      expect(navigator.clipboard.writeText).toHaveBeenCalledWith(
        expect.stringContaining("Während ein Strompreisdeckel")
      );
      expect(screen.getByText("Kopiert!")).toBeInTheDocument();
    });

    it("toggles collapse and expand", () => {
      const parsed = parseErwartungshorizontFromText(sowiErwartungshorizontSnippet)!;
      render(<ErwartungshorizontDrawer data={parsed} defaultOpen={true} />);

      expect(screen.getByText(/Kriterien anklicken/)).toBeInTheDocument();
      const toggleBtn = screen.getByRole("button", { expanded: true });
      fireEvent.click(toggleBtn);

      expect(screen.queryByText(/Kriterien anklicken/)).toBeNull();
    });
  });

  describe("AufloesungCard component tests", () => {
    it("renders Option A and Option B mechanisms, causal essence, and Klausur-Satz", () => {
      const parsed = parseAufloesungFromText(sowiAufloesungSnippet)!;
      render(<AufloesungCard data={parsed} lang="de" />);

      expect(screen.getByText(/AUFLÖSUNG · KAUSALMECHANISMUS/)).toBeInTheDocument();
      expect(screen.getByText("Option A")).toBeInTheDocument();
      expect(screen.getByText("Option B")).toBeInTheDocument();
      expect(screen.getByText(/价格在这里执行筛选和供给激励功能/)).toBeInTheDocument();
      expect(screen.getByText(/限价把价格信号冻住/)).toBeInTheDocument();
      expect(screen.getByText(/KAUSALE ESSENZ/)).toBeInTheDocument();
      expect(screen.getByText(/限价压住了租金数字/)).toBeInTheDocument();
    });

    it("collapses and expands cleanly", () => {
      const parsed = parseAufloesungFromText(sowiAufloesungSnippet)!;
      render(<AufloesungCard data={parsed} lang="de" defaultRevealed={true} />);

      const toggleBtn = screen.getByText("Einklappen");
      fireEvent.click(toggleBtn);

      expect(screen.queryByText("Option A")).toBeNull();
      expect(screen.getByText("Mechanismus aufdecken")).toBeInTheDocument();
    });
  });
});
