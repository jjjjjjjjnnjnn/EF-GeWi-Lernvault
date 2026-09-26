---
fach: Mathe
thema: "Monotonie und Extrempunkte kompakt"
level: 1
ziel: Klausur
xp: 100
operatoren: [untersuchen, berechnen, begruenden]
klausurrelevant: true
datum: 2026-09-26
tags: [EF, Mathe, Analysis]
version: Lesson-v3
---

# Lernreise: Monotonie und Extrempunkte kompakt (L1, Ziel Klausur)

<!-- Lesson v3: 8 Schritte plus Anekdote und Fehlvorstellung; Fehlvorstellung zwischen Schritt 6 und 7 (Parser-Skip); interaktives [Werkzeug: <id>]; Gating: check/szenario nicht bestanden = Weiter gesperrt; XP: entdecken 5 / ausprobieren 15 / check 20 / szenario 30 -->

## Schritt 1 — entdecken

ZIELE (drei messbare Ziele dieser Lektion):

1. Du kannst das Monotoniekriterium nennen und an $f(x) = x^3 - 3x^2 + 1$ die Vorzeichentabelle von $f'(x) = 3x^2 - 6x$ aufstellen.
2. Du kannst Kandidaten aus $f'(x_0) = 0$ zu $x = 0$ und $x = 2$ bestimmen und mit $f''(x) = 6x - 6$ zu Hoch und Tief sortieren.
3. Du kannst Hochpunkt gegen globales Maximum abgrenzen und den Antwortsatz mit Koordinaten formulieren (AFB II).

### Hook / Phaenomen

Im Jahr 2008 verkaufte ein Fondsmanager auf dem Gipfel — und kaufte im Tal nach. Seine Nachbarn taten das Gegenteil: Sie kauften auf dem Gipfel, weil die Kurve stieg, und verkauften im Tal, weil sie fiel. Der Fehler heisst: lokale Richtung mit globaler Lage verwechselt. Eine Funktion mit $HP(1, 5)$ und $TP(3, 1)$ stellt dasselbe Raetsel: Wo steigt sie, wo faellt sie — und warum ist $f' = 0$ allein nie die Antwort?

### Fachbegriff & Definition

Nach dem NRW-Kernlehrplan Analysis gilt das **Monotoniekriterium: Ist $f'(x) > 0$ auf einem Intervall, so steigt $f$ dort streng monoton; ist $f'(x) < 0$, so faellt $f$ dort streng monoton**. Ein **lokaler Extrempunkt liegt vor, wenn $f'(x_0) = 0$ gilt und $f'$ dort das Vorzeichen wechselt oder $f''(x_0) \ne 0$ ist**. Die **Vorzeichentabelle ordnet die Nullstellen von $f'$ und belegt die Monotonie je Teilintervall**.

### Wirkungsgefuege / Modell

Der Mechanismus verbindet Richtung und Gipfel: $f'(x) = 3x^2-6x = 3x(x-2)$ besitzt Nullstellen $0$ und $2$. Links von $0$ gilt $f' > 0$ zu steigend, zwischen $0$ und $2$ gilt $f' < 0$ zu fallend, rechts von $2$ gilt $f' > 0$ zu steigend. Also $HP$ bei $0$ und $TP$ bei $2$. Mit $f''(x) = 6x-6$ gilt $f''(0) = -6 < 0$ zu Maximum und $f''(2) = 6 > 0$ zu Minimum — Vorzeichenwechsel und zweite Ableitung bestaetigen einander.

Schritt A: $f'$ bilden und $f' = 0$ loesen.
Schritt B: Vorzeichentabelle je Intervall fuellen.
Schritt C: Mit $f''$ qualifizieren und Punkte durch Einsetzen bestimmen.

Klausur-Satz: `Ein lokaler Extrempunkt liegt vor, wenn f'(x0) = 0 gilt und f' an dieser Stelle das Vorzeichen wechselt oder f''(x0) ungleich 0 ist.`

## Schritt 2 — entdecken

PRETRAINING-Box (fuenf Kernbegriffe mit Definitionen):

### Hook / Phaenomen

Ein Sattelpunkt besitzt waagerechte Tangente — und ist doch kein Extrempunkt. Wer nur $f' = 0$ prueft, erklaert den Sattel zum Gipfel und verliert die Aufgabe. Welche fuenf Begriffe trennen Kandidat und Beweis in zwei Sekunden?

### Fachbegriffe & Definitionen

- **Monoton steigend:** $f'(x) > 0$ auf dem Intervall; der Graph steigt von links nach rechts.
- **Monoton fallend:** $f'(x) < 0$ auf dem Intervall; der Graph faellt von links nach rechts.
- **Notwendige Bedingung:** $f'(x_0) = 0$ liefert nur Kandidaten und ist allein nicht hinreichend.
- **Hinreichende Bedingung:** $f''(x_0) < 0$ zu Maximum, $f''(x_0) > 0$ zu Minimum — oder Vorzeichenwechsel von $f'$.
- **Vorzeichentabelle:** Geordnete Nullstellen von $f'$ mit Vorzeichen je Teilintervall; daraus folgt die Monotonie.

### Wirkungsgefuege / Modell

Die Kette lautet: $f'$ zeigt die Richtung, $f' = 0$ markiert Verdachtsstellen, $f''$ oder Vorzeichenwechsel faellt das Urteil. Am Muster $f(x) = x^3-3x$ mit $f' = 3x^2-3$ zu $x = \pm 1$ gilt $f''(-1) = -6 < 0$ zu Hoch und $f''(1) = 6 > 0$ zu Tief. Ohne diesen zweiten Schritt bleibt $x^3$ an $0$ mit $f' = 0$ ein falscher Gipfel — der Sattel entlarvt jede Abkuerzung.

Klausur-Satz: `Die Monotonie ergibt sich aus dem Vorzeichen der ersten Ableitung, die Art des Extremums aus dem Vorzeichen der zweiten Ableitung.`

## Schritt 3 — entdecken

TIEFEN-KONZEPT (ein Konzept mit visuellem Schema):

### Hook / Phaenomen

Zwei Funktionen besitzen beide $f'(2) = 0$ — eine mit Maximum, eine mit Sattel. Der Taschenrechner zeigt beide Male eine waagerechte Tangente, doch nur einmal wechselt die Richtung. Wie entlarvt der Vorzeichenwechsel den falschen Gipfel — und warum ist $f''(x_0) = 0$ ohne Wechsel kein Urteil?

### Fachbegriff & Definition

Der **Vorzeichenwechsel von $f'$ entscheidet: Wechselt $f'$ von plus nach minus, so liegt ein lokales Maximum vor; von minus nach plus ein lokales Minimum; ohne Wechsel ein Sattelpunkt**. Die **zweite Ableitung bestaetigt: $f''(x_0) < 0$ stuetzt Maximum, $f''(x_0) > 0$ stuetzt Minimum**. Bei $f''(x_0) = 0$ bleibt nur der Vorzeichenwechsel als Richter.

### Wirkungsgefuege / Modell

Der Tiefenweg am Wechsel: Links $+$ und rechts $-$ bedeutet Anstieg bis $x_0$ und Abstieg danach — also Gipfel. Links $-$ und rechts $+$ bedeutet Tal. Links und rechts gleiches Zeichen bedeutet Durchstieg als Sattel. Formal: $f'(x) = 3(x-1)(x-3)$ wechselt an $1$ von $+$ nach $-$ zu $HP(1, 5)$ und an $3$ von $-$ nach $+$ zu $TP(3, 1)$. Die Rechnung $f''(1) < 0$ und $f''(3) > 0$ spiegelt denselben Wechsel algebraisch.

Schritt A: $f' = 0$ loesen und Intervalle ordnen.
Schritt B: Vorzeichen je Intervall einsetzen und Wechsel lesen.
Schritt C: Mit $f''$ gegenpruefen und Punkte einsetzen.

```diagram
   f'(x) :  +  +  + | -  -  - | +  +  +
                   x1        x2
   f(x) :  steigt   | faellt  | steigt
            Hochpunkt /   \ Tiefpunkt /
   f'(x1)=0, VZW + zu -  => lokales Maximum  (f''(x1)<0)
   f'(x2)=0, VZW - zu +  => lokales Minimum  (f''(x2)>0)
   kein VZW => Sattelpunkt, trotz f'(x0)=0
   Merke: f'(x0)=0 ist nur notwendig, erst der VZW entscheidet.
```

Klausur-Satz: `Wechselt f' an der Stelle x0 das Vorzeichen von plus nach minus, so liegt dort ein lokales Maximum vor.`

## Anekdote & Fun-Fact

Stell dir vor, du stehst auf dem Gipfel eines kleinen Berges: Rundherum geht es nur nach unten, also fuehlt sich der Punkt wie der hoechste der Umgebung an. Trotzdem ist dieser Gipfel nicht der hoechste Punkt der Erde. Genauso ist ein Hochpunkt einer Funktion nur ein lokales Maximum: Weiter weg kann die Funktion deutlich groessere Werte annehmen.

Bezug zum Konzept: `Ein Hochpunkt ist nur ein lokales Maximum; das globale Maximum muss nicht dort liegen.`

## Schritt 4 — ausprobieren

BEISPIEL (geleitete Aufgabe mit Werkzeug):

[Werkzeug: lego]

AUFGABE (untersuchen, AFB II): Gegeben ist $f(x) = x^3 - 6x^2 + 9x + 1$. Untersuchen Sie $f$ rechnerisch auf Monotonie sowie auf lokale Extrempunkte und geben Sie Art und Koordinaten an.

HILFE:
1. Schritt 1: $f'(x)$ bilden und $f'(x) = 0$ setzen, um die Kandidaten zu erhalten.
2. Schritt 2: $f''(x)$ bilden und an den Kandidaten auswerten (negativ > Hochpunkt, positiv > Tiefpunkt).
3. Schritt 3: Die Kandidaten in $f$ einsetzen, um die $y$-Koordinaten zu erhalten; mit dem Vorzeichen von $f'$ die Monotonieintervalle angeben.

MUSTERLOESUNG: Es gilt $f'(x) = 3x^2 - 12x + 9 = 3(x^2 - 4x + 3) = 3(x - 1)(x - 3)$. Die notwendige Bedingung $f'(x) = 0$ liefert die Kandidaten $x_1 = 1$ und $x_2 = 3$. Mit $f''(x) = 6x - 12$ folgt $f''(1) = -6 < 0$, also ein lokales Maximum, und $f''(3) = 6 > 0$, also ein lokales Minimum. Die Funktionswerte sind $f(1) = 1 - 6 + 9 + 1 = 5$ und $f(3) = 27 - 54 + 27 + 1 = 1$. Damit gilt $HP(1, 5)$ und $TP(3, 1)$. Da $f'(x)$ fuer $x < 1$ positiv, fuer $1 < x < 3$ negativ und fuer $x > 3$ wieder positiv ist, steigt $f$ auf $]-\infty, 1[$ und $]3, +\infty[$ und faellt auf $]1, 3[$.

Klausur-Satz: `Der Graph besitzt bei x = 1 ein lokales Maximum mit HP(1 | 5) und bei x = 3 ein lokales Minimum mit TP(3 | 1).`

## Schritt 5 — ausprobieren

VERGLEICH (Wahl des Verfahrens, A gegen B):

VERGLEICH: Triff zuerst die Wahl des Verfahrens: (i) $f''$-Kriterium (zweite Ableitung gut berechenbar und an der Stelle ungleich null) oder (ii) VZW-Kriterium (Vorzeichentabelle, wenn $f''(x_0) = 0$ gilt oder die zweite Ableitung zu aufwendig ist) > dann rechnen.

AUFGABE A: Bestimmen Sie die Art der Extremstelle von $f(x) = x^3 - 6x^2 + 9x + 1$ bei $x = 3$.
AUFGABE B: Bestimmen Sie die Art der Extremstelle von $g(x) = x^4$ bei $x = 0$.

HILFE: Bei A ist $f''(x) = 6x - 12$ einfach und $f''(3) = 6 \ne 0$, daher Verfahren (i). Bei B ergibt $g''(x) = 12x^2$ an der Stelle $g''(0) = 0$, das Kriterium versagt; betrachte $g'(x) = 4x^3$ mit Vorzeichen links und rechts, daher Verfahren (ii).

ANTWORT: A erfordert Verfahren (i): $f''(3) = 6 > 0$, also ein lokales Minimum ($TP(3, 1)$). B erfordert Verfahren (ii): Da $g''(0) = 0$ nichts entscheidet, wird $f'$ betrachtet; $g'(x) = 4x^3$ wechselt bei $x = 0$ das Vorzeichen von minus nach plus, also liegt dort ein lokales Minimum mit $g(0) = 0$ vor.

Klausur-Satz: `Ist f''(x0) ungleich 0, so entscheidet ihr Vorzeichen die Art; ist f''(x0) = 0, so muss der Vorzeichenwechsel von f' geprueft werden.`

## Schritt 6 — check

CHECK (drei Fragen mit Antworten):

FRAGE: Welche Bedingung ist notwendig fuer einen lokalen Extrempunkt? | ANTWORT: $f'(x_0) = 0$, das heisst eine waagerechte Tangente an der Stelle $x_0$.
FRAGE: Wie unterscheidet man mit der zweiten Ableitung ein Maximum von einem Minimum? | ANTWORT: $f''(x_0) < 0$ bedeutet ein lokales Maximum, $f''(x_0) > 0$ ein lokales Minimum.
FRAGE: Warum ist $f'(x_0) = 0$ allein kein Beweis fuer ein Extremum? | ANTWORT: Weil bei einem Sattelpunkt ebenfalls $f'(x_0) = 0$ gilt; erst ein Vorzeichenwechsel von $f'$ sichert ein Extremum.

Klausur-Satz: `Aus f'(x0) = 0 und einem Vorzeichenwechsel von f' folgt ein lokaler Extrempunkt.`

## Fehlvorstellung

(Kein Schritt; wird vom Parser uebersprungen.)

1. Fehlkonzept: Aus $f'(x_0) = 0$ folgt automatisch ein Extrempunkt.
   Korrektur-Satz: `f'(x0) = 0 ist nur notwendig; erst ein Vorzeichenwechsel von f' oder ein von null verschiedenes f''(x0) sichert ein Extremum.`
2. Fehlkonzept: Eine positive Ableitung an einem einzelnen Punkt beweist globale Monotonie.
   Korrektur-Satz: `Monotonie ist eine Eigenschaft eines Intervalls; entscheidend ist das Vorzeichen von f' auf dem gesamten Intervall.`

## Schritt 7 — szenario

ROLLE: Du bist Referent in einem Mathe-Crashkurs fuer die ZKE-Vorbereitung.
SITUATION: Ein Kursteilnehmer behauptet, jede Stelle mit $f'(x_0) = 0$ sei automatisch ein Hoch- oder Tiefpunkt, und will seine Behauptung an $f(x) = x^3$ (mit $f'(0) = 0$) belegen. Bewerte seine Aussage in einer zusammenhaengenden Darstellung (circa 150 Woerter) unter Rueckgriff auf notwendige und hinreichende Bedingung.
AUFGABE (begruenden, AFB III): Verfasse eine zusammenhaengende Darstellung von etwa 150 Woertern mit Fehlerbenennung, Gegenbeispiel, Verfahren und Fazit.
RUBRIC (30 XP): Benennung der Behauptung als Verwechslung von notwendig und hinreichend (5 XP) | Gegenbeispiel $f(x) = x^3$ mit $f'(0) = 0$, aber keinem Extremum (10 XP) | Korrekte Vorgehensweise mit $f''$- oder VZW-Kriterium (10 XP) | Fazit zum Stellenwert beider Bedingungen (5 XP).

## Schritt 8 — entdecken

TAKEAWAY (Kernbotschaft in einem Kasten):

Die Monotonie folgt aus dem Vorzeichen von $f'$, Extrempunkte folgen dem Zwei-Schritt-Verfahren: $f'(x_0) = 0$ liefert Kandidaten, Vorzeichenwechsel oder $f''(x_0)$ liefern die Art, Einsetzen liefert die Punkte. Waagerechte Tangente allein beweist nichts, der Sattelpunkt ist das Gegenbeispiel. Globale Extrema verlangen den Vergleich aller lokalen Kandidaten mit den Intervallraendern.

Takeaway-Satz: `f'(x0) = 0 ist nur notwendig; erst der Vorzeichenwechsel von f' oder das Vorzeichen von f''(x0) legt die Art des Extremums fest.`

REFLEXION (zwei Fragen):
1. Welcher Schritt fiel schwerer: das Aufstellen der Vorzeichentabelle (Schritt 4) oder die Wahl zwischen $f''$- und VZW-Kriterium (Schritt 5)?
2. Beim naechsten Mal pruefe ich nach dem Loesen von $f'(x) = 0$ zuerst $f''(x_0)$; ist es null, wechsle ich sofort zur Vorzeichentabelle.
