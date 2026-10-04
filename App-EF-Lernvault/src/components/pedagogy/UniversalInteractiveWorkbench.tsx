// UniversalInteractiveWorkbench — 通用多学科交互实验工作台
// 专为各学科扩展实验提供高保真实时仿真、参数交互、数学/科学公式联动与考点深度剖析
import { useState, useMemo } from "react";
import type { Lang } from "../../i18n";
import type { SimEntry } from "../../modules/laborRegistry";

export interface UniversalWorkbenchProps {
  sim: SimEntry;
  lang: Lang;
  studioMode?: boolean;
  onExportFinding?: (text: string) => void;
}

export function UniversalInteractiveWorkbench({
  sim,
  lang,
  studioMode: _studioMode = false,
  onExportFinding,
}: UniversalWorkbenchProps) {
  const de = lang === "de";
  const [paramA, setParamA] = useState<number>(50); // 主调节参数 (0 - 100)
  const [paramB, setParamB] = useState<number>(50); // 次调节参数 (0 - 100)

  // 根据不同实验 ID 计算动态物理/化学/数学指标
  const calculatedData = useMemo(() => {
    const valA = paramA / 100;
    const valB = paramB / 100;

    switch (sim.id) {
      // 生物：光合作用
      case "bio-fotosynthese": {
        const licht = paramA; // 光照强度
        const co2 = paramB;   // CO2 浓度
        const rate = Math.round(100 * (1 - Math.exp(-licht / 30)) * (1 - Math.exp(-co2 / 35)));
        const atp = Math.round(rate * 1.2);
        return {
          rateLabelDE: "Fotosyntheserate (relativ)",
          rateLabelZH: "光合作用相对净速率",
          rateValue: `${rate} %`,
          subLabelDE: "ATP & NADPH Bildung",
          subLabelZH: "光反应同化力产出",
          subValue: `${atp} mol/h`,
          graphY: rate,
          insightDE: licht < 20 ? "Licht ist der limitierende Faktor!" : co2 < 20 ? "CO2 ist der limitierende Faktor!" : "Lichtsättigung erreicht.",
          insightZH: licht < 20 ? "当前光照为关键限制因子（光反应速率受限）！" : co2 < 20 ? "CO2 为关键限制因子（暗反应受限）！" : "达到光饱和状态，酶催化能力已达上限。",
        };
      }
      // 生物：酶动力学
      case "bio-enzymkinetik": {
        const s = paramA; // 底物浓度 [S]
        const km = 25;
        const vmax = 100;
        const v = Math.round((vmax * s) / (km + s));
        return {
          rateLabelDE: "Reaktionsgeschwindigkeit v",
          rateLabelZH: "酶催化反应速率 v",
          rateValue: `${v} µmol/s`,
          subLabelDE: "Substratkonzentration [S]",
          subLabelZH: "底物浓度 [S]",
          subValue: `${s} mmol/L`,
          graphY: v,
          insightDE: s < km ? "v steigt proportional zu [S] (1. Ordnung)" : "Sättigungskinetik: v nähert sich Vmax (0. Ordnung)",
          insightZH: s < km ? "底物浓度低：反应呈一级动力学（v 与 [S] 线性正比）" : "底物高浓度饱和：活性中心占满，呈零级动力学并趋向 Vmax",
        };
      }
      // 生物：捕食者-猎物方程
      case "bio-oekologie-raeuber-beute": {
        const beute = Math.round(80 + 40 * Math.sin((paramA / 100) * 2 * Math.PI));
        const raeuber = Math.round(50 + 35 * Math.sin((paramA / 100) * 2 * Math.PI - 1.2));
        return {
          rateLabelDE: "Beute-Population (N1)",
          rateLabelZH: "猎物种群数量 N1",
          rateValue: `${beute} Individuen`,
          subLabelDE: "Räuber-Population (N2)",
          subLabelZH: "捕食者种群数量 N2",
          subValue: `${raeuber} Individuen`,
          graphY: beute,
          insightDE: "Lotka-Volterra Regel 1: Periodische Phasenverschiebung der Populationen.",
          insightZH: "洛特卡-沃尔泰拉第一定律：捕食者与猎物种群呈现固定周期性波动，捕食者峰值落后于猎物。",
        };
      }
      // 化学：原电池
      case "chemie-galvanische-zelle": {
        const cZn = (paramA / 50) + 0.01;
        const cCu = (paramB / 50) + 0.01;
        const e0 = 1.10; // V
        const deltaE = +(e0 + 0.0295 * Math.log10(cCu / cZn)).toFixed(3);
        return {
          rateLabelDE: "Zellspannung U_Zell (Nernst)",
          rateLabelZH: "原电池电动势 U_Zell (能斯特方程)",
          rateValue: `${deltaE} V`,
          subLabelDE: "Konzentrationsquotient [Cu²⁺]/[Zn²⁺]",
          subLabelZH: "离子浓度比 [Cu²⁺]/[Zn²⁺]",
          subValue: (cCu / cZn).toFixed(2),
          graphY: Math.round(deltaE * 50),
          insightDE: deltaE > 1.10 ? "Erhöhtes Cu²⁺ treibt die Reaktion nach rechts (höhere Spannung)" : "Zunehmendes Zn²⁺ verringert die Potentialdifferenz",
          insightZH: deltaE > 1.10 ? "正极 Cu²⁺ 浓度升高增强吸电子势，电动势增大" : "负极 Zn²⁺ 离子富集反向抑制锌溶解，电池电动势减小",
        };
      }
      // 化学：缓冲溶液
      case "chemie-puffer-hasselbalch": {
        const cBase = Math.max(0.01, paramA / 100);
        const cSaeure = Math.max(0.01, paramB / 100);
        const pKs = 4.75;
        const ph = +(pKs + Math.log10(cBase / cSaeure)).toFixed(2);
        return {
          rateLabelDE: "pH-Wert des Puffers",
          rateLabelZH: "缓冲溶液实时 pH 值",
          rateValue: `${ph}`,
          subLabelDE: "Pufferkapazität",
          subLabelZH: "缓冲对浓度比 [A⁻]/[HA]",
          subValue: (cBase / cSaeure).toFixed(2),
          graphY: Math.round(ph * 10),
          insightDE: Math.abs(ph - pKs) < 0.2 ? "Idealer Pufferbereich: Maximale Pufferkapazität bei pH ≈ pKs!" : "Geringere Pufferwirkung bei extremen Verhältnissen.",
          insightZH: Math.abs(ph - pKs) < 0.2 ? "最佳缓冲窗口：当 [A⁻] = [HA] 时，pH = pKs，具备极强抗酸抗碱缓冲能力！" : "浓度严重失衡，缓冲能力显著下降。",
        };
      }
      // 数学：定积分面积
      case "mathe-integral-flaeche": {
        const nTrapeze = Math.round(2 + (paramA / 100) * 48); // 分割数
        // f(x) = x^2, Exaktes Integral von 0 bis 3 = 3^3 / 3 = 9
        const exakt = 9.0;
        const riemann = +(exakt * (1 - 1 / (nTrapeze * 1.5))).toFixed(3);
        const fehler = +Math.abs(exakt - riemann).toFixed(3);
        return {
          rateLabelDE: "Riemann-Summe / Integralfläche",
          rateLabelZH: "黎曼和近似计算面积",
          rateValue: `${riemann} FE`,
          subLabelDE: "Exakter Grenzwert ∫₀³ x² dx",
          subLabelZH: "真实定积分值与绝对误差",
          subValue: `9.000 FE (Δ = ${fehler})`,
          graphY: Math.round((riemann / 9) * 100),
          insightDE: `Bei n = ${nTrapeze} Streifen konvergiert die Untersumme gegen den exakten Flächeninhalt!`,
          insightZH: `分割数 n = ${nTrapeze} 时，微元梯形面积收敛逼近理论定积分真值，误差急剧缩小！`,
        };
      }
      // 数学：马尔可夫链
      case "mathe-markov-ketten": {
        const p11 = +(0.5 + (paramA / 200)).toFixed(2); // 留存率
        const p22 = +(0.5 + (paramB / 200)).toFixed(2);
        // 稳态分布 v1*p12 = v2*p21
        const p12 = +(1 - p11).toFixed(2);
        const p21 = +(1 - p22).toFixed(2);
        const v1 = +((p21 / (p12 + p21)) * 100).toFixed(1);
        const v2 = +(100 - v1).toFixed(1);
        return {
          rateLabelDE: "Stationärer Fixvektor (Zustand 1)",
          rateLabelZH: "马尔可夫稳态分布 (状态 1 占比)",
          rateValue: `${v1} %`,
          subLabelDE: "Stationärer Zustand 2",
          subLabelZH: "马尔可夫稳态 (状态 2 占比)",
          subValue: `${v2} %`,
          graphY: v1,
          insightDE: "Unabhängig vom Startvektor konvergiert das System gegen den eindeutigen Fixvektor M*v = v.",
          insightZH: "无论初始用户处于何种状态，随矩阵高次幂演化，系统必定收敛于唯一平衡固定向量 M·v = v。",
        };
      }
      // 社科：宏观经济周期
      case "sowi-konjunktur-zyklus": {
        const bip = +(1.5 + 2.5 * Math.sin((paramA / 100) * 2 * Math.PI)).toFixed(1);
        const alq = +(6.0 - 1.8 * Math.sin((paramA / 100) * 2 * Math.PI)).toFixed(1);
        const phase = paramA < 25 ? (de ? "Aufschwung (Expansion)" : "复苏回升期 (Expansion)") : paramA < 50 ? (de ? "Boom (Hochkonjunktur)" : "繁荣过热期 (Boom)") : paramA < 75 ? (de ? "Abschwung (Rezession)" : "衰退衰退期 (Rezession)") : (de ? "Tiefstand (Depression)" : "低谷萧条期 (Depression)");
        return {
          rateLabelDE: "BIP-Wachstum (real)",
          rateLabelZH: "实际 GDP 增长率",
          rateValue: `${bip} %`,
          subLabelDE: "Arbeitslosenquote (ALQ)",
          subLabelZH: "失业率 ALQ",
          subValue: `${alq} %`,
          graphY: Math.round((bip + 2) * 20),
          insightDE: `Aktuelle Konjunkturphase: ${phase}. Antizyklische Fiskalpolitik erforderlich!`,
          insightZH: `当前宏观阶段：【${phase}】。需采取逆周期凯恩斯财政政策与货币反向干预！`,
        };
      }
      // 哲学：康德定言命令
      case "philo-kant-kategorischer": {
        const widerspruchDenken = paramA > 40;
        const widerspruchWollen = paramB > 50;
        const isValid = !widerspruchDenken && !widerspruchWollen;
        return {
          rateLabelDE: "Universalisierungs-Test",
          rateLabelZH: "普遍法则四步检验结果",
          rateValue: isValid ? (de ? "Kategorisch Pflicht" : "通过：构成绝对义务") : (de ? "Maxime unzulässig" : "不通过：自相矛盾"),
          subLabelDE: "Widerspruch im Denken / Wollen",
          subLabelZH: "思维矛盾 / 意志矛盾检验",
          subValue: widerspruchDenken ? (de ? "Denken unmöglich" : "逻辑思维自毁") : widerspruchWollen ? (de ? "Wollen widersprüchlich" : "意志不能理性欲求") : (de ? "Widerspruchsfrei" : "完全无矛盾"),
          graphY: isValid ? 100 : 20,
          insightDE: isValid ? "Maxime kann widerspruchsfrei als allgemeines Naturgesetz gewollt werden." : "Die Maxime zerstört sich bei Universalisierung selbst (z. B. lügenhaftes Versprechen).",
          insightZH: isValid ? "准则可无矛盾地被意愿为普遍自然法则（符合康德人权与道德尊严基石）。" : "准则普遍化后产生逻辑自我消亡（如虚假承诺若普遍化，信任制度将瞬间瓦解）！",
        };
      }
      // 生物：细胞呼吸
      case "bio-zellatmung": {
        const o2 = paramA;
        const glucose = paramB;
        const atp = Math.min(32, Math.round((o2 / 100) * (glucose / 100) * 32));
        const eta = Math.round((atp / 32) * 40);
        return {
          rateLabelDE: "ATP-Nettogewinn pro Mol Glucose",
          rateLabelZH: "每摩尔葡萄糖净产 ATP",
          rateValue: `${atp} mol ATP`,
          subLabelDE: "Chemiosmotischer Wirkungsgrad",
          subLabelZH: "化学渗透能量转化效率",
          subValue: `${eta} %`,
          graphY: Math.round((atp / 32) * 100),
          insightDE: atp > 28 ? "Vollständige aerobe Oxidation via Atmungskette!" : "Gärung / unvollständiger Abbau durch O2-Mangel.",
          insightZH: atp > 28 ? "氧气充足：经柠檬酸循环与呼吸链氧化磷酸化生成约 30-32 ATP！" : "缺氧限制：转向乳酸/酒精发酵，净得仅 2 ATP，底物利用率低下。",
        };
      }
      // 生物：基因双杂交
      case "bio-genetik-kreuzung": {
        const rekombinant = Math.round(((3 + 3) / 16) * 100);
        return {
          rateLabelDE: "Phänotypisches Spaltungsverhältnis",
          rateLabelZH: "F2 代经典表型分离比",
          rateValue: "9 : 3 : 3 : 1",
          subLabelDE: "Rekombinanten-Anteil",
          subLabelZH: "重组表型个体期望比例",
          subValue: `${rekombinant} % (6/16)`,
          graphY: Math.round((paramA / 100) * 80 + 20),
          insightDE: "3. Mendelsche Regel: Unabhängige Vererbung und Neukombination zweier nicht-gekoppelter Gene.",
          insightZH: "孟德尔第三定律（自由组合定律）：非同源染色体上的两对等位基因在配子形成时独立分配，形成全新表现型组合。",
        };
      }
      // 生物：化学突触
      case "bio-synapse": {
        const ach = paramA;
        const blocker = paramB;
        const epsp = Math.max(0, +(15 * (ach / 100) * (1 - blocker / 100)).toFixed(1));
        return {
          rateLabelDE: "EPSP-Amplitude an Postsynapse",
          rateLabelZH: "突触后膜兴奋性突触后电位 (EPSP)",
          rateValue: `+${epsp} mV`,
          subLabelDE: "Transmitter-Rezeptor-Besetzung",
          subLabelZH: "受体结合率与抑制剂拮抗",
          subValue: `${Math.round(ach * (1 - blocker / 100))}%`,
          graphY: Math.round((epsp / 15) * 100),
          insightDE: epsp > 10 ? "Schwellenwert überschritten: Neues Aktionspotenzial ausgelöst!" : "Unterschwellig oder Rezeptor durch Neurotoxin blockiert.",
          insightZH: epsp > 10 ? "超过阈电位：轴突始段触发全或无动作电位！" : "受体被毒素（如箭毒 Curare）竞争性阻断或乙酰胆碱过少，传导阻滞。",
        };
      }
      // 生物：PCR 基因扩增
      case "bio-dna-pcr": {
        const cycles = Math.round(1 + (paramA / 100) * 34);
        const copies = cycles <= 30 ? Math.pow(2, cycles) : 1e9;
        const copyStr = copies >= 1e6 ? `${(copies / 1e6).toFixed(1)} Mio.` : `${copies}`;
        return {
          rateLabelDE: `DNA-Kopien nach ${cycles} Zyklen`,
          rateLabelZH: `经历 ${cycles} 轮 PCR 后的 DNA 拷贝数`,
          rateValue: copyStr,
          subLabelDE: "Amplifikationsfaktor",
          subLabelZH: "理论指数扩增倍率",
          subValue: `2^${cycles}`,
          graphY: Math.min(100, Math.round((cycles / 35) * 100)),
          insightDE: "Exponentielle Vervielfältigung: N(n) = N0 * 2^n durch thermostabile Taq-Polymerase.",
          insightZH: "指数级扩增规律：每轮 95°C变性、55°C退火、72°C延伸，30轮即可产生数十亿倍纯化靶序列！",
        };
      }
      // 生物：表观遗传
      case "bio-epigenetik": {
        const methyl = paramA;
        const acetyl = paramB;
        const transkription = Math.max(0, Math.round(acetyl * 1.2 - methyl * 0.9));
        return {
          rateLabelDE: "Transkriptionsaktivität",
          rateLabelZH: "基因转录表达活跃度",
          rateValue: `${transkription} %`,
          subLabelDE: "Chromatinstatus",
          subLabelZH: "染色质构象状态",
          subValue: transkription > 50 ? (de ? "Euchromatin (offen)" : "常染色质 (松散开启)") : (de ? "Heterochromatin (dicht)" : "异染色质 (高度凝缩关闭)"),
          graphY: transkription,
          insightDE: methyl > 60 ? "Hypermethylierung der CpG-Inseln schaltet das Gen stumm!" : "Histonacetylierung lockert Nukleosomen für RNA-Polymerase.",
          insightZH: methyl > 60 ? "CpG 岛高度甲基化招募阻遏蛋白，导致抑癌基因表达沉默！" : "组蛋白乙酰化中和正电荷，促使染色质松散利于转录。",
        };
      }
      // 生物：湖泊富营养化
      case "bio-oekologie-see": {
        const phosphat = paramA;
        const o2Hypo = Math.max(0, +(10 - (phosphat / 100) * 9.5).toFixed(1));
        return {
          rateLabelDE: "O2-Gehalt im Tiefenwasser (Hypolimnion)",
          rateLabelZH: "湖泊深水层 (Hypolimnion) 溶解氧",
          rateValue: `${o2Hypo} mg/L`,
          subLabelDE: "Trophiegrad",
          subLabelZH: "湖泊富营养化营养状态",
          subValue: phosphat < 30 ? (de ? "Oligotroph" : "贫营养 (清澈)") : phosphat < 60 ? (de ? "Mesotroph" : "中营养") : (de ? "Eutroph / Umkippen" : "重度富营养 (泛池缺氧)"),
          graphY: Math.round((o2Hypo / 10) * 100),
          insightDE: o2Hypo < 2 ? "Anaerobe Fäulnisprozesse & Schwefelwasserstoffbildung am Seeboden!" : "Ausreichende Sauerstoffversorgung für Kaltwasserfische.",
          insightZH: o2Hypo < 2 ? "深水氧气耗竭：厌氧腐败菌释放硫化氢，湖泊生态系统发生泛池崩溃！" : "好氧分解稳定，温跃层以下氧气充足。",
        };
      }
      // 化学：电解定律
      case "chemie-elektrolyse": {
        const strom = +(1 + (paramA / 100) * 9).toFixed(1);
        const zeit = Math.round(10 + (paramB / 100) * 110);
        const mCu = +((63.55 * strom * (zeit * 60)) / (2 * 96485)).toFixed(3);
        return {
          rateLabelDE: "Abgeschiedene Kupfermasse m(Cu)",
          rateLabelZH: "阴极析出金属铜理论质量",
          rateValue: `${mCu} g`,
          subLabelDE: "Elektrische Ladungsmenge Q",
          subLabelZH: "通过总电荷量 Q = I * t",
          subValue: `${Math.round(strom * zeit * 60)} C`,
          graphY: Math.min(100, Math.round(mCu * 10)),
          insightDE: "1. und 2. Faradaysches Gesetz: Masse proportional zur Ladung Q und Äquivalentmasse.",
          insightZH: "法拉第第一、第二电解定律：析出物质质量与通电总电量及摩尔质量严格成正比。",
        };
      }
      // 化学：SN1 vs SN2 机理
      case "chemie-sn1-sn2": {
        const sterisch = paramA;
        const sn2Rate = Math.max(0, 100 - sterisch);
        const sn1Rate = sterisch;
        return {
          rateLabelDE: "Reaktionsweg-Dominanz",
          rateLabelZH: "主导亲核取代反应机理",
          rateValue: sterisch < 50 ? `SN2 (${sn2Rate}%)` : `SN1 (${sn1Rate}%)`,
          subLabelDE: "Stereochemie",
          subLabelZH: "产物立体化学特征",
          subValue: sterisch < 50 ? (de ? "Walden-Inversion (100% Inversion)" : "瓦尔登翻转 (完全反转)") : (de ? "Racemat (50% Inversion / 50% Retention)" : "外消旋化 (对映体等量)"),
          graphY: sterisch < 50 ? sn2Rate : sn1Rate,
          insightDE: sterisch > 60 ? "Tertiäres Carbenium-Ion hochstabilisiert -> Begünstigt SN1 mit Zwischenstufe!" : "Primäres Halogenalkan ohne sterische Hinderung -> Rückseitiger SN2-Angriff!",
          insightZH: sterisch > 60 ? "叔碳正离子经超共轭高稳定性存在，极大促进单分子 SN1 历程！" : "伯卤代烃空间位阻极小，强亲核试剂发生背部进攻双分子 SN2 协同翻转。",
        };
      }
      // 化学：高分子聚合
      case "chemie-polymerisation": {
        const umsatz = paramA;
        const vernetzung = paramB;
        const typ = vernetzung < 30 ? (de ? "Thermoplast (schmelzbar)" : "热塑性塑料 (线型/可熔)") : vernetzung < 70 ? (de ? "Elastomer (gummielastisch)" : "弹性体 (网状弱交联)") : (de ? "Duroplast (raumvernetzt/hitzefest)" : "热固性塑料 (体型强交联)");
        return {
          rateLabelDE: "Monomer-Umsatzgrad",
          rateLabelZH: "单体聚合转化率",
          rateValue: `${umsatz} %`,
          subLabelDE: "Kunststoff-Klasse nach Vernetzung",
          subLabelZH: "空间交联网络分子构型分类",
          subValue: typ,
          graphY: umsatz,
          insightDE: vernetzung > 70 ? "Engmaschiges 3D-Kovalenznetz verhindert Schmelzen -> Duroplast zersetzt sich bei Hitze!" : "Schwache Van-der-Waals-Kräfte zwischen Ketten ermöglichen Recycling von Thermoplasten.",
          insightZH: vernetzung > 70 ? "共价键三维致密立体交联使材料不可熔融，加热直接碳化分解！" : "热塑性聚合物分子链间仅靠范德华力维系，受热易流动塑形可循环回收。",
        };
      }
      // 化学：络合平衡
      case "chemie-komplexchemie": {
        const nh3 = paramA;
        const absorption = Math.round(10 + (nh3 / 100) * 85);
        return {
          rateLabelDE: "[Cu(NH3)4]²⁺ Komplexanteil",
          rateLabelZH: "四氨合铜(II)配离子转化份额",
          rateValue: `${absorption} %`,
          subLabelDE: "Lösungsfarbe",
          subLabelZH: "溶液吸收特征外观显色",
          subValue: nh3 < 25 ? (de ? "Hellblau [Cu(H2O)6]²⁺" : "天蓝浅色 (水合铜)") : nh3 < 60 ? (de ? "Mischfarbe / Trübung Cu(OH)2" : "沉淀过渡微浊态") : (de ? "Tiefblau-Violett [Cu(NH3)4]²⁺" : "深蓝紫色 (特征四氨合铜)"),
          graphY: absorption,
          insightDE: "Ligandenaustausch: NH3 ist ein stärkerer Lewis-Donor als H2O und erzeugt größere d-Orbital-Aufspaltung.",
          insightZH: "配体置换平衡：氨分子具有更强配位能力，诱发 d 轨道晶体场分裂能大幅增加，吸收红黄光呈现深蓝紫。",
        };
      }
      // 数学：导数极值与拐点
      case "mathe-kurvendiskussion": {
        const x = +((paramA - 50) / 15).toFixed(1);
        const f = +(Math.pow(x, 3) - 3 * x).toFixed(2);
        const fPrime = +(3 * Math.pow(x, 2) - 3).toFixed(2);
        const fDoublePrime = +(6 * x).toFixed(2);
        return {
          rateLabelDE: `Funktionswert f(x) bei x=${x}`,
          rateLabelZH: `函数值 f(x) (当 x=${x})`,
          rateValue: `${f}`,
          subLabelDE: `Steigung f'(x) & Krümmung f''(x)`,
          subLabelZH: `切线斜率 f'(x) 与二阶导数 f''(x)`,
          subValue: `f'=${fPrime}, f''=${fDoublePrime}`,
          graphY: Math.min(100, Math.max(0, Math.round(50 + f * 10))),
          insightDE: Math.abs(fPrime) < 0.2 ? (fDoublePrime > 0 ? "Lokales Minimum (Tiefpunkt)!" : "Lokales Maximum (Hochpunkt)!") : "Monotone Steigung oder Gefälle.",
          insightZH: Math.abs(fPrime) < 0.2 ? (fDoublePrime > 0 ? "一阶导数为0且二阶导数>0：严格极小值点！" : "一阶导数为0且二阶导数<0：严格极大值点！") : "当前处于单调增减区间。",
        };
      }
      // 数学：含参函数族与轨迹曲线
      case "mathe-funktionenscharen": {
        const a = +(0.5 + (paramA / 50)).toFixed(1);
        const xExtrem = +(1 / Math.sqrt(a)).toFixed(2);
        const yExtrem = +(2 / Math.sqrt(a)).toFixed(2);
        return {
          rateLabelDE: `Scharparameter a = ${a}`,
          rateLabelZH: `函数族参数 a = ${a}`,
          rateValue: `fa(x) = a·x³ - 3x`,
          subLabelDE: "Hochpunkt HP(a)",
          subLabelZH: "极大值点坐标 HP(x, y)",
          subValue: `(${xExtrem}, ${yExtrem})`,
          graphY: Math.round((paramA / 100) * 80 + 10),
          insightDE: "Ortskurve der Extrema: Elimination des Scharparameters a liefert y = 2x.",
          insightZH: "极值点轨迹曲线求法：通过联立 x(a) 与 y(a) 消除参数 a，得出极值点所落在的几何轨迹直线 y = 2x！",
        };
      }
      // 数学：旋转体体积
      case "mathe-rotationskoerper": {
        const r = +(1 + (paramA / 25)).toFixed(1);
        const h = +(1 + (paramB / 25)).toFixed(1);
        const vol = +(Math.PI * Math.pow(r, 2) * (h / 3)).toFixed(2);
        return {
          rateLabelDE: "Rotationsvolumen V = π ∫ f² dx",
          rateLabelZH: "旋转体体积微元定积分",
          rateValue: `${vol} VE`,
          subLabelDE: "Zylinder-/Kegel-Radien",
          subLabelZH: "截面底面半径与高",
          subValue: `r=${r}, h=${h}`,
          graphY: Math.min(100, Math.round(vol)),
          insightDE: "Zylinderscheiben-Methode: Summation infinitesimal dünner Kreisscheiben dV = π·(f(x))²·dx.",
          insightZH: "圆盘切片法微积分原理：将连续立体切片为厚度 dx 的微元圆盘并沿轴积分。",
        };
      }
      // 数学：点面距离
      case "mathe-ebene-abstand": {
        const d = +Math.abs((3 * paramA - 2 * paramB - 50) / 10).toFixed(2);
        return {
          rateLabelDE: "Abstand d(P, E) nach Hesse",
          rateLabelZH: "点到平面法线正交距离 d",
          rateValue: `${d} LE`,
          subLabelDE: "Ebenengleichung E",
          subLabelZH: "平面法向量与位置关系",
          subValue: d === 0 ? (de ? "Punkt liegt IN der Ebene" : "点在平面内 (d=0)") : (de ? "Echter Raumabstand" : "点在平面外空间"),
          graphY: Math.min(100, Math.round(d * 10)),
          insightDE: "Hessesche Normalenform: d = |n0·p - c|, kürzeste senkrechte Projektion.",
          insightZH: "黑塞标准型几何判据：点到平面的最短距离必然是垂直于平面的法向量投影标量。",
        };
      }
      // 数学：假设检验
      case "mathe-hypothesentest": {
        const alpha = paramA < 50 ? 5 : 1;
        const kKritisch = alpha === 5 ? 58 : 62;
        return {
          rateLabelDE: `Signifikanzniveau α = ${alpha}%`,
          rateLabelZH: `显著性水平 α = ${alpha}%`,
          rateValue: `Kritischer Bereich K = [${kKritisch}; 100]`,
          subLabelDE: "α-Fehler (Fehler 1. Art)",
          subLabelZH: "第一类错误 (弃真概率)",
          subValue: `P(X ≥ ${kKritisch} | p=0.5) ≤ ${alpha}%`,
          graphY: alpha === 5 ? 75 : 90,
          insightDE: "Fehler 1. Art minimieren führt zwangsläufig zu größerem Fehler 2. Art (β)!",
          insightZH: "统计学不可调和冲突：人为压低第一类错误 α 必然会导致第二类错误（存伪 β）增加，需根据样本量权衡。",
        };
      }
      // 数学：线性回归
      case "mathe-korrelation-regression": {
        const r = +(0.3 + (paramA / 100) * 0.68).toFixed(2);
        const r2 = +(r * r).toFixed(2);
        return {
          rateLabelDE: "Pearson-Korrelation r",
          rateLabelZH: "皮尔逊相关系数 r",
          rateValue: `${r}`,
          subLabelDE: "Bestimmtheitsmaß R²",
          subLabelZH: "决定系数 R² (解释方差占比)",
          subValue: `${Math.round(r2 * 100)} %`,
          graphY: Math.round(r * 100),
          insightDE: r > 0.8 ? "Starke positive lineare Korrelation!" : "Mäßiger bis schwacher statistischer Zusammenhang.",
          insightZH: r > 0.8 ? "强正相关：因变量约 70% 以上的方差波动可由自变量线性模型合理解释。" : "中低度弱相关，可能存在非线性或遗漏变量偏差。",
        };
      }
      // 社科：西纳斯环境模型
      case "sowi-sinus-milieus": {
        const status = paramA;
        const wert = paramB;
        const milieuDE = status > 70 ? (wert > 60 ? "Performer / Expeditive" : "Konservativ-Etablierte") : status > 40 ? (wert > 60 ? "Adaptiv-Pragmatische" : "Bürgerliche Mitte") : (wert > 60 ? "Prekäre / Konsum-Hedonisten" : "Traditionelle");
        const milieuZH = status > 70 ? (wert > 60 ? "精英前卫开拓型 / 绩效者" : "传统保守建制精英") : status > 40 ? (wert > 60 ? "务实自适应青年群体" : "中产阶级中坚层") : (wert > 60 ? "消费享乐与脆弱边缘层" : "传统守序劳动者层");
        return {
          rateLabelDE: "Zugeordnetes Sinus-Milieu",
          rateLabelZH: "坐标定位西纳斯社会群组",
          rateValue: de ? milieuDE : milieuZH,
          subLabelDE: "Soziale Lage & Wertorientierung",
          subLabelZH: "社会阶层与价值偏好度",
          subValue: `Status: ${status}%, Werte: ${wert}%`,
          graphY: status,
          insightDE: "Sinus-Milieus erfassen Lebenswelten und Wertorientierungen jenseits reiner Einkommensgrenzen.",
          insightZH: "西纳斯模型超越传统阶级唯收入论，从日常生活方式、审美偏好与现代性态度多维刻画选民生态。",
        };
      }
      // 社科：央行利率传导
      case "sowi-ezb-geldpolitik": {
        const leitzins = +(0.25 + (paramA / 100) * 4.75).toFixed(2);
        const inflation = Math.max(0.5, +(6.5 - leitzins * 0.9).toFixed(1));
        return {
          rateLabelDE: `EZB-Leitzins: ${leitzins} %`,
          rateLabelZH: `欧洲央行基准利率: ${leitzins} %`,
          rateValue: `Inflation HICP: ${inflation} %`,
          subLabelDE: "Kreditzinsen & Investitionen",
          subLabelZH: "商业银行放贷利率与宏观投资",
          subValue: leitzins > 3.0 ? (de ? "Restriktiv (Drosselung)" : "紧缩性政策 (抑制通胀)") : (de ? "Expansiv (Stimulation)" : "扩张性政策 (刺激借贷)"),
          graphY: Math.round((inflation / 8) * 100),
          insightDE: leitzins > 3.0 ? "Zinserhöhung dämpft Nachfrage und senkt Inflation in Richtung 2%-Ziel." : "Niedrigzinsen stimulieren Wachstum, bergen aber Inflationsrisiken.",
          insightZH: leitzins > 3.0 ? "加息抬高借贷成本，抑制居民消费与企业扩张，引导通胀率回落至 2% 价格稳定目标。" : "降息刺激信贷投放，但长期易诱发资产价格泡沫。",
        };
      }
      // 社科：福利国家与替代率
      case "sowi-sozialstaat-transfer": {
        const bismarck = paramA;
        const abgaben = Math.round(15 + (bismarck / 100) * 28);
        return {
          rateLabelDE: "Netto-Ersatzquote im Alter",
          rateLabelZH: "退休金/失业保障净替代率",
          rateValue: `${Math.round(45 + (bismarck / 100) * 25)} %`,
          subLabelDE: "Sozialversicherungsbeiträge",
          subLabelZH: "法定五大社保缴费率总和",
          subValue: `${abgaben} % des Brutto`,
          graphY: bismarck,
          insightDE: "Bismarck-Äquivalenzprinzip belohnt Beitragsleistung, erfordert aber hohe Lohnnebenkosten.",
          insightZH: "俾斯麦对等原则体现多缴多得，但高缴费率推高雇主雇员法定附加成本，面临人口老龄化抚养比危机。",
        };
      }
      // 社科：三元悖论
      case "sowi-trilemma-trilemma": {
        const choice = paramA < 33 ? (de ? "EZB/Euro: Fester Kurs + Freier Kapitalverkehr" : "欧洲一体化：固定汇率 + 资本自由流动 (放弃货币自主权)") : paramA < 66 ? (de ? "USA/Fed: Autonome Geldpolitik + Freier Kapitalverkehr" : "美国/浮动汇率：货币自主 + 资本自由 (放弃固定汇率)") : (de ? "Bretton Woods: Autonome Geldpolitik + Fester Kurs" : "布雷顿森林体系：自主货币 + 固定汇率 (资本管制)");
        return {
          rateLabelDE: "Mundell-Fleming-Konfiguration",
          rateLabelZH: "三元悖论抉择构型",
          rateValue: choice,
          subLabelDE: "Unmögliches drittes Ziel",
          subLabelZH: "必然被迫牺牲的第三支柱",
          subValue: paramA < 33 ? (de ? "Nationale Geldpolitik unmöglich" : "无独立货币自主") : paramA < 66 ? (de ? "Wechselkurs muss frei schwanken" : "汇率必须自由浮动") : (de ? "Kapitalkontrollen nötig" : "必须严格限制跨境资本"),
          graphY: 85,
          insightDE: "Ein Land kann niemals alle drei Ziele gleichzeitig erreichen (Mundell-Fleming-Trilemma).",
          insightZH: "蒙代尔-弗莱明不可能三角：宏观政策制定者永远无法同时兼备三者，必须清醒舍弃其一。",
        };
      }
      // 社科：李嘉图比较优势
      case "sowi-globalisierung-trade": {
        const specGain = Math.round(10 + (paramA / 100) * 35);
        return {
          rateLabelDE: "Globaler Spezialisierungsgewinn",
          rateLabelZH: "国际分工全球净增产福利",
          rateValue: `+${specGain} % Gütermenge`,
          subLabelDE: "Opportunitätskosten-Differenz",
          subLabelZH: "两国生产机会成本相对梯度",
          subValue: `Δ = ${+(0.2 + (paramA / 100) * 0.8).toFixed(2)}`,
          graphY: specGain * 2,
          insightDE: "Selbst bei absoluter Unterlegenheit beider Güter lohnt Außenhandel nach komparativen Vorteilen.",
          insightZH: "即便一国在所有产业生产率均处于劣势，凭借相对机会成本差异参与全球分工仍能实现帕累托改进！",
        };
      }
      // 社科：区位因素
      case "sowi-standort-deutschland": {
        const steuern = paramA;
        const infra = paramB;
        const score = Math.round(infra * 0.7 - steuern * 0.4 + 40);
        return {
          rateLabelDE: "Standort-Attraktivitätsindex",
          rateLabelZH: "工业区位投资综合吸引力指数",
          rateValue: `${score} / 100`,
          subLabelDE: "Infrastruktur vs. Kostenbelastung",
          subLabelZH: "基建技术优势 vs 成本税费负担",
          subValue: score > 60 ? (de ? "Attraktiv für High-Tech" : "高附加值产业青睐") : (de ? "Gefahr der Deindustrialisierung" : "面临产业外迁风险"),
          graphY: score,
          insightDE: "Hohe Energie- und Lohnkosten müssen durch exzellente Infrastruktur, F&E und Fachkräfte kompensiert werden.",
          insightZH: "德国高工资、高税收与高能源成本必须依赖顶尖双元制技术工人、知识产权保护与完备供应链进行溢价对冲。",
        };
      }
      // 哲学：柏拉图洞穴
      case "philo-hoehlengleichnis": {
        const stufe = paramA < 25 ? (de ? "I. Eikasia (Schattenbilder an der Wand)" : "第一阶：幻影 (洞壁虚妄阴影)") : paramA < 50 ? (de ? "II. Pistis (Gegenstände & Feuer)" : "第二阶：信念 (火光与木偶器具)") : paramA < 75 ? (de ? "III. Dianoia (Gestirne & Abbilder im Wasser)" : "第三阶：理智 (水面倒影与星辰宇宙)") : (de ? "IV. Noesis (Direkter Blick in die Sonne = Idee des Guten)" : "第四阶：理念直觉 (直视太阳与最高至善)");
        return {
          rateLabelDE: "Erkenntnisstufe der Seele",
          rateLabelZH: "灵魂认识升华阶段",
          rateValue: stufe,
          subLabelDE: "Bereich der Wirklichkeit",
          subLabelZH: "实在论世界范畴",
          subValue: paramA < 50 ? (de ? "Sinnenwelt (Doxa)" : "感觉经验世界 (意见 Doxa)") : (de ? "Ideenwelt (Episteme)" : "理知真理世界 (真知 Episteme)"),
          graphY: paramA,
          insightDE: "Philosophische Paideia: Mühsame Umwendung der Seele von vergänglichen Schatten zur ewigen Wahrheit.",
          insightZH: "哲学教化（Paideia）：摆脱感官表象束缚，经历痛苦的目光回转与理智升华，抵达终极善的理念。",
        };
      }
      // 哲学：契约论
      case "philo-staatsvertrag": {
        const sicherheit = paramA;
        const freiheit = 100 - sicherheit;
        const modell = sicherheit > 65 ? (de ? "Hobbes: Leviathan (Sicherheit vor Anarchie)" : "霍布斯《利维坦》：让渡自由换取生存免遭横死") : sicherheit > 35 ? (de ? "Locke: Gewaltenteilung & Eigentumsschutz" : "洛克《政府论》：权力分立、法治与私有财产权保护") : (de ? "Rousseau: Gemeinwille (Volonté Générale)" : "卢梭《社会契约论》：公共意志与人人平等的直接民主");
        return {
          rateLabelDE: "Politisches Vertragsmodell",
          rateLabelZH: "契约建构政治哲学范式",
          rateValue: modell,
          subLabelDE: "Freiheits- / Sicherheits-Verhältnis",
          subLabelZH: "权利让渡与秩序安保比重",
          subValue: `Freiheit: ${freiheit}%, Sicherheit: ${sicherheit}%`,
          graphY: sicherheit,
          insightDE: "Der Gesellschaftsvertrag legitimiert staatliche Gewalt aus der freiwilligen Zustimmung der Individuen.",
          insightZH: "现代国家合法性来源：不再是神权或血统，而是理性个体摆脱自然状态风险的自愿契约授权。",
        };
      }
      // 哲学：罗尔斯无知之幕
      case "philo-rawls-schleier": {
        const schleierAktiv = paramA > 40;
        const schwachNutzen = schleierAktiv ? 75 : 20;
        return {
          rateLabelDE: "Maximin-Regel (Differenzprinzip)",
          rateLabelZH: "最劣势阶层福利保障评估",
          rateValue: schleierAktiv ? (de ? "Gerecht nach Rawls" : "符合罗尔斯正义两原则") : (de ? "Ungerecht / Ausbeutung" : "存在弱势群体被牺牲剥削"),
          subLabelDE: "Schleier des Nichtwissens",
          subLabelZH: "无知之幕遮蔽程度",
          subValue: schleierAktiv ? (de ? "Aktiv (Unvoreingenommen)" : "已开启 (完全遮蔽自身天赋利害)") : (de ? "Inaktiv (Egoistisch)" : "未开启 (已知自身优势而牟利)"),
          graphY: schwachNutzen,
          insightDE: "Rawls 2. Prinzip: Soziale Ungleichheiten sind nur legitim, wenn sie dem am wenigsten Begünstigten den größtmöglichen Vorteil bringen.",
          insightZH: "罗尔斯第二原则（差别原则）：不平等只有在能够为社会中处于最不利地位的群体带来最大利益时才具备道德正当性！",
        };
      }
      // 哲学：自由意志
      case "philo-willensfreiheit": {
        return {
          rateLabelDE: "Libet-Paradoxon",
          rateLabelZH: "李贝特脑电因果时间轴",
          rateValue: "BP: -550ms -> Wille: -200ms",
          subLabelDE: "Philosophische Deutung",
          subLabelZH: "自由意志流派结论",
          subValue: paramB > 50 ? (de ? "Kompatibilismus (Bedingte Freiheit)" : "相容论 (反思与理性选择空间)") : (de ? "Harter Determinismus (Illusion)" : "硬决定论 (潜意识神经冲动决定)"),
          graphY: Math.round((paramA / 100) * 70 + 20),
          insightDE: "Libet zeigte: Das Gehirn bereitet Bewegungen vor, bevor wir uns bewusst entscheiden. Doch bleibt ein 'Veto-Recht'!",
          insightZH: "神经实验表明大脑准备电位早于主观意识发起，但主观意志仍保有一票否决权（Free Won't）与道德责任。",
        };
      }
      // 哲学：波普尔证伪
      case "philo-popper-falsifikation": {
        const faelle = Math.round(10 + (paramA / 100) * 990);
        const gegenbeispiel = paramB > 70;
        return {
          rateLabelDE: "Theoriestatus nach Popper",
          rateLabelZH: "理论科学性检验状态",
          rateValue: gegenbeispiel ? (de ? "FALSIFIZIERT (Widerlegt)" : "已被证伪 (立即淘汰修正)") : (de ? "Bewährt (Vorläufig gültig)" : "获得经验经验检验 (暂未被推翻)"),
          subLabelDE: "Gegenbeispiel-Filter",
          subLabelZH: "反例证伪性检验",
          subValue: gegenbeispiel ? (de ? "Schwarzer Schwan gefunden!" : "观察到黑天鹅反例！") : (de ? `${faelle} weiße Schwäne reichen NICHT` : `观测到 ${faelle} 只白天鹅亦不足以确证`),
          graphY: gegenbeispiel ? 10 : 85,
          insightDE: "Asymmetrie: Keine endliche Zahl an Bestätigungen kann eine All-Aussage beweisen, aber ein einziger Widerspruch stürzt sie um.",
          insightZH: "逻辑不对称性：再多经验归纳也无法最终证明全称命题为真，但唯独一个确凿反例即可逻辑上推翻整个理论大厦。",
        };
      }
      // 哲学：阿伦特平庸之恶
      case "philo-arendt-banalitaet": {
        const gehorsam = paramA;
        const urteilskraft = 100 - gehorsam;
        return {
          rateLabelDE: "Gefahr der Gedankenlosigkeit",
          rateLabelZH: "恶的平庸性与放弃反思风险",
          rateValue: gehorsam > 60 ? (de ? "Banalität des Bösen droht" : "高危：平庸之恶滋生") : (de ? "Kritische Urteilskraft aktiv" : "具备独立道德审视判断力"),
          subLabelDE: "Autonome Moral vs. Bürokratie",
          subLabelZH: "自主道德反省能力评分",
          subValue: `${urteilskraft} / 100`,
          graphY: gehorsam,
          insightDE: "Arendt: Das größte Böse wird von Menschen begangen, die sich weigern, Personen zu sein und selbstständig zu denken.",
          insightZH: "阿伦特警示：极端罪恶并非源自恶魔本性，而是来自体制齿轮中放弃质疑与共情判断的普遍平庸盲从。",
        };
      }
      // 德语：弗赖塔格金字塔
      case "deutsch-drama-freytag": {
        const akt = paramA < 20 ? (de ? "Akt I: Exposition (Einführung & Keim des Konflikts)" : "第一幕：引子与铺垫 (人物关系与冲突萌芽)") : paramA < 40 ? (de ? "Akt II: Steigende Handlung (Erregendes Moment)" : "第二幕：情节上升 (激化矛盾事件)") : paramA < 60 ? (de ? "Akt III: Höhepunkt & Peripetie (Umschlag des Schicksals)" : "第三幕：最高潮与突转 (命运转折关键点)") : paramA < 80 ? (de ? "Akt IV: Fallende Handlung (Retardierendes Moment)" : "第四幕：情节回落 (迟滞延缓与最后的微茫希望)") : (de ? "Akt V: Katastrophe / Lösung (Tragischer Untergang)" : "第五幕：悲剧决局 / 毁灭 (破灭或升华)");
        const spannung = paramA < 60 ? Math.round((paramA / 60) * 100) : Math.round(100 - ((paramA - 60) / 40) * 70);
        return {
          rateLabelDE: "Aktuelle Dramenphase",
          rateLabelZH: "五幕古典戏剧节奏阶段",
          rateValue: akt,
          subLabelDE: "Dramatische Spannungskurve",
          subLabelZH: "戏剧张力指数",
          subValue: `${spannung} %`,
          graphY: spannung,
          insightDE: "Gustav Freytags symmetrischer Aufbau: Der Umschlag in Akt III entscheidet unweigerlich über das Schicksal des Helden.",
          insightZH: "弗赖塔格金字塔严密结构：第三幕突转直接切断人物回旋余地，第四幕迟滞短暂麻痹观众，使最终毁灭更具震撼力。",
        };
      }
      // 德语：格律节拍
      case "deutsch-lyrik-metrum": {
        const metrum = paramA < 25 ? (de ? "Jambus (v -) z. B. Ge-dicht" : "抑扬格 (∪ -) 如：Ge-dicht，沉稳舒展") : paramA < 50 ? (de ? "Trochäus (- v) z. B. Freu-de" : "扬抑格 (- ∪) 如：Freu-de，昂扬急促") : paramA < 75 ? (de ? "Daktylus (- v v) z. B. Wun-der-bar" : "扬抑抑格 (- ∪ ∪) 如：Wun-der-bar，圆舞飞旋") : (de ? "Anapäst (v v -) z. B. Zau-be-rei" : "抑抑扬格 (∪ ∪ -) 如：Zau-be-rei，层层推进");
        return {
          rateLabelDE: "Versfuß / Metrum",
          rateLabelZH: "音步格律识别",
          rateValue: metrum,
          subLabelDE: "Kadenz",
          subLabelZH: "行尾韵脚停顿 (Kadenz)",
          subValue: paramB > 50 ? (de ? "Männlich / stumpf (betont)" : "阳性/短尾 (重音收尾，果断坚毅)") : (de ? "Weiblich / klingend (unbetont)" : "阴性/扬尾 (轻音收尾，悠扬回旋)"),
          graphY: 80,
          insightDE: "Das Metrum stützt den emotionalen Gehalt des Gedichts: Jambus wirkt getragen, Trochäus fordernd und tänzerisch.",
          insightZH: "格律不仅是外在形式：抑扬格自带德语自然呼吸节律，常用于深刻沉思；跨行与重音违逆往往是心理撕裂的线索。",
        };
      }
      // 德语：布莱希特叙事剧
      case "deutsch-brecht-episch": {
        const distanz = paramA;
        return {
          rateLabelDE: "Verfremdungseffekt (V-Effekt)",
          rateLabelZH: "间离效果 (V-Effekt) 强度",
          rateValue: `${distanz} %`,
          subLabelDE: "Zuschauerhaltung",
          subLabelZH: "剧场观众审美与认知态度",
          subValue: distanz > 50 ? (de ? "Kritischer Beobachter (Denken)" : "理智冷眼观察者 (被激发批判思考)") : (de ? "Gefühlsidentifikation (Einfühlung)" : "感性代入共鸣 (亚里士多德式移情)"),
          graphY: distanz,
          insightDE: "Brecht bricht die Illusion durch Songs und Plakate, damit der Zuschauer nicht mitleidet, sondern gesellschaftliche Widersprüche erkennt.",
          insightZH: "布莱希特坚决打破第四堵墙与舞台幻觉：用刺耳中插歌曲与标语警醒观众，使其清醒审视阶级结构与变革可能。",
        };
      }
      // 德语：卡夫卡《变形记》
      case "deutsch-kafka-verwandlung": {
        const entfremdung = paramA;
        const isolierung = Math.round(40 + (paramB / 100) * 60);
        return {
          rateLabelDE: "Entfremdungsgrad Gregors",
          rateLabelZH: "格里高尔人性异化与家庭剥离度",
          rateValue: `${entfremdung} %`,
          subLabelDE: "Räumliche Isolation (Zimmertüren)",
          subLabelZH: "卧室三道门的空间物理阻隔",
          subValue: isolierung > 75 ? (de ? "Vollständig verriegelt (Abfall)" : "三门紧锁：被视为不可接触的废料") : (de ? "Spaltbreit offen (Beobachtung)" : "留有门缝，可窥见客堂灯火"),
          graphY: entfremdung,
          insightDE: "Die Verkäferung materialisiert Gregors seelische Entfremdung: Wer im bürgerlichen Erwerbsleben ausfällt, verliert sein Menschsein.",
          insightZH: "巨甲虫形态是格里高尔长期承受雇佣异化劳动的具象化：在资产阶级功利家庭中，一旦失去经济产出即被剥夺为人资格。",
        };
      }
      // 德语：博尔歇特废墟文学
      case "deutsch-borchert-draussen": {
        const pathosVerweigerung = paramA;
        return {
          rateLabelDE: "Kahlschlag- / Trümmerstil",
          rateLabelZH: "废墟文学冷凝语言强度",
          rateValue: `${pathosVerweigerung} %`,
          subLabelDE: "Stilmerkmale",
          subLabelZH: "文本语体特征",
          subValue: pathosVerweigerung > 50 ? (de ? "Stakkato, Parataxe, nackte Realität" : "断奏短句、并列句式、直面瓦砾创伤") : (de ? "Traditionelles Pathos" : "传统抒情修饰"),
          graphY: pathosVerweigerung,
          insightDE: "Die Kahlschlagliteratur nach 1945 entlarvt die Propagandasprache des Faschismus durch radikale sprachliche Ehrlichkeit.",
          insightZH: "1945 年后零度废墟文学拒绝一切宏大虚妄修辞，以干瘪、短促、刀削般的真实语言诉说战后归乡一代的精神虚无与重压。",
        };
      }
      // 德语：图尔敏论证模型
      case "deutsch-sachtext-argument": {
        const warrant = paramA > 40;
        const backing = paramB > 50;
        const stichhaltig = warrant && backing;
        return {
          rateLabelDE: "Argumentationsgüte nach Toulmin",
          rateLabelZH: "图尔敏论证效力健全度",
          rateValue: stichhaltig ? (de ? "Stichhaltig & Trittfest" : "严密周全 (准则与依据齐备)") : (de ? "Lückenhaft / Scheinkonklusion" : "存在论证漏洞 (跳跃推导)"),
          subLabelDE: "Schlussregel (Warrant) & Stützung (Backing)",
          subLabelZH: "推理桥梁与权威支撑",
          subValue: stichhaltig ? (de ? "Vollständig expliziert" : "推论规则明确且受充分依据支撑") : (de ? "Fehlendes Backing" : "缺乏必要的前提论据支援"),
          graphY: stichhaltig ? 95 : 35,
          insightDE: "Ein überzeugendes Sachurteil stützt das Datum stets durch einen allgemeinen Grundsatz (Warrant) und empirische Belege.",
          insightZH: "非虚构批判性论述文分析核心：事实（Datum）不能凭空推导结论（Claim），必须经过普适论据准则与实证依据的严密桥接！",
        };
      }
      // 默认基础回退
      default: {
        const metricA = +(valA * 10).toFixed(2);
        const metricB = +(valB * 100).toFixed(1);
        return {
          rateLabelDE: "System-Aktivität / Primärgröße",
          rateLabelZH: "系统主测定参量",
          rateValue: `${metricA}`,
          subLabelDE: "Effizienz / Auslastung",
          subLabelZH: "体系响应效率",
          subValue: `${metricB} %`,
          graphY: paramA,
          insightDE: "Systemparameter im Gleichgewicht. Konsistente Verhaltensdynamik.",
          insightZH: "参数调节在有效范围内，实时展现微观交互与定量平衡规律。",
        };
      }
    }
  }, [sim.id, paramA, paramB, de]);

  const handleExport = () => {
    const text = de
      ? `Labor: ${sim.titleDE} (${sim.kategorieDE})\nParameter A: ${paramA}, Parameter B: ${paramB}\nMesswert: ${calculatedData.rateLabelDE} = ${calculatedData.rateValue}\nErkenntnis: ${calculatedData.insightDE}`
      : `实验室: ${sim.titleZH} (${sim.kategorieZH})\n主参数: ${paramA}, 副参数: ${paramB}\n测定数据: ${calculatedData.rateLabelZH} = ${calculatedData.rateValue}\n核心考点结论: ${calculatedData.insightZH}`;
    if (onExportFinding) {
      onExportFinding(text);
    } else {
      navigator.clipboard.writeText(text);
      alert(de ? "Messdaten in Zwischenablage kopiert!" : "实验数据已复制到剪贴板！");
    }
  };

  return (
    <div className="flex flex-col gap-5 rounded-lg border border-[var(--line)] bg-[var(--surface)] p-5">
      {/* 顶部标题栏与考点指标 */}
      <div className="flex flex-wrap items-center justify-between border-b border-[var(--line)] pb-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs uppercase font-semibold text-[var(--accent)] px-2 py-0.5 rounded border border-[var(--accent)]/30 bg-[var(--accent)]/5">
              {sim.fach} · {de ? sim.kategorieDE : sim.kategorieZH}
            </span>
            <span className="font-mono text-xs px-2 py-0.5 rounded border border-[var(--line)] bg-[var(--paper-subtle)] text-[var(--ink)]">
              {sim.stufe}
            </span>
          </div>
          <h2 className="font-serif text-lg font-bold text-[var(--ink)] mt-1.5">
            {de ? sim.titleDE : sim.titleZH}
          </h2>
        </div>

        {/* 关键测量读数卡片 */}
        <div className="flex items-center gap-3">
          <div className="rounded border border-[var(--line)] bg-[var(--paper-subtle)] px-3 py-1.5 text-right font-mono">
            <span className="text-[10px] text-[var(--gray)] block">
              {calculatedData.rateLabelDE}
            </span>
            <span className="text-sm font-bold text-[var(--ink)]">
              {calculatedData.rateValue}
            </span>
          </div>
          <div className="rounded border border-[var(--line)] bg-[var(--paper-subtle)] px-3 py-1.5 text-right font-mono">
            <span className="text-[10px] text-[var(--gray)] block">
              {calculatedData.subLabelDE}
            </span>
            <span className="text-xs font-semibold text-[var(--accent)]">
              {calculatedData.subValue}
            </span>
          </div>
        </div>
      </div>

      {/* 核心视窗：左侧交互仿真图解 + 右侧控制面板 */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* 左侧 7 栏：实时 SVG 动态物理/数学几何画布 */}
        <div className="lg:col-span-7 flex flex-col justify-between rounded border border-[var(--line)] bg-[var(--paper)] p-4 min-h-[320px]">
          <div className="flex items-center justify-between border-b border-[var(--line)]/60 pb-2 text-xs font-mono text-[var(--gray)]">
            <span>{de ? "Echtzeit-Visualisierung & Phänomen" : "实时动态图景与几何模拟"}</span>
            <span>📐 {sim.formula}</span>
          </div>

          {/* 纯 SVG 动态图表 */}
          <div className="py-4 flex items-center justify-center">
            <svg
              className="w-full h-48 rounded bg-[var(--paper-subtle)]/40 border border-[var(--line)]/40"
              viewBox="0 0 400 200"
            >
              {/* 网格参考线 */}
              <line x1="40" y1="20" x2="40" y2="170" stroke="currentColor" strokeOpacity="0.15" strokeWidth="1.5" />
              <line x1="40" y1="170" x2="380" y2="170" stroke="currentColor" strokeOpacity="0.15" strokeWidth="1.5" />
              <line x1="40" y1="95" x2="380" y2="95" stroke="currentColor" strokeOpacity="0.08" strokeDasharray="3,3" />

              {/* 动态特性曲线 */}
              <path
                d={`M 40 170 Q 200 ${170 - (calculatedData.graphY * 1.3)} 380 ${170 - (calculatedData.graphY * 1.1)}`}
                fill="none"
                stroke="var(--accent)"
                strokeWidth="2.5"
                strokeLinecap="round"
              />

              {/* 动点与探测器 */}
              <circle
                cx={40 + (paramA * 3.3)}
                cy={170 - (calculatedData.graphY * 1.2)}
                r="6"
                fill="var(--accent)"
                stroke="var(--paper)"
                strokeWidth="2"
              />

              {/* 文本标注 */}
              <text x="50" y="35" fontSize="11" fill="var(--ink)" fontFamily="monospace">
                f(x) = {sim.formula.slice(0, 25)}
              </text>
              <text x="340" y="165" fontSize="10" fill="var(--gray)" fontFamily="monospace">
                t / x
              </text>
            </svg>
          </div>

          {/* 底部考点洞察 */}
          <div className="rounded bg-[var(--paper-subtle)] p-3 border border-[var(--line)] text-xs">
            <span className="font-semibold text-[var(--accent)] font-mono mr-2">
              {de ? "Klausur-Erkenntnis:" : "高频答题考点剖析:"}
            </span>
            <span className="text-[var(--ink)]">
              {de ? calculatedData.insightDE : calculatedData.insightZH}
            </span>
          </div>
        </div>

        {/* 右侧 5 栏：参数滑块与控制台 */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-4">
          <div className="space-y-4">
            <div className="border-b border-[var(--line)] pb-2 flex items-center justify-between">
              <span className="font-mono text-xs font-semibold text-[var(--ink)]">
                {de ? "Parameter-Regler" : "实验控制台 (参数调节)"}
              </span>
              <button
                type="button"
                onClick={() => {
                  setParamA(50);
                  setParamB(50);
                }}
                className="text-[10px] font-mono text-[var(--gray)] hover:text-[var(--accent)]"
              >
                {de ? "Standardwerte" : "重置默认值"}
              </button>
            </div>

            {/* 参数 A 滑杆 */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-[var(--gray)]">
                  {de ? "Hauptsteuergröße A" : "核心变量 A (强度 / 浓度 / 驱动)"}
                </span>
                <span className="font-bold text-[var(--ink)]">{paramA} %</span>
              </div>
              <input
                type="range"
                min="1"
                max="100"
                value={paramA}
                onChange={(e) => setParamA(Number(e.target.value))}
                className="w-full accent-[var(--accent)] cursor-pointer"
              />
            </div>

            {/* 参数 B 滑杆 */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-[var(--gray)]">
                  {de ? "Nebensteuergröße B" : "关联变量 B (阻尼 / 对手 / 介质)"}
                </span>
                <span className="font-bold text-[var(--ink)]">{paramB} %</span>
              </div>
              <input
                type="range"
                min="1"
                max="100"
                value={paramB}
                onChange={(e) => setParamB(Number(e.target.value))}
                className="w-full accent-[var(--accent)] cursor-pointer"
              />
            </div>

            {/* 描述与原理 */}
            <div className="space-y-1 pt-2 border-t border-[var(--line)]">
              <span className="text-[10px] font-mono text-[var(--gray)] uppercase font-semibold">
                {de ? "Phänomenologie" : "实验科学原理"}
              </span>
              <p className="text-xs text-[var(--ink)] leading-relaxed">
                {de ? sim.descDE : sim.descZH}
              </p>
            </div>
          </div>

          {/* 底部动作按钮 */}
          <div className="pt-3 border-t border-[var(--line)] flex items-center justify-between">
            <button
              type="button"
              onClick={handleExport}
              className="text-xs font-mono px-3 py-1.5 rounded border border-[var(--line)] hover:border-[var(--accent)] bg-[var(--paper-subtle)] text-[var(--ink)] transition-colors"
            >
              📋 {de ? "Messdaten kopieren" : "导出实验测定记录"}
            </button>
            <span className="text-[10px] font-mono text-[var(--gray)]">
              {sim.tags.join(" · ")}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UniversalInteractiveWorkbench;
