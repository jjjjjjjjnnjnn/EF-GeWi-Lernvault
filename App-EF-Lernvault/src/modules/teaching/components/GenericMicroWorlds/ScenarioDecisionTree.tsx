import React, { useState } from "react";

export interface ScenarioDecisionTreeProps {
  title?: string;
  lang?: "de" | "zh";
  onNodeSelect?: (nodeId: string, npScore: number) => void;
  /**
   * 预设情境：同一决策树引擎在不同课程中挂载不同默认情境。
   * 缺省 "fiskalpolitik"（SoWi 现状，零回归）；内部切换器仍可手动换。
   */
  scenarioId?: string;
}

export type DecisionScenarioId = "fiskalpolitik" | "trolley" | "mindestlohn";

/**
 * 课程→默认情境选路：最低工资/关税课程走 mindestlohn，伦理/电车课程走 trolley，
 * 其余走默认 fiskalpolitik。纯函数，可单测；未知输入一律回退 fiskalpolitik（零回归）。
 */
export function resolveDecisionScenarioId(title: string, summary = ""): DecisionScenarioId {
  const hay = `${title} ${summary}`.toLowerCase();
  if (/mindestlohn|lohnuntergrenze|tarifautonomie|tarifverhandlung|lohnpolitik|arbeitnehmerschutz/.test(hay))
    return "mindestlohn";
  if (/trolley|weichensteller|ethik|kant|utilitarismus|mill|bentham|dilemma|pflichtenkollision|deontologie/.test(hay))
    return "trolley";
  return "fiskalpolitik";
}

export interface DecisionNode {
  id: string;
  stage: 0 | 1 | 2 | 3;
  parentId: string | null;
  code: string;
  titleDe: string;
  titleZh: string;
  tagDe: string;
  tagZh: string;
  shortEffectDe: string;
  shortEffectZh: string;
  sideEffectDe: string;
  sideEffectZh: string;
  sachurteilDe: string;
  sachurteilZh: string;
  werturteilDe: string;
  werturteilZh: string;
  npScore: number;
  klausurSatzDe: string;
  klausurSatzZh: string;
  x: number;
  y: number;
}

export interface DecisionScenario {
  id: string;
  titleDe: string;
  titleZh: string;
  subject: "SoWi" | "Philosophie";
  dilemmaSummaryDe: string;
  dilemmaSummaryZh: string;
  nodes: DecisionNode[];
}

const SCENARIOS: DecisionScenario[] = [
  // 场景 1: SoWi — 财政政策与债务刹车 (Schuldenbremse vs. Transformationsinvestitionen)
  {
    id: "fiskalpolitik",
    subject: "SoWi",
    titleDe: "Fiskalpolitik: Schuldenbremse vs. Zukunftsinvestitionen",
    titleZh: "财政政策困局：债务刹车约束 vs. 转型投资赤字",
    dilemmaSummaryDe:
      "Deutschland steht vor einem akuten Sanierungsbedarf von Brücken, Bahnnetz und Klimatransformation bei gleichzeitig verfassungsrechtlich verankerter Schuldenbremse (Art. 115 GG).",
    dilemmaSummaryZh:
      "德国面临桥梁基建、铁路网络与能源转型所需的巨额投资缺口，同时受到联邦基本法第115条所确立的'债务刹车'（赤字率不超过0.35% GDP）的刚性宪法约束。",
    nodes: [
      {
        id: "fisk_root",
        stage: 0,
        parentId: null,
        code: "0",
        titleDe: "Ausgangslage: Investitionsstau unter Art. 115 GG",
        titleZh: "决策原点：宪法债务刹车下的基建投资困局",
        tagDe: "Dilemma",
        tagZh: "初始两难",
        shortEffectDe: "Defizitärer Erhaltungszustand der öffentlichen Infrastruktur bei stagnierendem Produktivitätswachstum.",
        shortEffectZh: "公共基础设施老化失修，全要素生产率增速陷入停滞。",
        sideEffectDe: "Verfassungsgerichtliche Normenkontrolle limitiert traditionelle Haushaltsausweichmanöver.",
        sideEffectZh: "联邦宪法法院裁决阻断了通过特别基金绕开预算监督的操作空间。",
        sachurteilDe: "Ökonomische Effizienz erfordert zeitnahe Kapitalbildung; Art. 115 GG schützt vor Zinslastrisiken.",
        sachurteilZh: "经济效率要求即时资本形成；而基本法第115条旨在防范长期利息支出风险。",
        werturteilDe: "Spannungsverhältnis zwischen Generationengerechtigkeit (keine Überschuldung) und Erhalt der Lebensgrundlagen.",
        werturteilZh: "代际正义（不留巨额债务）与生存基础维护（不留破败基建）之间的根本价值张力。",
        npScore: 8,
        klausurSatzDe: "Das Ausgangsdilemma beruht auf der verfassungsrechtlichen Bindung an die Schuldenbremse bei gleichzeitigem volkswirtschaftlichen Modernisierungsdefizit.",
        klausurSatzZh: "该初始两难根源于对债务刹车的宪法性依循与国民经济现代化赤字之间的尖锐冲突。",
        x: 60,
        y: 190,
      },
      // Option A
      {
        id: "fisk_opt_a",
        stage: 1,
        parentId: "fisk_root",
        code: "A",
        titleDe: "Option A: Strikte Austerität & Haushaltskonsolidierung",
        titleZh: "方案 A：严守财政纪律与紧缩整顿",
        tagDe: "Strategie A",
        tagZh: "战略方案 A",
        shortEffectDe: "Keine Neuverschuldung; Einhaltung der Maastricht-Kriterien und Schonung des Bundeshaushalts.",
        shortEffectZh: "坚决不举借新增债务；严格恪守马斯特里赫特条约标准，稳固国家信用评级。",
        sideEffectDe: "Streichung oder Aufschub von Investitionen in Bildung, Schiene und Digitalisierung.",
        sideEffectZh: "教育、铁路与数字化投资被迫大幅削减或长期延期。",
        sachurteilDe: "Verhindert künftige Zinsausgabensteigerungen, dämpft jedoch das langfristige reale BIP-Potenzialwachstum.",
        sachurteilZh: "有效遏制未来财政利息负担，但直接压低了长期潜在经济增长率。",
        werturteilDe: "Priorisiert finanzielle Solidität vor gesellschaftlicher Infrastruktursicherung.",
        werturteilZh: "将国家财政稳健性置于社会公共基础设施供给之上。",
        npScore: 9,
        klausurSatzDe: "Eine strikte Konsolidierungsstrategie sichert primär die haushaltspolitische Stabilität, induziert jedoch erhebliche Opportunitätskosten durch unterlassene Zukunftsförderung.",
        klausurSatzZh: "坚决的财政整顿战略主要保障了预算平衡，但因放弃未来战略投资而产生了巨大的机会成本。",
        x: 240,
        y: 100,
      },
      // Option B
      {
        id: "fisk_opt_b",
        stage: 1,
        parentId: "fisk_root",
        code: "B",
        titleDe: "Option B: Krediterweiterung & Sondervermögen",
        titleZh: "方案 B：拓展信贷空间与专项转型基金",
        tagDe: "Strategie B",
        tagZh: "战略方案 B",
        shortEffectDe: "Sofortige Bereitstellung liquider Investitionsmittel für Schiene, Brücken und Dekarbonisierung.",
        shortEffectZh: "立即为铁路、桥梁改造与绿色脱碳工程注入充裕的流动资金支持。",
        sideEffectDe: "Erhöhung der Staatsschuldenquote und Konkurrenz um knappe Baukapazitäten.",
        sideEffectZh: "推高国家负债率，并加剧建筑业用工与原材料产能短缺导致的成本转嫁。",
        sachurteilDe: "Fiskalischer Multiplikator greift nur, wenn Mittel zielgenau investiv statt konsumtiv verausgabt werden.",
        sachurteilZh: "财政乘数效应唯有在资金严格投向资本形成、而非被用于经常性消费时方可显现。",
        werturteilDe: "Verantwortung für reale Umwelt- und Infrastrukturbedingungen künftiger Generationen wird über monetäre Schuldenfreiheit gestellt.",
        werturteilZh: "将后代享有的实质性环境与基础设施福祉置于名义上的'无债务'教条之上。",
        npScore: 10,
        klausurSatzDe: "Die investive Ausweitung der Kreditaufnahme zielt auf die Hebung makroökonomischer Multiplikatoreffekte, birgt jedoch das Risiko inflationärer Überwälzungseffekte bei angebotsseitigen Engpässen.",
        klausurSatzZh: "通过扩大举债进行投资旨在激活宏观经济乘数，但面对供给侧产能瓶颈时存在引发通胀转嫁的现实风险。",
        x: 240,
        y: 280,
      },
      // A1
      {
        id: "fisk_a1",
        stage: 2,
        parentId: "fisk_opt_a",
        code: "A1",
        titleDe: "Kürzung bei Sozialausgaben & Förderprogrammen",
        titleZh: "路径 A1：压减转移支付与福利项目",
        tagDe: "Maßnahme A1",
        tagZh: "细分措施 A1",
        shortEffectDe: "Unmittelbare Konsolidierung des laufenden Verwaltungshaushalts um zweistellige Milliardenbeträge.",
        shortEffectZh: "当年度财政经常性预算立即缩减数百亿欧元赤字缺口。",
        sideEffectDe: "Erhöhung der Armutsgefährdung und spürbare Verschärfung sozialer Wohlstandsunterschiede.",
        sideEffectZh: "底层群体贫困发生率上升，社会分配不均与阶层分化进一步加深。",
        sachurteilDe: "Verfehlt das Ziel sozialer Kohäsion; dämpft den privaten Binnenkonsum merklich.",
        sachurteilZh: "背离了社会融合政策目标，并直接拖累国内私人消费内需。",
        werturteilDe: "Verstoß gegen das verfassungsrechtliche Sozialstaatsprinzip (Art. 20 Abs. 1 GG) in ethischer Hinsicht.",
        werturteilZh: "在实质伦理与法理层面涉嫌违背基本法第20条第1款的社会福利国家原则。",
        npScore: 6,
        klausurSatzDe: "Die lineare Reduktion konsumtiver Sozialtransfers schwächt die konjunkturelle Binnennachfrage und vertieft distributive Ungleichgewichte im Bundesgebiet.",
        klausurSatzZh: "对社会转移支付进行一刀切削减直接削弱了周期性国内需求，并进一步激化了德国各联邦州间的分配失衡。",
        x: 440,
        y: 55,
      },
      // A2
      {
        id: "fisk_a2",
        stage: 2,
        parentId: "fisk_opt_a",
        code: "A2",
        titleDe: "Abbau umweltschädlicher Subventionen",
        titleZh: "路径 A2：清退高碳与低效产业补贴",
        tagDe: "Maßnahme A2",
        tagZh: "细分措施 A2",
        shortEffectDe: "Freisetzung von 15-20 Mrd. Euro Haushaltsvolumen durch Abbau von Dienstwagenprivileg & Agrardiesel.",
        shortEffectZh: "通过废除公车私用税收特权与传统农业燃油退税，每年直接盘活150-200亿欧元预算。",
        sideEffectDe: "Heftiger politischer Widerstand betroffener Berufsverbände und Industrie-Interessengruppen.",
        sideEffectZh: "遭遇受波及行业协会、工会与游说组织的激烈政治反弹与示威施压。",
        sachurteilDe: "Hohe ökonomische Allokationseffizienz: Beseitigt Marktverzerrungen und schont das Staatsbudget.",
        sachurteilZh: "具有极高的资源配置效率：在修复市场价格信号扭曲的同时充实了国库。",
        werturteilDe: "Hohe ökologische und intergenerationelle Gerechtigkeit durch Verursacherprinzip.",
        werturteilZh: "全面贯彻污染者自负原则，兼具卓越的生态正义与代际正义伦理底色。",
        npScore: 12,
        klausurSatzDe: "Der gezielte Abbau umweltschädlicher Fiskalprivilegien optimiert die Allokationseffizienz und generiert Spielräume zur Budgetkonsolidierung ohne Verstoß gegen das Gebot distributiver Gerechtigkeit.",
        klausurSatzZh: "定点清退破坏生态的税收特权既优化了资源配置效率，又在未破坏分配正义的前提下为财政巩固创造了充裕回旋余地。",
        x: 440,
        y: 145,
      },
      // B1
      {
        id: "fisk_b1",
        stage: 2,
        parentId: "fisk_opt_b",
        code: "B1",
        titleDe: "Pauschale Kreditaufnahme ohne Zweckbindung",
        titleZh: "路径 B1：泛化赤字举债且无投资硬约束",
        tagDe: "Maßnahme B1",
        tagZh: "细分措施 B1",
        shortEffectDe: "Verteilung von Subventionsgeschenken zur kurzfristigen politischen Wählerberuhigung.",
        shortEffectZh: "向各领域漫撒补贴红利，换取短期的政治民调与选民满意度。",
        sideEffectDe: "Mittel versickern im laufenden Konsum; Inflation wird angeheizt, Zinslast der Folgejahre explodiert.",
        sideEffectZh: "借贷资金被经常性消费挥霍吞噬；推升核心通胀率，未来财政付息支出激增。",
        sachurteilDe: "Inökonomische Fehlallokation; verfehlt nachhaltige Steigerung des volkswirtschaftlichen Kapitalstocks.",
        sachurteilZh: "典型的经济学错配；完全未能形成国民经济可持续的生产性固定资产资本存量。",
        werturteilDe: "Egoistischer Verzehr von Zukunftsressourcen zu Lasten kommender Generationen.",
        werturteilZh: "以牺牲下一代人财政自由为代价，透支未来资本以维持当下过度消费。",
        npScore: 5,
        klausurSatzDe: "Eine unkonditionierte Schuldenaufnahme ohne reale Kapitalstockbildung stellt eine verfassungs- und wohlfahrtsökonomisch defizitäre Lastenverschiebung in die Zukunft dar.",
        klausurSatzZh: "未形成实体资产积累的无约束赤字举债，属于在宪法学与福利经济学上皆不可接受的代际债务转嫁。",
        x: 440,
        y: 235,
      },
      // B2
      {
        id: "fisk_b2",
        stage: 2,
        parentId: "fisk_opt_b",
        code: "B2",
        titleDe: "Goldene Investitionsregel: Netto-Kapitalstock",
        titleZh: "路径 B2：黄金投资律 (严格定向形成生产性资本)",
        tagDe: "Maßnahme B2",
        tagZh: "细分措施 B2",
        shortEffectDe: "Bindung jedes Kredit-Euros an messbare Zukunftsinfrastruktur (Brücken, Breitband, Bahnkorridore).",
        shortEffectZh: "将每一欧元借贷款项严格锁定于可衡量的未来资产（数字化干线、桥梁寿命加固、铁路电化）。",
        sideEffectDe: "Erfordert strenge parlamentarische Aufsicht und bürokratische Planungsbeschleunigung.",
        sideEffectZh: "要求设立极高规格的议会跨党派独立审计与行政审批大幅提速机制。",
        sachurteilDe: "Produktivitätszuwachs generiert zukünftige Steuermehreinnahmen, die Zinskosten überkompensieren.",
        sachurteilZh: "生产率跃升所带来的潜在税收增量能够完全覆盖并超越新增债务的利息成本。",
        werturteilDe: "Wahre Generationengerechtigkeit: Künftige Generationen erben intakte Sachwerte statt maroder Brücken.",
        werturteilZh: "真正的代际正义实践：留给后代的不是危桥破轨与碳负债，而是完好具备抗风险能力的实体资产。",
        npScore: 14,
        klausurSatzDe: "Gemäß der goldenen Finanzregel ist eine investive Kreditausweitung volkswirtschaftlich legitimiert, da der Wertzuwachs des realen öffentlichen Kapitalstocks die nominale Schuldendienstdynamik übersteigt.",
        klausurSatzZh: "依照经典财政学'黄金法则'，资本性投资举债具备充分的宏观正当性，因公共实体资本增值幅度显著高于名义债务还本付息的成本。",
        x: 440,
        y: 325,
      },
      // Stage 3 Outcomes
      {
        id: "fisk_end_a1",
        stage: 3,
        parentId: "fisk_a1",
        code: "End A1",
        titleDe: "Endzustand: Marode Substanz & Soziale Spaltung",
        titleZh: "终端归宿：基建持续衰竭与社会撕裂加深",
        tagDe: "AFB III Urteil",
        tagZh: "AFB III 评定",
        shortEffectDe: "Haushalt formell ausgeglichen.",
        shortEffectZh: "预算账面达成无赤字平衡。",
        sideEffectDe: "Wirtschaftsstandort verliert weltweit an Wettbewerbsfähigkeit; Vertrauensverlust in den Staat.",
        sideEffectZh: "国家工业区位优势遭受重创，公众对政府治理效能的信任跌入冰点。",
        sachurteilDe: "Effizienzgrad mangelhaft: Kurzfristige Buchhalter-Logik zerstört langfristige volkswirtschaftliche Produktivität.",
        sachurteilZh: "效率考量极差：短视的会计记账逻辑扼杀了长周期的全社会生产率潜力。",
        werturteilDe: "Nicht verallgemeinerungsfähig: Untergräbt soziale Solidarität und Chancengleichheit gravierend.",
        werturteilZh: "不可普遍化：从根本上动摇了社会团结与下一代受教育起点的公平机会。",
        npScore: 6,
        klausurSatzDe: "Im abschließenden Sach- und Werturteil erweist sich die reine Kürzungsstrategie als dysfunktional, da sie unter dem Deckmantel nominaler Haushaltsdisziplin die reale volkswirtschaftliche Basis erodiert.",
        klausurSatzZh: "在最终的事实与价值评判中，纯粹削减策略被证明是不具备建设性的，其以名义财政纪律为幌子实质侵蚀了国民经济的实体底座。",
        x: 670,
        y: 55,
      },
      {
        id: "fisk_end_a2",
        stage: 3,
        parentId: "fisk_a2",
        code: "End A2",
        titleDe: "Endzustand: Strukturelle Effizienz & Dekarbonisierung",
        titleZh: "终端归宿：结构性高效与市场脱碳双赢",
        tagDe: "AFB III Urteil",
        tagZh: "AFB III 评定",
        shortEffectDe: "Fiskalische Solidität ohne Neuverschuldung gewahrt.",
        shortEffectZh: "在完全不突破借债红线的前提下实现预算自洽。",
        sideEffectDe: "Transformationsschmerzen in vormals subventionierten Wirtschaftssektoren müssen abgefedert werden.",
        sideEffectZh: "丧失补贴的既得利益产业需经历痛苦的转型重构与劳动力转岗。",
        sachurteilDe: "Hohe Wirksamkeit: Setzt marktwirtschaftliche Preissignale frei und stärkt saubere Technologien.",
        sachurteilZh: "卓越的政策效度：理顺了市场化价格信号，倒逼低碳清洁科技的商业化普及。",
        werturteilDe: "Gerechtfertigte Lastenverteilung nach dem Verursacherprinzip bei Wahrung finanzpolitischer Tugenden.",
        werturteilZh: "贯彻污染负全责的公平分摊伦理，兼顾了德意志联邦财政稳健的制度优良传统。",
        npScore: 12,
        klausurSatzDe: "Die Umschichtung durch Privilegienabbau verbindet haushaltspolitische Solidität mit ökologischer Lenkungswirkung und erfüllt somit die Anforderungen eines zukunftsfähigen Sachurteils in hohem Maße.",
        klausurSatzZh: "通过清退特权补贴实现预算腾挪，将财政稳健性与生态导向调节功能有机融合，在极高水平上达成了兼顾事实与价值维度的会考优秀判准。",
        x: 670,
        y: 145,
      },
      {
        id: "fisk_end_b1",
        stage: 3,
        parentId: "fisk_b1",
        code: "End B1",
        titleDe: "Endzustand: Stagflationsrisiko & Generationsbetrug",
        titleZh: "终端归宿：滞胀风险与代际资源透支",
        tagDe: "AFB III Urteil",
        tagZh: "AFB III 评定",
        shortEffectDe: "Konsumfeuerwerk für wenige Quartale.",
        shortEffectZh: "促成几个季度的短暂消费繁荣。",
        sideEffectDe: "Staatshaushalt gerät in die Zinsfalle; künftige Generationen erben leere Kassen ohne Gegenwert.",
        sideEffectZh: "政府预算深陷高额利息偿付陷阱；后代在面对掏空国库的同时未获得对应实体资产回报。",
        sachurteilDe: "Schwerwiegender Fehlschlag: Anheizen der Nachfrage bei unelastischem Angebot erzeugt reine Inflation.",
        sachurteilZh: "严重的宏观政策失误：在供给弹性不足的硬约束下盲目刺激名义需求只能催生恶性通货膨胀。",
        werturteilDe: "Ethisch verwerflicher Konsum auf Pump zu Lasten Ungeborener; Verstoß gegen Art. 20a GG.",
        werturteilZh: "以剥夺未出生后代的生存空间为代价举债消费，严重违反基本法第20条a款的生态与代际保护原则。",
        npScore: 5,
        klausurSatzDe: "Die unkonditionierte Kreditausweitung scheitert im Kriterium der Nachhaltigkeit, da sie das Stabilitätsgebot verletzt und gegen die intergenerationelle Verteilungsgerechtigkeit verstößt.",
        klausurSatzZh: "缺乏硬约束的信贷扩张未能通过可持续性维度的检验，其破坏了币值稳定原则并构成了对代际分配公平的严重侵犯。",
        x: 670,
        y: 235,
      },
      {
        id: "fisk_end_b2",
        stage: 3,
        parentId: "fisk_b2",
        code: "End B2",
        titleDe: "Endzustand: Reale Wohlstandssicherung (Abitur-Optimum)",
        titleZh: "终端归宿：生产力跃迁与代际实体财富正义 (会考最优)",
        tagDe: "AFB III Urteil",
        tagZh: "AFB III 评定",
        shortEffectDe: "Baukräne drehen sich, Schienennetze werden digitalisiert und Brücken grundlegend saniert.",
        shortEffectZh: "基建全面复苏，铁路实现干线数字化调度，危旧枢纽桥梁实现根本性翻新强化。",
        sideEffectDe: "Rechtliche Absicherung der Zweckbindung im Grundgesetz oder Sonderfonds zwingend erforderlich.",
        sideEffectZh: "必须在宪法文本或独立受托特别基金法案中以极严苛法条锁定专款专用。",
        sachurteilDe: "Höchste gesamtwirtschaftliche Effizienz: Hebung des Produktivitätspotenzials amortisiert die Schuldenquote.",
        sachurteilZh: "最高的国民经济综合效率：潜在增长率的大幅抬升将使动态公共负债率随分母增大而自然下降。",
        werturteilDe: "Verwirklichung echter Generationengerechtigkeit: Ausgleich von Sachvermögen und Verbindlichkeiten.",
        werturteilZh: "实现纯正的代际实质正义：使留给后代的实体资产公允价值远远超越名义负债余额。",
        npScore: 14,
        klausurSatzDe: "Syntheseurteil: Die Bindung von Kreditmitteln an den Erhalt des realen Kapitalstocks löst das scheinbare Trilemma von Schuldenbremse und Investitionsstau auf und begründet ein volkswirtschaftlich wie ethisch tragfähiges Urteil.",
        klausurSatzZh: "综合评据结论：将信贷资金刚性绑定于实体资本存量的扩充，化解了债务刹车与基建欠账之间的虚假对立，构建了在经济学与伦理学上皆坚不可摧的典范论述。",
        x: 670,
        y: 325,
      },
    ],
  },

  // 场景 2: Philosophie — 电车难题与义务论 vs. 功利主义 (Trolley-Problem)
  {
    id: "trolley",
    subject: "Philosophie",
    titleDe: "Philosophie: Das Weichensteller-Dilemma (Trolley-Problem)",
    titleZh: "哲学伦理困局：电车换道两难 (义务论 vs. 功利主义)",
    dilemmaSummaryDe:
      "Eine außer Kontrolle geratene Bahn rast auf 5 Gleisarbeiter zu. Durch Umlegen einer Weiche kann der Zug auf ein Nebengleis geleitet werden, wo sich jedoch 1 unbeteiligter Arbeiter befindet.",
    dilemmaSummaryZh:
      "一辆失控电车正疾驰冲向主轨道的5名铁轨工人。调度员若扳动道岔，可将电车导入侧线拯救5人，但侧线上正有1名毫不知情的独立工人作业。",
    nodes: [
      {
        id: "trolley_root",
        stage: 0,
        parentId: null,
        code: "0",
        titleDe: "Ausgangslage: Die herannahende führerlose Bahn",
        titleZh: "决策原点：疾驰逼近的失控列车",
        tagDe: "Dilemma",
        tagZh: "伦理死结",
        shortEffectDe: "Unmittelbare Lebensgefahr für 5 Personen ohne äußeres Eingreifen.",
        shortEffectZh: "若无人为外部介入，主线5名工人将在数秒内丧生。",
        sideEffectDe: "Jede denkbare Handlungsoption (auch Untätigkeit) führt zum Tod von Menschen.",
        sideEffectZh: "任何可选择的处置方案（包括完全不作为）都将伴随人的死亡后果。",
        sachurteilDe: "Deterministischer physikalischer Kausalverlauf ohne Rettungsmöglichkeit durch Dritte.",
        sachurteilZh: "不可抗力的确定性物理因果进程，不存在任何第三方解救的侥幸余地。",
        werturteilDe: "Kollision zweier Grundpflichten: Pflicht zur Schadensminderung vs. Verbot der Tötung eines Unschuldigen.",
        werturteilZh: "两大核心义务的正面碰撞：积极减灾救人义务 vs. 不得剥夺无辜者生命的绝对禁令。",
        npScore: 8,
        klausurSatzDe: "Das Weichensteller-Dilemma konfrontiert das moralische Subjekt mit einer tragischen Kollisionslage, in welcher keine schuldfreie Handlungsalternative existiert.",
        klausurSatzZh: "电车换道两难将道德行为主体置于悲剧性的终极冲突境地，在此情境中不存在任何免于道德负罪感的备选方案。",
        x: 60,
        y: 190,
      },
      // Option A: Weiche umlegen
      {
        id: "trolley_opt_a",
        stage: 1,
        parentId: "trolley_root",
        code: "A",
        titleDe: "Option A: Weiche aktiv umlegen (Handeln)",
        titleZh: "方案 A：主动扳动道岔转向侧轨 (积极干预)",
        tagDe: "Strategie A",
        tagZh: "战略方案 A",
        shortEffectDe: "Der Zug wird umgeleitet; die fünf Arbeiter auf dem Hauptgleis werden physisch gerettet.",
        shortEffectZh: "列车改道驶入支线；主轨道上的5名工人脱离致命险境得以幸存。",
        sideEffectDe: "Der Akteur wird zum aktiven Kausalverursacher des Todes des einzelnen Arbeiters auf Nebengleis.",
        sideEffectZh: "行为人主动介入了因果链条，成为导致侧线那名独立工人死亡的直接因果决定者。",
        sachurteilDe: "Quantitatives Überleben von 5 Menschenleben gegen 1 Menschenleben gesichert.",
        sachurteilZh: "在数量层面上达成了以1个人的死亡换取5个人生还的经验性事实结果。",
        werturteilDe: "Konsequentialistische Güterabwägung sticht deontologisches Tötungsverbot aus.",
        werturteilZh: "结果主义与功利考量的法益权衡压倒了不杀生的绝对义务论诫命。",
        npScore: 10,
        klausurSatzDe: "Das aktive Umlegen der Weiche konstituiert einen intentionalen Kausaleingriff, der zwar den aggregierten Schaden minimiert, den Handelnden jedoch in direkte Tötungsverantwortung verstrickt.",
        klausurSatzZh: "主动扳动道岔构成了一次具有明确意图的因果干预，其虽在总量上最小化了生命损失，却使行为人直接陷入了致人死亡的道德与法律归责。",
        x: 240,
        y: 100,
      },
      // Option B: Nicht umlegen
      {
        id: "trolley_opt_b",
        stage: 1,
        parentId: "trolley_root",
        code: "B",
        titleDe: "Option B: Weiche nicht umlegen (Unterlassen)",
        titleZh: "方案 B：坚决不扳动道岔 (消极不作为/顺应既有轨道)",
        tagDe: "Strategie B",
        tagZh: "战略方案 B",
        shortEffectDe: "Kein aktiver Eingriff in den Kausalverlauf; der unbeteiligte Arbeiter auf Nebengleis bleibt unversehrt.",
        shortEffectZh: "行为人不介入物理因果；侧线上的独立无辜工人免于飞来横祸而平安存活。",
        sideEffectDe: "Die fünf Arbeiter auf dem Hauptgleis werden vom Zug überrollt und getötet.",
        sideEffectZh: "主线上的5名工人被列车冲撞碾压而当场丧生。",
        sachurteilDe: "Passive Kausalität: Der Akteur greift nicht in das verhängnisvolle Naturgeschehen ein.",
        sachurteilZh: "消极因果：行为人选择不打破既已存在的外部灾难发生脉络。",
        werturteilDe: "Wahrung der eigenen moralischen Unschuld durch Nicht-Tötung; Vorwurf unterlassener Hilfeleistung.",
        werturteilZh: "通过不杀生坚守自身道德清白；但也因而面临对多数人见死不救的严厉伦理责难。",
        npScore: 9,
        klausurSatzDe: "Die Entscheidung zum Unterlassen respektiert die Integrität unbeteiligter Dritter, nimmt aber den vorhersehbaren Tod einer Mehrzahl von Personen billigend in Kauf.",
        klausurSatzZh: "选择不作为的决断尊重了未涉事第三人的权利完整性，但主观上默许了多数人可预见死亡结局的不可避免。",
        x: 240,
        y: 280,
      },
      // A1: Utilitarismus Bentham
      {
        id: "trolley_a1",
        stage: 2,
        parentId: "trolley_opt_a",
        code: "A1",
        titleDe: "Reiner Utilitarismus (Jeremy Bentham)",
        titleZh: "路径 A1：古典行为功利主义 (边沁数量功利演算)",
        tagDe: "Theorie A1",
        tagZh: "理论流派 A1",
        shortEffectDe: "Quantitatives Hedonistisches Kalkül: 5 Gerettete erzeugen mehr Nutzen als 1 Getöteter Leid erzeugt.",
        shortEffectZh: "快乐主义算量推演：5个人的生命与福祉总和在数学上大于1个人丧生的痛苦总和。",
        sideEffectDe: "Degradierung des Menschen zu einer bloßen verrechenbaren Zahl; Vernachlässigung von Grundrechten.",
        sideEffectZh: "人被贬低为仅供汇总运算的数字；个体的尊严与基本权利在集体功利面前被彻底抹杀。",
        sachurteilDe: "Maximiert messbare Einheiten menschlichen Lebens unter strikt konsequentialistischer Prämisse.",
        sachurteilZh: "在严格的结果主义前提下最大化了可观测的人类生命存活数量单位。",
        werturteilDe: "Verstößt gegen das Verbot der Aufrechnung von Leben gegen Leben.",
        werturteilZh: "公然违背了现代文明法律体系中'生命与生命之间绝对禁止量化折抵'的法理底线。",
        npScore: 11,
        klausurSatzDe: "Die utilitaristische Position legitimiert die Weichenstellung über das hedonistische Nutzenkalkül, sieht sich jedoch dem Vorwurf ausgesetzt, die Unantastbarkeit des einzelnen Subjekts zu negieren.",
        klausurSatzZh: "功利主义立场借助效益演算赋予换道行为合法性，但面临着彻底否定单个主体尊严不可侵犯性的致命伦理指控。",
        x: 440,
        y: 55,
      },
      // A2: BVerfG Luftsicherheitsgesetz
      {
        id: "trolley_a2",
        stage: 2,
        parentId: "trolley_opt_a",
        code: "A2",
        titleDe: "Rechtliche Doktrin: Art. 1 GG (BVerfG 2006)",
        titleZh: "路径 A2：德国宪法法院判例审查 (航空安全法违宪裁定)",
        tagDe: "Rechtsnorm A2",
        tagZh: "法律规范 A2",
        shortEffectDe: "Prüfung nach deutschem Verfassungsrecht: Ist der Weichensteller rechtlich entschuldigt?",
        shortEffectZh: "依德国基本法审查：扳动道岔的调度员在刑法与宪法上能否主张免责事由？",
        sideEffectDe: "Kein rechtfertigender Notstand nach § 34 StGB möglich bei Aufrechnung von Menschenleben.",
        sideEffectZh: "依据德国刑法第34条，生命权冲突不适用阻却违法性的紧急避险，行为人实质构成过失/间接故意杀人。",
        sachurteilDe: "Der Arbeiter auf dem Nebengleis war in keiner Weise Gefahrenquelle; er wird zum Schutzobjekt Dritter degradiert.",
        sachurteilZh: "侧线工人本身绝非危险源；其生命在外部强行干预下沦为了庇护他人的工具手段。",
        werturteilDe: "Verstoß gegen die Menschenwürde (Art. 1 Abs. 1 GG): Der Einzelne darf nicht verdinglicht werden.",
        werturteilZh: "触犯基本法第1条第1款人的尊严绝对保护：个体绝不可被客体化物化（Objektformel）。",
        npScore: 13,
        klausurSatzDe: "In Analogie zum Urteil des BVerfG zum Luftsicherheitsgesetz (2006) verbietet die Wesensgehaltsgarantie der Menschenwürde jede quantitative Abwägung von Menschenleben gegen Menschenleben.",
        klausurSatzZh: "类比德国联邦宪法法院2006年关于《航空安全法》的里程碑判决，人的尊严本质保障绝对禁止对人类生命开展任何量化权衡抵扣。",
        x: 440,
        y: 145,
      },
      // B1: Kant Pflichtethik
      {
        id: "trolley_b1",
        stage: 2,
        parentId: "trolley_opt_b",
        code: "B1",
        titleDe: "Kantische Deontologie & Selbstzweckformel",
        titleZh: "路径 B1：康德义务论与人作为自身目的原则",
        tagDe: "Theorie B1",
        tagZh: "理论流派 B1",
        shortEffectDe: "Kategorischer Imperativ: Handle so, dass du die Menschheit niemals bloß als Mittel, sondern stets als Zweck brauchst.",
        shortEffectZh: "定言命令之自身目的公式：无论对待自身还是他人，永远要当成目的本身，切勿当作纯粹的手段。",
        sideEffectDe: "Hinnahme der extrem schmerzhaften Konsequenz von 5 Toten, um das moralische Tötungsverbot reinzuhalten.",
        sideEffectZh: "为坚守不可杀人的纯粹道德法则，必须被迫承受5名同胞罹难的极其痛苦客观惨剧。",
        sachurteilDe: "Kritik an Gesinnungsethik: Ignoriert die reale Folgenverantwortung in Grenzsituationen.",
        sachurteilZh: "动机伦理（意图伦理）遭受的经典批判：在极限危机情境下回避了对现实后果的连带责任。",
        werturteilDe: "Höchste philosophische Konsistenz: Der Einzelne auf dem Nebengleis wird nicht als Tötungswerkzeug instrumentalisiert.",
        werturteilZh: "具有最高哲学自洽性：侧轨上的无辜工人未被任何人强制充当抵挡列车换取他人生还的工具人。",
        npScore: 14,
        klausurSatzDe: "Aus der Perspektive von Kants Deontologie verbietet die Selbstzweckformel des Kategorischen Imperativs das Umlegen der Weiche zwingend, da der unbeteiligte Arbeiter als bloßes Instrument zur Rettung Dritter missbraucht würde.",
        klausurSatzZh: "自康德义务论视域观之，定言命令的自身目的公式绝对禁止换道行径，因未涉事工人在此将被强行降格为拯救他人的纯粹工具。",
        x: 440,
        y: 235,
      },
      // B2: Fatalismus
      {
        id: "trolley_b2",
        stage: 2,
        parentId: "trolley_opt_b",
        code: "B2",
        titleDe: "Ethischer Fatalismus & Verantwortungsflucht",
        titleZh: "路径 B2：宿命论式的消极逃避 (冷漠退缩)",
        tagDe: "Haltung B2",
        tagZh: "认知偏差 B2",
        shortEffectDe: "Der Akteur schließt die Augen und überlässt alles dem 'Schicksal'.",
        shortEffectZh: "行为人紧闭双眼并自我安慰将一切结果甩锅给所谓的'命运天意'。",
        sideEffectDe: "Untätigkeit schützt nicht vor Schuld: Unterlassen bei bestehender Handlungsmacht ist ebenfalls eine Wahl.",
        sideEffectZh: "不作为并不能免除道义内疚：在拥有行动能力时的刻意置身事外本身就是一种道德裁夺。",
        sachurteilDe: "Verkennt die philosophische Differenzierung zwischen 'nicht töten dürfen' und 'ignorantem Wegsehen'.",
        sachurteilZh: "混淆了'不可杀人'的严肃义务反思与'事不关己高高挂起'的冷漠卸责之间的本质界限。",
        werturteilDe: "Unreflektierte Flucht vor moralischer Autonomie; Verweigerung von Urteilskraft (AFB III defizitär).",
        werturteilZh: "未经审视的对道德主体自主性的溃逃；在会考评判力（AFB III）维度上严重欠缺说服力。",
        npScore: 7,
        klausurSatzDe: "Ein rein fatalistisches Unterlassen genügt den Ansprüchen philosophischer Ethik nicht, da das bewusste Nicht-Handeln in Ansehung drohenden Unheils eine moralisch zurechenbare Handlungsoption darstellt.",
        klausurSatzZh: "纯粹宿命论式的不作为无法满足哲学伦理学的严谨准绳，因在目睹灾难迫近时所作出的蓄意退缩在道德上同样属于可归责的行为抉择。",
        x: 440,
        y: 325,
      },
      // Stage 3 Outcomes
      {
        id: "trolley_end_a1",
        stage: 3,
        parentId: "trolley_a1",
        code: "End A1",
        titleDe: "Endurteil: Dammbruch zur Tyrannei der Mehrheit",
        titleZh: "终端归宿：集体功利对个体尊严的剥夺危险",
        tagDe: "AFB III Urteil",
        tagZh: "AFB III 评定",
        shortEffectDe: "Fünf Überlebende; gesellschaftliche Erleichterung über Schadensminimierung.",
        shortEffectZh: "5人生还；社会舆论因灾害损失数量最小化而长舒一口气。",
        sideEffectDe: "Präzedenzfall geschaffen: Dürfen in Zukunft Kranke getötet werden, um mit ihren Organen 5 andere zu retten?",
        sideEffectZh: "开启滑坡谬误判例先例：未来是否可强行摘取1名健康人的器官去拯救5名垂死患者？",
        sachurteilDe: "Widerspricht fundamentalen Rechtsstaatsprinzipien bei der Absicherung individueller Bürgerrechte.",
        sachurteilZh: "在捍卫公民个体基本权利方面与法治国最核心的底线原则发生不可调和的抵触。",
        werturteilDe: "Utilitarismus gerät in moralischen Widerspruch, wenn er die Menschenwürde zur Verhandlungsmasse macht.",
        werturteilZh: "当功利主义将不可侵犯的人的尊严降格为可讨价还价的筹码时，其自身即陷入道德破产境地。",
        npScore: 11,
        klausurSatzDe: "In der ethischen Gesamtbeurteilung offenbart der reine Utilitarismus sein Dammbruch-Risiko: Die bedingungslose Aufrechnung von Leben öffnet der Instrumentalisierung des Menschen Tür und Tor.",
        klausurSatzZh: "在伦理综合终审中，原教旨功利主义暴露出了滑坡决堤的致命隐患：对生命的无底线量化折抵将为肆意把人工具化大开方便之门。",
        x: 670,
        y: 55,
      },
      {
        id: "trolley_end_a2",
        stage: 3,
        parentId: "trolley_a2",
        code: "End A2",
        titleDe: "Endurteil: Schuldloser Notstand vs. Normerhalt",
        titleZh: "终端归宿：悲剧性责任抗辩与规范神圣性",
        tagDe: "AFB III Urteil",
        tagZh: "AFB III 评定",
        shortEffectDe: "Der Weichensteller wird strafrechtlich eventuell über übergesetzlichen Notstand entschuldigt.",
        shortEffectZh: "调度员在刑法审判中可能被依据'超法规阻却责任之紧急避险'予以免罪免刑。",
        sideEffectDe: "Das Rechtssystem behält fest: Die Tötungshandlung an sich war rechtswidrig, aber menschlich entschuldbar.",
        sideEffectZh: "司法体制坚定守住界限：该杀人行为在客观上判定为违法，但在人性困境中主观上可被宽宥与免罚。",
        sachurteilDe: "Juristische Meisterdifferenzierung zwischen Rechtswidrigkeit (Normebene) und Schuld (Täterschicksal).",
        sachurteilZh: "法理学上的精妙区分：将客观层面的违法性（规范不得动摇）与主观层面的有责性（当事人悲剧处境）截然剖开。",
        werturteilDe: "Schützt die absolute Geltung des Lebensrechts und erkennt gleichzeitig die existentielle Zerrissenheit des Menschen an.",
        werturteilZh: "既誓死捍卫了生命权的绝对至高性，又同时对人在极端极限处境下的生存割裂与煎熬予以了最大人道关怀。",
        npScore: 13,
        klausurSatzDe: "Die rechtsphilosophische Synthese löst das Dilemma durch die Differenzierung von Handlungsunrecht und Schuldausschluss: Die Tat bleibt verboten, der Akteur in tragischer Notlage jedoch entschuldigt.",
        klausurSatzZh: "法哲学综合方案通过区分行为不法（违法性）与责任排除（免责性）化解了两难：作为客观事实的行为仍属法所不许，但陷入悲剧绝境的行为人得以被免除刑事惩罚。",
        x: 670,
        y: 145,
      },
      {
        id: "trolley_end_b1",
        stage: 3,
        parentId: "trolley_b1",
        code: "End B1",
        titleDe: "Endurteil: Der unbefleckte Kategorische Imperativ",
        titleZh: "终端归宿：恪守定言命令的纯粹性与不可让步之代价",
        tagDe: "AFB III Urteil",
        tagZh: "AFB III 评定",
        shortEffectDe: "Kein Unschuldiger wurde aktiv ermordet; Menschenwürde als Absolutum verteidigt.",
        shortEffectZh: "没有任何无辜者被蓄意剥夺生命；人的尊严作为绝对律令被坚定守住。",
        sideEffectDe: "Fünf Familien trauern um ihre Angehörigen; der Akteur muss mit dem Vorwurf leben, nicht geholfen zu haben.",
        sideEffectZh: "5个家庭承受丧亲之痛；行为人终生必须直面世人对其未能拔刀相助的严厉心理审判。",
        sachurteilDe: "Kants Rigorismus erweist sich als theoretisch unanfechtbar, fordert in der Praxis jedoch heroische Kälte.",
        sachurteilZh: "康德的严苛主义在先验形而上学上坚不可摧，但在实践现实中要求当事人具备近乎冷酷的英雄式理智。",
        werturteilDe: "Höchste Würdigung in philosophischen Klausuren (14-15 NP): Verweigerung der Utilitarisierung des Rechts.",
        werturteilZh: "在哲学高阶考场中备受赞誉的高分立论（14-15 NP）：坚决拒绝将法哲学与尊严矮化为功利主义数字游戏。",
        npScore: 14,
        klausurSatzDe: "Die deontologische Urteilsbegründung behält ihren unantastbaren Vorrang, indem sie nachweist, dass der Schutz des Individuums vor Instrumentalisierung das unverhandelbare Fundament jeder moralischen Ordnung bildet.",
        klausurSatzZh: "义务论的裁判基石确立了其不可动摇的至高性，它深刻论证了保护个体免受工具化侵害是现代任何道德与文明秩序不可出卖的绝对奠基。",
        x: 670,
        y: 235,
      },
      {
        id: "trolley_end_b2",
        stage: 3,
        parentId: "trolley_b2",
        code: "End B2",
        titleDe: "Endurteil: Verpasste ethische Urteilskraft",
        titleZh: "终端归宿：道德反思的缺失与评判能力的溃散",
        tagDe: "AFB III Urteil",
        tagZh: "AFB III 评定",
        shortEffectDe: "Physikalischer Ablauf vollendet sich ohne menschliche Steuerung.",
        shortEffectZh: "物理撞击过程在无人干涉状态下自然结束。",
        sideEffectDe: "Moralischer Nihilismus: Wer Handeln und Unterlassen gleichsetzt, kapituliert vor der Ethik.",
        sideEffectZh: "陷入道德虚无主义泥潭：将审慎不杀生与盲目不负责等同视之，是对伦理思辨的彻底投降。",
        sachurteilDe: "Keine eigenständige argumentative Leistung; verfehlt die Abituranforderung nach fundierter Begründung.",
        sachurteilZh: "缺乏独立的论述建构；完全未能达成会考考纲要求具备的严谨论据说理标准。",
        werturteilDe: "Passivität ohne Reflexion ist moralisch defizitär und verdient in Klausuren keine AFB-III-Punkte.",
        werturteilZh: "未经反思批判的被动消极在道德上属于无能，无法在考场中获得AFB-III评价维度的高分认定。",
        npScore: 7,
        klausurSatzDe: "Eine unreflektierte Passivität genügt den Kriterien des philosophischen Urteilens nicht, weil sie die moralische Pflicht zur aktiven Reflexion der Handlungskonsequenzen schlicht verweigert.",
        klausurSatzZh: "未经反省的消极顺从无法满足哲学评判的学术标准，因其在根本上逃避了对行动后果展开主动伦理权衡的道德主观义务。",
        x: 670,
        y: 325,
      },
    ],
  },

  // 场景 3: SoWi — 最低工资 15 欧元 vs. 劳资自主协商权 (Tarifautonomie)
  {
    id: "mindestlohn",
    subject: "SoWi",
    titleDe: "Wirtschaftspolitik: Mindestlohn vs. Tarifautonomie",
    titleZh: "劳动力市场困局：法定15欧最低工资 vs. 劳资自主协商权",
    dilemmaSummaryDe:
      "Angesichts von Inflation und Reallohnverlusten wird ein gesetzlicher Mindestlohn von 15 Euro gefordert. Kritiker warnen vor einem verfassungswidrigen Eingriff in die Tarifautonomie (Art. 9 Abs. 3 GG).",
    dilemmaSummaryZh:
      "面对生活成本通胀压力，社会呼吁通过议会直接立法将最低工资大幅拉高至15欧元。反对者则严正警告这属于对基本法第9条第3款保障的劳资自主协商权的越权破坏。",
    nodes: [
      {
        id: "lohn_root",
        stage: 0,
        parentId: null,
        code: "0",
        titleDe: "Ausgangslage: Niedriglohn & Tarifflucht",
        titleZh: "决策原点：低薪阶层通胀阵痛与企业脱离劳资协议",
        tagDe: "Dilemma",
        tagZh: "制度博弈",
        shortEffectDe: "Reallohnverluste bei Dienstleistungs- und Geringverdienergruppen.",
        shortEffectZh: "基础服务业与低收入阶层家庭的实际购买力遭受通胀侵蚀。",
        sideEffectDe: "Sinkende Tarifbindung schwächt Gewerkschaften und die traditionelle Sozialpartnerschaft.",
        sideEffectZh: "加入劳资协议的企业比例持续走低，削弱了工会组织与传统劳资合作谈判体系。",
        sachurteilDe: "Zielkonflikt zwischen sozialer Absicherung und unternehmerischer Kostenanpassung.",
        sachurteilZh: "底层社会底线保障与中小企业人工成本消化承受力之间的现实目标冲突。",
        werturteilDe: "Spannung zwischen Art. 9 Abs. 3 GG (Koalitionsfreiheit) und Sozialstaatsprinzip (Art. 20 GG).",
        werturteilZh: "基本法第9条第3款联合自由（劳资自主）与基本法第20条社会福利国原则的法制张力。",
        npScore: 8,
        klausurSatzDe: "Der Konflikt wurzelt in der verfassungsrechtlichen Reibung zwischen staatlicher Fürsorgepflicht und der Autonomie der Tarifpartner.",
        klausurSatzZh: "该分歧植根于国家救助照护义务与劳资协商伙伴自治宪法特权之间的制度摩擦。",
        x: 60,
        y: 190,
      },
      // Option A
      {
        id: "lohn_opt_a",
        stage: 1,
        parentId: "lohn_root",
        code: "A",
        titleDe: "Option A: Gesetzliche Erhöhung auf 15 EUR",
        titleZh: "方案 A：通过联邦议会直接立法强推15欧元",
        tagDe: "Strategie A",
        tagZh: "战略方案 A",
        shortEffectDe: "Sofortige kräftige Gehaltsaufbesserung für über 4 Millionen Beschäftigte.",
        shortEffectZh: "超过400万低薪受雇劳动者即时享受实打实的工资增长红利。",
        sideEffectDe: "Politisierung der Lohnfindung; Aushebelung der unabhängigen Mindestlohnkommission.",
        sideEffectZh: "工资形成机制彻底政治化，沦为竞选民粹筹码；中立最低工资委员会名存实亡。",
        sachurteilDe: "Stärkt die Binnennachfrage sofort, belastet jedoch arbeitsintensive Dienstleister (Gastronomie, Handwerk).",
        sachurteilZh: "即时提振国内宏观消费内需，但沉重打击了餐饮服务、传统手工业等劳动密集型行业。",
        werturteilDe: "Primäre Verwirklichung des Rechts auf armutsfestes Arbeitseinkommen.",
        werturteilZh: "优先兑现了劳动者享有摆脱绝对贫困体面工资的实质人权要求。",
        npScore: 10,
        klausurSatzDe: "Die staatliche Lohnfestsetzung interveniert autoritativ in die Marktpreise, um den Niedriglohnsektor administrativ auszutrocknen.",
        klausurSatzZh: "国家定薪通过公权力权威干预市场价格形成，旨在通过行政手段强制挤出低薪部门。",
        x: 240,
        y: 100,
      },
      // Option B
      {
        id: "lohn_opt_b",
        stage: 1,
        parentId: "lohn_root",
        code: "B",
        titleDe: "Option B: Stärkung der Tarifverhandlungen",
        titleZh: "方案 B：坚守劳资自主协商与行业协议扩展",
        tagDe: "Strategie B",
        tagZh: "战略方案 B",
        shortEffectDe: "Lohnuntergrenzen werden branchenspezifisch von Arbeitgebern und Gewerkschaften verhandelt.",
        shortEffectZh: "由工会与雇主协会针对各行业生产率差异细致磋商，定制差异化工资基准底线。",
        sideEffectDe: "Langwierige Tarifkonflikte, Streiks und unzureichender Schutz in tariffreien Bereichen.",
        sideEffectZh: "伴随旷日持久的劳资拉锯、交通停摆罢工，且未加入协议的灰色地带依旧缺乏保障。",
        sachurteilDe: "Hohe Passgenauigkeit an die Produktivität der Branchen; schont die Wettbewerbsfähigkeit.",
        sachurteilZh: "与各产业部门实际劳动生产率高度吻合，最大程度保护了出口实体经济的国际竞争力。",
        werturteilDe: "Achtung der verfassungsrechtlichen Koalitionsfreiheit ohne staatliche Vormundschaft.",
        werturteilZh: "充分尊重宪法赋予劳资团体的结社自主权，摒弃国家越俎代庖的保姆式包办。",
        npScore: 11,
        klausurSatzDe: "Das Festhalten an der Tarifautonomie sichert die dezentrale Allokationseffizienz, setzt jedoch eine handlungsfähige gewerkschaftliche Verhandlungsmacht voraus.",
        klausurSatzZh: "坚守劳资协议自治保障了分权决策的配置效率，但前提是工会必须拥有足够强大的谈判博弈实力。",
        x: 240,
        y: 280,
      },
      // A1
      {
        id: "lohn_a1",
        stage: 2,
        parentId: "lohn_opt_a",
        code: "A1",
        titleDe: "Kaufkraftschub & Binnennachfrage",
        titleZh: "路径 A1：购买力注入与内需乘数释放",
        tagDe: "Maßnahme A1",
        tagZh: "细分措施 A1",
        shortEffectDe: "Geringverdiener konsumieren fast 100% ihres Mehreinkommens unmittelbar.",
        shortEffectZh: "低收入群体的边际消费倾向极高，新增收入几乎百分之百直接转化为实体商品消费。",
        sideEffectDe: "Gefahr der Überwälzung auf Verbraucherpreise (Lohn-Preis-Spirale bei Dienstleistungen).",
        sideEffectZh: "雇主面临将激增的人工成本全额转嫁给终端消费者的倾向，诱发服务业物价二次上涨。",
        sachurteilDe: "Keynesianischer Nachfrageeffekt überwiegt neoklassische Entlassungsbefürchtungen weitgehend.",
        sachurteilZh: "凯恩斯主义的总需求扩张效应在经验上显著压倒了新古典主义关于大规模裁员的悲观预期。",
        werturteilDe: "Reduziert das Phänomen 'Working Poor' nachhaltig.",
        werturteilZh: "有效终结了辛勤工作全职劳作却依旧沦为'在职贫困者'（Working Poor）的社会不公。",
        npScore: 12,
        klausurSatzDe: "Aus nachfrageorientierter Perspektive entfaltet die Anhebung des Mindestlohns einen expansiven Impuls, indem sie die marginale Konsumquote der Einkommensschwachen aktiviert.",
        klausurSatzZh: "从需求导向视域考察，提高最低工资通过激活低收入群体的边际消费倾向释放了强劲的宏观扩张动能。",
        x: 440,
        y: 55,
      },
      // A2
      {
        id: "lohn_a2",
        stage: 2,
        parentId: "lohn_opt_a",
        code: "A2",
        titleDe: "Erosion der Tarifpartnerschaft",
        titleZh: "路径 A2：消解劳资伙伴关系与入会动机",
        tagDe: "Maßnahme A2",
        tagZh: "细分措施 A2",
        shortEffectDe: "Arbeitnehmer sehen keinen Sinn mehr darin, Mitgliedsbeiträge an Gewerkschaften zu zahlen.",
        shortEffectZh: "普通工人直观感受到工资增长只需向议会政客游说，工会缴纳会费的动力显著萎缩。",
        sideEffectDe: "Schwächung der kollektiven Verhandlungsmacht für weiterführende Arbeitsbedingungen (Urlaub, Weiterbildung).",
        sideEffectZh: "导致工会对于带薪休假、防猝死工时管控、再教育培训等更高维度劳动权益的谈判筹码丧失。",
        sachurteilDe: "Macht die Lohnfindung zum parteipolitischen Wahlkampfgeschenk; schadet der Stabilität.",
        sachurteilZh: "使社会薪酬机制异化为各党派逢选必推的民粹拉票工具，严重破坏了制度的可预期性。",
        werturteilDe: "Gefahr staatlicher Bevormundung der Zivilgesellschaft.",
        werturteilZh: "国家公权力对民间自治协会的过度包办侵蚀了公民社会的独立成长土壤。",
        npScore: 9,
        klausurSatzDe: "Die Verdrängung tarifvertraglicher Regelungen durch staatliche Lohnedikte birgt das ordnungspolitische Risiko einer Entmachtung der institutionellen Sozialpartnerschaft.",
        klausurSatzZh: "以国家法定薪资条令排挤劳资协议机制，蕴含着架空与瓦解制度化劳资合作秩序的严重经济秩序政策风险。",
        x: 440,
        y: 145,
      },
      // B1
      {
        id: "lohn_b1",
        stage: 2,
        parentId: "lohn_opt_b",
        code: "B1",
        titleDe: "Allgemeinverbindlicherklärung (AVE)",
        titleZh: "路径 B1：劳资协议普遍约束力宣告 (AVE)",
        tagDe: "Maßnahme B1",
        tagZh: "细分措施 B1",
        shortEffectDe: "Bundesarbeitsministerium erklärt verhandelte Branchentarifverträge für alle Betriebe für verbindlich.",
        shortEffectZh: "联邦劳动部依法宣告各行业协商达成的薪资协议具备全行业无差别强制普遍约束力。",
        sideEffectDe: "Verhindert Schmutzkonkurrenz durch Lohndumping, erfordert aber hohe Kompromissbereitschaft.",
        sideEffectZh: "彻底杜绝了依靠恶性压低工资进行不正当竞争的恶习，但要求谈判双方具备高度妥协精神。",
        sachurteilDe: "Ideale Synthese: Branchenpassung bleibt gewahrt, Lohndumping wird flächendeckend unterbunden.",
        sachurteilZh: "理想的综合治理范式：既尊重了不同行业的实际生产率特征，又封死了恶性压薪的漏洞。",
        werturteilDe: "Stärkt die Tarifautonomie (Art. 9 GG) im vollen Einklang mit dem Sozialstaatsgebot.",
        werturteilZh: "在完全契合社会福利国家原则的前提下，对宪法第9条劳资自治精神给予了最大化弘扬。",
        npScore: 15,
        klausurSatzDe: "Das Instrument der Allgemeinverbindlicherklärung (AVE) harmonisiert den verfassungsrechtlichen Schutz der Tarifautonomie mit dem sozialpolitischen Gebot des Schutzes vor Lohndumping.",
        klausurSatzZh: "普遍约束力宣告（AVE）制度将保护劳资协议自治的宪法要求与遏制恶性压降薪资的社会政策目标实现了极其完美的和谐统合。",
        x: 440,
        y: 325,
      },
      // B2
      {
        id: "lohn_b2",
        stage: 2,
        parentId: "lohn_opt_b",
        code: "B2",
        titleDe: "Status-Quo ohne Reform & Tariflücke",
        titleZh: "路径 B2：固守现状缺乏改革 (脱保灰色区蔓延)",
        tagDe: "Maßnahme B2",
        tagZh: "细分措施 B2",
        shortEffectDe: "Keine Einigung; Unternehmen treten weiterhin massenhaft aus Arbeitgeberverbänden aus (OT-Mitgliedschaft).",
        shortEffectZh: "陷入僵局；企业继续通过注册'无协议义务会员'（OT）大面积规避受劳资条款约束。",
        sideEffectDe: "Expansion prekärer Beschäftigungsverhältnisse in Plattformarbeit, Logistik und Pflege.",
        sideEffectZh: "平台零工经济、快递物流与照护服务等行业的非正规不稳定就业与低薪现象持续泛滥。",
        sachurteilDe: "Mangelhafte Funktionsfähigkeit: Der Marktmechanismus allein schützt vulnerable Beschäftigte nicht.",
        sachurteilZh: "机制运行失灵：在供求地位严重不对称的劳动力市场上，纯粹自发机制无法保护弱势求职者。",
        werturteilDe: "Verletzung des Gebots der Verteilungsgerechtigkeit; Akzeptanz von Altersarmut.",
        werturteilZh: "违背了分配正义的基本公理；实质上是对低薪劳动者未来面临老年贫困的默许与放任。",
        npScore: 6,
        klausurSatzDe: "Ein tatenloses Verharren im Status quo verschärft die Erosion der Tarifbindung und führt zu einer ordnungspolitisch nicht vertretbaren Prekarisierung ungeschützter Beschäftigter.",
        klausurSatzZh: "在现状面前无所作为加剧了劳资约束协议的崩塌解体，并导致无保障雇工陷入秩序政策上绝不可接受的极度脆弱化困境。",
        x: 440,
        y: 235,
      },
      // Stage 3 Outcomes
      {
        id: "lohn_end_a1",
        stage: 3,
        parentId: "lohn_a1",
        code: "End A1",
        titleDe: "Endzustand: Reallohnsicherung mit Inflationsrisiko",
        titleZh: "终端归宿：实际工资托底与消费品物价转嫁",
        tagDe: "AFB III Urteil",
        tagZh: "AFB III 评定",
        shortEffectDe: "Armutsgefährdung von Vollzeitbeschäftigten sinkt messbar.",
        shortEffectZh: "全职受雇人员的贫困发生率指标呈现出清晰的统计学下降。",
        sideEffectDe: "Erhöhte Preise bei Gastronomie und Handwerk schmälern die realen Kaufkraftgewinne.",
        sideEffectZh: "餐饮外卖、理发家政与装修费用普遍上调，部分冲销了低薪群体的名义收入购买力增益。",
        sachurteilDe: "Hohe soziale Wirksamkeit, jedoch konjunkturelle Vulnerabilität bei exportorientierten Kleinbetrieben.",
        sachurteilZh: "社会救助政策实效显著，但增加了依赖微薄利润率的中小型加工出口企业的破产脆弱性。",
        werturteilDe: "Gerechtfertigt zur Vermeidung von staatlichen Aufstocker-Kosten (Subventionierung schlechter Arbeitgeber).",
        werturteilZh: "具备极高的价值正当性：彻底切断了国家用财政救济补贴恶意克扣工资的不良雇主的畸形体制。",
        npScore: 11,
        klausurSatzDe: "Im Abitur-Sachurteil ist festzuhalten, dass der Mindestlohn von 15 Euro die Binnennachfrage stützt und das Sozialsystem entlastet, wenngleich sektorale Preisüberwälzungen unvermeidbar bleiben.",
        klausurSatzZh: "在会考事实评判中必须明确，15欧元法定最低工资在强力支撑国内消费并减轻社保负担的同时，不可避免地伴随部分产业门类的终端价格转嫁效应。",
        x: 670,
        y: 55,
      },
      {
        id: "lohn_end_a2",
        stage: 3,
        parentId: "lohn_a2",
        code: "End A2",
        titleDe: "Endzustand: Staatlich gelenkte Lohnbiotope",
        titleZh: "终端归宿：国家干预定薪孤岛与集体协商萎缩",
        tagDe: "AFB III Urteil",
        tagZh: "AFB III 评定",
        shortEffectDe: "Gewerkschaften verlieren ihren Markenkern als primäre Lohnkämpfer.",
        shortEffectZh: "工会丧失了作为劳动力价格争取者最核心的群众动员力与组织立足点。",
        sideEffectDe: "Abhängigkeit der arbeitenden Bevölkerung von parlamentarischen Konstellationen und Wahlterminen.",
        sideEffectZh: "工薪阶层的根本利益严重依附于执政党派的政治算计与议会换届周期。",
        sachurteilDe: "Allokationsverzerrend: Beseitigt die Fähigkeit zur flexiblen Krisenanpassung in Rezessionen.",
        sachurteilZh: "配置效率扭曲：彻底抹杀了企业与劳工在经济衰退周期通过协商弹性工时共渡难关的柔性韧性。",
        werturteilDe: "Bedenklich hinsichtlich der Gewaltenteilung und subsidiarer Selbstverwaltung.",
        werturteilZh: "在国家权力边界划分与辅助性自决治理原则方面存在严重的制度隐患。",
        npScore: 9,
        klausurSatzDe: "Die Übernahme der Lohnfindung durch den Gesetzgeber löst zwar distributive Härten, gefährdet jedoch langfristig die staatsferne Autonomie der intermediären Instanzen.",
        klausurSatzZh: "由立法机关直接包办薪资定价固然缓解了当下的分配阵痛，但从长远看却严重危害了中介自治机构远离国家公权力干预的独立性底线。",
        x: 670,
        y: 145,
      },
      {
        id: "lohn_end_b1",
        stage: 3,
        parentId: "lohn_b1",
        code: "End B1",
        titleDe: "Endzustand: Das SoWi-Optimum (AVE-Flächentarif)",
        titleZh: "终端归宿：会考满分典范 (普遍约束全行业劳资共治)",
        tagDe: "AFB III Urteil",
        tagZh: "AFB III 评定",
        shortEffectDe: "Breite Tarifabdeckung ohne staatliche Mikromanagement-Bürokratie.",
        shortEffectZh: "无需国家派出官僚大军微观干涉，即实现了各产业宽广覆盖的体面薪酬协议网。",
        sideEffectDe: "Setzt handlungsfähige, kompromissbereite Tarifparteien auf Augenhöhe voraus.",
        sideEffectZh: "前提要求劳资双方均拥有高素质专业协商团队，秉持平视对话与同舟共济的共识文化。",
        sachurteilDe: "Höchste ordnungspolitische Eleganz: Schützt das Produktivitätsprinzip und unterbindet Lohnausbeutung.",
        sachurteilZh: "最高的经济秩序制度雅致性：既完整维护了生产率决定报酬的核心经济规律，又从源头锁死了一切压榨行径。",
        werturteilDe: "Musterbeispiel der Sozialen Marktwirtschaft (Ludwig Erhard & Alfred Müller-Armack): Wohlstand für alle.",
        werturteilZh: "德国'社会市场经济'（艾哈德与阿尔弗雷德·米勒-阿尔马克）的皇冠明珠体现：在自由竞争中达成大众共有福祉。",
        npScore: 15,
        klausurSatzDe: "Urteilssynthese: Die Stärkung des Flächentarifs mittels Allgemeinverbindlicherklärung verwirklicht das Ideal der Sozialen Marktwirtschaft, indem sie Markteffizienz und distributive Gerechtigkeit ohne verfassungsrechtliche Kollision vereint.",
        klausurSatzZh: "综合终审评据：通过普遍约束力宣告（AVE）巩固全行业协议，在未触碰宪法红线的前提下完美统合了市场配置效率与分配伦理正义，是社会市场经济理路的最优解构。",
        x: 670,
        y: 325,
      },
      {
        id: "lohn_end_b2",
        stage: 3,
        parentId: "lohn_b2",
        code: "End B2",
        titleDe: "Endzustand: Verarmung im ungeschützten Sektor",
        titleZh: "终端归宿：制度脱靶与无保护群体的深层沉沦",
        tagDe: "AFB III Urteil",
        tagZh: "AFB III 评定",
        shortEffectDe: "Kostenersparnis für rücksichtslose Niedriglohn-Arbeitgeber.",
        shortEffectZh: "劣质低薪雇主得以继续坐享低劣用工成本带来的暴利。",
        sideEffectDe: "Zunahme staatlicher Aufstockerleistungen; Steuerzahler subventioniert sittenwidrige Löhne.",
        sideEffectZh: "财政用于低保补差的开支飙升；全体纳税人在被迫补贴那些违背公序良俗的血汗雇主。",
        sachurteilDe: "Marktversagen: Asymmetrische Verhandlungsmacht führt zur systematischen Ausbeutung unorganisierter Kräfte.",
        sachurteilZh: "典型的劳动力市场失灵：信息与地位的不对称导致未参加工会的弱势打工群体遭到制度性压榨。",
        werturteilDe: "Ethisch und sozialstaatlich unhaltbar; erfordert dringende ordnungspolitische Korrektur.",
        werturteilZh: "在伦理层面与社会福利国宪法义务面前皆属不可容忍，亟需展开深度的经济秩序校正重构。",
        npScore: 6,
        klausurSatzDe: "Das Festhalten an einem dysfunktionalen Status quo ohne regulatorische Schutzmechanismen verletzt das Sozialstaatsversprechen und delegiert private Lohnkosten unzulässig an den Steuerzahler.",
        klausurSatzZh: "在缺乏监管防护网的失灵现状下裹足不前公然违背了社会福利国家的立国承诺，并极其非法地将本应由私营企业承担的薪资成本转嫁给全体纳税人接盘。",
        x: 670,
        y: 235,
      },
    ],
  },
];

export const ScenarioDecisionTree: React.FC<ScenarioDecisionTreeProps> = ({
  title,
  lang = "de",
  onNodeSelect,
  scenarioId = "fiskalpolitik",
}) => {
  const isDe = lang === "de";

  // 当前场景选择（跟随课程预设情境，不再全课默认财政政策树）
  const [activeScenarioId, setActiveScenarioId] = useState<string>(
    SCENARIOS.some((s) => s.id === scenarioId) ? scenarioId : "fiskalpolitik"
  );

  const currentScenario =
    SCENARIOS.find((s) => s.id === activeScenarioId) || SCENARIOS[0];

  // 当前选中的节点 ID（默认选中 Root 节点）
  const [selectedNodeId, setSelectedNodeId] = useState<string>(
    currentScenario.nodes[0].id
  );

  // 课程切换时跟随新的预设情境
  React.useEffect(() => {
    if (SCENARIOS.some((s) => s.id === scenarioId) && scenarioId !== activeScenarioId) {
      setActiveScenarioId(scenarioId);
      const scen = SCENARIOS.find((s) => s.id === scenarioId) || SCENARIOS[0];
      setSelectedNodeId(scen.nodes[0].id);
    }
  }, [scenarioId]);

  // 场景切换处理
  const handleScenarioChange = (scenarioId: string) => {
    setActiveScenarioId(scenarioId);
    const scen = SCENARIOS.find((s) => s.id === scenarioId) || SCENARIOS[0];
    const rootNode = scen.nodes[0];
    setSelectedNodeId(rootNode.id);
    if (onNodeSelect) {
      onNodeSelect(rootNode.id, rootNode.npScore);
    }
  };

  // 节点选中处理
  const handleSelectNode = (node: DecisionNode) => {
    setSelectedNodeId(node.id);
    if (onNodeSelect) {
      onNodeSelect(node.id, node.npScore);
    }
  };

  // 获取当前选中节点对象
  const activeNode =
    currentScenario.nodes.find((n) => n.id === selectedNodeId) ||
    currentScenario.nodes[0];

  // 计算当前从 Root 到 activeNode 的决策路径集合 (Active Path)
  const computeActivePathIds = (): Set<string> => {
    const path = new Set<string>();
    let curr: DecisionNode | undefined = activeNode;
    while (curr) {
      path.add(curr.id);
      if (curr.parentId) {
        curr = currentScenario.nodes.find((n) => n.id === curr?.parentId);
      } else {
        break;
      }
    }
    return path;
  };

  const activePathSet = computeActivePathIds();

  // 获取路径上的节点按顺序排列（用于面包屑展示）
  const breadcrumbNodes: DecisionNode[] = [];
  let currStep: DecisionNode | undefined = activeNode;
  while (currStep) {
    breadcrumbNodes.unshift(currStep);
    currStep = currentScenario.nodes.find((n) => n.id === currStep?.parentId);
  }

  return (
    <div className="w-full border border-[var(--line)] bg-[var(--paper)] text-[var(--ink)] font-sans">
      {/* 模块头部栏 */}
      <div className="border-b border-[var(--line)] px-4 py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-[var(--paper-subtle)]">
        <div>
          <div className="text-xs font-mono uppercase tracking-wider text-[var(--ink-muted)]">
            {isDe ? "MicroWorld Modul 2 · Dilemma & Kausale Entscheidungsbäume" : "微世界模块 2 · 权衡决策与因果分支树"}
          </div>
          <h2 className="text-sm font-bold tracking-tight">
            {title || (isDe ? "Szenario-Entscheidungsbaum (AFB III Urteilsbildung)" : "情境决策抉择树与高阶评价台")}
          </h2>
        </div>

        {/* 场景切换器 */}
        <div className="flex items-center gap-2">
          <label className="text-xs font-mono text-[var(--ink-muted)]">
            {isDe ? "Szenario:" : "情境案例:"}
          </label>
          <div className="flex items-center border border-[var(--line)] bg-[var(--paper)] p-0.5">
            {SCENARIOS.map((s) => (
              <button
                key={s.id}
                type="button"
                onClick={() => handleScenarioChange(s.id)}
                className={`text-xs font-mono px-2 py-1 transition-colors cursor-pointer ${
                  activeScenarioId === s.id
                    ? "bg-[var(--ink)] text-[var(--paper)] font-bold"
                    : "text-[var(--ink-muted)] hover:text-[var(--ink)]"
                }`}
              >
                {s.subject} · {s.id === "fiskalpolitik" ? (isDe ? "Fiskus" : "财政") : s.id === "trolley" ? (isDe ? "Trolley" : "电车") : (isDe ? "Lohn" : "工资")}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 当前情境简介栏 */}
      <div className="px-4 py-2.5 border-b border-[var(--line)] bg-[var(--paper)] flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div className="text-xs font-mono leading-relaxed">
          <span className="font-bold underline mr-1.5">
            {isDe ? currentScenario.titleDe : currentScenario.titleZh}:
          </span>
          <span className="text-[var(--ink)]">
            {isDe ? currentScenario.dilemmaSummaryDe : currentScenario.dilemmaSummaryZh}
          </span>
        </div>

        <button
          type="button"
          onClick={() => handleSelectNode(currentScenario.nodes[0])}
          className="text-xs font-mono px-2 py-0.5 border border-[var(--line)] hover:border-[var(--ink)] text-[var(--ink-muted)] self-start sm:self-auto cursor-pointer"
        >
          {isDe ? "Reset auf Wurzel" : "重置至根节点"}
        </button>
      </div>

      {/* 阶梯面包屑决策流 (Step Card / Breadcrumb Flow) */}
      <div className="px-4 py-2 border-b border-[var(--line)] bg-[var(--paper-subtle)] overflow-x-auto">
        <div className="flex items-center gap-2 text-xs font-mono whitespace-nowrap">
          <span className="text-[var(--ink-muted)] uppercase text-[10px]">
            {isDe ? "Aktiver Pfad:" : "当前决策路径:"}
          </span>
          {breadcrumbNodes.map((bNode, idx) => {
            const isLast = idx === breadcrumbNodes.length - 1;
            return (
              <React.Fragment key={bNode.id}>
                <button
                  type="button"
                  onClick={() => handleSelectNode(bNode)}
                  className={`px-2 py-0.5 border transition-colors cursor-pointer ${
                    isLast
                      ? "border-[var(--ink)] bg-[var(--paper)] text-[var(--ink)] font-bold"
                      : "border-[var(--line)] bg-[var(--paper)] text-[var(--ink-muted)] hover:text-[var(--ink)]"
                  }`}
                >
                  [{bNode.code}] {isDe ? bNode.titleDe : bNode.titleZh}
                </button>
                {!isLast && <span className="text-[var(--ink-muted)] font-mono">{"->"}</span>}
              </React.Fragment>
            );
          })}
        </div>
      </div>

      {/* SVG 抉择分支树可视化画布 (Tufte Data-Ink 精准坐标几何) */}
      <div className="p-4 border-b border-[var(--line)] bg-[var(--paper)]">
        <div className="text-xs font-mono text-[var(--ink-muted)] mb-2 flex items-center justify-between">
          <span>{isDe ? "INTERAKTIVER ENTSCHEIDUNGS-GRAPH" : "交互式因果分支拓扑图"}</span>
          <span>{isDe ? "STUFE 0 -> STUFE 1 -> STUFE 2 -> STUFE 3 (AFB III)" : "第0阶段 -> 第1阶段 -> 第2阶段 -> 第3阶段 (会考终审)"}</span>
        </div>

        <div className="w-full overflow-x-auto border border-[var(--line)] bg-[var(--paper-subtle)] p-2">
          <svg
            viewBox="0 0 820 380"
            className="w-full max-w-[820px] mx-auto block text-[var(--ink)]"
            aria-label={isDe ? "Entscheidungsbaum-Grafik" : "决策树拓扑图"}
          >
            {/* 阶段划分垂直辅助基准线 */}
            <line x1="60" y1="20" x2="60" y2="360" stroke="var(--line)" strokeWidth="1" strokeDasharray="3 3" />
            <line x1="240" y1="20" x2="240" y2="360" stroke="var(--line)" strokeWidth="1" strokeDasharray="3 3" />
            <line x1="440" y1="20" x2="440" y2="360" stroke="var(--line)" strokeWidth="1" strokeDasharray="3 3" />
            <line x1="670" y1="20" x2="670" y2="360" stroke="var(--line)" strokeWidth="1" strokeDasharray="3 3" />

            <text x="60" y="16" textAnchor="middle" className="text-[9px] font-mono" fill="var(--ink-muted)">
              0: DILEMMA
            </text>
            <text x="240" y="16" textAnchor="middle" className="text-[9px] font-mono" fill="var(--ink-muted)">
              1: STRATEGIE
            </text>
            <text x="440" y="16" textAnchor="middle" className="text-[9px] font-mono" fill="var(--ink-muted)">
              2: MASSNAHME
            </text>
            <text x="670" y="16" textAnchor="middle" className="text-[9px] font-mono" fill="var(--ink-muted)">
              3: SYNTHESE (AFB III)
            </text>

            {/* 连接贝塞尔曲线图层 */}
            {currentScenario.nodes.map((childNode) => {
              if (!childNode.parentId) return null;
              const parentNode = currentScenario.nodes.find((n) => n.id === childNode.parentId);
              if (!parentNode) return null;

              const isPathActive = activePathSet.has(childNode.id) && activePathSet.has(parentNode.id);
              const dx = childNode.x - parentNode.x;
              const c1x = parentNode.x + dx * 0.45;
              const c2x = childNode.x - dx * 0.45;
              const pathD = `M ${parentNode.x} ${parentNode.y} C ${c1x} ${parentNode.y}, ${c2x} ${childNode.y}, ${childNode.x} ${childNode.y}`;

              return (
                <path
                  key={`edge-${parentNode.id}-${childNode.id}`}
                  d={pathD}
                  fill="none"
                  stroke="var(--ink)"
                  strokeWidth={isPathActive ? "2.5" : "1"}
                  strokeDasharray={isPathActive ? "none" : "3 3"}
                  opacity={isPathActive ? "1" : "0.35"}
                />
              );
            })}

            {/* 决策节点图层 */}
            {currentScenario.nodes.map((node) => {
              const isSelected = selectedNodeId === node.id;
              const isOnActivePath = activePathSet.has(node.id);

              return (
                <g
                  key={node.id}
                  onClick={() => handleSelectNode(node)}
                  className="cursor-pointer transition-transform duration-150"
                  style={{
                    transformOrigin: `${node.x}px ${node.y}px`,
                    transformBox: "view-box",
                  }}
                >
                  {/* 外层状态光环（高对比度） */}
                  {isSelected && (
                    <circle
                      cx={node.x}
                      cy={node.y}
                      r="19"
                      fill="none"
                      stroke="var(--ink)"
                      strokeWidth="1.5"
                      strokeDasharray="2 2"
                    />
                  )}

                  {/* 核心圆形徽标 */}
                  <circle
                    cx={node.x}
                    cy={node.y}
                    r="14"
                    fill={isSelected ? "var(--ink)" : isOnActivePath ? "var(--paper)" : "var(--paper-subtle)"}
                    stroke="var(--ink)"
                    strokeWidth={isOnActivePath ? "2" : "1"}
                  />

                  {/* 节点字母代号 */}
                  <text
                    x={node.x}
                    y={node.y + 3.5}
                    textAnchor="middle"
                    className="text-[9px] font-mono font-bold select-none"
                    fill={isSelected ? "var(--paper)" : "var(--ink)"}
                  >
                    {node.code}
                  </text>

                  {/* 节点侧边短标题与分值 */}
                  <text
                    x={node.x}
                    y={node.y + (node.stage === 0 ? 25 : node.y < 190 ? -20 : 25)}
                    textAnchor="middle"
                    className="text-[9px] font-mono select-none"
                    fill={isSelected ? "var(--ink)" : "var(--ink-muted)"}
                    fontWeight={isSelected ? "bold" : "normal"}
                  >
                    {isDe ? node.titleDe.slice(0, 16) : node.titleZh.slice(0, 8)}
                  </text>

                  {/* 阶段 3 节点附带 Notenpunkte 角标 */}
                  {node.stage === 3 && (
                    <text
                      x={node.x + 22}
                      y={node.y + 3}
                      textAnchor="start"
                      className="text-[8px] font-mono font-bold select-none"
                      fill="var(--ink)"
                    >
                      {node.npScore} NP
                    </text>
                  )}
                </g>
              );
            })}
          </svg>
        </div>
      </div>

      {/* 实时因果推演与 15 NP 高阶评审视窗 (Echtzeit-Urteilsfenster) */}
      <div className="p-4 bg-[var(--paper-subtle)] space-y-4">
        {/* 当前选中节点信息头 */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[var(--line)]">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-mono px-2 py-0.5 border border-[var(--ink)] bg-[var(--ink)] text-[var(--paper)] font-bold">
                KNOTEN [{activeNode.code}]
              </span>
              <span className="text-xs font-mono px-2 py-0.5 border border-[var(--line)] bg-[var(--paper)] text-[var(--ink)]">
                {isDe ? activeNode.tagDe : activeNode.tagZh}
              </span>
              <h3 className="text-sm font-bold tracking-tight">
                {isDe ? activeNode.titleDe : activeNode.titleZh}
              </h3>
            </div>
            <div className="text-xs font-mono text-[var(--ink-muted)]">
              {isDe
                ? `Stufe ${activeNode.stage} von 3 im Entscheidungsbaum`
                : `决策拓扑第 ${activeNode.stage} 阶段 (共3阶段)`}
            </div>
          </div>

          {/* AFB III 15 Notenpunkte 评定量表徽章 */}
          <div className="flex items-center gap-3 bg-[var(--paper)] border border-[var(--line)] px-3 py-2">
            <div className="text-right">
              <div className="text-[10px] font-mono text-[var(--ink-muted)] uppercase">
                {isDe ? "Abitur-Urteil (AFB III)" : "会考评判得分 (AFB III)"}
              </div>
              <div className="text-xs font-mono">
                {activeNode.npScore >= 14
                  ? (isDe ? "Sehr gut+ (1+)" : "顶尖水平 (1+)")
                  : activeNode.npScore >= 11
                  ? (isDe ? "Gut (2)" : "良好水准 (2)")
                  : activeNode.npScore >= 8
                  ? (isDe ? "Befriedigend (3)" : "中等基准 (3)")
                  : (isDe ? "Ausreichend / Defizitär" : "及格边缘 / 存在短板")}
              </div>
            </div>
            <div className="border-l border-[var(--line)] pl-3">
              <div className="text-2xl font-bold font-mono tracking-tight text-[var(--ink)]">
                {activeNode.npScore} <span className="text-xs font-normal">/ 15 NP</span>
              </div>
            </div>
          </div>
        </div>

        {/* 双重视野：短期直观效应 vs. 长期非预期外部性 (Kurzfristig vs. Nebenwirkung) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs font-mono">
          <div className="border border-[var(--line)] bg-[var(--paper)] p-3">
            <div className="flex items-center justify-between pb-1 mb-2 border-b border-[var(--line)]">
              <span className="font-bold text-[var(--ink)]">
                {isDe ? "1. KURZFRISTIGE PRIMÄRWIRKUNG" : "1. 短期直接效应 (Primärwirkung)"}
              </span>
              <span className="text-[10px] text-[var(--ink-muted)]">SOFORT</span>
            </div>
            <p className="leading-relaxed text-[var(--ink)]">
              {isDe ? activeNode.shortEffectDe : activeNode.shortEffectZh}
            </p>
          </div>

          <div className="border border-[var(--line)] bg-[var(--paper)] p-3">
            <div className="flex items-center justify-between pb-1 mb-2 border-b border-[var(--line)]">
              <span className="font-bold text-[var(--ink)]">
                {isDe ? "2. UNERWÜNSCHTE NEBENWIRKUNG" : "2. 长期未预期副作用与外部性 (Externalität)"}
              </span>
              <span className="text-[10px] text-[var(--ink-muted)]">LANGFRISTIG</span>
            </div>
            <p className="leading-relaxed text-[var(--ink)]">
              {isDe ? activeNode.sideEffectDe : activeNode.sideEffectZh}
            </p>
          </div>
        </div>

        {/* AFB III 二元论证准绳：事实判断 (Sachurteil) 与价值判断 (Werturteil) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs font-mono">
          <div className="border border-[var(--line)] bg-[var(--paper)] p-3">
            <div className="flex items-center justify-between pb-1 mb-2 border-b border-[var(--line)]">
              <span className="font-bold text-[var(--ink)]">
                {isDe ? "SACHURTEIL (EFFIZIENZ & WIRKSAMKEIT)" : "事实判断 (Sachurteil: 效率与效度)"}
              </span>
              <span className="text-[10px] text-[var(--ink-muted)]">KRITERIEN: ZIEL/MITTEL</span>
            </div>
            <p className="leading-relaxed text-[var(--ink)]">
              {isDe ? activeNode.sachurteilDe : activeNode.sachurteilZh}
            </p>
          </div>

          <div className="border border-[var(--line)] bg-[var(--paper)] p-3">
            <div className="flex items-center justify-between pb-1 mb-2 border-b border-[var(--line)]">
              <span className="font-bold text-[var(--ink)]">
                {isDe ? "WERTURTEIL (LEGITIMITÄT & GERECHTIGKEIT)" : "价值判断 (Werturteil: 正当性与伦理底线)"}
              </span>
              <span className="text-[10px] text-[var(--ink-muted)]">KRITERIEN: GRUNDRECHTE</span>
            </div>
            <p className="leading-relaxed text-[var(--ink)]">
              {isDe ? activeNode.werturteilDe : activeNode.werturteilZh}
            </p>
          </div>
        </div>

        {/* 会考论文级满分标准句式 (Abitur-Musterformulierung für die Klausur) */}
        <div className="border border-[var(--line)] bg-[var(--paper)] p-3 space-y-1.5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-bold text-[var(--ink)]">
              {isDe ? "ABITUR-KLAUSURSATZ (BEWERTUNG & BEURTEILUNG):" : "考场满分应试句型 (AFB III 评判题即插即用语料):"}
            </span>
            <span className="text-[10px] font-mono text-[var(--ink-muted)]">
              {isDe ? "OPERATOR: BEURTEILEN / BEWERTEN" : "指令动词: 综合评定"}
            </span>
          </div>
          <div className="p-2 border border-[var(--line)] bg-[var(--paper-subtle)] text-xs font-mono leading-relaxed select-all">
            {isDe ? activeNode.klausurSatzDe : activeNode.klausurSatzZh}
          </div>
        </div>
      </div>
    </div>
  );
};
