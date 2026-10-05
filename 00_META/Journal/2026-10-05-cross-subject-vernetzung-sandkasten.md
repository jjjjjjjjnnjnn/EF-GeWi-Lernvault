---
datum: 2026-10-05
thema: "方向二：跨学科联动树形图与核心考点全景沙盘研制完成"
typ: journal
status: abgeschlossen
---

# 方向二：跨学科联动树形图与核心考点全景沙盘研制总结

## 1. 任务背景与核心目标
落实用户发展路线计划之“方向二：跨学科联动树形图与核心考点全景沙盘”：
1. **多学科拓扑交织与概念同构**：
   - 将德语文学中的异化劳动（卡夫卡《变形记》格里高尔作为雇佣齿轮的物化、毕希纳《沃伊采克》的肉体剥削）；
   - 哲学中的马克思劳动异化四重维度、康德目的公式与密尔质性快乐论；
   - 社会科学中的社会不平等（基尼系数、财富分配壁垒、劳动力市场弹性化与贫困化 Prekarisierung）；
   - 英语文学中的阿瑟·米勒《推销员之死》（威利·洛曼的人格商品化与虚幻美国梦）；
   深度融通为上位理论体系，构建全真跨学科拓扑知识沙盘。
2. **一键穿梭直达交互体系**：
   - 在知识树（Lernbaum）中增设“跨学科沙盘（Vernetzungs-Radar）”独立全景视图；
   - 在各节点详情抽屉中嵌入动态拓扑透镜与一键跨学科穿梭能力（1-Klick-Transit）。

## 2. 核心交付成果
1. **拓扑关联引擎升级 (`App-EF-Lernvault/src/engine/vernetzung.ts`)**：
   - 增设 `alienation_labor_capital` 核心维度，录入德语、哲学、社科、英语间双向拓扑思维桥；
   - 固化四大跨学科考点全景沙盘簇（异化劳动与资本、正义论与再分配、变化率与守恒律、论辩修辞与语言中继）；
   - 新增 `findVernetzungBridgesForNode` 与 `getAllVernetzungsClusters` 内存极速检索 API；严格保持单条思维桥注入预估 Token 数 < 50 tokens。
2. **独立交互沙盘组件研制 (`CrossDisciplinarySandbox.tsx`)**：
   - 严格遵循 Tufte 纯黑白学术纸墨设计规范（严禁杂色、emoji、偏心放大，几何中心锁定 `transformOrigin`）；
   - 交互式 SVG 弦图全景呈现跨学科拓扑连接线与卫星节点；
   - 支持沙盘簇切换、节点聚焦放大、双语考纲定位与一键跨学科穿梭。
3. **知识树主工作台无缝集成 (`Lernbaum.tsx`)**：
   - 在视图切换栏中扩充第 4 种全局模式 `vernetzung`（跨学科沙盘）；
   - 在知识节点右侧详情抽屉中新增“Topologische Vernetzung (AFB III)”透镜，实时发现关联学科并提供一键穿梭按钮。
4. **学科知识库规范沉淀**：
   - 编写跨学科综合研习笔记：`07_Philosophie/Texte-Analyse/Entfremdung-Kapital-Ungleichheit-Vernetzung.md`（含中德双语八段、CN记忆桩、会考真题与 15 NP 满分答题示范）；
   - 同步更新 `00_META/INDEX.md`、`00_META/Glossar-DE-ZH-GeWi.md`（新增 Verdinglichung, Prekarisierung, Menschheitszweckformel）及哲学 Anki 词库。
5. **质量门禁验证**：
   - 新增 `CrossDisciplinarySandbox.test.tsx` 单元测试，并通过 `vernetzung.test.ts` 及 `Lernbaum.test.tsx` 回归测试；
   - `python scripts/vault-check.py` 严格校验通过（PASS）。
