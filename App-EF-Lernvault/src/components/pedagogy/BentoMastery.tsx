// BentoMastery — G5 Bento-Mastery: 考场控制台与元认知复盘仪表盘
// 融合方案 9（Slate/Zinc 考场 HUD 倒计时与 Rubric）与方案 19/7（Bento 四宫格元认知复盘）
import { useEffect, useState } from "react";
import type { Lang } from "../../i18n";

export interface RubricItem {
  id: string;
  labelDE: string;
  labelZH: string;
  pts: number;
}

const DEFAULT_RUBRICS: RubricItem[] = [
  { id: "r1", labelDE: "Problemaufriss & Operator-Zuordnung präzise bestimmt", labelZH: "精确点明核心问题冲突并对应会考 Operator 要求", pts: 4 },
  { id: "r2", labelDE: "Mikroskopische/Theoretische Kausalität schlüssig dargelegt", labelZH: "因果论证链条完整，准确引用微观机理或核心概念", pts: 6 },
  { id: "r3", labelDE: "Fachtermini & Formeln korrekt angewandt", labelZH: "准确运用学科核心德语术语与数学/物理反应式", pts: 4 },
  { id: "r4", labelDE: "Synthese & differenziertes Sach-/Werturteil formuliert", labelZH: "严密区分并撰写出事实判断与价值判断双轨结论", pts: 6 },
];

export function BentoMastery({
  lang,
  rubrics = DEFAULT_RUBRICS,
}: {
  lang: Lang;
  rubrics?: RubricItem[];
  totalXP?: number;
}) {
  const de = lang === "de";
  const [secs, setSecs] = useState(15 * 60); // 15 分钟倒计时
  const [checkedIds, setCheckedIds] = useState<string[]>([]);

  useEffect(() => {
    const timer = setInterval(() => setSecs((s) => (s > 0 ? s - 1 : 0)), 1000);
    return () => clearInterval(timer);
  }, []);

  const toggleCheck = (id: string) => {
    setCheckedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const earnedPts = rubrics
    .filter((r) => checkedIds.includes(r.id))
    .reduce((sum, r) => sum + r.pts, 0);
  const maxPts = rubrics.reduce((sum, r) => sum + r.pts, 0);
  const pct = Math.round((earnedPts / maxPts) * 100);

  const m = Math.floor(secs / 60);
  const s = secs % 60;
  const timeStr = `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;

  return (
    <div className="flex flex-col gap-4">
      {/* 顶部学术考场规范条 (Klausur-Prüfungsprotokoll) */}
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-[var(--line)] bg-[var(--surface)] p-4 shadow-none">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-md border border-[var(--line)] bg-[var(--paper-subtle)] font-mono text-xs font-semibold text-[var(--ink)]">
            EF
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-[10px] uppercase tracking-wider text-[var(--gray)]">
                {de ? "Klausur-Simulation // Zeitlimit" : "会考限时实战演练 // 倒计时"}
              </span>
              <span className="rounded border border-[var(--line)] px-1.5 py-0.2 font-mono text-[9px] text-[var(--gray)]">
                {de ? "Standard NRW" : "NRW 考纲标准"}
              </span>
            </div>
            <div className="flex items-center gap-2 font-mono text-lg font-bold">
              <span className={secs < 180 ? "text-amber-700 dark:text-amber-400" : "text-[var(--ink)]"}>
                {timeStr}
              </span>
              <span className="text-xs font-normal text-[var(--gray)]">
                {de ? "verbleibend" : "剩余时间"}
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="text-right">
            <span className="font-mono text-[10px] uppercase tracking-wider text-[var(--gray)]">
              {de ? "Bewertungsskala" : "采分点核验"}
            </span>
            <p className="font-mono text-sm font-bold text-[var(--ink)]">
              {earnedPts} / {maxPts} Pkt. <span className="font-normal text-[var(--gray)]">({pct}%)</span>
            </p>
          </div>
          <div className="flex items-center rounded-md border border-[var(--line)] bg-[var(--paper-subtle)] px-2.5 py-1.5 font-mono text-xs font-medium text-[var(--ink)]">
            {pct >= 80 ? (de ? "✓ Bestanden" : "✓ 达标") : (de ? "In Arbeit" : "进行中")}
          </div>
        </div>
      </div>

      {/* 四宫格 Bento 元认知复盘网格 */}
      <div className="grid gap-3 sm:grid-cols-2">
        {/* 卡片 1: 采分点标准清单 (Rubric Checklist) */}
        <div className="rounded-xl border border-[var(--line)] bg-[var(--surface)] p-4 sm:col-span-2">
          <div className="mb-3 flex items-center justify-between border-b border-[var(--line)] pb-2.5">
            <div>
              <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-[var(--ink)]">
                {de ? "Abitur-Kriterienkatalog (Rubric)" : "会考评分标准采分点自查"}
              </h4>
              <p className="mt-0.5 text-[11px] text-[var(--gray)]">
                {de ? "Ankreuzen zur Selbstevaluation der Argumentationsschritte" : "点击勾选已达成的论证要素，检验是否满足考纲要求"}
              </p>
            </div>
            <span className="font-mono text-xs text-[var(--gray)]">
              {checkedIds.length}/{rubrics.length}
            </span>
          </div>

          <div className="grid gap-2 sm:grid-cols-2">
            {rubrics.map((r) => {
              const checked = checkedIds.includes(r.id);
              return (
                <div
                  key={r.id}
                  onClick={() => toggleCheck(r.id)}
                  className={`flex cursor-pointer items-start gap-3 rounded-lg border p-3 transition ${
                    checked
                      ? "border-[var(--ink)] bg-[var(--paper-subtle)] text-[var(--ink)]"
                      : "border-[var(--line)] bg-[var(--surface)] text-[var(--gray)] hover:border-[var(--ink)] hover:text-[var(--ink)]"
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={() => {}}
                    className="mt-0.5 h-3.5 w-3.5 rounded accent-[var(--ink)]"
                  />
                  <div className="flex-1 text-xs">
                    <p className="font-medium leading-snug">{de ? r.labelDE : r.labelZH}</p>
                    <span className="mt-1 inline-block font-mono text-[10px] text-[var(--gray)]">
                      +{r.pts} Punkte
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 卡片 2: 掌握度与元认知总览 */}
        <div className="rounded-xl border border-[var(--line)] bg-[var(--surface)] p-4">
          <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-[var(--ink)]">
            {de ? "Metakognitive Reife" : "知识点掌握度元认知评估"}
          </h4>
          <div className="mt-3 flex items-center gap-4">
            {/* 圆环进度指示 */}
            <div className="relative flex h-16 w-16 shrink-0 items-center justify-center">
              <svg viewBox="0 0 36 36" className="h-full w-full rotate-[-90deg]">
                <path
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="currentColor"
                  className="text-[var(--line)]"
                  strokeWidth="2.5"
                />
                <path
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="#2563eb"
                  strokeWidth="2.5"
                  strokeDasharray={`${pct}, 100`}
                  strokeLinecap="round"
                />
              </svg>
              <span className="absolute font-mono text-xs font-bold text-[var(--ink)]">
                {pct}%
              </span>
            </div>
            <div className="text-xs text-[var(--gray)]">
              <p className="font-medium text-[var(--ink)]">
                {pct >= 80 ? (de ? "Klausurbereit" : "已具备应考能力") : pct >= 50 ? (de ? "Auf gutem Weg" : "论证结构基本成型") : (de ? "Wiederholung empfohlen" : "建议查漏补缺")}
              </p>
              <p className="mt-1 text-[11px] leading-relaxed">
                {pct === 100
                  ? (de ? "Alle 4 Kriterien vollständig erfüllt." : "全部 4 大采分点要素均已具备，可直接在实战中套用。")
                  : (de ? "Fehlende Kriterien im vorherigen Schritt nachschlagen." : "请回看前序步骤，着重巩固未勾选的得分要点。")}
              </p>
            </div>
          </div>
        </div>

        {/* 卡片 3: 错题归因与考场避坑备忘 */}
        <div className="rounded-xl border border-[var(--line)] bg-[var(--surface)] p-4">
          <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-[var(--ink)]">
            {de ? "Fehlerquellen & Klausurfallen" : "典型失分陷阱与备忘"}
          </h4>
          <ul className="mt-3 space-y-2 text-xs text-[var(--gray)]">
            <li className="flex items-start gap-2">
              <span className="font-mono font-bold text-amber-700 dark:text-amber-400">/!/</span>
              <span>混淆事实判断与价值判断，在 Sachurteil 中过早掺杂道德宣判。</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="font-mono font-bold text-amber-700 dark:text-amber-400">/!/</span>
              <span>仅默写公式，未给出微观物理碰撞或对数级浓度跃迁原理解析。</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="font-mono font-bold text-emerald-700 dark:text-emerald-400">✓</span>
              <span>严格运用 Operatoren 三段论（Darstellung → Analyse → Urteil）推进。</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
