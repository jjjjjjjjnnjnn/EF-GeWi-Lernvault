// UniversalInteractiveWorkbench — 通用多学科高保真交互实验工作台
// 为北威州高中（Gymnasiale Oberstufe: EF / Q1 / Q2）全部扩展实验提供专属的真实视觉仿真、学科专属参数联动与官方考纲考点剖析
import { useState, useMemo } from "react";
import type { Lang } from "../../i18n";
import type { SimEntry } from "../../modules/laborRegistry";

export interface UniversalWorkbenchProps {
  sim: SimEntry;
  lang: Lang;
  studioMode?: boolean;
  onExportFinding?: (text: string) => void;
}

export interface CalculatedWorkbenchData {
  archetype: string;
  paramALabelDE: string;
  paramALabelZH: string;
  paramAValueDisplay: string;
  paramBLabelDE: string;
  paramBLabelZH: string;
  paramBValueDisplay: string;
  rateLabelDE: string;
  rateLabelZH: string;
  rateValue: string;
  subLabelDE: string;
  subLabelZH: string;
  subValue: string;
  graphY: number;
  insightDE: string;
  insightZH: string;
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
  const [interactiveTriggered, setInteractiveTriggered] = useState<boolean>(false);

  // 44 个新增实验室全部专属量化参数模型与高频考点
  const data: CalculatedWorkbenchData = useMemo(() => {
    switch (sim.id) {
      // ==========================================
      // 1. 哲学：自由意志与李贝特实验 (Libet 1983)
      // ==========================================
      case "philo-willensfreiheit": {
        const bpLatenz = Math.round(300 + (paramA / 100) * 500); // 300 - 800 ms
        const wZeit = Math.round(100 + (paramB / 100) * 250);   // 100 - 350 ms
        const delta = bpLatenz - wZeit;
        return {
          archetype: "libet",
          paramALabelDE: "BP-Latenz vor Handlung (Bereitschaftspotenzial)",
          paramALabelZH: "脑电准备电位潜伏期 (BP 提前量)",
          paramAValueDisplay: `-${bpLatenz} ms`,
          paramBLabelDE: "W-Zeitpunkt (Bewusster Willensdrang)",
          paramBLabelZH: "主观意志意图觉察时点 (W 意识)",
          paramBValueDisplay: `-${wZeit} ms`,
          rateLabelDE: "Unbewusster Vorlauf Δt",
          rateLabelZH: "潜意识大脑脑电提前量 Δt",
          rateValue: `+${delta} ms vor Wille`,
          subLabelDE: "Veto-Fenster (Free Won't)",
          subLabelZH: "意识否决权保留窗口 (Veto)",
          subValue: `${wZeit - 50} ms bis Handlung`,
          graphY: Math.round((paramA / 100) * 70 + 20),
          insightDE: "Libet-Paradoxon: Das motorische Gehirn leitet die Handlung ein, bevor das Ich sich bewusst entscheidet. Ein Veto-Recht bleibt jedoch philosophisch verteidigbar.",
          insightZH: "李贝特脑电实验实测表明：准备电位（BP）比主观意识早约 350-550ms 出现！硬决定论据此主张自由意志是事后幻觉，而相容论与李贝特指出人类拥有 100ms 意识否决权（Free Won't）。",
        };
      }

      // ==========================================
      // 2. 哲学：柏拉图洞穴之喻 (Höhlengleichnis)
      // ==========================================
      case "philo-hoehlengleichnis": {
        const stufe = paramA < 25 ? (de ? "I. Eikasia (Schattenbilder)" : "第一阶：幻影 (洞壁虚妄阴影)") : paramA < 50 ? (de ? "II. Pistis (Gegenstände & Feuer)" : "第二阶：信念 (火光与器具木偶)") : paramA < 75 ? (de ? "III. Dianoia (Reflexionen & Sterne)" : "第三阶：理智 (水面倒影与星月)") : (de ? "IV. Noesis (Idee des Guten / Sonne)" : "第四阶：理念直觉 (直视太阳与善的理念)");
        return {
          archetype: "hoehle",
          paramALabelDE: "Aufstiegsstufe aus der Höhle",
          paramALabelZH: "从洞穴黑暗向上攀登进度",
          paramAValueDisplay: stufe,
          paramBLabelDE: "Bindung an Sinnenwelt (Doxa)",
          paramBLabelZH: "感官表象束缚解脱度",
          paramBValueDisplay: `${paramB} %`,
          rateLabelDE: "Erkenntnisbereich",
          rateLabelZH: "所处实在论认识范畴",
          rateValue: paramA < 50 ? (de ? "Sinnenwelt (Doxa)" : "感觉世界 (意见 Doxa)") : (de ? "Ideenwelt (Episteme)" : "理知真理 (真知 Episteme)"),
          subLabelDE: "Seelenhaltung (Paideia)",
          subLabelZH: "灵魂教化升华状态",
          subValue: paramA > 75 ? (de ? "Philosophische Einsicht" : "获得最高善的洞见") : (de ? "Gewöhnung an Licht" : "眼睛适应真理光芒中"),
          graphY: paramA,
          insightDE: "Platons Höhlengleichnis beschreibt Bildung (Paideia) als schmerzhaften Aufstieg von der Welt des Scheins (Doxa) zur Idee des Guten (Noesis).",
          insightZH: "柏拉图洞穴之喻论证了认识论的四层阶梯：从被锁链束缚的表象阴影（Eikasia），到火光经验（Pistis），再到出洞理智推导（Dianoia），最终直视赋予一切实在以意义的太阳——最高至善（Noesis）。",
        };
      }

      // ==========================================
      // 3. 哲学：康德定言令式普适化检验 (Kategorischer Imperativ)
      // ==========================================
      case "philo-kant-kategorischer": {
        const universalisierbar = paramA > 50 && paramB > 50;
        return {
          archetype: "kant",
          paramALabelDE: "Maxime: Universalisierungsgrad",
          paramALabelZH: "个人准则普适为普遍自然法则可行性",
          paramAValueDisplay: `${paramA} %`,
          paramBLabelDE: "Zweck-an-sich-Formel (Selbstzweck)",
          paramBLabelZH: "自律与人是目的公式恪守程度",
          paramBValueDisplay: `${paramB} %`,
          rateLabelDE: "Moralische Pflichtprüfung",
          rateLabelZH: "康德定言令式道德审查裁定",
          rateValue: universalisierbar ? (de ? "KATEGORISCH GEBOTEN" : "合乎定言令式 (绝对义务)") : (de ? "STRIKT VERBOTEN" : "违背定言令式 (绝对禁止)"),
          subLabelDE: "Widerspruch im Denken / Wollen",
          subLabelZH: "逻辑矛盾审查判定",
          subValue: universalisierbar ? "Widerspruchsfrei" : "Widerspruch im Wollen",
          graphY: universalisierbar ? 90 : 15,
          insightDE: "Immanuel Kant: Handle nur nach derjenigen Maxime, durch die du zugleich wollen kannst, dass sie ein allgemeines Gesetz werde. Menschen dürfen nie bloß als Mittel gebraucht werden.",
          insightZH: "康德定言令式三大公式检验：假借借钱不还等准则一旦被普适化，借贷概念本身在逻辑上必然自我瓦解（Widerspruch im Denken）；同时不得将人单单作为工具（Zweck-an-sich）。",
        };
      }

      // ==========================================
      // 4. 哲学：霍布斯 vs 洛克 vs 卢梭社会契约论 (Staatsvertrag)
      // ==========================================
      case "philo-staatsvertrag": {
        const modell = paramA < 35 ? "Hobbes (Leviathan)" : paramA < 70 ? "Locke (Gewaltenteilung)" : "Rousseau (Gemeinwille)";
        const souveran = paramA < 35 ? (de ? "Absoluter Herrscher" : "利维坦绝对君主") : paramA < 70 ? (de ? "Konstitutioneller Staat" : "分权立宪法治国") : (de ? "Volkssouveränität (Identität)" : "直接民主公意主体");
        return {
          archetype: "staatsvertrag",
          paramALabelDE: "Naturzustands-Modell",
          paramALabelZH: "自然状态推导流派切换",
          paramAValueDisplay: modell,
          paramBLabelDE: "Freiheitsabgabe an den Staat",
          paramBLabelZH: "让渡给国家主权的个人自由份额",
          paramBValueDisplay: `${paramB} %`,
          rateLabelDE: "Souveränitätsform",
          rateLabelZH: "国家主权架构核心形态",
          rateValue: souveran,
          subLabelDE: "Gefahr im System",
          subLabelZH: "制度固有政治风险",
          subValue: paramA < 35 ? "Despotie" : paramA < 70 ? "Machtasymmetrie" : "Tyrannei der Mehrheit",
          graphY: paramA,
          insightDE: "Vertragstheorien: Hobbes begründet Sicherheit durch Unterwerfung, Locke Eigentum durch Gewaltenteilung, Rousseau Freiheit durch den Gemeinwillen (volonté générale).",
          insightZH: "社会契约论三大流派对比：霍布斯以绝对顺从换取免于一切人对一切人战争的生命安全；洛克以三权分立保障自然权利与私有财产；卢梭主张将个人意志升华为不可分割的公意。",
        };
      }

      // ==========================================
      // 5. 哲学：罗尔斯无知之幕与正义两原则 (Rawls 1971)
      // ==========================================
      case "philo-rawls-schleier": {
        const schleierAktiv = paramA > 40;
        const schwachNutzen = schleierAktiv ? 75 : 20;
        return {
          archetype: "rawls",
          paramALabelDE: "Schleier des Nichtwissens",
          paramALabelZH: "无知之幕遮蔽严密程度",
          paramAValueDisplay: schleierAktiv ? (de ? "AKTIV (Verhüllt)" : "已开启 (完全遮蔽自身阶层)") : (de ? "OFFEN (Egoistisch)" : "未开启 (已知特权地位)"),
          paramBLabelDE: "Differenzprinzip (Umverteilung)",
          paramBLabelZH: "差异原则补偿与转移支付力度",
          paramBValueDisplay: `${paramB} %`,
          rateLabelDE: "Maximin-Kriterium",
          rateLabelZH: "最劣势群体基本福利评估",
          rateValue: schleierAktiv ? (de ? "Gerecht nach Rawls" : "符合罗尔斯正义两原则") : (de ? "Ungerecht / Privilegien" : "特权自利偏颇"),
          subLabelDE: "Boden-Einkommen (Minimum)",
          subLabelZH: "底线阶层基本尊严保障指数",
          subValue: `${schwachNutzen} / 100`,
          graphY: schwachNutzen,
          insightDE: "John Rawls: Im Urzustand unter dem Schleier des Nichtwissens wählt jeder vernünftige Mensch das Maximin-Prinzip zur Absicherung des Schlimmstmöglichen.",
          insightZH: "罗尔斯正义论：在不知道自己天赋、出身与社会地位的无知之幕下，理性自利主体必然选择最大化最劣势群体处境的制度安排（Maximin原则），奠定公平正义公理。",
        };
      }

      // ==========================================
      // 6. 哲学：波普尔证伪主义与科学划界 (Karl Popper)
      // ==========================================
      case "philo-popper-falsifikation": {
        const gegenbeispiel = paramB > 60;
        return {
          archetype: "popper",
          paramALabelDE: "Zahl weißer Schwäne (Verifikation)",
          paramALabelZH: "经验证实：白天鹅观察累计样本",
          paramAValueDisplay: `${Math.round(10 + paramA * 99)} Schwäne`,
          paramBLabelDE: "Gegenbeispiel-Suche (Schwarzer Schwan)",
          paramBLabelZH: "反例搜索：黑天鹅证伪探测器",
          paramBValueDisplay: gegenbeispiel ? (de ? "GEFUNDEN!" : "已发现 1 只黑天鹅！") : (de ? "Kein Gegenbeispiel" : "暂未见反例"),
          rateLabelDE: "Theoriestatus nach Popper",
          rateLabelZH: "科学全称命题检验判定",
          rateValue: gegenbeispiel ? (de ? "FALSIFIZIERT (Widerlegt)" : "已被证伪 (立即推翻修正)") : (de ? "Vorläufig bewährt" : "暂获经验检验支持"),
          subLabelDE: "Logischer Schluss",
          subLabelZH: "经典演绎逻辑命题形式",
          subValue: gegenbeispiel ? "Modus Tollens: ¬Q => ¬P" : "Induktionsproblem",
          graphY: gegenbeispiel ? 10 : 90,
          insightDE: "Karl Popper: Keine noch so große Zahl weißer Schwäne kann die Aussage 'Alle Schwäne sind weiß' beweisen. Ein einziger schwarzer Schwan widerlegt sie logisch zwingend.",
          insightZH: "波普尔证伪主义：逻辑不对称性表明经验归纳无法终极确证全称科学命题；科学与非科学的划界标准正在于其是否具备潜在的可被反例推翻性（Falsifizierbarkeit）。",
        };
      }

      // ==========================================
      // 7. 哲学：汉娜·阿伦特平庸之恶与独立判断力 (Hannah Arendt)
      // ==========================================
      case "philo-arendt-banalitaet": {
        const urteilskraft = paramB;
        const mitlaeufer = paramA > 50 && urteilskraft < 40;
        return {
          archetype: "arendt",
          paramALabelDE: "Bürokratischer Konformitätsdruck",
          paramALabelZH: "官僚体系科层服从压力",
          paramAValueDisplay: `${paramA} %`,
          paramBLabelDE: "Autonome Urteilskraft (Reflexion)",
          paramBLabelZH: "独立道德反思与判断力",
          paramBValueDisplay: `${paramB} %`,
          rateLabelDE: "Geistige Haltung",
          rateLabelZH: "个体存在与思维反思状态",
          rateValue: mitlaeufer ? (de ? "Gedankenlosigkeit (Banalität)" : "思想真空与平庸之恶") : (de ? "Kritisch Handelnder" : "具备道德自主的行动者"),
          subLabelDE: "Zwei-in-einem (Gewissensdialog)",
          subLabelZH: "内心良知与自我二重对话",
          subValue: urteilskraft > 50 ? "Aktiv" : "Verstummt",
          graphY: urteilskraft,
          insightDE: "Hannah Arendt: Das Böse ist oft nicht dämonisch, sondern wurzelt in der Gedankenlosigkeit – der Unfähigkeit, aus der Perspektive anderer zu denken.",
          insightZH: "汉娜·阿伦特《耶路撒冷的艾希曼》核心洞见：毁灭性的灾难往往并非由狂热恶魔造成，而是源于放弃独立思考、甘当官僚螺丝钉的平庸性思维停摆（Gedankenlosigkeit）。",
        };
      }

      // ==========================================
      // 8. 生物：光合作用与光饱和点 (Fotosynthese)
      // ==========================================
      case "bio-fotosynthese": {
        const lux = Math.round(100 + paramA * 90); // 100 - 9100 Lux
        const co2 = Math.round(150 + paramB * 8.5); // 150 - 1000 ppm
        const rate = Math.round(100 * (1 - Math.exp(-paramA / 30)) * (1 - Math.exp(-paramB / 35)));
        const blasen = Math.round((rate / 100) * 60);
        return {
          archetype: "fotosynthese",
          paramALabelDE: "Lichtintensität der Lampe",
          paramALabelZH: "光源灯照强度 (Lux / %)",
          paramAValueDisplay: `${lux} Lux`,
          paramBLabelDE: "CO2-Konzentration im Wasser",
          paramBLabelZH: "水体溶碳浓度 (CO2 ppm)",
          paramBValueDisplay: `${co2} ppm`,
          rateLabelDE: "Fotosyntheserate (Netto)",
          rateLabelZH: "光合作用净速率",
          rateValue: `${rate} %`,
          subLabelDE: "O2-Blasenbildung (Elodea)",
          subLabelZH: "伊乐藻氧气气泡析出率",
          subValue: `${blasen} Blasen/min`,
          graphY: rate,
          insightDE: paramA < 25 ? "Licht ist limitierender Faktor (Lichtreaktion gehemmt)!" : paramB < 25 ? "CO2 ist limitierender Faktor (Calvin-Zyklus gehemmt)!" : "Lichtsättigung erreicht. Maximale Enzymauslastung von Rubisco.",
          insightZH: paramA < 25 ? "光照不足：处于光限制阶段，光反应同化力 (ATP/NADPH) 生成受限！" : paramB < 25 ? "CO2 浓度受限：卡尔文暗反应循环受阻，Rubisco 羧化酶底物匮乏！" : "达到光饱和点，环境限制因子定律生效，气泡速率达到生理上限。",
        };
      }

      // ==========================================
      // 9. 生物：细胞呼吸与线粒体内膜呼吸链 (Zellatmung)
      // ==========================================
      case "bio-zellatmung": {
        const atp = Math.min(32, Math.round((paramA / 100) * (paramB / 100) * 32));
        const eta = Math.round((atp / 32) * 40);
        return {
          archetype: "zellatmung",
          paramALabelDE: "Sauerstoff-Partialdruck (pO2)",
          paramALabelZH: "线粒体氧分压 (pO2)",
          paramAValueDisplay: `${paramA} %`,
          paramBLabelDE: "Glucose-Substratangebot",
          paramBLabelZH: "葡萄糖底物供给浓度",
          paramBValueDisplay: `${paramB} mmol/L`,
          rateLabelDE: "Nettogewinn pro Mol Glucose",
          rateLabelZH: "每摩尔葡萄糖净产 ATP",
          rateValue: `${atp} ATP`,
          subLabelDE: "Chemiosmotischer Wirkungsgrad",
          subLabelZH: "化学渗透能量转化效率",
          subValue: `${eta} %`,
          graphY: Math.round((atp / 32) * 100),
          insightDE: atp > 28 ? "Vollständige aerobe Zellatmung: Glykolyse, Citratzyklus und oxidative Phosphorylierung optimal!" : "O2-Mangel: Rückstau in der Atmungskette, Zelle weicht auf Milchsäure-/Alkohol-Gärung aus.",
          insightZH: atp > 28 ? "氧气充足：经柠檬酸循环与内膜呼吸链质子泵氧化磷酸化，产出理论极大值 30-32 ATP！" : "严重缺氧：电子传递链受阻，细胞被动转入无氧发酵，底物水平仅获 2 ATP。",
        };
      }

      // ==========================================
      // 10. 生物：米氏酶动力学与竞争/非竞争抑制 (Enzymkinetik)
      // ==========================================
      case "bio-enzymkinetik": {
        const s = +(0.1 + (paramA / 100) * 9.9).toFixed(1);
        const vmax = 100;
        const km = paramB > 50 ? 2.5 + ((paramB - 50) / 50) * 5 : 2.5;
        const v = Math.round((vmax * s) / (km + s));
        return {
          archetype: "enzym",
          paramALabelDE: "Substratkonzentration [S]",
          paramALabelZH: "底物浓度 [S] (mmol/L)",
          paramAValueDisplay: `${s} mmol/L`,
          paramBLabelDE: "Inhibitor-Konzentration (Hemmung)",
          paramBLabelZH: "竞争性抑制剂浓度 (Km 改变)",
          paramBValueDisplay: `${paramB} %`,
          rateLabelDE: "Reaktionsgeschwindigkeit v",
          rateLabelZH: "酶促初反应速率 v",
          rateValue: `${v} μmol/(min·mg)`,
          subLabelDE: "Michaelis-Konstante Km",
          subLabelZH: "米氏常数 Km (底物亲和力)",
          subValue: `${km.toFixed(2)} mmol/L`,
          graphY: v,
          insightDE: "Michaelis-Menten-Kinetik: Bei hoher Substratkonzentration nähert sich v asymptotisch vmax. Ein kompetitiver Inhibitor erhöht Km, lässt vmax jedoch unverändert.",
          insightZH: "米氏动力学：底物浓度极高时酶活性位点被完全饱和，速率逼近 vmax；竞争性抑制剂与底物竞争同一催化中心使 Km 增大，过量底物可解除抑制。",
        };
      }

      // ==========================================
      // 11. 生物：孟德尔双杂交 9:3:3:1 棋盘 (Genetik)
      // ==========================================
      case "bio-genetik-kreuzung": {
        return {
          archetype: "genetik",
          paramALabelDE: "Stichprobengröße F2 (Individuen)",
          paramALabelZH: "F2 代杂交植株样本容量",
          paramAValueDisplay: `${Math.round(16 + paramA * 10)} Samen`,
          paramBLabelDE: "Rekombinationswahrscheinlichkeit",
          paramBLabelZH: "等位基因独立自由组合率",
          paramBValueDisplay: `50.0 % (nicht gekoppelt)`,
          rateLabelDE: "Klassisches Spaltungsverhältnis",
          rateLabelZH: "孟德尔经典表型分离比",
          rateValue: "9 : 3 : 3 : 1",
          subLabelDE: "Phänotypen-Verteilung",
          subLabelZH: "双杂交表型分布 (黄色/圆粒等)",
          subValue: "56.25% : 18.75% : 18.75% : 6.25%",
          graphY: 75,
          insightDE: "3. Mendelsche Regel: Zwei Merkmalspaare auf verschiedenen Chromosomen werden unabhängig voneinander nach dem Gesetz der Kombination vererbt.",
          insightZH: "孟德尔第三定律（自由组合定律）：控制两对相对性状的等位基因在形成配子时彼此独立分离、自由组合，形成 16 种基因型组合与 9:3:3:1 表型分离比。",
        };
      }

      // ==========================================
      // 12. 生物：化学突触信号传导 (Synapse)
      // ==========================================
      case "bio-synapse": {
        const ach = paramA;
        const blocker = paramB;
        const epsp = Math.max(0, +(15 * (ach / 100) * (1 - blocker / 100)).toFixed(1));
        return {
          archetype: "synapse",
          paramALabelDE: "ACh-Freisetzung an Präsynapse",
          paramALabelZH: "突触前膜乙酰胆碱 (ACh) 释放量",
          paramAValueDisplay: `${ach} %`,
          paramBLabelDE: "Rezeptorblocker (Curare/Toxin)",
          paramBLabelZH: "受体竞争性神经毒素浓度 (箭毒)",
          paramBValueDisplay: `${blocker} %`,
          rateLabelDE: "EPSP-Depolarisation",
          rateLabelZH: "突触后膜去极化电位 (EPSP)",
          rateValue: `+${epsp} mV`,
          subLabelDE: "Aktionspotenzial-Auslösung",
          subLabelZH: "轴突始段动作电位触发判定",
          subValue: epsp > 10 ? (de ? "AUSGELÖST (> Schwellenwert)" : "成功激发 (高于阈值)") : (de ? "Unterschwellig" : "阈下电位 (未激发)"),
          graphY: Math.round((epsp / 15) * 100),
          insightDE: epsp > 10 ? "Schwellenwert von -50 mV überschritten: Reiz wird weitergeleitet!" : "Rezeptoren durch Toxin blockiert oder zu wenig Transmitter: Reizübertragung unterbrochen.",
          insightZH: epsp > 10 ? "动作电位触发：大量配体门控钠通道开放，去极化跨过 -50mV 阈值并顺轴突全或无传导！" : "突触阻断：受体被毒素占据或神经递质不足，电位低于阈值无法完成神经冲动传递。",
        };
      }

      // ==========================================
      // 13. 生物：洛特卡-沃尔泰拉捕食者猎物循环 (Lotka-Volterra)
      // ==========================================
      case "bio-oekologie-raeuber-beute": {
        const beute = Math.round(50 + 35 * Math.sin((paramA / 100) * 2 * Math.PI));
        const raeuber = Math.round(30 + 25 * Math.sin((paramA / 100) * 2 * Math.PI - Math.PI / 2));
        return {
          archetype: "raeuber-beute",
          paramALabelDE: "Ökologische Zeitachse (Generationen)",
          paramALabelZH: "生态种群演变世代时间轴 (t)",
          paramAValueDisplay: `Gen. ${Math.round(paramA * 0.5)}`,
          paramBLabelDE: "Tragfähigkeit der Umwelt K",
          paramBLabelZH: "环境容纳量 K (植被丰富度)",
          paramBValueDisplay: `${Math.round(50 + paramB)} Ind./ha`,
          rateLabelDE: "Beutedichte (Schneeschuhhase)",
          rateLabelZH: "猎物种群密度 (白靴兔)",
          rateValue: `${beute} Ind./ha`,
          subLabelDE: "Räuberbestand (Luchs)",
          subLabelZH: "捕食者数量 (加拿大猞猁)",
          subValue: `${raeuber} Ind./ha (Phasenversatz π/2)`,
          graphY: beute,
          insightDE: "1. Lotka-Volterra-Regel: Die Populationsdichten schwanken periodisch mit einer Phasenverzögerung der Räuberkurve hinter der Beutekurve.",
          insightZH: "沃尔泰拉第一定律（周期性波动）：猎物增加导致捕食者随后增加，捕食者暴增又导致猎物锐减，两条振荡曲线存在大约四分之一周期的恒定相位差。",
        };
      }

      // ==========================================
      // 14. 生物：PCR 变温扩增与琼脂糖凝胶电泳 (PCR)
      // ==========================================
      case "bio-dna-pcr": {
        const cycles = Math.round(1 + (paramA / 100) * 34);
        const copies = cycles <= 30 ? Math.pow(2, cycles) : 1e9;
        const copyStr = copies >= 1e6 ? `${(copies / 1e6).toFixed(1)} Mio.` : `${copies}`;
        return {
          archetype: "pcr",
          paramALabelDE: "Anzahl PCR-Zyklen (n)",
          paramALabelZH: "PCR 扩增温度循环数 (n)",
          paramAValueDisplay: `${cycles} Zyklen`,
          paramBLabelDE: "Polymerase-Aktivität (Taq)",
          paramBLabelZH: "耐热 Taq DNA 聚合酶活性",
          paramBValueDisplay: `${paramB} %`,
          rateLabelDE: `DNA-Ausbeute nach ${cycles} Zyklen`,
          rateLabelZH: `DNA 目标片段拷贝产出`,
          rateValue: `${copyStr} Moleküle`,
          subLabelDE: "Aktuelle Thermostufe",
          subLabelZH: "标准三步变温反应阶段",
          subValue: cycles % 3 === 1 ? "95°C (Denaturierung)" : cycles % 3 === 2 ? "55°C (Annealing)" : "72°C (Elongation)",
          graphY: Math.min(100, Math.round((cycles / 35) * 100)),
          insightDE: "Polymerase-Kettenreaktion: Exponentielles Wachstum N(n) = N0 · 2^n durch zyklische Temperatursteuerung.",
          insightZH: "体外 DNA 指数级扩增核心：95°C双链解旋变性 → 55°C引物特异性结合 → 72°C耐热聚合酶延伸，30 轮扩增产出达数十亿倍！",
        };
      }

      // ==========================================
      // 15. 生物：表观遗传修饰与核小体松紧 (Epigenetik)
      // ==========================================
      case "bio-epigenetik": {
        const methyl = paramA;
        const acetyl = paramB;
        const aktiv = Math.max(0, Math.min(100, Math.round(acetyl * 1.2 - methyl * 0.8)));
        return {
          archetype: "epigenetik",
          paramALabelDE: "DNA-Methylierung (Cytosin)",
          paramALabelZH: "CpG 岛胞嘧啶 DNA 甲基化程度",
          paramAValueDisplay: `${methyl} %`,
          paramBLabelDE: "Histon-Acetylierung (H3K9ac)",
          paramBLabelZH: "组蛋白乙酰化程度 (Histone)",
          paramBValueDisplay: `${acetyl} %`,
          rateLabelDE: "Transkriptionsaktivität des Gens",
          rateLabelZH: "下游基因转录表达活跃度",
          rateValue: `${aktiv} % (${aktiv > 50 ? "Euchromatin" : "Heterochromatin"})`,
          subLabelDE: "Chromatinkondensation",
          subLabelZH: "核小体染色质构象松紧状态",
          subValue: aktiv > 50 ? "Offen / Ablesbar" : "Dicht gepackt / Stumm",
          graphY: aktiv,
          insightDE: "Epigenetik: Methylierung von DNA schaltet Gene stumm (Kondensation), während Histon-Acetylierung das Chromatin auflockert und RNA-Polymerasen Zugriff erlaubt.",
          insightZH: "表观遗传核心机制：DNA 甲基化吸引结合蛋白导致染色质致密卷曲沉默（Heterochromatin），组蛋白乙酰化中和正电荷使 DNA 松开裸露以供转录（Euchromatin）。",
        };
      }

      // ==========================================
      // 16. 生物：温带湖泊四季温度分层与滞水期 (See-Ökologie)
      // ==========================================
      case "bio-oekologie-see": {
        const jahreszeit = paramA < 25 ? (de ? "Frühjahr (Vollzirkulation)" : "春季 (全湖充分垂直对流)") : paramA < 50 ? (de ? "Sommer (Sommerstagnation)" : "夏季 (分层停滞，产生温跃层)") : paramA < 75 ? (de ? "Herbst (Herbstzirkulation)" : "秋季 (气温骤降，再次全对流)") : (de ? "Winter (Winterstagnation)" : "冬季 (冰封逆温，底层4°C异常)");
        const sprungschicht = paramA >= 25 && paramA < 50;
        return {
          archetype: "see",
          paramALabelDE: "Jahreszeitlicher Zyklus",
          paramALabelZH: "温带湖泊四季年历位置",
          paramAValueDisplay: jahreszeit,
          paramBLabelDE: "Nährstoffbelastung (Eutrophierung)",
          paramBLabelZH: "湖体富营养化氮磷负荷度",
          paramBValueDisplay: `${paramB} %`,
          rateLabelDE: "Tiefenwasser-Sauerstoffgehalt (Hypolimnion)",
          rateLabelZH: "深水层溶解氧含量 (Hypolimnion)",
          rateValue: sprungschicht && paramB > 50 ? "0.2 mg/L (Anaerob / Faulschlamm)" : "8.5 mg/L (Gut belüftet)",
          subLabelDE: "Sprungschicht (Metalimnion)",
          subLabelZH: "金属水层温跃层阻隔",
          subValue: sprungschicht ? "STARK (ΔT = 15°C)" : "Keine Schichtung",
          graphY: sprungschicht ? 25 : 85,
          insightDE: "See-Ökologie: Die Dichteanomalie des Wassers bei 4°C verhindert im Winter das Durchfrieren. Im Sommer trennt die Sprungschicht sauerstoffreiches Epilimnion vom zehrenden Hypolimnion.",
          insightZH: "湖泊生态学：水在 4°C 密度最大使底层不致封冻；夏季上暖下冷形成温跃层（Metalimnion）阻隔氧气补充，富营养化湖泊底层易恶化为无氧腐泥层（Faulschlamm）。",
        };
      }

      // ==========================================
      // 17. 化学：丹尼尔原电池与能斯特方程 (Galvanische Zelle)
      // ==========================================
      case "chemie-galvanische-zelle": {
        const cZn = +((paramA / 50) + 0.01).toFixed(2);
        const cCu = +((paramB / 50) + 0.01).toFixed(2);
        const e0 = 1.10;
        const deltaE = +(e0 + 0.0295 * Math.log10(cCu / cZn)).toFixed(3);
        return {
          archetype: "galvanisch",
          paramALabelDE: "Zink-Ionen-Konzentration [Zn²⁺]",
          paramALabelZH: "负极硫酸锌溶液浓度 [Zn²⁺]",
          paramAValueDisplay: `${cZn} mol/L`,
          paramBLabelDE: "Kupfer-Ionen-Konzentration [Cu²⁺]",
          paramBLabelZH: "正极硫酸铜溶液浓度 [Cu²⁺]",
          paramBValueDisplay: `${cCu} mol/L`,
          rateLabelDE: "Zellspannung U_Zell (Nernst)",
          rateLabelZH: "原电池实测电动势 (Nernst)",
          rateValue: `${deltaE} V`,
          subLabelDE: "Verhältnis [Cu²⁺] / [Zn²⁺]",
          subLabelZH: "反应商比值 [Cu²⁺]/[Zn²⁺]",
          subValue: `${(cCu / cZn).toFixed(2)}`,
          graphY: Math.round((deltaE - 0.9) * 200),
          insightDE: deltaE > 1.10 ? "Erhöhte Cu²⁺-Konzentration treibt Redoxreaktion thermodynamisch nach rechts." : "Zn²⁺-Akkumulation verringert das Triebkraft-Potenzial der Anode.",
          insightZH: deltaE > 1.10 ? "正极 Cu²⁺ 浓度升高增强得电子趋势，根据能斯特方程电动势对数上升。" : "负极 Zn²⁺ 离子富集反向抑制金属锌解离，双电层电位差减小。",
        };
      }

      // ==========================================
      // 18. 化学：法拉第电解定律与铜沉积 (Elektrolyse)
      // ==========================================
      case "chemie-elektrolyse": {
        const strom = +(1 + (paramA / 100) * 9).toFixed(1);
        const zeit = Math.round(10 + (paramB / 100) * 110);
        const mCu = +((63.55 * strom * (zeit * 60)) / (2 * 96485)).toFixed(3);
        return {
          archetype: "elektrolyse",
          paramALabelDE: "Elektrolysestromstärke I",
          paramALabelZH: "直流电解电流强度 I",
          paramAValueDisplay: `${strom} A`,
          paramBLabelDE: "Elektrolysedauer t",
          paramBLabelZH: "持续电解时间 t",
          paramBValueDisplay: `${zeit} min`,
          rateLabelDE: "Abgeschiedenes Kupfer m(Cu)",
          rateLabelZH: "阴极析出金属铜理论质量",
          rateValue: `${mCu} g`,
          subLabelDE: "Ladungsmenge Q = I·t",
          subLabelZH: "通过总电量 Q",
          subValue: `${Math.round(strom * zeit * 60)} C`,
          graphY: Math.min(100, Math.round(mCu * 10)),
          insightDE: "Faradaysche Gesetze: Die abgeschiedene Stoffmasse ist streng proportional zur elektrischen Ladung Q = I·t.",
          insightZH: "法拉第电解定律：阴极沉积金属铜的物质量与通电总电荷量成严格线性比例（每摩尔 Cu 消耗 2 摩尔电子 = 2×96485 C）。",
        };
      }

      // ==========================================
      // 19. 化学：亨德森-哈塞尔巴赫缓冲溶液 (Puffer)
      // ==========================================
      case "chemie-puffer-hasselbalch": {
        const verhaeltnis = Math.pow(10, ((paramA - 50) / 25));
        const pks = 4.75; // 醋酸 pKs
        const ph = +(pks + Math.log10(verhaeltnis)).toFixed(2);
        return {
          archetype: "puffer",
          paramALabelDE: "Verhältnis Base/Säure [Ac⁻]/[HAc]",
          paramALabelZH: "弱酸共轭碱盐比值 [CH3COO⁻]/[CH3COOH]",
          paramAValueDisplay: `${verhaeltnis.toFixed(2)}`,
          paramBLabelDE: "Gesamtkonzentration c_ges (Pufferkapazität)",
          paramBLabelZH: "缓冲对总浓度 (缓冲容量 β)",
          paramBValueDisplay: `${+(0.05 + (paramB / 100) * 0.95).toFixed(2)} mol/L`,
          rateLabelDE: "Berechneter Puffer-pH (Hasselbalch)",
          rateLabelZH: "缓冲液平衡 pH 读数",
          rateValue: `pH = ${ph}`,
          subLabelDE: "Pufferbereich (pKs ± 1)",
          subLabelZH: "最佳有效缓冲范围区间",
          subValue: "[3.75 ; 5.75]",
          graphY: Math.round(((ph - 2) / 8) * 100),
          insightDE: "Henderson-Hasselbalch-Gleichung: Im Bereich pKs ± 1 federt das Pufferpaar Zugaben von H3O+ und OH- mit minimaler pH-Verschiebung ab.",
          insightZH: "缓冲原理：当共轭酸碱对浓度比在 1:10 至 10:1（pH = pKs ± 1）时具备最大抗酸抗碱缓冲容量，超出后 pH 将迅速突跃。",
        };
      }

      // ==========================================
      // 20. 化学：亲核取代反应 SN1 vs SN2 (SN1 / SN2)
      // ==========================================
      case "chemie-sn1-sn2": {
        const isSN1 = paramA > 50;
        return {
          archetype: "sn1sn2",
          paramALabelDE: "Substrat-Substitutionsgrad",
          paramALabelZH: "底物碳中心烷基取代阻碍度",
          paramAValueDisplay: isSN1 ? "Tertiär (3° Halogenalkan)" : "Primär (1° Halogenalkan)",
          paramBLabelDE: "Lösungsmittel-Polarität",
          paramBLabelZH: "溶剂质子性极性 (Stabilisierung)",
          paramBValueDisplay: paramB > 50 ? "Polar protisch (H2O/EtOH)" : "Polar aprotisch (Aceton/DMSO)",
          rateLabelDE: "Dominanter Reaktionsmechanismus",
          rateLabelZH: "主导亲核取代反应机理路径",
          rateValue: isSN1 ? "SN1 (Monomolekular)" : "SN2 (Bimolekular)",
          subLabelDE: "Stereochemie des Produkts",
          subLabelZH: "产物立体化学构型特征",
          subValue: isSN1 ? "Racemisierung (50:50 R/S)" : "Walden-Inversion (Umkehrung)",
          graphY: isSN1 ? 80 : 30,
          insightDE: "SN1 verläuft zweistufig über ein planares Carbokation (Racemisierung). SN2 verläuft konzertiert einstufig mit Rückseitenangriff (Inversion).",
          insightZH: "SN1 经由平面碳正离子中间体导致外消旋化（三级卤代烷优势）；SN2 经由五配位过渡态发生背面反面进攻导致瓦尔登构型翻转（一级卤代烷优势）。",
        };
      }

      // ==========================================
      // 21. 化学：自由基聚合反应与链增长 (Polymerisation)
      // ==========================================
      case "chemie-polymerisation": {
        const dp = Math.round(100 + paramA * 50);
        return {
          archetype: "polymerisation",
          paramALabelDE: "Monomer-Umsatzgrad (Ethen/Styrol)",
          paramALabelZH: "单体转化率与链增长步数",
          paramAValueDisplay: `${paramA} %`,
          paramBLabelDE: "Radikalkonzentration (Initiator)",
          paramBLabelZH: "过氧化引发剂自由基浓度",
          paramBValueDisplay: `${paramB} mmol/L`,
          rateLabelDE: "Mittlerer Polymerisationsgrad P_n",
          rateLabelZH: "聚合物平均聚合度 P_n",
          rateValue: `${dp} Einheiten`,
          subLabelDE: "Mittlere Molmasse M_n",
          subLabelZH: "重均分子量理论估算",
          subValue: `${(dp * 0.104).toFixed(1)} kg/mol`,
          graphY: Math.round((dp / 5100) * 100),
          insightDE: "Kettenpolymerisation in 3 Phasen: 1. Radikalstart (Initiierung), 2. Kettenwachstum (Propagation), 3. Kettenabbruch (Rekombination / Disproportionierung).",
          insightZH: "自由基聚合三阶段：引发剂均裂产生自由基打开碳碳双键；链增长快速叠加；两高分子自由基碰撞结合导致链终止，引发剂浓度过高将降低产物分子量。",
        };
      }

      // ==========================================
      // 22. 化学：配位配体取代与深蓝络合物 (Komplexchemie)
      // ==========================================
      case "chemie-komplexchemie": {
        const tetra = paramB > 40;
        return {
          archetype: "komplex",
          paramALabelDE: "Zentralion Cu²⁺-Konzentration",
          paramALabelZH: "中心金属离子 Cu²⁺ 初始浓度",
          paramAValueDisplay: `${+(0.01 + (paramA / 100) * 0.2).toFixed(2)} mol/L`,
          paramBLabelDE: "Ammoniak-Zugabe [NH3]",
          paramBLabelZH: "浓氨水配体滴加量 [NH3]",
          paramBValueDisplay: `${+(paramB * 0.1).toFixed(1)} mL`,
          rateLabelDE: "Vorherrschende Komplexspezies",
          rateLabelZH: "主导配离子显色形态",
          rateValue: tetra ? "[Cu(NH3)4]²⁺ (Königsblau)" : "[Cu(H2O)6]²⁺ (Hellblau)",
          subLabelDE: "Extinktionsmaximum (UV-Vis)",
          subLabelZH: "分光光度计最大吸收波长 λmax",
          subValue: tetra ? "λ = 610 nm (Tiefblau)" : "λ = 800 nm (Cyan)",
          graphY: tetra ? 90 : 20,
          insightDE: "Ligandenaustausch: Wegen der höheren Ligandenfeldaufspaltung von NH3 gegenüber H2O verschiebt sich die d-d-Absorptionsbande bathochrom ins Tiefblaue.",
          insightZH: "配体置换平衡：氨分子提供更强孤对电子配位场，发生逐步取代生成四氨合铜离子 [Cu(NH3)4]²⁺，吸收带红移呈现极其鲜艳的皇家深蓝色。",
        };
      }

      // ==========================================
      // 23. 数学：黎曼和与定积分面积逼近 (Integral)
      // ==========================================
      case "mathe-integral-flaeche": {
        const nTrapeze = Math.round(2 + (paramA / 100) * 48);
        const exakt = 9.0;
        const riemann = +(exakt * (1 - 1 / (nTrapeze * 1.5))).toFixed(3);
        const fehler = +Math.abs(exakt - riemann).toFixed(3);
        return {
          archetype: "integral",
          paramALabelDE: "Anzahl Streifen n (Zerlegung)",
          paramALabelZH: "微元区间分割数 n (黎曼矩形)",
          paramAValueDisplay: `n = ${nTrapeze}`,
          paramBLabelDE: "Integrationsbereich [0; b]",
          paramBLabelZH: "积分区间上限 b",
          paramBValueDisplay: `b = 3.0`,
          rateLabelDE: "Riemannsche Untersumme",
          rateLabelZH: "黎曼和近似计算面积",
          rateValue: `${riemann} FE`,
          subLabelDE: "Exakter Grenzwert ∫₀³ x² dx",
          subLabelZH: "理论精确真值与绝对误差",
          subValue: `9.000 FE (Δ = ${fehler})`,
          graphY: Math.round((riemann / 9) * 100),
          insightDE: `Bei n = ${nTrapeze} Streifen konvergieren Ober- und Untersumme gegen den exakten Flächeninhalt des Hauptsatzes.`,
          insightZH: `分割数 n = ${nTrapeze} 时，阶梯矩形和极限逼近牛顿-莱布尼茨公式真值 F(3)-F(0) = 9.000 FE，微元误差迅速收敛至零！`,
        };
      }

      // ==========================================
      // 24. 数学：多项式函数全貌分析 (Kurvendiskussion)
      // ==========================================
      case "mathe-kurvendiskussion": {
        const x = +((paramA - 50) / 15).toFixed(1);
        const f = +(Math.pow(x, 3) - 3 * x).toFixed(2);
        const fPrime = +(3 * Math.pow(x, 2) - 3).toFixed(2);
        const fDoublePrime = +(6 * x).toFixed(2);
        return {
          archetype: "kurvendiskussion",
          paramALabelDE: "Untersuchungsstelle x",
          paramALabelZH: "切线探测动点 x 坐标",
          paramAValueDisplay: `x = ${x}`,
          paramBLabelDE: "Krümmungsgüte f''(x)",
          paramBLabelZH: "二阶导数曲率判别",
          paramBValueDisplay: `f'' = ${fDoublePrime}`,
          rateLabelDE: `Funktionswert f(x)`,
          rateLabelZH: `函数值 f(x)`,
          rateValue: `${f}`,
          subLabelDE: `Tangentensteigung f'(x)`,
          subLabelZH: `切线斜率 f'(x)`,
          subValue: `m = ${fPrime}`,
          graphY: Math.min(100, Math.max(0, Math.round(50 + f * 10))),
          insightDE: Math.abs(fPrime) < 0.2 ? (fDoublePrime > 0 ? "Lokales Minimum (Tiefpunkt TP bei x=1)!" : "Lokales Maximum (Hochpunkt HP bei x=-1)!") : "Monotonie-Bereich: Kurve steigt oder fällt streng monoton.",
          insightZH: Math.abs(fPrime) < 0.2 ? (fDoublePrime > 0 ? "一阶导数为0且二阶导数>0：局部极小值点 TP(1, -2)！" : "一阶导数为0且二阶导数<0：局部极大值点 HP(-1, 2)！") : "非极值点：函数处于严格单调递增或递减区间。",
        };
      }

      // ==========================================
      // 25. 数学：函数族与极值点轨迹曲线 (Funktionenscharen)
      // ==========================================
      case "mathe-funktionenscharen": {
        const k = +(0.5 + (paramA / 100) * 4.5).toFixed(1);
        const xHp = +(-Math.sqrt(k / 3)).toFixed(2);
        const yHp = +(2 * Math.pow(k / 3, 1.5)).toFixed(2);
        return {
          archetype: "funktionenschar",
          paramALabelDE: "Scharparameter k (fk(x) = x³ - kx)",
          paramALabelZH: "族参数 k (控制函数振幅)",
          paramAValueDisplay: `k = ${k}`,
          paramBLabelDE: "Ortskurven-Aktivierung",
          paramBLabelZH: "显示极大值点动态轨迹曲线",
          paramBValueDisplay: paramB > 50 ? "Eingeblendet" : "Verborgen",
          rateLabelDE: "Hochpunkt HP_k Koordinaten",
          rateLabelZH: "随 k 变动的极大值点 HP 坐标",
          rateValue: `HP(${xHp} | ${yHp})`,
          subLabelDE: "Ortskurve aller Extrema",
          subLabelZH: "极值点轨迹方程 y(x)",
          subValue: "y = -2x³ (für x < 0)",
          graphY: Math.round((k / 5) * 80 + 10),
          insightDE: "Funktionenschar: Durch Eliminieren des Scharparameters k aus x_E und y_E erhält man die geschlossene Funktionsgleichung der Ortskurve.",
          insightZH: "函数族消参求轨迹法：联立 x = -√(k/3) 与 y = 2(k/3)^(3/2)，将 k = 3x² 代入消除参数 k，即得所有极大值点必落在曲线 y = -2x³ 上！",
        };
      }

      // ==========================================
      // 26. 数学：定积分求旋转体体积 (Rotationskoerper)
      // ==========================================
      case "mathe-rotationskoerper": {
        const b = +(1 + (paramA / 100) * 3).toFixed(1);
        // f(x) = sqrt(x), V = pi * int_0^b x dx = pi * b^2 / 2
        const v = +(Math.PI * Math.pow(Number(b), 2) / 2).toFixed(2);
        return {
          archetype: "rotation",
          paramALabelDE: "Obere Integrationsgrenze b",
          paramALabelZH: "旋转体沿 x 轴截断上限 b",
          paramAValueDisplay: `b = ${b}`,
          paramBLabelDE: "Rotationswinkel φ (0° - 360°)",
          paramBLabelZH: "三维旋转扫描展开角度",
          paramBValueDisplay: `${Math.round((paramB / 100) * 360)}°`,
          rateLabelDE: "Volumen V = π · ∫₀ᵇ (f(x))² dx",
          rateLabelZH: "旋转抛物台精准体积 V",
          rateValue: `${v} VE (Volumeneinheiten)`,
          subLabelDE: "Querschnittsfläche an b",
          subLabelZH: "上限处垂直切片圆形底面积",
          subValue: `${(Math.PI * Number(b)).toFixed(2)} FE`,
          graphY: Math.min(100, Math.round(Number(v) * 3.5)),
          insightDE: "Rotationskörper um die x-Achse: Die Summe unendlich vieler dünner Zylinderscheiben mit Radius r = f(x) und Dicke dx ergibt das exakte Rauminhalt-Integral.",
          insightZH: "绕 x 轴旋转体积分原理：将立体沿 x 轴切成无数厚度为 dx、半径为 f(x) 的微元圆盘，圆盘面积 π(f(x))² 沿区间 [0, b] 连续累加积分。",
        };
      }

      // ==========================================
      // 27. 数学：空间解析几何点到平面距离 (Ebene & Abstand)
      // ==========================================
      case "mathe-ebene-abstand": {
        const pz = +(1 + (paramA / 100) * 8).toFixed(1);
        // Plane: 2x + 2y - z = 4, Normal vector length = sqrt(4+4+1) = 3
        // Point P(1, 1, pz), d = |2(1) + 2(1) - pz - 4| / 3 = |pz| / 3
        const d = +(Math.abs(Number(pz)) / 3).toFixed(2);
        return {
          archetype: "ebene",
          paramALabelDE: "z-Koordinate des Testpunkts P(1|1|z)",
          paramALabelZH: "测试点 P 的空间高程 z 坐标",
          paramAValueDisplay: `P(1 | 1 | ${pz})`,
          paramBLabelDE: "Normalenvektor-Skalierung",
          paramBLabelZH: "平面的法向量标准化系数",
          paramBValueDisplay: `|n| = 3.0 (Hesse-Form)`,
          rateLabelDE: "Abstand d(P, E) (Hessesche NF)",
          rateLabelZH: "点到平面的最短空间垂线距离 d",
          rateValue: `d = ${d} LE`,
          subLabelDE: "Lotfußpunkt F auf der Ebene",
          subLabelZH: "空间垂足 F 在平面上的投影",
          subValue: `F(${+(1 - (2*Number(d))/3).toFixed(1)} | ${+(1 - (2*Number(d))/3).toFixed(1)} | ...) `,
          graphY: Math.round(Number(d) * 30),
          insightDE: "Hessesche Normalenform: d = |(p - a) · n0|. Der Abstand entspricht der senkrechten Projektion des Verbindungsvektors auf den normierten Normalenvektor n0.",
          insightZH: "黑塞法线式定理：将平面法向量归一化为单位向量 n0，点 P 到平面的距离等于空间连接向量与单位法向量的点积绝对值，物理意义即正交垂直投影。",
        };
      }

      // ==========================================
      // 28. 数学：向量点积夹角与叉积外积 (Vektor)
      // ==========================================
      case "mathe-vektor-skalar-kreuz": {
        const alpha = Math.round((paramA / 100) * 180);
        const skalar = +(Math.cos((alpha * Math.PI) / 180)).toFixed(2);
        const kreuz = +(Math.sin((alpha * Math.PI) / 180)).toFixed(2);
        return {
          archetype: "vektor",
          paramALabelDE: "Winkel α zwischen Vektoren",
          paramALabelZH: "两空间向量夹角 α (0° - 180°)",
          paramAValueDisplay: `α = ${alpha}°`,
          paramBLabelDE: "Vektorlänge |b|",
          paramBLabelZH: "动向量模长 |b|",
          paramBValueDisplay: `${+(1 + (paramB / 100) * 4).toFixed(1)}`,
          rateLabelDE: "Skalarprodukt a · b = |a||b| cos(α)",
          rateLabelZH: "向量点积 (内积正投影度量)",
          rateValue: `${skalar} (${alpha === 90 ? "Orthogonal!" : skalar > 0 ? "Spitz" : "Stumpf"})`,
          subLabelDE: "Fläche Parallelogramm |a × b|",
          subLabelZH: "叉积模长 (张成平行四边形面积)",
          subValue: `${kreuz} FE`,
          graphY: Math.round((alpha / 180) * 100),
          insightDE: "Orthogonalitätskriterium: Genau dann, wenn a · b = 0 ist, stehen beide Vektoren senkrecht aufeinander. Der Kreuzproduktvektor steht senkrecht auf beiden.",
          insightZH: "正交判别法：两非零向量点积为 0 是它们互相垂直的充要条件！叉积向量同时垂直于这两个向量，其模长在几何上等于两者张成的平行四边形面积。",
        };
      }

      // ==========================================
      // 29. 数学：马尔可夫链与稳态稳恒向量 (Markov-Ketten)
      // ==========================================
      case "mathe-markov-ketten": {
        const pA2B = +(0.1 + (paramA / 100) * 0.8).toFixed(2);
        const pB2A = +(0.1 + (paramB / 100) * 0.8).toFixed(2);
        const statA = Math.round((Number(pB2A) / (Number(pA2B) + Number(pB2A))) * 100);
        const statB = 100 - statA;
        return {
          archetype: "markov",
          paramALabelDE: "Wechselwahrscheinlichkeit A → B",
          paramALabelZH: "状态跃迁转移概率 P(A → B)",
          paramAValueDisplay: `${pA2B}`,
          paramBLabelDE: "Rückkehrwahrscheinlichkeit B → A",
          paramBLabelZH: "状态跃迁反向概率 P(B → A)",
          paramBValueDisplay: `${pB2A}`,
          rateLabelDE: "Stationärer Grenzvektor v_inf",
          rateLabelZH: "长期稳态极限概率分布向量",
          rateValue: `[ A: ${statA}% | B: ${statB}% ]`,
          subLabelDE: "Eigenwertgleichung M · v = v",
          subLabelZH: "特征值方程检验",
          subValue: "λ = 1 (Gleichgewicht)",
          graphY: statA,
          insightDE: "Stationäre Verteilung: Langfristig stellt sich unabhängig vom Startzustand der Fixvektor v ein, für den M · v = v gilt (Eigenvektor zum Eigenwert λ = 1).",
          insightZH: "马尔可夫稳态定理：对于正则转移矩阵，随着迭代步数趋于无穷，系统必然收敛到唯一不变的不动点稳态向量（矩阵特征值 λ = 1 的特征向量）。",
        };
      }

      // ==========================================
      // 30. 数学：二项分布假设检验与第一/二类错误 (Hypothesentest)
      // ==========================================
      case "mathe-hypothesentest": {
        const kKrit = Math.round(40 + (paramA / 100) * 20);
        const alpha = Math.max(0.1, +(10 * Math.exp(-(paramA - 30) / 12)).toFixed(2));
        return {
          archetype: "hypothese",
          paramALabelDE: "Kritischer Wert k (Entscheidungsgrenze)",
          paramALabelZH: "临界拒绝值门槛 k (拒绝域 K)",
          paramAValueDisplay: `k = ${kKrit}`,
          paramBLabelDE: "Wahre Gegenwahrscheinlichkeit p1",
          paramBLabelZH: "备择假设真实概率参数 p1",
          paramBValueDisplay: `p1 = ${+(0.5 + (paramB / 100) * 0.4).toFixed(2)}`,
          rateLabelDE: "Signifikanzniveau α (Fehler 1. Art)",
          rateLabelZH: "显著性水平 α (弃真概率 / 第一类错误)",
          rateValue: `α = ${alpha} % (${alpha <= 5 ? "Signifikant" : "Zu hoch!"})`,
          subLabelDE: "Ablehnungsbereich K",
          subLabelZH: "单侧检验否定域区间",
          subValue: `K = {${kKrit}, ..., 100}`,
          graphY: Math.round(alpha * 10),
          insightDE: "Hypothesentest: Fehler 1. Art (α) ist die Wahrscheinlichkeit, die Nullhypothese H0 irrtümlich abzulehnen, obwohl sie wahr ist. Der Fehler 2. Art (β) verhält sich gegenläufig.",
          insightZH: "假设检验核心权衡：拒绝域界限外推可压低第一类错误 α（弃真风险），但必然导致第二类错误 β（取伪风险）上升；二者不可同时消除，只能做权衡取舍。",
        };
      }

      // ==========================================
      // 31. 数学：二维散点与最小二乘线性回归 (Regression)
      // ==========================================
      case "mathe-korrelation-regression": {
        const r = +(0.2 + (paramA / 100) * 0.78).toFixed(2);
        const r2 = +(Math.pow(Number(r), 2)).toFixed(2);
        return {
          archetype: "regression",
          paramALabelDE: "Korrelationsgrad (Streuungsdichte)",
          paramALabelZH: "数据点集线性聚集紧密程度",
          paramAValueDisplay: `${paramA} %`,
          paramBLabelDE: "Ausreißer-Häufigkeit",
          paramBLabelZH: "离群孤立野值干扰点权重",
          paramBValueDisplay: `${paramB} %`,
          rateLabelDE: "Bravais-Pearson-Korrelation r",
          rateLabelZH: "皮尔逊相关系数 r",
          rateValue: `r = ${r} (Stark positiv)`,
          subLabelDE: "Bestimmtheitsmaß R²",
          subLabelZH: "回归可解释方差判定系数 R²",
          subValue: `R² = ${r2} (${Math.round(Number(r2) * 100)}%)`,
          graphY: Math.round(Number(r) * 100),
          insightDE: "Lineare Regression: Die Gerade minimiert die Summe der quadrierten vertikalen Abstände der Datenpunkte. R² misst den Anteil der erklärten Streuung.",
          insightZH: "最小二乘法回归本质：寻找一条直线使得所有数据点的垂直残差平方和达到最小；判定系数 R² = 0.85 意味着因变量总波动的 85% 可由自变量线性模型解释。",
        };
      }

      // ==========================================
      // 32. 社科：德国 Sinus-Milieus 社会阶层矩阵 (Sinus-Milieus)
      // ==========================================
      case "sowi-sinus-milieus": {
        const milieu = paramA < 35 ? (paramB < 50 ? "Traditionelles Milieu" : "Konservativ-Gehobenes Milieu") : paramA < 70 ? (paramB < 50 ? "Bürgerliche Mitte" : "Adaptiv-Pragmatische Mitte") : (paramB < 50 ? "Prekäres Milieu" : "Expeditive / Postmaterielle");
        return {
          archetype: "milieu",
          paramALabelDE: "Grundorientierung (Tradition → Neuorientierung)",
          paramALabelZH: "价值取向横坐标 (传统守旧 → 现代多元)",
          paramAValueDisplay: `${paramA} % (Achse X)`,
          paramBLabelDE: "Soziale Lage (Unterschicht → Oberschicht)",
          paramBLabelZH: "社会阶层纵坐标 (下层劳动 → 上层精英)",
          paramBValueDisplay: `${paramB} % (Achse Y)`,
          rateLabelDE: "Zugeordnetes Sinus-Milieu",
          rateLabelZH: "德意志社会学定格主流社群",
          rateValue: milieu,
          subLabelDE: "Wahl- & Konsumverhalten",
          subLabelZH: "典型生活方式与社会流动性",
          subValue: paramA > 60 ? "Postmateriell / Digital" : "Sicherheitsorientiert",
          graphY: paramB,
          insightDE: "Sinus-Milieus: Überwindet rein ökonomische Schichtmodelle durch Verknüpfung von sozialer Lage (Bildung, Einkommen) und grundlegenden Lebenswerten.",
          insightZH: "德国 Sinus 容积模型突破了传统马克思或阶级论的单一收入划分，通过纵轴「社会经济地位」与横轴「基础价值观」双维度精准定位当代社会群体的消费与政治偏好。",
        };
      }

      // ==========================================
      // 33. 社科：宏观景气周期与稳定法四角 (Konjunktur)
      // ==========================================
      case "sowi-konjunktur-zyklus": {
        const bip = +(1.5 + 2.5 * Math.sin((paramA / 100) * 2 * Math.PI)).toFixed(1);
        const phase = paramA < 25 ? (de ? "Aufschwung (Expansion)" : "复苏回升期 (Expansion)") : paramA < 50 ? (de ? "Boom (Hochkonjunktur)" : "繁荣过热期 (Boom)") : paramA < 75 ? (de ? "Abschwung (Rezession)" : "衰退紧缩期 (Rezession)") : (de ? "Tiefstand (Depression)" : "低谷萧条期 (Depression)");
        return {
          archetype: "konjunktur",
          paramALabelDE: "Zyklus-Fortschritt (Zeitachse t)",
          paramALabelZH: "景气时间轴行进位置 (t)",
          paramAValueDisplay: `${paramA} % (Takt)`,
          paramBLabelDE: "Antizyklischer Impuls",
          paramBLabelZH: "反周期宏观财政干预强度",
          paramBValueDisplay: `${paramB} %`,
          rateLabelDE: "Reales BIP-Wachstum",
          rateLabelZH: "实际 GDP 增长率",
          rateValue: `${bip} %`,
          subLabelDE: "Aktuelle Konjunkturphase",
          subLabelZH: "宏观所处景气阶段",
          subValue: phase,
          graphY: Math.round((Number(bip) + 2) * 20),
          insightDE: `Konjunkturphase: ${phase}. Frühindikatoren wie ifo-Geschäftsklima signalisieren Phasenwechsel. Antizyklische Stabilisierungspolitik erforderlich.`,
          insightZH: `当前阶段为【${phase}】。GDP 产出缺口偏离潜在产出，需根据凯恩斯主义运用反周期预算平衡（Surplus / Deficit Spending）平抑震荡。`,
        };
      }

      // ==========================================
      // 34. 社科：欧洲央行利率传导走廊与物价稳定 (EZB)
      // ==========================================
      case "sowi-ezb-geldpolitik": {
        const leitzins = +(0.25 + (paramA / 100) * 4.75).toFixed(2);
        const inflation = Math.max(0.5, +(6.5 - Number(leitzins) * 0.9).toFixed(1));
        return {
          archetype: "ezb",
          paramALabelDE: "EZB-Hauptrefinanzierungssatz",
          paramALabelZH: "欧洲央行基准主再融资利率",
          paramAValueDisplay: `${leitzins} %`,
          paramBLabelDE: "Geldmengenwachstum M3",
          paramBLabelZH: "广义货币供应量 M3 增速",
          paramBValueDisplay: `${paramB} %`,
          rateLabelDE: "Verbraucherpreisinflation (HVPI)",
          rateLabelZH: "调和消费者物价通胀率 (HVPI)",
          rateValue: `${inflation} %`,
          subLabelDE: "EZB-Zielabweichung (Ziel 2%)",
          subLabelZH: "对准 2% 价格稳定目标偏差",
          subValue: Number(inflation) > 2.0 ? `+${(Number(inflation) - 2.0).toFixed(1)}% (zu hoch)` : "Zielkonform",
          graphY: Math.round((Number(inflation) / 8) * 100),
          insightDE: Number(leitzins) > 3.0 ? "Restriktive Zinspolitik dämpft Konsumnachfrage und Kreditvergabe, um Inflation auf 2% zurückzuführen." : "Expansive Niedrigzinspolitik regt Investitionen an, birgt aber Überhitzungsgefahren.",
          insightZH: Number(leitzins) > 3.0 ? "加息紧缩通过商业银行贷款利差传导，抑制企业资本开支与居民信贷，引导通胀向 2% 黄金目标收敛。" : "低息扩张刺激总需求，但易诱发资产泡沫与物价上行风险。",
        };
      }

      // ==========================================
      // 35. 社科：德国福利国家税收再分配与基尼系数 (Sozialstaat)
      // ==========================================
      case "sowi-sozialstaat-transfer": {
        const primGini = 0.48;
        const transferReduktion = +((paramA / 100) * 0.22).toFixed(2);
        const sekGini = +(primGini - transferReduktion).toFixed(2);
        return {
          archetype: "sozialstaat",
          paramALabelDE: "Steuerprogression & Transfervolumen",
          paramALabelZH: "累进所得税与转移支付再分配力度",
          paramAValueDisplay: `${paramA} %`,
          paramBLabelDE: "Grundsicherungs-Niveau (Bürgergeld)",
          paramBLabelZH: "公民基本生活兜底保障金基数",
          paramBValueDisplay: `${paramB} %`,
          rateLabelDE: "Sekundärer Gini-Koeffizient (Netto)",
          rateLabelZH: "再分配后次级净收入基尼系数",
          rateValue: `${sekGini} (Primär: ${primGini})`,
          subLabelDE: "Umverteilungseffekt ΔGini",
          subLabelZH: "基尼系数平抑改善幅度",
          subValue: `-${transferReduktion} Punkte`,
          graphY: Math.round(Number(sekGini) * 160),
          insightDE: "Sozialstaatsgebot Art. 20 Abs. 1 GG: Das System aus progressiver Einkommensteuer und Sozialtransfers senkt den deutschen Gini von 0,48 auf unter 0,30.",
          insightZH: "德国基本法第20条第1款社会国原则：通过累进税率、社保基金与转移支付，使初次分配基尼系数（0.48）显著降至二次净收入（0.29-0.31），极大缩小贫富剪刀差。",
        };
      }

      // ==========================================
      // 36. 社科：蒙代尔-弗莱明不可能三角 (Trilemma)
      // ==========================================
      case "sowi-trilemma-trilemma": {
        const option = paramA < 35 ? (de ? "1. Autonome Geldpolitik + Freier Kapitalverkehr (z. B. EZB / USA)" : "模式一：自主货币政策 + 资本自由流动 (如欧元区 / 美国)") : paramA < 70 ? (de ? "2. Fester Wechselkurs + Autonome Geldpolitik (z. B. Bretton Woods)" : "模式二：固定汇率 + 自主货币政策 (如布雷顿森林体系)") : (de ? "3. Fester Wechselkurs + Freier Kapitalverkehr (z. B. Goldstandard)" : "模式三：固定汇率 + 资本自由流动 (如古典金本位制)");
        return {
          archetype: "trilemma",
          paramALabelDE: "Währungspolitisches Regime",
          paramALabelZH: "三元悖论宏观制度选择切换",
          paramAValueDisplay: option,
          paramBLabelDE: "Kapitalverkehrskontrollen",
          paramBLabelZH: "资本账户管制封锁严密程度",
          paramBValueDisplay: `${paramB} %`,
          rateLabelDE: "Geopfertes Politikziel",
          rateLabelZH: "必然被牺牲舍弃的第三个目标",
          rateValue: paramA < 35 ? "Fester Wechselkurs" : paramA < 70 ? "Freier Kapitalverkehr" : "Autonome Zinspolitik",
          subLabelDE: "Wechselkursvolatilität",
          subLabelZH: "汇率波动抗冲击稳定性",
          subValue: paramA < 35 ? "Flexibel / Schwankend" : "Fixiert",
          graphY: paramA,
          insightDE: "Mundell-Fleming-Trilemma: Kein Land kann gleichzeitig freie Kapitalströme, feste Wechselkurse und eine eigenständige Geldpolitik verwirklichen. Nur zwei Ziele sind erreichbar.",
          insightZH: "蒙代尔-弗莱明不可能三角：任何经济体都无法同时实现资本自由流动、固定汇率和独立货币政策三项目标；欲维持汇率稳定并开放资本流动，必须放弃自主利率权。",
        };
      }

      // ==========================================
      // 37. 社科：李嘉图比较优势与国际贸易 (Ricardo)
      // ==========================================
      case "sowi-globalisierung-trade": {
        const vorteil = paramA > paramB ? "Deutschland: Spezialisierung auf Maschinenbau" : "Partnerland: Spezialisierung auf Textil/Agrar";
        const wohlfahrtsgewinn = +(3.5 + ((paramA + paramB) / 200) * 8.5).toFixed(1);
        return {
          archetype: "ricardo",
          paramALabelDE: "Produktivitätsvorteil Land A (Maschinen)",
          paramALabelZH: "本国高附加值工业品生产率优势",
          paramAValueDisplay: `${paramA} %`,
          paramBLabelDE: "Produktivitätsvorteil Land B (Agrar)",
          paramBLabelZH: "贸易伙伴国农业资源品生产率优势",
          paramBValueDisplay: `${paramB} %`,
          rateLabelDE: "Globaler Wohlfahrtsgewinn durch Handel",
          rateLabelZH: "分工贸易创造的全球总福利盈余",
          rateValue: `+${wohlfahrtsgewinn} % Realeinkommen`,
          subLabelDE: "Klausur-Kernsatz (Ricardo)",
          subLabelZH: "比较优势核心理论裁定",
          subValue: vorteil,
          graphY: Math.round(Number(wohlfahrtsgewinn) * 8),
          insightDE: "David Ricardo: Selbst wenn ein Land alle Güter absolut billiger herstellen kann, lohnt sich internationaler Handel bei Vorliegen komparativer Kostenvorteile.",
          insightZH: "李嘉图比较优势学说：即便一国在所有领域均具备绝对生产率优势，但只要两国生产不同商品的相对机会成本存在差异，两国各自专注于机会成本最低的优势商品分工互通有无，皆能提升总福利。",
        };
      }

      // ==========================================
      // 38. 社科：德国投资区位多维雷达评估 (Standort Deutschland)
      // ==========================================
      case "sowi-standort-deutschland": {
        const energie = 100 - paramA;
        const buerokratie = 100 - paramB;
        const index = Math.round((energie * 0.3 + buerokratie * 0.3 + 85 * 0.4));
        return {
          archetype: "standort",
          paramALabelDE: "Industriestrompreis & Energiekosten",
          paramALabelZH: "工业电价与绿电能源成本压力",
          paramAValueDisplay: `${paramA} % (Belastung)`,
          paramBLabelDE: "Bürokratie- & Regulierungslast",
          paramBLabelZH: "官僚审批行政程序阻碍指数",
          paramBValueDisplay: `${paramB} %`,
          rateLabelDE: "Standort-Attraktivitäts-Index (DIHK)",
          rateLabelZH: "德国工业综合投资区位吸引力得分",
          rateValue: `${index} / 100 (${index > 65 ? "Wettbewerbsfähig" : "Reisebedroht"})`,
          subLabelDE: "Stärkenprofil",
          subLabelZH: "核心支柱壁垒优势",
          subValue: "Duale Ausbildung & Infrastruktur (85/100)",
          graphY: index,
          insightDE: "Standort Deutschland im globalen Wettbewerb: Hohe Lohnnebenkosten und Energiepreise werden durch exzellente Infrastruktur, Rechtssicherheit und duale Ausbildung kompensiert.",
          insightZH: "德国区位大讨论：高税负、昂贵工业能源与官僚审批是阻碍资本开支的硬伤；双元制职业教育高素质产业工人体素、顶尖研发专利底蕴与坚实法治安全感构成了其不可替代的韧性底盘。",
        };
      }

      // ==========================================
      // 39. 德语：弗赖塔格古典戏剧五幕金字塔 (Freytagsche Pyramide)
      // ==========================================
      case "deutsch-drama-freytag": {
        const akt = paramA < 20 ? (de ? "Akt I: Exposition (Einleitung)" : "第一幕：引子与铺垫 (Exposition)") : paramA < 40 ? (de ? "Akt II: Steigende Handlung" : "第二幕：情节上升 (Erregendes Moment)") : paramA < 60 ? (de ? "Akt III: Höhepunkt & Peripetie" : "第三幕：最高潮与突转 (Peripetie)") : paramA < 80 ? (de ? "Akt IV: Fallende Handlung" : "第四幕：情节回落 (Retardation)") : (de ? "Akt V: Katastrophe / Lösung" : "第五幕：悲剧决局 (Katastrophe)");
        const spannung = paramA < 60 ? Math.round((paramA / 60) * 100) : Math.round(100 - ((paramA - 60) / 40) * 70);
        return {
          archetype: "freytag",
          paramALabelDE: "Handlungsfortschritt (Akt I - V)",
          paramALabelZH: "戏剧时间线推进 (第一至五幕)",
          paramAValueDisplay: `${paramA} %`,
          paramBLabelDE: "Konfliktpotenzial",
          paramBLabelZH: "悲剧人物内心冲突张力",
          paramBValueDisplay: `${paramB} %`,
          rateLabelDE: "Dramatische Spannungskurve",
          rateLabelZH: "戏剧张力峰值指数",
          rateValue: `${spannung} %`,
          subLabelDE: "Aktuelle Strukturphase",
          subLabelZH: "经典封闭式戏剧阶段",
          subValue: akt,
          graphY: spannung,
          insightDE: "Gustav Freytags Pyramidenschema: Die Peripetie in Akt III markiert den irreversiblen Umschlag des Schicksals (z. B. Mord in Schillers Maria Stuart).",
          insightZH: "弗赖塔格经典五幕金字塔：第三幕中点突转（Peripetie）切断妥协退路，第四幕延缓（Retardierendes Moment）给观众虚幻希望，使终幕悲剧更具震撼力。",
        };
      }

      // ==========================================
      // 40. 德语：诗歌音步格律与诗行节奏 (Metrik & Lyrik)
      // ==========================================
      case "deutsch-lyrik-metrum": {
        const metrum = paramA < 25 ? (de ? "Jambus (v -)" : "抑扬格 (∪ -) Ge-dicht") : paramA < 50 ? (de ? "Trochäus (- v)" : "扬抑格 (- ∪) Freu-de") : paramA < 75 ? (de ? "Daktylus (- v v)" : "扬抑抑格 (- ∪ ∪) Wun-der-bar") : (de ? "Anapäst (v v -)" : "抑抑扬格 (∪ ∪ -) Zaube-rei");
        return {
          archetype: "metrum",
          paramALabelDE: "Metrischer Versfuß",
          paramALabelZH: "诗歌音步格律类型",
          paramAValueDisplay: metrum,
          paramBLabelDE: "Kadenz am Versende",
          paramBLabelZH: "行尾韵脚停顿 (Kadenz)",
          paramBValueDisplay: paramB > 50 ? (de ? "Männlich (stumpf)" : "阳性 (单重音收尾)") : (de ? "Weiblich (klingend)" : "阴性 (轻音流转收尾)"),
          rateLabelDE: "Rhythmus & Tempo",
          rateLabelZH: "音步节奏与情感基调",
          rateValue: paramA < 50 ? (de ? "Getragen / Bedächtig" : "庄重沉静 / 呼吸舒展") : (de ? "Drängend / Beschleunigt" : "急促激昂 / 旋转跳跃"),
          subLabelDE: "Hebungen pro Verszeile",
          subLabelZH: "每行重音拍数 (Hebungen)",
          subValue: "4-hebig (Vierheber)",
          graphY: 85,
          insightDE: "Verslehre: Der Jambus imitiert den natürlichen Atemrhythmus, während die weibliche Kadenz die Versgrenze verflüssigt (Enjambement).",
          insightZH: "音步是诗歌呼吸的灵魂：抑扬格稳健沉思，扬抑格活泼顿挫；阳性韵短促果断，阴性韵悠长流转，跨行（Enjambement）则打破形式束缚。",
        };
      }

      // ==========================================
      // 41. 德语：布莱希特叙事剧与间离效果 (Brecht V-Effekt)
      // ==========================================
      case "deutsch-brecht-episch": {
        const vEffekt = paramB > 45;
        return {
          archetype: "brecht",
          paramALabelDE: "Traditionelle Einfühlung (Katharsis)",
          paramALabelZH: "传统剧场沉浸共鸣与情感净化",
          paramAValueDisplay: `${paramA} %`,
          paramBLabelDE: "Verfremdungsmittel (Spruchbänder / Songs)",
          paramBLabelZH: "间离手段介入 (字幕投影 / 叙事唱段)",
          paramBValueDisplay: `${paramB} %`,
          rateLabelDE: "Zuschauer-Haltung nach Brecht",
          rateLabelZH: "剧场观众意识觉醒状态",
          rateValue: vEffekt ? (de ? "KRITISCH-BEOBACHTEND (V-Effekt)" : "理性批判审视 (打破第四堵墙)") : (de ? "EMOTIONAL BETÖRT" : "被动情感麻醉沉溺"),
          subLabelDE: "Theaterkonzeption",
          subLabelZH: "戏剧范式归属",
          subValue: vEffekt ? "Episches Theater" : "Aristotelisch-dramatisch",
          graphY: paramB,
          insightDE: "Bertolt Brecht: Der Verfremdungseffekt entreißt das Geschehen der Selbstverständlichkeit und fordert den Zuschauer auf, gesellschaftliche Missstände aktiv zu verändern.",
          insightZH: "布莱希特叙事剧核心：用间离效果（V-Effekt）摧毁舞台逼真幻象，阻断观众的情感共鸣麻醉，将其从被动看客转变为反思社会剥削机制、具有变革意志的行动者。",
        };
      }

      // ==========================================
      // 42. 德语：卡夫卡《变形记》家庭空间异化 (Kafka Verwandlung)
      // ==========================================
      case "deutsch-kafka-verwandlung": {
        const entfremdung = Math.round(paramA * 0.6 + paramB * 0.4);
        return {
          archetype: "kafka",
          paramALabelDE: "Arbeitsunfähigkeit & Nützlichkeitsverlust",
          paramALabelZH: "作为家庭经济支柱的劳动力丧失程度",
          paramAValueDisplay: `${paramA} %`,
          paramBLabelDE: "Isolation im Zimmer (3 verschlossene Türen)",
          paramBLabelZH: "卧室三扇门锁死隔离与非人化排斥",
          paramBValueDisplay: `${paramB} %`,
          rateLabelDE: "Entfremdungsgrad Gregor Samsas",
          rateLabelZH: "格里高尔·萨姆沙异化与被遗弃指数",
          rateValue: `${entfremdung} % (${entfremdung > 70 ? "Ungeziefer-Dasein" : "Menschlicher Restfunke"})`,
          subLabelDE: "Reaktion des Vaters (Apfelwurf)",
          subLabelZH: "父权暴力镇压象征",
          subValue: paramA > 60 ? "Faulender Apfel im Rücken" : "Drohende Faust",
          graphY: entfremdung,
          insightDE: "Franz Kafka: Die Verwandlung in ein ungeheures Ungeziefer entlarvt die bürgerliche Familie als rücksichtsloses ökonomisches Ausbeutungsverhältnis.",
          insightZH: "卡夫卡《变形记》核心隐喻：一旦丧失向雇主出卖劳动力的价值，市民家庭对儿子的所谓亲情温情立即暴露出赤裸残酷的功利算计与冷漠弃绝。",
        };
      }

      // ==========================================
      // 43. 德语：博尔歇特战后废墟文学与零度语言 (Trümmerliteratur)
      // ==========================================
      case "deutsch-borchert-draussen": {
        const pathosVerweigerung = paramA;
        return {
          archetype: "borchert",
          paramALabelDE: "Kahlschlag der Sprache (Verweigerung von Pathos)",
          paramALabelZH: "废墟零度语言 (彻底剔除纳粹修辞假崇高)",
          paramAValueDisplay: `${pathosVerweigerung} %`,
          paramBLabelDE: "Heimkehrer-Trauma (Beckmanns Verzweiflung)",
          paramBLabelZH: "战后归乡退伍军人创伤痛苦指数",
          paramBValueDisplay: `${paramB} %`,
          rateLabelDE: "Stilistische Ausprägung",
          rateLabelZH: "战后文学典型断奏短句风格",
          rateValue: pathosVerweigerung > 50 ? (de ? "Stakkato & Kahlschlag" : "短促断奏、冷峻写实、无修饰") : (de ? "Traditionell" : "传统抒情修辞"),
          subLabelDE: "Zentrales Leitmotiv",
          subLabelZH: "博尔歇特核心命题隐喻",
          subValue: "Draußen vor der Tür / Das Brot (Schuld)",
          graphY: paramB,
          insightDE: "Wolfgang Borchert: Trümmerliteratur nach 1945 verzichtet radikal auf schöngeistige Floskeln, um die nackte Zerstörung und existenzielle Entwurzelung ungeschminkt auszusprechen.",
          insightZH: "博尔歇特废墟文学（Trümmerliteratur）：二战后德国青年一代作家拒绝一切被纳粹宣传污染的虚妄浮华辞藻，以白描断奏短句直击战争废墟、饥饿愧疚与归乡无门的灵魂深渊。",
        };
      }

      // ==========================================
      // 44. 德语：图尔敏论证结构解剖沙盒 (Toulmin Sachtext)
      // ==========================================
      case "deutsch-sachtext-argument": {
        const schluessig = paramA > 40 && paramB > 40;
        return {
          archetype: "toulmin",
          paramALabelDE: "Warrant-Stützung (Backing-Plausibilität)",
          paramALabelZH: "论证大前提准则与法理支撑强度 (Warrant)",
          paramAValueDisplay: `${paramA} %`,
          paramBLabelDE: "Rebuttal-Entkräftung (Ausnahmebedingung)",
          paramBLabelZH: "对反驳特例条件的有效限制化解 (Rebuttal)",
          paramBValueDisplay: `${paramB} %`,
          rateLabelDE: "Toulminsche Argumentationskraft",
          rateLabelZH: "非虚构论述文论证严密说服力",
          rateValue: schluessig ? (de ? "STICHHALTIG / SCHLÜSSIG" : "逻辑严密 / 论据无可辩驳") : (de ? "FEHLSCHLUSS / ANGRIFFBAR" : "存在漏洞 / 论据不足立论不稳"),
          subLabelDE: "Strukturkette (Datum -> Claim)",
          subLabelZH: "完整六要素链条闭环",
          subValue: schluessig ? "Vollständig (Datum + Warrant + Backing)" : "Unvollständig",
          graphY: schluessig ? 85 : 25,
          insightDE: "Stephen Toulmin: Ein starkes Argument stützt den Schluss von Tatsachen (Datum) auf die Behauptung (Claim) durch eine allgemeine Schlussregel (Warrant), abgesichert gegen Einwände (Rebuttal).",
          insightZH: "图尔敏论证模型：高分会考议论文必考分析框架——由事实根据（Datum）推导中心论点（Claim），必须有公认准则（Warrant）和权威证据（Backing）托底，并主动限定例外（Rebuttal）。",
        };
      }

      // 默认回退（若有未知实验室，展示精密科学仪器刻度与测量台）
      default: {
        return {
          archetype: "instrument",
          paramALabelDE: "Messwert-Kalibrierung",
          paramALabelZH: "探测传感器灵敏度校准",
          paramAValueDisplay: `${paramA} %`,
          paramBLabelDE: "Dämpfungskoeffizient",
          paramBLabelZH: "系统响应滤波阻尼系数",
          paramBValueDisplay: `${paramB} %`,
          rateLabelDE: "System-Gleichgewichtswert",
          rateLabelZH: "稳态系统输出参量",
          rateValue: `${+(paramA * 0.1).toFixed(2)}`,
          subLabelDE: "Signal-Rausch-Verhältnis",
          subLabelZH: "信噪比响应比率",
          subValue: `${paramB} dB`,
          graphY: paramA,
          insightDE: "Systemparameter im Gleichgewicht. Konsistente Verhaltensdynamik.",
          insightZH: "参数在有效量程内稳定运行，动态展现微观定量交互规律。",
        };
      }
    }
  }, [sim.id, paramA, paramB, de]);

  const handleExport = () => {
    const text = de
      ? `Labor: ${sim.titleDE} (${sim.kategorieDE})\nParameter A: ${data.paramALabelDE} = ${data.paramAValueDisplay}\nParameter B: ${data.paramBLabelDE} = ${data.paramBValueDisplay}\nMesswert: ${data.rateLabelDE} = ${data.rateValue}\nErkenntnis: ${data.insightDE}`
      : `实验室: ${sim.titleZH} (${sim.kategorieZH})\n参数 A: ${data.paramALabelZH} = ${data.paramAValueDisplay}\n参数 B: ${data.paramBLabelZH} = ${data.paramBValueDisplay}\n测定数据: ${data.rateLabelZH} = ${data.rateValue}\n核心考点结论: ${data.insightZH}`;
    if (onExportFinding) {
      onExportFinding(text);
    } else {
      navigator.clipboard.writeText(text);
      alert(de ? "Messdaten in Zwischenablage kopiert!" : "实验数据已复制到剪贴板！");
    }
  };

  // ==========================================================================
  // 领域专属真实 SVG 交互仿真画布渲染引擎（全部 44 个实验均有专属可视化架构）
  // ==========================================================================
  const renderArchetypeCanvas = () => {
    switch (data.archetype) {
      // 1. 哲学：李贝特实验脑电与自由意志
      case "libet": {
        const spotAngle = ((Date.now() / 2560) * 360) % 360;
        const bpX = 80 + (paramA / 100) * 80;
        const wX = 220 + (paramB / 100) * 60;
        return (
          <div className="flex flex-col gap-3 w-full py-2">
            <svg className="w-full h-52 rounded bg-[var(--paper-subtle)]/40 border border-[var(--line)]/50" viewBox="0 0 440 200">
              <circle cx="70" cy="100" r="48" fill="none" stroke="var(--ink)" strokeWidth="1.5" strokeOpacity="0.4" />
              {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg) => (
                <line
                  key={deg}
                  x1={70 + 44 * Math.cos((deg * Math.PI) / 180)}
                  y1={100 + 44 * Math.sin((deg * Math.PI) / 180)}
                  x2={70 + 48 * Math.cos((deg * Math.PI) / 180)}
                  y2={100 + 48 * Math.sin((deg * Math.PI) / 180)}
                  stroke="var(--ink)"
                  strokeWidth="1"
                  strokeOpacity="0.5"
                />
              ))}
              <circle
                cx={70 + 40 * Math.cos((spotAngle * Math.PI) / 180)}
                cy={100 + 40 * Math.sin((spotAngle * Math.PI) / 180)}
                r="4.5"
                fill="var(--accent)"
              />
              <text x="70" y="104" textAnchor="middle" fontSize="9" fill="var(--ink)" fontFamily="monospace" fontWeight="bold">
                2.56s/U
              </text>
              <text x="70" y="165" textAnchor="middle" fontSize="9" fill="var(--gray)" fontFamily="monospace">
                Libet-Uhr
              </text>

              <line x1="140" y1="130" x2="420" y2="130" stroke="var(--ink)" strokeWidth="1.5" strokeOpacity="0.3" />
              <line x1="390" y1="30" x2="390" y2="160" stroke="#dc2626" strokeWidth="1.5" strokeDasharray="3,3" />
              <text x="390" y="172" textAnchor="middle" fontSize="9" fill="#dc2626" fontFamily="monospace" fontWeight="bold">
                0ms Handlung
              </text>

              <rect x={wX} y="35" width={390 - wX} height="95" fill="#22c55e" fillOpacity="0.12" rx="3" />
              <text x={(wX + 390) / 2} y="48" textAnchor="middle" fontSize="8" fill="#16a34a" fontWeight="bold" fontFamily="monospace">
                Veto-Fenster (100ms)
              </text>

              <path
                d={`M 140 130 L ${bpX} 130 C ${bpX + 40} 130, ${wX - 20} 60, ${wX} 60 L 390 60 L 400 130 L 420 130`}
                fill="none"
                stroke="var(--accent)"
                strokeWidth="2.5"
              />

              <line x1={bpX} y1="40" x2={bpX} y2="150" stroke="var(--accent)" strokeWidth="1" strokeDasharray="2,2" />
              <circle cx={bpX} cy="130" r="4" fill="var(--accent)" />
              <text x={bpX} y="32" textAnchor="middle" fontSize="9" fill="var(--accent)" fontFamily="monospace" fontWeight="bold">
                BP: {data.paramAValueDisplay}
              </text>

              <line x1={wX} y1="40" x2={wX} y2="150" stroke="#16a34a" strokeWidth="1.5" />
              <circle cx={wX} cy="60" r="4.5" fill="#16a34a" />
              <text x={wX} y="22" textAnchor="middle" fontSize="9" fill="#16a34a" fontFamily="monospace" fontWeight="bold">
                W: {data.paramBValueDisplay}
              </text>
            </svg>

            <div className="flex items-center justify-between px-2 text-xs font-mono">
              <span className="text-[var(--gray)]">
                {de ? "Interaktiver Tastendruck-Reaktionstest:" : "动作电位触发测试："}
              </span>
              <button
                type="button"
                onClick={() => {
                  setInteractiveTriggered(true);
                  setTimeout(() => setInteractiveTriggered(false), 2000);
                }}
                className={`px-3 py-1 rounded border transition-colors ${
                  interactiveTriggered
                    ? "bg-emerald-600 text-white border-emerald-600"
                    : "bg-[var(--surface)] text-[var(--ink)] border-[var(--line)] hover:border-[var(--accent)]"
                }`}
              >
                {interactiveTriggered ? (de ? "✓ VETO AUSGEÜBT" : "✓ 成功行使否决权 (Veto)") : (de ? "⚡ AKTION AUSLÖSEN" : "⚡ 按下动作按钮 (Aktion)")}
              </button>
            </div>
          </div>
        );
      }

      // 2. 生物：光合作用水草气泡
      case "fotosynthese": {
        const blasenCount = Math.round((data.graphY / 100) * 12);
        return (
          <svg className="w-full h-52 rounded bg-[var(--paper-subtle)]/40 border border-[var(--line)]/50" viewBox="0 0 440 200">
            <path d="M 30 100 L 120 40 L 120 160 Z" fill="#facc15" fillOpacity={paramA / 250} />
            <rect x="15" y="70" width="30" height="60" rx="4" fill="#334155" />
            <circle cx="30" cy="100" r="10" fill="#fef08a" />
            <text x="30" y="150" textAnchor="middle" fontSize="9" fill="var(--gray)" fontFamily="monospace">
              {data.paramAValueDisplay}
            </text>

            <rect x="170" y="40" width="130" height="130" rx="6" fill="#0284c7" fillOpacity="0.15" stroke="var(--ink)" strokeWidth="2" />
            <path d="M 235 160 Q 220 120 235 90 Q 250 110 235 160" fill="#15803d" />
            <path d="M 235 160 Q 260 130 250 100 Q 230 120 235 160" fill="#16a34a" />

            {Array.from({ length: blasenCount }).map((_, i) => (
              <circle
                key={i}
                cx={225 + ((i * 13) % 25)}
                cy={150 - i * 9}
                r="3.5"
                fill="none"
                stroke="#0284c7"
                strokeWidth="1.5"
              />
            ))}

            <rect x="330" y="40" width="90" height="130" rx="4" fill="var(--surface)" stroke="var(--line)" />
            <text x="375" y="60" textAnchor="middle" fontSize="9" fill="var(--gray)" fontFamily="monospace">O₂-Rate</text>
            <rect x="350" y="75" width="50" height="75" fill="var(--paper-subtle)" rx="2" />
            <rect
              x="350"
              y={150 - (data.graphY / 100) * 75}
              width="50"
              height={(data.graphY / 100) * 75}
              fill="#22c55e"
              rx="2"
            />
            <text x="375" y="165" textAnchor="middle" fontSize="10" fill="var(--ink)" fontWeight="bold" fontFamily="monospace">
              {data.rateValue}
            </text>
          </svg>
        );
      }

      // 3. 化学：丹尼尔原电池与盐桥
      case "galvanisch": {
        return (
          <svg className="w-full h-52 rounded bg-[var(--paper-subtle)]/40 border border-[var(--line)]/50" viewBox="0 0 440 200">
            <rect x="50" y="70" width="110" height="95" rx="4" fill="#e2e8f0" stroke="var(--ink)" strokeWidth="1.8" />
            <rect x="52" y="90" width="106" height="73" fill="#cbd5e1" fillOpacity="0.5" />
            <rect x="80" y="50" width="22" height="100" fill="#94a3b8" stroke="var(--ink)" strokeWidth="1.2" />
            <text x="91" y="42" textAnchor="middle" fontSize="9" fontWeight="bold" fill="var(--ink)" fontFamily="monospace">Zn Anode (-)</text>

            <rect x="280" y="70" width="110" height="95" rx="4" fill="#e2e8f0" stroke="var(--ink)" strokeWidth="1.8" />
            <rect x="282" y="90" width="106" height="73" fill="#38bdf8" fillOpacity="0.4" />
            <rect x="338" y="50" width="22" height="100" fill="#b45309" stroke="var(--ink)" strokeWidth="1.2" />
            <text x="349" y="42" textAnchor="middle" fontSize="9" fontWeight="bold" fill="var(--ink)" fontFamily="monospace">Cu Kathode (+)</text>

            <path d="M 130 110 L 130 65 L 310 65 L 310 110" fill="none" stroke="#f8fafc" strokeWidth="16" />
            <path d="M 130 110 L 130 65 L 310 65 L 310 110" fill="none" stroke="var(--ink)" strokeWidth="1.8" />
            <text x="220" y="60" textAnchor="middle" fontSize="8" fill="var(--gray)" fontFamily="monospace">KNO₃-Salzbrücke</text>

            <path d="M 91 50 L 91 25 L 200 25 M 240 25 L 349 25 L 349 50" fill="none" stroke="var(--ink)" strokeWidth="1.8" />
            <rect x="200" y="12" width="40" height="26" rx="4" fill="var(--surface)" stroke="var(--ink)" strokeWidth="1.5" />
            <text x="220" y="29" textAnchor="middle" fontSize="10" fontWeight="bold" fill="var(--accent)" fontFamily="monospace">
              {data.rateValue}
            </text>
          </svg>
        );
      }

      // 4. 化学：法拉第电解与铜沉积 (Elektrolyse)
      case "elektrolyse": {
        const mCu = Math.min(20, Math.round(data.graphY));
        return (
          <svg className="w-full h-52 rounded bg-[var(--paper-subtle)]/40 border border-[var(--line)]/50" viewBox="0 0 440 200">
            <rect x="195" y="10" width="50" height="30" rx="4" fill="#1e293b" />
            <text x="220" y="24" textAnchor="middle" fontSize="8" fill="#38bdf8" fontFamily="monospace">DC-Quelle</text>
            <text x="220" y="35" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#f8fafc" fontFamily="monospace">{data.paramAValueDisplay}</text>

            <rect x="100" y="60" width="240" height="125" rx="6" fill="#0284c7" fillOpacity="0.25" stroke="var(--ink)" strokeWidth="2" />
            <text x="220" y="175" textAnchor="middle" fontSize="8" fill="var(--gray)" fontFamily="monospace">CuSO4-Elektrolyt (aq)</text>

            <path d="M 205 40 L 150 40 L 150 70" fill="none" stroke="var(--ink)" strokeWidth="1.8" />
            <rect x="140" y="70" width="20" height="90" fill="#334155" stroke="var(--ink)" strokeWidth="1.2" />
            <text x="150" y="65" textAnchor="middle" fontSize="8" fontWeight="bold" fill="var(--ink)" fontFamily="monospace">Anode (+)</text>
            {[1, 2, 3, 4].map((i) => (
              <circle key={i} cx={145 + (i % 2) * 10} cy={140 - i * 14} r="2.5" fill="none" stroke="#38bdf8" strokeWidth="1.2" />
            ))}

            <path d="M 235 40 L 290 40 L 290 70" fill="none" stroke="var(--ink)" strokeWidth="1.8" />
            <rect x="280" y="70" width="20" height="90" fill="#b45309" stroke="var(--ink)" strokeWidth="1.2" />
            <rect x="277" y="80" width={6 + mCu * 0.4} height="70" fill="#ea580c" rx="1" />
            <text x="290" y="65" textAnchor="middle" fontSize="8" fontWeight="bold" fill="var(--ink)" fontFamily="monospace">Kathode (-)</text>

            <rect x="350" y="70" width="75" height="60" rx="3" fill="var(--surface)" stroke="var(--line)" />
            <text x="387" y="88" textAnchor="middle" fontSize="8" fill="var(--gray)" fontFamily="monospace">m(Cu) Abscheidung</text>
            <text x="387" y="112" textAnchor="middle" fontSize="11" fontWeight="bold" fill="var(--accent)" fontFamily="monospace">{data.rateValue}</text>
          </svg>
        );
      }

      // 5. 化学：缓冲溶液滴定曲线 (Puffer)
      case "puffer": {
        return (
          <svg className="w-full h-52 rounded bg-[var(--paper-subtle)]/40 border border-[var(--line)]/50" viewBox="0 0 440 200">
            <line x1="50" y1="170" x2="390" y2="170" stroke="var(--ink)" strokeWidth="1.5" />
            <line x1="50" y1="20" x2="50" y2="170" stroke="var(--ink)" strokeWidth="1.5" />
            <text x="42" y="30" textAnchor="end" fontSize="8" fill="var(--gray)" fontFamily="monospace">pH 14</text>
            <text x="42" y="95" textAnchor="end" fontSize="8" fill="var(--gray)" fontFamily="monospace">pH 7</text>
            <text x="42" y="165" textAnchor="end" fontSize="8" fill="var(--gray)" fontFamily="monospace">pH 0</text>

            <rect x="140" y="30" width="140" height="130" fill="#22c55e" fillOpacity="0.08" />
            <line x1="210" y1="30" x2="210" y2="170" stroke="#16a34a" strokeDasharray="3,3" />
            <text x="210" y="25" textAnchor="middle" fontSize="8" fill="#16a34a" fontWeight="bold" fontFamily="monospace">pKs = 4.75 (Pufferoptimum)</text>

            <path
              d="M 60 150 C 130 135, 170 115, 210 115 C 250 115, 290 95, 360 40"
              fill="none"
              stroke="var(--accent)"
              strokeWidth="2.5"
            />
            <circle cx={60 + (paramA / 100) * 300} cy={170 - data.graphY * 1.3} r="6" fill="var(--accent)" stroke="var(--paper)" strokeWidth="2" />
            <rect x="290" y="130" width="90" height="35" rx="3" fill="var(--surface)" stroke="var(--line)" />
            <text x="335" y="145" textAnchor="middle" fontSize="8" fill="var(--gray)" fontFamily="monospace">pH-Messsonde</text>
            <text x="335" y="158" textAnchor="middle" fontSize="10" fontWeight="bold" fill="var(--ink)" fontFamily="monospace">{data.rateValue}</text>
          </svg>
        );
      }

      // 6. 化学：亲核取代反应能量图 (SN1 vs SN2)
      case "sn1sn2": {
        const isSN1 = paramA > 50;
        return (
          <svg className="w-full h-52 rounded bg-[var(--paper-subtle)]/40 border border-[var(--line)]/50" viewBox="0 0 440 200">
            <line x1="50" y1="170" x2="390" y2="170" stroke="var(--ink)" strokeWidth="1.5" />
            <line x1="50" y1="20" x2="50" y2="170" stroke="var(--ink)" strokeWidth="1.5" />
            <text x="45" y="30" textAnchor="end" fontSize="8" fill="var(--gray)" fontFamily="monospace">ΔG</text>
            <text x="390" y="185" textAnchor="end" fontSize="8" fill="var(--gray)" fontFamily="monospace">Reaktionskoordinate</text>

            {isSN1 ? (
              <path
                d="M 60 140 Q 120 40 160 50 Q 200 60 220 90 Q 250 50 300 70 Q 340 90 380 150"
                fill="none"
                stroke="var(--accent)"
                strokeWidth="2.5"
              />
            ) : (
              <path
                d="M 60 140 Q 180 30 220 35 Q 260 40 380 150"
                fill="none"
                stroke="#0284c7"
                strokeWidth="2.5"
              />
            )}

            <rect x="280" y="25" width="105" height="35" rx="3" fill="var(--surface)" stroke="var(--line)" />
            <text x="332" y="39" textAnchor="middle" fontSize="8" fill="var(--gray)" fontFamily="monospace">Pfad</text>
            <text x="332" y="52" textAnchor="middle" fontSize="9" fontWeight="bold" fill="var(--ink)" fontFamily="monospace">{data.rateValue}</text>
            <text x="220" y="160" textAnchor="middle" fontSize="8" fill="var(--gray)" fontFamily="monospace">{data.subValue}</text>
          </svg>
        );
      }

      // 7. 化学：聚合反应链增长 (Polymerisation)
      case "polymerisation": {
        const units = Math.min(10, Math.round(data.graphY / 10));
        return (
          <svg className="w-full h-52 rounded bg-[var(--paper-subtle)]/40 border border-[var(--line)]/50" viewBox="0 0 440 200">
            <text x="220" y="35" textAnchor="middle" fontSize="10" fill="var(--ink)" fontWeight="bold" fontFamily="monospace">
              Radikal-Kettenwachstum: [ - CH₂ - CH(Ph) - ]ₙ
            </text>
            <circle cx="60" cy="100" r="14" fill="#ef4444" />
            <text x="60" y="104" textAnchor="middle" fontSize="9" fill="white" fontWeight="bold" fontFamily="monospace">R•</text>
            {Array.from({ length: Math.max(1, units) }).map((_, i) => (
              <g key={i}>
                <line x1={74 + i * 32} y1="100" x2={90 + i * 32} y2="100" stroke="var(--ink)" strokeWidth="2.5" />
                <rect x={90 + i * 32} y="86" width="24" height="28" rx="3" fill="#0284c7" fillOpacity="0.8" />
                <text x={102 + i * 32} y="103" textAnchor="middle" fontSize="8" fill="white" fontFamily="monospace">M</text>
              </g>
            ))}
            <line x1={74 + units * 32} y1="100" x2={90 + units * 32} y2="100" stroke="var(--ink)" strokeWidth="2.5" strokeDasharray="2,2" />
            <circle cx={98 + units * 32} cy="100" r="5" fill="#ef4444" />
            <rect x="140" y="145" width="160" height="35" rx="3" fill="var(--surface)" stroke="var(--line)" />
            <text x="220" y="159" textAnchor="middle" fontSize="8" fill="var(--gray)" fontFamily="monospace">Mittlerer Polymerisationsgrad</text>
            <text x="220" y="172" textAnchor="middle" fontSize="10" fontWeight="bold" fill="var(--accent)" fontFamily="monospace">{data.rateValue}</text>
          </svg>
        );
      }

      // 8. 化学：配合物深蓝光谱 (Komplexchemie)
      case "komplex": {
        const tetra = paramB > 40;
        return (
          <svg className="w-full h-52 rounded bg-[var(--paper-subtle)]/40 border border-[var(--line)]/50" viewBox="0 0 440 200">
            <rect x="70" y="40" width="80" height="120" rx="4" fill="var(--paper-subtle)" stroke="var(--ink)" strokeWidth="1.8" />
            <rect x="72" y="60" width="76" height="98" fill={tetra ? "#1e3a8a" : "#38bdf8"} fillOpacity={tetra ? 0.9 : 0.4} />
            <text x="110" y="175" textAnchor="middle" fontSize="8" fill="var(--gray)" fontFamily="monospace">Küvette</text>

            <rect x="200" y="40" width="190" height="120" rx="4" fill="var(--surface)" stroke="var(--line)" />
            <line x1="220" y1="140" x2="370" y2="140" stroke="var(--ink)" strokeWidth="1" />
            <line x1="220" y1="50" x2="220" y2="140" stroke="var(--ink)" strokeWidth="1" />
            <text x="220" y="45" fontSize="7" fill="var(--gray)" fontFamily="monospace">Extinktion</text>
            <text x="370" y="150" fontSize="7" fill="var(--gray)" fontFamily="monospace">Wellenlänge λ</text>

            {tetra ? (
              <path d="M 230 135 Q 290 55 350 135" fill="none" stroke="#1e3a8a" strokeWidth="2.5" />
            ) : (
              <path d="M 230 135 Q 350 95 365 70" fill="none" stroke="#38bdf8" strokeWidth="2.5" />
            )}
            <text x="295" y="70" textAnchor="middle" fontSize="9" fontWeight="bold" fill="var(--ink)" fontFamily="monospace">{data.rateValue}</text>
          </svg>
        );
      }

      // 9. 生物：细胞呼吸线粒体 (Zellatmung)
      case "zellatmung": {
        return (
          <svg className="w-full h-52 rounded bg-[var(--paper-subtle)]/40 border border-[var(--line)]/50" viewBox="0 0 440 200">
            <ellipse cx="220" cy="100" rx="190" ry="85" fill="none" stroke="var(--ink)" strokeWidth="2" strokeDasharray="5,2" />
            <path
              d="M 50 100 C 70 50, 110 50, 130 90 C 150 130, 180 60, 210 95 C 240 130, 270 50, 300 90 C 330 130, 370 70, 390 100 C 370 140, 330 140, 300 115 C 270 90, 240 150, 210 115 C 180 80, 150 150, 130 115 C 110 80, 70 150, 50 100 Z"
              fill="#fed7aa"
              fillOpacity="0.4"
              stroke="#ea580c"
              strokeWidth="2"
            />
            <text x="220" y="60" textAnchor="middle" fontSize="9" fill="#9a3412" fontFamily="monospace">Mitochondrien-Matrix</text>
            <circle cx="220" cy="105" r="16" fill="#facc15" stroke="var(--ink)" strokeWidth="1.5" />
            <text x="220" y="108" textAnchor="middle" fontSize="8" fontWeight="bold" fill="#78350f" fontFamily="monospace">ATP-Syn</text>
            <rect x="150" y="155" width="140" height="30" rx="3" fill="var(--surface)" stroke="var(--line)" />
            <text x="220" y="174" textAnchor="middle" fontSize="10" fontWeight="bold" fill="var(--accent)" fontFamily="monospace">{data.rateValue}</text>
          </svg>
        );
      }

      // 10. 生物：米氏酶动力学 (Enzymkinetik)
      case "enzym": {
        return (
          <svg className="w-full h-52 rounded bg-[var(--paper-subtle)]/40 border border-[var(--line)]/50" viewBox="0 0 440 200">
            <line x1="50" y1="170" x2="390" y2="170" stroke="var(--ink)" strokeWidth="1.5" />
            <line x1="50" y1="20" x2="50" y2="170" stroke="var(--ink)" strokeWidth="1.5" />
            <line x1="50" y1="50" x2="390" y2="50" stroke="var(--gray)" strokeWidth="1" strokeDasharray="3,3" />
            <text x="390" y="45" textAnchor="end" fontSize="8" fill="var(--gray)" fontFamily="monospace">v_max</text>
            <line x1="50" y1="110" x2="390" y2="110" stroke="var(--gray)" strokeWidth="1" strokeDasharray="3,3" />
            <text x="45" y="113" textAnchor="end" fontSize="8" fill="var(--gray)" fontFamily="monospace">½ v_max</text>

            <path
              d="M 50 170 Q 120 70 390 55"
              fill="none"
              stroke="var(--accent)"
              strokeWidth="2.5"
            />
            <circle cx={50 + (paramA / 100) * 320} cy={170 - (data.graphY / 100) * 115} r="6" fill="var(--accent)" stroke="var(--paper)" strokeWidth="2" />
            <text x="280" y="140" textAnchor="middle" fontSize="9" fontWeight="bold" fill="var(--ink)" fontFamily="monospace">{data.rateValue}</text>
            <text x="280" y="155" textAnchor="middle" fontSize="8" fill="var(--gray)" fontFamily="monospace">{data.subValue}</text>
          </svg>
        );
      }

      // 11. 生物：孟德尔 9:3:3:1 棋盘
      case "genetik": {
        return (
          <div className="flex flex-col items-center justify-center p-2 w-full">
            <div className="grid grid-cols-4 gap-1 w-64 h-40 font-mono text-[10px]">
              {Array.from({ length: 16 }).map((_, i) => {
                const isGreen = i === 5 || i === 7 || i === 13 || i === 15;
                const isWrinkled = i === 10 || i === 11 || i === 14 || i === 15;
                const bg = isGreen && isWrinkled ? "bg-emerald-200 border-emerald-400" : isGreen ? "bg-emerald-100 border-emerald-300" : isWrinkled ? "bg-amber-100 border-amber-300" : "bg-yellow-100 border-yellow-300";
                return (
                  <div key={i} className={`flex flex-col items-center justify-center rounded border ${bg} text-[var(--ink)] font-bold shadow-2xs`}>
                    <span>{isGreen ? "🟢" : "🟡"}</span>
                    <span className="text-[8px]">{isWrinkled ? "wrinkled" : "round"}</span>
                  </div>
                );
              })}
            </div>
          </div>
        );
      }

      // 12. 生物：化学突触
      case "synapse": {
        return (
          <svg className="w-full h-52 rounded bg-[var(--paper-subtle)]/40 border border-[var(--line)]/50" viewBox="0 0 440 200">
            <path d="M 50 20 L 50 140 C 90 140, 150 150, 180 150 C 210 150, 220 120, 220 20 Z" fill="#f8fafc" stroke="var(--ink)" strokeWidth="2" />
            <text x="110" y="50" fontSize="10" fill="var(--ink)" fontWeight="bold" fontFamily="monospace">Präsynapse</text>
            {[
              [100, 80],
              [140, 95],
              [120, 120],
              [160, 125],
            ].map(([cx, cy], i) => (
              <circle key={i} cx={cx} cy={cy} r="8" fill="#e0e7ff" stroke="#4f46e5" strokeWidth="1.5" />
            ))}
            <rect x="220" y="20" width="30" height="160" fill="#f1f5f9" fillOpacity="0.6" />
            {Array.from({ length: 8 }).map((_, i) => (
              <circle key={i} cx={225 + (i % 3) * 8} cy={40 + i * 15} r="2.5" fill="#ef4444" />
            ))}
            <path d="M 250 20 L 250 180 L 400 180 L 400 20 Z" fill="#f8fafc" stroke="var(--ink)" strokeWidth="2" />
            <text x="310" y="50" fontSize="10" fill="var(--ink)" fontWeight="bold" fontFamily="monospace">Postsynapse</text>
            <path d={`M 280 120 Q 330 ${120 - data.graphY * 0.7} 380 120`} fill="none" stroke="var(--accent)" strokeWidth="2" />
            <text x="330" y="145" textAnchor="middle" fontSize="9" fill="var(--accent)" fontWeight="bold" fontFamily="monospace">{data.rateValue}</text>
          </svg>
        );
      }

      // 13. 生物：捕食者猎物波动 (Raeuber-Beute)
      case "raeuber-beute": {
        return (
          <svg className="w-full h-52 rounded bg-[var(--paper-subtle)]/40 border border-[var(--line)]/50" viewBox="0 0 440 200">
            <line x1="50" y1="170" x2="390" y2="170" stroke="var(--ink)" strokeWidth="1.5" />
            <line x1="50" y1="20" x2="50" y2="170" stroke="var(--ink)" strokeWidth="1.5" />
            <path
              d="M 50 110 C 100 50, 150 50, 200 110 C 250 170, 300 170, 350 110 C 370 80, 385 80, 390 95"
              fill="none"
              stroke="#16a34a"
              strokeWidth="2.5"
            />
            <path
              d="M 50 150 C 120 150, 160 70, 210 70 C 260 70, 310 150, 360 150 C 380 150, 385 120, 390 100"
              fill="none"
              stroke="#dc2626"
              strokeWidth="2.5"
              strokeDasharray="4,2"
            />
            <text x="340" y="45" fontSize="8" fill="#16a34a" fontWeight="bold" fontFamily="monospace">― Beute (Hase)</text>
            <text x="340" y="58" fontSize="8" fill="#dc2626" fontWeight="bold" fontFamily="monospace">--- Räuber (Luchs)</text>
            <circle cx={50 + (paramA / 100) * 340} cy={170 - (data.graphY / 100) * 110} r="5" fill="#16a34a" />
          </svg>
        );
      }

      // 14. 生物：PCR 变温曲线与电泳条带 (PCR)
      case "pcr": {
        return (
          <svg className="w-full h-52 rounded bg-[var(--paper-subtle)]/40 border border-[var(--line)]/50" viewBox="0 0 440 200">
            <path d="M 50 140 L 90 40 L 130 40 L 160 120 L 200 120 L 230 85 L 270 85 L 300 140" fill="none" stroke="var(--accent)" strokeWidth="2.5" />
            <text x="110" y="32" textAnchor="middle" fontSize="8" fill="#dc2626" fontFamily="monospace">95°C Denat.</text>
            <text x="180" y="132" textAnchor="middle" fontSize="8" fill="#0284c7" fontFamily="monospace">55°C Anneal</text>
            <text x="250" y="78" textAnchor="middle" fontSize="8" fill="#16a34a" fontFamily="monospace">72°C Elong.</text>

            <rect x="330" y="30" width="80" height="135" rx="3" fill="#0f172a" />
            <rect x="345" y="45" width="50" height="6" fill="#38bdf8" fillOpacity="0.4" />
            <rect x="345" y="75" width="50" height={Math.min(12, Math.round(data.graphY * 0.12))} fill="#38bdf8" />
            <rect x="345" y="115" width="50" height="4" fill="#38bdf8" fillOpacity="0.4" />
            <text x="370" y="155" textAnchor="middle" fontSize="7" fill="#94a3b8" fontFamily="monospace">Gel-Bande</text>
          </svg>
        );
      }

      // 15. 生物：表观遗传核小体松紧 (Epigenetik)
      case "epigenetik": {
        const aktiv = data.graphY > 50;
        return (
          <svg className="w-full h-52 rounded bg-[var(--paper-subtle)]/40 border border-[var(--line)]/50" viewBox="0 0 440 200">
            <text x="220" y="35" textAnchor="middle" fontSize="10" fontWeight="bold" fill="var(--ink)" fontFamily="monospace">
              {aktiv ? "Euchromatin (Aktiv / Zugänglich)" : "Heterochromatin (Kondensiert / Stumm)"}
            </text>
            {[60, 140, 220, 300, 380].map((cx, i) => (
              <g key={i}>
                <circle cx={cx} cy="100" r={aktiv ? 18 : 25} fill="#fde047" stroke="#ca8a04" strokeWidth="2" />
                <path d={`M ${cx - 25} 100 Q ${cx} 60 ${cx + 25} 100`} fill="none" stroke="var(--ink)" strokeWidth="2" />
              </g>
            ))}
            <rect x="140" y="150" width="160" height="30" rx="3" fill="var(--surface)" stroke="var(--line)" />
            <text x="220" y="169" textAnchor="middle" fontSize="9" fontWeight="bold" fill="var(--accent)" fontFamily="monospace">{data.rateValue}</text>
          </svg>
        );
      }

      // 16. 生物：温带湖泊温跃层 (See-Ökologie)
      case "see": {
        return (
          <svg className="w-full h-52 rounded bg-[var(--paper-subtle)]/40 border border-[var(--line)]/50" viewBox="0 0 440 200">
            <rect x="50" y="25" width="220" height="40" fill="#bae6fd" />
            <text x="160" y="48" textAnchor="middle" fontSize="9" fill="#0369a1" fontFamily="monospace">Epilimnion (20°C)</text>
            <rect x="50" y="65" width="220" height="35" fill="#7dd3fc" />
            <text x="160" y="86" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#0284c7" fontFamily="monospace">Metalimnion / Sprungschicht</text>
            <rect x="50" y="100" width="220" height="65" fill="#38bdf8" fillOpacity="0.4" />
            <text x="160" y="138" textAnchor="middle" fontSize="9" fill="#0284c7" fontFamily="monospace">Hypolimnion (4°C)</text>

            <rect x="300" y="25" width="100" height="140" rx="3" fill="var(--surface)" stroke="var(--line)" />
            <path d="M 380 35 C 380 65, 330 75, 330 150" fill="none" stroke="#ef4444" strokeWidth="2" />
            <text x="350" y="155" textAnchor="middle" fontSize="8" fill="#ef4444" fontFamily="monospace">T-Profil</text>
          </svg>
        );
      }

      // 17. 数学：黎曼和梯形积分割矩形 (Integral)
      case "integral": {
        const nBars = Math.min(24, Math.round(Number(data.paramAValueDisplay.slice(4)) || 8));
        const dx = 240 / (nBars || 1);
        return (
          <svg className="w-full h-52 rounded bg-[var(--paper-subtle)]/40 border border-[var(--line)]/50" viewBox="0 0 440 200">
            <line x1="60" y1="170" x2="380" y2="170" stroke="var(--ink)" strokeWidth="1.5" />
            <line x1="70" y1="20" x2="70" y2="170" stroke="var(--ink)" strokeWidth="1.5" />
            {Array.from({ length: nBars }).map((_, i) => {
              const xVal = (i / nBars) * 3;
              const barH = (Math.pow(xVal, 2) / 9) * 125;
              return (
                <rect
                  key={i}
                  x={70 + i * dx}
                  y={170 - barH}
                  width={dx - 1}
                  height={barH}
                  fill="var(--accent)"
                  fillOpacity="0.3"
                  stroke="var(--accent)"
                  strokeWidth="0.8"
                />
              );
            })}
            <path d="M 70 170 Q 190 165 310 45" fill="none" stroke="var(--ink)" strokeWidth="2.5" />
            <text x="240" y="45" fontSize="10" fill="var(--ink)" fontWeight="bold" fontFamily="monospace">f(x) = x²</text>
            <text x="310" y="182" fontSize="9" fill="var(--ink)" fontFamily="monospace">b = 3</text>
          </svg>
        );
      }

      // 18. 数学：三次多项式切线 (Kurvendiskussion)
      case "kurvendiskussion": {
        const xPos = 220 + ((paramA - 50) / 50) * 120;
        return (
          <svg className="w-full h-52 rounded bg-[var(--paper-subtle)]/40 border border-[var(--line)]/50" viewBox="0 0 440 200">
            <line x1="50" y1="100" x2="390" y2="100" stroke="var(--ink)" strokeWidth="1" strokeOpacity="0.4" />
            <line x1="220" y1="20" x2="220" y2="180" stroke="var(--ink)" strokeWidth="1" strokeOpacity="0.4" />
            <path d="M 120 180 C 150 40, 180 40, 220 100 C 260 160, 290 160, 320 20" fill="none" stroke="var(--accent)" strokeWidth="2.5" />
            <circle cx="160" cy="50" r="4" fill="#16a34a" />
            <text x="160" y="42" textAnchor="middle" fontSize="8" fill="#16a34a" fontFamily="monospace">HP(-1|2)</text>
            <circle cx="280" cy="150" r="4" fill="#dc2626" />
            <text x="280" y="165" textAnchor="middle" fontSize="8" fill="#dc2626" fontFamily="monospace">TP(1|-2)</text>
            <circle cx={xPos} cy={100 - ((data.graphY - 50) / 50) * 50} r="6" fill="var(--accent)" stroke="var(--paper)" strokeWidth="2" />
          </svg>
        );
      }

      // 19. 数学：函数族与轨迹曲线 (Funktionenscharen)
      case "funktionenschar": {
        return (
          <svg className="w-full h-52 rounded bg-[var(--paper-subtle)]/40 border border-[var(--line)]/50" viewBox="0 0 440 200">
            <line x1="50" y1="100" x2="390" y2="100" stroke="var(--ink)" strokeWidth="1" strokeOpacity="0.3" />
            <line x1="220" y1="20" x2="220" y2="180" stroke="var(--ink)" strokeWidth="1" strokeOpacity="0.3" />
            <path d="M 160 30 C 180 50, 200 70, 220 100" fill="none" stroke="#dc2626" strokeWidth="2" strokeDasharray="3,3" />
            <text x="160" y="24" fontSize="8" fill="#dc2626" fontFamily="monospace">Ortskurve: y = -2x³</text>
            <path d="M 130 180 C 150 50, 180 50, 220 100 C 260 150, 290 150, 310 20" fill="none" stroke="var(--accent)" strokeWidth="2.5" />
            <rect x="290" y="145" width="120" height="35" rx="3" fill="var(--surface)" stroke="var(--line)" />
            <text x="350" y="166" textAnchor="middle" fontSize="9" fontWeight="bold" fill="var(--ink)" fontFamily="monospace">{data.rateValue}</text>
          </svg>
        );
      }

      // 20. 数学：旋转体体积 (Rotation)
      case "rotation": {
        return (
          <svg className="w-full h-52 rounded bg-[var(--paper-subtle)]/40 border border-[var(--line)]/50" viewBox="0 0 440 200">
            <line x1="50" y1="100" x2="390" y2="100" stroke="var(--ink)" strokeWidth="1.5" />
            <path d="M 100 100 Q 200 40 320 40 L 320 160 Q 200 160 100 100 Z" fill="var(--accent)" fillOpacity="0.15" stroke="var(--accent)" strokeWidth="2" />
            <ellipse cx="320" cy="100" rx="15" ry="60" fill="none" stroke="var(--accent)" strokeWidth="1.5" />
            <rect x="230" y="55" width="12" height="90" fill="var(--accent)" fillOpacity="0.4" stroke="var(--ink)" strokeWidth="1" />
            <text x="220" y="175" textAnchor="middle" fontSize="8" fill="var(--gray)" fontFamily="monospace">π · (f(x))² dx</text>
            <rect x="330" y="30" width="80" height="40" rx="3" fill="var(--surface)" stroke="var(--line)" />
            <text x="370" y="54" textAnchor="middle" fontSize="10" fontWeight="bold" fill="var(--ink)" fontFamily="monospace">{data.rateValue}</text>
          </svg>
        );
      }

      // 21. 数学：点到平面空间几何 (Ebene & Abstand)
      case "ebene": {
        return (
          <svg className="w-full h-52 rounded bg-[var(--paper-subtle)]/40 border border-[var(--line)]/50" viewBox="0 0 440 200">
            <polygon points="100,160 280,160 360,90 180,90" fill="#0284c7" fillOpacity="0.2" stroke="var(--ink)" strokeWidth="1.5" />
            <circle cx="230" cy="40" r="5" fill="#dc2626" />
            <text x="240" y="42" fontSize="9" fontWeight="bold" fill="#dc2626" fontFamily="monospace">{data.paramAValueDisplay}</text>
            <line x1="230" y1="40" x2="230" y2="125" stroke="#dc2626" strokeWidth="2" strokeDasharray="3,3" />
            <circle cx="230" cy="125" r="4" fill="var(--ink)" />
            <text x="240" y="125" fontSize="8" fill="var(--gray)" fontFamily="monospace">Lotfußpunkt F</text>
            <text x="200" y="80" textAnchor="end" fontSize="9" fontWeight="bold" fill="#dc2626" fontFamily="monospace">{data.rateValue}</text>
          </svg>
        );
      }

      // 22. 数学：向量点积与叉积 (Vektor)
      case "vektor": {
        const rad = (data.graphY / 100) * Math.PI;
        const x2 = 140 + 80 * Math.cos(rad);
        const y2 = 140 - 80 * Math.sin(rad);
        return (
          <svg className="w-full h-52 rounded bg-[var(--paper-subtle)]/40 border border-[var(--line)]/50" viewBox="0 0 440 200">
            <line x1="140" y1="140" x2="260" y2="140" stroke="var(--ink)" strokeWidth="2.5" />
            <text x="265" y="145" fontSize="9" fontWeight="bold" fill="var(--ink)" fontFamily="monospace">a</text>
            <line x1="140" y1="140" x2={x2} y2={y2} stroke="var(--accent)" strokeWidth="2.5" />
            <text x={x2 + 5} y={y2} fontSize="9" fontWeight="bold" fill="var(--accent)" fontFamily="monospace">b</text>
            <rect x="290" y="50" width="120" height="50" rx="3" fill="var(--surface)" stroke="var(--line)" />
            <text x="350" y="70" textAnchor="middle" fontSize="8" fill="var(--gray)" fontFamily="monospace">Skalarprodukt</text>
            <text x="350" y="88" textAnchor="middle" fontSize="10" fontWeight="bold" fill="var(--ink)" fontFamily="monospace">{data.rateValue}</text>
          </svg>
        );
      }

      // 23. 数学：马尔可夫转移图 (Markov-Ketten)
      case "markov": {
        return (
          <svg className="w-full h-52 rounded bg-[var(--paper-subtle)]/40 border border-[var(--line)]/50" viewBox="0 0 440 200">
            <circle cx="120" cy="100" r="30" fill="var(--paper)" stroke="var(--ink)" strokeWidth="2" />
            <text x="120" y="105" textAnchor="middle" fontSize="12" fontWeight="bold" fill="var(--ink)" fontFamily="monospace">A</text>
            <circle cx="320" cy="100" r="30" fill="var(--paper)" stroke="var(--accent)" strokeWidth="2" />
            <text x="320" y="105" textAnchor="middle" fontSize="12" fontWeight="bold" fill="var(--accent)" fontFamily="monospace">B</text>
            <path d="M 145 80 Q 220 50 295 80" fill="none" stroke="var(--ink)" strokeWidth="2" />
            <text x="220" y="60" textAnchor="middle" fontSize="9" fill="var(--ink)" fontFamily="monospace">p(A→B) = {data.paramAValueDisplay}</text>
            <path d="M 295 120 Q 220 150 145 120" fill="none" stroke="var(--accent)" strokeWidth="2" />
            <text x="220" y="145" textAnchor="middle" fontSize="9" fill="var(--accent)" fontFamily="monospace">p(B→A) = {data.paramBValueDisplay}</text>
            <rect x="150" y="165" width="140" height="25" rx="3" fill="var(--surface)" stroke="var(--line)" />
            <text x="220" y="181" textAnchor="middle" fontSize="9" fontWeight="bold" fill="var(--ink)" fontFamily="monospace">{data.rateValue}</text>
          </svg>
        );
      }

      // 24. 数学：假设检验拒绝域 (Hypothesentest)
      case "hypothese": {
        return (
          <svg className="w-full h-52 rounded bg-[var(--paper-subtle)]/40 border border-[var(--line)]/50" viewBox="0 0 440 200">
            <line x1="50" y1="170" x2="390" y2="170" stroke="var(--ink)" strokeWidth="1.5" />
            <path d="M 60 170 Q 200 30 360 170" fill="none" stroke="var(--ink)" strokeWidth="2" />
            <rect x="290" y="100" width="80" height="70" fill="#dc2626" fillOpacity="0.25" />
            <line x1="290" y1="30" x2="290" y2="170" stroke="#dc2626" strokeWidth="1.5" strokeDasharray="3,3" />
            <text x="290" y="25" textAnchor="middle" fontSize="8" fill="#dc2626" fontWeight="bold" fontFamily="monospace">k (Kritischer Wert)</text>
            <text x="330" y="140" textAnchor="middle" fontSize="8" fill="#dc2626" fontFamily="monospace">Ablehnungsbereich K</text>
            <rect x="60" y="40" width="100" height="40" rx="3" fill="var(--surface)" stroke="var(--line)" />
            <text x="110" y="64" textAnchor="middle" fontSize="10" fontWeight="bold" fill="var(--ink)" fontFamily="monospace">{data.rateValue}</text>
          </svg>
        );
      }

      // 25. 数学：线性回归与散点 (Regression)
      case "regression": {
        return (
          <svg className="w-full h-52 rounded bg-[var(--paper-subtle)]/40 border border-[var(--line)]/50" viewBox="0 0 440 200">
            <line x1="60" y1="170" x2="380" y2="170" stroke="var(--ink)" strokeWidth="1.5" />
            <line x1="60" y1="30" x2="60" y2="170" stroke="var(--ink)" strokeWidth="1.5" />
            <line x1="80" y1="150" x2="360" y2="50" stroke="var(--accent)" strokeWidth="2.5" />
            {[
              [100, 140], [130, 125], [160, 135], [190, 110], [220, 95],
              [250, 105], [280, 80], [310, 65], [340, 55],
            ].map(([x, y], i) => (
              <circle key={i} cx={x} cy={y} r="3.5" fill="var(--ink)" />
            ))}
            <rect x="260" y="125" width="115" height="35" rx="3" fill="var(--surface)" stroke="var(--line)" />
            <text x="317" y="146" textAnchor="middle" fontSize="10" fontWeight="bold" fill="var(--accent)" fontFamily="monospace">{data.rateValue}</text>
          </svg>
        );
      }

      // 26. 社科：德国 Sinus-Milieus 坐标矩阵 (Sinus-Milieus)
      case "milieu": {
        return (
          <svg className="w-full h-52 rounded bg-[var(--paper-subtle)]/40 border border-[var(--line)]/50" viewBox="0 0 440 200">
            <line x1="60" y1="170" x2="390" y2="170" stroke="var(--ink)" strokeWidth="1.5" />
            <line x1="60" y1="30" x2="60" y2="170" stroke="var(--ink)" strokeWidth="1.5" />
            <text x="390" y="185" textAnchor="end" fontSize="7" fill="var(--gray)" fontFamily="monospace">Grundorientierung →</text>
            <text x="50" y="25" fontSize="7" fill="var(--gray)" fontFamily="monospace">↑ Soziale Lage</text>

            <ellipse cx="120" cy="140" rx="35" ry="18" fill="#cbd5e1" fillOpacity="0.4" stroke="var(--ink)" strokeWidth="1" />
            <text x="120" y="143" textAnchor="middle" fontSize="7" fontFamily="monospace">Traditionelle</text>

            <ellipse cx="220" cy="110" rx="45" ry="22" fill="#bae6fd" fillOpacity="0.5" stroke="#0284c7" strokeWidth="1.2" />
            <text x="220" y="113" textAnchor="middle" fontSize="7" fontWeight="bold" fill="#0369a1" fontFamily="monospace">Bürgerl. Mitte</text>

            <ellipse cx="320" cy="70" rx="40" ry="20" fill="#fed7aa" fillOpacity="0.5" stroke="#ea580c" strokeWidth="1.2" />
            <text x="320" y="73" textAnchor="middle" fontSize="7" fontWeight="bold" fill="#c2410c" fontFamily="monospace">Performer</text>

            <circle cx={60 + (paramA / 100) * 320} cy={170 - (paramB / 100) * 135} r="7" fill="var(--accent)" stroke="var(--paper)" strokeWidth="2" />
            <rect x="130" y="15" width="180" height="25" rx="3" fill="var(--surface)" stroke="var(--line)" />
            <text x="220" y="31" textAnchor="middle" fontSize="9" fontWeight="bold" fill="var(--accent)" fontFamily="monospace">{data.rateValue}</text>
          </svg>
        );
      }

      // 27. 社科：宏观景气周期 (Konjunktur)
      case "konjunktur": {
        const curX = 60 + (paramA / 100) * 320;
        const curY = 100 - 45 * Math.sin((paramA / 100) * 2 * Math.PI);
        return (
          <svg className="w-full h-52 rounded bg-[var(--paper-subtle)]/40 border border-[var(--line)]/50" viewBox="0 0 440 200">
            <line x1="50" y1="130" x2="390" y2="70" stroke="var(--gray)" strokeWidth="1.8" strokeDasharray="4,4" />
            <rect x="60" y="30" width="80" height="140" fill="#22c55e" fillOpacity="0.08" />
            <rect x="140" y="30" width="80" height="140" fill="#f59e0b" fillOpacity="0.08" />
            <rect x="220" y="30" width="80" height="140" fill="#f97316" fillOpacity="0.08" />
            <rect x="300" y="30" width="80" height="140" fill="#ef4444" fillOpacity="0.08" />
            <text x="100" y="45" textAnchor="middle" fontSize="8" fill="#16a34a" fontWeight="bold" fontFamily="monospace">Aufschwung</text>
            <text x="180" y="45" textAnchor="middle" fontSize="8" fill="#d97706" fontWeight="bold" fontFamily="monospace">Boom</text>
            <text x="260" y="45" textAnchor="middle" fontSize="8" fill="#ea580c" fontWeight="bold" fontFamily="monospace">Abschwung</text>
            <text x="340" y="45" textAnchor="middle" fontSize="8" fill="#dc2626" fontWeight="bold" fontFamily="monospace">Depression</text>
            <path d="M 60 100 C 100 50, 140 50, 180 60 C 220 70, 260 145, 300 150 C 340 155, 360 120, 380 100" fill="none" stroke="var(--accent)" strokeWidth="2.5" />
            <circle cx={curX} cy={curY} r="6" fill="var(--accent)" stroke="var(--paper)" strokeWidth="2" />
          </svg>
        );
      }

      // 28. 社科：欧洲央行利率走廊 (EZB)
      case "ezb": {
        return (
          <svg className="w-full h-52 rounded bg-[var(--paper-subtle)]/40 border border-[var(--line)]/50" viewBox="0 0 440 200">
            <rect x="60" y="40" width="320" height="120" fill="var(--paper-subtle)" rx="4" />
            <line x1="60" y1="60" x2="380" y2="60" stroke="#dc2626" strokeWidth="2" strokeDasharray="3,3" />
            <text x="70" y="55" fontSize="8" fill="#dc2626" fontWeight="bold" fontFamily="monospace">Spitzenrefinanzierung (Kredit-Obergrenze)</text>
            <line x1="60" y1="100" x2="380" y2="100" stroke="var(--accent)" strokeWidth="3" />
            <text x="70" y="95" fontSize="9" fill="var(--accent)" fontWeight="bold" fontFamily="monospace">Hauptrefinanzierungssatz: {data.paramAValueDisplay}</text>
            <line x1="60" y1="140" x2="380" y2="140" stroke="#16a34a" strokeWidth="2" strokeDasharray="3,3" />
            <text x="70" y="135" fontSize="8" fill="#16a34a" fontWeight="bold" fontFamily="monospace">Einlagefazilität (Boden)</text>
            <rect x="290" y="115" width="85" height="40" rx="3" fill="var(--surface)" stroke="var(--line)" />
            <text x="332" y="132" textAnchor="middle" fontSize="8" fill="var(--gray)" fontFamily="monospace">HVPI-Inflation</text>
            <text x="332" y="146" textAnchor="middle" fontSize="10" fontWeight="bold" fill="var(--ink)" fontFamily="monospace">{data.rateValue}</text>
          </svg>
        );
      }

      // 29. 社科：福利国家洛伦兹曲线再分配 (Sozialstaat)
      case "sozialstaat": {
        return (
          <svg className="w-full h-52 rounded bg-[var(--paper-subtle)]/40 border border-[var(--line)]/50" viewBox="0 0 440 200">
            <line x1="80" y1="170" x2="320" y2="170" stroke="var(--ink)" strokeWidth="1.5" />
            <line x1="80" y1="30" x2="80" y2="170" stroke="var(--ink)" strokeWidth="1.5" />
            <line x1="80" y1="170" x2="320" y2="30" stroke="var(--gray)" strokeWidth="1.5" strokeDasharray="3,3" />
            <path d="M 80 170 Q 220 160 320 30" fill="none" stroke="#dc2626" strokeWidth="2" />
            <text x="260" y="145" fontSize="8" fill="#dc2626" fontFamily="monospace">Primär-Gini: 0.48</text>
            <path d="M 80 170 Q 180 120 320 30" fill="none" stroke="#16a34a" strokeWidth="2.5" />
            <text x="180" y="95" fontSize="8" fill="#16a34a" fontWeight="bold" fontFamily="monospace">Netto-Gini: {data.rateValue}</text>
          </svg>
        );
      }

      // 30. 社科：蒙代尔不可能三角 (Trilemma)
      case "trilemma": {
        return (
          <svg className="w-full h-52 rounded bg-[var(--paper-subtle)]/40 border border-[var(--line)]/50" viewBox="0 0 440 200">
            <polygon points="220,35 110,165 330,165" fill="none" stroke="var(--ink)" strokeWidth="2" />
            <circle cx="220" cy="35" r="5" fill="#dc2626" />
            <text x="220" y="25" textAnchor="middle" fontSize="9" fontWeight="bold" fill="var(--ink)" fontFamily="monospace">Fester Wechselkurs</text>
            <circle cx="110" cy="165" r="5" fill="#0284c7" />
            <text x="100" y="180" textAnchor="middle" fontSize="9" fontWeight="bold" fill="var(--ink)" fontFamily="monospace">Autonome Zinsen</text>
            <circle cx="330" cy="165" r="5" fill="#16a34a" />
            <text x="340" y="180" textAnchor="middle" fontSize="9" fontWeight="bold" fill="var(--ink)" fontFamily="monospace">Freier Kapitalverkehr</text>
            <rect x="150" y="85" width="140" height="40" rx="3" fill="var(--surface)" stroke="var(--accent)" strokeWidth="1.5" />
            <text x="220" y="102" textAnchor="middle" fontSize="8" fill="var(--gray)" fontFamily="monospace">Geopfertes Ziel:</text>
            <text x="220" y="117" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#dc2626" fontFamily="monospace">{data.rateValue}</text>
          </svg>
        );
      }

      // 31. 社科：李嘉图比较优势 (Ricardo)
      case "ricardo": {
        return (
          <svg className="w-full h-52 rounded bg-[var(--paper-subtle)]/40 border border-[var(--line)]/50" viewBox="0 0 440 200">
            <line x1="80" y1="160" x2="360" y2="160" stroke="var(--ink)" strokeWidth="1.5" />
            <line x1="80" y1="30" x2="80" y2="160" stroke="var(--ink)" strokeWidth="1.5" />
            <line x1="80" y1="60" x2="260" y2="160" stroke="#dc2626" strokeWidth="2" />
            <text x="210" y="95" fontSize="8" fill="#dc2626" fontFamily="monospace">Land A (Autarkie)</text>
            <line x1="80" y1="40" x2="340" y2="160" stroke="#16a34a" strokeWidth="2.5" strokeDasharray="3,3" />
            <text x="290" y="75" fontSize="8" fill="#16a34a" fontWeight="bold" fontFamily="monospace">Mit Freihandel</text>
            <rect x="140" y="115" width="160" height="35" rx="3" fill="var(--surface)" stroke="var(--line)" />
            <text x="220" y="136" textAnchor="middle" fontSize="10" fontWeight="bold" fill="var(--accent)" fontFamily="monospace">{data.rateValue}</text>
          </svg>
        );
      }

      // 32. 社科：投资区位雷达 (Standort Deutschland)
      case "standort": {
        return (
          <svg className="w-full h-52 rounded bg-[var(--paper-subtle)]/40 border border-[var(--line)]/50" viewBox="0 0 440 200">
            <polygon points="220,40 290,80 260,150 180,150 150,80" fill="none" stroke="var(--gray)" strokeWidth="1" strokeDasharray="2,2" />
            <polygon points="220,50 280,85 240,135 190,140 170,85" fill="var(--accent)" fillOpacity="0.25" stroke="var(--accent)" strokeWidth="2" />
            <text x="220" y="32" textAnchor="middle" fontSize="8" fontFamily="monospace">Infrastruktur</text>
            <text x="310" y="85" fontSize="8" fontFamily="monospace">Duale Ausbildung</text>
            <text x="270" y="165" fontSize="8" fontFamily="monospace">Rechtssicherheit</text>
            <text x="170" y="165" fontSize="8" fontFamily="monospace">Energiekosten</text>
            <text x="110" y="85" fontSize="8" fontFamily="monospace">Bürokratie</text>
            <rect x="310" y="120" width="110" height="40" rx="3" fill="var(--surface)" stroke="var(--line)" />
            <text x="365" y="144" textAnchor="middle" fontSize="10" fontWeight="bold" fill="var(--ink)" fontFamily="monospace">{data.rateValue}</text>
          </svg>
        );
      }

      // 33. 哲学：康德定言令式普适化过滤机 (Kant)
      case "kant": {
        const pass = data.graphY > 50;
        return (
          <svg className="w-full h-52 rounded bg-[var(--paper-subtle)]/40 border border-[var(--line)]/50" viewBox="0 0 440 200">
            <rect x="50" y="75" width="80" height="50" rx="4" fill="var(--paper)" stroke="var(--ink)" strokeWidth="1.5" />
            <text x="90" y="95" textAnchor="middle" fontSize="8" fill="var(--gray)" fontFamily="monospace">Subjektive</text>
            <text x="90" y="110" textAnchor="middle" fontSize="9" fontWeight="bold" fill="var(--ink)" fontFamily="monospace">Maxime</text>

            <path d="M 130 100 L 190 100" stroke="var(--ink)" strokeWidth="2" />
            <polygon points="230,60 270,100 230,140 190,100" fill="#fef08a" stroke="var(--ink)" strokeWidth="1.8" />
            <text x="230" y="98" textAnchor="middle" fontSize="8" fontWeight="bold" fill="#78350f" fontFamily="monospace">Naturgesetz-</text>
            <text x="230" y="110" textAnchor="middle" fontSize="8" fontWeight="bold" fill="#78350f" fontFamily="monospace">Filter</text>

            <path d="M 270 100 L 330 100" stroke="var(--ink)" strokeWidth="2" />
            <rect x="330" y="75" width="90" height="50" rx="4" fill={pass ? "#dcfce7" : "#fee2e2"} stroke={pass ? "#16a34a" : "#dc2626"} strokeWidth="2" />
            <text x="375" y="95" textAnchor="middle" fontSize="8" fill="var(--gray)" fontFamily="monospace">Urteil</text>
            <text x="375" y="110" textAnchor="middle" fontSize="8" fontWeight="bold" fill={pass ? "#15803d" : "#b91c1c"} fontFamily="monospace">
              {pass ? "GEBOTEN" : "VERBOTEN"}
            </text>
          </svg>
        );
      }

      // 34. 哲学：柏拉图洞穴之喻 (Höhle)
      case "hoehle": {
        const step = paramA < 25 ? 0 : paramA < 50 ? 1 : paramA < 75 ? 2 : 3;
        return (
          <svg className="w-full h-52 rounded bg-[var(--paper-subtle)]/40 border border-[var(--line)]/50" viewBox="0 0 440 200">
            <path d="M 40 170 L 130 170 L 130 130 L 220 130 L 220 90 L 310 90 L 310 50 L 400 50" fill="none" stroke="var(--ink)" strokeWidth="2" />
            <rect x="40" y="140" width="80" height="28" fill="#1e293b" fillOpacity={step === 0 ? 0.8 : 0.2} rx="3" />
            <text x="80" y="157" textAnchor="middle" fontSize="9" fill="white" fontFamily="monospace">I. Schatten</text>
            <rect x="130" y="100" width="80" height="28" fill="#ea580c" fillOpacity={step === 1 ? 0.8 : 0.2} rx="3" />
            <text x="170" y="117" textAnchor="middle" fontSize="9" fill="white" fontFamily="monospace">II. Feuer</text>
            <rect x="220" y="60" width="80" height="28" fill="#0284c7" fillOpacity={step === 2 ? 0.8 : 0.2} rx="3" />
            <text x="260" y="77" textAnchor="middle" fontSize="9" fill="white" fontFamily="monospace">III. Dianoia</text>
            <circle cx="360" cy="35" r="22" fill="#facc15" />
            <text x="360" y="38" textAnchor="middle" fontSize="8" fontWeight="bold" fill="#78350f" fontFamily="monospace">SONNE</text>
            <circle cx={70 + step * 90} cy={160 - step * 40} r="6" fill="var(--accent)" stroke="var(--paper)" strokeWidth="2" />
          </svg>
        );
      }

      // 35. 哲学：社会契约谱系 (Staatsvertrag)
      case "staatsvertrag": {
        return (
          <svg className="w-full h-52 rounded bg-[var(--paper-subtle)]/40 border border-[var(--line)]/50" viewBox="0 0 440 200">
            <line x1="60" y1="100" x2="380" y2="100" stroke="var(--ink)" strokeWidth="2" />
            <circle cx="100" cy="100" r="12" fill="#ef4444" />
            <text x="100" y="80" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#ef4444" fontFamily="monospace">Hobbes</text>
            <circle cx="220" cy="100" r="12" fill="#0284c7" />
            <text x="220" y="80" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#0284c7" fontFamily="monospace">Locke</text>
            <circle cx="340" cy="100" r="12" fill="#16a34a" />
            <text x="340" y="80" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#16a34a" fontFamily="monospace">Rousseau</text>
            <circle cx={60 + (paramA / 100) * 320} cy="100" r="8" fill="var(--accent)" stroke="var(--paper)" strokeWidth="2.5" />
            <rect x="140" y="135" width="160" height="35" rx="3" fill="var(--surface)" stroke="var(--line)" />
            <text x="220" y="156" textAnchor="middle" fontSize="10" fontWeight="bold" fill="var(--ink)" fontFamily="monospace">{data.rateValue}</text>
          </svg>
        );
      }

      // 36. 哲学：罗尔斯无知之幕天平 (Rawls)
      case "rawls": {
        return (
          <svg className="w-full h-52 rounded bg-[var(--paper-subtle)]/40 border border-[var(--line)]/50" viewBox="0 0 440 200">
            <rect x="80" y="40" width="280" height="90" fill="#334155" fillOpacity={paramA > 40 ? 0.9 : 0.15} rx="6" />
            <text x="220" y="85" textAnchor="middle" fontSize="12" fontWeight="bold" fill={paramA > 40 ? "#f8fafc" : "#94a3b8"} fontFamily="monospace">
              {paramA > 40 ? "SCHLEIER DES NICHTWISSENS (AKTIV)" : "KEIN SCHLEIER (PRIVILEGIERT)"}
            </text>
            <rect x="130" y="145" width="180" height="35" rx="3" fill="var(--surface)" stroke="var(--line)" />
            <text x="220" y="166" textAnchor="middle" fontSize="10" fontWeight="bold" fill="var(--accent)" fontFamily="monospace">{data.rateValue}</text>
          </svg>
        );
      }

      // 37. 哲学：波普尔黑天鹅证伪计数器 (Popper)
      case "popper": {
        const geg = paramB > 60;
        return (
          <svg className="w-full h-52 rounded bg-[var(--paper-subtle)]/40 border border-[var(--line)]/50" viewBox="0 0 440 200">
            <rect x="60" y="40" width="140" height="110" rx="4" fill="var(--paper)" stroke="var(--ink)" strokeWidth="1.5" />
            <text x="130" y="65" textAnchor="middle" fontSize="9" fill="var(--gray)" fontFamily="monospace">Weiße Schwäne (n)</text>
            <text x="130" y="105" textAnchor="middle" fontSize="18" fontWeight="bold" fill="var(--ink)" fontFamily="monospace">{data.paramAValueDisplay}</text>

            <rect x="240" y="40" width="140" height="110" rx="4" fill={geg ? "#0f172a" : "var(--paper)"} stroke={geg ? "#dc2626" : "var(--line)"} strokeWidth="2" />
            <text x="310" y="65" textAnchor="middle" fontSize="9" fill={geg ? "#f8fafc" : "var(--gray)"} fontFamily="monospace">Schwarzer Schwan</text>
            <text x="310" y="105" textAnchor="middle" fontSize="16" fontWeight="bold" fill={geg ? "#ef4444" : "var(--gray)"} fontFamily="monospace">
              {geg ? "WIDERLEGT!" : "Keiner"}
            </text>
            <rect x="150" y="160" width="140" height="25" rx="3" fill="var(--surface)" stroke="var(--line)" />
            <text x="220" y="176" textAnchor="middle" fontSize="9" fontWeight="bold" fill={geg ? "#dc2626" : "var(--accent)"} fontFamily="monospace">{data.rateValue}</text>
          </svg>
        );
      }

      // 38. 哲学：阿伦特独立判断力齿轮 (Arendt)
      case "arendt": {
        return (
          <svg className="w-full h-52 rounded bg-[var(--paper-subtle)]/40 border border-[var(--line)]/50" viewBox="0 0 440 200">
            <circle cx="140" cy="100" r="45" fill="none" stroke="var(--ink)" strokeWidth="4" strokeDasharray="8,6" />
            <circle cx="140" cy="100" r="15" fill="var(--paper-subtle)" stroke="var(--ink)" strokeWidth="1.5" />
            <text x="140" y="104" textAnchor="middle" fontSize="7" fill="var(--gray)" fontFamily="monospace">Rädchen</text>

            <circle cx="300" cy="100" r="40" fill="#fef08a" stroke="#ca8a04" strokeWidth="2" />
            <text x="300" y="95" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#78350f" fontFamily="monospace">Autonome</text>
            <text x="300" y="110" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#78350f" fontFamily="monospace">Urteilskraft</text>
            <rect x="130" y="160" width="180" height="25" rx="3" fill="var(--surface)" stroke="var(--line)" />
            <text x="220" y="176" textAnchor="middle" fontSize="9" fontWeight="bold" fill="var(--ink)" fontFamily="monospace">{data.rateValue}</text>
          </svg>
        );
      }

      // 39. 德语：弗赖塔格古典五幕金字塔 (Freytag)
      case "freytag": {
        const pA = paramA / 100;
        const curX = 50 + pA * 340;
        const curY = pA < 0.5 ? 160 - (pA / 0.5) * 110 : 50 + ((pA - 0.5) / 0.5) * 110;
        return (
          <svg className="w-full h-52 rounded bg-[var(--paper-subtle)]/40 border border-[var(--line)]/50" viewBox="0 0 440 200">
            <polygon points="50,165 220,50 390,165" fill="none" stroke="var(--ink)" strokeWidth="2" strokeOpacity="0.3" />
            <line x1="30" y1="165" x2="410" y2="165" stroke="var(--ink)" strokeWidth="1.5" />
            <circle cx="50" cy="165" r="4" fill="var(--ink)" />
            <text x="50" y="180" textAnchor="middle" fontSize="9" fill="var(--ink)" fontFamily="monospace">I. Exposition</text>
            <circle cx="135" cy="107" r="4" fill="var(--ink)" />
            <text x="100" y="95" textAnchor="middle" fontSize="9" fill="var(--ink)" fontFamily="monospace">II. Steigend</text>
            <circle cx="220" cy="50" r="5" fill="var(--accent)" />
            <text x="220" y="38" textAnchor="middle" fontSize="10" fontWeight="bold" fill="var(--accent)" fontFamily="monospace">III. Peripetie</text>
            <circle cx="305" cy="107" r="4" fill="var(--ink)" />
            <text x="345" y="95" textAnchor="middle" fontSize="9" fill="var(--ink)" fontFamily="monospace">IV. Retardierend</text>
            <circle cx="390" cy="165" r="4" fill="var(--ink)" />
            <text x="390" y="180" textAnchor="middle" fontSize="9" fill="var(--ink)" fontFamily="monospace">V. Katastrophe</text>
            <circle cx={curX} cy={curY} r="7" fill="var(--accent)" stroke="var(--paper)" strokeWidth="2" />
          </svg>
        );
      }

      // 40. 德语：音步格律波形 (Metrum)
      case "metrum": {
        return (
          <svg className="w-full h-52 rounded bg-[var(--paper-subtle)]/40 border border-[var(--line)]/50" viewBox="0 0 440 200">
            <text x="220" y="40" textAnchor="middle" fontSize="12" fontWeight="bold" fill="var(--ink)" fontFamily="monospace">
              Versfuß: {data.paramAValueDisplay}
            </text>
            <path d="M 60 120 Q 90 70 120 120 Q 150 160 180 120 Q 210 70 240 120 Q 270 160 300 120 Q 330 70 360 120" fill="none" stroke="var(--accent)" strokeWidth="2.5" />
            <text x="90" y="60" textAnchor="middle" fontSize="9" fontWeight="bold" fill="var(--accent)" fontFamily="monospace">― (Hebung)</text>
            <text x="150" y="180" textAnchor="middle" fontSize="9" fill="var(--gray)" fontFamily="monospace">∪ (Senkung)</text>
            <rect x="130" y="145" width="180" height="35" rx="3" fill="var(--surface)" stroke="var(--line)" />
            <text x="220" y="167" textAnchor="middle" fontSize="10" fontWeight="bold" fill="var(--ink)" fontFamily="monospace">{data.rateValue}</text>
          </svg>
        );
      }

      // 41. 德语：布莱希特间离效果舞台 (Brecht)
      case "brecht": {
        const vEffekt = paramB > 45;
        return (
          <svg className="w-full h-52 rounded bg-[var(--paper-subtle)]/40 border border-[var(--line)]/50" viewBox="0 0 440 200">
            <line x1="50" y1="30" x2="390" y2="30" stroke="var(--ink)" strokeWidth="2" />
            {[80, 150, 220, 290, 360].map((x, i) => (
              <circle key={i} cx={x} cy="30" r="6" fill="#facc15" stroke="var(--ink)" strokeWidth="1" />
            ))}
            <text x="220" y="20" textAnchor="middle" fontSize="7" fill="var(--gray)" fontFamily="monospace">Sichtbare Scheinwerfer-Batterie</text>

            <rect x="120" y="55" width="200" height="35" rx="2" fill="#1e293b" />
            <text x="220" y="76" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#38bdf8" fontFamily="monospace">
              [ SPRUCHBAND: GLOTZT NICHT SO ROMANTISCH! ]
            </text>

            <line x1="50" y1="160" x2="390" y2="160" stroke="var(--ink)" strokeWidth="3" />
            <text x="220" y="180" textAnchor="middle" fontSize="9" fill="var(--gray)" fontFamily="monospace">
              {vEffekt ? "Zerbrochene 4. Wand: Zuschauer beobachtet kritisch" : "Einfühlungstheater"}
            </text>
          </svg>
        );
      }

      // 42. 德语：卡夫卡卧室平面图 (Kafka)
      case "kafka": {
        return (
          <svg className="w-full h-52 rounded bg-[var(--paper-subtle)]/40 border border-[var(--line)]/50" viewBox="0 0 440 200">
            <rect x="120" y="30" width="200" height="140" fill="none" stroke="var(--ink)" strokeWidth="2.5" />
            <text x="220" y="22" textAnchor="middle" fontSize="9" fontWeight="bold" fill="var(--ink)" fontFamily="monospace">Gregor Samsas Zimmer</text>

            <rect x="105" y="80" width="15" height="40" fill="#b91c1c" />
            <text x="80" y="103" textAnchor="end" fontSize="7" fill="#b91c1c" fontFamily="monospace">Tür Vater</text>

            <rect x="200" y="155" width="40" height="15" fill="#b91c1c" />
            <text x="220" y="185" textAnchor="middle" fontSize="7" fill="#b91c1c" fontFamily="monospace">Tür Wohnzimmer</text>

            <rect x="320" y="80" width="15" height="40" fill="#b91c1c" />
            <text x="345" y="103" fontSize="7" fill="#b91c1c" fontFamily="monospace">Tür Schwester</text>

            <ellipse cx="220" cy="100" rx="22" ry="12" fill="#78350f" stroke="#451a03" strokeWidth="1.5" />
            <circle cx="230" cy="97" r="4" fill="#dc2626" />
            <text x="220" y="125" textAnchor="middle" fontSize="8" fontWeight="bold" fill="#78350f" fontFamily="monospace">Ungeziefer (Apfel)</text>
          </svg>
        );
      }

      // 43. 德语：博尔歇特废墟文学零度语言 (Trümmerliteratur)
      case "borchert": {
        return (
          <svg className="w-full h-52 rounded bg-[var(--paper-subtle)]/40 border border-[var(--line)]/50" viewBox="0 0 440 200">
            <polygon points="60,170 90,80 110,130 140,60 170,170" fill="#475569" />
            <polygon points="270,170 300,90 330,140 360,70 390,170" fill="#334155" />
            <rect x="190" y="60" width="60" height="110" fill="#1e293b" stroke="var(--ink)" strokeWidth="2" />
            <circle cx="240" cy="115" r="4" fill="#facc15" />
            <text x="220" y="50" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#dc2626" fontFamily="monospace">Draußen vor der Tür</text>
            <text x="220" y="188" textAnchor="middle" fontSize="8" fill="var(--gray)" fontFamily="monospace">Das Brot: Schnittkante & Hunger</text>
          </svg>
        );
      }

      // 44. 德语：图尔敏论证模型 (Toulmin)
      case "toulmin": {
        return (
          <svg className="w-full h-52 rounded bg-[var(--paper-subtle)]/40 border border-[var(--line)]/50" viewBox="0 0 440 200">
            <rect x="40" y="45" width="85" height="40" rx="3" fill="var(--paper)" stroke="var(--ink)" strokeWidth="1.5" />
            <text x="82" y="68" textAnchor="middle" fontSize="9" fontWeight="bold" fill="var(--ink)" fontFamily="monospace">Datum (Fakt)</text>

            <path d="M 125 65 L 185 65" stroke="var(--ink)" strokeWidth="2" />
            <rect x="185" y="45" width="95" height="40" rx="3" fill="#fef08a" stroke="#ca8a04" strokeWidth="1.5" />
            <text x="232" y="68" textAnchor="middle" fontSize="8" fontWeight="bold" fill="#78350f" fontFamily="monospace">Warrant (Regel)</text>

            <path d="M 280 65 L 335 65" stroke="var(--ink)" strokeWidth="2" />
            <rect x="335" y="45" width="80" height="40" rx="3" fill="#dcfce7" stroke="#16a34a" strokeWidth="1.8" />
            <text x="375" y="68" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#15803d" fontFamily="monospace">Claim (These)</text>

            <path d="M 232 85 L 232 125" stroke="var(--ink)" strokeWidth="1.5" strokeDasharray="3,3" />
            <rect x="185" y="125" width="95" height="35" rx="3" fill="var(--paper-subtle)" stroke="var(--line)" />
            <text x="232" y="146" textAnchor="middle" fontSize="8" fill="var(--gray)" fontFamily="monospace">Backing (Stütze)</text>

            <path d="M 375 85 L 375 125" stroke="#dc2626" strokeWidth="1.5" strokeDasharray="3,3" />
            <rect x="330" y="125" width="90" height="35" rx="3" fill="#fee2e2" stroke="#dc2626" strokeWidth="1" />
            <text x="375" y="146" textAnchor="middle" fontSize="8" fill="#b91c1c" fontFamily="monospace">Rebuttal (Einwand)</text>
          </svg>
        );
      }

      // 默认精密科学测量刻度与响应示波器
      default: {
        return (
          <svg className="w-full h-52 rounded bg-[var(--paper-subtle)]/40 border border-[var(--line)]/50" viewBox="0 0 440 200">
            <line x1="40" y1="20" x2="40" y2="170" stroke="currentColor" strokeOpacity="0.2" strokeWidth="1.5" />
            <line x1="40" y1="170" x2="410" y2="170" stroke="currentColor" strokeOpacity="0.2" strokeWidth="1.5" />
            <line x1="40" y1="95" x2="410" y2="95" stroke="currentColor" strokeOpacity="0.1" strokeDasharray="3,3" />
            <path
              d={`M 40 170 Q 220 ${170 - data.graphY * 1.3} 410 ${170 - data.graphY * 1.1}`}
              fill="none"
              stroke="var(--accent)"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            <circle cx={40 + paramA * 3.7} cy={170 - data.graphY * 1.2} r="6" fill="var(--accent)" stroke="var(--paper)" strokeWidth="2" />
            <text x="50" y="35" fontSize="11" fill="var(--ink)" fontFamily="monospace">
              {sim.formula}
            </text>
          </svg>
        );
      }
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
              {de ? data.rateLabelDE : data.rateLabelZH}
            </span>
            <span className="text-sm font-bold text-[var(--ink)]">
              {data.rateValue}
            </span>
          </div>
          <div className="rounded border border-[var(--line)] bg-[var(--paper-subtle)] px-3 py-1.5 text-right font-mono">
            <span className="text-[10px] text-[var(--gray)] block">
              {de ? data.subLabelDE : data.subLabelZH}
            </span>
            <span className="text-xs font-semibold text-[var(--accent)]">
              {data.subValue}
            </span>
          </div>
        </div>
      </div>

      {/* 中部专属真实 SVG 交互仿真画布 */}
      {renderArchetypeCanvas()}

      {/* 底部双滑动变阻器 / 参量调节器 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 rounded-lg border border-[var(--line)]/60 bg-[var(--paper-subtle)]/40 p-4">
        {/* 控制参数 A */}
        <div className="space-y-1.5 font-mono">
          <div className="flex justify-between items-center text-xs">
            <span className="text-[var(--ink)] font-medium">
              {de ? data.paramALabelDE : data.paramALabelZH}
            </span>
            <span className="text-[var(--accent)] font-bold">
              {data.paramAValueDisplay}
            </span>
          </div>
          <input
            type="range"
            min="0"
            max="100"
            value={paramA}
            onChange={(e) => setParamA(Number(e.target.value))}
            className="w-full h-1.5 bg-[var(--line)] rounded-lg appearance-none cursor-pointer accent-[var(--accent)]"
          />
        </div>

        {/* 控制参数 B */}
        <div className="space-y-1.5 font-mono">
          <div className="flex justify-between items-center text-xs">
            <span className="text-[var(--ink)] font-medium">
              {de ? data.paramBLabelDE : data.paramBLabelZH}
            </span>
            <span className="text-[var(--accent)] font-bold">
              {data.paramBValueDisplay}
            </span>
          </div>
          <input
            type="range"
            min="0"
            max="100"
            value={paramB}
            onChange={(e) => setParamB(Number(e.target.value))}
            className="w-full h-1.5 bg-[var(--line)] rounded-lg appearance-none cursor-pointer accent-[var(--accent)]"
          />
        </div>
      </div>

      {/* 核心考点深度解剖与数据导出 */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-t border-[var(--line)] pt-3 text-xs">
        <div className="font-sans text-[var(--gray)] leading-relaxed flex-1">
          <span className="font-semibold text-[var(--ink)] font-mono mr-1.5">
            {de ? "Klausur-Erkenntnis:" : "会考原题命题陷阱与考点剖析:"}
          </span>
          {de ? data.insightDE : data.insightZH}
        </div>

        <button
          type="button"
          onClick={handleExport}
          className="whitespace-nowrap px-3 py-1.5 font-mono text-xs rounded border border-[var(--line)] hover:border-[var(--accent)] hover:text-[var(--accent)] bg-[var(--surface)] transition-colors self-end sm:self-auto cursor-pointer"
        >
          {de ? "Daten kopieren" : "导出测定数据"}
        </button>
      </div>
    </div>
  );
}

export default UniversalInteractiveWorkbench;
