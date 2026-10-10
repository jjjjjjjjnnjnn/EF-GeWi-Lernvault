import { describe, expect, it, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import ReiseModule from "./Reise";
import type { Reise } from "../reise";

const mockSowiWahlCourse: Reise = {
  id: "sowi-parteien-willensbildung-l1",
  path: "Lernreise/SoWi-Parteien-Willensbildung-L1.md",
  fach: "SoWi",
  thema: "Parteien & Willensbildung",
  level: 1,
  ziel: "Klausur",
  xp: 80,
  schritte: [
    {
      typ: "entdecken",
      stepNumber: 1,
      title: "Parteien und Wahlsystem",
      rawText: "Art. 21 GG Parteien wirken an der politischen Willensbildung mit.",
      blocks: [
        {
          kind: "p",
          text: "Art. 21 GG Parteien wirken an der politischen Willensbildung mit.",
          lang: "de",
        },
      ],
    },
    {
      typ: "ausprobieren",
      stepNumber: 2,
      title: "Bundestagswahl & 5%-Hürde Simulator",
      toolId: "wahlsystem-sim",
      aufgabe: "Analysieren Sie die Sitzverteilung im Bundestag nach der Reform 2023. [Werkzeug: wahlsystem-sim]",
      hilfe: "Nutzen Sie den Simulator zur Veranschaulichung der Zweitstimmendeckung.",
      antwort: "Das neue Wahlrecht deckelt die Sitze strikt auf 630.",
    },
  ],
};

const mockPhiloRawlsCourse: Reise = {
  id: "philo-gerechtigkeit-rawls-schleier-des-nichtwissens-l1",
  path: "Lernreise/Philo-Gerechtigkeit-Rawls-Schleier-des-Nichtwissens-L1.md",
  fach: "Philosophie",
  thema: "Gerechtigkeit als Fairness: Schleier des Nichtwissens",
  level: 1,
  ziel: "Klausur",
  xp: 80,
  schritte: [
    {
      typ: "entdecken",
      stepNumber: 1,
      title: "Der Urzustand",
      rawText: "Unter dem Schleier des Nichtwissens wählen Akteure die Maximin-Regel.",
      blocks: [
        {
          kind: "p",
          text: "Unter dem Schleier des Nichtwissens wählen Akteure die Maximin-Regel.",
          lang: "de",
        },
      ],
    },
    {
      typ: "ausprobieren",
      stepNumber: 2,
      title: "Der Verteilungskonflikt",
      toolId: "rawls-sim",
      aufgabe: "Entscheiden Sie sich für eine Gesellschaftsordnung unter dem Schleier des Nichtwissens. [Werkzeug: rawls-sim]",
      hilfe: "Achten Sie auf das Differenzprinzip und die Sicherung des Existenzminimums.",
      antwort: "System C sichert das maximale Minimum ab.",
    },
  ],
};

describe("ReiseModule Tools Integration (WahlsystemSim & RawlsVerteilungsSim)", () => {
  beforeEach(() => {
    localStorage.clear();
    window.alert = vi.fn() as unknown as typeof window.alert;
    Element.prototype.scrollIntoView = vi.fn();
  });

  it("mounts WahlsystemSim in step 2 for SoWi lesson declaring wahlsystem-sim", () => {
    render(
      <ReiseModule
        lang="de"
        vaultReisen={[mockSowiWahlCourse]}
        initialCourseId={mockSowiWahlCourse.id}
        initialViewMode="document"
      />
    );

    // Verify WahlsystemSim is rendered
    expect(
      screen.getByText(/Bundestagswahl & Sitzverteilung/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Sainte-Laguë/i)
    ).toBeInTheDocument();
  });

  it("mounts RawlsVerteilungsSim in step 2 for Philosophie lesson declaring rawls-sim", () => {
    render(
      <ReiseModule
        lang="de"
        vaultReisen={[mockPhiloRawlsCourse]}
        initialCourseId={mockPhiloRawlsCourse.id}
        initialViewMode="document"
      />
    );

    // Verify RawlsVerteilungsSim is rendered
    expect(
      screen.getByText(/Rawls-Verteilungssimulator & Schleier des Nichtwissens/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/1\. Moralische Waage/i)
    ).toBeInTheDocument();
  });
});
