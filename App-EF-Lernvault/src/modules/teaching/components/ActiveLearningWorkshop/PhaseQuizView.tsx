import React, { useState, useEffect, useMemo } from "react";
import type { DistilledConcept } from "../../engine/conceptDistiller";
import type { ParsedQuestNode } from "../../engine/bookIngestParser";
import type { WorkshopQuizQuestion, WorkshopQuizResult } from "./types";

export interface PhaseQuizViewProps {
  concept: DistilledConcept;
  questNode?: ParsedQuestNode | null;
  fach: string;
  lang?: "de" | "zh";
  onQuizFinish: (result: WorkshopQuizResult) => void;
  onAdvance: () => void;
}

export const PhaseQuizView: React.FC<PhaseQuizViewProps> = ({
  concept,
  questNode,
  fach,
  lang = "de",
  onQuizFinish,
  onAdvance,
}) => {
  // 计时器状态
  const [seconds, setSeconds] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => clearInterval(timer);
  }, []);

  // 生成 4~5 道紧密贴合本课题的高质量考场真题
  const questions = useMemo<WorkshopQuizQuestion[]>(() => {
    const topic = questNode?.title || concept.topicTitle;
    const isMarket = topic.toLowerCase().includes("markt") || topic.toLowerCase().includes("preis");
    const isWahl = topic.toLowerCase().includes("wahl") || topic.toLowerCase().includes("bundestag");
    const primaryTerm = concept.klpTermini[0] || {
      termDE: topic,
      termZH: topic,
      definitionDE: "Grundlegender KLP-Begriff.",
      definitionZH: "核心考纲概念。",
    };
    const secondaryTerm = concept.klpTermini[1] || primaryTerm;
    const firstTrap = concept.fehlerquellen[0] || {
      trapTitleDE: "Verwechslung von Sachurteil und Werturteil",
      trapDescriptionDE: "Fehlende Differenzierung zwischen Effizienz und Legitimität.",
      trapDescriptionZH: "未区分事实裁决与价值裁决。",
      howToAvoidDE: "Erst Kriterien isolieren, dann gewichten.",
    };

    // Question 1: AFB I (Darstellen)
    const q1: WorkshopQuizQuestion = {
      id: "q-afb-1",
      afb: "AFB I",
      operator: "darstellen",
      promptDE: `Stellen Sie die konstitutive Begriffsbestimmung von »${primaryTerm.termDE}« nach KLP-Standards dar.`,
      promptZH: `概述考纲中对 »${primaryTerm.termZH}« 的标准学术界定。`,
      options: [
        {
          id: "q1-opt-a",
          textDE: primaryTerm.definitionDE,
          textZH: primaryTerm.definitionZH,
          isCorrect: true,
          explanationDE: `Präzise KLP-Definition: »${primaryTerm.termDE}« wird fachterminologisch exakt erfasst.`,
          explanationZH: `精准踩分点：准确界定了 »${primaryTerm.termZH}« 的学科内核。`,
        },
        {
          id: "q1-opt-b",
          textDE: `Eine umgangssprachliche Beschreibung ohne Bezug zu den Modellprämissen von ${topic}.`,
          textZH: `仅凭日常生活经验的大白话空泛描述，脱离考纲规范。`,
          isCorrect: false,
          explanationDE: "Punktabzug in AFB I: Fachbegriffe und KLP-Kriterien fehlen völlig.",
          explanationZH: "AFB I 扣分项：完全缺失学科术语与考纲界定标准。",
        },
        {
          id: "q1-opt-c",
          textDE: `Eine Verwechslung mit »${secondaryTerm.termDE}«, wodurch die Ursache-Wirkungs-Richtung invertiert wird.`,
          textZH: `与次级概念混淆，颠倒了因果前因后果。`,
          isCorrect: false,
          explanationDE: "Theoriefehler: Begriffsverwechslung im Erwartungshorizont.",
          explanationZH: "概念性错误：混淆了主客观定义。",
        },
      ],
      trapWarningDE: "Operator 'darstellen' verlangt geordnete Wiedergabe ohne eigene Wertung.",
      trapWarningZH: "指令动词 darstellen 要求客观系统呈现，不可夹杂主观抒情。",
    };

    // Question 2: AFB II (Analysieren)
    const q2: WorkshopQuizQuestion = {
      id: "q-afb-2",
      afb: "AFB II",
      operator: "analysieren",
      promptDE: isMarket
        ? "Analysieren Sie den Übertragungsmechanismus, wenn ein exogener Kostenschock das Angebot verknappt."
        : isWahl
        ? "Analysieren Sie den Einfluss von Erst- und Zweitstimme auf die Sitzverteilung im Bundestag."
        : `Analysieren Sie die Kausalkette der Einflussfaktoren auf »${topic}«.`,
      promptZH: isMarket
        ? "分析当外生供给成本骤增时，市场价格与供求量的动态传导调整机制。"
        : isWahl
        ? "分析一票直选与二票名单对联邦议院总体议席与多数分布的内在因果决定关系。"
        : `分析主导 »${topic}« 运转演进的因果传导链条。`,
      options: [
        {
          id: "q2-opt-a",
          textDE: isMarket
            ? "Angebotskurve verschiebt sich nach links -> Knappheit treibt P* hoch -> Nachfrage sinkt -> Markträumung auf neuem Niveau."
            : isWahl
            ? "Die Zweitstimme bestimmt die proportionale Gesamtsitzzahl; Erststimmen-Direktmandate werden vorrangig darauf angerechnet."
            : `Exogene Variable verändert relative Knappheiten -> Akteure passen Mengengrößen an -> Neues stabiles Gleichgewicht resultiert.`,
          textZH: isMarket
            ? "供给曲线左移 -> 稀缺推高均衡价 P* -> 需求量收缩 -> 市场在更高价位实现出清。"
            : isWahl
            ? "第二票严格决定党派总席位法定比例；第一票直选席位优先扣减入座。"
            : `关键变量引发边际条件变化 -> 理性行动者调整供给与消费决策 -> 系统演进至新稳态。`,
          isCorrect: true,
          explanationDE: "Vollständige Kausalkette nach AFB II ohne argumentative Lücken.",
          explanationZH: "满分因果链：逻辑闭环，无因果跳跃。",
        },
        {
          id: "q2-opt-b",
          textDE: isMarket
            ? "Der Staat friert sofort alle Preise ein, wodurch das Problem ohne Wohlfahrtsverlust verschwindet."
            : "Die Erststimme allein bestimmt die Kanzlermehrheit, während die Zweitstimme nur symbolisch wirkt.",
          textZH: isMarket
            ? "国家立刻统制所有物价，问题在没有任何福利净损失的情况下自动消失。"
            : "仅凭选区第一票即可决定大选胜利，第二票只是象征性补充。",
          isCorrect: false,
          explanationDE: "Fataler Theoriefehler: Widerspricht den ökonomischen/politischen Grundlagen.",
          explanationZH: "严重概念错误：严重脱离经济与宪制常识。",
        },
        {
          id: "q2-opt-c",
          textDE: "Es findet keine Marktanpassung statt, da alle Parameter völlig starr bleiben.",
          textZH: "系统不发生任何自发调整，所有参量保持静态不变。",
          isCorrect: false,
          explanationDE: "Falsche Prämisse: Dynamische Modelle basieren auf Anpassungsmechanismen.",
          explanationZH: "模型假定错误：忽略了微观主体的反应调整能力。",
        },
      ],
      trapWarningDE: "Operator 'analysieren' erfordert die Zerlegung in Elemente und kausale Zusammenhänge.",
      trapWarningZH: "指令动词 analysieren 要求解构微观要素并阐明内在逻辑机理。",
    };

    // Question 3: AFB III (Beurteilen)
    const q3: WorkshopQuizQuestion = {
      id: "q-afb-3",
      afb: "AFB III",
      operator: "beurteilen",
      promptDE: `Beurteilen Sie kriteriengeleitet die Reichweite und ethisch-ökonomische Tragfähigkeit von »${topic}«.`,
      promptZH: `基于明确标准（如效率性 vs 合法性/社会公平），评判 »${topic}« 的制度边界与现实局限。`,
      options: [
        {
          id: "q3-opt-a",
          textDE: `Differenzierte Urteilsbildung: Einerseits hohe Allokationseffizienz/Repräsentanz, andererseits Marktversagen/Verteilungsdilemmata, die sozialstaatliche Flankierung erfordern.`,
          textZH: `辩证权衡：一方面具备高度配置效率与民主代表性，另一方面存在现实失灵与公平赤字，必须辅以社会国家再分配校正。`,
          isCorrect: true,
          explanationDE: "Exzellentes Werturteil (15 NP): Trennung von Sach- und Werturteil mit dialektischer Synthese.",
          explanationZH: "15分满分价值裁决：严格区分事实与价值尺度，展现辩证综合。",
        },
        {
          id: "q3-opt-b",
          textDE: "Einseitige Verherrlichung des Modells ohne Berücksichtigung von Reibungsverlusten und Gerechtigkeitsfragen.",
          textZH: "单一肯定立场：片面强调绝对效率，无视外部性与分配正义维度。",
          isCorrect: false,
          explanationDE: "Punktabzug in AFB III: Einseitige Apologie ohne Abwägungskriterien verfehlt das Urteil.",
          explanationZH: "AFB III 严重扣分项：立场片面，缺乏标准衡量与对立面审视。",
        },
        {
          id: "q3-opt-c",
          textDE: "Pauschale Ablehnung ohne Belege und ohne Rückbezug auf die verfassungsrechtlichen Leitlinien.",
          textZH: "空泛全盘否定，无实据支撑亦无考纲标准支撑。",
          isCorrect: false,
          explanationDE: "Fehlendes Kriterium: Ein begründetes Urteil erfordert nachvollziehbare Maßstäbe.",
          explanationZH: "缺少判准：评分细则明确规定必须依据具体尺度下裁决。",
        },
      ],
      trapWarningDE: "Operator 'beurteilen' verlangt explizite Nennung von Kriterien (Effizienz, Legitimität, Gerechtigkeit).",
      trapWarningZH: "指令动词 beurteilen 必须亮出评判标准（效率、合法性、公平），严禁拍脑袋下定论。",
    };

    // Question 4: 考场陷阱辨析 (Fehlerquellen)
    const q4: WorkshopQuizQuestion = {
      id: "q-trap-check",
      afb: "AFB II",
      operator: "analysieren",
      promptDE: `Identifizieren Sie die fatale Fehlannahme in folgender Schülerantwort: »${firstTrap.trapTitleDE}«`,
      promptZH: `敏锐识别以下考场高频扣分错答中的致命认知漏洞：»${firstTrap.trapTitleDE}«`,
      options: [
        {
          id: "q4-opt-a",
          textDE: firstTrap.trapDescriptionDE,
          textZH: firstTrap.trapDescriptionZH,
          isCorrect: true,
          explanationDE: `Treffer: ${firstTrap.howToAvoidDE}`,
          explanationZH: `正中靶心！正确规避路径：${firstTrap.howToAvoidDE}`,
        },
        {
          id: "q4-opt-b",
          textDE: "Die Schülerantwort ist fachlich perfekt und verdient 15 Notenpunkte ohne Beanstandung.",
          textZH: "该作答毫无破绽，在会考中应直接判满分 15 分。",
          isCorrect: false,
          explanationDE: "Falsche Einschätzung: Diese Argumentation führt zu massivem Punktabzug.",
          explanationZH: "误判：该观点在考场评分细则中会导致严重失分。",
        },
      ],
      trapWarningDE: "Achte auf fehlende Kausalketten und logische Widersprüche.",
      trapWarningZH: "注意排查偷换概念与因果链条断裂。",
    };

    // Question 5: 15 NP 核心考句匹配
    const q5: WorkshopQuizQuestion = {
      id: "q-15np-muster",
      afb: "AFB III",
      operator: concept.klausurSatz15NP.operator,
      promptDE: `Welcher Musterbaustein erfüllt den 15-NP-Erwartungshorizont für ${topic} am präzisesten?`,
      promptZH: `哪项德语论述最精准符合 15 NP 会考标答评分细则？`,
      options: [
        {
          id: "q5-opt-a",
          textDE: `»${concept.klausurSatz15NP.musterSatzDE}«`,
          textZH: `»${concept.klausurSatz15NP.explanationZH}«`,
          isCorrect: true,
          explanationDE: "Volle Punktzahl (15 NP): Alle KLP-Schlagwörter und die geforderte Operatoren-Tiefe enthalten.",
          explanationZH: "15分满分踩分句：完美嵌入考纲关键词与指令动词深度要求。",
        },
        {
          id: "q5-opt-b",
          textDE: `»${topic} ist ein Thema in der Schule, zu dem es verschiedene Meinungen gibt.«`,
          textZH: `»${topic} 是教科书上的一个议题，大家各有看法。«`,
          isCorrect: false,
          explanationDE: "0 Notenpunkte: Banaler Allgemeinplatz ohne wissenschaftlichen Gehalt.",
          explanationZH: "0 分作答：空泛套话，毫无学术学科含金量。",
        },
      ],
      trapWarningDE: "15-NP-Sätze zeichnen sich durch präzise Fachsprache und logische Dichte aus.",
      trapWarningZH: "15 分考句具备严密逻辑密度与学术术语规范。",
    };

    return [q1, q2, q3, q4, q5];
  }, [concept, fach]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [isAnswerChecked, setIsAnswerChecked] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [earnedScore, setEarnedScore] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [mistakes, setMistakes] = useState<string[]>([]);
  const [isQuizComplete, setIsQuizComplete] = useState(false);

  const currentQuestion = questions[currentIndex];

  const handleSelectOption = (optId: string) => {
    if (isAnswerChecked) return;
    setSelectedOptionId(optId);
  };

  const handleCheckAnswer = () => {
    if (!selectedOptionId || isAnswerChecked) return;
    const selectedOpt = currentQuestion.options.find((o) => o.id === selectedOptionId);
    if (!selectedOpt) return;

    setIsAnswerChecked(true);
    if (selectedOpt.isCorrect) {
      setIsCorrect(true);
      setEarnedScore((prev) => prev + 20);
      setCorrectCount((prev) => prev + 1);
    } else {
      setIsCorrect(false);
      setMistakes((prev) => [
        ...prev,
        `${currentQuestion.afb} (${currentQuestion.operator}): ${selectedOpt.textDE}`,
      ]);
    }
  };

  const handleNextQuestion = () => {
    if (currentIndex + 1 < questions.length) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOptionId(null);
      setIsAnswerChecked(false);
      setIsCorrect(false);
    } else {
      setIsQuizComplete(true);
      const result: WorkshopQuizResult = {
        score: earnedScore + (isCorrect ? 0 : 0),
        totalQuestions: questions.length,
        correctCount: correctCount,
        mistakes: mistakes,
        timeSpentSeconds: seconds,
      };
      onQuizFinish(result);
    }
  };

  return (
    <div className="flex flex-col gap-6 w-full max-w-5xl mx-auto">
      {/* 顶部阶段信息与题数 HUD */}
      <header className="border-b border-[var(--line)] pb-4 space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="font-mono text-[10px] uppercase tracking-wider px-2 py-0.5 bg-[var(--ink)] text-[var(--paper)] font-bold">
              {lang === "de" ? "Phase 4: Klausur-Drill" : "阶段 4 · 刷题挑战与即时自测"}
            </span>
            <span className="font-mono text-xs px-2 py-0.5 border border-[var(--line)] text-[var(--ink-muted)]">
              {fach} · AFB I - III
            </span>
          </div>

          <div className="flex items-center gap-3 font-mono text-xs">
            <span className="text-[var(--ink-muted)]">
              {lang === "de" ? "Zeit: " : "耗时: "}
              <strong className="text-[var(--ink)]">{Math.floor(seconds / 60)}:{(seconds % 60).toString().padStart(2, "0")}</strong>
            </span>
            <span className="px-2 py-0.5 border border-[var(--line)] bg-[var(--paper-subtle)] font-bold">
              +{earnedScore} XP
            </span>
            <span className="font-bold border border-[var(--ink)] px-2 py-0.5 bg-[var(--ink)] text-[var(--paper)]">
              {currentIndex + 1} / {questions.length}
            </span>
          </div>
        </div>

        {/* 细发丝线答题进度条 */}
        <div className="w-full h-1 border border-[var(--line)] bg-[var(--paper-subtle)]">
          <div
            className="h-full bg-[var(--ink)] transition-all duration-300"
            style={{ width: `${((currentIndex + (isAnswerChecked ? 1 : 0)) / questions.length) * 100}%` }}
          />
        </div>
      </header>

      {/* 自测题卡片 */}
      {!isQuizComplete ? (
        <main className="border border-[var(--line)] p-4 sm:p-6 bg-[var(--paper)] space-y-5">
          {/* 设问指示与 Operator 徽章 */}
          <div className="flex items-center justify-between pb-2 border-b border-[var(--line)]">
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-bold px-2 py-0.5 border border-[var(--ink)] bg-[var(--paper-subtle)]">
                {currentQuestion.afb}
              </span>
              <span className="font-mono text-xs font-bold uppercase text-[var(--ink)]">
                Operator: {currentQuestion.operator}
              </span>
            </div>
            <span className="font-mono text-[10px] text-[var(--ink-muted)]">
              Standard-Klausur
            </span>
          </div>

          {/* 题目设问 */}
          <div className="space-y-1">
            <h3 className="text-base sm:text-lg font-bold text-[var(--ink)] tracking-tight leading-snug">
              {currentQuestion.promptDE}
            </h3>
            <p className="text-xs font-serif text-[var(--ink-muted)] leading-relaxed">
              {currentQuestion.promptZH}
            </p>
          </div>

          {/* 选项组 */}
          <div className="flex flex-col gap-2.5 pt-2">
            {currentQuestion.options.map((opt, optIdx) => {
              const isSelected = selectedOptionId === opt.id;
              let style = "border-[var(--line)] bg-[var(--paper)] hover:border-[var(--ink)]";

              if (isAnswerChecked) {
                if (opt.isCorrect) {
                  style = "border-2 border-[var(--ink)] bg-[var(--paper-subtle)] font-medium ring-1 ring-[var(--ink)]";
                } else if (isSelected && !opt.isCorrect) {
                  style = "border-dashed border-2 border-[var(--ink)] bg-[var(--paper-subtle)] opacity-70";
                }
              } else if (isSelected) {
                style = "border-2 border-[var(--ink)] bg-[var(--paper-subtle)] font-medium";
              }

              return (
                <button
                  key={opt.id}
                  type="button"
                  disabled={isAnswerChecked}
                  onClick={() => handleSelectOption(opt.id)}
                  className={`p-3.5 border text-left text-xs leading-relaxed transition-all cursor-pointer flex items-start gap-3 ${style}`}
                >
                  <span
                    className={`font-mono text-[10px] px-1.5 py-0.5 border mt-0.5 shrink-0 ${
                      isSelected
                        ? "bg-[var(--ink)] text-[var(--paper)] border-[var(--ink)]"
                        : "bg-[var(--paper)] text-[var(--ink)] border-[var(--line)]"
                    }`}
                  >
                    [{optIdx + 1}]
                  </span>
                  <div className="flex-1 space-y-1">
                    <div className="font-serif text-xs sm:text-sm text-[var(--ink)] leading-snug">
                      {opt.textDE}
                    </div>
                    {opt.textZH && (
                      <div className="font-serif text-[11px] text-[var(--ink-muted)]">
                        {opt.textZH}
                      </div>
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          {/* 核验后的深度讲评与评分细则指示 */}
          {isAnswerChecked && (
            <div className="p-4 border-2 border-[var(--ink)] bg-[var(--paper)] space-y-2 animate-fadeIn">
              <div className="flex items-center justify-between pb-1.5 border-b border-[var(--line)]">
                <span className="font-mono text-xs font-bold uppercase tracking-wider text-[var(--ink)]">
                  {isCorrect
                    ? (lang === "de" ? "[OK] Richtig gelöst · Volle Punktzahl" : "[OK] 作答正确 · 斩获满分踩分")
                    : (lang === "de" ? "[X] Abweichung vom Erwartungshorizont" : "[X] 未完全切中评分细则")}
                </span>
                <span className="font-mono text-[10px] text-[var(--ink-muted)]">
                  {isCorrect ? "+20 XP" : "+0 XP (Lerneffekt gesichert)"}
                </span>
              </div>

              {/* 考官讲评 */}
              <div className="text-xs sm:text-sm font-serif text-[var(--ink)] leading-relaxed">
                {currentQuestion.options.find((o) => o.id === selectedOptionId)?.explanationDE}
              </div>
              <div className="text-[11px] font-serif text-[var(--ink-muted)] leading-relaxed">
                {currentQuestion.options.find((o) => o.id === selectedOptionId)?.explanationZH}
              </div>

              {/* 避坑指南提示 */}
              {currentQuestion.trapWarningDE && (
                <div className="text-[10px] font-mono text-[var(--ink)] pt-1.5 border-t border-[var(--line)]">
                  <span className="font-bold">
                    {lang === "de" ? "Operatoren-Hinweis: " : "动词与审题指引: "}
                  </span>
                  {lang === "de" ? currentQuestion.trapWarningDE : currentQuestion.trapWarningZH}
                </div>
              )}
            </div>
          )}

          {/* 底部判分 / 推进操作 */}
          <div className="pt-2 flex justify-end gap-3">
            {!isAnswerChecked ? (
              <button
                type="button"
                disabled={!selectedOptionId}
                onClick={handleCheckAnswer}
                className="px-5 py-2 border-2 border-[var(--ink)] bg-[var(--ink)] text-[var(--paper)] hover:bg-[var(--paper)] hover:text-[var(--ink)] disabled:opacity-40 disabled:cursor-not-allowed font-mono text-xs font-bold transition-colors cursor-pointer"
              >
                {lang === "de" ? "Antwort prüfen" : "提交核验判分"}
              </button>
            ) : (
              <button
                type="button"
                onClick={handleNextQuestion}
                className="px-5 py-2 border-2 border-[var(--ink)] bg-[var(--ink)] text-[var(--paper)] hover:bg-[var(--paper)] hover:text-[var(--ink)] font-mono text-xs font-bold transition-colors cursor-pointer flex items-center gap-2"
              >
                <span>
                  {currentIndex + 1 < questions.length
                    ? (lang === "de" ? "Nächste Aufgabe" : "下一道题目")
                    : (lang === "de" ? "Abschließen & zur Meisterschaft" : "完成自测 · 进入掌握度结算")}
                </span>
                <span aria-hidden="true">{"->"}</span>
              </button>
            )}
          </div>
        </main>
      ) : (
        /* 测试完成结算看板 */
        <main className="border border-[var(--line)] p-6 bg-[var(--paper)] space-y-6 text-center">
          <div className="space-y-2">
            <span className="font-mono text-xs uppercase font-bold tracking-widest text-[var(--ink-muted)]">
              [ Klausur-Drill Resultat ]
            </span>
            <h3 className="text-2xl font-bold tracking-tight text-[var(--ink)]">
              {lang === "de" ? "Drill-Einheit erfolgreich absolviert" : "刷题挑战自测达成"}
            </h3>
          </div>

          <div className="grid grid-cols-3 gap-3 max-w-md mx-auto font-mono text-center">
            <div className="p-3 border border-[var(--line)] bg-[var(--paper-subtle)]">
              <div className="text-[10px] text-[var(--ink-muted)]">RICHTIG</div>
              <div className="text-xl font-bold">{correctCount} / {questions.length}</div>
            </div>
            <div className="p-3 border border-[var(--line)] bg-[var(--paper-subtle)]">
              <div className="text-[10px] text-[var(--ink-muted)]">XP ERZIELT</div>
              <div className="text-xl font-bold">+{earnedScore}</div>
            </div>
            <div className="p-3 border border-[var(--line)] bg-[var(--paper-subtle)]">
              <div className="text-[10px] text-[var(--ink-muted)]">ZEIT</div>
              <div className="text-xl font-bold">{Math.floor(seconds / 60)}:{(seconds % 60).toString().padStart(2, "0")}</div>
            </div>
          </div>

          <button
            type="button"
            onClick={onAdvance}
            className="px-6 py-2.5 border-2 border-[var(--ink)] bg-[var(--ink)] text-[var(--paper)] hover:bg-[var(--paper)] hover:text-[var(--ink)] font-mono text-xs font-bold tracking-tight transition-colors cursor-pointer inline-flex items-center gap-2"
          >
            <span>{lang === "de" ? "Weiter zur Phase 5: Meisterschafts-Auswertung" : "推进至阶段 5 · 掌握度结算"}</span>
            <span aria-hidden="true">{"->"}</span>
          </button>
        </main>
      )}
    </div>
  );
};
