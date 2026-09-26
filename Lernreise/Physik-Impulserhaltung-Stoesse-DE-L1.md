---
fach: Physik
thema: "Impulserhaltung und Stoesse"
level: 1
ziel: Klausur
xp: 100
operatoren: [darstellen, berechnen, begruenden]
klausurrelevant: true
datum: 2026-09-26
tags: [EF, Physik, Mechanik]
version: Lesson-v3
---

# Lernreise: Impulserhaltung und Stoesse (L1, Ziel Klausur)

<!-- Lesson v3 9-Schritt-Architektur: Schritt 1 bis 8 feste Struktur; Fehlvorstellung zwischen Schritt 6 und 7 (Parser ueberspringt, zaehlt nicht); interaktive [Werkzeug: <id>]; Gating: check/szenario nicht bestanden = Weiter deaktiviert; XP: entdecken 5 / ausprobieren 15 / check 20 / szenario 30 -->

## Schritt 1 — entdecken

ZIELE (diese Lektion in 15 Minuten: danach kannst du):

1. $p = m v$ in $\mathrm{kgm/s}$ an $m = 2{,}0\,\mathrm{kg}$, $v = 3{,}0\,\mathrm{m/s}$ zu $p = 6{,}0\,\mathrm{Ns}$ berechnen.
2. $p_{vor} = p_{nach}$ an Stoss $m_1 v_1+m_2 v_2 = m_1 u_1+m_2 u_2$ und Rueckstoss $0$ anwenden.
3. Elastisch per $E_{kin}$ erhalten gegen unelastisch per $E$-Verlust mit Vorzeichenregel unterscheiden.

### Hook / Phaenomen

Im Jahr 2015 knallten zwei Eishockeyspieler zusammen — einer flog, einer stand. Die Trainer stritten: Wer schob wen? Die Eisbahn loest den Streit ohne Video: Gesamtimpuls vorher gleich nachher, egal wie hart der Aufprall. Warum bleibt die Vektorsumme erhalten, waehrend die Energie schmilzt — und welche einzige Zusatzfrage trennt elastisch und unelastisch?

### Fachbegriff & Definition

Fuer Stoesse gilt: **In einem abgeschlossenen System bleibt die Vektorsumme aller Impulse erhalten, also $p_{vor} = p_{nach}$**. Es gilt **$p = m v$ als Vektorgroesse mit Vorzeichen je Richtung**. Der **elastische Stoss erhaelt zusaetzlich $E_{kin}$, der unelastische wandelt Teile in innere Energie** um.

### Wirkungsgefuege / Modell

Der Mechanismus folgt aus actio gleich reactio: Innere Kraefte heben sich paarweise auf, $p_{gesamt}$ kann sich nicht aendern. Beispiel kleben $m_1 = 2{,}0$, $v_1 = 3{,}0$, $m_2 = 1{,}0$, $v_2 = 0$ zu $u = (6{,}0+0)/3{,}0 = 2{,}0\,\mathrm{m/s}$. Zusatztest $E_{kin}$: vorher $9{,}0\,\mathrm{J}$, nachher $6{,}0\,\mathrm{J}$ — Verlust $3{,}0\,\mathrm{J}$ zu unelastisch. Beim elastischen Ideal bliebe $E$ gleich.

Schritt A: Positive Richtung waehlen und $p_{vor}$ summieren.
Schritt B: $p_{vor} = p_{nach}$ nach $u$ aufloesen.
Schritt C: $E_{kin}$ vorher gegen nachher als Elastizitaetstest pruefen.

Klausur-Satz: `In einem abgeschlossenen System bleibt die Vektorsumme aller Impulse erhalten.`

## Schritt 2 — entdecken

PRETRAINING (Kernbegriffe, erst lesen, dann abdecken und aktiv wiedergeben):

### Hook / Phaenomen

Eine Explosion zerreisst eine ruhende Hantel — zwei Haelften fliegen entgegengesetzt. Vorher $p = 0$, nachher scheinbar doppelt. Der Widerspruch loest sich im Vorzeichen: plus gegen minus hebt sich auf. Welche fuenf Begriffe sichern das Vorzeichen vor der Rechnung?

### Fachbegriffe & Definitionen

- **Impuls:** $p = m v$ mit $1\,\mathrm{Ns} = 1\,\mathrm{kgm/s}$ als Bewegungsmenge mit Richtung.
- **Abgeschlossenes System:** Keine aeusseren Kraefte, also $p_{gesamt}$ konstant.
- **Elastischer Stoss:** $p$ und $E_{kin}$ bleiben erhalten; ideale Billardkugeln.
- **Unelastischer Stoss:** Nur $p$ bleibt; Rest wird Verformung oder Waerme.
- **Rueckstoss:** $p_{vor} = 0$ wie Explosion oder Gewehr; Teile laufen entgegengesetzt.

### Wirkungsgefuege / Modell

Die Kette warnt vor dem Vorzeichen: Rechts plus, links minus — wer $v_2 = -2{,}0\,\mathrm{m/s}$ als $+2{,}0$ einsetzt, verdoppelt statt subtrahiert. Rueckstoss $0 = m_1 u_1+m_2 u_2$ zu $u_2 = -m_1 u_1/m_2$ zeigt entgegengesetzte Richtungen automatisch. Elastisch gegen unelastisch entscheidet allein $E_{kin}$-Bilanz — $p$-Bilanz gilt immer.

Klausur-Satz: `Der Impuls ist eine Vektorgroesse; sein Vorzeichen haengt von der gewaehlten positiven Richtung ab.`

## Schritt 3 — entdecken

ENTDECKEN (ein Konzept plus Textdiagramm):

### Hook / Phaenomen

Newtons Wiege klickt: Aussen hebt sich eine Kugel, innen ruht die Kette. Der Impuls wandert unsichtbar durch Stahl — fast ohne Verlust. Waere der Stoss unelastisch, so klebten alle und wackelten gemeinsam. Wie beweist das Pendel beide Bilanzen zugleich — und warum liefert $u = (m_1 v_1+m_2 v_2)/(m_1+m_2)$ den Klebefall?

### Fachbegriff & Definition

Die **Impulsbilanz gilt bei jedem Stoss, die Energiebilanz nur beim elastischen zusaetzlich**. Beim **vollstaendig unelastischen Stoss kleben beide Koerper mit gemeinsamem $u = (m_1 v_1+m_2 v_2)/(m_1+m_2)$**. Die **Differenz $E_{kin}(vor)-E_{kin}(nach)$ misst den Verlust** als innere Energie.

### Wirkungsgefuege / Modell

Der Tiefenweg vergleicht Wiege und Kleben: Wiege ideal $m v = m u$ plus $0{,}5 m v^2 = 0{,}5 m u^2$ zu $u = v$ als Durchlauf. Kleben $2{,}0 \cdot 3{,}0 = 3{,}0 \cdot u$ zu $u = 2{,}0\,\mathrm{m/s}$ mit $E$-Verlust $3{,}0\,\mathrm{J}$. Dazwischen liegt jeder Realstoss: $p$ exakt, $E$ teilweise. Daher erst $p$-Gleichung loesen, dann $E$-Test als Urteil.

Schritt A: $m_1 v_1+m_2 v_2 = m_1 u_1+m_2 u_2$ aufstellen.
Schritt B: Kleben per gemeinsamem $u$ oder elastisch per $E$ loesen.
Schritt C: $E$-Differenz als Verlust oder Bestaetigung deuten.

```diagram
vor dem Stoss:   m1*v1  +  m2*v2
                      ||
                 inneres Kraeftepaar hebt sich auf
                      ||
nach dem Stoss:  m1*u1  +  m2*u2
Zusatztest: E_kin(vor) = E_kin(nach)? elastisch : unelastisch
Spezialfall kleben: u = (m1*v1 + m2*v2) / (m1 + m2)
Zahlen: 2.0*3.0/3.0 = 2.0 m/s, E-Verlust 3.0 J
```

Klausur-Satz: `Die Impulsbilanz gilt bei jedem Stoss, die Energiebilanz nur beim elastischen Stoss zusaetzlich.`

## Anekdote & Fun-Fact

**Anekdote / Fun-Fact (DE)**: Beim Kugelstoss-Pendel (Newton's Cradle) hebt sich aussen eine Kugel, waehrend innen scheinbar nichts geschieht. Der Impuls wandert durch die ruhende Kette, beim ideal elastischen Stoss fast ohne Verlust.

**Bezug zum Konzept**: `Das Pendel zeigt Impulserhaltung plus naeherungsweise Energieerhaltung in Reinform.`

## Schritt 4 — ausprobieren

BEISPIEL (Musteraufgabe mit Loesungsweg):

[Werkzeug: kinematik]

AUFGABE (berechnen, AFB II): Wagen $m_1 = 2{,}0\,\mathrm{kg}$ faehrt mit $v_1 = 3{,}0\,\mathrm{m/s}$ auf ruhenden Wagen $m_2 = 1{,}0\,\mathrm{kg}$ auf. Nach vollstaendig unelastischem Stoss kleben beide. Berechnen Sie $u$ und den Verlust an $E_{kin}$.

HILFE:
1. Bilanz $m_1 v_1 = (m_1 + m_2) u$ aufstellen.
2. Wert $u$ berechnen.
3. Werte $E_{kin}$ vor und nach vergleichen.

MUSTERLOESUNG: Es gilt $u = m_1 v_1/(m_1 + m_2) = 2{,}0 \cdot 3{,}0/3{,}0 = 2{,}0\,\mathrm{m/s}$. Vorher: $E_{vor} = 0{,}5 \cdot 2{,}0 \cdot 9{,}0 = 9{,}0\,\mathrm{J}$. Nachher: $E_{nach} = 0{,}5 \cdot 3{,}0 \cdot 4{,}0 = 6{,}0\,\mathrm{J}$. Der Verlust $3{,}0\,\mathrm{J}$ erscheint als Verformungs- und Waermeenergie. Der Impuls $p = 6{,}0\,\mathrm{Ns}$ bleibt erhalten.

Klausur-Satz: `Beim unelastischen Stoss bleibt der Impuls erhalten, waehrend ein Teil der kinetischen Energie in innere Energie umgewandelt wird.`

## Schritt 5 — ausprobieren

VERGLEICH (zwei Verfahren unterscheiden):

VERGLEICH: Waehle zuerst das Verfahren — (i) Impuls-Verfahren (Bilanz $p_{vor} = p_{nach}$, immer noetig) oder (ii) Energie-Verfahren als Zusatztest (Vergleich von $E_{kin}$ zur Stossart) — dann loesen.

AUFGABE A: Zwei Billardkugeln stossen zusammen; danach rollen beide getrennt weiter. Ist der Stoss elastisch?

AUFGABE B: Zwei Tonklumpen stossen zusammen und bleiben vereint liegen. Welche Saetze gelten?

HILFE: A verlangt beide Bilanzen, also Verfahren (i) plus (ii). B zeigt Kleben, also nur Verfahren (i) mit gemeinsamer Masse. Faustregel: getrenntes Weiterrollen verlangt Energietest, Kleben entscheidet sofort unelastisch.

ANTWORT: A erfordert Verfahren (i) plus (ii): Impulsbilanz aufstellen und $E_{kin}$ pruefen; bei Gleichheit elastisch. B erfordert Verfahren (i): $u = (m_1 v_1 + m_2 v_2)/(m_1 + m_2)$; Energie geht teilweise verloren, Impuls bleibt erhalten.

Klausur-Satz: `Kleben verrät den unelastischen Stoss, getrenntes Weiterrollen verlangt den Energietest.`

## Schritt 6 — check

CHECK (Selbsttest, 3 Fragen mit Antworten):

FRAGE: Wie lautet die Impulsbilanz beim geraden Stoss? | ANTWORT: $m_1 v_1 + m_2 v_2 = m_1 u_1 + m_2 u_2$ mit Vorzeichen je Richtung.
FRAGE: Woran erkennt man vollstaendig unelastischen Stoss? | ANTWORT: An gemeinsamem $u$ und Verlust kinetischer Energie bei erhaltenem Impuls.
FRAGE: Warum ist das Vorzeichen entscheidend? | ANTWORT: Weil $p = m \cdot v$ vektoriell ist und Gegenrichtungen subtrahiert werden.

Klausur-Satz: `Ohne Vorzeichenregel ist keine Impulsbilanz klausurtauglich.`

## Fehlvorstellung

(kein Schritt; wird vom Parser automatisch erkannt und nicht mitgezaehlt)

1. Fehlannahme: Bei jedem Stoss bleibe auch die kinetische Energie erhalten.
   Korrektur: Nur elastisch erhaelt beide; unelastisch wandelt einen Teil in innere Energie um.
   Korrektur-Satz: `Nur beim elastischen Stoss bleibt die kinetische Energie erhalten; beim unelastischen Stoss geht ein Teil in innere Energie ueber.`
2. Fehlannahme: Impuls und Energie seien dasselbe mit anderem Namen.
   Korrektur: Impuls ist linear in $v$ und vektoriell, Energie quadratisch in $v$ und skalar.
   Korrektur-Satz: `Der Impuls ist linear in v und vektoriell, die kinetische Energie ist quadratisch in v und skalar.`

## Schritt 7 — szenario

ROLLE: Du bist Praktikantin im Verkehrslabor.
SITUATION: Zwei Spielzeugwagen stossen auf der Luftkissenbahn zusammen; Wagen 2 stand vorher. Bestimmen Sie aus Messwerten Stossart und Energieverlust. Formulieren Sie in circa 150 Woertern die Auswertung mit Impulsbilanz und Energietest und beurteilen Sie, ob elastischer Stoss vorliegt.
RUBRIC (30 XP): Korrekte Impulsbilanz mit Vorzeichen (10 XP) | Energietest mit Zahlen (10 XP) | Urteil zur Stossart mit Begruendung (6 XP) | Fachsprachliche Darstellung (4 XP).

## Schritt 8 — entdecken

TAKEAWAY (Kernzusammenfassung):

Impuls immer bilanzieren, Energie zusaetzlich testen: erhalten plus erhalten bedeutet elastisch, Impuls erhalten plus Energie verloren bedeutet unelastisch.
Takeaway-Satz: `Der Impuls entscheidet ueber die Bewegung nach dem Stoss, die Energie entscheidet ueber die Stossart.`

REFLEXION (2 Fragen):
1. Selbstbeobachtung: Welcher Schritt fiel schwerer — die Verlustrechnung (Schritt 4) oder die Verfahrenswahl (Schritt 5)?
2. Planung: Beim naechsten Mal lege ich zuerst die positive Richtung fest, weil jedes Vorzeichen davon abhaengt.
