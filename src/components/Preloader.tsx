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
    let currentProgress = 0;
    
    // Simulate a fast, luxurious loading sequence (completes in ~1.2 seconds)
    const interval = setInterval(() => {
      currentProgress += Math.floor(Math.random() * 15) + 5;
      
      if (currentProgress >= 100) {
        currentProgress = 100;
        setProgress(100);
        clearInterval(interval);
        
        setTimeout(() => {
          setFade(true);
          setTimeout(onComplete, 600);
        }, 300);
      } else {
        setProgress(currentProgress);
      }
    }, 100);

    return () => clearInterval(interval);
  }, []); // Run only once on mount

  return (
    <div className={`preloader-overlay ${fade ? "fade-out" : ""}`}>
      <div className="preloader-content">
        <div className="preloader-logo-wrap">
          <img 
            src="/logo.webp" 
            alt="North Pacific Logo" 
            className="preloader-logo" 
          />
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
