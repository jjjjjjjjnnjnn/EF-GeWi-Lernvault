// DilemmaTheatre — G4 Universal Dilemma & Urteil Theatre Framework
// 哲学、社科政策、德语戏剧两难冲突与考场双轨评价（Sachurteil vs. Werturteil）正式生产组件
import { useEffect, useRef, useState } from "react";
import type { Lang } from "../../i18n";

export interface DilemmaAct {
  kickDE: string;
  kickZH: string;
  headDE: string;
  headZH: string;
  bodyDE: string;
  bodyZH: string;
  quoteDE?: string;
  quoteZH?: string;
}

export interface DilemmaScenario {
  id: string;
  fach: "Philosophie" | "SoWi" | "Deutsch";
  titleDE: string;
  titleZH: string;
  accent: string;
  acts: [DilemmaAct, DilemmaAct, DilemmaAct, DilemmaAct];
  scaleLeftLabelDE: string;
  scaleLeftLabelZH: string;
  scaleRightLabelDE: string;
  scaleRightLabelZH: string;
  klausurTemplateDE: (verdict: number | null) => string;
  klausurTemplateZH: (verdict: number | null) => string;
  quiz: {
    questionDE: string;
    questionZH: string;
    options: { de: string; zh: string }[];
    correctIndex: number;
    explanationDE: string;
    explanationZH: string;
  };
}

export const PRESET_DILEMMAS: DilemmaScenario[] = [
  {
    id: "philo-trolley",
    fach: "Philosophie",
    titleDE: "Trolley-Dilemma: Kant vs. Bentham",
    titleZH: "电车困境：康德义务论 对阵 边沁功利主义",
    accent: "#3b82f6",
    acts: [
      {
        kickDE: "Akt 1 / Fallanalyse",
        kickZH: "第一幕 / 案情剖析",
        headDE: "Die Weiche des Todes",
        headZH: "两难抉择的铁轨岔道",
        bodyDE: "Ein führerloser Zug rast auf fünf Gleisarbeiter zu. Durch Umlegen einer Weiche kannst du ihn auf ein Nebengleis lenken — dort steht ein einzelner Arbeiter.",
        bodyZH: "一辆刹车失灵的列车疾驰而来，前方主铁轨上有五名作业工人。只需扳动身旁的道岔变轨器，列车就会驶向支线，但支线上也有一名无辜工人。",
      },
      {
        kickDE: "Akt 2 / Maximen-Prüfung",
        kickZH: "第二幕 / 核心伦理法则对立",
        headDE: "Zweckformel & Nutzenkalkül",
        headZH: "目的自身公式 与 功利总和计算",
        bodyDE: "Bentham maximiert das Gesamtglück (5 gerettete Leben > 1 Opfer). Kant formuliert das absolute Verbot: Der Mensch darf niemals bloß als Mittel zum Zweck gebraucht werden.",
        bodyZH: "功利主义（边沁）：追求最大多数人的最大幸福，用数量计算生命（5 > 1）；义务论（康德）：绝对律令与尊严底线，严禁将任何人作为换取利益的工具手段。",
        quoteDE: "„Handle so, dass du die Menschheit sowohl in deiner Person, als in der Person eines jeden andern, jederzeit zugleich als Zweck, niemals bloß als Mittel brauchest.“ (Immanuel Kant)",
        quoteZH: "“你要这样行动，无论是对你自身还是对其他人的人格中的人性，在任何时候都同时当作目的，而绝不仅仅当作手段。”（伊曼纽尔·康德）",
      },
      {
        kickDE: "Akt 3 / Dialektische Waage",
        kickZH: "第三幕 / 价值顺位天平衡量",
        headDE: "Güterabwägung am Regler",
        headZH: "辩证权重天平",
        bodyDE: "Verschiebe den Regler: Neigt sich dein Urteil zur utilitaristischen Schadensminimierung oder zur deontologischen Würde-Garantie?",
        bodyZH: "拨动天平滑杆：你的伦理裁量更倾向于功利主义的净损害最小化，还是道义论对个体绝对尊严的庄严承诺？",
      },
      {
        kickDE: "Akt 4 / Klausursynthese",
        kickZH: "第四幕 / 考场评价双轨合成",
        headDE: "Sachurteil vs. Werturteil",
        headZH: "事实判断 与 价值判断",
        bodyDE: "Im Abitur trennst du strikt: Ein Sachurteil prüft die Wirksamkeit (Kausalität, Opferzahl), ein Werturteil begründet die normative Legitimität anhand von Grundwerten.",
        bodyZH: "在德国高中会考哲学答题中，必须严格区分：事实判断（Sachurteil）分析客观因果与数量后果；价值判断（Werturteil）依据基本法与哲学准则裁定伦理合法性。",
      },
    ],
    scaleLeftLabelDE: "Utilitarismus (Nutzenkalkül)",
    scaleLeftLabelZH: "功利主义（边沁：效用最大化）",
    scaleRightLabelDE: "Deontologie (Kants Pflicht)",
    scaleRightLabelZH: "义务论（康德：目的绝对性）",
    klausurTemplateDE: (v) =>
      v === 0
        ? "Sachurteil: Auf faktischer Ebene minimiert das Umlegen der Weiche nachweislich die Zahl der Todesopfer (1 statt 5)."
        : v === 1
        ? "Werturteil: Normativ ist die Weichenumstellung unzulässig, da die gezielte Instrumentalisierung des Menschen gegen die unantastbare Menschenwürde (Art. 1 GG) verstößt."
        : "— Wähle oben Sachurteil oder Werturteil für die Abitur-Synthese.",
    klausurTemplateZH: (v) =>
      v === 0
        ? "事实判断（Sachurteil）：从客观因果与统计层面看，扳动道岔确实有效减少了死亡人数（1 人死亡替代 5 人死亡）。"
        : v === 1
        ? "价值判断（Werturteil）：从规范法理层面看，牺牲支线工人构成对人的手段化利用，违背《德国基本法》第1条关于人类尊严不可侵犯之绝对原则。"
        : "——请点击上方切换事实判断或价值判断查看考场句。",
    quiz: {
      questionDE: "Warum verbietet Kants kategorischer Imperativ das aktive Umlegen der Weiche?",
      questionZH: "为什么康德的绝对命令严厉禁止主动扳动道岔？",
      options: [
        { de: "Weil der Einzelne als bloßes Rettungsmittel instrumentalisiert wird", zh: "因为单独的那名工人被物化为了拯救他人的纯粹工具与抵押品" },
        { de: "Weil fünf Leben mathematisch weniger wert sind als ein junger Arbeiter", zh: "因为五名工人的整体社会价值在数学上低于年轻工人" },
        { de: "Weil das Unterlassen jeglicher Handlung rechtlich straffrei bleibt", zh: "因为刑法对不作为往往不追究直接刑事连带责任" },
      ],
      correctIndex: 0,
      explanationDE: "Exakt richtig: Nach der Selbstzweck-Formel darf kein Mensch als bloßes Mittel zum Zweck eines kollektiven Vorteils geopfert werden.",
      explanationZH: "完全正确：依据目的自身公式，人的尊严是不可让渡的终极目的，绝不能被当作增进集体利益的手段。",
    },
  },
  {
    id: "sowi-mindestlohn",
    fach: "SoWi",
    titleDE: "Wirtschaftskonflikt: Mindestlohn vs. Markt",
    titleZH: "经济政策冲突：法定最低工资 对阵 自由市场调节",
    accent: "#d97706",
    acts: [
      {
        kickDE: "Akt 1 / Marktlage",
        kickZH: "第一幕 / 市场现状",
        headDE: "Niedriglohnsektor in Deutschland",
        headZH: "社会市场经济中的低收入部门",
        bodyDE: "Millionen Beschäftigte im Dienstleistungssektor erwirtschaften Löhne, die trotz Vollzeitarbeit nicht zur eigenständigen Existenzsicherung ausreichen.",
        bodyZH: "服务业数以百万计的劳动者即使全职工作，获得的报酬仍不足以抵御贫困与通胀，需要国家救济补贴。",
      },
      {
        kickDE: "Akt 2 / Allokation vs. Gerechtigkeit",
        kickZH: "第二幕 / 配置效率 对阵 分配正义",
        headDE: "Neoklassik vs. Nachfragepolitik",
        headZH: "新古典供给学派 对阵 凯恩斯需求学派",
        bodyDE: "Neoklassiker warnen: Mindestlöhne über dem Gleichgewichtspreis vernichten geringqualifizierte Arbeitsplätze. Keynesianer betonen: Höhere Löhne stärken Massenkaufkraft.",
        bodyZH: "新古典学者警告：人为设置高于均衡价格的底薪将破坏价格机制并导致失业；凯恩斯学派则强调：提升低端收入能直接激发内需总消费。",
        quoteDE: "„Ein Mindestlohn ist ordnungspolitisch ein staatlicher Eingriff in die Tarifautonomie (Art. 9 Abs. 3 GG), aber sozialpolitisch ein Instrument gegen Working Poor.“",
        quoteZH: "“法定最低工资在经济秩序法上构成了对劳资自治权的干预，但在社会政策上则是遏制在职贫困的关键兜底。”",
      },
      {
        kickDE: "Akt 3 / Dialektische Waage",
        kickZH: "第三幕 / 政策权衡天平",
        headDE: "Zielkonflikt im Magischen Sechseck",
        headZH: "经济政策六角形之目标冲突",
        bodyDE: "Kippe den Regler: Priorisierst du Wettbewerbsfähigkeit und Beschäftigungsniveau oder Verteilungsgerechtigkeit und soziale Sicherung?",
        bodyZH: "拨动天平：你的政策立足点更偏向企业国际竞争力与高就业率，还是更重视社会分配公义与防止两极分化？",
      },
      {
        kickDE: "Akt 4 / Klausursynthese",
        kickZH: "第四幕 / 考场论证合成",
        headDE: "Urteilskompetenz nach Kriterien",
        headZH: "AFB III 考场评价双轨制",
        bodyDE: "Prüfe Effizienz (Arbeitsmarktwirkung, Inflationsdruck) und Legitimität (Teilhabe, Menschenwürdige Lebensführung).",
        bodyZH: "严格遵循德国会考标准：效率维度（就业流动、企业成本外溢）与正当性维度（生活体面、社会整合度）。",
      },
    ],
    scaleLeftLabelDE: "Markteffizienz / Neoklassik",
    scaleLeftLabelZH: "自由市场配置效率（新古典）",
    scaleRightLabelDE: "Soziale Gerechtigkeit / Eingriff",
    scaleRightLabelZH: "社会分配公义（国家干预）",
    klausurTemplateDE: (v) =>
      v === 0
        ? "Sachurteil: Empirisch führte die Einführung des Mindestlohns in Deutschland kaum zu Arbeitsplatzverlusten, steigerte jedoch die Stückkosten in Teilbranchen."
        : v === 1
        ? "Werturteil: Unter dem Leitbild der Sozialen Marktwirtschaft ist die Untergrenze legitim, da sie die Würde der Erwerbstätigkeit schützt."
        : "— Wähle oben Sachurteil oder Werturteil.",
    klausurTemplateZH: (v) =>
      v === 0
        ? "事实判断（Sachurteil）：实证经济数据显示，德国推行最低工资后并未发生结构性大面积裁员，但推高了特定劳密集行业的单位成本。"
        : v === 1
        ? "价值判断（Werturteil）：在社会市场经济宪法共识下，该干预具有合法性，因为确保全职劳动者过上有尊严的生活优于资本的纯利润最大化。"
        : "——请点击上方切换事实判断或价值判断查看考场句。",
    quiz: {
      questionDE: "Welcher Zielkonflikt tritt beim Mindestlohn im Magischen Sechseck vorrangig auf?",
      questionZH: "推行法定最低工资时，在“政策魔力六角形”中首先触发哪对目标冲突？",
      options: [
        { de: "Gerechte Einkommensverteilung vs. Hoher Beschäftigungsstand", zh: "公正的收入分配 与 高就业水平之间的潜在权衡" },
        { de: "Außenwirtschaftliches Gleichgewicht vs. Umweltschutz", zh: "对外贸易平衡 与 环境保护目标" },
        { de: "Preisniveaustabilität vs. Wirtschaftswachstum ohne Arbeitskosten", zh: "物价稳定与无劳动力成本的经济增长" },
      ],
      correctIndex: 0,
      explanationDE: "Richtig: Umverteilung stärkt die Bezieher kleiner Einkommen, birgt aber das neoklassische Risiko von Arbeitsplatzabbau.",
      explanationZH: "正确：再分配保护了底层劳动者收入，但也引发新古典经济学关于企业压缩边际用工岗位的争论。",
    },
  },
  {
    id: "deutsch-faust",
    fach: "Deutsch",
    titleDE: "Faust-Tragödie: Streben vs. Schuld",
    titleZH: "浮士德悲剧：无限求知探索 对阵 道德毁人罪责",
    accent: "#475569",
    acts: [
      {
        kickDE: "Akt 1 / Verzweiflung",
        kickZH: "第一幕 / 学者之困",
        headDE: "Die Grenzen der Wissenschaft",
        headZH: "学术理性的边界与绝望",
        bodyDE: "Heinrich Faust scheitert an den Grenzen menschlicher Erkenntnis („dass wir nichts wissen können!“). Der Pakt mit Mephisto verspricht totale Welterfahrung.",
        bodyZH: "浮士德在经院哲学的书堆前陷入绝望（“认识到我们根本一无所知！”）。他与魔鬼靡菲斯特立约，以灵魂换取全维度的生命体验与求索。",
      },
      {
        kickDE: "Akt 2 / Die Gretchentragödie",
        kickZH: "第二幕 / 葛丽卿悲剧",
        headDE: "Titanismus vs. Kleinbürgerliches Verderben",
        headZH: "巨人探索精神 摧毁 小市民纯真",
        bodyDE: "Auf dem Weg zur Selbstverwirklichung zerstört Faust das Leben der jungen Margarete: Tod der Mutter, Tod des Bruders, Kindsmord und Hinrichtung.",
        bodyZH: "在浮士德追求超验自我的道路上，年轻纯洁的葛丽卿被卷入深渊：母兄身死、骨肉溺亡、沦为死囚。",
        quoteDE: "„Zwei Seelen wohnen, ach! in meiner Brust, die eine will sich von der andern trennen...“ (J. W. von Goethe)",
        quoteZH: "“唉！有两只灵魂居住在我的胸中，它们彼此总想脱离分离……”（歌德）",
      },
      {
        kickDE: "Akt 3 / Dialektische Waage",
        kickZH: "第三幕 / 人物评判天平",
        headDE: "Schuld oder Streben?",
        headZH: "不可饶恕的罪行，还是值得救赎的求索？",
        bodyDE: "Wie wiegt die Tragödie? Ist Faust der Repräsentant des rastlos strebenden, modernen Menschen oder ein rücksichtsloser Egoist?",
        bodyZH: "天平如何衡量？浮士德究竟是永不停息、追求突破的人类进取先锋，还是践踏无辜者生命的自私狂徒？",
      },
      {
        kickDE: "Akt 4 / Klausursynthese",
        kickZH: "第四幕 / 德中文学分析合成",
        headDE: "Figurenanalyse im Klausurtext",
        headZH: "文学评论考场得分架构",
        bodyDE: "Verknüpfe Goethes Menschenbild (Prolog im Himmel: „Ein guter Mensch in seinem dunklen Drange...“) mit der konkreten Textstelle und deinem Urteil.",
        bodyZH: "将歌德在《天上序曲》中的人性设定（“好人即使在迷惘的骚动中，也自知走的是正途……”）与文本具体行文相呼应，给出辩证评判。",
      },
    ],
    scaleLeftLabelDE: "Fausts Verfehlung (Schuld & Egoismus)",
    scaleLeftLabelZH: "浮士德之毁人罪责（私欲与冷酷）",
    scaleRightLabelDE: "Goethes Streben (Erlösung & Humanismus)",
    scaleRightLabelZH: "崇高的不息求索（救赎与进取）",
    klausurTemplateDE: (v) =>
      v === 0
        ? "Sachurteil: Textimmanent trägt Faust die kausale Hauptschuld an Gretchens Hinrichtung, da er ihre Schutzlosigkeit ausnutzte."
        : v === 1
        ? "Werturteil: Im ideengeschichtlichen Kontext Goethes bleibt Faust dennoch rettbar, da sein Streben die Überwindung reiner Trägheit verkörpert."
        : "— Wähle oben Sachurteil oder Werturteil.",
    klausurTemplateZH: (v) =>
      v === 0
        ? "事实分析（Sachurteil）：从情节因果来看，浮士德利用了葛丽卿在封建小市民道德重压下的脆弱，对其家破人亡负有不可推卸的直接主责。"
        : v === 1
        ? "价值评判（Werturteil）：在魏玛古典主义与启蒙思想语境下，歌德依然肯定浮士德的救赎可能，因为其永不满足的求索精神战胜了庸碌的停滞怠惰。"
        : "——请点击上方切换事实分析或价值评判查看考场句。",
    quiz: {
      questionDE: "Welcher Ausspruch fasst Fausts Tragik in der Gretchentragödie treffend zusammen?",
      questionZH: "哪句话最贴切地概括了浮士德在葛丽卿悲剧中的本质悲剧性？",
      options: [
        { de: "Sein unbedingter Erkenntnisdrang kollidiert zerstörerisch mit gesellschaftlicher Wirklichkeit", zh: "他绝对不妥协的精神追求与脆弱的人间伦理现实发生了毁灭性的碾压冲突" },
        { de: "Er handelte aus reiner Bosheit wie Mephisto", zh: "他像魔鬼一样出于纯粹的恶意而施加伤害" },
        { de: "Er bereute seine Tat sofort und ging freiwillig ins Kloster", zh: "他立刻深切悔罪并自愿遁入空门" },
      ],
      correctIndex: 0,
      explanationDE: "Richtig: Fausts Titanismus scheitert tragisch daran, dass das hehre Streben konkrete Menschenopfer fordert.",
      explanationZH: "正确：浮士德的巨人主义悲剧正在于：崇高抽象的超越追求，在落地时竟以牺牲身边具体鲜活的个体为代价。",
    },
  },
];

interface DilemmaTheatreProps {
  lang: Lang;
  scenarioId?: string;
  customScenario?: DilemmaScenario;
}

export function DilemmaTheatre({ lang, scenarioId, customScenario }: DilemmaTheatreProps) {
  const de = lang === "de";
  const [activeScenarioId, setActiveScenarioId] = useState<string>(
    scenarioId || (customScenario ? customScenario.id : "philo-trolley")
  );
  const [stepIdx, setStepIdx] = useState<number>(0);
  const [sliderVal, setSliderVal] = useState<number>(0);
  const [tilt, setTilt] = useState<number>(0);
  const [verdict, setVerdict] = useState<number | null>(null);
  const [quizAnswer, setQuizAnswer] = useState<number | null>(null);
  const raf = useRef(0);

  const scenario =
    customScenario ||
    PRESET_DILEMMAS.find((s) => s.id === activeScenarioId) ||
    PRESET_DILEMMAS[0];

  const idx = Math.min(Math.max(stepIdx, 0), 3);
  const act = scenario.acts[idx];

  // 缓动平滑天平
  useEffect(() => {
    const from = tilt;
    const to = Math.max(-50, Math.min(50, sliderVal));
    if (from === to) return;
    const t0 = performance.now();
    const tick = (t: number) => {
      const p = Math.min((t - t0) / 200, 1);
      const e = 1 - Math.pow(1 - p, 3);
      setTilt(from + (to - from) * e);
      if (p < 1) raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf.current);
  }, [sliderVal, tilt]);

  const prev = () => setStepIdx(Math.max(idx - 1, 0));
  const next = () => setStepIdx(Math.min(idx + 1, 3));

  const changeScenario = (id: string) => {
    setActiveScenarioId(id);
    setStepIdx(0);
    setVerdict(null);
    setQuizAnswer(null);
    setSliderVal(0);
  };

  const rot = Math.max(-14, Math.min(14, tilt * 0.28));
  const ly = Math.max(-18, Math.min(18, tilt * 0.36));

  return (
    <div className="flex flex-col gap-4 rounded-lg border border-[var(--line)] bg-[var(--surface)] p-5">
      {/* 顶部场景切换器（当未限定单一场景时提供切换） */}
      {!customScenario && (
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[var(--line)] pb-3">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-[var(--ink)]" />
            <span className="text-xs font-mono font-medium uppercase tracking-wider text-[var(--ink)]">
              {de ? "Dialektisches Theater // Diskurs" : "辩证剧场 · 跨学科两难抉择"}
            </span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {PRESET_DILEMMAS.map((s) => (
              <button
                key={s.id}
                onClick={() => changeScenario(s.id)}
                className={`rounded border px-2.5 py-1 text-xs transition ${
                  activeScenarioId === s.id
                    ? "border-[var(--ink)] bg-[var(--ink)] text-[var(--paper)] font-medium shadow-xs"
                    : "border-[var(--line)] bg-[var(--paper-subtle)] text-[var(--gray)] hover:text-[var(--ink)]"
                }`}
              >
                {de ? s.titleDE : s.titleZH}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* 剧场舞台 */}
      <div className="flex flex-col overflow-hidden rounded-md border border-[var(--line)] bg-[var(--paper-subtle)] p-4 dark:bg-[#18181b]">
        {/* SVG 插画：古典石碑与天平 */}
        <svg viewBox="0 0 420 170" className="h-44 w-full select-none font-mono" fill="none" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" stroke="currentColor">
          {idx === 0 && (
            <>
              <line x1="20" y1="150" x2="400" y2="150" stroke="currentColor" strokeWidth={0.8} className="text-[var(--line)]" />
              <path d="M 20 130 L 150 130 L 400 130" stroke="currentColor" strokeWidth={1.5} className="text-[var(--gray)]" />
              <path d="M 150 130 C 210 130 240 60 400 60" stroke="currentColor" strokeWidth={1.2} strokeDasharray="3 3" className="text-[var(--gray)]" />
              <circle cx="150" cy="130" r="4.5" fill="currentColor" stroke="currentColor" strokeWidth={1.5} className="text-[var(--surface)] text-[var(--ink)]" />
              <line x1="150" y1="130" x2="168" y2="105" stroke="currentColor" strokeWidth={2} className="text-[var(--ink)]" />
              <circle cx="168" cy="105" r="2.5" fill="currentColor" className="text-[var(--ink)]" />
              <rect x="35" y="112" width="46" height="18" rx="2" fill="currentColor" stroke="currentColor" strokeWidth={1} className="text-[var(--surface)] text-[var(--gray)]" />
              <g transform="translate(345, 40)">
                <circle cx="0" cy="0" r="4" stroke="#b45309" />
                <line x1="0" y1="4" x2="0" y2="15" stroke="#b45309" />
                <text x="0" y="-7" fill="#b45309" fontSize="9" textAnchor="middle" fontWeight="bold">1</text>
              </g>
              {[280, 305, 330, 355, 380].map((x, i) => (
                <g key={i} transform={`translate(${x}, 110)`}>
                  <circle cx="0" cy="0" r="3.5" stroke="#2563eb" />
                  <line x1="0" y1="3.5" x2="0" y2="13" stroke="#2563eb" />
                </g>
              ))}
              <text x="330" y="100" fill="#2563eb" fontSize="9" textAnchor="middle" fontWeight="bold">5</text>
            </>
          )}

          {idx === 1 && (
            <>
              <rect x="150" y="15" width="120" height="140" rx="4" fill="currentColor" stroke="currentColor" strokeWidth={1.2} className="text-[var(--surface)] text-[var(--line)]" />
              <circle cx="210" cy="45" r="7" stroke="currentColor" strokeWidth={1.2} className="text-[var(--ink)]" />
              <line x1="170" y1="68" x2="250" y2="68" stroke="currentColor" strokeWidth={0.8} className="text-[var(--line)]" />
              <line x1="170" y1="88" x2="250" y2="88" stroke="currentColor" strokeWidth={0.8} className="text-[var(--line)]" />
              <line x1="170" y1="108" x2="230" y2="108" stroke="currentColor" strokeWidth={0.8} className="text-[var(--line)]" />
              <g transform="translate(70, 75)">
                <rect x="-45" y="-28" width="90" height="56" rx="4" fill="currentColor" stroke="#b45309" strokeWidth={1} className="text-[var(--surface)]" />
                <text x="0" y="-6" fill="#b45309" fontSize="10" textAnchor="middle" fontWeight="600">Bentham</text>
                <text x="0" y="12" fill="currentColor" fontSize="9" textAnchor="middle" className="text-[var(--gray)]">Nutzenkalkül</text>
              </g>
              <g transform="translate(350, 75)">
                <rect x="-45" y="-28" width="90" height="56" rx="4" fill="currentColor" stroke="#2563eb" strokeWidth={1} className="text-[var(--surface)]" />
                <text x="0" y="-6" fill="#2563eb" fontSize="10" textAnchor="middle" fontWeight="600">Kant</text>
                <text x="0" y="12" fill="currentColor" fontSize="9" textAnchor="middle" className="text-[var(--gray)]">Imperativ</text>
              </g>
            </>
          )}

          {idx === 2 && (
            <>
              <line x1="210" y1="25" x2="210" y2="145" stroke="currentColor" strokeWidth={1.5} className="text-[var(--gray)]" />
              <path d="M 175 145 L 210 132 L 245 145 Z" fill="currentColor" stroke="currentColor" strokeWidth={1} className="text-[var(--surface)] text-[var(--gray)]" />
              <circle cx="210" cy="30" r="4" fill="currentColor" stroke="currentColor" strokeWidth={1.5} className="text-[var(--surface)] text-[var(--ink)]" />
              <g style={{ transform: `rotate(${rot}deg)`, transformOrigin: "210px 30px" }}>
                <line x1="105" y1="30" x2="315" y2="30" stroke="currentColor" strokeWidth={1.8} className="text-[var(--ink)]" />
                <circle cx="105" cy="30" r="2.5" fill="currentColor" className="text-[var(--ink)]" />
                <circle cx="315" cy="30" r="2.5" fill="currentColor" className="text-[var(--ink)]" />
              </g>
              <g style={{ transform: `translateY(${-ly}px)` }}>
                <line x1="105" y1="30" x2="80" y2="90" stroke="currentColor" strokeWidth={0.8} className="text-[var(--gray)]" />
                <line x1="105" y1="30" x2="130" y2="90" stroke="currentColor" strokeWidth={0.8} className="text-[var(--gray)]" />
                <path d="M 72 90 Q 105 105 138 90 Z" fill="currentColor" stroke="#b45309" strokeWidth={1} className="text-[var(--surface)]" />
                <rect x="94" y="74" width="22" height="16" rx="2" fill="#b45309" opacity="0.8" />
                <text x="105" y="86" fill="#ffffff" fontSize="8" textAnchor="middle" fontWeight="bold">5 L</text>
              </g>
              <g style={{ transform: `translateY(${ly}px)` }}>
                <line x1="315" y1="30" x2="290" y2="90" stroke="currentColor" strokeWidth={0.8} className="text-[var(--gray)]" />
                <line x1="315" y1="30" x2="340" y2="90" stroke="currentColor" strokeWidth={0.8} className="text-[var(--gray)]" />
                <path d="M 282 90 Q 315 105 348 90 Z" fill="currentColor" stroke="#2563eb" strokeWidth={1} className="text-[var(--surface)]" />
                <rect x="304" y="72" width="22" height="18" rx="2" fill="#2563eb" opacity="0.8" />
                <text x="315" y="85" fill="#ffffff" fontSize="8" textAnchor="middle" fontWeight="bold">Art.1</text>
              </g>
            </>
          )}

          {idx === 3 && (
            <>
              <rect x="75" y="20" width="125" height="110" rx="4" fill="currentColor" stroke="#2563eb" strokeWidth={1} className="text-[var(--surface)]" />
              <text x="137" y="48" fill="#2563eb" fontSize="11" textAnchor="middle" fontWeight="600">Sachurteil</text>
              <text x="137" y="64" fill="currentColor" fontSize="9" textAnchor="middle" className="text-[var(--gray)]">Wirksamkeit & Fakten</text>
              <line x1="95" y1="78" x2="180" y2="78" stroke="currentColor" strokeWidth={0.6} className="text-[var(--line)]" />
              <line x1="95" y1="94" x2="165" y2="94" stroke="currentColor" strokeWidth={0.6} className="text-[var(--line)]" />

              <rect x="220" y="20" width="125" height="110" rx="4" fill="currentColor" stroke="#b45309" strokeWidth={1} className="text-[var(--surface)]" />
              <text x="282" y="48" fill="#b45309" fontSize="11" textAnchor="middle" fontWeight="600">Werturteil</text>
              <text x="282" y="64" fill="currentColor" fontSize="9" textAnchor="middle" className="text-[var(--gray)]">Legitimität & Normen</text>
              <line x1="240" y1="78" x2="325" y2="78" stroke="currentColor" strokeWidth={0.6} className="text-[var(--line)]" />
              <line x1="240" y1="94" x2="310" y2="94" stroke="currentColor" strokeWidth={0.6} className="text-[var(--line)]" />

              <circle cx="210" cy="148" r="12" fill="currentColor" stroke="#059669" strokeWidth={1.5} className="text-[var(--surface)]" />
              <path d="M 205 148 L 208 152 L 216 144" stroke="#059669" strokeWidth={1.8} />
            </>
          )}
        </svg>

        {/* 幕次文本 */}
        <div className="mt-4 border-t border-[var(--line)] pt-3 text-[var(--ink)]">
          <span className="text-[10px] font-mono uppercase tracking-wider text-[var(--gray)]">
            {de ? act.kickDE : act.kickZH}
          </span>
          <h4 className="mt-0.5 font-serif text-base font-normal tracking-tight text-[var(--ink)]">
            {de ? act.headDE : act.headZH}
          </h4>
          <p className="mt-1.5 text-xs leading-relaxed text-[var(--gray)]">
            {de ? act.bodyDE : act.bodyZH}
          </p>
        </div>
      </div>

      {/* 幕次经典引言 */}
      {act.quoteDE && (
        <blockquote className="rounded-r border-l-2 border-[var(--ink)] bg-[var(--paper-subtle)] p-3 text-xs italic text-[var(--ink)]">
          {de ? act.quoteDE : act.quoteZH}
        </blockquote>
      )}

      {/* 第 3 幕天平调节 */}
      {idx === 2 && (
        <div className="rounded-md border border-[var(--line)] bg-[var(--paper-subtle)] p-3">
          <div className="mb-2 flex justify-between text-xs font-mono">
            <span className="font-medium text-[#b45309]">{de ? scenario.scaleLeftLabelDE : scenario.scaleLeftLabelZH}</span>
            <span className="font-bold text-[var(--ink)]">{sliderVal > 0 ? `+${sliderVal}` : sliderVal}</span>
            <span className="font-medium text-[#2563eb]">{de ? scenario.scaleRightLabelDE : scenario.scaleRightLabelZH}</span>
          </div>
          <input
            type="range"
            min={-50}
            max={50}
            value={sliderVal}
            onChange={(e) => setSliderVal(Number(e.target.value))}
            className="h-1 w-full cursor-pointer appearance-none rounded bg-[var(--line)] accent-[var(--ink)]"
          />
        </div>
      )}

      {/* 第 4 幕双轨合成与快检 */}
      {idx === 3 && (
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => setVerdict(0)}
              className={`rounded border p-2.5 text-left text-xs transition ${
                verdict === 0
                  ? "border-[var(--ink)] bg-[var(--ink)] text-[var(--paper)] shadow-xs"
                  : "border-[var(--line)] bg-[var(--paper-subtle)] text-[var(--gray)] hover:text-[var(--ink)]"
              }`}
            >
              <p className="font-mono font-bold">{de ? "1. Sachurteil" : "1. 事实判断"}</p>
              <p className="text-[10px] opacity-80">{de ? "Wirksamkeit & Fakten" : "客观因果与统计"}</p>
            </button>
            <button
              type="button"
              onClick={() => setVerdict(1)}
              className={`rounded border p-2.5 text-left text-xs transition ${
                verdict === 1
                  ? "border-[var(--ink)] bg-[var(--ink)] text-[var(--paper)] shadow-xs"
                  : "border-[var(--line)] bg-[var(--paper-subtle)] text-[var(--gray)] hover:text-[var(--ink)]"
              }`}
            >
              <p className="font-mono font-bold">{de ? "2. Werturteil" : "2. 价值判断"}</p>
              <p className="text-[10px] opacity-80">{de ? "Normen & Legitimität" : "法理与尊严正当性"}</p>
            </button>
          </div>

          <div className="rounded border border-[var(--line)] bg-[var(--paper-subtle)] p-3 text-xs text-[var(--ink)]">
            <span className="font-mono font-semibold text-[var(--gray)]">{de ? "Klausursatz: " : "考场标准句："}</span>
            <span className="font-serif italic">{de ? scenario.klausurTemplateDE(verdict) : scenario.klausurTemplateZH(verdict)}</span>
          </div>

          <div className="rounded border border-[var(--line)] bg-[var(--surface)] p-3">
            <p className="text-xs font-medium text-[var(--ink)]">{de ? scenario.quiz.questionDE : scenario.quiz.questionZH}</p>
            <div className="mt-3 space-y-1.5">
              {scenario.quiz.options.map((opt, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setQuizAnswer(i)}
                  className={`w-full rounded border p-2 text-left text-xs transition ${
                    quizAnswer === i
                      ? i === scenario.quiz.correctIndex
                        ? "border-emerald-600 bg-emerald-500/10 text-emerald-900 dark:text-emerald-300 font-medium"
                        : "border-rose-600 bg-rose-500/10 text-rose-900 dark:text-rose-300"
                      : "border-[var(--line)] bg-[var(--paper-subtle)] text-[var(--gray)] hover:text-[var(--ink)] hover:border-[var(--ink)]"
                  }`}
                >
                  <span className="font-mono font-bold">{String.fromCharCode(65 + i)}. </span>
                  <span>{de ? opt.de : opt.zh}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 幕次翻页条 */}
      <div className="flex items-center justify-between border-t border-[var(--line)] pt-3 text-xs font-mono">
        <button
          type="button"
          onClick={prev}
          disabled={idx === 0}
          className="rounded border border-[var(--line)] px-3 py-1 text-[var(--gray)] transition hover:text-[var(--ink)] disabled:opacity-30"
        >
          {de ? "← Voriger Akt" : "← 上一幕"}
        </button>
        <span className="text-[var(--gray)]">AKT {idx + 1} / 4</span>
        <button
          type="button"
          onClick={next}
          disabled={idx === 3}
          className="rounded border border-[var(--line)] bg-[var(--ink)] px-3 py-1 font-medium text-[var(--paper)] transition hover:opacity-90 disabled:opacity-30"
        >
          {idx === 3 ? (de ? "Fertig" : "终局") : (de ? "Nächster Akt →" : "下一幕 →")}
        </button>
      </div>
    </div>
  );
}
