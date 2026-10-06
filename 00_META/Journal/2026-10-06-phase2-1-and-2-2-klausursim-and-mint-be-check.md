---
fach: ""
thema: "Journal 2026-10-06 Phase 2.1 KlausurSim Diagnostic and Phase 2.2 MINT BE Checklist"
operatoren: []
klausurrelevant: false
datum: 2026-10-06
tags: [EF, Meta, Journal]
---

# 2026-10-06 — Phase 2.1 & 2.2 官方会考自检诊断台与理科步进式 BE 采分闭环交付

## 1. 做了什么
1. **吸纳 NRW 高中文理中学教师核心教学法常规**：
   - 依据高中部教师对北威州 Kernlehrplan 的权威解析，全面校准 [`00_META/Blocker-Register.md`](../Blocker-Register.md) 中的 15 项 A 类台账，确认：
     * Deutsch 戏剧主流为 Goethe《Faust I》/ Büchner《Woyzeck》；议论文话题为数字媒体或语言演变；
     * Englisch 锁定 Young Adult Novel；第三参照文化圈锁定为 Nigeria；题型锁定为 Teil A + Teil B (Mediation)；
     * Musik 锁定为 GK，标题音乐/影视音乐，3–5 首动机谱例，无高考式口试；
     * Sport 锁定为 BF 3 (田径) + BF 7 (集体球类对抗)，理论锁定 IF a (动作学习) + IF e (合作对抗)，考核为实践+体能跑(Cooper)+平时表现，无单独高考口试；
   - 精简 [`00_META/Lehrkraft-Anfragen.md`](../Lehrkraft-Anfragen.md) 为每科仅 1–2 问的精炼确认邮件。
2. **Phase 2.1：KlausurSim 接入 D1–D5 自查打分雷达与 MINT BE 核查模块**：
   - 在客户端 [`App-EF-Lernvault/src/modules/KlausurSim.tsx`](../../App-EF-Lernvault/src/modules/KlausurSim.tsx) 评审结果面板中植入官方双轨制 Darstellungsleistung（20分）交互自查调节器（D1 5分、D2 4分、D3 3分、D4 4分、D5 4分），实时计算并展示 15 NP；
   - 为理科（Mathe/Physik/Chemie/Bio）植入四阶步进式 BE 自查核验卡（Ansatz 25% $\to$ Einsetzen 25% $\to$ Exaktheit 25% $\to$ Antwortsatz 25%）；
   - 遵循 Tufte 纯黑白学术纸墨风，高对比度，零彩杂色。
3. **Phase 2.2：MINT 步进式 BE 评分标准与防失分总纲落地**：
   - 编写规范笔记 [`03_Mathe/Klausur-Training/Mathe-Operatoren-Check.md`](../../03_Mathe/Klausur-Training/Mathe-Operatoren-Check.md)；
   - 阐明四步法、Folgefehler 保护原则、单位漏写扣分规则与有效数字保留惯例；
   - 同步更新术语表（新增 3 条）与 Anki 卡片库（新增 3 条），挂载 `00_META/INDEX.md`。

## 2. 门禁验证
- `python scripts/vault-check.py`：PASS（notes=411, csv_rows=1942, index_links=345, reisen=356, badnames=0, badglossar=0）；
- `npx tsc -b`：0 错误通过；
- `npm test`：61 测试文件，421 测试 100% PASS。

## 3. 后续待办（下一任 Agent 关注）
- **待办 1**：老师邮件回复具体书名（如《Faust I》）后，将脚手架正式注入各科对应笔记；
- **待办 2**：在错误日志系统（Fehlerlog）中打通 D1–D5 与 BE 错误代码，实现 SM-2 智能定向加权。
