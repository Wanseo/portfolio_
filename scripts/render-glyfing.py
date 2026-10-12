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

def candy_cutout(frame, bounds, width, heart_shape=False):
    candy = frame.crop(bounds).convert('RGBA')
    # Remove the pink backdrop from the existing colorful candy artwork.
    alpha = Image.new('L', candy.size)
    alpha.putdata([
        0 if (r > g * 1.35 and b > g * 1.2) or max(r, g, b) - min(r, g, b) < 28 else 255
        for r, g, b, _ in candy.getdata()
    ])
    if heart_shape:
        # Preserve the heart's pink lobe, which shares the backdrop's color.
        alpha = Image.new('L', candy.size)
        ImageDraw.Draw(alpha).polygon([(3, 15), (7, 8), (17, 6), (27, 11), (33, 6), (44, 2), (53, 6), (58, 16), (54, 28), (34, 49), (11, 35), (3, 24)], fill=255)
        alpha = alpha.filter(ImageFilter.GaussianBlur(0.6))
    else:
        alpha = alpha.filter(ImageFilter.MedianFilter(3))
    candy.putalpha(alpha)
    return candy.resize((width, round(candy.height * width / candy.width)), Image.Resampling.LANCZOS)

for i, data in enumerate(reader):
    frame = Image.frombytes('RGB', size, data)
    if i == 0:
        worm = candy_cutout(frame, (203, 6, 277, 43), 64)
        heart = candy_cutout(frame, (10, 299, 69, 350), 42, heart_shape=True)
        upper_heart = candy_cutout(frame, (10, 299, 69, 350), 46, heart_shape=True)
        lower_heart = candy_cutout(frame, (10, 299, 69, 350), 36, heart_shape=True)
        rainbow = candy_cutout(frame, (27, 209, 68, 259), 30)
        tooth = frame.crop((413, 0, 462, 55)).convert('RGBA')
        tooth_mask = Image.new('L', tooth.size)
        tooth_mask.putdata([255 if min(r, g, b) > 100 and max(r, g, b) - min(r, g, b) < 80 else 0 for r, g, b, _ in tooth.getdata()])
        tooth.putalpha(tooth_mask.filter(ImageFilter.MedianFilter(3)))
        tooth = tooth.resize((43, 48), Image.Resampling.LANCZOS)
        candies = [
            (worm, 94, 178, -28), (worm, 329, 202, 32),
            (tooth, 101, 279, -45), (worm, 320, 322, -24),
            (heart, 329, 133, -12), (rainbow, 120, 337, 18),
            (upper_heart, 175, 96, 17), (lower_heart, 236, 349, -23),
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
