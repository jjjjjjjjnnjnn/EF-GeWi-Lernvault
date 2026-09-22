---
fach: ""
thema: "Onboarding"
datum: 2026-09-23
tags: [EF, Meta]
---

# 2026-09-23晚 App首次使用流三步引导（WebUI验证）

## 做了什么（`[App] b97e384`，已push，build 1.15s，dev 1420冒烟200）

- 新模块 `src/modules/Onboarding.tsx`：Schritt 1 Vault verbinden（复用openVault，跳过进Demo）→ Schritt 2 Fächer wählen（三组诚实状态：Bereit SoWi/Philo、Im Aufbau 6科、Gerüst Chemie/Sport）→ Schritt 3 Ziel setzen（Klausurtermin写进`eflernvault:plan:v1`，tasks不动）。存`eflernvault:onboarding:v1`（version:1）。
- 默认语言跟系统：`navigator.language` zh→zh，否则德语；用户切换持久化`eflernvault:lang`。
- 落地页=Lernreise + 首选科filter；命令面板加"重新显示引导"；`?`帮助加Start/引导节（keys.ts登记ONBOARDING_SHORTCUTS；Enter=下一步仅向导内、输入框豁免）。
- 契约：零新依赖、零外部请求、不写vault、tufte token、内联文案全走i18n双语。

## 用户验证动作（WebUI）

1. 清localStorage开1420→三步走完→应落Lernreise且规划里有考试倒数。
2. 刷新→不再出现引导（断点续学）；命令面板搜"引导"可重开。
3. L键中德切换，刷新后保持。
