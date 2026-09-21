// Minimal File System Access API declarations (Chromium/Edge; Tauri uses native FS later).
interface FileSystemHandle {
  readonly kind: "file" | "directory";
  readonly name: string;
}
interface FileSystemFileHandle extends FileSystemHandle {
  getFile(): Promise<File>;
}
interface FileSystemDirectoryHandle extends FileSystemHandle {
  values(): AsyncIterableIterator<FileSystemFileHandle | FileSystemDirectoryHandle>;
}
interface Window {
  showDirectoryPicker(options?: { mode?: "read" | "readwrite" }): Promise<FileSystemDirectoryHandle>;
}
