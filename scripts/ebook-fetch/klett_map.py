# klett_map.py: inventory of Klett Bridge share (units + media files). Run: python klett_map.py
import asyncio
import json
import re
from pathlib import Path
from playwright.async_api import async_playwright

HERE = Path(__file__).parent
BASE = "https://bridge.klett.de/MSA-PH1QJUSMBT"


async def main():
    inv = {"units": set(), "media": set(), "pages": []}
    async with async_playwright() as p:
        b = await p.chromium.launch(headless=True)
        ctx = await b.new_context(storage_state=str(HERE / "klett-auth.json"))
        # 1. welcome + likely config/manifest files
        tried = ["/_html/welcome.html", "/_html/config.json", "/_html/book.json",
                 "/_html/manifest.json", "/_html/toc.json", "/_html/data.json"]
        for t in tried:
            try:
                r = await ctx.request.get(BASE + t, timeout=30000)
                if r.status == 200:
                    body = await r.body()
                    print(t, r.status, len(body), "bytes")
                    try:
                        txt = body.decode("utf-8", "ignore")
                    except Exception:
                        txt = ""
                    for m in re.finditer(r"(\d{2}_t\d+)", txt):
                        inv["units"].add(m.group(1))
                    for m in re.finditer(r"RO-[A-Z0-9]+\.(?:mp3|mp4|pdf)", txt):
                        inv["media"].add(m.group(0))
                    if len(txt) < 2000:
                        print("   content:", txt[:300])
                else:
                    print(t, r.status)
            except Exception as e:
                print(t, "ERR", str(e)[:80])
        # 2. crawl welcome.html links for unit dirs
        try:
            r = await ctx.request.get(BASE + "/_html/welcome.html", timeout=30000)
            txt = (await r.body()).decode("utf-8", "ignore")
            for m in re.finditer(r'href="([^"]+)"', txt):
                h = m.group(1)
                if "_t" in h or h.endswith((".mp3", ".mp4", ".pdf", ".json")):
                    print("HREF:", h[:120])
                    inv["pages"].append(h)
        except Exception as e:
            print("welcome HREF ERR", str(e)[:80])
        # 3. per-unit pages: collect media refs
        for h in list(dict.fromkeys(inv["pages"])):
            unit = h.replace(".html", "")
            inv["units"].add(unit)
            try:
                r = await ctx.request.get(BASE + "/_html/" + h, timeout=30000)
                if r.status != 200:
                    print(h, r.status)
                    continue
                txt = (await r.body()).decode("utf-8", "ignore")
                found = sorted(set(re.findall(r"RO-[A-Z0-9]+\.(?:mp3|mp4|pdf)", txt)))
                print(h, f"{len(txt)} bytes, media={len(found)}")
                for f in found:
                    inv["media"].add(f"{unit}/{f}")
            except Exception as e:
                print(h, "ERR", str(e)[:80])
        await b.close()
    inv["units"] = sorted(inv["units"])
    inv["media"] = sorted(inv["media"])
    (HERE / "klett-inventory.json").write_text(
        json.dumps(inv, ensure_ascii=False, indent=1), encoding="utf-8")
    print(f"units={len(inv['units'])} media_refs={len(inv['media'])} pages={len(inv['pages'])}")
    print("units:", inv["units"][:20])


asyncio.run(main())
