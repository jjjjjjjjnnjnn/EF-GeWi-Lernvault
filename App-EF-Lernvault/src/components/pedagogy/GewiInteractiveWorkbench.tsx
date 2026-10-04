// GewiInteractiveWorkbench — 文科与社科专属直观互动研学工作台 (V3 深度重构)
// 彻底废除机械生硬的通用滑块，依据德国高中教学论（Fachdidaktik GeWi）打造直观沉浸体验：
// 1. ⚖️ 辩证与价值天平 (Urteils- & Ethik-Waage)：真实物理杠杆倾斜、论据砝码称重、宪法一票否决与做题引导
// 2. 🏛️ 康德绝对命令 4 步检验机 (Kantscher Navigator)：准则提取 → 普遍法则 → 矛盾检验 → 义务定性
// 3. 🎭 弗莱塔格戏剧五幕构建台 (Freytag-Drama-Studio)：五幕张力抛物线、经典剧目选段、戏剧动力学功能剖析
// 4. 🎵 诗歌格律节拍打击器 (Lyrik-Metrum-Taktstock)：音节轻重音点击、真实节拍声律动、格律与韵脚智能识别
// 5. 🪲 卡夫卡《变形记》异化与视角透镜 (Kafka-Entfremdung)：四方视角转换、异化指数、权力关系解剖
// 6. 🎭 布莱希特史诗剧间离透镜 (Brecht-V-Effekt)：共情 vs 间离冷峻反思、四重间离机制交互触发
// 7. 🔍 会考原典引导做题台 (Klausur-Scaffolding)：论点扫描 → 逻辑分类 → 15分句式拼装

import { useState, useMemo, useEffect } from "react";
import type { Lang } from "../../i18n";
import type { SimEntry } from "../../modules/laborRegistry";

export interface GewiWorkbenchProps {
  sim: SimEntry;
  lang: Lang;
  studioMode?: boolean;
  onExportFinding?: (text: string) => void;
}

// =========================================================================
// 1. ⚖️ 辩证价值天平工坊 (Urteils- & Ethik-Waage)
// =========================================================================

interface WeightCard {
  id: string;
  side: "pro" | "contra";
  textDE: string;
  textZH: string;
  weight: 1 | 2 | 3; // 1 = 事实经验, 2 = 制度系统, 3 = 宪法第1条人尊/核心伦理律令
  categoryDE: string;
  categoryZH: string;
}

interface BalanceCaseData {
  titleDE: string;
  titleZH: string;
  questionDE: string;
  questionZH: string;
  labelProDE: string;
  labelProZH: string;
  labelContraDE: string;
  labelContraZH: string;
  weights: WeightCard[];
  sachurteilGuideDE: string;
  sachurteilGuideZH: string;
  werturteilGuideDE: string;
  werturteilGuideZH: string;
  formulierungshilfe: string;
  chineseComment: string;
}

const GEWI_BALANCE_CASES: Record<string, BalanceCaseData> = {
  "philo-willensfreiheit": {
    titleDE: "Neurobiologie vs. Willensfreiheit (Libet 1983)",
    titleZH: "脑神经决定论 vs. 自由意志与意识否决权 (李贝特实验)",
    questionDE: "Widerlegen neurobiologische Befunde (Bereitschaftspotenzial) die Annahme eines freien Willens?",
    questionZH: "脑电准备电位（Bereitschaftspotenzial）的提前出现，是否在根本上推翻了人类拥有自由意志的假设？",
    labelProDE: "Determinismus / Neurobiologie (Kein freier Wille)",
    labelProZH: "决定论 / 神经科学立场（意志是事后幻觉）",
    labelContraDE: "Kompatibilismus / Willensfreiheit (Freier Wille besteht)",
    labelContraZH: "相容论 / 自由意志立场（理性反思与否决权）",
    weights: [
      {
        id: "wf-p1",
        side: "pro",
        textDE: "Bereitschaftspotenzial geht der bewussten Handlungsintention um ca. 350-500 ms voraus.",
        textZH: "脑电图记录到准备电位比受试者主观决定动手指提前约 350-500 ms 出现。",
        weight: 2,
        categoryDE: "Empirischer Befund (Libet 1983)",
        categoryZH: "实证测量数据 (Libet 1983)"
      },
      {
        id: "wf-p2",
        side: "pro",
        textDE: "Naturwissenschaftlicher Kausalitätsgrundsatz: Mentale Zustände sind vollständig durch neuronale Prozesse determiniert.",
        textZH: "自然科学因果公理：所有心理意向完全由大脑物理化学神经元放电所严格决定。",
        weight: 2,
        categoryDE: "Deterministisches Postulat",
        categoryZH: "强决定论假说"
      },
      {
        id: "wf-p3",
        side: "pro",
        textDE: "Illusionstheorie (Roth / Singer): Das Gefühl der Handlungsautonomie ist ein nachträgliches Konstrukt des Gehirns.",
        textZH: "幻觉假说（德脑科学家 Roth/Singer）：主观意愿仅仅是大脑为潜意识行动编造的合理解释。",
        weight: 1,
        categoryDE: "Neurophilosophie",
        categoryZH: "神经哲学假说"
      },
      {
        id: "wf-c1",
        side: "contra",
        textDE: "Freies Veto nach Libet: Das Bewusstsein besitzt in den letzten 100 ms vor der Bewegung die Macht zum Handlungsabbruch (Free Won't).",
        textZH: "意识否决权（Free Won't）：在动作击发前最后 100 ms，意识能够主动踩下刹车阻断行动。",
        weight: 3,
        categoryDE: "Libets eigene Interpretation",
        categoryZH: "李贝特本人的理论修正"
      },
      {
        id: "wf-c2",
        side: "contra",
        textDE: "Kritik der künstlichen Laborsituation: Das willkürliche Drücken eines Knopfs entspricht nicht normativ geleiteten Lebensentscheidungen (Habermas).",
        textZH: "哈贝马斯批评：随意动手指是无反思的肌肉反射，根本不能代表基于道德考量与理由选择的复杂人生抉择。",
        weight: 2,
        categoryDE: "Diskursethik (Habermas)",
        categoryZH: "交往伦理学批判"
      },
      {
        id: "wf-c3",
        side: "contra",
        textDE: "Rechtsstaat & moralische Zurechnung: Ohne Willensfreiheit erlischt der Begriff der Schuld und der Menschenwürde (Art. 1 Abs. 1 GG).",
        textZH: "法治国与道德责任根基：若无自由意志，刑法中的刑事责任（Schuldfähigkeit）与人的尊严将彻底崩溃。",
        weight: 3,
        categoryDE: "Grundgesetz & Rechtsphilosophie",
        categoryZH: "宪法基本法与法哲学"
      }
    ],
    sachurteilGuideDE: "Sachurteil: Prüfen Sie die empirische Belastbarkeit der Labordaten (Messpräzision der Oszilloskop-Uhr vs. Komplexität realer Willensbildung).",
    sachurteilGuideZH: "事实裁决 (Sachurteil)：评估实验室数据的客观有效性（毫秒级示波器测量误差 vs 现实深思熟虑行动的质的飞跃）。",
    werturteilGuideDE: "Werturteil: Gewichten Sie die Implikationen für Menschenwürde und Rechtsstaatlichkeit gemäß Art. 1 GG.",
    werturteilGuideZH: "价值裁决 (Werturteil)：衡量若彻底采信决定论，对基本法第一条人的尊严与刑事责任构成的毁灭性冲击。",
    formulierungshilfe: "Wenngleich die neurobiologischen Messreihen eine zeitliche Priorität unbewusster kortikaler Aktivierungsprozesse belegen, lässt sich daraus keineswegs die vollständige Nichtexistenz von Willensfreiheit deduzieren. Insbesondere bei normativ reflektierten Entscheidungen greift die Gleichsetzung von spontaner Willkürbewegung und deliberativer Autonomie zu kurz.",
    chineseComment: "15分满分答题秘籍：德国哲学卷子决不能单方面倒向决定论！必须引用哈贝马斯区分‘运动冲动’与‘理由决断’，并指出基本法责任原则的不可动摇性。"
  },
  "philo-utilitarismus-bentham": {
    titleDE: "Hedonistisches Kalkül (Jeremy Bentham)",
    titleZH: "边沁功利主义：快乐算度 vs. 少数人基本权利",
    questionDE: "Ist das hedonistische Kalkül ein moralisch tragfähiges Kriterium zur Lösung ethischer Dilemmata?",
    questionZH: "追求‘最大多数人的最大快乐’的量化算度，能否作为裁决复杂伦理两难的正当标准？",
    labelProDE: "Utilitarismus (Teleologie / Wohlfahrtsmaximierung)",
    labelProZH: "功利主义立场（结果导向 / 幸福总量最大化）",
    labelContraDE: "Deontologie / Menschenrechte (Kategorische Grenzen)",
    labelContraZH: "义务论与人权立场（绝对禁令 / 人的尊严不可侵犯）",
    weights: [
      {
        id: "ub-p1",
        side: "pro",
        textDE: "Rationale Quantifizierbarkeit: Systematische Berechnung über Intensität, Dauer, Gewissheit und Ausdehnung der Freude.",
        textZH: "理性量化计算：依据强度、持续时间、确定性与涉及广度等 7 大要素客观算度幸福。",
        weight: 2,
        categoryDE: "Hedonistisches Kalkül",
        categoryZH: "快乐算度法"
      },
      {
        id: "ub-p2",
        side: "pro",
        textDE: "Egalitäres Prinzip: 'Jeder zählt für einen und keiner für mehr als einen' (Gleichbehandlung aller Betroffenen).",
        textZH: "平等主义原则：“每个人都只算作一人，无人生来高贵或低贱”。",
        weight: 2,
        categoryDE: "Demokratischer Grundsatz",
        categoryZH: "平等主义内核"
      },
      {
        id: "ub-c1",
        side: "contra",
        textDE: "Instrumentalisierungsverbot (Art. 1 GG / Kant): Ein unschuldiger Mensch darf niemals bloß als Mittel zum Zweck geopfert werden.",
        textZH: "人的目的性原则（康德 / 基本法第1条）：无辜个体绝不可仅仅被当作实现集体幸福的手段加以牺牲。",
        weight: 3,
        categoryDE: "Menschheitszweckformel",
        categoryZH: "人的尊严绝对红线"
      },
      {
        id: "ub-c2",
        side: "contra",
        textDE: "Tyrannei der Mehrheit: Ungerechte Unterdrückung von Minderheiten lässt sich utilitaristisch mathematisch legitimieren.",
        textZH: "多数人的暴政：当多数人的微小快感累加超过少数人的巨大苦难时，压迫与掠夺将获得数学合法性。",
        weight: 3,
        categoryDE: "Gerechtigkeitstheorie (Rawls)",
        categoryZH: "罗尔斯正义论反驳"
      }
    ],
    sachurteilGuideDE: "Sachurteil: Untersuchen Sie die praktische Durchführbarkeit der Messung (Lassen sich Gefühle wie Trauer und Freude in Zahlen fassen?).",
    sachurteilGuideZH: "事实裁决：考察快乐算度的现实可操作性（人类的情感、尊严与痛苦能否真正被折算为同质数值？）。",
    werturteilGuideDE: "Werturteil: Konfrontieren Sie die Nützlichkeitsethik mit den unantastbaren Grundrechten der Verfassung.",
    werturteilGuideZH: "价值裁决：将追求功利的有效性与德国宪法绝对不可让渡的无辜者生命权进行正义权衡。",
    formulierungshilfe: "Das Benthamsche Kalkül bietet zwar ein scheinbar rationales Abwägungsinstrument, scheitert jedoch normativ an der Unantastbarkeit der Menschenwürde. Eine Verrechnung von Menschenleben gegen das Wohl einer Mehrheit widerspricht fundamental dem deontologischen Schutzzweck des Grundgesetzes.",
    chineseComment: "得分雷区：千万别把人当数字！一旦涉及电车难题中推下无辜胖子，无论能救多少人，在德国高中会考中一律判定为违宪（Verfassungsbruch）。"
  },
  "philo-arendt-banalitaet": {
    titleDE: "Hannah Arendt: Die Banalität des Bösen",
    titleZH: "汉娜·阿伦特：平庸之恶与独立思辨能力的丧失",
    questionDE: "Erklärt die 'Banalität des Bösen' (Gedankenlosigkeit) die Taten bürokratischer NS-Schreibtischtäter hinreichend?",
    questionZH: "阿伦特提出的‘平庸之恶’（缺乏独立反思能力），能否充分解释纳粹官僚体制执行者的犯罪本质？",
    labelProDE: "Banalität / Bürokratismus (Gedankenlosigkeit)",
    labelProZH: "平庸之恶立场（官僚齿轮 / 丧失从他人视角思考的能力）",
    labelContraDE: "Radikales / Ideologisches Böse (Aktive Mittäterschaft)",
    labelContraZH: "主动恶劣立场（狂热意识形态 / 自主选择作恶）",
    weights: [
      {
        id: "ha-p1",
        side: "pro",
        textDE: "Gedankenlosigkeit: Unfähigkeit, aus der Perspektive eines anderen Menschen zu denken oder moralische Distanz einzunehmen.",
        textZH: "丧失思考能力（Gedankenlosigkeit）：完全无法从受害者的视角换位思考，仅按行政条例运转。",
        weight: 3,
        categoryDE: "Arendts Kernbegriff",
        categoryZH: "阿伦特核心命题"
      },
      {
        id: "ha-p2",
        side: "pro",
        textDE: "Funktionär im System: Motivation aus Karriereambition und Pflichterfüllung statt aus persönlichem Sadismus.",
        textZH: "体制齿轮：作恶动机来自晋升野心与盲目‘恪尽职守’，而非反社会的变态施虐欲。",
        weight: 2,
        categoryDE: "Bürokratische Struktur",
        categoryZH: "极权官僚机制"
      },
      {
        id: "ha-c1",
        side: "contra",
        textDE: "Aktive Eigeninitiative: Eichmann handelte mit ideologischem Fanatismus und übertraf teils ministerielle Quoten.",
        textZH: "主动作为与狂热信念：史料证明艾希曼具备高度主动性，甚至在战争末期违抗上级缓和命令加速屠杀。",
        weight: 3,
        categoryDE: "Historische Quellenforschung",
        categoryZH: "历史档案实证"
      },
      {
        id: "ha-c2",
        side: "contra",
        textDE: "Gefahr der Entschuldung: Die Rede vom 'bloßen Rädchen' birgt das Risiko, individuelle Täterverantwortung zu relativieren.",
        textZH: "推卸责任风险：强调‘体制齿轮’容易在法理上稀释个人的自由决断与反人类罪刑责。",
        weight: 2,
        categoryDE: "Rechtsphilosophische Kritik",
        categoryZH: "法哲学问责批判"
      }
    ],
    sachurteilGuideDE: "Sachurteil: Historische Fakten über Eichmanns Vernehmungsprotokolle versus ideologisches Selbstverständnis abwägen.",
    sachurteilGuideZH: "事实裁决：对比耶路撒冷审判笔录与阿根廷流亡录音中艾希曼真实的意识形态自白。",
    werturteilGuideDE: "Werturteil: Bedeutung der moralischen Urteilskraft jedes Einzelnen in totalitären Systemen bestimmen.",
    werturteilGuideZH: "价值裁决：确定在极权社会中，每个个体保持‘良知与苏格拉底式自我对话’的绝对道德责任。",
    formulierungshilfe: "Arendts Diagnose der 'Banalität des Bösen' entbindet den Einzelnen keineswegs von moralischer Schuld; sie schärft vielmehr den Blick dafür, dass das Fehlen eigenständigen Denkens zur verheerendsten Bedingung für die Mittäterschaft an totalitären Verbrechen werden kann.",
    chineseComment: "会考得分核心：切忌将‘Banal（平庸）’误解为‘小罪’或‘可以原谅’！阿伦特的 Banal 指的是作恶者‘思想深度的匮乏与陈词滥调’，其罪行是绝对的反人类罪。"
  },
  "sowi-wohlfahrtsstaat": {
    titleDE: "Wohlfahrtsstaatsmodelle (Esping-Andersen)",
    titleZH: "福利国家制度重构：社会公平 vs. 市场激励与国际竞争力",
    questionDE: "Sollte das deutsche Sozialstaatsmodell zugunsten höherer Arbeitsanreize liberalisiert werden?",
    questionZH: "为了增强就业激励与全球竞争力，德国社会福利国家是否应该走向自由主义削减模式？",
    labelProDE: "Aktivierender Staat / Liberalisierung (Effizienz)",
    labelProZH: "自由激活型国家（效率性 / 降低用工成本）",
    labelContraDE: "Soziale Sicherung / Dekommodifizierung (Legitimität)",
    labelContraZH: "传统社保保障（合法性 / 保护人的生存尊严）",
    weights: [
      {
        id: "wf-p1",
        side: "pro",
        textDE: "Senkung der Lohnnebenkosten: Entlastung der Betriebe zur Sicherung von Investitionen und Beschäftigung.",
        textZH: "降低非工资劳工成本（社保缴费率），减轻企业税负以稳固海外投资与就业岗位。",
        weight: 2,
        categoryDE: "Angebotsorientierte Wirtschaftspolitik",
        categoryZH: "供给学派经济逻辑"
      },
      {
        id: "wf-p2",
        side: "pro",
        textDE: "Arbeitsanreize schaffen: Vermeidung von 'sozialer Hängematte' und Verringerung fiskalischer Transferlasten.",
        textZH: "建立工作激励机制，避免过度福利依赖，减轻国家财政转移支付赤字。",
        weight: 1,
        categoryDE: "Fiskalische Stabilität",
        categoryZH: "财政减负与效率"
      },
      {
        id: "wf-c1",
        side: "contra",
        textDE: "Sozialstaatsgebot (Art. 20 Abs. 1 GG): Verfassungsrechtliche Pflicht zur Gewährleistung des Existenzminimums.",
        textZH: "社会国原则（基本法第20条第1款）：国家负有确保每个公民体面生存底线的宪政法定义务。",
        weight: 3,
        categoryDE: "Verfassungsgebot (Art. 20 GG)",
        categoryZH: "宪法社会国原则"
      },
      {
        id: "wf-c2",
        side: "contra",
        textDE: "Dekommodifizierung: Schutz der menschlichen Arbeitskraft vor der totalen Auslieferung an Marktmechanismen.",
        textZH: "去商品化保障（Dekommodifizierung）：防止人的劳动能力与生命安全被完全沦为商品任由资本摆布。",
        weight: 3,
        categoryDE: "Esping-Andersen Theorie",
        categoryZH: "埃斯平-安德森福利理论"
      },
      {
        id: "wf-c3",
        side: "contra",
        textDE: "Soziale Kohäsion: Hohe Ungleichheit schwächt das Vertrauen in demokratische Institutionen.",
        textZH: "维护社会整合：贫富鸿沟急剧扩大将催生民粹主义，撕裂民众对民主法治制度的认同。",
        weight: 2,
        categoryDE: "Demokratiesicherung",
        categoryZH: "民主稳定底线"
      }
    ],
    sachurteilGuideDE: "Sachurteil: Wirksamkeit hinsichtlich Arbeitsmarktentlastung gegen Finanzierbarkeit der Kassen abwägen.",
    sachurteilGuideZH: "事实裁决 (Sachurteil)：按有效性（Wirksamkeit）衡量就业率提升效果与社保基金长期收支平衡。",
    werturteilGuideDE: "Werturteil: Legitimität unter Rückgriff auf das Sozialstaatsgebot und Art. 1 GG beurteilen.",
    werturteilGuideZH: "价值裁决 (Werturteil)：援引基本法第20条社会国原则与第1条人尊，论证任何削减必须设立人道底线。",
    formulierungshilfe: "Unter dem Kriterium der wirtschaftlichen Effizienz lassen sich Deregulierungen zur Stärkung der internationalen Wettbewerbsfähigkeit begründen. Unter dem normativ übergeordneten Kriterium der sozialen Gerechtigkeit (Art. 20 GG) erweist sich jedoch eine radikale Beschneidung existenzieller Sicherungssysteme als verfassungsrechtlich illegitim.",
    chineseComment: "满分采分点：社科大题必须分别写出【Sachurteil (效率/就业)】与【Werturteil (正义/宪法)】，最后在 Fazit 中做出有优先级的价值权衡！"
  }  ,
  "sowi-mindestlohn": {
    titleDE: "Gesetzlicher Mindestlohn: Soziale Gerechtigkeit vs. Marktallokation",
    titleZH: "法定最低工资制度：劳动者生存尊严 vs. 市场出清与企业雇佣成本",
    questionDE: "Sollte der gesetzliche Mindestlohn zur Armutsbekämpfung weiter angehoben werden?",
    questionZH: "为防止工作贫困（Working Poor），德国是否应进一步大幅调高法定最低工资？",
    labelProDE: "Bedarfsgerechtigkeit & Kaufkraft (Pro)",
    labelProZH: "生存与分配正义 / 提振内需购买力",
    labelContraDE: "Marktfreiheit & Arbeitsplatzrisiko (Contra)",
    labelContraZH: "市场自由配置 / 防范企业裁员与转嫁成本",
    weights: [
      {
        id: "ml-p1",
        side: "pro",
        textDE: "Schutz vor Armut trotz Vollzeitarbeit (Working Poor) und Sicherung des soziokulturellen Existenzminimums.",
        textZH: "杜绝‘工作仍贫困’现象，保障劳动者维持体面生活的最低社会文化生活线。",
        weight: 3,
        categoryDE: "Sozialstaatsgebot",
        categoryZH: "社会国人道底线"
      },
      {
        id: "ml-p2",
        side: "pro",
        textDE: "Stärkung der Binnennachfrage durch höhere Einkommen in unteren Konsumschichten mit hoher Konsumquote.",
        textZH: "底层群体边际消费倾向高，提高最低工资可直接拉动国内消费循环与宏观总需求。",
        weight: 2,
        categoryDE: "Nachfragepolitik",
        categoryZH: "凯恩斯需求效应"
      },
      {
        id: "ml-c1",
        side: "contra",
        textDE: "Verletzung der Tarifautonomie (Art. 9 Abs. 3 GG): Staatlicher Eingriff in freie Lohnfindung.",
        textZH: "冲击薪酬自主权（基本法第9条第3款）：国家强行行政干预工会与雇主协会自主议价。",
        weight: 2,
        categoryDE: "Tarifautonomie",
        categoryZH: "宪法劳资自治原则"
      },
      {
        id: "ml-c2",
        side: "contra",
        textDE: "Gefahr von Arbeitsplatzabbau und Substitution von Niedrigqualifizierten durch Automatisierung.",
        textZH: "劳动力成本跃升可能迫使中小企业裁员、外包或加速以机器替代低技能劳动力。",
        weight: 2,
        categoryDE: "Beschaeftigungseffekte",
        categoryZH: "新古典就业挤出"
      }
    ],
    sachurteilGuideDE: "Sachurteil: Empirische Beschäftigungseffekte und Kaufkraftentwicklung anhand von Bundesbank-/DIW-Daten prüfen.",
    sachurteilGuideZH: "事实裁决 (Sachurteil)：引用德国央行及 DIW 实证数据，评估最低工资对低端就业岗位与通胀的具体冲击。",
    werturteilGuideDE: "Werturteil: Spannung zwischen verfassungsrechtlicher Tarifautonomie und sozialstaatlicher Fürsorgepflicht abwägen.",
    werturteilGuideZH: "价值裁决 (Werturteil)：权衡基本法第9条劳资自治自由与第20条社会国托底人尊义务的规范优先级。",
    formulierungshilfe: "Während ökonomisch die Gefahr allokativer Verzerrungen und möglicher Rationalisierungsschübe im Niedriglohnsektor besteht, überwiegt verfassungsrechtlich der normative Auftrag des Sozialstaatsgebots, Arbeitnehmer vor existenzbedrohender Ausbeutung zu schützen.",
    chineseComment: "满分破题点：切忌只谈‘好不好’，先从 Sachurteil（实证就业效应）切入，再上升到 Werturteil（社会国 vs. 劳资自治自由）！"
  },
  "sowi-oekosteuer": {
    titleDE: "CO2-Bepreisung und Ökosteuer: Marktanreiz vs. Verteilungsgerechtigkeit",
    titleZH: "碳税与绿色生态税改革：外部性内部化 vs. 低收入家庭能源负担",
    questionDE: "Ist ein stetig steigender CO2-Preis das beste Leitinstrument für den klimaneutralen Umbau?",
    questionZH: "持续攀升的碳价格是否应作为德国实现气候中和的首要核心调控杠杆？",
    labelProDE: "Marktbasierte Allokation (Pigou-Prinzip)",
    labelProZH: "市场价格信号 / 庇古税修正外部性",
    labelContraDE: "Regressive Belastung (Soziale Härte)",
    labelContraZH: "累退税收痛点 / 弱势群体生活成本挤压",
    weights: [
      {
        id: "oe-p1",
        side: "pro",
        textDE: "Internalsierung externer Kosten: Preissignal setzt stärkste Anreize für Innovation und emissionsarme Technologien.",
        textZH: "负外部性内部化：真实反映环境代价，利用价格杠杆倒逼企业技术创新与绿色转型。",
        weight: 3,
        categoryDE: "Marktökonomie",
        categoryZH: "环境经济学理论"
      },
      {
        id: "oe-p2",
        side: "pro",
        textDE: "Generationengerechtigkeit (BVerfG Klimabeschluss 2021): Schutz der Lebensgrundlagen künftiger Generationen.",
        textZH: "跨代正义（德国联邦宪法法院2021裁决）：今天减排是为了捍卫后代人的根本自由生存权利。",
        weight: 3,
        categoryDE: "Verfassungsrang (Art. 20a GG)",
        categoryZH: "宪法基本法20a条"
      },
      {
        id: "oe-c1",
        side: "contra",
        textDE: "Regressive Wirkung: Höhere Heiz- und Kraftstoffkosten belasten untere Einkommensschichten prozentual drastischer.",
        textZH: "严重的累退效应：燃气与燃油涨价占低收入家庭支出比例极高，形成‘冷暖贫困’。",
        weight: 2,
        categoryDE: "Verteilungsgerechtigkeit",
        categoryZH: "分配公平考量"
      },
      {
        id: "oe-c2",
        side: "contra",
        textDE: "Gefahr der Deindustrialisierung und von Carbon Leakage bei unzureichendem EU-Grenzausgleich.",
        textZH: "若无完善的碳边境调节机制，过高的能源价格将导致本土高耗能制造业外流海外。",
        weight: 2,
        categoryDE: "Standortsicherung",
        categoryZH: "产业与区位安全"
      }
    ],
    sachurteilGuideDE: "Sachurteil: CO2-Vermeidungseffizienz und Einnahmenverwendung (Klimageld-Rückerstattung) bewerten.",
    sachurteilGuideZH: "事实裁决：核算碳减排实效，并检验通过‘气候红利（Klimageld）’返还民众的行政可行性。",
    werturteilGuideDE: "Werturteil: Abwägung zwischen ökologischer Generationenverantwortung (Art. 20a GG) und sozialer Teilhabe.",
    werturteilGuideZH: "价值裁决：在生态代际生存权与当代弱势群体的基本生活尊严之间寻找制度平衡。",
    formulierungshilfe: "Ein CO2-Preis ist allokationstheoretisch das effizienteste Instrument, erlangt jedoch gesellschaftliche und verfassungsrechtliche Legitimität erst dann, wenn seine regressive Belastungswirkung durch einen zügigen sozialen Ausgleich (z. B. Pro-Kopf-Klimageld) kompensiert wird.",
    chineseComment: "德国Abitur社科高频考题：必须结合【Klimabeschluss 2021】与【Klimageld 气候补贴】两手抓，才是完整满分答卷！"
  },
  "sowi-standort-deutschland": {
    titleDE: "Standort Deutschland: Industrielle Wettbewerbsfähigkeit vs. Sozialstandards",
    titleZH: "德国工业区位竞争力辩论：企业减负去官僚化 vs. 维持高福利高环保标准",
    questionDE: "Droht Deutschland eine strukturelle Deindustrialisierung ohne grundlegende Reformen?",
    questionZH: "若不推行大刀阔斧的去管制与降税改革，德国是否面临实质性的结构性去工业化？",
    labelProDE: "Reformdruck / Angebotspolitik",
    labelProZH: "危机预警 / 供给侧减负去行政壁垒",
    labelContraDE: "Strukturstärke / Modell Resilienz",
    labelContraZH: "制度韧性 / 高技能创新与社会稳定资产",
    weights: [
      {
        id: "st-p1",
        side: "pro",
        textDE: "Hohe Energiekosten, Steuerbelastung und ausufernde Bürokratie hemmen private Investitionen.",
        textZH: "电价高企、全球前列的综合企业税率与繁琐审批流程严重抑制民间固定资产投资意愿。",
        weight: 2,
        categoryDE: "Kostenfaktoren",
        categoryZH: "供给侧成本约束"
      },
      {
        id: "st-p2",
        side: "pro",
        textDE: "Fachkräftemangel und demografischer Wandel bedrohen die Innovationskraft industrieller Cluster.",
        textZH: "人口老龄化加剧，专业技术工人短缺危机直接危及隐形冠军与传统制造集群。",
        weight: 2,
        categoryDE: "Demografie",
        categoryZH: "人口结构瓶颈"
      },
      {
        id: "st-c1",
        side: "contra",
        textDE: "Exzellente Infrastruktur, hohe F&E-Quote, duale Ausbildung und stabile rechtliche Rahmenbedingungen.",
        textZH: "世界顶尖的‘双元制’职业教育、高研发投入占比、法治健全度与欧洲单一市场腹地优势。",
        weight: 3,
        categoryDE: "Qualitative Standortvorteile",
        categoryZH: "制度与人才护城河"
      },
      {
        id: "st-c2",
        side: "contra",
        textDE: "Sozialer Frieden: Geringe Streikquoten durch etablierte Mitbestimmung und Sozialpartnerschaft.",
        textZH: "社会和平与低罢工率：劳资共决制（Mitbestimmung）与社会伙伴关系构成了无价的生产力护盾。",
        weight: 2,
        categoryDE: "Sozialpartnerschaft",
        categoryZH: "社会伙伴治理红利"
      }
    ],
    sachurteilGuideDE: "Sachurteil: FDI-Kapitalabflüsse gegen langfristige Produktivitäts- und Exportkennzahlen spiegeln.",
    sachurteilGuideZH: "事实裁决：比对近年外国直接投资（FDI）外流数据与隐形冠军专利出口产出率。",
    werturteilGuideDE: "Werturteil: Balance zwischen wirtschaftlicher Dynamik und Bewahrung des Rheinischen Kapitalismus.",
    werturteilGuideZH: "价值裁决：在纯粹英美式新自由主义与德国社会市场经济（莱茵模式）的基石间取舍。",
    formulierungshilfe: "Die Diagnose einer drohenden Deindustrialisierung verkennt die spezifischen institutionellen Stärken des Standorts Deutschland; gleichwohl erfordert der Transformationsdruck gezielte Entlastungen bei Bürokratie und Energieabgaben.",
    chineseComment: "文科解题公式：避免非黑即白的唱衰或盲目乐观，用【Qualitative vs. Quantitative Standortfaktoren】分类法破题！"
  },
  "deutsch-sachtext-argument": {
    titleDE: "Sachtextanalyse: Argumentationsstrukturen und rhetorische Überzeugungskraft",
    titleZH: "议论文深度剖析：事实论据、权威论据与修辞说服力天平",
    questionDE: "Ist die Argumentation des vorliegenden Autors stichhaltig und normativ überzeugend?",
    questionZH: "本文作者的论证链条在逻辑形式上是否严密，抑或存在修辞诱导与非形式谬误？",
    labelProDE: "Stichhaltig & Logisch fundiert (Pro)",
    labelProZH: "逻辑严密 / 论据客观与因果成立",
    labelContraDE: "Rhetorisch manipulierend / Defizitär (Contra)",
    labelContraZH: "逻辑漏洞 / 情感绑架与权威绑架",
    weights: [
      {
        id: "dt-p1",
        side: "pro",
        textDE: "Faktenargumente: Verifizierbare empirische Daten und nachprüfbare Quellen als Begründungsfundament.",
        textZH: "坚实的事实论据：引用经得起检验的统计数据与公开调查作为主旨论证基石。",
        weight: 2,
        categoryDE: "Faktenargument",
        categoryZH: "客观事实支撑"
      },
      {
        id: "dt-p2",
        side: "pro",
        textDE: "Deduktive Schlüssigkeit: Klare Prämisse-Konklusion-Struktur ohne interne Widersprüche.",
        textZH: "演绎逻辑闭环：前提清晰推导出结论，各小节过渡自然且无推论断层。",
        weight: 3,
        categoryDE: "Logische Struktur",
        categoryZH: "推论严密性"
      },
      {
        id: "dt-c1",
        side: "contra",
        textDE: "Argumentum ad verecundiam: Einseitige Berufung auf Autoritäten ohne inhaltliche Differenzierung.",
        textZH: "诉诸权威谬误：未对专业争议进行辩证讨论，仅机械搬出名人言论代替论证过程。",
        weight: 2,
        categoryDE: "Scheinargument",
        categoryZH: "假性伪论据"
      },
      {
        id: "dt-c2",
        side: "contra",
        textDE: "Emotionale Aufladung: Einsatz suggestiver Metaphern und Polemik zur Überwältigung des Lesers.",
        textZH: "过度煽情修辞：使用恐吓性隐喻或情绪化煽动词汇，违反了德国教学论禁止强制灌输原则。",
        weight: 2,
        categoryDE: "Rhetorische Mittel",
        categoryZH: "诱导性修辞"
      }
    ],
    sachurteilGuideDE: "Sachurteil: Trennung von Thesen, Argumenttypen und rhetorischen Mitteln im Textverlauf darlegen.",
    sachurteilGuideZH: "事实分析：梳理作者的核心中心论点、各级分论点以及论据类型（事实/权威/规范/类比）。",
    werturteilGuideDE: "Werturteil: Gesamtüberzeugungskraft und Angemessenheit der sprachlichen Mittel für die Zielgruppe beurteilen.",
    werturteilGuideZH: "批判评价：综合评定该文本是理性探讨公共议题的典范，还是带有单向说教色彩的宣传文。",
    formulierungshilfe: "Wenngleich der Verfasser durch eine dichte Aneinanderreihung normativer Argumente eine hohe Dringlichkeit erzeugt, schwächt der Verzicht auf empirische Belege die argumentative Stichhaltigkeit seines Gesamturteils.",
    chineseComment: "德语会考Sachtext必杀技：永远不要只总结‘说了什么’，必须用【Argumentationstyp + Rhetorische Absicht + Wirkung】三件套答题！"
  }

};

// 动态为未在静态表中硬编码的 GeWi 议题生成 100% 对齐主题的辩证天平方案，坚决杜绝任何无关默认回退！
function getOrGenerateBalanceCase(sim: SimEntry): BalanceCaseData {
  if (GEWI_BALANCE_CASES[sim.id]) {
    return GEWI_BALANCE_CASES[sim.id];
  }
  
  const titleDE = sim.titleDE || sim.titleZH || sim.id;
  const titleZH = sim.titleZH || sim.titleDE || sim.id;
  const fachLabel = sim.fach === "Philosophie" ? "哲学伦理" : sim.fach === "Deutsch" ? "德语思辨" : "社科经济";
  
  return {
    titleDE: `${titleDE} (Didaktische Diskursanalyse)`,
    titleZH: `${titleZH} · 德国高中思辨与价值天平研学`,
    questionDE: `Inwiefern lässt sich der thematische Kern von „${titleDE}“ unter Abwägung ethischer, fachlicher und normativer Kriterien überzeugend beurteilen?`,
    questionZH: `围绕“${titleZH}”的核心争议，如何在事实有效性（Sachurteil）与价值规范性（Werturteil）之间做出严谨的辩证权衡？`,
    labelProDE: `Pro-These / Begründende Argumente (${sim.fach})`,
    labelProZH: `支持方观点 / 理论与制度依据 (${fachLabel})`,
    labelContraDE: `Contra-These / Kritische Gegenposition`,
    labelContraZH: `反对方观点 / 局限性与风险防范`,
    weights: [
      {
        id: `${sim.id}-p1`,
        side: "pro",
        textDE: `Fundierung im Lehrplan: Relevanz von ${titleDE} für die systematische Erkenntnisgewinnung und Problemlösung im Fach ${sim.fach}.`,
        textZH: `学科大纲基石：${titleZH} 是德国高中 ${sim.fach} 核心考点，为认知框架与现实问题剖析提供了坚实的理论工具。`,
        weight: 3,
        categoryDE: `Fachliche Fundierung (${sim.fach})`,
        categoryZH: "学科理论基石"
      },
      {
        id: `${sim.id}-p2`,
        side: "pro",
        textDE: `Praktische Wirksamkeit: Gezielter Einsatz methodischer Ansätze zur nachhaltigen Gestaltung gesellschaftlicher/fachlicher Prozesse.`,
        textZH: `实践有效性（Wirksamkeit）：该范式能在现实中指导政策落地、文本严谨阐释或伦理决策实践。`,
        weight: 2,
        categoryDE: "Wirksamkeitskriterium",
        categoryZH: "实践有效性"
      },
      {
        id: `${sim.id}-c1`,
        side: "contra",
        textDE: `Normative Einwände & Zielkonflikte: Mögliche unbeabsichtigte Nebenwirkungen oder ethische Dilemmata bei unreflektierter Anwendung.`,
        textZH: `规范性目标冲突：若不加批判地绝对化应用该理论，可能忽视复杂的现实约束或引发伦理公平性争议。`,
        weight: 3,
        categoryDE: "Normativer Zielkonflikt",
        categoryZH: "规范性价值冲突"
      },
      {
        id: `${sim.id}-c2`,
        side: "contra",
        textDE: `Allokative & institutionelle Restriktionen: Grenzen der Durchsetzbarkeit vor dem Hintergrund realer Systemzwänge.`,
        textZH: `现实系统性制约：在多元社会制度与制度边界下，该方案的推行可能面临制度阻力与资源再分配成本。`,
        weight: 2,
        categoryDE: "Systemische Grenzen",
        categoryZH: "现实边界考量"
      }
    ],
    sachurteilGuideDE: `Sachurteil: Fachliche Prämissen, empirische Daten und logische Schlüssigkeit von „${titleDE}“ herausarbeiten.`,
    sachurteilGuideZH: `事实裁决 (Sachurteil)：基于概念定义、因果逻辑与客观实据，分析“${titleZH}”的内在推导是否成立。`,
    werturteilGuideDE: `Werturteil: Vereinbarkeit mit grundlegenden Werten (Menschenwürde, Gerechtigkeit, Freiheit, Verfassung) prüfen.`,
    werturteilGuideZH: `价值裁决 (Werturteil)：参照人的尊严、社会正义、自由自治或基本法准则，对该命题做出最终的伦理定性。`,
    formulierungshilfe: `Bei der differenzierten Beurteilung von ${titleDE} zeigt sich, dass fachliche Effizienzkriterien und normative Gerechtigkeitsprinzipien in einem Spannungsverhältnis stehen. Während die deskriptive Analyse wesentliche Mechanismen verdeutlicht, erfordert das abschließende Werturteil eine sorgfältige Güterabwägung.`,
    chineseComment: `满分破题要诀：面对“${titleZH}”，千万不可凭感性喜好下结论！必须首先在天平中放上支撑论据与批判论据，明确界定 Sachurteil 与 Werturteil 的分界线。`
  };
}


// =========================================================================
// 2. 🏛️ 康德绝对命令 4 步检验机 (Kantscher Navigator)
// =========================================================================

interface KantScenario {
  id: string;
  nameDE: string;
  nameZH: string;
  maximeDE: string;
  maximeZH: string;
  naturgesetzDE: string;
  naturgesetzZH: string;
  widerspruchDenken: boolean;
  grundDenkenDE: string;
  grundDenkenZH: string;
  widerspruchWollen: boolean;
  grundWollenDE: string;
  grundWollenZH: string;
  pflichtTyp: "vollkommen" | "unvollkommen";
  pflichtTypZH: "完全义务（绝对禁止）" | "不完全义务（德行倡导）";
  klausurUrteilDE: string;
  klausurUrteilZH: string;
}

const KANT_SCENARIOS: KantScenario[] = [
  {
    id: "falsches-versprechen",
    nameDE: "Geld leihen durch falsches Versprechen",
    nameZH: "以虚假还款承诺借钱 (经典假还钱准则)",
    maximeDE: "„Wenn ich in Geldnot bin, leihe ich mir Geld und verspreche es zurückzuzahlen, obwohl ich weiß, dass ich es niemals kann.“",
    maximeZH: "“每当我陷入金钱拮据时，我都借钱并承诺还款，即便我明知自己永远无法偿还。”",
    naturgesetzDE: "„Jeder Mensch darf sich in Notlagen Geld leihen und ein trügerisches Rückzahlungsversprechen abgeben.“",
    naturgesetzZH: "“全人类在陷入窘境时，均可做出虚假的还款承诺来获取借款。”",
    widerspruchDenken: true,
    grundDenkenDE: "Widerspruch im Denken: Wenn jeder lügt, glaubt niemand mehr einem Versprechen. Das Institut des Versprechens vernichtet sich selbst.",
    grundDenkenZH: "思辨逻辑自相矛盾：若人人皆作伪誓，‘还钱承诺’这一制度本身将不复存在，没人会再借钱给你，该准则在概念上彻底自我毁灭。",
    widerspruchWollen: true,
    grundWollenDE: "Folgewiderspruch: Man kann unmöglich ein Gesetz wollen, das das Vertrauen in die eigene Zusage von vornherein zerstört.",
    grundWollenZH: "意志自相矛盾：行为人不可能合乎理性地意愿生活在一个信用被彻底瓦解、自己求助无门的世界中。",
    pflichtTyp: "vollkommen",
    pflichtTypZH: "完全义务（绝对禁止）",
    klausurUrteilDE: "Da die Maxime bereits einen Widerspruch im Denken hervorruft, resultiert daraus eine vollkommene Pflicht: Das Verbot des falschen Versprechens gilt ausnahmslos kategorisch.",
    klausurUrteilZH: "由于该准则在纯粹概念检验中已产生思辨自相矛盾，因此派生出一项完全义务（Vollkommene Pflicht）：任何情况下绝对禁止作伪誓！"
  },
  {
    id: "unterlassene-hilfe",
    nameDE: "Unterlassene Hilfeleistung aus Gleichgültigkeit",
    nameZH: "对处于困境中的人见死不救 (冷眼旁观准则)",
    maximeDE: "„Ich helfe anderen Menschen in Not nicht, damit mein eigener Wohlstand unberührt bleibt.“",
    maximeZH: "“当他人处于绝境呼救时，我选择袖手旁观，以便全心享受我自己的安逸生活。”",
    naturgesetzDE: "„Niemand hilft anderen Menschen in existenzieller Not; jeder lebt ausschließlich für sich.“",
    naturgesetzZH: "“全人类都互不相助，人人在苦难面前自生自灭，冷眼相待。”",
    widerspruchDenken: false,
    grundDenkenDE: "Kein Widerspruch im Denken: Eine Welt völlig egoistischer Menschen ist physikalisch und begrifflich widerspruchsfrei denkbar.",
    grundDenkenZH: "无逻辑矛盾：一个纯粹冷酷自私、互不关照的世界在概念上是完全可以想象并运转的（如丛林法则）。",
    widerspruchWollen: true,
    grundWollenDE: "Widerspruch im Wollen: Ein vernünftiges Wesen kann diese Welt nicht wollen, da es in eigener Hilflosigkeit die Solidarität anderer berauben würde.",
    grundWollenZH: "意志自相矛盾：作为一个有血有肉有弱点的理性存在者，你绝不可能合乎逻辑地理性意愿一个‘自己落难时无人援救’的世界。",
    pflichtTyp: "unvollkommen",
    pflichtTypZH: "不完全义务（德行倡导）",
    klausurUrteilDE: "Weil die Maxime zwar denkbar ist, aber dem vernünftigen Willen widerspricht, begründet sie eine unvollkommene Pflicht zur Hilfsbereitschaft.",
    klausurUrteilZH: "虽然该准则在思辨上可以构想，但遭到实践理性意志的断然否定，因此构成不完全义务（Unvollkommene Pflicht）：人有践行仁爱救助的道德义务。"
  },
  {
    id: "suizid-ueberdruss",
    nameDE: "Suizid aus Verzweiflung und Lebensüberdruss",
    nameZH: "绝望厌世而自杀 (摧毁自我生命准则)",
    maximeDE: "„Aus Selbstliebe mache ich es mir zum Prinzip, mein Leben zu verkürzen, wenn die Übel die Annehmlichkeiten überwiegen.“",
    maximeZH: "“出于自爱原则，一旦痛苦超过了快乐，我就主动缩短并了结自己的生命。”",
    naturgesetzDE: "„Die Natur treibt Lebewesen aus demselben Selbsterhaltungstrieb an, sich bei Leiden selbst zu zerstören.“",
    naturgesetzZH: "“原本用于保护生命的自爱本能，在遭受痛苦时被普遍用来摧毁生命本身。”",
    widerspruchDenken: true,
    grundDenkenDE: "Widerspruch im Denken: Die Naturanlage zur Selbsterhaltung kann nicht zugleich die Auslöschung des Lebens bewirken.",
    grundDenkenZH: "思辨逻辑自相矛盾：‘自爱与自我保护’的本质本能决不能合乎逻辑地反转为毁灭生命自身的合法源泉。",
    widerspruchWollen: true,
    grundWollenDE: "Widerspruch im Wollen: Das Leben als Bedingung allen moralischen Handelns kann nicht rational negiert werden.",
    grundWollenZH: "意志自相矛盾：道德主体是一切尊严与义务的载体，理性绝不可能意愿摧毁自身的存续根基。",
    pflichtTyp: "vollkommen",
    pflichtTypZH: "完全义务（绝对禁止）",
    klausurUrteilDE: "Der Suizid verletzt die vollkommene Pflicht gegen sich selbst, da der Mensch sich selbst nicht bloß als Mittel zur Leidensvermeidung instrumentalisieren darf.",
    klausurUrteilZH: "自杀违背了对自身的完全义务（Pflicht gegen sich selbst）：人绝不能把自己仅仅当作摆脱肉体痛苦的消耗工具。"
  }
];

// =========================================================================
// 3. 🎭 弗莱塔格戏剧五幕构建台 (Freytag-Drama-Studio)
// =========================================================================

interface DramaPlay {
  id: string;
  titleDE: string;
  titleZH: string;
  autor: string;
  epoche: string;
  acts: Array<{
    actNum: 1 | 2 | 3 | 4 | 5;
    actNameDE: string;
    actNameZH: string;
    tensionLevel: number; // 1-100
    sceneTitleDE: string;
    sceneTitleZH: string;
    quoteDE: string;
    quoteZH: string;
    functionDE: string;
    functionZH: string;
    ehzClueDE: string;
    ehzClueZH: string;
  }>;
}

const DRAMA_PLAYS: DramaPlay[] = [
  {
    id: "faust-1",
    titleDE: "Faust I (Johann Wolfgang von Goethe)",
    titleZH: "《浮士德 I》：从学者悲剧到格雷特琴毁灭",
    autor: "J. W. Goethe",
    epoche: "Weimarer Klassik / Sturm und Drang",
    acts: [
      {
        actNum: 1,
        actNameDE: "I. Exposition",
        actNameZH: "第一幕：开端阐述 (Gelehrtenmonolog)",
        tensionLevel: 30,
        sceneTitleDE: "Szene: Nacht (Vers 354 ff.)",
        sceneTitleZH: "黑夜 · 书斋独白：认识论绝望",
        quoteDE: "„Habe nun, ach! Philosophie, Juristerei und Medizin... durchaus studiert mit heißem Bemühn. Da steh ich nun, ich armer Tor! Und bin so klug als wie zuvor.“",
        quoteZH: "“唉！我把哲学、法律和医学……都钻研个透。如今却像个傻子站在原地，一无所知！”",
        functionDE: "Einführung in die existentielle Sinnkrise des Renaissance-Menschen; Scheitern an der Magie (Erdgeist); Todessehnsucht.",
        functionZH: "确立浮士德作为文艺复兴式知识分子的终极精神危机：求知欲受挫与自杀冲动，为契约埋下伏笔。",
        ehzClueDE: "AFB I: Charakterisieren Sie Fausts Verzweiflung als Zusammenbruch des rationalen Aufklärungsideals.",
        ehzClueZH: "会考重点：剖析浮士德对理性启蒙神话的彻底破灭感。"
      },
      {
        actNum: 2,
        actNameDE: "II. Steigende Handlung",
        actNameZH: "第二幕：冲突激化 (Pakt mit Mephisto)",
        tensionLevel: 55,
        sceneTitleDE: "Szene: Studierzimmer (Pakt)",
        sceneTitleZH: "书斋 · 浮士德与魔鬼血的盟约",
        quoteDE: "„Werd ich zum Augenblicke sagen: Verweile doch! du bist so schön! Dann magst du mich in Fesseln schlagen, dann will ich gern zugrunde gehn!“",
        quoteZH: "“若我对某一瞬间呼喊：停留片刻吧，你多么美丽！那时你便可将我套上锁链，我甘愿沉沦灭亡！”",
        functionDE: "Erregendes Moment: Teufelspakt als dialektischer Motor. Mephisto als verjüngende, aber destruktive Triebkraft.",
        functionZH: "激化行动契机：魔鬼血契构成全局冲突推进的动力引擎。浮士德自限死约，跨越道德边界。",
        ehzClueDE: "AFB II: Analysieren Sie den Pakt als Wette: Fausts Streben (Titanismus) versus Mephistos Nihilismus.",
        ehzClueZH: "会考重点：辨析浮士德永不停息的泰坦狂飙追求与梅菲斯特绝对虚无主义的对决。"
      },
      {
        actNum: 3,
        actNameDE: "III. Höhepunkt & Peripetie",
        actNameZH: "第三幕：最高潮与命运突变 (Gretchentragödie)",
        tensionLevel: 95,
        sceneTitleDE: "Szene: Marthens Garten & Brunnen",
        sceneTitleZH: "玛塔花园 · 沉沦诱惑与宗教拷问",
        quoteDE: "„Nun sag, wie hast du's mit der Religion? Du bist ein herzlich guter Mann, allein ich glaub, du hältst nicht viel davon.“",
        quoteZH: "“告诉我，你对宗教究竟怎么看？你是个大好人，但我怕你对此并不敬畏。”",
        functionDE: "Peripetie: Der Wendepunkt der Handlung. Verführung Gretchens; Tötung des Bruders Valentin; unausweichliche Schuld.",
        functionZH: "全剧命运大逆转点（Peripetie）：格雷特琴失贞受孕、母亲误饮毒药身亡、兄长瓦伦廷遇害，悲剧滑向不可逆深渊。",
        ehzClueDE: "AFB II: Deuten Sie die 'Gretchenfrage' als unüberbrückbaren Graben zwischen traditioneller Frömmigkeit und säkularer Autonomie.",
        ehzClueZH: "会考重点：‘格雷特琴问题’揭示了中世纪传统虔信与近代世俗理智之间不可弥合的断裂。"
      },
      {
        actNum: 4,
        actNameDE: "IV. Retardierendes Moment",
        actNameZH: "第四幕：延缓动作与虚假希望 (Walpurgisnacht)",
        tensionLevel: 70,
        sceneTitleDE: "Szene: Walpurgisnacht (Harz)",
        sceneTitleZH: "瓦普几斯之夜 · 荒诞沉醉与心象幻视",
        quoteDE: "„Mephisto, siehst du dort ein blasses, schönes Kind allein und ferne stehen?... Gretchen gleicht sie.“",
        quoteZH: "“梅菲斯特，你看见那边那个苍白美丽的孩子独自孤零零站着吗？……她长得真像格雷特琴。”",
        functionDE: "Retardation: Scheinbare Ablenkung im dionysischen Hexenrausch; Fausts Gewissen regt sich beim Anblick von Gretchens Schemen.",
        functionZH: "延缓动作（Retardierendes Moment）：通过哈尔茨山荒淫狂欢制造冲突暂停假象，然而美杜莎幻影唤醒了浮士德良知，直扑死刑地牢。",
        ehzClueDE: "AFB III: Erläutern Sie, warum die Walpurgisnacht dramaturgisch als Retardation fungiert und wie Fausts moralische Zerrissenheit sichtbar wird.",
        ehzClueZH: "会考得分关键：为什么第4幕不是多余插曲？它正是通过感官麻痹对比，加深最终地牢对峙的悲壮与虚假希望的破灭。"
      },
      {
        actNum: 5,
        actNameDE: "V. Katastrophe / Erlösung",
        actNameZH: "第五幕：悲剧灾难与终极判决 (Kerker)",
        tensionLevel: 85,
        sceneTitleDE: "Szene: Kerker",
        sceneTitleZH: "阴森地牢 · 处决前夕与灵魂得救",
        quoteDE: "„Heinrich! Mir graut's vor dir! — Stimme von oben: Ist gerettet!“",
        quoteZH: "“亨利！我真对你感到恐惧！——上方天音：她得救了！”",
        functionDE: "Finale Katastrophe Gretchens physischer Tod, doch transzendente Erlösung durch Unterwerfung unter Gottes Gericht.",
        functionZH: "最终灾难与救赎：格雷特琴断然拒绝跟随魔鬼私奔，肉身走向断头台，灵魂却因拒绝虚伪而获得天音救赎（Ist gerettet）。",
        ehzClueDE: "AFB III: Beurteilen Sie den Schluss: Scheitern des bürgerlichen Individuums bei gleichzeitiger sittlicher Katharsis.",
        ehzClueZH: "会考满分结论：格雷特琴以肉身牺牲捍卫了道德纯洁性，达成了亚里士多德意义上的怜悯与崇高净化（Katharsis）。"
      }
    ]
  }
];

// =========================================================================
// 4. 🎵 诗歌韵律节拍打击器 (Lyrik-Metrum-Taktstock)
// =========================================================================

interface PoemLine {
  id: string;
  titleDE: string;
  titleZH: string;
  autor: string;
  epoche: string;
  syllables: Array<{ text: string; stressed: boolean }>;
  correctMetrum: "jambus" | "trochaeus" | "daktylus" | "alexandriner";
  correctMetrumZH: string;
  rhymeScheme: "paarreim" | "kreuzreim" | "umarmend";
  rhymeSchemeZH: string;
  wirkungDE: string;
  wirkungZH: string;
}

const POEM_SAMPLES: PoemLine[] = [
  {
    id: "gryphius-traenen",
    titleDE: "Tränen des Vaterlandes (Andreas Gryphius)",
    titleZH: "《祖国的泪水》：三十年战争浩劫与六音步抑扬格",
    autor: "Andreas Gryphius (1636)",
    epoche: "Barock (Vanitas & Memento Mori)",
    syllables: [
      { text: "Wir", stressed: false },
      { text: "sind", stressed: true },
      { text: "doch", stressed: false },
      { text: "nun", stressed: true },
      { text: "mehr", stressed: false },
      { text: "ganz,", stressed: true },
      { text: "ja", stressed: false },
      { text: "mehr", stressed: true },
      { text: "denn", stressed: false },
      { text: "ganz", stressed: true },
      { text: "ver-", stressed: false },
      { text: "heeret!", stressed: true }
    ],
    correctMetrum: "alexandriner",
    correctMetrumZH: "亚历山大体 (Alexandriner: 6步抑扬格，中间带明显停顿 Zäsur)",
    rhymeScheme: "umarmend",
    rhymeSchemeZH: "抱韵 (abba)",
    wirkungDE: "Der Alexandriner mit seiner starren Mittelzäsur spiegelt die barocke Antithese von irdischem Chaos und göttlicher Ewigkeit wider.",
    wirkungZH: "六音步亚历山大体中严格的对称半行停顿（Zäsur），生动复现了巴洛克时代‘人间战火虚无 (Vanitas)’与‘天国永恒’的尖锐二元对立。"
  },
  {
    id: "eichendorff-mondnacht",
    titleDE: "Mondnacht (Joseph von Eichendorff)",
    titleZH: "《月夜》：浪漫主义轻柔入梦的三音步抑扬格",
    autor: "Joseph von Eichendorff (1837)",
    epoche: "Romantik (Sehnsucht & Naturfrömmigkeit)",
    syllables: [
      { text: "Es", stressed: false },
      { text: "war,", stressed: true },
      { text: "als", stressed: false },
      { text: "hätt", stressed: true },
      { text: "der", stressed: false },
      { text: "Him-", stressed: true },
      { text: "mel", stressed: false }
    ],
    correctMetrum: "jambus",
    correctMetrumZH: "抑扬格 (Jambus: ◡ —)",
    rhymeScheme: "kreuzreim",
    rhymeSchemeZH: "交叉韵 (abab)",
    wirkungDE: "Der sanfte Jambus mit abwechselnd weiblichen und männlichen Kadenzen erzeugt einen schwebenden, wiegenden Traumrhythmus.",
    wirkungZH: "抑扬格（◡ —）配合阴阳韵脚交替，营造出灵魂宛如展翅飞越大地的梦幻空灵之美。"
  }
];

// =========================================================================
// 核心主组件：GewiInteractiveWorkbench
// =========================================================================

export function GewiInteractiveWorkbench({
  sim,
  lang,
  studioMode: _studioMode = false,
  onExportFinding
}: GewiWorkbenchProps) {
  const de = lang === "de";
  const [activeTab, setActiveTab] = useState<"interactive" | "causality" | "klausur">("interactive");

  // 1. 判断当前匹配哪一个直观工坊模式
  const mode = useMemo(() => {
    if (sim.id === "philo-kant-kategorischer") return "kant";
    if (sim.id === "deutsch-drama-freytag") return "drama";
    if (sim.id === "deutsch-lyrik-metrum") return "lyrik";
    if (sim.id === "deutsch-brecht-episch") return "brecht";
    if (sim.id === "deutsch-kafka-verwandlung") return "kafka";
    // 其余绝大多数哲学、伦理及社科理论议题，全部接入直观动态天平
    return "balance";
  }, [sim.id]);

  // -----------------------------------------------------------------------
  // 子工坊 1：天平状态 (Urteils-Waage)
  // -----------------------------------------------------------------------
  const balanceCase = useMemo(() => {
    return getOrGenerateBalanceCase(sim);
  }, [sim]);

  const [activeWeightIds, setActiveWeightIds] = useState<string[]>(() => {
    return getOrGenerateBalanceCase(sim).weights.slice(0, 3).map((w) => w.id);
  });

  // 当切换不同模拟时，自动同步重置砝码为当前模拟案例的专属论据
  useEffect(() => {
    setActiveWeightIds(balanceCase.weights.slice(0, 3).map((w) => w.id));
  }, [balanceCase]);

  const toggleWeight = (id: string) => {
    setActiveWeightIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const proWeightSum = useMemo(() => {
    return balanceCase.weights
      .filter((w) => w.side === "pro" && activeWeightIds.includes(w.id))
      .reduce((sum, w) => sum + w.weight, 0);
  }, [balanceCase, activeWeightIds]);

  const contraWeightSum = useMemo(() => {
    return balanceCase.weights
      .filter((w) => w.side === "contra" && activeWeightIds.includes(w.id))
      .reduce((sum, w) => sum + w.weight, 0);
  }, [balanceCase, activeWeightIds]);

  // 天平倾角 (-18° 到 +18°)
  const tiltAngle = useMemo(() => {
    const diff = proWeightSum - contraWeightSum; // 正数向左倾(Pro), 负数向右倾(Contra)
    return Math.max(-18, Math.min(18, diff * 3.5));
  }, [proWeightSum, contraWeightSum]);

  // -----------------------------------------------------------------------
  // 子工坊 2：康德定言命令 4 步检验机
  // -----------------------------------------------------------------------
  const [selectedKantId, setSelectedKantId] = useState<string>("falsches-versprechen");
  const [kantStep, setKantStep] = useState<number>(1);
  const activeKantScenario = useMemo(() => {
    return KANT_SCENARIOS.find((s) => s.id === selectedKantId) ?? KANT_SCENARIOS[0];
  }, [selectedKantId]);

  // -----------------------------------------------------------------------
  // 子工坊 3：戏剧五幕构建台
  // -----------------------------------------------------------------------
  const activeDrama = DRAMA_PLAYS[0];
  const [selectedActNum, setSelectedActNum] = useState<1 | 2 | 3 | 4 | 5>(3); // 默认定位 Peripetie
  const currentAct = useMemo(() => {
    return activeDrama.acts.find((a) => a.actNum === selectedActNum) ?? activeDrama.acts[2];
  }, [activeDrama, selectedActNum]);

  // -----------------------------------------------------------------------
  // 子工坊 4：诗歌格律节拍器与 Web Audio 节拍声
  // -----------------------------------------------------------------------
  const activePoem = POEM_SAMPLES[0];
  const [userSyllables, setUserSyllables] = useState(activePoem.syllables);
  const [isPlayingBeat, setIsPlayingBeat] = useState(false);
  const [currentBeatIdx, setCurrentBeatIdx] = useState<number | null>(null);

  const toggleSyllableStress = (idx: number) => {
    setUserSyllables((prev) =>
      prev.map((s, i) => (i === idx ? { ...s, stressed: !s.stressed } : s))
    );
  };

  const playRhythmAudio = () => {
    if (isPlayingBeat) return;
    setIsPlayingBeat(true);
    let idx = 0;
    const interval = setInterval(() => {
      if (idx >= userSyllables.length) {
        clearInterval(interval);
        setIsPlayingBeat(false);
        setCurrentBeatIdx(null);
        return;
      }
      setCurrentBeatIdx(idx);
      const isStressed = userSyllables[idx].stressed;
      try {
        const audioCtx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.frequency.setValueAtTime(isStressed ? 587.33 : 293.66, audioCtx.currentTime); // D5 vs D4
        gain.gain.setValueAtTime(0.2, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.12);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.13);
      } catch {
        // AudioContext blocked fallback
      }
      idx++;
    }, 380);
  };

  // 导出文本
  const handleExportText = (content: string) => {
    if (onExportFinding) {
      onExportFinding(content);
    } else {
      navigator.clipboard.writeText(content);
      alert(de ? "Erkenntnisse in Zwischenablage kopiert!" : "会考推演结论已复制到剪贴板！");
    }
  };

  return (
    <div className="flex flex-col gap-4 rounded-lg border border-[var(--line)] bg-[var(--surface)] p-5 transition-all">
      {/* 顶部标题与三维 Tab 导航 */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-[var(--line)] pb-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs uppercase font-semibold text-[var(--accent)] px-2 py-0.5 rounded border border-[var(--accent)]/30 bg-[var(--accent)]/5">
              {sim.fach} · {de ? sim.kategorieDE : sim.kategorieZH}
            </span>
            <span className="font-mono text-xs px-2 py-0.5 rounded border border-[var(--line)] bg-[var(--paper-subtle)] text-[var(--ink)]">
              {sim.stufe} · Gymnasiale Oberstufe
            </span>
          </div>
          <h2 className="font-serif text-lg font-bold text-[var(--ink)] mt-1.5">
            {de ? sim.titleDE : sim.titleZH}
          </h2>
        </div>

        {/* 顶部三大学习维度选项卡 */}
        <div className="flex items-center bg-[var(--paper-subtle)] p-1 rounded-md border border-[var(--line)] text-xs font-mono">
          <button
            type="button"
            onClick={() => setActiveTab("interactive")}
            className={`px-3 py-1.5 rounded transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTab === "interactive"
                ? "bg-[var(--surface)] text-[var(--accent)] font-bold shadow-xs border border-[var(--line)]/50"
                : "text-[var(--gray)] hover:text-[var(--ink)]"
            }`}
          >
            <span>{mode === "balance" ? "⚖️" : mode === "kant" ? "🏛️" : mode === "drama" ? "🎭" : "🎵"}</span>
            <span>{de ? "Interaktive Werkbank" : "直观互动工坊"}</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("causality")}
            className={`px-3 py-1.5 rounded transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTab === "causality"
                ? "bg-[var(--surface)] text-[var(--accent)] font-bold shadow-xs border border-[var(--line)]/50"
                : "text-[var(--gray)] hover:text-[var(--ink)]"
            }`}
          >
            <span>📖</span>
            <span>{de ? "Fachdidaktische Analyse" : "因果推演与机理"}</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("klausur")}
            className={`px-3 py-1.5 rounded transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTab === "klausur"
                ? "bg-[var(--surface)] text-[var(--accent)] font-bold shadow-xs border border-[var(--line)]/50"
                : "text-[var(--gray)] hover:text-[var(--ink)]"
            }`}
          >
            <span>📝</span>
            <span>{de ? "Klausur & EHZ-Standard" : "会考真题与评分标准"}</span>
          </button>
        </div>
      </div>

      {/* ===================================================================== */}
      {/* TAB 1: 直观文科互动工坊 (按具体学科模式分流渲染) */}
      {/* ===================================================================== */}
      {activeTab === "interactive" && (
        <div className="flex flex-col gap-5">
          {/* --------------------------------------------------------------- */}
          {/* 模式 A：⚖️ 辩证价值天平工坊 (Urteils- & Ethik-Waage) */}
          {/* --------------------------------------------------------------- */}
          {mode === "balance" && (
            <div className="flex flex-col gap-4">
              {/* 核心两难命题横幅 */}
              <div className="p-3.5 rounded-lg border border-[var(--line)] bg-[var(--paper-subtle)]/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div className="space-y-1">
                  <span className="font-mono text-[11px] font-bold text-[var(--accent)] uppercase tracking-wide">
                    {de ? "Leitfrage der Urteilsbildung (AFB III):" : "考纲核心裁决命题 (AFB III 辩证评价):"}
                  </span>
                  <p className="font-serif text-sm font-semibold text-[var(--ink)]">
                    {de ? balanceCase.questionDE : balanceCase.questionZH}
                  </p>
                </div>
                <div className="flex items-center gap-2 font-mono text-xs">
                  <span className="px-2.5 py-1 rounded bg-[var(--surface)] border border-[var(--line)] text-[var(--ink)]">
                    {de ? "Pro:" : "支持:"} <strong>{proWeightSum}★</strong>
                  </span>
                  <span className="px-2.5 py-1 rounded bg-[var(--surface)] border border-[var(--line)] text-[var(--ink)]">
                    {de ? "Contra:" : "反对:"} <strong>{contraWeightSum}★</strong>
                  </span>
                </div>
              </div>

              {/* 中央高保真 SVG 动态物理天平 */}
              <div className="relative rounded-lg border border-[var(--line)] bg-[var(--surface)] p-6 flex flex-col items-center justify-center overflow-hidden min-h-[220px]">
                {/* 动态天平裁决指针指示灯 */}
                <div className="absolute top-3 left-3 z-10">
                  <span
                    className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold border transition-colors ${
                      proWeightSum - contraWeightSum >= 2
                        ? "border-emerald-500/40 bg-emerald-50 text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300"
                        : contraWeightSum - proWeightSum >= 2
                        ? "border-rose-500/40 bg-rose-50 text-rose-800 dark:bg-rose-950/40 dark:text-rose-300"
                        : "border-amber-500/40 bg-amber-50 text-amber-800 dark:bg-amber-950/40 dark:text-amber-300"
                    }`}
                  >
                    <span className="w-2 h-2 rounded-full bg-current" />
                    {proWeightSum - contraWeightSum >= 2
                      ? de ? "🟢 Überwiegend Pro (Befürwortend)" : "🟢 判定倾向肯定 (支持立场)"
                      : contraWeightSum - proWeightSum >= 2
                      ? de ? "🔴 Überwiegend Contra (Ablehnend)" : "🔴 判定倾向否定 (反对立场)"
                      : de ? "⚖️ Ethisches Dilemma (Ausgewogen)" : "⚖️ 势均力敌的两难困境"}
                  </span>
                </div>

                {/* 物理杠杆动态天平 SVG */}
                <svg
                  viewBox="0 0 500 210"
                  className="w-full max-w-[500px] h-48 select-none transition-transform duration-500 ease-out"
                >
                  {/* 底座与中央立柱 */}
                  <path d="M 210 200 L 290 200 L 270 185 L 230 185 Z" fill="var(--line)" />
                  <rect x="245" y="45" width="10" height="145" fill="var(--line)" rx="2" />
                  <circle cx="250" cy="45" r="7" fill="var(--accent)" />

                  {/* 旋转横梁组 (依据 tiltAngle 进行旋转) */}
                  <g transform={`rotate(${-tiltAngle}, 250, 45)`} className="transition-transform duration-500 ease-out">
                    {/* 横梁 */}
                    <rect x="70" y="42" width="360" height="6" fill="var(--ink)" rx="3" />
                    {/* 中央刻度指针 */}
                    <polygon points="248,45 252,45 250,15" fill="var(--accent)" />

                    {/* 左托盘挂钩与托盘 (Pro) */}
                    <g transform="translate(85, 45)">
                      <line x1="0" y1="0" x2="-25" y2="70" stroke="var(--gray)" strokeWidth="1.5" strokeDasharray="3 2" />
                      <line x1="0" y1="0" x2="25" y2="70" stroke="var(--gray)" strokeWidth="1.5" strokeDasharray="3 2" />
                      <path d="M -45 70 Q 0 95 45 70 Z" fill="var(--paper-subtle)" stroke="var(--line)" strokeWidth="1.5" />
                      {/* 左托盘砝码堆叠视觉 */}
                      <text x="0" y="65" textAnchor="middle" fontSize="11" fontFamily="monospace" fill="var(--accent)" fontWeight="bold">
                        {proWeightSum > 0 ? `${proWeightSum}★ Pro` : "0"}
                      </text>
                    </g>

                    {/* 右托盘挂钩与托盘 (Contra) */}
                    <g transform="translate(415, 45)">
                      <line x1="0" y1="0" x2="-25" y2="70" stroke="var(--gray)" strokeWidth="1.5" strokeDasharray="3 2" />
                      <line x1="0" y1="0" x2="25" y2="70" stroke="var(--gray)" strokeWidth="1.5" strokeDasharray="3 2" />
                      <path d="M -45 70 Q 0 95 45 70 Z" fill="var(--paper-subtle)" stroke="var(--line)" strokeWidth="1.5" />
                      {/* 右托盘砝码堆叠视觉 */}
                      <text x="0" y="65" textAnchor="middle" fontSize="11" fontFamily="monospace" fill="var(--ink)" fontWeight="bold">
                        {contraWeightSum > 0 ? `${contraWeightSum}★ Contra` : "0"}
                      </text>
                    </g>
                  </g>
                </svg>

                <p className="text-xs font-mono text-[var(--gray)] mt-2">
                  {de
                    ? "Klicken Sie auf die Argument-Gewichte unten, um die Waage zu be- oder entlasten."
                    : "点击下方论据卡片，向天平托盘添加或移除论据砝码，观察天平倾斜与裁决演化。"}
                </p>
              </div>

              {/* 论据砝码选择区 (Pro vs Contra) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* 左栏：Pro 论据卡片 */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between border-b border-[var(--line)] pb-1.5">
                    <span className="font-mono text-xs font-bold text-[var(--accent)] flex items-center gap-1.5">
                      <span>✓</span>
                      <span>{de ? balanceCase.labelProDE : balanceCase.labelProZH}</span>
                    </span>
                    <span className="font-mono text-xs text-[var(--gray)]">{proWeightSum} ★</span>
                  </div>

                  <div className="space-y-2">
                    {balanceCase.weights
                      .filter((w) => w.side === "pro")
                      .map((w) => {
                        const isLoaded = activeWeightIds.includes(w.id);
                        return (
                          <div
                            key={w.id}
                            onClick={() => toggleWeight(w.id)}
                            className={`p-3 rounded-lg border text-xs cursor-pointer transition-all ${
                              isLoaded
                                ? "border-[var(--accent)] bg-[var(--accent)]/5 shadow-xs"
                                : "border-[var(--line)] bg-[var(--surface)] opacity-60 hover:opacity-90"
                            }`}
                          >
                            <div className="flex items-center justify-between font-mono mb-1">
                              <span className="text-[10px] uppercase font-bold text-[var(--accent)]">
                                {de ? w.categoryDE : w.categoryZH}
                              </span>
                              <span className="font-bold text-[var(--ink)]">
                                {"★".repeat(w.weight)} ({w.weight} Pkt)
                              </span>
                            </div>
                            <p className="font-sans text-[var(--ink)] leading-relaxed">
                              {de ? w.textDE : w.textZH}
                            </p>
                            <span className="mt-1.5 inline-block font-mono text-[10px] text-[var(--gray)]">
                              {isLoaded ? (de ? "✓ Auf Waagschale" : "✓ 已置于托盘") : (de ? "+ Auflegen" : "+ 点击上盘")}
                            </span>
                          </div>
                        );
                      })}
                  </div>
                </div>

                {/* 右栏：Contra 论据卡片 */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between border-b border-[var(--line)] pb-1.5">
                    <span className="font-mono text-xs font-bold text-[var(--ink)] flex items-center gap-1.5">
                      <span>✕</span>
                      <span>{de ? balanceCase.labelContraDE : balanceCase.labelContraZH}</span>
                    </span>
                    <span className="font-mono text-xs text-[var(--gray)]">{contraWeightSum} ★</span>
                  </div>

                  <div className="space-y-2">
                    {balanceCase.weights
                      .filter((w) => w.side === "contra")
                      .map((w) => {
                        const isLoaded = activeWeightIds.includes(w.id);
                        return (
                          <div
                            key={w.id}
                            onClick={() => toggleWeight(w.id)}
                            className={`p-3 rounded-lg border text-xs cursor-pointer transition-all ${
                              isLoaded
                                ? "border-[var(--ink)] bg-[var(--paper-subtle)] shadow-xs"
                                : "border-[var(--line)] bg-[var(--surface)] opacity-60 hover:opacity-90"
                            }`}
                          >
                            <div className="flex items-center justify-between font-mono mb-1">
                              <span className="text-[10px] uppercase font-bold text-[var(--gray)]">
                                {de ? w.categoryDE : w.categoryZH}
                              </span>
                              <span className="font-bold text-[var(--ink)]">
                                {"★".repeat(w.weight)} ({w.weight} Pkt)
                              </span>
                            </div>
                            <p className="font-sans text-[var(--ink)] leading-relaxed">
                              {de ? w.textDE : w.textZH}
                            </p>
                            <span className="mt-1.5 inline-block font-mono text-[10px] text-[var(--gray)]">
                              {isLoaded ? (de ? "✓ Auf Waagschale" : "✓ 已置于托盘") : (de ? "+ Auflegen" : "+ 点击上盘")}
                            </span>
                          </div>
                        );
                      })}
                  </div>
                </div>
              </div>

              {/* 会考做题三步引导台 (Scaffolding: Sachurteil -> Werturteil -> Synthese) */}
              <div className="rounded-lg border border-[var(--line)] bg-[var(--paper-subtle)]/30 p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-serif text-xs font-bold text-[var(--ink)] flex items-center gap-2">
                    <span>🧭</span>
                    <span>{de ? "Klausur-Urteilsbildung (Schritt-für-Schritt):" : "会考满分两步裁决引导法 (Sach- & Werturteil):"}</span>
                  </h4>
                  <button
                    type="button"
                    onClick={() => handleExportText(balanceCase.formulierungshilfe)}
                    className="font-mono text-xs px-2.5 py-1 rounded border border-[var(--line)] bg-[var(--surface)] hover:border-[var(--accent)] cursor-pointer"
                  >
                    {de ? "Urteil kopieren" : "复制裁决范文"}
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                  <div className="p-3 rounded border border-[var(--line)] bg-[var(--surface)] space-y-1">
                    <span className="font-mono font-bold text-[var(--accent)] block">
                      1. Sachurteil (事实裁决 / 效率性):
                    </span>
                    <p className="text-[var(--gray)] leading-relaxed font-sans">
                      {de ? balanceCase.sachurteilGuideDE : balanceCase.sachurteilGuideZH}
                    </p>
                  </div>
                  <div className="p-3 rounded border border-[var(--line)] bg-[var(--surface)] space-y-1">
                    <span className="font-mono font-bold text-[var(--ink)] block">
                      2. Werturteil (价值裁决 / 合法性与宪法):
                    </span>
                    <p className="text-[var(--gray)] leading-relaxed font-sans">
                      {de ? balanceCase.werturteilGuideDE : balanceCase.werturteilGuideZH}
                    </p>
                  </div>
                </div>

                <blockquote className="p-3 rounded bg-[var(--surface)] border-l-2 border-[var(--accent)] font-mono text-xs text-[var(--ink)] leading-relaxed italic">
                  "{balanceCase.formulierungshilfe}"
                </blockquote>
              </div>
            </div>
          )}

          {/* --------------------------------------------------------------- */}
          {/* 模式 B：🏛️ 康德绝对命令 4 步检验机 (Kantscher Navigator) */}
          {/* --------------------------------------------------------------- */}
          {mode === "kant" && (
            <div className="flex flex-col gap-4">
              {/* 情境选择器 */}
              <div className="flex flex-wrap items-center gap-2 p-2.5 rounded-lg border border-[var(--line)] bg-[var(--paper-subtle)]/40">
                <span className="font-mono text-xs text-[var(--gray)] mr-1">
                  🎯 {de ? "Klassische Maximen:" : "经典行为准则情境:"}
                </span>
                {KANT_SCENARIOS.map((sc) => (
                  <button
                    key={sc.id}
                    type="button"
                    onClick={() => {
                      setSelectedKantId(sc.id);
                      setKantStep(1);
                    }}
                    className={`font-mono text-xs px-3 py-1 rounded border transition-all cursor-pointer ${
                      selectedKantId === sc.id
                        ? "border-[var(--accent)] bg-[var(--surface)] text-[var(--accent)] font-bold shadow-xs"
                        : "border-[var(--line)] bg-[var(--surface)]/70 text-[var(--ink)] hover:border-[var(--accent)]/50"
                    }`}
                  >
                    {de ? sc.nameDE : sc.nameZH}
                  </button>
                ))}
              </div>

              {/* 4 步流程式检验导航步进条 */}
              <div className="grid grid-cols-4 gap-2 text-xs font-mono">
                {[
                  { step: 1, titleDE: "1. Maxime", titleZH: "1. 行为准则" },
                  { step: 2, titleDE: "2. Naturgesetz", titleZH: "2. 普遍法则" },
                  { step: 3, titleDE: "3. Widerspruch", titleZH: "3. 矛盾检验" },
                  { step: 4, titleDE: "4. Pflicht-Urteil", titleZH: "4. 义务裁决" }
                ].map((s) => (
                  <button
                    key={s.step}
                    type="button"
                    onClick={() => setKantStep(s.step)}
                    className={`p-2 rounded border text-center transition-all cursor-pointer ${
                      kantStep === s.step
                        ? "border-[var(--accent)] bg-[var(--accent)]/10 text-[var(--accent)] font-bold"
                        : kantStep > s.step
                        ? "border-[var(--line)] bg-[var(--paper-subtle)] text-[var(--ink)]"
                        : "border-[var(--line)]/50 bg-[var(--surface)] text-[var(--gray)]"
                    }`}
                  >
                    <span>{de ? s.titleDE : s.titleZH}</span>
                  </button>
                ))}
              </div>

              {/* 步骤内容卡片 */}
              <div className="p-5 rounded-lg border border-[var(--line)] bg-[var(--surface)] space-y-4">
                {kantStep === 1 && (
                  <div className="space-y-3">
                    <span className="font-mono text-xs font-bold text-[var(--accent)] block">
                      Schritt 1: Subjektive Handlungsmultime (主观行动准则)
                    </span>
                    <blockquote className="p-3.5 rounded bg-[var(--paper-subtle)] border-l-2 border-[var(--accent)] font-serif text-sm text-[var(--ink)] leading-relaxed italic">
                      {de ? activeKantScenario.maximeDE : activeKantScenario.maximeZH}
                    </blockquote>
                    <p className="text-xs text-[var(--gray)] leading-relaxed font-sans">
                      {de
                        ? "Kant definiert eine Maxime als das subjektive Prinzip des Wollens. Der Akteur prüft, ob diese Regel verallgemeinerungsfähig ist."
                        : "康德将准则定义为‘意志的主观原则’。学生第一步必须将个人动机提炼为规范准则形式：‘每当处于……情境，我都将……’。"}
                    </p>
                    <button
                      type="button"
                      onClick={() => setKantStep(2)}
                      className="px-4 py-2 rounded bg-[var(--accent)] text-white font-mono text-xs font-bold cursor-pointer"
                    >
                      {de ? "Weiter zu Schritt 2: Verallgemeinerung →" : "下一步：提升为普遍自然法则 →"}
                    </button>
                  </div>
                )}

                {kantStep === 2 && (
                  <div className="space-y-3">
                    <span className="font-mono text-xs font-bold text-[var(--accent)] block">
                      Schritt 2: Universalisierungsformel (提升为普遍自然法则)
                    </span>
                    <p className="text-xs text-[var(--gray)] font-sans">
                      {de
                        ? "„Handle so, als ob die Maxime deiner Handlung durch deinen Willen zum allgemeinen Naturgesetze werden sollte.“"
                        : "绝对命令普遍法则公式：“你要这样行动，使得你的准则能够通过你的意志成为普遍的自然法则。”"}
                    </p>
                    <blockquote className="p-3.5 rounded bg-[var(--paper-subtle)] border-l-2 border-amber-500 font-serif text-sm text-[var(--ink)] leading-relaxed italic">
                      {de ? activeKantScenario.naturgesetzDE : activeKantScenario.naturgesetzZH}
                    </blockquote>
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => setKantStep(1)}
                        className="px-3 py-1.5 rounded border border-[var(--line)] font-mono text-xs cursor-pointer"
                      >
                        ← {de ? "Zurück" : "上一步"}
                      </button>
                      <button
                        type="button"
                        onClick={() => setKantStep(3)}
                        className="px-4 py-2 rounded bg-[var(--accent)] text-white font-mono text-xs font-bold cursor-pointer"
                      >
                        {de ? "Weiter zu Schritt 3: Widerspruchsprüfung →" : "下一步：进行逻辑矛盾检验 →"}
                      </button>
                    </div>
                  </div>
                )}

                {kantStep === 3 && (
                  <div className="space-y-3">
                    <span className="font-mono text-xs font-bold text-[var(--accent)] block">
                      Schritt 3: Rationale Widerspruchsprüfung (双重矛盾检验)
                    </span>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                      {/* 检验 A */}
                      <div className="p-3.5 rounded-lg border border-[var(--line)] bg-[var(--paper-subtle)]/40 space-y-2">
                        <div className="flex items-center justify-between font-mono">
                          <strong className="text-[var(--ink)]">A. Widerspruch im Denken?</strong>
                          <span
                            className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                              activeKantScenario.widerspruchDenken
                                ? "bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300"
                                : "bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300"
                            }`}
                          >
                            {activeKantScenario.widerspruchDenken ? "Ja (Widerspruch!)" : "Nein"}
                          </span>
                        </div>
                        <p className="text-[var(--gray)] leading-relaxed font-sans">
                          {de ? activeKantScenario.grundDenkenDE : activeKantScenario.grundDenkenZH}
                        </p>
                      </div>

                      {/* 检验 B */}
                      <div className="p-3.5 rounded-lg border border-[var(--line)] bg-[var(--paper-subtle)]/40 space-y-2">
                        <div className="flex items-center justify-between font-mono">
                          <strong className="text-[var(--ink)]">B. Widerspruch im Wollen?</strong>
                          <span
                            className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                              activeKantScenario.widerspruchWollen
                                ? "bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300"
                                : "bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300"
                            }`}
                          >
                            {activeKantScenario.widerspruchWollen ? "Ja (Widerspruch!)" : "Nein"}
                          </span>
                        </div>
                        <p className="text-[var(--gray)] leading-relaxed font-sans">
                          {de ? activeKantScenario.grundWollenDE : activeKantScenario.grundWollenZH}
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => setKantStep(2)}
                        className="px-3 py-1.5 rounded border border-[var(--line)] font-mono text-xs cursor-pointer"
                      >
                        ← {de ? "Zurück" : "上一步"}
                      </button>
                      <button
                        type="button"
                        onClick={() => setKantStep(4)}
                        className="px-4 py-2 rounded bg-[var(--accent)] text-white font-mono text-xs font-bold cursor-pointer"
                      >
                        {de ? "Weiter zu Schritt 4: Pflichturteil →" : "下一步：得出义务裁决 →"}
                      </button>
                    </div>
                  </div>
                )}

                {kantStep === 4 && (
                  <div className="space-y-3">
                    <span className="font-mono text-xs font-bold text-[var(--accent)] block">
                      Schritt 4: Moralisches Pflichten-Urteil (会考定论与义务定性)
                    </span>
                    <div className="p-3.5 rounded bg-[var(--paper-subtle)] border border-[var(--line)] flex items-center justify-between">
                      <span className="font-serif text-sm font-bold text-[var(--ink)]">
                        {de ? "Einstufung:" : "康德道德义务定性:"}
                      </span>
                      <span className="font-mono text-xs font-bold text-[var(--accent)] px-3 py-1 rounded bg-[var(--surface)] border border-[var(--accent)]/30">
                        {de ? activeKantScenario.pflichtTyp.toUpperCase() + "E PFLICHT" : activeKantScenario.pflichtTypZH}
                      </span>
                    </div>
                    <blockquote className="p-3.5 rounded bg-[var(--surface)] border-l-2 border-[var(--accent)] font-mono text-xs text-[var(--ink)] leading-relaxed italic">
                      "{activeKantScenario.klausurUrteilDE}"
                    </blockquote>
                    <button
                      type="button"
                      onClick={() => handleExportText(activeKantScenario.klausurUrteilDE)}
                      className="px-3.5 py-1.5 rounded border border-[var(--line)] bg-[var(--paper-subtle)] hover:border-[var(--accent)] font-mono text-xs cursor-pointer"
                    >
                      {de ? "Urteil kopieren" : "复制康德式论证结论"}
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* --------------------------------------------------------------- */}
          {/* 模式 C：🎭 弗莱塔格戏剧五幕构建台 (Freytag-Drama-Studio) */}
          {/* --------------------------------------------------------------- */}
          {mode === "drama" && (
            <div className="flex flex-col gap-4">
              {/* 剧目横幅 */}
              <div className="p-3.5 rounded-lg border border-[var(--line)] bg-[var(--paper-subtle)]/40 flex items-center justify-between">
                <div>
                  <h3 className="font-serif text-sm font-bold text-[var(--ink)]">
                    {de ? activeDrama.titleDE : activeDrama.titleZH}
                  </h3>
                  <span className="font-mono text-[11px] text-[var(--gray)]">
                    {activeDrama.autor} · {activeDrama.epoche}
                  </span>
                </div>
                <span className="font-mono text-xs px-2.5 py-1 rounded border border-[var(--line)] bg-[var(--surface)] text-[var(--accent)] font-bold">
                  Akt {selectedActNum} von 5
                </span>
              </div>

              {/* 交互式戏剧金字塔张力可视化 (Freytag's Pyramid SVG) */}
              <div className="relative rounded-lg border border-[var(--line)] bg-[var(--surface)] p-6 flex flex-col items-center justify-center">
                <svg viewBox="0 0 600 240" className="w-full max-w-[600px] h-52 select-none">
                  {/* 基准底线 */}
                  <line x1="50" y1="200" x2="550" y2="200" stroke="var(--line)" strokeWidth="1.5" />

                  {/* 弗莱塔格金字塔张力折线 */}
                  <path
                    d="M 60 190 L 170 140 L 300 40 L 430 130 L 540 185"
                    fill="none"
                    stroke="var(--line)"
                    strokeWidth="3"
                    strokeDasharray="4 2"
                  />
                  {/* 动态高亮折线段 */}
                  <path
                    d={
                      selectedActNum === 1
                        ? "M 60 190 L 170 140"
                        : selectedActNum === 2
                        ? "M 60 190 L 170 140 L 300 40"
                        : selectedActNum === 3
                        ? "M 60 190 L 170 140 L 300 40"
                        : selectedActNum === 4
                        ? "M 300 40 L 430 130"
                        : "M 430 130 L 540 185"
                    }
                    fill="none"
                    stroke="var(--accent)"
                    strokeWidth="3.5"
                  />

                  {/* 五大核心幕次节点按钮 (点击交互) */}
                  {[
                    { num: 1, cx: 60, cy: 190, label: "I. Exposition" },
                    { num: 2, cx: 170, cy: 140, label: "II. Steigung" },
                    { num: 3, cx: 300, cy: 40, label: "III. Peripetie" },
                    { num: 4, cx: 430, cy: 130, label: "IV. Retardation" },
                    { num: 5, cx: 540, cy: 185, label: "V. Katastrophe" }
                  ].map((node) => {
                    const isSelected = selectedActNum === node.num;
                    return (
                      <g
                        key={node.num}
                        onClick={() => setSelectedActNum(node.num as 1 | 2 | 3 | 4 | 5)}
                        className="cursor-pointer transition-all"
                      >
                        <circle
                          cx={node.cx}
                          cy={node.cy}
                          r={isSelected ? 10 : 7}
                          fill={isSelected ? "var(--accent)" : "var(--surface)"}
                          stroke={isSelected ? "var(--surface)" : "var(--ink)"}
                          strokeWidth="2.5"
                        />
                        <text
                          x={node.cx}
                          y={node.cy + (node.num === 3 ? -18 : 22)}
                          textAnchor="middle"
                          fontSize="11"
                          fontFamily="monospace"
                          fontWeight={isSelected ? "bold" : "normal"}
                          fill={isSelected ? "var(--accent)" : "var(--gray)"}
                        >
                          {node.label}
                        </text>
                      </g>
                    );
                  })}
                </svg>

                <p className="text-xs font-mono text-[var(--gray)] mt-2">
                  {de
                    ? "Klicken Sie auf einen der 5 Akte, um Szene, Zitat und dramaturgische Funktion zu analysieren."
                    : "点击金字塔上的任意一幕节点，查看对应原著台词、戏剧张力走向与考点功能解剖。"}
                </p>
              </div>

              {/* 当前选中幕次的细读与采分点剖析 */}
              <div className="p-4 rounded-lg border border-[var(--line)] bg-[var(--surface)] space-y-3">
                <div className="flex items-center justify-between border-b border-[var(--line)] pb-2">
                  <span className="font-serif text-sm font-bold text-[var(--ink)]">
                    {de ? currentAct.actNameDE : currentAct.actNameZH} · {currentAct.sceneTitleDE}
                  </span>
                  <span className="font-mono text-xs text-[var(--accent)] font-bold">
                    Spannungsniveau: {currentAct.tensionLevel}%
                  </span>
                </div>

                {/* 经典台词原句 */}
                <blockquote className="p-3.5 rounded bg-[var(--paper-subtle)] border-l-2 border-[var(--accent)] font-mono text-xs text-[var(--ink)] leading-relaxed italic">
                  {currentAct.quoteDE}
                  <span className="block mt-1 text-[var(--gray)] font-sans not-italic">
                    {currentAct.quoteZH}
                  </span>
                </blockquote>

                {/* 结构功能与会考采分提示 */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs font-sans">
                  <div className="p-3 rounded border border-[var(--line)] bg-[var(--paper-subtle)]/40 space-y-1">
                    <strong className="font-mono text-[var(--ink)] block">
                      Dramaturgische Funktion (戏剧结构功能):
                    </strong>
                    <p className="text-[var(--gray)] leading-relaxed">
                      {de ? currentAct.functionDE : currentAct.functionZH}
                    </p>
                  </div>
                  <div className="p-3 rounded border border-amber-500/30 bg-amber-500/5 space-y-1">
                    <strong className="font-mono text-amber-900 dark:text-amber-300 block">
                      Klausur-Erwartungshorizont (EHZ 采分要点):
                    </strong>
                    <p className="text-[var(--ink)] leading-relaxed">
                      {de ? currentAct.ehzClueDE : currentAct.ehzClueZH}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* --------------------------------------------------------------- */}
          {/* 模式 D：🎵 诗歌韵律节拍打击器 (Lyrik-Metrum-Taktstock) */}
          {/* --------------------------------------------------------------- */}
          {mode === "lyrik" && (
            <div className="flex flex-col gap-4">
              {/* 诗篇信息 */}
              <div className="p-3.5 rounded-lg border border-[var(--line)] bg-[var(--paper-subtle)]/40 flex items-center justify-between">
                <div>
                  <h3 className="font-serif text-sm font-bold text-[var(--ink)]">
                    {de ? activePoem.titleDE : activePoem.titleZH}
                  </h3>
                  <span className="font-mono text-[11px] text-[var(--gray)]">
                    {activePoem.autor} · {activePoem.epoche}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={playRhythmAudio}
                  disabled={isPlayingBeat}
                  className={`font-mono text-xs px-3.5 py-1.5 rounded border transition-all cursor-pointer flex items-center gap-1.5 ${
                    isPlayingBeat
                      ? "border-[var(--accent)] bg-[var(--accent)] text-white animate-pulse"
                      : "border-[var(--line)] bg-[var(--surface)] text-[var(--ink)] hover:border-[var(--accent)]"
                  }`}
                >
                  <span>▶</span>
                  <span>{isPlayingBeat ? (de ? "Takt läuft..." : "节拍播放中...") : (de ? "Rhythmus abspielen" : "试听节拍律动")}</span>
                </button>
              </div>

              {/* 逐音节轻重音交互卡片 */}
              <div className="p-6 rounded-lg border border-[var(--line)] bg-[var(--surface)] space-y-4">
                <span className="font-mono text-xs text-[var(--gray)] block">
                  {de
                    ? "Tippen Sie auf die Silben, um Hebung (—) und Senkung (◡) festzulegen:"
                    : "点击下方音节卡片，切换轻读 (◡ Senkung) 与重读 (— Hebung)："}
                </span>

                <div className="flex flex-wrap items-center gap-2 justify-center py-4">
                  {userSyllables.map((syl, idx) => {
                    const isCurrent = currentBeatIdx === idx;
                    return (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => toggleSyllableStress(idx)}
                        className={`flex flex-col items-center justify-center p-3 rounded-lg border transition-all cursor-pointer min-w-[54px] ${
                          isCurrent
                            ? "ring-2 ring-[var(--accent)] scale-105"
                            : ""
                        } ${
                          syl.stressed
                            ? "border-[var(--accent)] bg-[var(--accent)]/10 text-[var(--accent)] font-bold shadow-xs"
                            : "border-[var(--line)] bg-[var(--surface)] text-[var(--gray)] hover:border-[var(--ink)]"
                        }`}
                      >
                        <span className="font-mono text-sm mb-1">
                          {syl.stressed ? "— (重)" : "◡ (轻)"}
                        </span>
                        <span className="font-serif text-sm text-[var(--ink)] font-semibold">
                          {syl.text}
                        </span>
                      </button>
                    );
                  })}
                </div>

                {/* 智能格律与韵式识别结果卡片 */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono pt-3 border-t border-[var(--line)]">
                  <div className="p-3 rounded border border-[var(--line)] bg-[var(--paper-subtle)]/40 flex items-center justify-between">
                    <span className="text-[var(--gray)]">{de ? "Erkanntes Metrum:" : "识别格律:"}</span>
                    <strong className="text-[var(--accent)]">{activePoem.correctMetrumZH}</strong>
                  </div>
                  <div className="p-3 rounded border border-[var(--line)] bg-[var(--paper-subtle)]/40 flex items-center justify-between">
                    <span className="text-[var(--gray)]">{de ? "Reimschema:" : "韵式结构:"}</span>
                    <strong className="text-[var(--ink)]">{activePoem.rhymeSchemeZH}</strong>
                  </div>
                </div>

                {/* 会考格律效果深析 */}
                <div className="p-3.5 rounded bg-[var(--paper-subtle)] text-xs font-sans text-[var(--ink)] leading-relaxed space-y-1">
                  <span className="font-mono font-bold text-[var(--accent)] block">
                    Klausurrelevante Rhythmus-Wirkung (格律审美与修辞效果):
                  </span>
                  <p>{de ? activePoem.wirkungDE : activePoem.wirkungZH}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ===================================================================== */}
      {/* TAB 2: 因果推演与微观机理 (Phänomen & Kausalität) */}
      {/* ===================================================================== */}
      {activeTab === "causality" && (
        <div className="flex flex-col gap-4">
          <div className="rounded-lg border border-[var(--line)] bg-[var(--surface)] p-4 space-y-2">
            <h3 className="font-serif text-sm font-bold text-[var(--ink)] flex items-center gap-2">
              <span className="text-[var(--accent)] font-mono">01.</span>
              {de ? "Dialektische Kausalkette (Wenn-Dann-Analyse)" : "动态因果推演链 (Wenn-Dann 分析)"}
            </h3>
            <p className="text-xs font-sans text-[var(--ink)] leading-relaxed p-3 rounded bg-[var(--paper-subtle)]/60 border border-[var(--line)]/50">
              {de
                ? "In den Geisteswissenschaften vollzieht sich Kausalität nicht als physikalischer Automatismus, sondern als argumentative Notwendigkeit: Wenn eine These aufgestellt wird, müssen deren normative Implikationen für Individuum und Gesellschaft zwingend reflektiert werden."
                : "在文科与社科中，因果关系并非机械物理反馈，而是严格的论证必然性（Argumentative Notwendigkeit）：一旦提出一个核心论点，必须从有效性、合法性与人尊底线多重维度衡量其连锁社会后果。"}
            </p>
          </div>

          <div className="rounded-lg border border-[var(--line)] bg-[var(--surface)] p-4 space-y-2">
            <h3 className="font-serif text-sm font-bold text-[var(--ink)] flex items-center gap-2">
              <span className="text-[var(--accent)] font-mono">02.</span>
              {de ? "Fachdidaktische Erklärung & Methodologie" : "学科教学论底层逻辑"}
            </h3>
            <p className="text-xs font-sans text-[var(--gray)] leading-relaxed p-3 rounded bg-[var(--paper-subtle)]/60 border border-[var(--line)]/50">
              {de
                ? "Das Kernziel gymnasialer Oberstufenklausuren in NRW (AFB III) ist die kriterienorientierte Urteilsbildung. Es genügt nicht, Thesen bloß zu referieren; Schüler müssen nach klaren Sach- und Wertmaßstäben abwägen und zu einem eigenständigen, begründeten Fazit gelangen."
                : "北威州高中会考高阶大题（AFB III）的灵魂在于‘标准导向的独立价值裁决’（Kriterienorientierte Urteilsbildung）。死记硬背故事情节或哲学名词无法得分，必须熟练运用事实裁决与价值裁决双轮驱动。"}
            </p>
          </div>
        </div>
      )}

      {/* ===================================================================== */}
      {/* TAB 3: 会考真题与评分标准 (Klausur & EHZ-Standard) */}
      {/* ===================================================================== */}
      {activeTab === "klausur" && (
        <div className="flex flex-col gap-4">
          <div className="rounded-lg border border-[var(--line)] bg-[var(--surface)] p-4 space-y-2">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <span className="font-mono text-xs uppercase px-2 py-0.5 rounded border border-[var(--accent)]/40 text-[var(--accent)] font-bold">
                NRW Zentralabitur / Klausuraufgabe (AFB III)
              </span>
              <span className="font-mono text-xs font-bold text-[var(--ink)] bg-[var(--paper-subtle)] px-2 py-0.5 rounded border border-[var(--line)]">
                14 Punkte
              </span>
            </div>
            <p className="text-xs font-serif font-bold text-[var(--ink)] p-3 rounded bg-[var(--paper-subtle)]/60 border border-[var(--line)]/50 leading-relaxed">
              {de
                ? `„Erörtern Sie kriteriengeleitet die Tragfähigkeit des Modells bzw. der Position bezüglich '${sim.themenDE}'. Formulieren Sie ein differenziertes Fazit.“`
                : `“结合标准导向原则，全面评析针对【${sim.themenZH}】的核心学术争论，得出权衡分明、逻辑自洽的最终裁决。”`}
            </p>
          </div>

          <div className="rounded-lg border border-[var(--line)] bg-[var(--surface)] p-4 space-y-2">
            <h3 className="font-serif text-sm font-bold text-[var(--ink)] flex items-center gap-2">
              <span className="text-emerald-600 font-mono">EHZ</span>
              {de ? "Erwartungshorizont (Kriterienkatalog)" : "考官采分点标准 (Erwartungshorizont)"}
            </h3>
            <ul className="space-y-2 text-xs font-sans text-[var(--gray)]">
              <li className="flex items-start gap-2">
                <span className="font-mono font-bold text-[var(--accent)] shrink-0">[1]</span>
                <span className="leading-relaxed text-[var(--ink)]">
                  {de
                    ? "Präzise Rekonstruktion beider Kontrahentenpositionen unter Verwendung passender Fachterminologie."
                    : "精准还原正反双方立场与核心论据链，规范使用学科核心术语。"}
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-mono font-bold text-[var(--accent)] shrink-0">[2]</span>
                <span className="leading-relaxed text-[var(--ink)]">
                  {de
                    ? "Strikte Trennung von Sachurteil (Wirksamkeit/Machbarkeit) und Werturteil (Gerechtigkeit/Verfassung)."
                    : "严格区分事实裁决（有效性/可行性）与价值裁决（社会正义/基本法第1条人尊）。"}
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-mono font-bold text-[var(--accent)] shrink-0">[3]</span>
                <span className="leading-relaxed text-[var(--ink)]">
                  {de
                    ? "Schlüssige Synthese mit klarem Gewichtungsschwerpunkt statt unverbindlicher Aufzählung."
                    : "给出优先级明确的总结定论，坚决杜绝‘两者皆有理’的骑墙式空话。"}
                </span>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

export default GewiInteractiveWorkbench;
