import type { Metadata } from "next";
import { studio } from "@/lib/content";

export const metadata: Metadata = { title: "Refunds" };

export default function RefundsPage() {
  return (
    <article className="mx-auto max-w-3xl px-5 py-14">
      <p className="text-xs tracking-[0.18em] text-muted uppercase">Refunds</p>
      <h1 className="mt-3 text-5xl">When a payment can come back.</h1>
      <div className="mt-8 grid gap-4 text-base leading-8 text-muted">
        <p>
          Write to {studio.email} with the reference. Refunds go back through Paystack to the card that paid, once the studio approves them.
        </p>
        <p>
          A ready-made item can be cancelled for a refund before it has been handed over or dispatched. After dispatch, contact the studio and keep the parcel until the next step is agreed.
        </p>
        <p>
          A consultation can be moved, or refunded, if you write at least one weekday before the session. Inside that window the fee is kept, unless the studio cancels.
        </p>
        <p>
          A paid resource can be refunded if you have not opened it after payment. Once it has been opened in the browser, it is not refunded. Fixed service packages start when the studio confirms the brief. Work already done inside an agreed scope is not refunded in full. Custom print is not charged on this site until the studio accepts the estimate, and that acceptance is the point a production fee can be kept.
        </p>
      </div>
    </article>
  );
}
