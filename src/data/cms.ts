export interface OfferConfig {
  bannerImage: string;
  title: string;
  text: string;
  countdownHours: number;
  activeProductIds: string[];
  enabled?: boolean;
  position?: string;
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
      { id: "cuban-collar-shirt", label: "Cuban Collar Shirt" },
      { id: "resort-shirt", label: "Resort Shirt" },
      { id: "linen-shirt", label: "Linen Shirt" },
      { id: "oxford-shirt", label: "Oxford Shirt" },
      { id: "denim-shirt", label: "Denim Shirt" },
      { id: "flannel-shirt", label: "Flannel Shirt" },
      { id: "printed-shirt", label: "Printed Shirt" },
    ],
  },
  {
    id: "tshirts",
    label: "T-Shirts",
    icon: "fa-solid fa-tshirt",
    subs: [
      { id: "plain-crew-neck-t-shirt", label: "Plain Crew Neck T-Shirt" },
      { id: "oversized-t-shirt", label: "Oversized T-Shirt" },
      { id: "heavyweight-t-shirt", label: "Heavyweight T-Shirt" },
      { id: "graphic-t-shirt", label: "Graphic T-Shirt" },
      { id: "henley-t-shirt", label: "Henley T-Shirt" },
      { id: "classic-polo-shirt", label: "Classic Polo Shirt" },
      { id: "striped-polo-shirt", label: "Striped Polo Shirt" },
      { id: "knit-polo-shirt", label: "Knit Polo Shirt" },
      { id: "quarter-zip-polo-shirt", label: "Quarter Zip Polo Shirt" },
    ],
  },
  {
    id: "bottoms",
    label: "Bottoms",
    icon: "fa-solid fa-socks",
    subs: [
      { id: "formal-trousers", label: "Formal Trousers" },
      { id: "chino-pants", label: "Chino Pants" },
      { id: "linen-pants", label: "Linen Pants" },
      { id: "baggy-denim-jeans", label: "Baggy Denim Jeans" },
      { id: "cargo-denim-jeans", label: "Cargo Denim Jeans" },
      { id: "cargo-pants", label: "Cargo Pants" },
      { id: "joggers", label: "Joggers" },
      { id: "chino-shorts", label: "Chino Shorts" },
      { id: "linen-shorts", label: "Linen Shorts" },
    ],
  },
  {
    id: "blazers-jackets",
    label: "Blazers & Jackets",
    icon: "fa-solid fa-user-tie",
    subs: [
      { id: "formal-blazer", label: "Formal Blazer" },
      { id: "bomber-jacket", label: "Bomber Jacket" },
      { id: "lightweight-utility-jacket", label: "Lightweight Utility Jacket" },
    ],
  },
  {
    id: "uniforms",
    label: "Uniforms",
    icon: "fa-solid fa-user-doctor",
    subs: [
      { id: "corporate-polo-uniform", label: "Corporate Polo Uniform" },
      { id: "doctor-uniform", label: "Doctor Uniform" },
      { id: "chef-uniform", label: "Chef Uniform" },
      { id: "safety-industrial-workwear-uniform", label: "Safety Industrial Workwear Uniform" },
    ],
  },
] as const;

export const offers: OfferConfig = {
  enabled: false,
  position: "section",
  bannerImage: "/images/mobile-hero-promo.webp",
  title: "OFFER WINDOW",
  text: "Elevate your wardrobe with premium fabrics. Special bundle pricing is active for a limited time. Add items to your cart and checkout via WhatsApp to lock in the deals.",
  countdownHours: 12,
  activeProductIds: [],
};

export const products: Product[] = [
  {
    id: "cuban-collar-shirt-1",
    name: "Cuban Collar Shirt",
    mainCategory: "shirts",
    category: "cuban-collar-shirt",
    price: 49.00,
    images: [
      "/images/products/Shirts/Cuban Collar Shirt/image.webp",
    ],
    badge: "",
    sizes: ["S", "M", "L", "XL"],
    desc: "Premium cuban collar shirt crafted for comfort and style.",
  },
  {
    id: "resort-shirt-1",
    name: "Resort Shirt",
    mainCategory: "shirts",
    category: "resort-shirt",
    price: 49.00,
    images: [
      "/images/products/Shirts/Resort Shirt/image.webp",
    ],
    badge: "",
    sizes: ["S", "M", "L", "XL"],
    desc: "Premium resort shirt crafted for comfort and style.",
  },
  {
    id: "linen-shirt-1",
    name: "Linen Shirt",
    mainCategory: "shirts",
    category: "linen-shirt",
    price: 49.00,
    images: [
      "/images/products/Shirts/Linen Shirt/image.webp",
    ],
    badge: "",
    sizes: ["S", "M", "L", "XL"],
    desc: "Premium linen shirt crafted for comfort and style.",
  },
  {
    id: "oxford-shirt-1",
    name: "Oxford Shirt",
    mainCategory: "shirts",
    category: "oxford-shirt",
    price: 49.00,
    images: [
      "/images/products/Shirts/Oxford Shirt/image.webp",
    ],
    badge: "",
    sizes: ["S", "M", "L", "XL"],
    desc: "Premium oxford shirt crafted for comfort and style.",
  },
  {
    id: "denim-shirt-1",
    name: "Denim Shirt",
    mainCategory: "shirts",
    category: "denim-shirt",
    price: 49.00,
    images: [
      "/images/products/Shirts/Denim Shirt/image.webp",
    ],
    badge: "",
    sizes: ["S", "M", "L", "XL"],
    desc: "Premium denim shirt crafted for comfort and style.",
  },
  {
    id: "flannel-shirt-1",
    name: "Flannel Shirt",
    mainCategory: "shirts",
    category: "flannel-shirt",
    price: 49.00,
    images: [
      "/images/products/Shirts/Flannel Shirt/image.webp",
    ],
    badge: "",
    sizes: ["S", "M", "L", "XL"],
    desc: "Premium flannel shirt crafted for comfort and style.",
  },
  {
    id: "printed-shirt-1",
    name: "Printed Shirt",
    mainCategory: "shirts",
    category: "printed-shirt",
    price: 49.00,
    images: [
      "/images/products/Shirts/Printed Shirt/image.webp",
    ],
    badge: "",
    sizes: ["S", "M", "L", "XL"],
    desc: "Premium printed shirt crafted for comfort and style.",
  },
  {
    id: "plain-crew-neck-t-shirt-1",
    name: "Plain Crew Neck T-Shirt",
    mainCategory: "tshirts",
    category: "plain-crew-neck-t-shirt",
    price: 49.00,
    images: [
      "/images/products/T-Shirts/Plain Crew Neck T-Shirt/image.webp",
    ],
    badge: "",
    sizes: ["S", "M", "L", "XL"],
    desc: "Premium plain crew neck t-shirt crafted for comfort and style.",
  },
  {
    id: "oversized-t-shirt-1",
    name: "Oversized T-Shirt",
    mainCategory: "tshirts",
    category: "oversized-t-shirt",
    price: 49.00,
    images: [
      "/images/products/T-Shirts/Oversized T-Shirt/image.webp",
    ],
    badge: "",
    sizes: ["S", "M", "L", "XL"],
    desc: "Premium oversized t-shirt crafted for comfort and style.",
  },
  {
    id: "heavyweight-t-shirt-1",
    name: "Heavyweight T-Shirt",
    mainCategory: "tshirts",
    category: "heavyweight-t-shirt",
    price: 49.00,
    images: [
      "/images/products/T-Shirts/Heavyweight T-Shirt/image.webp",
    ],
    badge: "",
    sizes: ["S", "M", "L", "XL"],
    desc: "Premium heavyweight t-shirt crafted for comfort and style.",
  },
  {
    id: "graphic-t-shirt-1",
    name: "Graphic T-Shirt",
    mainCategory: "tshirts",
    category: "graphic-t-shirt",
    price: 49.00,
    images: [
      "/images/products/T-Shirts/Graphic T-Shirt/image.webp",
    ],
    badge: "",
    sizes: ["S", "M", "L", "XL"],
    desc: "Premium graphic t-shirt crafted for comfort and style.",
  },
  {
    id: "henley-t-shirt-1",
    name: "Henley T-Shirt",
    mainCategory: "tshirts",
    category: "henley-t-shirt",
    price: 49.00,
    images: [
      "/images/products/T-Shirts/Henley T-Shirt/image.webp",
    ],
    badge: "",
    sizes: ["S", "M", "L", "XL"],
    desc: "Premium henley t-shirt crafted for comfort and style.",
  },
  {
    id: "classic-polo-shirt-1",
    name: "Classic Polo Shirt",
    mainCategory: "tshirts",
    category: "classic-polo-shirt",
    price: 49.00,
    images: [
      "/images/products/T-Shirts/Classic Polo Shirt/image.webp",
    ],
    badge: "",
    sizes: ["S", "M", "L", "XL"],
    desc: "Premium classic polo shirt crafted for comfort and style.",
  },
  {
    id: "striped-polo-shirt-1",
    name: "Striped Polo Shirt",
    mainCategory: "tshirts",
    category: "striped-polo-shirt",
    price: 49.00,
    images: [
      "/images/products/T-Shirts/Striped Polo Shirt/image.webp",
    ],
    badge: "",
    sizes: ["S", "M", "L", "XL"],
    desc: "Premium striped polo shirt crafted for comfort and style.",
  },
  {
    id: "knit-polo-shirt-1",
    name: "Knit Polo Shirt",
    mainCategory: "tshirts",
    category: "knit-polo-shirt",
    price: 49.00,
    images: [
      "/images/products/T-Shirts/Knit Polo Shirt/image.webp",
    ],
    badge: "",
    sizes: ["S", "M", "L", "XL"],
    desc: "Premium knit polo shirt crafted for comfort and style.",
  },
  {
    id: "quarter-zip-polo-shirt-1",
    name: "Quarter Zip Polo Shirt",
    mainCategory: "tshirts",
    category: "quarter-zip-polo-shirt",
    price: 49.00,
    images: [
      "/images/products/T-Shirts/Quarter Zip Polo Shirt/image.webp",
    ],
    badge: "",
    sizes: ["S", "M", "L", "XL"],
    desc: "Premium quarter zip polo shirt crafted for comfort and style.",
  },
  {
    id: "formal-trousers-1",
    name: "Formal Trousers",
    mainCategory: "bottoms",
    category: "formal-trousers",
    price: 49.00,
    images: [
      "/images/products/Bottoms/Formal Trousers/image.webp",
    ],
    badge: "",
    sizes: ["S", "M", "L", "XL"],
    desc: "Premium formal trousers crafted for comfort and style.",
  },
  {
    id: "chino-pants-1",
    name: "Chino Pants",
    mainCategory: "bottoms",
    category: "chino-pants",
    price: 49.00,
    images: [
      "/images/products/Bottoms/Chino Pants/image.webp",
    ],
    badge: "",
    sizes: ["S", "M", "L", "XL"],
    desc: "Premium chino pants crafted for comfort and style.",
  },
  {
    id: "linen-pants-1",
    name: "Linen Pants",
    mainCategory: "bottoms",
    category: "linen-pants",
    price: 49.00,
    images: [
      "/images/products/Bottoms/Linen Pants/image.webp",
    ],
    badge: "",
    sizes: ["S", "M", "L", "XL"],
    desc: "Premium linen pants crafted for comfort and style.",
  },
  {
    id: "baggy-denim-jeans-1",
    name: "Baggy Denim Jeans",
    mainCategory: "bottoms",
    category: "baggy-denim-jeans",
    price: 49.00,
    images: [
      "/images/products/Bottoms/Baggy Denim Jeans/image.webp",
    ],
    badge: "",
    sizes: ["S", "M", "L", "XL"],
    desc: "Premium baggy denim jeans crafted for comfort and style.",
  },
  {
    id: "cargo-denim-jeans-1",
    name: "Cargo Denim Jeans",
    mainCategory: "bottoms",
    category: "cargo-denim-jeans",
    price: 49.00,
    images: [
      "/images/products/Bottoms/Cargo Denim Jeans/image.webp",
    ],
    badge: "",
    sizes: ["S", "M", "L", "XL"],
    desc: "Premium cargo denim jeans crafted for comfort and style.",
  },
  {
    id: "cargo-pants-1",
    name: "Cargo Pants",
    mainCategory: "bottoms",
    category: "cargo-pants",
    price: 49.00,
    images: [
      "/images/products/Bottoms/Cargo Pants/image.webp",
    ],
    badge: "",
    sizes: ["S", "M", "L", "XL"],
    desc: "Premium cargo pants crafted for comfort and style.",
  },
  {
    id: "joggers-1",
    name: "Joggers",
    mainCategory: "bottoms",
    category: "joggers",
    price: 49.00,
    images: [
      "/images/products/Bottoms/Joggers/image.webp",
    ],
    badge: "",
    sizes: ["S", "M", "L", "XL"],
    desc: "Premium joggers crafted for comfort and style.",
  },
  {
    id: "chino-shorts-1",
    name: "Chino Shorts",
    mainCategory: "bottoms",
    category: "chino-shorts",
    price: 49.00,
    images: [
      "/images/products/Bottoms/Chino Shorts/image.webp",
    ],
    badge: "",
    sizes: ["S", "M", "L", "XL"],
    desc: "Premium chino shorts crafted for comfort and style.",
  },
  {
    id: "linen-shorts-1",
    name: "Linen Shorts",
    mainCategory: "bottoms",
    category: "linen-shorts",
    price: 49.00,
    images: [
      "/images/products/Bottoms/Linen Shorts/image.webp",
    ],
    badge: "",
    sizes: ["S", "M", "L", "XL"],
    desc: "Premium linen shorts crafted for comfort and style.",
  },
  {
    id: "formal-blazer-1",
    name: "Formal Blazer",
    mainCategory: "blazers-jackets",
    category: "formal-blazer",
    price: 49.00,
    images: [
      "/images/products/Blazers & Jackets/Formal Blazer/image.webp",
    ],
    badge: "",
    sizes: ["S", "M", "L", "XL"],
    desc: "Premium formal blazer crafted for comfort and style.",
  },
  {
    id: "bomber-jacket-1",
    name: "Bomber Jacket",
    mainCategory: "blazers-jackets",
    category: "bomber-jacket",
    price: 49.00,
    images: [
      "/images/products/Blazers & Jackets/Bomber Jacket/image.webp",
    ],
    badge: "",
    sizes: ["S", "M", "L", "XL"],
    desc: "Premium bomber jacket crafted for comfort and style.",
  },
  {
    id: "lightweight-utility-jacket-1",
    name: "Lightweight Utility Jacket",
    mainCategory: "blazers-jackets",
    category: "lightweight-utility-jacket",
    price: 49.00,
    images: [
      "/images/products/Blazers & Jackets/Lightweight Utility Jacket/image.webp",
    ],
    badge: "",
    sizes: ["S", "M", "L", "XL"],
    desc: "Premium lightweight utility jacket crafted for comfort and style.",
  },
  {
    id: "corporate-polo-uniform-1",
    name: "Corporate Polo Uniform",
    mainCategory: "uniforms",
    category: "corporate-polo-uniform",
    price: 49.00,
    images: [
      "/images/products/Uniforms/Corporate Polo Uniform/image.webp",
    ],
    badge: "",
    sizes: ["S", "M", "L", "XL"],
    desc: "Premium corporate polo uniform crafted for comfort and style.",
  },
  {
    id: "doctor-uniform-1",
    name: "Doctor Uniform",
    mainCategory: "uniforms",
    category: "doctor-uniform",
    price: 49.00,
    images: [
      "/images/products/Uniforms/Doctor Uniform/image.webp",
    ],
    badge: "",
    sizes: ["S", "M", "L", "XL"],
    desc: "Premium doctor uniform crafted for comfort and style.",
  },
  {
    id: "chef-uniform-1",
    name: "Chef Uniform",
    mainCategory: "uniforms",
    category: "chef-uniform",
    price: 49.00,
    images: [
      "/images/products/Uniforms/Chef Uniform/image.webp",
    ],
    badge: "",
    sizes: ["S", "M", "L", "XL"],
    desc: "Premium chef uniform crafted for comfort and style.",
  },
  {
    id: "safety-industrial-workwear-uniform-1",
    name: "Safety Industrial Workwear Uniform",
    mainCategory: "uniforms",
    category: "safety-industrial-workwear-uniform",
    price: 49.00,
    images: [
      "/images/products/Uniforms/Safety Industrial Workwear Uniform/image.webp",
    ],
    badge: "",
    sizes: ["S", "M", "L", "XL"],
    desc: "Premium safety industrial workwear uniform crafted for comfort and style.",
  },
];
