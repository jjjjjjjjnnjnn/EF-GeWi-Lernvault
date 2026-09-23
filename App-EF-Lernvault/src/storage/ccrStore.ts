// CCR (Compress-Cache-Retrieve) 可逆内容寻址缓存
// 借鉴 Headroom CCR 架构思想：将压缩前原始内容按 Hash 暂存，模型或用户可按需瞬时还原，使压缩无损可逆

export interface CCREntry {
  hash: string;       // 例如 "h-a1b2c3d4"
  original: string;   // 原始完整文本
  timestamp: number;  // 写入时间戳
  metadata?: Record<string, unknown>;
}

const memoryStore = new Map<string, CCREntry>();
const CCR_IDB_STORE = "ccr_cache";
const DEFAULT_TTL_MS = 24 * 60 * 60 * 1000; // 默认 24 小时存活期

/**
 * 快速生成 32-bit FNV-1a 内容哈希，作为内容寻址唯一键
 */
export function generateCCRHash(text: string): string {
  let hash = 0x811c9dc5;
  for (let i = 0; i < text.length; i++) {
    hash ^= text.charCodeAt(i);
    hash = Math.imul(hash, 0x01000193);
  }
  const hex = (hash >>> 0).toString(16).padStart(8, "0");
  return `h-${hex}`;
}

function hasIndexedDB(): boolean {
  return typeof indexedDB !== "undefined" && indexedDB !== null;
}

/** 打开 CCR IndexedDB 数据库 */
function openCCRIdb(): Promise<IDBDatabase | null> {
  if (!hasIndexedDB()) return Promise.resolve(null);

  return new Promise((resolve) => {
    try {
      const req = indexedDB.open("eflernvault_ccr_db", 1);
      req.onupgradeneeded = (e) => {
        const db = (e.target as IDBOpenDBRequest).result;
        if (!db.objectStoreNames.contains(CCR_IDB_STORE)) {
          db.createObjectStore(CCR_IDB_STORE, { keyPath: "hash" });
        }
      };
      req.onsuccess = (e) => resolve((e.target as IDBOpenDBRequest).result);
      req.onerror = () => resolve(null);
    } catch {
      resolve(null);
    }
  });
}

/**
 * 将原始文本存入 CCR 缓存，返回内容寻址哈希键
 */
export async function saveToCCR(
  originalText: string,
  metadata?: Record<string, unknown>
): Promise<string> {
  const hash = generateCCRHash(originalText);
  const entry: CCREntry = {
    hash,
    original: originalText,
    timestamp: Date.now(),
    metadata,
  };

  // 1. 写入内存缓存 (0ms)
  memoryStore.set(hash, entry);

  // 2. 异步持久化到 IndexedDB
  try {
    const db = await openCCRIdb();
    if (db) {
      const tx = db.transaction(CCR_IDB_STORE, "readwrite");
      tx.objectStore(CCR_IDB_STORE).put(entry);
    }
  } catch {
    // 降级为纯内存缓存
  }

  return hash;
}

/**
 * 根据哈希键按需无损还原原始内容
 */
export async function retrieveFromCCR(hash: string): Promise<string | null> {
  // 1. 优先内存命中
  const mem = memoryStore.get(hash);
  if (mem) return mem.original;

  // 2. 查询 IndexedDB
  try {
    const db = await openCCRIdb();
    if (!db) return null;

    return new Promise((resolve) => {
      const tx = db.transaction(CCR_IDB_STORE, "readonly");
      const req = tx.objectStore(CCR_IDB_STORE).get(hash);
      req.onsuccess = () => {
        const res = req.result as CCREntry | undefined;
        if (res) {
          memoryStore.set(hash, res); // 重新暖机内存
          resolve(res.original);
        } else {
          resolve(null);
        }
      };
      req.onerror = () => resolve(null);
    });
  } catch {
    return null;
  }
}

/** 获取完整 CCR 元数据实体 */
export async function getCCREntry(hash: string): Promise<CCREntry | null> {
  const mem = memoryStore.get(hash);
  if (mem) return mem;

  try {
    const db = await openCCRIdb();
    if (!db) return null;

    return new Promise((resolve) => {
      const tx = db.transaction(CCR_IDB_STORE, "readonly");
      const req = tx.objectStore(CCR_IDB_STORE).get(hash);
      req.onsuccess = () => resolve((req.result as CCREntry) ?? null);
      req.onerror = () => resolve(null);
    });
  } catch {
    return null;
  }
}

/** 清理过期条目 */
export async function pruneCCR(ttlMs = DEFAULT_TTL_MS): Promise<number> {
  const now = Date.now();
  let prunedCount = 0;

  for (const [h, entry] of memoryStore.entries()) {
    if (now - entry.timestamp >= ttlMs) {
      memoryStore.delete(h);
      prunedCount++;
    }
  }

  try {
    const db = await openCCRIdb();
    if (db) {
      const tx = db.transaction(CCR_IDB_STORE, "readwrite");
      const store = tx.objectStore(CCR_IDB_STORE);
      const req = store.openCursor();
      req.onsuccess = () => {
        const cursor = req.result;
        if (cursor) {
          const val = cursor.value as CCREntry;
          if (now - val.timestamp >= ttlMs) {
            cursor.delete();
          }
          cursor.continue();
        }
      };
    }
  } catch {
    // 忽略异常
  }

  return prunedCount;
}

/** 清空全部 CCR 缓存 (测试/重置使用) */
export async function clearCCR(): Promise<void> {
  memoryStore.clear();
  try {
    const db = await openCCRIdb();
    if (db) {
      const tx = db.transaction(CCR_IDB_STORE, "readwrite");
      tx.objectStore(CCR_IDB_STORE).clear();
    }
  } catch {
    // 忽略异常
  }
}
