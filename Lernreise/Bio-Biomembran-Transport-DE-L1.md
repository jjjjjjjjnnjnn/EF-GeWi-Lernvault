---
fach: Bio
thema: "Biomembran und Transportmechanismen"
level: 1
ziel: Klausur
xp: 100
operatoren: [beschreiben, vergleichen, erklaeren]
klausurrelevant: true
datum: 2026-09-25
tags: [EF, Bio, Zellbiologie]
version: Lesson-v3
---

# Lernreise: Biomembran und Transportmechanismen (L1, Ziel Klausur)

<!-- Lesson v3 9-Schritt-Architektur: Schritt 1 bis 8 feste Struktur; Fehlvorstellung zwischen Schritt 6 und 7 (Parser ueberspringt, zaehlt nicht); interaktives [Werkzeug: <id>]; Gating: check/szenario nicht bestanden = Weiter deaktiviert; XP: entdecken 5 / ausprobieren 15 / check 20 / szenario 30 -->

## Schritt 1 — entdecken

ZIELE (drei messbare Ziele dieser Lektion):

1. Du kannst den Aufbau der Biomembran nach dem Fluessig-Mosaik-Modell mit Phospholipid-Doppelschicht, Membranproteinen und Glykokalyx beschreiben und die selektive Permeabilitaet aus der Struktur erklaeren.
2. Du kannst passiven und aktiven Transport anhand von drei Achsen unterscheiden — Richtung zum Konzentrationsgefaelle, ATP-Bedarf und Beteiligung von Carrierproteinen.
3. Du kannst ein Osmose-Experiment mit Plasmolyse und Deplasmolyse auf AFB-II-Niveau mit Fachbegriffen beschreiben und als Kausalkette formulieren.

Klausur-Satz: `Die Biomembran ist nach dem Fluessig-Mosaik-Modell aufgebaut und aufgrund ihrer Phospholipid-Doppelschicht selektiv permeabel.`

## Schritt 2 — entdecken

PRETRAINING-Box (fuenf Kernbegriffe mit Definitionen):

- Fluessig-Mosaik-Modell: Phospholipid-Doppelschicht als fluessige Matrix mit darin beweglichen Proteinen.
- Phospholipid-Doppelschicht: Hydrophile Koepfe nach aussen, hydrophobe Schwaenze nach innen; Grundgeruest der Membran.
- Selektive Permeabilitaet: Nur bestimmte Stoffe passieren; Struktur bestimmt Funktion.
- Osmose: Diffusion von Wasser durch eine semipermeable Membran zum Ort der hoeheren Teilchenkonzentration; es bewegt sich $H_2O$, nicht der geloeste Stoff.
- Aktiver Transport: Transport gegen das Konzentrationsgefaelle unter ATP-Verbrauch mit Carrierproteinen, zum Beispiel $ATP \to ADP + P_i$ an der Natrium-Kalium-Pumpe.

Klausur-Satz: `Waehrend passive Transportvorgaenge dem Konzentrationsgefaelle folgen, arbeitet der aktive Transport unter ATP-Verbrauch gegen das Gefaelle.`

## Schritt 3 — entdecken

TIEFEN-KONZEPT (ein Konzept mit visuellem Schema):

Die Membran ist kein starres Tor, sondern ein fluessiger Lipidfilm mit eingelagerten Proteinen. Kleine unpolare Molekuele wie $O_2$ und $CO_2$ diffundieren direkt durch die Lipidschicht (einfache Diffusion). Polare Teilchen wie Wasser, Ionen und Glucose passieren die hydrophobe Zone nicht und nutzen Kanal- oder Carrierproteine (erleichterte Diffusion). Beide folgen dem Gefaelle und brauchen kein ATP, gehoeren also zum passiven Transport. Gegen das Gefaelle arbeitet nur die Ionenpumpe mit ATP. Pflanzenzellen besitzen zusaetzlich eine Zellwand; bei Wasserverlust loest sich der Protoplast von der Wand (Plasmolyse), bei Wasseraufnahme legt er sich wieder an (Deplasmolyse).

```diagram
   aussen (extrazellulaer)
   ==================================================
    o   o   o   o   o   o   o   o   o   o   o   o
   /|\ /|\ /|\ /|\ /|\ /|\ /|\ /|\ /|\ /|\ /|\ /|\   <- hydrophile Koepfe
   ||| ||| ||| ||| ||| [K] ||| ||| ||| [C] ||| |||   [K] Kanalprotein
   ||| ||| ||| ||| ||| [K] ||| ||| ||| [C] ||| |||   [C] Carrierprotein
   \|/ \|/ \|/ \|/ \|/ \|/ \|/ \|/ \|/ \|/ \|/ \|/   <- hydrophobe Schwaenze
   ==================================================
    o   o   o   o   o   o   o   o   o   o   o   o
   innen (intrazellulaer)

   Transportwege:
   O2 / CO2   -->  einfache Diffusion   (direkt durch die Lipidschicht)
   H2O / K+   -->  Kanalprotein         (erleichterte Diffusion, passiv)
   Glucose    -->  Carrierprotein       (erleichterte Diffusion, passiv)
   Na+ / K+   <--  Ionenpumpe           (aktiver Transport, ATP)
```

Klausur-Satz: `Kleine unpolare Molekuele diffundieren direkt durch die Lipiddoppelschicht, waehrend Ionen und polare Stoffe auf Kanal- oder Carrierproteine angewiesen sind.`

## Anekdote & Fun-Fact

**Anekdote / Fun-Fact (DE)**: Wer eine Gurkenscheibe mit Salz bestreut, sieht bald Wassertropfen austreten und die Scheibe schlaff werden. Das Salz draussen bildet eine hypertonische Loesung, und das Wasser in den Zellen folgt dem osmotischen Gefaelle nach aussen. Genau deshalb wird Gemuese vor dem Einlegen zuerst gesalzen und so entwaessert.

**Bezug zum Konzept**: `Die Salzgurke zeigt die Osmose: Wasser wandert durch die selektiv permeable Biomembran zur hypertonischen Seite, wodurch der Turgor der Zelle sinkt.`

## Schritt 4 — ausprobieren

BEISPIEL (geleitete Aufgabe mit Werkzeug):

[Werkzeug: lego]

AUFGABE (beschreiben und erklaeren, AFB II): Zwei gleich lange Kartoffelstaebchen werden gewogen und anschliessend fuer eine Stunde in zwei Becherglaeser gelegt: Becher A enthaelt destilliertes Wasser, Becher B eine konzentrierte Kochsalzloesung. Danach werden die Staebchen erneut gewogen. Beschreiben Sie die zu erwartenden Massenaenderungen und erklaeren Sie sie mit den Fachbegriffen Osmose und Turgor.

HILFE:
1. Schritt 1: Beschreibe zuerst nur, was messbar ist (Operator beschreiben): Staebchen A nimmt an Masse zu, Staebchen B nimmt ab.
2. Schritt 2: Bestimme die Richtung des Wassers: Wasser fliesst osmotisch immer zur Seite der hoeheren Konzentration geloester Teilchen.
3. Schritt 3: Verknuepfe mit der Struktur (Struktur-Funktion): Die grosse Zentralvakuole speichert Wasser und erzeugt Turgor; Wassereinstrom hebt ihn, Wasserverlust senkt ihn.

MUSTERLOESUNG: In Becher A nimmt das Kartoffelstaebchen an Masse zu, in Becher B nimmt es ab. Ursache ist die Osmose: Da destilliertes Wasser im Vergleich zum Zellinneren hypotonisch ist, diffundiert Wasser durch die selektiv permeable Biomembran in die Zellen ein; die Zentralvakuole vergroessert sich, der Turgor steigt und das Gewebe wird straff. In der konzentrierten Kochsalzloesung ist das Aussenmedium dagegen hypertonisch, sodass Wasser osmotisch aus den Zellen nach aussen stroemt. Der Turgor bricht zusammen, das Gewebe erschlafft und die Masse sinkt. Entscheidend ist, dass sich das Wasser bewegt und nicht das Salz, da die Membran fuer geloeste Ionen nahezu undurchlaessig ist.

Klausur-Satz: `Da Wasser osmotisch dem Konzentrationsgefaelle folgt, gewinnt die Zelle im hypotonischen Medium Wasser und verliert es im hypertonischen Medium.`

## Schritt 5 — ausprobieren

VERGLEICH (Wahl des Verfahrens, A gegen B):

VERGLEICH: Waehle erst das Verfahren — (i) Passiv-Verfahren (entlang dem Gefaelle, ohne ATP, mit oder ohne Carrier: einfache oder erleichterte Diffusion) oder (ii) Aktiv-Verfahren (gegen das Gefaelle, mit ATP, mit Pump- oder Carrierprotein) — dann loesen.

AUFGABE A: In einem Text heisst es, Sauerstoff gelange aus der Lungenluft in die roten Blutkoerperchen, ohne dass die Zelle dafuer Energie aufwendet. Welches Verfahren ist zu waehlen, und wie laesst sich der Vorgang erklaeren?

AUFGABE B: In einem Text heisst es, eine Zelle reichert Kaliumionen gegen das bestehende Konzentrationsgefaelle an und verbraucht dabei ATP. Welches Verfahren ist zu waehlen, und wie laesst sich der Vorgang erklaeren?

HILFE: A nennt keine Energie und ein kleines unpolares Molekuel, daher Verfahren (i). B nennt ausdruecklich gegen das Gefaelle und ATP-Verbrauch, daher Verfahren (ii).

ANTWORT: A erfordert Verfahren (i): Sauerstoff ist klein und unpolar und diffundiert daher direkt entlang des Konzentrationsgefaelles durch die Lipiddoppelschicht, also durch einfache Diffusion ohne Energieverbrauch. B erfordert Verfahren (ii): Da Kaliumionen entgegen ihrem Konzentrationsgefaelle transportiert werden, muss die Zelle eine Ionenpumpe (Transport-ATPase) einsetzen; die noetige Energie liefert die Hydrolyse von $ATP \to ADP + P_i$. Beide Vorgaenge unterscheiden sich also nicht in der Stoffmenge, sondern in der Richtung relativ zum Gefaelle und im Energiebedarf.

Klausur-Satz: `Passiver Transport folgt dem Konzentrationsgefaelle ohne ATP, waehrend aktiver Transport unter ATP-Verbrauch gegen das Gefaelle verlaeuft.`

## Schritt 6 — check

CHECK (drei Fragen mit Antworten):

FRAGE: Aus welchen drei Hauptbestandteilen besteht die Biomembran nach dem Fluessig-Mosaik-Modell? | ANTWORT: Aus der Phospholipid-Doppelschicht, den darin eingelagerten Membranproteinen und der Glykokalyx aus Glykolipiden und Glykoproteinen.
FRAGE: Warum ist die Biomembran selektiv permeabel? | ANTWORT: Weil die hydrophobe Lipiddoppelschicht nur kleine unpolare Molekuele passieren laesst, waehrend polare Teilchen auf spezifische Transportproteine angewiesen sind.
FRAGE: Was geschieht bei der Plasmolyse und was bei der Deplasmolyse? | ANTWORT: Bei der Plasmolyse verliert die Zelle in einem hypertonischen Medium Wasser, der Turgor sinkt und der Protoplast loest sich von der Zellwand; bei der Deplasmolyse stroemt in einem hypotonischen Medium Wasser zurueck und der Protoplast legt sich wieder an die Zellwand an.

Klausur-Satz: `Die Plasmolyse beruht auf einem Wasserverlust im hypertonischen Medium, die Deplasmolyse auf einem Wassereinstrom im hypotonischen Medium.`

## Fehlvorstellung

(Kein Schritt; wird vom Parser uebersprungen.)

1. Fehlannahme: Bei der Osmose wandere der geloeste Stoff durch die Membran auf die andere Seite.
   Korrektur: Es bewegt sich ausschliesslich das Wasser zur Seite der hoeheren Teilchenkonzentration; die geloesten Stoffe werden zurueckgehalten.
   Korrektur-Satz: `Bei der Osmose bewegt sich ausschliesslich das Wasser durch die selektiv permeable Membran zur Seite der hoeheren Teilchenkonzentration, waehrend die geloesten Stoffe zurueckgehalten werden.`
2. Fehlannahme: Jeder Transport entlang dem Gefaelle sei einfache Diffusion ohne Proteine.
   Korrektur: Auch die erleichterte Diffusion folgt dem Gefaelle und braucht kein ATP, ist aber auf Kanal- oder Carrierproteine angewiesen.
   Korrektur-Satz: `Auch die erleichterte Diffusion folgt dem Konzentrationsgefaelle und benoetigt kein ATP, ist aber auf Kanal- oder Carrierproteine angewiesen.`

## Schritt 7 — szenario

ROLLE: Du bist Tutorin in einem Bio-Grundkurs der gymnasialen Oberstufe und sollst einer Mitschaelerin ein Experiment erklaeren.
SITUATION: Ein Mikroskopierpraeparat mit roten Zwiebelzellen wird zunaechst mit einer konzentrierten Kaliumnitratloesung und danach mit destilliertem Wasser behandelt. Deine Mitschaelerin fragt, warum sich der gefaerbte Zellsaftraum erst zusammenzieht und spaeter wieder ausdehnt.
AUFGABE (AFB II/III): Erklaere beide Beobachtungen in einer zusammenhaengenden Stellungnahme (ca. 150 Woerter) mit den Fachbegriffen Osmose, hypertonisch, hypotonisch, Turgor, Plasmolyse und Deplasmolyse.
RUBRIC (30 XP): Benennung der beiden Medien als hypertonisch bzw. hypotonisch (5 XP) | Richtige Bestimmung der Wasserbewegung ueber die selektiv permeable Membran (10 XP) | Erklaerung von Plasmolyse und Deplasmolyse ueber den Turgor und die Zellwand (10 XP) | Fachsprachlich korrekte, kausale Formulierung mit passenden Fachbegriffen (5 XP).

## Schritt 8 — entdecken

TAKEAWAY (Kernbotschaft in einem Kasten):

Die Struktur der Biomembran bestimmt ihre Funktion: Die Lipiddoppelschicht erlaubt die passive Diffusion, waehrend Transportproteine und ATP den aktiven Transport gegen das Gefaelle ermoeglichen. Merksatz: Entlang dem Gefaelle und ohne ATP ist passiv; gegen das Gefaelle mit ATP ist aktiv; bei der Osmose bewegt sich stets das Wasser, nicht das Salz.
Takeaway-Satz: `Die Struktur der Biomembran bestimmt ihre Funktion: Die Lipiddoppelschicht erlaubt die passive Diffusion, waehrend Transportproteine und ATP den aktiven Transport gegen das Gefaelle ermoeglichen.`

REFLEXION (zwei Fragen):
1. Welcher Schritt fiel schwerer — die Zuordnung der Transportart ueber die drei Kriterien (Schritt 5) oder die Formulierung des osmotischen Vorgangs mit Fachbegriffen (Schritt 4)?
2. Beim naechsten Mal pruefe ich zuerst die Richtung relativ zum Konzentrationsgefaelle und den ATP-Bedarf, bevor ich den Transportbegriff auswaehle.
