# Fehlerlog Mathe

| Datum | Aufgabe | Fehler | Korrektur (Operator?) | Wiederholen am |
|---|---|---|---|---|
| 2026-09-23 | Zwei-Punkte m=(-2-(-9))/(-3-4) | Rechenfehler: Doppelminus nicht aufgelöst, Nenner -3-4=-7 | Klammern zuerst: (-2+9)/(-7)=7/(-7)=-1; Zähler/Nenner gleiche Punktreihenfolge | 2026-09-30 |
| 2026-09-23 | b aus Punkt (4|-9), m=-1 | -1·4=-4, dann +4 statt -4 | -9=-4+b ⇒ b=-5 ⇒ f(x)=-1x-5; Probe mit zweitem Punkt | 2026-09-30 |
| 2026-09-23 | Minusklammer ableiten: $h(x) = -(x^2-3x)$ | Rechenfehler: Minus nicht verteilt, erst Klammer loesen $h(x) = -x^2+3x$, dann $h′(x) = -2x+3$ | 2026-09-30 |
| 2026-09-23 | Definitionsbereich $f(x) = x^{-2}$ bei $x = 0$ | Konzeptfehler: $D$ vergessen, $x = 0$ gehoert nicht zu $D$, also kein Funktionswert | 2026-09-30 |
| 2026-09-23 | Kollinearitaet mit 1 Koordinate behauptet | Konzeptfehler: ein $k$ muss fuer alle 3 Komponenten gelten, sonst nicht kollinear | 2026-09-30 |
| 2026-09-23 | Monotonie aus $f′(2) > 0$ allein | Konzeptfehler: ein Punkt reicht nicht, Vorzeichentabelle von $f′$ ueber Intervall noetig | 2026-09-30 |
| 2026-09-23 | lokales Maximum als globales verkauft | Konzeptfehler: alle Kandidaten plus Randwerte vergleichen, erst dann global | 2026-09-30 |
| 2026-10-06 | Waermepumpe Lastprofil (Aufgabe 2) | Logik/Begründung: [BE-Ansatz] Steckbrief-Bedingung fuer Ableitung vergessen (P'(6)=0 nicht explizit formuliert) | [BE-Ansatz] Formelansatz: Notwendige Bedingung P'(6)=0 und Ansatz P(t)=at^3+bt^2+ct+d vollstaendig notieren; *Merksatz:* 代入数值前必须先显式写出通用极值必要条件原式 | 2026-10-09 |
| 2026-10-06 | Waermepumpe Lastprofil (Aufgabe 3c) | Logik/Begründung: [BE-Ansatz] Randwertvergleich bei globalem Maximum ausgelassen (P(24)=2,64 uebersehen) | [BE-Ansatz] Globale Extrema erfordern zwingend Randwertvergleich auf [a; b]; *Merksatz:* 闭区间极值判别严禁漏比端点函数值 | 2026-10-09 |
| 2026-10-06 | Waermepumpe Lastprofil (Aufgabe 4a/c) | Logik/Begründung: [BE-Einheiten] Dimension der Energie mit Leistung verwechselt (kW statt kWh) | [BE-Einheiten] Einheitenfuehrung: P(kW) * t(h) ergibt Energie in kWh; *Merksatz:* 积分面积必须严格核验物理量纲，避免-1 BE惩罚 | 2026-10-09 |

> 只记可复用的错：Rechenfehler（符号/代入）vs Konzeptfehler（公式用错）分开标。
