import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {
  WahlsystemSim,
  calculateSainteLague,
  computeElectionResults,
  generateHemicycleSeats,
  PRESET_SCENARIOS,
} from "./WahlsystemSim";
import {
  getPedagogyComponent,
  getPedagogyComponentEntry,
  hasPedagogyComponent,
} from "./registry";

describe("WahlsystemSim (Bundestagswahl & Sitzverteilung)", () => {
  describe("Mathematische Kernfunktionen (Sainte-Laguë & Wahlrecht)", () => {
    it("berechnet Sitzverteilung exakt nach Sainte-Laguë / Schepers-Verfahren", () => {
      const parties = [
        { id: "spd", votes: 25.7 },
        { id: "cdu", votes: 24.1 },
        { id: "gruene", votes: 14.8 },
        { id: "fdp", votes: 11.5 },
        { id: "afd", votes: 10.3 },
        { id: "linke", votes: 4.9 },
      ];
      const totalSeats = 630;
      const seatMap = calculateSainteLague(parties, totalSeats);

      let allocatedSum = 0;
      for (const seats of seatMap.values()) {
        allocatedSum += seats;
      }

      expect(allocatedSum).toBe(630);
      expect(seatMap.get("spd")).toBeGreaterThan(seatMap.get("cdu") || 0);
      expect(seatMap.get("cdu")).toBeGreaterThan(seatMap.get("gruene") || 0);
      expect(seatMap.get("gruene")).toBeGreaterThan(seatMap.get("fdp") || 0);
      expect(seatMap.get("fdp")).toBeGreaterThan(seatMap.get("afd") || 0);
      expect(seatMap.get("afd")).toBeGreaterThan(seatMap.get("linke") || 0);
    });

    it("filtert Parteien an der 5%-Sperrklausel heraus", () => {
      const parties = [
        {
          id: "p1",
          nameDE: "Partei A",
          nameZH: "A党",
          kurzDE: "A",
          kurzZH: "A",
          spectrumOrder: 1,
          zweitstimmenPercent: 55.0,
          direktmandate: 150,
          colorInk: "#111",
          patternId: "p1",
        },
        {
          id: "p2",
          nameDE: "Partei B",
          nameZH: "B党",
          kurzDE: "B",
          kurzZH: "B",
          spectrumOrder: 2,
          zweitstimmenPercent: 4.2, // Unter 5%, 0 Direktmandate
          direktmandate: 0,
          colorInk: "#222",
          patternId: "p2",
        },
      ];

      const res = computeElectionResults(parties, "reform2023", true, true);
      const allocB = res.allocations.find((a) => a.partyId === "p2");
      expect(allocB?.eligible).toBe(false);
      expect(allocB?.totalSeats).toBe(0);
      expect(res.wastedVotesPercent).toBe(4.2);
    });

    it("lässt Partei unter 5% über die Grundmandatsklausel (≥3 Direktmandate) einziehen", () => {
      const parties = [
        {
          id: "p1",
          nameDE: "Partei A",
          nameZH: "A党",
          kurzDE: "A",
          kurzZH: "A",
          spectrumOrder: 1,
          zweitstimmenPercent: 95.1,
          direktmandate: 290,
          colorInk: "#111",
          patternId: "p1",
        },
        {
          id: "p2",
          nameDE: "Linke Partei",
          nameZH: "左翼小党",
          kurzDE: "LINKE",
          kurzZH: "左",
          spectrumOrder: 2,
          zweitstimmenPercent: 4.9, // < 5%, aber 3 Direktmandate!
          direktmandate: 3,
          colorInk: "#222",
          patternId: "p2",
        },
      ];

      // Mit Grundmandatsklausel
      const resWith = computeElectionResults(parties, "reform2023", true, true);
      const allocWith = resWith.allocations.find((a) => a.partyId === "p2");
      expect(allocWith?.eligible).toBe(true);
      expect(allocWith?.totalSeats).toBeGreaterThan(0);

      // Ohne Grundmandatsklausel
      const resWithout = computeElectionResults(parties, "reform2023", true, false);
      const allocWithout = resWithout.allocations.find((a) => a.partyId === "p2");
      expect(allocWithout?.eligible).toBe(false);
      expect(allocWithout?.totalSeats).toBe(0);
    });

    it("vergleicht Altes System (Überhang & Ausgleich) mit Neuem System (Zweitstimmendeckung & Fix 630)", () => {
      const scenario2021 = PRESET_SCENARIOS[0];

      // Altes System: Aufblähung
      const oldRes = computeElectionResults(scenario2021.parties, "altesSystem", true, true);
      expect(oldRes.totalBundestagSeats).toBeGreaterThan(598);
      expect(oldRes.inflationSeats).toBeGreaterThan(0);
      expect(oldRes.totalUncoveredWahlkreise).toBe(0);

      // Neues System: Strikt 630 Sitze
      const newRes = computeElectionResults(scenario2021.parties, "reform2023", true, true);
      expect(newRes.totalBundestagSeats).toBe(630);
      expect(newRes.inflationSeats).toBe(0);
      expect(newRes.chancellorMajorityNeeded).toBe(316); // floor(630/2)+1
    });

    it("erzeugt korrekt geordnete Plenarsaal-Sitzkoordinaten", () => {
      const scenario2021 = PRESET_SCENARIOS[0];
      const res = computeElectionResults(scenario2021.parties, "reform2023", true, true);
      const seats = generateHemicycleSeats(res.allocations, scenario2021.parties, 630);

      expect(seats.length).toBe(630);
      // Erste Sitze links (höherer Winkel)
      expect(seats[0].angleDeg).toBeGreaterThanOrEqual(seats[seats.length - 1].angleDeg);
    });
  });

  describe("Pedagogy Registry Integration", () => {
    it("löst 'wahlsystem-sim' und Aliase über registry.ts auf", () => {
      expect(hasPedagogyComponent("wahlsystem-sim")).toBe(true);
      expect(hasPedagogyComponent("WahlsystemSim")).toBe(true);
      expect(hasPedagogyComponent("wahlsystem")).toBe(true);
      expect(hasPedagogyComponent("bundestagswahl")).toBe(true);
      expect(hasPedagogyComponent("sitzverteilung")).toBe(true);

      const entry = getPedagogyComponentEntry("wahlsystem-sim");
      expect(entry).toBeDefined();
      expect(entry?.fach).toBe("SoWi");

      const comp = getPedagogyComponent("bundestagswahl");
      expect(comp).toBe(WahlsystemSim);
    });
  });

  describe("UI-Rendering & Interaktionen", () => {
    it("rendert WahlsystemSim auf Deutsch ohne Fehler", () => {
      render(<WahlsystemSim lang="de" />);

      expect(
        screen.getByText("Bundestagswahl & Sitzverteilung (BWG-Reform Simulator)")
      ).toBeInTheDocument();
      expect(screen.getByText(/Sainte-Laguë\/Schepers-Verfahren/i)).toBeInTheDocument();
      expect(screen.getByText("Befund exportieren")).toBeInTheDocument();
      expect(screen.getByText("5%-Sperrklausel aktivieren")).toBeInTheDocument();
      expect(screen.getAllByText(/Grundmandatsklausel/i).length).toBeGreaterThanOrEqual(1);
    });

    it("rendert WahlsystemSim auf Chinesisch ohne Fehler", () => {
      render(<WahlsystemSim lang="zh" />);

      expect(
        screen.getByText("德国联邦议院选举与议席分配沙盘 (Wahlsystem-Sim)")
      ).toBeInTheDocument();
      expect(screen.getByText("导出分析简报")).toBeInTheDocument();
      expect(screen.getByText(/启用5%全国得票门槛/i)).toBeInTheDocument();
    });

    it("erlaubt das Umschalten zwischen den Wahlsystem-Regelungen", () => {
      render(<WahlsystemSim lang="de" />);

      const newSystemBtn = screen.getByText(/Reform 2023\/2024 \(Fix 630 Sitze/i);
      const oldSystemBtn = screen.getByText(/Altes System bis 2021 \(Überhang-/i);

      // Klick auf neues Wahlsystem
      fireEvent.click(newSystemBtn);
      expect(screen.getByText("GESAMTSITZE IM PARLAMENT")).toBeInTheDocument();

      // Klick zurück auf altes System
      fireEvent.click(oldSystemBtn);
      expect(screen.getByText("AUFBLÄHUNG (ÜBERHANG/AUSGLEICH)")).toBeInTheDocument();
    });

    it("wechselt Szenarien bei Klick auf die Presets", () => {
      render(<WahlsystemSim lang="de" />);

      const preset2025Btn = screen.getByText(/2025 PROGNOSE/i).closest("button");
      expect(preset2025Btn).toBeDefined();
      if (preset2025Btn) {
        fireEvent.click(preset2025Btn);
      }

      expect(
        screen.getByText("Simulation Bundestagswahl 2025 (Neues Recht: Fix 630 Sitze)")
      ).toBeInTheDocument();
    });

    it("unterstützt Koalitions-Rechner und Kanzlermehrheitsprüfung", () => {
      render(<WahlsystemSim lang="de" />);

      expect(
        screen.getByText("Regierungsbildungs-Rechner (Koalitions-Prüfung)")
      ).toBeInTheDocument();

      // Koalitions-Partner Buttons existieren
      const partnerBtns = screen.getAllByRole("button", { name: /SPD|GRÜNE|FDP|CDU/i });
      expect(partnerBtns.length).toBeGreaterThan(0);

      // Klick auf eine Partei toggelt sie in der Koalition
      fireEvent.click(partnerBtns[0]);
    });

    it("klappt AFB III Klausuranalyse ein und aus", () => {
      render(<WahlsystemSim lang="de" />);

      expect(
        screen.getByText(/Klausuranalyse: Beurteilen der BWG-Reform 2023/i)
      ).toBeInTheDocument();

      const toggleBtn = screen.getByText("[Einklappen]");
      fireEvent.click(toggleBtn);

      expect(screen.getByText("[Ausklappen]")).toBeInTheDocument();
    });

    it("triggert Export von Befunden über Callback", async () => {
      const user = userEvent.setup();
      const onExport = vi.fn();
      render(<WahlsystemSim lang="de" onExportFinding={onExport} />);

      const exportBtn = screen.getByText("Befund exportieren");
      await user.click(exportBtn);

      expect(onExport).toHaveBeenCalledTimes(1);
      expect(onExport.mock.calls[0][0]).toContain("[Wahlrechts-Analyse:");
    });
  });
});
