"use client";
import { motion } from "framer-motion";

const benefits = [
  { title: "Discreet Design", desc: "Crafted to look like a premium cosmetic bag, never drawing unwanted attention." },
  { title: "Perfectly Organized", desc: "Everything has its place, so you're never left digging around in an emergency." },
  { title: "Feminine & Premium", desc: "Because self-care essentials shouldn't feel clinical or cheap." },
  { title: "Ready Anywhere", desc: "Always packed, always prepared. Just grab it and go." }
];

export default function WhyQura() {
  return (
    <section id="why" className="py-24 md:py-40 bg-white">
      <div className="w-full max-w-[1440px] mx-auto px-6 md:px-12">
        
        <div className="text-center mb-20 max-w-3xl mx-auto">
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="font-serif text-[3rem] md:text-[4.5rem] leading-[1] tracking-tight text-brand-purple-dark mb-6"
          >
            Why choose QURA
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            className="text-brand-purple-dark/70 font-medium text-lg leading-relaxed"
          >
            We believe that taking care of yourself should be a premium experience. That's why we built QURA with four core pillars in mind.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {benefits.map((benefit, i) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: i * 0.1 }}
              className="bg-brand-cream border border-brand-purple-dark/5 p-10 rounded-[2.5rem] flex flex-col hover:shadow-premium transition-shadow duration-500"
            >
              <div className="w-12 h-12 rounded-full bg-brand-pink-light flex items-center justify-center text-brand-purple font-serif text-xl mb-8">
                {i + 1}
              </div>
              <h3 className="font-serif text-2xl text-brand-purple-dark mb-4">{benefit.title}</h3>
              <p className="text-brand-purple-dark/60 font-medium leading-relaxed">{benefit.desc}</p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
