---
fach: Musik
thema: "Akustik, Obertoene und Klangfarbe"
level: 1
ziel: Klausur
xp: 100
operatoren: [beschreiben, analysieren, vergleichen]
klausurrelevant: true
datum: 2026-10-03
tags: [EF, Musik, Akustik, Klangfarbe, Formenlehre]
version: Lesson-v3
---

# Lernreise: Akustik, Obertoene und Klangfarbe (L1, Ziel Klausur)

<!-- Campaign: Grundlagen-der-Musik | Episode 3/10 | Krise: Warum klingt eine Trompete anders als eine Floete beim selben Ton? | Zielgroessen: Obertonreihe, Spektrum, Klangfarbe, Frequenzverhaeltnis | Tool: lego -->

## Schritt 1 — entdecken: Das Raetsel des Einheits-Tons
ZIELE (3条，本节15分钟学完能做到——先读中文，再记德语)：

1. 中文：能清晰解释为什么不同乐器演奏同一个基音（如 $c^1 = 261\text{ Hz}$）时，音色（Klangfarbe / Timbre）截然不同。
2. 中文：能精准写出自然泛音列（Naturtonreihe / Obertonreihe）的前8个音程比例关系（1:2 八度、2:3 五度、3:4 四度、4:5 大三度等）。
3. 中文：能运用声学参数（Schwingungsform, Amplitudenspektrum, Formanten）在音乐考试（AFB I/II）中专业分析乐器音色构造。

### Hook / Phaenomen

闭上眼睛：你的好友在房间里用长笛吹响了一个中央 $C$ 音，接着隔壁交响乐团的小号手也吹响了完全相同的中央 $C$ 音。它们的音高（Tonhoehe）分毫不差，音量（Lautstaerke）也完全一致，但你的大脑在 0.05 秒内就能分辨出：“那是金属爆裂般的小号，那是温润空灵的长笛！”既然频率相同，为什么声音的“颜色”却天差地别？

Hook / Phaenomen: Schliesse die Augen: Ein Floetist und ein Trompeter spielen beide exakt den Kammerton a' mit 440 Hertz in identischer Lautstaerke. Dein Gehirn erkennt dennoch im Bruchteil einer Sekunde zweifelsfrei das jeweilige Instrument. Der Grund: Kein natuerliches Instrument erzeugt einen reinen Sinuston! Bei jedem gespielten Ton schwingt der Koerper in mathematisch exakt gestaffelten Teilfrequenzen mit — den **Obertoenen**. Das spezifische Amplitudenverhaeltnis dieser Oberschwingungen bildet den akustischen Fingerabdruck eines jeden Instruments.

`Klausur-Satz: Die klangliche Differenzierung gleich hoch gestimmter Instrumente basiert auf dem individuellen Obertonspektrum, das durch Resonanzkoerper und Klangerzeugungsmethode gepraegt wird.`

## Schritt 2 — entdecken: Ausruestungskiste der Akustik-Unit
PRETRAINING术语盒（核心5词，先读三遍中德，合书自测中文→德语，Evidenz：pretraining降认知负荷）：

中文在上，德语在下：

- 基音 — Grundton ($f_1$)：由发声体全长振动产生的最低频率，直接决定人类听觉感知的实际音高。 Die tiefste messbare Frequenz einer periodischen Schwingung, die fuer die empfundene Tonhoehe verantwortlich ist. Mechanismus: Schwingung der gesamten Luftsäule bzw. Saitenlaenge ($n=1$). Klausur-Tipp: Immer als Referenzpunkt der Obertonberechnung nennen.
- 泛音列 / 分音 — Obertonreihe / Teiltöne ($f_n = n \cdot f_1$)：与基音呈整数倍频率振动的所有更高频率分量（第二分音、三分音等）。 Ganzzahlige Vielfache der Grundfrequenz, die bei jeder Saiten- oder Luftsäulenteilung mitschwingen. Mechanismus: Physikalische Modenbildung ($2f_1, 3f_1, 4f_1 \dots$). Klausur-Tipp: Erste Oberschwingung entspricht dem 2. Teilton (Oktave).
- 傅里叶分析与合成 — Fourier-Analyse & Synthese：任何复杂的乐音波形都可数学分解为（或由其叠加而成）一系列不同振幅和相位的纯正弦波。 Die mathematische Zerlegung eines komplexen Klangs in Sinus-Komponenten und deren additive Rekonstruktion. Mechanismus: Überlagerung harmonischer Partialtoene im Zeit- und Frequenzbereich. Klausur-Tipp: Bei elektronischer Klangerzeugung als Begruendung anfuehren.
- 音色 — Klangfarbe (Timbre)：由声音频谱分布、泛音振幅强弱及起振瞬态（Einschwingvorgang）共同决定的声音主观质感。 Das psychoakustische Qualitaetsmerkmal eines Tons unabhaengig von Tonhoehe und Lautstaerke. Mechanismus: Gepraegt durch Bauform, Material und Erregungsart (Anblasen, Streichen, Zupfen). Klausur-Tipp: Nie mit Lautstaerke oder Dynamik verwechseln!
- 共鸣峰 / 共振 — Formanten & Resonanz：乐器共鸣箱（如小提琴面板、人体咽腔）对某些特定频率区间天然的放大与衰减特性。 Feste Frequenzbereiche, die durch die physische Hohlraumgeometrie verstaerkt werden. Mechanismus: Akustische Filterfunktion, die den Vokalklang (a, e, i, o, u) und Instrumentencharakter praegt. Klausur-Tipp: Erklaert, warum Gesangsstimmen tragfaehig ueber ein Orchester dringen.

`Klausur-Satz: Waehrend die Floete durch ein obertongemindertes, fast sinusfoermiges Spektrum gekennzeichnet ist, weist die Oboe durch Rohrblattimpulse eine enorme Dichte hochfrequenter Tealtoene auf.`

## Schritt 3 — entdecken: Die mathematische Leiter der Naturtoene
ENTDECKEN（1概念 + 1文字图解）：

中文：古希腊哲学家毕达哥拉斯在单弦琴（Monochord）上按下 1/2 处，听到了纯八度；按下 2/3 处，听到了纯五度。发声体振动的物理法则注定了泛音列不是随机散乱的，而是严格遵循自然数阶梯！
设基音为大字组 $C$ ($f_1$ = 65.4 Hz)：
- 2. Teilton ($2f_1$): Kleines $c$ (Oktave, 1:2)
- 3. Teilton ($3f_1$): Kleines $g$ (Quinte ueber der Oktave, 2:3)
- 4. Teilton ($4f_1$): Eingestrichenes $c'$ (Doppeloktave, 3:4 Quarte)
- 5. Teilton ($5f_1$): Eingestrichenes $e'$ (Grosse Terz, 4:5)
- 6. Teilton ($6f_1$): Eingestrichenes $g'$ (Kleine Terz, 5:6)
- 7. Teilton ($7f_1$): Naturseptime $b'$ (flach / rein, 6:7)
- 8. Teilton ($8f_1$): Zweigestrichenes $c''$ (Dreiblatt-Oktave, 7:8 Sekunde)

文字图解（ASCII 谱表与泛音倍数阶梯）：

```diagram
Frequenz-Multiplikator und Tonintervalle ueber dem Grundton C:

  Teilton:    1      2      3      4      5      6      7      8
  Frequenz:  1*f0   2*f0   3*f0   4*f0   5*f0   6*f0   7*f0   8*f0
              |      |      |      |      |      |      |      |
  Tonname:    C      c      g      c'     e'     g'    [b']    c''
              |______|______|______|______|______|______|______|
  Intervall:   Oktave Quinte Quarte Gr.Terz Kl.Terz Nat.7  Oktave
  Verhaeltnis:  1:2    2:3    3:4    4:5    5:6    6:7    7:8
```

`Klausur-Satz: Die Naturtonreihe basiert auf ganzzahligen Frequenzverhaeltnissen (1:2, 2:3, 3:4 etc.), deren spektrale Gewichtung im Frequenzraum die spezifische Klangfarbe konstituiert.`

## Anekdote & Fun-Fact

**Anekdote / Fun-Fact (DE)**: Wusstest du, dass die Koenigin der Instrumente — die Kirchenorgel — im Grunde der erste Synthesizer der Menschheitsgeschichte war? Schon im 16. Jahrhundert bauten Orgelbauer Register wie die "Quinte" (spielt den 3. Teilton) oder die "Terz" (spielt den 5. Teilton) ein. Zieht der Organist das Register "Mixtur", erklingen zu jeder Taste automatisch 4 bis 6 Obertoene gleichzeitig! Damit bauten Barockmusiker additiv synthetisierte Klangfarben, 400 Jahre bevor Robert Moog den elektronischen Synthesizer erfand.

**中文解读**: 管风琴其实是人类历史上最早的“加法合成器”！早在几百年前，管风琴师就通过拉开“五度栓”、“三度栓”和“混合栓（Mixtur）”，让按下单键时同时喷出第3、第4、第5等多个泛音，硬生生用物理音管在空气中“拼装”出极其宏亮辉煌的全新音色。

**Bezug zum Konzept**: `Registermischungen der Orgel nutzen das Prinzip der additiven Fourier-Synthese zur Erzeugung reicher Klangspektren.`

## Schritt 4 — ausprobieren: Sandbox-Auftrag Spektralanalyse im Vergleich
Kontinuitaet: Vorher Musik-Notenschrift-Basis.md | Nachher Musik-Klassik-vs-Romantik-Ausdruckswandel-L1.md. Krise dieser Episode: Warum klingt eine Trompete anders als eine Floete beim selben Ton? Zielgroessen: Obertonreihe, Spektrum, Klangfarbe, Frequenzverhaeltnis

BEISPIEL（正确例题示范，含教具操作与解答）：

[Werkzeug: lego]

AUFGABE (analysieren & vergleichen, AFB II)：
Im Akustik-Labor wird das Frequenzspektrum zweier Holzblasinstrumente beim gleichen Ton $a^1$ (440 Hz) aufgenommen:
- Instrument A zeigt nur Peaks bei ungeradzahligen Vielfachen ($f_1, 3f_1, 5f_1, 7f_1 \dots$), waehrend geradzahlige Tealtoene fast voellig fehlen. Der Klang wird als hohl, nasal und dunkel empfunden.
- Instrument B zeigt ein kontinuierliches Abfallen aller Tealtoene ($1f_1, 2f_1, 3f_1, 4f_1 \dots$). Der Klang wird als hell, warm und offen wahrgenommen.
1. Bestimmen Sie anhand akustischer Gesetze (gedeckte vs. offene Roehre), um welche Instrumente (Klarinette vs. Querfloete/Oboe) es sich handelt. (10 BE)
2. Analysieren Sie die Auswirkung der Obertonverteilung auf den musikalischen Charakter in einer Orchesterpartitur. (20 BE)

HILFE:
1. Schritt 1: Physikalisches Gesetz anwenden: Eine zylindrische Roehre, die an einem Ende geschlossen ist (Gedecktpfeife / Klarinette mit einfachem Rohrblatt), bildet nur ungeradzahlige Obertoene ($1, 3, 5, 7 \dots$).
2. Schritt 2: Eine beidseitig offene Roehre (Querfloete) bzw. konische Roehre (Oboe) erzeugt saemtliche harmonische Obertoene ($1, 2, 3, 4 \dots$).
3. Schritt 3: Schlussfolgerung: Instrument A = Klarinette; Instrument B = Oboe/Floete.

MUSTERLÖSUNG:
1. Akustische Zuordnung: Instrument A ist eindeutig die Klarinette. Als zylindrisch gebohrtes Holzblasinstrument mit einfachem Rohrblatt verhaelt sich die Klarinette physikalisch wie eine einseitig geschlossene Luftsaeule (gedeckte Pfeife). Dies bedingt, dass sich am geschlossenen Mundstueck stets ein Schwingungsknoten und am offenen Becher ein Schwingungsbauch befindet. Folglich schwingen ausschliesslich die ungeradzahligen Tealtoene ($f_1, 3f_1, 5f_1 \dots$) mit. Instrument B entspricht der Querfloete bzw. Oboe: Da die Floete an beiden Enden akustisch offen ist (bzw. die Oboe konisch verlaeuft), koennen sich alle ganzzahligen Moden ($n = 1, 2, 3, 4 \dots$) ungehindert entfalten, was zu einem lueckenlosen harmonischen Spektrum fuehrt.
2. Musikalische Wirkung im Orchester: Durch das Fehlen der geradzahligen Tealtoene besitzt die Klarinette im tiefen Register (Chalu-meau-Register) einen holzigen, samtig-hohlen und distanzierten Charakter. Sie mischt sich hervorragend mit Streichern, ohne sie zu uebertoenen. Die vollstaendige Obertonreihe von Instrument B (z.B. Oboe) laesst den Klang dagegen praesent, schneidend und durchdringend wirken, weshalb die Oboe traditionell als Stimmton-Geber des gesamten Orchesters dient.

`Klausur-Satz: Einseitig geschlossene Rohrformen eliminieren geradzahlige Harmonische, wodurch der typisch hohle und nasale Klangcharakter der Klarinettenfamilie entsteht.`

## Schritt 5 — ausprobieren: Duell der Klangerzeugung: Labor vs. Orchester

VERGLEICH: Reiner Sinuston (Synthesizer) vs. Akustisches Naturinstrument (z.B. Streichinstrument)

- Position A (Reiner Sinuston / Technische Monofrequenz):
  - Physik: Exakt eine einzige Schwingungsfrequenz ohne jegliche Obertoene ($n=1$).
  - Hoereindruck: Steril, leblos, statisch, ohne Tiefe oder Raeumlichkeit; wirkt bei laengerem Hoeren ermuedend und unnatuerlich.
  - Verwendung: Wissenschaftliche Eichung, Hoertests, Basisbaustein elektronischer Synthesizer.
- Position B (Komplexes Naturinstrument / Z.B. Violine):
  - Physik: Extrem dichtes Obertonspektrum bis weit ueber 10.000 Hz, staendige mikroskopische Frequenz- und Amplitudenschwankungen (Vibrato, Bogenstrich-Rauschen, Resonanzen des Fichtenholz-Bodens).
  - Hoereindruck: Lebendig, warm, expressiv, emotional beruehrend und multidimensional.
  - Verwendung: Solistisches und orchestrales Musizieren mit maximaler Ausdrucksfaehigkeit.

Entscheidungsregel fuer die Klausur:
Wird nach `Klangfarbenanalyse` gefragt, immer zuerst nach drei Faktoren strukturieren: 1. Klangerreger (Anblas-/Streichtechnik), 2. Resonanzkoerper (Holz/Blech), 3. Obertonanteil (sinusnah vs. obertongesaettigt)!

## Schritt 6 — check: Klausur-Transfer Obertoene & Instrumentation
PRÜFUNGSSZENARIO (KLP NRW Musik EF Inhaltsfeld 1: Bedeutungen von Musik / Klangfarbe und Ausdruck):

Gegeben ist ein Ausschnitt aus Maurice Ravels "Boléro". Ravel laesst das Thema zunaechst von einer Solofloete (hohe Lage) spielen, spaeter kombiniert er Piccolo-Floeten, Horn und Celesta in einer bemerkenswerten Tonarten-Schichtung: Waehrend das Horn das Thema in C-Dur spielt, spielen zwei Piccolo-Floeten dasselbe Thema in E-Dur und G-Dur!

AUFGABE (analysieren & deuten, AFB II/III):
1. Erklaeren Sie die akustische Absicht dieser scheinbaren "Polytonalitaet" anhand der Naturtonreihe. (12 BE)
2. Beurteilen Sie Ravels Instrumentationstechnik als Vorlaeufer der modernen Spektralmusik. (18 BE)

ERWARTUNGSHORIZONT:
- AFB II: Ravel beabsichtigt keine Dissonanz oder tonale Zersetzung, sondern imitiert das Obertonspektrum eines einzelnen Tons (additive Synthese)! Die Toene des E-Dur-Dreiklangs und G-Dur entsprechen exakt dem 5. Teilton ($e''$, grosse Terz) und 6. Teilton ($g''$, Quinte) des Grundtons $C$. Durch diese Instrumentenkombination entsteht kein Mehrklang, sondern eine radikal neuartige, metallisch funkelnde synthetische Klangfarbe eines fiktiven Rieseninstruments.
- AFB III: Ravel antizipiert die spaetere spektrale Kompositionstechnik (z.B. Gérard Grisey). Er beweist, dass Klangfarbe nicht nur Dekoration einer Melodie ist, sondern dass Melodie und Harmonik selbst aus dem inneren physikalischen Wesen des Klangs (dem Obertonspektrum) heraus konstruiert werden koennen.

## Schritt 7 — check: Format-Check & Scoring
30 XP Schnelltest zur Verstaendigungssicherung:

FRAGE: Welches Tonintervall liegt exakt zwischen dem 2. und 3. Teilton der Naturtonreihe?
ANTWORT: Eine reine Quinte (Frequenzverhaeltnis 2:3).

FRAGE: Welche Art von Oberschwingungen fehlt bei zylindrisch geschlossenen Roehren wie der Klarinette weitgehend?
ANTWORT: Die geradzahligen Obertoene (2, 4, 6, 8...); es schwingen fast ausschliesslich die ungeradzahligen Tealtoene mit.

FRAGE: Wie nennt man die mathematische Zerlegung eines Klangs in seine reinen Sinus-Teiltoene?
ANTWORT: Fourier-Analyse (harmonische Analyse).

## Schritt 8 — reflexion: Meisterschaft & Naechste Mission
REFLEXION:
Du beherrschst nun die physikalischen und gehoermaessigen Grundlagen aller musikalischen Klangfarben. Du kannst das Obertonspektrum berechnen und weisst, wie Meister wie Ravel oder Orgelbauer physikalische Prinzipien in reine Klangmagie verwandeln.

<!-- reflexion: musik-akustik-obertoene -->
In der naechsten Episode betreten wir das revolutionaere 20. Jahrhundert: Was passiert, wenn man saemtliche Tonleitern und Hierarchien zertruemmert und alle 12 Toene mathematisch gleichwertig behandelt? Weiter geht es mit [Musik-Zwoelftontechnik-Schoenberg-Dodekaphonie-L1](Musik-Zwoelftontechnik-Schoenberg-Dodekaphonie-L1.md).
