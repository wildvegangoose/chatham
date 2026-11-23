/* Sanborn fire-insurance maps: find the sheet(s) that show an address in Chatham (1901, 1909, 1921), and render them.
   Data: js/sanborn-data.js (Library of Congress / Wikimedia Commons, public domain). */
(function () {
  const MW = window.MW;
  const SUF = { RD: "ROAD", AV: "AVENUE", AVE: "AVENUE", ST: "STREET", PL: "PLACE", TER: "TERRACE", DR: "DRIVE", CT: "COURT", LN: "LANE", PLZ: "PLAZA", BLVD: "BOULEVARD" };
  const DIR = { N: "NORTH", S: "SOUTH", E: "EAST", W: "WEST" };
  const ALIAS = { "CENTRE STREET": "CENTER STREET", "BOWER LANE": "BOWERS LANE", "DELWOOD AVENUE": "DELLWOOD AVENUE", "ELMWOOD ROAD": "ELMWOOD AVENUE" };
  const norm = r => {
    if (!r) return "";
    const w = r.toUpperCase().replace(/[^A-Z0-9 ]/g, " ").split(/\s+/).filter(Boolean).map((x, i, a) => (i === a.length - 1 && SUF[x]) || (i === 0 && a.length > 2 && DIR[x]) || x);
    const s = w.join(" ");
    return ALIAS[s] || s;
  };
  const bare = s => s.replace(/\s+(ROAD|AVENUE|STREET|PLACE|TERRACE|DRIVE|COURT|LANE|WAY|PLAZA|BOULEVARD)$/, "");

  const BORO_MAX = { "RIVER ROAD": 180, "FAIRMOUNT AVENUE": 220, "LAFAYETTE AVENUE": 210, "WATCHUNG AVENUE": 260 };

  MW.sanbornFor = function (number, road, opts = {}) {
    if (!MW.sanborn || !road || opts.inBoro === false || /chatham township|green village/i.test(road)) return [];
    const st = norm(road), n = parseInt(number, 10);
    if (n && BORO_MAX[st] && n > BORO_MAX[st]) return [];
    return ["1901", "1909", "1921"].map(y => {
      const v = MW.sanborn[y];
      if (!v) return null;
      let rows = v.rows.filter(r => r[0] === st);
      if (!rows.length && bare(st) === st) rows = v.rows.filter(r => bare(r[0]) === st);
      if (!rows.length) return null;
      let hit = n ? rows.filter(r => r[1] != null && n >= r[1] && n <= r[2]) : [];
      if (hit.length > 1) { const same = hit.filter(r => r[1] % 2 === n % 2); if (same.length) hit = same; }
      const exact = hit.length > 0;
      const use = exact ? hit : rows;
      const sheets = [...new Set(use.flatMap(r => r[3]))].filter(s => v.sheets[String(s)]);
      if (!sheets.length) return null;
      return { year: y, label: v.label, note: v.note, sheets, exact, range: exact && hit[0][1] != null ? `${hit[0][1]}–${hit[0][2]}` : "", street: rows[0][0] };
    }).filter(Boolean);
  };

  const nice = s => s.toLowerCase().replace(/\b\w/g, c => c.toUpperCase());
  const esc = s => MW.esc(s);

  MW.sanbornHTML = function (number, road, opts = {}) {
    const hits = MW.sanbornFor(number, road, opts);
    if (!hits.length) return "";
    const cards = hits.flatMap(h => {
      const v = MW.sanborn[h.year];
      return h.sheets.slice(0, h.exact ? 2 : 2).map(s => {
        const [thumb, pageUrl] = v.sheets[String(s)];
        return `<figure class="sb-card">
          <a href="${pageUrl}" target="_blank" rel="noopener"><img src="${thumb}" alt="Chatham Sanborn map ${h.year}, sheet ${s}" loading="lazy"></a>
          <figcaption><b>${esc(h.label)}</b> · sheet ${s}${h.exact ? ` · covers ${h.range} ${esc(nice(h.street))}` : ` · sheet for ${esc(nice(h.street))}`}
            <a href="${pageUrl}" target="_blank" rel="noopener">Open full-resolution sheet (Wikimedia Commons / LoC) ↗</a></figcaption></figure>`;
      });
    }).join("");
    const exact = hits.some(h => h.exact);
    return `<div class="eyebrow">Fire-insurance maps</div><h2>${opts.title || "This street on the Chatham Sanborn maps (1901–1921)"}</h2>
      <p class="muted">Sanborn maps were drawn for fire insurers and show every building in Chatham Borough: yellow for wood frame, pink for brick, blue for stone, and green-tinted glass roofs for Chatham's famous rose greenhouses. ${exact ? "The 1921 index matched this address range directly; the 1901 and 1909 surveys used arbitrary Sanborn numbers before Borough renumbering." : "These are the sheets covering this street (rural Chatham Township roads lay outside the Borough fire-hydrant survey district)."}</p>
      <div class="sb-grid">${cards}</div>
      <p class="small muted">${MW.sanbornCredit || "Sanborn Map Company"}. Library of Congress Geography and Map Division / Wikimedia Commons (public domain).</p>`;
  };
})();
