/* Your House's Story: geocode an address in Chatham Borough or Chatham Township and narrate that spot through time */
document.addEventListener("DOMContentLoaded", () => {
  const MW = window.MW, L = window.L, K = MW.SceneKit;
  const $ = s => document.querySelector(s);
  const G = MW.geo;
  const params = new URLSearchParams(location.search);
  const stations = [
    { name: "Chatham station", at: [40.74017, -74.38506] },
    { name: "Madison station", at: [40.75714, -74.41505] },
    { name: "Murray Hill station", at: [40.69530, -74.40360] }
  ];
  const BBOX = "-74.4580,40.7740,-74.3620,40.6860";

  MW.leaves($(".house-hero"), 10);

  const form = $("#houseForm");
  if (params.get("q")) form.q.value = params.get("q");
  if (params.get("built")) form.built.value = params.get("built");
  document.querySelectorAll(".try button").forEach(b => b.onclick = () => {
    form.q.value = b.dataset.q; form.built.value = b.dataset.b || ""; form.requestSubmit();
  });
  form.addEventListener("submit", e => {
    e.preventDefault();
    const q = form.q.value.trim(), built = +form.built.value || null;
    if (!q) return;
    const u = new URLSearchParams({ q }); if (built) u.set("built", built);
    history.replaceState(null, "", "?" + u);
    locate(q, built);
  });

  function status(html, kind = "") { $("#status").innerHTML = html ? `<div class="status-box ${kind}">${html}</div>` : ""; }
  const inside = (lat, lon) => G.inTown([lat, lon]);

  async function locate(q, built, preset) {
    status(`<span class="spinner"></span> Searching historic maps of The Chathams for <b>${MW.esc(q)}</b>…`);
    let hit = preset;
    if (!hit) {
      const query = /chatham|green village/i.test(q) ? q : q + MW.town.geocodeSuffix;
      try {
        const r = await fetch(`https://nominatim.openstreetmap.org/search?format=jsonv2&addressdetails=1&limit=1&countrycodes=us&viewbox=${BBOX}&bounded=1&q=${encodeURIComponent(query)}`, { headers: { "Accept": "application/json" } });
        const d = await r.json();
        if (d && d[0]) {
          hit = { lat: +d[0].lat, lon: +d[0].lon, label: d[0].display_name.split(",").slice(0, 2).join(",").trim(), precise: !!(d[0].address && d[0].address.house_number) || !/^\s*\d/.test(q) };
          if (!hit.precise && d[0].address && d[0].address.road) hit.label = d[0].address.road;
          if (d[0].address) { hit.road = d[0].address.road; hit.number = d[0].address.house_number; }
        }
      } catch (err) { /* fallback to Photon */ }
      if (!hit) {
        try {
          const r = await fetch(`https://photon.komoot.io/api/?limit=1&bbox=-74.4580,40.6860,-74.3620,40.7740&q=${encodeURIComponent(query)}`);
          const f = ((await r.json()).features || [])[0];
          if (f) {
            const pr = f.properties, [lon, lat] = f.geometry.coordinates;
            const road = pr.street || (pr.type === "street" ? pr.name : null);
            hit = { lat, lon, road, number: pr.housenumber, label: pr.housenumber ? `${pr.housenumber} ${road}` : road || pr.name,
              precise: !!pr.housenumber || !/^\s*\d/.test(q) };
          }
        } catch (err) { /* network */ }
      }
    }
    if (!hit) {
      status(`We couldn't find <b>${MW.esc(q)}</b> in Chatham Borough or Chatham Township. Check the spelling, try just the street name, or <button class="linkish" id="pickMap">pick the spot on a map</button>.`, "warn");
      $("#pickMap").onclick = () => pickOnMap(built);
      return;
    }
    if (!inside(hit.lat, hit.lon)) {
      status(`<b>${MW.esc(hit.label || q)}</b> falls outside Chatham Borough and Chatham Township. <button class="linkish" id="pickMap">Pick a spot inside The Chathams on a map</button>.`, "warn");
      $("#pickMap").onclick = () => pickOnMap(built);
      $("#story").hidden = true;
      return;
    }
    status(hit.precise === false ? `We found the street but not the exact house number, so the story uses a point on <b>${MW.esc(hit.label)}</b>.` : "");
    tell(hit, q, built);
  }

  function pickOnMap(built) {
    $("#story").hidden = false;
    $("#chapters").innerHTML = ""; $("#neighbors").innerHTML = ""; $("#researchBox").innerHTML = ""; $("#landmarkBanner").innerHTML = "";
    $("#storyTitle").textContent = "Click your spot on the map";
    $("#sectionName").textContent = "Choose a location"; $("#glance").innerHTML = "";
    const m = ensureMap(MW.town.center, 13);
    const pick = e => {
      if (!inside(e.latlng.lat, e.latlng.lng)) { status("That spot is outside Chatham Borough & Chatham Township. Click inside the red dashed line.", "warn"); m.once("click", pick); return; }
      status(""); tell({ lat: e.latlng.lat, lon: e.latlng.lng, label: "Your chosen spot", precise: true }, "Your chosen spot", built);
    };
    m.once("click", pick);
    status("Click anywhere inside Chatham Borough or Chatham Township (the dashed outline) on the map below.");
    $("#miniMap").scrollIntoView({ behavior: "smooth", block: "center" });
  }

  let mini, miniLayer;
  function ensureMap(center, z) {
    if (!L) return null;
    if (!mini) {
      mini = L.map("miniMap", { zoomControl: true, scrollWheelZoom: false }).setView(center, z);
      L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", { attribution: "&copy; OpenStreetMap contributors", maxZoom: 19 }).addTo(mini);
      if (window.MW_BOUNDARY) L.polygon(MW_BOUNDARY.coordinates[0].map(([a, b]) => [b, a]), { color: "#b8381e", weight: 2, dashArray: "6 5", fill: false, interactive: false }).addTo(mini);
      if (window.MW_BOROUGH_BOUNDARY) L.polygon(MW_BOROUGH_BOUNDARY.coordinates[0].map(([a, b]) => [b, a]), { color: "#2f4f5a", weight: 2, dashArray: "2 5", fill: false, interactive: false }).addTo(mini);
    } else mini.setView(center, z);
    setTimeout(() => mini.invalidateSize(), 50);
    return mini;
  }

  function tell(hit, q, built) {
    const here = [hit.lat, hit.lon];
    const inBoro = window.MW_BOROUGH_BOUNDARY ? G.inPolygon(here, window.MW_BOROUGH_BOUNDARY) : false;
    const muniName = inBoro ? "Chatham Borough" : "Chatham Township";
    const sec = MW.sections.map(s => ({ s, d: G.distM(here, [s.lat, s.lon]) })).sort((a, b) => a.d - b.d)[0].s;
    const roads = MW.oldRoads.map(r => ({ r, d: G.distToLineM(here, r.pts) })).sort((a, b) => a.d - b.d);
    const near = MW.localPlaces().filter(p => !["naming1773", "township1806", "village1892", "borough1897", "speedbumps1906", "schoolmerge1986"].includes(p.id)).map(p => ({ p, d: G.distM(here, [p.lat, p.lon]) })).sort((a, b) => a.d - b.d);
    const landmark = near.find(n => n.p.landmark && n.d < 65);
    const colonialNear = near.filter(n => n.p.kind === "house" && n.p.year < 1810 && n.d > 55)[0];
    const st = stations.map(x => ({ x, d: G.distM(here, x.at) })).sort((a, b) => a.d - b.d)[0];
    const dStation = st.d;
    const kollock = MW.places.find(p => p.id === "kollock"), dBridge = kollock ? G.distM(here, [kollock.lat, kollock.lon]) : 0;
    const title = hit.label && hit.label !== "Your chosen spot" ? q.replace(/,?\s*(chatham(\s+(borough|township))?|green village)(\s*,?\s*nj)?.*$/i, "") : "Your chosen spot";
    const prettyTitle = title.replace(/\b\w/g, c => c.toUpperCase());
    if (title !== "Your chosen spot") document.title = `${prettyTitle} — ${muniName}, NJ House History · ${MW.town.siteTitle}`;
    const style = built ? MW.styleFor(built) : null;

    $("#story").hidden = false;
    $("#sectionName").textContent = `${sec.name} · ${muniName}`;
    $("#storyTitle").textContent = prettyTitle;
    $("#glance").innerHTML = [
      ["Municipality", inBoro ? "Chatham Borough (1897)" : "Chatham Township (1806)"],
      ["Old road", `${roads[0].r.name.split(" (")[0]}, ${G.fmt(roads[0].d)} away`],
      ["Nearest train", `${G.walkMin(dStation)} min walk to ${st.x.name}`],
      built ? ["Built", `${built} · ${style.name} era`] : ["Built", `<button class="linkish" id="addYear">Add a year →</button>`]
    ].map(([k, v]) => `<div class="g"><span>${k}</span><b>${v}</b></div>`).join("");
    const addYear = $("#addYear"); if (addYear) addYear.onclick = () => { form.built.focus(); scrollTo({ top: 0, behavior: "smooth" }); };

    $("#landmarkBanner").innerHTML = landmark ? `<div class="landmark-banner reveal"><div class="lb-badge">★ Documented landmark</div><div>${MW.placeCard(landmark.p)}</div></div>` : "";
    const qm = (q || "").match(/^\s*(\d+)\s+([^,]+)/);
    const stories = MW.storiesFor ? MW.storiesFor(hit.number || (qm && qm[1]), hit.road || (qm && qm[2])) : [];
    if (stories.length) $("#landmarkBanner").insertAdjacentHTML("beforeend", `<div class="web-stories reveal"><div class="eyebrow">Stories about this address</div>
      <div class="ws-grid">${stories.map(st => `<a class="ws card" href="${st.url}" target="_blank" rel="noopener"><span class="tag event">${MW.esc(st.tag)}</span><h3>${MW.esc(st.title)}</h3><p>${MW.esc(st.summary)}</p>${st.evidence ? `<p class="ws-ev">📒 ${MW.esc(st.evidence)}</p>` : ""}<span class="small muted">${MW.esc(st.source)} ↗</span></a>`).join("")}</div></div>`);

    const hp = MW.housePhotosFor ? MW.housePhotosFor(hit.number || (qm && qm[1]), hit.road || (qm && qm[2])) : [];
    if (hp.length) $("#landmarkBanner").insertAdjacentHTML("beforeend", `<div class="web-stories reveal"><div class="eyebrow">Historic photographs of this building</div>
      <div class="sb-grid">${hp.map(p => `<figure class="sb-card"><a href="${p.link}" target="_blank" rel="noopener"><img src="${p.src}" alt="${MW.esc(p.caption)}" loading="lazy"></a>
        <figcaption><b>${p.year}</b> · ${MW.esc(p.caption)}<span class="small muted" style="display:block">${MW.esc(p.credit)} · ${MW.esc(p.license)}</span></figcaption></figure>`).join("")}</div></div>`);

    const sbHTML = MW.sanbornHTML ? MW.sanbornHTML(hit.number || (qm && qm[1]), hit.road || (qm && qm[2]), { inBoro }) : "";
    $("#sanborn").innerHTML = sbHTML; $("#sanborn").hidden = !sbHTML;

    const m = ensureMap(here, 16);
    if (m) {
      if (miniLayer) miniLayer.remove();
      miniLayer = L.layerGroup().addTo(m);
      L.circleMarker(here, { radius: 11, color: "#fff", weight: 3, fillColor: "#b8381e", fillOpacity: 1 }).addTo(miniLayer).bindTooltip("You are here", { permanent: true, direction: "top", offset: [0, -10], className: "here-tip" });
      near.slice(0, 6).forEach(n => L.circleMarker([n.p.lat, n.p.lon], { radius: 6, color: "#1f3a2e", weight: 2, fillColor: "#e3a33a", fillOpacity: 1 }).addTo(miniLayer).bindTooltip(`${n.p.title} (${n.p.year < 1600 ? "pre-1680" : n.p.year})`));
      L.polyline(roads[0].r.pts, { color: "#e3a33a", weight: 6, opacity: .7, dashArray: "1 10", lineCap: "round" }).addTo(miniLayer);
    }

    const yb = built;
    const chapters = [
      { y: 1600, k: "Before 1680", h: "Fishawack and the Minisink Trail",
        t: `Long before colonial deeds, Minsi Lenape travelers crossed the shallow Passaic River ford they called <em>Fishawack</em> along the Minisink Trail through Hobart Gap, moving seasonally between upland hunting grounds and the Jersey Shore. This spot lies ${G.fmt(G.distToLineM(here, MW.oldRoads[0].pts))} from that ancient path (today's Main Street) and ${G.fmt(dBridge)} from the Passaic River crossing.`, s: ["chsTour", "vanderpoel"] },
      { y: 1779, k: "1710–1783", h: "Day's Bridge & Sentinel of the Revolution",
        t: `Settled around 1710–1720 at John Day's Bridge and named <b>Chatham</b> in November 1773 for William Pitt, 1st Earl of Chatham, this ridge guarded the Watchung passes protecting Washington's Morristown winter headquarters. ${sec.colonial}${colonialNear ? ` The closest early surviving homestead on our map is <b>${MW.esc(colonialNear.p.title)}</b> (${colonialNear.p.year}) at ${MW.esc(colonialNear.p.address)}, ${G.fmt(colonialNear.d)} away.` : ""}`, s: sec.sources },
      { y: 1875, k: "1806–1899", h: "Turnpike, railroad & municipal split",
        t: `The 1801 Morris Turnpike and the September 1837 arrival of the Morris &amp; Essex Railroad linked Chatham directly to Newark and Hoboken. Today the nearest station is <b>${st.x.name}</b>, about a ${G.walkMin(dStation)}-minute walk (${G.fmt(dStation)}). From February 12, 1806 this spot belonged to Chatham Township (which originally encompassed Madison and Florham Park as well). ${inBoro ? "It lies <b>inside Chatham Borough</b>, which seceded to form Chatham Village in August 1892 (after villagers protested paying 40% of township taxes for 7% of services) and incorporated as an independent borough on March 1, 1897." : "It lies in <b>Chatham Township</b>, remaining part of the rural township of farms, nurseries and ridges after Madison (1889), Chatham Borough (1897) and Florham Park (1899) separated."}`, s: ["snyder", "stationWiki", "wikiTwp"] },
      { y: 1924, k: "1880–1960", h: "Rose greenhouses, the 1914 viaduct & suburbia",
        t: `${sec.growth} Between 1900 and 1960 the combined population of The Chathams grew more than sevenfold, from 1,981 residents to 15,448.`, s: sec.sources.concat(["wikiBoro", "wikiTwp"]) }
    ];
    if (yb) {
      const pop = MW.populationFor(yb), era = MW.eraFor(yb), nm = MW.nameFor(yb);
      const around = MW.localPlaces().filter(p => Math.abs(p.year - yb) <= 4 && p.year > 1600).slice(0, 4);
      const reported = landmark && landmark.p.year && Math.abs(landmark.p.year - yb) > 5 ? ` (The documented date for ${landmark.p.title} is ${landmark.p.year}.)` : "";
      chapters.push({ y: Math.max(yb, 1700), k: String(yb), h: `The year your house went up`,
        t: `In ${yb} this area was known as <b>${MW.esc(nm.name)}</b> (${MW.esc(nm.sub)}), in the era of <b>${era.name.toLowerCase()}</b>. ${pop.value ? `About ${pop.value.toLocaleString()} people lived across The Chathams.` : `The area held ${pop.label}.`} Houses built here around ${yb} were characteristically <b>${style.name}</b>: ${style.desc}${reported}` +
          (around.length ? `<ul class="around">${around.map(p => `<li><b>${p.year}</b>: ${MW.esc(p.title)}</li>`).join("")}</ul>` : ""), s: era.sources.slice(0, 3) });
    } else {
      chapters.push({ y: 1926, k: "Your house", h: "When was it built?",
        t: `Chatham Borough's walkable neighborhoods largely date from the 1880s through the 1930s, while Chatham Township's rolling farm and nursery tracts blossomed into residential subdivisions from the late 1940s through the 1970s. <button class="linkish" id="addYear2">Add your house's year</button> and we'll match it to Chatham's population, name and architectural style that year.`, s: ["wikiBoro", "wikiTwp"] });
    }
    chapters.push({ y: 2026, k: "Today", h: "Two municipalities, one Chatham community",
      t: `Today about 21,000 people live in Chatham Borough and Chatham Township, sharing the Library of the Chathams (joint since 1974), the Emergency Squad (since 1936), and the regional School District of the Chathams (voted in November 1986). ${near[0] ? `The nearest historic place on our map is <b>${MW.esc(near[0].p.title)}</b>, ${G.fmt(near[0].d)} away.` : ""}`, s: ["wikiBoro", "wikiTwp"] });

    $("#chapters").innerHTML = chapters.map((c, i) => `<article class="chapter" data-y="${c.y}" data-i="${i}">
      <div class="ch-k">${c.k}</div><h3>${MW.esc(c.h)}</h3><p>${c.t}</p><div class="sources">Sources: ${MW.sourceLinks(c.s)}</div></article>`).join("");
    const add2 = $("#addYear2"); if (add2) add2.onclick = () => { form.built.focus(); scrollTo({ top: 0, behavior: "smooth" }); };

    drawArt(built, sec);
    const io = new IntersectionObserver(es => es.forEach(e => {
      if (e.isIntersecting) { document.querySelectorAll(".chapter").forEach(c => c.classList.toggle("active", c === e.target)); setArt(+e.target.dataset.y); }
    }), { rootMargin: "-45% 0px -45% 0px" });
    document.querySelectorAll(".chapter").forEach(c => io.observe(c));
    setArt(chapters[0].y);

    $("#neighbors").innerHTML = near.slice(0, 6).map((n, i) => `<a class="card nb reveal d${i % 3}" href="explore.html?place=${n.p.id}&year=${Math.max(n.p.year, 1900)}">
      <div class="nb-dist">${G.fmt(n.d)} · ${G.walkMin(n.d)} min walk</div><span class="tag ${n.p.kind}">${MW.kindLabel[n.p.kind]} · ${n.p.year < 1600 ? "pre-1680" : n.p.year}</span>
      <h3>${MW.esc(n.p.title)}</h3><p class="small muted">${MW.esc(n.p.text.slice(0, 150))}…</p><span class="go">See on the map →</span></a>`).join("");

    const y = built;
    const steps = [
      [true, "The Fishawack Papers (Library of the Chathams)", "All 14 bound volumes (~5,100 pages) and A–Z master indexes compiled by Chatham's local historians are searchable free online at chathamlibrary.org/fishawack-papers/ and in the Library's New Jersey Room at 214 Main Street."],
      [inBoro, "Sanborn maps (1901, 1909, 1921)", `Compare the building footprint, porch line and outbuildings across Chatham Borough's three Sanborn surveys shown above. Remember that the 1901 and 1909 maps used arbitrary numbers before Borough street renumbering.`],
      [true, "Morris County property-owner atlases (1853, 1868, 1887, 1910)", `Lightfoot & Geil's 1853 wall map, F. W. Beers's 1868 Atlas, Robinson's 1887 Atlas and A. H. Mueller's 1910 Atlas print actual landowner names on both Main Street village lots and Chatham Township farms.`],
      [true, "The Chatham Press (1897+) & Chatham Courier (1946+)", `Search The Chatham Courier (1946–present) online via the Library of the Chathams Digifind-IT portal, and consult early Chatham Press microfilm and print city directories in the New Jersey Room.`],
      [true, "Historical Societies & Morris County Deeds", `${inBoro ? "The Chatham Historical Society and Historic Preservation Commission maintain house files on Borough properties" : "The Chatham Township Historical Society at the Red Brick Schoolhouse Museum (24 Southern Blvd) holds Township farm, Green Village and subdivision records"}, and the Morris County Clerk in Morristown holds deeds back to 1785.`]
    ].filter(s => s[0]);
    $("#researchBox").innerHTML = `<div class="eyebrow">Make it real</div><h2>Trace your house's documented chain of owners</h2>
      <p class="muted">This page tells the story of the <em>ground</em> around your address. To research the <em>building</em> and its past families, start with the Library of the Chathams and local historical societies. ${y ? `For a ${y} house in ${muniName}:` : `For a property in ${muniName}:`}</p>
      <ol class="steps">${steps.map(([, h, t]) => `<li><b>${h}</b><span>${t}</span></li>`).join("")}</ol>
      <div class="sources">Sources: ${MW.sourceLinks(["libHist", "chsTour", "nrRedBrick"])}</div>
      <a class="btn" href="research.html">Full Chatham research guide →</a>`;

    MW.observeReveals();
    $("#story").scrollIntoView({ behavior: "smooth" });
    MW.Archive && $("#archive") && MW.Archive.show(hit, q, $("#archive"), { landmark: landmark && landmark.p });
  }

  // ---------- vignette: one lot through time ----------
  let art;
  function drawArt(built, sec) {
    const host = $("#art");
    const it = K.item;
    const styleId = built ? MW.styleFor(built).id : "colrev";
    const houseFrom = built || 1924;
    const draw = {
      colonial: () => K.B.farmhouse("#ece4d2", 108),
      federal: () => K.B.farmhouse("#f4efe2", 112),
      greekrev: () => K.B.colonialRev("#f5f2e8"),
      victorian: () => K.B.queenAnne("#8f8a72"),
      colrev: () => K.B.colonialRev(),
      tudor: () => K.B.tudor(),
      ranch: () => K.B.cape(),
      modern: () => K.B.cape("#d8d2c4")
    }[styleId] || (() => K.B.colonialRev());
    const G0 = 330;
    const woods = Array.from({ length: 12 }, (_, i) => it(20 + i * 52 + (i % 2) * 14, G0 - 40 + (i % 3) * 14, 1500, 1730, K.tree.oak(.8 + (i % 3) * .2, ["#3f6b3f", "#4c7a42", "#2f5440"][i % 3]))).join("");
    const fence = `<path d="M0 ${G0 + 4} H600" stroke="#7a5a3a" stroke-width="3"/><path d="M0 ${G0 - 10} H600" stroke="#7a5a3a" stroke-width="3"/>${Array.from({ length: 16 }, (_, i) => `<path d="M${i * 40 + 10} ${G0 + 8} v-26" stroke="#5a3d28" stroke-width="4"/>`).join("")}`;
    host.innerHTML = `<svg class="mw-scene vignette" viewBox="0 120 600 300" preserveAspectRatio="xMidYMax slice" role="img" aria-label="Illustration of this Chatham spot through time">
      <defs><linearGradient id="vsky" x1="0" y1="0" x2="0" y2="1"><stop id="v0" offset="0" stop-color="#f3d9a4"/><stop id="v1" offset="1" stop-color="#f6e8c8"/></linearGradient></defs>
      <rect y="0" width="600" height="420" fill="url(#vsky)"/>
      <circle cx="470" cy="190" r="34" fill="#fff1c4" opacity=".9"/>
      <path d="M0 250 Q140 205 290 228 T600 236 V420 H0Z" fill="#6f8f6a" opacity=".8"/>
      <g class="it" data-from="1730" data-to="1925"><g class="grow"><path d="M0 300 L60 262 H560 L600 300Z" fill="#d6bd6e"/>${Array.from({ length: 6 }, (_, k) => `<path d="M${70 + k * 8} ${270 + k * 5} H${540 - k * 6}" stroke="rgba(80,60,20,.2)" stroke-width="2"/>`).join("")}</g></g>
      ${it(115, 268, 1740, 1900, K.B.farmhouse("#ece4d2", 100), { s: .55 })}
      ${it(205, 270, 1750, 1905, K.B.barn(), { s: .5 })}
      ${it(390, 266, 1885, 1955, K.B.greenhouse ? K.B.greenhouse() : K.B.barn(), { s: .55 })}
      <g class="it veh" data-from="1837" data-to="1930"><g class="grow"><g class="mover train" style="animation-duration:16s"><g transform="translate(0,248) scale(.32)">${K.T.steam()}</g></g></g></g>
      <g class="it veh" data-from="1931" data-to="9999"><g class="grow"><g class="mover train" style="animation-duration:14s"><g transform="translate(0,248) scale(.32)">${K.T.njt()}</g></g></g></g>
      ${it(490, 262, 1870, 1940, K.B.queenAnne("#9a7d8a"), { s: .45 })}
      ${it(545, 264, 1905, 9999, K.B.foursquare("#c9a87a"), { s: .42 })}
      ${it(60, 262, 1922, 9999, K.B.tudor(), { s: .42 })}
      <rect y="${G0 - 4}" width="600" height="${420 - G0}" fill="#6f8f4a"/>
      ${woods}
      ${it(300, G0 + 2, 1500, 1690, K.B.wetu(), { s: .9 })}
      <g class="it" data-from="1500" data-to="1800"><g class="grow"><path d="M0 ${G0 + 50} Q200 ${G0 + 40} 300 ${G0 + 56} T600 ${G0 + 48}" stroke="#b59a6e" stroke-width="10" fill="none" stroke-dasharray="2 14" stroke-linecap="round"/></g></g>
      <g class="it" data-from="1730" data-to="1905"><g class="grow">${fence}</g></g>
      <g class="it" data-from="1801" data-to="9999"><g class="grow"><rect x="0" y="${G0 + 36}" width="600" height="34" fill="#b59a6e"/></g></g>
      <rect class="it-fade" data-from="1914" x="0" y="${G0 + 36}" width="600" height="34" fill="#5a5552"/>
      <path class="it-fade" data-from="1950" d="M0 ${G0 + 53} H600" stroke="#f3cf7a" stroke-width="2" stroke-dasharray="20 18"/>
      <path class="it-fade" data-from="1914" d="M0 ${G0 + 34} H600" stroke="#cfc6b6" stroke-width="5"/>
      ${it(300, G0 + 4, houseFrom, 9999, draw(), { s: 1.25 })}
      ${it(450, G0 + 8, houseFrom + 2, 9999, K.tree.maple(1.2, "#c8461f"), { grow: houseFrom + 2 })}
      ${it(140, G0 + 8, houseFrom + 5, 9999, K.tree.maple(1, "#e3a33a"), { grow: houseFrom + 5 })}
      <g class="it veh" data-from="1710" data-to="1860"><g class="grow"><g class="mover" style="animation-duration:26s;animation-delay:-6s"><g transform="translate(0,${G0 + 60}) scale(.8)">${K.V.oxcart()}</g></g></g></g>
      <g class="it veh" data-from="1861" data-to="1913"><g class="grow"><g class="mover" style="animation-duration:14s"><g transform="translate(0,${G0 + 60}) scale(.8)">${K.V.buggy()}</g></g></g></g>
      <g class="it veh" data-from="1914" data-to="1945"><g class="grow"><g class="mover rev" style="animation-duration:9s"><g transform="translate(0,${G0 + 60}) scale(-.8,.8)">${K.V.modelT()}</g></g></g></g>
      <g class="it veh" data-from="1946" data-to="1979"><g class="grow"><g class="mover" style="animation-duration:8s"><g transform="translate(0,${G0 + 60}) scale(.8)">${K.V.fifties()}</g></g></g></g>
      <g class="it veh" data-from="1980" data-to="9999"><g class="grow"><g class="mover rev" style="animation-duration:22s"><g transform="translate(0,${G0 + 60}) scale(-.8,.8)">${K.V.stroller()}</g></g></g></g>
    </svg><div class="vig-year" id="vigYear"></div>`;
    art = host.querySelector("svg");
  }
  const vskies = [[1600, "#f3d9a4", "#f6e8c8"], [1800, "#ecdcb4", "#f3e6c6"], [1900, "#d8d6c2", "#ece0c0"], [1950, "#a8cde0", "#eee6cc"], [2026, "#86bfe0", "#f2ead2"]];
  function setArt(y) {
    if (!art) return;
    art.querySelectorAll(".it").forEach(g => {
      const on = y >= +g.dataset.from && y <= +g.dataset.to;
      g.classList.toggle("off", !on);
      if (g.dataset.grow) g.firstChild.style.transform = on ? `scale(${Math.max(.3, Math.min(1, (y - +g.dataset.grow) / 45 + .3)).toFixed(2)})` : "";
    });
    art.querySelectorAll(".it-fade").forEach(el => el.style.opacity = y >= +el.dataset.from ? 1 : 0);
    const sk = vskies.find(s => y <= s[0]) || vskies[vskies.length - 1];
    art.querySelector("#v0").setAttribute("stop-color", sk[1]); art.querySelector("#v1").setAttribute("stop-color", sk[2]);
    art.style.filter = y < 1839 ? "sepia(.3) saturate(1.1)" : y < 1935 ? "sepia(.7) saturate(.6) contrast(1.05)" : y < 1975 ? "sepia(.1) saturate(1.25)" : "none";
    $("#vigYear").textContent = y <= 1600 ? "Before 1680" : y;
    $("#artCap").textContent = MW.eraFor(y).name;
  }

  // auto-run from URL
  if (params.get("lat") && params.get("lon")) {
    locate(params.get("q") || params.get("label") || "Selected place", +params.get("built") || null,
      { lat: +params.get("lat"), lon: +params.get("lon"), label: params.get("label") || params.get("q"), precise: true });
  } else if (params.get("q")) {
    locate(params.get("q"), +params.get("built") || null);
  }
});
