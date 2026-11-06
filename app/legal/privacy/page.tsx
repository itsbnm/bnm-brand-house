import type { Metadata } from "next";
import { studio } from "@/lib/content";

export const metadata: Metadata = { title: "Privacy" };

export default function PrivacyPage() {
  return (
    <article className="mx-auto max-w-3xl px-5 py-14">
      <p className="text-xs tracking-[0.18em] text-muted uppercase">Privacy</p>
      <h1 className="mt-3 text-5xl">What the studio keeps.</h1>
      <div className="mt-8 grid gap-4 text-base leading-8 text-muted">
        <p>
          Checkout, consultation booking, contact, custom-print estimates, and feedback ask for a name, an email, a phone number, and the note you write. The cart and paid-resource access stay in this browser. The studio desk stores orders, bookings, enquiries, and unpublished feedback so the work can be fulfilled.
        </p>
        <p>
          Card details are entered on Paystack, not on this site. Paystack receives the email, the amount, the reference, and a short summary of what was bought. The studio uses that payment record to mark an order paid.
        </p>
        <p>
          The site does not run an advertising tracker. The studio uses the details to reply, deliver, and keep a record of the sale. They are not sold. Write to {studio.email} to ask what is held against your email, or to ask for a record to be corrected.
        </p>
        <p>
          {studio.name}, Lagos. {studio.phone}. {studio.hours}.
        </p>
      </div>
    </article>
  );
}
