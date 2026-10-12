"""Enlarge only the central character while preserving the surrounding candies.

Requires pillow and imageio-ffmpeg.
"""
from pathlib import Path
from PIL import Image, ImageDraw, ImageFilter
import imageio_ffmpeg

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
for i, data in enumerate(reader):
    frame = Image.frombytes('RGB', size, data)
    character = frame.crop((160, 150, 320, 330)).resize((184, 207), Image.Resampling.LANCZOS)
    frame.paste(character, (148, 137), mask)
    if i == 0:
        frame.save(VIDEOS / 'glyfing-main.jpg', quality=95)
    writer.send(frame.tobytes())
writer.close()
reader.close()
