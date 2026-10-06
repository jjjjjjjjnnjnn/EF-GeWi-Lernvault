# fetch-stansi-public.py: public-area bulk fetch (NO login) from Standardsicherung NRW.
# Crawls GOSt/ZKE/ZP10 Faecher-Vorgaben pages + Doku pages, downloads all linked
# files (pdf/mp3/zip, any domain) into _Downloads/StanSi-Vorgaben/<Track>/<Fach>/.
# Every file gets .quelle.txt. Threaded (10 workers).
# Run: python scripts/fetch-stansi-public.py [--workers 10] [--only Mathe] [--dry-run]
import argparse
import json
import re
import sys
import threading
import time
from concurrent.futures import ThreadPoolExecutor, as_completed
from pathlib import Path

try:
    import requests
except ImportError:
    print("need requests: pip install requests", flush=True)
    sys.exit(2)

ROOT = Path(__file__).resolve().parent.parent
DL = ROOT / "_Downloads" / "StanSi-Vorgaben"
BASE = "https://www.standardsicherung.schulministerium.nrw.de"
UA = {"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) EF-Lernvault-local-learning"}
TODAY = time.strftime("%Y-%m-%d")
LICENCE = "MSB NRW / verlinkte Behoerden, frei f. Lehr-/Lernzwecke (UrhWissG 60b), nur lokal, keine Weiterveroeffentlichung"
TIMEOUT = 120
MIN_BYTES = 5000
EXTS = (".pdf", ".mp3", ".zip")

GOST_SLUGS = ["biologie", "chemie", "chinesisch", "deutsch", "englisch", "ernaehrungslehre",
 "erziehungswissenschaft", "evangelische-religionslehre", "franzoesisch", "geographie",
 "geschichte", "griechisch", "hebraeisch", "informatik", "islamischer-religionsunterricht",
 "italienisch", "japanisch", "juedische-religionslehre", "katholische-religionslehre",
 "kunst", "latein", "mathematik", "musik", "neugriechisch", "niederlaendisch",
 "orthodoxe-religionslehre", "philosophie", "physik", "portugiesisch", "psychologie",
 "recht", "russisch", "sozialwissenschaften", "sozialwissenschaftenwirtschaft",
 "spanisch", "sport", "technik", "tuerkisch"]

PAGES = {}
for s in GOST_SLUGS:
    fach = re.sub(r"-", "", s).capitalize()
    if s == "sozialwissenschaftenwirtschaft":
        fach = "SoWiWi"
    elif s == "sozialwissenschaften":
        fach = "SoWi"
    PAGES["GOSt:" + s] = ("/zentralabitur-gost/faecher/%s-gost" % s, "GOSt/" + fach)
PAGES["ZKE:deutsch"] = ("/zentrale-klausuren-einfuehrungsphase/faecher/zke-deutsch-fachliche-vorgaben-hinweise-und", "ZKE/Deutsch")
PAGES["ZKE:mathematik"] = ("/zentrale-klausuren-einfuehrungsphase/faecher/zke-mathematik-fachliche-vorgaben-hinweise-und", "ZKE/Mathe")
ZP10_SLUGS = ["deutsch-eesa", "deutsch-eesa-waldorfschule", "deutsch-gym", "deutsch-msa",
 "deutsch-msa-abendrealschule", "deutsch-msa-waldorfschule", "englisch-eesa", "englisch-gym",
 "englisch-msa", "englisch-msa-abendrealschule", "englisch-msa-waldorfschule",
 "mathematik-eesa-waldorfschule", "mathematik-gym", "mathematik-msa-abendrealschule",
 "mathematik-msa-waldorfschule"]
for s in ZP10_SLUGS:
    PAGES["ZP10:" + s] = ("/zentrale-pruefungen-10/faecher/" + s, "ZP10/" + s)
DOKU = {
 "GOSt-Weitere": "/zentralabitur-gost/za-gost-weitere-dokumente",
 "GOSt-Recht": "/zentralabitur-gost/za-gost-rechtsgrundlagen",
 "GOSt-Berichte": "/zentralabitur-gost/za-gost-landesweite-ergebnisberichte",
 "GOSt-FAQ": "/zentralabitur-gost/fragen-und-antworten",
 "GOSt-Termine27": "/zentralabitur-gost/termine/2027",
 "GOSt-Termine28": "/zentralabitur-gost/termine/2028",
 "ZKE-Recht": "/zentrale-klausuren-einfuehrungsphase/zke-rechtsgrundlagen",
 "ZKE-Termine": "/zentrale-klausuren-einfuehrungsphase/zke-termine",
 "ZP10-Weitere": "/zentrale-pruefungen-10/zp10-weitere-dokumente",
 "ZP10-Recht": "/zentrale-pruefungen-10/zp10-rechtsgrundlagen",
 "ZP10-Berichte": "/zentrale-pruefungen-10/zp10-landesweite-ergebnisberichte",
 "ZP10-FAQ": "/zentrale-pruefungen-10/zp10-fragen-und-antworten",
 "ZP10-Termine": "/zentrale-pruefungen-10/zp-10-termine",
}
for k, p in DOKU.items():
    PAGES["Doku:" + k] = (p, "_Doku/" + k)

LOG_LOCK = threading.Lock()
LOGLINES = []
COUNTERS = {"ok": 0, "skip": 0, "fail": 0}
C_LOCK = threading.Lock()


def log(msg):
    with LOG_LOCK:
        print(msg, flush=True)
        LOGLINES.append(msg)


def bump(k):
    with C_LOCK:
        COUNTERS[k] += 1


def sanitize(name):
    name = name.split("?")[0].split("/")[-1]
    name = re.sub(r"[^a-zA-Z0-9_.\-]+", "_", name).lower()[:100]
    return name or "file.pdf"


def fetch_page(key, path, sess):
    for attempt in range(3):
        try:
            return sess.get(BASE + path, timeout=45).text
        except Exception as e:
            if attempt == 2:
                log(f"PAGE-FAIL {key} {str(e)[:100]}")
                return ""
            time.sleep(3 * (attempt + 1))


def collect(only=None):
    sess = requests.Session()
    sess.headers.update(UA)
    tasks = []
    seen_urls = set()
    items = [(k, v) for k, v in PAGES.items()
             if not only or only.lower() in k.lower() or only.lower() in v[1].lower()]
    with ThreadPoolExecutor(max_workers=10) as ex:
        futs = {ex.submit(fetch_page, k, p, sess): (k, p, f) for k, (p, f) in items for (k, p, f) in [(k, p, f)]}
        pages = {}
        for fut in as_completed(futs):
            k, p, f = futs[fut]
            pages[k] = (f, fut.result())
    for k, (folder, html) in pages.items():
        if not html:
            continue
        urls = sorted(set(re.findall(r'href="([^"]+)"', html)))
        n = 0
        for u in urls:
            lu = u.lower()
            if not any(lu.split("?")[0].endswith(e) for e in EXTS):
                continue
            if u.startswith("/"):
                u = BASE + u
            if not u.startswith("http"):
                continue
            if u in seen_urls:
                continue
            seen_urls.add(u)
            tasks.append((k, folder, sanitize(u), u))
            n += 1
        log(f"PAGE {k}: {n} files")
    return tasks


def download_one(task):
    key, folder, fname, url = task
    dest_dir = DL / folder
    dest_dir.mkdir(parents=True, exist_ok=True)
    dest = dest_dir / fname
    if dest.suffix != Path(url.split("?")[0]).suffix.lower():
        pass
    # collision with different content: keep first, note in manifest
    qf = dest_dir / (fname + ".quelle.txt")
    if dest.exists() and dest.stat().st_size >= MIN_BYTES:
        bump("skip")
        return f"SKIP {folder}/{fname}"
    s = requests.Session()
    s.headers.update(UA)
    for attempt in range(3):
        try:
            r = s.get(url, timeout=TIMEOUT)
            data = r.content
            if len(data) < MIN_BYTES:
                return f"FAIL {folder}/{fname} too-small ({len(data)}B) {url}"
            if fname.endswith(".pdf") and not data.startswith(b"%PDF-"):
                return f"FAIL {folder}/{fname} no-PDF-header ({len(data)}B) {url}"
            if fname.endswith(".zip") and not data.startswith(b"PK"):
                return f"FAIL {folder}/{fname} no-ZIP-header ({len(data)}B) {url}"
            dest.write_bytes(data)
            qf.write_text(f"Quelle: {url}\nSeite: {BASE}{PAGES[key][0]}\n"
                          f"Lizenz: {LICENCE}\nDatum: {TODAY}\n"
                          f"Zweck: nur lokales Lernen, nicht in git.\n", encoding="utf-8")
            bump("ok")
            return f"OK {folder}/{fname} ({len(data)//1024}KB)"
        except Exception as e:
            if attempt == 2:
                bump("fail")
                return f"FAIL {folder}/{fname} {str(e)[:100]} {url}"
            time.sleep(2 * (attempt + 1))


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--workers", type=int, default=10)
    ap.add_argument("--only", default="")
    ap.add_argument("--dry-run", action="store_true")
    a = ap.parse_args()
    t0 = time.time()
    tasks = collect(only=a.only or None)
    log(f"tasks: {len(tasks)} (workers={a.workers})")
    if a.dry_run:
        for k, folder, fname, url in tasks[:50]:
            log(f"WOULD {folder}/{fname}")
        if len(tasks) > 50:
            log(f"... and {len(tasks)-50} more")
        return
    manifest_path = DL / "stansi-public-manifest.json"
    try:
        manifest = json.loads(manifest_path.read_text(encoding="utf-8"))
    except Exception:
        manifest = {}
    with ThreadPoolExecutor(max_workers=a.workers) as ex:
        futs = {ex.submit(download_one, t): t for t in tasks}
        for f in as_completed(futs):
            msg = f.result()
            log(msg)
            _, folder, fname, url = futs[f]
            if msg.startswith("OK"):
                p = DL / folder / fname
                manifest[f"{folder}/{fname}"] = {"url": url, "bytes": p.stat().st_size, "datum": TODAY}
    manifest_path.write_text(json.dumps(manifest, indent=1, ensure_ascii=False), encoding="utf-8")
    (DL / "fetch-stansi-public.log").write_text("\n".join(LOGLINES), encoding="utf-8")
    log(f"DONE ok={COUNTERS['ok']} skip={COUNTERS['skip']} fail={COUNTERS['fail']} in {time.time()-t0:.0f}s")


main()
