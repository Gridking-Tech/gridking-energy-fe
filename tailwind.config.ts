import type { Config } from "tailwindcss";

export default {
    darkMode: ["class", 'media'],
    content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./contants/**/*.{js,ts,jsx,tsx,mdx}",
    "./shared/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	extend: {
  	
  		backgroundImage: {
        'hero-bg': "url('/assets/placeholders/hero-Bg.png')",
      },
  	}
  },
  plugins: [require("tw-animate-css")],
} satisfies Config;
