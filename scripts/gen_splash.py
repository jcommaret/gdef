#!/usr/bin/env python3
"""Generate GDEF splash screen (1242x2688 @3x)."""

from PIL import Image, ImageDraw, ImageFont

W, H = 1242, 2688

BG   = (13, 27, 42)
GOLD = (180, 145, 60)
CREAM = (210, 195, 155)

img = Image.new("RGB", (W, H), BG)
draw = ImageDraw.Draw(img)

# ── Estonian flag (top) ───────────────────────────────────────────────────────
FLAG_H = 180

for i, color in enumerate([(0, 114, 206), (0, 0, 0), (255, 255, 255)]):
    y0 = i * (FLAG_H // 3)
    y1 = (i + 1) * (FLAG_H // 3)
    draw.rectangle([0, y0, W, y1], fill=color)

# ── French flag (bottom) ──────────────────────────────────────────────────────
stripe_w = W // 3
for i, color in enumerate([(0, 85, 164), (255, 255, 255), (239, 65, 53)]):
    x0 = i * stripe_w
    x1 = (i + 1) * stripe_w
    draw.rectangle([x0, H - FLAG_H, x1, H], fill=color)

# ── Text (vertically centered) ────────────────────────────────────────────────
try:
    font_sub    = ImageFont.truetype("/System/Library/Fonts/Supplemental/Georgia Bold.ttf", 100)
    font_desc   = ImageFont.truetype("/System/Library/Fonts/Supplemental/Georgia.ttf", 82)
except:
    font_sub = font_desc = ImageFont.load_default()

# Auto-fit title font to 90% of width
TITLE = "Sõnaraamat"
MAX_W = int(W * 0.88)
font_size = 220
while font_size > 60:
    try:
        ft = ImageFont.truetype("/System/Library/Fonts/Supplemental/Georgia Bold.ttf", font_size)
    except:
        ft = ImageFont.load_default()
    bbox = draw.textbbox((0, 0), TITLE, font=ft)
    if bbox[2] - bbox[0] <= MAX_W:
        break
    font_size -= 4
font_title = ft

CX = W // 2
CY = H // 2

draw.text((CX, CY - 140), TITLE,             font=font_title, fill=GOLD,  anchor="mm")
draw.text((CX, CY + 60),  "EESTI · FRANÇAIS", font=font_sub,   fill=CREAM, anchor="mm")

LINE_W = 420
draw.line([(CX - LINE_W//2, CY + 160), (CX + LINE_W//2, CY + 160)], fill=GOLD, width=5)

draw.text((CX, CY + 270), "Dictionnaire bilingue", font=font_desc, fill=CREAM, anchor="mm")

out = "/Users/jcommaret/Sites/GDEF/assets/images/splash-ios.png"
img.save(out, "PNG")
print(f"Saved {out}")
