import { useEffect, useState } from "react";
import { t, type Lang } from "../i18n";
import { FAECHER, getFachLabel, type FachId } from "../fach";
import { onboardingStore, planStore } from "../engine/stores";
import { isTyping } from "../keys";

export interface OnboardingResult {
  faecher: FachId[];
  klausurDate: string;
  demo: boolean;
}

export const ONBOARDING_KEY = onboardingStore.key;
export const PLAN_KEY = planStore.key;
export const DEFAULT_KLAUSUR_DATE = "2027-06-30";

// Ehrlicher Ausbaustand je Fach (Stand: INDEX, wird mit dem Vault-Wachstum gepflegt).
const READY: FachId[] = ["SoWi", "Philosophie"];
const ACTIVE: FachId[] = ["Deutsch", "Englisch", "Mathe", "Physik", "Bio", "Musik"];

export function loadOnboarding(): OnboardingResult | null {
  const s = onboardingStore.load();
  if (!s.done) return null;
  return {
    faecher: s.faecher.filter((f): f is FachId => (FAECHER as { id: string }[]).some((x) => x.id === f)),
    klausurDate: s.klausurDate || DEFAULT_KLAUSUR_DATE,
    demo: s.demo,
  };
}

export function saveOnboarding(r: OnboardingResult) {
  onboardingStore.save({ version: 1, done: true, faecher: r.faecher, klausurDate: r.klausurDate, demo: r.demo });
  // Klausurtermin in den Lernplan übernehmen (Tasks bleiben unangetastet).
  const plan = planStore.load();
  planStore.save({ ...plan, klausurDate: r.klausurDate });
}

export default function Onboarding({
  lang,
  onLangChange,
  vaultConnected,
  vaultMsg,
  onOpenVault,
  onFinish,
}: {
  lang: Lang;
  onLangChange: (l: Lang) => void;
  vaultConnected: boolean;
  vaultMsg: string;
  onOpenVault: () => void;
  onFinish: (r: OnboardingResult) => void;
}) {
  const tr = t(lang);
  const [step, setStep] = useState(0);
  const [picked, setPicked] = useState<FachId[]>(["SoWi"]);
  const [date, setDate] = useState(DEFAULT_KLAUSUR_DATE);

  // Enter = weiter, aber nie aus Eingabefeldern heraus (isTyping-Schutz).
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Enter" || isTyping()) return;
      e.preventDefault();
      setStep((s) => Math.min(s + 1, 2));
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const toggle = (id: FachId) =>
    setPicked((p) => (p.includes(id) ? p.filter((x) => x !== id) : [...p, id]));

  const groupOf = (id: FachId) =>
    READY.includes(id) ? tr.obFachReady : ACTIVE.includes(id) ? tr.obFachActive : tr.obFachSkeleton;
  const groupTone = (id: FachId) =>
    READY.includes(id)
      ? "border-[#4338CA] text-[#4338CA]"
      : "border-[#E5E1D8] text-[#6B675C]";

  const steps = [tr.obStep1, tr.obStep2, tr.obStep3];

  return (
    <div className="mx-auto max-w-2xl px-6 py-14">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="font-serif text-3xl text-[#1C1B17]">{tr.obTitle}</h1>
          <p className="mt-2 font-sans text-sm text-[#6B675C]">{tr.obSub}</p>
        </div>
        {/* Sprache direkt auf der Startseite (DE = Prüfungssprache, ZH = Verstehenssprache) */}
        <div className="flex shrink-0 overflow-hidden rounded-sm border border-[#E5E1D8]" role="group" aria-label="Sprache / 语言">
          {(["de", "zh"] as Lang[]).map((l) => (
            <button
              key={l}
              onClick={() => onLangChange(l)}
              aria-pressed={lang === l}
              className={`px-3 py-1.5 font-mono text-xs transition-colors duration-150 ${
                lang === l ? "bg-[#1C1B17] text-[#FAFAF7]" : "bg-white text-[#6B675C] hover:text-[#4338CA]"
              }`}
            >
              {l === "de" ? "DE" : "中文"}
            </button>
          ))}
        </div>
      </div>

      {/* Schritt-Anzeige: Nummern + Haarlinie, kein Kartenstapel */}
      <ol className="mt-8 flex items-center gap-0 border-b border-[#E5E1D8] pb-4">
        {steps.map((s, i) => (
          <li key={s} className="flex flex-1 items-center gap-2 font-sans text-sm">
            <span
              className={`font-mono text-xs ${
                i === step ? "text-[#4338CA]" : i < step ? "text-[#1C1B17]" : "text-[#6B675C]"
              }`}
            >
              {i + 1}.
            </span>
            <span className={i === step ? "font-medium text-[#1C1B17]" : "text-[#6B675C]"}>{s}</span>
            {i < steps.length - 1 && <span className="mx-3 h-px flex-1 bg-[#E5E1D8]" />}
          </li>
        ))}
      </ol>

      <div className="tab-enter mt-8" key={step}>
        {step === 0 && (
          <section>
            <p className="font-sans text-sm leading-relaxed text-[#1C1B17]">{tr.obVaultText}</p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <button
                onClick={onOpenVault}
                className="rounded-sm border border-[#1C1B17] bg-[#1C1B17] px-4 py-2 font-sans text-sm text-[#FAFAF7] transition-all duration-150 hover:bg-[#4338CA] hover:border-[#4338CA] active:scale-[0.98] focus-visible:outline focus-visible:outline-1 focus-visible:outline-[#4338CA]"
              >
                {tr.obVaultOpen}
              </button>
              <button
                onClick={() => setStep(1)}
                className="rounded-sm border border-[#E5E1D8] bg-white px-4 py-2 font-sans text-sm text-[#6B675C] transition-all duration-150 hover:border-[#4338CA] hover:text-[#4338CA] active:scale-[0.98]"
              >
                {tr.obVaultDemo}
              </button>
            </div>
            {vaultMsg && (
              <p className="mt-4 font-mono text-xs text-[#6B675C]">{vaultMsg}</p>
            )}
            {vaultConnected && (
              <button
                onClick={() => setStep(1)}
                className="mt-4 font-sans text-sm text-[#4338CA] underline underline-offset-4"
              >
                {tr.obNext} →
              </button>
            )}
          </section>
        )}

        {step === 1 && (
          <section>
            <p className="font-sans text-sm leading-relaxed text-[#1C1B17]">{tr.obFachText}</p>
            <ul className="mt-6 divide-y divide-[#E5E1D8]/70 border-y border-[#E5E1D8]">
              {FAECHER.map((f) => {
                const on = picked.includes(f.id);
                return (
                  <li key={f.id}>
                    <button
                      onClick={() => toggle(f.id)}
                      aria-pressed={on}
                      className="flex w-full items-center gap-3 py-2.5 text-left transition-colors hover:bg-[#ECE7DC]/30"
                    >
                      <span
                        className={`flex h-4 w-4 items-center justify-center border text-[11px] ${
                          on ? "border-[#4338CA] bg-[#4338CA] text-white" : "border-[#6B675C] text-transparent"
                        }`}
                      >
                        ✓
                      </span>
                      <span className="font-mono text-[11px] text-[#6B675C]">{f.kurz}</span>
                      <span className={`font-sans text-sm ${on ? "font-medium text-[#1C1B17]" : "text-[#6B675C]"}`}>
                        {getFachLabel(f, lang)}
                      </span>
                      <span className={`ml-auto rounded-sm border px-1.5 py-0.5 font-mono text-[10px] ${groupTone(f.id)}`}>
                        {groupOf(f.id)}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </section>
        )}

        {step === 2 && (
          <section>
            <p className="font-sans text-sm leading-relaxed text-[#1C1B17]">{tr.obDateText}</p>
            <label className="mt-6 block">
              <span className="font-sans text-xs text-[#6B675C]">{tr.obDateLabel}</span>
              <input
                type="date"
                value={date}
                onChange={(e) => e.target.value && setDate(e.target.value)}
                className="mt-1 block rounded-sm border border-[#E5E1D8] bg-white px-3 py-2 font-mono text-sm text-[#1C1B17] focus:border-[#4338CA] focus:outline-none"
              />
            </label>
            <p className="mt-4 font-sans text-sm text-[#6B675C]">
              {picked.length > 0
                ? picked.map((id) => FAECHER.find((f) => f.id === id)?.kurz).join(" · ")
                : "—"}
              {vaultConnected ? "" : lang === "de" ? " · Demo-Modus" : " · 演示模式"}
            </p>
          </section>
        )}
      </div>

      {/* Fußzeile: Zurück / Überspringen / Weiter-Fertig */}
      <div className="mt-10 flex items-center justify-between border-t border-[#E5E1D8] pt-4">
        <button
          onClick={() => (step === 0 ? onFinish({ faecher: [], klausurDate: date, demo: true }) : setStep(step - 1))}
          className="font-sans text-sm text-[#6B675C] hover:text-[#1C1B17]"
        >
          {step === 0 ? tr.obSkip : `← ${tr.obBack}`}
        </button>
        {step < 2 ? (
          <button
            onClick={() => setStep(step + 1)}
            className="rounded-sm border border-[#1C1B17] bg-[#1C1B17] px-4 py-2 font-sans text-sm text-[#FAFAF7] transition-all duration-150 hover:bg-[#4338CA] hover:border-[#4338CA] active:scale-[0.98] focus-visible:outline focus-visible:outline-1 focus-visible:outline-[#4338CA]"
          >
            {tr.obNext} →
          </button>
        ) : (
          <button
            onClick={() => onFinish({ faecher: picked, klausurDate: date, demo: !vaultConnected })}
            className="rounded-sm border border-[#1C1B17] bg-[#1C1B17] px-4 py-2 font-sans text-sm text-[#FAFAF7] transition-all duration-150 hover:bg-[#4338CA] hover:border-[#4338CA] active:scale-[0.98] focus-visible:outline focus-visible:outline-1 focus-visible:outline-[#4338CA]"
          >
            {tr.obFinish}
          </button>
        )}
      </div>
    </div>
  );
}
