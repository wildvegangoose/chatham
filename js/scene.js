/* ==========================================================================
   The Time Machine scene: an illustrated SVG panorama of The Chathams
   (Chatham Township & Chatham Borough) that rebuilds itself for any year.
   West (Green Village, the Great Swamp, Red Brick Schoolhouse & Madame Bey's
   River Road hill) is on the left; Downtown Main Street, the glass rose
   greenhouses, Chatham Station and Borough Hall sit in the center; Colonial
   East Main Street, Kollock's 1779 press, the 1781 brick bake ovens, Parrott's
   mill and Day's Bridge over the Passaic River (below Hobart Gap) are on the right.
   ========================================================================== */
(function () {
  const MW = window.MW;
  const W = 1600, H = 640, GROUND = 548, BACK = 468;

  /* ---------- tiny drawing kit ---------- */
  const rnd = (seed => () => (seed = (seed * 16807) % 2147483647) / 2147483647)(73);
  const win = (x, y, w = 14, h = 20, c = "#f6e3a8") =>
    `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${c}" stroke="#3b2f26" stroke-width="1.5"/><path d="M${x + w / 2} ${y}v${h}M${x} ${y + h / 2}h${w}" stroke="#3b2f26" stroke-width="1"/>`;
  const door = (x, y, w = 14, h = 26, c = "#6b3d26") => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="1.5" fill="${c}" stroke="#2a1e16" stroke-width="1.5"/><circle cx="${x + w - 4}" cy="${y + h / 2}" r="1.3" fill="#e3c27a"/>`;
  const chimney = (x, y, h = 22, c = "#8a4b35") => `<rect x="${x}" y="${y - h}" width="11" height="${h + 6}" fill="${c}" stroke="#3b2f26" stroke-width="1.5"/>`;
  const smoke = (x, y) => `<g class="smoke">${[0, 1, 2].map(i => `<circle cx="${x}" cy="${y}" r="${5 + i * 2}" style="animation-delay:${i * 1.1}s"/>`).join("")}</g>`;
  const label = (txt, y = -10) => `<g class="lbl" transform="translate(0,${y})"><rect x="${-txt.length * 3.4 - 8}" y="-15" width="${txt.length * 6.8 + 16}" height="20" rx="10"/><text y="0" text-anchor="middle">${txt}</text></g>`;

  function item(x, y, from, to, body, o = {}) {
    const cls = ["it", o.cls || ""].join(" ");
    const hit = o.place ? ` data-place="${o.place}" tabindex="0" role="button" aria-label="${MW.esc(o.name || o.place)}"` : "";
    return `<g class="${cls}" data-from="${from}" data-to="${to}"${o.grow ? ` data-grow="${o.grow}"` : ""}${hit} transform="translate(${x},${y})${o.s ? ` scale(${o.s})` : ""}"><g class="grow">${body}${o.place ? `<circle class="beacon" cx="0" cy="${o.by || -110}" r="6"/>` : ""}${o.lbl ? label(o.lbl, (o.by || -110) - 16) : ""}</g></g>`;
  }

  /* ---------- buildings (origin = bottom centre) ---------- */
  const B = {
    wetu: () => `<path d="M-34 0 Q-34 -46 0 -50 Q34 -46 34 0Z" fill="#9b7b52" stroke="#4a3622" stroke-width="2"/>
      ${[-24, -12, 0, 12, 24].map(x => `<path d="M${x} 0 Q${x * .8} -30 ${x * .3} -48" stroke="#5e4530" stroke-width="1.4" fill="none"/>`).join("")}
      <path d="M-30 -18 Q0 -24 30 -18M-33 -6 Q0 -12 33 -6" stroke="#5e4530" stroke-width="1.2" fill="none"/>
      <path d="M-7 0 v-18 a7 7 0 0 1 14 0 v18z" fill="#3a2a1c"/>`,
    fire: () => `<g class="flicker"><path d="M-8 0 L0 -18 L8 0Z" fill="#f0a030"/><path d="M-4 0 L0 -10 L4 0Z" fill="#ffe08a"/></g><path d="M-12 0h24" stroke="#4a3622" stroke-width="3"/>${smoke(0, -24)}`,
    cabin: () => `<rect x="-40" y="-40" width="80" height="40" fill="#8a5d3b" stroke="#3b2618" stroke-width="2"/>
      ${[-32, -24, -16, -8].map(y => `<path d="M-40 ${y}h80" stroke="#5c3b24" stroke-width="2"/>`).join("")}
      <path d="M-48 -38 L0 -72 L48 -38Z" fill="#6b4a2e" stroke="#3b2618" stroke-width="2"/>${chimney(22, -50, 14, "#8f8573")}${door(-7, -26, 14, 26)}${win(16, -30, 14, 12)}${smoke(28, -70)}`,
    stoneHouse: () => `<rect x="-70" y="-58" width="140" height="58" fill="#b49a78" stroke="#4a3a2a" stroke-width="2"/>
      ${Array.from({ length: 26 }, (_, i) => `<rect x="${-66 + (i % 7) * 19 + (Math.floor(i / 7) % 2) * 8}" y="${-54 + Math.floor(i / 7) * 13}" width="14" height="9" rx="2" fill="#a68b68" opacity=".75"/>`).join("")}
      <path d="M-78 -56 L0 -100 L78 -56Z" fill="#5b4636" stroke="#2f241b" stroke-width="2"/>
      ${chimney(-58, -82, 26, "#9c8466")}${chimney(46, -82, 26, "#9c8466")}
      ${win(-52, -46)}${win(-24, -46)}${win(12, -46)}${win(40, -46)}${door(-8, -30, 16, 30, "#5a3320")}`,
    farmhouse: (c = "#f0eadb", w = 110, roof = "#5d4636") => `<rect x="${-w / 2}" y="-56" width="${w}" height="56" fill="${c}" stroke="#3b2f26" stroke-width="2"/>
      ${Array.from({ length: 7 }, (_, i) => `<path d="M${-w / 2} ${-48 + i * 7}h${w}" stroke="rgba(0,0,0,.08)"/>`).join("")}
      <path d="M${-w / 2 - 8} -54 L0 -94 L${w / 2 + 8} -54Z" fill="${roof}" stroke="#2f241b" stroke-width="2"/>${chimney(-w / 2 + 12, -82, 20, "#8a4b35")}${chimney(w / 2 - 22, -82, 20, "#8a4b35")}
      ${win(-w / 2 + 12, -44)}${win(-w / 2 + 36, -44)}${win(w / 2 - 26, -44)}${door(4, -28, 14, 28, "#1f3a2e")}`,
    barn: (c = "#9e3a24") => `<path d="M-50 0 V-50 L-30 -76 H30 L50 -50 V0Z" fill="${c}" stroke="#3b2018" stroke-width="2"/>
      <path d="M-50 -50 H50" stroke="#3b2018" stroke-width="2"/><rect x="-18" y="-40" width="36" height="40" fill="#7c2c1a" stroke="#f1e3c4" stroke-width="2"/><path d="M-18 -40 L18 0 M18 -40 L-18 0" stroke="#f1e3c4" stroke-width="2"/>
      <rect x="-8" y="-66" width="16" height="12" fill="#f1e3c4"/>`,
    /* Kollock's 1779 Print Shop */
    printShop: () => `<rect x="-52" y="-52" width="104" height="52" fill="#e8dec6" stroke="#3b2f26" stroke-width="2"/>
      <path d="M-60 -50 L0 -84 L60 -50Z" fill="#5b4332" stroke="#2f241b" stroke-width="2"/>${chimney(30, -72, 16)}
      <rect x="-46" y="-64" width="92" height="13" rx="2" fill="#1f3a2e" stroke="#2f241b" stroke-width="1.5"/>
      <text x="0" y="-54.5" text-anchor="middle" font-size="7.2" font-family="Fraunces,serif" font-weight="700" fill="#f3cf7a">NEW-JERSEY JOURNAL</text>
      ${win(-38, -38, 18, 20)}${win(20, -38, 18, 20)}${door(-8, -28, 16, 28)}`,
    /* Washington's August 1781 65-ft brick bake ovens */
    bakeOvens: () => `<rect x="-66" y="-34" width="132" height="34" fill="#a24830" stroke="#3b2018" stroke-width="2"/>
      <path d="M-74 -32 L0 -54 L74 -32Z" fill="#684934" stroke="#2f2016" stroke-width="2"/>
      ${[-44, -14, 16, 46].map((x, i) => `<path d="M${x - 9} 0 v-14 a9 9 0 0 1 18 0 v14z" fill="#2b1710"/><path d="M${x - 5} -3 L${x} -11 L${x + 5} -3Z" fill="#ff9e2c" class="flicker"/>${chimney(x - 5, -42, 14, "#8f3b26")}${smoke(x, -62 - (i % 2) * 4)}`).join("")}`,
    /* 1775 Patriot Liberty Pole */
    libertyPole: () => `<path d="M0 0 V-138" stroke="#6b4a2e" stroke-width="4.5"/><path d="M-8 0 h16" stroke="#4a3622" stroke-width="4"/>
      <path d="M0 -134 h32 l-6 7 l6 7 h-32z" fill="#b8381e" class="flag"/><circle cx="0" cy="-140" r="4" fill="#e3a33a"/>`,
    /* 1860 Mount Vernon Red Brick Schoolhouse (2-story Classical Revival brick) */
    redBrickSchool: () => `<rect x="-44" y="-74" width="88" height="74" fill="#a8442c" stroke="#3b2018" stroke-width="2"/>
      <path d="M-52 -72 L0 -104 L52 -72Z" fill="#3f3a36" stroke="#241e1a" stroke-width="2"/>
      <rect x="-8" y="-120" width="16" height="18" fill="#f4eee0" stroke="#2f241b" stroke-width="1.5"/><path d="M-11 -118 L0 -132 L11 -118Z" fill="#3f3a36"/>
      ${[-30, -6, 18].map(x => win(x, -62, 12, 18, "#f6e7bd")).join("")}
      ${[-30, 18].map(x => win(x, -32, 12, 18, "#f6e7bd")).join("")}
      <path d="M-12 -32 L0 -40 L12 -32Z" fill="#f4eee0" stroke="#2f241b"/>${door(-7, -30, 14, 30, "#f4eee0")}`,
    /* 1848 Greek Revival Dusenberry Parsonage */
    greekRevival: (c = "#f7f3e8") => `<rect x="-62" y="-78" width="124" height="78" fill="${c}" stroke="#2f241b" stroke-width="2"/>
      <rect x="-64" y="-82" width="128" height="7" fill="#e8e0cc" stroke="#2f241b" stroke-width="1.5"/>
      <path d="M-68 -82 L0 -112 L68 -82Z" fill="#464440" stroke="#2f241b" stroke-width="2"/>
      <path d="M-68 -82 h16 M52 -82 h16" stroke="#f7f3e8" stroke-width="4"/>
      ${[-48, -22, 8, 34].map(x => win(x, -66, 14, 20, "#dce7ea")).join("")}
      ${[-48, 8, 34].map(x => win(x, -34, 14, 20, "#dce7ea")).join("")}
      <rect x="-26" y="-40" width="24" height="40" fill="none" stroke="#ded6c2" stroke-width="3"/>${door(-21, -34, 14, 34, "#1f3a2e")}`,
    /* Stone Ogden Memorial Presbyterian Church (1905) */
    stoneChurch: () => `<rect x="-56" y="-68" width="112" height="68" fill="#9c9386" stroke="#3a332c" stroke-width="2"/>
      <path d="M-64 -66 L0 -108 L64 -66Z" fill="#464c4a" stroke="#252826" stroke-width="2"/>
      <rect x="-58" y="-128" width="34" height="128" fill="#91887b" stroke="#3a332c" stroke-width="2"/>
      <path d="M-60 -128 h38 v-8 h-38z" fill="#7c7366" stroke="#3a332c" stroke-width="1.5"/>
      ${[-54, -44, -34, -24].map(x => `<rect x="${x}" y="-136" width="5" height="8" fill="#91887b" stroke="#3a332c"/>`).join("")}
      <path d="M-47 -104 a6 6 0 0 1 12 0 v20 h-12z" fill="#464c4a"/>
      <circle cx="8" cy="-82" r="11" fill="#d97a4a" stroke="#3a332c" stroke-width="2"/>
      ${[-8, 18, 38].map(x => `<path d="M${x} -48 a7 7 0 0 1 14 0 v24 h-14z" fill="#cfe2ea" stroke="#3a332c" stroke-width="1.5"/>`).join("")}
      <path d="M-47 0 v-30 a8 8 0 0 1 16 0 v30z" fill="#5a3522" stroke="#2a1a12" stroke-width="1.5"/>`,
    /* Glittering glass-roofed rose greenhouses ("The Rose Capital") */
    greenhouse: () => `<g>
      ${[-68, 4].map(ox => `<g transform="translate(${ox},0)">
        <rect x="0" y="-26" width="64" height="26" fill="rgba(205,236,245,.78)" stroke="#4c646e" stroke-width="1.8"/>
        <path d="M-2 -26 L32 -48 L66 -26Z" fill="rgba(222,245,252,.82)" stroke="#4c646e" stroke-width="1.8"/>
        ${[12, 24, 36, 48].map(x => `<path d="M${x} 0 v-26 L32 -48" stroke="rgba(90,120,132,.45)" stroke-width="1.1" fill="none"/>`).join("")}
        <path d="M6 -6 h52" stroke="#3c6e3a" stroke-width="5" stroke-linecap="round"/>
        ${[10, 20, 30, 40, 50].map(x => `<circle cx="${x}" cy="-10" r="2.6" fill="#cf2d3a"/>`).join("")}
      </g>`).join("")}
      <rect x="72" y="-66" width="9" height="66" fill="#8f4530" stroke="#3b2018" stroke-width="1.5"/>${smoke(76, -72)}
    </g>`,
    /* 1837 Wooden grade-level depot */
    depot: (name = "CHATHAM") => `<rect x="-48" y="-36" width="96" height="36" fill="#c9a36b" stroke="#3b2f26" stroke-width="2"/>${Array.from({ length: 11 }, (_, i) => `<path d="M${-42 + i * 8.4} -36v36" stroke="rgba(0,0,0,.15)"/>`).join("")}
      <path d="M-64 -34 L-40 -58 H40 L64 -34Z" fill="#7a3b26" stroke="#2f241b" stroke-width="2"/>${win(-34, -28, 12, 18)}${win(22, -28, 12, 18)}${door(-8, -28, 16, 28)}
      <rect x="-28" y="-50" width="56" height="11" fill="#f1e3c4" stroke="#3b2f26"/><text x="0" y="-41.5" text-anchor="middle" font-size="8" font-family="Fraunces,serif" font-weight="700" fill="#3b2f26">${name}</text>`,
    /* 1914 Elevated Stone DL&W Chatham Station */
    station: (name = "CHATHAM") => `<rect x="-82" y="-48" width="164" height="48" fill="#9e9588" stroke="#36312b" stroke-width="2"/>
      ${Array.from({ length: 18 }, (_, i) => `<rect x="${-76 + (i % 6) * 25 + (Math.floor(i / 6) % 2) * 8}" y="${-44 + Math.floor(i / 6) * 14}" width="18" height="9" rx="2" fill="#8b8275" opacity=".75"/>`).join("")}
      <path d="M-100 -46 L-72 -76 H72 L100 -46Z" fill="#3d4946" stroke="#1e2422" stroke-width="2"/><path d="M-100 -46 H100" stroke="#1e2422" stroke-width="3"/>
      ${[-64, -38, 24, 50].map(x => `<path d="M${x} -36 a7 7 0 0 1 14 0 v26 h-14z" fill="#f3e3b2" stroke="#36312b" stroke-width="1.5"/>`).join("")}${door(-9, -34, 18, 34, "#4a2a1a")}
      <rect x="-32" y="-68" width="64" height="13" rx="2" fill="#1f3a2e" stroke="#f4eee0" stroke-width="1.2"/><text x="0" y="-58.5" text-anchor="middle" font-size="8.5" font-family="Fraunces,serif" font-weight="700" fill="#f3cf7a">${name}</text>`,
    /* 1922 Brick Colonial Revival High School / Chatham Borough Hall */
    boroughHall: () => `<rect x="-98" y="-72" width="196" height="72" fill="#a84b34" stroke="#2f241b" stroke-width="2"/>
      <rect x="-102" y="-76" width="204" height="6" fill="#f2ead8" stroke="#2f241b" stroke-width="1.5"/>
      <path d="M-38 -76 L0 -102 L38 -76Z" fill="#f2ead8" stroke="#2f241b" stroke-width="2"/>
      <rect x="-11" y="-128" width="22" height="26" fill="#f6f0e2" stroke="#2f241b" stroke-width="1.5"/>
      <path d="M-14 -128 L0 -148 L14 -128Z" fill="#3e4a44" stroke="#2f241b" stroke-width="1.5"/>
      ${[-86, -62, -38, 26, 50, 74].map(x => win(x, -60, 13, 20, "#f6e8c4")).join("")}
      ${[-86, -62, 50, 74].map(x => win(x, -28, 13, 18, "#f6e8c4")).join("")}
      ${[-22, -8, 8, 22].map(x => `<rect x="${x - 2}" y="-72" width="4" height="72" fill="#f4eee0"/>`).join("")}
      ${door(-8, -32, 16, 32, "#1f3a2e")}`,
    /* 1924 Brick Library of the Chathams */
    library: () => `<rect x="-66" y="-52" width="132" height="52" fill="#ad4f37" stroke="#2f241b" stroke-width="2"/>
      <path d="M-74 -50 L0 -82 L74 -50Z" fill="#474542" stroke="#2f241b" stroke-width="2"/>
      <path d="M-22 -50 L0 -68 L22 -50Z" fill="#f4eee0" stroke="#2f241b" stroke-width="1.5"/>
      ${[-52, -32, 20, 40].map(x => `<path d="M${x} -38 a6 6 0 0 1 12 0 v20 h-12z" fill="#f6e7bd" stroke="#2f241b" stroke-width="1.4"/>`).join("")}
      ${[-16, 12].map(x => `<rect x="${x}" y="-46" width="4" height="46" fill="#f4eee0"/>`).join("")}
      ${door(-8, -30, 16, 30, "#1f3a2e")}`,
    /* Fairview House summer resort hotel */
    hotel: () => `<rect x="-92" y="-80" width="184" height="80" fill="#efe6d2" stroke="#3b2f26" stroke-width="2"/><path d="M-100 -78 L-82 -104 H82 L100 -78Z" fill="#5d4636" stroke="#2f241b" stroke-width="2"/>
      ${Array.from({ length: 3 }, (_, r) => Array.from({ length: 7 }, (_, i) => win(-78 + i * 24, -72 + r * 22, 11, 15, "#f6e3a8")).join("")).join("")}
      <path d="M-94 -26 h188" stroke="#3b2f26" stroke-width="2"/>${Array.from({ length: 10 }, (_, i) => `<path d="M${-90 + i * 20} -26 v26" stroke="#f8f2e2" stroke-width="3"/>`).join("")}`,
    /* Dr. Swaim's 1887 Pharmacy & Main St storefronts */
    swaimStore: () => `<g>
      <rect x="-66" y="-68" width="66" height="68" fill="#c98e63" stroke="#2f241b" stroke-width="2"/>
      <path d="M-72 -66 L-33 -98 L4 -66Z" fill="#493a32" stroke="#2f241b" stroke-width="2"/>
      <rect x="-62" y="-50" width="58" height="12" fill="#1f3a2e"/><text x="-33" y="-41" text-anchor="middle" font-size="7" font-weight="700" fill="#f3cf7a">SWAIM DRUGS</text>
      ${win(-58, -32, 20, 22, "#e5eef0")}${door(-24, -28, 14, 28)}
      <rect x="2" y="-62" width="68" height="62" fill="#d8c39e" stroke="#2f241b" stroke-width="2"/><rect x="0" y="-68" width="72" height="8" fill="#5a4a3c"/>
      <text x="36" y="-48" text-anchor="middle" font-size="7.2" font-weight="700" fill="#2f241b">KELLEY'S</text>
      ${win(8, -32, 22, 22, "#e5eef0")}${door(38, -28, 14, 28)}
    </g>`,
    /* Madame Bey's outdoor boxing ring & barn gym */
    boxingCamp: () => `<g>
      <path d="M-54 0 V-42 L-34 -64 H8 L28 -42 V0Z" fill="#e5cf86" stroke="#3b2f26" stroke-width="2"/>
      <rect x="-26" y="-32" width="26" height="32" fill="#6b4a2e" stroke="#2f241b" stroke-width="1.5"/>
      <g transform="translate(56,0)">
        <rect x="-32" y="-12" width="64" height="12" fill="#8b6b4a" stroke="#2f241b" stroke-width="1.5"/>
        ${[-30, 30].map(x => `<path d="M${x} -12 v-24" stroke="#b8381e" stroke-width="3"/>`).join("")}
        ${[-18, -24, -30].map(y => `<path d="M-30 ${y} H30" stroke="#f6f0e2" stroke-width="1.6"/>`).join("")}
        <circle cx="-8" cy="-30" r="3.5" fill="#d8a47f"/><path d="M-8 -26 v14" stroke="#1f3a2e" stroke-width="3.5"/>
        <circle cx="8" cy="-30" r="3.5" fill="#8d5b3c"/><path d="M8 -26 v14" stroke="#b8381e" stroke-width="3.5"/>
      </g>
    </g>`,
    queenAnne: (c = "#7d9a8a", trim = "#f4ead2") => `<rect x="-46" y="-78" width="92" height="78" fill="${c}" stroke="#2f241b" stroke-width="2"/>
      <rect x="20" y="-104" width="34" height="104" fill="${c}" stroke="#2f241b" stroke-width="2"/><path d="M16 -104 L37 -142 L58 -104Z" fill="#6c3a2a" stroke="#2f241b" stroke-width="2"/>
      <path d="M-54 -76 L-8 -118 L36 -76Z" fill="#6c3a2a" stroke="#2f241b" stroke-width="2"/>
      ${win(-36, -66)}${win(-12, -66)}${win(28, -90, 18, 22)}${win(28, -56, 18, 22)}
      <path d="M-52 -28 h76 v4 h-76z" fill="${trim}"/>${[-48, -28, -8, 14].map(x => `<path d="M${x} -24 v24" stroke="${trim}" stroke-width="3"/>`).join("")}
      ${door(-26, -26, 14, 26)}${win(-6, -22, 14, 16)}${chimney(-30, -106, 14)}`,
    foursquare: (c = "#d4b483", roof = "#4d4038") => `<rect x="-52" y="-92" width="104" height="92" fill="${c}" stroke="#2f241b" stroke-width="2"/>
      <path d="M-62 -90 L-22 -122 H22 L62 -90Z" fill="${roof}" stroke="#2f241b" stroke-width="2"/><path d="M-12 -104 h24 v-12 l-12 -6 l-12 6z" fill="${c}" stroke="#2f241b" stroke-width="1.5"/>${win(-6, -116, 12, 10)}
      ${win(-38, -80, 18, 22)}${win(20, -80, 18, 22)}${win(-38, -40, 18, 22)}${win(20, -40, 18, 22)}
      <path d="M-60 -32 h120 l-6 -10 h-108z" fill="${roof}" stroke="#2f241b" stroke-width="1.5"/>${[-52, -18, 18, 52].map(x => `<path d="M${x} -32 v32" stroke="#f1e8d4" stroke-width="5"/>`).join("")}
      ${door(-8, -30, 16, 30)}${chimney(30, -118, 12)}`,
    tudor: (c = "#efe5cf") => `<rect x="-58" y="-62" width="116" height="62" fill="${c}" stroke="#2f241b" stroke-width="2"/>
      <path d="M-66 -60 L-16 -116 L18 -78 L34 -94 L66 -60Z" fill="#4b3b33" stroke="#2f241b" stroke-width="2"/>
      <path d="M-44 -60 L-16 -100 L12 -60Z" fill="${c}" stroke="#2f241b" stroke-width="2"/>
      <path d="M-30 -60 v-20 M-16 -60 v-40 M-2 -60 v-20 M-38 -70 L-16 -96 L6 -70" stroke="#3a2a20" stroke-width="3" fill="none"/>
      ${win(-36, -48, 26, 18, "#d8e4e0")}${win(26, -48, 24, 18, "#d8e4e0")}<path d="M-2 0 v-26 a10 10 0 0 1 20 0 v26z" fill="#6b3d26" stroke="#2a1e16" stroke-width="1.5"/>
      ${chimney(40, -96, 22, "#9a4a32")}`,
    colonialRev: (c = "#f2ece0") => `<rect x="-60" y="-80" width="120" height="80" fill="${c}" stroke="#2f241b" stroke-width="2"/>${Array.from({ length: 9 }, (_, i) => `<path d="M-60 ${-72 + i * 8}h120" stroke="rgba(0,0,0,.08)"/>`).join("")}
      <path d="M-66 -78 L0 -112 L66 -78Z" fill="#3e3a38" stroke="#2f241b" stroke-width="2"/>
      ${[-46, -22, 10, 34].map(x => win(x, -68, 14, 20, "#f6e3a8")).join("")}${win(-46, -34, 14, 20, "#f6e3a8")}${win(34, -34, 14, 20, "#f6e3a8")}
      <path d="M-16 -40 L0 -50 L16 -40Z" fill="#f4eee0" stroke="#2f241b"/>${door(-8, -38, 16, 38, "#1f3a2e")}${chimney(-52, -100, 12)}${chimney(42, -100, 12)}`,
    cape: (c = "#c9d6dd") => `<rect x="-52" y="-40" width="104" height="40" fill="${c}" stroke="#2f241b" stroke-width="2"/><path d="M-58 -38 L0 -84 L58 -38Z" fill="#4c4a48" stroke="#2f241b" stroke-width="2"/>
      ${[-24, 12].map(x => `<path d="M${x} -54 h16 v-12 l-8 -6 l-8 6z" fill="${c}" stroke="#2f241b" stroke-width="1.5"/>`).join("")}${win(-40, -30)}${win(26, -30)}${door(-7, -28)}`,
    mill: () => `<rect x="-56" y="-80" width="88" height="80" fill="#9c7454" stroke="#3b2618" stroke-width="2"/>${Array.from({ length: 10 }, (_, i) => `<path d="M${-56 + i * 8.8} -80v80" stroke="rgba(0,0,0,.18)"/>`).join("")}
      <path d="M-64 -78 L-12 -116 L40 -78Z" fill="#5b3a24" stroke="#2f1d12" stroke-width="2"/>${win(-42, -64)}${win(-8, -64)}${door(-30, -30, 18, 30)}
      <g class="wheel" transform="translate(52,-26)"><circle r="30" fill="none" stroke="#4b3020" stroke-width="5"/><circle r="5" fill="#4b3020"/>${Array.from({ length: 8 }, (_, i) => `<path d="M0 0 L${Math.cos(i * Math.PI / 4) * 30} ${Math.sin(i * Math.PI / 4) * 30}" stroke="#4b3020" stroke-width="3"/><rect x="${Math.cos(i * Math.PI / 4) * 30 - 4}" y="${Math.sin(i * Math.PI / 4) * 30 - 4}" width="8" height="8" fill="#6d4a33"/>`).join("")}</g>`,
    /* Great Swamp marsh cattails & great blue heron */
    swampMarsh: () => `<g>
      <ellipse cx="0" cy="4" rx="76" ry="14" fill="#6ca4b8" stroke="#4a7b8c" stroke-width="1.8"/>
      ${[-54, -38, -22, 24, 42, 56].map((x, i) => `<path d="M${x} 4 v-${22 + (i % 3) * 6}" stroke="#3e6b38" stroke-width="2"/><ellipse cx="${x}" cy="-${20 + (i % 3) * 6}" rx="2.4" ry="6" fill="#5c3a22"/>`).join("")}
      <g transform="translate(4,-4)"><path d="M0 0 v-14 M4 0 v-14" stroke="#c89e52" stroke-width="1.6"/><ellipse cx="2" cy="-18" rx="9" ry="5" fill="#8ea4b2"/><path d="M8 -20 q6 -10 2 -16" stroke="#8ea4b2" stroke-width="3" fill="none"/><path d="M10 -36 l9 2 l-9 2z" fill="#e0a838"/></g>
    </g>`,
    /* 1906 Main Street 5-inch raised cobblestone speed bump */
    speedBump: () => `<g>
      <path d="M-24 22 Q0 6 24 22 L18 62 Q0 48 -18 62Z" fill="#9a8d7c" stroke="#3b332b" stroke-width="2"/>
      ${[-10, 0, 10].map(y => `<path d="M-18 ${26 + y * 1.4} Q0 ${14 + y * 1.4} 18 ${26 + y * 1.4}" stroke="#5b5046" stroke-width="2" stroke-dasharray="5 4" fill="none"/>`).join("")}
    </g>`,
    /* Timber Day's Bridge (1710–1913) & Concrete Arch Bridge (1914+) */
    timberBridge: () => `<g>
      <rect x="-64" y="-12" width="128" height="10" fill="#7c5636" stroke="#3b2618" stroke-width="2"/>
      <path d="M-64 -24 H64 M-64 -12 L-42 -24 L-20 -12 L0 -24 L20 -12 L42 -24 L64 -12" stroke="#5c3b22" stroke-width="2.5" fill="none"/>
      ${[-44, 0, 44].map(x => `<rect x="${x - 3}" y="-2" width="6" height="22" fill="#5c3b22"/>`).join("")}
    </g>`,
    archBridge: () => `<g>
      <path d="M-70 -16 H70 V6 H50 A22 18 0 0 0 6 6 H-6 A22 18 0 0 0 -50 6 H-70Z" fill="#b9b2a6" stroke="#4a453e" stroke-width="2"/>
      <path d="M-70 -24 H70" stroke="#7c756a" stroke-width="3"/>
    </g>`,
    streetLamp: () => `<path d="M0 0 v-54" stroke="#1f2a26" stroke-width="3.5"/><path d="M-5 -54 h10 l3 -14 h-16z" fill="#fff2b8" stroke="#1f2a26" stroke-width="1.8" class="glow"/>`
  };

  /* ---------- vegetation ---------- */
  const tree = {
    oak: (s = 1, c = "#3f6b3f") => `<g transform="scale(${s})"><path d="M-4 0 v-30 h8 v30z" fill="#5a3d28"/><circle cx="0" cy="-48" r="24" fill="${c}"/><circle cx="-16" cy="-38" r="16" fill="${c}"/><circle cx="16" cy="-38" r="16" fill="${c}"/><circle cx="-6" cy="-58" r="14" fill="rgba(255,255,255,.08)"/></g>`,
    pine: (s = 1, c = "#2f5440") => `<g transform="scale(${s})"><path d="M-3 0 v-14 h6 v14z" fill="#4a3322"/><path d="M0 -70 L18 -30 H-18Z M0 -54 L22 -14 H-22Z" fill="${c}"/></g>`,
    maple: (s = 1, c = "#c8461f") => `<g transform="scale(${s})"><path d="M-4 0 v-34 h8 v34z" fill="#4e3424"/><path d="M0 -34 l-12 -10 M0 -38 l12 -12" stroke="#4e3424" stroke-width="3"/>
      <circle cx="0" cy="-58" r="26" fill="${c}"/><circle cx="-18" cy="-46" r="17" fill="${c}"/><circle cx="18" cy="-46" r="17" fill="${c}"/><circle cx="6" cy="-68" r="14" fill="rgba(255,220,120,.25)"/></g>`,
    apple: (s = 1) => `<g transform="scale(${s})"><path d="M-3 0 v-18 h6 v18z" fill="#5a3d28"/><circle cx="0" cy="-30" r="16" fill="#5e8a3e"/>${[[-7, -32], [5, -26], [2, -38], [-2, -24], [9, -34]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="2.4" fill="#d23a2a"/>`).join("")}</g>`
  };

  /* ---------- vehicles (drawn facing right) ---------- */
  const V = {
    walker: c => `<g class="bob"><circle cx="0" cy="-36" r="5" fill="#7a4a2a"/><path d="M0 -31 v16 M0 -15 l-5 15 M0 -15 l5 15 M0 -27 l-6 8 M0 -27 l7 6" stroke="${c || "#6b4a2a"}" stroke-width="3.5" stroke-linecap="round"/></g>`,
    soldier: () => `<g class="bob"><circle cx="0" cy="-37" r="5" fill="#d2a67e"/><path d="M-7 -41 L0 -46 L7 -41Z" fill="#1d2f4a"/><path d="M0 -32 v16 M0 -16 l-5 16 M0 -16 l5 16 M0 -28 l-6 8 M0 -28 l8 5" stroke="#1d2f4a" stroke-width="3.8" stroke-linecap="round"/><path d="M4 -18 L12 -48" stroke="#5a3d28" stroke-width="2"/></g>`,
    oxcart: () => `<rect x="-40" y="-30" width="44" height="18" fill="#8a5d3b" stroke="#3b2618" stroke-width="2"/><circle cx="-18" cy="-8" r="10" fill="none" stroke="#3b2618" stroke-width="3"/>
      <g class="bob"><ellipse cx="30" cy="-24" rx="20" ry="11" fill="#a07850"/><circle cx="50" cy="-28" r="7" fill="#a07850"/><path d="M18 -14 v14 M40 -14 v14" stroke="#6b4a2a" stroke-width="4"/></g><path d="M4 -22 h12" stroke="#3b2618" stroke-width="2"/>`,
    stagecoach: () => `<g class="bob"><ellipse cx="62" cy="-30" rx="20" ry="10" fill="#5b3a24"/><path d="M78 -34 l10 -10 l4 4 l-8 10z" fill="#5b3a24"/><path d="M48 -22 v20 M58 -22 l4 20 M70 -22 v20 M76 -22 l-4 20" stroke="#3b2618" stroke-width="3.5"/></g>
      <path d="M-44 -64 h70 l6 12 v30 h-82 v-30z" fill="#7c2c1a" stroke="#2a1410" stroke-width="2"/><rect x="-30" y="-54" width="20" height="14" fill="#f1e3c4"/><rect x="0" y="-54" width="18" height="14" fill="#f1e3c4"/>
      <rect x="-40" y="-74" width="62" height="10" fill="#3b2618"/><circle cx="-28" cy="-10" r="12" fill="none" stroke="#2a1410" stroke-width="3.5"/><circle cx="16" cy="-10" r="12" fill="none" stroke="#2a1410" stroke-width="3.5"/><path d="M26 -40 h22" stroke="#3b2618" stroke-width="2"/>`,
    buggy: () => `<g class="bob"><ellipse cx="44" cy="-30" rx="18" ry="9" fill="#2b2420"/><path d="M58 -33 l9 -9 l4 4 l-7 9z" fill="#2b2420"/><path d="M32 -22 v20 M42 -22 l3 20 M54 -22 v20 M58 -22 l-3 20" stroke="#2b2420" stroke-width="3"/></g>
      <path d="M-26 -30 h34 v-6 h-30 q-10 -30 6 -30" fill="#1f1a17" stroke="#1f1a17" stroke-width="2"/><circle cx="-10" cy="-12" r="12" fill="none" stroke="#1f1a17" stroke-width="2.5"/><path d="M8 -30 L30 -30" stroke="#1f1a17" stroke-width="2"/>
      <circle cx="-6" cy="-46" r="5" fill="#d8b48a"/><path d="M-11 -52 h10 v-4 h-10z" fill="#1f1a17"/>`,
    bicycle: () => `<circle cx="-16" cy="-12" r="12" fill="none" stroke="#2a221c" stroke-width="2.5"/><circle cx="16" cy="-12" r="12" fill="none" stroke="#2a221c" stroke-width="2.5"/><path d="M-16 -12 L-4 -30 H12 L16 -12 M-4 -30 L0 -12 L12 -30" stroke="#b8381e" stroke-width="2.5" fill="none"/>
      <g class="bob"><circle cx="2" cy="-54" r="5" fill="#d8b48a"/><path d="M0 -48 L-4 -32 L4 -18 M-2 -44 L12 -34" stroke="#1f3a2e" stroke-width="4" stroke-linecap="round" fill="none"/></g>`,
    modelT: () => `<path d="M-40 -20 v-14 h18 v-22 h34 v22 h24 l6 14z" fill="#1d1b19"/><rect x="-18" y="-52" width="24" height="16" fill="#cfe0e6"/><circle cx="-26" cy="-10" r="11" fill="#2a221c" stroke="#777" stroke-width="2"/><circle cx="30" cy="-10" r="11" fill="#2a221c" stroke="#777" stroke-width="2"/><circle cx="40" cy="-28" r="3" fill="#ffe08a"/>`,
    fifties: () => `<path d="M-60 -16 q0 -14 14 -16 l20 -18 h46 l22 18 h20 q14 2 14 16 z" fill="#4fa0a0" stroke="#1f3a3a" stroke-width="2"/><path d="M-22 -32 l12 -14 h36 l14 14z" fill="#dff1f3" stroke="#1f3a3a"/><path d="M-60 -16 h136" stroke="#f4f4f4" stroke-width="3"/><circle cx="-34" cy="-10" r="10" fill="#222"/><circle cx="46" cy="-10" r="10" fill="#222"/><circle cx="-34" cy="-10" r="4" fill="#ddd"/><circle cx="46" cy="-10" r="4" fill="#ddd"/>`,
    modern: () => `<path d="M-56 -14 q0 -16 16 -18 l18 -16 h44 l22 16 h12 q14 2 14 18 z" fill="#b8381e" stroke="#5a1a0c" stroke-width="2"/><path d="M-18 -32 l10 -12 h28 l16 12z" fill="#cfe4ea" stroke="#5a1a0c"/><circle cx="-30" cy="-10" r="10" fill="#222"/><circle cx="40" cy="-10" r="10" fill="#222"/><circle cx="-30" cy="-10" r="4" fill="#bbb"/><circle cx="40" cy="-10" r="4" fill="#bbb"/><rect x="62" y="-24" width="6" height="4" fill="#fff3b0"/>`,
    jogger: () => `<g class="bob"><circle cx="0" cy="-40" r="5" fill="#8a5a3a"/><path d="M0 -35 L-2 -18 M-2 -18 l-8 18 M-2 -18 l9 16 M0 -30 l-8 6 M0 -30 l9 2" stroke="#e3a33a" stroke-width="4" stroke-linecap="round" fill="none"/></g>`,
    stroller: () => `<g class="bob"><circle cx="-14" cy="-40" r="5" fill="#d8b48a"/><path d="M-14 -35 v17 l-5 18 M-14 -18 l5 18 M-14 -30 l14 4" stroke="#1f3a2e" stroke-width="4" stroke-linecap="round" fill="none"/></g><path d="M0 -26 h22 a10 10 0 0 1 -22 0z M0 -26 q2 -16 18 -16" fill="#e3a33a" stroke="#2a221c" stroke-width="1.5"/><circle cx="4" cy="-6" r="5" fill="#2a221c"/><circle cx="20" cy="-6" r="5" fill="#2a221c"/>`
  };

  /* ---------- trains ---------- */
  const T = {
    steam: () => `<g class="train-body"><rect x="0" y="-36" width="70" height="26" rx="4" fill="#26221f"/><rect x="50" y="-58" width="26" height="48" fill="#3a2f28"/><rect x="18" y="-56" width="10" height="20" fill="#26221f"/><path d="M14 -60 h18 l-4 6 h-10z" fill="#26221f"/>
      <rect x="54" y="-52" width="16" height="12" fill="#f3cf7a"/><path d="M-6 -12 L-14 0 H0z" fill="#b8381e"/>${[12, 34, 58].map(x => `<circle cx="${x}" cy="-8" r="9" fill="#b8381e" stroke="#26221f" stroke-width="3"/>`).join("")}
      ${[0, 1, 2].map(c => `<g transform="translate(${90 + c * 92},0)"><rect x="0" y="-48" width="84" height="38" rx="3" fill="${["#6b2a1a", "#7c3a24", "#6b2a1a"][c]}" stroke="#26221f" stroke-width="2"/>${[8, 26, 44, 62].map(x => `<rect x="${x}" y="-42" width="12" height="14" fill="#f3e3b2"/>`).join("")}<circle cx="16" cy="-8" r="7" fill="#26221f"/><circle cx="68" cy="-8" r="7" fill="#26221f"/></g>`).join("")}</g>
      <g class="puffs">${[0, 1, 2, 3, 4].map(i => `<circle cx="23" cy="-66" r="${8 + i * 3}" style="animation-delay:${i * .45}s"/>`).join("")}</g>`,
    electric: () => `<g class="train-body">${[0, 1, 2, 3].map(c => `<g transform="translate(${c * 108},0)"><rect x="0" y="-56" width="102" height="46" rx="6" fill="#4c5a3e" stroke="#1e241a" stroke-width="2"/>${[10, 32, 54, 76].map(x => `<rect x="${x}" y="-48" width="14" height="16" rx="2" fill="#f3e3b2"/>`).join("")}<circle cx="18" cy="-8" r="7" fill="#1e241a"/><circle cx="84" cy="-8" r="7" fill="#1e241a"/></g>`).join("")}<path d="M380 -56 l10 -14 l10 14" stroke="#1e241a" stroke-width="2" fill="none"/></g>`,
    njt: () => `<g class="train-body"><path d="M0 -10 V-50 q0 -10 14 -12 h30 v52z" fill="#d9dde0" stroke="#3a4046" stroke-width="2"/>${[0, 1, 2, 3].map(c => `<g transform="translate(${44 + c * 112},0)"><rect x="0" y="-62" width="108" height="52" rx="4" fill="#d9dde0" stroke="#3a4046" stroke-width="2"/><rect x="0" y="-30" width="108" height="5" fill="#e36b1e"/><rect x="0" y="-25" width="108" height="5" fill="#7a2b84"/><rect x="0" y="-20" width="108" height="5" fill="#1f4e9c"/>${[10, 34, 58, 82].map(x => `<rect x="${x}" y="-54" width="18" height="16" rx="2" fill="#2a3640"/>`).join("")}<circle cx="18" cy="-8" r="7" fill="#2a2a2a"/><circle cx="90" cy="-8" r="7" fill="#2a2a2a"/></g>`).join("")}<rect x="6" y="-50" width="20" height="14" fill="#2a3640"/></g>`
  };

  /* Watchung Mountains & Long Hill ridge profile, dipping at Hobart Gap on the right */
  function ridgeY(x) {
    const gap = Math.exp(-Math.pow((x - 1390) / 140, 2)) * 46;
    return 332 - Math.sin(x / 360) * 18 + Math.sin(x / 95) * 9 + gap;
  }

  /* ---------- compose the scene ---------- */
  function build() {
    const ridgeTrees = Array.from({ length: 68 }, (_, i) => {
      const x = i * 24 + rnd() * 16 - 8;
      const y = ridgeY(x) + 6 + rnd() * 10;
      return `<g transform="translate(${x.toFixed(0)},${y.toFixed(0)}) scale(${(.38 + rnd() * .24).toFixed(2)})">${rnd() > .45 ? tree.oak(1, "#3c5e4a") : tree.pine(1, "#2c4a3b")}</g>`;
    }).join("");

    const woods = Array.from({ length: 44 }, (_, i) => {
      const x = i * 36 + rnd() * 18; const y = 472 + rnd() * 24;
      return `<g transform="translate(${x.toFixed(0)},${y.toFixed(0)}) scale(${(.6 + rnd() * .48).toFixed(2)})">${rnd() > .3 ? tree.oak(1, ["#3f6b3f", "#4c7a42", "#5d8a45"][i % 3]) : tree.pine(1)}</g>`;
    }).join("");

    const fields = [[-20, 412, 260], [230, 424, 220], [470, 418, 240], [720, 426, 250], [980, 420, 220], [1200, 426, 180]]
      .map(([x, y, w], i) => `<path d="M${x} ${y + 40} L${x + 28} ${y} H${x + w - 20} L${x + w} ${y + 40}Z" fill="${["#d8c27a", "#a9b768", "#c9a95a", "#9fb35e", "#d6bd6e", "#b3b96a"][i]}"/>
        ${Array.from({ length: 5 }, (_, k) => `<path d="M${x + 18 + k * 4} ${y + 8 + k * 7} H${x + w - 14 - k * 2}" stroke="rgba(80,60,20,.18)" stroke-width="2"/>`).join("")}`).join("");

    const streetMaples = [55, 225, 425, 625, 790, 995, 1185, 1345, 1560].map((x, i) =>
      item(x, GROUND + 6, 1880 + (i % 4) * 6, 9999, tree.maple(1, ["#c8461f", "#d9622b", "#e3a33a", "#b8381e"][i % 4]), { grow: 1880 + (i % 4) * 6, cls: "streettree" })).join("");

    const orchard = [310, 355, 400].map((x, i) => item(x, BACK + 46 + (i % 2) * 6, 1750, 1910, tree.apple(.92))).join("");
    const lamps = [615, 775, 935, 1095].map(x => item(x, GROUND + 14, 1898, 9999, B.streetLamp(), { cls: "gaslamp" })).join("");

    const back = [
      // Township hills & Loantaka / Southern Blvd / River Road (left)
      item(155, BACK - 14, 1828, 9999, B.greekRevival("#d98b6c"), { place: "boisaubin", name: "Boisaubin Manor, 1828", by: -120, lbl: "Boisaubin Manor 1828", s: .68 }),
      item(300, BACK + 8, 1860, 9999, B.redBrickSchool(), { place: "redbrick", name: "Red Brick Schoolhouse, 1860", by: -138, lbl: "Red Brick School 1860", s: .78 }),
      item(445, BACK + 26, 1923, 1969, B.boxingCamp(), { place: "madamebey", name: "Madame Bey's Boxing Camp", by: -76, lbl: "Madame Bey's Ring 1923", s: .84 }),
      // Rose greenhouses & railroad station (center)
      item(595, BACK + 28, 1885, 1975, B.greenhouse(), { place: "rosehouses", name: "Glass Rose Greenhouses", by: -64, lbl: "Rose Greenhouses", s: .95 }),
      item(790, BACK, 1837, 1913, B.depot("CHATHAM"), { place: "railroad1837", name: "1837 Morris & Essex Depot", by: -70, lbl: "1837 Railroad Depot" }),
      item(790, BACK - 18, 1914, 9999, B.station("CHATHAM"), { place: "station", name: "1914 Elevated Chatham Station", by: -86, lbl: "1914 Chatham Station" }),
      item(1025, BACK + 28, 1892, 1968, B.greenhouse(), { s: .85 }),
      // Parrott's gristmill by the Passaic River (right)
      item(1385, BACK + 28, 1745, 1915, B.mill(), { place: "parrottmill", name: "Passaic River Gristmill", by: -126, lbl: "Parrott's Mill", s: .86 })
    ].join("");

    const bridges = [
      item(1465, GROUND + 28, 1710, 1913, B.timberBridge(), { place: "daysbridge1710", name: "John Day's Timber Bridge", by: -36, lbl: "Day's Bridge 1710" }),
      item(1465, GROUND + 28, 1914, 9999, B.archBridge(), { place: "viaduct1914", name: "Concrete Arch Bridge", by: -36, lbl: "Passaic Arch Bridge" })
    ].join("");

    const front = [
      // Far West: Great Swamp & Green Village
      item(95, GROUND - 8, 1960, 9999, B.swampMarsh(), { place: "greatswamp", name: "Great Swamp National Wildlife Refuge", by: -52, lbl: "Great Swamp NWR 1960" }),
      item(205, GROUND, 1790, 9999, B.farmhouse("#f4efe2", 96, "#4d3e34"), { place: "greenvillage", name: "Green Village Crossroads", by: -102, lbl: "Green Village", s: .86 }),
      item(335, GROUND, 1922, 9999, B.tudor(), { name: "Commuter-era Tudor home", s: .88 }),
      item(335, GROUND, 1750, 1921, B.barn(), { s: .85 }),
      // West Downtown: Ogden Church & 1922 High School / Borough Hall
      item(480, GROUND, 1905, 9999, B.stoneChurch(), { place: "ogden", name: "Ogden Memorial Presbyterian Church", by: -146, lbl: "Ogden Church 1905", s: .92 }),
      item(625, GROUND, 1922, 9999, B.boroughHall(), { place: "boroughhall", name: "1922 High School / Chatham Borough Hall", by: -156, lbl: "Borough Hall (1922 School)", s: .82 }),
      // Center Downtown: Dr. Swaim's, Fairview Hotel -> 1924 Library, 1906 Speed Bump
      item(775, GROUND, 1887, 9999, B.swaimStore(), { place: "swaim", name: "Dr. Swaim's Pharmacy & Main Street", by: -108, lbl: "Main St & Swaim's 1887", s: .9 }),
      item(855, GROUND, 1906, 1935, B.speedBump(), { place: "speedbumps1906", name: "1906 Main Street Speed Bumps", by: -4, lbl: "1906 Speed Bump" }),
      item(945, GROUND, 1880, 1920, B.hotel(), { place: "fairviewhotel", name: "Fairview House Resort Hotel", by: -112, lbl: "Fairview House Hotel", s: .82 }),
      item(945, GROUND, 1924, 9999, B.library(), { place: "library1924", name: "Library of the Chathams, 1924", by: -92, lbl: "1924 Library", s: .92 }),
      // East Main Street: 1848 Dusenberry Parsonage, 1740 Morrell House, 1775 Liberty Pole, 1779 Kollock Press & 1781 Brick Ovens
      item(1095, GROUND, 1848, 9999, B.greekRevival("#f8f4ea"), { place: "dusenberry", name: "Dusenberry Parsonage, 1848", by: -120, lbl: "Dusenberry House 1848", s: .88 }),
      item(1185, GROUND, 1775, 1800, B.libertyPole(), { place: "libertypole", name: "1775 Patriot Liberty Pole", by: -150, lbl: "1775 Liberty Pole" }),
      item(1245, GROUND, 1740, 9999, B.farmhouse("#efe7d4", 108, "#5a4332"), { place: "morrell", name: "Jacob Morrell House, c. 1740", by: -102, lbl: "Morrell House 1740", s: .9 }),
      item(1365, GROUND, 1779, 1783, B.printShop(), { place: "kollock", name: "Shepard Kollock's 1779 Print Shop", by: -94, lbl: "Kollock Press 1779", s: .88 }),
      item(1365, GROUND + 4, 1781, 1782, B.bakeOvens(), { place: "kollock", name: "Washington's 1781 Brick Bake Ovens", by: -76, lbl: "1781 Bread Ovens", s: .82 }),
      item(1365, GROUND, 1895, 9999, B.foursquare("#d8b989"), { name: "East Main Foursquare", s: .82 }),
      // Fishawack Ford (Lenape wetus before Day's Bridge)
      item(1355, GROUND - 4, 1500, 1709, B.wetu(), { place: "fishawack", name: "Fishawack Lenape Crossing", by: -62, lbl: "Fishawack Ford" }),
      item(1415, GROUND - 2, 1500, 1709, B.fire()),
      item(1545, GROUND - 4, 1500, 1709, B.wetu(), { s: .88 }),
      item(1555, GROUND, 1750, 9999, B.farmhouse("#ece3ce", 92, "#5d4636"), { name: "Passaic Crossing Homestead", s: .82 })
    ].join("");

    const people = [
      [1500, 1695, V.walker(), 34, 0, 1, 0], [1500, 1695, V.walker("#8a5a32"), 34, -6, -1, 0],
      [1710, 1845, V.oxcart(), 40, -10, 1, 0], [1775, 1783, V.soldier(), 26, -4, 1, 0], [1775, 1783, V.soldier(), 26, -8, 1, 1],
      [1801, 1865, V.stagecoach(), 16, -4, -1, 1], [1840, 1918, V.buggy(), 20, -8, 1, 0],
      [1890, 9999, V.bicycle(), 22, -14, -1, 1],
      [1905, 1942, V.modelT(), 12, -6, -1, 1], [1946, 1979, V.fifties(), 11, -3, 1, 0],
      [1975, 9999, V.modern(), 10, -7, -1, 1], [1923, 1965, V.jogger(), 24, -9, 1, 0],
      [1980, 9999, V.jogger(), 30, -12, 1, 0], [1990, 9999, V.stroller(), 40, -20, -1, 1]
    ].map(([f, t, svg, dur, del, dir, lane]) =>
      `<g class="it veh" data-from="${f}" data-to="${t}"><g class="grow"><g class="mover ${dir < 0 ? "rev" : ""}" style="animation-duration:${dur}s;animation-delay:${del}s"><g transform="translate(0,${GROUND + 34 + lane * 22})${dir < 0 ? " scale(-1,1)" : ""}">${svg}</g></g></g></g>`).join("");

    const trains = [
      [1837, 1930, T.steam(), 13], [1931, 1983, T.electric(), 11], [1984, 9999, T.njt(), 10]
    ].map(([f, t, svg, dur]) => `<g class="it veh" data-from="${f}" data-to="${t}"><g class="grow"><g class="mover train" style="animation-duration:${dur}s"><g transform="translate(0,${BACK - 16})">${svg}</g></g></g></g>`).join("");

    return `<svg class="mw-scene" viewBox="0 175 ${W} ${H - 175}" preserveAspectRatio="xMidYMax slice" role="img" aria-label="Illustrated historical panorama of Chatham Borough and Chatham Township">
      <defs>
        <linearGradient id="skyG" x1="0" y1="0" x2="0" y2="1"><stop id="sk0" offset="0"/><stop id="sk1" offset=".65"/><stop id="sk2" offset="1"/></linearGradient>
        <radialGradient id="sunG"><stop offset="0" stop-color="#fff6d8"/><stop offset=".35" stop-color="#ffe2a0" stop-opacity=".9"/><stop offset="1" stop-color="#ffd27a" stop-opacity="0"/></radialGradient>
        <linearGradient id="ridgeG" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#5f7e7a"/><stop offset="1" stop-color="#3d5a4c"/></linearGradient>
        <linearGradient id="hillG" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#7f9a5a"/><stop offset="1" stop-color="#5d7c44"/></linearGradient>
        <linearGradient id="grassG" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#6f8f4a"/><stop offset="1" stop-color="#4e6e36"/></linearGradient>
        <linearGradient id="vig" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#000" stop-opacity="0"/><stop offset=".8" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".25"/></linearGradient>
      </defs>
      <rect width="${W}" height="${H}" fill="url(#skyG)"/>
      <circle class="sun" cx="1280" cy="295" r="150" fill="url(#sunG)"/><circle class="sun" cx="1280" cy="295" r="38" fill="#fff1c4"/>
      <g class="clouds">${[[110, 250, 1], [520, 215, .8], [910, 268, 1.15], [1360, 225, .9]].map(([x, y, s], i) =>
        `<g class="cloud" style="animation-duration:${80 + i * 25}s;animation-delay:${-i * 30}s"><g transform="translate(${x},${y}) scale(${s})"><ellipse cx="0" cy="0" rx="70" ry="20" fill="#fff" opacity=".8"/><ellipse cx="-30" cy="-12" rx="34" ry="20" fill="#fff" opacity=".85"/><ellipse cx="22" cy="-16" rx="40" ry="24" fill="#fff" opacity=".85"/></g></g>`).join("")}</g>
      <g class="birds">${[0, 1, 2, 3].map(i => `<path class="bird" style="animation-delay:${-i * 4}s;animation-duration:${26 + i * 3}s" d="M0 0 q6 -6 12 0 q6 -6 12 0" transform="translate(0,${205 + i * 18})" stroke="#2a221c" stroke-width="2" fill="none"/>`).join("")}</g>
      <path d="M0 ${ridgeY(0).toFixed(0)} ${Array.from({ length: 33 }, (_, i) => `L${i * 50} ${ridgeY(i * 50).toFixed(0)}`).join(" ")} L1600 640 L0 640Z" fill="url(#ridgeG)"/>
      <g class="ridge-trees">${ridgeTrees}</g>
      <path d="M0 438 Q220 402 440 420 T880 418 T1320 412 T1600 422 V640 H0Z" fill="url(#hillG)"/>
      <g class="fields" data-k="fields">${fields}</g>
      <g class="woods" data-k="woods">${woods}</g>
      <path class="river" d="M1410 422 Q1445 462 1455 505 T1475 595 T1490 640" stroke="#6aa4bc" stroke-width="34" fill="none" stroke-linecap="round" opacity=".92"/>
      <path d="M1414 432 Q1446 468 1456 508 T1476 598" stroke="rgba(255,255,255,.35)" stroke-width="3" stroke-dasharray="10 14" fill="none"/>
      ${orchard}
      <!-- 1914 Lackawanna concrete embankment & Passaic River arch viaduct -->
      <g class="it" data-from="1914" data-to="9999"><g class="grow">
        <path d="M0 ${BACK - 14} H1600 V${BACK + 10} H1500 A20 14 0 0 0 1465 ${BACK + 10} H1455 A20 14 0 0 0 1420 ${BACK + 10} H0Z" fill="#9a9184"/>
        ${Array.from({ length: 36 }, (_, i) => `<path d="M${i * 44} ${BACK - 14} v24" stroke="rgba(0,0,0,.14)"/>`).join("")}
      </g></g>
      <g class="it" data-from="1837" data-to="9999"><g class="grow"><path class="rails" d="M0 ${BACK - 16} H1600" stroke="#3a3330" stroke-width="4"/><path d="M0 ${BACK - 12} H1600" stroke="#6b5a48" stroke-width="5" stroke-dasharray="4 8"/></g></g>
      <!-- December 1930 Lackawanna overhead electric catenary -->
      <g class="it" data-from="1930" data-to="9999"><g class="grow">${Array.from({ length: 9 }, (_, i) => `<path d="M${i * 200 + 40} ${BACK - 16} v-76 M${i * 200 + 28} ${BACK - 86} h24" stroke="#4a4440" stroke-width="3"/>`).join("")}<path d="M0 ${BACK - 82} H1600" stroke="#4a4440" stroke-width="1.5"/></g></g>
      ${back}
      ${trains}
      <rect x="0" y="${GROUND - 2}" width="1432" height="${H - GROUND}" fill="url(#grassG)"/>
      <rect x="1498" y="${GROUND - 2}" width="${W - 1498}" height="${H - GROUND}" fill="url(#grassG)"/>
      <g class="road">
        <rect class="road-dirt" x="0" y="${GROUND + 18}" width="1428" height="44" fill="#b59a6e"/>
        <rect class="road-dirt" x="1502" y="${GROUND + 18}" width="98" height="44" fill="#b59a6e"/>
        <rect class="road-paved it-fade" data-from="1912" x="0" y="${GROUND + 18}" width="1428" height="44" fill="#6f6862"/>
        <rect class="road-paved it-fade" data-from="1912" x="1502" y="${GROUND + 18}" width="98" height="44" fill="#6f6862"/>
        <rect class="road-asphalt it-fade" data-from="1950" x="0" y="${GROUND + 18}" width="1428" height="44" fill="#4a4746"/>
        <rect class="road-asphalt it-fade" data-from="1950" x="1502" y="${GROUND + 18}" width="98" height="44" fill="#4a4746"/>
        <path class="it-fade" data-from="1950" d="M0 ${GROUND + 40} H1424 M1506 ${GROUND + 40} H${W}" stroke="#f3cf7a" stroke-width="2.5" stroke-dasharray="26 22"/>
        <path class="it-fade" data-from="1912" d="M0 ${GROUND + 16} H1428 M1502 ${GROUND + 16} H${W}" stroke="#cfc6b6" stroke-width="4"/>
      </g>
      ${bridges}
      ${front}
      ${streetMaples}
      ${lamps}
      ${people}
      <rect width="${W}" height="${H}" fill="url(#vig)" pointer-events="none"/>
    </svg>
    <div class="scene-grain"></div>
    <div class="scene-medium"><span></span></div>`;
  }

  /* ---------- per-year styling ---------- */
  const skies = [
    [1500, ["#f6d9a8", "#f3c48a", "#e8b07a"]],
    [1710, ["#f2dcae", "#efd09a", "#e2b886"]],
    [1800, ["#e9dcb8", "#efd8a8", "#e7c690"]],
    [1860, ["#d9d3bc", "#e8d6ae", "#e2c79a"]],
    [1920, ["#c9d6d2", "#e5dcbc", "#e6cfa2"]],
    [1950, ["#9fc7dc", "#d6e4e6", "#f0dcb4"]],
    [2000, ["#86bfe0", "#cfe6f0", "#f4e2bf"]],
    [2026, ["#7ab8e2", "#cde7f3", "#f6e4c0"]]
  ];
  const lerp = (a, b, t) => a + (b - a) * t;
  const hex = h => [1, 3, 5].map(i => parseInt(h.slice(i, i + 2), 16));
  const mix = (h1, h2, t) => "#" + hex(h1).map((v, i) => Math.round(lerp(v, hex(h2)[i], t)).toString(16).padStart(2, "0")).join("");
  function skyFor(y) {
    for (let i = 0; i < skies.length - 1; i++) {
      const [y0, c0] = skies[i], [y1, c1] = skies[i + 1];
      if (y <= y1) { const t = Math.max(0, (y - y0) / (y1 - y0)); return c0.map((c, k) => mix(c, c1[k], t)); }
    }
    return skies[skies.length - 1][1];
  }
  function mediumFor(y) {
    if (y < 1680) return ["Imagined", "Before colonial deeds"];
    if (y < 1839) return ["As if painted", "early Passaic Valley canvas"];
    if (y < 1900) return ["As if photographed", "19th-century albumen print"];
    if (y < 1935) return ["As if on a postcard", "Lackawanna real-photo postcard"];
    if (y < 1975) return ["As if on Kodachrome", "mid-century color slide"];
    return ["Today-ish", "full color"];
  }
  function filterFor(y) {
    if (y < 1680) return "sepia(.25) saturate(1.1) contrast(.95) brightness(1.02)";
    if (y < 1839) return "sepia(.3) saturate(1.15) contrast(.95) brightness(1.03)";
    if (y < 1900) return "sepia(.85) saturate(.55) contrast(1.05) brightness(.97)";
    if (y < 1935) return `sepia(${(.7 - (y - 1900) / 35 * .35).toFixed(2)}) saturate(${(.6 + (y - 1900) / 35 * .35).toFixed(2)}) contrast(1.04)`;
    if (y < 1975) return "sepia(.12) saturate(1.3) contrast(1.06) hue-rotate(-6deg)";
    return "none";
  }

  MW.SceneKit = { B, tree, V, T, item, label };

  MW.Scene = function (host) {
    host.classList.add("scene-host");
    host.innerHTML = build();
    const svg = host.querySelector("svg");
    const items = [...svg.querySelectorAll(".it")];
    const fades = [...svg.querySelectorAll(".it-fade")];
    const fields = svg.querySelector(".fields"), woods = svg.querySelector(".woods");
    const medium = host.querySelector(".scene-medium span"), grain = host.querySelector(".scene-grain");
    const [s0, s1, s2] = ["#sk0", "#sk1", "#sk2"].map(s => svg.querySelector(s));

    svg.addEventListener("click", e => {
      const g = e.target.closest("[data-place]"); if (!g || g.classList.contains("off")) return;
      const p = MW.places.find(p => p.id === g.dataset.place); if (!p) return;
      e.stopPropagation(); MW.popover(MW.placeCard(p), e.clientX, e.clientY);
    });
    svg.addEventListener("keydown", e => {
      if (e.key !== "Enter" && e.key !== " ") return;
      const g = e.target.closest("[data-place]"); if (!g) return;
      const p = MW.places.find(p => p.id === g.dataset.place); const r = g.getBoundingClientRect();
      e.preventDefault(); MW.popover(MW.placeCard(p), r.left + r.width / 2, r.top + r.height / 2);
    });

    function setYear(y) {
      items.forEach(g => {
        const on = y >= +g.dataset.from && y <= +g.dataset.to;
        g.classList.toggle("off", !on);
        if (g.dataset.place) g.setAttribute("tabindex", on ? "0" : "-1");
        if (on && g.dataset.grow) {
          const k = Math.max(.3, Math.min(1, (y - +g.dataset.grow) / 45 + .3));
          g.firstChild.style.transform = `scale(${k.toFixed(3)})`;
        } else if (g.dataset.grow) g.firstChild.style.transform = "";
      });
      fades.forEach(el => el.style.opacity = y >= +el.dataset.from ? 1 : 0);
      const farm = y < 1710 ? 0 : y < 1770 ? (y - 1710) / 60 : y < 1900 ? 1 : y < 1965 ? 1 - (y - 1900) / 65 : 0;
      const wood = y < 1710 ? 1 : y < 1800 ? 1 - (y - 1710) / 90 * .78 : y < 1910 ? .22 : Math.min(.75, .22 + (y - 1910) / 120);
      fields.style.opacity = farm.toFixed(2); woods.style.opacity = wood.toFixed(2);
      const [a, b, c] = skyFor(y); s0.setAttribute("stop-color", a); s1.setAttribute("stop-color", b); s2.setAttribute("stop-color", c);
      svg.style.filter = filterFor(y);
      grain.style.opacity = y >= 1839 && y < 1975 ? .5 : y < 1839 ? .18 : 0;
      const [m, sub] = mediumFor(y); medium.innerHTML = `<b>${m}</b> · ${sub}`;
      host.dataset.era = MW.eraFor(y).id;
    }
    return { setYear };
  };
})();
