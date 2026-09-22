/**
 * Simulierter end-to-end-fluss (ohne browser-klicks, mit echten funktionen):
 * vault-parse -> chunk -> retrieve -> quiz-gen -> rubric-parse ->
 * fsrs-lernsitzung -> overview. Faellt eine schnittstelle auseinander,
 * faellt dieser test zuerst.
 */
import { describe, expect, it } from "vitest";
import { parseCsv, parseNoteFile } from "./vault/parser";
import { chunkNotes, findFallbackNote, retrieveL0, verifySupport } from "./engine/rag";
import { buildSearchIndex } from "./engine/index";
import {
  generateExtendedQuiz,
  generateQuizFromNote,
  getVergleichItems,
} from "./quizgen";
import { gradeCard, partitionQueue, prioritizeThema } from "./scheduler";
import { buildOverview } from "./engine/overview";
import { orderMixed } from "./engine/interleave";

const NOTE_MD = `---
fach: SoWi
thema: "Soziale Marktwirtschaft"
operatoren: [darstellen, vergleichen]
klausurrelevant: true
datum: 2026-09-01
tags: [EF, SoWi]
---
## Freiheit und Ausgleich
Die Soziale Marktwirtschaft verbindet Wettbewerb mit sozialem Ausgleich.
> Der Staat setzt die Rahmenordnung (Art. 20 GG).
`;

const CSV = `Deutsch;Chinesisch;Beispielsatz;Fach;Thema
Marktwirtschaft;市场经济;Der Wettbewerb regelt.;SoWi;Soziale Marktwirtschaft
Ausgleich;平衡;Sozialer Ausgleich hilft.;SoWi;Soziale Marktwirtschaft`;

describe("sim fluss: vault bis uebersicht", () => {
  it("parse -> chunk -> retrieve -> quiz -> rubric -> lernen -> overview", () => {
    // 1. vault
    const note = parseNoteFile("08_SoWi/Soziale-Marktwirtschaft.md", NOTE_MD);
    expect(note).not.toBeNull();
    const cards = parseCsv("08_SoWi/k.csv", CSV);
    expect(cards).toHaveLength(2);

    // 2. chunk + retrieve (frage des lernenden)
    const chunks = chunkNotes([note!]);
    expect(chunks.length).toBeGreaterThanOrEqual(3);
    expect(chunks[0].id).toBe("08_SoWi/Soziale-Marktwirtschaft.md#1");
    const top = retrieveL0(chunks, "Ausgleich", 8);
    expect(top.length).toBeGreaterThan(0);

    // 3. quiz-gen aus derselben notiz (AFB + zitierpflicht intakt)
    const quiz = generateQuizFromNote(note!);
    expect(quiz.tasks).toHaveLength(3);
    const ext = generateExtendedQuiz(note!, {
      discrimination: { optionA: "A", optionB: "B" },
      contrast: { loesungA: "A", loesungB: "B" },
    });
    expect(ext.tasks).toHaveLength(5);
    const vgl = getVergleichItems([note!]);
    expect(vgl).toHaveLength(1);
    expect(vgl[0].sourceRef).toMatch(/\.md#4$/);

    // 4. lernsitzung: beide karten faellig-anfang? neu -> queue; good -> weg; again -> zurueck
    let q = partitionQueue(cards).activeQueue;
    expect(q).toHaveLength(2);
    gradeCard(cards[0].id, 3); // Good -> +3 tage (zukunft)
    gradeCard(cards[1].id, 1); // Again -> morgen (zukunft)
    q = partitionQueue(cards).activeQueue;
    expect(q).toEqual([]); // beide verplant -> heute fertig
    // rueckfluss: thema zurueckholen
    const n = prioritizeThema(cards, "Soziale Marktwirtschaft");
    expect(n).toBe(2);
    expect(partitionQueue(cards).activeQueue).toHaveLength(2);

    // 5. overview spiegelt alles
    const o = buildOverview(cards, new Date("2026-09-23T12:00:00").getTime());
    expect(o.totalCards).toBe(2);
    expect(o.masteryByFach[0].fach).toBe("SoWi");
    expect(o.masteryByFach[0].reviewed).toBe(2);

    // 6. suchen + sortieren auf denselben daten
    const idx = buildSearchIndex([{ id: "n", thema: note!.thema, sub: note!.path, text: "x" }]);
    expect(idx.query("Marktwirtschaft")).toEqual(["n"]);
    expect(findFallbackNote([note!], "frage zur sowi marktwirtschaft")?.thema).toBe("Soziale Marktwirtschaft");
    expect(orderMixed(vgl, (v) => v.fach, true).map((v) => v.id)).toEqual([vgl[0].id]);

    // 7. tutor-verifier auf quiz-material (string-stufe)
    const rep = verifySupport(`Siehe [${chunks[0].id}].`, chunks);
    expect(rep.supported).toBe(true);
  });
});
