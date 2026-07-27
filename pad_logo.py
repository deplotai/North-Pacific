from PIL import Image

def pad_image(path, padding=40):
    img = Image.open(path).convert("RGBA")
    w, h = img.size
    
    # Create a new transparent image with padding
    new_w, new_h = w + padding*2, h + padding*2
    new_img = Image.new("RGBA", (new_w, new_h), (0, 0, 0, 0))
    
    # Paste the original image into the center
    new_img.paste(img, (padding, padding))
    
    new_img.save(path)
    print(f"Padded {path}")

pad_image('public/images/transparent_logo.png')
pad_image('public/logo.png')
