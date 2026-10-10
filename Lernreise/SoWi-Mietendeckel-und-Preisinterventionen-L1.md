---
fach: SoWi
thema: "Staatliche Preisinterventionen am Beispiel Mietendeckel"
level: 1
ziel: Klausur
xp: 100
operatoren: [darstellen, analysieren, beurteilen]
klausurrelevant: true
datum: 2026-10-10
tags: [EF, SoWi, Wirtschaft]
version: Enterprise-v5
---

# Lernreise: Staatliche Preisinterventionen am Beispiel Mietendeckel (L1, Ziel: Klausur)

> Didaktischer Archetyp A: Sozialwissenschaftliche Spiel- und Kausalschleife (Knappheit -> Interessen -> Intervention -> Nebenwirkung)
> Werkzeug ID: [Werkzeug: markt-sim]

---

## Schritt 1 — entdecken

真实案例: 2020年柏林州政府实施Mietendeckel, 将约150万套存量房租金冻结在2019年6月水平, 2021年4月15日联邦宪法法院(BVerfG)判决该法违宪, 理由是立法权限归属联邦而非州, 柏林约3.5万户已降租租客面临补交差额。

设问 (Leitfrage): 当一座城市房租暴涨、一房难求时, 政府直接用法律把租金按死, 到底是保护了租客, 还是制造了更大的短缺?

- [Option A] 自由租金出清: 允许租金自由形成, 住房按出价分配。
  - Folge: 空房很快租完, 但低收入者直接被挤出。
- [Option B] 政府限价保护: 法律规定最高租金, 住房按排队等规则分配。
  - Folge: 名义租金人人可付, 但能否租到取决于排队与其他条件。

生活直觉比喻: 好像100套出租房门口站着500个拿现金的租客, 房东只把钥匙递给出价最高的人。

AUFLÖSUNG (nach der Wahl lesen)

Mechanismus zu Option A: 价格在这里执行筛选和供给激励功能, 高租金一方面把需求压下去, 一方面把新房东和建筑商吸引进来, 市场靠高价实现出清, 代价是分配不公。

Mechanismus zu Option B: 限价把价格信号冻住, 需求被低价刺激变大, 供给被低回报压住变小, 缺口只能用排队、关系和黑市来消化, 名义公平掩盖了实际短缺。

一句话因果本质: 限价压住了租金数字, 却压不住租房缺口, 缺口从价格上消失, 就会在排队和黑市里重新出现。

Klausur-Satz: `Ein staatlicher Hoechstpreis unterhalb des Gleichgewichtspreises verhindert die Marktraeumung und verwandelt offene Preiskonkurrenz in verdeckte Warteschlangen- und Schattenmarktkonkurrenz.`

---

## Schritt 2 — ausprobieren

交互沙盒: [Werkzeug: markt-sim]

AUFGABE (analysieren, AFB II):
1. Oeffne das Markt-Labor und setze die Nachfrage auf $N(p) = 100 - 5p$ und das Angebot auf $A(p) = 10 + 10p$, wobei $p$ die Monatsmiete in Euro pro qm ist.
2. Berechne Gleichgewichtspreis $p_G$ und Gleichgewichtsmenge $q_G$.
3. Setze einen Mietendeckel $p_{max} = 4$ und analysiere, welche Mengenreaktion auf Angebots- und Nachfrageseite entsteht.

HILFE:
- Richtung: Zuerst mit der Gleichgewichtsbedingung aus Nachfrage und Angebot den Gleichgewichtspreis bestimmen, danach die Gleichgewichtsmenge durch Einsetzen ermitteln.
- Richtung: Danach beim verordneten Hoechstpreis Nachfrage- und Angebotsmenge getrennt mit derselben Nachfrage- und Angebotsfunktion bestimmen und die Differenz als Ueberhang deuten.

COMPLETION (Lückentext):
- Der Gleichgewichtspreis betraegt $p_G =$ ___, die Gleichgewichtsmenge betraegt $q_G =$ ___.
- Beim verordneten Deckel betraegt der Nachfrageueberhang ___ Einheiten; diese Luecke erklaert Warteliste und Schattenmarkt.

MUSTERLOESUNG:
Der Deckel liegt mit $4$ unter $p_G = 6$. Die nachgefragte Menge steigt auf $80$, die angebotene Menge sinkt auf $50$. Es entsteht ein Nachfrageueberhang von $80 - 50 = 30$ Einheiten. Genau diese Luecke von $30$ Wohnungen erklaert Wartelisten, Bestechungsgeld und Rueckzug von Investoren aus Neubau und Sanierung.

Klausur-Satz: `Ein administrierter Hoechstpreis unterhalb des Gleichgewichts senkt das Angebot und erhoeht die Nachfrage, sodass ein messbarer Nachfrageueberhang und damit Wohnungsknappheit entsteht.`

---

## Schritt 3 — entdecken

中文理解: 限价的传导不是一步完成的, 而是一条闭环因果链, 每一步都有人做出理性反应, 房东算回报, 租客算成本, 最终缺口固化。

```diagram
[ Staat setzt Preisobergrenze unter Gleichgewicht ]
->
[ Miete sinkt, Wohnen wird billig, mehr Haushalte fragen Wohnung nach ]
->
[ Vermieter erhalten weniger Ertrag, Bau und Sanierung lohnen sich weniger ]
->
[ Angebot sinkt, Nachfrage steigt, Nachfrageueberhang waechst ]
->
[ Warteschlange plus Schattenmarkt plus Investitionsrueckgang, Knappheit verfestigt sich ]
```

考纲核心三词 (KLP-Termini):

1. **Preisobergrenze / Hoechstpreis** (最高限价): 国家用法律规定的最高成交价, 高于此价的交易违法, 低于均衡价时产生短缺。
2. **Nachfrageueberhang** (需求过剩 / 超额需求): 在管制价格下, 意愿需求量大于意愿供给量的差额, 表现为排队和一房难求。
3. **Wohlfahrtsverlust** (福利损失): 因限价阻断了本可成交的互利交易而永久消失的社会总福利, 排队时间和黑市成本都属于这种损失。

Klausur-Satz: `Die Preisobergrenze blockiert die Signal- und Ausgleichsfunktion des Preises und erzeugt ueber sinkende Angebotsanreize und steigende Nachfrage einen dauerhaften Nachfrageueberhang mit Wohlfahrtsverlust.`

---

## Schritt 4 — check

中文理解: 很多学生以为政府一限价, 短缺就被消灭了, 因为房租数字确实降了。这是把价格标签当成了房子本身。

Fehlvorstellung:
- 误区: Mietendeckel让租金变便宜了, 所以住房短缺问题解决了, 人人都住得起房了。
- 考官扣分真相: 阅卷只给能区分名义价格和实际可得性的答案加分。只写租金下降不写供给下降和需求上升的, 直接扣机制分; 把黑市和投资萎缩漏掉的, 拿不到AFB II的分析分。限价改变的是成交条件, 不是房屋数量。

关卡微测对抗:

`FRAGE: Warum beseitigt ein Mietendeckel unter dem Gleichgewichtspreis keine Wohnungsnot? | ANTWORT: Weil er bei fixem Preis das Angebot senkt und die Nachfrage erhoeht, sodass der Nachfrageueberhang waechst und Schattenmarkt plus Investitionsrueckgang folgen.`

Klausur-Satz: `Ein Hoechstpreis loest das Knappheitsproblem nicht, sondern verlagert es von der Preisebene auf die Mengenebene und erzeugt Ausweichmaerkte mit zusaetzlichen Wohlfahrtsverlusten.`

---

## Schritt 5 — szenario

中文理解: 现在把柏林的教训转到全德国的电价争议上, 你要像北威州经济顾问一样写出双轨评价, 效率和公平各讲一轨, 最后给出可操作的替代方案。

> ROLLE: Oekonomischer Berater der Landesregierung NRW.
> SITUATION: Nach einem Preisschock bei Strom fordern Verbaende einen gesetzlichen Strompreisdeckel von 20 Cent pro kWh, Versorger warnen vor Mehrverbrauch und Investitionsstopp in Netze und Kraftwerke.

AUFGABE (beurteilen) [AFB III]:
Beurteilen Sie aus ordnungspolitischer Sicht, ob NRW einen allgemeinen Strompreisdeckel unterhalb des Marktpreises einfuehren sollte, und wägen Sie dabei oekonomische Effizienz gegen soziale Verteilungsgerechtigkeit ab.

BEWERTUNGSRUBRIK (15 NP):
1. Sachkriterium (效率轨): Deckel unter Gleichgewicht erzeugt Nachfrageueberhang, daempft Sparanreize, blockiert Marktraeumung und erzeugt Wohlfahrtsverlust plus Schatteneffekte.
2. Wertkriterium (公平轨): Sozialstaatsgebot verlangt Schutz einkommensschwacher Haushalte vor Energiearmut, Deckel wirkt kurzfristig entlastend und politisch legitim.
3. Synthese (综合轨): Gezielte Direkttransfers wie Wohngeld-Zuschuss oder Pro-Kopf-Energiegeld erhalten das Preissignal und treffen Beduerftige genauer als Giesskannen-Deckel.

ERWARTUNGSHORIZONT:
Teilleistung | Punkte | Alternativweg
Effizienz: Deckel blockiert Marktraeumung und erzeugt Ueberhang plus Wohlfahrtsverlust | 6 NP | Wohlfahrtsdreieck oder Anreizkette als Beleg akzeptieren
Gerechtigkeit: Sozialstaatsgebot und Kurzfrist-Entlastung einkommensschwacher Haushalte | 4 NP | Energiearmut-Argument mit anderem Beleg akzeptieren
Synthese: Direkttransfers statt Giesskannen-Deckel mit Effizienz-Gerechtigkeits-Abwaegung | 5 NP | Alternative mit gleicher Abwaegungslogik akzeptieren

15 NP MUSTER-KLAUSURSATZ:

> "Während ein Strompreisdeckel unterhalb des Gleichgewichts kurzfristig einkommensschwache Haushalte entlastet und dem Sozialstaatsgebot entspricht, verzerrt er das Preissignal, vergrössert den Nachfrageüberhang und erzeugt Wohlfahrtsverluste durch Mehrverbrauch und Investitionsrückgang; ordnungspolitisch vorzugswürdig sind daher einkommensgeprüfte Direkttransfers, die Effizienz und Gerechtigkeit ohne Blockade der Markträumung verbinden."

KERNSATZ (auswendig):
`Ein staatlicher Hoechstpreis unterhalb des Gleichgewichtspreises verhindert die Marktraeumung und verwandelt offene Preiskonkurrenz in verdeckte Warteschlangen- und Schattenmarktkonkurrenz.`
- Zerlegung: Subjekt | Mechanismus | Urteil
- Ein staatlicher Hoechstpreis unterhalb des Gleichgewichts | verhindert Marktraeumung und verwandelt Preiskonkurrenz in Warteschlangen- und Schattenmarktkonkurrenz | Kurzfrist-Entlastung ja, Dauerloesung nein, Transfers vorzugswuerdig
- Selbsttest: Ein staatlicher Hoechstpreis unterhalb des Gleichgewichtspreises ___ die Marktraeumung und verwandelt offene Preiskonkurrenz in verdeckte Warteschlangen- und Schattenmarktkonkurrenz.
