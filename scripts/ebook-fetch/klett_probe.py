# klett_probe.py: test plain-HTTP download with klett-auth.json cookies (no browser).
# Run: python klett_probe.py
import json
import urllib.request
from pathlib import Path

HERE = Path(__file__).parent
auth = json.loads((HERE / "klett-auth.json").read_text(encoding="utf-8"))
cookies = auth.get("cookies", [])
jar = "; ".join(f"{c['name']}={c['value']}" for c in cookies
                if "klett.de" in c.get("domain", ""))
print(f"cookies for klett.de: {len(jar)} chars from {len(cookies)} total")

url = "https://bridge.klett.de/MSA-PH1QJUSMBT/05_t5/RO-M7DN.mp3"
req = urllib.request.Request(url, headers={
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
    "Cookie": jar,
    "Referer": "https://bridge.klett.de/MSA-PH1QJUSMBT/_html/05_t5.html",
})
try:
    with urllib.request.urlopen(req, timeout=120) as r:
        data = r.read()
    print(f"status={r.status} bytes={len(data)} head={data[:3]}")
    print("MP3-OK" if data.startswith(b"ID3") or data[:2] == b"\xff\xfb" else "NOT-MP3")
except Exception as e:
    print(f"FAIL {str(e)[:200]}")
