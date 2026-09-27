---
fach: Meta
thema: "Duell-Werkzeug-Fehlzuordnung behoben und Render- sowie Scroll-Performance optimiert"
datum: 2026-09-27
tags: [EF, Meta, Journal, Performance, Pedagogy, FormulaScaffold, Lernreise]
---

# 2026-09-27 施工日志：第5步对决教具错配根治 + 滚动卡顿与刷新迟缓专项性能优化

## 1. 做了什么（Was wurde getan）

### 1.1 根治第5步对决教具错配（`firefox.exe_20260927_192355.png` 用户抓包）
- **现象定位**：在化学课《Duell der Wege: pH-Rechnung gegen Indikator-Deutung》中，第5步（方法对决）下方被注入了默认的数学导数脚手架（$f(x)=x^2$）。
- **根因分析**：
  1. `Reise.tsx` 中第5步类型为 `ausprobieren`，因未显式声明工具，被自动回退逻辑 `getAutoToolForContext` 强制塞入 `formula`。
  2. 第5步属于概念与方法路线对决（Weg A vs. Weg B），属于思辨选择环节，绝大多数情况不需要物理/数学沙盒教具。
  3. `FormulaScaffold` 缺乏科目与主题上下文感应，无论什么科目均回退到数学默认示例。
- **治理方案**：
  1. **防御性阻断**：在 `Reise.tsx` 中增加 `isDuelStep = s.stepNumber === 5 || cleanAufgabe.includes("VERGLEICH") || title.includes("duell")` 判据。对于对决步骤，严格禁止任何自动回退工具注入，保持页面纯净聚焦。
  2. **学科上下文注入**：为 `FormulaScaffold` 增加 `fach` 与 `thema` 属性感知。针对化学 pH 给出专属预设（$\text{pH} = -\log_{10}[H_3O^+]$、$K_w=10^{-14}$），化学平衡给出化学平衡常数预设，物理弹簧振子给出固有周期公式（$T=2\pi\sqrt{m/D}$），生物酶促反应给出米氏方程，彻底杜绝跨科模板泄露。

### 1.2 消除滚动卡顿与首屏/刷新延迟（性能专项治理）
- **现象定位**：课程页面在长文档滚动时出现肉眼可见的掉帧卡顿，页面刷新和切换课程耗时变长。
- **根因分析与治理**：
  1. **滚动监听 layout thrashing 与组件重渲染风暴**：
     - 原 `Reise.tsx` 的 `scroll` 监听器无节流地每秒触发 60~120 次 `getBoundingClientRect()` 布局重排，且每次无条件调用 `setActiveDocStepIdx(currentIdx)`。
     - 治理：引入 `requestAnimationFrame` 限制计算频率，并加入 `lastActiveDocStepIdxRef` 记忆比对。只有当高亮目录索引真正跨步变化时才调用 `setState`，使持续滚动过程中的无效重渲染降为 0！
  2. **2,150 步全文 Markdown 启动时同步解析阻塞**：
     - 原 `reise.ts` 在模块加载时通过 `import.meta.glob` 对 269 门课程的 2,150 个小节执行了密集的 `parseBody(content)` 正则分块解析。
     - 治理：将 `SchrittEntdecken` 与 `SchrittReflexion` 的 `blocks` 改造为惰性 getter（`get blocks()`）。课程目录与元数据启动时瞬时加载（< 15ms），仅当用户实际点开某课时才按需解析当前小节。
  3. **KaTeX 异步挂载状态级联重渲染**：
     - 原 `MathHtml.tsx` 每次挂载均以 `null` 启动并触发一次异步微任务更新。
     - 治理：在模块级缓存加载好的 `katexModule`，在 `useState` 初始化阶段直接执行同步渲染，消除单个页面数十个公式引发的异步状态波浪。

## 2. 验收结果（Prüfung & Gates）

1. `npm run build`（`tsc -b && vite build`）：在 4.71s 内一次性编译打包通过，0 错误，0 警告。
2. `python scripts/vault-check.py`：PASS（notes=396, reisen=269, badnames=0, badglossar=0）。
3. `python scripts/audit-pedagogy-integrity.py`：6 项指标全部为 0（269 门课程全绿）。
4. 本地工作区与 Git 状态：通过 `[App]` 单独 commit 落库，分支处于 clean 状态。

## 3. 待办与后续（Offene Punkte）

- 保持本地 Vite 开发服务器（端口 1420）正常运行，待用户随时预览验证。
