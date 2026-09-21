---
fach: ""
thema: "Maintenance session"
datum: 2026-09-21
tags: [EF, Meta]
---

# 2026-09-21 维护专场记录

## 卫生
- 删 `data/`（DeepTutor 运行泄漏：user/logs/settings，非跟踪文件）+ 空 `outputs/`，铁律恢复。
- 本地重物（不进 git，仅记录）：node_modules 99MB · src-tauri/target 1.3GB · _Downloads 93MB。
  target 如需清盘跑 `cargo clean`（重编约 3 分钟），P2 前不清。

## 文档同步
- AGENTS.md：修 §5 重复编号（两个"2."→2/3/4/5/6/7/8）；新增 §7 App 约定
  （只读vault/build必过/禁新依赖/双规范/tauri打包与署名门禁）。
- HANDOVER.md：铁律前缀补 `[App]` + 构建产物忽略清单。
- README.md：结构补 Skills/App 条目；OpenStax 许可勘误 CC-BY → CC BY-NC-SA·仅本地学习。
- INDEX：Journal 链完整（8 篇全在）；学科表/App 区/Dataview 无需动。

## 待办（未变）
- P2 ts-fsrs → P3 LM Studio → P5 签名发版；课堂笔记/Lektüre/Topic 等用户输入。
