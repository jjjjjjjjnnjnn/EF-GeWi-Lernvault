import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { t, type Lang } from "./i18n";
import { repository, type KnowledgeNote, type KnowledgeCard } from "./framework";
import { KnowledgeManagerModal } from "./components/KnowledgeManagerModal";
import { GLOBAL_KEYS, MODULE_KEYS, isTyping, matchesKey } from "./keys";
import { FAECHER, getFach } from "./fach";
import Palette, { type PaletteItem } from "./components/Palette";
import HelpOverlay from "./components/HelpOverlay";
import { FeedbackFloat, setFeedbackContext } from "./components/FeedbackBox";
import { pickVault, type VaultData } from "./vault/loader";
import { xpStore } from "./engine/stores";
import { FSRS_STORAGE_KEY, LANG_STORAGE_KEY } from "./engine/storageKeys";
import Library from "./modules/Library";
import Home from "./modules/Home";
import DashboardCockpit from "./modules/DashboardCockpit";
import Flashcards from "./modules/Flashcards";
import Quiz from "./modules/Quiz";
import Tutor from "./modules/Tutor";
import Planner from "./modules/Planner";
import Mindmap from "./modules/Mindmap";
import Lernbaum from "./modules/Lernbaum";
import { BAEUME_LISTE } from "./baum";
import ReiseModule from "./modules/Reise";
import { defaultVaultReisen } from "./reise";
import { KlausurSim } from "./modules/KlausurSim";
import Werkzeuge from "./modules/Werkzeuge";
import Labor from "./modules/Labor";
import { DesignLab } from "./modules/DesignLab";
import { DailySprintModal } from "./components/DailySprintModal";
import { getStudyStreak } from "./engine/dailyMix";
import Settings from "./modules/Settings";
import { SubjectWorkspace } from "./modules/SubjectWorkspace";
import Onboarding, { loadOnboarding, saveOnboarding, type OnboardingResult } from "./modules/Onboarding";
import { initTheme } from "./engine/theme";
import { SidebarPet } from "./components/mascot/SidebarPet";

type Tab = "home" | "fach" | "library" | "flashcards" | "quiz" | "klausursim" | "tutor" | "planner" | "mindmap" | "lernbaum" | "reise" | "labor" | "designlab" | "werkzeuge" | "einstellungen";

const settingsShortcut = MODULE_KEYS.find((binding) => binding.module === "einstellungen")!;

// Tufte Data-Ink: hand-drawn hairline nav icons, no emoji. 16x16, stroke=currentColor.
const iconProps = {
  width: 16,
  height: 16,
  viewBox: "0 0 16 16",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.4,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": true,
} as const;

const icons: Record<Tab, ReactNode> = {
  home: (
    <svg {...iconProps}>
      <path d="M2.5 8.2L8 3l5.5 5.2" />
      <path d="M4.3 7.4V13.5h7.4V7.4" />
      <path d="M6.8 13.5v-3h2.4v3" />
    </svg>
  ),
  fach: (
    <svg {...iconProps}>
      <rect x="2.5" y="2.5" width="11" height="11" rx="1" />
      <path d="M2.5 6.5h11" />
      <path d="M7 6.5v7" />
    </svg>
  ),
  library: (
    <svg {...iconProps}>
      <path d="M2.5 13.5h11" />
      <path d="M4.5 13.5V3.2h2.3v10.3" />
      <path d="M8 13.5V5h2.3v8.5" />
      <path d="M11.5 13.5V4h2v9.5" />
    </svg>
  ),
  flashcards: (
    <svg {...iconProps}>
      <rect x="4.8" y="4.8" width="8.7" height="8.7" rx="1" />
      <path d="M11.2 4.8V3.5a1 1 0 0 0-1-1H3.5a1 1 0 0 0-1 1v6.7a1 1 0 0 0 1 1h1.3" />
    </svg>
  ),
  quiz: (
    <svg {...iconProps}>
      <path d="M5.5 4.5h8M5.5 8h8M5.5 11.5h8" />
      <circle cx="2.8" cy="4.5" r="0.7" fill="currentColor" stroke="none" />
      <circle cx="2.8" cy="8" r="0.7" fill="currentColor" stroke="none" />
      <circle cx="2.8" cy="11.5" r="0.7" fill="currentColor" stroke="none" />
    </svg>
  ),
  klausursim: (
    <svg {...iconProps}>
      <path d="M3.5 2.5h6l3.5 3.5v7.5a1 1 0 0 1-1 1h-8.5a1 1 0 0 1-1-1v-10a1 1 0 0 1 1-1z" />
      <path d="M9.5 2.5v3.5h3.5" />
      <path d="M5.5 8.5h5M5.5 11h3.5" />
    </svg>
  ),
  werkzeuge: (
    <svg {...iconProps}>
      <path d="M13.5 2.5L2.5 13.5h11V2.5z" />
      <path d="M5.5 13.5v-2M8 13.5v-3.5M10.5 13.5v-2M13 13.5v-5" />
    </svg>
  ),
  tutor: (
    <svg {...iconProps}>
      <path d="M2.5 3.2h11a1 1 0 0 1 1 1v5.6a1 1 0 0 1-1 1H7.2l-2.9 2.4v-2.4h-.8a1 1 0 0 1-1-1V4.2a1 1 0 0 1 1-1z" />
      <path d="M5.3 6.4h5.4M5.3 8.6h3.2" />
    </svg>
  ),
  planner: (
    <svg {...iconProps}>
      <rect x="2.5" y="3.5" width="11" height="10" rx="1" />
      <path d="M2.5 6.6h11M5.6 2v2.4M10.4 2v2.4" />
      <circle cx="6.4" cy="9.8" r="0.7" fill="currentColor" stroke="none" />
      <circle cx="9.6" cy="9.8" r="0.7" fill="currentColor" stroke="none" />
    </svg>
  ),
  mindmap: (
    <svg {...iconProps}>
      <circle cx="5" cy="8" r="1.9" />
      <circle cx="12" cy="4.3" r="1.2" />
      <circle cx="12" cy="11.7" r="1.2" />
      <path d="M6.8 7.3l3.3-2M6.8 8.7l3.3 2" />
    </svg>
  ),
  lernbaum: (
    <svg {...iconProps}>
      <path d="M8 13.5V4" />
      <path d="M8 10.5L4.8 8M8 10.5l3.2-2.5M8 7L5.5 5M8 7l2.5-2" />
      <circle cx="4.8" cy="8" r="1" />
      <circle cx="11.2" cy="8" r="1" />
      <circle cx="5.5" cy="5" r="1" />
      <circle cx="10.5" cy="5" r="1" />
    </svg>
  ),
  reise: (
    <svg {...iconProps}>
      <circle cx="8" cy="8" r="6" />
      <path d="M10.8 5.2l-2.1 4.7-4-1.2 2.1-4.7 4 1.2z" />
    </svg>
  ),
  labor: (
    <svg {...iconProps}>
      <path d="M6 2h4M7 2v3.5L3.2 12.8A1.5 1.5 0 0 0 4.5 15h7a1.5 1.5 0 0 0 1.3-2.2L9 5.5V2" />
      <path d="M4.8 11.5h6.4" />
    </svg>
  ),
  designlab: (
    <svg {...iconProps}>
      <path d="M2.5 13.5l3.5-3.5 6.5 6.5" />
      <path d="M12.5 2.5l1 1-6 6-1-1 6-6z" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  ),
  einstellungen: (
    <svg {...iconProps}>
      <circle cx="8" cy="8" r="2.2" />
      <path d="M8 1.6v2.1M8 12.3v2.1M1.6 8h2.1M12.3 8h2.1M3.5 3.5l1.5 1.5M11 11l1.5 1.5M12.5 3.5L11 5M5 11l-1.5 1.5" />
    </svg>
  ),
};

const isDevModeActive = (): boolean => {
  if (typeof window === "undefined") return false;
  try {
    const q = new URLSearchParams(window.location.search).get("dev");
    if (q === "1" || q === "true") return true;
    return localStorage.getItem("ef_dev_mode") === "true";
  } catch {
    return false;
  }
};

const getInitialTab = (): Tab => {
  if (typeof window !== "undefined") {
    const params = new URLSearchParams(window.location.search);
    const t = params.get("tab") as Tab;
    if (t === "designlab" && !isDevModeActive()) {
      return "home";
    }
    if (["home", "fach", "library", "flashcards", "quiz", "klausursim", "tutor", "planner", "mindmap", "lernbaum", "reise", "labor", "designlab", "werkzeuge", "einstellungen"].includes(t)) {
      return t;
    }
  }
  return "home";
};

export default function App() {
  const [tab, setTab] = useState<Tab>(getInitialTab);
  const [devMode, setDevModeState] = useState<boolean>(isDevModeActive);
  const [useCockpitHome, setUseCockpitHome] = useState<boolean>(true);

  const setDevMode = (active: boolean) => {
    setDevModeState(active);
    try {
      if (active) localStorage.setItem("ef_dev_mode", "true");
      else {
        localStorage.removeItem("ef_dev_mode");
        if (tab === "designlab") switchTab("home");
      }
    } catch {
      // ignorieren
    }
  };
  // Standardsprache: Systemsprache (zh → zh), sonst Deutsch; Nutzerwahl persistiert.
  const [lang, setLangState] = useState<Lang>(() => {
    if (typeof window !== "undefined") {
      try {
        const saved = localStorage.getItem(LANG_STORAGE_KEY);
        if (saved === "de" || saved === "zh") return saved;
        if ((window.navigator?.language ?? "").toLowerCase().startsWith("zh")) return "zh";
      } catch {
        // Speicher blockiert: auf Deutsch zurückfallen.
      }
    }
    return "de";
  });
  const setLang = (updater: Lang | ((l: Lang) => Lang)) => {
    setLangState((prev) => {
      const next = typeof updater === "function" ? (updater as (l: Lang) => Lang)(prev) : updater;
      try {
        localStorage.setItem(LANG_STORAGE_KEY, next);
      } catch {
        // ignorieren
      }
      return next;
    });
  };
  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const [obOpen, setObOpen] = useState<boolean>(() => loadOnboarding() === null);
  const [query, setQuery] = useState(() => {
    if (typeof window !== "undefined") {
      return new URLSearchParams(window.location.search).get("q") || "";
    }
    return "";
  });
  const [selectedFach, setSelectedFach] = useState<string>("alle");
  const [selectedNoteId, setSelectedNoteId] = useState<string | undefined>(undefined);
  const [activeReiseId, setActiveReiseId] = useState<string | null>(null);
  const tr = t(lang);

  type PrimaryWorkspace = "home" | "lernen" | "wiederholen" | "ueben" | "einstellungen";

  const getWorkspaceForTab = (t: Tab): PrimaryWorkspace => {
    if (t === "home") return "home";
    if (["reise", "labor", "library", "lernbaum", "mindmap"].includes(t)) return "lernen";
    if (["flashcards", "planner"].includes(t)) return "wiederholen";
    if (["klausursim", "quiz", "tutor", "werkzeuge"].includes(t)) return "ueben";
    return "einstellungen";
  };

  const isAuxTab = (t: Tab) => ["reise", "labor", "designlab", "quiz", "tutor", "planner", "mindmap", "lernbaum", "werkzeuge"].includes(t);
  const [toolsExpanded, setToolsExpanded] = useState<boolean>(() => isAuxTab(getInitialTab()));

  const switchTab = (id: Tab) => {
    setTab(id);
    if (isAuxTab(id)) {
      setToolsExpanded(true);
    }
    if (typeof window !== "undefined") {
      const url = new URL(window.location.href);
      url.searchParams.set("tab", id);
      window.history.replaceState({}, "", url.toString());
    }
  };

  interface NavItem {
    id: Tab;
    label: string;
    icon: ReactNode;
  }

  interface SubNavItem extends NavItem {
    shortcut: string;
  }

  const coreTabs: NavItem[] = useMemo(() => [
    { id: "home", label: tr.home, icon: icons.home },
    { id: "fach", label: lang === "de" ? "Fach-Bereich" : "学科专区", icon: icons.fach },
    { id: "library", label: tr.library, icon: icons.library },
    { id: "flashcards", label: tr.flashcards, icon: icons.flashcards },
    { id: "klausursim", label: tr.klausursim, icon: icons.klausursim },
  ], [tr, lang]);

  const auxTabs: SubNavItem[] = useMemo(() => {
    const list: SubNavItem[] = [
      { id: "reise", label: lang === "de" ? "Lernreise" : "新知课程", shortcut: "Alt 9", icon: icons.reise },
      { id: "labor", label: lang === "de" ? "Labor" : "互动实验", shortcut: "Alt L", icon: icons.labor },
      { id: "quiz", label: tr.quiz, shortcut: "Alt 4", icon: icons.quiz },
      { id: "tutor", label: tr.tutor, shortcut: "Alt 6", icon: icons.tutor },
      { id: "lernbaum", label: tr.lernbaum, shortcut: "Alt B", icon: icons.lernbaum },
      { id: "mindmap", label: tr.mindmap, shortcut: "Alt 8", icon: icons.mindmap },
      { id: "planner", label: tr.planner, shortcut: "Alt 7", icon: icons.planner },
      { id: "werkzeuge", label: tr.werkzeuge, shortcut: "Alt W", icon: icons.werkzeuge },
    ];
    if (devMode) {
      list.push({ id: "designlab", label: lang === "de" ? "Design-Lab" : "设计展厅", shortcut: "Alt D", icon: icons.designlab });
    }
    return list;
  }, [lang, devMode, tr]);


  const allNavItems: NavItem[] = useMemo(
    () => {
      const list: NavItem[] = [
        { id: "home", label: tr.home, icon: icons.home },
        { id: "fach", label: lang === "de" ? "Fach-Bereich" : "学科专区", icon: icons.fach },
        { id: "library", label: tr.library, icon: icons.library },
        { id: "lernbaum", label: tr.lernbaum, icon: icons.lernbaum },
        { id: "mindmap", label: tr.mindmap, icon: icons.mindmap },
        { id: "planner", label: tr.planner, icon: icons.planner },
        { id: "flashcards", label: tr.flashcards, icon: icons.flashcards },
        { id: "klausursim", label: tr.klausursim, icon: icons.klausursim },
        { id: "quiz", label: tr.quiz, icon: icons.quiz },
        { id: "werkzeuge", label: tr.werkzeuge, icon: icons.werkzeuge },
        { id: "tutor", label: tr.tutor, icon: icons.tutor },
        { id: "reise", label: tr.reise, icon: icons.reise },
        { id: "labor", label: lang === "de" ? "Labor" : "互动实验", icon: icons.labor },
      ];
      if (devMode) {
        list.push({ id: "designlab", label: lang === "de" ? "Design-Lab" : "设计展厅", icon: icons.designlab });
      }
      list.push({ id: "einstellungen", label: tr.settings, icon: icons.einstellungen });
      return list;
    },
    [tr, lang, devMode]
  );
  const currentWorkspace = getWorkspaceForTab(tab);
  const [tutorPrefilledInput, setTutorPrefilledInput] = useState<string | undefined>(undefined);

  const jumpToTutor = (prefilled?: string) => {
    if (prefilled) setTutorPrefilledInput(prefilled);
    switchTab("tutor");
  };

  const [paletteOpen, setPaletteOpen] = useState(false);
  const [helpOpen, setHelpOpen] = useState(false);
  const [sprintOpen, setSprintOpen] = useState(false);
  const [knowledgeManagerOpen, setKnowledgeManagerOpen] = useState(false);
  const [knowledgeVersion, setKnowledgeVersion] = useState(0);

  useEffect(() => {
    return repository.subscribe(() => {
      setKnowledgeVersion((v) => v + 1);
    });
  }, []);

  useEffect(() => {
    initTheme();
  }, []);

  // Non-course tabs report a coarse position; reise/quiz modules
  // override with their precise context via their own effects.
  useEffect(() => {
    if (tab !== "reise" && tab !== "quiz") setFeedbackContext(`tab:${tab}`);
  }, [tab]);
  const searchRef = useRef<HTMLInputElement>(null);
  const toggleLang = () => setLang((l) => (l === "zh" ? "de" : "zh"));
  const [vault, setVault] = useState<VaultData | null>(null);
  const [vaultMsg, setVaultMsg] = useState("");

  const activeNotes: KnowledgeNote[] = useMemo(() => repository.getAllNotes(), [knowledgeVersion, vault]);
  const activeCards: KnowledgeCard[] = useMemo(() => repository.getAllCards(), [knowledgeVersion, vault]);

  const openVault = async () => {
    try {
      if (!("showDirectoryPicker" in window)) {
        setVaultMsg(lang === "de" ? "Bitte Edge/Chrome nutzen oder Tauri-Build abwarten." : "请用 Edge/Chrome 打开，或等 Tauri 打包版。");
        return;
      }
      const v = await pickVault();
      setVault(v);
      repository.setExternalVault(v);
      setVaultMsg(
        lang === "de"
          ? `${v.rootName}: ${v.notes.length} Notizen · ${v.cards.length} Karten · ${v.reisen.length} Reisen`
          : `${v.rootName}：${v.notes.length} 篇笔记 · ${v.cards.length} 张卡片 · ${v.reisen.length} 条互动旅程`
      );
      if (v.notes.length > 0) switchTab("library");
    } catch {
      // Picker abgebrochen / 用户取消
    }
  };

  const exportFsrs = () => {
    const raw = localStorage.getItem(FSRS_STORAGE_KEY) || '{"version":1,"cards":{}}';
    const blob = new Blob([raw], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "eflernvault-fsrs-v1.json";
    a.click();
    URL.revokeObjectURL(url);
  };

  const exportXp = () => {
    const raw = xpStore.raw() || '{"version":1,"xp":0,"streak":[],"badges":{},"done":{}}';
    const blob = new Blob([raw], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "eflernvault-xp.json";
    a.click();
    URL.revokeObjectURL(url);
  };

  const jumpToLibrary = (targetQuery: string, targetFach?: string, targetNoteId?: string) => {
    switchTab("library");
    setQuery(targetQuery);
    if (targetFach) {
      setSelectedFach(targetFach);
    }
    if (targetNoteId) {
      setSelectedNoteId(targetNoteId);
    }
  };

  const finishOnboarding = (r: OnboardingResult) => {
    saveOnboarding(r);
    if (r.faecher.length > 0) setSelectedFach(r.faecher[0]);
    setObOpen(false);
    switchTab("reise");
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const primaryBinding = GLOBAL_KEYS.find(
        (binding) => binding.match.primary && matchesKey(e, binding, { allowWhileTyping: true })
      );
      if (primaryBinding) {
        e.preventDefault();
        if (primaryBinding.id === "command-palette") setPaletteOpen((open) => !open);
        if (primaryBinding.id === "export-fsrs") exportFsrs();
        return;
      }

      if (isTyping()) return;

      if (e.ctrlKey && e.shiftKey && (e.key === "D" || e.key === "d")) {
        e.preventDefault();
        setDevMode(!devMode);
        return;
      }

      const globalBinding = GLOBAL_KEYS.find((binding) => matchesKey(e, binding));
      if (globalBinding) {
        if (globalBinding.id === "search") {
          e.preventDefault();
          if (tab !== "library") switchTab("library");
          window.requestAnimationFrame(() => searchRef.current?.focus());
        } else if (globalBinding.id === "help") {
          setHelpOpen(true);
        } else if (globalBinding.id === "language") {
          toggleLang();
        } else if (globalBinding.id === "escape") {
          if (knowledgeManagerOpen) setKnowledgeManagerOpen(false);
          else if (paletteOpen) setPaletteOpen(false);
          else if (helpOpen) setHelpOpen(false);
          else if (sprintOpen) setSprintOpen(false);
        }
        return;
      }

      const moduleBinding = MODULE_KEYS.find((binding) => matchesKey(e, binding));
      if (moduleBinding) {
        e.preventDefault();
        switchTab(moduleBinding.module);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  const paletteItems: PaletteItem[] = useMemo(
    () => [
      ...allNavItems.map((n) => {
        const binding = MODULE_KEYS.find((candidate) => candidate.module === n.id);
        return {
          id: `tab-${n.id}`,
          shortcutId: binding?.id,
          group: lang === "de" ? "Module" : "模块",
          label: n.label,
          hint: binding?.altHint,
          run: () => switchTab(n.id),
        };
      }),
      ...FAECHER.map((f) => ({
        id: `fach-${f.id}`,
        group: lang === "de" ? "Fächer" : "学科",
        label: `${f.kurz} · ${lang === "de" ? f.nameDE : f.nameZH}`,
        sub: lang === "de" ? "In Bibliothek nach Fach filtern" : "在笔记库中按此学科筛选",
        run: () => {
          setSelectedFach(f.id);
          switchTab("library");
        },
      })),
      ...activeNotes.map((n) => ({
        id: `note-${n.id}`,
        group: lang === "de" ? "Notizen" : "笔记",
        label: n.thema,
        sub: `${n.fach} · ${n.operatoren.join(" / ")}`,
        run: () => {
          switchTab("library");
          setQuery(n.thema);
        },
      })),
      {
        id: "act-knowledge-manager",
        group: lang === "de" ? "Aktionen" : "操作",
        label: lang === "de" ? "Wissensbasis & Framework verwalten" : "知识库管理与模块化扩展",
        hint: "Import/Export",
        run: () => setKnowledgeManagerOpen(true),
      },
      {
        id: "act-vault",
        group: lang === "de" ? "Aktionen" : "操作",
        label: lang === "de" ? "Vault öffnen" : "打开知识库",
        run: () => void openVault(),
      },
      {
        id: "act-daily-sprint",
        group: lang === "de" ? "Aktionen" : "操作",
        label: tr.dailySprint,
        hint: "15 Min",
        run: () => setSprintOpen(true),
      },
      {
        id: "act-klausur-sim",
        group: lang === "de" ? "Aktionen" : "操作",
        label: tr.klausursim,
        run: () => switchTab("klausursim"),
      },
      {
        id: "act-export-xp",
        group: lang === "de" ? "Aktionen" : "操作",
        label: lang === "de" ? "XP-Fortschritt exportieren (JSON)" : "导出学习积分与进度 (JSON)",
        run: exportXp,
      },
      {
        id: "act-export-fsrs",
        group: lang === "de" ? "Aktionen" : "操作",
        label: lang === "de" ? "FSRS Fortschritt exportieren (JSON)" : "导出FSRS学习进度 (JSON)",
        hint: "Strg E",
        run: exportFsrs,
      },
      {
        id: "act-lang",
        group: lang === "de" ? "Aktionen" : "操作",
        label: lang === "de" ? "Sprache umschalten" : "切换语言",
        hint: "L",
        run: toggleLang,
      },
      {
        id: "act-onboarding",
        group: lang === "de" ? "Aktionen" : "操作",
        label: tr.obRedo,
        run: () => setObOpen(true),
      },
      {
        id: "act-help",
        group: lang === "de" ? "Aktionen" : "操作",
        label: lang === "de" ? "Tastaturhilfe" : "快捷键帮助",
        hint: "?",
        run: () => setHelpOpen(true),
      },
      {
        id: "act-settings",
        shortcutId: settingsShortcut.id,
        group: lang === "de" ? "Aktionen" : "操作",
        label: tr.settings,
        hint: settingsShortcut.altHint,
        run: () => switchTab("einstellungen"),
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [allNavItems, lang, activeNotes]
  );

  // Erststart: Vollbild-Assistent statt Modul-Chrome (L für Sprache gilt weiter).
  if (obOpen) {
    return (
      <div className="h-screen overflow-y-auto bg-[var(--paper)] text-[var(--ink)] antialiased">
        <Onboarding
          lang={lang}
          onLangChange={setLang}
          vaultConnected={vault !== null}
          vaultMsg={vaultMsg}
          onOpenVault={() => void openVault()}
          onFinish={finishOnboarding}
        />
        <FeedbackFloat lang={lang} />
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-[var(--paper)] text-[var(--ink)] antialiased">
      {/* Sidebar: Quiet archival tone with hairline border */}
      <aside className="flex w-16 shrink-0 flex-col border-r border-[var(--line)] bg-[var(--paper-subtle)] p-2 xl:w-60 xl:p-4">
        <div className="mb-4 flex items-center justify-center gap-2 xl:justify-start">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="shrink-0 text-[var(--accent)]">
            <path d="M2.5 3.2c1.8-.7 3.6-.7 5.5.4v9.2c-1.9-1.1-3.7-1.1-5.5-.4z" />
            <path d="M13.5 3.2c-1.8-.7-3.6-.7-5.5.4v9.2c1.9-1.1 3.7-1.1 5.5-.4z" />
          </svg>
          <div className="hidden xl:flex xl:items-baseline xl:gap-2">
            <span className="font-mono text-sm font-semibold tracking-tight text-[var(--ink)]">
              EF-Lernvault
            </span>
            <span className="font-mono text-[var(--text-meta)] text-[var(--gray)]">
              Gymnasium EF
            </span>
          </div>
        </div>

        <nav className="flex flex-col space-y-1.5 overflow-y-auto flex-1">
          {/* Kernbereiche (4 Fokus-Module) */}
          <div className="space-y-0.5">
            <div className="hidden px-2 pb-1 font-mono text-[var(--text-meta)] uppercase tracking-wider text-[var(--gray)] xl:block">
              {lang === "de" ? "Abitur-Fokus" : "会考核心 · Fokus"}
            </div>
            {coreTabs.map((item) => {
              const isActive = tab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => switchTab(item.id)}
                  aria-current={isActive ? "page" : undefined}
                  aria-label={item.label}
                  title={item.label}
                  className={`group flex h-8 w-full items-center justify-center rounded-[var(--radius)] px-2 text-left text-xs transition-colors cursor-pointer xl:justify-start xl:gap-2 ${
                    isActive
                      ? "bg-[var(--surface)] font-medium text-[var(--accent)] border border-[var(--line)] shadow-none"
                      : "text-[var(--gray)] hover:bg-[var(--surface)] hover:text-[var(--ink)]"
                  }`}
                >
                  <span className="flex h-4 w-4 shrink-0 items-center justify-center select-none text-current">
                    {item.icon}
                  </span>
                  <span className="hidden truncate font-sans text-xs font-medium xl:inline">
                    {item.label}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Erweiterte Werkzeuge & Labore (Klappbereich) */}
          <div className="pt-2 border-t border-[var(--line)] space-y-0.5">
            <button
              type="button"
              onClick={() => setToolsExpanded(!toolsExpanded)}
              className="flex h-7 w-full items-center justify-between rounded-[var(--radius)] px-2 text-left text-xs text-[var(--gray)] hover:text-[var(--ink)] transition-colors cursor-pointer"
              title={lang === "de" ? "Weitere Werkzeuge & Labore umschalten" : "展开/折叠更多工具与实验"}
            >
              <span className="hidden truncate font-mono text-[var(--text-meta)] uppercase tracking-wider xl:inline">
                {lang === "de" ? "Werkzeuge & Labore" : "工具与实验室"}
              </span>
              <span className="flex h-4 w-4 items-center justify-center select-none text-current">
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 16 16"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className={`transition-transform duration-200 ${toolsExpanded ? "rotate-180" : ""}`}
                  aria-hidden="true"
                >
                  <path d="M4 6l4 4 4-4" />
                </svg>
              </span>
            </button>

            {toolsExpanded && (
              <div className="space-y-0.5 pt-0.5">
                {auxTabs.map((sub) => {
                  const isActive = tab === sub.id;
                  return (
                    <button
                      key={sub.id}
                      onClick={() => switchTab(sub.id)}
                      aria-current={isActive ? "page" : undefined}
                      aria-label={sub.label}
                      title={sub.label}
                      className={`group flex h-8 w-full items-center justify-center rounded-[var(--radius)] px-2 text-left text-xs transition-colors cursor-pointer xl:justify-start xl:gap-2 ${
                        isActive
                          ? "bg-[var(--surface)] font-medium text-[var(--accent)] border border-[var(--line)] shadow-none"
                          : "text-[var(--gray)] hover:bg-[var(--surface)] hover:text-[var(--ink)]"
                      }`}
                    >
                      <span className="flex h-4 w-4 shrink-0 items-center justify-center select-none text-current">
                        {sub.icon}
                      </span>
                      <span className="hidden truncate font-sans text-xs font-medium xl:inline">
                        {sub.label}
                      </span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </nav>

        <div className="mt-2 border-t border-[var(--line)] pt-2">
          <button
            onClick={() => switchTab("einstellungen")}
            aria-current={tab === "einstellungen" ? "page" : undefined}
            aria-label={tr.settings}
            title={tr.settings}
            className={`group flex h-8 w-full items-center justify-center rounded-[var(--radius)] px-2 text-left text-xs transition-colors cursor-pointer xl:justify-start xl:gap-2 ${
              tab === "einstellungen"
                ? "bg-[var(--surface)] font-medium text-[var(--accent)] border border-[var(--line)] shadow-none"
                : "text-[var(--gray)] hover:bg-[var(--surface)] hover:text-[var(--ink)]"
            }`}
          >
            <span className="flex h-4 w-4 shrink-0 items-center justify-center select-none text-current">
              {icons.einstellungen}
            </span>
            <span className="hidden truncate font-sans text-xs font-medium xl:inline">
              {tr.settings}
            </span>
          </button>
        </div>

        {/* 侧端常驻伴学折纸桌宠 (Sidebar Pet Companion) */}
        <SidebarPet
          lang={lang}
          currentStreak={getStudyStreak().currentStreak || 18}
          xpToday={120}
          onOpenFocusSprint={() => setSprintOpen(true)}
        />

        <div className="hidden pt-2 border-t border-[var(--line)] text-[var(--text-meta)] font-mono text-[var(--gray)] leading-relaxed xl:block">
          <div className="flex items-center justify-between">
            <span>v0.2.0 · Offline</span>
            <button
              type="button"
              onClick={() => setHelpOpen(true)}
              className="hover:text-[var(--ink)] cursor-pointer transition-colors"
            >
              {lang === "de" ? "Hilfe" : "帮助"}
            </button>
          </div>
        </div>
      </aside>

      {/* Main Workspace */}
      <main className="flex min-w-0 flex-1 flex-col overflow-hidden bg-[var(--paper)]">
        {/* Top bar with hairline divider */}
        <header className="flex min-h-11 h-auto shrink-0 flex-wrap items-center justify-between gap-2.5 border-b border-[var(--line)] bg-[var(--paper)] px-4 py-1.5 sm:px-6">
          <div className="flex items-center gap-2">
            <span className="font-mono text-[var(--text-meta)] uppercase tracking-wider text-[var(--gray)]">
              {currentWorkspace === "lernen"
                ? (lang === "de" ? "Lernen" : "学习")
                : currentWorkspace === "wiederholen"
                ? (lang === "de" ? "Wiederholen" : "复习")
                : currentWorkspace === "ueben"
                ? (lang === "de" ? "Üben" : "练习")
                : "Home"}
            </span>
            <span className="text-[var(--gray)] text-xs">/</span>
            <span className="font-serif text-sm font-medium text-[var(--ink)]">
              {allNavItems.find((n) => n.id === tab)?.label}
              {tab === "fach" && selectedFach !== "alle" && (
                <span className="ml-1.5 font-mono text-xs font-normal text-[var(--gray)]">
                  · {lang === "de" ? getFach(selectedFach)?.nameDE : getFach(selectedFach)?.nameZH}
                </span>
              )}
            </span>
          </div>

          <div className="flex min-w-48 flex-1 items-center max-w-sm">
            <input
              ref={searchRef}
              title="/"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={tr.search}
              className="w-full rounded-[var(--radius)] border border-[var(--line)] bg-[var(--surface)] px-2.5 py-1 font-sans text-xs text-[var(--ink)] placeholder:text-[var(--gray)] focus:border-[var(--accent)]"
            />
          </div>

          <div className="flex flex-wrap items-center justify-end gap-2.5">
            <div className="flex items-center gap-1.5 rounded-[var(--radius)] border border-[var(--line)] bg-[var(--surface)] px-2 py-0.5">
              <label htmlFor="header-fach-select" className="font-mono text-[var(--text-meta)] text-[var(--gray)]">
                Fach:
              </label>
              <select
                id="header-fach-select"
                value={selectedFach}
                onChange={(e) => setSelectedFach(e.target.value)}
                aria-label={lang === "de" ? "Fach auswählen" : "选择学科"}
                className="border-none bg-transparent font-sans text-xs text-[var(--ink)] focus:outline-none cursor-pointer"
              >
                <option value="alle">{lang === "de" ? "Alle Fächer (10)" : "所有学科 (10)"}</option>
                {FAECHER.map((f) => (
                  <option key={f.id} value={f.id}>
                    {f.kurz} · {lang === "de" ? f.nameDE : f.nameZH}
                  </option>
                ))}
              </select>
            </div>
            <button
              type="button"
              onClick={() => setKnowledgeManagerOpen(true)}
              className="flex items-center gap-1.5 rounded-[var(--radius)] border border-[var(--line)] bg-[var(--surface)] px-2.5 py-1 font-mono text-xs text-[var(--ink)] transition-colors hover:bg-[var(--paper-subtle)] cursor-pointer"
              title={lang === "de" ? "Wissensbasis & Framework verwalten" : "知识库管理与模块化扩展"}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="h-3.5 w-3.5">
                <path d="M2.5 3.5h11M2.5 8h11M2.5 12.5h11" />
                <circle cx="5" cy="3.5" r="1" fill="currentColor" />
                <circle cx="10" cy="8" r="1" fill="currentColor" />
                <circle cx="7" cy="12.5" r="1" fill="currentColor" />
              </svg>
              <span>{lang === "de" ? "Wissensbasis" : "知识库"}</span>
            </button>
            <button
              type="button"
              onClick={() => setSprintOpen(true)}
              className="flex items-center gap-1.5 rounded-[var(--radius)] border border-[var(--line)] bg-[var(--surface)] px-2.5 py-1 font-mono text-xs text-[var(--ink)] transition-colors hover:bg-[var(--paper-subtle)] cursor-pointer"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="h-3.5 w-3.5">
                <path d="M8 2.5v3M8 10.5v3M2.5 8h3M10.5 8h3" />
                <circle cx="8" cy="8" r="3.2" />
              </svg>
              <span>{tr.dailySprint}</span>
              {getStudyStreak().currentStreak > 0 && (
                <span className="ml-1 rounded-[var(--radius)] border border-[var(--success)] px-1 py-0.2 text-[var(--text-meta)] text-[var(--success)]">
                  {getStudyStreak().currentStreak}d
                </span>
              )}
            </button>
            {vaultMsg && (
              <span className="hidden font-mono text-[var(--text-meta)] text-[var(--gray)] lg:block">{vaultMsg}</span>
            )}
          </div>
        </header>

        {/* Content Viewport */}
        <div
          key={tab}
          className={`tab-enter min-w-0 flex-1 ${
            tab === "fach" ? "overflow-hidden p-0 h-full flex flex-col" : "overflow-y-auto p-4 sm:p-6 xl:p-8"
          }`}
        >
          {tab === "home" && (
            useCockpitHome ? (
              <DashboardCockpit
                lang={lang}
                onNavigateToTab={(targetTab, context) => {
                  if (context?.fach) {
                    setSelectedFach(context.fach);
                  }
                  if (targetTab === "library" && context?.query) {
                    setQuery(context.query);
                  }
                  switchTab(targetTab as Tab);
                }}
                onSwitchToLegacy={() => setUseCockpitHome(false)}
              />
            ) : (
              <div className="space-y-4">
                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={() => setUseCockpitHome(true)}
                    className="font-mono text-xs text-[var(--accent)] hover:underline border border-[var(--line)] px-2.5 py-1 rounded bg-[var(--surface)] cursor-pointer"
                  >
                    {lang === "de" ? "-> Zum neuen Cockpit V3 (Diagnose & Stufen)" : "-> 切换到全新战力总台 V3 (诊断与段位天梯)"}
                  </button>
                </div>
                <Home lang={lang} cards={activeCards} onJumpToLibrary={jumpToLibrary} />
              </div>
            )
          )}
          {tab === "fach" && (
            <SubjectWorkspace
              currentFach={selectedFach}
              onSubjectChange={(fachId) => setSelectedFach(fachId)}
              onNavigateToTab={(targetTab, opts) => {
                if (opts?.fach) setSelectedFach(opts.fach);
                if (opts?.query) setQuery(opts.query);
                if (opts?.noteId) setSelectedNoteId(opts.noteId);
                switchTab(targetTab as Tab);
              }}
              lang={lang}
            />
          )}
          {tab === "library" && (
            <Library
              query={query}
              vault={activeNotes}
              cards={activeCards}
              selectedFach={selectedFach}
              selectedNoteId={selectedNoteId}
              onClearQuery={() => setQuery("")}
              onSubjectChange={setSelectedFach}
              onNavigateToTab={(targetTab, opts) => {
                if (opts?.fach) setSelectedFach(opts.fach);
                if (opts?.query) setQuery(opts.query);
                if (opts?.noteId) setSelectedNoteId(opts.noteId);
                switchTab(targetTab as Tab);
              }}
              lang={lang}
            />
          )}
          {tab === "flashcards" && (
            <Flashcards
              lang={lang}
              vault={activeCards}
              selectedFach={selectedFach}
              onSubjectChange={setSelectedFach}
            />
          )}
          {tab === "quiz" && (
            <Quiz
              lang={lang}
              vault={activeNotes}
              cards={activeCards}
              preselectedFach={selectedFach === "alle" ? undefined : selectedFach}
              onJumpToLibrary={jumpToLibrary}
            />
          )}
          {tab === "werkzeuge" && (
            <Werkzeuge
              lang={lang}
              selectedFach={selectedFach}
              onSubjectChange={setSelectedFach}
              onDiscussInTutor={jumpToTutor}
            />
          )}
          {tab === "klausursim" && (
            <KlausurSim
              notes={activeNotes}
              currentFach={selectedFach === "alle" ? undefined : selectedFach}
              onSubjectChange={setSelectedFach}
              onJumpToLibrary={jumpToLibrary}
            />
          )}
          {tab === "tutor" && (
            <Tutor
              lang={lang}
              vaultNotes={activeNotes}
              activeFach={selectedFach === "alle" ? undefined : selectedFach}
              initialInput={tutorPrefilledInput}
              onSubjectChange={setSelectedFach}
              onJumpToLibrary={jumpToLibrary}
              onOpenSettings={() => switchTab("einstellungen")}
            />
          )}
          {tab === "planner" && <Planner lang={lang} vaultNotes={activeNotes} />}
          {tab === "mindmap" && (
            <Mindmap
              lang={lang}
              vaultNotes={activeNotes}
              selectedFach={selectedFach}
              onSubjectChange={setSelectedFach}
              onJumpToLibrary={jumpToLibrary}
            />
          )}
          {tab === "reise" && (
            <ReiseModule
              lang={lang}
              vaultReisen={vault?.reisen ?? defaultVaultReisen}
              initialCourseId={activeReiseId}
              initialViewMode="document"
            />
          )}
          {tab === "labor" && (
            <Labor
              lang={lang}
              onDiscussInTutor={jumpToTutor}
            />
          )}
          {tab === "designlab" && (
            <DesignLab lang={lang} />
          )}
          {tab === "lernbaum" && (
            <Lernbaum
              lang={lang}
              baeume={BAEUME_LISTE}
              vaultNotes={activeNotes}
              vaultReisen={vault?.reisen ?? defaultVaultReisen}
              selectedFach={selectedFach}
              initialAnsicht="pfad"
              onSubjectChange={setSelectedFach}
              onJumpToLibrary={jumpToLibrary}
              onStartCourse={(courseId) => {
                setActiveReiseId(courseId);
                switchTab("reise");
              }}
              onJumpToKlausur={(fach) => {
                setSelectedFach(fach);
                switchTab("klausursim");
              }}
            />
          )}
          {tab === "einstellungen" && (
            <Settings
              lang={lang}
              onLangChange={setLang}
              vaultConnected={vault !== null}
              vaultMsg={vaultMsg}
              onOpenVault={() => void openVault()}
              onOpenKnowledgeManager={() => setKnowledgeManagerOpen(true)}
              onExportFsrs={exportFsrs}
              onExportXp={exportXp}
              onRedoOnboarding={() => setObOpen(true)}
              onOpenHelp={() => setHelpOpen(true)}
              devMode={devMode}
              onDevModeChange={setDevMode}
            />
          )}
        </div>
      </main>
      <Palette open={paletteOpen} onClose={() => setPaletteOpen(false)} items={paletteItems} />
      <HelpOverlay open={helpOpen} onClose={() => setHelpOpen(false)} lang={lang} />
      <DailySprintModal
        isOpen={sprintOpen}
        lang={lang}
        onClose={() => setSprintOpen(false)}
        cards={activeCards}
        notes={activeNotes}
        currentFach={selectedFach === "alle" ? "SoWi" : selectedFach}
      />
      <KnowledgeManagerModal
        isOpen={knowledgeManagerOpen}
        onClose={() => setKnowledgeManagerOpen(false)}
        lang={lang}
      />
      <FeedbackFloat lang={lang} />
    </div>
  );
}
