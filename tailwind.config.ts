import type { Config } from "tailwindcss";

export default {
  darkMode: ["class", 'media'],
  content: [
  "./pages/**/*.{js,ts,jsx,tsx,mdx}",
  "./components/**/*.{js,ts,jsx,tsx,mdx}",
  "./app/**/*.{js,ts,jsx,tsx,mdx}",
  "./constants/**/*.{js,ts,jsx,tsx,mdx}",
  "./shared/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  extend: {
    backgroundImage: {
    'hero-bg': "url('/assets/placeholders/hero-Bg.png')",
    },
    // Custom screen breakpoints for responsive design - min widths
    screens: {
    xs: '480px',   // Smaller phone size
    sm: '640px',   // Normal phone size
    md: '768px',   // Tablet devices
    lg: '1024px',  // Laptop mini size 
    xl: '1280px',  // Extra large Laptop 
    '2xl': '1536px', // 2x extra large devices
    },
  }
  },
  plugins: [require("tw-animate-css")],
} satisfies Config;
