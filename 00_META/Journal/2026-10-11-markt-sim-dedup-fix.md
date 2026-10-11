---
fach: ""
thema: "Markt-sim互动撞车修复"
operatoren: []
klausurrelevant: false
datum: 2026-10-11
tags: [EF, Meta, App]
---

# Journal — 两节 SoWi 课 Step 2 互动完全一样（用户报障 → 根因 → 修复）

## 报障（用户原话）
> 这里的两节课的内容的互动部分还是完全一样的啊（附 Studio Tab Step 2 截图：Markt-Labor 寒潮/三文鱼/+50%）

## 根因（已实证，非推断）
1. `MarktgleichgewichtSim.tsx` 使命/情境/靶心 **全硬编码**（寒潮+三文鱼+50%，48~52% 门限），props 只有 `lang/onMissionComplete`。
2. `InteractiveLessonRunner.tsx:360-366` 挂载时**不传任何课程相关数据**，且底部提示另硬编码 +50%。
3. 凡 `interactiveType === "markt-sim"` 的 quest（Preismechanismus 与 Soziale Marktwirtschaft 都命中：标题含 preis / matchedToolId）渲染**字节级相同**的互动。
4. 排除项：两份 md 源 Step 4 AUFGABE/TARGET 本就不同（Preis 8-12€/Höchstpreis 6€ vs Mindestlohn 12→15€），此前审计"TARGET逐字相同"指 Step 1 预告行；`balance-board` 在 Bio/Chemie 约80处是合法通用天平，不在此案内。

## 修复（[App] commit，本日志同批）
- `MarktgleichgewichtSim.tsx`：新增 `scenarioId?: "kaelte" | "sozial"`（默认 kaelte 零回归）+ `MARKT_SCENARIOS` + `resolveMarktScenarioId(title, summary)`（sozial 关键词：sozial/mindestlohn/mitbestimmung/sozialstaat/umverteilung/sozialer ausgleich/grundgesetz/tarifautonomie）。
- sozial 情境：能源冲击叙事 + 滑块"能源成本" + 靶心 **+30%±2** + 结论数随模型动态算（12.4 € / 380 kg）+ 转移支付兜底结论。
- Runner：按 quest 选路传参，底部提示跟随情境目标值；非 markt-sim 微世界提示去 +50% 硬编码。
- 测试：sim 新增 sozial 情境单测 + resolve 单测；Runner 新增 Soziale quest 走 sozial 使命的端到端单测（+50% 不解锁、+30% 解锁）。

## 门禁
- vault-check PASS（420/1942/384/361）· tsc 0 报错 · vitest **94套件730项全绿**（727+3新）。

## 残留
- md 层两课 Step 1 HOOK 仍高度相似（战役复用句式），属内容质量债，未动；若用户继续报障再单开 [SoWi] 改写 HOOK。
- KinematikSim / MagischesViereckSim 是否同类硬编码病，待查（本次用户只报 markt-sim）。
