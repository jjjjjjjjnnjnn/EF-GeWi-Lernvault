import { describe, expect, it, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import ReiseModule from "./Reise";
import type { Reise } from "../reise";

const mockFaustCourse: Reise = {
  id: "deutsch-faust-gretchenfrage-l1",
  path: "Lernreise/Deutsch-Drama-Faust-Gretchenfrage-L1.md",
  fach: "Deutsch",
  thema: "Faust: Gretchenfrage & Pantheismus",
  level: 1,
  ziel: "Klausur",
  xp: 80,
  schritte: [
    {
      typ: "entdecken",
      stepNumber: 1,
      title: "Gretchenfrage Kontext",
      rawText: "Gretchens Frage stellt Fausts pantheistische Weltsicht auf die Probe.",
      blocks: [
        {
          kind: "p",
          text: "Gretchens Frage stellt Fausts pantheistische Weltsicht auf die Probe.",
          lang: "de",
        },
      ],
    },
    {
      typ: "ausprobieren",
      stepNumber: 2,
      title: "Textlupe im Dramendialog",
      toolId: "text-analyse",
      aufgabe: "Analysiere Fausts Replik in Marthes Garten.",
      hilfe: "Achte auf rhetorische Fragen und Pantheismus.",
      antwort: "Gefühl ist alles, Name ist Schall und Rauch.",
    },
  ],
};

const mockMacbethCourse: Reise = {
  id: "englisch-shakespeare-monologue-analysis-l1",
  path: "Lernreise/Englisch-Shakespeare-Monologue-Analysis-L1.md",
  fach: "Englisch",
  thema: "Shakespeare: Macbeth Soliloquy Analysis",
  level: 1,
  ziel: "Klausur",
  xp: 80,
  schritte: [
    {
      typ: "entdecken",
      stepNumber: 1,
      title: "Tomorrow Soliloquy",
      rawText: "Macbeth reflects on life's brevity and vanity.",
      blocks: [
        {
          kind: "p",
          text: "Macbeth reflects on life's brevity and vanity.",
          lang: "de",
        },
      ],
    },
    {
      typ: "ausprobieren",
      stepNumber: 2,
      title: "Soliloquy Analysis Workshop",
      toolId: "text-analyse",
      aufgabe: "Examine the central metaphors in Act 5 Scene 5.",
      hilfe: "Brief candle, walking shadow, poor player.",
      antwort: "Life is a tale told by an idiot.",
    },
  ],
};

beforeEach(() => {
  localStorage.clear();
  window.alert = vi.fn() as unknown as typeof window.alert;
  Element.prototype.scrollIntoView = vi.fn();
});

describe("ReiseModule GeWiReadingLab Integration", () => {
  it("mounts GeWiReadingLab in step 2 for Deutsch Faust lesson with text-analyse werkzeug", () => {
    render(
      <ReiseModule
        lang="de"
        vaultReisen={[mockFaustCourse]}
        initialCourseId="deutsch-faust-gretchenfrage-l1"
        initialViewMode="document"
      />
    );

    // Goethe Faust passage or selector should be present in GeWiReadingLab
    expect(screen.getAllByText(/Johann Wolfgang von Goethe/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Faust\. Der Tragödie erster Teil/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Nächste|Vorherige/i).length).toBeGreaterThan(0);
  });

  it("mounts GeWiReadingLab in step 2 for Englisch Shakespeare lesson with text-analyse werkzeug", () => {
    render(
      <ReiseModule
        lang="de"
        vaultReisen={[mockMacbethCourse]}
        initialCourseId="englisch-shakespeare-monologue-analysis-l1"
        initialViewMode="document"
      />
    );

    // GeWiReadingLab renders for Shakespeare / Macbeth
    expect(screen.getAllByText(/William Shakespeare/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Macbeth/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Nächste|Vorherige/i).length).toBeGreaterThan(0);
  });
});
