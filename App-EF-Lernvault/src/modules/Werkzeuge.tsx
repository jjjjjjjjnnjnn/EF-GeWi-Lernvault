import { useState, useMemo, type ReactNode } from "react";
import type { Lang } from "../i18n";
import { FAECHER, type FachId } from "../fach";
import { getToolsForFach, getFachDidaktik, type DidaktikToolId } from "../engine/fachDidaktik";
import { SatzbauLego } from "../components/pedagogy/SatzbauLego";
import { BalanceBoard } from "../components/pedagogy/BalanceBoard";
import { TextHighlighter } from "../components/pedagogy/TextHighlighter";
import { TangentSlider } from "../components/pedagogy/TangentSlider";
import FormulaScaffold from "../components/pedagogy/FormulaScaffold";
import OralExamTimer from "../components/pedagogy/OralExamTimer";

interface WerkzeugeProps {
  lang: Lang;
  selectedFach?: string;
  onSubjectChange?: (fach: string) => void;
  onDiscussInTutor?: (prompt: string) => void;
}

interface ToolMeta {
  id: DidaktikToolId;
  nameDE: string;
  nameZH: string;
  descDE: string;
  descZH: string;
  badgeDE: string;
  badgeZH: string;
  icon: ReactNode;
}

const TOOLS_CONFIG: ToolMeta[] = [
  {
    id: "lego",
    nameDE: "Satzbau-Lego",
    nameZH: "句式积木",
    descDE: "Klausursatz-Baukasten: Baue präzise akademische Argumentationssätze nach Fach- und AFB-Vorgaben.",
    descZH: "考场学术句式装配台：依学科逻辑与 AFB 动词，拼装严谨高分的德语学术论证句。",
    badgeDE: "Sprachen & GeWi",
    badgeZH: "文科 / 社科",
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="h-4 w-4">
        <rect x="2" y="5" width="12" height="9" rx="1" />
        <circle cx="5" cy="3" r="1.5" />
        <circle cx="11" cy="3" r="1.5" />
      </svg>
    ),
  },
  {
    id: "balance",
    nameDE: "Urteils-Waage",
    nameZH: "辩证天平",
    descDE: "Dialektische Urteilsbildung: Gewichte Pro- & Contra-Argumente nach Sach- & Wertkriterien.",
    descZH: "辩证价值裁决：按事实裁决（效率性）与价值裁决（合法性/伦理）衡量多方论据并推导定论。",
    badgeDE: "SoWi & Philosophie",
    badgeZH: "社科 / 哲学",
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="h-4 w-4">
        <path d="M8 2v12M3 14h10M4 6l4-2 4 2M4 6l-2 5h4l-2-5M12 6l-2 5h4l-2-5" />
      </svg>
    ),
  },
  {
    id: "highlighter",
    nameDE: "Text-Dekonstruierer",
    nameZH: "文本解构",
    descDE: "Mehrfarbige Textanalyse: Zerlege Primärquellen in Thesen, Argumente, Belege & rhetorische Mittel.",
    descZH: "多维荧光文本解构：拆解原著与论述文之核心论点、论据链条、证据引用与修辞手法。",
    badgeDE: "Deutsch & Englisch",
    badgeZH: "德语 / 英语",
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="h-4 w-4">
        <path d="M11.2 2.3l2.5 2.5-7.6 7.6-3.3.8.8-3.3 7.6-7.6zM9.8 3.7l2.5 2.5" />
      </svg>
    ),
  },
  {
    id: "tangent",
    nameDE: "Tangenten-Simulator",
    nameZH: "导数沙盘",
    descDE: "Geometrische Grenzwerterfahrung: Visualisiere die Sekantensteigung Δy/Δx im Grenzübergang zu f'(x).",
    descZH: "微分极限几何直观：动态推演割线斜率 Δy/Δx 在 Δx→0 逼近切线斜率 f'(x) 的过程。",
    badgeDE: "Mathematik",
    badgeZH: "高中数学",
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="h-4 w-4">
        <path d="M2 14L14 2M2 14h12M2 14V2" />
      </svg>
    ),
  },
  {
    id: "formula",
    nameDE: "MINT-Scaffold",
    nameZH: "四步解题",
    descDE: "Strukturierte Naturwissenschaft: Gegeben → Gesucht → Formelansatz → Rechnung & Einheitencheck.",
    descZH: "理科规范解题脚手架：已知量 → 待求量 → 公式推导选型 → 代入计算与量纲单位检验。",
    badgeDE: "MINT-Fächer",
    badgeZH: "数理化生",
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="h-4 w-4">
        <path d="M3 4h4M5 4v8M9 5l4 6M13 5l-4 6" />
      </svg>
    ),
  },
  {
    id: "oralTimer",
    nameDE: "Mündlich-Matrix",
    nameZH: "口试矩阵",
    descDE: "Prüfungssimulator: 5-Minuten-Vorbereitung & AFB I/II/III-Vortragsphasen mit Bewertungskriterien.",
    descZH: "口试与演讲沙盘：5分钟限时构思、AFB I/II/III 三阶段阶梯陈述计时与评分点自查。",
    badgeDE: "Musik / Sport / Mündlich",
    badgeZH: "口试科目",
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="h-4 w-4">
        <circle cx="8" cy="8" r="6" />
        <path d="M8 4.5V8l2.5 1.5M6 2h4" />
      </svg>
    ),
  },
];

export default function Werkzeuge({
  lang,
  selectedFach = "alle",
  onSubjectChange,
  onDiscussInTutor,
}: WerkzeugeProps) {
  const currentFach = selectedFach && selectedFach !== "alle" ? selectedFach : "SoWi";
  const didaktikProfile = useMemo(() => getFachDidaktik(currentFach as FachId), [currentFach]);
  const allowedTools = useMemo(() => getToolsForFach(currentFach as FachId), [currentFach]);

  // Default to first recommended tool for the current subject
  const [activeTool, setActiveTool] = useState<DidaktikToolId>(() => {
    return allowedTools[0] || "lego";
  });

  // Track latest generated result from any of the tools
  const [latestOutput, setLatestOutput] = useState<string>("");
  const [copyFeedback, setCopyFeedback] = useState(false);

  // If subject changes and current activeTool is not recommended, update suggestion flag
  const activeConfig = TOOLS_CONFIG.find((t) => t.id === activeTool) || TOOLS_CONFIG[0];
  const isRecommendedForCurrentSubject = allowedTools.includes(activeTool);

  const handleCopy = () => {
    if (!latestOutput) return;
    navigator.clipboard.writeText(latestOutput);
    setCopyFeedback(true);
    setTimeout(() => setCopyFeedback(false), 2000);
  };

  const handleDiscussInTutor = () => {
    if (!latestOutput || !onDiscussInTutor) return;
    const prompt = lang === "de"
      ? `Ich habe mit dem Werkzeug "${activeConfig.nameDE}" folgendes Ergebnis erarbeitet:\n\n${latestOutput}\n\nBitte analysiere dieses Ergebnis kritisch nach den Kriterien der Gymnasialen Oberstufe (EF) und zeige mir konkrete Verbesserungsmöglichkeiten für die Klausur auf.`
      : `我在学科教具「${activeConfig.nameZH}」中推演得到了如下成果：\n\n${latestOutput}\n\n请以北威州高中 EF 考纲踩分标准对该成果进行批判性点评，指出在期末考中可能被扣分的细节与润色建议。`;
    onDiscussInTutor(prompt);
  };

  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden bg-[var(--paper)] text-[var(--ink)]">
      {/* Top Banner / Academic Header */}
      <div className="border-b border-[var(--line)] bg-[var(--paper-subtle)] px-4 py-3 sm:px-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs uppercase tracking-wider text-[var(--gray)]">
                {lang === "de" ? "Fachdidaktik & Kognitive Gerüste" : "学科启发教具与认知脚手架"}
              </span>
              {didaktikProfile && (
                <span className="rounded-[var(--radius)] border border-[var(--line)] bg-[var(--surface)] px-1.5 py-0.2 font-mono text-[var(--text-meta)] text-[var(--accent)] font-medium">
                  {currentFach} · {lang === "de" ? didaktikProfile.domainNameDE : didaktikProfile.domainNameZH}
                </span>
              )}
            </div>
            <h1 className="mt-0.5 text-base sm:text-lg font-serif font-semibold tracking-tight text-[var(--ink)]">
              {lang === "de" ? "Fachwerkzeuge & Denkschablonen" : "学科教具与思维工作台"}
            </h1>
            <p className="mt-0.5 text-xs text-[var(--gray)] font-sans max-w-2xl leading-relaxed">
              {lang === "de"
                ? "Didaktisch fundierte interaktive Werkzeuge zur Einübung klausurrelevanter Denk- und Schreibmuster ohne künstliche Sprachhürden."
                : "基于德国高中教学法构建的交互式学习工具：通过可视化与结构化脚手架，沉浸演练考纲核心思维与高分答题范式。"}
            </p>
          </div>

          {/* Subject Filter Selector */}
          <div className="flex items-center gap-2 self-start md:self-center shrink-0">
            <label htmlFor="werkzeug-fach-select" className="font-mono text-xs text-[var(--gray)]">
              {lang === "de" ? "Fachkontext:" : "学科情境:"}
            </label>
            <select
              id="werkzeug-fach-select"
              value={selectedFach}
              onChange={(e) => {
                const nextFach = e.target.value;
                if (onSubjectChange) onSubjectChange(nextFach);
                const nextAllowed = getToolsForFach(nextFach as FachId);
                if (nextAllowed.length > 0 && !nextAllowed.includes(activeTool)) {
                  setActiveTool(nextAllowed[0]);
                }
              }}
              className="rounded-[var(--radius)] border border-[var(--line)] bg-[var(--surface)] px-2 py-1 font-mono text-xs text-[var(--ink)] cursor-pointer"
            >
              <option value="alle">{lang === "de" ? "Alle Fächer" : "全学科视角"}</option>
              {FAECHER.map((f) => (
                <option key={f.id} value={f.id}>
                  {f.kurz} · {lang === "de" ? f.nameDE : f.nameZH}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Tool Navigation Grid */}
        <div className="mt-3 flex flex-wrap items-center gap-1.5 pt-2 border-t border-[var(--line)]/60">
          {TOOLS_CONFIG.map((t) => {
            const isActive = activeTool === t.id;
            const isRec = allowedTools.includes(t.id);
            return (
              <button
                key={t.id}
                type="button"
                onClick={() => setActiveTool(t.id)}
                aria-pressed={isActive}
                className={`relative flex items-center gap-1.5 rounded-[var(--radius)] px-2.5 py-1 text-xs font-sans transition-all cursor-pointer border ${
                  isActive
                    ? "border-[var(--accent)] bg-[var(--surface)] font-medium text-[var(--accent)]"
                    : "border-[var(--line)] bg-[var(--surface)]/80 text-[var(--ink)] hover:border-[var(--accent)]/50 hover:bg-[var(--surface)]"
                }`}
              >
                <span className={isActive ? "text-[var(--accent)]" : "text-[var(--gray)]"}>
                  {t.icon}
                </span>
                <span>{lang === "de" ? t.nameDE : t.nameZH}</span>
                {isRec && (
                  <span className="ml-1 rounded-[var(--radius)] bg-[var(--accent)]/10 px-1 py-0.2 font-mono text-[10px] text-[var(--accent)]">
                    {lang === "de" ? "Empfohlen" : "推荐"}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Workbench Area */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-[var(--paper)]">
        <div className="max-w-5xl mx-auto space-y-4">
          {/* Tool Card Header Banner */}
          <div className="rounded-[var(--radius)] border border-[var(--line)] bg-[var(--surface)] p-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div className="flex items-start sm:items-center gap-2.5">
              <div className="rounded-[var(--radius)] border border-[var(--line)] bg-[var(--paper-subtle)] p-2 text-[var(--accent)] shrink-0">
                {activeConfig.icon}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-sm font-semibold text-[var(--ink)]">
                    {lang === "de" ? activeConfig.nameDE : activeConfig.nameZH}
                  </h2>
                  <span className="rounded-[var(--radius)] border border-[var(--line)] bg-[var(--paper-subtle)] px-1.5 py-0.2 font-mono text-[10px] text-[var(--gray)]">
                    {lang === "de" ? activeConfig.badgeDE : activeConfig.badgeZH}
                  </span>
                  {isRecommendedForCurrentSubject && (
                    <span className="font-mono text-[10px] text-[var(--success)]">
                      {lang === "de" ? `Optimal für ${currentFach}` : `针对 ${currentFach} 强化`}
                    </span>
                  )}
                </div>
                <p className="mt-0.5 text-xs text-[var(--gray)] font-sans">
                  {lang === "de" ? activeConfig.descDE : activeConfig.descZH}
                </p>
              </div>
            </div>

            {/* Output Actions Bar */}
            {latestOutput && (
              <div className="flex items-center gap-1.5 shrink-0 self-end sm:self-center">
                <button
                  type="button"
                  onClick={handleCopy}
                  className="rounded-[var(--radius)] border border-[var(--line)] bg-[var(--surface)] px-2.5 py-1 text-xs font-mono text-[var(--ink)] hover:border-[var(--accent)] hover:text-[var(--accent)] flex items-center gap-1 transition-colors cursor-pointer"
                  title={lang === "de" ? "Ergebnis in Zwischenablage kopieren" : "复制当前生成的内容"}
                >
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <rect x="5" y="5" width="8" height="8" rx="1" />
                    <path d="M3 11V3h8" />
                  </svg>
                  <span>{copyFeedback ? (lang === "de" ? "Kopiert!" : "已复制!") : (lang === "de" ? "Kopieren" : "复制结果")}</span>
                </button>

                {onDiscussInTutor && (
                  <button
                    type="button"
                    onClick={handleDiscussInTutor}
                    className="rounded-[var(--radius)] border border-[var(--accent)] bg-[var(--accent)]/10 px-2.5 py-1 text-xs font-mono text-[var(--accent)] hover:bg-[var(--accent)] hover:text-[var(--surface)] flex items-center gap-1 transition-colors cursor-pointer"
                    title={lang === "de" ? "Ergebnis mit KI-Tutor im Chat besprechen" : "将此结果带入 AI 导师深入讨论"}
                  >
                    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M14 10c0 1-1 2-2 2H5l-3 3V4c0-1 1-2 2-2h8c1 0 2 1 2 2v6z" />
                    </svg>
                    <span>{lang === "de" ? "Mit Tutor diskutieren" : "带入导师提问"}</span>
                  </button>
                )}
              </div>
            )}
          </div>

          {/* Active Tool Rendering Surface */}
          <div className="rounded-[var(--radius)] border border-[var(--line)] bg-[var(--surface)] p-4 sm:p-5">
            {activeTool === "lego" && (
              <SatzbauLego
                lang={lang}
                onSentenceComplete={(sentence) => setLatestOutput(sentence)}
              />
            )}

            {activeTool === "balance" && (
              <BalanceBoard
                lang={lang}
                onUrteilGenerated={(urteil) => setLatestOutput(urteil)}
              />
            )}

            {activeTool === "highlighter" && (
              <TextHighlighter
                lang={lang}
                onAnalysisGenerated={(analysis) => setLatestOutput(analysis)}
              />
            )}

            {activeTool === "tangent" && (
              <TangentSlider
                lang={lang}
                onFormulaGenerated={(formula) => setLatestOutput(formula)}
              />
            )}

            {activeTool === "formula" && (
              <FormulaScaffold
                lang={lang}
                fach={currentFach}
                onFormulaStepComplete={(step) => setLatestOutput(step)}
              />
            )}

            {activeTool === "oralTimer" && (
              <OralExamTimer
                lang={lang}
                fach={currentFach === "Musik" || currentFach === "Sport" ? currentFach : "Deutsch"}
                onOutlineGenerated={(outline) => setLatestOutput(outline)}
              />
            )}
          </div>

          {/* Latest Generated Snapshot Bar (when output is present) */}
          {latestOutput && (
            <div className="rounded-[var(--radius)] border border-[var(--line)] bg-[var(--paper-subtle)] p-3 text-xs">
              <div className="flex items-center justify-between font-mono text-[var(--gray)] mb-1">
                <span>{lang === "de" ? "Zuletzt erarbeiteter Stand:" : "当前推演暂存草稿："}</span>
                <span className="text-[10px]">{latestOutput.length} {lang === "de" ? "Zeichen" : "字"}</span>
              </div>
              <div className="font-mono text-xs bg-[var(--surface)] border border-[var(--line)] rounded-[var(--radius)] p-2.5 max-h-32 overflow-y-auto whitespace-pre-wrap leading-relaxed">
                {latestOutput}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
