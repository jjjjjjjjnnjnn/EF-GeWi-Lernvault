---
fach: ""
thema: "Provider-ModellPull"
datum: 2026-09-23
tags: [EF, Meta]
---

# 2026-09-23 新渠道+ccswitch式模型拉取（`[App] fd4ed3d`，199单测）

## 加了什么

- 新预设：**OpenCode Zen**（`https://opencode.ai/zen/v1`）+ **SenseNova商汤**（`https://token.sensenova.cn/v1`，Key站platform.sensenova.cn）；模型名均为可编辑文本框（Roster常变，以站内为准）
- **Base-URL改写**：所有预设下都可填override（空=用预设），R4Qodes/command-code类无名中转直接贴endpoint即用；切换预设自动清空改写不串台；`effectiveBaseUrl`三态（preset/override/custom）+单测锁定
- **⇩ 拉取模型列表**（ccswitch式）：显式按钮GET `{base}/models`（8秒超时，自动带Key），回全量名单点选即用（>8个显示计数）；失败显错（401=Key错）、空名单提示手填；探针`timeoutMs`参数化（默认2s不动旧行为）

## 取证

- 199/199单测（新providers 3+heartbeat超时1）+build 5.93s+vault-check(38/203/130)+1420在线
- 未识别项：`commande code`/`R4Qodes`无公开endpoint可验，暂用改写栏/AI-SETUP指引覆盖；用户给出确切URL后可追预设
