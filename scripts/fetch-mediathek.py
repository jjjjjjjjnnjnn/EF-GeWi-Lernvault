# fetch-mediathek.py: Siemens Stiftung OER direct downloads (/download/<objid>, no login).
# Usage: python fetch-mediathek.py   (sequential, ~1.5s delay, max 30 files)
# License per medium page: CC BY-SA 4.0 international (Siemens Stiftung).
import json
import time
import urllib.request
from pathlib import Path

UA = {"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) EF-Lernvault-local-learning"}
ROOT = Path(__file__).resolve().parent.parent
DL = ROOT / "_Downloads"
TODAY = time.strftime("%Y-%m-%d")
BASE = "https://medienportal.siemens-stiftung.org"
MAX_FILES = 30

# (objid, fach-dir, label) — EN versions serve Englisch (+MINT), DE serve Fach.
JOBS = [
    (105054, "Englisch", "C4 pH beverages student EN"),
    (105267, "Englisch", "C4 pH beverages answers EN"),
    (103836, "Englisch", "fuel cell operating principle EN"),
    (102470, "Englisch", "physics chemistry of water EN"),
    (102650, "Englisch", "water media package guideline EN"),
    (103826, "Englisch", "energy conversion whiteboard EN"),
    (106597, "Englisch", "our bones EN"),
    (107735, "Englisch", "hand bones EN"),
    (114416, "Englisch", "vaccination package EN"),
    (102646, "Englisch", "fuel cell interactive EN"),
    (105603, "Englisch", "C4 pH package EN"),
    (104538, "Englisch", "B6 renewable energies package EN"),
    (104539, "Englisch", "B7 capacitor hydrogen package EN"),
    (107551, "Englisch", "our bones package EN"),
    (109310, "Chemie", "chromatografie chlorophyll arbeitsblatt"),
    (109309, "Chemie", "chromatografie chlorophyll loesung"),
    (109311, "Chemie", "chromatografie chlorophyll hilfekarten"),
    (109305, "Chemie", "chromatografie video"),
    (103566, "Physik", "brennstoffzelle simulation video"),
    (100175, "Physik", "brennstoffzelle interaktiv"),
    (105002, "Chemie", "C4 pH getraenke schueler DE"),
    (105266, "Chemie", "C4 pH getraenke loesung DE"),
    (107415, "Bio", "handknochen DE"),
    (106585, "Bio", "unsere knochen DE"),
    (102549, "Physik", "wasser leitfaden DE"),
    (102427, "Physik", "physik chemie wasser DE"),
    (103037, "Physik", "tafelbild energieumwandlung"),
    (113917, "Bio", "impfen package"),
    (109258, "Chemie", "trennverfahren package"),
    (105602, "Chemie", "C4 pH package DE"),
    (107467, "Bio", "unsere hand package"),
    (107468, "Bio", "unsere knochen package"),
    (103936, "Physik", "B6 erneuerbare energien package"),
    (103937, "Physik", "B7 kondensator wasserstoff package"),
    (115136, "Mathe", "simulationen mathe"),
    (115135, "Bio", "simulationen bio"),
    (115137, "Chemie", "simulationen chemie"),
    (118697, "Bio", "pubertaet"),
    (118713, "Bio", "organspende"),
]

MAGIC = [
    (b"%PDF-", ".pdf"),
    (b"\xff\xd8\xff", ".jpg"),
    (b"\x89PNG", ".png"),
    (b"ID3", ".mp3"),
    (b"\xff\xfb", ".mp3"),
    (b"OggS", ".ogg"),
    (b"PK\x03\x04", ".zip"),
]


def magic_ext(data):
    for m, e in MAGIC:
        if data.startswith(m):
            return e
    if data[4:8] == b"ftyp":
        return ".mp4"
    return None


def fetch(objid, fach, label):
    url = "%s/download/%d" % (BASE, objid)
    dest_dir = DL / fach / "mediathek"
    dest_dir.mkdir(parents=True, exist_ok=True)
    try:
        req = urllib.request.Request(url, headers=UA)
        with urllib.request.urlopen(req, timeout=120) as r:
            final = r.url
            data = r.read()
    except Exception as e:
        print("  FAIL %d %s" % (objid, str(e)[:90]), flush=True)
        return None
    if "/de/home" in final or "/en/home" in final:
        print("  SKIP %d (package page, no file)" % objid, flush=True)
        return None
    ext = magic_ext(data)
    if not ext:
        print("  FAIL %d bad-header (%dB @%s)" % (objid, len(data), final[-40:]), flush=True)
        return None
    fname = "siemens_%d_%s%s" % (objid, "".join(c if c.isalnum() else "-" for c in label.lower())[:50].strip("-"), ext)
    dest = dest_dir / fname
    if not (dest.exists() and dest.stat().st_size > 50000):
        dest.write_bytes(data)
        (dest_dir / (fname + ".quelle.txt")).write_text(
            "Quelle: %s\nDetail: %s/%d\nLizenz: CC BY-SA 4.0 international (Siemens Stiftung, OER)\nDatum: %s\nZweck: nur lokales Lernen, nicht in git.\n"
            % (url, BASE, objid, TODAY), encoding="utf-8")
    print("  OK %s (%dKB, %s)" % (fname, len(data) // 1024, ext), flush=True)
    return {"file": "mediathek/" + fname, "fach": fach, "objid": objid,
            "detail": "%s/%d" % (BASE, objid), "license": "CC BY-SA 4.0",
            "bytes": len(data), "ext": ext, "date": TODAY}


def main():
    manifest = []
    for objid, fach, label in JOBS:
        if len(manifest) >= MAX_FILES:
            break
        r = fetch(objid, fach, label)
        if r:
            manifest.append(r)
        time.sleep(1.5)
    mp = DL / "mediathek_manifest.json"
    old = []
    if mp.exists():
        try:
            old = json.loads(mp.read_text(encoding="utf-8"))
        except Exception:
            old = []
    seen = set(x.get("detail", "") for x in old)
    old.extend(x for x in manifest if x["detail"] not in seen)
    mp.write_text(json.dumps(old, ensure_ascii=False, indent=1), encoding="utf-8")
    total = sum(x["bytes"] for x in manifest)
    print("DONE files=%d bytes=%d" % (len(manifest), total), flush=True)


main()
