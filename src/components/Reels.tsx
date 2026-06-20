'use client';

import React, { useState, useRef } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, X, Eye, ArrowRight, Volume2, VolumeX } from 'lucide-react';

interface ReelItem {
  id: string;
  views: string;
  coverPath: string;
  videoPath: string;
  title: string;
}

export default function Reels() {
  const [activeIndex, setActiveIndex] = useState(1); // Set Card 2 (index 1) as active/scaled-up by default
  const [playingVideo, setPlayingVideo] = useState<string | null>(null);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  const reelItems: ReelItem[] = [
    {
      id: "reel-1",
      views: "12.4K",
      coverPath: "/Product section cover images/cover-tshirts.png",
      videoPath: "/product Images/VID-20260617-WA0075.mp4",
      title: "California Tee Drop"
    },
    {
      id: "reel-2",
      views: "18.7K",
      coverPath: "/Product section cover images/cover-reel2.png",
      videoPath: "/product Images/VID-20260617-WA0075.mp4",
      title: "Blue Jump Editorial"
    },
    {
      id: "reel-3",
      views: "9.3K",
      coverPath: "/Product section cover images/cover-reel1.png",
      videoPath: "/product Images/VID-20260617-WA0075.mp4",
      title: "Beyond The Trend Brown"
    },
    {
      id: "reel-4",
      views: "7.1K",
      coverPath: "/Product section cover images/cover-reel3.png",
      videoPath: "/product Images/VID-20260617-WA0075.mp4",
      title: "Cream Floral Summer"
    }
  ];

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % reelItems.length);
  };

  const handlePlayReel = (videoPath: string) => {
    setPlayingVideo(videoPath);
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  };

  return (
    <section id="campaigns" className="py-24 bg-brand-bg relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Top Section Indicator */}
        <div className="flex items-center space-x-2 mb-12">
          <span className="text-xs font-bold text-brand-red tracking-wider">03</span>
          <span className="w-8 h-[1.5px] bg-brand-text"></span>
          <span className="text-[10px] font-bold text-brand-text tracking-[0.25em] uppercase">
            VIDEO / REEL
          </span>
        </div>

        {/* Main Grid Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Typography Block */}
          <div className="lg:col-span-4 flex flex-col space-y-6">
            <div className="relative select-none">
              <h2 className="text-[5.5rem] sm:text-[6.5rem] font-oswald font-extrabold text-brand-text tracking-tight uppercase leading-[0.8] mb-2">
                DESIGNED <br/> TO MOVE.
              </h2>
              <span className="absolute left-[3%] top-[45%] font-script text-[5.5rem] sm:text-[6.5rem] text-brand-red transform -rotate-[5deg] leading-none pointer-events-none z-10">
                Made to inspire.
              </span>
            </div>

            <div className="space-y-1.5 text-xs font-bold text-brand-text/75 leading-relaxed tracking-wider pt-2">
              <p>Real people. Real moments.</p>
              <p>Crafted with purpose.</p>
            </div>

            <div className="pt-4">
              <button
                onClick={() => handlePlayReel(reelItems[1].videoPath)}
                className="text-[10px] font-bold tracking-[0.2em] uppercase text-brand-text hover:text-brand-red transition-all flex items-center space-x-2 border-b border-brand-red pb-1"
              >
                <span>WATCH OUR REEL</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Right Column: Reel Cards Slider */}
          <div className="lg:col-span-8 flex flex-col space-y-6 relative">
            
            {/* Close Button X (Matches mockup top right of the deck) */}
            <div className="absolute right-0 top-[-36px] z-20 text-brand-text/50 hover:text-brand-red cursor-pointer transition-colors p-1 select-none">
              <X className="w-5 h-5" onClick={() => setActiveIndex(1)} />
            </div>

            {/* Slider Deck */}
            <div className="relative flex items-center w-full">
              
              {/* Cards Container */}
              <div className="grid grid-cols-4 gap-4 w-full items-center overflow-x-auto md:overflow-visible pb-4 md:pb-0 scrollbar-none">
                {reelItems.map((item, idx) => {
                  const isActive = idx === activeIndex;
                  return (
                    <motion.div
                      key={item.id}
                      onClick={() => {
                        setActiveIndex(idx);
                        handlePlayReel(item.videoPath);
                      }}
                      animate={{
                        scale: isActive ? 1.05 : 0.96,
                        y: isActive ? -8 : 0,
                      }}
                      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                      className={`relative aspect-[9/16] w-full rounded-[20px] overflow-hidden border bg-brand-surface cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-300 ${
                        isActive ? 'border-brand-text z-10' : 'border-brand-border/60'
                      }`}
                    >
                      {/* Image Cover */}
                      <Image
                        src={item.coverPath}
                        alt={item.title}
                        fill
                        sizes="(max-width: 768px) 50vw, 20vw"
                        className="object-cover object-center"
                      />

                      {/* Dark gradient overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/10" />

                      {/* Play Button Icon (Top Right) */}
                      <div className="absolute top-4 right-4 z-10 w-7 h-7 bg-white/95 rounded-full flex items-center justify-center shadow-md">
                        <Play className="w-2.5 h-2.5 text-brand-text fill-current ml-0.5" />
                      </div>

                      {/* Views indicator (Bottom Left) */}
                      <div className="absolute bottom-4 left-4 z-10 flex items-center space-x-1.5 text-white">
                        <Eye className="w-3.5 h-3.5" />
                        <span className="text-[10px] font-bold tracking-wider">{item.views}</span>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {/* Next Navigation Arrow Circle Button (Overlapping on the right edge) */}
              <div 
                onClick={handleNext}
                className="absolute right-[-16px] md:right-[-24px] top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white hover:bg-brand-red hover:text-white border border-brand-border rounded-full flex items-center justify-center shadow-2xl cursor-pointer hover:scale-110 active:scale-95 transition-all z-20"
              >
                <ArrowRight className="w-4.5 h-4.5 text-brand-text hover:text-white" />
              </div>

            </div>

            {/* Slider Dots Indicator */}
            <div className="flex items-center justify-center space-x-2.5 pt-4 select-none">
              {reelItems.map((_, idx) => (
                <div
                  key={idx}
                  onClick={() => setActiveIndex(idx)}
                  className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                    idx === activeIndex ? 'w-4 bg-brand-red' : 'w-1.5 bg-brand-text/30'
                  }`}
                />
              ))}
            </div>

          </div>

        </div>

      </div>

      {/* Video Playback Modal */}
      <AnimatePresence>
        {playingVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4 md:p-6"
            onClick={() => setPlayingVideo(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-sm aspect-[9/16] bg-black border border-white/10 shadow-2xl rounded-sm overflow-hidden flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <video
                ref={videoRef}
                src={playingVideo}
                autoPlay
                loop
                muted={isMuted}
                playsInline
                className="w-full h-full object-cover"
              />

              {/* Controls */}
              <div className="absolute top-4 right-4 flex items-center space-x-2 z-10">
                <button
                  onClick={toggleMute}
                  className="bg-black/60 hover:bg-black/90 p-2 rounded-full border border-white/10 text-white transition-colors"
                  aria-label={isMuted ? "Unmute" : "Mute"}
                >
                  {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                </button>
                <button
                  onClick={() => setPlayingVideo(null)}
                  className="bg-black/60 hover:bg-brand-red p-2 rounded-full border border-white/10 text-white transition-colors"
                  aria-label="Close video"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Title Overlay */}
              <div className="absolute bottom-6 left-6 right-6 z-10 bg-gradient-to-t from-black/80 to-transparent p-4 border-l border-brand-red">
                <span className="text-[9px] font-bold tracking-widest text-brand-red uppercase block mb-1">
                  PLAYING CAMPAIGN
                </span>
                <h4 className="text-xs font-semibold tracking-widest uppercase text-white">
                  North Pacific Reels
                </h4>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
