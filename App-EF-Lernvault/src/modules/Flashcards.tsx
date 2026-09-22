import { useEffect, useMemo, useRef, useState } from "react";
import { cards as mockCards } from "../data";
import { t, type Lang } from "../i18n";
import { isTyping } from "../keys";
import type { VaultCard } from "../vault/parser";
import { gradeCard, partitionQueue, type Rating } from "../scheduler";

interface CardItem {
  id: string;
  front: string;
  back: string;
  example: string;
  fach: string;
  meta: string;
}

export default function Flashcards({
  lang,
  vault,
}: {
  lang: Lang;
  vault: VaultCard[] | null;
}) {
  const tr = t(lang);

  const allItems: CardItem[] = useMemo(
    () =>
      vault
        ? vault.map((c) => ({
            id: c.id,
            front: c.front,
            back: c.back,
            example: c.example,
            fach: c.fach,
            meta: c.thema || c.source,
          }))
        : mockCards.map((c) => ({
            id: c.id,
            front: c.front,
            back: c.back,
            example: c.example,
            fach: c.fach,
            meta: c.dueIn,
          })),
    [vault]
  );

  const [browseOnly, setBrowseOnly] = useState(false);
  const [queueVersion, setQueueVersion] = useState(0);

  // Partition items into due / new / future
  const { activeQueue, dueCount, newCount, totalCards } = useMemo(() => {
    return partitionQueue(allItems);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allItems, queueVersion]);

  const [idx, setIdx] = useState(0);
  const [flip, setFlip] = useState(false);
  const [drag, setDrag] = useState(0);
  const [sessionDone, setSessionDone] = useState(0);
  const [sessionAgain, setSessionAgain] = useState(0);
  const [transientBadge, setTransientBadge] = useState<string | null>(null);

  const startX = useRef(0);
  const moved = useRef(false);
  const badgeTimer = useRef<number | null>(null);

  useEffect(() => {
    setIdx(0);
    setFlip(false);
    setDrag(0);
    setSessionDone(0);
    setSessionAgain(0);
    setBrowseOnly(false);
    setTransientBadge(null);
  }, [vault]);

  const currentItems = browseOnly ? allItems : activeQueue;
  const card = currentItems[idx] ?? null;
  const isFinished = !browseOnly && (currentItems.length === 0 || idx >= currentItems.length);

  const showTransient = (text: string) => {
    if (badgeTimer.current) window.clearTimeout(badgeTimer.current);
    setTransientBadge(text);
    badgeTimer.current = window.setTimeout(() => {
      setTransientBadge(null);
    }, 1200);
  };

  const handleRate = (rating: Rating) => {
    if (!card) return;

    if (!browseOnly) {
      const { intervalDays } = gradeCard(card.id, rating);
      showTransient(tr.nextDue(intervalDays));
      setSessionDone((d) => d + 1);
      if (rating === 1) {
        setSessionAgain((a) => a + 1);
      }
      setIdx((i) => i + 1);
      setQueueVersion((v) => v + 1);
    } else {
      // In browse mode, simply advance
      setIdx((i) => (i + 1) % allItems.length);
    }
    setFlip(false);
    setDrag(0);
  };

  // Keyboard navigation
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (isTyping()) return;
      if (e.code === "Space" || e.key === "Enter") {
        e.preventDefault();
        if (!isFinished) setFlip((f) => !f);
      } else if (flip && !isFinished) {
        if (e.key === "1") {
          e.preventDefault();
          handleRate(1);
        } else if (e.key === "2") {
          e.preventDefault();
          handleRate(2);
        } else if (e.key === "3") {
          e.preventDefault();
          handleRate(3);
        } else if (e.key === "4") {
          e.preventDefault();
          handleRate(4);
        }
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
      if (drag < 0) {
        handleRate(1); // Left drag = Again
      } else {
        handleRate(3); // Right drag = Good
      }
    } else {
      setDrag(0);
    }
  };

  const labels = [
    { label: tr.again, rating: 1 as Rating, key: "1" },
    { label: tr.hard, rating: 2 as Rating, key: "2" },
    { label: tr.good, rating: 3 as Rating, key: "3" },
    { label: tr.easy, rating: 4 as Rating, key: "4" },
  ];
  const edge = Math.min(1, Math.abs(drag) / 90);

  // 1. Empty state
  if (allItems.length === 0) {
    return (
      <div className="mx-auto max-w-xl py-12 text-center font-sans text-sm text-[#6B675C]">
        Keine Karten / 暂无卡片 — oben „Vault öffnen“ / 点顶部"打开知识库"
      </div>
    );
  }

  // 2. Completion state (Fertig für heute)
  if (isFinished) {
    return (
      <div className="mx-auto max-w-xl space-y-6 pt-10 text-center">
        <div className="border border-[#E5E1D8] bg-white p-8 rounded-sm shadow-none">
          <div className="font-serif text-2xl text-[#1C1B17] mb-1">
            {tr.doneToday}
          </div>
          <div className="font-sans text-xs text-[#6B675C] mb-6">
            {lang === "de" ? "Alle fälligen Karten wiederholt" : "今日需复习卡片已全部完成"}
          </div>

          <div className="font-mono text-sm text-[#1C1B17] mb-6">
            {lang === "de"
              ? `${sessionDone} Karten gelernt · ${sessionAgain} Again`
              : `已复习 ${sessionDone} 张卡片 · ${sessionAgain} 次需要强化`}
          </div>

          <button
            type="button"
            onClick={() => {
              setBrowseOnly(true);
              setIdx(0);
              setFlip(false);
            }}
            className="inline-flex items-center gap-1.5 rounded-sm border border-[#E5E1D8] bg-[#FAF9F6] px-4 py-2 text-xs font-sans text-[#1C1B17] hover:border-[#4338CA] hover:text-[#4338CA] active:scale-95 transition-all"
          >
            {tr.browseAnyway}
            <span className="font-mono text-[10px] text-[#6B675C]">
              {lang === "de" ? `(alle ${totalCards})` : `(共 ${totalCards} 张)`}
            </span>
          </button>
        </div>

        <p className="font-mono text-[11px] text-[#6B675C]">
          FSRS v1 · {totalCards} Karten im Speicher / 卡片库总计 {totalCards} 张
        </p>
      </div>
    );
  }

  const remainingDue = Math.max(0, dueCount - idx);

  return (
    <div className="mx-auto max-w-xl space-y-4">
      {/* Source and progress metadata */}
      <div className="space-y-1 pb-2 border-b border-[#E5E1D8]">
        <div className="flex items-center justify-between text-xs font-mono text-[#6B675C]">
          <span>
            {card.fach} · <span className="text-[#4338CA] font-medium">{card.meta}</span>
          </span>
          <span>
            {browseOnly
              ? `${idx + 1} / ${allItems.length} (Vorschau / 浏览)`
              : `${sessionDone} gelernt / 已学`}
          </span>
        </div>
        {/* UI-SPEC-V3 Due Header: fällig N / M · 新卡 K */}
        <div className="flex items-center justify-between text-[11px] font-mono text-[#6B675C]">
          <span>
            {browseOnly
              ? lang === "de"
                ? "Nur Durchsicht (kein Zähler)"
                : "仅浏览模式（不计入排程）"
              : `${tr.dueToday(remainingDue, totalCards)} · ${tr.newCards(newCount)}`}
          </span>
          {transientBadge && (
            <span className="text-[#4338CA] font-medium bg-[#ECE7DC]/60 px-1.5 py-0.2 rounded-sm transition-opacity duration-300">
              {transientBadge}
            </span>
          )}
        </div>
      </div>

      {/* Session progress: single hairline */}
      <div className="h-px bg-[#E5E1D8]">
        <div
          className="h-px bg-[#4338CA] transition-all duration-200"
          style={{
            width: `${
              currentItems.length > 0
                ? (((flip ? idx + 1 : idx) % currentItems.length) / currentItems.length) * 100
                : 100
            }%`,
          }}
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
        {labels.map((item) => (
          <button
            key={item.key}
            type="button"
            title={`Taste ${item.key}`}
            onClick={() => handleRate(item.rating)}
            className="flex-1 py-2.5 text-center text-xs font-sans font-medium text-[#1C1B17] hover:text-[#4338CA] hover:bg-[#FAF9F6] active:bg-[#ECE7DC]/60 active:text-[#4338CA] transition-colors"
          >
            {item.label}{" "}
            <span className="ml-1 font-mono text-[10px] text-[#6B675C]">{item.key}</span>
          </button>
        ))}
      </div>
      <p className="text-center font-mono text-[11px] text-[#6B675C]">
        Space = umdrehen · 1–4 = bewerten · ziehen = wischen / 空格翻卡 · 数字评分 · 拖拽
      </p>
    </div>
  );
}
