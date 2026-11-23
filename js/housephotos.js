/* Historic photographs of specific Chatham houses & landmarks (HABS / Library of Congress / Wikimedia Commons,
   public domain or CC-licensed). Owner names only for pre-1951 historical figures. */
var MW = window.MW = window.MW || {};
MW.housePhotos = [
  {
    "address": "25 Main Street",
    "src": "img/houses/25-main-1938.jpg",
    "year": 1938,
    "caption": "Day-Munn House (exterior from southeast, October 27, 1938 · HABS NJ,14-CHAT,4-1)",
    "credit": "Nathaniel R. Ewan / Historic American Buildings Survey, Library of Congress",
    "license": "Public domain",
    "link": "https://commons.wikimedia.org/wiki/File:Historic_American_Buildings_Survey_Nathaniel_R._Ewan,_Photographer_October_27,_1938_EXTERIOR_-_VIEW_FROM_SOUTHEAST_-_Day-Munn_House,_25_Main_Street,_Chatham,_Morris_County,_NJ_HABS_NJ,14-CHAT,4-1.tif"
  },
  {
    "address": "142 Main Street",
    "src": "img/houses/142-main-habs.jpg",
    "year": 1937,
    "caption": "Day-Hamblen House (south elevation, from early print · HABS NJ,14-CHAT,3-1)",
    "credit": "Historic American Buildings Survey, Library of Congress",
    "license": "Public domain",
    "link": "https://commons.wikimedia.org/wiki/File:Historic_American_Buildings_Survey,_Taken_from_an_old_print_probably_from_a_book_or_pamphlet_EXTERIOR_-_SOUTH_ELEVATION_-_Day-Hamblen_House,_142_Main_Street,_Chatham,_Morris_County_HABS_NJ,14-CHAT,3-1.tif"
  },
  {
    "address": "62 Elmwood Avenue",
    "src": "img/houses/62-elmwood-1936-1.jpg",
    "year": 1936,
    "caption": "Stephen Day House (north elevation, April 30, 1936 · HABS NJ,14-CHAT,2-1)",
    "credit": "R. Merritt Lacey / Historic American Buildings Survey, Library of Congress",
    "license": "Public domain",
    "link": "https://commons.wikimedia.org/wiki/File:Historic_American_Buildings_Survey_R._Merritt_Lacey,_Photographer_April_30,_1936_EXTERIOR_-_NORTH_ELEVATION_-_Stephen_Day_House,_62_Elmwood_Road,_Chatham,_Morris_County,_NJ_HABS_NJ,14-CHAT,2-1.tif"
  },
  {
    "address": "62 Elmwood Avenue",
    "src": "img/houses/62-elmwood-1936-2.jpg",
    "year": 1936,
    "caption": "Stephen Day House (northeast elevation, April 30, 1936 · HABS NJ,14-CHAT,2-2)",
    "credit": "R. Merritt Lacey / Historic American Buildings Survey, Library of Congress",
    "license": "Public domain",
    "link": "https://commons.wikimedia.org/wiki/File:Historic_American_Buildings_Survey_R._Merritt_Lacey,_Photographer_April_30,_1936_EXTERIOR_-_NORTHEAST_ELEVATION_-_Stephen_Day_House,_62_Elmwood_Road,_Chatham,_Morris_County,_NJ_HABS_NJ,14-CHAT,2-2.tif"
  },
  {
    "address": "186 Main Street",
    "src": "img/landmarks/dusenberry.jpg",
    "year": 2007,
    "caption": "Dusenberry House / 1848 Presbyterian Parsonage of Rev. Joseph Meeker Ogden",
    "credit": "Daniel Case / Wikimedia Commons",
    "license": "CC BY-SA 3.0",
    "link": "https://commons.wikimedia.org/wiki/File:Dusenberry_House,_Chatham,_NJ.jpg"
  },
  {
    "address": "24 Southern Boulevard",
    "src": "img/landmarks/redbrick.jpg",
    "year": 2022,
    "caption": "Mount Vernon School (1860), now the Red Brick Schoolhouse Museum",
    "credit": "Zeete / Wikimedia Commons",
    "license": "CC BY-SA 4.0",
    "link": "https://commons.wikimedia.org/wiki/File:Mount_Vernon_School,_Chatham_Township,_NJ.jpg"
  },
  {
    "address": "54 Fairmount Avenue",
    "src": "img/landmarks/boroughhall.jpg",
    "year": 2012,
    "caption": "Chatham Borough Hall, built in 1922 as Chatham High School",
    "credit": "Jim.henderson / Wikimedia Commons",
    "license": "CC0",
    "link": "https://commons.wikimedia.org/wiki/File:Chatham_Boro_Municipal_jeh.JPG"
  },
  {
    "address": "286 Main Street",
    "src": "img/landmarks/ogden.jpg",
    "year": 2012,
    "caption": "Ogden Memorial Presbyterian Church (1905 stone sanctuary; 1930s tower)",
    "credit": "Jim.henderson / Wikimedia Commons",
    "license": "Public domain",
    "link": "https://commons.wikimedia.org/wiki/File:Chatham_Ogden_Presby_jeh.JPG"
  }
];
MW.housePhotosFor = (number, road) => {
  const n = s => (s || "").toUpperCase().replace(/[^A-Z ]/g, "").replace(/\b(AVENUE|AVE|AV|ROAD|RD|STREET|ST|PLACE|PL|TERRACE|TER|DRIVE|DR|COURT|CT|BOULEVARD|BLVD)\b/g, "").trim();
  return MW.housePhotos.filter(p => {
    const m = p.address.match(/^(\d+)\s+(.+)$/);
    return m && String(number) === m[1] && n(road) === n(m[2]);
  });
};
