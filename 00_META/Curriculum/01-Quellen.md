---
fach: ""
thema: "Curriculum Quellen"
operatoren: []
klausurrelevant: false
datum: 2026-09-24
tags: [EF, Meta, Curriculum]
---

# 考纲官方源清单（唯一真相源）

> 本文件是 `00_META/Curriculum/` 工程的**来源权威清单**。
> 与 `00_META/Download-Quellen.md`（本地 `_Downloads/` 文件清单）配合使用：本文件管**源地址与许可**，那份管**本地实体文件**。
> 最后更新：2026-09-24

---

## A. 德国 NRW（文科权威基准 + 理科对照基准）

### A.1 导航级入口

| 来源 | URL | 许可 | 状态 |
|---|---|---|---|
| Lehrplannavigator Sek II 主入口 | https://lehrplannavigator.nrw.de/lehrplannavigator-sekundarstufe-ii-richtlinien-und-kernlehrplaene | 官方公开 | [已验证] |
| KLP 现行版（ab SJ 2022/23） | https://lehrplannavigator.nrw.de/sekundarstufe-ii/kernlehrplaene-fuer-die-gymnasiale-oberstufe-ab-sj-20222023 | 官方公开 | [已验证] |
| KLP 新版（ab SJ 2027/28） | https://lehrplannavigator.nrw.de/sekundarstufe-ii/kernlehrplaene-fuer-die-gymnasiale-oberstufe-ab-sj-20272028 | 官方公开 | [已验证] |
| KLP 旧版（ab SJ 2013） | https://lehrplannavigator.nrw.de/sekundarstufe-ii/kernlehrplaene-fuer-die-gymnasiale-oberstufe-ab-sj-2013 | 官方公开 | [已验证] |
| QUA-LiS 新域名 | https://www.qua-lis.nrw.de/ | 官方公开 | [已验证] |
| Zentralabitur GOSt 总入口 | https://www.qua-lis.nrw.de/zentralabitur-der-gymnasialen-oberstufe-za-gost | 官方公开 | [已验证] |
| IQB Sek II | https://www.iqb.hu-berlin.de/schule/sekundarstufe-ii/ | 官方公开 | [已验证] |

> ⚠️ `schulentwicklung.nrw.de` 与 `standardsicherung.nrw.de` 部分旧链接已 301 重定向至 QUA-LiS，**务必用新域名**。

### A.2 各科 KLP Heft 编号与 PDF（本项目采用版本已标注）

PDF URL 模板：`https://lehrplannavigator.nrw.de/system/files/media/document/file/<文件名>`

| 学科 | Heft | **本项目采用** | 现行版 PDF | 新版(2027) PDF |
|---|---|---|---|---|
| Deutsch | 4701 | **2022/23** | `gost_klp_d_2023_06_07.pdf` | `gost_klp_d_2026_08_24.pdf` |
| Englisch | 4704 | **2022/23** | `gost_klp_e_2023_06_07_0.pdf` | `gost_klp_e_2026_08_24.pdf` |
| Philosophie | 4716 | **2013** | `klp_gost_philosophie.pdf` | `gost_klp_pl_2026_08_24_0.pdf` |
| Sozialwissenschaften | 4717 | **2013** | `klp_gost_sowi.pdf` | `gost_klp_sw_2026_08_24.pdf` |
| Musik | 4702 | **2013** | `klp_gost_musik.pdf` | `gost_klp_mu_2026_08_24.pdf` |
| Sport | 4734 | **2013** | `klp_gost_sport.pdf` | `gost_klp_sp_2026_08_24.pdf` |
| Mathematik | 4720 | **2022/23** | `gost_klp_m_2023_06_07.pdf` | `gost_klp_m_2026_08_24.pdf` |
| Physik | 4721 | **2022/23** | `gost_klp_ph_2022_06_07.pdf` | `gost_klp_ph_2026_08_24.pdf` |
| Biologie | 4722 | **2022/23** | `gost_klp_bi_2022_06_07_0.pdf` | `gost_klp_bi_2026_08_24.pdf` |
| Chemie | 4723 | **2022/23** | `gost_klp_ch_2022_06_07.pdf` | `gost_klp_ch_2026_08_24.pdf` |

> 全部 PDF 链接已实测 HTTP 200（2026-09-24）。

### A.3 Operatoren 来源（**不在 KLP 内，单独建源**）

- 各科 Fachseite 命名规律：`https://www.standardsicherung.schulministerium.nrw.de/zentralabitur-gost/faecher/<fach>-gost`
- 本项目相关 11 个页面：`deutsch-gost`, `englisch-gost`, `philosophie-gost`, `sozialwissenschaften-gost`, **`sozialwissenschaftenwirtschaft-gost`**, `musik-gost`, `sport-gost`, `mathematik-gost`, `physik-gost`, `biologie-gost`, `chemie-gost`
- 已验证直链示例：
  - Deutsch: `.../system/files/media/document/file/d-operatoren-ab-abitur-2023.pdf`
  - Mathematik: `.../m_operatoren_ab_2023_1.pdf`

**AFB 通则** [已验证]：
- AFB I = Reproduktion
- AFB II = Reorganisation und Transfer ← **Abitur 重点**
- AFB III = Reflexion und Problemlösung

### A.4 Klausur / Abitur 正式源

| 项 | 来源 | URL | 状态 |
|---|---|---|---|
| Abitur 时长表 | BASS 13-32 Nr. 6 | https://bass.schule.nrw/20012.htm | [已验证] |
| Fachliche Vorgaben | QUA-LiS | 命名规律 `{fach}_{jahr}_gg.pdf`（GK 用 `_gg`，LK 用大写） | [据推断，仅 2027 实测] |
| SoWi 2027 Vorgaben | — | `.../sozialwissenschaften_2027_gg.pdf` | [已验证 200] |
| Bio 2027 Vorgaben | — | `.../biologie_2027_gg.pdf` | [已验证 200] |

**Abitur 笔试时长（Abitur 2027）** [已验证]：

| 学科 | LK | GK |
|---|---|---|
| Deutsch | 315 min | 255 min |
| Englisch | 315 min | 285 min |
| Musik | 300 min（+60 若选 Gestaltungsaufgabe） | 240 min |
| SoWi / Philosophie | 300 min | 240 min |
| Mathematik | 300 min | 255 min |
| Bio / Chemie / Physik | 300 min | 255 min |
| Sport | 300 min | — |

### A.5 IQB（全国基准与真题池）

| 来源 | URL | 状态 |
|---|---|---|
| Bildungsstandards AHR（Sek II 各科全国标准） | https://www.iqb.hu-berlin.de/schule/sekundarstufe-ii/bildungsstandards-fur-die-allgemeine-hochschulreife/ | [已验证，导航层] |
| Abituraufgabenpools（全国共享真题库） | https://www.iqb.hu-berlin.de/schule/sekundarstufe-ii/abituraufgabenpools/ | [已验证，导航层] |
| Begleitende Dokumente | https://www.iqb.hu-berlin.de/schule/sekundarstufe-ii/begleitendedokumente/ | [已验证，导航层] |

> **未获取到**：IQB 各科 Bildungsstandards 的逐科独立 PDF 直链。[未获取到]

---

## B. 中国（理科对照基准）

### B.1 课标来源

| 来源 | 内容 | 权威性 | 状态 |
|---|---|---|---|
| 课程教材研究所 ICTR（教育部直属） | 全套课标官方下载入口 `ictr.edu.cn/download_center/put.html` | **教育部官方** | [已验证页面可达] |
| 化学（2017年版2020年修订） | 浙江师大转载 PDF | 高校转载官方文件 | [已验证，完整解析成功] |
| 物理（2017年版2020年修订） | 江苏教育机构转载 PDF | 教育机构转载 | [已验证，完整解析成功] |
| 生物（2017年版2020年修订） | 长春师大转载 | 高校转载官方文件 | [已验证，完整解析成功] |
| 数学 | 华东师大转载（**2017年版，非2020修订**） | 高校转载 | [已验证，**版本偏差**] |
| 人教社课标专页 | `pep.com.cn/xw/zt/rjwy/gzkb2020/` | 人教社官方 | [未获取到，403 region_block] |

> ⚠️ **数学版本风险**：仅拿到 2017 年版。2017→2020 修订对数学结构与内容要求改动极小（课程结构、六大核心素养框架未变），**结构可信**，但逐字引用需注意版本。[据推断]

### B.2 中国课标配套教材（人教版等）—— 仅作参考源

- 人教版 A 版 / B 版、北师大版、苏教版、沪科版等 —— 用于理解知识点实际编排
- 许可：教材正文**有版权，永不入库**，只记链接

### B.3 中德对照研究（**参考，非官方**）

| 文献主题 | 权威性 |
|---|---|
| 中德两国标准中的「数学能力」比较研究 | 学术期刊（参考） |
| 中国和德国高中数学课程标准的学业评价功能比较 | 学位论文（参考） |
| 德国高中数学教育标准的特点及启示 | 学术期刊（参考） |

> ⚠️ **无任何官方中德对照文件**。所有对照结论必须标注 [据推断] 或由本项目自行推导并说明推理依据。
>
> 德国侧应以 **KMK Bildungsstandards** 与 **NRW Kernlehrplan** 官方原文为权威源。

---

## C. 版权与落盘规则

1. 本文件**只记 URL 与许可**，不存正文。
2. 原始 PDF → `_Downloads/CURRICULUM/<Fach>/`（gitignored），每件配 `.quelle.txt`。
3. 仓库内只提交**结构化摘要**（IF 名称、内容条目、能力维度、水平划分）。
4. 商业资源只记链接。

---

## D. 未获取到清单（**不许当事实用**）

| 项 | 状态 |
|---|---|
| SoWi / Philosophie / Musik 的精确 Inhaltsfeld 标题 | **部分获取** — PDF 提取 UTF-8 乱码，需人工核对 |
| IQB 各科 Bildungsstandards 独立 PDF 直链 | [未获取到] |
| BASS 各科独立编号（除 Abitur 总规章 Nr.6） | [未获取到] |
| APO-GOSt § 13–32 全文 | [未获取到] |
| Abitur 2026/2028/2029 各科 Vorgaben 直链 | [据推断] |
| 数学课标 2020 修订版原文 | [未获取到]，仅有 2017 版 |
