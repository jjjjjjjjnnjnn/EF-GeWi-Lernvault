import { useState } from "react";
import { t, type Lang } from "../i18n";

export default function Tutor({ lang }: { lang: Lang }) {
  const tr = t(lang);
  const [msgs, setMsgs] = useState<{ role: string; text: string }[]>([
    {
      role: "ki",
      text: "Hallo! Ich bin dein lokaler KI-Tutor (EF-Niveau). Frag mich zu SoWi / Philosophie. 你好！我是本地AI助教（EF水平），问我SoWi/哲学吧。",
    },
  ]);
  const [input, setInput] = useState("");

  const send = () => {
    if (!input.trim()) return;
    setMsgs((m) => [
      ...m,
      { role: "du", text: input },
      {
        role: "ki",
        text: "（原型占位）LM Studio 接入后，这里返回 EF 水平的德语解答 + 中文对照 + 引用的笔记原文。/ Prototype: echte Antwort kommt nach LM-Studio-Anbindung.",
      },
    ]);
    setInput("");
  };

  return (
    <div className="mx-auto flex h-[70vh] max-w-2xl flex-col rounded-sm border border-[#E5E1D8] bg-white">
      {/* Offline status line: subtle monospace text bar */}
      <div className="flex items-center justify-between border-b border-[#E5E1D8] bg-[#FAF9F6] px-4 py-2 text-xs font-mono text-[#6B675C]">
        <span>{tr.offline}</span>
        <span className="text-[10px] tracking-wider uppercase text-[#6B675C]">
          SauerkrautLM-8B
        </span>
      </div>

      {/* Dialogue stream: paper dialog layout */}
      <div className="flex-1 space-y-4 overflow-y-auto p-5">
        {msgs.map((m, i) =>
          m.role === "ki" ? (
            /* AI Message: no background fill, thin accent line on left */
            <div
              key={i}
              className="max-w-[90%] border-l-2 border-[#4338CA] pl-3.5 py-1"
            >
              <div className="text-[10px] font-mono uppercase tracking-wider text-[#6B675C] mb-1">
                KI-Tutor · Lokales Modell
              </div>
              <div className="font-serif text-sm text-[#1C1B17] leading-relaxed break-words">
                {m.text}
              </div>
            </div>
          ) : (
            /* User Message: subtle muted beige background, hairline border */
            <div
              key={i}
              className="ml-auto max-w-[85%] rounded-sm border border-[#E5E1D8] bg-[#F3EFE6] px-3.5 py-2.5"
            >
              <div className="text-[10px] font-mono uppercase tracking-wider text-[#6B675C] mb-0.5 text-right">
                Du · Frage
              </div>
              <div className="font-sans text-sm text-[#1C1B17] break-words">
                {m.text}
              </div>
            </div>
          )
        )}
      </div>

      {/* Input row: hairline border with minimalist send button */}
      <div className="flex gap-2 border-t border-[#E5E1D8] bg-[#FAF9F6] p-3">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && send()}
          placeholder="Frage stellen / 提问…"
          className="flex-1 rounded-sm border border-[#E5E1D8] bg-white px-3 py-2 text-sm text-[#1C1B17] placeholder:text-[#6B675C] focus:border-[#4338CA] focus:outline-none transition-colors font-sans"
        />
        <button
          type="button"
          onClick={send}
          className="rounded-sm border border-[#1C1B17] bg-[#1C1B17] px-4 py-2 text-xs font-mono uppercase tracking-wider text-white hover:bg-[#4338CA] hover:border-[#4338CA] active:scale-[0.96] transition-all duration-150"
        >
          Senden
        </button>
      </div>
    </div>
  );
}
