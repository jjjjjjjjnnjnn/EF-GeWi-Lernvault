---
fach: Mathe
thema: "Kosinussatz und Orthogonalitaet"
level: 1
ziel: Klausur
xp: 100
operatoren: [berechnen, begruenden, nachweisen]
klausurrelevant: true
datum: 2026-09-26
tags: [EF, Mathe, Geometrie]
version: Enterprise-v5
---

# Lernreise: Kosinussatz und Orthogonalitaet (L1, Ziel Klausur)

<!-- Campaign: Optimierung | Episode 17/33 | Krise: Flughafen-Gepaeck 480 Koffer pro Stunde | Zielgroessen: Dreieck mit a, b und Winkel gamma, Ziel Seite c | Tool: formula -->

## Schritt 1 — entdecken: Kurskorrektur
ZIELE (drei messbare Ziele dieser Lektion):

1. Du kannst mit $c^2 = a^2 + b^2 - 2ab\cos(\gamma)$ aus $a = 5$, $b = 7$, $\gamma = 60^\circ$ die Seite $c$ schrittweise zu $c \approx 6{,}24$ berechnen.
2. Du kannst den Kosinussatz als Pythagoras mit Korrektur erklaeren und $\gamma = 90^\circ$ mit $\cos(90^\circ) = 0$ einordnen.
3. Du kannst mit $\cos(\gamma) = \frac{a^2+b^2-c^2}{2ab}$ an $3$-$4$-$5$ nachweisen, dass $\gamma = 90^\circ$ vorliegt ([AFB II]).

###

### Hook / Phaenomen

Hook / Phaenomen: Kein rechter Winkel weit und breit, trotzdem soll die dritte Seite exakt bestimmbar sein. Der **Kosinussatz** repariert Pythagoras mit einem **Korrekturterm**: Je spitzer der **eingeschlossene Winkel**, desto kuerzer die Gegenseite. Umgekehrt verraet die Seitenprobe, ob **Orthogonalitaet** vorliegt.

预测 [Option A]：Der grobe Winkelwert aus wenigen Teilwerten genuegt bereits, weitere Verfeinerung aendert nichts。若选A，你在Step 2用工具检验该方向的变化。

预测 [Option B]：Erst fortgesetzte Verfeinerung laesst den Winkelwert gegen den exakten Wert laufen。若选B，你在Step 2用工具检验该方向的变化。

AUFLÖSUNG (nach der Wahl lesen)

以下解析在选择后阅读，含原两项机制分析全文：
- Mechanismus A：Hook / Phaenomen: Kein rechter Winkel weit und breit, trotzdem soll die dritte Seite exakt bestimmbar sein.
- Mechanismus B：Der **Kosinussatz** repariert Pythagoras mit einem **Korrekturterm**: Je spitzer der **eingeschlossene Winkel**, desto kuerzer die Gegenseite.

本质一句话：Ohne rechten Winkel tritt der Korrekturterm hinzu: c Quadrat folgt aus a, b und eingeschlossenem Winkel.

`Klausur-Satz: Ohne rechten Winkel tritt der Korrekturterm hinzu: c Quadrat folgt aus a, b und eingeschlossenem Winkel.`

## Schritt 2 — entdecken: Ausruestungskiste der Algorithmus-Unit
PRETRAINING-Box (fuenf Kernbegriffe mit Definitionen):

### Hook / Phaenomen

Fuenf Begriffe trennen in dieser Lektion Alltagssprache von Klausursprache. Wer sie aktiv wiedergeben kann, liest jede Aufgabe schneller und waehlt sofort das richtige Verfahren.

### Fachbegriffe & Definitionen

- **Kosinussatz:** Die Formel $c^2=a^2+b^2-2ab\cos(\gamma)$ liefert die dritte Seite aus SWS. Er gilt in jedem ebenen Dreieck und verbindet drei Seiten mit einem Winkel. Er gilt in jedem ebenen Dreieck und verbindet drei Seiten mit einem Winkel. Mechanismus: Seiten und Winkel einsetzen und Wurzel ziehen. Klausur-Tipp: Formel nennen, gegebenen Winkel als eingeschlossenen identifizieren.
- **SWS-Lage:** Zwei Seiten plus eingeschlossener Winkel suchen eindeutig die Gegenseite. Nur der Winkel zwischen den beiden gegebenen Seiten darf in die Formel. Mechanismus: Gegebene Stuecke markieren und dem Winkel die Seite zuordnen. Klausur-Tipp: Lage benennen und Kosinussatz als Verfahren waehlen.
- **SSS-Lage:** Drei bekannte Seiten suchen einen Winkel per umgestelltem Kosinussatz. SWS legt das Dreieck eindeutig fest; der Arkuskosinus berechnet daraus den Winkel. Mechanismus: Formel nach $\cos(\gamma)$ aufloesen und Arkuskosinus bilden. Klausur-Tipp: Umstellung zeigen und Winkel in Grad angeben.
- **Korrekturterm:** Der Anteil $-2ab\cos(\gamma)$ verkuerzt oder verlaengert gegenueber Pythagoras. Seiten und Winkel muessen paarweise stimmen; Pythagoras ist der Sonderfall mit gamma gleich 90 Grad ohne Korrekturterm. Mechanismus: Vorzeichen von $\cos(\gamma)$ deuten und Effekt benennen. Klausur-Tipp: Bei spitz verkuerzt, bei stumpf verlaengert als Deutung.
- **Orthogonalitaet:** Rechte Winkel folgen per Pythagoras-Probe oder Skalarprodukt null. Rechter Winkel gilt genau dann, wenn a Quadrat plus b Quadrat gleich c Quadrat ist. Mechanismus: Seiten quadrieren und Gleichheit pruefen. Klausur-Tipp: Probe anschliessen und rechten Winkel explizit bestaetigen.

### Wirkungsgefuege / Modell

Die Kette verbindet alle fuenf Begriffe zu einem Verfahren: Erkennen, Einordnen, Aufstellen, Loesen und Deuten. Jeder Begriff traegt genau einen Schritt, gemeinsam sichern sie die volle Punktzahl.

`Klausur-Satz: Ohne rechten Winkel tritt der Korrekturterm mit Kosinus hinzu.`

## Schritt 3 — entdecken: Wirkungskette hinter Kosinussatz und Orthogonalitaet
EXPERIMENTELLE ERKUNDUNG (Sandbox, erst spielen, dann deuten):

### Hook & Phaenomen

Die Sandbox macht das Unsichtbare sichtbar: Stelle Groessen ein, beobachte Kurven und lies Werte ab, bevor eine einzige Formel faellt. Erst die Anschauung, dann die Deutung, erst das Spiel, dann das Gesetz.

### Spiel-Aufgabe / Challenge

Oeffne die Sandbox aus Schritt 4, variiere die zentralen Parameter in kleinen Schritten und notiere je Stufe Kurvenform und Messwert. Formuliere aus drei Stufen eine erste Vermutung ueber den Zusammenhang.

### Aha-Moment & Gesetz

Die Kausalkette laeuft von der Lage ueber die Formel zur Probe: Zuerst identifiziert man SWS oder SSS aus den gegebenen Stuecken, dann wendet man $c^2=a^2+b^2-2ab\cos(\gamma)$ an oder stellt nach dem Winkel um, schliesslich sichert man per Pythagoras-Probe ab. Das Vorzeichen von $\cos(\gamma)$ entscheidet ueber verkuerzt bei spitzem oder verlaengert bei stumpfem Winkel. Ohne Korrekturterm rechnet man faelschlich mit rechtem Winkel und verfehlt jede nicht-rechtwinklige Loesung.

```diagram
+------------------------------------------+
| gegeben: a, b, gamma (SWS)               |
|   | c^2 = a^2+b^2-2ab cos(gamma)        |
|   v                                      |
| c = Wurzel(...)  + Pythagoras-Probe     |
| SSS: nach cos(gamma) umstellen, Winkel  |
+------------------------------------------+
```
Formelkern: $c^2=a^2+b^2-2ab\cos(\gamma)$

$$c^2 = a^2+b^2-2ab\cos(\gamma)$$
`Klausur-Satz: Das Vorzeichen von cos(gamma) entscheidet ueber verkuerzt oder verlaengert.`

## Anekdote & Fun-Fact
Der franzoesische Mathematiker Lazare Carnot bewies den Kosinussatz in moderner Form, waehrend er gleichzeitig als Kriegsminister Armeen organisierte. Seine Formel $c^2 = a^2 + b^2 - 2ab\cos(\gamma)$ verband Feldmessung und Geometrie so eng, dass Landvermesser sie bis heute im Gepaeck tragen.

Bezug zum Konzept: `Carnots Formel macht aus jeder SWS-Lage eine berechenbare Strecke.`

## Schritt 4 — ausprobieren: Sandbox-Auftrag Kurskorrektur
Kontinuitaet: Vorher Mathe-Kosinussatz-Orthogonalitaet-CN-L1.md | Nachher Mathe-Kosinussatz-Orthogonalitaet-L1.md. Krise dieser Episode: Flughafen-Gepaeck 480 Koffer pro Stunde. Zielgroessen: Dreieck mit a, b und Winkel gamma, Ziel Seite c

BEISPIEL (Sandbox Level mit Werkzeug):

[Werkzeug: formula]

AUFGABE (Levelziel, [AFB II]): Knacke das Dreiecks-Level: Ziehe im Sandbox-Slider den Winkel $\gamma$ von spitz ueber recht bis stumpf und beobachte, wie die Gegenseite $c$ kuerzer oder laenger als die Pythagoras-Hypothenuse ausfaellt. Stelle $\gamma = 60$ Grad ein, lies $c$ ab und berechne dann exakt per Kosinussatz. Schliesse die Pythagoras-Probe an und deute den Korrekturterm.

HILFE：
- 从结构维度切入，先明确本步先求什么量（Zielgroesse: Kosinussatz),再选工具：用Kosinussatz判定对象归属，用Skalarprodukt组织步骤顺序。
- 从定理维度切入，用Skalarprodukt与Kurvenform的适用条件选择公式：先写条件，再代入；berechnen-Aufgaben verlangen erst die Verfahrenswahl (berechnen oder Nachweis), dann die Rechnung.
- 从验证维度切入，用定义域/单调性/量级做方向对照，判断结果是否合理。不给出具体分点、函数值、和值与归属结论。

COMPLETION (Lückentext):
- 中文说明：根据MUSTERLÖSUNG补全关键数值，不回看上文。
- Ergaenze: $\gamma = ___$ und $c^2 = ___$, und es gilt $Kontrolle = ___$.

MUSTERLOESUNG: Sandbox bei $\gamma = 60$ Grad zeigt $c$ kuerzer als die Pythagoras-Hypothenuse. Rechnung per Einsetzen in $c^2=a^2+b^2-2ab\cos(60)$ und Wurzelziehen bestaetigt den Sandbox-Wert. Pythagoras-Probe $a^2+b^2 \ne c^2$ schliesst rechten Winkel aus, der positive Kosinus verkuerzt die Seite. Einsetzen, Wurzel ziehen und Pythagoras-Probe anschliessen sichern jede Dreiecksloesung.

`Klausur-Satz: Einsetzen, Wurzel ziehen, Pythagoras-Probe anschliessen.`

## Schritt 5 — ausprobieren: Duell der Verfahren Kurskorrektur
VERGLEICH (Wahl des Verfahrens, A gegen B):

VERGLEICH: (Weg A quantitativ-rechnerisch gegen Weg B qualitativ-strukturell): Triff zuerst die Wahl des Verfahrens: (i) Kosinussatz-Verfahren (Seite aus SWS berechnen) oder (ii) Umkehr-Verfahren (Winkel aus drei Seiten mit Kosinusformel bestimmen) > dann loesen.

Weg A: Erst Verfahren waehlen, dann rechnen.

AUFGABE A: Berechnen Sie $c$ aus $a = 4$, $b = 6$, $\gamma = 120^\circ$.
Weg B: Alternative Route mit Gegenrechnung.

AUFGABE B: Pruefen Sie, ob das Dreieck mit $a = 3$, $b = 4$, $c = 5$ rechtwinklig ist.

HILFE: Aufgabe A nennt zwei Seiten plus Winkel, daher Verfahren (i). Aufgabe B nennt drei Seiten ohne Winkel, daher Verfahren (ii).

ANTWORT: A erfordert Verfahren (i): $c^2 = 16 + 36 - 48\cos(120^\circ) = 52 + 24 = 76$, also $c = \sqrt{76} \approx 8{,}72$. B erfordert Verfahren (ii): $3^2 + 4^2 = 25 = 5^2$, also rechtwinklig mit $\gamma = 90^\circ$.

`Klausur-Satz: SWS sucht eine Seite, SSS sucht einen Winkel.`

## Schritt 6 — check: Selbsttest zu Kosinussatz und Orthogonalitaet: Kurskorrektur
CHECK (drei Fragen mit Antworten):

- FRAGE: Wie lautet der Kosinussatz fuer die Seite $c$? | ANTWORT: $c^2 = a^2 + b^2 - 2ab\cos(\gamma)$ mit Gegenwinkel $\gamma$.
- FRAGE: Was passiert bei $\gamma = 90^\circ$? | ANTWORT: $\cos(90^\circ) = 0$, also bleibt $c^2 = a^2 + b^2$.
- FRAGE: Wie weist man einen rechten Winkel aus drei Seiten nach? | ANTWORT: Mit $\cos(\gamma) = \frac{a^2 + b^2 - c^2}{2ab}$; gilt $\cos(\gamma) = 0$, so ist $\gamma = 90^\circ$.

`Klausur-Satz: Drei Seiten pruefen Pythagoras, zwei Seiten plus Winkel rufen den Kosinussatz.`

## Fehlvorstellung
(Kein Schritt; wird vom Parser uebersprungen.)

1. Fehlkonzept: Der Kosinussatz gilt nur in rechtwinkligen Dreiecken.
   Korrektur-Satz: `Der Kosinussatz verallgemeinert Pythagoras auf beliebige Winkel.`
2. Fehlkonzept: Man duerfe einen beliebigen Winkel statt des eingeschlossenen Winkels einsetzen.
   Korrektur-Satz: `Nur der eingeschlossene Winkel gehoert zur gegebenen Seitenpaarung.`

## Schritt 7 — szenario: Klausurtransfer: Kosinussatz und Orthogonalitaet: Kurskorrektur
ROLLE: Du bist Praktikant im Vermessungsbuero.
SITUATION: Ein Grundstueck bildet ein Dreieck mit $a = 40\,\mathrm{m}$, $b = 55\,\mathrm{m}$ und eingeschlossenem Winkel $\gamma = 75^\circ$. Der Eigentuemer bezweifelt die Frontlaenge $c$.
AUFGABE (berechnen, [AFB III]):  Berechnen Sie $c$ in einer zusammenhaengenden Darstellung (circa 150 Woerter), pruefen Sie Orthogonalitaet und begruenden Sie jeden Rechenschritt mit Satzbenennung.

ERWARTUNGSHORIZONT
Teilleistung | Punkte | Alternativweg
Ansatz mit Kosinussatz und berechnen-Wahl (Kosinussatz und Orthogonalitaet) [AFB I] | 5 NP | Skizze mit beschrifteten Achsen als Alternativweg
Rechnung mit Skalarprodukt und Bedingungspruefung [AFB II] | 5 NP | Numerische Kontrolle mit Taschenrechner als Alternativweg
Deutung mit Kurvenform plus Einheit/Randkontrolle [AFB III] | 5 NP | Geometrische Deutung der Konvergenz als Alternativweg

RUBRIC (30 XP): Ansatz $c^2 = a^2 + b^2 - 2ab\cos(\gamma)$ korrekt (10 XP) | Zahlwert $c \approx 60{,}9\,\mathrm{m}$ (10 XP) | Orthogonalitaetspruefung mit Pythagoras (5 XP) | Geschlossene Begruendung (5 XP).

`Klausur-Satz: Wer Kosinussatz ansetzt, Winkel zuordnet, Seite berechnet und Orthogonalitaet per Gegenprobe beurteilt, erhaelt die volle Punktzahl.`

> MUSTER-KLAUSURSATZ (15 NP): Einsetzen, Wurzel ziehen, Pythagoras-Probe anschliessen.

KERNSATZ (auswendig):
- Kernsatz: `Einsetzen, Wurzel ziehen, Pythagoras-Probe anschliessen.`
- Zerlegung: Subjekt | Mechanismus | Urteil
- Aufschluesselung: Subjekt = Einsetzen, Wurzel ziehen, Pythagoras-Probe anschliessen. | Mechanismus = Einsetzen, Wurzel ziehen, Pythagoras-Probe anschliessen. | Urteil = Einsetzen, Wurzel ziehen, Pythagoras-Probe anschliessen.
- Selbsttest: Einsetzen, Wurzel ziehen, Pythagoras-Probe ___.
## Schritt 8 — reflexion: Takeaway & Reflexion: Kurskorrektur
TAKEAWAY (Kernbotschaft in einem Kasten):

Zwei Seiten plus Winkel bedeuten Kosinussatz, drei Seiten bedeuten Winkelrueckfrage. Merke die Kette $c^2 = a^2 + b^2 - 2ab\cos(\gamma)$ bis $\cos(90^\circ) = 0$ bis $a^2 + b^2 = c^2$. Carnots Formel macht aus jeder SWS-Lage eine berechenbare Strecke und verbindet Feldmessung mit Geometrie.

Takeaway-Satz: `Zwei Seiten plus Winkel bedeuten Kosinussatz, drei Seiten bedeuten Winkelrueckfrage ueber die Kosinusformel.`

REFLEXION (zwei Fragen):
1. Welcher Schritt fiel schwerer: das Winkelrechnen mit Kosinus (Schritt 4) oder die Verfahrenswahl (Schritt 5)?
2. Beim naechsten Mal markiere ich zuerst Gegenwinkel und Gegenseite farbig, dann setze ich ein.

`Klausur-Satz: Pythagoras ist Spezialfall, nicht Normalfall: Der Kosinus entscheidet, wie stark korrigiert wird.`
