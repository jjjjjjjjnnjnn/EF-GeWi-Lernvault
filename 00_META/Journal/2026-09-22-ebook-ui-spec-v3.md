---
fach: ""
thema: "Ebook done + UI-SPEC-V3"
datum: 2026-09-22
tags: [EF, Meta]
---

# 2026-09-22 电子书完工·切分·UI-SPEC-V3

## 电子书完工（429/430页）

- 自然跑完：连续5个HTTP 500自动停，last_page=430；唯一缺页media 2（17KB封面背，<20KB规则跳过，已复核200非漏抓）。
- 切分：`scripts/ebook-split.py`按关键词跃迁定界（±2页，写笔记时按Kapitelauftakt核），
  13文件进`_Downloads/SoWi/split/`（gitignored）：front 13 + K01~K11 + back 31。
- 分区：K01 p15-46 / K02 47-95 / K03 96-114 / K04 115-168 / K05 169-216 /
  K06 217-242 / K07 243-276 / K08 277-297 / K09 298-340 / K10 341-387 /
  K11 388-399 / back 400-430（Glossar/Methodenglossar/Operatoren/Register）。
- K09抽查43页116KB，Wettbewerb/Preis内容对位正确。

## UI-SPEC-V3（给外部AI，P2/P3/P4界面）

- `App-EF-Lernvault/UI-SPEC-V3.md`：全局三态（空/降级/错误）+ P2背卡到期行与完成态
  + Tutor引用chips + Quiz五步 + Planner/Mindmap/act-export + 文案表11条 + 验收清单。
-  grounded：修了Flashcards四个评分按钮行为相同bug；Space计时仅Quiz生效；新键登记keys.ts。

## 待办

- SoWi 11篇按Template v2写（split→vault，INDEX/Glossar/csv三同步）。
- UI-SPEC-V3发外部AI；主Agent只验build+6模块无红字。
