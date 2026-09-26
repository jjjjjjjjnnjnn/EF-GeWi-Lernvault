---
fach: Chemie
thema: "Gleichgewichtsvertiefung mit Q-Berechnung"
level: 2
ziel: Klausur
xp: 100
operatoren: [aufstellen, berechnen, begruenden]
klausurrelevant: true
datum: 2026-09-26
tags: [EF, Chemie, Gleichgewicht]
version: Lesson-v3
---

# Lernreise: Gleichgewichtsvertiefung mit Q-Berechnung (L2, Ziel Klausur)

<!-- Lesson v3 architecture: Schritte 1-8 fixed; Fehlvorstellung between Schritt 6 and 7 (parser skipped); embedded [Werkzeug: <id>]; gating: check/szenario failed = Weiter greyed; XP: entdecken 5 / ausprobieren 15 / check 20 / szenario 30 -->

## Schritt 1 — entdecken

ZIELE (3 Ziele, nach 20 Minuten erreichbar):

1. Den Reaktionsquotienten $Q$ aus beliebigen Momentankonzentrationen berechnen.
2. Aus $Q < K_c$, $Q = K_c$ und $Q > K_c$ die Richtung bis zum Ausgleich begruenden.
3. $Q$-Verlaeufe bei Stoerungen (Zugabe, Entnahme, Verdünnung) vorhersagen (AFB III).

VORAUSSETZUNG: MWG-Ausdruck, Le-Chatelier-Richtung und sicheres Logarithmieren.

VORGAENGER-VERWEIS UND ARBEITSTEILUNG (L2-Abgrenzung): Diese Lektion setzt `Chemie-Chemisches-Gleichgewicht-L1.md` voraus und wiederholt sie nicht. Dort wurden MWG-Grundform, Dreisatztabelle und qualitative Richtung nach Le Chatelier eingefuehrt. Hier folgt der enge L2-Ausschnitt: nur quantitative $Q$-Rechnung als Richtungskriterium mit Zahlen; Grunddefinitionen und Tabellenroutine gehoeren zur L1 und werden vorausgesetzt. Wer nur die Richtung ohne Zahlen braucht, arbeitet weiter mit der L1-Methode.

Klausur-Satz: `Der Vergleich von Q mit K_c entscheidet quantitativ ueber Richtung und Ruhelage.`

## Schritt 2 — entdecken

PRETRAINING (Kernbegriffe):

- Reaktionsquotient $Q$: MWG-Ausdruck mit Momentanwerten statt Gleichgewichtswerten.
- Gleichgewichtskonstante $K_c$: $Q$ im Gleichgewicht, nur temperaturabhaengig.
- Richtungskriterium: $Q < K_c$ nach rechts, $Q > K_c$ nach links, $Q = K_c$ Ruhe.
- Stoerung: Zugabe, Entnahme oder Volumenprung veraendert $Q$ sprunghaft.
- Ausgleich: Reaktion laeuft, bis $Q = K_c$ wieder gilt.

Klausur-Satz: `Q misst die aktuelle Lage, K_c markiert das Ziel; die Differenz treibt die Reaktion.`

## Schritt 3 — entdecken

ENTDECKEN (ein Konzept plus Diagramm):

$Q$ und $K_c$ teilen dieselbe Formel $Q = [P]^p/[E]^e$, unterscheiden sich nur im Zeitpunkt. Nach einer Stoerung springt $Q$, dann wandert es durch Umsatz zurueck auf $K_c$. Rechenweg: Ausdruck hinschreiben, Momentanwerte einsetzen, mit $K_c$ vergleichen, Richtung nennen, Ausgleich als $Q \to K_c$ formulieren. Feststoffe und Loesungsmittel entfallen wie in der L1.

```diagram
Formel: Q = [Produkte]^p / [Edukte]^e (momentan)
Vergleich: Q < K_c -> rechts | Q = K_c -> Ruhe | Q > K_c -> links
Stoerung: Zugabe springt Q -> Reaktion wandert Q -> K_c
Beispiel: mehr Edukt senkt Q -> Reaktion nach rechts bis Q = K_c
```

Klausur-Satz: `Jede Stoerung startet als Q-Sprung und endet als Q-Ausgleich auf K_c.`

## Anekdote & Fun-Fact

**Anekdote / Fun-Fact (DE)**: Haber und Bosch steuerten Ammoniak mit Druck und Abkuehlung des Produkts: Beides veraendert $Q$ guenstig, ohne $K_c$ zu verbessern. Die Anlage rechnet staendig $Q$ gegen $K_c$, ohne die Buchstaben zu kennen.

**Bezug zum Konzept**: `Produktentnahme senkt Q und zieht die Reaktion nach rechts bis Q wieder K_c erreicht.`

## Schritt 4 — ausprobieren

BEISPIEL (vollstaendige Musterloesung):

[Werkzeug: gleichgewicht]

AUFGABE (berechnen, AFB II): Fuer $H_2 + I_2 \rightleftharpoons 2HI$ gilt $K_c = 64$. Im Moment liegen $c(H_2) = 0{,}20$, $c(I_2) = 0{,}20$ und $c(HI) = 0{,}80 \, mol/L$ vor. Berechnen Sie $Q$ und begruenden Sie die Richtung.

HILFE:
1. Schritt 1: $Q = [HI]^2/([H_2][I_2])$ notieren.
2. Schritt 2: Werte einsetzen.
3. Schritt 3: Mit $K_c$ vergleichen und Richtung nennen.

MUSTERLOESUNG: Es gilt $Q = 0{,}80^2/(0{,}20 \cdot 0{,}20) = 0{,}64/0{,}04 = 16$. Da $Q = 16 < K_c = 64$, liegen zu wenige Produkte vor; die Reaktion laeuft nach rechts, bis $Q = K_c$ gilt. Die Ruhelage ist noch nicht erreicht, der Umsatz steigt weiter zugunsten von $HI$.

Klausur-Satz: `Mit Q = 16 unter K_c = 64 laeuft die Reaktion nach rechts bis Q wieder K_c erreicht.`

## Schritt 5 — ausprobieren

VERGLEICH (erst Verfahren waehlen, dann loesen):

VERGLEICH: Waehle erst das Verfahren — (i) $Q$-Verfahren (Zahlen einsetzen, mit $K_c$ vergleichen) oder (ii) Le-Chatelier-Verfahren (Stoerung qualitativ ohne Zahlen) — dann loesen.

AUFGABE A: Konzentrationen und $K_c$ sind gegeben, Richtung gesucht. Welches Verfahren passt?

AUFGABE B: Temperatur steigt bei exothermer Hinreaktion, Richtung gesucht ohne Zahlen. Welches Verfahren passt?

HILFE: A nennt Zahlen, also Verfahren (i). B nennt nur Stoerung, also Verfahren (ii).

ANTWORT: A erfordert Verfahren (i): $Q$ berechnen und mit $K_c$ vergleichen. B erfordert Verfahren (ii): Endotherme Richtung bevorzugt, $K_c$ sinkt, Gleichgewicht nach links.

Klausur-Satz: `Zahlen verlangen Q, Woerter verlangen Le Chatelier.`

## Schritt 6 — check

CHECK (drei Fragen mit Antworten):

FRAGE: Wie lautet das Richtungskriterium? | ANTWORT: $Q < K_c$ nach rechts, $Q = K_c$ Ruhe, $Q > K_c$ nach links.
FRAGE: Was veraendert $Q$ sprunghaft? | ANTWORT: Zugabe, Entnahme oder Volumenwechsel durch neue Momentanwerte.
FRAGE: Was aendert $K_c$ selbst? | ANTWORT: Nur die Temperatur; Konzentration und Druck aendern nur $Q$.

Klausur-Satz: `Q springt sofort, K_c nur mit Temperatur.`

## Fehlvorstellung

1. Fehlvorstellung: $Q$ und $K_c$ seien zwei verschiedene Formeln.
   Korrektur-Satz: `Q und K_c teilen dieselbe Formel und unterscheiden sich nur durch Zeitpunkt statt Gleichgewicht.`

2. Fehlvorstellung: Nach der Stoerung bleibe $Q$ auf dem Sprungwert stehen.
   Korrektur-Satz: `Die Reaktion wandert mit Umsatz, bis Q wieder gleich K_c ist.`

## Schritt 7 — szenario

ROLLE: Du bist Verfahrenstechnikerin im Ammoniakwerk.
SITUATION: Nach Produktentnahme meldet das Labor Momentanwerte mit $Q < K_c$. Erklaere in circa 150 Woertern mit $Q$-Rechnung, wohin die Anlage wandert und warum kein Eingriff noetig ist, solange Temperatur und Druck stabil bleiben.
RUBRIC (30 XP): $Q$-Ausdruck korrekt (8 XP) | Vergleich mit $K_c$ (10 XP) | Ausgleichsprognose (8 XP) | Fachsprachliche Darstellung (4 XP).

## Schritt 8 — entdecken

TAKEAWAY:

Ausdruck hinschreiben, Werte einsetzen, mit $K_c$ vergleichen: $Q$ zeigt Lage, Differenz zeigt Weg.
Takeaway-Satz: `Q gegen K_c halten — so rechnet Richtung statt sie zu raten.`

REFLEXION:
1. Welcher Schritt fiel schwerer — die $Q$-Rechnung (Schritt 4) oder die Verfahrenswahl (Schritt 5)?
2. Beim naechsten Mal schreibe ich zuerst Ausdruck plus Vergleich hin, weil sie jede Richtung tragen.
