import { useState } from "react";
import { planWeek } from "../data";

export default function Planner() {
  const [klausur, setKlausur] = useState("2026-10-15");
  const [done, setDone] = useState<boolean[]>(planWeek.map((p) => p.done));
  const days = Math.max(0, Math.ceil((new Date(klausur).getTime() - Date.now()) / 86400000));
  return (
    <div className="mx-auto max-w-2xl space-y-4">
      <div className="rounded-xl bg-white p-4 shadow">
        <label className="text-sm text-slate-500">Nächste Klausur / 下次考试：</label>
        <div className="flex items-center gap-3">
          <input type="date" value={klausur} onChange={(e) => setKlausur(e.target.value)} className="rounded border px-2 py-1" />
          <span className="text-xl font-bold text-indigo-700">noch {days} Tage / 还剩 {days} 天</span>
        </div>
      </div>
      {planWeek.map((p, i) => (
        <label key={p.day} className="flex items-center gap-3 rounded-xl bg-white p-4 shadow">
          <input type="checkbox" checked={done[i]} onChange={() => setDone((d) => d.map((v, j) => (j === i ? !v : v)))} className="h-5 w-5" />
          <span className="w-10 rounded bg-slate-200 text-center font-mono text-sm">{p.day}</span>
          <span className={done[i] ? "text-slate-400 line-through" : ""}>{p.task}</span>
        </label>
      ))}
    </div>
  );
}
