# fixup-material4.py: Sozialbericht 2024 + ZKE hub crawl. Run: python fixup-material4.py
import re
import time
import urllib.request
from pathlib import Path

UA = {"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) EF-Lernvault-local-learning"}
ROOT = Path(__file__).resolve().parent.parent
DL = ROOT / "_Downloads"
TODAY = time.strftime("%Y-%m-%d")


def fetch(url, dest_dir, fname, quelle):
    dest_dir.mkdir(parents=True, exist_ok=True)
    dest = dest_dir / fname
    if dest.exists() and dest.stat().st_size > 50000:
        print(f"  SKIP {fname}", flush=True)
        return
    try:
        req = urllib.request.Request(url, headers=UA)
        with urllib.request.urlopen(req, timeout=300) as r:
            data = r.read()
    except Exception as e:
        print(f"  FAIL {fname} {str(e)[:90]}", flush=True)
        return
    if not data.startswith(b"%PDF-"):
        print(f"  FAIL {fname} no-PDF ({len(data)}B)", flush=True)
        return
    dest.write_bytes(data)
    (dest_dir / (fname + ".quelle.txt")).write_text(
        f"Quelle: {url}\nLizenz: {quelle}\nDatum: {TODAY}\nZweck: nur lokales Lernen, nicht in git.\n",
        encoding="utf-8")
    print(f"  OK {fname} ({len(data) // 1024}KB)", flush=True)


print("== Sozialbericht 2024 ==", flush=True)
fetch("https://www.bpb.de/system/files/dokument_pdf/Sozialbericht_2024_bf.pdf",
      DL / "SoWi", "bpb_sozialbericht-2024.pdf", "bpb, kostenloses PDF")

print("== ZKE hub ==", flush=True)
STAN = "https://www.standardsicherung.schulministerium.nrw.de"
try:
    req = urllib.request.Request(f"{STAN}/zentrale-klausuren-einfuehrungsphase", headers=UA)
    html = urllib.request.urlopen(req, timeout=60).read().decode("utf-8", "ignore")
    links = sorted(set(re.findall(r'href="([^"]+)"', html)))
    for l in links:
        if "athe" in l.lower() or "eutsch" in l.lower():
            print("  hub:", l[:120], flush=True)
except Exception as e:
    print(f"  HUB-FAIL {str(e)[:80]}", flush=True)
print("DONE", flush=True)
