import { useState, useMemo, useId } from "react";
import type { Lang } from "../../i18n";
import MathHtml from "../MathHtml";

export interface RawlsVerteilungsSimProps {
  lang?: Lang;
  studioMode?: boolean;
  onExportFinding?: (text: string) => void;
}

export type VerteilungsSystemId =
  | "rawls"
  | "utilitarismus"
  | "libertarismus"
  | "egalitarismus"
  | "benutzerdefiniert";

export interface SocialClass {
  id: string;
  nameDE: string;
  nameZH: string;
  shortDE: string;
  shortZH: string;
  populationShare: number; // Anteil an der Gesamtbevölkerung (0 bis 1)
  baseMarketIncome: number; // Primäreinkommen vor Steuern & Transfers in EUR/Monat
  descriptionDE: string;
  descriptionZH: string;
  rolePersonaDE: string;
  rolePersonaZH: string;
}

export interface PresetModel {
  id: VerteilungsSystemId;
  nameDE: string;
  nameZH: string;
  subtitleDE: string;
  subtitleZH: string;
  taxRatePercent: number; // Spitzen-/Durchschnittssteuersatz
  basicFloorPercent: number; // Gewichtung der Grundsicherung
  philosopherDE: string;
  philosopherZH: string;
  corePrincipleDE: string;
  corePrincipleZH: string;
  descriptionDE: string;
  descriptionZH: string;
}

// 5 Gesellschaftsschichten für das Modell (Basis NRW Sozialdaten & Modelltheorie)
export const SOCIAL_CLASSES: SocialClass[] = [
  {
    id: "elite",
    nameDE: "Vermögende & Spitzenverdiener",
    nameZH: "极富阶层与企业资本拥有者",
    shortDE: "Elite / Top 5%",
    shortZH: "顶层 5%",
    populationShare: 0.05,
    baseMarketIncome: 18000,
    descriptionDE: "Großunternehmer, Spitzenmanager, Kapitalerben mit hohem finanziellem Vermögen.",
    descriptionZH: "大型企业主、高级管理层与资本继承者，拥有丰厚资产。",
    rolePersonaDE: "Maximilian (42), Industrieerbe & Investor. Reagiert sensibel auf Steueranreize.",
    rolePersonaZH: "马克西米利安（42岁），工业家族继承人与投资人。对税收激励极其敏感。",
  },
  {
    id: "upper_middle",
    nameDE: "Höhere Fachkräfte & Freiberufler",
    nameZH: "高薪专业阶层与自由职业精英",
    shortDE: "Obere Mittelschicht (15%)",
    shortZH: "中上阶层 15%",
    populationShare: 0.15,
    baseMarketIncome: 7500,
    descriptionDE: "Chefärzte, Notare, spezialisierte Ingenieure und Kanzleipartner.",
    descriptionZH: "主治医师、公证人、资深工程师与律所合伙人。",
    rolePersonaDE: "Dr. Elena (38), Fachärztin im Klinikum. Hohe Arbeitsbelastung und Leistungsbereitschaft.",
    rolePersonaZH: "埃琳娜医生（38岁），医院专科主治医师。承担高强度工作负荷。",
  },
  {
    id: "middle",
    nameDE: "Facharbeiter & mittlere Angestellte",
    nameZH: "技术工人与普通工薪阶层",
    shortDE: "Mittelschicht (40%)",
    shortZH: "骨干中产 40%",
    populationShare: 0.40,
    baseMarketIncome: 3800,
    descriptionDE: "Industriemechaniker, Lehrer, Handwerksmeister und Verwaltungsangestellte.",
    descriptionZH: "工业机械师、中学教师、手工业师傅与行政雇员。",
    rolePersonaDE: "Lukas (34), Industriemechaniker im Schichtdienst. Braucht verlässliche Grundinfrastruktur.",
    rolePersonaZH: "卢卡斯（34岁），轮班工业机械师。依赖稳定健全的公共基础设施。",
  },
  {
    id: "lower_middle",
    nameDE: "Prekär Beschäftigte & Dienstleister",
    nameZH: "低薪边缘阶层与基层服务业人员",
    shortDE: "Prekariat (30%)",
    shortZH: "基层边缘 30%",
    populationShare: 0.30,
    baseMarketIncome: 1900,
    descriptionDE: "Paketzusteller, Reinigungskräfte, Servicepersonal in Gastronomie und Pflege.",
    descriptionZH: "快递送件员、保洁员、餐饮服务生与基层护理助理。",
    rolePersonaDE: "Fatima (29), Pflegemitarbeiterin in Teilzeit, alleinerziehend. Hohe Mietbelastung.",
    rolePersonaZH: "法蒂玛（29岁），单亲母亲兼兼职护理员。承担沉重的生活租金压力。",
  },
  {
    id: "least_advantaged",
    nameDE: "Schlechtestgestellte & Erwerbsunfähige",
    nameZH: "最差境遇阶层与严重丧失劳力者",
    shortDE: "Schlechtestgestellte (10%)",
    shortZH: "最弱势底线 10%",
    populationShare: 0.10,
    baseMarketIncome: 300,
    descriptionDE: "Chronisch Kranke, Erwerbsunfähige, Menschen ohne Rücklagen oder familiären Halt.",
    descriptionZH: "慢性重病患者、丧失劳动能力者、无任何家庭托底支持的群体。",
    rolePersonaDE: "Jonas (24), unverschuldet dauerhaft erwerbsunfähig nach Unfall. Völlig auf Grundsicherung angewiesen.",
    rolePersonaZH: "约纳斯（24岁），意外事故后永久丧失劳动能力。生存完全取决于底线救济保障。",
  },
];

export const PRESET_MODELS: PresetModel[] = [
  {
    id: "rawls",
    nameDE: "John Rawls: Differenzprinzip (Maximin)",
    nameZH: "约翰·罗尔斯：差异原则（最大最小法则 Maximin）",
    subtitleDE: "Ungleichheit nur zulässig, wenn sie den Schwächsten maximiert",
    subtitleZH: "仅当不平等能为最弱势者带来最大利益时，该不平等才被允许",
    taxRatePercent: 44,
    basicFloorPercent: 55,
    philosopherDE: "John Rawls (1921–2002)",
    philosopherZH: "约翰·罗尔斯（1921–2002）",
    corePrincipleDE: "Maximin-Regel: max(min(U_i)). Der Schleier des Nichtwissens erzwingt Risikominimierung.",
    corePrincipleZH: "Maximin准则：max(min(U_i))。无知之幕迫使理性决策者优先保障最坏处境。",
    descriptionDE:
      "Leistungsanreize bleiben erhalten, um den Gesamtkuchen zu vergrößern. Über progressive Steuern wird jedoch der maximale Transfer an die schwächste Schicht sichergestellt. Das Existenzminimum erreicht hier das reale Maximum.",
    descriptionZH:
      "保留合理的市场激励以做大财富蛋糕；通过累进税与转移支付，确保社会最弱势群体分得绝对量最大的托底收入。使底线生存福利达到可承受的最大值。",
  },
  {
    id: "utilitarismus",
    nameDE: "Utilitarismus: Nutzensummen-Maximierung",
    nameZH: "古典功利主义：社会总效用最大化",
    subtitleDE: "Größtes Glück der größten Zahl – Verelendung der Schwachen in Kauf genommen",
    subtitleZH: "最大多数人的最大幸福——漠视甚至牺牲最底层弱者的生存境遇",
    taxRatePercent: 22,
    basicFloorPercent: 20,
    philosopherDE: "Jeremy Bentham / John Stuart Mill",
    philosopherZH: "杰里米·边沁 / 约翰·斯图尔特·密尔",
    corePrincipleDE: "Maximierung des Gesamtnutzens: max(∑ U_i). Keine Schranken gegen Verelendung Einzelner.",
    corePrincipleZH: "总效用极大化：max(∑ U_i)。只要总体或多数人收益增加，允许个体沦入赤贫。",
    descriptionDE:
      "Niedrige Besteuerung stimuliert die Kapitalbildung und Spitzenleistung. Das Bruttoinlandsprodukt wächst, aber die schwächsten 10% verharren in extremer Armut unterhalb der Menschenwürdegrenze, da sie keinen ökonomischen Marktwert beitragen.",
    descriptionZH:
      "低税率刺激资本投资与精英生产力，社会总财富规模扩张。然而最底层的 10% 因缺乏市场交换价值而陷入极度贫困，基本人权与尊严缺乏底线兜底。",
  },
  {
    id: "libertarismus",
    nameDE: "Robert Nozick: Libertärer Nachtwächterstaat",
    nameZH: "罗伯特·诺齐克：自由至上主义与守夜人国家",
    subtitleDE: "Absolute Eigentumsrechte – Umverteilung gilt als unrechtmäßige Zwangsarbeit",
    subtitleZH: "绝对私有财产权——强制性再分配税收等同于强迫劳动",
    taxRatePercent: 8,
    basicFloorPercent: 5,
    philosopherDE: "Robert Nozick (1938–2002)",
    philosopherZH: "罗伯特·诺齐克（1938–2002）",
    corePrincipleDE: "Anspruchstheorie: Gerechtigkeit ist rein verfahrensbezogen. Besteuerung verletzt Selbsteigentum.",
    corePrincipleZH: "资格理论（Entitlement Theory）：正义仅关乎获取过程的合法性，禁止任何结果干涉。",
    descriptionDE:
      "Minimalstaat finanziert nur Justiz und Polizei. Null Sozialtransfers. Spitzenverdiener behalten ihr gesamtes Einkommen; wer dauerhaft krank oder unverschuldet erwerbsunfähig ist, ist ausschließlich auf private Mildtätigkeit angewiesen.",
    descriptionZH:
      "极小国家仅负责国防与司法合同执行，税收接近于零。顶层精英保留全部市场所得；而丧失劳力或遭遇不幸者完全无法获得制度性保障，生存面临绝境。",
  },
  {
    id: "egalitarismus",
    nameDE: "Radikaler Egalitarismus: Absolute Gleichmacherei",
    nameZH: "激进平等主义：绝对平均主义与结果平等",
    subtitleDE: "Alle erhalten exakt dasselbe – Zusammenbruch der wirtschaftlichen Produktivität",
    subtitleZH: "所有人分配完全一致——导致生产积极性瓦解与整体经济萎缩",
    taxRatePercent: 85,
    basicFloorPercent: 95,
    philosopherDE: "Kollektivistische Egalitäre Theorie",
    philosopherZH: "集体主义绝对结果均等论",
    corePrincipleDE: "Gleichheit als Selbstzweck: U_1 = U_2 = U_3 ... Verbot von Leistungsanreizen.",
    corePrincipleZH: "平等即终极目的：完全消灭收入差距，抹平一切能力与贡献差异。",
    descriptionDE:
      "Durch 85% Besteuerung wird der Gini-Koeffizient fast auf Null gedrückt. Weil jedoch jegliche Leistungsanreize für Ärzte, Forscher und Unternehmer entfallen, schrumpft der Gesamtkuchen so dramatisch, dass selbst die Schwächsten absolut weniger haben als bei Rawls.",
    descriptionZH:
      "通过超高税率使基尼系数趋近于零。但由于消灭了全部职业努力与创新激励，经济蛋糕严重萎缩，导致即便弱势群体分得的绝对生活资料也低于罗尔斯模式。",
  },
];

export interface AllocationEngineResult {
  classes: Array<{
    info: SocialClass;
    marketIncome: number;
    taxPaid: number;
    transferReceived: number;
    netIncome: number;
    utilityScore: number;
  }>;
  totalGDP: number; // Summe der Nettoeinkommen / Gesamtkuchen
  productivityFactor: number; // 0 bis 1
  minIncome: number; // Wohlstand der Schlechtestgestellten (Maximin)
  giniCoefficient: number;
  lorenzPoints: Array<{ p: number; l: number }>;
  existenzMinimumThreshold: number; // 1200 EUR als angenommene soziokulturelle Untergrenze
  povertyLineThreshold: number; // 60% des Medians
  maximinSatisfied: boolean;
}

export function computeAllocation(
  taxRatePercent: number,
  basicFloorPercent: number
): AllocationEngineResult {
  const t = Math.max(0, Math.min(90, taxRatePercent)) / 100;
  const f = Math.max(0, Math.min(100, basicFloorPercent)) / 100;

  // Produktivitätseffekt (Laffer-Kurve & Anreiz-Elastizität)
  // Bis 35% Steuern kaum Wohlstandsverlust; darüber zunehmende Reibungsverluste
  const deadweightThreshold = 0.35;
  const excessTax = Math.max(0, t - deadweightThreshold);
  const productivityFactor = Math.max(0.35, 1 - 0.75 * Math.pow(excessTax, 1.45));

  // 1. Primäres Markteinkommen skaliert mit Produktivität
  const effectiveMarket = SOCIAL_CLASSES.map((c) => ({
    ...c,
    market: Math.round(c.baseMarketIncome * productivityFactor),
  }));

  // 2. Steuern berechnen (progressive Staffelung basierend auf t)
  // Höhere Schichten zahlen überproportionalen Grenzsteuersatz
  const taxMultipliers = [1.6, 1.25, 0.95, 0.45, 0.05];
  let totalTaxPool = 0;

  const taxedClasses = effectiveMarket.map((c, idx) => {
    const effectiveRate = Math.min(0.85, t * taxMultipliers[idx]);
    const taxPaid = Math.round(c.market * effectiveRate);
    totalTaxPool += taxPaid * c.populationShare;
    return {
      ...c,
      taxPaid,
      effectiveRate,
    };
  });

  // 3. Aufteilung des Steueraufkommens:
  // In einem libertären Minimalstaat (f <= 5%) fließt das Aufkommen rein in Justiz/Polizei (keine Transfers).
  // Je höher f, desto größer der Anteil für soziale Sicherung & Umverteilung (bis zu 75% des Steueraufkommens).
  const socialTransferShare = Math.max(0, (f - 0.06) / 0.94) * 0.75;
  const redistributablePool = totalTaxPool * socialTransferShare;

  // Verteilungsgewichtung des Transfertopfs:
  // Hohes f lenkt den Topf gezielt an Schicht 4 (Prekariat) und Schicht 5 (Schlechtestgestellte).
  // Niedriges f verteilt restliche Mittel breiter (Gießkanne/Pauschalen).
  const transferWeights = [
    0.01 * (1 - f), // Elite bekommt praktisch keinen Transfer
    0.04 * (1 - f), // Obere Mittelschicht
    0.25 * (1 - f) + 0.15 * f, // Mittelschicht (Familienbeihilfen)
    0.35 * (1 - f) + 0.35 * f, // Prekariat (Wohngeld/Aufstocker)
    0.35 * (1 - f) + 0.50 * f, // Schlechtestgestellte (Existenzsicherung)
  ];
  const weightSum = transferWeights.reduce((a, b) => a + b, 0);
  const normalizedWeights = transferWeights.map((w) => w / (weightSum || 1));

  const classesResult = taxedClasses.map((c, idx) => {
    // Pro-Kopf-Transfer = (Transferanteil dieser Schicht) / Bevölkerungsanteil
    const shareOfPool = redistributablePool * normalizedWeights[idx];
    const transferPerCapita = Math.round(shareOfPool / c.populationShare);
    const netIncome = Math.max(150, c.market - c.taxPaid + transferPerCapita);

    // Nutzenfunktion (konkav nach Bernoulli/Log: Grenznutzen des Geldes nimmt ab)
    const utilityScore = Math.round(Math.log(netIncome / 100 + 1) * 22);

    return {
      info: SOCIAL_CLASSES[idx],
      marketIncome: c.market,
      taxPaid: c.taxPaid,
      transferReceived: transferPerCapita,
      netIncome,
      utilityScore,
    };
  });

  const totalGDP = Math.round(
    classesResult.reduce((sum, item) => sum + item.netIncome * item.info.populationShare, 0)
  );
  const minIncome = classesResult[4].netIncome; // Schlechtestgestellte

  // Lorenzkurve & Gini-Koeffizient
  // Sortierung nach Einkommen (Schicht 4 ist ärmste, 0 reichste)
  // Reversieren: ärmste -> reichste
  const sorted = [...classesResult].sort((a, b) => a.netIncome - b.netIncome);
  const lorenzPoints = [{ p: 0, l: 0 }];
  let cumPop = 0;
  let cumIncome = 0;
  const totalIncomeSum = sorted.reduce((acc, it) => acc + it.netIncome * it.info.populationShare, 0);

  for (const it of sorted) {
    cumPop += it.info.populationShare * 100;
    cumIncome += (it.netIncome * it.info.populationShare * 100) / totalIncomeSum;
    lorenzPoints.push({
      p: Math.min(100, Math.round(cumPop)),
      l: Math.min(100, Math.round(cumIncome)),
    });
  }

  // Gini-Koeffizient über Trapezformel
  let areaUnderLorenz = 0;
  for (let i = 1; i < lorenzPoints.length; i++) {
    const width = (lorenzPoints[i].p - lorenzPoints[i - 1].p) / 100;
    const avgHeight = (lorenzPoints[i].l + lorenzPoints[i - 1].l) / (2 * 100);
    areaUnderLorenz += width * avgHeight;
  }
  const gini = Math.max(0.02, Math.min(0.85, Number(((0.5 - areaUnderLorenz) / 0.5).toFixed(3))));

  // Schwellenwerte
  const existenzMinimumThreshold = 1200; // EUR/Monat
  const medianApprox = classesResult[2].netIncome;
  const povertyLineThreshold = Math.round(medianApprox * 0.6);

  // Maximin ist erfüllt, wenn das Existenzminimum gesichert ist (>= 1200 €) und minIncome nahe dem Optimum liegt
  const maximinSatisfied = minIncome >= existenzMinimumThreshold;

  return {
    classes: classesResult,
    totalGDP,
    productivityFactor,
    minIncome,
    giniCoefficient: gini,
    lorenzPoints,
    existenzMinimumThreshold,
    povertyLineThreshold,
    maximinSatisfied,
  };
}

export function RawlsVerteilungsSim({
  lang = "de",
  studioMode = false,
  onExportFinding,
}: RawlsVerteilungsSimProps) {
  const isZh = lang === "zh";
  const [activeModelId, setActiveModelId] = useState<VerteilungsSystemId>("rawls");
  const [taxRate, setTaxRate] = useState<number>(44);
  const [basicFloor, setBasicFloor] = useState<number>(55);

  // Zustand: Schleier des Nichtwissens aktiv vs. gelüftet
  const [isVeilLifted, setIsVeilLifted] = useState<boolean>(false);
  // Zufällig gezogene Identität des Nutzers nach dem Lüften des Schleiers
  const [assignedClassId, setAssignedClassId] = useState<string | null>(null);

  // Tab-Navigation für Auswertungsmodule
  const [activeTab, setActiveTab] = useState<"waage" | "einkommen" | "lorenz" | "klausur">("waage");

  // Berechnungs-Engine
  const results = useMemo(
    () => computeAllocation(taxRate, basicFloor),
    [taxRate, basicFloor]
  );

  // Voreinstellung anwenden
  const handleSelectPreset = (preset: PresetModel) => {
    setActiveModelId(preset.id);
    setTaxRate(preset.taxRatePercent);
    setBasicFloor(preset.basicFloorPercent);
  };

  // Schleier lüften & Identität auslosen
  const handleLiftVeil = () => {
    setIsVeilLifted(true);
    // Gewichtete Zufallsziehung basierend auf Bevölkerungsanteil
    const rand = Math.random();
    let cumulative = 0;
    let chosenId = SOCIAL_CLASSES[4].id; // Fallback
    for (const c of SOCIAL_CLASSES) {
      cumulative += c.populationShare;
      if (rand <= cumulative) {
        chosenId = c.id;
        break;
      }
    }
    setAssignedClassId(chosenId);
  };

  const handleResetVeil = () => {
    setIsVeilLifted(false);
    setAssignedClassId(null);
  };

  const userPersona = useMemo(() => {
    if (!assignedClassId) return null;
    const cls = results.classes.find((c) => c.info.id === assignedClassId);
    return cls || null;
  }, [assignedClassId, results]);

  // Berechnung für die Moralische Waage (SVG)
  // Linke Schale: Effizienz / GDP (Wertebereich 2000 bis 7000)
  // Rechte Schale: Schutz der Schwächsten / Maximin (Wertebereich 300 bis 2500)
  const gdpNorm = Math.min(100, Math.max(10, ((results.totalGDP - 2000) / 4500) * 100));
  const minNorm = Math.min(100, Math.max(10, ((results.minIncome - 300) / 1800) * 100));
  // Neigungswinkel der Waage (-18 Grad bis +18 Grad)
  // Positiv: Waage neigt sich nach rechts (Maximin/Gerechtigkeit wiegt schwerer)
  // Negativ: Waage neigt sich nach links (reine Markteffizienz dominiert)
  const balanceAngle = Math.max(-16, Math.min(16, ((minNorm - gdpNorm) / 100) * 22));

  // Exportieren von Klausur-Erkenntnissen
  const handleExportSummary = () => {
    if (!onExportFinding) return;
    const text = isZh
      ? `【罗尔斯《正义论》无知之幕分配分析】当前体制: ${
          PRESET_MODELS.find((m) => m.id === activeModelId)?.nameZH || "自定义"
        } | 调节税率: ${taxRate}% | 底层保底: ${basicFloor}% | 最弱势阶层净收入: ${
          results.minIncome
        } €/月 | 基尼系数: ${results.giniCoefficient} | Maximin原则状态: ${
          results.maximinSatisfied ? "达标 (>=1200€)" : "违背 (陷入极端贫困)"
        }`
      : `[Rawls Gerechtigkeitstheorie Analyse] System: ${
          PRESET_MODELS.find((m) => m.id === activeModelId)?.nameDE || "Benutzerdefiniert"
        } | Steuersatz: ${taxRate}% | Grundsicherung: ${basicFloor}% | Wohlfahrt der Schwächsten: ${
          results.minIncome
        } EUR/Monat | Gini: ${results.giniCoefficient} | Maximin: ${
          results.maximinSatisfied ? "Erfuellt (>=1200€)" : "Verletzt (unter Existenzminimum)"
        }`;
    onExportFinding(text);
  };

  const sliderTaxId = useId();
  const sliderFloorId = useId();

  return (
    <div
      className={`w-full bg-[var(--paper)] text-[var(--ink)] border border-[var(--line)] rounded-sm p-4 md:p-6 transition-colors ${
        studioMode ? "max-w-none" : "max-w-7xl mx-auto"
      }`}
    >
      {/* 顶部标题区与学科学术标识 */}
      <header className="border-b border-[var(--line)] pb-4 mb-6 flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[var(--muted)] mb-1">
            <span>Philosophie (Praktische Philosophie EF/Q1)</span>
            <span>•</span>
            <span>John Rawls: A Theory of Justice (1971)</span>
          </div>
          <h2 className="text-xl md:text-2xl font-serif font-bold tracking-tight">
            {isZh
              ? "罗尔斯正义论与无知之幕分配天平 (Rawls-Verteilungs-Simulator)"
              : "Rawls-Verteilungssimulator & Schleier des Nichtwissens"}
          </h2>
          <p className="text-xs md:text-sm text-[var(--muted)] mt-1 font-serif">
            {isZh
              ? "原初状态（Urzustand）思想实验：在未知自身社会阶层、天赋与家庭背景下，验证最大最小准则（Maximin）与两大正义原则。"
              : "Urzustand-Gedankenexperiment: Ermitteln Sie unter dem Schleier des Nichtwissens die rationalen Verteilungsgrundsätze für eine gerechte Gesellschaft."}
          </p>
        </div>

        {/* 顶部状态角标 */}
        <div className="flex items-center gap-2">
          <div
            className={`px-2.5 py-1 text-xs font-mono border rounded-sm flex items-center gap-1.5 ${
              isVeilLifted
                ? "border-[var(--line)] bg-[var(--paper-subtle)] text-[var(--ink)]"
                : "border-[var(--line)] bg-[var(--paper)] text-[var(--muted)]"
            }`}
          >
            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
              <circle cx="12" cy="12" r="3" />
            </svg>
            <span>{isVeilLifted ? (isZh ? "面纱已揭开" : "Schleier gelüftet") : (isZh ? "无知之幕生效中" : "Schleier aktiv")}</span>
          </div>
          {onExportFinding && (
            <button
              onClick={handleExportSummary}
              className="px-3 py-1 text-xs font-sans border border-[var(--line)] hover:bg-[var(--paper-subtle)] transition-colors rounded-sm"
              title={isZh ? "导出核心考点结论" : "Klausur-Erkenntnis exportieren"}
            >
              {isZh ? "导出记录" : "Exportieren"}
            </button>
          )}
        </div>
      </header>

      {/* 主布局：左侧 65% 可视化与沙盘，右侧 35% 哲学范式调控与身份抽取 */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* 左侧主要展示与交互区 (8 Cols) */}
        <div className="lg:col-span-8 flex flex-col gap-5">
          {/* 模式选择导航选项卡 */}
          <div className="flex items-center justify-between border-b border-[var(--line)] pb-2">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setActiveTab("waage")}
                className={`px-3 py-1 text-xs font-mono border-b-2 transition-all ${
                  activeTab === "waage"
                    ? "border-[var(--ink)] text-[var(--ink)] font-bold"
                    : "border-transparent text-[var(--muted)] hover:text-[var(--ink)]"
                }`}
              >
                {isZh ? "1. 道德天平 (Moralische Waage)" : "1. Moralische Waage"}
              </button>
              <button
                onClick={() => setActiveTab("einkommen")}
                className={`px-3 py-1 text-xs font-mono border-b-2 transition-all ${
                  activeTab === "einkommen"
                    ? "border-[var(--ink)] text-[var(--ink)] font-bold"
                    : "border-transparent text-[var(--muted)] hover:text-[var(--ink)]"
                }`}
              >
                {isZh ? "2. 阶层净收入柱状图" : "2. Nettoeinkommen"}
              </button>
              <button
                onClick={() => setActiveTab("lorenz")}
                className={`px-3 py-1 text-xs font-mono border-b-2 transition-all ${
                  activeTab === "lorenz"
                    ? "border-[var(--ink)] text-[var(--ink)] font-bold"
                    : "border-transparent text-[var(--muted)] hover:text-[var(--ink)]"
                }`}
              >
                {isZh ? "3. 洛伦兹曲线 & Gini" : "3. Lorenz-Kurve & Gini"}
              </button>
              <button
                onClick={() => setActiveTab("klausur")}
                className={`px-3 py-1 text-xs font-mono border-b-2 transition-all ${
                  activeTab === "klausur"
                    ? "border-[var(--ink)] text-[var(--ink)] font-bold"
                    : "border-transparent text-[var(--muted)] hover:text-[var(--ink)]"
                }`}
              >
                {isZh ? "4. 会考提分台 (Abitur)" : "4. Abitur-Analyse"}
              </button>
            </div>

            {/* 快速重置面纱按钮 */}
            <div>
              {!isVeilLifted ? (
                <button
                  onClick={handleLiftVeil}
                  className="px-3 py-1 text-xs font-sans font-bold bg-[var(--ink)] text-[var(--paper)] hover:opacity-90 rounded-sm transition-all flex items-center gap-1.5"
                >
                  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                  <span>{isZh ? "揭开无知之幕 (抽取社会身份)" : "Schleier lüften (Rolle ziehen)"}</span>
                </button>
              ) : (
                <button
                  onClick={handleResetVeil}
                  className="px-3 py-1 text-xs font-sans border border-[var(--line)] hover:bg-[var(--paper-subtle)] rounded-sm transition-all text-[var(--muted)]"
                >
                  {isZh ? "重新蒙上面纱 (回归原初状态)" : "Schleier wieder absenken"}
                </button>
              )}
            </div>
          </div>

          {/* Tab 1: 道德天平 (Moralische Waage) */}
          {activeTab === "waage" && (
            <div className="border border-[var(--line)] bg-[var(--paper-subtle)] p-4 rounded-sm flex flex-col items-center">
              <div className="w-full flex items-center justify-between text-xs font-mono text-[var(--muted)] mb-2">
                <span>← {isZh ? "总财富与经济效率 (Effizienz & BIP)" : "Markteffizienz & BIP"}</span>
                <span className="font-bold text-[var(--ink)]">
                  {results.maximinSatisfied
                    ? isZh
                      ? "✓ 达成 Maximin 正义底线"
                      : "✓ Maximin-Kriterium erfuellt"
                    : isZh
                    ? "✕ 弱势群体陷入赤贫"
                    : "✕ Verelendung der Schwaechsten"}
                </span>
                <span>{isZh ? "弱者尊严与保底 (Maximin / Existenzschutz)" : "Wohlfahrt der Schwächsten →"}</span>
              </div>

              {/* 纯 SVG Tufte 风格道德天平 */}
              <div className="w-full max-w-lg aspect-[16/9] flex items-center justify-center">
                <svg
                  viewBox="0 0 400 240"
                  className="w-full h-full select-none"
                  style={{ strokeLinecap: "round", strokeLinejoin: "round" }}
                >
                  {/* 底座与支撑立柱 */}
                  <line x1="200" y1="50" x2="200" y2="210" stroke="var(--ink)" strokeWidth="3" />
                  <polygon points="170,225 230,225 200,210" fill="var(--ink)" />
                  <line x1="150" y1="225" x2="250" y2="225" stroke="var(--ink)" strokeWidth="2" />

                  {/* 支点中心轴承 */}
                  <circle cx="200" cy="50" r="6" fill="var(--paper)" stroke="var(--ink)" strokeWidth="2.5" />

                  {/* 可旋转横梁 (Balance Beam) */}
                  <g
                    transform={`rotate(${balanceAngle}, 200, 50)`}
                    style={{
                      transformOrigin: "200px 50px",
                      transformBox: "view-box",
                      transition: "transform 0.4s ease-out",
                    }}
                  >
                    {/* 横梁杆 */}
                    <line x1="60" y1="50" x2="340" y2="50" stroke="var(--ink)" strokeWidth="3.5" />
                    <circle cx="60" cy="50" r="4" fill="var(--ink)" />
                    <circle cx="340" cy="50" r="4" fill="var(--ink)" />

                    {/* 指针 */}
                    <line x1="200" y1="50" x2="200" y2="22" stroke="var(--ink)" strokeWidth="2" strokeDasharray="2 2" />

                    {/* 左盘吊线与托盘 (Effizienz) */}
                    <g transform={`rotate(${-balanceAngle}, 60, 50)`} style={{ transformOrigin: "60px 50px" }}>
                      <line x1="60" y1="50" x2="30" y2="130" stroke="var(--muted)" strokeWidth="1.2" />
                      <line x1="60" y1="50" x2="90" y2="130" stroke="var(--muted)" strokeWidth="1.2" />
                      {/* 托盘弧面 */}
                      <path d="M 20 130 Q 60 145 100 130" fill="none" stroke="var(--ink)" strokeWidth="2" />
                      {/* 砝码：经济总产出 */}
                      <rect
                        x="38"
                        y={130 - Math.min(45, (gdpNorm / 100) * 45)}
                        width="44"
                        height={Math.min(45, (gdpNorm / 100) * 45)}
                        fill="var(--paper)"
                        stroke="var(--ink)"
                        strokeWidth="1.8"
                      />
                      <text x="60" y="145" textAnchor="middle" fontSize="9" fill="var(--ink)" fontFamily="monospace">
                        {Math.round(results.totalGDP)} €
                      </text>
                      <text x="60" y="160" textAnchor="middle" fontSize="8" fill="var(--muted)" fontFamily="serif">
                        {isZh ? "总财富" : "Gesamtwohlstand"}
                      </text>
                    </g>

                    {/* 右盘吊线与托盘 (Maximin) */}
                    <g transform={`rotate(${-balanceAngle}, 340, 50)`} style={{ transformOrigin: "340px 50px" }}>
                      <line x1="340" y1="50" x2="310" y2="130" stroke="var(--muted)" strokeWidth="1.2" />
                      <line x1="340" y1="50" x2="370" y2="130" stroke="var(--muted)" strokeWidth="1.2" />
                      {/* 托盘弧面 */}
                      <path d="M 300 130 Q 340 145 380 130" fill="none" stroke="var(--ink)" strokeWidth="2" />
                      {/* 砝码：最弱者保底额度 */}
                      <rect
                        x="318"
                        y={130 - Math.min(45, (minNorm / 100) * 45)}
                        width="44"
                        height={Math.min(45, (minNorm / 100) * 45)}
                        fill={results.maximinSatisfied ? "var(--ink)" : "var(--paper)"}
                        stroke="var(--ink)"
                        strokeWidth="1.8"
                      />
                      <text
                        x="340"
                        y="145"
                        textAnchor="middle"
                        fontSize="9"
                        fill={results.maximinSatisfied ? "var(--paper)" : "var(--ink)"}
                        fontFamily="monospace"
                        fontWeight="bold"
                      >
                        {results.minIncome} €
                      </text>
                      <text x="340" y="160" textAnchor="middle" fontSize="8" fill="var(--muted)" fontFamily="serif">
                        {isZh ? "最弱势保障" : "Schlechtestgestellte"}
                      </text>
                    </g>
                  </g>

                  {/* 刻度盘微标尺 */}
                  <path d="M 185 24 Q 200 20 215 24" fill="none" stroke="var(--line)" strokeWidth="1" />
                  <line x1="200" y1="18" x2="200" y2="24" stroke="var(--ink)" strokeWidth="1.5" />
                </svg>
              </div>

              {/* 天平诊断阐释 */}
              <div className="w-full text-xs font-serif border-t border-[var(--line)] pt-3 mt-2 flex flex-col md:flex-row gap-3 justify-between items-start">
                <div className="flex-1">
                  <span className="font-bold text-[var(--ink)] block mb-0.5">
                    {isZh ? "天平平衡原理（Das moralische Gleichgewicht）" : "Moralisches Gleichgewicht"}
                  </span>
                  <p className="text-[var(--muted)] leading-relaxed">
                    {isZh
                      ? "在罗尔斯原初状态中，理性行动者厌恶极端风险。若最弱势群体的净收入跌破生活底线（< 1200 €），即便左侧总财富堆积如山，天平也将判定为非正义秩序。"
                      : "Im Urzustand verhalten sich Individuen risikoavers. Fällt das Einkommen der Schwächsten unter das Existenzminimum (1.200 €), wird die Verfassungsordnung als ungerecht verworfen – selbst bei enormem Gesamtwohlstand."}
                  </p>
                </div>
                <div className="px-3 py-2 bg-[var(--paper)] border border-[var(--line)] rounded-sm text-center shrink-0">
                  <span className="text-[10px] uppercase font-mono text-[var(--muted)] block">
                    {isZh ? "生产力激励乘数" : "Produktivitätsfaktor"}
                  </span>
                  <span className="text-base font-mono font-bold text-[var(--ink)]">
                    {(results.productivityFactor * 100).toFixed(1)}%
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Tab 2: 5阶层净收入柱状图 (Nettoeinkommen) */}
          {activeTab === "einkommen" && (
            <div className="border border-[var(--line)] bg-[var(--paper-subtle)] p-4 rounded-sm flex flex-col gap-3">
              <div className="flex items-center justify-between text-xs font-mono text-[var(--muted)] border-b border-[var(--line)] pb-2">
                <span>{isZh ? "五大阶层税后净收入（Nettoeinkommen in EUR/Monat）" : "Verteilung der Nettoeinkommen nach Steuern & Transfers"}</span>
                <span className="flex items-center gap-2">
                  <span className="inline-block w-3 h-0.5 bg-[var(--ink)]"></span>
                  <span>{isZh ? "底线阈值 (1200€)" : "Existenzminimum (1.200€)"}</span>
                </span>
              </div>

              {/* 直方柱阵列 */}
              <div className="flex flex-col gap-3 py-2">
                {results.classes.map((item) => {
                  const isAssigned = isVeilLifted && assignedClassId === item.info.id;
                  const isBelowFloor = item.netIncome < results.existenzMinimumThreshold;
                  // 最大标尺 14000 €
                  const barWidthPercent = Math.min(100, (item.netIncome / 12000) * 100);

                  return (
                    <div
                      key={item.info.id}
                      className={`p-2.5 rounded-sm border transition-all ${
                        isAssigned
                          ? "bg-[var(--paper)] border-[var(--ink)] ring-1 ring-[var(--ink)]"
                          : "border-[var(--line)] bg-[var(--paper)]"
                      }`}
                    >
                      <div className="flex items-center justify-between text-xs font-mono mb-1">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-[var(--ink)]">
                            {isZh ? item.info.nameZH : item.info.nameDE}
                          </span>
                          <span className="text-[10px] text-[var(--muted)]">({item.info.shortDE})</span>
                          {isAssigned && (
                            <span className="px-1.5 py-0.2 text-[10px] bg-[var(--ink)] text-[var(--paper)] font-bold rounded-xs">
                              {isZh ? "★ 您的真实身份" : "★ Ihre Identität"}
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-2 font-mono">
                          <span className="text-[var(--muted)] line-through text-[11px]">
                            {item.marketIncome} €
                          </span>
                          <span
                            className={`font-bold ${
                              isBelowFloor ? "text-[var(--ink)] underline decoration-dotted" : "text-[var(--ink)]"
                            }`}
                          >
                            {item.netIncome} € / {isZh ? "月" : "M"}
                          </span>
                        </div>
                      </div>

                      {/* 柱状条与相对位置 */}
                      <div className="w-full bg-[var(--paper-subtle)] h-4 rounded-xs border border-[var(--line)] relative overflow-hidden">
                        {/* 1200 欧参考垂线 (1200 / 12000 = 10%) */}
                        <div
                          className="absolute top-0 bottom-0 w-[1.5px] bg-[var(--muted)] z-10 opacity-70"
                          style={{ left: "10%" }}
                        />
                        {/* 实际净收入条 */}
                        <div
                          className={`h-full transition-all duration-300 ${
                            isBelowFloor ? "bg-[var(--muted)]" : "bg-[var(--ink)]"
                          }`}
                          style={{ width: `${Math.max(2, barWidthPercent)}%` }}
                        />
                      </div>

                      {/* 角色速写小字 */}
                      <div className="text-[11px] text-[var(--muted)] font-serif mt-1 flex items-center justify-between">
                        <span>{isZh ? item.info.rolePersonaZH : item.info.rolePersonaDE}</span>
                        <span className="font-mono text-[10px]">
                          {item.taxPaid > 0 ? `-${item.taxPaid}€ St.` : ""}
                          {item.transferReceived > 0 ? ` +${item.transferReceived}€ Tr.` : ""}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Tab 3: 洛伦兹曲线与 Gini (Lorenz & Gini) */}
          {activeTab === "lorenz" && (
            <div className="border border-[var(--line)] bg-[var(--paper-subtle)] p-4 rounded-sm flex flex-col md:flex-row items-center gap-6">
              {/* SVG 洛伦兹图 (240x240) */}
              <div className="w-56 h-56 shrink-0 relative bg-[var(--paper)] border border-[var(--line)] p-2">
                <svg viewBox="0 0 200 200" className="w-full h-full">
                  {/* 网格发丝线 */}
                  <line x1="0" y1="50" x2="200" y2="50" stroke="var(--line)" strokeWidth="0.8" strokeDasharray="2 2" />
                  <line x1="0" y1="100" x2="200" y2="100" stroke="var(--line)" strokeWidth="0.8" strokeDasharray="2 2" />
                  <line x1="0" y1="150" x2="200" y2="150" stroke="var(--line)" strokeWidth="0.8" strokeDasharray="2 2" />
                  <line x1="50" y1="0" x2="50" y2="200" stroke="var(--line)" strokeWidth="0.8" strokeDasharray="2 2" />
                  <line x1="100" y1="0" x2="100" y2="200" stroke="var(--line)" strokeWidth="0.8" strokeDasharray="2 2" />
                  <line x1="150" y1="0" x2="150" y2="200" stroke="var(--line)" strokeWidth="0.8" strokeDasharray="2 2" />

                  {/* 45度完全平等对角线 */}
                  <line x1="0" y1="200" x2="200" y2="0" stroke="var(--muted)" strokeWidth="1.5" strokeDasharray="3 3" />

                  {/* 洛伦兹实际分布曲线 */}
                  {/* SVG 坐标：(0, 200) 是原点；(200, 0) 是 (100%, 100%) */}
                  <path
                    d={`M 0 200 ${results.lorenzPoints
                      .map((pt) => `L ${(pt.p / 100) * 200} ${200 - (pt.l / 100) * 200}`)
                      .join(" ")}`}
                    fill="none"
                    stroke="var(--ink)"
                    strokeWidth="2.5"
                  />

                  {/* 数据锚点 */}
                  {results.lorenzPoints.map((pt, i) => (
                    <circle
                      key={i}
                      cx={(pt.p / 100) * 200}
                      cy={200 - (pt.l / 100) * 200}
                      r="3"
                      fill="var(--paper)"
                      stroke="var(--ink)"
                      strokeWidth="1.5"
                    />
                  ))}
                </svg>
              </div>

              {/* 核心指标与哲学评估 */}
              <div className="flex-1 flex flex-col gap-3 text-xs font-serif">
                <div>
                  <span className="text-xs uppercase font-mono text-[var(--muted)] block">
                    {isZh ? "基尼系数 (Gini-Koeffizient)" : "Gini-Koeffizient (Ungleichheitsmaß)"}
                  </span>
                  <div className="text-2xl font-mono font-bold text-[var(--ink)] mt-0.5">
                    {results.giniCoefficient}
                  </div>
                  <p className="text-[var(--muted)] mt-1 leading-relaxed">
                    {isZh
                      ? "0 = 绝对平等（各阶层分得完全一致）；1 = 极端不平等（1个人占有全部财富）。罗尔斯并不追求 Gini=0，而是允许适度不平等以激发创新，前提是此不平等能最大化最穷者的福祉。"
                      : "Rawls fordert keinen Gini von 0,0 (Gleichmacherei). Ungleichheiten sind legitim, solange sie das reale Wohl der am schlechtesten gestellten Gruppe maximieren (Differenzprinzip)."}
                  </p>
                </div>

                <div className="border-t border-[var(--line)] pt-2 text-[11px] font-mono flex flex-col gap-1 text-[var(--muted)]">
                  <div className="flex justify-between">
                    <span>{isZh ? "底层10%所得份额:" : "Anteil der untersten 10%:"}</span>
                    <span className="font-bold text-[var(--ink)]">
                      {((results.minIncome * 0.1 * 100) / results.totalGDP).toFixed(1)}%
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>{isZh ? "顶层5%所得份额:" : "Anteil der obersten 5%:"}</span>
                    <span className="font-bold text-[var(--ink)]">
                      {((results.classes[0].netIncome * 0.05 * 100) / results.totalGDP).toFixed(1)}%
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Tab 4: 会考提分台 (Abitur-Analyse & 15 NP) */}
          {activeTab === "klausur" && (
            <div className="border border-[var(--line)] bg-[var(--paper-subtle)] p-4 rounded-sm flex flex-col gap-4 text-xs font-serif">
              <div className="border-b border-[var(--line)] pb-2 flex items-center justify-between">
                <div>
                  <span className="font-mono text-[10px] uppercase text-[var(--muted)]">
                    {isZh ? "北威州高考评分标准 (KLP NRW EF/Q1)" : "Abitur-Erwartungshorizont (AFB III)"}
                  </span>
                  <h4 className="text-sm font-bold font-serif text-[var(--ink)]">
                    Operator: *Beurteilen* (Gerechtigkeit & Verteilungskonflikte)
                  </h4>
                </div>
                <span className="px-2 py-0.5 text-[10px] font-mono border border-[var(--line)] bg-[var(--paper)]">
                  15 NP Muster-Antwort
                </span>
              </div>

              <div className="bg-[var(--paper)] p-3 border border-[var(--line)] rounded-sm space-y-2">
                <p className="font-bold text-[var(--ink)]">
                  {isZh
                    ? "【典型设问】：评判罗尔斯差异原则相较于功利主义是否更具正义性与可行性。"
                    : "Leitfrage: Beurteilen Sie, inwiefern das Differenzprinzip von John Rawls dem Utilitarismus bei der Begründung einer gerechten Wirtschaftsordnung überlegen ist."}
                </p>
                <p className="text-[var(--muted)] leading-relaxed">
                  {isZh ? (
                    <>
                      <strong>踩分关键点（15 NP 评分话术）：</strong>
                      <br />
                      1. <strong>无知之幕的规范性力量：</strong> 在排除个人禀赋（Angeborene Begabungen）与家庭阶层背景后，原初状态的决策者处于完全不确定性（Unsicherheit）。理性的个人根据<strong>最大最小准则（Maximin-Regel）</strong>，会优先将可能的最坏结果（Worst-Case-Szenario）最大化，因为没人敢赌自己不会成为那丧失劳动能力的 10%。
                      <br />
                      2. <strong>对功利主义的决定性批判：</strong> 功利主义追求总效用极大（∑ U_i），理论上允许牺牲最少数群体的生存尊严以换取多数人的富足，违反了康德<strong>“人是目的而非手段”（Menschheitszweckformel）</strong>的尊严底线。罗尔斯通过第一原则（自由原则）和第二原则（差异原则）为基本权利设立了刚性护栏。
                      <br />
                      3. <strong>相较激进平均主义的现实性：</strong> 罗尔斯承认效率激励（Anreizsystem）的必要性，允许适度不平等，只要这种不平等最终反哺最底层（z.B. durch Steuertransfers）。
                    </>
                  ) : (
                    <>
                      <strong>Erwartungshorizont & Argumentationsschritte:</strong>
                      <br />
                      1. <strong>Normative Kraft des Schleiers:</strong> Unter dem Schleier des Nichtwissens erzwingt die vollständige Unsicherheit über eigene Talente und soziale Herkunft die <strong>Maximin-Regel</strong>. Rationale Akteure minimieren das Worst-Case-Risiko, anstatt auf eine elitäre Position zu wetten.
                      <br />
                      2. <strong>Kritik am Utilitarismus:</strong> Der Utilitarismus opfert das Wohl einzelner Schwacher zugunsten einer höheren Nutzensumme. Dies verletzt das Kantsche Instrumentalisierungsverbot. Rawls schützt die Menschenwürde durch absolute Priorität gleicher Grundfreiheiten.
                      <br />
                      3. <strong>Abgrenzung zum Egalitarismus:</strong> Rawls legitimiert Ungleichheiten funktional: Anreize für Leistungsträger sind gerecht, solange der resultierende Wohlstandszuwachs das Existenzniveau der am schlechtesten Gestellten anhebt.
                    </>
                  )}
                </p>
              </div>
            </div>
          )}

          {/* 揭开面纱后的抽签身份透镜 (Rollen-Auflösung) */}
          {isVeilLifted && userPersona && (
            <div className="border-2 border-[var(--ink)] bg-[var(--paper)] p-4 rounded-sm flex flex-col gap-2">
              <div className="flex items-center justify-between border-b border-[var(--line)] pb-1.5">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[var(--ink)]" />
                  <span className="font-bold text-xs uppercase font-mono tracking-wider">
                    {isZh ? "您的抽得社会身份" : "Ihre gezogene gesellschaftliche Identität"}
                  </span>
                </div>
                <span className="text-xs font-mono text-[var(--muted)]">
                  {isZh ? "人口占比" : "Bevölkerungsanteil"}: {(userPersona.info.populationShare * 100).toFixed(0)}%
                </span>
              </div>

              <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pt-1">
                <div>
                  <h4 className="text-base font-bold font-serif text-[var(--ink)]">
                    {isZh ? userPersona.info.nameZH : userPersona.info.nameDE}
                  </h4>
                  <p className="text-xs text-[var(--muted)] font-serif mt-0.5">
                    {isZh ? userPersona.info.rolePersonaZH : userPersona.info.rolePersonaDE}
                  </p>
                </div>

                <div className="flex items-center gap-4 bg-[var(--paper-subtle)] px-3 py-2 border border-[var(--line)] rounded-sm">
                  <div>
                    <span className="text-[10px] font-mono text-[var(--muted)] block">
                      {isZh ? "原市场毛收入" : "Markteinkommen"}
                    </span>
                    <span className="text-xs font-mono line-through text-[var(--muted)]">
                      {userPersona.marketIncome} €
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-[var(--muted)] block">
                      {isZh ? "最终净收入" : "Nettoeinkommen"}
                    </span>
                    <span className="text-sm font-mono font-bold text-[var(--ink)]">
                      {userPersona.netIncome} € / {isZh ? "月" : "M"}
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-[var(--muted)] block">
                      {isZh ? "尊严底线状态" : "Status"}
                    </span>
                    <span className="text-xs font-mono font-bold">
                      {userPersona.netIncome >= results.existenzMinimumThreshold
                        ? isZh
                          ? "✓ 尊严有保障"
                          : "✓ Gesichert"
                        : isZh
                        ? "✕ 跌破贫困线"
                        : "✕ Verarmt"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* 右侧调控与理论体系选择区 (4 Cols) */}
        <div className="lg:col-span-4 flex flex-col gap-4">
          {/* 1. 经典体制预设切换 (Presets) */}
          <div className="border border-[var(--line)] bg-[var(--paper-subtle)] p-3.5 rounded-sm">
            <span className="text-xs font-mono uppercase tracking-wider text-[var(--muted)] block mb-2 font-bold">
              {isZh ? "经典分配哲学体系 (Presets)" : "Philosophische Verteilungsmodelle"}
            </span>

            <div className="flex flex-col gap-2">
              {PRESET_MODELS.map((preset) => {
                const isSelected = activeModelId === preset.id;
                return (
                  <button
                    key={preset.id}
                    onClick={() => handleSelectPreset(preset)}
                    className={`text-left p-2.5 rounded-sm border transition-all ${
                      isSelected
                        ? "bg-[var(--paper)] border-[var(--ink)] ring-1 ring-[var(--ink)]"
                        : "bg-[var(--paper)] border-[var(--line)] hover:border-[var(--ink)]"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold font-serif text-[var(--ink)]">
                        {isZh ? preset.nameZH : preset.nameDE}
                      </span>
                      <span className="text-[10px] font-mono text-[var(--muted)]">
                        t={preset.taxRatePercent}%
                      </span>
                    </div>
                    <span className="text-[11px] text-[var(--muted)] font-serif block mt-0.5 line-clamp-1">
                      {isZh ? preset.subtitleZH : preset.subtitleDE}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 2. 参数自由调节面板 (Slider Controls) */}
          <div className="border border-[var(--line)] bg-[var(--paper-subtle)] p-3.5 rounded-sm flex flex-col gap-4">
            <span className="text-xs font-mono uppercase tracking-wider text-[var(--muted)] block font-bold">
              {isZh ? "自由参数调节 (Stellschrauben)" : "Steuer- & Transferpolitik"}
            </span>

            {/* 滑块 1: 再分配税率 */}
            <div className="flex flex-col gap-1.5">
              <div className="flex justify-between items-center text-xs font-mono">
                <label htmlFor={sliderTaxId} className="text-[var(--ink)]">
                  {isZh ? "平均/累进税率 (Steuersatz)" : "Umverteilungs-Steuersatz"}
                </label>
                <span className="font-bold text-[var(--ink)]">{taxRate}%</span>
              </div>
              <input
                id={sliderTaxId}
                type="range"
                min="0"
                max="85"
                step="1"
                value={taxRate}
                onChange={(e) => {
                  setTaxRate(Number(e.target.value));
                  setActiveModelId("benutzerdefiniert");
                }}
                className="w-full accent-[var(--ink)] cursor-pointer"
              />
              <span className="text-[10px] text-[var(--muted)] font-serif">
                {isZh
                  ? "过高税率（>40%）会产生无谓损失并削弱生产力激励。"
                  : "Hohe Steuern dämpfen die Leistungsbereitschaft (Laffer-Kurve)."}
              </span>
            </div>

            {/* 滑块 2: 底层保底转移比例 */}
            <div className="flex flex-col gap-1.5 border-t border-[var(--line)] pt-3">
              <div className="flex justify-between items-center text-xs font-mono">
                <label htmlFor={sliderFloorId} className="text-[var(--ink)]">
                  {isZh ? "底线救济权重 (Grundsicherungs-Fokus)" : "Fokus auf Schlechtestgestellte"}
                </label>
                <span className="font-bold text-[var(--ink)]">{basicFloor}%</span>
              </div>
              <input
                id={sliderFloorId}
                type="range"
                min="5"
                max="95"
                step="1"
                value={basicFloor}
                onChange={(e) => {
                  setBasicFloor(Number(e.target.value));
                  setActiveModelId("benutzerdefiniert");
                }}
                className="w-full accent-[var(--ink)] cursor-pointer"
              />
              <span className="text-[10px] text-[var(--muted)] font-serif">
                {isZh
                  ? "权重越高，再分配资金越集中于最底层 10% 群体。"
                  : "Lenkt Steuermittel gezielt an die schwächste Schicht (Maximin)."}
              </span>
            </div>
          </div>

          {/* 3. 核心准则卡片 (Maximin-Regel) */}
          <div className="border border-[var(--line)] bg-[var(--paper)] p-3.5 rounded-sm text-xs font-serif">
            <span className="text-[10px] font-mono uppercase text-[var(--muted)] block mb-1">
              {isZh ? "数学准则：最大最小化 (Maximin-Regel)" : "Das mathematische Maximin-Prinzip"}
            </span>
            <div className="p-2 bg-[var(--paper-subtle)] border border-[var(--line)] rounded-sm my-2 text-center">
              <MathHtml
                code="\max \min_{i \in \{1,\dots,n\}} U_i(x)"
                display={true}
                cacheKey="rawls-maximin-formula"
              />
            </div>
            <p className="text-[var(--muted)] leading-relaxed">
              {isZh
                ? "“在面对完全未知风险时，理性的决策是使可能出现的最糟糕结局最优化。”"
                : "„Wähle jene Verfassungsordnung, deren schlechtestmögliches Ergebnis besser ist als das schlechtestmögliche Ergebnis jeder anderen Alternative.“"}
            </p>
          </div>
        </div>
      </div>

      {/* 底部标准四联排卡片 (01/Theorie, 02/Abitur, 03/CN-Methode, 04/KI-Tutor) */}
      <footer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-6 pt-6 border-t border-[var(--line)]">
        {/* 卡片 1: Theorie */}
        <div className="p-3 bg-[var(--paper-subtle)] border border-[var(--line)] rounded-sm text-xs font-serif">
          <div className="font-mono text-[10px] uppercase text-[var(--muted)] mb-1">
            01 / Theorie & Formel
          </div>
          <div className="font-bold text-[var(--ink)] mb-1">
            {isZh ? "两大正义原则次序" : "Vorrangregeln der Prinzipien"}
          </div>
          <p className="text-[var(--muted)] leading-relaxed text-[11px]">
            {isZh
              ? "词典式优先（Lexikalischer Vorrang）：第1原则（自由原则）绝对优先于第2原则（差异原则与机会平等）。基本人权不可用经济效率交换。"
              : "Lexikalischer Vorrang: Das Freiheitsprinzip hat absoluten Vorrang vor dem Differenzprinzip. Grundfreiheiten dürfen nicht für Wohlstand geopfert werden."}
          </p>
        </div>

        {/* 卡片 2: Abitur */}
        <div className="p-3 bg-[var(--paper-subtle)] border border-[var(--line)] rounded-sm text-xs font-serif">
          <div className="font-mono text-[10px] uppercase text-[var(--muted)] mb-1">
            02 / Abitur KLP NRW
          </div>
          <div className="font-bold text-[var(--ink)] mb-1">
            {isZh ? "EF/Q1 哲学核心考点" : "Inhaltsfeld 3: Das Handeln"}
          </div>
          <p className="text-[var(--muted)] leading-relaxed text-[11px]">
            {isZh
              ? "会考必考两难：比较罗尔斯与诺齐克对‘税收是否正当’的论证；分析福利国家体制下的制度伦理基础。"
              : "Schwerpunktthema: Verteilungsgerechtigkeit im Sozialstaat. Vergleich zwischen Rawls (Maximin) und Robert Nozick (Libertarismus)."}
          </p>
        </div>

        {/* 卡片 3: CN-Methode */}
        <div className="p-3 bg-[var(--paper-subtle)] border border-[var(--line)] rounded-sm text-xs font-serif">
          <div className="font-mono text-[10px] uppercase text-[var(--muted)] mb-1">
            03 / 🇨🇳 CN-Methode
          </div>
          <div className="font-bold text-[var(--ink)] mb-1">
            {isZh ? "博弈智慧：切蛋糕者最后拿" : "Kuchen-Teilen-Paradigma"}
          </div>
          <p className="text-[var(--muted)] leading-relaxed text-[11px]">
            {isZh
              ? "中国古代分配博弈与法家‘定分止争’的极致体现：规则制定者必须承担规则落在他身上最不利的结果，从而逼出最客观中立的公道。"
              : "Wer den Kuchen schneidet, nimmt das letzte Stück. Die beste institutionelle Absicherung gegen Eigennutz und Korruption."}
          </p>
        </div>

        {/* 卡片 4: KI-Tutor */}
        <div className="p-3 bg-[var(--paper-subtle)] border border-[var(--line)] rounded-sm text-xs font-serif">
          <div className="font-mono text-[10px] uppercase text-[var(--muted)] mb-1">
            04 / KI-Tutor Dialog
          </div>
          <div className="font-bold text-[var(--ink)] mb-1">
            {isZh ? "苏格拉底追问" : "Sokratische Prüfungsfrage"}
          </div>
          <p className="text-[var(--muted)] leading-relaxed text-[11px]">
            {isZh
              ? "“如果你确信自己具备超高天赋且极度勤奋，你还会赞同无知之幕下的最大最小准则吗？试论述天资是否属于共有财产。”"
              : "„Wenn Sie wüssten, dass Sie hochbegabt sind: Wäre es gerecht, Ihre Begabungen als gesellschaftliches Gemeinschaftsgut zu betrachten?“"}
          </p>
        </div>
      </footer>
    </div>
  );
}
