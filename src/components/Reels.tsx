"use client";

import React, { useRef, useState } from "react";

export default function Reels() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(true);
  const [progress, setProgress] = useState(0);

  const handleMouseEnter = () => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  };

  const handleMouseLeave = () => {
    if (videoRef.current) {
      videoRef.current.pause();
    }
  };

  const handleSoundToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (videoRef.current) {
      const currentMuted = videoRef.current.muted;
      videoRef.current.muted = !currentMuted;
      setIsMuted(!currentMuted);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const pct = (videoRef.current.currentTime / videoRef.current.duration) * 100;
      setProgress(pct);
    }
  };

  return (
    <section id="reels-section" className="reels-section section-padding">
      <div className="section-container">
        <div className="section-header center-align">
          <h2 className="section-title">NP REELS</h2>
        </div>

        <div className="reels-grid">
          {/* Main reel with Local MP4 Video */}
          <div
            className="reel-card main-reel"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <div className="reel-video-container">
              <video
                ref={videoRef}
                className="reel-video"
                loop
                muted={isMuted}
                playsInline
                preload="auto"
                onTimeUpdate={handleTimeUpdate}
              >
                <source src="/images/WhatsApp Video 2026-06-17 at 1.35.06 PM.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              <div className="reel-overlay">
                <div className="reel-sound-btn" onClick={handleSoundToggle}>
                  <i className={`fa-solid ${isMuted ? "fa-volume-xmark" : "fa-volume-high"}`}></i>
                </div>
                <div className="reel-play-indicator">
                  <i className="fa-solid fa-play"></i>
                </div>
                <div className="reel-info">
                  <div className="reel-user">
                    <div className="avatar">
                      <span className="avatar-letter">NP</span>
                    </div>
                    <span className="username">@northpacific.co</span>
                  </div>
                  <p className="reel-caption">
                    The Summer Heavyweight Drop. Crafted for the streets, worn everywhere. 🌊 #streetwear #northpacific
                  </p>
                  <div className="reel-tags">
                    <span className="tag">#LinenShirt</span>
                    <span className="tag">#SkaterFit</span>
                  </div>
                </div>
              </div>
              <div className="reel-progress-bar">
                <div className="reel-progress-fill" style={{ width: `${progress}%` }}></div>
              </div>
            </div>
          </div>

          {/* Secondary Reels */}
          <div className="reel-card">
            <div className="reel-video-container">
              <img
                src="/pose/ChatGPT Image Jun 23, 2026, 06_12_28 PM.png"
                alt="Reel 2 Cover"
                className="reel-static-cover"
              />
              <div className="reel-overlay">
                <div className="reel-views">
                  <i className="fa-regular fa-eye"></i> 14.2K views
                </div>
                <div className="reel-info">
                  <div className="reel-user">
                    <div className="avatar">
                      <span className="avatar-letter">NP</span>
                    </div>
                    <span className="username">@northpacific.co</span>
                  </div>
                  <p className="reel-caption">
                    Dylez Skate Denim fit test. Skater fit redefined. 🛹 #skate #denim
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="reel-card">
            <div className="reel-video-container">
              <img
                src="/pose/ChatGPT Image Jun 23, 2026, 07_46_34 PM.png"
                alt="Reel 3 Cover"
                className="reel-static-cover"
              />
              <div className="reel-overlay">
                <div className="reel-views">
                  <i className="fa-regular fa-eye"></i> 18.9K views
                </div>
                <div className="reel-info">
                  <div className="reel-user">
                    <div className="avatar">
                      <span className="avatar-letter">NP</span>
                    </div>
                    <span className="username">@northpacific.co</span>
                  </div>
                  <p className="reel-caption">
                    Waffle Knit Polo styling. Front to back, we got the details locked. #polo #streetstyle
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="reel-card">
            <div className="reel-video-container">
              <img
                src="/pose/ChatGPT Image Jun 23, 2026, 06_13_18 PM.png"
                alt="Reel 4 Cover"
                className="reel-static-cover"
              />
              <div className="reel-overlay">
                <div className="reel-views">
                  <i className="fa-regular fa-eye"></i> 22.4K views
                </div>
                <div className="reel-info">
                  <div className="reel-user">
                    <div className="avatar">
                      <span className="avatar-letter">NP</span>
                    </div>
                    <span className="username">@northpacific.co</span>
                  </div>
                  <p className="reel-caption">
                    Oversized heavy drop t-shirt styling. Ultimate comfort meets raw street aesthetic. ⚡ #heavyweight #oversized
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="reel-card">
            <div className="reel-video-container">
              <img
                src="/pose/WhatsApp Image 2026-06-23 at 5.23.54 PM.jpeg"
                alt="Reel 5 Cover"
                className="reel-static-cover"
              />
              <div className="reel-overlay">
                <div className="reel-views">
                  <i className="fa-regular fa-eye"></i> 15.7K views
                </div>
                <div className="reel-info">
                  <div className="reel-user">
                    <div className="avatar">
                      <span className="avatar-letter">NP</span>
                    </div>
                    <span className="username">@northpacific.co</span>
                  </div>
                  <p className="reel-caption">
                    Signature Workwear Cargo pants in motion. Built for utility, styled for the city. 💼 #cargo #utilitywear
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
