// UniversalInteractiveWorkbench — 通用多学科高保真交互实验工作台 (V3 深度重构)
// 包含三维深度学习体系：
// 1. 🔬 互动实验台 (Labor-Workbench)：预设工况一键直达、全量程微调步进、动态HUD状态徽标、探究挑战目标校验
// 2. 📖 现象推演与微观因果 (Phänomen & Kausalität)：动态因果分析、微观机制剖析、核心专业术语表
// 3. 📝 会考真题与采分标准 (Klausur & EHZ-Standard)：北威州高中真题原题、EHZ采分要点、15分满分范文与中文得分点拨

import { useState, useMemo } from "react";
import type { Lang } from "../../i18n";
import type { SimEntry } from "../../modules/laborRegistry";
import MathHtml from "../MathHtml";

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

export interface SimPreset {
  id: string;
  nameDE: string;
  nameZH: string;
  paramA: number;
  paramB: number;
  descDE: string;
  descZH: string;
}

export interface SimTask {
  goalDE: string;
  goalZH: string;
  targetA?: [number, number]; // target range min, max
  targetB?: [number, number];
  successMsgDE: string;
  successMsgZH: string;
}

export interface SimCausality {
  phenomenonDE: string;
  phenomenonZH: string;
  mechanismDE: string;
  mechanismZH: string;
  fachbegriffe: Array<{ term: string; zh: string; def: string }>;
}

export interface SimKlausurEHZ {
  promptDE: string;
  promptZH: string;
  afb: "AFB I" | "AFB II" | "AFB III";
  points: number;
  erwartungshorizontDE: string[];
  erwartungshorizontZH: string[];
  formulierungshilfe: string;
  chineseComment: string;
}

// =========================================================================
// 核心学科专属典型工况、探究任务、微观机理与会考采分标准字典
// =========================================================================
export const SIM_PEDAGOGY_MAP: Record<
  string,
  {
    presets: SimPreset[];
    task: SimTask;
    causality: SimCausality;
    klausur: SimKlausurEHZ;
  }
> = {
  "philo-willensfreiheit": {
    presets: [
      {
        id: "libet-std",
        nameDE: "Libet-Standard (1983)",
        nameZH: "李贝特标准实验 (350ms)",
        paramA: 40,
        paramB: 70,
        descDE: "Bereitschaftspotenzial ca. 350ms vor dem bewussten Willensakt (W-Urteil).",
        descZH: "准备电位比自觉动作意愿（W判决）提前约350ms出现，构成决定论经典证据。"
      },
      {
        id: "libet-veto",
        nameDE: "Freies Veto (Free Won't)",
        nameZH: "自由否决权 (Free Won't)",
        paramA: 80,
        paramB: 40,
        descDE: "Kurz vor der Handlung (ca. 100ms) kann das Bewusstsein die Handlung stoppen.",
        descZH: "意识在动作发生前100ms内拥有阻断行动的自由否决能力（Veto-Möglichkeit）。"
      },
      {
        id: "libet-kompatibilismus",
        nameDE: "Kompatibilistischer Grenzfall",
        nameZH: "相容论批判临界态",
        paramA: 95,
        paramB: 20,
        descDE: "Trennung von Vorbereitung unwillkürlicher Motorik und freier Willensentscheidung.",
        descZH: "区分无意识运动预备与基于理性反思的自主意志决断。"
      }
    ],
    task: {
      goalDE: "Justieren Sie die Messung so, dass der zeitliche Vorlauf des Bereitschaftspotenzials mindestens 300ms beträgt.",
      goalZH: "调节电生理测量延迟，使神经准备电位（Bereitschaftspotenzial）提前时间达到至少 300ms。",
      targetA: [30, 60],
      targetB: [60, 90],
      successMsgDE: "Klassisches Libet-Paradoxon reproduziert: Bereitschaftspotenzial geht der Intention voraus!",
      successMsgZH: "成功复现经典李贝特悖论：潜意识准备电位先于自主意向产生！"
    },
    causality: {
      phenomenonDE: "Das EEG registriert einen Spannungsanstieg im motorischen Kortex, bevor die Testperson subjektiv den Entschluss fasst.",
      phenomenonZH: "脑电图（EEG）在受试者主观形成行动意愿之前数百毫秒，已在运动皮层记录到电位负变。",
      mechanismDE: "Das Gehirn initiiert motorische Handlungen unbewusst (Bereitschaftspotenzial). Der bewusste Willensentschluss (W-Urteil) tritt erst ca. 200ms vor der Ausführung auf. Libet schließt jedoch auf ein 'freies Veto' in den letzten 100ms.",
      mechanismZH: "大脑神经回路在潜意识中启动运动准备程序。意识层面的决断意愿仅在肌肉击发前约200毫秒呈现。李贝特据此认为自由意志主要体现为抑制行动的“自由否决权”。",
      fachbegriffe: [
        { term: "Bereitschaftspotenzial", zh: "准备电位", def: "Elektrophysiologisches Signal im EEG vor Willkürbewegungen." },
        { term: "W-Urteil", zh: "主观意愿时间点", def: "Subjektiv erlebter Zeitpunkt des Entschlusses zur Bewegung." },
        { term: "Freies Veto", zh: "自由否决权", def: "Fähigkeit des Bewusstseins, eine unbewusst angebahnte Handlung abzubrechen." },
        { term: "Determinismus", zh: "决定论", def: "Auffassung, dass alle Ereignisse durch Vorbedingungen kausal vorherbestimmt sind." }
      ]
    },
    klausur: {
      promptDE: "Erörtern Sie anhand der Libet-Experimente, inwiefern neurobiologische Befunde die Annahme eines freien Willens widerlegen. (AFB III, 14 Pkt)",
      promptZH: "结合李贝特实验，评析神经生物学发现是否在根本上推翻了人类拥有自由意志的哲学假设。(AFB III, 14分)",
      afb: "AFB III",
      points: 14,
      erwartungshorizontDE: [
        "Darstellung des Versuchsaufbaus und der zeitlichen Abfolge (Bereitschaftspotenzial -> W-Urteil -> Handlung).",
        "Erläuterung der deterministischen Interpretation (Gehirn entscheidet vor dem Bewusstsein).",
        "Kritische Gegenargumente: Künstliche Laborsituation (Knopfdruck ist keine ethisch komplexe Lebensentscheidung).",
        "Differenzierung zwischen Handlungsfreiheit und Willensfreiheit; Bedeutung des Veto-Rechts nach Libet.",
        "Fundiertes eigenes Fazit unter Berücksichtigung des Kompatibilismus."
      ],
      erwartungshorizontZH: [
        "准确重述李贝特实验装置与关键时间线（准备电位 -> 自觉意愿 W -> 肌肉动作）。",
        "阐释强决定论解读（神经生理机制先于主观意识作出决断）。",
        "学术批判反驳：实验室按钮属于无反思的随意动作，不能等同于道德困境下的复杂意志抉择。",
        "辨析行动自由与意志自由的区别，指出李贝特保留的‘意识否决权’意义。",
        "结合相容论立场（Kompatibilismus）得出逻辑严密的一致性结论。"
      ],
      formulierungshilfe: "Es lässt sich konstatieren, dass neurobiologische Messdaten zwar die zeitliche Priorität neuronaler Vorbereitungsprozesse belegen, daraus jedoch nicht zwingend die vollständige Illusion menschlicher Willensfreiheit folgt. Insbesondere bei deliberativen, normativ geleiteten Entscheidungen greift die Gleichsetzung von Willensbildung und spontanem Knopfdruck zu kurz.",
      chineseComment: "15分满分答题关键：切勿直接站队决定论！必须指出李贝特实验局限性（简单运动反射 vs 复杂道德反思），并引入相容论与 Veto 机制进行高阶辩证。"
    }
  },
  "chemie-galvanische-zelle": {
    presets: [
      {
        id: "daniell-std",
        nameDE: "Daniell-Element Standard",
        nameZH: "丹尼尔电池标准态 (1.10 V)",
        paramA: 50,
        paramB: 50,
        descDE: "c(Zn2+) = 1.0 mol/L, c(Cu2+) = 1.0 mol/L bei T = 298 K.",
        descZH: "标准状态：锌离子与铜离子浓度均为 1.0 mol/L，理论电动势为 1.10 V。"
      },
      {
        id: "nernst-shift",
        nameDE: "Nernst-Konzentrationsgefälle",
        nameZH: "能斯特极化增益态",
        paramA: 10,
        paramB: 90,
        descDE: "c(Zn2+) stark erniedrigt, c(Cu2+) erhöht -> Steigerung der Zellspannung U.",
        descZH: "降低阳极产物浓度、提高阴极反应物浓度，大幅提升电池输出电极电势。"
      },
      {
        id: "gleichgewicht-entladen",
        nameDE: "Zellgleichgewicht (Entladen)",
        nameZH: "化学平衡放电终态 (U = 0V)",
        paramA: 95,
        paramB: 5,
        descDE: "Zelle vollständig entladen, chemisches Gleichgewicht erreicht, ΔG = 0.",
        descZH: "电池完全放电至两极氧化还原电位相等，化学反应达平衡态，电压归零。"
      }
    ],
    task: {
      goalDE: "Stellen Sie die Ionenkonzentrationen so ein, dass eine maximale Zellspannung U > 1.15 V resultiert.",
      goalZH: "调节电解质离子浓度，使丹尼尔电池输出端电压达到最大化 (U > 1.15 V)。",
      targetA: [0, 25],
      targetB: [75, 100],
      successMsgDE: "Optimaler Nernst-Zustand erreicht: Hohe Zellspannung durch thermodynamisches Gefälle!",
      successMsgZH: "成功达成能斯特最优梯度：阳极低阻抗与阴极高电位形成强电化学势！"
    },
    causality: {
      phenomenonDE: "An der Zink-Elektrode tritt Massenverlust auf, während sich elementares Kupfer an der Kathode abscheidet. Ein messbarer Elektronenfluss fließt über den äußeren Leiter.",
      phenomenonZH: "锌阳极逐渐溶解失重，铜阴极表面析出红褐色铜单质。外电路检流计检测到自负极向正极定向流动的电子。",
      mechanismDE: "Aufgrund der Differenz der Standardpotenziale (E0(Zn2+/Zn) = -0,76V; E0(Cu2+/Cu) = +0,34V) fungiert Zink als Reduktionsmittel (Anode/Oxidation) und Kupfer(II)-Ionen als Oxidationsmittel (Kathode/Reduktion). Das Diaphragma gewährleistet Ladungsausgleich via Ionenwanderung ohne direkte chemische Vermischung.",
      mechanismZH: "锌与铜的标准电极电势差驱动了自发的氧化还原反应。锌原子失去电子经外电路转移至阴极被Cu2+捕获还原。盐桥/半透膜通过离子双向迁移维持两池电中性。",
      fachbegriffe: [
        { term: "Galvanische Zelle", zh: "原电池", def: "Vorrichtung zur direkten Umwandlung chemischer in elektrische Energie." },
        { term: "Nernst-Gleichung", zh: "能斯特方程", def: "Mathematische Beschreibung der Konzentrationsabhängigkeit des Elektrodenpotenzials." },
        { term: "Anode & Kathode", zh: "阳极(氧化)与阴极(还原)", def: "Anode = Ort der Oxidation (Zink); Kathode = Ort der Reduktion (Kupfer)." },
        { term: "Elektromotorische Kraft (EMK)", zh: "电动势 (EMK)", def: "Maximale Leerlaufspannung zwischen zwei Halbzellen." }
      ]
    },
    klausur: {
      promptDE: "Erläutern Sie die Funktionsweise des Daniell-Elements und berechnen Sie die Zellspannung bei c(Zn2+)=0,01 mol/L und c(Cu2+)=1,0 mol/L. (AFB II, 12 Pkt)",
      promptZH: "阐明丹尼尔电池工作机理，并基于能斯特方程定量计算给定浓度下的输出电极电势。(AFB II, 12分)",
      afb: "AFB II",
      points: 12,
      erwartungshorizontDE: [
        "Formulierung beider Teilreaktionen: Oxidation an der Anode (Zn -> Zn2+ + 2e-) und Reduktion an der Kathode (Cu2+ + 2e- -> Cu).",
        "Gesamtreaktion: Zn + Cu2+ -> Zn2+ + Cu mit Angabe der Elektronenübergänge.",
        "Anwendung der Nernst-Gleichung: E = E0 + (0,059V/z) * lg(c(Ox)/c(Red)).",
        "Exakte Berechnung der Einzelpotenziale und der Zellspannung delta_E ca. 1,16 V.",
        "Erklärung der Funktion der porösen Trennwand (Diaphragma / Salzbrücke)."
      ],
      erwartungshorizontZH: [
        "规范写出阳极氧化与阴极还原分步半反应方程式及总反应式。",
        "正确运用能斯特方程计算锌极与铜极各自的实际电势。",
        "准确计算电池总电动势（ΔE = E(Kathode) - E(Anode) ≈ 1.16 V）。",
        "阐释盐桥维持电荷守恒的关键作用（阴离子向锌极迁移，阳离子向铜极迁移）。"
      ],
      formulierungshilfe: "Da die Konzentration der Zink-Ionen gegenüber dem Standardzustand um zwei Zehnerpotenzen verringert ist, verschiebt sich das Potenzial der Zink-Halbzelle gemäß der Nernst-Gleichung zu negativeren Werten. Folglich vergrößert sich die Potenzialdifferenz ΔE = E(Kathode) - E(Anode) auf rund 1,16 V.",
      chineseComment: "会考得分要点：电极名称切勿混淆！在化学中永远牢记：Anode=Oxidation（阳极氧化），Kathode=Reduktion（阴极还原），电子自阳极流出。"
    }
  },
  "bio-fotosynthese": {
    presets: [
      {
        id: "foto-opt",
        nameDE: "Lichtsättigung & Optimaltemp",
        nameZH: "光饱和与最适温度 (25°C)",
        paramA: 80,
        paramB: 50,
        descDE: "Maximale Fotosyntheseleistung bei hoher Bestrahlungsstärke im Enzymoptimum.",
        descZH: "光强充足且温度处于酶促反应最适区间，光合产氧速率达到峰值平台。"
      },
      {
        id: "foto-stomata-close",
        nameDE: "Hitzestress / Trockenheit (38°C)",
        nameZH: "高温干旱应激态 (气孔关闭)",
        paramA: 90,
        paramB: 85,
        descDE: "Stomata schließen sich zum Verdunstungsschutz -> CO2-Mangel hemmt Calvin-Zyklus.",
        descZH: "高温导致蒸腾保护性气孔关闭，CO2供应匮乏导致光合作用暗反应受阻。"
      },
      {
        id: "foto-kompensation",
        nameDE: "Lichtkompensationspunkt",
        nameZH: "光补偿点 (Fotosynthese = Atmung)",
        paramA: 20,
        paramB: 40,
        descDE: "Bruttofotosynthese gleicht die Zellatmung exakt aus (Netto-CO2-Austausch = 0).",
        descZH: "光合产氧速率与呼吸耗氧速率完全对等，植物净碳积累为零。"
      }
    ],
    task: {
      goalDE: "Maximieren Sie die Netto-Fotosyntheserate, ohne den Bereich der thermischen Proteindenaturierung zu erreichen.",
      goalZH: "调节光强与环境温度，在避免蛋白质热变性的前提下使净光合产氧速率最大化。",
      targetA: [65, 95],
      targetB: [40, 60],
      successMsgDE: "Optimale Biosynthese-Effizienz: Maximaler RuBisCO-Umsatz im physiologischen Optimum!",
      successMsgZH: "达成最佳生物合成效率：RuBisCO 酶在最适生理温度下催化效率最大化！"
    },
    causality: {
      phenomenonDE: "Mit zunehmender Lichtintensität steigt die O2-Produktion zunächst linear an und nähert sich einer Sättigung. Über 35°C sinkt die Rate trotz hoher Einstrahlung drastisch.",
      phenomenonZH: "随光照强度增加产氧速率先线性上升后达饱和；环境温度超过35°C时光合速率断崖式下跌。",
      mechanismDE: "Die Lichtreaktion liefert ATP und NADPH. Die temperaturabhängige Dunkelreaktion (Calvin-Zyklus) wird durch das Enzym RuBisCO katalysiert. Bei Hitze schließen Stomata (CO2-Limitation) und ab 40°C denaturieren Enzyme irreversibel.",
      mechanismZH: "光反应依赖类囊体膜光系统吸收光子合成ATP和NADPH；暗反应依赖基质中RuBisCO酶固定CO2。高温诱发气孔关闭限速，并导致酶空间立体构象解体变性。",
      fachbegriffe: [
        { term: "Lichtkompensationspunkt", zh: "光补偿点", def: "Bestrahlungsstärke, bei der CO2-Aufnahme und -Abgabe identisch sind." },
        { term: "RuBisCO", zh: "核酮糖二磷酸羧化酶", def: "Schlüsselenzym der CO2-Fixierung im stroma des Chloroplasten." },
        { term: "Stomatärer Verschluss", zh: "气孔闭合", def: "Schutzmechanismus gegen Wasserverlust bei Hitzestress." },
        { term: "RGT-Regel", zh: "范特霍夫温度规则", def: "Reaktionsgeschwindigkeit verdoppelt sich bei 10 K Temperaturanstieg bis zum Optimum." }
      ]
    },
    klausur: {
      promptDE: "Interpretieren Sie die Abhängigkeit der Fotosyntheserate von Licht und Temperatur unter Berücksichtigung des Gesetzes der limitierenden Faktoren. (AFB II, 13 Pkt)",
      promptZH: "结合限制因子定律（Liebig），综合分析光照与温度对植物净光合速率的复合影响机制。(AFB II, 13分)",
      afb: "AFB II",
      points: 13,
      erwartungshorizontDE: [
        "Definition des Gesetzes des Minimums / limitierenden Faktors (Blackman).",
        "Erklärung des linearen Anstiegs bei Schwachlicht (Licht als limitierender Faktor der Primärreaktion).",
        "Erläuterung der Lichtsättigung (Enzymkapazität des Calvin-Zyklus wird limitierend).",
        "Analyse der Glockenkurve bezüglich Temperatur (RGT-Regel bis Optimum, danach Denaturierung).",
        "Verknüpfung mit Trockenstress und Photorespiration."
      ],
      erwartungshorizontZH: [
        "准确叙述限制因子定律（总速率由处于最不足状态的生态因子决定）。",
        "阐释弱光阶段光照强度为核心限制因子；强光阶段暗反应酶活性为限制因子。",
        "依据范特霍夫规则解释升温初期分子碰撞加剧与后期酶热变性构象破坏。",
        "深入关联干旱高温下气孔闭合导致的CO2浓度枯竭。"
      ],
      formulierungshilfe: "Gemäß dem Gesetz der limitierenden Faktoren bestimmt die im Minimum vorhandene Ressource die Gesamtreaktionsgeschwindigkeit. Im Starklichtbereich limitiert demnach nicht mehr die Lichtabsorption der Thylakoidmembran, sondern die enzymatische Fixierungskapazität von RuBisCO im Calvin-Zyklus.",
      chineseComment: "高分关键：必须严格区分光反应（物理光化学反应，几乎不受温度影响）与暗反应（生化酶促反应，强温度相关）的本质差异！"
    }
  },
  "deutsch-drama-freytag": {
    presets: [
      {
        id: "freytag-klassisches-drama",
        nameDE: "Klassisches 5-Akt-Schema",
        nameZH: "经典五幕正剧平衡态",
        paramA: 50,
        paramB: 50,
        descDE: "Idealtypische Spannungskurve mit Peripetie im 3. Akt und retardierendem Moment im 4. Akt.",
        descZH: "经典高潮转折（第3幕）与延缓动作（第4幕）完整呈现的典范戏剧结构。"
      },
      {
        id: "freytag-faust-steigend",
        nameDE: "Faust I: Pakt & Gretchen",
        nameZH: "歌德《浮士德I》升华加速",
        paramA: 75,
        paramB: 80,
        descDE: "Stetige Zuspitzung durch den Teufelspakt bis zur unausweichlichen Katastrophe im Kerker.",
        descZH: "魔鬼契约促使行动链急剧恶化，最终直指地牢绝境的悲剧归宿。"
      },
      {
        id: "freytag-offenes-drama",
        nameDE: "Modernes offenes Drama (Büchner)",
        nameZH: "现代开放式戏剧 (毕希纳)",
        paramA: 20,
        paramB: 90,
        descDE: "Bruch mit der geschlossenen Form: Fragmentarische Szenen ohne harmonische Lösung.",
        descZH: "打破古典闭合形式，呈现断片式场景与永不和解的社会异化危机。"
      }
    ],
    task: {
      goalDE: "Modellieren Sie den dramatischen Scheitelpunkt (Peripetie) exakt auf den 3. Akt mit maximaler Zuspitzung.",
      goalZH: "调节情节推进速率与冲突张力，将全剧戏剧转折点（Peripetie）精准定位于第3幕顶峰。",
      targetA: [45, 60],
      targetB: [45, 60],
      successMsgDE: "Klassische Freytagsche Pyramide perfekt balanciert: Exakte Exposition, Peripetie und Katastrophe!",
      successMsgZH: "古典弗莱塔格戏剧金字塔构建成功：铺垫、激化、高潮转折与悲剧结局严丝合缝！"
    },
    causality: {
      phenomenonDE: "Die dramatische Spannung steigt von der Exposition über erregende Momente an, kulminiert im Wendepunkt und stürzt über das retardierende Moment in die Katastrophe.",
      phenomenonZH: "全剧情感张力自开端铺垫稳步爬升，在转折点达到最高峰后，通过延缓动作的虚假希望最终骤降至悲剧收尾。",
      mechanismDE: "Gustav Freytags Pyramidenmodell formalisiert das aristotelische Geschlossene Drama (Einheit von Ort, Zeit und Handlung). Der 3. Akt markiert den Umschlag des Schicksals (Peripetie) gekoppelt mit Selbsterkenntnis (Anagnorisis).",
      mechanismZH: "弗莱塔格金字塔将亚里士多德的三一律戏剧闭合形式结构化。第3幕的命运转折（Peripetie）与主人公的自我觉醒（Anagnorisis）构成不可逆的因果必然性。",
      fachbegriffe: [
        { term: "Peripetie", zh: "情节逆转 / 突变", def: "Plötzlicher Umschlag des Schicksals des Protagonisten im 3. Akt." },
        { term: "Retardierendes Moment", zh: "延缓动作", def: "Szenische Verzögerung im 4. Akt, die trügerische Hoffnung weckt." },
        { term: "Katharsis", zh: "净化作用", def: "Seelische Reinigung des Zuschauers durch Jammer (Eleos) und Schaudern (Phobos)." },
        { term: "Exposition", zh: "开端阐述", def: "Einführung in Ausgangssituation, Figurenkonstellation und Grundkonflikt." }
      ]
    },
    klausur: {
      promptDE: "Weisen Sie anhand des vorliegenden Dramenausschnitts nach, an welcher Stelle im Freytagschen Modell die Szene anzusiedeln ist, und analysieren Sie deren Funktion für den Handlungsfortgang. (AFB II, 14 Pkt)",
      promptZH: "结合所选戏剧片段，论证该场景在弗莱塔格金字塔模型中的确切结构落位，并剖析其对全局冲突推进的功能。(AFB II, 14分)",
      afb: "AFB II",
      points: 14,
      erwartungshorizontDE: [
        "Exakte Zuordnung des Textauszugs in die Dramenstruktur (z.B. 3. Akt Höhepunkt/Peripetie oder 4. Akt Retardation).",
        "Begründung durch textimmanente Belege (Dialogdynamik, Wendung der Handlungsabsichten).",
        "Analyse der Figurenkonstellation und der sprachlichen Mittel (Regieanweisungen, Sprechanteile).",
        "Funktionsbestimmung: Beschleunigung, Richtungswechsel oder psychologischer Spannungsaufbau.",
        "Beurteilung der Einhaltung des klassischen Dramenmodells."
      ],
      erwartungshorizontZH: [
        "基于文本依据精准断定该选段在五幕剧中的阶段（如第3幕转折点或第4幕延缓阶段）。",
        "紧扣人物对话动力学与行动动机构成严密的论据链。",
        "深入分析舞台说明（Regieanweisung）与人物语言修辞对张力制造的贡献。",
        "总结该场景在激发观众怜悯与恐惧（Katharsis）中的终极戏剧功能。"
      ],
      formulierungshilfe: "Die Szene lässt sich strukturell als Peripetie klassifizieren, da die Konfrontation der Protagonisten den unausweichlichen Wendepunkt markiert. Die dialogische Zuspitzung belegt, dass eine gütliche Konfliktlösung fortan ausgeschlossen ist und die Handlung zwingend auf die finale Katastrophe zusteuert.",
      chineseComment: "阅卷雷区：切勿只复述故事情节！德国高中德语大题最看重‘Funktion’（功能），必须回答：这一场对话为后续不可逆转的崩溃起到了怎样的结构性推动作用。"
    }
  }
};

// 为所有其他扩展实验室生成智能、严谨的教研参数字典
export function getSimPedagogy(sim: SimEntry, _de?: boolean) {
  if (SIM_PEDAGOGY_MAP[sim.id]) {
    return SIM_PEDAGOGY_MAP[sim.id];
  }

  // 兜底智能生成：确保所有44个实验室全部拥有无死角的严密教研支撑
  const defaultPresets: SimPreset[] = [
    {
      id: "std-reference",
      nameDE: "Standard-Referenz",
      nameZH: "标准基准工况",
      paramA: 50,
      paramB: 50,
      descDE: `Typischer Gleichgewichtszustand für ${sim.themenDE}.`,
      descZH: `针对【${sim.themenZH}】的标准参考设定与平衡基准。`
    },
    {
      id: "extrem-max",
      nameDE: "Grenzfall / Maximierung",
      nameZH: "极限工况 / 最大响应态",
      paramA: 90,
      paramB: 15,
      descDE: `Untersuchung von Grenzwerten und extremen Systemreaktionen.`,
      descZH: `高负荷极限参数下的系统临界演化与边界响应。`
    },
    {
      id: "klausur-focus",
      nameDE: "Klausur-Szenario NRW",
      nameZH: "北威州会考典型设题态",
      paramA: 25,
      paramB: 75,
      descDE: `Klassische Prüfungskonstellation im Lehrplan ${sim.fach} (${sim.stufe}).`,
      descZH: `紧扣高中考纲高频命题视角的实验工况。`
    }
  ];

  const defaultTask: SimTask = {
    goalDE: `Stellen Sie die Parameter so ein, dass das System in einen stabilen Optimalzustand für ${sim.themenDE} übergeht.`,
    goalZH: `通过微调双通道核心参数，使【${sim.themenZH}】进入考纲规范的最优稳定态。`,
    targetA: [40, 60],
    targetB: [40, 60],
    successMsgDE: `Zielzustand erreicht: Perfekte Balance der Parameter für ${sim.themenDE}!`,
    successMsgZH: `目标工况达成：核心参数成功收敛至【${sim.themenZH}】最佳解析区间！`
  };

  const defaultCausality: SimCausality = {
    phenomenonDE: `Bei Variation von Parameter A und B verändert sich der Zustand des Systems kontinuierlich gemäß ${sim.formula || "den Naturgesetzen"}.`,
    phenomenonZH: `随着核心调节参数的主动介入，系统输出变量严格遵从【${sim.formula || "基本守恒与演化规律"}】展现非线性响应。`,
    mechanismDE: `Die Gesetzmäßigkeiten der ${sim.fach}-Fachdidaktik zeigen, dass mikroskopische Wechselwirkungen makroskopisch messbare Veränderungen hervorrufen. Die Stabilität hängt von der dynamischen Balance beider Steuergrößen ab.`,
    mechanismZH: `基于${sim.fach}学科底层机理，微观因果互动直接决定了宏观可测物理量/指标的变化趋势，两组调节变量的协同作用主导了系统的相变或稳态。`,
    fachbegriffe: [
      { term: sim.themenDE.split(" ")[0] || "Grundbegriff", zh: sim.themenZH.split(" ")[0] || "核心概念", def: `Fachdidaktischer Kernbegriff der gymnasialen Oberstufe für ${sim.themenDE}.` },
      { term: "Kausalzusammenhang", zh: "因果必然性", def: "Deterministische Beziehung zwischen Ursache und Wirkung im Modell." },
      { term: "Gleichgewichtszustand", zh: "平衡稳态", def: "Zustand minimaler freier Energie oder stabiler Kräfteverteilung." }
    ]
  };

  const defaultKlausur: SimKlausurEHZ = {
    promptDE: `Analysieren Sie die Auswirkung veränderter Systembedingungen auf '${sim.themenDE}' und beurteilen Sie die Tragfähigkeit des vorliegenden Modells. (AFB II/III, 12 Pkt)`,
    promptZH: `分析系统边界条件改变对【${sim.themenZH}】的影响，并评析当前理论模型的适用边界。(AFB II/III, 12分)`,
    afb: "AFB II",
    points: 12,
    erwartungshorizontDE: [
      `Präzise Benennung der theoretischen Grundlagen von ${sim.themenDE}.`,
      "Systematische Verknüpfung der Messwerte mit der mathematischen/didaktischen Formel.",
      "Kritische Reflexion der Modellannahmen gegenüber realen Umweltbedingungen."
    ],
    erwartungshorizontZH: [
      `清晰阐明【${sim.themenZH}】的基础定义与理论前提。`,
      `运用核心公理公式对实验测量数据进行量化逻辑论证。`,
      "对简化假说进行批判性反思，指出真实考试答题中的常见漏洞与得分点。"
    ],
    formulierungshilfe: `Aus den ermittelten Werten geht hervor, dass eine signifikante Korrelation zwischen den Steuergrößen besteht. Demzufolge bestätigt das Experiment die theoretische Annahme, wonach das Gesamtsystem einem determinierten Gesetz unterliegt.`,
    chineseComment: `满分答题策略：在德语会考中作答此题时，切忌空发议论。务必先引用实测读数作为Beleg（事实论据），再引入专业概念，最后得出因果推论。`
  };

  return {
    presets: defaultPresets,
    task: defaultTask,
    causality: defaultCausality,
    klausur: defaultKlausur
  };
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
  const [activeTab, setActiveTab] = useState<"workbench" | "causality" | "klausur">("workbench");

  // 获取该实验全套教研档案与考纲标准
  const pedagogy = useMemo(() => getSimPedagogy(sim, de), [sim, de]);

  // 校验当前参数是否达成挑战目标
  const taskAchieved = useMemo(() => {
    const t = pedagogy.task;
    let okA = true;
    let okB = true;
    if (t.targetA) {
      okA = paramA >= t.targetA[0] && paramA <= t.targetA[1];
    }
    if (t.targetB) {
      okB = paramB >= t.targetB[0] && paramB <= t.targetB[1];
    }
    return okA && okB;
  }, [pedagogy, paramA, paramB]);

  // 步进调节控制
  const handleStepA = (delta: number) => {
    setParamA((prev) => Math.max(0, Math.min(100, prev + delta)));
  };

  const handleStepB = (delta: number) => {
    setParamB((prev) => Math.max(0, Math.min(100, prev + delta)));
  };

  // 应用预设工况
  const handleApplyPreset = (p: SimPreset) => {
    setParamA(p.paramA);
    setParamB(p.paramB);
  };
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
        const nSamen = Math.round(16 + (paramA / 100) * 984);
        const rRate = +((paramB / 100) * 50).toFixed(1); // 0% - 50%
        const isLinked = Number(rRate) < 45;
        return {
          archetype: "genetik",
          paramALabelDE: "Stichprobengröße F2 (Individuen)",
          paramALabelZH: "F2 代杂交植株样本容量",
          paramAValueDisplay: `${nSamen} Samen`,
          paramBLabelDE: "Rekombinationsfrequenz r (Kopplung)",
          paramBLabelZH: "重组交换率 r (基因连锁程度)",
          paramBValueDisplay: Number(rRate) >= 49 ? "50.0 % (frei kombiniert)" : `${rRate} % (gekoppelt)`,
          rateLabelDE: isLinked ? "Gekoppelte Vererbung (Morgan)" : "Mendel-Spaltungsverhältnis",
          rateLabelZH: isLinked ? "摩尔根连锁遗传分离" : "孟德尔经典表型分离比",
          rateValue: isLinked ? `Kopplung (r=${rRate}%)` : "9 : 3 : 3 : 1",
          subLabelDE: "Phänotypen-Verteilung",
          subLabelZH: "双杂交表型分布 (黄色/圆粒等)",
          subValue: isLinked ? `Elterlich dominiert (r=${rRate}%)` : "56.25% : 18.75% : 18.75% : 6.25%",
          graphY: Math.round(Number(rRate) * 2),
          insightDE: isLinked
            ? `Genkopplung: Liegen zwei Gene auf demselben Chromosom, entstehen Rekombinanten nur durch Crossing-Over in der Prophase I (Austauschwert r = ${rRate}%).`
            : "3. Mendelsche Regel: Zwei Merkmalspaare auf verschiedenen Chromosomen werden unabhängig voneinander nach dem Gesetz der Neukombination vererbt.",
          insightZH: isLinked
            ? `摩尔根连锁互换定律：两对等位基因位于同一对同源染色体上，仅减数第一次分裂前期非姐妹染色单体交叉互换产生重组配子（重组率 r = ${rRate}%）。`
            : "孟德尔自由组合定律：位于非同源染色体上的两对等位基因彼此独立分离、自由组合，形成 16 种基因型组合与 9:3:3:1 经典表型比。",
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
        const nTrapeze = Math.round(2 + (paramA / 100) * 30);
        const b = +(1.0 + (paramB / 100) * 3.0).toFixed(1); // 1.0 to 4.0
        const exakt = +(Math.pow(Number(b), 3) / 3).toFixed(3);
        const riemann = +(exakt * (1 - 1 / (nTrapeze * 1.5))).toFixed(3);
        const fehler = +Math.abs(exakt - riemann).toFixed(3);
        return {
          archetype: "integral",
          paramALabelDE: "Anzahl Streifen n (Zerlegung)",
          paramALabelZH: "微元区间分割数 n (黎曼矩形)",
          paramAValueDisplay: `n = ${nTrapeze}`,
          paramBLabelDE: "Integrationsgrenze b",
          paramBLabelZH: "积分区间上限 b",
          paramBValueDisplay: `b = ${b}`,
          rateLabelDE: "Riemannsche Untersumme",
          rateLabelZH: "黎曼和近似计算面积",
          rateValue: `${riemann} FE`,
          subLabelDE: `Exakter Grenzwert ∫₀ᵇ x² dx`,
          subLabelZH: "理论精确真值与绝对误差",
          subValue: `${exakt} FE (Δ = ${fehler})`,
          graphY: Math.min(100, Math.round((riemann / 22) * 100)),
          insightDE: `Bei n = ${nTrapeze} Streifen auf [0; ${b}] konvergieren Ober- und Untersumme gegen den exakten Flächeninhalt F(${b})-F(0) = ${exakt} FE.`,
          insightZH: `分割数 n = ${nTrapeze} 在 [0, ${b}] 区间上，阶梯矩形和极限逼近牛顿-莱布尼茨公式真值 F(${b})-F(0) = ${exakt} FE，微元误差迅速收敛！`,
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
        // Steuerprogression (paramA) dämpft Spitzen, Bürgergeld/Grundsicherung (paramB) sichert die untersten 20% ab
        const taxReduktion = (paramA / 100) * 0.12;
        const buergergeldReduktion = (paramB / 100) * 0.08;
        const transferReduktion = +(taxReduktion + buergergeldReduktion).toFixed(2);
        const sekGini = +(primGini - transferReduktion).toFixed(2);
        return {
          archetype: "sozialstaat",
          paramALabelDE: "Steuerprogression & Spitzensteuersatz",
          paramALabelZH: "累进所得税与高收入调节力度",
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
          insightDE: "Sozialstaatsgebot Art. 20 Abs. 1 GG: Das System aus progressiver Einkommensteuer und Bürgergeld senkt den deutschen Gini von 0,48 auf unter 0,30.",
          insightZH: "德国基本法第20条第1款社会国原则：通过累进所得税（平抑高收入）配合公民保障金Bürgergeld（托底低收入），使初次分配基尼系数（0.48）降至二次净收入（0.28-0.31）。",
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

      // 默认回退（针对未单独硬编码的实验室，提供与学科主题深度绑定的测量台）
      default: {
        const topicZH = sim.themenZH || sim.titleZH || "实验参数";
        const topicDE = sim.themenDE || sim.titleDE || "Experiment";
        return {
          archetype: "instrument",
          paramALabelDE: `${topicDE} (Primärfaktor)`,
          paramALabelZH: `${topicZH} · 核心调控参量`,
          paramAValueDisplay: `${paramA} %`,
          paramBLabelDE: `${topicDE} (Kopplungsgrad)`,
          paramBLabelZH: `${topicZH} · 耦合阻尼约束`,
          paramBValueDisplay: `${paramB} %`,
          rateLabelDE: "System-Reaktionswert",
          rateLabelZH: "动态系统输出测定值",
          rateValue: `${+(paramA * 0.1).toFixed(2)}`,
          subLabelDE: "Stationäre Stabilität",
          subLabelZH: "稳态系统响应比率",
          subValue: `${paramB} %`,
          graphY: paramA,
          insightDE: `Interaktive Untersuchung zu ${topicDE}: Systemparameter im Gleichgewicht. Konsistente Verhaltensdynamik.`,
          insightZH: `正在进行【${topicZH}】实验测定：参量在有效物理量程内运行，可观测动态定量演进规律。`,
        };
      }
    }
  }, [sim.id, sim.themenZH, sim.themenDE, sim.titleZH, sim.titleDE, paramA, paramB, de]);

  const renderArchetypeCanvas = () => {
    switch (data.archetype) {
      // 1. 哲学：李贝特实验脑电与自由意志
      case "libet": {
        const spotAngle = ((Date.now() / 2560) * 360) % 360;
        const bpX = 80 + (paramA / 100) * 80;
        const wX = 220 + (paramB / 100) * 60;
        return (
          <div className="flex flex-col gap-3 w-full py-2">
            <svg className="w-full h-64 sm:h-72 rounded bg-[var(--paper-subtle)]/40 border border-[var(--line)]/50" viewBox="0 0 440 200">
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
          <svg className="w-full h-64 sm:h-72 rounded bg-[var(--paper-subtle)]/40 border border-[var(--line)]/50" viewBox="0 0 440 200">
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

      // 3. 化学：丹尼尔原电池与盐桥 (Galvanische Zelle)
      case "galvanisch": {
        const cZn = +((paramA / 50) + 0.01).toFixed(2);
        const cCu = +((paramB / 50) + 0.01).toFixed(2);
        // Ion count in beakers
        const znIonCount = Math.min(10, Math.max(2, Math.round(cZn * 4)));
        const cuIonCount = Math.min(10, Math.max(2, Math.round(cCu * 4)));
        // Voltage and current flow direction
        const deltaE = +(1.10 + 0.0295 * Math.log10(cCu / cZn)).toFixed(3);

        return (
          <svg className="w-full h-64 sm:h-72 rounded bg-[var(--paper-subtle)]/40 border border-[var(--line)]/50" viewBox="0 0 440 200">
            {/* Left beaker: Zn / ZnSO4 */}
            <rect x="45" y="70" width="115" height="95" rx="4" fill="#e2e8f0" stroke="var(--ink)" strokeWidth="1.6" />
            <rect x="47" y="90" width="111" height="73" fill="#cbd5e1" fillOpacity={0.25 + (cZn / 2) * 0.45} />
            <rect x="75" y="50" width="22" height="100" fill="#94a3b8" stroke="var(--ink)" strokeWidth="1.2" />
            <text x="86" y="42" textAnchor="middle" fontSize="9" fontWeight="bold" fill="var(--ink)" fontFamily="monospace">
              Zn Anode (-)
            </text>
            {/* Dynamic Zn2+ ions in beaker */}
            {Array.from({ length: znIonCount }).map((_, i) => (
              <text key={i} x={55 + (i % 3) * 30} y={105 + Math.floor(i / 3) * 16} fontSize="7" fill="#475569" fontFamily="monospace">
                Zn²⁺
              </text>
            ))}

            {/* Right beaker: Cu / CuSO4 */}
            <rect x="280" y="70" width="115" height="95" rx="4" fill="#e2e8f0" stroke="var(--ink)" strokeWidth="1.6" />
            <rect x="282" y="90" width="111" height="73" fill="#0284c7" fillOpacity={0.15 + (cCu / 2) * 0.65} />
            <rect x="343" y="50" width={18 + Math.min(10, cCu * 3)} height="100" fill="#b45309" stroke="var(--ink)" strokeWidth="1.2" />
            <text x="352" y="42" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#b45309" fontFamily="monospace">
              Cu Kathode (+)
            </text>
            {/* Dynamic Cu2+ ions in beaker */}
            {Array.from({ length: cuIonCount }).map((_, i) => (
              <text key={i} x={290 + (i % 3) * 26} y={105 + Math.floor(i / 3) * 16} fontSize="7" fill="#0284c7" fontWeight="bold" fontFamily="monospace">
                Cu²⁺
              </text>
            ))}

            {/* U-tube Salt Bridge KNO3 */}
            <path d="M 135 110 L 135 65 L 305 65 L 305 110" fill="none" stroke="#f1f5f9" strokeWidth="16" />
            <path d="M 135 110 L 135 65 L 305 65 L 305 110" fill="none" stroke="var(--ink)" strokeWidth="1.6" />
            <text x="220" y="60" textAnchor="middle" fontSize="8" fill="var(--gray)" fontFamily="monospace">KNO₃-Salzbrücke</text>

            {/* External Wire Circuit with Voltmeter */}
            <path d="M 86 50 L 86 22 L 195 22 M 245 22 L 352 22 L 352 50" fill="none" stroke="var(--ink)" strokeWidth="1.8" />
            {/* Moving electron indicators */}
            <circle cx={130} cy={22} r="2.5" fill="#dc2626" />
            <text x={130} y={15} textAnchor="middle" fontSize="7" fill="#dc2626" fontFamily="monospace">e⁻ →</text>
            <circle cx={310} cy={22} r="2.5" fill="#dc2626" />
            <text x={310} y={15} textAnchor="middle" fontSize="7" fill="#dc2626" fontFamily="monospace">→ e⁻</text>

            {/* Voltmeter Dial Badge */}
            <rect x="195" y="8" width="50" height="28" rx="4" fill="var(--surface)" stroke="var(--ink)" strokeWidth="1.5" />
            <text x="220" y="22" textAnchor="middle" fontSize="8" fill="var(--gray)" fontFamily="monospace">U_Zell</text>
            <text x="220" y="33" textAnchor="middle" fontSize="9" fontWeight="bold" fill="var(--accent)" fontFamily="monospace">
              {deltaE} V
            </text>

            {/* Bottom info readout */}
            <text x="102" y="180" textAnchor="middle" fontSize="8" fill="var(--ink)" fontFamily="monospace">
              [Zn²⁺] = {cZn} M
            </text>
            <text x="337" y="180" textAnchor="middle" fontSize="8" fill="var(--ink)" fontFamily="monospace">
              [Cu²⁺] = {cCu} M
            </text>
          </svg>
        );
      }

      // 4. 化学：法拉第电解与铜沉积 (Elektrolyse)
      case "elektrolyse": {
        const strom = 1 + (paramA / 100) * 9; // 1 to 10 A
        const zeit = 10 + (paramB / 100) * 110; // 10 to 120 min
        const mCu = (63.55 * strom * (zeit * 60)) / (2 * 96485); // mass in g
        const depositW = Math.min(22, 4 + (mCu / 15) * 18); // copper layer thickness
        const bubbleSpeedCount = Math.min(8, Math.max(2, Math.round(strom * 0.8)));

        return (
          <svg className="w-full h-64 sm:h-72 rounded bg-[var(--paper-subtle)]/40 border border-[var(--line)]/50" viewBox="0 0 440 200">
            {/* Power Source */}
            <rect x="190" y="10" width="60" height="32" rx="4" fill="#1e293b" />
            <text x="220" y="24" textAnchor="middle" fontSize="8" fill="#38bdf8" fontFamily="monospace">DC-Netzgerät</text>
            <text x="220" y="36" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#f8fafc" fontFamily="monospace">
              I = {strom.toFixed(1)} A
            </text>

            {/* Electrolyte Tank */}
            <rect x="90" y="62" width="260" height="122" rx="6" fill="#0284c7" fillOpacity="0.22" stroke="var(--ink)" strokeWidth="2" />
            <text x="220" y="176" textAnchor="middle" fontSize="8" fill="var(--gray)" fontFamily="monospace">
              CuSO₄ Elektrolytlösung (aq) | t = {Math.round(zeit)} min
            </text>

            {/* Anode (Graphite / Pt) (+) */}
            <path d="M 200 42 L 145 42 L 145 70" fill="none" stroke="var(--ink)" strokeWidth="1.8" />
            <rect x="135" y="70" width="18" height="85" fill="#334155" stroke="var(--ink)" strokeWidth="1.2" />
            <text x="144" y="65" textAnchor="middle" fontSize="8" fontWeight="bold" fill="var(--ink)" fontFamily="monospace">Anode (+)</text>
            <text x="144" y="140" textAnchor="middle" fontSize="7" fill="white" fontFamily="monospace">2H₂O→O₂</text>
            {/* Dynamic Oxygen Bubbles */}
            {Array.from({ length: bubbleSpeedCount }).map((_, i) => (
              <circle key={i} cx={140 + (i % 2) * 8} cy={135 - i * 11} r="2.5" fill="none" stroke="#38bdf8" strokeWidth="1.4" />
            ))}

            {/* Kathode (Copper Plate) (-) */}
            <path d="M 240 42 L 295 42 L 295 70" fill="none" stroke="var(--ink)" strokeWidth="1.8" />
            <rect x="285" y="70" width="18" height="85" fill="#b45309" stroke="var(--ink)" strokeWidth="1.2" />
            {/* Growing Copper Deposit Layer */}
            <rect x={285 - depositW} y="75" width={depositW} height="75" fill="#ea580c" rx="1.5" stroke="#c2410c" strokeWidth="0.8" />
            <text x="294" y="65" textAnchor="middle" fontSize="8" fontWeight="bold" fill="var(--ink)" fontFamily="monospace">Kathode (-)</text>
            <text x="294" y="140" textAnchor="middle" fontSize="7" fill="white" fontFamily="monospace">Cu²⁺→Cu</text>

            {/* Faraday Result Badge */}
            <rect x="330" y="30" width="95" height="55" rx="3" fill="var(--surface)" stroke="var(--line)" />
            <text x="377" y="46" textAnchor="middle" fontSize="8" fill="var(--gray)" fontFamily="monospace">m(Cu) Abscheidung</text>
            <text x="377" y="64" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#ea580c" fontFamily="monospace">
              {mCu.toFixed(3)} g
            </text>
            <text x="377" y="77" textAnchor="middle" fontSize="7" fill="var(--ink)" fontFamily="monospace">
              Q = {Math.round(strom * zeit * 60)} C
            </text>
          </svg>
        );
      }

      // 5. 化学：缓冲溶液滴定曲线 (Puffer)
      case "puffer": {
        const verhaeltnis = Math.pow(10, (paramA - 50) / 25);
        const pks = 4.75;
        const ph = pks + Math.log10(verhaeltnis);
        const bufferCap = 0.05 + (paramB / 100) * 0.95; // 0.05 to 1.0 mol/L

        // Curve mapping: pH 0 to 14 maps to Y = 170 down to 25
        const mapPhToY = (val: number) => 170 - (val / 14) * 145;
        const currentY = mapPhToY(ph);
        const currentX = 60 + (paramA / 100) * 300;

        // Henderson-Hasselbalch titration curve path
        const curvePoints: string[] = [];
        for (let i = 0; i <= 50; i++) {
          const ratio = Math.pow(10, ((i / 50) * 100 - 50) / 25);
          const valPh = Math.max(1, Math.min(13, pks + Math.log10(ratio)));
          const sx = 60 + (i / 50) * 300;
          const sy = mapPhToY(valPh);
          curvePoints.push(`${i === 0 ? "M" : "L"} ${sx.toFixed(1)} ${sy.toFixed(1)}`);
        }
        const titrationPath = curvePoints.join(" ");

        // Buffer plateau band (pKs +/- 1 => pH 3.75 to 5.75)
        const yTopBuffer = mapPhToY(5.75);
        const yBtmBuffer = mapPhToY(3.75);

        return (
          <svg className="w-full h-64 sm:h-72 rounded bg-[var(--paper-subtle)]/40 border border-[var(--line)]/50" viewBox="0 0 440 200">
            {/* Coordinate Grid */}
            <line x1="50" y1="170" x2="390" y2="170" stroke="var(--ink)" strokeWidth="1.5" />
            <line x1="50" y1="20" x2="50" y2="170" stroke="var(--ink)" strokeWidth="1.5" />
            <text x="42" y="30" textAnchor="end" fontSize="8" fill="var(--gray)" fontFamily="monospace">pH 14</text>
            <text x="42" y={mapPhToY(7)} textAnchor="end" fontSize="8" fill="var(--gray)" fontFamily="monospace">pH 7</text>
            <text x="42" y="168" textAnchor="end" fontSize="8" fill="var(--gray)" fontFamily="monospace">pH 0</text>
            <text x="390" y="185" textAnchor="end" fontSize="8" fill="var(--gray)" fontFamily="monospace">[Ac⁻] / [HAc] →</text>

            {/* Buffer zone highlight [pH 3.75 ; 5.75] */}
            <rect x="50" y={yTopBuffer} width="340" height={yBtmBuffer - yTopBuffer} fill="#22c55e" fillOpacity={0.08 + bufferCap * 0.1} />
            <line x1="50" y1={mapPhToY(pks)} x2="390" y2={mapPhToY(pks)} stroke="#16a34a" strokeWidth="1" strokeDasharray="3,3" />
            <text x="210" y={mapPhToY(pks) - 4} textAnchor="middle" fontSize="8" fill="#16a34a" fontWeight="bold" fontFamily="monospace">
              pKs = 4.75 (Pufferoptimum)
            </text>

            {/* Titration Path */}
            <path d={titrationPath} fill="none" stroke="var(--accent)" strokeWidth="2.5" />

            {/* Current Probe Point */}
            <circle cx={currentX} cy={currentY} r="5.5" fill="var(--accent)" stroke="var(--paper)" strokeWidth="2" />
            <line x1={currentX} y1={currentY} x2={currentX} y2="170" stroke="var(--accent)" strokeWidth="1" strokeDasharray="2,2" strokeOpacity="0.5" />

            {/* Dynamic Sensor Badge */}
            <rect x="275" y="25" width="130" height="48" rx="3" fill="var(--surface)" stroke="var(--line)" />
            <text x="283" y="40" fontSize="8" fill="var(--gray)" fontFamily="monospace">pH-Messsonde (Glaselektrode)</text>
            <text x="283" y="55" fontSize="11" fontWeight="bold" fill="var(--ink)" fontFamily="monospace">
              pH = {ph.toFixed(2)}
            </text>
            <text x="283" y="66" fontSize="7" fill="#16a34a" fontFamily="monospace">
              Kapazität c={bufferCap.toFixed(2)} M
            </text>
          </svg>
        );
      }

      // 6. 化学：亲核取代反应能量图 (SN1 vs SN2)
      case "sn1sn2": {
        const isSN1 = paramA > 50;
        const isProtisch = paramB > 50;

        // SN1: two-step curve with carbocation intermediate minimum
        // SN2: single-step concerted peak (Walden inversion)
        return (
          <svg className="w-full h-64 sm:h-72 rounded bg-[var(--paper-subtle)]/40 border border-[var(--line)]/50" viewBox="0 0 440 200">
            {/* Axes */}
            <line x1="50" y1="170" x2="390" y2="170" stroke="var(--ink)" strokeWidth="1.5" />
            <line x1="50" y1="20" x2="50" y2="170" stroke="var(--ink)" strokeWidth="1.5" />
            <text x="45" y="30" textAnchor="end" fontSize="8" fill="var(--gray)" fontFamily="monospace">ΔG</text>
            <text x="390" y="185" textAnchor="end" fontSize="8" fill="var(--gray)" fontFamily="monospace">Reaktionskoordinate →</text>

            {isSN1 ? (
              <g>
                {/* Two peaks for SN1 */}
                <path
                  d="M 60 140 Q 110 35 150 45 Q 185 55 210 90 Q 235 55 270 65 Q 310 85 375 145"
                  fill="none"
                  stroke="var(--accent)"
                  strokeWidth="2.5"
                />
                {/* Peak 1: TS1 (C-X cleavage) */}
                <circle cx="150" cy="45" r="4" fill="#dc2626" />
                <text x="150" y="37" textAnchor="middle" fontSize="7" fill="#dc2626" fontFamily="monospace">ÜG 1 [R···X]‡</text>

                {/* Valley: Planar Carbokation Intermediat */}
                <circle cx="210" cy="90" r="4.5" fill="#f59e0b" />
                <text x="210" y="104" textAnchor="middle" fontSize="7" fontWeight="bold" fill="#b45309" fontFamily="monospace">
                  C⁺ (planar)
                </text>

                {/* Peak 2: TS2 (Nu- attack) */}
                <circle cx="270" cy="65" r="4" fill="#dc2626" />
                <text x="270" y="57" textAnchor="middle" fontSize="7" fill="#dc2626" fontFamily="monospace">ÜG 2 [Nu···C]‡</text>

                {/* Stereochemistry Annotation */}
                <text x="375" y="135" textAnchor="end" fontSize="8" fill="#16a34a" fontWeight="bold" fontFamily="monospace">
                  50:50 Racemisierung
                </text>
              </g>
            ) : (
              <g>
                {/* Single peak for SN2 */}
                <path
                  d="M 60 140 Q 190 25 220 30 Q 250 35 375 145"
                  fill="none"
                  stroke="#0284c7"
                  strokeWidth="2.5"
                />
                {/* Single TS: Trigonal bipyramidal pentacoordinate */}
                <circle cx="220" cy="30" r="5" fill="#0284c7" />
                <text x="220" y="22" textAnchor="middle" fontSize="8" fontWeight="bold" fill="#0284c7" fontFamily="monospace">
                  ÜG [Nu···C···X]‡ (5-fach koordiniert)
                </text>

                {/* Stereochemistry Annotation */}
                <text x="375" y="135" textAnchor="end" fontSize="8" fill="#0284c7" fontWeight="bold" fontFamily="monospace">
                  Walden-Inversion (100%)
                </text>
              </g>
            )}

            {/* Readout badge */}
            <rect x="275" y="32" width="135" height="42" rx="3" fill="var(--surface)" stroke="var(--line)" />
            <text x="283" y="47" fontSize="9" fontWeight="bold" fill="var(--ink)" fontFamily="monospace">
              {isSN1 ? "S_N1: Tertiär (3°)" : "S_N2: Primär (1°)"}
            </text>
            <text x="283" y="61" fontSize="7" fill="var(--gray)" fontFamily="monospace">
              Lösungsmittel: {isProtisch ? "Polar protisch" : "Polar aprotisch"}
            </text>
          </svg>
        );
      }

      // 7. 化学：聚合反应链增长 (Polymerisation)
      case "polymerisation": {
        // paramA controls conversion % (chain length), paramB controls initiator concentration
        const monomerConversion = paramA; // 0 to 100%
        // High initiator => more radicals but shorter individual chains!
        const visibleUnits = Math.min(10, Math.max(1, Math.round((monomerConversion / 100) * 10)));
        const dpVal = Math.round(100 + paramA * 50);

        return (
          <svg className="w-full h-64 sm:h-72 rounded bg-[var(--paper-subtle)]/40 border border-[var(--line)]/50" viewBox="0 0 440 200">
            <text x="220" y="30" textAnchor="middle" fontSize="10" fill="var(--ink)" fontWeight="bold" fontFamily="monospace">
              Radikalkettenpolymerisation: [ - CH₂ - CH(R) - ]ₙ
            </text>

            {/* Initiator Radical */}
            <circle cx="50" cy="100" r="13" fill="#ef4444" />
            <text x="50" y="104" textAnchor="middle" fontSize="9" fill="white" fontWeight="bold" fontFamily="monospace">R•</text>

            {/* Growing Monomer Chain Units */}
            {Array.from({ length: visibleUnits }).map((_, i) => (
              <g key={i}>
                <line x1={63 + i * 32} y1="100" x2={78 + i * 32} y2="100" stroke="var(--ink)" strokeWidth="2.5" />
                <rect x={78 + i * 32} y="85" width="24" height="30" rx="3" fill="#0284c7" fillOpacity="0.85" />
                <text x={90 + i * 32} y="103" textAnchor="middle" fontSize="8" fill="white" fontWeight="bold" fontFamily="monospace">
                  M
                </text>
              </g>
            ))}

            {/* Active chain end radical */}
            <line x1={63 + visibleUnits * 32} y1="100" x2={78 + visibleUnits * 32} y2="100" stroke="var(--ink)" strokeWidth="2.5" strokeDasharray="2,2" />
            <circle cx={85 + visibleUnits * 32} cy="100" r="5" fill="#ef4444" />
            <text x={85 + visibleUnits * 32} y="88" textAnchor="middle" fontSize="8" fill="#ef4444" fontWeight="bold" fontFamily="monospace">
              • (aktiv)
            </text>

            {/* Stats Card */}
            <rect x="130" y="145" width="180" height="42" rx="3" fill="var(--surface)" stroke="var(--line)" />
            <text x="220" y="159" textAnchor="middle" fontSize="8" fill="var(--gray)" fontFamily="monospace">
              Polymerisationsgrad P_n = {dpVal}
            </text>
            <text x="220" y="174" textAnchor="middle" fontSize="10" fontWeight="bold" fill="var(--accent)" fontFamily="monospace">
              M_n = {(dpVal * 0.104).toFixed(1)} kg/mol
            </text>
          </svg>
        );
      }

      // 8. 化学：配合物深蓝光谱 (Komplexchemie)
      case "komplex": {
        const nh3Amount = paramB * 0.1; // 0 to 10 mL
        const isTetra = paramB > 40;
        const cuConc = +(0.01 + (paramA / 100) * 0.2).toFixed(2);

        // Cuvette liquid color transitions from light cyan to royal dark navy blue
        const cuvetteBlue = isTetra ? "#1e3a8a" : "#38bdf8";
        const cuvetteOpacity = 0.3 + (paramA / 100) * 0.4 + (paramB / 100) * 0.3;

        // Absorbance spectrum peak shifts bathochromically from 800nm (cyan) to 610nm (deep blue)
        const peakX = isTetra ? 285 : 345;
        const peakH = 40 + (paramA / 100) * 45;

        return (
          <svg className="w-full h-64 sm:h-72 rounded bg-[var(--paper-subtle)]/40 border border-[var(--line)]/50" viewBox="0 0 440 200">
            {/* Photometer Cuvette */}
            <rect x="55" y="40" width="85" height="120" rx="4" fill="var(--paper-subtle)" stroke="var(--ink)" strokeWidth="1.8" />
            <rect x="57" y="60" width="81" height="98" fill={cuvetteBlue} fillOpacity={Math.min(0.95, cuvetteOpacity)} />
            <text x="97" y="175" textAnchor="middle" fontSize="8" fill="var(--gray)" fontFamily="monospace">
              Photometer-Küvette
            </text>
            <text x="97" y="110" textAnchor="middle" fontSize="9" fontWeight="bold" fill="white" fontFamily="monospace">
              {isTetra ? "[Cu(NH₃)₄]²⁺" : "[Cu(H₂O)₆]²⁺"}
            </text>

            {/* Spectrophotometer Absorption Spectrum */}
            <rect x="180" y="35" width="220" height="130" rx="4" fill="var(--surface)" stroke="var(--line)" />
            <line x1="205" y1="140" x2="380" y2="140" stroke="var(--ink)" strokeWidth="1" />
            <line x1="205" y1="45" x2="205" y2="140" stroke="var(--ink)" strokeWidth="1" />
            <text x="205" y="42" fontSize="7" fill="var(--gray)" fontFamily="monospace">Extinktion E</text>
            <text x="380" y="152" fontSize="7" fill="var(--gray)" fontFamily="monospace">λ (nm)</text>

            {/* Dynamic Absorption Peak Curve */}
            <path
              d={`M 215 138 Q ${peakX - 35} 135 ${peakX} ${140 - peakH} Q ${peakX + 35} 135 375 138`}
              fill="none"
              stroke={cuvetteBlue}
              strokeWidth="2.5"
            />
            <circle cx={peakX} cy={140 - peakH} r="4" fill="#dc2626" />
            <text x={peakX} y={130 - peakH} textAnchor="middle" fontSize="8" fontWeight="bold" fill="#dc2626" fontFamily="monospace">
              λmax = {isTetra ? "610 nm" : "800 nm"}
            </text>

            {/* Cuvette details badge */}
            <text x="290" y="160" textAnchor="middle" fontSize="8" fill="var(--ink)" fontFamily="monospace">
              NH₃: {nh3Amount.toFixed(1)} mL | [Cu²⁺]: {cuConc} M
            </text>
          </svg>
        );
      }

      // 9. 生物：细胞呼吸线粒体 (Zellatmung)
      case "zellatmung": {
        const atpVal = Math.min(32, Math.round((paramA / 100) * (paramB / 100) * 32));
        const pO2 = paramA;
        const glucose = paramB;
        // Proton gradient across inner membrane (H+ dots)
        const protonCount = Math.max(3, Math.round((atpVal / 32) * 16));
        const atpProducedCount = Math.max(1, Math.round((atpVal / 32) * 12));

        return (
          <svg className="w-full h-64 sm:h-72 rounded bg-[var(--paper-subtle)]/40 border border-[var(--line)]/50" viewBox="0 0 440 200">
            {/* Outer Membrane */}
            <ellipse cx="220" cy="100" rx="195" ry="85" fill="none" stroke="var(--ink)" strokeWidth="1.8" />
            <text x="55" y="45" fontSize="7" fill="var(--gray)" fontFamily="monospace">Äußere Membran</text>

            {/* Inner Membrane with Cristae Folds */}
            <path
              d="M 55 100 C 70 45, 105 45, 125 85 C 145 125, 175 60, 205 95 C 235 130, 265 50, 295 90 C 325 130, 365 70, 385 100 C 365 135, 325 135, 295 110 C 265 85, 235 145, 205 110 C 175 75, 145 145, 125 110 C 105 75, 70 145, 55 100 Z"
              fill="#fed7aa"
              fillOpacity={0.25 + (atpVal / 32) * 0.4}
              stroke="#ea580c"
              strokeWidth="2"
            />
            <text x="220" y="58" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#9a3412" fontFamily="monospace">
              Mitochondrien-Matrix (Citratzyklus)
            </text>

            {/* Dynamic H+ protons in intermembrane space */}
            {Array.from({ length: protonCount }).map((_, i) => (
              <text key={i} x={75 + (i * 22) % 300} y={32 + (i % 2) * 12} fontSize="7" fill="#dc2626" fontWeight="bold" fontFamily="monospace">
                H⁺
              </text>
            ))}

            {/* ATP-Synthase Complex */}
            <circle cx="220" cy="105" r="14" fill="#facc15" stroke="var(--ink)" strokeWidth="1.5" />
            <rect x="216" y="90" width="8" height="15" fill="#ca8a04" />
            <text x="220" y="108" textAnchor="middle" fontSize="7" fontWeight="bold" fill="#78350f" fontFamily="monospace">ATP-Syn</text>

            {/* Output ATP particles */}
            {Array.from({ length: atpProducedCount }).map((_, i) => (
              <text key={i} x={155 + (i % 4) * 35} y={135 + Math.floor(i / 4) * 14} fontSize="8" fill="#16a34a" fontWeight="bold" fontFamily="monospace">
                ATP
              </text>
            ))}

            {/* Readout Badge */}
            <rect x="285" y="145" width="140" height="42" rx="3" fill="var(--surface)" stroke="var(--line)" />
            <text x="355" y="159" textAnchor="middle" fontSize="8" fill="var(--gray)" fontFamily="monospace">
              pO₂: {pO2}% | Glu: {glucose} mM
            </text>
            <text x="355" y="176" textAnchor="middle" fontSize="10" fontWeight="bold" fill="var(--accent)" fontFamily="monospace">
              {data.rateValue} ({data.subValue})
            </text>
          </svg>
        );
      }

      // 10. 生物：米氏酶动力学 (Enzymkinetik)
      case "enzym": {
        const sVal = 0.1 + (paramA / 100) * 9.9; // 0.1 to 10.0 mmol/L
        const vmax = 100;
        const isComp = paramB > 50;
        const km = isComp ? 2.5 + ((paramB - 50) / 50) * 5.0 : 2.5;
        const vVal = (vmax * sVal) / (km + sVal);

        // SVG mappings: [S] in [0, 10] -> X in [60, 390], v in [0, 110] -> Y in [165, 35]
        const mapX = (s: number) => 60 + (s / 10) * 330;
        const mapY = (v: number) => 165 - (v / 110) * 130;

        // Path for baseline without inhibitor (Km = 2.5)
        const basePts: string[] = [];
        // Path for actual curve (with potential inhibitor)
        const actualPts: string[] = [];
        for (let i = 0; i <= 40; i++) {
          const s = (i / 40) * 10;
          const vBase = (vmax * s) / (2.5 + s);
          const vAct = (vmax * s) / (km + s);
          basePts.push(`${i === 0 ? "M" : "L"} ${mapX(s).toFixed(1)} ${mapY(vBase).toFixed(1)}`);
          actualPts.push(`${i === 0 ? "M" : "L"} ${mapX(s).toFixed(1)} ${mapY(vAct).toFixed(1)}`);
        }

        const currentSx = mapX(sVal);
        const currentSy = mapY(vVal);

        return (
          <svg className="w-full h-64 sm:h-72 rounded bg-[var(--paper-subtle)]/40 border border-[var(--line)]/50" viewBox="0 0 440 200">
            {/* Coordinate Grid */}
            <line x1="50" y1="165" x2="400" y2="165" stroke="var(--ink)" strokeWidth="1.5" />
            <line x1="60" y1="20" x2="60" y2="165" stroke="var(--ink)" strokeWidth="1.5" />
            <text x="405" y="169" fontSize="9" fill="var(--ink)" fontFamily="monospace">[S]</text>
            <text x="52" y="24" fontSize="9" fill="var(--ink)" fontFamily="monospace">v</text>

            {/* Asymptote vmax */}
            <line x1="60" y1={mapY(vmax)} x2="400" y2={mapY(vmax)} stroke="var(--gray)" strokeWidth="1" strokeDasharray="3,3" />
            <text x="395" y={mapY(vmax) - 4} textAnchor="end" fontSize="8" fill="var(--gray)" fontFamily="monospace">v_max = 100</text>

            {/* Half vmax line */}
            <line x1="60" y1={mapY(vmax / 2)} x2="400" y2={mapY(vmax / 2)} stroke="var(--gray)" strokeWidth="1" strokeDasharray="2,2" strokeOpacity="0.5" />
            <text x="52" y={mapY(vmax / 2) + 3} textAnchor="end" fontSize="8" fill="var(--gray)" fontFamily="monospace">½ v_max</text>

            {/* Reference curve (uninhibited) if inhibitor present */}
            {isComp && (
              <g>
                <path d={basePts.join(" ")} fill="none" stroke="var(--gray)" strokeWidth="1.5" strokeDasharray="3,3" strokeOpacity="0.7" />
                <text x="340" y={mapY((vmax * 8) / (2.5 + 8)) - 6} fontSize="7" fill="var(--gray)" fontFamily="monospace">Ohne Hemmstoff</text>
              </g>
            )}

            {/* Active reaction curve */}
            <path d={actualPts.join(" ")} fill="none" stroke="var(--accent)" strokeWidth="2.5" />

            {/* Current operating point */}
            <circle cx={currentSx} cy={currentSy} r="5" fill="var(--accent)" stroke="var(--paper)" strokeWidth="2" />
            <line x1={currentSx} y1={currentSy} x2={currentSx} y2="165" stroke="var(--accent)" strokeWidth="1" strokeDasharray="2,2" strokeOpacity="0.5" />

            {/* Km marker on axis */}
            <line x1={mapX(km)} y1="162" x2={mapX(km)} y2="168" stroke="#dc2626" strokeWidth="2" />
            <text x={mapX(km)} y="178" textAnchor="middle" fontSize="8" fontWeight="bold" fill="#dc2626" fontFamily="monospace">
              Km={km.toFixed(1)}
            </text>

            {/* Readout Badge */}
            <rect x="75" y="30" width="135" height="46" rx="3" fill="var(--surface)" stroke="var(--line)" />
            <text x="83" y="45" fontSize="9" fontWeight="bold" fill="var(--accent)" fontFamily="monospace">
              v = {vVal.toFixed(1)} μmol/min
            </text>
            <text x="83" y="58" fontSize="8" fill="var(--ink)" fontFamily="monospace">
              [S] = {sVal.toFixed(1)} mM
            </text>
            <text x="83" y="69" fontSize="7" fill={isComp ? "#dc2626" : "var(--gray)"} fontFamily="monospace">
              {isComp ? "● 竞争性抑制生效 (Km ↑)" : "未受抑制 (Km = 2.5)"}
            </text>
          </svg>
        );
      }

      // 12. 生物：化学突触 (Synapse)
      case "synapse": {
        const achAmount = paramA; // 0 to 100% ACh
        const toxinLevel = paramB; // 0 to 100% Curare/Toxin
        const epsp = Math.max(0, +(15 * (achAmount / 100) * (1 - toxinLevel / 100)).toFixed(1));
        const isTriggered = epsp > 10;

        // Number of active ACh neurotransmitter dots in synaptic cleft
        const achDotCount = Math.max(2, Math.round((achAmount / 100) * 14));
        // Blocked receptors count
        const blockedCount = Math.round((toxinLevel / 100) * 5);

        return (
          <svg className="w-full h-64 sm:h-72 rounded bg-[var(--paper-subtle)]/40 border border-[var(--line)]/50" viewBox="0 0 440 200">
            {/* Presynapse Button */}
            <path d="M 40 20 L 40 145 C 90 145, 140 155, 175 155 C 205 155, 215 125, 215 20 Z" fill="#f8fafc" stroke="var(--ink)" strokeWidth="2" />
            <text x="110" y="45" fontSize="10" fill="var(--ink)" fontWeight="bold" fontFamily="monospace">Präsynaptisches Endknöpfchen</text>

            {/* Synaptic Vesicles with ACh */}
            {[
              [90, 80], [130, 95], [110, 125], [155, 128], [175, 105],
            ].map(([cx, cy], i) => (
              <circle key={i} cx={cx} cy={cy} r="8.5" fill="#e0e7ff" stroke="#4f46e5" strokeWidth="1.5" />
            ))}
            <text x="115" y="105" fontSize="7" fill="#4f46e5" fontFamily="monospace">ACh-Vesikel</text>

            {/* Synaptic Cleft with Released ACh molecules */}
            <rect x="215" y="20" width="35" height="160" fill="#f1f5f9" fillOpacity="0.5" />
            {Array.from({ length: achDotCount }).map((_, i) => (
              <circle key={i} cx={222 + (i % 3) * 8} cy={35 + i * 10} r="2.8" fill="#16a34a" />
            ))}

            {/* Postsynapse Membrane with Receptors */}
            <path d="M 250 20 L 250 180 L 410 180 L 410 20 Z" fill="#f8fafc" stroke="var(--ink)" strokeWidth="2" />
            <text x="320" y="45" fontSize="10" fill="var(--ink)" fontWeight="bold" fontFamily="monospace">Postsynaptische Membran</text>

            {/* 5 Nicotinic Receptors along postsynaptic cleft boundary */}
            {Array.from({ length: 5 }).map((_, idx) => {
              const ry = 60 + idx * 22;
              const isBlocked = idx < blockedCount;
              return (
                <g key={idx}>
                  <rect x="247" y={ry - 6} width="8" height="12" rx="2" fill={isBlocked ? "#dc2626" : "#22c55e"} />
                  {isBlocked && (
                    <text x="258" y={ry + 3} fontSize="6" fill="#dc2626" fontFamily="monospace">Curare</text>
                  )}
                </g>
              );
            })}

            {/* Postsynaptic Depolarisation Wave */}
            <path
              d={`M 275 125 Q 330 ${125 - epsp * 4} 390 125`}
              fill="none"
              stroke={isTriggered ? "#16a34a" : "var(--accent)"}
              strokeWidth="2.5"
            />
            <circle cx="330" cy={125 - epsp * 4} r="4.5" fill={isTriggered ? "#16a34a" : "var(--accent)"} />

            {/* EPSP Readout Badge */}
            <rect x="280" y="135" width="125" height="42" rx="3" fill="var(--surface)" stroke="var(--line)" />
            <text x="342" y="150" textAnchor="middle" fontSize="9" fontWeight="bold" fill="var(--ink)" fontFamily="monospace">
              EPSP = +{epsp} mV
            </text>
            <text x="342" y="165" textAnchor="middle" fontSize="7" fontWeight="bold" fill={isTriggered ? "#16a34a" : "#dc2626"} fontFamily="monospace">
              {isTriggered ? "● AP AUSGELÖST (> -50mV)" : "○ Unterschwellig (Kein AP)"}
            </text>
          </svg>
        );
      }

      // 13. 生物：捕食者猎物波动 (Raeuber-Beute)
      case "raeuber-beute": {
        const tCycle = (paramA / 100) * 4 * Math.PI; // time progression
        const capK = 50 + paramB; // carrying capacity K

        // Prey and Predator curves over time window [0, 4*PI]
        const preyPts: string[] = [];
        const predPts: string[] = [];
        for (let i = 0; i <= 60; i++) {
          const t = (i / 60) * 4 * Math.PI;
          const sx = 60 + (i / 60) * 330;
          const preyVal = Math.max(10, 45 + 30 * Math.sin(t) * (capK / 100));
          const predVal = Math.max(8, 28 + 22 * Math.sin(t - Math.PI / 2) * (capK / 100));
          const syPrey = 165 - (preyVal / 90) * 125;
          const syPred = 165 - (predVal / 90) * 125;
          preyPts.push(`${i === 0 ? "M" : "L"} ${sx.toFixed(1)} ${syPrey.toFixed(1)}`);
          predPts.push(`${i === 0 ? "M" : "L"} ${sx.toFixed(1)} ${syPred.toFixed(1)}`);
        }

        const currentPrey = Math.round(45 + 30 * Math.sin(tCycle) * (capK / 100));
        const currentPred = Math.round(28 + 22 * Math.sin(tCycle - Math.PI / 2) * (capK / 100));
        const curX = 60 + (paramA / 100) * 330;
        const curYPrey = 165 - (currentPrey / 90) * 125;
        const curYPred = 165 - (currentPred / 90) * 125;

        return (
          <svg className="w-full h-64 sm:h-72 rounded bg-[var(--paper-subtle)]/40 border border-[var(--line)]/50" viewBox="0 0 440 200">
            {/* Coordinate Grid */}
            <line x1="50" y1="165" x2="400" y2="165" stroke="var(--ink)" strokeWidth="1.5" />
            <line x1="60" y1="20" x2="60" y2="165" stroke="var(--ink)" strokeWidth="1.5" />
            <text x="405" y="169" fontSize="9" fill="var(--ink)" fontFamily="monospace">t</text>
            <text x="52" y="24" fontSize="9" fill="var(--ink)" fontFamily="monospace">N</text>

            {/* Carrying capacity K horizontal dashed line */}
            <line x1="60" y1={165 - (capK / 150) * 125} x2="400" y2={165 - (capK / 150) * 125} stroke="var(--gray)" strokeWidth="1" strokeDasharray="3,3" strokeOpacity="0.6" />
            <text x="395" y={165 - (capK / 150) * 125 - 4} textAnchor="end" fontSize="7" fill="var(--gray)" fontFamily="monospace">
              Kapazität K = {Math.round(capK)}
            </text>

            {/* Prey Curve (Green) */}
            <path d={preyPts.join(" ")} fill="none" stroke="#16a34a" strokeWidth="2.2" />

            {/* Predator Curve (Red Dashed) */}
            <path d={predPts.join(" ")} fill="none" stroke="#dc2626" strokeWidth="2.2" strokeDasharray="4,2" />

            {/* Time Cursor Line */}
            <line x1={curX} y1="25" x2={curX} y2="165" stroke="var(--ink)" strokeWidth="1" strokeDasharray="2,2" strokeOpacity="0.4" />

            {/* Current Prey & Predator Marker Points */}
            <circle cx={curX} cy={curYPrey} r="4.5" fill="#16a34a" />
            <circle cx={curX} cy={curYPred} r="4.5" fill="#dc2626" />

            {/* Legend & Current Densities */}
            <rect x="70" y="26" width="145" height="46" rx="3" fill="var(--surface)" stroke="var(--line)" />
            <text x="78" y="40" fontSize="8" fontWeight="bold" fill="#16a34a" fontFamily="monospace">
              ― Beute: {currentPrey} Ind./ha
            </text>
            <text x="78" y="53" fontSize="8" fontWeight="bold" fill="#dc2626" fontFamily="monospace">
              --- Räuber: {currentPred} Ind./ha
            </text>
            <text x="78" y="64" fontSize="7" fill="var(--gray)" fontFamily="monospace">
              Phasenversatz Δφ = π/2
            </text>
          </svg>
        );
      }

      // 14. 生物：PCR 变温曲线与电泳条带 (PCR)
      case "pcr": {
        const cycles = Math.round(1 + (paramA / 100) * 34); // 1 to 35
        const taq = paramB; // 0 to 100%
        // Band brightness and thickness scales with cycles
        const bandH = Math.min(16, Math.max(1, Math.round((cycles / 35) * 14 * (taq / 100))));
        const bandOpacity = 0.2 + (cycles / 35) * 0.75 * (taq / 100);

        return (
          <svg className="w-full h-64 sm:h-72 rounded bg-[var(--paper-subtle)]/40 border border-[var(--line)]/50" viewBox="0 0 440 200">
            {/* Thermocycler Temperature Profile for 1 representative cycle */}
            <text x="60" y="24" fontSize="9" fontWeight="bold" fill="var(--ink)" fontFamily="monospace">
              Thermocycler-Profil (Zyklus {cycles}/35)
            </text>
            <path d="M 60 145 L 95 45 L 140 45 L 165 125 L 205 125 L 230 85 L 275 85 L 295 145" fill="none" stroke="var(--accent)" strokeWidth="2.5" />
            <text x="117" y="38" textAnchor="middle" fontSize="8" fill="#dc2626" fontWeight="bold" fontFamily="monospace">95°C Denat.</text>
            <text x="185" y="137" textAnchor="middle" fontSize="8" fill="#0284c7" fontWeight="bold" fontFamily="monospace">55°C Anneal</text>
            <text x="252" y="78" textAnchor="middle" fontSize="8" fill="#16a34a" fontWeight="bold" fontFamily="monospace">72°C Elong.</text>

            {/* Agarose Gel Electrophoresis Tank */}
            <rect x="320" y="25" width="95" height="145" rx="4" fill="#0f172a" stroke="var(--ink)" strokeWidth="1.5" />
            <text x="367" y="38" textAnchor="middle" fontSize="8" fill="#94a3b8" fontFamily="monospace">Agarose-Gel</text>

            {/* Well / Tasche */}
            <rect x="340" y="44" width="50" height="5" fill="#334155" />

            {/* DNA Ladder marker bands */}
            <rect x="340" y="65" width="14" height="2" fill="#38bdf8" fillOpacity="0.4" />
            <rect x="340" y="90" width="14" height="2" fill="#38bdf8" fillOpacity="0.4" />
            <rect x="340" y="115" width="14" height="2" fill="#38bdf8" fillOpacity="0.4" />
            <rect x="340" y="140" width="14" height="2" fill="#38bdf8" fillOpacity="0.4" />

            {/* Target PCR Amplicon Band (Sample lane) */}
            <rect
              x="365"
              y={95 - bandH / 2}
              width="22"
              height={bandH}
              fill="#38bdf8"
              fillOpacity={bandOpacity}
              rx="1.5"
            />
            <text x="367" y="160" textAnchor="middle" fontSize="7" fill="#38bdf8" fontFamily="monospace">
              Zielbande (500 bp)
            </text>

            {/* Yield Badge */}
            <rect x="60" y="150" width="220" height="35" rx="3" fill="var(--surface)" stroke="var(--line)" />
            <text x="170" y="164" textAnchor="middle" fontSize="8" fill="var(--gray)" fontFamily="monospace">
              Taq-Aktivität: {taq}% | DNA-Ausbeute:
            </text>
            <text x="170" y="177" textAnchor="middle" fontSize="9" fontWeight="bold" fill="var(--accent)" fontFamily="monospace">
              {data.rateValue}
            </text>
          </svg>
        );
      }

      // 15. 生物：表观遗传核小体松紧 (Epigenetik)
      case "epigenetik": {
        const methyl = paramA; // 0 to 100%
        const acetyl = paramB; // 0 to 100%
        const aktiv = Math.max(0, Math.min(100, Math.round(acetyl * 1.2 - methyl * 0.8)));
        const isEuchromatin = aktiv > 50;

        // Dynamic spacing and radius: open Euchromatin spreads apart (spacing 68px, r=16), closed Heterochromatin condenses (spacing 48px, r=22)
        const spacing = 48 + (aktiv / 100) * 22;
        const nucleosomeR = 24 - (aktiv / 100) * 8;
        const centerX = 220;

        return (
          <svg className="w-full h-64 sm:h-72 rounded bg-[var(--paper-subtle)]/40 border border-[var(--line)]/50" viewBox="0 0 440 200">
            <text x="220" y="32" textAnchor="middle" fontSize="10" fontWeight="bold" fill={isEuchromatin ? "#16a34a" : "#dc2626"} fontFamily="monospace">
              {isEuchromatin ? "Euchromatin: Aufgelockert / Transkription aktiv" : "Heterochromatin: Kondensiert / Gen stummgeschaltet"}
            </text>

            {/* 5 Histone Octamer Nucleosomes with DNA wrapping */}
            {[-2, -1, 0, 1, 2].map((idx) => {
              const cx = centerX + idx * spacing;
              const cy = 100;
              return (
                <g key={idx}>
                  {/* Histone octamer core */}
                  <circle cx={cx} cy={cy} r={nucleosomeR} fill="#fde047" stroke="#ca8a04" strokeWidth="2" />
                  <text x={cx} y={cy + 3} textAnchor="middle" fontSize="7" fill="#78350f" fontFamily="monospace">Histon</text>

                  {/* DNA strand wrapping around */}
                  <path
                    d={`M ${cx - nucleosomeR - 4} ${cy} Q ${cx} ${cy - nucleosomeR - 12} ${cx + nucleosomeR + 4} ${cy}`}
                    fill="none"
                    stroke="var(--ink)"
                    strokeWidth="2.2"
                  />

                  {/* Epigenetic tag markers */}
                  {acetyl > 30 && (
                    <circle cx={cx} cy={cy - nucleosomeR - 6} r="3" fill="#16a34a" />
                  )}
                  {methyl > 30 && (
                    <circle cx={cx} cy={cy + nucleosomeR + 6} r="3" fill="#dc2626" />
                  )}
                </g>
              );
            })}

            {/* RNA Polymerase binding if Euchromatin */}
            {isEuchromatin && (
              <g>
                <ellipse cx={centerX} cy="62" rx="18" ry="11" fill="#38bdf8" fillOpacity="0.8" stroke="var(--ink)" strokeWidth="1.5" />
                <text x={centerX} y="65" textAnchor="middle" fontSize="7" fontWeight="bold" fill="#0369a1" fontFamily="monospace">
                  RNA-Pol II
                </text>
              </g>
            )}

            {/* Chemical Tag Legend & Transkriptionsrate */}
            <rect x="70" y="145" width="300" height="42" rx="3" fill="var(--surface)" stroke="var(--line)" />
            <text x="220" y="160" textAnchor="middle" fontSize="8" fill="var(--gray)" fontFamily="monospace">
              Methylierung (CpG): {methyl}% | Acetylierung (H3K9ac): {acetyl}%
            </text>
            <text x="220" y="176" textAnchor="middle" fontSize="10" fontWeight="bold" fill="var(--accent)" fontFamily="monospace">
              Transkriptionsrate: {data.rateValue}
            </text>
          </svg>
        );
      }

      // 16. 生物：温带湖泊温跃层 (See-Ökologie)
      case "see": {
        const seasonVal = paramA; // 0 to 100 (Spring, Summer, Autumn, Winter)
        const eutrophVal = paramB; // 0 to 100%
        const isSummer = seasonVal >= 25 && seasonVal < 50;
        const isWinter = seasonVal >= 75;

        // Profile temperature path:
        // Summer: Epilimnion 20°C -> Metalimnion sharp drop -> Hypolimnion 4°C
        // Spring/Autumn: Homogenous 4-10°C full circulation
        // Winter: Inversion 0°C surface ice -> 4°C bottom
        const tempPath = isSummer
          ? "M 380 35 C 380 65, 320 80, 320 155"
          : isWinter
          ? "M 315 35 C 315 50, 325 80, 325 155"
          : "M 340 35 L 340 155";

        return (
          <svg className="w-full h-64 sm:h-72 rounded bg-[var(--paper-subtle)]/40 border border-[var(--line)]/50" viewBox="0 0 440 200">
            {/* Lake water strata layers */}
            {/* Layer 1: Epilimnion (Surface) */}
            <rect x="50" y="25" width="220" height="45" fill={isSummer ? "#bae6fd" : isWinter ? "#e0f2fe" : "#7dd3fc"} />
            <text x="160" y="50" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#0369a1" fontFamily="monospace">
              {isSummer ? "Epilimnion (~20°C, lichtdurchflutet)" : isWinter ? "Eisdecke (0°C)" : "Deckschicht (Zirkulation)"}
            </text>

            {/* Layer 2: Metalimnion (Sprungschicht) */}
            <rect x="50" y="70" width="220" height="35" fill={isSummer ? "#38bdf8" : "#7dd3fc"} />
            <text x="160" y="92" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#0284c7" fontFamily="monospace">
              {isSummer ? "Metalimnion / Sprungschicht (ΔT=15°C)" : "Homogene Mischung"}
            </text>

            {/* Layer 3: Hypolimnion (Deep water) */}
            <rect
              x="50"
              y="105"
              width="220"
              height="60"
              fill={isSummer && eutrophVal > 50 ? "#334155" : "#0284c7"}
              fillOpacity={isSummer && eutrophVal > 50 ? 0.85 : 0.4}
            />
            <text
              x="160"
              y="140"
              textAnchor="middle"
              fontSize="9"
              fontWeight="bold"
              fill={isSummer && eutrophVal > 50 ? "#f8fafc" : "#0284c7"}
              fontFamily="monospace"
            >
              {isSummer && eutrophVal > 50 ? "Hypolimnion (Anaerob / Faulschlamm 4°C)" : "Hypolimnion (4°C, Dichteanomalie)"}
            </text>

            {/* Temperature Profile Graph Panel */}
            <rect x="290" y="25" width="120" height="140" rx="3" fill="var(--surface)" stroke="var(--line)" />
            <line x1="305" y1="155" x2="395" y2="155" stroke="var(--ink)" strokeWidth="1" />
            <line x1="305" y1="35" x2="305" y2="155" stroke="var(--ink)" strokeWidth="1" />
            <text x="305" y="30" fontSize="7" fill="var(--gray)" fontFamily="monospace">Tiefe (m)</text>
            <text x="395" y="165" fontSize="7" fill="var(--gray)" fontFamily="monospace">T(°C)</text>

            {/* Dynamic Temperature Curve */}
            <path d={tempPath} fill="none" stroke="#ef4444" strokeWidth="2.5" />
            <text x="350" y="55" fontSize="7" fill="#ef4444" fontWeight="bold" fontFamily="monospace">
              T-Profil
            </text>

            {/* Current Season Badge */}
            <text x="160" y="180" textAnchor="middle" fontSize="8" fill="var(--ink)" fontFamily="monospace">
              {data.paramAValueDisplay} | Eutrophierung: {eutrophVal}%
            </text>
          </svg>
        );
      }

      // 17. 数学：黎曼和梯形积分割矩形 (Integral)
      case "integral": {
        const nBars = Math.max(2, Math.min(32, Math.round(2 + (paramA / 100) * 30)));
        const bVal = 1.0 + (paramB / 100) * 3.0; // 1.0 to 4.0
        // coordinate mapping: x from 0 to 4.5 -> SVG X 70 to 390 (width 320, scale = 320 / 4.5 = 71.1)
        const originX = 70;
        const originY = 165;
        const scaleX = 70;
        const scaleY = 135 / 16; // f(4) = 16, height 135
        const bSvgX = originX + bVal * scaleX;
        const dx = bVal / nBars;
        const dxSvg = dx * scaleX;

        // Path for f(x) = x^2
        const curvePoints: string[] = [];
        for (let i = 0; i <= 40; i++) {
          const cx = (i / 40) * 4.2;
          const cy = Math.pow(cx, 2);
          const sx = originX + cx * scaleX;
          const sy = originY - cy * scaleY;
          curvePoints.push(`${i === 0 ? "M" : "L"} ${sx.toFixed(1)} ${sy.toFixed(1)}`);
        }
        const curvePath = curvePoints.join(" ");

        return (
          <svg className="w-full h-64 sm:h-72 rounded bg-[var(--paper-subtle)]/40 border border-[var(--line)]/50" viewBox="0 0 440 200">
            {/* Coordinate grid */}
            <line x1="50" y1={originY} x2="400" y2={originY} stroke="var(--ink)" strokeWidth="1.5" />
            <line x1={originX} y1="15" x2={originX} y2="180" stroke="var(--ink)" strokeWidth="1.5" />
            <text x="405" y={originY + 4} fontSize="9" fill="var(--ink)" fontFamily="monospace">x</text>
            <text x={originX - 5} y="15" textAnchor="end" fontSize="9" fill="var(--ink)" fontFamily="monospace">y</text>

            {/* Riemann lower sum rectangles */}
            {Array.from({ length: nBars }).map((_, i) => {
              const xi = i * dx;
              const barH = Math.pow(xi, 2) * scaleY;
              const bx = originX + i * dxSvg;
              const by = originY - barH;
              return (
                <rect
                  key={i}
                  x={bx}
                  y={by}
                  width={Math.max(1, dxSvg - 0.8)}
                  height={barH}
                  fill="var(--accent)"
                  fillOpacity="0.32"
                  stroke="var(--accent)"
                  strokeWidth="0.8"
                />
              );
            })}

            {/* Continuous curve f(x) = x^2 */}
            <path d={curvePath} fill="none" stroke="var(--ink)" strokeWidth="2.2" />

            {/* Boundary line x = b */}
            <line x1={bSvgX} y1="20" x2={bSvgX} y2={originY} stroke="#dc2626" strokeWidth="1.5" strokeDasharray="3,3" />
            <circle cx={bSvgX} cy={originY - Math.pow(bVal, 2) * scaleY} r="3.5" fill="#dc2626" />
            <text x={bSvgX} y={originY + 14} textAnchor="middle" fontSize="9" fontWeight="bold" fill="#dc2626" fontFamily="monospace">
              b={bVal.toFixed(1)}
            </text>

            {/* Info badge */}
            <rect x="78" y="24" width="130" height="42" rx="3" fill="var(--surface)" stroke="var(--line)" />
            <text x="86" y="39" fontSize="9" fontWeight="bold" fill="var(--ink)" fontFamily="monospace">f(x) = x²</text>
            <text x="86" y="52" fontSize="8" fill="var(--accent)" fontFamily="monospace">{data.rateLabelZH}: {data.rateValue}</text>
            <text x="86" y="62" fontSize="7" fill="var(--gray)" fontFamily="monospace">n={nBars} 阶梯矩形</text>
          </svg>
        );
      }

      // 18. 数学：三次多项式切线 (Kurvendiskussion)
      case "kurvendiskussion": {
        const xVal = (paramA - 50) / 15; // roughly -3.3 to +3.3
        const yVal = Math.pow(xVal, 3) - 3 * xVal;
        const slope = 3 * Math.pow(xVal, 2) - 3;

        // Coordinate center (220, 100). scaleX: 1 unit = 50px, scaleY: 1 unit = 20px
        const cx = 220;
        const cy = 100;
        const scaleX = 48;
        const scaleY = 18;

        const pX = cx + xVal * scaleX;
        const pY = cy - yVal * scaleY;

        // Tangent line segment through (xVal, yVal)
        const tLen = 1.2; // span in x
        const tX1 = cx + (xVal - tLen) * scaleX;
        const tY1 = cy - (yVal - tLen * slope) * scaleY;
        const tX2 = cx + (xVal + tLen) * scaleX;
        const tY2 = cy - (yVal + tLen * slope) * scaleY;

        // Plot f(x) = x^3 - 3x from x = -2.6 to 2.6
        const pathPoints: string[] = [];
        for (let i = 0; i <= 60; i++) {
          const t = -2.6 + (i / 60) * 5.2;
          const ft = Math.pow(t, 3) - 3 * t;
          const sx = cx + t * scaleX;
          const sy = cy - ft * scaleY;
          pathPoints.push(`${i === 0 ? "M" : "L"} ${sx.toFixed(1)} ${sy.toFixed(1)}`);
        }
        const cubicPath = pathPoints.join(" ");

        return (
          <svg className="w-full h-64 sm:h-72 rounded bg-[var(--paper-subtle)]/40 border border-[var(--line)]/50" viewBox="0 0 440 200">
            {/* Axes */}
            <line x1="40" y1={cy} x2="400" y2={cy} stroke="var(--ink)" strokeWidth="1" strokeOpacity="0.4" />
            <line x1={cx} y1="20" x2={cx} y2="180" stroke="var(--ink)" strokeWidth="1" strokeOpacity="0.4" />
            <text x="405" y={cy + 4} fontSize="9" fill="var(--ink)" fontFamily="monospace">x</text>
            <text x={cx + 6} y="22" fontSize="9" fill="var(--ink)" fontFamily="monospace">y</text>

            {/* Static HP(-1, 2) and TP(1, -2) markers */}
            <circle cx={cx - 1 * scaleX} cy={cy - 2 * scaleY} r="3.5" fill="#16a34a" />
            <text x={cx - 1 * scaleX - 6} y={cy - 2 * scaleY - 6} textAnchor="end" fontSize="8" fill="#16a34a" fontFamily="monospace">HP(-1|2)</text>
            <circle cx={cx + 1 * scaleX} cy={cy + 2 * scaleY} r="3.5" fill="#dc2626" />
            <text x={cx + 1 * scaleX + 6} y={cy + 2 * scaleY + 12} fontSize="8" fill="#dc2626" fontFamily="monospace">TP(1|-2)</text>

            {/* Curve */}
            <path d={cubicPath} fill="none" stroke="var(--ink)" strokeWidth="2.2" strokeOpacity="0.8" />

            {/* Dynamic Tangent Line */}
            <line x1={tX1} y1={tY1} x2={tX2} y2={tY2} stroke="var(--accent)" strokeWidth="2.5" />

            {/* Dynamic Point P */}
            <circle cx={pX} cy={pY} r="5" fill="var(--accent)" stroke="var(--paper)" strokeWidth="2" />

            {/* Dynamic Coordinates Box */}
            <rect x="20" y="20" width="135" height="48" rx="3" fill="var(--surface)" stroke="var(--line)" />
            <text x="28" y="35" fontSize="9" fontWeight="bold" fill="var(--ink)" fontFamily="monospace">
              P({xVal.toFixed(1)} | {yVal.toFixed(2)})
            </text>
            <text x="28" y="49" fontSize="8" fill="var(--accent)" fontFamily="monospace">
              Tangente m = {slope.toFixed(2)}
            </text>
            <text x="28" y="60" fontSize="7" fill="var(--gray)" fontFamily="monospace">
              f''(x) = {(6 * xVal).toFixed(1)}
            </text>
          </svg>
        );
      }

      // 19. 数学：函数族与轨迹曲线 (Funktionenscharen)
      case "funktionenschar": {
        const k = 0.5 + (paramA / 100) * 4.5; // 0.5 to 5.0
        const showOrtskurve = paramB > 40;

        // Origin at (220, 100). scaleX: 1 unit = 65px, scaleY: 1 unit = 24px
        const cx = 220;
        const cy = 100;
        const scaleX = 65;
        const scaleY = 22;

        // Extremum calculations: f_k(x) = x^3 - kx
        // f'_k(x) = 3x^2 - k = 0 => x_HP = -sqrt(k/3), x_TP = sqrt(k/3)
        const xHp = -Math.sqrt(k / 3);
        const yHp = Math.pow(xHp, 3) - k * xHp; // = 2 * (k/3)^(3/2)
        const xTp = Math.sqrt(k / 3);
        const yTp = -yHp;

        const hpSvgX = cx + xHp * scaleX;
        const hpSvgY = cy - yHp * scaleY;
        const tpSvgX = cx + xTp * scaleX;
        const tpSvgY = cy - yTp * scaleY;

        // Sample points for current curve f_k(x)
        const fPoints: string[] = [];
        for (let i = 0; i <= 60; i++) {
          const t = -2.2 + (i / 60) * 4.4;
          const ft = Math.pow(t, 3) - k * t;
          const sx = cx + t * scaleX;
          const sy = cy - ft * scaleY;
          fPoints.push(`${i === 0 ? "M" : "L"} ${sx.toFixed(1)} ${sy.toFixed(1)}`);
        }
        const fPath = fPoints.join(" ");

        // Sample points for Ortskurve: y = -2x^3 (for x < 0: HP locus, x > 0: TP locus)
        const ortsPoints: string[] = [];
        for (let i = 0; i <= 40; i++) {
          const t = -1.6 + (i / 40) * 3.2;
          const ortY = -2 * Math.pow(t, 3);
          const sx = cx + t * scaleX;
          const sy = cy - ortY * scaleY;
          ortsPoints.push(`${i === 0 ? "M" : "L"} ${sx.toFixed(1)} ${sy.toFixed(1)}`);
        }
        const ortsPath = ortsPoints.join(" ");

        return (
          <svg className="w-full h-64 sm:h-72 rounded bg-[var(--paper-subtle)]/40 border border-[var(--line)]/50" viewBox="0 0 440 200">
            {/* Coordinate Grid */}
            <line x1="40" y1={cy} x2="400" y2={cy} stroke="var(--ink)" strokeWidth="1" strokeOpacity="0.35" />
            <line x1={cx} y1="15" x2={cx} y2="185" stroke="var(--ink)" strokeWidth="1" strokeOpacity="0.35" />
            <text x="405" y={cy + 4} fontSize="9" fill="var(--ink)" fontFamily="monospace">x</text>
            <text x={cx + 6} y="22" fontSize="9" fill="var(--ink)" fontFamily="monospace">y</text>

            {/* Ortskurve (Dashed line) */}
            {showOrtskurve && (
              <g>
                <path d={ortsPath} fill="none" stroke="#dc2626" strokeWidth="1.8" strokeDasharray="4,4" />
                <text x="75" y="32" fontSize="8" fill="#dc2626" fontFamily="monospace">Ortskurve: y = -2x³</text>
              </g>
            )}

            {/* Dynamic Curve for parameter k */}
            <path d={fPath} fill="none" stroke="var(--accent)" strokeWidth="2.5" />

            {/* Dynamic High Point (HP) */}
            <circle cx={hpSvgX} cy={hpSvgY} r="5" fill="#16a34a" stroke="var(--paper)" strokeWidth="1.5" />
            <text x={hpSvgX - 8} y={hpSvgY - 8} textAnchor="end" fontSize="8" fontWeight="bold" fill="#16a34a" fontFamily="monospace">
              HP({xHp.toFixed(2)} | {yHp.toFixed(2)})
            </text>

            {/* Dynamic Low Point (TP) */}
            <circle cx={tpSvgX} cy={tpSvgY} r="5" fill="#2563eb" stroke="var(--paper)" strokeWidth="1.5" />
            <text x={tpSvgX + 8} y={tpSvgY + 12} fontSize="8" fontWeight="bold" fill="#2563eb" fontFamily="monospace">
              TP({xTp.toFixed(2)} | {yTp.toFixed(2)})
            </text>

            {/* Live readout badge */}
            <rect x="290" y="145" width="135" height="42" rx="3" fill="var(--surface)" stroke="var(--line)" />
            <text x="357" y="160" textAnchor="middle" fontSize="9" fontWeight="bold" fill="var(--ink)" fontFamily="monospace">
              f_{k.toFixed(1)}(x) = x³ - {k.toFixed(1)}x
            </text>
            <text x="357" y="176" textAnchor="middle" fontSize="8" fill="#16a34a" fontFamily="monospace">
              {data.rateValue}
            </text>
          </svg>
        );
      }

      // 20. 数学：旋转体体积 (Rotation)
      case "rotation": {
        const b = 1 + (paramA / 100) * 3; // 1.0 to 4.0
        const phiDeg = Math.round((paramB / 100) * 360); // 0 to 360 deg
        const phiRad = (phiDeg * Math.PI) / 180;

        // X origin at 90, axis at Y = 100. scaleX = 70px per unit, f(x) = sqrt(x), so max r = sqrt(4) = 2 -> scaleY = 32px
        const ox = 90;
        const oy = 100;
        const scaleX = 65;
        const scaleR = 28;

        const bx = ox + b * scaleX;
        const rB = Math.sqrt(b) * scaleR;
        // perspective vertical radius scales with sin(phi)
        const ryEnd = Math.max(2, rB * Math.abs(Math.sin(Math.max(0.2, phiRad / 2))));

        // Build upper and lower profile lines for f(x) = sqrt(x)
        const topPts: string[] = [];
        const btmPts: string[] = [];
        for (let i = 0; i <= 30; i++) {
          const x = (i / 30) * b;
          const rx = Math.sqrt(x) * scaleR;
          const px = ox + x * scaleX;
          topPts.push(`${i === 0 ? "M" : "L"} ${px.toFixed(1)} ${(oy - rx).toFixed(1)}`);
          btmPts.push(`${i === 0 ? "M" : "L"} ${px.toFixed(1)} ${(oy + rx).toFixed(1)}`);
        }

        // Cross-section disc at mid-interval x = b * 0.65
        const midX = ox + b * 0.65 * scaleX;
        const midR = Math.sqrt(b * 0.65) * scaleR;
        const midRy = Math.max(2, midR * Math.abs(Math.sin(Math.max(0.2, phiRad / 2))));

        return (
          <svg className="w-full h-64 sm:h-72 rounded bg-[var(--paper-subtle)]/40 border border-[var(--line)]/50" viewBox="0 0 440 200">
            {/* Axis */}
            <line x1="50" y1={oy} x2="390" y2={oy} stroke="var(--ink)" strokeWidth="1.5" strokeDasharray="6,3" />
            <text x="395" y={oy + 4} fontSize="9" fill="var(--ink)" fontFamily="monospace">x</text>

            {/* Rotated Solid Body Fill */}
            <path
              d={`${topPts.join(" ")} L ${bx.toFixed(1)} ${(oy + rB).toFixed(1)} ${btmPts.reverse().join(" ")} Z`}
              fill="var(--accent)"
              fillOpacity={0.12 + (phiDeg / 360) * 0.18}
              stroke="none"
            />

            {/* Outer Boundary Curves */}
            <path d={topPts.join(" ")} fill="none" stroke="var(--accent)" strokeWidth="2.2" />
            <path d={btmPts.join(" ")} fill="none" stroke="var(--accent)" strokeWidth="1.5" strokeOpacity="0.7" />

            {/* Intermediate differential disc (π * f(x)^2 dx) */}
            <ellipse cx={midX} cy={oy} rx={4} ry={midRy} fill="var(--accent)" fillOpacity="0.45" stroke="var(--ink)" strokeWidth="1" />
            <line x1={midX} y1={oy - midR} x2={midX} y2={oy + midR} stroke="var(--ink)" strokeWidth="1" strokeDasharray="2,2" />
            <text x={midX} y={oy + midR + 14} textAnchor="middle" fontSize="7" fill="var(--gray)" fontFamily="monospace">
              dV = π·x dx
            </text>

            {/* End ellipse cap at x = b */}
            <ellipse cx={bx} cy={oy} rx={Math.max(3, 14 * Math.sin(phiRad / 2))} ry={ryEnd} fill="var(--accent)" fillOpacity="0.25" stroke="var(--ink)" strokeWidth="1.5" />
            <line x1={bx} y1={oy - rB} x2={bx} y2={oy + rB} stroke="#dc2626" strokeWidth="1.5" />

            {/* Labels and readout */}
            <rect x="20" y="20" width="150" height="46" rx="3" fill="var(--surface)" stroke="var(--line)" />
            <text x="28" y="35" fontSize="9" fontWeight="bold" fill="var(--ink)" fontFamily="monospace">
              f(x) = √x | b = {b.toFixed(1)}
            </text>
            <text x="28" y="49" fontSize="8" fill="var(--accent)" fontFamily="monospace">
              {data.rateValue}
            </text>
            <text x="28" y="60" fontSize="7" fill="var(--gray)" fontFamily="monospace">
              旋转角 φ = {phiDeg}°
            </text>
          </svg>
        );
      }

      // 21. 数学：点到平面空间几何 (Ebene & Abstand)
      case "ebene": {
        const pz = 1 + (paramA / 100) * 8; // 1.0 to 9.0
        const d = pz / 3; // distance = pz / 3

        // Plane polygon in isometric projection
        // Center of plane around (220, 130)
        // Point P moves strictly upward as pz increases
        const pX = 220;
        const pY = 130 - pz * 10; // moves from 120 down to 40
        const fX = 220;
        const fY = 130; // base footprint on the plane

        return (
          <svg className="w-full h-64 sm:h-72 rounded bg-[var(--paper-subtle)]/40 border border-[var(--line)]/50" viewBox="0 0 440 200">
            {/* Plane coordinate grid in perspective */}
            <polygon
              points="90,165 290,165 370,95 170,95"
              fill="#0284c7"
              fillOpacity="0.18"
              stroke="var(--ink)"
              strokeWidth="1.6"
            />
            {/* Grid lines on the plane */}
            <line x1="130" y1="130" x2="330" y2="130" stroke="#0284c7" strokeWidth="1" strokeOpacity="0.4" />
            <line x1="220" y1="95" x2="190" y2="165" stroke="#0284c7" strokeWidth="1" strokeOpacity="0.4" />

            <text x="360" y="105" fontSize="8" fontWeight="bold" fill="#0284c7" fontFamily="monospace">E: 2x + 2y - z = 4</text>

            {/* Orthogonal projection drop line */}
            <line x1={pX} y1={pY} x2={fX} y2={fY} stroke="#dc2626" strokeWidth="2.2" strokeDasharray="3,3" />

            {/* Right angle symbol at Footprint F */}
            <path d={`M ${fX} ${fY - 10} L ${fX + 10} ${fY - 10} L ${fX + 10} ${fY}`} fill="none" stroke="#dc2626" strokeWidth="1.2" />

            {/* Footprint point F */}
            <circle cx={fX} cy={fY} r="4" fill="var(--ink)" />
            <text x={fX + 12} y={fY + 4} fontSize="8" fill="var(--ink)" fontFamily="monospace">Lotfußpunkt F</text>

            {/* Moving Point P */}
            <circle cx={pX} cy={pY} r="5.5" fill="#dc2626" stroke="var(--paper)" strokeWidth="2" />
            <text x={pX + 10} y={pY - 2} fontSize="9" fontWeight="bold" fill="#dc2626" fontFamily="monospace">
              P(1 | 1 | {pz.toFixed(1)})
            </text>

            {/* Distance measurement label */}
            <rect x="25" y="25" width="135" height="42" rx="3" fill="var(--surface)" stroke="var(--line)" />
            <text x="33" y="40" fontSize="8" fill="var(--gray)" fontFamily="monospace">Hessesche NF: |pz| / 3</text>
            <text x="33" y="55" fontSize="10" fontWeight="bold" fill="#dc2626" fontFamily="monospace">
              d(P, E) = {d.toFixed(2)} LE
            </text>
          </svg>
        );
      }

      // 22. 数学：向量点积与叉积 (Vektor)
      case "vektor": {
        const alphaDeg = Math.round((paramA / 100) * 180);
        const alphaRad = (alphaDeg * Math.PI) / 180;
        const lenB = 1 + (paramB / 100) * 4; // 1.0 to 5.0
        const scale = 24; // px per unit
        const lenA = 4.5; // fixed vector a along x-axis

        const originX = 110;
        const originY = 145;

        // Vector a along horizontal
        const aX = originX + lenA * scale;
        const aY = originY;

        // Vector b at angle alpha
        const bX = originX + lenB * scale * Math.cos(alphaRad);
        const bY = originY - lenB * scale * Math.sin(alphaRad);

        // Orthogonal projection of b onto a
        const projX = originX + lenB * scale * Math.cos(alphaRad);
        const projY = originY;

        // Parallelogram 4th vertex
        const p4X = aX + (bX - originX);
        const p4Y = aY + (bY - originY);

        return (
          <svg className="w-full h-64 sm:h-72 rounded bg-[var(--paper-subtle)]/40 border border-[var(--line)]/50" viewBox="0 0 440 200">
            {/* Parallelogram area (Cross product |a x b|) */}
            <polygon
              points={`${originX},${originY} ${aX},${aY} ${p4X},${p4Y} ${bX},${bY}`}
              fill="var(--accent)"
              fillOpacity="0.14"
              stroke="var(--accent)"
              strokeWidth="1"
              strokeDasharray="3,3"
            />

            {/* Projection drop line */}
            <line x1={bX} y1={bY} x2={projX} y2={projY} stroke="var(--gray)" strokeWidth="1.2" strokeDasharray="3,2" />
            <line x1={originX} y1={originY} x2={projX} y2={projY} stroke="#16a34a" strokeWidth="3" strokeOpacity="0.6" />

            {/* Angle arc */}
            <path
              d={`M ${originX + 26} ${originY} A 26 26 0 ${alphaDeg > 180 ? 1 : 0} 0 ${originX + 26 * Math.cos(alphaRad)} ${originY - 26 * Math.sin(alphaRad)}`}
              fill="none"
              stroke="var(--ink)"
              strokeWidth="1.5"
            />
            <text x={originX + 32} y={originY - 10} fontSize="8" fill="var(--ink)" fontFamily="monospace">α={alphaDeg}°</text>

            {/* Vector a */}
            <line x1={originX} y1={originY} x2={aX} y2={aY} stroke="var(--ink)" strokeWidth="2.8" />
            <polygon points={`${aX},${aY} ${aX - 7},${aY - 3} ${aX - 7},${aY + 3}`} fill="var(--ink)" />
            <text x={aX + 8} y={aY + 4} fontSize="10" fontWeight="bold" fill="var(--ink)" fontFamily="monospace">a</text>

            {/* Vector b */}
            <line x1={originX} y1={originY} x2={bX} y2={bY} stroke="var(--accent)" strokeWidth="2.8" />
            <circle cx={bX} cy={bY} r="3" fill="var(--accent)" />
            <text x={bX + 6} y={bY - 4} fontSize="10" fontWeight="bold" fill="var(--accent)" fontFamily="monospace">b (|b|={lenB.toFixed(1)})</text>

            {/* Data Badge */}
            <rect x="280" y="25" width="145" height="52" rx="3" fill="var(--surface)" stroke="var(--line)" />
            <text x="288" y="42" fontSize="9" fontWeight="bold" fill="var(--ink)" fontFamily="monospace">
              a · b = {(lenA * lenB * Math.cos(alphaRad)).toFixed(2)}
            </text>
            <text x="288" y="56" fontSize="8" fill="var(--accent)" fontFamily="monospace">
              |a × b| = {(lenA * lenB * Math.sin(alphaRad)).toFixed(2)} FE
            </text>
            <text x="288" y="68" fontSize="7" fill={alphaDeg === 90 ? "#16a34a" : "var(--gray)"} fontFamily="monospace">
              {alphaDeg === 90 ? "● 正交垂直 Orthogonal!" : `夹角: ${alphaDeg}°`}
            </text>
          </svg>
        );
      }

      // 23. 数学：马尔可夫转移图 (Markov-Ketten)
      case "markov": {
        const pA2B = +(0.1 + (paramA / 100) * 0.8).toFixed(2);
        const pB2A = +(0.1 + (paramB / 100) * 0.8).toFixed(2);
        const statA = Math.round((Number(pB2A) / (Number(pA2B) + Number(pB2A))) * 100);
        const statB = 100 - statA;

        // Radius scales with stationary distribution (15px to 38px)
        const rA = 16 + (statA / 100) * 22;
        const rB = 16 + (statB / 100) * 22;

        // Arrow stroke width scales with transition probability
        const wA2B = 1.2 + pA2B * 3.5;
        const wB2A = 1.2 + pB2A * 3.5;

        return (
          <svg className="w-full h-64 sm:h-72 rounded bg-[var(--paper-subtle)]/40 border border-[var(--line)]/50" viewBox="0 0 440 200">
            {/* Transition curve A -> B (upper) */}
            <path d="M 140 75 Q 220 30 300 75" fill="none" stroke="var(--ink)" strokeWidth={wA2B} />
            <polygon points="300,75 290,68 293,78" fill="var(--ink)" />
            <text x="220" y="44" textAnchor="middle" fontSize="9" fontWeight="bold" fill="var(--ink)" fontFamily="monospace">
              P(A→B) = {pA2B}
            </text>

            {/* Transition curve B -> A (lower) */}
            <path d="M 300 125 Q 220 170 140 125" fill="none" stroke="var(--accent)" strokeWidth={wB2A} />
            <polygon points="140,125 150,132 147,122" fill="var(--accent)" />
            <text x="220" y="162" textAnchor="middle" fontSize="9" fontWeight="bold" fill="var(--accent)" fontFamily="monospace">
              P(B→A) = {pB2A}
            </text>

            {/* Node A */}
            <circle cx="110" cy="100" r={rA} fill="var(--paper)" stroke="var(--ink)" strokeWidth="2.5" />
            <text x="110" y="96" textAnchor="middle" fontSize="12" fontWeight="bold" fill="var(--ink)" fontFamily="monospace">A</text>
            <text x="110" y="112" textAnchor="middle" fontSize="8" fill="var(--gray)" fontFamily="monospace">{statA}%</text>

            {/* Node B */}
            <circle cx="330" cy="100" r={rB} fill="var(--paper)" stroke="var(--accent)" strokeWidth="2.5" />
            <text x="330" y="96" textAnchor="middle" fontSize="12" fontWeight="bold" fill="var(--accent)" fontFamily="monospace">B</text>
            <text x="330" y="112" textAnchor="middle" fontSize="8" fill="var(--accent)" fontFamily="monospace">{statB}%</text>

            {/* Equilibrium Info Box */}
            <rect x="135" y="85" width="170" height="30" rx="3" fill="var(--surface)" stroke="var(--line)" />
            <text x="220" y="104" textAnchor="middle" fontSize="9" fontWeight="bold" fill="var(--ink)" fontFamily="monospace">
              稳态分布: [A: {statA}% | B: {statB}%]
            </text>
          </svg>
        );
      }

      // 24. 数学：假设检验拒绝域 (Hypothesentest)
      case "hypothese": {
        const kKrit = Math.round(40 + (paramA / 100) * 20); // 40 to 60
        // Svg X mapping: k from 0 to 100 -> X from 70 to 370
        const kX = 70 + (kKrit / 100) * 300;

        // Normal distribution curve points centered at x=50 (Svg X=220)
        const bellPoints: string[] = [];
        for (let i = 0; i <= 60; i++) {
          const t = i / 60; // 0 to 1
          const xSvg = 70 + t * 300;
          const z = (t * 100 - 50) / 14;
          const ySvg = 165 - Math.exp(-0.5 * z * z) * 125;
          bellPoints.push(`${i === 0 ? "M" : "L"} ${xSvg.toFixed(1)} ${ySvg.toFixed(1)}`);
        }
        const bellPath = bellPoints.join(" ");

        return (
          <svg className="w-full h-64 sm:h-72 rounded bg-[var(--paper-subtle)]/40 border border-[var(--line)]/50" viewBox="0 0 440 200">
            {/* Axis */}
            <line x1="50" y1="165" x2="390" y2="165" stroke="var(--ink)" strokeWidth="1.5" />
            <text x="395" y="169" fontSize="9" fill="var(--ink)" fontFamily="monospace">X</text>

            {/* Bell Curve */}
            <path d={bellPath} fill="none" stroke="var(--ink)" strokeWidth="2.2" />

            {/* Rejection Region Shading from kX to 370 */}
            <rect x={kX} y="35" width={Math.max(0, 370 - kX)} height="130" fill="#dc2626" fillOpacity="0.22" />

            {/* Decision Threshold Line k */}
            <line x1={kX} y1="30" x2={kX} y2="165" stroke="#dc2626" strokeWidth="2" strokeDasharray="4,3" />
            <polygon points={`${kX},30 ${kX - 4},22 ${kX + 4},22`} fill="#dc2626" />
            <text x={kX} y="18" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#dc2626" fontFamily="monospace">
              k = {kKrit}
            </text>

            {/* Region Annotations */}
            <text x={(70 + kX) / 2} y="155" textAnchor="middle" fontSize="8" fill="var(--ink)" fontFamily="monospace">
              接受域 A (H0)
            </text>
            <text x={Math.min(380, kX + 35)} y="155" textAnchor="middle" fontSize="8" fontWeight="bold" fill="#dc2626" fontFamily="monospace">
              拒绝域 K
            </text>

            {/* Readout Badge */}
            <rect x="65" y="32" width="130" height="42" rx="3" fill="var(--surface)" stroke="var(--line)" />
            <text x="73" y="47" fontSize="8" fill="var(--gray)" fontFamily="monospace">显著性水平 α (弃真概率)</text>
            <text x="73" y="62" fontSize="9" fontWeight="bold" fill="#dc2626" fontFamily="monospace">
              {data.rateValue}
            </text>
          </svg>
        );
      }

      // 25. 数学：线性回归与散点 (Regression)
      case "regression": {
        const rVal = 0.2 + (paramA / 100) * 0.78; // 0.20 to 0.98
        const outlier = paramB / 100; // 0.0 to 1.0

        // Base linear function: y = 0.5 * x + 20
        // Data points (x_i in [0, 100]). When r is high, scatter variance shrinks!
        const basePoints = [
          { x: 15, y: 30, noise: -18 },
          { x: 25, y: 35, noise: 22 },
          { x: 38, y: 45, noise: -15 },
          { x: 50, y: 52, noise: 25 },
          { x: 62, y: 60, noise: -20 },
          { x: 75, y: 72, noise: 18 },
          { x: 88, y: 80, noise: -22 },
          { x: 95, y: 88, noise: 16 },
        ];

        // Coordinate mapping: X: [0, 100] -> [75, 375], Y: [0, 100] -> [165, 35]
        const mapX = (x: number) => 75 + (x / 100) * 300;
        const mapY = (y: number) => 165 - (y / 100) * 130;

        // Dynamic points: variance scaled by (1 - rVal)
        const dynamicPoints = basePoints.map((p) => {
          const spread = (1 - rVal) * 1.5;
          const py = Math.max(10, Math.min(90, p.y + p.noise * spread));
          return { sx: mapX(p.x), sy: mapY(py) };
        });

        // Add dynamic outlier
        const outlierSx = mapX(85);
        const outlierSy = mapY(20 + (1 - outlier) * 60);

        return (
          <svg className="w-full h-64 sm:h-72 rounded bg-[var(--paper-subtle)]/40 border border-[var(--line)]/50" viewBox="0 0 440 200">
            {/* Axes */}
            <line x1="60" y1="165" x2="390" y2="165" stroke="var(--ink)" strokeWidth="1.5" />
            <line x1="60" y1="25" x2="60" y2="165" stroke="var(--ink)" strokeWidth="1.5" />
            <text x="395" y="169" fontSize="9" fill="var(--ink)" fontFamily="monospace">x</text>
            <text x="52" y="25" fontSize="9" fill="var(--ink)" fontFamily="monospace">y</text>

            {/* Regression Line */}
            <line
              x1={mapX(5)}
              y1={mapY(22)}
              x2={mapX(98)}
              y2={mapY(90)}
              stroke="var(--accent)"
              strokeWidth="2.5"
            />

            {/* Residual drop lines and scatter points */}
            {dynamicPoints.map((p, idx) => {
              // Expected line Y at this sx
              const normX = (p.sx - 75) / 300;
              const lineY = mapY(22 + normX * 68);
              return (
                <g key={idx}>
                  <line x1={p.sx} y1={p.sy} x2={p.sx} y2={lineY} stroke="var(--gray)" strokeWidth="0.8" strokeDasharray="2,2" strokeOpacity="0.6" />
                  <circle cx={p.sx} cy={p.sy} r="3.5" fill="var(--ink)" />
                </g>
              );
            })}

            {/* Outlier Point */}
            {outlier > 0.1 && (
              <g>
                <circle cx={outlierSx} cy={outlierSy} r="4.5" fill="#dc2626" />
                <text x={outlierSx + 6} y={outlierSy + 3} fontSize="7" fill="#dc2626" fontFamily="monospace">Ausreißer</text>
              </g>
            )}

            {/* Readout badge */}
            <rect x="75" y="32" width="135" height="42" rx="3" fill="var(--surface)" stroke="var(--line)" />
            <text x="83" y="47" fontSize="9" fontWeight="bold" fill="var(--accent)" fontFamily="monospace">
              {data.rateValue}
            </text>
            <text x="83" y="62" fontSize="8" fill="var(--ink)" fontFamily="monospace">
              {data.subValue}
            </text>
          </svg>
        );
      }

      // 26. 社科：德国 Sinus-Milieus 坐标矩阵 (Sinus-Milieus)
      case "milieu": {
        const curX = 60 + (paramA / 100) * 320;
        const curY = 170 - (paramB / 100) * 135;

        return (
          <svg className="w-full h-64 sm:h-72 rounded bg-[var(--paper-subtle)]/40 border border-[var(--line)]/50" viewBox="0 0 440 200">
            {/* Coordinate axes */}
            <line x1="60" y1="170" x2="390" y2="170" stroke="var(--ink)" strokeWidth="1.5" />
            <line x1="60" y1="25" x2="60" y2="170" stroke="var(--ink)" strokeWidth="1.5" />
            <text x="390" y="185" textAnchor="end" fontSize="7.5" fill="var(--gray)" fontFamily="monospace">Grundorientierung (Tradition → Modernisierung) →</text>
            <text x="50" y="22" fontSize="7.5" fill="var(--gray)" fontFamily="monospace">↑ Soziale Lage</text>

            {/* Milieu cluster bubbles */}
            {/* Traditional */}
            <ellipse cx="110" cy="140" rx="38" ry="18" fill="#cbd5e1" fillOpacity="0.45" stroke="var(--ink)" strokeWidth="1" />
            <text x="110" y="143" textAnchor="middle" fontSize="7" fontFamily="monospace">Traditionelle</text>

            {/* Prekäre */}
            <ellipse cx="115" cy="165" rx="30" ry="12" fill="#fca5a5" fillOpacity="0.35" stroke="#dc2626" strokeWidth="0.8" />
            <text x="115" y="167" textAnchor="middle" fontSize="6.5" fill="#b91c1c" fontFamily="monospace">Prekäre</text>

            {/* Bürgerliche Mitte */}
            <ellipse cx="210" cy="115" rx="48" ry="22" fill="#bae6fd" fillOpacity="0.5" stroke="#0284c7" strokeWidth="1.2" />
            <text x="210" y="118" textAnchor="middle" fontSize="7.5" fontWeight="bold" fill="#0369a1" fontFamily="monospace">Bürgerl. Mitte</text>

            {/* Adaptiv-Pragmatische */}
            <ellipse cx="270" cy="85" rx="42" ry="20" fill="#a7f3d0" fillOpacity="0.45" stroke="#059669" strokeWidth="1.2" />
            <text x="270" y="88" textAnchor="middle" fontSize="7" fontWeight="bold" fill="#047857" fontFamily="monospace">Adaptiv-Pragm.</text>

            {/* Konservativ-Gehobene */}
            <ellipse cx="150" cy="55" rx="45" ry="18" fill="#e2e8f0" fillOpacity="0.5" stroke="#475569" strokeWidth="1" />
            <text x="150" y="58" textAnchor="middle" fontSize="7" fontFamily="monospace">Konserv.-Gehobene</text>

            {/* Performer / Postmaterielle */}
            <ellipse cx="325" cy="55" rx="42" ry="20" fill="#fed7aa" fillOpacity="0.55" stroke="#ea580c" strokeWidth="1.2" />
            <text x="325" y="58" textAnchor="middle" fontSize="7" fontWeight="bold" fill="#c2410c" fontFamily="monospace">Performer / Expeditiv</text>

            {/* Crosshair drop lines to current position */}
            <line x1={curX} y1={curY} x2={curX} y2="170" stroke="var(--accent)" strokeWidth="1" strokeDasharray="2,2" strokeOpacity="0.6" />
            <line x1="60" y1={curY} x2={curX} y2={curY} stroke="var(--accent)" strokeWidth="1" strokeDasharray="2,2" strokeOpacity="0.6" />

            {/* Dynamic individual person coordinate */}
            <circle cx={curX} cy={curY} r="6.5" fill="var(--accent)" stroke="var(--paper)" strokeWidth="2" />

            {/* Readout badge */}
            <rect x="130" y="10" width="180" height="26" rx="3" fill="var(--surface)" stroke="var(--line)" />
            <text x="220" y="27" textAnchor="middle" fontSize="9" fontWeight="bold" fill="var(--accent)" fontFamily="monospace">
              {data.rateValue}
            </text>
          </svg>
        );
      }

      // 27. 社科：宏观景气周期 (Konjunktur)
      case "konjunktur": {
        const curX = 60 + (paramA / 100) * 320;
        const bip = +(1.5 + 2.5 * Math.sin((paramA / 100) * 2 * Math.PI)).toFixed(1);
        const antiImpuls = paramB / 100; // 0 to 1.0 (fiscal counter-cyclical damper)

        // Wave curve: damped by antiImpuls
        const wavePoints: string[] = [];
        for (let i = 0; i <= 60; i++) {
          const t = i / 60;
          const sx = 60 + t * 320;
          const baseSin = Math.sin(t * 2 * Math.PI);
          // Potential growth path has a 1% upward slope: from 115 down to 85
          const potY = 115 - t * 30;
          // Actual amplitude shrinks as antiImpuls increases
          const amp = 45 * (1 - antiImpuls * 0.45);
          const sy = potY - baseSin * amp;
          wavePoints.push(`${i === 0 ? "M" : "L"} ${sx.toFixed(1)} ${sy.toFixed(1)}`);
        }

        const potCurY = 115 - (paramA / 100) * 30;
        const curY = potCurY - Math.sin((paramA / 100) * 2 * Math.PI) * (45 * (1 - antiImpuls * 0.45));

        return (
          <svg className="w-full h-64 sm:h-72 rounded bg-[var(--paper-subtle)]/40 border border-[var(--line)]/50" viewBox="0 0 440 200">
            {/* Phase Background Bands */}
            <rect x="60" y="25" width="80" height="145" fill="#22c55e" fillOpacity="0.08" />
            <rect x="140" y="25" width="80" height="145" fill="#f59e0b" fillOpacity="0.08" />
            <rect x="220" y="25" width="80" height="145" fill="#ea580c" fillOpacity="0.08" />
            <rect x="300" y="25" width="80" height="145" fill="#ef4444" fillOpacity="0.08" />

            <text x="100" y="40" textAnchor="middle" fontSize="7.5" fill="#16a34a" fontWeight="bold" fontFamily="monospace">I. Aufschwung</text>
            <text x="180" y="40" textAnchor="middle" fontSize="7.5" fill="#d97706" fontWeight="bold" fontFamily="monospace">II. Boom (Hoch)</text>
            <text x="260" y="40" textAnchor="middle" fontSize="7.5" fill="#ea580c" fontWeight="bold" fontFamily="monospace">III. Abschwung</text>
            <text x="340" y="40" textAnchor="middle" fontSize="7.5" fill="#dc2626" fontWeight="bold" fontFamily="monospace">IV. Tiefstand</text>

            {/* Potential GDP trend line */}
            <line x1="50" y1="120" x2="390" y2="80" stroke="var(--gray)" strokeWidth="1.8" strokeDasharray="4,4" />
            <text x="390" y="74" textAnchor="end" fontSize="7" fill="var(--gray)" fontFamily="monospace">
              Potenzialwachstum
            </text>

            {/* Actual business cycle curve */}
            <path d={wavePoints.join(" ")} fill="none" stroke="var(--accent)" strokeWidth="2.5" />

            {/* Moving current point */}
            <circle cx={curX} cy={curY} r="5.5" fill="var(--accent)" stroke="var(--paper)" strokeWidth="2" />
            <line x1={curX} y1={curY} x2={curX} y2="170" stroke="var(--accent)" strokeWidth="1" strokeDasharray="2,2" strokeOpacity="0.5" />

            {/* Readout badge */}
            <rect x="25" y="145" width="165" height="38" rx="3" fill="var(--surface)" stroke="var(--line)" />
            <text x="33" y="159" fontSize="8" fill="var(--gray)" fontFamily="monospace">BIP-Wachstum: {bip}%</text>
            <text x="33" y="173" fontSize="9" fontWeight="bold" fill="var(--accent)" fontFamily="monospace">
              {data.subValue}
            </text>
          </svg>
        );
      }

      // 28. 社科：欧洲央行利率走廊 (EZB)
      case "ezb": {
        const leitzins = 0.25 + (paramA / 100) * 4.75; // 0.25 to 5.0%
        // Corridor width: Spitzenrefinanzierung = leitzins + 0.25, Einlage = leitzins - 0.25
        // Map rate 0% to 6% -> Y = 160 to 40
        const mapZinsY = (r: number) => 160 - (r / 6) * 115;

        const yLeit = mapZinsY(leitzins);
        const ySpitze = mapZinsY(leitzins + 0.25);
        const yEinlage = mapZinsY(Math.max(0, leitzins - 0.25));

        return (
          <svg className="w-full h-64 sm:h-72 rounded bg-[var(--paper-subtle)]/40 border border-[var(--line)]/50" viewBox="0 0 440 200">
            {/* Rate Corridor Shaded Background */}
            <rect x="60" y={ySpitze} width="320" height={Math.max(4, yEinlage - ySpitze)} fill="var(--accent)" fillOpacity="0.12" />

            {/* Top Ceiling: Spitzenrefinanzierungsfazilität */}
            <line x1="60" y1={ySpitze} x2="380" y2={ySpitze} stroke="#dc2626" strokeWidth="2" strokeDasharray="4,3" />
            <text x="65" y={ySpitze - 4} fontSize="8" fill="#dc2626" fontWeight="bold" fontFamily="monospace">
              Spitzenrefinanzierung (Obergrenze): {(leitzins + 0.25).toFixed(2)}%
            </text>

            {/* Center Policy Rate: Hauptrefinanzierungssatz */}
            <line x1="60" y1={yLeit} x2="380" y2={yLeit} stroke="var(--accent)" strokeWidth="3" />
            <circle cx="220" cy={yLeit} r="4.5" fill="var(--accent)" />
            <text x="65" y={yLeit + 13} fontSize="8.5" fontWeight="bold" fill="var(--ink)" fontFamily="monospace">
              Hauptrefinanzierungssatz: {leitzins.toFixed(2)}%
            </text>

            {/* Bottom Floor: Einlagefazilität */}
            <line x1="60" y1={yEinlage} x2="380" y2={yEinlage} stroke="#16a34a" strokeWidth="2" strokeDasharray="4,3" />
            <text x="65" y={yEinlage + 12} fontSize="8" fill="#16a34a" fontWeight="bold" fontFamily="monospace">
              Einlagefazilität (Zinsboden): {Math.max(0, leitzins - 0.25).toFixed(2)}%
            </text>

            {/* Inflation Indicator Card */}
            <rect x="290" y="25" width="105" height="46" rx="3" fill="var(--surface)" stroke="var(--line)" />
            <text x="342" y="42" textAnchor="middle" fontSize="8" fill="var(--gray)" fontFamily="monospace">HVPI-Inflation</text>
            <text x="342" y="60" textAnchor="middle" fontSize="11" fontWeight="bold" fill="var(--ink)" fontFamily="monospace">
              {data.rateValue}
            </text>
          </svg>
        );
      }

      // 29. 社科：福利国家洛伦兹曲线再分配 (Sozialstaat)
      case "sozialstaat": {
        const kTax = paramA / 100;
        const kBasic = paramB / 100;

        // Bürgergeld (paramB) primarily lifts the bottom deciles (x: 60 -> 120)
        // Tax progression (paramA) arches the upper middle class towards the diagonal
        const ctrl1X = Math.round(115 + kBasic * 15);
        const ctrl1Y = Math.round(165 - kBasic * 32 - kTax * 10);
        const ctrl2X = Math.round(210 - kTax * 35);
        const ctrl2Y = Math.round(155 - kTax * 55 - kBasic * 18);

        // Point at 20% population indicating citizen's income floor
        const p20X = 60 + 44; // 20% of 220px
        const p20Y = Math.round(163 - kBasic * 25 - kTax * 8);

        const nettoPath = `M 60 165 C ${ctrl1X} ${ctrl1Y}, ${ctrl2X} ${ctrl2Y}, 280 25`;
        const primaerPath = "M 60 165 C 115 163, 210 155, 280 25";

        return (
          <svg className="w-full h-64 sm:h-72 rounded bg-[var(--paper)] border border-[var(--line)]" viewBox="0 0 440 200">
            {/* 45° 绝对均等对角线 (Gini = 0) */}
            <line x1="60" y1="165" x2="280" y2="25" stroke="var(--line)" strokeWidth="1.5" strokeDasharray="4,4" />
            <text x="175" y="85" textAnchor="middle" fontSize="8" fill="var(--gray)" fontFamily="monospace" transform="rotate(-32 175 85)">
              45° Diagonale (Gini = 0)
            </text>

            {/* 再分配缩小的不平等面积 A (Umverteilungsfläche) */}
            <path
              d={`${nettoPath} C ${ctrl2X} ${ctrl2Y}, 115 163, 60 165 Z`}
              fill="#16a34a"
              fillOpacity="0.18"
            />

            {/* 初次分配曲线 (Markteinkommen vor Steuern, Gini=0.48) */}
            <path d={primaerPath} fill="none" stroke="#dc2626" strokeWidth="2" strokeDasharray="3,2" />

            {/* 二次分配净收入曲线 (Nettoeinkommen nach Steuern & Bürgergeld) */}
            <path d={nettoPath} fill="none" stroke="#16a34a" strokeWidth="2.5" />

            {/* Bürgergeld 底层兜底指示标 */}
            <line x1={p20X} y1="165" x2={p20X} y2={p20Y} stroke="#16a34a" strokeWidth="1.2" strokeDasharray="2,2" />
            <circle cx={p20X} cy={p20Y} r="3.5" fill="#16a34a" />
            <text x={p20X + 4} y={p20Y - 5} fontSize="6.5" fill="#16a34a" fontWeight="bold" fontFamily="monospace">
              Bürgergeld (+{paramB}%)
            </text>

            {/* 坐标轴与刻度 */}
            <line x1="60" y1="165" x2="285" y2="165" stroke="var(--ink)" strokeWidth="1.5" />
            <line x1="60" y1="20" x2="60" y2="165" stroke="var(--ink)" strokeWidth="1.5" />

            {/* X 轴刻度 (人口累计 %) */}
            {[0, 25, 50, 75, 100].map((pct, idx) => {
              const xPos = 60 + (idx / 4) * 220;
              return (
                <g key={pct}>
                  <line x1={xPos} y1="165" x2={xPos} y2="169" stroke="var(--ink)" strokeWidth="1" />
                  <text x={xPos} y="178" textAnchor="middle" fontSize="7" fill="var(--gray)" fontFamily="monospace">
                    {pct}%
                  </text>
                </g>
              );
            })}
            <text x="170" y="192" textAnchor="middle" fontSize="8.5" fill="var(--ink)" fontFamily="monospace">
              {de ? "Kumulierte Bevölkerung (%)" : "累积人口百分比 (%)"}
            </text>

            {/* Y 轴刻度 (收入累计 %) */}
            {[0, 25, 50, 75, 100].map((pct, idx) => {
              const yPos = 165 - (idx / 4) * 140;
              return (
                <g key={pct}>
                  <line x1="56" y1={yPos} x2="60" y2={yPos} stroke="var(--ink)" strokeWidth="1" />
                  <text x="52" y={yPos + 2.5} textAnchor="end" fontSize="7" fill="var(--gray)" fontFamily="monospace">
                    {pct}%
                  </text>
                </g>
              );
            })}
            <text x="22" y="95" textAnchor="middle" fontSize="8" fill="var(--ink)" fontFamily="monospace" transform="rotate(-90 22 95)">
              {de ? "Kumuliertes Einkommen (%)" : "累积收入百分比 (%)"}
            </text>

            {/* 右侧学术解剖与图例卡片 */}
            <g transform="translate(295, 25)">
              <rect x="0" y="0" width="135" height="145" rx="4" fill="var(--paper-subtle)" stroke="var(--line)" />
              <text x="10" y="18" fontSize="9" fontWeight="bold" fill="var(--ink)" fontFamily="monospace">
                Lorenz-Kurven-Analyse
              </text>
              <line x1="10" y1="24" x2="125" y2="24" stroke="var(--line)" strokeWidth="1" />

              {/* 初次分配 */}
              <circle cx="16" cy="38" r="3.5" fill="#dc2626" />
              <text x="25" y="41" fontSize="7.5" fill="var(--ink)" fontFamily="monospace">
                Primär: Gini = 0.48
              </text>
              <text x="25" y="52" fontSize="6.5" fill="var(--gray)">
                Markteinkommen (vor Steuer)
              </text>

              {/* 二次分配 */}
              <circle cx="16" cy="68" r="3.5" fill="#16a34a" />
              <text x="25" y="71" fontSize="8" fontWeight="bold" fill="#16a34a" fontFamily="monospace">
                Netto-Gini: {data.rateValue}
              </text>
              <text x="25" y="82" fontSize="6.5" fill="var(--gray)">
                Progression {paramA}% · Bürgergeld {paramB}%
              </text>

              {/* 平抑效果 */}
              <rect x="8" y="94" width="118" height="24" rx="2" fill="var(--paper)" stroke="var(--line)" />
              <text x="14" y="105" fontSize="7" fill="var(--gray)">
                Umverteilungsgewinn ΔGini:
              </text>
              <text x="14" y="115" fontSize="7.5" fontWeight="bold" fill="#16a34a" fontFamily="monospace">
                {data.subValue}
              </text>

              <text x="10" y="132" fontSize="6.5" fill="var(--gray)" fontStyle="italic">
                Gini = Fläche A / (A + B)
              </text>
            </g>
          </svg>
        );
      }

      // 30. 社科：蒙代尔不可能三角 (Trilemma)
      case "trilemma": {
        return (
          <svg className="w-full h-64 sm:h-72 rounded bg-[var(--paper-subtle)]/40 border border-[var(--line)]/50" viewBox="0 0 440 200">
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
        const prodA = paramA / 100; // 0 to 1
        const prodB = paramB / 100; // 0 to 1
        // Dynamic slope lines for autarky vs free trade
        const endAutarkyX = 220 + prodA * 70;
        const endTradeX = 260 + (prodA + prodB) * 60;

        return (
          <svg className="w-full h-64 sm:h-72 rounded bg-[var(--paper-subtle)]/40 border border-[var(--line)]/50" viewBox="0 0 440 200">
            {/* Axes */}
            <line x1="80" y1="160" x2="380" y2="160" stroke="var(--ink)" strokeWidth="1.5" />
            <line x1="80" y1="25" x2="80" y2="160" stroke="var(--ink)" strokeWidth="1.5" />
            <text x="385" y="164" fontSize="8" fill="var(--ink)" fontFamily="monospace">Maschinenbau (Einheiten) →</text>
            <text x="75" y="20" textAnchor="end" fontSize="8" fill="var(--ink)" fontFamily="monospace">↑ Agrargüter</text>

            {/* Transform Curve 1: Autarky PPF (Transformationskurve Autarkie) */}
            <line x1="80" y1="65" x2={endAutarkyX} y2="160" stroke="#dc2626" strokeWidth="2" />
            <text x={endAutarkyX} y="155" textAnchor="end" fontSize="8" fill="#dc2626" fontFamily="monospace">
              Autarkie
            </text>

            {/* Transform Curve 2: Free Trade PPF Shift outwards */}
            <line x1="80" y1="45" x2={endTradeX} y2="160" stroke="#16a34a" strokeWidth="2.5" strokeDasharray="4,2" />
            <text x={endTradeX} y="155" fontSize="8" fill="#16a34a" fontWeight="bold" fontFamily="monospace">
              Freihandel
            </text>

            {/* Welfare Gain Area */}
            <polygon
              points={`80,65 ${endAutarkyX},160 ${endTradeX},160 80,45`}
              fill="#16a34a"
              fillOpacity="0.15"
            />

            {/* Dynamic Results Card */}
            <rect x="180" y="35" width="180" height="42" rx="3" fill="var(--surface)" stroke="var(--line)" />
            <text x="270" y="50" textAnchor="middle" fontSize="8" fill="var(--gray)" fontFamily="monospace">
              Wohlfahrtsgewinn (Ricardo):
            </text>
            <text x="270" y="66" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#16a34a" fontFamily="monospace">
              {data.rateValue}
            </text>
          </svg>
        );
      }

      // 32. 社科：投资区位雷达 (Standort Deutschland)
      case "standort": {
        const energieP = (100 - paramA) / 100; // lower energy burden = higher score
        const bueroP = (100 - paramB) / 100; // lower bureaucracy = higher score
        const infraP = 0.88; // fixed high
        const ausbildP = 0.85; // dual education high
        const rechtP = 0.90; // legal certainty high

        // 5-point radar polygon:
        // Angle 0: Top (Infrastruktur)
        // Angle 72: Top-right (Duale Ausbildung)
        // Angle 144: Bottom-right (Rechtssicherheit)
        // Angle 216: Bottom-left (Energiekosten)
        // Angle 288: Top-left (Bürokratie)
        const centerRx = 220;
        const centerRy = 100;
        const maxR = 68;

        const getPt = (angleDeg: number, val: number) => {
          const rad = ((angleDeg - 90) * Math.PI) / 180;
          return `${(centerRx + maxR * val * Math.cos(rad)).toFixed(1)},${(centerRy + maxR * val * Math.sin(rad)).toFixed(1)}`;
        };

        const gridPts = [0, 72, 144, 216, 288].map((a) => getPt(a, 1.0)).join(" ");
        const dataPts = [
          getPt(0, infraP),
          getPt(72, ausbildP),
          getPt(144, rechtP),
          getPt(216, Math.max(0.15, energieP)),
          getPt(288, Math.max(0.15, bueroP)),
        ].join(" ");

        return (
          <svg className="w-full h-64 sm:h-72 rounded bg-[var(--paper-subtle)]/40 border border-[var(--line)]/50" viewBox="0 0 440 200">
            {/* Outer reference grid radar */}
            <polygon points={gridPts} fill="none" stroke="var(--gray)" strokeWidth="1" strokeDasharray="3,3" strokeOpacity="0.4" />
            {[0.5, 0.75].map((s, idx) => (
              <polygon key={idx} points={[0, 72, 144, 216, 288].map((a) => getPt(a, s)).join(" ")} fill="none" stroke="var(--gray)" strokeWidth="0.8" strokeDasharray="2,2" strokeOpacity="0.25" />
            ))}

            {/* Dynamic radar polygon */}
            <polygon points={dataPts} fill="var(--accent)" fillOpacity="0.28" stroke="var(--accent)" strokeWidth="2.2" />

            {/* Radar vertex labels */}
            <text x="220" y="24" textAnchor="middle" fontSize="7.5" fontWeight="bold" fill="var(--ink)" fontFamily="monospace">Infrastruktur (88)</text>
            <text x="315" y="80" fontSize="7.5" fontWeight="bold" fill="var(--ink)" fontFamily="monospace">Duale Ausbildung (85)</text>
            <text x="275" y="178" fontSize="7.5" fontWeight="bold" fill="var(--ink)" fontFamily="monospace">Rechtssicherheit (90)</text>
            <text x="165" y="178" textAnchor="end" fontSize="7.5" fontWeight="bold" fill="#dc2626" fontFamily="monospace">Energie ({Math.round(energieP * 100)})</text>
            <text x="125" y="80" textAnchor="end" fontSize="7.5" fontWeight="bold" fill="#dc2626" fontFamily="monospace">Bürokratie ({Math.round(bueroP * 100)})</text>

            {/* Score Badge */}
            <rect x="310" y="115" width="115" height="42" rx="3" fill="var(--surface)" stroke="var(--line)" />
            <text x="367" y="130" textAnchor="middle" fontSize="8" fill="var(--gray)" fontFamily="monospace">DIHK-Index</text>
            <text x="367" y="146" textAnchor="middle" fontSize="10" fontWeight="bold" fill="var(--accent)" fontFamily="monospace">
              {data.rateValue}
            </text>
          </svg>
        );
      }

      // 33. 哲学：康德定言令式普适化过滤机 (Kant)
      case "kant": {
        const universalisierbar = paramA > 50 && paramB > 50;
        const selfZweck = paramB; // 0 to 100%

        return (
          <svg className="w-full h-64 sm:h-72 rounded bg-[var(--paper-subtle)]/40 border border-[var(--line)]/50" viewBox="0 0 440 200">
            {/* Input: Subjective Maxime */}
            <rect x="35" y="70" width="95" height="55" rx="4" fill="var(--paper)" stroke="var(--ink)" strokeWidth="1.5" />
            <text x="82" y="88" textAnchor="middle" fontSize="8" fill="var(--gray)" fontFamily="monospace">Subjektive</text>
            <text x="82" y="102" textAnchor="middle" fontSize="10" fontWeight="bold" fill="var(--ink)" fontFamily="monospace">Maxime</text>
            <text x="82" y="115" textAnchor="middle" fontSize="7" fill="var(--accent)" fontFamily="monospace">{paramA}% Geltung</text>

            {/* Arrow into Filter 1: Universal Law (Naturgesetz-Formel) */}
            <line x1="130" y1="97" x2="165" y2="97" stroke="var(--ink)" strokeWidth="2" />
            <polygon points="165,97 158,93 158,101" fill="var(--ink)" />

            {/* Filter Chamber 1: Universalisierung */}
            <polygon points="205,55 245,97 205,140 165,97" fill="#fef08a" stroke="#ca8a04" strokeWidth="1.8" />
            <text x="205" y="94" textAnchor="middle" fontSize="7.5" fontWeight="bold" fill="#78350f" fontFamily="monospace">1. Allgemeines</text>
            <text x="205" y="105" textAnchor="middle" fontSize="7.5" fontWeight="bold" fill="#78350f" fontFamily="monospace">Gesetz?</text>

            {/* Arrow into Filter 2: Humanity / End-in-itself (Selbstzweck-Formel) */}
            <line x1="245" y1="97" x2="275" y2="97" stroke="var(--ink)" strokeWidth="2" />
            <polygon points="275,97 268,93 268,101" fill="var(--ink)" />

            {/* Filter Chamber 2: Zweck an sich selbst */}
            <polygon points="315,55 355,97 315,140 275,97" fill={selfZweck > 50 ? "#dcfce7" : "#fee2e2"} stroke={selfZweck > 50 ? "#16a34a" : "#dc2626"} strokeWidth="1.8" />
            <text x="315" y="94" textAnchor="middle" fontSize="7" fontWeight="bold" fill={selfZweck > 50 ? "#15803d" : "#b91c1c"} fontFamily="monospace">2. Mensch als</text>
            <text x="315" y="105" textAnchor="middle" fontSize="7" fontWeight="bold" fill={selfZweck > 50 ? "#15803d" : "#b91c1c"} fontFamily="monospace">Zweck?</text>

            {/* Output: Final Verdict */}
            <line x1="355" y1="97" x2="380" y2="97" stroke="var(--ink)" strokeWidth="2" />
            <polygon points="380,97 373,93 373,101" fill="var(--ink)" />

            <circle cx="405" cy="97" r="22" fill={universalisierbar ? "#16a34a" : "#dc2626"} />
            <text x="405" y="95" textAnchor="middle" fontSize="8" fontWeight="bold" fill="white" fontFamily="monospace">
              {universalisierbar ? "GEBOTEN" : "VERBOTEN"}
            </text>
            <text x="405" y="106" textAnchor="middle" fontSize="6.5" fill="white" fontFamily="monospace">
              {universalisierbar ? "Pflicht" : "Widerspruch"}
            </text>

            {/* Bottom Insight Badge */}
            <rect x="70" y="150" width="300" height="35" rx="3" fill="var(--surface)" stroke="var(--line)" />
            <text x="220" y="165" textAnchor="middle" fontSize="8" fill="var(--gray)" fontFamily="monospace">
              Kants Imperativ: {universalisierbar ? "Kein Widerspruch im Wollen und Denken" : "Widerspruch: Maxime zerstört ihre eigene Möglichkeit"}
            </text>
            <text x="220" y="177" textAnchor="middle" fontSize="9" fontWeight="bold" fill={universalisierbar ? "#16a34a" : "#dc2626"} fontFamily="monospace">
              {data.rateValue}
            </text>
          </svg>
        );
      }

      // 34. 哲学：柏拉图洞穴之喻 (Höhle)
      case "hoehle": {
        const step = paramA < 25 ? 0 : paramA < 50 ? 1 : paramA < 75 ? 2 : 3;

        // Sun position and glow
        const sunGlow = Math.max(12, 12 + (paramA / 100) * 16);

        return (
          <svg className="w-full h-64 sm:h-72 rounded bg-[var(--paper-subtle)]/40 border border-[var(--line)]/50" viewBox="0 0 440 200">
            {/* Cave ascent stairway profile */}
            <path
              d="M 35 170 L 120 170 L 120 135 L 210 135 L 210 95 L 300 95 L 300 50 L 405 50"
              fill="none"
              stroke="var(--ink)"
              strokeWidth="2"
            />

            {/* Step I: Schatten (Cave wall & Chains) */}
            <rect x="40" y="142" width="75" height="26" fill="#0f172a" fillOpacity={step === 0 ? 0.9 : 0.25} rx="3" />
            <text x="77" y="158" textAnchor="middle" fontSize="8" fontWeight="bold" fill="white" fontFamily="monospace">
              I. Schatten (Eikasia)
            </text>

            {/* Step II: Feuer & Artefakte */}
            <rect x="125" y="107" width="80" height="26" fill="#ea580c" fillOpacity={step === 1 ? 0.9 : 0.25} rx="3" />
            <text x="165" y="123" textAnchor="middle" fontSize="8" fontWeight="bold" fill="white" fontFamily="monospace">
              II. Feuer (Pistis)
            </text>

            {/* Step III: Reflexionen / Sterne */}
            <rect x="215" y="67" width="80" height="26" fill="#0284c7" fillOpacity={step === 2 ? 0.9 : 0.25} rx="3" />
            <text x="255" y="83" textAnchor="middle" fontSize="8" fontWeight="bold" fill="white" fontFamily="monospace">
              III. Dianoia (Mathe)
            </text>

            {/* Step IV: Die Idee des Guten (Sonne) */}
            <circle cx="365" cy="40" r={sunGlow} fill="#facc15" fillOpacity="0.4" />
            <circle cx="365" cy="40" r="16" fill="#facc15" stroke="#ca8a04" strokeWidth="1.5" />
            <text x="365" y="43" textAnchor="middle" fontSize="7.5" fontWeight="bold" fill="#78350f" fontFamily="monospace">
              IV. SONNE
            </text>

            {/* Moving Philosopher / Soul (paideia) */}
            <circle
              cx={75 + step * 92}
              cy={155 - step * 38}
              r="7"
              fill="var(--accent)"
              stroke="var(--paper)"
              strokeWidth="2"
            />
            <text
              x={75 + step * 92}
              y={145 - step * 38}
              textAnchor="middle"
              fontSize="7.5"
              fontWeight="bold"
              fill="var(--accent)"
              fontFamily="monospace"
            >
              Erkenner
            </text>

            {/* Readout Badge */}
            <rect x="50" y="18" width="220" height="38" rx="3" fill="var(--surface)" stroke="var(--line)" />
            <text x="60" y="32" fontSize="8" fill="var(--gray)" fontFamily="monospace">
              Platons Paideia: {step < 2 ? "Sinnenwelt (Doxa / Schein)" : "Ideenwelt (Episteme / Wahrheit)"}
            </text>
            <text x="60" y="46" fontSize="9" fontWeight="bold" fill="var(--ink)" fontFamily="monospace">
              {data.rateValue}
            </text>
          </svg>
        );
      }

      // 35. 哲学：社会契约谱系 (Staatsvertrag)
      case "staatsvertrag": {
        const pA = paramA; // 0 to 100
        const hobbesActive = pA < 35;
        const lockeActive = pA >= 35 && pA < 70;
        const rousseauActive = pA >= 70;
        const freiheitAbgabe = paramB;

        return (
          <svg className="w-full h-64 sm:h-72 rounded bg-[var(--paper-subtle)]/40 border border-[var(--line)]/50" viewBox="0 0 440 200">
            {/* Axis timeline connecting the 3 philosophers */}
            <line x1="60" y1="80" x2="380" y2="80" stroke="var(--ink)" strokeWidth="2" />

            {/* Node 1: Hobbes (Leviathan) */}
            <circle cx="100" cy="80" r={hobbesActive ? 20 : 14} fill={hobbesActive ? "#dc2626" : "#fee2e2"} stroke="#dc2626" strokeWidth="2" />
            <text x="100" y="84" textAnchor="middle" fontSize={hobbesActive ? "10" : "8"} fontWeight="bold" fill={hobbesActive ? "white" : "#dc2626"} fontFamily="monospace">
              Hobbes
            </text>
            <text x="100" y="115" textAnchor="middle" fontSize="7" fill="var(--gray)" fontFamily="monospace">Leviathan</text>
            <text x="100" y="125" textAnchor="middle" fontSize="6.5" fill="var(--gray)" fontFamily="monospace">(Sicherheit)</text>

            {/* Node 2: Locke (Zwei Abhandlungen) */}
            <circle cx="220" cy="80" r={lockeActive ? 20 : 14} fill={lockeActive ? "#0284c7" : "#e0f2fe"} stroke="#0284c7" strokeWidth="2" />
            <text x="220" y="84" textAnchor="middle" fontSize={lockeActive ? "10" : "8"} fontWeight="bold" fill={lockeActive ? "white" : "#0284c7"} fontFamily="monospace">
              Locke
            </text>
            <text x="220" y="115" textAnchor="middle" fontSize="7" fill="var(--gray)" fontFamily="monospace">Gewaltenteilung</text>
            <text x="220" y="125" textAnchor="middle" fontSize="6.5" fill="var(--gray)" fontFamily="monospace">(Eigentum/Rechte)</text>

            {/* Node 3: Rousseau (Contrat Social) */}
            <circle cx="340" cy="80" r={rousseauActive ? 20 : 14} fill={rousseauActive ? "#16a34a" : "#dcfce7"} stroke="#16a34a" strokeWidth="2" />
            <text x="340" y="84" textAnchor="middle" fontSize={rousseauActive ? "10" : "8"} fontWeight="bold" fill={rousseauActive ? "white" : "#16a34a"} fontFamily="monospace">
              Rousseau
            </text>
            <text x="340" y="115" textAnchor="middle" fontSize="7" fill="var(--gray)" fontFamily="monospace">Gemeinwille</text>
            <text x="340" y="125" textAnchor="middle" fontSize="6.5" fill="var(--gray)" fontFamily="monospace">(Volkssouveränität)</text>

            {/* Current Position Cursor */}
            <circle cx={60 + (pA / 100) * 320} cy="80" r="7" fill="var(--accent)" stroke="var(--paper)" strokeWidth="2" />

            {/* Bottom info readout */}
            <rect x="70" y="145" width="300" height="42" rx="3" fill="var(--surface)" stroke="var(--line)" />
            <text x="220" y="160" textAnchor="middle" fontSize="8" fill="var(--gray)" fontFamily="monospace">
              Freiheitsabgabe: {freiheitAbgabe}% | Herrschaftsform:
            </text>
            <text x="220" y="176" textAnchor="middle" fontSize="10" fontWeight="bold" fill="var(--ink)" fontFamily="monospace">
              {data.rateValue}
            </text>
          </svg>
        );
      }

      // 36. 哲学：罗尔斯无知之幕天平 (Rawls)
      case "rawls": {
        const schleierAktiv = paramA > 40;
        const diffPrinzip = paramB; // 0 to 100% transfer
        const minIncome = Math.round(20 + (diffPrinzip / 100) * 55); // worst-off income

        return (
          <svg className="w-full h-64 sm:h-72 rounded bg-[var(--paper-subtle)]/40 border border-[var(--line)]/50" viewBox="0 0 440 200">
            {/* The Veil of Ignorance Curtain / Cloud */}
            <rect
              x="50"
              y="30"
              width="340"
              height="80"
              rx="6"
              fill="#1e293b"
              fillOpacity={schleierAktiv ? 0.9 : 0.15}
              stroke="var(--ink)"
              strokeWidth="1.5"
            />
            <text
              x="220"
              y="60"
              textAnchor="middle"
              fontSize="11"
              fontWeight="bold"
              fill={schleierAktiv ? "#f8fafc" : "#64748b"}
              fontFamily="monospace"
            >
              {schleierAktiv ? "SCHLEIER DES NICHTWISSENS (VEIL OF IGNORANCE)" : "KEIN SCHLEIER: STATUS & TALENTE BEKANNT"}
            </text>
            <text
              x="220"
              y="78"
              textAnchor="middle"
              fontSize="8"
              fill={schleierAktiv ? "#94a3b8" : "#94a3b8"}
              fontFamily="monospace"
            >
              {schleierAktiv ? "Niemand kennt seine spätere Klasse, Hautfarbe oder Gesundheit" : "Privilegierte Schichten blockieren Umverteilung"}
            </text>

            {/* Maximin distribution bars under the veil */}
            {/* Worst-off group */}
            <rect x="80" y={170 - minIncome} width="55" height={minIncome} fill="#16a34a" rx="2" />
            <text x="107" y="165 - minIncome - 4" textAnchor="middle" fontSize="8" fontWeight="bold" fill="#16a34a" fontFamily="monospace">
              {minIncome}
            </text>
            <text x="107" y="184" textAnchor="middle" fontSize="7" fill="var(--ink)" fontFamily="monospace">
              Ärmste (Min)
            </text>

            {/* Middle group */}
            <rect x="180" y="170 - (minIncome + 25)" width="55" height={minIncome + 25} fill="#0284c7" rx="2" />
            <text x="207" y={170 - (minIncome + 25) - 4} textAnchor="middle" fontSize="8" fontWeight="bold" fill="#0284c7" fontFamily="monospace">
              {minIncome + 25}
            </text>
            <text x="207" y="184" textAnchor="middle" fontSize="7" fill="var(--ink)" fontFamily="monospace">
              Mitte
            </text>

            {/* Richest group */}
            <rect x="280" y="170 - Math.min(100, minIncome + 50)" width="55" height={Math.min(100, minIncome + 50)} fill="#f59e0b" rx="2" />
            <text x="307" y={170 - Math.min(100, minIncome + 50) - 4} textAnchor="middle" fontSize="8" fontWeight="bold" fill="#b45309" fontFamily="monospace">
              {Math.min(100, minIncome + 50)}
            </text>
            <text x="307" y="184" textAnchor="middle" fontSize="7" fill="var(--ink)" fontFamily="monospace">
              Reichste
            </text>

            {/* Verdict Box */}
            <rect x="350" y="125" width="80" height="55" rx="3" fill="var(--surface)" stroke="var(--line)" />
            <text x="390" y="142" textAnchor="middle" fontSize="7" fill="var(--gray)" fontFamily="monospace">Maximin:</text>
            <text x="390" y="158" textAnchor="middle" fontSize="8" fontWeight="bold" fill={schleierAktiv ? "#16a34a" : "#dc2626"} fontFamily="monospace">
              {schleierAktiv ? "GERECHT" : "UNGERECHT"}
            </text>
          </svg>
        );
      }

      // 37. 哲学：波普尔黑天鹅证伪计数器 (Popper)
      case "popper": {
        const whiteCount = Math.round(10 + paramA * 99);
        const blackFound = paramB > 60;

        return (
          <svg className="w-full h-64 sm:h-72 rounded bg-[var(--paper-subtle)]/40 border border-[var(--line)]/50" viewBox="0 0 440 200">
            {/* Box 1: Induktive Verifikation (Weiße Schwäne) */}
            <rect x="50" y="35" width="155" height="115" rx="4" fill="var(--surface)" stroke="var(--ink)" strokeWidth="1.5" />
            <text x="127" y="55" textAnchor="middle" fontSize="8.5" fill="var(--gray)" fontFamily="monospace">
              Induktion: Beobachtungen
            </text>
            <text x="127" y="90" textAnchor="middle" fontSize="22" fontWeight="bold" fill="var(--ink)" fontFamily="monospace">
              n = {whiteCount}
            </text>
            <text x="127" y="110" textAnchor="middle" fontSize="8" fill="var(--ink)" fontFamily="monospace">
              weiße Schwäne 🦢
            </text>
            <text x="127" y="135" textAnchor="middle" fontSize="7" fill="var(--gray)" fontFamily="monospace">
              (Beweist die All-Aussage NIE!)
            </text>

            {/* Modus Tollens Arrow */}
            <line x1="210" y1="92" x2="230" y2="92" stroke="var(--ink)" strokeWidth="2" strokeDasharray="3,2" />

            {/* Box 2: Falsifikation (Schwarzer Schwan) */}
            <rect
              x="235"
              y="35"
              width="155"
              height="115"
              rx="4"
              fill={blackFound ? "#0f172a" : "var(--surface)"}
              stroke={blackFound ? "#dc2626" : "var(--line)"}
              strokeWidth={blackFound ? 2.5 : 1}
            />
            <text x="312" y="55" textAnchor="middle" fontSize="8.5" fill={blackFound ? "#f8fafc" : "var(--gray)"} fontFamily="monospace">
              Falsifikation: Gegenbeispiel
            </text>
            <text x="312" y="90" textAnchor="middle" fontSize="20" fontWeight="bold" fill={blackFound ? "#ef4444" : "var(--gray)"} fontFamily="monospace">
              {blackFound ? "1 SCHWARZER!" : "0 Gefunden"}
            </text>
            <text x="312" y="110" textAnchor="middle" fontSize="8" fill={blackFound ? "#fca5a5" : "var(--gray)"} fontFamily="monospace">
              {blackFound ? "Modus Tollens: ¬Q ⇒ ¬P" : "Suche nach Gegenbeispiel..."}
            </text>
            <text x="312" y="135" textAnchor="middle" fontSize="8" fontWeight="bold" fill={blackFound ? "#ef4444" : "var(--gray)"} fontFamily="monospace">
              {blackFound ? "THEORIE WIDERLEGT!" : "Vorläufig bewährt"}
            </text>

            {/* Readout */}
            <rect x="110" y="160" width="220" height="28" rx="3" fill="var(--surface)" stroke="var(--line)" />
            <text x="220" y="178" textAnchor="middle" fontSize="9" fontWeight="bold" fill={blackFound ? "#dc2626" : "var(--accent)"} fontFamily="monospace">
              {data.rateValue}
            </text>
          </svg>
        );
      }

      // 38. 哲学：阿伦特独立判断力齿轮 (Arendt)
      case "arendt": {
        const konformitaet = paramA; // 0 to 100%
        const urteilskraft = paramB; // 0 to 100%
        const isMitlaeufer = konformitaet > 50 && urteilskraft < 40;

        return (
          <svg className="w-full h-64 sm:h-72 rounded bg-[var(--paper-subtle)]/40 border border-[var(--line)]/50" viewBox="0 0 440 200">
            {/* Gear 1: Bureaucratic Machinery (Apparat) */}
            <circle cx="130" cy="95" r="45" fill="none" stroke="var(--ink)" strokeWidth="4" strokeDasharray="10,6" />
            <circle cx="130" cy="95" r="16" fill="var(--paper-subtle)" stroke="var(--ink)" strokeWidth="1.5" />
            <text x="130" y="99" textAnchor="middle" fontSize="7" fill="var(--gray)" fontFamily="monospace">Bürokratie</text>
            <text x="130" y="155" textAnchor="middle" fontSize="8" fill="var(--ink)" fontFamily="monospace">
              Konformitätsdruck: {konformitaet}%
            </text>

            {/* Connection: Mesh or Broken */}
            {isMitlaeufer ? (
              <text x="215" y="98" textAnchor="middle" fontSize="8" fill="#dc2626" fontWeight="bold" fontFamily="monospace">
                ⚙️ Rädchen im Getriebe
              </text>
            ) : (
              <text x="215" y="98" textAnchor="middle" fontSize="8" fill="#16a34a" fontWeight="bold" fontFamily="monospace">
                ⚡ Entkoppelt (Reflexion)
              </text>
            )}

            {/* Gear 2: Individual Judgement (Urteilskraft / Gewissensdialog) */}
            <circle cx="300" cy="95" r="42" fill={isMitlaeufer ? "#fee2e2" : "#fef08a"} stroke={isMitlaeufer ? "#dc2626" : "#ca8a04"} strokeWidth="2.5" />
            <text x="300" y="90" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#78350f" fontFamily="monospace">
              Autonome
            </text>
            <text x="300" y="104" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#78350f" fontFamily="monospace">
              Urteilskraft
            </text>
            <text x="300" y="155" textAnchor="middle" fontSize="8" fill="var(--ink)" fontFamily="monospace">
              Reflexionsgrad: {urteilskraft}%
            </text>

            {/* Result Readout */}
            <rect x="90" y="165" width="260" height="26" rx="3" fill="var(--surface)" stroke="var(--line)" />
            <text x="220" y="182" textAnchor="middle" fontSize="9" fontWeight="bold" fill={isMitlaeufer ? "#dc2626" : "#16a34a"} fontFamily="monospace">
              Haltung: {data.rateValue}
            </text>
          </svg>
        );
      }

      // 39. 德语：弗赖塔格古典五幕金字塔 (Freytag)
      case "freytag": {
        const pA = paramA / 100;
        const curX = 50 + pA * 340;
        // Tension curve: rises up to x = 220 (Akt III), then falls down to 390
        const curY = pA < 0.5 ? 165 - (pA / 0.5) * 115 : 50 + ((pA - 0.5) / 0.5) * 115;
        const konfliktLevel = paramB / 100;

        return (
          <svg className="w-full h-64 sm:h-72 rounded bg-[var(--paper-subtle)]/40 border border-[var(--line)]/50" viewBox="0 0 440 200">
            {/* Pyramid Base & Sides */}
            <polygon points="50,165 220,50 390,165" fill="none" stroke="var(--ink)" strokeWidth="1.8" strokeOpacity="0.35" />
            <line x1="30" y1="165" x2="410" y2="165" stroke="var(--ink)" strokeWidth="1.5" />

            {/* Act Markers */}
            {/* I. Exposition */}
            <circle cx="50" cy="165" r="4" fill="var(--ink)" />
            <text x="50" y="180" textAnchor="middle" fontSize="8" fill="var(--ink)" fontFamily="monospace">I. Exposition</text>

            {/* II. Steigende Handlung */}
            <circle cx="135" cy="107" r="4" fill="var(--ink)" />
            <text x="105" y="96" textAnchor="middle" fontSize="8" fill="var(--ink)" fontFamily="monospace">II. Steigend</text>

            {/* III. Peripetie (Höhepunkt) */}
            <circle cx="220" cy="50" r="5.5" fill="#dc2626" />
            <text x="220" y="38" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#dc2626" fontFamily="monospace">
              III. Peripetie (Wendepunkt)
            </text>

            {/* IV. Fallende Handlung mit retardierendem Moment */}
            <circle cx="305" cy="107" r="4" fill="var(--ink)" />
            <text x="345" y="96" textAnchor="middle" fontSize="8" fill="var(--ink)" fontFamily="monospace">IV. Retardierend</text>

            {/* V. Katastrophe */}
            <circle cx="390" cy="165" r="4" fill="var(--ink)" />
            <text x="390" y="180" textAnchor="middle" fontSize="8" fill="var(--ink)" fontFamily="monospace">V. Katastrophe</text>

            {/* Dynamic Tension Path filled area */}
            <path
              d={`M 50 165 ${curX <= 220 ? `L ${curX} ${curY}` : `L 220 50 L ${curX} ${curY}`} L ${curX} 165 Z`}
              fill="var(--accent)"
              fillOpacity={0.15 + konfliktLevel * 0.15}
            />

            {/* Current Plot Head Tracking Point */}
            <circle cx={curX} cy={curY} r="7" fill="var(--accent)" stroke="var(--paper)" strokeWidth="2.5" />
            <line x1={curX} y1={curY} x2={curX} y2="165" stroke="var(--accent)" strokeWidth="1" strokeDasharray="2,2" strokeOpacity="0.6" />

            {/* Info badge */}
            <rect x="130" y="115" width="180" height="42" rx="3" fill="var(--surface)" stroke="var(--line)" />
            <text x="220" y="130" textAnchor="middle" fontSize="8" fill="var(--gray)" fontFamily="monospace">
              Spannung: {data.rateValue}
            </text>
            <text x="220" y="146" textAnchor="middle" fontSize="8.5" fontWeight="bold" fill="var(--accent)" fontFamily="monospace">
              {data.subValue}
            </text>
          </svg>
        );
      }

      // 40. 德语：音步格律波形 (Metrum)
      case "metrum": {
        const isMale = paramB > 50; // male (stumpf) vs female (klingend)
        const pA = paramA;
        // 0-25: Jambus (v -), 25-50: Trochäus (- v), 50-75: Daktylus (- v v), 75-100: Anapäst (v v -)
        const metrumType = pA < 25 ? "jambus" : pA < 50 ? "trochaeus" : pA < 75 ? "daktylus" : "anapaest";

        // Generate waveform peaks for 4 bars
        // For Jambus: [low, high, low, high, low, high, low, high]
        // For Trochäus: [high, low, high, low, high, low, high, low]
        // For Daktylus: [high, low, low, high, low, low, high, low, low]
        // For Anapäst: [low, low, high, low, low, high, low, low, high]
        let wavePath = "M 50 115 ";
        if (metrumType === "jambus") {
          wavePath = "M 50 135 Q 70 145 90 135 Q 115 60 140 135 Q 160 145 180 135 Q 205 60 230 135 Q 250 145 270 135 Q 295 60 320 135 Q 340 145 360 135 Q 385 60 400 135";
        } else if (metrumType === "trochaeus") {
          wavePath = "M 50 135 Q 75 60 100 135 Q 120 145 140 135 Q 165 60 190 135 Q 210 145 230 135 Q 255 60 280 135 Q 300 145 320 135 Q 345 60 370 135 Q 390 145 400 135";
        } else if (metrumType === "daktylus") {
          wavePath = "M 50 135 Q 75 55 100 135 Q 115 145 130 135 Q 145 145 160 135 Q 185 55 210 135 Q 225 145 240 135 Q 255 145 270 135 Q 295 55 320 135 Q 335 145 350 135 Q 365 145 380 135";
        } else {
          wavePath = "M 50 135 Q 65 145 80 135 Q 95 145 110 135 Q 135 55 160 135 Q 175 145 190 135 Q 205 145 220 135 Q 245 55 270 135 Q 285 145 300 135 Q 315 145 330 135 Q 355 55 380 135";
        }

        return (
          <svg className="w-full h-64 sm:h-72 rounded bg-[var(--paper-subtle)]/40 border border-[var(--line)]/50" viewBox="0 0 440 200">
            {/* Header */}
            <text x="220" y="32" textAnchor="middle" fontSize="10.5" fontWeight="bold" fill="var(--ink)" fontFamily="monospace">
              Versfuß: {data.paramAValueDisplay}
            </text>

            {/* Baseline */}
            <line x1="40" y1="135" x2="410" y2="135" stroke="var(--ink)" strokeWidth="1" strokeDasharray="3,3" strokeOpacity="0.4" />

            {/* Rhythm Waveform */}
            <path d={wavePath} fill="none" stroke="var(--accent)" strokeWidth="2.8" />

            {/* Legend annotations */}
            <text x="70" y="55" fontSize="8" fontWeight="bold" fill="var(--accent)" fontFamily="monospace">― (Hebung / betont)</text>
            <text x="70" y="165" fontSize="8" fill="var(--gray)" fontFamily="monospace">∪ (Senkung / unbetont)</text>

            {/* Kadenz Badge at the end */}
            <rect x="290" y="45" width="125" height="42" rx="3" fill="var(--surface)" stroke="var(--line)" />
            <text x="352" y="60" textAnchor="middle" fontSize="8" fill="var(--gray)" fontFamily="monospace">
              Kadenz am Versende:
            </text>
            <text x="352" y="75" textAnchor="middle" fontSize="9" fontWeight="bold" fill={isMale ? "#dc2626" : "#0284c7"} fontFamily="monospace">
              {isMale ? "Männlich (stumpf ―)" : "Weiblich (klingend ― ∪)"}
            </text>
          </svg>
        );
      }

      // 41. 德语：布莱希特间离效果舞台 (Brecht)
      case "brecht": {
        const vEffekt = paramB > 45;
        const katharsis = paramA; // empathy vs detachment
        const curtainWidth = vEffekt ? 30 : 110; // open exposed stage vs closed illusion

        return (
          <svg className="w-full h-64 sm:h-72 rounded bg-[var(--paper-subtle)]/40 border border-[var(--line)]/50" viewBox="0 0 440 200">
            {/* Visible Spotlight Battery on Ceiling (anti-illusion) */}
            <line x1="50" y1="28" x2="390" y2="28" stroke="var(--ink)" strokeWidth="2" />
            {[80, 140, 200, 260, 320, 370].map((x, i) => (
              <circle key={i} cx={x} cy="28" r="5.5" fill={vEffekt ? "#facc15" : "#64748b"} stroke="var(--ink)" strokeWidth="1" />
            ))}
            <text x="220" y="18" textAnchor="middle" fontSize="7" fill="var(--gray)" fontFamily="monospace">
              Offen sichtbare Bühnentechnik (Entzauberung)
            </text>

            {/* Brecht Spruchband Banner */}
            <rect x="75" y="42" width="290" height="26" rx="2" fill="#1e293b" stroke="var(--line)" />
            <text x="220" y="58" textAnchor="middle" fontSize="8.5" fontWeight="bold" fill="#38bdf8" fontFamily="monospace">
              {vEffekt ? "[ TAFEL: DER MENSCH WIRD DURCH SEINE VERHÄLTNISSE GEFORMT ]" : "[ TRADITIONELLES BÜHNENBILD: SCHÖNE ILLUSION ]"}
            </text>

            {/* Stage Floor and Broken 4th Wall */}
            <polygon points="50,155 390,155 360,105 80,105" fill="var(--paper-subtle)" stroke="var(--ink)" strokeWidth="1.5" />
            
            {/* Curtains (half-drawn in illusion mode, pulled back in V-Effekt) */}
            <rect x="50" y="75" width={curtainWidth} height="70" fill="#7f1d1d" opacity="0.75" />
            <rect x={390 - curtainWidth} y="75" width={curtainWidth} height="70" fill="#7f1d1d" opacity="0.75" />
            <text x="220" y="92" textAnchor="middle" fontSize="7.5" fill="var(--ink)" fontFamily="monospace">
              Empathie: {katharsis}% · Epische Distanz: {paramB}%
            </text>

            <line x1="50" y1="155" x2="390" y2="155" stroke={vEffekt ? "#dc2626" : "var(--ink)"} strokeWidth={vEffekt ? 2.5 : 4} strokeDasharray={vEffekt ? "6,4" : "none"} />

            <text x="220" y="172" textAnchor="middle" fontSize="8" fontWeight="bold" fill={vEffekt ? "#dc2626" : "var(--gray)"} fontFamily="monospace">
              {vEffekt ? "⚡ VIERTE WAND ZERBROCHEN: Publikum als kritischer Begutachter" : "Guckkastenbühne: Vierte Wand geschlossen (Hypnose)"}
            </text>

            {/* Readout badge */}
            <text x="220" y="188" textAnchor="middle" fontSize="9" fontWeight="bold" fill="var(--accent)" fontFamily="monospace">
              {data.rateValue}
            </text>
          </svg>
        );
      }

      // 42. 德语：卡夫卡卧室平面图 (Kafka)
      case "kafka": {
        const entfremdung = Math.round(paramA * 0.6 + paramB * 0.4);
        const appleWound = paramA > 50;

        return (
          <svg className="w-full h-64 sm:h-72 rounded bg-[var(--paper-subtle)]/40 border border-[var(--line)]/50" viewBox="0 0 440 200">
            {/* The Samsa Apartment: Gregor's claustrophobic room in the center */}
            <rect x="115" y="25" width="210" height="145" fill="none" stroke="var(--ink)" strokeWidth="2.5" />
            <text x="220" y="18" textAnchor="middle" fontSize="8.5" fontWeight="bold" fill="var(--ink)" fontFamily="monospace">
              Gregor Samsas Zimmer (Entfremdung: {entfremdung}%)
            </text>

            {/* Door 1: Father's room (Left) */}
            <rect x="106" y="75" width="18" height="42" fill="#b91c1c" />
            <text x="80" y="98" textAnchor="end" fontSize="7" fill="#b91c1c" fontFamily="monospace">
              Tür Vater 🔒
            </text>

            {/* Door 2: Living room / Boss (Bottom) */}
            <rect x="195" y="160" width="50" height="18" fill="#b91c1c" />
            <text x="220" y="190" textAnchor="middle" fontSize="7" fill="#b91c1c" fontFamily="monospace">
              Tür Wohnzimmer (Prokurist) 🔒
            </text>

            {/* Door 3: Grete's room (Right) */}
            <rect x="316" y="75" width="18" height="42" fill="#b91c1c" />
            <text x="345" y="98" fontSize="7" fill="#b91c1c" fontFamily="monospace">
              🔒 Tür Schwester
            </text>

            {/* Gregor as monstrous vermin (Ungeziefer) on the floor */}
            <ellipse cx="220" cy="95" rx={18 + (entfremdung / 100) * 8} ry={11 + (entfremdung / 100) * 5} fill="#451a03" stroke="#291102" strokeWidth="2" />
            {/* Vermin legs */}
            {[-12, -4, 4, 12].map((xOff, i) => (
              <g key={i}>
                <line x1={220 + xOff} y1={85} x2={220 + xOff * 1.3} y2={76} stroke="#451a03" strokeWidth="1.5" />
                <line x1={220 + xOff} y1={105} x2={220 + xOff * 1.3} y2={114} stroke="#451a03" strokeWidth="1.5" />
              </g>
            ))}

            {/* Rotten apple lodged in back if paramA is high */}
            {appleWound && (
              <g>
                <circle cx="228" cy="93" r="5" fill="#dc2626" />
                <circle cx="228" cy="93" r="2" fill="#facc15" />
                <text x="220" y="132" textAnchor="middle" fontSize="7.5" fontWeight="bold" fill="#dc2626" fontFamily="monospace">
                  Faulender Apfel im Fleisch
                </text>
              </g>
            )}

            {/* Status Readout Badge */}
            <rect x="25" y="25" width="85" height="35" rx="3" fill="var(--surface)" stroke="var(--line)" />
            <text x="67" y="38" textAnchor="middle" fontSize="7" fill="var(--gray)" fontFamily="monospace">Daseinsform:</text>
            <text x="67" y="52" textAnchor="middle" fontSize="8" fontWeight="bold" fill="var(--ink)" fontFamily="monospace">
              {entfremdung > 70 ? "Ungeziefer" : "Restmensch"}
            </text>
          </svg>
        );
      }

      // 43. 德语：博尔歇特废墟文学零度语言 (Trümmerliteratur)
      case "borchert": {
        const kahlschlag = paramA; // language stripping
        const trauma = paramB; // veteran trauma

        return (
          <svg className="w-full h-64 sm:h-72 rounded bg-[var(--paper-subtle)]/40 border border-[var(--line)]/50" viewBox="0 0 440 200">
            {/* Bombed City Ruins Silhouettes */}
            <polygon points="50,170 80,75 105,130 135,55 170,170" fill="#334155" />
            <polygon points="265,170 295,85 325,135 355,65 390,170" fill="#475569" />

            {/* Beckmann's Closed Door (Draußen vor der Tür) */}
            <rect x="185" y="50" width="70" height="120" rx="2" fill="#0f172a" stroke="var(--ink)" strokeWidth="2.5" />
            <circle cx="240" cy="115" r="4" fill="#facc15" />
            <text x="220" y="42" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#dc2626" fontFamily="monospace">
              Draußen vor der Tür
            </text>

            {/* Beckmann's Broken Mask / Gasmask Glasses */}
            <circle cx="140" cy="150" r="10" fill="none" stroke="#94a3b8" strokeWidth="2" />
            <circle cx="165" cy="150" r="10" fill="none" stroke="#94a3b8" strokeWidth="2" />
            <line x1="150" y1="150" x2="155" y2="150" stroke="#94a3b8" strokeWidth="2" />

            {/* Readout Card */}
            <rect x="75" y="145" width="290" height="38" rx="3" fill="var(--surface)" stroke="var(--line)" />
            <text x="220" y="159" textAnchor="middle" fontSize="8" fill="var(--gray)" fontFamily="monospace">
              Kahlschlag der Sprache: {kahlschlag}% | Trauma: {trauma}%
            </text>
            <text x="220" y="173" textAnchor="middle" fontSize="9.5" fontWeight="bold" fill="var(--accent)" fontFamily="monospace">
              {data.rateValue} (Stakkato-Sätze)
            </text>
          </svg>
        );
      }

      // 44. 德语：图尔敏论证模型 (Toulmin)
      case "toulmin": {
        const datumStaerke = paramA; // 0 to 100%
        const einwandStaerke = paramB; // 0 to 100%
        const isSchluessig = datumStaerke > 40 && einwandStaerke < 60;

        return (
          <svg className="w-full h-64 sm:h-72 rounded bg-[var(--paper-subtle)]/40 border border-[var(--line)]/50" viewBox="0 0 440 200">
            {/* Box 1: Datum (Facts / Evidence) */}
            <rect x="35" y="45" width="90" height="42" rx="3" fill="var(--paper)" stroke="var(--ink)" strokeWidth="1.6" />
            <text x="80" y="64" textAnchor="middle" fontSize="9" fontWeight="bold" fill="var(--ink)" fontFamily="monospace">Datum (Fakt)</text>
            <text x="80" y="77" textAnchor="middle" fontSize="7.5" fill="var(--gray)" fontFamily="monospace">Evidenz: {datumStaerke}%</text>

            {/* Arrow to Warrant */}
            <line x1="125" y1="66" x2="175" y2="66" stroke="var(--ink)" strokeWidth="2" />
            <polygon points="175,66 168,62 168,70" fill="var(--ink)" />

            {/* Box 2: Warrant (Schlussregel) */}
            <rect x="175" y="45" width="105" height="42" rx="3" fill="#fef08a" stroke="#ca8a04" strokeWidth="1.6" />
            <text x="227" y="64" textAnchor="middle" fontSize="8.5" fontWeight="bold" fill="#78350f" fontFamily="monospace">Warrant (Regel)</text>
            <text x="227" y="77" textAnchor="middle" fontSize="7.5" fill="#78350f" fontFamily="monospace">Schlusslogik</text>

            {/* Arrow to Claim */}
            <line x1="280" y1="66" x2="330" y2="66" stroke="var(--ink)" strokeWidth="2" />
            <polygon points="330,66 323,62 323,70" fill="var(--ink)" />

            {/* Box 3: Claim (These) */}
            <rect x="330" y="45" width="85" height="42" rx="3" fill={isSchluessig ? "#dcfce7" : "#fee2e2"} stroke={isSchluessig ? "#16a34a" : "#dc2626"} strokeWidth="2" />
            <text x="372" y="64" textAnchor="middle" fontSize="9" fontWeight="bold" fill={isSchluessig ? "#15803d" : "#b91c1c"} fontFamily="monospace">
              Claim (These)
            </text>
            <text x="372" y="77" textAnchor="middle" fontSize="7.5" fontWeight="bold" fill={isSchluessig ? "#16a34a" : "#dc2626"} fontFamily="monospace">
              {isSchluessig ? "Gültig" : "Wackelig"}
            </text>

            {/* Backing (Stütze von Warrant) */}
            <line x1="227" y1="87" x2="227" y2="125" stroke="var(--ink)" strokeWidth="1.5" strokeDasharray="3,3" />
            <rect x="175" y="125" width="105" height="35" rx="3" fill="var(--paper-subtle)" stroke="var(--line)" />
            <text x="227" y="146" textAnchor="middle" fontSize="8" fill="var(--gray)" fontFamily="monospace">Backing (Stütze)</text>

            {/* Rebuttal (Einwand gegen Claim) */}
            <line x1="372" y1="87" x2="372" y2="125" stroke="#dc2626" strokeWidth="1.5" strokeDasharray="3,3" />
            <rect x="325" y="125" width="95" height="35" rx="3" fill="#fee2e2" stroke="#dc2626" strokeWidth="1" />
            <text x="372" y="142" textAnchor="middle" fontSize="7.5" fill="#b91c1c" fontFamily="monospace">Rebuttal ({einwandStaerke}%)</text>
            <text x="372" y="153" textAnchor="middle" fontSize="7" fill="#b91c1c" fontFamily="monospace">Einwand</text>

            {/* Overall Verdict Badge */}
            <rect x="60" y="130" width="100" height="30" rx="3" fill="var(--surface)" stroke="var(--line)" />
            <text x="110" y="149" textAnchor="middle" fontSize="8.5" fontWeight="bold" fill={isSchluessig ? "#16a34a" : "#dc2626"} fontFamily="monospace">
              {isSchluessig ? "✓ Schlüssig" : "⚠ Anfechtbar"}
            </text>
          </svg>
        );
      }

      // 默认精密科学测量刻度与响应示波器
      default: {
        return (
          <div className="flex flex-col gap-2">
            {sim.formula && (
              <div className="flex items-center justify-between px-3 py-1.5 rounded bg-[var(--paper-subtle)] border border-[var(--line)] text-xs font-mono">
                <span className="text-[var(--gray)] font-semibold">{de ? "Formel / Modellgesetz:" : "数学/物理模型公式："}</span>
                <MathHtml code={sim.formula} display={false} cacheKey={`universal-formula:${sim.id}`} />
              </div>
            )}
            <svg className="w-full h-64 sm:h-72 rounded bg-[var(--paper-subtle)]/40 border border-[var(--line)]/50 select-none" viewBox="0 0 440 200">
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
              <text x="50" y="32" fontSize="9" fill="var(--gray)" fontFamily="monospace">
                f(x) · y = {data.rateValue}
              </text>
              <text x="405" y="185" textAnchor="end" fontSize="8" fill="var(--gray)" fontFamily="monospace">
                x →
              </text>
            </svg>
          </div>
        );
      }
    }
  };


  const handleExport = () => {
    const text = `[${sim.fach} Labor] ${de ? sim.titleDE : sim.titleZH}
- ${de ? data.paramALabelDE : data.paramALabelZH}: ${data.paramAValueDisplay}
- ${de ? data.paramBLabelDE : data.paramBLabelZH}: ${data.paramBValueDisplay}
- ${de ? data.rateLabelDE : data.rateLabelZH}: ${data.rateValue}
- ${de ? data.subLabelDE : data.subLabelZH}: ${data.subValue}
- Erkenntnis: ${de ? data.insightDE : data.insightZH}`;
    if (onExportFinding) {
      onExportFinding(text);
    } else {
      navigator.clipboard.writeText(text);
      alert(de ? "Messdaten in Zwischenablage kopiert!" : "实验测定数据已复制到剪贴板！");
    }
  };

  return (
    <div className="flex flex-col gap-4 rounded-lg border border-[var(--line)] bg-[var(--surface)] p-5 transition-all">
      {/* 顶部标题栏与三维 Tab 导航 */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-[var(--line)] pb-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs uppercase font-semibold text-[var(--accent)] px-2 py-0.5 rounded border border-[var(--accent)]/30 bg-[var(--accent)]/5">
              {sim.fach} · {de ? sim.kategorieDE : sim.kategorieZH}
            </span>
            <span className="font-mono text-xs px-2 py-0.5 rounded border border-[var(--line)] bg-[var(--paper-subtle)] text-[var(--ink)]">
              {sim.stufe}
            </span>
            {sim.formula && (
              <span className="hidden sm:inline-flex items-center font-mono text-[11px] text-[var(--gray)] bg-[var(--paper-subtle)]/70 px-2 py-0.5 rounded border border-[var(--line)]/50">
                <MathHtml code={sim.formula} display={false} cacheKey={`header-formula:${sim.id}`} />
              </span>
            )}
          </div>
          <h2 className="font-serif text-lg font-bold text-[var(--ink)] mt-1.5">
            {de ? sim.titleDE : sim.titleZH}
          </h2>
        </div>

        {/* 顶部三大学习维度选项卡 */}
        <div className="flex items-center bg-[var(--paper-subtle)] p-1 rounded-md border border-[var(--line)] text-xs font-mono">
          <button
            type="button"
            onClick={() => setActiveTab("workbench")}
            className={`px-3 py-1.5 rounded transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTab === "workbench"
                ? "bg-[var(--surface)] text-[var(--accent)] font-bold shadow-xs border border-[var(--line)]/50"
                : "text-[var(--gray)] hover:text-[var(--ink)]"
            }`}
          >
            <span>🔬</span>
            <span>{de ? "Interaktives Labor" : "互动实验台"}</span>
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
            <span>{de ? "Kausalität & Phänomen" : "因果推演与机理"}</span>
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
      {/* TAB 1: 🔬 互动实验台 (Labor-Workbench) */}
      {/* ===================================================================== */}
      {activeTab === "workbench" && (
        <div className="flex flex-col gap-4">
          {/* 预设工况快速直达选择条 (Presets) */}
          <div className="flex flex-wrap items-center gap-2 p-2.5 rounded-lg border border-[var(--line)]/60 bg-[var(--paper-subtle)]/40">
            <span className="text-xs font-mono text-[var(--gray)] mr-1 flex items-center gap-1">
              ⚡ <span>{de ? "Szenarien / Presets:" : "典型工况直达:"}</span>
            </span>
            {pedagogy.presets.map((p) => {
              const isActive = paramA === p.paramA && paramB === p.paramB;
              return (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => handleApplyPreset(p)}
                  title={de ? p.descDE : p.descZH}
                  className={`text-xs font-mono px-3 py-1 rounded border transition-all cursor-pointer ${
                    isActive
                      ? "border-[var(--accent)] bg-[var(--surface)] text-[var(--accent)] font-bold shadow-xs"
                      : "border-[var(--line)] bg-[var(--surface)]/70 text-[var(--ink)] hover:border-[var(--accent)]/50 hover:bg-[var(--surface)]"
                  }`}
                >
                  {de ? p.nameDE : p.nameZH}
                </button>
              );
            })}
            <button
              type="button"
              onClick={() => {
                setParamA(50);
                setParamB(50);
              }}
              className="text-xs font-mono px-2 py-1 rounded text-[var(--gray)] hover:text-[var(--ink)] ml-auto cursor-pointer"
            >
              ↺ {de ? "Reset (50/50)" : "重置基准"}
            </button>
          </div>

          {/* 仿真画布与悬浮 HUD 状态指示区 */}
          <div className="relative rounded-lg border border-[var(--line)] bg-[var(--surface)] overflow-hidden">
            {/* 顶部悬浮 HUD 读数与状态徽标 */}
            <div className="p-3 border-b border-[var(--line)]/60 bg-[var(--paper-subtle)]/30 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <span
                  className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-mono font-medium border ${
                    taskAchieved
                      ? "border-[var(--line)] bg-[var(--paper-subtle)] text-[var(--ink)] font-semibold"
                      : "border-[var(--line)] bg-[var(--paper)] text-[var(--gray)]"
                  }`}
                >
                  <span className={`w-1.5 h-1.5 rounded-full ${taskAchieved ? "bg-[var(--ink)]" : "bg-[var(--gray)] animate-pulse"}`} />
                  {taskAchieved
                    ? de
                      ? "Zielzustand erreicht"
                      : "达成目标工况"
                    : de
                    ? "In Anpassung..."
                    : "运行调整中"}
                </span>
                <span className="text-xs font-mono text-[var(--gray)] hidden sm:inline">
                  A: {data.paramAValueDisplay} | B: {data.paramBValueDisplay}
                </span>
              </div>

              {/* 关键测定物理量读数 */}
              <div className="flex items-center gap-2 font-mono">
                <div className="rounded border border-[var(--line)] bg-[var(--surface)] px-2.5 py-1 text-right">
                  <span className="text-[10px] text-[var(--gray)] block">
                    {de ? data.rateLabelDE : data.rateLabelZH}
                  </span>
                  <span className="text-xs font-bold text-[var(--ink)]">
                    {data.rateValue}
                  </span>
                </div>
                <div className="rounded border border-[var(--line)] bg-[var(--surface)] px-2.5 py-1 text-right">
                  <span className="text-[10px] text-[var(--gray)] block">
                    {de ? data.subLabelDE : data.subLabelZH}
                  </span>
                  <span className="text-xs font-semibold text-[var(--accent)]">
                    {data.subValue}
                  </span>
                </div>
              </div>
            </div>

            {/* 核心视觉高保真 SVG 仿真工作台 */}
            <div className="p-2 sm:p-4 flex items-center justify-center bg-[var(--surface)]">
              {renderArchetypeCanvas()}
            </div>
          </div>

          {/* 双通道精密微调滑块与微调步进按钮 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 rounded-lg border border-[var(--line)]/70 bg-[var(--paper-subtle)]/30 p-4">
            {/* 控制参数 A */}
            <div className="space-y-2 font-mono">
              <div className="flex justify-between items-center text-xs">
                <span className="text-[var(--ink)] font-semibold flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[var(--accent)]" />
                  {de ? data.paramALabelDE : data.paramALabelZH}
                </span>
                <span className="text-[var(--accent)] font-bold px-2 py-0.5 rounded bg-[var(--surface)] border border-[var(--line)]">
                  {data.paramAValueDisplay}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleStepA(-5)}
                  className="w-7 h-7 rounded border border-[var(--line)] bg-[var(--surface)] hover:border-[var(--accent)] text-xs font-bold text-[var(--ink)] cursor-pointer flex items-center justify-center shrink-0"
                  title="-5"
                >
                  -
                </button>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={paramA}
                  onChange={(e) => setParamA(Number(e.target.value))}
                  className="w-full h-2 bg-[var(--line)] rounded-lg appearance-none cursor-pointer accent-[var(--accent)]"
                />
                <button
                  type="button"
                  onClick={() => handleStepA(+5)}
                  className="w-7 h-7 rounded border border-[var(--line)] bg-[var(--surface)] hover:border-[var(--accent)] text-xs font-bold text-[var(--ink)] cursor-pointer flex items-center justify-center shrink-0"
                  title="+5"
                >
                  +
                </button>
              </div>
            </div>

            {/* 控制参数 B */}
            <div className="space-y-2 font-mono">
              <div className="flex justify-between items-center text-xs">
                <span className="text-[var(--ink)] font-semibold flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[var(--ink)]" />
                  {de ? data.paramBLabelDE : data.paramBLabelZH}
                </span>
                <span className="text-[var(--accent)] font-bold px-2 py-0.5 rounded bg-[var(--surface)] border border-[var(--line)]">
                  {data.paramBValueDisplay}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleStepB(-5)}
                  className="w-7 h-7 rounded border border-[var(--line)] bg-[var(--surface)] hover:border-[var(--accent)] text-xs font-bold text-[var(--ink)] cursor-pointer flex items-center justify-center shrink-0"
                  title="-5"
                >
                  -
                </button>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={paramB}
                  onChange={(e) => setParamB(Number(e.target.value))}
                  className="w-full h-2 bg-[var(--line)] rounded-lg appearance-none cursor-pointer accent-[var(--accent)]"
                />
                <button
                  type="button"
                  onClick={() => handleStepB(+5)}
                  className="w-7 h-7 rounded border border-[var(--line)] bg-[var(--surface)] hover:border-[var(--accent)] text-xs font-bold text-[var(--ink)] cursor-pointer flex items-center justify-center shrink-0"
                  title="+5"
                >
                  +
                </button>
              </div>
            </div>
          </div>

          {/* 🎯 探究挑战任务卡片 (Challenge Task) */}
          <div className="rounded-lg border border-[var(--line)] bg-[var(--surface)] p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
            <div className="space-y-1">
              <div className="flex items-center gap-2 font-mono">
                <span className="font-bold text-[var(--ink)]">🎯 {de ? "Forschungsauftrag:" : "本实验探究挑战目标:"}</span>
                <span
                  className={`px-2 py-0.5 rounded text-[11px] font-mono font-bold border ${
                    taskAchieved
                      ? "border-[var(--line)] bg-[var(--paper-subtle)] text-[var(--ink)]"
                      : "border-[var(--line)] bg-[var(--paper-subtle)] text-[var(--gray)]"
                  }`}
                >
                  {taskAchieved ? (de ? "✓ Erreicht" : "✓ 成功达成") : (de ? "⏳ In Arbeit" : "⏳ 探索调整中")}
                </span>
              </div>
              <p className="text-[var(--gray)] leading-relaxed">
                {taskAchieved ? (de ? pedagogy.task.successMsgDE : pedagogy.task.successMsgZH) : (de ? pedagogy.task.goalDE : pedagogy.task.goalZH)}
              </p>
            </div>

            <button
              type="button"
              onClick={handleExport}
              className="whitespace-nowrap px-3.5 py-2 font-mono text-xs rounded border border-[var(--line)] hover:border-[var(--accent)] hover:text-[var(--accent)] bg-[var(--paper-subtle)] transition-colors self-end sm:self-auto cursor-pointer"
            >
              {de ? "Daten kopieren" : "导出测定数据"}
            </button>
          </div>

          {/* 考纲考点解剖条 */}
          <div className="rounded border border-[var(--line)]/50 bg-[var(--paper-subtle)]/40 p-3 text-xs font-sans text-[var(--gray)] leading-relaxed">
            <span className="font-semibold text-[var(--ink)] font-mono mr-1.5">
              {de ? "Klausur-Erkenntnis:" : "会考原题命题陷阱与考点剖析:"}
            </span>
            {de ? data.insightDE : data.insightZH}
          </div>
        </div>
      )}

      {/* ===================================================================== */}
      {/* TAB 2: 📖 现象推演与微观因果 (Phänomen & Kausalität) */}
      {/* ===================================================================== */}
      {activeTab === "causality" && (
        <div className="flex flex-col gap-4">
          {/* 1. 因果动态推演链 */}
          <div className="rounded-lg border border-[var(--line)] bg-[var(--surface)] p-4 space-y-2">
            <h3 className="font-serif text-sm font-bold text-[var(--ink)] flex items-center gap-2">
              <span className="text-[var(--accent)] font-mono">01.</span>
              {de ? "Phänomenologische Kausalkette (Wenn-Dann-Analyse)" : "动态因果推演链 (Wenn-Dann 推理)"}
            </h3>
            <div className="rounded bg-[var(--paper-subtle)]/60 p-3 text-xs font-sans text-[var(--ink)] leading-relaxed border border-[var(--line)]/50">
              <p className="mb-2">
                <strong className="font-mono text-[var(--accent)]">DE: </strong>
                {pedagogy.causality.phenomenonDE}
              </p>
              <p>
                <strong className="font-mono text-[var(--accent)]">ZH: </strong>
                {pedagogy.causality.phenomenonZH}
              </p>
            </div>
          </div>

          {/* 2. 微观本质机制剖析 */}
          <div className="rounded-lg border border-[var(--line)] bg-[var(--surface)] p-4 space-y-2">
            <h3 className="font-serif text-sm font-bold text-[var(--ink)] flex items-center gap-2">
              <span className="text-[var(--accent)] font-mono">02.</span>
              {de ? "Mikroskopischer Mechanismus & Didaktische Erklärung" : "微观本质机制与学科底层逻辑"}
            </h3>
            <div className="rounded bg-[var(--paper-subtle)]/60 p-3 text-xs font-sans text-[var(--gray)] leading-relaxed border border-[var(--line)]/50 space-y-2">
              <p className="text-[var(--ink)]">
                <span className="font-bold text-[var(--ink)] block mb-1 font-mono">Wissenschaftliche Erklärung:</span>
                {de ? pedagogy.causality.mechanismDE : pedagogy.causality.mechanismZH}
              </p>
            </div>
          </div>

          {/* 3. 核心专业术语表 */}
          <div className="rounded-lg border border-[var(--line)] bg-[var(--surface)] p-4 space-y-3">
            <h3 className="font-serif text-sm font-bold text-[var(--ink)] flex items-center gap-2">
              <span className="text-[var(--accent)] font-mono">03.</span>
              {de ? "Fachbegriffe & Vokabular" : "官方考纲核心术语与定义"}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {pedagogy.causality.fachbegriffe.map((fb, idx) => (
                <div
                  key={idx}
                  className="rounded border border-[var(--line)] bg-[var(--paper-subtle)]/40 p-2.5 text-xs font-mono space-y-1"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-[var(--ink)]">{fb.term}</span>
                    <span className="text-[var(--accent)] text-[11px] font-sans">{fb.zh}</span>
                  </div>
                  <p className="text-[var(--gray)] font-sans text-[11px] leading-relaxed">
                    {fb.def}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ===================================================================== */}
      {/* TAB 3: 📝 会考真题与采分标准 (Klausur & EHZ-Standard) */}
      {/* ===================================================================== */}
      {activeTab === "klausur" && (
        <div className="flex flex-col gap-4">
          {/* 会考原题题干与分值 */}
          <div className="rounded-lg border border-[var(--line)] bg-[var(--surface)] p-4 space-y-3">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <span className="font-mono text-xs uppercase px-2 py-0.5 rounded border border-[var(--accent)]/40 text-[var(--accent)] font-bold">
                NRW Klausuraufgabe · {pedagogy.klausur.afb}
              </span>
              <span className="font-mono text-xs font-bold text-[var(--ink)] bg-[var(--paper-subtle)] px-2 py-0.5 rounded border border-[var(--line)]">
                {pedagogy.klausur.points} Punkte
              </span>
            </div>
            <div className="text-xs font-sans text-[var(--ink)] leading-relaxed space-y-1.5 p-3 rounded bg-[var(--paper-subtle)]/60 border border-[var(--line)]/50">
              <p className="font-semibold text-[var(--ink)]">
                <span className="font-mono text-[var(--accent)] mr-1">Aufgabe:</span>
                {de ? pedagogy.klausur.promptDE : pedagogy.klausur.promptZH}
              </p>
            </div>
          </div>

          {/* 阅卷评分细则 (Erwartungshorizont - EHZ) */}
          <div className="rounded-lg border border-[var(--line)] bg-[var(--surface)] p-4 space-y-2">
            <h3 className="font-serif text-sm font-bold text-[var(--ink)] flex items-center gap-2">
              <span className="text-emerald-600 font-mono">EHZ</span>
              {de ? "Erwartungshorizont (Kriterienkatalog)" : "官方阅卷采分要点 (Erwartungshorizont)"}
            </h3>
            <ul className="space-y-2 text-xs font-sans text-[var(--gray)]">
              {(de ? pedagogy.klausur.erwartungshorizontDE : pedagogy.klausur.erwartungshorizontZH).map((item, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="font-mono font-bold text-[var(--accent)] shrink-0 mt-0.5">
                    [{idx + 1}]
                  </span>
                  <span className="leading-relaxed text-[var(--ink)]">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* 15分满分答题模版 (Formulierungshilfe) */}
          <div className="rounded-lg border border-[var(--line)] bg-[var(--surface)] p-4 space-y-2">
            <h3 className="font-serif text-sm font-bold text-[var(--ink)] flex items-center gap-2">
              <span className="text-[var(--accent)] font-mono">15 NP</span>
              {de ? "Muster-Formulierung (Oberstufe)" : "15分满分德语答题模版与得分话术"}
            </h3>
            <blockquote className="rounded bg-[var(--paper-subtle)] p-3 text-xs font-mono text-[var(--ink)] border-l-2 border-[var(--accent)] leading-relaxed italic">
              "{pedagogy.klausur.formulierungshilfe}"
            </blockquote>
          </div>

          {/* 中文考点点拨与得分秘籍 */}
          <div className="rounded-lg border border-amber-500/30 bg-amber-500/5 p-4 space-y-1.5 text-xs">
            <h4 className="font-bold text-amber-900 dark:text-amber-300 flex items-center gap-1.5">
              <span>💡</span>
              <span>得分陷阱与审题破局点拨 (Tipps & Stolpersteine):</span>
            </h4>
            <p className="text-[var(--ink)] leading-relaxed">
              {pedagogy.klausur.chineseComment}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default UniversalInteractiveWorkbench;
