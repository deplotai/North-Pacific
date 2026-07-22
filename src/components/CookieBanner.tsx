"use client";

import React, { useState, useEffect } from "react";

export default function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const cookieConsent = localStorage.getItem("np_cookie_consent");
    if (!cookieConsent) {
      setIsVisible(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("np_cookie_consent", "accepted");
    setIsVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem("np_cookie_consent", "declined");
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="cookie-banner-overlay">
      <div className="cookie-banner-content">
        <div className="cookie-banner-text">
          <h4 className="cookie-banner-title">Cookie Preferences</h4>
          <p className="cookie-banner-desc">
            We use cookies to enhance your browsing experience, serve personalized ads or content, and analyze our traffic. By clicking "Accept All", you consent to our use of cookies.
          </p>
        </div>
        <div className="cookie-banner-actions">
          <button className="cookie-btn cookie-btn-decline" onClick={handleDecline}>
            Decline All
          </button>
          <button className="cookie-btn cookie-btn-accept" onClick={handleAccept}>
            Accept All
          </button>
        </div>
      </div>
    </div>
  );
}
