import { useMemo } from "react";
import { t, type Lang } from "../i18n";
import type { VaultCard } from "../vault/parser";
import { buildOverview } from "../engine/overview";

//主页: nur daten aus engine/overview rendern (visuelles redesign folgt extern).
export default function Home({
  lang,
  cards,
  onJumpToLibrary,
}: {
  lang: Lang;
  cards?: VaultCard[] | null;
  onJumpToLibrary?: (query: string) => void;
}) {
  const tr = t(lang);
  const o = useMemo(() => buildOverview(cards ?? null), [cards]);

  const stat =
    "min-w-0 py-3 sm:px-4 sm:first:pl-0 sm:last:pr-0";
  const num = "font-serif text-2xl text-[var(--ink)]";
  const lbl = "font-sans text-xs text-[var(--gray)] mt-0.5";

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <div className="flex items-end justify-between">
        <h1 className="font-serif text-2xl text-[var(--ink)]">{tr.homeTitle}</h1>
        {o.klausurInDays !== null && (
          <span className="font-mono text-xs text-[var(--accent)] border border-[var(--accent)]/40 px-2 py-1 rounded-[var(--radius)]">
            {tr.homeKlausur(o.klausurInDays)}
          </span>
        )}
      </div>

      {/* Heute */}
      <div className="grid grid-cols-2 gap-y-4 border-y border-[var(--line)] sm:grid-cols-4 sm:divide-x sm:divide-[var(--line)] sm:gap-0">
        <div className={stat}>
          <div className={num}>{o.dueToday}</div>
          <div className={lbl}>{tr.homeDue}</div>
        </div>
        <div className={stat}>
          <div className={num}>{o.newToday}</div>
          <div className={lbl}>{tr.homeNew}</div>
        </div>
        <div className={stat}>
          <div className={num}>{o.xp}</div>
          <div className={lbl}>{tr.homeXp}</div>
        </div>
        <div className={stat}>
          <div className={num}>{o.streakDays}</div>
          <div className={lbl}>{tr.homeStreak}</div>
        </div>
      </div>

      {/* Naechste faellige */}
      <section className="border-b border-[var(--line)] pb-4">
        <div className="font-sans text-xs text-[var(--gray)] mb-2">{tr.homeNext}</div>
        {o.nextUp.length === 0 ? (
          <div className="font-sans text-sm text-[var(--gray)]">{tr.homeEmpty}</div>
        ) : (
          <div className="flex flex-wrap gap-2">
            {o.nextUp.map((n) => (
              <button
                key={n.id}
                type="button"
                onClick={() => onJumpToLibrary?.(n.thema)}
                title={`${n.fach} · ${n.thema}`}
                className="rounded-[var(--radius)] border border-[var(--line)] px-2 py-1 font-mono text-[var(--text-meta)] text-[var(--ink)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors"
              >
                {n.fach} · {n.thema}
              </button>
            ))}
          </div>
        )}
      </section>

      {/* Beherrschung je fach */}
      <section className="border-b border-[var(--line)] pb-4">
        <div className="flex items-center justify-between">
          <div className="font-sans text-xs text-[var(--gray)]">{tr.homeMastery}</div>
          <div className="font-mono text-[var(--text-meta)] text-[var(--gray)]">
            {o.weekRate < 0 ? tr.homeNoPlan : tr.homeWeek(Math.round(o.weekRate * 100))}
          </div>
        </div>
        {o.masteryByFach.length === 0 ? (
          <div className="font-sans text-sm text-[var(--gray)]">{tr.homeEmpty}</div>
        ) : (
          o.masteryByFach.map((m) => (
            <div key={m.fach} className="flex items-center gap-3">
              <span className="w-24 shrink-0 font-mono text-[var(--text-meta)] text-[var(--ink)]">{m.fach}</span>
              <div className="h-1.5 flex-1 rounded-[var(--radius)] bg-[var(--paper-subtle)]/60">
                <div
                  className="h-1.5 rounded-[var(--radius)] bg-[var(--accent)]"
                  style={{ width: `${m.mastery}%` }}
                />
              </div>
              <span className="w-20 shrink-0 text-right font-mono text-[var(--text-meta)] text-[var(--gray)]">
                {m.mastery}% · {m.reviewed}/{m.total}
              </span>
            </div>
          ))
        )}
      </section>
    </div>
  );
}
