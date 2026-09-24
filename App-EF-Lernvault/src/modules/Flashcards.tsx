import { useEffect, useMemo, useRef, useState } from "react";
import { cards as mockCards } from "../data";
import { t, type Lang } from "../i18n";
import { PER_MODULE_KEYS, isTyping, matchesKey } from "../keys";
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
  selectedFach = "alle",
  onSubjectChange,
}: {
  lang: Lang;
  vault: VaultCard[] | null;
  selectedFach?: string;
  onSubjectChange?: (fach: string) => void;
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

  const subjectCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const c of allItems) {
      const f = c.fach || "Sonstiges";
      counts[f] = (counts[f] || 0) + 1;
    }
    return counts;
  }, [allItems]);

  const activeFach = selectedFach ?? "alle";

  const filteredItems: CardItem[] = useMemo(() => {
    if (activeFach === "alle") return allItems;
    return allItems.filter(
      (c) => (c.fach || "").toLowerCase() === activeFach.toLowerCase()
    );
  }, [allItems, activeFach]);

  const [browseOnly, setBrowseOnly] = useState(false);

  // Session-Snapshot: Die Warteschlange wird EINMAL pro Sitzung eingefroren.
  // (partitionQueue nach jeder Bewertung neu zu rechnen, schrumpft die
  // Liste von beiden Enden — die Sitzung war nach ~der Hälfte „fertig".)
  // Again-Karten werden ans Sitzungsende zurückgelegt (klassisch).
  const [session, setSession] = useState<{ items: CardItem[]; newCount: number }>({
    items: [],
    newCount: 0,
  });
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
    const { activeQueue, newCount } = partitionQueue(filteredItems);
    setSession({ items: activeQueue, newCount });
    setIdx(0);
    setFlip(false);
    setDrag(0);
    setSessionDone(0);
    setSessionAgain(0);
    setBrowseOnly(false);
    setTransientBadge(null);
  }, [filteredItems]);

  const currentItems = browseOnly ? filteredItems : session.items;
  const totalCards = filteredItems.length;
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
    if (!card || !flip) return;

    if (!browseOnly) {
      const { intervalDays } = gradeCard(card.id, rating);
      showTransient(tr.nextDue(intervalDays));
      setSessionDone((d) => d + 1);
      if (rating === 1) {
        setSessionAgain((a) => a + 1);
        // Again → ans Sitzungsende zurücklegen (wird heute nochmals fällig).
        setSession((s) => ({ ...s, items: [...s.items, card] }));
      }
      setIdx((i) => i + 1);
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
      if (matchesKey(e, PER_MODULE_KEYS.flashcards[0])) {
        e.preventDefault();
        if (!isFinished) setFlip((current) => !current);
        return;
      }
      if (!flip || isFinished) return;
      const ratingIndex = PER_MODULE_KEYS.flashcards
        .slice(1)
        .findIndex((binding) => matchesKey(e, binding));
      if (ratingIndex >= 0) {
        e.preventDefault();
        handleRate((ratingIndex + 1) as Rating);
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

  const renderSubjectFilter = () => (
    <div className="flex flex-wrap items-center gap-1.5 border-b border-[var(--line)] pb-2 text-xs font-mono">
      <button
        type="button"
        onClick={() => onSubjectChange?.("alle")}
        className={`rounded-[var(--radius)] px-2 py-0.5 transition-colors cursor-pointer ${
          activeFach === "alle"
            ? "bg-[var(--ink)] text-[var(--surface)] font-medium"
            : "text-[var(--gray)] hover:bg-[var(--paper-subtle)] hover:text-[var(--ink)]"
        }`}
      >
        {lang === "de" ? "Alle" : "全部"} ({allItems.length})
      </button>
      {Object.entries(subjectCounts).map(([fach, count]) => (
        <button
          key={fach}
          type="button"
          onClick={() => onSubjectChange?.(fach)}
          className={`rounded-[var(--radius)] px-2 py-0.5 transition-colors cursor-pointer ${
            activeFach.toLowerCase() === fach.toLowerCase()
              ? "bg-[var(--accent)] text-white font-medium"
              : "text-[var(--gray)] hover:bg-[var(--paper-subtle)] hover:text-[var(--ink)]"
          }`}
        >
          {fach} ({count})
        </button>
      ))}
    </div>
  );

  // 1. Empty state
  if (allItems.length === 0) {
    return (
      <div className="mx-auto max-w-xl py-12 text-center font-sans text-sm text-[var(--gray)]">
        Keine Karten / 暂无卡片 — oben „Vault öffnen“ / 点顶部"打开知识库"
      </div>
    );
  }

  // 1b. Empty subject state
  if (filteredItems.length === 0) {
    return (
      <div className="mx-auto max-w-xl space-y-4 py-4">
        {renderSubjectFilter()}
        <div className="rounded-[var(--radius)] border border-[var(--line)] bg-[var(--surface)] p-8 text-center font-sans text-sm text-[var(--gray)]">
          {lang === "de"
            ? `Keine Lernkarten für das Fach „${activeFach}“ gefunden.`
            : `未在学科“${activeFach}”中找到单词卡片。`}
          <div className="mt-4">
            <button
              type="button"
              onClick={() => onSubjectChange?.("alle")}
              className="rounded-[var(--radius)] border border-[var(--line)] bg-[var(--paper-subtle)] px-3 py-1 font-mono text-xs text-[var(--ink)] hover:border-[var(--accent)]"
            >
              {lang === "de" ? "Alle Fächer anzeigen" : "查看全部学科"}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // 2. Completion state (Fertig für heute)
  if (isFinished) {
    return (
      <div className="mx-auto max-w-xl space-y-4 pt-4 text-center">
        {renderSubjectFilter()}
        <div className="rounded-[var(--radius)] border border-[var(--line)] bg-[var(--surface)] p-8">
          <div className="font-serif text-2xl text-[var(--ink)] mb-1">
            {tr.doneToday}
          </div>
          <div className="font-sans text-xs text-[var(--gray)] mb-6">
            {lang === "de" ? "Alle fälligen Karten wiederholt" : "今日需复习卡片已全部完成"}
          </div>

          <div className="font-mono text-sm text-[var(--ink)] mb-2">
            {lang === "de"
              ? `${sessionDone} Karten gelernt · ${sessionAgain} Again`
              : `已复习 ${sessionDone} 张卡片 · ${sessionAgain} 次需要强化`}
          </div>
          <div className="font-mono text-[var(--text-meta)] text-[var(--gray)] mb-6">
            {tr.ddRetrieval}
          </div>

          <button
            type="button"
            onClick={() => {
              setBrowseOnly(true);
              setIdx(0);
              setFlip(false);
            }}
            className="inline-flex items-center gap-1.5 rounded-[var(--radius)] border border-[var(--line)] bg-[var(--paper-subtle)] px-4 py-2 text-xs font-sans text-[var(--ink)] hover:border-[var(--accent)] hover:text-[var(--accent)] active:scale-95 transition-all"
          >
            {tr.browseAnyway}
            <span className="font-mono text-[var(--text-meta)] text-[var(--gray)]">
              {lang === "de" ? `(alle ${totalCards})` : `(共 ${totalCards} 张)`}
            </span>
          </button>
        </div>

        <p className="font-mono text-[var(--text-meta)] text-[var(--gray)]">
          FSRS v1 · {totalCards} Karten im Speicher / 卡片库总计 {totalCards} 张
        </p>
      </div>
    );
  }

  const remainingDue = browseOnly ? 0 : Math.max(0, currentItems.length - idx);
  const progressIndex =
    currentItems.length > 0
      ? Math.min(flip ? idx + 1 : idx, currentItems.length)
      : 0;
  const progressMaximum = Math.max(1, currentItems.length);

  return (
    <div className="mx-auto max-w-xl space-y-4">
      {renderSubjectFilter()}
      {/* Source and progress metadata */}
      <div className="space-y-1 pb-2 border-b border-[var(--line)]">
        <div className="flex items-center justify-between text-xs font-mono text-[var(--gray)]">
          <span>
            {card.fach} · <span className="text-[var(--accent)] font-medium">{card.meta}</span>
          </span>
          <span>
            {browseOnly
              ? `${idx + 1} / ${allItems.length} (Vorschau / 浏览)`
              : `${sessionDone} gelernt / 已学`}
          </span>
        </div>
        {/* UI-SPEC-V3 Due Header: fällig N / M · 新卡 K */}
        <div className="flex items-center justify-between text-[var(--text-meta)] font-mono text-[var(--gray)]">
          <span>
            {browseOnly
              ? lang === "de"
                ? "Nur Durchsicht (kein Zähler)"
                : "仅浏览模式（不计入排程）"
              : `${tr.dueToday(remainingDue, totalCards)} · ${tr.newCards(session.newCount)}`}
          </span>
          <span aria-live="polite" aria-atomic="true">
            {transientBadge && (
              <span className="text-[var(--accent)] font-medium bg-[var(--paper-subtle)]/60 px-1.5 py-0.2 rounded-[var(--radius)]">
                {transientBadge}
              </span>
            )}
          </span>
        </div>
      </div>

      {/* Session progress: single hairline */}
      <div
        role="progressbar"
        aria-label="Kartenfortschritt / 卡片进度"
        aria-valuemin={0}
        aria-valuemax={progressMaximum}
        aria-valuenow={progressIndex}
        aria-valuetext={`${progressIndex} von ${progressMaximum}`}
        className="h-px bg-[var(--line)]"
      >
        <div
          className="h-px bg-[var(--accent)] transition-[width] duration-[var(--dur-normal)]"
          style={{ width: `${(progressIndex / progressMaximum) * 100}%` }}
        />
      </div>

      {/* Central Paper Card: click/Space flips; drag left/right after flip rates */}
      <div className="card-flip relative">
        <span
          className="pointer-events-none absolute left-2 top-1/2 z-10 -translate-y-1/2 font-mono text-xs uppercase tracking-wider text-[var(--gray)]"
          style={{ opacity: drag < 0 ? edge : 0 }}
        >
          ← {tr.again}
        </span>
        <span
          className="pointer-events-none absolute right-2 top-1/2 z-10 -translate-y-1/2 font-mono text-xs uppercase tracking-wider text-[var(--accent)]"
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
              : { transition: "transform var(--dur-normal) var(--ease-out)" }
          }
        >
          <button
            type="button"
            onClick={() => {
              if (!moved.current) setFlip((f) => !f);
            }}
            aria-pressed={flip}
            aria-label={flip ? "Antwort verbergen" : "Antwort anzeigen"}
            className={`card-inner ${flip ? "card-flipped" : ""} relative block h-64 w-full cursor-pointer select-none text-left active:scale-[0.99]`}
          >
            {/* Front: German serif headline */}
            <div className="card-face absolute inset-0 flex flex-col items-center justify-center rounded-[var(--radius)] border border-[var(--line)] bg-[var(--surface)] p-8">
              <span className="text-xs font-mono text-[var(--gray)] uppercase tracking-wider mb-3">
                Terminus
              </span>
              <div className="font-serif text-3xl font-normal text-[var(--ink)] text-center tracking-tight break-words px-4">
                {card.front}
              </div>
              <div className="mt-4 text-xs font-sans text-[var(--gray)] tracking-wide">
                {flip ? "" : `[ ${tr.showAnswer} ]`}
              </div>
            </div>

            {/* Back: Paper white, Chinese answer + German example (no italics) */}
            <div className="card-face card-back absolute inset-0 flex flex-col items-center justify-center rounded-[var(--radius)] border border-[var(--line)] bg-[var(--surface)] p-8">
              <span className="text-xs font-mono text-[var(--gray)] uppercase tracking-wider mb-2">
                Bedeutung & Kontext
              </span>
              <div className="font-sans text-2xl font-normal text-[var(--ink)] text-center mb-3">
                {card.back}
              </div>
              <div className="font-serif text-sm text-[var(--gray)] text-center max-w-md leading-relaxed break-words px-4">
                {card.example}
              </div>
            </div>
          </button>
        </div>
      </div>

      {/* Rating actions: unified row of text buttons with hairline dividers */}
      {flip ? (
        <div className="flex rounded-[var(--radius)] border border-[var(--line)] bg-[var(--surface)] divide-x divide-[var(--line)] overflow-hidden">
          {labels.map((item) => (
            <button
              key={item.key}
              type="button"
              title={`Taste ${item.key}`}
              onClick={() => handleRate(item.rating)}
              className="flex-1 py-2.5 text-center text-xs font-sans font-medium text-[var(--ink)] hover:text-[var(--accent)] hover:bg-[var(--paper-subtle)] active:bg-[var(--paper-subtle)]/60 active:text-[var(--accent)] transition-colors"
            >
              {item.label}{" "}
              <span className="ml-1 font-mono text-[var(--text-meta)] text-[var(--gray)]">{item.key}</span>
            </button>
          ))}
        </div>
      ) : (
        <p role="status" className="rounded-[var(--radius)] border border-[var(--line)] bg-[var(--surface)] py-2.5 text-center text-xs font-sans text-[var(--gray)]">
          {lang === "de" ? "Antwort anzeigen, bevor du bewertest." : "显示答案后再评分。"}
        </p>
      )}
      <p className="text-center font-mono text-[var(--text-meta)] text-[var(--gray)]">
        Space = umdrehen · 1–4 = bewerten · ziehen = wischen / 空格翻卡 · 数字评分 · 拖拽
      </p>
    </div>
  );
}
