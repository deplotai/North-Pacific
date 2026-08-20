"use client";

import React, { useState, useEffect, useRef } from "react";

export default function SupportWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const widgetRef = useRef<HTMLDivElement>(null);

  // Close when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (widgetRef.current && !widgetRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleWidget = () => {
    setIsOpen(!isOpen);
  };

  const supportNumber = "94775440026";
  const supportEmail = "support@northpacific.com";

  return (
    <div className="support-widget-container" ref={widgetRef}>
      {/* The Popup Menu */}
      <div className={`support-widget-menu ${isOpen ? "open" : ""}`}>
        <div className="support-widget-header">
          <h5>North Pacific Support</h5>
          <p>We usually reply within a few hours.</p>
        </div>
        <div className="support-widget-body">
          <a
            href={`https://wa.me/966568269698?text=Hi!%20I%20have%20a%20retail%20enquiry.`}
            target="_blank"
            rel="noopener noreferrer"
            className="support-link whatsapp-link"
          >
            <i className="fa-brands fa-whatsapp"></i> Retail Enquiry
          </a>
          <a
            href={`https://wa.me/966565423411?text=Hi!%20I%20have%20a%20wholesale%20enquiry.`}
            target="_blank"
            rel="noopener noreferrer"
            className="support-link whatsapp-link"
          >
            <i className="fa-brands fa-whatsapp"></i> Wholesale Enquiry
          </a>
          <a
            href={`mailto:${supportEmail}`}
            className="support-link email-link"
          >
            <i className="fa-regular fa-envelope"></i> Email Us
          </a>
        </div>
      </div>

      {/* The Floating Action Button */}
      <button className="support-widget-fab" onClick={toggleWidget} aria-label="Support">
        {isOpen ? (
          <i className="fa-solid fa-times"></i>
        ) : (
          <i className="fa-regular fa-comment-dots"></i>
        )}
      </button>
    </div>
  );
}
