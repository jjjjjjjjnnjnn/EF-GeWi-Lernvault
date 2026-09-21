---
fach: ""
thema: "App kickoff 2026-09-21"
datum: 2026-09-21
tags: [EF, Meta]
---

# 2026-09-21 App开工记录

## 决策
- 形态：独立桌面软件（Tauri 2.x + React），一站式单入口，对标 Knowunity（砍社区/账号）。
- 位置：vault 内 `App-EF-Lernvault/`（用户指定建在文件夹下；AGENTS.md §1 已加唯一例外）。
- 定名：EF-Lernvault（`Lernvault` 德语拼法无撞车；英文 LearnVault/LessonVault 均已存在，加 EF- 前缀区分）。
- 许可：public 仓库 + 自有三条式半开源 LICENSE（草案待过目）；零 DeepTutor/Anki/AGPL（clean-room）。
- Rust 工具链：rustup 1.29.1 + stable 1.98.1 已就绪；MSVC BuildTools 后台安装中。

## 已做
- 前端原型 6 模块（Bibliothek/Karteikarten/Quiz/KI-Tutor/Lernplan/Mindmap）+ 中德切换 + 全局搜索；`npm run build` 一次过（tsc+vite，0漏洞）。
- LICENSE 草案、NOTICE.md、README.md；.gitignore 补构建产物/密钥；AGENTS（结构例外+[App]前缀）/INDEX/HANDOVER 同步。

## 待办
- 用户过目 LICENSE 草案（定稿后 P5 才能发版）。
- MSVC 就绪后：加 src-tauri，打首个 exe（P0 完成）。
- P1 起接真实 vault 解析，替换 mock 数据。
