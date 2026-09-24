---
fach: ""
thema: "Abi-Baum Design"
operatoren: []
klausurrelevant: false
datum: 2026-09-24
tags: [EF, Meta, Lernbaum]
---

# Abi-Baum 设计总纲（S2 升级版 · 应试导向学科树）

> 本文件是 `00_META/Lernbaum/` 的**新一代设计总纲**，取代旧 `00-Designprinzipien.md` 的「只设计不落地」阶段铁律。
> 旧总纲保留为历史记录，新工作一律遵循本文件。
> 最后更新：2026-09-24（S2 升级）

---

## 0. 本次升级的三个根本转变

| 维度 | 旧设计（EF 版） | **新设计（Abi-Baum）** |
|---|---|---|
| **学段** | 仅 EF | **EF + Q1 + Q2 完整 Oberstufe，终点是 Abitur** |
| **目标** | 罗列考纲知识点 | **应试导向**：每个节点绑定 Klausur/Abitur 的出题方式与 AFB 层级 |
| **维度** | 单维（知识结构） | **双维**：知识结构 × 学习方法（每条学习路径绑定方法论） |
| **落地** | 只设计不落地、不挂笔记 | **挂笔记 + 标缺口**，成为笔记生产的施工图 |
| **理科** | 纯德国 | **德国框架 + 中国解题技法**（在方法层引入，不引入超纲知识） |

**核心命题**：这不是一份"知识点清单"，而是一张**"从 EF 到 Abitur、每个节点都告诉你『考什么、怎么学、笔记有没有』的作战地图"**。

---

## 1. 四层体系（L0–L3）与「应试四行」

### 1.1 层级定义（沿用，学段扩展）

| 层级 | 名称 | 来源 | 上限 |
|---|---|---|---|
| L0 | 学科根 | KLP 依据 + **Abitur-Fokus 一句话** | — |
| L1 | Inhaltsfeld | **KLP 官方编号与名称**（引用 `Curriculum/` 大纲，不自创） | 2–7 个 |
| L2 | Schwerpunkt | 考纲条目下的自然分组 | ≤ 6 |
| L3 | Feinthema | **最小可考单元**（一个概念/一种题型/一部作品/一个模型） | ≤ 6 |

> ⚠️ **L1 必须与 `Curriculum/Deutschland/<Fach>-Oberstufe.md` 的 IF 逐一对齐**。Curriculum 是考纲真相源，Lernbaum 是它的作战化投影。

### 1.2 「应试四行」——本设计的核心创新

每个 L3 节点**必须**有这四行（旧版只有后两行，现在扩为四行）：

```markdown
- **<L3 主题名>**
  - 中文一句话：<这个概念是什么>
  - Klausur-Anbindung：<在考试里的位置——题型/任务/AFB 层级/分值权重>
  - Operatoren：<该科官方动词，从 Curriculum Operatoren 表取>
  - Lernweg ZH：<学习方法建议——用什么方法掌握它>
  - Fehlerquelle：<本项目错题库常见错误 / 预判的典型错误>
  - 📓 笔记：<已有笔记链接 或 ⚠️ 缺口>
```

> **新增的三行是本设计最有价值的部分**：
> - `Klausur-Anbindung` —— 把知识点绑到考试形式上（**应试导向的落点**）
> - `Lernweg ZH` —— 绑定学习方法（**方法核心的落点**）
> - `Fehlerquelle` —— 绑定错题库（**闭环的落点**）

### 1.3 学段标记

每个 L3 节点标学段：`[EF]` / `[Q1]` / `[Q2]` / `[EF→Q2]`（贯穿）。
若某节点仅在 GK 或 LK 出现，标 `[GK]` / `[LK]`。

---

## 2. 学习方法维度（第二个核心）

### 2.1 方法论映射表

每个学科**必须**有一节「Methoden-Profil（方法论画像）」，回答：

1. **该科的 Abitur 主要考什么能力？**（对应 AFB I/II/III 的权重）
2. **该科的黄金学习法是什么？**（参考 `00_META/Lernmethoden-Evidenz.md` 的证据库）
3. **该科最典型的 3 个失分点是什么？**
4. **该科的笔记应该长什么样？**（结构模板）

### 2.2 已论证的学习方法（从 `Lernmethoden-Evidenz.md` 取，不许自创）

| 方法 | 证据来源 | 适用学科 |
|---|---|---|
| 检索练习（Retrieval Practice） | Rohrer / Adesope | 全科 |
| 间隔重复（Spaced Repetition） | Rohrer 2007/2015/2020 | 全科（尤其词卡型） |
| 交错练习（Interleaving） | Rohrer | MINT / 语言 |
| 对比辨别（Discriminative Contrast） | Rohrer | 易混概念 |
| 自我解释（Self-Explanation） | — | MINT |
| 先行组织者（Advance Organizer） | Ausubel | 全科（尤其新单元开头） |
| 认知负荷管理（CLT） | Sweller | MINT |
| CTML 多媒体原则 | Mayer | 全科 |

> ⚠️ 学习方法必须**有证据来源**，不许凭空建议"多做题"。每条 Lernweg 建议须能对应到上表或项目中已有论证。

---

## 3. 理科的中国技法层（**Abitur 合规前提下**）

### 3.1 三条铁律（**极重要，违反即打回**）

1. **只引入「方法」，不引入「超纲知识」**。
   - ✅ 可以：用中国式构造辅助函数证明不等式的**思路**（德国已教单调性，工具够用）
   - ❌ 不行：引入德国 KLP 完全没有的**知识板块**（如中国选修的矩阵、极坐标）
2. **每个中国技法必须标注德国侧的「合法接口」**——即该技法用到的全部工具，德国 KLP 里是否已教。
   - 格式：`CN-Methode: <技法名> · DE-Anschluss: <用到的德国已有工具> · 合规性: ✅/⚠️`
3. **有中国资料时必须标注来源层级**：
   - `[CN-教材]` 人教版/北师大版等教材的结构性方法（只记方法名与逻辑，不搬运原文）
   - `[CN-高考]` 高考题型与解题套路（原创改写，不搬原题）
   - `[CN-课标]` 课标规定的内容（来自 `Curriculum/China/`）

### 3.2 中国技法的呈现位置

在理科的 L3 节点内，作为**附加行**：

```markdown
  - 🇨🇳 CN-Methode：<技法名> · DE-Anschluss: <德国已有工具> · 合规性: ✅
  - 备注：<为什么值得引入 / 德国学生缺什么>
```

---

## 4. 文件结构与命名

```
00_META/Lernbaum/
├── 00-Designprinzipien.md      # 旧总纲（历史，EF 版）
├── 00-Abi-Baum-Design.md       # 本文件（新一代总纲，唯一真相源）
├── Lernbaum-<Fach>.md          # 10 科，内容升级为 Abi-Baum
└── _Template-Abi-Baum.md       # 新模板（本设计配套）
```

**命名**：`Lernbaum-<Fach>.md`，Fach 无变音符号（Deutsch/Englisch/Mathe/Physik/Chemie/Bio/Philosophie/SoWi/Musik/Sport）。

**frontmatter（升级）**：
```yaml
---
fach: SoWi
thema: "Lernbaum SoWi"
operatoren: []
klausurrelevant: true
datum: YYYY-MM-DD
tags: [EF, SoWi, Lernbaum]
stufe: "EF|Q1|Q2"          # 新增：本树覆盖学段
abi_fokus: "<一句话 A大红 重点>"   # 新增
klp_quelle: "Curriculum/Deutschland/SoWi-Oberstufe.md"   # 新增：考纲真相源
---
```

---

## 5. 可扩展性设计（**本次重点要求**）

### 5.1 三个必须遵守的可扩展原则

1. **数据与呈现分离**：Markdown 树是**唯一内容源**；App 侧 `src/baum/*.ts` 是从 Markdown 派生的数据。**改内容只改 Markdown**，不许反向。
2. **节点 id 稳定**：每个 L3 节点建议带稳定标识（`<Fach>-<IF号>-<序号>`），供 App 侧引用与跨科关联。加节点只增不改旧 id。
3. **新增学科零成本**：新增一科只需 ① `Curriculum/Deutschland/<Fach>-Oberstufe.md` ② `Lernbaum-<Fach>.md`，不需改任何其他文件的逻辑。

### 5.2 与现有资产的接口

| 上游 | 关系 | 方向 |
|---|---|---|
| `Curriculum/Deutschland/<Fach>-Oberstufe.md` | **考纲真相源** | → 派生 L1/L2 |
| `Curriculum/China/*` + `Mapping/*` | 理科中国技法源 | → 派生 CN-Methode 行 |
| `00_META/Lernmethoden-Evidenz.md` | 方法论证据源 | → 派生 Lernweg 行 |
| `<Fach>/Klausur-Training/Fehlerlog.md` | 错题源 | → 派生 Fehlerquelle 行 |
| `<Fach>/` 笔记 | 落地目标 | ← 树标出 📓 缺口 |
| `App-EF-Lernvault/src/baum/*.ts` | 呈现层 | ← 从 Markdown 派生 |

---

## 6. 执行路线图（S2 之后）

| 阶段 | 内容 | 并行度 |
|---|---|---|
| **S2** | 本设计总纲 + 新模板 + 框架升级 | 主线程 |
| **S3** | 德国 10 科 Curriculum 大纲全量 | **10 路并行** |
| **S4** | 中国理科 4 科课标 | **4 路并行** |
| **S5** | 中德映射 4 科 | **4 路并行** |
| **S6** | Operatoren / Klausur-Formate 统一源 | 2 路并行 |
| **S7** | **Abi-Baum 10 科重构**（核心交付） | **10 路并行** |
| **S8** | 笔记缺口清单 + App 数据派生 | 主线程 |

---

## 7. 质量门禁（每个产出必须过）

- [ ] frontmatter 六字段完整 + 新增字段（`stufe`/`abi_fokus`/`klp_quelle`）
- [ ] 每个 L3 有**完整的应试四行**（中文一句话 / Klausur-Anbindung / Operatoren / Lernweg ZH / Fehlerquelle / 📓 笔记）
- [ ] L1 与 `Curriculum/Deutschland/<Fach>-Oberstufe.md` 的 IF **逐一对齐**
- [ ] 理科节点的 CN-Methode 行**全部标注 DE-Anschluss 与合规性**
- [ ] 所有信息标 `[已验证]` / `[据推断]` / `[未获取到]`
- [ ] mermaid 语法正确
- [ ] 文件名无变音符号
- [ ] `python scripts/vault-check.py` PASS
