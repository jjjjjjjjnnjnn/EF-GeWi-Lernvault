import { useEffect, useState } from "react";
import { planWeek } from "../data";
import { t, type Lang } from "../i18n";
import type { VaultNote } from "../vault/parser";

export interface PlannerTask {
  id: string;
  day: string;
  fach: string;
  task: string;
  done: boolean;
}

interface PlannerStorage {
  klausurDate: string;
  tasks: PlannerTask[];
}

const STORAGE_KEY = "eflernvault:plan:v1";
const DEFAULT_DATE = "2027-06-30";

const default10Tasks: PlannerTask[] = [
  { id: "p1", day: "Mo", fach: "SoWi", task: planWeek[0]?.task ?? "SoWi: 12 Karten + Ungleichheit wiederholen", done: true },
  { id: "p2", day: "Di", fach: "Philosophie", task: planWeek[1]?.task ?? "Philo: Utilitarismus-vs-Kant Quiz (30 Min)", done: true },
  { id: "p3", day: "Mi", fach: "Mathe", task: "Mathe: Formel-Spickzettel & Ableitungsregeln üben", done: false },
  { id: "p4", day: "Do", fach: "Physik", task: "Physik & Chemie: Formeln + Karten wiederholen", done: false },
  { id: "p5", day: "Fr", fach: "Deutsch", task: "Deutsch & Englisch: Klausur-Phrasen trainieren", done: false },
  { id: "p6", day: "Sa", fach: "Bio", task: "Bio & Musik: Fachbegriffe sichten", done: false },
  { id: "p7", day: "So", fach: "Sport", task: "Sport-Theorie & Gesamt-Fehlerlog sichten", done: false },
];

export default function Planner({
  lang = "zh",
  vaultNotes = null,
}: {
  lang?: Lang;
  vaultNotes?: VaultNote[] | null;
}) {
  const tr = t(lang);
  const [klausurDate, setKlausurDate] = useState(DEFAULT_DATE);
  const [tasks, setTasks] = useState<PlannerTask[]>(default10Tasks);
  const [xp, setXp] = useState(0);
  const [streakDays, setStreakDays] = useState(0);

  // Load from localStorage: eflernvault:plan:v1
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed: PlannerStorage = JSON.parse(raw);
        if (parsed.klausurDate) setKlausurDate(parsed.klausurDate);
        if (Array.isArray(parsed.tasks) && parsed.tasks.length > 0) {
          setTasks(parsed.tasks);
        }
      } else if (vaultNotes && vaultNotes.length > 0) {
        // Initialize tasks seeded from real vault notes if no saved plan
        const seeded = vaultNotes.slice(0, 7).map((n, i) => {
          const days = ["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"];
          return {
            id: `v-${n.id}`,
            day: days[i % 7],
            fach: n.fach,
            task: `${n.fach}: ${n.thema} (${n.operatoren.slice(0, 2).join(", ") || "Wiederholung"})`,
            done: false,
          };
        });
        setTasks(seeded);
      }
    } catch (err) {
      console.warn("Failed to load planner storage", err);
    }
  }, [vaultNotes]);

  // Load XP & streak
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

  // Save changes to localStorage: eflernvault:plan:v1
  const savePlan = (newDate: string, newTasks: PlannerTask[]) => {
    try {
      const payload: PlannerStorage = {
        klausurDate: newDate,
        tasks: newTasks,
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    } catch (err) {
      console.error("Failed to save plan storage", err);
    }
  };

  const daysLeft = Math.max(
    0,
    Math.ceil((new Date(klausurDate).getTime() - Date.now()) / 86400000)
  );

  const formattedKlausurDate = (() => {
    try {
      const d = new Date(klausurDate);
      const day = String(d.getDate()).padStart(2, "0");
      const mon = String(d.getMonth() + 1).padStart(2, "0");
      return `${day}.${mon}.`;
    } catch {
      return klausurDate;
    }
  })();

  const toggleTask = (taskId: string) => {
    const updated = tasks.map((t) =>
      t.id === taskId ? { ...t, done: !t.done } : t
    );
    setTasks(updated);
    savePlan(klausurDate, updated);
  };

  const handleDateChange = (newDate: string) => {
    setKlausurDate(newDate);
    savePlan(newDate, tasks);
  };

  if (tasks.length === 0) {
    return (
      <div className="mx-auto max-w-2xl py-12 text-center font-sans text-sm text-[#6B675C]">
        Keine Aufgaben vorhanden / 暂无计划任务 — oben „Vault öffnen“ / 点顶部"打开知识库"
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      {/* Countdown header: Tufte serif big digits + XP & Streak */}
      <div className="flex items-center justify-between border border-[#E5E1D8] bg-white p-6 rounded-sm">
        <div>
          <label className="block text-xs font-mono uppercase tracking-wider text-[#6B675C] mb-2">
            Nächste Klausur / 目标考试日期
          </label>
          <input
            type="date"
            value={klausurDate}
            onChange={(e) => handleDateChange(e.target.value)}
            className="rounded-sm border border-[#E5E1D8] bg-white px-3 py-1.5 text-xs font-mono text-[#1C1B17] focus:border-[#4338CA] focus:outline-none transition-colors"
          />
          <div className="mt-2 text-xs font-mono text-[#6B675C]">
            XP: <span className="font-semibold text-[#1C1B17]">{xp}</span> · 连击:{" "}
            <span className="font-semibold text-[#1C1B17]">{streakDays}</span> Tage
          </div>
        </div>

        <div className="text-right">
          <div className="font-mono text-xs text-[#4338CA] mb-1">
            {tr.daysLeft(daysLeft, formattedKlausurDate)}
          </div>
          <div className="flex items-baseline justify-end gap-1.5">
            <span className="font-serif text-4xl font-normal tabular-nums text-[#1C1B17]">
              {daysLeft}
            </span>
            <span className="font-sans text-xs text-[#6B675C]">Tage / 天</span>
          </div>
          <div className="font-mono text-[11px] text-[#6B675C] mt-1">
            {tr.ddInterleave}
          </div>
        </div>
      </div>

      {/* Weekly schedule with Tufte square checkboxes */}
      <div className="border border-[#E5E1D8] bg-white rounded-sm divide-y divide-[#E5E1D8]">
        <div className="bg-[#FAF9F6] px-4 py-2 text-xs font-mono text-[#6B675C] uppercase tracking-wider flex items-center justify-between">
          <span>Wochenplan (10 Fächer) / 本周任务清单</span>
          <span className="text-[10px] text-[#6B675C]">
            {tasks.filter((t) => t.done).length} / {tasks.length} erledigt
          </span>
        </div>

        {tasks.map((item) => (
          <div
            key={item.id}
            className="flex items-center gap-3.5 p-3.5 hover:bg-[#FAF9F6] transition-colors"
          >
            {/* Tufte square checkbox */}
            <button
              type="button"
              onClick={() => toggleTask(item.id)}
              aria-label={item.done ? "Erledigt" : "Offen"}
              className={`h-4 w-4 shrink-0 border rounded-none flex items-center justify-center transition-colors cursor-pointer ${
                item.done
                  ? "bg-[#1C1B17] border-[#1C1B17] text-white"
                  : "bg-white border-[#6B675C] hover:border-[#1C1B17]"
              }`}
            >
              {item.done && (
                <svg
                  width="10"
                  height="10"
                  viewBox="0 0 10 10"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M2 5.2l2.2 2.3L8 2.5" />
                </svg>
              )}
            </button>

            <span className="w-8 text-center font-mono text-xs font-medium text-[#6B675C] border border-[#E5E1D8] py-0.5 rounded-sm bg-[#FAF9F6] select-none">
              {item.day}
            </span>

            <span
              onClick={() => toggleTask(item.id)}
              className={`flex-1 font-sans text-sm break-words transition-colors cursor-pointer select-none ${
                item.done ? "text-[#6B675C]/60 line-through" : "text-[#1C1B17]"
              }`}
            >
              {item.task}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
