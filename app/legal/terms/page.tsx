import type { Metadata } from "next";
import { studio } from "@/lib/content";

export const metadata: Metadata = { title: "Terms" };

export default function TermsPage() {
  return (
    <article className="mx-auto max-w-3xl px-5 py-14">
      <p className="text-xs tracking-[0.18em] text-muted uppercase">Terms</p>
      <h1 className="mt-3 text-5xl">How an order with the studio works.</h1>
      <div className="mt-8 grid gap-4 text-base leading-8 text-muted">
        <p>
          {studio.name} sells fixed services, a $250 consultation, ready-made goods, and paid resources from this site. Custom and bulk print is an estimate until the studio confirms it in writing. A catalogue price is the price the server charges. A typed price in the browser is ignored.
        </p>
        <p>
          Card payments run through Paystack. The studio does not store card numbers. An order is paid when Paystack confirms it, or when the studio marks a reserved reference paid. Goods are prepared after that confirmation. A consultation time is held when the booking is saved and is confirmed as paid when the charge succeeds.
        </p>
        <p>
          Ready-made goods can be collected in Lagos or delivered inside Nigeria at the fee shown at checkout. Lead times on each product are working-day estimates, not a guaranteed delivery date. Identity, strategy, PR, outdoor, and website packages follow the scope on the service page. Strategy is not included in a visual package unless that page says so.
        </p>
        <p>
          The portfolio on this site is representative work, written so client confidentiality is kept. It is not a claim that those names are current public clients. Feedback is published only after the studio approves it.
        </p>
        <p>
          Questions go to {studio.email} or {studio.phone}, {studio.hours}, Lagos.
        </p>
      </div>
    </article>
  );
}
