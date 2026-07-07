"use client";

import React, { useEffect, useState } from "react";
import { products, offers } from "@/data/cms";

interface PreloaderProps {
  onComplete: () => void;
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const [progress, setProgress] = useState(0);
  const [fade, setFade] = useState(false);

  useEffect(() => {
    // Gather all image URLs that should be preloaded
    const imageUrls = [
      "/logo.png",
      "/logo 2.png",
      "/logo 3.png",
      "/Website image/hero desktop.png",
      "/Website image/hero mobile.png",
      "/Website image/after hero desktop.png",
      "/Website image/after hero mobile.png",
      "/images/shirts/linen shirt for main.png",
      "/images/shirts/Printed shirt for main.png",
      "/images/shirts/Striped shirt for main.png",
      "/images/tshirts-polos/polo tshirt for main.png",
      "/images/tshirts-polos/print tshirt for main.png",
      "/images/tshirts-polos/striped tshirt for main.png",
      "/images/bottoms/formal trouser for main.png",
      "/images/bottoms/pant for main section.png",
      "/images/workwear-uniforms/chef uniform.png",
      "/images/workwear-uniforms/Corperate main.png",
      "/images/workwear-uniforms/doctor uniform.png",
      "/images/workwear-uniforms/safety uniform.png",
      "/images/workwear-uniforms/tshirt uniform.png",
      "/images/formal-wear/blazer/blazer for main.png",
      offers.bannerImage,
      ...products.flatMap((p) => p.images),
    ].filter(Boolean) as string[];

    // Unique values
    const uniqueUrls = Array.from(new Set(imageUrls));
    const total = uniqueUrls.length;
    let loadedCount = 0;

    if (total === 0) {
      setTimeout(() => {
        setFade(true);
        setTimeout(onComplete, 800);
      }, 500);
      return;
    }

    const updateProgress = () => {
      loadedCount++;
      const currentProgress = Math.floor((loadedCount / total) * 100);
      setProgress(currentProgress);

      if (loadedCount >= total) {
        setTimeout(() => {
          setFade(true);
          setTimeout(onComplete, 800);
        }, 600);
      }
    };

    uniqueUrls.forEach((url) => {
      const img = new window.Image();
      img.onload = updateProgress;
      img.onerror = updateProgress; // count as completed even if it fails to avoid getting stuck
      img.src = url;
    });

    // Fallback: Max 8 seconds loading to prevent hanging
    const fallbackTimeout = setTimeout(() => {
      setFade(true);
      setTimeout(onComplete, 800);
    }, 8000);

    return () => clearTimeout(fallbackTimeout);
  }, [onComplete]);

  return (
    <div className={`preloader-overlay ${fade ? "fade-out" : ""}`}>
      <div className="preloader-content">
        <div className="preloader-logo-wrap">
          <img src="/logo.png" alt="North Pacific Logo" className="preloader-logo" />
        </div>
        
        <div className="preloader-progress-track">
          <div className="preloader-progress-fill" style={{ width: `${progress}%` }}></div>
        </div>
        
        <div className="preloader-meta">
          <span className="preloader-percentage">{progress}%</span>
        </div>
      </div>
      <div className="preloader-legal">
        <a href="#cookies" className="legal-link">Cookies Policy</a>
        <span className="legal-divider">|</span>
        <a href="#privacy" className="legal-link">Privacy Terms</a>
      </div>
    </div>
  );
}
