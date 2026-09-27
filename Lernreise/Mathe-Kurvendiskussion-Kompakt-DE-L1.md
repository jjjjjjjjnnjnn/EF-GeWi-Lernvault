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

<!-- Campaign: Optimierung | Episode 19/33 | Krise: Wasserrohr-Druck 5,4 bar Leck | Target: x0 = 6, h = 0.4, Target m = 10.03 | Tool: box-optimizer -->

## Schritt 1 — entdecken: Wendepunkt der Produktion
ZIELE (drei messbare Ziele dieser Lektion):

1. Du kannst das Monotoniekriterium nennen und an $f(x) = x^3 - 3x^2 + 1$ die Vorzeichentabelle von $f'(x) = 3x^2 - 6x$ aufstellen.
2. Du kannst Kandidaten aus $f'(x_0) = 0$ zu $x = 0$ und $x = 2$ bestimmen und mit $f''(x) = 6x - 6$ zu Hoch und Tief sortieren.
3. Du kannst Hochpunkt gegen globales Maximum abgrenzen und den Antwortsatz mit Koordinaten formulieren (AFB II).

###

### Hook / Phaenomen

Hook / Phaenomen (CAO-Log, Episode 19 von 33): Super-Engineering-Zentrale, Wasserrohr-Druck 5,4 bar Leck. Der Chief Algorithm Officer ruft: x0 = 6, h = 0.4, Target m = 10.03, die Assistentin meldet Rot-Alarm auf allen Screens. Genau hier entscheidet Monotonie und Extrempunkte kompakt ueber Freigabe oder Sperrung, ueber Kostenexplosion oder Rekordgewinn, ueber Kollision oder gruene Welle. Das Protokoll der Vorwoche (Mathe-Kosinussatz-Orthogonalitaet-L1.md) legte die Spur, das naechste Audit (Mathe-Kurvendiskussion-Kompakt-L1.md) laesst keine Ausrede mehr zu. Die Messwerte streuen, die Kurven zittern, doch die Mathematik bleibt unbestechlich: Wer Sekante und Tangente, Maximum und Wendepunkt, Vektor und Ebene richtig liest, rettet das Projekt. In dieser Episode stellst du im Sandbox-Optimierer die Parameter so ein, dass alle Kennzahlen im gruenen Bereich landen. Beobachte zuerst das Phaenomen in Ruhe, benenne dann die Objekte mit exakter Notation, pruefe schliesslich das Ergebnis mit einer Gegenrechnung. Der folgende Weg fuehrt vom Alarmton zur sauberen Klausurloesung: erst das Phaenomen beobachten, dann die Begriffe sichern, dann das Modell rechnen und im Labor bestaetigen.

`Klausur-Satz: Siehe Schritt-Inhalt.`

## Schritt 2 — entdecken: Ausruestungskiste der Algorithmus-Unit
PRETRAINING-Box (fuenf Kernbegriffe mit Definitionen):

### Hook / Phaenomen

Fuenf Begriffe trennen in dieser Lektion Alltagssprache von Klausursprache. Wer sie aktiv wiedergeben kann, liest jede Aufgabe schneller und waehlt sofort das richtige Verfahren.

### Fachbegriffe & Definitionen

- **Extremalbedingung:** Die Gleichung $f'(x_0) = 0$ markiert alle Kandidaten fuer Hoch- und Tiefpunkte. Mechanismus: Erste Ableitung bilden und null setzen. Klausur-Punkt: Kandidaten vollständig bestimmen und als Kandidaten bezeichnen.
- **Vorzeichenwechsel:** Wechselt $f'$ von plus nach minus, liegt ein Maximum vor, umgekehrt ein Minimum. Mechanismus: Vorzeichentabelle links und rechts der Kandidaten aufstellen. Klausur-Punkt: Tabelle zeigen und Wechselrichtung nennen.
- **Zweite Ableitung:** Das Vorzeichen von $f''(x_0)$ entscheidet die Art: negativ bedeutet Hoch, positiv bedeutet Tief. Mechanismus: Kandidaten in $f''$ einsetzen und Vorzeichen lesen. Klausur-Punkt: Kriterium nennen und Ergebnis zuordnen.
- **Monotonie:** Das Vorzeichen von $f'$ steuert Steigen und Fallen auf ganzen Intervallen. Mechanismus: Intervalle zwischen den Nullstellen von $f'$ testen. Klausur-Punkt: Intervalle angeben und Monotonie je Intervall nennen.
- **y-Wert:** Der Funktionswert $f(x_0)$ vollendet jeden Extrempunkt zu Koordinaten. Mechanismus: Kandidaten in $f$ einsetzen und Punkte notieren. Klausur-Punkt: Punkte als HP und TP vollständig mit Koordinaten angeben.

### Wirkungsgefuege / Modell

Die Kette verbindet alle fuenf Begriffe zu einem Verfahren: Erkennen, Einordnen, Aufstellen, Loesen und Deuten. Jeder Begriff traegt genau einen Schritt, gemeinsam sichern sie die volle Punktzahl.

Klausur-Satz: `Die Monotonie ergibt sich aus dem Vorzeichen der ersten Ableitung, die Art des Extremums aus dem Vorzeichen der zweiten Ableitung.`

`Klausur-Satz: Siehe Schritt-Inhalt.`

## Schritt 3 — entdecken: Wirkungskette hinter Monotonie und Extrempunkte kompakt
EXPERIMENTELLE ERKUNDUNG (Sandbox, erst spielen, dann deuten):

### Hook & Phaenomen

Die Sandbox macht das Unsichtbare sichtbar: Stelle Groessen ein, beobachte Kurven und lies Werte ab, bevor eine einzige Formel faellt. Erst die Anschauung, dann die Deutung, erst das Spiel, dann das Gesetz.

### Spiel-Aufgabe / Challenge

Oeffne die Sandbox aus Schritt 4, variiere die zentralen Parameter in kleinen Schritten und notiere je Stufe Kurvenform und Messwert. Formuliere aus drei Stufen eine erste Vermutung ueber den Zusammenhang.

### Aha-Moment & Gesetz

Die Kausalkette laeuft von der Ableitung ueber das Vorzeichen zum Punkt: Zuerst löst man $f'(x)=0$ fuer die Kandidaten, dann prueft man per Vorzeichentabelle oder $f''(x_0)$, schliesslich berechnet man $f(x_0)$ fuer die Koordinaten. Wechselt $f'$ von plus nach minus, liegt ein Maximum vor, bei $f''(x_0)<0$ gilt dasselbe Kriterium in Kurzform. Ohne Vorzeichenpruefung bleibt jeder Kandidat unentschieden und die Loesung unvollstaendig.

```diagram
+------------------------------------------+
| f prime(x) = 0  ->  Kandidaten x1, x2    |
|   | Vorzeichen von f prime testen        |
|   + -> - : Maximum HP(x1|f(x1))         |
|   - -> + : Minimum TP(x2|f(x2))         |
| Check: f prime prime(x1)<0, >0 bei x2    |
+------------------------------------------+
```
Formelkern: $f'(x)=0$

Klausur-Satz: `Wechselt f' an der Stelle x0 das Vorzeichen von plus nach minus, so liegt dort ein lokales Maximum vor.`

`Klausur-Satz: Siehe Schritt-Inhalt.`

## Anekdote & Fun-Fact
Stell dir vor, du stehst auf dem Gipfel eines kleinen Berges: Rundherum geht es nur nach unten, also fuehlt sich der Punkt wie der hoechste der Umgebung an. Trotzdem ist dieser Gipfel nicht der hoechste Punkt der Erde. Genauso ist ein Hochpunkt einer Funktion nur ein lokales Maximum: Weiter weg kann die Funktion deutlich groessere Werte annehmen.

Bezug zum Konzept: `Ein Hochpunkt ist nur ein lokales Maximum; das globale Maximum muss nicht dort liegen.`

## Schritt 4 — ausprobieren: Sandbox-Auftrag Wendepunkt der Produktion
Kontinuitaet: Vorher Mathe-Kosinussatz-Orthogonalitaet-L1.md | Nachher Mathe-Kurvendiskussion-Kompakt-L1.md. Krise dieser Episode: Wasserrohr-Druck 5,4 bar Leck. Target: x0 = 6, h = 0.4, Target m = 10.03.

BEISPIEL (Sandbox Level mit Werkzeug):

[Werkzeug: box-optimizer]

AUFGABE (Levelziel, AFB II): Knacke das Kurven-Level: Ziehe im Sandbox-Slider die Stelle $x$ ueber den Graphen und beobachte, wie die Tangentensteigung an zwei Stellen null wird und dazwischen das Vorzeichen wechselt. Lies beide Kandidaten ab, fuehre dann die Rechnung mit $f'=0$, Vorzeichentabelle und $f''$ vollständig durch und gib HP und TP mit Koordinaten an.

HILFE:
1. Bilde $f'(x)$, loese $f'(x) = 0$ und lies im Sandbox-Slider beide Kandidaten sowie den Vorzeichenwechsel ab.
2. Lege eine Vorzeichentabelle an oder berechne $f''(x_1)$ und $f''(x_2)$ zur Artbestimmung.
3. Berechne $f(x_1)$ und $f(x_2)$ und notiere HP und TP mit vollständigen Koordinaten.

MUSTERLOESUNG: Sandbox zeigt Kandidaten bei $x = 1$ mit Wechsel plus nach minus und bei $x = 3$ mit Wechsel minus nach plus. Rechnung $f'(1) = 0$ mit $f''(1) < 0$ liefert HP(1|5), $f'(3) = 0$ mit $f''(3) > 0$ liefert TP(3|1). Die Vorzeichentabelle bestaetigt Maximum bei $x = 1$ und Minimum bei $x = 3$, beide Punkte sind vollständig mit y-Werten angegeben.

Klausur-Satz: `Der Graph besitzt bei x = 1 ein lokales Maximum mit HP(1 | 5) und bei x = 3 ein lokales Minimum mit TP(3 | 1).`

`Klausur-Satz: Siehe Schritt-Inhalt.`

## Schritt 5 — ausprobieren: Duell der Verfahren Wendepunkt der Produktion
VERGLEICH (Wahl des Verfahrens, A gegen B):

VERGLEICH: Triff zuerst die Wahl des Verfahrens: (i) $f''$-Kriterium (zweite Ableitung gut berechenbar und an der Stelle ungleich null) oder (ii) VZW-Kriterium (Vorzeichentabelle, wenn $f''(x_0) = 0$ gilt oder die zweite Ableitung zu aufwendig ist) > dann rechnen.

Weg A: Erst Verfahren waehlen, dann rechnen.

AUFGABE A: Bestimmen Sie die Art der Extremstelle von $f(x) = x^3 - 6x^2 + 9x + 1$ bei $x = 3$.
Weg B: Alternative Route mit Gegenrechnung.

AUFGABE B: Bestimmen Sie die Art der Extremstelle von $g(x) = x^4$ bei $x = 0$.

HILFE: Bei A ist $f''(x) = 6x - 12$ einfach und $f''(3) = 6 \ne 0$, daher Verfahren (i). Bei B ergibt $g''(x) = 12x^2$ an der Stelle $g''(0) = 0$, das Kriterium versagt; betrachte $g'(x) = 4x^3$ mit Vorzeichen links und rechts, daher Verfahren (ii).

ANTWORT: A erfordert Verfahren (i): $f''(3) = 6 > 0$, also ein lokales Minimum ($TP(3, 1)$). B erfordert Verfahren (ii): Da $g''(0) = 0$ nichts entscheidet, wird $f'$ betrachtet; $g'(x) = 4x^3$ wechselt bei $x = 0$ das Vorzeichen von minus nach plus, also liegt dort ein lokales Minimum mit $g(0) = 0$ vor.

Klausur-Satz: `Ist f''(x0) ungleich 0, so entscheidet ihr Vorzeichen die Art; ist f''(x0) = 0, so muss der Vorzeichenwechsel von f' geprueft werden.`

`Klausur-Satz: Siehe Schritt-Inhalt.`

## Schritt 6 — check: Selbsttest zu Monotonie und Extrempunkte kompakt: Wendepunkt der Produktion
CHECK (drei Fragen mit Antworten):

FRAGE: Welche Bedingung ist notwendig fuer einen lokalen Extrempunkt? | ANTWORT: $f'(x_0) = 0$, das heisst eine waagerechte Tangente an der Stelle $x_0$.
FRAGE: Wie unterscheidet man mit der zweiten Ableitung ein Maximum von einem Minimum? | ANTWORT: $f''(x_0) < 0$ bedeutet ein lokales Maximum, $f''(x_0) > 0$ ein lokales Minimum.
FRAGE: Warum ist $f'(x_0) = 0$ allein kein Beweis fuer ein Extremum? | ANTWORT: Weil bei einem Sattelpunkt ebenfalls $f'(x_0) = 0$ gilt; erst ein Vorzeichenwechsel von $f'$ sichert ein Extremum.

Klausur-Satz: `Aus f'(x0) = 0 und einem Vorzeichenwechsel von f' folgt ein lokaler Extrempunkt.`

`Klausur-Satz: Siehe Schritt-Inhalt.`

## Fehlvorstellung
(Kein Schritt; wird vom Parser uebersprungen.)

1. Fehlkonzept: Aus $f'(x_0) = 0$ folgt automatisch ein Extrempunkt.
   Korrektur-Satz: `f'(x0) = 0 ist nur notwendig; erst ein Vorzeichenwechsel von f' oder ein von null verschiedenes f''(x0) sichert ein Extremum.`
2. Fehlkonzept: Eine positive Ableitung an einem einzelnen Punkt beweist globale Monotonie.
   Korrektur-Satz: `Monotonie ist eine Eigenschaft eines Intervalls; entscheidend ist das Vorzeichen von f' auf dem gesamten Intervall.`

## Schritt 7 — szenario: Klausurtransfer: Monotonie und Extrempunkte kompakt: Wendepunkt der Produktion
ROLLE: Du bist Referent in einem Mathe-Crashkurs fuer die ZKE-Vorbereitung.
SITUATION: Ein Kursteilnehmer behauptet, jede Stelle mit $f'(x_0) = 0$ sei automatisch ein Hoch- oder Tiefpunkt, und will seine Behauptung an $f(x) = x^3$ (mit $f'(0) = 0$) belegen. Bewerte seine Aussage in einer zusammenhaengenden Darstellung (circa 150 Woerter) unter Rueckgriff auf notwendige und hinreichende Bedingung.
AUFGABE (begruenden, AFB III): Verfasse eine zusammenhaengende Darstellung von etwa 150 Woertern mit Fehlerbenennung, Gegenbeispiel, Verfahren und Fazit.
RUBRIC (30 XP): Benennung der Behauptung als Verwechslung von notwendig und hinreichend (5 XP) | Gegenbeispiel $f(x) = x^3$ mit $f'(0) = 0$, aber keinem Extremum (10 XP) | Korrekte Vorgehensweise mit $f''$- oder VZW-Kriterium (10 XP) | Fazit zum Stellenwert beider Bedingungen (5 XP).

`Klausur-Satz: Siehe Schritt-Inhalt.`

## Schritt 8 — reflexion: Takeaway & Reflexion: Wendepunkt der Produktion
TAKEAWAY (Kernbotschaft in einem Kasten):

Die Monotonie folgt aus dem Vorzeichen von $f'$, Extrempunkte folgen dem Zwei-Schritt-Verfahren: $f'(x_0) = 0$ liefert Kandidaten, Vorzeichenwechsel oder $f''(x_0)$ liefern die Art, Einsetzen liefert die Punkte. Waagerechte Tangente allein beweist nichts, der Sattelpunkt ist das Gegenbeispiel. Globale Extrema verlangen den Vergleich aller lokalen Kandidaten mit den Intervallraendern.

Takeaway-Satz: `f'(x0) = 0 ist nur notwendig; erst der Vorzeichenwechsel von f' oder das Vorzeichen von f''(x0) legt die Art des Extremums fest.`

REFLEXION (zwei Fragen):
1. Welcher Schritt fiel schwerer: das Aufstellen der Vorzeichentabelle (Schritt 4) oder die Wahl zwischen $f''$- und VZW-Kriterium (Schritt 5)?
2. Beim naechsten Mal pruefe ich nach dem Loesen von $f'(x) = 0$ zuerst $f''(x_0)$; ist es null, wechsle ich sofort zur Vorzeichentabelle.

`Klausur-Satz: Siehe Schritt-Inhalt.`
