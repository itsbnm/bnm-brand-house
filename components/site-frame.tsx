"use client";

import { Suspense } from "react";
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
      <Suspense fallback={<div className="min-h-[52px] border-b border-black/[0.08]" />}>
        <Header />
      </Suspense>
      <main id="content" className="flex-1 pb-24">
        {children}
      </main>
      <Suspense fallback={null}>
        <StoryNext />
      </Suspense>
      <Footer />
      <Desk />
    </CartProvider>
  );
}
