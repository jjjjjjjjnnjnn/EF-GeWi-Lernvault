// EditorialReader — G2 Editorial-Reader: 德语/英语/哲学学术原典长文精读器
// 用户最喜爱方案 18 的正式生产组件：全景大版面 Header、悬浮胶囊 TOC、段落高亮批注与修辞手法层析
import { useState } from "react";
import type { Lang } from "../../i18n";

export interface TextSection {
  id: string;
  titleDE: string;
  titleZH: string;
  lines: {
    no: number;
    de: string;
    zh: string;
    noteDE?: string;
    noteZH?: string;
    stilmittel?: string;
  }[];
}

const DEFAULT_SECTIONS: TextSection[] = [
  {
    id: "nacht-pakt",
    titleDE: "Faust I — Nacht (Gelehrten-Tragödie)",
    titleZH: "《浮士德》第一部 · 夜（学者之困与狂飙求索）",
    lines: [
      {
        no: 354,
        de: "Habe nun, ach! Philosophie, Juristerei und Medizin,",
        zh: "唉！我如今把哲学、法学、医学，",
        stilmittel: "Klimax / 排比累进",
        noteDE: "Aufzählung der vier klassischen Fakultäten; drückt Fausts tiefen Gelehrtenfrust aus.",
        noteZH: "列举中世纪大学四大经典学院，极力表达浮士德被经院理性禁锢的绝望苦闷。",
      },
      {
        no: 355,
        de: "Und leider auch Theologie durchaus studiert, mit heißem Bemühn.",
        zh: "甚至可惜还有神学，都彻底攻读，下足了苦功。",
        stilmittel: "Ironischer Seufzer / 讽刺叹息",
        noteDE: "„Leider auch“: Theologie als Krone der Wissenschaft hat ihm keinen Seelenfrieden gebracht.",
        noteZH: "“甚至可惜”：神学作为当年科学之王，却丝毫未能赋予其内心的宁静与真理。",
      },
      {
        no: 356,
        de: "Da steh ich nun, ich armer Tor! Und bin so klug als wie zuvor;",
        zh: "如今我这个可怜的傻瓜站在这里！却同从前一样一无所获；",
        stilmittel: "Antithese & Selbstironie / 对照与自嘲",
        noteDE: "Zentrale Textstelle: Erkenntniskrise des Sturm und Drang. Ratio führt nicht zum Wesen der Welt.",
        noteZH: "狂飙突进运动核心名句：理性主义认知危机。纯粹的书本理智根本无法触及世界终极本质。",
      },
      {
        no: 382,
        de: "Dass ich erkenne, was die Welt im Innersten zusammenhält,",
        zh: "好让我认识到：究竟是什么在最深处维系着整个宇宙，",
        stilmittel: "Metaphorisches Streben / 浮士德式求索",
        noteDE: "Faustisches Streben: Drang nach metaphysischer Gesamterkenntnis statt bloßer Einzelfakten.",
        noteZH: "著名的“浮士德精神”：绝不满足于孤立的碎片事实，而是追求超验的宇宙生命总全理。",
      },
    ],
  },
  {
    id: "gretchen-frage",
    titleDE: "Marthens Garten — Die Gretchenfrage",
    titleZH: "《玛特的花园》· 葛丽卿之问（信仰、道德与阶层差距）",
    lines: [
      {
        no: 3415,
        de: "Nun sag, wie hast du's mit der Religion?",
        zh: "现在请告诉我，你对宗教是怎么看的？",
        stilmittel: "Gretchenfrage (Topos)",
        noteDE: "Topos der deutschen Literatur: Eine existenzielle Gewissensfrage, die nicht ausweichbar ist.",
        noteZH: "德语文坛著名托泊斯（Topos）：“葛丽卿之问”，直击灵魂与信仰根基、不容回避的本质诘问。",
      },
      {
        no: 3416,
        de: "Du bist ein herzlich guter Mann, allein ich glaub, du hältst nicht viel davon.",
        zh: "你心肠很好，但我总觉得，你心里并不把宗教当回事。",
        noteDE: "Gretchen ahnt Fausts pantheistische, nicht-kirchliche Haltung trotz seiner rhetorischen Verstellung.",
        noteZH: "小市民平民女孩敏锐的直觉：洞察出浮士德超脱教会教条的泛神论与危险叛逆。",
      },
    ],
  },
];

export function EditorialReader({ lang }: { lang: Lang }) {
  const de = lang === "de";
  const [activeSecId, setActiveSecId] = useState<string>("nacht-pakt");
  const [selectedLine, setSelectedLine] = useState<number | null>(356);

  const sec = DEFAULT_SECTIONS.find((s) => s.id === activeSecId) || DEFAULT_SECTIONS[0];
  const activeLine = sec.lines.find((l) => l.no === selectedLine) || sec.lines[0];

  return (
    <div className="flex flex-col gap-4">
      {/* 顶部学术原典全景 Header */}
      <div className="rounded-xl border border-[var(--line)] bg-[var(--surface)] p-5">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--line)] pb-3">
          <div>
            <span className="font-mono text-[10px] uppercase tracking-wider text-[var(--gray)]">
              {de ? "Literarische Originaltext-Analyse // Geisteswissenschaften" : "文科原典沉浸精读 // 狂飙突进与经典戏剧"}
            </span>
            <h3 className="mt-0.5 font-serif text-xl font-bold text-[var(--ink)]">
              {de ? sec.titleDE : sec.titleZH}
            </h3>
          </div>
          {/* 胶囊 TOC 章节跳转 */}
          <div className="flex flex-wrap gap-1.5">
            {DEFAULT_SECTIONS.map((s) => (
              <button
                key={s.id}
                onClick={() => {
                  setActiveSecId(s.id);
                  setSelectedLine(s.lines[0].no);
                }}
                className={`rounded-md px-3 py-1 font-mono text-xs transition ${
                  activeSecId === s.id
                    ? "bg-[var(--ink)] text-[var(--paper)]"
                    : "border border-[var(--line)] bg-[var(--surface)] text-[var(--gray)] hover:text-[var(--ink)]"
                }`}
              >
                {de ? s.titleDE.split("—")[0].trim() : s.titleZH.split("·")[0].trim()}
              </button>
            ))}
          </div>
        </div>

        {/* 双栏精读视窗：左侧 60% 原文批注流 + 右侧 40% 修辞与考场解析卡 */}
        <div className="mt-4 flex flex-col gap-4 lg:flex-row">
          {/* 原文段落流 */}
          <div className="space-y-1.5 lg:w-[60%]">
            {sec.lines.map((l) => {
              const isSelected = selectedLine === l.no;
              return (
                <div
                  key={l.no}
                  onClick={() => setSelectedLine(l.no)}
                  className={`group flex cursor-pointer items-start gap-3 rounded-lg p-3 transition ${
                    isSelected
                      ? "border border-[var(--ink)] bg-[var(--paper-subtle)] text-[var(--ink)]"
                      : "border border-transparent hover:border-[var(--line)] hover:bg-[var(--paper-subtle)]/50"
                  }`}
                >
                  <span className="mt-0.5 w-9 shrink-0 font-mono text-xs text-[var(--gray)] group-hover:text-[var(--ink)]">
                    v.{l.no}
                  </span>
                  <div className="flex-1">
                    <p className={`font-serif text-sm leading-relaxed ${isSelected ? "font-semibold text-[var(--ink)]" : "text-[var(--ink)]/85"}`}>
                      {l.de}
                    </p>
                    <p className="mt-1 text-xs text-[var(--gray)]">
                      {l.zh}
                    </p>
                  </div>
                  {l.stilmittel && (
                    <span className="shrink-0 rounded border border-[var(--line)] bg-[var(--surface)] px-2 py-0.5 font-mono text-[10px] text-[var(--gray)]">
                      {l.stilmittel.split("/")[0].trim()}
                    </span>
                  )}
                </div>
              );
            })}
          </div>

          {/* 右侧原典批注与修辞深析 */}
          <div className="flex flex-col gap-3 rounded-xl border border-[var(--line)] bg-[var(--paper-subtle)] p-4 lg:w-[40%]">
            <div className="flex items-center justify-between border-b border-[var(--line)] pb-2.5">
              <span className="font-mono text-xs font-semibold text-[var(--ink)]">
                {de ? `Vers ${activeLine.no} // Kommentar` : `第 ${activeLine.no} 行 · 考据与修辞`}
              </span>
              {activeLine.stilmittel && (
                <span className="rounded border border-[var(--line)] bg-[var(--surface)] px-2 py-0.5 font-mono text-[10px] font-medium text-[var(--ink)]">
                  {activeLine.stilmittel}
                </span>
              )}
            </div>

            <div className="flex-1 space-y-3 text-xs leading-relaxed text-[var(--ink)]/90">
              <div>
                <p className="font-mono text-[11px] uppercase tracking-wider text-[var(--gray)]">
                  {de ? "Kontext & Tiefenstruktur" : "文本思想语境与深层结构"}
                </p>
                <p className="mt-1.5 leading-relaxed">{de ? activeLine.noteDE : activeLine.noteZH}</p>
              </div>

              <div className="rounded-lg border border-[var(--line)] bg-[var(--surface)] p-3">
                <p className="font-mono text-[11px] font-semibold text-[var(--ink)]">
                  {de ? "Klausur-Anwendung (Abitur-Tipp):" : "会考规范应用（Klausur-Tipp）："}
                </p>
                <p className="mt-1.5 text-[11px] leading-relaxed text-[var(--gray)]">
                  {de
                    ? "Zitiere stets mit Versangabe (z. B. vgl. V. 356) und verknüpfe das Stilmittel kausal mit der seelischen Zerrissenheit der Figur."
                    : "引用原句时务必准确标注行号（如 vgl. V. 356），并将所用修辞手法直接绑定到人物内心的精神冲突或时代思潮危机剖析上。"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
