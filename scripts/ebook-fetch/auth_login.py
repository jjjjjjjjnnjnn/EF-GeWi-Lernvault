# One-time login: opens the e-book player, user logs in by hand, state saved to auth.json.
# The password never touches any file except the local browser profile (gitignored).
import asyncio
from pathlib import Path
from playwright.async_api import async_playwright
import config

async def main():
    here = Path(__file__).parent
    auth = here / "auth.json"
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=False)
        ctx = await browser.new_context()
        page = await ctx.new_page()
        await page.goto(config.BASE_URL.format(page=config.START_PAGE))
        print("LOG IN with your school account in the opened browser, then press Enter here.")
        input()
        await ctx.storage_state(path=str(auth))
        print("saved", auth)
        await browser.close()

asyncio.run(main())
