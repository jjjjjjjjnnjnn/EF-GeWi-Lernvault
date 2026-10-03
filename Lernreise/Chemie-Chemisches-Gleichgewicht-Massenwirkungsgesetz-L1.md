---
fach: Chemie
thema: "Chemisches Gleichgewicht: Massenwirkungsgesetz und Reaktionsquotient"
level: 1
ziel: Klausur
xp: 100
operatoren: [formulieren, berechnen, beurteilen]
klausurrelevant: true
datum: 2026-10-03
tags: [EF, Chemie, Chemisches-Gleichgewicht, Massenwirkungsgesetz, Gleichgewichtskonstante, Kinetik]
version: Lesson-v3
---

# Lernreise: Chemisches Gleichgewicht: Massenwirkungsgesetz und Reaktionsquotient (L1, Ziel Klausur)

<!-- Campaign: Thermodynamik-und-Gleichgewichte | Episode 3/10 | Krise: Warum stoppt eine chemische Reaktion scheinbar mitten auf halber Strecke, obwohl noch massenhaft Edukte da sind? | Zielgroessen: Dynamisches Gleichgewicht, Massenwirkungsgesetz, Gleichgewichtskonstante Kc, Reaktionsquotient Q | Tool: balance-board -->

## Schritt 1 — entdecken: Die unvollendete Reaktion im Reaktor
ZIELE (3条，本节15分钟学完能做到——先读中文，再记德语)：

1. 中文：能说清化学平衡（chemisches Gleichgewicht）的“动态本质”（dynamisches Gleichgewicht: $v_{\text{hin}} = v_{\text{rueck}}$），解释为什么宏观浓度恒定而微观分子碰撞从未停止。
2. 中文：能根据任意可逆化学反应方程式准确写出质量作用定律表达式（Massenwirkungsgesetz, MWG）并熟练计算平衡常数 $K_c$。
3. 中文：能在高中化学大题（AFB I/II/III）中对比反应商（Reaktionsquotient $Q_c$）与平衡常数 $K_c$，定量判定反应体系的自发移动方向及产率优化方案。

### Hook / Phaenomen

Du leitest in einem luftdicht verschlossenen Hochdruckbehaelter reines Stickstoffgas ($N_2$) und Wasserstoffgas ($H_2$) zusammen. Bei hoher Temperatur und Anwesenheit eines Katalysators beginnen die Molekuele blitzschnell zu Ammoniak ($NH_3$) zu reagieren. Die Konzentration von Ammoniak steigt rasant an – doch nach einigen Minuten geschieht etwas Merkwuerdiges: Das Messinstrument bleibt ploetzlich wie festgenagelt stehen. Obwohl im Behaelter immer noch gigantische Mengen unverbrauchter Stickstoff- und Wasserstoffmolekuele vorhanden sind, wird kein einziges zusaetzliches Gramm Ammoniak mehr gebildet. Hat die Reaktion einfach aufgehoert? Sind die Katalysatoren ermuedet? Wenn du nun radioaktiv markierten Stickstoff in den Tank injizierst, stellst du mit Erstaunen fest, dass die radioaktiven Atome binnen Sekunden im Ammoniak auftauchen! Die Reaktion hat zu keinem Zeitpunkt geschlafen. Sie befindet sich in einem permanenten, hochenergetischen dynamischen Tauziehen, bei dem jede Sekunde genauso viele Molekuele neu entstehen wie auf der Gegenseite wieder in ihre Einzelteile zerfallen.

`Klausur-Satz: Im dynamischen chemischen Gleichgewicht sind die Geschwindigkeiten von Hin- und Rueckreaktion exakt identisch, wodurch sich makroskopisch konstante Stoffkonzentrationen einstellen.`

## Schritt 2 — entdecken: Das chemische Handwerkszeug des Gleichgewichts
PRETRAINING术语盒（核心4词，先读三遍中德，合书自测中文→德语）：

- 动态平衡 — Dynamisches Gleichgewicht: 正逆反应速率严格相等的稳态。 Der Zustand einer reversiblen Reaktion, in dem die Bildungsgeschwindigkeit der Produkte exakt gleich der Rueckbildungsgeschwindigkeit der Edukte ist ($v_{\text{hin}} = v_{\text{rueck}}$).
- 质量作用定律 — Massenwirkungsgesetz (MWG): 在恒温下，化学平衡时生成物平衡浓度幂之积与反应物平衡浓度幂之积的比值为一常数。 Die mathematische Gesetzmaessigkeit, dass der Quotient aus den molaren Gleichgewichtskonzentrationen der Produkte und Edukte (potenziert mit ihren stoechiometrischen Koeffizienten) bei konstanter Temperatur konstant ist.
- 平衡常数 — Gleichgewichtskonstante ($K_c$): 表征在特定温度下平衡体系中产物与反应物相对丰度极限的热力学常数。 Eine thermodynamische Zustandsgroesse, deren Zahlenwert angibt, wie weit das Gleichgewicht auf der Produktseite ($K_c \gg 1$) oder Eduktseite ($K_c \ll 1$) liegt.
- 反应商 — Reaktionsquotient ($Q_c$): 在任意非平衡时刻按质量作用定律形式计算的浓度商，用于与 $K_c$ 比对判定反应方向。 Der momentane Konzentrationsquotient, dessen Vergleich mit $K_c$ die Richtung der spontanen Gleichgewichtseinstellung anzeigt.

## Schritt 3 — entdecken: Die Kinetik des Gleichgewichts im Diagramm
ENTDECKEN（1概念 + 1文字图解）：

```diagram
Reaktionsgeschwindigkeiten ueber der Zeit:

Geschwindigkeit v
 ^
 |  v_hin (Edukte -> Produkte, nimmt durch Konzentrationsabnahme ab)
 |  \
 |   \
 |    \ . - ~ - ~ - ~ - ~ - ~ - ~ - .   <- GLEICHGEWICHT: v_hin = v_rueck!
 |    /                                 (Keine makroskopische Aenderung!)
 |   /
 |  / v_rueck (Produkte -> Edukte, nimmt durch Produktzunahme zu)
 0 +------------------------------------------------------------------> Zeit t
```

Allgemeine Reaktionsgleichung: $a\,A + b\,B \rightleftharpoons c\,C + d\,D$
Massenwirkungsgesetz:
$$K_c = \frac{c(C)^c \cdot c(D)^d}{c(A)^a \cdot c(B)^b}$$

`Klausur-Satz: Ein Katalysator beschleunigt Hin- und Rueckreaktion im exakt gleichen Verhaeltnis; er verkuerzt die Zeit bis zur Gleichgewichtseinstellung, veraendert aber den Zahlenwert der Gleichgewichtskonstanten Kc nicht.`

## Schritt 4 — ausprobieren: Der Reaktionsquotient-Rechner

[Werkzeug: balance-board]

AUFGABE (formulieren & berechnen, AFB I/II):
Fuer die Esterbildung aus Essigsaeure ($CH_3COOH$) und Ethanol ($C_2H_5OH$) zu Essigsaeureethylester ($CH_3COOC_2H_5$) und Wasser gilt bei $25\,^\circ\text{C}$ der Gleichgewichtswert $K_c = 4{,}0$:
$CH_3COOH + C_2H_5OH \rightleftharpoons CH_3COOC_2H_5 + H_2O$
In einem Reaktionsgefaess werden folgende Momentankonzentrationen gemessen:
- $c(\text{Essigsaeure}) = 0{,}5\,\text{mol/l}$
- $c(\text{Ethanol}) = 0{,}5\,\text{mol/l}$
- $c(\text{Ester}) = 0{,}2\,\text{mol/l}$
- $c(\text{Wasser}) = 0{,}2\,\text{mol/l}$
1. Berechne den aktuellen Reaktionsquotienten $Q_c$.
2. Vergleiche $Q_c$ mit $K_c$ und begruende, in welche Richtung die Reaktion spontan weiterlaufen muss, um das chemische Gleichgewicht zu erreichen.

MUSTERLOESUNG:
1. Berechnung von $Q_c$:
   $$Q_c = \frac{c(\text{Ester}) \cdot c(\text{Wasser})}{c(\text{Essigsaeure}) \cdot c(\text{Ethanol})} = \frac{0{,}2\,\text{mol/l} \cdot 0{,}2\,\text{mol/l}}{0{,}5\,\text{mol/l} \cdot 0{,}5\,\text{mol/l}} = \frac{0{,}04}{0{,}25} = 0{,}16$$
2. Vergleich und Richtungsentscheidung:
   - Der aktuelle Quotient betraegt $Q_c = 0{,}16$.
   - Der geforderte Gleichgewichtswert betraegt $K_c = 4{,}0$.
   - Da $Q_c < K_c$ gilt, ist der Zaehler (Produkte) im Verhaeltnis zum Nenner (Edukte) viel zu klein.
   - Die Hinreaktion laeuft schneller ab als die Rueckreaktion: Es muessen weitere Edukte verbraucht und zusaetzlicher Ester gebildet werden, bis der Quotient den Wert 4,0 erreicht. Die Reaktion verschiebt sich nach rechts (zur Produktseite).

## Schritt 5 — ausprobieren: Duell der Zustaende: Dynamisch vs. Statisch

VERGLEICH: Dynamisches Gleichgewicht vs. Statischer Stillstand (选概念)

- Position A (Dynamisches Gleichgewicht / Chemie):
  - Zustand: Reaktionen laufen mikroskopisch mit maximaler Vehemenz in beide Richtungen ununterbrochen weiter ($v_{\text{hin}} = v_{\text{rueck}} > 0$).
  - Stoerung: Reagiert flexibel auf Temperatur-, Druck- und Konzentrationsaenderungen nach dem Prinzip von Le Chatelier.
- Position B (Statischer Stillstand / Mechanik):
  - Zustand: Alle Kraefte heben sich auf; keine Bewegung mehr vorhanden ($v = 0$, z. B. ein Buch auf dem Tisch).
  - Stoerung: Keine mikroskopische Regenerationsfaehigkeit.

Entscheidungsregel fuer die Klausur:
Wird nach `Beweis fuer ein dynamisches Gleichgewicht` gefragt, fuehre immer das Experiment mit radioaktiven Isotopen an: Werden markierte Edukte zugegeben, tauchen diese zwingend in den Produkten auf, was einen statischen Stillstand experimentell widerlegt!

## Schritt 6 — check: Klausur-Transfer Ammoniaksynthese und Temperaturabhaengigkeit

PRUEFUNGSSZENARIO (KLP NRW Chemie LK Inhaltsfeld 2: Chemische Gleichgewichte):

### AFB I: MWG-Formulierung
Formuliere das Massenwirkungsgesetz fuer das Haber-Bosch-Gleichgewicht:
$N_2(g) + 3\,H_2(g) \rightleftharpoons 2\,NH_3(g) \quad (\Delta H = -92\,\text{kJ/mol})$
Gib die Einheit der Gleichgewichtskonstanten $K_c$ an.

### AFB II: Thermodynamische Analyse
Die Gleichgewichtskonstante $K_c$ sinkt bei einer Temperaturerhoehung von $300\,^\circ\text{C}$ auf $500\,^\circ\text{C}$ deutlich ab.
Erlaeutere diesen Befund unter Verknuepfung der exothermen Reaktionsenthalpie mit dem Prinzip des kleinsten Zwanges (Le Chatelier).

### AFB III: Technologischer Kompromiss
Erklaere den ingenieurtechnischen Zielkonflikt der industriellen Synthese: Warum waehlt man in der Praxis eine relativ hohe Temperatur von ca. $450\,^\circ\text{C}$, obwohl das thermodynamische Gleichgewicht bei Raumtemperatur viel mehr Ammoniak liefern wuerde?

## Schritt 7 — check: Format-Check & Scoring

30 XP Schnelltest zur Verstaendigungssicherung:

FRAGE: Was geschieht mit dem Zahlenwert der Gleichgewichtskonstanten Kc, wenn man die Konzentration eines Ausgangsstoffes verdoppelt?
ANTWORT: Kc bleibt voellig unveraendert! Kc ist eine reine Temperaturfunktion. Bei Konzentrationserhoehung verschiebt sich lediglich die Gleichgewichtslage, um denselben Quotienten Kc wiederherzustellen.

FRAGE: Welche Konzentrationen fester Stoffe (z. B. reines Calciumcarbonat) gehen in das Massenwirkungsgesetz heterogener Gleichgewichte ein?
ANTWORT: Feste Phasen besitzen eine konstante Dichte/Aktivitaet und werden konventionsgemaess mit dem Wert 1 angesetzt bzw. direkt in die Gleichgewichtskonstante Kc einbezogen.

## Schritt 8 — reflexion: Meisterschaft & Naechste Mission

REFLEXION:
Du hast das fundamentale Herzstueck der physikalischen Chemie verstanden. Du kannst chemische Gleichgewichte kinetisch und thermodynamisch berechnen und industrielle Synthesebedingungen analysieren.

Im kommenden Chemie-Modul vertiefen wir Saeure-Base-Gleichgewichte: pH-Wert-Berechnungen starker und schwacher Saeuren, Pufferloesungen und Titrationskurven.
