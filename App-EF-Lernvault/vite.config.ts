/// <reference types="vitest/config" />
import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// Dev-proxy fuer modell-pull (ccswitch-stil): browser -> same-origin /__models
// -> node-fetch ans echte /models (CORS-frei). Nur dev; prod faellt auf direkt zurueck.
function modelProxy(): Plugin {
  return {
    name: "model-proxy",
    configureServer(server) {
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
            // Key nur per header (nie URL/log), 1:1 als Authorization weiter
            const fwdKey = req.headers["x-proxy-auth"];
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
    },
  };
}

export default defineConfig({
  plugins: [react(), tailwindcss(), modelProxy()],
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
