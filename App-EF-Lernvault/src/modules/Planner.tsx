import { useEffect, useState } from "react";
import { planWeek } from "../data";

// 10-Fach weekly task template: preserves SoWi/Philo tasks, fills remaining subjects
const full10Plan = [
  { day: "Mo", fach: "SoWi", task: planWeek[0]?.task ?? "SoWi: 12 Karten + Ungleichheit wiederholen", done: true },
  { day: "Di", fach: "Philosophie", task: planWeek[1]?.task ?? "Philo: Utilitarismus-vs-Kant Quiz (30 Min)", done: true },
  { day: "Mi", fach: "Mathe", task: "Mathe: Formel-Spickzettel & Ableitungsregeln üben", done: false },
  { day: "Do", fach: "Physik", task: "Physik & Chemie: Formeln + Karten wiederholen", done: false },
  { day: "Fr", fach: "Deutsch", task: "Deutsch & Englisch: Klausur-Phrasen trainieren", done: false },
  { day: "Sa", fach: "Bio", task: "Bio & Musik: Fachbegriffe sichten", done: false },
  { day: "So", fach: "Sport", task: "Sport-Theorie & Gesamt-Fehlerlog sichten", done: false },
];

export default function Planner() {
  const [klausur, setKlausur] = useState("2026-10-15");
  const [tasks, setTasks] = useState(full10Plan);
  const [xp, setXp] = useState(0);
  const [streakDays, setStreakDays] = useState(0);

  // Load XP & streak from eflernvault:xp:v1
  useEffect(() => {
    try {
      const raw = localStorage.getItem("eflernvault:xp:v1");
      if (raw) {
        const data = JSON.parse(raw);
        setXp(data.xp ?? 0);
        setStreakDays(Array.isArray(data.streak) ? data.streak.length : 0);
      }
    } catch {
      // fallback
    }
  }, []);

  const days = Math.max(
    0,
    Math.ceil((new Date(klausur).getTime() - Date.now()) / 86400000)
  );

  const toggleDone = (index: number) => {
    setTasks((prev) =>
      prev.map((t, i) => (i === index ? { ...t, done: !t.done } : t))
    );
  };

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      {/* Countdown header: classical serif big digits with muted label + XP/Streak */}
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
          <div className="mt-2 text-xs font-mono text-[#6B675C]">
            XP: <span className="font-semibold text-[#1C1B17]">{xp}</span> · 连击:{" "}
            <span className="font-semibold text-[#1C1B17]">{streakDays}</span> Tage
          </div>
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

      {/* 10-Fach Weekly schedule: clean hairline rows */}
      <div className="border border-[#E5E1D8] bg-white rounded-sm divide-y divide-[#E5E1D8]">
        <div className="bg-[#FAF9F6] px-4 py-2 text-xs font-mono text-[#6B675C] uppercase tracking-wider flex items-center justify-between">
          <span>Wochenplan (10 Fächer) / 本周任务清单</span>
          <span className="text-[10px] lowercase text-[#6B675C]">gymnasium ef nrw</span>
        </div>
        {tasks.map((p, i) => (
          <label
            key={p.day + p.fach}
            className="flex items-center gap-3.5 p-3.5 cursor-pointer hover:bg-[#FAF9F6] transition-colors"
          >
            <input
              type="checkbox"
              checked={p.done}
              onChange={() => toggleDone(i)}
              className="h-4 w-4 rounded-sm accent-[#4338CA] cursor-pointer"
            />
            <span className="w-8 text-center font-mono text-xs font-medium text-[#6B675C] border border-[#E5E1D8] py-0.5 rounded-sm bg-[#FAF9F6]">
              {p.day}
            </span>
            <span
              className={`flex-1 font-sans text-sm break-words transition-colors ${
                p.done ? "text-[#6B675C]/60 line-through" : "text-[#1C1B17]"
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
