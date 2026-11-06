"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import { findOffer, findProduct, findResource } from "@/lib/catalogue";
import { money } from "@/lib/money";
import { useCart } from "./cart";
import { Field, inputClass } from "./ui";

type Draft = { kind: "product" | "service" | "resource"; id: string; qty: number; options?: string };

export function CheckoutForm({ mode }: { mode: "cart" | "checkout" }) {
  const params = useSearchParams();
  const router = useRouter();
  const cart = useCart();
  const offer = params.get("offer");
  const resource = params.get("resource");
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);
  const [delivery, setDelivery] = useState("pickup");

  const drafts = useMemo<Draft[]>(() => {
    if (offer) return [{ kind: "service", id: offer, qty: 1 }];
    if (resource) return [{ kind: "resource", id: resource, qty: 1 }];
    return cart.lines.map((line) => ({ kind: "product" as const, id: line.id, qty: line.qty, options: line.options }));
  }, [offer, resource, cart.lines]);

  const rows = drafts
    .map((draft) => {
      if (draft.kind === "product") {
        const product = findProduct(draft.id);
        return product ? { ...draft, name: product.name, price: product.price } : null;
      }
      if (draft.kind === "service") {
        const match = findOffer(draft.id);
        return match?.offer.price != null
          ? { ...draft, name: `${match.service.name}: ${match.offer.name}`, price: match.offer.price }
          : null;
      }
      const item = findResource(draft.id);
      return item && item.price > 0 ? { ...draft, name: item.title, price: item.price } : null;
    })
    .filter((row) => row !== null);

  const hasProduct = rows.some((row) => row.kind === "product");
  const fee = !hasProduct ? 0 : delivery === "lagos" ? 12 : delivery === "nigeria" ? 25 : 0;
  const total = rows.reduce((sum, row) => sum + row.price * row.qty, 0) + fee;

  async function submit(formData: FormData) {
    setError("");
    setPending(true);
    const response = await fetch("/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: formData.get("name"),
        email: formData.get("email"),
        phone: formData.get("phone"),
        note: formData.get("note"),
        company: formData.get("company"),
        delivery,
        lines: rows.map((row) => ({ kind: row.kind, id: row.id, qty: row.qty, options: row.options })),
      }),
    });
    const data = await response.json();
    setPending(false);
    if (!response.ok) {
      setError(data.error || "The order could not be reserved.");
      return;
    }
    if (hasProduct && !offer && !resource) cart.clear();
    if (rows.some((row) => row.kind === "resource")) {
      const owned = JSON.parse(localStorage.getItem("bnm-resources") || "[]") as string[];
      const next = Array.from(new Set([...owned, ...rows.filter((row) => row.kind === "resource").map((row) => row.id)]));
      localStorage.setItem("bnm-resources", JSON.stringify(next));
    }
    router.push(`/confirmed?kind=order&id=${data.id}`);
  }

  if (mode === "cart" && (offer || resource)) {
    return null;
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
      <div>
        {rows.length === 0 ? (
          <div className="rounded-3xl border border-line bg-card p-6">
            <p>There is nothing to reserve yet.</p>
            <div className="mt-4 flex gap-4 text-sm">
              <Link href="/shop" className="text-gold">
                Shop
              </Link>
              <Link href="/services" className="text-gold">
                Services
              </Link>
            </div>
          </div>
        ) : (
          <ul className="divide-y divide-line rounded-3xl border border-line bg-card">
            {rows.map((row, index) => (
              <li key={`${row.id}-${index}`} className="flex items-start justify-between gap-4 px-5 py-4">
                <div>
                  <p>{row.name}</p>
                  {row.options ? <p className="text-sm text-muted">{row.options}</p> : null}
                  {mode === "cart" && row.kind === "product" ? (
                    <label className="mt-2 block text-sm text-muted">
                      Quantity
                      <input
                        type="number"
                        min={0}
                        max={99}
                        value={row.qty}
                        className="mt-1 w-20 rounded-md border border-line bg-paper px-2 py-1"
                        onChange={(event) => cart.update(index, Number(event.target.value))}
                      />
                    </label>
                  ) : (
                    <p className="text-sm text-muted">Qty {row.qty}</p>
                  )}
                </div>
                <p>{money(row.price * row.qty)}</p>
              </li>
            ))}
          </ul>
        )}
        {mode === "cart" && rows.length > 0 ? (
          <Link href="/checkout" className="mt-4 inline-flex rounded-full bg-ink px-5 py-2.5 text-sm text-paper">
            Continue to checkout
          </Link>
        ) : null}
      </div>
      {mode === "checkout" && rows.length > 0 ? (
        <form action={submit} className="rounded-3xl border border-line bg-card p-6">
          <h2 className="text-2xl">Reserve</h2>
          <p className="mt-2 text-sm leading-6 text-muted">
            This reserves the order in the studio and issues a reference. Paystack will charge local and international cards once the studio account is connected. Until then, the team collects against this reference.
          </p>
          <div className="mt-4 grid gap-3">
            <Field label="Name">
              <input required name="name" className={inputClass} autoComplete="name" />
            </Field>
            <Field label="Email">
              <input required type="email" name="email" className={inputClass} autoComplete="email" />
            </Field>
            <Field label="Phone">
              <input required name="phone" className={inputClass} autoComplete="tel" />
            </Field>
            {hasProduct ? (
              <Field label="Delivery">
                <select className={inputClass} value={delivery} onChange={(event) => setDelivery(event.target.value)}>
                  <option value="pickup">Collect in Lagos · free</option>
                  <option value="lagos">Lagos delivery · $12</option>
                  <option value="nigeria">Rest of Nigeria · $25</option>
                </select>
              </Field>
            ) : null}
            <Field label="Note for the studio">
              <textarea name="note" rows={3} className={inputClass} />
            </Field>
            <input name="company" className="hidden" tabIndex={-1} autoComplete="off" />
          </div>
          <p className="mt-4 flex justify-between text-sm">
            <span>Total</span>
            <span>{money(total)}</span>
          </p>
          {error ? <p className="mt-3 text-sm text-gold">{error}</p> : null}
          <button
            type="submit"
            disabled={pending}
            className="mt-4 w-full rounded-full bg-ink px-5 py-2.5 text-sm text-paper disabled:opacity-60"
          >
            {pending ? "Reserving…" : `Reserve · ${money(total)}`}
          </button>
        </form>
      ) : null}
    </div>
  );
}
