"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { inputClass } from "./ui";

type Row = {
  id: string;
  name: string;
  email: string;
  project: string;
  status: string;
  startsOn: string;
  days: number;
};

export function ClientDesk() {
  const [rows, setRows] = useState<Row[] | null>(null);
  const [authed, setAuthed] = useState(false);
  const [error, setError] = useState("");

  async function load() {
    const response = await fetch("/api/admin/clients");
    if (response.status === 401) {
      setAuthed(false);
      setRows([]);
      return;
    }
    const data = await response.json();
    setAuthed(true);
    setRows(data.portals || []);
  }

  useEffect(() => {
    const timer = window.setTimeout(() => void load(), 0);
    return () => window.clearTimeout(timer);
  }, []);

  async function create(formData: FormData) {
    setError("");
    const response = await fetch("/api/admin/clients", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: formData.get("name"),
        email: formData.get("email"),
        phone: formData.get("phone"),
        project: formData.get("project"),
        summary: formData.get("summary"),
        startsOn: formData.get("startsOn"),
        days: formData.get("days"),
        weeks: formData.get("weeks"),
        password: formData.get("password"),
      }),
    });
    const data = await response.json();
    if (!response.ok) {
      setError(data.error || "The portal was not opened.");
      return;
    }
    await load();
  }

  if (rows === null) return <p className="mt-8 text-muted">Opening clients…</p>;
  if (!authed) return <p className="mt-8 text-muted">Sign in on the studio desk first.</p>;

  return (
    <div className="mt-8 grid gap-8">
      <form action={create} className="grid gap-3 border border-line p-5">
        <h2 className="text-2xl">Open a portal</h2>
        <p className="text-sm leading-6 text-muted">
          Do this when a consultation becomes a project. The client signs in with the email and password you set here. A later project for the same person gets its own portal.
        </p>
        <input name="name" required placeholder="Client name" className={inputClass} />
        <input name="email" required type="email" placeholder="Email" className={inputClass} />
        <input name="phone" placeholder="Phone or WhatsApp" className={inputClass} />
        <input name="project" required placeholder="Project name" className={inputClass} />
        <textarea name="summary" rows={3} placeholder="What this engagement is for" className={inputClass} />
        <div className="grid gap-3 sm:grid-cols-3">
          <input name="startsOn" type="date" className={inputClass} />
          <input name="days" type="number" min={7} max={365} defaultValue={30} placeholder="Days" className={inputClass} />
          <input name="weeks" type="number" min={1} max={8} defaultValue={4} placeholder="Milestones" className={inputClass} />
        </div>
        <input name="password" required type="text" minLength={8} placeholder="Password to send the client" className={inputClass} />
        {error ? <p className="text-sm text-accent">{error}</p> : null}
        <button className="btn w-fit">Open the portal</button>
      </form>
      <div className="grid gap-3">
        {rows.length === 0 ? <p className="text-muted">No client portals yet.</p> : null}
        {rows.map((row) => (
          <Link key={row.id} href={`/admin/clients/${row.id}`} className="border border-line p-5">
            <p className="text-sm font-semibold text-muted">
              {row.status === "complete" ? "Complete" : "Active"} · {row.days} days
            </p>
            <h2 className="mt-1 text-2xl">{row.project}</h2>
            <p className="mt-1 text-sm text-muted">
              {row.name} · {row.email}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
