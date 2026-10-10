// Concept Distillation Engine (First-Principles Distiller for GeWi & MINT)
// Deterministic first-principles knowledge distiller for topics and chapter texts
// Strictly complies with Tufte clean rules: NO EMOJIS, ASCII arrows only (->).

export interface StoryHookData {
  roleDE: string;
  roleZH: string;
  scenarioDE: string;
  scenarioZH: string;
}

export interface FeynmanExplanationData {
  summaryZH: string;
  summaryDE: string;
}

export interface TwoBrillenPerspective {
  titleDE: string;
  titleZH: string;
  corePointDE: string;
  corePointZH: string;
}

export interface TwoBrillenData {
  perspectiveA: TwoBrillenPerspective;
  perspectiveB: TwoBrillenPerspective;
  synthesisDE: string;
  synthesisZH: string;
}

export interface FunFactData {
  titleDE: string;
  titleZH: string;
  factDE: string;
  factZH: string;
}

export interface StudyMateProbesData {
  simplerHintDE: string;
  simplerHintZH: string;
  deeperChallengeDE: string;
  deeperChallengeZH: string;
  quizQuestionDE: string;
  quizQuestionZH: string;
  quizAnswerDE: string;
  quizAnswerZH: string;
}

export interface AttachedNoteData {
  title: string;
  fach: string;
  feynmanSummaryZH: string;
  methodSnippetZH: string;
  klausurSatzbausteinDE: string;
  operatoren: string[];
  tags: string[];
}

export interface IntuitionDilemmaData {
  scenarioDE: string;
  scenarioZH: string;
  questionDE: string;
  questionZH: string;
  choiceA: {
    id: "A";
    textDE: string;
    textZH: string;
    reactionDE: string;
    reactionZH: string;
  };
  choiceB: {
    id: "B";
    textDE: string;
    textZH: string;
    reactionDE: string;
    reactionZH: string;
  };
  mechanismTakeawayDE: string;
  mechanismTakeawayZH: string;
  klpCoreLogicDE: string;
  klpCoreLogicZH: string;
}

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
  // Study-Mate 趣味、易懂与搭载笔记字段
  intuitionDilemma?: IntuitionDilemmaData;
  storyHook?: StoryHookData;
  feynmanExplanation?: FeynmanExplanationData;
  twoBrillen?: TwoBrillenData;
  funFact?: FunFactData;
  studyMateProbes?: StudyMateProbesData;
  attachedNote?: AttachedNoteData;
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
  // 0. Modell des vollkommenen Marktes / Angebot & Nachfrage / Preismechanismus (SoWi)
  {
    id: "vollkommener-markt-angebot-nachfrage",
    canonicalTitle: "Modell des vollkommenen Marktes (Angebot & Nachfrage)",
    fach: "SoWi",
    matchKeywords: [
      "markt",
      "vollkommener markt",
      "vollkommenen marktes",
      "angebot",
      "nachfrage",
      "angebot & nachfrage",
      "angebot und nachfrage",
      "preismechanismus",
      "gleichgewichtspreis",
      "marktgleichgewicht",
      "preisfunktionen",
      "allokation",
      "allokationseffizienz",
      "marktraeumung",
      "konsumentenrente",
      "produzentenrente",
    ],
    data: {
      topicTitle: "Modell des vollkommenen Marktes (Angebot & Nachfrage)",
      fach: "SoWi",
      intuitionDilemma: {
        scenarioDE:
          "Ein Jahrhundert-Schneesturm legt die städtische Energieversorgung lahm. Im einzigen Baumarkt gibt es nur noch 100 Gas-Heizstrahler bei 5.000 frierenden Haushalten.",
        scenarioZH:
          "暴风雪导致全城取暖煤气供应中断，市面上仅剩最后一批（100 台）取暖器，却有 5000 户居民急需取暖。",
        questionDE:
          "Wenn man die Verteilung vollständig dem 'freien Markt' überlässt, was passiert?",
        questionZH:
          "如果完全交给‘自由市场（Markt）’，会发生什么？",
        choiceA: {
          id: "A",
          textDE:
            "A) Händler verlangen 2.000 €: Nur wer zahlen kann, kauft. Das Gut ist sofort geräumt, aber Arme frieren.",
          textZH:
            "A) 商家疯狂涨价至 2000 欧：谁出钱多谁买走。穷人冻死，但商品绝不滞销（市场出清）。",
          reactionDE:
            "Das ist der unbarmherzige, effiziente Kern des Marktes! Der Preis fungiert als 'Knappheitssignal' (Signalfunktion) und lenkt Güter dorthin, wo die Zahlungsbereitschaft am höchsten ist (Allokationsfunktion). Das Gut ist geräumt (Räumungsfunktion), ignoriert aber Verteilungsgerechtigkeit.",
          reactionZH:
            "这就是完全竞争市场冷酷而高效的本质！价格不是用来做慈善的，而是作为‘稀缺信号（Knappheitssignal）’指示紧缺，并把商品配置给支付意愿最高的人（Allokationsfunktion）。商品流向出价最高者实现市场出清（Räumungsfunktion），但完全不考虑社会公正。",
        },
        choiceB: {
          id: "B",
          textDE:
            "B) Staatlicher Preisdeckel auf 50 €: Die ersten 100 in der Schlange kaufen, die restlichen 4.900 gehen leer aus.",
          textZH:
            "B) 政府限价 50 欧：人人排长队，前 100 个人买走，剩下的人有钱也买不到，滋生黑市与黄牛。",
          reactionDE:
            "Staatliche Höchstpreise verhindern Wucher, erzeugen aber einen massiven Nachfrageüberhang! Weil der Preis nicht steigen darf, verliert er seine Signalfunktion. Es entstehen endlose Warteschlangen, Mangel und Schwarzmärkte.",
          reactionZH:
            "政府限价虽然维持了平价，却直接引发严重的‘超额需求（Nachfrageüberhang）’！因为价格被锁死，丧失了配给与出清功能，导致排长队、商品短缺与黄牛黑市蔓延。",
        },
        mechanismTakeawayDE:
          "Der Preismechanismus koordiniert Angebot und Nachfrage über den Gleichgewichtspreis. Er garantiert ökonomische Effizienz (Markträumung), ignoriert aber Verteilungsgerechtigkeit – daher greift die Soziale Marktwirtschaft ordnungspolitisch ein.",
        mechanismTakeawayZH:
          "价格机制通过供需曲线相交的均衡价格自发协调供求。它能实现资源配置的高效率（市场出清），但完全不顾社会公平——这正是德国必须通过‘社会市场经济’实行国家秩序政策兜底的原因。",
        klpCoreLogicDE:
          "Preisfunktionen: Signal-, Allokations-, Räumungs- und Selektionsfunktion; Marktversagen bei Verteilungsungerechtigkeit.",
        klpCoreLogicZH:
          "价格四大功能：信号功能（指示稀缺）、配置功能（引导资源）、出清功能（出清供求）、筛选功能；完全市场在分配正义上存在局限。",
      },
      mentalModelAnalogy: {
        analogyTitle: "Der Schneesturm-Stresstest: Der Preis als Knappheitsthermometer",
        explanationDE:
          "Der Marktpreis ist kein Wohltätigkeitsgeschenk, sondern ein Thermometer für Knappheit: Wenn 5.000 Menschen 100 Geräte wollen, steigt der Preis exakt so weit, bis 4.900 Personen freiwillig verzichten.",
        explanationZH:
          "市场价格不是慈善救济金，而是指示稀缺程度的灵敏温度计：当 5000 个人抢 100 台取暖器时，价格会持续上涨，直到刚好有 4900 个人因觉得太贵而主动放弃。",
      },
      klpTermini: [
        {
          termDE: "Preismechanismus & Gleichgewichtspreis",
          definitionDE:
            "Der Mechanismus, durch den sich Angebot und Nachfrage über flexible Preise angleichen. Der Gleichgewichtspreis räumt den Markt ohne Überschuss oder Mangel.",
          termZH: "价格机制与均衡价格",
          definitionZH: "供给与需求通过弹性价格自发调节的机制。均衡价格使市场完全出清，既无滞销亦无短缺。",
        },
        {
          termDE: "Vier Funktionen des Preises",
          definitionDE:
            "Signalfunktion (Knappheit), Allokationsfunktion (Ressourcenlenkung), Räumungsfunktion (Marktausgleich) und Selektionsfunktion (Effizienzdruck).",
          termZH: "价格四大职能",
          definitionZH: "信号职能（指示稀缺）、配置职能（引导资源）、出清职能（平衡供求）、筛选淘汰职能（激励效率）。",
        },
        {
          termDE: "Praemissen des vollkommenen Marktes",
          definitionDE:
            "Modellannahmen: Homogene Güter, vollkommene Markttransparenz, keine Präferenzen, unendlich schnelle Reaktionsgeschwindigkeit.",
          termZH: "完全市场四大假定前提",
          definitionZH: "理想模型前提：商品同质、信息完全透明、无偏好差异、无限快速的市场反应速度。",
        },
      ],
      fehlerquellen: [
        {
          trapTitleDE: "Gleichsetzung von Modell und Marktrealitaet",
          trapDescriptionDE:
            "Schüler nehmen irrtümlich an, reale Supermärkte oder der Wohnungsmarkt entsprächen dem Modell des vollkommenen Marktes.",
          trapDescriptionZH:
            "把完全竞争市场这一理论分析模型当成了真实日常生活中的市场，忽视了信息不对称、品牌偏好与垄断壁垒。",
          howToAvoidDE:
            "In Klausuren stets betonen: Der vollkommene Markt ist ein reines Analysemodell; reale Märkte sind unvollkommen.",
        },
        {
          trapTitleDE: "Ausblenden der Gerechtigkeitsdimension in AFB III",
          trapDescriptionDE:
            "Ausschließliche Bewertung nach Allokationseffizienz ohne Reflexion sozialer Härten und Verteilungsungleichheit.",
          trapDescriptionZH:
            "在会考评价题（AFB III）中只讲效率最优，却完全忽略考纲要求的社会公正、人道底线与国家干预必要性。",
          howToAvoidDE:
            "Stets das Spannungsfeld zwischen ökonomischer Effizienz und sozialstaatlicher Umverteilung aufspannen.",
        },
      ],
      klausurSatz15NP: {
        musterSatzDE:
          "Während der Preismechanismus im theoretischen Modell des vollkommenen Marktes über die Allokations- und Räumungsfunktion zu einem pareto-effizienten Marktgleichgewicht führt, erfordert das Sozialstaatsgebot der Bundesrepublik bei existentiellen Gütern ordnungspolitische Interventionen zur Vermeidung distributiver Marktversagensfolgen.",
        operator: "beurteilen",
        scoringKeywords: [
          "Preismechanismus",
          "Allokationsfunktion",
          "Raeumungsfunktion",
          "Marktgleichgewicht",
          "Sozialstaatsgebot",
          "Marktversagen",
        ],
        explanationZH:
          "满分 15 NP 评价大题金句：既精确剖析完全市场价格机制在资源配置上的帕累托效率，又立足德国基本法社会国家原则论证秩序政策兜底的不可或缺性。",
      },
      socraticProbes: [
        {
          questionDE:
            "Darf der Staat Höchstpreise für Mieten festlegen, obwohl dies das Angebot an Neubauwohnungen verringert?",
          questionZH:
            "国家是否应当对房租设定最高限价，哪怕限价会在长期内打击新房建设意愿并加剧房源短缺？",
          counterPerspectiveDE:
            "Mietpreisbremsen schützen einkommensschwache Mieter kurzfristig, verringern aber das langfristige Wohnungsangebot.",
        },
        {
          questionDE:
            "Sollte der Staat lebenswichtige Notfallgüter vollständig dem freien Markt überlassen?",
          questionZH:
            "国家是否应将救命物资完全交给自由市场竞价，还是必须实行价格管制与救济配给？",
          counterPerspectiveDE:
            "Freie Preise verhindern Verschwendung, verletzen aber bei existenziellen Notlagen das Grundrecht auf körperliche Unversehrtheit.",
        },
      ],
    },
  },

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
    defaultAnalogyTitle: "Knappheit und Alltagsentscheidung: Wer bekommt das rare Gut?",
    analogyTemplateDE: (t) =>
      `Das Konzept »${t}« beschreibt im Kern ein reales Verteilungsdilemma: Wenn begehrte Ressourcen knapp sind, entscheiden institutionelle Regeln darüber, wer den Zuschlag erhält, wer leer ausgeht und wer die Kosten trägt.`,
    analogyTemplateZH: (t) =>
      `»${t}« 解决的其实是最现实的生活博弈：当优质资源必然稀缺时，制度规则决定了谁能拿到名额、谁会排队落空，以及由谁来承担隐性代价。`,
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
    defaultAnalogyTitle: "Der ethische Notfall-Pruefstein im Alltag",
    analogyTemplateDE: (t) =>
      `Das ethische Problem »${t}« ist wie ein Notfall-Test fuer moralische Prinzipien: Es hinterfragt selbstverstaendliche Gewohnheiten und zwingt zur Klaerung, ob Grundwerte auch im extremen Konfliktfall Bestand haben.`,
    analogyTemplateZH: (t) =>
      `»${t}« 就像是一场道德极限测试：剥离日常习惯的温情面纱，逼问你在重大利益与原则冲突的关键时刻，究竟依照何种正当性做出决断。`,
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
    defaultAnalogyTitle: "Die literarische Regieanweisung im Text",
    analogyTemplateDE: (t) =>
      `»${t}« funktioniert wie eine unsichtbare Regieanweisung des Autors: Jedes sprachliche Mittel und jeder Satzbau lenkt die Wahrnehmung des Lesers gezielt auf den zugrundeliegenden Wertkonflikt.`,
    analogyTemplateZH: (t) =>
      `»${t}« 就像作者在文本中埋下的隐形舞台调度：每一个修辞选择与句式编排，都在不动声色地引导读者看清背后的核心价值冲突。`,
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
      return enrichConceptWithStudyMateAndNotes(
        {
          ...entry.data,
          topicTitle: cleanedTitle || entry.data.topicTitle,
          fach: resolvedFach,
        },
        resolvedFach
      );
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

  return enrichConceptWithStudyMateAndNotes(
    {
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
    },
    resolvedFach
  );
}

/**
 * 为任意未在预设库中的主题生成真实的直觉博弈两难困境 (Schritt 1: Intuitions-Check)
 */
function createFallbackIntuitionDilemma(
  _topicTitle: string,
  fach: string
): IntuitionDilemmaData {
  const normFach = fach.trim().toLowerCase();
  if (normFach.includes("sowi")) {
    return {
      scenarioDE: `Unerwarteter Mangel bei einem lebenswichtigen Gut (z.B. Energie oder Wohnraum): Die Nachfrage übersteigt das Angebot drastisch. Wie soll die Zuteilung geregelt werden?`,
      scenarioZH: `突发危机导致关键生活资源（如冬季取暖能源或紧急房源）发生严重短缺，需求量远远超出存量。社会究竟该如何分配？`,
      questionDE: `Welches Prinzip wählst du zur Bewältigung der Knappheit?`,
      questionZH: `面对这一现实稀缺困境，你会选择哪种分配机制？`,
      choiceA: {
        id: "A",
        textDE: `A) Freier Preiswettbewerb: Wer am meisten zahlt, kauft. Das Gut wird effizient geräumt, aber Einkommensschwache frieren.`,
        textZH: `A) 自由价格出清：出价高者得。价格随行就市，商品绝不滞销，但低收入者直接面临被淘汰与生存困境。`,
        reactionDE: `Du wählst die Allokationseffizienz des Marktes: Der Preis fungiert als Knappheitssignal und führt zur Markträumung. Allerdings ignoriert dieser Mechanismus soziale Gerechtigkeit.`,
        reactionZH: `你选择了市场配置效率：价格充当灵敏的稀缺信号（Signalfunktion），迅速实现市场出清（Räumungsfunktion）。但完全市场机制完全不具备社会公正兜底。`,
      },
      choiceB: {
        id: "B",
        textDE: `B) Staatlicher Preisdeckel: Fester niedriger Preis für alle. Jeder kann zahlen, aber es entstehen lange Warteschlangen und Schwarzmärkte.`,
        textZH: `B) 政府限价配给：强制将价格压至平价。人人买得起，但商家缺乏供应动力导致排长队、商品断供与倒卖黑市。`,
        reactionDE: `Du wählst den Schutz des Sozialstaates: Niedrige Preise schützen Bürger, zerstören aber das Preissignal. Es entstehen Nachfrageüberhänge und Mangelwirtschaft.`,
        reactionZH: `你选择了社会国家兜底：优先保护弱势群体免遭剥夺。但锁死价格抹杀了稀缺信号，直接引发严重的超额需求、排长队与资源错配。`,
      },
      mechanismTakeawayDE: `Das Spannungsfeld zwischen ökonomischer Effizienz (Preismechanismus) und Verteilungsgerechtigkeit (Sozialstaat) ist das Kernproblem der Wirtschaftspolitik.`,
      mechanismTakeawayZH: `价格机制保证了资源配置的高效率，但无法兼顾社会正义——这正是德国必须通过‘社会市场经济’实行国家秩序政策兜底的根本逻辑。`,
      klpCoreLogicDE: `Preisfunktionen (Signal, Allokation, Räumung); Marktversagen und Sozialstaatsgebot nach KLP NRW.`,
      klpCoreLogicZH: `价格四大职能（信号、配置、出清、筛选）；效率最优与社会公平的辩证张力。`,
    };
  }

  if (normFach.includes("philo")) {
    return {
      scenarioDE: `Extremes ethisches Dilemma: Eine unausweichliche Entscheidung zwingt zur Abwägung zwischen dem messbaren Gesamtnutzen vieler Menschen und den unantastbaren Rechten eines Einzelnen.`,
      scenarioZH: `极端伦理两难抉择：必须在绝大多数人的集体福祉与某个具体个体的不可剥夺尊严之间做出决断。`,
      questionDE: `Nach welchem ethischen Grundsatz entscheidest du?`,
      questionZH: `面对这一经典困局，你的第一决断原则是什么？`,
      choiceA: {
        id: "A",
        textDE: `A) Utilitaristisch: Das größte Glück der größten Zahl maximieren, auch wenn ein Einzelner geopfert werden muss.`,
        textZH: `A) 功利主义方案：追求最大多数人的最大幸福，哪怕个别人不得不承受代价。`,
        reactionDE: `Du folgst dem Nutzen- und Konsequenzenprinzip: Nur das Gesamtergebnis zählt. Schwachstelle: Individuelle Grundrechte können instrumentalisiert werden.`,
        reactionZH: `你采纳了功利主义后果论：以最终总体效用最大化为标准。但这容易突破个体的尊严底线，将人降格为实现多数人利益的纯粹手段。`,
      },
      choiceB: {
        id: "B",
        textDE: `B) Deontologisch: Die Menschenwürde und moralische Pflichten gelten absolut, egal wie hoch die Folgekosten sind.`,
        textZH: `B) 康德义务论方案：人的尊严绝对不可侵犯（定言命令），坚决不把任何人当作工具。`,
        reactionDE: `Du folgst Kants Kategorischem Imperativ: Menschen sind niemals reines Mittel zum Zweck. Preis: Im Extremfall müssen schwere Konsequenzen ertragen werden.`,
        reactionZH: `你坚守了康德义务论：人是目的而非手段。但恪守绝对原则的代价是，在极端情况下可能不得不承受集体更大实质损害的现实后果。`,
      },
      mechanismTakeawayDE: `Philosophische Urteilskraft verlangt die kriterienorientierte Abwägung zwischen teleologischer Folgenverantwortung und deontologischer Prinzipientreue.`,
      mechanismTakeawayZH: `哲学考场 AFB III 的核心能力在于：严格辨析目的论后果权衡与义务论原则坚守的逻辑边界，做出有据可依的价值评价。`,
      klpCoreLogicDE: `Utilitarismus vs. Deontologie; Kategorischer Imperativ vs. Hedonistisches Kalkül; GG Art. 1 I.`,
      klpCoreLogicZH: `功利主义效用核算 vs 康德定言命令；宪法第一条人的尊严不可侵犯。`,
    };
  }

  if (normFach.includes("deutsch")) {
    return {
      scenarioDE: `Konflikt in einem dramatischen Werk: Eine Figur steht zwischen gesellschaftlicher Pflicht zur Konformität und dem unbändigen Drang nach individueller Selbstverwirklichung.`,
      scenarioZH: `文学戏剧的核心冲突：主人公面临两难撕裂——是顺应既定的社会规范与礼教义务，还是追随内心炽热的个性解放与自由渴望？`,
      questionDE: `Welche Grundhaltung treibt den dramatischen Konflikt voran?`,
      questionZH: `哪一种内在动因构成了推动戏剧矛盾激化的主轴？`,
      choiceA: {
        id: "A",
        textDE: `A) Aufklärerische Vernunft: Beherrschung der Triebe zur Wahrung von Ordnung, Pflicht und sittlicher Gemeinschaft.`,
        textZH: `A) 启蒙理性与责任：克制狂热冲动，维护秩序、理性与社会道德规范。`,
        reactionDE: `Du betonst den Vernunftdiskurs der Aufklärung: Ordnung stabilisiert die Gemeinschaft, unterdrückt aber individuelle Vitalität.`,
        reactionZH: `你突出了启蒙时期的理智与社会秩序：虽然保障了伦理稳定，但往往压抑了鲜活的个体生命力，产生深刻的内在异化。`,
      },
      choiceB: {
        id: "B",
        textDE: `B) Sturm-und-Drang-Rebellion: Radikales Ausleben der Gefühle und Widerstand des Genies gegen jede starre Konvention.`,
        textZH: `B) 狂飙突进反叛：打破陈腐世俗规训，追随直觉、激情与天才的绝对自由。`,
        reactionDE: `Du fokussierst das Genieideal des Sturm und Drang: Befreiung des Subjekts, die jedoch oft in existenzieller Isolation und Tragik endet.`,
        reactionZH: `你抓住了狂飙突进时期的天才反叛冲动：情感与自我张扬极具力量，但脱离现实束缚的狂热往往不可避免地走向毁灭与悲剧命运。`,
      },
      mechanismTakeawayDE: `Literarische Textanalysen entschlüsseln, wie Figuren und Sprachgestus epochentypische Leitkonflikte performativ austragen.`,
      mechanismTakeawayZH: `文学文本分析的精髓在于：透过语言形式与人物对话，透视不同历史时期的深层思想碰撞与时代价值对抗。`,
      klpCoreLogicDE: `Epochenspezifische Wertediskurse (Aufklärung vs. Sturm und Drang / Klassik); Textimmanente Analyse.`,
      klpCoreLogicZH: `启蒙理性 vs 狂飙突进思潮转变；理智与激情的辩证张力。`,
    };
  }

  // Mathe / Physik / MINT
  return {
    scenarioDE: `Ein dynamischer Prozess beschleunigt ungleichmäßig. Wie erfassen wir die Veränderung in einem ganz bestimmten, infinitesimalen Augenblick?`,
    scenarioZH: `动态变化过程是不均匀的。如何在某个具体的瞬时点上，精准求出它的即时变化趋势与变化率？`,
    questionDE: `Welcher mathematische Ansatz führt zur exakten Lösung?`,
    questionZH: `哪种数学思维构成了攻克这一问题的关键钥匙？`,
    choiceA: {
      id: "A",
      textDE: `A) Sekante über ein festes Zeitfenster: Den durchschnittlichen Differenzenquotienten berechnen.`,
      textZH: `A) 割线与有限差商：选取一段固定时间区间计算平均变化率（平均速度）。`,
      reactionDE: `Das ist die mittlere Änderungsrate: Einfach zu ermitteln, aber blind für dramatische Steigungen im konkreten Augenblick.`,
      reactionZH: `这是初等的平均变化率（割线斜率）：计算简便，但完全无法捕捉特定微小瞬间发生的剧烈波动与加速度。`,
    },
    choiceB: {
      id: "B",
      textDE: `B) Grenzwertprozess (Limes h -> 0): Das Zeitfenster gegen Null schrumpfen lassen und die Tangentensteigung ermitteln.`,
      textZH: `B) 极限逼近（h -> 0）：让时间区间无限缩小，求解切线斜率与瞬时导数。`,
      reactionDE: `Das ist das Fundament der Differentialrechnung: Der Limes des Differenzenquotienten liefert die exakte lokale Änderungsrate f'(x).`,
      reactionZH: `这是微积分的核心基石：割线极限逼近切线，差商在极限状态下蜕变为瞬时导数 f'(x)，洞察瞬间演化规律。`,
    },
    mechanismTakeawayDE: `Der Übergang vom Differenzenquotienten (Sekante) zum Differentialquotienten (Tangente / Limes) ist das Basiskonzept der Analysis.`,
    mechanismTakeawayZH: `从宏观的平均变化率跨越到极限状态下的瞬时导数，是整个高中微积分与现代分析学的核心思想。`,
    klpCoreLogicDE: `Lokale vs. mittlere Änderungsrate; Grenzwertbegriff (Limes); Tangentensteigung f'(x).`,
    klpCoreLogicZH: `差商 vs 微商（导数）；极限思想；切线斜率与瞬时变化率。`,
  };
}

/**
 * 赋予任意学科概念生动有趣的 Study-Mate 故事化剧情、费曼人话白话、两副眼镜辩证双轨、趣味历史轶事与搭载考纲笔记
 */
export function enrichConceptWithStudyMateAndNotes(
  concept: DistilledConcept,
  fach: string
): DistilledConcept {
  const normFach = fach.trim() || "SoWi";
  const title = concept.topicTitle;

  // 1. 直觉站队两难困境 (Intuitions-Check Dilemma)
  const intuitionDilemma: IntuitionDilemmaData =
    concept.intuitionDilemma || createFallbackIntuitionDilemma(title, normFach);

  // 2. 剧情角色与战役情景 (Story Hook & Drama)
  let storyHook: StoryHookData;
  if (normFach.toLowerCase().includes("sowi")) {
    storyHook = {
      roleDE: "Wirtschaftsberater im Krisenrat",
      roleZH: "市长直属经济改革规划委员",
      scenarioDE: `Krise im Stadtrat: Vor der entscheidenden Freitagsabstimmung streiten Parteien und Interessengruppen ueber »${title}«. Finde die Balance zwischen Wettbewerb und sozialem Schutz!`,
      scenarioZH: `虚拟城邦告急：市议会周五就 »${title}« 展开激辩，利益各方僵持不下。需要你厘清底层因果与制度传导机理，提出兼顾市场效率与社会兜底的破局方案！`,
    };
  } else if (normFach.toLowerCase().includes("philo")) {
    storyHook = {
      roleDE: "Chef-Justiziar im Ethischen Tribunal",
      roleZH: "首席道德裁决官与思辨法官",
      scenarioDE: `Ein moralisches Dilemma erschuettert das Gericht: Nutzenkalkuel prallt unversoehnlich auf Pflichtenethik rund um »${title}«. Faelle ein unanfechtbares Sach- und Werturteil!`,
      scenarioZH: `伦理法庭上的激辩：当功利主义的快乐算盘遇上绝对尊严防线，围绕 »${title}« 的两难抉择亟待你以严密的第一性原理给出事实与价值评价！`,
    };
  } else if (normFach.toLowerCase().includes("deutsch")) {
    storyHook = {
      roleDE: "Dramaturgie-Analyst am Hoftheater",
      roleZH: "魏玛戏剧解剖顾问与文学侦探",
      scenarioDE: `Tragoedien-Premiere: Goethes Faust und Mephisto tragen den Widerstreit von Vernunft und Trieb aus. Seziere die rhetorische Dynamik von »${title}«!`,
      scenarioZH: `浮士德走出书斋，悲剧与赌约序幕拉开：理智与深渊在 »${title}« 处碰撞。需要你化身文学侦探，解剖台词背后的狂飙突进精神与心智暗涌！`,
    };
  } else if (normFach.toLowerCase().includes("mathe")) {
    storyHook = {
      roleDE: "Flugbahn- und Tangenten-Ingenieur",
      roleZH: "航天轨道与变率计算工程师",
      scenarioDE: `Raketen-Telemetry meldet Kursabweichung: Durchschnittliche Differenzenquotienten genuegen nicht mehr. Bestimme die exakte lokale Aenderungsrate von »${title}«!`,
      scenarioZH: `航天轨道遥测告急：平均变化率割线已无法应对瞬时加速度漂移！必须利用导数切线与极限工具求出 »${title}« 的精确瞬时变化率与极值！`,
    };
  } else {
    storyHook = {
      roleDE: "KLP-Chefanalyst der Fachkommission",
      roleZH: "考纲学科核心研习领航员",
      scenarioDE: `Forschungsauftrag: Entschluessle die Gesetzmaessigkeiten und Kausalstrukturen von »${title}« fuer die anstehende Klausurbewertung!`,
      scenarioZH: `学术探究使命：深入解剖 »${title}« 的底层运行规律与因果网络，锁定北威州考场 15 NP 踩分关键！`,
    };
  }

  // 3. 费曼大白话 (Feynman-Prinzip - 拒绝套话，直击行为与规则本质)
  const feynmanSummaryZH = `【费曼核心】»${title}« 的本质规则：厘清谁来做决策、谁承担后果，以及规则如何影响普通人的选择。`;
  const feynmanSummaryDE = `Kernaussage zu »${title}«: Wer trifft die Entscheidung, wer trägt die Konsequenzen, und wie steuern die Spielregeln das Verhalten?`;

  // 4. 两副眼镜 / 辩证双轨对抗 (Zwei Brillen / Pro vs Contra)
  let twoBrillen: TwoBrillenData;
  if (normFach.toLowerCase().includes("sowi")) {
    twoBrillen = {
      perspectiveA: {
        titleDE: "Markt-Brille (Effizienz & Preissignal)",
        titleZH: "眼镜 A：市场派眼镜（效率与价格信号）",
        corePointDE: "Vertrauen auf Wettbewerb und Preismechanismus. Preissignale lenken knappe Ressourcen zum hoechsten Nutzen.",
        corePointZH: "信任竞争与价格机制。价格信号指示稀缺，激励创新与资源最优配置，国家当裁判不当球员。",
      },
      perspectiveB: {
        titleDE: "Sozial-Brille (Schutz & Umverteilung)",
        titleZH: "眼镜 B：社会派眼镜（兜底与公正再分配）",
        corePointDE: "Sozialprinzip und Tarifautonomie. Der Staat muss Maerkte einhegen und Existenzrisiken sozial absichern.",
        corePointZH: "坚持社会原则与劳资自治。防范马太效应与市场失灵，通过社保与二次分配织就生存安全网。",
      },
      synthesisDE: "Synthese nach KLP NRW: Soziale Marktwirtschaft verbindet Markt-Effizienz mit sozialem Ausgleich.",
      synthesisZH: "北威州考纲综合评析：市场管效率，社会管兜底；自由是基石，干预须合宪且过比例原则审查。",
    };
  } else if (normFach.toLowerCase().includes("philo")) {
    twoBrillen = {
      perspectiveA: {
        titleDE: "Utilitarismus (Nutzenkalkuel)",
        titleZH: "眼镜 A：功利主义（快乐算盘与最大多数幸福）",
        corePointDE: "Handlungen werden ausschliesslich nach ihren quantifizierbaren Folgen (Konsequenzenprinzip) bewertet.",
        corePointZH: "只看行为的最终后果（目的论）：追求『最大多数人的最大幸福』，注重总体效用最大化。",
      },
      perspectiveB: {
        titleDE: "Deontologie (Kants Kategorischer Imperativ)",
        titleZH: "眼镜 B：康德定言命令（绝对义务与尊严防线）",
        corePointDE: "Menschen sind niemals reines Mittel zum Zweck, sondern Zweck an sich. Das moralische Gesetz gilt bedingungslos.",
        corePointZH: "人是目的而非手段（义务论）：道德律令具有绝对性，绝不能为了多数人的利益践踏个体的基本权利与尊严。",
      },
      synthesisDE: "Synthese nach KLP NRW: Fundierte Abwaegung zwischen Folgenverantwortung und unantastbarer Menschenwuerde.",
      synthesisZH: "北威州考纲综合评析：严谨权衡后果责任与不可剥夺的人的尊严（GG Art. 1 I）。",
    };
  } else {
    twoBrillen = {
      perspectiveA: {
        titleDE: "Funktional-mechanische Brille",
        titleZH: "眼镜 A：内在机制与自发调节视角",
        corePointDE: "Untersucht die direkten Kausalzusammenhaenge und internen Gesetzmaessigkeiten des Systems.",
        corePointZH: "立足系统内在第一性原理，考察直接因果律与动态自发平衡。",
      },
      perspectiveB: {
        titleDE: "Normativ-kritische Brille",
        titleZH: "眼镜 B：外部约束与批判反思视角",
        corePointDE: "Hinterfragt Randbedingungen, ethische Folgekosten und moegliche Systemfehler.",
        corePointZH: "审视外部边界条件、社会伦理负外部性与潜在机制失效风险。",
      },
      synthesisDE: "Synthese nach KLP NRW: Verbindung von Sachurteil (wie es funktioniert) und Werturteil (wie es legitimiert wird).",
      synthesisZH: "北威州考纲综合评析：将事实评价（运作机理）与价值评价（正当性论证）深度融合。",
    };
  }

  // 5. 趣味历史轶事 / 冷知识 (Fun Fact & Anekdote)
  let funFact: FunFactData;
  if (normFach.toLowerCase().includes("sowi")) {
    funFact = {
      titleDE: "Erhard und die Schaufenster ueber Nacht (1948)",
      titleZH: "1948 年艾哈德货币改革夜的橱窗奇迹",
      factDE: "Bei der Waehrungsreform hob Ludwig Erhard eigenmaechtig fast alle Preisbindungen auf. Ueber Nacht waren die vorher leeren Geschaefte voll! Auf Vorwuerfe der Alliierten antwortete er trocken: 'Ich habe die Vorschriften nicht aufgehoben, ich habe sie nur nicht wieder eingefuehrt!'",
      factZH: "1948 年货币改革时，艾哈德取消了几乎所有价格管制。此前空空如也的橱窗一夜摆满商品！面对盟军军官的质问，他幽默回应：『我没有取消配给管制，我只是没有重新引入它！』",
    };
  } else if (normFach.toLowerCase().includes("philo")) {
    funFact = {
      titleDE: "Kants praeziser Spaziergang in Koenigsberg",
      titleZH: "康德的散步与卢梭《爱弥儿》之约",
      factDE: "Immanuel Kant lebte so pünktlich, dass die Koenigsberger ihre Uhren nach seinem taeglichen Nachmittagsspaziergang stellten. Ein einziges Mal kam er zu spaet: Er hatte sich in Jean-Jacques Rousseaus Roman 'Emile' vertieft!",
      factZH: "康德生活作息极其严苛精准，以至于柯尼斯堡市民都以他下午散步的时间来校准家里的钟表。他一生唯一一次散步迟到，是因为读卢梭的《爱弥儿》入了迷！",
    };
  } else if (normFach.toLowerCase().includes("deutsch")) {
    funFact = {
      titleDE: "60 Jahre Lebenswerk an einem Drama",
      titleZH: "一部写了整整 60 年的宇宙级长卷",
      factDE: "Goethe begann die Arbeit an Faust mit 24 Jahren (Urfaust) und versiegelte das Manuskript von Faust II erst mit 82 Jahren kurz vor seinem Tod im Jahr 1832!",
      factZH: "歌德从 24 岁的年轻狂飙青年（写下《少年维特之烦恼》与《浮士德初稿》），一直写到 82 岁临终前几个月才封箱《浮士德第二部》，倾注了整整 60 年的人生顿悟！",
    };
  } else if (normFach.toLowerCase().includes("mathe")) {
    funFact = {
      titleDE: "Der Prioritaetsstreit um das Integral- und Differenzialzeichen",
      titleZH: "微积分记号的世纪之争",
      factDE: "Newton erfand die Infinitesimalrechnung mit Punkten ueber Variablen, doch Leibniz schuf die intuitiven Symbole dx und das Integralzeichen (ein langgezogenes S fuer Summa), die wir heute weltweit nutzen!",
      factZH: "牛顿和莱布尼茨各自独立发明了微积分。但莱布尼茨创造的 dy/dx 导数记号与拉长版 S（拉丁语求和 Summa）积分号 ∫，因为太优雅直观而成为了今天全世界通用的数学语言！",
    };
  } else {
    funFact = {
      titleDE: "Anekdote aus der Wissenschaftsgeschichte",
      titleZH: "学术史上的顿悟时刻",
      factDE: "Grosse Theorien entstanden selten am Schreibtisch, sondern oft durch scheinbar banale Alltagsbeobachtungen, die etablierte Dogmen infrage stellten.",
      factZH: "在科学与思想史上，颠覆性理论往往不是诞生在刻板的教条中，而是源于对日常反常现象的不懈追问与第一性原理思辨。",
    };
  }

  // 6. Study-Mate 三维自适应调频探针 (Probes)
  const studyMateProbes: StudyMateProbesData = {
    simplerHintZH: `[这里没懂·生活比喻]：不要害怕学术大词！把 »${title}« 想象成现实生活规则：${concept.mentalModelAnalogy.analogyTitle}。${concept.mentalModelAnalogy.explanationZH.slice(0, 150)}`,
    simplerHintDE: `[Erklär's einfacher]: Denk an das Bild »${concept.mentalModelAnalogy.analogyTitle}«: ${concept.mentalModelAnalogy.explanationDE.slice(0, 160)}`,
    deeperChallengeZH: `[太简单了·极客反例与边界质问]：如果系统受到不可逆极端冲击，原有的核心假设失效，系统会如何产生副作用？试用德语提炼一条包含限制条件（unter der Bedingung, dass...）的批判性论据！`,
    deeperChallengeDE: `[Mehr Tiefe · Extremfall & Kritik]: Was passiert bei extremen asymmetrischen Schocks? Welche unerwuenschten Folgekosten entstehen, und wie lautet deine kriterienorientierte Kritik?`,
    quizQuestionZH: `[考考我·现场高频考点快问]：在论述 »${title}« 时，阅卷老师最常扣分的陷阱（Fehlerfalle）是什么？`,
    quizQuestionDE: `[Prüf mich · Schnell-Check]: Was ist der typische Fehler in Oberstufen-Klausuren zu »${title}«?`,
    quizAnswerZH: `[答案揭秘]：${concept.fehlerquellen[0]?.trapDescriptionZH || "混淆因果机制与表面相关，未加论证就妄下结论。"} 防范策略：${concept.fehlerquellen[0]?.howToAvoidDE || "严格区分前提、传导链与系统效应！"}`,
    quizAnswerDE: `[Musterloesung]: ${concept.fehlerquellen[0]?.howToAvoidDE || "Stets Kausalkette und konkrete Kriterien nennen."}`,
  };

  // 7. 搭载专属考纲知识笔记 (Attached Note)
  const attachedNote: AttachedNoteData = {
    title,
    fach: normFach,
    feynmanSummaryZH: `【核心本质】把握考纲因果链：从制度规则出发，透视利益相关方的博弈与系统均衡。`,
    methodSnippetZH: `【会考三步法】1. 定性并界定考纲核心术语（AFB I）-> 2. 严密还原因果传导机制（AFB II）-> 3. 权衡事实与价值并给出明确结论（AFB III）。`,
    klausurSatzbausteinDE: concept.klausurSatz15NP.musterSatzDE,
    operatoren: [concept.klausurSatz15NP.operator || "analysieren", "beurteilen", "darstellen"],
    tags: ["EF", normFach, "KLP-NRW", "Wissensnotiz"],
  };

  return {
    ...concept,
    intuitionDilemma,
    storyHook: concept.storyHook || storyHook,
    feynmanExplanation: concept.feynmanExplanation || {
      summaryZH: feynmanSummaryZH,
      summaryDE: feynmanSummaryDE,
    },
    twoBrillen: concept.twoBrillen || twoBrillen,
    funFact: concept.funFact || funFact,
    studyMateProbes: concept.studyMateProbes || studyMateProbes,
    attachedNote: concept.attachedNote || attachedNote,
  };
}

/**
 * Lists all pre-calibrated canonical topic IDs in the knowledge bank.
 */
export function listSupportedPreloadedTopics(): string[] {
  return DOMAIN_KNOWLEDGE_ENTRIES.map((e) => e.canonicalTitle);
}
