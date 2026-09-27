---
fach: SoWi
thema: "Wirtschaftskreislauf und BIP-Kritik"
level: 1
ziel: Klausur
xp: 100
operatoren: [analysieren, beurteilen]
klausurrelevant: true
datum: 2026-09-26
tags: [EF, SoWi, Wirtschaft]
version: Lesson-v3
---

# Lernreise: Wirtschaftskreislauf und BIP-Kritik (L1, Ziel Klausur)

<!-- Lesson-v3: 8 Schritte plus Anekdote und Fehlvorstellung; Fehlvorstellung zwischen Schritt 6 und 7 (Parser-Skip); interaktives [Werkzeug: <id>]; Gating: check/szenario nicht bestanden = Weiter gesperrt; XP: entdecken 5 / ausprobieren 15 / check 20 / szenario 30 -->

## Schritt 1 — entdecken: Ziele & Phänomen-Einstieg

ZIELE (drei messbare Ziele dieser Lektion):

1. Du kannst **Wirtschaftskreislauf** und **BIP** in je einem Satz definieren und fuenf Sektoren korrekt benennen.
2. Du kannst $Y = C + I + G + Ex - Im$ als Verwendung darstellen und $g = Wachstum$ berechnen.
3. Du kannst mit dem Kriterium **Wohlfahrt** ein Urteil zu BIP und Gruenem BIP formulieren und mit einem Klausur-Satz schliessen (AFB II/III).

### Hook / Phaenomen

Stell dir vor, du suchst in der Stadt eine Wohnung und siehst ein Schild mit Miete 11 Euro pro Quadratmeter, doch der Stadtrat beschliesst einen Deckel bei 8 Euro und verspricht billiges Wohnen fuer alle. Alle freuen sich zuerst ueber die niedrige Miete, aber nach wenigen Monaten verschwinden viele Angebote, die Schlangen bei jeder Besichtigung werden laenger und ein Schattenmarkt mit Abstandszahlungen und Gefaelligkeiten entsteht. Gleichzeitig fordert die Gewerkschaft 15 Euro Mindestlohn, weil der Lohn zum Leben reichen muss, waehrend kleine Betriebe warnen, dass sie bei diesem Lohn weniger Personal einstellen und ihre Preise erhoehen muessen. Beide Faelle zeigen denselben Mechanismus aus Signal und Anpassung: Ein staatlich fixierter Preis ersetzt das freie Signal aus Angebot und Nachfrage, die Mengen reagieren mit Ausweichen oder Verknappung, und am Ende muss jedes Urteil zwischen Effizienz und sozialem Ziel sorgfaeltig abgewogen werden.


Ausgangslage aus der Vorlage: Sturm zerstoert Wald, BIP steigt durch Repairatur: Zählt Zerstoerung als Fortschritt? Geld fliesst, Gueter fliessen, Natur schweigt. Misst Wachstum Wohlstand oder nur Umsatz?

### Fachbegriff & Definition

Der **erweiterte Wirtschaftskreislauf** zeigt Geld und Gueter zwischen **Haushalten, Unternehmen, Staat, Banken und Ausland**. Das **Bruttoinlandsprodukt** misst nur monetarisierte Produktion im Inland als $Y$ pro Jahr. **Geldstrom** und **Gueterstrom** laufen entgegengesetzt zwischen Akteuren. Kurz: Kreis sehen, Ausschnitt messen, Rest bedenken.

### Wirkungsgefuege / Modell

Der Mechanismus laeuft in drei Stufen: **Tausch, Erweiterung, Blindheit**. Erstens tauschen $Haushalt = Arbeit$ gegen $Lohn$ und $Firma = Gut$ gegen $Preis$. Zweitens ergaenzen $Staat = Steuer + Transfer$, $Bank = Kredit + Zins$ und $Ausland = Ex - Im$ den Kern. Drittens blendet $BIP = Markt$ Umwelt und Sorge mit $Wohlfahrt > BIP$ aus. Faellt Korrektur aus, subventioniert Natur mit $Kosten = 0$ das Wachstum.

Klausur-Satz: `Der erweiterte Wirtschaftskreislauf zeigt die Geld- und Gueterstroeme zwischen fuenf Sektoren, das BIP misst nur deren monetarisierten Ausschnitt.`

## Schritt 2 — entdecken: Fachbegriffe & Pre-Training

PRETRAINING-Box (fuenf Kernbegriffe mit Definitionen):

### Hook / Phaenomen

Wer zahlt, wer produziert, wer finanziert? Ohne Sektoren bleibt Kreis abstrakt. Diese fuenf Begriffe geben dir Strom und Massstab.

### Fachbegriffe & Definitionen

- **Haushalte:** Die Anbieter mit $Faktor = Arbeit$ gegen $Einkommen = Lohn$. Sie nutzen $Gebrauch = Konsum + Sparen$.
- **Unternehmen:** Die Produzenten mit $Output = Gut$ gegen $Ertrag = Preis$. Sie tragen $Ziel = Gewinn$.
- **Staat:** Der Umverteiler mit $Mittel = Steuer$ fuer $Leistung = Transfer + Gut$. Er sichert $Ordnung = Recht$.
- **Banken:** Die Finanziers mit $Kredit = GeldHeute$ gegen $Zins = Preis$. Sie ermoeglichen $Invest = Morgen$.
- **Ausland:** Der Partner mit $Saldo = Ex - Im$ als Aussenbeitrag. Er oeffnet $Markt = Welt$.

### Wirkungsgefuege / Modell

Die Begriffe greifen ineinander: **Haushalte** und **Unternehmen** bilden mit $Tausch = Lohn + Gut$ den Kern. **Staat** und **Banken** stabilisieren mit $Transfer + Kredit$ den Fluss. **Ausland** erweitert mit $Ex - Im$ den Raum. Wer in der Klausur zeichnet, muss deshalb immer fragen: Wo fliesst Geld, wo fliesst Gut, wer fehlt?

Punkte-Hinweis: Nenne $Gleichgewichtspreis$ mit $p_N(q) = p_A(q)$ und beziffere $Ueberhang$ mit $q_A - q_N$; erst die Zahl plus Deutung am Kriterium gibt volle Punkte.

Klausur-Satz: `Geldstroeme und Gueterstroeme laufen im Kreislauf in entgegengesetzter Richtung zwischen Haushalten und Unternehmen.`

## Schritt 3 — entdecken: Kernkonzept & Wirkungsmodell

TIEFEN-KONZEPT (ein Konzept mit visuellem Schema):

### Hook / Phaenomen

Sturm zerstoert, BIP steigt — gute Konjunktur oder blinde Zahl? Miete gegen Lohn, Wachstum gegen Wohlfahrt — was zaehlt der Kreislauf, was verschweigt er?

### Spiel-Aufgabe mit [Werkzeug: markt-sim]

Oeffne [Werkzeug: markt-sim]. Erhoehe im Kreislauf-Modul die Staatsausgaben $G$ um 10 Einheiten und beobachte $Y = C + I + G + Ex - Im$. Ziehe danach den Preis-Regler fuer Umweltkosten von $0$ auf $5$ und sieh, wie $p_N(q) = p_A(q)$ ehrlicher wird, aber $q_A - q_N$ schwankt. Vergleiche Marktleistung gegen Wohlfahrt.

### Aha-Moment & Gesetz

Aha-Moment: Tausch — Messung — Korrektur. Erstens tauschen Haushalte und Unternehmen Gueter gegen Geld, Staat und Banken ergaenzen um $G$ und $I$. Zweitens misst $Y = C + I + G + Ex - Im$ nur Umsatz. Drittens korrigiert $Wohl = BIP - Schaden + Unbezahlt$ nach Kriterium Wohlfahrt statt Umsatz. Gesetz: $Wachstum \neq Wohlfahrt$, sobald $Blind = Umwelt + Sorge + Verteilung$ gilt.

```diagram
  Kreislauf [Haushalt + Firma + Staat + Bank + Ausland]
  Kreislauf -> Messung [$Y = C + I + G + Ex - Im$ + $p_N(q) = p_A(q)$]
  Messung -> Luecke [$q_A - q_N$ + $Gini$ blind + Umwelt $= 0$]
  Luecke -> Urteil [Wohlfahrt mit Mass]
```

Kausalkette: Fixpreis ungleich $p_N(q) = p_A(q)$ — Mengen reagieren mit $q_A - q_N$ — Deutung am Kriterium Effizienz gegen Sozialziel; Abgrenzung zu $Gini$ und $U = \sum(Lust - Leid)$ steht vor jeder Rechnung.

Klausur-Satz: `Im erweiterten Kreislauf ergaenzen Staat, Banken und Ausland den Tausch zwischen Haushalten und Unternehmen um Umverteilung, Finanzierung und Aussenhandel.`

## Anekdote & Fun-Fact

Nach einem schweren Sturm steigt das BIP oft an, weil Reparaturen, Ersatzkaeufe und Bauleistungen als Umsatz gezaehlt werden. Der zerstoerte Wald, die verlorene Freizeit und die seelische Belastung tauchen dagegen nirgends als Minus auf. Oekonomen nennen das die Blindheit des BIP fuer Wohlfahrt. Die gruene Rechnung fordert daher: Wer die Umwelt nutzt, soll die Kosten in den Preisen sichtbar machen, sonst subventioniert die Natur unfreiwillig das Wachstum

Bezug zum Konzept: `Das Beispiel zeigt, wie aus Beobachtung ein pruefbares Verfahren mit $x_1$ und $x_2$ entsteht.`

## Schritt 4 — ausprobieren: Interaktive Praxis & Markt-Labor

BEISPIEL (geleitete Aufgabe mit Werkzeug):

[Werkzeug: markt-sim]

Ziehe im Tool den Mindestpreis-Regler von $p_G$ nach oben und beobachte live, wie $q_A - q_N$ als Ueberhang waechst; ziehe danach den Hoechstpreis-Regler von $p_G$ nach unten und notiere Mangel, Schlange und Schattenmarkt.

AUFGABE Spiel-Raetsel (AFB II): Baue im Tool den erweiterten Kreislauf mit fuenf Sektoren. Erhoehe $G$ schrittweise, notiere $Y$, und aktiviere dann den Umweltkosten-Regler. Erklaere, warum $Y$ steigt, waehrend die Wohlfahrt sinken kann.

HILFE:
1. Schritt 1: Markiere Geldstrom und Gueterstrom mit Staat, Banken, Ausland. 2. Schritt 2: Veraendere $G$ und lies $Y = C + I + G + Ex - Im$. 3. Schritt 3: Beziehe $Gini$ und Umwelt ein, deute am Kriterium Wohlfahrt und formuliere den Klausur-Satz.

MUSTERLOESUNG: Geld fliesst im Uhrzeigersinn, Gueter entgegengesetzt; Staat ueber Steuern und Transfers, Banken ueber Sparen und Investieren, Ausland ueber $Ex$ und $Im$. $Y$ misst nur Marktleistung; unbezahlte Arbeit, Umweltkosten und Verteilung mit $Gini$ bleiben aussen vor — daher kein automatischer Wohlfahrts-Schluss.

Klausur-Satz: `Entstehung, Verwendung und Verteilung berechnen dasselbe BIP aus Produktions-, Ausgaben- und Einkommenssicht.`

## Schritt 5 — ausprobieren: Verfahrensvergleich & Abgrenzung

VERGLEICH (Wahl des Verfahrens, A gegen B):

VERGLEICH: Triff zuerst die Wahl des Verfahrens -- (i) Kreislauf-Verfahren (Sektoren, Geld- und Gueterstroeme) oder (ii) BIP-Kritik-Verfahren (Wachstum vs. Wohlfahrt, $BIP$ und $HDI$) -- und loese dann die Aufgabe.

AUFGABE A: Ein Fall verlangt nur eine qualitative Rangfolge ohne Zahlenwert.
AUFGABE B: Ein Fall verlangt einen belegten Vergleich mit Kennzahl und Begruendung.

HILFE: Aufgabe A nennt kein Berechnungsziel, daher Verfahren (i). Aufgabe B verlangt eine Kennzahl wie $Gini$ oder $p_N(q) = p_A(q)$, daher Verfahren (ii). Die Wahl des Verfahrens steht vor jeder Rechnung.

ANTWORT: Aufgabe A erfordert Verfahren (i), weil eine Rangfolge aus der Form genuegt. Aufgabe B erfordert Verfahren (ii), weil erst die Kennzahl mit $d = x_2 - x_1$ ein begruendetes Urteil erlaubt.

Klausur-Satz: `Wachstum des BIP ist ohne Verteilungs-, Umwelt- und Sozialindikatoren kein Beweis fuer mehr Wohlfahrt.`

## Schritt 6 — check: Verständnisprüfung

CHECK (drei Fragen mit Antworten):

FRAGE: Nennen Sie die fuenf Sektoren und die zwei Stroeme mit Richtung. | ANTWORT: Haushalte, Unternehmen, Staat, Banken, Ausland; Geldstrom im Uhrzeigersinn, Gueterstrom entgegengesetzt.
FRAGE: Nennen Sie die drei BIP-Berechnungsarten in einem Satz. | ANTWORT: Entstehung summiert Wertschoepfung, Verwendung summiert Konsum plus Investitionen plus Staat plus Aussenbeitrag, Verteilung summiert Einkommen.
FRAGE: Nennen Sie vier Kritikpunkte am BIP plus Alternative. | ANTWORT: unbezahlte Arbeit fehlt, Umweltschaeden ohne Abzug, Verteilung blind, schaedliche Umsaetze als Plus; Korrektur durch NWI und HDI.

Klausur-Satz: `Das BIP misst Marktwerte eines Jahres, nicht Nachhaltigkeit oder Gerechtigkeit.`

## Fehlvorstellung

(Kein Schritt; wird vom Parser uebersprungen.)

1. Fehlkonzept: Die beiden Verfahren seien austauschbar und fuehrten stets zum gleichen Ergebnis.
   Korrektur-Satz: `Verfahren (i) liefert nur eine Rangfolge, Verfahren (ii) liefert eine Kennzahl; beide duerfen nicht gleichgesetzt werden.`

2. Fehlkonzept: Ein einzelner Wert wie $Gini$ oder $p_G$ spreche bereits fuer sich und brauche kein Kriterium.
   Korrektur-Satz: `Erst die Deutung der Kennzahl am Kriterium mit $d = x_2 - x_1$ ergibt ein klausurtaugliches Urteil.`

## Schritt 7 — szenario: Klausurtransfer & Rubric

ROLLE: Du bist EF-Schuelerin und schreibst einen Leserbrief an die Lokalzeitung.
SITUATION: Die Stadt feiert ein gestiegenes regionales BIP nach einem Sturmjahr mit viel Wiederaufbau, waehrend Parks zerstoert und viele ehrenamtliche Helfer erschoepft sind. Beurteilen Sie in einer zusammenhaengenden Darstellung (ca. 150 Woerter) die Lage mit dem erweiterten Kreislauf, der BIP-Kritik in vier Punkten und NWI/HDI.
RUBRIC (30 XP): Kreislauf mit Sektorbezug korrekt (5 XP) | Drei Berechnungsarten oder Formel C + I + G + (Ex - Im) genannt (5 XP) | Vier Kritikpunkte vollstaendig (10 XP) | NWI/HDI plus begruendetes Urteil Wachstum vs. Wohlfahrt (10 XP)
SITUATION: Die Stadt feiert ein gestiegenes regionales BIP nach einem Sturmjahr mit viel Wiederaufbau, waehrend Parks zerstoert und viele ehrenamtliche Helfer erschoepft sind. Beurteilen Sie in einer zusammenhaengenden Darstellung (ca. 150 Woerter) die Lage mit dem erweiterten Kreislauf, der BIP-Kritik in vier Punkten und NWI/HDI.
RUBRIC (30 XP): Kreislauf mit Sektorbezug korrekt (5 XP) | Drei Berechnungsarten oder Formel C + I + G + (Ex - Im) genannt (5 XP) | Vier Kritikpunkte vollstaendig (10 XP) | NWI/HDI plus begruendetes Urteil Wachstum vs. Wohlfahrt (10 XP)
AUFGABE (AFB III): Verfasse eine zusammenhaengende Darstellung von etwa 150 Woertern mit Kriterium, Anwendung und Urteil.
RUBRIC (30 XP): These mit Kriterium (5 XP) | Rekonstruktion mit $x_1$, $x_2$ (10 XP) | Anwendung mit $d = x_2 - x_1$ (10 XP) | Fazit mit Fachbegriffen (5 XP).

## Schritt 8 — entdecken: Takeaway & Metakognitive Reflexion

TAKEAWAY (Kernbotschaft in einem Kasten):

Takeaway-Satz: `Begriff schaerfen, Wahl des Verfahrens treffen, Kennzahl mit $d = x_2 - x_1$ deuten und kriteriengeleitet urteilen.`

REFLEXION (zwei Fragen):
1. Welcher Schritt fiel schwerer -- die Anwendung mit $x_1$ und $x_2$ (Schritt 4) oder die Wahl des Verfahrens (Schritt 5)?
2. Beim naechsten Mal pruefe ich zuerst das Aufgabenziel und waehle danach Verfahren (i) oder (ii).
