---
fach: Mathe
thema: "CN-Formeln dreisprachig diktieren und rechnen"
level: 1
ziel: Klausur
xp: 100
operatoren: [darstellen, berechnen, erlaeutern]
klausurrelevant: true
datum: 2026-09-26
tags: [EF, Mathe, CN]
version: Lesson-v3
---

# Lernreise: CN-Formeln dreisprachig diktieren und rechnen (L1, Ziel Klausur)

<!-- Campaign: Optimierung | Episode 3/33 | Krise: Container-Frachter Stabilitaet kippt bei 18,5 t | Target: x0 = 5, h = 0.4, Target m = 4.11 | Tool: formula -->

## Schritt 1 — entdecken: Formelkeller des CAO
ZIELE (drei messbare Ziele dieser Lektion):

1. Du kannst Potenzregel $(x^n)' = n x^{n-1}$, Vieta $x_1+x_2 = -b/a$, AM-GM fuer $a,b > 0$, $|\vec{a}|$ und Laplace $P =$ guenstig durch moeglich je mit Bedingung nennen.
2. Du kannst jede Merkregel in Bedingungssatz plus Anwendungssatz uebersetzen und $h'(1) = 12$ sowie Vieta $4$ und $5$ vorrechnen.
3. Du kannst ohne Hilfsmittel Ableitung, Nullstellenprobe, Betrag und $P(E)$ bestimmen und jede Formel nur unter ihrer Bedingung einsetzen (AFB I/II).

###

### Hook / Phaenomen

【首席算法官·第3集/共33集】警报：Container-Frachter Stabilitaet kippt bei 18,5 t。首席算法官下令：“x0 = 5, h = 0.4, Target m = 4.11！”全场红灯闪烁。上一集（Mathe-Ableitungsregeln-Polynome-L1.md）的伏笔在此引爆，下一集（Mathe-CN-Formeln-L1.md）只给交出最优解的人放行。本集你要在沙盘里亲手把工程从亏损/相撞边缘拉回来：先看现象、再点装备、最后算出让审计点头的 Bilanz。记住：先看区间还是时刻、再选割线还是切线/极值还是向量，做完必做 Gegenprobe——这就是工程帝国法则，也是 Klausur 拿分法则。

Hook / Phaenomen (CAO-Log, Episode 3 von 33): Super-Engineering-Zentrale, Container-Frachter Stabilitaet kippt bei 18,5 t. Der Chief Algorithm Officer ruft: x0 = 5, h = 0.4, Target m = 4.11, die Assistentin meldet Rot-Alarm auf allen Screens. Genau hier entscheidet CN-Formeln dreisprachig diktieren und rechnen ueber Freigabe oder Sperrung, ueber Kostenexplosion oder Rekordgewinn, ueber Kollision oder gruene Welle. Das Protokoll der Vorwoche (Mathe-Ableitungsregeln-Polynome-L1.md) legte die Spur, das naechste Audit (Mathe-CN-Formeln-L1.md) laesst keine Ausrede mehr zu. Die Messwerte streuen, die Kurven zittern, doch die Mathematik bleibt unbestechlich: Wer Sekante und Tangente, Maximum und Wendepunkt, Vektor und Ebene richtig liest, rettet das Projekt. In dieser Episode stellst du im Sandbox-Optimierer die Parameter so ein, dass alle Kennzahlen im gruenen Bereich landen. Beobachte zuerst das Phaenomen in Ruhe, benenne dann die Objekte mit exakter Notation, pruefe schliesslich das Ergebnis mit einer Gegenrechnung. Der folgende Weg fuehrt vom Alarmton zur sauberen Klausurloesung: erst das Phaenomen beobachten, dann die Begriffe sichern, dann das Modell rechnen und im Labor bestaetigen.

`Klausur-Satz: Siehe Schritt-Inhalt.`

## Schritt 2 — entdecken: Ausruestungskiste der Algorithmus-Unit
PRETRAINING-Box (fuenf Kernbegriffe mit Definitionen):

### Hook / Phaenomen

Fuenf Formeln, fuenf Fallen: Der Exponent wird gesenkt, doch worauf? Die Summe stimmt, doch wofuer? Ohne Bedingung ist jede Formel ein Blindflug. Welche fuenf Paare aus Formel und Bedingung tragen durch Teil A ohne Formelsammlung?

### Fachbegriffe & Definitionen

- **Potenzregel: (幂法则)** $(x^n)' = n \cdot x^{n-1}$ nur fuer Potenzen; Exponent wird Faktor und minus eins.
- **Satz von Vieta: (韦达定理)** $x_1+x_2 = -b/a$, $x_1 \cdot x_2 = c/a$ nur fuer $ax^2+bx+c = 0$ mit $a \ne 0$.
- **AM-GM-Ungleichung: (均值不等式)** $(a+b)/2 \ge \sqrt{ab}$ nur fuer $a,b > 0$; Gleichheit genau bei $a = b$.
- **Betrag eines Vektors: (向量模长)** $|\vec{a}| = \sqrt{a_1^2+a_2^2+a_3^2}$ aus Koordinaten im Raum.
- **Laplace-Experiment: (古典概型)** $P(E) =$ guenstig durch moeglich nur bei gleich wahrscheinlichen Ergebnissen.

### Wirkungsgefuege / Modell

Die Kette lautet: Formel nennen, Bedingung pruefen, dann erst rechnen. Vieta an $x^2-9x+20$ ist erlaubt und liefert $4$ und $5$ in Sekunden; Vieta an $x^3$ ist verboten und kostet Punkte. AM-GM an $x + \frac{4}{x}$ mit $x > 0$ liefert Minimum $4$ bei $x = 2$; an $x < 0$ versagt sie. Die Bedingung ist kein Anhaengsel, sondern die Haelfte der Leistung.

Klausur-Satz: `Jede Formel gilt nur unter ihrer Bedingung; die Potenzregel etwa nur fuer Potenzen, AM-GM nur fuer positive Zahlen.`

`Klausur-Satz: Siehe Schritt-Inhalt.`

## Schritt 3 — entdecken: Wirkungskette hinter CN-Formeln dreisprachig diktieren und rechnen
EXPERIMENTELLE ERKUNDUNG (PhET Sandbox, erst spielen, dann deuten):

### Hook & Phaenomen

Drei Sprachen fuer eine Formel wirken wie Ballast, doch das Diktat sichert die Klausur. Intuitiv lernt man nur die Symbole, doch ohne Bedingungssatz wendet man die falsche Regel an. Warum verbindet erst die Merkregel plus Sprache die Formel mit dem richtigen Fall?

### Spiel-Aufgabe / Challenge

Oeffne die Sandbox und waehle die Sprachen Deutsch, Chinesisch und Symbol ueber die Schalter. Ziehe den Slider Tempo von langsam bis Pruefungstempo und beobachte die Formeln $h'(x) = 15x^2-4x+1$ und $x^2-9x+20 = 0$. Sprich jede Formel in allen drei Modi und protokolliere Fehler.

### Aha-Moment & Gesetz

Die Kette lautet Merkregel gegen Sprache gegen Anwendung: Potenzregel $(x^n)' = n x^{n-1}$ plus Vieta Summe und Produkt. Handschriftlich gilt fuer $h(x) = 5x^3-2x^2+x$ genau $h'(x) = 15x^2-4x+1$ zu $h'(1) = 12$. Fuer $x^2-9x+20 = 0$ bestaetigen Summe $9$ und Produkt $20$ die Loesungen $4$ und $5$. Die Sprache waehlt den Ansatz, die Regel liefert die Zahl.

```diagram
  DE | CN | Symbol > Formel
  +--------------------------> Tempo
  h prime =15x2-4x+1 > h prime (1)=12
  x2-9x+20=0 > Summe 9 Produkt 20
  Loesungen 4 und 5 > Vieta Probe
  Sprache waehlt > Regel rechnet
```

Klausur-Satz: `Ich verbinde eine Merkregel mit dem deutschen Bedingungssatz, um die Formel klausurtauglich anzuwenden.`

`Klausur-Satz: Siehe Schritt-Inhalt.`

## Anekdote & Fun-Fact

Das Wort Algebra stammt aus dem Arabischen $al\text{-}dschabr$ und bedeutet etwa das Wiederherstellen. Es geht auf ein Lehrbuch des Gelehrten al-Chwarizmi zurueck, der im 9. Jahrhundert in Bagdad wirkte; aus seinem Namen wurde spaeter das Wort Algorithmus. Formeln wie die $pq$-Formel oder der Satz von Vieta sind seitdem durch viele Sprachen und Kulturen gewandert.

Bezug zum Konzept: `Kernformeln sind kulturuebergreifend; die systematische Arbeit mit Merkregel und Bedingungssatz setzt ihre Wanderung durch die Sprachen fort.`

## Schritt 4 — ausprobieren: Sandbox-Auftrag Formelkeller des CAO
Kontinuitaet: Vorher Mathe-Ableitungsregeln-Polynome-L1.md | Nachher Mathe-CN-Formeln-L1.md. Krise dieser Episode: Container-Frachter Stabilitaet kippt bei 18,5 t. Target: x0 = 5, h = 0.4, Target m = 4.11.

BEISPIEL (Sandbox Level mit Werkzeug):

[Werkzeug: formula]

Stelle in der Sandbox (formula) die Formel und das Tempo ein, ziehe den Slider Tempo von langsam bis Pruefungstempo und lies die Anzeige ab; AUFGABE (Levelziel, AFB II): Bestehe das Diktat Level: Diktiere in der Sandbox $h'(x)$ und die Vieta Probe in zwei Tempi und berechne dann $h'(1)$ sowie die Loesungen von $x^2-9x+20 = 0$ schriftlich.

HILFE:
1. Wende die Potenzregel gliedweise auf $h(x) = 5x^3-2x^2+x$ an zu $h'(x) = 15x^2-4x+1$.
2. Setze $x = 1$ ein zu $h'(1) = 15-4+1 = 12$.
3. Pruefe $x^2-9x+20 = 0$ mit Summe $9$ und Produkt $20$ zu $4$ und $5$.

MUSTERLOESUNG: Sandbox Diktat in zwei Tempi fehlerfrei. Rechnung $h'(x) = 5 \cdot 3x^2-2 \cdot 2x+1 = 15x^2-4x+1$ und $h'(1) = 15-4+1 = 12$. Gleichung $x^2-9x+20 = 0$ mit Vieta Summe $4+5 = 9$ und Produkt $4 \cdot 5 = 20$ bestaetigt $x = 4$ und $x = 5$. Merkregel plus Bedingungssatz sichern die klausurtaugliche Anwendung.

Klausur-Satz: `Mit der Potenzregel folgt h'(x) = 15x^2 - 4x + 1 und h'(1) = 12; nach dem Satz von Vieta bestaetigen Summe 9 und Produkt 20 die Loesungen 4 und 5.`

`Klausur-Satz: Siehe Schritt-Inhalt.`

## Schritt 5 — ausprobieren: Duell der Verfahren Formelkeller des CAO
VERGLEICH (Wahl des Verfahrens, A gegen B):

VERGLEICH: Triff zuerst die Wahl des Verfahrens: (i) Satz von Vieta (gegebene Nullstellen ueber Summe und Produkt pruefen) oder (ii) AM-GM-Verfahren (Minimum einer Summe positiver Terme mit festem Produkt bestimmen) > dann loesen.

Weg A: Erst Verfahren waehlen, dann rechnen.

AUFGABE A: Sind $2$ und $7$ die Loesungen der Gleichung $x^2 - 9x + 14 = 0$?
Weg B: Alternative Route mit Gegenrechnung.

AUFGABE B: Fuer $x > 0$ ist $A(x) = x + 25/x$ gegeben. Bestimmen Sie den minimalen Wert von $A$.

HILFE: Aufgabe A fragt, ob gegebene Zahlen die Gleichung loesen, daher Verfahren (i) mit Vieta. Aufgabe B fragt nach dem Minimum einer Summe positiver Terme, daher Verfahren (ii) mit AM-GM.

ANTWORT: A erfordert Verfahren (i): Hier gilt $a = 1$, $b = -9$, $c = 14$, also Summe $9$ und Produkt $14$; wegen $2 + 7 = 9$ und $2 \cdot 7 = 14$ sind $2$ und $7$ tatsaechlich die Loesungen. B erfordert Verfahren (ii): Da $x > 0$ und $25/x > 0$ gilt, folgt mit AM-GM $A(x) \ge 2 \cdot \sqrt{x \cdot 25/x} = 2 \cdot 5 = 10$; Gleichheit gilt fuer $x = 25/x$, also $x = 5$, und der minimale Wert ist $A(5) = 10$.

Klausur-Satz: `Vieta prueft vorhandene Loesungen ueber Summe und Produkt, AM-GM schaetzt eine Summe positiver Terme nach unten ab.`

`Klausur-Satz: Siehe Schritt-Inhalt.`

## Schritt 6 — check: Selbsttest zu CN-Formeln dreisprachig diktieren und rechnen: Formelkeller des CAO
CHECK (drei Fragen mit Antworten):

FRAGE: Wie lauten Summe und Produkt der Loesungen von $ax^2 + bx + c = 0$ nach Vieta? | ANTWORT: $x_1 + x_2 = -b/a$ und $x_1 \cdot x_2 = c/a$ (mit $a \ne 0$).
FRAGE: Unter welcher Bedingung gilt die AM-GM-Ungleichung, und wann herrscht Gleichheit? | ANTWORT: Nur fuer positive Zahlen $a, b > 0$; Gleichheit gilt genau dann, wenn $a = b$ ist.
FRAGE: Wie berechnet man die Laenge des Vektors $\vec{a} = (a_1, a_2, a_3)$? | ANTWORT: $|\vec{a}| = \sqrt{a_1^2 + a_2^2 + a_3^2}$, also die Wurzel der Summe der Quadrate.

Klausur-Satz: `Nach Vieta gilt fuer ax^2 + bx + c = 0 die Beziehung x1 + x2 = -b/a und x1 * x2 = c/a.`

`Klausur-Satz: Siehe Schritt-Inhalt.`

## Fehlvorstellung

(Kein Schritt; wird vom Parser uebersprungen.)

1. Fehlkonzept: Die AM-GM-Ungleichung gilt fuer beliebige Zahlen und kann ohne Pruefung angewandt werden.
   Korrektur-Satz: `Die AM-GM-Ungleichung gilt nur fuer positive Zahlen; die Positivitaet muss vor der Abschaetzung nachgewiesen werden.`
2. Fehlkonzept: Die Vieta-Beziehungen gelten in derselben Form auch fuer Gleichungen dritten Grades.
   Korrektur-Satz: `Der Satz von Vieta in der Form x1 + x2 = -b/a gilt nur fuer quadratische Gleichungen.`

## Schritt 7 — szenario: Klausurtransfer: CN-Formeln dreisprachig diktieren und rechnen: Formelkeller des CAO
ROLLE: Du bist Tutor und haeltst eine kurze Formeldiktat-Runde im EF-Kurs.
SITUATION: Ein Mitschueler kennt die Merkregeln, kann sie aber nicht in deutsche Klausursaetze uebersetzen und schreibt im Test nur Ergebnisse ohne Bedingung. Erklaere ihm in einer zusammenhaengenden Darstellung (circa 150 Woerter) an zwei Beispielen (Potenzregel und AM-GM), wie man eine Formel mit Bedingungssatz klausurtauglich aufschreibt.
AUFGABE (erlaeutern, AFB III): Verfasse eine zusammenhaengende Darstellung von etwa 150 Woertern mit Prinzip, zwei Beispielen und Fazit.
RUBRIC (30 XP): Erklaerung des Drei-Bausteine-Prinzips (Merkregel, Bedingung, Anwendung) (5 XP) | Korrektes Beispiel zur Potenzregel mit Anwendungssatz (10 XP) | Korrektes Beispiel zu AM-GM mit Positivitaetsbedingung und Gleichheitsfall (10 XP) | Fazit zum Verhaeltnis von Heuristik und Beweispflicht (5 XP).

`Klausur-Satz: Siehe Schritt-Inhalt.`

## Schritt 8 — reflexion: Takeaway & Reflexion: Formelkeller des CAO
TAKEAWAY (Kernbotschaft in einem Kasten):

Jede Formel braucht drei Bausteine: Die Merkregel sichert Tempo und Auswahl, der Bedingungssatz sichert die Anwendbarkeit, der Anwendungssatz sichert die Punkte. Die Potenzregel verlangt Exponent minus eins, Vieta gilt nur fuer quadratische Gleichungen, AM-GM verlangt zuerst den Nachweis positiver Terme und die Gleichheitsbedingung, die Vektorlaenge ist die Wurzel der Quadratsumme, Laplace teilt guenstig durch moeglich.

Takeaway-Satz: `Kernformeln werden mit ihrer Bedingung gelernt; die Merkregel wird erst durch den deutschen Bedingungssatz klausurtauglich.`

REFLEXION (zwei Fragen):
1. Welcher Schritt fiel schwerer: das Diktat der Formeln mit Bedingungen (Schritt 2) oder die Zuordnung der passenden Formel im Vergleich (Schritt 5)?
2. Beim naechsten Mal notiere ich zu jeder Formel sofort ihre Bedingung, bevor ich sie anwende.

`Klausur-Satz: Siehe Schritt-Inhalt.`
