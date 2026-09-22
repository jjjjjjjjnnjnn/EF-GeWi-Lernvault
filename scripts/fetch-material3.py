# fetch-material3.py: round 2 bulk fetch. Groups: bpb | kmk | iqb-deep | stansi-deep | audio
# Usage: python fetch-material3.py <group>   (run groups in parallel terminals)
import re
import sys
import time
import urllib.request
from pathlib import Path

UA = {"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) EF-Lernvault-local-learning"}
ROOT = Path(__file__).resolve().parent.parent
DL = ROOT / "_Downloads"
TODAY = time.strftime("%Y-%m-%d")
GROUP = sys.argv[1] if len(sys.argv) > 1 else "all"


def get(url, timeout=60):
    req = urllib.request.Request(url, headers=UA)
    with urllib.request.urlopen(req, timeout=timeout) as r:
        return r.read()


def fetch(url, dest_dir, fname, quelle):
    dest_dir.mkdir(parents=True, exist_ok=True)
    dest = dest_dir / fname
    if dest.exists() and dest.stat().st_size > 50000:
        print(f"  SKIP {fname}", flush=True)
        return
    try:
        data = get(url, timeout=300)
    except Exception as e:
        print(f"  FAIL {fname} {str(e)[:90]}", flush=True)
        return
    if not data.startswith((b"%PDF-", b"ID3", b"\xff\xfb", b"OggS", b"RIFF")):
        print(f"  FAIL {fname} bad-header ({len(data)}B)", flush=True)
        return
    dest.write_bytes(data)
    (dest_dir / (fname + ".quelle.txt")).write_text(
        f"Quelle: {url}\nLizenz: {quelle}\nDatum: {TODAY}\nZweck: nur lokales Lernen, nicht in git.\n",
        encoding="utf-8")
    print(f"  OK {fname} ({len(data) // 1024}KB)", flush=True)
    time.sleep(1)


def crawl_pdfs(page_url, limit, base=""):
    try:
        html = get(page_url).decode("utf-8", "ignore")
    except Exception as e:
        print(f"  PAGE-FAIL {page_url} {str(e)[:70]}", flush=True)
        return []
    out = []
    for m in re.finditer(r'href="([^"]+\.pdf[^"]*)"', html):
        u = m.group(1)
        if u.startswith("/"):
            u = base + u
        if u not in out:
            out.append(u)
    return out[:limit]


def run_bpb():
    print("== bpb ==", flush=True)
    # IzPB 354 free PDF: resolve from shop page
    try:
        html = get("https://www.bpb.de/shop/zeitschriften/izpb/soziale-ungleichheit-354/").decode("utf-8", "ignore")
        ms = re.findall(r'href="([^"]*\.pdf[^"]*)"', html)
        print(f"  izpb354 candidates: {len(ms)}", flush=True)
        for u in ms[:3]:
            if u.startswith("/"):
                u = "https://www.bpb.de" + u
            fetch(u, DL / "SoWi", "bpb_izpb354_soziale-ungleichheit.pdf", "bpb, kostenloses PDF")
            break
    except Exception as e:
        print(f"  izpb354 FAIL {str(e)[:80]}", flush=True)
    # Datenreport 2024
    try:
        html = get("https://www.bpb.de/kurz-knapp/zahlen-und-fakten/datenreport-2024/").decode("utf-8", "ignore")
        ms = [m for m in re.findall(r'href="([^"]*\.pdf[^"]*)"', html) if "datenreport" in m.lower() or "dr2024" in m.lower()]
        print(f"  datenreport candidates: {len(ms)}", flush=True)
        for u in ms[:2]:
            if u.startswith("/"):
                u = "https://www.bpb.de" + u
            fetch(u, DL / "SoWi", "bpb_datenreport-2024.pdf", "bpb, kostenloses PDF")
    except Exception as e:
        print(f"  datenreport FAIL {str(e)[:80]}", flush=True)
    # Themenblaetter Unterricht (free PDFs, politics didactics gold)
    try:
        html = get("https://www.bpb.de/shop/zeitschriften/themenblaetter/").decode("utf-8", "ignore")
        ms = sorted(set(re.findall(r'href="([^"]*\.pdf[^"]*)"', html)))[:8]
        print(f"  themenblaetter: {len(ms)}", flush=True)
        for u in ms:
            if u.startswith("/"):
                u = "https://www.bpb.de" + u
            fname = "bpb_themenblatt_" + re.sub(r"[^a-z0-9_.-]+", "_", u.split("/")[-1].lower())[:60]
            fetch(u, DL / "SoWi", fname, "bpb, kostenloses PDF")
    except Exception as e:
        print(f"  themenblaetter FAIL {str(e)[:80]}", flush=True)


def run_kmk():
    print("== kmk ==", flush=True)
    base = "https://www.kmk.org/fileadmin/Dateien/veroeffentlichungen_beschluesse/2012/2012_10_18-Bildungsstandards-"
    for fname, fach in [("Mathe-Abi.pdf", "Mathe"), ("Chemie-Abi.pdf", "Chemie"),
                        ("Physik-Abi.pdf", "Physik"), ("Biologie-Abi.pdf", "Bio")]:
        fetch(base + fname, DL / fach, "kmk_bildungsstandards_" + fname.lower().replace("-", "_"), "KMK, frei")


def run_iqb_deep():
    print("== iqb-deep ==", flush=True)
    IQB = "https://www.iqb.hu-berlin.de"
    jobs = [
        ("abiturpruefungsaufgaben-mathematik", "Mathe", 20),
        ("abiturpr%C3%BCfungsaufgaben-englisch", "Englisch", 14),
        ("abiturpr%C3%BCfungsaufgaben-deutsch", "Deutsch", 14),
        ("abiturpr%C3%BCfungsaufgaben-physik", "Physik", 12),
        ("abiturpr%C3%BCfungsaufgaben-chemie", "Chemie", 12),
        ("abiturpr%C3%BCfungsaufgaben-biologie", "Bio", 12),
    ]
    for slug, fach, lim in jobs:
        links = crawl_pdfs(f"{IQB}/de/schule/aufgaben/sekii/{slug}", lim, IQB)
        print(f"  {fach}: {len(links)} pdf", flush=True)
        for u in links:
            fname = "iqb_" + re.sub(r"[^a-z0-9_.-]+", "_", u.split("/")[-1].split("?")[0].lower())[:70]
            fetch(u, DL / fach, fname, "IQB/KMK, frei f. Lehr-/Lernzwecke")


def run_stansi_deep():
    print("== stansi-deep ==", flush=True)
    STAN = "https://www.standardsicherung.schulministerium.nrw.de"
    jobs = [
        (f"{STAN}/zentralabitur-gost/faecher/deutsch", "Deutsch", 14),
        (f"{STAN}/zentralabitur-gost/faecher/englisch", "Englisch", 14),
        (f"{STAN}/zentralabitur-gost/faecher/mathematik-gost", "Mathe", 14),
        (f"{STAN}/zentrale-klausuren-einfuehrungsphase/faecher/zke-deutsch-fachliche-vorgaben-hinweise-und", "Deutsch", 10),
        (f"{STAN}/zentrale-klausuren-einfuehrungsphase/faecher/zke-mathematik-fachliche-vorgaben-hinweise", "Mathe", 10),
    ]
    for page, fach, lim in jobs:
        links = crawl_pdfs(page, lim, STAN)
        print(f"  {fach}: {len(links)} pdf <- {page.split('/')[-1][:50]}", flush=True)
        for u in links:
            fname = "stansi_" + re.sub(r"[^a-z0-9_.-]+", "_", u.split("/")[-1].split("?")[0].lower())[:70]
            fetch(u, DL / fach, fname, "MSB NRW, frei f. Lehr-/Lernzwecke (UrhWissG 60b)")


def run_audio():
    print("== audio (IQB HV mp3) ==", flush=True)
    IQB = "https://www.iqb.hu-berlin.de"
    try:
        html = get(f"{IQB}/de/schule/aufgaben/sekii/abiturpr%C3%BCfungsaufgaben-englisch").decode("utf-8", "ignore")
    except Exception as e:
        print(f"  PAGE-FAIL {str(e)[:70]}", flush=True)
        return
    ms = sorted(set(re.findall(r'href="([^"]+\.(?:mp3|wav|ogg)[^"]*)"', html)))
    print(f"  audio files: {len(ms)}", flush=True)
    for u in ms[:10]:
        if u.startswith("/"):
            u = IQB + u
        ext = u.split(".")[-1].split("?")[0][:4]
        fname = "iqb_hv_" + re.sub(r"[^a-z0-9_.-]+", "_", u.split("/")[-1].split("?")[0].lower())[:60]
        fetch(u, DL / "Englisch", fname, "IQB/KMK, frei f. Lehr-/Lernzwecke")


GROUPS = {"bpb": run_bpb, "kmk": run_kmk, "iqb-deep": run_iqb_deep,
          "stansi-deep": run_stansi_deep, "audio": run_audio}
if GROUP == "all":
    for g in GROUPS.values():
        g()
else:
    GROUPS[GROUP]()
print("DONE " + GROUP, flush=True)
