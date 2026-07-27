import os
from PIL import Image

def convert_to_webp(base_dir):
    categories = ['Blazers & Jackets', 'Bottoms', 'Shirts', 'T-Shirts & Polos', 'Uniforms']
    for category in categories:
        cat_path = os.path.join(base_dir, category)
        if not os.path.exists(cat_path):
            continue
            
        for root, dirs, files in os.walk(cat_path):
            for file in files:
                if file.lower().endswith(('.png', '.jpg', '.jpeg')) and file != 'image.webp':
                    file_path = os.path.join(root, file)
                    webp_path = os.path.join(root, 'image.webp')
                    
                    try:
                        with Image.open(file_path) as img:
                            # Convert to RGB if necessary before saving to webp
                            if img.mode in ('RGBA', 'LA') or (img.mode == 'P' and 'transparency' in img.info):
                                pass # WebP supports transparency
                            else:
                                img = img.convert('RGB')
                                
                            img.save(webp_path, 'WEBP', quality=85)
                            print(f"Converted: {file_path} -> {webp_path}")
                        
                        # Remove the original file
                        os.remove(file_path)
                        print(f"Removed original: {file_path}")
                        
                    except Exception as e:
                        print(f"Error processing {file_path}: {e}")

if __name__ == "__main__":
    convert_to_webp('public/images')
