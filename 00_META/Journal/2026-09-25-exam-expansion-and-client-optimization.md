---
fach: Meta
thema: "数理社核心学科原创大题扩充与客户端全学科即开即考优化"
operatoren: [analysieren, implementieren, optimieren]
klausurrelevant: false
datum: 2026-09-25
tags: [EF, Meta]
---

# 数理社核心学科原创大题扩充与客户端全学科即开即考优化

> 日期：2026-09-25
> 状态：✅ 全部收官，三道门禁 100% 绿（vault-check PASS(359/1400/272) / Vitest 57 套件 379 测试全过 / npm run build 零错误 / 本地开发服务器持续运行于 1420 端口）

---

## 1. 背景与目标

为了进一步深化 Gymnasium EF 阶段笔试重难点科目的实战提分能力，并解决客户端无目录句柄时 KlausurSim 无法自动挂载十科学科数据的冷启动问题，本次任务执行了两大核心落地：
1. **原创训练大题扩充**：为高频考核科目（Mathe 分析与建模、Physik 运动学与动力学综合、SoWi 社会不平等材料解析）编写符合 NRW 考纲标准的综合大题，配套完整德语 Erwartungshorizont（评分标准、采分点指标与 BE 分值分配）及中文易错陷阱。
2. **客户端全学科即开即考与自评优化**：
   - 升级 `scripts/export-vault-data.py`，将全库 308+ 篇 Markdown 正文解析成包含 `blocks` 的 `generatedVaultNotes.ts`。
   - 在 `src/App.tsx` 与 `src/data.ts` 中建立 `defaultVaultNotes` 兜底体系，消除浏览器打开时 `notes` 为空的限制。进入 `KlausurSim`（Alt+5）立刻展现全部 10 门学科的全真组卷、倒计时和题卡。
   - 在各道大题答题区增设「Erwartungshorizont / Kriterien einblenden」自评对照抽屉，支持即时查阅标准答案与采分指标。

---

## 2. 完成工作

### 1. 核心学科原创大题
- **03_Mathe**: 新建 `03_Mathe/Klausur-Training/Mathe-EF-Klausurtraining-Analysis.md`
  - 聚焦雨水蓄水池截面与容积最值建模（三次多项式）。
  - 涵盖零点分析 (AFB I)、极值判定与最深水深计算 (AFB II)、切线方程推导及依据最大坡度安全标准的工程批判性裁决 (AFB III)。
  - 配套 26 BE 细化评分表与边界值/拐点易错陷阱解析。
- **04_Physik**: 新建 `04_Physik/Klausur-Training/Physik-EF-Klausurtraining-Mechanik.md`
  - 聚焦道路交通复合制动、追及防撞与能量损耗。
  - 涵盖单位换算与减速度质量无关性严密推导（$a = \mu \cdot g$，AFB I）、反应期与制动期复合运动方程建立及干地防撞临界距离计算 (AFB II)、湿滑路面碰撞速度评估与动能平方非线性增长论证 (AFB III)。
  - 配套 24 BE 细化评分表与相对速度极值判定法解析。
- **08_SoWi**: 新建 `08_SoWi/Klausur-Training/SoWi-EF-Klausurtraining-Ungleichheit.md`
  - 聚焦德国收入与财富不平等、代际流动与能力主义悖论。
  - 配备完整学术材料 A（节选）与统计基尼系数材料 B。
  - 涵盖 TATTE 结构化提炼与基尼数据对比 (AFB I)、分层模型与 Sinus-Milieus 理论深度映射及教育扩张滞后剖析 (AFB II)、遗产税改革二分法结构化裁决（Sachurteil 经济效率 vs. Werturteil 机会公平/基本法保障，AFB III）。
  - 配套 26 BE 细化评分表。

### 2. 客户端工程与体验优化
- **全量 VaultNote 数据流导出**：
  - `scripts/export-vault-data.py` 增加 `parse_markdown_blocks`，自动生成 `generatedVaultNotes.ts`。
  - 严格通过 Emoji 清洗（`[\U0001F000-\U0001FAFF\u2600-\u27BF]` 过滤）与学科前缀 ID 隔离。
- **全模块数据贯通**：
  - `src/data.ts` 导出 `defaultVaultNotes`；
  - `src/App.tsx` 为 `KlausurSim`, `Quiz`, `Tutor`, `Planner`, `Mindmap`, `Lernbaum` 挂载 `vault?.notes ?? defaultVaultNotes`。
- **KlausurSim 自评与查看体验提升**：
  - 在 `src/modules/KlausurSim.tsx` 中增加 `revealedCriteria` 状态与切换按钮，允许考生在练习模式下随时对照 Erwartungshorizont 与评分要点。

---

## 3. 门禁验证结果

- `python scripts/vault-check.py`：`notes=359 csv_rows=1400(bad=0) index_links=272(missing=0) reisen=4 vergleich=0 badnames=0 badglossar=0` $\to$ **PASS**
- `npx vitest run`：`57 passed (57) | 379 passed (379)` $\to$ **PASS**
- `npm run build`：`built in 17.37s` $\to$ **PASS**
- 本地服务器：`http://localhost:1420/` 实时在线服务中
