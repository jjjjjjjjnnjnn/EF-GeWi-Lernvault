---
fach: Meta
thema: "shadcn/ui 设计体系集成与产品级 Web 架构升级"
operatoren: [darstellen, analysieren]
klausurrelevant: false
datum: 2026-10-09
tags: [EF, Meta, App, UI]
---

# 2026-10-09 工作日志：shadcn/ui 设计体系原生集成与全站产品级外壳升级

## 1. 任务背景与核心突破

针对用户提出“深入学习借鉴 `shadcn/ui` 设计哲学，将其 UI 架构与组件规范化融入项目资料，并将大量散落的功能聚合升级为一款真正能够让用户上手的现代化网站产品”的核心诉求，本轮完成以下关键交付：

1. **设计令牌对齐 (Design Tokens)**：
   - 在 `src/index.css` 中建立了完整的双向语义令牌映射（`--background`, `--foreground`, `--card`, `--border`, `--muted`, `--accent`, `--ring` 等），全面契合 Tufte 纯黑白学术纸墨风；
2. **零外部依赖自研原子组件库 (`src/components/ui/`)**：
   - 在恪守《AGENTS.md》零新增 npm 依赖与 Tufte 纯黑白无杂色宪法的前提下，纯手写原生 TypeScript 打造了完整的 shadcn 架构组件族：
     - `Button`: 6 种变体、4 种尺寸、原生手绘 SVG 状态、加载态与微交互；
     - `Card`: 完整规范插槽（Header, Title, Description, Content, Footer）；
     - `Badge`: 标签胶囊体系（AFB I-III 难度与学科标记）；
     - `Input`: 纯净原子输入框与光标聚焦环；
     - `Tabs`: 复合选项卡（`TabsList` + `TabsTrigger` + `TabsContent`）；
     - `Dialog`: 无障碍模态弹窗（带极简半透明遮罩、ESC 退出、右上角矢量关闭按钮）；
     - `Separator`: 0.5~1px 发丝分割线；
     - `Progress`: 纯墨色进度条；
     - `Accordion`: 手风琴面板（支持单展与多展模式）；
   - 配套工具 `src/lib/utils.ts` 实现零依赖原生 `cn(...)`；
   - 编写了完整的单元测试 `src/components/ui/ui.test.tsx`（11/11 测试全绿）；
3. **全局应用外壳重构 (`AppHeader.tsx`)**：
   - 统一抽取并重构了全局顶栏，提供：
     - 高层级学习路径面包屑 (`Gymnasium EF / 新知 / 学科专区`)；
     - 现代 Command Bar 全域搜索框（附带 `/` 快捷键提示与即时唤醒）；
     - 学科快速选择胶囊、技能树直达入口、微课工坊直达入口、知识库管理入口、以及带连续打卡徽章的每日冲刺入口；
     - 双语一键平滑切换（DE / 中文）与快捷键帮助；
   - 将原本分散游离的 14 个模块串联为完整顺畅的备考学习闭环。
4. **沉淀设计体系规范文档**：
   - 编制了 [`00_META/SHADCN-UI-DESIGN-SYSTEM.md`](../SHADCN-UI-DESIGN-SYSTEM.md)，并在 [`00_META/INDEX.md`](../INDEX.md) 中建立索引链接。

## 2. 门禁验证结果

- **单元测试**：`npx vitest run` ➔ **74/74 文件全部通过，534/534 测试全部绿灯**；
- **TypeScript 编译与打包**：`npm run build` ➔ **built in 25.27s，0 错误，0 类型告警**；
- **Vault 规范门禁**：`python scripts/vault-check.py` ➔ **PASS**（415 笔记、1942 词卡、358 索引、356 微课全绿）。

## 3. 下一步工作

1. **各核心功能页面迁移至统一 shadcn 原子组件**：
   - 将 `Library.tsx`、`KlausurSim.tsx`、`Labor.tsx` 等现有页面的局部裸按钮与卡片逐步统一到 `src/components/ui/`，保持全站极致视觉一致性；
2. **PhET 仿真教具进阶（`E-phet-sims`）**：
   - 借鉴化学配平与电路实验台，打造纯矢量黑白 Tufte 风格仿真教具。
