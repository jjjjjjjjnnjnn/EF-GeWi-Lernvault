# klett_fetch.py: batch-download Klett Bridge media (auth via klett-auth.json).
# Output: ../../_Downloads/Englisch/klett-bridge/<unit>/<file> + .quelle.txt each (gitignored).
# Run: python klett_fetch.py   (resumable via manifest.json)
import asyncio
import json
import time
from pathlib import Path
from playwright.async_api import async_playwright

HERE = Path(__file__).parent
BASE = "https://bridge.klett.de/MSA-PH1QJUSMBT"
OUT = (HERE / "../../_Downloads/Englisch/klett-bridge").resolve()
TODAY = time.strftime("%Y-%m-%d")


def single_instance():
    import os
    lock = HERE / "klett-fetch.lock"
    for _ in range(5):
        try:
            with open(lock, "x", encoding="utf-8") as f:
                f.write(str(os.getpid()))
            return lock
        except FileExistsError:
            pass
        try:
            pid = int(lock.read_text(encoding="utf-8").strip())
            os.kill(pid, 0)
            return None  # live holder -> exit
        except Exception:
            pass
        try:
            lock.unlink()  # stale lock
        except Exception:
            pass
        time.sleep(1)
    return None
OK_HEAD = (b"%PDF-", b"ID3", b"\xff\xfb", b"OggS", b"RIFF", b"\x00\x00\x00", b"ftyp", b"moov", b"mdat")


async def main():
    lock = single_instance()
    if lock is None:
        print("another klett_fetch instance runs, exit")
        return
    try:
        await _run()
    finally:
        try:
            lock.unlink()
        except Exception:
            pass


async def _run():
    inv = json.loads((HERE / "klett-inventory.json").read_text(encoding="utf-8"))
    man_path = OUT / "manifest.json"
    done = set(json.loads(man_path.read_text(encoding="utf-8"))["done"]) if man_path.exists() else set()
    files = [f for f in inv["media"] if f not in done]
    print(f"total={len(inv['media'])} todo={len(files)}")
    async with async_playwright() as p:
        b = await p.chromium.launch(headless=True)
        ctx = await b.new_context(storage_state=str(HERE / "klett-auth.json"))
        for rel in files:
            url = f"{BASE}/{rel}"
            unit, fname = rel.split("/", 1)
            d = OUT / unit
            d.mkdir(parents=True, exist_ok=True)
            try:
                r = await ctx.request.get(url, timeout=120000)
                body = await r.body()
            except Exception as e:
                print(rel, "NET-ERR", str(e)[:80])
                continue
            if r.status != 200 or len(body) < 5000:
                print(rel, f"HTTP {r.status} {len(body)}B SKIP")
                continue
            (d / fname).write_bytes(body)
            (d / (fname + ".quelle.txt")).write_text(
                f"Quelle: {url}\nLizenz: Klett Verlag, nur lokales Lernen (Bildungslogin), nicht in git.\n"
                f"Datum: {TODAY}\n", encoding="utf-8")
            done.add(rel)
            man_path.write_text(json.dumps({"done": sorted(done)}, ensure_ascii=False), encoding="utf-8")
            print(rel, f"{len(body) // 1024}KB OK")
            time.sleep(1)
        await b.close()
    print(f"done={len(done)}/{len(inv['media'])}")


asyncio.run(main())
