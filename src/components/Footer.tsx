"use client";

import React, { FormEvent } from "react";
import Link from "next/link";

interface FooterProps {
  onSelectCategory?: (category: string) => void;
}

export default function Footer({ onSelectCategory }: FooterProps) {
  const handleNewsletterSubmit = (e: FormEvent) => {
    e.preventDefault();
    alert("Thank you for subscribing to North Pacific alerts!");
    const form = e.target as HTMLFormElement;
    form.reset();
  };

  const handleCategoryClick = (category: string) => {
    if (onSelectCategory) {
      onSelectCategory(category);
    }
    const element = document.querySelector("#products-section");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleScrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, hash: string) => {
    e.preventDefault();
    const element = document.querySelector(hash);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="main-footer">
      <div className="footer-top section-padding">
        <div className="section-container footer-grid">
          <div className="footer-col col-brand">
            <div className="footer-logo-container">
              <img src="/logo.webp" alt="North Pacific Logo" className="footer-logo-img" style={{ transform: "scale(1.15)", transformOrigin: "left center" }} />
            </div>
            <p className="footer-desc">
              Premium streetwear brand combining minimalist design with structured silhouettes. Experience luxury clothing without boundaries.
            </p>
            <div className="footer-socials">
              <a href="#" aria-label="Instagram"><i className="fa-brands fa-instagram"></i></a>
              <a href="#" aria-label="WhatsApp"><i className="fa-brands fa-whatsapp"></i></a>
              <a href="#" aria-label="TikTok"><i className="fa-brands fa-tiktok"></i></a>
              <a href="#" aria-label="Pinterest"><i className="fa-brands fa-pinterest"></i></a>
            </div>

            <div className="footer-emblems-row" style={{ marginTop: "20px" }}>
              <span className="footer-emblems-title">Scan to Contact</span>
              <div style={{ marginTop: "10px", width: "150px", height: "150px", overflow: "hidden" }}>
                <img 
                  src="/images/qr-code.webp" 
                  alt="QR Code" 
                  style={{ 
                    width: "100%", 
                    height: "100%", 
                    objectFit: "cover",
                    filter: "grayscale(100%) contrast(500%) brightness(1.5) invert(100%)",
                    mixBlendMode: "screen"
                  }} 
                />
              </div>
            </div>
          </div>

          <div className="footer-col">
            <h5 className="footer-col-title">COLLECTIONS</h5>
            <ul className="footer-links">
              <li>
                <a
                  href="#products-section"
                  onClick={(e) => {
                    e.preventDefault();
                    handleCategoryClick("linen shirt");
                  }}
                >
                  Linen Shirts
                </a>
              </li>
              <li>
                <a
                  href="#products-section"
                  onClick={(e) => {
                    e.preventDefault();
                    handleCategoryClick("pant");
                  }}
                >
                  Streetwear Pants
                </a>
              </li>
              <li>
                <a
                  href="#products-section"
                  onClick={(e) => {
                    e.preventDefault();
                    handleCategoryClick("polo tshirt");
                  }}
                >
                  Knit & Waffle Polos
                </a>
              </li>
              <li>
                <a
                  href="#products-section"
                  onClick={(e) => {
                    e.preventDefault();
                    handleCategoryClick("print tshirt");
                  }}
                >
                  Graphic Tees
                </a>
              </li>
              <li>
                <a
                  href="#products-section"
                  onClick={(e) => {
                    e.preventDefault();
                    handleCategoryClick("printed shirt");
                  }}
                >
                  Printed Shirts
                </a>
              </li>
              <li>
                <a
                  href="#products-section"
                  onClick={(e) => {
                    e.preventDefault();
                    handleCategoryClick("striped shirt");
                  }}
                >
                  Striped Shirts
                </a>
              </li>
            </ul>
          </div>

          <div className="footer-col">
            <h5 className="footer-col-title">CUSTOMER SERVICES</h5>
            <ul className="footer-links">
              <li>
                <a href="#enquiry-section" onClick={(e) => handleScrollToSection(e, "#enquiry-section")}>
                  Sizing Guides
                </a>
              </li>
              <li>
                <a href="#enquiry-section" onClick={(e) => handleScrollToSection(e, "#enquiry-section")}>
                  How to Order via WhatsApp
                </a>
              </li>
              <li>
                <a href="#enquiry-section" onClick={(e) => handleScrollToSection(e, "#enquiry-section")}>
                  Shipping & Delivery
                </a>
              </li>
              <li>
                <a href="#enquiry-section" onClick={(e) => handleScrollToSection(e, "#enquiry-section")}>
                  Returns & Exchanges
                </a>
              </li>
              <li>
                <a href="#enquiry-section" onClick={(e) => handleScrollToSection(e, "#enquiry-section")}>
                  General Enquiry Form
                </a>
              </li>
              <li>
                <a href="/brochures/Untitled_compressed.pdf" target="_blank" rel="noopener noreferrer">
                  Streetwear Catalogue (PDF)
                </a>
              </li>
              <li>
                <a href="/brochures/uniform_compressed.pdf" target="_blank" rel="noopener noreferrer">
                  Corporate Uniforms (PDF)
                </a>
              </li>
            </ul>
          </div>

          <div className="footer-col col-newsletter">
            <h5 className="footer-col-title">STAY CONNECTED</h5>
            <p>Subscribe to receive early drops notification and special discount windows.</p>
            <form className="newsletter-form" id="newsletter-form" onSubmit={handleNewsletterSubmit}>
              <input type="email" placeholder="Enter your email" required aria-label="Email address" />
              <button type="submit" aria-label="Subscribe"><i className="fa-solid fa-arrow-right"></i></button>
            </form>
            <div className="payment-icons">
              <i className="fa-brands fa-cc-visa"></i>
              <i className="fa-brands fa-cc-mastercard"></i>
              <i className="fa-brands fa-cc-apple-pay"></i>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="section-container footer-bottom-inner">
          <p>&copy; 2026 NORTH PACIFIC Apparel. All Rights Reserved.</p>
          <div className="footer-legal">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
