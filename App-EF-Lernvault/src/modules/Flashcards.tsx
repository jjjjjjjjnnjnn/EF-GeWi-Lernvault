import { useEffect, useRef, useState } from "react";
import { cards } from "../data";
import { t, type Lang } from "../i18n";
import { isTyping } from "../keys";

const RATINGS = [0, 1, 2, 3];

export default function Flashcards({ lang }: { lang: Lang }) {
  const tr = t(lang);
  const [idx, setIdx] = useState(0);
  const [flip, setFlip] = useState(false);
  const [done, setDone] = useState(0);
  const [drag, setDrag] = useState(0);
  const startX = useRef(0);
  const moved = useRef(false);

  const card = cards[idx % cards.length];
  const pos = idx % cards.length;
  const round = Math.floor(idx / cards.length) + 1;

  const rate = () => {
    setFlip(false);
    setDrag(0);
    setDone((d) => d + 1);
    setIdx((i) => i + 1);
  };

  // Anki muscle memory: Space/Enter flips, 1-4 rates.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (isTyping()) return;
      if (e.code === "Space" || e.key === "Enter") {
        e.preventDefault();
        if (!flip) setFlip(true);
      } else if (flip && ["1", "2", "3", "4"].includes(e.key)) {
        e.preventDefault();
        rate();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  const onPointerDown = (e: React.PointerEvent) => {
    startX.current = e.clientX;
    moved.current = false;
    (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
  };
  const onPointerMove = (e: React.PointerEvent) => {
    if (!flip || e.buttons === 0) return;
    const dx = e.clientX - startX.current;
    if (Math.abs(dx) > 8) moved.current = true;
    setDrag(dx);
  };
  const onPointerUp = () => {
    if (flip && Math.abs(drag) > 90) {
      rate(); // right = Good, left = Again (session advance)
    } else {
      setDrag(0);
    }
  };

  const labels = [tr.again, tr.hard, tr.good, tr.easy];
  const edge = Math.min(1, Math.abs(drag) / 90);

  return (
    <div className="mx-auto max-w-xl space-y-4">
      {/* Due and progress metadata: small text line with hairline divider */}
      <div className="flex items-center justify-between text-xs font-mono text-[#6B675C] pb-2 border-b border-[#E5E1D8]">
        <span>
          {card.fach} · {tr.due}:{" "}
          <span className="text-[#4338CA] font-medium">{card.dueIn}</span>
        </span>
        <span>
          {done} gelernt / 已学 · Runde {round}
        </span>
      </div>

      {/* Session progress: single hairline */}
      <div className="h-px bg-[#E5E1D8]">
        <div
          className="h-px bg-[#4338CA] transition-all duration-200"
          style={{ width: `${(((flip ? pos + 1 : pos) % cards.length) / cards.length) * 100}%` }}
        />
      </div>

      {/* Central Paper Card: click/Space flips; drag left/right after flip rates */}
      <div className="card-flip relative">
        <span
          className="pointer-events-none absolute left-2 top-1/2 z-10 -translate-y-1/2 font-mono text-xs uppercase tracking-wider text-[#6B675C]"
          style={{ opacity: drag < 0 ? edge : 0 }}
        >
          ← {tr.again}
        </span>
        <span
          className="pointer-events-none absolute right-2 top-1/2 z-10 -translate-y-1/2 font-mono text-xs uppercase tracking-wider text-[#4338CA]"
          style={{ opacity: drag > 0 ? edge : 0 }}
        >
          {tr.good} →
        </span>
        <div
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          style={
            drag
              ? { transform: `translateX(${drag}px) rotate(${drag / 24}deg)`, transition: "none" }
              : { transition: "transform 180ms cubic-bezier(0.16,1,0.3,1)" }
          }
        >
          <button
            type="button"
            onClick={() => {
              if (!moved.current) setFlip((f) => !f);
            }}
            className={`card-inner ${flip ? "card-flipped" : ""} relative block h-64 w-full cursor-pointer select-none text-left transition-transform duration-150 active:scale-[0.99]`}
          >
            {/* Front: German serif headline */}
            <div className="card-face absolute inset-0 flex flex-col items-center justify-center rounded-sm border border-[#E5E1D8] bg-white p-8">
              <span className="text-xs font-mono text-[#6B675C] uppercase tracking-wider mb-3">
                Terminus
              </span>
              <div className="font-serif text-3xl font-normal text-[#1C1B17] text-center tracking-tight break-words px-4">
                {card.front}
              </div>
              <div className="mt-4 text-xs font-sans text-[#6B675C] tracking-wide">
                {flip ? "" : `[ ${tr.showAnswer} ]`}
              </div>
            </div>

            {/* Back: Paper white, Chinese answer + German example (no italics) */}
            <div className="card-face card-back absolute inset-0 flex flex-col items-center justify-center rounded-sm border border-[#E5E1D8] bg-white p-8">
              <span className="text-xs font-mono text-[#6B675C] uppercase tracking-wider mb-2">
                Bedeutung & Kontext
              </span>
              <div className="font-sans text-2xl font-normal text-[#1C1B17] text-center mb-3">
                {card.back}
              </div>
              <div className="font-serif text-sm text-[#6B675C] text-center max-w-md leading-relaxed break-words px-4">
                {card.example}
              </div>
            </div>
          </button>
        </div>
      </div>

      {/* Rating actions: unified row of text buttons with hairline dividers */}
      <div className="flex border border-[#E5E1D8] bg-white rounded-sm divide-x divide-[#E5E1D8]">
        {labels.map((r, i) => (
          <button
            key={r}
            type="button"
            title={`Taste ${RATINGS[i] + 1}`}
            onClick={rate}
            className="flex-1 py-2.5 text-center text-xs font-sans font-medium text-[#1C1B17] hover:text-[#4338CA] hover:bg-[#FAF9F6] active:bg-[#ECE7DC]/60 active:text-[#4338CA] transition-colors"
          >
            {r} <span className="ml-1 font-mono text-[10px] text-[#6B675C]">{RATINGS[i] + 1}</span>
          </button>
        ))}
      </div>
      <p className="text-center font-mono text-[11px] text-[#6B675C]">
        Space = umdrehen · 1–4 = bewerten · ziehen = wischen / 空格翻卡 · 数字评分 · 拖拽
      </p>
    </div>
  );
}
