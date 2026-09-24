import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { act, fireEvent, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import Lernbaum from "./Lernbaum";
import type { BaumNode, FachBaum } from "../baum/types";

const PENDING = "\u23F3";

function knoten(
  teil: Partial<BaumNode> & { id: string; level: 0 | 1 | 2 | 3 },
  kinder: BaumNode[] = []
): BaumNode {
  return {
    code: teil.id,
    titleDE: teil.id,
    titleZH: teil.id,
    operatoren: [],
    klausurDE: `${teil.id} Klausur`,
    klausurZH: `${teil.id} 考试`,
    leitfrageDE: `${teil.id} Leitfrage`,
    leitfrageZH: `${teil.id} 问题`,
    noteKeywords: [],
    ...teil,
    children: kinder,
  };
}

const vertragBlatt = knoten({
  id: "sowi-l3-vertrag",
  level: 3,
  code: "SW-V",
  titleDE: "Vertrag",
  titleZH: "合同",
  operatoren: ["darstellen"],
  klausurDE: "Vertrag im Tausch darstellen",
  klausurZH: "描述交换中的合同",
  leitfrageDE: "Was regelt der Vertrag?",
  leitfrageZH: "合同规定了什么？",
  noteKeywords: ["vertrag"],
});

const eigentumBlatt = knoten({
  id: "sowi-l3-eigentum",
  level: 3,
  code: "SW-E",
  titleDE: "Eigentum",
  titleZH: `所有权 ${PENDING}`,
  operatoren: ["beurteilen"],
  klausurDE: "Eigentum beurteilen",
  klausurZH: "评价所有权",
  leitfrageDE: "Wem nutzt das Eigentum?",
  leitfrageZH: "所有权对谁有利？",
  noteKeywords: ["eigentum"],
});

const sowiBaum: FachBaum = {
  fach: "SoWi",
  nameDE: "Sozialwissenschaften",
  nameZH: "社会科学",
  klpReferenz: "SW-EF",
  klausurFokusDE: "Markt und Ordnung",
  klausurFokusZH: "市场与秩序",
  root: knoten(
    {
      id: "sowi-root",
      level: 0,
      code: "SW",
      titleDE: "Sozialwissenschaften",
      titleZH: "社会科学",
    },
    [
      knoten(
        {
          id: "sowi-l1-markt",
          level: 1,
          code: "SW-1",
          titleDE: "Marktwirtschaft",
          titleZH: "市场经济",
        },
        [
          knoten(
            {
              id: "sowi-l2-sozial",
              level: 2,
              code: "SW-2",
              titleDE: "Soziale Marktwirtschaft",
              titleZH: "社会市场经济",
            },
            [vertragBlatt, eigentumBlatt]
          ),
        ]
      ),
    ]
  ),
};

const deutschBaum: FachBaum = {
  fach: "Deutsch",
  nameDE: "Deutsch",
  nameZH: "德语",
  klpReferenz: "DE-EF",
  klausurFokusDE: "Texte und Sprache",
  klausurFokusZH: "文本与语言",
  root: knoten(
    {
      id: "de-root",
      level: 0,
      code: "DE",
      titleDE: "Deutsch",
      titleZH: "德语",
    },
    [
      knoten({
        id: "de-l1-sprache",
        level: 1,
        code: "DE-1",
        titleDE: "Sprache",
        titleZH: "语言",
        noteKeywords: ["sprache"],
      }),
    ]
  ),
};

const baeume = [sowiBaum, deutschBaum];

const vaultNotes = [
  {
    id: "n-vertrag",
    fach: "SoWi",
    thema: "Vertrag",
    path: "08_SoWi/Vertrag.md",
    operatoren: ["darstellen"],
    blocks: [{ text: "Der Vertrag regelt den Tausch." }],
    tags: ["EF", "SoWi"],
  },
];

const source = readFileSync(resolve(process.cwd(), "src/modules/Lernbaum.tsx"), "utf8");

function taste(fenster: Window, init: KeyboardEventInit) {
  const event = new KeyboardEvent("keydown", { ...init, cancelable: true });
  act(() => {
    fenster.dispatchEvent(event);
  });
  return event;
}

beforeEach(() => {
  localStorage.clear();
});

describe("Lernbaum Übersicht", () => {
  it("zeigt Fach-Pillen und alle Wurzeln in der Übersicht", async () => {
    const user = userEvent.setup();
    const onSubjectChange = vi.fn();
    render(
      <Lernbaum
        lang="de"
        baeume={baeume}
        vaultNotes={null}
        onSubjectChange={onSubjectChange}
      />
    );

    expect(screen.getByRole("button", { name: "Alle" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "SoWi" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Deutsch" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Sozialwissenschaften · 社会科学" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Deutsch · 德语" })).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Deutsch" }));
    expect(onSubjectChange).toHaveBeenCalledWith("Deutsch");
    expect(screen.queryByRole("button", { name: "Sozialwissenschaften · 社会科学" })).not.toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Deutsch · 德语" })).toBeInTheDocument();
  });

  it("meldet ehrlich Lücke ohne Vault-Anbindung", async () => {
    const user = userEvent.setup();
    render(<Lernbaum lang="de" baeume={baeume} vaultNotes={null} />);

    await user.click(screen.getByRole("button", { name: "Vertrag · 合同" }));
    const panel = screen.getByRole("complementary", { name: "Knotendetails" });
    expect(within(panel).getAllByText(/Lücke/)).toHaveLength(2);
    expect(screen.getByText(/Noch keine Notizen verknüpft/)).toBeInTheDocument();
  });
});

describe("Lernbaum Suche", () => {
  it("filtert live, wählt mit Enter den ersten Treffer und leert mit Esc", async () => {
    const user = userEvent.setup();
    render(<Lernbaum lang="de" baeume={baeume} vaultNotes={vaultNotes} />);

    const suche = screen.getByLabelText("Lernbaum suchen");
    await user.type(suche, "vertrag");
    expect(screen.getByText("1 Treffer")).toBeInTheDocument();

    fireEvent.keyDown(suche, { key: "Enter", code: "Enter" });
    expect(screen.getByRole("heading", { name: "Vertrag" })).toBeInTheDocument();

    fireEvent.keyDown(suche, { key: "Escape", code: "Escape" });
    expect(suche).toHaveValue("");
  });

  it("fokussiert die Suche mit der Taste f", () => {
    render(<Lernbaum lang="de" baeume={baeume} vaultNotes={vaultNotes} />);
    const suche = screen.getByLabelText("Lernbaum suchen");
    expect(suche).not.toHaveFocus();
    taste(window, { key: "f", code: "KeyF" });
    expect(suche).toHaveFocus();
  });
});

describe("Lernbaum Details", () => {
  it("öffnet per Knotenklick Serifentitel, Operatoren, Klausur und Notizen", async () => {
    const user = userEvent.setup();
    const onJumpToLibrary = vi.fn();
    render(
      <Lernbaum
        lang="de"
        baeume={baeume}
        vaultNotes={vaultNotes}
        onJumpToLibrary={onJumpToLibrary}
      />
    );

    await user.click(screen.getByRole("button", { name: "Vertrag · 合同" }));
    const panel = screen.getByRole("complementary", { name: "Knotendetails" });
    const titel = within(panel).getByRole("heading", { name: "Vertrag" });
    expect(titel).toHaveClass("font-serif");
    expect(within(panel).getByText("合同")).toBeInTheDocument();
    expect(screen.getByText("darstellen")).toBeInTheDocument();
    expect(screen.getByText("Vertrag im Tausch darstellen")).toBeInTheDocument();
    expect(screen.getByText("Was regelt der Vertrag?")).toBeInTheDocument();
    expect(within(panel).getByText(/offen/)).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Vertrag · 08_SoWi/Vertrag.md" }));
    expect(onJumpToLibrary).toHaveBeenCalledWith("vertrag", "SoWi", "n-vertrag");
  });

  it("zeigt den Bestätigungs-Hinweis bei unbestätigtem Titel", async () => {
    const user = userEvent.setup();
    render(<Lernbaum lang="zh" baeume={baeume} vaultNotes={vaultNotes} />);

    await user.click(screen.getByRole("button", { name: `Eigentum · 所有权 ${PENDING}` }));
    const panel = screen.getByRole("complementary", { name: "节点详情" });
    expect(screen.getByText("待确认")).toBeInTheDocument();
    expect(within(panel).getByText(/Lücke/)).toBeInTheDocument();
  });
});

describe("Lernbaum Falten und Zoom", () => {
  it("klappt Äste per Toggle ein und aus", async () => {
    const user = userEvent.setup();
    render(<Lernbaum lang="de" baeume={baeume} vaultNotes={null} />);

    expect(screen.getByRole("button", { name: /Vertrag ·/ })).toBeInTheDocument();
    const toggle = screen.getByRole("button", {
      name: "Ast einklappen: Soziale Marktwirtschaft",
    });
    expect(toggle).toHaveAttribute("aria-expanded", "true");

    await user.click(toggle);
    expect(screen.queryByRole("button", { name: /Vertrag ·/ })).not.toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Ast aufklappen: Soziale Marktwirtschaft" })
    ).toHaveAttribute("aria-expanded", "false");

    await user.click(
      screen.getByRole("button", { name: "Ast aufklappen: Soziale Marktwirtschaft" })
    );
    expect(screen.getByRole("button", { name: /Vertrag ·/ })).toBeInTheDocument();
  });

  it("klappt mit e alle Äste auf und zu", () => {
    render(<Lernbaum lang="de" baeume={baeume} vaultNotes={null} />);
    expect(screen.getByRole("button", { name: /Vertrag ·/ })).toBeInTheDocument();
    taste(window, { key: "e", code: "KeyE" });
    expect(screen.queryByRole("button", { name: /Vertrag ·/ })).not.toBeInTheDocument();
    taste(window, { key: "e", code: "KeyE" });
    expect(screen.getByRole("button", { name: /Vertrag ·/ })).toBeInTheDocument();
  });

  it("zoomt per Buttons und Tasten zwischen 0.5 und 1.6", async () => {
    const user = userEvent.setup();
    const { container } = render(
      <Lernbaum lang="de" baeume={baeume} vaultNotes={null} />
    );
    const skaliert = () =>
      (container.querySelector('[aria-label="Lernbaum-Karte"] > div') as HTMLElement)
        .style.transform;

    expect(skaliert()).toContain("scale(1)");
    await user.click(screen.getByRole("button", { name: "Vergrößern" }));
    expect(skaliert()).toContain("scale(1.1)");
    taste(window, { key: "-", code: "Minus" });
    expect(skaliert()).toContain("scale(1)");
    taste(window, { key: "+", code: "Equal" });
    expect(skaliert()).toContain("scale(1.1)");
    taste(window, { key: "0", code: "Digit0" });
    expect(skaliert()).toContain("scale(1)");
  });
});

describe("Lernbaum Quellvertrag", () => {
  it("nutzt Token und meidet Hex, Schatten, Rundungen, Minitext, Kursiv und Emoji", () => {
    const hex = source.match(/#[0-9a-fA-F]{3,8}\b/g) ?? [];
    const verstosse = [
      ...hex.map((w) => `hex:${w}`),
      ...Array.from(source.matchAll(/\bshadow-(?!none\b)[\w-]+/g), (m) => `shadow:${m[0]}`),
      ...Array.from(source.matchAll(/\bboxShadow\s*[:=]/g), (m) => `box-shadow:${m[0]}`),
      ...Array.from(source.matchAll(/\brounded-(?:sm|md|lg|xl|2xl|3xl)\b/g), (m) => `radius:${m[0]}`),
      ...Array.from(
        source.matchAll(/\brounded-\[(?!var\(--radius\)\])[^\]]+\]/g),
        (m) => `inline-radius:${m[0]}`
      ),
      ...Array.from(source.matchAll(/\bborderRadius\s*[:=]/g), (m) => `inline-radius:${m[0]}`),
      ...Array.from(source.matchAll(/\btext-\[(?:9|10|11)px\]/g), (m) => `small-text:${m[0]}`),
      ...Array.from(
        source.matchAll(/\bfontSize\s*:\s*["'](?:9|10|11)px["']/g),
        (m) => `small-text:${m[0]}`
      ),
      ...Array.from(source.matchAll(/\banimate-(?:pulse|spin|bounce|ping)\b/g), (m) => `animation:${m[0]}`),
      ...Array.from(source.matchAll(/\bitalic\b/g), (m) => `italic:${m[0]}`),
      ...Array.from(source.matchAll(/[\u{1F000}-\u{1FAFF}\u{2600}-\u{27BF}]/gu), (m) => `emoji:${m[0]}`),
      ...Array.from(source.matchAll(/[●■✓✔✕✖×]/g), (m) => `symbol:${m[0]}`),
      ...Array.from(
        source.matchAll(/<button(?![^>]*\btype=)[^>]*>/g),
        (m) => `button-type:${m[0]}`
      ),
      ...Array.from(
        source.matchAll(/<(?:div|span|a|li|label)\b[^>]*\bonClick=/g),
        (m) => `native:${m[0]}`
      ),
    ];
    expect(verstosse).toEqual([]);
    for (const token of ["var(--ink)", "var(--paper)", "var(--surface)", "var(--line)", "var(--gray)", "var(--accent)"]) {
      expect(source).toContain(token);
    }
  });

  it("hält Icons 16x16 mit currentColor und zeichnet Kanten als Kurven", () => {
    const tags = Array.from(source.matchAll(/<svg\b[^>]*>/g)).map((m) => m[0]);
    const diagram = tags.find((tag) => tag.includes('data-relationship-diagram="true"'));
    const icons = tags.filter((tag) => !tag.includes("data-relationship-diagram"));
    expect(diagram).toBeDefined();
    expect(diagram).toContain('fill="none"');
    expect(diagram).toContain('stroke="currentColor"');
    expect(diagram).toContain('aria-hidden="true"');
    expect(icons.length).toBeGreaterThan(3);
    for (const tag of icons) {
      for (const merkmal of [
        'width="16"',
        'height="16"',
        'viewBox="0 0 16 16"',
        'fill="none"',
        'stroke="currentColor"',
        'aria-hidden="true"',
      ]) {
        expect(tag).toContain(merkmal);
      }
    }
    expect(source).toContain('data-relationship-diagram="true"');
    expect(source).toMatch(/<path[^>]*d=\{`M /);
    expect(source).toContain("matchesKey");
    expect(source).toContain("PER_MODULE_KEYS.lernbaum[0]");
    expect(source).toContain("PER_MODULE_KEYS.lernbaum[1]");
    expect(source).toContain("PER_MODULE_KEYS.lernbaum[2]");
    expect(source).toContain("PER_MODULE_KEYS.lernbaum[3]");
    expect(source).toContain("PER_MODULE_KEYS.lernbaum[4]");
  });
});
