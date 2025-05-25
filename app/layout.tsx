import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Provider from "./provider";
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
  title: "Gridking",
  description: "Gridking Technologies",
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
