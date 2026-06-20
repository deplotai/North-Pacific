'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useCartStore, CartItem } from '@/store/cartStore';
import { X, Plus, Minus, Trash2, MessageSquare, ShoppingBag } from 'lucide-react';

export default function CartDrawer() {
  const {
    items,
    isOpen,
    setIsOpen,
    removeItem,
    updateQuantity,
    getTotalPrice,
    getTotalItems,
    generateWhatsAppLink,
  } = useCartStore();

  const [customerName, setCustomerName] = useState('');
  const [orderNotes, setOrderNotes] = useState('');
  const [mounted, setMounted] = useState(false);

  // Sync to client to avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const totalPrice = getTotalPrice();
  const totalItems = getTotalItems();

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    const link = generateWhatsAppLink(customerName, orderNotes);
    if (link) {
      window.open(link, '_blank');
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop Blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm"
          />

          {/* Cart Drawer Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 220 }}
            className="fixed right-0 top-0 bottom-0 z-50 w-full max-w-md bg-brand-bg border-l border-brand-border shadow-2xl flex flex-col justify-between"
          >
            {/* Drawer Header */}
            <div className="p-6 border-b border-brand-border flex items-center justify-between bg-white">
              <div className="flex items-center space-x-3">
                <ShoppingBag className="w-5 h-5 text-brand-text" />
                <h2 className="text-sm font-bold tracking-widest text-brand-text uppercase">
                  YOUR BAG
                </h2>
                <span className="text-[10px] font-bold bg-brand-surface text-brand-text px-2 py-0.5 border border-brand-border rounded-full uppercase">
                  {totalItems} ITEMS
                </span>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 hover:text-brand-red hover:scale-105 transition-all text-brand-text border border-brand-border bg-white rounded-full shadow-sm"
                aria-label="Close cart"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Scrollable Items Container */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center space-y-4 text-center select-none py-20">
                  <div className="w-16 h-16 rounded-full bg-brand-surface border border-brand-border flex items-center justify-center">
                    <ShoppingBag className="w-6 h-6 text-brand-muted" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-xs font-bold tracking-widest text-brand-text uppercase">
                      YOUR BAG IS EMPTY
                    </h3>
                    <p className="text-[11px] text-brand-muted max-w-[200px] leading-relaxed">
                      Add T-shirts, shirts, and custom clothing from our collections.
                    </p>
                  </div>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="mt-2 px-5 py-2.5 bg-brand-dark text-white text-[10px] font-bold tracking-widest rounded-sm uppercase hover:bg-brand-navy transition-colors"
                  >
                    CONTINUE BROWSING
                  </button>
                </div>
              ) : (
                items.map((item: CartItem) => (
                  <div
                    key={item.id}
                    className="flex space-x-4 border border-brand-border p-3 bg-white rounded-sm relative group hover:shadow-md transition-shadow"
                  >
                    {/* Item Thumbnail */}
                    <div className="relative aspect-[3/4] w-20 flex-shrink-0 bg-brand-surface border border-brand-border rounded-sm overflow-hidden">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        sizes="80px"
                        className="object-cover"
                      />
                    </div>

                    {/* Item details */}
                    <div className="flex-1 flex flex-col justify-between py-0.5">
                      <div className="space-y-1">
                        <div className="flex justify-between items-start">
                          <h4 className="text-xs font-bold tracking-wider text-brand-text uppercase max-w-[190px] truncate">
                            {item.name}
                          </h4>
                          <button
                            onClick={() => removeItem(item.id)}
                            className="text-brand-muted hover:text-brand-red p-1 transition-colors"
                            aria-label="Remove item"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <div className="flex items-center space-x-2 text-[10px] text-brand-muted tracking-widest uppercase font-semibold">
                          <span>SIZE: {item.size}</span>
                          <span>•</span>
                          <span>COLOR: {item.color}</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-2">
                        {/* Quantity Selector */}
                        <div className="flex items-center border border-brand-border rounded-sm bg-brand-surface overflow-hidden">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="p-1.5 hover:bg-white text-brand-text transition-colors"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="px-3 text-xs font-semibold text-brand-text min-w-[24px] text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="p-1.5 hover:bg-white text-brand-text transition-colors"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        {/* Price */}
                        <span className="text-xs font-bold text-brand-navy tracking-wider">
                          ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Drawer Footer & Checkout form */}
            {items.length > 0 && (
              <div className="p-6 border-t border-brand-border bg-white space-y-6">
                
                {/* User Info & Order Notes Form */}
                <form onSubmit={handleCheckout} className="space-y-4">
                  <div className="space-y-1.5">
                    <label
                      htmlFor="customer-name"
                      className="text-[9px] font-bold tracking-widest text-brand-muted uppercase block"
                    >
                      YOUR NAME (OPTIONAL)
                    </label>
                    <input
                      type="text"
                      id="customer-name"
                      placeholder="Enter your name"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      className="w-full text-xs border border-brand-border px-3 py-2.5 rounded-sm focus:outline-none focus:border-brand-navy bg-brand-bg transition-colors"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label
                      htmlFor="order-notes"
                      className="text-[9px] font-bold tracking-widest text-brand-muted uppercase block"
                    >
                      ADDITIONAL NOTES / SIZING INQUIRIES
                    </label>
                    <textarea
                      id="order-notes"
                      rows={2}
                      placeholder="E.g., custom dimensions, fabric requests, bulk inquire..."
                      value={orderNotes}
                      onChange={(e) => setOrderNotes(e.target.value)}
                      className="w-full text-xs border border-brand-border px-3 py-2.5 rounded-sm focus:outline-none focus:border-brand-navy bg-brand-bg resize-none transition-colors"
                    />
                  </div>

                  {/* Summary */}
                  <div className="border-t border-b border-brand-border/60 py-4 flex flex-col space-y-2">
                    <div className="flex justify-between text-xs tracking-wider text-brand-muted uppercase">
                      <span>ESTIMATED SHIPPING</span>
                      <span className="text-[10px] font-bold text-brand-navy">FREE</span>
                    </div>
                    <div className="flex justify-between items-baseline pt-1">
                      <span className="text-xs font-bold tracking-widest text-brand-text uppercase">
                        SUBTOTAL
                      </span>
                      <span className="text-lg font-bold text-brand-navy tracking-widest">
                        ₹{totalPrice.toLocaleString('en-IN')}
                      </span>
                    </div>
                  </div>

                  {/* Checkout Button */}
                  <button
                    type="submit"
                    className="w-full py-4 bg-[#072049] hover:bg-[#FE0000] text-white text-xs font-bold tracking-widest rounded-sm transition-all uppercase flex items-center justify-center space-x-2.5 shadow-lg active:scale-[0.98]"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>CHECKOUT VIA WHATSAPP</span>
                  </button>
                </form>

                <p className="text-[9px] text-center text-brand-muted tracking-wide leading-relaxed">
                  Upon clicking checkout, a prefilled chat message detailing your selections will be created. Dispatch timelines and sizing details will be verified by a coordinator.
                </p>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
