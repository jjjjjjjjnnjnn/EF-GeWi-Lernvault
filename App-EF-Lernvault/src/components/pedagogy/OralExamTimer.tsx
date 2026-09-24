import { useEffect, useRef, useState } from "react";
import type { Lang } from "../../i18n";

interface OralExamTimerProps {
  lang?: Lang;
  onOutlineGenerated?: (outlineText: string) => void;
  fach?: string;
}

export default function OralExamTimer({
  lang = "de",
  onOutlineGenerated,
  fach = "Musik",
}: OralExamTimerProps) {
  // Modes: prep (15 min) or presentation (5 min)
  const [phase, setPhase] = useState<"prep" | "vortrag">("prep");
  const [secondsLeft, setSecondsLeft] = useState(15 * 60);
  const [running, setRunning] = useState(false);
  const timerRef = useRef<number | null>(null);

  const [einleitung, setEinleitung] = useState("");
  const [analyse, setAnalyse] = useState("");
  const [urteil, setUrteil] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!running) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }
    timerRef.current = window.setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          setRunning(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [running]);

  const switchPhase = (nextPhase: "prep" | "vortrag") => {
    setRunning(false);
    setPhase(nextPhase);
    setSecondsLeft(nextPhase === "prep" ? 15 * 60 : 5 * 60);
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
  };

  const loadExample = () => {
    if (fach === "Musik") {
      setEinleitung(
        lang === "de"
          ? "Hörbeispiel: Ludwig van Beethoven, Sinfonie Nr. 5 in c-Moll, Kopfsatz. Epoche: Wiener Klassik."
          : "听觉范例：贝多芬第5号交响曲（c小调），第一乐章。所属时期：维也纳古典乐派。"
      );
      setAnalyse(
        lang === "de"
          ? "Motivische Arbeit: Vier-Töne-Kopfmotiv (Kurz-Kurz-Kurz-Lang) als Keimzelle. Formteil: Sonatenhauptsatzform (Exposition mit dualistischem Seitenthema in Es-Dur)."
          : "动机发展：四音动机（短-短-短-长）贯穿全曲作为核心细胞。曲式结构：奏鸣曲式（呈示部呈示降E大调副部主题形成调性对比）。"
      );
      setUrteil(
        lang === "de"
          ? "Beurteilung: Das Motiv erzeugt dramatische Zuspitzung und thematische Geschlossenheit nach klassischen Gestaltungsprinzipien."
          : "艺术价值裁决：该动机以极度凝练的手段塑造出戏剧性冲突与古典形式的高度自洽。"
      );
    } else {
      setEinleitung(
        lang === "de"
          ? "Bewegungsbeobachtung: Speerwurf bzw. Kugelstoß (Obergrenze EF). Thema: Optimierung der Abfluggeschwindigkeit."
          : "动作技术观察：标枪/铅球推掷技术分析。核心主题：器械出手初速度的最优化。"
      );
      setAnalyse(
        lang === "de"
          ? "Phasenstruktur nach Meinel & Schnabel: 1. Vorbereitungsphase (Anlauf, Impulsschritt), 2. Hauptphase (Stemmschritt, Bogenspannung, Krafteinsatz), 3. Endphase (Abfangen)."
          : "迈内尔-施纳贝尔动作三阶段模型：1. 准备相（助跑、节奏步），2. 主动作相（制动步、背弓张力释放与发力顺序），3. 缓冲平衡相。"
      );
      setUrteil(
        lang === "de"
          ? "Biomechanisches Urteil: Prinzip der optimalen Beschleunigungsweglänge und Kinetische Kette (Beine -> Rumpf -> Arm) erfolgreich umgesetzt."
          : "生物力学评定：符合加速路径最长化原理与动力链顺序传导（下肢->躯干->手臂），有效避免力矩损失。"
      );
    }
  };

  const handleExport = () => {
    const text = [
      `### [${fach}] Mündliche Prüfung: 3-teiliges Vortragsraster / 口试三段式提纲`,
      `1. Einleitung / 引入界定 (AFB I): ${einleitung || "-"}`,
      `2. Kriterienanalyse / 结构与要素分析 (AFB II): ${analyse || "-"}`,
      `3. Fazit & Urteil / 综合评定 (AFB III): ${urteil || "-"}`,
    ].join("\n");
    onOutlineGenerated?.(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="rounded-[var(--radius)] border border-[var(--line)] bg-[var(--surface)] p-4 text-xs font-sans text-[var(--ink)] space-y-3">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[var(--line)] pb-2">
        <div className="flex items-center gap-2">
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
            className="h-3.5 w-3.5 text-[var(--accent)]"
          >
            <circle cx="8" cy="8" r="6" />
            <path d="M8 4.5V8l2.5 2.5" />
          </svg>
          <span className="font-mono text-xs font-semibold text-[var(--ink)]">
            {lang === "de" ? "Mündliche Prüfungssimulation" : "口试试场全真模拟矩阵"}
          </span>
          <span className="font-mono text-[var(--text-meta)] text-[var(--gray)]">
            ({fach})
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={loadExample}
            className="rounded-[var(--radius)] border border-[var(--line)] bg-[var(--paper-subtle)] px-2 py-0.5 font-mono text-[var(--text-meta)] text-[var(--ink)] hover:border-[var(--accent)] transition-colors"
          >
            {lang === "de" ? "Beispiel laden" : "载入典型范例"}
          </button>
        </div>
      </div>

      {/* Timer Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-[var(--radius)] border border-[var(--line)] bg-[var(--paper-subtle)]/50 p-2.5">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => switchPhase("prep")}
            aria-pressed={phase === "prep"}
            className={`px-2 py-0.5 rounded-[var(--radius)] font-mono text-xs transition-colors ${
              phase === "prep"
                ? "bg-[var(--accent)] text-[var(--surface)] font-medium"
                : "text-[var(--gray)] hover:text-[var(--ink)]"
            }`}
          >
            {lang === "de" ? "15 Min Vorbereitung" : "15分钟备考构思"}
          </button>
          <button
            type="button"
            onClick={() => switchPhase("vortrag")}
            aria-pressed={phase === "vortrag"}
            className={`px-2 py-0.5 rounded-[var(--radius)] font-mono text-xs transition-colors ${
              phase === "vortrag"
                ? "bg-[var(--accent)] text-[var(--surface)] font-medium"
                : "text-[var(--gray)] hover:text-[var(--ink)]"
            }`}
          >
            {lang === "de" ? "5 Min Vortrag" : "5分钟独立陈述"}
          </button>
        </div>

        <div className="flex items-center gap-2">
          <span
            role="timer"
            aria-label="Prüfungszeit"
            className="font-mono text-xl font-bold tabular-nums text-[var(--ink)]"
          >
            {formatTime(secondsLeft)}
          </span>
          <button
            type="button"
            onClick={() => setRunning((r) => !r)}
            className="rounded-[var(--radius)] border border-[var(--line)] bg-[var(--surface)] px-2.5 py-0.5 font-mono text-xs text-[var(--ink)] hover:border-[var(--accent)]"
          >
            {running ? (lang === "de" ? "Pause" : "暂停") : (lang === "de" ? "Start" : "开始")}
          </button>
          <button
            type="button"
            onClick={() => {
              setRunning(false);
              setSecondsLeft(phase === "prep" ? 15 * 60 : 5 * 60);
            }}
            className="rounded-[var(--radius)] border border-[var(--line)] bg-[var(--surface)] px-2 py-0.5 font-mono text-xs text-[var(--gray)] hover:text-[var(--ink)]"
          >
            {lang === "de" ? "Reset" : "重置"}
          </button>
        </div>
      </div>

      {/* 3-teiliges Vortragsraster */}
      <div className="space-y-2 pt-1">
        <label className="block">
          <span className="font-mono text-[var(--text-meta)] text-[var(--gray)] uppercase tracking-wider">
            1. Einleitung & Definition (AFB I) / 背景阐明与概念定义:
          </span>
          <textarea
            rows={2}
            value={einleitung}
            onChange={(e) => setEinleitung(e.target.value)}
            placeholder={
              fach === "Musik"
                ? "Komponist, Werk, Epoche, Besetzung, Tonsprache..."
                : "Sportart, Technik, situativer Kontext, Zielstellung..."
            }
            className="mt-1 w-full rounded-[var(--radius)] border border-[var(--line)] bg-[var(--surface)] px-2.5 py-1 text-xs text-[var(--ink)] placeholder:text-[var(--gray)] focus:border-[var(--accent)]"
          />
        </label>

        <label className="block">
          <span className="font-mono text-[var(--text-meta)] text-[var(--gray)] uppercase tracking-wider">
            2. Strukturierte Kriterienanalyse (AFB II) / 深入分析与要素论述:
          </span>
          <textarea
            rows={2}
            value={analyse}
            onChange={(e) => setAnalyse(e.target.value)}
            placeholder={
              fach === "Musik"
                ? "Formschema, Motiventwicklung, Melodik, Rhythmik, Harmonik..."
                : "Phasenstruktur (Vorbereitung/Haupt/Ende), Krafteinsatz, Kinetische Kette..."
            }
            className="mt-1 w-full rounded-[var(--radius)] border border-[var(--line)] bg-[var(--surface)] px-2.5 py-1 text-xs text-[var(--ink)] placeholder:text-[var(--gray)] focus:border-[var(--accent)]"
          />
        </label>

        <label className="block">
          <span className="font-mono text-[var(--text-meta)] text-[var(--gray)] uppercase tracking-wider">
            3. Synthese & begründetes Urteil (AFB III) / 综合审视与价值判断:
          </span>
          <textarea
            rows={2}
            value={urteil}
            onChange={(e) => setUrteil(e.target.value)}
            placeholder="Wirkung, ästhetische/biomechanische Bewertung, Reflexion..."
            className="mt-1 w-full rounded-[var(--radius)] border border-[var(--line)] bg-[var(--surface)] px-2.5 py-1 text-xs text-[var(--ink)] placeholder:text-[var(--gray)] focus:border-[var(--accent)]"
          />
        </label>
      </div>

      <div className="flex justify-end pt-1">
        <button
          type="button"
          onClick={handleExport}
          className="inline-flex items-center gap-1.5 rounded-[var(--radius)] bg-[var(--ink)] px-3 py-1.5 font-mono text-xs text-[var(--paper)] hover:bg-[var(--accent)] transition-colors cursor-pointer"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
            className="h-3.5 w-3.5"
          >
            <path d="M3.5 8.5l3 3 6-6" />
          </svg>
          <span>{copied ? (lang === "de" ? "Übernommen" : "已带入") : (lang === "de" ? "In Chat übernehmen" : "带入作答框")}</span>
        </button>
      </div>
    </div>
  );
}
