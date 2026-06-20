export interface HeroVariant {
  id: string;
  theme: 'blue' | 'brown' | 'cream';
  title: string;
  subtitle: string;
  description: string;
  imagePath: string;
  bgTone: string;
  textColor: string;
  accentColor: string;
}

export interface Category {
  name: string;
  slug: string;
  imagePath: string;
  description: string;
  count: number;
}

export interface Reel {
  id: string;
  title: string;
  coverPath: string;
  videoPath: string;
  duration: string;
}

export interface WhyPoint {
  title: string;
  description: string;
  badge: string;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  description: string;
  images: string[];
  colors: string[];
  sizes: string[];
  details: string[];
}

export const heroVariants: HeroVariant[] = [
  {
    id: "hero-1",
    theme: "blue",
    title: "BEYOND",
    subtitle: "CRAFTED TO MOVE .",
    description: "Our signature heavyweight cotton drop-shoulder shirts, tailored for movement and refined for the daily editor.",
    imagePath: "/hero section image/ChatGPT Image Jun 20, 2026, 06_27_39 PM.png",
    bgTone: "bg-[#f8f2ec]",
    textColor: "text-[#232323]",
    accentColor: "#072049"
  },
  {
    id: "hero-2",
    theme: "brown",
    title: "BEYOND",
    subtitle: "CRAFTED TO MOVE .",
    description: "Sartorial craftsmanship meets natural textures. Tailored shirts and heavy fleece layers finished in our organic pigment dyes.",
    imagePath: "/hero section image/ChatGPT Image Jun 20, 2026, 06_31_50 PM.png",
    bgTone: "bg-[#c3af9e]",
    textColor: "text-[#232323]",
    accentColor: "#680E0E"
  },
  {
    id: "hero-3",
    theme: "cream",
    title: "BEYOND",
    subtitle: "CRAFTED TO MOVE .",
    description: "Minimalist design, maximized character. Pure raw cotton textures crafted into oversized basics that redefine premium loungewear.",
    imagePath: "/hero section image/ChatGPT Image Jun 20, 2026, 06_34_25 PM.png",
    bgTone: "bg-[#eaded5]",
    textColor: "text-[#232323]",
    accentColor: "#8C9199"
  }
];

export const categories: Category[] = [
  {
    name: "T-Shirts",
    slug: "tshirts",
    imagePath: "/Product section cover images/cover-tshirts.png",
    description: "Heavyweight boxy fits with clean necklines",
    count: 8
  },
  {
    name: "Sweatshirts",
    slug: "sweatshirts",
    imagePath: "/Product section cover images/cover-sweatshirts.png",
    description: "Double-fleece warmth in structured shapes",
    count: 6
  },
  {
    name: "Shirts",
    slug: "shirts",
    imagePath: "/Product section cover images/cover-shirts.png",
    description: "Tailored casual button-downs and camp collars",
    count: 8
  },
  {
    name: "New Drops",
    slug: "newdrops",
    imagePath: "/Product section cover images/cover-newdrops.png",
    description: "Limited edition custom garment-dyed pieces",
    count: 6
  }
];

export const reels: Reel[] = [
  {
    id: "reel-1",
    title: "Summer Drop Campaign",
    coverPath: "/Product section cover images/cover-reel1.png",
    videoPath: "/product Images/VID-20260617-WA0075.mp4",
    duration: "0:15"
  },
  {
    id: "reel-2",
    title: "Behind The Craftsmanship",
    coverPath: "/Product section cover images/cover-reel2.png",
    videoPath: "/product Images/VID-20260617-WA0075.mp4",
    duration: "0:12"
  },
  {
    id: "reel-3",
    title: "Linen Motion Editorial",
    coverPath: "/Product section cover images/cover-reel3.png",
    videoPath: "/product Images/VID-20260617-WA0075.mp4",
    duration: "0:18"
  }
];

export const whyPoints: WhyPoint[] = [
  {
    title: "Premium Quality",
    description: "We use only 280GSM+ combed cotton and heavy pre-shrunk fleece fabrics designed to maintain their fit and premium texture after years of wear.",
    badge: "01"
  },
  {
    title: "Thoughtful Designs",
    description: "Every cut, shoulder drop, and neckline height is calculated to offer a clean silhouette that feels contemporary yet timeless.",
    badge: "02"
  },
  {
    title: "Crafted with Care",
    description: "Hand-finished hems, reinforced stitching, and carefully dyed pigments define our low-impact artisanal manufacturing process.",
    badge: "03"
  },
  {
    title: "Built to Last",
    description: "We design against fast-fashion decay. Our clothes are manufactured to withstand daily wear and tear without losing color or structure.",
    badge: "04"
  }
];

export const products: Product[] = [
  // T-Shirts
  {
    id: "np-tee-1",
    name: "NP Heavyweight Vintage Tee",
    price: 1499,
    category: "tshirts",
    description: "An ultra-premium, heavyweight t-shirt cut from 300GSM carded cotton. Features a high, thick ribbed collar, relaxed shoulder drops, and a clean structural boxy silhouette.",
    images: [
      "/product Images/IMG-20260617-WA0076.jpg",
      "/product Images/IMG-20260617-WA0077.jpg",
      "/product Images/IMG-20260617-WA0078.jpg"
    ],
    colors: ["Off-White", "Vintage Black", "Slate Blue"],
    sizes: ["S", "M", "L", "XL"],
    details: [
      "100% Premium Carded Cotton (300GSM)",
      "Thick 1.25-inch ribbed crewneck collar",
      "Garment-dyed for a unique lived-in look",
      "Preshrunk to minimize shrinkage after washing",
      "Double-needle stitched cuffs and hem"
    ]
  },
  {
    id: "np-tee-2",
    name: "Beyond the Trend Oversized Tee",
    price: 1399,
    category: "tshirts",
    description: "An everyday wardrobe anchor made from 240GSM combed cotton. The perfect balance between light breathability and structured aesthetic.",
    images: [
      "/product Images/IMG-20260617-WA0079.jpg",
      "/product Images/IMG-20260617-WA0080.jpg"
    ],
    colors: ["Bone Cream", "Coal Black", "Earthy Brown"],
    sizes: ["S", "M", "L", "XL"],
    details: [
      "100% Combed Ringspun Cotton (240GSM)",
      "Drop-shoulder cut with elongated sleeves",
      "Highly breathable open-end weave",
      "Resilient rib collar that holds shape"
    ]
  },
  {
    id: "np-tee-3",
    name: "Signature EMB Drop Tee",
    price: 1599,
    category: "tshirts",
    description: "Features the micro 'North Pacific' handwritten logo embroidered on the chest. Premium 280GSM heavy jersey cotton with soft wash treatment.",
    images: [
      "/product Images/IMG-20260617-WA0081.jpg",
      "/product Images/IMG-20260617-WA0082.jpg",
      "/product Images/IMG-20260617-WA0083.jpg"
    ],
    colors: ["Deep Navy", "Olive Drab", "Pebble Grey"],
    sizes: ["S", "M", "L", "XL"],
    details: [
      "100% Long-staple Combed Cotton (280GSM)",
      "High-definition micro embroidery on chest",
      "Side vents with custom herringbone tape details",
      "Tailored fit for a clean, non-baggy drape"
    ]
  },
  // Sweatshirts
  {
    id: "np-sweat-1",
    name: "Boxy Fit Heavyweight Crewneck",
    price: 2499,
    category: "sweatshirts",
    description: "Made from thick 420GSM diagonal loopback French Terry. Cut short at the body with oversized chest dimensions for a modern aesthetic drape.",
    images: [
      "/product Images/IMG-20260618-WA0058.jpg",
      "/product Images/IMG-20260618-WA0060.jpg"
    ],
    colors: ["Sandstone", "Ash Grey", "Washed Slate"],
    sizes: ["S", "M", "L", "XL"],
    details: [
      "100% Cotton French Terry (420GSM)",
      "Reversible flatlock stitch details",
      "Heavy ribbed cuffs and waistband",
      "Short crop length with dropped shoulders"
    ]
  },
  {
    id: "np-sweat-2",
    name: "Signature EMB Pullover",
    price: 2799,
    category: "sweatshirts",
    description: "Double-layered hood sweatshirt with embroidered branding. Crafted from custom-knit fleece backing for supreme comfort.",
    images: [
      "/product Images/IMG-20260618-WA0061.jpg",
      "/product Images/IMG-20260618-WA0062.jpg"
    ],
    colors: ["Espresso", "Forest Green", "Noir Black"],
    sizes: ["M", "L", "XL"],
    details: [
      "80% Cotton, 20% Polyester Heavy Fleece (380GSM)",
      "Embossed brass aglets on braided drawstrings",
      "Generous kangaroo pocket with reinforced stitches",
      "Tonal 3D chest embroidery"
    ]
  },
  // Shirts
  {
    id: "np-shirt-1",
    name: "Relaxed Camp Collar Shirt",
    price: 1899,
    category: "shirts",
    description: "Crafted from a premium linen-rayon blend that drapes fluidly. Features a relaxed flat collar, side splits, and coconut-shell button fasteners.",
    images: [
      "/product Images/IMG-20260618-WA0063.jpg",
      "/product Images/IMG-20260618-WA0064.jpg",
      "/product Images/IMG-20260618-WA0065.jpg"
    ],
    colors: ["Sage Green", "Oatmeal Linen", "Terracotta"],
    sizes: ["S", "M", "L", "XL"],
    details: [
      "55% Linen, 45% Rayon custom blend",
      "Lounge-ready camp collar neckline",
      "Genuine coconut shell buttons",
      "Garment washed for supreme softness",
      "Box pleat at back for extra mobility"
    ]
  },
  {
    id: "np-shirt-2",
    name: "Structured Cotton Oxford Shirt",
    price: 1999,
    category: "shirts",
    description: "A heavier, structured button-down styled from vintage military workwear. Double chest patch pockets and custom heavy stitching.",
    images: [
      "/product Images/IMG-20260618-WA0066.jpg",
      "/product Images/IMG-20260618-WA0067.jpg",
      "/product Images/IMG-20260618-WA0068.jpg"
    ],
    colors: ["Military Khaki", "Chalk White", "Vintage Blue"],
    sizes: ["S", "M", "L", "XL"],
    details: [
      "100% Stiff Oxford Weave Cotton (200GSM)",
      "Dual chest pockets with button flaps",
      "Adjustable barrel cuffs",
      "Curved hemline with side seam reinforcements"
    ]
  },
  {
    id: "np-shirt-3",
    name: "Premium Linen Long Sleeve",
    price: 2199,
    category: "shirts",
    description: "Pure Belgian linen tailored with a modern slim-casual look. Ultra-light, airy, and naturally textured for hot summer days.",
    images: [
      "/product Images/IMG-20260618-WA0069.jpg",
      "/product Images/IMG-20260618-WA0070.jpg",
      "/product Images/IMG-20260618-WA0071.jpg"
    ],
    colors: ["Sky Blue", "Optic White", "Sand Drift"],
    sizes: ["S", "M", "L", "XL"],
    details: [
      "100% Belgian Flax Linen",
      "Casual band collar styling",
      "Natural shell buttons",
      "High breathability and moisture-wicking weave"
    ]
  },
  // New Drops
  {
    id: "np-drop-1",
    name: "NP Utility Cargo Overshirt",
    price: 2999,
    category: "newdrops",
    description: "A rugged outerwear hybrid featuring asymmetrical cargo pockets and reinforced elbows. Built from heavy cotton canvas.",
    images: [
      "/product Images/IMG-20260618-WA0072.jpg",
      "/product Images/IMG-20260618-WA0073.jpg",
      "/product Images/IMG-20260618-WA0074.jpg"
    ],
    colors: ["Olive Canvas", "Midnight Onyx"],
    sizes: ["M", "L", "XL"],
    details: [
      "100% Cotton Canvas (350GSM)",
      "Water-repellent wax-impregnated fabric",
      "Matte black brass snap buttons",
      "Secret interior zip pocket"
    ]
  },
  {
    id: "np-drop-2",
    name: "Washed Canvas Painter Jacket",
    price: 3499,
    category: "newdrops",
    description: "Inspired by classic artist smocks. Relaxed fit with three exterior patch pockets and contrast triple-needle stitch details.",
    images: [
      "/product Images/IMG-20260618-WA0075.jpg",
      "/product Images/IMG-20260618-WA0076.jpg",
      "/product Images/IMG-20260618-WA0077.jpg",
      "/product Images/IMG-20260618-WA0078.jpg"
    ],
    colors: ["Indigo Denim", "Tobacco Brown"],
    sizes: ["S", "M", "L", "XL"],
    details: [
      "100% Slub Denim/Canvas hybrid",
      "Contrast cream thread details",
      "Unlined construction for versatile layering",
      "Pre-washed for a soft feel from day one"
    ]
  }
];

export const getProductsByCategory = (categorySlug: string) => {
  if (categorySlug === 'newdrops') return products.filter(p => p.category === 'newdrops' || p.id === 'np-tee-3' || p.id === 'np-shirt-3');
  return products.filter(p => p.category === categorySlug);
};
