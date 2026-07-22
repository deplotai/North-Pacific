"use client";

import React, { useEffect, useState, useRef, FormEvent } from "react";
import Image from "next/image";
import { products, offers, Product, CATEGORY_TREE } from "@/data/cms";
import { useCart } from "@/context/CartContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Preloader from "@/components/Preloader";

// We will replace Product type with Category type for the Catalog grid
interface CatalogCategory {
  id: string;
  parent: string;
  label: string;
  img: string;
}

const catalogCategories: CatalogCategory[] = [
  // Shirts
  { id: "cuban collar shirt", parent: "shirts", label: "Cuban", img: "/images/shirts/Cuban Collar/7b464220-11a0-4ba9-9689-555d66fe81a5.png" },
  { id: "formal shirt", parent: "shirts", label: "Formal", img: "/images/shirts/Formal/formal_1.png" },
  { id: "linen shirt", parent: "shirts", label: "Linen", img: "/images/shirts/Linen/linen_1.png" },
  { id: "oxford shirt", parent: "shirts", label: "Oxford", img: "/images/shirts/Oxford/oxford_1.png" },
  { id: "printed shirt", parent: "shirts", label: "Printed", img: "/images/shirts/Printed/printed_1.png" },
  // T-Shirts
  { id: "graphic tshirt", parent: "tshirts-polos", label: "Graphic", img: "/images/tshirts-polos/Graphic/graphic_1.png" },
  { id: "oversized tshirt", parent: "tshirts-polos", label: "Oversized", img: "/images/tshirts-polos/Oversized/oversized_1.png" },
  { id: "plain essentials", parent: "tshirts-polos", label: "Plain", img: "/images/tshirts-polos/Plain Essentials/plain_essentials_1.png" },
  { id: "polo tshirt", parent: "tshirts-polos", label: "Polo", img: "/images/tshirts-polos/Polo/polo_1.png" },
  { id: "striped tshirt", parent: "tshirts-polos", label: "Striped", img: "/images/tshirts-polos/Striped/striped_1.png" },
  // Bottoms
  { id: "jeans", parent: "bottoms", label: "Jeans", img: "/images/bottoms/Jeans/jeans_1.png" },
  { id: "pants chinos", parent: "bottoms", label: "Chinos", img: "/images/bottoms/Pants/Chinos/chinos_1.png" },
  { id: "pants formal", parent: "bottoms", label: "Formal", img: "/images/bottoms/Pants/Formal/formal_1.png" },
  { id: "pants linen", parent: "bottoms", label: "Linen", img: "/images/bottoms/Pants/Linen/linen_1.png" },
];

export default function Home() {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    addToCart,
    removeFromCart,
    updateQuantity,
    executeCheckout,
    clearCart,
  } = useCart();

  // Preloader State
  const [loading, setLoading] = useState(true);

  // Products and Offers dynamic state (synced with localStorage)
  const [productsList, setProductsList] = useState<Product[]>(products);
  const [offersConfig, setOffersConfig] = useState(offers);

  // Active Category filter state
  const [activeCategory, setActiveCategory] = useState("all");
  const [filteredCategories, setFilteredCategories] = useState<CatalogCategory[]>(catalogCategories);
  const [fadeTrigger, setFadeTrigger] = useState(true);

  // Shirts Featured Grid images
  const shirtImages = [
    "/images/shirts/shirts_1.png",
    "/images/shirts/shirts_2.png",
    "/images/shirts/shirts_3.png"
  ];

  // Tshirts Featured Grid images
  const tshirtImages = [
    "/images/tshirts-polos/tshirts_polos_1.png",
    "/images/tshirts-polos/tshirts_polos_2.png",
    "/images/tshirts-polos/tshirts_polos_3.png"
  ];

  // Bottoms Featured Grid images
  const bottomImages = [
    "/images/bottoms/bottoms_1.png",
    "/images/bottoms/bottoms_2.png"
  ];

  // Workwear Featured Grid images
  const uniformImages = [
    "/images/workwear-uniforms/workwear_uniforms_1.png",
    "/images/workwear-uniforms/workwear_uniforms_2.png",
    "/images/workwear-uniforms/workwear_uniforms_3.png",
    "/images/workwear-uniforms/workwear_uniforms_4.png",
    "/images/workwear-uniforms/workwear_uniforms_5.png"
  ];

  // Quick View Modal state
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [selectedQuickViewSize, setSelectedQuickViewSize] = useState<string | null>(null);
  const [activeQuickViewImageIdx, setActiveQuickViewImageIdx] = useState(0);

  // Selected sizes for individual product cards (key: product.id, value: size)
  const [selectedSizes, setSelectedSizes] = useState<{ [key: string]: string }>({});

  // Countdown timer state
  const [countdown, setCountdown] = useState({ hours: "12", minutes: "00", seconds: "00" });



  // Load dynamic configuration on mount
  useEffect(() => {
    const cachedConfig = localStorage.getItem("np_site_config");
    if (cachedConfig) {
      try {
        const parsed = JSON.parse(cachedConfig);
        if (parsed.products) setProductsList(parsed.products);
        if (parsed.offers) setOffersConfig(parsed.offers);
      } catch (e) {
        console.error("Failed to parse cached config", e);
      }
    }
  }, []);

  // Filter categories when activeCategory or productsList changes
  useEffect(() => {
    setFadeTrigger(false);
    const timeout = setTimeout(() => {
      const filtered =
        activeCategory === "all"
          ? catalogCategories
          : catalogCategories.filter(
              (c) => c.id === activeCategory || c.parent === activeCategory
            );
      setFilteredCategories(filtered);
      setFadeTrigger(true);
    }, 250);

    return () => clearTimeout(timeout);
  }, [activeCategory, productsList]);



  // Countdown timer effect
  useEffect(() => {
    const configuredHours = offersConfig.countdownHours ?? 12;
    let endTimeStr = sessionStorage.getItem("np_offer_end");
    let endTime: number;

    if (!endTimeStr) {
      endTime = Date.now() + configuredHours * 60 * 60 * 1000;
      sessionStorage.setItem("np_offer_end", endTime.toString());
    } else {
      endTime = parseInt(endTimeStr);
    }

    const updateTimer = () => {
      const now = Date.now();
      let diff = endTime - now;

      if (diff <= 0) {
        endTime = Date.now() + configuredHours * 60 * 60 * 1000;
        sessionStorage.setItem("np_offer_end", endTime.toString());
        diff = endTime - now;
      }

      const hrs = Math.floor(diff / (60 * 60 * 1000));
      const mins = Math.floor((diff % (60 * 60 * 1000)) / (60 * 1000));
      const secs = Math.floor((diff % (60 * 1000)) / 1000);

      setCountdown({
        hours: hrs.toString().padStart(2, "0"),
        minutes: mins.toString().padStart(2, "0"),
        seconds: secs.toString().padStart(2, "0"),
      });
    };

    const timerInterval = setInterval(updateTimer, 1000);
    updateTimer();

    return () => clearInterval(timerInterval);
  }, [offersConfig.countdownHours]);

  // Intersection Observer for scroll animations
  useEffect(() => {
    // Small delay to let DOM settle after filteredCategories update
    const timer = setTimeout(() => {
      const revealElements = document.querySelectorAll(".reveal-on-scroll:not(.active)");
      if (revealElements.length === 0) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("active");
              observer.unobserve(entry.target);
            }
          });
        },
        {
          threshold: 0.01,
          rootMargin: "100px 0px 100px 0px",
        }
      );

      revealElements.forEach((el) => {
        observer.observe(el);
      });

      return () => observer.disconnect();
    }, 100);

    return () => clearTimeout(timer);
  }, [filteredCategories]);


  // Handle product card size selection
  const handleSizeSelect = (productId: string, size: string) => {
    setSelectedSizes((prev) => ({ ...prev, [productId]: size }));
  };

  // Handle Add to bag from product card
  const handleAddToBag = (product: Product) => {
    const size = selectedSizes[product.id];
    if (size) {
      addToCart(product, size);
      // Reset card selection
      setSelectedSizes((prev) => {
        const next = { ...prev };
        delete next[product.id];
        return next;
      });
    }
  };

  // Open product quick view modal
  const handleOpenQuickView = (productId: string) => {
    const prod = productsList.find((p) => p.id === productId);
    if (prod) {
      setQuickViewProduct(prod);
      setSelectedQuickViewSize(null);
      setActiveQuickViewImageIdx(0);
    }
  };

  // General Enquiry Form Submit Handler
  const handleEnquirySubmit = (e: FormEvent) => {
    e.preventDefault();
    const name = (document.getElementById("enquiry-name") as HTMLInputElement).value;
    const interest = (document.getElementById("enquiry-interest") as HTMLSelectElement).value;
    const message = (document.getElementById("enquiry-message") as HTMLTextAreaElement).value;

    let waMessage = `Hello North Pacific Styling Team!\n\n`;
    waMessage += `My name is *${name}*.\n`;
    waMessage += `I am enquiring about: *${interest}*\n\n`;
    waMessage += `*MESSAGE:* \n${message}\n\n`;
    waMessage += `Please assist me. Thank you!`;

    const encodedMessage = encodeURIComponent(waMessage);
    const waUrl = `https://wa.me/966500000000?text=${encodedMessage}`;

    window.open(waUrl, "_blank");
    (e.target as HTMLFormElement).reset();
  };

  const hasOfferConfig = offersConfig.activeProductIds && offersConfig.activeProductIds.length > 0;
  const offerItems = hasOfferConfig
    ? productsList.filter((p) => offersConfig.activeProductIds.includes(p.id))
    : productsList.filter((p) => p.salePrice !== undefined);

  const cartSubtotal = cart.reduce((total, item) => {
    const price = item.product.salePrice ?? item.product.price;
    return total + price * item.qty;
  }, 0);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, hash: string) => {
    e.preventDefault();
    const element = document.querySelector(hash);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleCategoryClick = (category: string) => {
    setActiveCategory(category);
    const element = document.getElementById(`category-group-${category}`);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      const section = document.querySelector("#products-section");
      if (section) section.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleCategoryNav = (e: React.MouseEvent<HTMLAnchorElement | HTMLDivElement>, category: string) => {
    e.preventDefault();
    e.stopPropagation();
    handleCategoryClick(category);
  };

  return (
    <>
      {loading && <Preloader onComplete={() => setLoading(false)} />}
      <Header onSelectCategory={handleCategoryClick} />

      {/* Hero Section */}
      <section className="hero-section" id="hero-section">
        {/* Full hero image (desktop) */}
        <img
          src="/Website image/hero desktop.png"
          alt="North Pacific Hero Desktop"
          className="hero-img hero-img-desktop"
        />
        {/* Full hero image (mobile) */}
        <img
          src="/Website image/hero mobile.png"
          alt="North Pacific Hero Mobile"
          className="hero-img hero-img-mobile"
        />
      </section>

      {/* Hero Promo Section */}
      <section className="hero-promo-section">
        <img
          src="/Website image/after hero desktop.png"
          alt="North Pacific Promo Desktop"
          className="promo-img promo-img-desktop"
        />
        <img
          src="/Website image/after hero mobile.png"
          alt="North Pacific Promo Mobile"
          className="promo-img promo-img-mobile"
        />
      </section>


      {/* Featured Categories Grid Section — 6 Main Categories */}
      <section className="featured-categories-section">
        <div className="categories-grid">

          {/* 01 Shirts */}
          <div className="category-grid-card" onClick={(e) => handleCategoryNav(e, "shirts")}>
            <div className="category-card-header">
              <span className="cat-num">01</span>
              <span className="cat-arrow">↗</span>
            </div>
            <div className="category-card-image-wrap" style={{ position: "relative" }}>
              <img src={shirtImages[0]} alt="Shirts 1" className="category-card-img img-default" />
              {shirtImages[1] && <img src={shirtImages[1]} alt="Shirts 2" className="category-card-img img-hover" />}
            </div>
            <div className="category-card-footer">
              <h3 className="category-card-title">SHIRTS</h3>
              <a href="#products-section" className="category-card-link" onClick={(e) => handleCategoryNav(e, "shirts")}>VIEW</a>
            </div>
          </div>

          {/* 02 T-Shirts & Polos */}
          <div className="category-grid-card" onClick={(e) => handleCategoryNav(e, "tshirts-polos")}>
            <div className="category-card-header">
              <span className="cat-num">02</span>
              <span className="cat-arrow">↗</span>
            </div>
            <div className="category-card-image-wrap" style={{ position: "relative" }}>
              <img src={tshirtImages[0]} alt="T-Shirts & Polos 1" className="category-card-img img-default" />
              {tshirtImages[1] && <img src={tshirtImages[1]} alt="T-Shirts & Polos 2" className="category-card-img img-hover" />}
            </div>
            <div className="category-card-footer">
              <h3 className="category-card-title">T-SHIRTS &amp; POLOS</h3>
              <a href="#products-section" className="category-card-link" onClick={(e) => handleCategoryNav(e, "tshirts-polos")}>VIEW</a>
            </div>
          </div>

          {/* 03 Bottoms */}
          <div className="category-grid-card" onClick={(e) => handleCategoryNav(e, "bottoms")}>
            <div className="category-card-header">
              <span className="cat-num">03</span>
              <span className="cat-arrow">↗</span>
            </div>
            <div className="category-card-image-wrap" style={{ position: "relative" }}>
              <img src={bottomImages[0]} alt="Bottoms 1" className="category-card-img img-default" />
              {bottomImages[1] && <img src={bottomImages[1]} alt="Bottoms 2" className="category-card-img img-hover" />}
            </div>
            <div className="category-card-footer">
              <h3 className="category-card-title">BOTTOMS</h3>
              <a href="#products-section" className="category-card-link" onClick={(e) => handleCategoryNav(e, "bottoms")}>VIEW</a>
            </div>
          </div>

          {/* 04 Formal Wear */}
          <div className="category-grid-card" onClick={(e) => handleCategoryNav(e, "formal-wear")}>
            <div className="category-card-header">
              <span className="cat-num">04</span>
              <span className="cat-arrow">↗</span>
            </div>
            <div className="category-card-image-wrap" style={{ position: "relative" }}>
              <img src="/images/formal-wear/formal_wear_1.png" alt="Formal Wear" className="category-card-img img-default" />
            </div>
            <div className="category-card-footer">
              <h3 className="category-card-title">FORMAL WEAR</h3>
              <a href="#products-section" className="category-card-link" onClick={(e) => handleCategoryNav(e, "formal-wear")}>VIEW</a>
            </div>
          </div>

          {/* 05 Workwear & Uniforms */}
          <div className="category-grid-card" onClick={(e) => handleCategoryNav(e, "workwear-uniforms")}>
            <div className="category-card-header">
              <span className="cat-num">05</span>
              <span className="cat-arrow">↗</span>
            </div>
            <div className="category-card-image-wrap" style={{ position: "relative" }}>
              <img src={uniformImages[0]} alt="Workwear & Uniforms 1" className="category-card-img img-default" />
              {uniformImages[1] && <img src={uniformImages[1]} alt="Workwear & Uniforms 2" className="category-card-img img-hover" />}
            </div>
            <div className="category-card-footer">
              <h3 className="category-card-title">WORKWEAR &amp; UNIFORMS</h3>
              <a href="#products-section" className="category-card-link" onClick={(e) => handleCategoryNav(e, "workwear-uniforms")}>VIEW</a>
            </div>
          </div>

          {/* 06 Inner & Underwear */}
          <div className="category-grid-card coming-soon-card">
            <div className="category-card-header">
              <span className="cat-num">06</span>
              <span className="cat-arrow">↗</span>
            </div>
            <div className="category-card-image-wrap category-placeholder-bg">
              <div className="cat-coming-soon-overlay"><span>COMING SOON</span></div>
            </div>
            <div className="category-card-footer">
              <h3 className="category-card-title">INNER &amp; UNDERWEAR</h3>
              <span className="category-card-link muted">SOON</span>
            </div>
          </div>

        </div>
      </section>

      {/* Announcement Bar / Ticker */}
      <div className="announcement-ticker">
        <div className="ticker-wrap">
          <div className="ticker">
            <span className="ticker-item">
              <i className="fa-solid fa-circle-dot red-dot"></i> ORDER VIA WHATSAPP FOR EXPRESS DELIVERY
            </span>
            <span className="ticker-item">
              <i className="fa-solid fa-circle-dot red-dot"></i> BUY 2 GET 1 FREE ON SELECTED POLO T-SHIRTS
            </span>
            <span className="ticker-item">
              <i className="fa-solid fa-circle-dot red-dot"></i> NEW SEASON LOUNGEWEAR LIVE
            </span>
            <span className="ticker-item">
              <i className="fa-solid fa-circle-dot red-dot"></i> PREMIUM LINEN AND SKATER CHINOS IN STOCK
            </span>

            {/* Repeat for infinite loop feel */}
            <span className="ticker-item">
              <i className="fa-solid fa-circle-dot red-dot"></i> ORDER VIA WHATSAPP FOR EXPRESS DELIVERY
            </span>
            <span className="ticker-item">
              <i className="fa-solid fa-circle-dot red-dot"></i> BUY 2 GET 1 FREE ON SELECTED POLO T-SHIRTS
            </span>
            <span className="ticker-item">
              <i className="fa-solid fa-circle-dot red-dot"></i> NEW SEASON LOUNGEWEAR LIVE
            </span>
            <span className="ticker-item">
              <i className="fa-solid fa-circle-dot red-dot"></i> PREMIUM LINEN AND SKATER CHINOS IN STOCK
            </span>
          </div>
        </div>
      </div>

      {/* Product and Category Section */}
      <section id="products-section" className="products-section section-padding">
        <div className="section-container">
          <div className="section-header center-align">
            <div className="catalogue-title-container">
              {/* Left side brand (Logo 2) */}
              <div className="catalogue-side-brand left-side">
                <img src="/logo 2.png" alt="Uniform Crown" className="side-brand-img" />
                <div className="side-brand-info">
                  <span className="side-brand-label">EST. UNIFORMS</span>
                  <span className="side-brand-desc">FORMAL & WORKWEAR</span>
                </div>
              </div>

              <div className="section-title-wrap">
                <h2 className="section-title">THE CATALOGUE</h2>
              </div>

              {/* Right side brand (Logo 3) */}
              <div className="catalogue-side-brand right-side">
                <img src="/logo 3.png" alt="Streetwear Crest" className="side-brand-img" />
                <div className="side-brand-info">
                  <span className="side-brand-label">STREETWEAR</span>
                  <span className="side-brand-desc">GRAPHICS & POLOS</span>
                </div>
              </div>
            </div>
            
            {/* Category Filter — Main categories + Sub-category pills */}
            <div className="filter-tabs-container">
              {/* ALL button */}
              <div className="filter-main-row">
                <button
                  className={`filter-tab filter-tab-main ${activeCategory === "all" ? "active" : ""}`}
                  onClick={() => {
                    setActiveCategory("all");
                  }}
                >
                  ALL
                </button>
                {CATEGORY_TREE.map((main) => (
                  <button
                    key={main.id}
                    className={`filter-tab filter-tab-main ${
                      main.subs.some((s) => s.id === activeCategory) || activeCategory === main.id ? "active" : ""
                    }`}
                    onClick={() => {
                      setActiveCategory(main.id);
                    }}
                  >
                    {main.label.toUpperCase()}
                  </button>
                ))}
              </div>

              {/* Sub-category pills — show sub pills of the active main */}
              {CATEGORY_TREE.map((main) => {
                const isMainActive =
                  main.subs.some((s) => s.id === activeCategory) || activeCategory === main.id;
                if (!isMainActive || (main.subs.length as number) === 0) return null;
                return (
                  <div key={main.id} className="filter-sub-row">
                    {main.subs.map((sub) => (
                      <button
                        key={sub.id}
                        className={`filter-tab filter-tab-sub ${activeCategory === sub.id ? "active" : ""}`}
                        onClick={() => {
                          setActiveCategory(sub.id);
                        }}
                      >
                        {sub.label.toUpperCase()}
                      </button>
                    ))}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Product Grid */}
          <div
            className="products-grid"
            id="products-grid"
            style={{
              opacity: fadeTrigger ? 1 : 0,
              transform: fadeTrigger ? "translateY(0)" : "translateY(15px)",
              transition: "opacity 0.3s ease, transform 0.3s ease",
            }}
          >
            {filteredCategories.length === 0 ? (
              <div className="grid-loader">
                <p>No categories found.</p>
              </div>
            ) : (
              filteredCategories.map((cat) => (
                <div key={cat.id} className="product-card reveal-on-scroll" style={{ cursor: 'pointer' }}>
                  <div className="product-image-wrap">
                    {/* Individual Watermark Background */}
                    <img src="/logo 3.png" alt="Watermark" className="card-watermark" />
                    
                    {/* Category Image */}
                    <img
                      src={cat.img}
                      alt={cat.label}
                      className="product-img img-default"
                      loading="lazy"
                    />
                  </div>
                  <div className="product-info-minimal">
                    <span className="product-name-link-minimal" style={{ fontSize: '1.2rem', fontWeight: 600 }}>
                      {cat.label}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* Offer Sale Window */}
      <section id="offers-section" className="offers-section">
        <div className="offers-grid-container">
          {/* Left Side Promo Banner */}
          <div className="offer-banner-left">
            <div
              className="offer-banner-bg"
              style={{ backgroundImage: `url('${offersConfig.bannerImage}')` }}
            ></div>
            <div className="offer-banner-content">
              <span className="offer-badge">LIMITED TIME</span>
              <h3 className="offer-banner-title">{offersConfig.title}</h3>
              <p className="offer-banner-text">{offersConfig.text}</p>
              <div className="offer-countdown">
                <div className="countdown-item">
                  <span className="countdown-num">{countdown.hours}</span>
                  <span className="countdown-label">HOURS</span>
                </div>
                <div className="countdown-colon">:</div>
                <div className="countdown-item">
                  <span className="countdown-num">{countdown.minutes}</span>
                  <span className="countdown-label">MINS</span>
                </div>
                <div className="countdown-colon">:</div>
                <div className="countdown-item">
                  <span className="countdown-num">{countdown.seconds}</span>
                  <span className="countdown-label">SECS</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side Offer Products list */}
          <div className="offer-list-right">
            <div className="offer-list-header">
              <h4>
                ACTIVE OFFERS <span className="badge-red">SALE</span>
              </h4>
              <p>Direct discount products currently on offer</p>
            </div>
            <div className="offer-products-container">
              {offerItems.map((item) => {
                const hasSale = item.salePrice !== undefined;
                const finalPrice = item.salePrice ?? item.price;
                const savings = item.price - finalPrice;
                const mainImg = item.images[0] ?? "";

                return (
                  <div key={item.id} className="offer-product-row">
                    <img src={mainImg} alt={item.name} className="offer-prod-img" />
                    <div className="offer-prod-details">
                      <span className="offer-prod-name">{item.name}</span>
                      <div className="offer-prod-price">
                        {hasSale ? (
                          <>
                            <span className="price-sale">${finalPrice.toFixed(2)}</span>
                            <span className="price-old">${item.price.toFixed(2)}</span>
                          </>
                        ) : (
                          <span className="price-regular">${finalPrice.toFixed(2)}</span>
                        )}
                      </div>
                      {savings > 0 && (
                        <span className="offer-prod-badge">SAVE ${savings.toFixed(2)}</span>
                      )}
                    </div>
                    <button
                      className="btn btn-secondary btn-sm"
                      onClick={() => handleOpenQuickView(item.id)}
                      style={{ padding: "10px 15px", fontSize: "11px" }}
                    >
                      VIEW
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* General Enquiry Section */}
      <section id="enquiry-section" className="enquiry-section section-padding">
        <div className="section-container">
          <div className="enquiry-grid">
            <div className="enquiry-text-col">
              <h2 className="section-title">RETAIL & WHOLESALE ENQUIRIES</h2>
              <p className="section-desc">
                We cater to both individual retail customers and wholesale commercial clients. 
                Whether you're looking for standard premium apparel, bulk wholesale pricing, custom brand manufacturing, 
                or customized corporate uniforms—get in touch with our team directly via WhatsApp.
              </p>
              <div className="brochures-actions-row">
                <a
                  href="/brochures/Untitled.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="brochure-btn"
                >
                  <i className="fa-solid fa-file-pdf"></i> COMPANY CATALOGUE
                </a>
                <a
                  href="/brochures/uniform.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="brochure-btn"
                >
                  <i className="fa-solid fa-file-pdf"></i> UNIFORMS BROCHURE
                </a>
              </div>
              
              <div style={{ marginTop: "30px", marginBottom: "30px" }}>
                <span className="section-title" style={{ fontSize: "14px", display: "block" }}>Scan to Contact</span>
                <div style={{ marginTop: "15px", width: "150px", height: "150px", overflow: "hidden", border: "1px solid var(--color-outline)", borderRadius: "4px" }}>
                  <img 
                    src="/images/qr-code.jpg" 
                    alt="QR Code" 
                    style={{ 
                      width: "100%", 
                      height: "100%", 
                      objectFit: "cover",
                      filter: "grayscale(100%) contrast(500%) brightness(1.5)",
                      mixBlendMode: "multiply"
                    }} 
                  />
                </div>
              </div>

              <div className="enquiry-features">
                <div className="feature-item">
                  <span className="feature-icon">
                    <i className="fa-solid fa-tags"></i>
                  </span>
                  <div className="feature-details">
                    <h5>Retail Sales & Styling</h5>
                    <p>Get personalized sizing recommendations, styling support, and direct individual ordering.</p>
                  </div>
                </div>
                <div className="feature-item">
                  <span className="feature-icon">
                    <i className="fa-solid fa-truck-ramp-box"></i>
                  </span>
                  <div className="feature-details">
                    <h5>Wholesale & Custom Production</h5>
                    <p>Access tiered bulk pricing, custom branding, and corporate uniform supply chains.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="enquiry-form-col">
              <div className="enquiry-box">
                <h4>SUBMIT AN ENQUIRY</h4>
                <p>Fill out the details and click to open a direct WhatsApp line</p>
                <form id="enquiry-form" onSubmit={handleEnquirySubmit}>
                  <div className="form-group">
                    <label htmlFor="enquiry-name">YOUR NAME</label>
                    <input type="text" id="enquiry-name" placeholder="John Doe" required />
                  </div>
                  <div className="form-group">
                    <label htmlFor="enquiry-interest">INTERESTED IN</label>
                    <select id="enquiry-interest">
                      <option value="Retail Purchase">Retail Purchase & Styling</option>
                      <option value="Wholesale Bulk Order">Wholesale Bulk Order</option>
                      <option value="Custom & Corporate Uniforms">Custom & Corporate Uniforms</option>
                      <option value="General Inquiry">General Business Inquiry</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label htmlFor="enquiry-message">MESSAGE</label>
                    <textarea
                      id="enquiry-message"
                      rows={4}
                      placeholder="How can we help you? Describe the item names or sizes you're interested in..."
                      required
                    ></textarea>
                  </div>
                  <button type="submit" className="btn btn-primary full-width">
                    <i className="fa-brands fa-whatsapp"></i> SEND VIA WHATSAPP
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Slide-out Shopping Cart Drawer */}
      <div
        className={`cart-drawer-overlay ${isCartOpen ? "active" : ""}`}
        onClick={() => setIsCartOpen(false)}
      ></div>
      <aside className={`cart-drawer ${isCartOpen ? "active" : ""}`}>
        <div className="cart-header">
          <span className="cart-title">YOUR BAG ({cart.reduce((sum, i) => sum + i.qty, 0)})</span>
          <button
            className="cart-close-btn"
            aria-label="Close Cart"
            onClick={() => setIsCartOpen(false)}
          >
            &times;
          </button>
        </div>

        <div className="cart-items-container" id="cart-items-container">
          {cart.length === 0 ? (
            <div className="cart-empty-state">
              <i className="fa-solid fa-bag-shopping empty-icon"></i>
              <p>Your bag is empty.</p>
              <button className="btn btn-secondary" onClick={() => setIsCartOpen(false)}>
                START SHOPPING
              </button>
            </div>
          ) : (
            cart.map((item) => {
              const finalPrice = item.product.salePrice ?? item.product.price;
              const itemTotal = finalPrice * item.qty;
              const mainImg = item.product.images[0] ?? "";

              return (
                <div key={`${item.product.id}-${item.size}`} className="cart-item">
                  <img src={mainImg} alt={item.product.name} className="cart-item-img" />
                  <div className="cart-item-details">
                    <h5 className="cart-item-name">{item.product.name}</h5>
                    <span className="cart-item-meta">
                      SIZE: {item.size} | ${finalPrice.toFixed(2)} each
                    </span>

                    <div className="cart-item-controls">
                      <div className="qty-selector">
                        <button
                          className="qty-btn qty-minus"
                          onClick={() => updateQuantity(item.product.id, item.size, -1)}
                        >
                          &minus;
                        </button>
                        <span className="qty-val">{item.qty}</span>
                        <button
                          className="qty-btn qty-plus"
                          onClick={() => updateQuantity(item.product.id, item.size, 1)}
                        >
                          &plus;
                        </button>
                      </div>
                      <button
                        className="cart-item-remove"
                        onClick={() => removeFromCart(item.product.id, item.size)}
                      >
                        REMOVE
                      </button>
                    </div>
                  </div>
                  <div className="cart-item-price">${itemTotal.toFixed(2)}</div>
                </div>
              );
            })
          )}
        </div>

        <div className="cart-footer">
          <div className="cart-summary-line">
            <span>SUBTOTAL</span>
            <span className="cart-subtotal-val">${cartSubtotal.toFixed(2)}</span>
          </div>
          <p className="cart-disclaimer">
            Tax and shipping will be calculated during WhatsApp confirmation.
          </p>
          <div className="cart-actions-row">
            <button
              className="whatsapp-checkout-btn"
              disabled={cart.length === 0}
              onClick={executeCheckout}
            >
              <i className="fa-brands fa-whatsapp"></i> CHECKOUT
            </button>
            <button
              className="clear-cart-btn"
              disabled={cart.length === 0}
              onClick={clearCart}
            >
              CLEAR BAG
            </button>
          </div>
        </div>
      </aside>

      {/* Floating WhatsApp Action Button */}
      <a
        href="https://wa.me/966500000000?text=Hello%20North%20Pacific!%20I'm%20visiting%20your%20website%20and%20have%20a%20question."
        target="_blank"
        rel="noopener noreferrer"
        className="floating-whatsapp-btn"
        id="floating-whatsapp-btn"
        aria-label="Chat on WhatsApp"
      >
        <i className="fa-brands fa-whatsapp"></i>
        <span className="floating-tooltip">Chat with us</span>
      </a>

      {/* Product Quick View Modal */}
      {quickViewProduct && (
        <div className="modal-overlay active" onClick={() => setQuickViewProduct(null)}>
          <div className="modal-container" onClick={(e) => e.stopPropagation()}>
            <button
              className="modal-close"
              aria-label="Close Modal"
              onClick={() => setQuickViewProduct(null)}
            >
              &times;
            </button>
            <div className="modal-content-grid">
              <div className="modal-images-col">
                <div className="modal-slider">
                  <img
                    src={quickViewProduct.images[activeQuickViewImageIdx]}
                    alt={quickViewProduct.name}
                  />
                </div>
                {quickViewProduct.images.length > 1 && (
                  <>
                    <div
                      style={{
                        position: "absolute",
                        bottom: "15px",
                        left: "50%",
                        transform: "translateX(-50%)",
                        background: "rgba(0,0,0,0.5)",
                        color: "#fff",
                        fontSize: "10px",
                        padding: "4px 8px",
                        fontWeight: "700",
                      }}
                    >
                      SWIPE OR CHOOSE BELOW
                    </div>
                    {/* Tiny Dots to change image */}
                    <div
                      style={{
                        position: "absolute",
                        bottom: "-25px",
                        left: "50%",
                        transform: "translateX(-50%)",
                        display: "flex",
                        gap: "8px",
                      }}
                    >
                      {quickViewProduct.images.map((_, idx) => (
                        <button
                          key={idx}
                          onClick={() => setActiveQuickViewImageIdx(idx)}
                          style={{
                            width: "8px",
                            height: "8px",
                            borderRadius: "50%",
                            background: activeQuickViewImageIdx === idx ? "#000" : "#ccc",
                            border: "none",
                            padding: 0,
                          }}
                        />
                      ))}
                    </div>
                  </>
                )}
              </div>
              <div className="modal-info-col">
                <span className="product-category" style={{ marginBottom: "10px", display: "block" }}>
                  {quickViewProduct.category}
                </span>
                <h3 className="modal-title">{quickViewProduct.name}</h3>
                <div className="product-price-row" style={{ fontSize: "20px", marginBottom: "20px" }}>
                  {quickViewProduct.salePrice !== undefined ? (
                    <>
                      <span className="price-sale">${quickViewProduct.salePrice.toFixed(2)}</span>
                      <span className="price-old">${quickViewProduct.price.toFixed(2)}</span>
                    </>
                  ) : (
                    <span className="price-regular">${quickViewProduct.price.toFixed(2)}</span>
                  )}
                </div>

                <p className="modal-desc-text">
                  {quickViewProduct.desc || "No description available for this streetwear drop."}
                </p>

                <div className="form-group">
                  <label>CHOOSE SIZE</label>
                  <div className="size-pills">
                    {quickViewProduct.sizes.map((size) => (
                      <button
                        key={size}
                        className={`size-pill ${selectedQuickViewSize === size ? "selected" : ""}`}
                        onClick={() => setSelectedQuickViewSize(size)}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  className="btn btn-primary modal-add-btn"
                  style={{ width: "100%", marginTop: "20px" }}
                  disabled={!selectedQuickViewSize}
                  onClick={() => {
                    if (selectedQuickViewSize) {
                      addToCart(quickViewProduct, selectedQuickViewSize);
                      setQuickViewProduct(null);
                    }
                  }}
                >
                  <i className="fa-solid fa-bag-shopping"></i> ADD TO BAG
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer onSelectCategory={handleCategoryClick} />
    </>
  );
}
