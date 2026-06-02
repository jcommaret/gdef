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
FLAG_H = 72          # height of each flag strip
FLAG_W = SIZE - 160  # width, centered
FLAG_X = (SIZE - FLAG_W) // 2
FLAG_TOP = 60

ET_COLORS = [(0, 114, 206), (0, 0, 0), (255, 255, 255)]
for i, color in enumerate(ET_COLORS):
    y0 = FLAG_TOP + i * (FLAG_H // 3)
    y1 = FLAG_TOP + (i + 1) * (FLAG_H // 3)
    draw.rectangle([FLAG_X, y0, FLAG_X + FLAG_W, y1], fill=color)

# ── French flag (bottom strip, fully inside) ─────────────────────────────────
FLAG_BOTTOM_TOP = SIZE - FLAG_TOP - FLAG_H

FR_COLORS = [(0, 85, 164), (255, 255, 255), (239, 65, 53)]
stripe_w = FLAG_W // 3
for i, color in enumerate(FR_COLORS):
    x0 = FLAG_X + i * stripe_w
    x1 = FLAG_X + (i + 1) * stripe_w
    draw.rectangle([x0, FLAG_BOTTOM_TOP, x1, FLAG_BOTTOM_TOP + FLAG_H], fill=color)

# ── Text ─────────────────────────────────────────────────────────────────────
try:
    font_title = ImageFont.truetype("/System/Library/Fonts/Supplemental/Georgia Bold.ttf", 128)
    font_sub   = ImageFont.truetype("/System/Library/Fonts/Supplemental/Georgia.ttf", 72)
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
