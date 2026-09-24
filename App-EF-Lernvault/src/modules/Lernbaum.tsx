import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { KeyboardEvent as ReactKeyboardEvent, PointerEvent as ReactPointerEvent } from "react";
import {
  baueSuchIndex,
  findeNotizen,
  ladeMasteryEintraege,
  masteryFuerKnoten,
  statusFuer,
  sucheBaum,
} from "../baum/engine";
import type {
  BaumNode,
  BaumStatus,
  FachBaum,
  MasteryEintrag,
  NotizStichwort,
  SuchEintrag,
} from "../baum/types";
import type { Lang } from "../i18n";
import { matchesKey, PER_MODULE_KEYS } from "../keys";
import type { KeyBinding } from "../keys";

interface VaultNotizEingabe {
  id: string;
  fach: string;
  thema: string;
  path: string;
  operatoren: string[];
  blocks: Array<{ text: string }>;
  tags: string[];
}

interface LernbaumProps {
  lang?: Lang;
  baeume?: FachBaum[];
  vaultNotes?: VaultNotizEingabe[] | null;
  selectedFach?: string;
  onSubjectChange?: (fach: string) => void;
  onJumpToLibrary?: (query: string, fach?: string, noteId?: string) => void;
}

interface PositionsKnoten {
  id: string;
  knoten: BaumNode;
  fach: string;
  x: number;
  y: number;
  breite: number;
  hoehe: number;
  tiefe: number;
  elternId: string | null;
  hatKinder: boolean;
  eingeklappt: boolean;
}

interface LayoutKante {
  von: string;
  nach: string;
}

interface BaumLayout {
  breite: number;
  hoehe: number;
  knoten: PositionsKnoten[];
  kanten: LayoutKante[];
}

const BOX_W = 208;
const BOX_H = 64;
const ROOT_W = 256;
const GAP_X = 28;
const STEP_Y = 150;
const MIN_ZOOM = 0.5;
const MAX_ZOOM = 1.6;
const PENDING_MARK = "\u23F3";
const CANVAS_HOEHE = 480;

const KEY_SEARCH: KeyBinding = PER_MODULE_KEYS.lernbaum[0];
const KEY_TOGGLE_ALL: KeyBinding = PER_MODULE_KEYS.lernbaum[1];
const KEY_ZOOM_IN: KeyBinding = PER_MODULE_KEYS.lernbaum[2];
const KEY_ZOOM_OUT: KeyBinding = PER_MODULE_KEYS.lernbaum[3];
const KEY_ZOOM_RESET: KeyBinding = PER_MODULE_KEYS.lernbaum[4];

function norm(wert: string): string {
  return wert.toLowerCase();
}

function sammleKnoten(wurzel: BaumNode, out: BaumNode[]): void {
  out.push(wurzel);
  for (const kind of wurzel.children) sammleKnoten(kind, out);
}

function begrenzeZoom(wert: number): number {
  return Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, Math.round(wert * 10) / 10));
}

function manuellerIndex(baeume: FachBaum[]): SuchEintrag[] {
  const eintraege: SuchEintrag[] = [];
  for (const baum of baeume) {
    const stapel: Array<{ knoten: BaumNode; pfadDE: string[]; pfadZH: string[] }> = [
      { knoten: baum.root, pfadDE: [baum.root.titleDE], pfadZH: [baum.root.titleZH] },
    ];
    while (stapel.length > 0) {
      const oben = stapel.pop();
      if (!oben) break;
      eintraege.push({
        nodeId: oben.knoten.id,
        fach: baum.fach,
        level: oben.knoten.level,
        pfadDE: oben.pfadDE.join(" / "),
        pfadZH: oben.pfadZH.join(" / "),
        heuhaufen: norm(
          [
            oben.knoten.titleDE,
            oben.knoten.titleZH,
            oben.knoten.code,
            ...oben.knoten.noteKeywords,
            ...oben.pfadDE,
            ...oben.pfadZH,
          ].join(" ")
        ),
      });
      for (const kind of oben.knoten.children) {
        stapel.push({
          knoten: kind,
          pfadDE: [...oben.pfadDE, kind.titleDE],
          pfadZH: [...oben.pfadZH, kind.titleZH],
        });
      }
    }
  }
  return eintraege;
}

function manuelleSuche(index: SuchEintrag[], query: string): SuchEintrag[] {
  const q = norm(query.trim());
  if (q.length === 0) return [];
  return index.filter((e) => e.heuhaufen.includes(q));
}

function manuellesFinden(knoten: BaumNode, notizen: NotizStichwort[]): string[] {
  const schluessel = knoten.noteKeywords.map(norm).filter((k) => k.length > 0);
  const titel = [norm(knoten.titleDE), norm(knoten.titleZH), norm(knoten.code)].filter(
    (t) => t.length > 2
  );
  return notizen
    .filter((n) => {
      const text = norm(n.text);
      if (schluessel.some((k) => text.includes(k))) return true;
      return titel.some((t) => text.includes(t));
    })
    .map((n) => n.id);
}

function manuelleMastery(knoten: BaumNode, eintraege: MasteryEintrag[]): number | null {
  const kandidaten = new Set<string>([
    norm(knoten.titleDE),
    norm(knoten.code),
    ...knoten.noteKeywords.map(norm),
  ]);
  const treffer = eintraege.filter((e) => kandidaten.has(norm(e.thema)));
  if (treffer.length === 0) return null;
  const summe = treffer.reduce((s, e) => s + e.pMastery, 0);
  return summe / treffer.length;
}

function manuellerStatus(trefferAnzahl: number, pMastery: number | null): BaumStatus {
  if (trefferAnzahl === 0) return "luecke";
  if (pMastery !== null && pMastery >= 0.8) return "beherrscht";
  if (pMastery !== null && pMastery >= 0.35) return "aktiv";
  return "offen";
}

function sicheresFinden(knoten: BaumNode, notizen: NotizStichwort[]): string[] {
  try {
    return findeNotizen(knoten, notizen);
  } catch {
    return manuellesFinden(knoten, notizen);
  }
}

function sichereMastery(knoten: BaumNode, eintraege: MasteryEintrag[]): number | null {
  try {
    return masteryFuerKnoten(knoten, eintraege);
  } catch {
    return manuelleMastery(knoten, eintraege);
  }
}

function sichererStatus(trefferAnzahl: number, pMastery: number | null): BaumStatus {
  try {
    return statusFuer(trefferAnzahl, pMastery);
  } catch {
    return manuellerStatus(trefferAnzahl, pMastery);
  }
}

function aggregiere(kinder: BaumStatus[]): BaumStatus {
  if (kinder.length > 0 && kinder.every((s) => s === "beherrscht")) return "beherrscht";
  if (kinder.some((s) => s === "aktiv" || s === "beherrscht")) return "aktiv";
  if (kinder.some((s) => s === "offen")) return "offen";
  return "luecke";
}

function berechneStatus(
  baeume: FachBaum[],
  stichworte: NotizStichwort[],
  mastery: MasteryEintrag[]
): Map<string, BaumStatus> {
  const karte = new Map<string, BaumStatus>();
  function fuerKnoten(knoten: BaumNode, trefferStichworte: NotizStichwort[]): BaumStatus {
    const vorhanden = karte.get(knoten.id);
    if (vorhanden) return vorhanden;
    let status: BaumStatus;
    if (knoten.children.length === 0 || knoten.level === 3) {
      const treffer = sicheresFinden(knoten, trefferStichworte);
      const p = sichereMastery(knoten, mastery);
      status = sichererStatus(treffer.length, p);
    } else {
      status = aggregiere(knoten.children.map((k) => fuerKnoten(k, trefferStichworte)));
    }
    karte.set(knoten.id, status);
    return status;
  }
  for (const baum of baeume) {
    const fachStichworte = stichworte.filter(
      (n) => n.fach.toLowerCase() === baum.fach.toLowerCase()
    );
    fuerKnoten(baum.root, fachStichworte);
  }
  return karte;
}

function legeBaum(baeume: FachBaum[], eingeklappt: Set<string>): BaumLayout {
  const knoten: PositionsKnoten[] = [];
  const kanten: LayoutKante[] = [];
  let blatt = 0;
  let maxTiefe = 0;
  function legeKnoten(
    node: BaumNode,
    fach: string,
    tiefe: number,
    elternId: string | null
  ): number {
    const kinder = eingeklappt.has(node.id) ? [] : [...node.children];
    const breite = tiefe === 0 ? ROOT_W : BOX_W;
    if (tiefe > maxTiefe) maxTiefe = tiefe;
    if (kinder.length === 0) {
      const x = GAP_X + BOX_W / 2 + blatt * (BOX_W + GAP_X);
      blatt += 1;
      knoten.push({
        id: node.id,
        knoten: node,
        fach,
        x,
        y: tiefe * STEP_Y + 70,
        breite,
        hoehe: BOX_H,
        tiefe,
        elternId,
        hatKinder: node.children.length > 0,
        eingeklappt: eingeklappt.has(node.id),
      });
      if (elternId) kanten.push({ von: elternId, nach: node.id });
      return x;
    }
    const kinderX = kinder.map((k) => legeKnoten(k, fach, tiefe + 1, node.id));
    const erste = kinderX[0] ?? 0;
    const letzte = kinderX[kinderX.length - 1] ?? 0;
    const x = (erste + letzte) / 2;
    knoten.push({
      id: node.id,
      knoten: node,
      fach,
      x,
      y: tiefe * STEP_Y + 70,
      breite,
      hoehe: BOX_H,
      tiefe,
      elternId,
      hatKinder: true,
      eingeklappt: false,
    });
    if (elternId) kanten.push({ von: elternId, nach: node.id });
    return x;
  }
  for (const baum of baeume) legeKnoten(baum.root, baum.fach, 0, null);
  return {
    breite: Math.max(320, blatt * (BOX_W + GAP_X) + GAP_X * 2),
    hoehe: Math.max(300, (maxTiefe + 1) * STEP_Y + 120),
    knoten,
    kanten,
  };
}

function statusText(status: BaumStatus, lang: Lang): string {
  if (lang === "de") {
    if (status === "luecke") return "Lücke";
    if (status === "offen") return "offen";
    if (status === "aktiv") return "aktiv";
    return "beherrscht";
  }
  if (status === "luecke") return "Lücke · 待补";
  if (status === "offen") return "offen · 未开始";
  if (status === "aktiv") return "aktiv · 进行中";
  return "beherrscht · 已掌握";
}

export default function Lernbaum({
  lang = "zh",
  baeume = [],
  vaultNotes = null,
  selectedFach,
  onSubjectChange,
  onJumpToLibrary,
}: LernbaumProps) {
  const [query, setQuery] = useState("");
  const [auswahlId, setAuswahlId] = useState<string | null>(null);
  const [eingeklappteIds, setEingeklappteIds] = useState<string[]>([]);
  const [versatz, setVersatz] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [internesFach, setInternesFach] = useState("alle");
  const [reduziert, setReduziert] = useState(false);
  const [ziehen, setZiehen] = useState(false);
  const sucheRef = useRef<HTMLInputElement>(null);
  const flaecheRef = useRef<HTMLDivElement>(null);
  const zugRef = useRef({ aktiv: false, startX: 0, startY: 0, basisX: 0, basisY: 0 });

  useEffect(() => {
    if (typeof window === "undefined" || typeof window.matchMedia !== "function") return;
    setReduziert(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  useEffect(() => {
    const el = flaecheRef.current;
    if (!el) return;
    function onWheelNative(e: WheelEvent) {
      e.preventDefault();
      setZoom((alt) => begrenzeZoom(alt + (e.deltaY < 0 ? 0.1 : -0.1)));
    }
    el.addEventListener("wheel", onWheelNative, { passive: false });
    return () => el.removeEventListener("wheel", onWheelNative);
  }, []);

  const effektivesFach = selectedFach ?? internesFach;
  const eingeklappt = useMemo(() => new Set(eingeklappteIds), [eingeklappteIds]);

  const stichworte = useMemo<NotizStichwort[]>(() => {
    if (!vaultNotes || vaultNotes.length === 0) return [];
    return vaultNotes.map((n) => ({
      id: n.id,
      fach: n.fach,
      thema: n.thema,
      text: [n.thema, n.path, ...n.blocks.map((b) => b.text)].join("\n"),
      operatoren: n.operatoren,
    }));
  }, [vaultNotes]);

  const vaultBeiId = useMemo(() => {
    const karte = new Map<string, VaultNotizEingabe>();
    if (vaultNotes) for (const n of vaultNotes) karte.set(n.id, n);
    return karte;
  }, [vaultNotes]);

  const mastery = useMemo<MasteryEintrag[]>(() => {
    try {
      return ladeMasteryEintraege();
    } catch {
      return [];
    }
  }, []);

  const sichtbareBaeume = useMemo(() => {
    if (!effektivesFach || effektivesFach === "alle") return baeume;
    return baeume.filter((b) => b.fach === effektivesFach);
  }, [baeume, effektivesFach]);

  const suchIndex = useMemo<SuchEintrag[]>(() => {
    try {
      return baueSuchIndex(baeume);
    } catch {
      return manuellerIndex(baeume);
    }
  }, [baeume]);

  const treffer = useMemo<SuchEintrag[]>(() => {
    if (query.trim().length === 0) return [];
    try {
      return sucheBaum(suchIndex, query);
    } catch {
      return manuelleSuche(suchIndex, query);
    }
  }, [suchIndex, query]);

  const knotenKarte = useMemo(() => {
    const karte = new Map<string, { knoten: BaumNode; fach: string }>();
    for (const baum of baeume) {
      const alle: BaumNode[] = [];
      sammleKnoten(baum.root, alle);
      for (const k of alle) if (!karte.has(k.id)) karte.set(k.id, { knoten: k, fach: baum.fach });
    }
    return karte;
  }, [baeume]);

  const elternKarteMemo = useMemo(() => {
    const karte = new Map<string, string | null>();
    for (const baum of baeume) {
      karte.set(baum.root.id, null);
      const stapel: BaumNode[] = [baum.root];
      while (stapel.length > 0) {
        const oben = stapel.pop();
        if (!oben) break;
        for (const kind of oben.children) {
          karte.set(kind.id, oben.id);
          stapel.push(kind);
        }
      }
    }
    return karte;
  }, [baeume]);

  const statusKarte = useMemo(
    () => berechneStatus(baeume, stichworte, mastery),
    [baeume, stichworte, mastery]
  );

  const layout = useMemo(
    () => legeBaum(sichtbareBaeume, eingeklappt),
    [sichtbareBaeume, eingeklappt]
  );

  const positionVonId = useMemo(
    () => new Map(layout.knoten.map((p) => [p.id, p])),
    [layout]
  );

  const setzeZoom = useCallback((wert: number) => {
    setZoom(begrenzeZoom(wert));
  }, []);

  const schalteKnoten = useCallback((id: string) => {
    setEingeklappteIds((alt) =>
      alt.includes(id) ? alt.filter((x) => x !== id) : [...alt, id]
    );
  }, []);

  const schalteAlle = useCallback(() => {
    setEingeklappteIds((alt) => {
      if (alt.length > 0) return [];
      const eltern: string[] = [];
      knotenKarte.forEach((eintrag) => {
        if (eintrag.knoten.children.length > 0) eltern.push(eintrag.knoten.id);
      });
      return eltern;
    });
  }, [knotenKarte]);

  const zuruecksetzen = useCallback(() => {
    setZoom(1);
    setVersatz({ x: 0, y: 0 });
  }, []);

  const waehleFach = useCallback(
    (fach: string) => {
      setInternesFach(fach);
      setAuswahlId(null);
      onSubjectChange?.(fach);
    },
    [onSubjectChange]
  );

  const zentriereAuf = useCallback(
    (id: string, offene: Set<string>) => {
      const neuLayout = legeBaum(sichtbareBaeume, offene);
      const pos = neuLayout.knoten.find((p) => p.id === id);
      const flaeche = flaecheRef.current;
      if (pos && flaeche) {
        const breite = flaeche.clientWidth || neuLayout.breite;
        const hoehe = flaeche.clientHeight || CANVAS_HOEHE;
        setVersatz({
          x: breite / 2 - pos.x * zoom,
          y: Math.max(24, hoehe / 2 - pos.y * zoom),
        });
      }
    },
    [sichtbareBaeume, zoom]
  );

  const waehleTreffer = useCallback(
    (eintrag: SuchEintrag) => {
      const offene = new Set(eingeklappt);
      let eltern = elternKarteMemo.get(eintrag.nodeId) ?? null;
      while (eltern) {
        offene.delete(eltern);
        eltern = elternKarteMemo.get(eltern) ?? null;
      }
      setEingeklappteIds([...offene]);
      setAuswahlId(eintrag.nodeId);
      zentriereAuf(eintrag.nodeId, offene);
    },
    [eingeklappt, elternKarteMemo, zentriereAuf]
  );

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (matchesKey(e, KEY_SEARCH)) {
        e.preventDefault();
        sucheRef.current?.focus();
        return;
      }
      if (matchesKey(e, KEY_TOGGLE_ALL)) {
        e.preventDefault();
        schalteAlle();
        return;
      }
      if (matchesKey(e, KEY_ZOOM_IN)) {
        e.preventDefault();
        setZoom((alt) => begrenzeZoom(alt + 0.1));
        return;
      }
      if (matchesKey(e, KEY_ZOOM_OUT)) {
        e.preventDefault();
        setZoom((alt) => begrenzeZoom(alt - 0.1));
        return;
      }
      if (matchesKey(e, KEY_ZOOM_RESET)) {
        e.preventDefault();
        setZoom(1);
        setVersatz({ x: 0, y: 0 });
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [schalteAlle]);

  function onSucheTaste(e: ReactKeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter" && treffer.length > 0) {
      e.preventDefault();
      const erste = treffer[0];
      if (erste) waehleTreffer(erste);
    } else if (e.key === "Escape") {
      e.preventDefault();
      setQuery("");
    }
  }

  function onHintergrundZeigerRunter(e: ReactPointerEvent<HTMLDivElement>) {
    const ziel = e.target as HTMLElement;
    if (ziel.closest("[data-node]")) return;
    zugRef.current = {
      aktiv: true,
      startX: e.clientX,
      startY: e.clientY,
      basisX: versatz.x,
      basisY: versatz.y,
    };
    setZiehen(true);
    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch {
      zugRef.current.aktiv = false;
    }
  }

  function onHintergrundZeigerBewegen(e: ReactPointerEvent<HTMLDivElement>) {
    if (!zugRef.current.aktiv) return;
    setVersatz({
      x: zugRef.current.basisX + (e.clientX - zugRef.current.startX),
      y: zugRef.current.basisY + (e.clientY - zugRef.current.startY),
    });
  }

  function onHintergrundZeigerHoch(e: ReactPointerEvent<HTMLDivElement>) {
    zugRef.current.aktiv = false;
    setZiehen(false);
    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {
      return;
    }
  }

  if (baeume.length === 0) {
    return (
      <div className="mx-auto max-w-xl py-12 text-center font-sans text-sm text-[var(--gray)]">
        {lang === "de"
          ? "Noch kein Lernbaum vorhanden"
          : "暂无学习树，请先连接知识库"}
      </div>
    );
  }

  const faecher = baeume.map((b) => b.fach);
  const auswahl = auswahlId ? knotenKarte.get(auswahlId) ?? null : null;
  const auswahlStatus: BaumStatus = auswahl
    ? statusKarte.get(auswahl.knoten.id) ?? "luecke"
    : "luecke";
  const notizTreffer: string[] = auswahl
    ? sicheresFinden(
        auswahl.knoten,
        stichworte.filter((n) => n.fach.toLowerCase() === auswahl.fach.toLowerCase())
      )
    : [];
  const schluesselwort =
    auswahl && auswahl.knoten.noteKeywords.length > 0
      ? (auswahl.knoten.noteKeywords[0] ?? auswahl.knoten.titleDE)
      : (auswahl?.knoten.titleDE ?? "");
  const suchtAktiv = query.trim().length > 0;

  return (
    <div className="mx-auto max-w-6xl space-y-5">
      <div className="flex items-center justify-between gap-4 border-b border-[var(--line)] pb-3">
        <div>
          <h2 className="font-serif text-xl font-normal text-[var(--ink)]">
            {lang === "de" ? "Lernbaum · Gymnasium EF" : "学习树 · 高中阶段 (EF)"}
          </h2>
          <p className="mt-0.5 font-sans text-xs text-[var(--gray)]">
            {lang === "de"
              ? "Vom Fach bis zum prüfbaren Detail. Ein Klick öffnet die verknüpften Notizen."
              : "从学科到可考细节。点击节点查看关联笔记。"}
          </p>
        </div>
        <div className="shrink-0 font-mono text-xs text-[var(--gray)]">
          {sichtbareBaeume.length} {lang === "de" ? "Fächer" : "学科"} ·{" "}
          {layout.knoten.length} {lang === "de" ? "Knoten" : "节点"}
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-1 border-b border-[var(--line)] pb-3">
        {["alle", ...faecher].map((f) => {
          const aktiv = effektivesFach === f;
          return (
            <button
              key={f}
              type="button"
              onClick={() => waehleFach(f)}
              aria-pressed={aktiv}
              className={`rounded-[var(--radius)] px-2 py-0.5 font-sans text-xs transition-colors cursor-pointer ${
                aktiv
                  ? "bg-[var(--ink)] text-[var(--paper)] font-medium"
                  : "border border-[var(--line)] bg-[var(--surface)] text-[var(--ink)] hover:border-[var(--accent)]"
              }`}
            >
              {f === "alle" ? (lang === "de" ? "Alle" : "全部") : f}
            </button>
          );
        })}
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <div className="flex min-w-52 flex-1 items-center gap-2 rounded-[var(--radius)] border border-[var(--line)] bg-[var(--surface)] px-2 py-1">
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            aria-hidden="true"
            className="shrink-0 text-[var(--gray)]"
          >
            <circle cx="7" cy="7" r="4" />
            <path d="M10 10l3 3" />
          </svg>
          <input
            ref={sucheRef}
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={onSucheTaste}
            placeholder={lang === "de" ? "Lernbaum suchen …" : "搜索学习树…"}
            aria-label={lang === "de" ? "Lernbaum suchen" : "搜索学习树"}
            className="w-full bg-transparent font-sans text-sm text-[var(--ink)] focus-visible:outline focus-visible:outline-1 focus-visible:outline-[var(--accent)]"
          />
        </div>
        <span
          role="status"
          aria-live="polite"
          className="font-mono text-xs text-[var(--gray)]"
        >
          {suchtAktiv
            ? `${treffer.length} ${lang === "de" ? "Treffer" : "条结果"}`
            : lang === "de"
              ? "Enter wählt · Esc leert"
              : "回车选中 · Esc 清空"}
        </span>
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => setzeZoom(zoom + 0.1)}
            aria-label={lang === "de" ? "Vergrößern" : "放大"}
            className="rounded-[var(--radius)] border border-[var(--line)] bg-[var(--surface)] p-1 text-[var(--ink)] hover:border-[var(--accent)]"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              aria-hidden="true"
            >
              <path d="M8 3v10M3 8h10" />
            </svg>
          </button>
          <button
            type="button"
            onClick={() => setzeZoom(zoom - 0.1)}
            aria-label={lang === "de" ? "Verkleinern" : "缩小"}
            className="rounded-[var(--radius)] border border-[var(--line)] bg-[var(--surface)] p-1 text-[var(--ink)] hover:border-[var(--accent)]"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              aria-hidden="true"
            >
              <path d="M3 8h10" />
            </svg>
          </button>
          <button
            type="button"
            onClick={zuruecksetzen}
            aria-label={lang === "de" ? "Zoom zurücksetzen" : "重置缩放"}
            className="rounded-[var(--radius)] border border-[var(--line)] bg-[var(--surface)] p-1 text-[var(--ink)] hover:border-[var(--accent)]"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              aria-hidden="true"
            >
              <path d="M3 8a5 5 0 1 0 1.6-3.6M3 2.5V6h3.5" />
            </svg>
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-4 lg:flex-row">
        <div className="min-w-0 flex-1 overflow-x-auto">
          <div
            ref={flaecheRef}
            aria-label={lang === "de" ? "Lernbaum-Karte" : "学习树画布"}
            onPointerDown={onHintergrundZeigerRunter}
            onPointerMove={onHintergrundZeigerBewegen}
            onPointerUp={onHintergrundZeigerHoch}
            onPointerLeave={onHintergrundZeigerHoch}
            className="rounded-[var(--radius)] border border-[var(--line)] bg-[var(--paper)]"
            style={{
              position: "relative",
              height: `${CANVAS_HOEHE}px`,
              minWidth: "100%",
              overflow: "hidden",
              cursor: ziehen ? "grabbing" : "grab",
              touchAction: "none",
            }}
          >
            <div
              style={{
                position: "absolute",
                left: 0,
                top: 0,
                width: `${layout.breite}px`,
                height: `${layout.hoehe}px`,
                transform: `translate(${versatz.x}px, ${versatz.y}px) scale(${zoom})`,
                transformOrigin: "0 0",
                transition: reduziert ? "none" : "transform 150ms ease-out",
              }}
            >
              <svg
                data-relationship-diagram="true"
                aria-hidden="true"
                fill="none"
                stroke="currentColor"
                className="text-[var(--line)]"
                viewBox={`0 0 ${layout.breite} ${layout.hoehe}`}
                preserveAspectRatio="none"
                style={{
                  position: "absolute",
                  inset: 0,
                  width: "100%",
                  height: "100%",
                  pointerEvents: "none",
                }}
              >
                {layout.kanten.map((kante) => {
                  const von = positionVonId.get(kante.von);
                  const nach = positionVonId.get(kante.nach);
                  if (!von || !nach) return null;
                  const x1 = von.x;
                  const y1 = von.y + von.hoehe / 2;
                  const x2 = nach.x;
                  const y2 = nach.y - nach.hoehe / 2;
                  const mitte = (y1 + y2) / 2;
                  return (
                    <path
                      key={`${kante.von}-${kante.nach}`}
                      d={`M ${x1} ${y1} C ${x1} ${mitte}, ${x2} ${mitte}, ${x2} ${y2}`}
                      strokeWidth="1"
                    />
                  );
                })}
              </svg>

              {layout.knoten.map((pos) => {
                const selektiert = auswahlId === pos.id;
                const status = statusKarte.get(pos.id) ?? "luecke";
                const wurzel = pos.tiefe === 0;
                return (
                  <div
                    key={pos.id}
                    data-node={pos.id}
                    style={{
                      position: "absolute",
                      left: `${pos.x}px`,
                      top: `${pos.y}px`,
                      transform: "translate(-50%, -50%)",
                      width: `${pos.breite}px`,
                      height: `${pos.hoehe}px`,
                    }}
                  >
                    <button
                      type="button"
                      onClick={() => setAuswahlId(pos.id)}
                      aria-label={`${pos.knoten.titleDE} · ${pos.knoten.titleZH}`}
                      aria-current={selektiert}
                      className="rounded-[var(--radius)] focus-visible:outline focus-visible:outline-1 focus-visible:outline-[var(--accent)]"
                      style={{
                        width: "100%",
                        height: "100%",
                        padding: "6px 8px",
                        border: selektiert
                          ? "1px solid var(--accent)"
                          : "1px solid var(--ink)",
                        backgroundColor: wurzel ? "var(--ink)" : "var(--paper)",
                        color: wurzel ? "var(--paper)" : "var(--ink)",
                        fontFamily: "var(--font-de)",
                        textAlign: "center",
                        cursor: "pointer",
                        lineHeight: 1.2,
                        transition: reduziert ? "none" : "border-color 150ms ease-out",
                      }}
                    >
                      <span
                        style={{
                          display: "block",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                          fontSize: wurzel ? "13px" : "12px",
                          fontWeight: wurzel ? 600 : 400,
                        }}
                      >
                        {pos.knoten.titleDE}
                      </span>
                      <span
                        style={{
                          display: "block",
                          marginTop: "2px",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                          color: wurzel ? "var(--line)" : "var(--gray)",
                          fontFamily: "var(--font-zh)",
                          fontSize: "var(--text-meta)",
                        }}
                      >
                        {pos.knoten.titleZH}
                      </span>
                      <span
                        style={{
                          display: "block",
                          marginTop: "2px",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                          color: wurzel ? "var(--line)" : "var(--gray)",
                          fontFamily: "var(--font-mono)",
                          fontSize: "var(--text-meta)",
                        }}
                      >
                        {statusText(status, lang)}
                      </span>
                    </button>
                    {pos.hatKinder && (
                      <button
                        type="button"
                        onClick={() => schalteKnoten(pos.id)}
                        aria-label={
                          pos.eingeklappt
                            ? lang === "de"
                              ? `Ast aufklappen: ${pos.knoten.titleDE}`
                              : `展开分支：${pos.knoten.titleDE}`
                            : lang === "de"
                              ? `Ast einklappen: ${pos.knoten.titleDE}`
                              : `收起分支：${pos.knoten.titleDE}`
                        }
                        aria-expanded={!pos.eingeklappt}
                        className="rounded-[var(--radius)] focus-visible:outline focus-visible:outline-1 focus-visible:outline-[var(--accent)]"
                        style={{
                          position: "absolute",
                          right: "-11px",
                          top: "50%",
                          transform: "translateY(-50%)",
                          width: "22px",
                          height: "22px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          backgroundColor: "var(--surface)",
                          color: "var(--ink)",
                          border: "1px solid var(--line)",
                          cursor: "pointer",
                        }}
                      >
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          aria-hidden="true"
                        >
                          {pos.eingeklappt ? (
                            <path d="M6 4l4 4-4 4" />
                          ) : (
                            <path d="M4 6l4 4 4-4" />
                          )}
                        </svg>
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="w-full shrink-0 lg:w-80">
          {auswahl ? (
            <aside
              aria-label={lang === "de" ? "Knotendetails" : "节点详情"}
              className="rounded-[var(--radius)] border border-[var(--line)] bg-[var(--surface)] p-4"
            >
              <h3 className="font-serif text-lg font-normal text-[var(--ink)]">
                {auswahl.knoten.titleDE}
              </h3>
              <p className="mt-0.5 font-sans text-xs text-[var(--gray)]">
                {auswahl.knoten.titleZH}
              </p>
              {auswahl.knoten.titleZH.includes(PENDING_MARK) && (
                <p className="mt-1 font-sans text-xs text-[var(--gray)]">
                  {lang === "de" ? "Inhalt待确认" : "待确认"}
                </p>
              )}
              {auswahl.knoten.operatoren.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-1">
                  {auswahl.knoten.operatoren.map((op) => (
                    <span
                      key={op}
                      className="rounded-[var(--radius)] border border-[var(--line)] px-1.5 py-0.5 font-mono text-xs text-[var(--gray)]"
                    >
                      {op}
                    </span>
                  ))}
                </div>
              )}
              <p className="mt-2 font-mono text-xs text-[var(--gray)]">
                {lang === "de" ? "Status: " : "状态："}
                {statusText(auswahlStatus, lang)}
              </p>
              <div className="mt-3 border-t border-[var(--line)] pt-2">
                <p className="font-sans text-xs text-[var(--gray)]">
                  {lang === "de" ? "Klausur-Anbindung" : "考试关联"}
                </p>
                <p className="mt-0.5 font-serif text-sm font-normal text-[var(--ink)]">
                  {auswahl.knoten.klausurDE}
                </p>
                <p className="font-sans text-xs text-[var(--gray)]">
                  {auswahl.knoten.klausurZH}
                </p>
              </div>
              <div className="mt-3 border-t border-[var(--line)] pt-2">
                <p className="font-sans text-xs text-[var(--gray)]">
                  {lang === "de" ? "Leitfrage" : "核心问题"}
                </p>
                <p className="mt-0.5 font-serif text-sm font-normal text-[var(--ink)]">
                  {auswahl.knoten.leitfrageDE}
                </p>
                <p className="font-sans text-xs text-[var(--gray)]">
                  {auswahl.knoten.leitfrageZH}
                </p>
              </div>
              <div className="mt-3 border-t border-[var(--line)] pt-2">
                <p className="font-sans text-xs text-[var(--gray)]">
                  {lang === "de" ? "Verknüpfte Notizen" : "关联笔记"}
                </p>
                {notizTreffer.length === 0 ? (
                  <p className="mt-1 font-sans text-xs text-[var(--gray)]">
                    {lang === "de"
                      ? "Noch keine Notizen verknüpft (Lücke)"
                      : "暂无关联笔记（缺口）"}
                  </p>
                ) : (
                  <div className="mt-1 flex flex-col gap-1">
                    {notizTreffer.map((id) => {
                      const vn = vaultBeiId.get(id);
                      return (
                        <button
                          key={id}
                          type="button"
                          onClick={() =>
                            onJumpToLibrary?.(schluesselwort, auswahl.fach, id)
                          }
                          className="rounded-[var(--radius)] border border-[var(--line)] bg-[var(--paper)] px-2 py-1 text-left font-sans text-xs text-[var(--ink)] hover:border-[var(--accent)]"
                        >
                          {vn ? `${vn.thema} · ${vn.path}` : id}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            </aside>
          ) : (
            <aside
              aria-label={lang === "de" ? "Knotendetails" : "节点详情"}
              className="rounded-[var(--radius)] border border-[var(--line)] bg-[var(--surface)] p-4 font-sans text-xs text-[var(--gray)]"
            >
              {lang === "de"
                ? "Knoten wählen, um Details, Operatoren und Notizen zu sehen."
                : "点击节点查看详情、算子与关联笔记。"}
            </aside>
          )}
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-2 border-t border-[var(--line)] pt-3 font-mono text-xs text-[var(--gray)]">
        <span>
          {lang === "de"
            ? "Struktur: Fach → Überblick → Schwerpunkt → Detail (f = Suche, e = Äste, + / - = Zoom, 0 = Reset)"
            : "结构：学科 → 总览 → 重点 → 细节 (f 搜索，e 展开/收起，+ / - 缩放，0 重置)"}
        </span>
        <span>
          {lang === "de" ? "Ziehen = Verschieben" : "拖拽平移 · 滚轮缩放"}
        </span>
      </div>
    </div>
  );
}
