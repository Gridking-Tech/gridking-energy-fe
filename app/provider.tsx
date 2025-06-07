"use client";
import "./globals.css";
import QueryProvider from "../shared/QueryProvider";
import { ThemeProvider, CheckoutProvider } from "./context";
import Footer from "@/shared/Footer/Footer";
import CheckoutItems from "@/components/CheckOutItems";

export default function Provider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ThemeProvider>
      <QueryProvider>
        <CheckoutProvider>
          <CheckoutItems />
          {children}
          <Footer />
        </CheckoutProvider>
      </QueryProvider>
    </ThemeProvider>
  );
}
