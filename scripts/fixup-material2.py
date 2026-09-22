# fixup-material2.py: download OpenStax PDFs + IQB ue-slug crawl. Run: python fixup-material2.py
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
        print(f"  FAIL {fname} {str(e)[:80]}", flush=True)
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


print("== OpenStax ==")
for slug, fach, pdf in [
    ("biology-2e", "Bio", "https://assets.openstax.org/oscms-prodcms/media/documents/Biology-2e_-_WEB.pdf"),
    ("chemistry-2e", "Chemie", "https://assets.openstax.org/oscms-prodcms/media/documents/chemistry-2e_-_WEB.pdf"),
    ("college-physics-2e", "Physik", "https://assets.openstax.org/oscms-prodcms/media/documents/college-physics-2e_-_WEB.pdf"),
    ("psychology-2e", "Philosophie", "https://assets.openstax.org/oscms-prodcms/media/documents/Psychology2e_WEB.pdf"),
]:
    fetch(pdf, DL / fach, f"openstax-{slug}_WEB.pdf", "OpenStax CC BY-NC-SA, nur lokal")

print("== IQB ue-slugs ==")
IQB = "https://www.iqb.hu-berlin.de"
for slug, fach in [
    ("abiturpr%C3%BCfungsaufgaben-englisch", "Englisch"),
    ("abiturpr%C3%BCfungsaufgaben-deutsch", "Deutsch"),
    ("abiturpr%C3%BCfungsaufgaben-physik", "Physik"),
    ("abiturpr%C3%BCfungsaufgaben-chemie", "Chemie"),
    ("abiturpr%C3%BCfungsaufgaben-biologie", "Bio"),
    ("beispielaufgaben-deutsch", "Deutsch"),
]:
    try:
        req = urllib.request.Request(f"{IQB}/de/schule/aufgaben/sekii/{slug}", headers=UA)
        html = urllib.request.urlopen(req, timeout=60).read().decode("utf-8", "ignore")
    except Exception as e:
        print(f"  PAGE-FAIL {fach}/{slug} {str(e)[:60]}", flush=True)
        continue
    links = []
    for m in re.finditer(r'href="([^"]+\.pdf[^"]*)"', html):
        u = m.group(1)
        if u.startswith("/"):
            u = IQB + u
        if u not in links:
            links.append(u)
    print(f"  {fach}: {len(links)} pdf", flush=True)
    for u in links[:6]:
        fname = "iqb_" + re.sub(r"[^a-z0-9_.-]+", "_", u.split("/")[-1].lower())[:70]
        fetch(u, DL / fach, fname, "IQB/KMK, frei f. Lehr-/Lernzwecke")
print("DONE")
