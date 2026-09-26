---
fach: Meta
thema: "互动探索式学习重构、滚动同步与学科教具严格隔离"
operatoren: [analysieren, implementieren, optimieren]
klausurrelevant: false
datum: 2026-09-26
tags: [EF, Meta, App, Pedagogy]
---

# 互动探索式学习重构、滚动同步与学科教具严格隔离

> 日期：2026-09-26  
> 状态：✅ 根治完成，全部门禁绿灯（vault-check PASS / Vitest 59 测试套件 391 测试全过 / npm run build 零错误通过）

---

## 1. 用户反馈与根因治理

1. **课程右侧目录不同步 & 回到顶部失败 & 打开未置顶**：
   - **根因**：当前应用的实际滚动容器为 `<div class="... overflow-y-auto ...">`，此前代码直接调用 `window.scrollTo` 导致失效；且文档模式下未对步骤元素挂载视口相交计算，`stepIdx` 无法随滚动更新。
   - **解决**：在 `Reise.tsx` 中建立 `getScrollContainer()` 精确定位滚动宿主，挂载高频滚动监听器计算视口当前小节并驱动 `activeDocStepIdx`；修正「回到顶部」与课程切换滚动重置（`scrollToContainerTop('instant')`）；实时联动全局反馈浮窗（`setFeedbackContext` 精确指向视口步骤）。
2. **生物课件误出社科哲学辩证天平（严重跨学科错位）**：
   - **根因**：外部编写课件时将理科平衡误标记为 `balance`，而前端 `renderEmbeddedTool` 缺乏学科边界守护，将 `balance` 强行绑定到了文科的 `BalanceBoard`。
   - **解决**：
     - 构建学科守卫机制（Discipline Guard）：严禁任何非 SoWi/Philo 学科挂载价值天平；
     - 新建专有理科探究教具：开发 [`OsmoseSimulator.tsx`](../../App-EF-Lernvault/src/components/pedagogy/OsmoseSimulator.tsx)（生物膜渗透与水势计算实验室）与 [`GleichgewichtSimulator.tsx`](../../App-EF-Lernvault/src/components/pedagogy/GleichgewichtSimulator.tsx)（化学反应平衡与勒夏特列原理沙盘）；
     - 批量清洗修复 `Lernreise/` 下所有 MINT 学科误用的 `[Werkzeug: balance]` 标签。
3. **排版层次扁平与缺乏探索式引导**：
   - **解决**：
     - 基于布鲁纳（Bruner）发现学习理论与梅耶（Mayer）信号原则，在 [`Blocks.tsx`](../../App-EF-Lernvault/src/components/Blocks.tsx) 中为 `Hook / Phaenomen`、`Fachbegriff & Definition`、`Wirkungsgefüge / Modell` 注入学术徽标与层次化外框；
     - 升级 `Klausur-Satz` 等考点结论句为独立考试核心卡片（Academic Master Card），强化视觉焦点；
     - 在实验沙盒中内嵌“探究猜想 $\to$ 参数拨弄 $\to$ 顿悟验证 $\to$ 满分归纳”四大阶梯。

---

## 2. 门禁验证结果

1. **单元测试与集成测试**：
   - `npm run test:run`
   - `59 passed (59), 391 passed (391)`（含新增的学科隔离断言与滚动测试，零 Unicode emoji 违规）
2. **Vault 知识库校验**：
   - `python scripts/vault-check.py`
   - `notes=389 csv=1595 reisen=269 badnames=0 badglossar=0` $\to$ **PASS**
3. **前端生产打包**：
   - `npm run build`
   - `✓ built in 4.50s`，TypeScript 0 错误
