"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { MapPin, Briefcase, GraduationCap, Plane } from "lucide-react";

const scenes = [
  { title: "In your handbag", desc: "Always discreet, always ready for the day.", icon: <Briefcase size={28} /> },
  { title: "For college", desc: "Slip it into your backpack. Be the friend who is prepared.", icon: <GraduationCap size={28} /> },
  { title: "While traveling", desc: "Compact enough for carry-ons. Your travel companion.", icon: <Plane size={28} /> },
  { title: "At the office", desc: "Fits perfectly in your drawer. Peace of mind at work.", icon: <MapPin size={28} /> },
];

export default function Lifestyle() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const imgY = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <section ref={containerRef} className="relative py-24 md:py-40 bg-brand-pink-light overflow-hidden">
      <div className="w-full max-w-[1440px] mx-auto px-6 md:px-12">
        
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">
          
          {/* Left Sticky Text */}
          <div className="w-full lg:w-1/2 flex flex-col">
            <div className="sticky top-40">
              <motion.h2 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="font-serif text-[3rem] md:text-[4.5rem] leading-[1] tracking-tight text-brand-purple-dark mb-8"
              >
                Creating comfort <br/> for your everyday <br/> ... anywhere.
              </motion.h2>

              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
                className="flex flex-col gap-8 max-w-md"
              >
                <p className="text-brand-purple-dark/70 font-medium text-lg leading-relaxed">
                  We designed QURA to be as mobile as you are. A beautiful, compact pouch that never feels out of place, whether you're in a boardroom or boarding a flight.
                </p>
                <a href="#purchase" className="btn-caeli self-start">
                  Get yours today
                </a>
              </motion.div>
            </div>
          </div>

          {/* Right Parallax Images & Blocks */}
          <div className="w-full lg:w-1/2 flex flex-col gap-8 md:gap-12 pt-12 lg:pt-32 pb-12 lg:pb-32">
            
            {/* Editorial Image Placeholder */}
            <motion.div 
              style={{ y: imgY }}
              className="w-full aspect-[4/5] md:aspect-square bg-brand-blush rounded-premium overflow-hidden flex items-center justify-center border border-white/50 shadow-premium relative mb-8"
            >
               <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.85%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22 opacity=%220.08%22/%3E%3C/svg%3E')] opacity-30 mix-blend-multiply" />
               <span className="font-serif text-brand-purple-dark text-xl italic opacity-50 relative z-10">Editorial Visual</span>
            </motion.div>

            {/* Use Case Blocks */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {scenes.map((scene, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: i * 0.1 }}
                  className="bg-white p-8 rounded-[2rem] border border-brand-purple-dark/5 shadow-sm hover:shadow-premium transition-shadow duration-500"
                >
                  <div className="text-brand-purple mb-6">
                    {scene.icon}
                  </div>
                  <h3 className="font-serif text-2xl text-brand-purple-dark mb-3">{scene.title}</h3>
                  <p className="text-brand-purple-dark/60 font-medium text-sm leading-relaxed">{scene.desc}</p>
                </motion.div>
              ))}
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
