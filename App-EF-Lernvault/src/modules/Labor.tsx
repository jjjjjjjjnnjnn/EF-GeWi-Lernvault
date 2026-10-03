import { EthikWaageSim } from "../components/pedagogy/EthikWaageSim";
import { MagischesViereckSim } from "../components/pedagogy/MagischesViereckSim";
import { useState, useMemo } from "react";
import type { Lang } from "../i18n";
import { EnergySkateParkSim } from "../components/pedagogy/EnergySkateParkSim";
import { PendulumLabSim } from "../components/pedagogy/PendulumLabSim";
import { ProjectileMotionSim } from "../components/pedagogy/ProjectileMotionSim";
import { BuoyancyDensitySim } from "../components/pedagogy/BuoyancyDensitySim";
import { CoulombLawSim } from "../components/pedagogy/CoulombLawSim";
import { SpringPendulumSim } from "../components/pedagogy/SpringPendulumSim";
import { CircuitOhmSim } from "../components/pedagogy/CircuitOhmSim";
import { OpticsRefractionSim } from "../components/pedagogy/OpticsRefractionSim";
import { GasPropertiesSim } from "../components/pedagogy/GasPropertiesSim";
import { StatesMatterSim } from "../components/pedagogy/StatesMatterSim";
import { HydroPressureSim } from "../components/pedagogy/HydroPressureSim";
import { DiffusionSim } from "../components/pedagogy/DiffusionSim";
import { PhotoelectricSim } from "../components/pedagogy/PhotoelectricSim";
import { RutherfordSim } from "../components/pedagogy/RutherfordSim";
import { HydrogenAtomSim } from "../components/pedagogy/HydrogenAtomSim";
import { BlackbodySim } from "../components/pedagogy/BlackbodySim";
import { MoleculeShapeSim } from "../components/pedagogy/MoleculeShapeSim";
import { ConcentrationSim } from "../components/pedagogy/ConcentrationSim";
import { ProbabilitySim } from "../components/pedagogy/ProbabilitySim";
import { MembraneSim } from "../components/pedagogy/MembraneSim";
import { NeuronSim } from "../components/pedagogy/NeuronSim";
import { VectorAdditionSim } from "../components/pedagogy/VectorAdditionSim";
import { TitrationSimulator } from "../components/pedagogy/TitrationSimulator";
import { GleichgewichtSimulator } from "../components/pedagogy/GleichgewichtSimulator";
import { OsmoseSimulator } from "../components/pedagogy/OsmoseSimulator";
import { KinematikSim } from "../components/pedagogy/KinematikSim";
import { SchiefeEbeneSim } from "../components/pedagogy/SchiefeEbeneSim";
import { CollisionLabSim } from "../components/pedagogy/CollisionLabSim";
import { LeverBalanceSim } from "../components/pedagogy/LeverBalanceSim";
import { HookeLawSim } from "../components/pedagogy/HookeLawSim";
import { FrictionMicroSim } from "../components/pedagogy/FrictionMicroSim";
import { BoxOptimizerSim } from "../components/pedagogy/BoxOptimizerSim";
import { TangentSlider } from "../components/pedagogy/TangentSlider";
import { MarktMechanismusSim } from "../components/pedagogy/MarktMechanismusSim";
import { GiniAllocatorSim } from "../components/pedagogy/GiniAllocatorSim";
import { BalanceBoard } from "../components/pedagogy/BalanceBoard";
import { WaveInterferenceLabSim } from "../components/pedagogy/WaveInterferenceLabSim";
import { OpticsLensSim } from "../components/pedagogy/OpticsLensSim";
import { ChargesFieldsSim } from "../components/pedagogy/ChargesFieldsSim";
import { FaradayInductionSim } from "../components/pedagogy/FaradayInductionSim";
import { WaveStringSim } from "../components/pedagogy/WaveStringSim";
import { GravityOrbitSim } from "../components/pedagogy/GravityOrbitSim";
import {
  type LaborSimId,
  type SimEntry,
  SIMULATION_REGISTRY,
} from "./laborRegistry";

export type { LaborSimId, SimEntry };

export interface LaborProps {
  lang: Lang;
  onDiscussInTutor?: (prompt: string) => void;
}

export function Labor({ lang, onDiscussInTutor }: LaborProps) {
  const [activeSimId, setActiveSimId] = useState<LaborSimId | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [fachFilter, setFachFilter] = useState<string>("alle");
  const [isStudioExpanded, setIsStudioExpanded] = useState<boolean>(true);

  // Filtered simulations
  const filteredSims = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return SIMULATION_REGISTRY.filter((sim) => {
      const matchFach = fachFilter === "alle" || sim.fach.toLowerCase() === fachFilter.toLowerCase();
      const matchQuery =
        !q ||
        sim.titleDE.toLowerCase().includes(q) ||
        sim.titleZH.toLowerCase().includes(q) ||
        sim.descDE.toLowerCase().includes(q) ||
        sim.descZH.toLowerCase().includes(q) ||
        sim.tags.some((t) => t.toLowerCase().includes(q));
      return matchFach && matchQuery;
    });
  }, [searchQuery, fachFilter]);

  const activeSim = useMemo(() => {
    return SIMULATION_REGISTRY.find((s) => s.id === activeSimId) ?? null;
  }, [activeSimId]);

  const handleExportFinding = (findingText: string) => {
    if (onDiscussInTutor) {
      const prompt = lang === "de"
        ? `Ich habe im Labor "${activeSim?.titleDE}" folgendes Experiment durchgeführt:\n\n${findingText}\n\nBitte erkläre mir die physikalischen/chemischen Hintergründe und typische Klausurfragen dazu.`
        : `我在 Labor 互动探索实验室「${activeSim?.titleZH}」中得出了以下实验数据：\n\n${findingText}\n\n请结合北威州高中考纲，剖析此现象背后的深层考点与可能的答题陷阱。`;
      onDiscussInTutor(prompt);
    } else {
      navigator.clipboard.writeText(findingText);
      alert(lang === "de" ? "Ergebnis in die Zwischenablage kopiert!" : "实验结论已复制到剪贴板！");
    }
  };

  // Render active simulator component
  const renderActiveSimulator = () => {
    switch (activeSimId) {
      case "skate":
        return <EnergySkateParkSim lang={lang} studioMode={isStudioExpanded} onExportFinding={handleExportFinding} />;
      case "pendulum":
        return <PendulumLabSim lang={lang} studioMode={isStudioExpanded} onExportFinding={handleExportFinding} />;
      case "projectile":
        return <ProjectileMotionSim lang={lang} studioMode={isStudioExpanded} onExportFinding={handleExportFinding} />;
      case "buoyancy":
        return <BuoyancyDensitySim lang={lang} studioMode={isStudioExpanded} onExportFinding={handleExportFinding} />;
      case "coulomb":
        return <CoulombLawSim lang={lang} studioMode={isStudioExpanded} onExportFinding={handleExportFinding} />;
      case "spring":
        return <SpringPendulumSim lang={lang} studioMode={isStudioExpanded} onExportFinding={handleExportFinding} />;
      case "circuit":
        return <CircuitOhmSim lang={lang} onExportFinding={handleExportFinding} />;
      case "optics":
        return <OpticsRefractionSim lang={lang} onExportFinding={handleExportFinding} />;
      case "gas":
        return <GasPropertiesSim lang={lang} onExportFinding={handleExportFinding} />;
      case "states-matter":
        return <StatesMatterSim lang={lang} studioMode={isStudioExpanded} onExportFinding={handleExportFinding} />;
      case "under-pressure":
        return <HydroPressureSim lang={lang} studioMode={isStudioExpanded} onExportFinding={handleExportFinding} />;
      case "diffusion":
        return <DiffusionSim lang={lang} studioMode={isStudioExpanded} onExportFinding={handleExportFinding} />;
      case "photoelectric":
        return <PhotoelectricSim lang={lang} studioMode={isStudioExpanded} onExportFinding={handleExportFinding} />;
      case "rutherford":
        return <RutherfordSim lang={lang} studioMode={isStudioExpanded} onExportFinding={handleExportFinding} />;
      case "hydrogen-atom":
        return <HydrogenAtomSim lang={lang} studioMode={isStudioExpanded} onExportFinding={handleExportFinding} />;
      case "blackbody":
        return <BlackbodySim lang={lang} studioMode={isStudioExpanded} onExportFinding={handleExportFinding} />;
      case "molecule-shape":
        return <MoleculeShapeSim lang={lang} studioMode={isStudioExpanded} onExportFinding={handleExportFinding} />;
      case "concentration":
        return <ConcentrationSim lang={lang} studioMode={isStudioExpanded} onExportFinding={handleExportFinding} />;
      case "probability":
        return <ProbabilitySim lang={lang} studioMode={isStudioExpanded} onExportFinding={handleExportFinding} />;
      case "membrane":
        return <MembraneSim lang={lang} studioMode={isStudioExpanded} onExportFinding={handleExportFinding} />;
      case "neuron":
        return <NeuronSim lang={lang} studioMode={isStudioExpanded} onExportFinding={handleExportFinding} />;
      case "vector":
        return <VectorAdditionSim lang={lang} onExportFinding={handleExportFinding} />;
      case "titration":
        return <TitrationSimulator lang={lang} />;
      case "gleichgewicht":
        return <GleichgewichtSimulator lang={lang} />;
      case "osmose":
        return <OsmoseSimulator lang={lang} />;
      case "kinematik":
        return <KinematikSim lang={lang} onFormulaGenerated={handleExportFinding} />;
      case "schiefe-ebene":
        return <SchiefeEbeneSim lang={lang} studioMode={isStudioExpanded} />;
      case "collision":
        return <CollisionLabSim lang={lang} studioMode={isStudioExpanded} onExportFinding={handleExportFinding} />;
      case "lever":
        return <LeverBalanceSim lang={lang} studioMode={isStudioExpanded} onExportFinding={handleExportFinding} />;
      case "hooke":
        return <HookeLawSim lang={lang} studioMode={isStudioExpanded} onExportFinding={handleExportFinding} />;
      case "friction":
        return <FrictionMicroSim lang={lang} studioMode={isStudioExpanded} onExportFinding={handleExportFinding} />;
      case "box":
        return <BoxOptimizerSim lang={lang} />;
      case "tangent":
        return <TangentSlider lang={lang} onFormulaGenerated={handleExportFinding} />;
      case "markt":
        return <MarktMechanismusSim lang={lang} onFormulaGenerated={handleExportFinding} />;
      case "gini":
        return <GiniAllocatorSim lang={lang} />;
      case "balance":
        return <BalanceBoard lang={lang} onUrteilGenerated={handleExportFinding} />;
      case "wave":
        return <WaveInterferenceLabSim lang={lang} studioMode={isStudioExpanded} onExportFinding={handleExportFinding} />;
      case "optics-lens":
        return <OpticsLensSim lang={lang} studioMode={isStudioExpanded} onExportFinding={handleExportFinding} />;
      case "charges-fields":
        return <ChargesFieldsSim lang={lang} studioMode={isStudioExpanded} onExportFinding={handleExportFinding} />;
      case "faraday":
        return <FaradayInductionSim lang={lang} studioMode={isStudioExpanded} onExportFinding={handleExportFinding} />;
      case "wave-string":
        return <WaveStringSim lang={lang} studioMode={isStudioExpanded} onExportFinding={handleExportFinding} />;
      case "orbit":
        return <GravityOrbitSim lang={lang} studioMode={isStudioExpanded} onExportFinding={handleExportFinding} />;
            case "ethik-waage":
        return <EthikWaageSim lang={lang} studioMode={isStudioExpanded} onExportFinding={handleExportFinding} />;
      case "magisches-viereck":
        return <MagischesViereckSim lang={lang} />;
default:
        return null;
    }
  };

  return (
    <div className={`mx-auto w-full min-w-0 transition-all duration-200 ${
      isStudioExpanded && activeSimId ? "max-w-none px-0 space-y-4" : "max-w-5xl px-0 space-y-6"
    }`}>
      {/* Top Header */}
      <div className="flex flex-wrap items-center justify-between border-b border-[var(--line)] pb-3 text-xs font-mono text-[var(--gray)]">
        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={() => setActiveSimId(null)}
            className={`transition-colors ${
              !activeSimId
                ? "font-semibold text-[var(--accent)] border-b border-[var(--accent)]"
                : "hover:text-[var(--ink)]"
            }`}
          >
            {lang === "de" ? "Laboratorien & Simulationen" : "互动探索实验室 (互动探究)"}
          </button>
          {activeSim && (
            <>
              <span>/</span>
              <span className="font-serif text-[var(--ink)] font-medium">
                {activeSim.fach} · {lang === "de" ? activeSim.titleDE : activeSim.titleZH}
              </span>
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded border border-[var(--accent)] text-[var(--accent)]">
                Labor
              </span>
            </>
          )}
        </div>

        <div className="text-xs font-mono text-[var(--gray)]">
          {activeSimId ? (
            <button
              type="button"
              onClick={() => setActiveSimId(null)}
              className="text-[var(--accent)] hover:underline"
            >
              ← {lang === "de" ? "Zurück zur Labor-Übersicht" : "返回实验室列表"}
            </button>
          ) : (
            <span>
              {filteredSims.length} / {SIMULATION_REGISTRY.length} {lang === "de" ? "Simulationen bereit" : "个交互仿真就绪"}
            </span>
          )}
        </div>
      </div>

      {/* VIEW 1: ACTIVE SIMULATION WORKBENCH */}
      {activeSimId && activeSim ? (
        <div className="space-y-4">
          {/* Back toolbar */}
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[var(--line)] pb-2.5">
            <button
              type="button"
              onClick={() => setActiveSimId(null)}
              className="flex items-center gap-1.5 text-xs font-mono text-[var(--gray)] hover:text-[var(--ink)] border border-[var(--line)] px-2.5 py-1 rounded-[var(--radius)] transition-colors"
            >
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                <path d="M10 12L6 8l4-4" />
              </svg>
              <span>{lang === "de" ? "Zurück zur Übersicht" : "返回全部实验室"}</span>
            </button>

            <div className="flex items-center gap-2">
              <span className="font-mono text-xs uppercase px-2 py-0.5 bg-[var(--paper-subtle)] text-[var(--accent)] rounded border border-[var(--line)] font-medium">
                {activeSim.fach}
              </span>

              {/* In-app Studio Expand Button (fills right viewport beside sidebar) */}
              <button
                type="button"
                onClick={() => setIsStudioExpanded(!isStudioExpanded)}
                className={`text-xs font-mono px-2.5 py-1 rounded border transition-colors flex items-center gap-1.5 ${
                  isStudioExpanded
                    ? "border-[var(--accent)] bg-[var(--paper-subtle)] text-[var(--accent)] font-semibold shadow-xs"
                    : "border-[var(--line)] bg-[var(--paper)] text-[var(--ink)] hover:border-[var(--accent)]"
                }`}
                title={lang === "de" ? "Studio-Großansicht (vollflächig neben Navigation)" : "全景放大研习模式（铺满左侧导航栏右侧大部分区域）"}
              >
                <span>{isStudioExpanded ? "⤡" : "⤢"}</span>
                <span>{isStudioExpanded ? (lang === "de" ? "Kompaktansicht" : "退出放大 / 紧凑模式") : (lang === "de" ? "Studio-Vollansicht" : "全景放大研习模式")}</span>
              </button>

              {onDiscussInTutor && (
                <button
                  type="button"
                  onClick={() => {
                    const prompt = lang === "de"
                      ? `Ich experimentiere gerade im Labor "${activeSim.titleDE}". Welche konkreten Abitur-Klausuraufgaben und Denkmodelle sind dafür relevant?`
                      : `我正在使用 Labor 互动实验室「${activeSim.titleZH}」。请问在德国北威州高中期末考与高考大题中，有哪些核心考法和常见失分陷阱？`;
                    onDiscussInTutor(prompt);
                  }}
                  className="text-xs font-mono px-3 py-1 bg-[var(--ink)] text-[var(--paper)] rounded-[var(--radius)] hover:bg-[var(--accent)] transition-colors"
                >
                  {lang === "de" ? "Mit KI-Tutor diskutieren →" : "与 AI 助教研讨 →"}
                </button>
              )}
            </div>
          </div>

          {/* Active Sim Component */}
          {renderActiveSimulator()}
        </div>
      ) : (
        /* VIEW 2: SIMULATION CATALOG & SEARCH GRID */
        <div className="space-y-6">
          {/* Filter Bar: Subject Tabs + Search */}
          <div className="space-y-3">
            {/* Subject Tabs */}
            <div className="flex flex-wrap items-center gap-1.5 border-b border-[var(--line)] pb-3">
              {[
                { id: "alle", de: "Alle Fächer", zh: "全部学科" },
                { id: "Physik", de: "Physik", zh: "物理 (Mechanik, Optik, E-Lehre)" },
                { id: "Chemie", de: "Chemie", zh: "化学 (Gase, Säure-Base, Gleichgewicht)" },
                { id: "Bio", de: "Biologie", zh: "生物 (Osmose, Membran)" },
                { id: "Mathe", de: "Mathematik", zh: "数学 (Analysis, Vektoren)" },
                { id: "SoWi", de: "SoWi / Wirtschaft", zh: "社科与经济" },
                { id: "Philosophie", de: "Philosophie", zh: "哲学与伦理" },
              ].map((f) => {
                const count = f.id === "alle"
                  ? SIMULATION_REGISTRY.length
                  : SIMULATION_REGISTRY.filter((s) => s.fach.toLowerCase() === f.id.toLowerCase()).length;
                const isSelected = fachFilter === f.id;

                return (
                  <button
                    key={f.id}
                    type="button"
                    onClick={() => setFachFilter(f.id)}
                    className={`px-3 py-1 text-xs font-mono rounded-[var(--radius)] border transition-all ${
                      isSelected
                        ? "border-[var(--accent)] text-[var(--accent)] bg-[var(--paper-subtle)] font-medium"
                        : "border-[var(--line)] text-[var(--gray)] hover:text-[var(--ink)] hover:border-[var(--ink)]"
                    }`}
                  >
                    {lang === "de" ? f.de : f.zh} <span className="opacity-70">({count})</span>
                  </button>
                );
              })}
            </div>

            {/* Search Input */}
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={
                  lang === "de"
                    ? "Labor-Simulation suchen (z.B. Feder, Brechung, Osmose, Gleichgewicht, Vektor)..."
                    : "检索 Labor 互动实验（如：弹簧振子、光的折射、欧姆定律、勒夏特列、渗透压、向量）..."
                }
                className="w-full rounded-[var(--radius)] border border-[var(--line)] bg-[var(--surface)] px-3 py-2 text-xs font-sans text-[var(--ink)] placeholder-[var(--gray)] focus:border-[var(--accent)] focus:outline-none"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs font-mono text-[var(--gray)] hover:text-[var(--ink)]"
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          {/* Simulations Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredSims.map((sim) => (
              <div
                key={sim.id}
                onClick={() => setActiveSimId(sim.id)}
                className="group border border-[var(--line)] bg-[var(--surface)] hover:border-[var(--accent)] rounded-[var(--radius)] p-4 flex flex-col justify-between transition-all cursor-pointer hover:shadow-md"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[10px] uppercase font-semibold text-[var(--accent)] px-1.5 py-0.5 rounded border border-[var(--accent)]/30 bg-[var(--accent)]/5">
                      {sim.fach}
                    </span>
                    <span className="font-mono text-[10px] text-[var(--gray)]">Labor</span>
                  </div>

                  <h3 className="font-serif text-sm font-semibold text-[var(--ink)] group-hover:text-[var(--accent)] transition-colors leading-snug">
                    {lang === "de" ? sim.titleDE : sim.titleZH}
                  </h3>

                  <p className="font-sans text-xs text-[var(--gray)] leading-relaxed line-clamp-2">
                    {lang === "de" ? sim.descDE : sim.descZH}
                  </p>
                </div>

                <div className="pt-3 border-t border-[var(--line)]/50 mt-3 flex items-center justify-between text-xs font-mono">
                  <span className="text-[var(--gray)] text-[10px] font-mono">
                    {sim.tags.slice(0, 2).join(" · ")}
                  </span>
                  <span className="text-[var(--accent)] font-medium group-hover:translate-x-0.5 transition-transform flex items-center gap-1">
                    {lang === "de" ? "Labor öffnen →" : "进入实验 →"}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {filteredSims.length === 0 && (
            <div className="border border-dashed border-[var(--line)] bg-[var(--paper-subtle)] p-8 text-center text-xs font-mono text-[var(--gray)] rounded-[var(--radius)]">
              {lang === "de"
                ? "Keine Simulationen für diese Filterkriterien gefunden."
                : "未找到符合条件的探索实验室，尝试切换学科或清空搜索关键词。"}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Labor;
