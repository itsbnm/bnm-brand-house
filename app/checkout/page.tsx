import type { Metadata } from "next";
import { Suspense } from "react";
import { CheckoutForm } from "@/components/checkout-form";
import { PageIntro } from "@/components/ui";

export const metadata: Metadata = { title: "Checkout" };

export default function CheckoutPage() {
  return (
    <div className="mx-auto max-w-6xl px-5 py-14">
      <PageIntro
        eyebrow="Checkout"
        title="Reserve it. The reference is the receipt."
        text="Prices are checked again on the server. Paystack is the card rail for local and international payments once the studio keys are connected."
      />
      <div className="mt-8">
        <Suspense fallback={<p className="text-muted">Preparing checkout…</p>}>
          <CheckoutForm mode="checkout" />
        </Suspense>
      </div>
    </div>
  );
}
