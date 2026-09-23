import { beforeEach, describe, expect, it, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import type { VaultNote } from "../vault/parser";
import { MasteryEngine } from "../engine/mastery";
import { getExamTopicId } from "../engine/examComposer";
import { KlausurSim } from "./KlausurSim";

function note(path: string, fach: string, thema: string): VaultNote {
  return {
    id: path,
    path,
    fach,
    thema,
    operatoren: ["darstellen", "analysieren", "beurteilen"],
    klausurrelevant: true,
    datum: "2026-01-01",
    tags: ["EF", fach],
    blocks: [
      {
        kind: "h2",
        text: "Klausur-Sätze",
        lang: "de",
      },
      {
        kind: "li",
        text: `Darstellen: ${thema} wird strukturiert eingeordnet.`,
        lang: "de",
      },
    ],
  };
}

const notes: VaultNote[] = [
  note("08_SoWi/Teilhabe.md", "SoWi", "Teilhabe"),
  note("08_SoWi/Markt.md", "SoWi", "Marktwirtschaft"),
  note("08_SoWi/Verfassung.md", "SoWi", "Verfassung"),
  note("01_Deutsch/Sprache.md", "Deutsch", "Sprachwandel"),
  note("01_Deutsch/Lyrik.md", "Deutsch", "Lyrik"),
  note("01_Deutsch/Drama.md", "Deutsch", "Drama"),
  note("01_Deutsch/Medien.md", "Deutsch", "Medien"),
];

describe("KlausurSim Vollsimulation", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("switches subject locally and exposes the German four-task selection", async () => {
    const user = userEvent.setup();
    const onSubjectChange = vi.fn();
    render(<KlausurSim notes={notes} currentFach="SoWi" onSubjectChange={onSubjectChange} />);

    expect(screen.getByText(/Selbst zusammengestellte Übungsaufgaben/)).toBeInTheDocument();
    expect(screen.getByLabelText("Fach")).toHaveValue("SoWi");
    expect(screen.getByText(/Praxismodus: 45 Minuten/)).toBeInTheDocument();
    expect(screen.getByText("00:45:00")).toBeInTheDocument();

    await user.selectOptions(screen.getByLabelText("Fach"), "Deutsch");

    expect(onSubjectChange).toHaveBeenCalledWith("Deutsch");
    expect(await screen.findByText("Deutsch · Leistungskurs")).toBeInTheDocument();
    expect(await screen.findAllByRole("radio")).toHaveLength(4);
    expect(screen.getByText(/vier Aufgaben liegen vor/i)).toBeInTheDocument();
    expect(screen.getByText(/Quelle: 01_Deutsch\//)).toBeInTheDocument();
  });

  it("synchronizes an unavailable app-level subject back to the first available pool", async () => {
    const onSubjectChange = vi.fn();
    render(<KlausurSim notes={notes} currentFach="Physik" onSubjectChange={onSubjectChange} />);

    await waitFor(() => {
      expect(onSubjectChange).toHaveBeenCalledWith("Deutsch");
    });
    expect(screen.getByLabelText("Fach")).toHaveValue("Deutsch");
  });

  it("records the selected composer topic under the same BKT topic id", async () => {
    const user = userEvent.setup();
    render(<KlausurSim notes={notes} currentFach="Deutsch" />);
    const selectedInput = screen.getByRole("radio", { checked: true });
    const selectedLabel = selectedInput.closest("label")?.textContent ?? "";
    const selectedNote = notes.find((note) => selectedLabel.includes(note.path));
    expect(selectedNote).toBeDefined();

    await user.click(screen.getByRole("button", { name: /Abgeben und lokale Indikatorauswertung/ }));
    await user.click(screen.getByRole("button", { name: "In Kompetenz-Radar eintragen" }));

    const topicId = getExamTopicId("Deutsch", selectedNote!.path);
    expect(new MasteryEngine().getTopicMastery(topicId)).not.toBeNull();
  });

  it("switches from labeled practice time to the official Deutsch LK duration", async () => {
    const user = userEvent.setup();
    render(<KlausurSim notes={notes} currentFach="Deutsch" />);

    await user.selectOptions(screen.getByLabelText("Zeitmodus"), "official");

    await waitFor(() => {
      expect(screen.getByText("05:15:00")).toBeInTheDocument();
    });
    expect(screen.getByText(/Prüfungsmodus: 5 Std. 15 Min./)).toBeInTheDocument();
  });
});
