# fixup-material3.py: KMK NaWi 2020 + ZKE-Mathe slug + Datenreport. Run: python fixup-material3.py
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
        with urllib.request.urlopen(req, timeout=180) as r:
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
    time.sleep(1)


print("== KMK NaWi 2020 ==", flush=True)
base = "https://www.kmk.org/fileadmin/Dateien/veroeffentlichungen_beschluesse/2020/2020_06_18-BildungsstandardsAHR_"
for f, fach in [("Chemie.pdf", "Chemie"), ("Biologie.pdf", "Bio"), ("Physik.pdf", "Physik")]:
    fetch(base + f, DL / fach, "kmk_bildungsstandards_" + f.lower().replace(".pdf", "_abi.pdf"), "KMK, frei")

print("== ZKE-Mathe slug ==", flush=True)
STAN = "https://www.standardsicherung.schulministerium.nrw.de"
try:
    req = urllib.request.Request(f"{STAN}/zentrale-klausuren-einfuehrungsphase/faecher", headers=UA)
    html = urllib.request.urlopen(req, timeout=60).read().decode("utf-8", "ignore")
    slugs = sorted(set(re.findall(r"/zentrale-klausuren-einfuehrungsphase/faecher/([a-z0-9\-]+)", html)))
    print("  slugs:", slugs, flush=True)
    for s in slugs:
        if "mathe" in s:
            req2 = urllib.request.Request(f"{STAN}/zentrale-klausuren-einfuehrungsphase/faecher/{s}", headers=UA)
            h2 = urllib.request.urlopen(req2, timeout=60).read().decode("utf-8", "ignore")
            pdfs = sorted(set(re.findall(r'href="([^"]+\.pdf[^"]*)"', h2)))[:10]
            print(f"  zke-mathe: {len(pdfs)} pdf", flush=True)
            for u in pdfs:
                if u.startswith("/"):
                    u = STAN + u
                fetch(u, DL / "Mathe", "stansi_" + re.sub(r"[^a-z0-9_.-]+", "_", u.split("/")[-1].split("?")[0].lower())[:70],
                      "MSB NRW, frei f. Lehr-/Lernzwecke (UrhWissG 60b)")
except Exception as e:
    print(f"  ZKE-FAIL {str(e)[:90]}", flush=True)

print("== Datenreport ==", flush=True)
for u, fn in [
    ("https://www.bpb.de/system/files/dokument_pdf/dr2024_barrierefrei.pdf", "bpb_datenreport-2024.pdf"),
    ("https://www.bpb.de/system/files/dokument_pdf/Datenreport-2024.pdf", "bpb_datenreport-2024.pdf"),
]:
    fetch(u, DL / "SoWi", fn, "bpb, kostenloses PDF")
print("DONE", flush=True)
