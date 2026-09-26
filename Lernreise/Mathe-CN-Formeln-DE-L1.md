---
fach: Mathe
thema: "CN-Formeln dreisprachig diktieren und rechnen"
level: 1
ziel: Klausur
xp: 100
operatoren: [darstellen, berechnen, erlaeutern]
klausurrelevant: true
datum: 2026-09-26
tags: [EF, Mathe, CN]
version: Lesson-v3
---

# Lernreise: CN-Formeln dreisprachig diktieren und rechnen (L1, Ziel Klausur)

<!-- Lesson v3: 8 Schritte plus Anekdote und Fehlvorstellung; Fehlvorstellung zwischen Schritt 6 und 7 (Parser-Skip); interaktives [Werkzeug: <id>]; Gating: check/szenario nicht bestanden = Weiter gesperrt; XP: entdecken 5 / ausprobieren 15 / check 20 / szenario 30 -->

## Schritt 1 — entdecken

ZIELE (drei messbare Ziele dieser Lektion):

1. Du kannst Potenzregel $(x^n)' = n x^{n-1}$, Vieta $x_1+x_2 = -b/a$, AM-GM fuer $a,b > 0$, $|\vec{a}|$ und Laplace $P =$ guenstig durch moeglich je mit Bedingung nennen.
2. Du kannst jede Merkregel in Bedingungssatz plus Anwendungssatz uebersetzen und $h'(1) = 12$ sowie Vieta $4$ und $5$ vorrechnen.
3. Du kannst ohne Hilfsmittel Ableitung, Nullstellenprobe, Betrag und $P(E)$ bestimmen und jede Formel nur unter ihrer Bedingung einsetzen (AFB I/II).

### Hook / Phaenomen

Im Jahr 1986 explodierte Challenger — ein O-Ring versagte ausserhalb seines Temperaturbereichs. Die Formel stimmte, die Bedingung nicht. In der Klausur passiert derselbe Fehler taeglich: AM-GM auf negative Zahlen, Vieta auf $x^3$, Potenzregel auf Produkte. Die Zahl stimmt scheinbar — doch die Bedingung fehlt. Wie schuetzt ein Bedingungssatz vor dem Challenger-Fehler der Mathematik?

### Fachbegriff & Definition

Fuer die EF gilt: **Jede Formel gilt nur unter ihrer Bedingung; die Potenzregel etwa nur fuer Potenzen, AM-GM nur fuer positive Zahlen**. Die **Merkregel waehlt die Formel, der Bedingungssatz sichert die Anwendbarkeit, der Anwendungssatz traegt die Punkte**. Der **Satz von Vieta prueft Nullstellen nur fuer $ax^2+bx+c = 0$ mit $a \ne 0$** ueber Summe und Produkt.

### Wirkungsgefuege / Modell

Der Mechanismus koppelt Wahl und Sicherung: $h(x) = 5x^3-2x^2+x$ liefert $h'(x) = 15x^2-4x+1$ nur weil jeder Summand eine Potenz ist — $h'(1) = 15-4+1 = 12$. Und $x^2-9x+20 = 0$ liefert per Vieta Summe $9$ und Produkt $20$ zu $4$ und $5$, weil quadratisch mit $a = 1$. Ausserhalb der Bedingung bricht die Kette: AM-GM mit $a < 0$ ist unzulaessig, Laplace ohne Gleichwahrscheinlichkeit falsch.

Schritt A: Merkregel nennen und Kandidatenformel waehlen.
Schritt B: Bedingung explizit pruefen und hinschreiben.
Schritt C: Anwenden und Ergebnis mit Satz sichern.

Klausur-Satz: `Ich kann die Kernformeln der EF darstellen und ihre Bedingungen nennen.`

## Schritt 2 — entdecken

PRETRAINING-Box (fuenf Kernbegriffe mit Definitionen):

### Hook / Phaenomen

Fuenf Formeln, fuenf Fallen: Der Exponent wird gesenkt, doch worauf? Die Summe stimmt, doch wofuer? Ohne Bedingung ist jede Formel ein Blindflug. Welche fuenf Paare aus Formel und Bedingung tragen durch Teil A ohne Formelsammlung?

### Fachbegriffe & Definitionen

- **Potenzregel:** $(x^n)' = n \cdot x^{n-1}$ nur fuer Potenzen; Exponent wird Faktor und minus eins.
- **Satz von Vieta:** $x_1+x_2 = -b/a$, $x_1 \cdot x_2 = c/a$ nur fuer $ax^2+bx+c = 0$ mit $a \ne 0$.
- **AM-GM-Ungleichung:** $(a+b)/2 \ge \sqrt{ab}$ nur fuer $a,b > 0$; Gleichheit genau bei $a = b$.
- **Betrag eines Vektors:** $|\vec{a}| = \sqrt{a_1^2+a_2^2+a_3^2}$ aus Koordinaten im Raum.
- **Laplace-Experiment:** $P(E) =$ guenstig durch moeglich nur bei gleich wahrscheinlichen Ergebnissen.

### Wirkungsgefuege / Modell

Die Kette lautet: Formel nennen, Bedingung pruefen, dann erst rechnen. Vieta an $x^2-9x+20$ ist erlaubt und liefert $4$ und $5$ in Sekunden; Vieta an $x^3$ ist verboten und kostet Punkte. AM-GM an $x + \frac{4}{x}$ mit $x > 0$ liefert Minimum $4$ bei $x = 2$; an $x < 0$ versagt sie. Die Bedingung ist kein Anhaengsel, sondern die Haelfte der Leistung.

Klausur-Satz: `Jede Formel gilt nur unter ihrer Bedingung; die Potenzregel etwa nur fuer Potenzen, AM-GM nur fuer positive Zahlen.`

## Schritt 3 — entdecken

TIEFEN-KONZEPT (ein Konzept mit visuellem Schema):

### Hook / Phaenomen

Zwei Schueler schreiben $(x^n)' = n x^{n-1}$ — einer erhaelt den Punkt, einer nicht. Der Unterschied steht im Nebensatz: nur fuer Potenzen. In der Korrektur zaehlt nicht die Formel, sondern der Bedingungssatz davor und der Anwendungssatz danach. Wie wird aus einer Merkregel ein klausurfester Dreischritt — und warum rettet er auch Vieta und AM-GM?

### Fachbegriff & Definition

**Jede Formel braucht Merkregel plus Bedingungssatz plus Anwendungssatz: Die Merkregel steuert Tempo und Richtung, der Bedingungssatz sichert die Punkte**. Beispiel Potenzregel: **$Ich bilde die Ableitung mit der Potenzregel $(x^n)' = n \cdot x^{n-1}$, weil jeder Summand eine Potenz ist$**. Beispiel Vieta: **$Nach dem Satz von Vieta pruefe ich die Nullstellen mit Summe und Produkt, weil quadratisch mit $a \ne 0$ vorliegt$**.

### Wirkungsgefuege / Modell

Der Tiefenweg uebersetzt Tempo in Punkte: Schmierpapier mit Merkregel $Exponent senken$ zu $h'(x) = 15x^2-4x+1$; Reinschrift mit $weil jeder Summand eine Potenz ist$ plus $h'(1) = 12$. Ebenso Vieta $Summe und Produkt$ zu $9$ und $20$ plus $weil $a = 1 \ne 0$$ zu $4$ und $5$. Ohne den weil-Satz bleibt die Rechnung eine Vermutung — mit ihm wird sie ein Beweis im AFB-I-Takt.

Schritt A: Merkregel aufs Schmierpapier und Kandidat rechnen.
Schritt B: Bedingung als weil-Satz in die Reinschrift.
Schritt C: Anwendungssatz mit Ergebnis und Einheit schliessen.

```diagram
   Merkregel          Bedingung (DE)              Anwendungssatz (DE)
   =================  ==========================  ==========================
   Exponent senken    nur fuer Potenzen           Potenzregel (x^n)'=n*x^(n-1)
   Summe und Produkt  nur ax^2+bx+c=0, a!=0       Satz von Vieta > 4 und 5
   Summe fest         nur a,b > 0                 AM-GM mit Gleichheit a=b
   Endpunkt minus     nur zwei Punkte             Vektor PQ = Q - P, Betrag per Wurzel
     Startpunkt
   guenstig durch     nur gleich wahrscheinlich   P(E) = guenstig / moeglich
     moeglich
   =================  ==========================  ==========================
   Merkregel waehlt   Bedingung sichert           Anwendungssatz punktet
   Beispiel: h'(1)=12 mit weil-Satz, Vieta 9/20 zu 4/5
```

Klausur-Satz: `Ich verbinde eine Merkregel mit dem deutschen Bedingungssatz, um die Formel klausurtauglich anzuwenden.`

## Anekdote & Fun-Fact

Das Wort Algebra stammt aus dem Arabischen $al\text{-}dschabr$ und bedeutet etwa das Wiederherstellen. Es geht auf ein Lehrbuch des Gelehrten al-Chwarizmi zurueck, der im 9. Jahrhundert in Bagdad wirkte; aus seinem Namen wurde spaeter das Wort Algorithmus. Formeln wie die $pq$-Formel oder der Satz von Vieta sind seitdem durch viele Sprachen und Kulturen gewandert.

Bezug zum Konzept: `Kernformeln sind kulturuebergreifend; die systematische Arbeit mit Merkregel und Bedingungssatz setzt ihre Wanderung durch die Sprachen fort.`

## Schritt 4 — ausprobieren

BEISPIEL (geleitete Aufgabe mit Werkzeug):

[Werkzeug: formula]

AUFGABE (berechnen, AFB II): Gegeben ist $h(x) = 5x^3 - 2x^2 + x - 8$. a) Bestimmen Sie $h'(x)$ und $h'(1)$. b) Pruefen Sie mit dem Satz von Vieta, ob $4$ und $5$ die Loesungen von $x^2 - 9x + 20 = 0$ sind.

HILFE:
1. Schritt 1: Bei a) jeden Summanden mit der Potenzregel ableiten und zusammenfassen.
2. Schritt 2: $x_0 = 1$ in $h'(x)$ einsetzen.
3. Schritt 3: Bei b) Summe und Produkt der vermuteten Loesungen mit $-b/a$ und $c/a$ vergleichen.

MUSTERLOESUNG: a) Gliedweise gilt $5x^3 \to 15x^2$, $-2x^2 \to -4x$, $x \to 1$, $-8 \to 0$. Also $h'(x) = 15x^2 - 4x + 1$ und $h'(1) = 15 - 4 + 1 = 12$. b) Fuer $x^2 - 9x + 20 = 0$ gilt $a = 1$, $b = -9$, $c = 20$, also $x_1 + x_2 = -b/a = 9$ und $x_1 \cdot x_2 = c/a = 20$. Die Werte $4$ und $5$ erfuellen $4 + 5 = 9$ und $4 \cdot 5 = 20$; beide Bedingungen stimmen, also sind $4$ und $5$ die Loesungen.

Klausur-Satz: `Mit der Potenzregel folgt h'(x) = 15x^2 - 4x + 1 und h'(1) = 12; nach dem Satz von Vieta bestaetigen Summe 9 und Produkt 20 die Loesungen 4 und 5.`

## Schritt 5 — ausprobieren

VERGLEICH (Wahl des Verfahrens, A gegen B):

VERGLEICH: Triff zuerst die Wahl des Verfahrens: (i) Satz von Vieta (gegebene Nullstellen ueber Summe und Produkt pruefen) oder (ii) AM-GM-Verfahren (Minimum einer Summe positiver Terme mit festem Produkt bestimmen) > dann loesen.

AUFGABE A: Sind $2$ und $7$ die Loesungen der Gleichung $x^2 - 9x + 14 = 0$?
AUFGABE B: Fuer $x > 0$ ist $A(x) = x + 25/x$ gegeben. Bestimmen Sie den minimalen Wert von $A$.

HILFE: Aufgabe A fragt, ob gegebene Zahlen die Gleichung loesen, daher Verfahren (i) mit Vieta. Aufgabe B fragt nach dem Minimum einer Summe positiver Terme, daher Verfahren (ii) mit AM-GM.

ANTWORT: A erfordert Verfahren (i): Hier gilt $a = 1$, $b = -9$, $c = 14$, also Summe $9$ und Produkt $14$; wegen $2 + 7 = 9$ und $2 \cdot 7 = 14$ sind $2$ und $7$ tatsaechlich die Loesungen. B erfordert Verfahren (ii): Da $x > 0$ und $25/x > 0$ gilt, folgt mit AM-GM $A(x) \ge 2 \cdot \sqrt{x \cdot 25/x} = 2 \cdot 5 = 10$; Gleichheit gilt fuer $x = 25/x$, also $x = 5$, und der minimale Wert ist $A(5) = 10$.

Klausur-Satz: `Vieta prueft vorhandene Loesungen ueber Summe und Produkt, AM-GM schaetzt eine Summe positiver Terme nach unten ab.`

## Schritt 6 — check

CHECK (drei Fragen mit Antworten):

FRAGE: Wie lauten Summe und Produkt der Loesungen von $ax^2 + bx + c = 0$ nach Vieta? | ANTWORT: $x_1 + x_2 = -b/a$ und $x_1 \cdot x_2 = c/a$ (mit $a \ne 0$).
FRAGE: Unter welcher Bedingung gilt die AM-GM-Ungleichung, und wann herrscht Gleichheit? | ANTWORT: Nur fuer positive Zahlen $a, b > 0$; Gleichheit gilt genau dann, wenn $a = b$ ist.
FRAGE: Wie berechnet man die Laenge des Vektors $\vec{a} = (a_1, a_2, a_3)$? | ANTWORT: $|\vec{a}| = \sqrt{a_1^2 + a_2^2 + a_3^2}$, also die Wurzel der Summe der Quadrate.

Klausur-Satz: `Nach Vieta gilt fuer ax^2 + bx + c = 0 die Beziehung x1 + x2 = -b/a und x1 * x2 = c/a.`

## Fehlvorstellung

(Kein Schritt; wird vom Parser uebersprungen.)

1. Fehlkonzept: Die AM-GM-Ungleichung gilt fuer beliebige Zahlen und kann ohne Pruefung angewandt werden.
   Korrektur-Satz: `Die AM-GM-Ungleichung gilt nur fuer positive Zahlen; die Positivitaet muss vor der Abschaetzung nachgewiesen werden.`
2. Fehlkonzept: Die Vieta-Beziehungen gelten in derselben Form auch fuer Gleichungen dritten Grades.
   Korrektur-Satz: `Der Satz von Vieta in der Form x1 + x2 = -b/a gilt nur fuer quadratische Gleichungen.`

## Schritt 7 — szenario

ROLLE: Du bist Tutor und haeltst eine kurze Formeldiktat-Runde im EF-Kurs.
SITUATION: Ein Mitschueler kennt die Merkregeln, kann sie aber nicht in deutsche Klausursaetze uebersetzen und schreibt im Test nur Ergebnisse ohne Bedingung. Erklaere ihm in einer zusammenhaengenden Darstellung (circa 150 Woerter) an zwei Beispielen (Potenzregel und AM-GM), wie man eine Formel mit Bedingungssatz klausurtauglich aufschreibt.
AUFGABE (erlaeutern, AFB III): Verfasse eine zusammenhaengende Darstellung von etwa 150 Woertern mit Prinzip, zwei Beispielen und Fazit.
RUBRIC (30 XP): Erklaerung des Drei-Bausteine-Prinzips (Merkregel, Bedingung, Anwendung) (5 XP) | Korrektes Beispiel zur Potenzregel mit Anwendungssatz (10 XP) | Korrektes Beispiel zu AM-GM mit Positivitaetsbedingung und Gleichheitsfall (10 XP) | Fazit zum Verhaeltnis von Heuristik und Beweispflicht (5 XP).

## Schritt 8 — entdecken

TAKEAWAY (Kernbotschaft in einem Kasten):

Jede Formel braucht drei Bausteine: Die Merkregel sichert Tempo und Auswahl, der Bedingungssatz sichert die Anwendbarkeit, der Anwendungssatz sichert die Punkte. Die Potenzregel verlangt Exponent minus eins, Vieta gilt nur fuer quadratische Gleichungen, AM-GM verlangt zuerst den Nachweis positiver Terme und die Gleichheitsbedingung, die Vektorlaenge ist die Wurzel der Quadratsumme, Laplace teilt guenstig durch moeglich.

Takeaway-Satz: `Kernformeln werden mit ihrer Bedingung gelernt; die Merkregel wird erst durch den deutschen Bedingungssatz klausurtauglich.`

REFLEXION (zwei Fragen):
1. Welcher Schritt fiel schwerer: das Diktat der Formeln mit Bedingungen (Schritt 2) oder die Zuordnung der passenden Formel im Vergleich (Schritt 5)?
2. Beim naechsten Mal notiere ich zu jeder Formel sofort ihre Bedingung, bevor ich sie anwende.
