---
thema: "Entgiftung der Didaktik-Prompts, De-Boxing und 5-Schritte-Konstruktivismus mit Konzept-Puzzle & Klausurfalle"
datum: 2026-10-10
status: "done"
---

# Journal: Didaktik-Entgiftung & 5-Schritte-Konstruktivismus (Micro-Learning)

## 1. Durchgeführte Arbeiten (Was wurde gebaut?)

- **Radikale Didaktik-Entgiftung & Befreiung von KI-Phrasendrescherei**:
  - Vollständige Tilgung aller Pseudowissenschafts- und RPG-Floskeln (`虚拟城邦告急`, `航天轨道遥测告急`, `社会政治经济体系中如同联动的调节齿轮系统`) aus den Generatoren in `conceptDistiller.ts`.
  - Strikte Verankerung im Kernlehrplan (KLP) NRW Gymnasium:
    - *Modell des vollkommenen Marktes*: Konkretes Alltagsdilemma vom offenen Fischmarkt (100 Händler, atlantischer Lachs, 10 € -> 11 € Preiserhöhung -> Absatz bricht schlagartig auf null ein; Kausalkern: `Preisnehmer & Mengenanpasser`).
    - 4 Prämissen (*Homogene Güter*, *Markttransparenz*, *Keine Präferenzen*, *Reaktionsgeschwindigkeit*) systematisch realen Marktstörungen gegenübergestellt.
    - Klares Sachurteil: Der vollkommene Markt ist ein theoretisches *Referenzmodell* (heuristischer Maßstab zur Identifikation von Marktversagen), kein reales wirtschaftspolitisches Gestaltungsziel!

- **De-Boxing & Intuitions-Konflikt (Schritt 1)**:
  - Beseitigung des "Box-in-Box Syndrome" (6 verschachtelte Rahmen in `InteractiveLessonRunner.tsx` aufgelöst).
  - Umstellung auf flaches Tufte-Design: Prägnantes Alltags-Szenario (< 80 Wörter), Kernfrage, zwei taktile Direkt-Entscheidungskarten `[ A ]` vs `[ B ]`, und sofort ausgleitendes Kausalpanel mit KLP-Prüfungskern.
  - Sanftes Gating: Erst nach aktiver Entscheidung wird der Vorlesungsschritt freigeschaltet (aktive Kognition statt passives Scrollen).

- **Interaktives Konzept-Puzzle (Schritt 2)**:
  - Neue Komponente `KonzeptPuzzle.tsx` (`src/modules/teaching/components/GenericMicroWorlds/`):
    - 4-vs-4 Gegenüberstellung idealer Modellannahmen und realer Marktbrüche (z. B. Branding, Informationsasymmetrie, Stammkunden, Eintrittsbarrieren).
    - Taktile Koppelung mit Kausalfolgen-Entfaltung und abschließender KLP-Synthese.
    - Dual-Tab Umschaltung im Laborschritt (`[ 1. Preisbildung & Kurven ]` vs `[ 2. 4-Prämissen-Puzzle ]`).

- **Authentische 0-NP Klausurfalle & Muster-Korrektur (Schritt 4)**:
  - Integration von echten Schüler-Fehlerzitaten mit `0 / 15 NP` Stempel.
  - Diagnose fataler Denkfehler (z. B. Modell mit Realpolitik verwechselt) und Bereitstellung der offiziellen AFB-II Musterkorrektur.

- **15-NP Meistersatz & Klausur-Stempel (Schritt 5)**:
  - KLP-Operator-Zuordnung (z. B. `beurteilen`, AFB III), Muster-Formulierung mit Sach- und Werturteil, sowie Hervorhebung der Pflicht-Schlüsselbegriffe.

- **Desktop Split-Workbench & Akademische Fachsprache (Schritt 1 Upgrade)**:
  - Beseitigung der "Tunnel-Verengung" (`max-w-2xl` auf `max-w-7xl` bei Phase-1-Vorlesung erweitert).
  - 45% / 55% Split-Workbench Architektur:
    - Links (45%): Schlankes, lebensnahes Alltags-Dilemma ohne vorzeitige Prämissen-Spoiler (Lachsmarkt, 10 € Marktpreis, was passiert bei Erhöhung auf 11 €?) + zwei spoilerfreie Phänomen-Wahlkarten `[ A ]` (moderater Rückgang) vs. `[ B ]` (sofortiger Absturz auf 0).
    - Rechts (55%): Tufte Academic Decoded Dashboard:
      - Ruhezustand (Dormant Wireframe) vor Interaktion mit klarer Handlungsaufforderung.
      - Nach Wahl: 2-Satz-Kausaldeduktion (lebensnah verständlich: warum Alltagserwartung im Modell scheitert).
      - Dynamisches Tufte-Monochrom-SVG-Koordinatendiagramm: Horizontale Nachfragekurve bei $P^* = 10 €$ ($E = \infty$) und Absatzeinbruch auf $q = 0$ bei $P = 11 €$, streng zentriert verankert (`transformOrigin: 230px 85px`).
      - 5 konstitutive Modell-Prämissen KLP-Checkliste als Aha-Erlebnis (Homogenität, Markttransparenz, keine Präferenzen, unendliche Reaktion, atomistische Struktur).
      - Offizieller NRW Klausur-Musterbaustein (15 NP Standard mit hervorgehobenen Schlüsselbegriffen: »Da im Modell die Güter **völlig homogen** sind und **vollständige Markttransparenz** herrscht, besitzt der einzelne Anbieter keine Preissetzungsmacht und agiert als **reiner Preisnehmer (Mengenanpasser)**.«) & direkter Absprung in die Wissensnotiz.

- **2D-Marktgleichgewicht & Zero-Scroll Layout (Schritt 2 Entgiftung & Bereinigung)**:
  - Beseitigung der fatalen Disziplinen-Verwechslung: Mikroskopische Markttheorie (SoWi IF 2) wurde zuvor fälschlicherweise mit dem makroökonomischen »Magischen Viereck« (Stabilitätsgesetz 1967, EZB-Leitzins, Keynes-Formel) verknüpft.
  - Ausmerzung der Geistertexte (*Philosophie-Waage-Altlasten*): In `lessonStepFlow.ts` wurden die verbliebenen Floskeln (*"平衡砝码 / 力矩变化"*) restlos getilgt und durch präzise mikroökonomische Instruktionen ersetzt (*"拖动右侧【生产成本】滑块，观察供给曲线平移及均衡点 G* 的自发调整"*).
  - Umstellung auf **Zero-Scroll Dual-Workbench (1-Screen-Layout)**:
    - Beseitigung der redundanten Vorab-Kästen (*"实验探究任务与操作指引"*, *"实验规律备忘"*) und der verschachtelten Padding-Hierarchien; Raumgewinn > 150px Vertikaldistanz.
    - Links (38%): Schlanke, unverschachtelte Missions- & Beobachtungskarte mit integrierter dynamischer Zielkriterien-Prüfung.
    - Rechts (62%): 2D-SVG-Koordinatensystem ($460 \times 210$), direkt darunter die 3-spaltige Echtzeit-Auslese (*P*, *Q*, Preisfunktion) und unmittelbar anschließend der Produktionskosten-Schieberegler inklusive Schnellwahltasten. Auf 1080p-Displays vollständig ohne Scrollen bedienbar.
  - Behebung des **Statusmaschinen-Bugs (Fehlurteil bei 0% & vorzeitiger Spoiler)**:
    - Beseitigung der persistenten Latch-Variable `hasAchieved`. Die Zielprüfung ist nun strikt reaktiv an die Schieberegler-Position gekoppelt (`costPercent >= 48 && costPercent <= 52`).
    - Bei 0% bleibt das Labor auf `[ 待探究: 0% ]`, das Lösungs-Fazit bleibt verborgen und der Klausur-Button im Footer bleibt `disabled`.
    - Erst beim Erreichen des Zielkorridors (+50%) springt das Labor auf `[ 探究达成: 100% ]`, schaltet die Kausalanalyse frei, hebt den neuen Schnittpunkt $G^{*\prime}(14\text{ €}, 300\text{ kg})$ hervor und aktiviert den Weiter-Button.

- **Zustandsmaschinen- & Mathematik-Feinschliff (MarktgleichgewichtSim & InteractiveLessonRunner)**:
  - **Dynamische Preisfunktion**:
    - `costPercent === 0`: `Basis-Räumung (Markträumung)` / `基础出清状态 (Markträumung)`.
    - `isTargetAchieved` (48%~52%): `Signal & Rationierung (Ziel erreicht)` / `稀缺信号与需求配给 (目标靶心达成)`.
    - `costPercent > 0` (außerhalb des Zielkorridors, z. B. 100%): `Signal & Rationierung (Kostenanstieg)` / `稀缺信号与需求配给 (Signalfunktion & Rationierung)`.
    - Kein fehlerhaftes Zurückfallen auf "Basis-Zustand" bei extremen Preislagen ($P^* = 18\text{ €}, Q^* = 100\text{ kg}$).
  - **Eindeutiger Statusindikator (oben rechts)**:
    - Umstellung von missverständlichem `[ 待探究: 0% ]` auf semantisch präzises `[ 待探究: 寻找目标区间 ]` (`[ Offen: Zielbereich suchen ]`) vs. `[ 已命中: 达成目标 100% ]` (`[ Getroffen: Ziel 100% ]`).
  - **SVG-Koordinatenmathematik & dynamische Achsenprojektion**:
    - Dynamische Projektionstriche und Zahlenwerte an der P-Achse ($18.0\text{ €}$) und Q-Achse ($100\text{ kg}$), sobald sich der Gleichgewichtspunkt von den Basiswerten ($10\text{ €}, 14\text{ €}, 300, 500$) entfernt.
    - Dynamisches Repositionieren des $G^*$-Labels: Bei hohem Preisdruck ($P^* \ge 16\text{ €}$) wechselt das Label dynamisch nach rechts-unten (`y = eqSvgY + 14`), wodurch Kollisionen mit der oberen SVG-Kante und der $S'$-Kurve ausgeschlossen sind.
  - **Didaktische Serialisierung (Kill Dual Tabs)**:
    - Beseitigung der überladenen Sub-Tabs (`[ 1. 供求价格平衡实验 ]` vs `[ 2. 四大假设现实对决拼图 ]`) in Schritt 2.
    - Schritt 2 ist nun rein und ungestört der mikroökonomischen Kurvenverschiebung gewidmet.
    - Schritt 3 wird zu einem eigenständigen, vollwertigen Schritt: `Schritt 3: 4-Prämissen-Puzzle & Realitäts-Check` (`KonzeptPuzzle`), mit Gating über `onAllMatched`.
    - Die nachfolgenden Herausforderungen rücken auf Schritt 4 (KLP-Fachbegriff), Schritt 5 (Klausurfalle 0 NP) und Schritt 6 (15-NP Meistersatz).
  - **Schritt-Rücknavigation (`[ <- 上一步 ]` / `[ <- Zurück ]`)**:
    - Hinzufügen einer bedingungslosen Rückblättern-Schaltfläche im Footer für alle `currentStepIndex > 0`.
    - Absicherung gegen doppelte XP-Ausschüttung über ein Set bereits absolvierter Schrittindizes (`completedStepIndices`).

- **Schritt 3 Konzept-Puzzle Didaktik- & UX-Feinschliff**:
  - **Zweistufige zweisprachige Fachsprache auf allen Karten**:
    - Stufe 1: Prominenter deutscher Kernlehrplan-Fachbegriff (`Homogenität der Güter`, `Markttransparenz`, `Keine Präferenzen`, `Freier Marktzutritt` vs. `Produktdifferenzierung / Branding`, `Informationsasymmetrien`, `Persönliche & Räumliche Präferenzen`, `Marktzutrittsschranken`).
    - Stufe 2: Zweisprachige Subtitel-Erläuterung zur kognitiven Verankerung.
  - **Behebung des verstümmelten Satzbausteins (`-> ` Bug)**:
    - Vollständige Klausur-Kausalketten (`consequenceDE` / `consequenceZH`) in allen Datenlayern (`conceptDistiller.ts` und Fallbacks) hinterlegt, mit strikter Absicherung gegen Leerstrings (`-> Klausur-Befund:`).
  - **Zero-Scroll Defense (Kompakter Kausalketten-Spotlight)**:
    - Statt vertikaler Listenexpansion um 200px bei 4 Treffern: Einzeiliges, kartenbasiertes Spotlight des jeweils zuletzt gekoppelten Paares inklusive interaktiver Kapsel-Tabs (`[ 1 <-> B ]`, `[ 2 <-> D ]` etc.) zum gezielten Nachschlagen auf fest definierter Mindesthöhe (`min-h-[50px]`).
  - **Spürbare visuelle Verknüpfung (Active & Linking Affordances)**:
    - *Aktivierungszustand*: Tiefschwarze Invertierung (`bg-[var(--ink)] text-[var(--paper)]`), Richtungsweiser `▶` / `◀` und präzise Handlungsaufforderung (`[ 已激活 -> 请在右栏点击破绽 ]`).
    - *Gekoppelter Zustand*: Bidirektionale Indexpaarung (`[ 连通锁定 · 1 <-> B ]` links und `[ 连通锁定 · B <-> 1 ]` rechts, `●─ B` / `1 ─●`), synchrones Hover-Highlighting über beide Spalten hinweg.
  - **Schritt 2 Legenden-Bereinigung**: Redundante Koordinatentexte in `MarktgleichgewichtSim.tsx` bereinigt zu prägnantem `[ ■ 目标出清点达成 ]` / `[ ○ 动态均衡演化中 ]`.

- **Schritt 4 Didaktik-Sanierung: 0-NP Absturz-Falle & Tilgung von Strohmann-Optionen**:
  - **Restlose Tilgung des "Strohmann-Jokers"**: Die peinliche Platzhalter-Option (*"一个日常通俗的大杂烩词汇"* / *"umgangssprachlicher Sammelbegriff"*) wurde systemweit restlos gelöscht.
  - **Reine 5-Schritte-Konstruktivismus-Architektur**: Schritt 4 ist nun direkt als vollwertige **Absturz-Falle (Klausurfalle & 0-NP-Absturz-Diagnose)** etabliert (Schritt 1 Vorlesung -> Schritt 2 Markt-Labor -> Schritt 3 Konzept-Puzzle -> Schritt 4 Absturz-Falle -> Schritt 5 15-NP-Meistersatz).
  - **Authentische AFB-II Klausurdiagnose nach KLP NRW**:
    - *Aufgabenstellung*: »Erläutern Sie die Steuerungsfunktion des Preises auf dem vollkommenen Markt.«
    - *0-NP Schülerzitat*: »Der Gleichgewichtspreis sorgt dafür, dass alle Bürger mit lebensnotwendigen Gütern versorgt werden und verhindert gleichzeitig ungerechte Unternehmensgewinne durch den Staat.«
    - *Tiefgründige Prüfungsoptionen*:
      - [ A ] Verwechslung von Allokationseffizienz und Verteilungsgerechtigkeit (Richtig: Preismechanismus sichert Markträumung, keine soziale Grundversorgung).
      - [ B ] Fehlende Höchstpreisgrenzen (Distraktor 1: Verwechslung von Marktmodell und staatlichen Höchstpreisen).
      - [ C ] Unterdrückte Monopolrenten (Distraktor 2: Verwechslung von Mengenanpasser/Preisnehmer und Monopolmacht).
- **Schritt 5 Entgiftung & Zweistufige Fachsprache (15-NP Meistersatz)**:
  - **Restlose Beseitigung von Metadaten-Spoilern**: Die störenden Präfixe (`满分 15 NP 评价大题金句:`) und Vorab-Verräter in Klammern (`（失分症结：...）`) wurden aus den Optionen vollständig entfernt. Die didaktische Fehlerdiagnose erscheint nun erst post-submission in den Erläuterungen.
  - **Zweistufige zweisprachige Fachsprachen-Architektur**:
    - Stufe 1: Vollständiger deutscher Klausur-Mustersatz in Serifenschrift (`»Zwar garantiert der vollkommene Preismechanismus...«`).
    - Stufe 2: Prägnante didaktische Zusammenfassung auf Chinesisch in dezenten Klammern ohne Spoilereffekte.
  - **Authentischer Erwartungshorizont (AFB III)**: Korrekte Option verbindet Sachurteil (*Allokationseffizienz / Pareto-Optimum*) und Werturteil (*Sozialstaatsgebot nach GG Art. 20*). Distraktoren spiegeln typische Abitursfehler (einseitige Markt-Apologie bzw. planwirtschaftliches Preisdiktat).

- **VictoryRewardScreen Feinschliff & Grammatik**:
  - Korrekte Singular-/Plural-Behandlung und Lokalisierung bei der Streak-Anzeige: `1 Tag` bei `streakDays === 1`, `X Tage` bei `streakDays > 1` (Deutsch) und `X 天` (Chinesisch).

- **Codequalität, Verträge & Tests**:
  - `KonzeptPuzzle.test.tsx`, `MarktgleichgewichtSim.test.tsx`, `lessonStepFlow.test.ts` (5-Schritte-Serialisierung) & `InteractiveLessonRunner.test.tsx` (inkl. 5-Schritte-Walkthrough mit 0-NP-Diagnose und Rücknavigation).
  - `src/modules.test.tsx` UI Source Contract: 0 Emojis, 0 Tailwind-Shadows, 0 Italics, reine ASCII-Pfeile (`->`).
  - Vitest: **94 Test-Suiten, 718 Tests 100% grün**.
  - TypeScript: `cmd /c "npx tsc -b"` mit **0 Fehlern**.
  - Vault-Check: `python scripts/vault-check.py` **PASS (reisen=361, badnames=0, badglossar=0)**.

## 2. Nächste Schritte (Offen / Roadmap)
- Ausweitung der berechneten Fach-Templates (A: Markt-Intervention, B: Utilitarismus/Pflichtenethik, C: Text-Dreischritt, D: Kinematik/Differentialrechnung) auf die übrigen Standardthemen in `DOMAIN_KNOWLEDGE_ENTRIES`.
- Spaced Repetition (SRS) Integration für die neuen Meistersätze in der App.
