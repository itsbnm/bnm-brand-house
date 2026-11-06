import type { Metadata } from "next";
import { Suspense } from "react";
import { ConfirmedView } from "@/components/confirmed-view";

export const metadata: Metadata = { title: "Confirmation" };

export default function ConfirmedPage() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-14">
      <p className="text-xs tracking-[0.18em] text-gold uppercase">Confirmation</p>
      <h1 className="mt-3 text-5xl">You are on the books.</h1>
      <Suspense fallback={<p className="mt-8 text-muted">Loading…</p>}>
        <ConfirmedView />
      </Suspense>
    </div>
  );
}
