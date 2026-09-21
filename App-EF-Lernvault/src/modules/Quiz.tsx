import { useEffect, useState } from "react";
import { quizSteps } from "../data";

export default function Quiz() {
  const [sec, setSec] = useState(0);
  const [run, setRun] = useState(false);
  const [checks, setChecks] = useState<boolean[]>(quizSteps.map(() => false));

  useEffect(() => {
    if (!run) return;
    const id = setInterval(() => setSec((s) => s + 1), 1000);
    return () => clearInterval(id);
  }, [run]);

  const mm = String(Math.floor(sec / 60)).padStart(2, "0");
  const ss = String(sec % 60).padStart(2, "0");

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      {/* Timer: Unadorned tabular monospace digits with hairline border */}
      <div className="flex items-center justify-between border border-[#E5E1D8] bg-white p-4 rounded-sm">
        <div className="flex items-baseline gap-3">
          <span className="font-mono text-3xl font-normal tabular-nums text-[#1C1B17] tracking-tight">
            {mm}:{ss}
          </span>
          <span className="font-mono text-xs text-[#6B675C]">
            / 90:00 Klausurziel
          </span>
        </div>
        <button
          type="button"
          onClick={() => {
            setRun((r) => !r);
            if (!run && sec > 0) setSec(0);
          }}
          className={`px-4 py-1.5 font-mono text-xs uppercase tracking-wider rounded-sm border transition-colors ${
            run
              ? "border-[#1C1B17] bg-[#1C1B17] text-white"
              : "border-[#E5E1D8] bg-white text-[#1C1B17] hover:border-[#4338CA] hover:text-[#4338CA]"
          }`}
        >
          {run ? "Stopp" : "Start"}
        </button>
      </div>

      {/* 3-Step Klausur Checklist: numbered 1. / 2. / 3. separated by hairline lines */}
      <div className="border border-[#E5E1D8] bg-white rounded-sm divide-y divide-[#E5E1D8]">
        {quizSteps.map((s, i) => (
          <label
            key={s.op}
            className="flex items-start gap-3.5 p-4 cursor-pointer hover:bg-[#FAF9F6] transition-colors"
          >
            <input
              type="checkbox"
              checked={checks[i]}
              onChange={() =>
                setChecks((c) => c.map((v, j) => (j === i ? !v : v)))
              }
              className="mt-1 h-4 w-4 rounded-sm accent-[#4338CA] cursor-pointer"
            />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-mono text-xs font-semibold text-[#1C1B17]">
                  {i + 1}.
                </span>
                <span className="font-mono text-xs uppercase tracking-wider text-[#4338CA] border border-[#4338CA]/30 px-1.5 py-0.5 rounded-sm">
                  {s.op}
                </span>
              </div>
              <p className="font-serif text-sm text-[#1C1B17] leading-relaxed break-words">
                {s.de}
              </p>
              <p className="font-sans text-xs text-[#6B675C] mt-1">
                {s.zh}
              </p>
            </div>
          </label>
        ))}
      </div>

      {/* Specimen-style Fehlerlog draft box */}
      <div className="border border-dashed border-[#E5E1D8] bg-[#F7F5F0] p-4 rounded-sm">
        <div className="flex items-center justify-between text-xs font-mono text-[#6B675C] mb-2">
          <span>FEHLERLOG-ENTWURF / 错题日志标本</span>
          <span className="text-[11px]">→ Obsidian Sync</span>
        </div>
        <code className="block bg-white border border-[#E5E1D8] p-3 font-mono text-xs text-[#1C1B17] select-all rounded-sm overflow-x-auto">
          - [ ] [SoWi] Karikatur-These missing / 漫画论点缺失 (Operatoren-Fehler: darstellen)
        </code>
      </div>
    </div>
  );
}
