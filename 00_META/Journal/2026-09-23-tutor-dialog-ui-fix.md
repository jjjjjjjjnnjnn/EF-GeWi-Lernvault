---
fach: ""
thema: "Tutor-Dialog-UI-Fix"
datum: 2026-09-23
tags: [EF, Meta]
---

# 2026-09-23 AI 助教对话异常根除与 UI Tufte 规范整改（全绿）

## 修复内容

1. **核心异常根除（解决复读欢迎语）**：
   - 提取 `rawHistory` 时强制过滤本地系统欢迎词（`m.id === "welcome" || m.id.endsWith("_welcome") || m.text === welcomeText`），杜绝将本地招呼作为 `assistant` 历史灌入提示词上下文；
   - `sanitizeChatMessages` 严苛对齐 Anthropic / OpenAI 规范：首条非系统消息若为 `assistant`，自动补齐首轮 `user` 问候，杜绝大模型依样画葫芦复读；
   - 欢迎消息分配会话专属唯一 ID `${sessionId}_welcome`，根治 IndexedDB 主键碰撞覆盖；
   - `setMessages` 改用函数式状态更新，避免异步状态陈旧闭包覆盖。

2. **UI 规范与去 Emoji 化**：
   - 错题沉淀按钮移除错误的 Feather `dollar-sign` SVG Path，替换为标准 Bookmark 内联 SVG；
   - 移除按钮文字中的 `📌` emoji，严格遵守 `AGENTS.md` 规则 7；
   - 清理所有侧栏与状态中的残留 emoji（`⚡`、`📌`、`✏️`），全部替换为手写内联 SVG。

3. **引用检测去假阳性**：
   - `renderAiText` 增加问候语、启发式问句（`?`、`？`）、引导词豁免规则，不再对欢迎语和引导提问粗暴打上 `[无出处]` 警告。

4. **顶栏 Tufte 2-Tier 紧凑化重构**：
   - 重构成主控状态层（高度紧凑，模型胶囊+思维强度+教学模式+设置）与学科微工具层（积木/天平/解构/沙盘+导出），彻底消除折行错位与挤压。

## 验证

- 单测：43 个测试套件，256/256 单测全绿通过（`npx vitest run`）；
- 构建：`npm run build` 耗时 3.24s，0 错误 0 警告通过。
