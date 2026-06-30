"use client";

import React, { useRef, useState, useEffect } from "react";

interface InstagramReel {
  id: string;
  caption?: string;
  media_type: string;
  media_url: string;
  thumbnail_url?: string;
  permalink: string;
  timestamp: string;
  username: string;
}

function ReelCard({ reel, isMain }: { reel: InstagramReel; isMain?: boolean }) {
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
    e.preventDefault();
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

  // Truncate caption for display
  const displayCaption = reel.caption 
    ? (reel.caption.length > 80 ? reel.caption.substring(0, 80) + "..." : reel.caption)
    : "";

  return (
    <a 
      href={reel.permalink} 
      target="_blank" 
      rel="noopener noreferrer" 
      className={`reel-card ${isMain ? "main-reel" : ""}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="reel-video-container">
        {/* We use video tag for all to allow them to be playable on hover directly on the website */}
        <video
          ref={videoRef}
          className="reel-video"
          loop
          muted={isMuted}
          playsInline
          preload="metadata"
          poster={reel.thumbnail_url}
          onTimeUpdate={handleTimeUpdate}
        >
          <source src={reel.media_url} type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        <div className="reel-overlay">
          {isMain && (
            <div className="reel-sound-btn" onClick={handleSoundToggle}>
              <i className={`fa-solid ${isMuted ? "fa-volume-xmark" : "fa-volume-high"}`}></i>
            </div>
          )}
          <div className="reel-play-indicator">
            <i className="fa-solid fa-play"></i>
          </div>
          <div className="reel-info">
            <div className="reel-user">
              <div className="avatar">
                <span className="avatar-letter">{reel.username ? reel.username.charAt(0).toUpperCase() : "NP"}</span>
              </div>
              <span className="username">@{reel.username || "northpacific"}</span>
            </div>
            {displayCaption && (
              <p className="reel-caption">{displayCaption}</p>
            )}
          </div>
        </div>

        {isMain && (
          <div className="reel-progress-bar">
            <div className="reel-progress-fill" style={{ width: `${progress}%` }}></div>
          </div>
        )}
      </div>
    </a>
  );
}

export default function Reels() {
  const [reels, setReels] = useState<InstagramReel[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchReels() {
      try {
        const res = await fetch("/api/instagram/reels");
        if (!res.ok) throw new Error("Failed to load reels");
        const data = await res.json();
        
        if (data.error) throw new Error(data.error);
        
        setReels(data.reels || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Error loading reels");
      } finally {
        setLoading(false);
      }
    }
    fetchReels();
  }, []);

  return (
    <section id="reels-section" className="reels-section section-padding">
      <div className="section-container">
        <div className="section-header center-align">
          <h2 className="section-title">NP REELS</h2>
        </div>

        {loading ? (
          <div style={{ textAlign: "center", padding: "40px", color: "var(--color-dark-grey)" }}>
            <i className="fa-solid fa-spinner fa-spin" style={{ fontSize: "2rem", marginBottom: "1rem" }}></i>
            <p>Loading latest reels...</p>
          </div>
        ) : error ? (
          <div style={{ textAlign: "center", padding: "40px", color: "var(--color-dark-grey)" }}>
            <i className="fa-brands fa-instagram" style={{ fontSize: "2rem", marginBottom: "1rem" }}></i>
            <p>Follow us on Instagram to see our latest drops.</p>
            {/* We show a fallback friendly message rather than a red error in production */}
          </div>
        ) : reels.length === 0 ? (
          <div style={{ textAlign: "center", padding: "40px", color: "var(--color-dark-grey)" }}>
            <i className="fa-brands fa-instagram" style={{ fontSize: "2rem", marginBottom: "1rem" }}></i>
            <p>No reels available at the moment.</p>
          </div>
        ) : (
          <div className="reels-grid">
            {reels.slice(0, 5).map((reel, index) => (
              <ReelCard key={reel.id} reel={reel} isMain={index === 0} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
