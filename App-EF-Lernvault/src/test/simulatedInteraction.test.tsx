/**
 * 端到端全流程模拟交互测试 (Simulated Interactive Test Suite)
 * 验证目标：
 * 1. 在 UI 内部完成端点测速与实时对话探针调用，杜绝外部跳出
 * 2. 模拟 LM Studio 本地接口调用，严格验证 payload 包含合法的 messages 数组，根除 'messages' field is required
 * 3. 验证网络异常/未开服务时的内嵌自愈排查指引 (Remedy Tip)
 * 4. 验证多级路由与离线降级容灾执行
 */

import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import AiSettings from "../components/AiSettings";
import { executeChatWithRouting } from "../ai/router";
import {
  setActiveEndpointId,
  setFallbackEndpointId,
} from "../ai/endpoints";
import { saveAiConfig } from "../ai/providers";

describe("Simulated Interactive Testing (应用内模拟交互测试规范)", () => {
  beforeEach(() => {
    localStorage.clear();
    vi.restoreAllMocks();

    // 初始化为 API 引擎，活跃端点为 LM Studio
    saveAiConfig({
      version: 1,
      engine: "api",
      providerId: "ollama",
      apiKey: "",
      model: "llama-3-sauerkrautlm-8b-instruct",
      baseUrl: "http://localhost:1234/v1",
      embedModel: "",
      vectorMode: "off",
      hfMirror: "",
    });
    setActiveEndpointId("ep-lmstudio");
  });

  it("Tab 1: 模拟用户在简单模式下查看 LM Studio 并一键测试连通性", async () => {
    // 模拟 LM Studio /models 接口返回正常
    global.fetch = vi.fn().mockImplementation(async (url: string) => {
      if (url.includes("/models")) {
        return {
          ok: true,
          status: 200,
          json: async () => ({
            data: [{ id: "llama-3-sauerkrautlm-8b-instruct" }],
          }),
        } as unknown as Response;
      }
      return { ok: false, status: 404 } as unknown as Response;
    });

    render(<AiSettings lang="zh" />);

    // 1. 验证 LM Studio 状态卡片在简单模式下可见（不被隐藏）
    expect(screen.getByText(/当前主路由端点:/)).toBeDefined();
    expect(screen.getAllByText(/LM Studio/).length).toBeGreaterThan(0);

    // 2. 验证测试按钮存在并点击
    const pingBtn = screen.getByText("⚡ 测试连接");
    expect(pingBtn).toBeDefined();

    fireEvent.click(pingBtn);

    // 3. 验证即时反馈与连通状态更新
    await waitFor(() => {
      expect(screen.getByText(/连通成功/)).toBeDefined();
    });
  });

  it("Tab 1: 模拟点击【实时对话探针】，严格验证 messages 结构，防止 LM Studio 报 'messages' field is required", async () => {
    let capturedBody: any = null;

    global.fetch = vi.fn().mockImplementation(async (url: string, init: any) => {
      if (url.includes("/chat/completions")) {
        capturedBody = JSON.parse(init.body);
        return {
          ok: true,
          status: 200,
          json: async () => ({
            model: "llama-3-sauerkrautlm-8b-instruct",
            choices: [
              {
                message: {
                  content: "Hallo! LM Studio ist einsatzbereit für Ihr EF-Training.",
                },
              },
            ],
          }),
        } as unknown as Response;
      }
      return { ok: false, status: 404 } as unknown as Response;
    });

    render(<AiSettings lang="zh" />);

    const probeBtn = screen.getByText("💬 实时对话探针");
    expect(probeBtn).toBeDefined();

    fireEvent.click(probeBtn);

    // 验证请求体：必须包含有效的 messages 数组，且包含 user 角色
    await waitFor(() => {
      expect(capturedBody).not.toBeNull();
      expect(Array.isArray(capturedBody.messages)).toBe(true);
      expect(capturedBody.messages.length).toBeGreaterThan(0);
      expect(capturedBody.messages[0].role).toBe("user");
      expect(typeof capturedBody.messages[0].content).toBe("string");
      expect(capturedBody.messages[0].content.length).toBeGreaterThan(0);
    });

    // 验证 UI 上正确渲染出模型实际回复与模型名称
    await waitFor(() => {
      expect(
        screen.getByText(/Hallo! LM Studio ist einsatzbereit/)
      ).toBeDefined();
      expect(screen.getByText("llama-3-sauerkrautlm-8b-instruct")).toBeDefined();
    });
  });

  it("模拟 LM Studio 端口未开启或 CORS 拦截场景，验证内嵌排查自愈指引显示", async () => {
    // 模拟连接失败（端口拒连或 CORS 错误）
    global.fetch = vi.fn().mockRejectedValue(new TypeError("Failed to fetch"));

    render(<AiSettings lang="zh" />);

    const probeBtn = screen.getByText("💬 实时对话探针");
    fireEvent.click(probeBtn);

    // 验证在界面上直接给出针对性建议，用户不用切出 App
    await waitFor(() => {
      expect(screen.getByText(/连通失败/)).toBeDefined();
      expect(screen.getByText(/LM Studio 用户：请确认 Local Server 已启动/)).toBeDefined();
      expect(screen.getByText(/Enable CORS/)).toBeDefined();
    });
  });

  it("Tab 2: 模拟用户切换到端点管理标签，验证卡片上测试连接与探针内嵌展示", async () => {
    global.fetch = vi.fn().mockImplementation(async (url: string) => {
      if (url.includes("/chat/completions")) {
        return {
          ok: true,
          status: 200,
          json: async () => ({
            model: "llama-3-sauerkrautlm-8b-instruct",
            choices: [{ message: { content: "OK vom Tab2" } }],
          }),
        } as unknown as Response;
      }
      return { ok: true, status: 200 } as unknown as Response;
    });

    render(<AiSettings lang="zh" />);

    // 切换到 Tab 2
    const endpointsTabBtn = screen.getByText("端点与路由");
    fireEvent.click(endpointsTabBtn);

    // 找到卡片上的对话探针按钮并触发
    const probeButtons = screen.getAllByText("💬 对话探针");
    expect(probeButtons.length).toBeGreaterThan(0);

    fireEvent.click(probeButtons[0]);

    await waitFor(() => {
      expect(screen.getByText("OK vom Tab2")).toBeDefined();
    });
  });

  it("级联容灾模拟：当 LM Studio 挂起时，智能路由自动切换到备用端点或本地知识库", async () => {
    // 设置主路由为 LM Studio，备用端点为 DeepSeek
    setActiveEndpointId("ep-lmstudio");
    setFallbackEndpointId("ep-deepseek");

    // 模拟主端点请求失败，备用端点成功
    let callCount = 0;
    global.fetch = vi.fn().mockImplementation(async (url: string) => {
      callCount++;
      if (url.includes("1234")) {
        throw new Error("LM Studio offline");
      }
      // 备用端点 DeepSeek 返回 SSE 流
      const stream = new ReadableStream({
        start(controller) {
          controller.enqueue(
            new TextEncoder().encode(
              'data: {"choices":[{"delta":{"content":"Antwort von DeepSeek Backup"}}]}\n\ndata: [DONE]\n\n'
            )
          );
          controller.close();
        },
      });
      return {
        ok: true,
        status: 200,
        body: stream,
      } as unknown as Response;
    });

    const result = await executeChatWithRouting(
      [{ role: "user", content: "Was ist soziale Marktwirtschaft?" }],
      "Was ist soziale Marktwirtschaft?",
      [],
      []
    );

    expect(result.source).toBe("fallback");
    expect(result.reply).toContain("Antwort von DeepSeek Backup");
    expect(callCount).toBe(2); // 第一次尝试 LM Studio 失败，第二次调用 DeepSeek 成功
  });
});
