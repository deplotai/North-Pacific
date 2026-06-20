'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-brand-dark text-white border-t border-white/10 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
        {/* Brand info */}
        <div className="md:col-span-2 flex flex-col space-y-6">
          <div className="relative h-12 w-60 filter invert">
            <Image
              src="/logo_in_black_cropped.png"
              alt="North Pacific Logo"
              fill
              className="object-contain"
            />
          </div>
          <p className="text-brand-muted text-xs leading-relaxed max-w-sm tracking-wide">
            North Pacific is a premium clothing manufacturer delivering heavy-weight streetwear and classic casual garments. Engineered for longevity, designed beyond trends.
          </p>
          <div className="flex space-x-6 text-xs text-brand-muted tracking-widest font-semibold pt-4">
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-brand-red transition-colors">
              INSTAGRAM
            </a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-brand-red transition-colors">
              FACEBOOK
            </a>
            <a href="https://wa.me/966578078759" target="_blank" rel="noopener noreferrer" className="hover:text-brand-red transition-colors">
              WHATSAPP
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div className="flex flex-col space-y-6">
          <h4 className="text-xs font-bold tracking-widest uppercase text-white/50">
            COLLECTIONS
          </h4>
          <ul className="space-y-3 text-xs tracking-wider text-brand-muted">
            <li>
              <a href="#tshirts" className="hover:text-white transition-colors">
                T-Shirts & Basics
              </a>
            </li>
            <li>
              <a href="#shirts" className="hover:text-white transition-colors">
                Casual Shirts
              </a>
            </li>
            <li>
              <a href="#sweatshirts" className="hover:text-white transition-colors">
                French Terry Hoodies
              </a>
            </li>
            <li>
              <a href="#newdrops" className="hover:text-white transition-colors">
                Limited New Drops
              </a>
            </li>
          </ul>
        </div>

        {/* Contact/Stamp */}
        <div className="flex flex-col space-y-6 justify-between">
          <div>
            <h4 className="text-xs font-bold tracking-widest uppercase text-white/50 mb-4">
              HEADQUARTERS
            </h4>
            <address className="not-italic text-xs leading-relaxed text-brand-muted tracking-wide space-y-2">
              <p>North Pacific Apparel Studio</p>
              <p>Sector-5, Industrial Area</p>
              <p>New Delhi, India</p>
              <p className="pt-2 text-white font-medium">contact@northpacific.cc</p>
            </address>
          </div>
        </div>
      </div>

      {/* Footer bottom */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-[10px] text-brand-muted tracking-widest uppercase">
        <p>© {currentYear} NORTH PACIFIC. ALL RIGHTS RESERVED.</p>
        <p className="mt-4 md:mt-0 flex space-x-6">
          <a href="#" className="hover:text-white transition-colors">PRIVACY POLICY</a>
          <span className="text-white/10">•</span>
          <a href="#" className="hover:text-white transition-colors">TERMS OF SERVICE</a>
        </p>
      </div>
    </footer>
  );
}
