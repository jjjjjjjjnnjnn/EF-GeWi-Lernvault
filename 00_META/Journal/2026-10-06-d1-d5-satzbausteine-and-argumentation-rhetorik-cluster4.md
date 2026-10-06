---
fach: ""
thema: "Journal 2026-10-06 D1-D5 Satzbausteine Upgrade and Argumentation-Rhetorik Cluster 4"
operatoren: []
klausurrelevant: false
datum: 2026-10-06
tags: [EF, Meta, Journal]
---

# 2026-10-06 — D1–D5 评分标准文科四科话术库升级与跨学科沙盘 Cluster 4 落地

## 1. 做了什么
1. **文科四科（SoWi, Philo, Deutsch, Englisch）`Satzbausteine.md` 全面升级**：
   - 依据官方 Erwartungshorizont (EHZ) 的 20 分 Darstellungsleistung (D1–D5) 模型，全面重塑四个文科学科的会考答卷话术库；
   - **D1 (Stringenz & Aufgabenbezug)**：提供 TAWTE 标准导言句、AFB I–III 镜像回应句；
   - **D2 (Drei-Ebenen-Trennung)**：实现客观复述层 (Deskription)、功能分析层 (Deutung) 与价值评判层 (Wertung) 的严格语言界线与转换词；
   - **D3 (Zitiertechnik)**：杜绝孤立引用（Zitat-Inseln），规范语法融入行号标记与虚拟一式间接引语 (Konjunktiv I)；
   - **D4 (Fachsprache)**：提炼各科核心评价范式（如 SoWi 的 Effizienz vs. Legitimität，哲学的 Deontologie vs. Teleologie，德语的修辞功能链，英语的 P.E.E. 结构）；
   - **D5 (Sprachliche Eleganz)**：提供高阶复合从句、因果/转折/让步逻辑连接词及满分辩证总结句。
2. **跨学科沙盘考点簇 Cluster 4（论辩修辞与语言中继）全量落地**：
   - 更新 `App-EF-Lernvault/src/engine/vernetzung.ts`，将德语文论修辞、哲学三段论演绎与谬误检验、英语中继 P.E.E. 结构与社科政治话语权力（哈贝马斯协商民主与民粹修辞解构）熔铸为四位一体沙盘；
   - 扩充 `vernetzung.test.ts` 单元测试，确保拓扑网络 100% 稳定运行。
3. **跨学科研习笔记与知识库沉淀**：
   - 创建八段式规范笔记 `01_Deutsch/Texte-Analyse/Argumentationslogik-und-Sprachmacht-Vernetzung.md`；
   - 同步术语至 `00_META/Glossar-DE-ZH-GeWi.md`（新增 4 条）；
   - 同步卡片至 `01_Deutsch/Vokabeln-Anki/Deutsch-EF-Phrasen.csv`（新增 3 条）；
   - 挂载更新 `00_META/INDEX.md`（对应链接增加至 344 行）。
4. **单科独立 Commit 规范**：
   - 分别以 `[SoWi]`、`[Philo]`、`[Deutsch]`、`[Englisch]`、`[App]` 独立提交，无跨学科混淆。

## 2. 门禁验证
- `python scripts/vault-check.py`：PASS（notes=410, csv_rows=1939, index_links=344, reisen=356, badnames=0, badglossar=0）；
- `npx tsc -b`：0 错误通过；
- `npm test`：61 测试文件，421 测试 100% PASS。

## 3. 后续待办（下一任 Agent 关注）
- **待办 1**：在 App `KlausurSim` 评估界面中引入 D1–D5 自查雷达与提示卡；
- **待办 2**：结合本地 760 份 StanSi 真题库，继续针对理科（Mathe/Physik/Chemie/Bio）提炼步进式 BE 自查核对卡。
