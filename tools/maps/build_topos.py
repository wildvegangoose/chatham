"""Build the dated historic-map overlays (img/maps/topo*.webp) from USGS historical topographic maps.

Reads tools/town.json: "map_bbox" (area to cover) and "topo_layers" (which quads make each layer).
For each quad: download the GeoTIFF, expand any color palette to RGB, mask outside the quad's neatline
(so map collars don't overlap neighbours), warp/mosaic into Web Mercator (EPSG:3857) over map_bbox,
save a cached GeoTIFF for landmark 'through the ages' crops, and write img/maps/<name>.webp.

Pure-Python implementation using rasterio + numpy + Pillow (no system gdal-bin required).
Usage: /tmp/gis-venv/bin/python tools/maps/build_topos.py [workdir]
"""
import json, math, os, sys, urllib.request
import numpy as np
import rasterio
from rasterio.transform import from_bounds
from rasterio.warp import reproject, Resampling, transform_geom
from rasterio.features import geometry_mask
from PIL import Image

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", ".."))
TOWN = json.load(open(os.path.join(ROOT, "tools", "town.json")))
WORK = sys.argv[1] if len(sys.argv) > 1 else os.path.join(ROOT, "archive", "_tmp", "topo")
OUT = os.path.join(ROOT, "img", "maps")
BASE = "https://prd-tnm.s3.amazonaws.com/StagedProducts/Maps/HistoricalTopo/GeoTIFF/"
os.makedirs(WORK, exist_ok=True)
os.makedirs(OUT, exist_ok=True)

def merc(lon, lat):
    x = lon * 20037508.342789244 / 180.0
    y = math.log(math.tan((90.0 + lat) * math.pi / 360.0)) * 20037508.342789244 / math.pi
    return x, y

b = TOWN["map_bbox"]
x0, y0 = merc(b["west"], b["south"])
x1, y1 = merc(b["east"], b["north"])

for name, layer in TOWN["topo_layers"].items():
    if name.startswith("_"):
        continue
    res = float(layer["res"])
    width = int(round((x1 - x0) / res))
    height = int(round((y1 - y0) / res))
    dst_transform = from_bounds(x0, y0, x1, y1, width, height)
    dst_crs = "EPSG:3857"

    canvas = np.zeros((4, height, width), dtype=np.uint8)

    for path, w, s, e, n in layer["quads"]:
        fn = os.path.basename(path).replace("%20", "_")
        local = os.path.join(WORK, fn)
        # Reuse /tmp/topo_check cache if already downloaded
        alt = os.path.join("/tmp/topo_check", fn)
        if not os.path.exists(local) and os.path.exists(alt):
            os.symlink(alt, local)
        if not os.path.exists(local):
            print("downloading", path)
            data = urllib.request.urlopen(BASE + path, timeout=120).read()
            open(local, "wb").write(data)

        with rasterio.open(local) as src:
            # Read RGB bands (expand palette if single-band)
            if src.count == 1 and src.colormap(1):
                cm = src.colormap(1)
                lut = np.array([cm.get(i, (0, 0, 0, 255))[:3] for i in range(256)], dtype=np.uint8)
                idx = src.read(1)
                rgb = np.transpose(lut[idx], (2, 0, 1))
            else:
                rgb = src.read([1, 2, 3])

            # Warp each band into the EPSG:3857 canvas grid
            warped = np.zeros((3, height, width), dtype=np.uint8)
            for band_i in range(3):
                reproject(
                    source=rgb[band_i],
                    destination=warped[band_i],
                    src_transform=src.transform,
                    src_crs=src.crs,
                    dst_transform=dst_transform,
                    dst_crs=dst_crs,
                    resampling=Resampling.bilinear,
                )

            # Build neatline polygon in EPSG:4326 with dense vertices along edges, transform to EPSG:3857
            xs = np.linspace(w, e, 32)
            ys = np.linspace(s, n, 32)
            ring = (
                [[float(x), float(s)] for x in xs]
                + [[float(e), float(y)] for y in ys[1:]]
                + [[float(x), float(n)] for x in xs[-2::-1]]
                + [[float(w), float(y)] for y in ys[-2::-1]]
            )
            geom_3857 = transform_geom("EPSG:4326", dst_crs, {"type": "Polygon", "coordinates": [ring]})
            inside = ~geometry_mask([geom_3857], out_shape=(height, width), transform=dst_transform)
            # Also exclude pure black (0,0,0) nodata pixels outside source raster
            valid = inside & ((warped[0] > 0) | (warped[1] > 0) | (warped[2] > 0))
            for band_i in range(3):
                canvas[band_i][valid] = warped[band_i][valid]
            canvas[3][valid] = 255

    mosaic_tif = os.path.join(WORK, name + ".tif")
    with rasterio.open(
        mosaic_tif, "w", driver="GTiff", height=height, width=width, count=4,
        dtype="uint8", crs=dst_crs, transform=dst_transform, compress="deflate"
    ) as dst:
        dst.write(canvas)

    webp_path = os.path.join(OUT, name + ".webp")
    img = Image.fromarray(np.transpose(canvas, (1, 2, 0)), mode="RGBA")
    img.save(webp_path, "WEBP", quality=78, method=4)
    print(f"{name} -> img/maps/{name}.webp ({width}x{height}, {os.path.getsize(webp_path)//1024} KB)")

print("Overlay bounds for js/explore.js:", [[b["south"], b["west"]], [b["north"], b["east"]]])
