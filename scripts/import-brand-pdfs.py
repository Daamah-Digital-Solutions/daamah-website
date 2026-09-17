"""يستورد عروض الهوية (PDF) إلى معرض كل عمل، صفحةً صفحة.

اللوحات الطويلة (عدّة موك-أبات مرصوصة في صفحة واحدة) تُقسَم عند
الفواصل الموحّدة اللون بينها، فلا يُقطع موك-أب من منتصفه.
"""
import fitz, os, shutil
import numpy as np
from PIL import Image

D = r"C:\Users\MT\Downloads"
G = r"E:\Work\daamah-digital-solutions\daamah-website\public\assets\work\gallery"
W = 1200

# slug ← [(الملف، الصفحات المستبعدة)]
JOBS = {
    "inmaa": [("inmaa brand identity.pdf", {2, 9})],
    "adg-brand": [("ADG brand identity visualization.pdf", {2})],
    "building-line": [
        ("Building Line Visual Identity Direction 1.pdf", set()),
        ("Building Line Visual Identity Direction 2.pdf", set()),
    ],
    "amlak": [("AMLAK ESTATE FINAL PRESENTATION 2.pdf", {3})],
    "basmat-alomran": [("basmat alomran.pdf", set())],
}


def render(page):
    z = W / page.rect.width
    pix = page.get_pixmap(matrix=fitz.Matrix(z, z), alpha=False)
    return Image.frombytes("RGB", (pix.width, pix.height), pix.samples)


def split_tall(im):
    """يقسم الصفحة الطويلة عند صفوف موحّدة اللون."""
    w, h = im.size
    if h <= w * 1.35:
        return [im]
    a = np.asarray(im.convert("L"), dtype=np.int16)
    flat = (a.max(axis=1) - a.min(axis=1)) < 10  # صفّ بلون واحد
    # مقاطع الفواصل: سلاسل صفوف موحّدة طولها ≥ 6px
    gaps, start = [], None
    for y, f in enumerate(flat):
        if f and start is None:
            start = y
        elif not f and start is not None:
            if y - start >= 6:
                gaps.append((start + y) // 2)
            start = None
    cuts, top = [], 0
    for g in gaps:
        if g - top >= w * 0.45:
            cuts.append((top, g))
            top = g
    cuts.append((top, h))
    # ذيل قصير جدًا يُضمّ إلى ما قبله
    if len(cuts) > 1 and cuts[-1][1] - cuts[-1][0] < w * 0.3:
        a0, _ = cuts[-2]
        cuts[-2:] = [(a0, h)]
    out = []
    for y0, y1 in cuts:
        part = im.crop((0, y0, w, y1))
        # قصّ الحواف الموحّدة أعلى وأسفل كل قطعة
        arr = np.asarray(part.convert("L"), dtype=np.int16)
        rows = np.where((arr.max(axis=1) - arr.min(axis=1)) >= 10)[0]
        if len(rows) == 0:
            continue
        part = part.crop((0, max(0, rows[0] - 12), w, min(part.height, rows[-1] + 13)))
        if part.height > 60:
            out.append(part)
    return out


for slug, files in JOBS.items():
    out = os.path.join(G, slug)
    if os.path.exists(out):
        shutil.rmtree(out)
    os.makedirs(out)
    n = 0
    for name, skip in files:
        doc = fitz.open(os.path.join(D, name))
        for i, page in enumerate(doc, start=1):
            if i in skip:
                continue
            for part in split_tall(render(page)):
                n += 1
                part.save(os.path.join(out, f"{n:02d}.jpg"), quality=84, optimize=True)
    print(slug, n)
