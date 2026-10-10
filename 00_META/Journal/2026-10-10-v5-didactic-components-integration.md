---
thema: "V5 Didaktik-Komponenten: KernsatzCard, ErwartungshorizontDrawer und AufloesungCard integriert"
datum: 2026-10-10
status: "done"
---

# Journal: V5 Didaktik-Komponenten & App-Rendering-Optimierung

## 1. Durchgeführte Arbeiten (Was wurde gebaut?)
- **Modulare Didaktik-Komponenten (Tufte-Stil, schwarz-weiß, AAA-Kontrast)**:
  - `KernsatzCard.tsx`: Minimalistische Doppelrahmen-Karte mit Ein-Klick-Kopierfunktion in die Zwischenablage, 3-teiliger Klausur-Zerlegung (`Subjekt | Mechanismus | Urteil`) und interaktivem Selbsttest (Lückentext-Aufdeckung).
  - `ErwartungshorizontDrawer.tsx`: Einklappbare amtliche Bewertungsmatrix (15 Notenpunkte) mit interaktiven Kriterien-Checkboxes zur Selbstbewertung, Live-Punktestand-Berechnung, Alternativweg-Hinweisen und 15 NP Muster-Klausursatz mit Kopierfunktion.
  - `AufloesungCard.tsx`: Papier-subtile Kausalmechanismus-Karte für Schritt 1 nach Dilemma-/Positions-Wahl mit differenzierter Option-A- vs. Option-B-Wirkungskette, Hervorhebung der kausalen Essenz und Klausur-Punktegarant-Satz.
- **Parser & Universal-Block-Erkennung (`v5Parser.ts` & `Blocks.tsx`)**:
  - `Blocks.tsx` erkennt nun zusammenhängende `KERNSATZ`-, `AUFLÖSUNG`- und `ERWARTUNGSHORIZONT`-Abschnitte und rendert sie automatisch als reichhaltige UI-Komponenten statt als reinen Fließtext.
  - Abwärtskompatibel für bilinguale (ZH/DE) und rein deutsche (`pureGerman`) Modi.
- **Reise-Engine & Szenario-Integration (`reise.ts` & `Reise.tsx`)**:
  - `SchrittSzenario` speichert nun strukturierte Daten (`aufgabe`, `erwartungshorizontData`, `kernsatzData`, `musterKlausursatz`).
  - Schritt 5 im Reise-Modul (sowohl Einzelkarten- als auch Volltext-Dokumentenansicht) zeigt nun direkt die formulierte Klausuraufgabe (AFB III), den interaktiven Erwartungshorizont-Drawer und die Kernsatz-Karte an.
- **Tests & Qualitätssicherung**:
  - `v5Components.test.tsx` (10 Tests isoliert für Komponenten & Parser).
  - `Blocks.test.tsx` (9 Tests, inkl. Cluster-Erkennung).
  - `Reise.v5Integration.test.tsx` (3 Integrationstests für Schritt 1 & Schritt 5).
  - Volle Testabdeckung: 92 Test-Suiten, 708 Tests grün (100% PASS).
  - `tsc -b`: 0 Fehler.
  - `vault-check.py`: PASS.

## 2. Nächste Schritte (Offen / Roadmap)
- Richtung 2: Spaced Repetition (SRS) & Revisions-Planer für v5-Axiome & Kernsätze.
- Richtung 3: Didaktische Mastery-Checks & Abitur-Abschlussprüfung (C3).
