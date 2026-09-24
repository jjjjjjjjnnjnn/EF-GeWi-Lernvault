import { useMemo } from "react";
import { t, type Lang } from "../i18n";
import type { VaultCard } from "../vault/parser";
import { buildOverview } from "../engine/overview";

export default function Home({
  lang,
  cards,
  onJumpToLibrary,
}: {
  lang: Lang;
  cards?: VaultCard[] | null;
  onJumpToLibrary?: (query: string, fach?: string) => void;
}) {
  const tr = t(lang);
  const o = useMemo(() => buildOverview(cards ?? null), [cards]);

  const statCard =
    "min-w-0 rounded-[var(--radius)] border border-[var(--line)] bg-[var(--surface)] p-4 transition-colors hover:border-[var(--accent)]/40";
  const num = "font-serif text-3xl font-normal text-[var(--ink)] tracking-tight";
  const lbl = "font-sans text-xs text-[var(--gray)] font-medium mt-1.5 uppercase tracking-wider";

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      {/* Header with Title and Countdown */}
      <div className="flex items-end justify-between border-b border-[var(--line)]/60 pb-3">
        <div>
          <h1 className="font-serif text-2xl text-[var(--ink)] tracking-tight">{tr.homeTitle}</h1>
          <p className="font-sans text-xs text-[var(--gray)] mt-0.5">
            {lang === "de" ? "Tägliche Übersicht und Lernfortschritt" : "每日学习全景与掌握度概览"}
          </p>
        </div>
        {o.klausurInDays !== null && (
          <span className="font-mono text-xs text-[var(--accent)] border border-[var(--accent)]/30 bg-[var(--surface)] px-2.5 py-1 rounded-[var(--radius)]">
            {tr.homeKlausur(o.klausurInDays)}
          </span>
        )}
      </div>

      {/* Heute: 4 micro-cards */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
        <div className={statCard}>
          <div className={num}>{o.dueToday}</div>
          <div className={lbl}>{tr.homeDue}</div>
        </div>
        <div className={statCard}>
          <div className={num}>{o.newToday}</div>
          <div className={lbl}>{tr.homeNew}</div>
        </div>
        <div className={statCard}>
          <div className={num}>{o.xp}</div>
          <div className={lbl}>{tr.homeXp}</div>
        </div>
        <div className={statCard}>
          <div className={num}>{o.streakDays}</div>
          <div className={lbl}>{tr.homeStreak}</div>
        </div>
      </div>

      {/* Nächste fällige Themen */}
      <section className="rounded-[var(--radius)] border border-[var(--line)] bg-[var(--surface)] p-5 space-y-3">
        <div className="font-sans text-xs font-semibold text-[var(--gray)] tracking-wide uppercase">
          {tr.homeNext}
        </div>
        {o.nextUp.length === 0 ? (
          <div className="font-sans text-sm text-[var(--gray)] py-1">{tr.homeEmpty}</div>
        ) : (
          <div className="flex flex-wrap gap-2">
            {o.nextUp.map((n) => (
              <button
                key={n.id}
                type="button"
                onClick={() => onJumpToLibrary?.(n.thema, n.fach)}
                title={`${n.fach} · ${n.thema}`}
                className="rounded-[var(--radius)] border border-[var(--line)] bg-[var(--paper)] px-3 py-1.5 font-mono text-xs text-[var(--ink)] hover:border-[var(--accent)] hover:text-[var(--accent)] hover:bg-[var(--surface)] transition-all cursor-pointer"
              >
                {n.fach} · {n.thema}
              </button>
            ))}
          </div>
        )}
      </section>

      {/* Beherrschung je Fach */}
      <section className="rounded-[var(--radius)] border border-[var(--line)] bg-[var(--surface)] p-5 space-y-4">
        <div className="flex items-center justify-between border-b border-[var(--line)]/60 pb-2.5">
          <div className="font-sans text-xs font-semibold text-[var(--gray)] tracking-wide uppercase">
            {tr.homeMastery}
          </div>
          <div className="font-mono text-xs text-[var(--gray)]">
            {o.weekRate < 0 ? tr.homeNoPlan : tr.homeWeek(Math.round(o.weekRate * 100))}
          </div>
        </div>
        {o.masteryByFach.length === 0 ? (
          <div className="font-sans text-sm text-[var(--gray)] py-1">{tr.homeEmpty}</div>
        ) : (
          <div className="space-y-3">
            {o.masteryByFach.map((m) => (
              <div key={m.fach} className="flex items-center gap-3">
                <span className="w-24 shrink-0 font-mono text-xs text-[var(--ink)]">{m.fach}</span>
                <div className="h-2 flex-1 rounded-[var(--radius)] bg-[var(--paper-subtle)] overflow-hidden">
                  <div
                    className="h-full rounded-[var(--radius)] bg-[var(--accent)] transition-all duration-300"
                    style={{ width: `${m.mastery}%` }}
                  />
                </div>
                <span className="w-24 shrink-0 text-right font-mono text-xs text-[var(--gray)]">
                  {m.mastery}% · {m.reviewed}/{m.total}
                </span>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
