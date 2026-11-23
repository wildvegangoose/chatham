"""Index street-address mentions in pre-1951 issues of The Chatham Courier (1946-1950)
from the Library of the Chathams digital archive (Digifind-IT id=2).

Respects copyright: stores ONLY short factual OCR snippets and direct clickable links
to the Library of the Chathams Digifind-IT viewer (zero copied newspaper images).
Samples up to 1 issue per month across 1946-1950 (~54 issues) for polite, bounded crawling.

Usage: /tmp/gis-venv/bin/python tools/archive/courier_news.py
"""
import os, re, sys, json, subprocess, time, urllib.request
from common import BASE, OUT, load_streets, canon_street, SLUG, DIG, UA

STREETS = set(load_streets())
TMP = os.path.join(OUT, "_tmp")
os.makedirs(TMP, exist_ok=True)
os.makedirs(os.path.join(OUT, "data"), exist_ok=True)

ADDR = re.compile(
    r"\b([1-9]\d{0,3})\s+"
    r"((?:North|South|East|West|N\.?|S\.?|E\.?|W\.?)\s+)?"
    r"([A-Z][a-z]{2,}(?:\s+[A-Z][a-z]{2,})?)\s+"
    r"(Road|road|Rd\.?|Avenue|avenue|Ave\.?|Av\.?|Street|street|St\.?|Place|place|Pl\.?|"
    r"Terrace|terrace|Ter\.?|Drive|drive|Dr\.?|Lane|lane|Ln\.?|Court|court|Ct\.?|"
    r"Boulevard|boulevard|Blvd\.?|Way|way|Parkway|parkway|Plaza|plaza)\b"
)

OTHER_TOWN_AFTER = re.compile(
    r"^\s*[,.;:\-–—]*\s*(?:Box\s+\S+\s+)?(?:Newark|Millburn|Short Hills|South Orange|East Orange|West Orange|Orange|"
    r"Irvington|Union|Springfield|Summit|New Providence|Berkeley Heights|Madison|Florham Park|Stirling|Millington|"
    r"Gillette|Meyersville|Morristown|Convent|Basking Ridge|Bernardsville|Plainfield|Westfield|Elizabeth|"
    r"Jersey City|New York|Manhattan|Brooklyn|N\.?\s*Y\.?(?:\s*C\.?)?)\b",
    re.I,
)

out_path = os.path.join(OUT, "data", "courier_news.json")
found = json.load(open(out_path)) if os.path.exists(out_path) else []
done_books = {f["book"] for f in found if "book" in f}

issues = []
for yr in [1946, 1947, 1948, 1949, 1950]:
    url = f"{BASE}/{SLUG}/views/view.php?id={DIG['scrapbooks_id']}&yr={yr}"
    req = urllib.request.Request(url, headers={"User-Agent": UA})
    html_txt = urllib.request.urlopen(req, timeout=30).read().decode("utf-8", "ignore")
    pdfs = sorted(set(re.findall(r"file=([^\"&]+\.pdf)", html_txt)))
    # Pick first issue of each month (YYYY-MM) for even 1946-1950 coverage
    by_month = {}
    for p in pdfs:
        m = re.search(r"(\d{4}-\d{2})-(\d{2})\.pdf$", p)
        if m and m.group(1) not in by_month:
            by_month[m.group(1)] = (f"{m.group(1)}-{m.group(2)}", p)
    issues.extend(sorted(by_month.values()))

print(f"Selected {len(issues)} monthly Chatham Courier issues (1946-1950)", file=sys.stderr)

for date_str, book in issues:
    if book in done_books:
        continue
    pdf = os.path.join(TMP, os.path.basename(book))
    r = subprocess.run(["curl", "-sS", "-m", "180", "-A", UA, "-o", pdf, BASE + book])
    if r.returncode != 0 or not os.path.exists(pdf) or os.path.getsize(pdf) < 10000:
        print(f"skip {book}", file=sys.stderr)
        continue
    txt = subprocess.run(["pdftotext", pdf, "-"], capture_output=True, text=True, errors="ignore").stdout
    os.remove(pdf)
    pages = txt.split("\x0c")
    hits = []
    seen_in_issue = set()
    for pno, page_txt in enumerate(pages, 1):
        clean = re.sub(r"\s+", " ", page_txt)
        for m in ADDR.finditer(clean):
            num = m.group(1)
            if int(num) > 999 or (date_str[:4] == num):
                continue
            after = clean[m.end(): m.end() + 45]
            if OTHER_TOWN_AFTER.match(after):
                continue
            raw_st = f"{m.group(2) or ''}{m.group(3)} {m.group(4)}".strip()
            st = canon_street(raw_st, STREETS)
            if not st:
                continue
            # Skip Chatham Courier's own masthead office address repeated on every page unless pno==1 once
            if st == "MAIN STREET" and num == "166" and "Office" in clean[max(0, m.start()-25):m.start()+5]:
                continue
            key = (st, num, pno)
            if key in seen_in_issue:
                continue
            seen_in_issue.add(key)
            snip = clean[max(0, m.start() - 140): min(len(clean), m.end() + 180)].strip()
            hits.append({
                "book": book,
                "year": int(date_str[:4]),
                "date": date_str,
                "paper": "The Chatham Courier",
                "page": pno,
                "number": num,
                "street": st,
                "snippet": snip,
                "src": f"https://www.digifind-it.com/IDIViewer/web/viewer.html?file={book}#page={pno}"
            })
    found.extend(hits if hits else [{"book": book, "year": int(date_str[:4]), "none": True}])
    json.dump(found, open(out_path, "w"))
    print(f"{date_str}: {len(hits)} Chatham address mentions", file=sys.stderr)
    time.sleep(0.4)

total = sum(1 for x in found if not x.get("none"))
print(f"Done. Total Chatham Courier address mentions (1946-1950): {total}", file=sys.stderr)
