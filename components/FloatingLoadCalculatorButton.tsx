"use client";
import React from "react";
import { usePathname, useRouter } from "next/navigation";

const DARK_ORANGE = "#C75A13"; // darker orange

const FloatingLoadCalculatorButton = () => {
  const router = useRouter();
  const pathname = usePathname();

  const handleClick = () => {
    if (pathname === "/") {
      // On index page, scroll to section
      const el = document.getElementById("load-calculator-section");
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      // Navigate to index and scroll after navigation
      router.push("/#load-calculator-section");
    }
  };

  return (
    <>
      <style>{`
        @media (max-width: 768px) {
          .floating-load-calc-btn {
            left: 16px !important;
            top: unset !important;
            bottom: 8px !important;
            right: unset !important;
            transform: none !important;
            border-radius: 1.5rem !important;
            flex-direction: row !important;
            padding: 1.1rem 1.1rem !important;
            width: 80px !important;
            height: 80px !important;
            min-height: 80px !important;
            min-width: 80px !important;
            justify-content: center !important;
          }
          .floating-load-calc-btn-label {
            display: none !important;
          }
          .floating-load-calc-btn-icon {
            margin-right: 0 !important;
            width: 48px !important;
            height: 48px !important;
          }
          .floating-load-calc-btn-icon svg {
            width: 48px !important;
            height: 48px !important;
          }
        }
      `}</style>
      <button
        onClick={handleClick}
        className="floating-load-calc-btn"
        style={{
          position: "fixed",
          left: "-80px",
          top: "80%",
          transform: "translateY(-50%) rotate(-90deg)",
          zIndex: 1000,
          background: DARK_ORANGE,
          color: "#fff",
          padding: "1rem 2.5rem",
          borderRadius: "0 0 1.5rem 1.5rem",
          boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
          fontWeight: 700,
          fontSize: "1.1rem",
          letterSpacing: 1,
          cursor: "pointer",
          border: "none",
          outline: "none",
          display: "flex",
          alignItems: "center",
          gap: "0.75rem",
          transition: "all 0.2s",
        }}
        aria-label="Go to Load Calculator"
      >
        <span
          className="floating-load-calc-btn-icon"
          style={{ display: "flex", alignItems: "center" }}
        >
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ marginRight: 6 }}
          >
            <rect
              x="3"
              y="2"
              width="18"
              height="20"
              rx="3"
              fill="#fff"
              fillOpacity="0.12"
            />
            <rect
              x="7"
              y="6"
              width="10"
              height="2"
              rx="1"
              fill="#fff"
              fillOpacity="0.7"
            />
            <rect x="7" y="10" width="2" height="2" rx="1" fill="#fff" />
            <rect x="11" y="10" width="2" height="2" rx="1" fill="#fff" />
            <rect x="15" y="10" width="2" height="2" rx="1" fill="#fff" />
            <rect x="7" y="14" width="2" height="2" rx="1" fill="#fff" />
            <rect x="11" y="14" width="2" height="2" rx="1" fill="#fff" />
            <rect x="15" y="14" width="2" height="2" rx="1" fill="#fff" />
            <rect
              x="3"
              y="2"
              width="18"
              height="20"
              rx="3"
              stroke="#fff"
              strokeWidth="2"
            />
          </svg>
        </span>
        <span className="floating-load-calc-btn-label">Load Calculator</span>
      </button>
    </>
  );
};

export default FloatingLoadCalculatorButton;
