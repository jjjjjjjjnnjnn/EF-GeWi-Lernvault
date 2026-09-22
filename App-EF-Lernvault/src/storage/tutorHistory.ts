// Vollständige lokale IndexedDB-Persistenz für KI-Tutor-Sitzungen und Nachrichten (Phase 5).
// 100% lokal, offline-first, keine externen Datenübertragungen.
// Unterstützt: Multi-Session, Zeitgruppierung (Heute/Gestern/Früher), Umbenennung, Löschung und Export.


export interface TutorSession {
  id: string;               // z.B. "sess_1727038..."
  title: string;            // Titel (automatisch aus 1. Frage oder benutzerdefiniert)
  createdAt: number;
  updatedAt: number;
  pinned?: boolean;
  messageCount: number;
}

export interface InstantSnippet {
  notePath: string;
  thema: string;
  excerpt: string;
}

export interface TutorChatMessage {
  id: string;
  sessionId: string;
  role: "ki" | "du";
  text: string;
  timestamp: number;
  isError?: boolean;
  instantSnippet?: InstantSnippet;
  engineTag?: string;
}

const STORE_SESSIONS = "tutor_sessions";
const STORE_MESSAGES = "tutor_messages";

// Memory-Fallback falls IndexedDB nicht verfügbar ist (z.B. in bestimmten Testläufern)
const memSessions = new Map<string, TutorSession>();
const memMessages = new Map<string, TutorChatMessage[]>();

let dbReadyPromise: Promise<boolean> | null = null;

async function ensureStores(): Promise<boolean> {
  if (typeof indexedDB === "undefined" || !indexedDB) return false;
  if (dbReadyPromise) return dbReadyPromise;

  dbReadyPromise = new Promise((resolve) => {
    try {
      // Höhere Version oder eigenständige DB für Tutor-Verlauf
      const req = indexedDB.open("eflernvault_tutor_db", 1);
      req.onupgradeneeded = (e) => {
        const db = (e.target as IDBOpenDBRequest).result;
        if (!db.objectStoreNames.contains(STORE_SESSIONS)) {
          const sStore = db.createObjectStore(STORE_SESSIONS, { keyPath: "id" });
          sStore.createIndex("updatedAt", "updatedAt", { unique: false });
        }
        if (!db.objectStoreNames.contains(STORE_MESSAGES)) {
          const mStore = db.createObjectStore(STORE_MESSAGES, { keyPath: "id" });
          mStore.createIndex("sessionId", "sessionId", { unique: false });
        }
      };
      req.onsuccess = () => resolve(true);
      req.onerror = () => resolve(false);
    } catch {
      resolve(false);
    }
  });

  return dbReadyPromise;
}

function getTutorDb(): Promise<IDBDatabase | null> {
  return new Promise((resolve) => {
    try {
      const req = indexedDB.open("eflernvault_tutor_db", 1);
      req.onsuccess = () => resolve(req.result);
      req.onerror = () => resolve(null);
    } catch {
      resolve(null);
    }
  });
}

/**
 * Lädt alle gespeicherten Sitzungen, sortiert nach Aktualisierungszeit (neueste zuerst).
 */
export async function loadSessions(): Promise<TutorSession[]> {
  const ok = await ensureStores();
  if (!ok) {
    return Array.from(memSessions.values()).sort((a, b) => b.updatedAt - a.updatedAt);
  }

  const db = await getTutorDb();
  if (!db) return Array.from(memSessions.values()).sort((a, b) => b.updatedAt - a.updatedAt);

  return new Promise((resolve) => {
    try {
      const tx = db.transaction(STORE_SESSIONS, "readonly");
      const store = tx.objectStore(STORE_SESSIONS);
      const req = store.getAll();
      req.onsuccess = () => {
        const list = (req.result as TutorSession[]) || [];
        list.sort((a, b) => {
          if (a.pinned && !b.pinned) return -1;
          if (!a.pinned && b.pinned) return 1;
          return b.updatedAt - a.updatedAt;
        });
        resolve(list);
      };
      req.onerror = () => resolve(Array.from(memSessions.values()));
    } catch {
      resolve(Array.from(memSessions.values()));
    }
  });
}

/**
 * Erstellt eine neue leere oder mit erster Frage initialisierte Sitzung.
 */
export async function createSession(firstQuery?: string): Promise<TutorSession> {
  const now = Date.now();
  let title = "Neue Unterhaltung";
  if (firstQuery && firstQuery.trim()) {
    const clean = firstQuery.trim().replace(/^Was ist\s+/i, "").replace(/^Erkläre\s+/i, "");
    title = clean.length > 28 ? `${clean.slice(0, 26)}…` : clean;
  }

  const session: TutorSession = {
    id: `sess_${now}_${Math.random().toString(36).substring(2, 7)}`,
    title,
    createdAt: now,
    updatedAt: now,
    messageCount: 0,
  };

  memSessions.set(session.id, session);
  memMessages.set(session.id, []);

  const ok = await ensureStores();
  if (ok) {
    const db = await getTutorDb();
    if (db) {
      try {
        const tx = db.transaction(STORE_SESSIONS, "readwrite");
        tx.objectStore(STORE_SESSIONS).put(session);
      } catch {
        // Ignorieren
      }
    }
  }

  return session;
}

/**
 * Aktualisiert eine Sitzung (z.B. Titel, updatedAt, messageCount).
 */
export async function updateSession(session: TutorSession): Promise<void> {
  memSessions.set(session.id, session);
  const ok = await ensureStores();
  if (ok) {
    const db = await getTutorDb();
    if (db) {
      try {
        const tx = db.transaction(STORE_SESSIONS, "readwrite");
        tx.objectStore(STORE_SESSIONS).put(session);
      } catch {
        // Ignorieren
      }
    }
  }
}

/**
 * Benennt eine Sitzung um.
 */
export async function renameSession(sessionId: string, newTitle: string): Promise<void> {
  const list = await loadSessions();
  const target = list.find((s) => s.id === sessionId);
  if (target) {
    target.title = newTitle.trim() || target.title;
    target.updatedAt = Date.now();
    await updateSession(target);
  }
}

/**
 * Pinnt oder entpinnt eine Sitzung.
 */
export async function togglePinSession(sessionId: string): Promise<boolean> {
  const list = await loadSessions();
  const target = list.find((s) => s.id === sessionId);
  if (target) {
    target.pinned = !target.pinned;
    target.updatedAt = Date.now();
    await updateSession(target);
    return target.pinned;
  }
  return false;
}

/**
 * Löscht eine Sitzung und alle zugehörigen Nachrichten.
 */
export async function deleteSession(sessionId: string): Promise<void> {
  memSessions.delete(sessionId);
  memMessages.delete(sessionId);

  const ok = await ensureStores();
  if (ok) {
    const db = await getTutorDb();
    if (db) {
      try {
        const tx = db.transaction([STORE_SESSIONS, STORE_MESSAGES], "readwrite");
        tx.objectStore(STORE_SESSIONS).delete(sessionId);

        // Alle zugehörigen Nachrichten löschen
        const mStore = tx.objectStore(STORE_MESSAGES);
        const idx = mStore.index("sessionId");
        const req = idx.openKeyCursor(IDBKeyRange.only(sessionId));
        req.onsuccess = () => {
          const cursor = req.result;
          if (cursor) {
            mStore.delete(cursor.primaryKey);
            cursor.continue();
          }
        };
      } catch {
        // Ignorieren
      }
    }
  }
}

/**
 * Leert die gesamte Historie aller Sitzungen.
 */
export async function clearAllSessions(): Promise<void> {
  memSessions.clear();
  memMessages.clear();

  const ok = await ensureStores();
  if (ok) {
    const db = await getTutorDb();
    if (db) {
      try {
        const tx = db.transaction([STORE_SESSIONS, STORE_MESSAGES], "readwrite");
        tx.objectStore(STORE_SESSIONS).clear();
        tx.objectStore(STORE_MESSAGES).clear();
      } catch {
        // Ignorieren
      }
    }
  }
}

/**
 * Lädt alle Nachrichten einer bestimmten Sitzung in chronologischer Reihenfolge.
 */
export async function loadSessionMessages(sessionId: string): Promise<TutorChatMessage[]> {
  const ok = await ensureStores();
  if (!ok) {
    return memMessages.get(sessionId) || [];
  }

  const db = await getTutorDb();
  if (!db) return memMessages.get(sessionId) || [];

  return new Promise((resolve) => {
    try {
      const tx = db.transaction(STORE_MESSAGES, "readonly");
      const store = tx.objectStore(STORE_MESSAGES);
      const idx = store.index("sessionId");
      const req = idx.getAll(IDBKeyRange.only(sessionId));
      req.onsuccess = () => {
        const list = (req.result as TutorChatMessage[]) || [];
        list.sort((a, b) => a.timestamp - b.timestamp);
        resolve(list);
      };
      req.onerror = () => resolve(memMessages.get(sessionId) || []);
    } catch {
      resolve(memMessages.get(sessionId) || []);
    }
  });
}

/**
 * Speichert eine Liste von Nachrichten für eine Sitzung und aktualisiert den Sitzungszähler.
 */
export async function saveSessionMessages(
  sessionId: string,
  messages: TutorChatMessage[]
): Promise<void> {
  memMessages.set(sessionId, messages);

  // Sitzungsdaten aktualisieren
  const list = await loadSessions();
  const session = list.find((s) => s.id === sessionId);
  if (session) {
    session.messageCount = messages.length;
    session.updatedAt = Date.now();
    await updateSession(session);
  }

  const ok = await ensureStores();
  if (ok) {
    const db = await getTutorDb();
    if (db) {
      try {
        const tx = db.transaction(STORE_MESSAGES, "readwrite");
        const store = tx.objectStore(STORE_MESSAGES);
        for (const m of messages) {
          store.put(m);
        }
      } catch {
        // Ignorieren
      }
    }
  }
}

/**
 * Hilfsfunktion zur Zeitgruppierung für das UI:
 * "Heute", "Gestern", "Frühere 7 Tage", "Älter"
 */
export function groupSessionsByDate(
  sessions: TutorSession[],
  lang: "de" | "zh" = "de"
): { group: string; items: TutorSession[] }[] {
  const now = new Date();
  const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
  const yesterdayStart = todayStart - 86400000;
  const weekStart = todayStart - 7 * 86400000;

  const groups: { group: string; items: TutorSession[] }[] = [
    { group: lang === "de" ? "Heute" : "今天", items: [] },
    { group: lang === "de" ? "Gestern" : "昨天", items: [] },
    { group: lang === "de" ? "Frühere 7 Tage" : "过去7天", items: [] },
    { group: lang === "de" ? "Älter" : "更早", items: [] },
  ];

  for (const s of sessions) {
    if (s.updatedAt >= todayStart) {
      groups[0].items.push(s);
    } else if (s.updatedAt >= yesterdayStart) {
      groups[1].items.push(s);
    } else if (s.updatedAt >= weekStart) {
      groups[2].items.push(s);
    } else {
      groups[3].items.push(s);
    }
  }

  return groups.filter((g) => g.items.length > 0);
}
