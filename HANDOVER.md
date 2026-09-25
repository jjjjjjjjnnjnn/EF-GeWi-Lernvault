# HANDOVER — 一页交接（新agent/用户先读我）

> 目标：Gymnasium EF (NRW, Schloss Heessen) 十科提分，中德双语。
> Public repo: https://github.com/jjjjjjjjnnjnnj/EF-GeWi-Lernvault
>
> 📦 **历史状态归档**（2026-09-24 及以前的全部里程碑 + 外部 AI 任务包）→ [`00_META/HANDOVER-Archiv.md`](00_META/HANDOVER-Archiv.md)

## 新agent阅读顺序（5分钟接手）

1. **本文件** → 2. [`AGENTS.md`](AGENTS.md)（规范） → 3. [`00_META/INDEX.md`](00_META/INDEX.md)（导航）
→ 4. [`00_META/Blocker-Register.md`](00_META/Blocker-Register.md)（**卡在哪**） → 5. 目标学科 `Lehrplan.md` → 6. `00_META/Journal/` 最新一篇（当前上下文）

---

## 项目是什么（30 秒）

- **vault**（Obsidian 知识库，**内容真相源**）+ `App-EF-Lernvault/`（Tauri 桌面学习软件，**只读 vault、不写回**）。
- 目标：德国 NRW Gymnasium EF 十科笔试/口试提分，中德双语，**完全离线**。
- **内容铁律**：所有题目材料只能来自用户自己的笔记原文 —— **超纲率 = 0**。
- **当前规模**：笔记 **354** · Anki 卡片 **1396** · 术语表 **751 行** · 十科 Abi-Baum 应试树 · 考纲体系（NRW 十科 + 中国理科四科 + 中德映射）。

---

## 当前状态（2026-09-25）

- ✅ **S8 十科笔记生产收官**：224 篇新笔记（全库 127 → 352），十科 §4 施工图 **224/228 = 98.2% 完成**。每篇八段结构 + 双语 + 三要素（知识点/解题方法/真题训练）+ 逐条来源标注。最高价值：**Sport 6→26 篇**（IF a–f 全通）、**Bio 的 Genetik 与 Ökologie 两大真断层从零建起**、理科 LK 深层。索引 [`00_META/S8-Noten-Index.md`](00_META/S8-Noten-Index.md)。
- ✅ **官方源本地化**：`_Downloads/CURRICULUM/` 固化 **218 个官方 PDF / 127MB**（KLP 十科 + 2027 新版 · Operatoren 14 · Abitur-Vorgaben 72 · IQB Poolaufgaben 64 · 中国课标 21），每件配 `.quelle.txt`，**全部 gitignored**。
- ✅ **规范维护轮**：文件名规范化（2 处 + 7 引用同步）· `vault-check.py` 新增 `badnames` / `badglossar` 两项强制校验 · `AGENTS.md §1` 笔记落位改为确定规则 · `_Downloads` 探针残留清理（40 → 14 件）。
- ✅ **阻塞项处理轮**：建立 [`Blocker-Register.md`](00_META/Blocker-Register.md)（A 老师问询 15 / B 账号 6 / C 真人验收 3 / D 工程债 7）+ [`Lehrkraft-Anfragen.md`](00_META/Lehrkraft-Anfragen.md)（可直接转发的德语问询稿）。

---

## 🔴 下一步（接手后按此顺序）

### 1. 先跑门禁建基线（3 条命令，确认「全绿」不是文档声明）

```bash
python scripts/vault-check.py                      # 期望 PASS(354/1396/268)
cd App-EF-Lernvault && npx vitest run              # 期望 57 套件 / 379 测试
cd App-EF-Lernvault && npm run build               # 期望 ✓ built
```

### 2. 把德语问询稿发给老师 ← **唯一能解锁剩余阻塞的动作**

复制 [`00_META/Lehrkraft-Anfragen.md`](00_META/Lehrkraft-Anfragen.md) 的「Nachricht」整段。
**阻断面排序**：① 🔴 Sport 2 个 Akzentuierungs-IF → ② 🔴 Deutsch Drama 书名 → ③ 🟡 Musik 学期主题 → ④ 🟡 Englisch 第三文化国家 → ⑤ 🟡 Sport BF/SB / Abitur 轨道。

### 3. 答案到达后 → 按 [`Blocker-Register.md`](00_META/Blocker-Register.md) §F 填空

§F 已备 5 份填空脚手架（Deutsch 戏剧专属段 / Englisch 小说段 / 第三文化国家替换清单 / Musik 学期作品段 / Sport IF 冲刺计划）。**只补占位符，不重写结构。**

### 4. 剩余非阻塞待办

- **Chemie 3 项「改造既有文件」**：升级 `05_Chemie/CN-Chemie-Tricks.md`、精简 `05_Chemie/Klausur-Training/CN-Chemie-Training.md` 等。
- **Philosophie 1 项**（`Lernbaum-Philosophie.md` §4 尾项）。
- **App 侧 `src/baum/*.ts` 仍是 EF 版数据**，需从新版 Markdown 派生。

### 5. 可选（S9 建议）

把 `_Downloads/CURRICULUM/_IQB/` 的 Poolaufgaben 与 `_Abitur-Vorgaben/` 的 Beispielaufgaben（共 136 份官方题）系统转化为**原创改编训练题**，补进各科 `Klausur-Training/` —— 素材已在手，且完全合规。

---

## 待办与阻塞（全部需要「人」推进）

> **完整台账**：[`00_META/Blocker-Register.md`](00_META/Blocker-Register.md) · **德语问询稿**：[`00_META/Lehrkraft-Anfragen.md`](00_META/Lehrkraft-Anfragen.md)

| 类 | 内容 | 状态 |
|---|---|---|
| **A 老师问询** | 15 项（4 科内容走向） | 🔄 待老师回复，问询稿已备 |
| **B 账号权限** | StanSi/SESAM/FWU/eduki 登录墙真题 · Notenlehre Stufe 4 PDF 损坏需重发 | 🔄 部分已由 218 个官方公开 PDF 替代 |
| **C 真人验收** | V2–V4 走查 · 窄屏真机 · Tauri 首次打包 | ⏸️ 暂缓（涉及 App） |
| **D App 工程债** | 7 项（worker 零调用方 · chunk 警告 · `.gitignore` 过宽等） | ⏸️ 暂缓（涉及 App） |

⚠️ 未定项在正文一律标 `⏳ 待确认：` 并继续按考纲常规分支展开（**不停摆**）；相关 `Lehrplan.md` 的「待确认」段**不要写成定论**。

---

## 环境（接手必备）

- 日常开发走本地 WebUI：vault 根目录跑 `. .\scripts\webui.ps1`（起 1420 + 自动开浏览器；热更新）。
- exe 仅发版时打（`npx tauri build`，需 VS2022 C++ workload + rust stable；**从未实跑**）。
- 新终端先跑：`. .\scripts\dt-env.ps1`（设 DEEPTUTOR_HOME + UTF-8，防 data 污染 vault / 防 GBK 崩溃）。
- DeepTutor 家目录：`C:\Users\rongj\.deeptutor-home`（vault 外）。LM Studio 需开着（模型 llama-3-sauerkrautlm-8b-instruct）。

---

## 铁律

- **一次只做一科一 commit**（前缀 `[Deutsch]/[Englisch]/[Mathe]/[Physik]/[Chemie]/[Bio]/[Philosophie]/[SoWi]/[Musik]/[Sport]/[App]/[Meta]`），不跨科混 commit。
- **永不进 git**：`data/`、`_Downloads/`、`*.apkg`、App 构建产物（`target|gen|dist|*.key|*.exe|*.msi`）、`.workbuddy-ai/`。
- **只写原创笔记**（版权红线见 `AGENTS.md §4`）：✅ 可引 NRW 官方公开题的**题干结构**；❌ 不抄出版社教辅原题、不搬教材正文；中国题只做原创改编。每题标来源层级，**解析必原创**。
- **并行协作**：subagent 用 `general`（`explore` 无写盘工具）；文件所有权零重叠；**主线程必须独立复核每条「缺陷」声明**；共享文件（`index.css`/`App.tsx`/`keys.ts`/`examComposer.ts`/`parser.ts`）只能单一所有者。
- **提交前必跑** `python scripts/vault-check.py`，必须 PASS。
