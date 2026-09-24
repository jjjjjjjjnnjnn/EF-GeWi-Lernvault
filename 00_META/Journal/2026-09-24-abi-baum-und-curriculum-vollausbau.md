---
fach: ""
thema: "Curriculum Vollausbau und Abi-Baum"
operatoren: []
klausurrelevant: false
datum: 2026-09-24
tags: [EF, Meta]
---

# 2026-09-24 跨国考纲体系全量落地与 Abi-Baum 十科重构（`[Meta]`）

## 做了什么

用户要求：以**学习方法和学科为核心**、以 **Abitur 应试**为要求，做大规模全学科抓取设计；理科在**解题方法层面**使用中国教材信息；大量 subagent 并行；注意可扩展性与文件夹规整。

### S0–S7 考纲体系（`00_META/Curriculum/`）

| 阶段 | 产出 | 行数 |
|---|---|---|
| S0 | 设计总纲 + 官方源清单 + 4 套模板 | ~700 |
| S3 | 德国 NRW **10 科** Oberstufe 大纲（EF–Q2） | 3685 |
| S4 | 中国理科 **4 科** 课标 | 1552 |
| S5 | 中德**映射 4 科**（38 条 CN-Methode 技法卡） | 1638 |
| S6 | **Operatoren 十科汇总**（230 动词）+ Klausur/Abitur 形式 | 871 |
| S7 | **Abi-Baum 十科**（应试四行 + 方法 + CN 技法） | 9209 |
| **合计** | **40 个文件** | **~17600 行** |

### S7 Abi-Baum 的三个核心转变

| 维度 | 旧（EF 版） | 新（Abi-Baum） |
|---|---|---|
| 学段 | 仅 EF | **EF + Q1 + Q2，终点 Abitur** |
| 目标 | 罗列知识点 | **应试导向**：每节点绑 Klausur/Abitur 题型与 AFB |
| 维度 | 单维知识结构 | **双维**：知识结构 × 学习方法 |
| 落地 | 不挂笔记 | **挂笔记 + 标缺口**（十科约 200 项缺口清单） |

**应试四行**（每 L3 节点）：中文一句话 / Klausur-Anbindung / Operatoren / Lernweg ZH / Fehlerquelle / 📓 笔记。
**Methoden-Profil**（每科）：AFB 权重 / 黄金学习法（引自 `Lernmethoden-Evidenz.md`，标证据源）/ 三大失分点 / 笔记结构模板。
**理科 CN-Methode 层**：每条标 `DE-Anschluss`（德国已有工具）+ 合规性 ✅/⚠️ + 来源分层 `[CN-教材]/[CN-高考]/[CN-课标]`；含 ⚠️ 反例演示「不是所有中国技法都该引入」。

## 关键调研结论（[已验证]）

- **NRW 三个并行 KLP 世代**，本项目采用当前在校生版本：Deutsch/Englisch/Mathe/Physik/Chemie/Bio → 2022/23 版；Philosophie/SoWi/Musik/Sport → 2013 版。**不许混用**。
- **Operatoren 不在 KLP 内**（单独抓，230 动词）；**Klausur 时长在 BASS 13-32 Nr. 6**；平时 Klausur 时长在 **APO-GOSt §14**。
- **Englisch KLP 无 Inhaltsfelder**（纯能力导向，5 个 Kompetenzbereiche）。
- **中国课标水平数因科而异**：数学 3 / 物理 5 / 化学 4 / 生物 4；数学 2020 修订版真本已拿到，版本风险解除。

## 11 处上游纠错（官方原文 vs 简报）

1. Mathe 能力**五维**非六维（Reflektieren 是子维度）
2. Mathe **EF 含 A+G**（Stochastik 在 Q 阶段）
3. SoWi PDF **无乱码**，7 个 IF 全部提取成功
4. SoWi KLP **只有 EF/QP 两级**（无 Q1/Q2）
5. Philosophie **6 个 IF 标题全不同**（简报给的全错）
6. Musik **仅 3 个视角型 IF**（简报猜测全错）
7. Sport 第 4 能力域 **psycho-physische 不存在**（实为 Methodenkompetenz）
8. Chemie 反应速率平衡**属 EF**；EF **不含酸碱**
9. Physik **GK/LK 是两套不同 IF**（非「LK=GK+加料」）
10. 中国物理选必 2/3 实为 **4 个主题**（含传感器、波粒二象性）
11. 中国化学选修系列名**层级错位**

## 最高价值产出（理科中德对照）

- **Mathe**：数列（德国无此主题，嫁接口是 `Iteration`/`Kumulation`）· 用导数证明不等式（**不需新知识点**，补强 AFB III，性价比最高）· 平面向量基底分解（填 EF→Q1 断层）· 向量法统一立体几何
- **Physik**：带电粒子偏转几何化轨迹链（**零新知识**）· 整体法/隔离法判据 · 守恒律选择策略（矢量性为第一判据）· 平抛→电场同构翻译
- **Chemie**：MWG → K_S 推导链（Q 阶段酸碱定量的唯一通道）· 电化学四要素 Raster · 物质的量枢纽换算网络
- **Bio**：遗传计算三步程序（**EF 即具备全部前置**）· 曲线三看法（命中 GK 明文考点）· 实验设计四问法

## 待办

- **S8 笔记生产**：按十科 Abi-Baum 的缺口清单施工（约 200 项，每项已指定目标文件名）
- **EF 层优先**（用户当前在读 EF）：Philosophie 的 IF1/IF2 实质为零（最紧急）· Bio 的 EF Zellbiologie 缺口 · SoWi 的 IF4（Abitur 2027 聚焦）
- **口试科优先**（Musik/Sport）：IF3（Musik）/ IF d（Sport）为直接考试风险
- **App 侧同步**：`src/baum/*.ts` 需从新版 Markdown 派生（现仍为 EF 版数据）

## 阻塞

- **Musik/Sport 的 Halbjahr-Thema 与课程项目未定**（等老师）；**Sport 的 2 个 Akzentuierungs-IF 未定**（决定备考范围）
- **LK/GK 类型未确认**（影响 LK 专属条目的优先级）
- 无技术阻塞；vault-check PASS(126/534/242)，git 工作树干净。
