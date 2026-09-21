import { useState } from "react";
import { t, type Lang } from "./i18n";
import Library from "./modules/Library";
import Flashcards from "./modules/Flashcards";
import Quiz from "./modules/Quiz";
import Tutor from "./modules/Tutor";
import Planner from "./modules/Planner";
import Mindmap from "./modules/Mindmap";

type Tab = "library" | "flashcards" | "quiz" | "tutor" | "planner" | "mindmap";

const getInitialTab = (): Tab => {
  if (typeof window !== "undefined") {
    const params = new URLSearchParams(window.location.search);
    const t = params.get("tab") as Tab;
    if (["library", "flashcards", "quiz", "tutor", "planner", "mindmap"].includes(t)) {
      return t;
    }
  }
  return "library";
};

export default function App() {
  const [tab, setTab] = useState<Tab>(getInitialTab);
  const [lang, setLang] = useState<Lang>("zh");
  const [query, setQuery] = useState("");
  const tr = t(lang);

  const switchTab = (id: Tab) => {
    setTab(id);
    if (typeof window !== "undefined") {
      const url = new URL(window.location.href);
      url.searchParams.set("tab", id);
      window.history.replaceState({}, "", url.toString());
    }
  };

  const nav: { id: Tab; label: string; icon: string }[] = [
    { id: "library", label: tr.library, icon: "📚" },
    { id: "flashcards", label: tr.flashcards, icon: "🃏" },
    { id: "quiz", label: tr.quiz, icon: "📝" },
    { id: "tutor", label: tr.tutor, icon: "🤖" },
    { id: "planner", label: tr.planner, icon: "📅" },
    { id: "mindmap", label: tr.mindmap, icon: "🧠" },
  ];

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
                className={`flex items-center gap-2.5 px-3 py-2 text-left text-sm transition-colors rounded-sm ${
                  isActive
                    ? "font-medium text-[#4338CA] bg-[#ECE7DC]/60 border-l-2 border-[#4338CA]"
                    : "text-[#6B675C] hover:text-[#1C1B17] hover:bg-[#ECE7DC]/30 border-l-2 border-transparent"
                }`}
              >
                <span className="text-base select-none">{n.icon}</span>
                <span className="font-sans">{n.label}</span>
              </button>
            );
          })}
        </nav>

        <div className="mt-auto pt-4 border-t border-[#E5E1D8] text-[11px] font-mono text-[#6B675C] leading-relaxed">
          v0.1.0-prototype
          <br />
          lokal · offline-fähig
        </div>
      </aside>

      {/* Main Workspace */}
      <main className="flex flex-1 flex-col overflow-hidden bg-[#FAFAF7]">
        {/* Top bar with hairline divider */}
        <header className="flex h-14 items-center justify-between gap-4 border-b border-[#E5E1D8] bg-[#FAFAF7] px-6">
          <div className="flex flex-1 items-center max-w-lg">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={tr.search}
              className="w-full rounded-sm border border-[#E5E1D8] bg-white px-3 py-1.5 text-sm text-[#1C1B17] placeholder:text-[#6B675C] focus:border-[#4338CA] focus:outline-none transition-colors font-sans"
            />
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setLang((l) => (l === "zh" ? "de" : "zh"))}
              className="rounded-sm border border-[#E5E1D8] bg-white px-3 py-1.5 text-xs font-sans text-[#1C1B17] hover:border-[#4338CA] hover:text-[#4338CA] transition-colors"
              title="Sprache umschalten / 切换语言"
            >
              {lang === "zh" ? "DE / 德语" : "ZH / 中文"}
            </button>
          </div>
        </header>

        {/* Content Viewport */}
        <div className="flex-1 overflow-y-auto p-8">
          {tab === "library" && <Library query={query} />}
          {tab === "flashcards" && <Flashcards lang={lang} />}
          {tab === "quiz" && <Quiz />}
          {tab === "tutor" && <Tutor lang={lang} />}
          {tab === "planner" && <Planner />}
          {tab === "mindmap" && <Mindmap />}
        </div>
      </main>
    </div>
  );
}
