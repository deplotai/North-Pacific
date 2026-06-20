'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { heroVariants, HeroVariant } from '@/data/cms';
import { ArrowRight, MessageSquare } from 'lucide-react';

export default function Hero() {
  const [activeTheme, setActiveTheme] = useState<'blue' | 'brown' | 'cream'>('blue');
  const currentVariant = heroVariants.find(v => v.theme === activeTheme) || heroVariants[0];

  const handleWhatsAppChat = () => {
    window.open("https://wa.me/966578078759?text=Hello%20North%20Pacific,%20I'm%20inquiring%20about%20your%20premium%20collection.", '_blank');
  };

  return (
    <section 
      className={`relative min-h-screen w-full transition-colors duration-700 ease-in-out select-none flex flex-col justify-start lg:justify-between pt-20 lg:pt-28 pb-10 overflow-hidden ${
        activeTheme === 'blue' ? 'bg-[#f8f2ec]' : activeTheme === 'brown' ? 'bg-[#c3af9e]' : 'bg-[#eaded5]'
      }`}
    >
      {/* 1. Large Model Background Image (Crossfade transition) */}
      <div className="relative lg:absolute h-[45vh] lg:h-auto lg:top-16 lg:bottom-12 left-0 right-0 z-0 flex items-center justify-center w-full mt-4 lg:mt-0">
        <div className="relative w-full h-full max-w-5xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTheme}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.7 }}
              className="absolute inset-0 w-full h-full"
            >
              <Image
                src={currentVariant.imagePath}
                alt={`North Pacific - ${currentVariant.theme} theme`}
                fill
                priority
                className="object-contain object-center scale-[1.05] lg:scale-[1.2] transition-all duration-700"
              />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* 2. Left side vertical timeline / slide indicator */}
      <div className="hidden lg:flex flex-col items-center absolute left-16 top-[32%] z-20 select-none">
        <span className={`text-[11px] font-bold tracking-wider transition-colors duration-300 ${activeTheme === 'brown' ? 'text-brand-text' : 'text-brand-red'}`}>01</span>
        <div className="w-5 h-[1.5px] bg-brand-text/30 my-1"></div>
        <span className="text-[11px] font-bold text-brand-text tracking-wider">03</span>
        <div className="w-[1.5px] h-72 bg-brand-text/20 mt-6 relative">
          <motion.div
            className={`absolute top-0 left-0 w-full ${activeTheme === 'brown' ? 'bg-brand-burgundy' : 'bg-brand-red'}`}
            initial={{ height: 0 }}
            animate={{ 
              height: activeTheme === 'blue' ? '33%' : activeTheme === 'brown' ? '66%' : '100%' 
            }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </div>

      {/* 3. Main content overlays */}
      <div className="w-full px-6 md:px-12 lg:max-w-7xl lg:mx-auto relative z-10 flex flex-col lg:flex-grow lg:flex-row lg:items-center pt-8 lg:pt-0">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 w-full items-center">
          
          {/* Left Column: Heading and description */}
          <div className="lg:col-span-7 flex flex-col space-y-6 pt-4 lg:pt-10 lg:pl-16 relative">
            
            {/* Top tiny title */}
            <div className="flex flex-col space-y-2">
              <div className="flex items-center space-x-2">
                <span className="text-[11px] font-bold tracking-[0.35em] text-brand-text uppercase leading-none">
                  CRAFTED TO MOVE
                </span>
                <span className="text-brand-red font-bold text-xs leading-none">.</span>
              </div>
            </div>

            {/* Huge Heading overlay block */}
            <div className="relative select-none">
              <h1 className="text-[4.5rem] sm:text-[7rem] md:text-[9.5rem] lg:text-[11.5rem] font-oswald font-extrabold text-brand-text tracking-tight uppercase leading-[0.75] mb-2 select-none">
                BEYOND
              </h1>
              
              {/* Overlapping cursive text */}
              <span className="absolute left-[3%] top-[45%] font-script text-[4.5rem] sm:text-[6.5rem] md:text-[9rem] lg:text-[10.5rem] text-brand-red transform -rotate-[5deg] translate-y-[-10px] select-none pointer-events-none drop-shadow-sm z-10 leading-none">
                The Trend
              </span>
            </div>

            {/* Bottom details & CTA */}
            <div className="space-y-6 pt-4 lg:pt-8">
              <div className="space-y-3">
                <div className="text-[11px] font-bold tracking-[0.25em] text-brand-text uppercase">
                  <span className="text-brand-text/50">PREMIUM </span> 
                  <span className="text-brand-red">T-SHIRTS & SHIRTS</span>
                </div>
                <div className="w-12 h-[2px] bg-brand-text/80" />
              </div>

              {/* Action buttons */}
              <div className="flex flex-wrap items-center gap-6 pt-2">
                <a
                  href="#categories"
                  className="px-6 py-4 border border-brand-text bg-transparent hover:bg-brand-text hover:text-white text-[10px] font-bold tracking-[0.2em] uppercase transition-all duration-300 flex items-center space-x-3 rounded-none shadow-sm"
                >
                  <span>EXPLORE COLLECTION</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>

                <button
                  onClick={handleWhatsAppChat}
                  className="text-[10px] font-bold tracking-[0.2em] uppercase text-brand-text hover:text-brand-red transition-all duration-200 flex items-center space-x-2 border-b border-brand-red pb-1"
                >
                  <span>CHAT ON WHATSAPP</span>
                  <MessageSquare className="w-3.5 h-3.5 fill-current" />
                </button>
              </div>
            </div>

          </div>

          {/* Right Column: Quotes block only (Circular SVG stamp removed) */}
          <div className="lg:col-span-5 h-full flex flex-col justify-between items-end relative py-6 lg:py-12">
            
            {/* Quotes block */}
            <div className="absolute right-0 bottom-[28%] z-20 flex flex-col items-start max-w-[190px] hidden md:block select-none text-left">
              <span className="text-5xl font-display font-medium text-brand-text/20 leading-none select-none">“</span>
              <p className="text-[11px] font-bold text-brand-text/80 leading-relaxed tracking-wider mt-1">
                Thoughtful designs. Made for every moment.
              </p>
              <div className="w-8 h-[1.5px] bg-brand-red mt-3"></div>
            </div>

          </div>

        </div>
      </div>

      {/* 4. Bottom Row: Theme selector cards only */}
      <div className="absolute bottom-6 right-6 md:bottom-10 md:right-12 z-20 flex items-center space-x-3">
          {heroVariants.map((t) => {
            const isActive = activeTheme === t.theme;
            return (
              <div
                key={t.id}
                onClick={() => setActiveTheme(t.theme)}
                className={`flex items-center px-1.5 py-1.5 border bg-white/90 backdrop-blur-sm rounded-sm cursor-pointer shadow-sm transition-all duration-300 ${
                  isActive 
                    ? 'border-brand-text border-2 ring-1 ring-brand-text/10 scale-105 shadow-md' 
                    : 'border-brand-border hover:border-brand-text/50 hover:bg-white'
                }`}
              >
                {/* Variant image cropped thumbnail */}
                <div className="relative w-9 h-9 md:w-11 md:h-11 overflow-hidden bg-brand-surface border border-brand-border/60 rounded-sm mr-1.5 flex-shrink-0">
                  <Image
                    src={t.imagePath}
                    alt={t.theme}
                    fill
                    sizes="44px"
                    className="object-cover object-top scale-150 translate-y-1"
                  />
                </div>
                {/* Arrow mark only */}
                <ArrowRight className={`w-3.5 h-3.5 mr-0.5 transition-transform duration-300 ${isActive ? 'text-brand-red translate-x-0.5' : 'text-brand-muted'}`} />
              </div>
            );
          })}
        </div>
    </section>
  );
}
