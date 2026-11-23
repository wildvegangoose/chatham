# Chatham Through Time

An interactive, static historical web app celebrating **Chatham Borough** and **Chatham Township** ("The Chathams"), Morris County, New Jersey — live at **[wildvegangoose.github.io/chatham](https://wildvegangoose.github.io/chatham/)**.

Part of the Morristown Line local-history series alongside [Maplewood Through Time](https://wildvegangoose.github.io/maplewood/) and [South Orange Through Time](https://wildvegangoose.github.io/south-orange/).

## What's Inside

- **Time Machine (`index.html`)** — An interactive 1600–2026 SVG panorama of The Chathams from the Lenape crossing at *Fishawack* and John Day's Bridge to Shepard Kollock's 1779 *New-Jersey Journal*, George Washington's August 1781 bread-oven ruse, commercial glass rose greenhouses, the 1914 elevated Lackawanna stone station, Madame Bey's River Road boxing camp, and Great Swamp National Wildlife Refuge.
- **Explore the Map (`explore.html`)** — 60+ geocoded places, historic roads, seats of government, and evolving municipal boundaries (`1740` Morris/Hanover split → `1806` original Chatham Township → `1889` Madison split → `1892` Chatham Village → `1897` Chatham Borough → `1899` Florham Park split) layered over georeferenced USGS survey maps (`1888`, `1898`, `1906`, `1921`, `1947`, `1955`, `1981`) and NJ statewide aerials (`1930`, `1995`, `2007`, `2020`).
- **Your House's Story (`house.html`)** — Enter any Chatham Borough or Chatham Township address (including Green Village) to see whether it lies in the Borough or Township, match public-domain **1901, 1909 & 1921 Sanborn Fire Insurance Map** plates, view HABS/Gottscho archival house photos, and browse pre-1951 mentions from *The Chatham Courier* (`1946–1950`) linking directly to the Library of the Chathams digital viewer.
- **Landmarks (`landmarks.html` & `landmarks/*.html`)** — 14 deep-dive landmark profiles across Borough and Township, each with an 11-step `1888–2020` "Through the Ages" map/aerial comparison slider.
- **Notable People (`people.html`)** — 61 documented historical and cultural figures connected to Chatham Borough and Chatham Township (with strict privacy protection: zero street addresses for living people or post-1950 residents).
- **Timeline (`timeline.html`) & Research Guide (`research.html`)** — Chronological timeline and step-by-step Morris County / Library of the Chathams house-history guide.

## Running Locally & Verifying

No bundler or runtime server dependencies are required — open any `.html` file or serve the root directory with `python3 -m http.server`.

```bash
# Check JS syntax
node --check js/*.js

# Rebuild static SEO pages, JSON-LD, sitemap.xml & robots.txt
python3 tools/seo/build_seo.py

# Run accuracy, boundary, licensing, privacy & link tests
python3 -m unittest discover -s tests -v
```

## Credits & Licensing

Code is MIT-licensed ([LICENSE](LICENSE)). Every image stored in `img/` is verified Public Domain (USGS, Library of Congress HABS / Gottscho-Schleisner, U.S. Fish & Wildlife Service, pre-1929 Sanborn maps, CC0) or Creative Commons (`CC BY-SA 3.0` / `4.0`) with full creator and license attribution on every page. Newspaper snippets link directly to the [Library of the Chathams Digital Archive](https://www.digifind-it.com/chatham/).
