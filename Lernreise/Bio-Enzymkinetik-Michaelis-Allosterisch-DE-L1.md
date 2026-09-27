---
fach: Bio
thema: "Enzymkinetik nach Michaelis sowie allosterische Regulation"
level: 1
ziel: Klausur
xp: 100
operatoren: [beschreiben, erklaeren, deuten]
klausurrelevant: true
datum: 2026-09-26
tags: [EF, Bio, Stoffwechsel]
version: Lesson-v3
---

# Lernreise: Enzymkinetik nach Michaelis sowie allosterische Regulation — Episode B17: Fieber im Reaktorbecken

<!-- Campaign: Nano-Zellfabrik-Krise | Bio | Instapower: entdecken 5 / ausprobieren 15 / check 20 / szenario 30 -->
## Schritt 1 — entdecken: Das Gegengift-Rennen: Wer blockiert wen

ZIELE:
1. Ich kann die **Michaelis-Menten-Kurve** mit Km und vmax lesen.
2. Ich kann **kompetitive** von **nicht-kompetitiver Hemmung** unterscheiden.
3. Ich kann **allosterische Regulation** als Schalter erklaeren.

Mitternacht in der Giftnotaufnahme: Ein Hemmstoff blockiert ein lebenswichtiges Enzym, und nur ein Gegengift passt. Der Arzt steht vor der Wahl: Mehr Substrat zum Verdraengen oder ein **allosterischer** Schalter von der Seite? Die **Michaelis-Menten-Kurve** haelt die Antwort bereit.

Falsch dosiert wird Medizin zu Gift. Wer **Km** liest und Hemmtypen unterscheidet, dosiert das Gegengift richtig und rettet den Patienten statt ihn zu vergiften.

`Klausur-Satz: Gift oder Gegengift entscheidet die Kurve: Km verrät Affinitaet, vmax verrät das Limit.`

## Schritt 2 — entdecken: Die Kinetik-Werkzeugkiste der Apotheke

AUSRUESTUNG (5 Begriffe der Werkzeugkiste):

- **Michaelis-Konstante**: Die Michaelis-Konstante Km ist die Substratkonzentration bei halber Maximalrate. Kleines Km bedeutet hohe Affinitaet. Mechanismus: Bei Km ist die Haelfte der Zentren besetzt; die Kurve steigt dort am steilsten und kennt den Halbpunkt. Klausur-Tipp: Km als Halbmax-Punkt einzeichnen und Affinitaet umgekehrt deuten.

- **Maximalrate**: vmax ist die Rate bei Substratsaettigung, wenn alle Zentren besetzt sind. Sie waechst nur mit der Enzymmenge. Mechanismus: Mehr Enzym hebt das Plateau, mehr Substrat aendert nichts mehr: Die Schlange ist das Limit. Klausur-Tipp: vmax als Plateau zeichnen und nur Enzymmenge als Heber nennen.

- **Kompetitive Hemmung**: Der kompetitive Hemmstoff besetzt das aktive Zentrum und konkurriert mit dem Substrat. Viel Substrat verdraengt ihn vollstaendig. Mechanismus: Km steigt scheinbar, vmax bleibt erreichbar: Bei genug Substrat laeuft die Fabrik wieder voll. Klausur-Tipp: vmax gleich, Km rechts — das Kurvenpaar als Beweis zeichnen.

- **Nicht-kompetitive Hemmung**: Der nicht-kompetitive Hemmstoff bindet ausserhalb und verformt das Zentrum. Mehr Substrat hilft nicht. Mechanismus: vmax sinkt, Km bleibt: Weniger funktionierende Zentren arbeiten normal, der Rest schweigt. Klausur-Tipp: vmax unten, Km gleich — Senkung ohne Verschiebung.

- **Allosterische Regulation**: Allosterische Effektoren schalten Enzyme durch Bindung fern vom Zentrum um. Endprodukte hemmen oft den ersten Schritt ihrer Kette. Mechanismus: Die Kette reguliert sich selbst per Feedback: Viel Produkt drueckt den Start, wenig Produkt gibt ihn frei. Klausur-Tipp: Feedback mit Start und Ende der Kette als Regelkreis zeichnen.


`Klausur-Satz: Kompetitiv verschiebt Km nach rechts, nicht-kompetitiv drueckt vmax nach unten.`

## Schritt 3 — entdecken: Von der Saettigung zur Schaltung: Die Regulationskette

WIRKUNGSGEFUEGE (Ursache zu Wirkung):

Die Kette startet mit der **Saettigung**: Mehr Substrat fuellt mehr Zentren, bis alle besetzt sind und **vmax** das Plateau setzt. Der Halbpunkt **Km** misst die Affinitaet.

Dann greift die **Regulation** ein: Kompetitive Hemmer konkurrieren um das Zentrum, nicht-kompetitive verformen es, **allosterische** Effektoren schalten ganze Ketten per Feedback. Jede Form veraendert die Kurve anders.

```diagram
Substrat hoch -> Zentren voll -> vmax-Plateau
Kompetitiv: Km rechts, vmax gleich
Nicht-kompetitiv: vmax unten, Km gleich
Allosterisch: Kette per Feedback geschaltet
```

Die Michaelis-Menten-Gleichung des Sandkastens:

$$v = \frac{v_{\max} \cdot [S]}{K_M + [S]}$$

Bei S gleich Km laeuft halbe Maximalrate; die Kurve startet linear und muendet ins Plateau.

`Klausur-Satz: Saettigung begrenzt die Rate, Regulation schaltet die Kette: Kurve plus Schalter erklaeren alles.`

## Anekdote & Fun-Fact

**Anekdote / Fun-Fact (DE)**: Penicillin blockiert bacterialische Wandbauer und rettet Millionen — ein Hemmstoff als Lebensretter.


**Bezug zum Konzept**: Blockade als Therapie: Der richtige Hemmtyp heilt, der falsche vergiftet.

## Schritt 4 — ausprobieren: Sandkasten: Lies Km ab und stelle den Hemmtyp

[Werkzeug: formula]

AUFGABE (Target Challenge): Gegeben: v-Werte bei S = 1/2/5/10/20 mM ohne und mit Hemmstoff X. Bestimme Km und vmax beider Kurven, entscheide kompetitiv oder nicht-kompetitiv und begruende, ob Substraterhoehung als Gegengift taugt.

HILFE:
1. Beide Kurven zeichnen und Plateaus vergleichen.
2. Km als Halbmax-Punkt je Kurve ablesen.
3. Hemmtyp aus Verschiebung oder Senkung ableiten.

MUSTERLOESUNG: Ohne X: Km 2 mM, vmax 100; mit X: Km 6 mM, vmax 100: kompetitiv, denn vmax bleibt. Substraterhoehung verdraengt X und taugt als Gegengift.

`Klausur-Satz: Mit Km als Halbmax-Punkt und zwei Kurven entlarvt die Messung jeden Hemmtyp.`

## Schritt 5 — ausprobieren: Duell der Wege: Km-Rechnung gegen Hemmbild-Deutung

VERGLEICH: Waehle erst den Beweisweg, dann loesen: (i) Km-Rechenweg oder (ii) Hemmbild-Deuteweg — dann loesen.


Weg A (Km-Rechenweg): Km und vmax aus Messwerten quantitativ bestimmen und Kurven berechnen. Dieser Weg liefert Zahlen und ist gerichtsfest.

Weg B (Hemmbild-Deuteweg): Kurvenbilder qualitativ vergleichen und Hemmtypen am Verlauf erkennen. Dieser Weg ist schnell, bleibt aber ohne Zahl duenn.


AUFGABE A: Km-Vergleich zweier Kurven mit Zahlen gesucht. Welcher Weg?

AUFGABE B: Warum hilft Substrat nur bei einem Hemmtyp? Welcher Weg?


HILFE: A nennt Zahlen — Weg A mit Rechnung. B nennt Warum mit Bild — Weg B mit Deutung.

ANTWORT: A folgt Weg A mit Halbmax-Ablesung; B folgt Weg B mit Zentrum-verformt-Argument.

`Klausur-Satz: Km rechnen lokalisiert, Hemmbilder deuten identifizieren — die Klausur braucht beides.`

## Schritt 6 — check: Selbsttest zu Enzymkinetik und Regulation

- FRAGE: Was bedeutet kleines Km? | ANTWORT: Hohe Affinitaet.

- FRAGE: Wie aendert kompetitive Hemmung die Kurve? | ANTWORT: Km wandert rechts, vmax bleibt.

- FRAGE: Warum wirkt allosterisch wie ein Schalter? | ANTWORT: Endprodukt schaltet die Kette per Feedback ab.


`Klausur-Satz: Ohne Kurvenvergleich bleibt jeder Hemmtyp geraten, mit ihm wird er gelesen.`

## Fehlvorstellung

1. Fehlvorstellung: Km sei die Dissoziationskonstante.
   Korrektur-Satz: `Km ist die Halbmax-Konzentration: Sie aehnelt Affinitaet, ist aber eine kinetische Groesse.`

2. Fehlvorstellung: Jede Hemmung lasse sich mit Substrat heilen.
   Korrektur-Satz: `Nur kompetitive Hemmung laesst sich verdraengen; verformte Zentren bleiben stumm.`

## Schritt 7 — szenario: Klausurtransfer: Gutachten zum Medikamenten-Ziel

ROLLE: Du bist Pharmakologin im Wirkstoff-Team.
SITUATION: Ein Kandidat hemmt Enzym E. Entscheide in ca. 150 Woertern mit Km-, vmax- und Kurvenlogik ueber Hemmtyp, Dosierbarkeit und das Risiko fuer gesunde Zellen.
RUBRIC (30 XP): Kurvenlogik (8 XP) | Hemmtyp (8 XP) | Dosisurteil (8 XP) | Risikoabwaegung (6 XP).


`Klausur-Satz: Achtung Falle: Mehr Substrat rettet nur kompetitiv Gehemmte, nie allosterisch Verformte.`

## Schritt 8 — reflexion: Takeaway & Reflexion

TAKEAWAY:

Takeaway-Satz: `Halbmax suchen, Kurven vergleichen: rechts heisst konkurrieren, unten heisst verformen.`

`Klausur-Satz: Regulation ist Voraussicht der Zelle: Sie baut Bremsen ein, bevor die Fabrik ueberlaeuft.`


REFLEXION:
1. Welcher Schritt fiel schwerer — die Sandkasten-Challenge (Schritt 4) oder die Verfahrenswahl (Schritt 5)?
2. Beim naechsten Mal sichere ich zuerst die Werkzeugkiste, weil jeder Handgriff darauf aufbaut.
