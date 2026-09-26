import { describe, expect, it, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ReiseModule from "./Reise";
import type { Reise } from "../reise";

const mockCourse: Reise = {
  id: "test-course-de",
  path: "Lernreise/Test-Course-DE-L1.md",
  fach: "SoWi",
  thema: "Soziale Marktwirtschaft",
  level: 1,
  ziel: "Klausur",
  xp: 70,
  schritte: [
    {
      typ: "entdecken",
      stepNumber: 1,
      title: "Ordnungspolitischer Rahmen",
      rawText: "Das Konzept der Sozialen Marktwirtschaft verbindet Markt und Ausgleich.",
      blocks: [
        {
          kind: "p",
          text: "Das Konzept der Sozialen Marktwirtschaft verbindet Markt und Ausgleich.",
          lang: "de",
        },
      ],
    },
    {
      typ: "ausprobieren",
      stepNumber: 2,
      title: "Markt vs Staat Experiment",
      aufgabe: "Analysiere die Rolle des Staates bei Marktversagen.",
      hilfe: "Denke an Kartellgesetze und Infrastruktur.",
      antwort: "Der Staat setzt Rahmenbedingungen.",
    },
    {
      typ: "check",
      stepNumber: 3,
      title: "Verständnisprüfung",
      items: [
        {
          id: "q1",
          frage: "Was bedeutet Subsidiaritätsprinzip?",
          antwort: "Kleinere Einheiten handeln zuerst.",
        },
      ],
    },
  ],
};

beforeEach(() => {
  localStorage.clear();
  window.alert = vi.fn() as unknown as typeof window.alert;
  Element.prototype.scrollIntoView = vi.fn();
});

describe("ReiseModule Document Mode & Sticky TOC", () => {
  it("renders continuous document flow with all steps and sticky TOC", async () => {
    const user = userEvent.setup();

    render(
      <ReiseModule
        lang="de"
        vaultReisen={[mockCourse]}
        initialCourseId="test-course-de"
        initialViewMode="document"
      />
    );

    // 1. Both sections and TOC items are rendered in the DOM at the same time
    expect(screen.getAllByText("Ordnungspolitischer Rahmen").length).toBeGreaterThanOrEqual(2);
    expect(screen.getAllByText("Markt vs Staat Experiment").length).toBeGreaterThanOrEqual(2);
    expect(screen.getAllByText("Verständnisprüfung").length).toBeGreaterThanOrEqual(2);

    // 2. Section anchors exist
    expect(document.getElementById("schritt-1")).toBeInTheDocument();
    expect(document.getElementById("schritt-2")).toBeInTheDocument();
    expect(document.getElementById("schritt-3")).toBeInTheDocument();

    // 3. German localization
    expect(screen.getByText("Gliederung")).toBeInTheDocument();
    expect(screen.getByText(/3 Stationen/)).toBeInTheDocument();
    expect(screen.getByText("Lektion abgeschlossen")).toBeInTheDocument();

    // 4. Clicking TOC item triggers smooth scroll
    const tocItems = screen.getAllByRole("button", { name: /02/i });
    expect(tocItems.length).toBeGreaterThan(0);
    await user.click(tocItems[0]);
    expect(Element.prototype.scrollIntoView).toHaveBeenCalled();

    // 5. Completion card at bottom
    const finishBtn = screen.getByText("Lektion abschließen (+70 XP)");
    expect(finishBtn).toBeInTheDocument();
    await user.click(finishBtn);
    expect(window.alert).toHaveBeenCalled();
  });

  it("allows switching between Document view and Steps view via toggle", async () => {
    const user = userEvent.setup();

    render(
      <ReiseModule
        lang="de"
        vaultReisen={[mockCourse]}
        initialCourseId="test-course-de"
        initialViewMode="document"
      />
    );

    // Initially in document mode
    expect(screen.getByText("Gliederung")).toBeInTheDocument();

    // Click 'Schritte' toggle button
    const stepsToggle = screen.getByRole("button", { name: "Schritte" });
    await user.click(stepsToggle);

    // Now in steps mode (shows step counter e.g. "Schritt 1 / 3")
    expect(screen.getByText(/Schritt 1 \/ 3/)).toBeInTheDocument();

    // Click 'Dokument' toggle button to switch back
    const docToggle = screen.getByRole("button", { name: "Dokument" });
    await user.click(docToggle);
    expect(screen.getByText("Gliederung")).toBeInTheDocument();
  });

  it("guards against cross-subject tool leakage: Bio course receives OsmoseSimulator even if balance was requested", () => {
    const bioCourseWithMisroutedTool: Reise = {
      id: "bio-osmose-test",
      path: "Lernreise/Bio-Test-L1.md",
      fach: "Bio",
      thema: "Osmose Test",
      level: 1,
      ziel: "Klausur",
      xp: 50,
      schritte: [
        {
          typ: "ausprobieren",
          stepNumber: 1,
          title: "Wasserpotenzial Test",
          aufgabe: "[Werkzeug: balance] Berechne Psi",
          toolId: "balance",
        },
      ],
    };

    render(
      <ReiseModule
        lang="de"
        vaultReisen={[bioCourseWithMisroutedTool]}
        initialCourseId="bio-osmose-test"
        initialViewMode="document"
      />
    );

    // 1. Must NOT render SoWi/Philo dialectic balance board
    expect(screen.queryByText(/Urteils-Waage/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/These/i)).not.toBeInTheDocument();

    // 2. Must render the Bio Osmose simulator
    expect(screen.getByText(/Biomembran & Osmose/i)).toBeInTheDocument();
    expect(screen.getByText(/Wasserpotenzial-Simulator/i)).toBeInTheDocument();
  });

  it("provides working back-to-top button in document view", async () => {
    const user = userEvent.setup();
    const scrollToMock = vi.fn();
    window.scrollTo = scrollToMock;

    render(
      <ReiseModule
        lang="de"
        vaultReisen={[mockCourse]}
        initialCourseId="test-course-de"
        initialViewMode="document"
      />
    );

    const topBtn = screen.getByRole("button", { name: /Nach oben/i });
    expect(topBtn).toBeInTheDocument();
    await user.click(topBtn);
    expect(scrollToMock).toHaveBeenCalledWith(expect.objectContaining({ top: 0, behavior: "smooth" }));
  });
});
