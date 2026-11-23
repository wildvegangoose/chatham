/* Home page: Time Machine wiring for Chatham Through Time */
document.addEventListener("DOMContentLoaded", () => {
  const MW = window.MW;
  const $ = s => document.querySelector(s);
  const params = new URLSearchParams(location.search);
  const startYear = +params.get("year") || 1914;

  const scene = MW.Scene($("#scene"));
  MW.leaves($("#hero"), 16);
  const sc = $("#scene");
  if (sc.scrollWidth > sc.clientWidth) sc.scrollLeft = 0;
  sc.addEventListener("scroll", () => { const h = $("#swipeHint"); if (h) h.remove(); }, { once: true });

  // population sparkline (combined Borough + Township from 1900 onward, Borough + present-day area from 1880)
  const spark = $("#spark");
  const pts = MW.census.map(([y, p]) => [(y - 1880) / (2024 - 1880) * 300, 66 - p / 23000 * 60]);
  spark.innerHTML = `<path d="M${pts.map(p => p.map(n => n.toFixed(1)).join(" ")).join(" L")}" fill="none" stroke="#b8381e" stroke-width="2.5" vector-effect="non-scaling-stroke"/>
    <path d="M0 70 L${pts.map(p => p.map(n => n.toFixed(1)).join(" ")).join(" L")} L300 70Z" fill="rgba(184,56,30,.12)"/>
    <line id="sparkNow" x1="0" x2="0" y1="0" y2="70" stroke="#1f3a2e" stroke-width="2" vector-effect="non-scaling-stroke" stroke-dasharray="3 3"/>`;

  let lastEra = null;
  function update(y, boot) {
    scene.setYear(y);
    if (!boot) history.replaceState(null, "", "?year=" + y);
    const era = MW.eraFor(y);
    $("#statYear").textContent = y;
    const pop = MW.populationFor(y);
    if (pop.value) {
      MW.countTo($("#statPop"), pop.value, 500);
      $("#statPop").classList.remove("small-v");
      $("#statPopNote").textContent = pop.note || (MW.census.some(c => c[0] === y) ? "U.S. Census (Borough + Township)" : "Estimated (Borough + Township)");
    } else {
      $("#statPop").textContent = pop.label;
      $("#statPop").dataset.v = 0;
      $("#statPop").classList.add("small-v");
      $("#statPopNote").textContent = pop.note || "Before separate Borough/Township counts";
    }
    const x = Math.max(0, Math.min(300, (y - 1880) / (2024 - 1880) * 300));
    const now = $("#sparkNow"); now.setAttribute("x1", x); now.setAttribute("x2", x); now.style.opacity = y < 1880 ? 0 : 1;
    MW.countTo($("#statStanding"), MW.localPlaces().filter(p => p.year <= y && (!p.end || p.end >= y)).length, 400);
    const nm = MW.nameFor(y);
    $("#statName").textContent = nm.name;
    $("#statNameSub").textContent = nm.sub;

    if (era !== lastEra) {
      lastEra = era;
      const box = $(".era-story");
      box.classList.remove("swap"); void box.offsetWidth; box.classList.add("swap");
      $("#eraRange").textContent = `${era.from < 1600 ? "Before 1680" : era.from + "–" + (era.id === "today" ? "today" : era.to)}`;
      $("#eraName").textContent = era.name;
      $("#eraTag").textContent = era.tagline;
      $("#eraBody").innerHTML = era.story.map(p => `<p>${MW.esc(p)}</p>`).join("");
      $("#eraSources").innerHTML = "Sources: " + MW.sourceLinks(era.sources);
      const ms = MW.localPlaces().filter(p => p.year >= Math.max(era.from, 1500) && p.year <= era.to);
      $("#moments").innerHTML = ms.map((p, i) => `<button class="moment reveal" style="transition-delay:${i * 40}ms" data-y="${p.year}" data-id="${p.id}">
          <span class="m-year">${p.year < 1600 ? "Pre-1680" : p.year}</span><span class="tag ${p.kind}">${MW.kindLabel[p.kind]}</span>
          <strong>${MW.esc(p.title)}</strong><span class="small muted">${MW.esc(p.address)}</span></button>`).join("") || `<p class="muted">No dated places in this era yet.</p>`;
      MW.observeReveals($("#moments"));
    }
    document.querySelectorAll(".moment").forEach(m => m.classList.toggle("now", +m.dataset.y === y));
  }

  const slider = MW.timeSlider($("#slider"), {
    min: 1600, max: 2026, value: startYear,
    ticks: [1680, 1773, 1806, 1837, 1897, 1960, 2026],
    onChange: update
  });
  update(startYear, true);

  $("#moments").addEventListener("click", e => {
    const b = e.target.closest(".moment"); if (!b) return;
    slider.set(+b.dataset.y);
    const p = MW.places.find(p => p.id === b.dataset.id);
    const r = b.getBoundingClientRect();
    MW.popover(MW.placeCard(p), r.left + r.width / 2, r.bottom);
    e.stopPropagation();
  });

  $("#labelsBtn").onclick = e => {
    const on = $("#scene").classList.toggle("show-labels");
    e.currentTarget.setAttribute("aria-pressed", on);
    e.currentTarget.textContent = on ? "Hide labels" : "Show labels";
  };

  document.addEventListener("keydown", e => {
    if (e.target.matches("input, textarea")) return;
    if (e.key === "ArrowRight") slider.set(slider.get() + (e.shiftKey ? 10 : 1));
    if (e.key === "ArrowLeft") slider.set(slider.get() - (e.shiftKey ? 10 : 1));
  });

  const art = {
    map: `<svg viewBox="0 0 120 80"><path d="M10 14 L40 6 L80 16 L110 8 V66 L80 74 L40 64 L10 72Z" fill="#f6efdf" stroke="#e3a33a" stroke-width="3"/><path d="M40 6V64M80 16V74" stroke="#e3a33a" stroke-width="2" stroke-dasharray="4 4"/><path d="M20 50 Q50 20 96 40" stroke="#b8381e" stroke-width="3" fill="none" stroke-dasharray="6 5"/><circle cx="60" cy="32" r="8" fill="#b8381e"/><circle cx="60" cy="32" r="3" fill="#fff"/></svg>`,
    house: `<svg viewBox="0 0 120 80"><path d="M24 74 V38 L60 12 L96 38 V74Z" fill="#f6efdf" stroke="#e3a33a" stroke-width="3"/><rect x="52" y="50" width="16" height="24" fill="#b8381e"/><rect x="34" y="44" width="12" height="12" fill="#e3a33a"/><rect x="74" y="44" width="12" height="12" fill="#e3a33a"/><path d="M76 20 V8 h8 v18" fill="#e3a33a"/></svg>`,
    time: `<svg viewBox="0 0 120 80"><circle cx="60" cy="40" r="32" fill="#f6efdf" stroke="#e3a33a" stroke-width="3"/><path d="M60 18 V40 L76 50" stroke="#b8381e" stroke-width="4" stroke-linecap="round" fill="none"/>${Array.from({ length: 12 }, (_, i) => `<circle cx="${60 + Math.cos(i * Math.PI / 6) * 26}" cy="${40 + Math.sin(i * Math.PI / 6) * 26}" r="1.8" fill="#1f3a2e"/>`).join("")}</svg>`
  };
  document.querySelectorAll("[data-art]").forEach(d => d.innerHTML = art[d.dataset.art]);

  const facts = [
    ["1779", "\"The Rebel Printer\" on Main Street", "At General Knox and Washington's urging, Lt. Shepard Kollock set up a printing press at Day's Tavern and launched The New-Jersey Journal on February 16, 1779—New Jersey's second newspaper.", 1779, ["chsTour", "vanderpoel"]],
    ["3,000", "The Yorktown bread-oven hoax", "In August 1781 Washington built a 65-foot shed of brick ovens by the Passaic River baking 3,000 loaves a day to convince British spies an attack on New York was imminent—then slipped south to win at Yorktown.", 1781, ["exploreChatham", "chsTour"]],
    ["1906", "The world's first speed bumps", "In April 1906 Chatham Borough raised cobblestone crosswalks five inches above Main Street to launch speeding 40-mph motorcars into the air. The New York Times noted: \"Chatham was the first place to put it in practice.\"", 1906, ["wikiBoro", "speedBump"]],
    ["11+ Acres", "Glass roofs of the Rose Capital", "By 1909 steam-heated greenhouses run by the Lum, Coddington, Falconer, Littlejohn, Moore, Wagner and Ruzicka families blanketed Chatham; Heyl Roses in Green Village bloomed until 1999.", 1909, ["sanborn1909", "wikiTwp"]],
    ["World Champs", "Madame Bey's River Road ring", "From 1923 Turkish-Armenian opera singer Hranoush \"Madame\" Bey ran boxing's premier country training camp at 516 River Road, hosting Gene Tunney, Max Schmeling, Primo Carnera, James J. Braddock, Sugar Ray Robinson and Floyd Patterson.", 1934, ["summitBey", "wikiTwp"]],
    ["1960", "Stopping the Great Swamp jetport", "When the Port Authority moved in 1959 to bulldoze 10,000 acres for a super-jetport, local citizens bought over 3,000 acres and donated them to create Great Swamp National Wildlife Refuge—site of the Interior Department's first Wilderness Area in 1968.", 1960, ["greatSwamp"]]
  ];
  $("#facts").innerHTML = facts.map(([big, h, t, y, s], i) => `<article class="fact card reveal d${i % 3}" data-y="${y}">
    <div class="fact-big">${big}</div><h3>${h}</h3><p>${t}</p><div class="sources">${MW.sourceLinks(s)}</div><button class="go linkish">See it in ${y} →</button></article>`).join("");
  $("#facts").addEventListener("click", e => {
    const a = e.target.closest(".fact"); if (!a || e.target.closest(".sources a")) return;
    slider.set(+a.dataset.y); $("#hero").scrollIntoView({ behavior: "smooth" });
  });
  MW.observeReveals();
});
