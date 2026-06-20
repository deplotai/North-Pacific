'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { categories, Category } from '@/data/cms';
import { ArrowRight } from 'lucide-react';

interface FeaturedCategoriesProps {
  onSelectCategory: (slug: string) => void;
  activeCategory: string;
}

export default function FeaturedCategories({ onSelectCategory, activeCategory }: FeaturedCategoriesProps) {
  return (
    <section id="categories" className="py-24 bg-brand-bg relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* 1. Header Section */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-16 space-y-8 lg:space-y-0">
          
          {/* Left Block: Number Indicator & Title */}
          <div className="flex flex-col space-y-4">
            <div className="flex items-center space-x-2">
              <span className="text-xs font-bold text-brand-red tracking-wider">02</span>
              <span className="w-8 h-[1.5px] bg-brand-text"></span>
              <span className="text-[10px] font-bold text-brand-text tracking-[0.25em] uppercase">
                FEATURED CATEGORIES
              </span>
            </div>
            
            <div className="relative select-none pt-2">
              <h2 className="text-[5.5rem] sm:text-[7rem] font-oswald font-extrabold text-brand-text tracking-tight uppercase leading-[0.8]">
                EXPLORE
              </h2>
              <span className="absolute left-[3%] top-[40%] font-script text-[6rem] sm:text-[7rem] text-brand-red transform -rotate-[5deg] leading-none pointer-events-none z-10">
                Collections
              </span>
            </div>
          </div>

          {/* Right Block: Vertical indicator text & link */}
          <div className="flex flex-col items-start border-l border-brand-text/20 pl-6 space-y-4 max-w-xs">
            <p className="text-xs font-bold text-brand-text/80 leading-relaxed tracking-wider">
              Timeless pieces, crafted for every moment of your journey.
            </p>
            <a
              href="#products-section"
              className="text-[10px] font-bold tracking-[0.2em] uppercase text-brand-text hover:text-brand-red transition-all flex items-center space-x-2 border-b border-brand-red pb-1"
            >
              <span>VIEW ALL COLLECTIONS</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>

        </div>

        {/* 2. Category Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map((cat: Category, index: number) => {
            const isActive = activeCategory === cat.slug;
            return (
              <div
                key={cat.slug}
                onClick={() => {
                  onSelectCategory(cat.slug);
                  const elem = document.getElementById('products-section');
                  if (elem) {
                    elem.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }
                }}
                className="group cursor-pointer flex flex-col space-y-4"
              >
                {/* Rounded portrait card wrapper */}
                <div 
                  className={`relative aspect-[3/4] w-full overflow-hidden bg-brand-surface rounded-[24px] border transition-all duration-500 hover:shadow-2xl ${
                    isActive ? 'border-brand-text ring-1 ring-brand-text/10' : 'border-brand-border'
                  }`}
                >
                  <Image
                    src={cat.imagePath}
                    alt={cat.name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  
                  {/* Subtle dark overlay on hover */}
                  <div className="absolute inset-0 bg-brand-dark/0 group-hover:bg-brand-dark/10 transition-colors duration-300" />
                  
                  {/* Centered bottom white circular arrow button */}
                  <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:bg-brand-red group-hover:text-white transition-all duration-300">
                    <ArrowRight className="w-4 h-4 text-brand-dark group-hover:text-white" />
                  </div>
                </div>

                {/* Typography label below the card */}
                <div className="flex items-center space-x-2.5 px-3 py-1 text-xs">
                  <span className="font-bold text-brand-red tracking-wider">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <span className="w-5 h-[1px] bg-brand-text/30"></span>
                  <span className="font-bold text-brand-text tracking-[0.2em] uppercase group-hover:text-brand-red transition-colors">
                    {cat.name}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
