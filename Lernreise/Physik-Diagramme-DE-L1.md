---
fach: Physik
thema: "Diagramme lesen, zeichnen und Messfehler beurteilen"
level: 1
ziel: Klausur
xp: 100
operatoren: [darstellen, analysieren, interpretieren, beurteilen]
klausurrelevant: true
datum: 2026-09-25
tags: [EF, Physik, Messung]
version: Lesson-v3
---

# Lernreise: Diagramme lesen, zeichnen und Messfehler beurteilen (L1, Ziel Klausur)

<!-- Lesson v3 9-Schritt-Architektur: Schritt 1 bis 8 feste Struktur; Fehlvorstellung zwischen Schritt 6 und 7 (Parser ueberspringt, zaehlt nicht); interaktive [Werkzeug: <id>]; Gating: check/szenario nicht bestanden = Weiter deaktiviert; XP: entdecken 5 / ausprobieren 15 / check 20 / szenario 30 -->

## Schritt 1 — entdecken

ZIELE (diese Lektion in 15 Minuten: danach kannst du):

1. Achsen mit Einheit beschriften, Punkte als Streuung ohne Zickzack und ohne erzwungenen Ursprung zeichnen.
2. $v = \Delta s/\Delta t \approx 0{,}50\,\mathrm{m/s}$ per Zweipunktformel aus der Ausgleichsgeraden bestimmen.
3. Zufall als Streuung beiderseits gegen Systematik als Verschiebung deuten und nur im Rahmen der Unsicherheit urteilen.

### Hook / Phaenomen

Im Jahr 2012 meldete CERN ein Neutrino schneller als Licht — Monate spaeter entpuppte sich ein lockeres Kabel als systematischer Fehler. Alle Punkte lagen zu hoch, die Mittelung half nichts. Ein Wagenversuch mit $v \approx 0{,}50\,\mathrm{m/s}$ stellt dasselbe Raetsel im Kleinen: Streuen die Punkte um die Gerade oder liegen alle daneben — und warum rettet Mitteln nur einen der beiden Fehler?

### Fachbegriff & Definition

Fuer Messungen gilt: **Die Ausgleichsgerade fasst streuende Punkte sinnvoll zusammen; ihre Steigung liefert die Groesse, die Streuung gibt die Unsicherheit an**. Dabei streuen **zufaellige Fehler unsystematisch um die Gerade, systematische verschieben alle Werte gleichsinnig**. Jedes **Urteil gilt nur im Rahmen der Messunsicherheit**.

### Wirkungsgefuege / Modell

Der Mechanismus legt die Gerade durch die Wolke: $s$-$t$ mit $v = \Delta s/\Delta t$ aus zwei fernen Geradenpunkten zu $v \approx 0{,}50\,\mathrm{m/s}$. Zweipunktprobe mit anderem Paar als Kontrolle. Streuung $\pm 0{,}03$ beiderseits zu Zufall per Mittelung klein; Verschiebung $+0{,}10$ einseitig zu Systematik per Startfehler — Mittelung hilft nicht. Ursprung nur bei $t = 0$ zu $s = 0$ physikalisch erzwungen.

Schritt A: Tabelle mit Einheiten und Dezimalstellen anlegen.
Schritt B: Punkte ohne Linie, dann Gerade nach Augenmass legen.
Schritt C: Steigung per Zweipunktformel und Streuung als Unsicherheit lesen.

Klausur-Satz: `Die Ausgleichsgerade fasst die streuenden Messpunkte sinnvoll zusammen; ihre Steigung liefert die gesuchte Groesse, und die Streuung der Punkte gibt die Messunsicherheit an.`

## Schritt 2 — entdecken

PRETRAINING (Kernbegriffe, erst lesen, dann abdecken und aktiv wiedergeben):

### Hook / Phaenomen

Zwei Messreihen — beide mit Mittel $0{,}50\,\mathrm{m/s}$. Eine streut wild, eine liegt ruhig. Der Mittelwert luegt: Nur die Streuung verrraet die Guete. Welche fuenf Begriffe trennen praezise und windige Messung in einem Blick?

### Fachbegriffe & Definitionen

- **Ausgleichsgerade:** Beste Gerade durch gestreute Punkte; Steigung ist die Groesse.
- **Messunsicherheit:** Fehler jeder Ablesung; Aussagen nur innerhalb dieses Rahmens.
- **Zufaelliger Fehler:** Streuung beiderseits; Mittelung verkleinert ihn.
- **Systematischer Fehler:** Gleichsinnige Verschiebung wie spaeter Start; Mittelung hilft nicht.
- **Punktdiagramm:** Nur Punkte ohne Verbindung; Trend statt Zickzack.

### Wirkungsgefuege / Modell

Die Kette sortiert Fehler nach Bild: Punkte oben und unten zu Zufall per $\pm$ und Mittel; alle oben zu Systematik per Versatz und Korrektur. Zickzacklinie zwischen Punkten taeuscht Genauigkeit vor — Daten sind diskret, Trend ist Gerade. Wer Achsen ohne Einheit laesst, verliert den ersten Punkt vor jeder Rechnung.

Klausur-Satz: `Zufaellige Fehler streuen unsystematisch um die Ausgleichsgerade, waehrend systematische Fehler alle Messwerte in dieselbe Richtung verschieben.`

## Schritt 3 — entdecken

ENTDECKEN (ein Konzept plus Textdiagramm):

### Hook / Phaenomen

Ein Schueler zwingt die Gerade durch den Ursprung — obwohl der Wagen bei $t = 0$ schon $0{,}20\,\mathrm{m}$ rollte. Die Steigung kippt, $v$ wird falsch. Sein Nachbar liest $v$ aus zwei nahen Punkten und erntet Rauschen. Wie legt man die Gerade richtig — und warum sichern ferne Zweipunkte plus Achsenprobe jede Steigung?

### Fachbegriff & Definition

Ein **Diagramm ohne beschriftete Achsen samt Einheiten ist wertlos, und eine Messreihe darf nur im Rahmen der Unsicherheit beurteilt werden**. Die **Steigung per $v = \Delta s/\Delta t$ aus fernen Geradenpunkten minimiert Ablesefehler**. Der **Ursprung wird nur bei physikalischem $0$-zu-$0$ erzwungen**.

### Wirkungsgefuege / Modell

Der Tiefenweg sichert $v$ in vier Griffen: Achsen $s$ in $\mathrm{m}$ gegen $t$ in $\mathrm{s}$; Punkte als Punkte; Gerade nach Augenmass ohne Zickzack; $v = (1{,}50-0{,}50)/(3{,}0-1{,}0) = 0{,}50\,\mathrm{m/s}$ aus fernen Punkten. Gegenprobe $(1{,}20-0{,}20)/(2{,}5-0{,}5) = 0{,}50$ bestaetigt. Streuung $\pm 0{,}05$ als Unsicherheit; Urteil nur als $v = 0{,}50 \pm 0{,}05\,\mathrm{m/s}$ mit weil-Satz zur Streuung.

Schritt A: Achsen plus Einheiten und Punkte pruefen.
Schritt B: Gerade legen und ferne Punkte waehlen.
Schritt C: Steigung plus Unsicherheit als Urteil mit weil-Satz schreiben.

```diagram
    s ^
      |                        .   (Messpunkt, gestreut)
      |                     .     /
      |                  .       /  Ausgleichsgerade
      |               .        /    (Steigung = v = 0.50 m/s)
      |            .         .
      |         .       .
      |      .     .
      |   .   .
      +-----------------------------> t
       Achsen mit Einheit, Punkte als
       Punkte, Linie als Ausgleichsgerade

    zufaellig:  Punkte oben UND unten  -> mitteln hilft
    systematisch: alle Punkte zu hoch -> mitteln hilft NICHT
    Probe: (1.50-0.50)/(3.0-1.0) = 0.50 m/s bestaetigt
```

Klausur-Satz: `Ein Diagramm ohne beschriftete Achsen samt Einheiten ist wertlos, und eine Messreihe darf nur im Rahmen der Messunsicherheit beurteilt werden.`

## Anekdote & Fun-Fact

**Anekdote / Fun-Fact (DE)**: Ein beruehmtes Beispiel fuer einen systematischen Fehler ist der Spiegel des Hubble-Weltraumteleskops: Beim Schleifen wurde ein Messgeraet falsch zusammengesetzt, sodass alle Kontrollmessungen in dieselbe Richtung abwichen und der Spiegel eine winzige, aber folgenreiche Fehlform bekam. Der Fehler fiel erst nach dem Start auf und liess sich nicht durch mehr Messen oder Mitteln beseitigen, sondern nur durch eine Korrektur an der Ursache.

**Bezug zum Konzept**: `Der Hubble-Spiegel zeigt, dass ein systematischer Fehler alle Messwerte gleichsinnig verschiebt und nur an seiner Ursache behoben werden kann, nicht durch Mittelung.`

## Schritt 4 — ausprobieren

BEISPIEL (Musteraufgabe mit Loesungsweg):

[Werkzeug: formula]

AUFGABE (analysieren, AFB II): Zu $t = 0, 2, 4, 6, 8\,\mathrm{s}$ werden $s = 0; 1{,}05; 1{,}96; 3{,}05; 3{,}98\,\mathrm{m}$ gemessen. Stellen Sie die Reihe als Punktdiagramm dar, bestimmen Sie die Steigung der Ausgleichsgeraden und beurteilen Sie, ob gleichfoermige Bewegung im Rahmen der Unsicherheit haltbar ist.

HILFE:
1. Punkte in ein $s$-$t$-Diagramm mit Einheiten eintragen und Ausgleichsgerade legen.
2. Steigung mit zwei fernen Punkten als $v = \Delta s / \Delta t$ ablesen.
3. Abweichungen als zufaellig oder systematisch einordnen.

MUSTERLOESUNG: Die Punkte liegen nahezu auf einer Ursprungsgeraden. Mit den Aussenpunkten gilt $v = \Delta s / \Delta t = (3{,}98 - 0)/(8 - 0) = 0{,}4975\,\mathrm{m/s}$, gerundet $0{,}50\,\mathrm{m/s}$. Zwischenwerte stuetzen dies: $1{,}05/2 = 0{,}525$; $1{,}96/4 = 0{,}490$; $3{,}05/6 = 0{,}508$ in $\mathrm{m/s}$, unsystematisch um $0{,}50$ gestreut. Gegen die Gerade $s = 0{,}50 \cdot t$ liegt $t = 2\,\mathrm{s}$ um $0{,}05\,\mathrm{m}$ darueber, $t = 4\,\mathrm{s}$ um $0{,}04\,\mathrm{m}$ darunter, $t = 6\,\mathrm{s}$ um $0{,}05\,\mathrm{m}$ darueber, $t = 8\,\mathrm{s}$ um $0{,}02\,\mathrm{m}$ darunter. Die Vorzeichen wechseln, also zufaellige Fehler. Das Modell gleichfoermiger Bewegung ist im Rahmen der Messunsicherheit haltbar; exakt darf es nicht genannt werden.

Klausur-Satz: `Die Ausgleichsgerade ergibt eine Geschwindigkeit von etwa 0,50 m/s, und da die Abweichungen unsystematisch streuen, ist das Modell im Rahmen der Messunsicherheit haltbar.`

## Schritt 5 — ausprobieren

VERGLEICH (zwei Verfahren unterscheiden):

VERGLEICH: Waehle zuerst das Verfahren — (i) Zufallsfehler-Verfahren (Punkte streuen musterlos beiderseits: Mittelung hilft) oder (ii) Systemfehler-Verfahren (alle Punkte gleichsinnig verschoben: Ursache an Geraet und Ablauf suchen) — dann loesen.

AUFGABE A: Punkte liegen abwechselnd ueber und unter der Ausgleichsgeraden ohne Muster. Welches Verfahren, wie verkleinern?

AUFGABE B: Die Stoppuhr wurde jedes Mal $0{,}3\,\mathrm{s}$ zu spaet gestartet, alle Zeiten sind zu gross. Welches Verfahren, warum hilft Mittelung nicht?

HILFE: A streut ohne Muster, also Verfahren (i) mit Mehrfachmessung. B ist gleichsinnig verschoben, also Verfahren (ii) mit Ursachenbehebung. Faustregel: Vorzeichenwechsel verlangt Mittelung, gleiche Richtung verlangt Korrektur des Aufbaus.

ANTWORT: A erfordert Verfahren (i): unsystematische Streuung bedeutet Zufallsfehler; Wiederholung und Mittelung loeschen positive gegen negative Abweichungen. B erfordert Verfahren (ii): der um $0{,}3\,\mathrm{s}$ verspaetete Start ist systematisch; der Mittelwert bleibt zu gross. Der Fehler muss an der Ursache behoben werden, etwa durch korrigierten Start oder Lichtschranke.

Klausur-Satz: `Zufaellige Fehler werden durch Mittelung verkleinert, systematische Fehler dagegen nur durch das Beheben ihrer Ursache.`

## Schritt 6 — check

CHECK (Selbsttest, 3 Fragen mit Antworten):

FRAGE: Welche drei Elemente muss ein sauberes Diagramm mindestens enthalten? | ANTWORT: Beschriftete Achsen mit Groesse, zugehoerige Einheiten sowie Punkte und Ausgleichsgerade.
FRAGE: Woran erkennt man einen systematischen Fehler? | ANTWORT: Alle Werte weichen gleichsinnig von der Geraden ab, sodass Gerade oder Steigung verfalscht ist.
FRAGE: Warum darf ein Messergebnis nicht exakt genannt werden? | ANTWORT: Weil jede Messung Unsicherheit traegt; das Ergebnis gilt nur in deren Rahmen.

Klausur-Satz: `Ein Messergebnis wird nur im Rahmen der Messunsicherheit beurteilt, wobei zufaellige und systematische Fehler getrennt benannt werden.`

## Fehlvorstellung

(kein Schritt; wird vom Parser automatisch erkannt und nicht mitgezaehlt)

1. Fehlannahme: Messpunkte mit Zickzacklinie verbinden sei Zeichnen.
   Korrektur: Daten sind diskret; die Linie erfindet Verlauf zwischen Punkten. Punkte zeichnen, dann Ausgleichsgerade fuer den Trend.
   Korrektur-Satz: `Messpunkte werden als Punkte dargestellt und durch eine Ausgleichsgerade zusammengefasst, nicht durch eine stueckweise verbundene Linie.`
2. Fehlannahme: Haeufiges Mitteln beseitige jeden Fehler.
   Korrektur: Mittelung hilft nur gegen Zufall. Nullpunktfehler oder spaeter Start verschieben auch den Mittelwert und verlangen Geraetekorrektur.
   Korrektur-Satz: `Die Mittelung verkleinert nur zufaellige Fehler; systematische Fehler bleiben erhalten und muessen an ihrer Ursache beseitigt werden.`

## Schritt 7 — szenario

ROLLE: Du bist Mitglied der Physik-AG und sollst fuer das Schuljahrbuch einen Versuch zur gleichfoermigen Bewegung auswerten und dokumentieren.
SITUATION: Eine Gruppe hat eine Messreihe ($t$ in $\mathrm{s}$, $s$ in $\mathrm{m}$) aufgenommen; die Punkte streuen leicht um eine Gerade, und ein Schueler nennt das Ergebnis genau $0{,}50\,\mathrm{m/s}$. Beurteile in einer zusammenhaengenden Stellungnahme (ca. 150 Woerter) Darstellung, Geschwindigkeitsbestimmung und Aussagekraft mit Ausgleichsgerade und Messunsicherheit.
RUBRIC (30 XP): Korrekte Darstellung mit Achsen, Einheit, Punkten und Gerade (5 XP) | Steigung als Geschwindigkeit mit Rechnung (10 XP) | Einordnung als zufaellig oder systematisch (10 XP) | Eingeschraenktes Fazit statt exakt (5 XP).

## Schritt 8 — entdecken

TAKEAWAY (Kernzusammenfassung):

Achsen mit Einheiten, Punkte plus Ausgleichsgerade, Steigung als Ergebnis und Urteil nur im Rahmen der Messunsicherheit — so wird aus einer Messreihe ein belastbares Ergebnis. Zufall streut beiderseits und wird gemittelt, System verschiebt alles und verlangt Umbau. Das Verfahren gilt fuer jede Auswertung Daten zu Gerade zu Steigung.
Takeaway-Satz: `Achsen mit Einheiten, Punkte plus Ausgleichsgerade, Steigung als Ergebnis und ein Urteil nur im Rahmen der Messunsicherheit — so wird aus einer Messreihe ein belastbares Ergebnis.`

REFLEXION (2 Fragen):
1. Selbstbeobachtung: Welcher Schritt fiel schwerer — das Ablesen der Steigung aus der Ausgleichsgeraden (Schritt 4) oder die Unterscheidung von zufaelligem und systematischem Fehler im Vergleich (Schritt 5)?
2. Planung: Beim naechsten Mal beschrifte ich zuerst die Achsen mit Einheiten und pruefe am Ende, ob meine Schlussfolgerung den Fehlerrahmen ausdruecklich nennt.
