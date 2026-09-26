---
fach: Mathe
thema: "ZKE 2027: Teil A und Teil B im Zeitmodus"
level: 1
ziel: Klausur
xp: 100
operatoren: [berechnen, untersuchen, begruenden]
klausurrelevant: true
datum: 2026-09-26
tags: [EF, Mathe, Analysis]
version: Lesson-v3
---

# Lernreise: ZKE 2027: Teil A und Teil B im Zeitmodus (L1, Ziel Klausur)

<!-- Lesson v3: 8 Schritte plus Anekdote und Fehlvorstellung; Fehlvorstellung zwischen Schritt 6 und 7 (Parser-Skip); interaktives [Werkzeug: <id>]; Gating: check/szenario nicht bestanden = Weiter gesperrt; XP: entdecken 5 / ausprobieren 15 / check 20 / szenario 30 -->

## Schritt 1 — entdecken

ZIELE (drei messbare Ziele dieser Lektion):

1. Du kannst die Zwei-Teile-Struktur der ZKE mit Zeitregeln nennen: Teil A hilfsmittelfrei in hoechstens 25 Minuten (ohne Rechner, ohne Formelsammlung), Teil B mit WTR oder CAS plus Formelsammlung in mindestens 75 Minuten, insgesamt 100 Minuten.
2. Du kannst im Teil-A-Stil ohne Hilfsmittel Nullstellen, Ableitungen und Vektorlaengen berechnen und Potenzregel mit $pq$-Formel auswendig anwenden.
3. Du kannst in Teil B eine vollstaendige Kette aus Ansatz, Rechnung und Antwortsatz schreiben, denn bewertet wird der nachvollziehbare Loesungsweg (AFB II/III).

Klausur-Satz: `In der ZKE laeuft Teil A hilfsmittelfrei in hoechstens 25 Minuten, waehrend Teil B mit WTR oder CAS und Formelsammlung mindestens 75 Minuten umfasst.`

## Schritt 2 — entdecken

PRETRAINING-Box (fuenf Kernbegriffe mit Definitionen):

- Hilfsmittelfreier Teil (Teil A): Ohne Taschenrechner und ohne Formelsammlung; nur Handrechnung mit auswendig beherrschten Formeln.
- Teil B mit Hilfsmitteln: Mit WTR oder CAS plus offizieller Formelsammlung; der Loesungsweg wird vollstaendig aufgeschrieben.
- Mittlere Aenderungsrate: Differenzenquotient auf einem Intervall, also Sekantensteigung.
- Lokale Aenderungsrate: Ableitungswert an einer Stelle, also Tangentensteigung.
- Darstellungsleistung: Die Darstellung des Loesungswegs wird bepunktet; ein Ergebnis ohne Weg verfehlt Punkte.

Klausur-Satz: `In Teil A muessen Potenzregel, pq-Formel und Vektorlaenge ohne Hilfsmittel sicher beherrscht werden.`

## Schritt 3 — entdecken

TIEFEN-KONZEPT (ein Konzept mit visuellem Schema):

Die ZKE besteht aus zwei Pruefungen in ungleichem Takt. Beide Hefte liegen zu Beginn auf dem Tisch, die Hilfsmittel werden erst spaeter ausgegeben; jede Person entscheidet selbst, wann Teil A abgegeben wird, spaetestens nach 25 Minuten. Teil A verlangt Handgenauigkeit und Formelgedaechtnis: Nullstellen, Ableitungen und Vektorlaengen ohne jede Hilfe. Teil B verlangt Argumentationsketten und Sachuebersetzung: Analysis mit WTR oder CAS und Formelsammlung, bewertet als nachvollziehbarer Weg, nicht als blosse Zahl. Strategie: Teil A schnell und exakt, Teil B vollstaendig und klar.

```diagram
   Gesamtzeit 100 min
   +==========================+================================+
   |   Teil A  (max. 25 min)  |    Teil B  (mind. 75 min)      |
   |   hilfsmittelfrei        |    WTR/CAS + Formelsammlung    |
   +==========================+================================+
   |  Analysis + Geometrie    |  nur Analysis                  |
   |  Nullstellen, Ableitung  |  Argumentation + Sachkontext   |
   |  Vektorlaenge            |  Ansatz + Rechnung + Satz      |
   +==========================+================================+
    A: schnell und exakt      B: vollstaendig und klar
    Uebergabe spaetestens bei Minute 25
```

Klausur-Satz: `Teil A prueft Analysis und Geometrie ohne Hilfsmittel, Teil B nur Analysis mit Hilfsmitteln und verlangt vollstaendige Rechenwege.`

## Anekdote & Fun-Fact

Seit Taschenrechner und spaeter Computeralgebra-Systeme (CAS) in den Mathematikunterricht kamen, wird diskutiert, wie viel Handrechnung noch noetig ist. Ein CAS kann in Sekunden ableiten, Gleichungen loesen und Grenzwerte berechnen. Deshalb teilt die ZKE die Pruefung in einen hilfsmittelfreien Teil und einen Teil mit Hilfsmitteln.

Bezug zum Konzept: `Weil CAS die Rechnung uebernehmen, prueft Teil A gerade die Grundformeln im Kopf.`

## Schritt 4 — ausprobieren

BEISPIEL (geleitete Aufgabe mit Werkzeug):

[Werkzeug: formula]

AUFGABE (berechnen, AFB I/II): Teil-A-Stil, hilfsmittelfrei. a) Berechnen Sie die Nullstellen von $f(x) = x^3 - 4x$. b) Bestimmen Sie $f'(x)$. c) Gegeben sind $P(1, 2, 0)$ und $Q(4, 6, 0)$; berechnen Sie den Vektor $\overrightarrow{PQ}$ und seine Laenge.

HILFE:
1. Schritt 1: Bei a) $x$ ausklammern, dann den quadratischen Faktor mit der $pq$-Formel loesen.
2. Schritt 2: Bei b) jeden Summanden mit der Potenzregel ableiten.
3. Schritt 3: Bei c) Vektor als $Q - P$ bilden und die Laenge als Wurzel der Summe der Quadrate.

MUSTERLOESUNG: a) $x^3 - 4x = x(x^2 - 4) = x(x - 2)(x + 2)$, also $x_1 = 0$, $x_2 = 2$, $x_3 = -2$. b) Mit der Potenzregel gilt $f'(x) = 3x^2 - 4$. c) Der Vektor lautet $\overrightarrow{PQ} = Q - P = (4-1, 6-2, 0-0) = (3, 4, 0)$. Seine Laenge ist $|\overrightarrow{PQ}| = \sqrt{3^2 + 4^2 + 0^2} = \sqrt{25} = 5$. Alle drei Teilaufgaben sind ohne Hilfsmittel loesbar; die $pq$-Formel und die Betragsformel muessen auswendig sitzen.

Klausur-Satz: `Die Nullstellen, die Ableitung und die Vektorlaenge lassen sich im hilfsmittelfreien Teil mit Potenzregel, pq-Formel und Betragsformel berechnen.`

## Schritt 5 — ausprobieren

VERGLEICH (Wahl des Verfahrens, A gegen B):

VERGLEICH: Triff zuerst die Wahl des Verfahrens: (i) Teil-A-Aufgabe (hilfsmittelfrei: Handrechnung von Nullstellen, Ableitungen oder Vektoren, Ergebnis genuegt) oder (ii) Teil-B-Aufgabe (mit Hilfsmitteln: vollstaendige Kette mit Argumentation, Deutung und Antwortsatz) > dann bearbeiten.

AUFGABE A: Berechnen Sie die Ableitung von $f(x) = 5x^3 - 2x^2 + x - 7$ an der Stelle $x_0 = 1$.
AUFGABE B: Untersuchen Sie $g(x) = x^3 - 12x + 3$ rechnerisch auf lokale Extrempunkte und erlaeutern Sie die Bedeutung der Ergebnisse im Sachzusammenhang.

HILFE: Aufgabe A ist eine kurze Handrechnung ohne Kontext, daher Teil A. Aufgabe B verlangt vollstaendigen Loesungsweg mit Argumentation und Deutung, daher Teil B.

ANTWORT: A gehoert zu Teil A: $f'(x) = 15x^2 - 4x + 1$, also $f'(1) = 15 - 4 + 1 = 12$. B gehoert zu Teil B: $g'(x) = 3x^2 - 12 = 0$ ergibt $x = 2$ und $x = -2$; mit $g''(x) = 6x$ folgt $g''(-2) = -12 < 0$ (Hochpunkt) und $g''(2) = 12 > 0$ (Tiefpunkt). Wegen $g(-2) = 19$ und $g(2) = -13$ gilt $HP(-2, 19)$ und $TP(2, -13)$; im Sachzusammenhang markieren diese Stellen Verlaufsextrema mit maximalem beziehungsweise minimalem Bestand.

Klausur-Satz: `Teil-A-Aufgaben verlangen nur das exakte Ergebnis, Teil-B-Aufgaben einen vollstaendigen und gedeuteten Loesungsweg.`

## Schritt 6 — check

CHECK (drei Fragen mit Antworten):

FRAGE: Wie lange darf man hoechstens fuer Teil A der ZKE verwenden, und welche Hilfsmittel sind dort erlaubt? | ANTWORT: Hoechstens 25 Minuten, ohne Taschenrechner und ohne Formelsammlung.
FRAGE: Welche Hilfsmittel sind in Teil B zugelassen? | ANTWORT: WTR oder CAS sowie die offizielle Formelsammlung NRW.
FRAGE: Warum reicht in Teil B ein korrektes Ergebnis allein nicht aus? | ANTWORT: Weil die Darstellungsleistung bepunktet wird; der Loesungsweg muss nachvollziehbar in Saetzen dargestellt werden.

Klausur-Satz: `In Teil A zaehlt das exakte Ergebnis ohne Hilfsmittel, in Teil B der vollstaendig dargestellte Loesungsweg mit Hilfsmitteln.`

## Fehlvorstellung

(Kein Schritt; wird vom Parser uebersprungen.)

1. Fehlkonzept: In Teil B genuegt dank CAS das blosse Ergebnis ohne Loesungsweg.
   Korrektur-Satz: `In Teil B wird der nachvollziehbare Loesungsweg bepunktet, nicht nur das Endergebnis.`
2. Fehlkonzept: Die Formelsammlung ersetzt das Auswendiglernen der Grundformeln.
   Korrektur-Satz: `Teil A laeuft ohne Taschenrechner und ohne Formelsammlung, daher muessen die Grundformeln auswendig beherrscht werden.`

## Schritt 7 — szenario

ROLLE: Du bist Pruefungskoordinator und bereitest einen Jahrgang auf die ZKE vor.
SITUATION: Du sollst vor der Pruefung eine kurze Strategie-Empfehlung (circa 150 Woerter) formulieren, wie die 100 Minuten zwischen Teil A und Teil B aufgeteilt und wann die Hilfsmittel angefordert werden sollten. Begruende deine Empfehlung mit Blick auf Hilfsmittelregeln und Darstellungsleistung.
AUFGABE (begruenden, AFB III): Verfasse eine zusammenhaengende Darstellung von etwa 150 Woertern mit Regeln, Zeitaufteilung, Darstellungsleistung und Fazit.
RUBRIC (30 XP): Korrekte Wiedergabe der Zeit- und Hilfsmittelregeln (5 XP) | Begruendete Zeitaufteilung zwischen Teil A und Teil B (10 XP) | Hinweis auf die Bedeutung der Darstellungsleistung in Teil B (10 XP) | Fazit zur Pruefungsstrategie (5 XP).

## Schritt 8 — entdecken

TAKEAWAY (Kernbotschaft in einem Kasten):

Die ZKE vereint zwei Takte: Teil A hilfsmittelfrei in hoechstens 25 Minuten mit Handgenauigkeit und Formelgedaechtnis (Nullstellen, Ableitungen, Vektorlaengen), Teil B mit WTR oder CAS plus Formelsammlung in mindestens 75 Minuten mit vollstaendiger Kette aus Ansatz, Rechnung und Antwortsatz. Die Zeitmarke bei Minute 25 sichert den Werkzeugwechsel; die CAS-Anekdote erklaert die Teilung: Maschinen rechnen, Menschen begruenden.

Takeaway-Satz: `Teil A fehlerfrei und schnell ohne Hilfsmittel rechnen, Teil B vollstaendig und nachvollziehbar mit Hilfsmitteln argumentieren.`

REFLEXION (zwei Fragen):
1. Welcher Schritt fiel schwerer: das hilfsmittelfreie Rechnen in Teil A (Schritt 4) oder das Aufschreiben der vollstaendigen Argumentation fuer Teil B (Schritt 5)?
2. Beim naechsten Mal lege ich vor Beginn eine Zeitmarke fuer die Abgabe von Teil A fest und pruefe am Ende, ob jeder Teil-B-Schritt einen Antwortsatz besitzt.
