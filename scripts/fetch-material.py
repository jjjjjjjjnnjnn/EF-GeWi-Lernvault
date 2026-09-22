# fetch-material.py: bulk-fetch free/legal PDFs into _Downloads/<Fach>/ (gitignored).
# Every file gets a .quelle.txt (source + license + date). Only %PDF- verified files kept.
# Run from scripts/: python fetch-material.py   (optional arg: only <Fach>)
import re
import sys
import time
import urllib.request
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
DL = ROOT / "_Downloads"
UA = {"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) EF-Lernvault-local-learning"}
TODAY = time.strftime("%Y-%m-%d")
MAX_MB = 120

LOG = []


def log(msg):
    print(msg, flush=True)
    LOG.append(msg)


def get(url, timeout=60):
    req = urllib.request.Request(url, headers=UA)
    with urllib.request.urlopen(req, timeout=timeout) as r:
        return r.read()


def pdf_links(page_url, must_match=""):
    try:
        html = get(page_url).decode("utf-8", "ignore")
    except Exception as e:
        log(f"  PAGE-FAIL {page_url} {str(e)[:80]}")
        return []
    links = []
    for m in re.finditer(r'href="([^"]+\.pdf[^"]*)"', html):
        u = m.group(1)
        if u.startswith("/"):
            u = "https://www.iqb.hu-berlin.de" + u if "iqb" in page_url else u
        if must_match and must_match not in u:
            continue
        if u not in links:
            links.append(u)
    return links


def fetch(url, dest_dir, fname, quelle):
    dest_dir.mkdir(parents=True, exist_ok=True)
    dest = dest_dir / fname
    qf = dest_dir / (fname + ".quelle.txt")
    if dest.exists() and dest.stat().st_size > 50000:
        log(f"  SKIP (exists) {fname}")
        return True
    try:
        data = get(url, timeout=120)
    except Exception as e:
        log(f"  FAIL {fname} {str(e)[:80]}")
        return False
    if not data.startswith(b"%PDF-"):
        log(f"  FAIL {fname} no-PDF-header ({len(data)}B)")
        return False
    if len(data) > MAX_MB * 1024 * 1024:
        log(f"  FAIL {fname} too big ({len(data) // 1024 // 1024}MB)")
        return False
    dest.write_bytes(data)
    qf.write_text(f"Quelle: {url}\nLizenz: {quelle}\nDatum: {TODAY}\n"
                  f"Zweck: nur lokales Lernen, nicht in git.\n", encoding="utf-8")
    log(f"  OK {fname} ({len(data) // 1024}KB)")
    time.sleep(1)
    return False  # downloaded now (not skipped)


def dl_list(items):
    ok = skip = 0
    for url, d, fname, quelle in items:
        r = fetch(url, DL / d, fname, quelle)
        ok, skip = ok + (not r), skip + r
    return ok, skip


# ---------- 1. KMK Bildungsstandards (Abi) ----------
KMK = "https://www.kmk.org/fileadmin/Dateien/veroeffentlichungen_beschluesse/2012/2012_10_18-Bildungsstandards-"
kmk_items = [
    (KMK + "Deutsch-Abi.pdf", "Deutsch", "kmk_bildungsstandards_deutsch_abi.pdf", "KMK, frei (oeffentliche Verwaltung)"),
    (KMK + "Fortgef-FS-Abi.pdf", "Englisch", "kmk_bildungsstandards_englisch_abi.pdf", "KMK, frei"),
]

# ---------- 2. Klett IQB-Themenfelder (Unterrichtsgebrauch erlaubt) ----------
klett_items = [
    ("https://asset.klett.de/assets/3273aa66/Abgleich_GL_Oberstufe_2021_Themenbereiche_IQB_Abi_24.pdf",
     "Englisch", "klett_iqb_themenfelder_englisch_2024-26.pdf", "Klett, Vervielfaeltigung f. Unterrichtsgebrauch gestattet"),
]

# ---------- 3. OpenStax (CC BY-NC-SA, nur lokal) ----------
def openstax_pdf(slug):
    try:
        html = get(f"https://openstax.org/details/books/{slug}").decode("utf-8", "ignore")
    except Exception as e:
        log(f"  OPENSTAX-PAGE-FAIL {slug} {str(e)[:60]}")
        return None
    ms = re.findall(r'https://assets\.openstax\.org[^"\s]*?\.pdf', html)
    return ms[0] if ms else None


openstax_books = [("biology-2e", "Bio"), ("chemistry-2e", "Chemie"),
                  ("college-physics-2e", "Physik"), ("psychology-2e", "Philosophie")]

# ---------- 4. StanSi Vorgaben/Beispiele (oeffentlich, ohne Login) ----------
STAN = "https://www.standardsicherung.schulministerium.nrw.de"
stansi_pages = [
    (f"{STAN}/zentralabitur-gost/faecher/mathematik-gost", "Mathe"),
    (f"{STAN}/zentralabitur-gost/faecher/deutsch", "Deutsch"),
    (f"{STAN}/zentralabitur-gost/faecher/englisch", "Englisch"),
    (f"{STAN}/zentralabitur-gost/faecher/physik", "Physik"),
    (f"{STAN}/zentralabitur-gost/faecher/chemie", "Chemie"),
    (f"{STAN}/zentralabitur-gost/faecher/biologie", "Bio"),
]

# ---------- 5. IQB Poolaufgaben (nach Pruefung veroeffentlicht, frei) ----------
IQB = "https://www.iqb.hu-berlin.de/de/schule/aufgaben/sekii"
iqb_pages = [
    (f"{IQB}/abiturpruefungsaufgaben-mathematik", "Mathe"),
    (f"{IQB}/abiturpruefungsaufgaben-deutsch", "Deutsch"),
    (f"{IQB}/abiturpruefungsaufgaben-englisch", "Englisch"),
    (f"{IQB}/abiturpruefungsaufgaben-physik", "Physik"),
    (f"{IQB}/abiturpruefungsaufgaben-chemie", "Chemie"),
    (f"{IQB}/abiturpruefungsaufgaben-biologie", "Bio"),
]


def main():
    only = sys.argv[1] if len(sys.argv) > 1 else None
    total_ok = 0

    log("== KMK ==")
    items = [i for i in kmk_items if not only or i[1] == only]
    o, _ = dl_list(items)
    total_ok += o

    log("== Klett ==")
    items = [i for i in klett_items if not only or i[1] == only]
    o, _ = dl_list(items)
    total_ok += o

    log("== OpenStax ==")
    for slug, fach in openstax_books:
        if only and fach != only:
            continue
        u = openstax_pdf(slug)
        if u:
            fetch(u, DL / fach, f"openstax-{slug}_WEB.pdf", "OpenStax CC BY-NC-SA, nur lokal")
            total_ok += 1
        else:
            log(f"  FAIL openstax-{slug} no pdf link found (manuell: openstax.org/details/books/{slug})")

    log("== StanSi (crawl, max 6/Fach) ==")
    for page, fach in stansi_pages:
        if only and fach != only:
            continue
        links = pdf_links(page)[:6]
        log(f"  {fach}: {len(links)} pdf links")
        for u in links:
            if u.startswith("/"):
                u = STAN + u
            fname = re.sub(r"[^a-z0-9_.-]+", "_", u.split("/")[-1].lower())[:80]
            fetch(u, DL / fach, f"stansi_{fname}", "MSB NRW, frei f. Lehr-/Lernzwecke (UrhWissG 60b)")
            total_ok += 1

    log("== IQB (crawl, max 6/Fach) ==")
    for page, fach in iqb_pages:
        if only and fach != only:
            continue
        links = pdf_links(page)[:6]
        log(f"  {fach}: {len(links)} pdf links")
        for u in links:
            if u.startswith("/"):
                u = "https://www.iqb.hu-berlin.de" + u
            fname = re.sub(r"[^a-z0-9_.-]+", "_", u.split("/")[-1].lower())[:80]
            fetch(u, DL / fach, f"iqb_{fname}", "IQB/KMK, frei f. Lehr-/Lernzwecke")
            total_ok += 1

    log(f"DONE new-downloads={total_ok}")
    (Path(__file__).parent / "fetch-material.log").write_text("\n".join(LOG), encoding="utf-8")


main()
