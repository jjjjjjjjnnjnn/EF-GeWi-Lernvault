# fixup-material.py: part 2 - IQB slug discovery + OpenStax PDF links via Playwright.
# Run from scripts/: python fixup-material.py
import re
import time
import urllib.request
from pathlib import Path

UA = {"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) EF-Lernvault-local-learning"}
ROOT = Path(__file__).resolve().parent.parent
DL = ROOT / "_Downloads"


def get(url):
    req = urllib.request.Request(url, headers=UA)
    with urllib.request.urlopen(req, timeout=60) as r:
        return r.read().decode("utf-8", "ignore")


print("== IQB slugs ==")
html = get("https://www.iqb.hu-berlin.de/de/schule/aufgaben/sekii")
slugs = sorted(set(re.findall(r"/de/schule/aufgaben/sekii/([a-z0-9%\-]+)", html)))
for s in slugs:
    print(" ", s)

print("== OpenStax via Playwright ==")
from playwright.sync_api import sync_playwright

books = [("biology-2e", "Bio"), ("chemistry-2e", "Chemie"),
         ("college-physics-2e", "Physik"), ("psychology-2e", "Philosophie")]
with sync_playwright() as p:
    b = p.chromium.launch(headless=True)
    pg = b.new_page()
    for slug, fach in books:
        try:
            pg.goto(f"https://openstax.org/details/books/{slug}", timeout=60000)
            pg.wait_for_timeout(4000)
            hrefs = pg.eval_on_selector_all(
                "a[href$='.pdf']", "els => els.map(e => e.href)")
            pdf = [h for h in hrefs if "assets.openstax.org" in h]
            print(" ", slug, "->", (pdf[0][:100] if pdf else "NONE"))
            if pdf:
                (DL / f"openstax-{slug}.txt").write_text(pdf[0], encoding="utf-8")
        except Exception as e:
            print(" ", slug, "ERR", str(e)[:100])
    b.close()
print("DONE")
