# klett_hold.py: headed login for Klett Bridge (user types password, never stored).
# Step 1: python klett_hold.py  -> browser opens, you log in (Klett ID / Bildungslogin),
#          open the English book, then press ENTER here. Saves klett-auth.json + media-urls.txt
# Step 2: based on media-urls.txt we build the batch fetcher.
import asyncio
from pathlib import Path
from playwright.async_api import async_playwright

HERE = Path(__file__).parent
SHARE = "https://bridge.klett.de/MSA-PH1QJUSMBT/_html/welcome.html"


async def main():
    async with async_playwright() as p:
        b = await p.chromium.launch(headless=False)
        ctx = await b.new_context()
        pg = await ctx.new_page()
        await pg.goto(SHARE, timeout=60000)
        print(">>> 1. Log in im Browser (Klett ID / Bildungslogin).")
        print(">>> 2. Oeffne das Englisch-Buch (eine Seite mit Audio).")
        print(">>> 3. Dann hier ENTER druecken.")
        await asyncio.get_event_loop().run_in_executor(None, input, "ENTER wenn bereit: ")
        await ctx.storage_state(path=str(HERE / "klett-auth.json"))
        print("auth saved.")
        urls = await pg.eval_on_selector_all(
            "audio source, audio, video source, video, a[href$='.mp3'], a[href$='.mp4']",
            "els => els.map(e => e.src || e.href || e.getAttribute('src')).filter(Boolean)")
        for u in sorted(set(urls)):
            print("MEDIA:", u[:160])
        (HERE / "klett-media-urls.txt").write_text("\n".join(sorted(set(urls))), encoding="utf-8")
        print(f"{len(set(urls))} urls -> klett-media-urls.txt")
        await b.close()


asyncio.run(main())
