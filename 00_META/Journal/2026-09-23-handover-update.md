---
fach: ""
thema: "Handover-Update: offene Punkte und Startpfad"
datum: 2026-09-23
tags: [EF, Meta]
---

# 2026-09-23 项目交接（交接前门禁 + HANDOVER 结构化）

## 交接前门禁（全部亲跑，不沿用上轮数字）

- App：**55 套件 / 352 测试全绿**（8.01s）· `npm run build` 过（3.07s）· 1420 在线 HTTP 200。
- vault：**PASS** `notes=81 csv_rows=481(bad=0) index_links=198(missing=0) reisen=4 vergleich=0`。
- git：工作树**干净**，`aa12e59` 已与 `origin/main` 同步。
- 生产代码静态扫描：`.tsx` **零 `#hex`、零 active shadow、零 italic、零 emoji**（仅 `index.css` 的 token 定义与 `engine/diagram.ts` 的 SVG 约束串保留颜色）。

## 本次交接整理的 4 处

1. **新增 `🔴 待办与阻塞` 集中段**：此前开放项散落在「已完成」清单的缝隙里（登录墙在 L13、Notenlehre 在 L41、老师三问在 L57、OpenCode URL 在 L24、V2–V4 在 L27），新 agent 极易漏读。现按 **A 老师回复 / B 账号与损坏素材 / C 真人验收 / D 工程待办** 四类集中，每类都写明「为什么阻塞」和「不要做什么」（如未定前不要把 `Lehrplan.md` 的待确认写成定论）。
2. **修 2 处过时行**：「Playwright 电子书脚手架就绪 / 等用户登录一次」与同段下方「电子书抓取**完工** 429/430 页」自相矛盾 → 合并标注抓取已完成。
3. **补 EXT 任务 2/3 的完成标记**：顶部状态一直声称 4 个 EXT 任务全部落盘，但任务 2（Kant 困境集）、任务 3（政治漫画）标题旁无完成标记，而任务 1/4 有 → 补齐，避免下一位 agent 重复派发。
4. **铁律补全 commit 前缀**：原文只列 6 个，实际已用 12 个（含 `[Mathe]/[Physik]/[Chemie]/[Bio]/[Philosophie]/[Musik]/[Sport]`）→ 补全并加「并行协作铁律」。

## 项目当前真实形态（一句话）

内容侧已充足（81 篇合规笔记 / 481 张卡 / 34 篇文本分析 / 4 门互动课程 / 10 科 MINT 各 50 张卡），App 侧从「休眠引擎 + 契约漂移」转为「引擎全部接线 + 样式全量 token 化 + 同步白名单显式化 + 352 测试护栏」。**剩余瓶颈不再是代码，而是需要人推进的三类外部依赖**（老师答复、账号、���人验收）。

## 下个 agent 起步路径

1. 读本文件 → `AGENTS.md` → `00_META/INDEX.md` → 目标科 `Lehrplan.md`。
2. 先看本 Journal 上一条 `2026-09-23-parallel-x1-x8.md` 的「仍需人/真浏览器」清单。
3. 选 D 类工程待办时，遵守：subagent 用 `general`；文件所有权零重叠；共享文件单所有者；主线程独立复核每条缺陷声明。

## 本次提交

`[Meta] handover consolidate open items, mark stale entries and add parallel-collaboration rules`
