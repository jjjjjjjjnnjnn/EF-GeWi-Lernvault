---
name: vokabel-trainer
description: 背单词/术语：双向默写、csv同步、SR写法。触发词：背单词 / Vokabeln / 默写 / Fachbegriffe。
---

# Vokabel-Trainer（背单词专用）

## 何时用
用户说“背单词”“默写”“Vokabeln abfragen”时加载本skill。

## 步骤
1. 从该科 `Vokabeln-Anki/*.csv` 取词（格式 `Deutsch;Chinesisch;Beispielsatz;Fach;Thema`）。
2. 双向考：DE→中文，中文→DE；每词必须带Beispielsatz造句才算过。
3. 新词追加到csv末尾一行 + 同步到 `00_META/Glossar-DE-ZH-GeWi.md` 一行。
4. Obsidian内背诵用单行 `Begriff::Definition / 中文`（SR插件自动调度）。
5. 如DeepTutor可用，调 `flashcard-deck`（抽认卡）或 `language-learning`（英语drill）执行，本skill只管词库同步。

## 规则
- 每天新词≤15；先考旧词再学新词。
