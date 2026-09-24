import { useState } from "react";
import type { Lang } from "../../i18n";

interface FormulaScaffoldProps {
  lang?: Lang;
  onFormulaStepComplete?: (formattedAnswer: string) => void;
  fach?: string;
}

export default function FormulaScaffold({
  lang = "de",
  onFormulaStepComplete,
  fach = "Mathe",
}: FormulaScaffoldProps) {
  const [gegeben, setGegeben] = useState("");
  const [gesucht, setGesucht] = useState("");
  const [formel, setFormel] = useState("");
  const [rechnung, setRechnung] = useState("");
  const [einheit, setEinheit] = useState("");
  const [antwort, setAntwort] = useState("");
  const [copied, setCopied] = useState(false);

  const presetsByFach: Record<string, { f: string; g: string; s: string; u: string }> = {
    Mathe: {
      f: "f'(x) = \\lim_{h \\to 0} \\frac{f(x+h) - f(x)}{h}",
      g: "f(x) = x^2, x_0 = 3",
      s: "Steigung m = f'(3)",
      u: "-",
    },
    Physik: {
      f: "s(t) = \\frac{1}{2} a t^2 + v_0 t + s_0",
      g: "a = 2.5 m/s^2, t = 4 s, v_0 = 0",
      s: "Strecke s(4)",
      u: "m (Meter)",
    },
    Chemie: {
      f: "c = \\frac{n}{V} = \\frac{m}{M \\cdot V}",
      g: "m = 5.85 g (NaCl), V = 0.5 L, M = 58.44 g/mol",
      s: "Stoffmengenkonzentration c",
      u: "mol/L",
    },
    Bio: {
      f: "v = \\frac{v_{\\max} \\cdot [S]}{K_m + [S]}",
      g: "[S] = 2.0 mmol/L, K_m = 0.5 mmol/L",
      s: "Reaktionsgeschwindigkeit v",
      u: "µmol/(min·mg)",
    },
  };

  const currentPreset = presetsByFach[fach] ?? presetsByFach.Mathe;

  const loadPreset = () => {
    setFormel(currentPreset.f);
    setGegeben(currentPreset.g);
    setGesucht(currentPreset.s);
    setEinheit(currentPreset.u);
    setRechnung(
      lang === "de"
        ? "Einsetzen der Werte in den Formelansatz mit Einheitenkontrolle."
        : "将已知数值与物理量纲代入公式展开计算。"
    );
    setAntwort(
      lang === "de"
        ? "Ergebnis: Der berechnete Wert entspricht den Modellannahmen."
        : "结论：计算数值符合物理/化学/生物模型预期。"
    );
  };

  const handleExport = () => {
    const lines = [
      `### [${fach}] 4-Schritte-Lösungsweg / 规范四步解题`,
      `1. Gegeben / 已知: ${gegeben || "-"}`,
      `   Gesucht / 待求: ${gesucht || "-"}`,
      `2. Formelansatz / 公式选取: $${formel || "-"}$`,
      `3. Rechnung & Einheiten / 运算与单位: ${rechnung || "-"} [Einheit: ${einheit || "-"}]`,
      `4. Antwortsatz / 结论: ${antwort || "-"}`,
    ];
    const fullText = lines.join("\n");
    onFormulaStepComplete?.(fullText);
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
            <path d="M2.5 13.5l3.5-9h4l3.5 9M4.5 9h7" />
          </svg>
          <span className="font-mono text-xs font-semibold text-[var(--ink)]">
            {lang === "de" ? "MINT 4-Schritte-Lösungsweg" : "理科四步规范解题手架"}
          </span>
          <span className="font-mono text-[var(--text-meta)] text-[var(--gray)]">
            ({fach})
          </span>
        </div>
        <button
          type="button"
          onClick={loadPreset}
          className="rounded-[var(--radius)] border border-[var(--line)] bg-[var(--paper-subtle)] px-2 py-0.5 font-mono text-[var(--text-meta)] text-[var(--ink)] hover:border-[var(--accent)] transition-colors"
        >
          {lang === "de" ? "Beispiel laden" : "载入典型范例"}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {/* Schritt 1: Gegeben & Gesucht */}
        <div className="space-y-1.5">
          <label className="block">
            <span className="font-mono text-[var(--text-meta)] text-[var(--gray)] uppercase tracking-wider">
              1. Gegeben / 已知量 (mit Einheiten):
            </span>
            <input
              type="text"
              value={gegeben}
              onChange={(e) => setGegeben(e.target.value)}
              placeholder="z.B. a = 2.5 m/s², t = 4 s"
              className="mt-1 w-full rounded-[var(--radius)] border border-[var(--line)] bg-[var(--surface)] px-2.5 py-1 text-xs text-[var(--ink)] placeholder:text-[var(--gray)] focus:border-[var(--accent)]"
            />
          </label>
          <label className="block">
            <span className="font-mono text-[var(--text-meta)] text-[var(--gray)] uppercase tracking-wider">
              Gesucht / 待求量:
            </span>
            <input
              type="text"
              value={gesucht}
              onChange={(e) => setGesucht(e.target.value)}
              placeholder="z.B. Strecke s(t)"
              className="mt-1 w-full rounded-[var(--radius)] border border-[var(--line)] bg-[var(--surface)] px-2.5 py-1 text-xs text-[var(--ink)] placeholder:text-[var(--gray)] focus:border-[var(--accent)]"
            />
          </label>
        </div>

        {/* Schritt 2: Formelansatz */}
        <div className="space-y-1.5">
          <label className="block">
            <span className="font-mono text-[var(--text-meta)] text-[var(--gray)] uppercase tracking-wider">
              2. Formelansatz / 公式定理 (LaTeX):
            </span>
            <input
              type="text"
              value={formel}
              onChange={(e) => setFormel(e.target.value)}
              placeholder="z.B. s = 1/2 a t^2"
              className="mt-1 w-full rounded-[var(--radius)] border border-[var(--line)] bg-[var(--surface)] px-2.5 py-1 font-mono text-xs text-[var(--ink)] placeholder:text-[var(--gray)] focus:border-[var(--accent)]"
            />
          </label>
          <label className="block">
            <span className="font-mono text-[var(--text-meta)] text-[var(--gray)] uppercase tracking-wider">
              Ziel-Einheit / 预期单位:
            </span>
            <input
              type="text"
              value={einheit}
              onChange={(e) => setEinheit(e.target.value)}
              placeholder="z.B. m, N, mol/L"
              className="mt-1 w-full rounded-[var(--radius)] border border-[var(--line)] bg-[var(--surface)] px-2.5 py-1 text-xs text-[var(--ink)] placeholder:text-[var(--gray)] focus:border-[var(--accent)]"
            />
          </label>
        </div>
      </div>

      {/* Schritt 3 & 4 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
        <label className="block">
          <span className="font-mono text-[var(--text-meta)] text-[var(--gray)] uppercase tracking-wider">
            3. Rechnung / 代入与单位换算:
          </span>
          <textarea
            rows={2}
            value={rechnung}
            onChange={(e) => setRechnung(e.target.value)}
            placeholder={lang === "de" ? "Werte einsetzen und Schritt für Schritt ausrechnen..." : "数值代入与严密量纲验证..."}
            className="mt-1 w-full rounded-[var(--radius)] border border-[var(--line)] bg-[var(--surface)] px-2.5 py-1 text-xs text-[var(--ink)] placeholder:text-[var(--gray)] focus:border-[var(--accent)]"
          />
        </label>
        <label className="block">
          <span className="font-mono text-[var(--text-meta)] text-[var(--gray)] uppercase tracking-wider">
            4. Antwortsatz / 物理/数学意义结论:
          </span>
          <textarea
            rows={2}
            value={antwort}
            onChange={(e) => setAntwort(e.target.value)}
            placeholder={lang === "de" ? "Vollständiger Antwortsatz mit Kontextbezug..." : "完整结论句与考纲要点对照..."}
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
