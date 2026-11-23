/* House page: "From the library archive" section.
   Reads the archive/ folder built by tools/archive/*.py (Chatham Courier 1946–1950 mentions + street index). */
(function () {
  const MW = window.MW;
  const ROOT = "archive/";
  const SUF = { RD: "ROAD", AV: "AVENUE", AVE: "AVENUE", ST: "STREET", PL: "PLACE", TER: "TERRACE", TERR: "TERRACE", DR: "DRIVE", CT: "COURT", LN: "LANE", LA: "LANE", PKWY: "PARKWAY", BLVD: "BOULEVARD", CIR: "CIRCLE", PLZ: "PLAZA", TRL: "TRAIL", TPKE: "TURNPIKE" };

  const esc = MW.esc;
  const nice = s => s.toLowerCase().replace(/\b\w/g, c => c.toUpperCase());

  function normRoad(r) {
    if (!r) return null;
    const w = r.toUpperCase().replace(/[^A-Z0-9 ]/g, " ").split(/\s+/).filter(Boolean);
    if (w.length && SUF[w[w.length - 1]]) w[w.length - 1] = SUF[w[w.length - 1]];
    return w.join(" ");
  }
  const slug = s => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

  async function getJSON(u) { const r = await fetch(u); if (!r.ok) throw new Error(r.status); return r.json(); }

  function matchStreet(index, road) {
    const n = normRoad(road); if (!n) return null;
    if (index[slug(n)]) return slug(n);
    const DIR = { N: "NORTH", S: "SOUTH", E: "EAST", W: "WEST", NORTH: "NORTH", SOUTH: "SOUTH", EAST: "EAST", WEST: "WEST" };
    let alt = n.replace(/\bCENTRE\b/g, "CENTER").replace(/\bBONNELL\b/g, "BONNEL").replace(/\bBOWER\b/g, "BOWERS").replace(/\bDELWOOD\b/g, "DELLWOOD");
    const dm = alt.match(/^(.+)\s+(N|S|E|W|NORTH|SOUTH|EAST|WEST)$/);
    if (dm) alt = DIR[dm[2]] + " " + dm[1];
    if (index[slug(alt)]) return slug(alt);
    const bare = alt.replace(/\s+(ROAD|AVENUE|STREET|PLACE|TERRACE|DRIVE|COURT|LANE|PARKWAY|WAY|CIRCLE|BOULEVARD|PLAZA|TRAIL|TURNPIKE)$/, "");
    const hasSuffix = bare !== alt;
    const matches = Object.keys(index).filter(k => index[k].name.replace(/\s+(ROAD|AVENUE|STREET|PLACE|TERRACE|DRIVE|COURT|LANE|PARKWAY|WAY|CIRCLE|BOULEVARD|PLAZA|TRAIL|TURNPIKE)$/, "") === bare);
    if (matches.length === 1) return matches[0];
    return !hasSuffix && matches.length ? matches[0] : null;
  }

  function snip(t, num) {
    const i = Math.max(0, (t || "").search(new RegExp("\\b" + num + "\\b")));
    const s = (t || "").slice(Math.max(0, i - 130), i + 180);
    return (i > 130 ? "…" : "") + s.replace(/^\S*\s/, "") + "…";
  }

  function render(el, addr, street, num, house, streetData) {
    const ls = (house && house.listings) || [], news = (house && house.news) || [];
    const nearbyNums = streetData ? Object.keys(streetData.houses || {}).filter(n => n !== num && ((streetData.houses[n].news || []).length || (streetData.houses[n].listings || []).length))
      .sort((a, b) => Math.abs(+a - +num) - Math.abs(+b - +num)).slice(0, 10) : [];

    el.innerHTML = `<div class="wrap">
      <div class="arch-head reveal">
        <div class="eyebrow">From the Library of the Chathams digital archive</div>
        <h2>The archival record for ${esc(addr)}</h2>
        <p class="lede">${news.length
          ? `We found <b>${news.length}</b> pre-1951 mention${news.length === 1 ? "" : "s"} of <b>${esc(addr)}</b> in <em>The Chatham Courier</em> (1946–1950) in the Library of the Chathams digital archive.`
          : `No pre-1951 <em>Chatham Courier</em> mentions matched this exact number in our monthly 1946–1950 index—the house may be newer, rural Route/RFD numbers in Chatham Township were assigned in the 1950s, or OCR may have garbled a digit.`}</p>
        <p class="arch-local small">Newspaper mentions come from <em>The Chatham Courier</em> (1946–1950) in the <a href="https://www.digifind-it.com/chatham/" target="_blank" rel="noopener">Library of the Chathams digital archive</a>; every card links straight to the original scanned page. Pre-1950 Chatham city directories are held in print in the Library's New Jersey Room at 214 Main Street, and 14 bound volumes of <em>The Fishawack Papers</em> are searchable at <a href="https://chathamlibrary.org/fishawack-papers/" target="_blank" rel="noopener">chathamlibrary.org</a>.</p>
      </div>
      ${news.length ? `<div class="news reveal"><h3>In <em>The Chatham Courier</em> (1946–1950)</h3>
        <p class="small muted">Excerpts read by computer from the scanned newspaper pages. Click any card to open the full original page in the Library of the Chathams viewer.</p>
        <div class="ws-grid">${news.slice().sort((a, b) => String(a.date || a.year).localeCompare(String(b.date || b.year))).slice(0, 12).map(n =>
          `<a class="ws card" href="${n.src}" target="_blank" rel="noopener">
            <span class="tag event">${esc(n.date || String(n.year))}</span>
            <h3>${esc(n.paper || "The Chatham Courier")}${n.page ? ` · p. ${n.page}` : ""}</h3>
            <p class="small">${esc(snip(n.snippet, num))}</p>
            <span class="small muted">Open scanned page in library viewer ↗</span>
          </a>`).join("")}</div></div>` : ""}
      ${nearbyNums.length ? `<div class="reveal" style="margin-top:1.25rem">
        <h3>Other documented numbers on ${esc(nice(street))} (1946–1950)</h3>
        <div class="house-nums">${nearbyNums.map(n => `<a class="hnum" href="house.html?q=${encodeURIComponent(n + " " + nice(street))}">${esc(n)}</a>`).join("")}</div>
      </div>` : ""}
    </div>`;
    el.hidden = false;
    MW.observeReveals(el);
  }

  MW.Archive = {
    async show(hit, q, el) {
      el.hidden = true; el.innerHTML = "";
      let index; try { index = await getJSON(ROOT + "data/street_index.json"); } catch (e) { return; }
      const m = (q || "").match(/^\s*(\d+[A-Za-z]?)\s+([^,]+)/);
      const num = String(hit.number || (m && m[1]) || "").replace(/[^0-9]/g, "");
      const road = hit.road || (m && m[2]) || (!m && (q || "").replace(/,.*$/, "").trim());
      const key = matchStreet(index, road);
      if (!key) return;
      let sd; try { sd = await getJSON(ROOT + "data/streets/" + key + ".json"); } catch (e) { return; }
      if (!num) {
        const nums = Object.keys(sd.houses || {}).sort((a, b) => parseInt(a, 10) - parseInt(b, 10) || a.localeCompare(b));
        const stName = nice(sd.name);
        el.innerHTML = `<div class="wrap"><div class="arch-head reveal">
          <div class="eyebrow">From the Library of the Chathams archive</div>
          <h2>${esc(stName)}</h2>
          <p class="lede">${nums.length
            ? `Select a house number on <b>${esc(stName)}</b> to see its 1946–1950 <em>Chatham Courier</em> mentions, Sanborn fire-insurance sheets and neighborhood history.`
            : `<b>${esc(stName)}</b> is in The Chathams street directory. Enter a house number above to view its full spot-by-spot story, historic maps and nearby landmarks.`}</p>
          ${nums.length ? `<div class="house-nums">${nums.map(n => `<a class="hnum" href="house.html?q=${encodeURIComponent(n + " " + stName)}">${esc(n)}</a>`).join("")}</div>` : ""}
        </div></div>`;
        el.hidden = false;
        MW.observeReveals(el);
        return;
      }
      const house = sd.houses[num];
      render(el, `${num} ${nice(sd.name)}`, sd.name, num, house, sd);
    }
  };
})();
