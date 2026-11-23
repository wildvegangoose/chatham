"""Automated historical accuracy, boundary, licensing, privacy, link & SEO test suite for Chatham Through Time.

Run with:
    python3 -m unittest discover -s tests -v
"""
import html as html_lib
import json
import pathlib
import re
import subprocess
import sys
import unittest
import xml.etree.ElementTree as ET
from urllib.parse import unquote

ROOT = pathlib.Path(__file__).resolve().parents[1]
ARCHIVE = ROOT / "archive"
STREETS_DIR = ARCHIVE / "data" / "streets"
sys.path.insert(0, str(ROOT / "tools" / "archive"))
import common  # noqa: E402


def _eval_js_bundle():
    script = f"""
    global.window = global;
    global.MW = {{}};
    MW.esc = s => String(s).replace(/[&<>"']/g, c => ({{ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }}[c]));
    require({json.dumps(str(ROOT / "data/boundary.js"))});
    require({json.dumps(str(ROOT / "data/boundaries.js"))});
    require({json.dumps(str(ROOT / "js/data.js"))});
    require({json.dumps(str(ROOT / "js/landmarks-data.js"))});
    require({json.dumps(str(ROOT / "js/people-data.js"))});
    require({json.dumps(str(ROOT / "js/webstories.js"))});
    require({json.dumps(str(ROOT / "js/housephotos.js"))});
    require({json.dumps(str(ROOT / "js/sanborn-data.js"))});
    require({json.dumps(str(ROOT / "js/sanborn.js"))});

    const placeChecks = MW.places.map(p => ({{
      id: p.id,
      scope: p.scope || null,
      inChathams: MW.geo.inTown([p.lat, p.lon]),
      inBoro: MW.geo.inPolygon([p.lat, p.lon], window.MW_BOROUGH_BOUNDARY)
    }}));
    const lmChecks = Object.entries(MW.landmarks).map(([id, v]) => ({{
      id,
      inChathams: MW.geo.inTown([v.lat, v.lon]),
      inBoro: MW.geo.inPolygon([v.lat, v.lon], window.MW_BOROUGH_BOUNDARY)
    }}));

    console.log(JSON.stringify({{
      town: MW.town,
      sources: MW.sources,
      census: MW.census,
      names: MW.names,
      seats: MW.seats,
      eras: MW.eras,
      places: MW.places,
      sections: MW.sections,
      oldRoads: MW.oldRoads,
      landmarks: MW.landmarks,
      people: MW.people,
      stories: MW.webStories,
      housePhotos: MW.housePhotos,
      sanbornPlates: MW.SANBORN_PLATES,
      jurisdictions: (window.MW_JURISDICTIONS || []).map(j => ({{ id: j.id, from: j.from, to: j.to, inner: !!j.inner }})),
      placeChecks,
      lmChecks,
      sb186Main: MW.sanbornHTML("186", "Main Street"),
      sb62Elmwood: MW.sanbornHTML("62", "Elmwood Avenue"),
      sb516River: MW.sanbornHTML("516", "River Road"),
      story186Main: MW.storiesFor("186", "Main St").length,
      story516River: MW.storiesFor("516", "River Rd").length,
      hp25Main: MW.housePhotosFor("25", "Main Street").length
    }}));
    """
    out = subprocess.check_output(["node", "-e", script], text=True)
    return json.loads(out)


class ChathamAccuracyTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.js = _eval_js_bundle()
        cls.conf_streets = json.loads((ARCHIVE / "data" / "streets.json").read_text(encoding="utf-8"))
        cls.street_index = json.loads((ARCHIVE / "data" / "street_index.json").read_text(encoding="utf-8"))

    def test_verified_historical_dates_and_census(self):
        places = {p["id"]: p for p in self.js["places"]}
        self.assertEqual(places["daysbridge1710"]["year"], 1710)
        self.assertEqual(places["morrell"]["year"], 1740)
        self.assertEqual(places["naming1773"]["year"], 1773)
        self.assertEqual(places["loantakacamp"]["year"], 1777)
        self.assertEqual(places["kollock"]["year"], 1779)
        self.assertIn("February 16, 1779", places["kollock"]["text"])
        self.assertIn("August 1781", places["kollock"]["text"])
        self.assertEqual(places["turnpike1801"]["year"], 1801)
        self.assertEqual(places["township1806"]["year"], 1806)
        self.assertIn("February 12, 1806", places["township1806"]["text"])
        self.assertEqual(places["railroad1837"]["year"], 1837)
        self.assertEqual(places["dusenberry"]["year"], 1848)
        self.assertEqual(places["redbrick"]["year"], 1860)
        self.assertEqual(places["village1892"]["year"], 1892)
        self.assertEqual(places["chathampress"]["year"], 1897)
        self.assertIn("March 1, 1897", places["chathampress"]["text"])
        self.assertEqual(places["speedbumps1906"]["year"], 1906)
        self.assertEqual(places["station"]["year"], 1914)
        self.assertIn("June 19, 1914", places["station"]["text"])
        self.assertEqual(places["madamebey"]["year"], 1923)
        self.assertIn("516 River Road", places["madamebey"]["address"])
        self.assertEqual(places["electrification1930"]["year"], 1930)
        self.assertIn("December 18, 1930", places["electrification1930"]["text"])
        self.assertEqual(places["greatswamp"]["year"], 1960)
        self.assertIn("November 3, 1960", places["greatswamp"]["text"])
        self.assertEqual(places["schoolmerge1986"]["year"], 1986)

        census = dict(self.js["census"])
        self.assertEqual(census[1900], 1981)   # 1,361 Borough + 620 Township
        self.assertEqual(census[1930], 4984)   # 3,869 Borough + 1,115 Township
        self.assertEqual(census[1950], 10216)  # 7,391 Borough + 2,825 Township
        self.assertEqual(census[1970], 17659)  # 9,566 Borough + 8,093 Township
        self.assertEqual(census[2000], 18546)  # 8,460 Borough + 10,086 Township
        self.assertEqual(census[2020], 20195)  # 9,212 Borough + 10,983 Township

    def test_boundaries_and_borough_vs_township_containment(self):
        jur_ids = {j["id"] for j in self.js["jurisdictions"]}
        self.assertEqual(
            jur_ids,
            {"colonial", "township1806", "township1889", "village1892", "chathams", "borough"},
        )

        for pc in self.js["placeChecks"]:
            if pc["scope"] == "township":
                self.assertFalse(pc["inChathams"], f"Scoped township place unexpectedly inside today's Chathams: {pc['id']}")
            else:
                self.assertTrue(pc["inChathams"], f"Local place outside MW_BOUNDARY: {pc['id']}")

        boro_lms = {"kollock", "dayhouses", "stephenday", "dusenberry", "mainstreet", "ogden", "rosehouses", "station", "boroughhall"}
        twp_lms = {"boisaubin", "redbrick", "madamebey", "greenvillage", "greatswamp"}
        self.assertEqual(boro_lms | twp_lms, set(self.js["landmarks"].keys()))
        for lc in self.js["lmChecks"]:
            self.assertTrue(lc["inChathams"], f"Landmark outside MW_BOUNDARY: {lc['id']}")
            if lc["id"] in boro_lms:
                self.assertTrue(lc["inBoro"], f"Borough landmark outside MW_BOROUGH_BOUNDARY: {lc['id']}")
            else:
                self.assertFalse(lc["inBoro"], f"Township landmark unexpectedly inside MW_BOROUGH_BOUNDARY: {lc['id']}")

    def test_sources_images_sanborn_and_map_overlays(self):
        sources = self.js["sources"]
        for sid, s in sources.items():
            url = s.get("url") or ""
            self.assertTrue(url.startswith("https://"), f"Source {sid} not https: {url}")
            self.assertEqual(url.count("("), url.count(")"), f"Unbalanced parens in source {sid}: {url}")

        for p in self.js["places"]:
            self.assertTrue(p.get("sources"), f"Place missing sources: {p['id']}")
            for sid in p["sources"]:
                self.assertIn(sid, sources, f"Unknown source {sid} on place {p['id']}")
        for e in self.js["eras"]:
            for sid in e["sources"]:
                self.assertIn(sid, sources, f"Unknown source {sid} on era {e['id']}")
        for s in self.js["seats"]:
            for sid in s["sources"]:
                self.assertIn(sid, sources, f"Unknown source {sid} on seat {s['id']}")
        for sec in self.js["sections"]:
            for sid in sec["sources"]:
                self.assertIn(sid, sources, f"Unknown source {sid} on section {sec['id']}")

        for yr in ("1888", "1898", "1906", "1921", "1947", "1955", "1981"):
            f = ROOT / "img" / "maps" / f"topo{yr}.webp"
            self.assertTrue(f.is_file() and f.stat().st_size > 10_000, f"Missing/tiny topo overlay: {f}")

        age_years = ["1888-map", "1898-map", "1906-map", "1921-map", "1930-aerial", "1947-map", "1955-map", "1981-map", "1995-aerial", "2007-aerial", "2020-aerial"]
        for lm_id, lm in self.js["landmarks"].items():
            for sid in lm.get("sources", []):
                self.assertIn(sid, sources, f"Unknown source {sid} on landmark {lm_id}")
            for ph in lm.get("photos", []):
                img_f = ROOT / ph["src"]
                self.assertTrue(img_f.is_file() and img_f.stat().st_size > 1000, f"Missing landmark photo {img_f}")
                self.assertTrue(ph.get("credit"), f"Missing credit on {ph['src']}")
                self.assertTrue(ph.get("license"), f"Missing license on {ph['src']}")
            for ay in age_years:
                af = ROOT / "img" / "ages" / lm_id / f"{ay}.jpg"
                self.assertTrue(af.is_file() and af.stat().st_size > 1000, f"Missing/tiny age image: {af}")

        for hp in self.js["housePhotos"]:
            hf = ROOT / hp["src"]
            self.assertTrue(hf.is_file() and hf.stat().st_size > 1000, f"Missing house photo: {hf}")
            self.assertTrue(hp.get("credit") and hp.get("license"))

        self.assertIn("1901", self.js["sb186Main"])
        self.assertIn("1909", self.js["sb186Main"])
        self.assertIn("1921", self.js["sb186Main"])
        self.assertIn("1909", self.js["sb62Elmwood"])
        self.assertEqual(self.js["sb516River"], "")
        self.assertGreaterEqual(self.js["story186Main"], 1)
        self.assertGreaterEqual(self.js["story516River"], 1)
        self.assertGreaterEqual(self.js["hp25Main"], 1)

    def test_archive_index_and_strict_privacy_rules(self):
        self.assertEqual(len(self.conf_streets), 325)
        self.assertEqual(len(self.street_index), 325)
        self.assertEqual(common.canon_street("N Passaic av", self.conf_streets), "NORTH PASSAIC AVENUE")
        self.assertEqual(common.canon_street("S Passaic av", self.conf_streets), "SOUTH PASSAIC AVENUE")
        self.assertEqual(common.canon_street("Fairmount av", self.conf_streets), "FAIRMOUNT AVENUE")
        self.assertEqual(common.canon_street("Southern blvd", self.conf_streets), "SOUTHERN BOULEVARD")
        self.assertEqual(common.canon_street("Green Village rd", self.conf_streets), "GREEN VILLAGE ROAD")

        total_news = 0
        documented_houses = 0
        for p in sorted(STREETS_DIR.glob("*.json")):
            data = json.loads(p.read_text(encoding="utf-8"))
            for num, rec in data.get("houses", {}).items():
                if rec.get("news") or rec.get("listings"):
                    documented_houses += 1
                for r in rec.get("listings", []):
                    self.assertLessEqual(r["year"], 1950)
                for n in rec.get("news", []):
                    total_news += 1
                    self.assertLessEqual(n["year"], 1950, f"Post-1950 news item leaked at {num} {data['name']}")
                    self.assertIn("digifind-it.com/", n.get("src", ""))
                    self.assertIn("/chatham/", n.get("src", ""))
                    self.assertFalse(n.get("img"), "Copyrighted newspaper image should not be copied locally")
        self.assertGreaterEqual(total_news, 950)
        self.assertGreaterEqual(documented_houses, 550)

        self.assertGreaterEqual(len(self.js["people"]), 55)
        for person in self.js["people"]:
            if person.get("living") or not person.get("died") or (person.get("born") or 0) >= 1900:
                self.assertFalse(
                    person.get("homes"),
                    f"Privacy rule violated — home address attached to modern/living person: {person['name']}",
                )
            for h in person.get("homes") or []:
                yrs = [int(y) for y in re.findall(r"\b(1[6-9]\d{2}|20\d{2})s?\b", h.get("years", ""))]
                self.assertTrue(yrs and max(yrs) <= 1950, f"Post-1950 home year on {person['name']}: {h}")
            url = person.get("url") or ""
            self.assertEqual(url.count("("), url.count(")"), f"Unbalanced parens in URL for {person['name']}: {url}")

    def test_local_links_seo_sitemap_verification_and_analytics(self):
        cfg = json.loads((ROOT / "tools" / "town.json").read_text(encoding="utf-8"))
        site_url = cfg["site_url"].rstrip("/") + "/"

        html_files = sorted(list(ROOT.glob("*.html")) + list((ROOT / "landmarks").glob("*.html")))
        self.assertEqual(len(html_files), 8 + len(self.js["landmarks"]))

        broken_links = []
        for hf in html_files:
            txt = hf.read_text(encoding="utf-8")
            no_inline_js = re.sub(r"<script(?![^>]*\bsrc=)[^>]*>[\s\S]*?</script>", "", txt, flags=re.I)
            for attr, raw in re.findall(r'\b(href|src)="([^"]+)"', no_inline_js):
                if raw.startswith(("http://", "https://", "mailto:", "data:", "#", "javascript:")):
                    continue
                clean = unquote(raw.split("#")[0].split("?")[0])
                if not clean:
                    continue
                target = (hf.parent / clean).resolve()
                if not target.exists():
                    broken_links.append((str(hf.relative_to(ROOT)), attr, raw))
        self.assertEqual(broken_links, [], f"Broken local links: {broken_links[:10]}")

        robots = (ROOT / "robots.txt").read_text(encoding="utf-8")
        self.assertIn(f"Sitemap: {site_url}sitemap.xml", robots)

        tree = ET.parse(ROOT / "sitemap.xml")
        ns = {"sm": "http://www.sitemaps.org/schemas/sitemap/0.9"}
        locs = [el.text for el in tree.getroot().findall("sm:url/sm:loc", ns)]
        self.assertEqual(len(locs), 7 + len(self.js["landmarks"]))
        self.assertEqual(len(locs), len(set(locs)))
        self.assertNotIn(f"{site_url}landmark.html", locs)

        lm_shell = (ROOT / "landmark.html").read_text(encoding="utf-8")
        self.assertIn('content="noindex, follow"', lm_shell)
        self.assertIn(cfg["cloudflare_beacon_token"], lm_shell)

        titles, descs = set(), set()
        for loc in locs:
            rel = loc[len(site_url) :] or "index.html"
            fpath = ROOT / rel
            self.assertTrue(fpath.is_file(), f"Missing sitemap target {fpath}")
            txt = fpath.read_text(encoding="utf-8")
            self.assertIn('content="index, follow"', txt)
            self.assertIn(f'<link rel="canonical" href="{html_lib.escape(loc, quote=True)}">', txt)
            self.assertIn(cfg["cloudflare_beacon_token"], txt, f"Missing Cloudflare analytics beacon on {rel}")

            tm = re.search(r"<title>([\s\S]*?)</title>", txt)
            dm = re.search(r'<meta name="description" content="([^"]+)"', txt)
            om = re.search(r'<meta property="og:image" content="([^"]+)"', txt)
            jm = re.search(r'<script type="application/ld\+json">([\s\S]*?)</script>', txt)
            self.assertTrue(tm and dm and om and jm, f"Incomplete SEO head on {rel}")

            t_val, d_val = tm.group(1).strip(), dm.group(1).strip()
            self.assertNotIn(t_val, titles, f"Duplicate title: {t_val}")
            self.assertNotIn(d_val, descs, f"Duplicate description: {d_val}")
            titles.add(t_val)
            descs.add(d_val)

            og_img = html_lib.unescape(om.group(1))
            og_file = ROOT / og_img[len(site_url) :]
            self.assertTrue(og_file.is_file() and og_file.stat().st_size > 1000, f"Missing og:image {og_file}")

            ld = json.loads(jm.group(1))
            self.assertEqual(ld.get("@context"), "https://schema.org")
            self.assertTrue(ld.get("@graph"))

        idx_txt = (ROOT / "index.html").read_text(encoding="utf-8")
        self.assertIn(
            f'<meta name="google-site-verification" content="{cfg["google_site_verification"]}"',
            idx_txt,
        )
        self.assertIn("https://wildvegangoose.github.io/maplewood/", idx_txt)
        self.assertIn("https://wildvegangoose.github.io/south-orange/", idx_txt)

        house_txt = (ROOT / "house.html").read_text(encoding="utf-8")
        self.assertEqual(len(re.findall(r'href="house\.html\?q=[^"]+"', house_txt)), 325)


if __name__ == "__main__":
    unittest.main(verbosity=2)
