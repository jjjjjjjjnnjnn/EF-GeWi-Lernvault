// Concept Distillation Engine (First-Principles Distiller for GeWi & MINT)
// Deterministic first-principles knowledge distiller for topics and chapter texts
// Strictly complies with Tufte clean rules: NO EMOJIS, ASCII arrows only (->).

export interface DistilledConcept {
  topicTitle: string;
  fach: string;
  mentalModelAnalogy: {
    analogyTitle: string;
    explanationDE: string;
    explanationZH: string;
  };
  klpTermini: Array<{
    termDE: string;
    definitionDE: string;
    termZH: string;
    definitionZH: string;
  }>;
  fehlerquellen: Array<{
    trapTitleDE: string;
    trapDescriptionDE: string;
    trapDescriptionZH: string;
    howToAvoidDE: string;
  }>;
  klausurSatz15NP: {
    musterSatzDE: string;
    operator: "analysieren" | "darstellen" | "beurteilen" | "eroertern";
    scoringKeywords: string[];
    explanationZH: string;
  };
  socraticProbes: Array<{
    questionDE: string;
    questionZH: string;
    counterPerspectiveDE: string;
  }>;
}

interface DomainKnowledgeEntry {
  id: string;
  canonicalTitle: string;
  fach: string;
  matchKeywords: string[];
  data: DistilledConcept;
}

// ---------------------------------------------------------------------------
// Pre-calibrated Domain Knowledge Bank (KLP NRW Standards)
// ---------------------------------------------------------------------------

const DOMAIN_KNOWLEDGE_ENTRIES: DomainKnowledgeEntry[] = [
  // 1. Wahlsystem / Bundestag / Erst- und Zweitstimme (SoWi)
  {
    id: "wahlsystem-bundestag",
    canonicalTitle: "Wahlsystem & Bundestagswahl (Personalisierte Verhaeltniswahl)",
    fach: "SoWi",
    matchKeywords: [
      "wahl",
      "wahlsystem",
      "bundestag",
      "bundestagswahl",
      "erststimme",
      "zweitstimme",
      "direktmandat",
      "ueberhangmandat",
      "ausgleichsmandat",
      "5%-huerde",
      "sperrklausel",
      "sainte-lague",
      "listenmandat",
    ],
    data: {
      topicTitle: "Wahlsystem & Bundestagswahl (Personalisierte Verhaeltniswahl)",
      fach: "SoWi",
      mentalModelAnalogy: {
        analogyTitle: "Zweistufige Saalbestuhlung: Lokaler Vertreter vs. Absolute Machtbalance",
        explanationDE:
          "Das deutsche Wahlsystem funktioniert wie eine Theaterbuchung mit zwei Kontingenten: Die Erststimme sichert einen konkreten Ansprechpartner fuer jeden Wahlkreis (Personenwahl per relativer Mehrheit), waehrend die Zweitstimme festlegt, wie viele Sitze jeder Partei im Gesamtsaal proportional zum bundesweiten Votum absolut zustehen (Proportionalitaet).",
        explanationZH:
          "德国联邦大选双票制如同两级剧场配座系统：选区一票（Erststimme）按简单多数决定谁代表本选区进议会（选人）；核心的二票（Zweitstimme）决定各大政党在议会总席位中的绝对分配比例与政党力量对比（选党）。",
      },
      klpTermini: [
        {
          termDE: "Personalisierte Verhaeltniswahl",
          definitionDE:
            "Wahlsystem, bei dem die Gesamtzahl der Sitze nach Verhaeltniswahlgrundsaetzen (Zweitstimme) vergeben wird, ergaenzt durch Direktmandate aus Wahlkreisen (Erststimme).",
          termZH: "个性化比例代表制",
          definitionZH: "德国联邦议院核心选举制度：以政党二票比例代表制为主导基础，结合选区一票简单多数直接当选机制。",
        },
        {
          termDE: "Zweitstimme",
          definitionDE:
            "Die wahlentscheidende Stimme fuer die Landesliste einer Partei, welche die relative Sitzverteilung im Deutschen Bundestag massgeblich determiniert.",
          termZH: "政党二票",
          definitionZH: "具有决定性影响力的核心选票，直接决定各政党按比例所获联邦议院议席总数及组阁话语权。",
        },
        {
          termDE: "Erststimme & Direktmandat",
          definitionDE:
            "Stimme fuer einen Wahlkreisbewerber; wer im Wahlkreis die relative Mehrheit erzielt, zieht direkt in das Parlament ein.",
          termZH: "选区一票与直接议席",
          definitionZH: "选区单一候选人票；在选区中获得相对多数选票者直接获得议席，确保议员与地方选民的直接连接。",
        },
        {
          termDE: "Fuenf-Prozent-Sperrklausel",
          definitionDE:
            "Schutzklausel gegen Parteizersplitterung im Parlament: Parteien muessen mindestens 5 % der Zweitstimmen oder drei Direktmandate erreichen.",
          termZH: "5% 门槛限制条款",
          definitionZH: "防止议会碎片化与 Weimar 历史教训的制度防线：党派须获至少 5% 全联邦二票或 3 个直接议席方可分配比例席位。",
        },
      ],
      fehlerquellen: [
        {
          trapTitleDE: "Irrglaube: Erststimme sei wichtiger als Zweitstimme",
          trapDescriptionDE:
            "Schueler nehmen faelschlicherweise an, die Erststimme sei die Hauptstimme, weil sie an erster Stelle auf dem Stimmzettel aufgefuehrt ist.",
          trapDescriptionZH:
            "误认为一票（Erststimme）比二票重要：因排在选票首位而望文生义，忽视了二票才是决定席位比例与总理人选的关键。",
          howToAvoidDE:
            "In Klausuren AFB I/II stets explizit hervorheben: Die Zweitstimme ist die massgebliche 'Kanzlerstimme' fuer die gesamtparlamentarische Mehrheit.",
        },
        {
          trapTitleDE: "Verwechslung von Mehrheits- und Verhaeltniswahlfolgen",
          trapDescriptionDE:
            "Unzulaessige Verallgemeinerung, dass Direktmandate unabhaengig von Zweitstimmenergebnissen beliebige Ueberhangmandate ohne Systemausgleich behalten.",
          trapDescriptionZH:
            "混淆绝对多数代表制与比例代表制的制度目标，未区分选区当选与按比例再分配的动态调节机制。",
          howToAvoidDE:
            "Immer das Spannungsverhaeltnis zwischen Repraesentanzfunktion vor Ort und mathematischer Proportionalitaet im Gesamtsitzkontingent praezise herleiten.",
        },
      ],
      klausurSatz15NP: {
        musterSatzDE:
          "Die personalisierte Verhaeltniswahl kombiniert die buergernahe Personenrepraesentation des relativen Mehrheitswahlrechts mit dem Proportionalitaetsprinzip der Verhaeltniswahl, wobei gemaess § 1 BWahlG die Zweitstimme die ausschlaggebende Determinante fuer die proportionale Sitzverteilung der Fraktionen im Deutschen Bundestag darstellt.",
        operator: "analysieren",
        scoringKeywords: [
          "Personalisierte Verhaeltniswahl",
          "Zweitstimme als Determinante",
          "Proportionalitaetsprinzip",
          "Personenrepraesentation",
          "Sitzverteilung",
        ],
        explanationZH:
          "高分句式精确剖析制度双重维度（选民代表性 vs 比例代表性），准确引用核心法理逻辑，直接击中 AFB II 赋分点。",
      },
      socraticProbes: [
        {
          questionDE:
            "Gefa Ehrdet die 5-%-Sperrklausel das demokratische Grundprinzip der Gleichheit der Wahl, indem sie Millionen Waehlerstimmen unberuecksichtigt laesst?",
          questionZH: "5% 选举门槛排除了数百万张选票，是否在根本上侵蚀了普选平等性原则？",
          counterPerspectiveDE:
            "Ohne die Sperrklausel droht eine extreme parlamentarische Zersplitterung nach Weimarer Muster, welche die Regierungsbildung blockiert.",
        },
        {
          questionDE:
            "Sollte ein reines Verhaeltniswahlsystem eingefuehrt werden, um Ueberhang- und Ausgleichsmandate vollstaendig zu eliminieren?",
          questionZH: "是否应彻底取消选区一票、推行纯粹比例代表制以完全消除超额与平衡席位？",
          counterPerspectiveDE:
            "Ein Wegfall der Wahlkreise wuerde die direkte Rueckbindung der Abgeordneten an ihre regionale Buergerschaft zerstoeren.",
        },
      ],
    },
  },

  // 2. Rawls / Schleier des Nichtwissens / Urzustand (Philosophie & SoWi)
  {
    id: "rawls-schleier-des-nichtwissens",
    canonicalTitle: "John Rawls: Urzustand & Schleier des Nichtwissens",
    fach: "Philosophie",
    matchKeywords: [
      "rawls",
      "john rawls",
      "schleier des nichtwissens",
      "veil of ignorance",
      "urzustand",
      "original position",
      "differenzprinzip",
      "gerechtigkeit als fairness",
      "maximin",
      "maximin-regel",
      "chancengleichheit",
    ],
    data: {
      topicTitle: "John Rawls: Urzustand & Schleier des Nichtwissens",
      fach: "Philosophie",
      mentalModelAnalogy: {
        analogyTitle: "Kuchenschneiden im Dunkeln: Das faire Verteilungsprinzip",
        explanationDE:
          "Stell dir vor, du musst einen Geburtstagskuchen fuer eine Gruppe schneiden, weisst aber nicht, welches Stueck du selbst erhaelst. Die einzig rationale Strategie besteht darin, die Stuecke so gleichmaessig wie moeglich zu schneiden und dafuer zu sorgen, dass selbst das kleinste Stueck noch maximal gross ausfaellt.",
        explanationZH:
          "蒙眼分蛋糕模型：分蛋糕者在分切前完全不知道自己会分到哪一块。理性的自利者必然会将每一份切得尽可能均等，并最大化最差份额（Maximin），以防自己分到最烂的一块。",
      },
      klpTermini: [
        {
          termDE: "Schleier des Nichtwissens (veil of ignorance)",
          definitionDE:
            "Gedankenexperimenteller Zustand, in dem Akteure ihre kuenftige soziale Position, Talente, Interessen und Klassenzugehoerigkeit nicht kennen.",
          termZH: "无知之幕",
          definitionZH: "思想实验核心假设：立约主体在不清楚自身社会阶层、天赋才智、财富健康或人生偏好的状态下确立社会正义准则。",
        },
        {
          termDE: "Urzustand (original position)",
          definitionDE:
            "Hypothetischer Ausgangszustand freier und gleicher vernunftbegabter Personen zur vertragstheoretischen Begruendung gerechter gesellschaftlicher Grundsaetze.",
          termZH: "原初状态",
          definitionZH: "自由平等的理性个体就社会基本制度正义原则达成契约约定的假设性初始框架。",
        },
        {
          termDE: "Differenzprinzip",
          definitionDE:
            "Soziale und oekonomische Ungleichheiten sind nur legitim, wenn sie den am wenigsten Beguenstigten der Gesellschaft den groesstmoeglichen Vorteil bringen.",
          termZH: "差异原则",
          definitionZH: "罗尔斯正义第二原则：社会与经济不平等唯有在能使处境最不利者获得最大利益的前提下才具合法性。",
        },
        {
          termDE: "Maximin-Regel",
          definitionDE:
            "Rationale Entscheidungsregel unter vollstaendiger Unsicherheit: Waehle die Option, deren schlechtestmoeglicher Ausgang am besten ist.",
          termZH: "最大化最小值规则 (Maximin)",
          definitionZH: "不确定性决策准则：评估各选择的最坏可能结果，并选出那个最坏结果最不糟糕的方案。",
        },
      ],
      fehlerquellen: [
        {
          trapTitleDE: "Verwechslung von Rawls' Differenzprinzip mit egalitaerem Sozialismus",
          trapDescriptionDE:
            "Schueler behaupten oft, Rawls fordere voellige materielle Ergebnisgleichheit fuer alle Buerger.",
          trapDescriptionZH:
            "将差异原则误判为绝对均贫富的平均主义：罗尔斯明确允许效率与激励带来的收入不平等，条件是最弱势群体能从中获益。",
          howToAvoidDE:
            "In Klausuren betonen: Rawls legitimiert Ungleichheiten explizit als Leistungsanreize, solange sie das Niveau der Schwaechsten heben.",
        },
        {
          trapTitleDE: "Fehldeutung des Urzustands als historische Realitaet",
          trapDescriptionDE:
            "Behandlung des Urzustands als historischen Urvertrag statt als rein normatives Gedankenexperiment.",
          trapDescriptionZH:
            "将原初状态误当作人类历史曾发生过的社会契约，而非纯粹的规范性理性检验工具。",
          howToAvoidDE:
            "Stets als methodisches Instrument der rationalen Begruendung ethischer Unparteilichkeit kennzeichnen.",
        },
      ],
      klausurSatz15NP: {
        musterSatzDE:
          "Rawls' Konzeption von Gerechtigkeit als Fairness erweist sich insofern als normativ belastbar, als das Differenzprinzip oekonomische Asymmetrien ausschliesslich unter der Pfaemisse legitimiert, dass sie den am wenigsten Beguenstigten der Gesellschaft den groesstmoeglichen Vorteil einbringen, wodurch ein rational begruendeter Ausgleich zwischen individueller Leistungsmotivation und institutioneller Solidaritaet gewaehrleistet wird.",
        operator: "beurteilen",
        scoringKeywords: [
          "Gerechtigkeit als Fairness",
          "Differenzprinzip",
          "Schwaechste Mitglieder",
          "Legitimation von Asymmetrien",
          "Normative Geltung",
        ],
        explanationZH:
          "判分关键词覆盖完整，从规范性效力高度整合差异原则与激励兼容，精准达到 AFB III 高分评析标准。",
      },
      socraticProbes: [
        {
          questionDE:
            "Ist die Maximin-Regel im Urzustand wirklich zwingend vernuenftig, oder koennten risikofreudige Individuen auf hohe Gewinne spekulieren?",
          questionZH: "在无知之幕后选择极度保守的 Maximin 规则是唯一的理性选择吗？为什么不能假设立约者具备风险博弈偏好？",
          counterPerspectiveDE:
            "Wenn grundlegende Lebensperspektiven und das Existenzminimum auf dem Spiel stehen, verbietet vernuenftige Selbsterhaltung jedes unkalkulierbare Gluecksspiel.",
        },
        {
          questionDE:
            "Beraubt Rawls' Prinzip talentierte Individuen ihrer legitimen Ansprueche auf die Fruechte ihrer angeborenen Faehigkeiten?",
          questionZH: "将天生才华视作集体共有资产，是否侵犯了天赋异禀者对其个人禀赋的合法拥有权（Nozick 批评）？",
          counterPerspectiveDE:
            "Natuerliche Begabungen sind das Resultat einer genetischen Lotterie und begruenden moralisch keinen vor-institutionellen Sonderanspruch auf Belohnung.",
        },
      ],
    },
  },

  // 3. Magisches Viereck / Markt / Konjunktur (SoWi)
  {
    id: "magisches-viereck-markt",
    canonicalTitle: "Wirtschaftspolitik: Magisches Viereck (§ 1 StabG)",
    fach: "SoWi",
    matchKeywords: [
      "magisches viereck",
      "viereck",
      "stabg",
      "stabilitaetsgesetz",
      "preisstabilitaet",
      "vollbeschaeftigung",
      "wirtschaftswachstum",
      "aussenwirtschaftliches gleichgewicht",
      "zielkonflikt",
      "konjunktur",
      "inflation",
      "ezb",
    ],
    data: {
      topicTitle: "Wirtschaftspolitik: Magisches Viereck (§ 1 StabG)",
      fach: "SoWi",
      mentalModelAnalogy: {
        analogyTitle: "Vierfach gespanntes Trampolin: Der unausweichliche Zielkonflikt",
        explanationDE:
          "Die vier Ecken des Trampolins stehen fuer die vier makrooekonomischen Kernziele. Zieht man mit expansiven Massnahmen massiv an der Ecke 'Beschaeftigung' oder 'Wachstum' nach oben, verzieht sich unweigerlich das Netz und zieht die gegenueberliegende Ecke 'Preisniveaustabilitaet' nach unten (Inflation).",
        explanationZH:
          "四角绷紧的蹦床力学：宏观经济四大目标彼此关联。若通过极度宽松政策猛烈拉升'高就业'或'GDP增速'角，拉力必然扯动整个网面，导致对角的'物价稳定'剧烈下坠（通胀失控）。",
      },
      klpTermini: [
        {
          termDE: "Magisches Viereck (§ 1 StabG 1967)",
          definitionDE:
            "Gesetzlich verankertes Zielbuendel gesamtwirtschaftlichen Gleichgewichts: Preisstabilitaet, hoher Beschaeftigungsstand, aussenwirtschaftliches Gleichgewicht und stetiges Wirtschaftswachstum.",
          termZH: "魔力四角 (1967 稳定法第1条)",
          definitionZH: "德国宏观经济平衡法定四大核心目标：物价稳定、充分就业、适度稳步经济增长、对外经济平衡。",
        },
        {
          termDE: "Preisniveaustabilitaet",
          definitionDE:
            "Geldwertstabilitaet, primaer durch die EZB gesteuert mit einem mittelfristigen Inflationsziel von 2 % gemaess dem Harmonisierten Verbraucherpreisindex (HVPI).",
          termZH: "物价水平稳定",
          definitionZH: "由欧洲央行（EZB）主导的货币购买力稳定指标，中期通胀目标锚定在年率 2%（基于调和消费者物价指数 HVPI）。",
        },
        {
          termDE: "Zielkonflikt vs. Zielharmonie",
          definitionDE:
            "Verhaeltnis zwischen Zielen: Zielkonflikt liegt vor, wenn die Annaeherung an ein Ziel die Erreichung eines anderen erschwert (z. B. Phillips-Kurve).",
          termZH: "目标冲突 vs 目标协调",
          definitionZH: "经济目标之间的互动关系：当追求某一目标削弱另一目标达成时为冲突（如菲利普斯曲线所表述的失业与通胀取舍）。",
        },
        {
          termDE: "Aussenwirtschaftliches Gleichgewicht",
          definitionDE:
            "Zustand, in dem Leistungsbilanzueberschuesse oder -defizite das inlaendische und internationale Gleichgewicht nicht gefaehrden (Richtwert Aussenbeitrag 1,5 - 2 % des BIP).",
          termZH: "对外经济平衡",
          definitionZH: "经常账户既无极端失衡逆差亦无畸高顺差，经常性对外盈余占 GDP 比重维持在适度稳定区间。",
        },
      ],
      fehlerquellen: [
        {
          trapTitleDE: "Wortwoertliches Missverstaendnis: Alle vier Ziele gleichzeitig maximieren",
          trapDescriptionDE:
            "Schueler argumentieren oft, eine erfolgreiche Regierung muesse alle vier Ziele simultan auf Hoechstwerte treiben.",
          trapDescriptionZH:
            "误以为优秀政府能同时让四大指标均达最优峰值：未理解'魔力'二字正是指其不可兼得的内在张力。",
          howToAvoidDE:
            "In Klausuren immer die komparative Priorisierung und konjunkturelle Phasenabhaengigkeit darlegen.",
        },
        {
          trapTitleDE: "Ausblenden des Magischen Sechsecks",
          trapDescriptionDE:
            "Ignorieren der modernen KLP-Erweiterung um oekologische Nachhaltigkeit und gerechte Einkommensverteilung.",
          trapDescriptionZH:
            "忽视北威州最新教学大纲对经典四角向'魔力六角'的生态与公平维度的扩展。",
          howToAvoidDE:
            "In AFB III immer die Zielerweiterung um Klimaschutz und soziale Gerechtigkeit reflektierend einbinden.",
        },
      ],
      klausurSatz15NP: {
        musterSatzDE:
          "Waehrend expansive fiskalpolitische Konjunkturprogramme kurzfristig den Beschaeftigungsstand stimulieren und deflationaeren Tendenzen entgegenwirken, verschaerfen sie im Sinne der modifizierten Phillips-Kurve den immanenten Zielkonflikt zur Preisniveaustabilitaet, sodass wirtschaftspolitische Interventionen stets einer austarierten Priorisierung im Zielgefuege des StabG beduerfen.",
        operator: "eroertern",
        scoringKeywords: [
          "Expansive Fiskalpolitik",
          "Beschaeftigungsstand",
          "Phillips-Kurve",
          "Preisniveaustabilitaet",
          "Zielkonflikt",
        ],
        explanationZH:
          "命题运用标准政策推演逻辑，结合菲利普斯曲线与宏观工具张力，完美符合 AFB III 辩证权衡评分标准。",
      },
      socraticProbes: [
        {
          questionDE:
            "Muss quantitatives BIP-Wachstum in Zeiten des Klimawandels vollstaendig durch qualitative Wohlstandsindikatoren ersetzt werden?",
          questionZH: "在气候变化时代，唯 GDP 论的数量型增长目标是否应当被质性福祉指标彻底取代？",
          counterPerspectiveDE:
            "Ohne solides Wirtschaftswachstum fehlen den Staaten die Steuereinnahmen zur Finanzierung der milliardenschweren oekologischen Transformation.",
        },
        {
          questionDE:
            "Ist der gigantische deutsche Exportueberschuss ein Zeichen von Staerke oder ein gefaehrlicher Destabilisator der Eurozone?",
          questionZH: "德国长期庞大的对外贸易顺差究竟是国家经济强劲的象征，还是威胁欧元区平衡的结构性隐患？",
          counterPerspectiveDE:
            "Strukturelle Aussenhandelsungleichgewichte erzeugen Verschuldungszwaenge in den Abnehmerlaendern und importieren internationale Krisenrisiken.",
        },
      ],
    },
  },

  // 4. Gini-Koeffizient / Lorenz-Kurve / Soziale Ungleichheit (SoWi)
  {
    id: "gini-koeffizient-ungleichheit",
    canonicalTitle: "Soziale Ungleichheit: Gini-Koeffizient & Lorenz-Kurve",
    fach: "SoWi",
    matchKeywords: [
      "gini",
      "gini-koeffizient",
      "lorenzkurve",
      "lorenz-kurve",
      "ungleichheit",
      "vermoegensverteilung",
      "einkommensverteilung",
      "armut",
      "soziale ungleichheit",
      "sekundaerverteilung",
      "primaerverteilung",
      "aequivalenzeinkommen",
    ],
    data: {
      topicTitle: "Soziale Ungleichheit: Gini-Koeffizient & Lorenz-Kurve",
      fach: "SoWi",
      mentalModelAnalogy: {
        analogyTitle: "Der Bananen-Bauch der Wohlstandsverteilung",
        explanationDE:
          "Die 45-Grad-Linie repraesentiert die perfekte Gleichverteilung (10 % der Menschen besitzen 10 % des Geldes). Je staerker die reale Kurve nach unten wie ein Bananen-Bauch durchhaengt, desto groesser ist die Flaeche zwischen Ideal und Realitaet - und desto naeher wandert der Gini-Koeffizient von 0 (Gleichheit) an 1 (maximale Konzentration).",
        explanationZH:
          "财富分配的弯曲香蕉腹模型：45度对角线代表绝对均等（10%人口拥有10%财富）。实际曲线越向下凹陷，与对角线围成的肚子面积 A 就越大，基尼系数越逼近 1（极度不均）。",
      },
      klpTermini: [
        {
          termDE: "Lorenz-Kurve",
          definitionDE:
            "Grafische Darstellung der relativen Konzentration von Einkommen oder Vermoegen: Kumulierte Bevoelkerungsanteile werden gegen kumulierte Einkommensanteile abgetragen.",
          termZH: "洛伦兹曲线",
          definitionZH: "收入或财富相对集中度的几何展现：横轴累计人口百分比，纵轴累计收入百分比构成的下凹分布曲线。",
        },
        {
          termDE: "Gini-Koeffizient",
          definitionDE:
            "Statistisches Mass fuer die Ungleichverteilung (Verhaeltnis der Konzentrationsflaeche zur Gesamtflaeche unter der Gleichverteilungsdiagonale), normiert zwischen 0 und 1.",
          termZH: "基尼系数",
          definitionZH: "衡量分配不平等程度的指标（不均面积 A / 总体三角形面积 A+B），取值在 0（绝对均等）至 1（一人垄断全部）之间。",
        },
        {
          termDE: "Primaer- vs. Sekundaerverteilung",
          definitionDE:
            "Primaerverteilung bezeichnet Markteinkommen vor staatlicher Intervention; Sekundaerverteilung das verfuegbare Einkommen nach Steuern und staatlichen Transferleistungen.",
          termZH: "初次分配 vs 再次分配",
          definitionZH: "初次分配为按要素产出的市场原始收入；再次分配为经历累进税制与国家社会转移支付（Transferleistungen）后的最终可支配所得。",
        },
        {
          termDE: "Vermoegens- vs. Einkommensungleichheit",
          definitionDE:
            "Vermoegen ist in Deutschland signifikant ungleicher verteilt (Gini ca. 0,75-0,78) als das verfuegbare Nettoaequeivalenzeinkommen (Gini ca. 0,29-0,32).",
          termZH: "财富不平等 vs 收入不平等",
          definitionZH: "德国统计学重要现象：财富存量基尼系数高达 0.75-0.78（极高集中），而税后可支配流量收入基尼系数约为 0.29-0.32。",
        },
      ],
      fehlerquellen: [
        {
          trapTitleDE: "Verwechslung von Einkommen und Vermoegen",
          trapDescriptionDE:
            "Schueler werfen in Klausuren regelmaessig Einkommens- und Vermoegensstatistiken zusammenhangslos durcheinander.",
          trapDescriptionZH:
            "混淆流量收入与存量财富概念，在评卷中直接把收入基尼系数套用为财富集中的论据。",
          howToAvoidDE:
            "Klausurtipp: Immer sauber trennen: Einkommen = Flussgroesse (Monat/Jahr); Vermoegen = Bestandsgroesse (Immobilien, Aktien, Erbschaften).",
        },
        {
          trapTitleDE: "Gleichsetzung von relativer Armut mit absoluter Verelendung",
          trapDescriptionDE:
            "Interpretation der Armutsgefaehrdungsgrenze (60 % des Medianeinkommens) als physisches Hungern.",
          trapDescriptionZH:
            "将以中位数收入 60% 界定的'相对贫困风险'误当作发展中国家的绝对温饱贫困。",
          howToAvoidDE:
            "Relative Armut als Mangel an gesellschaftlicher und kultureller Teilhabe im wohlhabenden Sozialstaat definieren.",
        },
      ],
      klausurSatz15NP: {
        musterSatzDE:
          "Die signifikante Diskrepanz zwischen dem primaeren Markteinkommens-Gini und dem sekundaeren Nettoaequivalenzeinkommens-Gini belegt die distributive Wirksamkeit des bundesdeutschen Steuer- und Transfersystems, wenngleich die persistierende Vermoegenskonzentration entlang der Lorenz-Kurve auf eine strukturelle Verfestigung sozialer Statusasymmetrien hinweist.",
        operator: "analysieren",
        scoringKeywords: [
          "Primaer- und Sekundaerverteilung",
          "Nettoaequivalenzeinkommen",
          "Distributive Wirksamkeit",
          "Vermoegenskonzentration",
          "Statusasymmetrien",
        ],
        explanationZH:
          "精准运用初次分配与再分配双重视角，对比流量与存量维度，展现扎实的统计与社会分层分析素养。",
      },
      socraticProbes: [
        {
          questionDE:
            "Fuehrt ein extrem niedriger Gini-Koeffizient automatisch zu mehr gesellschaftlicher Zufriedenheit, oder erstickt er wirtschaftliche Innovationskraefte?",
          questionZH: "基尼系数越低社会就必然越幸福吗？过度均等是否会扼杀个体创业和创新的边际驱动力？",
          counterPerspectiveDE:
            "Ohne adaequate Leistungsanreize und Ertragschancen sinkt die Investitionsbereitschaft in hochriskante Zukunftstechnologien.",
        },
        {
          questionDE:
            "Sollte Erbschaftsvermoegen drastisch besteuert werden, um die Chancengleichheit gemaess dem meritokratischen Ideal wiederherzustellen?",
          questionZH: "是否应对大额遗产征收高额遗产税，以捍卫基于个人才能的真正机会均等理想？",
          counterPerspectiveDE:
            "Eine Substanzbesteuerung von Familienunternehmen kann Betriebsvermoegen gefaehrden und Arbeitsplaetze vernichten.",
        },
      ],
    },
  },

  // 5. Kant / Kategorischer Imperativ / Pflichtethik (Philosophie)
  {
    id: "kant-kategorischer-imperativ",
    canonicalTitle: "Immanuel Kant: Kategorischer Imperativ & Pflichtethik",
    fach: "Philosophie",
    matchKeywords: [
      "kant",
      "immanuel kant",
      "kategorischer imperativ",
      "pflicht",
      "pflichtethik",
      "deontologie",
      "maxime",
      "guter wille",
      "autonomie",
      "menschheitszweckformel",
      "hypothetischer imperativ",
    ],
    data: {
      topicTitle: "Immanuel Kant: Kategorischer Imperativ & Pflichtethik",
      fach: "Philosophie",
      mentalModelAnalogy: {
        analogyTitle: "Der universelle Gesetzes-Stresstest der Vernunft",
        explanationDE:
          "Der Kategorische Imperativ wirkt wie ein logischer Software-Compiler fuer Handlungsabsichten: Du nimmst deine persoenliche Verhaltensregel (Maxime) und laesst sie durch den Test laufen: 'Was passiert, wenn jeder Mensch im Universum ausnahmslos genau so handelt?' Bricht das System dabei in logischen Selbstwiderspruch zusammen (z. B. Versprechen abgeben, um sie zu brechen), ist die Handlung moralisch verwerflich.",
        explanationZH:
          "普遍法则的理性压力测试器：将个人主观行动准则（Maxime）放入全人类逻辑编译器中检验——若人人都按此规则行事，整个社会系统是否会在逻辑上自我崩溃（例如人人都作虚假承诺，则'承诺'这一概念本身消亡）？若是，则该行为绝对不合道德义务。",
      },
      klpTermini: [
        {
          termDE: "Kategorischer Imperativ",
          definitionDE:
            "Das unbedingte, a priori gueltige Sittengesetz der reinen praktischen Vernunft: 'Handle nur nach derjenigen Maxime, durch die du zugleich wollen kannst, dass sie ein allgemeines Gesetz werde.'",
          termZH: "绝对命令 (定言命令)",
          definitionZH: "纯粹实践理性先验给出的无条件道德法则：仅依你同时能意愿其成为普遍法则之准则而行动。",
        },
        {
          termDE: "Guter Wille",
          definitionDE:
            "Fuer Kant das einzige denkbare Gut, das ohne Einschraenkung gut ist; moralisch wertvoll ist nicht der Erfolg, sondern das Handeln rein aus Pflicht.",
          termZH: "善良意志",
          definitionZH: "世上唯一无条件为善的事物：道德价值不取决于功利后果或情感偏好，而纯粹取决于'出于责任而行动'的意志本心。",
        },
        {
          termDE: "Menschheitszweck-Formel",
          definitionDE:
            "Variante des KI: 'Handle so, dass du die Menschheit, sowohl in deiner Person, als in der Person eines jeden anderen, jederzeit zugleich als Zweck, niemals bloss als Mittel brauchst.'",
          termZH: "人是目的公式",
          definitionZH: "绝对命令第二表述：行动时无论对自己还是对他人，都须始终将人当作目的本身，而绝不能仅仅当作手段工具。",
        },
        {
          termDE: "Autonomie des Willens",
          definitionDE:
            "Die Faehigkeit des vernuenftigen Subjekts zur moralischen Selbstgesetzgebung, frei von fremden Trieben und heteronomen Zwaengen.",
          termZH: "意志自律",
          definitionZH: "理性主体摆脱感官本能、外部强迫与利益诱惑，遵从自身理性确立道德法则的崇高自主性。",
        },
      ],
      fehlerquellen: [
        {
          trapTitleDE: "Verwechslung des KI mit der Goldenen Regel",
          trapDescriptionDE:
            "Schueler setzen Kants Kategorischen Imperativ mit dem Sprichwort 'Was du nicht willst, dass man dir tu...' gleich.",
          trapDescriptionZH:
            "将定言命令等同于俗语'己所不欲勿施于人'（黄金法则）：未理解黄金法则依赖个人主观好恶，而康德排斥一切经验主观感性。",
          howToAvoidDE:
            "In Klausuren klar abgrenzen: Die Goldene Regel basiert auf subjektiven Neigungen; Kants KI fordert universelle, widerspruchsfreie Vernunftnotwendigkeit.",
        },
        {
          trapTitleDE: "Folgenorientierte Beurteilung (Konsequentialismus-Falle)",
          trapDescriptionDE:
            "Begruendung der moralischen Falschheit einer Handlung mit schlechten praktischen Konsequenzen statt mit logischem Selbstwiderspruch.",
          trapDescriptionZH:
            "用'后果不好会给社会造成痛苦'来证明不道德，直接跌入功利主义陷阱，违背了康德义务论的本质。",
          howToAvoidDE:
            "Ausschliesslich mit dem inneren logischen Widerspruch der Maxime bei Universalisierung argumentieren.",
        },
      ],
      klausurSatz15NP: {
        musterSatzDE:
          "Im Rahmen der kantischen Deontologie fungiert der Kategorische Imperativ nicht als empirischer Zweck-Mittel-Kalkuel, sondern als formales Apriori-Kriterium der praktischen Vernunft, mittels dessen die Universalisierbarkeit subjektiver Maximen unter striktem Ausschluss heteronomer Neigungen auf ihre immanente Widerspruchsfreiheit hin geprueft wird.",
        operator: "darstellen",
        scoringKeywords: [
          "Kantische Deontologie",
          "Kategorischer Imperativ",
          "Apriori-Kriterium",
          "Universalisierbarkeit",
          "Immanente Widerspruchsfreiheit",
        ],
        explanationZH:
          "精准使用 Apriori、Deontologie、heteronome Neigungen 等核心专业术语，体现极高哲学术语严谨度与理论框架把握。",
      },
      socraticProbes: [
        {
          questionDE:
            "Muss man nach Kants rigoroser Pflichtethik einen Moerder an der Haustuer anluegen duerfen, um das Leben eines versteckten Freundes zu retten?",
          questionZH: "根据康德严格的义务论，面对敲门搜捕好友的凶手，难道真的绝不允许为了救人而说谎吗？",
          counterPerspectiveDE:
            "Kant verneint selbst die Notluege, da das Luegenverbot ein unbedingtes Vernunftgebot ist, dessen Relativierung die Rechtsordnung insgesamt untergraebt.",
        },
        {
          questionDE:
            "Ist eine rein formale Vernunftethik ueberhaupt in der Lage, konkrete moralische Dilemmata der modernen Medizin oder KI zu loesen?",
          questionZH: "纯形式主义的先验理性伦理，面对现代医学插管或自动驾驶电车难题等具体权衡时是否显得苍白无力？",
          counterPerspectiveDE:
            "Die Menschheitszweck-Formel bietet praezise ethische Grenzziehungen gegen die Instrumentalisierung des Menschen in Bioethik und Technologie.",
        },
      ],
    },
  },

  // 6. Utilitarismus / Bentham / Mill (Philosophie)
  {
    id: "utilitarismus-nutzenkalkuel",
    canonicalTitle: "Utilitarismus: Bentham, Mill & das Nutzenkalkuel",
    fach: "Philosophie",
    matchKeywords: [
      "utilitarismus",
      "bentham",
      "jeremy bentham",
      "mill",
      "john stuart mill",
      "nutzenkalkuel",
      "hedonismus",
      "konsequenzenprinzip",
      "qualitativer utilitarismus",
      "handlungsutilitarismus",
      "regelutilitarismus",
      "groesstes glueck",
    ],
    data: {
      topicTitle: "Utilitarismus: Bentham, Mill & das Nutzenkalkuel",
      fach: "Philosophie",
      mentalModelAnalogy: {
        analogyTitle: "Die gesellschaftliche Gluecks-Buchhaltung",
        explanationDE:
          "Eine moralische Handlung wird bewertet wie eine Bilanz in der Buchfuehrung: Man summiert alle erzeugten Einheiten an Freude (Pleasure) ueber alle betroffenen Individuen hinweg und subtrahiert die Summe allen Leids (Pain). Ist das Gesamtsaldo positiv und groesser als jede Handlungsalternative, ist die Tat moralisch geboten.",
        explanationZH:
          "全社会幸福净收益核算模型：道德行为如同会计资产负债表。将某一决策对所有当事人带来的快乐总量相加，扣除其造成的痛苦总量。若净快乐值大于任何备选方案，该行为即具备无可辩驳的道德正当性。",
      },
      klpTermini: [
        {
          termDE: "Vier utilitaristische Grundprinzipien",
          definitionDE:
            "Konsequenzprinzip (Folgen), Utilitaetsprinzip (Nutzen), Hedonistisches Prinzip (Glueck/Freude) und Universalistisches Prinzip (Wohlergehen aller Betroffenen).",
          termZH: "功利主义四大支柱原则",
          definitionZH: "后果原则（看结果）、效用原则（看功利）、快乐主义原则（看福祉体验）、普遍主义原则（平权计入所有受影响者）。",
        },
        {
          termDE: "Hedonistisches Kalkuel (Bentham)",
          definitionDE:
            "Quantitatives Rechenverfahren zur Ermittlung des Gesamtnutzens anhand von Kriterien wie Intensitaet, Dauer, Gewissheit und Naehe von Empfindungen.",
          termZH: "享乐主义微积分 (边沁)",
          definitionZH: "定量计算总快乐的量化公式：基于强度、持续时间、确定性、远近、纯度与波及范围等维度计算分值。",
        },
        {
          termDE: "Qualitativer Utilitarismus (Mill)",
          definitionDE:
            "Erweiterung durch J. S. Mill: Differenzierung zwischen hoeherwertigen geistig-kulturellen und niederen sinnlichen Freuden ('Lieber ein unzufriedener Sokrates als ein zufriedenes Schwein').",
          termZH: "质性功利主义 (密尔)",
          definitionZH: "密尔的质性修正：明确区分精神文化的高阶快乐与肉体感官的低阶快乐，强调不能仅凭感官数量做简单累加。",
        },
        {
          termDE: "Handlungs- vs. Regelutilitarismus",
          definitionDE:
            "Handlungsutilitarismus prueft die Einzeltat nach ihren konkreten Folgen; Regelutilitarismus prueft die Nuetzlichkeit allgemeiner Handlungsregeln.",
          termZH: "行动功利主义 vs 准则功利主义",
          definitionZH: "行动功利主义只评估单次具体行径的直接后果；准则功利主义评估若全社会普遍遵守某一规则能否带来最大长效功利。",
        },
      ],
      fehlerquellen: [
        {
          trapTitleDE: "Gleichsetzung von Utilitarismus mit persoenlichem Egoismus",
          trapDescriptionDE:
            "Schueler meinen oft, Utilitarismus bedeute, das zu tun, was fuer den Handelnden selbst den groessten Vorteil bringt.",
          trapDescriptionZH:
            "将功利主义误解为只顾自己利益的个人利己主义：忽视了'普遍性原则'要求对自身与陌生人持有绝对无偏袒的同等权重。",
          howToAvoidDE:
            "In Klausuren immer betonen: Das universalistische Prinzip verlangt unparteiliches Abwaegen aller betroffenen Wesen gleichermassen.",
        },
        {
          trapTitleDE: "Verkennung des Minderheitenproblems",
          trapDescriptionDE:
            "Nicht-Thematisieren der Gefahr, dass fundamentale Menschenrechte im reinen Utilitarismus zum Wohle der Mehrheit geopfert werden koennen.",
          trapDescriptionZH:
            "在评述时不指出多数人暴政对少数人基本权利的侵犯风险（如牺牲一个无辜者拯救五个人）。",
          howToAvoidDE:
            "In AFB III stets die Problematik von Grundrechten und Wuerde gegen das Kollektivglueck abwaegen.",
        },
      ],
      klausurSatz15NP: {
        musterSatzDE:
          "Waehrend Benthams quantitatives Hedonismus-Kalkuel an der intersubjektiven Unvergleichbarkeit individueller Gluecksempfindungen sowie der latenten Gefahr einer Unterdrueckung von Minderheiten scheitert, vermag Mills Regelutilitarismus durch die Etablierung wohlfahrtsmaximierender Normen eine konsistentere Synthese aus Gemeinwohlorientierung und rechtlicher Stabilitaet zu leisten.",
        operator: "beurteilen",
        scoringKeywords: [
          "Quantitatives Hedonismus-Kalkuel",
          "Intersubjektive Unvergleichbarkeit",
          "Minderheitenschutz",
          "Regelutilitarismus",
          "Wohlfahrtsmaximierende Normen",
        ],
        explanationZH:
          "对比边沁与密尔，准确指出量化不可通约性与少数群体保护两大约束，属于哲学会考判分标准的典范表述。",
      },
      socraticProbes: [
        {
          questionDE:
            "Darf ein Arzt einen gesunden Menschen toeten, um mit seinen Organen fuenf todkranke Patienten zu retten?",
          questionZH: "医生能否秘密杀死一名健康人取其器官救活五名濒死患者以实现净生命值最大化？",
          counterPerspectiveDE:
            "Der reine Handlungsutilitarismus geraet hier in Konflikt mit dem absoluten Wuerdeanspruch des Einzelnen und zerstoert das oeffentliche Vertrauen in die Medizin.",
        },
        {
          questionDE:
            "Wer entscheidet verbindlich, welche Freuden 'hoeherwertig' sind - ist Mills Unterscheidung nicht elitAer und kulturpessimistisch?",
          questionZH: "由谁来断定哪种快乐属于'高阶'？密尔崇尚苏格拉底的快乐是否暗含精英主义偏见？",
          counterPerspectiveDE:
            "Mill beruft sich auf das Urteil derjenigen Urteilskompetenten, die beide Arten der Freude aus eigener Erfahrung kennen.",
        },
      ],
    },
  },

  // 7. Textanalyse / Toulmin / Sachtext (Deutsch)
  {
    id: "textanalyse-toulmin",
    canonicalTitle: "Sachtextanalyse & Argumentationsstruktur (Toulmin-Modell)",
    fach: "Deutsch",
    matchKeywords: [
      "textanalyse",
      "sachtextanalyse",
      "toulmin",
      "argumentation",
      "argumentationsstruktur",
      "these",
      "argument",
      "beleg",
      "rhetorik",
      "stilmittel",
      "intentionalitaet",
      "stuetzung",
    ],
    data: {
      topicTitle: "Sachtextanalyse & Argumentationsstruktur (Toulmin-Modell)",
      fach: "Deutsch",
      mentalModelAnalogy: {
        analogyTitle: "Die architektonische Statik eines Textes",
        explanationDE:
          "Ein Sachtext ist gebaut wie ein Gebaeude: Die These ist das Dach. Die Argumente sind die tragenden Pfeiler. Belege, Daten und Stuetzungen bilden das Betonfundament. Rhetorische Figuren sind der dekorative und suggestive Anstrich, der das Haus fuer den Betrachter attraktiv und ueberzeugend macht.",
        explanationZH:
          "论证文本的建筑力学模型：论点（These/Claim）是屋顶；分论点（Argument）是承重柱；论据数据（Beleg/Data）是地基与基岩；修辞手法是具有心理暗示作用的装潢油漆，用以俘获读者的信任与情绪。",
      },
      klpTermini: [
        {
          termDE: "Toulmin-Argumentationsschema",
          definitionDE:
            "Analytisches Modell bestehend aus Behauptung (Claim), Datum/Tatsache (Data), Schlussregel (Warrant), Stuetzung (Backing) und Ausnahmebedingung (Rebuttal).",
          termZH: "图尔敏论证模型",
          definitionZH: "理性论证解构工具：包含主张（Claim）、数据依据（Data）、保证/推理桥梁（Warrant）、支援后盾（Backing）和反驳保留（Rebuttal）。",
        },
        {
          termDE: "These vs. Argument vs. Beleg",
          definitionDE:
            "These ist die streitbare Grundbehauptung; das Argument begruendet sie logisch; der Beleg verifiziert das Argument durch empirische Fakten oder Zitate.",
          termZH: "论点 vs 论据 vs 例证",
          definitionZH: "论点为核心争鸣主张；论据提供逻辑支撑依据；例证则通过统计事实、专家引证或经验实例提供背书验证。",
        },
        {
          termDE: "Funktionalitaet rhetorischer Mittel",
          definitionDE:
            "Die Bestimmung der zielgerichteten Wirkungsabsicht (z. B. Persuasion, Emotionalisierung, Abwertung) statt blosser Benennung des Stilmittels.",
          termZH: "修辞手法的效能分析",
          definitionZH: "德语分析关键要求：严禁只罗列辞格名称，必须明确揭示其如何服务于作者的说服意图或情绪调动。",
        },
        {
          termDE: "Sachurteil vs. Werturteil",
          definitionDE:
            "Sachurteil bewertet die innere logische Kohaerenz und Stichhaltigkeit des Textes; Werturteil beurteilt die Position nach ethisch-normativen Kriterien.",
          termZH: "事实逻辑评价 vs 价值规范评价",
          definitionZH: "Sachurteil 评析文本内在论证的自洽性与严密性；Werturteil 依据外部伦理法理尺度对作者观点进行价值定性。",
        },
      ],
      fehlerquellen: [
        {
          trapTitleDE: "Reines 'Stilmittel-Katalogisieren' ohne Funktionsbezug",
          trapDescriptionDE:
            "Schueler zaehlen Metaphern, Alliterationen und Hypotaxen auf, ohne deren konkrete argumentative Wirkung auf den Leser zu erklaeren.",
          trapDescriptionZH:
            "大段堆砌'这里用了隐喻/排比'，却完全不解释该手法在上下文如何强化作者论点，招致严重扣分。",
          howToAvoidDE:
            "In Klausuren immer im Dreischritt formulieren: Benennung des Stilmittels -> Textbeleg mit Zeilenangabe -> Konkrete funktionale Auswirkung auf die Argumentationsrichtung.",
        },
        {
          trapTitleDE: "Verwechselung von Autorenmeinung und referierter Fremdposition",
          trapDescriptionDE:
            "Gleichsetzung von zitierten Gegenargumenten mit der eigentlichen Absicht des Autors.",
          trapDescriptionZH:
            "将作者引述的反方靶子观点误认为是作者本人的立场。",
          howToAvoidDE:
            "Genau auf Konjunktiv I und distanzierende Signale ('Er behauptet, dies sei...') achten.",
        },
      ],
      klausurSatz15NP: {
        musterSatzDE:
          "Der Autor fundiert seine zentrale These ueber eine dreistufige Argumentationskaskade gemaess dem Toulmin-Schema, wobei die funktionale Verflechtung antithetischer Satzstrukturen mit normativen Belegen darauf abzielt, die Gegenposition sukzessive zu delegitimieren und die eigene Folgerung als alternativlos darzustellen.",
        operator: "analysieren",
        scoringKeywords: [
          "Toulmin-Schema",
          "Funktionale Verflechtung",
          "Antithetische Strukturen",
          "Normative Belege",
          "Delegitimation der Gegenposition",
        ],
        explanationZH:
          "完整体现修辞与论证脉络的深度融合，精准结合句法结构与说服机制，是标准 15 分模范句。",
      },
      socraticProbes: [
        {
          questionDE:
            "Wie entlarvt man einen logischen Fehlschluss (z. B. argumentum ad populum), wenn er in sprachlich brillante Rhetorik gehuellt ist?",
          questionZH: "当作者用华丽宏大的修辞掩盖逻辑跳跃（如诉诸大众论证）时，如何剥离文字伪装直击论据漏洞？",
          counterPerspectiveDE:
            "Rhetorik dient oft dazu, fehlende empirische Evidenz durch emotionale Mobilisierung des Lesers zu kompensieren.",
        },
        {
          questionDE:
            "Kann eine Argumentation formal voellig fehlerfrei sein, aber inhaltlich zu einer ethisch untragbaren Schlussfolgerung fuehren?",
          questionZH: "一个论证能否在形式逻辑上无懈可击，但其实质结论却在道德上完全不可接受？",
          counterPerspectiveDE:
            "Wenn die Praemissen bereits fragwuerdig sind, garantiert logische Gueltigkeit noch keine inhaltliche Wahrheit.",
        },
      ],
    },
  },

  // 8. Tangente / Ableitung / Differentialrechnung (Mathe)
  {
    id: "tangente-ableitung",
    canonicalTitle: "Differentialrechnung: Tangente, Ableitung & Aenderungsrate",
    fach: "Mathe",
    matchKeywords: [
      "tangente",
      "ableitung",
      "differentialrechnung",
      "differenzenquotient",
      "differentialquotient",
      "aenderungsrate",
      "steigung",
      "grenzwert",
      "limes",
      "h-methode",
    ],
    data: {
      topicTitle: "Differentialrechnung: Tangente, Ableitung & Aenderungsrate",
      fach: "Mathe",
      mentalModelAnalogy: {
        analogyTitle: "Der Momentan-Tachometer vs. Durchschnitts-Reisedauer",
        explanationDE:
          "Der Differenzenquotient (Sekantensteigung) ist wie die Berechnung der Durchschnittsgeschwindigkeit: 200 km in 2 Stunden ergeben 100 km/h im Schnitt. Die Ableitung (Differentialquotient/Tangente) ist der Blick auf den Tachometer in exakt einer Millisekunde: Der Abstand h schrumpft gegen Null und enthuellt die augenblickliche Dynamik genau an der Stelle x0.",
        explanationZH:
          "瞬时速度仪表盘模型：差商（割线斜率）计算的是两小时开两百公里的平均时速；而导数（切线斜率/微商）则是将观察时间间隔 h 缩至极限为 0 时，仪表盘指针在特定瞬间 t 所指示的瞬时变化率。",
      },
      klpTermini: [
        {
          termDE: "Mittlere Aenderungsrate (Differenzenquotient)",
          definitionDE:
            "Die Steigung der Sekante durch zwei Punkte eines Funktionsgraphen: m = (f(x0+h) - f(x0)) / h.",
          termZH: "平均变化率 (差商 / 割线斜率)",
          definitionZH: "连接曲线上两点的割线斜率，反映函数在区间 [x0, x0+h] 上的平均增减速度。",
        },
        {
          termDE: "Lokale Aenderungsrate (Differentialquotient / Ableitung)",
          definitionDE:
            "Der Grenzwert des Differenzenquotienten fuer h strebt gegen Null: f'(x0) = lim_{h -> 0} (f(x0+h) - f(x0)) / h.",
          termZH: "瞬时变化率 (导数 / 微商 / 切线斜率)",
          definitionZH: "当步长 h 趋于 0 时差商的极限值，表征曲线在某点切线的真实斜率与瞬时敏感度。",
        },
        {
          termDE: "Tangentengleichung",
          definitionDE:
            "Geradengleichung der Tangente an der Stelle x0: t(x) = f'(x0) * (x - x0) + f(x0).",
          termZH: "切线方程",
          definitionZH: "点斜式切线几何解析式：通过切点 (x0, f(x0)) 且斜率为 f'(x0) 的一阶局部线性逼近直线。",
        },
        {
          termDE: "Differenzierbarkeit vs. Stetigkeit",
          definitionDE:
            "Jede differenzierbare Funktion ist stetig, aber nicht jede stetige Funktion ist differenzierbar (z. B. Knickstellen bei Betragsfunktionen).",
          termZH: "可导性与连续性",
          definitionZH: "微积分基础定理：可导必连续，但连续不一定可导（如绝对值函数的折点处无唯一切线）。",
        },
      ],
      fehlerquellen: [
        {
          trapTitleDE: "Verwechslung von Funktionswert f(x) und Steigung f'(x)",
          trapDescriptionDE:
            "Schueler setzen in Klausuren oft f(x) = 0 statt f'(x) = 0, wenn nach Extremstellen oder maximalem Wachstum gefragt ist.",
          trapDescriptionZH:
            "混淆函数值与导数值：求极值点或最快增长点时误解方程，分不清'高度'与'坡度'的区别。",
          howToAvoidDE:
            "Strikte begriffliche Trennung: f(x) beschreibt den Zustand/Bestand, f'(x) die Veraenderung/Dynamik.",
        },
        {
          trapTitleDE: "Fehlende Grenzwertbetrachtung (Division durch Null)",
          trapDescriptionDE:
            "Setzen von h = 0 in den Differenzenquotienten vor dem algebraischen Kuerzen.",
          trapDescriptionZH:
            "在未化简约去分母的 h 之前直接令 h=0，导致出现非法的 0/0 无意义运算。",
          howToAvoidDE:
            "Zuerst Term zaehlerseitig faktorisieren, h kuerzen, erst danach den Limes-Uebergang vollziehen.",
        },
      ],
      klausurSatz15NP: {
        musterSatzDE:
          "Der Uebergang von der mittleren zur lokalen Aenderungsrate vollzieht sich analytisch ueber den Grenzwertprozess des Differenzenquotienten, wobei die Steigung der Sekante im Limes fuer h strebt gegen Null in die Tangentensteigung der Kurve im Beruehrpunkt uebergeht und die momentane Wachstumsrate repraesentiert.",
        operator: "darstellen",
        scoringKeywords: [
          "Mittlere Aenderungsrate",
          "Lokale Aenderungsrate",
          "Grenzwertprozess",
          "Differenzenquotient",
          "Tangentensteigung",
        ],
        explanationZH:
          "严密表述微积分由割线向切线过渡的极限思想，精准串联瞬时变化率与几何切线斜率。",
      },
      socraticProbes: [
        {
          questionDE:
            "Warum existiert an der Knickstelle der Funktion f(x) = |x| bei x = 0 keine Tangente, obwohl der Graph vollkommen zusammenhaengend ist?",
          questionZH: "绝对值函数在原点连续且完整，为何此处却无法求出导数与确定切线？",
          counterPerspectiveDE:
            "Der linksseitige und der rechtsseitige Grenzwert des Differenzenquotienten divergieren (-1 vs. +1), sodass kein eindeutiger Limes existiert.",
        },
        {
          questionDE:
            "Bedeutet f'(x) = 0 zwingend, dass an dieser Stelle ein Hoch- oder Tiefpunkt vorliegt?",
          questionZH: "一阶导数为零是函数存在极值点的充分条件吗？",
          counterPerspectiveDE:
            "Nein, es kann sich auch um einen Sattelpunkt (Terrassenpunkt) handeln; erst das Vorzeichenwechselkriterium oder f''(x) entscheidet.",
        },
      ],
    },
  },

  // 9. Energieerhaltung / Mechanik (Physik)
  {
    id: "energieerhaltung-physik",
    canonicalTitle: "Klassische Mechanik: Energieerhaltungssatz & Dissipation",
    fach: "Physik",
    matchKeywords: [
      "energieerhaltung",
      "energieerhaltungssatz",
      "kinetische energie",
      "potentielle energie",
      "potenzielle energie",
      "mechanische energie",
      "dissipation",
      "reibung",
      "thermodynamik",
      "energieumwandlung",
    ],
    data: {
      topicTitle: "Klassische Mechanik: Energieerhaltungssatz & Dissipation",
      fach: "Physik",
      mentalModelAnalogy: {
        analogyTitle: "Das unzerstoerbare Universums-Bankkonto",
        explanationDE:
          "Energie ist wie ein feststehendes Guthaben auf einem Bankkonto: Es kann weder Geld aus dem Nichts erschaffen noch vernichtet werden. Es wandert lediglich zwischen verschiedenen Waehrungskonten hin und her (von Lageenergie E_pot zu Bewegungsenergie E_kin). Reibung ist dabei wie eine Transfergebuehr, die den Betrag in Waerme (thermische Energie) umwandelt, die nicht mehr mechanisch nutzbar ist.",
        explanationZH:
          "宇宙不可毁灭的总账户模型：能量总量恒定，无法被创生或消灭。能量只是在不同币种之间兑换（从势能 E_pot 换为动能 E_kin）。摩擦做功则是将高品位机械能兑换为弥散在环境中的热能（耗散）。",
      },
      klpTermini: [
        {
          termDE: "Energieerhaltungssatz",
          definitionDE:
            "In einem abgeschlossenen System ist die Gesamtenergie konstant: E_ges = E_kin + E_pot + E_therm = const.",
          termZH: "能量守恒定律",
          definitionZH: "孤立系统物理学基石法则：系统内部能量总量恒定，能量形式可转化但无法被凭空产生或消灭。",
        },
        {
          termDE: "Kinetische Energie",
          definitionDE:
            "Bewegungsenergie eines Koerpers mit Masse m und Geschwindigkeit v: E_kin = (1/2) * m * v^2.",
          termZH: "动能",
          definitionZH: "物体由于运动而具有的能量，与质量呈正比，与瞬时速度的平方呈正比。",
        },
        {
          termDE: "Potenzielle Energie (Lageenergie)",
          definitionDE:
            "Im homogenen Schwerefeld gespeicherte Energie bezueglich eines Referenzniveaus: E_pot = m * g * h.",
          termZH: "势能 (重力势能)",
          definitionZH: "在匀强重力场中物体由于位置高度而储存的能量，取决于质量、重力加速度及参考平面高度差。",
        },
        {
          termDE: "Dissipation & Reibungsarbeit",
          definitionDE:
            "Irreversible Umwandlung geordneter mechanischer Energie in ungeordnete thermische Energie durch Reibungskraefte (W_R = F_R * s).",
          termZH: "耗散与摩擦做功",
          definitionZH: "机械能通过摩擦阻力不可逆地转化为微观分子无规则热运动内能的过程。",
        },
      ],
      fehlerquellen: [
        {
          trapTitleDE: "Umgangssprachlicher Fehler: 'Energie wird verbraucht oder geht verloren'",
          trapDescriptionDE:
            "Schueler schreiben in Klausuren haeufig, dass Energie bei Reibung 'verloren' ginge, was gegen den Erhaltungssatz verstoesst.",
          trapDescriptionZH:
            "使用口语'能量被消耗掉了'或'能量损失了'：物理考卷中必扣分，能量永不损失，只能转化为热能（耗散）。",
          howToAvoidDE:
            "Klausurtipp: Stets physikalisch praezise formulieren: Mechanische Energie wird in innere thermische Energie umgewandelt (dissipiert).",
        },
        {
          trapTitleDE: "Ignorieren der Systemgrenzen (offenes vs. abgeschlossenes System)",
          trapDescriptionDE:
            "Anwendung der Formel E_kin + E_pot = const. in Systemen mit aeusserem Energieaustausch.",
          trapDescriptionZH:
            "在存在外界外力做功或质量交换的非孤立开放系统中，盲目套用机械能守恒。",
          howToAvoidDE:
            "Zu Beginn jeder Klausuraufgabe das physikalische System explizit als abgeschlossen definieren.",
        },
      ],
      klausurSatz15NP: {
        musterSatzDE:
          "In einem abgeschlossenen mechanischen System bleibt die Summe aus kinetischer und potenzieller Energie gemaess dem Energieerhaltungssatz konstant, sodass beim reibungsfreien Fall die kontinuierliche Abnahme der Lageenergie betragsmaessig exakt der Zunahme der kinetischen Translationsenergie entspricht.",
        operator: "analysieren",
        scoringKeywords: [
          "Abgeschlossenes System",
          "Energieerhaltungssatz",
          "Kinetische Energie",
          "Lageenergie",
          "Translationsenergie",
        ],
        explanationZH:
          "规范设定物理系统前提（abgeschlossenes System），精准运用能量守恒转换对应关系，答题点无懈可击。",
      },
      socraticProbes: [
        {
          questionDE:
            "Wenn Energie niemals vernichtet werden kann, warum sprechen Politik und Gesellschaft dann von einer 'Energiekrise'?",
          questionZH: "如果能量绝不可能被消灭，为什么现代社会还会面临所谓的'能源危机'？",
          counterPerspectiveDE:
            "Die Krise betrifft nicht die Quantitaet der Energie, sondern deren Qualitaet: Hochwertige Exergie wird irreversibel in minderwertige, nicht mehr nutzbare Umweltwaerme entwertet (Entropie).",
        },
        {
          questionDE:
            "Gilt der klassische Energieerhaltungssatz auch in der relativistischen Physik von Albert Einstein?",
          questionZH: "爱因斯坦相对论中，经典机械能守恒定律仍然保持原样成立吗？",
          counterPerspectiveDE:
            "In der Relativitaetstheorie verschmelzen Masse und Energie ueber E = m * c^2 zu einem gemeinsamen Erhaltungsprinzip der Gesamtmasse-energie.",
        },
      ],
    },
  },
];

// ---------------------------------------------------------------------------
// Fallback Generator: Smart Heuristic Synthesis for Arbitrary Topics
// ---------------------------------------------------------------------------

interface SubjectFallbackArchetype {
  defaultAnalogyTitle: string;
  analogyTemplateDE: (title: string) => string;
  analogyTemplateZH: (title: string) => string;
  defaultOperator: "analysieren" | "darstellen" | "beurteilen" | "eroertern";
  standardTraps: (title: string) => Array<{
    trapTitleDE: string;
    trapDescriptionDE: string;
    trapDescriptionZH: string;
    howToAvoidDE: string;
  }>;
  musterSatzTemplate: (title: string) => {
    musterSatzDE: string;
    operator: "analysieren" | "darstellen" | "beurteilen" | "eroertern";
    scoringKeywords: string[];
    explanationZH: string;
  };
  socraticQuestions: (title: string) => Array<{
    questionDE: string;
    questionZH: string;
    counterPerspectiveDE: string;
  }>;
}

const SUBJECT_ARCHETYPES: Record<string, SubjectFallbackArchetype> = {
  SoWi: {
    defaultAnalogyTitle: "Systemisches Rueckkopplungs-Getriebe gesellschaftlicher Institutionen",
    analogyTemplateDE: (t) =>
      `Das Konzept »${t}« funktioniert wie ein sensibles Zahnradgetriebe in einer vernetzten Markt- und Gesellschaftsordnung: Dreht eine politische oder oekonomische Institution an diesem Stellhebel, loest dies unvermeidlich Rueckkopplungseffekte bei Buergern, Maerkten und Verteilungsgerechtigkeit aus.`,
    analogyTemplateZH: (t) =>
      `»${t}« 在社会政治经济体系中如同联动的调节齿轮系统：制度对该维度的调控必然在市场效率、公民权利与再分配平衡之间触发链式反馈效应。`,
    defaultOperator: "analysieren",
    standardTraps: (t) => [
      {
        trapTitleDE: `Monokausale Verengung bei der Betrachtung von »${t}«`,
        trapDescriptionDE: `Schueler fuehren komplexe soziooekonomische Phaenomene isoliert auf einen einzigen Faktor zurueck, statt Mehrebenen-Wechselwirkungen zu beruecksichtigen.`,
        trapDescriptionZH: `将 »${t}« 的成因简单归结为单一线性原因，忽略了政治体制、市场力量与社会阶层之间的多维度相互博弈。`,
        howToAvoidDE: `In Klausuren AFB II/III immer die Trias aus Akteuren, Institutionen und strukturellen Rahmenbedingungen darlegen.`,
      },
      {
        trapTitleDE: `Verwechslung von normativer Wunschvorstellung und empirischer Realitaet`,
        trapDescriptionDE: `Mischen von rechtlich-politischen Zielvorgaben mit der tatsaechlichen faktischen Implementierung in der Gesellschaft.`,
        trapDescriptionZH: `混淆应然（制度目标）与实然（实际落地与利益阻碍），导致答题脱离现实约束。`,
        howToAvoidDE: `Sauber zwischen normativer Verfassungslage und empirisch messbarer Realitaet differenzieren.`,
      },
    ],
    musterSatzTemplate: (t) => ({
      musterSatzDE: `Die systematische Untersuchung von »${t}« verdeutlicht die institutionelle Interdependenz zwischen politischer Steuerungsfaehigkeit und soziooekonomischer Dynamik, wobei die Wirksamkeit staatlicher Interventionen massgeblich von den vorherrschenden Anreizstrukturen determiniert wird.`,
      operator: "analysieren",
      scoringKeywords: ["Institutionelle Interdependenz", "Steuerungsfaehigkeit", "Soziooekonomische Dynamik", "Anreizstrukturen", "Interventionen"],
      explanationZH: `标准的社会科学高分分析范式，精准抓住制度相互依赖与激励机制核心概念。`,
    }),
    socraticQuestions: (t) => [
      {
        questionDE: `Welche unbeabsichtigten Nebenfolgen entstehen, wenn der Staat »${t}« extrem forciert oder vollstaendig dereguliert?`,
        questionZH: `当国家对 »${t}« 进行过度行政干预或彻底放任自由时，会带来哪些意想不到的负面外部效应？`,
        counterPerspectiveDE: `Jede wohlfahrtsstaatliche Regulierung greift in Marktmechanismen ein und kann unerwuenschte Fehlanreize hervorrufen.`,
      },
      {
        questionDE: `Dient »${t}« primaer dem allgemeinen Gemeinwohl oder schuetzt es privilegierte Statusinteressen etablierter Eliten?`,
        questionZH: `»${t}« 主要是维护全体公民的公共福祉，还是客观上巩固了既得利益集团的特权？`,
        counterPerspectiveDE: `Institutionen koennen gleichzeitig kollektive Stabilitaet sichern und dennoch asymmetrische Machtchancen perpetuieren.`,
      },
    ],
  },

  Philosophie: {
    defaultAnalogyTitle: "Der normative Pruefstein praktischer Vernunft",
    analogyTemplateDE: (t) =>
      `Das philosophische Problem »${t}« gleicht einem fundamentalen Pruefstein des menschlichen Selbstverstaendnisses: Es hinterfragt die unhinterfragten Praemissen unseres Denkens und trennt logisch tragfaehige Prinzipien von bloer Konvention oder biologischem Affekt.`,
    analogyTemplateZH: (t) =>
      `»${t}« 构成了人类实践理性的试金石：剥离日常习惯与感性经验的掩饰，从第一性原理直击行为动机与道德规范的先验逻辑根基。`,
    defaultOperator: "beurteilen",
    standardTraps: (t) => [
      {
        trapTitleDE: `Naturalistischer Fehlschluss bei »${t}«`,
        trapDescriptionDE: `Schueler schliessen unzulaessig von dem, was in der Natur oder Gesellschaft faktisch ist (Sein), auf das, was moralisch sein soll (Sollen).`,
        trapDescriptionZH: `在探讨 »${t}« 时犯下自然主义谬误：由客观存在的事实（实然）直接推导出道德应当成立的标准（应然）。`,
        howToAvoidDE: `In philosophischen Klausuren stets auf den logischen Graben zwischen Seins-Aussagen und Sollens-Geboten verweisen (Hume'sches Gesetz).`,
      },
      {
        trapTitleDE: `Relativismus-Falle ohne argumentative Begruendung`,
        trapDescriptionDE: `Flucht in die Floskel 'Das muss jeder fuer sich selbst entscheiden', statt ethische Kriterien systematisch abzuwaegen.`,
        trapDescriptionZH: `在遇到价值冲突时滑入廉价的相对主义泥潭，未对不同伦理体系的论据力度进行严谨逻辑称量。`,
        howToAvoidDE: `Ethische Diskurse erfordern intersubjektiv nachvollziehbare, rationale Kriterien statt privater Beliebigkeit.`,
      },
    ],
    musterSatzTemplate: (t) => ({
      musterSatzDE: `Die ethische Reflexion von »${t}« erweist sich insofern als normativ ertragreich, als sie die immanenten Spannungen zwischen deontologischer Pflichtbindung und teleologischer Gueterabwaegung transparent macht und damit ein tragfaehiges Fundament fuer autonome Urteilskraft stiftet.`,
      operator: "beurteilen",
      scoringKeywords: ["Normativer Ertrag", "Deontologische Pflichtbindung", "Teleologische Gueterabwaegung", "Autonome Urteilskraft", "Spannungsverhaeltnis"],
      explanationZH: `标准哲学 AFB III 判定句式，精确权衡义务论与目的论张力，体现高阶哲学概念掌控力。`,
    }),
    socraticQuestions: (t) => [
      {
        questionDE: `Welche unbewiesene metaphysische oder anthropologische Praemisse liegt dem Konzept »${t}« stillschweigend zugrunde?`,
        questionZH: `»${t}« 的理论大厦建立在哪些未经证明的人性假设或形而上学前提之上？`,
        counterPerspectiveDE: `Wird die Grundannahme ueber den Menschen als autonomes Vernunftwesen verworfen, kollabiert die normative Begruendung.`,
      },
      {
        questionDE: `Laesst sich »${t}« in einer pluralistischen, weltanschaulich heterogenen Gesellschaft universell verbindlich begruenden?`,
        questionZH: `在高度多元化的现代世俗社会中，»${t}« 能否获得超越文化与意识形态的普遍性效力？`,
        counterPerspectiveDE: `Kulturelle Differenzen koennen den universalen Geltungsanspruch partikularer ethischer Dogmen relativieren.`,
      },
    ],
  },

  Deutsch: {
    defaultAnalogyTitle: "Das semantisch-rhetorische Gewebe der Textarchitektur",
    analogyTemplateDE: (t) =>
      `»${t}« wirkt wie ein feinmaschiges Geflecht aus Sprache, Form und Intention: Einzelne lexikalische und syntaktische Faeden verbinden sich zu einem dichten Bedeutungsteppich, der den Leser auf subtile Weise kognitiv und emotional lenkt.`,
    analogyTemplateZH: (t) =>
      `»${t}« 构成了文本深层意义的网状编织结构：辞格、句法与论述脉络相互咬合，共同服务于作者隐蔽而精准的修辞说服意向。`,
    defaultOperator: "analysieren",
    standardTraps: (t) => [
      {
        trapTitleDE: `Inhaltsangabe statt funktionaler Analyse von »${t}«`,
        trapDescriptionDE: `Schueler paraphrasieren lediglich die Handlung oder den Textinhalt, anstatt Machart, Sprachgestus und Leserlenkung offenzulegen.`,
        trapDescriptionZH: `将文本分析沦为低阶的情节复述，没有剖析 »${t}« 的形式美学构造与修辞策略机制。`,
        howToAvoidDE: `Jede inhaltliche Beobachtung zwingend mit der formal-sprachlichen Gestaltung und der Rezeptionswirkung koppeln.`,
      },
      {
        trapTitleDE: `Unreflektierte Zitat-Haeufung ohne Synthese`,
        trapDescriptionDE: `Aneinanderreihung von Belegzitaten ohne eigenstaendige argumentierende Ausdeutung.`,
        trapDescriptionZH: `机械罗列引文，缺乏针对上下文意图的深入解构与论点串联。`,
        howToAvoidDE: `Zitate muessen organisch in den eigenen hypotaktischen Analysesatz eingebunden und semantisch zerlegt werden.`,
      },
    ],
    musterSatzTemplate: (t) => ({
      musterSatzDE: `Die textuelle Inszenierung von »${t}« entfaltet ihre persuasive Dynamik ueber die praezise Verzahnung antithetischer Sprachbilder mit einer zielgerichteten Syntax, wodurch der Autor den Rezipienten sukzessive zu seiner weltanschaulichen Deutungsperspektive hinfuehrt.`,
      operator: "analysieren",
      scoringKeywords: ["Textuelle Inszenierung", "Persuasive Dynamik", "Antithetische Sprachbilder", "Zielgerichtete Syntax", "Deutungsperspektive"],
      explanationZH: `典型的德语文字分析 15 分范文句，紧密扣合表现机制（Inszenierung）、修辞手法与读者接受效应。`,
    }),
    socraticQuestions: (t) => [
      {
        questionDE: `Welche verborgene ideologische Botschaft oder zeitgebundene Norm transportiert »${t}« subkutan unter der Oberflaeche?`,
        questionZH: `在表层叙事之下，»${t}« 潜意识里传达了怎样的时代意识形态或权力秩序偏见？`,
        counterPerspectiveDE: `Literatur spiegelt oft unbewusst die gesellschaftlichen Herrschaftsverhaeltnisse ihrer jeweiligen Epoche wider.`,
      },
      {
        questionDE: `Inwiefern bricht die Textaesthetik von »${t}« bewusst mit traditionellen Gattungskonventionen, um Verstörung zu erzeugen?`,
        questionZH: `»${t}« 的文本美学在多大程度上故意打破传统体裁规范，以给读者制造审美陌生化冲击？`,
        counterPerspectiveDE: `Formale Regelbrueche koennen auch scheitern und zu interpretativer Beliebigkeit fuehren.`,
      },
    ],
  },

  Mathe: {
    defaultAnalogyTitle: "Der praezise Formal-Apparat funktionaler Zusammenhaenge",
    analogyTemplateDE: (t) =>
      `Das mathematische Konzept »${t}« gleicht einem unbestechlichen Praezisionswerkzeug: Aus definierten Axiomen und logischen Operationen wird eine widerspruchsfreie Struktur geformt, die reale Veraenderungen quantitativ und qualitativ exakt beschreibbar macht.`,
    analogyTemplateZH: (t) =>
      `»${t}« 如同严密精密的数理计算仪器：在公理与逻辑推演中建构严谨结构，将变化规律转化为确定性的几何或代数表征。`,
    defaultOperator: "darstellen",
    standardTraps: (t) => [
      {
        trapTitleDE: `Formelrechnen ohne geometrisch-inhaltliches Verstaendnis bei »${t}«`,
        trapDescriptionDE: `Reines Auswendiglernen von Algorithmen ohne Faehigkeit, die Bedeutung im Sachzusammenhang zu deuten.`,
        trapDescriptionZH: `死记硬背计算步骤，无法在实际应用情境或几何坐标系中阐明 »${t}« 的数学本质。`,
        howToAvoidDE: `Jedes Rechenergebnis immer mit Einheiten und fachlicher Interpretation im Modellkontext rueckkoppeln.`,
      },
      {
        trapTitleDE: `Vernachlaessigung von Definitions- und Randbereichen`,
        trapDescriptionDE: `Nichtpruefen von Randextrema, Definitionsluecken oder Unstetigkeitsstellen bei der Anwendung des Verfahrens.`,
        trapDescriptionZH: `做题只管套公式，遗漏定义域边界、奇点或连续性成立的前提假设。`,
        howToAvoidDE: `Vor Beginn der Rechnung immer den Definitionsbereich und die Gueltigkeitsvoraussetzungen formal fixieren.`,
      },
    ],
    musterSatzTemplate: (t) => ({
      musterSatzDE: `Die analytische Modellierung von »${t}« stuetzt sich auf das exakte Wechselspiel zwischen algebraischer Transformation und geometrischer Interpretation, wodurch komplexe funktionale Dynamiken auf elementare Invarianten zurueckgefuehrt werden.`,
      operator: "darstellen",
      scoringKeywords: ["Analytische Modellierung", "Algebraische Transformation", "Geometrische Interpretation", "Funktionale Dynamik", "Invarianten"],
      explanationZH: `体现纯正德语数学建模与结构化阐述功底，连接代数推导与几何意蕴。`,
    }),
    socraticQuestions: (t) => [
      {
        questionDE: `Unter welchen Grenzbedingungen bricht das mathematische Modell von »${t}« in der realen physikalischen Anwendung zusammen?`,
        questionZH: `在何种极端边界条件下，»${t}« 所构建的数学抽象模型在现实物理世界中会失去有效性？`,
        counterPerspectiveDE: `Kein mathematisches Modell erfasst alle realweltlichen Stoergroessen und Nichtlinearitaeten vollstaendig.`,
      },
      {
        questionDE: `Gibt es einen alternativen, eleganteren Beweisweg fuer die Gesetzmaessigkeit von »${t}«?`,
        questionZH: `是否存在另一种更具几何直观或纯代数对称性的路径来证明 »${t}« 的普适有效性？`,
        counterPerspectiveDE: `Oft eroeffnet der Wechsel zwischen geometrischer und algebraischer Perspektive tiefere Einsichten.`,
      },
    ],
  },

  Physik: {
    defaultAnalogyTitle: "Das physikalische Wechselwirkungs- und Erhaltungsgesetz",
    analogyTemplateDE: (t) =>
      `»${t}« repraesentiert einen Grundpfeiler physikalischer Naturgesetze: Kraefte, Felder oder Energieformen wirken nach mathematisch exakten Invarianten, wobei stets fundamentale Erhaltungssaetze die Grenzen des Moeglichen abstecken.`,
    analogyTemplateZH: (t) =>
      `»${t}« 展现了物理世界客观规律的基石：力、场与能量转换遵循数学对称性，守恒定律构成了自然现象运行的不可逾越之界。`,
    defaultOperator: "analysieren",
    standardTraps: (t) => [
      {
        trapTitleDE: `Missachtung von Vektoreigenschaften oder Vorzeichen bei »${t}«`,
        trapDescriptionDE: `Behandlung gerichteter physikalischer Groessen als reine Skalare, was zu fehlerhaften Bilanzierungen fuehrt.`,
        trapDescriptionZH: `将矢量物理量（如力、动量、速度）当作纯标量处理，忽略方向与参考坐标系导致符号错误。`,
        howToAvoidDE: `Vor dem Aufstellen von Bewegungsgleichungen immer ein klares Koordinatensystem mit Bezugsrichtung definieren.`,
      },
      {
        trapTitleDE: `Verwechslung von Ursache (Kraft) und Wirkung (Beschleunigung/Veraenderung)`,
        trapDescriptionDE: `Schueler postulieren haeufig Scheinkraefte in Inertialsystemen oder verwechseln Traegheit mit einer aktiven Kraft.`,
        trapDescriptionZH: `在惯性系中虚构并不存在的动力，把物体的惯性保持状态误认为有力在持续驱动。`,
        howToAvoidDE: `Newtonsche Axiome sauber anwenden: Kraefte sind Ursachen von Impulsaenderungen, nicht von Geschwindigkeit an sich.`,
      },
    ],
    musterSatzTemplate: (t) => ({
      musterSatzDE: `Die physikalische Beschreibung von »${t}« beruht auf der konsequenten Anwendung fundamentaler Erhaltungssaetze auf das definierte System, wobei die Wechselwirkungsmechanismen ueber quantitative Kraft- und Energiebilanzen vollstaendig determiniert sind.`,
      operator: "analysieren",
      scoringKeywords: ["Erhaltungssaetze", "Definiertes System", "Wechselwirkungsmechanismen", "Kraftbilanzen", "Energiebilanzen"],
      explanationZH: `标准物理分析大题得分范句，从系统界定、守恒定律到动力学平衡一气呵成。`,
    }),
    socraticQuestions: (t) => [
      {
        questionDE: `Wie veraendert sich das Verhalten von »${t}«, wenn man von mikroskopischen Quanteneffekten zu makroskopischen Systemen uebergeht?`,
        questionZH: `当我们从宏观尺度跨越到微观量子效应时，»${t}« 的经典确定性行为会发生何种戏剧性颠覆？`,
        counterPerspectiveDE: `Auf der Quantenebene werden deterministische Trajektorien durch Wahrscheinlichkeitsamplituden ersetzt.`,
      },
      {
        questionDE: `Welche Rolle spielt die Irreversibilitaet der Zeit (Entropie) bei Prozessen rund um »${t}«?`,
        questionZH: `时间箭头的不可逆性与热力学熵增在 »${t}« 相关过程中扮演了怎样决定性的制约角色？`,
        counterPerspectiveDE: `Mikroskopische Bewegungsgleichungen sind zeitumkehrinvariant, makroskopische Prozesse hingegen dissipativ.`,
      },
    ],
  },
};

// ---------------------------------------------------------------------------
// Main Distillation Entry Point
// ---------------------------------------------------------------------------

/**
 * Normalizes title for robust fuzzy/stem matching.
 */
function normalizeQuery(str: string): string {
  return str
    .toLowerCase()
    .replace(/[äae]/g, "ae")
    .replace(/[öoe]/g, "oe")
    .replace(/[üue]/g, "ue")
    .replace(/ß/g, "ss")
    .replace(/[^a-z0-9\s]/g, " ")
    .trim();
}

/**
 * Cleans chapter numbering prefixes, e.g. "1.2 ", "Kapitel 3: ".
 */
function cleanTopicTitle(rawTitle: string): string {
  return rawTitle
    .replace(/^(kapitel\s*\d+[\s:.-]*|thema\s*\d+[\s:.-]*|\d+(\.\d+)*[\s:.-]*)/i, "")
    .trim();
}

/**
 * Distills any topic or chapter text into a deep first-principles structured concept.
 * Matches domain knowledge banks when keywords hit, otherwise executes heuristic synthesis.
 *
 * @param title Topic title or chapter heading
 * @param fach Subject code (e.g. "SoWi", "Philosophie", "Deutsch", "Mathe", "Physik", etc.)
 * @param rawText Optional chapter content or outline snippet
 */
export function distillConcept(title: string, fach: string, rawText?: string): DistilledConcept {
  const cleanedTitle = cleanTopicTitle(title || "Allgemeines Fachkonzept");
  const normalizedSearch = normalizeQuery(`${cleanedTitle} ${rawText || ""}`);
  const resolvedFach = fach?.trim() || "SoWi";

  // 1. Scan pre-calibrated domain knowledge bank
  for (const entry of DOMAIN_KNOWLEDGE_ENTRIES) {
    // Check keyword hits
    const hit = entry.matchKeywords.some((kw) => {
      const normKw = normalizeQuery(kw);
      return normalizedSearch.includes(normKw);
    });

    if (hit) {
      // Return a refined clone adapting to requested subject if reasonable
      return {
        ...entry.data,
        topicTitle: cleanedTitle || entry.data.topicTitle,
        fach: resolvedFach,
      };
    }
  }

  // 2. Execute smart heuristic synthesis using subject archetype
  const archetype =
    SUBJECT_ARCHETYPES[resolvedFach] ||
    SUBJECT_ARCHETYPES["SoWi"] ||
    SUBJECT_ARCHETYPES["Philosophie"];

  const topicName = cleanedTitle || "Grundbegriff";

  // Construct KLP Termini from title and content
  const termini: DistilledConcept["klpTermini"] = [
    {
      termDE: topicName,
      definitionDE: `Zentraler Fachbegriff im Kernlehrplan ${resolvedFach}: Bezeichnet den systematischen Wirkungsmechanismus und die theoretische Fundierung von »${topicName}«.`,
      termZH: `${resolvedFach} 考纲核心概念`,
      definitionZH: `德国北威州考纲核心术语：表征 »${topicName}« 的系统性运作机理、评判维度与因果互动网络。`,
    },
    {
      termDE: `Systemische Kausalitaet (${topicName})`,
      definitionDE: `Das Gefuege aus Ursache-Wirkungs-Relationen, Wechselwirkungen und Randbedingungen im Zusammenhang mit ${topicName}.`,
      termZH: `因果互动机制`,
      definitionZH: `与 »${topicName}« 紧密关联的前置条件、传导路径与多重变量互动规律。`,
    },
    {
      termDE: `Kriterienorientierte Beurteilung`,
      definitionDE: `KLP-standardisierte Beurteilung von »${topicName}« anhand von Effizienz, Legitimität, Adäquatheit und ethisch-sozialen Folgekosten.`,
      termZH: `多维标准评析框架`,
      definitionZH: `基于效率性、合法性、适切性与社会伦理成本等考纲核心准则对该课题进行的规范性审视。`,
    },
  ];

  const traps = archetype.standardTraps(topicName);
  const musterSatz = archetype.musterSatzTemplate(topicName);
  const probes = archetype.socraticQuestions(topicName);

  return {
    topicTitle: topicName,
    fach: resolvedFach,
    mentalModelAnalogy: {
      analogyTitle: archetype.defaultAnalogyTitle,
      explanationDE: archetype.analogyTemplateDE(topicName),
      explanationZH: archetype.analogyTemplateZH(topicName),
    },
    klpTermini: termini,
    fehlerquellen: traps,
    klausurSatz15NP: musterSatz,
    socraticProbes: probes,
  };
}

/**
 * Lists all pre-calibrated canonical topic IDs in the knowledge bank.
 */
export function listSupportedPreloadedTopics(): string[] {
  return DOMAIN_KNOWLEDGE_ENTRIES.map((e) => e.canonicalTitle);
}
