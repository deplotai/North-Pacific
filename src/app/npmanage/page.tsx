"use client";

import React, { useState, useEffect, useRef, FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { CATEGORY_TREE } from "@/data/cms";
import "./admin.css";

interface DBProduct {
  id: string;
  name: string;
  main_category: string;
  category: string;
  price: number;
  sale_price: number | null;
  badge: string;
  sizes: string[];
  images: string[];
  description: string;
  created_at: string;
}

interface DBOffer {
  id: string;
  enabled: boolean;
  title: string;
  text: string;
  banner_image: string;
  countdown_hours: number;
  show_countdown?: boolean;
  discount_percentage?: number | null;
  active_product_ids: string[];
  position: string;
}

export default function AdminPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"products" | "offers">("products");
  const [productsList, setProductsList] = useState<DBProduct[]>([]);
  const [offersConfig, setOffersConfig] = useState<DBOffer | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [authToken, setAuthToken] = useState<string | null>(null);

  // Modal form states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState("ADD NEW PRODUCT");
  const [formProductId, setFormProductId] = useState("");
  const [formName, setFormName] = useState("");
  const [formCategory, setFormCategory] = useState("cuban-collar-shirt");
  const [formPrice, setFormPrice] = useState("");
  const [formSalePrice, setFormSalePrice] = useState("");
  const [formBadge, setFormBadge] = useState("");
  const [formSizes, setFormSizes] = useState("");
  const [formImages, setFormImages] = useState<string[]>([]);
  const [formDesc, setFormDesc] = useState("");
  const [uploading, setUploading] = useState(false);

  // Offers form states
  const [offerEnabled, setOfferEnabled] = useState(false);
  const [offerTitle, setOfferTitle] = useState("");
  const [offerImage, setOfferImage] = useState("");
  const [offerCountdown, setOfferCountdown] = useState(12);
  const [offerShowCountdown, setOfferShowCountdown] = useState(false);
  const [offerDiscount, setOfferDiscount] = useState("");
  const [offerText, setOfferText] = useState("");
  const [offerPosition, setOfferPosition] = useState("section");
  const [selectedOfferIds, setSelectedOfferIds] = useState<string[]>([]);
  const [offerImageUploading, setOfferImageUploading] = useState(false);

  // Toast
  const [toast, setToast] = useState<{ message: string; isError: boolean; active: boolean }>({
    message: "",
    isError: false,
    active: false,
  });

  const fileInputRef = useRef<HTMLInputElement>(null);
  const offerFileInputRef = useRef<HTMLInputElement>(null);

  // ─── Auth Check ──────────────────────────────────
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        router.replace("/npmanage/login");
      } else {
        setAuthToken(session.access_token);
        loadData(session.access_token);
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) {
        router.replace("/npmanage/login");
      } else {
        setAuthToken(session.access_token);
      }
    });

    return () => subscription.unsubscribe();
  }, [router]);

  // ─── Load Data ───────────────────────────────────
  const loadData = async (token: string) => {
    setLoading(true);
    try {
      const [productsRes, offersRes] = await Promise.all([
        fetch("/api/products"),
        fetch("/api/offers"),
      ]);

      if (productsRes.ok) {
        const products = await productsRes.json();
        setProductsList(products);
      }

      if (offersRes.ok) {
        const offer = await offersRes.json();
        setOffersConfig(offer);
        populateOffersForm(offer);
      }
    } catch (err) {
      console.error("Failed to load data:", err);
      showToast("Failed to load data from server", true);
    }
    setLoading(false);
  };

  const populateOffersForm = (offer: DBOffer) => {
    setOfferEnabled(offer.enabled);
    setOfferTitle(offer.title || "");
    setOfferImage(offer.banner_image || "");
    setOfferCountdown(offer.countdown_hours || 12);
    setOfferShowCountdown(offer.show_countdown ?? false);
    setOfferDiscount(offer.discount_percentage ? offer.discount_percentage.toString() : "");
    setOfferText(offer.text || "");
    setOfferPosition(offer.position || "section");
    setSelectedOfferIds(offer.active_product_ids || []);
  };

  const showToast = (message: string, isError = false) => {
    setToast({ message, isError, active: true });
    setTimeout(() => setToast((prev) => ({ ...prev, active: false })), 3000);
  };

  // ─── Logout ──────────────────────────────────────
  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.replace("/npmanage/login");
  };

  // ─── Image Upload ────────────────────────────────
  const uploadImage = async (file: File, bucket: string): Promise<string | null> => {
    if (!authToken) return null;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("bucket", bucket);

    const res = await fetch("/api/upload", {
      method: "POST",
      headers: { Authorization: `Bearer ${authToken}` },
      body: formData,
    });

    if (!res.ok) {
      const err = await res.json();
      showToast(err.error || "Upload failed", true);
      return null;
    }

    const data = await res.json();
    return data.url;
  };

  const handleProductImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);
    for (const file of Array.from(files)) {
      const url = await uploadImage(file, "product-images");
      if (url) {
        setFormImages((prev) => [...prev, url]);
      }
    }
    setUploading(false);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleRemoveProductImage = (index: number) => {
    setFormImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleOfferImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setOfferImageUploading(true);
    const url = await uploadImage(files[0], "offer-images");
    if (url) {
      setOfferImage(url);
    }
    setOfferImageUploading(false);
    if (offerFileInputRef.current) offerFileInputRef.current.value = "";
  };

  // ─── Product CRUD ────────────────────────────────
  const handleOpenAddModal = () => {
    setFormProductId("");
    setFormName("");
    setFormCategory("cuban-collar-shirt");
    setFormPrice("");
    setFormSalePrice("");
    setFormBadge("");
    setFormSizes("S, M, L, XL");
    setFormImages([]);
    setFormDesc("");
    setModalTitle("ADD NEW PRODUCT");
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (product: DBProduct) => {
    setFormProductId(product.id);
    setFormName(product.name);
    setFormCategory(product.category);
    setFormPrice(product.price.toString());
    setFormSalePrice(product.sale_price?.toString() || "");
    setFormBadge(product.badge || "");
    setFormSizes((product.sizes || []).join(", "));
    setFormImages(product.images || []);
    setFormDesc(product.description || "");
    setModalTitle(`EDIT: ${product.name.toUpperCase()}`);
    setIsModalOpen(true);
  };

  const handleProductSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!authToken) return;

    const mainCat = CATEGORY_TREE.find((m) =>
      m.id === formCategory || m.subs.some((s) => s.id === formCategory)
    )?.id || "shirts";

    const sizesArr = formSizes.split(",").map((s) => s.trim().toUpperCase()).filter((s) => s !== "");

    const body = {
      id: formProductId || undefined,
      name: formName,
      main_category: mainCat,
      category: formCategory,
      price: parseFloat(formPrice),
      sale_price: formSalePrice ? parseFloat(formSalePrice) : null,
      badge: formBadge,
      sizes: sizesArr,
      images: formImages,
      description: formDesc,
    };

    const method = formProductId ? "PUT" : "POST";
    const res = await fetch("/api/products", {
      method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
      body: JSON.stringify(body),
    });

    if (res.ok) {
      const result = await res.json();
      if (formProductId) {
        setProductsList((prev) => prev.map((p) => (p.id === result.id ? result : p)));
        showToast("Product updated successfully!");
      } else {
        setProductsList((prev) => [...prev, result]);
        showToast("Product added successfully!");
      }
      setIsModalOpen(false);
    } else {
      const err = await res.json();
      showToast(err.error || "Failed to save product", true);
    }
  };

  const handleDeleteProduct = async (productId: string, productName: string) => {
    if (!confirm(`Delete "${productName}"? This action cannot be undone.`)) return;
    if (!authToken) return;

    const res = await fetch("/api/products", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
      body: JSON.stringify({ id: productId }),
    });

    if (res.ok) {
      setProductsList((prev) => prev.filter((p) => p.id !== productId));
      setSelectedOfferIds((prev) => prev.filter((id) => id !== productId));
      showToast("Product deleted!", true);
    } else {
      showToast("Failed to delete product", true);
    }
  };

  // ─── Offers ──────────────────────────────────────
  const handleOffersSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!authToken) return;

    const body = {
      enabled: offerEnabled,
      title: offerTitle,
      text: offerText,
      banner_image: offerImage,
      countdown_hours: offerCountdown,
      show_countdown: offerShowCountdown,
      discount_percentage: offerDiscount ? parseInt(offerDiscount) : null,
      active_product_ids: selectedOfferIds,
      position: offerPosition,
    };

    const res = await fetch("/api/offers", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
      body: JSON.stringify(body),
    });

    if (res.ok) {
      const result = await res.json();
      setOffersConfig(result);
      showToast("Offer settings saved successfully!");
    } else {
      const errData = await res.json().catch(() => ({}));
      showToast(`Failed to save: ${errData.error || res.statusText}`, true);
    }
  };

  const handleCheckboxChange = (productId: string) => {
    setSelectedOfferIds((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };

  const filteredProducts = productsList.filter(
    (p) =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase().trim()) ||
      p.category.toLowerCase().includes(searchQuery.toLowerCase().trim())
  );

  // Category options for dropdown
  const categoryOptions: { id: string; label: string }[] = [];
  CATEGORY_TREE.forEach((main) => {
    if ((main.subs.length as number) === 0) {
      categoryOptions.push({ id: main.id, label: main.label });
    } else {
      main.subs.forEach((sub) => {
        if (!categoryOptions.some((opt) => opt.id === sub.id)) {
          categoryOptions.push({ id: sub.id, label: `${main.label} — ${sub.label}` });
        }
      });
    }
  });

  if (loading) {
    return (
      <div className="admin-body" style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh" }}>
        <p style={{ fontSize: "14px", fontWeight: 700, letterSpacing: "0.1em" }}>LOADING ADMIN PANEL...</p>
      </div>
    );
  }

  return (
    <div className="admin-body">
      {/* Header */}
      <header className="admin-header">
        <div className="header-logo">
          <img src="/logo.webp" alt="North Pacific Logo" style={{ height: "40px" }} />
        </div>
        <div className="admin-header-actions">
          <Link href="/" className="back-to-store-btn">
            <i className="fa-solid fa-arrow-left"></i> STORE
          </Link>
          <button className="logout-btn" onClick={handleLogout}>
            <i className="fa-solid fa-right-from-bracket"></i> LOGOUT
          </button>
        </div>
      </header>

      {/* Main Workspace */}
      <div className="dashboard-container">
        {/* Sidebar */}
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
            <i className="fa-solid fa-tags"></i> OFFERS SECTION
          </button>
        </aside>

        {/* Dynamic Content */}
        <main className="main-panel">
          {/* ═══ PRODUCTS TAB ═══ */}
          {activeTab === "products" && (
            <section className="panel-section active">
              <div className="panel-title">
                <span>PRODUCT MANAGER</span>
                <button className="btn-admin btn-black" onClick={handleOpenAddModal}>
                  <i className="fa-solid fa-plus"></i> ADD PRODUCT
                </button>
              </div>
              <p className="panel-desc">Add, edit, and delete products. Images are automatically optimized and converted to WebP.</p>

              <div className="panel-actions">
                <div className="search-input-wrap">
                  <i className="fa-solid fa-magnifying-glass"></i>
                  <input
                    type="text"
                    className="search-input"
                    placeholder="Search products..."
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
                      <th>Price</th>
                      <th>Sale</th>
                      <th>Badge</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredProducts.length === 0 ? (
                      <tr>
                        <td colSpan={7} style={{ textAlign: "center", padding: "40px", color: "var(--color-text-muted)" }}>
                          {productsList.length === 0 ? "No products yet. Add your first product!" : "No products found."}
                        </td>
                      </tr>
                    ) : (
                      filteredProducts.map((p) => (
                        <tr key={p.id}>
                          <td>
                            <img
                              src={p.images[0] || "/logo.webp"}
                              alt={p.name}
                              className="prod-thumb"
                            />
                          </td>
                          <td><strong>{p.name}</strong></td>
                          <td>
                            <span style={{ fontWeight: 700, textTransform: "uppercase", fontSize: "11px" }}>
                              {p.category}
                            </span>
                          </td>
                          <td>${p.price.toFixed(2)}</td>
                          <td>
                            {p.sale_price ? (
                              <span style={{ color: "var(--color-red)", fontWeight: 700 }}>${p.sale_price.toFixed(2)}</span>
                            ) : "-"}
                          </td>
                          <td>
                            {p.badge ? (
                              <span className={`table-badge ${p.badge.toLowerCase() === "sale" ? "sale" : ""}`}>{p.badge}</span>
                            ) : "-"}
                          </td>
                          <td>
                            <div className="table-actions">
                              <button className="action-icon-btn" title="Edit" onClick={() => handleOpenEditModal(p)}>
                                <i className="fa-solid fa-pen"></i>
                              </button>
                              <button className="action-icon-btn delete-btn" title="Delete" onClick={() => handleDeleteProduct(p.id, p.name)}>
                                <i className="fa-solid fa-trash"></i>
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </section>
          )}

          {/* ═══ OFFERS TAB ═══ */}
          {activeTab === "offers" && (
            <section className="panel-section active">
              <div className="panel-title">
                <span>OFFER SECTION SETTINGS</span>
              </div>
              <p className="panel-desc">
                Configure the offer banner. Toggle it on/off and choose where it appears on the website.
              </p>

              <form onSubmit={handleOffersSubmit}>
                <div className="form-grid">
                  {/* Enable/Disable Toggle */}
                  <div className="form-group">
                    <div className="toggle-row">
                      <label className="toggle-switch">
                        <input
                          type="checkbox"
                          checked={offerEnabled}
                          onChange={(e) => setOfferEnabled(e.target.checked)}
                        />
                        <span className="toggle-slider"></span>
                      </label>
                      <div className="toggle-label">
                        {offerEnabled ? "OFFER SECTION ENABLED" : "OFFER SECTION DISABLED"}
                        <small>{offerEnabled ? "The offer is visible on your website" : "The offer is hidden from visitors"}</small>
                      </div>
                    </div>
                  </div>

                  {/* Position Selector */}
                  <div className="form-group">
                    <label>DISPLAY POSITION</label>
                    <div className="position-selector">
                      <div
                        className={`position-option ${offerPosition === "top_banner" ? "active" : ""}`}
                        onClick={() => setOfferPosition("top_banner")}
                      >
                        <i className="fa-solid fa-arrow-up"></i>
                        TOP BANNER
                      </div>
                      <div
                        className={`position-option ${offerPosition === "section" ? "active" : ""}`}
                        onClick={() => setOfferPosition("section")}
                      >
                        <i className="fa-solid fa-layer-group"></i>
                        OFFER SECTION
                      </div>
                      <div
                        className={`position-option ${offerPosition === "both" ? "active" : ""}`}
                        onClick={() => setOfferPosition("both")}
                      >
                        <i className="fa-solid fa-clone"></i>
                        BOTH
                      </div>
                    </div>
                  </div>

                  {/* Title */}
                  <div className="form-group">
                    <label htmlFor="offer-title">OFFER TITLE</label>
                    <input
                      type="text"
                      id="offer-title"
                      placeholder="OFFER WINDOW"
                      value={offerTitle}
                      onChange={(e) => setOfferTitle(e.target.value)}
                      required
                    />
                  </div>

                  {/* Banner Image Upload */}
                  <div className="form-group">
                    <label>BANNER IMAGE</label>
                    {offerImage && (
                      <div className="image-preview-grid">
                        <div className="image-preview-item" style={{ width: "200px", height: "120px" }}>
                          <img src={offerImage} alt="Banner preview" />
                          <button
                            type="button"
                            className="image-preview-remove"
                            onClick={() => setOfferImage("")}
                          >
                            ×
                          </button>
                        </div>
                      </div>
                    )}
                    <div
                      className="image-upload-zone"
                      onClick={() => offerFileInputRef.current?.click()}
                    >
                      <i className="fa-solid fa-cloud-arrow-up"></i>
                      <p>{offerImageUploading ? "Uploading & converting to WebP..." : "Click to upload banner image"}</p>
                      <small>Auto-converted to optimized WebP</small>
                      <input
                        type="file"
                        ref={offerFileInputRef}
                        accept="image/*"
                        onChange={handleOfferImageUpload}
                      />
                    </div>
                  </div>

                  {/* Countdown Toggle & Input */}
                  <div className="form-group" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "15px" }}>
                    <div>
                      <label style={{ display: "block", marginBottom: "8px" }}>SHOW COUNTDOWN TIMER</label>
                      <label className="toggle-switch" style={{ marginTop: "10px" }}>
                        <input
                          type="checkbox"
                          checked={offerShowCountdown}
                          onChange={(e) => setOfferShowCountdown(e.target.checked)}
                        />
                        <span className="toggle-slider"></span>
                      </label>
                    </div>
                    <div>
                      <label htmlFor="offer-countdown">COUNTDOWN TIMER (HOURS)</label>
                      <input
                        type="number"
                        id="offer-countdown"
                        min={1}
                        max={168}
                        value={offerCountdown}
                        onChange={(e) => setOfferCountdown(parseInt(e.target.value) || 12)}
                        disabled={!offerShowCountdown}
                        required
                      />
                    </div>
                  </div>

                  {/* Discount Percentage */}
                  <div className="form-group">
                    <label htmlFor="offer-discount">DISCOUNT PERCENTAGE (OPTIONAL %)</label>
                    <input
                      type="number"
                      id="offer-discount"
                      min={1}
                      max={100}
                      placeholder="e.g. 20"
                      value={offerDiscount}
                      onChange={(e) => setOfferDiscount(e.target.value)}
                    />
                  </div>

                  {/* Description */}
                  <div className="form-group">
                    <label htmlFor="offer-text">OFFER DESCRIPTION</label>
                    <textarea
                      id="offer-text"
                      rows={4}
                      placeholder="Description of the sale..."
                      value={offerText}
                      onChange={(e) => setOfferText(e.target.value)}
                      required
                    ></textarea>
                  </div>

                  {/* Product Selection */}
                  <div className="form-group">
                    <label>PRODUCTS ON OFFER</label>
                    <p style={{ fontSize: "11px", color: "var(--color-text-muted)", marginBottom: "8px" }}>
                      Select which products to feature in the offer section:
                    </p>
                    <div className="checkbox-grid">
                      {productsList.length === 0 ? (
                        <div style={{ padding: "20px", textAlign: "center", border: "1px dashed var(--color-outline)", backgroundColor: "var(--color-bg-warm)", gridColumn: "1 / -1" }}>
                          <p style={{ fontSize: "13px", color: "var(--color-black)", marginBottom: "15px", fontWeight: "bold" }}>
                            You need to add products before you can put them on offer.
                          </p>
                          <button type="button" className="btn-admin btn-black" onClick={() => { setActiveTab("products"); handleOpenAddModal(); }}>
                            <i className="fa-solid fa-plus"></i> ADD YOUR FIRST PRODUCT
                          </button>
                        </div>
                      ) : (
                        productsList.map((p) => (
                          <label key={p.id} className="checkbox-item">
                            <input
                              type="checkbox"
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
        </main>
      </div>

      {/* Product CRUD Modal */}
      {isModalOpen && (
        <div className="modal-overlay-admin" onClick={() => setIsModalOpen(false)}>
          <div className="modal-box-admin" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header-admin">
              <span className="modal-title-admin">{modalTitle}</span>
              <span className="modal-close-admin" onClick={() => setIsModalOpen(false)}>&times;</span>
            </div>
            <form onSubmit={handleProductSubmit}>
              <div className="form-grid">
                <div className="form-group">
                  <label htmlFor="prod-name">PRODUCT NAME</label>
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
                  <label htmlFor="prod-category">CATEGORY</label>
                  <select
                    id="prod-category"
                    value={formCategory}
                    onChange={(e) => setFormCategory(e.target.value)}
                    required
                  >
                    {categoryOptions.map((opt) => (
                      <option key={opt.id} value={opt.id}>{opt.label}</option>
                    ))}
                  </select>
                </div>
                <div className="form-group" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "15px" }}>
                  <div>
                    <label htmlFor="prod-price">PRICE ($)</label>
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
                    <label htmlFor="prod-saleprice">SALE PRICE ($)</label>
                    <input
                      type="number"
                      id="prod-saleprice"
                      min="0"
                      step="0.01"
                      placeholder="Optional"
                      value={formSalePrice}
                      onChange={(e) => setFormSalePrice(e.target.value)}
                    />
                  </div>
                </div>
                <div className="form-group" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "15px" }}>
                  <div>
                    <label htmlFor="prod-badge">BADGE (OPTIONAL)</label>
                    <input
                      type="text"
                      id="prod-badge"
                      placeholder="e.g. SALE, NEW"
                      value={formBadge}
                      onChange={(e) => setFormBadge(e.target.value)}
                    />
                  </div>
                  <div>
                    <label htmlFor="prod-sizes">SIZES</label>
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

                {/* Image Upload */}
                <div className="form-group">
                  <label>PRODUCT IMAGES</label>
                  {formImages.length > 0 && (
                    <div className="image-preview-grid">
                      {formImages.map((url, i) => (
                        <div key={i} className="image-preview-item">
                          <img src={url} alt={`Product ${i + 1}`} />
                          <button
                            type="button"
                            className="image-preview-remove"
                            onClick={() => handleRemoveProductImage(i)}
                          >
                            ×
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                  <div
                    className="image-upload-zone"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <i className="fa-solid fa-cloud-arrow-up"></i>
                    <p>{uploading ? "Uploading & converting to WebP..." : "Click to upload images"}</p>
                    <small>Auto-optimized & converted to WebP format</small>
                    <input
                      type="file"
                      ref={fileInputRef}
                      accept="image/*"
                      multiple
                      onChange={handleProductImageUpload}
                    />
                  </div>
                  {uploading && (
                    <div className="upload-spinner">
                      <i className="fa-solid fa-spinner fa-spin"></i> Processing image...
                    </div>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="prod-desc">DESCRIPTION</label>
                  <textarea
                    id="prod-desc"
                    rows={3}
                    placeholder="Describe the product..."
                    value={formDesc}
                    onChange={(e) => setFormDesc(e.target.value)}
                  ></textarea>
                </div>
              </div>
              <div style={{ display: "flex", justifyContent: "flex-end", gap: "15px" }}>
                <button type="button" className="btn-admin btn-outline" onClick={() => setIsModalOpen(false)}>
                  CANCEL
                </button>
                <button type="submit" className="btn-admin btn-black" disabled={uploading}>
                  {uploading ? "UPLOADING..." : "SAVE PRODUCT"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Toast */}
      <div className={`toast-notification-admin ${toast.active ? "active" : ""} ${toast.isError ? "error" : ""}`}>
        <i className={`fa-solid ${toast.isError ? "fa-circle-xmark" : "fa-circle-check"}`}></i>
        <span>{toast.message}</span>
      </div>
    </div>
  );
}
