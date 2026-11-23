/* ==========================================================================
   Chatham Through Time: the historical dataset for Chatham Borough & Chatham Township ("The Chathams").
   Every dated fact below comes from one of the sources in MW.sources.
   Narrative passages ("what it was like") are our own synthesis of those facts.
   ========================================================================== */
var MW = window.MW = window.MW || {};

MW.town = {
  name: "Chatham", state: "NJ", siteTitle: "Chatham Through Time",
  tagline: "A fan history of Chatham Borough & Chatham Township, NJ",
  siteUrl: "https://wildvegangoose.github.io/chatham/",
  center: [40.7405, -74.3850], geocodeSuffix: ", Chatham, NJ", todayLabel: "today's Chathams",
  neighbor: { name: "Maplewood", url: "https://wildvegangoose.github.io/maplewood/" }
};

MW.sources = {
  wikiBoro:       { label: "Wikipedia: Chatham Borough, New Jersey", url: "https://en.wikipedia.org/wiki/Chatham_Borough,_New_Jersey" },
  wikiTwp:        { label: "Wikipedia: Chatham Township, New Jersey", url: "https://en.wikipedia.org/wiki/Chatham_Township,_New_Jersey" },
  chsTour:        { label: "Chatham Historical Society: Chatham's Story & Walking Tour", url: "https://www.chathamnjhistoricalsociety.org/chathams-story" },
  exploreChatham: { label: "Chatham Borough Historic Preservation Commission", url: "https://www.chathamborough.org/resident/historic-preservation" },
  vanderpoel:     { label: "Ambrose E. Vanderpoel, History of Chatham, New Jersey (1921; 1959 reprint)", url: "https://catalog.hathitrust.org/Record/009562835" },
  white:          { label: "Philhower & White, Chatham: At the Crossing of the Fishawack", url: "https://catalog.hathitrust.org/Record/100637835" },
  fishawack:      { label: "Library of the Chathams: The Fishawack Papers (14 vols.)", url: "https://chathamlibrary.org/fishawack-papers/" },
  libHist:        { label: "Library of the Chathams: Local History & New Jersey Room", url: "https://chathamlibrary.org/local-history/" },
  courier:        { label: "The Chatham Courier Digital Archive, 1946–present (Library of the Chathams)", url: "https://www.digifind-it.com/chatham/" },
  habs:           { label: "Historic American Buildings Survey (HABS), Library of Congress, 1936–1938", url: "https://www.loc.gov/pictures/search/?q=Chatham+Morris+County+NJ&sp=1&co=hh" },
  njdep:          { label: "NJ DEP Historic Preservation Office: Morris County Register of Historic Places", url: "https://www.nj.gov/dep/hpo/1identify/lists/morris.pdf" },
  nrBoisaubin:    { label: "National Register of Historic Places: Boisaubin Manor (#76001175)", url: "https://npgallery.nps.gov/AssetDetail/NRIS/76001175" },
  nrGibbons:      { label: "National Register of Historic Places: William Gibbons Stable & Farm (#05000222)", url: "https://npgallery.nps.gov/AssetDetail/NRIS/05000222" },
  nrDusenberry:   { label: "National Register of Historic Places: Presbyterian Parsonage / Dusenberry House (#79001515)", url: "https://npgallery.nps.gov/AssetDetail/NRIS/79001515" },
  nrBower:        { label: "National Register of Historic Places: David S. Bower House (#82001045)", url: "https://npgallery.nps.gov/AssetDetail/NRIS/82001045" },
  nrRedBrick:     { label: "Chatham Township Historical Society: Red Brick Schoolhouse Museum (NRHP #100007872)", url: "https://chathamtownshiphistoricalsociety.org/red-brick-schoolhouse-museum/" },
  speedBump:      { label: "The New York Times (June 7, 1906): Automobiles Stopped by Chatham's Bumps", url: "https://www.nytimes.com/1906/06/07/archives/automobiles-stopped-by-chathams-bumps-new-jersey-borough-first-to.html" },
  sanborn1901:    { label: "Sanborn Fire Insurance Map, Chatham, 1901 (public domain)", url: "https://commons.wikimedia.org/wiki/Category:Sanborn_Fire_Insurance_Map_from_Chatham,_Morris_County,_New_Jersey,_1901" },
  sanborn1909:    { label: "Sanborn Fire Insurance Map, Chatham, August 1909 (public domain)", url: "https://commons.wikimedia.org/wiki/Category:Sanborn_Fire_Insurance_Map_from_Chatham,_Morris_County,_New_Jersey,_1909" },
  sanborn1921:    { label: "Sanborn Fire Insurance Map, Chatham, 1921 (public domain)", url: "https://commons.wikimedia.org/wiki/Category:Sanborn_Fire_Insurance_Map_from_Chatham,_Morris_County,_New_Jersey,_1921" },
  stationWiki:    { label: "Wikipedia: Chatham station (NJ Transit)", url: "https://en.wikipedia.org/wiki/Chatham_station_(NJ_Transit)" },
  summitBey:      { label: "Summit Historical Society: Hranoush \"Madame\" Bey", url: "https://www.summitnjhistory.org/madame-bey" },
  beyWiki:        { label: "Wikipedia: Hranoush Sidky Bey", url: "https://en.wikipedia.org/wiki/Hranoush_Sidky_Bey" },
  gottscho:       { label: "Gottscho-Schleisner Collection, Library of Congress (public domain)", url: "https://www.loc.gov/pictures/collection/gsc/" },
  greatSwamp:     { label: "U.S. Fish & Wildlife Service: Great Swamp National Wildlife Refuge", url: "https://www.fws.gov/refuge/great-swamp/about-us" },
  gswa:           { label: "Great Swamp Watershed Association: History of the Watershed", url: "https://www.greatswamp.org/about/" },
  snyder:         { label: "John P. Snyder, The Story of New Jersey's Civil Boundaries, 1606–1968", url: "https://www.nj.gov/dep/njgs/enviroed/oldpubs/bulletin67.pdf" },
  munsell:        { label: "W. W. Munsell, History of Morris County, New Jersey (1882)", url: "https://catalog.hathitrust.org/Record/009562831" },
  schools:        { label: "Wikipedia: School District of the Chathams", url: "https://en.wikipedia.org/wiki/School_District_of_the_Chathams" },
  tiger:          { label: "U.S. Census TIGER municipal boundaries (older outlines are approximate)", url: "https://tigerweb.geo.census.gov/" }
};

/* Combined U.S. Census counts for The Chathams (Chatham Borough + Chatham Township).
   From 1900 onward, counts are exact sums of Borough + Township decennial totals
   (Borough 1900–2020: 1,361; 1,874; 2,421; 3,869; 4,888; 7,391; 9,517; 9,566; 8,537; 8,007; 8,460; 8,962; 9,212; 2024 est. 10,062.
    Township 1900–2020: 620; 812; 735; 1,115; 2,026; 2,825; 5,931; 8,093; 8,883; 9,361; 10,086; 10,452; 10,983; 2023 est. 11,127).
   1880 and 1890 combine recorded Chatham village census (738; 780) with approximate present-day Township area (~620) after excluding Madison & Florham Park. */
MW.census = [
  [1880, 1358], [1890, 1400], [1900, 1981], [1910, 2686], [1920, 3156], [1930, 4984],
  [1940, 6914], [1950, 10216], [1960, 15448], [1970, 17659], [1980, 17420], [1990, 17368],
  [2000, 18546], [2010, 19414], [2020, 20195], [2024, 21189]
];
MW.populationFor = function (year) {
  const c = MW.census;
  if (year < 1680) return { approx: true, label: "Lenape homeland", note: "Seasonal Minsi Lenape crossing at Fishawack" };
  if (year < 1773) return { approx: true, label: "about 30 dwellings", note: "Colonial farms & mills at John Day's Bridge" };
  if (year < 1806) return { approx: true, label: "Revolutionary village", note: "Split between Morris & Hanover Townships" };
  if (year < 1880) return { approx: true, label: "2,019–4,276 (old twp.)", note: "1806 Township included Madison & Florham Park" };
  if (year >= c[c.length - 1][0]) return { value: c[c.length - 1][1], note: "Census estimate (Borough + Township)" };
  for (let i = 0; i < c.length - 1; i++) {
    const [y0, p0] = c[i], [y1, p1] = c[i + 1];
    if (year >= y0 && year <= y1) {
      const val = Math.round(p0 + (p1 - p0) * (year - y0) / (y1 - y0));
      const note = year < 1900 ? "Village census + approx. rural Township" : undefined;
      return { value: val, note };
    }
  }
  return { value: c[0][1] };
};

/* --------------------------------------------------------------------------
   What the place was called across the centuries.
   -------------------------------------------------------------------------- */
MW.names = [
  { from: 1500, to: 1679, name: "Fishawack · Lenapehoking", sub: "the Minsi Lenape crossing of the Passaic River" },
  { from: 1680, to: 1772, name: "John Day's Bridge", sub: "ford, mills and farmsteads on the Morris–Hanover line" },
  { from: 1773, to: 1805, name: "Chatham", sub: "named Nov. 1773 for William Pitt, 1st Earl of Chatham" },
  { from: 1806, to: 1888, name: "Chatham Township", sub: "formed Feb. 12, 1806 (with Bottle Hill/Madison & Columbia/Florham Park)" },
  { from: 1889, to: 1891, name: "Chatham Township", sub: "after Madison Borough separated in December 1889" },
  { from: 1892, to: 1896, name: "Chatham Village & Township", sub: "semi-autonomous Village formed inside the Township (Aug. 1892)" },
  { from: 1897, to: 1898, name: "Chatham Borough & Township", sub: "Borough independent March 1, 1897; Florham Park leaves March 1899" },
  { from: 1899, to: 2100, name: "The Chathams", sub: "Chatham Borough & Chatham Township, Morris County, NJ" }
];
MW.nameFor = y => MW.names.find(n => y >= n.from && y <= n.to) || MW.names[MW.names.length - 1];

/* Seats of local government across Borough and Township history. */
MW.seats = [
  { id: "seat-morris", from: 1740, to: 1805, title: "Morris & Hanover Township meetings", place: "Morristown Green & Whippany, 7 miles northwest",
    lat: 40.7968, lon: -74.4815, offmap: true,
    text: "Before Chatham Township was created in 1806, Main Street (the old King's Highway) divided Hanover Township on the north from Morris Township on the south. Residents traveled to Morristown and Hanover town meetings.",
    sources: ["snyder", "vanderpoel"] },
  { id: "seat-tavern", from: 1806, to: 1891, title: "Original Chatham Township meetings", place: "Village taverns & halls along Main Street and in Bottle Hill",
    lat: 40.7408, lon: -74.3830,
    text: "Incorporated on February 12, 1806 from Morris and Hanover Townships, original Chatham Township rotated annual town meetings between public houses and halls in Chatham village and Bottle Hill (Madison).",
    sources: ["snyder", "munsell"] },
  { id: "seat-oldboro", from: 1892, to: 1987, title: "Old Chatham Village & Borough Hall", place: "Fairmount Avenue south of Main Street, Chatham Borough",
    lat: 40.7404, lon: -74.3837,
    text: "After villagers voted to form Chatham Village (1892) and Chatham Borough (March 1, 1897), municipal offices and the volunteer fire department shared a brick Borough Hall on Fairmount Avenue just south of Main Street (shown on the 1909 and 1921 Sanborn maps).",
    sources: ["sanborn1909", "sanborn1921", "wikiBoro"] },
  { id: "seat-redbrick", from: 1958, to: 1988, title: "Chatham Township Hall (Red Brick Schoolhouse)", place: "24 Southern Boulevard, Chatham Township",
    lat: 40.72194, lon: -74.40361,
    text: "Deeded back to Chatham Township in 1956, the 1860 Mount Vernon Red Brick Schoolhouse served for thirty years (1958–1988) as Chatham Township Hall—through the Great Swamp jetport fight and postwar suburban growth.",
    sources: ["nrRedBrick", "wikiTwp"] },
  { id: "seat-borohall", from: 1988, to: 2100, title: "Chatham Borough Hall", place: "54 Fairmount Avenue, Chatham Borough",
    lat: 40.73849, lon: -74.38489,
    text: "Following the 1986 voter referendum uniting Borough and Township schools, the Borough converted its former 1922 Colonial Revival high school at 54 Fairmount Avenue into Chatham Borough Hall.",
    sources: ["wikiBoro", "schools"] },
  { id: "seat-twphall", from: 1988, to: 2100, title: "Chatham Township Municipal Building", place: "58 Meyersville Road, Chatham Township",
    lat: 40.70431, lon: -74.43480,
    text: "In 1988 Chatham Township moved its municipal offices and police headquarters from the Red Brick Schoolhouse to the modern Township Municipal Building at 58 Meyersville Road on the edge of the Great Swamp.",
    sources: ["wikiTwp", "nrRedBrick"] }
];
MW.seatsFor = y => MW.seats.filter(s => y >= s.from && y <= s.to);

MW.jurisdictionsFor = y => (window.MW_JURISDICTIONS || []).filter(j => y >= j.from && y <= j.to);

/* --------------------------------------------------------------------------
   Eras: 10 chapters of Chatham Borough & Chatham Township history.
   -------------------------------------------------------------------------- */
MW.eras = [
  {
    id: "lenape", from: 1500, to: 1679, name: "Fishawack & the Minisink Trail",
    tagline: "Ancient shallow-water ford behind the Watchung gap",
    palette: ["#f3d9a4", "#c98b5b"],
    story: [
      "Thirteen thousand years before commuters rode the Morristown Line, melting Wisconsin glacial ice left behind Glacial Lake Passaic—draining into the winding Passaic River and the 55-square-mile marshes of the Great Swamp.",
      "Minsi Lenape bands followed the Minisink Trail from the Delaware Water Gap through Hobart Gap in the Watchung Mountains to ford the shallow Passaic River at a seasonal fishing ground they called Fishawack (roughly \"place of fish\").",
      "That ancient footpath up from the river ford became colonial King's Highway, the 1801 Morris Turnpike, and today's Main Street."
    ],
    sources: ["chsTour", "vanderpoel", "white", "greatSwamp"]
  },
  {
    id: "daysbridge", from: 1680, to: 1772, name: "John Day's Bridge",
    tagline: "Timber crossing, waterwheels and colonial farmsteads",
    palette: ["#f1e3bd", "#9c7a4a"],
    story: [
      "In 1680 the East Jersey Proprietors purchased the Passaic Valley tract from Lenape leaders, and between 1710 and the 1720s colonial settlers led by John and Daniel Day cleared farms and built a wooden bridge across the river.",
      "Known for sixty years as John Day's Bridge, the settlement straddled the 1740 boundary between Hanover Township on the north and Morris Township on the south, while farm families also settled the Green Village crossroads along the rim of the Great Swamp.",
      "Sawmills, gristmills, forges and merchant Jacob Morrell's c. 1740 homestead and general store anchored the river approach."
    ],
    sources: ["vanderpoel", "chsTour", "snyder", "wikiTwp"]
  },
  {
    id: "revolution", from: 1773, to: 1800, name: "Pitt's Name, the Rebel Printer & Bread Ovens",
    tagline: "Guarding Hobart Gap for Washington's army",
    palette: ["#efe0c2", "#8a6a3e"],
    story: [
      "In November 1773 villagers petitioned to rename John Day's Bridge \"Chatham\" in honor of William Pitt, 1st Earl of Chatham, champion of American colonists' rights in Parliament. Two years later patriots raised a Liberty Pole at Main Street and University Avenue.",
      "Because Hobart Gap guarded Washington's 1777 and 1779–80 Morristown winter camps (including the 1777 Loantaka Valley encampment in northern Chatham Township), militia held the Passaic bridge while Lt. Shepard Kollock printed The New-Jersey Journal here starting February 16, 1779.",
      "In August 1781 Washington lodged at the Jacob Morrell House and ordered French bakers to build 65-foot brick bake ovens beside the river—turning out 3,000 loaves a day to convince British spies in Manhattan a New York siege was imminent while Allied armies slipped south to win at Yorktown."
    ],
    sources: ["chsTour", "vanderpoel", "exploreChatham", "nrBoisaubin"]
  },
  {
    id: "turnpike", from: 1801, to: 1836, name: "Morris Turnpike & 1806 Township",
    tagline: "Tollgates, stagecoaches and Thoroughbred pastures",
    palette: ["#ecdcb7", "#7b5f39"],
    story: [
      "Chartered on March 9, 1801, the Morris Turnpike turned Main Street into a busy stagecoach and iron-wagon toll road from Elizabethport through Hobart Gap to Morristown and Sussex.",
      "On February 12, 1806 the Legislature carved Chatham Township out of Morris and Hanover Townships—originally uniting today's Chatham Borough, Chatham Township, Madison (Bottle Hill) and Florham Park (Columbia).",
      "In the 1820s and 1830s French Royal Guardsman Vincent Boisaubin built Greek Revival Boisaubin Manor on Treadwell Avenue (hosting the Marquis de Lafayette in 1825), while William Gibbons raised legendary champion mare Fashion in his Loantaka Way stables."
    ],
    sources: ["snyder", "munsell", "nrBoisaubin", "nrGibbons"]
  },
  {
    id: "railroad", from: 1837, to: 1879, name: "Iron Rails, Mills & Civil War Crossroads",
    tagline: "Steam trains pull Chatham's center west from the river",
    palette: ["#e8dcc0", "#5a4c40"],
    story: [
      "Regular Morris & Essex Railroad passenger trains steamed into Chatham on September 28, 1837, pulling village commerce half a mile west from the Passaic River mills toward Fairmount and Passaic avenues.",
      "Rev. Joseph Meeker Ogden's 1848 Greek Revival parsonage rose at 186 Main Street, while rural Chatham Township families built the two-story Mount Vernon Red Brick Schoolhouse at 24 Southern Boulevard in 1860—school downstairs, Sunday chapel upstairs.",
      "During the Civil War twenty Chatham men marched off to the Union Army and only eleven came home; anxious families gathered daily for telegraph and war news at Hudson Minton's Post Office and Kelley's General Store."
    ],
    sources: ["stationWiki", "nrDusenberry", "nrRedBrick", "chsTour"]
  },
  {
    id: "rosecapital", from: 1880, to: 1913, name: "Rose Greenhouses, Borough Split & Speed Bumps",
    tagline: "Acres of winter glass and airborne 1906 motorcars",
    palette: ["#e3d6b8", "#4f3b4a"],
    story: [
      "Discovering that Chatham's clear ridge-top winter sunlight and fast Lackawanna express trains were ideal for cut flowers, growers built acres of steam-heated glass rose greenhouses across Hillside Avenue, Watchung Avenue, West Main Street and Green Village—while summer guests filled the Fairview House hotel.",
      "Protesting that village taxpayers paid 40% of Chatham Township's taxes for 7% of road outlays, residents formed Chatham Village in August 1892 and incorporated independent Chatham Borough on March 1, 1897 (sandwiched between Madison's 1889 and Florham Park's 1899 secessions).",
      "In April 1906 Mayor Frank Kelley curbed 40-mph automobiles on Main Street with five-inch raised cobblestone crosswalks—immortalized by The New York Times on June 7, 1906 as the world's first traffic speed bumps."
    ],
    sources: ["sanborn1909", "wikiBoro", "snyder", "speedBump"]
  },
  {
    id: "elevated", from: 1914, to: 1929, name: "The 1914 Viaduct & Commuter Suburb",
    tagline: "Stone station plazas and the 1924 brick library",
    palette: ["#e6dcc4", "#8e2914"],
    story: [
      "In 1913–14 the Delaware, Lackawanna & Western Railroad eliminated Chatham's grade crossings, lifting double tracks onto concrete arches across the Passaic River and opening the stone Chatham Station on June 19, 1914.",
      "Tree-lined streets of Colonial Revival, Foursquare, Craftsman and Tudor homes blossomed along Fairmount, Hillside, Washington, Coleman and Lafayette avenues, prompting the Borough's new brick high school at 54 Fairmount Avenue in 1922.",
      "After fire claimed the old Fairview House hotel, townspeople dedicated WWI Memorial Park and opened the brick Library of the Chathams at 214 Main Street in 1924, while Madame Hranoush Bey opened her River Road boxing camp in Chatham Township in 1923."
    ],
    sources: ["stationWiki", "libHist", "summitBey", "sanborn1921"]
  },
  {
    id: "champions", from: 1930, to: 1958, name: "Electric Trains & River Road Champions",
    tagline: "Edison's catenary wires and heavyweight legends",
    palette: ["#dfe3d0", "#2f4f5a"],
    story: [
      "On December 18, 1930 Lackawanna overhead electric trains hummed through Chatham Station, cutting commute times to Hoboken even as Depression-era HABS architects measured Chatham's colonial Day family homesteads.",
      "Down on River Road in Chatham Township, world champions Gene Tunney, Max Schmeling, Primo Carnera, James J. \"Cinderella Man\" Braddock, Sugar Ray Robinson, Rocky Graziano, Jersey Joe Walcott and Floyd Patterson chopped wood and sparred at Madame Bey's country camp.",
      "After World War II, young families doubled The Chathams' combined population from 6,914 in 1940 to over 15,000 by 1960, turning Township dairy pastures and rose nurseries into neighborhoods."
    ],
    sources: ["stationWiki", "habs", "summitBey", "wikiTwp"]
  },
  {
    id: "greatswamp", from: 1959, to: 1987, name: "Saving the Great Swamp",
    tagline: "Citizen conservationists defeat a 10,000-acre super-jetport",
    palette: ["#d4dfd4", "#2d5240"],
    story: [
      "In December 1959 the Port of New York Authority unveiled plans to bulldoze Green Village, Meyersville and 10,000 acres of the Great Swamp for a four-runway metropolitan jetport larger than Newark, LaGuardia and Idlewild combined.",
      "Over 6,000 citizens and 462 organizations raised funds to buy 3,000 acres parcel by parcel, gifting them to establish Great Swamp National Wildlife Refuge on November 3, 1960—and winning Congress's September 28, 1968 designation of the Interior Department's very first Wilderness Area.",
      "Meanwhile Borough and Township drew steadily closer: making the Library of the Chathams a joint municipal library in 1974 and voting in November 1986 to merge their separate schools into the regional School District of the Chathams."
    ],
    sources: ["greatSwamp", "gswa", "libHist", "schools"]
  },
  {
    id: "today", from: 1988, to: 2026, name: "Two Municipalities, One Chatham",
    tagline: "Midtown Direct, preserved streetscapes and open trails",
    palette: ["#cfe0ea", "#1f3a2e"],
    story: [
      "In 1988 the unified School District of the Chathams took effect, allowing Chatham Borough to convert its 1922 Fairmount Avenue school into Borough Hall while Chatham Township opened its Meyersville Road municipal building and preserved the 1860 Red Brick Schoolhouse as a museum.",
      "NJ Transit's June 1996 Midtown Direct launch gave Chatham a one-seat ride into New York Penn Station, even as Heyl Roses in Green Village closed in 1999 as New Jersey's last commercial cut-rose greenhouse.",
      "Today some 21,000 neighbors across walkable Chatham Borough and wooded Chatham Township share schools, library, emergency squad, athletic fields and three centuries of Fishawack heritage."
    ],
    sources: ["wikiBoro", "wikiTwp", "schools", "nrRedBrick"]
  }
];
MW.eraFor = y => MW.eras.find(e => y >= e.from && y <= e.to) || MW.eras[MW.eras.length - 1];

/* --------------------------------------------------------------------------
   Dated historic places across Chatham Borough & Chatham Township.
   Places with `scope: "township"` lie in Madison or Florham Park and appear
   on Explore the Map only while part of original 1806 Chatham Township.
   -------------------------------------------------------------------------- */
MW.places = [
  { id: "fishawack", year: 1500, title: "Fishawack Ford & the Minisink Trail", kind: "nature",
    address: "Passaic River crossing at East Main Street, Chatham Borough",
    lat: 40.73918, lon: -74.37165,
    text: "Shallow rocky crossing of the Passaic River used for centuries by Minsi Lenape travelers moving through Hobart Gap between the Delaware Valley and coastal waters.",
    sources: ["chsTour", "white"] },
  { id: "lakeswamp", year: 1500, title: "Remnant Marshes of Glacial Lake Passaic", kind: "nature",
    address: "Great Swamp Basin, southern Chatham Township",
    lat: 40.70850, lon: -74.43900,
    text: "Left behind 13,000 years ago when Glacial Lake Passaic drained through Millington and Little Falls, creating rich Lenape hunting and waterfowl wetlands.",
    sources: ["greatSwamp", "gswa"] },
  { id: "daysbridge1710", year: 1710, title: "John Day's Timber Bridge", kind: "transport",
    address: "East Main Street at the Passaic River, Chatham Borough",
    lat: 40.73922, lon: -74.37170, end: 1913,
    text: "Early colonial timber span built by John and Daniel Day beside the Fishawack ford, giving the settlement its pre-1773 name \"John Day's Bridge\" until concrete arches replaced it.",
    sources: ["vanderpoel", "chsTour"] },
  { id: "morrell", year: 1740, title: "Jacob Morrell House (Washington's 1781 Lodging)", kind: "house",
    address: "63 Main Street, Chatham Borough",
    lat: 40.73928, lon: -74.37435, landmark: true,
    text: "Recognized as Main Street's oldest pre-Revolutionary house. Merchant Jacob Morrell kept a store next door, and General George Washington lodged here in late August 1781 while writing seventeen Yorktown dispatches.",
    sources: ["chsTour", "exploreChatham", "njdep"] },
  { id: "parrottmill", year: 1745, title: "Passaic River Mills & Parrott's Gristmill", kind: "commerce",
    address: "Parrott Mill Road & East Main Street, Chatham Borough",
    lat: 40.73985, lon: -74.37190, end: 1915,
    text: "Water-powered grist, saw, fulling and machine mills harnessed the Passaic drop here from colonial days through George T. Parrott's 19th-century flour mill and boating pond.",
    sources: ["chsTour", "vanderpoel"] },
  { id: "daymunn", year: 1750, title: "Day-Munn House", kind: "house",
    address: "25 Main Street, Chatham Borough",
    lat: 40.73922, lon: -74.37245,
    text: "18th-century Day family homestead near the Passaic River crossing, documented in twelve architectural sheets and photographs by the Historic American Buildings Survey in October 1938.",
    sources: ["habs", "chsTour"] },
  { id: "stephenday", year: 1760, title: "Stephen Day House", kind: "house",
    address: "62 Elmwood Avenue, Chatham Borough",
    lat: 40.74507, lon: -74.38196, landmark: true,
    text: "Colonial side-wing homestead of Patriot militia captain and Morris County judge Stephen Day, measured and photographed by HABS (Survey NJ-264) in April 1936.",
    sources: ["habs", "vanderpoel"] },
  { id: "lewisnoe", year: 1770, title: "Lewis Noe Farmstead", kind: "house",
    address: "Southern Boulevard / Noe Avenue area, Chatham Township",
    lat: 40.73620, lon: -74.42280,
    text: "Pre-Revolutionary Chatham Township farmstead associated with the colonial Noe family near the Great Swamp and Loantaka ridges (SHPO Historic Site).",
    sources: ["njdep", "wikiTwp"] },
  { id: "pricebaldwin", year: 1772, title: "Price-Baldwin House", kind: "house",
    address: "Southern Boulevard, Chatham Township",
    lat: 40.74260, lon: -74.43050,
    text: "Late-colonial Chatham Township homestead (expanded in the Greek Revival era) along the historic country road linking Green Village and Bottle Hill.",
    sources: ["njdep", "wikiTwp"] },
  { id: "naming1773", year: 1773, title: "Village Named \"Chatham\" for William Pitt", kind: "event",
    address: "Main Street, Chatham Borough",
    lat: 40.73960, lon: -74.37680,
    text: "In November 1773 inhabitants replaced \"John Day's Bridge\" with \"Chatham,\" honoring William Pitt, 1st Earl of Chatham, for defending American liberties in Parliament.",
    sources: ["vanderpoel", "wikiBoro"] },
  { id: "libertypole", year: 1775, title: "The 1775 Patriot Liberty Pole", kind: "event",
    address: "Main Street & University Avenue, Chatham Borough",
    lat: 40.73942, lon: -74.37520, end: 1800,
    text: "Villagers raised a tall Liberty Pole here at the outbreak of the Revolution; Shepard Kollock's 1780 newspaper masthead gave his address as \"near the Liberty Pole.\"",
    sources: ["chsTour", "vanderpoel"] },
  { id: "loantakacamp", year: 1777, title: "Continental Army Loantaka Valley Winter Encampment", kind: "event",
    address: "Loantaka Brook Valley east of Treadwell Avenue, Chatham Township",
    lat: 40.76420, lon: -74.44200, end: 1777,
    text: "From January to May 1777, following his victories at Trenton and Princeton, Washington quartered Continental regiments in log huts along the sheltered Lowantica (Loantaka) Valley.",
    sources: ["nrBoisaubin", "vanderpoel"] },
  { id: "kollock", year: 1779, title: "Shepard Kollock's Print Shop & 1781 Brick Ovens", kind: "event",
    address: "East Main Street & Shepard Kollock Park, Chatham Borough",
    lat: 40.73925, lon: -74.37185, landmark: true,
    text: "Site where Lt. Shepard Kollock launched The New-Jersey Journal on February 16, 1779, and where Washington built 65-foot brick bake ovens in August 1781 as a Yorktown ruse de guerre.",
    sources: ["chsTour", "exploreChatham", "vanderpoel"] },
  { id: "wmday", year: 1780, title: "Captain William Day House", kind: "house",
    address: "70 Main Street, Chatham Borough",
    lat: 40.73940, lon: -74.37490,
    text: "Vernacular Georgian farmhouse with beehive brick oven built in 1780 by Morris County militia Captain William Day and Nancy Bonnel; farmed into the early 20th century.",
    sources: ["chsTour", "exploreChatham"] },
  { id: "dayhamblen", year: 1785, title: "Day-Hamblen House", kind: "house",
    address: "142 Main Street, Chatham Borough",
    lat: 40.73978, lon: -74.37810,
    text: "Early timber-frame Day family dwelling on Main Street recorded by the Historic American Buildings Survey (HABS NJ,14-CHAT,3) in 1937.",
    sources: ["habs", "njdep"] },
  { id: "greenvillage", year: 1790, title: "Green Village Crossroads", kind: "house",
    address: "Green Village Road & Meyersville Road, Chatham Township",
    lat: 40.73882, lon: -74.44984, landmark: true,
    text: "18th-century rural hamlet on the northern rim of the Great Swamp—the sole historic village of 1806 Chatham Township that never seceded, still keeping its own 07935 ZIP code.",
    sources: ["wikiTwp", "gottscho"] },
  { id: "parrotthouse", year: 1795, title: "George T. Parrott House", kind: "house",
    address: "47 Main Street, Chatham Borough",
    lat: 40.73926, lon: -74.37360,
    text: "Gambrel-roofed Federal homestead (c. 1790–1800) associated with Chatham's prominent milling and civic Parrott family inside the Chatham Historic District.",
    sources: ["chsTour", "njdep"] },
  { id: "vanderpoel76", year: 1796, title: "Vanderpoel-Day-Crane House", kind: "house",
    address: "76 Main Street, Chatham Borough",
    lat: 40.73946, lon: -74.37535,
    text: "Built c. 1796 on East Main Street and expanded around 1880 with a Victorian medical office wing by town physician Dr. George M. Swaim.",
    sources: ["chsTour", "njdep"] },
  { id: "turnpike1801", year: 1801, title: "Morris Turnpike Chartered Along Main Street", kind: "transport",
    address: "Main Street through Hobart Gap, Chatham Borough",
    lat: 40.74020, lon: -74.38080,
    text: "Chartered March 9, 1801 from Elizabethport through Chatham and Morristown to Culver's Gap, bringing stagecoaches, drovers and iron-ore teams over Main Street.",
    sources: ["munsell", "vanderpoel"] },
  { id: "township1806", year: 1806, title: "Chatham Township Incorporated", kind: "civic",
    address: "Township-wide (originally including Madison & Florham Park)",
    lat: 40.73750, lon: -74.41200,
    text: "Created by Act of the Legislature on February 12, 1806 from parts of Morris and Hanover Townships, uniting Main Street, Bottle Hill, Columbia and Green Village under one committee.",
    sources: ["snyder", "wikiTwp"] },
  { id: "academy1806", year: 1806, title: "Old Chatham Academy (Moved 1873)", kind: "civic",
    address: "36–38 Summit Avenue (originally 200 Main Street), Chatham Borough",
    lat: 40.73855, lon: -74.37950,
    text: "Built c. 1806 as a two-story village school and meeting hall at 200 Main Street, then rolled onto logs in 1873 down Summit Avenue and converted into a double residence.",
    sources: ["chsTour", "exploreChatham"] },
  { id: "phipps100", year: 1815, title: "Phipps Homestead", kind: "house",
    address: "100 Main Street, Chatham Borough",
    lat: 40.73955, lon: -74.37625,
    text: "Early-19th-century Main Street homestead from which two Phipps brothers marched to fight in the Union Army during the Civil War.",
    sources: ["chsTour", "njdep"] },
  { id: "boisaubin", year: 1828, title: "Boisaubin Manor (\"Moneysunk\")", kind: "house",
    address: "95 Treadwell Avenue, Chatham Township",
    lat: 40.76750, lon: -74.44360, landmark: true,
    text: "Brick Greek Revival manor built 1822–34 by Louis XVI Royal Guardsman Vincent Boisaubin (host to Lafayette in 1825) and bought in 1890 by illustrator A. B. Frost. NRHP #76001175.",
    sources: ["nrBoisaubin", "njdep", "wikiTwp"] },
  { id: "madison1834", year: 1834, title: "Bottle Hill Renamed Madison (Still in Chatham Twp.)", kind: "event",
    address: "Main Street & Kings Road, Madison (part of Chatham Twp. until 1889)",
    lat: 40.75980, lon: -74.41720, end: 1889, scope: "township",
    text: "Chatham Township's northern village of Bottle Hill adopted the name Madison in 1834, remaining part of Chatham Township until incorporating as Madison Borough on December 27, 1889.",
    sources: ["snyder", "munsell"] },
  { id: "gibbons", year: 1836, title: "William Gibbons Stable & Farm (Home of \"Fashion\")", kind: "house",
    address: "Loantaka Way, Chatham Township",
    lat: 40.75340, lon: -74.44450,
    text: "1830s brick-and-timber Thoroughbred barn complex built by steamboat heir William Gibbons for his champion chestnut mare Fashion (foaled 1837). NRHP #05000222.",
    sources: ["nrGibbons", "njdep"] },
  { id: "railroad1837", year: 1837, title: "Morris & Essex Railroad Reaches Chatham", kind: "transport",
    address: "Railroad Avenue & Fairmount Avenue, Chatham Borough",
    lat: 40.74055, lon: -74.38340, end: 1914,
    text: "Regular steam passenger service to Orange and Newark began September 28, 1837, shifting Chatham's commercial heart west to the grade-level wooden depot.",
    sources: ["stationWiki", "chsTour"] },
  { id: "gvmethodist", year: 1843, title: "Green Village United Methodist Church", kind: "culture",
    address: "500 Spring Valley Road, Green Village, Chatham Township",
    lat: 40.73960, lon: -74.44860,
    text: "Founded by 19th-century rural families at the Green Village crossroads, anchoring community life on the northern edge of the Great Swamp.",
    sources: ["wikiTwp", "njdep"] },
  { id: "dusenberry", year: 1848, title: "Dusenberry House (Presbyterian Parsonage)", kind: "house",
    address: "186 Main Street, Chatham Borough",
    lat: 40.74000, lon: -74.37972, landmark: true,
    text: "Greek Revival manse built in 1848 for 45-year pastor Rev. Joseph Meeker Ogden, symmetrically doubled by Frederick Dusenberry in 1912, and listed on the National Register in 1979.",
    sources: ["nrDusenberry", "chsTour", "njdep"] },
  { id: "bower427", year: 1850, title: "David S. Bower House", kind: "house",
    address: "427 Main Street, Chatham Borough",
    lat: 40.74515, lon: -74.39190,
    text: "Mid-19th-century West Main Street residence individually listed on the National Register of Historic Places (#82001045) in November 1982.",
    sources: ["nrBower", "njdep"] },
  { id: "mintonpo", year: 1855, title: "Minton's Store & Civil War Post Office", kind: "commerce",
    address: "Main Street & Fairmount Avenue, Chatham Borough",
    lat: 40.74098, lon: -74.38345, end: 1920,
    text: "General store and post office run by Postmaster Hudson Minton, where Chatham families gathered anxiously for letters and casualty lists throughout the Civil War.",
    sources: ["chsTour", "vanderpoel"] },
  { id: "redbrick", year: 1860, title: "Mount Vernon School (Red Brick Schoolhouse)", kind: "civic",
    address: "24 Southern Boulevard, Chatham Township",
    lat: 40.72194, lon: -74.40361, landmark: true,
    text: "Two-story 1860 brick schoolhouse and upstairs chapel for District No. 7; later Chatham Township Hall (1958–88) and Historical Society Museum since 1991. NRHP #100007872.",
    sources: ["nrRedBrick", "njdep", "wikiTwp"] },
  { id: "kelleystore", year: 1868, title: "Kelley's General Store & Public Hall", kind: "commerce",
    address: "Main Street & North Passaic Avenue, Chatham Borough",
    lat: 40.74110, lon: -74.38275, end: 1928,
    text: "Nelson and Frank Kelley's block-long emporium at \"Kelley's Elbow,\" whose upstairs hall hosted school classes, traveling shows, town meetings and Chatham's early lending library.",
    sources: ["chsTour", "exploreChatham"] },
  { id: "stpaul200", year: 1873, title: "1873 Village Chapel (Later St. Paul's Episcopal)", kind: "culture",
    address: "200 Main Street, Chatham Borough",
    lat: 40.74018, lon: -74.38035,
    text: "Erected by Chatham Presbyterians in 1873 after rolling the 1806 Academy down Summit Avenue, then traded to St. Paul's Episcopal congregation in the 1902 church land swap.",
    sources: ["chsTour", "exploreChatham"] },
  { id: "fairviewhotel", year: 1880, title: "Fairview House Summer Resort Hotel", kind: "commerce",
    address: "214 Main Street, Chatham Borough",
    lat: 40.74035, lon: -74.38110, end: 1920,
    text: "Grand three-story Gilded Age resort welcoming 150 city boarders at $3 a night with verandas, bowling and a nine-hole golf course; razed after a fire in 1920 to create Memorial Park.",
    sources: ["chsTour", "libHist"] },
  { id: "swaim", year: 1887, title: "Dr. Swaim's Pharmacy & First Public Telephone", kind: "commerce",
    address: "262 Main Street, Chatham Borough",
    lat: 40.74096, lon: -74.38315, landmark: true,
    text: "Picturesque 1887 downtown building erected by Dr. George Swaim; home by 1899 to a soda fountain, Dr. Frederick Lum Jr.'s upstairs dental office and Chatham's first public telephone.",
    sources: ["chsTour", "njdep"] },
  { id: "village1892", year: 1892, title: "Chatham Village Formed Inside the Township", kind: "civic",
    address: "Borough-wide",
    lat: 40.74070, lon: -74.38250, end: 1897,
    text: "After villagers protested paying 40% of Chatham Township taxes while receiving 7% of road funds, voters formed semi-autonomous Chatham Village in August 1892 with Frederick Lum Sr. as president.",
    sources: ["wikiBoro", "snyder"] },
  { id: "chathampress", year: 1897, title: "Chatham Borough Incorporates & The Chatham Press Launches", kind: "event",
    address: "Center Street & Main Street, Chatham Borough",
    lat: 40.74125, lon: -74.38360,
    text: "Incorporated by Legislative Act on March 1, 1897 under first Mayor Frank Kelley—the same year J. Thomas Scott founded The Chatham Press to chronicle Borough life.",
    sources: ["wikiBoro", "snyder", "sanborn1909"] },
  { id: "borough1897", year: 1897, title: "First Borough Council & Volunteer Fire Company", kind: "civic",
    address: "Fairmount Avenue near Main Street, Chatham Borough",
    lat: 40.74040, lon: -74.38370,
    text: "Independent Chatham Borough organized its municipal waterworks (1898), volunteer fire companies and Borough Hall on Fairmount Avenue.",
    sources: ["wikiBoro", "sanborn1909"] },
  { id: "florham1899", year: 1899, title: "Florham Park Separates from Chatham Township", kind: "event",
    address: "Columbia Turnpike, Florham Park (part of Chatham Twp. until 1899)",
    lat: 40.78700, lon: -74.38800, end: 1899, scope: "township",
    text: "On March 20, 1899 the Afton / Columbia estate district incorporated as Florham Park Borough, fixing the modern boundaries of Chatham Township and Chatham Borough.",
    sources: ["snyder", "wikiTwp"] },
  { id: "ogden", year: 1905, title: "Ogden Memorial Presbyterian Church", kind: "civic",
    address: "286 Main Street at Elmwood Avenue, Chatham Borough",
    lat: 40.74190, lon: -74.38390, landmark: true,
    text: "Dedicated in 1905 on the former John Gould estate in memory of 45-year pastor Rev. Joseph Meeker Ogden, anchoring west downtown with its stone sanctuary and 1930s tower.",
    sources: ["chsTour", "exploreChatham"] },
  { id: "speedbumps1906", year: 1906, title: "World's First Recorded Traffic Speed Bumps", kind: "event",
    address: "Main Street crosswalks, Chatham Borough",
    lat: 40.74085, lon: -74.38290,
    text: "In April 1906 Chatham raised cobblestone crosswalks five inches above Main Street to slow 40-mph motorcars; The New York Times reported June 7, 1906 that \"Chatham was the first place to put it in practice.\"",
    sources: ["speedBump", "wikiBoro"] },
  { id: "rosehouses", year: 1909, title: "Glass Rose Greenhouses of \"The Rose Capital\"", kind: "commerce",
    address: "Hillside Avenue, Watchung Avenue & West Main Street, Chatham Borough",
    lat: 40.73360, lon: -74.38180, landmark: true, end: 1970,
    text: "Ten commercial steam- and hot-water-heated rose-growing complexes—Falconer, Lum, Ruzicka, Littlejohn, Moore, Minton, Badgley, Roper, Ryan & Wagner—sparkled on Chatham's Sanborn maps.",
    sources: ["sanborn1909", "sanborn1921", "exploreChatham"] },
  { id: "school1909", year: 1909, title: "Public School No. 1 (Lum Avenue / Main Street)", kind: "civic",
    address: "Main Street & Lum Avenue, Chatham Borough",
    lat: 40.74380, lon: -74.38860,
    text: "Brick public school erected by the growing Borough on the former Lum tract and documented on Sheet 4 of the August 1909 Sanborn survey.",
    sources: ["sanborn1909", "sanborn1921"] },
  { id: "canoeclub", year: 1912, title: "Stanley Park & Passaic River Canoeing", kind: "culture",
    address: "River Road & Watchung Avenue at the Passaic River, Chatham Borough",
    lat: 40.72895, lon: -74.37920,
    text: "At the southern bend of the Passaic River in the Stanley section, families picnicked and paddled canoes from riverside boathouses before suburban commuter traffic.",
    sources: ["chsTour", "wikiBoro"] },
  { id: "station", year: 1914, title: "1914 Elevated DL&W Stone Railroad Station", kind: "transport",
    address: "Railroad Plaza & Fairmount Avenue, Chatham Borough",
    lat: 40.74017, lon: -74.38506, landmark: true,
    text: "Opened June 19, 1914 after Lackawanna engineer George J. Ray elevated the tracks across Chatham on concrete arches, eliminating grade crossings and framing Fairmount Avenue with stone plazas.",
    sources: ["stationWiki", "njdep", "sanborn1921"] },
  { id: "viaduct1914", year: 1914, title: "Lackawanna Concrete Arch Viaduct Over the Passaic", kind: "transport",
    address: "Passaic River rail crossing south of East Main Street, Chatham Borough",
    lat: 40.73485, lon: -74.38025,
    text: "Multi-arch reinforced-concrete railroad bridge erected during the 1913–14 DL&W grade-separation project, carrying trains high above the Passaic River valley.",
    sources: ["stationWiki", "njdep"] },
  { id: "memorialpark", year: 1920, title: "World War I Memorial Park", kind: "nature",
    address: "214 Main Street, Chatham Borough",
    lat: 40.74050, lon: -74.38145,
    text: "Created on the grounds of the burned Fairview House hotel in 1920 to honor Chatham residents who served and fell in the First World War.",
    sources: ["chsTour", "libHist"] },
  { id: "gvfire", year: 1921, title: "Green Village Volunteer Fire Department", kind: "civic",
    address: "529 Green Village Road, Chatham Township",
    lat: 40.73855, lon: -74.45020,
    text: "Organized in 1921 by Green Village and western Township families, becoming a beloved social and civic hub with country fairs and barn dances.",
    sources: ["wikiTwp"] },
  { id: "boroughhall", year: 1922, title: "1922 Chatham High School (Now Chatham Borough Hall)", kind: "civic",
    address: "54 Fairmount Avenue, Chatham Borough",
    lat: 40.73849, lon: -74.38489, landmark: true,
    text: "Stately brick Colonial Revival high school built for commuter-boom Chatham Borough in the early 1920s; adaptively reused as Chatham Borough Hall after the 1986 school merger.",
    sources: ["wikiBoro", "schools"] },
  { id: "madamebey", year: 1923, title: "Madame Bey's Championship Boxing Camp", kind: "culture",
    address: "516 River Road, Chatham Township",
    lat: 40.70984, lon: -74.41594, landmark: true, end: 1969,
    text: "World-famous 30-acre prizefighter training camp founded in 1923 by Turkish-Armenian mezzo-soprano Hranoush \"Madame\" Bey, where Tunney, Schmeling, Braddock, Sugar Ray Robinson and Patterson trained.",
    sources: ["summitBey", "beyWiki", "wikiTwp"] },
  { id: "library1924", year: 1924, title: "Library of the Chathams Opens on Main Street", kind: "culture",
    address: "214 Main Street, Chatham Borough",
    lat: 40.74042, lon: -74.38125,
    text: "Colonial Revival brick public library opened in 1924 beside Memorial Park under librarian Lynda Phillips Lum; joint municipal library of Borough and Township since 1974.",
    sources: ["libHist", "chsTour"] },
  { id: "sbschool", year: 1929, title: "Southern Boulevard School", kind: "civic",
    address: "192 Southern Boulevard, Chatham Township",
    lat: 40.73180, lon: -74.41680,
    text: "Opened by Chatham Township in 1929 to replace the 1860 one-room/two-story Mount Vernon Red Brick Schoolhouse down the hill.",
    sources: ["nrRedBrick", "schools"] },
  { id: "heylroses", year: 1929, title: "Heyl Roses Greenhouses in Green Village", kind: "commerce",
    address: "Green Village Road, Chatham Township",
    lat: 40.74050, lon: -74.44420, end: 1999,
    text: "Operated for seven decades in Green Village until 1999, outlasting every other greenhouse in Chatham and Madison as New Jersey's final commercial cut-rose grower.",
    sources: ["wikiTwp"] },
  { id: "electrification1930", year: 1930, title: "Lackawanna Overhead Electrification", kind: "transport",
    address: "Chatham Station, Fairmount Avenue, Chatham Borough",
    lat: 40.74005, lon: -74.38535,
    text: "On December 18, 1930 the Lackawanna Railroad inaugurated 3,000-volt DC overhead electric commuter trains through Chatham to Hoboken.",
    sources: ["stationWiki"] },
  { id: "emergencysquad", year: 1936, title: "Chatham Emergency Squad Organized", kind: "civic",
    address: "31 North Passaic Avenue, Chatham Borough",
    lat: 40.74210, lon: -74.38230,
    text: "All-volunteer emergency medical squad founded in 1936 to serve every resident of both Chatham Borough and Chatham Township free of charge.",
    sources: ["wikiBoro", "wikiTwp"] },
  { id: "courier1946", year: 1946, title: "The Chatham Courier Founded", kind: "culture",
    address: "Main Street, Chatham Borough",
    lat: 40.74105, lon: -74.38330,
    text: "First published in September 1946 as postwar veterans and young families arrived across The Chathams; preserved online in the Library of the Chathams digital archive.",
    sources: ["courier", "libHist"] },
  { id: "hickorytree", year: 1956, title: "Hickory Tree Commercial Crossroads", kind: "commerce",
    address: "Southern Boulevard & Shunpike Road, Chatham Township",
    lat: 40.74620, lon: -74.43020,
    text: "Named for an old landmark hickory tree, this former nursery and farm intersection developed in the 1950s and 1960s into Chatham Township's neighborhood shopping center.",
    sources: ["wikiTwp", "courier"] },
  { id: "chs1958", year: 1958, title: "Lafayette Avenue High School Campus", kind: "civic",
    address: "255 Lafayette Avenue, Chatham Township",
    lat: 40.73320, lon: -74.39880,
    text: "Opened near the Borough–Township line in the late 1950s–early 1960s as Chatham Township High School; since 1988 the unified Chatham High School for both municipalities.",
    sources: ["schools", "wikiTwp"] },
  { id: "greatswamp", year: 1960, title: "Great Swamp National Wildlife Refuge Defeats Jetport", kind: "nature",
    address: "Southern Boulevard & Meyersville Road, Chatham Township",
    lat: 40.71200, lon: -74.43500, landmark: true,
    text: "Established November 3, 1960 after 6,000+ citizens bought 3,000 acres to stop a 10,000-acre Port Authority super-jetport; became the Interior Dept.'s first Wilderness Area on Sept. 28, 1968.",
    sources: ["greatSwamp", "gswa", "wikiTwp"] },
  { id: "fishawack1972", year: 1972, title: "The Fishawack Papers & Historic District Designation", kind: "culture",
    address: "214 Main Street, Chatham Borough",
    lat: 40.74030, lon: -74.38090,
    text: "Local historians began publishing The Fishawack Papers (growing to 14 volumes and 5,100 pages) in 1972, followed by NJ Register listing of the Chatham Historic District on Sept. 6, 1973.",
    sources: ["fishawack", "njdep"] },
  { id: "loantakapark", year: 1974, title: "Loantaka Brook Reservation Trails", kind: "nature",
    address: "Loantaka Way & Shunpike Road, Chatham Township",
    lat: 40.75280, lon: -74.44200,
    text: "Morris County Park Commission greenway preserving multi-use wooded trails, bridal paths and meadows along Loantaka Brook through northern Chatham Township.",
    sources: ["wikiTwp", "nrGibbons"] },
  { id: "schoolmerge1986", year: 1986, title: "Borough & Township Vote to Unite Their Schools", kind: "event",
    address: "Chatham Borough & Chatham Township",
    lat: 40.73780, lon: -74.39280,
    text: "In November 1986 voters in both municipalities approved merging their separate school districts into the regional School District of the Chathams (effective July 1988).",
    sources: ["schools", "wikiBoro", "wikiTwp"] },
  { id: "midtowndirect", year: 1996, title: "Midtown Direct Launches One-Seat NY Penn Service", kind: "transport",
    address: "Chatham Station, Railroad Plaza, Chatham Borough",
    lat: 40.74025, lon: -74.38480,
    text: "On June 10, 1996 NJ Transit's Kearny Connection connected Morristown Line electric trains directly into Midtown Manhattan's Penn Station.",
    sources: ["stationWiki", "wikiBoro"] }
];
MW.places.sort((a, b) => a.year - b.year);
MW.localPlaces = () => MW.places.filter(p => p.scope !== "township");

/* --------------------------------------------------------------------------
   Neighborhoods across Chatham Borough & Chatham Township.
   -------------------------------------------------------------------------- */
MW.sections = [
  { id: "eastmain", name: "East Main Street & Day's Bridge", lat: 40.7394, lon: -74.3748,
    colonial: "This was the cradle of colonial Chatham—\"John Day's Bridge\"—where the Minisink Trail forded the Passaic River, waterwheels spun along Parrott Mill Road, Shepard Kollock printed The New-Jersey Journal (1779) and Washington's 1781 brick bake ovens smoked.",
    growth: "Even after the 1837 railroad shifted storefronts westward, East Main preserved its remarkable row of 18th- and early-19th-century clapboard homesteads (Day-Munn, Parrott, Morrell, Capt. William Day, Vanderpoel, Phipps, Day-Hamblen and Dusenberry), recognized on the New Jersey Register in 1973.",
    sources: ["chsTour", "exploreChatham", "njdep"] },
  { id: "downtown", name: "Downtown & Railroad Plaza", lat: 40.7408, lon: -74.3836,
    colonial: "Before 1837 this stretch of the 1801 Morris Turnpike held farms, the 1806 Chatham Academy and country pastures west of the village mills.",
    growth: "The September 1837 Morris & Essex depot pulled stores, Minton's Post Office, Kelley's Emporium, the Fairview House hotel and Dr. Swaim's 1887 pharmacy here—followed by 1906 speed bumps, the 1914 elevated stone station and the 1924 brick Library of the Chathams.",
    sources: ["chsTour", "stationWiki", "sanborn1921"] },
  { id: "fairmount", name: "Fairmount, Hillside & Washington Avenues", lat: 40.7385, lon: -74.3855,
    colonial: "Upland pastures and orchard slopes rising south and north of the King's Highway, with Judge Stephen Day's colonial farmstead north along Elmwood Avenue.",
    growth: "From the 1880s through the 1920s, Queen Anne Victorians, Foursquares, Colonial Revivals and the 1922 Fairmount Avenue High School (now Borough Hall) rose alongside D. Falconer's and J. R. Littlejohn's sunlit glass rose greenhouses.",
    sources: ["sanborn1909", "sanborn1921", "habs"] },
  { id: "stanley", name: "Stanley & Watchung Avenue", lat: 40.7315, lon: -74.3820,
    colonial: "Southern Passaic River valley meadows and Watchung gap slopes between Chatham village and Summit.",
    growth: "Known by the late 19th century as the Stanley section, it mixed riverside canoe clubs and commuter homes with commercial rose ranges along Watchung Avenue (Moore, Minton, Badgley, Roper, Ryan and Wagner on the 1909–1921 Sanborn maps).",
    sources: ["sanborn1909", "sanborn1921", "wikiBoro"] },
  { id: "westmain", name: "West Main, Kings Road & the Lum Tract", lat: 40.7445, lon: -74.3915,
    colonial: "Western ridge farms along the colonial road toward Bottle Hill (Madison), including the mid-19th-century David S. Bower homestead at 427 Main Street.",
    growth: "Samuel Lum's and Anthony Ruzicka's vast West Main rose greenhouses (and skating pond) gave way to schools, garden apartments and leafy 20th-century streets along Lum, Coleman, Lafayette and Kings Road.",
    sources: ["nrBower", "exploreChatham", "sanborn1921"] },
  { id: "loantaka", name: "Loantaka Valley & Woodland / Treadwell", lat: 40.7575, lon: -74.4385,
    colonial: "Northern Chatham Township's sheltered Lowantica (Loantaka) Brook valley, site of the Continental Army's January–May 1777 winter hut encampment.",
    growth: "Home in the 1820s–30s to Vincent Boisaubin's Greek Revival manor (later A. B. Frost's \"Moneysunk\") and William Gibbons's Thoroughbred stables for champion mare Fashion, and today framed by Loantaka Brook Reservation and spacious Township estates.",
    sources: ["nrBoisaubin", "nrGibbons", "wikiTwp"] },
  { id: "hickory", name: "Hickory Tree, Southern Boulevard & River Road", lat: 40.7240, lon: -74.4140,
    colonial: "Rolling Long Hill and Passaic River ridge farms of rural Chatham Township, served from 1860 by the two-story Mount Vernon Red Brick Schoolhouse at 24 Southern Boulevard.",
    growth: "World boxing champions trained at Madame Bey's 516 River Road camp from 1923 through the 1950s before postwar subdivisions, Hickory Tree shops, Southern Boulevard School and Lafayette Avenue's high school transformed the ridge.",
    sources: ["nrRedBrick", "summitBey", "wikiTwp"] },
  { id: "greenvillagesec", name: "Green Village & the Great Swamp Rim", lat: 40.7280, lon: -74.4420,
    colonial: "Settled in the mid-1700s above the marshes of ancient Glacial Lake Passaic, Green Village gave rise to Chatham's earliest Presbyterian congregation and remained a distinct country crossroads.",
    growth: "Saved from a 10,000-acre Port Authority super-jetport by citizen donors in 1959–68, western Chatham Township still blends Green Village's historic homes, 1921 firehouse and Heyl Roses heritage (closed 1999) with 7,800-acre Great Swamp National Wildlife Refuge.",
    sources: ["greatSwamp", "wikiTwp", "gottscho"] }
];

/* Historic roads (Census TIGER / OpenStreetMap geometry, simplified).
   MW.oldRoads[0] MUST be Main Street (referenced in house.js). */
MW.oldRoads = [
  { name: "Main Street (Minisink Trail & 1801 Morris Turnpike)", from: 1500,
    pts: [[40.73922, -74.37156], [40.73957, -74.37903], [40.74147, -74.38615], [40.74744, -74.39666]] },
  { name: "Green Village Road (colonial road to Green Village)", from: 1740,
    pts: [[40.74645, -74.43216], [40.74164, -74.43805], [40.73867, -74.44490], [40.73889, -74.45209]] },
  { name: "Kings Road (colonial ridge road toward Bottle Hill)", from: 1745,
    pts: [[40.74296, -74.39026], [40.74383, -74.39601], [40.74557, -74.39863]] },
  { name: "Loantaka Way (1777 Loantaka encampment road)", from: 1760,
    pts: [[40.75361, -74.43774], [40.75376, -74.44109], [40.75255, -74.44684], [40.75326, -74.45078], [40.75309, -74.45245]] },
  { name: "River Road (old Passaic River ridge road)", from: 1760,
    pts: [[40.72896, -74.37919], [40.72150, -74.39780], [40.71411, -74.40839], [40.70994, -74.41561], [40.70448, -74.42361], [40.70239, -74.42768], [40.70033, -74.42965], [40.69504, -74.43860], [40.69179, -74.44446]] },
  { name: "Shunpike Road (early 1800s toll-bypass road)", from: 1805,
    pts: [[40.75332, -74.43849], [40.74789, -74.43486], [40.74680, -74.43322], [40.74275, -74.41515], [40.74057, -74.41016], [40.73650, -74.39449]] },
  { name: "Fairmount Avenue (station & Long Hill road)", from: 1810,
    pts: [[40.74100, -74.38318], [40.74017, -74.38506], [40.73849, -74.38489], [40.73467, -74.38747], [40.72800, -74.39550], [40.72205, -74.40381], [40.71502, -74.41839], [40.71011, -74.42414], [40.70552, -74.42944], [40.70239, -74.42768]] },
  { name: "Southern Boulevard (Mount Vernon & Great Swamp road)", from: 1820,
    pts: [[40.72057, -74.40244], [40.72546, -74.40829], [40.72845, -74.41072], [40.73143, -74.41764], [40.73578, -74.42009], [40.73786, -74.42667], [40.74164, -74.43070], [40.74600, -74.43002]] },
  { name: "Morris & Essex Railroad (1837; elevated 1914)", from: 1837,
    pts: [[40.74659, -74.40256], [40.74320, -74.39574], [40.74017, -74.38506], [40.73932, -74.38276], [40.73733, -74.38048], [40.73487, -74.38026], [40.73041, -74.38254], [40.72297, -74.38913], [40.71775, -74.38681]] },
  { name: "Lafayette Avenue (by 1850)", from: 1850,
    pts: [[40.74343, -74.38979], [40.73837, -74.39240], [40.73322, -74.39778], [40.73319, -74.40008], [40.72756, -74.40974]] },
  { name: "Watchung Avenue (Stanley & greenhouse road)", from: 1868,
    pts: [[40.72896, -74.37919], [40.73467, -74.38747], [40.73650, -74.39449]] }
];

/* Architectural styles matched to house.js vignette keys. */
MW.styles = [
  { id: "colonial", name: "Colonial Clapboard Homestead", from: 1700, to: 1789, desc: "Timber-frame side-wing and center-hall farmhouses with heavy brick chimneys and beehive ovens, like the Morrell, Stephen Day and Capt. William Day houses." },
  { id: "federal", name: "Federal & Early Turnpike Vernacular", from: 1790, to: 1824, desc: "Refined clapboard proportions, gambrel or low-pitched roofs and fanlight doorways along the 1801 Morris Turnpike, like the George T. Parrott House." },
  { id: "greekrev", name: "Greek Revival", from: 1825, to: 1859, desc: "Bold cornice returns, classical entry pilasters and frieze windows, exemplified by Boisaubin Manor (1822–34) and the 1848 Dusenberry Parsonage." },
  { id: "victorian", name: "Victorian, Stick & Queen Anne", from: 1860, to: 1904, desc: "Asymmetrical gables, wraparound porches and patterned shingles from the early Lackawanna commuter and rose-growing decades." },
  { id: "colrev", name: "Colonial Revival & American Foursquare", from: 1905, to: 1924, desc: "Symmetrical clapboard or brick facades, multi-pane sash and wide front porches built around the 1914 elevated station boom." },
  { id: "tudor", name: "Tudor Revival & Period Suburban", from: 1925, to: 1944, desc: "Steep slate or shingle gables, stucco and half-timbering along Fairmount, Washington, Coleman and Green Village estates." },
  { id: "ranch", name: "Cape Cod, Split-Level & Ranch", from: 1945, to: 1974, desc: "Postwar family homes set on leafy half-acre and acre lots across Chatham Township's former farms and nurseries." },
  { id: "modern", name: "New Traditional & Transit-Era Colonial", from: 1975, to: 2100, desc: "Custom shingle-and-stone Colonials and townhomes shaped by the Midtown Direct era." }
];
MW.styleFor = y => MW.styles.find(s => y >= s.from && y <= s.to) || MW.styles[MW.styles.length - 1];

/* Geography helpers */
MW.geo = {
  distM(a, b) {
    const R = 6371000, toR = Math.PI / 180;
    const dLat = (b[0] - a[0]) * toR, dLon = (b[1] - a[1]) * toR;
    const s = Math.sin(dLat / 2) ** 2 + Math.cos(a[0] * toR) * Math.cos(b[0] * toR) * Math.sin(dLon / 2) ** 2;
    return 2 * R * Math.asin(Math.sqrt(s));
  },
  distToLineM(p, pts) {
    const k = 111320, kx = k * Math.cos(p[0] * Math.PI / 180);
    const Q = pts.map(q => [(q[1] - p[1]) * kx, (q[0] - p[0]) * k]);
    let best = Infinity;
    for (let i = 0; i < Q.length - 1; i++) {
      const [ax, ay] = Q[i], [bx, by] = Q[i + 1];
      const dx = bx - ax, dy = by - ay;
      const t = Math.max(0, Math.min(1, (-ax * dx - ay * dy) / (dx * dx + dy * dy || 1)));
      best = Math.min(best, Math.hypot(ax + t * dx, ay + t * dy));
    }
    return best;
  },
  /* point-in-polygon on a GeoJSON Polygon ([lon,lat] rings); p = [lat, lon] */
  inPolygon(p, poly) {
    if (!poly) return true;
    const rings = poly.type === "MultiPolygon" ? poly.coordinates.map(r => r[0]) : [poly.coordinates[0]];
    return rings.some(r => {
      let inside = false;
      for (let i = 0, j = r.length - 1; i < r.length; j = i++) {
        const [xi, yi] = r[i], [xj, yj] = r[j];
        if ((yi > p[0]) !== (yj > p[0]) && p[1] < (xj - xi) * (p[0] - yi) / (yj - yi) + xi) inside = !inside;
      }
      return inside;
    });
  },
  inTown(p) { return MW.geo.inPolygon(p, window.MW_BOUNDARY); },
  fmt(m) {
    const mi = m / 1609.34;
    if (mi < 0.1) return Math.round(m * 3.281 / 10) * 10 + " feet";
    return mi.toFixed(mi < 1 ? 2 : 1) + " miles";
  },
  walkMin(m) { return Math.max(1, Math.round(m / 80)); }
};
