'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Product, products, getProductsByCategory, categories } from '@/data/cms';
import { Eye, Plus } from 'lucide-react';

interface ProductGridProps {
  activeCategory: string;
  onSelectCategory: (slug: string) => void;
  onOpenProduct: (product: Product) => void;
}

export default function ProductGrid({ activeCategory, onSelectCategory, onOpenProduct }: ProductGridProps) {
  const filteredProducts = activeCategory === 'all'
    ? products
    : getProductsByCategory(activeCategory);

  return (
    <section id="products-section" className="py-24 bg-brand-bg scroll-mt-20">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Section Header & Sub-navigation Tabs */}
        <div className="flex flex-col space-y-10 mb-16 border-b border-brand-border pb-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <span className="text-[10px] font-bold tracking-[0.25em] text-brand-red uppercase">
                Catalogue
              </span>
              <span className="w-8 h-[1px] bg-brand-border"></span>
            </div>
            <h2 className="text-3xl md:text-5xl font-display font-medium text-brand-text tracking-wide uppercase">
              THE WORKBOOK
            </h2>
          </div>

          {/* Filtering tabs */}
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => onSelectCategory('all')}
              className={`text-xs font-semibold tracking-widest px-5 py-2.5 rounded-full border transition-all uppercase ${
                activeCategory === 'all'
                  ? 'border-brand-text bg-brand-text text-white shadow-sm'
                  : 'border-brand-border bg-white text-brand-text hover:bg-brand-surface'
              }`}
            >
              ALL ITEMS
            </button>
            {categories.map((cat) => (
              <button
                key={cat.slug}
                onClick={() => onSelectCategory(cat.slug)}
                className={`text-xs font-semibold tracking-widest px-5 py-2.5 rounded-full border transition-all uppercase ${
                  activeCategory === cat.slug
                    ? 'border-brand-text bg-brand-text text-white shadow-sm'
                    : 'border-brand-border bg-white text-brand-text hover:bg-brand-surface'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredProducts.map((prod: Product, index: number) => (
              <motion.div
                key={prod.id}
                layout
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="group cursor-pointer flex flex-col space-y-4 border border-brand-border p-4 bg-white rounded-sm hover:shadow-lg hover:border-brand-text/30 transition-all duration-300"
                onClick={() => onOpenProduct(prod)}
              >
                {/* Image Aspect ratio 3:4 */}
                <div className="relative aspect-[3/4] w-full bg-brand-surface overflow-hidden rounded-sm border border-brand-border">
                  <Image
                    src={prod.images[0]}
                    alt={prod.name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 30vw"
                    className="object-cover object-center group-hover:scale-[1.03] transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-brand-dark/0 group-hover:bg-brand-dark/15 transition-all duration-300" />
                  
                  {/* Floating Action Button */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="flex items-center space-x-2 bg-white/90 backdrop-blur-sm border border-brand-border px-4 py-2.5 shadow-lg rounded-sm text-xs font-bold tracking-widest text-brand-dark uppercase transform scale-90 group-hover:scale-100 transition-transform">
                      <Eye className="w-4 h-4" />
                      <span>VIEW DETAILS</span>
                    </div>
                  </div>

                  {/* Hot tag if New Drops */}
                  {prod.category === 'newdrops' && (
                    <div className="absolute top-4 left-4 bg-brand-red text-white text-[8px] font-bold tracking-[0.2em] px-2.5 py-1 rounded-sm uppercase">
                      NEW DROP
                    </div>
                  )}

                  {/* Size metadata hint */}
                  <div className="absolute bottom-4 right-4 bg-white/80 backdrop-blur-sm border border-brand-border text-[8px] font-bold text-brand-dark px-2 py-0.5 rounded-sm tracking-wider">
                    {prod.sizes.join(' / ')}
                  </div>
                </div>

                {/* Info and price */}
                <div className="flex flex-col space-y-1.5 pt-1 px-1">
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="text-xs font-bold tracking-widest text-brand-text uppercase leading-relaxed group-hover:text-brand-red transition-colors">
                      {prod.name}
                    </h3>
                    <span className="text-xs font-bold text-brand-navy tracking-wider flex-shrink-0">
                      ₹{prod.price.toLocaleString('en-IN')}
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between text-[10px] text-brand-muted uppercase font-semibold">
                    <span>{prod.category}</span>
                    <span>{prod.colors.length} colors</span>
                  </div>
                </div>

              </motion.div>
            ))}
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
