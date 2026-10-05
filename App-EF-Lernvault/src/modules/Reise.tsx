import { EthikWaageSim } from "../components/pedagogy/EthikWaageSim";
import { MagischesViereckSim } from "../components/pedagogy/MagischesViereckSim";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  type Reise,
  type Schritt,
  type SchrittEntdecken,
  type SchrittAusprobieren,
  type SchrittCheck,
  type SchrittSzenario,
  type SchrittMuendlich,
  type SchrittReflexion,
  exemplarReise,
  getExemplarReise,
  getStepTitle,
  resolveCourseForAudience,
} from "../reise";
import { FAECHER } from "../fach";
import Blocks, { renderFormattedText } from "../components/Blocks";
import DiagramFig from "../components/Diagram";
import { chat, describeActiveEngine, type ChatMsg } from "../ai/engine";
import {
  REISE_SYSTEM,
  buildCheckExplainPrompt,
  buildCheckScorePrompt,
  buildExplainPrompt,
  buildSzenarioScorePrompt,
  buildTryFeedbackPrompt,
} from "../engine/reise-ki";
import { setFeedbackContext } from "../components/FeedbackBox";
import { xpStore, type XpData } from "../engine/stores";
import { PER_MODULE_KEYS, isTyping, matchesKey } from "../keys";
import { restoreGermanUmlauts } from "../utils/germanOrthography";
import type { Lang } from "../i18n";
import { SatzbauLego } from "../components/pedagogy/SatzbauLego";
import { TangentSlider } from "../components/pedagogy/TangentSlider";
import FormulaScaffold from "../components/pedagogy/FormulaScaffold";
import OralExamTimer from "../components/pedagogy/OralExamTimer";
import { KinematikSim } from "../components/pedagogy/KinematikSim";
import { OsmoseSimulator } from "../components/pedagogy/OsmoseSimulator";
import { SchiefeEbeneSim } from "../components/pedagogy/SchiefeEbeneSim";
import { GiniAllocatorSim } from "../components/pedagogy/GiniAllocatorSim";
import ImageAnswerUpload from "../components/ImageAnswerUpload";
import { DilemmaTheatre } from "../components/pedagogy/DilemmaTheatre";
import { HaberBoschLab } from "../components/pedagogy/HaberBoschLab";
import { OpticsBench } from "../components/pedagogy/OpticsBench";
import { TitrationLab } from "../components/pedagogy/TitrationLab";
import { BoxOptimizerLab } from "../components/pedagogy/BoxOptimizerLab";
import { MarktWelfareLab } from "../components/pedagogy/MarktWelfareLab";
import { GeWiReadingLab } from "../components/pedagogy/GeWiReadingLab";
import { BentoMastery } from "../components/pedagogy/BentoMastery";
import { SowiDepotLecture } from "../components/pedagogy/SowiDepotLecture";
import { OrderbuchSimulator } from "../components/pedagogy/OrderbuchSimulator";

function DepotStepWidget({ lang }: { lang: Lang }) {
  const [showFullLecture, setShowFullLecture] = useState(false);
  const de = lang === "de";

  return (
    <div className="my-3 space-y-3">
      <div className="p-3.5 border border-[var(--line)] bg-[var(--surface)] rounded-[var(--radius)]">
        <OrderbuchSimulator lang={lang} />
      </div>

      <div className="flex justify-end">
        <button
          type="button"
          onClick={() => setShowFullLecture(!showFullLecture)}
          className="text-xs font-mono text-[var(--gray)] hover:text-[var(--ink)] underline cursor-pointer flex items-center gap-1.5"
        >
          <span>{showFullLecture ? "▲" : "▼"}</span>
          <span>
            {showFullLecture
              ? de
                ? "Vollständige Vorlesungsstrecke einklappen"
                : "收起完整学术微课剧场"
              : de
              ? "Vollständige Vorlesungsstrecke (5 Kapitel) zur Vertiefung einblenden"
              : "展开完整学术微课剧场 (5幕深度研讨) 深入探究"}
          </span>
        </button>
      </div>

      {showFullLecture && (
        <div className="p-4 border border-[var(--line)] bg-[var(--surface)] rounded-[var(--radius)] shadow-none">
          <SowiDepotLecture lang={lang} />
        </div>
      )}
    </div>
  );
}

function CheckMarkSvg() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      aria-hidden="true"
      className="w-3.5 h-3.5 inline-block shrink-0"
    >
      <path
        d="M3 8.5l3.5 3.5L13 5"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function BalanceScaleSvg() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="w-3.5 h-3.5 inline-block shrink-0"
    >
      <path d="M8 2v12" />
      <path d="M4 5l4-2 4 2" />
      <path d="M4 5l-2 5h4l-2-5z" />
      <path d="M12 5l-2 5h4l-2-5z" />
      <path d="M5 14h6" />
    </svg>
  );
}

function GamepadSvg() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="w-3.5 h-3.5 inline-block shrink-0"
    >
      <rect x="1.5" y="4" width="13" height="8" rx="1.5" />
      <path d="M4 8h3" />
      <path d="M5.5 6.5v3" />
      <line x1="10" y1="8.5" x2="10.01" y2="8.5" />
      <line x1="12" y1="7.5" x2="12.01" y2="7.5" />
    </svg>
  );
}

function LightbulbSvg() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="w-3.5 h-3.5 inline-block shrink-0"
    >
      <path d="M10 9.5c.1-.7.5-1.1 1-1.7.7-.6 1-1.5 1-2.3A4 4 0 0 0 4 5.5c0 .7.1 1.5 1 2.3.5.5.9.9 1 1.7" />
      <path d="M6 12h4" />
      <path d="M7 14h2" />
    </svg>
  );
}


function getAutoToolForContext(fach: string, thema: string): string | null {
  const f = (fach || "").toLowerCase();
  const th = (thema || "").toLowerCase();
  if (f === "mathe" || th.includes("ableitung") || th.includes("sekante") || th.includes("tangente") || th.includes("funktion")) {
    return "tangent";
  }
  if (f === "sowi" || th.includes("markt") || th.includes("wirtschaft") || th.includes("preis")) {
    return "markt";
  }
  if (f === "physik" || th.includes("bewegung") || th.includes("kraft") || th.includes("kinematik") || th.includes("beschleunigung")) {
    return "kinematik";
  }
  if (f === "philosophie" || th.includes("ethik") || th.includes("moral") || th.includes("urteil") || th.includes("gerechtigkeit")) {
    return "balance";
  }
  if (f === "deutsch" || f === "englisch" || th.includes("analyse") || th.includes("text") || th.includes("gedicht")) {
    return "highlighter";
  }
  if (f === "chemie" || f === "bio") {
    return "formula";
  }
  if (f.includes("muendl") || f === "musik" || f === "sport") {
    return "oral-timer";
  }
  return null;
}

function renderEmbeddedTool(toolName: string, lang: Lang, fach: string, thema?: string) {
  const t = toolName.toLowerCase().trim();
  const f = (fach || "").toLowerCase();

  // 1. BIOLOGIE GUARDS & TOOLS
  if (f.includes("bio")) {
    if (t === "formula" || t === "formel" || t === "mint") {
      return (
        <div className="my-3 p-3.5 border border-[var(--line)] bg-[var(--surface)] rounded-[var(--radius)]">
          <div className="flex items-center justify-between text-xs font-mono text-[var(--accent)] mb-2 font-medium">
            <span>{lang === "de" ? "Interaktives Werkzeug: MINT-Scaffold" : "交互教具：理科四步规范解题脚手架"}</span>
            <span className="text-[var(--text-meta)] text-[var(--gray)]">Bio</span>
          </div>
          <FormulaScaffold lang={lang} fach={fach} thema={thema} />
        </div>
      );
    }
    if (t === "lego" || t === "satzbau") {
      return (
        <div className="my-3 p-3.5 border border-[var(--line)] bg-[var(--surface)] rounded-[var(--radius)]">
          <div className="flex items-center justify-between text-xs font-mono text-[var(--accent)] mb-2 font-medium">
            <span>{lang === "de" ? "Interaktives Werkzeug: Satzbau-Lego" : "交互教具：考场学术句式积木"}</span>
            <span className="text-[var(--text-meta)] text-[var(--gray)]">Bio</span>
          </div>
          <SatzbauLego lang={lang} fach={fach} />
        </div>
      );
    }
    // Default & specific for Bio: OsmoseSimulator (protect against misrouted "balance")
    return (
      <div className="my-3 p-3.5 border border-[var(--line)] bg-[var(--surface)] rounded-[var(--radius)]">
        <OsmoseSimulator lang={lang} />
      </div>
    );
  }

  // 2. CHEMIE GUARDS & TOOLS
  if (f.includes("chemie")) {
    if (t === "formula" || t === "formel" || t === "mint") {
      return (
        <div className="my-3 p-3.5 border border-[var(--line)] bg-[var(--surface)] rounded-[var(--radius)]">
          <div className="flex items-center justify-between text-xs font-mono text-[var(--accent)] mb-2 font-medium">
            <span>{lang === "de" ? "Interaktives Werkzeug: MINT-Scaffold" : "交互教具：理科四步规范解题脚手架"}</span>
            <span className="text-[var(--text-meta)] text-[var(--gray)]">Chemie</span>
          </div>
          <FormulaScaffold lang={lang} fach={fach} thema={thema} />
        </div>
      );
    }
    if (t === "lego" || t === "satzbau") {
      return (
        <div className="my-3 p-3.5 border border-[var(--line)] bg-[var(--surface)] rounded-[var(--radius)]">
          <div className="flex items-center justify-between text-xs font-mono text-[var(--accent)] mb-2 font-medium">
            <span>{lang === "de" ? "Interaktives Werkzeug: Satzbau-Lego" : "交互教具：考场学术句式积木"}</span>
            <span className="text-[var(--text-meta)] text-[var(--gray)]">Chemie</span>
          </div>
          <SatzbauLego lang={lang} fach={fach} />
        </div>
      );
    }
    if (t === "titration" || t === "titration-lab" || t === "saeure-base") {
      return (
        <div className="my-3 p-3.5 border border-[var(--line)] bg-[var(--surface)] rounded-[var(--radius)]">
          <TitrationLab lang={lang} />
        </div>
      );
    }
    // Default & specific for Chemie: HaberBoschLab (60FPS particle collision & piston dynamics)
    return (
      <div className="my-3 p-3.5 border border-[var(--line)] bg-[var(--surface)] rounded-[var(--radius)]">
        <HaberBoschLab lang={lang} />
      </div>
    );
  }

  // 3. PHYSIK GUARDS & TOOLS
  if (f.includes("physik")) {
    if (t === "optik" || t === "optics" || t === "snell" || t === "brechung" || t === "reflexion" || t === "licht" || t === "laser") {
      return (
        <div className="my-3 p-3.5 border border-[var(--line)] bg-[var(--surface)] rounded-[var(--radius)]">
          <OpticsBench lang={lang} />
        </div>
      );
    }
    if (t === "formula" || t === "formel" || t === "mint") {
      return (
        <div className="my-3 p-3.5 border border-[var(--line)] bg-[var(--surface)] rounded-[var(--radius)]">
          <div className="flex items-center justify-between text-xs font-mono text-[var(--accent)] mb-2 font-medium">
            <span>{lang === "de" ? "Interaktives Werkzeug: MINT-Scaffold" : "交互教具：理科四步规范解题脚手架"}</span>
            <span className="text-[var(--text-meta)] text-[var(--gray)]">Physik</span>
          </div>
          <FormulaScaffold lang={lang} fach={fach} thema={thema} />
        </div>
      );
    }
    if (t === "tangent" || t === "tangente") {
      return (
        <div className="my-3 p-3.5 border border-[var(--line)] bg-[var(--surface)] rounded-[var(--radius)]">
          <div className="flex items-center justify-between text-xs font-mono text-[var(--accent)] mb-2 font-medium">
            <span>{lang === "de" ? "Interaktives Werkzeug: Tangenten-Simulator" : "交互教具：割线逼近切线导数沙盘"}</span>
            <span className="text-[var(--text-meta)] text-[var(--gray)]">Physik</span>
          </div>
          <TangentSlider lang={lang} />
        </div>
      );
    }
    if (t === "schiefe-ebene" || t === "ebene" || t === "reibung") {
      return (
        <div className="my-3 p-3.5 border border-[var(--line)] bg-[var(--surface)] rounded-[var(--radius)]">
          <SchiefeEbeneSim lang={lang} />
        </div>
      );
    }
    // KinematikLab as default for Physik (guards against balance)
    return (
      <div className="my-3 p-3.5 border border-[var(--line)] bg-[var(--surface)] rounded-[var(--radius)]">
        <div className="flex items-center justify-between text-xs font-mono text-[var(--accent)] mb-2 font-medium">
          <span>{lang === "de" ? "Interaktives Werkzeug: Kinematik-Labor" : "交互教具：直线运动与速度加速度实验室"}</span>
          <span className="text-[var(--text-meta)] text-[var(--gray)]">Physik (Mechanik)</span>
        </div>
        <KinematikSim lang={lang} />
      </div>
    );
  }

  // 4. MATHEMATIK TOOLS
  if (f.includes("mathe")) {
    // box-optimizer FIRST (BoxOptimizerLab; must precede formula branch)
    if (t === "box-optimizer" || t === "box" || t === "optimizer" || t === "extremwert") {
      return (
        <div className="my-3 p-3.5 border border-[var(--line)] bg-[var(--surface)] rounded-[var(--radius)]">
          <BoxOptimizerLab lang={lang} />
        </div>
      );
    }
    if (t === "formula" || t === "formel" || t === "mint") {
      return (
        <div className="my-3 p-3.5 border border-[var(--line)] bg-[var(--surface)] rounded-[var(--radius)]">
          <div className="flex items-center justify-between text-xs font-mono text-[var(--accent)] mb-2 font-medium">
            <span>{lang === "de" ? "Interaktives Werkzeug: MINT-Scaffold" : "交互教具：理科四步规范解题脚手架"}</span>
            <span className="text-[var(--text-meta)] text-[var(--gray)]">Mathe</span>
          </div>
          <FormulaScaffold lang={lang} fach={fach} thema={thema} />
        </div>
      );
    }
    // tangent-slider / tangent / default -> Tangenten-Simulator
    return (
      <div className="my-3 p-3.5 border border-[var(--line)] bg-[var(--surface)] rounded-[var(--radius)]">
        <div className="flex items-center justify-between text-xs font-mono text-[var(--accent)] mb-2 font-medium">
          <span>{lang === "de" ? "Interaktives Werkzeug: Tangenten-Simulator" : "交互教具：割线逼近切线导数沙盘"}</span>
          <span className="text-[var(--text-meta)] text-[var(--gray)]">Mathe (Analysis)</span>
        </div>
        <TangentSlider lang={lang} />
      </div>
    );
  }

  // 5. SOWI & PHILO TOOLS (MarktWelfareLab + GeWiReadingLab + DilemmaTheatre)
  if (f.includes("sowi") || f.includes("philo") || f.includes("philosophie")) {
    if (t === "markt" || t === "markt-sim" || t === "marktwirtschaft" || t === "preisbildung" || t === "angebot" || t === "nachfrage" || t === "welfare" || t === "wohlfahrt") {
      return (
        <div className="my-3 p-3.5 border border-[var(--line)] bg-[var(--surface)] rounded-[var(--radius)]">
          <MarktWelfareLab lang={lang} />
        </div>
      );
    }
    if (t === "hobbes" || t === "leviathan" || (f.includes("philo") && (thema?.toLowerCase().includes("hobbes") || thema?.toLowerCase().includes("leviathan") || thema?.toLowerCase().includes("naturzustand")))) {
      return (
        <div className="my-3 p-3.5 border border-[var(--line)] bg-[var(--surface)] rounded-[var(--radius)]">
          <GeWiReadingLab lang={lang} defaultExcerptId="hobbes-leviathan" filterFach="Philosophie" compact={true} />
        </div>
      );
    }
    if (t === "arendt" || t === "totalitarismus" || (f.includes("philo") && (thema?.toLowerCase().includes("arendt") || thema?.toLowerCase().includes("totalit") || thema?.toLowerCase().includes("pluralit")))) {
      return (
        <div className="my-3 p-3.5 border border-[var(--line)] bg-[var(--surface)] rounded-[var(--radius)]">
          <GeWiReadingLab lang={lang} defaultExcerptId="arendt-totalitarismus" filterFach="Philosophie" compact={true} />
        </div>
      );
    }
    if (t === "kant" || t === "kategorisch" || (f.includes("philo") && (thema?.toLowerCase().includes("kant") || thema?.toLowerCase().includes("pflicht") || thema?.toLowerCase().includes("imperativ")))) {
      return (
        <div className="my-3 p-3.5 border border-[var(--line)] bg-[var(--surface)] rounded-[var(--radius)]">
          <GeWiReadingLab lang={lang} defaultExcerptId="kant-kategorisch" filterFach="Philosophie" compact={true} />
        </div>
      );
    }
    if (f.includes("philo") && (t === "gewi-reading" || t === "reader" || t === "text" || t === "text-analyse")) {
      let philoExcerpt = "kant-kategorisch";
      const th = (thema || "").toLowerCase();
      if (th.includes("hobbes") || th.includes("leviathan") || th.includes("naturzustand") || th.includes("vertrag")) philoExcerpt = "hobbes-leviathan";
      else if (th.includes("arendt") || th.includes("totalit") || th.includes("pluralit")) philoExcerpt = "arendt-totalitarismus";
      else if (th.includes("kant") || th.includes("pflicht") || th.includes("imperativ")) philoExcerpt = "kant-kategorisch";

      return (
        <div className="my-3 p-3.5 border border-[var(--line)] bg-[var(--surface)] rounded-[var(--radius)]">
          <GeWiReadingLab lang={lang} defaultExcerptId={philoExcerpt} filterFach="Philosophie" compact={true} />
        </div>
      );
    }
    if (t === "weber" || t === "herrschaft" || (f.includes("sowi") && (thema?.toLowerCase().includes("weber") || thema?.toLowerCase().includes("herrschaft") || thema?.toLowerCase().includes("legitim") || thema?.toLowerCase().includes("buerokratie")))) {
      return (
        <div className="my-3 p-3.5 border border-[var(--line)] bg-[var(--surface)] rounded-[var(--radius)]">
          <GeWiReadingLab lang={lang} defaultExcerptId="weber-herrschaft" filterFach="SoWi" compact={true} />
        </div>
      );
    }
    if (t === "habermas" || t === "oeffentlichkeit" || (f.includes("sowi") && (thema?.toLowerCase().includes("habermas") || thema?.toLowerCase().includes("oeffentlichkeit") || thema?.toLowerCase().includes("diskurs") || thema?.toLowerCase().includes("deliberat")))) {
      return (
        <div className="my-3 p-3.5 border border-[var(--line)] bg-[var(--surface)] rounded-[var(--radius)]">
          <GeWiReadingLab lang={lang} defaultExcerptId="habermas-oeffentlichkeit" filterFach="SoWi" compact={true} />
        </div>
      );
    }
    if (t === "rede" || t === "steinmeier" || (f.includes("sowi") && (thema?.toLowerCase().includes("rede") || thema?.toLowerCase().includes("demokratie")))) {
      return (
        <div className="my-3 p-3.5 border border-[var(--line)] bg-[var(--surface)] rounded-[var(--radius)]">
          <GeWiReadingLab lang={lang} defaultExcerptId="steinmeier-rede" filterFach="SoWi" compact={true} />
        </div>
      );
    }
    if (f.includes("sowi") && (t === "gewi-reading" || t === "reader" || t === "text" || t === "text-analyse")) {
      let sowiExcerpt = "steinmeier-rede";
      const th = (thema || "").toLowerCase();
      if (th.includes("weber") || th.includes("herrschaft") || th.includes("legitim") || th.includes("buerokratie")) sowiExcerpt = "weber-herrschaft";
      else if (th.includes("habermas") || th.includes("oeffentlichkeit") || th.includes("diskurs") || th.includes("deliberat")) sowiExcerpt = "habermas-oeffentlichkeit";
      else if (th.includes("rede") || th.includes("steinmeier") || th.includes("demokratie")) sowiExcerpt = "steinmeier-rede";

      return (
        <div className="my-3 p-3.5 border border-[var(--line)] bg-[var(--surface)] rounded-[var(--radius)]">
          <GeWiReadingLab lang={lang} defaultExcerptId={sowiExcerpt} filterFach="SoWi" compact={true} />
        </div>
      );
    }
        if (t === "ethik-waage" || t === "waage" || t === "utilitarismus" || t === "kalkuel" || t === "maximenpruefung" || (f.includes("philo") && thema?.toLowerCase().includes("utilitarismus"))) {
      return (
        <div className="my-3 p-3.5 border border-[var(--line)] bg-[var(--surface)] rounded-[var(--radius)]">
          <EthikWaageSim lang={lang} />
        </div>
      );
    }
    if (t === "magisches-viereck" || t === "viereck" || t === "wirtschaftspolitik" || t === "stabilitaetsgesetz" || t === "konjunktur" || (f.includes("sowi") && (thema?.toLowerCase().includes("viereck") || thema?.toLowerCase().includes("stabilitaet") || thema?.toLowerCase().includes("konjunktur")))) {
      return (
        <div className="my-3 p-3.5 border border-[var(--line)] bg-[var(--surface)] rounded-[var(--radius)]">
          <MagischesViereckSim lang={lang} />
        </div>
      );
    }
    if (t === "dilemma" || t === "ethik" || t === "trolley" || t === "bentham" || t === "konflikt") {
      return (
        <div className="my-3 p-3.5 border border-[var(--line)] bg-[var(--surface)] rounded-[var(--radius)]">
          <DilemmaTheatre lang={lang} scenarioId={f.includes("sowi") ? "sowi-mindestlohn" : "philo-trolley"} />
        </div>
      );
    }
    if (t === "depot" || t === "orderarten" || t === "orderbuch" || t === "wertpapier" || t === "aktien" || t === "boerse" || t === "anleger" || (f.includes("sowi") && (thema?.includes("depot") || thema?.includes("wertpapier") || thema?.includes("aktie") || thema?.includes("finanz")))) {
      return <DepotStepWidget lang={lang} />;
    }
    if (t === "gini" || t === "gini-allocator" || t === "lorenz" || t === "verteilung" || t === "ungleichheit") {
      return (
        <div className="my-3 p-3.5 border border-[var(--line)] bg-[var(--surface)] rounded-[var(--radius)]">
          <GiniAllocatorSim lang={lang} />
        </div>
      );
    }
    if (t === "lego" || t === "satzbau") {
      return (
        <div className="my-3 p-3.5 border border-[var(--line)] bg-[var(--surface)] rounded-[var(--radius)]">
          <div className="flex items-center justify-between text-xs font-mono text-[var(--accent)] mb-2 font-medium">
            <span>{lang === "de" ? "Interaktives Werkzeug: Satzbau-Lego" : "交互教具：考场学术句式积木"}</span>
            <span className="text-[var(--text-meta)] text-[var(--gray)]">{fach}</span>
          </div>
          <SatzbauLego lang={lang} fach={fach} />
        </div>
      );
    }
    return (
      <div className="my-3 p-3.5 border border-[var(--line)] bg-[var(--surface)] rounded-[var(--radius)]">
        <DilemmaTheatre lang={lang} scenarioId={f.includes("sowi") ? "sowi-mindestlohn" : "philo-trolley"} />
      </div>
    );
  }

  // 6. DEUTSCH & ENGLISCH TOOLS (GeWiReadingLab + DilemmaTheatre)
  if (f.includes("deutsch") || f.includes("englisch") || f.includes("english")) {
    if (t === "gewi-reading" || t === "reader" || t === "originaltext" || t === "text-analyse" || t === "faust" || t === "drama" || t === "woyzeck" || t === "shakespeare" || t === "nathan" || t === "kabale" || t === "lyrik" || t === "metrum") {
      let defaultExcerpt = "faust-monolog";
      const th = (thema || "").toLowerCase();
      if (th.includes("nathan") || t === "nathan" || th.includes("ringparabel")) defaultExcerpt = "nathan-ringparabel";
      else if (th.includes("kabale") || th.includes("schiller") || t === "kabale") defaultExcerpt = "kabale-miller-praesident";
      else if (th.includes("willkommen") || th.includes("abschied") || (th.includes("lyrik") && th.includes("sturm")) || t === "lyrik" || t === "metrum") defaultExcerpt = "goethe-willkommen-abschied";
      else if (th.includes("woyzeck") || t === "woyzeck") defaultExcerpt = "woyzeck-rasieren";
      else if (th.includes("macbeth") || th.includes("shakespeare") || f.includes("engl") || t === "shakespeare") defaultExcerpt = "macbeth-soliloquy";
      else if (th.includes("pakt") || th.includes("wette")) defaultExcerpt = "faust-pakt";

      return (
        <div className="my-3 p-3.5 border border-[var(--line)] bg-[var(--surface)] rounded-[var(--radius)]">
          <GeWiReadingLab
            lang={lang}
            defaultExcerptId={defaultExcerpt}
            filterFach={f.includes("engl") ? "Englisch" : "Deutsch"}
            compact={true}
          />
        </div>
      );
    }
    if (t === "dilemma" || t === "tragik" || t === "schuld") {
      return (
        <div className="my-3 p-3.5 border border-[var(--line)] bg-[var(--surface)] rounded-[var(--radius)]">
          <DilemmaTheatre lang={lang} scenarioId="deutsch-faust" />
        </div>
      );
    }
    if (t === "lego" || t === "satzbau") {
      return (
        <div className="my-3 p-3.5 border border-[var(--line)] bg-[var(--surface)] rounded-[var(--radius)]">
          <div className="flex items-center justify-between text-xs font-mono text-[var(--accent)] mb-2 font-medium">
            <span>{lang === "de" ? "Interaktives Werkzeug: Satzbau-Lego" : "交互教具：考场学术句式积木"}</span>
            <span className="text-[var(--text-meta)] text-[var(--gray)]">{fach}</span>
          </div>
          <SatzbauLego lang={lang} fach={fach} />
        </div>
      );
    }

    let fallbackExcerpt = "faust-monolog";
    const th = (thema || "").toLowerCase();
    if (th.includes("nathan") || th.includes("ringparabel")) fallbackExcerpt = "nathan-ringparabel";
    else if (th.includes("kabale") || th.includes("schiller")) fallbackExcerpt = "kabale-miller-praesident";
    else if (th.includes("willkommen") || th.includes("abschied") || (th.includes("lyrik") && th.includes("sturm"))) fallbackExcerpt = "goethe-willkommen-abschied";
    else if (f.includes("engl")) fallbackExcerpt = "macbeth-soliloquy";

    return (
      <div className="my-3 p-3.5 border border-[var(--line)] bg-[var(--surface)] rounded-[var(--radius)]">
        <GeWiReadingLab
          lang={lang}
          defaultExcerptId={fallbackExcerpt}
          filterFach={f.includes("engl") ? "Englisch" : "Deutsch"}
          compact={true}
        />
      </div>
    );
  }

  // 7. UNIVERSAL BENTO MASTERY & KLAUSUR HUD
  if (t === "bento" || t === "mastery" || t === "klausur-hud") {
    return (
      <div className="my-3 p-3.5 border border-[var(--line)] bg-[var(--surface)] rounded-[var(--radius)]">
        <BentoMastery lang={lang} />
      </div>
    );
  }

  // 7. MUSIK & SPORT TOOLS
  if (f.includes("musik") || f.includes("sport") || f.includes("muendl")) {
    if (t === "kinematik" || t === "kinematik-lab" || t === "bewegung" || t === "weitsprung-sim" || t === "weitsprung" || t === "schiefe-ebene") {
      return (
        <div className="my-3 p-3.5 border border-[var(--line)] bg-[var(--surface)] rounded-[var(--radius)]">
          <div className="flex items-center justify-between text-xs font-mono text-[var(--accent)] mb-2 font-medium">
            <span>{lang === "de" ? "Interaktives Werkzeug: Kinematik-Labor" : "交互教具：直线运动与速度加速度实验室"}</span>
            <span className="text-[var(--text-meta)] text-[var(--gray)]">Sport</span>
          </div>
          <KinematikSim lang={lang} />
        </div>
      );
    }
    return (
      <div className="my-3 p-3.5 border border-[var(--line)] bg-[var(--surface)] rounded-[var(--radius)]">
        <div className="flex items-center justify-between text-xs font-mono text-[var(--accent)] mb-2 font-medium">
          <span>{lang === "de" ? "Interaktives Werkzeug: Mündliche Prüfung Timer" : "交互教具：口试倒计时器"}</span>
          <span className="text-[var(--text-meta)] text-[var(--gray)]">Musik & Sport</span>
        </div>
        <OralExamTimer lang={lang} />
      </div>
    );
  }

  return null;
}

interface ProgressData {
  xp: number;
  streak: string[];
  badges: Record<string, number>;
  done: Record<string, number>;
}

function loadProgress(): ProgressData {
  const p: XpData = xpStore.load();
  return { xp: p.xp, streak: p.streak, badges: p.badges, done: p.done };
}

function saveProgress(p: ProgressData) {
  xpStore.save({ version: 1, ...p });
}

function updateStreak(streak: string[]): string[] {
  const today = new Date().toISOString().slice(0, 10);
  if (streak.includes(today)) return streak;
  const next = [...streak, today];
  return next.sort();
}

export default function ReiseModule({
  lang,
  vaultReisen,
  initialCourseId,
  initialViewMode = "steps",
}: {
  lang: Lang;
  vaultReisen?: Reise[] | null;
  initialCourseId?: string | null;
  initialViewMode?: "document" | "steps";
}) {
  // Aggregate available courses: exemplar course + any courses from vault
  const allReisen = useMemo(() => {
    const map = new Map<string, Reise>();
    if (exemplarReise) map.set(exemplarReise.id, exemplarReise);
    if (vaultReisen) {
      vaultReisen.forEach((r) => map.set(r.id, r));
    }
    return Array.from(map.values());
  }, [vaultReisen]);

  // Mode: wizard vs player
  const initialCourse =
    typeof window !== "undefined" &&
    new URLSearchParams(window.location.search).get("mode") === "wizard"
      ? null
      : getExemplarReise(lang);

  const [activeCourse, setActiveCourse] = useState<Reise | null>(initialCourse);
  const [stepIdx, setStepIdx] = useState(0);
  const [activeDocStepIdx, setActiveDocStepIdx] = useState(0);
  const lastActiveDocStepIdxRef = useRef<number>(0);
  const [viewMode, setViewMode] = useState<"document" | "steps">(initialViewMode);
  const rootContainerRef = useRef<HTMLDivElement>(null);

  const findScrollContainer = (): HTMLElement | null => {
    const el = rootContainerRef.current;
    if (el) {
      const parent = el.closest(".overflow-y-auto") as HTMLElement | null;
      if (parent) return parent;
    }
    const appContainer = document.querySelector(".tab-enter.overflow-y-auto") as HTMLElement | null;
    if (appContainer) return appContainer;
    return (document.querySelector(".overflow-y-auto") as HTMLElement | null) || null;
  };

  const scrollToContainerTop = (behavior: ScrollBehavior = "smooth") => {
    // 1. Traverse upwards from rootContainerRef and scroll all ancestors
    let parent: HTMLElement | null = rootContainerRef.current;
    while (parent) {
      if (parent.scrollHeight > parent.clientHeight && parent.clientHeight > 0) {
        try {
          parent.scrollTo({ top: 0, behavior });
        } catch {
          parent.scrollTop = 0;
        }
      }
      parent = parent.parentElement;
    }

    // 2. Scroll any element with overflow-y-auto in the viewport
    const scrollContainers = document.querySelectorAll(".overflow-y-auto");
    scrollContainers.forEach((el) => {
      try {
        el.scrollTo({ top: 0, behavior });
      } catch {
        (el as HTMLElement).scrollTop = 0;
      }
    });

    // 3. Scroll window and document elements
    try {
      window.scrollTo({ top: 0, behavior });
    } catch {
      window.scroll(0, 0);
    }
    if (document.documentElement) {
      try {
        document.documentElement.scrollTo({ top: 0, behavior });
      } catch {
        document.documentElement.scrollTop = 0;
      }
    }
    if (document.body) {
      try {
        document.body.scrollTo({ top: 0, behavior });
      } catch {
        document.body.scrollTop = 0;
      }
    }
  };

  // When opening or switching course: always reset scroll position to top
  useEffect(() => {
    if (activeCourse) {
      scrollToContainerTop("instant");
      const raf = requestAnimationFrame(() => {
        scrollToContainerTop("instant");
      });
      const timer = setTimeout(() => {
        scrollToContainerTop("instant");
      }, 50);
      lastActiveDocStepIdxRef.current = 0;
      setActiveDocStepIdx(0);
      setStepIdx(0);
      return () => {
        cancelAnimationFrame(raf);
        clearTimeout(timer);
      };
    }
  }, [activeCourse?.id]);

  // Synchronize TOC active item while scrolling in document view mode
  useEffect(() => {
    if (viewMode !== "document" || !activeCourse) return;

    let rafId: number | null = null;

    const updateActiveStep = () => {
      rafId = null;
      const schritte = activeCourse.schritte;
      if (!schritte || schritte.length === 0) return;

      const container = findScrollContainer();

      // Check if user is scrolled to near bottom of document
      if (container) {
        const isNearBottom = container.scrollHeight - container.scrollTop - container.clientHeight < 80;
        if (isNearBottom) {
          const lastIdx = schritte.length - 1;
          if (lastActiveDocStepIdxRef.current !== lastIdx) {
            lastActiveDocStepIdxRef.current = lastIdx;
            setActiveDocStepIdx(lastIdx);
          }
          return;
        }
      }

      const containerTop = container ? container.getBoundingClientRect().top : 0;
      let currentIdx = 0;

      for (let i = 0; i < schritte.length; i++) {
        const el = document.getElementById(`schritt-${schritte[i].stepNumber}`);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top - containerTop <= 220) {
            currentIdx = i;
          }
        }
      }

      if (lastActiveDocStepIdxRef.current !== currentIdx) {
        lastActiveDocStepIdxRef.current = currentIdx;
        setActiveDocStepIdx(currentIdx);
      }
    };

    const handleScroll = () => {
      if (rafId === null) {
        rafId = requestAnimationFrame(updateActiveStep);
      }
    };

    // Capture phase intercepts scroll events from ANY scrollable container in the document
    document.addEventListener("scroll", handleScroll, { capture: true, passive: true });
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });

    // Initial evaluation
    updateActiveStep();

    return () => {
      if (rafId !== null) {
        cancelAnimationFrame(rafId);
      }
      document.removeEventListener("scroll", handleScroll, { capture: true });
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [viewMode, activeCourse]);

  useEffect(() => {
    if (initialCourseId) {
      const found = allReisen.find(
        (r) => r.id === initialCourseId || r.path === initialCourseId || r.id.endsWith(initialCourseId)
      );
      if (found) {
        setActiveCourse(resolveCourseForAudience(found, allReisen, lang));
      }
    } else if (activeCourse && lang === "de" && !activeCourse.path.includes("-DE-")) {
      const resolved = resolveCourseForAudience(activeCourse, allReisen, "de");
      if (resolved.id !== activeCourse.id) {
        setActiveCourse(resolved);
      }
    }
  }, [initialCourseId, allReisen, lang, activeCourse]);

  // Wizard filters
  const [wizardFach, setWizardFach] = useState<string>("SoWi");
  const [wizardZiel, setWizardZiel] = useState<string>("alle");
  const [wizardEdition, setWizardEdition] = useState<"alle" | "de" | "bilingual">("alle");
  const [courseQuery, setCourseQuery] = useState<string>("");

  // Gamification progress state
  const [progress, setProgress] = useState<ProgressData>(loadProgress);

  // Per-course step gating unlock state: set of unlocked step indices
  const [unlocked, setUnlocked] = useState<number[]>([0]);

  // Step 2 (Ausprobieren) state
  const [tryInput, setTryInput] = useState("");
  const [tryImage, setTryImage] = useState<string | null>(null);
  const [tryShowHelp, setTryShowHelp] = useState(false);
  const [tryFeedback, setTryFeedback] = useState<string | null>(null);

  // Multi-step document state maps
  const [tryInputMap, setTryInputMap] = useState<Record<number, string>>({});
  const [tryImageMap, setTryImageMap] = useState<Record<number, string | null>>({});
  const [tryFeedbackMap, setTryFeedbackMap] = useState<Record<number, string | null>>({});
  const [tryShowHelpMap, setTryShowHelpMap] = useState<Record<number, boolean>>({});

  const getTryInput = (idx: number) => tryInputMap[idx] ?? tryInput;
  const setTryInputFor = (idx: number, val: string) => {
    setTryInput(val);
    setTryInputMap((prev) => ({ ...prev, [idx]: val }));
  };
  const getTryImage = (idx: number) => tryImageMap[idx] ?? tryImage;
  const setTryImageFor = (idx: number, img: string | null) => {
    setTryImage(img);
    setTryImageMap((prev) => ({ ...prev, [idx]: img }));
  };
  const getTryFeedback = (idx: number) => tryFeedbackMap[idx] ?? tryFeedback;
  const setTryFeedbackFor = (idx: number, fb: string | null) => {
    setTryFeedback(fb);
    setTryFeedbackMap((prev) => ({ ...prev, [idx]: fb }));
  };
  const getTryShowHelp = (idx: number) => tryShowHelpMap[idx] ?? tryShowHelp;
  const toggleTryShowHelpFor = (idx: number) => {
    setTryShowHelp((prev) => !prev);
    setTryShowHelpMap((prev) => ({ ...prev, [idx]: !prev[idx] }));
  };

  // Step 3 (Check) state: checks per item
  const [checkPassed, setCheckPassed] = useState<Record<string, boolean>>({});
  const [checkRevealed, setCheckRevealed] = useState<Record<string, boolean>>({});
  const [copiedPatch, setCopiedPatch] = useState(false);
  // FelloFish-schleife:默写-text + score-box je item
  const [checkText, setCheckText] = useState<Record<string, string>>({});
  const [checkScore, setCheckScore] = useState<Record<string, { loading: boolean; text: string; rounds: number }>>({});

  // Step 4 (Szenario) state
  const [szenarioText, setSzenarioText] = useState("");
  const [szenarioImage, setSzenarioImage] = useState<string | null>(null);
  const [szenarioSec, setSzenarioSec] = useState(0);
  const [szenarioRunning, setSzenarioRunning] = useState(false);
  const [rubricChecks, setRubricChecks] = useState<boolean[]>([]);

  // Step 5 (Mündlich) state
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [recording, setRecording] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const [oralChecks, setOralChecks] = useState<boolean[]>([]);
  const [oralText, setOralText] = useState("");
  const [oralScore, setOralScore] = useState<{ loading: boolean; text: string; rounds: number }>({
    loading: false,
    text: "",
    rounds: 0,
  });

  // D2/D3: KI-boxen je schritt (key kurs#step); engine-aus -> still (statik steht)
  interface KiBox {
    loading: boolean;
    text: string;
    chat: { q: string; a: string }[];
  }
  const [kiStore, setKiStore] = useState<Record<string, KiBox>>({});
  const [kiFollow, setKiFollow] = useState("");
  const [checkWhy, setCheckWhy] = useState<Record<string, { loading: boolean; text: string }>>({});
  const [szenarioScore, setSzenarioScore] = useState<{ loading: boolean; text: string; rounds: number }>({
    loading: false,
    text: "",
    rounds: 0,
  });

  const kiOn = () => describeActiveEngine() !== "off";
  // B: engine aus -> KI-knoepfe sichtbar disabled statt still-tot (nutzer-bug Schritt6)
  const kiOff = !kiOn();
  const kiOffSuffix =
    lang === "de" ? " (KI aus)" : "（AI未开启）";
  const kiOffTitle =
    lang === "de"
      ? "KI-Engine ist aus — in AI-Einstellungen (Zahnrad) einschalten: API-direkt oder Lokal."
      : "AI引擎未开启——点顶栏齿轮去AI设置打开：API直连或本地模型。";

  const askKi = async (msgs: ChatMsg[], opts?: { image?: string }): Promise<string | null> => {
    try {
      return await chat(msgs, { temperature: 0.3, maxTokens: 600, ...opts });
    } catch {
      return null;
    }
  };

  // Reset step states when activeCourse changes
  useEffect(() => {
    if (activeCourse) {
      setStepIdx(0);
      setUnlocked([0]);
      setTryInput("");
      setTryImage(null);
      setTryShowHelp(false);
      setTryFeedback(null);
      setCheckPassed({});
      setCheckRevealed({});
      setCheckText({});
      setCheckScore({});
      setSzenarioText("");
      setSzenarioImage(null);
      setSzenarioSec(0);
      setSzenarioRunning(false);
      const step4 = activeCourse.schritte.find((s) => s.typ === "szenario") as
        | SchrittSzenario
        | undefined;
      setRubricChecks(step4 ? step4.rubricPoints.map(() => false) : []);
      const step5 = activeCourse.schritte.find((s) => s.typ === "muendlich") as
        | SchrittMuendlich
        | undefined;
      setOralChecks(step5 ? step5.selbstcheck.map(() => false) : []);
      setOralText("");
      setOralScore({ loading: false, text: "", rounds: 0 });
      setKiStore({});
      setKiFollow("");
      setCheckWhy({});
      setSzenarioScore({ loading: false, text: "", rounds: 0 });
    }
  }, [activeCourse]);

  // Scenario timer tick
  useEffect(() => {
    if (!szenarioRunning) return;
    const id = setInterval(() => setSzenarioSec((s) => s + 1), 1000);
    return () => clearInterval(id);
  }, [szenarioRunning]);

  // Award XP and sync streak
  const addXP = (amount: number, stepIndex: number) => {
    setProgress((prev) => {
      const newDone = {
        ...prev.done,
        [activeCourse?.id ?? "default"]: Math.max(
          prev.done[activeCourse?.id ?? "default"] ?? 0,
          stepIndex + 1
        ),
      };
      const newStreak = updateStreak(prev.streak);
      const fachId = activeCourse?.fach ?? "Allgemein";
      const newBadges = {
        ...prev.badges,
        [fachId]: Math.max(prev.badges[fachId] ?? 0, activeCourse?.level ?? 1),
      };
      const updated: ProgressData = {
        xp: prev.xp + amount,
        streak: newStreak,
        badges: newBadges,
        done: newDone,
      };
      saveProgress(updated);
      return updated;
    });
  };

  const unlockNextStep = (nextIdx: number, xpReward: number) => {
    if (!unlocked.includes(nextIdx)) {
      setUnlocked((prev) => [...prev, nextIdx]);
      addXP(xpReward, nextIdx - 1);
    }
  };

  // Relative navigation: works for any course layout (v3 courses have
  // 8 steps with repeated typs, so fixed indices 1/2/3 are wrong).
  // Advances to stepIdx+1, or finishes the course on the last step.
  const isLastStep =
    !!activeCourse && stepIdx + 1 >= activeCourse.schritte.length;
  const goNextOrFinish = (xpReward: number) => {
    if (!activeCourse) return;
    if (stepIdx + 1 < activeCourse.schritte.length) {
      unlockNextStep(stepIdx + 1, xpReward);
      setStepIdx(stepIdx + 1);
    } else {
      addXP(xpReward, stepIdx);
      alert(
        lang === "de"
          ? `Kurs abgeschlossen! +${xpReward} XP`
          : `恭喜完成本课程！+${xpReward} XP`
      );
      setActiveCourse(null);
    }
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (isTyping()) return;

      if (matchesKey(e, PER_MODULE_KEYS.reise[0])) {
        if (activeCourse && stepIdx < activeCourse.schritte.length - 1 && unlocked.includes(stepIdx + 1)) {
          e.preventDefault();
          setStepIdx((index) => index + 1);
        }
      } else if (
        matchesKey(e, PER_MODULE_KEYS.reise[1]) &&
        activeCourse?.schritte[stepIdx]?.typ === "szenario"
      ) {
        e.preventDefault();
        setSzenarioRunning((running) => !running);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [activeCourse, stepIdx, unlocked]);

  // Audio recording handlers for oral step
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      audioChunksRef.current = [];
      const mr = new MediaRecorder(stream);
      mr.ondataavailable = (e) => {
        if (e.data.size > 0) audioChunksRef.current.push(e.data);
      };
      mr.onstop = () => {
        const blob = new Blob(audioChunksRef.current, { type: "audio/webm" });
        const url = URL.createObjectURL(blob);
        setAudioUrl(url);
        stream.getTracks().forEach((track) => track.stop());
      };
      mediaRecorderRef.current = mr;
      mr.start();
      setRecording(true);
    } catch {
      alert(
        lang === "de"
          ? "Mikrofon-Zugriff nicht verfügbar oder verweigert."
          : "无法访问麦克风或权限被拒绝。"
      );
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && recording) {
      mediaRecorderRef.current.stop();
      setRecording(false);
    }
  };

  // Filtered courses for wizard
  const wizardCourses = useMemo(() => {
    const q = courseQuery.trim().toLowerCase();
    return allReisen.filter((r) => {
      const matchFach =
        wizardFach === "alle" || r.fach.toLowerCase() === wizardFach.toLowerCase();
      const matchZiel =
        wizardZiel === "alle" || r.ziel.toLowerCase() === wizardZiel.toLowerCase();
      const isDe = r.path.includes("-DE-");
      const isBilingual = !isDe;
      const matchEdition =
        wizardEdition === "alle"
          ? true
          : wizardEdition === "de"
          ? isDe
          : isBilingual;
      const matchQuery =
        !q ||
        r.thema.toLowerCase().includes(q) ||
        r.fach.toLowerCase().includes(q) ||
        (r.tags && r.tags.some((t) => t.toLowerCase().includes(q)));
      return matchFach && matchZiel && matchEdition && matchQuery;
    });
  }, [allReisen, wizardFach, wizardZiel, wizardEdition, courseQuery]);

  const currentSchritt = activeCourse?.schritte[stepIdx];

  const stepKey =
    activeCourse && currentSchritt ? `${activeCourse.id}#${currentSchritt.stepNumber}` : "";

  // D2: entdecken-schritt betreten -> KI-erklaerung automatisch (nur wenn engine an)
  useEffect(() => {
    if (!activeCourse || !currentSchritt || currentSchritt.typ !== "entdecken" || !stepKey) return;
    const box = kiStore[stepKey];
    if (box?.text || box?.loading) return;
    if (describeActiveEngine() === "off") return;
    const s = currentSchritt as SchrittEntdecken;
    const fach = activeCourse.fach;
    const thema = activeCourse.thema;
    setKiStore((prev) => ({ ...prev, [stepKey]: { loading: true, text: "", chat: [] } }));
    void askKi(buildExplainPrompt(fach, thema, s.title, s.rawText, ""))
      .then((r) =>
        setKiStore((prev) => ({ ...prev, [stepKey]: { loading: false, text: r ?? "", chat: [] } }))
      );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stepKey]);

  const sendKiFollow = () => {
    const q = kiFollow.trim();
    if (!q || !stepKey || !activeCourse) return;
    const box = kiStore[stepKey];
    setKiFollow("");
    setKiStore((prev) => ({
      ...prev,
      [stepKey]: { loading: true, text: prev[stepKey]?.text ?? "", chat: prev[stepKey]?.chat ?? [] },
    }));
    const hist = (box?.chat ?? []).slice(-3).map((c) => `F: ${c.q}\nA: ${c.a}`).join("\n");
    void askKi([
      { role: "system", content: REISE_SYSTEM },
      {
        role: "user",
        content: `Kurs ${activeCourse.thema} (${activeCourse.fach}). Bisher erklärt: ${(box?.text ?? "").slice(0, 500)}\n${hist}\nRückfrage: ${q}`,
      },
    ]).then((a) =>
      setKiStore((prev) => {
        const b = prev[stepKey] ?? { loading: false, text: "", chat: [] };
        return {
          ...prev,
          [stepKey]: { ...b, loading: false, chat: [...b.chat, { q, a: a ?? "(KI derzeit nicht erreichbar. / AI暂时不可用。)" }] },
        };
      })
    );
  };

  // Report live position to the global feedback float
  useEffect(() => {
    if (activeCourse) {
      const curIdx = viewMode === "document" ? activeDocStepIdx : stepIdx;
      const s = activeCourse.schritte[curIdx];
      setFeedbackContext(
        `${activeCourse.id}#Schritt${s?.stepNumber ?? curIdx + 1}`
      );
    } else {
      setFeedbackContext("reise:katalog");
    }
  }, [activeCourse, stepIdx, activeDocStepIdx, viewMode]);

  // Helper formatting for seconds to mm:ss
  const formatTime = (total: number) => {
    const mm = String(Math.floor(total / 60)).padStart(2, "0");
    const ss = String(total % 60).padStart(2, "0");
    return `${mm}:${ss}`;
  };

  const renderSchrittContent = (s: Schritt, idx: number, isDoc: boolean) => {
    if (!activeCourse) return null;

    // STEP 1/8: ENTDECKEN / REFLEXION (讲解 / 结课反思)
    if (s.typ === "entdecken" || s.typ === "reflexion") {
      const stepEnt = s as SchrittEntdecken | SchrittReflexion;
      const sKey = `${activeCourse.id}#${s.stepNumber}`;
      const box = kiStore[sKey];

      return (
        <div className="space-y-6">
          <div className="prose max-w-none">
            <Blocks
              blocks={stepEnt.blocks}
              pureGerman={lang === "de"}
              renderDiagram={(spec, i) => (
                <DiagramFig
                  spec={spec}
                  courseId={activeCourse.id}
                  step={s.stepNumber}
                  index={i}
                  thema={activeCourse.thema}
                  fach={activeCourse.fach}
                  lang={lang}
                />
              )}
            />
          </div>

          {/* Eingebettetes didaktisches Werkzeug falls im Text deklariert */}
          {(() => {
            const raw = stepEnt.rawText || "";
            const match = /\[Werkzeug:\s*([a-zA-Z0-9_\-]+)\]/i.exec(raw);
            const tool = s.toolId || (match ? match[1] : null);
            return tool ? renderEmbeddedTool(tool, lang, activeCourse.fach, activeCourse.thema) : null;
          })()}

          {/* D2: KI-erklaerung (auto) + rueckfragen */}
          {(box?.loading || box?.text) && (
            <div
              aria-live="polite"
              aria-busy={box.loading}
              className="rounded-[var(--radius)] border border-[var(--accent)]/30 bg-[var(--paper-subtle)] p-4 space-y-3"
            >
              <div className="font-mono text-[var(--text-meta)] uppercase tracking-wider text-[var(--accent)]">
                KI-Erklärung · AI讲解
              </div>
              {box.loading && !box.text ? (
                <div role="status" className="font-sans text-sm text-[var(--gray)]">
                  {lang === "de" ? "KI erklärt …" : "AI讲解中…"}
                </div>
              ) : (
                <div className="font-sans text-sm leading-relaxed text-[var(--ink)] whitespace-pre-wrap">
                  {box.text}
                </div>
              )}
              {box.chat.map((c, i) => (
                <div key={i} className="space-y-1 border-t border-[var(--line)] pt-2">
                  <div className="font-sans text-xs text-[var(--gray)]">→ {c.q}</div>
                  <div className="font-sans text-sm leading-relaxed text-[var(--ink)] whitespace-pre-wrap">
                    {c.a}
                  </div>
                </div>
              ))}
              <div className="flex flex-wrap gap-2">
                <input
                  value={kiFollow}
                  onChange={(e) => setKiFollow(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") sendKiFollow();
                  }}
                  placeholder={lang === "de" ? "Nachfragen …" : "追问…"}
                  className="flex-1 rounded-[var(--radius)] border border-[var(--line)] bg-[var(--surface)] px-2 py-1.5 font-sans text-sm text-[var(--ink)] focus:border-[var(--accent)] focus:outline-none"
                />
                <button
                  type="button"
                  onClick={sendKiFollow}
                  className="rounded-[var(--radius)] border border-[var(--ink)] bg-[var(--ink)] px-3 py-1.5 font-mono text-xs text-[var(--paper)] hover:bg-[var(--accent)] hover:border-[var(--accent)] active:scale-95 transition-all"
                >
                  {lang === "de" ? "Fragen" : "发送"}
                </button>
              </div>
            </div>
          )}

          <div className="pt-4 border-t border-[var(--line)] flex flex-wrap items-center justify-between gap-3">
            <div className="text-xs font-mono text-[var(--gray)]">
              {unlocked.includes(idx + 1) ? (
                <span className="text-[var(--accent)] font-semibold flex items-center gap-1">
                  <CheckMarkSvg /> {lang === "de" ? "Abschnitt gelesen" : "本节已阅读"}
                </span>
              ) : null}
            </div>
            {!isDoc ? (
              <button
                type="button"
                onClick={() => goNextOrFinish(5)}
                className="px-4 py-2 font-mono text-xs uppercase tracking-wider bg-[var(--ink)] text-[var(--paper)] hover:bg-[var(--accent)] rounded-[var(--radius)] transition-colors whitespace-normal text-center"
              >
                {isLastStep
                  ? lang === "de"
                    ? "Abschließen (+5 XP)"
                    : "完成课程 (+5 XP)"
                  : lang === "de"
                  ? "Weiter (+5 XP) →"
                  : "已理解，下一步 (+5 XP) →"}
              </button>
            ) : (
              !unlocked.includes(idx + 1) && (
                <button
                  type="button"
                  onClick={() => unlockNextStep(idx + 1, 5)}
                  className="px-3 py-1.5 font-mono text-xs uppercase border border-[var(--accent)] text-[var(--accent)] hover:bg-[var(--accent)]/10 rounded-[var(--radius)] transition-colors"
                >
                  {lang === "de" ? "Als verstanden markieren (+5 XP)" : "标记为已理解 (+5 XP)"}
                </button>
              )
            )}
          </div>
        </div>
      );
    }

    // STEP 2: AUSPROBIEREN (动手)
    if (s.typ === "ausprobieren") {
      const stepAus = s as SchrittAusprobieren;
      const aufgabe = stepAus.aufgabe || "";
      const cleanAufgabe = aufgabe.replace(/\[Werkzeug:\s*[a-zA-Z0-9_\-]+\]/gi, "").trim();
      const toolMatch = /\[Werkzeug:\s*([a-zA-Z0-9_\-]+)\]/i.exec(aufgabe);
      const isDuelStep =
        s.stepNumber === 5 ||
        cleanAufgabe.includes("VERGLEICH") ||
        (s.title && s.title.toLowerCase().includes("duell"));
      const tool =
        stepAus.toolId ||
        (toolMatch ? toolMatch[1] : null) ||
        (!isDuelStep && s.stepNumber === 4 ? getAutoToolForContext(activeCourse.fach, activeCourse.thema) : null);

      const curInput = isDoc ? getTryInput(s.stepNumber) : tryInput;
      const curImage = isDoc ? getTryImage(s.stepNumber) : tryImage;
      const curShowHelp = isDoc ? getTryShowHelp(s.stepNumber) : tryShowHelp;
      const curFeedback = isDoc ? getTryFeedback(s.stepNumber) : tryFeedback;

      return (
        <div className="space-y-5">
          {/* Header Banner for Step 4 vs Step 5 */}
          <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider font-semibold">
            {s.stepNumber === 5 || cleanAufgabe.includes("VERGLEICH") ? (
              <span className="px-2.5 py-1 rounded-[var(--radius)] bg-[var(--accent)]/10 text-[var(--accent)] border border-[var(--accent)]/30 flex items-center gap-1.5">
                <BalanceScaleSvg />
                <span>METHODEN-VERGLEICH & ENTSCHEIDUNGSWEICHE (Weg A vs. Weg B)</span>
              </span>
            ) : (
              <span className="px-2.5 py-1 rounded-[var(--radius)] bg-[var(--accent)]/10 text-[var(--accent)] border border-[var(--accent)]/30 flex items-center gap-1.5">
                <GamepadSvg />
                <span>INTERAKTIVE SANDKASTEN-CHALLENGE</span>
              </span>
            )}
          </div>

          <div className="border border-[var(--line)] bg-[var(--surface)] p-4 sm:p-5 rounded-[var(--radius)] font-serif text-base text-[var(--ink)] leading-relaxed shadow-none">
            {renderFormattedText(cleanAufgabe)}
          </div>

          {tool && renderEmbeddedTool(tool, lang, activeCourse.fach, activeCourse.thema)}

          {stepAus.hilfe && (
            <div className="rounded-[var(--radius)] border border-[var(--line)] bg-[var(--paper-subtle)] p-3.5 space-y-2">
              <button
                type="button"
                onClick={() => (isDoc ? toggleTryShowHelpFor(s.stepNumber) : setTryShowHelp((h) => !h))}
                className="text-xs font-mono font-medium text-[var(--accent)] hover:underline flex items-center gap-1.5"
              >
                <LightbulbSvg />
                <span>{curShowHelp ? (lang === "de" ? "Hilfe & Denkanstoß verbergen" : "隐藏解题提示") : (lang === "de" ? "Hilfe & Denkanstoß anzeigen" : "显示解题提示与思路支架")}</span>
              </button>
              {curShowHelp && (
                <div className="mt-2 pt-2 border-t border-[var(--line)] text-xs font-sans text-[var(--ink)] leading-relaxed">
                  {renderFormattedText(stepAus.hilfe)}
                </div>
              )}
            </div>
          )}

          <div className="space-y-2">
            <label className="block text-xs font-mono uppercase text-[var(--gray)]">
              {lang === "de" ? "Deine Antwort:" : "Deine Antwort / 你的作答："}
            </label>
            <textarea
              rows={3}
              value={curInput}
              onChange={(e) =>
                isDoc ? setTryInputFor(s.stepNumber, e.target.value) : setTryInput(e.target.value)
              }
              placeholder={lang === "de" ? "Hier Antwort eingeben …" : "Hier zuordnen oder Stichpunkte eingeben..."}
              className="w-full border border-[var(--line)] p-3 text-sm font-sans rounded-[var(--radius)] focus:border-[var(--accent)] focus:outline-none"
            />
            <ImageAnswerUpload
              lang={lang}
              onImageSelected={(img) =>
                isDoc ? setTryImageFor(s.stepNumber, img) : setTryImage(img)
              }
              onTextTranscribed={(transcription) => {
                const prev = curInput;
                const nextVal = prev.trim() ? prev + "\n\n" + transcription : transcription;
                if (isDoc) setTryInputFor(s.stepNumber, nextVal);
                else setTryInput(nextVal);
              }}
            />
          </div>

          {curFeedback && (
            <div
              role="status"
              aria-live="polite"
              aria-atomic="true"
              className="border border-[var(--accent)]/30 bg-[var(--paper-subtle)] p-3 text-xs font-mono text-[var(--ink)] rounded-[var(--radius)] whitespace-pre-wrap leading-relaxed"
            >
              {curFeedback}
            </div>
          )}

          <div className="flex flex-wrap items-center justify-between gap-3 border-t border-[var(--line)] pt-4">
            <button
              type="button"
              onClick={() => {
                if (!curInput.trim() && !curImage) {
                  const msg =
                    lang === "de"
                      ? "Bitte zuerst einen Antwortversuch eingeben oder Bild hochladen."
                      : "请先输入作答或上传手写作答图片。";
                  if (isDoc) setTryFeedbackFor(s.stepNumber, msg);
                  else setTryFeedback(msg);
                  return;
                }
                if (!kiOn()) {
                  const msg =
                    lang === "de"
                      ? "Versuch notiert — prüfe dich mit der Musterlösung."
                      : "Versuch notiert — prüfe dich mit der Musterlösung / 已记录作答，对照解析自查。";
                  if (isDoc) setTryFeedbackFor(s.stepNumber, msg);
                  else setTryFeedback(msg);
                } else {
                  const waitMsg = lang === "de" ? "KI liest mit …" : "KI liest mit … / AI正在点评…";
                  if (isDoc) setTryFeedbackFor(s.stepNumber, waitMsg);
                  else setTryFeedback(waitMsg);
                  void askKi(
                    buildTryFeedbackPrompt(
                      activeCourse.thema,
                      stepAus.aufgabe,
                      stepAus.antwort ?? "",
                      curInput || (curImage ? "[Siehe hochgeladenes Bild / 见上传手写作答]" : "")
                    ),
                    curImage ? { image: curImage } : undefined
                  ).then((r) => {
                    const resMsg =
                      r ??
                      (lang === "de"
                        ? "Versuch notiert — prüfe dich mit der Musterlösung."
                        : "Versuch notiert — prüfe dich mit der Musterlösung / 已记录作答，对照解析自查。");
                    if (isDoc) setTryFeedbackFor(s.stepNumber, resMsg);
                    else setTryFeedback(resMsg);
                  });
                }
                unlockNextStep(idx + 1, 15);
              }}
              className="px-4 py-2 font-mono text-xs uppercase border border-[var(--line)] hover:border-[var(--ink)] rounded-[var(--radius)] transition-colors text-[var(--ink)] whitespace-normal text-center"
            >
              {lang === "de" ? "Antwort prüfen" : "检查答案"}
            </button>

            {!isDoc ? (
              <button
                type="button"
                disabled={!unlocked.includes(stepIdx + 1)}
                onClick={() => goNextOrFinish(15)}
                className={`px-5 py-2 font-mono text-xs uppercase tracking-wider rounded-[var(--radius)] transition-colors ${
                  unlocked.includes(stepIdx + 1)
                    ? "bg-[var(--ink)] text-[var(--paper)] hover:bg-[var(--accent)]"
                    : "bg-[var(--line)] text-[var(--gray)] cursor-not-allowed"
                }`}
              >
                {isLastStep
                  ? lang === "de"
                    ? "Abschließen (+15 XP)"
                    : "完成课程 (+15 XP)"
                  : lang === "de"
                  ? "Weiter (+15 XP) →"
                  : "下一步 (+15 XP) →"}
              </button>
            ) : (
              unlocked.includes(idx + 1) && (
                <span className="text-xs font-mono text-[var(--accent)] font-semibold flex items-center gap-1">
                  <CheckMarkSvg /> {lang === "de" ? "Erledigt (+15 XP)" : "已完成 (+15 XP)"}
                </span>
              )
            )}
          </div>
        </div>
      );
    }

    // STEP 3: CHECK (过关题)
    if (s.typ === "check") {
      const stepCheck = s as SchrittCheck;
      const checkItems = stepCheck.items;
      const allDone = checkItems.length > 0 && checkItems.every((item) => checkPassed[item.id]);

      return (
        <div className="space-y-6">
          <div className="divide-y divide-[var(--line)] border-y border-[var(--line)]">
            {checkItems.map((item, itemIdx) => {
              const isPassed = checkPassed[item.id];
              const isRevealed = checkRevealed[item.id];

              return (
                <div key={item.id} className="p-4 space-y-2">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1">
                      <span className="font-mono text-xs font-semibold text-[var(--ink)] mr-2">
                        Frage {itemIdx + 1}:
                      </span>
                      <span className="font-serif text-sm text-[var(--ink)]">
                        {renderFormattedText(item.frage)}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() =>
                        setCheckRevealed((prev) => ({
                          ...prev,
                          [item.id]: !prev[item.id],
                        }))
                      }
                      className="text-xs font-mono text-[var(--gray)] hover:text-[var(--accent)]"
                    >
                      {isRevealed ? "[Antwort]" : "[Lösung zeigen]"}
                    </button>
                  </div>

                  {isRevealed && (
                    <div className="border-l-2 border-[var(--accent)] pl-3 text-xs font-mono text-[var(--gray)] bg-[var(--paper-subtle)] py-1.5">
                      Erwartete Punkte: {renderFormattedText(item.antwort)}
                    </div>
                  )}

                  {/* FelloFish:默写→AI打分·纠错·教学→再练 */}
                  <div className="space-y-2">
                    <textarea
                      rows={2}
                      value={checkText[item.id] ?? ""}
                      onChange={(e) =>
                        setCheckText((prev) => ({ ...prev, [item.id]: e.target.value }))
                      }
                      placeholder={lang === "de" ? "Antwort aus dem Kopf herschreiben …" : "合书默写答案…（先自己写，再点AI批改）"}
                      className="w-full border border-[var(--line)] p-2.5 text-sm font-sans rounded-[var(--radius)] focus:border-[var(--accent)] focus:outline-none"
                    />
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        disabled={!(checkText[item.id] ?? "").trim() || checkScore[item.id]?.loading || kiOff}
                        title={kiOff ? kiOffTitle : undefined}
                        onClick={() => {
                          if (kiOff || checkScore[item.id]?.loading) return;
                          setCheckScore((prev) => ({
                            ...prev,
                            [item.id]: { loading: true, text: prev[item.id]?.text ?? "", rounds: prev[item.id]?.rounds ?? 0 },
                          }));
                          void askKi(
                            buildCheckScorePrompt(item.frage, item.antwort, checkText[item.id] ?? "", activeCourse.thema)
                          ).then((r) =>
                            setCheckScore((prev) => ({
                              ...prev,
                              [item.id]: {
                                loading: false,
                                text: r ?? "(KI derzeit nicht erreichbar. / AI暂时不可用。)",
                                rounds: (prev[item.id]?.rounds ?? 0) + 1,
                              },
                            }))
                          );
                        }}
                        className={`px-2.5 py-1 text-xs font-mono rounded-[var(--radius)] border transition-all ${
                          !(checkText[item.id] ?? "").trim() || checkScore[item.id]?.loading || kiOff
                            ? "border-[var(--line)] text-[var(--gray)]/50 cursor-not-allowed"
                            : "border-[var(--accent)] text-[var(--accent)] hover:bg-[var(--accent)]/5 active:scale-95"
                        }`}
                      >
                        {checkScore[item.id]?.loading
                          ? lang === "de" ? "KI liest …" : "AI批改中…"
                          : (checkScore[item.id]?.rounds ?? 0) === 0
                            ? lang === "de" ? `KI bewerten${kiOff ? kiOffSuffix : ""}` : `AI批改·打分${kiOff ? kiOffSuffix : ""}`
                            : lang === "de"
                              ? `Erneut prüfen (${checkScore[item.id]?.rounds})`
                              : `改完再评（第${checkScore[item.id]?.rounds}轮）`}
                      </button>
                    </div>
                    {checkScore[item.id]?.text && (
                      <div role="status" aria-live="polite" aria-atomic="true" className="border-l-2 border-[var(--accent)] pl-3 text-xs font-sans text-[var(--ink)] bg-[var(--paper-subtle)] py-1.5 whitespace-pre-wrap leading-relaxed">
                        {checkScore[item.id].text}
                      </div>
                    )}
                  </div>

                  <div className="flex items-center justify-end gap-2 pt-1">
                    {/* D2: KI-erklaerung zum warum */}
                    <button
                      type="button"
                      disabled={kiOff}
                      title={kiOff ? kiOffTitle : undefined}
                      onClick={() => {
                        if (!kiOn() || checkWhy[item.id]?.loading) return;
                        setCheckWhy((prev) => ({ ...prev, [item.id]: { loading: true, text: "" } }));
                        void askKi(
                          buildCheckExplainPrompt(item.frage, item.antwort, activeCourse.thema)
                        ).then((r) =>
                          setCheckWhy((prev) => ({
                            ...prev,
                            [item.id]: {
                              loading: false,
                              text: r ?? "(KI derzeit nicht erreichbar. / AI暂时不可用。)",
                            },
                          }))
                        );
                      }}
                      className={`px-2.5 py-1 text-xs font-mono rounded-[var(--radius)] border border-[var(--line)] transition-all ${
                        kiOff
                          ? "text-[var(--gray)]/50 cursor-not-allowed"
                          : "text-[var(--gray)] hover:border-[var(--accent)] hover:text-[var(--accent)]"
                      }`}
                    >
                      {checkWhy[item.id]?.loading
                        ? "…"
                        : lang === "de"
                          ? `Warum? KI erklärt${kiOff ? kiOffSuffix : ""}`
                          : `为啥？AI讲解${kiOff ? kiOffSuffix : ""}`}
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setCheckPassed((prev) => ({
                          ...prev,
                          [item.id]: !prev[item.id],
                        }));
                      }}
                      className={`px-2.5 py-1 text-xs font-mono rounded-[var(--radius)] border ${
                        isPassed
                          ? "border-[var(--success)] bg-[var(--success)]/10 text-[var(--success)] font-semibold"
                          : "border-[var(--line)] text-[var(--gray)] hover:border-[var(--ink)]"
                      }`}
                    >
                      {isPassed
                        ? lang === "de"
                          ? "Bestanden"
                          : "Bestanden / 已掌握"
                        : lang === "de"
                        ? "Selbstcheck"
                        : "Selbstcheck / 标为通过"}
                    </button>
                  </div>
                  {checkWhy[item.id]?.text && (
                    <div role="status" aria-live="polite" aria-atomic="true" className="border-l-2 border-[var(--accent)] pl-3 text-xs font-sans text-[var(--ink)] bg-[var(--paper-subtle)] py-1.5 whitespace-pre-wrap leading-relaxed">
                      {checkWhy[item.id].text}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Fehlerlog Draft Specimen with Copy Button */}
          <div className="border border-dashed border-[var(--line)] bg-[var(--paper-subtle)] p-4 rounded-[var(--radius)]">
            <div className="flex items-center justify-between text-xs font-mono text-[var(--gray)] mb-2">
              <span>{lang === "de" ? "FEHLERLOG-ENTWURF" : "FEHLERLOG-ENTWURF / 错题补丁"}</span>
              <button
                type="button"
                onClick={() => {
                  const patch = `- [ ] [${activeCourse.fach}] ${activeCourse.thema}: Check-Fehler nacharbeiten`;
                  navigator.clipboard.writeText(patch);
                  setCopiedPatch(true);
                  setTimeout(() => setCopiedPatch(false), 2000);
                }}
                aria-live="polite"
                className="text-xs font-mono text-[var(--accent)] hover:underline"
              >
                {copiedPatch ? "Kopiert!" : lang === "de" ? "Kopieren" : "Kopieren / 复制补丁"}
              </button>
            </div>
            <code className="block bg-[var(--surface)] border border-[var(--line)] p-2.5 font-mono text-xs text-[var(--ink)] rounded-[var(--radius)]">
              - [ ] [{activeCourse.fach}] {activeCourse.thema}: Check-Fehler nacharbeiten
            </code>
          </div>

          {/* Gating Lock check */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-t border-[var(--line)] pt-4">
            <span className="text-xs font-mono text-[var(--gray)]">
              {allDone
                ? lang === "de" ? "Alle Fragen gemeistert" : "所有题目已全部掌握"
                : lang === "de" ? "Alle Fragen müssen als bestanden markiert sein." : "需将题目标为已掌握。"}
            </span>
            {!isDoc ? (
              <button
                type="button"
                disabled={!allDone}
                onClick={() => goNextOrFinish(20)}
                className={`px-5 py-2 font-mono text-xs uppercase tracking-wider rounded-[var(--radius)] transition-colors ${
                  allDone
                    ? "bg-[var(--ink)] text-[var(--paper)] hover:bg-[var(--accent)]"
                    : "bg-[var(--line)] text-[var(--gray)] cursor-not-allowed"
                }`}
              >
                {isLastStep
                  ? lang === "de"
                    ? "Abschließen (+20 XP)"
                    : "完成课程 (+20 XP)"
                  : lang === "de"
                  ? "Weiter (+20 XP) →"
                  : "下一步 (+20 XP) →"}
              </button>
            ) : (
              allDone && (
                <span className="text-xs font-mono text-[var(--accent)] font-semibold flex items-center gap-1">
                  <CheckMarkSvg /> {lang === "de" ? "Check bestanden (+20 XP)" : "已全部过关 (+20 XP)"}
                </span>
              )
            )}
          </div>
        </div>
      );
    }

    // STEP 4: SZENARIO (场景实战)
    if (s.typ === "szenario") {
      const stepSzen = s as SchrittSzenario;
      const rubricPassed = rubricChecks.filter(Boolean).length;

      return (
        <div className="space-y-5">
          <div className="border border-[var(--line)] bg-[var(--paper-subtle)] p-4 rounded-[var(--radius)] space-y-2">
            <div className="text-xs font-mono uppercase text-[var(--accent)]">
              Rolle: {stepSzen.rolle}
            </div>
            <div className="font-serif text-base text-[var(--ink)] leading-relaxed">
              {renderFormattedText(stepSzen.situation)}
            </div>
          </div>

          {/* Timer row */}
          <div className="flex flex-wrap items-center justify-between gap-3 border border-[var(--line)] p-3 rounded-[var(--radius)] bg-[var(--surface)]">
            <div className="flex items-baseline gap-2">
              <span className="font-mono text-2xl font-normal tabular-nums text-[var(--ink)]">
                {formatTime(szenarioSec)}
              </span>
              <span className="font-mono text-xs text-[var(--gray)]">
                / 02:00 {lang === "de" ? "Zielzeit" : "目标用时"}
              </span>
            </div>
            <button
              type="button"
              onClick={() => setSzenarioRunning((r) => !r)}
              className="px-3 py-1 font-mono text-xs uppercase border border-[var(--ink)] rounded-[var(--radius)] hover:bg-[var(--paper-subtle)]"
            >
              {szenarioRunning ? "Stopp" : "Start"}
            </button>
          </div>

          <div className="space-y-2">
            <label className="block text-xs font-mono uppercase text-[var(--gray)]">
              {lang === "de" ? "Plädoyer verfassen:" : "Plädoyer verfassen / 撰写辩论发言："}
            </label>
            <textarea
              rows={4}
              value={szenarioText}
              onChange={(e) => setSzenarioText(e.target.value)}
              placeholder={lang === "de" ? "Beginne mit einer klaren These …" : "Beginne mit einer klaren These..."}
              className="w-full border border-[var(--line)] p-3 text-sm font-serif rounded-[var(--radius)] focus:border-[var(--accent)] focus:outline-none"
            />
            <ImageAnswerUpload
              lang={lang}
              onImageSelected={setSzenarioImage}
              onTextTranscribed={(transcription) => {
                setSzenarioText((prev) => (prev.trim() ? prev + "\n\n" + transcription : transcription));
              }}
            />
          </div>

          {/* Rubric Checklist */}
          <div className="border border-[var(--line)] rounded-[var(--radius)] bg-[var(--paper-subtle)] p-4 space-y-2">
            <div className="text-xs font-mono uppercase text-[var(--gray)] tracking-wider mb-1">
              {lang === "de" ? "Kriterienkatalog (Rubric):" : "Rubric / 自评检查点（勾选核对）："}
            </div>
            {stepSzen.rubricPoints.map((p, i) => (
              <label key={i} className="flex items-start gap-2.5 text-xs font-mono text-[var(--ink)] cursor-pointer">
                <input
                  type="checkbox"
                  checked={rubricChecks[i] ?? false}
                  onChange={() =>
                    setRubricChecks((prev) =>
                      prev.map((v, j) => (j === i ? !v : v))
                    )
                  }
                  className="mt-0.5 h-3.5 w-3.5 accent-[var(--accent)]"
                />
                <span>{renderFormattedText(p)}</span>
              </label>
            ))}
          </div>

          {/* D3: KI-bewertung (FelloFish-stil) + ueberarbeiten-runden */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => {
                if ((!szenarioText.trim() && !szenarioImage) || szenarioScore.loading) return;
                if (!kiOn()) return;
                setSzenarioScore((prev) => ({ ...prev, loading: true }));
                void askKi(
                  buildSzenarioScorePrompt(
                    activeCourse.fach,
                    activeCourse.thema,
                    stepSzen.situation,
                    stepSzen.rubricPoints,
                    szenarioText || (szenarioImage ? (lang === "de" ? "[Siehe hochgeladenes Bild]" : "[Siehe hochgeladenes Dokument / 见上传手写与作答图]") : "")
                  ),
                  szenarioImage ? { image: szenarioImage } : undefined
                ).then((r) =>
                  setSzenarioScore((prev) => ({
                    loading: false,
                    text: r ?? (lang === "de" ? "(KI derzeit nicht erreichbar.)" : "(KI derzeit nicht erreichbar. / AI暂时不可用。)"),
                    rounds: prev.rounds + 1,
                  }))
                );
              }}
              disabled={(!szenarioText.trim() && !szenarioImage) || szenarioScore.loading || kiOff}
              title={kiOff ? kiOffTitle : undefined}
              className={`px-4 py-2 font-mono text-xs uppercase rounded-[var(--radius)] border transition-all ${
                (!szenarioText.trim() && !szenarioImage) || szenarioScore.loading || kiOff
                  ? "border-[var(--line)] text-[var(--gray)] cursor-not-allowed"
                  : "border-[var(--accent)] text-[var(--accent)] hover:bg-[var(--accent)]/5 active:scale-95"
              }`}
            >
              {szenarioScore.loading
                ? lang === "de" ? "KI liest …" : "AI批改中…"
                : szenarioScore.rounds === 0
                  ? lang === "de" ? `KI bewerten${kiOff ? kiOffSuffix : ""}` : `AI批改·打分${kiOff ? kiOffSuffix : ""}`
                  : lang === "de"
                    ? `Erneut bewerten (${szenarioScore.rounds})`
                    : `改完再评（第${szenarioScore.rounds}轮）`}
            </button>
            {szenarioScore.rounds > 0 && (
              <span className="font-mono text-[var(--text-meta)] text-[var(--gray)]">
                {lang === "de" ? `Durchgang ${szenarioScore.rounds}` : `第${szenarioScore.rounds}轮`}
              </span>
            )}
          </div>
          {szenarioScore.text && (
            <div role="status" aria-live="polite" aria-atomic="true" className="rounded-[var(--radius)] border border-[var(--accent)]/30 bg-[var(--paper-subtle)] p-4 font-sans text-sm leading-relaxed text-[var(--ink)] whitespace-pre-wrap">
              {szenarioScore.text}
            </div>
          )}

          <div className="flex flex-wrap items-center justify-between gap-3 border-t border-[var(--line)] pt-4">
            <span className="text-xs font-mono text-[var(--gray)]">
              {lang === "de" ? `Rubric: ${rubricPassed} Kriterien erfüllt` : `已核对 ${rubricPassed} 个评分点（需至少 2 点）`}
            </span>
            {!isDoc ? (
              <button
                type="button"
                disabled={rubricPassed < 2}
                onClick={() => goNextOrFinish(30)}
                className={`px-5 py-2 font-mono text-xs uppercase tracking-wider rounded-[var(--radius)] transition-colors ${
                  rubricPassed >= 2
                    ? "bg-[var(--ink)] text-[var(--paper)] hover:bg-[var(--accent)]"
                    : "bg-[var(--line)] text-[var(--gray)] cursor-not-allowed"
                }`}
              >
                {isLastStep
                  ? lang === "de"
                    ? "Abschließen (+30 XP)"
                    : "完成课程 (+30 XP)"
                  : lang === "de"
                  ? "Weiter (+30 XP) →"
                  : "下一步 (+30 XP) →"}
              </button>
            ) : (
              rubricPassed >= 2 && (
                <span className="text-xs font-mono text-[var(--accent)] font-semibold flex items-center gap-1">
                  <CheckMarkSvg /> {lang === "de" ? "Szenario gemeistert (+30 XP)" : "场景已掌握 (+30 XP)"}
                </span>
              )
            )}
          </div>
        </div>
      );
    }

    // STEP 5: MUENDLICH (口试模拟)
    if (s.typ === "muendlich") {
      const stepMu = s as SchrittMuendlich;

      return (
        <div className="space-y-6">
          <div className="border border-[var(--line)] bg-[var(--paper-subtle)] p-4 rounded-[var(--radius)] space-y-2">
            <div className="text-xs font-mono uppercase text-[var(--accent)] font-semibold">
              {lang === "de" ? "Prüfungsaufgabe (Ziehung):" : "考题抽签 (Ziehung)："}
            </div>
            <div className="font-serif text-base text-[var(--ink)] leading-relaxed">
              {renderFormattedText(stepMu.ziehung)}
            </div>
          </div>

          {/* D3-muendlich: 3-Minuten-Countdown / OralExamTimer */}
          <OralExamTimer lang={lang} fach={activeCourse.fach} />

          {/* Audio recording controls */}
          <div className="border border-[var(--line)] p-4 rounded-[var(--radius)] bg-[var(--surface)] space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono uppercase text-[var(--gray)]">
                Sprachaufnahme (Audio-Antwort):
              </span>
              <span className="text-xs font-mono text-[var(--accent)]">
                {recording ? "Aufnahme laeuft..." : audioUrl ? "Aufnahme bereit" : "Bereit"}
              </span>
            </div>
            <div className="flex items-center gap-3">
              {!recording ? (
                <button
                  type="button"
                  onClick={startRecording}
                  className="px-4 py-2 font-mono text-xs uppercase border border-[var(--ink)] rounded-[var(--radius)] hover:bg-[var(--paper-subtle)] transition-colors"
                >
                  Aufnahme starten
                </button>
              ) : (
                <button
                  type="button"
                  onClick={stopRecording}
                  className="px-4 py-2 font-mono text-xs uppercase bg-red-600 text-white rounded-[var(--radius)] hover:bg-red-700 transition-colors"
                >
                  Aufnahme stoppen
                </button>
              )}
              {audioUrl && (
                <audio controls src={audioUrl} className="h-8 flex-1" />
              )}
            </div>
          </div>

          {/* Self-check criteria */}
          <div className="border border-[var(--line)] rounded-[var(--radius)] bg-[var(--paper-subtle)] p-4 space-y-2">
            <div className="text-xs font-mono uppercase text-[var(--gray)] mb-1">
              Selbstcheck / 自评准则：
            </div>
            {stepMu.selbstcheck.map((sc, i) => (
              <label key={i} className="flex items-start gap-2.5 text-xs font-mono text-[var(--ink)] cursor-pointer">
                <input
                  type="checkbox"
                  checked={oralChecks[i] ?? false}
                  onChange={() =>
                    setOralChecks((prev) =>
                      prev.map((v, j) => (j === i ? !v : v))
                    )
                  }
                  className="mt-0.5 h-3.5 w-3.5 accent-[var(--accent)]"
                />
                <span>{renderFormattedText(sc)}</span>
              </label>
            ))}
          </div>

          {/* D3-muendlich: stichpunkte + gleiche score-pipeline */}
          <div className="space-y-2">
            <label className="block text-xs font-mono uppercase text-[var(--gray)]">
              Stichpunkte / Redetext (optional, für KI-Feedback) / 口述要点：
            </label>
            <textarea
              rows={3}
              value={oralText}
              onChange={(e) => setOralText(e.target.value)}
              placeholder="Kernpunkte in Stichworten …"
              className="w-full border border-[var(--line)] p-3 text-sm font-sans rounded-[var(--radius)] focus:border-[var(--accent)] focus:outline-none"
            />
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  if (!oralText.trim() || oralScore.loading) return;
                  if (!kiOn()) return;
                  setOralScore((prev) => ({ ...prev, loading: true }));
                  void askKi(
                    buildSzenarioScorePrompt(
                      activeCourse.fach,
                      activeCourse.thema,
                      stepMu.ziehung,
                      stepMu.selbstcheck,
                      oralText
                    )
                  ).then((r) =>
                    setOralScore((prev) => ({
                      loading: false,
                      text: r ?? "(KI derzeit nicht erreichbar. / AI暂时不可用。)",
                      rounds: prev.rounds + 1,
                    }))
                  );
                }}
                disabled={!oralText.trim() || oralScore.loading}
                className={`px-4 py-2 font-mono text-xs uppercase rounded-[var(--radius)] border transition-all ${
                  !oralText.trim() || oralScore.loading
                    ? "border-[var(--line)] text-[var(--gray)] cursor-not-allowed"
                    : "border-[var(--accent)] text-[var(--accent)] hover:bg-[var(--accent)]/5 active:scale-95"
                }`}
              >
                {oralScore.loading
                  ? lang === "de" ? "KI liest …" : "AI批改中…"
                  : lang === "de" ? "KI bewerten" : "AI批改"}
              </button>
              {oralScore.rounds > 0 && (
                <span className="font-mono text-[var(--text-meta)] text-[var(--gray)]">
                  {lang === "de" ? `Durchgang ${oralScore.rounds}` : `第${oralScore.rounds}轮`}
                </span>
              )}
            </div>
            {oralScore.text && (
              <div role="status" aria-live="polite" aria-atomic="true" className="rounded-[var(--radius)] border border-[var(--accent)]/30 bg-[var(--paper-subtle)] p-4 font-sans text-sm leading-relaxed text-[var(--ink)] whitespace-pre-wrap">
                {oralScore.text}
              </div>
            )}
          </div>

          <div className="pt-4 border-t border-[var(--line)] flex justify-end">
            <button
              type="button"
              disabled={oralChecks.filter(Boolean).length === 0}
              onClick={() => {
                addXP(30, idx);
                alert(lang === "de" ? "Mündliche Prüfung abgeschlossen! +30 XP" : "口试模拟完成！+30 XP");
                setActiveCourse(null);
              }}
              className={`px-5 py-2 font-mono text-xs uppercase tracking-wider rounded-[var(--radius)] transition-colors ${
                oralChecks.filter(Boolean).length > 0
                  ? "bg-[var(--ink)] text-[var(--paper)] hover:bg-[var(--accent)]"
                  : "bg-[var(--line)] text-[var(--gray)] cursor-not-allowed"
              }`}
            >
              Abschließen (+30 XP)
            </button>
          </div>
        </div>
      );
    }

    return null;
  };

  return (
    <div ref={rootContainerRef} className="mx-auto w-full min-w-0 max-w-5xl space-y-6">
      {/* Top Header: Navigation between wizard & course, plus XP and streak */}
      <div className="flex flex-wrap items-center justify-between border-b border-[var(--line)] pb-3 text-xs font-mono text-[var(--gray)]">
        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={() => setActiveCourse(null)}
            className={`transition-colors ${
              !activeCourse
                ? "font-semibold text-[var(--accent)] border-b border-[var(--accent)]"
                : "text-[var(--gray)] hover:text-[var(--ink)]"
            }`}
          >
            ← {lang === "de" ? "Kurskatalog & Assistent" : "课程向导 / 目录"}
          </button>
          {activeCourse && (
            <>
              <span>/</span>
              <span className="font-serif text-[var(--ink)] font-medium">
                {activeCourse.fach} · {restoreGermanUmlauts(activeCourse.thema)}
              </span>
              <span className={`text-xs font-mono px-1.5 py-0.5 rounded-[var(--radius)] border ${
                activeCourse.path.includes("-DE-")
                  ? "border-[var(--accent)] text-[var(--accent)]"
                  : "border-[var(--line)] text-[var(--gray)]"
              }`}>
                {activeCourse.path.includes("-DE-") ? "DE rein" : (lang === "de" ? "Bilingual (DE/ZH)" : "双语点拨")}
              </span>
              <select
                aria-label={lang === "de" ? "Anderen Kurs wählen" : "切换课程"}
                value={activeCourse.id}
                onChange={(e) => {
                  const target = allReisen.find((r) => r.id === e.target.value);
                  if (target) {
                    setActiveCourse(resolveCourseForAudience(target, allReisen, lang));
                  }
                }}
                className="font-mono text-xs border border-[var(--line)] bg-[var(--surface)] text-[var(--ink)] px-2 py-0.5 rounded cursor-pointer max-w-[220px] truncate ml-1"
              >
                {allReisen.map((r) => (
                  <option key={r.id} value={r.id}>
                    [{r.fach}] {r.thema} {r.path.includes("Wertpapierdepot") ? "[NEU]" : ""}
                  </option>
                ))}
              </select>
            </>
          )}
        </div>

        <div
          role="status"
          aria-live="polite"
          aria-atomic="true"
          className="flex flex-wrap items-center gap-4"
        >
          <span>
            XP: <strong className="text-[var(--ink)]">{progress.xp}</strong>
          </span>
          <span>·</span>
          <span>
            {lang === "de" ? "Streak:" : "连击:"}{" "}
            <strong className="text-[var(--ink)]">{progress.streak.length}</strong>{" "}
            {lang === "de" ? "Tage" : "天"}
          </span>
        </div>
      </div>

      {/* VIEW 1: SYLLABUS & CURRICULUM OVERVIEW */}
      {!activeCourse ? (
        <div className="space-y-6 py-2">
          {/* Header & Meta */}
          <div className="flex flex-wrap items-baseline justify-between gap-4 border-b border-[var(--line)] pb-4">
            <div>
              <h2 className="font-serif text-2xl text-[var(--ink)] tracking-tight">
                {lang === "de" ? "Curriculum · Interaktive Lektionen" : "Curriculum · 互动课程目录"}
              </h2>
              <p className="font-sans text-xs text-[var(--gray)] mt-1">
                {lang === "de"
                  ? "Strukturierter EF-Lehrplan — 5 Phasen von Entdecken bis Klausurszenario."
                  : "结构化 Gymnasium EF 教学大纲——从概念探索到考试情景实战。"}
              </p>
            </div>
            <div className="font-mono text-xs text-[var(--gray)]">
              <span className="text-[var(--ink)] font-medium">{wizardCourses.length}</span> / {allReisen.length} {lang === "de" ? "Lektionen verfügbar" : "门可用课程"}
            </div>
          </div>

          {/* Spotlight / New Release Card */}
          <div className="rounded-[var(--radius)] border border-[var(--accent)]/40 bg-[var(--surface)] p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-none">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs uppercase tracking-wider px-1.5 py-0.5 rounded bg-[var(--accent)] text-[var(--paper)] font-bold">
                  {lang === "de" ? "NEU ERSCHIENEN" : "最新上架"}
                </span>
                <span className="font-mono text-xs text-[var(--accent)] font-semibold">SoWi · Geldanlage & Finanzmärkte</span>
              </div>
              <h3 className="font-serif text-base font-semibold text-[var(--ink)]">
                Wertpapierdepot & Orderarten: Von Negativzinsen bis zur Orderbuch-Tiefe
              </h3>
              <p className="font-sans text-xs text-[var(--gray)]">
                {lang === "de"
                  ? "Interaktive Vorlesungsstrecke mit 5 Szenarien: Fisher-Gleichung, Sondervermögen § 92 KAGB, Xetra-Orderbuch & Magisches Dreieck."
                  : "探究式微课画卷（5大关卡）：费雪实际利率、破产隔离Sondervermögen、Xetra撮合与不可能三角。"}
              </p>
            </div>
            <button
              type="button"
              onClick={() => {
                const depotCourse = allReisen.find((r) => r.path.includes("Wertpapierdepot") && (lang === "de" ? r.path.includes("-DE-") : !r.path.includes("-DE-")))
                  || allReisen.find((r) => r.path.includes("Wertpapierdepot"));
                if (depotCourse) {
                  setActiveCourse(resolveCourseForAudience(depotCourse, allReisen, lang));
                }
              }}
              className="shrink-0 px-4 py-2 font-mono text-xs uppercase bg-[var(--accent)] text-[var(--paper)] rounded-[var(--radius)] hover:opacity-90 transition-opacity font-medium cursor-pointer"
            >
              {lang === "de" ? "Jetzt starten →" : "立即进入微课 →"}
            </button>
          </div>

          {/* Filter Bar (Subject tabs + Search + Ziel) */}
          <div className="space-y-3">
            {/* Subject Tabs */}
            <div className="flex flex-wrap items-center gap-1.5 border-b border-[var(--line)] pb-2.5">
              <button
                type="button"
                onClick={() => setWizardFach("alle")}
                className={`px-2.5 py-1 text-xs font-mono rounded-[var(--radius)] border transition-all ${
                  wizardFach === "alle"
                    ? "border-[var(--accent)] text-[var(--accent)] bg-[var(--paper-subtle)]/40 font-medium"
                    : "border-[var(--line)] text-[var(--gray)] hover:text-[var(--ink)] hover:border-[var(--ink)]"
                }`}
              >
                {lang === "de" ? "Alle Fächer" : "全部学科"}{" "}
                <span className="text-[var(--text-meta)] opacity-75">({allReisen.length})</span>
              </button>
              {FAECHER.map((f) => {
                const count = allReisen.filter(
                  (r) => r.fach.toLowerCase() === f.id.toLowerCase()
                ).length;
                const isSelected = wizardFach.toLowerCase() === f.id.toLowerCase();
                return (
                  <button
                    type="button"
                    key={f.id}
                    onClick={() => setWizardFach(f.id)}
                    className={`px-2.5 py-1 text-xs font-mono rounded-[var(--radius)] border transition-all ${
                      isSelected
                        ? "border-[var(--accent)] text-[var(--accent)] bg-[var(--paper-subtle)]/40 font-medium"
                        : "border-[var(--line)] text-[var(--gray)] hover:text-[var(--ink)] hover:border-[var(--ink)]"
                    }`}
                  >
                    {f.kurz} · {lang === "de" ? f.nameDE : f.nameZH}{" "}
                    <span className="text-[var(--text-meta)] opacity-75">({count})</span>
                  </button>
                );
              })}
            </div>

            {/* Filter Tools Row: Search + Objective Filter */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
              {/* Search Box */}
              <div className="relative flex-1 min-w-[240px]">
                <input
                  type="text"
                  value={courseQuery}
                  onChange={(e) => setCourseQuery(e.target.value)}
                  placeholder={
                    lang === "de"
                      ? "Thema, Fach, Stichwort filtern..."
                      : "快速检索主题、学科、知识点..."
                  }
                  className="w-full rounded-[var(--radius)] border border-[var(--line)] bg-[var(--surface)] px-3 py-1.5 text-xs font-sans text-[var(--ink)] placeholder-[var(--gray)] focus:border-[var(--accent)] focus:outline-none"
                />
                {courseQuery && (
                  <button
                    type="button"
                    onClick={() => setCourseQuery("")}
                    aria-label={lang === "de" ? "Suche leeren" : "清除搜索"}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 text-[var(--gray)] hover:text-[var(--ink)] cursor-pointer"
                  >
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M4 4l8 8M12 4l-8 8" />
                    </svg>
                  </button>
                )}
              </div>

              {/* Edition Tabs */}
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-mono text-[var(--gray)] mr-1">
                  {lang === "de" ? "Edition:" : "版本:"}
                </span>
                {[
                  { id: "alle" as const, de: `Alle (${allReisen.length})`, zh: `全部 (${allReisen.length})` },
                  { id: "de" as const, de: `DE rein (${allReisen.filter(r => r.path.includes("-DE-")).length})`, zh: `纯德语 (${allReisen.filter(r => r.path.includes("-DE-")).length})` },
                  { id: "bilingual" as const, de: `Bilingual (${allReisen.filter(r => !r.path.includes("-DE-")).length})`, zh: `双语 (${allReisen.filter(r => !r.path.includes("-DE-")).length})` },
                ].map((ed) => (
                  <button
                    type="button"
                    key={ed.id}
                    onClick={() => setWizardEdition(ed.id)}
                    className={`px-2.5 py-1 text-xs font-sans rounded-[var(--radius)] border transition-all ${
                      wizardEdition === ed.id
                        ? "border-[var(--accent)] text-[var(--accent)] font-medium bg-[var(--paper-subtle)]/40"
                        : "border-[var(--line)] text-[var(--gray)] hover:text-[var(--ink)]"
                    }`}
                  >
                    {lang === "de" ? ed.de : ed.zh}
                  </button>
                ))}
              </div>

              {/* Ziel Tabs */}
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-mono text-[var(--gray)] mr-1">
                  {lang === "de" ? "Ziel:" : "目标:"}
                </span>
                {[
                  { id: "alle", de: "Alle", zh: "全部" },
                  { id: "klausur", de: "Klausur", zh: "笔试" },
                  { id: "verstehen", de: "Verstehen", zh: "理解" },
                  { id: "muendlich", de: "Mündlich", zh: "口试" },
                ].map((z) => (
                  <button
                    type="button"
                    key={z.id}
                    onClick={() => setWizardZiel(z.id)}
                    className={`px-2.5 py-1 text-xs font-sans rounded-[var(--radius)] border transition-all ${
                      wizardZiel === z.id
                        ? "border-[var(--accent)] text-[var(--accent)] font-medium bg-[var(--paper-subtle)]/40"
                        : "border-[var(--line)] text-[var(--gray)] hover:text-[var(--ink)]"
                    }`}
                  >
                    {lang === "de" ? z.de : z.zh}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Syllabus Course List Table */}
          {wizardCourses.length === 0 ? (
            <div className="border border-dashed border-[var(--line)] bg-[var(--paper-subtle)] p-8 text-center text-xs font-mono text-[var(--gray)] rounded-[var(--radius)] leading-relaxed">
              {lang === "de"
                ? "Für dieses Thema gibt es noch keine interaktive Lektion. Lies zuerst die Notizen in der Bibliothek."
                : "该学科/主题暂无互动课程文件，去 Bibliothek 先读笔记。"}
            </div>
          ) : (
            <div className="border border-[var(--line)] rounded-[var(--radius)] overflow-hidden divide-y divide-[var(--line)] bg-[var(--surface)]">
              {/* Table Header */}
              <div className="grid grid-cols-12 gap-3 px-4 py-2 bg-[var(--paper-subtle)] text-[var(--text-meta)] font-mono text-[var(--gray)] uppercase tracking-wider">
                <div className="col-span-1">#</div>
                <div className="col-span-6 sm:col-span-7">Thema / 课程主题</div>
                <div className="col-span-2 hidden sm:block">Ziel / 目标</div>
                <div className="col-span-5 sm:col-span-2 text-right sm:text-left">Struktur & XP</div>
                <div className="col-span-6 sm:col-span-1 text-right">Aktion</div>
              </div>

              {/* Rows */}
              {wizardCourses.map((c, idx) => (
                <div
                  key={c.id}
                  className="grid grid-cols-12 gap-3 items-center px-4 py-3 hover:bg-[var(--paper-subtle)] transition-colors text-xs"
                >
                  {/* Index / Fach */}
                  <div className="col-span-1 font-mono text-[var(--gray)]">
                    {String(idx + 1).padStart(2, "0")}
                  </div>

                  {/* Thema & Details */}
                  <div className="col-span-6 sm:col-span-7 pr-2">
                    <div className="font-serif text-sm text-[var(--ink)] font-medium">
                      {restoreGermanUmlauts(c.thema)}
                    </div>
                    <div className="font-mono text-[var(--text-meta)] text-[var(--gray)] mt-0.5 flex flex-wrap items-center gap-1.5">
                      <span className="uppercase text-[var(--accent)] font-medium">{c.fach}</span>
                      {c.path.includes("-DE-") ? (
                        <span className="border border-[var(--accent)] text-[var(--accent)] px-1.5 py-0.5 rounded-[var(--radius)] text-xs font-mono">
                          DE rein
                        </span>
                      ) : (
                        <span className="border border-[var(--line)] text-[var(--ink)] bg-[var(--paper-subtle)] px-1.5 py-0.5 rounded-[var(--radius)] text-xs font-mono">
                          {lang === "de" ? "Bilingual (DE/ZH)" : "双语点拨"}
                        </span>
                      )}
                      <span>·</span>
                      <span>Level {c.level}</span>
                      <span>·</span>
                      <span>{c.schritte.length} Schritte ({c.schritte.map((s) => s.typ).join(" → ")})</span>
                    </div>
                  </div>

                  {/* Ziel */}
                  <div className="col-span-2 hidden sm:block font-mono text-[var(--text-meta)] text-[var(--gray)]">
                    <span className="border border-[var(--line)] px-1.5 py-0.5 rounded-[var(--radius)]">
                      {c.ziel}
                    </span>
                  </div>

                  {/* XP */}
                  <div className="col-span-5 sm:col-span-2 text-right sm:text-left font-mono text-[var(--text-meta)] text-[var(--accent)]">
                    +{c.xp} XP
                  </div>

                  {/* Action */}
                  <div className="col-span-6 sm:col-span-1 text-right">
                    <button
                      type="button"
                      onClick={() => setActiveCourse(resolveCourseForAudience(c, allReisen, lang))}
                      className="inline-flex items-center gap-1 px-3 py-1 font-mono text-xs border border-[var(--ink)] bg-[var(--ink)] text-[var(--paper)] hover:bg-[var(--accent)] hover:border-[var(--accent)] rounded-[var(--radius)] transition-colors whitespace-nowrap"
                    >
                      {lang === "de" ? "Lektion starten →" : "开始学习 →"}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      ) : (
        /* VIEW 2: INTERACTIVE COURSE (DOCUMENT MODE OR STEP MODE) */
        <div className="space-y-6">
          {/* Course Header & View Switcher */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--line)] pb-3">
            <div>
              <span className="font-mono text-xs uppercase tracking-wider text-[var(--accent)]">
                {activeCourse.fach} · {activeCourse.ziel} · Niveau {activeCourse.level}
              </span>
              <h2 className="font-serif text-xl sm:text-2xl text-[var(--ink)] mt-0.5">
                {activeCourse.thema}
              </h2>
            </div>

            {/* Mode Switcher */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-[var(--gray)] hidden sm:inline">
                {lang === "de" ? "Ansicht:" : "视图:"}
              </span>
              <div className="inline-flex rounded-[var(--radius)] border border-[var(--line)] p-0.5 bg-[var(--surface)] text-xs font-mono">
                <button
                  type="button"
                  onClick={() => setViewMode("document")}
                  className={`px-2.5 py-1 rounded transition-colors ${
                    viewMode === "document"
                      ? "bg-[var(--ink)] text-[var(--paper)] font-semibold"
                      : "text-[var(--gray)] hover:text-[var(--ink)]"
                  }`}
                >
                  {lang === "de" ? "Dokument" : "全文文档"}
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode("steps")}
                  className={`px-2.5 py-1 rounded transition-colors ${
                    viewMode === "steps"
                      ? "bg-[var(--ink)] text-[var(--paper)] font-semibold"
                      : "text-[var(--gray)] hover:text-[var(--ink)]"
                  }`}
                >
                  {lang === "de" ? "Schritte" : "分步卡片"}
                </button>
              </div>
            </div>
          </div>

          {/* VIEW MODE 1: DOCUMENT (Single continuous page with embedded interactions & sticky TOC) */}
          {viewMode === "document" ? (
            <div className="space-y-6">
              {/* Mobile Quick Navigation Strip (horizontal scroll) */}
              <div className="lg:hidden sticky top-0 z-10 -mx-4 px-4 py-2 bg-[var(--paper)]/95 backdrop-blur border-b border-[var(--line)] flex items-center gap-2 overflow-x-auto">
                <span className="text-xs font-mono text-[var(--gray)] uppercase shrink-0 font-bold">
                  {lang === "de" ? "Gliederung:" : "目录:"}
                </span>
                {activeCourse.schritte.map((s, idx) => {
                  const isCurrent = (viewMode === "document" ? activeDocStepIdx : stepIdx) === idx;
                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => {
                        setStepIdx(idx);
                        setActiveDocStepIdx(idx);
                        document.getElementById(`schritt-${s.stepNumber}`)?.scrollIntoView({ behavior: "smooth", block: "start" });
                      }}
                      className={`shrink-0 px-2.5 py-1 text-xs font-mono rounded border transition-colors ${
                        isCurrent
                          ? "border-[var(--accent)] text-[var(--accent)] font-semibold bg-[var(--paper-subtle)]"
                          : "border-[var(--line)] text-[var(--ink)]"
                      }`}
                    >
                      0{s.stepNumber} {s.typ}
                    </button>
                  );
                })}
              </div>

              {/* Grid: Main Document Stream (Col 9) + Sticky TOC (Col 3) */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* Main Document Content */}
                <div className="lg:col-span-9 space-y-12 min-w-0">
                  {activeCourse.schritte.map((s, idx) => (
                    <section
                      key={s.stepNumber}
                      id={`schritt-${s.stepNumber}`}
                      className="scroll-mt-16 border-b border-[var(--line)] pb-10 space-y-6"
                    >
                      {/* Step Header */}
                      <div className="flex flex-wrap items-baseline justify-between gap-3 border-b border-[var(--line)]/60 pb-3">
                        <div>
                          <span className="font-mono text-xs uppercase tracking-wider text-[var(--accent)]">
                            0{s.stepNumber} · {getStepTitle(s.typ, lang, s.stepNumber)}
                          </span>
                          <h3 className="font-serif text-xl sm:text-2xl text-[var(--ink)] mt-0.5">
                            {restoreGermanUmlauts(s.title)}
                          </h3>
                        </div>
                        <span className="text-xs font-mono text-[var(--gray)] border border-[var(--line)] px-2 py-0.5 rounded-[var(--radius)]">
                          +{s.typ === "entdecken" || s.typ === "reflexion" ? 5 : s.typ === "ausprobieren" ? 15 : s.typ === "check" ? 20 : 30} XP
                        </span>
                      </div>

                      {/* Step Interactive Body */}
                      {renderSchrittContent(s, idx, true)}
                    </section>
                  ))}

                  {/* Course Conclusion Card */}
                  <div className="border border-[var(--line)] bg-[var(--paper-subtle)]/50 p-6 sm:p-8 rounded-[var(--radius)] text-center space-y-4">
                    <div className="font-mono text-xs uppercase tracking-wider text-[var(--accent)] font-semibold">
                      {lang === "de" ? "Lektion abgeschlossen" : "课程学习进度"}
                    </div>
                    <h3 className="font-serif text-2xl text-[var(--ink)]">
                      {activeCourse.thema} ({activeCourse.fach})
                    </h3>
                    <p className="font-sans text-xs sm:text-sm text-[var(--gray)] max-w-lg mx-auto leading-relaxed">
                      {lang === "de"
                        ? "Du hast alle interaktiven Stationen durchgearbeitet. Deine Lernfortschritte und XP wurden synchronisiert."
                        : "你已浏览或完成了本课程的各个交互小节。学习记录与XP已自动同步。"}
                    </p>
                    <div className="flex flex-wrap justify-center gap-3 pt-2">
                      <button
                        type="button"
                        onClick={() => {
                          addXP(activeCourse.xp, activeCourse.schritte.length - 1);
                          alert(lang === "de" ? `Lektion abgeschlossen! +${activeCourse.xp} XP erhalten!` : `恭喜完成本课！获得 +${activeCourse.xp} XP！`);
                          setActiveCourse(null);
                        }}
                        className="px-5 py-2 font-mono text-xs uppercase tracking-wider bg-[var(--ink)] text-[var(--paper)] hover:bg-[var(--accent)] rounded-[var(--radius)] transition-colors"
                      >
                        {lang === "de" ? `Lektion abschließen (+${activeCourse.xp} XP)` : `完成并结算 (+${activeCourse.xp} XP)`}
                      </button>
                      <button
                        type="button"
                        onClick={() => setActiveCourse(null)}
                        className="px-4 py-2 font-mono text-xs border border-[var(--line)] text-[var(--ink)] hover:border-[var(--ink)] rounded-[var(--radius)] transition-colors"
                      >
                        {lang === "de" ? "← Zur Kursübersicht" : "← 返回课程大纲"}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Right Sticky Table of Contents (TOC) */}
                <aside className="lg:col-span-3 hidden lg:block sticky top-20 self-start space-y-4">
                  <div className="border border-[var(--line)] bg-[var(--surface)] p-4 rounded-[var(--radius)] space-y-3">
                    <div className="flex items-center justify-between border-b border-[var(--line)] pb-2">
                      <span className="font-mono text-xs uppercase tracking-wider font-semibold text-[var(--ink)]">
                        {lang === "de" ? "Gliederung" : "大纲目录 · TOC"}
                      </span>
                      <span className="font-mono text-[var(--text-meta)] text-[var(--gray)]">
                        {activeCourse.schritte.length} {lang === "de" ? "Stationen" : "小节"}
                      </span>
                    </div>

                    <nav className="space-y-1 max-h-[calc(100vh-14rem)] overflow-y-auto pr-1">
                      {activeCourse.schritte.map((s, idx) => {
                        const isCurrent = (viewMode === "document" ? activeDocStepIdx : stepIdx) === idx;
                        const isDone = unlocked.includes(idx + 1) || (idx === activeCourse.schritte.length - 1 && unlocked.includes(idx));
                        return (
                          <button
                            key={idx}
                            type="button"
                            onClick={() => {
                              setStepIdx(idx);
                              setActiveDocStepIdx(idx);
                              const el = document.getElementById(`schritt-${s.stepNumber}`);
                              if (el) {
                                el.scrollIntoView({ behavior: "smooth", block: "start" });
                              }
                            }}
                            className={`w-full text-left flex items-start gap-2 px-2 py-2 rounded-[var(--radius)] transition-all text-xs font-mono group border ${
                              isCurrent
                                ? "bg-[var(--paper-subtle)] text-[var(--accent)] border-[var(--accent)] font-semibold"
                                : "border-transparent text-[var(--ink)] hover:bg-[var(--paper-subtle)]/70 hover:border-[var(--line)]"
                            }`}
                          >
                            <span className={`shrink-0 font-bold ${isCurrent ? "text-[var(--accent)]" : "text-[var(--gray)]"}`}>
                              0{s.stepNumber}
                            </span>
                            <div className="min-w-0 flex-1">
                              <span className="text-xs uppercase text-[var(--gray)] block tracking-wider">
                                {getStepTitle(s.typ, lang, s.stepNumber)}
                              </span>
                              <span className="truncate block font-serif text-xs leading-tight text-[var(--ink)]">
                                {restoreGermanUmlauts(s.title)}
                              </span>
                            </div>
                            {isDone && (
                              <span className="text-[var(--success)] shrink-0 font-bold">
                                <CheckMarkSvg />
                              </span>
                            )}
                          </button>
                        );
                      })}
                    </nav>

                    <div className="pt-2 border-t border-[var(--line)] flex flex-col gap-2">
                      <button
                        type="button"
                        onClick={() => scrollToContainerTop("smooth")}
                        className="w-full text-center py-1.5 text-xs font-mono text-[var(--gray)] hover:text-[var(--ink)] border border-[var(--line)] rounded-[var(--radius)] transition-colors hover:border-[var(--ink)]"
                      >
                        ↑ {lang === "de" ? "Nach oben" : "回到顶部"}
                      </button>

                      <button
                        type="button"
                        onClick={() => setViewMode("steps")}
                        className="w-full text-center py-1 text-xs font-mono text-[var(--accent)] hover:underline"
                      >
                        {lang === "de" ? "Zu Einzelschritten wechseln →" : "切换为分步卡片 →"}
                      </button>
                    </div>
                  </div>
                </aside>
              </div>
            </div>
          ) : (
            /* VIEW MODE 2: STEPS (Classic single card with tab bar) */
            <div className="space-y-6">
              {/* Step Navigation Rail (Tufte hairline step line) */}
              <div className="border-y border-[var(--line)] py-3 flex flex-wrap items-center justify-between gap-3">
                <div className="flex flex-wrap items-center gap-1.5">
                  {activeCourse.schritte.map((s, idx) => {
                    const isCurrent = stepIdx === idx;
                    const isUnlocked = unlocked.includes(idx);
                    const isPast = idx < stepIdx;

                    return (
                      <button
                        type="button"
                        key={idx}
                        disabled={!isUnlocked}
                        onClick={() => setStepIdx(idx)}
                        className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono rounded-[var(--radius)] transition-all border ${
                          isCurrent
                            ? "border-[var(--accent)] text-[var(--accent)] bg-[var(--paper-subtle)]/40 font-semibold"
                            : isUnlocked
                            ? "border-[var(--line)] text-[var(--ink)] hover:border-[var(--ink)]"
                            : "border-[var(--line)]/50 text-[var(--gray)]/40 cursor-not-allowed"
                        }`}
                      >
                        <span>0{s.stepNumber}</span>
                        <span className="font-sans uppercase text-[var(--text-meta)] tracking-wider">
                          {s.typ}
                        </span>
                        {isPast && (
                          <span className="text-[var(--success)]">
                            {lang === "de" ? "Erledigt" : "已完成"}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>

                <div className="text-xs font-mono text-[var(--gray)]">
                  {lang === "de" ? "Schritt" : "步骤"} {stepIdx + 1} /{" "}
                  {activeCourse.schritte.length}
                </div>
              </div>

              {/* Current Step Body */}
              <div className="space-y-6 py-2">
                <div className="flex flex-wrap items-baseline justify-between gap-3 border-b border-[var(--line)] pb-3">
                  <div>
                    <span className="font-mono text-xs uppercase tracking-wider text-[var(--accent)]">
                      Schritt {currentSchritt?.stepNumber} · {currentSchritt?.typ}
                    </span>
                    <h3 className="font-serif text-xl text-[var(--ink)] mt-0.5">
                      {restoreGermanUmlauts(currentSchritt?.title ?? "")}
                    </h3>
                  </div>
                  <span className="text-xs font-mono text-[var(--gray)]">
                    Ziel: +
                    {currentSchritt?.typ === "entdecken"
                      ? 5
                      : currentSchritt?.typ === "ausprobieren"
                      ? 15
                      : currentSchritt?.typ === "check"
                      ? 20
                      : 30}{" "}
                    XP
                  </span>
                </div>

                {currentSchritt && renderSchrittContent(currentSchritt, stepIdx, false)}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
