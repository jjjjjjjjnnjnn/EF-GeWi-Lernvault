import { useState } from "react";
import { planWeek } from "../data";

export default function Planner() {
  const [klausur, setKlausur] = useState("2026-10-15");
  const [done, setDone] = useState<boolean[]>(planWeek.map((p) => p.done));

  const days = Math.max(
    0,
    Math.ceil((new Date(klausur).getTime() - Date.now()) / 86400000)
  );

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      {/* Countdown header: classical serif big digits with muted label */}
      <div className="flex items-center justify-between border border-[#E5E1D8] bg-white p-6 rounded-sm">
        <div>
          <label className="block text-xs font-mono uppercase tracking-wider text-[#6B675C] mb-2">
            Nächste Klausur / 目标考试
          </label>
          <input
            type="date"
            value={klausur}
            onChange={(e) => setKlausur(e.target.value)}
            className="rounded-sm border border-[#E5E1D8] bg-white px-3 py-1.5 text-xs font-mono text-[#1C1B17] focus:border-[#4338CA] focus:outline-none transition-colors"
          />
        </div>

        <div className="text-right">
          <div className="flex items-baseline justify-end gap-1.5">
            <span className="font-serif text-4xl font-normal tabular-nums text-[#1C1B17]">
              {days}
            </span>
            <span className="font-sans text-xs text-[#6B675C]">Tage / 天</span>
          </div>
          <div className="text-[10px] font-mono uppercase tracking-wider text-[#4338CA] mt-0.5">
            Klausur-Fokus
          </div>
        </div>
      </div>

      {/* Weekly schedule: clean hairline rows */}
      <div className="border border-[#E5E1D8] bg-white rounded-sm divide-y divide-[#E5E1D8]">
        <div className="bg-[#FAF9F6] px-4 py-2 text-xs font-mono text-[#6B675C] uppercase tracking-wider">
          Wochenplan / 本周任务清单
        </div>
        {planWeek.map((p, i) => (
          <label
            key={p.day}
            className="flex items-center gap-3.5 p-3.5 cursor-pointer hover:bg-[#FAF9F6] transition-colors"
          >
            <input
              type="checkbox"
              checked={done[i]}
              onChange={() =>
                setDone((d) => d.map((v, j) => (j === i ? !v : v)))
              }
              className="h-4 w-4 rounded-sm accent-[#4338CA] cursor-pointer"
            />
            <span className="w-8 text-center font-mono text-xs font-medium text-[#6B675C] border border-[#E5E1D8] py-0.5 rounded-sm bg-[#FAF9F6]">
              {p.day}
            </span>
            <span
              className={`flex-1 font-sans text-sm break-words transition-colors ${
                done[i]
                  ? "text-[#6B675C]/60 line-through"
                  : "text-[#1C1B17]"
              }`}
            >
              {p.task}
            </span>
          </label>
        ))}
      </div>
    </div>
  );
}
