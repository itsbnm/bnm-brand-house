"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import type { Slot } from "@/lib/slots";
import { Field, inputClass } from "./ui";

export function ConsultBooker() {
  const router = useRouter();
  const [slots, setSlots] = useState<Slot[]>([]);
  const [slotId, setSlotId] = useState("");
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  useEffect(() => {
    fetch("/api/bookings")
      .then((response) => response.json())
      .then((data) => {
        setSlots(data.slots || []);
        setSlotId(data.slots?.[0]?.id || "");
      })
      .catch(() => setError("The calendar could not load. Refresh and try again."));
  }, []);

  async function submit(formData: FormData) {
    setPending(true);
    setError("");
    const response = await fetch("/api/bookings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: formData.get("name"),
        email: formData.get("email"),
        phone: formData.get("phone"),
        audience: formData.get("audience"),
        focus: formData.get("focus"),
        slotId,
        company: formData.get("company"),
      }),
    });
    const data = await response.json();
    setPending(false);
    if (!response.ok) {
      setError(data.error || "That time could not be held.");
      if (response.status === 409) {
        const fresh = await fetch("/api/bookings").then((item) => item.json());
        setSlots(fresh.slots || []);
        setSlotId(fresh.slots?.[0]?.id || "");
      }
      return;
    }
    if (data.authorizationUrl) {
      window.location.href = data.authorizationUrl;
      return;
    }
    router.push(`/confirmed?kind=booking&id=${data.id}`);
  }

  return (
    <form action={submit} className="rounded-3xl border border-line bg-card p-6">
      <h2 className="text-2xl">Choose a time</h2>
      <p className="mt-2 text-sm leading-6 text-muted">Weekday sessions at 10:00, 13:00, and 16:00 WAT. $250, charged on Paystack when the studio key is connected.</p>
      <div className="mt-4 grid gap-2 sm:grid-cols-2">
        {slots.map((slot) => (
          <label key={slot.id} className={`rounded-xl border px-3 py-2 text-sm ${slotId === slot.id ? "border-ink" : "border-line"}`}>
            <input
              type="radio"
              name="slot"
              className="mr-2"
              checked={slotId === slot.id}
              onChange={() => setSlotId(slot.id)}
            />
            {slot.label}
          </label>
        ))}
      </div>
      {slots.length === 0 && !error ? <p className="mt-3 text-sm text-muted">Loading open times…</p> : null}
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
        <Field label="This brand is">
          <select name="audience" className={inputClass} defaultValue="business">
            <option value="personal">A personal brand</option>
            <option value="business">A business brand</option>
          </select>
        </Field>
        <Field label="What should the session decide?">
          <textarea required name="focus" rows={4} className={inputClass} />
        </Field>
        <input name="company" className="hidden" tabIndex={-1} autoComplete="off" />
      </div>
      {error ? <p className="mt-3 text-sm text-gold">{error}</p> : null}
      <button type="submit" disabled={pending || !slotId} className="mt-4 rounded-full bg-accent px-5 py-2.5 text-sm text-white disabled:opacity-60">
        {pending ? "Opening payment…" : "Pay $250 and hold this time"}
      </button>
    </form>
  );
}
