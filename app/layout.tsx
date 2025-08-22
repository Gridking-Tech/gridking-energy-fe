import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Provider from "./provider";
import FloatingLoadCalculatorButton from "@/components/FloatingLoadCalculatorButton";
import { Toaster } from "react-hot-toast";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Gridking | Clean Energy Solutions",
    template: "%s | Gridking",
  },
  description:
    "Gridking Technologies - Next-gen clean energy company focused on photovoltaic power generation and energy storage tech. Solar solutions for homes and businesses.",
  keywords: [
    "Gridking",
    "solar",
    "clean energy",
    "photovoltaic",
    "energy storage",
    "renewable energy",
    "solar panels",
    "inverters",
    "Nigeria",
    "Africa",
  ],
  openGraph: {
    title: "Gridking | Clean Energy Solutions",
    description:
      "Next-gen clean energy company focused on photovoltaic power generation and energy storage tech. Solar solutions for homes and businesses.",
    url: "https://www.gridking.africa/",
    siteName: "Gridking",
    images: [
      {
        url: "/assets/placeholders/GD001.png",
        width: 1200,
        height: 630,
        alt: "Gridking Solar Solutions",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Gridking | Clean Energy Solutions",
    description:
      "Next-gen clean energy company focused on photovoltaic power generation and energy storage tech. Solar solutions for homes and businesses.",
    images: ["/assets/placeholders/GD001.png"],
  },
  metadataBase: new URL("https://www.gridking.africa"),
};

function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Toaster
          toastOptions={{
            duration: 5000,
            style: toastBaseStyle,
            success: {
              style: toastSuccessStyle,
              duration: 5000,
            },
            error: {
              style: toastErrorStyle,
              duration: 5000,
            },
          }}
          position="top-right"
          gutter={16}
        />
        <FloatingLoadCalculatorButton />
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}

export default RootLayout;

const toastBaseStyle = {
  fontSize: "1rem",
  padding: "16px 24px",
  borderRadius: "8px",
  background: "#222",
  color: "#fff",
  minWidth: "250px",
};

const toastSuccessStyle = {
  background: "#16a34a",
  color: "#fff",
};

const toastErrorStyle = {
  background: "#dc2626",
  color: "#fff",
};
