---
fach: ""
thema: "Curriculum Pedagogy Rework & Archetype Templates"
operatoren: [analysieren, strukturieren, entwerfen]
klausurrelevant: false
datum: 2026-10-10
tags: [EF, Meta, Pedagogy, Curriculum]
---

# Journal: 课程教学架构性重塑与四大分科教学模板总纲

## 1. 任务背景与核心痛点
针对用户提出的“课程内容稀碎、极差、学不会，假大白话套话充斥、交互堆叠地狱、缺乏动手实操”的严重教学法硬伤，进行根本性认知科学与架构重塑。

## 2. 核心举措与交付物
1. **教学法与认知架构病理深剖**：
   - 彻底排查假费曼套话（Pseudo-Feynman）、模板同义反复、虚假角色代入（RPG Bloat）、框中框堆叠地狱与伪多邻国长文阅读等 6 大硬伤。
   - 确立“具象生活微场景（<60字）”、“10秒强制直觉站队（A/B Dilemma）”、“动态实验仿真（POE）”、“因果闭环传导”等认知铁律。
2. **标杆大厂教学法融通**：
   - 深度借鉴 Anthropic 交互教程（Motivating Failure -> Mental Model -> Sandbox -> Anti-Patterns）、Brilliant.org 主动学习（POE 挑战先行）、OpenAI/DeepLearning.AI 实操实验室、Study-Mate（边做边学与搭载考纲笔记）以及北威州 KLP 高中考纲（AFB I-III 与双轨评价）。
3. **四大分科黄金教学模板落地 (`Templates/Kurs-Didaktik-Template.md`)**：
   - **模板 A (社科 / SoWi)**: 制度博弈与因果闭环模型 (Dilemma-Incentive-Kausalkette)
   - **模板 B (哲学 / Philosophie)**: 伦理法庭与第一性原理思辨模型 (Ethical-Crucible-Dialectic)
   - **模板 C (文学语言 / Deutsch & Englisch)**: 文本解剖与时代修辞透镜模型 (Text-Anatomy-Rhetoric)
   - **模板 D (理科 / MINT)**: POE 仿真探究与极值定理实验室 (Predict-Observe-Derive)
4. **全景外部 AI 批量生产总纲与发卷指令 (`00_META/EXTERNAL-AI-COURSE-PRODUCTION-PROMPT.md`)**：
   - 包含外部 AI 核心发卷指令（Copy-Paste Master Prompt）、GitHub/公开资源定向检索 SOP、4 大模板全真工业级课件范文、40 门核心课题缺口矩阵及自动化验收检查清单。

## 3. 自动化验证
- `python scripts/vault-check.py`: PASS (419 notes, 1942 csv rows, 374 index links, 0 badnames, 0 badglossar)
- `npx vitest run`: 89 test suites, 686 tests passed.
- `cmd /c "npx tsc -b"`: 0 errors.
