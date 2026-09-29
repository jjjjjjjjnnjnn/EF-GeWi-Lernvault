---
fach: Meta
thema: "Faust-Klausur-Leselabor & SoWi-Orderbuch-Schritt4-Entzerrung"
datum: 2026-09-29
tags: [EF, Meta, Journal, App, Deutsch, SoWi]
---

# 2026-09-29 施工日志：歌德浮士德六维会考阅读工坊与研习步骤4解耦

## 1. 做了什么

1. **彻底解决文案串味与微课描述硬编码**（`LectureTheatre.tsx`）：
   - 将原写死的 SoWi 宏观经济与资本投资法文案重构为动态属性 `courseDescDE` / `courseDescZH`，考纲标准抬头按学科自适应（`Gymnasium EF · ${subject}`）。
   - `SowiDepotLecture` 与 `FaustLectureTheatre` 显式注入各自学科考纲背景描述，消除了文学微课显示经济学解说的 bug。

2. **化解研习步骤 4 排版拥挤与内容重复冲突**（`Lernreise/SoWi-Wertpapierdepot-Orderarten-L1.md` / `-DE-L1.md` 与 `Reise.tsx`）：
   - 新建专精交互教具 `OrderbuchSimulator.tsx`（Xetra 电子订单簿深度、市价/限价/止损单撮合、滑点 Slippage 动态计算与价差 Spread 观察）。
   - 研习步骤 4 标题与 TARGET 调整为聚焦订单簿撮合与委托类型实操，杜绝整门 5 章大课在单个步骤卡片中暴力内嵌造成的排版拥挤与测试题重复。
   - `Reise.tsx` 内嵌 `DepotStepWidget`，默认展示精炼的订单簿实验台，并提供优雅折叠展开按钮供学生深入探究完整微课剧场。

3. **新建德语文学原著细读与六维会考解剖工坊**（`FaustReadingLab.tsx`）：
   - 彻底摒弃粒子模拟与单纯幻灯片形式，严格按照北威州高中德语会考（KLP NRW Abitur Aufgabentyp 1A）标准打造。
   - **左栏（原典文献流）**：歌德《浮士德 I》经典篇目（第354~385行黑夜学者独白 / 第1692~1711行书斋立约豪赌），配备标准 5 进位行号（Zeilennummern）、逐行点击高亮显微镜、直译与义理、修辞手法（Exclamatio, Oxymoron, Knittelvers, Antithese）以及三种文本透视滤镜（修辞、考纲核心词、心境裂变）。
   - **右栏（六维真题解剖矩阵）**：全面覆盖考纲全维度——
     - 1. **Inhalt & Fakten**（四大学科与资产精神清零 AFB I）
     - 2. **Hauptthema & Motiv**（泰坦求索与非停留赌约 AFB II）
     - 3. **Handlung & Dramenkontext**（学者悲剧开端与魔鬼契约因果链 AFB II）
     - 4. **Wortschatz & Semantik**（Tor, Laffen, kramen 等历史语用内涵 AFB II）
     - 5. **Stilmittel & Rhetorik**（Knittelvers音步、随韵、破折号与激情排比 AFB II）
     - 6. **Figurenzeichnung & Psychologie**（极度自傲与极度自卑的悖论双重人格 AFB III）
   - 配套**官方会考评分标准（Erwartungshorizont / EHZ）**采分点明细、**德语标准答题句式积木（Klausur-Formulierungshilfe）**一键复制功能，以及**论述文开头破题标准句式（TATTE-Satz）**示范。
4. **展厅（DesignLab.tsx）集成**：
   - 将 `FaustReadingLab` 作为文科首发王牌工坊置顶展示，默认为首选试验台。

## 2. 门禁验证

- `cmd /c "npx tsc -b"`：0 错误，类型检查全绿。
- `cmd /c "npm run build"`：6.77s 构建通过（dist 产物完整）。
- `python scripts/vault-check.py`：PASS（notes=401, csv_rows=1599, index_links=337, reisen=271, 0 badnames, 0 badglossar）。
- Commit 记录：
  - `0830bb2`: `[App] 重构微课文案解耦并新增歌德浮士德原著六维会考阅读工坊与订单簿教具`
  - `9a9a1cd`: `[SoWi] 优化证券存托研习步骤4为专属订单簿撮合与委托类型实操`
