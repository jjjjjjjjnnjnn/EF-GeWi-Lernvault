import { useEffect, useState } from "react";
import { planWeek } from "../data";
import { t, type Lang } from "../i18n";
import type { VaultNote } from "../vault/parser";
import { planStore, xpStore, type PlanTask } from "../engine/stores";

export type PlannerTask = PlanTask;

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

  // Load from store: eflernvault:plan:v1 (legacy ohne version wird gehoben)
  useEffect(() => {
    const stored = planStore.load();
    if (stored.klausurDate) {
      setKlausurDate(stored.klausurDate);
      if (stored.tasks.length > 0) setTasks(stored.tasks);
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
  }, [vaultNotes]);

  // Load XP & streak
  useEffect(() => {
    const data = xpStore.load();
    setXp(data.xp);
    setStreakDays(data.streak.length);
  }, []);

  // Save changes to store: eflernvault:plan:v1
  const savePlan = (newDate: string, newTasks: PlannerTask[]) => {
    planStore.save({ version: 1, klausurDate: newDate, tasks: newTasks });
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
      <div className="mx-auto max-w-2xl py-12 text-center font-sans text-sm text-[var(--gray)]">
        Keine Aufgaben vorhanden / 暂无计划任务 — oben „Vault öffnen“ / 点顶部"打开知识库"
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      {/* Countdown header: Tufte serif big digits + XP & Streak */}
      <section className="flex items-center justify-between border-b border-[var(--line)] pb-6">
        <div>
          <label htmlFor="klausur-date" className="block text-xs font-mono uppercase tracking-wider text-[var(--gray)] mb-2">
            Nächste Klausur / 目标考试日期
          </label>
          <input
            id="klausur-date"
            type="date"
            value={klausurDate}
            onChange={(e) => handleDateChange(e.target.value)}
            className="rounded-[var(--radius)] border border-[var(--line)] bg-[var(--surface)] px-3 py-1.5 text-xs font-mono text-[var(--ink)] focus:border-[var(--accent)] focus:outline-none transition-colors"
          />
          <div
            role="status"
            aria-live="polite"
            aria-atomic="true"
            className="mt-2 text-xs font-mono text-[var(--gray)]"
          >
            XP: <span className="font-semibold text-[var(--ink)]">{xp}</span> · 连击:{" "}
            <span className="font-semibold text-[var(--ink)]">{streakDays}</span> Tage
          </div>
        </div>

        <div className="text-right">
          <div className="font-mono text-xs text-[var(--accent)] mb-1">
            {tr.daysLeft(daysLeft, formattedKlausurDate)}
          </div>
          <div className="flex items-baseline justify-end gap-1.5">
            <span className="font-serif text-4xl font-normal tabular-nums text-[var(--ink)]">
              {daysLeft}
            </span>
            <span className="font-sans text-xs text-[var(--gray)]">Tage / 天</span>
          </div>
          <div className="font-mono text-[var(--text-meta)] text-[var(--gray)] mt-1">
            {tr.ddInterleave}
          </div>
        </div>
      </section>

      {/* Weekly schedule with Tufte square checkboxes */}
      <section className="border-y border-[var(--line)] divide-y divide-[var(--line)]">
        <div className="px-4 py-2 text-xs font-mono text-[var(--gray)] uppercase tracking-wider flex items-center justify-between">
          <span>Wochenplan (10 Fächer) / 本周任务清单</span>
          <span className="text-[var(--text-meta)] text-[var(--gray)]">
            {tasks.filter((t) => t.done).length} / {tasks.length} erledigt
          </span>
        </div>

        {tasks.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => toggleTask(item.id)}
            aria-pressed={item.done}
            aria-label={`${item.done ? "Als offen markieren" : "Als erledigt markieren"}: ${item.day}, ${item.task}`}
            className="flex w-full items-center gap-3.5 p-3.5 text-left hover:bg-[var(--paper-subtle)] transition-colors"
          >
            <span
              aria-hidden="true"
              className={`h-4 w-4 shrink-0 border rounded-none flex items-center justify-center transition-colors ${
                item.done
                  ? "bg-[var(--ink)] border-[var(--ink)] text-[var(--paper)]"
                  : "bg-[var(--surface)] border-[var(--gray)] hover:border-[var(--ink)]"
              }`}
            >
              {item.done && (
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M3.5 8.5l3 3 6-7" />
                </svg>
              )}
            </span>

            <span aria-hidden="true" className="w-8 text-center font-mono text-xs font-medium text-[var(--gray)] border border-[var(--line)] py-0.5 rounded-[var(--radius)] bg-[var(--paper-subtle)] select-none">
              {item.day}
            </span>

            <span
              className={`flex-1 font-sans text-sm break-words transition-colors select-none ${
                item.done ? "text-[var(--gray)]/60 line-through" : "text-[var(--ink)]"
              }`}
            >
              {item.task}
            </span>
          </button>
        ))}
      </section>
    </div>
  );
}
