---
fach: ""
thema: "shadcn/ui 设计体系集成与产品级 Web 架构规范"
operatoren: [darstellen, analysieren]
klausurrelevant: false
datum: 2026-10-09
tags: [EF, Meta, App, UI]
---

# shadcn/ui 设计体系集成与产品级 Web 架构规范

> **目标**：将原本散落的数百篇笔记、数千张词卡、350+微课与实验仿真，通过借鉴 `shadcn/ui` 现代设计体系，整合升级为一款具备 Vercel/Linear 级高质感、让用户流畅上手并持续使用的现代化 Web / 桌面一体化备考产品。

---

## 一、 为什么选择 shadcn/ui 及其在项目中的取舍

### 1. 核心设计哲学
- **代码自治 (Not a Component Library)**：不引入庞大臃肿的黑盒 npm 库，所有组件皆为工作区内自研源码（位于 `src/components/ui/`），完全自主可控；
- **设计令牌驱动 (Design Tokens)**：全量使用 CSS 变量（`--background`, `--foreground`, `--card`, `--border`, `--muted`, `--ring` 等），与深浅主题及 Tufte 学术纸墨风 100% 融合；
- **极简极高对比度**：采用纯粹中性色阶（Zinc / Neutral 灰度），杜绝花哨杂色与刺眼霓虹，回归阅读与专注本源。

### 2. 结合本项目《AGENTS.md》的取舍与约束

| shadcn/ui 官方特性 | 本项目本土化策略与取舍 | 考量与收益 |
| :--- | :--- | :--- |
| 依赖 `@radix-ui/react-*` 等多个 npm 包 | **纯原生 React 19 + TypeScript 自研实现** | 恪守零新增 npm 依赖铁律，打包体积减少，离线性能极致 |
| 依赖 `clsx` + `tailwind-merge` | 原生高效 `cn(...)` 实现 (`src/lib/utils.ts`) | 零外部依赖，支持条件对象、数组嵌套与类型安全 |
| 依赖 Radix FocusTrap / Portal | 原生语义化 HTML 与键盘事件监听 (Escape / Tab) | 行为轻巧，纯 DOM 结构，易于单元测试模拟 |
| 默认现代暗黑科技风 | **Tufte 纯黑白学术纸墨风 (Black & White)** | 严禁绿色与多余彩色，统一 `--ink` 墨色与 `--paper` 纸面底色 |

---

## 二、 基础设计令牌 (Design Tokens)

在 `src/index.css` 中建立了完整的双向兼容令牌映射：

```css
:root {
  /* 页面底色与前景墨色 */
  --background: var(--paper);        /* #FAFAFA */
  --foreground: var(--ink);          /* #18181B */

  /* 卡片与弹出层 */
  --card: var(--surface);            /* #FFFFFF */
  --card-foreground: var(--ink);
  --popover: var(--surface);
  --popover-foreground: var(--ink);

  /* 主交互色与次级色 */
  --primary: var(--ink);
  --primary-foreground: #FFFFFF;
  --secondary: var(--paper-subtle);  /* #F4F4F5 */
  --secondary-foreground: var(--ink);

  /* 弱化状态与边框 */
  --muted: var(--paper-subtle);
  --muted-foreground: var(--gray);   /* #71717A */
  --border: var(--line);             /* #E4E4E7 */
  --input: var(--line);
  --ring: var(--focus);
}
```

---

## 三、 标准原子组件库 (`src/components/ui/`)

全部组件均位于 `App-EF-Lernvault/src/components/ui/`，统一对外导出：

```tsx
import {
  Button,
  Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter,
  Badge,
  Input,
  Tabs, TabsList, TabsTrigger, TabsContent,
  Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription,
  Separator,
  Progress,
  Accordion, AccordionItem, AccordionTrigger, AccordionContent,
} from "./components/ui";
```

### 1. `Button`
- **Variants**：`default`（主墨色）、`secondary`（次纸面）、`outline`（极细边框）、`ghost`（透明悬浮）、`link`（下划线文本）、`destructive`（警示红）；
- **Sizes**：`sm` (h-7)、`default` (h-8)、`lg` (h-9)、`icon` (h-8 w-8)；
- **交互**：原生内联纯 SVG 图标，点击微缩动效 (`active:scale-[0.99]`)。

### 2. `Card`
- 结构化插槽：`CardHeader` ➔ `CardTitle` ➔ `CardDescription` ➔ `CardContent` ➔ `CardFooter`；
- Tufte 纯黑白无杂色高对比度边框卡片，适配自适应网格。

### 3. `Badge`
- 用于学科标签、难度标记（AFB I-III）、学段（EF / Q1）与完成态；
- 紧凑微型排版 (`text-[10px] font-mono font-bold`)。

### 4. `Input`
- 纯净无杂色输入框，外显细线边框，专注态触发微弱外发光聚焦环。

### 5. `Tabs`
- 复合组件架构 (`value` / `onValueChange`)；
- 支持药丸胶囊选项卡 (`TabsList` + `TabsTrigger`)，滑动切换与内容懒卸载。

### 6. `Dialog`
- 现代模态浮层：自带半透明极简背景遮罩 (`bg-black/40 backdrop-blur-[2px]`)、ESC 键监听自闭、右上角矢量极简关闭按钮。

### 7. `Separator` & `Progress`
- `Separator`：0.5~1px 细发丝分割线（支持横纵）；
- `Progress`：极简纯墨色进度条，用于会考进度与记忆熟练度呈现。

### 8. `Accordion`
- 手风琴折叠面板：支持 `single` 与 `multiple` 模式，用于考点自查细则与采分点拆解。

---

## 四、 散落功能产品化：全局应用外壳 (`AppHeader`)

为了让散落在各模块的 415 篇笔记、1942 张卡片与各个工具融为一体，构建了统一的 **`AppHeader.tsx`**：

```
+-----------------------------------------------------------------------------------------------+
| [Gymnasium EF] / [新知] / [学科专区 · SoWi]  |  [🔍 检索考点、笔记或微课... /]  |  [Fach: SoWi ▼] [技能树] [微课工坊] [知识库] [冲刺 18d] | [DE/中] [?] |
+-----------------------------------------------------------------------------------------------+
```

1. **左侧高层级面包屑 (Breadcrumb)**：
   实时反映当前所在学段、核心工作区类型与活动模块（若选中学科则附带学科胶囊）；
2. **居中全局命令搜索条 (Global Command Bar)**：
   带有放大镜图标与快捷键药丸 `<kbd>/</kbd>`，支持一键键入立即聚焦；
3. **右侧功能快速访问网格**：
   一站式穿梭技能树 (`Skill-Tree`)、书本课程工坊 (`Pipeline`)、数据中心 (`Vault`) 与每日连打打卡 (`Sprint`)，并提供全局双语一键切换。

---

## 五、 后续开发准则

1. **新业务组件优先使用 `src/components/ui/` 原子组件**，杜绝随意写裸 `button` 或裸 `input` 产生杂乱内联样式；
2. **严禁引入任何第三方 UI 库**，有新原子组件需求时，以相同模式在 `src/components/ui/` 中手工增补；
3. **坚持模块化四步闭环铁律**：独立制作 ➔ 独立测试 ➔ 接入集成 ➔ 全量门禁校验。
