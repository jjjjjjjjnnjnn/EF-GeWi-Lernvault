# ebook-fetch: SoWi e-book local archive (gitignored, personal licensed use only)
# ASCII comments only. Raw text stays in _Downloads/SoWi/ebook-raw/, NEVER committed.
# Vault notes remain original summaries; only chapter titles map into the Navigator.
#
# Flow:
#   1. python auth_login.py   # user logs in manually in the opened browser, presses Enter
#   2. python fetch_sowi.py   # crawls pages 1..N, saves raw text, polite 2s delay, resumable
#
# Requires: pip install playwright && python -m playwright install chromium

BASE_URL = "https://www.click-and-study.de/Player/id/1162/page/{page}"
START_PAGE = 1
DELAY_SEC = 2.0
OUT_DIR = "../../_Downloads/SoWi/ebook-raw"
