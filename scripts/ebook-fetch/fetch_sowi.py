# Crawl e-book pages to local raw text. Resumable via manifest.json. Polite delay.
# DOM selectors are best-guess probes; after first logged-in run, adapt SELECTORS
# to the real player DOM (inspect once, then re-run).
import asyncio
import json
import time
from pathlib import Path
from playwright.async_api import async_playwright
import config

# Probe list: first selector that yields >200 chars wins for that page.
SELECTORS = [
    "[data-testid='page-content']",
    ".page-content",
    ".book-page",
    "#content",
    "main",
    "body",  # last resort: whole page text (nav noise included, cleaned later)
]

async def page_text(page):
    for sel in SELECTORS:
        try:
            el = await page.query_selector(sel)
            if not el:
                continue
            t = (await el.inner_text()).strip()
            if len(t) > 200:
                return sel, t
        except Exception:
            continue
    return "none", ""

async def main(max_pages=600):
    here = Path(__file__).parent
    out = (here / config.OUT_DIR).resolve()
    out.mkdir(parents=True, exist_ok=True)
    manifest_path = out / "manifest.json"
    manifest = json.loads(manifest_path.read_text(encoding="utf-8")) if manifest_path.exists() else {}
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        ctx = await browser.new_context(storage_state=str(here / "auth.json"))
        page = await ctx.new_page()
        n = manifest.get("last_page", config.START_PAGE - 1) + 1
        empty_streak = 0
        while n <= max_pages:
            await page.goto(config.BASE_URL.format(page=n))
            await page.wait_for_timeout(2500)
            sel, t = await page_text(page)
            if len(t) < 200:
                empty_streak += 1
                print(f"page {n}: EMPTY ({empty_streak}) sel={sel}")
                if empty_streak >= 5:
                    print("5 empty in a row -> assuming end of book. Stop.")
                    break
                n += 1
                continue
            empty_streak = 0
            (out / f"page_{n:04d}.txt").write_text(f"# page {n} sel={sel}\n\n{t}\n", encoding="utf-8")
            manifest["last_page"] = n
            manifest_path.write_text(json.dumps(manifest, ensure_ascii=False), encoding="utf-8")
            print(f"page {n}: {len(t)} chars via {sel}")
            n += 1
            time.sleep(config.DELAY_SEC)
        await browser.close()
        print("done, last_page =", manifest.get("last_page"))

asyncio.run(main())
