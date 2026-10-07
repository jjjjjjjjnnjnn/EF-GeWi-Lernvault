import type { FC } from "react";

export type MascotState = "idle" | "levelup" | "deficit" | "streak" | "avatar";

export interface MascotFoxProps {
  state?: MascotState;
  size?: number;
  className?: string;
  animate?: boolean;
  title?: string;
}

export const MascotFox: FC<MascotFoxProps> = ({
  state = "avatar",
  size = 64,
  className = "",
  animate = true,
  title = "EF Lernvault Fuchs",
}) => {
  // 配色方案常量 (来自 Visual Guidelines 设计稿)
  const cOrange = "#D96E3A";
  const cOrangeDark = "#B85526";
  const cOrangeLight = "#E8824E";
  const cCream = "#E6D9C8";
  const cCreamDark = "#D4C5B2";
  const cSlate = "#2D4F5C";
  const cGold = "#F2C94C";
  const cRed = "#EB5757";

  // 1. 头像 / 标志形态 (Avatar)
  if (state === "avatar") {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`select-none overflow-visible ${className}`}
        aria-label={title}
      >
        <g className={animate ? "transition-transform hover:scale-105 duration-200" : ""}>
          {/* 左耳 */}
          <polygon points="26,18 42,40 18,44" fill={cOrangeDark} />
          <polygon points="26,23 37,39 21,41" fill={cCream} />
          {/* 右耳 */}
          <polygon points="74,18 82,44 58,40" fill={cOrangeDark} />
          <polygon points="74,23 79,41 63,39" fill={cCream} />
          {/* 呆毛 */}
          <path
            d="M50 32 C 48 18, 56 12, 60 14 C 54 20, 52 26, 51 32 Z"
            fill={cOrange}
            stroke={cOrangeDark}
            strokeWidth="0.8"
            className={animate ? "origin-bottom animate-pulse" : ""}
          />
          {/* 脸部底色折纸面 */}
          <polygon points="50,32 78,44 50,78 22,44" fill={cOrange} />
          <polygon points="50,32 50,78 22,44" fill={cOrangeLight} />
          {/* 面颊白毛折纸面 */}
          <polygon points="22,44 14,58 36,68 50,78" fill={cCream} />
          <polygon points="78,44 86,58 64,68 50,78" fill={cCreamDark} />
          {/* 眼睛 */}
          <polygon points="34,50 38,56 31,56" fill={cSlate} />
          <polygon points="66,50 69,56 62,56" fill={cSlate} />
          {/* 黑鼻头 */}
          <polygon points="50,70 54,75 46,75" fill={cSlate} />
        </g>
      </svg>
    );
  }

  // 2. 日常挂机 / 酣睡休憩 (Idle - 尾巴裹身，平稳微呼吸)
  if (state === "idle") {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 140 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`select-none overflow-visible ${className}`}
        aria-label={title}
      >
        <g className={animate ? "transition-all duration-300" : ""}>
          {/* Zzz 睡眠气泡字符 */}
          {animate && (
            <g className="opacity-70 font-mono font-bold text-xs" fill={cSlate}>
              <text x="100" y="32" className="animate-bounce" style={{ animationDuration: "2.4s" }}>Z</text>
              <text x="112" y="22" className="animate-bounce" style={{ animationDuration: "2.8s", animationDelay: "0.4s" }}>z</text>
              <text x="122" y="14" className="animate-bounce" style={{ animationDuration: "3.2s", animationDelay: "0.8s" }}>z</text>
            </g>
          )}

          {/* 身体底座 */}
          <path d="M30 85 C 30 65, 55 58, 85 62 C 105 65, 115 80, 110 95 C 105 105, 45 108, 30 85 Z" fill={cOrangeDark} />

          {/* 头部微垂 */}
          <g transform="translate(10, 10)">
            {/* 耳朵 */}
            <polygon points="42,32 54,48 36,52" fill={cOrangeDark} />
            <polygon points="43,36 50,47 38,49" fill={cCream} />
            <polygon points="76,32 82,52 64,48" fill={cOrangeDark} />
            <polygon points="75,36 79,49 67,47" fill={cCream} />
            {/* 呆毛垂落 */}
            <path d="M58 42 C 54 30, 62 26, 64 28 C 60 32, 59 38, 59 42 Z" fill={cOrange} />
            {/* 面庞 */}
            <polygon points="59,42 78,52 59,76 40,52" fill={cOrange} />
            <polygon points="40,52 34,62 48,70 59,76" fill={cCream} />
            <polygon points="78,52 84,62 70,70 59,76" fill={cCreamDark} />
            {/* 安睡闭眼 (两条优雅折线) */}
            <path d="M46 58 Q 50 62 54 58" stroke={cSlate} strokeWidth="1.8" strokeLinecap="round" fill="none" />
            <path d="M64 58 Q 68 62 72 58" stroke={cSlate} strokeWidth="1.8" strokeLinecap="round" fill="none" />
            <polygon points="59,70 62,74 56,74" fill={cSlate} />
          </g>

          {/* 环抱的大尾巴 (多边形几何包覆身体) */}
          <g>
            <polygon points="35,90 65,96 112,88 120,70 100,68 70,78" fill={cOrange} />
            <polygon points="65,96 90,104 116,92 112,88" fill={cOrangeLight} />
            {/* 尾尖白毛 */}
            <polygon points="100,68 120,70 128,78 116,92 112,88" fill={cCream} />
          </g>
        </g>
      </svg>
    );
  }

  // 3. 突破升级 / 庆祝夺冠 (Level Up - 前爪高举奖杯，呆毛欢呼)
  if (state === "levelup") {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 140 140"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`select-none overflow-visible ${className}`}
        aria-label={title}
      >
        <g className={animate ? "transition-all duration-300" : ""}>
          {/* 背景庆祝星光 */}
          <polygon points="25,30 28,38 36,41 28,44 25,52 22,44 14,41 22,38" fill={cGold} className={animate ? "animate-ping opacity-60" : ""} />
          <polygon points="115,22 117,28 123,30 117,32 115,38 113,32 107,30 113,28" fill={cGold} />
          <polygon points="120,75 122,80 127,82 122,84 120,89 118,84 113,82 118,80" fill={cGold} />

          {/* 身躯 */}
          <polygon points="50,75 70,68 90,75 96,115 44,115" fill={cOrange} />
          <polygon points="58,75 70,68 82,75 76,105 64,105" fill={cCream} />

          {/* 头部 (微仰头) */}
          <g transform="translate(0, -6)">
            {/* 耳朵高耸 */}
            <polygon points="44,28 58,50 36,54" fill={cOrangeDark} />
            <polygon points="44,32 54,49 39,51" fill={cCream} />
            <polygon points="96,28 104,54 82,50" fill={cOrangeDark} />
            <polygon points="96,32 101,51 86,49" fill={cCream} />
            {/* 兴奋挺起的呆毛 */}
            <path d="M70 42 C 68 22, 80 16, 84 18 C 76 26, 73 34, 71 42 Z" fill={cOrange} stroke={cOrangeDark} strokeWidth="0.8" />
            {/* 脸部 */}
            <polygon points="70,42 98,54 70,88 42,54" fill={cOrange} />
            <polygon points="42,54 34,68 56,78 70,88" fill={cCream} />
            <polygon points="98,54 106,68 84,78 70,88" fill={cCreamDark} />
            {/* 灿烂笑眼 (月牙眯眼) */}
            <path d="M52 60 Q 57 55 62 60" stroke={cSlate} strokeWidth="2.2" strokeLinecap="round" fill="none" />
            <path d="M78 60 Q 83 55 88 60" stroke={cSlate} strokeWidth="2.2" strokeLinecap="round" fill="none" />
            <polygon points="70,78 74,83 66,83" fill={cSlate} />
          </g>

          {/* 举起的金色奖杯 (Stufe 13 / 15 NP Pokal) */}
          <g transform="translate(86, 32)">
            <polygon points="12,12 28,12 24,28 16,28" fill={cGold} stroke={cSlate} strokeWidth="1" />
            {/* 杯耳 */}
            <path d="M12 16 C 6 16, 6 24, 13 24" stroke={cSlate} strokeWidth="1.2" fill="none" />
            <path d="M28 16 C 34 16, 34 24, 27 24" stroke={cSlate} strokeWidth="1.2" fill="none" />
            {/* 杯柱与底座 */}
            <rect x="18" y="28" width="4" height="6" fill={cGold} stroke={cSlate} strokeWidth="0.8" />
            <rect x="15" y="34" width="10" height="4" fill={cSlate} />
          </g>

          {/* 左爪高扬，右爪握杯 */}
          <polygon points="40,82 48,72 56,78 46,88" fill={cOrangeDark} />
          <polygon points="86,68 94,62 102,68 92,78" fill={cOrangeDark} />
        </g>
      </svg>
    );
  }

  // 4. 弱项诊断 / 深度探查 (Deficit - 专注持放大镜，指向雷达失分点)
  if (state === "deficit") {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 140 140"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`select-none overflow-visible ${className}`}
        aria-label={title}
      >
        <g className={animate ? "transition-all duration-300" : ""}>
          {/* 身躯 (微侧倾专注) */}
          <polygon points="44,70 66,64 86,72 88,115 38,115" fill={cOrange} />
          <polygon points="50,70 64,65 74,74 68,105 56,105" fill={cCream} />

          {/* 蓬松侧尾 */}
          <polygon points="38,98 20,86 16,68 30,76 38,88" fill={cOrangeDark} />
          <polygon points="16,68 12,56 22,60 30,76" fill={cCream} />

          {/* 头部 (专注审视) */}
          <g transform="translate(-2, 2)">
            {/* 耳朵 (微转向专注) */}
            <polygon points="42,26 56,48 34,52" fill={cOrangeDark} />
            <polygon points="42,30 52,47 37,49" fill={cCream} />
            <polygon points="90,30 96,54 76,49" fill={cOrangeDark} />
            <polygon points="89,34 93,51 79,48" fill={cCream} />
            {/* 呆毛微卷 */}
            <path d="M66 40 C 64 24, 74 18, 77 20 C 71 27, 69 34, 67 40 Z" fill={cOrange} stroke={cOrangeDark} strokeWidth="0.8" />
            {/* 脸部 */}
            <polygon points="66,40 92,52 66,84 40,52" fill={cOrange} />
            <polygon points="40,52 32,65 52,75 66,84" fill={cCream} />
            <polygon points="92,52 98,65 78,75 66,84" fill={cCreamDark} />
            {/* 专注认真双眼 */}
            <polygon points="52,56 56,62 49,62" fill={cSlate} />
            <polygon points="78,56 82,62 75,62" fill={cSlate} />
            <polygon points="66,74 70,78 62,78" fill={cSlate} />
          </g>

          {/* 手握放大镜 (Lupe mit Schwachpunkt-Fokus) */}
          <g transform="translate(76, 52)">
            {/* 放大镜手柄 */}
            <line x1="8" y1="28" x2="16" y2="44" stroke={cSlate} strokeWidth="3" strokeLinecap="round" />
            {/* 放大镜透镜圈 */}
            <circle cx="8" cy="22" r="14" stroke={cSlate} strokeWidth="2.5" fill="none" />
            <circle cx="8" cy="22" r="12" fill={cCream} fillOpacity="0.3" />
            {/* 镜片内警示感叹号 */}
            <line x1="8" y1="14" x2="8" y2="23" stroke={cRed} strokeWidth="2.2" strokeLinecap="round" />
            <circle cx="8" cy="27" r="1.2" fill={cRed} />
          </g>

          {/* 爪子紧握透镜 */}
          <polygon points="76,82 84,74 92,80 84,88" fill={cOrangeDark} />
        </g>
      </svg>
    );
  }

  // 5. 连续打卡 / 冲刺动量 (Streak - 单爪托起学术动量之火，干劲满满)
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 140 140"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`select-none overflow-visible ${className}`}
      aria-label={title}
    >
      <g className={animate ? "transition-all duration-300" : ""}>
        {/* 身体底座 */}
        <polygon points="46,72 68,66 88,74 92,115 42,115" fill={cOrange} />
        <polygon points="54,72 68,66 78,74 72,105 60,105" fill={cCream} />

        {/* 头部 */}
        <g transform="translate(0, 0)">
          {/* 耳朵 */}
          <polygon points="44,26 58,48 36,52" fill={cOrangeDark} />
          <polygon points="44,30 54,47 39,49" fill={cCream} />
          <polygon points="94,26 102,52 80,48" fill={cOrangeDark} />
          <polygon points="94,30 99,49 84,47" fill={cCream} />
          {/* 呆毛 */}
          <path d="M68 38 C 66 20, 78 14, 82 16 C 74 23, 71 31, 69 38 Z" fill={cOrange} stroke={cOrangeDark} strokeWidth="0.8" />
          {/* 面部 */}
          <polygon points="68,38 96,50 68,84 40,50" fill={cOrange} />
          <polygon points="40,50 32,64 54,74 68,84" fill={cCream} />
          <polygon points="96,50 104,64 82,74 68,84" fill={cCreamDark} />
          {/* 充满自信目光 */}
          <polygon points="52,54 56,60 49,60" fill={cSlate} />
          <polygon points="80,54 84,60 77,60" fill={cSlate} />
          <polygon points="68,72 72,76 64,76" fill={cSlate} />
        </g>

        {/* 右爪托起学术动量之火 (Lern-Flamme) */}
        <g transform="translate(94, 38)">
          {/* 外焰 */}
          <path
            d="M14 36 C 4 36, 0 28, 6 18 C 12 8, 16 0, 16 0 C 16 0, 22 10, 26 18 C 30 26, 26 36, 14 36 Z"
            fill={cOrange}
            className={animate ? "origin-bottom animate-pulse" : ""}
          />
          {/* 内焰高光 */}
          <path
            d="M14 34 C 8 34, 6 28, 10 22 C 14 16, 16 8, 16 8 C 16 8, 18 14, 20 20 C 22 26, 20 34, 14 34 Z"
            fill={cGold}
          />
        </g>

        {/* 托火之爪 */}
        <polygon points="84,78 96,70 106,76 94,86" fill={cOrangeDark} />
      </g>
    </svg>
  );
};

export default MascotFox;
