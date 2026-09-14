#!/usr/bin/env python3
"""Editorial cinema OG card: empty vintage house, title on the screen."""

from __future__ import annotations

import math
import random
from pathlib import Path

import numpy as np
from PIL import Image, ImageDraw, ImageFilter, ImageFont

W, H = 2400, 1260
BURGUNDY = (143, 29, 44)
INK = (28, 22, 18)
PAPER = (244, 239, 228)
TUNGSTEN = (232, 176, 96)
OUT = Path("/workspace/.grok/og-raw.png")

FONT_BOLD = "/usr/share/fonts/truetype/liberation/LiberationSerif-Bold.ttf"


def lerp(a, b, t):
    return a + (b - a) * t


def mix(c1, c2, t):
    return tuple(int(lerp(a, b, t)) for a, b in zip(c1, c2))


def shade(c, f):
    return tuple(max(0, min(255, int(ch * f))) for ch in c)


def draw_tracked(draw, text, cx, y, font, fill, tracking=0):
    widths = []
    for ch in text:
        bbox = font.getbbox(ch)
        widths.append(bbox[2] - bbox[0])
    total = sum(widths) + tracking * max(0, len(text) - 1)
    x = cx - total / 2
    for ch, w in zip(text, widths):
        draw.text((x, y), ch, font=font, fill=fill)
        x += w + tracking
    bbox = font.getbbox(text)
    return total, bbox[1], bbox[3]


def main():
    rng = random.Random(7)
    yy, xx = np.ogrid[0:H, 0:W]
    screen_cx, screen_cy = W * 0.5, H * 0.34
    nx = (xx - screen_cx) / (W * 0.62)
    ny = (yy - screen_cy) / (H * 0.72)
    r = np.sqrt(nx * nx + ny * ny)
    wall = np.clip(1.0 - 0.55 * r, 0.0, 1.0)
    ceiling = np.clip((yy - H * 0.08) / (H * 0.5), 0, 1)
    burgundy_glow = np.clip(1.0 - ((yy - H * 0.42) ** 2) / (H * 0.55) ** 2, 0, 1)

    base = np.zeros((H, W, 3), dtype=np.float32)
    base[:, :, 0] = 14 + 22 * wall + 28 * burgundy_glow * (1 - ceiling * 0.4)
    base[:, :, 1] = 10 + 10 * wall + 6 * burgundy_glow
    base[:, :, 2] = 9 + 8 * wall + 8 * burgundy_glow
    aisle = np.exp(-((xx - W / 2) ** 2) / (W * 0.11) ** 2) * np.clip(
        (yy - H * 0.50) / (H * 0.5), 0, 1
    )
    base[:, :, 0] += 18 * aisle
    base[:, :, 1] += 10 * aisle
    base[:, :, 2] += 4 * aisle
    img = Image.fromarray(np.clip(base, 0, 255).astype(np.uint8), "RGB")

    # Projection rectangle on the far wall — large enough that the title
    # reads at share-card thumbnail size, still clearly a cinema screen.
    sx0, sy0, sx1, sy1 = 380, 56, 2020, 710

    curtain = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    cd = ImageDraw.Draw(curtain)
    for side in ("left", "right"):
        x0 = 40 if side == "left" else sx1 + 6
        x1 = sx0 - 6 if side == "left" else W - 40
        top, bot = 28, 760
        for x in range(int(x0), int(x1)):
            t = (x - x0) / max(1, x1 - x0)
            fold = 0.55 + 0.45 * math.sin(t * math.pi * 6.0 + (0 if side == "left" else 1.2))
            fold *= 0.7 + 0.3 * math.sin(t * math.pi * 2)
            edge = min(t, 1 - t) * 2
            depth = 0.38 + 0.62 * fold
            depth *= 0.55 + 0.45 * edge
            col = mix((48, 10, 16), BURGUNDY, depth * 0.85)
            cd.line([(x, top), (x, bot)], fill=(*col, 235))
        for x in range(int(x0), int(x1)):
            t = (x - x0) / max(1, x1 - x0)
            dip = 16 + 14 * abs(math.sin(t * math.pi * 5))
            col = shade(BURGUNDY, 0.32)
            cd.line([(x, 28), (x, 28 + dip)], fill=(*col, 255), width=1)
    curtain = curtain.filter(ImageFilter.GaussianBlur(0.6))
    img = Image.alpha_composite(img.convert("RGBA"), curtain).convert("RGB")

    beam = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    bd = ImageDraw.Draw(beam)
    booth = (W / 2, -40)
    bd.polygon(
        [
            (booth[0] - 18, booth[1]),
            (booth[0] + 18, booth[1]),
            (sx1 + 40, sy1 + 10),
            (sx0 - 40, sy1 + 10),
        ],
        fill=(*PAPER, 18),
    )
    bd.polygon(
        [
            (booth[0] - 6, booth[1]),
            (booth[0] + 6, booth[1]),
            (sx1 - 40, sy0 + 20),
            (sx0 + 40, sy0 + 20),
        ],
        fill=(*TUNGSTEN, 28),
    )
    beam = beam.filter(ImageFilter.GaussianBlur(28))
    img = Image.alpha_composite(img.convert("RGBA"), beam).convert("RGB")

    glow = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    gd = ImageDraw.Draw(glow)
    gd.rounded_rectangle(
        [sx0 - 80, sy0 - 70, sx1 + 80, sy1 + 90],
        radius=8,
        fill=(*PAPER, 70),
    )
    glow = glow.filter(ImageFilter.GaussianBlur(38))
    img = Image.alpha_composite(img.convert("RGBA"), glow).convert("RGB")

    wash = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    wd = ImageDraw.Draw(wash)
    wd.rectangle([sx0 - 24, sy0 - 28, sx1 + 24, sy1 + 36], fill=(90, 54, 38, 50))
    wash = wash.filter(ImageFilter.GaussianBlur(12))
    img = Image.alpha_composite(img.convert("RGBA"), wash).convert("RGB")

    screen_layer = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    sd = ImageDraw.Draw(screen_layer)
    sd.rounded_rectangle(
        [sx0 - 18, sy0 - 18, sx1 + 18, sy1 + 18], radius=4, fill=(22, 12, 12, 255)
    )
    sd.rounded_rectangle([sx0, sy0, sx1, sy1], radius=2, fill=(*PAPER, 255))
    img = Image.alpha_composite(img.convert("RGBA"), screen_layer).convert("RGB")

    # Projected-light falloff on the screen (vectorized).
    scr = np.array(img, dtype=np.float32)
    ys = np.arange(sy0, sy1)[:, None]
    xs = np.arange(sx0, sx1)[None, :]
    u = (xs - sx0) / (sx1 - sx0) * 2 - 1
    v = (ys - sy0) / (sy1 - sy0) * 2 - 1
    fall = np.clip(1.0 - 0.16 * (u * u) - 0.20 * (v * v), 0.72, 1.0)
    paper = np.array(PAPER, dtype=np.float32)
    hot = np.array([248, 240, 220], dtype=np.float32)
    block = paper * (0.90 + 0.10 * fall[..., None]) + (hot - paper) * 0.10 * fall[..., None]
    scr[sy0:sy1, sx0:sx1] = block
    img = Image.fromarray(np.clip(scr, 0, 255).astype(np.uint8), "RGB")

    # Title sits ON the projection rectangle (not floating in the frame).
    # Place by ink boxes so the lockup is padded inside the screen.
    draw = ImageDraw.Draw(img)
    font_title = ImageFont.truetype(FONT_BOLD, 392)
    font_sub = ImageFont.truetype(FONT_BOLD, 248)
    scx = (sx0 + sx1) / 2
    tb = font_title.getbbox("Gifted")
    sb = font_sub.getbbox("& Media")
    title_ink_top = sy0 + 86
    title_y = title_ink_top - tb[1]
    tw, _, t_bot = draw_tracked(
        draw, "Gifted", scx, title_y, font_title, INK, tracking=28
    )
    title_ink_bottom = title_y + tb[3]
    rule_y = title_ink_bottom + 22
    draw.rectangle(
        [scx - 170, rule_y, scx + 170, rule_y + 3],
        fill=mix(INK, BURGUNDY, 0.40),
    )
    sub_ink_top = rule_y + 3 + 20
    sub_y = sub_ink_top - sb[1]
    sw, _, _ = draw_tracked(
        draw, "& Media", scx, sub_y, font_sub, INK, tracking=12
    )
    sub_ink_bottom = sub_y + sb[3]
    print(
        f"title_width={tw} ({tw/W:.0%} of frame) sub_width={sw} "
        f"ink y={title_ink_top}-{title_ink_bottom} / {sub_ink_top}-{sub_ink_bottom} "
        f"screen=({sx0},{sy0})-({sx1},{sy1})"
    )

    # Empty house: perspective rows, last row fully inside the frame.
    seats = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    sdraw = ImageDraw.Draw(seats)
    n_rows = 8
    y_far, y_near = 748, 1110
    for i in range(n_rows):
        t = i / (n_rows - 1)
        y = lerp(y_far, y_near, t)
        half = lerp(620, 1160, t)
        seat_w = lerp(42, 128, t)
        seat_h = lerp(22, 68, t)
        back_h = lerp(18, 50, t)
        gap = lerp(8, 20, t)
        aisle = lerp(52, 140, t)
        usable = half - aisle
        n_side = max(3, int(usable / (seat_w + gap)))
        row_lit = lerp(1.10, 0.58, t)
        for side in (-1, 1):
            for k in range(n_side):
                inner = aisle + k * (seat_w + gap)
                x_mid = W / 2 + side * (inner + seat_w / 2)
                x0 = x_mid - seat_w / 2
                x1 = x_mid + seat_w / 2
                if x1 < 30 or x0 > W - 30:
                    continue
                edge_k = k / max(1, n_side - 1)
                lit = row_lit * lerp(1.05, 0.78, edge_k)
                lit *= 0.94 + 0.08 * rng.random()
                back_col = shade(mix((60, 12, 18), BURGUNDY, 0.75), lit * 0.70)
                cush_col = shade(BURGUNDY, lit * 0.92)
                top_col = shade(mix(BURGUNDY, TUNGSTEN, 0.10), lit * 1.02)
                by0 = y - back_h
                sdraw.rounded_rectangle(
                    [x0 + 3, by0, x1 - 3, y + seat_h * 0.16],
                    radius=max(2, seat_w * 0.08),
                    fill=(*back_col, 255),
                )
                sdraw.rounded_rectangle(
                    [x0, y, x1, y + seat_h * 0.58],
                    radius=max(3, seat_w * 0.12),
                    fill=(*cush_col, 255),
                )
                sdraw.rectangle(
                    [x0 + 4, y, x1 - 4, y + max(2, seat_h * 0.07)],
                    fill=(*top_col, 160),
                )
        runner_col = (*mix((40, 16, 14), TUNGSTEN, 0.16 * (1 - t * 0.4)), 60)
        sdraw.rectangle(
            [
                W / 2 - aisle * 0.50,
                y + seat_h * 0.12,
                W / 2 + aisle * 0.50,
                y + seat_h * 0.50,
            ],
            fill=runner_col,
        )

    img = Image.alpha_composite(img.convert("RGBA"), seats).convert("RGB")

    lamps = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    ld = ImageDraw.Draw(lamps)
    for i in range(5):
        t = i / 4
        y = lerp(760, 1120, t)
        spread = lerp(78, 155, t)
        rad = lerp(9, 18, t)
        for side in (-1, 1):
            x = W / 2 + side * spread
            ld.ellipse(
                [x - rad * 3, y - rad * 2, x + rad * 3, y + rad * 2],
                fill=(*TUNGSTEN, 36),
            )
            ld.ellipse(
                [x - rad * 0.55, y - rad * 0.4, x + rad * 0.55, y + rad * 0.4],
                fill=(255, 220, 160, 150),
            )
    lamps = lamps.filter(ImageFilter.GaussianBlur(10))
    img = Image.alpha_composite(img.convert("RGBA"), lamps).convert("RGB")

    motes = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    md = ImageDraw.Draw(motes)
    for _ in range(90):
        x = rng.randint(int(sx0 - 40), int(sx1 + 40))
        y = rng.randint(30, int(sy1 + 60))
        rr = rng.choice([1, 1, 2, 2, 3])
        a = rng.randint(18, 70)
        md.ellipse([x - rr, y - rr, x + rr, y + rr], fill=(255, 236, 210, a))
    img = Image.alpha_composite(img.convert("RGBA"), motes).convert("RGB")

    arr = np.array(img, dtype=np.float32)
    noise = np.random.RandomState(11).normal(0, 1, (H, W))
    coarse = np.random.RandomState(19).normal(0, 1, (H // 3, W // 3))
    coarse = np.array(
        Image.fromarray(((coarse + 3) * 40).clip(0, 255).astype(np.uint8)).resize(
            (W, H), Image.BILINEAR
        )
    ).astype(np.float32)
    coarse = (coarse / 40.0) - 3
    grain = noise * 7.5 + coarse * 3.5
    arr += grain[:, :, None]
    cx, cy = W / 2, H * 0.38
    rr = np.sqrt(((xx - cx) / (W * 0.80)) ** 2 + ((yy - cy) / (H * 0.84)) ** 2)
    vig = np.clip(1.12 - 0.48 * np.power(rr, 1.45), 0.32, 1.0)
    arr *= vig[:, :, None]
    arr[:, :, 0] = arr[:, :, 0] * 1.02
    arr[:, :, 2] = arr[:, :, 2] * 0.97
    img = Image.fromarray(np.clip(arr, 0, 255).astype(np.uint8), "RGB")

    img.save(OUT, "PNG")
    print(f"wrote {OUT} {img.size}")


if __name__ == "__main__":
    main()
