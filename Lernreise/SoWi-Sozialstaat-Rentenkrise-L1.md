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

HOOK 市长危机（先读剧情，再进 ZIELE）：【本集战役 EP32｜Akt III — Gini-Waage und Steuerreform｜虚拟城邦 Tycoon City 告急】市长办公室深夜灯火通明，Abiturcoach Dr. Miriam Scholz 冲进来报告：Abitur-Countdown-Panik im Pruefungssaal，而明天市议会就要投票。你的身份不变：市长直属经济改革规划委员。真实数据切入：俾斯麦1889年设70岁退休时人均寿命不到50岁——养老金本是少数人的晚年例外；今天缴费率18.6%、老人越活越长、缴费人越来越少。家族群养老接龙 tension 拉满：延迟退休、多交钱、国家多补，三旋钮拧哪个都有人疼。通关线索：TARGET: Justiert Steuer- und Transferregler so, dass der Gini-Indikator nach Umverteilung in den Korridor 0,28 bis 0,32 faellt, das unterste Quintil mindestens 8 Prozent des Kuchens haelt und die Armutsrisikoquote sichtbar sinkt. 先读 ZIELE，再啃术语，把传导机制画成你的作战地图。DE-Briefing: Episode 32 — Abiturcoach Dr. Miriam Scholz meldet Abitur-Countdown-Panik im Pruefungssaal; der Stadtrat entscheidet morgen. Rette Tycoon City mit Analyse, Sandkasten und Klausur-Antwort zum Thema Sozialstaat und Rentenkrise.

ZIELE (3 Ziele, nach 15 Minuten erreichbar):

1. Die Prinzipien des Sozialstaats (Versicherung, Versorgung, Fuersorge) darstellen.
2. Die Rentenkrise aus Demografie und Umlageverfahren analysieren.
3. Reformoptionen kriteriengeleitet beurteilen (AFB III).

VORAUSSETZUNG: Soziale Marktwirtschaft, Demografiegrundlagen und Umgang mit Operatoren.

VORGAENGER-VERWEIS: Diese Lektion setzt `Sowi-Soziale-Marktwirtschaft-L1.md` voraus und wiederholt sie nicht. Dort wurde die Ordnung aus Markt plus sozialem Ausgleich eingefuehrt. Hier folgt der enge Ausschnitt: nur Sozialstaatsprinzipien plus Rentenfinanzierung im Umlageverfahren; Arbeitsmarkt- oder Gesundheitspolitik gehoeren nicht hierher.

Klausur-Satz: `Die Rente im Umlageverfahren haengt vom Verhaeltnis von Beitragszahlern zu Rentenempfaengern ab.`

## Schritt 2 — entdecken: Werkzeugkoffer von Abiturcoach Dr. Miriam Scholz: 5 Begriffe scharf stellen

PRETRAINING (Kernbegriffe):

- **Umlageverfahren**（现收现付）：当期缴费养当期老人，不存大钱；人变了账立刻变。 Laufende Beitraege zahlen laufende Renten, fast ohne Kapitalstock. Das System lebt vom Nachwuchs und funktioniert nur bei stabiler Demografie. Schrumpft die Basis, steigt der Druck sofort. Mechanismus: Einnahmen aus Beitrag mal Zahler decken Ausgaben aus Rente mal Rentner - jede Seite schlaegt direkt durch. Klausur-Tipp: Schreibe die Bilanzgleichung als ersten Satz.
- **Generationenvertrag**（代际契约）：工作代养退休代，指望下一代养自己；不是合同是默契，信任崩了制度就晃。 Die Erwerbstaetigen finanzieren die Alten im Vertrauen auf spaetere Gegenleistung. Kein Gesetz, sondern stilles Versprechen über Generationen - ueber heisst hier across. Bricht Vertrauen, bricht Legitimation. Mechanismus: Fairness bemisst sich an Lastenteilung zwischen Zahlern, Rentnern und Steuerzahlern. Klausur-Tipp: Nutze Fairness als Massstab jeder Reform.
- **Demografischer Wandel**（人口老龄化）：少生砍缴费端、长寿加领取端还拉长领取期，三力同向挤一张账。 Weniger Geburten senken die Zahler, hoehere Lebenserwartung erhoeht Zahl und Dauer der Renten. Der Altenquotient steigt doppelt getrieben. Jeder Jahrgang zahlt laenger ein und bezieht laenger. Mechanismus: Basis schrumpft, Spitze waechst, Bezugsdauer dehnt - dreifacher Druck auf eine Gleichung. Klausur-Tipp: Nenne alle drei Effekte, sonst halbe Analyse.
- **Beitragssatz**（缴费率）：工资条里社保那刀：涨一点保养老，伤一点就业和到手钱。 Der Satz teilt den Lohn in netto und solidarisch. Aktuell 18,6 Prozent, je halb Arbeitgeber und Arbeitnehmer. Jeder Punkt mehr verteuert Arbeit und drueckt Netto. Mechanismus: Hohe Saetze sichern Niveau, gefaehrden aber Jobs und Kaufkraft. Klausur-Tipp: Benenne Verlierer je Schraube.
- **Rentenniveau**（养老金水平）：标准养老金对平均工资之比：保水平就得加钱或延退，不可能三角。 Das Niveau misst Standardrente gegen Durchschnittslohn. Es zeigt, wie viel Lebensstandard die Rente haelt. Sinkt es, droht Altersarmut trotz Lebensleistung. Mechanismus: Niveau gegen Beitrag gegen Alter - das Dreieck laesst keine kostenlose Loesung zu. Klausur-Tipp: Formuliere das Dreieck als Unmoeglichkeitssatz.









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
Kausalkette: Umlagebilanz im Heute, Geburtenknick plus Langlebigkeit, drei Schrauben plus Steuer, Verlierer je Schraube: Beitrag trifft Jobs und Junge, Niveau trifft Alte, Alter trifft Koerperarbeiter. Systemwechsel tauscht Demografierisiko gegen Marktrisiko plus Doppelbelastung.

因果链：现收现付当期平衡→少子砍基数、长寿加人数拉时长→三旋钮（缴费/水平/年龄）+税补四选→谁疼：企业与年轻人疼缴费、老人疼水平、体力劳动者疼延退。换制度（资本覆盖）只是把人口风险换成市场风险+双重负担。

Bilanzanker: $b \cdot W \cdot Z = R \cdot N$ mit $b = 18{,}6\,\%$; Altenquotient $AQ = N / Z$ steigt; fairer Mix bewegt $b$, $R$ und Alter je ein Stueck.


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

DUELL Weg A (freier Markt) gegen Weg B (Staat greift ein): Weg A setzt auf Markt und Eigenvorsorge: Kapitaldeckung, Riester und Aktienrente entkoppeln von Demografie, tragen aber Marktrisiko und Doppelbelastung. Weg B repariert die Umlage: Beitrag, Niveau und Alter werden nachjustiert plus Steuer - solidarisch, aber mit Verlierern je Schraube. Entscheide am Kriterium: Generationengerechtigkeit und Nachhaltigkeit, nicht Wunschdenken.

对决 Weg A（自由市场）vs Weg B（国家干预）：Weg A信市场自备：资本覆盖、基金养老，脱钩人口但吃市场风险+一代人双缴费。Weg B信修补现收现付：三旋钮加税补，团结但每拧都有人疼。判据：代际公平和可持续，不是许愿。

AUFGABE A: Ist die Grundsicherung im Alter Versicherung oder Fuersorge? Welches Verfahren passt?

AUFGABE B: Was geschieht bei gleichbleibendem Beitrag und alternder Bevoelkerung? Welches Verfahren passt?

HILFE: A fragt nach der Saeulenlogik, also Verfahren (i). B fragt nach Geldstroemen, also Verfahren (ii).

ANTWORT: A erfordert Verfahren (i): Grundsicherung ist steuerfinanzierte Fuersorge bei Beduerftigkeit, nicht beitragsbezogene Versicherung. B erfordert Verfahren (ii): Das Niveau muss sinken oder die Luecke aus Steuern kommen, sonst ist die Gleichung verletzt.

Klausur-Satz: `Saeulenzuordnung klaert die normative Logik, Umlagegleichung klaert die finanzielle Tragfaehigkeit.`

## Schritt 6 — check: Selbsttest zu Sozialstaat und Rentenkrise

CHECK (drei Fragen mit Antworten):

- FRAGE: Welche drei Saeulen traegt der Sozialstaat? | ANTWORT: Versicherung (beitragsbezogen), Versorgung (staatsbezogen) und Fuersorge (beduerftigkeitsgeprueft).
- FRAGE: Wie lautet die Umlagegleichung? | ANTWORT: $Beitrag \times Zahler = Rente \times Empfaenger$.
- FRAGE: Welche vier Stellschrauben schliessen die Luecke? | ANTWORT: Beitrag erhoehen, Niveau senken, Eintritt verschieben, Steuerzuschuss erhoehen.

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

Klausur-Satz: `Die Rentenstellungnahme rechnet erst die Umlagebilanz mit Demografiedruck und verteilt dann die Last begruendet auf Zahler, Rentner und Steuer.`
## Schritt 8 — reflexion: Takeaway & Reflexion: Was der Krisenstab lernt

TAKEAWAY:

Erst Saeule bestimmen, dann Geld Stroeme pruefen: Umlage bedeutet Demografie als Finanzierung.
Takeaway-Satz: `Der Sozialstaat verspricht Ausgleich, das Umlageverfahren verlangt dafuer eine passende Demografie.`

REFLEXION:
1. Welcher Schritt fiel schwerer — die Umlageanalyse (Schritt 4) oder die Verfahrenswahl (Schritt 5)?
2. Beim naechsten Mal schreibe ich zuerst die Gleichung hin, weil jede Reform daran scheitert oder besteht.

Klausur-Satz: `Der Wandel veraendert die Koepfe, jede Reform verteilt die Bilanz neu: Wer das Dreieck versteht, verteilt ehrlich statt zu versprechen.`
