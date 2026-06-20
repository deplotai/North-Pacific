'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Product } from '@/data/cms';
import { useCartStore } from '@/store/cartStore';
import { X, Check, ShoppingBag, Info } from 'lucide-react';

interface ProductDetailsModalProps {
  product: Product | null;
  onClose: () => void;
}

export default function ProductDetailsModal({ product, onClose }: ProductDetailsModalProps) {
  const { addItem } = useCartStore();
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [isAdded, setIsAdded] = useState(false);

  // Sync state when product changes
  useEffect(() => {
    if (product) {
      setSelectedImage(0);
      setSelectedSize(product.sizes[0] || 'M');
      setSelectedColor(product.colors[0] || 'Default');
      setIsAdded(false);
    }
  }, [product]);

  if (!product) return null;

  const handleAddToCart = () => {
    addItem({
      productId: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0],
      size: selectedSize,
      color: selectedColor,
      quantity: 1,
    });
    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
    }, 2000);
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 md:p-6"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 20 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-4xl bg-brand-bg border border-brand-border shadow-2xl rounded-sm overflow-hidden flex flex-col md:flex-row h-[90vh] md:h-auto md:max-h-[85vh]"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 p-1.5 bg-white/95 backdrop-blur-sm border border-brand-border rounded-full hover:text-brand-red hover:scale-105 transition-all text-brand-text shadow-sm"
            aria-label="Close modal"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Left Column: Image Section */}
          <div className="w-full md:w-1/2 flex flex-col md:flex-row gap-4 p-6 bg-white border-r border-brand-border h-[40%] md:h-auto overflow-hidden">
            {/* Gallery Thumbnails List (Desktop left) */}
            <div className="flex md:flex-col gap-2 order-2 md:order-1 overflow-x-auto md:overflow-x-visible pb-2 md:pb-0 scrollbar-none">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={`relative aspect-[3/4] w-12 md:w-16 border rounded-sm overflow-hidden flex-shrink-0 transition-colors ${
                    selectedImage === idx ? 'border-brand-text ring-1 ring-brand-text/10' : 'border-brand-border hover:border-brand-muted'
                  }`}
                >
                  <Image
                    src={img}
                    alt={`${product.name} thumbnail ${idx + 1}`}
                    fill
                    sizes="64px"
                    className="object-cover"
                  />
                </button>
              ))}
            </div>

            {/* Large Preview */}
            <div className="relative flex-1 aspect-[3/4] bg-brand-surface border border-brand-border rounded-sm overflow-hidden order-1 md:order-2">
              <Image
                src={product.images[selectedImage]}
                alt={product.name}
                fill
                sizes="(max-width: 768px) 100vw, 400px"
                className="object-cover object-center"
                priority
              />
            </div>
          </div>

          {/* Right Column: details section */}
          <div className="w-full md:w-1/2 p-8 flex flex-col justify-between overflow-y-auto h-[60%] md:h-auto">
            
            {/* Details Top */}
            <div className="space-y-6">
              
              {/* Category tag */}
              <div className="flex items-center space-x-2">
                <span className="text-[9px] font-bold tracking-[0.25em] text-brand-red uppercase">
                  {product.category}
                </span>
                <span className="w-6 h-[1px] bg-brand-border"></span>
                <span className="text-[9px] font-mono font-medium text-brand-muted uppercase">
                  ID: {product.id}
                </span>
              </div>

              {/* Title & Price */}
              <div className="space-y-2">
                <h3 className="text-xl md:text-2xl font-display font-medium text-brand-text tracking-wide uppercase leading-tight">
                  {product.name}
                </h3>
                <p className="text-lg font-bold text-brand-navy tracking-wider">
                  ₹{product.price.toLocaleString('en-IN')}
                </p>
              </div>

              {/* Description */}
              <p className="text-xs text-brand-text/80 leading-relaxed font-light tracking-wide">
                {product.description}
              </p>

              {/* Color Select */}
              <div className="space-y-2.5">
                <span className="text-[9px] font-bold tracking-widest text-brand-muted uppercase block">
                  Color: {selectedColor}
                </span>
                <div className="flex flex-wrap gap-2.5">
                  {product.colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`text-[10px] font-semibold tracking-wider px-3.5 py-1.5 border rounded-full transition-colors uppercase ${
                        selectedColor === color
                          ? 'border-brand-text bg-brand-text text-white shadow-sm'
                          : 'border-brand-border bg-white text-brand-text hover:bg-brand-surface'
                      }`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>

              {/* Size Select */}
              <div className="space-y-2.5">
                <span className="text-[9px] font-bold tracking-widest text-brand-muted uppercase block">
                  Select Size
                </span>
                <div className="flex gap-2.5">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`h-9 w-9 text-xs font-bold border flex items-center justify-center transition-colors rounded-sm ${
                        selectedSize === size
                          ? 'border-brand-text bg-brand-text text-white shadow-sm'
                          : 'border-brand-border bg-white text-brand-text hover:bg-brand-surface'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Product Specifications list */}
              <div className="border-t border-brand-border pt-5 space-y-2.5">
                <div className="flex items-center space-x-1.5 text-[9px] font-bold tracking-widest text-brand-muted uppercase">
                  <Info className="w-3.5 h-3.5 text-brand-muted" />
                  <span>Garment Specifications</span>
                </div>
                <ul className="space-y-1.5 pl-5 list-disc text-[11px] text-brand-muted leading-relaxed font-light tracking-wide">
                  {product.details.map((detail, index) => (
                    <li key={index}>{detail}</li>
                  ))}
                </ul>
              </div>

            </div>

            {/* CTA Buy Button (Sticky-like at bottom right) */}
            <div className="pt-8 mt-6 border-t border-brand-border flex gap-4">
              <button
                onClick={handleAddToCart}
                className={`flex-1 py-4 text-xs font-bold tracking-widest uppercase transition-all rounded-sm flex items-center justify-center space-x-2.5 active:scale-[0.98] shadow-lg ${
                  isAdded
                    ? 'bg-brand-red text-white'
                    : 'bg-brand-dark hover:bg-brand-navy text-white'
                }`}
              >
                {isAdded ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>ADDED TO BAG</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4" />
                    <span>ADD TO BAG</span>
                  </>
                )}
              </button>
            </div>

          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
