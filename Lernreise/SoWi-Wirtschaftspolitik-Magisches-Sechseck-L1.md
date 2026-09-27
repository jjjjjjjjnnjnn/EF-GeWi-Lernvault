---
fach: SoWi
thema: "Wirtschaftspolitik und Magisches Sechseck"
level: 1
ziel: Klausur
xp: 100
operatoren: [darstellen, analysieren, beurteilen]
klausurrelevant: true
datum: 2026-09-26
tags: [EF, SoWi, Wirtschaftspolitik]
version: Lesson-v3
---

# Lernreise: Wirtschaftspolitik und Magisches Sechseck (L1, Ziel Klausur)

> Kampagne *Virtuelle Stadt-Tycoon — Von der Apfelmarkt-Fehde zum modernen Sozialstaat*: Akt I-II — Apfelmarkt und Mietendeckel — Episode 44, Cast: Stadtbibliothekar Dr. Felix Aurich. Werkzeug dieser Episode: [markt-sim].

<!-- Lesson v3: Schritt 1-8 feste Struktur; Fehlvorstellung zwischen Schritt 6 und 7 (Parser skip); [Werkzeug: markt-sim] interaktiv; Gating: check/szenario nicht bestanden = Weiter grau; XP: entdecken 5 / ausprobieren 15 / check 20 / szenario 30 -->

## Schritt 1 — entdecken: Alarm in Tycoon City: Bibliotheks-Nachtschicht vor dem Urteil


> EPISODE 44｜Akt I-II — Apfelmarkt und Mietendeckel｜召集人 Stadtbibliothekar Dr. Felix Aurich：Bibliotheks-Nachtschicht vor dem Urteil。

HOOK 市长危机（先读剧情，再进 ZIELE）：【本集战役 EP44｜Akt I-II — Apfelmarkt und Mietendeckel｜虚拟城邦 Tycoon City 告急】市长办公室深夜灯火通明，Stadtbibliothekar Dr. Felix Aurich 冲进来报告：Bibliotheks-Nachtschicht vor dem Urteil，而明天市议会就要投票。集市在喊、长队在排、国库在抖：苹果集市价格战一路烧到租金黑市，再烧到基尼天平与劳资谈判桌，本集正是“Wirtschaftspolitik und Magisches Sechseck”的现实引爆点。你的身份是市长直属经济改革规划委员：把街头危机翻译成考点，用沙盘 [markt-sim] 拿出可验证的数值方案，再交出一份 Klausur 满分答卷稳住议会。通关线索：TARGET: Stellt im Sandkasten Angebot und Nachfrage so ein, dass der Gleichgewichtspreis zwischen 8 und 12 Euro liegt, die gehandelte Menge mindestens 100 Einheiten erreicht und ein Probe-Hoechstpreis von 6 Euro als bindend mit Warteschlange entlarvt wird. 上一集的结尾就是这一集的悬念——黑市账本、税改天平、劳资天平、选票天平，四座天平有一座倒了，城邦就停摆。电台正在直播，反对派等着挑错：先读 ZIELE，再啃术语，把传导机制画成你的作战地图。DE-Briefing: Episode 44 — Stadtbibliothekar Dr. Felix Aurich meldet Bibliotheks-Nachtschicht vor dem Urteil; der Stadtrat entscheidet morgen. Rette Tycoon City mit Analyse, Sandkasten und Klausur-Antwort zum Thema Wirtschaftspolitik und Magisches Sechseck.

ZIELE (3 Ziele, nach 15 Minuten erreichbar):

1. Du kannst die sechs Ziele $Wachstum + Preisstabilitaet + Beschaeftigung + Aussenwirtschaft + Verteilung + Umwelt$ nennen.
2. Du kannst Zielkonflikte wie $Phillips$-$Kurve$ mit $\pi$ gegen $u$ und $Okun$ mit $Y$ gegen $u$ analysieren.
3. Du kannst eine Massnahme wie $G \uparrow$ oder $i \downarrow$ mit $BIP = C + I + G + (Ex - Im)$ beurteilen (AFB II).

EINSTIEG: Im Jahr 1973 explodierte der Oelpreis und die Regierung stand vor der Wahl zwischen Inflation und Arbeitslosigkeit. Jede Hilfe gegen ein Ziel schadete einem anderen. Dieses Dilemma heisst Magisches Sechseck: Sechs Wuensche, ein Instrumentenkasten, viele Nebenwirkungen.

Klausur-Satz: `Stabilitaetspolitik muss sechs Ziele mit wenigen Instrumenten gleichzeitig treffen.`

## Schritt 2 — entdecken: Werkzeugkoffer von Stadtbibliothekar Dr. Felix Aurich: 5 Begriffe scharf stellen

GRUNDBEGRIFFE (5 Begriffe):

- **Wirtschaftswachstum**: Anstieg von $Y = BIP_{real}$, Ziel etwa $1$-$2\,\%$ pro Jahr.
- **Preisniveaustabilitaet**: Inflation $\pi \approx 2\,\%$, gemessen mit $CPI = \frac{Warenkorb_t}{Warenkorb_0} \cdot 100$.
- **Hoher Beschaeftigungsstand**: Arbeitslosenquote $u = \frac{U}{Erwerbspersonen} \cdot 100$, Ziel Vollbeschaeftigung.
- **Aussenwirtschaftliches Gleichgewicht**: $Ex \approx Im$, stabiler Kurs ohne Dauerdefizit.
- **Zielkonflikt**: Verbesserung bei $Ziel_A$ verschlechtert $Ziel_B$, etwa $\pi \downarrow$ gegen $u \uparrow$.

Klausur-Satz: `Sechs Ziele konkurrieren um dieselben Instrumente.`

## Schritt 3 — entdecken: Uhrwerk des Marktes: Kette von Ursache zu Wirkung

KONZEPT (ein Konzept plus ein Textdiagramm):

Das Stabilitaetsgesetz von 1967 nannte vier Ziele, Umwelt und Verteilung kamen spaeter hinzu. Expansive Fiskalpolitik mit $G \uparrow$ hebt $Y$ und senkt $u$, treibt aber $\pi$ und $Defizit$. Restriktive Geldpolitik mit $i \uparrow$ senkt $\pi$, bremst aber $I$ und $Y$. Die $Phillips$-$Kurve$ fasst den Kern: Kurzfristig sinkt $u$ nur um den Preis von $\pi$.

```diagram
         Preisstabilitaet (pi=2%)
                /\
               /  \
   Wachstum --+Sechseck+-- Umwelt
    (Y up)     \  /     (CO2 down)
               \/ \
     Beschaeftigung  Verteilung + Aussen
       (u down)      (Gini down, Ex=Im)
    Konflikt: G up -> Y up, u down, pi up
    Konflikt: i up -> pi down, Y down, u up
```

Klausur-Satz: `Jedes Instrument trifft mehrere Ziele mit gegensinniger Wirkung.`

## Schritt 4 — ausprobieren: Sandkasten-Einsatz [markt-sim]: Rette die Stadt mit Zahlen

BEISPIEL (Musteraufgabe mit Werkzeug):

[Werkzeug: markt-sim]

TARGET: Stellt im Sandkasten Angebot und Nachfrage so ein, dass der Gleichgewichtspreis zwischen 8 und 12 Euro liegt, die gehandelte Menge mindestens 100 Einheiten erreicht und ein Probe-Hoechstpreis von 6 Euro als bindend mit Warteschlange entlarvt wird.

AUFGABE (analysieren, AFB II): Analysieren Sie eine Zinssenkung $i \downarrow$ mit dem Sechseck und $BIP = C + I + G + (Ex - Im)$.

HILFE:
1. Schritt 1: Liste alle sechs Ziele als Pruefraster auf.
2. Schritt 2: Verfolge $i \downarrow \to I \uparrow \to Y \uparrow \to u \downarrow$.
3. Schritt 3: Pruefe Nebenwirkung $\pi \uparrow$ und $Aussen$-$Kurs$.

MUSTERLOESUNG: Die Zinssenkung verbilligt Kredite, also steigt $I$ und damit $Y = C + I + G + (Ex - Im)$. Wachstum und Beschaeftigung verbessern sich, weil $u$ faellt. Gleichzeitig droht $\pi > 2\,\%$, weil ausgelastete Kapazitaeten Preise heben; der Aussenwert kann sinken und Verteilung sowie Umwelt leiden, wenn Gewinne staerker steigen als Loehne und Produktion $CO_2$ treibt. Urteil: Kurzfristig expansiv sinnvoll, langfristig inflationsriskant.

Klausur-Satz: `Expansiv hilft Beschaeftigung, riskiert aber Preisstabilitaet.`

## Schritt 5 — ausprobieren: Duell der Wege: Weg A gegen Weg B

VERGLEICH (Verfahren A gegen Verfahren B):

VERGLEICH: Waehle zuerst das Verfahren — (i) Fiskal-Verfahren (mit $G$ und $T$ argumentieren) oder (ii) Geld-Verfahren (mit $i$ und $M$ argumentieren) — dann loesen.

AUFGABE A: Beurteilen Sie ein Konjunkturpaket $G \uparrow$ bei $u = 8\,\%$.
AUFGABE B: Beurteilen Sie eine Zinserhoehung $i \uparrow$ bei $\pi = 5\,\%$.

HILFE: A nennt Staatshaushalt, also Verfahren (i). B nennt Zins und Inflation, also Verfahren (ii).

ANTWORT: A erfordert Verfahren (i): $G \uparrow$ hebt $Y$ direkt, senkt $u$, erhöht aber $Defizit$ und $\pi$. B erfordert Verfahren (ii): $i \uparrow$ senkt $I$ und $\pi$, bremst aber $Y$ und hebt $u$.

Klausur-Satz: `Hohe Arbeitslosigkeit ruft Fiskal, hohe Inflation ruft Geldpolitik.`

## Schritt 6 — check: Selbsttest zu Wirtschaftspolitik und Magisches Sechseck

CHECK (Selbsttest, 3 Fragen):

FRAGE: Nennen Sie die sechs Ziele. | ANTWORT: $Wachstum$, $Preisstabilitaet$, $Beschaeftigung$, $Aussenwirtschaft$, $Verteilung$, $Umwelt$.
FRAGE: Was zeigt die Phillips-Kurve? | ANTWORT: Kurzfristig gilt $\pi \uparrow$ gegen $u \downarrow$ und umgekehrt.
FRAGE: Wie wirkt G up? | ANTWORT: $Y \uparrow$ und $u \downarrow$, aber $\pi \uparrow$ und $Defizit \uparrow$.

Klausur-Satz: `Kein Ziel ist gratis, jede Wirkung hat Nebenwirkung.`

## Fehlvorstellung

(kein Schritt, Parser skippt diesen Abschnitt)

1. Fehlvorstellung: Alle sechs Ziele seien gleichzeitig maximal erfuellbar.
   Korrektur: Instrumente wirken gekoppelt; Volltreffer ueberall ist magisch, also unmoeglich. Politik priorisiert.
   Korrektur-Satz: `Das Sechseck heisst magisch, weil Vollerfuellung unmoeglich ist.`
2. Fehlvorstellung: Wachstum des $BIP$ bedeute automatisch mehr Wohlfahrt.
   Korrektur: $BIP = C + I + G + (Ex - Im)$ zaehlt auch $Reparatur$ und $Umweltschaden$ als Plus; Verteilung und $CO_2$ bleiben blind.
   Korrektur-Satz: `Wachstum misst Marktwerte, nicht Wohlfahrt oder Nachhaltigkeit.`

## Schritt 7 — szenario: Klausurtransfer: Anhoerung und Parlamentsrede zu Wirtschaftspolitik und Magisches Sechseck

ROLLE: Du bist Praktikant im Wirtschaftsministerium.
SITUATION: Bei $\pi = 4{,}5\,\%$ und $u = 6\,\%$ fordert die Opposition sofort $G \uparrow$ und $i \downarrow$.
AUFGABE (beurteilen, AFB III): Beurteilen Sie die Forderung in einer zusammenhaengenden Darstellung (ca. 150 Woerter) mit allen sechs Zielen, $Phillips$-Konflikt und Alternativvorschlag.
RUBRIC (30 XP): Alle sechs Ziele genannt (10 XP) | Doppel-Expansionsrisiko $\pi$ begruendet (10 XP) | Alternative mit Zielabwaegung (5 XP) | Geschlossene Darstellung (5 XP).

## Schritt 8 — reflexion: Takeaway & Reflexion: Was der Krisenstab lernt

TAKEAWAY: Merke Sechs, Zwei, Eins: Sechs Ziele pruefen, zwei Instrumente $G$ und $i$ unterscheiden, ein Urteil mit $Y = C + I + G + (Ex - Im)$ faellen. Expansiv hilft $u$, restriktiv hilft $\pi$.

REFLEXION:
1. Was fiel schwerer — die Kettenwirkung (Schritt 4) oder die Verfahrenswahl (Schritt 5)?
2. Plane: Beim naechsten Mal zeichne ich zuerst das Sechseck als Checkliste, dann bewerte ich.

Anekdote (DE): Als 1967 das Stabilitaetsgesetz mit $Y$, $\pi$, $u$ und $Aussen$ beschlossen wurde, nannte Minister Schiller es das Viereck der Vernunft. Spaeter kamen $Verteilung$ und $Umwelt$ hinzu und aus dem Viereck wurde ein Sechseck — die Vernunft war geblieben, aber die Zauberei auch.

Bezug: `Schillers Viereck zeigt: Jedes neue Ziel macht die Kunst des Ausgleichs schwerer.`
