"use-client";

import { useState } from "react";

const NewsletterSubscription = () => {
  const [email, setEmail] = useState("");
  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  return (
    <div
      style={{ backgroundImage: `url(/assets/placeholders/footer-Bg.png)` }}
      className="text-white p-28 rounded-sm max-w-6xl mx-auto border-4 border-[#F47A2B]"
    >
      <h3 className="text-4xl mb-4 text-center">Subscribe To Our Newsletter</h3>
      <p className="text-xs mb-6 text-center">
        Subscribe to get the latest updates on solar innovations, energy-saving
        tips, exclusive offers, and more — straight to your inbox!
      </p>
      <div className="relative flex justify-center items-center">
        <input
          type="email"
          placeholder="Enter your email address"
          className="p-3 pr-28 w-full max-w-xs text-black bg-white rounded border-none outline-none"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button
          className="absolute bg-[#F47A2B] text-white p-2 rounded-sm font-bold uppercase right-[18rem] cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={!isValidEmail(email)}
        >
          Subscribe
        </button>
      </div>
    </div>
  );
};

export default NewsletterSubscription;
