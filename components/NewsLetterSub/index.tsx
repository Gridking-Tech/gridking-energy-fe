"use client";

import { useState } from "react";
import toast from "react-hot-toast";

const NewsletterSubscription = () => {
  const [email, setEmail] = useState("");
  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubscribe = () => {
    toast.success("You have subscribed successfully!");
    setEmail("");
  };

  return (
    <div
      style={{
        backgroundImage: `url(/assets/placeholders/footer-bg.png)`,
        backgroundSize: "contain no-repeat",
      }}
      className="text-white p-4 md:p-28 rounded-sm max-w-6xl mx-auto border-4 border-[#F47A2B]"
    >
      <h3 className="text-4xl mb-4 text-center">Subscribe To Our Newsletter</h3>
      <p className="text-xs mb-6 text-center">
        Subscribe to get the latest updates on solar innovations, energy-saving
        tips, exclusive offers, and more — straight to your inbox!
      </p>
      {/* Responsive input/button arrangement */}
      <div className="w-full flex flex-col sm:flex-row justify-center items-center gap-2">
        <div className="relative w-full max-w-xs">
          <input
            type="email"
            placeholder="Enter your email address"
            className="p-3 pr-24 w-full text-black bg-white rounded border-none outline-none"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {/* Button inside input for md+, below for mobile */}
          <button
            className="hidden sm:block absolute top-1/2 -translate-y-1/2 right-2 bg-[#F47A2B] text-white p-2 rounded-sm font-bold uppercase cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={!isValidEmail(email)}
            onClick={handleSubscribe}
          >
            Subscribe
          </button>
        </div>
        <button
          className="block sm:hidden w-full bg-[#F47A2B] text-white p-2 rounded-sm font-bold uppercase cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={!isValidEmail(email)}
          onClick={handleSubscribe}
        >
          Subscribe
        </button>
      </div>
    </div>
  );
};

export default NewsletterSubscription;
