"""Build archive/data/street_index.json and archive/data/streets/<slug>.json for all streets
in Chatham Borough and Chatham Township, merging pre-1951 Chatham Courier mentions and any
directory/card files present.

Usage: /tmp/gis-venv/bin/python tools/archive/build_index.py
"""
import os, re, json, glob, collections
from common import OUT, slug, TOWN

CUTOFF = TOWN["directories"]["name_cutoff_year"]
CONF = json.load(open(os.path.join(OUT, "data", "streets.json")))
houses = collections.defaultdict(lambda: collections.defaultdict(lambda: {"cards": [], "listings": [], "news": []}))

def norm_num(n):
    n = (n or "").strip().upper()
    m = re.match(r"^(\d+)", n)
    return m.group(1) if m else n

# 1. Chatham Courier newspaper mentions (1946-1950)
cp = os.path.join(OUT, "data", "courier_news.json")
news_kept = 0
if os.path.exists(cp):
    seen = set()
    for c in json.load(open(cp)):
        if c.get("none"):
            continue
        st = c["street"]
        num = norm_num(c["number"])
        k = (st, num, c["date"], c["page"])
        if k in seen:
            continue
        seen.add(k)
        houses[st][num]["news"].append({
            "year": c["year"],
            "date": c["date"],
            "paper": c.get("paper", "The Chatham Courier"),
            "page": c["page"],
            "snippet": c["snippet"][:420],
            "src": c["src"],
        })
        news_kept += 1

streets_dir = os.path.join(OUT, "data", "streets")
os.makedirs(streets_dir, exist_ok=True)
for old_f in glob.glob(os.path.join(streets_dir, "*.json")):
    os.remove(old_f)

index = {}
# Ensure EVERY canonical street in Chatham Borough & Chatham Township is in street_index.json
all_streets = sorted(set(CONF) | set(houses.keys()))
for st in all_streets:
    s = slug(st)
    hs = dict(houses.get(st, {}))
    years = [
        y for h in hs.values()
        for y in ([l["year"] for l in h["listings"]] + [int(n["year"]) for n in h["news"]])
    ]
    data = {"name": st, "confirmed": st in CONF, "houses": hs}
    json.dump(data, open(os.path.join(streets_dir, s + ".json"), "w"))
    index[s] = {
        "name": st,
        "houses": len(hs),
        "first": min(years) if years else None,
        "last": max(years) if years else None,
    }

json.dump(index, open(os.path.join(OUT, "data", "street_index.json"), "w"))
print(f"{len(index)} streets, {sum(v['houses'] for v in index.values())} documented addresses, {news_kept} Chatham Courier mentions")
