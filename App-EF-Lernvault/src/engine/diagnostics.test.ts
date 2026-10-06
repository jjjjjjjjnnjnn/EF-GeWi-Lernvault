import { describe, expect, it } from "vitest";
import {
  DIAGNOSTIC_CODES,
  buildDiagnosticFehlerlogRows,
  detectDiagnosticIssues,
  type DiagnosticEvaluation,
} from "./diagnostics";

describe("diagnostics engine", () => {
  it("erkennt Defizite bei D1–D5 unterhalb der Zielschwellen", () => {
    const evalData: DiagnosticEvaluation = {
      fach: "Deutsch",
      dScores: {
        d1: 3, // < 4 -> Defizit D1
        d2: 4, // ok
        d3: 1, // < 2 -> Defizit D3
        d4: 4, // ok
        d5: 2, // < 3 -> Defizit D5
      },
    };

    const issues = detectDiagnosticIssues(evalData);
    expect(issues.map((i) => i.code)).toEqual(["D1", "D3", "D5"]);
    expect(issues[0]?.definition.nameDE).toBe(DIAGNOSTIC_CODES.D1.nameDE);
  });

  it("erkennt MINT BE Checklisten-Ausfaelle", () => {
    const evalData: DiagnosticEvaluation = {
      fach: "Mathe",
      mintChecks: {
        formelansatz: false, // Defizit
        einheiten: true,
        genauigkeit: false, // Defizit
        antwortsatz: true,
      },
    };

    const issues = detectDiagnosticIssues(evalData);
    expect(issues.map((i) => i.code)).toEqual(["BE-Ansatz", "BE-Genauigkeit"]);
    expect(issues[0]?.definition.category).toBe("MINT_BE");
  });

  it("erzeugt korrekte formatierte Tabellenzeilen fuer das Fehlerlog", () => {
    const evalData: DiagnosticEvaluation = {
      fach: "Mathe",
      mintChecks: {
        formelansatz: false,
        einheiten: true,
        genauigkeit: true,
        antwortsatz: true,
      },
    };

    const issues = detectDiagnosticIssues(evalData);
    const rows = buildDiagnosticFehlerlogRows("Mathe", "Kurvendiskussion", issues, "2026-10-06");

    expect(rows).toHaveLength(1);
    expect(rows[0]).toContain("| 2026-10-06 | Kurvendiskussion | Logik/Begründung | [BE-Ansatz]");
    expect(rows[0]).toContain(DIAGNOSTIC_CODES.BE_ANSATZ.remedyZH);
  });
});
