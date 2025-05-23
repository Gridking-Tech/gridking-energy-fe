"use client";
import "./globals.css";
import QueryProvider from "../shared/QueryProvider";
import { ThemeProvider, CheckoutProvider } from "./context";
import Footer from "@/shared/Footer/Footer";
import DesktopHeader from "@/shared/Header";
import CheckoutItems from "@/components/CheckOutItems";
// Satoshi

export default function Provider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <QueryProvider>
      <ThemeProvider>
        <CheckoutProvider> 
          <CheckoutItems />
        <DesktopHeader />
        {children}
        <Footer />
        </CheckoutProvider>
      </ThemeProvider>
    </QueryProvider>
  );
}
