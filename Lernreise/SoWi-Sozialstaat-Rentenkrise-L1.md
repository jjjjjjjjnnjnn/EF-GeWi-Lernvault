---
fach: SoWi
thema: "Sozialstaat und Rentenkrise"
level: 1
ziel: Klausur
xp: 100
operatoren: [darstellen, analysieren, beurteilen]
klausurrelevant: true
datum: 2026-09-26
tags: [EF, SoWi, Sozialpolitik]
version: Lesson-v3
---

# Lernreise: Sozialstaat und Rentenkrise (L1, Ziel Klausur)

> Kampagne *Virtuelle Stadt-Tycoon — Von der Apfelmarkt-Fehde zum modernen Sozialstaat*: Akt III — Gini-Waage und Steuerreform — Episode 32, Cast: Abiturcoach Dr. Miriam Scholz. Werkzeug dieser Episode: [gini-allocator].

<!-- Lesson v3 architecture: Schritte 1-8 fixed; Fehlvorstellung between Schritt 6 and 7 (parser skipped); embedded [Werkzeug: gini-allocator]; gating: check/szenario failed = Weiter greyed; XP: entdecken 5 / ausprobieren 15 / check 20 / szenario 30 -->

## Schritt 1 — entdecken: Alarm in Tycoon City: Abitur-Countdown-Panik im Pruefungssaal


> EPISODE 32｜Akt III — Gini-Waage und Steuerreform｜召集人 Abiturcoach Dr. Miriam Scholz：Abitur-Countdown-Panik im Pruefungssaal。

HOOK 市长危机（先读剧情，再进 ZIELE）：【本集战役 EP32｜Akt III — Gini-Waage und Steuerreform｜虚拟城邦 Tycoon City 告急】市长办公室深夜灯火通明，Abiturcoach Dr. Miriam Scholz 冲进来报告：Abitur-Countdown-Panik im Pruefungssaal，而明天市议会就要投票。集市在喊、长队在排、国库在抖：苹果集市价格战一路烧到租金黑市，再烧到基尼天平与劳资谈判桌，本集正是“Sozialstaat und Rentenkrise”的现实引爆点。你的身份是市长直属经济改革规划委员：把街头危机翻译成考点，用沙盘 [gini-allocator] 拿出可验证的数值方案，再交出一份 Klausur 满分答卷稳住议会。通关线索：TARGET: Justiert Steuer- und Transferregler so, dass der Gini-Indikator nach Umverteilung in den Korridor 0,28 bis 0,32 faellt, das unterste Quintil mindestens 8 Prozent des Kuchens haelt und die Armutsrisikoquote sichtbar sinkt. 上一集的结尾就是这一集的悬念——黑市账本、税改天平、劳资天平、选票天平，四座天平有一座倒了，城邦就停摆。电台正在直播，反对派等着挑错：先读 ZIELE，再啃术语，把传导机制画成你的作战地图。DE-Briefing: Episode 32 — Abiturcoach Dr. Miriam Scholz meldet Abitur-Countdown-Panik im Pruefungssaal; der Stadtrat entscheidet morgen. Rette Tycoon City mit Analyse, Sandkasten und Klausur-Antwort zum Thema Sozialstaat und Rentenkrise.

ZIELE (3 Ziele, nach 15 Minuten erreichbar):

1. Die Prinzipien des Sozialstaats (Versicherung, Versorgung, Fuersorge) darstellen.
2. Die Rentenkrise aus Demografie und Umlageverfahren analysieren.
3. Reformoptionen kriteriengeleitet beurteilen (AFB III).

VORAUSSETZUNG: Soziale Marktwirtschaft, Demografiegrundlagen und Umgang mit Operatoren.

VORGAENGER-VERWEIS: Diese Lektion setzt `Sowi-Soziale-Marktwirtschaft-L1.md` voraus und wiederholt sie nicht. Dort wurde die Ordnung aus Markt plus sozialem Ausgleich eingefuehrt. Hier folgt der enge Ausschnitt: nur Sozialstaatsprinzipien plus Rentenfinanzierung im Umlageverfahren; Arbeitsmarkt- oder Gesundheitspolitik gehoeren nicht hierher.

Klausur-Satz: `Die Rente im Umlageverfahren haengt vom Verhaeltnis von Beitragszahlern zu Rentenempfaengern ab.`

## Schritt 2 — entdecken: Werkzeugkoffer von Abiturcoach Dr. Miriam Scholz: 5 Begriffe scharf stellen

PRETRAINING (Kernbegriffe):

- Sozialstaatsprinzip: Verfassungsauftrag zum sozialen Ausgleich bei Freiheit und Eigenverantwortung.
- Umlageverfahren: Aktive finanzieren direkt die laufenden Renten; kein Kapitalstock.
- Demografischer Wandel: Alterung durch niedrige Geburtenrate und steigende Lebenserwartung.
- Generationenvertrag: Implizite Regel, dass jede Generation die vorherige finanziert.
- Nachhaltigkeitsluecke: Differenz zwischen zugesagten Leistungen und finanzierbaren Beitraegen.

Klausur-Satz: `Im Umlageverfahren uebersetzt Demografie direkt in Beitrags- oder Leistungsdruck.`

## Schritt 3 — entdecken: Uhrwerk des Marktes: Kette von Ursache zu Wirkung

ENTDECKEN (ein Konzept plus Diagramm):

Das Umlageverfahren folgt $Beitrag \times Zahler = Rente \times Empfaenger$. Schrumpft die Zahlerzahl und waechst die Empfaengerzahl, muss eine Seite weichen: hoehere Beitraege, niedrigere Renten, spaeterer Beginn oder Steuerzuschuss. Der Altenquotient (ueber 65 je 100 Erwerbsfaehige) misst den Druck. Reformen verteilen denselben Konflikt anders, loesen ihn aber nicht auf: Jede Option belastet eine andere Gruppe.

```diagram
Umlagegleichung: Beitragssatz * Zahler = Rentenniveau * Empfaenger
Druck: Zahler sinken, Empfaenger steigen -> Gleichung bricht
Stellschrauben (nur eine Richtung hilft):
[+] Beitrag erhoehen  [-] Niveau senken
[>] Eintritt spaeter  [$] Steuerzuschuss
Kriterium: Wer traegt die Last? Jung / Alt / Steuerzahler
```

Klausur-Satz: `Jede Rentenreform verschiebt dieselbe Last zwischen Beitragszahlern, Rentnern und Steuerzahlern.`

## Anekdote & Fun-Fact

**Anekdote / Fun-Fact (DE)**: Als Bismarck 1889 die Altersrente einfuehrte, lag das Eintrittsalter bei 70 Jahren und nur wenige erreichten es. Heute liegt die Lebenserwartung um Jahrzehnte hoeher — der Erfolg des Systems wurde zu seiner finanziellen Herausforderung.

**Bezug zum Konzept**: `Steigende Lebenserwartung verlaengert die Rentenphase bei gleicher Umlagelogik.`

## Schritt 4 — ausprobieren: Sandkasten-Einsatz [gini-allocator]: Rette die Stadt mit Zahlen

BEISPIEL (vollstaendige Musterloesung):

[Werkzeug: gini-allocator]

TARGET: Justiert Steuer- und Transferregler so, dass der Gini-Indikator nach Umverteilung in den Korridor 0,28 bis 0,32 faellt, das unterste Quintil mindestens 8 Prozent des Kuchens haelt und die Armutsrisikoquote sichtbar sinkt.

AUFGABE (analysieren, AFB II): Analysieren Sie, warum ein steigender Altenquotient im Umlageverfahren zu Finanzierungsproblemen fuehrt.

HILFE:
1. Schritt 1: Umlagegleichung notieren.
2. Schritt 2: Zaehler und Nenner demografisch veraendern.
3. Schritt 3: Drei Anpassungen nennen.

MUSTERLOESUNG: Im Umlageverfahren finanzieren die laufenden Beitraege die laufenden Renten. Steigt der Altenquotient, entfallen auf jeden Zahler mehr Empfaenger. Bei konstantem Beitragssatz sinkt das finanzierbare Niveau, bei konstantem Niveau muss der Satz steigen. Alternativ laesst sich die Bezugsdauer durch spaeteren Eintritt kuerzen oder die Luecke durch Steuern schliessen. Ohne Anpassung entsteht ein Defizit, weil die Gleichung $Beitrag \times Zahler = Rente \times Empfaenger$ sonst verletzt ist.

Klausur-Satz: `Der Altenquotient uebersetzt die Alterung in einen messbaren Finanzierungsdruck im Umlageverfahren.`

## Schritt 5 — ausprobieren: Duell der Wege: Weg A gegen Weg B

VERGLEICH (erst Verfahren waehlen, dann loesen):

VERGLEICH: Waehle erst das Verfahren — (i) Prinzipien-Verfahren (Versicherung, Versorgung, Fuersorge zuordnen) oder (ii) Finanzierungs-Verfahren (Umlagegleichung mit Altenquotient) — dann loesen.

AUFGABE A: Ist die Grundsicherung im Alter Versicherung oder Fuersorge? Welches Verfahren passt?

AUFGABE B: Was geschieht bei gleichbleibendem Beitrag und alternder Bevoelkerung? Welches Verfahren passt?

HILFE: A fragt nach der Saeulenlogik, also Verfahren (i). B fragt nach Geldstroemen, also Verfahren (ii).

ANTWORT: A erfordert Verfahren (i): Grundsicherung ist steuerfinanzierte Fuersorge bei Beduerftigkeit, nicht beitragsbezogene Versicherung. B erfordert Verfahren (ii): Das Niveau muss sinken oder die Luecke aus Steuern kommen, sonst ist die Gleichung verletzt.

Klausur-Satz: `Saeulenzuordnung klaert die normative Logik, Umlagegleichung klaert die finanzielle Tragfaehigkeit.`

## Schritt 6 — check: Selbsttest zu Sozialstaat und Rentenkrise

CHECK (drei Fragen mit Antworten):

FRAGE: Welche drei Saeulen traegt der Sozialstaat? | ANTWORT: Versicherung (beitragsbezogen), Versorgung (staatsbezogen) und Fuersorge (beduerftigkeitsgeprueft).
FRAGE: Wie lautet die Umlagegleichung? | ANTWORT: $Beitrag \times Zahler = Rente \times Empfaenger$.
FRAGE: Welche vier Stellschrauben schliessen die Luecke? | ANTWORT: Beitrag erhoehen, Niveau senken, Eintritt verschieben, Steuerzuschuss erhoehen.

Klausur-Satz: `Ohne eine der vier Stellschrauben bleibt die Umlagegleichung bei Alterung unerfuellt.`

## Fehlvorstellung

1. Fehlvorstellung: Die eingezahlten Beitraege wuerden individuell angespart und spaeter zurueckgezahlt.
   Korrektur-Satz: `Im Umlageverfahren finanzieren heutige Beitraege heutige Renten; es existiert kein individueller Spartopf.`

2. Fehlvorstellung: Spaeterer Rentenbeginn loese die Demografie auf.
   Korrektur-Satz: `Spaeterer Beginn entlastet die Gleichung, beseitigt aber weder Alterung noch Verteilungsfrage.`

## Schritt 7 — szenario: Klausurtransfer: Anhoerung und Parlamentsrede zu Sozialstaat und Rentenkrise

ROLLE: Du bist Sachbearbeiterin im Sozialausschuss.
SITUATION: Vorgeschlagen wird, Beitragssatz und Rentenniveau gesetzlich gleichzeitig einzufrieren. Beurteile in circa 150 Woertern mit der Umlagegleichung, warum dieser Vorschlag bei alternder Bevoelkerung scheitert, und empfehle eine tragfaehige Kombination.
RUBRIC (30 XP): Umlagegleichung korrekt (8 XP) | Demografiewirkung analysiert (10 XP) | Bewertung des Vorschlags (6 XP) | Begruendete Alternative (6 XP).

## Schritt 8 — reflexion: Takeaway & Reflexion: Was der Krisenstab lernt

TAKEAWAY:

Erst Saeule bestimmen, dann Geld Stroeme pruefen: Umlage bedeutet Demografie als Finanzierung.
Takeaway-Satz: `Der Sozialstaat verspricht Ausgleich, das Umlageverfahren verlangt dafuer eine passende Demografie.`

REFLEXION:
1. Welcher Schritt fiel schwerer — die Umlageanalyse (Schritt 4) oder die Verfahrenswahl (Schritt 5)?
2. Beim naechsten Mal schreibe ich zuerst die Gleichung hin, weil jede Reform daran scheitert oder besteht.
