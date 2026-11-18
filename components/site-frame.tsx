"use client";

import { CartProvider } from "./cart";
import { Desk } from "./desk";
import { Footer } from "./footer";
import { Header } from "./header";
import { StoryNext } from "./story-next";

export function SiteFrame({ children }: { children: React.ReactNode }) {
  return (
    <CartProvider>
      <a href="#content" className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:rounded-full focus:bg-white focus:px-4 focus:py-2 focus:shadow">
        Skip to content
      </a>
      <Header />
      <main id="content" className="flex-1 pb-24">
        {children}
      </main>
      <StoryNext />
      <Footer />
      <Desk />
    </CartProvider>
  );
}
