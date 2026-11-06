import type { Metadata } from "next";
import { AdminApp } from "@/components/admin-app";

export const metadata: Metadata = { title: "Studio desk", robots: { index: false, follow: false } };

export default function AdminPage() {
  return (
    <div className="mx-auto max-w-5xl px-5 py-14">
      <p className="text-xs tracking-[0.18em] text-gold uppercase">Studio</p>
      <h1 className="mt-3 text-5xl">Orders, bookings, and the journal.</h1>
      <p className="mt-4 max-w-2xl text-muted">
        Reserve payments here once they clear. Approve feedback before it is public. Publish a journal note without a developer. Services, products, and the fixed articles live with the site content so prices cannot drift from the rate card by accident.
      </p>
      <AdminApp />
    </div>
  );
}
