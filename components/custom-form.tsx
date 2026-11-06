"use client";

import { useMemo, useState } from "react";
import { money } from "@/lib/money";
import { estimatePrint, printProducts } from "@/lib/quote";
import { Field, inputClass } from "./ui";

export function CustomForm() {
  const [product, setProduct] = useState<string>("tee");
  const [quantity, setQuantity] = useState(50);
  const [sides, setSides] = useState<1 | 2>(1);
  const [rush, setRush] = useState(false);
  const [done, setDone] = useState("");
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);
  const estimate = useMemo(
    () => estimatePrint({ product, quantity, sides, rush }),
    [product, quantity, sides, rush],
  );

  async function submit(formData: FormData) {
    setPending(true);
    setError("");
    const response = await fetch("/api/enquiries", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        kind: "custom",
        name: formData.get("name"),
        email: formData.get("email"),
        phone: formData.get("phone"),
        message: formData.get("message"),
        company: formData.get("company"),
        product,
        quantity,
        sides,
        rush,
      }),
    });
    const data = await response.json();
    setPending(false);
    if (!response.ok) {
      setError(data.error || "The request could not be sent.");
      return;
    }
    setDone(data.reference);
  }

  if (done) {
    return (
      <div className="rounded-3xl border border-line bg-card p-6">
        <p className="text-xs tracking-[0.18em] text-gold uppercase">Request received</p>
        <h2 className="mt-2 text-3xl">{done}</h2>
        <p className="mt-3 leading-7 text-muted">
          The studio has the brief and the estimate of {money(estimate.low)}–{money(estimate.high)}. Nothing is produced until a person confirms the quote. Reply to the studio email if your artwork is ready.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <form action={submit} className="rounded-3xl border border-line bg-card p-6">
        <div className="grid gap-3">
          <Field label="Item">
            <select className={inputClass} value={product} onChange={(event) => setProduct(event.target.value)}>
              {printProducts.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.label}
                </option>
              ))}
            </select>
          </Field>
          <Field label="Quantity">
            <input
              type="number"
              min={1}
              className={inputClass}
              value={quantity}
              onChange={(event) => setQuantity(Number(event.target.value))}
            />
          </Field>
          <Field label="Print">
            <select
              className={inputClass}
              value={sides}
              onChange={(event) => setSides(event.target.value === "2" ? 2 : 1)}
            >
              <option value={1}>One side</option>
              <option value={2}>Two sides</option>
            </select>
          </Field>
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" checked={rush} onChange={(event) => setRush(event.target.checked)} />
            Rush production
          </label>
          <Field label="Name">
            <input required name="name" className={inputClass} autoComplete="name" />
          </Field>
          <Field label="Email">
            <input required type="email" name="email" className={inputClass} />
          </Field>
          <Field label="Phone">
            <input name="phone" className={inputClass} />
          </Field>
          <Field label="Deadline, colours, and artwork notes">
            <textarea required name="message" rows={4} className={inputClass} />
          </Field>
          <input name="company" className="hidden" tabIndex={-1} autoComplete="off" />
        </div>
        {error ? <p className="mt-3 text-sm text-gold">{error}</p> : null}
        <button disabled={pending} className="mt-4 rounded-full bg-accent px-5 py-2.5 text-sm text-white disabled:opacity-60">
          {pending ? "Sending…" : "Send the request"}
        </button>
      </form>
      <aside className="rounded-3xl bg-accent p-6 text-[#040113]">
        <p className="text-xs tracking-[0.18em] uppercase">Automated estimate</p>
        <p className="mt-3 text-4xl">
          {money(estimate.low)}–{money(estimate.high)}
        </p>
        <ul className="mt-4 grid gap-2 text-sm leading-6">
          {estimate.assumptions.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </aside>
    </div>
  );
}
