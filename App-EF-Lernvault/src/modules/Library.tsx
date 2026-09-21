import { useState } from "react";
import { notes } from "../data";

export default function Library({ query }: { query: string }) {
  const [fach, setFach] = useState("alle");
  const faecher = ["alle", ...Array.from(new Set(notes.map((n) => n.fach)))];
  const [openId, setOpenId] = useState(notes[0].id);
  const q = query.trim().toLowerCase();
  const list = notes.filter(
    (n) =>
      (fach === "alle" || n.fach === fach) &&
      (!q || n.thema.toLowerCase().includes(q) || n.zh.includes(query.trim()) || n.fach.toLowerCase().includes(q))
  );
  const open = notes.find((n) => n.id === openId) ?? list[0];
  return (
    <div className="grid grid-cols-3 gap-4">
      <div className="col-span-1 space-y-2">
        <div className="flex gap-2">
          {faecher.map((f) => (
            <button
              key={f}
              onClick={() => setFach(f)}
              className={`rounded-full px-3 py-1 text-sm ${fach === f ? "bg-indigo-600 text-white" : "bg-slate-200"}`}
            >
              {f}
            </button>
          ))}
        </div>
        {list.map((n) => (
          <button
            key={n.id}
            onClick={() => setOpenId(n.id)}
            className={`w-full rounded-xl border p-3 text-left ${open?.id === n.id ? "border-indigo-500 bg-indigo-50" : "bg-white"}`}
          >
            <div className="text-xs text-slate-500">{n.fach} · {n.operatoren.join(" / ")}</div>
            <div className="font-semibold">{n.thema}</div>
            <div className="text-sm text-slate-600">{n.zh}</div>
          </button>
        ))}
      </div>
      <div className="col-span-2 rounded-xl bg-white p-6 shadow">
        {open ? (
          <>
            <div className="text-xs text-slate-500">{open.fach} · {open.operatoren.join(" / ")}</div>
            <h2 className="text-2xl font-bold">{open.thema}</h2>
            <p className="mb-4 text-slate-600">{open.zh}</p>
            {open.bodyZH.map((z, i) => (
              <div key={i} className="mb-3 rounded-lg bg-slate-50 p-3">
                <p className="text-sm text-slate-700">中 {z}</p>
                <p className="mt-1 text-sm italic text-slate-900">DE {open.bodyDE[i]}</p>
              </div>
            ))}
          </>
        ) : (
          <p className="text-slate-500">Keine Treffer / 无结果</p>
        )}
      </div>
    </div>
  );
}
