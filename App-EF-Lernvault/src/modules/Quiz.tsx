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
    <div className="mx-auto max-w-2xl space-y-4">
      <div className="flex items-center justify-between rounded-xl bg-white p-4 shadow">
        <div className="text-2xl font-mono font-bold">{mm}:{ss} <span className="text-sm font-normal text-slate-500">/ 90:00 Ziel</span></div>
        <button onClick={() => { setRun((r) => !r); if (!run) setSec(0); }} className="rounded-xl bg-indigo-600 px-4 py-2 text-white">
          {run ? "Stop" : "Start"}
        </button>
      </div>
      {quizSteps.map((s, i) => (
        <label key={s.op} className="block rounded-xl bg-white p-4 shadow">
          <div className="flex items-center gap-3">
            <input type="checkbox" checked={checks[i]} onChange={() => setChecks((c) => c.map((v, j) => (j === i ? !v : v)))} className="h-5 w-5" />
            <span className="rounded bg-indigo-100 px-2 py-0.5 font-mono text-sm text-indigo-700">{i + 1}. {s.op}</span>
          </div>
          <p className="mt-2 italic">{s.de}</p>
          <p className="text-sm text-slate-600">中 {s.zh}</p>
        </label>
      ))}
      <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 p-4 text-sm text-slate-600">
        Fehlerlog-Entwurf（做错自动生成补丁，回 Obsidian 确认提交）：
        <code className="mt-1 block rounded bg-white p-2 font-mono text-xs">- [ ] [SoWi] Karikatur-These missing / 漫画论点缺失</code>
      </div>
    </div>
  );
}
