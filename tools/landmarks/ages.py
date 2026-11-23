"""'Through the ages' images for landmark pages: crops of the dated historic maps and NJ aerial photos
centred on each landmark. Usage: /tmp/gis-venv/bin/python tools/landmarks/ages.py id:lat:lon [id:lat:lon ...]
Topo crops come from the georeferenced overlays (GeoTIFFs in TOPO_DIR, built by build_topos.py);
aerials are requested from the NJ Office of GIS WMS."""
import os, sys, math, urllib.request, urllib.parse
import numpy as np
import rasterio
from rasterio.windows import from_bounds as window_from_bounds
from rasterio.enums import Resampling
from PIL import Image

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", ".."))
OUT = os.path.join(ROOT, "img", "ages")
TOPO_DIR = os.environ.get("TOPO_DIR", os.path.join(ROOT, "archive", "_tmp", "topo"))
TOPOS = [
    ("1888", "topo1888"),
    ("1898", "topo1898"),
    ("1906", "topo1906"),
    ("1921", "topo1921"),
    ("1947", "topo1947"),
    ("1955", "topo1955"),
    ("1981", "topo1981"),
]
AERIALS = [
    ("1930", "BlackWhite1930"),
    ("1995", "Infrared1995"),
    ("2007", "Natural2007"),
    ("2020", "Natural2020"),
]
W, H = 640, 440
HALF = {"62500": 700, "24000": 380, "aerial": 260}
FORCE = os.environ.get("FORCE") == "1"

def merc(lat, lon):
    x = lon * 20037508.342789244 / 180.0
    y = math.log(math.tan((90.0 + lat) * math.pi / 360.0)) * 20037508.342789244 / math.pi
    return x, y

for arg in sys.argv[1:]:
    lid, lat, lon = arg.split(":")
    lat, lon = float(lat), float(lon)
    x, y = merc(lat, lon)
    k = 1.0 / math.cos(math.radians(lat))
    d = os.path.join(OUT, lid)
    os.makedirs(d, exist_ok=True)
    for label, name in TOPOS:
        half = HALF["62500" if int(label) < 1940 else "24000"]
        hw, hh = half * k, half * k * H / W
        src_path = os.path.join(TOPO_DIR, name + ".tif")
        dst_path = os.path.join(d, f"{label}-map.jpg")
        if not os.path.exists(src_path) or (os.path.exists(dst_path) and not FORCE):
            continue
        with rasterio.open(src_path) as src:
            win = window_from_bounds(x - hw, y - hh, x + hw, y + hh, src.transform)
            arr = src.read([1, 2, 3], window=win, out_shape=(3, H, W), boundless=True, fill_value=244, resampling=Resampling.bilinear)
            img = Image.fromarray(np.transpose(arr, (1, 2, 0)), mode="RGB")
            img.save(dst_path, "JPEG", quality=82)
    for label, layer in AERIALS:
        hw, hh = HALF["aerial"] * k, HALF["aerial"] * k * H / W
        dst_path = os.path.join(d, f"{label}-aerial.jpg")
        if os.path.exists(dst_path) and not FORCE:
            continue
        q = urllib.parse.urlencode({
            "SERVICE": "WMS", "VERSION": "1.1.1", "REQUEST": "GetMap",
            "LAYERS": layer, "STYLES": "", "SRS": "EPSG:3857",
            "BBOX": f"{x-hw},{y-hh},{x+hw},{y+hh}", "WIDTH": W, "HEIGHT": H, "FORMAT": "image/jpeg"
        })
        data = urllib.request.urlopen(f"https://img.nj.gov/imagerywms/{layer}?{q}", timeout=60).read()
        open(dst_path, "wb").write(data)
    print(lid, len(os.listdir(d)), "images")
