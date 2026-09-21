# Login holder: opens headed browser on the e-book, saves login state continuously,
# exits when done.txt appears (created by the agent after user confirms) or after timeout.
import asyncio
import time
from pathlib import Path
from playwright.async_api import async_playwright
import config

TIMEOUT_MIN = 15

async def main():
    here = Path(__file__).parent
    done = here / "done.txt"
    auth = here / "auth.json"
    if done.exists():
        done.unlink()
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=False)
        ctx = await browser.new_context()
        page = await ctx.new_page()
        await page.goto(config.BASE_URL.format(page=config.START_PAGE))
        print("holder: browser open, waiting for login (done.txt or timeout)")
        t0 = time.time()
        while (time.time() - t0) < TIMEOUT_MIN * 60:
            await asyncio.sleep(10)
            try:
                await ctx.storage_state(path=str(auth))
            except Exception:
                pass
            if done.exists():
                print("holder: done signal received")
                break
        await browser.close()
        print("holder: exit, auth.json present =", auth.exists())

asyncio.run(main())
