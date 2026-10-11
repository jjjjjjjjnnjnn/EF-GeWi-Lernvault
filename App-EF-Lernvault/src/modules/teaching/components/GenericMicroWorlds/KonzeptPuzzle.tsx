import React, { useState, useMemo, useEffect } from "react";
import type {
  KonzeptPuzzleData,
  PuzzlePair,
} from "../../engine/conceptDistiller";
import { createFallbackKonzeptPuzzle } from "../../engine/conceptDistiller";

export interface KonzeptPuzzleProps {
  puzzleData?: KonzeptPuzzleData;
  title?: string;
  lang?: "de" | "zh";
  fach?: string;
  onAllMatched?: () => void;
}

export const KonzeptPuzzle: React.FC<KonzeptPuzzleProps> = ({
  puzzleData,
  title = "Modell des vollkommenen Marktes",
  lang = "de",
  fach = "SoWi",
  onAllMatched,
}) => {
  // 若未传入 puzzleData，通过 fallback 生成
  const effectiveData: KonzeptPuzzleData = useMemo(() => {
    if (puzzleData && puzzleData.pairs.length > 0) {
      return puzzleData;
    }
    return createFallbackKonzeptPuzzle(title, fach);
  }, [puzzleData, title, fach]);

  const [selectedLeftId, setSelectedLeftId] = useState<string | null>(null);
  const [selectedRightId, setSelectedRightId] = useState<string | null>(null);
  const [matchedIds, setMatchedIds] = useState<string[]>([]);
  const [mismatchError, setMismatchError] = useState<{
    leftId: string;
    rightId: string;
  } | null>(null);
  const [hoveredPairId, setHoveredPairId] = useState<string | null>(null);
  const [activeSpotlightPairId, setActiveSpotlightPairId] = useState<string | null>(null);

  // 乱序打乱右侧卡片，使匹配需要真实辨析（使用确定性伪随机打乱以防 hydration 抖动）
  const shuffledRightPairs: PuzzlePair[] = useMemo(() => {
    const list = [...effectiveData.pairs];
    // 固定伪随机旋转打乱
    if (list.length >= 4) {
      return [list[2], list[0], list[3], list[1]];
    }
    return list.reverse();
  }, [effectiveData.pairs]);

  const isAllMatched =
    effectiveData.pairs.length > 0 &&
    matchedIds.length >= effectiveData.pairs.length;

  useEffect(() => {
    if (isAllMatched && onAllMatched) {
      onAllMatched();
    }
  }, [isAllMatched, onAllMatched]);

  const handleSelectLeft = (pairId: string) => {
    if (matchedIds.includes(pairId)) return;
    setMismatchError(null);

    if (selectedRightId) {
      // 已选了右侧，进行核验
      if (selectedRightId === pairId) {
        setMatchedIds((prev) => [...prev, pairId]);
        setActiveSpotlightPairId(pairId);
        setSelectedLeftId(null);
        setSelectedRightId(null);
      } else {
        setMismatchError({ leftId: pairId, rightId: selectedRightId });
        setSelectedLeftId(null);
        setSelectedRightId(null);
      }
    } else {
      setSelectedLeftId((prev) => (prev === pairId ? null : pairId));
    }
  };

  const handleSelectRight = (pairId: string) => {
    if (matchedIds.includes(pairId)) return;
    setMismatchError(null);

    if (selectedLeftId) {
      // 已选了左侧，进行核验
      if (selectedLeftId === pairId) {
        setMatchedIds((prev) => [...prev, pairId]);
        setActiveSpotlightPairId(pairId);
        setSelectedLeftId(null);
        setSelectedRightId(null);
      } else {
        setMismatchError({ leftId: selectedLeftId, rightId: pairId });
        setSelectedLeftId(null);
        setSelectedRightId(null);
      }
    } else {
      setSelectedRightId((prev) => (prev === pairId ? null : pairId));
    }
  };

  const handleReset = () => {
    setMatchedIds([]);
    setActiveSpotlightPairId(null);
    setSelectedLeftId(null);
    setSelectedRightId(null);
    setMismatchError(null);
    setHoveredPairId(null);
  };

  const effectiveSpotlightId =
    activeSpotlightPairId && matchedIds.includes(activeSpotlightPairId)
      ? activeSpotlightPairId
      : matchedIds[matchedIds.length - 1];

  const spotlightPair =
    effectiveData.pairs.find((p) => p.id === effectiveSpotlightId) ||
    effectiveData.pairs[0];

  const spotlightConsequence = spotlightPair
    ? (lang === "de" ? spotlightPair.consequenceDE : spotlightPair.consequenceZH) ||
      (lang === "de"
        ? "Führt in der Realität zum Bruch der Modellannahme und begründet unvollkommenen Wettbewerb."
        : "现实中打破了该理想假定，导致市场处于不完全竞争状态并产生福利损失。")
    : "";

  return (
    <div className="w-full flex flex-col gap-3 font-sans text-[var(--ink)]">
      {/* 顶部指引与进度指示器 */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-[var(--line)] pb-2">
        <div>
          <div className="flex items-center gap-2">
            <span className="font-mono text-[9px] uppercase tracking-wider px-1.5 py-0.5 bg-[var(--ink)] text-[var(--paper)] font-bold">
              {lang === "de" ? "Konzept-Puzzle" : "概念机制拼图"}
            </span>
            <span className="font-mono text-xs font-semibold">
              {matchedIds.length} / {effectiveData.pairs.length}{" "}
              {lang === "de" ? "Paare gekoppelt" : "维度已配对"}
            </span>
          </div>
          <p className="text-xs text-[var(--ink-muted)] mt-1 font-serif">
            {lang === "de"
              ? effectiveData.instructionDE
              : effectiveData.instructionZH}
          </p>
        </div>

        <button
          type="button"
          onClick={handleReset}
          className="text-[10px] font-mono border border-[var(--line)] px-2 py-0.5 hover:border-[var(--ink)] bg-[var(--paper-subtle)] text-[var(--ink)] cursor-pointer shrink-0"
        >
          {lang === "de" ? "[ Neu mischen ]" : "[ 重新配对 ]"}
        </button>
      </div>

      {/* 左右双栏对应选择工作台 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
        {/* 左栏：理想模型前提 / 核心公理 */}
        <div className="flex flex-col gap-2">
          <div className="font-mono text-[10px] uppercase font-bold text-[var(--ink-muted)] border-b border-[var(--line)] pb-1 flex items-center justify-between">
            <span>
              {lang === "de"
                ? "A. Idealtypische Annahmen / Prämissen"
                : "A. 考纲理想假设 / 核心公理"}
            </span>
            <span className="text-[9px]">
              {lang === "de" ? "1. Zuerst Prämisse wählen" : "1. 先点击选择公理"}
            </span>
          </div>

          <div className="flex flex-col gap-2">
            {effectiveData.pairs.map((pair, idx) => {
              const isMatched = matchedIds.includes(pair.id);
              const isSelected = selectedLeftId === pair.id;
              const isError = mismatchError?.leftId === pair.id;
              const isHoverLinked = isMatched && hoveredPairId === pair.id;

              const leftNum = idx + 1;
              const rightIdx = shuffledRightPairs.findIndex((p) => p.id === pair.id);
              const rightLetter = rightIdx >= 0 ? String.fromCharCode(65 + rightIdx) : "?";

              let cardStyle =
                "border-[var(--line)] bg-[var(--paper)] text-[var(--ink)] hover:border-[var(--ink)]";
              if (isSelected) {
                cardStyle =
                  "border-2 border-[var(--ink)] bg-[var(--ink)] text-[var(--paper)]";
              } else if (isMatched) {
                if (isHoverLinked) {
                  cardStyle =
                    "border-2 border-[var(--ink)] bg-[var(--paper)] text-[var(--ink)] ring-1 ring-[var(--ink)] opacity-100";
                } else {
                  cardStyle =
                    "border-[var(--ink)] bg-[var(--paper-subtle)] text-[var(--ink)] opacity-75 hover:opacity-100";
                }
              } else if (isError) {
                cardStyle =
                  "border-2 border-dashed border-[var(--ink)] bg-[var(--paper-subtle)] text-[var(--ink)]";
              }

              return (
                <button
                  key={pair.id}
                  type="button"
                  disabled={isMatched}
                  onMouseEnter={() => setHoveredPairId(pair.id)}
                  onMouseLeave={() => setHoveredPairId(null)}
                  onClick={() => handleSelectLeft(pair.id)}
                  className={`p-2.5 sm:p-3 border text-left transition-all cursor-pointer flex flex-col gap-1.5 relative ${cardStyle}`}
                >
                  {/* 顶部索引与连通状态徽章 */}
                  <div className="flex items-center justify-between text-[10px] font-mono w-full">
                    <div className="flex items-center gap-1.5">
                      <span
                        className={`font-bold px-1 py-0.2 border ${
                          isSelected
                            ? "border-[var(--paper)] text-[var(--paper)] bg-transparent"
                            : "border-[var(--ink)] text-[var(--ink)] bg-[var(--paper)]"
                        }`}
                      >
                        [ {leftNum} ]
                      </span>
                      <span className="font-semibold">
                        {isMatched ? (
                          <span className="underline decoration-dotted">
                            {lang === "de"
                              ? `Gekoppelt · ${leftNum} ↔ ${rightLetter}`
                              : `连通锁定 · ${leftNum} ↔ ${rightLetter}`}
                          </span>
                        ) : isSelected ? (
                          <span>
                            {lang === "de"
                              ? "Aktiviert -> Rechts wählen"
                              : "已激活 -> 请在右栏点击破绽"}
                          </span>
                        ) : (
                          <span>
                            {lang === "de"
                              ? "Theorie-Prämisse"
                              : "理想模型公理"}
                          </span>
                        )}
                      </span>
                    </div>
                    <div className="flex items-center gap-1 font-mono text-[10px] shrink-0">
                      {isMatched ? (
                        <span className="font-bold border border-current px-1 text-[9px]">
                          ●─ {rightLetter}
                        </span>
                      ) : isSelected ? (
                        <span className="font-bold text-xs animate-pulse">▶</span>
                      ) : null}
                    </div>
                  </div>

                  {/* 第一层：权威德语学科术语 (Fachbegriff) */}
                  <div
                    className={`text-xs sm:text-sm font-bold font-sans tracking-tight leading-snug ${
                      isSelected ? "text-[var(--paper)]" : "text-[var(--ink)]"
                    }`}
                  >
                    {pair.premiseTermDE || pair.premiseDE}
                  </div>

                  {/* 第二层：双语认知释义 / 考纲语境 */}
                  <div
                    className={`text-[11px] font-serif leading-snug ${
                      isSelected
                        ? "text-[var(--paper-subtle)] opacity-90"
                        : "text-[var(--ink-muted)]"
                    }`}
                  >
                    {pair.premiseTermDE
                      ? lang === "de"
                        ? pair.premiseDE
                        : pair.premiseZH
                      : lang === "zh"
                      ? pair.premiseZH
                      : ""}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* 右栏：现实市场偏差 / 机制摩擦 */}
        <div className="flex flex-col gap-2">
          <div className="font-mono text-[10px] uppercase font-bold text-[var(--ink-muted)] border-b border-[var(--line)] pb-1 flex items-center justify-between">
            <span>
              {lang === "de"
                ? "B. Realer Bruch / Marktversagen"
                : "B. 现实市场摩擦 / 实际偏差"}
            </span>
            <span className="text-[9px]">
              {lang === "de" ? "2. Gegenüberstellen" : "2. 点击对应项配对"}
            </span>
          </div>

          <div className="flex flex-col gap-2">
            {shuffledRightPairs.map((pair, idx) => {
              const isMatched = matchedIds.includes(pair.id);
              const isSelected = selectedRightId === pair.id;
              const isError = mismatchError?.rightId === pair.id;
              const isHoverLinked = isMatched && hoveredPairId === pair.id;

              const rightLetter = String.fromCharCode(65 + idx);
              const leftIdx = effectiveData.pairs.findIndex((p) => p.id === pair.id);
              const leftNum = leftIdx >= 0 ? leftIdx + 1 : "?";

              let cardStyle =
                "border-[var(--line)] bg-[var(--paper)] text-[var(--ink)] hover:border-[var(--ink)]";
              if (isSelected) {
                cardStyle =
                  "border-2 border-[var(--ink)] bg-[var(--ink)] text-[var(--paper)]";
              } else if (isMatched) {
                if (isHoverLinked) {
                  cardStyle =
                    "border-2 border-[var(--ink)] bg-[var(--paper)] text-[var(--ink)] ring-1 ring-[var(--ink)] opacity-100";
                } else {
                  cardStyle =
                    "border-[var(--ink)] bg-[var(--paper-subtle)] text-[var(--ink)] opacity-75 hover:opacity-100";
                }
              } else if (isError) {
                cardStyle =
                  "border-2 border-dashed border-[var(--ink)] bg-[var(--paper-subtle)] text-[var(--ink)]";
              }

              return (
                <button
                  key={pair.id}
                  type="button"
                  disabled={isMatched}
                  onMouseEnter={() => setHoveredPairId(pair.id)}
                  onMouseLeave={() => setHoveredPairId(null)}
                  onClick={() => handleSelectRight(pair.id)}
                  className={`p-2.5 sm:p-3 border text-left transition-all cursor-pointer flex flex-col gap-1.5 relative ${cardStyle}`}
                >
                  {/* 顶部索引与连通状态徽章 */}
                  <div className="flex items-center justify-between text-[10px] font-mono w-full">
                    <div className="flex items-center gap-1.5">
                      <span
                        className={`font-bold px-1 py-0.2 border ${
                          isSelected
                            ? "border-[var(--paper)] text-[var(--paper)] bg-transparent"
                            : "border-[var(--ink)] text-[var(--ink)] bg-[var(--paper)]"
                        }`}
                      >
                        [ {rightLetter} ]
                      </span>
                      <span className="font-semibold">
                        {isMatched ? (
                          <span className="underline decoration-dotted">
                            {lang === "de"
                              ? `Gekoppelt · ${rightLetter} ↔ ${leftNum}`
                              : `连通锁定 · ${rightLetter} ↔ ${leftNum}`}
                          </span>
                        ) : isSelected ? (
                          <span>
                            {lang === "de"
                              ? "Aktiviert -> Links wählen"
                              : "已激活 -> 请在左栏点击假设"}
                          </span>
                        ) : (
                          <span>
                            {lang === "de"
                              ? "Realitätsbruch"
                              : "现实市场摩擦"}
                          </span>
                        )}
                      </span>
                    </div>
                    <div className="flex items-center gap-1 font-mono text-[10px] shrink-0">
                      {isMatched ? (
                        <span className="font-bold border border-current px-1 text-[9px]">
                          {leftNum} ─●
                        </span>
                      ) : isSelected ? (
                        <span className="font-bold text-xs animate-pulse">◀</span>
                      ) : null}
                    </div>
                  </div>

                  {/* 第一层：权威德语学科术语 (Fachbegriff) */}
                  <div
                    className={`text-xs sm:text-sm font-bold font-sans tracking-tight leading-snug ${
                      isSelected ? "text-[var(--paper)]" : "text-[var(--ink)]"
                    }`}
                  >
                    {pair.realityTermDE || pair.realityDE}
                  </div>

                  {/* 第二层：双语认知释义 / 考纲语境 */}
                  <div
                    className={`text-[11px] font-serif leading-snug ${
                      isSelected
                        ? "text-[var(--paper-subtle)] opacity-90"
                        : "text-[var(--ink-muted)]"
                    }`}
                  >
                    {pair.realityTermDE
                      ? lang === "de"
                        ? pair.realityDE
                        : pair.realityZH
                      : lang === "zh"
                      ? pair.realityZH
                      : ""}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* 不匹配提示提示条 */}
      {mismatchError && (
        <div className="p-2 border border-dashed border-[var(--ink)] bg-[var(--paper-subtle)] text-xs font-mono text-center animate-fadeIn">
          {lang === "de"
            ? "[ Nicht passend ] Keine Kausalübereinstimmung: Diese Prämisse passt nicht zu diesem Realitätsphänomen. Probiere es erneut."
            : "[ 未能匹配 ] 该假设项与该现实偏差并无直接传导因果。请尝试其他选项。"}
        </div>
      )}

      {/* 已配对对条目的因果推演展开区（Zero-Scroll 单卡 Spotlight 切换视图） */}
      {matchedIds.length > 0 && spotlightPair && (
        <div className="p-3 border border-[var(--line)] bg-[var(--paper-subtle)] space-y-2">
          <div className="flex flex-wrap items-center justify-between gap-1.5 border-b border-[var(--line)] pb-1.5">
            <span className="font-mono text-[10px] uppercase font-bold text-[var(--ink)]">
              [ {lang === "de" ? "Kausalketten-Spotlight (Klausur-Befund)" : "考场因果聚焦 · 机制推论"} ]
            </span>
            {/* 维度切换胶囊 */}
            <div className="flex items-center gap-1">
              {effectiveData.pairs
                .filter((p) => matchedIds.includes(p.id))
                .map((p) => {
                  const lIdx = effectiveData.pairs.findIndex((item) => item.id === p.id) + 1;
                  const rIdx = shuffledRightPairs.findIndex((item) => item.id === p.id);
                  const rLetter = rIdx >= 0 ? String.fromCharCode(65 + rIdx) : "?";
                  const isCurrent = p.id === effectiveSpotlightId;

                  return (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => setActiveSpotlightPairId(p.id)}
                      className={`text-[9px] font-mono px-1.5 py-0.5 border cursor-pointer transition-colors ${
                        isCurrent
                          ? "border-[var(--ink)] bg-[var(--ink)] text-[var(--paper)] font-bold"
                          : "border-[var(--line)] bg-[var(--paper)] text-[var(--ink-muted)] hover:border-[var(--ink)] hover:text-[var(--ink)]"
                      }`}
                    >
                      [ {lIdx} ↔ {rLetter} ]
                    </button>
                  );
                })}
            </div>
          </div>

          {/* 单卡因果聚焦，固定紧凑高度防滚屏 */}
          <div className="text-xs font-mono border-l-2 border-[var(--ink)] pl-2.5 py-1 bg-[var(--paper)] border border-[var(--line)] min-h-[50px] flex flex-col justify-center">
            <div className="flex flex-wrap items-center gap-1.5 font-bold text-[11px] text-[var(--ink)]">
              <span>
                {spotlightPair.premiseTermDE ||
                  (lang === "de" ? spotlightPair.premiseDE : spotlightPair.premiseZH)}
              </span>
              <span className="text-[var(--ink-muted)] font-normal">vs.</span>
              <span>
                {spotlightPair.realityTermDE ||
                  (lang === "de" ? spotlightPair.realityDE : spotlightPair.realityZH)}
              </span>
            </div>
            <div className="text-[11px] font-serif text-[var(--ink)] mt-0.5 leading-relaxed">
              <span className="font-mono font-bold text-[10px] text-[var(--ink-muted)] mr-1">
                {lang === "de" ? "-> Klausur-Befund:" : "-> 考场结论:"}
              </span>
              {spotlightConsequence}
            </div>
          </div>
        </div>
      )}

      {/* 全部配对完成后的宏观理论升华卡 */}
      {isAllMatched && (
        <div className="p-3.5 border-2 border-[var(--ink)] bg-[var(--paper)] animate-fadeIn space-y-1.5">
          <div className="flex items-center gap-2">
            <span className="font-mono text-[9px] uppercase font-bold px-1.5 py-0.5 bg-[var(--ink)] text-[var(--paper)]">
              {lang === "de" ? "[ KLP-Synthese ]" : "[ 考纲核心升华 ]"}
            </span>
            <span className="font-mono text-xs font-bold">
              {lang === "de"
                ? "Theoretisches Referenzmodell statt politisches Handlungsziel"
                : "理论参考基准模型而非现实政策目标"}
            </span>
          </div>
          <p className="text-xs font-serif leading-relaxed text-[var(--ink)]">
            {lang === "de"
              ? "Da in der Realität ausnahmslos alle 4 Prämissen verletzt werden (Produktdifferenzierung, Werbung, Präferenzen, Kartelle), existiert der vollkommene Markt in der Praxis nicht. Er dient der Wirtschaftswissenschaft als idealtypischer Vergleichsmaßstab (Referenzmodell), um Marktversagen zu identifizieren und staatliche Eingriffe zu begründen."
              : "由于现实中无一例外违背了这 4 大假设（存在产品差异化、品牌广告、空间个人偏好、垄断壁垒），完全竞争市场在现实中并不存在。它在经济学中的真正地位是“纯理论基准模型（Referenzmodell）”，专门用于丈量现实市场的失灵程度，为国家必要监管提供评判参照。"}
          </p>
        </div>
      )}
    </div>
  );
};
