---
fach: App
thema: "学科教具重叠功能剥离清洗与文科直观交互工坊全量重做 (GewiInteractiveWorkbench)"
operatoren: [analysieren, restrukturieren, modellieren, validieren]
klausurrelevant: false
datum: 2026-10-04
tags: [EF, App, Werkzeuge, Labor, GeWi, Philosophie, Deutsch, SoWi]
---

# 学科教具重叠功能剥离清洗与文科直观交互工坊全量重做 (GewiInteractiveWorkbench)

> 日期：2026-10-04  
> 状态：✅ 全量落地，通过 TypeScript 校验与双门禁自动化测试，已备份推送至 GitHub

---

## 1. 用户需求落实与深度重做

用户指出：
> *"目前学科教具板块和其他部分存在功能重叠，进行处理"*  
> *"你新设计出来的文科板块的内容极度不直观。直接重做。学习其他符合要求的方式制作。我希望直观，能直接理解 比如天平，引导做题之类的 学习分析，给出创造性方案"*

### 动作 1：学科教具板块（`Werkzeuge`）功能重叠处理
- **重叠诊断**：此前 `Werkzeuge` 中混入了供求沙盘（`MarktMechanismusSim`）、导数切线（`TangentSlider`）与运动学小车（`KinematikSim`），与 `Labor`（互动实验台）存在大面积重复；
- **重构落地**：
  1. 将客观物理/数学/经济系统仿真全量收敛至 `Labor` 模块；
  2. `Werkzeuge` 纯化为 **「学科会考思维与解题认知脚手架（Scaffolding）」** 专属空间，仅保留 5 大核心解题教具：
     - ⚖️ **辩证价值天平 (Urteils-Waage / BalanceBoard)**
     - 🧱 **会考论证句式积木 (Satzbau-Lego)**
     - 🧮 **理科规范解题四步脚手架 (MINT-Scaffold / FormulaScaffold)**
     - ⏱️ **口试模拟时钟与审题矩阵 (Mündlich-Matrix / OralExamTimer)**
     - 🔍 **原典文本解剖台 (Textanalyse-Labor / GeWiReadingLab)**
  3. 底部增设边界指引胶囊，引导需要客观物理/经济实验的用户前往 `Labor`。

---

### 动作 2：文科板块彻底重做为直观沉浸工坊 (`GewiInteractiveWorkbench.tsx`)
彻底废除文科套用理科滑块的机械做法，依据北威州文科教学论（Fachdidaktik GeWi）打造三大维度、多套直观工坊：

1. **⚖️ 辩证与道德天平工坊 (Urteils- & Ethik-Waage)**
   - 覆盖自由意志与李贝特实验、边沁功利主义、阿伦特平庸之恶、福利国家、生态税与最低工资争议；
   - **交互机制**：
     - 实体物理动态杠杆 SVG 天平，随论据权重实时倾斜（-18° 到 +18°）；
     - 支持正反方砝码（1星事实经验、2星制度系统、**3星基本法第1条人尊/核心伦理绝对律令**）自由添加/移除；
     - 实时判定指针状态（`🟢 倾向支持` / `🔴 倾向否定` / `⚖️ 两难困境`）；
     - 严格依照 **Sachurteil (事实裁决)** 与 **Werturteil (价值裁决)** 生成 15 分满分德语裁决句。

2. **🏛️ 康德绝对命令 4 步检验机 (Kantscher Navigator)**
   - 针对假言命令 vs 定言命令考点，提供四步递进式引导做题工作台：
     - **Schritt 1 (准则提取)**：选择生活实例（借钱不还、作弊求职、绝境自杀、见死不救）；
     - **Schritt 2 (普遍自然法则)**：设定全人类普遍遵从；
     - **Schritt 3 (矛盾检验)**：直观判定“思辨逻辑矛盾 (Widerspruch im Denken)”与“理性意志矛盾 (Widerspruch im Wollen)”；
     - **Schritt 4 (义务定性)**：判定完全义务（Vollkommene Pflicht，绝对禁止）或不完全义务（Unvollkommene Pflicht）。

3. **🎭 弗莱塔格戏剧五幕构建台 (Freytag-Drama-Studio)**
   - 针对《浮士德 I》等戏剧，构建可视化的五幕张力抛物线（Exposition → Steigerung → Peripetie → Retardation → Katastrophe）；
   - 点击任意幕次节点，动态高亮张力曲线，剖析原著核心台词、戏剧结构动力学功能（如第 4 幕延缓动作的虚假希望作用）与会考采分要点。

4. **🎵 诗歌韵律节拍打击器 (Lyrik-Metrum-Taktstock)**
   - 逐音节点击切换轻读（`◡` Senkung）与重读（`—` Hebung）；
   - 点击“试听节拍律动”，通过 Web Audio API 动态合成轻重拍点击声，身临其境感受节奏；
   - 自动识别抑扬格（Jambus）、扬抑格（Trochäus）、扬扬抑（Daktylus）、亚历山大体（Alexandriner）与韵式结构（抱韵/交叉韵）。

---

## 2. 自动化验证与质量门禁

- **TypeScript 类型校验**：`npx tsc -b` 0 errors 通过；
- **生产打包构建**：`npm run build` 7.16s 编译成功；
- **双门禁全量测试**：
  - `python scripts/vault-check.py`：401 笔记、1921 词条、332 链接、356 微课全部 PASS；
  - `python scripts/simulate-user-interaction.py`：全学科 403 个知识树节点 100% 通过；
- **持续服务**：本地服务（`http://localhost:1420/`）平稳运行中。
