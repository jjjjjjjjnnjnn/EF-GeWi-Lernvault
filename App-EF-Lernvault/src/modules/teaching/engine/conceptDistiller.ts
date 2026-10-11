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

export interface PuzzlePair {
  id: string;
  premiseTermDE?: string;
  premiseDE: string;
  premiseZH: string;
  realityTermDE?: string;
  realityDE: string;
  realityZH: string;
  consequenceDE?: string;
  consequenceZH?: string;
}

export interface KonzeptPuzzleData {
  instructionDE: string;
  instructionZH: string;
  pairs: PuzzlePair[];
}

export interface ExamTrapOption {
  id: string;
  textDE: string;
  textZH: string;
  isCorrect: boolean;
  explanationDE: string;
  explanationZH: string;
}

export interface ExamTrapCorrectionData {
  taskPromptDE?: string;
  taskPromptZH?: string;
  studentAnswerDE: string;
  studentAnswerZH: string;
  fatalFlawPointDE: string;
  fatalFlawPointZH: string;
  examinerVerdictDE: string;
  examinerVerdictZH: string;
  diagnosticOptions?: ExamTrapOption[];
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
  konzeptPuzzle?: KonzeptPuzzleData;
  examTrapCorrection?: ExamTrapCorrectionData;
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
          "Auf einem offenen Fischmarkt verkaufen hunderte kleine Stände nebeneinander exakt denselben frischen atlantischen Lachs. Der allgemein akzeptierte Marktpreis liegt bei 10 € pro Fisch.",
        scenarioZH:
          "设想在一个热闹的露天鱼市上，数百家小摊贩挨在一起卖完全相同的新鲜大西洋三文鱼，当前公认的市场价格为 10 欧一条。",
        questionDE:
          "Was geschieht mit deinem Absatz, wenn du als Einzelner deinen Preis eigenmächtig von 10 € auf 11 € anhebst?",
        questionZH:
          "若你单方面擅自把售价从 10 欧提高到 11 欧，你的销量会发生什么？",
        choiceA: {
          id: "A",
          textDE:
            "A) Dein Absatz sinkt nur moderat: Du verkaufst weiterhin den Großteil deiner Fische.",
          textZH:
            "A) 销量仅温和下滑，依然能卖出大部分三文鱼。",
          reactionDE:
            "Im Alltag ein logischer Gedanke – im Modell fatal! Im echten Leben bleiben Stammkunden oft aus Bequemlichkeit. Doch im vollkommenen Markt bricht dein Absatz sofort auf null ein: Da Käufer keinerlei persönliche Präferenzen haben und Preise sekundenschnell vergleichen, weichen ausnahmslos alle zur 10-€-Konkurrenz aus.",
          reactionZH:
            "在现实生活中完全符合常理，但在理论模型推导下将直接失效！真实世界里老顾客可能图近、图方便；但本模型假设顾客完全无偏好且能瞬间比价，只要你贵 1 欧，所有人会瞬间跑去隔壁买 10 欧的。",
        },
        choiceB: {
          id: "B",
          textDE:
            "B) Dein Absatz bricht sofort auf null ein: Du verkaufst absolut gar keinen Fisch mehr.",
          textZH:
            "B) 销量瞬间暴跌至 0，一条鱼也卖不出去。",
          reactionDE:
            "Exakt richtig! Das ist die eiskalte Logik des Modells: Weil die Güter völlig homogen sind und vollständige Markttransparenz herrscht, besitzt du als Einzelner null Preissetzungsmacht. Du bist ein reiner Preisnehmer (Mengenanpasser).",
          reactionZH:
            "完全正确！这就是完全竞争模型的冰冷法则：在鱼一模一样、价格完全透明的假定下，你没有任何提价空间，只能当一个被动的‘价格接受者兼产量调整者（Preisnehmer / Mengenanpasser）’。",
        },
        mechanismTakeawayDE:
          "Da im Modell die Güter völlig homogen sind und vollständige Markttransparenz herrscht, besitzt der einzelne Anbieter keine Preissetzungsmacht und agiert als reiner Preisnehmer (Mengenanpasser).",
        mechanismTakeawayZH:
          "在完全竞争模型中，由于商品完全同质且市场信息完全透明，单个供给者毫无定价权，只能作为纯粹的‘价格接受者兼产量调整者’。",
        klpCoreLogicDE:
          "5 Prämissen (Homogenität, Markttransparenz, keine Präferenzen, sofortige Reaktion, atomistische Struktur); vollkommene Preiselastizität (E = ∞); Preisnehmer vs. Preissetzer.",
        klpCoreLogicZH:
          "5 大假定前提（同质、透明、无偏好、瞬时反应、原子结构）；完全价格弹性 (E = ∞)；价格接受者 (Preisnehmer) 核心考点。",
      },
      mentalModelAnalogy: {
        analogyTitle: "Der Lachsstand-Markttest: Der Preisnehmer im gläsernen Markt",
        explanationDE:
          "Auf einem vollkommenen Markt ist jeder Anbieter ein reiner Preisnehmer (Mengenanpasser): Wer auch nur einen Cent über dem Marktpreis verlangt, verkauft bei vollständiger Markttransparenz und homogenen Gütern absolut gar nichts.",
        explanationZH:
          "在完全竞争市场中，任何卖家都只是被动的价格接受者（Preisnehmer）：在商品完全同质且价格完全透明的条件下，只要你比公认市场价多加 1 分钱，你的销量就会瞬间跌为零。",
      },
      konzeptPuzzle: {
        instructionDE:
          "Ordne die 4 theoretischen Prämissen des vollkommenen Marktes ihren realen Gegenbeispielen (Marktunvollkommenheiten) zu:",
        instructionZH:
          "将完全竞争市场的 4 大理想理论假定，与现实中打破该假设的真实案例（市场不完全性）连线配对：",
        pairs: [
          {
            id: "p1",
            premiseTermDE: "Homogenität der Güter",
            premiseDE: "Homogene Güter (völlig gleichartige Ware ohne Qualitätsunterschiede)",
            premiseZH: "完全同质商品（市场上所有产品毫无品质、包装与服务差异）",
            realityTermDE: "Produktdifferenzierung / Branding",
            realityDE: "Markenbildung, Werbung & Produktdifferenzierung",
            realityZH: "品牌营销与差异化设计（通过包装与广告制造主观品质溢价）",
            consequenceDE: "Hebt die Homogenität auf und verschafft Anbietern monopolistische Preisspielräume.",
            consequenceZH: "消除同质性并制造主观溢价，使单个商家重新获得自主定价权 (Preissetzungsmacht) 与超额利润。",
          },
          {
            id: "p2",
            premiseTermDE: "Markttransparenz",
            premiseDE: "Vollständige Markttransparenz (vollkommene Marktübersicht aller Akteure)",
            premiseZH: "完全市场透明度（价格信息瞬间全知，不存在任何隐匿）",
            realityTermDE: "Informationsasymmetrien",
            realityDE: "Informationsasymmetrien & versteckte Zusatzkosten",
            realityZH: "信息不对称、价格黑箱与隐性收费",
            consequenceDE: "Ermöglicht Preisdiskriminierung und verhindert den sofortigen Wechsel zum günstigsten Anbieter.",
            consequenceZH: "利用信息不对称制造垄断租金，打破了买方全知比价与即时转单能力。",
          },
          {
            id: "p3",
            premiseTermDE: "Keine Präferenzen",
            premiseDE: "Keine Präferenzen (weder persönlich, räumlich noch zeitlich)",
            premiseZH: "无个人与空间偏好（不在乎谁卖在哪卖，无任何主观倾向）",
            realityTermDE: "Persönliche & Räumliche Präferenzen",
            realityDE: "Stammkundenbeziehungen & bequeme geografische Nähe",
            realityZH: "熟人熟脸信任感与就近购买习惯（人情与地利锁定）",
            consequenceDE: "Kunden akzeptieren höhere Preise bei vertrauten oder nahegelegenen Anbietern (lokale Monopole).",
            consequenceZH: "人情与地理便利构筑局部微型垄断，消费者自愿为偏好支付额外差价。",
          },
          {
            id: "p4",
            premiseTermDE: "Freier Marktzutritt",
            premiseDE: "Freier Marktzutritt & unendliche Reaktionsgeschwindigkeit",
            premiseZH: "自由进出无门槛与瞬时反应速度（资本与劳动力无摩擦流动）",
            realityTermDE: "Marktzutrittsschranken (Barrieren)",
            realityDE: "Hohe Fixkosten, Patente & Markteintrittsbarrieren",
            realityZH: "高额初始投资、技术专利与准入牌照壁垒",
            consequenceDE: "Schirmt etablierte Großkonzerne vor neuem Wettbewerb ab und hemmt die Mengenanpassung.",
            consequenceZH: "准入壁垒形成护城河阻断新资本进入，使市场供给无法自发迅速扩容出清。",
          },
        ],
      },
      examTrapCorrection: {
        taskPromptDE:
          "»Erläutern Sie die Steuerungsfunktion des Preises auf dem vollkommenen Markt.« (AFB II)",
        taskPromptZH:
          "»阐释完全竞争市场中价格机制的调控职能。« (AFB II 考查要求)",
        studentAnswerDE:
          "»Der Gleichgewichtspreis sorgt dafür, dass alle Bürger mit lebensnotwendigen Gütern versorgt werden und verhindert gleichzeitig ungerechte Unternehmensgewinne durch den Staat.«",
        studentAnswerZH:
          "»均衡价格确保了所有公民都能获得生活必需品，并通过国家干预杜绝了不公正的企业暴利。«",
        fatalFlawPointDE:
          "Gleichsetzung von theoretischem Referenzmodell und realpolitischem Handlungsziel sowie Verwechslung von Allokationseffizienz und Verteilungsgerechtigkeit (0 Notenpunkte!)",
        fatalFlawPointZH:
          "误把纯理论对照基准（Referenzmodell）当成现实政策追求目标，将市场出清效率与社会公平保障混为一谈（阅卷直接判 0 分！）",
        examinerVerdictDE:
          "Klausur-Regel: Der vollkommene Markt ist blind für Verteilungsgerechtigkeit. Die Signalfunktion sichert ausschließlich Markträumung und Effizienz. Soziale Grundversorgung ist Aufgabe der staatlichen Sozialpolitik (Soziale Marktwirtschaft), nicht des Preismechanismus!",
        examinerVerdictZH:
          "阅卷标准批注：完全竞争市场对分配公正完全盲目。价格机制只负责出清效率与反映稀缺。保障弱势群体与基础生存福利属于‘社会市场经济’的国家再分配范畴，绝非完全市场自身机制！",
        diagnosticOptions: [
          {
            id: "diag-correct",
            textDE:
              "Verwechslung von Effizienz und Gerechtigkeit: Der Preismechanismus sichert lediglich die effiziente Markträumung (Knappheitssignal), garantiert jedoch keinerlei soziale Grundversorgung oder faire Verteilung.",
            textZH:
              "混淆了概念：价格机制只管「出清效率 (Effizienz)」，绝不保证「社会公正 (Gerechtigkeit)」或人人买得起。",
            isCorrect: true,
            explanationDE:
              "Diagnose exakt richtig! Der vollkommene Markt ist blind für Verteilungsgerechtigkeit. Die soziale Grundversorgung ist Aufgabe der staatlichen Sozialpolitik (Soziale Marktwirtschaft), nicht des Preismechanismus selbst.",
            explanationZH:
              "诊断正确！这就是 Klausur 最致命的高频失分陷阱：完全竞争价格只是稀缺信号，它冷酷地淘汰出价低的人；保障底层福利属于社会市场经济的制度再分配，绝非市场内生功能。",
          },
          {
            id: "diag-distractor-state",
            textDE:
              "Fehlende Höchstpreisgrenzen: Der Prüfling hätte darlegen müssen, dass der Staat im vollkommenen Markt durch Preishöchstgrenzen die Kaufkraft der ärmeren Haushalte sichert.",
            textZH:
              "制度混淆：该考生漏写了政府在完全市场中必须通过最高限价（Höchstpreis）来稳定物价，防止居民生活成本过高。",
            isCorrect: false,
            explanationDE:
              "Fataler Fehlgedanke: Gesetzliche Höchstpreise erzeugen Überschussnachfrage und zerstören die Markträumung. Im vollkommenen Markt herrscht vollständige Preisbildung ohne Staatseingriffe.",
            explanationZH:
              "致命失分陷阱：最高限价会造成供不应求与排队短缺；完全竞争市场模型的基本前提就是零行政干预，强加限价直接违背模型公理。",
          },
          {
            id: "diag-distractor-monopoly",
            textDE:
              "Unterdrückte Monopolrenten: Der Prüfling hat übersehen, dass Unternehmen im Modell den Preis zur Deckung ihrer Gewinnaufschläge frei nach oben anpassen dürfen.",
            textZH:
              "角色误判：以为单个商贩具有主动调控价格以谋求暴利的能力，忽视了其作为「价格接受者 (Preisnehmer)」的被动地位。",
            isCorrect: false,
            explanationDE:
              "Falsch: Bei vollkommener Transparenz und homogenen Gütern sind alle Anbieter reine Mengenanpasser mit null Preissetzungsmacht.",
            explanationZH:
              "概念错误：在商品同质与信息透明前提下，所有商家都是纯粹的价格接受者与产量调整者，根本不存在自主加价获取垄断利润的能力。",
          },
        ],
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
          "Zwar garantiert der vollkommene Preismechanismus eine allokative Effizienz im Sinne des Pareto-Optimums, dennoch erfordert das grundgesetzliche Sozialstaatsprinzip (Art. 20 GG) ordnungspolitische Korrekturen, da der reine Markt weder Verteilungsgerechtigkeit noch soziale Absicherung gewährleistet.",
        operator: "beurteilen",
        scoringKeywords: [
          "Preismechanismus",
          "Allokationsfunktion",
          "Allokationseffizienz",
          "Pareto-Optimum",
          "Sozialstaatsprinzip",
          "Verteilungsgerechtigkeit",
          "Marktversagen",
        ],
        explanationZH:
          "既精确剖析完全市场在资源配置上的帕累托效率，又立足基本法社会国家原则论证秩序政策兜底的不可或缺性。",
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
  {
  id: "soziale-marktwirtschaft-prinzipien-marktversagen",
  canonicalTitle: "Soziale Marktwirtschaft: Prinzipien und Marktversagen",
  fach: "SoWi",
  matchKeywords: [
    "soziale marktwirtschaft",
    "preismechanismus",
    "allokationsfunktion",
    "ausgleichsfunktion",
    "pareto-optimum",
    "sozialstaatsprinzip",
    "ordnungspolitik",
    "marktversagen",
    "externe effekte",
    "oeffentliche gueter",
    "marktmacht",
    "hoechstpreis"
  ],
  data: {
    topicTitle: "Soziale Marktwirtschaft: Prinzipien und Marktversagen",
    fach: "SoWi",
    intuitionDilemma: {
      scenarioDE: "Eure Stadt deckelt die Miete bei 8 Euro pro qm, der Marktpreis lag bei 12 Euro. Alle jubeln ueber billige Wohnungen.",
      scenarioZH: "你们城市把租金限在8欧/平米，市场价原本12欧。人人都在为便宜房欢呼。",
      questionDE: "Wer bekommt nach einem Jahr noch eine Wohnung?",
      questionZH: "一年之后，谁还能租到房子？",
      choiceA: {
        id: "A",
        textDE: "Gute Nachricht: Mieten sinken, mehr Familien koennen sich die Wohnung leisten, die Versorgung wird gerechter.",
        textZH: "好消息：租金下降，更多家庭租得起房，供给变得更公平。",
        reactionDE: "Verstaendlich gedacht: Guenstiger klingt fairer. Doch zum gedeckelten Preis wollen mehr Haushalte mieten, waehrend Vermieter weniger anbieten -> Warteschlangen und Schattenmieten statt Versorgung fuer alle.",
        reactionZH: "这样想可以理解：更便宜听起来更公平。但在限价下，想租房的家庭变多，房东供给变少 -> 结果是排队与黑市租金，而不是人人有房住。"
      },
      choiceB: {
        id: "B",
        textDE: "Schlechte Nachricht: Die guenstigen Wohnungen sind sofort weg, Wartelisten wachsen, viele gehen trotz Deckel leer aus.",
        textZH: "坏消息：便宜房源瞬间被抢光，排队名单越变越长，很多人有价格上限依然租不到房。",
        reactionDE: "Scharf beobachtet: Unter dem Gleichgewicht sinkt das Angebot und die Nachfrage steigt -> Nachfrageueberhang mit Wartelisten, Beziehungen und Investitionsrueckgang im Wohnungsbau.",
        reactionZH: "观察敏锐：低于均衡价时供给下降、需求上升 -> 出现需求过剩，伴随排队名单、托关系与住房建设投资退潮。"
      },
      mechanismTakeawayDE: "Unter einem bindenden Hoechstpreis ist die Ausgleichsfunktion des Preises ausser Kraft gesetzt: Signal- und Allokationsfunktion lenken das Angebot weg, der Markt raeumt nicht mehr.",
      mechanismTakeawayZH: "在有约束力的最高限价下，价格的出清功能被阻断：信号与配置功能把供给引向别处，市场不再出清。",
      klpCoreLogicDE: "NRW KLP SoWi IF2 Marktwirtschaftliche Ordnung: Effizienz des Preismechanismus vs. Gerechtigkeit des Sozialstaatsprinzips (Art. 20 GG) -> Ordnungspolitik korrigiert Marktversagen.",
      klpCoreLogicZH: "NRW考纲SoWi内容域2市场经济秩序：价格机制的效率 vs 社会国家原则（《基本法》第20条）的正义 -> 秩序政策矫正市场失灵。"
    },
    mentalModelAnalogy: {
      analogyTitle: "Der Schiedsrichter statt Mitspieler: Ordnungspolitik als Spielregelwaechter",
      explanationDE: "Unter einem bindenden Hoechstpreis ist die Ausgleichsfunktion des Preises ausser Kraft gesetzt: Signal- und Allokationsfunktion lenken das Angebot weg, der Markt raeumt nicht mehr.",
      explanationZH: "在有约束力的最高限价下，价格的出清功能被阻断：信号与配置功能把供给引向别处，市场不再出清。"
    },
    konzeptPuzzle: {
      instructionDE: "Ordne jedem Ordnungsprinzip der Sozialen Marktwirtschaft seine Marktversagens-Realitaet und die Klausur-Konsequenz zu:",
      instructionZH: "将社会市场经济的每条秩序原则与其市场失灵现实及考场结论配对：",
      pairs: [
        {
          id: "pair-1",
          premiseDE: "Funktionsfaehiger Wettbewerb: Viele Anbieter und Nachfrager, freier Marktzutritt; der Staat setzt nur den Ordnungsrahmen (Ordoliberalismus, Eucken).",
          premiseZH: "有效竞争：众多供给者与需求者、自由准入；国家只制定秩序框架（秩序自由主义，欧肯）。",
          realityDE: "Marktmacht: Monopol und Oligopol setzen Preise ueber Grenzkosten, schraenken Menge und Auswahl ein.",
          realityZH: "市场势力：垄断与寡头把价格定在边际成本之上，压缩产量与选择。",
          consequenceDE: "Klausur: Wettbewerb sichern (Kartellrecht, GWB), statt Preise direkt festzusetzen.",
          consequenceZH: "考场结论：用卡特尔法维护竞争，而不是由国家直接定价。"
        },
        {
          id: "pair-2",
          premiseDE: "Preismechanismus: Signal-, Allokations- und Ausgleichsfunktion fuehren ueber flexible Preise zum Gleichgewicht.",
          premiseZH: "价格机制：信号、配置与出清功能经由弹性价格导向均衡。",
          realityDE: "Negative externe Effekte: CO2-Kosten traegt die Allgemeinheit, der Verursacherpreis ist zu niedrig -> Ueberproduktion.",
          realityZH: "负外部性：二氧化碳成本由全社会承担，污染者支付的价格过低 -> 过度生产。",
          consequenceDE: "Klausur: Externe Kosten per CO2-Preis oder Ordnungsrecht internalisieren, damit das Preissignal die Knappheit ehrlich zeigt.",
          consequenceZH: "考场结论：用碳价或规制手段把外部成本内部化，让价格信号真实反映稀缺。"
        },
        {
          id: "pair-3",
          premiseDE: "Private Gueter: Ausschliessbarkeit und Rivalitaet ermoeglichen Tausch ueber den Preismechanismus.",
          premiseZH: "私人物品：可排他、可竞争，可经由价格机制交换。",
          realityDE: "Oeffentliche Gueter: Nicht-Ausschliessbarkeit und Nicht-Rivalitaet (z. B. Deiche, Grundlagenforschung) -> Trittbrettfahrer, Unterversorgung.",
          realityZH: "公共产品：非排他、非竞争（如堤坝、基础研究）-> 搭便车，供给不足。",
          consequenceDE: "Klausur: Bei oeffentlichen Guetern ist staatliche Bereitstellung oder Regulierung ordnungspolitisch begruendet.",
          consequenceZH: "考场结论：对公共产品，国家提供或规制具有秩序政策依据。"
        },
        {
          id: "pair-4",
          premiseDE: "Vollstaendige Information: Alle kennen Preise und Qualitaeten und reagieren unverzerrt.",
          premiseZH: "完全信息：所有人都知晓价格与质量，并无偏反应。",
          realityDE: "Informationsasymmetrien: Anbieter wissen mehr als Kauefer (z. B. Gebrauchtwagen, Finanzprodukte) -> Fehlentscheidungen, Vertrauensverlust.",
          realityZH: "信息不对称：卖方比买方知道得多（如二手车、金融产品）-> 错误决策，信任流失。",
          consequenceDE: "Klausur: Transparenzregeln und Verbraucherschutz staerken, ohne den Preismechanismus zu ersetzen.",
          consequenceZH: "考场结论：以透明度规则与消费者保护补强，而非取代价格机制。"
        }
      ]
    },
    examTrapCorrection: {
      taskPromptDE: "Beurteilen Sie die folgende Schueleraussage zur Sozialen Marktwirtschaft. Waehlen Sie die zutreffende Diagnose. (AFB III, beurteilen)",
      taskPromptZH: "评价下面关于社会市场经济的学生表述，选择正确的诊断。（AFB III，评价）",
      studentAnswerDE: "Der freie Preismechanismus sichert automatisch soziale Gerechtigkeit fuer alle Buerger, deshalb sind sozialpolitische Korrekturen in der Sozialen Marktwirtschaft ueberfluessig.",
      studentAnswerZH: "自由价格机制能自动保障全体公民的社会正义，因此在社会市场经济中社会政策矫正都是多余的。",
      fatalFlawPointDE: "Verwechslung von Effizienz und Gerechtigkeit: Allokationseffizienz des Preismechanismus wird mit Verteilungsgerechtigkeit gleichgesetzt.",
      fatalFlawPointZH: "把效率与正义混为一谈：把价格机制的配置效率等同于分配正义。",
      examinerVerdictDE: "0 / 15 NP. Der Preismechanismus wird mit sozialpolitischer Umverteilung verwechselt; die normative Begruendung ueber das Sozialstaatsprinzip (Art. 20 GG) und die Diagnose von Marktversagen fehlen vollstaendig.",
      examinerVerdictZH: "0/15分。把价格机制与社会政策再分配混为一谈；缺失以《基本法》第20条社会国家原则作规范依据，也没有诊断市场失灵。",
      diagnosticOptions: [
        {
          id: "diag-correct",
          textDE: "Der Satz verwechselt Allokationseffizienz mit Verteilungsgerechtigkeit: Der Preismechanismus raeumt den Markt, garantiert aber weder bezahlbaren Zugang fuer alle noch soziale Absicherung.",
          textZH: "该句混淆了配置效率与分配正义：价格机制只实现市场出清，并不保证人人负担得起，也不提供社会保障。",
          isCorrect: true,
          explanationDE: "Der Preismechanismus sichert nur die marktraeumende Allokationseffizienz; Verteilungsgerechtigkeit und soziale Absicherung folgen aus dem Sozialstaatsprinzip des Art. 20 GG und erfordern ordnungspolitische Korrekturen wie Umverteilung oder Mindeststandards.",
          explanationZH: "价格机制只保证市场出清的配置效率；分配正义与社会保障源于《基本法》第20条社会国家原则，需要秩序政策层面的再分配与最低标准等矫正。"
        },
        {
          id: "diag-distractor-1",
          textDE: "Der Fehler liegt in der fehlenden Forderung nach flaechendeckenden staatlichen Festpreisen: Erst verbindliche Festpreise fuer alle Gueter wuerden faire Verteilung und sozialen Ausgleich sichern.",
          textZH: "错误在于没有要求全面实行国家统制定价：只有对所有商品实行有约束力的统一定价，才能保障公平分配与社会平衡。",
          isCorrect: false,
          explanationDE: "Die Soziale Marktwirtschaft setzt auf den Ordnungsrahmen und gezielte Korrekturen bei Marktversagen, nicht auf die Abschaffung freier Preise; flaechendeckende Festpreise wuerden Signal- und Allokationsfunktion ausser Kraft setzen und zu Fehlallokation fuehren.",
          explanationZH: "社会市场经济依靠秩序框架与针对市场失灵的定点矫正，而非取消自由价格；全面统制定价会使价格的信号与配置功能失效，导致资源错配。"
        },
        {
          id: "diag-distractor-2",
          textDE: "Der Satz ist nur unvollstaendig, weil er die positive Beschaeftigungswirkung des Mindestlohns verschweigt: Ein Mindestpreis ueber dem Gleichgewicht erhoeht stets auch die nachgefragte Menge an Arbeit.",
          textZH: "该句只是不完整，因为它没有写出最低工资的积极就业效应：高于均衡价的最低限价总会同时提高劳动力的需求量。",
          isCorrect: false,
          explanationDE: "Ein bindender Mindestpreis liegt ueber dem Gleichgewicht und erzeugt einen Angebotsueberhang; auf dem Arbeitsmarkt bedeutet das Arbeitslosigkeit bei gering Qualifizierten. Der Satz blendet diese Mengenwirkung und die normativen Kosten des Eingriffs in Tarifautonomie und Preisbildung aus.",
          explanationZH: "有约束力的最低限价位于均衡价格之上，会造成供给过剩；在劳动力市场上即低技能群体的失业。该句回避了这一数量效应，也回避了干预对劳资自治与价格形成的规范成本。"
        }
      ]
    },
    klpTermini: [
      {
        termDE: "Preismechanismus",
        definitionDE: "Signal-, Allokations- und Ausgleichsfunktion fuehren ueber flexible Preise zum Gleichgewicht; sichert Marktraeumung und Effizienz, nie Gerechtigkeit.",
        termZH: "价格机制",
        definitionZH: "信号、配置与出清功能经由弹性价格导向均衡；只保证出清与效率，绝不保证正义。"
      },
      {
        termDE: "Sozialstaatsprinzip",
        definitionDE: "Normative Saeule aus Art. 20 GG: verpflichtet den Staat zu Umverteilung und Mindeststandards, weil der Markt blind fuer Verteilungsgerechtigkeit ist.",
        termZH: "社会国家原则",
        definitionZH: "《基本法》第20条的规范支柱：国家必须再分配与兜底，因为市场对分配正义是盲目的。"
      },
      {
        termDE: "Ordnungspolitik",
        definitionDE: "Ordoliberales Leitbild (Eucken): Staat setzt den Wettbewerbsrahmen und korrigiert Marktversagen gezielt, statt Preise direkt festzusetzen.",
        termZH: "秩序政策",
        definitionZH: "秩序自由主义路线：国家制定竞争框架、定点矫正失灵，而非直接定价。"
      },
      {
        termDE: "Marktversagen",
        definitionDE: "Faelle, in denen der Preismechanismus fehlallokiert: externe Effekte, oeffentliche Gueter, Marktmacht, Informationsasymmetrien.",
        termZH: "市场失灵",
        definitionZH: "价格机制错误配置资源的情形：外部性、公共产品、市场势力、信息不对称。"
      },
      {
        termDE: "Externe Effekte",
        definitionDE: "Unkompensierte Drittfolgen (z. B. CO2-Kosten der Allgemeinheit); Loesung ueber Internalisierung per Preis oder Ordnungsrecht.",
        termZH: "外部性",
        definitionZH: "未补偿的第三方后果；出路是经由价格或规制将其内部化。"
      },
      {
        termDE: "Oeffentliche Gueter",
        definitionDE: "Nicht-Ausschliessbarkeit plus Nicht-Rivalitaet (Deiche, Grundlagenforschung) fuehren zu Trittbrettfahrern und Unterversorgung.",
        termZH: "公共产品",
        definitionZH: "非排他加非竞争导致搭便车与供给不足，需国家提供或规制。"
      }
    ],
    fehlerquellen: [
      {
        trapTitleDE: "Effizienz gleich Gerechtigkeit",
        trapDescriptionDE: "Allokationseffizienz des Preismechanismus wird mit Verteilungsgerechtigkeit gleichgesetzt; sozialpolitische Korrekturen gelten als ueberfluessig (0 NP).",
        trapDescriptionZH: "把价格机制的配置效率等同于分配正义，认为社会政策矫正多余。",
        howToAvoidDE: "Effizienz und Gerechtigkeit strikt trennen: Der Markt raeumt, das Sozialstaatsprinzip (Art. 20 GG) verteilt."
      },
      {
        trapTitleDE: "Festpreise als Loesung",
        trapDescriptionDE: "Flaechendeckende staatliche Festpreise sollen faire Verteilung sichern, obwohl sie Signal- und Allokationsfunktion ausser Kraft setzen.",
        trapDescriptionZH: "要求全面统制定价保障公平，无视其摧毁价格信号与配置功能。",
        howToAvoidDE: "Soziale Marktwirtschaft haelt am Preismechanismus fest; Korrektur heisst Ordnungsrahmen, nicht Preisabschaffung."
      },
      {
        trapTitleDE: "Mindestlohn ohne Mengenwirkung",
        trapDescriptionDE: "Ein Mindestpreis ueber dem Gleichgewicht erhoehe stets auch die nachgefragte Menge; Angebotsueberhang und Beschaeftigungsverlust werden ausgeblendet.",
        trapDescriptionZH: "高于均衡的最低限价总会同时提高需求量，无视供给过剩与就业损失。",
        howToAvoidDE: "Bindende Preisgrenzen stets mit Mengenwirkung denken: Hoechstpreis zu Nachfrageueberhang, Mindestpreis zu Angebotsueberhang."
      }
    ],
    klausurSatz15NP: {
      musterSatzDE: "\"Zwar sichert der Preismechanismus der Sozialen Marktwirtschaft allokative Effizienz im Sinne des Pareto-Optimums, dennoch erfordert das Sozialstaatsprinzip (Art. 20 GG) ordnungspolitische Korrekturen, da externe Effekte, oeffentliche Gueter und Marktmacht ohne Eingriff zu Fehlallokation und sozialer Schieflage fuehren.\"",
      operator: "beurteilen",
      scoringKeywords: [
        "Preismechanismus",
        "Allokationsfunktion",
        "Ausgleichsfunktion",
        "Pareto-Optimum",
        "Sozialstaatsprinzip",
        "Ordnungspolitik",
        "Marktversagen",
        "externe Effekte",
        "oeffentliche Gueter",
        "Marktmacht"
      ],
      explanationZH: "（既承认价格机制在配置上的帕累托效率，又立足《基本法》社会国家原则，论证对外部性、公共产品与市场势力三类失灵作秩序政策矫正的必要性。）"
    },
    socraticProbes: [
      {
        questionDE: "Wer bekommt nach einem Jahr noch eine Wohnung, wenn die Miete unter dem Gleichgewicht gedeckelt ist?",
        questionZH: "租金限在均衡价之下，一年后谁还能租到房？",
        counterPerspectiveDE: "Unter dem Gleichgewicht sinkt das Angebot und die Nachfrage steigt: Nachfrageueberhang mit Wartelisten statt Versorgung fuer alle."
      },
      {
        questionDE: "Erfordert das Sozialstaatsprinzip die Ersetzung des Preismechanismus durch Festpreise?",
        questionZH: "社会国家原则是否要求以统制定价取代价格机制？",
        counterPerspectiveDE: "Das Leitbild lautet Wettbewerb plus sozialer Ausgleich: Wettbewerb sichern, externe Effekte einpreisen, oeffentliche Gueter bereitstellen, Information schuetzen."
      }
    ]
  }
},

  // 12. Utilitarismus vs. Kategorischer Imperativ (Philosophie)
  {
    id: "utilitarismus-vs-kategorischer-imperativ",
    canonicalTitle: "Utilitarismus vs. Kategorischer Imperativ",
    fach: "Philosophie",
    matchKeywords: [
      "utilitarismus",
      "kategorischer imperativ",
      "konsequentialismus",
      "nutzenbilanz",
      "hedonismus",
      "maxime",
      "universalisierung",
      "zweckformel",
      "menschenwuerde",
      "mill",
      "bentham",
      "kant",
      "pflichtethik",
      "weichenfall"
    ],
    data: {
      topicTitle: "Utilitarismus vs. Kategorischer Imperativ",
      fach: "Philosophie",
      intuitionDilemma: {
        scenarioDE: "Eine Strassenbahn ist ausser Kontrolle. Auf dem geraden Gleis arbeiten fuenf Personen, auf dem Ausweichgleis steht ein Unbeteiligter. Nur eine aktive Weichenstellung entscheidet ueber Leben und Tod.",
        scenarioZH: "一辆失控电车冲来：直行轨道上有五名工人，侧线轨道上有一名无辜路人。只有主动扳道岔才能决定生死。",
        questionDE: "Soll die Fahrerin die Weiche aktiv umstellen und damit einen Unbeteiligten opfern, um fuenf Gleisarbeiter zu retten?",
        questionZH: "司机是否应该主动扳道岔、牺牲一名无辜者去救五名养路工？",
        choiceA: {
          id: "A",
          textDE: "A) Du stellst die Weiche um: Fuenf gerettete Leben wiegen schwerer als ein geopfertes Leben.",
          textZH: "A) 你会扳道岔：救下五条命比牺牲一条命分量更重。",
          reactionDE: "Alltagsnah gedacht, in der Theorie jedoch folgenblind: Du rechnest nur gerettete Leben gegeneinander auf. Genau so prueft der Utilitarismus: Er fragt nach der Bilanz aller Folgen fuer alle Betroffenen.",
          reactionZH: "这是日常直觉的算法，但在理论上只看后果：你把人命相加相减。这正是功利主义的检验方式：只问所有受影响者的后果总账。"
        },
        choiceB: {
          id: "B",
          textDE: "B) Du stellst die Weiche nicht gezielt um: Du darfst niemanden aktiv opfern, auch nicht zur Rettung mehrerer.",
          textZH: "B) 你不会主动扳道岔：不能为了救多数人而主动牺牲任何一人。",
          reactionDE: "Alltagsfern, aber pflichtethisch konsequent: Du weigerst dich, einen Unbeteiligten gezielt als Mittel zu gebrauchen. Genau so prueft Kant: Er fragt, ob die Maxime als allgemeines Gesetz bestehen kann und ob sie Menschenwuerde achtet.",
          reactionZH: "这违反日常直觉，却符合义务论：你拒绝把无辜者当作工具。这正是康德的检验方式：只问准则能否成为普遍法则、是否把人当目的。"
        },
        mechanismTakeawayDE: "Der Fall spaltet zwei Prueflogiken: Der Utilitarismus bilanziert Folgen fuer das Gesamtglueck, Kant prueft Maxime und Menschenwuerde unabhaengig vom Nutzen.",
        mechanismTakeawayZH: "此案撕开两种检验逻辑：功利主义只算总体幸福的后果总账，康德只验准则能否普遍化、是否把人当目的，与效用无关。",
        klpCoreLogicDE: "Utilitarismus (Folgen-, Utilitaets-, Hedonistisches und Universales Prinzip; Bentham quantitativ -> Mill qualitativ) vs. Kant (Maxime, Universalisierung, Zweckformel, Autonomie); Kriterium Menschenwuerde.",
        klpCoreLogicZH: "功利主义（后果、效用、快乐主义、普遍性四支柱；边沁量化 -> 密尔质性）对康德（准则、普遍化检验、目的公式、自律）；以人的尊严为评价准绳。"
      },
      mentalModelAnalogy: {
        analogyTitle: "Buchhalter vs. Richter: Bilanzen zaehlen Leben, Maximen pruefen Wuerde",
        explanationDE: "Der Fall spaltet zwei Prueflogiken: Der Utilitarismus bilanziert Folgen fuer das Gesamtglueck, Kant prueft Maxime und Menschenwuerde unabhaengig vom Nutzen.",
        explanationZH: "此案撕开两种检验逻辑：功利主义只算总体幸福的后果总账，康德只验准则能否普遍化、是否把人当目的，与效用无关。"
      },
      konzeptPuzzle: {
        instructionDE: "Ordne jedem ethischen Pruefprinzip seine Gegenposition (Einwand) und die Klausur-Konsequenz zu:",
        instructionZH: "将每条伦理检验原则与其对立诘难及考场结论配对：",
        pairs: [
          {
            id: "pair-1",
            premiseDE: "Konsequenzprinzip: Richtig ist, was das Gesamtglueck aller Betroffenen maximiert.",
            premiseZH: "后果原则：对所有受影响者总体幸福最大化的行为才是正当的。",
            realityDE: "Instrumentalisierungsproblem: Eine Minderheit wird als blosses Rechenobjekt geopfert.",
            realityZH: "工具化难题：少数人被降格为纯粹的计算对象而牺牲。",
            consequenceDE: "Klausur: Utilitarismus rechtfertigt die Umstellung prima facie ueber die Leidminimierung, geraet aber unter Druck, sobald ein Unbeteiligter gezielt geopfert wird.",
            consequenceZH: "考场结论：功利主义凭苦乐最小化 prima facie 支持扳道岔，但一旦涉及主动牺牲无辜者即陷入辩护压力。"
          },
          {
            id: "pair-2",
            premiseDE: "Benthams quantitatives Kalkuel: Jede Lust zaehlt gleich, nur Menge und Dauer entscheiden.",
            premiseZH: "边沁量化算盘：一切快乐无高下之分，只计量强度与时长。",
            realityDE: "Mills qualitative Stufe: Hoehere geistige Freuden und Wuerdebewusstsein wiegen kategorial schwerer (kompetente Richter).",
            realityZH: "密尔的质性层级：精神快乐与尊严意识在范畴上重于感官满足（胜任裁判官判准）。",
            consequenceDE: "Klausur: Wer Mill auf Bentham reduziert, verfehlt den qualitativen Hedonismus und die Rolle der kompetenten Richter.",
            consequenceZH: "考场结论：把密尔压缩为边沁即丢失质性快乐主义与胜任裁判官的认识论判准。"
          },
          {
            id: "pair-3",
            premiseDE: "Universalisierungstest: Handle nur nach einer Maxime, die zugleich allgemeines Gesetz werden kann.",
            premiseZH: "普遍化检验：只依同时能意愿其成为普遍法则的准则行动。",
            realityDE: "Rigorismus-Einwand: Strikte Luegen- und Toetungsverbote wirken in tragischen Faellen wirklichkeitsfremd starr.",
            realityZH: "严苛主义诘难：在悲剧性两难中，绝对禁令显得脱离现实、过于僵硬。",
            consequenceDE: "Klausur: Die Maxime der Notluege und der gezielten Opferung scheitert am Selbstwiderspruch und ist daher pflichtwidrig.",
            consequenceZH: "考场结论：说谎与主动牺牲的准则通不过普遍化检验（自我瓦解），属于违反义务。"
          },
          {
            id: "pair-4",
            premiseDE: "Zweckformel: Behandle die Menschheit jederzeit zugleich als Zweck, niemals bloss als Mittel.",
            premiseZH: "目的公式：任何时候把人同时当作目的，绝不仅仅当作手段。",
            realityDE: "Folgenblindheits-Einwand: Reine Gesinnungspruefung ignoriert die Verantwortung fuer vorhersehbares Massenleid.",
            realityZH: "后果盲区诘难：纯粹动机检验无视对可预见的大规模苦难的责任。",
            consequenceDE: "Klausur: Die gezielte Opferung verletzt die Menschenwuerde, weil sie den Unbeteiligten zum Rettungswerkzeug degradiert.",
            consequenceZH: "考场结论：主动牺牲把无辜者降格为救援工具，直接违反人的尊严。"
          }
        ]
      },
      examTrapCorrection: {
        studentAnswerDE: "Kant und Mill sind sich im Grunde einig: Beide erlauben die Notluege und die Opferung eines Unbeteiligten, wenn dadurch fuenf Menschen gerettet werden, weil der gute Wille den groessten Nutzen fuer die meisten will. (0 / 15 NP)",
        studentAnswerZH: "“康德和密尔本质上一致：只要能救五人，两者都允许说谎并牺牲一名无辜者，因为善良意志就是追求最大多数人的最大幸福。”（0 / 15 分）",
        fatalFlawPointDE: "Gleichsetzung von Folgenbilanz und Maximenpruefung sowie Umdeutung des guten Willens in ein Nutzenstreben (0 Notenpunkte).",
        fatalFlawPointZH: "把后果计算等同于准则检验，并把善良意志偷换为逐利意志（直接判 0 分）。",
        examinerVerdictDE: "Klausur-Regel: Utilitarismus und Pflichtethik folgen entgegengesetzten Prueflogiken (Folgenbilanz vs. Maximenpruefung). Wer beide Positionen in einer Nutzenformel verschmilzt, verfehlt beide Theorien und erhaelt 0 NP: Der gute Wille ist kein Nutzenwille, und die Zweckformel verbietet die Verrechnung von Menschenleben.",
        examinerVerdictZH: "阅卷规则：功利主义与义务论遵循相反的检验逻辑（后果损益 vs 准则检验）。把两者熔于一炉写成效用公式即双双丢失：善良意志不是逐利意志，目的公式禁止把人命拿来加减。",
        diagnosticOptions: [
          {
            id: "diag-correct",
            textDE: "Verwechslung der Prueflogiken: Der Satz ersetzt Kants Maximenpruefung durch eine Folgenbilanz und deutet den guten Willen in ein Nutzenstreben um.",
            textZH: "混淆了检验逻辑：该句用后果损益替换了康德的准则检验，并把善良意志曲解为对效用的追求。",
            isCorrect: true,
            explanationDE: "Diagnose exakt richtig: Der Satz vermengt Teleologie mit Deontologie. Utilitarismus prueft Folgenbilanzen, Kant prueft die Verallgemeinerbarkeit der Maxime und verbietet die Instrumentalisierung, unabhaengig vom erhofften Nutzen. Der gute Wille bedeutet Handeln aus Pflicht, nicht Streben nach maximalem Glueck.",
            explanationZH: "诊断正确：该答卷把后果论与义务论混为一谈。功利主义检验后果损益表，康德检验准则的可普遍化并禁止工具化，且善良意志指纯粹出于义务而行动，而非追求最大幸福。"
          },
          {
            id: "diag-distractor-1",
            textDE: "Kant wuerde die Notluege im Weichenfall ausnahmsweise billigen, weil die Rettung von fuenf Leben die Achtung der Menschenwuerde des Einzelnen automatisch miterfuellt.",
            textZH: "康德会在电车案中破例允许说谎与牺牲，因为拯救五人自动就实现了对个体的尊严尊重。",
            isCorrect: false,
            explanationDE: "Fehldeutung: Kant verbietet die Notluege gerade deshalb, weil die Maxime des Luagens als allgemeines Gesetz sich selbst widerspricht. Die Zweckformel untersagt, einen Unbeteiligten gezielt als blosses Mittel zu gebrauchen, auch wenn dadurch mehrere Leben gerettet wuerden.",
            explanationZH: "误读：康德恰恰禁止说谎，因为说谎的准则一旦普遍化会在逻辑上自我瓦解；目的公式禁止把无辜者仅仅当作手段，即使能救更多人。"
          },
          {
            id: "diag-distractor-2",
            textDE: "Mill wuerde die Umstellung der Weiche allein danach beurteilen, ob der Weichensteller persoenlich Schuldgefuehle vermeidet und sein eigenes Gewissen beruhigt.",
            textZH: "密尔只会根据扳道工本人能否避免内疚、让自己良心安稳来评判是否应该扳道岔。",
            isCorrect: false,
            explanationDE: "Fehldeutung: Mills qualitativer Hedonismus verlangt Unparteilichkeit und die Einbeziehung aller Betroffenen; er ist kein Egoismus des Handelnden. Die Pruefung lautet, ob die Handlung das Gesamtglueck unter Beruecksichtigung hoeherer geistiger Gueter maximiert, nicht ob sie dem Akteur privat nuetzt.",
            explanationZH: "误读：密尔的质性快乐主义要求不偏不倚地计入所有受影响者的苦乐，属于普遍主义而非自利；检验标准是总体幸福是否最大化，而非行动者个人是否获利。"
          }
        ]
      },
      klpTermini: [
        {
          termDE: "Konsequentialismus",
          definitionDE: "Utilitaristische Prueflogik: Richtig ist, was das Gesamtglueck aller Betroffenen maximiert (Folgen-, Utilitaets- und universales Prinzip).",
          termZH: "后果论",
          definitionZH: "功利主义检验逻辑：对所有受影响者总体幸福最大化的行为才是正当的。"
        },
        {
          termDE: "Maxime",
          definitionDE: "Subjektiver Handlungsgrundsatz bei Kant; sie muss den Universalisierungstest bestehen, sonst ist die Handlung pflichtwidrig.",
          termZH: "准则",
          definitionZH: "康德处的主观行动原则；必须通过普遍化检验，否则行为违反义务。"
        },
        {
          termDE: "Universalisierung",
          definitionDE: "Kategorischer Imperativ, erste Formel: Handle nur nach einer Maxime, die zugleich allgemeines Gesetz werden kann; Notluege scheitert am Selbstwiderspruch.",
          termZH: "普遍化检验",
          definitionZH: "绝对命令第一公式：只依能同时成为普遍法则的准则行动；说谎准则自我瓦解。"
        },
        {
          termDE: "Zweckformel",
          definitionDE: "Kategorischer Imperativ, zweite Formel: Behandle die Menschheit jederzeit zugleich als Zweck, niemals bloss als Mittel; gezielte Opferung verletzt sie.",
          termZH: "目的公式",
          definitionZH: "绝对命令第二公式：任何时候把人同时当目的、绝不只当手段；主动牺牲直接违反它。"
        },
        {
          termDE: "Menschenwuerde",
          definitionDE: "Unverrechenbarer Wert der Person; begrenzt im eroerternden Urteil die rein quantitative Nutzenbilanz.",
          termZH: "人的尊严",
          definitionZH: "人格不可计价的价值；在评价判断中限制纯粹数量化的效用计算。"
        }
      ],
      fehlerquellen: [
        {
          trapTitleDE: "Folgenbilanz gleich Maximenpruefung",
          trapDescriptionDE: "Kants Maximenpruefung wird durch eine Folgenbilanz ersetzt und beide Theorien in einer Nutzenformel verschmolzen; verfehlt beide Theorien (0 NP).",
          trapDescriptionZH: "用后果损益替换康德的准则检验，把两者熔于一炉写成效用公式，双双丢失。",
          howToAvoidDE: "Teleologie und Deontologie strikt trennen: Utilitarismus prueft Folgenbilanzen, Kant prueft Verallgemeinerbarkeit plus Zweckformel."
        },
        {
          trapTitleDE: "Guter Wille als Nutzenstreben",
          trapDescriptionDE: "Der gute Wille (Handeln aus Pflicht) wird in Streben nach maximalem Glueck umgedeutet; Mill wird zum Egoismus des Akteurs verkuerzt.",
          trapDescriptionZH: "把善良意志曲解为对最大幸福的追求，把密尔降格为行动者自利。",
          howToAvoidDE: "Guter Wille bedeutet Handeln aus Pflicht, nicht Gluecksmaximierung; Mill verlangt Unparteilichkeit gegenueber allen Betroffenen."
        },
        {
          trapTitleDE: "Kant billigt die Notluege",
          trapDescriptionDE: "Kant wuerde im Weichenfall ausnahmsweise Luege und Opferung billigen, weil fuenf gerettete Leben die Wuerde des Einzelnen miterfuellten.",
          trapDescriptionZH: "认为康德会在电车案中破例允许说谎与牺牲，因为救五人自动实现尊严。",
          howToAvoidDE: "Maxime der Notluege scheitert am Universalisierungstest; die Zweckformel untersagt Instrumentalisierung auch bei groesserem Nutzen."
        }
      ],
      klausurSatz15NP: {
        musterSatzDE: "Zwar spricht aus utilitaristischer Sicht (Mill) die Minimierung des Gesamtleids fuer die Umstellung der Weiche, dennoch verbietet die kantische Zweckformel die gezielte Opferung eines Unbeteiligten als blosses Mittel, sodass im eroerternden Urteil die Achtung der Menschenwuerde die rein quantitative Nutzenbilanz begrenzt.",
        operator: "eroertern",
        scoringKeywords: [
          "Konsequentialismus",
          "Nutzenbilanz",
          "Qualitativer Hedonismus",
          "Maxime",
          "Universalisierung",
          "Zweckformel",
          "Menschenwuerde"
        ],
        explanationZH: "（先以密尔后果损益承认救五人的分量，再以康德目的公式与普遍化检验论证主动牺牲的不可允许性，最后以人的尊严为准绳作出有保留的权衡判断。）"
      },
      socraticProbes: [
        {
          questionDE: "Soll die Fahrerin die Weiche aktiv umstellen und einen Unbeteiligten opfern, um fuenf zu retten?",
          questionZH: "司机是否应该主动扳道岔、牺牲一人去救五人？",
          counterPerspectiveDE: "Der Fall spaltet zwei Prueflogiken: Der Utilitarismus bilanziert Folgen, Kant prueft Maxime und Menschenwuerde unabhaengig vom Nutzen."
        },
        {
          questionDE: "Begrenzt die Achtung der Menschenwuerde die rein quantitative Nutzenbilanz?",
          questionZH: "人的尊严是否限制纯粹数量化的效用计算？",
          counterPerspectiveDE: "Im eroerternden Urteil begrenzt die Wuerde die Zahl: Menschenleben lassen sich nicht aufrechnen, auch nicht bei eindeutiger Zahlenlage."
        }
      ]
    }
  },

  // 13. Sachtextanalyse: Argumentation und Leserlenkung (Deutsch)
  {
    id: "deutsch-sachtextanalyse-argumentation",
    canonicalTitle: "Sachtextanalyse: Argumentation und Leserlenkung",
    fach: "Deutsch",
    matchKeywords: [
      "sachtextanalyse",
      "argumentation",
      "argumentationsgang",
      "konzession",
      "kontrast",
      "mittelweg",
      "metapher",
      "appell",
      "leserlenkung",
      "beleg",
      "zeilenangabe",
      "wirkung",
      "intention",
      "these",
      "deutungshypothese"
    ],
    data: {
      topicTitle: "Sachtextanalyse: Argumentation und Leserlenkung",
      fach: "Deutsch",
      intuitionDilemma: {
        scenarioDE: "Zwei Plaene liegen auf dem Tisch. Plan 1: Text treu nacherzaehlen, am Ende zustimmen. Plan 2: These und Gang sichern, zwei Stellen mit Zeile und Wirkung belegen.",
        scenarioZH: "桌上有两个方案。方案一：忠实复述内容，结尾表态赞同。方案二：锁定论点与论证链，用两处带行号和效果的引证支撑。",
        questionDE: "Deine Banknachbarin schreibt morgen die Klausur zum Uebungstext \"Pause vom Bildschirm?\". Welche Strategie waehlst du?",
        questionZH: "你的同桌明天要考练习文本《Pause vom Bildschirm?》。你选哪种策略？",
        choiceA: {
          id: "A",
          textDE: "Ich fasse den Inhalt treu zusammen und schreibe am Ende, dass ich zustimme.",
          textZH: "我把内容忠实复述一遍，结尾写一句我表示赞同。",
          reactionDE: "Verstaendlich, aber Klausur-sicht riskant: Wer nur den Inhalt nacherzaehlt, liefert eine Inhaltsangabe (AFB I). Der Operator analysieren verlangt zusaetzlich: Gang + Mittel + Beleg + Zeile + Wirkung.",
          reactionZH: "可以理解，但考场上危险：只复述内容等于写 Inhaltsangabe（AFB I）。analysieren 要求额外给出：论证链+语言手段+引证+行号+效果判断。"
        },
        choiceB: {
          id: "B",
          textDE: "Ich sichere These und Gang und belege zwei Stellen mit Zeile und Wirkung.",
          textZH: "我先锁定论点与论证链，并用两处带行号和效果判断的引证支撑。",
          reactionDE: "Produktiv: Wer These, Gang und zwei Stellen mit Zeile plus Wirkung sichert, baut das Geruest einer Analyse (AFB II). Die kurze Stellungnahme folgt erst danach (Aufgabenart II).",
          reactionZH: "有建设性：先锁定论点、论证链和两处带行号+效果的证据，就搭好了分析骨架（AFB II）。简短表态只放在最后（Aufgabenart II 权重）。"
        },
        mechanismTakeawayDE: "Sachtextanalyse misst nicht Nacherzaehlen, sondern Nachweisen: Einleitung (3 Saetze) -> Gang (Konzession -> Gegenbeweis -> Mittelweg) -> Sprache (Mittel + Beleg + Zeile + Wirkung) -> kurze Stellungnahme. Jede These ohne Zeile zaehlt AFB I.",
        mechanismTakeawayZH: "议论文分析考的不是复述而是举证：3句导言 -> 论证链（让步->反驳->折中） -> 语言（手段+引证+行号+效果） -> 简短表态。任何无行号的判断一律按 AFB I 计分。",
        klpCoreLogicDE: "NRW KLP Deutsch, IF Texte (pragmatische Texte): Argumentationsgang + Leserlenkung + Intention analysieren (AFB II, Operatoren analysieren / deuten); Einleitung in 3 Saetzen (Autor/Jahr/Titel/Textsorte/These); jede Aussage mit Beleg + Zeile + Wirkung.",
        klpCoreLogicZH: "NRW 考纲 Deutsch，IF Texte（实用文）：论证思路+读者引导+写作意图是 AFB II 分析主体（操作动词 analysieren / deuten）；导言限3句（作者/年份/标题/文体/论点）；每个判断必须带引证+行号+效果。"
      },
      mentalModelAnalogy: {
        analogyTitle: "Der Indizienprozess: Ohne Beweismittel keine Verurteilung",
        explanationDE: "Sachtextanalyse misst nicht Nacherzaehlen, sondern Nachweisen: Einleitung (3 Saetze) -> Gang (Konzession -> Gegenbeweis -> Mittelweg) -> Sprache (Mittel + Beleg + Zeile + Wirkung) -> kurze Stellungnahme. Jede These ohne Zeile zaehlt AFB I.",
        explanationZH: "议论文分析考的不是复述而是举证：3句导言 -> 论证链（让步->反驳->折中） -> 语言（手段+引证+行号+效果） -> 简短表态。任何无行号的判断一律按 AFB I 计分。"
      },
      konzeptPuzzle: {
        instructionDE: "Ordne jeder Analyse-Regel den typischen Regelbruch und die Klausur-Konsequenz zu:",
        instructionZH: "将每条分析铁律与典型违规写法及考场结论配对：",
        pairs: [
          {
            id: "pair-1",
            premiseDE: "Analyse-Regel: Jede Deutung braucht Beleg + Zeile",
            premiseZH: "分析铁律：每个解读都必须有引证+行号",
            realityTermDE: "Bruch: Paraphrase statt Nachweis",
            realityDE: "Leere Behauptung ohne Stelle (nur Paraphrase, keine Zeile)",
            realityZH: "无出处空断言（只改写内容，不给行号）",
            consequenceDE: "Klausur: Wer die Metapher Werkzeug (Z. 8) oder den Appell plant / prueft (Z. 10) mit Zeile zitiert, sichert AFB II-Punkte; wer nur behauptet, faellt auf AFB I zurueck.",
            consequenceZH: "考场结论：引用隐喻 Werkzeug（Z. 8）或呼吁 plant/prueft（Z. 10）并标行号，才能拿到 AFB II 分；空断言一律掉回 AFB I。"
          },
          {
            id: "pair-2",
            premiseDE: "Analyse-Regel: Jedes Mittel braucht eine Wirkungsaussage",
            premiseZH: "分析铁律：每个手段都必须有效果判断",
            realityTermDE: "Bruch: Benennen statt Deuten",
            realityDE: "Etikett ohne Wirkung (nur Metapher / Anapher benennen, nichts deuten)",
            realityZH: "贴标签无效果（只命名隐喻/排比，不解读作用）",
            consequenceDE: "Klausur: Erst verdeutlicht / suggeriert / appelliert an + Leserichtung (z. B. zur Selbststeuerung) macht aus der Stilbeobachtung eine Analyse der Leserlenkung.",
            consequenceZH: "考场结论：只有加上 verdeutlicht/suggeriert/appelliert an + 读者被推向何处（如推向自我管理），风格观察才升级为读者引导分析。"
          },
          {
            id: "pair-3",
            premiseDE: "Analyse-Regel: Der Gang traegt die These (Konzession -> Gegenbeweis -> Loesung)",
            premiseZH: "分析铁律：论证链托起论点（让步->反驳->方案）",
            realityTermDE: "Bruch: Referat statt Gang",
            realityDE: "Reine Inhaltsangabe (Stationen referieren, keine Funktion bestimmen)",
            realityZH: "纯内容复述（罗列情节，不定段落功能）",
            consequenceDE: "Klausur: Die Abfolge Z. 2 (Konzession) -> Z. 4-5 (Kontrast) -> Z. 7 (Mittelweg) zeigt, wie der Text zum Urteil fuehrt; ohne Gang bleibt die These eine Behauptung.",
            consequenceZH: "考场结论：Z. 2（让步）->Z. 4-5（对照）->Z. 7（折中）的序列展示了文本如何导向结论；无链条则论点只是断言。"
          },
          {
            id: "pair-4",
            premiseDE: "Analyse-Regel: Deutungshypothese aufstellen und am Schluss pruefen",
            premiseZH: "分析铁律：开头立阐释假设，结尾验证修正",
            realityTermDE: "Bruch: Werten statt Untersuchen",
            realityDE: "These raten oder Analyse mit Eroerterung verwechseln (sofort werten statt zu untersuchen)",
            realityZH: "猜论点或把分析与议论搞混（上来就站队，不拆文本）",
            consequenceDE: "Klausur: Die Hypothese (Training statt Verbot) ordnet die Lektuere und wird im Schlusssatz bestaetigt oder relativiert; sie ersetzt aber keinen Beleg.",
            consequenceZH: "考场结论：假设（训练而非禁令）为阅读定向，结尾验证或修正；但它代替不了任何引证。"
          }
        ]
      },
      examTrapCorrection: {
        studentAnswerDE: "Der Text handelt von Handys in der Schule. Der Autor findet ein Totalverbot falsch und will Regeln. Am Anfang geht es um unkonzentrierte Jugendliche, in der Mitte um Recherche, am Ende um Selbststeuerung. Ich finde das auch gut, weil Verbote nerven. (0 / 15 NP)",
        studentAnswerZH: "“这篇文章讲学校里的手机。作者认为全面禁止不对，想要规矩。开头讲不专心的青少年，中间讲检索，结尾讲自我管理。我也觉得对，因为禁令很烦。（0 / 15 NP）”",
        fatalFlawPointDE: "Jede analytische Aussage braucht Beleg + Zeile + Wirkung; ohne diesen Dreischritt bleibt alles Referat.",
        fatalFlawPointZH: "每个分析判断都必须带引证+行号+效果三件套；缺此三步，一律按复述判分。",
        examinerVerdictDE: "0 / 15 NP. Reine Inhaltsangabe (AFB I) statt Analyse (AFB II): kein Beleg mit Zeile, kein benanntes Mittel, keine Wirkungsaussage, kein Gang. Die Operatoren analysieren und deuten sind nicht bedient; die angehaengte Meinung erfuellt nicht die Aufgabenart II.",
        examinerVerdictZH: "0 / 15 NP。纯内容复述（AFB I）代替分析（AFB II）：无带行号引证、无命名的语言手段、无效果判断、无论证链。analysieren / deuten 两个操作动词均未落实；末尾的个人 opinion 不符合 Aufgabenart II 的篇幅权重。",
        diagnosticOptions: [
          {
            id: "diag-correct",
            textDE: "Die Antwort bleibt auf der Ebene der Inhaltswiedergabe: Sie referiert Positionen, ohne Textstellen mit Zeilenangabe zu belegen und ohne sprachliche Mittel auf ihre lenkende Wirkung zu befragen.",
            textZH: "该答案停留在内容复述层面：转述了文中观点，但没有用带行号的文本证据支撑，也没有追问任何语言手段的引导效果。",
            isCorrect: true,
            explanationDE: "Korrekt: Die Analyse bleibt im Referat (AFB I) stehen. Es fehlen Textsorte/These-Einleitung, der Gang (Konzession -> Gegenbeweis -> Mittelweg), jede Belegstelle mit Zeile sowie jede Wirkungsaussage zur Leserlenkung. Analyse verlangt: Befund + Beleg + Zeile + Wirkung.",
            explanationZH: "正确：该答案停留在复述层（AFB I）。缺3句导言、缺论证链（让步->反驳->折中）、缺一切带行号的引证、缺一切读者引导效果判断。分析要求：发现+引证+行号+效果，四件套缺一即按复述判分。"
          },
          {
            id: "diag-distractor-1",
            textDE: "Der entscheidende Mangel liegt darin, dass die eigene Stellungnahme fehlt: Eine fruehe und ausfuehrliche Pro-und-contra-Abwaegung haette die Antwort gerettet, weil die persoenliche Position das eigentliche Analyseziel darstellt.",
            textZH: "关键缺陷在于缺少个人表态：一开始就展开详尽的利弊权衡即可挽救该答案，因为个人立场才是本次分析的真正目标。",
            isCorrect: false,
            explanationDE: "Falsch: Die Aufgabenart II verlangt zuerst Analyse (AFB II, ca. zwei Drittel) und erst danach ein kurzes eigenes Urteil. Wer die Analyse ueberspringt und sofort wertet, verfehlt den Operator analysieren; die eigene Meinung ersetzt keinen Befund mit Beleg und Zeile.",
            explanationZH: "错误： Aufgabenart II 要求先分析（AFB II，约三分之二篇幅）再简短表态。跳过分析直接站队，等于用观点代替了带引证的发现，判分时分析部分得零分。"
          },
          {
            id: "diag-distractor-2",
            textDE: "Der entscheidende Mangel liegt darin, dass keine Deutungshypothese am Anfang formuliert wurde: Ein einleitender Satz ueber die vermutete Textabsicht haette ausgereicht, um die gesamte Analyse als vollstaendig gelten zu lassen.",
            textZH: "关键缺陷在于开头没有写阐释假设：只要在导言加一句对文本意图的猜测，整个分析即可视为完整。",
            isCorrect: false,
            explanationDE: "Falsch: Eine knappe Deutungshypothese gehoert in die Einleitung (Ankuendigung) und wird am Schluss geprueft; sie ersetzt aber weder den Gang noch Beleg + Zeile + Wirkung. Die Hypothese ordnet, sie beweist nicht.",
            explanationZH: "错误：阐释假设只属于导言的预告、结尾的验证环节，它负责定向但不能代替论证链和引证+行号+效果。假设是地图，不是证据。"
          }
        ]
      },
      klpTermini: [
        {
          termDE: "Argumentationsgang",
          definitionDE: "Tragende Abfolge der These: Konzession zu Gegenbeweis zu Mittelweg; ohne Gang bleibt jede These eine blosse Behauptung.",
          termZH: "论证链",
          definitionZH: "托起论点的序列：让步到反驳到折中；无链条则论点只是断言。"
        },
        {
          termDE: "Konzession",
          definitionDE: "Eingestaendnis der Gegenposition (hier: Sorge der Erwachsenen), das die eigene Loesung erst glaubwuerdig und abwaegend wirken laesst.",
          termZH: "让步",
          definitionZH: "先承认对方立场的合理处，再推出己方方案，使论证显得权衡而可信。"
        },
        {
          termDE: "Metapher",
          definitionDE: "Bildlicher Ausdruck (hier: Ablenker vs. Werkzeug), dessen Analyse erst durch Beleg mit Zeile plus Wirkungsaussage zur Leserlenkung vollstaendig wird.",
          termZH: "隐喻",
          definitionZH: "形象化表达；只有配上带行号的引证与读者引导效果判断，分析才完整。"
        },
        {
          termDE: "Appell",
          definitionDE: "Direkte Aufforderung an die Leser (hier: plant / prueft), die zur Selbststeuerung statt zum Totalverbot lenkt.",
          termZH: "呼吁",
          definitionZH: "直接号召读者行动，把读者推向自我管理而非全面禁令。"
        },
        {
          termDE: "Leserlenkung",
          definitionDE: "Gesamtwirkung aller Mittel auf die Leserhaltung; Kern des Operators analysieren im AFB II (Befund plus Beleg plus Zeile plus Wirkung).",
          termZH: "读者引导",
          definitionZH: "一切手段对读者态度的总体引导效果；analysieren操作动词在AFB II的核心（发现+引证+行号+效果）。"
        }
      ],
      fehlerquellen: [
        {
          trapTitleDE: "Referat statt Analyse",
          trapDescriptionDE: "Reine Inhaltsangabe mit angehaengter Meinung: kein Beleg mit Zeile, kein benanntes Mittel, keine Wirkungsaussage, kein Gang; Operator analysieren nicht bedient.",
          trapDescriptionZH: "纯内容复述加个人感想：无行号引证、无命名的语言手段、无效果判断、无链条。",
          howToAvoidDE: "Jede analytische Aussage im Dreischritt Beleg plus Zeile plus Wirkung formulieren; ohne diesen Dreischritt bleibt alles Referat."
        },
        {
          trapTitleDE: "Benennen statt Deuten",
          trapDescriptionDE: "Mittel werden nur etikettiert (Metapher, Anapher), aber nicht auf ihre lenkende Wirkung befragt; Stilbeobachtung ohne Leserbezug bleibt AFB I.",
          trapDescriptionZH: "只贴标签不解读：点出隐喻排比之名，不追问其引导效果。",
          howToAvoidDE: "Hinter jedes Mittel sofort verdeutlicht / suggeriert / appelliert an plus Leserichtung setzen."
        },
        {
          trapTitleDE: "Eroertern statt Analysieren",
          trapDescriptionDE: "Freie Pro-und-contra-Abwaegung zum Sachproblem (AFB III) ersetzt die Textanalyse; weder Gang noch ein einziges Mittel mit Beleg plus Zeile plus Wirkung.",
          trapDescriptionZH: "用自由议论代替文本分析：权衡手机禁令利弊，却不拆论证链、不做引证。",
          howToAvoidDE: "Aufgabenart II verlangt zuerst Analyse (ca. zwei Drittel), erst danach ein kurzes eigenes Urteil."
        }
      ],
      klausurSatz15NP: {
        musterSatzDE: "Zwar gesteht der Text die Sorge der Erwachsenen in einer Konzession zu (Z. 2: verstaendlich, aber einseitig), dennoch fuehrt der Argumentationsgang ueber den Kontrast in Z. 4-5 zum Mittelweg in Z. 7; die Metapher Ablenker vs. Werkzeug (Z. 8) verdeutlicht diese Wende und der Appell in Z. 10 (plant / prueft) lenkt die Leser konsequent zur Selbststeuerung statt zum Totalverbot.",
        operator: "analysieren",
        scoringKeywords: [
          "Argumentationsgang",
          "Konzession",
          "Kontrast",
          "Mittelweg",
          "Metapher",
          "Appell",
          "Leserlenkung",
          "Beleg",
          "Zeile",
          "Wirkung",
          "Intention",
          "These"
        ],
        explanationZH: "（先让步承认担忧可理解，再以对照与隐喻论证折中方案，最后以呼吁收束：每个修辞判断都回扣行号与读者引导效果。）"
      },
      socraticProbes: [
        {
          questionDE: "Reicht es, den Inhalt treu zusammenzufassen und am Ende zuzustimmen?",
          questionZH: "把内容忠实复述一遍、结尾写一句赞同就够了吗？",
          counterPerspectiveDE: "Reines Nacherzaehlen liefert eine Inhaltsangabe (AFB I); der Operator analysieren verlangt zusaetzlich Gang plus Mittel plus Beleg plus Zeile plus Wirkung."
        },
        {
          questionDE: "Beweist der Text mit seiner Eingangswarnung ein flaechendeckendes Totalverbot als einzige Konsequenz?",
          questionZH: "仅凭文本开头的警告就能证明全面禁令是唯一结论吗？",
          counterPerspectiveDE: "Einseitige Lektuere unterschlaegt Konzession (Z. 2), Gegenbeweis (Z. 4-5) und Mittelweg (Z. 7); Metaphern und Appell sind als Leserlenkung zu deuten."
        }
      ]
    }
  },

  // 14. Political Speech: Rhetoric and Comment (Englisch)
  {
    id: "political-speech-rhetoric-mlk",
    canonicalTitle: "Political Speech: Rhetoric and Comment (MLK, I Have a Dream)",
    fach: "Englisch",
    matchKeywords: [
      "political speech",
      "rhetoric",
      "rhetorical triad",
      "logos",
      "ethos",
      "pathos",
      "anaphora",
      "antithesis",
      "metaphor",
      "promissory note",
      "i have a dream",
      "martin luther king",
      "comment",
      "de jure",
      "civil rights"
    ],
    data: {
      topicTitle: "Political Speech: Rhetoric and Comment (MLK, I Have a Dream)",
      fach: "Englisch",
      intuitionDilemma: {
        scenarioDE: "Beim Stadtfest loest du einen 100-Euro-Geschenkgutschein ein. Die Kasse stempelt ihn mit ungedeckter Scheck, waehrend der Inhaber sichtbar im Ueberfluss lebt.",
        scenarioZH: "你拿着一张100欧提货券去百年老店兑现，店员盖上“资金不足、拒不兑现”，而店主天天山珍海味。你手里的券还算数吗？",
        questionDE: "Welche argumentative Funktion erfuellt das Finanzbild vom uneingeloesten Schuldschein (promissory note / bad check)?",
        questionZH: "“未兑现的期票 / 空头支票”这一金融意象在论证中承担什么功能？",
        choiceA: {
          id: "A",
          textDE: "A) Es handelt sich um rein dekorativen Bildschmuck: Die Finanzbilder machen die Rede lediglich anschaulicher und feierlicher.",
          textZH: "A) 这只是装饰性点缀：金融意象让演讲更生动、更庄重，除此之外没有论证功能。",
          reactionDE: "Nachvollziehbarer erster Impuls aus dem Alltag: Schmuck klingt nach Verzierung. Doch im Redekontext des Jahres 1963 greift diese Lesart zu kurz: Ein unbezahlter Schuldschein ist im amerikanischen Verstaendnis kein Dekor, sondern ein einklagbarer Rechtsbruch.",
          reactionZH: "从日常语感看很自然的判断：比喻似乎只是装饰。但放在1963年民权语境中远远不够：在美国契约文化里，一张被拒付的期票不是修辞点缀，而是一项可追索的法律违约指控。"
        },
        choiceB: {
          id: "B",
          textDE: "B) Es handelt sich um eine einklagbare Anklage: Die Verfassung wird als faelliger Schuldschein definiert, dessen Nichteinloesung einen Verfassungsbruch darstellt.",
          textZH: "B) 这是一项可追索的指控：宪法被定义为到期应付的期票，拒不兑现即构成对建国契约的违背。",
          reactionDE: "Genau diese Spur trifft die Konstruktionslogik der Rede: Die Verfassung wird als einklagbarer Schuldschein definiert, ihre Nichterfuellung als Rechtsbruch. Damit wird Gleichberechtigung von einer erbetenen Konzession in eine faellige Schuld verwandelt.",
          reactionZH: "这一判断切中演讲的构造逻辑：宪法被定义为可强制兑现的期票，拒不兑现即构成违约。平等权利由此从“请求赐予的恩惠”转化为“逾期未偿的债务”。"
        },
        mechanismTakeawayDE: "King transponiert das Verfassungsversprechen in die Sprache des Handelsrechts: Wer Buergerrechte verweigert, begeht keinen Stilbruch, sondern einen Vertragsbruch gegen den Gruendungsvertrag der Republik.",
        mechanismTakeawayZH: "金将宪法承诺平移进商法语言：拒绝民权不是风格问题，而是对共和国建国契约的违约。金融隐喻把道德诉求转化为法律硬债务，直接击中保守派白人的契约信仰。",
        klpCoreLogicDE: "Rhetorische Triade (Logos: Verfassungsvertrag -> Ethos: Lincoln und Kanzelautoritaet -> Pathos: Ketten und leere Versprechen); Aufgabenart 1.1: Summary -> Analysis -> Comment.",
        klpCoreLogicZH: "亚里士多德修辞三角（Logos宪法契约 -> Ethos林肯与牧师权威 -> Pathos锁链与空头承诺）；NRW英语会考题型1.1：概括 -> 修辞分析 -> 评论。"
      },
      mentalModelAnalogy: {
        analogyTitle: "Vom Bittsteller zum Glaeubiger: Die Anklage als faelliger Schuldschein",
        explanationDE: "King transponiert das Verfassungsversprechen in die Sprache des Handelsrechts: Wer Buergerrechte verweigert, begeht keinen Stilbruch, sondern einen Vertragsbruch gegen den Gruendungsvertrag der Republik.",
        explanationZH: "金将宪法承诺平移进商法语言：拒绝民权不是风格问题，而是对共和国建国契约的违约。金融隐喻把道德诉求转化为法律硬债务，直接击中保守派白人的契约信仰。"
      },
      konzeptPuzzle: {
        instructionDE: "Ordne jedem rhetorischen Mittel seine psychologische Umwandlungsfunktion und die Klausur-Konsequenz zu:",
        instructionZH: "将每种修辞手段与其心理转化功能及考场结论配对：",
        pairs: [
          {
            id: "pair-1",
            premiseDE: "Anapher: One hundred years later (vierfach) / I have a dream (achtfach)",
            premiseZH: "首语从复：One hundred years later（四叠）/ I have a dream（八叠）",
            realityDE: "Repetitive Syntax im Call-and-response-Rhythmus steigert die emotionale Wucht mit jeder Wiederholung (Pathos).",
            realityZH: "重复句式按黑人教堂呼应节奏逐层推高情感烈度（Pathos），每一次重复都是一次情感加压。",
            consequenceDE: "Klausur: Rhythmisches Crescendo im Kanzelstil erzeugt kollektive Mobilisierung und markiert den Umschlag von Klage in Vision.",
            consequenceZH: "考场结论：布道式节奏渐强实现情感总动员，标志演讲从控诉向愿景的转折，是Pathos的核心引擎。"
          },
          {
            id: "pair-2",
            premiseDE: "Erweiterte Finanzmetapher: promissory note / bad check / insufficient funds / bank of justice",
            premiseZH: "扩展金融隐喻：promissory note / bad check / insufficient funds / bank of justice",
            realityDE: "Kommerzialisierung der Menschenwuerde: Appell an die amerikanische Vertragsmoral entwaffnet konservative Gegner (Logos).",
            realityZH: "将人的尊严转译为美国人不可侵犯的商业信誉：拒付即欺诈，直接卸下保守派白人的道德心防（Logos）。",
            consequenceDE: "Klausur: Verlegt den Streit von Geschmack auf Recht; Segregation wird als Verfassungsbruch justiziabel.",
            consequenceZH: "考场结论：把争论从好恶之争转为契约之争，种族隔离被定性为可追责的宪政违约，这是Logos的核心杀招。"
          },
          {
            id: "pair-3",
            premiseDE: "Antithese: beacon light of hope / joyous daybreak vs. flames of injustice / long night of captivity",
            premiseZH: "对偶对照：beacon light of hope / joyous daybreak 对 flames of injustice / long night of captivity",
            realityDE: "Schroffer Hell-Dunkel-Kontrast erzeugt dramatische moralische Eindeutigkeit ohne Grauzone.",
            realityZH: "黑白分明的善恶对决制造不容骑墙的道德戏剧张力，听众被迫选边。",
            consequenceDE: "Klausur: Biblische Licht-Finsternis-Typologie stilisiert Emanzipation als Exodus und Segregation als moralische Finsternis.",
            consequenceZH: "考场结论：圣经式光明与黑暗对立把解放宣言升格为出埃及式神圣解放，把隔离钉死在道德黑暗面。"
          },
          {
            id: "pair-4",
            premiseDE: "Anspielung: Five score years ago (Gettysburg) / Emancipation Proclamation (1863)",
            premiseZH: "典故：Five score years ago（葛底斯堡演说）/ 1863解放宣言",
            realityDE: "Entlehnung der Gruendervater-Autoritaet und der Kanzelwuerde verleiht dem Redner unantastbares Ethos.",
            realityZH: "借用国父林肯的神圣性与先知牧师的讲坛威望，为演讲者加冕不可质疑的道德权威（Ethos）。",
            consequenceDE: "Klausur: Autoritaetstransfer von Lincoln auf King; Angriff auf Segregation wird Verteidigung des Gruendervaters.",
            consequenceZH: "考场结论：权威转移——林肯的威望直接过户给金；攻击隔离者反而成了背叛国父的人，这是Ethos的基石。"
          }
        ]
      },
      examTrapCorrection: {
        studentAnswerDE: "King uses many metaphors, anaphoras and repetitions in his speech. For example there are chains, a bad check and the phrase I have a dream. This makes the speech very vivid and impressive. (0 / 15 NP)",
        studentAnswerZH: "0-NP-Fall: Namen nennen ohne Funktion.",
        fatalFlawPointDE: "Aufzaehlung ohne Wirkungsanalyse: Die Antwort benennt Geraete, erklaert aber keinen einzigen psychologischen Umwandlungsmechanismus und liefert keinen Zeilenbeleg.",
        fatalFlawPointZH: "报菜名式罗列：点出修辞名称，却无任何心理转化链、无行号引文、无受众效果，属于典型低分万能废话。",
        examinerVerdictDE: "Klausur-Regel: Reine Aufzaehlung von Stilmitteln ohne Funktionsanalyse bleibt auf AFB I stehen. Gefordert sind praeziser Textbeleg mit Zeilenangabe, Wirkungsmechanismus (Logos/Ethos/Pathos) und Publikumsbezug. Task 1 (Summary) darf zudem keine Wertung enthalten.",
        examinerVerdictZH: "只罗列修辞名称不分析心理转化功能，最多拿AFB I分。必须给出精确行号引文、作用机制与受众效果；Task 1概括部分严禁掺入评价。",
        diagnosticOptions: [
          {
            id: "diag-correct",
            textDE: "Die Antwort zaehlt Stilmittel lediglich auf und erklaert deren argumentative Umwandlungsfunktion nicht: Weder Zeilenbeleg noch Logos-Ethos-Pathos-Mechanismus noch Publikumsbezug werden entfaltet.",
            textZH: "该答案只是罗列修辞名称，完全没有展开其论证转化功能：既无行号引文，也无修辞三角机制，更无受众效果分析。",
            isCorrect: true,
            explanationDE: "Diagnose exakt richtig. Der Erwartungshorizont verlangt Beleg plus Funktion plus Wirkung; das Pauschalurteil vivid and impressive erfuellt keinen einzigen AFB-II-Deskriptor.",
            explanationZH: "诊断正确。评分细则要求引文+机制+效果三件套，vivid and impressive类万能套话一条AFB II踩分点都拿不到。"
          },
          {
            id: "diag-distractor-1",
            textDE: "Der zentrale Fehler liegt in der Verwechslung von Metapher und Simile: Der Pruefling haette saemtliche Bilder als Vergleiche mit like oder as klassifizieren muessen.",
            textZH: "关键在于隐喻与明喻的区分：考生本应把所有意象都归类为带like/as的明喻，这才是主要的扣分点。",
            isCorrect: false,
            explanationDE: "Falsche Faehrte: Der Text arbeitet fast ausschliesslich mit Metaphern ohne like/as. Die Klassendebatte ist nicht der Hauptpunktabzug.",
            explanationZH: "迷惑项：文本几乎全是无like/as的隐喻，术语归类之争不是主要扣分点，致命伤是缺失功能分析。"
          },
          {
            id: "diag-distractor-2",
            textDE: "Der Pruefling haette die historische Leistung der Rede uneingeschraenkt preisen und auf jede kritische Gegenwartspruefung verzichten muessen, da Kritik als Respektlosigkeit gilt.",
            textZH: "考生本应对演讲无条件歌颂、放弃一切当下批判，因为批评属于不敬。",
            isCorrect: false,
            explanationDE: "Fataler Fehlgedanke: AFB III verlangt gerade die dialektische Pruefung (de jure vs. de facto). Reine Lobhudelei bleibt unter dem Hoechstniveau.",
            explanationZH: "致命误区：AFB III恰恰要求辩证检验（法律层面vs实质层面），无脑吹捧拿不到满分。"
          }
        ]
      },
      klpTermini: [
        {
          termDE: "Promissory note",
          definitionDE: "Erweiterte Finanzmetapher: Die Verfassung als faelliger Schuldschein; Nichterfuellung ist Vertragsbruch, kein Stilbruch.",
          termZH: "期票隐喻",
          definitionZH: "扩展金融隐喻：宪法是到期应付的期票，拒不兑现即违约，而非风格问题。"
        },
        {
          termDE: "Rhetorical triad",
          definitionDE: "Logos (Verfassungsvertrag) plus Ethos (Lincoln- und Kanzelautoritaet) plus Pathos (Ketten-Crescendo); jedes Geraet braucht eine Umwandlungsfunktion.",
          termZH: "修辞三角",
          definitionZH: "Logos契约论证加Ethos权威加冕加Pathos情感动员；每种手段都必须有心理转化功能。"
        },
        {
          termDE: "Anaphora",
          definitionDE: "Syntaktische Wiederholung (One hundred years later, I have a dream) im Call-and-response-Rhythmus als Pathos-Motor der Mobilisierung.",
          termZH: "首语从复",
          definitionZH: "句式重复按呼应节奏推高情感，是情感总动员的引擎。"
        },
        {
          termDE: "Antithesis",
          definitionDE: "Schroffer Hell-Dunkel-Kontrast (beacon light of hope vs. flames of injustice) als biblische Stilisierung von Emanzipation gegen Finsternis.",
          termZH: "对偶对照",
          definitionZH: "光明与黑暗的强烈对立，把解放升格为神圣事业，把隔离钉在道德黑暗面。"
        },
        {
          termDE: "De jure vs. de facto",
          definitionDE: "Dialektischer Massstab des Comments: rechtliche Meilensteine (Civil Rights Act) gegen fortbestehende strukturelle Ungleichheit pruefen.",
          termZH: "法律层面与实质层面",
          definitionZH: "评论的辩证标尺：法律里程碑对照依然存在的结构性不平等。"
        }
      ],
      fehlerquellen: [
        {
          trapTitleDE: "Aufzaehlung ohne Wirkungsanalyse",
          trapDescriptionDE: "Stilmittel werden benannt (chains, bad check, I have a dream), aber kein einziger Umwandlungsmechanismus erklaert und kein Zeilenbeleg geliefert; Pauschalurteil vivid and impressive bleibt AFB I.",
          trapDescriptionZH: "报菜名式罗列修辞名称，无心理转化链、无行号引文，万能套话只值AFB I。",
          howToAvoidDE: "Jedes Geraet im Dreischritt Beleg plus Funktion (Logos/Ethos/Pathos) plus Publikumsbezug entfalten."
        },
        {
          trapTitleDE: "Wertung in der Summary",
          trapDescriptionDE: "Task 1 (Summary) wird mit Lob oder Kritik vermischt, obwohl die Zusammenfassung strikt neutral und ohne Wertung zu bleiben hat.",
          trapDescriptionZH: "Task 1概括混入评价，而概括必须严格中立、无任何价值判断。",
          howToAvoidDE: "Summary, Analysis und Comment sauber trennen (Aufgabenart 1.1); Wertung gehoert nur in den Comment."
        },
        {
          trapTitleDE: "Lobhudelei statt dialektischer Pruefung",
          trapDescriptionDE: "Uneingeschraenktes Preisen der Rede ohne Gegenwartspruefung; AFB III verlangt gerade de jure vs. de facto.",
          trapDescriptionZH: "无条件歌颂演讲、放弃当下检验，而AFB III恰恰要求辩证检验。",
          howToAvoidDE: "Historische Leistung wuerdigen und zugleich strukturelle Defizite der Gegenwart pruefen."
        }
      ],
      klausurSatz15NP: {
        musterSatzDE: "Zwar etablierte King durch die Transposition des Verfassungsversprechens in einen faelligen Schuldschein eine bis heute gueltige moralische Verurteilung der Segregation als Vertragsbruch, dennoch bleibt sein Versprechen de facto uneingeloest, solange strukturelle Ungleichheit in Einkommen, Vermoegen und politischer Teilhabe fortbesteht.",
        operator: "analysieren",
        scoringKeywords: [
          "promissory note",
          "rhetorical triad",
          "anaphora",
          "antithesis",
          "de jure vs. de facto",
          "Civil Rights Act"
        ],
        explanationZH: "既承认法律制度层面（de jure）的里程碑效力，又以经济社会实质层面（de facto）的结构性鸿沟完成辩证限定，一句覆盖修辞功能与历史评价双重踩分点。"
      },
      socraticProbes: [
        {
          questionDE: "Ist das Finanzbild vom uneingeloesten Schuldschein blosser Bildschmuck?",
          questionZH: "“未兑现期票”意象只是装饰性点缀吗？",
          counterPerspectiveDE: "Im amerikanischen Vertragsverstaendnis ist ein unbezahlter Schuldschein kein Dekor, sondern ein einklagbarer Rechtsbruch."
        },
        {
          questionDE: "Hat Kings Rede das Rassismusproblem ein fuer alle Mal geloest?",
          questionZH: "金的演讲是否一劳永逸地解决了种族问题？",
          counterPerspectiveDE: "Rechtliche Meilensteine (de jure) stehen gegen fortbestehende strukturelle Ungleichheit (de facto); pauschale Verurteilung ignoriert zudem Civil Rights Act und Voting Rights Act."
        }
      ]
    }
  },

  // 15. Ableitung als lokale Aenderungsrate: Von der Sekante zur Tangente (Mathe)
  {
    id: "ableitung-lokale-aenderungsrate-sekante-tangente",
    canonicalTitle: "Ableitung als lokale Aenderungsrate: Von der Sekante zur Tangente",
    fach: "Mathe",
    matchKeywords: [
      "ableitung",
      "differenzenquotient",
      "differentialquotient",
      "sekante",
      "tangente",
      "sekantensteigung",
      "tangentensteigung",
      "grenzwert",
      "momentanrate",
      "lokale aenderungsrate",
      "mittlere aenderungsrate",
      "h gegen 0",
      "punkt-steigungs-form"
    ],
    data: {
      topicTitle: "Ableitung als lokale Aenderungsrate: Von der Sekante zur Tangente",
      fach: "Mathe",
      intuitionDilemma: {
        scenarioDE: "Du faehrst Hamburg -> Berlin (300 km in 3 h, Schnitt 100 km/h). Ein Blitzer fotografiert dich mit 160 km/h. Du sagst: Mein Schnitt war doch legal!",
        scenarioZH: "你开车汉堡到柏林（300 公里用了 3 小时，平均 100 km/h）。测速摄像头拍到你 160 km/h。你辩解：我全程平均明明合法！",
        questionDE: "Zaehlt vor Gericht der Mittelwert ueber die ganze Fahrt oder der Momentanwert im Blitzerpunkt?",
        questionZH: "法庭上应当采信全程平均值，还是测速点那一瞬间的瞬时值？",
        choiceA: {
          id: "A",
          textDE: "A) Der Strafzettel muss sich am Durchschnittswert ueber die Gesamtstrecke orientieren.",
          textZH: "A) 罚单应当依据全程区间的平均速度来判定。",
          reactionDE: "Nachvollziehbar, aber im Grenzfall falsch: Der Tacho zeigt die lokale Momentanrate im Punkt P. Wer den Mittelwert ueber das ganze Intervall [x0, x0+h] nimmt, erhaelt die Sekantensteigung, nicht die Tangentensteigung an der Stelle x0.",
          reactionZH: "可以理解，但在极限情形下是错的：测速仪拍到的是 P 点处的局部瞬时变化率。用整段区间上的平均值算出来的是割线斜率，不是该点处的切线斜率。"
        },
        choiceB: {
          id: "B",
          textDE: "B) Der Strafzettel erfasst die Momentanrate in einem einzigen Punkt der Strecke.",
          textZH: "B) 罚单捕获的是全程中某一个瞬间的瞬时速率。",
          reactionDE: "Exakt: Die Radarmessung erfasst die lokale Aenderungsrate im Punkt P, also die Grenzlage der Sekanten fuer h gegen 0. Genau dieser Grenzprozess definiert die Ableitung f'(x0).",
          reactionZH: "完全正确：雷达在 P 点捕获的是局部瞬时变化率，即 h 趋于 0 时割线的极限位置，这个极限过程正是导数 f'(x0) 的定义。"
        },
        mechanismTakeawayDE: "Die Sekante verbindet P(x0|f(x0)) und Q(x0+h|f(x0+h)); fuer h gegen 0 wandert Q auf P zu und die Sekante rotiert in die Grenzlage der Tangente mit Steigung f'(x0).",
        mechanismTakeawayZH: "割线连接定点 P 与动点 Q；当步长 h 趋于 0 时，Q 沿曲线滑向 P，割线旋转收敛到切线的极限位置，其斜率即 f'(x0)。",
        klpCoreLogicDE: "NRW KLP Mathe IF Analysis (EF-A1): Differenzenquotient als Sekantensteigung -> Grenzprozess h gegen 0 -> Differentialquotient als Tangentensteigung f'(x0).",
        klpCoreLogicZH: "NRW 考纲数学分析领域 EF-A1：差商即割线斜率 -> 令 h 趋于 0 的极限过程 -> 微商即切线斜率 f'(x0)。"
      },
      mentalModelAnalogy: {
        analogyTitle: "Vom Foto zum Tacho: Der Blitzer misst den Moment, nicht die Strecke",
        explanationDE: "Die Sekante verbindet P(x0|f(x0)) und Q(x0+h|f(x0+h)); fuer h gegen 0 wandert Q auf P zu und die Sekante rotiert in die Grenzlage der Tangente mit Steigung f'(x0).",
        explanationZH: "割线连接定点 P 与动点 Q；当步长 h 趋于 0 时，Q 沿曲线滑向 P，割线旋转收敛到切线的极限位置，其斜率即 f'(x0)。"
      },
      konzeptPuzzle: {
        instructionDE: "Ordne jedem Ableitungsschritt (Differenz zu Kuerzen zu Grenzwert) das typische Fehlerbild und die Klausur-Konsequenz zu:",
        instructionZH: "将导数推导每一步（作差到约分到取极限）与典型错象及考场结论配对：",
        pairs: [
          {
            id: "pair-1",
            premiseDE: "Sekante: Gerade durch P(x0|f(x0)) und Q(x0+h|f(x0+h)) mit Steigung ms = (f(x0+h)-f(x0))/h",
            premiseZH: "割线：过定点 P 与动点 Q 的直线，斜率为差商 ms = (f(x0+h)-f(x0))/h",
            realityDE: "Fehlerbild: ms mit vertauschtem Zaehler oder fehlendem h im Nenner ansetzen",
            realityZH: "典型错象：分子写反或分母漏掉 h",
            consequenceDE: "Klausur: Ansatz ms sauber mit Funktionswerten aufstellen; Nenner h nie unterschlagen.",
            consequenceZH: "考场：差商起手式必须写全函数值，分母 h 绝不允许漏写。"
          },
          {
            id: "pair-2",
            premiseDE: "Grenzprozess: Q wandert entlang des Graphen auf P zu, es gilt h gegen 0",
            premiseZH: "极限过程：Q 沿曲线滑向 P，即 h 趋于 0",
            realityDE: "Fehlerbild: lim-Symbol vor dem Kuerzen streichen und direkt h = 0 einsetzen",
            realityZH: "典型错象：还没约分就删掉 lim 符号，直接代入 h = 0",
            consequenceDE: "Klausur: Das Symbol lim(h gegen 0) bis zur Auswertung mitschreiben (formale Strenge).",
            consequenceZH: "考场：极限符号 lim 必须保留到代入求值为止，否则扣形式严谨分。"
          },
          {
            id: "pair-3",
            premiseDE: "Kuerzen: Differenzenquotient durch Ausklammern und Kuerzen von h vereinfachen",
            premiseZH: "约分：对差商因式分解并约去分母上的 h",
            realityDE: "Fehlerbild: Unmoegliche Division durch h = 0 direkt ausfuehren",
            realityZH: "典型错象：直接用 h = 0 做除法（无意义的除零运算）",
            consequenceDE: "Klausur: Zwischenschritt (h-1) bzw. Faktor h explizit zeigen, dann erst Grenzwert bilden.",
            consequenceZH: "考场：必须展示约分中间步，之后才能取极限。"
          },
          {
            id: "pair-4",
            premiseDE: "Tangente: Grenzlage der Sekanten mit Steigung mt = f'(x0); Gleichung t(x) = f'(x0)(x-x0)+f(x0)",
            premiseZH: "切线：割线的极限位置，斜率 mt = f'(x0)；方程 t(x) = f'(x0)(x-x0)+f(x0)",
            realityDE: "Fehlerbild: Steigung als Funktion f'(x) stehen lassen statt f'(x0) als Zahl",
            realityZH: "典型错象：斜率停留在含 x 的函数式，未代入具体点求数值",
            consequenceDE: "Klausur: Erst f'(x0) als Zahl bestimmen, dann Beruehrpunkt P einsetzen, mit Antwortsatz schliessen.",
            consequenceZH: "考场：先求出具体数值斜率，再代入切点，最后用德语结论句收尾。"
          }
        ]
      },
      examTrapCorrection: {
        studentAnswerDE: "Zu f(x) = x^2 - 3x lautet die Tangentensteigung an der Stelle x0 = 1: mt = (f(3)-f(1))/(3-1) = 1, also t(x) = 1*(x-1)-2.",
        studentAnswerZH: "对 f(x) = x^2 - 3x，求 x0 = 1 处切线斜率：mt = (f(3)-f(1))/(3-1) = 1，所以 t(x) = 1*(x-1)-2。",
        fatalFlawPointDE: "Verwechslung von mittlerer und lokaler Aenderungsrate: Differenzenquotient ueber [1,3] statt Differentialquotient an der Stelle x0 = 1.",
        fatalFlawPointZH: "混淆平均变化率与局部变化率：用区间 [1,3] 上的差商代替了 x0 = 1 处的微商。",
        examinerVerdictDE: "Der Pruefling berechnet die Sekantensteigung statt der Tangentensteigung: Gefragt war die lokale Rate an der Stelle x0 = 1 (f'(1) = -1), nicht der Mittelwert ueber [1, 3]. Zusaetzlich fehlt der gesamte Grenzprozess mit lim(h gegen 0).",
        examinerVerdictZH: "该生把割线斜率当成了切线斜率：题目要求的是 x0 = 1 处的局部变化率（f'(1) = -1），不是区间 [1,3] 上的平均值；且整个含 lim 的极限过程完全缺失。",
        diagnosticOptions: [
          {
            id: "diag-correct",
            textDE: "Der Loesungsweg bestimmt die Sekantensteigung ueber dem Intervall [1, 3], waehrend die Aufgabe die Tangentensteigung exakt an der Stelle x0 = 1 verlangt.",
            textZH: "该解法求的是区间 [1,3] 上的割线斜率，而题目要求的是恰好在 x0 = 1 处的切线斜率。",
            isCorrect: true,
            explanationDE: "Treffer: Zum Zeitpunkt bzw. an der Stelle x0 ist stets f'(x0) ueber den Differentialquotienten mit Grenzwertbildung zu bestimmen; der Intervall-Differenzenquotient liefert nur die mittlere Rate.",
            explanationZH: "诊断正确：凡问某时刻/某点，必须走微商路线（求导再代入）；区间差商只给出平均值，两者几何对象完全不同（切线 vs 割线）。"
          },
          {
            id: "diag-distractor-1",
            textDE: "Der entscheidende Mangel liegt in der Wahl der Stellen 1 und 3: Mit dem engeren Intervall [1, 1.5] waere dasselbe Verfahren korrekt.",
            textZH: "关键失误在于选点太宽：若改用更窄的区间 [1, 1.5]，同样的算法就是正确的。",
            isCorrect: false,
            explanationDE: "Hochtrabende Falle: Auch ein enges Intervall liefert nur eine Sekantensteigung als Naeherung; exakt wird die lokale Rate erst durch den Grenzprozess h gegen 0.",
            explanationZH: "高迷惑陷阱：再窄的区间算出的仍是割线斜率（近似值）；只有令 h 趋于 0 取极限，才能得到精确的局部变化率。"
          },
          {
            id: "diag-distractor-2",
            textDE: "Der Fehler besteht darin, dass die Punkt-Steigungs-Formel t(x) = m*(x-x0)+f(x0) fuer Tangenten grundsaetzlich ungeeignet ist.",
            textZH: "错误在于切线根本不该用点斜式 t(x) = m*(x-x0)+f(x0) 来表示。",
            isCorrect: false,
            explanationDE: "Falsch abgebogen: Die Punkt-Steigungs-Formel ist das korrekte Werkzeug; der Fehler liegt allein in der Steigung m = 1 statt m = f'(1) = -1.",
            explanationZH: "方向错误：点斜式本身完全正确，错的只是斜率——应当是 m = f'(1) = -1，而不是区间平均值 1。"
          }
        ]
      },
      klpTermini: [
        {
          termDE: "Differenzenquotient",
          definitionDE: "ms = (f(x0+h)-f(x0))/h: Sekantensteigung als mittlere Aenderungsrate im Intervall; Ansatz stets mit vollen Funktionswerten und Nenner h.",
          termZH: "差商",
          definitionZH: "割线斜率，即区间上的平均变化率；起手式必须写全函数值，分母h不许漏。"
        },
        {
          termDE: "Differentialquotient",
          definitionDE: "lim(h gegen 0) des Differenzenquotienten: Tangentensteigung f'(x0) als lokale Aenderungsrate an der Stelle x0.",
          termZH: "微商",
          definitionZH: "差商令h趋于0的极限：切线斜率f'(x0)，即该点处的局部变化率。"
        },
        {
          termDE: "Sekante",
          definitionDE: "Gerade durch P und Q mit Steigung ms; liefert nur Naeherungen der lokalen Rate, nie den exakten Wert.",
          termZH: "割线",
          definitionZH: "过定点P与动点Q的直线；只给出局部变化率的近似值，永不等同精确值。"
        },
        {
          termDE: "Tangente",
          definitionDE: "Grenzlage der Sekanten fuer h gegen 0 mit t(x) = f'(x0)(x-x0)+f(x0); erst Zahl bestimmen, dann Beruehrpunkt einsetzen.",
          termZH: "切线",
          definitionZH: "h趋于0时割线的极限位置；先求具体数值斜率，再代入切点。"
        },
        {
          termDE: "Lokale Aenderungsrate",
          definitionDE: "Deutung von f'(x0) im Anwendungskontext (Momentangeschwindigkeit, Blitzerwert); Gegenstueck zur mittleren Rate ueber ein Intervall.",
          termZH: "局部变化率",
          definitionZH: "f'(x0)在应用语境中的解释（瞬时速度）；对应区间上的平均变化率。"
        }
      ],
      fehlerquellen: [
        {
          trapTitleDE: "Mittlere statt lokale Rate",
          trapDescriptionDE: "Sekantensteigung ueber [1,3] statt f'(1); Intervall-Differenzenquotient liefert nur die mittlere Rate, gefragt war die Tangentensteigung an der Stelle.",
          trapDescriptionZH: "用区间[1,3]的割线斜率代替x0=1处的切线斜率。",
          howToAvoidDE: "Bei Stelle bzw. Zeitpunkt stets f'(x0) ueber den Differentialquotienten mit Grenzwertbildung bestimmen."
        },
        {
          trapTitleDE: "lim-Symbol vorzeitig streichen",
          trapDescriptionDE: "lim(h gegen 0) wird vor dem Kuerzen gestrichen und direkt h = 0 eingesetzt; unmoegliche Division durch null.",
          trapDescriptionZH: "还没约分就删lim符号、直接代入h=0，构成无意义的除零运算。",
          howToAvoidDE: "Das lim-Symbol bis zur Auswertung mitschreiben; erst ausklammern und kuerzen, dann erst Grenzwert bilden."
        },
        {
          trapTitleDE: "Steigung als Funktion stehen lassen",
          trapDescriptionDE: "f'(x) statt f'(x0) als Zahl; Tangente ohne eingesetzten Beruehrpunkt und ohne Antwortsatz.",
          trapDescriptionZH: "斜率停留在含x的函数式，未代入具体点求数值。",
          howToAvoidDE: "Erst f'(x0) als Zahl bestimmen, dann Beruehrpunkt P einsetzen, mit Antwortsatz schliessen."
        }
      ],
      klausurSatz15NP: {
        musterSatzDE: "Zwar beschreibt der Differenzenquotient (f(x0+h)-f(x0))/h zunaechst nur die Sekantensteigung als mittlere Aenderungsrate im Intervall [x0, x0+h], dennoch folgt nach Kuerzen durch h und Grenzwertbildung fuer h gegen 0 die Tangentensteigung f'(x0) = lim(h gegen 0) (f(x0+h)-f(x0))/h als lokale Aenderungsrate an der Stelle x0.",
        operator: "darstellen",
        scoringKeywords: [
          "Differenzenquotient",
          "Differentialquotient",
          "Sekante",
          "Tangente",
          "Grenzwert h gegen 0",
          "f'(x0)",
          "lokale Aenderungsrate"
        ],
        explanationZH: "三步推导缺一不可：先列差商并约去分母 h，再令 h 趋于 0 取极限，最后落到切线斜率与局部变化率的解释；符号 lim 必须保留到求值完成，数值必须代入具体点。"
      },
      socraticProbes: [
        {
          questionDE: "Zaehlt vor Gericht der Mittelwert ueber die ganze Fahrt oder der Momentanwert im Blitzerpunkt?",
          questionZH: "法庭上采信全程平均值，还是测速点那一瞬间的瞬时值？",
          counterPerspectiveDE: "Der Tacho zeigt die lokale Momentanrate im Punkt P; der Mittelwert ueber das Intervall ist die Sekantensteigung, nicht die Tangentensteigung."
        },
        {
          questionDE: "Reicht ein enges Intervall wie [1, 1.5] aus, um die Tangentensteigung exakt zu bestimmen?",
          questionZH: "改用更窄的区间[1,1.5]，同样的算法就算对了吗？",
          counterPerspectiveDE: "Auch ein enges Intervall liefert nur eine Sekantensteigung als Naeherung; exakt wird die lokale Rate erst durch den Grenzprozess h gegen 0."
        }
      ]
    }
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

  // 1. Scan pre-calibrated domain knowledge bank with best-match scoring
  let bestEntry: DomainKnowledgeEntry | null = null;
  let bestScore = 0;

  for (const entry of DOMAIN_KNOWLEDGE_ENTRIES) {
    let score = 0;
    const fachMatch = entry.fach.toLowerCase() === resolvedFach.toLowerCase();

    for (const kw of entry.matchKeywords) {
      const normKw = normalizeQuery(kw);
      if (normalizedSearch.includes(normKw)) {
        score += normKw.length;
      }
    }

    const normCanonical = normalizeQuery(entry.canonicalTitle);
    if (normalizedSearch.includes(normCanonical) || normCanonical.includes(normalizedSearch)) {
      score += 50;
    }

    if (score > 0 && fachMatch) {
      score += 15;
    }

    if (score > bestScore) {
      bestScore = score;
      bestEntry = entry;
    }
  }

  if (bestEntry) {
    return enrichConceptWithStudyMateAndNotes(
      {
        ...bestEntry.data,
        topicTitle: cleanedTitle || bestEntry.data.topicTitle,
        fach: resolvedFach,
      },
      resolvedFach
    );
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
 * 为任意未在预设库中的主题生成概念与现实阻碍配对 (Schritt 2: Konzept-Puzzle)
 */
export function createFallbackKonzeptPuzzle(
  title: string,
  fach: string
): KonzeptPuzzleData {
  const normFach = fach.trim().toLowerCase();
  if (normFach.includes("sowi")) {
    return {
      instructionDE: `Ordne die theoretischen Grundannahmen von »${title}« den realen Marktgegebenheiten zu:`,
      instructionZH: `将 »${title}« 的理论核心假设与现实世界中的真实阻碍案例一一配对：`,
      pairs: [
        {
          id: "p1",
          premiseTermDE: "Homo Oeconomicus",
          premiseDE: "Vollkommene Rationalität (Homo Oeconomicus)",
          premiseZH: "纯理性经济人假设（追求纯收益最优）",
          realityTermDE: "Behavioral Economics",
          realityDE: "Emotionale Fehlentscheidungen, Bequemlichkeit & Herdentrieb",
          realityZH: "非理性冲动消费、从众羊群效应与惰性决策",
          consequenceDE: "Führt zu systematischen Konsumverzerrungen statt optimaler Allokation.",
          consequenceZH: "心理偏差破坏了最优资源配置，导致行为经济学视角下的非理性均衡。",
        },
        {
          id: "p2",
          premiseTermDE: "Markttransparenz",
          premiseDE: "Vollständige Information & Marktübersicht",
          premiseZH: "完全对称的信息与市场透明度",
          realityTermDE: "Informationsasymmetrien",
          realityDE: "Informationsasymmetrien & manipulative Werbeversprechen",
          realityZH: "信息不对称、算法茧房与虚假营销包装",
          consequenceDE: "Ermöglicht Ausbeutung von Wissensvorsprüngen und Preisaufschläge.",
          consequenceZH: "信息优势方掠夺垄断超额租金，消费者无法获得真实出清价格。",
        },
        {
          id: "p3",
          premiseTermDE: "Freier Wettbewerb",
          premiseDE: "Freier Wettbewerb ohne Markteintrittsbarrieren",
          premiseZH: "完全自由竞争与零准入门槛",
          realityTermDE: "Marktmacht & Monopole",
          realityDE: "Monopole, Oligopole & hohe regulatorische Hürden",
          realityZH: "行业巨头垄断、专利壁垒与高昂初始资金",
          consequenceDE: "Blockiert Neuanbieter und führt zu überhöhten Preisen ohne Markträumung.",
          consequenceZH: "既得利益集团阻绝有效市场竞争，价格失去自由弹性调节机能。",
        },
        {
          id: "p4",
          premiseTermDE: "Internalisierte Kosten",
          premiseDE: "Keine negativen externen Effekte",
          premiseZH: "零外部性（所有交易成本由买卖双方完全承担）",
          realityTermDE: "Negative Externalitäten",
          realityDE: "Umweltschäden, Ausbeutung & gesellschaftliche Folgekosten",
          realityZH: "生态环境污染、劳工压榨与社会公共财政买单",
          consequenceDE: "Marktpreise spiegeln nicht die wahren volkswirtschaftlichen Gesamtkosten wider.",
          consequenceZH: "市场定价脱离真实社会成本，造成生态破坏与严重市场失灵。",
        },
      ],
    };
  }

  if (normFach.includes("philo")) {
    return {
      instructionDE: `Ordne die normativen Prinzipien von »${title}« den praktischen Spannungsfeldern zu:`,
      instructionZH: `将 »${title}« 的伦理规范性原则与实际生活中的道德困境一一配对：`,
      pairs: [
        {
          id: "p1",
          premiseTermDE: "Kategorischer Imperativ",
          premiseDE: "Kategorischer Imperativ (Absolutes Handlungsgebot)",
          premiseZH: "康德定言命令（绝对禁止工具化他人）",
          realityTermDE: "Tragische Dilemmata",
          realityDE: "Tragische Notstandssituationen & Lebensrettung durch Täuschung",
          realityZH: "极端紧急避险情境（善意谎言与两难抉择）",
          consequenceDE: "Reine Deontologie stößt bei existenziellen Notständen an praktische Grenzen.",
          consequenceZH: "绝对义务论在人命关天的严峻现实冲突中面临严苛的两难伦理拷问。",
        },
        {
          id: "p2",
          premiseTermDE: "Utilitarismus",
          premiseDE: "Utilitaristische Nutzenmaximierung",
          premiseZH: "功利主义效用核算（追求最大多数人最大幸福）",
          realityTermDE: "Minderheitenschutz",
          realityDE: "Tyrannei der Mehrheit & Schutz unantastbarer Minderheitenrechte",
          realityZH: "多数人暴政隐患与少数群体基本权利践踏",
          consequenceDE: "Kollidiert mit der verfassungsrechtlichen Unantastbarkeit der Menschenwürde (Art. 1 GG).",
          consequenceZH: "单纯数量加总极易侵害少数群体不可让渡的人的尊严（宪法第 1 条）。",
        },
        {
          id: "p3",
          premiseTermDE: "Schleier des Nichtwissens",
          premiseDE: "Schleier des Nichtwissens (Gedankenexperiment)",
          premiseZH: "罗尔斯无知之幕（假设人人剥离既得利益）",
          realityTermDE: "Reale Ungleichheit",
          realityDE: "Etablierte Privilegien & ungleiche Startchancen in der Realität",
          realityZH: "现实中根深蒂固的阶层特权与起点不平等",
          consequenceDE: "Gedankliche Urzustände ignorieren gewachsene historische Machtstrukturen.",
          consequenceZH: "纯粹理论初始状态必须面对现实中路径依赖的深层制度不公。",
        },
        {
          id: "p4",
          premiseTermDE: "Autonomie des Subjekts",
          premiseDE: "Autonomie & Vernunftbegabung des Subjekts",
          premiseZH: "理性主体的绝对道德自律与自由意志",
          realityTermDE: "Heteronomie & Manipulation",
          realityDE: "Psychologische Manipulation & soziale Konditionierung",
          realityZH: "潜意识欲望驱使与社会结构对行为的无形规训",
          consequenceDE: "Menschliches Handeln ist stets durch Sozialisation und Umwelt vorstrukturiert.",
          consequenceZH: "个体自由意志总是在家庭、阶层与文化结构的重重塑造中艰难突围。",
        },
      ],
    };
  }

  if (normFach.includes("deutsch")) {
    return {
      instructionDE: `Ordne die poetologischen Konzepte von »${title}« den analytischen Textbeobachtungen zu:`,
      instructionZH: `将 »${title}« 的文学理论概念与文本解剖的具体观察一一配对：`,
      pairs: [
        {
          id: "p1",
          premiseTermDE: "Aufklärung",
          premiseDE: "Aufklärerischer Vernunftoptimismus",
          premiseZH: "启蒙理智乐观主义（理性能照亮迷蒙）",
          realityTermDE: "Existenzielle Krise",
          realityDE: "Fausts Verzweiflung an der Begrenztheit des Wissens",
          realityZH: "浮士德穷尽四大学科后的幻灭与虚无感",
          consequenceDE: "Offenbart die Grenzen rein intellektueller Weltaneignung.",
          consequenceZH: "揭示了纯粹书斋理智在面对浩瀚生命欲望时的深刻局限与虚无。",
        },
        {
          id: "p2",
          premiseTermDE: "Sturm und Drang",
          premiseDE: "Sturm-und-Drang-Genieideal",
          premiseZH: "狂飙突进天才冲动（冲破封建陈腐规训）",
          realityTermDE: "Tragische Hybris",
          realityDE: "Zerstörerische Leidenschaft & gesellschaftliche Isolation",
          realityZH: "野性激情导致的毁灭性冲动与人际悲剧孤立",
          consequenceDE: "Führt zum unausweichlichen Scheitern an gesellschaftlichen Normen.",
          consequenceZH: "个体天才意志在冷酷封建礼教秩序碰撞中走向不可逆的悲剧性陨落。",
        },
        {
          id: "p3",
          premiseTermDE: "Weimarer Klassik",
          premiseDE: "Klassisches Harmonie- & Humanitätsideal",
          premiseZH: "古典主义和谐与人道秩序理想",
          realityTermDE: "Ständekonflikt",
          realityDE: "Unversöhnliche Ständekonflikte & politische Willkür",
          realityZH: "残酷的封建等级壁垒与专制强权的冷酷摧残",
          consequenceDE: "Zeigt die Fragilität humanistischer Ideale in repressiven Machtverhältnissen.",
          consequenceZH: "反衬出崇高人道主义审美理想在专制强权现实面前的脆弱与沉重代价。",
        },
        {
          id: "p4",
          premiseTermDE: "Auktoriale Textlenkung",
          premiseDE: "Auktoriale Textordnung & Botschaft",
          premiseZH: "作者设定的修辞意图与读者引导",
          realityTermDE: "Polyvalenz & Offenheit",
          realityDE: "Vieldeutige Metaphorik & offene Deutungshorizonte",
          realityZH: "充满张力的多义隐喻与读者接受的多维碰撞",
          consequenceDE: "Ermöglicht multiple Rezeptionsweisen statt dogmatischer Eindeutigkeit.",
          consequenceZH: "彻底瓦解单一独断阐释，赋予读者跨越时代的广阔诠释空间。",
        },
      ],
    };
  }

  // MINT / Mathe / Physik
  return {
    instructionDE: `Ordne die mathematisch-physikalischen Modellannahmen von »${title}« ihren realen Randbedingungen zu:`,
    instructionZH: `将 »${title}« 的数学物理理想模型假设与真实世界的边界条件一一配对：`,
    pairs: [
      {
        id: "p1",
        premiseTermDE: "Ideales Vakuum",
        premiseDE: "Reibungsfreies ideales Vakuum",
        premiseZH: "理想无摩擦真空环境",
        realityTermDE: "Dissipation & Reibung",
        realityDE: "Luftwiderstand, Reibungsverluste & Dissipation",
        realityZH: "空气阻力、摩擦生热与机械能量耗散",
        consequenceDE: "Erzwingt dissipative Korrekturterme bei realen Bewegungsabläufen.",
        consequenceZH: "真实动力学必须引入阻尼衰减修正项，能量不可逆地耗散为内能。",
      },
      {
        id: "p2",
        premiseTermDE: "Sekantensteigung",
        premiseDE: "Durchschnittliche Rate (Sekantensteigung)",
        premiseZH: "宏观平均变化率（割线斜率）",
        realityTermDE: "Differentialquotient",
        realityDE: "Momentane Spitzenwerte & infinitesimale Dynamik (Tangente)",
        realityZH: "瞬时加速度峰值与微观变化率（切线斜率）",
        consequenceDE: "Macht den Grenzwertübergang (Limes) für präzise Momentangeschwindigkeiten unumgänglich.",
        consequenceZH: "迫使数学建立极限逼近工具，只有切线斜率才能刻画微观瞬时状态。",
      },
      {
        id: "p3",
        premiseTermDE: "Glatte Kontinuität",
        premiseDE: "Kontinuierliche differenzierbare Kurve",
        premiseZH: "理想连续光滑可导曲线",
        realityTermDE: "Diskrete Messwerte",
        realityDE: "Diskrete Messpunkte & statistische Messunsicherheiten",
        realityZH: "离散的实验采样点与测量系统误差",
        consequenceDE: "Erfordert Regressionsanalysen und Vertrauensintervalle statt reiner Formelauswertung.",
        consequenceZH: "要求实验科学建立统计置信区间，不能简单用单点代入理想函数。",
      },
      {
        id: "p4",
        premiseTermDE: "Deterministische Kausalität",
        premiseDE: "Deterministische Berechenbarkeit",
        premiseZH: "确定性解析公式计算",
        realityTermDE: "Nichtlineare Dynamik",
        realityDE: "Nichtlineare Effekte, Störgrößen & Schwingungen",
        realityZH: "非线性外部扰动、共振与混沌敏感性",
        consequenceDE: "Begrenzt Langzeitprognosen und erfordert numerische Näherungsverfahren.",
        consequenceZH: "对初值的敏感性使得长期精准预报失效，必须依托数值逼近模拟。",
      },
    ],
  };
}

/**
 * 为任意未在预设库中的主题生成真实的考场 0 分排雷改错诊断 (Schritt 4: Absturz-Falle)
 */
export function createFallbackExamTrapCorrection(
  title: string,
  fach: string
): ExamTrapCorrectionData {
  const normFach = fach.trim().toLowerCase();
  if (normFach.includes("sowi")) {
    return {
      studentAnswerDE: `»In Bezug auf »${title}« muss der Staat durch direkte Preisfestsetzungen und Regulierungen dafür sorgen, dass niemand Verluste erleidet.«`,
      studentAnswerZH: `»关于 »${title}«，国家必须通过行政命令直接统制定价并严格管控，确保没有任何市场主体承受亏损。«`,
      fatalFlawPointDE: "Zerstörung der ökonomischen Lenkungsfunktion und Verletzung des Prinzips der Marktkonformität (0 NP).",
      fatalFlawPointZH: "摧毁了价格的稀缺信号与资源配置职能，违反了社会市场经济‘符合市场原则’的基本底线（0 分致命伤）。",
      examinerVerdictDE: "Klausur-Regel: In der Sozialen Marktwirtschaft greift der Staat ordnungspolitisch als Schiedsrichter ein, nicht als Planwirtschaftler. Interventionen müssen marktkonform sein.",
      examinerVerdictZH: "考官阅卷准则：在德国社会市场经济中，国家是制定竞争规则的裁判员而非包办一切的计划员。干预必须符合市场原则，通过社保与转移支付兜底，而非锁死价格机制。",
    };
  }

  if (normFach.includes("philo")) {
    return {
      studentAnswerDE: `»Im Kontext von »${title}« ist eine Handlung moralisch gut, solange der Handelnde aus egoistischen Motiven subjektiv glücklich damit ist.«`,
      studentAnswerZH: `»在 »${title}« 相关的伦理情境中，一项行为只要符合当事人的自利动机并在主观上让他感到快乐，就是道德上正当的。«`,
      fatalFlawPointDE: "Rückfall in naiven psychologischen Egoismus und Verwechslung von Neigung (subjektiv) mit moralischer Pflicht (objektiv).",
      fatalFlawPointZH: "跌入庸俗心理利己主义，严重混淆了主观情感偏好（Neigung）与客观道德律令（Pflicht）。",
      examinerVerdictDE: "Klausur-Regel: Philosophie verlangt intersubjektive Begründung! Weder Kant (Pflicht aus reiner praktischer Vernunft) noch Bentham (größtes Glück aller Betroffenen) billigen bloßen privaten Egoismus.",
      examinerVerdictZH: "考官阅卷准则：哲学论证必须具备主体间有效性！无论是康德（纯粹实践理性的客观法则）还是功利主义（所有受影响者的普遍福祉），都坚决否定狭隘的主观自私。",
    };
  }

  if (normFach.includes("deutsch")) {
    return {
      studentAnswerDE: `»Bei der Analyse von »${title}« fasst der Schüler einfach nur nacherzählend zusammen, wer mit wem redet, und bewertet die Figur nach Sympathie.«`,
      studentAnswerZH: `»在分析 »${title}« 时，考生只是小学作文式地复述谁跟谁说了什么，并凭个人好恶对人物进行道德审判。«`,
      fatalFlawPointDE: "Reine Inhaltsangabe (AFB I) statt textimmanenter Funktionsanalyse (AFB II) von Sprachgestus und Epochenhintergrund.",
      fatalFlawPointZH: "纯粹情节复述（AFB I），完全缺少对语言修辞构造、潜台词与时代矛盾的深入解剖（AFB II）。",
      examinerVerdictDE: "Klausur-Regel: Der Deutsch-Klausur-Dreischritt verlangt zwingend: Beleg (Textstelle) -> sprachliches Mittel / rhetorische Figur -> Funktion für die Figurenkonstellation und Leserlenkung.",
      examinerVerdictZH: "考官阅卷准则：德语文科大题必须严格落实三步走：原文引证（Beleg） -> 修辞手段（Mittel） -> 人物关系与读者接受功能（Funktion）。",
    };
  }

  // MINT
  return {
    studentAnswerDE: `»Um die Gesetzmäßigkeit von »${title}« zu beweisen, reicht es aus, eine einzige Messung durchzuführen und einen Schätzwert anzugeben.«`,
    studentAnswerZH: `»为了证明 »${title}« 的物理/数学规律，只需要做一次实验测量并估算一个大概数值即可。«`,
    fatalFlawPointDE: "Fehlende Fehlerrechnung, Verwechslung von Einzelfallbeobachtung mit naturwissenschaftlicher Induktion bzw. mathematischem Beweis.",
    fatalFlawPointZH: "缺失测量误差分析，将个别偶然数据误当成普适性自然科学规律或数学证明。",
    examinerVerdictDE: "Klausur-Regel: Wissenschaftliche Validität erfordert die saubere Trennung von Modellannahme, Messunsicherheit und formaler mathematischer Deduktion.",
    examinerVerdictZH: "考官阅卷准则：自然科学结论必须严格区分理论假定前提、测量误差区间与严谨的形式数学推导。",
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

  // 2. 剧情角色与学术使命 (Story Hook & Academic Mission - 无中二套话)
  let storyHook: StoryHookData;
  if (normFach.toLowerCase().includes("sowi")) {
    storyHook = {
      roleDE: "Wirtschaftspolitischer Analyst",
      roleZH: "宏观制度经济分析员",
      scenarioDE: `Klausurszenario: Untersuche die Verteilungswirkungen und Anreizstrukturen von »${title}«. Finde die Balance zwischen Wettbewerb und sozialem Schutz!`,
      scenarioZH: `考场核心研习：剖析 »${title}« 的微观激励机制与制度约束，厘清市场配置效率与社会国家兜底的考纲踩分点。`,
    };
  } else if (normFach.toLowerCase().includes("philo")) {
    storyHook = {
      roleDE: "Ethik-Analyst",
      roleZH: "哲学伦理批判研究员",
      scenarioDE: `Klausurszenario: Beurteile die moralische Legitimität von »${title}« nach Kants Pflichtenethik und dem Utilitarismus.`,
      scenarioZH: `考场核心研习：依照康德定言命令与功利主义后果原则，对 »${title}« 展开严谨的第一性原理正当性事实与价值评价。`,
    };
  } else if (normFach.toLowerCase().includes("deutsch")) {
    storyHook = {
      roleDE: "Literaturwissenschaftler",
      roleZH: "文本修辞与戏剧解剖员",
      scenarioDE: `Klausurszenario: Untersuche die textuelle Inszenierung, rhetorischen Mittel und Leserlenkung in Bezug auf »${title}«.`,
      scenarioZH: `考场核心研习：深入解剖与 »${title}« 相关的时代修辞构造、人物核心矛盾与读者接受引导策略。`,
    };
  } else if (normFach.toLowerCase().includes("mathe")) {
    storyHook = {
      roleDE: "System-Mathematiker",
      roleZH: "应用数学分析员",
      scenarioDE: `Klausurszenario: Bestimme die exakte lokale Änderungsrate, das Grenzverhalten und die Extremwerte von »${title}«.`,
      scenarioZH: `考场核心研习：精确求解 »${title}« 的变化率极限、几何切线斜率与关键驻点。`,
    };
  } else {
    storyHook = {
      roleDE: "KLP-Chefanalyst der Fachkommission",
      roleZH: "考纲学科核心研习领航员",
      scenarioDE: `Forschungsauftrag: Entschlüssle die Gesetzmäßigkeiten und Kausalstrukturen von »${title}« für die anstehende Klausurbewertung!`,
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

  // 8. 概念与现实配对 (Konzept-Puzzle) & 考场找茬排雷 (Exam-Trap)
  const konzeptPuzzle =
    concept.konzeptPuzzle || createFallbackKonzeptPuzzle(title, normFach);
  const examTrapCorrection =
    concept.examTrapCorrection || createFallbackExamTrapCorrection(title, normFach);

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
    konzeptPuzzle,
    examTrapCorrection,
  };
}

/**
 * Lists all pre-calibrated canonical topic IDs in the knowledge bank.
 */
export function listSupportedPreloadedTopics(): string[] {
  return DOMAIN_KNOWLEDGE_ENTRIES.map((e) => e.canonicalTitle);
}
