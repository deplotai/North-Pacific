"use client";
import { motion } from "framer-motion";
import { useState } from "react";

export default function PurchaseBlock() {
  const [isPreorder] = useState(true); // Toggle to switch states

  return (
    <section id="purchase" className="py-24 md:py-40 bg-brand-cream relative">
      <div className="w-full max-w-[1000px] mx-auto px-6 md:px-12 relative z-10">
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="bg-brand-purple-dark text-white rounded-[3rem] p-12 md:p-24 text-center overflow-hidden relative shadow-premium"
        >
          {/* Subtle background glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-purple/20 rounded-full blur-[100px] pointer-events-none" />

          <div className="relative z-10 flex flex-col items-center">
            <span className="text-brand-pink font-medium tracking-widest uppercase text-sm mb-6 block">
              {isPreorder ? "Limited Pre-Order" : "Available Now"}
            </span>
            
            <h2 className="font-serif text-[3rem] md:text-[5rem] leading-[1] tracking-tight mb-8">
              {isPreorder ? "Reserve your kit." : "Get yours today."}
            </h2>
            
            <p className="text-white/70 text-lg md:text-xl font-medium max-w-lg mb-12 leading-relaxed">
              {isPreorder 
                ? "Be among the first to experience ultimate peace of mind. Ships early next month." 
                : "The ultimate self-care kit is here. Order today for immediate dispatch."}
            </p>

            <div className="flex flex-col items-center gap-6">
              <div className="flex items-baseline gap-3">
                <span className="font-serif text-5xl">$45</span>
                <span className="text-white/40 line-through text-xl">$55</span>
              </div>
              
              <button className="bg-white text-brand-purple-dark px-10 py-5 rounded-full font-medium text-lg hover:bg-brand-pink-light hover:scale-105 transition-all duration-300 shadow-xl">
                {isPreorder ? "Pre-Order Now" : "Add to Cart"}
              </button>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
