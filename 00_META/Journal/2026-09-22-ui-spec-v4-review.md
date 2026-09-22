---
fach: ""
thema: "UI-SPEC-V4-Review"
datum: 2026-09-22
tags: [EF, Meta]
---

# 2026-09-22 UI-SPEC-V4 复核（主Agent验外部AI交工）

##  verdict: PASS，准予入库

- 复现构建：`npm run build` 本地一次过，产物哈希与外部AI报告逐字节一致（`index-CznlNkor.css` / `index-CroYV04n.js`），构建可复现。
- 零回归：5步Klausur流程未动（`generateQuizFromNote`/`MOCK_QUIZ`/`RUBRIC_CRITERIA`逐字在），`vorgehen`第4维已接线（评估+手工切换+LM批改正则三处）；scheduler.ts零改动；FSRS队列未碰。
- 规范遵守：无新依赖（package.json零diff）、无emoji、`1·2`已登记`QUIZ_SHORTCUTS`、`isTyping()`守卫在新旧两套快捷键均在、Zitierpflicht chips三处引用`sourceRef`、`eflernvault:vergleich:v1`带`version: 1`。
- V4交付物齐：VergleichItem/getVergleichItems/MOCK两科示例、双模式切换器、L1/L2/L3、5条dd文案挂载（Quiz/Planner/Flashcards/Fehlerlog/材料区）、Fehlerlog补丁复制。
- vault-check PASS（links=87）；截图5张未入库（正确，二进制不进git），控制台0错采信其自验。

## 技术债（接受，不 blocking，下轮顺手收）

1. `getVergleichItems`恒返MOCK（vault解析stub）：Vergleich内容暂为演示数据，未接`buildDiscriminationTask/buildContrastTask`。V4只定了UI不管数据管线，故接受；下轮把v3两builder输出喂给Vergleich模式。
2. 双RUBRIC形状并存：v3 `RubricCriterion`（operator/fachbegriff/beleg/vorgehen）vs VergleichItem.rubrics（…/belegkette/operatorabfolge）。两模式各用一套，无冲突；统一待定。

## 入库

- 外部AI两笔（`a1ba979`实施 + `7ff07f7` Journal）+ 本复核，直接push。
