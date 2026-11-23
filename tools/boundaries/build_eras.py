"""Build approximate historic jurisdiction outlines (data/boundaries.js) and today's town
outline (data/boundary.js) for The Chathams (Chatham Borough + Chatham Township) from Census
TIGERweb municipal boundaries for Morris County, NJ (STATE='34', COUNTY='027').

No historic boundary files exist for pre-1899 townships, so older eras are unions of today's
municipalities that grew out of them. Every historical outline is labelled "approximate" on the site.
Sources: John P. Snyder, The Story of New Jersey's Civil Boundaries: 1606-1968 (1969).

Usage: /tmp/gis-venv/bin/python tools/boundaries/build_eras.py [cache_dir]
"""
import json, os, sys, urllib.request, urllib.parse
from shapely.geometry import shape, mapping
from shapely.ops import unary_union

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", ".."))
CACHE = sys.argv[1] if len(sys.argv) > 1 else os.path.join(ROOT, "archive", "_tmp", "boundaries")
os.makedirs(CACHE, exist_ok=True)
os.makedirs(os.path.join(ROOT, "data"), exist_ok=True)
SRC = os.path.join(CACHE, "morris_county_subdivisions.geojson")
URL = ("https://tigerweb.geo.census.gov/arcgis/rest/services/TIGERweb/tigerWMS_Current/MapServer/22/query?"
       + urllib.parse.urlencode({"where": "STATE='34' AND COUNTY='027'", "outFields": "NAME,BASENAME",
                                 "outSR": "4326", "f": "geojson"}))
if not os.path.exists(SRC):
    print("downloading TIGERweb Morris County subdivisions")
    urllib.request.urlretrieve(URL, SRC)

towns = {f["properties"]["NAME"]: shape(f["geometry"]) for f in json.load(open(SRC))["features"]}
T = lambda *names: unary_union([towns[n] for n in names]).buffer(0.0004).buffer(-0.0004)

BORO = towns["Chatham borough"]
TWP = towns["Chatham township"]
CHATHAMS = T("Chatham township", "Chatham borough")

ERAS = [
  ("colonial", 1740, 1805, "Morris Township & Hanover Township",
   T("Morris township", "Morristown town", "Hanover township", "East Hanover township",
     "Parsippany-Troy Hills township", "Harding township", "Chatham township",
     "Chatham borough", "Madison borough", "Florham Park borough"),
   "From 1740 until 1806, the Passaic crossing at John Day's Bridge (named Chatham in 1773) lay along the border of Morris Township and Hanover Township in Morris County (formed 1739). Approximate."),
  ("township1806", 1806, 1888, "Chatham Township (original 1806 bounds)",
   T("Chatham township", "Chatham borough", "Madison borough", "Florham Park borough"),
   "Incorporated February 12, 1806 from Hanover and Morris Townships, original Chatham Township took in Chatham, Bottle Hill (Madison), Afton (Florham Park) and Green Village. Approximate."),
  ("township1889", 1889, 1898, "Chatham Township",
   T("Chatham township", "Chatham borough", "Florham Park borough"),
   "Madison seceded as an independent borough on December 27, 1889; Florham Park remained in Chatham Township until March 20, 1899. Approximate."),
  ("village1892", 1892, 1896, "Chatham Village",
   BORO,
   "Voted August 9, 1892 (effective August 19) to form Chatham Village inside the township after villagers protested paying 40 percent of township taxes for 7 percent of services. Approximate."),
  ("chathams", 1899, 2026, "The Chathams: Chatham Township & Chatham Borough",
   CHATHAMS,
   "Combined bounds of Chatham Township (settled in its modern shape after Florham Park separated March 20, 1899) and Chatham Borough (incorporated March 1, 1897). U.S. Census TIGER."),
  ("borough", 1897, 2026, "Chatham Borough",
   BORO,
   "Incorporated as an independent borough on March 1, 1897 (2.4 sq mi; minor boundary adjustment with Florham Park in 1910). U.S. Census TIGER."),
]

def gj(geom, tol=0.00008):
    return mapping(geom.simplify(tol, preserve_topology=True))

def rnd(o):
    if isinstance(o, (list, tuple)):
        return [rnd(x) for x in o]
    return round(o, 5) if isinstance(o, float) else o

INNER = {"village1892", "borough"}
out = [
    dict({"id": i, "from": a, "to": b, "name": n, "note": note, "geometry": rnd(gj(g))},
         **({"inner": True} if i in INNER else {}))
    for i, a, b, n, g, note in ERAS
]
with open(os.path.join(ROOT, "data", "boundaries.js"), "w") as f:
    f.write("// Approximate historic jurisdiction outlines, built by tools/boundaries/build_eras.py from U.S. Census TIGER\n"
            "// municipal boundaries (public domain). Historic lines are unions of today's towns, not surveyed lines.\n"
            "window.MW_JURISDICTIONS = " + json.dumps(out, separators=(",", ":")) + ";\n")
with open(os.path.join(ROOT, "data", "boundary.js"), "w") as f:
    f.write("// Combined Chatham Borough & Chatham Township boundary, U.S. Census TIGER (public domain).\n"
            "window.MW_BOUNDARY = " + json.dumps(rnd(gj(CHATHAMS, 0.00003)), separators=(",", ":")) + ";\n"
            "window.MW_BOROUGH_BOUNDARY = " + json.dumps(rnd(gj(BORO, 0.00003)), separators=(",", ":")) + ";\n")
for e in out:
    print(e["id"], e["from"], e["to"], e["geometry"]["type"], "bounds:", [round(x, 4) for x in shape(e["geometry"]).bounds])
print("bounds of The Chathams:", [round(x, 4) for x in CHATHAMS.bounds])
print("bounds of 1806 Chatham Township:", [round(x, 4) for x in shape(out[1]["geometry"]).bounds])
