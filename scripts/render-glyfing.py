"""Enlarge only the central character while preserving the surrounding candies.

Requires pillow and imageio-ffmpeg.
"""
from pathlib import Path
from PIL import Image, ImageDraw, ImageFilter
import imageio_ffmpeg
import math

ROOT = Path(__file__).resolve().parents[1]
VIDEOS = ROOT / 'public/videos'
reader = imageio_ffmpeg.read_frames(str(VIDEOS / 'glyfing.mp4'), pix_fmt='rgb24')
meta = next(reader)
size = meta['size']
writer = imageio_ffmpeg.write_frames(str(VIDEOS / 'glyfing-main.mp4'), size, fps=meta['fps'], codec='libx264', macro_block_size=2, output_params=['-crf', '18', '-movflags', '+faststart'])
writer.send(None)
mask = Image.new('L', (184, 207))
ImageDraw.Draw(mask).rounded_rectangle((3, 3, 180, 203), radius=36, fill=255)
mask = mask.filter(ImageFilter.GaussianBlur(5))

def candy_cutout(frame, bounds, width):
    candy = frame.crop(bounds).convert('RGBA')
    # Remove the pink backdrop from the existing colorful candy artwork.
    alpha = Image.new('L', candy.size)
    alpha.putdata([
        0 if (r > g * 1.35 and b > g * 1.2) or max(r, g, b) - min(r, g, b) < 28 else 255
        for r, g, b, _ in candy.getdata()
    ])
    candy.putalpha(alpha.filter(ImageFilter.MedianFilter(3)))
    return candy.resize((width, round(candy.height * width / candy.width)), Image.Resampling.LANCZOS)

for i, data in enumerate(reader):
    frame = Image.frombytes('RGB', size, data)
    if i == 0:
        worm = candy_cutout(frame, (203, 6, 277, 43), 64)
        heart = candy_cutout(frame, (10, 299, 69, 350), 42)
        rainbow = candy_cutout(frame, (27, 209, 68, 259), 30)
        candies = [
            (worm, 94, 178, -28), (worm, 329, 202, 32),
            (worm, 91, 279, 24), (worm, 320, 322, -24),
            (heart, 329, 133, -12), (rainbow, 120, 337, 18),
        ]
    character = frame.crop((160, 150, 320, 330)).resize((184, 207), Image.Resampling.LANCZOS)
    frame.paste(character, (148, 137), mask)
    for index, (candy, x, y, angle) in enumerate(candies):
        phase = i / meta['fps'] * math.tau / 6 + index
        sprite = candy.rotate(angle + 5 * math.sin(phase), resample=Image.Resampling.BICUBIC, expand=True)
        frame.paste(sprite, (x, y + round(3 * math.sin(phase))), sprite)
    if i == 0:
        frame.save(VIDEOS / 'glyfing-main.jpg', quality=95)
    writer.send(frame.tobytes())
writer.close()
reader.close()
