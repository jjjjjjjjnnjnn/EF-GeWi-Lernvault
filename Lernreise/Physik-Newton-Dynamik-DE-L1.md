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

<!-- Campaign: Mars-Mission | Episode 27/28 | Krise: Sol-134 Bodenstation-Uplink nur 2,1 kbit/s | Target: v0 = 429 m/s, a = 5.5 m/s2, Ziel s = 1799 m | Tool: schiefe-ebene -->

## Schritt 1 — entdecken: Tricks der Navigatorin
ZIELE (drei messbare Ziele dieser Lektion):

1. $F_{res} = m \cdot a$ nennen und an $m = 2{,}0\,\mathrm{kg}$, $F_{res} = 10\,\mathrm{N}$ zu $a = 5{,}0\,\mathrm{m/s^2}$ ausrechnen.
2. $F_G = m \cdot g$ an $\alpha = 30^\circ$ in $F_H = m g \sin(\alpha)$ und $F_N = m g \cos(\alpha)$ zerlegen und mit $\mu$ zu $F_{res}$ addieren.
3. Zwischen $F_{res} = 0$ zu $a = 0$ und $F_{res} = m a$ entscheiden und den Ansatz mit Kraeftediagramm begruenden.

###

### Hook / Phaenomen

Hook / Phaenomen (Sol-Logbuch, Episode 27 von 28): Mars-Anflug, Sol-134 Bodenstation-Uplink nur 2,1 kbit/s. Navigatorin Lena meldet: v0 = 429 m/s, a = 5.5 m/s2, Ziel s = 1799 m, Mechaniker Tom ruft: Halte die Kurve! Der Bordcomputer geht auf Rot, das Funkgeraet rauscht, die Crew haelt den Atem an. Genau hier entscheidet Newtonsche Gesetze: Kraftzerlegung und Reibung ueber Landung oder Absturz, ueber Festfahren oder Weiterfahrt, ueber Andocken oder Abprall. Das Logbuch des vorherigen Sols (Physik-Kinematik-Messung-L1.md) warnte bereits vor diesem Moment, und das naechste Fenster (Physik-Newton-Dynamik-L1.md) oeffnet sich nur, wenn diese Aufgabe geloest wird. Die Sensoren streuen, die Diagramme zittern, doch die Physik bleibt unbestechlich: Wer Steigung und Flaeche, Kraft und Gegenkraft, Schwung und Stoss richtig liest, rettet die Mission. In dieser Episode stellst du im Sandbox-Labor die Brems- und Gleitzahlen so ein, dass die Kapsel sicher durchkommt. Beobachte zuerst das Phaenomen in Ruhe, benenne dann die Groessen mit exakten Einheiten, pruefe schliesslich die Bilanz mit einer Gegenrechnung. Der folgende Weg fuehrt vom Alarmton zur sauberen Klausurloesung: erst das Phaenomen beobachten, dann die Begriffe sichern, dann das Modell rechnen und im Labor bestaetigen.

`Klausur-Satz: Siehe Schritt-Inhalt.`

## Schritt 2 — entdecken: Ausruestungskiste der Mars-Crew
PRETRAINING-Box (fuenf Kernbegriffe mit Definitionen):

### Hook / Phaenomen

Fuenf Begriffe trennen in dieser Lektion Alltagssprache von Klausursprache. Wer sie aktiv wiedergeben kann, liest jede Aufgabe schneller und waehlt sofort das richtige Verfahren.

### Fachbegriffe & Definitionen

- **Kraeftezerlegung:** Die Gewichtskraft zerfaellt in Hangabtrieb $F_H=mg\sin(\alpha)$ und Normalkraft $F_N=mg\cos(\alpha)$. Mechanismus: Parallelogramm am Hang zeichnen und Komponenten ablesen. Klausur-Punkt: Zerlegung skizzieren und beide Anteile mit Winkelformel angeben.
- **Zweites Axiom:** Die Gleichung $F=m\cdot a$ verknuepft resultierende Kraft mit Beschleunigung. Mechanismus: Kraeftebilanz bilden und nach $a$ aufloesen. Klausur-Punkt: Resultierende statt Einzelkraft einsetzen.
- **Reibung:** Die Gegenkraft $F_R=\mu F_N$ bremst proportional zur Normalkraft. Mechanismus: $F_N$ bestimmen und mit $\mu$ multiplizieren. Klausur-Punkt: Richtung gegen die Bewegung nennen und $\mu$-Typ unterscheiden.
- **Kraeftegleichgewicht:** Bei $F_{res}=0$ herrscht Ruhe oder gleichfoermige Bewegung ohne Beschleunigung. Mechanismus: Alle Kraefte summieren und null pruefen. Klausur-Punkt: Gleichgewicht als $a=0$ deuten.
- **s-t- und v-t-Deutung:** Die Diagramme verraten $a$ als Kruemmung oder Steigung der Bewegung. Mechanismus: Parabel gegen Gerade und Gerade gegen Horizontale lesen. Klausur-Punkt: Diagrammform der Kraftsituation zuordnen.

### Wirkungsgefuege / Modell

Die Kette verbindet alle fuenf Begriffe zu einem Verfahren: Erkennen, Einordnen, Aufstellen, Loesen und Deuten. Jeder Begriff traegt genau einen Schritt, gemeinsam sichern sie die volle Punktzahl.

Klausur-Satz: `Die Gewichtskraft wird an der schiefen Ebene in die Hangabtriebskraft und die Normalkraft zerlegt, wobei F_H = m*g*sin(alpha) und F_N = m*g*cos(alpha) gilt.`

`Klausur-Satz: Siehe Schritt-Inhalt.`

## Schritt 3 — entdecken: Wirkungskette hinter Newtonsche Gesetze: Kraftzerlegung und Reibung
EXPERIMENTELLE ERKUNDUNG (Sandbox, erst spielen, dann deuten):

### Hook & Phaenomen

Die Sandbox macht das Unsichtbare sichtbar: Stelle Groessen ein, beobachte Kurven und lies Werte ab, bevor eine einzige Formel faellt. Erst die Anschauung, dann die Deutung, erst das Spiel, dann das Gesetz.

### Spiel-Aufgabe / Challenge

Oeffne die Sandbox aus Schritt 4, variiere die zentralen Parameter in kleinen Schritten und notiere je Stufe Kurvenform und Messwert. Formuliere aus drei Stufen eine erste Vermutung ueber den Zusammenhang.

### Aha-Moment & Gesetz

Die Kausalkette laeuft vom Hang ueber die Bilanz zur Bewegung: Zuerst zerlegt man $mg$ in $F_H=mg\sin(\alpha)$ und $F_N=mg\cos(\alpha)$, dann bildet man $F_{res}=F_H-F_R$ mit $F_R=\mu F_N$, schliesslich liefert $F_{res}=m\cdot a$ die Beschleunigung. Steilerer Winkel vergroessert $F_H$ und verkleinert $F_N$, daher waechst $a$ ueberproportional mit $\alpha$. Ohne Zerlegung bleibt jede Hangaufgabe ratebar, mit Zerlegung wird sie rechenbar.

```diagram
+------------------------------------------+
| mg senkrecht -> FH = mg sin(a) hangab   |
|               -> FN = mg cos(a) normal  |
| Fres = FH - FR mit FR = my FN           |
| Fres = m a  ->  a aus Bilanz            |
+------------------------------------------+
```
Formelkern: $mg$

Klausur-Satz: `Die resultierende Kraft laengs der schiefen Ebene ist F_res = m*g*sin(alpha) - mu*m*g*cos(alpha), woraus a = g*(sin(alpha) - mu*cos(alpha)) folgt.`

`Klausur-Satz: Siehe Schritt-Inhalt.`

## Anekdote & Fun-Fact
**Anekdote / Fun-Fact (DE)**: Auf dem Mond liess der Astronaut David Scott 1971 eine Feder und einen Hammer gleichzeitig aus gleicher Hoehe fallen — und beide erreichten den Boden im selben Moment. Da der Mond keine Atmosphaere hat, wirkte keine Luftreibung, und man sah direkt: Die Fallbeschleunigung haengt nicht von der Masse ab. Genau deshalb kuerzt sich $m$ in $a = g \cdot \sin(\alpha)$ heraus.

**Bezug zum Konzept**: `Da die Fallbeschleunigung nicht von der Masse abhaengt, kuerzt sich m in F_res = m*a heraus — genau das zeigte der Hammer-Feder-Versuch auf dem Mond.`

## Schritt 4 — ausprobieren: Sandbox-Auftrag Tricks der Navigatorin
Kontinuitaet: Vorher Physik-Kinematik-Messung-L1.md | Nachher Physik-Newton-Dynamik-L1.md. Krise dieser Episode: Sol-134 Bodenstation-Uplink nur 2,1 kbit/s. Target: v0 = 429 m/s, a = 5.5 m/s2, Ziel s = 1799 m.

BEISPIEL (Sandbox Level mit Werkzeug):

[Werkzeug: schiefe-ebene]

AUFGABE (Levelziel, AFB II): Knacke das Hang-Level: Ziehe im Sandbox-Labor den Neigungswinkel $\alpha$ von flach bis steil und die Reibungszahl $\mu$ von glatt bis rau und beobachte, wie Hangabtrieb, Normalkraft und Beschleunigung live folgen. Miss $a$ bei zwei Winkeln, berechne dann exakt per Zerlegung und $F=m\cdot a$ und vergleiche Labor mit Rechnung. Erklaere in einem Satz die Winkelwirkung.

HILFE:
1. Stelle $\alpha$ und $\mu$ ein und lies Hangabtrieb, Normalkraft und $a$ im Labor ab.
2. Rechne $F_H = mg\sin(\alpha)$, $F_N = mg\cos(\alpha)$ und $F_{res} = F_H-\mu F_N$.
3. Bilde $a = F_{res}/m$, gleiche mit dem Labor ab und deute die Winkelwirkung.

MUSTERLOESUNG: Labor zeigt $a$ wachsend mit $\alpha$ und fallend mit $\mu$. Rechnung $F_H=mg\sin(\alpha)$ minus $F_R=\mu mg\cos(\alpha)$ liefert $F_{res}$ und per $F=m\cdot a$ exakt das Labor-$a$. Steilerer Winkel vergroessert den Hanganteil und verkleinert zugleich die Reibung, daher waechst $a$ ueberproportional mit dem Winkel.

Klausur-Satz: `Mit der Zerlegung der Gewichtskraft und der Gleitreibung ergibt sich fuer den Kasten eine Beschleunigung von etwa 3,3 m/s^2 und nach 2,0 m eine Geschwindigkeit von etwa 3,6 m/s.`

`Klausur-Satz: Siehe Schritt-Inhalt.`

## Schritt 5 — ausprobieren: Duell der Verfahren Tricks der Navigatorin
VERGLEICH (zwei Verfahren unterscheiden):

VERGLEICH: Waehle zuerst das Verfahren — (i) Gleichgewichts-Verfahren ($a = 0$, also $F_{res} = 0$; bei Ruhe oder gleichfoermiger Bewegung) oder (ii) Aktions-Verfahren ($a \neq 0$, also $F_{res} = m \cdot a$; bei Beschleunigung, Geschwindigkeit oder Zeit) — dann loesen.

Weg A: Erst Verfahren waehlen, dann rechnen.

AUFGABE A: Ein Kasten liegt auf einer schiefen Ebene mit $\alpha = 20^{\circ}$. Der Haftreibungskoeffizient ist so gross, dass der Kasten in Ruhe bleibt. Welches Verfahren ist zu waehlen, und welche Aussage gilt?

Weg B: Alternative Route mit Gegenrechnung.

AUFGABE B: Derselbe Kasten liegt nun auf einer steileren, glatteren Ebene und rutscht sichtbar beschleunigt hinab. Welches Verfahren ist zu waehlen, und wie lautet der Ansatz?

HILFE: A bleibt in Ruhe, also $a = 0$ und Verfahren (i) mit Kraeftegleichgewicht $F_{res} = 0$. B rutscht beschleunigt, also $a \neq 0$ und Verfahren (ii) mit $F_H - F_R = m \cdot a$. Faustregel: Ruhe oder gleichfoermige Bewegung verlangt Gleichgewicht, beschleunigte Bewegung verlangt das zweite Gesetz.

ANTWORT: A erfordert Verfahren (i): Bei $a = 0$ herrscht Kraeftegleichgewicht laengs der Ebene, die Haftreibung $F_{R,h}$ ist gerade so gross wie $F_H = m \cdot g \cdot \sin(20^{\circ})$, sodass $F_{res} = 0$ und der Kasten in Ruhe bleibt. B erfordert Verfahren (ii): Die Hangabtriebskraft uebersteigt die Gleitreibung, es gilt $F_{res} = m \cdot g \cdot \sin(\alpha) - \mu \cdot m \cdot g \cdot \cos(\alpha) = m \cdot a$, also $a = g \cdot (\sin(\alpha) - \mu \cdot \cos(\alpha))$ unabhaengig von der Masse.

Klausur-Satz: `Solange die Haftreibung die Hangabtriebskraft ausgleicht, gilt a = 0 und Kraeftegleichgewicht; uebersteigt die Hangabtriebskraft die Gleitreibung, beschleunigt der Koerper nach F_res = m*a.`

`Klausur-Satz: Siehe Schritt-Inhalt.`

## Schritt 6 — check: Selbsttest zu Newtonsche Gesetze: Kraftzerlegung und Reibung: Tricks der Navigatorin
CHECK (Selbsttest, 3 Fragen mit Antworten):

FRAGE: Wie lautet das zweite Newtonsche Gesetz als Gleichung? | ANTWORT: $F_{res} = m \cdot a$, die resultierende Kraft ist gleich Masse mal Beschleunigung.
FRAGE: Warum ist die Beschleunigung auf einer reibungsfreien schiefen Ebene unabhaengig von der Masse? | ANTWORT: Weil sich die Masse in $F_H = m \cdot g \cdot \sin(\alpha)$ und in $F_{res} = m \cdot a$ herauskuerzt, sodass $a = g \cdot \sin(\alpha)$ gilt.
FRAGE: Wie zerlegt man die Gewichtskraft an der schiefen Ebene? | ANTWORT: In $F_H = m \cdot g \cdot \sin(\alpha)$ parallel zur Ebene und $F_N = m \cdot g \cdot \cos(\alpha)$ senkrecht zur Ebene.

Klausur-Satz: `Da sich die Masse beim Einsetzen in F_res = m*a herauskuerzt, ist die Beschleunigung an der reibungsfreien schiefen Ebene allein durch den Neigungswinkel bestimmt.`

`Klausur-Satz: Siehe Schritt-Inhalt.`

## Fehlvorstellung
(kein Schritt; wird vom Parser automatisch erkannt und nicht mitgezaehlt)

1. Fehlannahme: Kraft erhalte die Bewegung; ohne Kraft bleibe ein Koerper stehen.
   Korrektur: Kraft aendert die Geschwindigkeit, sie erhaelt sie nicht. Ein stehenbleibender Schlitten wird durch Reibung als entgegengesetzte resultierende Kraft abgebremst.
   Korrektur-Satz: `Eine Kraft aendert die Geschwindigkeit, sie erhaelt sie nicht: Ohne resultierende Kraft bewegt sich ein Koerper gleichfoermig geradeaus weiter.`
2. Fehlannahme: Die Normalkraft $F_N$ sei immer gleich der Gewichtskraft $F_G = m \cdot g$.
   Korrektur: Nur auf horizontaler Ebene gilt Gleichheit. An der schiefen Ebene gilt $F_N = m \cdot g \cdot \cos(\alpha)$; je steiler die Ebene, desto kleiner $F_N$ und die Reibung.
   Korrektur-Satz: `An der schiefen Ebene gilt F_N = m*g*cos(alpha), denn nur ein Teil der Gewichtskraft wirkt senkrecht auf die Unterlage.`

## Schritt 7 — szenario: Klausurtransfer: Newtonsche Gesetze: Kraftzerlegung und Reibung: Tricks der Navigatorin
ROLLE: Du bist Mitglied einer Schuelerforschungsgruppe, die einen Rampenversuch fuer den Tag der offenen Tuer plant.
SITUATION: Auf einer Rampe mit $\alpha = 25^{\circ}$ soll ein Kasten ($m = 3{,}0\,\mathrm{kg}$) kontrolliert hinabgleiten. Die Gruppe diskutiert, ob eine bestimmte Oberflaeche geeignet ist: Bei zu grosser Reibung rutscht der Kasten nicht an, bei zu kleiner Reibung wird er zu schnell. Beurteile in einer zusammenhaengenden Stellungnahme (ca. 150 Woerter), wovon die Beschleunigung abhaengt und wie die Reibung das Ergebnis beeinflusst. Nutze $g = 10\,\mathrm{m/s^2}$.
RUBRIC (30 XP): Benennung der zerlegten Kraefte $F_H$ und $F_N$ mit Formel (5 XP) | Aufstellen der Bewegungsgleichung $F_{res} = F_H - F_R = m \cdot a$ (10 XP) | Nachweis der Massenunabhaengigkeit mit Zahlenrechnung (10 XP) | Kriteriengeleitetes Urteil zur Eignung der Oberflaeche mit Einheit (5 XP).

`Klausur-Satz: Siehe Schritt-Inhalt.`

## Schritt 8 — reflexion: Takeaway & Reflexion: Tricks der Navigatorin
TAKEAWAY (Kernzusammenfassung):

Zuerst das Kraeftediagramm, dann die resultierende Kraft, dann $a = F_{res}/m$. An der schiefen Ebene zerlegt man die Gewichtskraft in $m \cdot g \cdot \sin(\alpha)$ und $m \cdot g \cdot \cos(\alpha)$. Vor jeder Rechnung wird geprueft, ob $a$ null ist: Bei null gilt Gleichgewicht, sonst das zweite Gesetz. Die Masse kuertzt sich haeufig heraus, das ist das Kennzeichen der schiefen Ebene.
Takeaway-Satz: `Zuerst das Kraeftediagramm, dann die resultierende Kraft, dann a = F_res/m — an der schiefen Ebene zerlegt man die Gewichtskraft in m*g*sin(alpha) und m*g*cos(alpha).`

REFLEXION (2 Fragen):
1. Selbstbeobachtung: Welcher Schritt fiel schwerer — die Kraeftezerlegung mit Sinus und Kosinus (Schritt 4) oder die Entscheidung zwischen Gleichgewicht und Aktionsprinzip im Vergleich (Schritt 5)?
2. Planung: Beim naechsten Mal zeichne ich zuerst das Kraeftediagramm und pruefe, ob die Beschleunigung null ist, bevor ich eine Gleichung aufstelle.

`Klausur-Satz: Siehe Schritt-Inhalt.`
