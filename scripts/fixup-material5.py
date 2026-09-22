# fixup-material5.py: GOSt Pruefungsaufgaben + ZKE-Mathe + login-wall probe. Run: python fixup-material5.py
import re
import time
import urllib.request
from pathlib import Path

UA = {"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) EF-Lernvault-local-learning"}
ROOT = Path(__file__).resolve().parent.parent
DL = ROOT / "_Downloads"
TODAY = time.strftime("%Y-%m-%d")
STAN = "https://www.standardsicherung.schulministerium.nrw.de"


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


PAGES = [
    ("zentralabitur-gost/pruefungsaufgaben/deutsch-gost-pruefungsaufgaben", "Deutsch", 15),
    ("zentralabitur-gost/pruefungsaufgaben/mathematik-gost-pruefungsaufgaben", "Mathe", 15),
    ("zentrale-klausuren-einfuehrungsphase/faecher/zke-mathematik-fachliche-vorgaben-hinweise-und", "Mathe", 10),
    ("zentrale-klausuren-einfuehrungsphase/aufgaben-der-letzten-jahre/deutsch-aufgaben-der-letzten-jahre", "Deutsch", 6),
    ("zentrale-klausuren-einfuehrungsphase/aufgaben-der-letzten-jahre/mathematik-aufgaben-der-letzten", "Mathe", 6),
]
for slug, fach, lim in PAGES:
    try:
        req = urllib.request.Request(f"{STAN}/{slug}", headers=UA)
        html = urllib.request.urlopen(req, timeout=60).read().decode("utf-8", "ignore")
    except Exception as e:
        print(f"PAGE-FAIL {fach}/{slug.split('/')[-1][:40]} {str(e)[:70]}", flush=True)
        continue
    links = []
    for m in re.finditer(r'href="([^"]+\.pdf[^"]*)"', html):
        u = m.group(1)
        if u.startswith("/"):
            u = STAN + u
        if u not in links:
            links.append(u)
    print(f"{fach}/{slug.split('/')[-1][:40]}: {len(links)} pdf", flush=True)
    for u in links[:lim]:
        fetch(u, DL / fach, "stansi_" + re.sub(r"[^a-z0-9_.-]+", "_", u.split("/")[-1].split("?")[0].lower())[:70],
              "MSB NRW, frei f. Lehr-/Lernzwecke (UrhWissG 60b)")
print("DONE", flush=True)
