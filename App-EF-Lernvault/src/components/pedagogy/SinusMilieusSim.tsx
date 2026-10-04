// SinusMilieusSim — 德国当代 Sinus-Milieus 10大社会阶层群落全景互动沙盘
// 依据德国 Sinus-Institut 科学分类与北威州高级文理中学 (Gymnasium EF/Q1) SoWi 考纲标准设计
// 包含三大核心沉浸机制：
// 1. 🗺️ 交互式 10 大社群气泡地图 (Interaktive Milieu-Landschaft)：点击高亮、气泡缩放、横纵双轴透视
// 2. 👤 自由人画像漫游沙盒 (Persona-Builder & Soziale Mobilität)：布尔迪厄文化资本/经济资本与价值观穿越
// 3. 📝 北威州会考社会分层大题剖析 (Klausur-Analyse & Erwartungshorizont)：AFB II/III 答题支架与高分句式

import { useState, useMemo } from "react";
import type { Lang } from "../../i18n";

export interface SinusMilieusSimProps {
  lang?: Lang;
  studioMode?: boolean;
  onExportFinding?: (text: string) => void;
}

export interface MilieuItem {
  id: string;
  nameDE: string;
  nameZH: string;
  shortDE: string;
  shortZH: string;
  share: number; // 占德国总人口比例 %
  x: number; // 横坐标：价值取向 10 - 90 (Tradition -> Neuorientierung)
  y: number; // 纵坐标：社会经济地位 10 - 90 (Untere Lage -> Gehobene Lage, 注意SVG中0在顶部)
  radius: number;
  color: string;
  mottoDE: string;
  mottoZH: string;
  leitwertDE: string;
  leitwertZH: string;
  demografieDE: string;
  demografieZH: string;
  einkommenDE: string;
  einkommenZH: string;
  medienDE: string;
  medienZH: string;
  parteienDE: string;
  parteienZH: string;
  klausurFokusDE: string;
  klausurFokusZH: string;
}

export const SINUS_MILIEUS_DATA: MilieuItem[] = [
  {
    id: "konservativ-gehoben",
    nameDE: "Konservativ-Gehobenes Milieu",
    nameZH: "保守崇高精英阶层",
    shortDE: "KONS-GEH",
    shortZH: "传统精英",
    share: 11,
    x: 28,
    y: 22,
    radius: 38,
    color: "#475569",
    mottoDE: "Verantwortung, Pflichterfüllung und gehobene Lebenskultur.",
    mottoZH: "坚守责任操守、秩序感与经典的传统文化精英生活。",
    leitwertDE: "Klassische Bildungsbürger, Pflichtethik, Selbstdisziplin, Statussymbole mit Substanz.",
    leitwertZH: "传统有教养市民（Bildungsbürger）、恪守责任伦理与自律、推崇含蓄沉稳的高品质象征。",
    demografieDE: "Durchschnittsalter ~52 Jahre, hohe Bildungsabschlüsse (Abitur/Uni), leitende Positionen/Selbstständige.",
    demografieZH: "平均年龄约52岁，极高学历比例，多为企业高管、传统自由职业者与资深学术官员。",
    einkommenDE: "Haushaltsnetto > 5.500 € / Monat, hohes Sach- und Finanzvermögen.",
    einkommenZH: "家庭净月薪 > 5,500 欧元，丰厚的固定资产与不动产继承资本。",
    medienDE: "FAZ, SZ, Deutschlandfunk, klassisches Feuilleton, Qualitätsmedien.",
    medienZH: "《法兰克福汇报》、德国广播电台 DLF、古典音乐会与权威纸媒深度特稿。",
    parteienDE: "CDU/CSU, teilweise FDP; hohe Wahlbeteiligung (> 85%).",
    parteienZH: "基民盟/基社盟 (CDU/CSU)，部分自民党 (FDP)；投票率极高 (> 85%)。",
    klausurFokusDE: "Vererbung von sozialem und kulturellem Kapital nach Pierre Bourdieu (Habitus-Konzept).",
    klausurFokusZH: "布尔迪厄文化资本与社会资本的代际继承（家庭教养构成的隐形阶层壁垒）。"
  },
  {
    id: "postmateriell",
    nameDE: "Postmaterielles Milieu",
    nameZH: "后物质主义先锋阶层",
    shortDE: "POSTMAT",
    shortZH: "后物质派",
    share: 12,
    x: 48,
    y: 20,
    radius: 40,
    color: "#059669",
    mottoDE: "Selbstverwirklichung, Nachhaltigkeit und globale Gerechtigkeit.",
    mottoZH: "追求精神自足、生态向善与普世人权包容。",
    leitwertDE: "Souveränität, ökologische Transformation, Diversität, kritischer Konsum, Sinn vor Geld.",
    leitwertZH: "生命自主权、绿色生态转型、多元包容包容性，追求意义超越物质财富积累。",
    demografieDE: "Akademikerquote > 75%, hoher Anteil im Bildungs-, Kreativ- und Sozialsektor.",
    demografieZH: "高校文凭率超过 75%，重度分布于高校科研、文化传媒、国际NGO与绿色科技领域。",
    einkommenDE: "Gutes bis sehr gutes Einkommen (3.800 - 6.000 €), aber bewusster Konsumverzicht.",
    einkommenZH: "中高收入水平（3,800 - 6,000 欧），但主张低碳低熵与反炫耀性消费。",
    medienDE: "taz, DIE ZEIT, Podcasts, Öko-Test, Arte.",
    medienZH: "《时代周报》(DIE ZEIT)、Arte 欧洲文化电视台、独立播客与有机质检认证。",
    parteienDE: "Bündnis 90/Die Grünen (starke Stammwählerschaft), SPD.",
    parteienZH: "绿党（核心铁票仓），部分社民党 (SPD)。",
    klausurFokusDE: "Wertepluralisierung nach Inglehart: Übergang von materialistischen zu postmateriellen Werten.",
    klausurFokusZH: "英格尔哈特后物质主义价值观变迁：从生存安全需求向自我实现与生态伦理跃迁。"
  },
  {
    id: "performer",
    nameDE: "Performer-Milieu",
    nameZH: "高效能进取型精英",
    shortDE: "PERF",
    shortZH: "进取精英",
    share: 10,
    x: 75,
    y: 24,
    radius: 36,
    color: "#2563eb",
    mottoDE: "Effizienz, Selbstoptimierung und globaler Erfolg.",
    mottoZH: "极致效率、持续自我提升与全球化市场角逐。",
    leitwertDE: "Flexibilität, technologische Innovation, Leistungselite, unternehmerischer Spirit, Work-Hard-Play-Hard.",
    leitwertZH: "灵活敏捷、科技狂热、信奉优绩主义（Meritokratie）、强烈的创业冒险与自我管理精神。",
    demografieDE: "Jünger (30–45 Jahre), Top-Ausbildung (MINT/Business), global mobil.",
    demografieZH: "年轻力壮（30-45岁），精通商业与工程科学，高度跨国流动性与双语能力。",
    einkommenDE: "Sehr hohes Einkommen (> 6.000 € + Boni), performance-orientiert.",
    einkommenZH: "极高月薪（> 6,000 欧 + 股权激励），业绩挂钩型报酬。",
    medienDE: "Handelsblatt, The Economist, LinkedIn, Tech-Blogs, Bloomberg.",
    medienZH: "《商报》(Handelsblatt)、彭博商业周刊、LinkedIn 行业先锋资讯。",
    parteienDE: "FDP (Wirtschaftsliberalismus), pragmatische CDU-Wähler.",
    parteienZH: "自民党 (FDP，经济新自由主义偏好)，部分务实商业派基民盟。",
    klausurFokusDE: "Meritokratische Illusion: Michael Sandel zur Tyrannei des Erfolgs und sozialen Spaltung.",
    klausurFokusZH: "迈克尔·桑德尔对优绩主义神话的批判：将成功完全归功于个人努力而忽视制度运气。"
  },
  {
    id: "expeditive",
    nameDE: "Expeditives Milieu",
    nameZH: "先锋探索型青年",
    shortDE: "EXPED",
    shortZH: "先锋探索",
    share: 9,
    x: 82,
    y: 42,
    radius: 35,
    color: "#7c3aed",
    mottoDE: "Grenzen überwinden, Neues erproben und unkonventionell leben.",
    mottoZH: "打破常规框架、跨界尝试与拒绝被任何传统定义。",
    leitwertDE: "Digitale Nomaden, Experimentierfreude, Identitätsmobilität, Netzwerk-Kultur, Kreativität.",
    leitwertZH: "数字游民、永不停歇的实验心态、身份流动性、社群网络孵化与反科层体制制约。",
    demografieDE: "Unter 35 Jahre, urbane Metropolen, freie Kreativwirtschaft, Startups.",
    demografieZH: "平均年龄30岁以下，聚集于柏林、科隆等大都会，自由设计、独立开发者与初创孵化器。",
    einkommenDE: "Volatil (schwankend), von prekär bis sehr erfolgreich (2.000 - 5.000 €).",
    einkommenZH: "收入高度波动，从创业前期的自力更生到项目爆火的超高收益。",
    medienDE: "Instagram, YouTube, Discord, globale Tech-Channels, Substack.",
    medienZH: "流媒体、小众数字论坛、Substack 深度专栏与前沿开源社区。",
    parteienDE: "Volt, Die Grünen, Piraten; geringe Bindung an traditionelle Großparteien.",
    parteienZH: "Volt 欧洲泛欧党、绿党青年先锋，极少依附于传统大党派。",
    klausurFokusDE: "Entstrukturierte Lebensläufe und Risikogesellschaft nach Ulrich Beck (Bastelbiografie).",
    klausurFokusZH: "乌尔里希·贝克风险社会理论：从标准确定的人生轨迹走向个体自我拼贴的‘拼贴传记’。"
  },
  {
    id: "neo-oekologisch",
    nameDE: "Neo-Ökologisches Milieu",
    nameZH: "新生态乐活先锋",
    shortDE: "NEO-ÖKO",
    shortZH: "新生态派",
    share: 8,
    x: 62,
    y: 35,
    radius: 34,
    color: "#10b981",
    mottoDE: "Nachhaltigkeit als Lifestyle und Innovationstreiber.",
    mottoZH: "将生态可持续转化为高品质生活方式与绿色创新引擎。",
    leitwertDE: "Circular Economy, Clean Tech, Gesundheit, Pragmatischer Umweltschutz ohne Verzichtsmoral.",
    leitwertZH: "循环经济、洁净科技、身心健康，反对禁欲主义、倡导智慧科技向善与生态红利。",
    demografieDE: "Mitte 30 bis 50 Jahre, junge Familien in Vororten und Öko-Vierteln.",
    demografieZH: "30-50岁年轻高知家庭，热衷于低碳智慧社区与绿色生态示范街区。",
    einkommenDE: "Gehoben (4.000 - 5.500 €), hohe Bereitschaft für grüne Produkte zu zahlen.",
    einkommenZH: "高收入（4,000 - 5,500 欧），极高的绿色溢价支付意愿与光伏新能源投资。",
    medienDE: "Podcasts über Zukunftstechnologien, Wired, Green-Tech Magazine.",
    medienZH: "前沿科技播客、环保建筑与可持续商业智库报告。",
    parteienDE: "Bündnis 90/Die Grünen, progressive Reallos, Volt.",
    parteienZH: "绿党务实派、进步自由主义力量。",
    klausurFokusDE: "Ökologische Modernisierung vs. Postwachstum (Degrowth-Debatte im SoWi-Abitur).",
    klausurFokusZH: "生态现代化理论与去增长（Postwachstum）的北威州宏观经济学争鸣。"
  },
  {
    id: "adaptiv-pragmatisch",
    nameDE: "Adaptiv-Pragmatische Mitte",
    nameZH: "适应性务实中间派",
    shortDE: "ADAPT-MITTE",
    shortZH: "务实中产",
    share: 12,
    x: 60,
    y: 54,
    radius: 41,
    color: "#0284c7",
    mottoDE: "Flexibel anpassen, Aufstieg sichern und modern leben.",
    mottoZH: "灵活适应时代变革、守住晋升通道与追求舒适生活。",
    leitwertDE: "Pragmatismus, Nutzenorientierung, Work-Life-Balance, beruflicher Ehrgeiz ohne Fanatismus.",
    leitwertZH: "务实主义、功能效用优先、讲求工作生活平衡，注重职业进取但不做无意义牺牲。",
    demografieDE: "Junge qualifizierte Fachkräfte, Techniker, Angestellte, Realschul-/FH-Abschlüsse.",
    demografieZH: "年轻骨干专业技能人才、技术员、中级工程师、应用技术大学及双元制优秀毕业生。",
    einkommenDE: "Solides Medianeinkommen (2.800 - 4.200 €).",
    einkommenZH: "扎实的中间收入中位数（2,800 - 4,200 欧）。",
    medienDE: "Online-Portale (Spiegel, n-tv), Spotify, YouTube, Tech-Lifestyle.",
    medienZH: "主流网络即时资讯、流媒体、生活技巧与职业技能提升频道。",
    parteienDE: "SPD, CDU, Grüne, FDP (hohe Wechselwählerquote nach aktuellen Themen).",
    parteienZH: "高度流动摇摆选民，根据当前经济社会热点在联盟党、社民党间灵活选择。",
    klausurFokusDE: "Flexibilisierung der Arbeitswelt (Arbeit 4.0) und soziale Absicherung.",
    klausurFokusZH: "德国工业4.0背景下工作方式的灵活性与社会保障兜底机制的动态适配。"
  },
  {
    id: "buergerliche-mitte",
    nameDE: "Bürgerliche Mitte",
    nameZH: "传统市民阶层中坚",
    shortDE: "BÜRG-MITTE",
    shortZH: "市民中坚",
    share: 13,
    x: 35,
    y: 56,
    radius: 44,
    color: "#d97706",
    mottoDE: "Ordnung, Sicherheit und Erhalt des Erreichten.",
    mottoZH: "珍视社会秩序与安全、巩固既有生活水准与安居乐业。",
    leitwertDE: "Harmoniebedürfnis, Heimatverbundenheit, bürgerliche Tugenden, Angst vor sozialem Abstieg.",
    leitwertZH: "渴望社会和谐稳定、本土归属感、传统公德秩序，心底深处对阶层滑落存在焦虑警惕。",
    demografieDE: "Familien im ländlichen/kleinstädtischen Raum, Eigenheimbesitzer, solide Angestellte.",
    demografieZH: "多为中小城镇与郊区定居家庭、拥有自有产权住房的资深蓝领技师与普通公务员。",
    einkommenDE: "Mittleres Einkommen (2.600 - 3.800 €), getrieben von steigenden Energiekosten.",
    einkommenZH: "中等净收入（2,600 - 3,800 欧），对物价通胀与能源账单高度敏感。",
    medienDE: "Regionalzeitungen, WDR/ZDF, BILD (teilweise), RTL.",
    medienZH: "当地地方报纸、公共电视台 WDR/ZDF 新闻、晚间黄金档新闻节目。",
    parteienDE: "CDU/CSU, SPD (historisch); wachsende Frustration über Regierungschaos.",
    parteienZH: "基民盟/社民党两大传统大众党派（Volksparteien）的核心土壤。",
    klausurFokusDE: "Gefahr der Spaltung der Gesellschaft und Statusängste der Mittelschicht (Heinz Bude).",
    klausurFokusZH: "海因茨·布德（Heinz Bude）著名的‘焦虑社会’：中产阶层地位恐慌与抗风险能力衰减。"
  },
  {
    id: "traditionell",
    nameDE: "Traditionelles Milieu",
    nameZH: "传统本色守旧阶层",
    shortDE: "TRAD",
    shortZH: "传统本色",
    share: 11,
    x: 18,
    y: 72,
    radius: 39,
    color: "#9ca3af",
    mottoDE: "Sparsamkeit, Pflichtbewusstsein und Festhalten an Bewährtem.",
    mottoZH: "勤劳克俭、本分尽责与维系经受时间考验的传统生活规矩。",
    leitwertDE: "Bescheidenheit, Traditionelle Familie, Kirche/Vereine, Skepsis gegenüber Modernismus.",
    leitwertZH: "谦逊节俭、传统伦理、教会与地方协会互助，对激进的社会多元化潮流抱有审慎怀疑。",
    demografieDE: "Überwiegend Rentner/Senioren (Durchschnittsalter 68+ Jahre), ländlich geprägt.",
    demografieZH: "以退休长者与老年群体为主（平均年龄 68 岁以上），在乡村教区有深厚根基。",
    einkommenDE: "Geringe bis mittlere Renten (1.400 - 2.400 €), sparsame Lebensführung.",
    einkommenZH: "依靠养老法定退休金（1,400 - 2,400 欧），生活极度精打细算、鲜有负债。",
    medienDE: "Öffentlich-rechtliches Fernsehen (ARD/ZDF), Lokalzeitung, Apotheken-Umschau.",
    medienZH: "德国一台/二台电视广播、本地早报、社区读物。",
    parteienDE: "Stammwähler der CDU/CSU, treue Alt-SPDler.",
    parteienZH: "联盟党老牌基本盘，部分传统工运背景社民党老党员。",
    klausurFokusDE: "Demografischer Wandel und Nachhaltigkeit der Gesetzlichen Rentenversicherung (GRV).",
    klausurFokusZH: "老龄化危机与德国第一支柱法定养老金转嫁转移机制（Generationenvertrag）的可持续性。"
  },
  {
    id: "konsum-hedonistisch",
    nameDE: "Konsum-Hedonistisches Milieu",
    nameZH: "消费享乐与潮流青年",
    shortDE: "KONS-HED",
    shortZH: "潮流享乐",
    share: 8,
    x: 78,
    y: 70,
    radius: 34,
    color: "#e11d48",
    mottoDE: "Spaß im Hier und Jetzt, Lifestyle und Konsumerlebnis.",
    mottoZH: "活在当下、追求感官愉悦、追逐潮流品牌与流行文化。",
    leitwertDE: "Fun-Kultur, Freizeit-Fokus, Konsum als Selbstbestätigung, Ausbruch aus Alltagsmonotonie.",
    leitwertZH: "享乐至上、娱乐至死、用消费品牌寻找认同，极力逃离沉闷枯燥的科层制度约束。",
    demografieDE: "Jüngere Zielgruppe (unter 30), Schüler, Azubis, un- und angelernte Beschäftigte.",
    demografieZH: "年轻族群（多在30岁以下），职业中专生、学徒工、初级体力服务业人员。",
    einkommenDE: "Gering bis durchschnittlich (1.500 - 2.500 €), Neigung zu Ratenkrediten (Klarna).",
    einkommenZH: "薪资水平不高，但消费倾向极强，极易出现分期超前透支（Klarna 账单现象）。",
    medienDE: "TikTok, Gaming (Twitch), Reality-TV, Instagram, Influencer-Marketing.",
    medienZH: "短视频平台、游戏直播、网红带货生态圈。",
    parteienDE: "Geringe Wahlbeteiligung; Protestwähler oder themenunabhängig desinteressiert.",
    parteienZH: "投票参与度极低，容易被通俗民粹口号吸引或彻底放弃政治表达。",
    klausurFokusDE: "Konsumgesellschaft, Überschuldung junger Menschen und Marktmanipulation.",
    klausurFokusZH: "消费社会异化、算法精准营销诱导与青少年结构性债务危机。"
  },
  {
    id: "prekaer",
    nameDE: "Prekäres Milieu",
    nameZH: "边缘弱势困境阶层",
    shortDE: "PREK",
    shortZH: "弱势边缘",
    share: 9,
    x: 32,
    y: 84,
    radius: 37,
    color: "#b91c1c",
    mottoDE: "Kampf ums Durchkommen, Ausgrenzungserfahrung und Sehnsucht nach Anschluss.",
    mottoZH: "每日为生计奔波抗争、深感被主流抛弃与强烈的尊严认可渴望。",
    leitwertDE: "Überlebenskampf, Verbitterung, Resignation, Misstrauen in gesellschaftliche Eliten.",
    leitwertZH: "底层谋生抗争、被剥夺感与对精英政客及主流媒体的深层不信任与幻灭。",
    demografieDE: "Hauptschulabschluss/ohne Abschluss, Langzeitarbeitslose, prekäre Minijobber, Alleinerziehende.",
    demografieZH: "多为基础中学（Hauptschule）学历或辍学、单亲家庭、低薪小时工及临时派遣雇工。",
    einkommenDE: "Unter der Armutsgefährdungsgrenze (< 1.250 € Haushaltsnettoäquivalent, Bürgergeld).",
    einkommenZH: "显著低于全德贫困预警线（< 1,250 欧，重度依赖公民金 Bürgergeld 转移支付救济）。",
    medienDE: "Boulevard-Medien, Privatfernsehen, Social-Media-Echokammern.",
    medienZH: "八卦小报、小道消息自媒体与信息茧房。",
    parteienDE: "Extrem niedrige Wahlbeteiligung; wenn gewählt wird: überproportional AfD oder BSW.",
    parteienZH: "政治弃权率极高；一旦参与投票，高度集中倒向抗议型极化政党（AfD / BSW）。",
    klausurFokusDE: "Armutsberichterstattung, Chancengleichheit im Bildungssystem (Kopplung von Herkunft & Erfolg).",
    klausurFokusZH: "贫困与社会排斥；德国教育体制对家庭背景的强绑定（OECD PISA 报告核心议题）。"
  }
];

export function SinusMilieusSim({ lang = "de", onExportFinding }: SinusMilieusSimProps) {
  const isDe = lang === "de";
  const [selectedMilieuId, setSelectedMilieuId] = useState<string>("buergerliche-mitte");

  // Persona-Builder State
  const [personaLage, setPersonaLage] = useState<number>(50); // 0 (unten) bis 100 (oben)
  const [personaWerte, setPersonaWerte] = useState<number>(50); // 0 (tradition) bis 100 (neuorientierung)
  const [activeTab, setActiveTab] = useState<"map" | "persona" | "klausur">("map");

  const selectedMilieu = useMemo(() => {
    return SINUS_MILIEUS_DATA.find((m) => m.id === selectedMilieuId) ?? SINUS_MILIEUS_DATA[0];
  }, [selectedMilieuId]);

  // 根据当前虚拟人物的 (Werte, Lage) 计算其在 SVG 坐标中的落点并匹配最邻近社群
  const personaCalculated = useMemo(() => {
    // X: 10 + Werte * 0.8 (10 bis 90)
    const px = 10 + personaWerte * 0.8;
    // Y: 90 - Lage * 0.75 (15 bis 90, 顶部为高地位)
    const py = 90 - personaLage * 0.75;

    // 寻找最近的 Milieu
    let bestDist = Infinity;
    let matchedMilieu = SINUS_MILIEUS_DATA[0];

    for (const m of SINUS_MILIEUS_DATA) {
      const dx = m.x - px;
      const dy = m.y - py;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < bestDist) {
        bestDist = dist;
        matchedMilieu = m;
      }
    }

    return {
      svgX: px * 6,
      svgY: py * 3.8,
      matched: matchedMilieu
    };
  }, [personaLage, personaWerte]);

  const handleExport = () => {
    const text = isDe
      ? `Sinus-Milieus Analyse: ${selectedMilieu.nameDE} (Anteil: ${selectedMilieu.share}%)\nLeitwerte: ${selectedMilieu.leitwertDE}\nSoziale Lage & Einkommen: ${selectedMilieu.einkommenDE}\nKlausurrelevanz: ${selectedMilieu.klausurFokusDE}`
      : `德国 Sinus-Milieus 社会阶层矩阵深度诊断：【${selectedMilieu.nameZH}】（人口占比：${selectedMilieu.share}%）\n核心价值观：${selectedMilieu.leitwertZH}\n经济与阶层地位：${selectedMilieu.einkommenZH}\n北威州会考采分要点：${selectedMilieu.klausurFokusZH}`;

    if (onExportFinding) {
      onExportFinding(text);
    } else {
      navigator.clipboard.writeText(text);
      alert(isDe ? "In die Zwischenablage kopiert!" : "已复制到剪贴板！");
    }
  };

  return (
    <div className="w-full flex flex-col gap-5 p-4 sm:p-6 bg-[var(--paper)] rounded-xl border border-[var(--line)] shadow-xs font-sans text-[var(--ink)]">
      {/* 顶部标题栏与模式切换 */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--line)] pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 text-xs font-bold font-mono rounded bg-[var(--paper-subtle)] text-[var(--ink)] border border-[var(--line)]">
              SoWi EF / Q1 · Soziale Ungleichheit
            </span>
            <span className="text-xs font-mono text-[var(--gray)]">Modell: Sinus-Institut (Bonn/Heidelberg)</span>
          </div>
          <h2 className="text-lg sm:text-xl font-bold tracking-tight mt-1 text-[var(--ink)]">
            {isDe ? "Die Sinus-Milieus® in Deutschland" : "德国当代 Sinus-Milieus® 社会阶层群落全景沙盘"}
          </h2>
        </div>

        {/* 模式切换 Tab */}
        <div className="flex items-center gap-1 p-1 bg-[var(--paper-subtle)] rounded-lg border border-[var(--line)] text-xs font-medium">
          <button
            type="button"
            onClick={() => setActiveTab("map")}
            className={`px-3 py-1.5 rounded-md transition-all ${
              activeTab === "map"
                ? "bg-[var(--paper)] text-[var(--accent)] shadow-xs font-semibold"
                : "text-[var(--gray)] hover:text-[var(--ink)]"
            }`}
          >
            {isDe ? "🗺️ Milieu-Landschaft" : "🗺️ 10大群落地图"}
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("persona")}
            className={`px-3 py-1.5 rounded-md transition-all ${
              activeTab === "persona"
                ? "bg-[var(--paper)] text-[var(--accent)] shadow-xs font-semibold"
                : "text-[var(--gray)] hover:text-[var(--ink)]"
            }`}
          >
            {isDe ? "👤 Persona-Explorer" : "👤 自由人画像漫游"}
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("klausur")}
            className={`px-3 py-1.5 rounded-md transition-all ${
              activeTab === "klausur"
                ? "bg-[var(--paper)] text-[var(--accent)] shadow-xs font-semibold"
                : "text-[var(--gray)] hover:text-[var(--ink)]"
            }`}
          >
            {isDe ? "📝 Klausur-EHZ (15 Pkt)" : "📝 会考题解与采分"}
          </button>
        </div>
      </div>

      {/* 模式 1：交互式 10 大社群气泡地图 */}
      {activeTab === "map" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
          {/* 左侧：专业 SVG 二维气泡矩阵 */}
          <div className="lg:col-span-7 flex flex-col gap-2 bg-[var(--paper-subtle)]/40 p-4 rounded-xl border border-[var(--line)]">
            <div className="flex items-center justify-between text-xs text-[var(--gray)] font-mono">
              <span>▲ Oberschicht / Höhere soziale Lage (上层地位)</span>
              <span>Anteil: 100% der dt. Bevölkerung</span>
            </div>

            <div className="relative w-full aspect-4/3 rounded-lg overflow-hidden border border-[var(--line)]/70 bg-gradient-to-b from-slate-500/5 via-transparent to-amber-500/5">
              <svg className="w-full h-full" viewBox="0 0 600 400">
                {/* 网格参考线 */}
                <line x1="200" y1="20" x2="200" y2="380" stroke="var(--line)" strokeDasharray="3,3" strokeOpacity="0.6" />
                <line x1="400" y1="20" x2="400" y2="380" stroke="var(--line)" strokeDasharray="3,3" strokeOpacity="0.6" />
                <line x1="20" y1="130" x2="580" y2="130" stroke="var(--line)" strokeDasharray="3,3" strokeOpacity="0.6" />
                <line x1="20" y1="260" x2="580" y2="260" stroke="var(--line)" strokeDasharray="3,3" strokeOpacity="0.6" />

                {/* 区域背景标示文字 */}
                <text x="35" y="32" fontSize="10.5" fill="var(--ink)" fillOpacity="0.8" fontWeight="bold" fontFamily="monospace">
                  Tradition (传统保留)
                </text>
                <text x="240" y="32" fontSize="10.5" fill="var(--ink)" fillOpacity="0.8" fontWeight="bold" fontFamily="monospace">
                  Modernisierung (现代自主)
                </text>
                <text x="440" y="32" fontSize="10.5" fill="var(--ink)" fillOpacity="0.8" fontWeight="bold" fontFamily="monospace">
                  Neuorientierung (多元探索)
                </text>

                {/* 绘制 10 大社群气泡 */}
                {SINUS_MILIEUS_DATA.map((m) => {
                  const isSelected = m.id === selectedMilieuId;
                  const cx = (m.x / 100) * 600;
                  const cy = (m.y / 100) * 400;

                  return (
                    <g
                      key={m.id}
                      onClick={() => setSelectedMilieuId(m.id)}
                      className="cursor-pointer transition-transform duration-200 hover:scale-105"
                      style={{
                        transformOrigin: `${cx}px ${cy}px`,
                        transformBox: "view-box",
                      }}
                    >
                      {/* 选中高亮晕环 */}
                      {isSelected && (
                        <circle
                          cx={cx}
                          cy={cy}
                          r={m.radius + 6}
                          fill="none"
                          stroke={m.color}
                          strokeWidth="2.5"
                          strokeDasharray="4,4"
                          className="animate-pulse"
                        />
                      )}

                      {/* 真实气泡 */}
                      <circle
                        cx={cx}
                        cy={cy}
                        r={m.radius}
                        fill={m.color}
                        fillOpacity={isSelected ? 0.90 : 0.65}
                        stroke={m.color}
                        strokeWidth={isSelected ? 3 : 1.5}
                      />

                      {/* 缩写与占比文字 - 强化投影确保任何背景底色上 100% 高对比清晰 */}
                      <text
                        x={cx}
                        y={cy - 4}
                        textAnchor="middle"
                        fontSize={m.radius > 36 ? "10.5" : "9.5"}
                        fontWeight="bold"
                        fill="#ffffff"
                        style={{ filter: "drop-shadow(0 1px 2px rgba(0, 0, 0, 0.85))" }}
                        pointerEvents="none"
                      >
                        {isDe ? m.shortDE : m.shortZH}
                      </text>
                      <text
                        x={cx}
                        y={cy + 10}
                        textAnchor="middle"
                        fontSize="9.5"
                        fontWeight="600"
                        fill="#ffffff"
                        style={{ filter: "drop-shadow(0 1px 2px rgba(0, 0, 0, 0.85))" }}
                        fontFamily="monospace"
                        pointerEvents="none"
                      >
                        {m.share}%
                      </text>
                    </g>
                  );
                })}
              </svg>

              {/* 轴线说明 */}
              <div className="absolute bottom-1 inset-x-2 flex justify-between text-[10px] text-[var(--gray)] font-mono">
                <span>◀ Festhalten / Tradition</span>
                <span>Grundorientierung (Wertewandel nach Inglehart) ▶</span>
                <span>Transformation / Autonomie ▶</span>
              </div>
            </div>

            <div className="flex items-center justify-between text-[11px] text-[var(--gray)] pt-1">
              <span>💡 提示：点击任意阶层气泡，右侧即可深入剖析该群落画像与会考考点。</span>
              <button
                type="button"
                onClick={handleExport}
                className="px-2.5 py-1 text-xs font-medium rounded border border-[var(--line)] bg-[var(--paper)] hover:border-[var(--accent)] transition-colors"
              >
                {isDe ? "📥 Analyse exportieren" : "📥 导出学术诊断"}
              </button>
            </div>
          </div>

          {/* 右侧：所选社群的 360° 学术显微镜 */}
          <div className="lg:col-span-5 flex flex-col gap-3 p-4 bg-[var(--paper)] rounded-xl border border-[var(--line)] shadow-xs">
            <div className="flex items-start justify-between gap-2 border-b border-[var(--line)] pb-3">
              <div>
                <span
                  className="inline-block px-2 py-0.5 text-xs font-bold rounded text-white"
                  style={{ backgroundColor: selectedMilieu.color }}
                >
                  {isDe ? selectedMilieu.shortDE : selectedMilieu.shortZH} · {selectedMilieu.share}% Bevölkerungsanteil
                </span>
                <h3 className="text-base font-bold mt-1.5 text-[var(--ink)]">
                  {isDe ? selectedMilieu.nameDE : selectedMilieu.nameZH}
                </h3>
              </div>
            </div>

            {/* 核心生活格言 */}
            <div className="p-3 rounded-lg bg-[var(--paper-subtle)] border-l-4 border-l-[var(--ink)] text-xs italic text-[var(--ink)] font-serif leading-relaxed">
              "{isDe ? selectedMilieu.mottoDE : selectedMilieu.mottoZH}"
            </div>

            {/* 四维结构化画像卡片 */}
            <div className="space-y-2.5 text-xs">
              <div className="p-3 rounded-lg bg-[var(--paper-subtle)] border border-[var(--line)]">
                <span className="font-bold text-[var(--ink)] block mb-1">
                  {isDe ? "🎯 Leitwerte & Lebensgefühl:" : "🎯 核心价值观与生活态度："}
                </span>
                <p className="text-[var(--ink)] leading-relaxed">
                  {isDe ? selectedMilieu.leitwertDE : selectedMilieu.leitwertZH}
                </p>
              </div>

              <div className="p-3 rounded-lg bg-[var(--paper-subtle)] border border-[var(--line)]">
                <span className="font-bold text-[var(--ink)] block mb-1">
                  {isDe ? "💼 Sozioökonomischer Status & Einkommen:" : "💼 职业阶层地位与收入水准："}
                </span>
                <p className="text-[var(--ink)] leading-relaxed">
                  {isDe ? selectedMilieu.einkommenDE : selectedMilieu.einkommenZH}
                </p>
                <p className="text-[11px] text-[var(--gray)] mt-1 font-mono">
                  {isDe ? selectedMilieu.demografieDE : selectedMilieu.demografieZH}
                </p>
              </div>

              <div className="p-3 rounded-lg bg-[var(--paper-subtle)] border border-[var(--line)]">
                <span className="font-bold text-[var(--ink)] block mb-1">
                  {isDe ? "🗳️ Mediennutzung & Wahlverhalten:" : "🗳️ 媒体消费习惯与政党投票流向："}
                </span>
                <p className="text-[var(--ink)] leading-relaxed">
                  {isDe ? selectedMilieu.parteienDE : selectedMilieu.parteienZH}
                </p>
                <p className="text-[11px] text-[var(--gray)] mt-1 font-mono">
                  {isDe ? `Medien: ${selectedMilieu.medienDE}` : `信息渠道：${selectedMilieu.medienZH}`}
                </p>
              </div>

              <div className="p-3 rounded-lg bg-[var(--paper-subtle)] border-l-4 border-l-[var(--ink)] border border-[var(--line)] text-xs text-[var(--ink)]">
                <span className="font-bold text-[var(--ink)] block mb-1">
                  {isDe ? "🏛️ Klausur-Schwerpunkt (NRW):" : "🏛️ 北威州会考采分高频考点："}
                </span>
                <p className="leading-relaxed text-[var(--ink)]/90">
                  {isDe ? selectedMilieu.klausurFokusDE : selectedMilieu.klausurFokusZH}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 模式 2：自由人画像漫游沙盒 (Persona-Builder & 2D SVG 空间定格) */}
      {activeTab === "persona" && (
        <div className="flex flex-col gap-5">
          {/* 模式导引栏 */}
          <div className="p-4 bg-[var(--paper-subtle)] rounded-xl border border-[var(--line)] text-xs text-[var(--ink)] leading-relaxed">
            <h4 className="font-bold text-sm mb-1 text-[var(--ink)] flex items-center gap-2">
              <span className="font-mono text-base">🔬</span>
              <span>{isDe ? "Interaktives Mobilitäts-Labor: Wo landen Sie in der Gesellschaft?" : "阶层跃迁实验室：拖动资本与价值观，观察您在德国社会空间中的动态落位"}</span>
            </h4>
            <p className="text-[var(--gray)]">
              {isDe
                ? "Das Sinus-Modell überwindet starre Einkommensgrenzen. Durch die Kombination aus Sozialer Lage (Bildung, Einkommen, Beruf) und individueller Grundorientierung (Tradition, Modernisierung, Neuorientierung) entsteht die exakte soziokulturelle Verortung."
                : "德国社会学不仅考察‘您赚多少钱’，更考察‘您的生活品味与价值观’。拖动右侧两项核心杠杆，或点击预设社会画像，观察个体如何在布尔迪厄的社会空间中移动，以及阶层固化天花板的张力。"}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
            {/* 左侧 (7 列)：全景 2D SVG 动态矩阵与画像定位 */}
            <div className="lg:col-span-7 flex flex-col gap-3 bg-[var(--paper-subtle)]/40 p-4 rounded-xl border border-[var(--line)]">
              <div className="flex items-center justify-between text-xs text-[var(--gray)] font-mono">
                <span className="font-bold text-[var(--ink)]">▲ Oberschicht / Höhere soziale Lage (上层地位)</span>
                <span>
                  {isDe ? "Aktuelle Position:" : "当前动态定格："} <strong className="text-[var(--ink)] font-mono font-bold">({personaWerte}%, {personaLage}%)</strong>
                </span>
              </div>

              {/* 2D 互动画布 */}
              <div className="relative w-full aspect-4/3 rounded-lg overflow-hidden border border-[var(--line)] bg-[var(--paper)] shadow-inner">
                <svg className="w-full h-full" viewBox="0 0 600 400">
                  {/* 网格参考线 */}
                  <line x1="200" y1="20" x2="200" y2="380" stroke="var(--line)" strokeDasharray="3,3" strokeOpacity="0.6" />
                  <line x1="400" y1="20" x2="400" y2="380" stroke="var(--line)" strokeDasharray="3,3" strokeOpacity="0.6" />
                  <line x1="20" y1="130" x2="580" y2="130" stroke="var(--line)" strokeDasharray="3,3" strokeOpacity="0.6" />
                  <line x1="20" y1="260" x2="580" y2="260" stroke="var(--line)" strokeDasharray="3,3" strokeOpacity="0.6" />

                  {/* 阶层跃迁天花板指示线 (Gläserne Decke) */}
                  <line x1="20" y1="110" x2="580" y2="110" stroke="var(--ink)" strokeDasharray="6,4" strokeWidth="1" strokeOpacity="0.25" />
                  <text x="25" y="105" fontSize="8.5" fill="var(--ink)" fillOpacity="0.6" fontStyle="italic" fontFamily="monospace">
                    ⚠️ {isDe ? "Gläserne Decke (Habitus-Aufstiegsbarriere nach Bourdieu)" : "阶层跃迁隐形天花板 (Gläserne Decke)"}
                  </text>

                  {/* 象限背景标示文字 */}
                  <text x="35" y="32" fontSize="10.5" fill="var(--ink)" fillOpacity="0.8" fontWeight="bold" fontFamily="monospace">
                    Tradition (传统保留)
                  </text>
                  <text x="240" y="32" fontSize="10.5" fill="var(--ink)" fillOpacity="0.8" fontWeight="bold" fontFamily="monospace">
                    Modernisierung (现代自主)
                  </text>
                  <text x="440" y="32" fontSize="10.5" fill="var(--ink)" fillOpacity="0.8" fontWeight="bold" fontFamily="monospace">
                    Neuorientierung (多元探索)
                  </text>

                  {/* 绘制 10 大社群气泡 */}
                  {SINUS_MILIEUS_DATA.map((m) => {
                    const isMatched = m.id === personaCalculated.matched.id;
                    const cx = (m.x / 100) * 600;
                    const cy = (m.y / 100) * 400;

                    return (
                      <g
                        key={m.id}
                        className="transition-transform duration-200"
                        style={{
                          transformOrigin: `${cx}px ${cy}px`,
                          transformBox: "view-box",
                        }}
                      >
                        {/* 匹配高亮脉冲环 */}
                        {isMatched && (
                          <circle
                            cx={cx}
                            cy={cy}
                            r={m.radius + 6}
                            fill="none"
                            stroke="var(--ink)"
                            strokeWidth="2.5"
                            strokeDasharray="4,4"
                            className="animate-pulse"
                          />
                        )}

                        {/* 气泡本体 */}
                        <circle
                          cx={cx}
                          cy={cy}
                          r={m.radius}
                          fill={m.color}
                          fillOpacity={isMatched ? 0.9 : 0.4}
                          stroke={isMatched ? "var(--ink)" : "var(--paper)"}
                          strokeWidth={isMatched ? 2.5 : 1.5}
                          className="transition-all duration-300"
                        />

                        {/* 社群名称 */}
                        <text
                          x={cx}
                          y={cy - 4}
                          textAnchor="middle"
                          fontSize="10"
                          fontWeight="bold"
                          fill="#ffffff"
                          style={{ filter: "drop-shadow(0 1px 2px rgba(0, 0, 0, 0.85))" }}
                          pointerEvents="none"
                        >
                          {isDe ? m.shortDE : m.shortZH}
                        </text>

                        {/* 人口占比 */}
                        <text
                          x={cx}
                          y={cy + 10}
                          textAnchor="middle"
                          fontSize="9"
                          fill="#ffffff"
                          fontWeight="bold"
                          style={{ filter: "drop-shadow(0 1px 2px rgba(0, 0, 0, 0.85))" }}
                          pointerEvents="none"
                          fontFamily="monospace"
                        >
                          {m.share}%
                        </text>
                      </g>
                    );
                  })}

                  {/* 动态 Persona 十字投影引导线 */}
                  <line
                    x1="20"
                    y1={personaCalculated.svgY}
                    x2={personaCalculated.svgX}
                    y2={personaCalculated.svgY}
                    stroke="var(--ink)"
                    strokeDasharray="3,3"
                    strokeWidth="1.5"
                    strokeOpacity="0.5"
                  />
                  <line
                    x1={personaCalculated.svgX}
                    y1="380"
                    x2={personaCalculated.svgX}
                    y2={personaCalculated.svgY}
                    stroke="var(--ink)"
                    strokeDasharray="3,3"
                    strokeWidth="1.5"
                    strokeOpacity="0.5"
                  />

                  {/* 动态 Persona 动态定位指针 (Avatar Pin) */}
                  <circle
                    cx={personaCalculated.svgX}
                    cy={personaCalculated.svgY}
                    r="22"
                    fill="none"
                    stroke="var(--ink)"
                    strokeWidth="1.5"
                    className="animate-ping"
                    opacity="0.4"
                  />
                  <circle
                    cx={personaCalculated.svgX}
                    cy={personaCalculated.svgY}
                    r="13"
                    fill="var(--ink)"
                    fillOpacity="0.15"
                    stroke="var(--ink)"
                    strokeWidth="1.5"
                  />
                  <circle
                    cx={personaCalculated.svgX}
                    cy={personaCalculated.svgY}
                    r="6.5"
                    fill="var(--ink)"
                    stroke="var(--paper)"
                    strokeWidth="2"
                  />

                  {/* 悬浮坐标标签 */}
                  <g
                    transform={`translate(${Math.min(480, Math.max(80, personaCalculated.svgX))}, ${
                      personaCalculated.svgY > 60 ? personaCalculated.svgY - 20 : personaCalculated.svgY + 28
                    })`}
                  >
                    <rect
                      x="-65"
                      y="-11"
                      width="130"
                      height="22"
                      rx="11"
                      fill="var(--ink)"
                      stroke="var(--paper)"
                      strokeWidth="1"
                    />
                    <text
                      textAnchor="middle"
                      y="4"
                      fontSize="9.5"
                      fill="var(--paper)"
                      fontWeight="bold"
                      fontFamily="monospace"
                    >
                      📍 {isDe ? "Sie" : "当前漫游"}: ({personaWerte}%, {personaLage}%)
                    </text>
                  </g>
                </svg>
              </div>

              {/* 快速预设角色：一键阶层漫游 */}
              <div className="pt-2 border-t border-[var(--line)]">
                <span className="text-[11px] font-mono text-[var(--gray)] block mb-2">
                  {isDe ? "⚡ Archetypische Schnell-Verortung (1-Klick-Szenarien):" : "⚡ 典型德国社会画像一键跃迁预设："}
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-1.5 text-xs">
                  <button
                    type="button"
                    onClick={() => {
                      setPersonaLage(85);
                      setPersonaWerte(72);
                    }}
                    className="p-1.5 rounded border border-[var(--line)] bg-[var(--paper)] hover:bg-[var(--paper-subtle)] text-center transition-colors"
                  >
                    <span className="block font-bold text-[var(--ink)]">🎓 {isDe ? "Akademiker" : "学术世家"}</span>
                    <span className="text-[10px] text-[var(--gray)] font-mono">85% / 72%</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setPersonaLage(90);
                      setPersonaWerte(95);
                    }}
                    className="p-1.5 rounded border border-[var(--line)] bg-[var(--paper)] hover:bg-[var(--paper-subtle)] text-center transition-colors"
                  >
                    <span className="block font-bold text-[var(--ink)]">🚀 {isDe ? "Tech-Pionier" : "科技创客"}</span>
                    <span className="text-[10px] text-[var(--gray)] font-mono">90% / 95%</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setPersonaLage(52);
                      setPersonaWerte(62);
                    }}
                    className="p-1.5 rounded border border-[var(--line)] bg-[var(--paper)] hover:bg-[var(--paper-subtle)] text-center transition-colors"
                  >
                    <span className="block font-bold text-[var(--ink)]">👔 {isDe ? "Aufsteiger" : "奋斗中产"}</span>
                    <span className="text-[10px] text-[var(--gray)] font-mono">52% / 62%</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setPersonaLage(25);
                      setPersonaWerte(18);
                    }}
                    className="p-1.5 rounded border border-[var(--line)] bg-[var(--paper)] hover:bg-[var(--paper-subtle)] text-center transition-colors"
                  >
                    <span className="block font-bold text-[var(--ink)]">🏭 {isDe ? "Facharbeiter" : "传统工薪"}</span>
                    <span className="text-[10px] text-[var(--gray)] font-mono">25% / 18%</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setPersonaLage(12);
                      setPersonaWerte(45);
                    }}
                    className="p-1.5 rounded border border-[var(--line)] bg-[var(--paper)] hover:bg-[var(--paper-subtle)] text-center transition-colors"
                  >
                    <span className="block font-bold text-[var(--ink)]">📦 {isDe ? "Prekariat" : "边缘零工"}</span>
                    <span className="text-[10px] text-[var(--gray)] font-mono">12% / 45%</span>
                  </button>
                </div>
              </div>
            </div>

            {/* 右侧 (5 列)：双杠杆微调、布尔迪厄三大资本解构与匹配研报 */}
            <div className="lg:col-span-5 flex flex-col gap-4">
              {/* 杠杆调节器 */}
              <div className="flex flex-col gap-3 p-4 rounded-xl border border-[var(--line)] bg-[var(--paper)] shadow-xs">
                <div>
                  <div className="flex justify-between text-xs font-semibold mb-1">
                    <span className="text-[var(--ink)]">{isDe ? "1. Soziale Lage (Kapital & Status)" : "1. 经济与文化资本（学历/收入/地位）"}</span>
                    <span className="font-mono text-[var(--ink)] font-bold">{personaLage} / 100</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={personaLage}
                    onChange={(e) => setPersonaLage(Number(e.target.value))}
                    className="w-full accent-[var(--ink)] cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-[var(--gray)] mt-0.5 font-mono">
                    <span>Prekär (底层)</span>
                    <span>Mitte (中坚)</span>
                    <span>Elite (上层)</span>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-semibold mb-1">
                    <span className="text-[var(--ink)]">{isDe ? "2. Grundorientierung (Wertewandel)" : "2. 价值观取向（传统保守 vs 多元先锋）"}</span>
                    <span className="font-mono text-[var(--ink)] font-bold">{personaWerte} / 100</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={personaWerte}
                    onChange={(e) => setPersonaWerte(Number(e.target.value))}
                    className="w-full accent-[var(--ink)] cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-[var(--gray)] mt-0.5 font-mono">
                    <span>Tradition (保守)</span>
                    <span>Modernisierung (现代)</span>
                    <span>Neuorientierung (先锋)</span>
                  </div>
                </div>
              </div>

              {/* 布尔迪厄三大资本透视条 */}
              <div className="p-4 rounded-xl border border-[var(--line)] bg-[var(--paper-subtle)] space-y-2 text-xs">
                <span className="font-mono text-[10px] text-[var(--gray)] uppercase tracking-wider block font-bold">
                  {isDe ? "Kapitaltheorie nach Pierre Bourdieu:" : "布尔迪厄三大资本结构推演："}
                </span>

                <div className="space-y-1.5">
                  <div>
                    <div className="flex justify-between text-[11px] mb-0.5 font-mono">
                      <span>💰 {isDe ? "Ökonomisches Kapital" : "经济资本 (收入/储蓄/房产)"}</span>
                      <span className="font-bold">{personaLage}%</span>
                    </div>
                    <div className="w-full h-1.5 bg-[var(--line)] rounded-full overflow-hidden">
                      <div className="h-full bg-[var(--ink)] transition-all duration-300" style={{ width: `${personaLage}%` }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-[11px] mb-0.5 font-mono">
                      <span>📚 {isDe ? "Kulturelles Kapital" : "文化资本 (学历/惯习/品味)"}</span>
                      <span className="font-bold">{Math.round(Math.min(100, personaLage * 0.55 + personaWerte * 0.45))}%</span>
                    </div>
                    <div className="w-full h-1.5 bg-[var(--line)] rounded-full overflow-hidden">
                      <div className="h-full bg-[var(--ink)] transition-all duration-300" style={{ width: `${Math.round(Math.min(100, personaLage * 0.55 + personaWerte * 0.45))}%` }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-[11px] mb-0.5 font-mono">
                      <span>🤝 {isDe ? "Soziales Kapital" : "社会资本 (人脉/阶层网络)"}</span>
                      <span className="font-bold">{Math.round(Math.min(100, personaLage * 0.5 + (100 - Math.abs(personaWerte - 50) * 1.1) * 0.5))}%</span>
                    </div>
                    <div className="w-full h-1.5 bg-[var(--line)] rounded-full overflow-hidden">
                      <div className="h-full bg-[var(--ink)] transition-all duration-300" style={{ width: `${Math.round(Math.min(100, personaLage * 0.5 + (100 - Math.abs(personaWerte - 50) * 1.1) * 0.5))}%` }} />
                    </div>
                  </div>
                </div>
              </div>

              {/* 实时匹配结果卡片 */}
              <div className="p-4 rounded-xl border border-[var(--line)] bg-[var(--paper)] flex flex-col gap-2 shadow-xs text-xs">
                <span className="text-[10px] font-mono text-[var(--gray)] uppercase tracking-wider">
                  {isDe ? "Dynamisches Match-Ergebnis" : "社会学算法动态定格社群："}
                </span>
                <div className="flex items-center gap-2">
                  <span
                    className="w-3.5 h-3.5 rounded-full"
                    style={{ backgroundColor: personaCalculated.matched.color }}
                  />
                  <h4 className="text-base font-bold text-[var(--ink)]">
                    {isDe ? personaCalculated.matched.nameDE : personaCalculated.matched.nameZH}
                  </h4>
                  <span className="font-mono text-[11px] text-[var(--gray)]">
                    ({personaCalculated.matched.share}% dt. Bev.)
                  </span>
                </div>
                <p className="text-[var(--ink)] italic leading-relaxed">
                  "{isDe ? personaCalculated.matched.mottoDE : personaCalculated.matched.mottoZH}"
                </p>

                <div className="pt-2 border-t border-[var(--line)] text-[var(--ink)] leading-relaxed">
                  <strong className="block mb-0.5 text-[var(--ink)] font-mono">{isDe ? "Soziologische Mobilitäts-Diagnose:" : "阶层流动性与惯习阻力研判："}</strong>
                  {personaLage > 70 && personaWerte < 30
                    ? isDe
                      ? "Hohes Kapital schützt vor Abstieg, aber starkes Festhalten an tradierten Elitestrukturen verhindert Anschluss an postmaterielle Milieus."
                      : "高资本铸就深厚护城河，但由于文化品味极其守旧，很难融入新潮的创新先锋圈层，代际封闭性高。"
                    : personaLage < 35 && personaWerte > 70
                    ? isDe
                      ? "Hohe kulturelle Weltoffenheit trifft auf finanzielle Barrieren (Prekärer Kreativer mit Aufstiegsblockade)."
                      : "高度拥抱前沿思想，但受制于经济资本匮乏，容易陷入生活困窘与‘高知低薪’的结构性摩擦。"
                    : personaLage > 70 && personaWerte > 70
                    ? isDe
                      ? "Kosmopolitische Gewinner der Globalisierung mit maximaler Autonomie und grenzenlosem Habitus."
                      : "全球化红利的最大受益者，拥有极高的社会资本转换能力与前沿跨国话语权。"
                    : isDe
                    ? "Ausbalancierter Status mit stetiger Anpassung an Marktchancen; Kern des gesellschaftlichen Zusammenhalts."
                    : "状态均衡，拥有广泛的社会适应力，处于德意志社会的主流承载区间与稳定缓冲带。"}
                </div>

                <div className="pt-2 flex justify-end">
                  <button
                    type="button"
                    onClick={() => {
                      const text = isDe
                        ? `Persona-Roaming: Position (${personaWerte}%, ${personaLage}%) -> Milieu: ${personaCalculated.matched.nameDE} (${personaCalculated.matched.share}%)`
                        : `自由人画像漫游报告：当前定格坐标 (${personaWerte}%, ${personaLage}%) -> 匹配社群：【${personaCalculated.matched.nameZH}】（占比 ${personaCalculated.matched.share}%）`;
                      if (onExportFinding) onExportFinding(text);
                      else {
                        navigator.clipboard.writeText(text);
                        alert(isDe ? "In die Zwischenablage kopiert!" : "已复制到剪贴板！");
                      }
                    }}
                    className="px-2.5 py-1 text-xs font-mono font-medium rounded border border-[var(--line)] bg-[var(--paper-subtle)] hover:border-[var(--ink)] transition-colors"
                  >
                    {isDe ? "📥 Befund exportieren" : "📥 导出漫游报告"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 模式 3：北威州会考真题与 EHZ 评分演练工坊 */}
      {activeTab === "klausur" && (
        <div className="flex flex-col gap-4 p-4 rounded-xl border border-[var(--line)] bg-[var(--paper)] text-xs text-[var(--ink)]">
          <div className="border-b border-[var(--line)] pb-3 flex flex-wrap items-center justify-between gap-2">
            <div>
              <span className="px-2 py-0.5 font-bold font-mono text-[10px] rounded border border-[var(--line)] bg-[var(--paper-subtle)] text-[var(--ink)]">
                NRW Zentralabitur · AFB III Beurteilungsaufgabe (15 BE / Notenpunkte)
              </span>
              <h4 className="text-sm font-bold mt-1.5 text-[var(--ink)]">
                {isDe
                  ? "Klausuraufgabe: 'Erörtern Sie, inwiefern das Sinus-Milieu-Modell die These einer zunehmenden Spaltung der deutschen Gesellschaft stützt.' (15 Punkte)"
                  : "北威州高考真题：‘请结合 Sinus-Milieus 容积模型，深入评析关于德国社会正日益走向撕裂分化的论点。’ (15分满分题)"}
              </h4>
            </div>
            <div className="text-right">
              <span className="text-[10px] font-mono text-[var(--gray)] block">{isDe ? "Zielerreichung" : "自测目标达成度"}</span>
              <span className="font-mono text-sm font-bold text-[var(--ink)]">15 / 15 NP (Sehr gut)</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* 采分要点 (EHZ) 与自测打分核对表 */}
            <div className="p-3.5 rounded-lg bg-[var(--paper-subtle)] border border-[var(--line)] space-y-2.5">
              <span className="font-bold text-[var(--ink)] block mb-1 font-mono">
                {isDe ? "✅ Erwartungshorizont (EHZ-Kernkriterien & Bepunktung):" : "✅ 官方阅卷采分标准 (Erwartungshorizont 15分拆解):"}
              </span>

              <div className="space-y-2">
                <div className="p-2 rounded bg-[var(--paper)] border border-[var(--line)] flex items-start gap-2">
                  <span className="font-mono font-bold text-[var(--ink)] shrink-0">[3 BE]</span>
                  <div className="leading-relaxed">
                    <strong>{isDe ? "1. Zweidimensionale Strukturierung:" : "1. 二维结构阐释："}</strong>{" "}
                    {isDe
                      ? "Erklärung der Achsen (Grundorientierung + soziale Lage). Abgrenzung von reinen Einkommensmodellen."
                      : "准确阐明横轴（基本价值取向）与纵轴（社会地位）的二维矩阵，跳出单纯的传统贫富二元划分。"}
                  </div>
                </div>

                <div className="p-2 rounded bg-[var(--paper)] border border-[var(--line)] flex items-start gap-2">
                  <span className="font-mono font-bold text-[var(--ink)] shrink-0">[4 BE]</span>
                  <div className="leading-relaxed">
                    <strong>{isDe ? "2. Lebensweltliche Spaltung & Habitus:" : "2. 生活世界隔离与惯习壁垒："}</strong>{" "}
                    {isDe
                      ? "Rückzug in Milieu-Echokammern (Prekäre vs. Performer/Postmaterielle). Habitus-Konzepte nach Bourdieu."
                      : "弱势困境阶层与大都市后物质主义精英在教育圈层、审美与生活世界上的彻底隔离；运用布尔迪厄惯习理论剖析隐性壁垒。"}
                  </div>
                </div>

                <div className="p-2 rounded bg-[var(--paper)] border border-[var(--line)] flex items-start gap-2">
                  <span className="font-mono font-bold text-[var(--ink)] shrink-0">[4 BE]</span>
                  <div className="leading-relaxed">
                    <strong>{isDe ? "3. Gegenargumentation & Mitte-Puffer:" : "3. 缓冲阀门与模型局限反驳："}</strong>{" "}
                    {isDe
                      ? "Die Bürgerliche und Adaptiv-Pragmatische Mitte puffern Konflikte ab (~25%). Modellkritik: kommerzielle Intransparenz."
                      : "市民中坚阶层与务实中产仍占据 25% 以上体量，发挥缓冲阀门作用；同时批判该商业咨询模型的黑箱定性归类局限。"}
                  </div>
                </div>

                <div className="p-2 rounded bg-[var(--paper)] border border-[var(--line)] flex items-start gap-2">
                  <span className="font-mono font-bold text-[var(--ink)] shrink-0">[4 BE]</span>
                  <div className="leading-relaxed">
                    <strong>{isDe ? "4. Abgewogenes Sach- & Werturteil:" : "4. 独立事实与价值裁决："}</strong>{" "}
                    {isDe
                      ? "Eigenständiges Fazit unter Abwägung von Chancengleichheit und demokratischer Kohäsion."
                      : "在权衡机会均等与民主社会整合力之间，得出逻辑自洽、论据充实的最终研判结论。"}
                  </div>
                </div>
              </div>
            </div>

            {/* 满分范文与低分诊断对照 */}
            <div className="flex flex-col gap-3">
              <div className="p-3.5 rounded-lg bg-[var(--paper-subtle)] border border-[var(--line)]">
                <span className="font-bold text-[var(--ink)] block mb-1 font-mono">
                  {isDe ? "✍️ 15-Punkte Musterformulierung (Abitur-Niveau):" : "✍️ 15分满分标准句式 (Muster-Formulierung):"}
                </span>
                <blockquote className="italic border-l-2 border-[var(--ink)] pl-2 text-[var(--ink)] leading-relaxed bg-[var(--paper)] p-2 rounded">
                  {isDe
                    ? "„Das Sinus-Milieu-Modell belegt eindrucksvoll, dass die gesellschaftliche Erosion nicht primär als klassischer Klassenkonflikt, sondern als Fragmentierung von Lebenswelten verstanden werden muss. Während kosmopolitische Eliten (Postmaterielle, Performer) von der Globalisierung profitieren, verharrt das Prekäre Milieu in systemischer Resignation – die Schnittmengen gemeinsamen Wertebewusstseins schrumpfen zusehends.“"
                    : "‘Sinus-Milieus 容积模型有力证明了，当今社会的撕裂不应被狭隘地理解为传统的阶级对立，而应被视为生存生活世界（Lebenswelten）的碎片化。当国际化大都市精英（后物质主义、进取精英）从全球化红利中汲取滋养时，边缘困境阶层却陷入体制性的被剥夺与无力感中——维系社会整合的基础共同价值公约数正显著收缩。’"}
                </blockquote>
              </div>

              <div className="p-3.5 rounded-lg bg-[var(--paper-subtle)] border border-[var(--line)]">
                <span className="font-bold text-[var(--ink)] block mb-1 font-mono">
                  {isDe ? "⚠️ Typischer Schülerfehler (Punktabzug auf 04 NP):" : "⚠️ 典型低分失误诊断 (导致降至04分的陷阱):"}
                </span>
                <p className="leading-relaxed text-[var(--ink)]/80 bg-[var(--paper)] p-2 rounded">
                  {isDe
                    ? "Bloßes Aufzählen der Milieu-Namen ohne Rückbindung an die soziologischen Fachbegriffe (Habitus, Kapitalarten nach Bourdieu) und Verwechslung von 'Beurteilen' mit reiner persönlicher Meinungsäußerung ohne Kriterien."
                    : "仅机械罗列社群名称与八卦式人物标签，未能联结布尔迪厄的‘文化资本’与‘生活惯习’（Habitus）等考纲术语；把‘Beurteilen（学术评判）’误写为缺乏量化标准的情绪化个人感言。"}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

