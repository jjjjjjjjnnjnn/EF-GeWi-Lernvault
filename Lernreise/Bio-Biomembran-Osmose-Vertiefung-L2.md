---
fach: Bio
thema: "Biomembran Osmose Vertiefung mit Rechnung"
level: 2
ziel: Klausur
xp: 100
operatoren: [beschreiben, berechnen, erklaeren]
klausurrelevant: true
datum: 2026-09-26
tags: [EF, Bio, Zellbiologie]
version: Lesson-v3
---

# Lernreise: Biomembran Osmose Vertiefung mit Rechnung (L2, Ziel Klausur)

<!-- Lesson v3 architecture: Schritte 1-8 fixed; Fehlvorstellung between Schritt 6 and 7 (parser skipped); embedded [Werkzeug: <id>]; gating: check/szenario failed = Weiter greyed; XP: entdecken 5 / ausprobieren 15 / check 20 / szenario 30 -->

## Schritt 1 — entdecken

ZIELE (3 Ziele, nach 20 Minuten erreichbar):

1. Wasserpotenzial $\Psi = \Psi_s + \Psi_p$ aufstellen und Komponenten deuten.
2. Die Richtung des Wasserstroms aus $\Delta\Psi$ berechnen und begruenden.
3. Plasmolyse und Deplasmolyse quantitativ mit Turgor erklaeren (AFB II-III).

VORAUSSETZUNG: Fluessig-Mosaik-Modell, Diffusion, Osmose sowie Prozent- und Dreisatzrechnung.

VORGAENGER-VERWEIS UND ARBEITSTEILUNG (L2-Abgrenzung): Diese Lektion setzt `Bio-Biomembran-Transport-L1.md` voraus und wiederholt sie nicht. Dort wurden Membranbau, passiver und aktiver Transport sowie Grundbegriffe der Osmose eingefuehrt. Hier folgt der enge L2-Ausschnitt: nur quantitative Osmose mit Wasserpotenzial und Turgorrechnung; Membranbau und Transporttypen gehoeren zur L1 und werden vorausgesetzt. Wer nur Transportarten zuordnen muss, arbeitet weiter mit der L1-Methode.

Klausur-Satz: `Wasser folgt dem Wasserpotenzial und stroemt stets zur Seite des niedrigeren Psi-Werts.`

## Schritt 2 — entdecken

PRETRAINING (Kernbegriffe):

- Wasserpotenzial $\Psi$: Mass der freien Energie des Wassers in $MPa$.
- Solutpotenzial $\Psi_s$: Negativer Beitrag geloester Teilchen ($\Psi_s \le 0$).
- Druckpotenzial $\Psi_p$: Beitrag von Turgor oder Aussendruck ($\Psi_p \ge 0$ in der Zelle).
- Hypertonisch: Aussen niedrigeres $\Psi$ als innen, Wasser stroemt aus.
- Hypotonisch: Aussen hoeheres $\Psi$ als innen, Wasser stroemt ein.

Klausur-Satz: `Psi addiert Loesung und Druck: geloeste Teilchen senken, Turgor hebt den Wert.`

## Schritt 3 — entdecken

ENTDECKEN (ein Konzept plus Diagramm):

Es gilt $\Psi = \Psi_s + \Psi_p$ je Kompartiment und $\Delta\Psi = \Psi_{aussen} - \Psi_{innen}$. Bei $\Delta\Psi > 0$ stroemt Wasser ein, bei $\Delta\Psi < 0$ aus, bei null herrscht Gleichgewicht. Turgor wirkt als Gegendruck: Einstrom hebt $\Psi_p$, bis $\Psi_{innen} = \Psi_{aussen}$ gilt. Plasmolyse bedeutet $\Psi_p \to 0$ plus Volumenverlust, Deplasmolyse die Rueckkehr durch Einstrom.

```diagram
Psi = Psi_s (Teilchen, negativ) + Psi_p (Druck, positiv)
Richtung: Delta-Psi = Psi_aussen - Psi_innen
Delta > 0 -> Einstrom | Delta = 0 -> Ruhe | Delta < 0 -> Ausstrom
Turgor: Einstrom hebt Psi_p bis Psi_innen = Psi_aussen
Plasmolyse: Psi_p -> 0, Protoplast loest sich | Deplasmolyse: Rueckstrom
```

Klausur-Satz: `Turgor ist der Druckanteil, der Einstrom bis zum Psi-Ausgleich bremst.`

## Anekdote & Fun-Fact

**Anekdote / Fun-Fact (DE)**: Salat wird wieder knackig in kaltem Wasser: Die Zellen gewinnen Wasser zurueck, der Turgor steigt, das Gewebe strafft sich. Die Kueche nutzt Psi-Gefaelle ohne ein einziges Formelzeichen.

**Bezug zum Konzept**: `Welker Salat zeigt Deplasmolyse als Rueckstrom zum hoeheren Psi.`

## Schritt 4 — ausprobieren

BEISPIEL (vollstaendige Musterloesung):

[Werkzeug: balance]

AUFGABE (berechnen, AFB II): Eine Zelle besitzt $\Psi_s = -0{,}9 \, MPa$ und $\Psi_p = 0{,}4 \, MPa$. Die Aussenloesung besitzt $\Psi_{aussen} = -0{,}2 \, MPa$. Berechnen Sie $\Psi_{innen}$, bestimmen Sie die Richtung und deuten Sie den Turgor.

HILFE:
1. Schritt 1: $\Psi_{innen} = \Psi_s + \Psi_p$ berechnen.
2. Schritt 2: $\Delta\Psi$ bilden.
3. Schritt 3: Richtung und Turgor deuten.

MUSTERLOESUNG: Es gilt $\Psi_{innen} = -0{,}9 + 0{,}4 = -0{,}5 \, MPa$. Damit folgt $\Delta\Psi = -0{,}2 - (-0{,}5) = +0{,}3 \, MPa$. Da $\Delta\Psi > 0$, stroemt Wasser ein; der Turgor steigt weiter, bis $\Psi_{innen}$ auf $-0{,}2 \, MPa$ angehoben ist. Die Zelle wird straffer, Plasmolysegefahr besteht nicht.

Klausur-Satz: `Mit Delta-Psi von +0,3 MPa stroemt Wasser ein, bis Turgor den Ausgleich herstellt.`

## Schritt 5 — ausprobieren

VERGLEICH (erst Verfahren waehlen, dann loesen):

VERGLEICH: Waehle erst das Verfahren — (i) Psi-Verfahren (Komponenten addieren, $\Delta\Psi$ bilden) oder (ii) Transport-Verfahren (passiv oder aktiv aus Gefaelle plus ATP schliessen) — dann loesen.

AUFGABE A: Psi-Werte beider Seiten sind gegeben, Richtung gesucht. Welches Verfahren passt?

AUFGABE B: Kalium wird gegen das Gefaelle mit ATP angereichert. Welches Verfahren passt?

HILFE: A nennt Psi-Zahlen, also Verfahren (i). B nennt Gefaelle plus ATP, also Verfahren (ii).

ANTWORT: A erfordert Verfahren (i): $\Psi$ je Seite addieren und $\Delta\Psi$ deuten. B erfordert Verfahren (ii): Aktiver Transport mit Pumpe, unabhaengig vom Wasserpotenzial.

Klausur-Satz: `Zahlen mit Psi verlangen Delta-Psi, Stoffe mit ATP verlangen Transporttyp.`

## Schritt 6 — check

CHECK (drei Fragen mit Antworten):

FRAGE: Wie lautet die Psi-Gleichung? | ANTWORT: $\Psi = \Psi_s + \Psi_p$ je Kompartiment in $MPa$.
FRAGE: Wie folgt die Richtung? | ANTWORT: Aus $\Delta\Psi = \Psi_{aussen} - \Psi_{innen}$ mit Einstrom bei positiv, Ausstrom bei negativ.
FRAGE: Was geschieht bei Plasmolyse mit $\Psi_p$? | ANTWORT: $\Psi_p$ sinkt gegen null, der Protoplast loest sich von der Wand.

Klausur-Satz: `Ohne Delta-Psi bleibt Osmose geraten, mit Delta-Psi wird sie gerechnet.`

## Fehlvorstellung

1. Fehlvorstellung: Wasser folge dem Salz aktiv hinterher.
   Korrektur-Satz: `Wasser folgt passiv dem Psi-Gefaelle; geloeste Teilchen werden an der Membran zurueckgehalten.`

2. Fehlvorstellung: Turgor und Psi seien Synonyme.
   Korrektur-Satz: `Turgor ist nur der Druckanteil Psi_p, Psi addiert dazu den Loesungsanteil Psi_s.`

## Schritt 7 — szenario

ROLLE: Du bist Tutorin im Bio-Grundkurs.
SITUATION: Eine Mitschuelerin sieht Zwiebelzellen erst schrumpfen, dann schwellen. Erklaere in circa 150 Woertern mit $\Psi$-Rechnung, warum konzentrierte Loesung erst Plasmolyse und Wasser danach Deplasmolyse erzeugt.
RUBRIC (30 XP): Psi-Gleichung korrekt (8 XP) | Beide Richtungen mit $\Delta\Psi$ (10 XP) | Turgordeutung (8 XP) | Fachsprachliche Darstellung (4 XP).

## Schritt 8 — entdecken

TAKEAWAY:

Komponenten addieren, Differenz bilden: Delta-Psi zeigt Richtung, Turgor zeigt Grenze.
Takeaway-Satz: `Psi rechnen statt raten — Wasser stroemt zum niedrigeren Wert, Turgor bremst bis zum Ausgleich.`

REFLEXION:
1. Welcher Schritt fiel schwerer — die Psi-Rechnung (Schritt 4) oder die Verfahrenswahl (Schritt 5)?
2. Beim naechsten Mal addiere ich zuerst beide Psi-Werte, weil Delta-Psi jede Richtung traegt.
