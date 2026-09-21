import { useState } from "react";
import { cards } from "../data";
import { t, type Lang } from "../i18n";

export default function Flashcards({ lang }: { lang: Lang }) {
  const tr = t(lang);
  const [idx, setIdx] = useState(0);
  const [flip, setFlip] = useState(false);
  const [done, setDone] = useState(0);

  const card = cards[idx % cards.length];

  const rate = () => {
    setFlip(false);
    setDone((d) => d + 1);
    setIdx((i) => i + 1);
  };

  return (
    <div className="mx-auto max-w-xl space-y-4">
      {/* Due and progress metadata: small text line with hairline divider */}
      <div className="flex items-center justify-between text-xs font-mono text-[#6B675C] pb-2 border-b border-[#E5E1D8]">
        <span>
          {card.fach} · {tr.due}:{" "}
          <span className="text-[#4338CA] font-medium">{card.dueIn}</span>
        </span>
        <span>{done} gelernt / 已学</span>
      </div>

      {/* Central Paper Card (thin border, no shadow, non-bouncy 3D flip) */}
      <div className="card-flip">
        <button
          type="button"
          onClick={() => setFlip((f) => !f)}
          className={`card-inner ${flip ? "card-flipped" : ""} relative block h-64 w-full cursor-pointer text-left transition-transform duration-150 active:scale-[0.99]`}
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

      {/* Rating actions: unified row of text buttons with hairline dividers */}
      <div className="flex border border-[#E5E1D8] bg-white rounded-sm divide-x divide-[#E5E1D8]">
        {[tr.again, tr.hard, tr.good, tr.easy].map((r) => (
          <button
            key={r}
            type="button"
            onClick={rate}
            className="flex-1 py-2.5 text-center text-xs font-sans font-medium text-[#1C1B17] hover:text-[#4338CA] hover:bg-[#FAF9F6] active:bg-[#ECE7DC]/60 active:text-[#4338CA] transition-colors"
          >
            {r}
          </button>
        ))}
      </div>
    </div>
  );
}
