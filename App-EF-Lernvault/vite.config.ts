/// <reference types="vitest/config" />
import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// Dev-proxy fuer modell-pull (ccswitch-stil): browser -> same-origin /__models
// -> node-fetch ans echte /models (CORS-frei). Nur dev; prod faellt auf direkt zurueck.
// Dev-proxy fuer KI-Endpunkte & Modell-Pull (CORS-frei im Browser):
// 1) /__models: Model-Pull
// 2) /__ai_proxy: Universeller Proxy fuer GET, POST (Chat, Ping, Test, Streaming)
function aiGatewayProxy(): Plugin {
  return {
    name: "ai-gateway-proxy",
    configureServer(server) {
      // 1. Abwaertskompatibler Modell-Pull
      server.middlewares.use("/__models", async (req, res) => {
        const send = (code: number, obj: unknown) => {
          res.statusCode = code;
          res.setHeader("Content-Type", "application/json");
          res.end(JSON.stringify(obj));
        };
        try {
          const u = new URL(req.url ?? "", "http://x");
          const target = (u.searchParams.get("target") ?? "").replace(/\/$/, "");
          if (!/^https?:\/\//.test(target)) {
            send(400, { ok: false, status: 400, error: "bad target" });
            return;
          }
          const ctl = new AbortController();
          const t = setTimeout(() => ctl.abort(), 8000);
          try {
            const fwdKey = req.headers["x-proxy-auth"] || req.headers["authorization"];
            const r = await fetch(`${target}/models`, {
              headers: fwdKey ? { Authorization: String(fwdKey) } : {},
              signal: ctl.signal,
            });
            const body = (await r.text()).slice(0, 200000);
            send(200, { ok: r.ok, status: r.status, body });
          } finally {
            clearTimeout(t);
          }
        } catch (e) {
          send(200, { ok: false, status: 0, error: e instanceof Error ? e.message : "proxy-fetch failed" });
        }
      });

      // 2. Universeller AI Gateway Proxy /__ai_proxy (fuer Ping, Chat, SSE-Stream)
      server.middlewares.use("/__ai_proxy", async (req, res) => {
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.setHeader("Access-Control-Allow-Headers", "*");
        res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
        if (req.method === "OPTIONS") {
          res.statusCode = 204;
          res.end();
          return;
        }

        try {
          const u = new URL(req.url ?? "", "http://x");
          const target = u.searchParams.get("target");
          if (!target || !/^https?:\/\//.test(target)) {
            res.statusCode = 400;
            res.setHeader("Content-Type", "application/json");
            res.end(JSON.stringify({ error: "Invalid target parameter" }));
            return;
          }

          // Body einlesen falls POST
          const chunks: any[] = [];
          for await (const chunk of req) {
            chunks.push(chunk);
          }
          const reqBody = chunks.length > 0 ? Buffer.concat(chunks) : undefined;

          const forwardHeaders: Record<string, string> = {};
          if (req.headers["authorization"]) {
            forwardHeaders["Authorization"] = String(req.headers["authorization"]);
          }
          if (req.headers["x-proxy-auth"]) {
            forwardHeaders["Authorization"] = String(req.headers["x-proxy-auth"]);
          }
          if (req.headers["content-type"]) {
            forwardHeaders["Content-Type"] = String(req.headers["content-type"]);
          }

          const controller = new AbortController();
          const timer = setTimeout(() => controller.abort(), 30000);

          try {
            const nodeRes = await fetch(target, {
              method: req.method,
              headers: forwardHeaders,
              body: req.method === "POST" ? reqBody : undefined,
              signal: controller.signal,
            });

            res.statusCode = nodeRes.status;
            const ct = nodeRes.headers.get("content-type");
            if (ct) {
              res.setHeader("Content-Type", ct);
            }

            if (nodeRes.body) {
              const reader = nodeRes.body.getReader();
              while (true) {
                const { done, value } = await reader.read();
                if (done) break;
                res.write(value);
              }
              res.end();
            } else {
              res.end();
            }
          } finally {
            clearTimeout(timer);
          }
        } catch (err) {
          res.statusCode = 502;
          res.setHeader("Content-Type", "application/json");
          res.end(JSON.stringify({ error: err instanceof Error ? err.message : "Proxy request failed" }));
        }
      });
    },
  };
}

export default defineConfig({
  plugins: [react(), tailwindcss(), aiGatewayProxy()],
  server: {
    port: 1420,
    strictPort: true,
    // vault-md per ?raw (exemplar-kurs aus ../../Lernreise) — dev + vitest
    fs: { allow: [".."] },
  },
  test: {
    environment: "jsdom",
    setupFiles: ["./src/test/setup.ts"],
    include: ["src/**/*.test.{ts,tsx}"],
  },
});
