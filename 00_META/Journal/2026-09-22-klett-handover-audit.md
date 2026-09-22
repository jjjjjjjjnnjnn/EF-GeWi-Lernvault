---
fach: ""
thema: "Klett-Handover-Audit"
datum: 2026-09-22
tags: [EF, Meta]
---

# 2026-09-22 Klett交接·更新·审核

## 文件交接（Klett Bridge 23/23 ✅收官）

- 位置：`_Downloads/Englisch/klett-bridge/01_t1–05_t5/` + `manifest.json`（done=23）。
- 组成：mp3×9 + mp4×14，全验头有效（ID3/ff-fb/ftyp），每件配`.quelle.txt`（Klett版权本地永不提交）。
- 尾段：19后Playwright/Chromium后台启动挂起（10分钟零输出）→ 改纯HTTP（auth cookie直连），
  380MB大mp4一次收净。教训：大文件优先纯HTTP，浏览器只做登录和盘点。

## 三个修（根因防再犯）

1. **双跑**：本环境每个bash python调用被hermes+uv双运行时各执行一次
   （证据：kb-script成对、fetch_all旧对、klett_fetch连现三对）。对策：fetch脚本强制单实例锁。
2. **锁竞态**：先查后写双进程同过 → 原子`open "x"`+5轮重试；另有一零CPU惰性残留杀之。
3. **静默死**：后台detached进程偶发无痕死亡 → fetch脚本一律落盘日志+traceback
  （`fetch.log`/`klett-fetch.log`，均gitignored）。

## 项目更新

- `_Downloads/` 1302件/2.33GB；Sozialbericht 2024(41MB)就位；Download-Quellen N6/N7同步。
- 抓取锁原子化：`fetch_all.py` + `klett_fetch.py`改`open(x)`+5次重试清僵尸锁；`.gitignore`补`klett-fetch.lock`。
- HANDOVER日期→2026-09-22，待办重排（Klett收尾/等Lektüre-Topic/真题墙+P5）。

## 审核（终）

- `python scripts/vault-check.py` → PASS（notes=28 csv_rows=147 bad=0 links=83 missing=0 reisen=3）。
- Web 1420挂过一次（node全灭）→ 已重启，200正常。
- `_Downloads/` 约1330件/约2.7GB（Klett视频占大头）；无`data/`泄漏；auth/inventory/bridge媒体全gitignored。
- `git status`干净后推，HANDOVER同步到23/23。
