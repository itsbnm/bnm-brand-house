"use client";

import { useEffect, useState } from "react";
import { money } from "@/lib/money";
import type { StudioData } from "@/lib/types";
import { inputClass } from "./ui";

export function AdminApp() {
  const [authed, setAuthed] = useState<boolean | null>(null);
  const [data, setData] = useState<StudioData | null>(null);
  const [error, setError] = useState("");
  const [password, setPassword] = useState("");

  async function load() {
    const response = await fetch("/api/admin");
    if (response.status === 401) {
      setAuthed(false);
      return;
    }
    setData(await response.json());
    setAuthed(true);
  }

  useEffect(() => {
    const timer = window.setTimeout(() => {
      void load();
    }, 0);
    return () => window.clearTimeout(timer);
  }, []);

  async function login(event: React.FormEvent) {
    event.preventDefault();
    setError("");
    const response = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    if (!response.ok) {
      setError("That password is not recognised.");
      return;
    }
    setPassword("");
    await load();
  }

  async function patch(action: string, id: string, status: string) {
    const response = await fetch("/api/admin", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action, id, status }),
    });
    if (response.ok) setData(await response.json());
  }

  async function publish(formData: FormData) {
    const response = await fetch("/api/admin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: formData.get("title"),
        category: formData.get("category"),
        excerpt: formData.get("excerpt"),
        body: formData.get("body"),
      }),
    });
    const payload = await response.json();
    if (!response.ok) {
      setError(payload.error || "The article was not published.");
      return;
    }
    setError("");
    await load();
  }

  if (authed === null) return <p className="mt-8 text-muted">Opening the desk…</p>;

  if (!authed) {
    return (
      <form onSubmit={login} className="mt-8 max-w-md rounded-3xl border border-line bg-card p-6">
        <label className="block text-sm">
          Studio password
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className={inputClass}
          />
        </label>
        {error ? <p className="mt-3 text-sm text-gold">{error}</p> : null}
        <button className="mt-4 rounded-full bg-ink px-5 py-2.5 text-sm text-paper">Enter</button>
      </form>
    );
  }

  if (!data) return null;

  return (
    <div className="mt-8 grid gap-8">
      <div className="flex justify-end">
        <button
          className="text-sm text-muted"
          onClick={async () => {
            await fetch("/api/admin/logout", { method: "POST" });
            setAuthed(false);
            setData(null);
          }}
        >
          Sign out
        </button>
      </div>
      <Section title="Orders">
        {data.orders.length === 0 ? <Empty /> : data.orders.map((order) => (
          <Row
            key={order.id}
            title={`${order.reference} · ${order.customer.name}`}
            meta={`${money(order.total)} · ${order.lines.map((line) => line.name).join(", ")} · ${order.customer.email}`}
            status={order.status}
            options={["reserved", "paid", "fulfilled", "cancelled"]}
            onChange={(status) => patch("order", order.id, status)}
          />
        ))}
      </Section>
      <Section title="Consultations">
        {data.bookings.length === 0 ? <Empty /> : data.bookings.map((booking) => (
          <Row
            key={booking.id}
            title={`${booking.reference} · ${booking.slotLabel}`}
            meta={`${booking.customer.name} · ${booking.audience} · ${booking.focus}`}
            status={booking.status}
            options={["reserved", "paid", "done", "cancelled"]}
            onChange={(status) => patch("booking", booking.id, status)}
          />
        ))}
      </Section>
      <Section title="Enquiries and print requests">
        {data.enquiries.length === 0 ? <Empty /> : data.enquiries.map((enquiry) => (
          <Row
            key={enquiry.id}
            title={`${enquiry.reference} · ${enquiry.topic}`}
            meta={`${enquiry.customer.name} · ${enquiry.customer.email} · ${enquiry.message}${
              enquiry.estimate ? ` · Estimate ${money(enquiry.estimate.low)}–${money(enquiry.estimate.high)}` : ""
            }`}
            status={enquiry.status}
            options={["new", "reviewing", "closed"]}
            onChange={(status) => patch("enquiry", enquiry.id, status)}
          />
        ))}
      </Section>
      <Section title="Feedback">
        {data.testimonials.length === 0 ? <Empty /> : data.testimonials.map((item) => (
          <Row
            key={item.id}
            title={item.name}
            meta={`${item.role} · ${item.quote}`}
            status={item.status}
            options={["pending", "approved", "rejected"]}
            onChange={(status) => patch("testimonial", item.id, status)}
          />
        ))}
      </Section>
      <section className="rounded-3xl border border-line bg-card p-6">
        <h2 className="text-2xl">Publish an article</h2>
        <form action={publish} className="mt-4 grid gap-3">
          <input name="title" placeholder="Title" className={inputClass} required />
          <input name="category" placeholder="Category" className={inputClass} defaultValue="Studio" />
          <input name="excerpt" placeholder="Short summary" className={inputClass} />
          <textarea name="body" placeholder="One paragraph per block" rows={6} className={inputClass} required />
          <button className="rounded-full bg-ink px-5 py-2.5 text-sm text-paper">Publish</button>
        </form>
        {error ? <p className="mt-3 text-sm text-gold">{error}</p> : null}
        <ul className="mt-4 text-sm text-muted">
          {data.articles.map((article) => (
            <li key={article.id}>{article.title}</li>
          ))}
        </ul>
      </section>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="text-2xl">{title}</h2>
      <div className="mt-3 grid gap-3">{children}</div>
    </section>
  );
}

function Empty() {
  return <p className="text-sm text-muted">Nothing here yet.</p>;
}

function Row({
  title,
  meta,
  status,
  options,
  onChange,
}: {
  title: string;
  meta: string;
  status: string;
  options: string[];
  onChange: (status: string) => void;
}) {
  return (
    <article className="rounded-2xl border border-line bg-card p-4">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h3 className="text-lg">{title}</h3>
          <p className="mt-1 text-sm leading-6 text-muted">{meta}</p>
        </div>
        <select className="rounded-md border border-line bg-paper px-2 py-1 text-sm" value={status} onChange={(event) => onChange(event.target.value)}>
          {options.map((option) => (
            <option key={option}>{option}</option>
          ))}
        </select>
      </div>
    </article>
  );
}
