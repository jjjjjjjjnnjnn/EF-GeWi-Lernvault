---
fach: ""
thema: "ModellPull-Proxy-Fix"
datum: 2026-09-23
tags: [EF, Meta]
---

# 2026-09-23 拉取失败修复：dev代理+CORS诊断（`[App] 627b670`，202单测）

## 根因（用户：一直networkerror，网络正常）

- 浏览器直连第三方`/models`被CORS拦截（TypeError Failed to fetch），旧代码原样展示=看不懂的networkerror
- 另：旧拉取走localStorage旧配置，不带当前Key；Key只放URL风险

## 修法

- `vite.config.ts`新中间件`/__models?target=`：Node侧代取（CORS-free），Key只走`x-proxy-auth`头转发（不进URL/log），8s超时，统一200信封`{ok,status,body}`
- `pullModelList()`：代理优先→直连兜底；错误分类（HTTP码/CORS_BLOCK/Timeout/空名单），401=Key错可读
- AiSettings：拉取改走当前表单值（base override+Key实时）；失败中文明示（含旧进程重启指引）；成功名单标"经本地代理"；endpoint/key变更旧名单即失效
- 取证：202/202+build 9.80s+vault-check(38/203/131)；dev已重启，代理实测OpenRouter回200真名单

## 用户操作

- 刷新页面→AI设置→点"⇩ 拉取模型列表"（需Key站点先填Key再拉）
- opencode go端点：URL未知，待用户给确切地址后追预设（改写栏可先顶）
