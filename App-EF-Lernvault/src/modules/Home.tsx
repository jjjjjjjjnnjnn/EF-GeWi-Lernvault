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
    "rounded-sm border border-[#E5E1D8] bg-white px-4 py-3";
  const num = "font-serif text-2xl text-[#1C1B17]";
  const lbl = "font-sans text-xs text-[#6B675C] mt-0.5";

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <div className="flex items-end justify-between">
        <h1 className="font-serif text-2xl text-[#1C1B17]">{tr.homeTitle}</h1>
        {o.klausurInDays !== null && (
          <span className="font-mono text-xs text-[#4338CA] border border-[#4338CA]/40 px-2 py-1 rounded-sm">
            {tr.homeKlausur(o.klausurInDays)}
          </span>
        )}
      </div>

      {/* Heute */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
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
      <div className="rounded-sm border border-[#E5E1D8] bg-white p-4">
        <div className="font-sans text-xs text-[#6B675C] mb-2">{tr.homeNext}</div>
        {o.nextUp.length === 0 ? (
          <div className="font-sans text-sm text-[#6B675C]">{tr.homeEmpty}</div>
        ) : (
          <div className="flex flex-wrap gap-2">
            {o.nextUp.map((n) => (
              <button
                key={n.id}
                type="button"
                onClick={() => onJumpToLibrary?.(n.thema)}
                title={`${n.fach} · ${n.thema}`}
                className="rounded-sm border border-[#E5E1D8] px-2 py-1 font-mono text-[11px] text-[#1C1B17] hover:border-[#4338CA] hover:text-[#4338CA] transition-colors"
              >
                {n.fach} · {n.thema}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Beherrschung je fach */}
      <div className="rounded-sm border border-[#E5E1D8] bg-white p-4 space-y-3">
        <div className="flex items-center justify-between">
          <div className="font-sans text-xs text-[#6B675C]">{tr.homeMastery}</div>
          <div className="font-mono text-[11px] text-[#6B675C]">
            {o.weekRate < 0 ? tr.homeNoPlan : tr.homeWeek(Math.round(o.weekRate * 100))}
          </div>
        </div>
        {o.masteryByFach.length === 0 ? (
          <div className="font-sans text-sm text-[#6B675C]">{tr.homeEmpty}</div>
        ) : (
          o.masteryByFach.map((m) => (
            <div key={m.fach} className="flex items-center gap-3">
              <span className="w-24 shrink-0 font-mono text-[11px] text-[#1C1B17]">{m.fach}</span>
              <div className="h-1.5 flex-1 rounded-sm bg-[#ECE7DC]/60">
                <div
                  className="h-1.5 rounded-sm bg-[#4338CA]"
                  style={{ width: `${m.mastery}%` }}
                />
              </div>
              <span className="w-20 shrink-0 text-right font-mono text-[11px] text-[#6B675C]">
                {m.mastery}% · {m.reviewed}/{m.total}
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
