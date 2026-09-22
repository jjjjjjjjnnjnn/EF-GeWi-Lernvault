---
fach: ""
thema: "Lernmethoden-Evidenz"
operatoren: []
klausurrelevant: false
datum: 2026-09-22
tags: [EF, Meta]
---

# Lernmethoden-Evidenz v3 (单真相源：什么方法真有用)

> 中文一句话：只信元分析，不信感觉。觉得"看懂了"是最不可靠的信号，合上书能默写出来才是。
> v3 新增 §6–§9（练习测试精细化 / 穿插辨别 / 例题自解释边界 / 反馈多媒体），§1–§5 结论保留。16 篇论文明细见 `Methoden-Quellen.md`。
> Quellen (nur Links, keine Zitate): Dunlosky et al. 2013, Psych. Science in the Public Interest 14, 4–58 · Karpicke & Blunt 2011, Science 331 · Adesope et al. 2017, Rev. Educ. Res. · Rowland 2014, Psych. Bull. · Rohrer & Taylor 2007 · Taylor & Rohrer 2010 · Rohrer et al. 2015 · Rohrer et al. 2020 · Foster et al. 2019 · Barbieri et al. 2023 · Wittwer & Renkl 2010 · Brummer et al. 2024 · Kandemir u.a. (Timing-Metaanalyse) · Mayer (CTML) · Cromley et al. 2025 · Ma et al. 2014 (ITS meta, g=.42/.57/.35) · von Hippel 2024, Education Next (two-sigma) · open-spaced-repetition/awesome-fsrs (Wiki: The Algorithm) · SuperMemo Guru (forgetting index) · Vectara FaithJudge 2025, arXiv:2505.04847 · JIM-Studie 2024/2025, mpfs.de

## 1. 十策略证据等级 (Dunlosky 2013)

| 等级 | 方法 | vault动作 |
|---|---|---|
| hoch | Practice testing 练习测试 | 背卡+check步+Quiz，默认动作 |
| hoch | Distributed practice 分布练习 | FSRS 到期制，拒绝考前突击 |
| mittel | Elaborative interrogation 精细提问 | Feynman"为什么"三连 |
| mittel | Self-explanation 自解释 | Nachbereitung对照修正 |
| mittel | Interleaved practice 穿插练习 | 同科不同题型混刷（如Mathe函数+向量交替） |
| niedrig | Rereading / Highlighting / Summarization 重读划线总结 | 只做对照用，永不计入"已复习" |
| niedrig | Imagery / Keyword mnemonic | 只救急单词 |

## 2. 检索练习 > 精加工 (Karpicke & Blunt 2011)

- 检索练习（合书默写）效果 d≈1.0，超过概念图；但 75% 学生误判概念图更有效。
- App/模板对策：凡"觉得会了"处强制 check 步验证；UI 明示"背卡比看笔记记得牢"。

## 3. 间隔参数 (FSRS/SuperMemo)

- 默认 request retention **0.9**，遗忘指数最优 ~10–20%；P2 用 ts-fsrs 默认参数，不调。
- Successive relearning (Rawson)：学到标准 + **3 次重学**，与课程同步 → Planner 按 Klausur 倒排三轮，不平均用力。

## 4. AI 批改的稳定性边界 (RAG 2024–2025)

- RAG 降幻觉但不清零；对策 = P3 混合架构（模板组卷超纲率=0，LM 只润色批改）+ **Zitierpflicht**（引用笔记块原文，无引用打回）。
- ITS 元分析：机器 tutor 胜大班 g=.42、胜普通机辅 g=.57；但 Bloom 2σ 被证伪（人类 tutor 实测 d=.79，因 Bloom 叠了 mastery learning）。期望管理：App 目标是"稳定+0.5σ"，不是家教替代。

## 5. 节奏 (JIM 2025)

- 单次 **10–15 min** 微会话；手机屏 231 min/天、44% 写作业被打断 → 离线 exe + 专注计时是核心卖点，不是装饰。

## 6. 练习测试精细化 (Adesope 2017 / Rowland 2014)

- 中文结论：测试不是"多做题"就行，提分吃三条细节。① 测试整体 g≈0.61–0.70，明显高于重读（g≈0.51），所以凡重读都换成合书默写。② 测试格式与最终考试越像越好（TAP：一致 g≈0.63 > 不一致 g≈0.53），平时 check 题就要长成 Klausur 的样子（同样题型、同样 Operator）。③ 主动回忆（recall）胜过再认（recognition，选择/判断偏再认），所以先默写再对照，而不是先看答案再"哦我会了"。④ 有无反馈 g≈0.63 vs 0.60 几乎无差异——反馈不决定"测不测得有用"，决定的是"测错之后改不改"（怎么改见 §9）。
- vault动作：Nachbereitung 模板 check 步固定两步走——先合书默写（recall），再开书对照；Quiz/Drill 题型与 Klausur 对齐（SoWi 用 Operator 题干，见 Satzbausteine）；选择题只当辨别训练用，不计"已掌握"。
- 来源链接：[Adesope et al. 2017, Rev. Educ. Res.](https://doi.org/10.3102/0034654316689306) · [Rowland 2014, Psych. Bull.](https://doi.org/10.1037/a0037559) · 明细见 `Methoden-Quellen.md` §A。

## 7. 穿插与辨别训练 (Rohrer / Taylor / Foster)

- 中文结论：同类题连刷十道是"假会"，混排才是"真分"。实验室里穿插对区组 d≈1.34（Rohrer & Taylor 2007）；控制总间隔时间后仍有 d≈1.21（Taylor & Rohrer 2010），说明不只是间隔的功劳，另一半功劳是"辨别"——学生把"这题用哪个公式/哪条法条/哪个理论"搞混的比例从 46% 掉到 10%。真实课堂效应小一些但稳定：d≈0.42 / 0.79（Rohrer et al. 2015）；随机对照 d≈0.83，且 15/15 位老师正向评价、愿意继续用（Rohrer et al. 2020）。机制双通道（Foster et al. 2019）：分布记忆 + 对比辨别，两者叠加。
- vault动作：Quiz 默认混排（同科 2–3 题型交替，如 SoWi 同一次混"概念辨析 + Karikatur + Stellungnahme"）；每题加一步 discrimination 二选："这题考哪个模型/哪条路径？先选再做"，错了记 Fehlerlog 时标"辨别错"还是"知识错"。
- 来源链接：[Rohrer & Taylor 2007](https://scholar.google.com/scholar?q=Rohrer+Taylor+2007+shuffling+mathematics+problems+improves+learning) · [Taylor & Rohrer 2010](https://doi.org/10.1002/acp.1595) · [Rohrer et al. 2015](https://scholar.google.com/scholar?q=Rohrer+Dedrick+Stershic+2015+interleaved+practice+mathematics+learning) · [Rohrer et al. 2020](https://scholar.google.com/scholar?q=Rohrer+Dedrick+Hartwig+2020+interleaved+practice) · [Foster et al. 2019](https://scholar.google.com/scholar?q=Foster+Mueller+Was+Rawson+Dunlosky+2019+interleaved+discrimination) · 明细见 `Methoden-Quellen.md` §B。

## 8. 例题与自解释的边界 (Barbieri 2023 / Wittwer & Renkl 2010)

- 中文结论：例题只认"正确例题"，自解释只认"有扶手的"。正确解法的 worked example 中等正效应（g≈0.48，Barbieri 2023）；但"开放式自解释提示"（比如空泛的"解释一下你为什么这么想"）是负调节（β≈-0.24）——问得越空，越把学生带偏。教师讲解整体效应很小（d≈0.16），只对低基础学生有救命作用（Wittwer & Renkl 2010）。翻译成人话：先看一遍正确解法（照着学），自解释要用带步骤的提示（assisted prompts：这一步用了哪个规则？上一步结论是什么？），Feynman 式开放大讲降级为"讲完对照用"，不计首学。
- vault动作：新题型首学 = 1 道正确例题精读（标出每步规则）+ 带扶手自解释两问（哪条规则？为什么这步合法？）；Feynman 模板保留，但只放在"对照修正"环节；低基础科目（新开的 MINT 章节）才加教师讲解/视频。
- 来源链接：[Barbieri et al. 2023](https://scholar.google.com/scholar?q=Barbieri+Miller+Fyfe+2023+worked+examples+self-explanation+meta-analysis) · [Wittwer & Renkl 2010, Educ. Psych. Rev.](https://doi.org/10.1007/s10648-010-9117-7) · 明细见 `Methoden-Quellen.md` §C。

## 9. 反馈与多媒体 (Brummer 2024 / Kandemir / Mayer / Cromley 2025)

- 中文结论：反馈要"轻、快、分层"，课件要"一图一概念"。数字反馈整体 g≈0.41（Brummer 2024）；其中最简单的 KR（只告诉对错，knowledge of results）反而最强（g≈0.64）——先给对错，再给讲解；聚焦过程的反馈（哪里想错了、下一步改什么）胜过只盯任务结果的。反馈时机无差异（g≈0.03，Kandemir），所以延迟展开完全可行：做完一整套再统一对答案，不用做一题对一题。多媒体按 Mayer CTML 15 原则做减法（Cromley 2025 g≈0.37）：去装饰图、口语化、切小段；课程页一条规则——一图只讲一个概念。
- vault动作：反馈三层走——KR（先判对错）→ 延迟展开（整套做完再讲）→ 过程+元认知（错因归类：辨别错/知识错/表达错，见 Fehlerlog）；Lernreise/笔记配图执行"一图一概念"，装饰图不进库。
- 来源链接：[Brummer et al. 2024](https://scholar.google.com/scholar?q=Brummer+2024+digital+feedback+meta-analysis) · [Kandemir u.a. (Feedback-Timing)](https://scholar.google.com/scholar?q=Kandemir+feedback+timing+meta-analysis) · [Mayer CTML](https://scholar.google.com/scholar?q=Mayer+multimedia+learning+cognitive+theory) · [Cromley et al. 2025](https://scholar.google.com/scholar?q=Cromley+2025+multimedia+design+meta-analysis) · 明细见 `Methoden-Quellen.md` §D。

## Klausur-Satz（本页唯一德语存档句，v3）

- `Wir lernen nach Evidenz: Abrufen im Klausurformat, Mischen mit Unterscheiden, Feedback erst kurz, dann vertieft.`
