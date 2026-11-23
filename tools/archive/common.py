"""Shared helpers for the Chatham library-archive pipeline.

Source: Library of the Chathams digital archive hosted by Digifind-IT (configured in tools/town.json).
"""
import os, re, time, urllib.request, urllib.parse, difflib, json

BASE = "https://www.digifind-it.com"
ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", ".."))
OUT = os.path.join(ROOT, "archive")
TOWN = json.load(open(os.path.join(ROOT, "tools", "town.json")))
UA = TOWN["user_agent"]
SLUG = TOWN["digifind"]["slug"]
DIG = TOWN["digifind"]

def fetch(url, dest=None, tries=4, pause=0.4, timeout=180):
    url = urllib.parse.quote(url, safe=":/?&=%#")
    for i in range(tries):
        try:
            req = urllib.request.Request(url, headers={"User-Agent": UA})
            with urllib.request.urlopen(req, timeout=timeout) as r:
                data = r.read()
            time.sleep(pause)
            if dest:
                os.makedirs(os.path.dirname(dest), exist_ok=True)
                with open(dest, "wb") as f:
                    f.write(data)
                return dest
            return data
        except Exception:
            if i == tries - 1:
                raise
            time.sleep(2 * (i + 1))

def slug(s):
    return re.sub(r"[^a-z0-9]+", "-", s.lower()).strip("-")

SUFFIX = {
    "av": "Avenue", "ave": "Avenue", "avenue": "Avenue",
    "rd": "Road", "road": "Road",
    "pl": "Place", "pi": "Place", "place": "Place",
    "ter": "Terrace", "terr": "Terrace", "terrace": "Terrace",
    "dr": "Drive", "drive": "Drive",
    "ct": "Court", "court": "Court",
    "la": "Lane", "ln": "Lane", "lane": "Lane",
    "pky": "Parkway", "pkv": "Parkway", "pkwy": "Parkway", "parkway": "Parkway",
    "st": "Street", "street": "Street",
    "blvd": "Boulevard", "boulevard": "Boulevard",
    "way": "Way", "cir": "Circle", "circle": "Circle",
    "trl": "Trail", "trail": "Trail",
    "tpke": "Turnpike", "turnpike": "Turnpike",
    "plz": "Plaza", "plaza": "Plaza"
}

DIRS = {"N": "NORTH", "S": "SOUTH", "E": "EAST", "W": "WEST",
        "NORTH": "NORTH", "SOUTH": "SOUTH", "EAST": "EAST", "WEST": "WEST"}

ORDINALS = {"1ST": "First", "2D": "Second", "2ND": "Second", "3D": "Third", "3RD": "Third", "4TH": "Fourth", "5TH": "Fifth"}

STREET_ALIASES = {
    "CENTRE STREET": "CENTER STREET",
    "CENTRE AVENUE": "CENTER AVENUE",
    "BOWER LANE": "BOWERS LANE",
    "BONNELL STREET": "BONNEL STREET",
    "DELWOOD AVENUE": "DELLWOOD AVENUE",
    "KING ROAD": "KINGS ROAD",
    "KINGS STREET": "KINGS ROAD",
    "PASSAIC AVENUE": "NORTH PASSAIC AVENUE",
    "RAILROAD AVENUE": "RAILROAD PLAZA",
    "SHUNPIKE": "SHUNPIKE ROAD",
}

BASE_ALIASES = {
    "CENTRE": "CENTER",
    "BONNELL": "BONNEL",
    "DELWOOD": "DELLWOOD",
    "BOWER": "BOWERS",
    "PARROT MILL": "PARROTT MILL",
}

def load_streets():
    p = os.path.join(OUT, "data", "streets.json")
    return json.load(open(p)) if os.path.exists(p) else []

def _edit_dist(a, b):
    if a == b:
        return 0
    if abs(len(a) - len(b)) > 2:
        return 99
    prev = list(range(len(b) + 1))
    for i, ca in enumerate(a, 1):
        cur = [i] + [0] * len(b)
        for j, cb in enumerate(b, 1):
            cur[j] = min(prev[j] + 1, cur[j - 1] + 1, prev[j - 1] + (ca != cb))
        prev = cur
    return prev[-1]

def normalize_raw_street(raw):
    s = re.sub(r"[^A-Za-z0-9 ]", " ", raw or "").strip()
    if not s:
        return ""
    s = re.sub(r"\b([1-5])\s+(st|nd|rd|th|d)\b", r"\1\2", s, flags=re.I)
    s = re.sub(r"\b(rd|av|ave|st|pl|dr|la|ter|ct|blvd)I?([NSEW])\b", r"\1 \2", s)
    s = re.sub(r"\b([A-Za-z]{4,})(av|rd|pl|st|dr|ter)\b", r"\1 \2", s)
    s = re.sub(r"\b([A-Z])\s+([a-z]{2,})\b", r"\1\2", s)
    for _ in range(2):
        s = re.sub(r"^([NSEW])\s+(?=[A-Za-z0-9]{2,})", lambda m: DIRS[m.group(1).upper()] + " ", s)
    d = re.match(r"^(.*\S)\s+([NSEW]|North|South|East|West)$", s, flags=re.I)
    if d:
        s = DIRS[d.group(2).upper()] + " " + d.group(1)
    toks = [ORDINALS.get(tok.upper(), tok) for tok in s.split()]
    return " ".join(toks).strip()

def _split_street(name):
    w = name.upper().split()
    if not w:
        return "", "", ""
    suf = ""
    if len(w) >= 2 and w[-1].lower() in SUFFIX:
        suf = SUFFIX[w[-1].lower()].upper()
        w = w[:-1]
    dir_p = ""
    if len(w) >= 2 and w[0] in ("NORTH", "SOUTH", "EAST", "WEST"):
        dir_p = w[0]
        w = w[1:]
    base = BASE_ALIASES.get(" ".join(w), " ".join(w))
    return dir_p, base, suf

def canon_street(raw, streets):
    if not raw or not streets:
        return None
    s = normalize_raw_street(raw)
    if not s:
        return None
    w = s.split()
    if w[-1].lower() in SUFFIX:
        w[-1] = SUFFIX[w[-1].lower()]
    elif len(w) == 1 or (len(w) == 2 and w[0].upper() in ("NORTH", "SOUTH", "EAST", "WEST")):
        w.append("Street")
    cand = STREET_ALIASES.get(" ".join(w).upper(), " ".join(w).upper())
    if cand in streets:
        return cand
    c_dir, c_base, c_suf = _split_street(cand)
    rebuilt = STREET_ALIASES.get(" ".join(x for x in (c_dir, c_base, c_suf) if x), " ".join(x for x in (c_dir, c_base, c_suf) if x))
    if rebuilt in streets:
        return rebuilt
    c_dir, c_base, c_suf = _split_street(rebuilt)
    c_ns = c_base.replace(" ", "")
    suffixed = [st for st in streets if _split_street(st)[2]]
    parsed = [(st, *_split_street(st)) for st in suffixed]
    for st, s_dir, s_base, s_suf in parsed:
        if s_dir == c_dir and s_suf == c_suf and s_base.replace(" ", "") == c_ns:
            return st
    if len(c_ns) >= 5:
        max_d = 1 if len(c_ns) <= 7 else 2
        best, best_score = None, (99, 0.0)
        for st, s_dir, s_base, s_suf in parsed:
            if s_dir != c_dir or s_suf != c_suf:
                continue
            d = _edit_dist(c_ns, s_base.replace(" ", ""))
            if d <= max_d:
                ratio = difflib.SequenceMatcher(None, c_ns, s_base.replace(" ", "")).ratio()
                if ratio >= 0.80 and (d, -ratio) < best_score:
                    best, best_score = st, (d, -ratio)
        if best:
            return best
    return None
