// LectureTheatre — 互动微课幻灯画卷 (Interaktiver Folien-Stream)
// 满足用户规范与 Tufte 极简数据墨水比：
// 1. 去除“卡片套卡片”的繁冗嵌套，采用庄重大气的学术排版（Editorial Spread）
// 2. 德汉原声导语作为章节引言（Pull-Quote），自然衔接左侧互动解构与右侧考题
// 3. 侧边栏采用建筑制图级细线时间轴导航（Architectural Elevator Index）
// 4. 下方未解锁内容严禁预先渲染；答对上一节平滑自动向下滑动
import { useState } from "react";
import type { Lang } from "../../i18n";

export interface LectureCheckpoint {
  questionDE: string;
  questionZH: string;
  options: { id: string; textDE: string; textZH: string }[];
  correctId: string;
  explainDE: string;
  explainZH: string;
}

export interface LectureTheory {
  summaryDE: string;
  summaryZH: string;
  keyPointsDE: string[];
  keyPointsZH: string[];
  formulaOrRuleDE?: string;
  formulaOrRuleZH?: string;
}

export interface LectureScene {
  id: string;
  titleDE: string;
  titleZH: string;
  durationSecs?: number;
  narrationDE: string; // 德语核心原声讲解要点
  narrationZH: string; // 中文精炼速懂与考向认知
  badgeDE?: string;
  badgeZH?: string;
  theory?: LectureTheory; // 教材级深度理论剖析与机制提炼
  renderStage: (progress: number, isPlaying: boolean, lang: Lang) => React.ReactNode;
  checkpoint?: LectureCheckpoint;
}

export function LectureTheatre({
  lang,
  courseTitleDE,
  courseTitleZH,
  subject,
  scenes,
}: {
  lang: Lang;
  courseTitleDE: string;
  courseTitleZH: string;
  subject: string;
  scenes: LectureScene[];
}) {
  const de = lang === "de";
  // 记录每一幕检查点的独立作答状态
  const [answers, setAnswers] = useState<Record<number, string>>({});
  // 记录每一幕的独立重播计数键
  const [replayKeys, setReplayKeys] = useState<Record<number, number>>({});

  // Fisher-Yates 洗牌算法，用于题目选项动态随机打乱
  const shuffleOptions = (opts: { id: string; textDE: string; textZH: string }[]) => {
    const copy = [...opts];
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
  };

  // 选项随机洗牌状态：初始化时打乱每道检查点的选项顺序，杜绝固定选项位置作弊
  const [shuffledOptions, setShuffledOptions] = useState<
    Record<number, { id: string; textDE: string; textZH: string }[]>
  >(() => {
    const initial: Record<number, { id: string; textDE: string; textZH: string }[]> = {};
    scenes.forEach((sc, i) => {
      if (sc.checkpoint?.options) {
        const copy = [...sc.checkpoint.options];
        for (let j = copy.length - 1; j > 0; j--) {
          const k = Math.floor(Math.random() * (j + 1));
          [copy[j], copy[k]] = [copy[k], copy[j]];
        }
        initial[i] = copy;
      }
    });
    return initial;
  });

  const handleReplay = (idx: number) => {
    setReplayKeys((prev) => ({ ...prev, [idx]: (prev[idx] || 0) + 1 }));
    // 重播时重新洗牌该题选项，提供新鲜度
    if (scenes[idx]?.checkpoint?.options) {
      setShuffledOptions((prev) => ({
        ...prev,
        [idx]: shuffleOptions(scenes[idx].checkpoint!.options),
      }));
    }
  };

  // 顺序解锁状态：初始仅解锁第 1 幕，刚开始下面的完全不放出来
  const [unlockedIdxs, setUnlockedIdxs] = useState<number[]>(() => {
    const initial = [0];
    for (let i = 0; i < scenes.length - 1; i++) {
      if (!scenes[i].checkpoint) {
        initial.push(i + 1);
      } else {
        break;
      }
    }
    return initial;
  });

  const scrollToSlide = (idx: number) => {
    const el = document.getElementById(`slide-card-${idx}`);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleOptionSelect = (slideIdx: number, optId: string) => {
    setAnswers((prev) => ({ ...prev, [slideIdx]: optId }));
    const cp = scenes[slideIdx]?.checkpoint;
    if (cp && optId === cp.correctId) {
      const nextIdx = slideIdx + 1;
      if (nextIdx < scenes.length) {
        setUnlockedIdxs((prev) => {
          if (prev.includes(nextIdx)) return prev;
          const nextList = [...prev, nextIdx];
          let curr = nextIdx;
          while (curr < scenes.length - 1 && !scenes[curr].checkpoint) {
            curr++;
            if (!nextList.includes(curr)) nextList.push(curr);
          }
          return nextList;
        });

        // 规范：完成一个部分，自动向下滑动到刚解锁的新一节
        setTimeout(() => {
          scrollToSlide(nextIdx);
        }, 360);
      }
    }
  };

  const completedCount = scenes.filter(
    (sc, i) => sc.checkpoint && answers[i] === sc.checkpoint.correctId
  ).length;

  return (
    <div className="flex flex-col gap-8 pb-16">
      {/* 课程卷首文献抬头（静止文档流，自然随页面滚动，杜绝浮动遮挡） */}
      <header className="border-b border-[var(--line)] pb-5 pt-1">
        <div className="flex flex-wrap items-center justify-between gap-3 text-xs font-mono text-[var(--gray)] mb-2">
          <div className="flex items-center gap-2">
            <span className="rounded border border-[var(--line)] bg-[var(--surface)] px-2 py-0.5 font-bold text-[var(--ink)]">
              {subject}
            </span>
            <span>·</span>
            <span className="uppercase tracking-wider">
              {de ? "Gymnasium EF · Vertiefte Vorlesung" : "北威州高中 EF · 深度学术研讨微课"}
            </span>
          </div>
          <div className="flex items-center gap-3 text-[11px]">
            <span>{de ? "5 Kapitel · ~15 Min." : "5 大深度章节 · 约 15 分钟"}</span>
            <span className="font-bold text-[var(--ink)]">
              {de ? "Fortschritt:" : "总进度:"} {completedCount} / {scenes.length}
            </span>
          </div>
        </div>

        <h1 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-[var(--ink)] leading-snug">
          {de ? courseTitleDE : courseTitleZH}
        </h1>
        <p className="mt-2 text-xs sm:text-sm text-[var(--gray)] leading-relaxed max-w-3xl">
          {de
            ? "Eine systematische Lehrstrecke von den makroökonomischen Ursachen der Realzinsfalle über die Trennung von Giro- und Wertpapierdepot (§ 92 KAGB / GWG) bis hin zu Xetra-Orderbuchmechanismen und dem magischen Anlagedreieck."
            : "本微课涵盖德国经济学科考纲核心体系：从负利率与通胀剪刀差的宏观成因，到德国《资本投资法》（KAGB）与《反洗钱法》（GWG）监管下的存托分立体系，再到 Xetra 交易所订单簿撮合机制与投资理财不可能三角。"}
        </p>
      </header>

      {/* 主体区：双列架构（左侧连续画卷流 + 右侧极简发丝线侧面索引） */}
      <div className="flex flex-col lg:flex-row items-start gap-8 lg:gap-10">
        {/* 左侧画卷流 */}
        <div className="flex-1 min-w-0 flex flex-col gap-14 w-full">
          {scenes.map((scene, idx) => {
            const isUnlocked = unlockedIdxs.includes(idx);
            // 规范：刚开始下面的不要放出来，未解锁的完全不渲染
            if (!isUnlocked) return null;

            const userChoice = answers[idx] || null;
            const checkpoint = scene.checkpoint;
            const isAnswered = !!userChoice;
            const isCorrect = checkpoint && userChoice === checkpoint.correctId;

            return (
              <article
                key={scene.id}
                id={`slide-card-${idx}`}
                className="scroll-mt-20 border-t border-[var(--line)] pt-6 transition-all"
              >
                {/* 章节序号与眉标 */}
                <div className="flex items-center justify-between font-mono text-[11px] text-[var(--gray)] mb-2">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-[var(--ink)]">0{idx + 1}</span>
                    <span>/</span>
                    <span className="uppercase tracking-wider">
                      {de ? scene.badgeDE || "LEKTION" : scene.badgeZH || "核心章节"}
                    </span>
                  </div>
                  {scene.durationSecs && (
                    <span className="text-[10px] text-[var(--gray)]/80">
                      ~{scene.durationSecs} Sek. Lesezeit
                    </span>
                  )}
                </div>

                {/* 大标题 */}
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-[var(--ink)] tracking-tight mb-4">
                  {de ? scene.titleDE : scene.titleZH}
                </h3>

                {/* 德汉原声导语：优雅引言排版（Pullquote），自然作为章节认知导入 */}
                <div className="mb-6 rounded-r border-l-2 border-[var(--ink)] bg-[var(--paper-subtle)]/50 py-3 pl-4 pr-3">
                  <p className="font-serif text-sm sm:text-[15px] leading-relaxed text-[var(--ink)]">
                    „{scene.narrationDE}“
                  </p>
                  <p className="mt-1.5 font-sans text-xs text-[var(--gray)] leading-normal">
                    {scene.narrationZH}
                  </p>
                </div>

                {/* 深度理论讲义（Fachliche Vertiefung & Kernaussagen）：教材级系统知识点详解 */}
                {scene.theory && (
                  <div className="mb-6 rounded-lg border border-[var(--line)] bg-[var(--surface)] p-4 sm:p-5 shadow-2xs space-y-3.5">
                    <div className="flex items-center justify-between border-b border-[var(--line)]/70 pb-2">
                      <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-wider text-[var(--gray)]">
                        <span className="h-1.5 w-1.5 rounded-full bg-[var(--ink)]" />
                        <span className="font-bold text-[var(--ink)]">
                          {de ? "§ LEHRTEXT & SYSTEMATIK" : "§ 考纲理论精讲与机制剖析"}
                        </span>
                      </div>
                      <span className="font-mono text-[10px] text-[var(--gray)]">
                        {de ? "Gymnasium EF Standard" : "北威州高中经济会考标准"}
                      </span>
                    </div>

                    {/* 理论综述段落 */}
                    <p className="text-xs sm:text-[13px] leading-relaxed text-[var(--ink)] font-serif">
                      {de ? scene.theory.summaryDE : scene.theory.summaryZH}
                    </p>

                    {/* 核心要点解析列表 */}
                    <ul className="space-y-2 pt-1 border-t border-[var(--line)]/40">
                      {(de ? scene.theory.keyPointsDE : scene.theory.keyPointsZH).map((point, pIdx) => (
                        <li key={pIdx} className="flex items-start gap-2 text-xs text-[var(--ink)] leading-relaxed">
                          <span className="mt-1 flex h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--ink)]/70" />
                          <span className="text-[var(--ink)]">{point}</span>
                        </li>
                      ))}
                    </ul>

                    {/* 会考核心公式 / 判例准则条 */}
                    {(scene.theory.formulaOrRuleDE || scene.theory.formulaOrRuleZH) && (
                      <div className="mt-2 rounded border border-[var(--ink)]/20 bg-[var(--paper-subtle)] px-3 py-2 text-xs font-mono font-bold text-[var(--ink)] flex items-center justify-between flex-wrap gap-2">
                        <span className="text-[10px] text-[var(--gray)] uppercase tracking-wider">
                          {de ? "Klausur-Merksatz:" : "会考必备核心准则:"}
                        </span>
                        <span className="text-[var(--ink)]">
                          {de ? scene.theory.formulaOrRuleDE : scene.theory.formulaOrRuleZH}
                        </span>
                      </div>
                    )}
                  </div>
                )}

                {/* 双栏工作区：左 60% 互动原理解构看板 + 右 40% 思考验证 */}
                <div className="flex flex-col gap-6 lg:flex-row items-stretch">
                  {/* 左侧：原理解构与模型模拟器 */}
                  <div className="flex flex-1 flex-col justify-between rounded-lg border border-[var(--line)] bg-[var(--surface)] p-4 lg:w-[60%] shadow-2xs">
                    {/* 看板顶栏 */}
                    <div className="mb-3 flex items-center justify-between border-b border-[var(--line)]/70 pb-2 text-[11px]">
                      <div className="flex items-center gap-1.5 font-mono text-[10px] text-[var(--gray)] uppercase tracking-wider">
                        <span className="h-1.5 w-1.5 rounded-full bg-[var(--ink)]" />
                        <span>{de ? "Interaktives Modell" : "交互原理解构"}</span>
                      </div>
                      {/* 重播按钮 */}
                      <button
                        onClick={() => handleReplay(idx)}
                        className="flex items-center gap-1 rounded border border-[var(--line)] bg-[var(--paper)] px-2 py-0.5 font-mono text-[10px] text-[var(--ink)] hover:border-[var(--ink)] transition"
                        title={de ? "Animation wiederholen" : "重播模型动态演示"}
                      >
                        <span>↺</span>
                        <span>{de ? "Replay" : "重播"}</span>
                      </button>
                    </div>

                    {/* 挂载独立状态的 stage */}
                    <div key={replayKeys[idx] || 0} className="flex-1 flex flex-col justify-between">
                      {scene.renderStage(1.0, false, lang)}
                    </div>
                  </div>

                  {/* 右侧：会考考向验证题 */}
                  <div className="flex flex-col justify-between gap-4 rounded-lg border border-[var(--line)] bg-[var(--surface)] p-4 lg:w-[40%] shadow-2xs text-xs">
                    {checkpoint && (
                      <div className="flex flex-col justify-between h-full gap-3">
                        <div>
                          {/* 题目顶标 */}
                          <div className="flex items-center justify-between border-b border-[var(--line)] pb-2">
                            <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-[var(--gray)]">
                              {de ? "Verständnis-Check" : "思考与通关验证"}
                            </span>
                            {isAnswered && (
                              <span
                                className={`rounded px-2 py-0.5 font-mono text-[11px] font-bold border ${
                                  isCorrect
                                    ? "bg-emerald-100 border-emerald-300 text-emerald-950"
                                    : "bg-rose-100 border-rose-300 text-rose-950"
                                }`}
                              >
                                {isCorrect
                                  ? de
                                    ? "✓ Richtig"
                                    : "✓ 回答正确"
                                  : de
                                  ? "✕ Noch nicht korrekt"
                                  : "✕ 未答对 · 请重新选择"}
                              </span>
                            )}
                          </div>

                          {/* 题干文字 */}
                          <p className="mt-3 font-medium text-xs sm:text-[13px] leading-snug text-[var(--ink)]">
                            {de ? checkpoint.questionDE : checkpoint.questionZH}
                          </p>

                          {/* 选项组：动态随机洗牌呈现，正文始终为高对比深墨色，标号顺排 A/B/C */}
                          <div className="mt-3.5 space-y-2">
                            {(shuffledOptions[idx] || checkpoint.options).map((opt, optIdx) => {
                              const selected = userChoice === opt.id;
                              const isOptionCorrect = opt.id === checkpoint.correctId;
                              const displayLabel = `${String.fromCharCode(65 + optIdx)}.`;
                              return (
                                <button
                                  key={opt.id}
                                  onClick={() => handleOptionSelect(idx, opt.id)}
                                  className={`w-full rounded border px-3 py-2.5 text-left text-xs transition duration-150 ${
                                    selected
                                      ? isOptionCorrect
                                        ? "border-emerald-600 bg-emerald-50 text-[var(--ink)] font-semibold shadow-xs"
                                        : "border-rose-600 bg-rose-50 text-[var(--ink)] font-semibold shadow-xs"
                                      : "border-[var(--line)] bg-[var(--paper)] text-[var(--ink)] hover:border-[var(--ink)]/60"
                                  }`}
                                >
                                  <div className="flex items-start justify-between gap-2">
                                    <div className="flex items-start gap-2 min-w-0">
                                      <span
                                        className={`font-mono text-[11px] font-bold ${
                                          selected && isOptionCorrect
                                            ? "text-emerald-900"
                                            : selected && !isOptionCorrect
                                            ? "text-rose-900"
                                            : "text-[var(--gray)]"
                                        }`}
                                      >
                                        {displayLabel}
                                      </span>
                                      <span className="leading-snug text-[var(--ink)]">
                                        {de ? opt.textDE : opt.textZH}
                                      </span>
                                    </div>
                                    {selected && (
                                      <span
                                        className={`shrink-0 font-mono text-[11px] font-bold ${
                                          isOptionCorrect ? "text-emerald-900" : "text-rose-900"
                                        }`}
                                      >
                                        {isOptionCorrect ? "✓" : "✕"}
                                      </span>
                                    )}
                                  </div>
                                </button>
                              );
                            })}
                          </div>
                        </div>

                        {/* 答案采分解读 */}
                        {isAnswered && (
                          <div className="rounded border-l-2 border-[var(--ink)] bg-[var(--paper-subtle)] p-2.5 text-[11px] leading-relaxed text-[var(--ink)]">
                            <span className="font-bold text-[var(--ink)] block mb-0.5">
                              {de ? "Klausur-Erklärung:" : "会考原理解析："}
                            </span>
                            <p className="text-[var(--ink)]/90">{de ? checkpoint.explainDE : checkpoint.explainZH}</p>
                          </div>
                        )}

                        {/* 解锁反馈条：高对比深墨与深绿字，彻底告别浅绿发虚 */}
                        {isCorrect && idx + 1 < scenes.length && (
                          <div className="flex items-center justify-between rounded border border-emerald-400 bg-emerald-100/80 px-3 py-2 text-xs text-emerald-950 font-bold shadow-xs">
                            <div className="flex items-center gap-1.5">
                              <span className="flex h-4 w-4 items-center justify-center rounded-full bg-emerald-800 text-white text-[10px]">
                                ✓
                              </span>
                              <span className="text-emerald-950">
                                {de ? "Freigeschaltet" : "下一部分已解锁"}
                              </span>
                            </div>
                            <button
                              onClick={() => scrollToSlide(idx + 1)}
                              className="font-mono text-[11px] font-bold text-emerald-950 hover:text-black underline"
                            >
                              <span>{de ? "Weiter nach unten ↓" : "向下滑动查看 ↓"}</span>
                            </button>
                          </div>
                        )}

                        {/* 全剧通关 */}
                        {isCorrect && idx === scenes.length - 1 && (
                          <div className="rounded border border-emerald-400 bg-emerald-100/80 p-2 text-xs text-emerald-950 text-center font-bold shadow-xs">
                            {de
                              ? "✓ Alle 5 Lektionen erfolgreich gemeistert!"
                              : "✓ 本微课全部 5 节已全部通关掌握！"}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* 侧面导航索引：建筑制图级发丝线时间轴 (Architectural TOC Rail) */}
        <aside className="sticky top-20 hidden lg:flex w-60 shrink-0 flex-col gap-4 self-start">
          <div className="border-b border-[var(--line)] pb-3">
            <div className="flex items-center justify-between text-[10px] font-mono font-bold text-[var(--gray)] uppercase tracking-wider">
              <span>{subject} · {de ? "NAVIGATOR" : "微课导航"}</span>
              <span className="text-[var(--ink)] font-bold">{completedCount}/{scenes.length}</span>
            </div>
            <h4 className="font-serif text-xs font-bold text-[var(--ink)] leading-snug mt-1.5 line-clamp-2">
              {de ? courseTitleDE : courseTitleZH}
            </h4>
            {/* 极简进度发丝线 */}
            <div className="mt-2.5 h-[2px] w-full bg-[var(--line)]">
              <div
                className="h-full bg-[var(--ink)] transition-all duration-300"
                style={{ width: `${(completedCount / scenes.length) * 100}%` }}
              />
            </div>
          </div>

          {/* 纵向发丝连线时间轴 */}
          <nav className="relative pl-3 border-l border-[var(--line)] flex flex-col gap-4 font-mono text-xs">
            {scenes.map((sc, i) => {
              const isUnlocked = unlockedIdxs.includes(i);
              const isCompleted = sc.checkpoint && answers[i] === sc.checkpoint.correctId;
              const isCurrent = isUnlocked && !isCompleted;

              return (
                <button
                  key={sc.id}
                  onClick={() => isUnlocked && scrollToSlide(i)}
                  disabled={!isUnlocked}
                  className={`group relative flex flex-col text-left transition ${
                    !isUnlocked
                      ? "cursor-not-allowed opacity-40"
                      : "cursor-pointer hover:opacity-100"
                  }`}
                >
                  {/* 时间轴节点点标 */}
                  <span
                    className={`absolute -left-[18px] top-0.5 flex h-2.5 w-2.5 items-center justify-center rounded-full transition ${
                      isCompleted
                        ? "bg-emerald-600 ring-2 ring-[var(--paper)]"
                        : isCurrent
                        ? "bg-[var(--ink)] ring-2 ring-[var(--paper)]"
                        : "border border-[var(--line)] bg-[var(--paper)]"
                    }`}
                  />
                  <span className="text-[10px] text-[var(--gray)] group-hover:text-[var(--ink)]">
                    Kapitel 0{i + 1}
                  </span>
                  <span
                    className={`font-serif text-xs truncate max-w-[170px] ${
                      isCurrent
                        ? "font-bold text-[var(--ink)]"
                        : isCompleted
                        ? "text-[var(--ink)]"
                        : "text-[var(--gray)]"
                    }`}
                  >
                    {de ? sc.titleDE.split("—")[0].trim() : sc.titleZH.split("·")[0].trim()}
                  </span>
                </button>
              );
            })}
          </nav>
        </aside>
      </div>
    </div>
  );
}
