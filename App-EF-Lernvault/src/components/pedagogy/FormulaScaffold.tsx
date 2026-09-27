import { useState } from "react";
import type { Lang } from "../../i18n";
import MathHtml from "../MathHtml";

interface FormulaScaffoldProps {
  lang?: Lang;
  onFormulaStepComplete?: (formattedAnswer: string) => void;
  fach?: string;
  thema?: string;
}

export default function FormulaScaffold({
  lang = "de",
  onFormulaStepComplete,
  fach = "Mathe",
  thema = "",
}: FormulaScaffoldProps) {
  const getContextualPreset = () => {
    const fLow = (fach || "").toLowerCase();
    const th = (thema || "").toLowerCase();

    // 1. Chemie specific themes
    if (fLow.includes("chem")) {
      if (th.includes("ph") || th.includes("saeure") || th.includes("base") || th.includes("titration")) {
        return {
          f: "\\text{pH} = -\\log_{10}[H_3O^+], \\quad [H_3O^+] = 10^{-\\text{pH}}",
          g: "\\text{pH} = 4.2, \\quad [H_3O^+] = 10^{-4.2} \\approx 6.3 \\cdot 10^{-5} \\text{ mol/L}",
          s: "c(H_3O^+) \\text{ und Neutralisations-Kalkbedarf}",
          u: "mol/L",
          r: lang === "de"
            ? "Zehnerpotenzen subtrahieren / aus pH = -log[H3O+] Konzentration bestimmen."
            : "利用 pH = -log[H3O+] 展开对数与指数计算，求算酸碱度与中和量。",
          a: lang === "de"
            ? "Ergebnis: Saure Lösung erfordert gezielte Kalk-Neutralisation."
            : "结论：酸性溶液需要精准投加碳酸钙完成中和反应。",
        };
      }
      if (th.includes("gleichgewicht") || th.includes("chatelier") || th.includes("mwg")) {
        return {
          f: "K_c = \\frac{[C]^c \\cdot [D]^d}{[A]^a \\cdot [B]^b}",
          g: "[N_2] = 0.5\\text{ mol/L}, [H_2] = 1.5\\text{ mol/L}, [NH_3] = 0.2\\text{ mol/L}",
          s: "Gleichgewichtskonstante K_c",
          u: "L^2/mol^2",
          r: lang === "de"
            ? "Konzentrationen der Produkte durch Edukte teilen."
            : "将平衡浓度代入质量作用定律计算平衡常数。",
          a: lang === "de"
            ? "Ergebnis: Kc bestätigt die Lage des chemischen Gleichgewichts."
            : "结论：Kc 确认了化学反应平衡位置偏向反应物或产物。",
        };
      }
      return {
        f: "c = \\frac{n}{V} = \\frac{m}{M \\cdot V}",
        g: "m = 5.85\\text{ g (NaCl)}, V = 0.5\\text{ L}, M = 58.44\\text{ g/mol}",
        s: "Stoffmengenkonzentration c",
        u: "mol/L",
        r: lang === "de"
          ? "Stoffmenge n = m/M berechnen und durch Volumen V teilen."
          : "先求摩尔质量，再代入计算物质的量浓度。",
        a: lang === "de"
          ? "Ergebnis: c = 0.20 mol/L entspricht der gewünschten Konzentration."
          : "结论：浓度为 0.20 mol/L，符合标准溶液配置要求。",
      };
    }

    // 2. Physik specific themes
    if (fLow.includes("phys")) {
      if (th.includes("feder") || th.includes("pendel") || th.includes("schwingung")) {
        return {
          f: "T = 2\\pi \\sqrt{\\frac{m}{D}}, \\quad \\omega = \\sqrt{\\frac{D}{m}}",
          g: "m = 0.25\\text{ kg}, D = 25\\text{ N/m}",
          s: "Periodendauer T \\text{ und Eigenkreisfrequenz } \\omega",
          u: "s",
          r: lang === "de"
            ? "T = 2 * pi * sqrt(0.25 / 25) = 2 * pi * 0.1 s = 0.628 s"
            : "代入周期公式 T = 2π√(m/D) 计算振动周期。",
          a: lang === "de"
            ? "Ergebnis: T = 0.63 s entspricht der ungedämpften Schwingung."
            : "结论：周期 T = 0.63 秒，与弹簧振子理论谐振一致。",
        };
      }
      return {
        f: "s(t) = \\frac{1}{2} a t^2 + v_0 t + s_0",
        g: "a = 2.5\\text{ m/s}^2, t = 4\\text{ s}, v_0 = 0",
        s: "Zurückgelegte Strecke s(4)",
        u: "m (Meter)",
        r: lang === "de"
          ? "Werte in Weg-Zeit-Gesetz einsetzen: s = 0.5 * 2.5 * 16 = 20 m"
          : "将已知量代入运动学规律计算位移。",
        a: lang === "de"
          ? "Ergebnis: Der Körper legt 20 Meter in 4 Sekunden zurück."
          : "结论：在 4 秒内物体匀加速位移为 20 米。",
      };
    }

    // 3. Bio specific themes
    if (fLow.includes("bio")) {
      return {
        f: "v = \\frac{v_{\\max} \\cdot [S]}{K_m + [S]}",
        g: "[S] = 2.0\\text{ mmol/L}, K_m = 0.5\\text{ mmol/L}, v_{\\max} = 100\\text{ µmol/(min·mg)}",
        s: "Reaktionsgeschwindigkeit v",
        u: "µmol/(min·mg)",
        r: lang === "de"
          ? "Substratkonzentration in Michaelis-Menten-Gleichung einsetzen."
          : "代入米氏方程计算酶促反应速率。",
        a: lang === "de"
          ? "Ergebnis: v = 80 µmol/(min·mg) zeigt hohe Substratsättigung."
          : "结论：反应速率达 80，表明底物已高度饱和。",
      };
    }

    // 4. Mathe default
    return {
      f: "f'(x) = \\lim_{h \\to 0} \\frac{f(x+h) - f(x)}{h}",
      g: "f(x) = x^2, x_0 = 3",
      s: "Lokale Steigung m = f'(3)",
      u: "-",
      r: lang === "de"
        ? "Differenzenquotient aufstellen und Grenzwert h gegen 0 bilden."
        : "构建差商并对增量 h 取极限求导。",
      a: lang === "de"
        ? "Ergebnis: Tangentensteigung m = 6 an der Stelle x0 = 3."
        : "结论：在点 x0 = 3 处的切线斜率为 6。",
    };
  };

  const initialPreset = getContextualPreset();
  const [gegeben, setGegeben] = useState(initialPreset.g);
  const [gesucht, setGesucht] = useState(initialPreset.s);
  const [formel, setFormel] = useState(initialPreset.f);
  const [rechnung, setRechnung] = useState(initialPreset.r);
  const [einheit, setEinheit] = useState(initialPreset.u);
  const [antwort, setAntwort] = useState(initialPreset.a);
  const [copied, setCopied] = useState(false);

  const loadPreset = () => {
    const p = getContextualPreset();
    setFormel(p.f);
    setGegeben(p.g);
    setGesucht(p.s);
    setEinheit(p.u);
    setRechnung(p.r);
    setAntwort(p.a);
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
          <span className="font-mono text-xs text-[var(--gray)]">
            ({fach})
          </span>
        </div>
        <button
          type="button"
          onClick={loadPreset}
          className="rounded-[var(--radius)] border border-[var(--line)] bg-[var(--paper-subtle)] px-2 py-0.5 font-mono text-xs text-[var(--ink)] hover:border-[var(--accent)] transition-colors"
        >
          {lang === "de" ? "Beispiel laden" : "载入典型范例"}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {/* Schritt 1: Gegeben & Gesucht */}
        <div className="space-y-1.5">
          <label className="block">
            <span className="font-mono text-xs text-[var(--gray)] uppercase tracking-wider">
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
          {gegeben.trim() && (gegeben.includes("=") || gegeben.includes("^")) && (
            <div className="mt-1 px-2 py-1 rounded-[var(--radius)] bg-[var(--paper-subtle)] border border-[var(--line)] text-xs font-serif text-[var(--ink)] flex items-center gap-2">
              <span className="font-mono text-xs text-[var(--gray)] shrink-0">Vorschau:</span>
              <div className="overflow-x-auto">
                <MathHtml code={gegeben.replace(/\s*,\s*/g, ",\\; ")} display={false} cacheKey={`scaffold-g:${gegeben}`} />
              </div>
            </div>
          )}
          <label className="block">
            <span className="font-mono text-xs text-[var(--gray)] uppercase tracking-wider">
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
            <span className="font-mono text-xs text-[var(--gray)] uppercase tracking-wider">
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
          {formel.trim() && (
            <div className="mt-1 px-2 py-1.5 rounded-[var(--radius)] border border-[var(--line)] bg-[var(--paper-subtle)] flex items-center justify-between gap-2">
              <span className="font-mono text-xs text-[var(--gray)] shrink-0">Vorschau / 公式预览:</span>
              <div className="flex-1 overflow-x-auto text-center px-1">
                <MathHtml code={formel} display={false} cacheKey={`scaffold-f:${formel}`} />
              </div>
            </div>
          )}
          <label className="block">
            <span className="font-mono text-xs text-[var(--gray)] uppercase tracking-wider">
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
          <span className="font-mono text-xs text-[var(--gray)] uppercase tracking-wider">
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
          <span className="font-mono text-xs text-[var(--gray)] uppercase tracking-wider">
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
