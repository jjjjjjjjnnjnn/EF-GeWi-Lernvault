import { useState } from "react";
import { t, type Lang } from "./i18n";
import Library from "./modules/Library";
import Flashcards from "./modules/Flashcards";
import Quiz from "./modules/Quiz";
import Tutor from "./modules/Tutor";
import Planner from "./modules/Planner";
import Mindmap from "./modules/Mindmap";

type Tab = "library" | "flashcards" | "quiz" | "tutor" | "planner" | "mindmap";

export default function App() {
  const [tab, setTab] = useState<Tab>("library");
  const [lang, setLang] = useState<Lang>("zh");
  const [query, setQuery] = useState("");
  const tr = t(lang);
  const nav: { id: Tab; label: string; icon: string }[] = [
    { id: "library", label: tr.library, icon: "📚" },
    { id: "flashcards", label: tr.flashcards, icon: "🃏" },
    { id: "quiz", label: tr.quiz, icon: "📝" },
    { id: "tutor", label: tr.tutor, icon: "🤖" },
    { id: "planner", label: tr.planner, icon: "📅" },
    { id: "mindmap", label: tr.mindmap, icon: "🧠" },
  ];
  return (
    <div className="flex h-screen bg-slate-100 text-slate-900">
      <aside className="flex w-56 flex-col bg-indigo-950 p-4 text-white">
        <div className="mb-6">
          <div className="text-xl font-bold">EF-Lernvault</div>
          <div className="text-xs opacity-70">Gymnasium Lernstudio · EF</div>
        </div>
        {nav.map((n) => (
          <button
            key={n.id}
            onClick={() => setTab(n.id)}
            className={`mb-1 rounded-xl px-3 py-2.5 text-left ${tab === n.id ? "bg-indigo-600" : "hover:bg-indigo-900"}`}
          >
            {n.icon} {n.label}
          </button>
        ))}
        <div className="mt-auto text-xs opacity-60">v0.1.0-prototype · lokal · offline-fähig</div>
      </aside>
      <main className="flex flex-1 flex-col">
        <header className="flex items-center gap-3 bg-white p-3 shadow-sm">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={tr.search}
            className="max-w-md flex-1 rounded-xl border px-4 py-2"
          />
          <button
            onClick={() => setLang((l) => (l === "zh" ? "de" : "zh"))}
            className="rounded-xl bg-slate-200 px-3 py-2 text-sm font-semibold"
          >
            {lang === "zh" ? "DE / 德语" : "ZH / 中文"}
          </button>
        </header>
        <div className="flex-1 overflow-y-auto p-6">
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
