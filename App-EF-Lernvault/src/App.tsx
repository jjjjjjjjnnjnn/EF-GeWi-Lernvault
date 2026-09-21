import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { t, type Lang } from "./i18n";
import { notes } from "./data";
import { isTyping } from "./keys";
import { FAECHER } from "./fach";
import Palette, { type PaletteItem } from "./components/Palette";
import HelpOverlay from "./components/HelpOverlay";
import { pickVault, type VaultData } from "./vault/loader";
import Library from "./modules/Library";
import Flashcards from "./modules/Flashcards";
import Quiz from "./modules/Quiz";
import Tutor from "./modules/Tutor";
import Planner from "./modules/Planner";
import Mindmap from "./modules/Mindmap";
import ReiseModule from "./modules/Reise";

type Tab = "library" | "flashcards" | "quiz" | "tutor" | "planner" | "mindmap" | "reise";

// Tufte Data-Ink: hand-drawn hairline nav icons, no emoji. 16x16, stroke=currentColor.
const iconProps = {
  width: 15,
  height: 15,
  viewBox: "0 0 16 16",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.4,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": true,
} as const;

const icons: Record<Tab, ReactNode> = {
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
};

const getInitialTab = (): Tab => {
  if (typeof window !== "undefined") {
    const params = new URLSearchParams(window.location.search);
    const t = params.get("tab") as Tab;
    if (["library", "flashcards", "quiz", "tutor", "planner", "mindmap", "reise"].includes(t)) {
      return t;
    }
  }
  return "library";
};

export default function App() {
  const [tab, setTab] = useState<Tab>(getInitialTab);
  const [lang, setLang] = useState<Lang>("zh");
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
    { id: "library", label: tr.library, icon: icons.library },
    { id: "flashcards", label: tr.flashcards, icon: icons.flashcards },
    { id: "quiz", label: tr.quiz, icon: icons.quiz },
    { id: "tutor", label: tr.tutor, icon: icons.tutor },
    { id: "planner", label: tr.planner, icon: icons.planner },
    { id: "mindmap", label: tr.mindmap, icon: icons.mindmap },
    { id: "reise", label: tr.reise, icon: icons.reise },
  ];

  const TAB_ORDER: Tab[] = ["library", "flashcards", "quiz", "tutor", "planner", "mindmap", "reise"];
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [helpOpen, setHelpOpen] = useState(false);
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
      setVaultMsg(`${v.rootName}: ${v.notes.length} Notizen · ${v.cards.length} Karten · ${v.reisen.length} Reisen`);
      if (v.notes.length > 0) switchTab("library");
    } catch {
      // Picker abgebrochen / 用户取消
    }
  };

  // Global keys: Ctrl/⌘K palette · / search · Alt 1-7 tabs · L language · ? help.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setPaletteOpen((o) => !o);
        return;
      }
      if (isTyping()) return;
      if (e.key === "/") {
        e.preventDefault();
        if (tab !== "library") switchTab("library");
        searchRef.current?.focus();
      } else if (e.key === "?") {
        setHelpOpen(true);
      } else if (e.key.toLowerCase() === "l" && !e.altKey && !e.ctrlKey && !e.metaKey) {
        toggleLang();
      } else if (e.altKey && e.key >= "1" && e.key <= "7") {
        e.preventDefault();
        switchTab(TAB_ORDER[Number(e.key) - 1]);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  const paletteItems: PaletteItem[] = useMemo(
    () => [
      ...nav.map((n, i) => ({
        id: `tab-${n.id}`,
        group: lang === "de" ? "Module" : "模块",
        label: n.label,
        hint: `Alt ${i + 1}`,
        run: () => switchTab(n.id),
      })),
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
        id: "act-export-xp",
        group: lang === "de" ? "Aktionen" : "操作",
        label: lang === "de" ? "XP-Fortschritt exportieren (JSON)" : "导出学习积分与进度 (JSON)",
        run: () => {
          const raw = localStorage.getItem("eflernvault:xp:v1") || "{}";
          const blob = new Blob([raw], { type: "application/json" });
          const url = URL.createObjectURL(blob);
          const a = document.createElement("a");
          a.href = url;
          a.download = "eflernvault-xp.json";
          a.click();
          URL.revokeObjectURL(url);
        },
      },
      {
        id: "act-lang",
        group: lang === "de" ? "Aktionen" : "操作",
        label: lang === "de" ? "Sprache umschalten" : "切换语言",
        hint: "L",
        run: toggleLang,
      },
      {
        id: "act-help",
        group: lang === "de" ? "Aktionen" : "操作",
        label: lang === "de" ? "Tastaturhilfe" : "快捷键帮助",
        hint: "?",
        run: () => setHelpOpen(true),
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [nav, lang, vault]
  );

  return (
    <div className="flex h-screen bg-[#FAFAF7] text-[#1C1B17] antialiased">
      {/* Sidebar: Quiet archival tone with hairline border */}
      <aside className="flex w-60 flex-col border-r border-[#E5E1D8] bg-[#F7F5F0] p-5">
        <div className="mb-8">
          <div className="font-serif text-lg font-semibold tracking-tight text-[#1C1B17]">
            EF-Lernvault
          </div>
          <div className="text-xs text-[#6B675C] font-sans tracking-wide">
            Gymnasium Lernstudio · EF
          </div>
        </div>

        <nav className="flex flex-col space-y-1">
          {nav.map((n) => {
            const isActive = tab === n.id;
            return (
              <button
                key={n.id}
                onClick={() => switchTab(n.id)}
                className={`flex items-center gap-2.5 px-3 py-2 text-left text-sm transition-all duration-150 rounded-sm active:scale-[0.98] focus-visible:outline focus-visible:outline-1 focus-visible:outline-[#4338CA] ${
                  isActive
                    ? "font-medium text-[#4338CA] bg-[#ECE7DC]/60 border-l-2 border-[#4338CA]"
                    : "text-[#6B675C] hover:text-[#1C1B17] hover:bg-[#ECE7DC]/30 active:bg-[#ECE7DC]/60 border-l-2 border-transparent"
                }`}
              >
                <span className="shrink-0 select-none">{n.icon}</span>
                <span className="font-sans">{n.label}</span>
              </button>
            );
          })}
        </nav>

        <div className="mt-auto pt-4 border-t border-[#E5E1D8] text-[11px] font-mono text-[#6B675C] leading-relaxed">
          v0.2.0-curriculum
          <br />
          lokal · offline-fähig
          <br />
          Strg K · ? Tastatur
        </div>
      </aside>

      {/* Main Workspace */}
      <main className="flex flex-1 flex-col overflow-hidden bg-[#FAFAF7]">
        {/* Top bar with hairline divider */}
        <header className="flex h-14 items-center justify-between gap-4 border-b border-[#E5E1D8] bg-[#FAFAF7] px-6">
          <div className="flex flex-1 items-center max-w-lg">
            <input
              ref={searchRef}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={tr.search}
              title="/"
              className="w-full rounded-sm border border-[#E5E1D8] bg-white px-3 py-1.5 text-sm text-[#1C1B17] placeholder:text-[#6B675C] focus:border-[#4338CA] focus:outline-none transition-colors font-sans"
            />
          </div>

          <div className="flex items-center gap-3">
            {vaultMsg && (
              <span className="hidden font-mono text-[11px] text-[#6B675C] lg:block">{vaultMsg}</span>
            )}
            <button
              onClick={() => void openVault()}
              className="flex items-center gap-1.5 rounded-sm border border-[#E5E1D8] bg-white px-3 py-1.5 text-xs font-sans text-[#1C1B17] hover:border-[#4338CA] hover:text-[#4338CA] active:scale-95 transition-all duration-150"
              title={lang === "de" ? "Lokalen Vault-Ordner öffnen" : "打开本地知识库文件夹"}
            >
              <svg width="13" height="13" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M1.5 4.5a1 1 0 0 1 1-1h3.2l1.3 1.6h6.5a1 1 0 0 1 1 1v5.4a1 1 0 0 1-1 1h-11a1 1 0 0 1-1-1V4.5z" />
              </svg>
              {lang === "de" ? "Vault öffnen" : "打开知识库"}
            </button>
            <button
              onClick={() => setPaletteOpen(true)}
              className="rounded-sm border border-[#E5E1D8] bg-white px-3 py-1.5 text-xs font-sans text-[#1C1B17] hover:border-[#4338CA] hover:text-[#4338CA] active:scale-95 transition-all duration-150"
              title="Strg/⌘ K"
            >
              {lang === "de" ? "Befehle" : "命令"}
              <kbd className="ml-2 font-mono text-[10px] text-[#6B675C]">Strg K</kbd>
            </button>
            <button
              onClick={() => setLang((l) => (l === "zh" ? "de" : "zh"))}
              className="rounded-sm border border-[#E5E1D8] bg-white px-3 py-1.5 text-xs font-sans text-[#1C1B17] hover:border-[#4338CA] hover:text-[#4338CA] active:scale-95 transition-all duration-150"
              title="Sprache umschalten / 切换语言 (L)"
            >
              {lang === "zh" ? "DE / 德语" : "ZH / 中文"}
            </button>
            <button
              onClick={() => setHelpOpen(true)}
              className="rounded-sm border border-[#E5E1D8] bg-white px-3 py-1.5 font-mono text-xs text-[#6B675C] hover:border-[#4338CA] hover:text-[#4338CA] active:scale-95 transition-all duration-150"
              title="Tastaturhilfe / 快捷键 (?)"
            >
              ?
            </button>
          </div>
        </header>

        {/* Content Viewport */}
        <div key={tab} className="tab-enter flex-1 overflow-y-auto p-8">
          {tab === "library" && <Library query={query} vault={vault?.notes ?? null} selectedFach={selectedFach} />}
          {tab === "flashcards" && <Flashcards lang={lang} vault={vault?.cards ?? null} />}
          {tab === "quiz" && <Quiz />}
          {tab === "tutor" && <Tutor lang={lang} />}
          {tab === "planner" && <Planner />}
          {tab === "mindmap" && <Mindmap />}
          {tab === "reise" && <ReiseModule lang={lang} vaultReisen={vault?.reisen ?? null} />}
        </div>
      </main>
      <Palette open={paletteOpen} onClose={() => setPaletteOpen(false)} items={paletteItems} />
      <HelpOverlay open={helpOpen} onClose={() => setHelpOpen(false)} lang={lang} />
    </div>
  );
}
