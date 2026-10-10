---
fach: Mathe
thema: "Ganzrationale Funktionen im Sachkontext"
level: 1
ziel: Klausur
xp: 100
operatoren: [berechnen, eroertern]
klausurrelevant: true
datum: 2026-09-26
tags: [EF, Mathe, Analysis]
version: Enterprise-v5
---

# Lernreise: Ganzrationale Funktionen im Sachkontext (L1, Ziel Klausur)

<!-- Campaign: Optimierung | Episode 11/33 | Krise: U-Bahn-Takt 197 Sekunden statt 180 | Zielgroessen: G(x) mit Break-even und Gewinnmaximum, Menge x in Stück | Tool: box-optimizer -->

## Schritt 1 — entdecken: Steilste Rampe der Welt
ZIELE (drei messbare Ziele dieser Lektion):

1. Du kannst $E(x) = 12x$, $K(x) = 0{,}5x^3 - 6x^2 + 26x + 8$ und $G(x) = E(x) - K(x) = -0{,}5x^3 + 6x^2 - 14x - 8$ auf $D = [0, 12]$ mit $x$ in ME und Werten in GE aufstellen.
2. Du kannst Break-even als $G(x) = 0$ zu $x = 4$ und $x \approx 8{,}49$, Maximalgewinn als Hochpunkt bei $x \approx 6{,}58$ mit $G \approx 17{,}24$ GE und staerksten Anstieg als Wendepunkt bei $x = 4$ bestimmen.
3. Du kannst die Gewinnzone $4$ bis $8{,}49$ ME eroertern und jeden Wert mit $D$, ME und GE im Antwortsatz deuten ([AFB II/III]).

###

### Hook / Phaenomen

Hook / Phaenomen: Die Kosten steigen kurvig, der Preis bleibt linear: Irgendwo dazwischen liegt die Gewinnzone. Die **Gewinnfunktion** zieht Kosten von Erloes ab, der **Break-even-Punkt** markiert die schwarze Null. Erst das **Gewinnmaximum** sagt, welche Menge wirklich optimal ist.

预测 [Option A]：Der grobe Sachkontextwert aus wenigen Teilwerten genuegt bereits, weitere Verfeinerung aendert nichts。若选A，你在Step 2用工具检验该方向的变化。

预测 [Option B]：Erst fortgesetzte Verfeinerung laesst den Sachkontextwert gegen den exakten Wert laufen。若选B，你在Step 2用工具检验该方向的变化。

AUFLÖSUNG (nach der Wahl lesen)

以下解析在选择后阅读，含原两项机制分析全文：
- Mechanismus A：Hook / Phaenomen: Die Kosten steigen kurvig, der Preis bleibt linear: Irgendwo dazwischen liegt die Gewinnzone.
- Mechanismus B：Die **Gewinnfunktion** zieht Kosten von Erloes ab, der **Break-even-Punkt** markiert die schwarze Null.

本质一句话：Im Sachkontext wird jede Nullstelle oekonomisch gelesen: Break-even ist Kostendeckung, Maximum ist optimale Menge.

`Klausur-Satz: Im Sachkontext wird jede Nullstelle oekonomisch gelesen: Break-even ist Kostendeckung, Maximum ist optimale Menge.`

## Schritt 2 — entdecken: Ausruestungskiste der Algorithmus-Unit
PRETRAINING-Box (fuenf Kernbegriffe mit Definitionen):

### Hook / Phaenomen

Fuenf Begriffe trennen in dieser Lektion Alltagssprache von Klausursprache. Wer sie aktiv wiedergeben kann, liest jede Aufgabe schneller und waehlt sofort das richtige Verfahren.

### Fachbegriffe & Definitionen

- **Gewinnfunktion:** Die Differenz $G(x)=E(x)-K(x)$ misst den Gewinn je Ausbringungsmenge. Sie entsteht als Erloes minus Kosten und traegt die Einheit Euro. Mechanismus: Erloes minus Kosten bilden und auf $D$ einschraenken. Klausur-Tipp: Ansatz nennen, $D$ angeben und Einheiten ME und GE führen.
- **Break-even-Punkt:** Die Nullstellen von $G(x)$ markieren die Schwelle zwischen Verlust und Gewinn. Dort deckt der Erloes exakt die Kosten, der Gewinn ist null. Mechanismus: $G(x)=0$ loesen und Werte oekonomisch deuten. Klausur-Tipp: Beide Punkte berechnen und als Gewinnschwelle benennen.
- **Gewinnmaximum:** Der Hochpunkt von $G(x)$ liefert die gewinnmaximale Menge per $G'=0$. Dort bringt eine weitere Einheit weniger Gewinn als sie kostet. Mechanismus: Ableiten, null setzen, Art per $G''$ sichern. Klausur-Tipp: Menge und maximalen Gewinn mit Einheiten angeben.
- **Definitionsmenge:** Das Intervall $D=[0,12]$ ME begrenzt alle Aussagen auf sinnvolle Mengen. Negative Stueckzahlen sind oekonomisch sinnlos und werden ausgeschlossen. Mechanismus: Aus dem Kontext sinnvolle Grenzen uebernehmen. Klausur-Tipp: $D$ bei jeder Aussage mitfuehren und ausserhalb nichts behaupten.
- **Oekonomische Deutung:** Jeder Rechenwert braucht eine Satzdeutung mit Einheit und Kontextbezug. Jede Zahl braucht Einheit und Bezug zur Sachsituation. Mechanismus: Zahl in einen Antwortsatz mit ME oder GE einbetten. Klausur-Tipp: Ohne Deutungssatz gibt es Punktabzug trotz richtiger Zahl.

### Wirkungsgefuege / Modell

Die Kette verbindet alle fuenf Begriffe zu einem Verfahren: Erkennen, Einordnen, Aufstellen, Loesen und Deuten. Jeder Begriff traegt genau einen Schritt, gemeinsam sichern sie die volle Punktzahl.

`Klausur-Satz: Die Nullstellen von G(x) = E(x) - K(x) liefern die Break-even-Punkte, der Hochpunkt liefert den maximalen Gewinn.`

## Schritt 3 — entdecken: Wirkungskette hinter Ganzrationale Funktionen im Sachkontext
EXPERIMENTELLE ERKUNDUNG (Sandbox, erst spielen, dann deuten):

### Hook & Phaenomen

Die Sandbox macht das Unsichtbare sichtbar: Stelle Groessen ein, beobachte Kurven und lies Werte ab, bevor eine einzige Formel faellt. Erst die Anschauung, dann die Deutung, erst das Spiel, dann das Gesetz.

### Spiel-Aufgabe / Challenge

Oeffne die Sandbox aus Schritt 4, variiere die zentralen Parameter in kleinen Schritten und notiere je Stufe Kurvenform und Messwert. Formuliere aus drei Stufen eine erste Vermutung ueber den Zusammenhang.

### Aha-Moment & Gesetz

Die Kausalkette laeuft von den Kurven ueber die Differenz zur Deutung: Zuerst bildet man $G(x)=E(x)-K(x)$ auf $D=[0,12]$ ME, dann loest man $G(x)=0$ fuer die Break-even-Punkte und $G'(x)=0$ fuer das Maximum, schliesslich deutet man jeden Wert oekonomisch. Zwischen den beiden Nullstellen gilt $G(x)>0$ als Gewinnzone, ausserhalb gilt $G(x)<0$ als Verlustzone. Jede Aussage ohne $D$ und ohne Einheit bleibt mathematisch richtig, aber oekonomisch wertlos.

```diagram
+------------------------------------------+
| G(x) = E(x) - K(x) auf D = [0;12] ME    |
|   | G(x) = 0  ->  Break-even-Punkte      |
|   v                                      |
| Gewinnzone: G(x) > 0 zwischen Nullstellen|
|   | G prime = 0  ->  Hochpunkt = Maximum |
|   v  Deutung je Wert mit ME und GE       |
+------------------------------------------+
```
Formelkern: $G(x)=E(x)-K(x)$

$$G(x) = -0{,}5x^3+6x^2-14x-8,\quad G'(x_B) = 0$$
`Klausur-Satz: Zwischen den beiden Break-even-Punkten gilt G(x) > 0, ausserhalb gilt G(x) < 0 auf der sachnahen Definitionsmenge.`

## Anekdote & Fun-Fact
Ein Gruender prahlte mit steigendem Umsatz, doch sein Konto blieb leer. Ein Berater zeichnete $E(x)$ und $K(x)$ in ein Bild und zeigte: Die Kurven schneiden sich zweimal, und nur dazwischen liegt die Gewinnzone. Ausserhalb frisst $K$ das $E$ auf. Seitdem plant die Firma jede Menge mit $G(x) = E(x) - K(x)$.

Bezug zum Konzept: `Erst die Differenz G(x) = E(x) - K(x) zeigt, in welchem Mengenintervall Produktion lohnt.`

## Schritt 4 — ausprobieren: Sandbox-Auftrag Steilste Rampe der Welt
Kontinuitaet: Vorher Mathe-Extremwertprobleme-Optimierung-L1.md | Nachher Mathe-Ganzrationale-Funktionen-Sachkontext-L1.md. Krise dieser Episode: U-Bahn-Takt 197 Sekunden statt 180. Zielgroessen: G(x) mit Break-even und Gewinnmaximum, Menge x in Stück

BEISPIEL (Sandbox Level mit Werkzeug):

[Werkzeug: box-optimizer]

AUFGABE (Levelziel, [AFB II]): Knacke das Gewinn-Level: Ziehe im Sandbox-Slider die Menge $x$ von $0$ bis $12$ ME und beobachte, wie $G(x)$ erst negativ startet, dann die Nullachse zweimal schneidet und dazwischen einen Hochpunkt bildet. Lies Gewinnzone und Maximum ab, berechne dann exakt Break-even-Punkte und gewinnmaximale Menge und deute jeden Wert oekonomisch mit Einheit.

HILFE：
- 从结构维度切入，先明确本步先求什么量（Zielgroesse: Antwortsatz),再选工具：用Antwortsatz判定对象归属，用Ansatz组织步骤顺序。
- 从定理维度切入，用Ansatz与Deutungssatz的适用条件选择公式：先写条件，再代入；berechnen-Aufgaben verlangen erst die Verfahrenswahl (berechnen oder Nachweis), dann die Rechnung.
- 从验证维度切入，用定义域/单调性/量级做方向对照，判断结果是否合理。不给出具体分点、函数值、和值与归属结论。

COMPLETION (Lückentext):
- 中文说明：根据MUSTERLÖSUNG补全关键数值，不回看上文。
- Ergaenze: $x = ___$ und $G(x) = ___$, und es gilt $Kontrolle = ___$.

MUSTERLOESUNG: Sandbox zeigt die Gewinnzone zwischen $x = 4$ ME und $x = 8{,}49$ ME mit Maximum bei $x = 6{,}58$ ME. Rechnung $G(x) = 0$ liefert die Break-even-Punkte $4$ ME und $8{,}49$ ME, $G'(x) = 0$ mit $G''<0$ liefert die gewinnmaximale Menge $6{,}58$ ME. Oekonomisch bedeutet dies: Erst ab $4$ ME entsteht Gewinn, maximal bei $6{,}58$ ME, danach faellt der Gewinn bis $8{,}49$ ME wieder auf null.

`Klausur-Satz: Auf D = [0; 12] ME liegt die Gewinnzone zwischen x = 4 ME und x ca. 8.49 ME, die gewinnmaximale Menge liegt bei x ca. 6.58 ME.`

## Schritt 5 — ausprobieren: Duell der Verfahren Steilste Rampe der Welt
VERGLEICH (Wahl des Verfahrens, A gegen B):

VERGLEICH: (Weg A quantitativ-rechnerisch gegen Weg B qualitativ-strukturell): Triff zuerst die Wahl des Verfahrens: (i) graphische Deutung (Schnittpunkte, Gewinnzone und Trend an den Schnittpunkten von $E$ und $K$ ablesen) oder (ii) rechnerische Bestimmung (Nullstellen, Hochpunkt und Wende von $G$ mit Ableitung berechnen) > dann loesen.

Weg A: Erst Verfahren waehlen, dann rechnen.

AUFGABE A: Skizzieren Sie $E(x) = 10x$ und $K(x) = 0{,}25x^3 - 4x^2 + 20x + 8$ auf $D = [0, 14]$ in einem Bild. Lesen Sie die Break-even-Bereiche ab und beschreiben Sie, wo sich $E$ und $K$ schneiden.
Weg B: Alternative Route mit Gegenrechnung.

AUFGABE B: Fuer $G(x) = -0{,}25x^3 + 4x^2 - 10x - 8$ auf $D = [0, 14]$ berechnen Sie exakt Break-even-Punkte, Hochpunkt und Wendepunkt und deuten Sie jede Stelle oekonomisch.

HILFE: Aufgabe A nennt $skizzieren$, $ablesen$ und $beschreiben$, daher Verfahren (i) ohne Ableitung. Aufgabe B nennt $berechnen$ plus Hochpunkt und Wendepunkt, daher Verfahren (ii) mit Ableitung und Nachweis.

ANTWORT: A erfordert Verfahren (i): $E$ als Gerade, $K$ als S-Kurve; zwei Schnittpunkte begrenzen die Gewinnzone, links von BE1 und rechts von BE2 liegt Verlustzone, weil $K$ ueber $E$ verlaeuft. B erfordert Verfahren (ii): $G(x) = 0$ liefert BE-Punkte per GTR, $G'(x) = -0{,}75x^2 + 8x - 10 = 0$ liefert Kandidaten, $G''$ entscheidet Hoch gegen Tief, $G'' = 0$ plus Vorzeichenwechsel liefert die Wende als staerksten Anstieg; jede Stelle erhaelt Einheiten ME und GE plus Satz im Kontext.

`Klausur-Satz: Die graphische Deutung liest Gewinnzonen an Schnittpunkten ab, die rechnerische Bestimmung sichert sie mit Ableitung und Einheiten.`

## Schritt 6 — check: Selbsttest zu Ganzrationale Funktionen im Sachkontext: Steilste Rampe der Welt
CHECK (drei Fragen mit Antworten):

- FRAGE: Wie haengen $E(x)$, $K(x)$ und $G(x)$ zusammen und welche Einheiten tragen sie? | ANTWORT: Es gilt $G(x) = E(x) - K(x)$, $x$ in ME, alle Funktionswerte in GE, auf sachnaher Definitionsmenge $D$.
- FRAGE: Was bedeuten Nullstelle, Hochpunkt und Wendepunkt von $G$ oekonomisch? | ANTWORT: Nullstelle ist Break-even, Hochpunkt ist Maximalgewinn, Wendepunkt ist staerkster Gewinnanstieg.
- FRAGE: Warum darf $D$ nicht ignoriert werden? | ANTWORT: Weil Kapazitaet und negative Mengen unrealistisch sind; Aussagen ausserhalb von $D$ sind oekonomisch ungueltig.

`Klausur-Satz: Jede Aussage im Sachkontext braucht Definitionsmenge D plus Einheiten ME und GE.`

## Fehlvorstellung
(Kein Schritt; wird vom Parser uebersprungen.)

1. Fehlkonzept: Steigt der Erloes $E$, so steigt automatisch auch der Gewinn; die Analyse von $E$ genuegt.
   Korrektur-Satz: `Nicht der Anstieg von E, sondern Verlauf und Extrema von G(x) = E(x) - K(x) entscheiden ueber Gewinn.`
2. Fehlkonzept: Nullstellen und Extrema ohne Einheiten und Definitionsmenge ergeben bereits die volle Punktzahl.
   Korrektur-Satz: `Ohne Definitionsmenge, Einheiten ME und GE sowie Antwortsatz gilt eine Sachkontext-Loesung als unvollstaendig.`

## Schritt 7 — szenario: Klausurtransfer: Ganzrationale Funktionen im Sachkontext: Steilste Rampe der Welt
ROLLE: Du bist Junior-Controller in einem Startup.
SITUATION: $E(x) = 15x$, $K(x) = 0{,}4x^3 - 5x^2 + 28x + 15$, $D = [0, 15]$ ME, Werte in GE. Die Chefin will wissen, ab wann sich Produktion lohnt, wo der Gewinn maximal ist und ob eine Ausweitung ueber $12$ ME hinaus sinnvoll bleibt. Schreibe eine Stellungnahme (circa 150 Woerter) mit Rechnung und oekonomischer Deutung.
AUFGABE (berechnen, [AFB III]): Berechne Eroertere auf Basis von Break-even, Hochpunkt und Grenze von $D$, welche Mengenintervalle zu empfehlen sind.

ERWARTUNGSHORIZONT
Teilleistung | Punkte | Alternativweg
Ansatz mit Antwortsatz und berechnen-Wahl (Ganzrationale Funktionen im Sachkontext) [AFB I] | 5 NP | Skizze mit beschrifteten Achsen als Alternativweg
Rechnung mit Ansatz und Bedingungspruefung [AFB II] | 5 NP | Numerische Kontrolle mit Taschenrechner als Alternativweg
Deutung mit Deutungssatz plus Einheit/Randkontrolle [AFB III] | 5 NP | Geometrische Deutung der Konvergenz als Alternativweg

RUBRIC (30 XP): $G(x)$ plus $D$ mit Einheiten korrekt (5 XP) | Break-even korrekt berechnet (10 XP) | Hochpunkt plus Wende korrekt (10 XP) | Eroerterung mit Empfehlung fuer Intervalle (5 XP).

`Klausur-Satz: Wer Gewinnfunktion aufstellt, Break-even berechnet, Maximum bestimmt und oekonomisch deutet, erhaelt die volle Punktzahl.`

> MUSTER-KLAUSURSATZ (15 NP): Jede Aussage im Sachkontext braucht Definitionsmenge D plus Einheiten ME und GE.

KERNSATZ (auswendig):
- Kernsatz: `Jede Aussage im Sachkontext braucht Definitionsmenge D plus Einheiten ME und GE.`
- Zerlegung: Subjekt | Mechanismus | Urteil
- Aufschluesselung: Subjekt = Jede Aussage im Sachkontext | Mechanismus = braucht Definitionsmenge D plus Einheiten | Urteil = ME und GE.
- Selbsttest: Jede Aussage im Sachkontext braucht ___ D plus Einheiten ME und GE.
## Schritt 8 — reflexion: Takeaway & Reflexion: Steilste Rampe der Welt
TAKEAWAY (Kernbotschaft in einem Kasten):

Der Sachkontext folgt drei Schritten: Modellieren von $G = E - K$ mit $D$ in ME und GE, Berechnen von Nullstellen, Extrema und Wende, Deuten jedes Ergebnisses im Intervall. Die Nullstelle steuert Break-even, der Hochpunkt den Maximalgewinn, die Wende den staerksten Anstieg. Die Graphik zeigt die Gerade $E$ gegen die S-Kurve $K$, die Algebra sichert jede Aussage mit Ableitung, Einheit und Antwortsatz.

Takeaway-Satz: `Modelliere G(x) = E(x) - K(x) auf D, berechne Nullstellen, Extrema und Wende und deute jedes Ergebnis mit ME und GE.`

REFLEXION (zwei Fragen):
1. Welcher Teil fiel schwerer: das Aufstellen von $G(x)$ mit Einheiten (Schritt 4) oder die Wahl zwischen Deutung und Rechnung im Vergleich (Schritt 5)?
2. Beim naechsten Mal notiere ich zuerst $D$, ME und GE und formuliere zu jedem Rechenergebnis sofort einen Antwortsatz.

`Klausur-Satz: Mathematik liefert Zahlen, der Kontext liefert Sinn: Keine Deutung ohne Einheit und Bezug.`
