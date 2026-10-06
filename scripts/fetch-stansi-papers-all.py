# fetch-stansi-papers-all.py: login-area papers for ALL GOSt subjects EXCEPT the 9
# already covered by fetch-stansi-auth.py (Deutsch/Englisch/SoWi/SoWiWi/Philo/Mathe/Physik/Chemie/Bio).
# Saves into _Downloads/StanSi-Klausuren/<Fach>/ as YYYY_Fach_Kurs[_track]_<basename>.pdf + .quelle.txt.
# Credentials via STANSI_NUMMER / STANSI_PASS env (memory only, never written to disk).
# Run: python scripts/fetch-stansi-papers-all.py [--workers 10] [--dry-run]
import argparse
import getpass
import json
import os
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
DL = ROOT / "_Downloads" / "StanSi-Klausuren"
BASE = "https://www.standardsicherung.schulministerium.nrw.de"
UA = {"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) EF-Lernvault-local-learning"}
TODAY = time.strftime("%Y-%m-%d")
LICENCE = "MSB NRW, Sammlung gemaess U288b(3) UrhWissG, nur lokales Lehren/Lernen, keine Weiterveroeffentlichung"
TIMEOUT = 120

SKIP = {"biologie", "chemie", "deutsch", "englisch", "mathematik", "philosophie",
        "physik", "sozialwissenschaften", "sozialwissenschaftenwirtschaft"}
SLUGS = ["chinesisch", "ernaehrungslehre", "erziehungswissenschaft",
 "evangelische-religionslehre", "franzoesisch", "geographie", "geschichte",
 "griechisch", "hebraeisch", "informatik", "islamischer-religionsunterricht",
 "italienisch", "japanisch", "juedische-religionslehre", "katholische-religionslehre",
 "kunst", "latein", "musik", "neugriechisch", "niederlaendisch",
 "orthodoxe-religionslehre", "portugiesisch", "psychologie", "recht", "russisch",
 "spanisch", "sport", "technik", "tuerkisch"]
SLUGS = [s for s in SLUGS if s not in SKIP]

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


def fach_name(slug):
    return re.sub(r"-", "", slug).capitalize()


def full_year(yy):
    n = int(yy)
    return 2000 + n if n < 50 else 1900 + n


def map_name(slug, url):
    base = url.split("/")[-1].lower()
    m = re.match(r"([a-z]+?)_?(\d\d)_([a-z]+?)_(g|l)_ht_.*\.pdf$", base)
    if m:
        Y = full_year(m.group(2))
        K = "GK" if m.group(4) == "g" else "LK"
        track = m.group(3)
        extra = "" if track == "x" else "_" + track.upper()
        return f"{Y}_{fach_name(slug)}_{K}{extra}_{base}"
    return f"{fach_name(slug)}_{base}"


def login(nummer, zugang):
    s = requests.Session()
    s.headers.update(UA)
    r = s.get(BASE + "/user/login", timeout=30)
    r.raise_for_status()
    m = re.search(r'form_build_id.+?value="([^"]+)"', r.text)
    if not m:
        raise RuntimeError("login form_build_id not found")
    p = s.post(BASE + "/user/login",
               data={"name": nummer, "pass": zugang,
                     "form_build_id": m.group(1),
                     "form_id": "user_login_form", "op": "Anmelden"},
               timeout=30, allow_redirects=True)
    if "Abmelden" not in p.text and "Logout" not in p.text:
        raise RuntimeError("login failed (no logout marker)")
    return s


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--nummer", default=os.environ.get("STANSI_NUMMER", ""))
    ap.add_argument("--workers", type=int, default=10)
    ap.add_argument("--dry-run", action="store_true")
    a = ap.parse_args()
    nummer = a.nummer or input("Schulnummer: ").strip()
    zugang = os.environ.get("STANSI_PASS", "") or getpass.getpass("Schulzugang (not stored): ")
    if not nummer or not zugang:
        print("nummer/zugang required", flush=True)
        sys.exit(2)
    t0 = time.time()
    log(f"login as ****{nummer[-2:]} ...")
    sess = login(nummer, zugang)
    del zugang
    cookies = sess.cookies.get_dict()
    log("login OK")

    tasks = []
    for slug in SLUGS:
        path = f"/zentralabitur-gost/pruefungsaufgaben/{slug}-gost-pruefungsaufgaben"
        for attempt in range(3):
            try:
                t = sess.get(BASE + path, timeout=45).text
                break
            except Exception as e:
                if attempt == 2:
                    log(f"PAGE-FAIL {slug} {str(e)[:100]}")
                    t = ""
                else:
                    time.sleep(3 * (attempt + 1))
        pdfs = sorted(set(re.findall(r'href="([^"]+\.pdf[^"]*)"', t)))
        log(f"PAGE {slug}: {len(pdfs)} pdfs")
        for u in pdfs:
            if u.startswith("/"):
                u = BASE + u
            tasks.append((slug, map_name(slug, u), u))
    log(f"tasks: {len(tasks)} (workers={a.workers})")
    if a.dry_run:
        for slug, name, url in tasks:
            log(f"WOULD {fach_name(slug)}/{name}")
        return

    try:
        manifest = json.loads((DL / "stansi-manifest.json").read_text(encoding="utf-8"))
    except Exception:
        manifest = {}

    def one(task):
        slug, name, url = task
        folder = fach_name(slug)
        dest_dir = DL / folder
        dest_dir.mkdir(parents=True, exist_ok=True)
        dest = dest_dir / name
        qf = dest_dir / (name + ".quelle.txt")
        if dest.exists() and dest.stat().st_size > 50000:
            bump("skip")
            return f"SKIP {folder}/{name}"
        s = requests.Session()
        s.headers.update(UA)
        s.cookies.update(cookies)
        for attempt in range(3):
            try:
                data = s.get(url, timeout=TIMEOUT).content
                if not data.startswith(b"%PDF-") or len(data) < 50000:
                    bump("fail")
                    return f"FAIL {folder}/{name} ({len(data)}B) {url}"
                dest.write_bytes(data)
                qf.write_text(f"Quelle: {url}\nSeite: {BASE}/zentralabitur-gost/pruefungsaufgaben/{slug}-gost-pruefungsaufgaben\n"
                              f"Lizenz: {LICENCE}\nDatum: {TODAY}\nZweck: nur lokales Lernen, nicht in git.\n", encoding="utf-8")
                bump("ok")
                return f"OK {folder}/{name} ({len(data)//1024}KB)"
            except Exception as e:
                if attempt == 2:
                    bump("fail")
                    return f"FAIL {folder}/{name} {str(e)[:100]} {url}"
                time.sleep(2 * (attempt + 1))

    with ThreadPoolExecutor(max_workers=a.workers) as ex:
        futs = {ex.submit(one, t): t for t in tasks}
        for f in as_completed(futs):
            msg = f.result()
            log(msg)
            slug, name, url = futs[f]
            if msg.startswith("OK"):
                p = DL / fach_name(slug) / name
                manifest[f"{fach_name(slug)}/{name}"] = {"url": url, "bytes": p.stat().st_size, "datum": TODAY}
    (DL / "stansi-manifest.json").write_text(json.dumps(manifest, indent=1, ensure_ascii=False), encoding="utf-8")
    (DL / "fetch-stansi-papers-all.log").write_text("\n".join(LOGLINES), encoding="utf-8")
    log(f"DONE ok={COUNTERS['ok']} skip={COUNTERS['skip']} fail={COUNTERS['fail']} in {time.time()-t0:.0f}s")


main()
