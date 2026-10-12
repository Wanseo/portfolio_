"""Render the POTENTIAL detail preview (pip install pillow imageio-ffmpeg)."""
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont, ImageChops
import imageio_ffmpeg

ROOT = Path(__file__).resolve().parents[1]
W, H, FPS = 620, 1066, 30
RESAMPLE = Image.Resampling.LANCZOS

def load(name, trim=False):
    im = Image.open(ROOT / 'public/images' / name).convert('RGBA')
    if trim:
        bg = Image.new('RGB', im.size, 'white')
        bounds = ImageChops.difference(im.convert('RGB'), bg).convert('L').point(lambda x: 255 if x > 90 else 0).getbbox()
        im = im.crop(bounds)
    else:
        im = im.crop(im.getchannel('A').getbbox())
    return im

logo = load('potential-motion-logo.png', True)
box = load('potential-box.png').resize((376, 250), RESAMPLE)
circle = load('potential-circle.png').resize((166, 166), RESAMPLE)
font_root = Path('/System/Library/Fonts/Supplemental')
nav_font = ImageFont.truetype(str(font_root / 'Arial.ttf'), 28)
footer_font = ImageFont.truetype(str(font_root / 'Arial.ttf'), 20)

def ease(t):
    t = max(0, min(1, t))
    return t * t * (3 - 2 * t)

def website_ease(t):
    t = max(0, min(1, t))
    low, high = 0.0, 1.0
    for _ in range(20):
        u = (low + high) / 2
        x = 3 * (1 - u) ** 2 * u * 0.4 + 3 * (1 - u) * u ** 2 * 0.2 + u ** 3
        if x < t:
            low = u
        else:
            high = u
    return 3 * (1 - u) * u ** 2 + u ** 3

def paste(canvas, image, x, y, opacity=1):
    if opacity < 1:
        image = image.copy()
        image.putalpha(image.getchannel('A').point(lambda a: round(a * opacity)))
    canvas.alpha_composite(image, (round(x), round(y)))

def frame(t):
    canvas = Image.new('RGBA', (W, H), 'white')
    move = website_ease((t - 0.75) / 0.3)
    width = round(570 - 64 * move)
    brand = logo.resize((width, round(width * logo.height / logo.width)), RESAMPLE)
    y = (H - brand.height) / 2 * (1 - move) + 96 * move
    paste(canvas, brand, (W - width) / 2, y, ease(t / 0.25))
    reveal = ease((t - 1.05) / 0.25)
    content = Image.new('RGBA', (W, H))
    draw = ImageDraw.Draw(content)
    labels = ['Shop', 'About', 'Archive', 'Contact']
    widths = [draw.textlength(label, font=nav_font) for label in labels]
    x = (W - sum(widths) - 3 * 30) / 2
    for label, size in zip(labels, widths):
        draw.text((x, 254), label, font=nav_font, fill='#20201e')
        x += size + 30
    paste(content, box, 122, 423)
    rotated = circle.rotate(-25 - max(0, t - 1.3) * 12, resample=Image.Resampling.BICUBIC, expand=True)
    paste(content, rotated, 488 - rotated.width / 2, 865 - rotated.height / 2)
    draw.text((30, 1004), '© 2026 POTENTIAL.', font=footer_font, fill='#30302e')
    location = 'Seoul, Korea'
    draw.text((590 - draw.textlength(location, font=footer_font), 1004), location, font=footer_font, fill='#30302e')
    paste(canvas, content, 0, 18 * (1 - reveal), reveal)
    return canvas.convert('RGB')

out = ROOT / 'public/videos'
frame(0.5).save(out / 'potential.jpg', quality=95)
frame(1.3).save(out / 'potential-layout.jpg', quality=95)
writer = imageio_ffmpeg.write_frames(str(out / 'potential.mp4'), (W, H), fps=FPS, codec='libx264', pix_fmt_out='yuv420p', macro_block_size=2, output_params=['-crf', '18', '-movflags', '+faststart'])
writer.send(None)
for i in range(8 * FPS):
    writer.send(frame(i / FPS).tobytes())
writer.close()
