import type { Metadata } from "next";
import { Suspense } from "react";
import { CheckoutForm } from "@/components/checkout-form";
import { PageIntro } from "@/components/ui";

export const metadata: Metadata = { title: "Cart" };

export default function CartPage() {
  return (
    <div className="mx-auto max-w-6xl px-5 py-14">
      <PageIntro eyebrow="Cart" title="Ready-made goods, held on this browser." text="Services and resources reserve from their own pages. They do not sit in this cart." />
      <div className="mt-8">
        <Suspense fallback={<p className="text-muted">Opening the cart…</p>}>
          <CheckoutForm mode="cart" />
        </Suspense>
      </div>
    </div>
  );
}
