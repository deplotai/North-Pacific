"use client";

import React, { useState, useEffect, FormEvent } from "react";
import Link from "next/link";
import { products as initialProducts, offers as initialOffers, Product, OfferConfig, CATEGORY_TREE } from "@/data/cms";
import "./admin.css";

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<"products" | "offers">("products");
  const [productsList, setProductsList] = useState<Product[]>([]);
  const [offersConfig, setOffersConfig] = useState<OfferConfig>({
    bannerImage: "",
    title: "",
    text: "",
    countdownHours: 12,
    activeProductIds: [],
  });
  const [searchQuery, setSearchQuery] = useState("");

  // Modal form states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState("ADD NEW PRODUCT");
  const [formProductId, setFormProductId] = useState("");
  const [formName, setFormName] = useState("");
  const [formCategory, setFormCategory] = useState("linen shirt");
  const [formPrice, setFormPrice] = useState("");
  const [formSalePrice, setFormSalePrice] = useState("");
  const [formBadge, setFormBadge] = useState("");
  const [formSizes, setFormSizes] = useState("");
  const [formImage1, setFormImage1] = useState("");
  const [formImage2, setFormImage2] = useState("");
  const [formDesc, setFormDesc] = useState("");

  // Offers form states
  const [offerTitle, setOfferTitle] = useState("");
  const [offerImage, setOfferImage] = useState("");
  const [offerCountdown, setOfferCountdown] = useState(12);
  const [offerText, setOfferText] = useState("");
  const [selectedOfferIds, setSelectedOfferIds] = useState<string[]>([]);

  // Toast status
  const [toast, setToast] = useState<{ message: string; isError: boolean; active: boolean }>({
    message: "",
    isError: false,
    active: false,
  });

  // Load config on mount
  useEffect(() => {
    const cachedConfig = localStorage.getItem("np_site_config");
    if (cachedConfig) {
      try {
        const parsed = JSON.parse(cachedConfig);
        setProductsList(parsed.products || initialProducts);
        const offersData = parsed.offers || initialOffers;
        setOffersConfig(offersData);
        populateOffersForm(offersData);
      } catch (e) {
        console.error("Failed to parse cached config, falling back to defaults", e);
        setProductsList(initialProducts);
        setOffersConfig(initialOffers);
        populateOffersForm(initialOffers);
      }
    } else {
      setProductsList(initialProducts);
      setOffersConfig(initialOffers);
      populateOffersForm(initialOffers);
    }
  }, []);

  const populateOffersForm = (offersData: OfferConfig) => {
    setOfferTitle(offersData.title || "");
    setOfferImage(offersData.bannerImage || "");
    setOfferCountdown(offersData.countdownHours || 12);
    setOfferText(offersData.text || "");
    setSelectedOfferIds(offersData.activeProductIds || []);
  };

  const showToast = (message: string, isError = false) => {
    setToast({ message, isError, active: true });
    setTimeout(() => {
      setToast((prev) => ({ ...prev, active: false }));
    }, 3000);
  };

  const saveConfig = (updatedProducts: Product[], updatedOffers: OfferConfig) => {
    const fullConfig = {
      offers: updatedOffers,
      products: updatedProducts,
    };
    localStorage.setItem("np_site_config", JSON.stringify(fullConfig));
  };

  // CRUD Product Actions
  const handleOpenAddModal = () => {
    setFormProductId("");
    setFormName("");
    setFormCategory("linen shirt");
    setFormPrice("");
    setFormSalePrice("");
    setFormBadge("");
    setFormSizes("S, M, L, XL");
    setFormImage1("");
    setFormImage2("");
    setFormDesc("");

    setModalTitle("ADD NEW PRODUCT");
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (product: Product) => {
    setFormProductId(product.id);
    setFormName(product.name);
    setFormCategory(product.category);
    setFormPrice(product.price.toString());
    setFormSalePrice(product.salePrice?.toString() || "");
    setFormBadge(product.badge || "");
    setFormSizes((product.sizes || []).join(", "));
    setFormImage1(product.images[0] || "");
    setFormImage2(product.images[1] || "");
    setFormDesc(product.desc || "");

    setModalTitle(`EDIT PRODUCT: ${product.name.toUpperCase()}`);
    setIsModalOpen(true);
  };

  const handleProductCrudSubmit = (e: FormEvent) => {
    e.preventDefault();

    const priceNum = parseFloat(formPrice);
    const salePriceNum = formSalePrice !== "" ? parseFloat(formSalePrice) : undefined;
    const sizesArr = formSizes
      .split(",")
      .map((s) => s.trim().toUpperCase())
      .filter((s) => s !== "");

    const images = [formImage1];
    if (formImage2 !== "") images.push(formImage2);

    let updatedList = [...productsList];
    const mainCat = CATEGORY_TREE.find((m) =>
      m.id === formCategory || m.subs.some((s) => s.id === formCategory)
    )?.id || "shirts";

    if (formProductId) {
      // Edit mode
      const idx = updatedList.findIndex((p) => p.id === formProductId);
      if (idx > -1) {
        updatedList[idx] = {
          id: formProductId,
          name: formName,
          mainCategory: mainCat,
          category: formCategory,
          price: priceNum,
          salePrice: salePriceNum,
          badge: formBadge,
          sizes: sizesArr,
          images,
          desc: formDesc,
        };
        showToast("Product updated successfully!");
      }
    } else {
      // Add mode: Generate ID
      const prefix = formCategory.replace(/\s+/g, "-").toLowerCase();
      const newId = `${prefix}-${Date.now().toString().slice(-6)}`;
      const newProduct: Product = {
        id: newId,
        name: formName,
        mainCategory: mainCat,
        category: formCategory,
        price: priceNum,
        salePrice: salePriceNum,
        badge: formBadge,
        sizes: sizesArr,
        images,
        desc: formDesc,
      };
      updatedList.push(newProduct);
      showToast("Product added successfully!");
    }

    setProductsList(updatedList);
    saveConfig(updatedList, offersConfig);
    setIsModalOpen(false);
  };

  const handleDeleteProduct = (productId: string, productName: string) => {
    if (confirm(`Are you sure you want to delete "${productName}"?`)) {
      const updatedList = productsList.filter((p) => p.id !== productId);
      setProductsList(updatedList);

      // Clean up offer active product list if deleted
      const updatedOffers = {
        ...offersConfig,
        activeProductIds: (offersConfig.activeProductIds || []).filter((id) => id !== productId),
      };
      setOffersConfig(updatedOffers);
      setSelectedOfferIds(updatedOffers.activeProductIds);

      saveConfig(updatedList, updatedOffers);
      showToast("Product deleted successfully!", true);
    }
  };

  // Offers settings save
  const handleOffersSubmit = (e: FormEvent) => {
    e.preventDefault();

    const updatedOffers: OfferConfig = {
      title: offerTitle,
      bannerImage: offerImage,
      countdownHours: offerCountdown,
      text: offerText,
      activeProductIds: selectedOfferIds,
    };

    setOffersConfig(updatedOffers);
    // Clear countdown end time in session so storefront picks up new hours
    sessionStorage.removeItem("np_offer_end");

    saveConfig(productsList, updatedOffers);
    showToast("Offers & Banner settings saved successfully!");
  };

  const handleCheckboxChange = (productId: string) => {
    setSelectedOfferIds((prev) => {
      if (prev.includes(productId)) {
        return prev.filter((id) => id !== productId);
      } else {
        return [...prev, productId];
      }
    });
  };

  // Config Exporters & Reset
  const handleSaveLocal = () => {
    saveConfig(productsList, offersConfig);
    showToast("Configuration saved locally in browser memory.");
  };

  const handleDownloadConfig = () => {
    saveConfig(productsList, offersConfig);
    const fullConfig = {
      offers: offersConfig,
      products: productsList,
    };

    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(fullConfig, null, 2));
    const downloadAnchor = document.createElement("a");
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", "config.json");
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();

    showToast("config.json exported successfully! Push this to your server.");
  };

  const handleResetDefaults = () => {
    if (
      confirm(
        "Warning: This will overwrite all your current modifications and restore the factory default products and offers configuration. Proceed?"
      )
    ) {
      localStorage.removeItem("np_site_config");
      sessionStorage.removeItem("np_offer_end");

      setProductsList(initialProducts);
      setOffersConfig(initialOffers);
      populateOffersForm(initialOffers);

      showToast("Database reset to defaults!");
    }
  };

  const filteredProducts = productsList.filter(
    (p) =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase().trim()) ||
      p.category.toLowerCase().includes(searchQuery.toLowerCase().trim())
  );

  return (
    <div className="admin-body">
      {/* Header */}
      <header className="admin-header">
        <div className="header-logo">
          <span className="logo-title">NORTH PACIFIC</span>
          <span className="logo-subtitle">ADMIN SYSTEM</span>
        </div>
        <Link href="/" className="back-to-store-btn">
          <i className="fa-solid fa-arrow-left"></i> BACK TO STORE
        </Link>
      </header>

      {/* Main Workspace */}
      <div className="dashboard-container">
        {/* Tabs Menu Left Side */}
        <aside className="sidebar-menu">
          <button
            className={`menu-tab ${activeTab === "products" ? "active" : ""}`}
            onClick={() => setActiveTab("products")}
          >
            <i className="fa-solid fa-shirt"></i> PRODUCT MANAGER
          </button>
          <button
            className={`menu-tab ${activeTab === "offers" ? "active" : ""}`}
            onClick={() => setActiveTab("offers")}
          >
            <i className="fa-solid fa-tags"></i> OFFERS WINDOW
          </button>
        </aside>

        {/* Dynamic Content Right Side */}
        <main className="main-panel">
          {/* SECTION 1: Product Manager */}
          {activeTab === "products" && (
            <section className="panel-section active">
              <div className="panel-title">
                <span>PRODUCT MANAGER</span>
                <button className="btn-admin btn-black" onClick={handleOpenAddModal}>
                  <i className="fa-solid fa-plus"></i> ADD NEW PRODUCT
                </button>
              </div>
              <p className="panel-desc">Add, edit, and delete products in the catalog database.</p>

              <div className="panel-actions">
                <div className="search-input-wrap">
                  <i className="fa-solid fa-magnifying-glass"></i>
                  <input
                    type="text"
                    className="search-input"
                    placeholder="Search products by name or category..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>

              <div className="products-table-container">
                <table className="products-table">
                  <thead>
                    <tr>
                      <th>Image</th>
                      <th>Name</th>
                      <th>Category</th>
                      <th>Base Price</th>
                      <th>Sale Price</th>
                      <th>Badge</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredProducts.length === 0 ? (
                      <tr>
                        <td colSpan={7} style={{ textAlign: "center", padding: "40px", color: "var(--color-text-muted)" }}>
                          No products found.
                        </td>
                      </tr>
                    ) : (
                      filteredProducts.map((p) => {
                        const hasSale = p.salePrice !== undefined;
                        const mainImg = p.images[0] || "";

                        return (
                          <tr key={p.id}>
                            <td>
                              <img src={mainImg} alt={p.name} className="prod-thumb" />
                            </td>
                            <td>
                              <strong>{p.name}</strong>
                              <br />
                              <small style={{ color: "var(--color-text-muted)" }}>ID: {p.id}</small>
                            </td>
                            <td>
                              <span style={{ fontWeight: 700, textTransform: "uppercase", fontSize: "11px" }}>
                                {p.category}
                              </span>
                            </td>
                            <td>${p.price.toFixed(2)}</td>
                            <td>
                              {hasSale ? (
                                <span style={{ color: "var(--color-red)", fontWeight: 700 }}>
                                  ${p.salePrice?.toFixed(2)}
                                </span>
                              ) : (
                                "-"
                              )}
                            </td>
                            <td>
                              {p.badge ? (
                                <span className={`table-badge ${p.badge.toLowerCase() === "sale" ? "sale" : ""}`}>
                                  {p.badge}
                                </span>
                              ) : (
                                "-"
                              )}
                            </td>
                            <td>
                              <div className="table-actions">
                                <button
                                  className="action-icon-btn edit-product-btn"
                                  title="Edit Product"
                                  onClick={() => handleOpenEditModal(p)}
                                >
                                  <i className="fa-solid fa-pen"></i>
                                </button>
                                <button
                                  className="action-icon-btn delete-btn"
                                  title="Delete Product"
                                  onClick={() => handleDeleteProduct(p.id, p.name)}
                                >
                                  <i className="fa-solid fa-trash"></i>
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>
            </section>
          )}

          {/* SECTION 2: Offers Window */}
          {activeTab === "offers" && (
            <section className="panel-section active">
              <div className="panel-title">
                <span>OFFERS & BANNER SETTINGS</span>
              </div>
              <p className="panel-desc">
                Configure the text, countdown hours, and active products shown in the dynamic Offers section.
              </p>

              <form onSubmit={handleOffersSubmit}>
                <div className="form-grid">
                  <div className="form-group">
                    <label htmlFor="offer-title">Banner Header / Title</label>
                    <input
                      type="text"
                      id="offer-title"
                      placeholder="OFFER WINDOW"
                      value={offerTitle}
                      onChange={(e) => setOfferTitle(e.target.value)}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="offer-image">Banner Background Image URL</label>
                    <input
                      type="text"
                      id="offer-image"
                      placeholder="e.g., /pose/ChatGPT Image..."
                      value={offerImage}
                      onChange={(e) => setOfferImage(e.target.value)}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="offer-countdown">Countdown Timer (Hours)</label>
                    <input
                      type="number"
                      id="offer-countdown"
                      min={1}
                      max={168}
                      placeholder="12"
                      value={offerCountdown}
                      onChange={(e) => setOfferCountdown(parseInt(e.target.value) || 12)}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="offer-text">Banner Caption / Description</label>
                    <textarea
                      id="offer-text"
                      rows={4}
                      placeholder="Description of the sale..."
                      value={offerText}
                      onChange={(e) => setOfferText(e.target.value)}
                      required
                    ></textarea>
                  </div>
                  <div className="form-group">
                    <label>Designate Products on Offer</label>
                    <p style={{ fontSize: "11px", color: "var(--color-text-muted)", marginBottom: "8px" }}>
                      Select which products should appear in the Offers list (right column of index page):
                    </p>
                    <div className="checkbox-grid">
                      {productsList.length === 0 ? (
                        <p style={{ padding: "10px", fontSize: "12px", color: "var(--color-text-muted)" }}>
                          Please add products first to select them here.
                        </p>
                      ) : (
                        productsList.map((p) => (
                          <label key={p.id} className="checkbox-item">
                            <input
                              type="checkbox"
                              name="activeOffers"
                              value={p.id}
                              checked={selectedOfferIds.includes(p.id)}
                              onChange={() => handleCheckboxChange(p.id)}
                            />
                            <span>
                              {p.name} <small style={{ color: "var(--color-text-muted)" }}>({p.category})</small>
                            </span>
                          </label>
                        ))
                      )}
                    </div>
                  </div>
                </div>
                <button type="submit" className="btn-admin btn-black">
                  <i className="fa-solid fa-floppy-disk"></i> SAVE OFFER SETTINGS
                </button>
              </form>
            </section>
          )}

          {/* Publish Exporter Card */}
          <div className="publish-box">
            <h4>PUBLISH YOUR DATABASE LIVE</h4>
            <p>
              All changes you make are saved locally to your browser's memory immediately. To push these updates live
              to all customers visiting the website, click **"Download config.json"** and upload the downloaded file
              to your server root, or replace `config.json` inside your git repository.
            </p>
            <div className="publish-actions">
              <button className="btn-admin btn-white" onClick={handleSaveLocal}>
                <i className="fa-solid fa-floppy-disk"></i> SAVE LOCALLY
              </button>
              <button className="btn-admin btn-red" onClick={handleDownloadConfig}>
                <i className="fa-solid fa-download"></i> DOWNLOAD CONFIG.JSON
              </button>
              <button
                className="btn-admin btn-outline"
                onClick={handleResetDefaults}
                style={{ borderColor: "rgba(255,255,255,0.4)", color: "white" }}
              >
                <i className="fa-solid fa-rotate-left"></i> RESET TO FACTORY DEFAULTS
              </button>
            </div>
          </div>
        </main>
      </div>

      {/* Product CRUD Modal Form */}
      {isModalOpen && (
        <div className="modal-overlay-admin" onClick={() => setIsModalOpen(false)}>
          <div className="modal-box-admin" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header-admin">
              <span className="modal-title-admin">{modalTitle}</span>
              <span className="modal-close-admin" onClick={() => setIsModalOpen(false)}>
                &times;
              </span>
            </div>
            <form onSubmit={handleProductCrudSubmit}>
              <div className="form-grid">
                <div className="form-group">
                  <label htmlFor="prod-name">Product Name</label>
                  <input
                    type="text"
                    id="prod-name"
                    placeholder="e.g. Pacific Heavy Knit Polo"
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="prod-category">Category</label>
                  <select
                    id="prod-category"
                    value={formCategory}
                    onChange={(e) => setFormCategory(e.target.value)}
                    required
                  >
                    {(() => {
                      const categoryOptions: { id: string; label: string }[] = [];
                      CATEGORY_TREE.forEach((main) => {
                        if (main.subs.length === 0) {
                          categoryOptions.push({ id: main.id, label: main.label });
                        } else {
                          main.subs.forEach((sub) => {
                            if (!categoryOptions.some((opt) => opt.id === sub.id)) {
                              categoryOptions.push({ id: sub.id, label: `${main.label} — ${sub.label}` });
                            }
                          });
                        }
                      });
                      return categoryOptions.map((opt) => (
                        <option key={opt.id} value={opt.id}>
                          {opt.label}
                        </option>
                      ));
                    })()}
                  </select>
                </div>
                <div className="form-group" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "15px" }}>
                  <div>
                    <label htmlFor="prod-price">Price ($)</label>
                    <input
                      type="number"
                      id="prod-price"
                      min="0"
                      step="0.01"
                      placeholder="45.00"
                      value={formPrice}
                      onChange={(e) => setFormPrice(e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="prod-saleprice">Sale Price ($) (Optional)</label>
                    <input
                      type="number"
                      id="prod-saleprice"
                      min="0"
                      step="0.01"
                      placeholder="35.00"
                      value={formSalePrice}
                      onChange={(e) => setFormSalePrice(e.target.value)}
                    />
                  </div>
                </div>
                <div className="form-group" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "15px" }}>
                  <div>
                    <label htmlFor="prod-badge">Product Badge / Tag (Optional)</label>
                    <input
                      type="text"
                      id="prod-badge"
                      placeholder="e.g. SALE, NEW, PREMIUM"
                      value={formBadge}
                      onChange={(e) => setFormBadge(e.target.value)}
                    />
                  </div>
                  <div>
                    <label htmlFor="prod-sizes">Sizes (Comma-separated)</label>
                    <input
                      type="text"
                      id="prod-sizes"
                      placeholder="S, M, L, XL"
                      value={formSizes}
                      onChange={(e) => setFormSizes(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="prod-image1">Primary Image Path/URL</label>
                  <input
                    type="text"
                    id="prod-image1"
                    placeholder="e.g., /images/polo tshirt/WhatsApp Image..."
                    value={formImage1}
                    onChange={(e) => setFormImage1(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="prod-image2">Secondary Hover Image Path/URL (Optional)</label>
                  <input
                    type="text"
                    id="prod-image2"
                    placeholder="e.g., /images/polo tshirt/WhatsApp Image..."
                    value={formImage2}
                    onChange={(e) => setFormImage2(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="prod-desc">Product Description</label>
                  <textarea
                    id="prod-desc"
                    rows={3}
                    placeholder="Describe the materials, silhouette, fit specifications..."
                    value={formDesc}
                    onChange={(e) => setFormDesc(e.target.value)}
                  ></textarea>
                </div>
              </div>
              <div style={{ display: "flex", justifyContent: "flex-end", gap: "15px" }}>
                <button type="button" className="btn-admin btn-outline" onClick={() => setIsModalOpen(false)}>
                  CANCEL
                </button>
                <button type="submit" className="btn-admin btn-black">
                  SAVE PRODUCT
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Notification Toast */}
      <div className={`toast-notification-admin ${toast.active ? "active" : ""} ${toast.isError ? "error" : ""}`}>
        <i className={`fa-solid ${toast.isError ? "fa-circle-xmark" : "fa-circle-check"}`}></i>
        <span>{toast.message}</span>
      </div>
    </div>
  );
}
