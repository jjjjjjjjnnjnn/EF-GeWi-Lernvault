---
fach: Mathe
thema: "CN-Tricks: sechs Schnellverfahren"
level: 1
ziel: Klausur
xp: 100
operatoren: [anwenden, begruenden, beurteilen]
klausurrelevant: true
datum: 2026-09-26
tags: [EF, Mathe, CN]
version: Lesson-v3
---

# Lernreise: CN-Tricks: sechs Schnellverfahren (L1, Ziel Klausur)

<!-- Lesson v3: 8 Schritte plus Anekdote und Fehlvorstellung; Fehlvorstellung zwischen Schritt 6 und 7 (Parser-Skip); interaktives [Werkzeug: <id>]; Gating: check/szenario nicht bestanden = Weiter gesperrt; XP: entdecken 5 / ausprobieren 15 / check 20 / szenario 30 -->

## Schritt 1 — entdecken: Ziele & Phänomen-Einstieg

ZIELE (drei messbare Ziele dieser Lektion):

1. Du kannst sechs Heuristiken nennen: Spezialwert, Ausschluss, Skizze, Vieta, AM-GM und Parametertrennung je mit Bedingung.
2. Du kannst $2^{30}$ gegen $3^{20}$ per $8^{10}$ gegen $9^{10}$ zu $a < b$ entscheiden und per Potenzgesetzen belegen.
3. Du kannst jede Vermutung per Standardweg sichern und bei verletzter Bedingung sofort wechseln, denn Reinschrift verlangt Beweis (AFB II/III).

### Hook / Phaenomen

没有计算器怎么比较二的三十次方和三的二十次方的大小：直接乘开算到手酸，换个角度几秒钟就出答案。把二的三十次方看成八的十次方、三的二十次方看成九的十次方，指数拉平之后大小一目了然。中国学生喜欢这种快速做法，德国卷面却要求草稿纸猜测加正稿证明。本节把六种捷径全部贴上条件标签，让快方法只帮忙找方向而不取代证明。

Im Jahr 1990 knobelte ein Ingenieur an 2 hoch 30 gegen 3 hoch 20 — kein Taschenrechner zur Hand, nur Potenzgesetze; wer 8 hoch 10 gegen 9 hoch 10 sieht, entscheidet in Sekunden.

机制铺垫双语：机制是草稿纸用启发式猜测、正稿用标准路径证明，条件一破立即切换。Der Mechanismus trennt Suche und Beweis: Schmierpapier zur Vermutung, Reinschrift mit Potenzgesetzen und Monotonie zur Sicherung.
### Fachbegriff & Definition

Fuer Heuristiken gilt: **Schnellverfahren dienen als Orientierung auf dem Schmierpapier, waehrend die Reinschrift den vollstaendigen Standardweg verlangt**. Jede **Heuristik besitzt eine Bedingung; bei verletzter Bedingung wird sofort zum Standardweg gewechselt**. Der **Vergleich $2^{30} = 8^{10}$ gegen $3^{20} = 9^{10}$ mit $8 < 9$ liefert $a < b$** nur als belegte Kette, nicht als Behauptung.

### Wirkungsgefuege / Modell

Der Mechanismus trennt Suche und Beweis: Schmierpapier $2^{30} = (2^3)^{10} = 8^{10}$ und $3^{20} = (3^2)^{10} = 9^{10}$ zu Vermutung $a < b$ wegen $8 < 9$. Reinschrift mit Potenzgesetzen $(a^m)^n = a^{mn}$ und Monotonie $8^{10} < 9^{10}$ sichert Punkte. Ebenso Vieta nur bei $ax^2+bx+c = 0$ und AM-GM nur bei $a,b > 0$ — ausserhalb wird gewechselt statt geraten.

Schritt A: Heuristik auf Schmierpapier zur Vermutung nutzen.
Schritt B: Bedingung explizit pruefen und notieren.
Schritt C: Standardweg in Reinschrift mit Satz sichern.

Klausur-Satz: `Heuristische Schnellverfahren dienen als Orientierung auf dem Schmierpapier, waehrend die Reinschrift den vollstaendigen Standardweg verlangt.`

## Schritt 2 — entdecken: Fachbegriffe & Pre-Training

PRETRAINING-Box (fuenf Kernbegriffe mit Definitionen):

### Hook / Phaenomen

Ein Schueler setzt $x = 0$ ein und raet die Loesung — Treffer. Beim naechsten Problem versagt derselbe Griff, weil die Aussage nicht allgemein gilt. Heuristik ohne Bedingung ist Gluecksspiel. Welche fuenf Paare aus Trick und Bedingung verwandeln Raten in Suchen?

### Fachbegriffe & Definitionen

- **Spezialwert-Methode: (特殊值法)** $0$, $1$ oder $-1$ einsetzen zur Vermutung mit anschliessendem Beweis.
- **Ausschlussverfahren: (排除法)** Faelle ueber Definitionsbereich, Vorzeichen und Grenzverhalten streichen.
- **Skizze und Veranschaulichung: (草图法)** Graph zeichnen und Problem in Schnittpunkte plus Monotonie uebersetzen.
- **Parametertrennung: (参数分离)** Parameter isolieren und Extremwert der Gegenseite bestimmen.
- **Pruefsatz: (检验句)** Deutscher Schlusssatz mit Ergebnis plus Gueltigkeitsbereich.

### Wirkungsgefuege / Modell

Die Kette lautet: Trick waehlen, Bedingung pruefen, Vermutung per Standard sichern. Skizze an $f(x) = x^3-3x$ zaehlt Nullstellen als Schnittpunkte; Vieta an $x^2-5x+6$ prueft $2$ und $3$ per Summe $5$ und Produkt $6$; AM-GM an $x+\frac{4}{x}$ mit $x > 0$ schaetzt Minimum $4$. Fehlt die Bedingung — etwa $x < 0$ bei AM-GM — so wird abgebrochen und klassisch mit $f' = 0$ gerechnet.

Klausur-Satz: `Jedes Schnellverfahren ist nur eine Abkuerzung; ohne Bedingungspruefung gibt es in der Klausur keine Punkte.`

## Schritt 3 — entdecken: Kernkonzept & Wirkungsmodell

EXPERIMENTELLE ERKUNDUNG (PhET Sandbox, erst spielen, dann deuten):

### Hook & Phaenomen

Welche Zahl ist groesser, $2^{30}$ oder $3^{20}$, ganz ohne Rechner. Intuitiv wirkt die groessere Basis $3$ staerker, doch der groessere Exponent $30$ zieht dagegen. Warum entscheidet die gemeinsame Potenz $10$ sofort ueber $a < b$?

### Spiel-Aufgabe / Challenge

Oeffne die Sandbox und ziehe den Slider Exponent von $1$ bis $10$ fuer die Basen $8$ und $9$. Beobachte die Kurven $8^n$ und $9^n$ sowie die Anzeige $2^{30} = 8^{10}$ und $3^{20} = 9^{10}$. Lies das Wachstum ab und erkenne, ab wann $9^n$ dauerhaft vorne liegt.

### Aha-Moment & Gesetz

Die Kette lautet Potenzgesetz gegen Vergleich: $(a^m)^n = a^{mn}$ plus Monotonie. Handschriftlich gilt $2^{30} = (2^3)^{10} = 8^{10}$ und $3^{20} = (3^2)^{10} = 9^{10}$. Mit $8 < 9$ folgt $8^{10} < 9^{10}$, also $a < b$. Der Trick hebt beide Zahlen auf denselben Exponenten $10$ und macht den Vergleich trivial. Danach sichert der Standardweg mit Logarithmus das Ergebnis.

```diagram
  8n gegen 9n > n=1 bis 10
  +--------------------------> n
  230=810 | 320=910
  8<9 > 810<910 > a<b
  gleicher Exponent > direkter Vergleich
```

Klausur-Satz: `Ich wende ein heuristisches Verfahren zur Orientierung an und belege das Ergebnis anschliessend mit dem Standardweg.`

## Anekdote & Fun-Fact

Das Wort Heuristik stammt vom griechischen $heuriskein$, finden oder entdecken. Denselben Wortstamm hoert man im beruehmten Heureka des Archimedes. Eine Heuristik hilft, eine Loesung zu finden, sie beweist sie aber nicht. Genau das ist die Rolle heuristischer Schnellverfahren: Sie sind Suchhilfen, kein Beweis.

Bezug zum Konzept: `Schnellverfahren sind Heuristiken: Sie finden eine Vermutung, den Beweis liefert der Standardweg.`

## Schritt 4 — ausprobieren: Interaktive Praxis & Labor

BEISPIEL (Sandbox Level mit Werkzeug):

[Werkzeug: tangent-slider]

AUFGABE (Levelziel, AFB II): Knacke den Vergleich: Stelle in der Sandbox (tangent-slider) die Basen 8 und 9 ein, ziehe den Slider Exponent von 1 bis 10 und bestaetige $8^{10}$ gegen $9^{10}$, und beweise dann ohne Rechner, dass $2^{30} < 3^{20}$ gilt. Ergaenze die Probe mit Logarithmus.

HILFE:
1. Forme mit $(a^m)^n = a^{mn}$ um zu $2^{30} = 8^{10}$ und $3^{20} = 9^{10}$.
2. Vergleiche $8 < 9$ zu $8^{10} < 9^{10}$, also $a < b$.
3. Bestaetige mit $30 \ln 2 \approx 20{,}79$ gegen $20 \ln 3 \approx 21{,}97$.

MUSTERLOESUNG: Sandbox $8^{10} = 1073741824$ gegen $9^{10} = 3486784401$ zeigt $a < b$. Rechnung $2^{30} = (2^3)^{10} = 8^{10}$ und $3^{20} = (3^2)^{10} = 9^{10}$. Wegen $8 < 9$ und Monotonie folgt $8^{10} < 9^{10}$, also $a < b$. Probe $30 \ln 2 \approx 20{,}79 < 21{,}97 \approx 20 \ln 3$ bestaetigt mit dem Standardweg, der Trick diente nur der Orientierung.

Klausur-Satz: `Da 2^30 = 8^10 und 3^20 = 9^10 gilt und 8 < 9 ist, folgt a < b.`

## Schritt 5 — ausprobieren: Verfahrensvergleich & Abgrenzung

VERGLEICH (Wahl des Verfahrens, A gegen B):

VERGLEICH: Triff zuerst die Wahl des Verfahrens: (i) heuristisches Verfahren (Vermutung, Eingrenzung und Kontrolle auf dem Schmierpapier) oder (ii) Standardweg (vollstaendiger Beweis in der Reinschrift bei $begruenden$, $beweisen$ oder $nachweisen$) > dann loesen.

AUFGABE A: Fuer $x > 0$ ist $x + 9/x$ gegeben. Vermuten Sie den minimalen Wert durch Einsetzen geeigneter Werte.
AUFGABE B: Fuer $x > 0$ ist $x + 9/x$ gegeben. Beweisen Sie, dass der Wert $6$ ein Minimum ist.

HILFE: Aufgabe A verlangt nur eine Vermutung, daher Verfahren (i) mit Spezialwert $x = 3$. Aufgabe B verlangt einen Beweis, daher Verfahren (ii) mit AM-GM und Gleichheitsbedingung.

ANTWORT: A erfordert Verfahren (i): Setzt man $x = 3$ ein, ergibt sich $3 + 9/3 = 6$; dies legt $6$ als Minimum nahe, beweist es aber nicht. B erfordert Verfahren (ii): Da $x > 0$ und $9/x > 0$ gilt, folgt mit AM-GM $x + 9/x \ge 2 \cdot \sqrt{x \cdot 9/x} = 2 \cdot 3 = 6$; Gleichheit gilt fuer $x = 9/x$, also $x = 3$. Damit ist $6$ nachweislich das Minimum.

Klausur-Satz: `Ein Spezialwert liefert nur eine Vermutung; erst die AM-GM-Abschaetzung mit Gleichheitsbedingung beweist das Minimum.`

## Schritt 6 — check: Selbsttest zu CN-Tricks: sechs Schnellverfahren
CHECK (drei Fragen mit Antworten):

FRAGE: Warum beweist das Einsetzen eines Spezialwertes keine allgemeine Aussage? | ANTWORT: Weil eine Aussage, die fuer einen einzelnen Wert gilt, nicht fuer alle Werte gelten muss.
FRAGE: Wann darf man den Satz von Vieta in der Form $x_1 + x_2 = -b/a$ verwenden? | ANTWORT: Nur bei einer quadratischen Gleichung $ax^2 + bx + c = 0$ mit $a \ne 0$.
FRAGE: Was liefert die Parametertrennung bei einer Ungleichung der Form $k \ge h(x)$? | ANTWORT: Die Bedingung wird zu $k \ge \max h(x)$; der Parameter steht allein auf einer Seite.

Klausur-Satz: `Heuristische Verfahren liefern Vermutungen und Kontrollen, den Beweis uebernimmt der Standardweg.`

## Fehlvorstellung

(Kein Schritt; wird vom Parser uebersprungen.)

1. Fehlkonzept: Ein korrekt berechneter Spezialwert beweist bereits die allgemeine Aussage.
   Korrektur-Satz: `Ein einzelner Spezialwert beweist keinen allgemeinen Satz; er dient nur der Vermutung.`
2. Fehlkonzept: Beim Trennen eines Parameters darf eine Ungleichung bedenkenlos mit einem $x$-haltigen Term multipliziert werden.
   Korrektur-Satz: `Beim Multiplizieren einer Ungleichung mit einem Term muss dessen Vorzeichen geprueft werden, da sich sonst das Ungleichheitszeichen umdreht.`

## Schritt 7 — szenario: Klausurtransfer: CN-Tricks: sechs Schnellverfahren
ROLLE: Du bist Tutor in einem Mathe-Kurs und sollst eine Strategiekarte erstellen.
SITUATION: Ein Mitschueler will in der Klausur nur mit heuristischen Schnellverfahren arbeiten und keine Standardwege schreiben. Beurteile seine Strategie in einer zusammenhaengenden Darstellung (circa 150 Woerter) und erlaeutere an zwei Beispielen (Spezialwert und AM-GM), wann ein Schnellverfahren erlaubt ist und wann der Standardweg zwingend ist.
AUFGABE (beurteilen, AFB III): Verfasse eine zusammenhaengende Darstellung von etwa 150 Woertern mit Problemanalyse, zwei Beispielen und Fazit.
RUBRIC (30 XP): Benennung des Grundproblems (Heuristik ersetzt keinen Beweis) (5 XP) | Beispiel Spezialwert: Vermutung gegen Beweis (10 XP) | Beispiel AM-GM: Positivitaet plus Gleichheitsbedingung (10 XP) | Fazit zur Arbeitsteilung von Schmierpapier und Reinschrift (5 XP).

## Schritt 8 — reflexion: Takeaway & Metakognitive Reflexion

TAKEAWAY (Kernbotschaft in einem Kasten):

Die sechs Verfahren gehoeren auf das Schmierpapier: Spezialwerte raten, Ausschluss streicht, Skizzen zeigen, Vieta prueft, AM-GM schaetzt, Parametertrennung isoliert. Sie liefern Richtung, Kontrolle und Eingrenzung, ersetzen aber niemals den Standardweg in der Reinschrift. Bei $begruenden$, $beweisen$ oder $nachweisen$ wird stets der allgemeine Beweis mit Bedingungssatz verlangt.

Takeaway-Satz: `Schnellverfahren gehoeren aufs Schmierpapier, in die Reinschrift gehoeren Standardweg und Bedingungssaetze.`

REFLEXION (zwei Fragen):
1. Welcher Schritt fiel schwerer: die Anwendung der sechs Verfahren (Schritt 3) oder die Entscheidung zwischen Schnellverfahren und Standardweg (Schritt 5)?
2. Beim naechsten Mal lese ich zuerst den Operator; bei $begruenden$ oder $beweisen$ schreibe ich sofort den Standardweg und nutze die Heuristik nur zur Kontrolle.
