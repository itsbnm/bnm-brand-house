"use client";

import { CartProvider } from "./cart";
import { Desk } from "./desk";
import { Footer } from "./footer";
import { Header } from "./header";

export function SiteFrame({ children }: { children: React.ReactNode }) {
  return (
    <CartProvider>
      <a href="#content" className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:bg-card focus:px-3 focus:py-2">
        Skip to content
      </a>
      <Header />
      <main id="content" className="flex-1 pb-24">
        {children}
      </main>
      <Footer />
      <Desk />
    </CartProvider>
  );
}
