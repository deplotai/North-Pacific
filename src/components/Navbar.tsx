"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 flex items-center justify-between px-6 md:px-12 ${
          scrolled ? "h-20 bg-white/90 backdrop-blur-md shadow-sm" : "h-24 bg-transparent"
        }`}
      >
        {/* Mobile Menu Button */}
        <div className="md:hidden w-1/3">
          <button 
            onClick={() => setMobileMenuOpen(true)}
            className="flex flex-col gap-[6px] p-2"
          >
            <span className="w-6 h-[2px] bg-brand-purple-dark block"></span>
            <span className="w-4 h-[2px] bg-brand-purple-dark block"></span>
          </button>
        </div>

        {/* Left Nav (Desktop) */}
        <nav className="hidden md:flex w-1/3 gap-8">
          <a href="#kit" className="text-sm font-medium text-brand-purple-dark hover:text-brand-purple transition-colors">The Kit</a>
          <a href="#why" className="text-sm font-medium text-brand-purple-dark hover:text-brand-purple transition-colors">Why QURA</a>
        </nav>

        {/* Logo Center */}
        <div className="w-1/3 flex justify-center">
          <span className="cursor-pointer flex items-center">
             <img src="/logo.png" alt="QURA Logo" className="h-10 w-auto object-contain mix-blend-multiply" />
          </span>
        </div>

        {/* Right Nav */}
        <nav className="w-1/3 flex justify-end gap-6 items-center">
          <a href="#faq" className="hidden md:block text-sm font-medium text-brand-purple-dark hover:text-brand-purple transition-colors">FAQ</a>
          <a href="#purchase" className="text-sm font-medium text-brand-purple hover:text-brand-purple-dark transition-colors">Pre-order</a>
          <button className="relative">
             <span className="text-brand-purple-dark">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
             </span>
             <span className="absolute -top-1 -right-2 bg-brand-pink text-brand-purple-dark text-[10px] w-4 h-4 flex items-center justify-center rounded-full font-bold">
               0
             </span>
          </button>
        </nav>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-brand-purple-dark/20 backdrop-blur-sm"
          >
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "tween", ease: "easeInOut", duration: 0.3 }}
              className="absolute top-0 left-0 w-[80%] max-w-sm h-full bg-brand-cream p-8 shadow-2xl flex flex-col"
            >
              <div className="flex justify-between items-center mb-12">
                 <img src="/logo.png" alt="QURA Logo" className="h-10 w-auto object-contain mix-blend-multiply" />
                <button 
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-brand-purple-dark p-2"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M18 6L6 18M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="flex flex-col gap-6 font-serif text-2xl text-brand-purple-dark">
                <a href="#kit" onClick={() => setMobileMenuOpen(false)}>The Kit</a>
                <a href="#why" onClick={() => setMobileMenuOpen(false)}>Why QURA</a>
                <a href="#faq" onClick={() => setMobileMenuOpen(false)}>FAQ</a>
                <div className="h-px w-full bg-brand-purple-dark/10 my-4" />
                <a href="#purchase" onClick={() => setMobileMenuOpen(false)} className="text-brand-purple font-medium text-lg">Pre-order Now</a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
