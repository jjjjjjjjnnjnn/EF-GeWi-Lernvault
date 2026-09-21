import type { Block } from "../vault/parser";

// Tufte: ZH (humanist sans, gray) vs DE (old-style serif, ink). No italic.
export default function Blocks({ blocks }: { blocks: Block[] }) {
  return (
    <div>
      {blocks.map((b, i) => {
        if (b.kind === "h2") return <h3 key={i} className="mb-1 mt-4 font-serif text-lg text-[#1C1B17]">{b.text}</h3>;
        if (b.kind === "h3") return <h4 key={i} className="mb-1 mt-3 font-serif text-base text-[#1C1B17]">{b.text}</h4>;
        if (b.kind === "li")
          return (
            <p key={i} className={`mb-1 pl-3 ${b.lang === "zh" ? "font-sans text-sm text-[#6B675C]" : "font-serif text-[15px] text-[#1C1B17]"}`}>
              <span className="mr-2 text-[#6B675C]">–</span>{b.text}
            </p>
          );
        return (
          <p key={i} className={`mb-2 ${b.lang === "zh" ? "font-sans text-sm text-[#6B675C]" : "font-serif text-[15px] leading-relaxed text-[#1C1B17]"}`}>
            {b.text}
          </p>
        );
      })}
    </div>
  );
}
