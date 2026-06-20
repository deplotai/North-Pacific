'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ShoppingBag, Search, User, Menu, X } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { setIsOpen: openCart, getTotalItems } = useCartStore();
  const [cartCount, setCartCount] = useState(0);

  const totalItems = getTotalItems();
  useEffect(() => {
    setCartCount(totalItems);
  }, [totalItems]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'COLLECTIONS', href: '#categories' },
    { name: 'REELS', href: '#campaigns' },
    { name: 'WHY US', href: '#why-north-pacific' },
    { name: 'CONNECT', href: '#whatsapp-cta' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-brand-bg/95 backdrop-blur-md border-b border-brand-border/60 py-4 shadow-sm'
            : 'bg-transparent py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between relative">
          
          {/* Left: Nav Links */}
          <nav className="flex items-center space-x-8 text-[11px] font-bold tracking-[0.2em] text-brand-text">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="hover:text-brand-red transition-colors duration-200"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Center: Brand Logo */}
          <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center">
            <Link href="/" className="relative block h-8 w-40 md:h-10 md:w-52 transition-transform hover:scale-[1.02]">
              <Image
                src="/logo_in_black_cropped.png"
                alt="North Pacific Logo"
                fill
                className="object-contain"
                priority
              />
            </Link>
          </div>

          {/* Right: Actions */}
          <div className="flex items-center space-x-6 text-brand-text">
            {/* Search */}
            <button className="hover:text-brand-red transition-colors p-1.5 hidden sm:block" aria-label="Search">
              <Search className="w-4 h-4" />
            </button>

            {/* Profile */}
            <button className="hover:text-brand-red transition-colors p-1.5 hidden sm:block" aria-label="Profile">
              <User className="w-4 h-4" />
            </button>

            {/* Cart Icon with Red Badge */}
            <button
              onClick={() => {
                const elem = document.getElementById('cart-section');
                if (elem) {
                  elem.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
              }}
              className="relative p-1.5 hover:text-brand-red transition-colors flex items-center justify-center"
              aria-label="Open cart"
              id="cart-drawer-trigger"
            >
              <ShoppingBag className="w-4.5 h-4.5" />
              {cartCount > 0 ? (
                <span className="absolute -top-1 -right-1 bg-brand-red text-white text-[8px] font-bold h-4 w-4 rounded-full flex items-center justify-center border border-brand-bg">
                  {cartCount}
                </span>
              ) : (
                <span className="absolute -top-1 -right-1 bg-brand-red text-white text-[8px] font-bold h-4 w-4 rounded-full flex items-center justify-center border border-brand-bg">
                  0
                </span>
              )}
            </button>

            {/* Hamburger menu */}
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="hover:text-brand-red transition-colors p-1.5"
              aria-label="Menu"
            >
              <Menu className="w-4.5 h-4.5" />
            </button>
          </div>

        </div>
      </header>

      {/* Mobile Drawer (Matches brand layout) */}
      <div
        className={`fixed inset-0 z-50 bg-black/40 transition-opacity duration-300 ${
          isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsMobileMenuOpen(false)}
      >
        <div
          className={`absolute left-0 top-0 bottom-0 w-[80%] max-w-xs bg-brand-bg p-8 border-r border-brand-border flex flex-col justify-between transition-transform duration-300 ease-out ${
            isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <div>
            <div className="flex items-center justify-between mb-12">
              <div className="relative h-8 w-40">
                <Image
                  src="/logo_in_black_cropped.png"
                  alt="North Pacific Logo"
                  fill
                  className="object-contain"
                />
              </div>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-1 hover:text-brand-red transition-colors"
                aria-label="Close menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <nav className="flex flex-col space-y-6 text-sm font-semibold tracking-widest text-brand-text">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="py-2 border-b border-brand-border/40 hover:text-brand-red transition-colors"
                >
                  {link.name}
                </a>
              ))}
            </nav>
          </div>

          <div className="border-t border-brand-border pt-6 flex flex-col space-y-4">
            <p className="text-[10px] text-brand-muted tracking-widest uppercase">
              BEYOND THE TREND
            </p>
            <a
              href="https://wa.me/966578078759"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-semibold text-brand-navy hover:text-brand-red transition-colors"
            >
              Direct Chat: +966 57 807 8759
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
