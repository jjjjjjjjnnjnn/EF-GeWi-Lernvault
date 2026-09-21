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
    <div className="mx-auto max-w-xl">
      <div className="mb-2 flex justify-between text-sm text-slate-500">
        <span>{card.fach} · {tr.due}: {card.dueIn}</span>
        <span>{done} gelernt / 已学</span>
      </div>
      <div className={`card-flip ${flip ? "" : ""}`}>
        <button
          onClick={() => setFlip((f) => !f)}
          className={`card-inner ${flip ? "card-flipped" : ""} relative block h-64 w-full`}
        >
          <div className="card-face absolute inset-0 flex flex-col items-center justify-center rounded-2xl bg-white shadow">
            <div className="text-3xl font-bold">{card.front}</div>
            <div className="mt-2 text-sm text-indigo-600">{flip ? "" : tr.showAnswer}</div>
          </div>
          <div className="card-face card-back absolute inset-0 flex flex-col items-center justify-center rounded-2xl bg-indigo-600 p-6 text-white shadow">
            <div className="text-3xl font-bold">{card.back}</div>
            <div className="mt-2 text-sm italic opacity-90">{card.example}</div>
          </div>
        </button>
      </div>
      <div className="mt-4 grid grid-cols-4 gap-2">
        {[tr.again, tr.hard, tr.good, tr.easy].map((r) => (
          <button key={r} onClick={rate} className="rounded-xl bg-slate-200 py-2 font-semibold hover:bg-indigo-200">
            {r}
          </button>
        ))}
      </div>
    </div>
  );
}
