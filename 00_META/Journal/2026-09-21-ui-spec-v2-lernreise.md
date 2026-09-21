---
fach: ""
thema: "UI-SPEC-V2: 10-Fach + KaTeX + Lernreise"
datum: 2026-09-21
tags: [EF, Meta]
---

# 2026-09-21 UI-SPEC-V2 全科体系 + KaTeX + Lernreise 交付记录

## 核心交付
1. **10 科学科体系 (`src/fach.ts`)**：
   - 确立 10 科（DE/EN/MA/PH/CH/BI/PL/SW/MU/SP）缩写与中德双语全称单一真相源。
   - Library 笔记库学科筛选升级为 10 枚发丝细线徽章（带笔记实时匹配数量计数，下划线/靛蓝选中态）。
   - 命令面板增加 "Fächer" 学科跳转组，Planner 升级为涵盖 10 科任务的周模板并支持连续学习天数（Streak）小字行。
2. **KaTeX 离线数学公式系统**：
   - 安装特批唯一依赖 `katex` + `@types/katex`；字体资源离线随包打进 dist，零网络请求。
   - `Blocks.tsx` 扩展支持行间独立公式（`$$...$$` 居中、1.05em、纯黑墨水）与行内公式（`$...$`），并具备异常纯文本安全降级防护。
   - MINT 数学核心公式笔记实测公式排版完好。
3. **Lernreise 第 7 模块（互动探索式学习）**：
   - 课程解析器 (`src/reise.ts`)：纯函数解析 vault `Lernreise/*.md` 课程，切分五步态（entdecken/ausprobieren/check/szenario/muendlich）。首个手写示范课程（SoWi 社会市场经济，4 步）原生解析通过。
   - 交互播放器 (`src/modules/Reise.tsx`)：步骤 rail（1..N 发丝线指示器）、动手实操本地关键词命中即时判定、3 题过关锁与错题日志草稿一键复制、场景实战 Space 启闭计时器与 Rubric 勾选核对、口试纯本地内存录音（支持试听与下载，绝不上载）。
   - 游戏化与本地向导：`localStorage`（`eflernvault:xp:v1`）静默记录积分与天数连击；向导首页提供三问式（学科→主题→目标）筛选与空态引导；命令面板新增 "XP 导出 JSON" 操作。
4. **App 壳与键盘契约**：
   - 增加第 7 导航项（手写细线罗盘 SVG 16×16，无 emoji）、快捷键 `Alt 7`。
   - 登记 `REISE_SHORTCUTS`（`Enter / →` 下一步，`Space` 计时），同步更新 `HelpOverlay.tsx`。

## 验证结论
- `npm run build` 一次性构建成功，KaTeX 字体及资源正确打包。
- 无头 Edge 截图全量通过（10 科徽章与计数、数学公式纯墨渲染、课程 3 问向导与 4 步播放器流转均正常）。
