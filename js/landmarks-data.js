/* Deep-dive landmark profiles for Chatham Through Time (Chatham Borough & Chatham Township).
   Every image in img/landmarks/ is either public domain or Creative Commons licensed, with full
   creator and license attribution recorded below. */
var MW = window.MW = window.MW || {};

MW.landmarks = {
  kollock: {
    place: "kollock",
    name: "Shepard Kollock Park, Day's Bridge & the 1781 Brick Ovens",
    built: 1779,
    builtLabel: "1710 crossing · 1779 press · 1781 ovens",
    type: "Revolutionary War & River Crossing",
    kind: "event",
    address: "East Main Street & Parrott Mill Road, Chatham Borough",
    designation: "Interpretive Riverfront Park · NJ Historical Markers",
    lat: 40.73925, lon: -74.37185,
    tagline: "Where the Minisink Trail forded the Passaic, Shepard Kollock printed the Patriot cause, and George Washington's 3,000-loaf bakery fooled the British Army.",
    photos: [
      { src: "img/landmarks/kollock-river.jpg", hero: true, year: 2012, caption: "The Passaic River at Chatham in autumn, near the ancient Fishawack ford", credit: "Tomwsulcer / Wikimedia Commons", license: "CC0 (Public domain)", link: "https://commons.wikimedia.org/wiki/File:Autumn_Passaic_River_Chatham_NJ.jpg" },
      { src: "img/landmarks/passaic-crossing.jpg", year: 2011, caption: "Passaic River crossing between Chatham and Summit", credit: "Tomwsulcer / Wikimedia Commons", license: "CC0 (Public domain)", link: "https://commons.wikimedia.org/wiki/File:Passaic_River_between_Summit_and_Chatham_New_Jersey.jpg" }
    ],
    sections: [
      { h: "Fishawack and John Day's Bridge",
        p: [
          "For centuries before European settlement, Minsi Lenape bands followed the Minisink Trail from the Delaware Water Gap through Hobart Gap in the Watchung Mountains to ford the shallow Passaic River right here—a fishing and crossing place they called Fishawack.",
          "In the 1710s and 1720s colonial farmers John and Daniel Day settled beside the ford and threw a timber bridge across the river. Travelers along the King's Highway knew the cluster of thirty wooden dwellings, blacksmith shops, taverns and gristmills simply as John Day's Bridge until November 1773, when villagers renamed it Chatham for William Pitt, 1st Earl of Chatham."
        ] },
      { h: "February 16, 1779: The Rebel Printer",
        p: [
          "To counter Loyalist newspapers pouring out of British-occupied Manhattan, General Henry Knox and General George Washington urged Continental artillery lieutenant Shepard Kollock to establish a patriot 'camp press' safely behind the Watchung ridge.",
          "Relieved from active field duty in January 1779, Kollock set up his press at Day's Tavern near the Passaic bridge and issued the first number of The New-Jersey Journal on February 16, 1779—only the second newspaper founded in New Jersey. When British and Hessian columns attacked Connecticut Farms and Springfield in June 1780, Kollock hastily evacuated his type and press (tradition says toward the Great Swamp), resuming publication a week later and printing in Chatham until December 3, 1783."
        ] },
      { h: "August 1781: Washington's Bread-Oven Ruse de Guerre",
        p: [
          "In August 1781 Washington and French General Rochambeau marched thousands of Allied troops into Chatham while secretly preparing to race south to trap Lord Cornwallis at Yorktown, Virginia. To freeze Sir Henry Clinton's British garrison in New York, Washington ordered French commissaries to construct a 65-foot-long shed of brick bake ovens beside the Passaic River capable of turning out 3,000 loaves of bread a day.",
          "Guarded by three Continental regiments posted on the high ground east of town on August 19, the smoking ovens convinced locals, Tory spies and British headquarters alike that a massive siege of Staten Island and Manhattan was about to begin. While bread was still baking overnight on August 28–29, Washington slipped his army silently out of Chatham under cover of darkness—winning a decisive head start to the Delaware River and Yorktown."
        ] },
      { h: "Millpond to Riverfront Park",
        p: [
          "In the 19th century the riverfront powered flour, lumber, machine and textile mills, ending with George T. Parrott's gristmill, whose pond covered today's parklands with summer rowboats and winter ice-cutting. Today Shepard Kollock Park preserves the riverside trail and includes Jack's Playground, dedicated in memory of Jack, an enslaved youth held by Kollock in late-18th-century Chatham."
        ] }
    ],
    facts: [
      "Kollock's April 1780 masthead located his Chatham print shop 'near the Liberty Pole,' which villagers had raised at Main Street and University Avenue in 1775.",
      "Parrott's Mill Pond rented canoes and rowboats for twenty-five cents an hour before the mill dam came down.",
      "The 2020s dedication of Jack's Playground in Shepard Kollock Park explicitly honors the enslaved people whose labor was long omitted from local Revolutionary narratives."
    ],
    timeline: [
      { y: "Pre-1680", t: "Lenape seasonal crossing at Fishawack on the Minisink Trail" },
      { y: "1710–20s", t: "John and Daniel Day settle and build Day's Bridge over the Passaic" },
      { y: 1773, t: "Village renamed Chatham in honor of William Pitt, Earl of Chatham" },
      { y: 1779, t: "Shepard Kollock prints the first issue of The New-Jersey Journal (Feb 16)" },
      { y: 1781, t: "Washington builds 65-foot brick bake ovens here in his Yorktown ruse (Aug)" },
      { y: "1850s", t: "Four water-powered mills and Parrott's Mill Pond line the river" }
    ],
    sources: ["chsTour", "exploreChatham", "vanderpoel", "wikiBoro"]
  },

  dayhouses: {
    place: "morrell",
    name: "Colonial East Main Street: Morrell, Day-Munn & Capt. William Day Houses",
    built: 1740,
    builtLabel: "c. 1740–1796",
    type: "18th-Century Homesteads",
    kind: "house",
    address: "25–142 Main Street, Chatham Borough",
    designation: "Historic American Buildings Survey (1937–38) · Chatham Historic District (NJRHP)",
    lat: 40.73928, lon: -74.37435,
    tagline: "The surviving cluster of 18th-century clapboard homesteads where Washington wrote seventeen Yorktown dispatches and militia families farmed for two centuries.",
    photos: [
      { src: "img/landmarks/daymunn-1938.jpg", hero: true, year: 1938, caption: "Day-Munn House at 25 Main Street, photographed October 27, 1938 (HABS NJ,14-CHAT,4-1)", credit: "Nathaniel R. Ewan / Historic American Buildings Survey, Library of Congress", license: "Public domain", link: "https://commons.wikimedia.org/wiki/File:Historic_American_Buildings_Survey_Nathaniel_R._Ewan,_Photographer_October_27,_1938_EXTERIOR_-_VIEW_FROM_SOUTHEAST_-_Day-Munn_House,_25_Main_Street,_Chatham,_Morris_County,_NJ_HABS_NJ,14-CHAT,4-1.tif" },
      { src: "img/landmarks/dayhamblen.jpg", year: 1937, caption: "Day-Hamblen House at 142 Main Street, south elevation from early print (HABS NJ,14-CHAT,3-1)", credit: "Historic American Buildings Survey, Library of Congress", license: "Public domain", link: "https://commons.wikimedia.org/wiki/File:Historic_American_Buildings_Survey,_Taken_from_an_old_print_probably_from_a_book_or_pamphlet_EXTERIOR_-_SOUTH_ELEVATION_-_Day-Hamblen_House,_142_Main_Street,_Chatham,_Morris_County_HABS_NJ,14-CHAT,3-1.tif" }
    ],
    sections: [
      { h: "The Jacob Morrell House (63 Main Street, c. 1740)",
        p: [
          "Standing near the 1775 Liberty Pole at Main Street and University Avenue, the Jacob Morrell House (c. 1740) is recognized as the oldest pre-Revolutionary building on Main Street. Morrell ran an adjoining general store and was among colonial Chatham's wealthiest merchants.",
          "In late August 1781, while 2,000 to 3,000 Continental and French soldiers camped in Chatham's fields around the brick ovens, General George Washington lodged at the Morrell homestead and penned seventeen surviving letters coordinating the secret march south to Yorktown."
        ] },
      { h: "The Day-Munn, Parrott & Capt. William Day Houses",
        p: [
          "East Main Street preserves a remarkable concentration of early timber-frame dwellings built by the founding Day, Bonnel, Parrott and Crane families. At 25 Main Street, the Day-Munn House was recorded in twelve architectural drawings and photographs by HABS photographer Nathaniel R. Ewan in October 1938; just west at 47 Main Street stands George T. Parrott's gambrel-roofed Federal house (c. 1790–1800).",
          "Across the road at 70 Main Street, the vernacular Georgian Captain William Day House (1780) still displays nine-over-six sash windows and an intact brick beehive oven. William Day fought three years in the Morris County militia—rising from private to captain and serving at the Battle of Springfield—before marrying miller Nathaniel Bonnel's daughter Nancy and working this farm tract, which supplied Chatham with fresh bread, eggs and vegetables well into the 1910s."
        ] },
      { h: "Westward Along the King's Highway",
        p: [
          "Next door at 76 Main Street stands the c. 1796 Vanderpoel-Day-Crane house (later Victorianized with Dr. George Swaim's 1880 medical wing), followed by the early-19th-century Phipps Homestead at 100 Main Street and the HABS-documented Day-Hamblen House at 142 Main Street."
        ] }
    ],
    facts: [
      "Federal HABS architects measured three separate Day family houses in Chatham during the Depression (1936–1938): 25 Main Street, 142 Main Street and 62 Elmwood Avenue.",
      "Twenty Chatham men enlisted in the Union Army during the Civil War—including two sons of the Phipps family at 100 Main Street—and only eleven returned home."
    ],
    timeline: [
      { y: 1740, t: "Jacob Morrell House built near the Passaic crossing (63 Main St)" },
      { y: 1775, t: "Villagers raise a Liberty Pole at Main Street & University Avenue" },
      { y: 1780, t: "Capt. William Day & Nancy Bonnel build 70 Main Street with beehive oven" },
      { y: 1781, t: "George Washington writes 17 letters from the Morrell House (Aug 25–28)" },
      { y: "1937–38", t: "Historic American Buildings Survey documents 25 & 142 Main Street" },
      { y: 1973, t: "Chatham Historic District entered on the New Jersey Register (Sept 6)" }
    ],
    sources: ["chsTour", "exploreChatham", "habs", "njdep"]
  },

  stephenday: {
    place: "stephenday",
    name: "Stephen Day House",
    built: 1760,
    builtLabel: "18th century (HABS 1936)",
    type: "Colonial Homestead",
    kind: "house",
    address: "62 Elmwood Avenue, Chatham Borough",
    designation: "Historic American Buildings Survey (HABS NJ-264)",
    lat: 40.74507, lon: -74.38196,
    tagline: "Colonial homestead of Judge and Militia Captain Stephen Day, recorded by federal architectural historians in 1936.",
    photos: [
      { src: "img/landmarks/stephenday-1936.jpg", hero: true, year: 1936, caption: "North elevation of the Stephen Day House, April 30, 1936 (HABS NJ,14-CHAT,2-1)", credit: "R. Merritt Lacey / Historic American Buildings Survey, Library of Congress", license: "Public domain", link: "https://commons.wikimedia.org/wiki/File:Historic_American_Buildings_Survey_R._Merritt_Lacey,_Photographer_April_30,_1936_EXTERIOR_-_NORTH_ELEVATION_-_Stephen_Day_House,_62_Elmwood_Road,_Chatham,_Morris_County,_NJ_HABS_NJ,14-CHAT,2-1.tif" }
    ],
    sections: [
      { h: "Patriot Magistrate of Colonial Chatham",
        p: [
          "Stephen Day—grandson of early Passaic Valley settlers—was one of Revolutionary Chatham's central civic and military figures, serving on the Morris County Committee of Observation, commanding local militia and sitting as a county judge.",
          "Set on upland farmland north of the King's Highway along Elmwood Avenue, the timber-frame Stephen Day House exhibits classic New Jersey side-wing colonial massing: a two-story main block paired with a lower kitchen wing, heavy end chimneys and twelve-over-twelve sash."
        ] },
      { h: "Preserved in the 1936 HABS Survey",
        p: [
          "In April 1936 photographer R. Merritt Lacey and a team of Works Progress Administration draftsmen selected the Stephen Day House as Survey NJ-264 of the Historic American Buildings Survey, producing seven sheets of measured floor plans, mantel profiles and elevations now archived in the Library of Congress."
        ] }
    ],
    facts: [
      "The 1936 HABS survey recorded Elmwood Avenue under its older country name, 'Elmwood Road.'"
    ],
    timeline: [
      { y: "mid-1700s", t: "Constructed on Day family upland north of Main Street" },
      { y: "1776–81", t: "Stephen Day serves in Morris County militia and patriot governance" },
      { y: 1936, t: "Photographed by R. Merritt Lacey for the Historic American Buildings Survey (Apr 30)" }
    ],
    sources: ["habs", "vanderpoel"]
  },

  boisaubin: {
    place: "boisaubin",
    name: "Boisaubin Manor & Loantaka Valley Farmsteads",
    built: 1828,
    builtLabel: "1777 encampment · 1822–34 manor",
    type: "Greek Revival Estate & Historic Farms",
    kind: "house",
    address: "95 Treadwell Avenue & Loantaka Way, Chatham Township",
    designation: "National Register of Historic Places (#76001175 & #05000222)",
    lat: 40.76750, lon: -74.44360,
    tagline: "From the Continental Army's 1777 Loantaka winter valley to a French Royal Guardsman's Greek Revival manor, Thoroughbred champion Fashion's barn, and illustrator A. B. Frost's 'Moneysunk.'",
    photos: [
      { src: "img/landmarks/boisaubin.jpg", hero: true, year: 2013, caption: "Boisaubin Manor on Treadwell Avenue, Chatham Township", credit: "KLOTZ / Wikimedia Commons", license: "CC BY-SA 3.0", link: "https://commons.wikimedia.org/wiki/File:BOISAUBIN_MANOR,_MORRIS_COUNTY.jpg" },
      { src: "img/landmarks/gibbons.jpg", year: 2013, caption: "William Gibbons Stable and Farm on Loantaka Way (NRHP #05000222)", credit: "KLOTZ / Wikimedia Commons", license: "CC BY-SA 3.0", link: "https://commons.wikimedia.org/wiki/File:WILLIAM_GIBBONS_STABLE_AND_FARM.jpg" },
      { src: "img/landmarks/pricebaldwin.jpg", year: 2013, caption: "Price-Baldwin House (c. 1770, expanded 1830s) in Chatham Township", credit: "KLOTZ / Wikimedia Commons", license: "CC BY-SA 3.0", link: "https://commons.wikimedia.org/wiki/File:PRICE-BALDWIN_HOUSE,_CHATHAM,_MORRIS_COUNTY,_NJ.jpg" },
      { src: "img/landmarks/lewisnoe.jpg", year: 2013, caption: "Lewis Noe Farmstead (c. 1770) in Chatham Township", credit: "KLOTZ / Wikimedia Commons", license: "CC BY-SA 3.0", link: "https://commons.wikimedia.org/wiki/File:LEWIS_NOE_FARMSTEAD,_CHATHAM,_MORRIS_COUNTY,_NJ.jpg" }
    ],
    sections: [
      { h: "Winter of 1777: Encampment in the Loantaka Valley",
        p: [
          "Following his victories at Trenton and Princeton in January 1777, General Washington quartered at Morristown while sending much of the Continental Army into winter huts along the sheltered Lowantica (Loantaka) Brook valley in northern Chatham Township, east of Treadwell Avenue.",
          "Nearby colonial homesteads—including the c. 1770 Lewis Noe Farmstead and Price-Baldwin House—witnessed troop movements throughout the Morristown winters."
        ] },
      { h: "A Guardsman of Louis XVI & 'Moneysunk'",
        p: [
          "Vincent Boisaubin (1755–1834), born in Guadeloupe and educated in Paris as a member of King Louis XVI's elite Garde du Corps, escaped the French Revolution and bought wide lands in northern Chatham Township, where he welcomed his friend the Marquis de Lafayette during Lafayette's 1824–25 triumphal American tour.",
          "Built between 1822 and 1834, brick Greek Revival Boisaubin Manor passed in 1851 to Alfred Treadwell and in 1890 to celebrated American illustrator A. B. Frost (famous for his Br'er Rabbit and sporting art), who christened the estate 'Moneysunk.' It was listed on the National Register of Historic Places on October 22, 1976."
        ] },
      { h: "Fashion, 'Queen of the American Turf'",
        p: [
          "Just south along Loantaka Way, steamboat heir and sportsman William Gibbons built his brick-and-timber racehorse barn complex in the 1830s (NRHP #05000222) to stable his homebred chestnut mare Fashion (foaled 1837)—who defeated Boston in the legendary 1842 North-versus-South match race before 70,000 spectators on Long Island."
        ] }
    ],
    facts: [
      "Illustrator A. B. Frost joked that he named Boisaubin Manor 'Moneysunk' for the sums a gentleman farmer poured into the land.",
      "Fashion (1837–1860), raised at Gibbons's Chatham Township farm, was inducted into the National Museum of Racing and Hall of Fame in 1980."
    ],
    timeline: [
      { y: 1777, t: "Continental regiments camp in the Loantaka Brook valley (Jan–May)" },
      { y: "1822–34", t: "French émigré Vincent Boisaubin builds Greek Revival Boisaubin Manor" },
      { y: "1830s", t: "William Gibbons builds thoroughbred racehorse stables on Loantaka Way" },
      { y: 1890, t: "Illustrator A. B. Frost buys Boisaubin Manor and names it 'Moneysunk'" },
      { y: 1976, t: "Boisaubin Manor added to the National Register of Historic Places (Oct 22)" },
      { y: 2005, t: "William Gibbons Stable and Farm listed on the National Register (Mar 30)" }
    ],
    sources: ["nrBoisaubin", "wikiTwp", "njdep"]
  },

  dusenberry: {
    place: "dusenberry",
    name: "Dusenberry House (Presbyterian Parsonage)",
    built: 1848,
    builtLabel: "1848 (enlarged 1912)",
    type: "Greek Revival Manse",
    kind: "house",
    address: "186 Main Street, Chatham Borough",
    designation: "National Register of Historic Places (#79001515)",
    lat: 40.74000, lon: -74.37972,
    tagline: "The 1848 Greek Revival manse built for forty-five-year pastor Rev. Joseph Meeker Ogden and restored as Chatham's flagship National Register landmark on Main Street.",
    photos: [
      { src: "img/landmarks/dusenberry.jpg", hero: true, year: 2007, caption: "The Dusenberry House at 186 Main Street", credit: "Daniel Case / Wikimedia Commons", license: "CC BY-SA 3.0", link: "https://commons.wikimedia.org/wiki/File:Dusenberry_House,_Chatham,_NJ.jpg" }
    ],
    sections: [
      { h: "Built for Pastor Ogden and His Bride",
        p: [
          "Rev. Joseph Meeker Ogden arrived straight from Princeton Theological Seminary in 1828 to lead the Village Church of Chatham, guiding the congregation for forty-five years through 1873. Following his marriage to Emeline Swayze, this crisp Greek Revival manse rose at 186 Main Street in 1848.",
          "With its classical entry surround, heavy window cornices and bold gable returns, the house was also the 1853 birthplace of their son Joseph Wallace Ogden, founder of the New York investment house J. W. Ogden & Co."
        ] },
      { h: "The 1912 Enlargement & 1979 Preservation",
        p: [
          "Purchased in 1907 by Newark businessman Frederick Dusenberry, the house was doubled in breadth in 1912 with two matching west bays that honored its 1848 proportions. After an exemplary 1970s commercial restoration, it was placed on the National Register of Historic Places on November 1, 1979."
        ] }
    ],
    facts: [
      "When built in 1848, the parsonage was half its present width; Frederick Dusenberry's 1912 addition replicated the Greek Revival cornice and window heads seamlessly."
    ],
    timeline: [
      { y: 1828, t: "Rev. Joseph Meeker Ogden begins 45-year Chatham pastorate" },
      { y: 1848, t: "Greek Revival parsonage constructed at 186 Main Street" },
      { y: 1907, t: "Purchased by Frederick Dusenberry, who enlarges it in 1912" },
      { y: 1979, t: "Listed on the New Jersey (May 9) and National (Nov 1) Registers" }
    ],
    sources: ["nrDusenberry", "chsTour", "exploreChatham"]
  },

  redbrick: {
    place: "redbrick",
    name: "Mount Vernon School (Red Brick Schoolhouse Museum)",
    built: 1860,
    builtLabel: "1860",
    type: "Schoolhouse, Town Hall & Museum",
    kind: "civic",
    address: "24 Southern Boulevard, Chatham Township",
    designation: "National Register of Historic Places (#100007872)",
    lat: 40.72194, lon: -74.40361,
    tagline: "Built on the eve of the Civil War as a rural school downstairs and Sunday chapel upstairs, later Chatham Township Hall, and today the Township's history museum.",
    photos: [
      { src: "img/landmarks/redbrick.jpg", hero: true, year: 2022, caption: "Mount Vernon School (Red Brick Schoolhouse) at 24 Southern Boulevard", credit: "Zeete / Wikimedia Commons", license: "CC BY-SA 4.0", link: "https://commons.wikimedia.org/wiki/File:Mount_Vernon_School,_Chatham_Township,_NJ.jpg" }
    ],
    sections: [
      { h: "School Downstairs, Chapel Upstairs (1860–1929)",
        p: [
          "Erected in 1860 for Mount Vernon Washington School District No. 7 at the southern rise of Southern Boulevard, this two-story vernacular Classical Revival red-brick building served double duty for rural Long Hill and Chatham Township farm families: children learned reading and arithmetic on the first floor while Sunday school and non-denominational worship met on the second.",
          "Classes continued here for nearly seventy years until the new Southern Boulevard School opened up the road in 1929."
        ] },
      { h: "Community Center, Township Hall & Museum",
        p: [
          "Rescued from sale in 1930 by philanthropists Elliott and Martha Averett for use as a neighborhood community house, the building was deeded back to Chatham Township in 1956 and served for thirty years (1958–1988) as Chatham Township Hall—right through the Great Swamp jetport battle and postwar suburban growth.",
          "Home to the Chatham Township Historical Society's Red Brick Schoolhouse Museum since 1991, it was added to the National Register of Historic Places on July 7, 2022."
        ] }
    ],
    facts: [
      "Very few 19th-century rural New Jersey brick schoolhouses survive intact with a two-story layout built expressly for both public classes and Sunday worship."
    ],
    timeline: [
      { y: 1860, t: "Built for Mount Vernon School District No. 7" },
      { y: 1929, t: "Replaced as public school by Southern Boulevard School" },
      { y: 1930, t: "Purchased by Elliott and Martha Averett as a community center" },
      { y: "1958–88", t: "Serves for three decades as Chatham Township Hall" },
      { y: 1991, t: "Opens as the Chatham Township Historical Society Museum" },
      { y: 2022, t: "Added to the National Register of Historic Places (July 7)" }
    ],
    sources: ["nrRedBrick", "wikiTwp"]
  },

  mainstreet: {
    place: "swaim",
    name: "Chatham Historic District & Downtown Main Street",
    built: 1887,
    builtLabel: "1801 turnpike · 1860s–1920s downtown",
    type: "Commercial & Civic Corridor",
    kind: "commerce",
    address: "Main Street, Passaic & Fairmount Avenues, Chatham Borough",
    designation: "New Jersey Register of Historic Places (Sept 6, 1973)",
    lat: 40.74096, lon: -74.38315,
    tagline: "How Chatham's center of gravity shifted west from the Passaic River mills to the railroad crossing—bringing general stores, the first telephone, and the world's first speed bumps.",
    photos: [
      { src: "img/landmarks/mainstreet.jpg", hero: true, year: 2016, caption: "Main Street in downtown Chatham Borough", credit: "NABFNJ / Wikimedia Commons", license: "CC BY-SA 4.0", link: "https://commons.wikimedia.org/wiki/File:ChathamBoro.jpg" }
    ],
    sections: [
      { h: "From Morris Turnpike to 'Kelley's Elbow'",
        p: [
          "Chartered in 1801 as the Morris Turnpike over the old King's Highway, Main Street gradually pulled village commerce westward after Morris & Essex trains began stopping near Passaic and Fairmount avenues in September 1837.",
          "By the 1850s and 1860s, anxious Civil War families gathered for mail at Hudson Minton's General Store and Post Office at Main and Fairmount, while across the way at Main and Budd Lane (North Passaic Avenue) stood Nelson and Frank Kelley's block-long grocery and dry-goods emporium—with a meeting hall upstairs that hosted minstrel shows, sixth- and seventh-grade classes and the early town library."
        ] },
      { h: "First Telephone (1899) & First Speed Bumps (1906)",
        p: [
          "At 262 Main Street, Dr. George Swaim built a picturesque 1887 medical office and pharmacy where by 1899 villagers marveled at a soda fountain and Chatham's first public telephone (with Dr. Frederick Lum Jr.'s first dental office upstairs).",
          "Seven years later, in March and April 1906, Borough fathers under Mayor Frank Kelley tackled a newer marvel—40-mile-per-hour motorcars terrifying horse carriages—by raising flagstone-and-cobblestone crosswalks five inches above Main Street. On June 7, 1906 The New York Times reported on the airborne motorists: 'This scheme of stopping automobile speeding has been discussed by different municipalities, but Chatham was the first place to put it in practice.'"
        ] }
    ],
    facts: [
      "Spectators reportedly set up chairs and bought popcorn along Main Street in April 1906 to watch early touring cars bounce over Chatham's five-inch raised crosswalks.",
      "Further west at 427 Main Street stands the David S. Bower House, individually listed on the National Register of Historic Places (#82001045) in 1982."
    ],
    timeline: [
      { y: 1801, t: "Morris Turnpike chartered along Main Street" },
      { y: "1850–60s", t: "Minton's Post Office and Kelley's Store anchor the railroad crossroads" },
      { y: 1887, t: "Dr. George Swaim builds 262 Main Street (first public telephone by 1899)" },
      { y: 1906, t: "Chatham installs the world's first recorded traffic speed bumps (Apr)" },
      { y: 1973, t: "Chatham Historic District listed on the New Jersey Register (Sept 6)" }
    ],
    sources: ["chsTour", "wikiBoro", "speedBump", "njdep"]
  },

  ogden: {
    place: "ogden",
    name: "Ogden Memorial Presbyterian Church & Library of the Chathams",
    built: 1905,
    builtLabel: "1823 church · 1905 sanctuary · 1924 library",
    type: "Church, Resort Site & Library",
    kind: "civic",
    address: "286 Main Street & 214 Main Street, Chatham Borough",
    designation: "Chatham Historic District · Joint Municipal Library (1974)",
    lat: 40.74190, lon: -74.38390,
    tagline: "A 1902 land swap between Presbyterians and Episcopalians, a burned Gilded Age resort hotel turned WWI Memorial Park, and the 1924 brick Library of the Chathams.",
    photos: [
      { src: "img/landmarks/ogden.jpg", hero: true, year: 2012, caption: "Ogden Memorial Presbyterian Church at Main Street and Elmwood Avenue", credit: "Jim.henderson / Wikimedia Commons", license: "Public domain", link: "https://commons.wikimedia.org/wiki/File:Chatham_Ogden_Presby_jeh.JPG" }
    ],
    sections: [
      { h: "Chatham's Oldest Congregation & the 1902 Property Swap",
        p: [
          "Rooted in the colonial Green Village church and incorporated in 1823 as the Trustees of the Village Church of Chatham, the Presbyterians outgrew 64 Main Street and built an 1873 chapel at 200 Main Street (rolling the 1806 Chatham Academy schoolhouse onto logs and down to 36–38 Summit Avenue).",
          "In 1902 the Presbyterians traded 200 Main Street to St. Paul's Episcopalians in exchange for the John Gould estate at Main and Elmwood, dedicating the stone Ogden Memorial Presbyterian Church in 1905 in honor of Rev. Joseph Meeker Ogden and adding its landmark stone tower in the 1930s."
        ] },
      { h: "From the Fairview House Resort to the 1924 Library",
        p: [
          "Just east at 214 Main Street once stood the grand Fairview House summer hotel, where up to 150 New York vacationers paid three dollars a night to enjoy bowling, dancing, shady verandas and a nine-hole golf course. Used by the Red Cross in World War I, the hotel burned and was razed in 1920, and the grounds became Memorial Park honoring fallen soldiers.",
          "In 1924 townspeople opened the brick Library of the Chathams on the site under founding librarian Lynda Phillips Lum—whose mother famously insisted she keep a pistol tucked in her desk drawer because she walked home after closing at night. Since 1974 it has served jointly as the public library of both Chatham Borough and Chatham Township."
        ] }
    ],
    facts: [
      "The Library's New Jersey Room houses all 14 original volumes of The Fishawack Papers (~5,100 pages), compiled by 425 Chatham contributors starting in 1972.",
      "Adjacent to Memorial Park stands Chatham's September 11 memorial honoring the thirteen residents lost in 2001."
    ],
    timeline: [
      { y: 1823, t: "Trustees of the Village Church of Chatham incorporated" },
      { y: 1873, t: "1806 Chatham Academy rolled to Summit Ave; chapel built at 200 Main" },
      { y: 1905, t: "Stone Ogden Memorial Presbyterian Church opens at Main & Elmwood" },
      { y: 1920, t: "Burned Fairview House hotel razed; site dedicated as WWI Memorial Park" },
      { y: 1924, t: "Brick Library of the Chathams opens at 214 Main Street" },
      { y: 1974, t: "Library becomes a joint municipal library of Borough and Township" }
    ],
    sources: ["chsTour", "exploreChatham", "libHist"]
  },

  rosehouses: {
    place: "rosehouses",
    name: "Chatham's Rose-Growing Greenhouses (\"The Rose Capital\")",
    built: 1909,
    builtLabel: "1880s–1999",
    type: "Horticultural Industry",
    kind: "commerce",
    address: "Hillside Avenue, Watchung Avenue, Main Street & Green Village",
    designation: "Documented on 1909 & 1921 Sanborn Surveys",
    lat: 40.73360, lon: -74.38180,
    tagline: "For nearly a century, acres of steam-heated glass roofs turned Chatham and neighboring Madison into New York's cut-rose garden.",
    photos: [
      { src: "img/landmarks/greenhouses-1909.jpg", hero: true, year: 1909, caption: "D. Falconer's iron-framed, hot-water-heated glass rose greenhouses at Hillside Avenue and Raymond Street on Sheet 1 of the August 1909 Chatham Sanborn Map", credit: "Sanborn Map Company / Library of Congress & Wikimedia Commons", license: "Public domain", link: "https://commons.wikimedia.org/wiki/File:Sanborn_Fire_Insurance_Map_from_Chatham,_Morris_County,_New_Jersey,_1909,_Plate_0001.jpg" }
    ],
    sections: [
      { h: "Why Roses Loved the Watchung Ridge",
        p: [
          "Starting in the 1880s, growers discovered that Chatham and Madison's elevation above coastal fogs gave winter sunlight extra clarity, while the Lackawanna Railroad could put fresh-cut blossoms in Manhattan florist shops before dawn.",
          "Look at the 1909 and 1921 Sanborn Fire Insurance Maps and the 1930 NJ aerial photograph: Chatham Borough sparkled with glasshouse complexes—Chatham Rose Co., David Falconer (Hillside Ave), Samuel Lum and Anthony Ruzicka (West Main St, where Chatham Middle School stands today), J. R. Littlejohn, F. L. Moore, G. Minton, W. G. Badgley, R. Roper, Ryan and J. T. Wagner (Watchung Ave)—alongside Lyman B. Coddington's celebrated hybridizing houses just south in Murray Hill."
        ] },
      { h: "From Millions of Stems to the Last Greenhouse (1999)",
        p: [
          "After World War II, rising heating-oil costs, South American air-freighted flowers and suburban housing demand gradually replaced glass roofs with subdivisions and shopping centers—including the Hickory Tree shopping plazas at Shunpike Road and Southern Boulevard.",
          "In Green Village inside Chatham Township, the Heyl family's greenhouses endured for seven decades as New Jersey's oldest and last commercial cut-rose grower before finally closing in 1999."
        ] }
    ],
    facts: [
      "The August 1909 Chatham Sanborn index lists no fewer than eight distinct commercial florist and greenhouse ranges inside tiny 2.4-square-mile Chatham Borough alone—growing to ten by 1921.",
      "Teenagers skated and swam in Anthony Ruzicka's greenhouse irrigation pond on West Main Street until the high school (now Chatham Middle School) was built on the tract."
    ],
    timeline: [
      { y: "1880s–90s", t: "Commercial steam- and hot-water-heated rose houses spread along the rail line" },
      { y: 1909, t: "Sanborn map records Falconer, Lum, Littlejohn, Moore, Minton, Ryan & Wagner ranges" },
      { y: 1921, t: "Ruzicka, Badgley & Roper ranges join Chatham Rose Co. on the post-WWI survey" },
      { y: "1950s–60s", t: "Postwar subdivisions and Hickory Tree centers replace most glasshouses" },
      { y: 1999, t: "Heyl Roses in Green Village closes as New Jersey's last commercial rose grower" }
    ],
    sources: ["sanborn1909", "sanborn1921", "exploreChatham", "wikiTwp"]
  },

  station: {
    place: "station",
    name: "1914 Delaware, Lackawanna & Western Railroad Station",
    built: 1914,
    builtLabel: "1837 rail · 1914 elevated depot",
    type: "Commuter Rail Landmark",
    kind: "transport",
    address: "Railroad Plaza & Fairmount Avenue, Chatham Borough",
    designation: "Old Main DL&W Railroad Historic District (SHPO Eligible #325)",
    lat: 40.74017, lon: -74.38506,
    tagline: "When the Lackawanna eliminated dangerous grade crossings in 1913–14, it lifted the tracks across Chatham on concrete arches and crowned Fairmount Avenue with a stone depot.",
    photos: [
      { src: "img/landmarks/station.jpg", hero: true, year: 2007, caption: "Eastbound view along the elevated platforms at Chatham Station", credit: "Daniel Case / Wikimedia Commons", license: "CC BY-SA 3.0", link: "https://commons.wikimedia.org/wiki/File:Chatham,_NJ,_train_station.jpg" },
      { src: "img/landmarks/station-1912.jpg", year: 1912, caption: "Original May 29, 1912 DL&W architectural rendering of the proposed Chatham station and landscaped plazas", credit: "Delaware, Lackawanna & Western Railroad / Steamtown NHS, Wikimedia Commons", license: "Public domain", link: "https://commons.wikimedia.org/wiki/File:File-52517-BK-001--Chatham,_NJ--Proposed_station_and_approaches_-1912.05.29-_(27337818-60a8-445d-83e0-2b0d5a402644).jpg" }
    ],
    sections: [
      { h: "September 1837: One of New Jersey's Earliest Rail Towns",
        p: [
          "Preliminary trains of the Morris & Essex Railroad steamed into Chatham on September 17, 1837, with regular passenger service to Orange and Newark beginning September 28, 1837. Because of the steep Watchung climb through Hobart Gap from Summit, early Chatham maintained an active helper-engine and freight yard along Railroad Avenue."
        ] },
      { h: "June 19, 1914: Elevating the Line",
        p: [
          "Under chief engineer George J. Ray, the Delaware, Lackawanna & Western Railroad undertook a sweeping grade-separation campaign in 1913–1914, raising the double tracks above Chatham's streets on embankments and concrete bridges (including the multi-arch Passaic River viaduct and Lafayette Avenue overpass).",
          "Opened for traffic on June 19, 1914 (with the old grade-level depot razed that August), the new station at Fairmount Avenue featured rough-dressed stone walls, slate roofs, a pedestrian subway beneath the tracks and weeping mulberry trees framing its two plazas."
        ] },
      { h: "1930 Electrification & 1996 Midtown Direct",
        p: [
          "On December 18, 1930 the Lackawanna inaugurated 3,000-volt DC overhead electric commuter trains through Chatham—part of Thomas Edison's celebrated Morris & Essex electrification—and in June 1996 NJ Transit's Kearny Connection launched one-seat Midtown Direct service into New York Penn Station, fueling modern demand across both the Borough and Township."
        ] }
    ],
    facts: [
      "The May 29, 1912 Lackawanna presentation drawing preserved in the Steamtown National Historic Site archives shows Chatham Station almost exactly as built two years later.",
      "Before 1914, trains crossed Passaic and Fairmount avenues at street level right beside the old wooden depot shown on the 1901 and 1909 Sanborn maps."
    ],
    timeline: [
      { y: 1837, t: "Morris & Essex Railroad opens regular service at Chatham (Sept 28)" },
      { y: 1868, t: "Delaware, Lackawanna & Western leases the Morris & Essex line" },
      { y: 1914, t: "Elevated stone Chatham Station opens June 19; old depot razed August" },
      { y: 1930, t: "Lackawanna electric trains inaugurate service at Chatham (Dec 18)" },
      { y: 1996, t: "NJ Transit Midtown Direct links Chatham straight to NY Penn Station" }
    ],
    sources: ["stationWiki", "njdep", "sanborn1901", "sanborn1921"]
  },

  boroughhall: {
    place: "boroughhall",
    name: "Chatham Borough Hall (Old Chatham High School)",
    built: 1922,
    builtLabel: "1922 school · 1988 Borough Hall",
    type: "School & Municipal Hall",
    kind: "civic",
    address: "54 Fairmount Avenue, Chatham Borough",
    designation: "Seat of Chatham Borough Government",
    lat: 40.73849, lon: -74.38489,
    tagline: "Built in the 1920s commuter boom as Chatham High School, then reborn as Borough Hall when Borough and Township voters united their schools in 1986.",
    photos: [
      { src: "img/landmarks/boroughhall.jpg", hero: true, year: 2012, caption: "Chatham Borough Hall at 54 Fairmount Avenue", credit: "Jim.henderson / Wikimedia Commons", license: "CC0 (Public domain)", link: "https://commons.wikimedia.org/wiki/File:Chatham_Boro_Municipal_jeh.JPG" }
    ],
    sections: [
      { h: "Educating Commuter-Era Chatham",
        p: [
          "As the 1914 Lackawanna station brought young families to Fairmount, Hillside, Washington and Lafayette avenues, Chatham Borough outgrew its 1909 Public School No. 1 and erected this stately brick Colonial Revival schoolhouse on Fairmount Avenue just south of the railroad plaza.",
          "For decades it served as Chatham Borough's high school and later middle school while neighboring Chatham Township built its own separate high school on Lafayette Avenue in the 1960s."
        ] },
      { h: "The 1986 School Merger & Adaptive Reuse",
        p: [
          "In November 1986, voters in both Chatham Borough and Chatham Township approved regionalizing their two separate school systems into the unified School District of the Chathams (effective 1988). With high schoolers consolidated on Lafayette Avenue and middle schoolers on Main Street, the Borough adaptively reused 54 Fairmount Avenue as Chatham Borough Hall."
        ] }
    ],
    facts: [
      "The 1909 Sanborn map shows Chatham's earlier Boro Hall and Fire Department just around the corner on Fairmount Avenue before 54 Fairmount became the civic anchor."
    ],
    timeline: [
      { y: 1897, t: "Chatham Borough incorporates on March 1" },
      { y: "1920s", t: "Brick Colonial Revival school erected at 54 Fairmount Avenue" },
      { y: 1986, t: "Borough & Township voters approve regional School District of the Chathams (Nov)" },
      { y: 1988, t: "Building converted into Chatham Borough Hall" }
    ],
    sources: ["wikiBoro", "wikiTwp", "exploreChatham"]
  },

  madamebey: {
    place: "madamebey",
    name: "Site of Madame Bey's Championship Boxing Camp",
    built: 1923,
    builtLabel: "1923–1960s (sold 1969)",
    type: "World Boxing Training Camp",
    kind: "culture",
    address: "516 River Road, Chatham Township",
    designation: "Morris County Heritage Marker · NJ Boxing Hall of Fame",
    lat: 40.70984, lon: -74.41594,
    tagline: "On thirty hilly acres above the Passaic River, a Turkish-Armenian opera singer and former diplomat's wife ran the training camp of heavyweight legends.",
    photos: [
      { src: "img/landmarks/madamebey.jpg", hero: true, year: 2020, caption: "September 2020 dedication of the Fair Mount Cemetery headstone honoring Sidky Bey and Madame Hranoush Bey", credit: "Tfinneran / Wikimedia Commons", license: "CC BY-SA 4.0", link: "https://commons.wikimedia.org/wiki/File:Dedication_of_Headstone_for_Sidky_Bey_and_Madame_Hranoush_Bey.jpg" }
    ],
    sections: [
      { h: "From Diplomatic Salons to the Ringside Bell",
        p: [
          "Born Hranoush Agaganian in Constantinople in 1881 and trained as a mezzo-soprano at the American College for Girls, Madame Bey married Ottoman Foreign Ministry diplomat Mehmed Sidky Bey in Washington—where she stood beside President William McKinley in Buffalo moments before his 1901 assassination and sang opera at Carnegie Hall.",
          "After breaking with the Ottoman government and losing their Oriental-rug fortune, the couple worked with lightweight champion Freddie Welsh at his neighboring Summit health farm before opening their own 30-acre country boxing camp at 516 River Road in Chatham Township in 1923."
        ] },
      { h: "Mother Confessor to Heavyweight Champions",
        p: [
          "Madame Bey allowed zero alcohol, zero swearing and lights-out at ten, cooked hearty farm meals herself, and spoke six languages. At one point more than half of the world's reigning boxing champions trained in her barn gymnasium and ran roadwork along Chatham Township's River Road hills: Gene Tunney, Max Schmeling, Primo Carnera, James J. 'Cinderella Man' Braddock, Lou Ambers, Tony Canzoneri, Freddie Steele and Tommy Farr.",
          "Following Madame Bey's death in 1942, longtime associate Ehsan Karadag kept the camp thriving through the 1950s, welcoming Sugar Ray Robinson, Floyd Patterson, Jersey Joe Walcott, Ezzard Charles, Rocky Graziano, Jake LaMotta, Sandy Saddler and Kid Gavilan before Catskills resort hotels ended the country-camp era and the property was sold in 1969."
        ] }
    ],
    facts: [
      "Max Schmeling loved Chatham Township so much during his world-title training camps at Madame Bey's that sports writers dubbed River Road 'the road to Madison Square Garden.'",
      "A yellow farmhouse and barn gymnasium stood on the 30-acre property; a red brick residence occupies the gym site today, marked by a roadside historical plaque."
    ],
    timeline: [
      { y: 1923, t: "Hranoush 'Madame' Bey opens prizefighter camp at 516 River Road" },
      { y: "1926–38", t: "Tunney, Schmeling, Carnera, Braddock & Canzoneri train on River Road" },
      { y: 1942, t: "Madame Bey dies; Ehsan Karadag continues operating the camp" },
      { y: "1946–59", t: "Sugar Ray Robinson, Rocky Graziano, Jersey Joe Walcott & Floyd Patterson train here" },
      { y: 1969, t: "Former camp property sold as suburban homes spread along River Road" }
    ],
    sources: ["summitBey", "wikiTwp", "beyWiki"]
  },

  greenvillage: {
    place: "greenvillage",
    name: "Green Village Crossroads",
    built: 1790,
    builtLabel: "18th century–today",
    type: "Historic Rural Hamlet",
    kind: "house",
    address: "Green Village Road & Meyersville Road, Chatham Township (07935)",
    designation: "Colonial & 19th-Century Crossroads Hamlet",
    lat: 40.73882, lon: -74.44984,
    tagline: "The only colonial settlement of 1806 Chatham Township that never seceded—preserving its own post office, fire company, church and country-road character.",
    photos: [
      { src: "img/landmarks/greenvillage-fire.jpg", hero: true, year: 2013, caption: "Green Village Firehouse in western Chatham Township", credit: "Scu ba / Wikimedia Commons", license: "CC0 (Public domain)", link: "https://commons.wikimedia.org/wiki/File:Green_Village_Firehouse.jpg" },
      { src: "img/landmarks/greenvillage-cutler.jpg", year: 1933, caption: "Residence of Bertram Cutler in Green Village, photographed in the 1930s", credit: "Gottscho-Schleisner Collection, Library of Congress", license: "Public domain (No known restrictions)", link: "https://commons.wikimedia.org/wiki/File:Bertram_Cutler,_residence_in_Green_Village,_New_Jersey._LOC_gsc.5a17767.jpg" }
    ],
    sections: [
      { h: "Older Than Chatham Township Itself",
        p: [
          "Settled in the 18th century along the northern rim of the Great Swamp straddling today's Chatham Township and Harding Township line, Green Village gave birth to the colonial Presbyterian congregation from which Chatham Borough's church grew in 1823.",
          "When Madison (1889), Chatham Borough (1897) and Florham Park (1899) broke away from 1806 Chatham Township, Green Village remained inside the Township while keeping its unmistakable village identity, its own 07935 ZIP code (372 Green Village Road), Methodist church, general store, firehouse and rose farms."
        ] },
      { h: "Country Estates & Heyl Roses",
        p: [
          "In the 1920s and 1930s New York executives—such as John D. Rockefeller's financial adviser Bertram Cutler, whose Green Village home was photographed by Samuel Gottscho—restored colonial farmhouses along Green Village Road and Britten Road, while Heyl Roses tended New Jersey's longest-running commercial rose greenhouses nearby until 1999."
        ] }
    ],
    facts: [
      "Even today, Green Village residents have their own 07935 post office at 372 Green Village Road rather than Chatham's 07928 ZIP code."
    ],
    timeline: [
      { y: "mid-1700s", t: "Early farm families and Presbyterian meetinghouse settle Green Village" },
      { y: 1806, t: "Included in newly incorporated Chatham Township (Feb 12)" },
      { y: 1899, t: "Remains Chatham Township's sole historic hamlet after Florham Park secedes" },
      { y: 1999, t: "Heyl Roses in Green Village closes after seven decades" }
    ],
    sources: ["wikiTwp", "gottscho"]
  },

  greatswamp: {
    place: "greatswamp",
    name: "Great Swamp National Wildlife Refuge & Wilderness Area",
    built: 1960,
    builtLabel: "1960 refuge · 1968 Wilderness",
    type: "National Wildlife Refuge & Natural Landmark",
    kind: "nature",
    address: "Southern Boulevard, Meyersville & White Bridge Roads, Chatham Township",
    designation: "First U.S. Dept. of the Interior Wilderness Area (Sept 28, 1968) · National Natural Landmark",
    lat: 40.71200, lon: -74.43500,
    tagline: "Remnant of glacial Lake Passaic—saved in 1959–1968 when Chatham and Harding citizens bought 3,000 acres out from under the Port Authority's 10,000-acre super-jetport.",
    photos: [
      { src: "img/landmarks/greatswamp.jpg", hero: true, year: 2011, caption: "Wetlands and hardwood islands of Great Swamp National Wildlife Refuge", credit: "U.S. Fish and Wildlife Service / Wikimedia Commons", license: "Public domain", link: "https://commons.wikimedia.org/wiki/File:Great_Swamp_National_Wildlife_Refuge_(5433709265).jpg" },
      { src: "img/landmarks/greatswamp-boardwalk.jpg", year: 2023, caption: "Boardwalk trail across the Great Swamp marshes", credit: "Ryan Hodnett / Wikimedia Commons", license: "CC BY-SA 4.0", link: "https://commons.wikimedia.org/wiki/File:Great_Swamp_National_Wildlife_Refuge,_New_Jersey_2023-04-12_(02).jpg" }
    ],
    sections: [
      { h: "Bottom of Glacial Lake Passaic",
        p: [
          "Thirteen thousand years ago, when the Wisconsin glacier blocked the Watchung gaps, 30-mile-long Glacial Lake Passaic filled this basin up to 200 feet deep. After the ice retreated and the Passaic River cut out through Little Falls and Millington Gorge, a 55-square-mile mosaic of wooded ridges, sedge marshes, brooks and vernal pools remained across southern Chatham Township, Harding and Long Hill."
        ] },
      { h: "1959–1960: Citizen David Defeats the Jetport Goliath",
        p: [
          "On December 3, 1959 The Newark Evening News broke word that the Port of New York Authority planned to level Green Village, Meyersville and 10,000 acres of the Great Swamp to build a four-runway metropolitan jetport bigger than Idlewild, Newark and LaGuardia combined.",
          "Neighbors rallied overnight into the Jersey Jetport Site Association and the North American Wildlife Foundation's Great Swamp Committee—led by Marcellus Hartley Dodge, Helen Fenske and over 6,000 small donors across 462 organizations—quietly buying up 3,000 acres parcel by parcel and gifting them to the federal government. On November 3, 1960 the Secretary of the Interior officially established Great Swamp National Wildlife Refuge."
        ] },
      { h: "September 28, 1968: America's First Interior Wilderness",
        p: [
          "Because the Port Authority still eyed condemnation of the refuge through the mid-1960s, local volunteers campaigned under the new Wilderness Act of 1964—where only an Act of Congress can permit a road or runway. On September 28, 1968 President Lyndon B. Johnson signed Public Law 90-532 designating 3,660 acres (almost the entire eastern half, embracing western Chatham Township) as the first Wilderness Area ever created within the Department of the Interior, permanently ending the jetport."
        ] }
    ],
    facts: [
      "Over 244 species of birds, plus wood turtles, blue-spotted salamanders, river otters and fox, inhabit the 7,800-acre refuge just 26 miles west of Manhattan.",
      "Thousands of schoolchildren mailed dimes and quarters during the 1960s land drive to 'buy an acre of swamp' before bulldozers could arrive."
    ],
    timeline: [
      { y: "11,000 BCE", t: "Glacial Lake Passaic drains, leaving the Great Swamp basin" },
      { y: 1959, t: "Port Authority proposes 10,000-acre Great Swamp super-jetport (Dec)" },
      { y: 1960, t: "Citizens donate 3,000 acres; Great Swamp National Wildlife Refuge created (Nov 3)" },
      { y: 1966, t: "Designated a National Natural Landmark" },
      { y: 1968, t: "Congress designates 3,660-acre Great Swamp Wilderness Area (Sept 28)" }
    ],
    sources: ["greatSwamp", "wikiTwp"]
  }
};
