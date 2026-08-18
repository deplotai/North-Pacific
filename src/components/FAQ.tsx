"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const faqs = [
  { question: "When will my pre-order ship?", answer: "All pre-orders are currently scheduled to ship early next month. You will receive tracking info via email." },
  { question: "What exactly is included in the kit?", answer: "20 premium dry net pads, sanitizer, tissue, paper soap, dark chocolate, a disposal bag, band-aids, a scrunchie, and a user manual, all in a premium pouch." },
  { question: "Do you ship internationally?", answer: "Currently, we ship domestically. We are expanding our logistics to support international shipping soon." },
  { question: "Can I customize the contents?", answer: "At launch, the QURA kit comes carefully curated as listed. We plan to offer customizable refill packs in our next phase!" }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="py-24 md:py-40 bg-white relative">
      <div className="w-full max-w-[1440px] mx-auto px-6 md:px-12">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">
          
          <div className="w-full lg:w-1/3">
            <h2 className="font-serif text-[3rem] md:text-[4.5rem] leading-[1] tracking-tight text-brand-purple-dark mb-6">
              Common <br/> Questions
            </h2>
            <p className="text-brand-purple-dark/70 font-medium text-lg leading-relaxed mb-8">
              Everything you need to know about the QURA kit and how we operate.
            </p>
            <a href="https://wa.me/1234567890" target="_blank" rel="noopener noreferrer" className="btn-caeli btn-caeli-outline">
              Ask on WhatsApp
            </a>
          </div>

          <div className="w-full lg:w-2/3 flex flex-col gap-4">
            {faqs.map((faq, i) => (
              <div key={i} className="bg-brand-cream rounded-premium overflow-hidden border border-brand-purple-dark/5 transition-colors hover:border-brand-purple/20">
                <button 
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  className="w-full px-8 py-8 flex justify-between items-center text-left"
                >
                  <span className="font-serif text-xl md:text-2xl text-brand-purple-dark pr-8">{faq.question}</span>
                  <span className="text-brand-purple flex-shrink-0 w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm">
                    <motion.svg 
                      animate={{ rotate: openIndex === i ? 180 : 0 }}
                      width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                    >
                      <path d="M19 9l-7 7-7-7" />
                    </motion.svg>
                  </span>
                </button>
                
                <AnimatePresence>
                  {openIndex === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="px-8 pb-8 pt-0 text-brand-purple-dark/70 font-medium text-lg leading-relaxed">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
