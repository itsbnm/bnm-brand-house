"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { money } from "@/lib/money";
import type { Booking, Order } from "@/lib/types";

export function ConfirmedView() {
  const params = useSearchParams();
  const kind = params.get("kind");
  const id = params.get("id");
  const [order, setOrder] = useState<Order | null>(null);
  const [booking, setBooking] = useState<Booking | null>(null);
  const [error, setError] = useState("");
  const invalid = !id || (kind !== "order" && kind !== "booking");

  useEffect(() => {
    if (invalid || !id) return;
    const path = kind === "order" ? `/api/orders/${id}` : `/api/bookings/${id}`;
    fetch(path)
      .then(async (response) => {
        const data = await response.json();
        if (!response.ok) throw new Error(data.error || "Not found");
        if (kind === "order") setOrder(data);
        else setBooking(data);
      })
      .catch((reason: Error) => setError(reason.message));
  }, [id, kind, invalid]);

  if (invalid) return <p className="mt-8 text-muted">This confirmation is missing a reference.</p>;
  if (error) return <p className="mt-8 text-muted">{error}</p>;
  if (!order && !booking) return <p className="mt-8 text-muted">Fetching the confirmation…</p>;

  if (booking) {
    return (
      <article className="mt-8 rounded-3xl border border-line bg-card p-6">
        <p className="text-xs tracking-[0.18em] text-gold uppercase">Session reserved</p>
        <h2 className="mt-2 text-4xl">{booking.reference}</h2>
        <p className="mt-3 text-lg">{booking.slotLabel}</p>
        <p className="mt-2 text-muted">
          {booking.audience === "personal" ? "Personal brand" : "Business brand"} · {booking.customer.name}
        </p>
        <ul className="mt-6 grid gap-2 text-sm leading-6 text-muted">
          <li>Send the readiness notes to bnmbrandhouse@gmail.com with this reference.</li>
          <li>The session is $250. The studio collects against this reference and marks it paid.</li>
          <li>Come ready to decide the position, the audience, and the single next piece of work.</li>
        </ul>
        <Link href="/resources/readiness-checklist" className="mt-6 inline-block text-gold">
          Open the checklist
        </Link>
      </article>
    );
  }

  if (!order) return null;
  const resource = order.lines.find((line) => line.kind === "resource");
  return (
    <article className="mt-8 rounded-3xl border border-line bg-card p-6">
      <p className="text-xs tracking-[0.18em] text-gold uppercase">Order reserved</p>
      <h2 className="mt-2 text-4xl">{order.reference}</h2>
      <ul className="mt-4 divide-y divide-line text-sm">
        {order.lines.map((line) => (
          <li key={line.id} className="flex justify-between gap-4 py-2">
            <span>
              {line.name} × {line.qty}
              {line.options ? ` · ${line.options}` : ""}
            </span>
            <span>{money(line.unitPrice * line.qty)}</span>
          </li>
        ))}
      </ul>
      <p className="mt-3 flex justify-between">
        <span>Total</span>
        <span>{money(order.total)}</span>
      </p>
      <p className="mt-4 text-sm leading-6 text-muted">
        Keep this reference. Goods are prepared after payment is marked. A service reservation is the brief the studio starts from.
      </p>
      {resource ? (
        <Link href={`/resources/${resource.id}`} className="mt-4 inline-block text-gold">
          Open what you reserved
        </Link>
      ) : null}
    </article>
  );
}
