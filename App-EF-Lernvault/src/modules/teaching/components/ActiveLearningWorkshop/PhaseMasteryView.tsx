import React, { useState, useMemo } from "react";
import type { DistilledConcept } from "../../engine/conceptDistiller";
import type { WorkshopQuizResult } from "./types";

export interface PhaseMasteryViewProps {
  concept: DistilledConcept;
  fach: string;
  earnedXp: number;
  quizResult?: WorkshopQuizResult;
  lang?: "de" | "zh";
  onRestartWorkshop: () => void;
  onNextTopic: () => void;
  onBackToMap?: () => void;
}

export const PhaseMasteryView: React.FC<PhaseMasteryViewProps> = ({
  concept,
  fach,
  earnedXp,
  quizResult,
  lang = "de",
  onRestartWorkshop,
  onNextTopic,
  onBackToMap,
}) => {
  const [copiedPatch, setCopiedPatch] = useState(false);
  const [hoveredAxisIndex, setHoveredAxisIndex] = useState<number | null>(null);

  const totalScore = quizResult?.score ?? 80;
  const mistakes = quizResult?.mistakes ?? [];
  const correctCount = quizResult?.correctCount ?? 4;
  const totalQuestions = quizResult?.totalQuestions ?? 5;

  // 评定德意志文理高中会考等级 (Notenpunkte 0-15)
  const notenPunkte = useMemo(() => {
    const pct = totalQuestions > 0 ? (correctCount / totalQuestions) * 100 : 80;
    if (pct >= 90) return 15;
    if (pct >= 80) return 14;
    if (pct >= 70) return 12;
    if (pct >= 60) return 10;
    if (pct >= 50) return 8;
    return 5;
  }, [correctCount, totalQuestions]);

  // 五维能力雷达数据 (0.0 到 1.0)
  const radarAxes = useMemo(() => {
    const accuracy = totalQuestions > 0 ? correctCount / totalQuestions : 0.8;
    return [
      {
        id: "konzept",
        labelDE: "Konzepte",
        labelZH: "概念认知",
        score: Math.min(1, Math.max(0.6, accuracy + 0.1)),
      },
      {
        id: "labor",
        labelDE: "Labor-Exploration",
        labelZH: "仿真探究",
        score: 0.95, // 仿真阶段全量体验
      },
      {
        id: "struktur",
        labelDE: "Notiz-Struktur",
        labelZH: "笔记提炼",
        score: 0.9,
      },
      {
        id: "operator",
        labelDE: "Operatoren",
        labelZH: "动词规范",
        score: Math.min(1, Math.max(0.5, accuracy)),
      },
      {
        id: "urteil",
        labelDE: "Urteilsbildung",
        labelZH: "价值评判",
        score: Math.min(1, Math.max(0.55, accuracy + 0.05)),
      },
    ];
  }, [correctCount, totalQuestions]);

  // SVG 雷达图几何计算（中心点 150, 150，基准半径 90）
  const centerX = 150;
  const centerY = 150;
  const radius = 90;

  const points = useMemo(() => {
    const total = radarAxes.length;
    return radarAxes.map((axis, i) => {
      const angle = (Math.PI * 2 * i) / total - Math.PI / 2;
      const r = radius * axis.score;
      const x = centerX + r * Math.cos(angle);
      const y = centerY + r * Math.sin(angle);
      return { x, y, angle, label: axis.labelDE, score: axis.score };
    });
  }, [radarAxes]);

  const polygonPoints = useMemo(() => {
    return points.map((p) => `${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(" ");
  }, [points]);

  // 生成 Fehlerlog.md 补丁
  const fehlerlogPatch = useMemo(() => {
    const dateStr = new Date().toISOString().slice(0, 10);
    const themaSanitized = concept.topicTitle.replace(/[|]/g, "/");
    const defizitStr = mistakes.length > 0 ? mistakes.join("; ").replace(/[|]/g, "/") : "Keine Mängel";

    return `--- 00_META/Fehlerlog.md
+++ 00_META/Fehlerlog.md
+ - [ ] [${fach}] Thema: ${themaSanitized} (Workshop-Zyklus)
+   - Datum: ${dateStr}
+   - Notenpunkte: ${notenPunkte} NP
+   - Defizite: ${defizitStr}
+ | Datum | Fach | Thema | Fehlertyp | Eigener Ansatz | 15NP-Muster |
+ | :--- | :--- | :--- | :--- | :--- | :--- |
+ | ${dateStr} | ${fach} | ${themaSanitized} | ${defizitStr} | Aktives Workshop-Training | ${concept.klausurSatz15NP.musterSatzDE.slice(0, 60)}... |
`;
  }, [concept, fach, mistakes, notenPunkte]);

  const handleCopyFehlerlogPatch = () => {
    if (navigator?.clipboard?.writeText) {
      navigator.clipboard.writeText(fehlerlogPatch);
      setCopiedPatch(true);
      setTimeout(() => setCopiedPatch(false), 2000);
    }
  };

  return (
    <div className="flex flex-col gap-6 w-full max-w-5xl mx-auto">
      {/* 顶部阶段徽章与课题总结 */}
      <header className="border-b border-[var(--line)] pb-4 space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="font-mono text-[10px] uppercase tracking-wider px-2 py-0.5 bg-[var(--ink)] text-[var(--paper)] font-bold">
              {lang === "de" ? "Phase 5: Meisterschaft & Transfer" : "阶段 5 · 掌握度结算与闭环达标"}
            </span>
            <span className="font-mono text-xs px-2 py-0.5 border border-[var(--line)] text-[var(--ink-muted)]">
              {fach} · Vollstaendiger Lernzyklus
            </span>
          </div>
          <span className="font-mono text-xs text-[var(--ink-muted)]">
            Total XP: <strong className="text-[var(--ink)]">+{earnedXp + totalScore} XP</strong>
          </span>
        </div>

        <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-[var(--ink)]">
          {concept.topicTitle} · {lang === "de" ? "Meisterschaftsnachweis" : "研习闭环达标认证"}
        </h2>
      </header>

      {/* 成果总览栅格：会考等级、能力雷达与XP进阶 */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* 左侧 (7 cols): 学术成果雷达图 (纯黑白高对比度，严格 SVG 中心缩放) */}
        <section className="lg:col-span-7 border border-[var(--line)] p-4 sm:p-6 bg-[var(--paper)] space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-[var(--line)]">
            <span className="font-mono text-xs font-bold uppercase tracking-wider text-[var(--ink)]">
              {lang === "de" ? "[ 5-Dimensionen-Kompetenzradar ]" : "[ 五维能力学术掌握雷达 ]"}
            </span>
            <span className="font-mono text-[10px] text-[var(--ink-muted)]">
              KLP NRW EF
            </span>
          </div>

          <div className="flex flex-col items-center justify-center py-2">
            <svg
              width="300"
              height="300"
              viewBox="0 0 300 300"
              className="overflow-visible select-none"
              role="img"
              aria-label="Kompetenzradar Chart"
            >
              {/* 背景同心圆格网 */}
              {[0.25, 0.5, 0.75, 1.0].map((level, lIdx) => (
                <circle
                  key={lIdx}
                  cx={centerX}
                  cy={centerY}
                  r={radius * level}
                  fill="none"
                  stroke="currentColor"
                  strokeDasharray={level === 1.0 ? "none" : "2,2"}
                  strokeWidth={level === 1.0 ? "1" : "0.5"}
                  className="text-[var(--line)]"
                />
              ))}

              {/* 5 根轴线 */}
              {points.map((p, pIdx) => (
                <line
                  key={pIdx}
                  x1={centerX}
                  y1={centerY}
                  x2={centerX + radius * Math.cos(p.angle)}
                  y2={centerY + radius * Math.sin(p.angle)}
                  stroke="currentColor"
                  strokeWidth="0.75"
                  className="text-[var(--line)]"
                />
              ))}

              {/* 核心雷达闭合多边形 */}
              <polygon
                points={polygonPoints}
                fill="currentColor"
                fillOpacity="0.08"
                stroke="currentColor"
                strokeWidth="1.5"
                className="text-[var(--ink)]"
              />

              {/* 数据节点点阵 (严格遵守中心变换保真规则) */}
              {points.map((p, pIdx) => {
                const isHovered = hoveredAxisIndex === pIdx;
                const axisMeta = radarAxes[pIdx];

                return (
                  <g
                    key={pIdx}
                    onMouseEnter={() => setHoveredAxisIndex(pIdx)}
                    onMouseLeave={() => setHoveredAxisIndex(null)}
                    className="cursor-pointer"
                  >
                    <circle
                      cx={p.x}
                      cy={p.y}
                      r={isHovered ? 5 : 3.5}
                      fill="var(--paper)"
                      stroke="var(--ink)"
                      strokeWidth={isHovered ? 2 : 1.5}
                      style={{
                        transformOrigin: `${p.x}px ${p.y}px`,
                        transformBox: "view-box",
                        transition: "transform 0.15s ease",
                      }}
                    />
                    {/* 文本标签 */}
                    <text
                      x={centerX + (radius + 20) * Math.cos(p.angle)}
                      y={centerY + (radius + 20) * Math.sin(p.angle)}
                      textAnchor="middle"
                      dominantBaseline="central"
                      fontSize="9"
                      fontFamily="monospace"
                      fill="var(--ink)"
                      fontWeight={isHovered ? "bold" : "normal"}
                    >
                      {lang === "de" ? axisMeta.labelDE : axisMeta.labelZH}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 pt-2 border-t border-[var(--line)] font-mono text-[10px] text-center">
            {radarAxes.map((a, idx) => (
              <div key={idx} className="p-1.5 border border-[var(--line)] bg-[var(--paper-subtle)]">
                <div className="text-[var(--ink-muted)]">
                  {lang === "de" ? a.labelDE : a.labelZH}
                </div>
                <div className="font-bold text-[var(--ink)]">
                  {Math.round(a.score * 100)}%
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 右侧 (5 cols): 掌握度等级评定与错题归档 */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          {/* 会考等级评定徽章卡 */}
          <section className="border-2 border-[var(--ink)] p-4 sm:p-5 bg-[var(--paper)] space-y-3">
            <div className="flex items-center justify-between pb-1.5 border-b border-[var(--line)]">
              <span className="font-mono text-[10px] uppercase font-bold text-[var(--ink)]">
                {lang === "de" ? "Abitur-Qualifikation" : "考场能力达标评定"}
              </span>
              <span className="font-mono text-[9px] px-1.5 py-0.2 border border-[var(--ink)]">
                Gymnasium Oberstufe
              </span>
            </div>

            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold font-mono tracking-tight text-[var(--ink)]">
                {notenPunkte} NP
              </span>
              <span className="text-xs font-mono text-[var(--ink-muted)]">
                {notenPunkte >= 14
                  ? (lang === "de" ? "Sehr Gut (1)" : "优秀 · 满分踩分")
                  : (lang === "de" ? "Gut (2)" : "良好 · 达标通过")}
              </span>
            </div>

            <p className="text-xs font-serif text-[var(--ink)] leading-relaxed">
              {lang === "de"
                ? `Du hast den 5-Phasen-Lernzyklus für »${concept.topicTitle}« abgeschlossen. Die wesentlichen Modellprämissen, Kausalketten und 15-NP-Meistersätze sind fundiert gesichert.`
                : `你已完成 »${concept.topicTitle}« 的完整5阶段研学闭环。核心模型前提、因果逻辑链与15分标答考句已牢固掌握。`}
            </p>

            <div className="pt-2 border-t border-[var(--line)] flex items-center justify-between text-xs font-mono">
              <span className="text-[var(--ink-muted)]">
                {lang === "de" ? "Richtig gelöst: " : "正确率: "}
                <strong>{correctCount} / {totalQuestions}</strong>
              </span>
              <span className="text-[var(--ink-muted)]">
                XP: <strong>+{totalScore}</strong>
              </span>
            </div>
          </section>

          {/* 错题归档与 Fehlerlog.md 自动补丁 */}
          <section className="border border-[var(--line)] p-4 bg-[var(--paper-subtle)] space-y-3">
            <div className="flex items-center justify-between pb-1 border-b border-[var(--line)]">
              <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-[var(--ink)]">
                {lang === "de" ? "[ Fehlerlog-Synchronisation ]" : "[ 错题沉淀与补丁生成 ]"}
              </span>
              <span className="font-mono text-[9px] text-[var(--ink-muted)]">
                00_META/Fehlerlog.md
              </span>
            </div>

            {mistakes.length === 0 ? (
              <div className="p-3 border border-[var(--line)] bg-[var(--paper)] text-center space-y-1">
                <div className="font-mono text-xs font-bold text-[var(--ink)]">
                  {lang === "de" ? "0 Fehlerpunkte registriert" : "本次自测 0 错题"}
                </div>
                <p className="text-[11px] font-serif text-[var(--ink-muted)]">
                  {lang === "de"
                    ? "Der Erwartungshorizont wurde lückenlos abgedeckt. Kein Patch erforderlich."
                    : "全部题目一次性满分命中评分细则，无需追加错题修补。"}
                </p>
              </div>
            ) : (
              <div className="space-y-2">
                <div className="text-[11px] font-mono text-[var(--ink)]">
                  {lang === "de" ? "Erkannte Abweichungen:" : "自测发现的不足点:"}
                </div>
                <ul className="text-[11px] font-mono text-[var(--ink-muted)] space-y-1 list-disc pl-4">
                  {mistakes.map((m, mIdx) => (
                    <li key={mIdx}>{m}</li>
                  ))}
                </ul>
                <button
                  type="button"
                  onClick={handleCopyFehlerlogPatch}
                  className="w-full mt-2 py-1.5 border border-[var(--ink)] bg-[var(--paper)] hover:bg-[var(--paper-subtle)] text-xs font-mono font-bold transition-colors cursor-pointer"
                >
                  {copiedPatch
                    ? (lang === "de" ? "[OK] Patch kopiert" : "[OK] 补丁已复制")
                    : (lang === "de" ? "Fehlerlog-Patch kopieren" : "一键复制 Fehlerlog 补丁")}
                </button>
              </div>
            )}
          </section>
        </div>
      </div>

      {/* 底部行动操作栏 */}
      <footer className="border-t border-[var(--line)] pt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onRestartWorkshop}
            className="px-3 py-1.5 border border-[var(--line)] bg-[var(--paper)] hover:border-[var(--ink)] text-xs font-mono transition-colors cursor-pointer"
          >
            {lang === "de" ? "↺ Lernzyklus wiederholen" : "↺ 重新进行本课题闭环"}
          </button>
          {onBackToMap && (
            <button
              type="button"
              onClick={onBackToMap}
              className="px-3 py-1.5 border border-[var(--line)] bg-[var(--paper)] hover:border-[var(--ink)] text-xs font-mono transition-colors cursor-pointer"
            >
              {lang === "de" ? "Zur Quest-Landkarte" : "返回关卡图谱"}
            </button>
          )}
        </div>

        <button
          type="button"
          onClick={onNextTopic}
          className="px-5 py-2 border-2 border-[var(--ink)] bg-[var(--ink)] text-[var(--paper)] hover:bg-[var(--paper)] hover:text-[var(--ink)] font-mono text-xs font-bold tracking-tight transition-colors cursor-pointer flex items-center justify-center gap-2"
        >
          <span>{lang === "de" ? "Nächstes Thema starten" : "继续下一个主题"}</span>
          <span aria-hidden="true">{"->"}</span>
        </button>
      </footer>
    </div>
  );
};
