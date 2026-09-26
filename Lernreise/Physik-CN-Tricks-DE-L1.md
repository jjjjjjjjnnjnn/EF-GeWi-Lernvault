---
fach: Physik
thema: "CN-Tricks: sechs Verfahren fuer die Physik-Klausur"
level: 1
ziel: Klausur
xp: 100
operatoren: [beschreiben, berechnen, begruenden]
klausurrelevant: true
datum: 2026-09-25
tags: [EF, Physik, Methoden]
version: Lesson-v3
---

# Lernreise: CN-Tricks: sechs Verfahren fuer die Physik-Klausur (L1, Ziel Klausur)

<!-- Lesson v3 9-Schritt-Architektur: Schritt 1 bis 8 feste Struktur; Fehlvorstellung zwischen Schritt 6 und 7 (Parser ueberspringt, zaehlt nicht); interaktive [Werkzeug: <id>]; Gating: check/szenario nicht bestanden = Weiter deaktiviert; XP: entdecken 5 / ausprobieren 15 / check 20 / szenario 30 -->

## Schritt 1 — entdecken

ZIELE (diese Lektion in 15 Minuten: danach kannst du):

1. Sechs Loesungsverfahren nennen und jedem den deutschen Klausurschritt zuordnen.
2. Flachenmethode und Einheitenprobe selbstaendig anwenden und gegenpruefen.
3. Zwischen Gesamtsystem und freigeschnittenem Teil entscheiden und die Wahl begruenden.

Klausur-Satz: `Die chinesischen Verfahren liefern nur das Vorgehen; im deutschen Heft wird jeder Schritt zusaetzlich als Ansatz mit Formel und Einheit aufgeschrieben.`

## Schritt 2 — entdecken

PRETRAINING (Kernbegriffe, erst lesen, dann abdecken und aktiv wiedergeben):

- Kraeftediagramm: alle Kraefte als Pfeile mit Richtung, keine zu viel, keine zu wenig.
- System: als Einheit betrachtete Koerpergesamtheit einer Rechnung.
- Flaeche unter der Kurve: Gebiet unter $v$-$t$ als Weg $s$.
- Ersatzkraft: eine Kraft mit gleicher Wirkung wie mehrere Kraefte.
- Dimensionsprobe: Einheitenkontrolle vor dem Einsetzen auf Zieleinheit.

Klausur-Satz: `Erst das Bild, dann die Formel, dann die Zahl — und vor dem Einsetzen wird die Einheit geprueft.`

## Schritt 3 — entdecken

ENTDECKEN (ein Konzept plus Textdiagramm):

Systematik sichert Vollstaendigkeit, Normsprache sichert Punkte. Sechs Verfahren verbinden beides; jedes liefert Vorgehen plus Pruefsatz fuer das Heft.

Trick 1 Kraeftefolge: Reihenfolge Gewicht, Normale, Reibung, Zug; Beispiel $m = 3{,}0\,\mathrm{kg}$, $\alpha = 30^{\circ}$, reibungsfrei: $F_H = m \cdot g \cdot \sin(\alpha) = 3{,}0 \cdot 10 \cdot 0{,}50 = 15\,\mathrm{N}$, $a = F_H/m = 5{,}0\,\mathrm{m/s^2}$. Pruefsatz: `Alle Kraefte werden mit Richtung im Kraeftediagramm dargestellt, dann folgt der Ansatz F_res = m*a.`

Trick 2 Gesamt und Teil: erst System fuer gemeinsames $a$, dann Schnitt fuer Innenkraft; Beispiel $2{,}0$ plus $3{,}0\,\mathrm{kg}$ mit $15\,\mathrm{N}$: $a = 15/5{,}0 = 3{,}0\,\mathrm{m/s^2}$; Schnitt an $3{,}0\,\mathrm{kg}$: $F = 3{,}0 \cdot 3{,}0 = 9{,}0\,\mathrm{N}$. Pruefsatz: `Zuerst wird das Gesamtsystem betrachtet, danach wird am freigeschnittenen Teil die innere Kraft berechnet.`

Trick 3 Flaeche: erst Achse lesen, dann $v$-$t$-Flaeche als Weg; Beispiel $0$ bis $5\,\mathrm{s}$ auf $10\,\mathrm{m/s}$: $s = 0{,}5 \cdot 5 \cdot 10 = 25\,\mathrm{m}$. Pruefsatz: `Die Flaeche unter der v-t-Linie gibt den zurueckgelegten Weg an und wird als Dreiecksflaeche berechnet.`

Trick 4 Ersatz: gleiche Wirkung ersetzen; Beispiel zwei Federn parallel je $D = 30\,\mathrm{N/m}$: $D_{ges} = 60\,\mathrm{N/m}$; $3{,}0\,\mathrm{kg}$ ($30\,\mathrm{N}$): $s = 30/60 = 0{,}50\,\mathrm{m}$. Pruefsatz: `Mehrere Kraefte werden durch eine Ersatzkraft mit gleicher Wirkung ersetzt.`

Trick 5 Einheit: vor Zahlen Einheiten multiplizieren; Beispiel $v = m \cdot s$ traegt $\mathrm{kg \cdot m}$ statt $\mathrm{m/s}$ und scheidet aus; $v = s/t$ traegt $\mathrm{m/s}$. Pruefsatz: `Vor dem Einsetzen wird die Einheit geprueft, weil eine falsche Einheit auf einen falschen Ansatz hinweist.`

Trick 6 Kurzregel: nur mit Bedingung; Beispiel Start aus Ruhe mit $a = 2{,}0\,\mathrm{m/s^2}$: Wege je Sekunde $1{,}0/3{,}0/5{,}0\,\mathrm{m}$ wie $1:3:5$ aus $s_n = a \cdot (2n-1)/2$. Pruefsatz: `Bekannte Kurzregeln werden nur mit genannter Bedingung benutzt und kurz begruendet.`

```diagram
   Kraeftediagramm (Reihenfolge: Gewicht, Normale, Reibung, Zug)
                 F_N ^
                     |
        F_R  <--  [Block]  -->  F_Zug
                     |
                     v  F_G = m*g

   Flaeche unter v-t:
     v ^
       |          .
       |        . |
       |      .   |   Dreieck: s = 0,5 * t * v
       |    .     |
       +--------------> t
        0         5 s
```

Klausur-Satz: `Die sechs Verfahren beschleunigen das Loesen, aber erst der ausgeschriebene Ansatz mit Formel und Einheit macht die Loesung klausurfaehig.`

## Anekdote & Fun-Fact

**Anekdote / Fun-Fact (DE)**: Galileo Galilei soll beim Studium fallender Koerper eine erstaunliche Regel gefunden haben: Legt ein Koerper aus der Ruhe in gleichen Zeitabschnitten immer laengere Strecken zurueck, so verhalten sich diese Strecken wie die ungeraden Zahlen $1:3:5:7$. In der ersten Sekunde also eine Einheit, in der zweiten drei, in der dritten fuenf. Diese ungeraden Zahlen sind bis heute eine bekannte Kurzregel der Kinematik.

**Bezug zum Konzept**: `Die ungeraden Zahlen 1 : 3 : 5 folgen direkt aus s = 0.5*a*t^2 und sind das klassische Beispiel fuer eine Kurzregel mit genannter Bedingung (Start aus der Ruhe).`

## Schritt 4 — ausprobieren

BEISPIEL (Musteraufgabe mit Loesungsweg):

[Werkzeug: lego]

AUFGABE (berechnen, AFB II): Block $m = 5{,}0\,\mathrm{kg}$ auf Tischplatte wird mit $F_{Zug} = 20\,\mathrm{N}$ horizontal gezogen; $\mu = 0{,}20$, $g = 10\,\mathrm{m/s^2}$. Beschreiben Sie das Diagramm, berechnen Sie $a$ und pruefen Sie mit der Dimensionsprobe.

HILFE:
1. Diagramm: Gewicht nach unten, Normale nach oben, Zug nach rechts, Reibung nach links.
2. Ansatz senkrecht $F_N = m \cdot g$; waagerecht $F_{res} = F_{Zug} - \mu \cdot F_N = m \cdot a$.
3. Zahlen einsetzen und Einheit auf $\mathrm{m/s^2}$ pruefen.

MUSTERLOESUNG: Das Bild enthaelt vier Kraefte: $F_G = m \cdot g = 5{,}0 \cdot 10 = 50\,\mathrm{N}$ nach unten, $F_N = 50\,\mathrm{N}$ nach oben, $F_{Zug} = 20\,\mathrm{N}$ nach rechts, $F_R = \mu \cdot F_N = 0{,}20 \cdot 50 = 10\,\mathrm{N}$ nach links. Senkrecht Gleichgewicht, waagerecht $F_{res} = 20 - 10 = 10\,\mathrm{N}$. Damit $a = F_{res}/m = 10/5{,}0 = 2{,}0\,\mathrm{m/s^2}$. Probe: $[F_{res}/m] = (\mathrm{kg \cdot m/s^2})/\mathrm{kg} = \mathrm{m/s^2}$; Groessenordnung plausibel.

Klausur-Satz: `Aus dem vollstaendigen Kraeftediagramm folgt fuer den Block mit F_res = 10 N eine Beschleunigung von 2,0 m/s^2, und die Dimensionsprobe bestaetigt den Ansatz.`

## Schritt 5 — ausprobieren

VERGLEICH (zwei Verfahren unterscheiden):

VERGLEICH: Waehle zuerst das Verfahren — (i) Ganzheits-Verfahren (mehrere Koerper als System: $a = F_{aussen}/m_{ges}$ fuer gemeinsames Tempo) oder (ii) Isolations-Verfahren (einen Koerper freischneiden: $F_{innen} = m_{Teil} \cdot a$ fuer Wechselkraft) — dann loesen.

AUFGABE A: Zwei Wagen ($m_1 = 2{,}0\,\mathrm{kg}$, $m_2 = 4{,}0\,\mathrm{kg}$) werden reibungsfrei mit $F = 12\,\mathrm{N}$ gezogen; gesucht ist gemeinsames $a$. Welches Verfahren?

AUFGABE B: Bei denselben Wagen ist die Seilkraft gefragt. Welches Verfahren?

HILFE: A fragt Systemtempo, also Verfahren (i) mit $a = F/(m_1 + m_2)$. B fragt Kraft zwischen Wagen, also Verfahren (ii) mit Schnitt und $F_{innen} = m_{Teil} \cdot a$. Faustregel: Tempo des Ganzen verlangt System, Kraft dazwischen verlangt Schnitt.

ANTWORT: A erfordert Verfahren (i): $m_{ges} = 2{,}0 + 4{,}0 = 6{,}0\,\mathrm{kg}$, $a = F/m_{ges} = 12/6{,}0 = 2{,}0\,\mathrm{m/s^2}$. B erfordert Verfahren (ii): Schnitt am hinteren Wagen ($4{,}0\,\mathrm{kg}$): $F_{Seil} = m_2 \cdot a = 4{,}0 \cdot 2{,}0 = 8{,}0\,\mathrm{N}$. Kontrolle vorn: $12 - 8{,}0 = 4{,}0\,\mathrm{N} = m_1 \cdot a$.

Klausur-Satz: `Die gemeinsame Beschleunigung folgt aus dem Gesamtsystem, die innere Seilkraft dagegen erst nach dem Freischneiden eines einzelnen Wagens.`

## Schritt 6 — check

CHECK (Selbsttest, 3 Fragen mit Antworten):

FRAGE: In welcher Reihenfolge stehen Kraefte im Diagramm? | ANTWORT: Gewicht, Normale, Reibung, dann aeussere Zugkraft.
FRAGE: Wann Gesamt-, wann Schnittverfahren? | ANTWORT: Gesamt fuer gemeinsames $a$ des Systems, Schnitt fuer innere Kraft zwischen Teilen.
FRAGE: Was leistet die Dimensionsprobe, was nicht? | ANTWORT: Sie prueft die Ergebniseinheit; falsche Faktoren oder Bedingungen erkennt sie nicht.

Klausur-Satz: `Das Ganzheitsverfahren liefert die gemeinsame Beschleunigung, das Isolationsverfahren die innere Kraft, und die Dimensionsprobe kontrolliert beide Ansaetze ueber die Einheit.`

## Fehlvorstellung

(kein Schritt; wird vom Parser automatisch erkannt und nicht mitgezaehlt)

1. Fehlannahme: Mehr Pfeile im Diagramm sichern Punkte.
   Korrektur: Jeder Pfeil braucht einen Verursacher; erfundene Kraefte ohne Koerper erzeugen falschen Ansatz. Vier Schritte pruefen und Pfeile zaehlen.
   Korrektur-Satz: `Jeder Kraftpfeil braucht einen Verursacher; ueberzaehlige Kraefte im Diagramm fuehren zu einem falschen Ansatz.`
2. Fehlannahme: Richtige Einheit garantiere richtige Zahl.
   Korrektur: Einheit ist nur notwendig. Beispiel $a \cdot t^2$ statt $0{,}5 \cdot a \cdot t^2$ traegt ebenfalls $\mathrm{m}$ bei doppeltem Wert; Bedingung und Groessenordnung muessen folgen.
   Korrektur-Satz: `Die Dimensionsprobe ist nur eine notwendige Bedingung und ersetzt nicht die Pruefung von Bedingung und Groessenordnung.`

## Schritt 7 — szenario

ROLLE: Du bist Nachhilfelehrerin und bringst einer Schuelergruppe die sechs Verfahren als Lernstrategie fuer die Physik-Klausur naeher.
SITUATION: Die Gruppe rechnet schnell, verliert aber Punkte durch fehlende Ansaetze und Luecken im Diagramm. Erklaere in zusammenhaengender Stellungnahme (ca. 150 Woerter), wie Tempo und Formkorrektheit ueber Ansatz, Einheit und Diagramm zusammenkommen.
RUBRIC (30 XP): Drei Verfahren deutschen Schritten zugeordnet (10 XP) | Warum Ansatz Punkte sichert (10 XP) | Beispiel Gesamt gegen Schnitt (5 XP) | Adressatengerechte Fachsprache (5 XP).

## Schritt 8 — entdecken

TAKEAWAY (Kernzusammenfassung):

Bild vor Formel, Ganzes vor Teil, Flaeche vor Zahl — und zu jedem Verfahren Ansatz mit Einheit. Kraeftefolge sichert Vollstaendigkeit, Systemwahl trennt aussen und innen, Flaeche beschleunigt Lesen, Ersatz vereinfacht, Einheit prueft Richtung, Kurzregel spart Zeit nur mit Bedingung.
Takeaway-Satz: `Bild vor Formel, Ganzes vor Teil, Flaeche vor Zahl — und zu jedem Verfahren wird der Ansatz mit Einheit ausgeschrieben.`

REFLEXION (2 Fragen):
1. Selbstbeobachtung: Welcher Schritt fiel schwerer — das vollstaendige Kraeftediagramm (Schritt 4) oder die Wahl zwischen Ganzheits- und Isolationsverfahren im Vergleich (Schritt 5)?
2. Planung: Beim naechsten Mal zeichne ich zuerst das Kraeftediagramm und pruefe die Einheit, bevor ich Zahlen einsetze.
