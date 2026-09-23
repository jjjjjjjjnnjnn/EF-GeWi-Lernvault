// Satzbau-Lego: Pädagogischer Baukasten für analytische Klausur-Sätze.
// Beseitigt die "Angst vor dem leeren Blatt" durch visuelles Stecken von Satzbausteinen.
// Streng nach NRW AFB II/III Bewertungsraster: Fundstelle + Analytisches Verb + Mittel + Wirkung.
// Reines Inline-SVG, kein Emoji, Tufte-Design-Token.

import { useState } from "react";

export type LegoCategory = "fundstelle" | "verb" | "mittel" | "wirkung";

export interface LegoBlock {
  id: string;
  category: LegoCategory;
  textDE: string;
  textZH: string;
  hint?: string;
}

export interface SatzbauTemplate {
  id: string;
  fach: "SoWi" | "Deutsch" | "Englisch" | "Philosophie";
  thema: string;
  descriptionDE: string;
  descriptionZH: string;
  targetSlots: LegoCategory[];
  availableBlocks: LegoBlock[];
  idealSentenceDE: string;
}

export const PRESET_TEMPLATES: SatzbauTemplate[] = [
  {
    id: "deutsch-sachtext-1",
    fach: "Deutsch",
    thema: "Sachtextanalyse · Argumentation",
    descriptionDE: "Analysiere, wie der Autor eine zentrale These rhetorisch stützt.",
    descriptionZH: "分析作者如何运用修辞手法有力支撑核心论点。",
    targetSlots: ["fundstelle", "verb", "mittel", "wirkung"],
    availableBlocks: [
      { id: "f1", category: "fundstelle", textDE: "In Zeile 14–18", textZH: "在第 14-18 行", hint: "Textbeleg" },
      { id: "f2", category: "fundstelle", textDE: "Im zweiten Sinnabschnitt (Z. 25–34)", textZH: "在第二意义段 (25-34行)", hint: "Textbeleg" },
      { id: "v1", category: "verb", textDE: "verdeutlicht der Autor", textZH: "作者明确阐述", hint: "Analytisches Verb" },
      { id: "v2", category: "verb", textDE: "entkräftet die Verfasserin", textZH: "作者驳斥了反方论据", hint: "Analytisches Verb" },
      { id: "v3", category: "verb", textDE: "unterstreicht der Verfasser", textZH: "作者重点强调", hint: "Analytisches Verb" },
      { id: "m1", category: "mittel", textDE: "mithilfe eines normativen Arguments", textZH: "借助规范性论据 (普遍道德规范)", hint: "Rhetorisches Mittel" },
      { id: "m2", category: "mittel", textDE: "durch eine zugespitzte Antithese", textZH: "通过尖锐的对照 (Antithese)", hint: "Rhetorisches Mittel" },
      { id: "m3", category: "mittel", textDE: "anhand statistischer Faktenargumente", textZH: "依据统计事实论据", hint: "Rhetorisches Mittel" },
      { id: "w1", category: "wirkung", textDE: "um die gesellschaftliche Dringlichkeit hervorzuheben.", textZH: "以凸显改革在社会层面的紧迫性。", hint: "Wirkungsabsicht" },
      { id: "w2", category: "wirkung", textDE: "um beim Leser moralische Betroffenheit auszulösen.", textZH: "从而激发读者的道德共鸣与危机意识。", hint: "Wirkungsabsicht" },
      { id: "w3", category: "wirkung", textDE: "um die Glaubwürdigkeit der eigenen Position zu festigen.", textZH: "从而巩固自身立场的公信力与说服力。", hint: "Wirkungsabsicht" },
    ],
    idealSentenceDE: "In Zeile 14–18 verdeutlicht der Autor mithilfe eines normativen Arguments, um die gesellschaftliche Dringlichkeit hervorzuheben.",
  },
  {
    id: "sowi-ungleichheit-1",
    fach: "SoWi",
    thema: "Soziale Ungleichheit · Dimensionen",
    descriptionDE: "Formuliere eine theoriegestützte Aussage zur Chancenungleichheit.",
    descriptionZH: "结合考纲规范句，阐述社会分层与机会不平等。",
    targetSlots: ["fundstelle", "verb", "mittel", "wirkung"],
    availableBlocks: [
      { id: "sf1", category: "fundstelle", textDE: "Aus dem Datenmaterial der Bundeszentrale", textZH: "依据联邦政治教育中心的数据材料", hint: "Beleg" },
      { id: "sf2", category: "fundstelle", textDE: "Im Hinblick auf das Hradil-Modell", textZH: "从哈迪尔社会分层模型出发", hint: "Modellbezug" },
      { id: "sv1", category: "verb", textDE: "erweist sich die Bildungsherkunft", textZH: "家庭受教育背景显现出", hint: "Kernurteil" },
      { id: "sv2", category: "verb", textDE: "fungiert das Einkommensgefälle", textZH: "收入差距直接充当了", hint: "Funktionsverb" },
      { id: "sm1", category: "mittel", textDE: "als primäre Determinante sozialer Mobilität,", textZH: "作为社会流动性的首要决定因素，", hint: "Fachbegriff" },
      { id: "sm2", category: "mittel", textDE: "als strukturelle Verfestigung vertikaler Ungleichheit,", textZH: "作为纵向不平等的结构性固化机制，", hint: "Fachbegriff" },
      { id: "sw1", category: "wirkung", textDE: "wodurch das meritokratische Leistungsprinzip partiell ausgehebelt wird.", textZH: "从而在一定程度上削弱了唯贤论与绩效原则的实效。", hint: "Klausur-Fazit" },
      { id: "sw2", category: "wirkung", textDE: "was den Abbau von Startchancen systematisch behindert.", textZH: "在系统层面上阻碍了起点机会均等的实现。", hint: "Klausur-Fazit" },
    ],
    idealSentenceDE: "Im Hinblick auf das Hradil-Modell erweist sich die Bildungsherkunft als primäre Determinante sozialer Mobilität, wodurch das meritokratische Leistungsprinzip partiell ausgehebelt wird.",
  },
  {
    id: "philo-kant-1",
    fach: "Philosophie",
    thema: "Kant · Deontologische Ethik",
    descriptionDE: "Wende die Universalisierungsformel des Kategorischen Imperativs an.",
    descriptionZH: "应用康德绝对命令普遍化公式，评判道德行为。",
    targetSlots: ["fundstelle", "verb", "mittel", "wirkung"],
    availableBlocks: [
      { id: "pf1", category: "fundstelle", textDE: "Gemäß der kantischen Pflichtethik", textZH: "遵循康德道义伦理学原则", hint: "Theorie" },
      { id: "pf2", category: "fundstelle", textDE: "Unter Anwendung des Kategorischen Imperativs", textZH: "在运用绝对命令普遍法则检验时", hint: "Kriterium" },
      { id: "pv1", category: "verb", textDE: "widerspricht die geplante Handlung", textZH: "该拟定行为直接违背了", hint: "Prüfungsverb" },
      { id: "pv2", category: "verb", textDE: "verletzt die zugrundeliegende Maxime", textZH: "其所依据的准则公然侵犯了", hint: "Prüfungsverb" },
      { id: "pm1", category: "mittel", textDE: "der Menschheitszweckformel (Instrumentalisierungsverbot),", textZH: "目的公式（禁止把人仅当作手段使用），", hint: "Formel" },
      { id: "pm2", category: "mittel", textDE: "dem Kriterium der widerspruchsfreien Universalisierbarkeit,", textZH: "无逻辑矛盾的可普遍化检验标准，", hint: "Formel" },
      { id: "pw1", category: "wirkung", textDE: "sodass ihr jeglicher moralische Eigenwert abgesprochen werden muss.", textZH: "因此必须剥夺其任何内在道德价值与正当性。", hint: "Klausur-Schluss" },
      { id: "pw2", category: "wirkung", textDE: "da eine Instrumentalisierung der menschlichen Würde vorliegt.", textZH: "因其构成了对人类尊严的工具化侵犯。", hint: "Klausur-Schluss" },
    ],
    idealSentenceDE: "Gemäß der kantischen Pflichtethik widerspricht die geplante Handlung der Menschheitszweckformel (Instrumentalisierungsverbot), da eine Instrumentalisierung der menschlichen Würde vorliegt.",
  },
];

const CATEGORY_META: Record<
  LegoCategory,
  { labelDE: string; labelZH: string; colorBorder: string; colorBg: string; colorText: string; dotColor: string }
> = {
  fundstelle: {
    labelDE: "Fundstelle / Kontext",
    labelZH: "① 出处与情境",
    colorBorder: "border-[#4338CA]",
    colorBg: "bg-[#EEF2FF]",
    colorText: "text-[#312E81]",
    dotColor: "bg-[#4338CA]",
  },
  verb: {
    labelDE: "Analytisches Verb",
    labelZH: "② 分析性动词",
    colorBorder: "border-[#047857]",
    colorBg: "bg-[#ECFDF5]",
    colorText: "text-[#065F46]",
    dotColor: "bg-[#047857]",
  },
  mittel: {
    labelDE: "Mittel / Argumenttyp",
    labelZH: "③ 手法与论据",
    colorBorder: "border-[#B45309]",
    colorBg: "bg-[#FFFBEB]",
    colorText: "text-[#92400E]",
    dotColor: "bg-[#B45309]",
  },
  wirkung: {
    labelDE: "Wirkungsabsicht / Fazit",
    labelZH: "④ 效果与结论",
    colorBorder: "border-[#BE185D]",
    colorBg: "bg-[#FDF2F8]",
    colorText: "text-[#831843]",
    dotColor: "bg-[#BE185D]",
  },
};

export interface SatzbauLegoProps {
  templateId?: string;
  lang?: "de" | "zh";
  onSentenceComplete?: (sentenceDE: string) => void;
  onJumpToFehlerlog?: (incorrectAttempt: string) => void;
}

export function SatzbauLego({
  templateId,
  lang = "zh",
  onSentenceComplete,
  onJumpToFehlerlog,
}: SatzbauLegoProps) {
  const [selectedTemplateId, setSelectedTemplateId] = useState<string>(
    templateId || PRESET_TEMPLATES[0].id
  );
  const activeTemplate =
    PRESET_TEMPLATES.find((t) => t.id === selectedTemplateId) || PRESET_TEMPLATES[0];

  // Gesteckte Slots (Category -> LegoBlock | null)
  const [slots, setSlots] = useState<Record<LegoCategory, LegoBlock | null>>({
    fundstelle: null,
    verb: null,
    mittel: null,
    wirkung: null,
  });

  const [copied, setCopied] = useState(false);
  const [checked, setChecked] = useState(false);

  // Stecken
  const handleDock = (block: LegoBlock) => {
    setSlots((prev) => ({
      ...prev,
      [block.category]: block,
    }));
    setChecked(false);
  };

  // Lösen
  const handleUndock = (category: LegoCategory) => {
    setSlots((prev) => ({
      ...prev,
      [category]: null,
    }));
    setChecked(false);
  };

  // Alles zurücksetzen
  const handleReset = () => {
    setSlots({
      fundstelle: null,
      verb: null,
      mittel: null,
      wirkung: null,
    });
    setChecked(false);
  };

  // Satz zusammenbauen
  const isFull =
    slots.fundstelle !== null &&
    slots.verb !== null &&
    slots.mittel !== null &&
    slots.wirkung !== null;

  const constructedSentence = isFull
    ? `${slots.fundstelle!.textDE} ${slots.verb!.textDE} ${slots.mittel!.textDE} ${slots.wirkung!.textDE}`
        .replace(/\s+,/g, ",")
        .replace(/\s+/g, " ")
        .trim()
    : "";

  const handleCopy = () => {
    if (!constructedSentence) return;
    navigator.clipboard.writeText(constructedSentence);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    onSentenceComplete?.(constructedSentence);
  };

  const isExactIdeal =
    constructedSentence.toLowerCase().replace(/[^a-zäöüß0-9]/g, "") ===
    activeTemplate.idealSentenceDE.toLowerCase().replace(/[^a-zäöüß0-9]/g, "");

  return (
    <div className="rounded-sm border border-[#E5E1D8] bg-white p-4 sm:p-5 shadow-xs">
      {/* 头部：标题与预设选择 */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#E5E1D8] pb-3 mb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="inline-block w-2.5 h-2.5 rounded-full bg-[#4338CA]" />
            <h3 className="font-serif text-base font-semibold text-[#1C1B17]">
              {lang === "de" ? "Satzbau-Lego" : "句式积木 (Satzbau-Lego)"}
            </h3>
            <span className="rounded-xs bg-[#4338CA]/10 text-[#4338CA] px-2 py-0.5 text-[10px] font-mono uppercase tracking-wider">
              {activeTemplate.fach}
            </span>
          </div>
          <p className="mt-1 text-xs font-sans text-[#6B675C]">
            {lang === "de" ? activeTemplate.descriptionDE : activeTemplate.descriptionZH}
          </p>
        </div>

        {/* 预设切换下拉 */}
        <select
          value={selectedTemplateId}
          onChange={(e) => {
            setSelectedTemplateId(e.target.value);
            handleReset();
          }}
          className="rounded-xs border border-[#E5E1D8] bg-[#FAF9F6] px-2.5 py-1 text-xs font-mono text-[#1C1B17] focus:border-[#4338CA] focus:outline-none cursor-pointer"
        >
          {PRESET_TEMPLATES.map((tmpl) => (
            <option key={tmpl.id} value={tmpl.id}>
              [{tmpl.fach}] {tmpl.thema}
            </option>
          ))}
        </select>
      </div>

      {/* 拼装工作台 (Slots) */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[11px] font-mono uppercase tracking-wider text-[#6B675C]">
            {lang === "de" ? "Steck-Platte (Ziel-Satz):" : "拼装底板 (目标卡槽):"}
          </span>
          <button
            type="button"
            onClick={handleReset}
            className="text-[10px] font-mono text-[#6B675C] hover:text-[#1C1B17] cursor-pointer"
          >
            {lang === "de" ? "↺ Zurücksetzen" : "↺ 清空插槽"}
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2.5">
          {(["fundstelle", "verb", "mittel", "wirkung"] as LegoCategory[]).map((cat) => {
            const meta = CATEGORY_META[cat];
            const block = slots[cat];

            return (
              <div
                key={cat}
                className={`min-h-[72px] rounded-xs border-2 border-dashed p-2 flex flex-col justify-between transition-all ${
                  block
                    ? `${meta.colorBorder} ${meta.colorBg} border-solid shadow-xs`
                    : "border-[#E5E1D8] bg-[#FAF9F6] hover:border-[#6B675C]"
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="flex items-center gap-1.5 text-[10px] font-mono font-medium text-[#6B675C]">
                    <span className={`w-1.5 h-1.5 rounded-full ${meta.dotColor}`} />
                    {lang === "de" ? meta.labelDE : meta.labelZH}
                  </span>
                  {block && (
                    <button
                      type="button"
                      onClick={() => handleUndock(cat)}
                      className="text-[#6B675C] hover:text-[#991B1B] text-xs font-mono px-1 cursor-pointer"
                      title={lang === "de" ? "Lösen" : "取下积木"}
                    >
                      ✕
                    </button>
                  )}
                </div>

                {block ? (
                  <div className="animate-in fade-in zoom-in-95 duration-150">
                    <p className={`font-serif text-xs font-medium ${meta.colorText} leading-tight`}>
                      {block.textDE}
                    </p>
                    <p className="mt-0.5 font-sans text-[10px] text-[#6B675C] truncate">
                      {block.textZH}
                    </p>
                  </div>
                ) : (
                  <div className="flex items-center justify-center h-8 text-[11px] font-sans text-[#6B675C]/60 italic">
                    {lang === "de" ? "Baustein wählen ↓" : "点击下方积木放入 ↓"}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* 拼装成果实时预览条 */}
      {isFull && (
        <div className="mb-4 rounded-xs border border-[#C7D2FE] bg-[#F5F7FF] p-3 text-xs leading-relaxed animate-in fade-in duration-200">
          <div className="flex items-center justify-between font-mono text-[10px] text-[#4338CA] mb-1.5">
            <span className="flex items-center gap-1 font-semibold">
              <svg className="w-3.5 h-3.5" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6">
                <path d="M2.5 8.5l3.5 3.5 7.5-7.5" />
              </svg>
              <span>{lang === "de" ? "Vollständiger Klausur-Satz" : "拼装完成的高分考纲句"}</span>
            </span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setChecked(true)}
                className="text-[10px] font-mono text-[#4338CA] hover:underline cursor-pointer"
              >
                {lang === "de" ? "Prüfen" : "考纲标准度校验"}
              </button>
              <button
                type="button"
                onClick={handleCopy}
                className="inline-flex items-center gap-1 rounded-xs bg-[#4338CA] text-white px-2.5 py-0.5 text-[10px] font-sans hover:bg-[#3730A3] transition-colors cursor-pointer"
              >
                <svg className="w-3 h-3" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6">
                  <path d="M11.5 4.5H4.5a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h7a1 1 0 0 0 1-1v-6a1 1 0 0 0-1-1z" />
                  <path d="M4.5 4.5V3a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v6a1 1 0 0 1-1 1h-1.5" />
                </svg>
                <span>{copied ? (lang === "de" ? "✓ Kopiert" : "✓ 已复制") : (lang === "de" ? "Kopieren" : "复制句子")}</span>
              </button>
            </div>
          </div>

          <p className="font-serif text-sm text-[#1C1B17] font-medium leading-relaxed">
            „{constructedSentence}“
          </p>

          {checked && (
            <div
              className={`mt-2 rounded-xs border p-2 text-[11px] font-mono leading-relaxed transition-all ${
                isExactIdeal
                  ? "border-[#A7F3D0] bg-[#ECFDF5] text-[#065F46]"
                  : "border-[#FDE68A] bg-[#FFFBEB] text-[#92400E]"
              }`}
            >
              {isExactIdeal ? (
                <span>
                  ✓ {lang === "de" ? "Exzellent! Erfüllt alle AFB-II/III Kriterien optimal." : "完美组合！完全契合北威州评分细目表 (EHZ) 与分析句动词搭配。"}
                </span>
              ) : (
                <div className="flex items-center justify-between">
                  <span>
                    ℹ {lang === "de" ? "Syntaktisch valide! Tipp: Prüfe die ideale Formulierung:" : "语法完全成立！亦可参考官方标杆表述："}
                    <span className="block font-serif font-medium mt-0.5 text-[#1C1B17]">
                      „{activeTemplate.idealSentenceDE}“
                    </span>
                  </span>
                  {onJumpToFehlerlog && (
                    <button
                      type="button"
                      onClick={() => onJumpToFehlerlog(constructedSentence)}
                      className="shrink-0 text-[10px] text-[#B45309] underline hover:text-[#1C1B17] ml-2 cursor-pointer"
                    >
                      {lang === "de" ? "In Fehlerlog" : "存入错题备查"}
                    </button>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* 待选积木池 (Block Reservoir) */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <span className="text-[11px] font-mono uppercase tracking-wider text-[#6B675C]">
            {lang === "de" ? "Verfügbare Bausteine (Klicken zum Einstecken):" : "可用备选积木库 (点击自动放入对应卡槽):"}
          </span>
          <span className="text-[10px] font-mono text-[#6B675C]">
            {activeTemplate.availableBlocks.length} {lang === "de" ? "Bausteine" : "块积木"}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
          {activeTemplate.availableBlocks.map((blk) => {
            const meta = CATEGORY_META[blk.category];
            const isDocked = slots[blk.category]?.id === blk.id;

            return (
              <button
                key={blk.id}
                type="button"
                onClick={() => (isDocked ? handleUndock(blk.category) : handleDock(blk))}
                className={`group flex flex-col justify-between rounded-xs border p-2.5 text-left transition-all cursor-pointer ${
                  isDocked
                    ? `${meta.colorBorder} ${meta.colorBg} ring-1 ${meta.colorBorder}/20 shadow-xs`
                    : "border-[#E5E1D8] bg-[#FAF9F6] hover:border-[#6B675C] hover:bg-white"
                }`}
              >
                <div className="flex items-center justify-between mb-1.5 w-full">
                  <span className={`inline-flex items-center gap-1 rounded-xs px-1.5 py-0.2 text-[9px] font-mono ${meta.colorBg} ${meta.colorText} border ${meta.colorBorder}/30`}>
                    <span className={`w-1 h-1 rounded-full ${meta.dotColor}`} />
                    {lang === "de" ? meta.labelDE : meta.labelZH}
                  </span>
                  <span className="text-[9px] font-mono text-[#6B675C]">
                    {isDocked ? (lang === "de" ? "✓ Gesteckt" : "✓ 已插入") : "+ 插卡"}
                  </span>
                </div>

                <div className="w-full">
                  <p className="font-serif text-xs font-semibold text-[#1C1B17] group-hover:text-[#4338CA] transition-colors leading-tight">
                    {blk.textDE}
                  </p>
                  <p className="mt-1 font-sans text-[10px] text-[#6B675C] line-clamp-1">
                    {blk.textZH}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
