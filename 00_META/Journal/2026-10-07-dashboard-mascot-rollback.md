---
fach: ""
thema: "Journal 2026-10-07 Dashboard Mascot Integration Rollback und User Review"
operatoren: []
klausurrelevant: false
datum: 2026-10-07
tags: [EF, Meta, Journal]
---

# 2026-10-07 — 吉祥物嵌入与总台重构回退记录

## 1. 触发背景
在针对总台 UI 进行吉祥物嵌入（低多边形小狐狸）与部分卡片网格重构后，用户审阅真实运行界面（截图 `C:\腾讯电脑管家截图文件\firefox.exe_20261007_111516.png`）后给出明确反馈：
> “目前版本没有原来版本好。回退，记录”

## 2. 视觉反思与复盘记录
通过对比用户提供的截图与原先版本的视觉呈现，发现以下问题导致整体感反而不如原版：
1. **吉祥物矢量图与纯黑白德式学术风产生割裂**：小狐狸的低多边形几何面虽然具有设计感，但放在严谨的“会考战力与升阶总台”标题旁以及侧边栏底部时，打破了原本纯粹、高冷、沉浸的德式理性功能主义（German Functionalism / Tufte Paper-Ink）质感；
2. **彩色强调导致视觉锚点分散**：狐狸的橙色与原本克制使用的 `--accent` 发生了注意力争夺，界面显得不够稳重；
3. **原版设计的经典优势**：原本的二分屏动线（左侧今日战场、右侧雷达图诊断、分阶战役路线及质感印章徽标）在黑白纸墨质感下高度自洽，信息密度和学术张力更为平衡。

## 3. 回退操作与执行清单
- 执行精确 Git Revert (`git revert --no-edit e3a179a`)：
  - 完整回退 `App-EF-Lernvault/src/modules/DashboardCockpit.tsx` 至稳定版本（保留印章徽标、原本的伴学互动与经典排版）；
  - 回退 `App-EF-Lernvault/src/App.tsx`（移除侧边栏伴学桌宠，恢复原有侧边栏纯净排版）；
  - 回退 `App-EF-Lernvault/src/index.css`（移除吉祥物专属颜色类与冗余按钮类）；
  - 移除临时吉祥物组件 `src/components/mascot/`。
- 保留先前经过完整验证的 `Reise.tsx` 跨学科沙盘注册与各科考后 Fehlerlog 记录。

## 4. 全量验证结果
- `vitest run src/modules/DashboardCockpit.test.tsx src/modules.test.tsx`: 27/27 PASS（全绿通过）；
- `npx tsc -b`: 0 报错通过；
- `python scripts/vault-check.py`: PASS（412 篇笔记、1942 行词汇、356 门微课，bad=0）。
