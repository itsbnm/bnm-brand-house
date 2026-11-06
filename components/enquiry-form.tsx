"use client";

import { useState } from "react";
import { services } from "@/lib/content";
import { Field, inputClass } from "./ui";

export function EnquiryForm({ initialTopic = "General enquiry" }: { initialTopic?: string }) {
  const [done, setDone] = useState("");
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  async function submit(formData: FormData) {
    setPending(true);
    setError("");
    const topic = String(formData.get("topic") || "General enquiry");
    const response = await fetch("/api/enquiries", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        kind: topic === "General enquiry" ? "general" : "service",
        topic,
        name: formData.get("name"),
        email: formData.get("email"),
        phone: formData.get("phone"),
        message: formData.get("message"),
        company: formData.get("company"),
      }),
    });
    const data = await response.json();
    setPending(false);
    if (!response.ok) {
      setError(data.error || "The message could not be sent.");
      return;
    }
    setDone(data.reference);
  }

  if (done) {
    return (
      <div className="rounded-3xl border border-line bg-card p-6">
        <p className="text-xs tracking-[0.18em] text-gold uppercase">Received</p>
        <h2 className="mt-2 text-3xl">{done}</h2>
        <p className="mt-3 text-muted">The studio inbox has this. Keep the reference if you write again.</p>
      </div>
    );
  }

  return (
    <form action={submit} className="rounded-3xl border border-line bg-card p-6">
      <div className="grid gap-3">
        <Field label="This is about">
          <select name="topic" className={inputClass} defaultValue={initialTopic}>
            <option>General enquiry</option>
            {services.map((service) => (
              <option key={service.slug}>{service.name}</option>
            ))}
            <option>Website with a deadline</option>
            <option>Custom printing</option>
          </select>
        </Field>
        <Field label="Name">
          <input required name="name" className={inputClass} autoComplete="name" />
        </Field>
        <Field label="Email">
          <input required type="email" name="email" className={inputClass} />
        </Field>
        <Field label="Phone">
          <input name="phone" className={inputClass} />
        </Field>
        <Field label="What do you need, and by when?">
          <textarea required name="message" rows={5} className={inputClass} />
        </Field>
        <input name="company" className="hidden" tabIndex={-1} autoComplete="off" />
      </div>
      {error ? <p className="mt-3 text-sm text-gold">{error}</p> : null}
      <button disabled={pending} className="mt-4 rounded-full bg-accent px-5 py-2.5 text-sm text-white disabled:opacity-60">
        {pending ? "Sending…" : "Send to the studio"}
      </button>
    </form>
  );
}
