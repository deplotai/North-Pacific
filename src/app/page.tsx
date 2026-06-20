'use client';

import React, { useState } from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import FeaturedCategories from '@/components/FeaturedCategories';
import ProductGrid from '@/components/ProductGrid';
import Reels from '@/components/Reels';
import WhyNorthPacific from '@/components/WhyNorthPacific';
import WhatsAppCTA from '@/components/WhatsAppCTA';
import Footer from '@/components/Footer';
import CartSection from '@/components/CartSection';
import ProductDetailsModal from '@/components/ProductDetailsModal';
import { Product } from '@/data/cms';

export default function Home() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const handleSelectCategory = (slug: string) => {
    setActiveCategory(slug);
  };

  const handleOpenProduct = (product: Product) => {
    setSelectedProduct(product);
  };

  const handleCloseProduct = () => {
    setSelectedProduct(null);
  };

  return (
    <div className="flex flex-col min-h-screen bg-brand-bg text-brand-text">
      {/* Global Navigation Header */}
      <Header />

      {/* Main Page Content */}
      <main className="flex-grow">
        {/* 1. Hero Section */}
        <Hero />

        {/* 2. Featured Categories Section */}
        <FeaturedCategories
          activeCategory={activeCategory}
          onSelectCategory={handleSelectCategory}
        />

        {/* Product Catalog Grid (Integrated cleanly below categories) */}
        <ProductGrid
          activeCategory={activeCategory}
          onSelectCategory={handleSelectCategory}
          onOpenProduct={handleOpenProduct}
        />

        {/* 3. Video / Reel Section */}
        <Reels />

        {/* 4. Why North Pacific Section */}
        <WhyNorthPacific />

        {/* 5. WhatsApp Call-to-Action */}
        <WhatsAppCTA />

        {/* 6. Your Cart Section */}
        <CartSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Product Details Modal Overlay */}
      <ProductDetailsModal
        product={selectedProduct}
        onClose={handleCloseProduct}
      />
    </div>
  );
}
