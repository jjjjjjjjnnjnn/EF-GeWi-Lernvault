import { useState, type FC } from "react";
import { MascotFox, type MascotState } from "./MascotFox";
import type { Lang } from "../../i18n";

export interface SidebarPetProps {
  lang: Lang;
  currentStreak?: number;
  xpToday?: number;
  onOpenFocusSprint?: () => void;
  onPetClick?: () => void;
}

const FOX_DIALOGUES_DE = [
  "Ich passe auf deine Notenpunkte auf!",
  "Bereit für die nächste Klausur-Einheit?",
  "Tipp: Schau dir heute die D2-Ebenentrennung an.",
  "18 Tage Serie – Spitzenleistung im Gymnasium!",
  "Formelansatz zuerst hinschreiben, dann rechnen!",
  "Konjunktiv I bei Zitaten nicht vergessen!",
];

const FOX_DIALOGUES_ZH = [
  "我正在守护你的 Abitur 战力分！",
  "准备好开启今天的下一轮冲刺了吗？",
  "小提示：今天重点复习 D2 客观描述与评判分流。",
  "18天连胜达成！继续保持学霸冲刺势头！",
  "理科大题切记：先写通用公式原式，再代入数值！",
  "文科引证切记：间接引语严格使用第一虚拟式！",
];

export const SidebarPet: FC<SidebarPetProps> = ({
  lang,
  currentStreak = 18,
  xpToday = 120,
  onOpenFocusSprint,
  onPetClick,
}) => {
  const de = lang === "de";
  const [petMood, setPetMood] = useState<MascotState>("avatar");
  const [dialogueIndex, setDialogueIndex] = useState(0);
  const [isInteracting, setIsInteracting] = useState(false);

  const handleInteract = () => {
    setIsInteracting(true);
    // 状态轮转微交互
    setPetMood((prev) => {
      if (prev === "avatar") return "streak";
      if (prev === "streak") return "deficit";
      if (prev === "deficit") return "levelup";
      if (prev === "levelup") return "idle";
      return "avatar";
    });
    setDialogueIndex((prev) => (prev + 1) % FOX_DIALOGUES_DE.length);
    onPetClick?.();

    setTimeout(() => {
      setIsInteracting(false);
    }, 400);
  };

  const currentDialogue = de
    ? FOX_DIALOGUES_DE[dialogueIndex]
    : FOX_DIALOGUES_ZH[dialogueIndex];

  return (
    <div className="group relative border-t border-[var(--line)] pt-3 pb-1 select-none">
      {/* 气泡对话框 (仅在 xl 屏幕展开显示) */}
      <div className="hidden xl:block mb-2 px-2.5 py-1.5 border border-[var(--line)] bg-[var(--surface)] text-[10px] leading-relaxed relative">
        <div className="flex items-center justify-between text-[var(--gray)] font-mono text-[9px] mb-0.5">
          <span>{de ? "Fuchs-Gedanke" : "小狐狸心语"}</span>
          <span className="text-[#D96E3A] font-bold">[{currentStreak}d]</span>
        </div>
        <p className="font-sans text-[var(--ink)] line-clamp-2">
          {currentDialogue}
        </p>
        {/* 气泡下箭头 */}
        <div className="absolute -bottom-1 left-6 w-2 h-2 bg-[var(--surface)] border-r border-b border-[var(--line)] rotate-45" />
      </div>

      {/* 桌宠交互主体卡片 */}
      <div
        onClick={handleInteract}
        className={`flex items-center justify-center xl:justify-start gap-3 p-1.5 rounded-[var(--radius)] border border-transparent hover:border-[var(--line)] hover:bg-[var(--paper-subtle)] transition-all cursor-pointer ${
          isInteracting ? "scale-95" : "hover:scale-[1.02]"
        }`}
        title={de ? "Klick mich für Motivation und Statuswechsel!" : "点击小狐狸互动、切换心语与姿态！"}
      >
        {/* 吉祥物实体 */}
        <div className="shrink-0 relative">
          <MascotFox state={petMood} size={42} />
          {/* 活跃指示呼吸点 */}
          <span className="absolute -bottom-0.5 -right-0.5 w-2 h-2 rounded-full bg-[#10B981] border border-[var(--surface)]" />
        </div>

        {/* 桌面端伴学标签与快速状态 */}
        <div className="hidden xl:block min-w-0 flex-1">
          <div className="flex items-center justify-between">
            <span className="font-serif text-xs font-bold text-[var(--ink)] truncate">
              {de ? "Lernfuchs" : "学霸小赤狐"}
            </span>
            <span className="font-mono text-[9px] text-[#D96E3A] font-bold">
              +{xpToday} XP
            </span>
          </div>
          <div className="flex items-center gap-1.5 text-[var(--gray)] font-mono text-[10px] mt-0.5">
            <span>Stufe II</span>
            <span>·</span>
            <span className="hover:text-[var(--ink)]" onClick={(e) => {
              e.stopPropagation();
              onOpenFocusSprint?.();
            }}>
              {de ? "Sprint" : "极速冲刺"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SidebarPet;
