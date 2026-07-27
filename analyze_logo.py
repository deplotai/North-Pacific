from PIL import Image

img = Image.open('public/images/transparent_logo.png').convert('RGBA')
w, h = img.size
pixels = img.load()

# Calculate row sums and col sums of alpha > 50
row_sums = [0] * h
col_sums = [0] * w

for y in range(h):
    for x in range(w):
        if pixels[x, y][3] > 50:
            row_sums[y] += 1
            col_sums[x] += 1

first_row = next((i for i, v in enumerate(row_sums) if v > 0), 0)
last_row = next((i for i in range(h-1, -1, -1) if row_sums[i] > 0), h-1)
first_col = next((i for i, v in enumerate(col_sums) if v > 0), 0)
last_col = next((i for i in range(w-1, -1, -1) if col_sums[i] > 0), w-1)

def find_inner_bounds(sums, start, end):
    inner_start = start
    zero_count = 0
    for i in range(start, end):
        if sums[i] == 0:
            zero_count += 1
        else:
            if zero_count > 10:
                inner_start = i
                break
            zero_count = 0
            
    inner_end = end
    zero_count = 0
    for i in range(end, start, -1):
        if sums[i] == 0:
            zero_count += 1
        else:
            if zero_count > 10:
                inner_end = i
                break
            zero_count = 0
            
    return inner_start, inner_end

inner_top, inner_bottom = find_inner_bounds(row_sums, first_row, last_row)
inner_left, inner_right = find_inner_bounds(col_sums, first_col, last_col)

print(f"Alpha > 50 bounds: Rows {first_row}-{last_row}, Cols {first_col}-{last_col}")
print(f"Inner content bounds: Rows {inner_top}-{inner_bottom}, Cols {inner_left}-{inner_right}")

# If we found inner bounds, let's just clear everything OUTSIDE these inner bounds!
if inner_top > first_row and inner_left > first_col:
    for y in range(h):
        for x in range(w):
            if x < inner_left or x > inner_right or y < inner_top or y > inner_bottom:
                pixels[x, y] = (0, 0, 0, 0)
    
    img = img.crop((inner_left, inner_top, inner_right, inner_bottom))
    img.save('public/images/transparent_logo.png')
    img.save('public/logo.png')
    print("Saved cropped image without border.")
else:
    # Manual crop based on estimated percentages
    print("Manual fallback crop...")
    # Looking at the screenshot, the border is probably within the outer 5-10% of the image.
    # The text starts much further in. Let's just crop 15% from top/bottom and 10% from left/right.
    c_left = int(w * 0.12)
    c_right = int(w * 0.88)
    c_top = int(h * 0.18)
    c_bottom = int(h * 0.82)
    img = img.crop((c_left, c_top, c_right, c_bottom))
    
    # We also need to strip the original transparent pixels to get a tight crop.
    bbox = img.getbbox()
    if bbox:
        img = img.crop(bbox)
        
    img.save('public/images/transparent_logo.png')
    img.save('public/logo.png')
    print(f"Saved manual cropped image without border.")
