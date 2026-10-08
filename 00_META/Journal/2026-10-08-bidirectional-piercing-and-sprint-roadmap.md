---
fach: ""
thema: "Journal 2026-10-08 Bidirectional Piercing and Sprint Roadmap"
operatoren: []
klausurrelevant: false
datum: 2026-10-08
tags: [EF, Meta, Journal]
---

# 2026-10-08 — 吸收借鉴三开源仓库：讲练考双向穿透与会考冲刺 7 天排程

## 1. 吸收与启发落地 (Synthese der Open-Source-Referenzen)
围绕用户痛点“目前我的项目感觉太松散了”，对标三大开源参考仓库进行系统化吸收：
- **借鉴 `EricWang1358/dsh-web-studyhub`**：实现“讲练考高度合一”。打破文献库与会考模拟之间的信息孤岛，实现考点文献与模考错题之间的双向穿透；
- **借鉴 `yoli-mi/good-learning-skill`**：实现“目标倒计时驱动”。为学生建立清晰的阶段冲刺感（Klausurphase 1 · 7-Tage-Abitur-Sprint），告别无目标松散漫游；
- **借鉴 `amosblomqvist/learn`**：保持极简 Tufte 黑白纸墨卡片交互，提供极速展开与折叠控制。

---

## 2. 核心架构与功能交付

### (1) 会考模拟 `KlausurSim` 反向穿透直达文献 (`[Zur Wissensnotiz ->]`)
- **题目卡片直达**：在每道模考任务的来源说明旁，注入 `[Zur Wissensnotiz ->]` 交互按钮，支持一键定位并跳转至对应的考点笔记；
- **错题补漏精准穿透**：阅卷后如果某道题失分或存在遗漏采分点（`missingCriteriaDE`），即时渲染 `[Wissensnotiz nachschlagen ->]`；
- **诊断缺陷列表一键溯源**：在判定 D1–D5 或 MINT 评分缺陷后，列表直接提供精准跳转至相关考点笔记的直通入口。

### (2) 考点文献库 `Library` 正向穿透配套攻坚面板 (`Klausur- & Übungs-Verknüpfung`)
- **顶部快速行动条**：阅读文章顶部提供 `[In KlausurSim üben ->]`、`[Karten drillen]` 以及展开配套攻坚面板按钮；
- **关联合金概念卡**：自动匹配当前笔记学科与核心词，展示 2~3 张核心德语卡片，支持原地翻转速测与一键直达抽认卡背诵；
- **15 NP 满分学术句型**：根据笔记标注的 Operatoren（Darstellen / Analysieren / Beurteilen）动态输出对应的高频学术表达句式（EHZ-Muster）。

### (3) 主页 7 天会考冲刺路线排程 (`7-Tage-Abitur-Roadmap`)
- 在今日聚焦英雄榜与任务列表之间设立 **Klausurphase 1 · 7-Tage-Abitur-Roadmap**；
- 动态标注距首轮大考周倒计时（“Noch 12 Tage bis zur Klausurenwoche”）；
- 7 步攻坚循环：Day 1 概念扫盲 ➔ Day 2 理论模型 ➔ Day 3 材料精读 ➔ Day 4 随堂模考 ➔ Day 5 官方归因 ➔ Day 6 满分表达 ➔ Day 7 考前自查，支持单日任务一键直达与 15 分钟专注流联动。

---

## 3. 门禁与验证
- `npx tsc -b`：0 错误通过；
- `vitest run`：`DashboardCockpit`、`KlausurSim`、`Blocks.contract`、`modules` 全部 100% 绿灯通过；
- `npm run build`：生产构建成功，无任何打包错误；
- `python scripts/vault-check.py`：PASS（notes=412, csv_rows=1942, badnames=0, badglossar=0）。
