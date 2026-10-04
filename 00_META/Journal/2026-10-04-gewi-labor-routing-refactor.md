---
fach: Meta
thema: "Labor GeWi-Routing Refactor & Entkopplung"
operatoren: [analysieren, beurteilen]
klausurrelevant: false
datum: 2026-10-04
tags: [EF, Meta, App]
---

# Labor GeWi-Routing Refactor & Entkopplung

## 1. 背景与排查

用户截屏反馈（`firefox.exe_20261004_125326.png`）：
在打开宏观经济学模拟 `sowi-ezb-geldpolitik`（欧洲央行货币政策沙盒）时，界面上方显示该标题，下方实验台却错误呈现为哲学 `philo-willensfreiheit`（李贝特 1983 准备电位实验与自由意志两难天平）。
此外，文科实验台在处理未硬编码议题时过度同质化。

### 根因分析：
1. **路由条件过宽**：在 `Labor.tsx` 中，原逻辑判定 `sim.fach === "Philosophie" || sim.fach === "Deutsch" || (sim.fach === "SoWi" && !QUANT_IDS.includes(sim.id))` 导致绝大多数社科宏观量化模型被截流进入了文科定性思辨台。
2. **默认 Fallback 串味**：在 `GewiInteractiveWorkbench.tsx` 中，`balanceCase` 取值直接硬编码 `GEWI_BALANCE_CASES[sim.id] ?? GEWI_BALANCE_CASES["philo-willensfreiheit"]`，一旦匹配不到，直接跌入自由意志脑神经实验。
3. **状态未随课题刷新**：`activeWeightIds` 的初始状态仅在组件挂载时计算，切换课题未触发重置。

## 2. 解决方案与核心改动

1. **`Labor.tsx` 精确白名单路由**：
   - 提取 `GEWI_WORKBENCH_IDS` 明确名单（自由意志、功利主义、定言命令、平庸之恶、福利国家争鸣、最低工资争鸣、生态碳税、区位辩论、Sachtext 论证结构等定性议题）；
   - 欧洲央行货币政策（`sowi-ezb-geldpolitik`）、菲利普斯曲线、社保转移动态、比较优势等量化模型全部归入 `UniversalInteractiveWorkbench`，呈现真实的利率走廊、通胀冲击与货币供需交互。
2. **`GewiInteractiveWorkbench.tsx` 动态辩证天平生成器**：
   - 增补了 4 套专属考点案例：`sowi-mindestlohn`、`sowi-oekosteuer`、`sowi-standort-deutschland`、`deutsch-sachtext-argument`；
   - 开发 `getOrGenerateBalanceCase(sim)`：无论未来增加任何新文科微课，均依据 `sim.titleDE / ZH` 与 `sim.themenDE / ZH` 实时提炼出严密的 Pro/Contra 论据砝码、德国基本法维度、Sachurteil 事实依据与 Werturteil 价值裁决支架，绝不跌入无关实验；
   - 引入 `useEffect` 监听 `balanceCase`，切换任何新题目自动重置托盘砝码为当前命题。

## 3. 门禁与工程质检

- `cmd /c "npx tsc -b"`：0 错误。
- `cmd /c "npm run build"`：生产打包 6.47s 成功完成（566 modules 干净构建）。
- `python scripts/vault-check.py`：PASS（notes=401, csv_rows=1921, index_links=332, reisen=356, badnames=0, badglossar=0）。
- `python scripts/simulate-user-interaction.py`：100% PASS（356 门互动微课、1,931 张词卡、403 个拓扑节点、933 跨学科术语全量仿真通过）。
- `HANDOVER.md` 同步更新 2026-10-04 里程碑。
