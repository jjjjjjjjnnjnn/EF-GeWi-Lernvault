// BalanceBoard: Pädagogische dialektische Urteils-Waage für SoWi & Philosophie (AFB III).
// Löst die Schwierigkeit, ein theoriegeleitetes Sach- und Werturteil zu fällen.
// Physische Waage mit dynamischem Neigungswinkel, Argument-Gewichten und Synthese-Generator.
// Reines Inline-SVG, kein Emoji, Tufte-Design-Token.

import { useState } from "react";

function ResetIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M3 5.5A5.5 5.5 0 1 1 2.8 10M3 2.5v3h3" />
    </svg>
  );
}

export interface WeightItem {
  id: string;
  side: "pro" | "contra";
  textDE: string;
  textZH: string;
  weight: 1 | 2 | 3; // 1 = schwach, 2 = mittel, 3 = schwerwiegend (z.B. Grundgesetz / Menschenwürde)
  categoryDE: string;
  categoryZH?: string;
}

export interface BalanceCase {
  id: string;
  fach: "SoWi" | "Philosophie";
  frageDE: string;
  frageZH: string;
  labelProDE: string;
  labelProZH?: string;
  labelContraDE: string;
  labelContraZH?: string;
  valuesConflict: string[]; // z.B. ["Freiheit vs. Gerechtigkeit", "Wohlstand vs. Ökologie"]
  valuesConflictZH?: string[];
  availableWeights: WeightItem[];
}

export const PRESET_CASES: BalanceCase[] = [
  {
    id: "sowi-mindestlohn",
    fach: "SoWi",
    frageDE: "Sollte der gesetzliche Mindestlohn auf 15 Euro pro Stunde erhöht werden?",
    frageZH: "是否应该将德国法定最低工资提高至每小时 15 欧元？(EF.2 经济政策争端)",
    labelProDE: "Befürworter (Gewerkschaften / Soziale Gerechtigkeit)",
    labelProZH: "支持者（工会 / 社会公平）",
    labelContraDE: "Kritiker (Arbeitgeberverbände / Wettbewerbsfähigkeit)",
    labelContraZH: "反对者（雇主协会 / 竞争力）",
    valuesConflict: [
      "Soziale Gerechtigkeit vs. Marktkonformität",
      "Kaufkraftstärkung vs. Inflationsrisiko",
      "Existenzsicherung vs. Beschäftigungssicherung",
    ],
    valuesConflictZH: [
      "社会公平 vs. 市场化",
      "购买力增强 vs. 通胀风险",
      "生存保障 vs. 就业保障",
    ],
    availableWeights: [
      {
        id: "p1",
        side: "pro",
        textDE: "Schutz vor Erwerbsarmut (Working Poor) und Stärkung der Binnennachfrage",
        textZH: "防范‘在职贫困’并拉动内需消费循环",
        weight: 3,
        categoryDE: "Sozialstaatsgebot (Art. 20 GG)",
        categoryZH: "社会国原则（基本法第20条）",
      },
      {
        id: "p2",
        side: "pro",
        textDE: "Geringere Belastung der sozialen Sicherungssysteme durch Aufstocker",
        textZH: "减少国家对低收入‘社保补贴者’的财政垫付负担",
        weight: 2,
        categoryDE: "Fiskalische Entlastung",
        categoryZH: "财政减负",
      },
      {
        id: "c1",
        side: "contra",
        textDE: "Gefahr des Stellenabbaus im Niedriglohnsektor durch Rationalisierung / Automatisierung",
        textZH: "低技能工种面临被自动化或资本替代的失业风险",
        weight: 2,
        categoryDE: "Beschäftigungsrisiko",
        categoryZH: "就业风险",
      },
      {
        id: "c2",
        side: "contra",
        textDE: "Verletzung der Tarifautonomie (Art. 9 Abs. 3 GG) durch staatliche Lohnfestsetzung",
        textZH: "国家行政定价干预了劳资双方受宪法保护的‘薪资自主谈判权’",
        weight: 3,
        categoryDE: "Tarifautonomie",
        categoryZH: "工资自主谈判权",
      },
      {
        id: "c3",
        side: "contra",
        textDE: "Lohn-Preis-Spirale und Gefährdung der internationalen preislichen Wettbewerbsfähigkeit",
        textZH: "可能推高服务业价格并削弱中小企业对外出口竞争力",
        weight: 1,
        categoryDE: "Wettbewerbsfähigkeit",
        categoryZH: "竞争力",
      },
    ],
  },
  {
    id: "philo-trolley",
    fach: "Philosophie",
    frageDE: "Darf eine Weiche umgestellt werden, um fünf Menschen zu retten, wodurch ein Einzelner stirbt?",
    frageZH: "是否允许扳动道岔牺牲一人以拯救五人？(电车难题与生命权权衡)",
    labelProDE: "Utilitarismus (Maximierung des Gesamtnutzens)",
    labelProZH: "功利主义（最大化总体效用）",
    labelContraDE: "Kantische Deontologie (Kategorischer Imperativ)",
    labelContraZH: "康德义务论（绝对命令）",
    valuesConflict: [
      "Quantitativer Lebensnutzen vs. Menschenwürde",
      "Handlungsfolgen (Teleologie) vs. Pflicht (Deontologie)",
      "Aufrechnung von Menschenleben vs. Instrumentalisierungsverbot",
    ],
    valuesConflictZH: [
      "生命数量效用 vs. 人的尊严",
      "行为后果（目的论） vs. 义务（义务论）",
      "生命加减计算 vs. 禁止工具化",
    ],
    availableWeights: [
      {
        id: "tp1",
        side: "pro",
        textDE: "Rettung von fünf Menschenleben überwiegt den Verlust eines Einzelnen (Hedonistisches Kalkül)",
        textZH: "挽救五条生命的净效用大于牺牲一人（功利主义苦乐差值计算）",
        weight: 2,
        categoryDE: "Nutzenmaximierung",
        categoryZH: "效用最大化",
      },
      {
        id: "tp2",
        side: "pro",
        textDE: "Unterlassene Hilfeleistung minimieren; Schaden quantitativ begrenzen",
        textZH: "在无法两全的绝境中将现实伤亡数量降到最低",
        weight: 1,
        categoryDE: "Schadensminimierung",
        categoryZH: "损害最小化",
      },
      {
        id: "tc1",
        side: "contra",
        textDE: "Menschheitszweckformel: Der Einzelne darf niemals bloß als Mittel zum Zweck gebraucht werden",
        textZH: "康德目的公式：人永远是自身的目的，绝不可被当作拯救他人的工具",
        weight: 3,
        categoryDE: "Instrumentalisierungsverbot",
        categoryZH: "禁止工具化",
      },
      {
        id: "tc2",
        side: "contra",
        textDE: "Verfassungskonforme Unantastbarkeit der Menschenwürde (Art. 1 Abs. 1 GG): Leben ist nicht abwägbar",
        textZH: "生命权与人的尊严不可克减侵犯，禁止在人命之间进行算术权衡",
        weight: 3,
        categoryDE: "Menschenwürde",
        categoryZH: "人的尊严",
      },
    ],
  },
];

export interface BalanceBoardProps {
  caseId?: string;
  lang?: "de" | "zh";
  onUrteilGenerated?: (urteilTextDE: string) => void;
}

export function BalanceBoard({
  caseId,
  lang = "zh",
  onUrteilGenerated,
}: BalanceBoardProps) {
  const [selectedCaseId, setSelectedCaseId] = useState<string>(
    caseId || PRESET_CASES[0].id
  );
  const activeCase =
    PRESET_CASES.find((c) => c.id === selectedCaseId) || PRESET_CASES[0];

  // Aktive Gewichte auf den Waagschalen (IDs)
  const [placedProIds, setPlacedProIds] = useState<string[]>([]);
  const [placedContraIds, setPlacedContraIds] = useState<string[]>([]);
  const [selectedConflict, setSelectedConflict] = useState<string>(
    activeCase.valuesConflict[0]
  );
  const [copied, setCopied] = useState(false);

  // Gewichte berechnen
  const proScore = placedProIds.reduce((sum, id) => {
    const item = activeCase.availableWeights.find((w) => w.id === id);
    return sum + (item?.weight || 0);
  }, 0);

  const contraScore = placedContraIds.reduce((sum, id) => {
    const item = activeCase.availableWeights.find((w) => w.id === id);
    return sum + (item?.weight || 0);
  }, 0);

  const scoreDelta = proScore - contraScore; // positiv = Pro schwerer, negativ = Contra schwerer

  // Neigungswinkel in Grad (max +/- 14 Grad)
  const tiltAngle = Math.max(-14, Math.min(14, scoreDelta * 3));

  // Gewicht platzieren / entfernen
  const toggleWeight = (w: WeightItem) => {
    if (w.side === "pro") {
      setPlacedProIds((prev) =>
        prev.includes(w.id) ? prev.filter((id) => id !== w.id) : [...prev, w.id]
      );
    } else {
      setPlacedContraIds((prev) =>
        prev.includes(w.id) ? prev.filter((id) => id !== w.id) : [...prev, w.id]
      );
    }
  };

  const resetAll = () => {
    setPlacedProIds([]);
    setPlacedContraIds([]);
  };

  // Urteilssynthese nach EPA-Standards (AFB III)
  const generateUrteilText = (): string => {
    if (proScore === 0 && contraScore === 0) return "";

    const tendenz =
      scoreDelta > 0
        ? "überwiegen die Pro-Argumente"
        : scoreDelta < 0
        ? "überwiegen die Gegenargumente"
        : "halten sich die Argumente die Waage";

    const valueCore = selectedConflict.split(" vs. ");
    const v1 = valueCore[0] || "Effizienz";
    const v2 = valueCore[1] || "Gerechtigkeit";

    if (scoreDelta > 0) {
      return (
        `Unter Abwägung der Argumente ${tendenz}. ` +
        `Obwohl gewichtige Einwände hinsichtlich ${v2} bestehen, erweist sich das Kriterium ${v1} in diesem Kontext als prioritär, ` +
        `da der verfassungs- bzw. ordnungspolitische Schutzzweck die partiellen Risiken legitimiert.`
      );
    } else if (scoreDelta < 0) {
      return (
        `In der Gesamtabwägung ${tendenz}. ` +
        `Wenngleich die Zielsetzung bezüglich ${v1} nachvollziehbar ist, wiegen die Bedenken bezüglich ${v2} schwerer, ` +
        `da fundamentale Strukturprinzipien bzw. Schutzrechte nicht nachgeordnet werden dürfen.`
      );
    } else {
      return (
        `Die dialektische Analyse verdeutlicht ein unauflösbares Spannungsverhältnis zwischen ${v1} und ${v2}. ` +
        `Ein tragfähiges Urteil erfordert daher flankierende Kompensationsmaßnahmen, um beide Zielgrößen zu harmonisieren.`
      );
    }
  };

  const urteilText = generateUrteilText();

  const handleCopy = () => {
    if (!urteilText) return;
    navigator.clipboard.writeText(urteilText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    onUrteilGenerated?.(urteilText);
  };

  return (
    <div className="rounded-[var(--radius)] border border-[var(--line)] bg-[var(--surface)] p-4 sm:p-5 ">
      {/* 头部：标题与案例切换 */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[var(--line)] pb-3 mb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="inline-block w-2.5 h-2.5 rounded-full bg-[var(--success)]" />
            <h3 className="font-serif text-base  text-[var(--ink)]">
              {lang === "de" ? "Dialektische Urteils-Waage" : "辩证天平 (Dialektische Waage)"}
            </h3>
            <span className="rounded-[var(--radius)] bg-[var(--success)]/10 text-[var(--success)] px-2 py-0.5 text-[var(--text-meta)] font-mono uppercase tracking-wider">
              {activeCase.fach} · AFB III
            </span>
          </div>
          <p className="mt-1 text-xs font-serif text-[var(--ink)] font-medium">
            „{activeCase.frageDE}“
          </p>
          <p className="font-sans text-[var(--text-meta)] text-[var(--gray)]">
            {activeCase.frageZH}
          </p>
        </div>

        <select
          value={selectedCaseId}
          onChange={(e) => {
            setSelectedCaseId(e.target.value);
            resetAll();
          }}
          className="rounded-[var(--radius)] border border-[var(--line)] bg-[var(--paper)] px-2.5 py-1 text-xs font-mono text-[var(--ink)] focus:border-[var(--success)] cursor-pointer"
        >
          {PRESET_CASES.map((c) => (
            <option key={c.id} value={c.id}>
              [{c.fach}] {c.id}
            </option>
          ))}
        </select>
      </div>

      {/* 动态天平视觉核心 (Inline SVG) */}
      <div className="mb-5 rounded-[var(--radius)] border border-[var(--line)] bg-[var(--paper)] p-4 flex flex-col items-center justify-center">
        <div className="w-full max-w-md h-44 relative flex items-center justify-center">
          <svg viewBox="0 0 400 160" className="w-full h-full overflow-visible">
            {/* Sockel / Fulcrum Standfuß */}
            <path d="M 180 150 L 220 150 L 205 70 L 195 70 Z" fill="var(--gray)" opacity="0.3" />
            <circle cx="200" cy="70" r="5" fill="var(--ink)" />
            <line x1="200" y1="70" x2="200" y2="150" stroke="var(--ink)" strokeWidth="2.5" />
            <line x1="160" y1="150" x2="240" y2="150" stroke="var(--ink)" strokeWidth="3" strokeLinecap="round" />

            {/* Rotierender Waagebalken */}
            <g
              style={{
                transform: `rotate(${tiltAngle}deg)`,
                transformOrigin: "200px 70px",
                transition: "transform var(--dur-view) var(--ease-out)",
              }}
            >
              {/* Querbalken */}
              <line x1="70" y1="70" x2="330" y2="70" stroke="var(--ink)" strokeWidth="4" strokeLinecap="round" />
              <circle cx="200" cy="70" r="4" fill="var(--surface)" stroke="var(--ink)" strokeWidth="2" />

              {/* Linke Aufhängung (Pro) */}
              <g style={{ transform: `rotate(${-tiltAngle}deg)`, transformOrigin: "70px 70px" }}>
                <line x1="70" y1="70" x2="45" y2="115" stroke="var(--accent)" strokeWidth="1.5" />
                <line x1="70" y1="70" x2="95" y2="115" stroke="var(--accent)" strokeWidth="1.5" />
                <path d="M 40 115 C 40 130 100 130 100 115 Z" fill="var(--surface)" stroke="var(--accent)" strokeWidth="2" />
                {/* Text im Teller */}
                <text x="70" y="125" textAnchor="middle" fontSize="12" fontFamily="monospace" fill="var(--accent)" fontWeight="bold">
                  {proScore} Pkt
                </text>
              </g>

              {/* Rechte Aufhängung (Contra) */}
              <g style={{ transform: `rotate(${-tiltAngle}deg)`, transformOrigin: "330px 70px" }}>
                <line x1="330" y1="70" x2="305" y2="115" stroke="var(--warning)" strokeWidth="1.5" />
                <line x1="330" y1="70" x2="355" y2="115" stroke="var(--warning)" strokeWidth="1.5" />
                <path d="M 300 115 C 300 130 360 130 360 115 Z" fill="var(--paper-subtle)" stroke="var(--warning)" strokeWidth="2" />
                {/* Text im Teller */}
                <text x="330" y="125" textAnchor="middle" fontSize="12" fontFamily="monospace" fill="var(--warning)" fontWeight="bold">
                  {contraScore} Pkt
                </text>
              </g>
            </g>
          </svg>
        </div>

        {/* Statusanzeige des Neigungswinkels */}
        <div className="flex items-center justify-between w-full max-w-md pt-2 border-t border-[var(--line)] text-[var(--text-meta)] font-mono">
          <span className="text-[var(--accent)] font-medium">
            Pro: {proScore} Pkt ({placedProIds.length} {lang === "de" ? "Argumente" : "项论据"})
          </span>
          <span className="text-[var(--gray)]">
            {scoreDelta > 0
              ? (lang === "de" ? "▲ Pro überwiegt" : "▲ 偏向赞同 (Pro)")
              : scoreDelta < 0
              ? (lang === "de" ? "▼ Contra überwiegt" : "▼ 偏向反方 (Contra)")
              : (lang === "de" ? "● Im Gleichgewicht" : "● 势均力敌")}
          </span>
          <span className="text-[var(--warning)] font-medium">
            Contra: {contraScore} Pkt ({placedContraIds.length} {lang === "de" ? "Argumente" : "项论据"})
          </span>
        </div>
      </div>

      {/* 核心价值冲突与准则选择 (AFB III Leitkriterium) */}
      <div className="mb-4">
        <label className="text-[var(--text-meta)] font-mono uppercase tracking-wider text-[var(--gray)] block mb-1.5">
          {lang === "de" ? "Leitendes Werturteilskriterium:" : "核心价值冲突与裁决准则 (Werturteil-Achse):"}
        </label>
        <div className="flex flex-wrap gap-1.5">
          {activeCase.valuesConflict.map((conflict, index) => (
            <button
              key={conflict}
              type="button"
              onClick={() => setSelectedConflict(conflict)}
              className={`px-2.5 py-1 text-left font-mono rounded-[var(--radius)] border transition-colors cursor-pointer ${
                selectedConflict === conflict
                  ? "border-[var(--accent)] text-[var(--accent)]"
                  : "border-[var(--line)] text-[var(--ink)] hover:border-[var(--gray)]"
              }`}
            >
              <span className="block">{conflict}</span>
              <span className="zh-translation block font-sans">{activeCase.valuesConflictZH?.[index]}</span>
            </button>
          ))}
        </div>
      </div>

      {/* 论据砝码卡片池 (Weight Cards) */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[var(--text-meta)] font-mono uppercase tracking-wider text-[var(--gray)]">
            {lang === "de" ? "Verfügbare Gewichte (Klicken zum Auflegen/Entfernen):" : "论据砝码库 (点击放置或移出天平托盘):"}
          </span>
          <button
            type="button"
            onClick={resetAll}
            className="inline-flex items-center gap-1 font-mono text-[var(--text-meta)] text-[var(--gray)] hover:text-[var(--ink)]"
          >
            <ResetIcon />
            {lang === "de" ? "Alle entfernen / 清空砝码" : "清空砝码 / Alle entfernen"}
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {/* Pro-Spalte */}
          <div className="space-y-2">
            <span className="block font-mono text-[var(--text-meta)] uppercase tracking-wider text-[var(--accent)]">
              + {activeCase.labelProDE}
              <span className="zh-translation block font-sans normal-case">{activeCase.labelProZH}</span>
            </span>
            {activeCase.availableWeights
              .filter((w) => w.side === "pro")
              .map((w) => {
                const isPlaced = placedProIds.includes(w.id);
                return (
                  <button
                    key={w.id}
                    type="button"
                    onClick={() => toggleWeight(w)}
                    className={`w-full rounded-[var(--radius)] border p-2.5 text-left transition-colors cursor-pointer ${
                      isPlaced
                        ? "border-[var(--accent)] bg-[var(--paper-subtle)]  ring-1 ring-[var(--accent)]/20"
                        : "border-[var(--line)] bg-[var(--paper)] hover:border-[var(--gray)]"
                    }`}
                  >
                    <div className="flex items-center justify-between text-[var(--text-meta)] font-mono mb-1">
                      <span>
                        <span className=" text-[var(--accent)]">{w.categoryDE}</span>
                        <span className="zh-translation block font-sans">{w.categoryZH}</span>
                      </span>
                      <span className="bg-[var(--surface)]/80 px-1.5 py-0.2 rounded-[var(--radius)] border border-[var(--accent)] text-[var(--accent)] ">
                        {w.weight} Pkt · {isPlaced ? "Auf Waage / 已放置" : "Auflegen / 放置"}
                      </span>
                    </div>
                    <p className="font-serif text-xs text-[var(--ink)] leading-snug font-medium">
                      {w.textDE}
                    </p>
                    <p className="font-sans text-[var(--text-meta)] text-[var(--gray)] mt-1">
                      {w.textZH}
                    </p>
                  </button>
                );
              })}
          </div>

          {/* Contra-Spalte */}
          <div className="space-y-2">
            <span className="block font-mono text-[var(--text-meta)] uppercase tracking-wider text-[var(--warning)]">
              − {activeCase.labelContraDE}
              <span className="zh-translation block font-sans normal-case">{activeCase.labelContraZH}</span>
            </span>
            {activeCase.availableWeights
              .filter((w) => w.side === "contra")
              .map((w) => {
                const isPlaced = placedContraIds.includes(w.id);
                return (
                  <button
                    key={w.id}
                    type="button"
                    onClick={() => toggleWeight(w)}
                    className={`w-full rounded-[var(--radius)] border p-2.5 text-left transition-colors cursor-pointer ${
                      isPlaced
                        ? "border-[var(--warning)] bg-[var(--paper-subtle)]  ring-1 ring-[var(--warning)]/20"
                        : "border-[var(--line)] bg-[var(--paper)] hover:border-[var(--gray)]"
                    }`}
                  >
                    <div className="flex items-center justify-between text-[var(--text-meta)] font-mono mb-1">
                      <span>
                        <span className=" text-[var(--warning)]">{w.categoryDE}</span>
                        <span className="zh-translation block font-sans">{w.categoryZH}</span>
                      </span>
                      <span className="bg-[var(--surface)]/80 px-1.5 py-0.2 rounded-[var(--radius)] border border-[var(--warning)] text-[var(--warning)] ">
                        {w.weight} Pkt · {isPlaced ? "Auf Waage / 已放置" : "Auflegen / 放置"}
                      </span>
                    </div>
                    <p className="font-serif text-xs text-[var(--ink)] leading-snug font-medium">
                      {w.textDE}
                    </p>
                    <p className="font-sans text-[var(--text-meta)] text-[var(--gray)] mt-1">
                      {w.textZH}
                    </p>
                  </button>
                );
              })}
          </div>
        </div>
      </div>

      {/* 裁决合成输出卡片 (Synthese Output) */}
      {urteilText && (
        <div className="rounded-[var(--radius)] border border-[var(--success)] bg-[var(--paper-subtle)] p-3 text-xs leading-relaxed">
          <div className="flex items-center justify-between font-mono text-[var(--text-meta)] text-[var(--success)] mb-1.5">
            <span className="flex items-center gap-1 ">
              <svg width="16" height="16" aria-hidden="true" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6">
                <path d="M2.5 8.5l3.5 3.5 7.5-7.5" />
              </svg>
              <span>{lang === "de" ? "Theoriegeleitetes Urteil (AFB III)" : "自动合成的考纲级裁决 (AFB III Werturteil)"}</span>
            </span>
            <button
              type="button"
              onClick={handleCopy}
              className="inline-flex items-center gap-1 rounded-[var(--radius)] border border-[var(--success)] px-2.5 py-0.5 font-sans text-[var(--text-meta)] text-[var(--success)] transition-colors"
            >
              <svg width="16" height="16" aria-hidden="true" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6">
                <path d="M11.5 4.5H4.5a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h7a1 1 0 0 0 1-1v-6a1 1 0 0 0-1-1z" />
                <path d="M4.5 4.5V3a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v6a1 1 0 0 1-1 1h-1.5" />
              </svg>
              <span>{copied ? (lang === "de" ? "Kopiert / 已复制" : "已复制 / Kopiert") : (lang === "de" ? "Urteil kopieren / 复制裁决文本" : "复制裁决文本 / Urteil kopieren")}</span>
            </button>
          </div>

          <p className="font-serif text-xs text-[var(--ink)] font-medium leading-relaxed">
            „{urteilText}“
          </p>

          <p className="mt-2 text-[var(--text-meta)] font-mono text-[var(--success)]">
            {lang === "de"
              ? "Erfüllt NRW-Operatoren 'beurteilen' und 'bewerten' durch explizite Kriterienoffenlegung. / 满足 NRW 考纲算子 beurteilen / bewerten 要求。"
              : "满足 NRW 考纲算子 beurteilen / bewerten 要求，做到了事实分析、判决准则与价值层级公开。 / Erfüllt NRW-Operatoren durch explizite Kriterienoffenlegung."}
          </p>
        </div>
      )}
    </div>
  );
}
