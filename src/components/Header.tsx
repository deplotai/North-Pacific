"use client";

import React, { useEffect, useState } from "react";
import { useCart } from "@/context/CartContext";
import { CATEGORY_TREE } from "@/data/cms";

interface HeaderProps {
  onSelectCategory?: (category: string) => void;
}

export default function Header({ onSelectCategory }: HeaderProps) {
  const {
    cart,
    setIsCartOpen,
    isSidebarOpen,
    setIsSidebarOpen,
  } = useCart();

  const [isScrolled, setIsScrolled] = useState(false);
  const [expandedMain, setExpandedMain] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const totalCount = cart.reduce((total, item) => total + item.qty, 0);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, hash: string) => {
    e.preventDefault();
    const element = document.querySelector(hash);
    if (element) element.scrollIntoView({ behavior: "smooth" });
  };

  const handleCategoryClick = (category: string) => {
    setIsSidebarOpen(false);
    setExpandedMain(null);
    if (onSelectCategory) onSelectCategory(category);
    const element = document.querySelector("#products-section");
    if (element) element.scrollIntoView({ behavior: "smooth" });
  };

  const toggleMain = (id: string) => {
    setExpandedMain((prev) => (prev === id ? null : id));
  };

  return (
    <>
      <header className={`main-header ${isScrolled ? "scrolled" : ""}`}>
        <div className="header-left">
          <button
            className="nav-toggle"
            aria-label="Open Menu"
            onClick={() => setIsSidebarOpen(true)}
          >
            <span className="bar"></span>
            <span className="bar"></span>
          </button>
          <nav className="desktop-nav">
            <a
              href="#offers-section"
              className="nav-link"
              onClick={(e) => handleNavClick(e, "#offers-section")}
            >
              Offers
            </a>
            <a
              href="#reels-section"
              className="nav-link"
              onClick={(e) => handleNavClick(e, "#reels-section")}
            >
              NP Reels
            </a>
            <div className="nav-dropdown-container">
              <button className="nav-link nav-dropdown-trigger" aria-haspopup="true" aria-expanded="false">
                Brochures
              </button>
              <div className="nav-dropdown-menu">
                <a
                  href="/brochures/Untitled.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="dropdown-item"
                >
                  Streetwear Catalogue
                </a>
                <a
                  href="/brochures/uniform.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="dropdown-item"
                >
                  Corporate Uniforms
                </a>
              </div>
            </div>
          </nav>
        </div>

        <div className="header-center">
          <a
            href="#"
            className="logo-link"
            onClick={(e) => handleNavClick(e, "#hero-section")}
          >
            <div className="brand-logo">
              <img 
                src="/logo.png" 
                alt="North Pacific Logo" 
                className="header-logo-img" 
              />
            </div>
          </a>
        </div>

        <div className="header-right">
          <a
            href="#enquiry-section"
            className="nav-link desktop-only"
            onClick={(e) => handleNavClick(e, "#enquiry-section")}
            style={{ marginRight: "20px" }}
          >
            Enquiry
          </a>
          <button
            className="cart-toggle-btn"
            aria-label="View Cart"
            onClick={() => setIsCartOpen(true)}
          >
            <span className="cart-icon-wrapper">
              <i className="fa-solid fa-bag-shopping"></i>
              {totalCount > 0 && <span className="cart-count">{totalCount}</span>}
            </span>
          </button>
        </div>
      </header>

      {/* Slide-out Sidebar */}
      <div
        className={`mobile-sidebar-overlay ${isSidebarOpen ? "active" : ""}`}
        onClick={() => setIsSidebarOpen(false)}
      ></div>
      <aside className={`mobile-sidebar ${isSidebarOpen ? "active" : ""}`}>
        <div className="sidebar-header" style={{ justifyContent: "flex-end" }}>
          <button
            className="sidebar-close"
            aria-label="Close Menu"
            onClick={() => setIsSidebarOpen(false)}
          >
            &times;
          </button>
        </div>

        <nav className="sidebar-nav">
          {/* Shop All */}
          <a
            href="#products-section"
            className="sidebar-link sidebar-shop-all"
            onClick={(e) => {
              e.preventDefault();
              handleCategoryClick("all");
            }}
          >
            SHOP ALL
          </a>

          <div className="sidebar-divider" />

          {/* Grouped Category Accordion */}
          {CATEGORY_TREE.map((main) => (
            <div key={main.id} className="sidebar-category-group">
              <button
                className={`sidebar-main-cat ${expandedMain === main.id ? "open" : ""}`}
                onClick={() => {
                  if ((main.subs.length as number) === 0) {
                    handleCategoryClick(main.id);
                  } else {
                    toggleMain(main.id);
                  }
                }}
              >
                <span className="sidebar-cat-label">
                  {main.label.toUpperCase()}
                </span>
                {(main.subs.length as number) > 0 && (
                  <i className={`fa-solid fa-chevron-down sidebar-chevron ${expandedMain === main.id ? "rotated" : ""}`}></i>
                )}
              </button>

              {main.subs.length > 0 && expandedMain === main.id && (
                <div className="sidebar-sub-list">
                  <a
                    href="#products-section"
                    className="sidebar-sub-link"
                    style={{ fontWeight: "800", color: "var(--color-black)" }}
                    onClick={(e) => {
                      e.preventDefault();
                      handleCategoryClick(main.id);
                    }}
                  >
                    <span className="sub-dot">·</span> VIEW ALL {main.label.toUpperCase()}
                  </a>
                  {main.subs.map((sub) => (
                    <a
                      key={sub.id}
                      href="#products-section"
                      className="sidebar-sub-link"
                      onClick={(e) => {
                        e.preventDefault();
                        handleCategoryClick(sub.id);
                      }}
                    >
                      <span className="sub-dot">·</span> {sub.label}
                    </a>
                  ))}
                </div>
              )}
            </div>
          ))}

          <div className="sidebar-divider" />

          {/* Brochures Group Accordion */}
          <div className="sidebar-category-group">
            <button
              className={`sidebar-main-cat ${expandedMain === "brochures" ? "open" : ""}`}
              onClick={() => toggleMain("brochures")}
            >
              <span className="sidebar-cat-label">
                COMPANY BROCHURES
              </span>
              <i className={`fa-solid fa-chevron-down sidebar-chevron ${expandedMain === "brochures" ? "rotated" : ""}`}></i>
            </button>
            {expandedMain === "brochures" && (
              <div className="sidebar-sub-list">
                <a
                  href="/brochures/Untitled.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="sidebar-sub-link"
                  onClick={() => setIsSidebarOpen(false)}
                >
                  <span className="sub-dot">·</span> STREETWEAR CATALOGUE
                </a>
                <a
                  href="/brochures/uniform.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="sidebar-sub-link"
                  onClick={() => setIsSidebarOpen(false)}
                >
                  <span className="sub-dot">·</span> CORPORATE UNIFORMS
                </a>
              </div>
            )}
          </div>

          <div className="sidebar-divider" />

          <a
            href="#offers-section"
            className="sidebar-link"
            onClick={(e) => {
              e.preventDefault();
              setIsSidebarOpen(false);
              document.querySelector("#offers-section")?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            ACTIVE OFFERS
          </a>
          <a
            href="#reels-section"
            className="sidebar-link"
            onClick={(e) => {
              e.preventDefault();
              setIsSidebarOpen(false);
              document.querySelector("#reels-section")?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            INSTAGRAM REELS
          </a>
          <a
            href="#enquiry-section"
            className="sidebar-link"
            onClick={(e) => {
              e.preventDefault();
              setIsSidebarOpen(false);
              document.querySelector("#enquiry-section")?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            GENERAL ENQUIRY
          </a>
        </nav>

        <div className="sidebar-footer">
          <p>ORDER VIA WHATSAPP</p>
          <div className="social-icons">
            <a href="#"><i className="fa-brands fa-instagram"></i></a>
            <a href="#"><i className="fa-brands fa-whatsapp"></i></a>
            <a href="#"><i className="fa-brands fa-tiktok"></i></a>
          </div>
        </div>
      </aside>
    </>
  );
}
