#!/usr/bin/env python3
"""Generate GDEF splash screens (iOS 1242x2688, Android 1440x3200)."""

from PIL import Image, ImageDraw, ImageFont

BG   = (13, 27, 42)
GOLD = (180, 145, 60)
CREAM = (210, 195, 155)


def gen_splash(W, H, out):
    img = Image.new("RGB", (W, H), BG)
    draw = ImageDraw.Draw(img)

    # Layout: top third = Estonian flag, middle third = text, bottom third = French flag
    THIRD = H // 3

    # ── Estonian flag (top third) ─────────────────────────────────────────────
    for i, color in enumerate([(0, 114, 206), (0, 0, 0), (255, 255, 255)]):
        y0 = i * (THIRD // 3)
        y1 = (i + 1) * (THIRD // 3)
        draw.rectangle([0, y0, W, y1], fill=color)

    # ── French flag (bottom third) ────────────────────────────────────────────
    stripe_w = W // 3
    for i, color in enumerate([(0, 85, 164), (255, 255, 255), (239, 65, 53)]):
        x0 = i * stripe_w
        x1 = (i + 1) * stripe_w
        draw.rectangle([x0, H - THIRD, x1, H], fill=color)

    # ── Text (centered in the middle third) ───────────────────────────────────
    # Sizes are scaled relative to width so both resolutions look identical.
    s = W / 1242.0

    def georgia(bold, size):
        path = "/System/Library/Fonts/Supplemental/Georgia Bold.ttf" if bold \
            else "/System/Library/Fonts/Supplemental/Georgia.ttf"
        try:
            return ImageFont.truetype(path, int(size))
        except Exception:
            return ImageFont.load_default()

    font_sub  = georgia(True, 100 * s)
    font_desc = georgia(False, 82 * s)

    # Auto-fit title font to 88% of width
    TITLE = "Sõnaraamat"
    MAX_W = int(W * 0.88)
    font_size = int(220 * s)
    while font_size > int(60 * s):
        ft = georgia(True, font_size)
        bbox = draw.textbbox((0, 0), TITLE, font=ft)
        if bbox[2] - bbox[0] <= MAX_W:
            break
        font_size -= 4
    font_title = ft

    CX = W // 2
    CY = H // 2

    draw.text((CX, CY - int(140 * s)), TITLE,              font=font_title, fill=GOLD,  anchor="mm")
    draw.text((CX, CY + int(60 * s)),  "EESTI · FRANÇAIS",  font=font_sub,   fill=CREAM, anchor="mm")

    LINE_W = int(420 * s)
    draw.line([(CX - LINE_W // 2, CY + int(160 * s)), (CX + LINE_W // 2, CY + int(160 * s))],
              fill=GOLD, width=max(1, int(5 * s)))

    draw.text((CX, CY + int(270 * s)), "Dictionnaire bilingue", font=font_desc, fill=CREAM, anchor="mm")

    img.save(out, "PNG")
    print(f"Saved {out}")


if __name__ == "__main__":
    base = "/Users/jcommaret/Sites/GDEF/assets/images"
    gen_splash(1242, 2688, f"{base}/splash-ios.png")
    gen_splash(1440, 3200, f"{base}/splash-android.png")
