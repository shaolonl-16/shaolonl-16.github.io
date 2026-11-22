"""Regenerate web previews without changing the supplied PDFs, SVG, or photos.

Requires: Pillow and PyMuPDF. Run from any directory with Python 3.
The generated files are committed; these packages are not needed by Jekyll.
"""
from pathlib import Path
import json
import re
import xml.etree.ElementTree as ET

from PIL import Image, ImageOps
import pymupdf

ROOT = Path(__file__).resolve().parents[1]


def main():
    dimensions = {"overviews": {}, "photos": {}}
    figures = ROOT / "assets/images/overviews"
    photos = ROOT / "assets/images/photos"
    figures.mkdir(parents=True, exist_ok=True)
    photos.mkdir(parents=True, exist_ok=True)

    with pymupdf.open(ROOT / "assets/images/favicon.svg") as icon:
        icon[0].get_pixmap(alpha=False).save(ROOT / "assets/images/apple-touch-icon.png")

    for source in sorted((ROOT / "overview_figs").glob("*.pdf")):
        with pymupdf.open(source) as document:
            page = document[0]
            scale = 2400 / page.rect.width
            pixmap = page.get_pixmap(matrix=pymupdf.Matrix(scale, scale), alpha=False)
            image = Image.frombytes("RGB", (pixmap.width, pixmap.height), pixmap.samples)
            image.save(figures / (source.stem + ".webp"), quality=94, method=6)
            dimensions["overviews"][source.stem] = {"width": image.width, "height": image.height}

    for source in sorted((ROOT / "overview_figs").glob("*.svg")):
        svg = ET.parse(source).getroot()
        box = svg.get("viewBox")
        if box:
            _, _, width, height = map(float, box.split())
        else:
            width = float(re.match(r"[\d.]+", svg.attrib["width"]).group())
            height = float(re.match(r"[\d.]+", svg.attrib["height"]).group())
        dimensions["overviews"][source.stem] = {"width": round(width), "height": round(height)}

    for source in sorted((ROOT / "photos").glob("*.jpg")):
        with Image.open(source) as original:
            image = ImageOps.exif_transpose(original).convert("RGB")
            image.thumbnail((960, 960), Image.Resampling.LANCZOS)
            image.save(photos / (source.stem + ".webp"), quality=86, method=6)
            dimensions["photos"][source.name] = {"width": image.width, "height": image.height}

    # JSON is supported by Jekyll's data loader, without a separate YAML dependency.
    (ROOT / "_data/media_dimensions.json").write_text(json.dumps(dimensions, indent=2) + "\n")
    print(f"Prepared {len(dimensions['overviews'])} overviews and {len(dimensions['photos'])} photos.")


if __name__ == "__main__":
    main()
