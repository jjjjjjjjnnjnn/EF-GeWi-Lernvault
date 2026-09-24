import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { t, type Lang } from "./i18n";
import { notes } from "./data";
import { GLOBAL_KEYS, MODULE_KEYS, isTyping, matchesKey } from "./keys";
import { FAECHER } from "./fach";
import Palette, { type PaletteItem } from "./components/Palette";
import HelpOverlay from "./components/HelpOverlay";
import { FeedbackFloat, setFeedbackContext } from "./components/FeedbackBox";
import { pickVault, type VaultData } from "./vault/loader";
import { xpStore } from "./engine/stores";
import { FSRS_STORAGE_KEY, LANG_STORAGE_KEY } from "./engine/storageKeys";
import Library from "./modules/Library";
import Home from "./modules/Home";
import Flashcards from "./modules/Flashcards";
import Quiz from "./modules/Quiz";
import Tutor from "./modules/Tutor";
import Planner from "./modules/Planner";
import Mindmap from "./modules/Mindmap";
import ReiseModule from "./modules/Reise";
import { KlausurSim } from "./modules/KlausurSim";
import { DailySprintModal } from "./components/DailySprintModal";
import { getStudyStreak } from "./engine/dailyMix";
import Settings from "./modules/Settings";
import Onboarding, { loadOnboarding, saveOnboarding, type OnboardingResult } from "./modules/Onboarding";
import { initTheme } from "./engine/theme";

type Tab = "home" | "library" | "flashcards" | "quiz" | "klausursim" | "tutor" | "planner" | "mindmap" | "reise" | "einstellungen";

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
  reise: (
    <svg {...iconProps}>
      <circle cx="8" cy="8" r="6" />
      <path d="M10.8 5.2l-2.1 4.7-4-1.2 2.1-4.7 4 1.2z" />
    </svg>
  ),
  einstellungen: (
    <svg {...iconProps}>
      <circle cx="8" cy="8" r="2.2" />
      <path d="M8 1.6v2.1M8 12.3v2.1M1.6 8h2.1M12.3 8h2.1M3.5 3.5l1.5 1.5M11 11l1.5 1.5M12.5 3.5L11 5M5 11l-1.5 1.5" />
    </svg>
  ),
};

const getInitialTab = (): Tab => {
  if (typeof window !== "undefined") {
    const params = new URLSearchParams(window.location.search);
    const t = params.get("tab") as Tab;
    if (["home", "library", "flashcards", "quiz", "klausursim", "tutor", "planner", "mindmap", "reise", "einstellungen"].includes(t)) {
      return t;
    }
  }
  return "home";
};

export default function App() {
  const [tab, setTab] = useState<Tab>(getInitialTab);
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
  const tr = t(lang);

  const switchTab = (id: Tab) => {
    setTab(id);
    if (typeof window !== "undefined") {
      const url = new URL(window.location.href);
      url.searchParams.set("tab", id);
      window.history.replaceState({}, "", url.toString());
    }
  };

  const nav: { id: Tab; label: string; icon: ReactNode }[] = [
    { id: "home", label: tr.home, icon: icons.home },
    { id: "library", label: tr.library, icon: icons.library },
    { id: "flashcards", label: tr.flashcards, icon: icons.flashcards },
    { id: "quiz", label: tr.quiz, icon: icons.quiz },
    { id: "klausursim", label: tr.klausursim, icon: icons.klausursim },
    { id: "tutor", label: tr.tutor, icon: icons.tutor },
    { id: "planner", label: tr.planner, icon: icons.planner },
    { id: "mindmap", label: tr.mindmap, icon: icons.mindmap },
    { id: "reise", label: tr.reise, icon: icons.reise },
  ];

  const [paletteOpen, setPaletteOpen] = useState(false);
  const [helpOpen, setHelpOpen] = useState(false);
  const [sprintOpen, setSprintOpen] = useState(false);

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

  const openVault = async () => {
    try {
      if (!("showDirectoryPicker" in window)) {
        setVaultMsg(lang === "de" ? "Bitte Edge/Chrome nutzen oder Tauri-Build abwarten." : "请用 Edge/Chrome 打开，或等 Tauri 打包版。");
        return;
      }
      const v = await pickVault();
      setVault(v);
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

  const jumpToLibrary = (targetQuery: string) => {
    switchTab("library");
    setQuery(targetQuery);
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
          if (paletteOpen) setPaletteOpen(false);
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
      ...nav.map((n) => {
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
      ...(vault
        ? vault.notes.map((n) => ({
            id: `note-${n.id}`,
            group: lang === "de" ? "Notizen" : "笔记",
            label: n.thema,
            sub: `${n.fach} · ${n.operatoren.join(" / ")}`,
            run: () => {
              switchTab("library");
              setQuery(n.thema);
            },
          }))
        : notes.map((n) => ({
            id: `note-${n.id}`,
            group: lang === "de" ? "Notizen" : "笔记",
            label: n.thema,
            sub: `${n.fach} · ${n.zh}`,
            run: () => {
              switchTab("library");
              setQuery(n.thema);
            },
          }))),
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
    [nav, lang, vault]
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

        <nav className="flex flex-col space-y-0.5">
          {nav.map((n) => {
            const isActive = tab === n.id;
            return (
              <button
                key={n.id}
                onClick={() => switchTab(n.id)}
                aria-current={isActive ? "page" : undefined}
                aria-label={n.label}
                title={n.label}
                className={`flex items-center justify-center gap-2 px-2 py-1.5 text-left text-xs transition-all duration-[var(--dur-normal)] rounded-[var(--radius)] active:scale-[0.98] xl:justify-start xl:px-2.5 ${
                  isActive
                    ? "font-medium text-[var(--accent)] bg-[var(--surface)] border-l-2 border-[var(--accent)] shadow-none"
                    : "text-[var(--gray)] hover:text-[var(--ink)] hover:bg-[var(--surface)]/60 active:bg-[var(--paper-subtle)] border-l-2 border-transparent"
                }`}
              >
                <span className="shrink-0 select-none">{n.icon}</span>
                <span className="hidden font-sans xl:inline">{n.label}</span>
              </button>
            );
          })}
        </nav>

        <div className="mt-3 border-t border-[var(--line)] pt-2">
          <button
            onClick={() => switchTab("einstellungen")}
            aria-current={tab === "einstellungen" ? "page" : undefined}
            aria-label={tr.settings}
            title={`${tr.settings} (${settingsShortcut.altHint})`}
            className={`flex w-full items-center justify-center gap-2 px-2 py-1.5 text-left text-xs transition-all duration-[var(--dur-normal)] rounded-[var(--radius)] active:scale-[0.98] xl:justify-start xl:px-2.5 ${
              tab === "einstellungen"
                ? "font-medium text-[var(--accent)] bg-[var(--surface)] border-l-2 border-[var(--accent)] shadow-none"
                : "text-[var(--gray)] hover:text-[var(--ink)] hover:bg-[var(--surface)]/60 active:bg-[var(--paper-subtle)] border-l-2 border-transparent"
            }`}
          >
            <span className="shrink-0 select-none">{icons.einstellungen}</span>
            <span className="hidden font-sans xl:inline">{tr.settings}</span>
            <kbd className="ml-auto hidden font-mono text-[var(--text-meta)] text-[var(--gray)] xl:inline">{settingsShortcut.altHint}</kbd>
          </button>
        </div>

        <div className="mt-auto hidden pt-2 border-t border-[var(--line)] text-[var(--text-meta)] font-mono text-[var(--gray)] leading-relaxed xl:block">
          <div className="flex items-center justify-between">
            <span>v0.2.0 · Offline</span>
            <span>? 帮助</span>
          </div>
        </div>
      </aside>

      {/* Main Workspace */}
      <main className="flex min-w-0 flex-1 flex-col overflow-hidden bg-[var(--paper)]">
        {/* Top bar with hairline divider */}
        <header className="flex h-11 shrink-0 flex-wrap items-center justify-between gap-3 border-b border-[var(--line)] bg-[var(--paper)] px-4 py-1.5 sm:px-6">
          <div className="flex min-w-64 flex-1 items-center max-w-lg">
            <input
              ref={searchRef}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={tr.search}
              title="/"
              className="w-full rounded-[var(--radius)] border border-[var(--line)] bg-[var(--surface)] px-2.5 py-1 font-sans text-xs text-[var(--ink)] placeholder:text-[var(--gray)] focus:border-[var(--accent)]"
            />
          </div>

          <div className="flex flex-wrap items-center justify-end gap-2.5">
            <div
              role="group"
              aria-label={tr.languageSwitchLabel}
              className="flex items-center rounded-full border border-[var(--line)] bg-[var(--surface)] p-0.5"
            >
              <button
                type="button"
                onClick={() => setLang("de")}
                aria-label={tr.languageGermanLabel}
                aria-pressed={lang === "de"}
                title={tr.languageGermanLabel}
                className={`rounded-full px-2 py-0.5 font-mono text-[var(--text-meta)] ${
                  lang === "de" ? "bg-[var(--accent)] text-white" : "text-[var(--gray)] hover:text-[var(--ink)]"
                }`}
              >
                DE
              </button>
              <button
                type="button"
                onClick={() => setLang("zh")}
                aria-label={tr.languageChineseLabel}
                aria-pressed={lang === "zh"}
                title={tr.languageChineseLabel}
                className={`rounded-full px-2 py-0.5 font-sans text-[var(--text-meta)] ${
                  lang === "zh" ? "bg-[var(--accent)] text-white" : "text-[var(--gray)] hover:text-[var(--ink)]"
                }`}
              >
                中文
              </button>
            </div>
            <button
              type="button"
              onClick={() => setSprintOpen(true)}
              className="flex items-center gap-1.5 rounded-[var(--radius)] border border-[var(--line)] bg-[var(--surface)] px-2.5 py-1 font-mono text-xs text-[var(--ink)] transition-colors hover:bg-[var(--paper-subtle)]"
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
        <div key={tab} className="tab-enter min-w-0 flex-1 overflow-y-auto p-4 sm:p-6 xl:p-8">
          {tab === "home" && <Home lang={lang} cards={vault?.cards ?? null} onJumpToLibrary={jumpToLibrary} />}
          {tab === "library" && <Library query={query} vault={vault?.notes ?? null} selectedFach={selectedFach} onClearQuery={() => setQuery("")} onSubjectChange={setSelectedFach} />}
          {tab === "flashcards" && <Flashcards lang={lang} vault={vault?.cards ?? null} />}
          {tab === "quiz" && <Quiz lang={lang} vault={vault?.notes ?? null} cards={vault?.cards ?? null} onJumpToLibrary={jumpToLibrary} />}
          {tab === "klausursim" && (
            <KlausurSim
              notes={vault?.notes ?? []}
              currentFach={selectedFach === "alle" ? undefined : selectedFach}
              onSubjectChange={setSelectedFach}
            />
          )}
          {tab === "tutor" && (
            <Tutor
              lang={lang}
              vaultNotes={vault?.notes ?? null}
              onJumpToLibrary={jumpToLibrary}
              onOpenSettings={() => switchTab("einstellungen")}
            />
          )}
          {tab === "planner" && <Planner lang={lang} vaultNotes={vault?.notes ?? null} />}
          {tab === "mindmap" && <Mindmap lang={lang} vaultNotes={vault?.notes ?? null} onJumpToLibrary={jumpToLibrary} />}
          {tab === "reise" && <ReiseModule lang={lang} vaultReisen={vault?.reisen ?? null} />}
          {tab === "einstellungen" && (
            <Settings
              lang={lang}
              onLangChange={setLang}
              vaultConnected={vault !== null}
              vaultMsg={vaultMsg}
              onOpenVault={() => void openVault()}
              onExportFsrs={exportFsrs}
              onExportXp={exportXp}
              onRedoOnboarding={() => setObOpen(true)}
              onOpenHelp={() => setHelpOpen(true)}
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
        cards={vault?.cards ?? []}
        notes={vault?.notes ?? []}
        currentFach={selectedFach === "alle" ? "SoWi" : selectedFach}
      />
      <FeedbackFloat lang={lang} />
    </div>
  );
}
