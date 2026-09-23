import { describe, it, expect, vi, beforeEach } from "vitest";
import { parseSseStream, chatStream } from "./streamClient";
import * as providers from "./providers";

describe("src/ai/streamClient.ts - SSE Parsing and Streaming", () => {
  it("parst vollständige SSE-Zeilen und liefert Deltas", () => {
    const deltas: string[] = [];
    const buffer = `data: {"choices":[{"delta":{"content":"Hallo "}}]}\n\ndata: {"choices":[{"delta":{"content":"Welt!"}}]}\n\ndata: [DONE]\n\n`;

    const { remainingBuffer, isDone } = parseSseStream(buffer, (d) => deltas.push(d));

    expect(isDone).toBe(true);
    expect(remainingBuffer).toBe("");
    expect(deltas).toEqual(["Hallo ", "Welt!"]);
  });

  it("behält unvollständige Zeilen im Puffer für den nächsten Chunk", () => {
    const deltas: string[] = [];
    const chunk1 = `data: {"choices":[{"delta":{"content":"Teil 1"}}]}`; // Keine Newline am Ende

    const res1 = parseSseStream(chunk1, (d) => deltas.push(d));
    expect(deltas).toEqual([]);
    expect(res1.remainingBuffer).toBe(chunk1);

    // Jetzt trifft die Newline + nächstes Event ein
    const chunk2 = res1.remainingBuffer + "\n\ndata: {\"choices\":[{\"delta\":{\"content\":\" Teil 2\"}}]}\n\n";
    const res2 = parseSseStream(chunk2, (d) => deltas.push(d));

    expect(deltas).toEqual(["Teil 1", " Teil 2"]);
    expect(res2.remainingBuffer).toBe("");
  });

  it("ignoriert SSE-Kommentare und leere Zeilen", () => {
    const deltas: string[] = [];
    const buffer = `: keep-alive\n\n\n\ndata: {"choices":[{"text":"Direkttext"}]}\n\n`;

    parseSseStream(buffer, (d) => deltas.push(d));
    expect(deltas).toEqual(["Direkttext"]);
  });

  describe("chatStream mit Mock-Fetch", () => {
    beforeEach(() => {
      vi.restoreAllMocks();
    });

    it("verarbeitet einen SSE-Stream via Response.body.getReader", async () => {
      vi.spyOn(providers, "loadAiConfig").mockReturnValue({
        version: 1,
        engine: "api",
        providerId: "openrouter",
        apiKey: "sk-test",
        model: "gpt-oss",
        baseUrl: "https://example.com/v1",
        embedModel: "",
        vectorMode: "auto",
        hfMirror: "",
      });

      const sseChunks = [
        'data: {"choices":[{"delta":{"content":"Erster"}}]}\n\n',
        'data: {"choices":[{"delta":{"content":" Zweiter"}}]}\n\n',
        "data: [DONE]\n\n",
      ];
      const encoder = new TextEncoder();
      let chunkIdx = 0;

      const mockReader = {
        read: vi.fn().mockImplementation(async () => {
          if (chunkIdx < sseChunks.length) {
            const val = encoder.encode(sseChunks[chunkIdx++]);
            return { done: false, value: val };
          }
          return { done: true, value: undefined };
        }),
        releaseLock: vi.fn(),
        cancel: vi.fn(),
      };

      global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        status: 200,
        body: {
          getReader: () => mockReader,
        },
      } as unknown as Response);

      const received: string[] = [];
      const result = await chatStream([{ role: "user", content: "Hi" }], {
        onChunk: (c) => received.push(c.delta),
      });

      expect(result).toBe("Erster Zweiter");
      expect(received).toEqual(["Erster", " Zweiter"]);
    });

    it("bricht ab, wenn Signal abortiert wird", async () => {
      vi.spyOn(providers, "loadAiConfig").mockReturnValue({
        version: 1,
        engine: "api",
        providerId: "openrouter",
        apiKey: "sk-test",
        model: "gpt-oss",
        baseUrl: "https://example.com/v1",
        embedModel: "",
        vectorMode: "auto",
        hfMirror: "",
      });

      const controller = new AbortController();
      controller.abort();

      await expect(
        chatStream([{ role: "user", content: "Hi" }], {
          signal: controller.signal,
        })
      ).rejects.toThrow();
    });

    it("extrahiert Token-Usage aus SSE-Chunk", () => {
      let reportedUsage: any = null;
      const buffer = `data: {"choices":[{"delta":{"content":"Hi"}}]}\n\ndata: {"choices":[],"usage":{"prompt_tokens":15,"completion_tokens":5,"total_tokens":20}}\n\ndata: [DONE]\n\n`;
      parseSseStream(buffer, () => {}, (u) => {
        reportedUsage = u;
      });
      expect(reportedUsage).toEqual({
        promptTokens: 15,
        completionTokens: 5,
        totalTokens: 20,
      });
    });
  });
});
