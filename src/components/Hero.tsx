"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.95]);

  return (
    <section 
      ref={containerRef} 
      className="relative w-full min-h-screen bg-brand-cream overflow-hidden flex flex-col justify-center pt-24 pb-12"
    >
      {/* Background Soft Gradient */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 -right-40 w-[800px] h-[800px] bg-brand-pink/20 rounded-full blur-[120px]" />
        <div className="absolute top-1/2 -left-40 w-[600px] h-[600px] bg-brand-purple/10 rounded-full blur-[100px]" />
      </div>

      <motion.div 
        style={{ y, opacity, scale }}
        className="relative z-10 w-full max-w-[1440px] mx-auto px-6 md:px-12 flex flex-col items-center text-center mt-12 md:mt-24"
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="mb-6 inline-flex items-center gap-3 px-4 py-2 rounded-full bg-brand-pink-light border border-brand-blush"
        >
          <span className="w-2 h-2 rounded-full bg-brand-purple" />
          <span className="text-sm font-medium text-brand-purple-dark">The Ultimate Periods Kit</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          className="font-serif text-[3.5rem] md:text-[6rem] lg:text-[7.5rem] leading-[0.95] tracking-tight text-brand-purple-dark max-w-5xl"
        >
          Comfort, <br /> designed for you.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          className="mt-8 text-lg md:text-xl text-brand-purple-dark/70 font-medium max-w-2xl leading-relaxed"
        >
          A premium self-care kit crafted for discretion, organization, and everyday confidence. Everything you need, beautifully packed.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
          className="mt-12 flex flex-col sm:flex-row items-center gap-4"
        >
          <a href="#purchase" className="btn-caeli w-full sm:w-auto">
            Discover QURA
          </a>
          <a href="#kit" className="btn-caeli btn-caeli-outline w-full sm:w-auto">
            See what's inside
          </a>
        </motion.div>
      </motion.div>

      {/* Main Hero Product Visual */}
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
        className="relative z-20 w-full max-w-[1200px] mx-auto px-6 md:px-12 mt-16 md:mt-24"
      >
        <div className="w-full aspect-video md:aspect-[21/9] bg-brand-pink-light rounded-premium shadow-premium border border-white/50 overflow-hidden flex items-center justify-center relative group">
          {/* Mockup Placeholder */}
          <div className="absolute inset-0 bg-gradient-to-tr from-brand-blush to-brand-cream opacity-50" />
          <div className="relative z-10 flex flex-col items-center">
             <img src="/logo.png" alt="QURA Logo" className="h-16 md:h-24 w-auto mix-blend-multiply opacity-50 mb-4 transform group-hover:scale-105 transition-transform duration-700" />
             <span className="text-brand-purple font-medium tracking-wide">Premium Product Visual</span>
          </div>
        </div>
      </motion.div>

    </section>
  );
}
