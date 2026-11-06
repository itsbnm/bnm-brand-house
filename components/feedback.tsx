"use client";

import { useEffect, useState } from "react";
import type { Testimonial } from "@/lib/types";
import { Field, inputClass } from "./ui";

export function FeedbackWall() {
  const [items, setItems] = useState<Testimonial[]>([]);
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/testimonials")
      .then((response) => response.json())
      .then((data) => setItems(data.testimonials || []))
      .catch(() => setItems([]));
  }, []);

  async function submit(formData: FormData) {
    setError("");
    const response = await fetch("/api/testimonials", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: formData.get("name"),
        role: formData.get("role"),
        quote: formData.get("quote"),
        company: formData.get("company"),
      }),
    });
    const data = await response.json();
    if (!response.ok) {
      setError(data.error || "Could not save that.");
      return;
    }
    setDone(true);
  }

  return (
    <div className="mt-10 grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
      <div>
        {items.length === 0 ? (
          <p className="rounded-3xl border border-line bg-card p-6 text-muted">
            Approved client words will appear here. Nothing is published until the studio reviews it.
          </p>
        ) : (
          <ul className="grid gap-4">
            {items.map((item) => (
              <li key={item.id} className="rounded-3xl border border-line bg-card p-6">
                <blockquote className="text-lg leading-8">“{item.quote}”</blockquote>
                <p className="mt-3 text-sm text-muted">
                  {item.name}
                  {item.role ? ` · ${item.role}` : ""}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>
      {done ? (
        <p className="rounded-3xl border border-line bg-card p-6">
          Thank you. This stays off the site until it is approved.
        </p>
      ) : (
        <form action={submit} className="rounded-3xl border border-line bg-card p-6">
          <h2 className="text-2xl">Leave feedback</h2>
          <div className="mt-4 grid gap-3">
            <Field label="Name">
              <input required name="name" className={inputClass} />
            </Field>
            <Field label="Role or company">
              <input name="role" className={inputClass} />
            </Field>
            <Field label="What should a future client know?">
              <textarea required name="quote" minLength={20} rows={5} className={inputClass} />
            </Field>
            <input name="company" className="hidden" tabIndex={-1} autoComplete="off" />
          </div>
          {error ? <p className="mt-3 text-sm text-gold">{error}</p> : null}
          <button className="mt-4 rounded-full bg-ink px-5 py-2.5 text-sm text-paper">Submit for review</button>
        </form>
      )}
    </div>
  );
}
