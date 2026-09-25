---
fach: Meta
thema: "KI助教交互体系重构与抗漂移精准锚定"
operatoren: [analysieren, implementieren, optimieren]
klausurrelevant: false
datum: 2026-09-25
tags: [EF, Meta]
---

# KI助教交互体系重构与抗漂移精准锚定

> 日期：2026-09-25
> 状态：✅ 全部通过（57 个测试套件 379 项单测 100% 绿、npm run build 零错误、vault-check 校验通过、开发服务器稳定运行）

---

## 1. 痛点定位与针对性解决

针对用户指出的「目前 AI 助教交互能力差、漂移、引用问题、效率问题、内容问题」五大核心痛点，本次进行了系统级的底层架构与前端交互重构：

### 1. 解决漂移与失忆（Anti-Drifting & Context Anchoring）
- **根因**：原启发式（Socratic）模式缺乏初始认知立足点，容易陷入无休止的反问与无关发散；且系统提示词中 `opts.currentSubject` 未能有效注入 `systemContent`，导致助教丢失当前学科考纲语境。
- **解决**：
  - 重构 `src/ai/socratic.ts`：在保留核心关键词（`SOKRATISCH`、`Leitfragen`、`NICHT sofort die fertige Musterlösung`）基础上，强制加入「认知立足点（Scaffolding-Hinweis）」，必须先给出一句话的学科概念锚定，再抛出精准梯级导向问题；严格限制在北威州高中 EF 考纲范围内。
  - 在考纲直出模式（Klausur-Direkt）中固化三段式标准结构：`[Definition & Kernkonzept]`、`[Muster-Klausursatz (AFB II)]`、`[Erwartungshorizont & Typische Fehlerfalle]`。
  - 在 `src/engine/context.ts` 中显式注入 `opts.currentSubject`，确保 Prompt 的 Hot/Warm 区域强锚定学科。

### 2. 彻底解决引用失效与误报（Grounding & Citation Jump）
- **根因**：
  - 用户点击 `[08_SoWi/Vertrag.md#1]` 时，原代码直接将完整路径与 `#1` 行号作为搜索关键词传给 `onJumpToLibrary`，导致笔记库检索结果为 0。
  - 原 `verifySupport` 仅比对单次返回的 top-K 切片 ID，如果大模型引用了知识库真实存在但未在当前 top-K 内的笔记，会误报 `(Unsicher — Beleg nicht im Vault gefunden: ...)`。
  - 非实质行（标号、翻译行、简短问题）被误打上 `[ohne Beleg]` 警告标签。
- **解决**：
  - 在 `src/modules/Tutor.tsx` 引入 `cleanCitationTarget`：自动剥离 `#\d+$` 与 `.md` 路径，精准映射至知识库笔记真实主题（`n.thema`），点击即跳转并高亮该篇笔记。
  - 增强 `src/engine/rag.ts` 的 `verifySupport`：支持传入全部知识库切片（`allVaultChunks`）进行全库路径与文件名宽容校验，彻底消灭虚假报警。
  - 优化 `needsWarning` 过滤逻辑：排除翻译行、标号行、引用行及引导性问题。

### 3. 性能与检索效率优化（Performance & Latency）
- **根因**：原逻辑在每次发送消息时对全部 359 篇笔记进行同步切分（`chunkNotes`），造成不必要的 CPU 阻塞。
- **解决**：
  - 在 `Tutor.tsx` 中使用 `useMemo` 对 `allVaultChunks` 进行常驻缓存。
  - 引入学科切片优先队列（Subject-Prioritized RAG）：当选中学科时，自动将该学科的考点切片置顶于检索候选中，大幅提升 top-K 召回命中率。

### 4. 学科切换与单点复制交互体验提升（UX & Interactivity）
- **解决**：
  - 在助教顶部工具栏新增 Tier 2 学科胶囊行（`Alle`、`SoWi`、`Deutsch`、`Philosophie`、`Mathe`、`Physik`、`Chemie`、`Bio`、`Englisch`、`Musik`、`Sport`），与全局 `activeFach` 双向联动。
  - 输入框上方新增 5 个快捷提问芯片（Prompt Chips）：`核心定义 (AFB I)`、`答题原句 (AFB II)`、`评价标准 (AFB III)`、`易错防坑点`、`出一道考题`，支持一键填充。
  - 每条助教回复底部新增独立的「Kopieren / 复制」按钮，配备符合规范的内联 SVG 与即时复制状态反馈。

---

## 2. 验证结果

- **单元测试**：`npx vitest run` 57 个测试文件全部通过（379 / 379 tests passed）。
- **静态与规范审查**：`modules.test.tsx` 中关于无 Hex、无阴影、无斜体、无 Emoji、SVG 规范（16x16 统一结构）、ARIA 语义（3 个以上 polite status、dialog modal）全部零违规。
- **打包验证**：`npm run build` 耗时 4.21s，打包成功。
- **知识库一致性**：`python scripts/vault-check.py` 校验完全通过（PASS）。
