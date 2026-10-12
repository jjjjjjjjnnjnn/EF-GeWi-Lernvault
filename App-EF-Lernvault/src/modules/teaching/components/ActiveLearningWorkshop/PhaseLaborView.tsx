import React, { useState, useMemo } from "react";
import type { DistilledConcept } from "../../engine/conceptDistiller";
import type { ParsedQuestNode } from "../../engine/bookIngestParser";
import { KinematikSim } from "../../../../components/pedagogy/KinematikSim";
import { MagischesViereckSim } from "../../../../components/pedagogy/MagischesViereckSim";
import {
  MarktgleichgewichtSim,
  DilemmaBalanceScale,
  ScenarioDecisionTree,
  KonzeptPuzzle,
  VariableSliderBox,
  resolveDecisionScenarioId,
} from "../GenericMicroWorlds";

export interface PhaseLaborViewProps {
  concept: DistilledConcept;
  questNode?: ParsedQuestNode | null;
  fach: string;
  lang?: "de" | "zh";
  onExploreComplete?: (finding: string) => void;
  onAdvance: () => void;
}

type AvailableSimType =
  | "markt"
  | "kinematik"
  | "viereck"
  | "dilemma"
  | "scenario"
  | "puzzle"
  | "slider";

export const PhaseLaborView: React.FC<PhaseLaborViewProps> = ({
  concept,
  questNode,
  fach,
  lang = "de",
  onExploreComplete,
  onAdvance,
}) => {
  // 根据学科和课题内容自动匹配最契合的仿真工具
  const defaultSimType = useMemo<AvailableSimType>(() => {
    const title = (questNode?.title || concept.topicTitle || "").toLowerCase();
    const qType = questNode?.interactiveType || "";

    if (qType === "markt-sim" || title.includes("markt") || title.includes("preis") || title.includes("angebot")) {
      return "markt";
    }
    if (fach.toLowerCase() === "physik" || title.includes("kinematik") || title.includes("bewegung") || title.includes("beschleunigung")) {
      return "kinematik";
    }
    if (title.includes("viereck") || title.includes("wirtschaftspolitik") || title.includes("stabilitat") || title.includes("konjunktur")) {
      return "viereck";
    }
    if (title.includes("ethik") || title.includes("dilemma") || title.includes("gerechtigkeit") || title.includes("rawls") || title.includes("kant")) {
      return "dilemma";
    }
    if (title.includes("wahl") || title.includes("bundestag") || title.includes("entscheidung")) {
      return "scenario";
    }
    if (concept.konzeptPuzzle) {
      return "puzzle";
    }
    return "slider";
  }, [questNode, concept, fach]);

  const [activeSimType, setActiveSimType] = useState<AvailableSimType>(defaultSimType);
  const [userObservationNote, setUserObservationNote] = useState("");
  const [isObservationRecorded, setIsObservationRecorded] = useState(false);

  // 探究指引 (Missionsleitfaden)
  const missionGuide = useMemo(() => {
    switch (activeSimType) {
      case "markt":
        return {
          questionDE: "Wie reagiert das Marktgleichgewicht (P*, q*) auf exogene Schocks (z.B. Kältewelle oder Kostenschock)?",
          questionZH: "当发生外生供给冲击（如寒潮与原材料涨价）时，市场出清价量 (P*, q*) 如何动态重新收敛？",
          guidanceDE: [
            "1. Nullmessung: Betrachte das Ausgangsgleichgewicht bei Normalbedingungen.",
            "2. Schock-Simulation: Verschiebe den Angebotsregler nach links (Verknappung).",
            "3. Beobachtung: Registriere den Preisanstieg und den Mengenrückgang bis zum Schnittpunkt.",
          ],
          guidanceZH: [
            "1. 基准状态：记录常态下的初始供求交叉点 (P*=10€, Q*=100)；",
            "2. 冲击施加：向左拖动供给曲线滑块模拟成本骤增（供给收缩）；",
            "3. 规律总结：观察新均衡点如何自发出清，验证价格信号功能。",
          ],
        };
      case "kinematik":
        return {
          questionDE: "Welcher funktionale Zusammenhang besteht zwischen konstanter Beschleunigung a, Geschwindigkeit v(t) und Weg s(t)?",
          questionZH: "在匀加速直线运动中，加速度 a、瞬时速度 v(t) 与位移 s(t) 呈现何种精确函数关系？",
          guidanceDE: [
            "1. Parameterwahl: Wähle Startgeschwindigkeit v0 und konstante Beschleunigung a.",
            "2. Start des Zeitablaufs: Starte die Animation und beobachte die s(t)-Parabel im t-Intervall.",
            "3. Formelableitung: Verifiziere das Weg-Zeit-Gesetz: s(t) = s0 + v0*t + 0.5*a*t².",
          ],
          guidanceZH: [
            "1. 参量设定：设定初速度 v0 与恒定加速度 a；",
            "2. 时间推进：启动计时器，观察位移曲线呈现二次抛物线走势；",
            "3. 公式印证：验证高中物理第一核心定律 s(t) = s0 + v0*t + 0.5*a*t²。",
          ],
        };
      case "viereck":
        return {
          questionDE: "Welche Zielkonflikte (z.B. Phillipskurve: Inflation vs. Beschäftigung) treten im Magischen Viereck auf?",
          questionZH: "宏观调控的“魔术四角”各目标间存在何种不可兼得的冲突权衡（如通胀与就业的菲利普斯曲线）？",
          guidanceDE: [
            "1. Ausganszustand: Prüfe das Viereck bei stabiler Zins- und Fiskalpolitik.",
            "2. Fiskalischer Stimulus: Erhöhe die Staatsausgaben und beobachte BIP-Wachstum und Inflation.",
            "3. Zielkompromiss: Identifiziere die unvermeidliche Spannung zwischen Vollbeschäftigung und Preisstabilität.",
          ],
          guidanceZH: [
            "1. 稳态基准：查看基准利率与财政预算平衡时的四角覆盖面积；",
            "2. 扩张刺激：调高政府支出，观察经济增长与就业改善的同时通胀如何攀升；",
            "3. 考场权衡：掌握稳增长与抗通胀之间典型的宏观调控两难。",
          ],
        };
      case "dilemma":
        return {
          questionDE: "Wie gewichten Utilitarismus und Deontologie konkurrierende ethische Handlungsoptionen?",
          questionZH: "在伦理两难抉择中，功利主义（后果论）与康德义务论（道德律）如何分配裁决天平的权重？",
          guidanceDE: [
            "1. Dilemma formulieren: Setze moralische Prämissen auf beide Waagschalen.",
            "2. Kriterienanalyse: Prüfe Nutzenmaximierung vs. Verallgemeinerbarkeit des Maxims.",
            "3. Fazit für AFB III: Formuliere ein kriteriengeleitetes ethisches Sachurteil.",
          ],
          guidanceZH: [
            "1. 天平两端：将后果效用与绝对道德诫命置于天平两侧；",
            "2. 标准辨析：比较最大多数人的幸福与人作为目的不可物化的准则；",
            "3. 会考落笔：提炼 AFB III 必备的价值评判论据。",
          ],
        };
      default:
        return {
          questionDE: `Welche Systemdynamik steuert die Gesetzmäßigkeit von ${concept.topicTitle}?`,
          questionZH: `哪些系统变量直接主导了 ${concept.topicTitle} 的演进规律？`,
          guidanceDE: [
            "1. Systemparameter variieren.",
            "2. Ursache-Wirkungs-Zusammenhang isolieren.",
            "3. KLP-Aussage für die Klausur sichern.",
          ],
          guidanceZH: [
            "1. 调控关键输入变量；",
            "2. 隔离出单一因果传导关系；",
            "3. 锁定考场标准推导结论。",
          ],
        };
    }
  }, [activeSimType, concept.topicTitle]);

  const handleSaveObservation = () => {
    if (!userObservationNote.trim()) return;
    setIsObservationRecorded(true);
    if (onExploreComplete) {
      onExploreComplete(userObservationNote);
    }
  };

  return (
    <div className="flex flex-col gap-6 w-full max-w-5xl mx-auto">
      {/* 顶部阶段信息与仿真教具选择器 */}
      <header className="border-b border-[var(--line)] pb-4 space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="font-mono text-[10px] uppercase tracking-wider px-2 py-0.5 bg-[var(--ink)] text-[var(--paper)] font-bold">
              {lang === "de" ? "Phase 2: Interaktives Labor" : "阶段 2 · 仿真探究与参数实验"}
            </span>
            <span className="font-mono text-xs px-2 py-0.5 border border-[var(--line)] text-[var(--ink-muted)]">
              {fach} · Empirische Exploration
            </span>
          </div>

          {/* 仿真实验快速切换器 */}
          <div className="flex items-center gap-1">
            <span className="text-[10px] font-mono text-[var(--ink-muted)]">
              {lang === "de" ? "Labor-Modell: " : "仿真实验: "}
            </span>
            <select
              value={activeSimType}
              onChange={(e) => setActiveSimType(e.target.value as AvailableSimType)}
              aria-label={lang === "de" ? "Labor-Modell wählen" : "选择仿真教具"}
              className="font-mono text-xs px-2 py-0.5 border border-[var(--line)] bg-[var(--paper-subtle)] text-[var(--ink)] focus:outline-none cursor-pointer"
            >
              <option value="markt">Marktgleichgewicht-Sim (SoWi)</option>
              <option value="viereck">Magisches Viereck (SoWi)</option>
              <option value="kinematik">Kinematik-Sim (Physik)</option>
              <option value="dilemma">Ethik-Waage (Philosophie)</option>
              <option value="scenario">Entscheidungsbaum (Wahlsystem)</option>
              {concept.konzeptPuzzle && <option value="puzzle">Konzept-Puzzle</option>}
              <option value="slider">Variablen-Labor (Allgemein)</option>
            </select>
          </div>
        </div>

        <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-[var(--ink)]">
          {concept.topicTitle} · {lang === "de" ? "Labor-Werkstatt" : "动态探究实验台"}
        </h2>
      </header>

      {/* 1. 探究指引栏 (Missionsleitfaden) */}
      <section className="border border-[var(--line)] p-4 bg-[var(--paper-subtle)] space-y-3">
        <div className="flex items-center justify-between pb-1.5 border-b border-[var(--line)]">
          <span className="font-mono text-xs font-bold uppercase tracking-wider text-[var(--ink)]">
            {lang === "de" ? "[ Forschungsfrage & Missionsleitfaden ]" : "[ 核心探究设问与实验步骤 ]"}
          </span>
          <span className="font-mono text-[10px] text-[var(--ink-muted)]">
            Gymnasium EF/Q1 Standard
          </span>
        </div>

        <div className="font-serif text-sm font-bold text-[var(--ink)] border-l-2 border-[var(--ink)] pl-3 py-0.5">
          {lang === "de" ? missionGuide.questionDE : missionGuide.questionZH}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1">
          {(lang === "de" ? missionGuide.guidanceDE : missionGuide.guidanceZH).map((step, idx) => (
            <div
              key={idx}
              className="p-2.5 border border-[var(--line)] bg-[var(--paper)] text-[11px] font-mono leading-relaxed"
            >
              {step}
            </div>
          ))}
        </div>
      </section>

      {/* 2. 嵌入式仿真教具真实渲染区 */}
      <section className="border border-[var(--line)] p-4 sm:p-5 bg-[var(--paper)]">
        {activeSimType === "markt" && (
          <MarktgleichgewichtSim
            lang={lang}
            scenarioId="kaelte"
            onMissionComplete={() => setIsObservationRecorded(true)}
          />
        )}

        {activeSimType === "kinematik" && (
          <KinematikSim
            lang={lang}
            onFormulaGenerated={(finding) => {
              setUserObservationNote(finding);
              setIsObservationRecorded(true);
            }}
          />
        )}

        {activeSimType === "viereck" && (
          <MagischesViereckSim lang={lang} />
        )}

        {activeSimType === "dilemma" && (
          <DilemmaBalanceScale title={concept.topicTitle} lang={lang} />
        )}

        {activeSimType === "scenario" && (
          <ScenarioDecisionTree
            title={concept.topicTitle}
            lang={lang}
            scenarioId={resolveDecisionScenarioId(concept.topicTitle, questNode?.summary || "")}
          />
        )}

        {activeSimType === "puzzle" && concept.konzeptPuzzle && (
          <KonzeptPuzzle
            puzzleData={concept.konzeptPuzzle}
            title={concept.topicTitle}
            lang={lang}
            fach={fach}
            onAllMatched={() => setIsObservationRecorded(true)}
          />
        )}

        {activeSimType === "slider" && (
          <VariableSliderBox title={concept.topicTitle} lang={lang} />
        )}
      </section>

      {/* 3. 探究记录与假设验证结论 */}
      <section className="border border-[var(--line)] p-4 bg-[var(--paper-subtle)] space-y-3">
        <div className="flex items-center justify-between pb-1 border-b border-[var(--line)]">
          <span className="font-mono text-xs font-bold uppercase tracking-wider text-[var(--ink)]">
            {lang === "de" ? "[ Empirische Forschungsnotiz ]" : "[ 实验观察与推论记录 ]"}
          </span>
          <span className="font-mono text-[10px] text-[var(--ink-muted)]">
            {isObservationRecorded
              ? (lang === "de" ? "[OK] Protokolliert" : "[OK] 已留存记录")
              : (lang === "de" ? "Ausstehend" : "待记录")}
          </span>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
          <input
            type="text"
            value={userObservationNote}
            onChange={(e) => setUserObservationNote(e.target.value)}
            placeholder={
              lang === "de"
                ? "z.B. Preisanstieg führt zu Nachfragerückgang; Markt räumt bei neuem P*..."
                : "记录你的探究发现：例如供给曲线左移导致价格攀升、新的均衡自发出清..."
            }
            className="flex-1 font-mono text-xs px-3 py-2 border border-[var(--line)] bg-[var(--paper)] text-[var(--ink)] focus:outline-none focus:border-[var(--ink)]"
          />
          <button
            type="button"
            onClick={handleSaveObservation}
            className="px-3 py-2 border border-[var(--ink)] bg-[var(--paper)] hover:bg-[var(--paper-subtle)] text-xs font-mono font-bold transition-colors cursor-pointer shrink-0"
          >
            {lang === "de" ? "Befund sichern" : "保存发现"}
          </button>
        </div>
      </section>

      {/* 4. 底部推进操作 */}
      <footer className="border-t border-[var(--line)] pt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="text-xs font-mono text-[var(--ink-muted)]">
          {lang === "de"
            ? "Phase 2 abgeschlossen: Parameter experimentell erforscht."
            : "阶段 2 探究完成：模型动力学与参数规律已由实验印证。"}
        </div>

        <button
          type="button"
          onClick={onAdvance}
          className="px-4 py-2 border-2 border-[var(--ink)] bg-[var(--ink)] text-[var(--paper)] hover:bg-[var(--paper)] hover:text-[var(--ink)] font-mono text-xs font-bold tracking-tight transition-colors cursor-pointer flex items-center justify-center gap-2"
        >
          <span>{lang === "de" ? "Weiter zur Phase 3: KLP-Wissensnotiz" : "进入阶段 3 · 笔记精练"}</span>
          <span aria-hidden="true">{"->"}</span>
        </button>
      </footer>
    </div>
  );
};
