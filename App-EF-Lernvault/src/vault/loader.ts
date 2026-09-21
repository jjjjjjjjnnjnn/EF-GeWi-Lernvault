import { parseNoteFile, parseCsv, type VaultNote, type VaultCard } from "./parser";

export interface VaultData {
  rootName: string;
  notes: VaultNote[];
  cards: VaultCard[];
}

const SKIP = new Set(["App-EF-Lernvault", "_Downloads", "node_modules", "dist", "target"]);

async function walk(
  dir: FileSystemDirectoryHandle,
  prefix: string,
  notes: VaultNote[],
  cards: VaultCard[]
): Promise<void> {
  for await (const entry of dir.values()) {
    if (entry.name.startsWith(".")) continue;
    const rel = prefix ? `${prefix}/${entry.name}` : entry.name;
    if (entry.kind === "directory") {
      if (SKIP.has(entry.name)) continue;
      await walk(entry as FileSystemDirectoryHandle, rel, notes, cards);
    } else if (entry.name.endsWith(".md")) {
      const text = await (entry as FileSystemFileHandle).getFile().then((f) => f.text());
      const n = parseNoteFile(rel, text);
      if (n && n.blocks.length > 0) notes.push(n);
    } else if (entry.name.endsWith(".csv")) {
      const text = await (entry as FileSystemFileHandle).getFile().then((f) => f.text());
      cards.push(...parseCsv(rel, text));
    }
  }
}

export async function pickVault(): Promise<VaultData> {
  const dir = await window.showDirectoryPicker({ mode: "read" });
  const notes: VaultNote[] = [];
  const cards: VaultCard[] = [];
  await walk(dir, "", notes, cards);
  notes.sort((a, b) => a.fach.localeCompare(b.fach) || b.datum.localeCompare(a.datum));
  return { rootName: dir.name, notes, cards };
}
