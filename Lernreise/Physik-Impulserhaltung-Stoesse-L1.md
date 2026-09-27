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

<!-- Campaign: Mars-Mission | Episode 24/28 | Krise: Sol-124 Laser-Entfernungsmesser Offset 1,9 m | Target: v0 = 408 m/s, a = 5.1 m/s2, Ziel s = 1688 m | Tool: formula -->

## Schritt 1 — entdecken: Kraefte der Landung
ZIELE (3 Ziele, nach 15 Minuten erreichbar):

1. Den Impuls $p = m \cdot v$ berechnen und als Vektorgroesse deuten.
2. Die Impulserhaltung $p_{vor} = p_{nach}$ bei abstossenden und stossenden Systemen anwenden.
3. Elastischen und unelastischen Stoss anhand der kinetischen Energie unterscheiden (AFB II).

VORAUSSETZUNG: Geschwindigkeit, Masse, Newton-Axiome und Energieerhaltung in der Mechanik.

VORGAENGER-VERWEIS: Diese Lektion setzt `Physik-Energieerhaltung-Mechanik-L1.md` voraus und wiederholt sie nicht. Dort stand die Energiebilanz mit Lage- und Bewegungsenergie im Zentrum. Hier folgt der enge Ausschnitt: nur Impuls und Impulserhaltung bei geraden Stoessen; Energie dient lediglich als Zusatzkriterium zur Stossart.

### Hook / Phaenomen

【火星拓荒者·第24集/共28集】警报：Sol-124 Laser-Entfernungsmesser Offset 1,9 m。领航员 Lena 大喊：“v0 = 408 m/s, a = 5.1 m/s2, Ziel s = 1688 m！”机械师 Tom 回应：“稳住曲线！”上一集（Physik-Impulserhaltung-Stoesse-DE-L1.md）埋下的隐患在此爆发，下一集（Physik-Kinematik-Messung-DE-L1.md）的大门只为算对的人打开。本集你要在沙盘里亲手把飞船从超速边缘救回来：先看现象、再点装备、最后算出让考官点头的 Bilanz。记住：读图先看轴、计算必带单位、做完必用另一张图验算——这就是火星人生存法则，也是 Klausur 拿分法则。

Hook / Phaenomen (Sol-Logbuch, Episode 24 von 28): Mars-Anflug, Sol-124 Laser-Entfernungsmesser Offset 1,9 m. Navigatorin Lena meldet: v0 = 408 m/s, a = 5.1 m/s2, Ziel s = 1688 m, Mechaniker Tom ruft: Halte die Kurve! Der Bordcomputer geht auf Rot, das Funkgeraet rauscht, die Crew haelt den Atem an. Genau hier entscheidet Impulserhaltung und Stoesse ueber Landung oder Absturz, ueber Festfahren oder Weiterfahrt, ueber Andocken oder Abprall. Das Logbuch des vorherigen Sols (Physik-Impulserhaltung-Stoesse-DE-L1.md) warnte bereits vor diesem Moment, und das naechste Fenster (Physik-Kinematik-Messung-DE-L1.md) oeffnet sich nur, wenn diese Aufgabe geloest wird. Die Sensoren streuen, die Diagramme zittern, doch die Physik bleibt unbestechlich: Wer Steigung und Flaeche, Kraft und Gegenkraft, Schwung und Stoss richtig liest, rettet die Mission. In dieser Episode stellst du im Sandbox-Labor die Brems- und Gleitzahlen so ein, dass die Kapsel sicher durchkommt. Beobachte zuerst das Phaenomen in Ruhe, benenne dann die Groessen mit exakten Einheiten, pruefe schliesslich die Bilanz mit einer Gegenrechnung. Der folgende Weg fuehrt vom Alarmton zur sauberen Klausurloesung: erst das Phaenomen beobachten, dann die Begriffe sichern, dann das Modell rechnen und im Labor bestaetigen.

`Klausur-Satz: Siehe Schritt-Inhalt.`

## Schritt 2 — entdecken: Ausruestungskiste der Mars-Crew
PRETRAINING (Kernbegriffe):

- Impuls: $p = m \cdot v$ mit Einheit $1 \, \mathrm{Ns} = 1 \, \mathrm{kgm/s}$.
- Abgeschlossenes System: Keine aeusseren Kraefte, also $p_{gesamt}$ konstant.
- Elastischer Stoss: Impuls und kinetische Energie bleiben erhalten.
- Unelastischer Stoss: Nur der Impuls bleibt erhalten; es entsteht Verformungs- oder Waermeenergie.
- Rueckstoss: Spezialfall mit $p_{vor} = 0$, etwa bei Explosion in zwei Teile.

Klausur-Satz: `Der Impuls ist eine Vektorgroesse; sein Vorzeichen haengt von der gewaehlten positiven Richtung ab.`

`Klausur-Satz: Siehe Schritt-Inhalt.`

## Schritt 3 — entdecken: Wirkungskette hinter Impulserhaltung und Stoesse
ENTDECKEN (ein Konzept plus Diagramm):

Impulserhaltung folgt aus actio gleich reactio: Innere Kraefte heben sich paarweise auf, also kann sich der Gesamtimpuls nicht aendern. Beim Stoss gilt daher $m_1 v_1 + m_2 v_2 = m_1 u_1 + m_2 u_2$. Die Zusatzfrage nach der kinetischen Energie $E_{kin} = m v^2/2$ entscheidet ueber elastisch oder unelastisch. Beim vollstaendig unelastischen Stoss kleben beide Koerper zusammen und bewegen sich mit gemeinsamer Geschwindigkeit $u$.

```diagram
vor dem Stoss:   m1*v1  +  m2*v2
                      ||
                 inneres Kraeftepaar hebt sich auf
                      ||
nach dem Stoss:  m1*u1  +  m2*u2
Zusatztest: E_kin(vor) = E_kin(nach)? elastisch : unelastisch
Spezialfall kleben: u = (m1*v1 + m2*v2) / (m1 + m2)
```

Klausur-Satz: `Die Impulsbilanz gilt bei jedem Stoss, die Energiebilanz nur beim elastischen Stoss zusaetzlich.`

`Klausur-Satz: Siehe Schritt-Inhalt.`

## Anekdote & Fun-Fact

**Anekdote / Fun-Fact (DE)**: Beim Kugelstoss-Pendel (Newton's Cradle) hebt sich aussen eine Kugel, waehrend innen scheinbar nichts geschieht. Der Impuls wandert durch die ruhende Kette, beim ideal elastischen Stoss fast ohne Verlust.

**Bezug zum Konzept**: `Das Pendel zeigt Impulserhaltung plus naeherungsweise Energieerhaltung in Reinform.`

## Schritt 4 — ausprobieren: Sandbox-Auftrag Kraefte der Landung
Kontinuitaet: Vorher Physik-Impulserhaltung-Stoesse-DE-L1.md | Nachher Physik-Kinematik-Messung-DE-L1.md. Krise dieser Episode: Sol-124 Laser-Entfernungsmesser Offset 1,9 m. Target: v0 = 408 m/s, a = 5.1 m/s2, Ziel s = 1688 m.

BEISPIEL (vollstaendige Musterloesung):

[Werkzeug: formula]

AUFGABE (berechnen, AFB II): Ein Wagen $m_1 = 2{,}0 \, \mathrm{kg}$ faehrt mit $v_1 = 3{,}0 \, \mathrm{m/s}$ auf einen ruhenden Wagen $m_2 = 1{,}0 \, \mathrm{kg}$ auf. Nach dem vollstaendig unelastischen Stoss kleben beide zusammen. Berechnen Sie die gemeinsame Geschwindigkeit und den Verlust an kinetischer Energie.

HILFE:
1. Schritt 1: Impulsbilanz $m_1 v_1 = (m_1 + m_2) u$ aufstellen.
2. Schritt 2: $u$ berechnen.
3. Schritt 3: $E_{kin}$ vor und nach vergleichen.

MUSTERLOESUNG: Es gilt $u = m_1 v_1/(m_1 + m_2) = 2{,}0 \cdot 3{,}0/3{,}0 = 2{,}0 \, \mathrm{m/s}$. Vorher: $E_{vor} = 0{,}5 \cdot 2{,}0 \cdot 9{,}0 = 9{,}0 \, \mathrm{J}$. Nachher: $E_{nach} = 0{,}5 \cdot 3{,}0 \cdot 4{,}0 = 6{,}0 \, \mathrm{J}$. Der Verlust betraegt $3{,}0 \, \mathrm{J}$ und erscheint als Verformungs- und Waermeenergie. Der Impuls $p = 6{,}0 \, \mathrm{Ns}$ bleibt erhalten.

Klausur-Satz: `Beim unelastischen Stoss bleibt der Impuls erhalten, waehrend ein Teil der kinetischen Energie in innere Energie umgewandelt wird.`

`Klausur-Satz: Siehe Schritt-Inhalt.`

## Schritt 5 — ausprobieren: Duell der Verfahren Kraefte der Landung
VERGLEICH (erst Verfahren waehlen, dann loesen):

VERGLEICH: Waehle erst das Verfahren — (i) Impuls-Verfahren (Bilanz $p_{vor} = p_{nach}$, immer noetig) oder (ii) Energie-Verfahren als Zusatztest (Vergleich von $E_{kin}$ zur Stossart) — dann loesen.

Weg A: Erst Verfahren waehlen, dann rechnen.

AUFGABE A: Zwei Billardkugeln stossen zusammen; nach dem Stoss rollen beide getrennt weiter. Ist der Stoss elastisch?

Weg B: Alternative Route mit Gegenrechnung.

AUFGABE B: Zwei Tonklumpen stossen zusammen und bleiben vereint liegen. Welche Erhaltungssaetze gelten?

HILFE: A verlangt beide Bilanzen, also Verfahren (i) plus (ii). B zeigt Kleben, also nur Verfahren (i) mit gemeinsamer Masse.

ANTWORT: A erfordert Verfahren (i) plus (ii): Impulsbilanz aufstellen und $E_{kin}$ pruefen; bei Gleichheit elastisch. B erfordert Verfahren (i): $u = (m_1 v_1 + m_2 v_2)/(m_1 + m_2)$; Energie geht teilweise verloren, Impuls bleibt erhalten.

Klausur-Satz: `Kleben verrät den unelastischen Stoss, getrenntes Weiterrollen verlangt den Energietest.`

`Klausur-Satz: Siehe Schritt-Inhalt.`

## Schritt 6 — check: Selbsttest zu Impulserhaltung und Stoesse: Kraefte der Landung
CHECK (drei Fragen mit Antworten):

FRAGE: Wie lautet die Impulsbilanz beim geraden Stoss? | ANTWORT: $m_1 v_1 + m_2 v_2 = m_1 u_1 + m_2 u_2$ mit Vorzeichen je Richtung.
FRAGE: Woran erkennt man einen vollstaendig unelastischen Stoss? | ANTWORT: An der gemeinsamen Geschwindigkeit $u$ und am Verlust kinetischer Energie bei erhaltenem Impuls.
FRAGE: Warum ist das Vorzeichen beim Impuls entscheidend? | ANTWORT: Weil $p = m \cdot v$ eine Vektorgroesse ist und entgegengesetzte Richtungen sich subtrahieren.

Klausur-Satz: `Ohne Vorzeichenregel ist keine Impulsbilanz klausurtauglich.`

`Klausur-Satz: Siehe Schritt-Inhalt.`

## Fehlvorstellung

1. Fehlvorstellung: Bei jedem Stoss bleibe auch die kinetische Energie erhalten.
   Korrektur-Satz: `Nur beim elastischen Stoss bleibt die kinetische Energie erhalten; beim unelastischen Stoss geht ein Teil in innere Energie ueber.`

2. Fehlvorstellung: Impuls und kinetische Energie seien dasselbe, nur mit anderem Namen.
   Korrektur-Satz: `Der Impuls ist linear in v und vektoriell, die kinetische Energie ist quadratisch in v und skalar.`

## Schritt 7 — szenario: Klausurtransfer: Impulserhaltung und Stoesse: Kraefte der Landung
ROLLE: Du bist Praktikantin im Verkehrslabor.
SITUATION: Zwei Spielzeugwagen stossen auf einer Luftkissenbahn zusammen; Wagen 2 stand vorher. Aus Messwerten sollen Stossart und Energieverlust bestimmt werden. Formuliere in circa 150 Woertern die Auswertung mit Impulsbilanz und Energietest und beurteile, ob ein elastischer Stoss vorliegt.
RUBRIC (30 XP): Korrekte Impulsbilanz mit Vorzeichen (10 XP) | Energietest mit Zahlen (10 XP) | Urteil zur Stossart mit Begruendung (6 XP) | Fachsprachliche Darstellung (4 XP).

`Klausur-Satz: Siehe Schritt-Inhalt.`

## Schritt 8 — reflexion: Takeaway & Reflexion: Kraefte der Landung
TAKEAWAY:

Impuls immer bilanzieren, Energie zusaetzlich testen: Erhalten plus erhalten bedeutet elastisch, Impuls erhalten plus Energie verloren bedeutet unelastisch.
Takeaway-Satz: `Der Impuls entscheidet ueber die Bewegung nach dem Stoss, die Energie entscheidet ueber die Stossart.`

REFLEXION:
1. Welcher Schritt fiel schwerer — die Verlustrechnung (Schritt 4) oder die Verfahrenswahl (Schritt 5)?
2. Beim naechsten Mal lege ich zuerst die positive Richtung fest, weil jedes Vorzeichen davon abhaengt.

`Klausur-Satz: Siehe Schritt-Inhalt.`
