import { useState } from "react";
import { t, type Lang } from "../i18n";
import AiSettings from "../components/AiSettings";
import { httpAccess, pullAll, pushAll, stampSync, syncStore } from "../engine/sync";
import { allPersistedKeys } from "../engine/storageKeys";
import {
  THEMES,
  DENSITIES,
  getStoredTheme,
  setStoredTheme,
  getStoredDensity,
  setStoredDensity,
  type ThemeId,
  type DensityId,
} from "../engine/theme";

// Einstellungen-Hub: bündelt verstreute Funktionen an einem Ort
// (Sprache · Vault · KI-Engine · Daten/Export · Tastatur · Über).
export function wipePersistedAppData(
  storage: Pick<Storage, "removeItem"> = localStorage
): void {
  allPersistedKeys().forEach((key) => storage.removeItem(key));
}

export default function Settings({
  lang,
  onLangChange,
  vaultConnected,
  vaultMsg,
  onOpenVault,
  onExportFsrs,
  onExportXp,
  onRedoOnboarding,
  onOpenHelp,
}: {
  lang: Lang;
  onLangChange: (l: Lang) => void;
  vaultConnected: boolean;
  vaultMsg: string;
  onOpenVault: () => void;
  onExportFsrs: () => void;
  onExportXp: () => void;
  onRedoOnboarding: () => void;
  onOpenHelp: () => void;
}) {
  const tr = t(lang);

  const wipe = () => {
    if (!window.confirm(tr.stWipeConfirm)) return;
    try {
      wipePersistedAppData();
    } catch {
      // ignorieren
    }
    window.location.reload();
  };

  const btn =
    "rounded-[var(--radius)] border border-[var(--line)] bg-[var(--surface)] px-3 py-1.5 font-sans text-xs text-[var(--ink)] hover:border-[var(--accent)] hover:text-[var(--accent)] active:scale-95 transition-all duration-150";

  // Cloud-sync (eigener server, explizit push/pull; lokal bleibt master bei konflikt-freiheit)
  const [syncCfg, setSyncCfg] = useState(() => syncStore.load());
  const [syncMsg, setSyncMsg] = useState("");
  const saveSyncCfg = (patch: Partial<{ endpoint: string; token: string }>) => {
    const next = { ...syncStore.load(), ...patch };
    syncStore.save(next);
    setSyncCfg(next);
  };
  const doSync = async (dir: "push" | "pull") => {
    const cfg = syncStore.load();
    if (!cfg.endpoint.trim()) {
      setSyncMsg(tr.stSyncErr);
      return;
    }
    try {
      const h = httpAccess(cfg.endpoint, cfg.token);
      const n = dir === "push" ? await pushAll(h) : (await pullAll(h)).length;
      stampSync();
      setSyncCfg(syncStore.load());
      setSyncMsg(tr.stSyncOk(n, dir === "push" ? "↑" : "↓"));
    } catch {
      setSyncMsg(tr.stSyncErr);
    }
  };

  const [currentTheme, setCurrentTheme] = useState<ThemeId>(() => getStoredTheme());
  const [currentDensity, setCurrentDensity] = useState<DensityId>(() => getStoredDensity());

  const handleSelectTheme = (th: ThemeId) => {
    setStoredTheme(th);
    setCurrentTheme(th);
  };

  const handleSelectDensity = (den: DensityId) => {
    setStoredDensity(den);
    setCurrentDensity(den);
  };

  return (
    <div className="mx-auto max-w-2xl px-2 py-6">
      <h1 className="font-serif text-2xl text-[var(--ink)]">{tr.settings}</h1>

      {/* 1. Sprache */}
      <section className="mt-6 border-t border-[var(--line)] pt-4">
        <h2 className="font-mono text-[var(--text-meta)] uppercase tracking-wider text-[var(--gray)]">
          1. {tr.stLanguage}
        </h2>
        <div className="mt-2 inline-flex overflow-hidden rounded-[var(--radius)] border border-[var(--line)]" role="group" aria-label="Sprache / 语言">
          {(["de", "zh"] as Lang[]).map((l) => (
            <button
              type="button"
              key={l}
              onClick={() => onLangChange(l)}
              aria-pressed={lang === l}
              className={`px-4 py-1.5 font-sans text-sm transition-colors duration-150 ${
                lang === l ? "bg-[var(--ink)] text-[var(--paper)]" : "bg-[var(--surface)] text-[var(--gray)] hover:text-[var(--accent)]"
              }`}
            >
              {l === "de" ? "Deutsch (Prüfung)" : "中文（理解）"}
            </button>
          ))}
        </div>
      </section>

      {/* 2. Erscheinungsbild / 外观与版式风格 */}
      <section className="mt-6 border-t border-[var(--line)] pt-4">
        <h2 className="font-mono text-[var(--text-meta)] uppercase tracking-wider text-[var(--gray)]">
          2. {lang === "de" ? "Erscheinungsbild & Layout" : "设计风格与版式密度"}
        </h2>
        <div className="mt-2 space-y-3">
          <div>
            <div className="text-xs font-mono text-[var(--gray)] mb-1.5">
              {lang === "de" ? "Akademische Themes:" : "学术主题风格："}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {THEMES.map((th) => {
                const isSelected = currentTheme === th.id;
                return (
                  <button
                    key={th.id}
                    type="button"
                    onClick={() => handleSelectTheme(th.id)}
                    aria-pressed={isSelected}
                    className={`p-3 text-left rounded-[var(--radius)] border transition-all ${
                      isSelected
                        ? "border-[var(--accent)] bg-[var(--surface)] text-[var(--accent)]"
                        : "border-[var(--line)] bg-[var(--surface)] text-[var(--ink)] hover:border-[var(--gray)]"
                    }`}
                  >
                    <div className="font-mono text-xs font-medium">
                      {lang === "de" ? th.nameDE : th.nameZH}
                    </div>
                    <div className="font-sans text-[var(--text-meta)] text-[var(--gray)] mt-1 leading-snug">
                      {lang === "de" ? th.descDE : th.descZH}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <div className="text-xs font-mono text-[var(--gray)] mb-1.5">
              {lang === "de" ? "Layout-Dichte:" : "信息与版式密度："}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {DENSITIES.map((den) => {
                const isSelected = currentDensity === den.id;
                return (
                  <button
                    key={den.id}
                    type="button"
                    onClick={() => handleSelectDensity(den.id)}
                    aria-pressed={isSelected}
                    className={`p-2.5 text-left rounded-[var(--radius)] border transition-all ${
                      isSelected
                        ? "border-[var(--accent)] bg-[var(--surface)] text-[var(--accent)]"
                        : "border-[var(--line)] bg-[var(--surface)] text-[var(--ink)] hover:border-[var(--gray)]"
                    }`}
                  >
                    <div className="font-mono text-xs font-medium">
                      {lang === "de" ? den.nameDE : den.nameZH}
                    </div>
                    <div className="font-sans text-[var(--text-meta)] text-[var(--gray)] mt-0.5 leading-snug">
                      {lang === "de" ? den.descDE : den.descZH}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* 3. Wissensquelle */}
      <section className="mt-6 border-t border-[var(--line)] pt-4">
        <h2 className="font-mono text-[var(--text-meta)] uppercase tracking-wider text-[var(--gray)]">
          3. {tr.stSource}
        </h2>
        <p className="mt-2 font-mono text-xs text-[var(--gray)]">
          {vaultConnected ? vaultMsg : tr.stVaultDemo}
        </p>
        <div className="mt-2 flex flex-wrap gap-2">
          <button type="button" onClick={onOpenVault} className={btn}>
            {tr.stVaultOpen}
          </button>
          <button type="button" onClick={onRedoOnboarding} className={btn}>
            {tr.obRedo}
          </button>
        </div>
      </section>

      {/* 4. KI-Engine */}
      <section className="mt-6 border-t border-[var(--line)] pt-4">
        <h2 className="font-mono text-[var(--text-meta)] uppercase tracking-wider text-[var(--gray)]">
          4. {tr.stAi}
        </h2>
        <div className="mt-2">
          <AiSettings lang={lang} />
        </div>
      </section>

      {/* 5. Daten & Export */}
      <section className="mt-6 border-t border-[var(--line)] pt-4">
        <h2 className="font-mono text-[var(--text-meta)] uppercase tracking-wider text-[var(--gray)]">
          5. {tr.stData}
        </h2>
        <div className="mt-2 flex flex-wrap gap-2">
          <button type="button" onClick={onExportFsrs} className={btn}>
            {tr.exportFsrs} (JSON)
          </button>
          <button type="button" onClick={onExportXp} className={btn}>
            {tr.stExportXp} (JSON)
          </button>
          <button
            type="button"
            onClick={wipe}
            className="rounded-[var(--radius)] border border-[var(--warning)]/30 bg-[var(--surface)] px-3 py-1.5 font-sans text-xs text-[var(--warning)] hover:bg-[var(--warning)]/10 active:scale-95 transition-all duration-150"
          >
            {tr.stWipe}
          </button>
        </div>

        {/* Cloud-sync: endpoint + token + push/pull */}
        <div className="mt-4 border-y border-[var(--line)] py-3 space-y-2">
          <div className="font-mono text-[var(--text-meta)] text-[var(--gray)]">{tr.stSync}</div>
          <label className="block">
            <span className="font-sans text-xs text-[var(--gray)]">{tr.stSyncEndpoint}</span>
            <input
              value={syncCfg.endpoint}
              onChange={(e) => saveSyncCfg({ endpoint: e.target.value })}
              placeholder="https://mein-server/sync"
              spellCheck={false}
              className="mt-1 block w-full rounded-[var(--radius)] border border-[var(--line)] bg-[var(--surface)] px-2 py-1.5 font-mono text-xs text-[var(--ink)] focus:border-[var(--accent)] focus:outline-none"
            />
          </label>
          <label className="block">
            <span className="font-sans text-xs text-[var(--gray)]">{tr.stSyncToken}</span>
            <input
              type="password"
              value={syncCfg.token}
              onChange={(e) => saveSyncCfg({ token: e.target.value })}
              autoComplete="off"
              spellCheck={false}
              className="mt-1 block w-full rounded-[var(--radius)] border border-[var(--line)] bg-[var(--surface)] px-2 py-1.5 font-mono text-xs text-[var(--ink)] focus:border-[var(--accent)] focus:outline-none"
            />
          </label>
          <div className="flex flex-wrap items-center gap-2">
            <button type="button" onClick={() => void doSync("push")} className={`${btn} inline-flex items-center gap-1.5`}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M8 11V2.5M4.5 6L8 2.5 11.5 6M3 10.5v2h10v-2" />
              </svg>
              {tr.stSyncPush}
            </button>
            <button type="button" onClick={() => void doSync("pull")} className={`${btn} inline-flex items-center gap-1.5`}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M8 2.5V11M4.5 7.5L8 11l3.5-3.5M3 13.5h10" />
              </svg>
              {tr.stSyncPull}
            </button>
            <span role="status" aria-live="polite" aria-atomic="true" className="font-mono text-[var(--text-meta)] text-[var(--gray)]">
              {syncMsg || (syncCfg.lastSync ? `${tr.stSyncLast}: ${syncCfg.lastSync.slice(0, 16).replace("T", " ")}` : "")}
            </span>
          </div>
        </div>
      </section>

      {/* 6. Tastatur */}
      <section className="mt-6 border-t border-[var(--line)] pt-4">
        <h2 className="font-mono text-[var(--text-meta)] uppercase tracking-wider text-[var(--gray)]">
          6. {tr.stKeys}
        </h2>
        <div className="mt-2">
          <button type="button" onClick={onOpenHelp} className={btn}>
            {tr.stOpenHelp} (?)
          </button>
        </div>
      </section>

      {/* 7. Über */}
      <section className="mt-6 border-y border-[var(--line)] py-4">
        <h2 className="font-mono text-[var(--text-meta)] uppercase tracking-wider text-[var(--gray)]">
          7. {tr.stAbout}
        </h2>
        <p className="mt-2 font-sans text-xs leading-relaxed text-[var(--gray)]">{tr.stAboutText}</p>
      </section>
    </div>
  );
}
