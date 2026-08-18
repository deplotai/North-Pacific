-- Fix Shirts
UPDATE products 
SET images = array_replace(images, 
  images[1], 
  REPLACE(images[1], '/images/products/Shirts/', '/images/shirts/')
)
WHERE images[1] LIKE '/images/products/Shirts/%';

-- Fix T-Shirts
UPDATE products 
SET images = array_replace(images, 
  images[1], 
  REPLACE(images[1], '/images/products/T-Shirts/', '/images/T-Shirts & Polos/')
)
WHERE images[1] LIKE '/images/products/T-Shirts/%';

-- Fix Bottoms
UPDATE products 
SET images = array_replace(images, 
  images[1], 
  REPLACE(images[1], '/images/products/Bottoms/', '/images/bottoms/')
)
WHERE images[1] LIKE '/images/products/Bottoms/%';

-- Fix Blazers & Jackets
UPDATE products 
SET images = array_replace(images, 
  images[1], 
  REPLACE(images[1], '/images/products/Blazers & Jackets/', '/images/Blazers & Jackets/')
)
WHERE images[1] LIKE '/images/products/Blazers & Jackets/%';

-- Fix Uniforms
UPDATE products 
SET images = array_replace(images, 
  images[1], 
  REPLACE(images[1], '/images/products/Uniforms/', '/images/Uniforms/')
)
WHERE images[1] LIKE '/images/products/Uniforms/%';
