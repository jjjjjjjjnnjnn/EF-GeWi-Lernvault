---
fach: ""
thema: "StanSi-Runde4"
datum: 2026-09-22
tags: [EF, Meta]
---

# 2026-09-22 StanSi全站通扫Runde4（9路并行）

## 战果：58 PDF / ~20MB → `_Downloads/<Fach>/stansi-runde4/`

| 路 | 件 | 要点 |
|---|---|---|
| SoWi | 9 | Vorgaben 27–29全补 + bili-Operatoren + Gestaltungsaufgaben终版 + sl/vl示例×5 |
| Philo | 3 | Vorgaben 27/28/29 |
| Deutsch | 2 | IVa示例 + 2026-09-10 Neuerungen PPP |
| Englisch | 0 | 9件全已有（含2027_neu/2028/2029），纯no-op |
| Mathe | 17 | ab2026示例全系（Vorblatt+Teil1 LK+Teil2 GK/LK×14 CAS/WTR） |
| Physik | 3 | **Konstruktions/Korrekturzeichen/LK-Beispiele此前实缺**（预期"已有"是错的），补齐 |
| Chemie | 3 | **Operatoren/Konstruktions/Korrekturzeichen同前，补齐** |
| Bio | 1 | **Korrekturzeichen同前，补齐** |
| Querschnitt | 20 | ZP10德英数Operatoren+Konstruktion + GOSt Termine 27/28 + Ergebnisberichte 23–25 + Abi-Formulare + Recht |

## 三个发现

1. **预期错的**：M5/N5轮按"文件名前缀`stansi_`"记账，但Physik/Chemie/Bio的operatoren/konstruktions/korrekturzeichen其实从未下过——本轮agent按**全库glob核对**纠了偏。教训：记账以glob为准，不以记忆为准。
2. **登录墙三站确认**：GOSt/ZKE/ZP10的Prüfungsaufgaben 2024–26全部`/modal/login`，各科manifest的`loginwall`数组留了证，未碰。找老师要的清单不变。
3. **WbK/BK只记链**：24 Fach-URL + Bildungsgänge清单已留（与EF无关，未来如需再开）。

## 验收

- 58件全验`%PDF-`头+配`.quelle.txt`；9路manifest齐（Englisch no-op无产物）。
- vault-check PASS；`[Meta] stansi-runde4` commit推送。
