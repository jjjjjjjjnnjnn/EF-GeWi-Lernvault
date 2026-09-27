---
fach: Bio
thema: "Enzymaktivitaet und Einflussfaktoren"
level: 1
ziel: Klausur
xp: 100
operatoren: [beschreiben, auswerten, erklaeren]
klausurrelevant: true
datum: 2026-09-25
tags: [EF, Bio, Zellbiologie]
version: Lesson-v3
---

# Lernreise: Enzymaktivitaet und Einflussfaktoren — Episode B14: Das Leck in Halle 7

<!-- Campaign: Nano-Zellfabrik-Krise | Bio | Instapower: entdecken 5 / ausprobieren 15 / check 20 / szenario 30 -->
## Schritt 1 — entdecken: Fieber 40 Grad: Wenn Helfer schlappmachen

ZIELE:
1. Ich kann den **Temperatur- und pH-Einfluss** auf Enzyme erklaeren.
2. Ich kann **Substrat- und Enzymkonzentration** in Raten uebersetzen.
3. Ich kann **Denaturierung** von reversibler Hemmung unterscheiden.

Das Fieberthermometer zeigt 40,2 Grad: Mara Zell schwitzt, und ihre Waschmaschine verspricht kaltes Waschen bei 20 Grad — doch der Blutfleck bleibt. Zwei Kurven starren sie an: Waerme beschleunigt jede Reaktion, aber zu viel Waerme zerstoert den Helfer selbst. **Enzyme** sind die waehlerischsten Kuechenchefs der Zelle.

Auch der **pH-Wert** diktiert mit: Ein Schritt daneben, und die Aktivitaet bricht ein. Heute Nacht sucht die Fabrik den schmalen Gipfel zwischen schnell und kaputt — das **Optimum**. Wer es findet, senkt das Fieber richtig und waehlt das Waschprogramm mit Verstand.

`Klausur-Satz: Zwischen schnell und kaputt liegt ein schmaler Gipfel: Das Optimum entscheidet ueber Heilung und Wäsche.`

## Schritt 2 — entdecken: Die Faktoren-Werkzeugkiste der Kueche

AUSRUESTUNG (5 Begriffe der Werkzeugkiste):

- **Aktives Zentrum**: Das aktive Zentrum ist die Bindungstasche des Enzyms mit passgenauer Form und Ladung. Nur das passende Substrat dockt nach dem Schluessel-Schloss-Prinzip an. Mechanismus: Substrat bindet, der Enzym-Substrat-Komplex stabilisiert den Uebergangszustand, das Produkt verlaesst die Tasche. Klausur-Tipp: Schluessel-Schloss plus Uebergangszustand als Doppelpunkt.

- **Temperaturoptimum**: Das Temperaturoptimum ist der Gipfel der Ratenkurve, meist um 37 Grad beim Menschen. Links treibt die Brownsche Bewegung die Rate hoch. Mechanismus: Rechts zerreissen Schwingungen die schwachen Bindungen der Tertiaerstruktur: Die Tasche verformt sich irreversibel. Klausur-Tipp: Links Bewegung, rechts Zerstoerung — Zangenbegruendung schreiben.

- **pH-Optimum**: Das pH-Optimum ist der Saeuregrad hoechster Aktivitaet, etwa pH 2 bei Pepsin und pH 8 bei Trypsin. Falsche Protonierung veraendert Ladungen im Zentrum. Mechanismus: Saure denaturiert die Struktur oder blockiert die katalytischen Reste; jedes Enzym traegt sein eigenes Fenster. Klausur-Tipp: Pepsin sauer, Trypsin basisch als Beispielpaar bringen.

- **Substratkonzentration**: Steigende Substratkonzentration erhoeht die Rate erst linear, dann flacht sie zur Saettigung ab. Irgendwann ist jedes Zentrum besetzt. Mechanismus: Anfangs findet jedes Substrat ein freies Zentrum; spaeter warten Substrate in der Schlange, die Rate haengt nur noch an der Enzymmenge. Klausur-Tipp: Saettigung mit alle Zentren besetzt begruenden.

- **Denaturierung**: Denaturierung ist der irreversible Verlust der Raumstruktur durch Hitze, Extreme oder Gifte. Die Aminosaeurekette bleibt, die Funktion stirbt. Mechanismus: Schwache Bindungen brechen, hydrophobe Kerne klappen nach aussen, das Zentrum passt nie wieder. Klausur-Tipp: Irreversibel plus Struktur bleibt Kette, Funktion tot als Abgrenzung zu Hemmung.


`Klausur-Satz: Links treibt Bewegung die Rate, rechts zerstoert Hitze die Struktur.`

## Schritt 3 — entdecken: Vom Zittern zum Zerfall: Die Ratenkette

WIRKUNGSGEFUEGE (Ursache zu Wirkung):

Die Ratenkette startet mit der **Bewegung**: Waerme laesst Substrate oefter kollidieren, die Rate steigt. Parallel veraendert der **pH-Wert** die Ladungen im aktiven Zentrum und entscheidet ueber Passform.

Jenseits des Optimums kippt die Kette: **Denaturierung** zerstoert die Tertiaerstruktur, die Rate stuerzt ab. Mehr Substrat hilft nur bis zur **Saettigung**, danach begrenzt allein die Enzymmenge.

```diagram
T hoch -> Kollision hoch -> Rate hoch
T zu hoch -> Denaturierung -> Rate null
Substrat hoch -> Saettigung -> Enzymmenge limitiert
```

Die Ratendefinition des Sandkastens:

$$v = \frac{\Delta c}{\Delta t} \quad \text{in } \frac{\text{mol}}{\text{L} \cdot \text{s}}$$

Jede Rate braucht Zeit im Nenner; Kurven werden als Steigung gelesen.

`Klausur-Satz: Temperatur schiebt die Kurve, pH verbiegt das Schloss, Substrat fuellt die Zentren bis zur Saettigung.`

## Anekdote & Fun-Fact

**Anekdote / Fun-Fact (DE)**: Fieber ueber 42 Grad wird lebensgefaehrlich, weil Koerpereiweisse gerinnen — das Spiegelei in der Pfanne zeigt dieselbe Chemie.


**Bezug zum Konzept**: Pfanne und Fieber folgen derselben Kurve: erst schneller, dann kaputt.

## Schritt 4 — ausprobieren: Sandkasten: Finde das Optimum

[Werkzeug: formula]

AUFGABE (Target Challenge): Gegeben: Raten bei 20/30/37/45/60 Grad: 0,2/0,5/0,9/0,4/0,0 mol/(L s); dazu pH-Reihe 5/7/9. Bestimme beide Optima, berechne die Rate bei 30 Grad aus c-Verlauf und begruende den Absturz bei 60 Grad molekular.

HILFE:
1. Optima als Gipfel ablesen: Temperatur und pH getrennt.
2. Rate aus Delta-c durch Delta-t mit Einheit berechnen.
3. Absturz mit Denaturierung der Tertiaerstruktur begruenden.

MUSTERLOESUNG: Optimum 37 Grad und pH 7; v bei 30 Grad aus Steigung 0,5 mol/(L s); bei 60 Grad bricht die Rate auf null ein, weil die Tertiaerstruktur irreversibel zerfaellt.

`Klausur-Satz: Mit Optimum bei 37 Grad und Einbruch jenseits 45 Grad rechnet die Kurve statt zu raten.`

## Schritt 5 — ausprobieren: Duell der Wege: Kurvenmessung gegen Strukturdeutung

VERGLEICH: Waehle erst den Beweisweg, dann loesen: (i) Kurvenmess-Rechenweg oder (ii) Strukturdeute-Weg — dann loesen.


Weg A (Kurvenmess-Rechenweg): Raten messen, Optima ablesen, Steigungen quantitativ berechnen. Dieser Weg liefert Zahlen mit Einheit und ist pruefungssicher.

Weg B (Strukturdeute-Weg): Taschenform und Ladungen am Modell deuten und Denaturierung qualitativ erklaeren. Dieser Weg liefert Verstaendnis, bleibt aber ohne Zahl duenn.


AUFGABE A: v aus Zeitverlauf mit Einheit gesucht. Welcher Weg?

AUFGABE B: Warum hilft mehr Substrat jenseits der Saettigung nichts? Welcher Weg?


HILFE: A nennt Verlauf und Einheit — Weg A mit Rechnung. B nennt Warum mit Struktur — Weg B mit Deutung.

ANTWORT: A folgt Weg A mit Steigungsrechnung; B folgt Weg B mit alle Zentren besetzt als Strukturargument.

`Klausur-Satz: Raten messen zaehlt, Strukturen deuten erklaert — die Klausur braucht beides.`

## Schritt 6 — check: Selbsttest zu Enzymaktivitaet und Faktoren

- FRAGE: Wo liegt das Temperaturoptimum? | ANTWORT: Etwa 37 Grad beim Menschen.

- FRAGE: Ist Denaturierung reversibel? | ANTWORT: Nein, der Bau faellt irreversibel zusammen.

- FRAGE: Hilft mehr Substrat immer? | ANTWORT: Nur bis zur Saettigung, danach zaehlt Enzymmenge.


`Klausur-Satz: Ohne Optimum bleibt jede Enzymaussage geraten, mit ihm wird sie gemessen.`

## Fehlvorstellung

1. Fehlvorstellung: Waerme helfe immer.
   Korrektur-Satz: `Waerme hilft nur bis zum Optimum: Jenseits zerstoert sie das Enzym irreversibel.`

2. Fehlvorstellung: pH sei egal.
   Korrektur-Satz: `Der pH veraendert Ladungen im Zentrum: Falscher pH, falsche Passform, keine Katalyse.`

## Schritt 7 — szenario: Klausurtransfer: Gutachten zum Waschmittel-Test

ROLLE: Du bist Laborprueferin fuer Waschenzyme.
SITUATION: Ein Hersteller wirbt mit Kaltwasch-Enzym bei 20 Grad. Bewerte in ca. 150 Woertern mit Optimum, Rate und Denaturierung, ob das Versprechen haelt, und entwirf den Gegenversuch.
RUBRIC (30 XP): Optimumslogik (8 XP) | Ratendeutung (8 XP) | Gegenversuch (8 XP) | Abwaegung (6 XP).


`Klausur-Satz: Achtung Falle: Denaturierung ist irreversibel, Hemmung oft reversibel — wer tauscht, verliert.`

## Schritt 8 — reflexion: Takeaway & Reflexion

TAKEAWAY:

Takeaway-Satz: `Optimum suchen, Zange begruenden: links Bewegung, rechts Zerfall.`

`Klausur-Satz: Enzyme sind Massanzuege der Natur: Nur im richtigen Klima sitzt die Katalyse.`


REFLEXION:
1. Welcher Schritt fiel schwerer — die Sandkasten-Challenge (Schritt 4) oder die Verfahrenswahl (Schritt 5)?
2. Beim naechsten Mal sichere ich zuerst die Werkzeugkiste, weil jeder Handgriff darauf aufbaut.
