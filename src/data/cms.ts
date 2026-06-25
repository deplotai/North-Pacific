export interface OfferConfig {
  bannerImage: string;
  title: string;
  text: string;
  countdownHours: number;
  activeProductIds: string[];
}

export interface Product {
  id: string;
  name: string;
  mainCategory: string;       // e.g. "shirts"
  category: string;           // sub-category slug e.g. "linen shirt"
  price: number;
  salePrice?: number;
  images: string[];
  badge: string;
  sizes: string[];
  desc: string;
}

// ─── Main + Sub Category structure ───────────────────────────────────────────
export const CATEGORY_TREE = [
  {
    id: "shirts",
    label: "Shirts",
    icon: "fa-solid fa-shirt",
    subs: [
      { id: "linen shirt",   label: "Linen Shirts" },
      { id: "printed shirt", label: "Printed Shirts" },
      { id: "striped shirt", label: "Striped Shirts" },
    ],
  },
  {
    id: "tshirts-polos",
    label: "T-Shirts & Polos",
    icon: "fa-solid fa-tshirt",
    subs: [
      { id: "polo tshirt",    label: "Polo T-Shirts" },
      { id: "print tshirt",   label: "Printed T-Shirts" },
      { id: "striped tshirt", label: "Striped T-Shirts" },
      { id: "uniform tshirt", label: "Uniform T-Shirts" },
    ],
  },
  {
    id: "bottoms",
    label: "Bottoms",
    icon: "fa-solid fa-socks",
    subs: [
      { id: "pant",            label: "Pants" },
      { id: "formal trouser",  label: "Formal Trousers" },
    ],
  },
  {
    id: "formal-wear",
    label: "Formal Wear",
    icon: "fa-solid fa-user-tie",
    subs: [
      { id: "blazer", label: "Blazers" },
    ],
  },
  {
    id: "workwear-uniforms",
    label: "Workwear & Uniforms",
    icon: "fa-solid fa-hard-hat",
    subs: [
      { id: "uniform tshirt",    label: "Uniform T-Shirts" },
      { id: "corporate uniform", label: "Corporate Uniform" },
      { id: "medical uniform",   label: "Medical Uniform" },
      { id: "chef uniform",      label: "Chef Uniform" },
      { id: "safety uniform",    label: "Safety Uniform" },
    ],
  },
  {
    id: "inner-underwear",
    label: "Inner & Underwear",
    icon: "fa-solid fa-box",
    subs: [],
  },
] as const;

export const offers: OfferConfig = {
  bannerImage: "/images/mobile-hero-promo.png",
  title: "OFFER WINDOW",
  text: "Elevate your wardrobe with premium fabrics. Special bundle pricing is active for a limited time. Add items to your cart and checkout via WhatsApp to lock in the deals.",
  countdownHours: 12,
  activeProductIds: ["polo-1", "polo-4", "print-2", "print-6", "printed-shirt-1", "printed-shirt-5", "striped-2"],
};

export const products: Product[] = [
  // ── SHIRTS › Linen Shirts ───────────────────────────────────────────────
  {
    id: "linen-shirt-1",
    name: "Premium Linen Beige Shirt",
    mainCategory: "shirts",
    category: "linen shirt",
    price: 45.00,
    images: [
      "/images/shirts/linen shirt/linen_1.png",
    ],
    badge: "PREMIUM",
    sizes: ["S", "M", "L", "XL"],
    desc: "Crafted from 100% organic linen, this shirt offers unparalleled breathability and a relaxed fit. Garment-dyed for rich color and softness.",
  },
  {
    id: "linen-shirt-2",
    name: "Premium Linen Blue Shirt",
    mainCategory: "shirts",
    category: "linen shirt",
    price: 45.00,
    images: [
      "/images/shirts/linen shirt/linen_2.png",
    ],
    badge: "NEW",
    sizes: ["S", "M", "L", "XL"],
    desc: "Soft pastel blue premium linen shirt, naturally breathable with double-stitched durability and a comfortable laid-back fit.",
  },
  {
    id: "linen-shirt-3",
    name: "Premium Linen Olive Shirt",
    mainCategory: "shirts",
    category: "linen shirt",
    price: 48.00,
    images: [
      "/images/shirts/linen shirt/linen_3.png",
    ],
    badge: "TRENDING",
    sizes: ["S", "M", "L", "XL"],
    desc: "Rich olive green premium linen shirt, ideal for smart-casual wear or beach outings. Clean button closures and lightweight drape.",
  },

  // ── SHIRTS › Printed Shirts ─────────────────────────────────────────────
  {
    id: "printed-shirt-1",
    name: "Floral Resort Printed Shirt",
    mainCategory: "shirts",
    category: "printed shirt",
    price: 49.00,
    salePrice: 39.00,
    images: [
      "/images/shirts/printed shirt/WhatsApp Image 2026-06-22 at 3.09.16 PM.jpeg",
      "/images/shirts/printed shirt/WhatsApp Image 2026-06-22 at 3.09.17 PM.jpeg",
    ],
    badge: "SALE",
    sizes: ["S", "M", "L", "XL"],
    desc: "Fluid viscose resort shirt featuring bespoke floral print patterns. Cut with an open camp collar, straight hem, and relaxed boxy drape.",
  },
  {
    id: "printed-shirt-2",
    name: "Pacific Wave Resort Shirt",
    mainCategory: "shirts",
    category: "printed shirt",
    price: 52.00,
    images: [
      "/images/shirts/printed shirt/WhatsApp Image 2026-06-22 at 3.09.18 PM.jpeg",
      "/images/shirts/printed shirt/WhatsApp Image 2026-06-22 at 3.09.18 PM (1).jpeg",
    ],
    badge: "HOT",
    sizes: ["S", "M", "L", "XL"],
    desc: "Open placket resort shirt featuring an all-over dynamic abstract wave pattern. Smooth, breathable cotton-viscose blend.",
  },
  {
    id: "printed-shirt-3",
    name: "Abstract Expressionist Shirt",
    mainCategory: "shirts",
    category: "printed shirt",
    price: 50.00,
    images: [
      "/images/shirts/printed shirt/WhatsApp Image 2026-06-22 at 3.09.19 PM.jpeg",
      "/images/shirts/printed shirt/WhatsApp Image 2026-06-22 at 3.09.19 PM (1).jpeg",
    ],
    badge: "",
    sizes: ["S", "M", "L", "XL"],
    desc: "Streetwear button-down featuring contrast paint-stroke abstract graphics. Flat collar, premium horn buttons, and relaxed drape.",
  },
  {
    id: "printed-shirt-4",
    name: "Retro Grid Resort Shirt",
    mainCategory: "shirts",
    category: "printed shirt",
    price: 48.00,
    images: [
      "/images/shirts/printed shirt/WhatsApp Image 2026-06-22 at 3.09.20 PM.jpeg",
      "/images/shirts/printed shirt/WhatsApp Image 2026-06-22 at 3.09.20 PM (1).jpeg",
    ],
    badge: "",
    sizes: ["M", "L", "XL"],
    desc: "Vintage grid lines design printed shirt. Breathable lightweight drape with camp collar, short sleeves, and relaxed fit.",
  },
  {
    id: "printed-shirt-5",
    name: "Botanical Shadow Shirt",
    mainCategory: "shirts",
    category: "printed shirt",
    price: 52.00,
    salePrice: 42.00,
    images: [
      "/images/shirts/printed shirt/WhatsApp Image 2026-06-22 at 3.09.21 PM.jpeg",
      "/images/shirts/printed shirt/WhatsApp Image 2026-06-22 at 3.09.21 PM (1).jpeg",
    ],
    badge: "SALE",
    sizes: ["S", "M", "L", "XL", "XXL"],
    desc: "Dark base botanical outline printed resort shirt. Premium drape, horn button closures, side slit hem splits.",
  },

  // ── SHIRTS › Striped Shirts ─────────────────────────────────────────────
  {
    id: "striped-1",
    name: "Oxford Navy Striped Shirt",
    mainCategory: "shirts",
    category: "striped shirt",
    price: 45.00,
    images: [
      "/images/shirts/striped shirt/striped_1.png",
    ],
    badge: "PREMIUM",
    sizes: ["S", "M", "L", "XL"],
    desc: "Classic vertical stripe knit shirt in premium Oxford cotton. Features dropped shoulders, clean button-down collar, and relaxed fit.",
  },
  {
    id: "striped-2",
    name: "Oxford Red Striped Shirt",
    mainCategory: "shirts",
    category: "striped shirt",
    price: 45.00,
    salePrice: 35.00,
    images: [
      "/images/shirts/striped shirt/striped_2.png",
    ],
    badge: "SALE",
    sizes: ["S", "M", "L", "XL"],
    desc: "Retro red-and-white vertical striped Oxford shirt. Breathable, structured drape with timeless styling details.",
  },

  // ── T-SHIRTS & POLOS › Polo T-Shirts ────────────────────────────────────
  {
    id: "polo-1",
    name: "Pacific Waffle Knit Polo",
    mainCategory: "tshirts-polos",
    category: "polo tshirt",
    price: 39.00,
    salePrice: 29.00,
    images: [
      "/images/tshirts-polos/polo tshirt/WhatsApp Image 2026-06-22 at 3.02.20 PM.jpeg",
      "/images/tshirts-polos/polo tshirt/WhatsApp Image 2026-06-22 at 3.02.21 PM.jpeg",
    ],
    badge: "SALE",
    sizes: ["S", "M", "L", "XL"],
    desc: "Textured waffle-knit polo shirt woven from premium long-staple cotton. Boxy fit featuring a flat-knit open collar and dropped shoulders.",
  },
  {
    id: "polo-2",
    name: "Meridian Heavy Knit Polo",
    mainCategory: "tshirts-polos",
    category: "polo tshirt",
    price: 42.00,
    images: [
      "/images/tshirts-polos/polo tshirt/WhatsApp Image 2026-06-22 at 3.02.22 PM.jpeg",
      "/images/tshirts-polos/polo tshirt/WhatsApp Image 2026-06-22 at 3.02.22 PM (1).jpeg",
    ],
    badge: "ESSENTIAL",
    sizes: ["S", "M", "L", "XL", "XXL"],
    desc: "Heavyweight 360GSM knit polo with clean zip-free open placket. Soft, structured cotton blend that retains its boxy shape.",
  },
  {
    id: "polo-3",
    name: "Vortex Vintage Polo",
    mainCategory: "tshirts-polos",
    category: "polo tshirt",
    price: 40.00,
    images: [
      "/images/tshirts-polos/polo tshirt/WhatsApp Image 2026-06-22 at 3.02.23 PM.jpeg",
      "/images/tshirts-polos/polo tshirt/WhatsApp Image 2026-06-22 at 3.06.25 PM.jpeg",
    ],
    badge: "",
    sizes: ["S", "M", "L", "XL"],
    desc: "Acid washed retro style polo shirt with embroidered North Pacific crest logo on chest. Ribbed collar and cuffs with double striped piping.",
  },
  {
    id: "polo-4",
    name: "Siren Knit Stripe Polo",
    mainCategory: "tshirts-polos",
    category: "polo tshirt",
    price: 45.00,
    salePrice: 35.00,
    images: [
      "/images/tshirts-polos/polo tshirt/WhatsApp Image 2026-06-22 at 3.06.26 PM.jpeg",
      "/images/tshirts-polos/polo tshirt/WhatsApp Image 2026-06-22 at 3.06.26 PM (1).jpeg",
    ],
    badge: "SALE",
    sizes: ["S", "M", "L", "XL"],
    desc: "Knit stripe patterned polo shirt in structured cotton. Featuring high-density vertical line textures, flat-stitch collar, and loose rib cuffs.",
  },
  {
    id: "polo-5",
    name: "North Star Heavyweight Polo",
    mainCategory: "tshirts-polos",
    category: "polo tshirt",
    price: 44.00,
    images: [
      "/images/tshirts-polos/polo tshirt/WhatsApp Image 2026-06-22 at 3.06.27 PM.jpeg",
      "/images/tshirts-polos/polo tshirt/WhatsApp Image 2026-06-22 at 3.06.27 PM (1).jpeg",
    ],
    badge: "NEW",
    sizes: ["M", "L", "XL", "XXL"],
    desc: "Heavyweight drop-shoulder polo shirt with reinforced collar seams and rubber buttons. Finished with a clean silicone brand print.",
  },
  {
    id: "polo-6",
    name: "Classic Ribbed Polo",
    mainCategory: "tshirts-polos",
    category: "polo tshirt",
    price: 38.00,
    images: [
      "/images/tshirts-polos/polo tshirt/WhatsApp Image 2026-06-22 at 3.06.28 PM.jpeg",
      "/images/tshirts-polos/polo tshirt/WhatsApp Image 2026-06-22 at 3.06.28 PM (1).jpeg",
    ],
    badge: "",
    sizes: ["S", "M", "L", "XL"],
    desc: "Standard fit ribbed polo shirt crafted from breathable cotton pique. A wardrobe foundation piece with understated branding.",
  },

  // ── T-SHIRTS & POLOS › Printed T-Shirts ─────────────────────────────────
  {
    id: "print-1",
    name: "Abstract Grid Graphic Tee",
    mainCategory: "tshirts-polos",
    category: "print tshirt",
    price: 35.00,
    images: [
      "/images/tshirts-polos/print tshirt/WhatsApp Image 2026-06-22 at 3.06.41 PM.jpeg",
      "/images/tshirts-polos/print tshirt/WhatsApp Image 2026-06-22 at 3.06.42 PM.jpeg",
    ],
    badge: "POPULAR",
    sizes: ["S", "M", "L", "XL", "XXL"],
    desc: "Oversized graphic tee featuring screenprinted abstract grids on chest and back. Crafted from 240GSM heavyweight cotton jersey.",
  },
  {
    id: "print-2",
    name: "Neo Tokyo Oversized Tee",
    mainCategory: "tshirts-polos",
    category: "print tshirt",
    price: 38.00,
    salePrice: 28.00,
    images: [
      "/images/tshirts-polos/print tshirt/WhatsApp Image 2026-06-22 at 3.06.42 PM (1).jpeg",
      "/images/tshirts-polos/print tshirt/WhatsApp Image 2026-06-22 at 3.06.42 PM (2).jpeg",
    ],
    badge: "SALE",
    sizes: ["S", "M", "L", "XL"],
    desc: "Streetwear heavy tee with futuristic cyber graphic print in plastisol ink on front panel. Loose boxy fit with clean crewneck collar.",
  },
  {
    id: "print-3",
    name: "Pacific Echo Heavyweight Tee",
    mainCategory: "tshirts-polos",
    category: "print tshirt",
    price: 36.00,
    images: [
      "/images/tshirts-polos/print tshirt/WhatsApp Image 2026-06-22 at 3.06.43 PM.jpeg",
      "/images/tshirts-polos/print tshirt/WhatsApp Image 2026-06-22 at 3.06.43 PM (1).jpeg",
    ],
    badge: "",
    sizes: ["M", "L", "XL"],
    desc: "Heavyweight drop shoulder tee featuring abstract wave graphics. Preshrunk cotton jersey fabric.",
  },
  {
    id: "print-4",
    name: "Retro Wave Graphic Tee",
    mainCategory: "tshirts-polos",
    category: "print tshirt",
    price: 37.00,
    images: [
      "/images/tshirts-polos/print tshirt/WhatsApp Image 2026-06-22 at 3.06.43 PM (2).jpeg",
      "/images/tshirts-polos/print tshirt/WhatsApp Image 2026-06-22 at 3.06.44 PM.jpeg",
    ],
    badge: "",
    sizes: ["S", "M", "L", "XL"],
    desc: "Bold typography and vintage halftone wave print graphic on front. Styled with dropped shoulders and relaxed fit silhouette.",
  },
  {
    id: "print-5",
    name: "Core Logo Box Tee",
    mainCategory: "tshirts-polos",
    category: "print tshirt",
    price: 32.00,
    images: [
      "/images/tshirts-polos/print tshirt/WhatsApp Image 2026-06-22 at 3.07.01 PM.jpeg",
      "/images/tshirts-polos/print tshirt/WhatsApp Image 2026-06-22 at 3.07.02 PM.jpeg",
    ],
    badge: "ESSENTIAL",
    sizes: ["S", "M", "L", "XL", "XXL"],
    desc: "The foundational North Pacific logo tee. Minimal logo embroidered on left chest with a large block screenprint on back.",
  },
  {
    id: "print-6",
    name: "Minimal Outline Graphic Tee",
    mainCategory: "tshirts-polos",
    category: "print tshirt",
    price: 34.00,
    salePrice: 24.00,
    images: [
      "/images/tshirts-polos/print tshirt/WhatsApp Image 2026-06-22 at 3.07.03 PM.jpeg",
      "/images/tshirts-polos/print tshirt/WhatsApp Image 2026-06-22 at 3.07.03 PM (1).jpeg",
    ],
    badge: "SALE",
    sizes: ["S", "M", "L", "XL"],
    desc: "Sleek line-art style streetwear graphic print. Medium weight cotton fabric, loose fit layout, reinforced rib neck ring.",
  },

  // ── T-SHIRTS & POLOS › Striped T-Shirts ─────────────────────────────────
  {
    id: "striped-tee-1",
    name: "Vintage Striped T-Shirt",
    mainCategory: "tshirts-polos",
    category: "striped tshirt",
    price: 36.00,
    images: [
      "/images/tshirts-polos/striped t-shirt/WhatsApp Image 2026-06-22 at 3.07.10 PM.jpeg",
      "/images/tshirts-polos/striped t-shirt/WhatsApp Image 2026-06-22 at 3.07.11 PM (1).jpeg",
      "/images/tshirts-polos/striped t-shirt/WhatsApp Image 2026-06-22 at 3.07.11 PM (2).jpeg"
    ],
    badge: "NEW",
    sizes: ["S", "M", "L", "XL"],
    desc: "Premium striped t-shirt featuring vibrant multi-color stripes. Medium weight jersey cotton for everyday comfort and durability.",
  },
  {
    id: "striped-tee-2",
    name: "Nautical Contrast Striped Tee",
    mainCategory: "tshirts-polos",
    category: "striped tshirt",
    price: 38.00,
    salePrice: 28.00,
    images: [
      "/images/tshirts-polos/striped t-shirt/WhatsApp Image 2026-06-22 at 3.07.12 PM.jpeg",
      "/images/tshirts-polos/striped t-shirt/WhatsApp Image 2026-06-22 at 3.07.12 PM (1).jpeg",
      "/images/tshirts-polos/striped t-shirt/WhatsApp Image 2026-06-22 at 3.07.12 PM (2).jpeg"
    ],
    badge: "SALE",
    sizes: ["S", "M", "L", "XL"],
    desc: "Nautical inspired contrast striped tee. Crafted with breathable cotton construction and a relaxed fit.",
  },

  // ── BOTTOMS › Pants ─────────────────────────────────────────────────────
  {
    id: "pant-1",
    name: "Welter Skater Fit Chino",
    mainCategory: "bottoms",
    category: "pant",
    price: 65.00,
    images: [
      "/images/bottoms/pant/Welter 6 color skater fit.jpeg",
    ],
    badge: "6 COLORS",
    sizes: ["30", "32", "34", "36"],
    desc: "Skater-inspired loose fit chino pants with a relaxed straight leg. Heavyweight cotton twill construction built for durability and comfort.",
  },
  {
    id: "pant-2",
    name: "Jawa Relaxed Cargo Pants",
    mainCategory: "bottoms",
    category: "pant",
    price: 69.00,
    images: [
      "/images/bottoms/pant/Jawa 3 color.jpeg",
    ],
    badge: "BESTSELLER",
    sizes: ["30", "32", "34", "36"],
    desc: "Relaxed streetwear cargo pants featuring multi-pocket configuration with snap closures. Medium weight cotton ripstop.",
  },
  {
    id: "pant-3",
    name: "Dylez Skater Denim Jeans",
    mainCategory: "bottoms",
    category: "pant",
    price: 62.00,
    images: [
      "/images/bottoms/pant/Dylez 3 color.jpeg",
    ],
    badge: "NEW",
    sizes: ["30", "32", "34", "36"],
    desc: "Classic 90s skater fit wide-leg jeans with vintage washed wash. Embellished with custom hardware and heavy contrast stitching.",
  },

  // ── FORMAL WEAR › Blazers ───────────────────────────────────────────────
  {
    id: "formal-blazer-1",
    name: "Signature Tailored Blazer",
    mainCategory: "formal-wear",
    category: "blazer",
    price: 95.00,
    images: [
      "/images/formal-wear/blazer/blazer for main.png",
    ],
    badge: "PREMIUM",
    sizes: ["S", "M", "L", "XL"],
    desc: "A modern tailored blazer crafted from a high-quality wool blend. Soft shoulders, notched lapels, and a contemporary unstructured drape.",
  },

  // ── WORKWEAR & UNIFORMS ───────────────────────────────────────────────
  {
    id: "workwear-chef-1",
    name: "Executive Chef Jacket",
    mainCategory: "workwear-uniforms",
    category: "chef uniform",
    price: 45.00,
    images: [
      "/images/workwear-uniforms/chef uniform.png",
    ],
    badge: "DURABLE",
    sizes: ["M", "L", "XL", "XXL"],
    desc: "Professional chef uniform designed for comfort and ventilation in high-heat environments. Double-breasted with breathable side panels.",
  },
  {
    id: "workwear-corporate-1",
    name: "Premium Corporate Oxford Shirt",
    mainCategory: "workwear-uniforms",
    category: "corporate uniform",
    price: 39.00,
    images: [
      "/images/workwear-uniforms/Corperate main.png",
    ],
    badge: "OFFICE",
    sizes: ["S", "M", "L", "XL", "XXL"],
    desc: "Sleek, wrinkle-resistant corporate oxford shirt. Perfect for team uniforms and formal corporate branding.",
  },
  {
    id: "workwear-doctor-1",
    name: "Medical Scrubs V-Neck Top",
    mainCategory: "workwear-uniforms",
    category: "medical uniform",
    price: 29.00,
    images: [
      "/images/workwear-uniforms/doctor uniform.png",
    ],
    badge: "HYGIENE",
    sizes: ["S", "M", "L", "XL"],
    desc: "Antimicrobial, moisture-wicking scrub top. Features four-way stretch fabric and utility pocket storage.",
  },
  {
    id: "workwear-safety-1",
    name: "High-Visibility Safety Parka",
    mainCategory: "workwear-uniforms",
    category: "safety uniform",
    price: 59.00,
    images: [
      "/images/workwear-uniforms/safety uniform.png",
    ],
    badge: "SAFETY",
    sizes: ["M", "L", "XL", "XXL"],
    desc: "Reflective high-visibility safety jacket designed to meet occupational standards. Windproof, waterproof, and highly durable.",
  },
  {
    id: "workwear-tshirt-1",
    name: "Heavy-Duty Staff Uniform Tee",
    mainCategory: "workwear-uniforms",
    category: "uniform tshirt",
    price: 19.00,
    images: [
      "/images/workwear-uniforms/tshirt uniform.png",
    ],
    badge: "UTILITY",
    sizes: ["S", "M", "L", "XL", "XXL"],
    desc: "Reinforced stitching staff uniform t-shirt. Shrink-resistant cotton built for daily washing and high durability.",
  },
];
