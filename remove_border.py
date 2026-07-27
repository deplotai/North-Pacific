import sys
from PIL import Image

# Increase recursion depth just in case, though we use an iterative stack
sys.setrecursionlimit(20000)

img = Image.open('public/images/transparent_logo.png').convert('RGBA')
w, h = img.size
pixels = img.load()

# Find the border by scanning the outer 50 pixels
border_start = None
for y in range(h):
    for x in range(w):
        if x < 50 or x > w - 50 or y < 50 or y > h - 50:
            if pixels[x, y][3] > 0:
                border_start = (x, y)
                break
    if border_start:
        break

if border_start:
    print(f"Found border starting at {border_start}")
    stack = [border_start]
    visited = set()
    
    # We also don't want to accidentally delete everything if the image is mostly white.
    # But since it's just a border, the number of border pixels shouldn't exceed like 10% of total pixels.
    deleted_count = 0
    max_delete = (w * h) * 0.3 # Max 30% of pixels
    
    while stack and deleted_count < max_delete:
        x, y = stack.pop()
        if (x, y) in visited:
            continue
        visited.add((x, y))
        
        if pixels[x, y][3] > 0:
            pixels[x, y] = (0, 0, 0, 0)
            deleted_count += 1
            # 8-way flood fill
            for dx in [-1, 0, 1]:
                for dy in [-1, 0, 1]:
                    if dx == 0 and dy == 0: continue
                    nx, ny = x + dx, y + dy
                    if 0 <= nx < w and 0 <= ny < h:
                        stack.append((nx, ny))
    
    print(f"Deleted {deleted_count} border pixels.")
else:
    print("No border found near edges.")

# Now let's crop the image to the actual content (text and logo) to remove all the empty transparent space
min_x, max_x, min_y, max_y = w, 0, h, 0
for y in range(h):
    for x in range(w):
        if pixels[x, y][3] > 0:
            min_x = min(min_x, x)
            max_x = max(max_x, x)
            min_y = min(min_y, y)
            max_y = max(max_y, y)

if min_x <= max_x and min_y <= max_y:
    print(f"Cropping to content bounding box: {min_x}, {min_y}, {max_x}, {max_y}")
    # Add a small padding of 10 pixels
    min_x = max(0, min_x - 10)
    min_y = max(0, min_y - 10)
    max_x = min(w - 1, max_x + 10)
    max_y = min(h - 1, max_y + 10)
    img = img.crop((min_x, min_y, max_x, max_y))
    
img.save('public/images/transparent_logo.png')
print("Done saving.")
