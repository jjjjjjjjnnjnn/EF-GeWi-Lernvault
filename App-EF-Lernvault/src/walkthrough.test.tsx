/** V1 walkthrough: echter L1-kurs -> parse -> UI-reise (simulierter user, engine aus). */
import { beforeEach, describe, expect, it, vi } from "vitest";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

// ?raw ausserhalb root: mock zieht ECHTE vault-datei per fs (kein fixture-drift)
vi.mock("../../Lernreise/Sowi-Soziale-Marktwirtschaft-L1.md?raw", async () => {
  const fs = await import("node:fs");
  const path = await import("node:path");
  return {
    default: fs.readFileSync(
      path.resolve(process.cwd(), "../Lernreise/Sowi-Soziale-Marktwirtschaft-L1.md"),
      "utf8"
    ),
  };
});

import { parseReiseFile, type Reise } from "./reise";
import ReiseModule from "./modules/Reise";
import { FeedbackFloat } from "./components/FeedbackBox";
import { feedbackStore, xpStore } from "./engine/stores";

const L1_URL = resolve(process.cwd(), "../Lernreise/Sowi-Soziale-Marktwirtschaft-L1.md");
const AI_KEY = "eflernvault:ai:v1";

function engineOff() {
  localStorage.setItem(AI_KEY, JSON.stringify({ version: 1, engine: "off", providerId: "", apiKey: "", model: "", baseUrl: "", embedModel: "", vectorMode: "off", hfMirror: "" }));
}

beforeEach(() => {
  localStorage.clear();
  engineOff();
  window.alert = vi.fn() as unknown as typeof window.alert;
  window.history.replaceState({}, "", "/?mode=wizard"); // katalog-ansicht
});

describe("L1 datei -> parser (echte vault-datei)", () => {
  it("8 schritte, typ-folge, diagramm, fehlvorstellung-skip, check3, rubric", () => {
    const raw = readFileSync(L1_URL, "utf8");
    const r: Reise | null = parseReiseFile("Lernreise/Sowi-Soziale-Marktwirtschaft-L1.md", raw);
    expect(r).not.toBeNull();
    expect(r!.thema).toMatch(/Soziale Marktwirtschaft/);
    expect(r!.fach).toBe("SoWi");
    expect(r!.schritte.map((s) => s.typ)).toEqual([
      "entdecken", "entdecken", "entdecken",
      "ausprobieren", "ausprobieren",
      "check", "szenario", "entdecken",
    ]);
    const s3 = r!.schritte[2];
    expect(s3.typ).toBe("entdecken");
    if (s3.typ === "entdecken") {
      expect(s3.blocks.some((b) => b.kind === "diagram")).toBe(true);
    }
    const check = r!.schritte[5];
    expect(check.typ).toBe("check");
    if (check.typ === "check") expect(check.items).toHaveLength(3);
    const szen = r!.schritte[6];
    expect(szen.typ).toBe("szenario");
    if (szen.typ === "szenario") expect(szen.rubricPoints.length).toBeGreaterThanOrEqual(2);
  });
});

describe("UI-reise: katalog -> start -> alle schritte -> xp (simulierter user)", () => {
  it("gating + xp + feedback-kontext", async () => {
    const user = userEvent.setup();
    const raw = readFileSync(L1_URL, "utf8");
    const kurs = parseReiseFile("Lernreise/Sowi-Soziale-Marktwirtschaft-L1.md", raw)!;

    render(
      <>
        <ReiseModule lang="zh" vaultReisen={[kurs]} />
        <FeedbackFloat lang="zh" />
      </>
    );

    // A: katalog listet L1
    expect(screen.getByText("Soziale Marktwirtschaft")).toBeInTheDocument();
    await user.click(screen.getByText("开始学习 →"));

    // rail: 8 schritte, nur 01 frei
    const rail = screen.getByText(/步骤 1 \/ 8/).parentElement!; // rail-zeile selbst
    const stepBtns = within(rail).getAllByRole("button");
    expect(stepBtns).toHaveLength(8);
    expect(stepBtns[0]).toBeEnabled();
    expect(stepBtns[1]).toBeDisabled(); // gating: schritt 2 gesperrt

    // B: schritt 1 entdecken -> weiter
    await user.click(screen.getByText("已理解，下一步 (+5 XP) →"));
    expect(screen.getByText(/步骤 2 \/ 8/)).toBeInTheDocument();

    // schritt 2 entdecken -> weiter
    await user.click(screen.getByText("已理解，下一步 (+5 XP) →"));

    // C: schritt 3 diagramm-ascii (engine aus -> pre-fallback)
    expect(screen.getByText(/MARKT-Säule/)).toBeInTheDocument();
    await user.click(screen.getByText("已理解，下一步 (+5 XP) →"));

    // D: schritt 4 ausprobieren (engine aus -> statik-feedback, entsperrt weiter)
    const ta1 = screen.getByPlaceholderText("Hier zuordnen oder Stichpunkte eingeben...");
    await user.type(ta1, "Mindestlohn bremst Preismechanismus, staerkt Ausgleich, greift Tarifautonomie ein.");
    await user.click(screen.getByText("检查答案"));
    expect(screen.getByText(/Versuch notiert/)).toBeInTheDocument();
    await user.click(screen.getByText("下一步 (+15 XP) →"));

    // schritt 5 ausprobieren
    const ta2 = screen.getByPlaceholderText("Hier zuordnen oder Stichpunkte eingeben...");
    await user.type(ta2, "Ich waehle Verfahren (i), weil Brotpreis Angebot/Nachfrage folgt.");
    await user.click(screen.getByText("检查答案"));
    await user.click(screen.getByText("下一步 (+15 XP) →"));

    // E: schritt 6 check — weiter zuerst gesperrt
    const weiter20 = screen.getByText("下一步 (+20 XP) →");
    expect(weiter20).toBeDisabled();

    // B: engine aus -> KI-knoepfe disabled MIT hinweis (nutzer-bug Schritt6)
    const warums = screen.getAllByText("为啥？AI讲解（AI未开启）");
    expect(warums).toHaveLength(3);
    warums.forEach((b) => expect(b).toBeDisabled());
    const scores = screen.getAllByText("AI批改·打分（AI未开启）");
    expect(scores).toHaveLength(3);
    scores.forEach((b) => expect(b).toBeDisabled());

    // H: feedback-float traegt live kurs-kontext (mitten im kurs, schritt 6)
    await user.click(screen.getByText("Feedback / 反馈"));
    expect(screen.getByText(`位置：${kurs.id}#Schritt6`)).toBeInTheDocument();
    await user.type(screen.getByPlaceholderText("哪卡住了？直接写一句 …"), "walkthrough-simulation ok");
    await user.click(screen.getByText("保存反馈"));
    const entries = feedbackStore.load().entries;
    expect(entries[0].text).toBe("walkthrough-simulation ok");
    expect(entries[0].ctx).toBe(`${kurs.id}#Schritt6`);

    const marks = screen.getAllByText("Selbstcheck / 标为通过");
    expect(marks).toHaveLength(3);
    for (const m of marks) await user.click(m);
    expect(screen.getByText("下一步 (+20 XP) →")).toBeEnabled();
    await user.click(screen.getByText("下一步 (+20 XP) →"));

    // F: schritt 7 szenario — 2 rubric-haken noetig
    const weiter30 = screen.getByText("下一步 (+30 XP) →");
    expect(weiter30).toBeDisabled();
    const boxes = screen.getAllByRole("checkbox");
    await user.click(boxes[0]);
    await user.click(boxes[1]);
    expect(screen.getByText("下一步 (+30 XP) →")).toBeEnabled();
    await user.click(screen.getByText("下一步 (+30 XP) →"));

    // G: schritt 8 -> abschliessen -> xp + katalog
    await user.click(screen.getByText("完成课程 (+5 XP) ✓"));
    expect(window.alert).toHaveBeenCalled();
    expect(xpStore.load().xp).toBeGreaterThan(0);
    expect(screen.getByText("Soziale Marktwirtschaft")).toBeInTheDocument(); // zurueck im katalog
  });
});
