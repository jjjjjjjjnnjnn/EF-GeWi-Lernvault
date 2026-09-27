---
fach: Mathe
thema: "Rekonstruktion mit Symmetriebedingungen"
level: 2
ziel: Klausur
xp: 100
operatoren: [aufstellen, berechnen, begruenden]
klausurrelevant: true
datum: 2026-09-26
tags: [EF, Mathe, Analysis]
version: Lesson-v3
---

# Lernreise: Rekonstruktion mit Symmetriebedingungen (L2, Ziel Klausur)

<!-- Campaign: Optimierung | Episode 24/33 | Krise: Tunnel-Lueftung CO 42 ppm | Target: x0 = 6, h = 0.1, Target m = 11.88 | Tool: box-optimizer -->

## Schritt 1 — entdecken: Fahndung nach Koeffizienten
ZIELE (3 Ziele, nach 20 Minuten erreichbar):

1. Symmetriebedingungen (achsensymmetrisch zur y-Achse, punktsymmetrisch zum Ursprung) in Gleichungen fuer Koeffizienten uebersetzen.
2. Aus Symmetrie plus zwei weiteren Bedingungen ein lineares Gleichungssystem mit reduzierter Unbekanntenzahl aufstellen.
3. Die Rekonstruktion loesen und die Symmetrie am Ergebnis kontrollieren.

VORAUSSETZUNG: Ganzrationale Funktionen, Ableitungen $f'(x)$ und $f''(x)$ sowie Loesen kleiner linearer Gleichungssysteme.

VORGAENGER-VERWEIS UND ARBEITSTEILUNG (L2-Abgrenzung): Diese Lektion setzt `Mathe-Steckbriefaufgaben-Verfahren-L1.md` voraus und wiederholt dessen Allgemeinverfahren nicht. Dort wurde das Standardverfahren (Grad bestimmen, alle Koeffizienten ansetzen, Bedingungen aus Punkten und Ableitungen sammeln) eingefuehrt. Hier folgt der enge L2-Ausschnitt: nur Aufgaben, in denen Symmetrie vorab Koeffizienten eliminiert, etwa $f(x) = ax^4 + bx^2 + c$ bei Achsensymmetrie oder $f(x) = ax^3 + bx$ bei Punktsymmetrie. Wer keine Symmetrieangabe hat, arbeitet weiter mit der L1-Methode.

### Hook / Phaenomen

【首席算法官·第24集/共33集】警报：Tunnel-Lueftung CO 42 ppm。首席算法官下令：“x0 = 6, h = 0.1, Target m = 11.88！”全场红灯闪烁。上一集（Mathe-Rekonstruktion-Symmetrie-Bedingungen-CN-L2.md）的伏笔在此引爆，下一集（Mathe-Sekante-zu-Tangente-DE-L1.md）只给交出最优解的人放行。本集你要在沙盘里亲手把工程从亏损/相撞边缘拉回来：先看现象、再点装备、最后算出让审计点头的 Bilanz。记住：先看区间还是时刻、再选割线还是切线/极值还是向量，做完必做 Gegenprobe——这就是工程帝国法则，也是 Klausur 拿分法则。

Hook / Phaenomen (CAO-Log, Episode 24 von 33): Super-Engineering-Zentrale, Tunnel-Lueftung CO 42 ppm. Der Chief Algorithm Officer ruft: x0 = 6, h = 0.1, Target m = 11.88, die Assistentin meldet Rot-Alarm auf allen Screens. Genau hier entscheidet Rekonstruktion mit Symmetriebedingungen ueber Freigabe oder Sperrung, ueber Kostenexplosion oder Rekordgewinn, ueber Kollision oder gruene Welle. Das Protokoll der Vorwoche (Mathe-Rekonstruktion-Symmetrie-Bedingungen-CN-L2.md) legte die Spur, das naechste Audit (Mathe-Sekante-zu-Tangente-DE-L1.md) laesst keine Ausrede mehr zu. Die Messwerte streuen, die Kurven zittern, doch die Mathematik bleibt unbestechlich: Wer Sekante und Tangente, Maximum und Wendepunkt, Vektor und Ebene richtig liest, rettet das Projekt. In dieser Episode stellst du im Sandbox-Optimierer die Parameter so ein, dass alle Kennzahlen im gruenen Bereich landen. Beobachte zuerst das Phaenomen in Ruhe, benenne dann die Objekte mit exakter Notation, pruefe schliesslich das Ergebnis mit einer Gegenrechnung. Der folgende Weg fuehrt vom Alarmton zur sauberen Klausurloesung: erst das Phaenomen beobachten, dann die Begriffe sichern, dann das Modell rechnen und im Labor bestaetigen.

`Klausur-Satz: Siehe Schritt-Inhalt.`

## Schritt 2 — entdecken: Ausruestungskiste der Algorithmus-Unit
PRETRAINING (Kernbegriffe):

- Achsensymmetrie zur y-Achse: Es gilt $f(-x) = f(x)$; nur gerade Exponenten treten auf.
- Punktsymmetrie zum Ursprung: Es gilt $f(-x) = -f(x)$; nur ungerade Exponenten treten auf.
- Reduzierter Ansatz: Beispielsweise $f(x) = ax^4 + bx^2 + c$ statt $ax^4 + bx^3 + cx^2 + dx + e$.
- Bedingungsgleichung: Jede Eigenschaft (Punkt, Extremum, Wendepunkt) liefert eine Gleichung.
- Kontrolle: Nach der Loesung Symmetrie und alle Bedingungen pruefen.

Klausur-Satz: `Bei Achsensymmetrie zur y-Achse entfallen alle ungeraden, bei Punktsymmetrie zum Ursprung alle geraden Potenzen.`

`Klausur-Satz: Siehe Schritt-Inhalt.`

## Schritt 3 — entdecken: Wirkungskette hinter Rekonstruktion mit Symmetriebedingungen
ENTDECKEN (ein Konzept plus Diagramm):

Symmetrie ist eine Vorabinformation ueber alle Koeffizienten. Wer sie ignoriert, rechnet mit fuenf Unbekannten, obwohl drei genuegen. Der korrekte Weg lautet daher: Symmetrie zuerst lesen, Ansatz sofort reduzieren, erst danach Punkte und Ableitungen einsetzen. So sinkt die Zahl der Gleichungen, und das System bleibt von Hand loesbar. Die Probe muss die Symmetrie bestaetigen: $f(-x) - f(x) = 0$ beziehungsweise $f(-x) + f(x) = 0$.

```diagram
Symmetrie lesen -> Ansatz reduzieren -> Bedingungen einsetzen
achsensymmetrisch: f(x) = ax^4 + bx^2 + c
punktsymmetrisch:  f(x) = ax^3 + bx^2? nein -> f(x) = ax^3 + bx
danach: f(x_0) = y_0, f'(x_E) = 0, f''(x_W) = 0
Kontrolle: Symmetrie + alle Punkte erfuellt?
```

Klausur-Satz: `Der reduzierte Ansatz folgt direkt aus der Symmetrie und bestimmt die Zahl der noch noetigen Bedingungen.`

`Klausur-Satz: Siehe Schritt-Inhalt.`

## Anekdote & Fun-Fact

**Anekdote / Fun-Fact (DE)**: Brueckenboegen und Kuppelprofile werden haeufig symmetrisch entworfen, weil symmetrische Lasten dann einfachere statische Modelle erlauben. Die Mathematik nutzt denselben Vorteil: Symmetrie halbiert den Rechenaufwand.

**Bezug zum Konzept**: `Wie in der Statik reduziert Symmetrie auch bei der Rekonstruktion die Zahl der freien Groessen.`

## Schritt 4 — ausprobieren: Sandbox-Auftrag Fahndung nach Koeffizienten
Kontinuitaet: Vorher Mathe-Rekonstruktion-Symmetrie-Bedingungen-CN-L2.md | Nachher Mathe-Sekante-zu-Tangente-DE-L1.md. Krise dieser Episode: Tunnel-Lueftung CO 42 ppm. Target: x0 = 6, h = 0.1, Target m = 11.88.

BEISPIEL (vollstaendige Musterloesung):

[Werkzeug: box-optimizer]

AUFGABE (berechnen, AFB II): Der Graph einer ganzrationalen Funktion vierten Grades ist achsensymmetrisch zur y-Achse, verlaeuft durch $A(0 \mid 1)$ und $B(1 \mid 0)$ und besitzt an der Stelle $x = 1$ eine waagerechte Tangente. Bestimmen Sie die Funktionsgleichung.

HILFE:
1. Schritt 1: Reduzierten Ansatz $f(x) = ax^4 + bx^2 + c$ mit $f'(x) = 4ax^3 + 2bx$ notieren.
2. Schritt 2: Drei Bedingungen einsetzen: $f(0) = 1$, $f(1) = 0$, $f'(1) = 0$.
3. Schritt 3: System loesen und Symmetrie kontrollieren.

MUSTERLOESUNG: Aus $f(0) = 1$ folgt $c = 1$. Weiter gilt $f(1) = a + b + 1 = 0$ und $f'(1) = 4a + 2b = 0$. Aus $4a + 2b = 0$ folgt $b = -2a$. Einsetzen liefert $a - 2a + 1 = 0$, also $a = 1$ und $b = -2$. Die Funktion lautet $f(x) = x^4 - 2x^2 + 1$. Kontrolle: Nur gerade Exponenten, $f(1) = 0$, $f'(1) = 0$, $f(0) = 1$.

Klausur-Satz: `Aus Symmetrie und drei Bedingungen folgt eindeutig f(x) = x^4 - 2x^2 + 1.`

`Klausur-Satz: Siehe Schritt-Inhalt.`

## Schritt 5 — ausprobieren: Duell der Verfahren Fahndung nach Koeffizienten
VERGLEICH (erst Verfahren waehlen, dann loesen):

VERGLEICH: Waehle erst das Verfahren — (i) Symmetrie-Verfahren (reduzierter Ansatz, weniger Unbekannte) oder (ii) Vollansatz-Verfahren (alle Koeffizienten, mehr Gleichungen noetig) — dann loesen.

Weg A: Erst Verfahren waehlen, dann rechnen.

AUFGABE A: Funktion dritten Grades, punktsymmetrisch zum Ursprung, durch $P(1 \mid 2)$ mit Hochpunkt bei $x = 1$. Welches Verfahren passt?

Weg B: Alternative Route mit Gegenrechnung.

AUFGABE B: Funktion dritten Grades ohne Symmetrieangabe, durch vier allgemeine Punkte gegeben. Welches Verfahren passt?

HILFE: A nennt Punktsymmetrie, also Ansatz $f(x) = ax^3 + bx$ und Verfahren (i). B nennt keine Symmetrie, also Vollansatz und Verfahren (ii).

ANTWORT: A erfordert Verfahren (i): $f(x) = ax^3 + bx$, $f'(x) = 3ax^2 + b$; aus $f(1) = 2$ und $f'(1) = 0$ folgt $a = -1$, $b = 3$, also $f(x) = -x^3 + 3x$. B erfordert Verfahren (ii): Ansatz $f(x) = ax^3 + bx^2 + cx + d$ mit vier Punktgleichungen.

Klausur-Satz: `Mit Symmetrieangabe traegt der reduzierte Ansatz, ohne Symmetrieangabe nur der Vollansatz.`

`Klausur-Satz: Siehe Schritt-Inhalt.`

## Schritt 6 — check: Selbsttest zu Rekonstruktion mit Symmetriebedingungen: Fahndung nach Koeffizienten
CHECK (drei Fragen mit Antworten):

FRAGE: Wie lautet der reduzierte Ansatz bei Achsensymmetrie und Grad 4? | ANTWORT: $f(x) = ax^4 + bx^2 + c$ mit $f'(x) = 4ax^3 + 2bx$.
FRAGE: Wie lautet der reduzierte Ansatz bei Punktsymmetrie und Grad 3? | ANTWORT: $f(x) = ax^3 + bx$ mit $f'(x) = 3ax^2 + b$.
FRAGE: Woran erkennt man nach der Rechnung einen Symmetriefehler? | ANTWORT: Am Auftreten verbotener Exponenten oder an $f(-x) \ne f(x)$ trotz geforderter Achsensymmetrie.

Klausur-Satz: `Der Ansatz muss die Symmetrie bereits enthalten, sonst ist das System ueberbestimmt oder falsch.`

`Klausur-Satz: Siehe Schritt-Inhalt.`

## Fehlvorstellung

1. Fehlvorstellung: Man koenne den Vollansatz nehmen und die Symmetrie spaeter schon irgendwie einbauen.
   Korrektur-Satz: `Wer die Symmetrie nicht vorab in den Ansatz schreibt, rechnet mit ueberfluessigen Unbekannten und erzeugt widerspruechliche Gleichungen.`

2. Fehlvorstellung: Punktsymmetrie zum Ursprung erlaube auch einen konstanten Term $c$.
   Korrektur-Satz: `Punktsymmetrie zum Ursprung schliesst jede gerade Potenz einschliesslich des konstanten Terms aus.`

## Schritt 7 — szenario: Klausurtransfer: Rekonstruktion mit Symmetriebedingungen: Fahndung nach Koeffizienten
ROLLE: Du bist Tutorin und korrigierst eine Rekonstruktion.
SITUATION: Ein Mitschueler legt fuer eine achsensymmetrische Funktion vierten Grades den Ansatz $f(x) = ax^4 + bx^3 + cx^2 + dx + e$ vor und wundert sich ueber fehlende Gleichungen. Erklaere in circa 150 Woertern, wie der korrekte reduzierte Ansatz lautet, welche drei Bedingungen genuegen und wie die Kontrolle aussieht.
RUBRIC (30 XP): Korrekter reduzierter Ansatz (8 XP) | Drei Bedingungen sauber eingesetzt (10 XP) | Loesung mit Kontrolle der Symmetrie (8 XP) | Fachsprachliche Begruendung (4 XP).

`Klausur-Satz: Siehe Schritt-Inhalt.`

## Schritt 8 — reflexion: Takeaway & Reflexion: Fahndung nach Koeffizienten
TAKEAWAY:

Symmetrie zuerst, Ansatz danach: Achsensymmetrie streicht ungerade, Punktsymmetrie streicht gerade Potenzen. Erst dann Punkte und Ableitungen einsetzen.
Takeaway-Satz: `Symmetrie reduziert den Ansatz, der reduzierte Ansatz reduziert das System — erst danach wird gerechnet.`

REFLEXION:
1. Welcher Schritt fiel schwerer — das Uebersetzen der Symmetrie (Schritt 3) oder die Verfahrenswahl (Schritt 5)?
2. Beim naechsten Mal lese ich zuerst die Symmetrieangabe, weil sie den gesamten Ansatz festlegt.

`Klausur-Satz: Siehe Schritt-Inhalt.`
