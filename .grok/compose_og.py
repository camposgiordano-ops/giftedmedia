#!/usr/bin/env python3
"""Composite Gifted & Media onto the cinema still, then crop OG + X banner."""

from pathlib import Path

from PIL import Image, ImageDraw, ImageFilter, ImageFont

SRC = Path("/workspace/attachments/dbda271f-40f0-4322-aa5d-adceaaf045ee.jpg")
SERIF = "/usr/share/fonts/truetype/liberation/LiberationSerif-BoldItalic.ttf"
SANS = "/usr/share/fonts/truetype/liberation/LiberationSans-Bold.ttf"
INK = (28, 22, 18, 255)
BURGUNDY = (143, 29, 44, 255)
CREAM = (244, 239, 228, 255)


def tracked(draw, text, x, y, font, fill, tracking):
    cx = x
    for ch in text:
        draw.text((cx, y), ch, font=font, fill=fill)
        cx += font.getbbox(ch)[2] + tracking
    return cx - x


def lockup_size(gifted_font, amp_font, media_font, tracking):
    gw = gifted_font.getbbox("Gifted")[2]
    aw = amp_font.getbbox("&")[2]
    mw = sum(media_font.getbbox(ch)[2] + tracking for ch in "MEDIA") - tracking
    gap = 18
    return gw + gap + aw + gap + mw, gifted_font.getbbox("Gifted")[3]


def draw_lockup(base: Image.Image, cx: float, cy: float, scale: float) -> Image.Image:
    gifted_font = ImageFont.truetype(SERIF, int(110 * scale))
    amp_font = ImageFont.truetype(SERIF, int(92 * scale))
    media_font = ImageFont.truetype(SANS, int(44 * scale))
    tracking = int(10 * scale)
    gap = int(16 * scale)
    w, h = lockup_size(gifted_font, amp_font, media_font, tracking)
    x0 = cx - w / 2
    y0 = cy - h / 2

    layer = Image.new("RGBA", base.size, (0, 0, 0, 0))
    d = ImageDraw.Draw(layer)
    # soft shadow so it reads on the white screen
    shadow = Image.new("RGBA", base.size, (0, 0, 0, 0))
    sd = ImageDraw.Draw(shadow)
    x = x0
    sd.text((x + 2, y0 + 3), "Gifted", font=gifted_font, fill=(0, 0, 0, 90))
    x += gifted_font.getbbox("Gifted")[2] + gap
    sd.text((x + 2, y0 + 8), "&", font=amp_font, fill=(0, 0, 0, 90))
    x += amp_font.getbbox("&")[2] + gap
    media_y = y0 + int(28 * scale)
    tracked(sd, "MEDIA", x, media_y, media_font, (0, 0, 0, 90), tracking)
    shadow = shadow.filter(ImageFilter.GaussianBlur(3))

    x = x0
    d.text((x, y0), "Gifted", font=gifted_font, fill=INK)
    x += gifted_font.getbbox("Gifted")[2] + gap
    d.text((x, y0 + int(6 * scale)), "&", font=amp_font, fill=BURGUNDY)
    x += amp_font.getbbox("&")[2] + gap
    tracked(d, "MEDIA", x, media_y, media_font, INK, tracking)

    out = Image.alpha_composite(base.convert("RGBA"), shadow)
    out = Image.alpha_composite(out, layer)
    return out.convert("RGB")


def cover_crop(im: Image.Image, w: int, h: int) -> Image.Image:
    src_w, src_h = im.size
    scale = max(w / src_w, h / src_h)
    nw, nh = int(src_w * scale), int(src_h * scale)
    resized = im.resize((nw, nh), Image.Resampling.LANCZOS)
    left = (nw - w) // 2
    top = (nh - h) // 2
    return resized.crop((left, top, left + w, top + h))


def main() -> None:
    photo = Image.open(SRC).convert("RGB")
    # Title sits on the projection screen (left-of-center), not the photo center.
    composed = draw_lockup(photo.copy(), cx=585, cy=325, scale=1.12)

    og = cover_crop(composed, 1200, 630)
    og_path = Path("/workspace/.grok/og.jpg.tmp")
    og.save(og_path, "JPEG", quality=90, optimize=True, progressive=True)

    # 50:11 banner: keep the screen (and lockup) in the left half, crop a wide strip.
    W, H = composed.size
    bh = int(round(W * 11 / 50))  # 394
    top = 170
    banner_src = composed.crop((0, top, W, top + bh))
    banner = banner_src.resize((1200, 264), Image.Resampling.LANCZOS)
    banner_path = Path("/workspace/.grok/x-banner.jpg.tmp")
    banner.save(banner_path, "JPEG", quality=90, optimize=True, progressive=True)

    composed.save("/workspace/.grok/og-composed-full.jpg", "JPEG", quality=88)
    print("og", og.size, og_path.stat().st_size)
    print("banner", banner.size, banner_path.stat().st_size)


if __name__ == "__main__":
    main()
