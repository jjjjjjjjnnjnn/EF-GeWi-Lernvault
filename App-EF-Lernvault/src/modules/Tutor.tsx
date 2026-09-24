import { useState, useRef, useEffect, useMemo } from "react";
import { t, type Lang } from "../i18n";
import type { VaultNote } from "../vault/parser";
import AiSettings from "../components/AiSettings";
import {
  describeActiveEngine,
  EngineOffError,
  NeedsKeyError,
  type ChatMsg,
} from "../ai/engine";
import {
  chunkNotes,
  verifySupport,
} from "../engine/rag";
import { retrieveHybrid, chunkVectors, claimVectors, verifySemantic } from "../engine/embed";
import { assembleOptimizedContext } from "../engine/context";
import { findVernetzungBridge } from "../engine/vernetzung";
import { retrieveFromCCR } from "../storage/ccrStore";
import {
  type TutorSession,
  type TutorChatMessage,
  loadSessions,
  createSession,
  renameSession,
  deleteSession,
  clearAllSessions,
  loadSessionMessages,
  saveSessionMessages,
  groupSessionsByDate,
} from "../storage/tutorHistory";
import {
  extractInstantSnippet,
  lookupQaCache,
  saveQaCache,
} from "../engine/instantGrounding";
import {
  type ThinkingIntensity,
  loadThinkingIntensity,
  saveThinkingIntensity,
  INTENSITY_PRESETS,
  autoDispatchChat,
} from "../ai/autoDispatch";
import { getActiveEndpoint } from "../ai/endpoints";
import { SatzbauLego } from "../components/pedagogy/SatzbauLego";
import { BalanceBoard } from "../components/pedagogy/BalanceBoard";
import { TextHighlighter } from "../components/pedagogy/TextHighlighter";
import { TangentSlider } from "../components/pedagogy/TangentSlider";
import { FehlerlogModal } from "../components/FehlerlogModal";
import { useDialogFocus } from "../components/HelpOverlay";

import {
  type TutorPedagogyMode,
  type FehlerlogDraft,
  loadTutorPedagogyMode,
  saveTutorPedagogyMode,
  buildPedagogyModeModifier,
  extractFehlerDraftFromMessage,
} from "../ai/socratic";


export default function Tutor({
  lang,
  vaultNotes = null,
  onJumpToLibrary,
  onOpenSettings,
}: {
  lang: Lang;
  vaultNotes?: VaultNote[] | null;
  onJumpToLibrary?: (query: string) => void;
  onOpenSettings?: () => void;
}) {
  const tr = t(lang);

  // Sitzungsverwaltung
  const [sessions, setSessions] = useState<TutorSession[]>([]);
  const [currentSessionId, setCurrentSessionId] = useState<string | null>(null);
  const [messages, setMessages] = useState<TutorChatMessage[]>([]);
  const [showSidebar, setShowSidebar] = useState(true);
  const [editingSessionId, setEditingSessionId] = useState<string | null>(null);
  const [editTitleInput, setEditTitleInput] = useState("");

  // Denkintensität
  const [intensity, setIntensity] = useState<ThinkingIntensity>(() => loadThinkingIntensity());

  // Eingabe & Status
  const [input, setInput] = useState("");
  const [isThinking, setIsThinking] = useState(false);
  const [isDegraded, setIsDegraded] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [retryCountdown, setRetryCountdown] = useState(0);
  const [showAi, setShowAi] = useState(false);
  const [localPct, setLocalPct] = useState<number | null>(null);
  const [activeEp, setActiveEp] = useState(() => getActiveEndpoint());
  const [engineTag, setEngineTag] = useState(() => describeActiveEngine());
  const [copyFeedback, setCopyFeedback] = useState(false);
  const [expandedCcr, setExpandedCcr] = useState<{ hash: string; content: string | null } | null>(null);
  const ccrDialogRef = useDialogFocus(Boolean(expandedCcr), () => setExpandedCcr(null));
  const [pedagogyTool, setPedagogyTool] = useState<"lego" | "balance" | "highlighter" | "tangent" | null>(null);
  const [pedagogyMode, setPedagogyMode] = useState<TutorPedagogyMode>(() => loadTutorPedagogyMode());
  const [fehlerDraft, setFehlerDraft] = useState<FehlerlogDraft | null>(null);
  const [attachedImage, setAttachedImage] = useState<{
    name: string;
    dataUrl: string;
    sizeKb: number;
  } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);


  const handleExpandCcr = async (hash: string) => {
    if (expandedCcr?.hash === hash) {
      setExpandedCcr(null);
      return;
    }
    const content = await retrieveFromCCR(hash);
    setExpandedCcr({ hash, content });
  };

  const scrollRef = useRef<HTMLDivElement>(null);
  const abortRef = useRef<AbortController | null>(null);

  // Standard-Begrüßung
  const welcomeText = useMemo(() => {
    return lang === "de"
      ? "Willkommen! Ich bin dein lokaler EF-Tutor. Stelle Fragen zu SoWi, Philosophie oder Mathe. Jede Auskunft wird direkt aus deinen Vault-Notizen belegt.\n\n你好！我是你的本地高中助教。支持 SoWi、哲学与核心公式提问，所有实质断言均附带知识库精确出处。"
      : "你好！我是你的本地高中助教。支持 SoWi、哲学与核心公式提问，所有实质断言均附带知识库精确出处。\n\nWillkommen! Ich bin dein lokaler EF-Tutor. Jede Auskunft wird direkt aus deinen Vault-Notizen belegt.";
  }, [lang]);

  // Initiales Laden aller Sitzungen
  useEffect(() => {
    let mounted = true;
    (async () => {
      const list = await loadSessions();
      if (!mounted) return;

      if (list.length === 0) {
        // Erste Sitzung anlegen
        const first = await createSession();
        if (!mounted) return;
        setSessions([first]);
        setCurrentSessionId(first.id);

        const initMsgs: TutorChatMessage[] = [
          {
            id: `${first.id}_welcome`,
            sessionId: first.id,
            role: "ki",
            text: welcomeText,
            timestamp: Date.now(),
          },
        ];
        setMessages(initMsgs);
        await saveSessionMessages(first.id, initMsgs);
      } else {
        setSessions(list);
        const active = list[0];
        setCurrentSessionId(active.id);
        const msgs = await loadSessionMessages(active.id);
        if (!mounted) return;
        setMessages(msgs.length > 0 ? msgs : [
          {
            id: `${active.id}_welcome`,
            sessionId: active.id,
            role: "ki",
            text: welcomeText,
            timestamp: Date.now(),
          },
        ]);
      }
    })();

    return () => {
      mounted = false;
      abortRef.current?.abort();
    };
  }, [welcomeText]);

  // Wechsel der aktiven Sitzung
  const switchSession = async (sessId: string) => {
    if (sessId === currentSessionId || isThinking) return;
    abortRef.current?.abort();
    setCurrentSessionId(sessId);
    const msgs = await loadSessionMessages(sessId);
    setMessages(msgs.length > 0 ? msgs : [
      {
        id: `${sessId}_welcome`,
        sessionId: sessId,
        role: "ki",
        text: welcomeText,
        timestamp: Date.now(),
      },
    ]);
  };

  // Neuen Chat starten
  const handleNewChat = async () => {
    if (isThinking) return;
    abortRef.current?.abort();
    const newSess = await createSession();
    setSessions((prev) => [newSess, ...prev]);
    setCurrentSessionId(newSess.id);

    const initMsgs: TutorChatMessage[] = [
      {
        id: `${newSess.id}_welcome`,
        sessionId: newSess.id,
        role: "ki",
        text: welcomeText,
        timestamp: Date.now(),
      },
    ];
    setMessages(initMsgs);
    await saveSessionMessages(newSess.id, initMsgs);
  };

  // Sitzung umbenennen
  const handleSaveRename = async (sessId: string) => {
    if (!editTitleInput.trim()) {
      setEditingSessionId(null);
      return;
    }
    await renameSession(sessId, editTitleInput.trim());
    setSessions((prev) =>
      prev.map((s) => (s.id === sessId ? { ...s, title: editTitleInput.trim() } : s))
    );
    setEditingSessionId(null);
  };

  // Sitzung löschen
  const handleDeleteSession = async (sessId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    await deleteSession(sessId);
    const remaining = sessions.filter((s) => s.id !== sessId);
    setSessions(remaining);

    if (currentSessionId === sessId) {
      if (remaining.length > 0) {
        await switchSession(remaining[0].id);
      } else {
        await handleNewChat();
      }
    }
  };

  // Verlauf komplett leeren
  const handleClearAll = async () => {
    const confirmText =
      lang === "de"
        ? "Möchtest du wirklich den gesamten Chat-Verlauf unwiderruflich leeren?"
        : "确认清空所有历史对话记录吗？此操作无法撤销。";
    if (!window.confirm(confirmText)) return;

    await clearAllSessions();
    const fresh = await createSession();
    setSessions([fresh]);
    setCurrentSessionId(fresh.id);
    const initMsgs: TutorChatMessage[] = [
      {
        id: `${fresh.id}_welcome`,
        sessionId: fresh.id,
        role: "ki",
        text: welcomeText,
        timestamp: Date.now(),
      },
    ];
    setMessages(initMsgs);
    await saveSessionMessages(fresh.id, initMsgs);
  };

  // Exportieren als Markdown
  const handleExportMarkdown = () => {
    const lines = [
      `# EF-GeWi Lernvault — KI-Tutor Dialog`,
      `Datum: ${new Date().toLocaleDateString()}`,
      `Engine: ${engineTag}`,
      `Intensität: ${INTENSITY_PRESETS[intensity].labelDE}`,
      `---`,
      "",
    ];

    for (const m of messages) {
      if (m.role === "du") {
        lines.push(`### [Frage / 用户提问]: ${m.text}\n`);
      } else {
        if (m.instantSnippet) {
          lines.push(`> [Instant Grounding: ${m.instantSnippet.notePath}] ${m.instantSnippet.thema}: ${m.instantSnippet.excerpt}\n`);
        }
        lines.push(`${m.text}\n\n---\n`);
      }
    }

    const blob = new Blob([lines.join("\n")], { type: "text/markdown;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `tutor-dialog-${new Date().toISOString().slice(0, 10)}.md`;
    a.click();
    URL.revokeObjectURL(url);
    setCopyFeedback(true);
    setTimeout(() => setCopyFeedback(false), 2000);
  };

  // Auto-Scroll
  useEffect(() => {
    if (typeof scrollRef.current?.scrollTo === "function") {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages, isThinking]);

  // Retry-Countdown
  useEffect(() => {
    if (retryCountdown <= 0) return;
    const tId = setTimeout(() => setRetryCountdown((c) => c - 1), 1000);
    return () => clearTimeout(tId);
  }, [retryCountdown]);

  const handleImageFile = (file: File) => {
    if (!file.type.startsWith("image/")) return;
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") {
        setAttachedImage({
          name: file.name || "bild.png",
          dataUrl: reader.result,
          sizeKb: Math.round(file.size / 1024),
        });
      }
    };
    reader.readAsDataURL(file);
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    const items = e.clipboardData?.items;
    if (!items) return;
    for (let i = 0; i < items.length; i++) {
      if (items[i].type.startsWith("image/")) {
        const file = items[i].getAsFile();
        if (file) {
          handleImageFile(file);
          e.preventDefault();
          break;
        }
      }
    }
  };

  const handleCaptureFehler = (botMsg: TutorChatMessage) => {
    const botIdx = messages.findIndex((m) => m.id === botMsg.id);
    const prevUser = botIdx > 0 ? messages[botIdx - 1] : undefined;
    const userText = prevUser?.role === "du" ? prevUser.text : "Frage zu Klausurthema";

    const draft = extractFehlerDraftFromMessage(
      userText,
      botMsg.text,
      "SoWi",
      botMsg.instantSnippet?.thema || ""
    );
    setFehlerDraft(draft);
  };

  // Nachricht senden mit Zero-Perceived Latency
  const sendMessage = async (retryContent?: string) => {
    const q = (retryContent ?? input).trim();
    if (!q || isThinking || !currentSessionId) return;

    const currentImg = attachedImage;
    if (!retryContent) {
      setInput("");
      setAttachedImage(null);
    }

    setIsThinking(true);
    setErrorMsg(null);

    if (abortRef.current) {
      abortRef.current.abort();
    }
    const controller = new AbortController();
    abortRef.current = controller;

    const userMsgId = `u-${Date.now()}`;
    const botMsgId = `ki-${Date.now()}`;

    // 1. SCHRITT: Instant Grounding in <10ms (Zero-Perceived Latency)
    const instantSnippet = extractInstantSnippet(vaultNotes || [], q);

    const userMsg: TutorChatMessage = {
      id: userMsgId,
      sessionId: currentSessionId,
      role: "du",
      text: q,
      timestamp: Date.now(),
      imageUrl: currentImg?.dataUrl,
    };

    const initialBotMsg: TutorChatMessage = {
      id: botMsgId,
      sessionId: currentSessionId,
      role: "ki",
      text: "",
      timestamp: Date.now() + 1,
      instantSnippet: instantSnippet ?? undefined,
    };

    const updatedWithUser = [...messages, userMsg, initialBotMsg];
    setMessages(updatedWithUser);

    // Sitzungstitel aktualisieren, falls noch "Neue Unterhaltung"
    const currSess = sessions.find((s) => s.id === currentSessionId);
    if (currSess && currSess.title === "Neue Unterhaltung") {
      const clean = q.replace(/^Was ist\s+/i, "").replace(/^Erkläre\s+/i, "");
      const newTitle = clean.length > 28 ? `${clean.slice(0, 26)}…` : clean;
      await renameSession(currentSessionId, newTitle);
      setSessions((prev) =>
        prev.map((s) => (s.id === currentSessionId ? { ...s, title: newTitle } : s))
      );
    }

    // 2. SCHRITT: Schneller QA-Cache-Check (0ms Rückgabe bei wiederholten Fragen)
    const cachedReply = lookupQaCache(q);
    if (cachedReply && !currentImg) {
      setIsThinking(false);
      const bridge = findVernetzungBridge(q);
      const finalBot: TutorChatMessage = {
        ...initialBotMsg,
        text: cachedReply,
        vernetzungBridge: bridge ?? undefined,
      };
      const finalMsgs = [...messages, userMsg, finalBot];
      setMessages(finalMsgs);
      await saveSessionMessages(currentSessionId, finalMsgs);
      return;
    }

    // 3. SCHRITT: Hybrid RAG & Token-Budgetierung
    const { chunks, level } = await retrieveHybrid(
      chunkNotes(vaultNotes || []),
      q,
      INTENSITY_PRESETS[intensity].topKChunks,
      { onProgress: (p) => setLocalPct(p) }
    );

    const effectiveQuery = currentImg
      ? `[Bildanhang: ${currentImg.name}]\n${q}`
      : q;

    try {
      const rawHistory: ChatMsg[] = messages
        .filter((m) => {
          if (m.isError) return false;
          // 本地欢迎引导语与招呼语绝不可混入历史上下文，杜绝大模型依样复读
          if (
            m.id === "welcome" ||
            m.id.endsWith("_welcome") ||
            m.text === welcomeText ||
            m.text.includes("我是你的本地高中助教") ||
            m.text.includes("lokaler EF-Tutor")
          ) {
            return false;
          }
          // 杜绝将离线/网络报错兜底话术混入上下文，防止大模型依样画葫芦复读报错
          if (
            m.text.includes("离线") ||
            m.text.includes("未连通") ||
            m.text.includes("未收录相关笔记") ||
            m.text.includes("HTTP 4") ||
            m.text.includes("HTTP 5") ||
            m.text.includes("Failed to fetch") ||
            m.text.includes("CORS")
          ) {
            return false;
          }
          return true;
        })
        .map((m) => ({
          role: (m.role === "ki" ? "assistant" : "user") as "assistant" | "user",
          content: m.text,
        }));

      const pedagogyMod = buildPedagogyModeModifier(pedagogyMode);
      const fullModifier = `${INTENSITY_PRESETS[intensity].systemModifierDE}\n\n${pedagogyMod}`;

      const optimized = await assembleOptimizedContext(chunks, rawHistory, {
        query: effectiveQuery,
        maxContextTokens: 3000,
        generationReserve: INTENSITY_PRESETS[intensity].maxTokens,
        systemReserve: 400,
        intensityModifier: fullModifier,
        currentSubject: chunks[0]?.fach,
      });

      const history: ChatMsg[] = optimized.messages;

      // 4. SCHRITT: Auto-Dispatch Stream (automatischer Failover bei offline LM Studio)
      const res = await autoDispatchChat(
        history,
        effectiveQuery,
        vaultNotes || [],
        chunks,
        {
          signal: controller.signal,
          intensity,
          savedTokensCCR: optimized.stats.savedTokens,
          onLocalProgress: (p) => setLocalPct(p),
          onChunk: (chunk) => {
            setIsThinking(false);
            setMessages((prev) =>
              prev.map((m) =>
                m.id === botMsgId ? { ...m, text: chunk.accumulated } : m
              )
            );
          },
        }
      );

      let checkedReply = res.reply;

      // Support-Verifier bei LLM-Generierung
      if (res.source === "llm") {
        const support = verifySupport(checkedReply, chunks);
        if (!support.supported) {
          checkedReply += `\n\n(Unsicher — Beleg nicht im Vault gefunden: ${support.missing.join(", ")}. Bitte prüfen / 请核对。)`;
        }

        // Semantik-Check (nur L1/L2)
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
            // Ignorieren
          }
        }

        // In lokalen QA-Cache einpflegen
        saveQaCache(q, checkedReply);
      }

      const compBadge = optimized.stats.savedTokens > 0
        ? ` · CCR -${optimized.stats.savedTokens}tok`
        : "";
      const baseBadge = res.badge ?? `${describeActiveEngine()} · RAG-${level}`;
      const fullEngineTag = `${baseBadge}${compBadge}`;

      const finalBot: TutorChatMessage = {
        ...initialBotMsg,
        text: checkedReply,
        engineTag: fullEngineTag,
        isError: res.source === "vault-autofallback",
        vernetzungBridge: optimized.vernetzungBridge ?? undefined,
      };

      setMessages((prev) => {
        const withoutBot = prev.filter((m) => m.id !== botMsgId);
        const hasUser = withoutBot.some((m) => m.id === userMsg.id);
        const next = hasUser ? [...withoutBot, finalBot] : [...withoutBot, userMsg, finalBot];
        saveSessionMessages(currentSessionId, next);
        return next;
      });
      setIsDegraded(res.source === "vault-autofallback");
      setEngineTag(fullEngineTag);
    } catch (err) {
      if (err instanceof DOMException && err.name === "AbortError") {
        return;
      }
      // Fehlermeldung setzen falls noch kein Text da war
      setMessages((prev) => prev.filter((m) => m.id !== botMsgId || m.text.length > 0));

      if (err instanceof NeedsKeyError) {
        setErrorMsg(tr.aiNeedKey);
        setShowAi(true);
      } else if (!(err instanceof EngineOffError)) {
        setErrorMsg(err instanceof Error ? err.message : String(err));
      }
      setIsDegraded(true);
    } finally {
      setIsThinking(false);
    }
  };

  // Zitat- & CCR-Parser für Antworten
  const renderAiText = (text: string) => {
    const tokenRegex = /(\[([A-Za-z0-9_\-./äöüÄÖÜß]+\.md(?:#\d+)?)\]|\[Ref:\s*#(h-[0-9a-f]{8})\])/g;
    const lines = text.split("\n");

    return (
      <div className="exam-reading de-reading space-y-2">
        {lines.map((line, lIdx) => {
          if (!line.trim()) {
            return <div key={lIdx} className="h-2" />;
          }

          const parts: (string | React.ReactNode)[] = [];
          let lastIndex = 0;
          let match: RegExpExecArray | null;
          let hasCitation = false;

          tokenRegex.lastIndex = 0;
          while ((match = tokenRegex.exec(line)) !== null) {
            hasCitation = true;
            if (match.index > lastIndex) {
              parts.push(line.slice(lastIndex, match.index));
            }

            if (match[2]) {
              // Notiz-Zitat [Fach/Dateiname.md#Zeile]
              const citeTarget = match[2];
              parts.push(
                <button
                  type="button"
                  key={`cite-${lIdx}-${match.index}`}
                  onClick={() => onJumpToLibrary?.(citeTarget)}
                  title={lang === "de" ? "In Notizen öffnen" : "在笔记库中查看"}
                  className="inline-flex items-center font-mono text-[var(--text-meta)] text-[var(--accent)] bg-[var(--accent)]/10 hover:bg-[var(--accent)]/20 px-1 py-0.5 rounded-[var(--radius)] mx-1 transition-colors cursor-pointer"
                >
                  [{citeTarget}]
                </button>
              );
            } else if (match[3]) {
              // CCR-Referenz [Ref: #h-a1b2c3d4]
              const ccrHash = match[3];
              parts.push(
                <button
                  type="button"
                  key={`ccr-${lIdx}-${match.index}`}
                  onClick={() => handleExpandCcr(ccrHash)}
                  title={lang === "de" ? `CCR-Original (${ccrHash}) anzeigen` : `展开查看 CCR 无损压缩前原文 (#${ccrHash})`}
                  className="inline-flex items-center gap-1 font-mono text-[var(--text-meta)] text-[var(--success)] bg-[var(--success)]/10 hover:bg-[var(--success)]/20 px-1.5 py-0.5 rounded-[var(--radius)] mx-1 transition-colors cursor-pointer"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--success)]" />
                  [Ref: #{ccrHash}]
                </button>
              );
            }
            lastIndex = tokenRegex.lastIndex;
          }

          if (lastIndex < line.length) {
            parts.push(line.slice(lastIndex));
          }

          const trimmed = line.trim();
          const chineseGlyphCount = (line.match(/[\u3400-\u9FFF]/g) ?? []).length;
          const latinGlyphCount = (line.match(/[A-Za-zÄÖÜäöüß]/g) ?? []).length;
          const isTranslation = chineseGlyphCount >= 4 && chineseGlyphCount > latinGlyphCount;
          const isGreetingOrMeta =
            trimmed.includes("我是你的本地高中助教") ||
            trimmed.includes("lokaler EF-Tutor") ||
            trimmed.includes("Willkommen") ||
            trimmed.startsWith("Hallo") ||
            trimmed.startsWith("你好") ||
            trimmed.endsWith("?") ||
            trimmed.endsWith("？") ||
            trimmed.endsWith(":") ||
            trimmed.endsWith("：");
          const isShortOrMarkdown =
            trimmed.length < 15 || trimmed.startsWith("#") || trimmed.startsWith("-") || trimmed.startsWith("*");
          const needsWarning = !hasCitation && !isShortOrMarkdown && !isGreetingOrMeta;

          return (
            <p key={lIdx} className={`leading-relaxed ${isTranslation ? "zh-translation" : "de-reading"}`}>
              {parts}
              {needsWarning && (
                <span
                  title={lang === "de" ? "Behauptung ohne Notizbeleg" : "此断言未标注笔记出处"}
                  className="inline-block font-mono text-[var(--text-meta)] text-[var(--gray)] bg-[var(--gray)]/10 px-1.5 py-0.5 rounded-[var(--radius)] ml-1.5 select-none"
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

  const sessionGroups = useMemo(() => {
    return groupSessionsByDate(sessions, lang);
  }, [sessions, lang]);

  return (
    <div className="mx-auto flex h-[78vh] w-full min-w-0 max-w-5xl rounded-[var(--radius)] border border-[var(--line)] bg-[var(--surface)] overflow-hidden">
      {/* Linke Spalte: Sitzungs-Verlauf / Multi-Session Sidebar */}
      {showSidebar && (
        <aside id="tutor-session-sidebar" className="w-60 flex-shrink-0 flex flex-col border-r border-[var(--line)] bg-[var(--paper-subtle)]">
          {/* Neuer Chat Button */}
          <div className="p-2.5 border-b border-[var(--line)]">
            <button
              type="button"
              onClick={handleNewChat}
              disabled={isThinking}
              className="w-full flex items-center justify-center gap-1.5 rounded-[var(--radius)] border border-[var(--line)] bg-[var(--surface)] px-3 py-1.5 font-sans text-xs font-medium text-[var(--ink)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors disabled:opacity-50"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" aria-hidden="true" className="shrink-0">
                <path d="M8 3v10M3 8h10" />
              </svg>
              <span>{lang === "de" ? "Neuer Chat" : "新建对话"}</span>
            </button>
          </div>

          {/* Sitzungsliste nach Datum gruppiert */}
          <div className="flex-1 overflow-y-auto p-1.5 space-y-3">
            {sessionGroups.map((grp) => (
              <div key={grp.group} className="space-y-0.5">
                <div className="px-2 py-1 font-mono text-[var(--text-meta)] uppercase tracking-wider text-[var(--gray)]">
                  {grp.group}
                </div>
                {grp.items.map((sess) => {
                  const isActive = sess.id === currentSessionId;
                  const isEditing = sess.id === editingSessionId;

                  return (
                    <div
                      key={sess.id}
                      className={`group relative flex items-center rounded-[var(--radius)] border-l-2 pl-2.5 pr-1.5 text-xs transition-colors ${
                        isActive
                          ? "border-[var(--accent)] bg-[var(--surface)] font-medium text-[var(--ink)]"
                          : "border-transparent text-[var(--ink)] hover:bg-[var(--paper-subtle)]"
                      }`}
                    >
                      {isEditing ? (
                        <div className="flex w-full items-center gap-1 py-2">
                          <input
                            type="text"
                            autoFocus
                            aria-label={lang === "de" ? "Chat-Titel bearbeiten" : "编辑对话标题"}
                            value={editTitleInput}
                            onChange={(e) => setEditTitleInput(e.target.value)}
                            onKeyDown={(e) => {
                              if (e.key === "Enter") handleSaveRename(sess.id);
                              if (e.key === "Escape") setEditingSessionId(null);
                            }}
                            className="w-full rounded-[var(--radius)] border border-[var(--focus)] bg-[var(--surface)] px-1 py-0.5 text-xs"
                          />
                          <button
                            type="button"
                            onClick={() => handleSaveRename(sess.id)}
                            className="text-[var(--text-meta)] text-[var(--success)] hover:underline"
                          >
                            OK
                          </button>
                        </div>
                      ) : (
                        <>
                          <button
                            type="button"
                            onClick={() => switchSession(sess.id)}
                            aria-current={isActive ? "true" : undefined}
                            className="de-reading flex min-w-0 flex-1 items-center gap-1.5 truncate py-2 text-left"
                          >
                            {sess.pinned && (
                              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="h-3 w-3 shrink-0 text-[var(--warning)]">
                                <path d="M5 2h6M6 2v4l-2 3h8l-2-3V2M8 9v5" />
                              </svg>
                            )}
                            <span className="truncate">{sess.title}</span>
                          </button>

                          {/* Hover-Aktionen: Umbenennen & Löschen */}
                          <div className="flex items-center gap-1 opacity-0 transition-opacity group-hover:opacity-100 group-focus-within:opacity-100">
                            <button
                              type="button"
                              onClick={() => {
                                setEditingSessionId(sess.id);
                                setEditTitleInput(sess.title);
                              }}
                              title={lang === "de" ? "Umbenennen" : "重命名"}
                              aria-label={lang === "de" ? "Chat umbenennen" : "重命名对话"}
                              className="rounded-[var(--radius)] p-0.5 text-[var(--gray)] hover:text-[var(--ink)] focus-visible:opacity-100"
                            >
                              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="h-3 w-3">
                                <path d="M11.2 2.3l2.5 2.5-7.6 7.6-3.3.8.8-3.3 7.6-7.6zM9.8 3.7l2.5 2.5" />
                              </svg>
                            </button>
                            <button
                              type="button"
                              onClick={(e) => handleDeleteSession(sess.id, e)}
                              title={lang === "de" ? "Löschen" : "删除"}
                              aria-label={lang === "de" ? "Chat löschen" : "删除对话"}
                              className="rounded-[var(--radius)] p-0.5 text-[var(--gray)] hover:text-[var(--warning)] focus-visible:opacity-100"
                            >
                              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" aria-hidden="true">
                                <path d="M4 4l8 8M12 4l-8 8" />
                              </svg>
                            </button>
                          </div>
                        </>
                      )}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>

          {/* Sidebar Footer */}
          <div className="p-2 border-t border-[var(--line)] flex items-center justify-between text-[var(--text-meta)] font-mono text-[var(--gray)]">
            <span>{sessions.length} {lang === "de" ? "Chats" : "个对话"}</span>
            <button
              type="button"
              onClick={handleClearAll}
              className="text-[var(--warning)] hover:underline text-[var(--text-meta)]"
            >
              {lang === "de" ? "Verlauf leeren" : "清空历史"}
            </button>
          </div>
        </aside>
      )}

      {/* Rechte Spalte: Haupt-Chatbereich */}
      <main className="flex-1 flex flex-col min-w-0 bg-[var(--surface)]">
        {/* Model status bar & Controls (Tufte 2-Tier Toolbar) */}
        <div className="border-b border-[var(--line)] bg-[var(--paper-subtle)]">
          {/* Tier 1: System-Status & Kernmodi */}
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[var(--line)]/60 px-3 py-1.5 text-xs font-mono text-[var(--gray)]">
            <div className="flex items-center gap-2 min-w-0">
              <button
                type="button"
                onClick={() => setShowSidebar((s) => !s)}
                title={showSidebar ? (lang === "de" ? "Sidebar verbergen" : "折叠侧栏") : (lang === "de" ? "Sidebar zeigen" : "展开侧栏")}
                aria-label={showSidebar ? (lang === "de" ? "Sidebar verbergen" : "折叠侧栏") : (lang === "de" ? "Sidebar zeigen" : "展开侧栏")}
                aria-expanded={showSidebar}
                aria-controls="tutor-session-sidebar"
                className="cursor-pointer rounded-[var(--radius)] border border-[var(--line)] bg-[var(--surface)] p-1 text-[var(--ink)] hover:border-[var(--accent)] hover:text-[var(--accent)]"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true" className="h-3.5 w-3.5">
                  <path d="M2.5 4h11M2.5 8h11M2.5 12h11" />
                </svg>
              </button>
              <span
                aria-hidden="true"
                className={`h-2 w-2 shrink-0 rounded-full ${
                  isDegraded ? "bg-[var(--warning)]" : "bg-[var(--success)]"
                }`}
              />
              <span className="truncate flex items-center gap-1.5 font-sans">
                <span className="font-medium text-[var(--ink)] truncate">
                  {isDegraded ? "Auto-Dispatch · Vault" : activeEp.name}
                </span>
                {!isDegraded && (
                  <span className="max-w-[130px] truncate rounded-[var(--radius)] border border-[var(--line)] bg-[var(--paper-subtle)] px-1 py-0.2 font-mono text-[var(--text-meta)] text-[var(--accent)]">
                    {activeEp.model.split("/").pop()}
                  </span>
                )}
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-2 xl:shrink-0">
              {/* Denkintensitäts-Auswahl (Schnell | Ausgewogen | Tiefgründig) */}
              <div className="flex items-center gap-0.5 border border-[var(--line)] rounded-[var(--radius)] bg-[var(--surface)] p-0.5">
                {(["fast", "balanced", "deep"] as ThinkingIntensity[]).map((st) => (
                  <button
                    type="button"
                    key={st}
                    aria-pressed={intensity === st}
                    onClick={() => {
                      setIntensity(st);
                      saveThinkingIntensity(st);
                    }}
                    className={`px-2 py-0.5 rounded-[var(--radius)] text-[var(--text-meta)] font-sans transition-colors cursor-pointer ${
                      intensity === st
                        ? "bg-[var(--ink)] text-[var(--paper)]"
                        : "text-[var(--gray)] hover:text-[var(--ink)]"
                    }`}
                    title={INTENSITY_PRESETS[st].systemModifierDE}
                  >
                    {lang === "de" ? INTENSITY_PRESETS[st].labelDE : INTENSITY_PRESETS[st].labelZH}
                  </button>
                ))}
              </div>

              {/* Lehrmodus: Sokratisch vs. Klausur-Direkt */}
              <div className="flex items-center gap-0.5 border border-[var(--line)] rounded-[var(--radius)] bg-[var(--surface)] p-0.5">
                <button
                  type="button"
                  aria-pressed={pedagogyMode === "socratic"}
                  onClick={() => {
                    setPedagogyMode("socratic");
                    saveTutorPedagogyMode("socratic");
                  }}
                  className={`px-2 py-0.5 rounded-[var(--radius)] text-[var(--text-meta)] font-sans transition-colors cursor-pointer flex items-center gap-1 ${
                    pedagogyMode === "socratic"
                      ? "bg-[var(--accent)] text-[var(--surface)] font-medium"
                      : "text-[var(--gray)] hover:text-[var(--ink)]"
                  }`}
                  title={
                    lang === "de"
                      ? "Sokratische Mäeutik: Führt mit schrittweisen Leitfragen zur Lösung (nicht vorsagen)"
                      : "启发引导模式：苏格拉底产婆术，反抛出引导性问题，启发自主解题"
                  }
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="h-3 w-3">
                    <circle cx="8" cy="8" r="6" />
                    <path d="M8 4.5V8l2.5 2.5" />
                  </svg>
                  <span>{lang === "de" ? "Sokratisch" : "启发引导"}</span>
                </button>
                <button
                  type="button"
                  aria-pressed={pedagogyMode === "direct"}
                  onClick={() => {
                    setPedagogyMode("direct");
                    saveTutorPedagogyMode("direct");
                  }}
                  className={`px-2 py-0.5 rounded-[var(--radius)] text-[var(--text-meta)] font-sans transition-colors cursor-pointer flex items-center gap-1 ${
                    pedagogyMode === "direct"
                      ? "bg-[var(--success)] text-[var(--surface)] font-medium"
                      : "text-[var(--gray)] hover:text-[var(--ink)]"
                  }`}
                  title={
                    lang === "de"
                      ? "Klausur-Direkt: Liefert sofort Erwartungshorizont, Klausursatz & Fehlerwarnung"
                      : "考纲直出模式：标准Erwartungshorizont踩分点与满分答题句"
                  }
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="h-3 w-3">
                    <path d="M9.2 1.8L4.3 8.2h3.4l-.9 6 4.9-6.4H8.3l.9-6z" />
                  </svg>
                  <span>{lang === "de" ? "Klausur-Direkt" : "考纲直出"}</span>
                </button>
              </div>

              {/* 端点与模型设置按钮 */}
              <button
                type="button"
                onClick={() => {
                  if (onOpenSettings) {
                    onOpenSettings();
                  } else {
                    setShowAi((s) => !s);
                  }
                }}
                title={lang === "de" ? "Zu den vollständigen KI-Einstellungen (Modelle, Endpunkte)" : "配置端点与模型"}
                className="rounded-[var(--radius)] border border-[var(--line)] bg-[var(--surface)] px-2 py-0.5 font-sans text-[var(--text-meta)] text-[var(--accent)] hover:border-[var(--accent)] hover:bg-[var(--paper-subtle)] flex items-center gap-1 cursor-pointer transition-colors"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="h-3 w-3">
                  <circle cx="8" cy="8" r="2.2" />
                  <path d="M8 1.6v2.1M8 12.3v2.1M1.6 8h2.1M12.3 8h2.1M3.5 3.5l1.5 1.5M11 11l1.5 1.5M12.5 3.5L11 5M5 11l-1.5 1.5" />
                </svg>
                <span>{lang === "de" ? "Modell-Setup" : "配置端点与模型"}</span>
              </button>
            </div>
          </div>

          {/* Tier 2: 学科启发工具条与导出 */}
          <div className="flex flex-wrap items-center justify-between gap-2 px-3 py-1 text-xs font-mono text-[var(--gray)]">
            <div className="flex min-w-0 flex-wrap items-center gap-2">
              <span className="text-[var(--text-meta)] text-[var(--gray)] uppercase tracking-wider font-sans">
                {lang === "de" ? "Didaktik-Tools:" : "学科辅助工具:"}
              </span>
              <div className="flex flex-wrap items-center gap-1">
                <button
                  type="button"
                  aria-pressed={pedagogyTool === "lego"}
                  aria-controls="tutor-pedagogy-panel"
                  onClick={() => setPedagogyTool((t) => (t === "lego" ? null : "lego"))}
                  title={lang === "de" ? "Satzbau-Lego öffnen" : "打开句式积木 (Satzbau-Lego)"}
                  className={`rounded-[var(--radius)] px-2 py-0.5 text-[var(--text-meta)] font-sans transition-colors cursor-pointer flex items-center gap-1 border border-[var(--line)] ${
                    pedagogyTool === "lego"
                      ? "bg-[var(--accent)] text-[var(--surface)] font-medium border-[var(--accent)]"
                      : "bg-[var(--surface)] text-[var(--ink)] hover:bg-[var(--paper-subtle)]"
                  }`}
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="h-3 w-3">
                    <rect x="2" y="5" width="12" height="9" rx="1" />
                    <circle cx="5" cy="3" r="1.5" />
                    <circle cx="11" cy="3" r="1.5" />
                  </svg>
                  <span>{lang === "de" ? "Satzbau-Lego" : "句式积木"}</span>
                </button>

                <button
                  type="button"
                  aria-pressed={pedagogyTool === "balance"}
                  aria-controls="tutor-pedagogy-panel"
                  onClick={() => setPedagogyTool((t) => (t === "balance" ? null : "balance"))}
                  title={lang === "de" ? "Dialektische Waage öffnen" : "打开辩证天平 (Urteils-Waage)"}
                  className={`rounded-[var(--radius)] px-2 py-0.5 text-[var(--text-meta)] font-sans transition-colors cursor-pointer flex items-center gap-1 border border-[var(--line)] ${
                    pedagogyTool === "balance"
                      ? "bg-[var(--success)] text-[var(--surface)] font-medium border-[var(--success)]"
                      : "bg-[var(--surface)] text-[var(--ink)] hover:bg-[var(--paper-subtle)]"
                  }`}
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="h-3 w-3">
                    <path d="M8 2v12M3 14h10M4 6l4-2 4 2M4 6l-2 5h4l-2-5M12 6l-2 5h4l-2-5" />
                  </svg>
                  <span>{lang === "de" ? "Urteils-Waage" : "辩证天平"}</span>
                </button>

                <button
                  type="button"
                  aria-pressed={pedagogyTool === "highlighter"}
                  aria-controls="tutor-pedagogy-panel"
                  onClick={() => setPedagogyTool((t) => (t === "highlighter" ? null : "highlighter"))}
                  title={lang === "de" ? "Text-Dekonstruierer öffnen" : "打开荧光标注解构画板"}
                  className={`rounded-[var(--radius)] px-2 py-0.5 text-[var(--text-meta)] font-sans transition-colors cursor-pointer flex items-center gap-1 border border-[var(--line)] ${
                    pedagogyTool === "highlighter"
                      ? "bg-[var(--accent)] text-[var(--surface)] font-medium border-[var(--accent)]"
                      : "bg-[var(--surface)] text-[var(--ink)] hover:bg-[var(--paper-subtle)]"
                  }`}
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="h-3 w-3">
                    <path d="M11.2 2.3l2.5 2.5-7.6 7.6-3.3.8.8-3.3 7.6-7.6zM9.8 3.7l2.5 2.5" />
                  </svg>
                  <span>{lang === "de" ? "Dekonstruierer" : "文本解构"}</span>
                </button>

                <button
                  type="button"
                  aria-pressed={pedagogyTool === "tangent"}
                  aria-controls="tutor-pedagogy-panel"
                  onClick={() => setPedagogyTool((t) => (t === "tangent" ? null : "tangent"))}
                  title={lang === "de" ? "Tangenten-Simulator öffnen (Differentialrechnung Δx → 0)" : "打开割线逼近切线沙盘 (导数几何直观)"}
                  className={`rounded-[var(--radius)] px-2 py-0.5 text-[var(--text-meta)] font-sans transition-colors cursor-pointer flex items-center gap-1 border border-[var(--line)] ${
                    pedagogyTool === "tangent"
                      ? "bg-[var(--accent)] text-[var(--surface)] font-medium border-[var(--accent)]"
                      : "bg-[var(--surface)] text-[var(--ink)] hover:bg-[var(--paper-subtle)]"
                  }`}
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="h-3 w-3">
                    <path d="M2 14L14 2M2 14h12M2 14V2" />
                  </svg>
                  <span>{lang === "de" ? "Tangenten-Sim" : "导数沙盘"}</span>
                </button>
              </div>
            </div>

            <button
              type="button"
              onClick={handleExportMarkdown}
              title={lang === "de" ? "Dialog als Markdown exportieren" : "导出当前对话为 Markdown"}
              className="rounded-[var(--radius)] border border-[var(--line)] bg-[var(--surface)] px-2 py-0.5 font-sans text-[var(--text-meta)] text-[var(--ink)] hover:border-[var(--accent)] hover:text-[var(--accent)] flex items-center gap-1 cursor-pointer"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="h-3 w-3 text-[var(--gray)]">
                <path d="M8 2v9M4.5 7.5L8 11l3.5-3.5M2.5 14h11" />
              </svg>
              <span aria-live="polite" aria-atomic="true">
                {copyFeedback ? (lang === "de" ? "Exportiert" : "已导出") : (lang === "de" ? "Export .md" : "导出 .md")}
              </span>
            </button>
          </div>
        </div>

        {/* Pädagogischer Lern-Werkzeugkasten (Collapsible Drawer) */}
        {pedagogyTool && (
          <div id="tutor-pedagogy-panel" className="tab-enter max-h-[500px] overflow-y-auto border-b border-[var(--line)] bg-[var(--paper-subtle)] p-3">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[var(--text-meta)] font-mono text-[var(--gray)] uppercase tracking-wider">
                {lang === "de" ? "Pädagogisches Werkzeug aktiv (Ergebnisse fließen direkt in den Chat ein):" : "无痛学习交互工具（生成句式可一键带入下方对话框）："}
              </span>
              <button
                type="button"
                onClick={() => setPedagogyTool(null)}
                className="inline-flex items-center gap-1 text-xs font-mono text-[var(--gray)] hover:text-[var(--ink)] cursor-pointer"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" aria-hidden="true">
                  <path d="M4 4l8 8M12 4l-8 8" />
                </svg>
                <span>{lang === "de" ? "Schließen" : "收起"}</span>
              </button>
            </div>

            {pedagogyTool === "lego" && (
              <SatzbauLego
                lang={lang}
                onSentenceComplete={(s) => setInput(s)}
                onJumpToFehlerlog={(incorrect) => {
                  setErrorMsg(`已记录该不匹配项：${incorrect}`);
                }}
              />
            )}

            {pedagogyTool === "balance" && (
              <BalanceBoard
                lang={lang}
                onUrteilGenerated={(u) => setInput(u)}
              />
            )}

            {pedagogyTool === "highlighter" && (
              <TextHighlighter
                lang={lang}
                onAnalysisGenerated={(a) => setInput(a)}
              />
            )}

            {pedagogyTool === "tangent" && (
              <TangentSlider
                lang={lang}
                onFormulaGenerated={(f) => setInput(f)}
              />
            )}
          </div>
        )}

        {!onOpenSettings && showAi && (
          <div className="border-b border-[var(--line)] bg-[var(--surface)] max-h-96 overflow-y-auto">
            <AiSettings
              lang={lang}
              onChanged={() => {
                setActiveEp(getActiveEndpoint());
                setEngineTag(describeActiveEngine());
              }}
            />
          </div>
        )}

        {/* Degraded State Notice */}
        {isDegraded && (
          <div role="status" aria-live="polite" aria-atomic="true" className="flex items-center justify-between border-b border-[var(--line)] border-l-2 border-l-[var(--warning)] bg-[var(--paper-subtle)] px-4 py-2 font-mono text-xs text-[var(--warning)]">
            <span className="flex items-center gap-1.5">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="h-3 w-3">
                <path d="M8 2.5L14 13H2L8 2.5zM8 6v3.5M8 11.5v.2" />
              </svg>
              <span>{lang === "de" ? "Auto-Dispatch: Lokales Modell offline · Antwort nativ aus Vault" : "自动调配：本地模型离线，已原生调用知识库考点"}</span>
            </span>
            <span className="text-[var(--text-meta)] text-[var(--gray)]">{engineTag}</span>
          </div>
        )}

        {/* Error state if occurred */}
        {errorMsg && (
          <div role="status" aria-live="polite" aria-atomic="true" className="flex items-center justify-between border-b border-[var(--line)] bg-[var(--warning)]/10 px-4 py-2 font-mono text-xs text-[var(--warning)]">
            <span>{errorMsg}</span>
            <button
              type="button"
              disabled={retryCountdown > 0}
              onClick={() => sendMessage(messages[messages.length - 1]?.text)}
              className="border border-[var(--warning)]/30 px-2 py-0.5 rounded-[var(--radius)] hover:bg-[var(--warning)]/10 disabled:opacity-50"
            >
              {retryCountdown > 0
                ? `Wiederholen (${retryCountdown}s)`
                : "Wiederholen / 重试"}
            </button>
          </div>
        )}

        {/* Dialog-Stream */}
        <div ref={scrollRef} aria-busy={isThinking} className="flex-1 space-y-4 overflow-y-auto p-4 sm:p-6 bg-[var(--paper)]">
          {messages.map((m) =>
            m.role === "ki" ? (
              <div
                key={m.id}
                className="max-w-[94%] rounded-[var(--radius)] border border-[var(--line)] bg-[var(--surface)] p-4 text-sm text-[var(--ink)] transition-colors"
              >
                <div className="text-[var(--text-meta)] font-mono uppercase tracking-wider text-[var(--gray)] mb-3 flex items-center justify-between border-b border-[var(--line)]/50 pb-2">
                  <div className="flex items-center gap-2">
                    <span className="font-sans font-medium text-[var(--accent)] flex items-center gap-1.5">
                      <span aria-hidden="true" className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]" />
                      KI-Tutor
                    </span>
                    <span aria-hidden="true" className="h-3 w-px bg-[var(--line)]" />
                    <span className="text-[var(--text-meta)] text-[var(--gray)]">Gymnasiale Oberstufe EF</span>
                  </div>
                  {m.engineTag && (
                    <span className="text-[var(--text-meta)] text-[var(--gray)] font-mono">{m.engineTag}</span>
                  )}
                </div>

                {/* Instant Grounding Card (<10ms) */}
                {m.instantSnippet && (
                  <div className="exam-reading mb-3 rounded-[var(--radius)] border border-[var(--accent)]/20 bg-[var(--paper-subtle)]/40 p-3 text-sm">
                    <div className="flex items-center justify-between text-[var(--text-meta)] font-mono text-[var(--accent)] mb-1">
                      <span className="flex items-center gap-1 font-sans">
                        <span aria-hidden="true" className="inline-block h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="h-3 w-3 text-[var(--accent)]">
                          <path d="M9.2 1.8L4.3 8.2h3.4l-.9 6 4.9-6.4H8.3l.9-6z" />
                        </svg>
                        <span>{lang === "de" ? "Vault-Sofortauszug" : "知识库瞬时定义"}</span>
                      </span>
                      <button
                        type="button"
                        onClick={() => onJumpToLibrary?.(m.instantSnippet!.notePath)}
                        className="underline hover:text-[var(--accent)] cursor-pointer text-xs"
                        title={lang === "de" ? "In Notizen öffnen" : "在笔记库中查看"}
                      >
                        [{m.instantSnippet.notePath}]
                      </button>
                    </div>
                    <p className="de-reading text-[var(--ink)] leading-relaxed">„{m.instantSnippet.excerpt}“</p>
                  </div>
                )}

                {/* AI Text Stream */}
                <div className="de-reading text-[15px] leading-relaxed text-[var(--ink)]">
                  {renderAiText(m.text)}
                </div>

                {/* Fachübergreifende Vernetzung (Cross-Subject Thought Bridge Capsule) */}
                {m.vernetzungBridge && (
                  <div className="mt-3.5 rounded-[var(--radius)] border border-[var(--success)]/25 bg-[var(--paper-subtle)]/30 p-3 text-xs font-sans">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5 text-[var(--success)] font-medium text-xs">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="h-3.5 w-3.5 text-[var(--success)]">
                          <path d="M6.5 9.5l3-3M5 11l-1.5 1.5a2.121 2.121 0 0 1-3-3L2 8a2.121 2.121 0 0 1 3-3h1M11 5l1.5-1.5a2.121 2.121 0 0 1 3 3L14 8a2.121 2.121 0 0 1-3 3h-1" />
                        </svg>
                        <span>{lang === "de" ? "Fachübergreifende Vernetzung:" : "跨学科思维桥:"}</span>
                        <span className="font-semibold text-[var(--success)]">{m.vernetzungBridge.badgeLabel}</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => onJumpToLibrary?.(m.vernetzungBridge!.targetNotePath)}
                        className="text-xs font-mono text-[var(--success)] hover:underline cursor-pointer flex items-center gap-0.5"
                        title={lang === "de" ? "In Notizen öffnen" : "在笔记库中查看"}
                      >
                        <span>[{m.vernetzungBridge.targetSubject}]</span>
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="h-3 w-3">
                          <path d="M6 3.5L10.5 8 6 12.5" />
                        </svg>
                      </button>
                    </div>
                    <div className="mt-1.5 flex flex-col gap-1 border-t border-[var(--line)]/50 pt-1.5 text-sm">
                      <div className="de-reading text-[var(--ink)]">„{m.vernetzungBridge.anchorFormulaOrSentenceDE}“</div>
                      <div className="zh-translation">{m.vernetzungBridge.anchorSentenceZH}</div>
                    </div>
                  </div>
                )}

                {/* In Fehlerlog erfassen */}
                {m.text && !m.isError && (
                  <div className="mt-3 pt-2 border-t border-[var(--line)]/50 flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => handleCaptureFehler(m)}
                      title={lang === "de" ? "Diesen Turn als Fehlerlog-Eintrag erfassen" : "提炼并沉淀为对应学科的错题补丁"}
                      className="inline-flex items-center gap-1.5 text-xs font-sans text-[var(--gray)] hover:text-[var(--warning)] hover:bg-[var(--warning)]/10 px-2.5 py-1 rounded-[var(--radius)] transition-colors cursor-pointer"
                    >
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="h-3.5 w-3.5 text-[var(--warning)]">
                        <path d="M4 2.5h8v11l-4-2.7-4 2.7v-11z" />
                      </svg>
                      <span>{lang === "de" ? "In Fehlerlog erfassen" : "沉淀为错题"}</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div
                key={m.id}
                className="ml-auto max-w-[85%] rounded-[var(--radius)] bg-[var(--surface)] border border-[var(--line)] p-4 text-sm font-sans text-[var(--ink)]"
              >
                <div className="text-[var(--text-meta)] font-mono uppercase tracking-wider text-[var(--gray)] mb-1.5 flex items-center justify-between">
                  <span className="font-sans font-medium text-[var(--ink)]">Du / 你</span>
                  <span>{new Date(m.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</span>
                </div>
                {m.imageUrl && (
                  <div className="mb-2.5 max-w-[240px] rounded-[var(--radius)] overflow-hidden border border-[var(--line)]">
                    <img src={m.imageUrl} alt="Bildanhang" className="w-full h-auto object-cover max-h-48" />
                  </div>
                )}
                <p className="leading-relaxed whitespace-pre-wrap">{m.text}</p>
              </div>
            )
          )}

          {isThinking && (
            <div role="status" aria-live="polite" aria-atomic="true" className="flex items-center gap-2 border-l-2 border-[var(--accent)]/40 py-1 pl-3.5 font-mono text-xs text-[var(--gray)]">
              <span aria-hidden="true" className="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-[var(--accent)]" />
              <span>
                {localPct !== null
                  ? `Lokal-Modell lädt: ${Math.round(localPct * 100)}%`
                  : lang === "de"
                  ? "Denkt nach (Streaming)..."
                  : "思考中 (实时流式)..."}
              </span>
            </div>
          )}
        </div>

        {/* Eingabebereich */}
        <div className="border-t border-[var(--line)] bg-[var(--paper-subtle)] p-3">
          {/* Bild-Vorschau vor Absenden */}
          {attachedImage && (
            <div className="mb-2 flex items-center gap-2 bg-[var(--surface)] border border-[var(--line)] px-2.5 py-1 rounded-[var(--radius)] w-fit max-w-full">
              <img
                src={attachedImage.dataUrl}
                alt="Vorschau"
                className="w-7 h-7 object-cover rounded-[var(--radius)] border border-[var(--line)]"
              />
              <span className="text-xs font-mono text-[var(--ink)] truncate max-w-[180px]">
                {attachedImage.name}
              </span>
              <span className="text-[var(--text-meta)] font-mono text-[var(--gray)]">
                ({attachedImage.sizeKb} KB)
              </span>
              <button
                type="button"
                onClick={() => setAttachedImage(null)}
                className="text-xs text-[var(--gray)] hover:text-[var(--warning)] ml-1 cursor-pointer font-bold"
                title="Bild entfernen"
                aria-label="Bild entfernen"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" aria-hidden="true">
                  <path d="M4 4l8 8M12 4l-8 8" />
                </svg>
              </button>
            </div>
          )}

          <form
            onSubmit={(e) => {
              e.preventDefault();
              sendMessage();
            }}
            className="flex items-center gap-2"
          >
            {/* Bild hochladen */}
            <input
              type="file"
              ref={fileInputRef}
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) handleImageFile(file);
                e.target.value = "";
              }}
            />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              title={
                lang === "de"
                  ? "Bild / Karikatur / Diagramm anhängen (oder mit Strg+V einfügen)"
                  : "添加图片 / 政治漫画 / 图表（支持 Ctrl+V 粘贴）"
              }
              aria-label={lang === "de" ? "Bild anhängen" : "添加图片"}
              className="p-2 rounded-[var(--radius)] border border-[var(--line)] bg-[var(--surface)] text-[var(--gray)] hover:text-[var(--accent)] hover:border-[var(--accent)] transition-colors cursor-pointer flex items-center justify-center flex-shrink-0"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <rect x="2" y="3" width="12" height="10" rx="1" />
                <circle cx="5.5" cy="6.5" r="1" />
                <path d="M3 11l3-3 2.5 2.5 2-2L14 11" />
              </svg>
            </button>

            <input
              type="text"
              aria-label={lang === "de" ? "Frage an den KI-Tutor" : "向 AI 助教提问"}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onPaste={handlePaste}
              placeholder={
                lang === "de"
                  ? "Frage an den KI-Tutor (z.B. Was ist soziale Ungleichheit?)..."
                  : "向 AI 助教提问 (如：什么是社会不平等？)..."
              }
              disabled={isThinking}
              className="flex-1 rounded-[var(--radius)] border border-[var(--line)] bg-[var(--surface)] px-3 py-2 font-sans text-sm text-[var(--ink)] placeholder-[var(--gray)] focus:border-[var(--focus)]"
            />
            <button
              type="submit"
              disabled={isThinking || (!input.trim() && !attachedImage)}
              className="rounded-[var(--radius)] bg-[var(--ink)] px-4 py-2 text-sm font-sans text-[var(--paper)] hover:bg-[var(--accent)] disabled:opacity-40 transition-colors cursor-pointer flex-shrink-0"
            >
              {lang === "de" ? "Senden" : "发送"}
            </button>
          </form>
          <div className="mt-1.5 flex items-center justify-between text-[var(--text-meta)] font-mono text-[var(--gray)]">
            <span>
              {lang === "de" ? "Antworten sind zitierpflichtig und stützen sich auf deinen Vault." : "助教严格遵守考纲引用规范，断言均带知识库出处。"}
            </span>
            <span className="flex items-center gap-2">
              <span>{INTENSITY_PRESETS[intensity].labelDE}</span>
              <span aria-hidden="true" className="h-3 w-px bg-[var(--line)]" />
              <span>
                {activeEp?.baseUrl && !activeEp.baseUrl.includes("localhost") && !activeEp.baseUrl.includes("127.0.0.1")
                  ? `${activeEp.name} · 云端 API`
                  : "100% Lokal & Privat"}
              </span>
            </span>
          </div>
        </div>
      </main>

      {/* Fehlerlog-Modal */}
      {fehlerDraft && (
        <FehlerlogModal
          draft={fehlerDraft}
          onClose={() => setFehlerDraft(null)}
          lang={lang === "de" ? "de" : "zh"}
        />
      )}


      {/* CCR (Compress-Cache-Retrieve) Unkomprimierte Originalansicht */}
      {expandedCcr && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-[var(--overlay)] p-4"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setExpandedCcr(null);
          }}
        >
          <div
            ref={ccrDialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="ccr-dialog-title"
            tabIndex={-1}
            className="flex max-h-[80vh] w-full max-w-xl flex-col rounded-[var(--radius)] border border-[var(--line)] bg-[var(--surface)] p-5"
          >
            <div className="flex items-center justify-between border-b border-[var(--line)] pb-2 mb-3">
            <div className="flex min-w-0 flex-wrap items-center gap-2">
                <span aria-hidden="true" className="h-2 w-2 rounded-full bg-[var(--success)]" />
                <h4 id="ccr-dialog-title" className="font-mono text-xs font-semibold text-[var(--ink)]">
                  CCR #{expandedCcr.hash} (
                  {lang === "de" ? "Originaltext vor Kompression" : "无损还原原文"}
                  )
                </h4>
              </div>
              <button
                type="button"
                data-dialog-initial-focus
                onClick={() => setExpandedCcr(null)}
                className="inline-flex items-center gap-1 text-xs font-mono text-[var(--gray)] hover:text-[var(--ink)] px-2 py-0.5 border border-[var(--line)] rounded-[var(--radius)] cursor-pointer"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" aria-hidden="true">
                  <path d="M4 4l8 8M12 4l-8 8" />
                </svg>
                <span>{lang === "de" ? "Schließen" : "关闭"}</span>
              </button>
            </div>
            <div className="exam-reading flex-1 overflow-y-auto whitespace-pre-wrap rounded-[var(--radius)] border border-[var(--line)] bg-[var(--surface)] p-3 font-mono text-xs leading-relaxed text-[var(--ink)]">
              {expandedCcr.content ?? (lang === "de" ? "Eintrag nicht mehr im CCR-Speicher." : "条目已过期或不存在。")}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
