---
fach: Physik
thema: "Newtonsche Gesetze: Kraftzerlegung und Reibung"
level: 1
ziel: Klausur
xp: 100
operatoren: [beschreiben, berechnen, begruenden, analysieren]
klausurrelevant: true
datum: 2026-09-25
tags: [EF, Physik, Dynamik]
version: Lesson-v3
---

# Lernreise: Newtonsche Gesetze: Kraftzerlegung und Reibung (L1, Ziel Klausur)

<!-- Lesson v3 9-Schritt-Architektur: Schritt 1 bis 8 feste Struktur; Fehlvorstellung zwischen Schritt 6 und 7 (Parser ueberspringt, zaehlt nicht); interaktive [Werkzeug: <id>]; Gating: check/szenario nicht bestanden = Weiter deaktiviert; XP: entdecken 5 / ausprobieren 15 / check 20 / szenario 30 -->

## Schritt 1 — entdecken

ZIELE (diese Lektion in 15 Minuten: danach kannst du):

1. Das zweite Newtonsche Gesetz nennen und anwenden: Die Beschleunigung folgt aus $F_{res} = m \cdot a$, die Kraft erzeugt Beschleunigung und erhaelt keine Geschwindigkeit.
2. Die Gewichtskraft an der schiefen Ebene zerlegen in $F_H = m \cdot g \cdot \sin(\alpha)$ und $F_N = m \cdot g \cdot \cos(\alpha)$ und daraus mit Reibung die resultierende Kraft bestimmen.
3. Zwischen Gleichgewicht ($a = 0$, also $F_{res} = 0$) und beschleunigter Bewegung ($F_{res} = m \cdot a$) entscheiden und den passenden Ansatz waehlen.

Klausur-Satz: `Nach dem zweiten Newtonschen Gesetz ist die Beschleunigung eines Koerpers direkt proportional zur resultierenden Kraft und umgekehrt proportional zu seiner Masse.`

## Schritt 2 — entdecken

PRETRAINING (Kernbegriffe, erst lesen, dann abdecken und aktiv wiedergeben):

- Resultierende Kraft: $F_{res}$ in $\mathrm{N}$; Vektorsumme aller Kraefte, sie bestimmt Betrag und Richtung von $a$.
- Gewichtskraft: $F_G = m \cdot g$ in $\mathrm{N}$; wirkt senkrecht nach unten und ist Ausgang jeder Zerlegung.
- Hangabtriebskraft: $F_H = m \cdot g \cdot \sin(\alpha)$ in $\mathrm{N}$; Komponente parallel zur Ebene, hangabwaerts.
- Normalkraft: $F_N = m \cdot g \cdot \cos(\alpha)$ in $\mathrm{N}$; Komponente senkrecht in die Ebene, sie bestimmt die Reibung.
- Reibungskraft: $F_R = \mu \cdot F_N$ in $\mathrm{N}$; wirkt der Relativbewegung entgegen, $\mu$ ist der Reibungskoeffizient.

Klausur-Satz: `Die Gewichtskraft wird an der schiefen Ebene in die Hangabtriebskraft und die Normalkraft zerlegt, wobei F_H = m*g*sin(alpha) und F_N = m*g*cos(alpha) gilt.`

## Schritt 3 — entdecken

ENTDECKEN (ein Konzept plus Textdiagramm):

Die Dynamik beantwortet eine Frage: Warum bewegt sich ein Koerper so? Antwort: Die resultierende Kraft bestimmt die Beschleunigung, die Beschleunigung aendert die Geschwindigkeit. Das Vorgehen beginnt stets mit dem Kraeftediagramm in fester Reihenfolge: Gewichtskraft, dann Stuetz- oder Zugkraefte, dann Reibung, dann aeussere Kraefte. An der schiefen Ebene wird die Gewichtskraft in zwei Richtungen zerlegt: parallel zur Ebene $F_H = m \cdot g \cdot \sin(\alpha)$ und senkrecht zur Ebene $F_N = m \cdot g \cdot \cos(\alpha)$. Aus $F_N$ folgt die Gleitreibung $F_R = \mu \cdot F_N$. Die Kraefte laengs der Bewegungsrichtung addieren sich zu $F_{res}$, daraus folgt $a = F_{res}/m$. Ohne Reibung gilt $a = g \cdot \sin(\alpha)$, unabhaengig von der Masse. Bei $F_{res} = 0$ liegt Gleichgewicht mit $a = 0$ vor, also der Fall des ersten Newtonschen Gesetzes. Das dritte Gesetz (actio gleich reactio) beschreibt Kraeftepaare an zwei Koerpern und darf nicht mit dem Kraeftegleichgewicht an einem Koerper verwechselt werden.

```diagram
      F_N  ^  (senkrecht zur Ebene)
           |
   F_R <--[Block]--> F_H   (F_H parallel, hangabwaerts)
           |
           v  F_G = m*g   (senkrecht nach unten)

   Zerlegung an der schiefen Ebene:
     F_H = m*g*sin(alpha)    (parallel, hangabwaerts)
     F_N = m*g*cos(alpha)    (senkrecht in die Ebene)
     F_R = mu*F_N            (Gleitreibung, der Bewegung entgegen)

   Bewegungsgleichung:  F_res = F_H - F_R = m*a
                        a = g*(sin(alpha) - mu*cos(alpha))
```

Klausur-Satz: `Die resultierende Kraft laengs der schiefen Ebene ist F_res = m*g*sin(alpha) - mu*m*g*cos(alpha), woraus a = g*(sin(alpha) - mu*cos(alpha)) folgt.`

## Anekdote & Fun-Fact

**Anekdote / Fun-Fact (DE)**: Auf dem Mond liess der Astronaut David Scott 1971 eine Feder und einen Hammer gleichzeitig aus gleicher Hoehe fallen — und beide erreichten den Boden im selben Moment. Da der Mond keine Atmosphaere hat, wirkte keine Luftreibung, und man sah direkt: Die Fallbeschleunigung haengt nicht von der Masse ab. Genau deshalb kuerzt sich $m$ in $a = g \cdot \sin(\alpha)$ heraus.

**Bezug zum Konzept**: `Da die Fallbeschleunigung nicht von der Masse abhaengt, kuerzt sich m in F_res = m*a heraus — genau das zeigte der Hammer-Feder-Versuch auf dem Mond.`

## Schritt 4 — ausprobieren

BEISPIEL (Musteraufgabe mit Loesungsweg):

[Werkzeug: balance]

AUFGABE (berechnen, AFB II): Ein Kasten der Masse $m = 4{,}0\,\mathrm{kg}$ rutscht aus der Ruhe eine schiefe Ebene mit dem Neigungswinkel $\alpha = 30^{\circ}$ hinab. Der Gleitreibungskoeffizient betraegt $\mu = 0{,}20$, es gilt $g = 10\,\mathrm{m/s^2}$, $\sin(30^{\circ}) = 0{,}50$ und $\cos(30^{\circ}) = 0{,}87$. Berechnen Sie die Beschleunigung $a$ des Kastens und die Geschwindigkeit nach $s = 2{,}0\,\mathrm{m}$.

HILFE:
1. Zerlege die Gewichtskraft: $F_H = m \cdot g \cdot \sin(\alpha)$, $F_N = m \cdot g \cdot \cos(\alpha)$.
2. Bestimme die Reibung $F_R = \mu \cdot F_N$ und daraus $F_{res} = F_H - F_R$.
3. Berechne $a = F_{res}/m$ und danach $v$ aus $v^2 = 2 \cdot a \cdot s$.

MUSTERLOESUNG: Es gilt $F_G = m \cdot g = 4{,}0 \cdot 10 = 40\,\mathrm{N}$. Die Zerlegung ergibt $F_H = 40 \cdot 0{,}50 = 20\,\mathrm{N}$ hangabwaerts und $F_N = 40 \cdot 0{,}87 = 34{,}8\,\mathrm{N}$ in die Ebene. Die Gleitreibung betraegt $F_R = \mu \cdot F_N = 0{,}20 \cdot 34{,}8 = 6{,}96\,\mathrm{N}$ entgegen der Bewegung. Damit ist $F_{res} = F_H - F_R = 20 - 6{,}96 = 13{,}04\,\mathrm{N}$, also $a = F_{res}/m = 13{,}04/4{,}0 = 3{,}26\,\mathrm{m/s^2}$, gerundet $3{,}3\,\mathrm{m/s^2}$. Kontrolle: $a = g \cdot (\sin(\alpha) - \mu \cdot \cos(\alpha)) = 10 \cdot (0{,}50 - 0{,}20 \cdot 0{,}87) = 3{,}26\,\mathrm{m/s^2}$. Nach $s = 2{,}0\,\mathrm{m}$ gilt $v^2 = 2 \cdot a \cdot s = 2 \cdot 3{,}26 \cdot 2{,}0 = 13{,}04\,\mathrm{m^2/s^2}$, also $v = 3{,}6\,\mathrm{m/s}$.

Klausur-Satz: `Mit der Zerlegung der Gewichtskraft und der Gleitreibung ergibt sich fuer den Kasten eine Beschleunigung von etwa 3,3 m/s^2 und nach 2,0 m eine Geschwindigkeit von etwa 3,6 m/s.`

## Schritt 5 — ausprobieren

VERGLEICH (zwei Verfahren unterscheiden):

VERGLEICH: Waehle zuerst das Verfahren — (i) Gleichgewichts-Verfahren ($a = 0$, also $F_{res} = 0$; bei Ruhe oder gleichfoermiger Bewegung) oder (ii) Aktions-Verfahren ($a \neq 0$, also $F_{res} = m \cdot a$; bei Beschleunigung, Geschwindigkeit oder Zeit) — dann loesen.

AUFGABE A: Ein Kasten liegt auf einer schiefen Ebene mit $\alpha = 20^{\circ}$. Der Haftreibungskoeffizient ist so gross, dass der Kasten in Ruhe bleibt. Welches Verfahren ist zu waehlen, und welche Aussage gilt?

AUFGABE B: Derselbe Kasten liegt nun auf einer steileren, glatteren Ebene und rutscht sichtbar beschleunigt hinab. Welches Verfahren ist zu waehlen, und wie lautet der Ansatz?

HILFE: A bleibt in Ruhe, also $a = 0$ und Verfahren (i) mit Kraeftegleichgewicht $F_{res} = 0$. B rutscht beschleunigt, also $a \neq 0$ und Verfahren (ii) mit $F_H - F_R = m \cdot a$. Faustregel: Ruhe oder gleichfoermige Bewegung verlangt Gleichgewicht, beschleunigte Bewegung verlangt das zweite Gesetz.

ANTWORT: A erfordert Verfahren (i): Bei $a = 0$ herrscht Kraeftegleichgewicht laengs der Ebene, die Haftreibung $F_{R,h}$ ist gerade so gross wie $F_H = m \cdot g \cdot \sin(20^{\circ})$, sodass $F_{res} = 0$ und der Kasten in Ruhe bleibt. B erfordert Verfahren (ii): Die Hangabtriebskraft uebersteigt die Gleitreibung, es gilt $F_{res} = m \cdot g \cdot \sin(\alpha) - \mu \cdot m \cdot g \cdot \cos(\alpha) = m \cdot a$, also $a = g \cdot (\sin(\alpha) - \mu \cdot \cos(\alpha))$ unabhaengig von der Masse.

Klausur-Satz: `Solange die Haftreibung die Hangabtriebskraft ausgleicht, gilt a = 0 und Kraeftegleichgewicht; uebersteigt die Hangabtriebskraft die Gleitreibung, beschleunigt der Koerper nach F_res = m*a.`

## Schritt 6 — check

CHECK (Selbsttest, 3 Fragen mit Antworten):

FRAGE: Wie lautet das zweite Newtonsche Gesetz als Gleichung? | ANTWORT: $F_{res} = m \cdot a$, die resultierende Kraft ist gleich Masse mal Beschleunigung.
FRAGE: Warum ist die Beschleunigung auf einer reibungsfreien schiefen Ebene unabhaengig von der Masse? | ANTWORT: Weil sich die Masse in $F_H = m \cdot g \cdot \sin(\alpha)$ und in $F_{res} = m \cdot a$ herauskuerzt, sodass $a = g \cdot \sin(\alpha)$ gilt.
FRAGE: Wie zerlegt man die Gewichtskraft an der schiefen Ebene? | ANTWORT: In $F_H = m \cdot g \cdot \sin(\alpha)$ parallel zur Ebene und $F_N = m \cdot g \cdot \cos(\alpha)$ senkrecht zur Ebene.

Klausur-Satz: `Da sich die Masse beim Einsetzen in F_res = m*a herauskuerzt, ist die Beschleunigung an der reibungsfreien schiefen Ebene allein durch den Neigungswinkel bestimmt.`

## Fehlvorstellung

(kein Schritt; wird vom Parser automatisch erkannt und nicht mitgezaehlt)

1. Fehlannahme: Kraft erhalte die Bewegung; ohne Kraft bleibe ein Koerper stehen.
   Korrektur: Kraft aendert die Geschwindigkeit, sie erhaelt sie nicht. Ein stehenbleibender Schlitten wird durch Reibung als entgegengesetzte resultierende Kraft abgebremst.
   Korrektur-Satz: `Eine Kraft aendert die Geschwindigkeit, sie erhaelt sie nicht: Ohne resultierende Kraft bewegt sich ein Koerper gleichfoermig geradeaus weiter.`
2. Fehlannahme: Die Normalkraft $F_N$ sei immer gleich der Gewichtskraft $F_G = m \cdot g$.
   Korrektur: Nur auf horizontaler Ebene gilt Gleichheit. An der schiefen Ebene gilt $F_N = m \cdot g \cdot \cos(\alpha)$; je steiler die Ebene, desto kleiner $F_N$ und die Reibung.
   Korrektur-Satz: `An der schiefen Ebene gilt F_N = m*g*cos(alpha), denn nur ein Teil der Gewichtskraft wirkt senkrecht auf die Unterlage.`

## Schritt 7 — szenario

ROLLE: Du bist Mitglied einer Schuelerforschungsgruppe, die einen Rampenversuch fuer den Tag der offenen Tuer plant.
SITUATION: Auf einer Rampe mit $\alpha = 25^{\circ}$ soll ein Kasten ($m = 3{,}0\,\mathrm{kg}$) kontrolliert hinabgleiten. Die Gruppe diskutiert, ob eine bestimmte Oberflaeche geeignet ist: Bei zu grosser Reibung rutscht der Kasten nicht an, bei zu kleiner Reibung wird er zu schnell. Beurteile in einer zusammenhaengenden Stellungnahme (ca. 150 Woerter), wovon die Beschleunigung abhaengt und wie die Reibung das Ergebnis beeinflusst. Nutze $g = 10\,\mathrm{m/s^2}$.
RUBRIC (30 XP): Benennung der zerlegten Kraefte $F_H$ und $F_N$ mit Formel (5 XP) | Aufstellen der Bewegungsgleichung $F_{res} = F_H - F_R = m \cdot a$ (10 XP) | Nachweis der Massenunabhaengigkeit mit Zahlenrechnung (10 XP) | Kriteriengeleitetes Urteil zur Eignung der Oberflaeche mit Einheit (5 XP).

## Schritt 8 — entdecken

TAKEAWAY (Kernzusammenfassung):

Zuerst das Kraeftediagramm, dann die resultierende Kraft, dann $a = F_{res}/m$. An der schiefen Ebene zerlegt man die Gewichtskraft in $m \cdot g \cdot \sin(\alpha)$ und $m \cdot g \cdot \cos(\alpha)$. Vor jeder Rechnung wird geprueft, ob $a$ null ist: Bei null gilt Gleichgewicht, sonst das zweite Gesetz. Die Masse kuertzt sich haeufig heraus, das ist das Kennzeichen der schiefen Ebene.
Takeaway-Satz: `Zuerst das Kraeftediagramm, dann die resultierende Kraft, dann a = F_res/m — an der schiefen Ebene zerlegt man die Gewichtskraft in m*g*sin(alpha) und m*g*cos(alpha).`

REFLEXION (2 Fragen):
1. Selbstbeobachtung: Welcher Schritt fiel schwerer — die Kraeftezerlegung mit Sinus und Kosinus (Schritt 4) oder die Entscheidung zwischen Gleichgewicht und Aktionsprinzip im Vergleich (Schritt 5)?
2. Planung: Beim naechsten Mal zeichne ich zuerst das Kraeftediagramm und pruefe, ob die Beschleunigung null ist, bevor ich eine Gleichung aufstelle.
