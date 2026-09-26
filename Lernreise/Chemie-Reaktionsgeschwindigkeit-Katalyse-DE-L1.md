---
fach: Chemie
thema: "Reaktionsgeschwindigkeit und Katalyse"
level: 1
ziel: Klausur
xp: 100
operatoren: [beschreiben, analysieren]
klausurrelevant: true
datum: 2026-09-26
tags: [EF, Chemie, Kinetik]
version: Lesson-v3
---

# Lernreise: Reaktionsgeschwindigkeit und Katalyse (L1, Ziel Klausur)

<!-- Lesson v3 9-Schritt-Architektur: Schritt 1 bis 8 feste Struktur; Fehlvorstellung zwischen Schritt 6 und 7 (Parser ueberspringt, zaehlt nicht); interaktive [Werkzeug: <id>]; Gating: check/szenario nicht bestanden = Weiter deaktiviert; XP: entdecken 5 / ausprobieren 15 / check 20 / szenario 30 -->

## Schritt 1 — entdecken

ZIELE (diese Lektion in 15 Minuten: danach kannst du):

1. Mit $v = \Delta c / \Delta t$ die Reaktionsgeschwindigkeit als Konzentrationsaenderung pro Zeit erklaeren und aus $c$-$t$-Daten die mittlere Geschwindigkeit berechnen.
2. Drei Bedingungen wirksamer Zusammenstoesse (genug Energie, richtige Orientierung, wirksamer Kontakt) nennen und den Einfluss von Konzentration, Temperatur und Oberflaeche deuten.
3. Die Katalysatorwirkung beschreiben — neuer Weg mit niedrigerer Aktivierungsenergie bei unveraendertem Katalysator — und die Abgasreaktion $2CO + 2NO \xrightarrow{Kat} 2CO_2 + N_2$ auf AFB-II-Niveau analysieren.

Klausur-Satz: `Die Reaktionsgeschwindigkeit v = Δc/Δt beschreibt die Konzentrationsaenderung pro Zeit und wird durch die Haeufigkeit wirksamer Zusammenstoesse bestimmt.`

## Schritt 2 — entdecken

PRETRAINING (Kernbegriffe, erst lesen, dann abdecken und aktiv wiedergeben):

- Reaktionsgeschwindigkeit $v$: Konzentrationsaenderung pro Zeit, $v = \Delta c / \Delta t$, Einheit z. B. $\mathrm{mol/(L \cdot s)}$.
- Wirksamer Zusammenstoss: Nur der Stoss mit genug Energie, richtiger Orientierung und wirksamem Kontakt setzt um.
- Aktivierungsenergie $E_a$: Die Energieschwelle vor dem Umsatz; je niedriger, desto groesser der wirksame Anteil.
- Katalysator: Ein Stoff, der einen Weg mit niedrigerer $E_a$ eroeffnet und dabei in Masse und chemischer Art unveraendert bleibt.
- Abgaskatalyse: Auf Platin und Rhodium werden giftiges $CO$ und $NO$ zu $CO_2$ und $N_2$ umgesetzt.

Klausur-Satz: `Ein Katalysator eroeffnet einen Reaktionsweg mit niedrigerer Aktivierungsenergie und bleibt dabei selbst unveraendert.`

## Schritt 3 — entdecken

ENTDECKEN (ein Konzept plus Textdiagramm):

Die Geschwindigkeit zaehlt wirksame Zusammenstoesse. Teilchen stossen staendig zusammen, doch nur drei erfuellte Bedingungen zaehlen: genug Energie zum Oeffnen alter Bindungen, richtige Orientierung zur Treffstelle, ausreichender Kontakt. Mehr Konzentration heisst mehr Teilchen pro Volumen, Erwaermen heisst groesserer energiegenuegender Anteil, groessere Feststoffoberflaeche heisst mehr Begegnungen — alle drei erhoehen die Haeufigkeit wirksamer Stoesse. Der Katalysator waehlt einen anderen Weg: Er erhoeht nicht die Stosszahl, sondern oeffnet einen Pfad mit niedrigerer Aktivierungsenergie, sodass ploetzlich viele bisher zu schwache Stoesse genuegen. Im Energiebild erscheint ein Doppelberg: Ohne Katalysator ein hoher Gipfel, mit Katalysator zwei flache Huegel bei gleichen Start- und Zielenergien — daher bleibt die Gleichgewichtslage gleich, nur die Zeit bis dahin schrumpft.

```diagram
   Energie ^
           |      ____  ohne Kat (hoch)
           |     /    \
           |    /      \            __ mit Kat (Peak 1)
           |   /        \          /  \    __ (Peak 2)
           |  /          \        /    \  /  \
           +-/------------\------/------\/----\----> Reaktionsweg
            Edukte          \    Kat-Weg  \   Produkte
                             Ea(ohne) > Ea(mit)
   Legende: Ea = Huerde, Kat = neuer Weg mit Doppelpeak
   Formel: v = Δc/Δt, Beispiel: 2CO + 2NO --Kat--> 2CO2 + N2
```

Klausur-Satz: `Der Katalysator senkt die Aktivierungsenergie ueber einen neuen Weg mit Doppelpeak, ohne Anfangs- und Endenergie zu veraendern.`

## Anekdote & Fun-Fact

**Anekdote / Fun-Fact (DE)**: Ein Autoabgaskatalysator enthaelt nur wenige Gramm Platin und Rhodium, reinigt aber ueber Jahre tausende Kubikmeter Abgas. Die Edelmetalle werden dabei nicht verbraucht, sondern reichen die Schadstoffe wie auf einem Fliessband weiter: CO und NO haften an, treffen sich in guenstiger Lage und verlassen das Blech als harmloses CO2 und N2. Darum darf bleihaltiges Benzin nie in ein Kat-Auto gelangen, weil Blei die kostbare Oberflaeche dauerhaft vergiftet.

**Bezug zum Konzept**: `Der Katalysator stellt Haftplaetze bereit, senkt die Huerde und verlaesst die Reaktion unveraendert.`

## Schritt 4 — ausprobieren

BEISPIEL (Musteraufgabe mit Loesungsweg):

[Werkzeug: formula]

AUFGABE (analysieren, AFB II): In einem Abgasversuch sinkt die CO-Konzentration in 20 s von 0.80 mol/L auf 0.40 mol/L; die Reaktion lautet 2CO + 2NO --Kat--> 2CO2 + N2. Berechnen Sie die mittlere Reaktionsgeschwindigkeit v und beschreiben Sie, wie der Katalysator wirkt, ohne die Lage des Gleichgewichts zu veraendern.

HILFE:
1. Schritt 1: Δc aus Anfangs- und Endkonzentration bilden, Δt ablesen, dann v = Δc/Δt einsetzen.
2. Schritt 2: Drei Bedingungen wirksamer Zusammenstoesse nennen und am Beispiel CO plus NO erklaeren.
3. Schritt 3: Katalysator als neuen Weg mit niedrigerer Aktivierungsenergie deuten und betonen, dass Edukt- und Produktenergie gleich bleiben.

MUSTERLOESUNG: Es gilt Δc = 0.80 mol/L minus 0.40 mol/L = 0.40 mol/L und Δt = 20 s, also v = 0.40/20 = 0.020 mol/(L s). Dieser Wert beschreibt die mittlere Abnahme von CO. Auf Teilchenebene muessen CO und NO mit genug Energie in richtiger Orientierung auf der Kat-Oberflaeche zusammentreffen; nur solche Stoesse sind wirksam. Der Katalysator bietet Haftplaetze und einen neuen Weg mit niedrigerer Aktivierungsenergie im Doppelpeak-Bild, sodass bei gleicher Temperatur mehr Stoesse die Huerde nehmen. Da Anfangs- und Endenergie unveraendert bleiben, aendert sich die Lage des Gleichgewichts nicht, nur die Zeit bis zum Erreichen wird kuerzer.

Klausur-Satz: `Mit v = Δc/Δt folgt v = 0.020 mol/(L s); der Katalysator beschleunigt ueber niedrigere Ea, ohne Edukt- und Produktenergie zu verschieben.`

## Schritt 5 — ausprobieren

VERGLEICH (zwei Verfahren unterscheiden):

VERGLEICH: Waehle erst das Verfahren — (i) Konzentrations-Verfahren ($c$-$t$-Daten mit $v = \Delta c / \Delta t$, Tempo vergleichen, Konzentrations-, Temperatur- und Oberflaecheneinfluss ueber Stosshaeufigkeit) oder (ii) Katalysator-Verfahren (Wirkmechanismus, Doppelpeak-$E_a$-Bild, Gleichgewichtslage beurteilen) — dann rechnen.

AUFGABE A: Zwei Versuche mit CO/NO laufen bei gleicher Temperatur, Versuch 2 hat doppelte Anfangskonzentration. Gefragt ist, welcher Versuch schneller startet und warum.
AUFGABE B: Versuch 3 nutzt dieselbe Mischung wie Versuch 1, aber mit Kat-Blech. Gefragt ist, wie sich Ea-Bild und Gleichgewichtslage aendern.

HILFE: A nennt nur einen $c$-Unterschied ohne neuen Stoff, also Verfahren (i) ueber Kollision. B nennt zusaetzlich Kat bei gleicher Mischung, also Verfahren (ii) ueber den Weg. Faustregel: $c$-$t$-Werte, Konzentrationsverdopplung, Erwaermen und Zerkleinern verlangen Konzentration; Kat, $E_a$, Energiebild, Verbrauch und Gleichgewichtsfrage verlangen Katalysator.

ANTWORT: A erfordert Verfahren (i): Versuch 2 startet schneller, weil mehr Teilchen pro Volumen haeufiger wirksam zusammenstossen; v = Δc/Δt ist dort groesser. B erfordert Verfahren (ii): Mit Kat erscheint im Energiebild ein Doppelpeak mit niedrigerer Ea, die Reaktion wird schneller, doch Edukt- und Produktenergie bleiben gleich, daher bleibt die Gleichgewichtslage unveraendert.

Klausur-Satz: `Mehr Konzentration erhoeht die Stosszahl, der Katalysator senkt die Huerde; nur der erste Fall aendert v ueber die Teilchenzahl, der zweite ueber Ea.`

## Schritt 6 — check

CHECK (Selbsttest, 3 Fragen mit Antworten):

FRAGE: Wie ist die Reaktionsgeschwindigkeit definiert und wie berechnet man sie aus c-t-Daten? | ANTWORT: v = Δc/Δt, also Konzentrationsaenderung pro Zeit; Beispiel: Δc = 0.40 mol/L in 20 s ergibt 0.020 mol/(L s).
FRAGE: Welche drei Bedingungen machen einen Zusammenstoss wirksam? | ANTWORT: Genug Energie ueber Ea, richtige Orientierung der Treffstelle und wirksamer Kontakt; erst alle drei zusammen ermoeglichen den Umsatz.
FRAGE: Was aendert ein Katalysator im Energiebild und was nicht? | ANTWORT: Er oeffnet einen neuen Weg mit niedrigerer Ea als Doppelpeak und bleibt selbst unveraendert; Edukt- und Produktenergie sowie die Gleichgewichtslage bleiben gleich.

Klausur-Satz: `Wirksame Stoesse brauchen Energie, Orientierung und Kontakt; der Katalysator senkt nur die Huerde Ea.`

## Fehlvorstellung

(kein Schritt; wird vom Parser automatisch erkannt und nicht mitgezaehlt)

1. Fehlannahme: Der Katalysator werde in der Reaktion verbraucht und muesse staendig erneuert werden.
   Korrektur: Er stellt nur Haftplaetze und einen neuen Weg bereit; Masse und chemische Art bleiben erhalten. Die unveraenderten Start- und Zielenergien im Bild beweisen es: Nach der Vermittlung steht er fuer den naechsten Umsatz bereit, daher arbeiten wenige Gramm Edelmetall jahrelang.
   Korrektur-Satz: `Der Katalysator wird nicht verbraucht, sondern verlaesst die Reaktion unveraendert und steht fuer den naechsten Umsatz bereit.`

2. Fehlannahme: Mit Katalysator verschiebe sich das Gleichgewicht zum Produkt und die Ausbeute steige.
   Korrektur: Er senkt die gemeinsame Schwelle von Hin- und Rueckweg, beide Richtungen werden gleich beschleunigt; Lage und Ausbeute bleiben. Er aendert die Zeit bis zum Ziel, nicht das Ziel. Wer nach Verschiebung gefragt wird, waehlt niemals den Katalysator.
   Korrektur-Satz: `Der Katalysator beschleunigt Hin- und Rueckreaktion gleich und veraendert die Lage des Gleichgewichts nicht.`

## Schritt 7 — szenario

ROLLE: Du bist Praktikantin im Umweltlabor und erklaerst einer Besuchergruppe den Auto-Katalysator.
SITUATION: Die Gruppe fragt, warum ein kleines Kat-Blech die giftigen Gase CO und NO dauerhaft in CO2 und N2 verwandeln kann, ohne selbst zu verschwinden. Antworte in einer zusammenhaengenden Darstellung (ca. 150 Woerter) mit der Gleichung 2CO + 2NO --Kat--> 2CO2 + N2, der Formel v = Δc/Δt und dem Ea-Doppelpeak.
AUFGABE: Schreibe eine Klausur-Antwort mit Berechnungsskizze, Teilchendeutung und Urteil ueber Verbrauch und Gleichgewicht.
RUBRIC (30 XP): Korrekte Deutung von v = Δc/Δt und der drei Stossbedingungen (10 XP) | Beschreibung des Kat-Weges mit niedrigerer Ea als Doppelpeak (10 XP) | Urteil: Kat bleibt unveraendert, Gleichgewichtslage bleibt gleich (10 XP).

## Schritt 8 — entdecken

TAKEAWAY (Kernzusammenfassung):

Geschwindigkeitsaufgaben folgen zwei Schritten: Erst mit $v = \Delta c / \Delta t$ das Tempo berechnen, dann mit den drei Stossbedingungen (Energie, Orientierung, Kontakt) deuten. Konzentration, Temperatur und Oberflaeche veraendern die Stosshaeufigkeit, der Katalysator die Schwellenhoehe — Doppelberg flacher, Start und Ziel unveraendert. Anker bleibt $2CO + 2NO \xrightarrow{Kat} 2CO_2 + N_2$; auf Verbrauch und Verschiebung lautet die Antwort stets unverbraucht, unverschoben, nur schneller.
Takeaway-Satz: `Tempo folgt aus v = Δc/Δt, Deutung aus wirksamen Stoessen; der Katalysator senkt Ea im Doppelpeak und laesst Edukt, Produkt und Gleichgewicht unveraendert.`

REFLEXION (2 Fragen):
1. Selbstbeobachtung: Welcher Schritt fiel schwerer — die Rechnung mit v = Δc/Δt (Schritt 4) oder die Wahl zwischen Konzentrations- und Katalysator-Verfahren (Schritt 5)?
2. Planung: Beim naechsten Mal pruefe ich zuerst, ob nach c-t-Rechnung oder nach Ea-Weg gefragt ist, und zeichne danach das passende Bild.
