'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useCartStore, CartItem } from '@/store/cartStore';
import { X, Plus, Minus, Trash2, ArrowRight, ArrowLeft, ShoppingBag, ShieldCheck, MessageSquare, Truck, Tag } from 'lucide-react';

export default function CartSection() {
  const {
    items,
    removeItem,
    updateQuantity,
    getTotalPrice,
    getTotalItems,
    generateWhatsAppLink,
  } = useCartStore();

  const [mounted, setMounted] = useState(false);

  // Avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const totalPrice = getTotalPrice();
  const totalItems = getTotalItems();

  const handleCheckout = () => {
    const link = generateWhatsAppLink();
    if (link) {
      window.open(link, '_blank');
    }
  };

  const handleContinueShopping = () => {
    const elem = document.getElementById('products-section');
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section id="cart-section" className="py-24 bg-brand-bg relative overflow-hidden border-t border-brand-border/60 scroll-mt-20">
      
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Top Indicator */}
        <div className="flex items-center space-x-2 mb-12">
          <span className="text-xs font-bold text-brand-red tracking-wider">06</span>
          <span className="w-8 h-[1.5px] bg-brand-text"></span>
          <span className="text-[10px] font-bold text-brand-text tracking-[0.25em] uppercase">
            YOUR CART
          </span>
        </div>

        {/* Main Grid: Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Cart Items List */}
          <div className="lg:col-span-7 flex flex-col space-y-6">
            
            {/* Title with Overlapping Script */}
            <div className="relative select-none">
              <h2 className="text-[5.5rem] sm:text-[6.5rem] font-oswald font-extrabold text-brand-text tracking-tight uppercase leading-[0.8] mb-2">
                YOUR CART
              </h2>
              <span className="absolute left-[3%] top-[45%] font-script text-[5.5rem] sm:text-[6.5rem] text-brand-red transform -rotate-[5deg] leading-none pointer-events-none z-10">
                Almost yours.
              </span>
            </div>

            {/* Description */}
            <p className="text-xs font-bold text-brand-text/75 leading-relaxed tracking-wider max-w-md select-none pb-4">
              Review your picks. Click buy on WhatsApp and complete your order in a chat.
            </p>

            {/* Items Card Container */}
            <div className="bg-white border border-brand-border rounded-[24px] p-6 md:p-8 shadow-sm">
              {items.length === 0 ? (
                <div className="py-16 flex flex-col items-center justify-center text-center space-y-4 select-none">
                  <div className="w-14 h-14 rounded-full bg-brand-surface border border-brand-border flex items-center justify-center">
                    <ShoppingBag className="w-5 h-5 text-brand-muted" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-xs font-bold tracking-widest text-brand-text uppercase">
                      YOUR CART IS EMPTY
                    </h3>
                    <p className="text-[10px] text-brand-muted max-w-[200px] leading-relaxed">
                      Select clothing items from our collection above to fill your cart.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="divide-y divide-brand-border/60">
                  {items.map((item: CartItem) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between py-6 first:pt-0 last:pb-0 gap-4"
                    >
                      {/* Left: Thumbnail & Details */}
                      <div className="flex items-center space-x-4">
                        <div className="relative aspect-[3/4] w-16 md:w-20 bg-brand-surface border border-brand-border rounded-md overflow-hidden flex-shrink-0">
                          <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            sizes="80px"
                            className="object-cover"
                          />
                        </div>
                        <div className="space-y-1">
                          <h4 className="text-xs font-bold tracking-widest text-brand-text uppercase">
                            {item.name}
                          </h4>
                          <div className="flex flex-col text-[10px] text-brand-muted font-bold tracking-wider space-y-0.5">
                            <span>Color: {item.color}</span>
                            <span>Size: {item.size}</span>
                          </div>
                        </div>
                      </div>

                      {/* Middle/Right: Qty, Price, Remove */}
                      <div className="flex items-center space-x-6 md:space-x-8">
                        {/* Qty Selector */}
                        <div className="flex items-center border border-brand-border rounded-sm bg-brand-surface overflow-hidden">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="p-1.5 hover:bg-white text-brand-text transition-colors"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="px-3.5 text-xs font-bold text-brand-text min-w-[20px] text-center">
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
                        <span className="text-xs md:text-sm font-bold text-brand-text tracking-wider min-w-[60px] text-right">
                          ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                        </span>

                        {/* Delete Button */}
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-brand-muted hover:text-brand-red p-1 transition-colors"
                          aria-label="Remove item"
                        >
                          <X className="w-4.5 h-4.5" />
                        </button>
                      </div>

                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Back Button */}
            <button
              onClick={handleContinueShopping}
              className="w-fit flex items-center space-x-2 bg-white hover:bg-brand-surface border border-brand-border rounded-full px-6 py-3 text-[10px] font-bold tracking-[0.2em] uppercase transition-colors shadow-sm select-none"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>CONTINUE SHOPPING</span>
            </button>

          </div>

          {/* Right Column: Order Summary & Checkout Card */}
          <div className="lg:col-span-5 flex flex-col space-y-6">
            
            {/* Top Security Banner */}
            <div className="bg-[#F2EFE9] border border-brand-border p-4.5 rounded-[20px] flex items-center space-x-4 shadow-sm select-none">
              <div className="w-10 h-10 rounded-full bg-white/40 border border-brand-border/60 flex items-center justify-center flex-shrink-0">
                <ShoppingBag className="w-4.5 h-4.5 text-brand-text" />
              </div>
              <div className="space-y-0.5">
                <h4 className="text-[10px] font-extrabold tracking-widest text-brand-text uppercase leading-none">
                  Secure your style.
                </h4>
                <p className="text-[8px] text-brand-muted font-bold tracking-wide">
                  Easy ordering. Real support.
                </p>
              </div>
            </div>

            {/* Main Order Summary Card */}
            <div className="bg-[#F2EFE9]/40 border border-brand-border rounded-[24px] p-6 md:p-8 space-y-6 shadow-sm relative overflow-hidden select-none">
              {/* Background texture line */}
              <div className="absolute right-0 top-0 w-28 h-28 opacity-[0.03] pointer-events-none select-none">
                <Image
                  src="/Logo/NP NEW ROUND EMD WITH ABSTRACT LINES.png"
                  alt="emblem"
                  fill
                  className="object-contain"
                />
              </div>

              <div className="space-y-1 z-10 relative">
                <h3 className="text-xs font-bold tracking-[0.25em] text-brand-text uppercase">
                  ORDER SUMMARY
                </h3>
                <div className="w-8 h-[1.5px] bg-brand-text/30" />
              </div>

              {/* Pricing List */}
              <div className="space-y-3 pt-2 text-xs font-bold text-brand-text/70 tracking-wider">
                <div className="flex justify-between">
                  <span>Subtotal ({totalItems} Items)</span>
                  <span>₹{totalPrice.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>₹0</span>
                </div>
              </div>

              <div className="border-t border-brand-border/60 pt-4 flex justify-between items-baseline">
                <span className="text-xs font-bold tracking-widest text-brand-text uppercase">
                  Total
                </span>
                <span className="text-lg font-bold text-[#FE0000] tracking-widest">
                  ₹{totalPrice.toLocaleString('en-IN')}
                </span>
              </div>

              {/* Tag indicator */}
              <div className="bg-white/40 border border-brand-border/60 py-3 px-4 rounded-lg flex items-center space-x-2 text-[9px] font-extrabold tracking-wider text-brand-text uppercase">
                <Tag className="w-3.5 h-3.5 text-brand-text/70" />
                <span>Free shipping on <span className="text-brand-red font-black">all orders</span></span>
              </div>

              {/* WhatsApp Checkout Button */}
              <div className="pt-2 flex flex-col space-y-3 relative w-full items-center">
                <button
                  disabled={items.length === 0}
                  onClick={handleCheckout}
                  className="w-full py-4.5 bg-[#221F20] hover:bg-[#FE0000] disabled:bg-neutral-400 disabled:cursor-not-allowed text-white text-[11px] font-bold tracking-[0.25em] transition-all rounded-sm uppercase flex items-center justify-between px-6 shadow-xl active:scale-[0.98] z-10"
                >
                  <svg className="w-4.5 h-4.5 fill-current text-white" viewBox="0 0 24 24">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.457L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.42 9.864-9.864.002-2.637-1.03-5.114-2.905-6.989-1.874-1.873-4.353-2.902-6.993-2.903-5.438 0-9.863 4.422-9.867 9.867-.001 1.737.472 3.427 1.368 4.908l-.94 3.43 3.518-.922zm11.334-7.55c-.27-.135-1.597-.788-1.844-.878-.247-.09-.427-.135-.608.135-.18.27-.697.878-.853 1.058-.157.18-.315.203-.585.068-.27-.135-1.14-.42-2.172-1.34-1.03-1.026-1.545-2.05-1.748-2.32-.202-.27-.022-.417.113-.552.122-.122.27-.315.405-.473.135-.157.18-.27.27-.45.09-.18.045-.337-.022-.473-.068-.135-.608-1.464-.833-2.005-.22-.528-.46-.456-.63-.464-.162-.008-.348-.01-.535-.01-.188 0-.495.07-.754.36-.26.29-1.01 1.01-1.01 2.459 0 1.448 1.054 2.846 1.202 3.048.148.203 2.074 3.167 5.024 4.444.702.304 1.25.485 1.677.621.705.224 1.347.193 1.854.117.565-.084 1.597-.653 1.822-1.284.225-.632.225-1.173.157-1.284-.067-.113-.247-.203-.517-.337z"/>
                  </svg>
                  <span>BUY ON WHATSAPP</span>
                  <ArrowRight className="w-4 h-4 text-white" />
                </button>

                {/* Script details and curved arrow */}
                <div className="flex items-center space-x-2 select-none pt-1 z-0">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-brand-red w-6 h-6 rotate-12 transform translate-y-1">
                    <path d="M4,18 C10,18 14,14 16,10" strokeWidth="1.5" strokeLinecap="round"/>
                    <path d="M12,8 L16,10 L14,14" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span className="font-script text-2xl text-brand-red leading-none mt-2">
                    Click to send your order details on WhatsApp
                  </span>
                </div>
              </div>

            </div>

          </div>

        </div>

        {/* 4. Bottom Trust Bar */}
        <div className="mt-20 bg-[#F2EFE9] border border-brand-border p-6 md:p-8 rounded-[20px] grid grid-cols-1 md:grid-cols-5 gap-6 md:gap-4 items-center shadow-sm select-none">
          
          {/* Trust point 1 */}
          <div className="col-span-1 md:col-span-2 flex items-center space-x-4">
            <div className="w-8 h-8 rounded-full bg-white/40 border border-brand-border/60 flex items-center justify-center flex-shrink-0">
              <ShieldCheck className="w-4.5 h-4.5 text-brand-red" />
            </div>
            <div className="space-y-1">
              <h4 className="text-[10px] font-extrabold tracking-widest text-brand-text uppercase leading-none">
                SAFE & SECURE
              </h4>
              <p className="text-[9px] text-brand-muted font-bold tracking-wide">
                Your conversations are always private.
              </p>
            </div>
          </div>

          {/* Separator 1 */}
          <div className="hidden md:block col-span-1 border-r border-brand-border/60 h-10 self-center mx-auto" />

          {/* Trust point 2 */}
          <div className="col-span-1 md:col-span-1 flex items-center space-x-4">
            <div className="w-8 h-8 rounded-full bg-white/40 border border-brand-border/60 flex items-center justify-center flex-shrink-0">
              <MessageSquare className="w-4.5 h-4.5 text-brand-red" />
            </div>
            <div className="space-y-1">
              <h4 className="text-[10px] font-extrabold tracking-widest text-brand-text uppercase leading-none">
                REAL SUPPORT
              </h4>
              <p className="text-[9px] text-brand-muted font-bold tracking-wide">
                We&apos;re here to help you from start to finish.
              </p>
            </div>
          </div>

          {/* Separator 2 */}
          <div className="hidden md:block col-span-1 border-r border-brand-border/60 h-10 self-center mx-auto" />

          {/* Trust point 3 */}
          <div className="col-span-1 md:col-span-1 flex items-center space-x-4">
            <div className="w-8 h-8 rounded-full bg-white/40 border border-brand-border/60 flex items-center justify-center flex-shrink-0">
              <Truck className="w-4.5 h-4.5 text-brand-red" />
            </div>
            <div className="space-y-1">
              <h4 className="text-[10px] font-extrabold tracking-widest text-brand-text uppercase leading-none">
                EASY ORDERING
              </h4>
              <p className="text-[9px] text-brand-muted font-bold tracking-wide">
                No checkout hassle. Just WhatsApp.
              </p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
