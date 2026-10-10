---
fach: Meta
thema: "Phase 3.3 ~ 3.5 交付：罗尔斯正义论无知之幕分配沙盘、双教具微课挂载与全科宏观星图五维打分补丁机"
operatoren: [darstellen, analysieren, beurteilen]
klausurrelevant: false
datum: 2026-10-10
tags: [EF, Meta, App, Philo, SoWi, Rawls, Wahlsystem, MacroView, Fehlerlog]
---

# 2026-10-10 工作日志：Phase 3.3 ~ 3.5 交付 — 罗尔斯分配沙盘、教具微课挂载与全科星图打分补丁机

## 1. 任务背景与核心目标

依据会话研发规划，完成以下三大任务闭环：
1. **选项 A（已交付）**：研发哲学标志性工坊《罗尔斯正义论与无知之幕分配天平》(`RawlsVerteilungsSim.tsx`)；
2. **选项 B（已交付）**：打通微课内嵌教具调度网格，将《德国联邦议院选举沙盘》(`WahlsystemSim`) 与《罗尔斯分配天平》(`RawlsVerteilungsSim`) 挂载进对应微课；
3. **选项 C（已交付）**：在全科宏观星图（`AllSubjectsMacroView.tsx`）的战役模态框内集成 D1–D5 五维自查评分量表与标准化 `Fehlerlog.md` 表格补丁一键生成与复制机。

---

## 2. 核心架构与落地细节

### ① 选项 A：罗尔斯正义论与无知之幕分配天平 (`RawlsVerteilungsSim.tsx`)
- **多层分配与激励博弈建模**：
  - 5 阶层收入分布模拟，支持调节再分配税率（0% ~ 80%）与最低保障转移支付底线；
  - 植入拉弗激励曲线（Laffer-Effekt），过高税率将导致无谓效率损失（Deadweight Loss）与 GDP 缩减；
  - 实时解算洛伦兹曲线积分与基尼系数（Gini-Koeffizient）；
- **Tufte 纯黑白动态道德天平（Moralische Waage）**：
  - 纯 SVG 物理倾角动画，左盘承载市场效率与 GDP，右盘承载弱势群体（Worst-off）基本保障与尊严；
  - 直观呈现罗尔斯 Maximin 差异原则（Differenzprinzip）何时满足；
- **无知之幕角色抽取与 15 NP 会考评分台**：
  - 支持遮蔽社会身份（Schleier des Nichtwissens），随机揭晓身份（乞丐、工人、中小企业主、高收入学者、资本家）并判定尊严保底状态；
  - 内置 4 大思想实验预设（罗尔斯正义论、功利主义、自由意志主义夜警国家、高福利平等国家）；
  - 配套独立测试套件 `RawlsVerteilungsSim.test.tsx` 10/10 绿灯通过；
  - 同步注册至 `registry.ts`、`Labor.tsx`、`laborRegistry.ts`，更新 `00_META/Glossar-DE-ZH-GeWi.md` 与 `00_META/INDEX.md`。

### ② 选项 B：微课内嵌教具调度网格打通与真实课程挂载
- **微课教具网格支持**：
  - 在 `App-EF-Lernvault/src/modules/Reise.tsx` 的 `renderEmbeddedTool` 中完善动态挂载路由，支持 `wahlsystem-sim` 与 `rawls-sim`（及别名兼容）；
- **微课内容挂载**：
  - `Lernreise/Philo-Gerechtigkeit-Rawls-Schleier-des-Nichtwissens-L1.md` 步骤 2 挂载 `[Werkzeug: rawls-sim]`；
  - `Lernreise/SoWi-Parteien-Willensbildung-L1.md` 步骤 2 挂载 `[Werkzeug: wahlsystem-sim]`；
- **集成测试验证**：
  - 编写集成测试套件 `Reise.toolsIntegration.test.tsx`，真实挂载并断言沙盘渲染正常（2/2 绿灯通过）。

### ③ 选项 C：全科星图 AFB III 五维打分台与 Fehlerlog 补丁机
- **D1–D5 五维打分量表（0–15 NP）**：
  - 在 `AllSubjectsMacroView.tsx` 的跨学科大题模拟沙盒内植入会考五维自查量表（D1 审题与Operator、D2 理论因果链、D3 跨学科融通、D4 专业术语精度、D5 独立评价闭环，每项 0–3 点，折算 0–15 NP）；
- **标准化 Fehlerlog.md 补丁生成与一键复制**：
  - 依据评分状态与用户草稿自动诊断生成格式化 Markdown 表格行：
    `| YYYY-MM-DD | 战役标题 (AFB III Operator) | 错因/失分诊断 | 考点强化与核心论据 | 复习跟踪日期 |`；
  - 遵循只读 Vault 契约，支持一键复制到剪贴板，用户可无缝粘贴沉淀至对应学科的 `Klausur-Training/Fehlerlog.md`；
- **契约清理与测试覆盖**：
  - 扩充测试 `AllSubjectsMacroView.test.tsx` 至 10/10 绿灯通过；
  - 清理 `RawlsVerteilungsSim.tsx` 残留的特殊符号（`✓`、`✕`、`🇨🇳`），消除 `modules.test.tsx` 门禁拦截。

---

## 3. 门禁验证与质量指标

1. **自动化测试套件**：
   - `npx vitest run`：**81 个测试文件，600 项单元与集成测试 100% 全部通过**；
   - `modules.test.tsx` 零非法符号违规，100% 符合 Tufte 纯黑白学术纸墨宪法。
2. **TypeScript 编译校验**：
   - `cmd /c "npx tsc -b"` 零报错（Code 0）。
3. **Vault 完整性自检**：
   - `python scripts/vault-check.py` 严格校验通过：`notes=416 csv_rows=1942(bad=0) index_links=366(missing=0) reisen=356 vergleich=0 badnames=0 badglossar=0 PASS`。
4. **Git 原子提交**：
   - 严格遵循《AGENTS.md》单科单层原子规范，完成 `[App]` 提交（Commit `c61ad2f`）。

---

## 4. 后续规划与建议演进

1. **理科标志性工坊攻坚**：
   - 推进 MINT 理工标志性工坊（如微积分极限逼近滑块、化学酸碱中和滴定曲线与缓冲容量沙盘）；
2. **真题池与大题推演联动**：
   - 结合 `760 份 PDF 真题池`，探索真题解析切片与全科星图战役题型的智能关联。
