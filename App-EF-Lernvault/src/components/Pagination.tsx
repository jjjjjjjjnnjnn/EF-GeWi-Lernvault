import type { Lang } from "../i18n";

interface PaginationProps {
  currentPage: number;
  totalItems: number;
  pageSize: number;
  onPageChange: (page: number) => void;
  onPageSizeChange?: (size: number) => void;
  lang?: Lang;
  pageSizeOptions?: number[];
}

export function Pagination({
  currentPage,
  totalItems,
  pageSize,
  onPageChange,
  onPageSizeChange,
  lang = "zh",
  pageSizeOptions = [8, 12, 20],
}: PaginationProps) {
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));
  const safeCurrentPage = Math.max(1, Math.min(currentPage, totalPages));

  if (totalItems <= 0) return null;

  // Build page numbers window (e.g. 1 ... 4 5 6 ... 12)
  const getPageNumbers = () => {
    const pages: (number | "...")[] = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
      return pages;
    }

    pages.push(1);
    const start = Math.max(2, safeCurrentPage - 1);
    const end = Math.min(totalPages - 1, safeCurrentPage + 1);

    if (start > 2) pages.push("...");
    for (let i = start; i <= end; i++) pages.push(i);
    if (end < totalPages - 1) pages.push("...");
    pages.push(totalPages);
    return pages;
  };

  const startIndex = (safeCurrentPage - 1) * pageSize + 1;
  const endIndex = Math.min(totalItems, safeCurrentPage * pageSize);

  return (
    <div
      data-testid="pagination-bar"
      className="flex flex-wrap items-center justify-between gap-2 border-t border-[var(--line)] pt-3 text-xs font-mono text-[var(--gray)]"
    >
      {/* Range Info */}
      <div className="flex items-center gap-1.5">
        <span>
          {lang === "de"
            ? `${startIndex}–${endIndex} von ${totalItems}`
            : `第 ${startIndex}–${endIndex} 篇 (共 ${totalItems} 篇)`}
        </span>

        {/* Page size dropdown */}
        {onPageSizeChange && (
          <div className="ml-2 flex items-center gap-1">
            <span className="text-[10px] uppercase text-[var(--gray)]">
              {lang === "de" ? "Pro Seite:" : "每页:"}
            </span>
            <select
              value={pageSize}
              onChange={(e) => onPageSizeChange(Number(e.target.value))}
              className="rounded-[var(--radius)] border border-[var(--line)] bg-[var(--surface)] px-1.5 py-0.5 text-xs text-[var(--ink)] focus:border-[var(--accent)] focus:outline-none"
            >
              {pageSizeOptions.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      {/* Page Navigation Controls */}
      <div className="flex items-center gap-1">
        {/* Previous Button */}
        <button
          type="button"
          disabled={safeCurrentPage <= 1}
          onClick={() => onPageChange(Math.max(1, safeCurrentPage - 1))}
          className={`flex items-center gap-1 rounded-[var(--radius)] border border-[var(--line)] bg-[var(--surface)] px-2 py-0.5 transition-colors ${
            safeCurrentPage <= 1
              ? "cursor-not-allowed opacity-40 text-[var(--gray)]"
              : "hover:bg-[var(--surface-hover)] hover:text-[var(--ink)] cursor-pointer text-[var(--ink)]"
          }`}
          title={lang === "de" ? "Vorherige Seite ([)" : "上一页 ([)"}
        >
          <svg
            width="12"
            height="12"
            viewBox="0 0 16 16"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            aria-hidden="true"
          >
            <path d="M10 3L5 8l5 5" />
          </svg>
          <span className="hidden sm:inline">{lang === "de" ? "Zurück" : "上页"}</span>
        </button>

        {/* Page numbers */}
        <div className="flex items-center gap-0.5">
          {getPageNumbers().map((p, idx) => {
            if (p === "...") {
              return (
                <span key={`dots-${idx}`} className="px-1 text-[var(--gray)] select-none">
                  ...
                </span>
              );
            }
            const isCurrent = p === safeCurrentPage;
            return (
              <button
                type="button"
                key={p}
                onClick={() => onPageChange(p)}
                className={`min-w-[24px] h-[22px] flex items-center justify-center rounded-[var(--radius)] text-xs transition-colors cursor-pointer border ${
                  isCurrent
                    ? "border-[var(--accent)] bg-[var(--accent)] text-[var(--paper)] font-bold"
                    : "border-transparent bg-transparent text-[var(--gray)] hover:bg-[var(--surface)] hover:text-[var(--ink)] hover:border-[var(--line)]"
                }`}
              >
                {p}
              </button>
            );
          })}
        </div>

        {/* Next Button */}
        <button
          type="button"
          disabled={safeCurrentPage >= totalPages}
          onClick={() => onPageChange(Math.min(totalPages, safeCurrentPage + 1))}
          className={`flex items-center gap-1 rounded-[var(--radius)] border border-[var(--line)] bg-[var(--surface)] px-2 py-0.5 transition-colors ${
            safeCurrentPage >= totalPages
              ? "cursor-not-allowed opacity-40 text-[var(--gray)]"
              : "hover:bg-[var(--surface-hover)] hover:text-[var(--ink)] cursor-pointer text-[var(--ink)]"
          }`}
          title={lang === "de" ? "Nächste Seite (])" : "下一页 (])"}
        >
          <span className="hidden sm:inline">{lang === "de" ? "Vor" : "下页"}</span>
          <svg
            width="12"
            height="12"
            viewBox="0 0 16 16"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            aria-hidden="true"
          >
            <path d="M6 3l5 5-5 5" />
          </svg>
        </button>
      </div>
    </div>
  );
}

export default Pagination;
