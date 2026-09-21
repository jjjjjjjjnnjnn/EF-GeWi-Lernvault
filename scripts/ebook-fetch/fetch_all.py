# Full fetch: download page images with auth, OCR (RapidOCR), save txt. Resumable.
# Output: ../../_Downloads/SoWi/ebook-raw/{img/,txt/,manifest.json} (gitignored).
import asyncio
import json
import time
from pathlib import Path
from playwright.async_api import async_playwright
from rapidocr_onnxruntime import RapidOCR
import config

MAX_EMPTY = 5

async def main():
    here = Path(__file__).parent
    out = (here / config.OUT_DIR).resolve()
    imgdir = out / "img"
    txtdir = out / "txt"
    imgdir.mkdir(parents=True, exist_ok=True)
    txtdir.mkdir(parents=True, exist_ok=True)
    man_path = out / "manifest.json"
    man = json.loads(man_path.read_text(encoding="utf-8")) if man_path.exists() else {}
    ocr = RapidOCR()
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        ctx = await browser.new_context(storage_state=str(here / "auth.json"))
        n = man.get("last_page", 0) + 1
        empty = 0
        while True:
            url = f"https://www.click-and-study.de/Media/page/1162/{n}"
            try:
                r = await ctx.request.get(url)
                if r.status != 200:
                    empty += 1
                    print(f"media {n}: HTTP {r.status} ({empty}/{MAX_EMPTY})")
                    if empty >= MAX_EMPTY:
                        break
                    n += 1
                    continue
                body = await r.body()
                if len(body) < 20000:
                    empty += 1
                    print(f"media {n}: tiny {len(body)}B ({empty}/{MAX_EMPTY})")
                    if empty >= MAX_EMPTY:
                        break
                    n += 1
                    continue
            except Exception as e:
                print(f"media {n}: ERR {str(e)[:60]}")
                n += 1
                time.sleep(config.DELAY_SEC)
                continue
            empty = 0
            img_path = imgdir / f"p{n:04d}.jpg"
            img_path.write_bytes(body)
            try:
                # OCR on downscaled copy (1100px wide): ~3x faster, print text unaffected.
                from PIL import Image
                small = img_path.with_name(f"p{n:04d}_small.jpg")
                im = Image.open(img_path)
                w, h = im.size
                nw = 1100
                im.resize((nw, int(h * nw / w))).save(small)
                res = ocr(str(small))
                small.unlink()
                lines = res[0] or []
                conf = sum(l[2] for l in lines) / len(lines) if lines else 0.0
                text = "\n".join(l[1] for l in lines)
            except Exception as e:
                text, conf = "", 0.0
                print(f"media {n}: OCR-ERR {str(e)[:60]}")
            (txtdir / f"p{n:04d}.txt").write_text(
                f"# media {n} ocr_conf={conf:.2f}\n\n{text}\n", encoding="utf-8")
            man["last_page"] = n
            man_path.write_text(json.dumps(man, ensure_ascii=False), encoding="utf-8")
            print(f"media {n}: {len(body)//1024}KB ocr_conf={conf:.2f} lines={len(text.splitlines())}")
            n += 1
            time.sleep(config.DELAY_SEC)
        await browser.close()
        print("done, last_page =", man.get("last_page"))

asyncio.run(main())
