import { useState } from "react";
import { t, type Lang } from "../i18n";

export default function Tutor({ lang }: { lang: Lang }) {
  const tr = t(lang);
  const [msgs, setMsgs] = useState<{ role: string; text: string }[]>([
    { role: "ki", text: "Hallo! Ich bin dein lokaler KI-Tutor (EF-Niveau). Frag mich zu SoWi / Philosophie. 你好！我是本地AI助教（EF水平），问我SoWi/哲学吧。" },
  ]);
  const [input, setInput] = useState("");
  const send = () => {
    if (!input.trim()) return;
    setMsgs((m) => [...m, { role: "du", text: input }, { role: "ki", text: "（原型占位）LM Studio 接入后，这里返回 EF 水平的德语解答 + 中文对照 + 引用的笔记原文。/ Prototype: echte Antwort kommt nach LM-Studio-Anbindung." }]);
    setInput("");
  };
  return (
    <div className="mx-auto flex h-[60vh] max-w-2xl flex-col rounded-xl bg-white shadow">
      <div className="rounded-t-xl bg-amber-100 px-4 py-2 text-sm text-amber-800">{tr.offline}</div>
      <div className="flex-1 space-y-2 overflow-y-auto p-4">
        {msgs.map((m, i) => (
          <div key={i} className={`max-w-[80%] rounded-xl p-3 text-sm ${m.role === "ki" ? "bg-slate-100" : "ml-auto bg-indigo-600 text-white"}`}>
            {m.text}
          </div>
        ))}
      </div>
      <div className="flex gap-2 border-t p-3">
        <input value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && send()}
          placeholder="Frage stellen / 提问…" className="flex-1 rounded-xl border px-3 py-2" />
        <button onClick={send} className="rounded-xl bg-indigo-600 px-4 text-white">Send</button>
      </div>
    </div>
  );
}
