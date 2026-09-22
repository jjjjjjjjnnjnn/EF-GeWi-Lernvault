import { useState, useRef, useEffect } from "react";
import { t, type Lang } from "../i18n";
import type { VaultNote } from "../vault/parser";
import AiSettings from "../components/AiSettings";
import {
  chat,
  describeActiveEngine,
  EngineOffError,
  NeedsKeyError,
  type ChatMsg,
} from "../ai/engine";
import {
  buildTutorSystem,
  chunkNotes,
  findFallbackNote,
  verifySupport,
} from "../engine/rag";
import { retrieveHybrid, chunkVectors, claimVectors, verifySemantic } from "../engine/embed";

interface Message {
  id: string;
  role: "ki" | "du";
  text: string;
  isError?: boolean;
}

export default function Tutor({
  lang,
  vaultNotes = null,
  onJumpToLibrary,
}: {
  lang: Lang;
  vaultNotes?: VaultNote[] | null;
  onJumpToLibrary?: (query: string) => void;
}) {
  const tr = t(lang);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "ki",
      text:
        lang === "de"
          ? "Willkommen! Ich bin dein lokaler EF-Tutor. Stelle Fragen zu SoWi, Philosophie oder Mathe. Jede Auskunft wird direkt aus deinen Vault-Notizen belegt.\n\n你好！我是你的本地高中助教。支持 SoWi、哲学与核心公式提问，所有实质断言均附带知识库精确出处。"
          : "你好！我是你的本地高中助教。支持 SoWi、哲学与核心公式提问，所有实质断言均附带知识库精确出处。\n\nWillkommen! Ich bin dein lokaler EF-Tutor. Jede Auskunft wird direkt aus deinen Vault-Notizen belegt.",
    },
  ]);

  const [input, setInput] = useState("");
  const [isThinking, setIsThinking] = useState(false);
  const [isDegraded, setIsDegraded] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [retryCountdown, setRetryCountdown] = useState(0);
  const [showAi, setShowAi] = useState(false);
  const [localPct, setLocalPct] = useState<number | null>(null);
  const [engineTag, setEngineTag] = useState(() => describeActiveEngine());
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, isThinking]);

  useEffect(() => {
    if (retryCountdown <= 0) return;
    const tId = setTimeout(() => setRetryCountdown((c) => c - 1), 1000);
    return () => clearTimeout(tId);
  }, [retryCountdown]);

  const sendMessage = async (retryContent?: string) => {
    const q = (retryContent ?? input).trim();
    if (!q || isThinking) return;

    if (!retryContent) {
      setMessages((prev) => [
        ...prev,
        { id: `u-${Date.now()}`, role: "du", text: q },
      ]);
      setInput("");
    }

    setIsThinking(true);
    setErrorMsg(null);

    // RAG-hybrid: L2 (embedModel) -> L1 (lokal, desktop) -> L0 (keyword).
    // stille downgrades; L1-download mit fortschritt (lokal-%-anzeige).
    const { chunks, level } = await retrieveHybrid(chunkNotes(vaultNotes || []), q, 8, {
      onProgress: (p) => setLocalPct(p),
    });

    try {
      const history: ChatMsg[] = [
        {
          role: "system",
          content: buildTutorSystem(chunks),
        },
        ...messages
          .filter((m) => !m.isError)
          .map((m) => ({
            role: (m.role === "ki" ? "assistant" : "user") as "assistant" | "user",
            content: m.text,
          })),
        { role: "user", content: q },
      ];
      const reply = await chat(history, {
        temperature: 0.3,
        maxTokens: 600,
        onLocalProgress: (p) => setLocalPct(p),
      });

      // Support-verifier (string-stufe): fremde [pfad#zeile] -> unsicher-markierung
      const support = verifySupport(reply, chunks);
      let checkedReply = support.supported
        ? reply
        : `${reply}\n\n(Unsicher — Beleg nicht im Vault gefunden: ${support.missing.join(", ")}. Bitte prüfen / 请核对。)`;
      // Stage-2 (nur L1/L2-vektor): unbelegte behauptungen markieren, fehler -> still
      if (level === "L1" || level === "L2") {
        try {
          const vecs = await chunkVectors(chunks, level);
          const rep = await verifySemantic(checkedReply, [...vecs.values()], (t) => claimVectors(t, level));
          const weak = rep.claims.filter((c) => !c.backed).slice(0, 2);
          if (weak.length > 0) {
            const short = weak.map((c) => (c.claim.length > 60 ? `${c.claim.slice(0, 60)}…` : c.claim));
            checkedReply += `\n\n(Semantik-Check: schwach belegt — „${short.join("“ / „")}“ … bitte am Vault prüfen.)`;
          }
        } catch {
          // embedder weg -> string-stufe gilt
        }
      }

      setMessages((prev) => [
        ...prev,
        { id: `ki-${Date.now()}`, role: "ki", text: checkedReply },
      ]);
      setIsDegraded(false);
      setEngineTag(`${describeActiveEngine()} · RAG-${level}`);
    } catch (err) {
      // Engine aus / Key fehlt / Anbieter down -> Vorlagen-Modus (wie bisher)
      if (err instanceof NeedsKeyError) {
        setErrorMsg(tr.aiNeedKey);
        setShowAi(true);
      } else if (!(err instanceof EngineOffError)) {
        setErrorMsg(err instanceof Error ? err.message : String(err));
      }
      setIsDegraded(true);

      // Search matching note in vault (vorlagen-modus)
      const match = findFallbackNote(vaultNotes || [], q);

      if (match) {
        const pathRef = match.path || `${match.fach}/${match.thema}.md#1`;
        const lead = match.blocks[0]?.text || "Kernkonzept aus dem Vault.";
        const fallbackText = `[${pathRef}] ${match.thema} (${match.fach}): ${lead}\n\n(Hinweis: Vorlagen-Modus aktiv — KI-Engine aus oder nicht bereit.)`;
        setMessages((prev) => [
          ...prev,
          { id: `ki-${Date.now()}`, role: "ki", text: fallbackText },
        ]);
      } else {
        const defaultRef = "08_SoWi/Soziale-Ungleichheit.md#1";
        const fallbackText =
          lang === "de"
            ? `[${defaultRef}] Auszug aus den Grundlagen-Notizen: Für freie Antworten schalte oben eine KI-Engine ein (API-direkt oder lokal).`
            : `[${defaultRef}] 知识库核心条目参考：自由问答请在上方开启一个AI引擎（直连或本地）。`;
        setMessages((prev) => [
          ...prev,
          { id: `ki-${Date.now()}`, role: "ki", text: fallbackText },
        ]);
      }
    } finally {
      setIsThinking(false);
      setLocalPct(null);
    }
  };

  /**
   * Render AI message with interactive citation chips and 'ohne Beleg' indicators
   */
  const renderAiText = (text: string) => {
    const lines = text.split("\n");

    return (
      <div className="space-y-2">
        {lines.map((line, lIdx) => {
          const trimmed = line.trim();
          if (!trimmed) return <div key={lIdx} className="h-2" />;

          // Match citations: [Fach/File.md#12] or [Thema]
          const citationRegex = /\[([a-zA-Z0-9_\-./]+(?:#[L\d]+)?)\]/g;
          const parts = [];
          let lastIndex = 0;
          let match: RegExpExecArray | null;
          let hasCitation = false;

          while ((match = citationRegex.exec(line)) !== null) {
            hasCitation = true;
            if (match.index > lastIndex) {
              parts.push(line.slice(lastIndex, match.index));
            }
            const citeTarget = match[1];
            parts.push(
              <button
                key={`${lIdx}-${match.index}`}
                type="button"
                onClick={() => onJumpToLibrary?.(citeTarget)}
                title={lang === "de" ? "In Notizen öffnen" : "在笔记库中查看"}
                className="inline-flex items-center font-mono text-[10px] text-[#4338CA] bg-[#4338CA]/10 hover:bg-[#4338CA]/20 px-1 py-0.5 rounded-sm mx-1 transition-colors cursor-pointer"
              >
                [{citeTarget}]
              </button>
            );
            lastIndex = citationRegex.lastIndex;
          }

          if (lastIndex < line.length) {
            parts.push(line.slice(lastIndex));
          }

          // If line has no citation and is not a heading/empty/greeting, append ohne Beleg
          const isShortOrGreeting = trimmed.length < 15 || trimmed.startsWith("#") || trimmed.startsWith("-");
          const needsWarning = !hasCitation && !isShortOrGreeting;

          return (
            <p key={lIdx} className="leading-relaxed">
              {parts}
              {needsWarning && (
                <span
                  title={lang === "de" ? "Behauptung ohne Notizbeleg" : "此断言未标注笔记出处"}
                  className="inline-block font-mono text-[10px] text-[#6B675C] bg-[#ECE7DC]/60 px-1.5 py-0.5 rounded-sm ml-1.5 select-none"
                >
                  {tr.noSource}
                </span>
              )}
            </p>
          );
        })}
      </div>
    );
  };

  return (
    <div className="mx-auto flex h-[76vh] max-w-3xl flex-col rounded-sm border border-[#E5E1D8] bg-white">
      {/* Degraded State: Amber hairline box */}
      {isDegraded && (
        <div className="border-b border-[#E5E1D8] border-l-2 border-[#B45309] bg-[#FAF9F6] px-4 py-2 text-xs font-mono text-[#B45309] flex items-center justify-between">
          <span>{tr.lmDown}</span>
          <span className="text-[10px] text-[#6B675C]">{engineTag}</span>
        </div>
      )}

      {/* Model status bar */}
      <div className="flex items-center justify-between border-b border-[#E5E1D8] bg-[#FAF9F6] px-4 py-2 text-xs font-mono text-[#6B675C]">
        <div className="flex items-center gap-2">
          <span
            className={`h-2 w-2 rounded-full ${
              isDegraded ? "bg-[#B45309]" : "bg-[#10B981]"
            }`}
          />
          <span>
            {isDegraded
              ? "Vorlagen-Modus / 模板模式"
              : `KI-Tutor · ${engineTag}`}
          </span>
        </div>
        <span className="flex items-center gap-3">
          <span className="text-[10px] uppercase tracking-wider text-[#6B675C]">
            Zitierpflicht aktiv
          </span>
          <button
            onClick={() => setShowAi((s) => !s)}
            aria-expanded={showAi}
            className="rounded-sm border border-[#E5E1D8] bg-white px-2 py-0.5 font-sans text-[11px] text-[#1C1B17] hover:border-[#4338CA] hover:text-[#4338CA]"
          >
            {showAi ? tr.aiHideSettings : tr.aiShowSettings}
          </button>
        </span>
      </div>
      {showAi && <AiSettings lang={lang} onChanged={() => setEngineTag(describeActiveEngine())} />}

      {/* Error state if occurred */}
      {errorMsg && (
        <div className="flex items-center justify-between border-b border-[#E5E1D8] bg-[#FEF2F2] px-4 py-2 text-xs font-mono text-[#991B1B]">
          <span>{errorMsg}</span>
          <button
            type="button"
            disabled={retryCountdown > 0}
            onClick={() => sendMessage(messages[messages.length - 1]?.text)}
            className="border border-[#991B1B]/30 px-2 py-0.5 rounded-sm hover:bg-[#991B1B]/10 disabled:opacity-50"
          >
            {retryCountdown > 0
              ? `Wiederholen (${retryCountdown}s)`
              : "Wiederholen / 重试"}
          </button>
        </div>
      )}

      {/* Dialogue Stream */}
      <div ref={scrollRef} className="flex-1 space-y-4 overflow-y-auto p-5">
        {messages.map((m) =>
          m.role === "ki" ? (
            /* AI Message: Left aligned, hairline left border, serif DE + sans ZH */
            <div
              key={m.id}
              className="max-w-[92%] border-l-2 border-[#4338CA] pl-3.5 py-1 text-sm font-serif text-[#1C1B17]"
            >
              <div className="text-[10px] font-mono uppercase tracking-wider text-[#6B675C] mb-1.5 flex items-center gap-2">
                <span>KI-Tutor</span>
                <span className="text-[#E5E1D8]">·</span>
                <span className="text-[9px] text-[#4338CA]">Oberstufe EF</span>
              </div>
              {renderAiText(m.text)}
            </div>
          ) : (
            /* User Message: Right aligned, quiet muted tone */
            <div
              key={m.id}
              className="ml-auto max-w-[85%] rounded-sm border border-[#E5E1D8] bg-[#F3EFE6] px-4 py-2.5"
            >
              <div className="text-[10px] font-mono uppercase tracking-wider text-[#6B675C] mb-0.5 text-right">
                Du · Frage
              </div>
              <div className="font-serif text-sm text-[#1C1B17] break-words">
                {m.text}
              </div>
            </div>
          )
        )}

        {isThinking && (
          <div className="max-w-[92%] border-l-2 border-[#E5E1D8] pl-3.5 py-1">
            <div className="font-mono text-xs text-[#6B675C] animate-pulse">
              {localPct !== null ? tr.aiLocalLoading(localPct) : "denkt nach… / 思考中…"}
            </div>
          </div>
        )}
      </div>

      {/* Input Row */}
      <div className="flex gap-2 border-t border-[#E5E1D8] bg-[#FAF9F6] p-3">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              sendMessage();
            }
          }}
          placeholder={
            lang === "de"
              ? "Frage zu SoWi, Philosophie oder Formeln stellen… (Enter zum Senden)"
              : "提问 SoWi 概念、哲学论争或核心公式… (回车发送)"
          }
          className="flex-1 rounded-sm border border-[#E5E1D8] bg-white px-3 py-2 text-sm text-[#1C1B17] placeholder:text-[#6B675C] focus:border-[#4338CA] focus:outline-none transition-colors font-sans"
        />
        <button
          type="button"
          onClick={() => sendMessage()}
          disabled={isThinking || !input.trim()}
          className="rounded-sm border border-[#1C1B17] bg-[#1C1B17] px-4 py-2 text-xs font-mono uppercase tracking-wider text-white hover:bg-[#4338CA] hover:border-[#4338CA] active:scale-[0.96] disabled:opacity-40 transition-all duration-150"
        >
          {lang === "de" ? "Senden" : "发送"}
        </button>
      </div>
    </div>
  );
}
