import os
import json

categories = {
    "Shirts": [
        "Cuban Collar Shirt", "Resort Shirt", "Linen Shirt", "Oxford Shirt", 
        "Denim Shirt", "Flannel Shirt", "Printed Shirt"
    ],
    "T-Shirts & Polos": [
        "Plain Crew Neck T-Shirt", "Oversized T-Shirt", "Heavyweight T-Shirt", 
        "Graphic T-Shirt", "Henley T-Shirt", "Classic Polo Shirt", 
        "Striped Polo Shirt", "Knit Polo Shirt", "Quarter Zip Polo Shirt"
    ],
    "Bottoms": [
        "Formal Trousers", "Chino Pants", "Linen Pants", "Baggy Denim Jeans", 
        "Cargo Denim Jeans", "Cargo Pants", "Joggers", "Chino Shorts", "Linen Shorts"
    ],
    "Blazers & Jackets": [
        "Formal Blazer", "Bomber Jacket", "Lightweight Utility Jacket"
    ],
    "Uniforms": [
        "Corporate Polo Uniform", "Doctor Uniform", "Chef Uniform", 
        "Safety or Industrial Workwear Uniform" # Changed / to 'or' for folder name
    ]
}

parent_map = {
    "Shirts": "shirts",
    "T-Shirts & Polos": "tshirts",
    "Bottoms": "bottoms",
    "Blazers & Jackets": "blazers-jackets",
    "Uniforms": "uniforms"
}

catalog_items = []

base_dir = "public/images"

for parent, subs in categories.items():
    parent_id = parent_map[parent]
    parent_dir = os.path.join(base_dir, parent)
    os.makedirs(parent_dir, exist_ok=True)
    
    for sub in subs:
        sub_dir = os.path.join(parent_dir, sub)
        os.makedirs(sub_dir, exist_ok=True)
        
        # We need an id matching the CATEGORY_TREE in cms.ts
        # Let's generate the ID similarly
        sub_id = sub.lower().replace(" & ", "-").replace(" / ", "-").replace(" or ", "-").replace(" ", "-")
        # specific fix for safety uniform
        if sub_id == "safety-industrial-workwear-uniform":
            sub_id = "safety-industrial-workwear-uniform"
            
        img_path = f"/images/{parent}/{sub}/image.png"
        
        catalog_items.append(f'  {{ id: "{sub_id}", parent: "{parent_id}", label: "{sub}", img: "{img_path}" }},')

tsx_output = "const catalogCategories: CatalogCategory[] = [\n" + "\n".join(catalog_items) + "\n];"
print(tsx_output)

with open('new_catalog.txt', 'w') as f:
    f.write(tsx_output)
