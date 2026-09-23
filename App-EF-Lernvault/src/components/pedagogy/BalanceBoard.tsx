// BalanceBoard: Pädagogische dialektische Urteils-Waage für SoWi & Philosophie (AFB III).
// Löst die Schwierigkeit, ein theoriegeleitetes Sach- und Werturteil zu fällen.
// Physische Waage mit dynamischem Neigungswinkel, Argument-Gewichten und Synthese-Generator.
// Reines Inline-SVG, kein Emoji, Tufte-Design-Token.

import { useState } from "react";

export interface WeightItem {
  id: string;
  side: "pro" | "contra";
  textDE: string;
  textZH: string;
  weight: 1 | 2 | 3; // 1 = schwach, 2 = mittel, 3 = schwerwiegend (z.B. Grundgesetz / Menschenwürde)
  categoryDE: string;
}

export interface BalanceCase {
  id: string;
  fach: "SoWi" | "Philosophie";
  frageDE: string;
  frageZH: string;
  labelProDE: string;
  labelContraDE: string;
  valuesConflict: string[]; // z.B. ["Freiheit vs. Gerechtigkeit", "Wohlstand vs. Ökologie"]
  availableWeights: WeightItem[];
}

export const PRESET_CASES: BalanceCase[] = [
  {
    id: "sowi-mindestlohn",
    fach: "SoWi",
    frageDE: "Sollte der gesetzliche Mindestlohn auf 15 Euro pro Stunde erhöht werden?",
    frageZH: "是否应该将德国法定最低工资提高至每小时 15 欧元？(EF.2 经济政策争端)",
    labelProDE: "Befürworter (Gewerkschaften / Soziale Gerechtigkeit)",
    labelContraDE: "Kritiker (Arbeitgeberverbände / Wettbewerbsfähigkeit)",
    valuesConflict: [
      "Soziale Gerechtigkeit vs. Marktkonformität",
      "Kaufkraftstärkung vs. Inflationsrisiko",
      "Existenzsicherung vs. Beschäftigungssicherung",
    ],
    availableWeights: [
      {
        id: "p1",
        side: "pro",
        textDE: "Schutz vor Erwerbsarmut (Working Poor) und Stärkung der Binnennachfrage",
        textZH: "防范‘在职贫困’并拉动内需消费循环",
        weight: 3,
        categoryDE: "Sozialstaatsgebot (Art. 20 GG)",
      },
      {
        id: "p2",
        side: "pro",
        textDE: "Geringere Belastung der sozialen Sicherungssysteme durch Aufstocker",
        textZH: "减少国家对低收入‘社保补贴者’的财政垫付负担",
        weight: 2,
        categoryDE: "Fiskalische Entlastung",
      },
      {
        id: "c1",
        side: "contra",
        textDE: "Gefahr des Stellenabbaus im Niedriglohnsektor durch Rationalisierung / Automatisierung",
        textZH: "低技能工种面临被自动化或资本替代的失业风险",
        weight: 2,
        categoryDE: "Beschäftigungsrisiko",
      },
      {
        id: "c2",
        side: "contra",
        textDE: "Verletzung der Tarifautonomie (Art. 9 Abs. 3 GG) durch staatliche Lohnfestsetzung",
        textZH: "国家行政定价干预了劳资双方受宪法保护的‘薪资自主谈判权’",
        weight: 3,
        categoryDE: "Tarifautonomie",
      },
      {
        id: "c3",
        side: "contra",
        textDE: "Lohn-Preis-Spirale und Gefährdung der internationalen preislichen Wettbewerbsfähigkeit",
        textZH: "可能推高服务业价格并削弱中小企业对外出口竞争力",
        weight: 1,
        categoryDE: "Wettbewerbsfähigkeit",
      },
    ],
  },
  {
    id: "philo-trolley",
    fach: "Philosophie",
    frageDE: "Darf eine Weiche umgestellt werden, um fünf Menschen zu retten, wodurch ein Einzelner stirbt?",
    frageZH: "是否允许扳动道岔牺牲一人以拯救五人？(电车难题与生命权权衡)",
    labelProDE: "Utilitarismus (Maximierung des Gesamtnutzens)",
    labelContraDE: "Kantische Deontologie (Kategorischer Imperativ)",
    valuesConflict: [
      "Quantitativer Lebensnutzen vs. Menschenwürde",
      "Handlungsfolgen (Teleologie) vs. Pflicht (Deontologie)",
      "Aufrechnung von Menschenleben vs. Instrumentalisierungsverbot",
    ],
    availableWeights: [
      {
        id: "tp1",
        side: "pro",
        textDE: "Rettung von fünf Menschenleben überwiegt den Verlust eines Einzelnen (Hedonistisches Kalkül)",
        textZH: "挽救五条生命的净效用大于牺牲一人（功利主义苦乐差值计算）",
        weight: 2,
        categoryDE: "Nutzenmaximierung",
      },
      {
        id: "tp2",
        side: "pro",
        textDE: "Unterlassene Hilfeleistung minimieren; Schaden quantitativ begrenzen",
        textZH: "在无法两全的绝境中将现实伤亡数量降到最低",
        weight: 1,
        categoryDE: "Schadensminimierung",
      },
      {
        id: "tc1",
        side: "contra",
        textDE: "Menschheitszweckformel: Der Einzelne darf niemals bloß als Mittel zum Zweck gebraucht werden",
        textZH: "康德目的公式：人永远是自身的目的，绝不可被当作拯救他人的工具",
        weight: 3,
        categoryDE: "Instrumentalisierungsverbot",
      },
      {
        id: "tc2",
        side: "contra",
        textDE: "Verfassungskonforme Unantastbarkeit der Menschenwürde (Art. 1 Abs. 1 GG): Leben ist nicht abwägbar",
        textZH: "生命权与人的尊严不可克减侵犯，禁止在人命之间进行算术权衡",
        weight: 3,
        categoryDE: "Menschenwürde",
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
    <div className="rounded-sm border border-[#E5E1D8] bg-white p-4 sm:p-5 shadow-xs">
      {/* 头部：标题与案例切换 */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#E5E1D8] pb-3 mb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="inline-block w-2.5 h-2.5 rounded-full bg-[#047857]" />
            <h3 className="font-serif text-base font-semibold text-[#1C1B17]">
              {lang === "de" ? "Dialektische Urteils-Waage" : "辩证天平 (Dialektische Waage)"}
            </h3>
            <span className="rounded-xs bg-[#047857]/10 text-[#047857] px-2 py-0.5 text-[10px] font-mono uppercase tracking-wider">
              {activeCase.fach} · AFB III
            </span>
          </div>
          <p className="mt-1 text-xs font-serif text-[#1C1B17] font-medium">
            „{activeCase.frageDE}“
          </p>
          <p className="font-sans text-[11px] text-[#6B675C]">
            {activeCase.frageZH}
          </p>
        </div>

        <select
          value={selectedCaseId}
          onChange={(e) => {
            setSelectedCaseId(e.target.value);
            resetAll();
          }}
          className="rounded-xs border border-[#E5E1D8] bg-[#FAF9F6] px-2.5 py-1 text-xs font-mono text-[#1C1B17] focus:border-[#047857] focus:outline-none cursor-pointer"
        >
          {PRESET_CASES.map((c) => (
            <option key={c.id} value={c.id}>
              [{c.fach}] {c.id}
            </option>
          ))}
        </select>
      </div>

      {/* 动态天平视觉核心 (Inline SVG) */}
      <div className="mb-5 rounded-xs border border-[#E5E1D8] bg-[#FAF9F6] p-4 flex flex-col items-center justify-center">
        <div className="w-full max-w-md h-44 relative flex items-center justify-center">
          <svg viewBox="0 0 400 160" className="w-full h-full overflow-visible">
            {/* Sockel / Fulcrum Standfuß */}
            <path d="M 180 150 L 220 150 L 205 70 L 195 70 Z" fill="#6B675C" opacity="0.3" />
            <circle cx="200" cy="70" r="5" fill="#1C1B17" />
            <line x1="200" y1="70" x2="200" y2="150" stroke="#1C1B17" strokeWidth="2.5" />
            <line x1="160" y1="150" x2="240" y2="150" stroke="#1C1B17" strokeWidth="3" strokeLinecap="round" />

            {/* Rotierender Waagebalken */}
            <g
              style={{
                transform: `rotate(${tiltAngle}deg)`,
                transformOrigin: "200px 70px",
                transition: "transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
              }}
            >
              {/* Querbalken */}
              <line x1="70" y1="70" x2="330" y2="70" stroke="#1C1B17" strokeWidth="4" strokeLinecap="round" />
              <circle cx="200" cy="70" r="4" fill="#FAFAF7" stroke="#1C1B17" strokeWidth="2" />

              {/* Linke Aufhängung (Pro) */}
              <g style={{ transform: `rotate(${-tiltAngle}deg)`, transformOrigin: "70px 70px" }}>
                <line x1="70" y1="70" x2="45" y2="115" stroke="#4338CA" strokeWidth="1.5" />
                <line x1="70" y1="70" x2="95" y2="115" stroke="#4338CA" strokeWidth="1.5" />
                <path d="M 40 115 C 40 130 100 130 100 115 Z" fill="#EEF2FF" stroke="#4338CA" strokeWidth="2" />
                {/* Text im Teller */}
                <text x="70" y="125" textAnchor="middle" fontSize="10" fontFamily="monospace" fill="#312E81" fontWeight="bold">
                  {proScore} Pkt
                </text>
              </g>

              {/* Rechte Aufhängung (Contra) */}
              <g style={{ transform: `rotate(${-tiltAngle}deg)`, transformOrigin: "330px 70px" }}>
                <line x1="330" y1="70" x2="305" y2="115" stroke="#BE185D" strokeWidth="1.5" />
                <line x1="330" y1="70" x2="355" y2="115" stroke="#BE185D" strokeWidth="1.5" />
                <path d="M 300 115 C 300 130 360 130 360 115 Z" fill="#FDF2F8" stroke="#BE185D" strokeWidth="2" />
                {/* Text im Teller */}
                <text x="330" y="125" textAnchor="middle" fontSize="10" fontFamily="monospace" fill="#831843" fontWeight="bold">
                  {contraScore} Pkt
                </text>
              </g>
            </g>
          </svg>
        </div>

        {/* Statusanzeige des Neigungswinkels */}
        <div className="flex items-center justify-between w-full max-w-md pt-2 border-t border-[#E5E1D8] text-[11px] font-mono">
          <span className="text-[#4338CA] font-medium">
            Pro: {proScore} Pkt ({placedProIds.length} {lang === "de" ? "Argumente" : "项论据"})
          </span>
          <span className="text-[#6B675C]">
            {scoreDelta > 0
              ? (lang === "de" ? "▲ Pro überwiegt" : "▲ 偏向赞同 (Pro)")
              : scoreDelta < 0
              ? (lang === "de" ? "▼ Contra überwiegt" : "▼ 偏向反方 (Contra)")
              : (lang === "de" ? "● Im Gleichgewicht" : "● 势均力敌")}
          </span>
          <span className="text-[#BE185D] font-medium">
            Contra: {contraScore} Pkt ({placedContraIds.length} {lang === "de" ? "Argumente" : "项论据"})
          </span>
        </div>
      </div>

      {/* 核心价值冲突与准则选择 (AFB III Leitkriterium) */}
      <div className="mb-4">
        <label className="text-[11px] font-mono uppercase tracking-wider text-[#6B675C] block mb-1.5">
          {lang === "de" ? "Leitendes Werturteilskriterium:" : "核心价值冲突与裁决准则 (Werturteil-Achse):"}
        </label>
        <div className="flex flex-wrap gap-1.5">
          {activeCase.valuesConflict.map((conflict) => (
            <button
              key={conflict}
              type="button"
              onClick={() => setSelectedConflict(conflict)}
              className={`px-2.5 py-1 text-xs font-mono rounded-xs border transition-colors cursor-pointer ${
                selectedConflict === conflict
                  ? "bg-[#1C1B17] text-[#FAFAF7] border-[#1C1B17]"
                  : "bg-white text-[#1C1B17] border-[#E5E1D8] hover:border-[#6B675C]"
              }`}
            >
              {conflict}
            </button>
          ))}
        </div>
      </div>

      {/* 论据砝码卡片池 (Weight Cards) */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[11px] font-mono uppercase tracking-wider text-[#6B675C]">
            {lang === "de" ? "Verfügbare Gewichte (Klicken zum Auflegen/Entfernen):" : "论据砝码库 (点击放置或移出天平托盘):"}
          </span>
          <button
            type="button"
            onClick={resetAll}
            className="text-[10px] font-mono text-[#6B675C] hover:text-[#1C1B17] cursor-pointer"
          >
            {lang === "de" ? "↺ Alle entfernen" : "↺ 清空砝码"}
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {/* Pro-Spalte */}
          <div className="space-y-2">
            <span className="text-[10px] font-mono uppercase tracking-wider text-[#4338CA] font-semibold block">
              + {activeCase.labelProDE}
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
                    className={`w-full rounded-xs border p-2.5 text-left transition-all cursor-pointer ${
                      isPlaced
                        ? "border-[#4338CA] bg-[#EEF2FF] shadow-xs ring-1 ring-[#4338CA]/20"
                        : "border-[#E5E1D8] bg-[#FAF9F6] hover:border-[#6B675C]"
                    }`}
                  >
                    <div className="flex items-center justify-between text-[10px] font-mono mb-1">
                      <span className="text-[#312E81] font-semibold">{w.categoryDE}</span>
                      <span className="bg-white/80 px-1.5 py-0.2 rounded-xs border border-[#C7D2FE] text-[#4338CA] font-bold">
                        {w.weight} {w.weight === 1 ? "Pkt" : "Pkt"} {isPlaced ? "✓ Auf Waage" : "+ Auflegen"}
                      </span>
                    </div>
                    <p className="font-serif text-xs text-[#1C1B17] leading-snug font-medium">
                      {w.textDE}
                    </p>
                    <p className="font-sans text-[10px] text-[#6B675C] mt-1">
                      {w.textZH}
                    </p>
                  </button>
                );
              })}
          </div>

          {/* Contra-Spalte */}
          <div className="space-y-2">
            <span className="text-[10px] font-mono uppercase tracking-wider text-[#BE185D] font-semibold block">
              − {activeCase.labelContraDE}
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
                    className={`w-full rounded-xs border p-2.5 text-left transition-all cursor-pointer ${
                      isPlaced
                        ? "border-[#BE185D] bg-[#FDF2F8] shadow-xs ring-1 ring-[#BE185D]/20"
                        : "border-[#E5E1D8] bg-[#FAF9F6] hover:border-[#6B675C]"
                    }`}
                  >
                    <div className="flex items-center justify-between text-[10px] font-mono mb-1">
                      <span className="text-[#831843] font-semibold">{w.categoryDE}</span>
                      <span className="bg-white/80 px-1.5 py-0.2 rounded-xs border border-[#FBCFE8] text-[#BE185D] font-bold">
                        {w.weight} {w.weight === 1 ? "Pkt" : "Pkt"} {isPlaced ? "✓ Auf Waage" : "+ Auflegen"}
                      </span>
                    </div>
                    <p className="font-serif text-xs text-[#1C1B17] leading-snug font-medium">
                      {w.textDE}
                    </p>
                    <p className="font-sans text-[10px] text-[#6B675C] mt-1">
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
        <div className="rounded-xs border border-[#A7F3D0] bg-[#ECFDF5] p-3 text-xs leading-relaxed animate-in fade-in duration-200">
          <div className="flex items-center justify-between font-mono text-[10px] text-[#065F46] mb-1.5">
            <span className="flex items-center gap-1 font-semibold">
              <svg className="w-3.5 h-3.5" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6">
                <path d="M2.5 8.5l3.5 3.5 7.5-7.5" />
              </svg>
              <span>{lang === "de" ? "Theoriegeleitetes Urteil (AFB III)" : "自动合成的考纲级裁决 (AFB III Werturteil)"}</span>
            </span>
            <button
              type="button"
              onClick={handleCopy}
              className="inline-flex items-center gap-1 rounded-xs bg-[#047857] text-white px-2.5 py-0.5 text-[10px] font-sans hover:bg-[#065F46] transition-colors cursor-pointer"
            >
              <svg className="w-3 h-3" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6">
                <path d="M11.5 4.5H4.5a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h7a1 1 0 0 0 1-1v-6a1 1 0 0 0-1-1z" />
                <path d="M4.5 4.5V3a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v6a1 1 0 0 1-1 1h-1.5" />
              </svg>
              <span>{copied ? (lang === "de" ? "✓ Kopiert" : "✓ 已复制") : (lang === "de" ? "Urteil kopieren" : "复制裁决文本")}</span>
            </button>
          </div>

          <p className="font-serif text-xs text-[#1C1B17] font-medium leading-relaxed">
            „{urteilText}“
          </p>

          <p className="mt-2 text-[10px] font-mono text-[#065F46]">
            {lang === "de"
              ? "✓ Erfüllt NRW-Operatoren 'beurteilen' und 'bewerten' durch explizite Kriterienoffenlegung."
              : "✓ 完美满足 NRW 考纲算子 beurteilen / bewerten 要求，做到了事实分析、判决准则与价值层级公开。"}
          </p>
        </div>
      )}
    </div>
  );
}
