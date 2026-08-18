"use client";
import { motion } from "framer-motion";

const kitItems = [
  { name: "Sanitary Pads", desc: "20 premium dry net pads.", icon: "🌸" },
  { name: "Sanitizer", desc: "1 refreshing bottle.", icon: "💧" },
  { name: "Tissue", desc: "1 soft packet.", icon: "🧻" },
  { name: "Paper Soap", desc: "25 travel sheets.", icon: "🧼" },
  { name: "Dark Chocolate", desc: "3 pieces for comfort.", icon: "🍫" },
  { name: "Disposal Bag", desc: "1 discreet bag.", icon: "🗑️" },
  { name: "Band Aid", desc: "2 quick fixes.", icon: "🩹" },
  { name: "Scrunchies", desc: "1 elegant tie.", icon: "🎀" },
  { name: "Zipper Pouch", desc: "1 premium carrier.", icon: "👛" },
  { name: "User Manual", desc: "1 detailed guide.", icon: "📖" },
];

export default function KitContents() {
  return (
    <section id="kit" className="relative py-24 md:py-40 bg-white overflow-hidden rounded-t-[3rem] -mt-12 z-30 shadow-[0_-20px_40px_rgba(0,0,0,0.02)]">
      <div className="w-full max-w-[1440px] mx-auto px-6 md:px-12">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 mb-20">
          <div className="max-w-2xl">
            <motion.h2 
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="font-serif text-[3rem] md:text-[4.5rem] leading-[1] tracking-tight text-brand-purple-dark"
            >
              Find out more<br/>about QURA
            </motion.h2>
          </div>
          <motion.div 
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            className="max-w-sm"
          >
            <p className="text-brand-purple-dark/70 font-medium text-lg leading-relaxed">
              Every item has been thoughtfully selected to provide unparalleled comfort and convenience.
            </p>
          </motion.div>
        </div>

        {/* Feature Grid - Caeli Style spacious cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          
          {/* Featured Large Card */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-2 bg-brand-pink-light rounded-premium p-10 md:p-16 flex flex-col justify-between aspect-square lg:aspect-[2/1] relative overflow-hidden group"
          >
            <div className="relative z-10">
              <span className="text-4xl md:text-5xl mb-6 block">👛</span>
              <h3 className="font-serif text-3xl md:text-4xl text-brand-purple-dark mb-4">The Premium Pouch</h3>
              <p className="text-brand-purple-dark/70 font-medium max-w-md text-lg">A beautifully designed zipper pouch that holds everything together discreetly. Fits perfectly in any bag.</p>
            </div>
            {/* Decorative BG element */}
            <div className="absolute right-0 bottom-0 w-3/4 h-3/4 bg-gradient-to-tl from-brand-blush to-transparent rounded-tl-[100%] opacity-50 transform group-hover:scale-105 transition-transform duration-700" />
          </motion.div>

          {/* Individual Items Grid */}
          {kitItems.slice(0, 9).map((item, i) => {
            // Skip the pouch as it's the hero card
            if (item.name === "Zipper Pouch") return null;
            
            return (
              <motion.div 
                key={item.name}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: (i % 3) * 0.1 }}
                className="bg-brand-cream border border-brand-purple-dark/5 rounded-premium p-8 md:p-10 flex flex-col hover:shadow-premium transition-shadow duration-500"
              >
                <span className="text-4xl mb-8">{item.icon}</span>
                <h3 className="font-serif text-2xl text-brand-purple-dark mb-3">{item.name}</h3>
                <p className="text-brand-purple-dark/60 font-medium">{item.desc}</p>
              </motion.div>
            )
          })}

        </div>

      </div>
    </section>
  );
}
