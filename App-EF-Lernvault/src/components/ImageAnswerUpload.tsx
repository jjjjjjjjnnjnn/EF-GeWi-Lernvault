import { useRef, useState, useEffect } from "react";
import type { Lang } from "../i18n";
import { chat, describeActiveEngine } from "../ai/engine";

interface ImageAnswerUploadProps {
  lang?: Lang;
  onImageSelected?: (dataUrl: string | null) => void;
  onTextTranscribed?: (transcribedText: string) => void;
}

export default function ImageAnswerUpload({
  lang = "zh",
  onImageSelected,
  onTextTranscribed,
}: ImageAnswerUploadProps) {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string>("");
  const [recognizing, setRecognizing] = useState<boolean>(false);
  const [ocrStatus, setOcrStatus] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileChange = (file: File | null) => {
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setOcrStatus(lang === "de" ? "Nur Bilddateien erlaubt." : "仅支持图片文件格式。");
      return;
    }

    setFileName(file.name);
    setOcrStatus(null);
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      setImagePreview(result);
      onImageSelected?.(result);
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      handleFileChange(files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handlePaste = (e: ClipboardEvent) => {
    const items = e.clipboardData?.items;
    if (!items) return;
    for (let i = 0; i < items.length; i++) {
      if (items[i].type.startsWith("image/")) {
        const file = items[i].getAsFile();
        if (file) {
          handleFileChange(file);
          break;
        }
      }
    }
  };

  useEffect(() => {
    window.addEventListener("paste", handlePaste);
    return () => {
      window.removeEventListener("paste", handlePaste);
    };
  }, [lang]);

  const handleClear = () => {
    setImagePreview(null);
    setFileName("");
    setOcrStatus(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
    onImageSelected?.(null);
  };

  const handleRunOcr = async () => {
    if (!imagePreview) return;
    setRecognizing(true);
    setOcrStatus(lang === "de" ? "Erkenne Handschrift & Formeln …" : "正在识别手写草稿与公式…");

    const engine = describeActiveEngine();
    if (engine === "off") {
      setRecognizing(false);
      setOcrStatus(
        lang === "de"
          ? "KI-Engine offline. Bild ist beigefügt; bitte Stichpunkte manuell ergänzen."
          : "AI 引擎离线。手写图片已附加，可对照草稿手动补充要点。"
      );
      return;
    }

    try {
      const prompt = `Du bist ein präziser OCR-Transkribierer für Schülerarbeiten in NRW Gymnasien. Transkribiere den handschriftlichen Lösungsweg und mathematische/fachliche Formeln aus dieser Schüler-Abgabe präzise in sauberes Markdown und LaTeX ($...$). Gibt ausschließlich den transkribierten Text ohne Höflichkeitsfloskeln zurück.`;

      // Multimodal vision call: send prompt + image payload
      const recognized = await chat(
        [{ role: "user", content: prompt }],
        {
          temperature: 0.2,
          maxTokens: 800,
          image: imagePreview,
        }
      );

      if (recognized && recognized.trim()) {
        onTextTranscribed?.(recognized.trim());
        setOcrStatus(
          lang === "de"
            ? "Handschrift erfolgreich transkribiert und ins Textfeld übernommen."
            : "手写内容已成功识别并填入作答框。"
        );
      } else {
        setOcrStatus(
          lang === "de"
            ? "Kein Text erkannt. Bitte manuell im Textfeld formulieren."
            : "未能从图片中提取到文字，请在文本框补充要点。"
        );
      }
    } catch {
      setOcrStatus(
        lang === "de"
          ? "Erkennung fehlgeschlagen. Bild bleibt als Anlage erhalten."
          : "识别暂不可用，图片已成功附带至评卷队列。"
      );
    } finally {
      setRecognizing(false);
    }
  };

  return (
    <div className="rounded-[var(--radius)] border border-dashed border-[var(--line)] bg-[var(--paper-subtle)] p-3 space-y-2">
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        capture="environment"
        className="hidden"
        onChange={(e) => {
          const files = e.target.files;
          if (files && files.length > 0) handleFileChange(files[0]);
        }}
      />

      {!imagePreview ? (
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-sans text-[var(--gray)]"
        >
          <div className="flex items-center gap-2">
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.4"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
              className="h-4 w-4 text-[var(--accent)] shrink-0"
            >
              <rect x="2" y="2" width="12" height="12" rx="2" />
              <circle cx="5.5" cy="5.5" r="1.5" />
              <path d="M14 10l-3.5-3.5L3 14" />
            </svg>
            <span>
              {lang === "de"
                ? "Handschriftliche Skizze/Rechnung hochladen oder mit Strg+V einfügen"
                : "上传纸质手写推导/草稿照片，或直接按 Ctrl+V 粘贴截图"}
            </span>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-[var(--radius)] border border-[var(--line)] bg-[var(--surface)] font-mono text-xs text-[var(--ink)] hover:border-[var(--accent)] transition-colors cursor-pointer"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
                className="h-3.5 w-3.5 text-[var(--gray)]"
              >
                <path d="M8 2.5v7M5.5 5L8 2.5 10.5 5M3 10.5v3h10v-3" />
              </svg>
              <span>{lang === "de" ? "Foto / Bild wählen" : "拍照 / 选图"}</span>
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-2">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[var(--line)] pb-2 text-xs font-mono text-[var(--gray)]">
            <div className="flex items-center gap-2 truncate">
              <span className="font-semibold text-[var(--ink)] truncate max-w-xs">{fileName || "Anlage-Bild"}</span>
              <span className="text-[var(--accent)]">[Bild angehängt]</span>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                disabled={recognizing}
                onClick={handleRunOcr}
                className="px-2.5 py-1 rounded-[var(--radius)] border border-[var(--accent)]/40 bg-[var(--accent)]/10 text-xs font-mono text-[var(--accent)] hover:bg-[var(--accent)]/20 transition-colors cursor-pointer disabled:opacity-50"
              >
                {recognizing
                  ? lang === "de"
                    ? "Erkenne Handschrift …"
                    : "正在识别手写…"
                  : lang === "de"
                  ? "Handschrift-OCR erkennen"
                  : "识别手写与公式"}
              </button>
              <button
                type="button"
                onClick={handleClear}
                className="px-2 py-1 rounded-[var(--radius)] border border-[var(--line)] bg-[var(--surface)] text-xs font-mono text-[var(--gray)] hover:text-[var(--ink)] hover:border-[var(--ink)] transition-colors cursor-pointer"
                title={lang === "de" ? "Bild entfernen" : "移除图片"}
              >
                {lang === "de" ? "Entfernen" : "移除"}
              </button>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3">
            <div className="relative max-w-xs max-h-36 overflow-hidden rounded-[var(--radius)] border border-[var(--line)] bg-[var(--surface)]">
              <img
                src={imagePreview}
                alt="Schülerarbeit Vorschau"
                className="max-h-36 w-auto object-contain"
              />
            </div>
            {ocrStatus && (
              <div className="flex-1 text-xs font-mono text-[var(--ink)] bg-[var(--surface)] p-2 rounded-[var(--radius)] border border-[var(--line)]">
                {ocrStatus}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
