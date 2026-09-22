---
fach: ""
thema: "Material-Runde-2"
datum: 2026-09-22
tags: [EF, Meta]
---

# 2026-09-22 Material-Runde 2（深挖收官）

## 新增（`_Downloads/` 1265件/1.23GB）

- bpb IzPB 354全文8MB + Sozialbericht 2024（41MB，Datenreport后继）。
- KMK NaWi 2020三科（命名`2020_06_18-BildungsstandardsAHR_*`）。
- IQB深挖36套（Mathe补6/Englisch Schreiben×2/Deutsch×5/NaWi×18）。
- StanSi深挖：Deutsch Gedichtvergleich+Ma-LK / Englisch Zieltextformate-Tabelle /
  Mathe Op26+GK前后件 / ZKE-Mathe全套（Vorgaben27+TeilA×4+TeilB CAS/WTR）。

## 确认不可下（实锤）

- GOSt-Prüfungsaufgaben页零直链；aufgaben-der-letzten-jahre需Login（0 pdf）→ 用户找老师。
- IQB-HV无mp3直链（在线播）；Musik/Sport无中央考；Serlo/LEIFI只链不爬。

## 脚本

- `fetch-material3.py`（bpb/kmk/iqb-deep/stansi-deep/audio五组，可并行）+ fixup3/4/5。
- 并行实测：三路同跑无冲突（按科分目录写，无共享文件）。
