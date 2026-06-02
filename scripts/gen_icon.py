#!/usr/bin/env python3
"""Generate GDEF app icon (1024x1024)."""

from PIL import Image, ImageDraw, ImageFont
import math

SIZE = 1024
RADIUS = 180  # iOS-style rounded corners

BG = (13, 27, 42)       # #0D1B2A
GOLD = (180, 145, 60)   # #B4913C

img = Image.new("RGBA", (SIZE, SIZE), (0, 0, 0, 0))
draw = ImageDraw.Draw(img)

# Rounded rect background
draw.rounded_rectangle([0, 0, SIZE, SIZE], radius=RADIUS, fill=BG)

# ── Estonian flag (top strip, fully inside) ──────────────────────────────────
FLAG_H = 150

for i, color in enumerate([(0, 114, 206), (0, 0, 0), (255, 255, 255)]):
    y0 = i * (FLAG_H // 3)
    y1 = (i + 1) * (FLAG_H // 3)
    draw.rectangle([0, y0, SIZE, y1], fill=color)

# ── French flag (bottom) ──────────────────────────────────────────────────────
stripe_w = SIZE // 3
for i, color in enumerate([(0, 85, 164), (255, 255, 255), (239, 65, 53)]):
    x0 = i * stripe_w
    x1 = (i + 1) * stripe_w
    draw.rectangle([x0, SIZE - FLAG_H, x1, SIZE], fill=color)

# ── Text ─────────────────────────────────────────────────────────────────────
try:
    font_title = ImageFont.truetype("/System/Library/Fonts/Supplemental/Georgia Bold.ttf", 148)
    font_sub   = ImageFont.truetype("/System/Library/Fonts/Supplemental/Georgia.ttf", 82)
except:
    font_title = ImageFont.load_default()
    font_sub   = font_title

CX = SIZE // 2
CY = SIZE // 2

draw.text((CX, CY - 60), "Sõnaraamat", font=font_title, fill=GOLD, anchor="mm")

# Separator line
LINE_W = 520
draw.line([(CX - LINE_W // 2, CY + 30), (CX + LINE_W // 2, CY + 30)], fill=GOLD, width=4)

draw.text((CX, CY + 110), "dictionnaire", font=font_sub, fill=GOLD, anchor="mm")

out = "/Users/jcommaret/Sites/GDEF/assets/images/icon.png"
img.save(out, "PNG")
print(f"Saved {out}")
