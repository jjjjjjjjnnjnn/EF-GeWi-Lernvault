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
  const [pedagogyTool, setPedagogyTool] = useState<"lego" | "balance" | "highlighter" | null>(null);

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
            id: "welcome",
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
            id: "welcome",
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
        id: "welcome",
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
        id: "welcome",
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
        id: "welcome",
        sessionId: fresh.id,
        role: "ki",
        text: welcomeText,
        timestamp: Date.now(),
      },
    ];
    setMessages(initMsgs);
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
        lines.push(`### 👤 Frage: ${m.text}\n`);
      } else {
        if (m.instantSnippet) {
          lines.push(`> ⚡ [${m.instantSnippet.notePath}] ${m.instantSnippet.thema}: ${m.instantSnippet.excerpt}\n`);
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
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, isThinking]);

  // Retry-Countdown
  useEffect(() => {
    if (retryCountdown <= 0) return;
    const tId = setTimeout(() => setRetryCountdown((c) => c - 1), 1000);
    return () => clearTimeout(tId);
  }, [retryCountdown]);

  // Nachricht senden mit Zero-Perceived Latency
  const sendMessage = async (retryContent?: string) => {
    const q = (retryContent ?? input).trim();
    if (!q || isThinking || !currentSessionId) return;

    if (!retryContent) {
      setInput("");
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
    if (cachedReply) {
      setIsThinking(false);
      const finalBot: TutorChatMessage = {
        ...initialBotMsg,
        text: cachedReply,
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

    try {
      const rawHistory: ChatMsg[] = messages
        .filter((m) => {
          if (m.isError) return false;
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

      const optimized = await assembleOptimizedContext(chunks, rawHistory, {
        query: q,
        maxContextTokens: 3000,
        generationReserve: INTENSITY_PRESETS[intensity].maxTokens,
        systemReserve: 400,
        intensityModifier: INTENSITY_PRESETS[intensity].systemModifierDE,
      });

      const history: ChatMsg[] = optimized.messages;

      // 4. SCHRITT: Auto-Dispatch Stream (automatischer Failover bei offline LM Studio)
      const res = await autoDispatchChat(
        history,
        q,
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
      };

      const finalMessages = [...messages, userMsg, finalBot];
      setMessages(finalMessages);
      setIsDegraded(res.source === "vault-autofallback");
      setEngineTag(fullEngineTag);
      await saveSessionMessages(currentSessionId, finalMessages);
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
      <div className="space-y-2">
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
                  key={`cite-${lIdx}-${match.index}`}
                  onClick={() => onJumpToLibrary?.(citeTarget)}
                  title={lang === "de" ? "In Notizen öffnen" : "在笔记库中查看"}
                  className="inline-flex items-center font-mono text-[10px] text-[#4338CA] bg-[#4338CA]/10 hover:bg-[#4338CA]/20 px-1 py-0.5 rounded-sm mx-1 transition-colors cursor-pointer"
                >
                  [{citeTarget}]
                </button>
              );
            } else if (match[3]) {
              // CCR-Referenz [Ref: #h-a1b2c3d4]
              const ccrHash = match[3];
              parts.push(
                <button
                  key={`ccr-${lIdx}-${match.index}`}
                  onClick={() => handleExpandCcr(ccrHash)}
                  title={lang === "de" ? `CCR-Original (${ccrHash}) anzeigen` : `展开查看 CCR 无损压缩前原文 (#${ccrHash})`}
                  className="inline-flex items-center gap-1 font-mono text-[10px] text-[#047857] bg-[#047857]/10 hover:bg-[#047857]/20 px-1.5 py-0.5 rounded-sm mx-1 transition-colors cursor-pointer"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#047857]" />
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

  const sessionGroups = useMemo(() => {
    return groupSessionsByDate(sessions, lang);
  }, [sessions, lang]);

  return (
    <div className="mx-auto flex h-[78vh] max-w-5xl rounded-sm border border-[#E5E1D8] bg-white overflow-hidden shadow-xs">
      {/* Linke Spalte: Sitzungs-Verlauf / Multi-Session Sidebar */}
      {showSidebar && (
        <aside className="w-60 flex-shrink-0 flex flex-col border-r border-[#E5E1D8] bg-[#FAF9F6]">
          {/* Neuer Chat Button */}
          <div className="p-2.5 border-b border-[#E5E1D8]">
            <button
              onClick={handleNewChat}
              disabled={isThinking}
              className="w-full flex items-center justify-center gap-1.5 rounded-sm border border-[#E5E1D8] bg-white px-3 py-1.5 font-sans text-xs font-medium text-[#1C1B17] hover:border-[#4338CA] hover:text-[#4338CA] transition-colors disabled:opacity-50"
            >
              <span>+</span>
              <span>{lang === "de" ? "Neuer Chat" : "新建对话"}</span>
            </button>
          </div>

          {/* Sitzungsliste nach Datum gruppiert */}
          <div className="flex-1 overflow-y-auto p-1.5 space-y-3">
            {sessionGroups.map((grp) => (
              <div key={grp.group} className="space-y-0.5">
                <div className="px-2 py-1 font-mono text-[10px] uppercase tracking-wider text-[#6B675C]">
                  {grp.group}
                </div>
                {grp.items.map((sess) => {
                  const isActive = sess.id === currentSessionId;
                  const isEditing = sess.id === editingSessionId;

                  return (
                    <div
                      key={sess.id}
                      onClick={() => !isEditing && switchSession(sess.id)}
                      className={`group relative flex items-center justify-between rounded-sm px-2.5 py-2 text-xs transition-colors cursor-pointer ${
                        isActive
                          ? "bg-white border-l-2 border-[#4338CA] font-medium text-[#1C1B17] shadow-xs"
                          : "text-[#4A473F] hover:bg-[#F2EFE9] border-l-2 border-transparent"
                      }`}
                    >
                      {isEditing ? (
                        <div className="flex items-center gap-1 w-full" onClick={(e) => e.stopPropagation()}>
                          <input
                            type="text"
                            autoFocus
                            value={editTitleInput}
                            onChange={(e) => setEditTitleInput(e.target.value)}
                            onKeyDown={(e) => {
                              if (e.key === "Enter") handleSaveRename(sess.id);
                              if (e.key === "Escape") setEditingSessionId(null);
                            }}
                            className="w-full text-xs px-1 py-0.5 border border-[#4338CA] rounded-sm bg-white"
                          />
                          <button
                            onClick={() => handleSaveRename(sess.id)}
                            className="text-[10px] text-[#2E7D32] hover:underline"
                          >
                            ✓
                          </button>
                        </div>
                      ) : (
                        <>
                          <div className="flex items-center gap-1.5 truncate pr-1">
                            {sess.pinned && <span className="text-[10px]">📌</span>}
                            <span className="truncate font-serif">{sess.title}</span>
                          </div>

                          {/* Hover-Aktionen: Umbenennen & Löschen */}
                          <div className="opacity-0 group-hover:opacity-100 flex items-center gap-1 transition-opacity">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setEditingSessionId(sess.id);
                                setEditTitleInput(sess.title);
                              }}
                              title={lang === "de" ? "Umbenennen" : "重命名"}
                              className="text-[#6B675C] hover:text-[#1C1B17] p-0.5"
                            >
                              ✏️
                            </button>
                            <button
                              onClick={(e) => handleDeleteSession(sess.id, e)}
                              title={lang === "de" ? "Löschen" : "删除"}
                              className="text-[#6B675C] hover:text-[#991B1B] p-0.5"
                            >
                              ✕
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
          <div className="p-2 border-t border-[#E5E1D8] flex items-center justify-between text-[11px] font-mono text-[#6B675C]">
            <span>{sessions.length} {lang === "de" ? "Chats" : "个对话"}</span>
            <button
              onClick={handleClearAll}
              className="text-[#991B1B] hover:underline text-[10px]"
            >
              {lang === "de" ? "Verlauf leeren" : "清空历史"}
            </button>
          </div>
        </aside>
      )}

      {/* Rechte Spalte: Haupt-Chatbereich */}
      <main className="flex-1 flex flex-col min-w-0 bg-white">
        {/* Model status bar & Intensity Switcher */}
        <div className="flex flex-wrap items-center justify-between border-b border-[#E5E1D8] bg-[#FAF9F6] px-3 py-2 text-xs font-mono text-[#6B675C] gap-2">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowSidebar((s) => !s)}
              title={showSidebar ? (lang === "de" ? "Sidebar verbergen" : "折叠侧栏") : (lang === "de" ? "Sidebar zeigen" : "展开侧栏")}
              className="p-1 rounded-sm border border-[#E5E1D8] bg-white text-[#1C1B17] hover:border-[#4338CA] hover:text-[#4338CA]"
            >
              ☰
            </button>
            <span
              className={`h-2 w-2 rounded-full ${
                isDegraded ? "bg-[#B45309]" : "bg-[#10B981]"
              }`}
            />
            <span className="truncate max-w-[260px] flex items-center gap-1.5 font-sans">
              <span className="font-medium text-[#1C1B17]">
                {isDegraded ? "Auto-Dispatch · Vault" : activeEp.name}
              </span>
              {!isDegraded && (
                <span className="text-[10px] font-mono text-[#4338CA] bg-[#EEF2FF] border border-[#C7D2FE] px-1 py-0.2 rounded-xs truncate max-w-[120px]">
                  {activeEp.model.split("/").pop()}
                </span>
              )}
            </span>
          </div>

          {/* Denkintensitäts-Auswahl (Schnell | Ausgewogen | Tiefgründig) */}
          <div className="flex items-center gap-1 border border-[#E5E1D8] rounded-sm bg-white p-0.5">
            {(["fast", "balanced", "deep"] as ThinkingIntensity[]).map((st) => (
              <button
                key={st}
                onClick={() => {
                  setIntensity(st);
                  saveThinkingIntensity(st);
                }}
                className={`px-2 py-0.5 rounded-xs text-[11px] font-sans transition-colors ${
                  intensity === st
                    ? "bg-[#1C1B17] text-[#FAFAF7]"
                    : "text-[#6B675C] hover:text-[#1C1B17]"
                }`}
                title={INTENSITY_PRESETS[st].systemModifierDE}
              >
                {lang === "de" ? INTENSITY_PRESETS[st].labelDE : INTENSITY_PRESETS[st].labelZH}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            {/* 无痛学习交互工具箱 (Satzbau-Lego / Balance / Highlighter) */}
            <div className="flex items-center gap-1 border border-[#E5E1D8] rounded-sm bg-white p-0.5">
              <button
                type="button"
                onClick={() => setPedagogyTool((t) => (t === "lego" ? null : "lego"))}
                title={lang === "de" ? "Satzbau-Lego öffnen" : "打开句式积木 (Satzbau-Lego)"}
                className={`rounded-xs px-2 py-0.5 text-[11px] font-sans transition-all cursor-pointer flex items-center gap-1 ${
                  pedagogyTool === "lego"
                    ? "bg-[#4338CA] text-white font-medium"
                    : "text-[#1C1B17] hover:bg-[#FAF9F6]"
                }`}
              >
                <svg className="w-3 h-3" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6">
                  <rect x="2" y="5" width="12" height="9" rx="1" />
                  <circle cx="5" cy="3" r="1.5" />
                  <circle cx="11" cy="3" r="1.5" />
                </svg>
                <span>{lang === "de" ? "Satzbau-Lego" : "句式积木"}</span>
              </button>

              <button
                type="button"
                onClick={() => setPedagogyTool((t) => (t === "balance" ? null : "balance"))}
                title={lang === "de" ? "Dialektische Waage öffnen" : "打开辩证天平 (Urteils-Waage)"}
                className={`rounded-xs px-2 py-0.5 text-[11px] font-sans transition-all cursor-pointer flex items-center gap-1 ${
                  pedagogyTool === "balance"
                    ? "bg-[#047857] text-white font-medium"
                    : "text-[#1C1B17] hover:bg-[#FAF9F6]"
                }`}
              >
                <svg className="w-3 h-3" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6">
                  <path d="M8 2v12M3 14h10M4 6l4-2 4 2M4 6l-2 5h4l-2-5M12 6l-2 5h4l-2-5" />
                </svg>
                <span>{lang === "de" ? "Urteils-Waage" : "辩证天平"}</span>
              </button>

              <button
                type="button"
                onClick={() => setPedagogyTool((t) => (t === "highlighter" ? null : "highlighter"))}
                title={lang === "de" ? "Text-Dekonstruierer öffnen" : "打开荧光标注解构画板"}
                className={`rounded-xs px-2 py-0.5 text-[11px] font-sans transition-all cursor-pointer flex items-center gap-1 ${
                  pedagogyTool === "highlighter"
                    ? "bg-[#BE185D] text-white font-medium"
                    : "text-[#1C1B17] hover:bg-[#FAF9F6]"
                }`}
              >
                <svg className="w-3 h-3" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6">
                  <path d="M11 2l3 3-8 8H3v-3l8-8zM9 4l3 3" />
                </svg>
                <span>{lang === "de" ? "Dekonstruierer" : "文本解构"}</span>
              </button>
            </div>

            <button
              onClick={handleExportMarkdown}
              title={lang === "de" ? "Dialog als Markdown exportieren" : "导出当前对话为 Markdown"}
              className="rounded-sm border border-[#E5E1D8] bg-white px-2 py-0.5 font-sans text-[11px] text-[#1C1B17] hover:border-[#4338CA] hover:text-[#4338CA]"
            >
              {copyFeedback ? (lang === "de" ? "✓ Exportiert" : "✓ 已导出") : (lang === "de" ? "Export .md" : "导出 .md")}
            </button>
            <button
              onClick={() => {
                if (onOpenSettings) {
                  onOpenSettings();
                } else {
                  setShowAi((s) => !s);
                }
              }}
              title={lang === "de" ? "Zu den vollständigen KI-Einstellungen (Modelle, Endpunkte)" : "跳转到设置页面配置端点与模型"}
              className="rounded-sm border border-[#E5E1D8] bg-white px-2.5 py-0.5 font-sans text-[11px] text-[#4338CA] hover:border-[#4338CA] hover:bg-[#EEF2FF] flex items-center gap-1 cursor-pointer transition-colors"
            >
              <svg className="w-3 h-3" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                <circle cx="8" cy="8" r="2.2" />
                <path d="M8 1.6v2.1M8 12.3v2.1M1.6 8h2.1M12.3 8h2.1M3.5 3.5l1.5 1.5M11 11l1.5 1.5M12.5 3.5L11 5M5 11l-1.5 1.5" />
              </svg>
              <span>{lang === "de" ? "KI-Einstellungen" : "配置端点与模型"}</span>
            </button>
          </div>
        </div>

        {/* Pädagogischer Lern-Werkzeugkasten (Collapsible Drawer) */}
        {pedagogyTool && (
          <div className="border-b border-[#E5E1D8] bg-[#FAF9F6] p-3 max-h-[500px] overflow-y-auto animate-in slide-in-from-top-2 duration-150">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-mono text-[#6B675C] uppercase tracking-wider">
                {lang === "de" ? "Pädagogisches Werkzeug aktiv (Ergebnisse fließen direkt in den Chat ein):" : "无痛学习交互工具（生成句式可一键带入下方对话框）："}
              </span>
              <button
                type="button"
                onClick={() => setPedagogyTool(null)}
                className="text-xs font-mono text-[#6B675C] hover:text-[#1C1B17] cursor-pointer"
              >
                ✕ {lang === "de" ? "Schließen" : "收起"}
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
          </div>
        )}

        {!onOpenSettings && showAi && (
          <div className="border-b border-[#E5E1D8] bg-white shadow-xs max-h-96 overflow-y-auto">
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
          <div className="border-b border-[#E5E1D8] border-l-2 border-[#B45309] bg-[#FAF9F6] px-4 py-2 text-xs font-mono text-[#B45309] flex items-center justify-between">
            <span>⚡ {lang === "de" ? "Auto-Dispatch: Lokales Modell offline · Antwort nativ aus Vault" : "自动调配：本地模型离线，已原生调用知识库考点"}</span>
            <span className="text-[10px] text-[#6B675C]">{engineTag}</span>
          </div>
        )}

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

        {/* Dialog-Stream */}
        <div ref={scrollRef} className="flex-1 space-y-4 overflow-y-auto p-4 sm:p-5">
          {messages.map((m) =>
            m.role === "ki" ? (
              <div
                key={m.id}
                className="max-w-[94%] border-l-2 border-[#4338CA] pl-3.5 py-1 text-sm font-serif text-[#1C1B17]"
              >
                <div className="text-[10px] font-mono uppercase tracking-wider text-[#6B675C] mb-1.5 flex items-center gap-2">
                  <span>KI-Tutor</span>
                  <span className="text-[#E5E1D8]">·</span>
                  <span className="text-[9px] text-[#4338CA]">Oberstufe EF</span>
                  {m.engineTag && (
                    <>
                      <span className="text-[#E5E1D8]">·</span>
                      <span className="text-[9px] text-[#6B675C]">{m.engineTag}</span>
                    </>
                  )}
                </div>

                {/* ⚡ Instant Grounding Card (<10ms) */}
                {m.instantSnippet && (
                  <div className="mb-2.5 rounded-sm border border-[#C7D2FE] bg-[#F5F7FF] px-3 py-2 text-xs font-serif">
                    <div className="flex items-center justify-between text-[10px] font-mono text-[#4338CA] mb-1">
                      <span className="flex items-center gap-1 font-sans">
                        <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#4338CA]" />
                        ⚡ {lang === "de" ? "Vault-Sofortauszug" : "知识库瞬时定义"}
                      </span>
                      <button
                        onClick={() => onJumpToLibrary?.(m.instantSnippet!.notePath)}
                        className="underline hover:text-[#312E81] cursor-pointer"
                        title={lang === "de" ? "In Notizen öffnen" : "在笔记库中查看"}
                      >
                        [{m.instantSnippet.notePath}]
                      </button>
                    </div>
                    <p className="text-[#1E1B4B] italic">„{m.instantSnippet.excerpt}“</p>
                  </div>
                )}

                {/* AI Text Stream */}
                {renderAiText(m.text)}
              </div>
            ) : (
              <div
                key={m.id}
                className="ml-auto max-w-[85%] rounded-sm bg-[#FAF9F6] border border-[#E5E1D8] px-3.5 py-2.5 text-sm font-sans text-[#1C1B17]"
              >
                <div className="text-[10px] font-mono uppercase tracking-wider text-[#6B675C] mb-1">
                  Du / 你
                </div>
                <p className="leading-relaxed whitespace-pre-wrap">{m.text}</p>
              </div>
            )
          )}

          {isThinking && (
            <div className="border-l-2 border-[#4338CA]/40 pl-3.5 py-1 text-xs font-mono text-[#6B675C] flex items-center gap-2">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#4338CA] animate-pulse" />
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
        <div className="border-t border-[#E5E1D8] bg-[#FAF9F6] p-3">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              sendMessage();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={
                lang === "de"
                  ? "Frage an den KI-Tutor (z.B. Was ist soziale Ungleichheit?)..."
                  : "向 AI 助教提问 (如：什么是社会不平等？)..."
              }
              disabled={isThinking}
              className="flex-1 rounded-sm border border-[#E5E1D8] bg-white px-3 py-2 text-sm font-sans text-[#1C1B17] placeholder-[#6B675C] focus:border-[#4338CA] focus:outline-none"
            />
            <button
              type="submit"
              disabled={isThinking || !input.trim()}
              className="rounded-sm bg-[#1C1B17] px-4 py-2 text-sm font-sans text-[#FAFAF7] hover:bg-[#4338CA] disabled:opacity-40 transition-colors cursor-pointer"
            >
              {lang === "de" ? "Senden" : "发送"}
            </button>
          </form>
          <div className="mt-1.5 flex items-center justify-between text-[10px] font-mono text-[#6B675C]">
            <span>
              {lang === "de" ? "Antworten sind zitierpflichtig und stützen sich auf deinen Vault." : "助教严格遵守考纲引用规范，断言均带知识库出处。"}
            </span>
            <span className="flex items-center gap-2">
              <span>{INTENSITY_PRESETS[intensity].labelDE}</span>
              <span>·</span>
              <span>
                {activeEp?.baseUrl && !activeEp.baseUrl.includes("localhost") && !activeEp.baseUrl.includes("127.0.0.1")
                  ? `${activeEp.name} · 云端 API`
                  : "100% Lokal & Privat"}
              </span>
            </span>
          </div>
        </div>
      </main>

      {/* CCR (Compress-Cache-Retrieve) Unkomprimierte Originalansicht */}
      {expandedCcr && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-xl rounded-sm border border-[#E5E1D8] bg-[#FAFAF7] p-5 shadow-lg max-h-[80vh] flex flex-col">
            <div className="flex items-center justify-between border-b border-[#E5E1D8] pb-2 mb-3">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#047857]" />
                <h4 className="font-mono text-xs font-semibold text-[#1C1B17]">
                  CCR #{expandedCcr.hash} (
                  {lang === "de" ? "Originaltext vor Kompression" : "无损还原原文"}
                  )
                </h4>
              </div>
              <button
                onClick={() => setExpandedCcr(null)}
                className="text-xs font-mono text-[#6B675C] hover:text-[#1C1B17] px-2 py-0.5 border border-[#E5E1D8] rounded-xs cursor-pointer"
              >
                {lang === "de" ? "Schließen ✕" : "关闭 ✕"}
              </button>
            </div>
            <div className="flex-1 overflow-y-auto text-xs font-mono whitespace-pre-wrap text-[#1C1B17] bg-white border border-[#E5E1D8] p-3 rounded-sm leading-relaxed">
              {expandedCcr.content ?? (lang === "de" ? "Eintrag nicht mehr im CCR-Speicher." : "条目已过期或不存在。")}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
