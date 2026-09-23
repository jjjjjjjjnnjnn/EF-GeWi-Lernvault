import { useState } from "react";
import { t, type Lang } from "../i18n";
import AiSettings from "../components/AiSettings";
import { httpAccess, pullAll, pushAll, stampSync, syncStore } from "../engine/sync";
import { allPersistedKeys } from "../engine/storageKeys";

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
    "rounded-sm border border-[#E5E1D8] bg-white px-3 py-1.5 font-sans text-xs text-[#1C1B17] hover:border-[#4338CA] hover:text-[#4338CA] active:scale-95 transition-all duration-150";

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

  return (
    <div className="mx-auto max-w-2xl px-2 py-6">
      <h1 className="font-serif text-2xl text-[#1C1B17]">{tr.settings}</h1>

      {/* 1. Sprache */}
      <section className="mt-6 border-t border-[#E5E1D8] pt-4">
        <h2 className="font-mono text-[11px] uppercase tracking-wider text-[#6B675C]">
          1. {tr.stLanguage}
        </h2>
        <div className="mt-2 inline-flex overflow-hidden rounded-sm border border-[#E5E1D8]" role="group">
          {(["de", "zh"] as Lang[]).map((l) => (
            <button
              key={l}
              onClick={() => onLangChange(l)}
              aria-pressed={lang === l}
              className={`px-4 py-1.5 font-sans text-sm transition-colors duration-150 ${
                lang === l ? "bg-[#1C1B17] text-[#FAFAF7]" : "bg-white text-[#6B675C] hover:text-[#4338CA]"
              }`}
            >
              {l === "de" ? "Deutsch (Prüfung)" : "中文（理解）"}
            </button>
          ))}
        </div>
      </section>

      {/* 2. Wissensquelle */}
      <section className="mt-6 border-t border-[#E5E1D8] pt-4">
        <h2 className="font-mono text-[11px] uppercase tracking-wider text-[#6B675C]">
          2. {tr.stSource}
        </h2>
        <p className="mt-2 font-mono text-xs text-[#6B675C]">
          {vaultConnected ? vaultMsg : tr.stVaultDemo}
        </p>
        <div className="mt-2 flex flex-wrap gap-2">
          <button onClick={onOpenVault} className={btn}>
            {tr.stVaultOpen}
          </button>
          <button onClick={onRedoOnboarding} className={btn}>
            {tr.obRedo}
          </button>
        </div>
      </section>

      {/* 3. KI-Engine */}
      <section className="mt-6 border-t border-[#E5E1D8] pt-4">
        <h2 className="font-mono text-[11px] uppercase tracking-wider text-[#6B675C]">
          3. {tr.stAi}
        </h2>
        <div className="mt-2 border border-[#E5E1D8] bg-white rounded-sm overflow-hidden">
          <AiSettings lang={lang} />
        </div>
      </section>

      {/* 4. Daten & Export */}
      <section className="mt-6 border-t border-[#E5E1D8] pt-4">
        <h2 className="font-mono text-[11px] uppercase tracking-wider text-[#6B675C]">
          4. {tr.stData}
        </h2>
        <div className="mt-2 flex flex-wrap gap-2">
          <button onClick={onExportFsrs} className={btn}>
            {tr.exportFsrs} (JSON)
          </button>
          <button onClick={onExportXp} className={btn}>
            {tr.stExportXp} (JSON)
          </button>
          <button
            onClick={wipe}
            className="rounded-sm border border-[#991B1B]/30 bg-white px-3 py-1.5 font-sans text-xs text-[#991B1B] hover:bg-[#991B1B]/10 active:scale-95 transition-all duration-150"
          >
            {tr.stWipe}
          </button>
        </div>

        {/* Cloud-sync: endpoint + token + push/pull */}
        <div className="mt-4 border border-[#E5E1D8] bg-white rounded-sm p-3 space-y-2">
          <div className="font-mono text-[11px] text-[#6B675C]">{tr.stSync}</div>
          <label className="block">
            <span className="font-sans text-xs text-[#6B675C]">{tr.stSyncEndpoint}</span>
            <input
              value={syncCfg.endpoint}
              onChange={(e) => saveSyncCfg({ endpoint: e.target.value })}
              placeholder="https://mein-server/sync"
              spellCheck={false}
              className="mt-1 block w-full rounded-sm border border-[#E5E1D8] bg-white px-2 py-1.5 font-mono text-xs text-[#1C1B17] focus:border-[#4338CA] focus:outline-none"
            />
          </label>
          <label className="block">
            <span className="font-sans text-xs text-[#6B675C]">{tr.stSyncToken}</span>
            <input
              type="password"
              value={syncCfg.token}
              onChange={(e) => saveSyncCfg({ token: e.target.value })}
              autoComplete="off"
              spellCheck={false}
              className="mt-1 block w-full rounded-sm border border-[#E5E1D8] bg-white px-2 py-1.5 font-mono text-xs text-[#1C1B17] focus:border-[#4338CA] focus:outline-none"
            />
          </label>
          <div className="flex flex-wrap items-center gap-2">
            <button onClick={() => void doSync("push")} className={btn}>
              ↑ {tr.stSyncPush}
            </button>
            <button onClick={() => void doSync("pull")} className={btn}>
              ↓ {tr.stSyncPull}
            </button>
            <span className="font-mono text-[11px] text-[#6B675C]">
              {syncMsg || (syncCfg.lastSync ? `${tr.stSyncLast}: ${syncCfg.lastSync.slice(0, 16).replace("T", " ")}` : "")}
            </span>
          </div>
        </div>
      </section>

      {/* 5. Tastatur */}
      <section className="mt-6 border-t border-[#E5E1D8] pt-4">
        <h2 className="font-mono text-[11px] uppercase tracking-wider text-[#6B675C]">
          5. {tr.stKeys}
        </h2>
        <div className="mt-2">
          <button onClick={onOpenHelp} className={btn}>
            {tr.stOpenHelp} (?)
          </button>
        </div>
      </section>

      {/* 6. Über */}
      <section className="mt-6 border-y border-[#E5E1D8] py-4">
        <h2 className="font-mono text-[11px] uppercase tracking-wider text-[#6B675C]">
          6. {tr.stAbout}
        </h2>
        <p className="mt-2 font-sans text-xs leading-relaxed text-[#6B675C]">{tr.stAboutText}</p>
      </section>
    </div>
  );
}
