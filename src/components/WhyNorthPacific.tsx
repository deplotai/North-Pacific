'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export default function WhyNorthPacific() {
  return (
    <section id="why-north-pacific" className="py-24 bg-brand-bg relative overflow-hidden">
      
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Top Section Indicator */}
        <div className="flex items-center space-x-2 mb-12">
          <span className="text-xs font-bold text-brand-red tracking-wider">04</span>
          <span className="w-8 h-[1.5px] bg-brand-text"></span>
          <span className="text-[10px] font-bold text-brand-text tracking-[0.25em] uppercase">
            WHY NORTH PACIFIC
          </span>
        </div>

        {/* Main Grid: Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Copy & Details */}
          <div className="lg:col-span-6 flex flex-col space-y-8">
            
            {/* Redesigned Heading */}
            <div className="relative select-none">
              <h2 className="text-[5.5rem] sm:text-[6.5rem] font-oswald font-extrabold text-brand-text tracking-tight uppercase leading-[0.8] mb-2">
                BUILT <br/> DIFFERENT.
              </h2>
              <span className="absolute left-[3%] top-[45%] font-script text-[5.5rem] sm:text-[6.5rem] text-brand-red transform -rotate-[5deg] leading-none pointer-events-none z-10">
                Made for You.
              </span>
            </div>

            {/* Description Text */}
            <div className="space-y-4 text-xs font-bold text-brand-text/75 leading-relaxed tracking-wider max-w-lg select-none">
              <p>
                At North Pacific, we don&apos;t just make clothing — <br/>
                we craft pieces that move with you, represent you, and last longer.
              </p>
              <p>Every detail. Every stitch. Every time.</p>
              <div className="w-8 h-[2px] bg-brand-text mt-4" />
            </div>

            {/* 3-Column Feature List */}
            <div className="grid grid-cols-3 gap-4 pt-8 border-t border-brand-border/60">
              
              {/* Col 1 */}
              <div className="flex flex-col items-center text-center space-y-3 px-2">
                <span className="text-xl font-display font-medium text-brand-red leading-none">*</span>
                <h3 className="text-[10px] font-extrabold tracking-widest text-brand-text uppercase leading-none">
                  PREMIUM QUALITY
                </h3>
                <p className="text-[9px] text-brand-muted font-bold tracking-wide leading-relaxed">
                  Carefully selected fabrics that feel great and last long.
                </p>
              </div>

              {/* Separator */}
              <div className="border-r border-brand-border/60 h-24 self-center mx-auto" />

              {/* Col 2 */}
              <div className="flex flex-col items-center text-center space-y-3 px-2">
                <span className="text-xl font-display font-medium text-brand-red leading-none">*</span>
                <h3 className="text-[10px] font-extrabold tracking-widest text-brand-text uppercase leading-none">
                  THOUGHTFUL DESIGNS
                </h3>
                <p className="text-[9px] text-brand-muted font-bold tracking-wide leading-relaxed">
                  Timeless designs made to fit your everyday style.
                </p>
              </div>

              {/* Separator */}
              <div className="border-r border-brand-border/60 h-24 self-center mx-auto" />

              {/* Col 3 */}
              <div className="flex flex-col items-center text-center space-y-3 px-2">
                <span className="text-xl font-display font-medium text-brand-red leading-none">*</span>
                <h3 className="text-[10px] font-extrabold tracking-widest text-brand-text uppercase leading-none">
                  CRAFTED WITH CARE
                </h3>
                <p className="text-[9px] text-brand-muted font-bold tracking-wide leading-relaxed">
                  Precision stitching and attention to every detail.
                </p>
              </div>

            </div>

            {/* CTA Link */}
            <div className="pt-6">
              <a
                href="#products-section"
                className="text-[10px] font-bold tracking-[0.2em] uppercase text-brand-text hover:text-brand-red transition-all flex items-center space-x-2 border-b border-brand-red pb-1 w-fit"
              >
                <span>LEARN MORE ABOUT US</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>

          </div>

          {/* Right Column: Large Model Image + Stack of 3 detail squares */}
          <div className="lg:col-span-6 grid grid-cols-12 gap-6 items-stretch">
            
            {/* Center large portrait card */}
            <div className="col-span-8 relative aspect-[4/5] lg:aspect-[3/4] bg-brand-surface rounded-[24px] overflow-hidden border border-brand-border shadow-lg">
              <Image
                src="/Product section cover images/cover-reel1.png"
                alt="North Pacific Brown Floral Shirt Back Design"
                fill
                sizes="(max-width: 1024px) 60vw, 30vw"
                className="object-cover object-center"
              />
            </div>

            {/* Right stack of 3 detail squares */}
            <div className="col-span-4 flex flex-col justify-between space-y-4">
              
              {/* Square 1: Quality Fabrics */}
              <div className="relative aspect-square w-full rounded-[20px] overflow-hidden border border-brand-border shadow-sm group">
                <Image
                  src="/product Images/IMG-20260618-WA0073.jpg"
                  alt="Quality Fabrics close-up"
                  fill
                  sizes="150px"
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-brand-dark/40" />
                <div className="absolute inset-x-3 bottom-3 text-left space-y-0.5 z-10">
                  <span className="text-xs font-bold text-brand-red leading-none select-none">*</span>
                  <h4 className="text-[8px] font-bold tracking-wider text-white uppercase leading-none">
                    QUALITY FABRICS
                  </h4>
                  <p className="text-[7px] text-white/70 font-semibold tracking-wide leading-tight">
                    Soft, breathable and made to last.
                  </p>
                </div>
              </div>

              {/* Square 2: Craftsmanship */}
              <div className="relative aspect-square w-full rounded-[20px] overflow-hidden border border-brand-border shadow-sm group">
                <Image
                  src="/product Images/IMG-20260618-WA0074.jpg"
                  alt="Precise Craftsmanship collar"
                  fill
                  sizes="150px"
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-brand-dark/40" />
                <div className="absolute inset-x-3 bottom-3 text-left space-y-0.5 z-10">
                  <span className="text-xs font-bold text-brand-red leading-none select-none">*</span>
                  <h4 className="text-[8px] font-bold tracking-wider text-white uppercase leading-none">
                    PRECISE CRAFTSMANSHIP
                  </h4>
                  <p className="text-[7px] text-white/70 font-semibold tracking-wide leading-tight">
                    Every stitch is placed with purpose.
                  </p>
                </div>
              </div>

              {/* Square 3: Made to Last */}
              <div className="relative aspect-square w-full rounded-[20px] overflow-hidden border border-brand-border shadow-sm group">
                <Image
                  src="/product Images/IMG-20260618-WA0075.jpg"
                  alt="Made to Last hem detail"
                  fill
                  sizes="150px"
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-brand-dark/40" />
                <div className="absolute inset-x-3 bottom-3 text-left space-y-0.5 z-10">
                  <span className="text-xs font-bold text-brand-red leading-none select-none">*</span>
                  <h4 className="text-[8px] font-bold tracking-wider text-white uppercase leading-none">
                    MADE TO LAST
                  </h4>
                  <p className="text-[7px] text-white/70 font-semibold tracking-wide leading-tight">
                    Durable pieces that stay with you.
                  </p>
                </div>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
