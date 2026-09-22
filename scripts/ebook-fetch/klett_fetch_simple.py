# klett_fetch_simple.py: plain-HTTP batch download with klett-auth.json cookies (no browser).
# Output: ../../_Downloads/Englisch/klett-bridge/<unit>/<file> + .quelle.txt (gitignored).
# Run: python klett_fetch_simple.py   (resumable via manifest.json)
import json
import time
import urllib.request
from pathlib import Path

HERE = Path(__file__).parent
BASE = "https://bridge.klett.de/MSA-PH1QJUSMBT"
OUT = (HERE / "../../_Downloads/Englisch/klett-bridge").resolve()
TODAY = time.strftime("%Y-%m-%d")

auth = json.loads((HERE / "klett-auth.json").read_text(encoding="utf-8"))
JAR = "; ".join(f"{c['name']}={c['value']}" for c in auth.get("cookies", [])
                if "klett.de" in c.get("domain", ""))
HEADERS = {"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
           "Cookie": JAR,
           "Referer": BASE + "/_html/welcome.html"}


def main():
    inv = json.loads((HERE / "klett-inventory.json").read_text(encoding="utf-8"))
    man_path = OUT / "manifest.json"
    done = set(json.loads(man_path.read_text(encoding="utf-8"))["done"]) if man_path.exists() else set()
    todo = [f for f in inv["media"] if f not in done]
    print(f"total={len(inv['media'])} todo={len(todo)}", flush=True)
    for rel in todo:
        url = f"{BASE}/{rel}"
        unit, fname = rel.split("/", 1)
        d = OUT / unit
        d.mkdir(parents=True, exist_ok=True)
        try:
            req = urllib.request.Request(url, headers=HEADERS)
            with urllib.request.urlopen(req, timeout=600) as r:
                body = r.read()
        except Exception as e:
            print(f"{rel} NET-ERR {str(e)[:100]}", flush=True)
            continue
        if len(body) < 5000:
            print(f"{rel} tiny {len(body)}B SKIP", flush=True)
            continue
        (d / fname).write_bytes(body)
        (d / (fname + ".quelle.txt")).write_text(
            f"Quelle: {url}\nLizenz: Klett Verlag, nur lokales Lernen (Bildungslogin), nicht in git.\n"
            f"Datum: {TODAY}\n", encoding="utf-8")
        done.add(rel)
        man_path.write_text(json.dumps({"done": sorted(done)}, ensure_ascii=False), encoding="utf-8")
        print(f"{rel} {len(body) // 1024}KB OK", flush=True)
    print(f"done={len(done)}/{len(inv['media'])}", flush=True)


main()
