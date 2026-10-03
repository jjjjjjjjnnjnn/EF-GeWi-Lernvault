---
fach: SoWi
thema: "Wertpapierdepot und Orderarten"
level: 1
ziel: Klausur
xp: 100
operatoren: [darstellen, analysieren, beurteilen]
klausurrelevant: true
datum: 2026-09-28
tags: [EF, SoWi, Geldanlage, Wirtschaftspolitik]
version: Lesson-v3
---

# Lernreise: Wertpapierdepot und Orderarten (L1, Ziel Klausur)

> Kampagne *Virtuelle Stadt-Tycoon — Von der Apfelmarkt-Fehde zum modernen Sozialstaat*: Akt I-II — Vermögensaufbau und Finanzmärkte — Episode 28, Cast: Vermögensberaterin Dr. Elena Weber. Werkzeug dieser Episode: [Werkzeug: orderbuch].

<!-- Lesson-v3: Schritt 1 bis 8 feste Struktur; Fehlvorstellung zwischen Schritt 6 und 7; [Werkzeug: orderbuch] interaktiv; XP: entdecken 5 / ausprobieren 15 / check 20 / szenario 30 -->

## Schritt 1 — entdecken: Alarm in Tycoon City: Die schleichende Geldentwertung

> EPISODE 28｜Akt I-II — Vermögensaufbau und Finanzmärkte｜Leitung Vermögensberaterin Dr. Elena Weber: Die schleichende Geldentwertung.

HOOK KAUFKRAFTKRISE (Ziele vorab studieren): Bürger Max erscheint mit seinem Sparbuch in der Beratung: Auf seinem Tagesgeldkonto liegen 10.000 Euro. Die Hausbank gewährt magere 0,5 % Zinsen, während die Inflationsrate bei 3,0 % verharrt. Auf dem Papier wächst das Guthaben jährlich um 50 Euro, doch im Supermarkt sinkt die reale Kaufkraft unaufhaltsam (Inflationsschere). Wie lassen sich Bankeinlagen rechtlich von Wertpapieranlagen abgrenzen? Wie schützen Orderzusätze wie Limit und Stop-Loss vor gravierenden Marktverlusten?

ZIELE (3 Kernkompetenzen für die Klausur):

1. Den Realzins anhand der Fisher-Gleichung (r ≈ i - π) berechnen und die ökonomische Wirkung der Geldillusion bei anhaltender Inflation erläutern können.
2. Den rechtlichen Unterschied zwischen Bankeinlagen (Gläubigerforderung mit gesetzlicher Einlagensicherung bis 100.000 € nach § 4 EinSiG) und Wertpapieren im Depot (Sondervermögen mit 100 % Insolvenzschutz nach § 92 KAGB) analysieren können.
3. Die Ausführungsmechanismen von Limit- und Market-Orders im Xetra-Orderbuch differenzieren und das Magische Dreieck der Vermögensanlage auf konkrete Portfoliostrategien anwenden können.

Klausur-Satz: `Ein Wertpapierdepot verwahrt Aktien als Sondervermögen nach § 92 KAGB insolvenzsicher, während der Realzins als Differenz von Nominalzins und Inflation die reale Kaufkraftentwicklung bestimmt.`

## Schritt 2 — entdecken: Werkzeugkoffer von Vermögensberaterin Dr. Elena Weber: 5 Begriffe scharf stellen

PRETRAINING (5 Fachbegriffe präzise definieren):

- **Realzins**: Die reale Kaufkraftveränderung einer Geldanlage nach Abzug der Inflationsrate (Fisher-Gleichung: r ≈ i - π). Bei 0,5 % Nominalzins und 3,0 % Inflation beträgt der Realzins -2,5 % p.a.
- **Sondervermögen (schreibe Sondervermoegen)**: Gesetzlich vom Eigenkapital der Bank getrenntes Kundenwertpapiervermögen nach § 92 KAGB. Im Insolvenzfall der Depotbank fällt es nicht in die Insolvenzmasse und bleibt zu 100 % Eigentum des Anlegers.
- **Freistellungsauftrag**: Gesetzlicher Auftrag an das Finanzinstitut nach § 20 EStG zur steuerfreien Auszahlung von Kapitalerträgen bis zur Höhe des Sparer-Pauschbetrags (1.000 € für Alleinstehende / 2.000 € für Verheiratete).
- **Orderbuch & Slippage**: Elektronisches Tableau zur Gegenüberstellung von Kauf- (Bid) und Verkaufsaufträgen (Ask) nach Preis-Zeit-Priorität. Slippage bezeichnet die unerwünschte Abweichung des Ausführungskurses bei unlimitierten Market-Orders infolge mangelnder Liquidität.
- **Magisches Dreieck**: Das ökonomische Spannungsfeld zwischen Rentabilität, Sicherheit und Liquidität, dessen Zielkonflikte eine gleichzeitige Maximierung aller drei Dimensionen ausschließen.

Klausur-Satz: `Das Sondervermögen schützt Wertpapiere vor Bankinsolvenzen, während das Magische Dreieck die unüberwindbaren Zielkonflikte zwischen Rentabilität, Sicherheit und Liquidität verdeutlicht.`

## Schritt 3 — entdecken: Uhrwerk des Finanzsystems: Trennung von Geld und Wertpapier

ENTDECKEN: Ein Bankguthaben auf dem Girokonto ist rechtlich kein Sachwert im Tresor, sondern eine schuldrechtliche Forderung (Darlehen) des Kunden an die Bank. Bei einer Bankenpleite haftet lediglich die gesetzliche Einlagensicherung bis 100.000 Euro (§ 4 EinSiG). Ein Wertpapierdepot hingegen fungiert als Verwahrstelle: Gemäß § 92 KAGB und Depotgesetz bleiben Aktien, ETFs und Anleihen stets im rechtlichen Eigentum des Anlegers. Sie werden bei einer Insolvenz vollständig ausgesondert. Zwischen beiden Bereichen besteht eine strikte Funktionstrennung über das Verrechnungskonto.

```diagram
+-----------------------------------+     +-----------------------------------+
|     GIRO- / VERRECHNUNGSKONTO     |     |         WERTPAPIERDEPOT           |
| (Buchgeld / Einlage bei der Bank) |     |  (Verwahrstelle / Treuhaender)    |
|                                   |     |                                   |
| - Gesetzl. Einlagensicherung      |     | - SONDERVERMOEGEN (§ 92 KAGB)     |
|   bis 100.000 € (§ 4 EinSiG)      |     | - 100 % Insolvenzschutz           |
| - Reale Negativzinsen bei         |     | - Aktien, Welt-ETFs, Anleihen     |
|   hoher Inflation                 |     | - Kein direkter Bargeldverkehr    |
+-----------------+-----------------+     +-----------------+-----------------+
                  |                                         ^
                  | Kaufauftrag: Barbetrag transferieren    |
                  +-----------------------------------------+
                  |                                         |
                  | Verkaufserloes / Dividenden gutschreiben|
                  <-----------------------------------------+
```

Klausur-Satz: `Wertpapiere im Depot gelten als Sondervermögen und bleiben bei einer Bankinsolvenz uneingeschränkt im Eigentum des Kunden, während Giroguthaben lediglich als Gläubigerforderung geschützt ist.`

## Schritt 4 — ausprobieren: Interaktive Praxis: Xetra-Orderbuch & Auftragsarten im Praxistest

[Werkzeug: orderbuch]

TARGET: Teste im interaktiven Xetra-Orderbuch die Ausführung von Billigst-/Bestens-Orders, Limit-Orders und Stop-Loss-Orders. Beobachte die Auswirkung des Spreads und die Gefahren von Slippage bei mangelnder Liquidität.

AUFGABE (analysieren & beurteilen, AFB II/III): Ein Privatanleger verfügt über 10.000 € Ersparnisse. Die Inflation beträgt 3,0 % p.a., der Zins auf dem Tagesgeldkonto 0,5 % p.a.
a) Berechnen Sie den realen Kaufkraftverlust nach 5 Jahren näherungsweise und erläutern Sie die Einordnung im Magischen Dreieck.
b) Beurteilen Sie den Vorschlag, das Kapital per unlimitierter Market-Order („Billigst“) vollständig in eine einzelne spekulative Aktie anzulegen.

HILFE:
1. Realzins r ≈ 0,5 % - 3,0 % = -2,5 % p.a. Nach 5 Jahren entspricht dies ca. 1.190 € realem Verlust.
2. Tagesgeld maximiert Sicherheit und Liquidität, verfehlt jedoch das Ziel der Rentabilität.
3. Einzelaktien bergen Klumpenrisiken; unlimitierte Orders führen zu Slippage.

MUSTERLÖSUNG:
a) Gemäß der Fisher-Gleichung beträgt der Realzins r ≈ i - π = 0,5 % - 3,0 % = -2,5 % p.a. Nach 5 Jahren sinkt die reale Güterkaufkraft von 10.000 € auf rund 8.810 € (Verlust von ca. 1.190 €). Im Magischen Dreieck gewährleistet Tagesgeld zwar hohe Sicherheit (§ 4 EinSiG) und tägliche Liquidität, verfehlt jedoch die Rentabilität grundlegend.
b) Der Vorschlag ist ökonomisch untragbar: Eine unlimitierte Market-Order („Billigst“) setzt das Kapital unkontrollierten Ausführungskursen aus (Slippage-Risiko). Zudem führt die Konzentration auf eine Einzelaktie zu einem massiven unsystematischen Klumpenrisiko. Geboten sind stattdessen Limit-Orders und eine breite Streuung über globale Index-ETFs (z. B. MSCI World).

Klausur-Satz: `Market-Orders bergen erhebliche Slippage-Risiken, während eine breite Diversifikation im Depot das unsystematische Einzelwertrisiko minimiert.`

## Schritt 5 — ausprobieren: Duell der Wege: Weg A gegen Weg B

VERGLEICH: Wähle erst das Verfahren — entscheide anhand der Signalwörter, ob (i) das Liquiditäts-Verfahren (kurzfristige Verfügbarkeit, kein Kursrisiko, Einlagensicherung) oder (ii) das Allokations-Verfahren (langfristiger Realwerterhalt, Kursschwankungstoleranz, Sondervermögen) greift — dann lösen.

DUELL Weg A (Tagesgeld) gegen Weg B (Welt-ETF im Depot): Weg A garantiert absolute nominale Preissicherheit und tägliche Verfügbarkeit, nimmt jedoch bei Inflation eine schleichende reale Entwertung in Kauf. Weg B investiert in Produktivkapital, erzielt langfristig positive Realrenditen und ist als Sondervermögen insolvenzfest, erfordert aber das Aushalten von Marktvolatilität.

AUFGABE A: Ein Sparer plant in 3 Monaten den Erwerb eines Pkw für 8.000 Euro. Welches Verfahren ist zu wählen?

AUFGABE B: Eine Berufsanfängerin möchte für ihre private Altersvorsorge in 35 Jahren monatlich 100 Euro anlegen. Welches Verfahren ist zu wählen?

HILFE: A benötigt unmittelbare Liquidität ohne jedes Kursrisiko → Verfahren (i). B verfügt über einen mehrdekadischen Anlagehorizont zur Überwindung der Inflation → Verfahren (ii).

ANTWORT: Für A ist Verfahren (i) (Tagesgeld) zwingend: Bei 3 Monaten Fristigkeit dürfen keine Marktschwankungen riskiert werden; der kurzfristige Kaufkraftverlust ist gering. Für B ist Verfahren (ii) (Wertpapierdepot mit breit gestreutem ETF) unverzichtbar: Über 35 Jahre zerstört die Inflation reine Geldguthaben; kurzfristige Kurseinbrüche glätten sich historisch verlässlich aus, während der Zinseszinseffekt voll greift.

Klausur-Satz: `Kurzfristige Mittel erfordern Liquidität und Sicherheit auf Tagesgeldkonten, während langfristige Sparziele über diversifizierte Depots realisiert werden müssen.`

## Schritt 6 — check: Selbsttest zu Wertpapierdepot und Orderarten

CHECK (3 Verständnisfragen zur Wissensfestigung):

- FRAGE: Warum sind ETF-Anteile im Depot im Falle einer Bankinsolvenz geschützt? | ANTWORT: Weil sie gemäß § 92 KAGB als Sondervermögen gelten, nicht in die Insolvenzmasse fallen und vollständig im Kundeneigentum verbleiben.
- FRAGE: Welches Ausführungsrisiko entsteht bei einer unlimitierten Verkaufsorder („Bestens“)? | ANTWORT: In illiquiden Marktphasen droht Slippage, sodass der Auftrag zu unerwartet niedrigen Kursen ausgeführt wird.
- FRAGE: Welche drei Zielpole bilden das Magische Dreieck der Vermögensanlage? | ANTWORT: Rentabilität (Ertrag), Sicherheit (Kapitalerhalt) und Liquidität (Verfügbarkeit).

Klausur-Satz: `Das Sondervermögen schützt Wertpapiere gesetzlich vor Gläubigerzugriffen bei Bankenpleiten.`

## Fehlvorstellung

1. Fehlvorstellung: „Einlagensicherung und Sondervermögen bedeuten denselben Schutz.“
   Korrektur: Die Einlagensicherung deckt Bankforderungen bis maximal 100.000 Euro pro Kunde ab. Sondervermögen im Wertpapierdepot bleibt dagegen unbegrenzt und in voller Höhe Eigentum des Anlegers.
   Korrektur-Satz: `Einlagensicherung schützt Bankguthaben bis 100.000 Euro, während Wertpapiere als Sondervermögen in unbegrenzter Höhe insolvenzfest im Eigentum des Kunden bleiben.`

2. Fehlvorstellung: „Eine Stop-Loss-Order garantiert den Verkauf exakt zum festgelegten Stop-Preis.“
   Korrektur: Das Erreichen des Stop-Kurses aktiviert lediglich eine unlimitierte Bestens-Order. Bei Kurslücken (Gap-Down) erfolgt der Verkauf oft deutlich unter der Stop-Marke.
   Korrektur-Satz: `Eine Stop-Loss-Order wird nach Unterschreiten der Schwelle zur unlimitierten Market-Order und garantiert daher keine Ausführung zum exakten Stop-Kurs.`

## Schritt 7 — szenario: Klausurtransfer: Verbraucherschutz und Anlagestrategie

ROLLE: Du bist Referent für Finanzbildung bei der Verbraucherzentrale NRW.
SITUATION: Ein Berufseinsteiger hat 15.000 Euro geerbt. Seine Hausbank rät, den Betrag komplett auf dem Girokonto zu belassen. Ein Social-Media-Finanzberater empfiehlt dagegen, die Summe per Market-Order vollständig in eine Trend-Einzelaktie zu investieren. Verfasse eine gutachterliche Stellungnahme (ca. 150 Wörter), die die Risiken beider Extrempositionen analysiert und eine kriteriengeleitete Empfehlung auf Basis des Magischen Dreiecks formuliert.
RUBRIC (30 XP): Realzinsanalyse des Girokontos (5 XP) | Differenzierung Einlagensicherung vs. Sondervermögen nach § 92 KAGB (10 XP) | Kritik der unlimitierten Einzelaktien-Spekulation (Slippage, Klumpenrisiko) (5 XP) | Ausgewogene Portfoliostruktur (Notgroschen + breit gestreuter Welt-ETF) im Magischen Dreieck (10 XP).

Klausur-Satz: `Eine rationale Anlagestrategie teilt Vermögen in liquide Sicherheitsbausteine (Tagesgeld) und diversifizierte Sondervermögen (Welt-ETFs) auf, um das Magische Dreieck auszubalancieren.`

## Schritt 8 — reflexion: Takeaway & Reflexion: Was der Krisenstab lernt

TAKEAWAY: Bankeinlagen sind Gläubigerforderungen und erleiden bei Inflation verlässliche Realverluste. Das Wertpapierdepot schützt Produktivkapital als insolvenzfestes Sondervermögen (§ 92 KAGB). Eine rationale Vermögensbildung trennt kurzfristige Liquidität (Tagesgeld mit Einlagensicherung) von langfristigem Vermögensaufbau über breit diversifizierte Welt-ETFs. Im Börsenhandel schützen Limit-Orders vor unkontrollierter Slippage.

Takeaway-Satz: `Ein Wertpapierdepot schützt Produktivkapital als Sondervermögen vor Bankenpleiten und ermöglicht durch weltweite ETF-Diversifikation die Überwindung der Realzinsfalle.`

REFLEXION:
1. Welche Erkenntnis war zentral — die rechtliche Sonderstellung des Sondervermögens oder die Slippage-Gefahr bei Market-Orders?
2. Für zukünftige Klausuren wende ich stets die Fisher-Gleichung an und prüfe Orders auf das Vorhandensein von Preislimits.

Klausur-Satz: `Produktivkapital im Depot schützt als Sondervermögen vor Inflation und Bankenrisiken, wenn es über das Magische Dreieck rational diversifiziert wird.`
