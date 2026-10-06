# fetch-stansi-auth.py: authenticated bulk-fetch from Standardsicherung NRW
# into _Downloads/StanSi-Klausuren/<Fach>/ (gitignored).
# - Credentials NEVER written to disk: Schulnummer via --nummer or STANSI_NUMMER,
#   Schulzugang via getpass prompt or STANSI_PASS env (memory only).
# - ThreadPoolExecutor (default 8 workers), each with own Session sharing login cookies.
# - Every PDF verified (%PDF- header, >50KB) + sidecar .quelle.txt (source+license+date).
# - Naming: 2024_Deutsch_GK_Aufgabe-und-EHZ.pdf (GOSt combined) /
#   2024_ZKE_Mathe_MMS_Aufgabe.pdf / ..._EHZ.pdf / 2024_ZP10_Mathe_MSA_Aufgabe.pdf
# Run: python scripts/fetch-stansi-auth.py [--workers 8] [--only Deutsch] [--dry-run]
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

PAGES = {
    "Deutsch": "/zentralabitur-gost/pruefungsaufgaben/deutsch-gost-pruefungsaufgaben",
    "Englisch": "/zentralabitur-gost/pruefungsaufgaben/englisch-gost-pruefungsaufgaben",
    "SoWi": "/zentralabitur-gost/pruefungsaufgaben/sozialwissenschaften-gost-pruefungsaufgaben",
    "SoWiWi": "/zentralabitur-gost/pruefungsaufgaben/sozialwissenschaftenwirtschaft-gost-pruefungsaufgaben",
    "Philosophie": "/zentralabitur-gost/pruefungsaufgaben/philosophie-gost-pruefungsaufgaben",
    "Mathe": "/zentralabitur-gost/pruefungsaufgaben/mathematik-gost-pruefungsaufgaben",
    "Physik": "/zentralabitur-gost/pruefungsaufgaben/physik-gost-pruefungsaufgaben",
    "Chemie": "/zentralabitur-gost/pruefungsaufgaben/chemie-gost-pruefungsaufgaben",
    "Bio": "/zentralabitur-gost/pruefungsaufgaben/biologie-gost-pruefungsaufgaben",
    "ZKE-Deutsch": "/zentrale-klausuren-einfuehrungsphase/aufgaben-der-letzten-jahre/deutsch-aufgaben-der-letzten-jahre",
    "ZKE-Mathe": "/zentrale-klausuren-einfuehrungsphase/aufgaben-der-letzten-jahre/mathematik-aufgaben-der-letzten",
    "ZP10-De-MSA": "/zentrale-pruefungen-10/pruefungsaufgaben/deutsch-msa-pruefungsaufgaben",
    "ZP10-En-MSA": "/zentrale-pruefungen-10/pruefungsaufgaben/englisch-msa-pruefungsaufgaben",
    "ZP10-Ma-MSA": "/zentrale-pruefungen-10/pruefungsaufgaben/mathematik-msa-pruefungsaufgaben",
    "ZP10-De-GYM": "/zentrale-pruefungen-10/pruefungsaufgaben/deutsch-gym-pruefungsaufgaben",
    "ZP10-En-GYM": "/zentrale-pruefungen-10/pruefungsaufgaben/englisch-gym-pruefungsaufgaben",
    "ZP10-Ma-GYM": "/zentrale-pruefungen-10/pruefungsaufgaben/mathematik-gym-pruefungsaufgaben",
}

# folder override: SoWiWi -> SoWi, ZP10-* -> ZP10
FOLDER = {"SoWiWi": "SoWi"}
for k in list(PAGES):
    if k.startswith("ZP10"):
        FOLDER[k] = "ZP10"

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


def full_year(yy):
    n = int(yy)
    return 2000 + n if n < 50 else 1900 + n


def map_name(page_key, url):
    fn = url.split("/")[-1].lower()
    m = re.match(r"([a-z]+?)_?(\d\d)_(e|x|w|c|t|ft)_(g|l)_ht_.*\.pdf$", fn)
    if m:
        prefix, yy, track, kurs = m.group(1), m.group(2), m.group(3), m.group(4)
        Y = full_year(yy)
        K = "GK" if kurs == "g" else "LK"
        fachmap = {"d": "Deutsch", "e": "Englisch", "sw": "SoWi", "pl": "Philosophie",
                   "m": "Mathe", "ph": "Physik", "ch": "Chemie", "bi": "Bio"}
        fach = fachmap.get(prefix, prefix.upper())
        extra = ""
        if prefix == "m" and track in ("c", "t"):
            extra = "_CAS" if track == "c" else "_WTR"
        if prefix == "sw" and track == "e":
            extra = "_bilingual"
        if page_key == "SoWiWi" or (prefix == "sw" and track == "w"):
            fach = "SoWiWi"
        if prefix == "bi" and track == "e":
            extra = "_bilingual"
        return f"{Y}_{fach}_{K}{extra}_Aufgabe-und-EHZ.pdf"
    m = re.match(r"zke_(\d{4})_([dm])_ht_([al])(?:_([a-z]+))?\.pdf$", fn)
    if m:
        Y, dm, al, variant = m.group(1), m.group(2), m.group(3), m.group(4)
        fach = "Deutsch" if dm == "d" else "Mathe"
        kind = "Aufgabe" if al == "a" else "EHZ"
        extra = f"_{variant.upper()}" if variant else ""
        return f"{Y}_ZKE_{fach}{extra}_{kind}.pdf"
    m = re.match(r"zke_([dm])_(\d\d)_ht_([al])(?:_([a-z]+))?\.pdf$", fn)
    if m:
        dm, yy, al, variant = m.group(1), m.group(2), m.group(3), m.group(4)
        Y = full_year(yy)
        fach = "Deutsch" if dm == "d" else "Mathe"
        kind = "Aufgabe" if al == "a" else "EHZ"
        extra = f"_{variant.upper()}" if variant else ""
        return f"{Y}_ZKE_{fach}{extra}_{kind}.pdf"
    m = re.match(r"([dem])(\d\d|_\d\d_ft_ht)_(msa|gym)_ht_([al])\.pdf$", fn)
    if m:
        dm, yyraw, track, al = m.group(1), m.group(2), m.group(3), m.group(4)
        yy = re.search(r"(\d\d)", yyraw).group(1)
        Y = full_year(yy)
        fach = {"d": "Deutsch", "e": "Englisch", "m": "Mathe"}[dm]
        kind = "Aufgabe" if al == "a" else "EHZ"
        return f"{Y}_ZP10_{fach}_{track.upper()}_{kind}.pdf"
    safe = re.sub(r"[^a-z0-9_.-]+", "_", fn)[:80]
    return f"sonst_{safe}"


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


def collect_tasks(session, only=None, dry_run=False):
    tasks = []  # (page_key, folder, newname, url)
    for key, path in PAGES.items():
        if only and only.lower() not in (key.lower(), FOLDER.get(key, key).lower()):
            continue
        t = None
        for attempt in range(3):
            try:
                t = session.get(BASE + path, timeout=45).text
                break
            except Exception as e:
                if attempt == 2:
                    log(f"PAGE-FAIL {key} {str(e)[:100]}")
                else:
                    time.sleep(3 * (attempt + 1))
        if t is None:
            continue
        pdfs = sorted(set(re.findall(r'href="([^"]+\.pdf[^"]*)"', t)))
        log(f"PAGE {key}: {len(pdfs)} pdfs")
        for u in pdfs:
            if u.startswith("/"):
                u = BASE + u
            folder = FOLDER.get(key, key)
            tasks.append((key, folder, map_name(key, u), u))
    return tasks


def download_one(task, cookies, overwrite=False):
    key, folder, newname, url = task
    dest_dir = DL / folder
    dest_dir.mkdir(parents=True, exist_ok=True)
    dest = dest_dir / newname
    qf = dest_dir / (newname + ".quelle.txt")
    if dest.exists() and dest.stat().st_size > 50000 and not overwrite:
        bump("skip")
        return f"SKIP {folder}/{newname}"
    s = requests.Session()
    s.headers.update(UA)
    s.cookies.update(cookies)
    for attempt in range(3):
        try:
            r = s.get(url, timeout=TIMEOUT)
            data = r.content
            if not data.startswith(b"%PDF-"):
                return f"FAIL {folder}/{newname} no-PDF-header ({len(data)}B) {url}"
            if len(data) < 50000:
                return f"FAIL {folder}/{newname} too-small ({len(data)}B) {url}"
            dest.write_bytes(data)
            qf.write_text(f"Quelle: {url}\nSeite: {BASE}{PAGES[key]}\n"
                          f"Lizenz: {LICENCE}\nDatum: {TODAY}\n"
                          f"Zweck: nur lokales Lernen, nicht in git.\n", encoding="utf-8")
            bump("ok")
            return f"OK {folder}/{newname} ({len(data)//1024}KB)"
        except Exception as e:
            if attempt == 2:
                bump("fail")
                return f"FAIL {folder}/{newname} {str(e)[:100]} {url}"
            time.sleep(2 * (attempt + 1))


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--nummer", default=os.environ.get("STANSI_NUMMER", ""))
    ap.add_argument("--workers", type=int, default=8)
    ap.add_argument("--only", default="")
    ap.add_argument("--dry-run", action="store_true")
    ap.add_argument("--overwrite", action="store_true")
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
    log(f"login OK, {len(cookies)} cookies")
    tasks = collect_tasks(sess, only=a.only or None, dry_run=a.dry_run)
    log(f"tasks: {len(tasks)} (workers={a.workers})")
    if a.dry_run:
        for key, folder, newname, url in tasks:
            log(f"WOULD {folder}/{newname} <- {url.split('/')[-1]}")
        return
    manifest_path = DL / "stansi-manifest.json"
    try:
        manifest = json.loads(manifest_path.read_text(encoding="utf-8"))
    except Exception:
        manifest = {}
    with ThreadPoolExecutor(max_workers=a.workers) as ex:
        futs = {ex.submit(download_one, t, cookies, a.overwrite): t for t in tasks}
        for f in as_completed(futs):
            msg = f.result()
            log(msg)
            t = futs[f]
            _, folder, newname, url = t
            if msg.startswith("OK"):
                p = DL / folder / newname
                manifest[f"{folder}/{newname}"] = {
                    "url": url, "bytes": p.stat().st_size, "datum": TODAY}
    manifest_path.write_text(json.dumps(manifest, indent=1, ensure_ascii=False), encoding="utf-8")
    (DL / "fetch-stansi-auth.log").write_text("\n".join(LOGLINES), encoding="utf-8")
    dt = time.time() - t0
    log(f"DONE ok={COUNTERS['ok']} skip={COUNTERS['skip']} fail={COUNTERS['fail']} in {dt:.0f}s")
    log(f"manifest: {manifest_path} ({len(manifest)} entries)")


main()
