---
fach: ""
thema: "Lernreise 深化：试点补全 + 词卡 + 大纲索引 + 故事冷知识"
operatoren: []
klausurrelevant: false
datum: 2026-09-25
tags: [EF, Meta]
---

# 2026-09-25 Lernreise 深化（第二波）

> 承接 `2026-09-25-lernreise-vollausbau.md`（65 篇批量生产）。本轮做「完善 + 继续增厚」。

## 做了什么

### 1. 两篇旧版 5 步试点 → 完整 9 步 Lesson-v3

- `Lernreise/Musik-Hoeranalyse-L1.md`、`Lernreise/Sport-Bewegung-Erklaeren-L1.md`：由 4 步旧版（entdecken/ausprobieren/check/muendlich）重写为 8 Schritt + Fehlvorstellung 的完整 Lesson-v3。
- frontmatter 补齐十字段（`xp` 60 → **100**，与 9 步 XP 体系 5/15/20/30 自洽）；保留原主题与核心句式（`Ich höre … Das wirkt …, weil …` / `Die Bewegung gliedert sich in … Entscheidend ist …, weil …`）。
- 同步修正 `00_META/Curriculum/Deutschland/Musik-Oberstufe.md` 中过时的「XP 60」。

### 2. 70 篇课程全部增厚 `## Anekdote & Fun-Fact`（故事 / 冷知识）

- 位置统一在 `## Schritt 3 — entdecken` 与 `## Schritt 4 — ausprobieren` 之间（App 解析器会把它并入 Schritt 3 的讲解内容，**不破坏 9 步结构**）。
- 三段式强制格式：德语故事/冷知识 → 中文解读 → `Bezug zum Konzept`（把故事拉回术语）。
- 示例：牛顿与莱布尼茨各自发明微积分、Tangente ← lat. *tangere*、冰的密度反常（氢键开放晶格）、哈伯-博施法的勒夏特列权衡、Beamon/Powell 与跳远腾空步、"命运敲门"并非贝多芬原话、1948 年德国货币改革与艾哈德。

### 3. Anki 词卡补齐（+177 张）

从 70 篇课程 Schritt 2 的 PRETRAINING 术语盒抽取，去重后追加到各科 CSV：

| CSV | 新增 | 最终数据行 |
|---|---|---|
| Deutsch-EF-Phrasen | +24 | 170 |
| Englisch-EF-Phrasen | +16 | 171 |
| Mathe-EF-Basis | +20 | 161 |
| Physik-EF-Basis | +20 | 160 |
| Chemie-EF-Basis | +11 | 159 |
| Bio-EF-Basis | +19 | 209 |
| Philo-EF-Basis | +15 | 147 |
| SoWi-EF-Basis | +20 | 217 |
| Musik-EF-Basis | +17 | 83 |
| Sport-EF-Basis | +15 | 118 |

合计 **1595 行**（+177）。全部经脚本复核：4 分号 / 首列无重复 / UTF-8 无 BOM / 以换行结尾。

### 4. 大纲完善：10 份 Lernbaum 追加「Lernreise 索引」

- `00_META/Lernbaum/Lernbaum-<Fach>.md` 末尾各追加一节课程索引表（共 **70 行**，相对路径 `../../Lernreise/…`，**0 死链**），只追加、不动原文。
- 学习树由此可直接挂载本学科全部互动课程。

### 5. 教学方法补条目

- `00_META/Lernmethoden-Evidenz.md` 新增 **§10 故事与冷知识的边界**（Rey 2012 / Sundararajan & Adesope 2020 两篇元分析）：**"有趣但无关"的附加信息会损害学习**（seductive details），关键调节变量是**一致性**；据此定下 vault 规则 —— 故事写不出 `Bezug zum Konzept` 就删除。
- `00_META/Methoden-Quellen.md` 相应补 §E（2 条），论文表 16 → **18 篇**。

## 门禁

`python scripts/vault-check.py` → **PASS**（notes=361 csv_rows=**1595** index_links=282 reisen=**70** vergleich=0 badnames=0 badglossar=0）

## 待办

- [ ] 各科 `Ressourcen.md` 与本轮新增课程尚无互链；如需可补。
- [ ] `Musik-Oberstufe.md` / `Sport-Oberstufe.md` 中「Lernreise」描述仍以旧试点为主，可按新 9 步内容微调。
