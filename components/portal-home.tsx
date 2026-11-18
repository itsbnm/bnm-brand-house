"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { inputClass } from "./ui";

type Card = { id: string; project: string; status: string; startsOn: string; days: number };

export function PortalHome() {
  const [portals, setPortals] = useState<Card[] | null>(null);
  const [signedIn, setSignedIn] = useState(false);
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  async function load() {
    const response = await fetch("/api/portal");
    if (response.status === 401) {
      setSignedIn(false);
      setPortals([]);
      return;
    }
    const data = await response.json();
    setSignedIn(true);
    setPortals(data.portals || []);
  }

  useEffect(() => {
    const timer = window.setTimeout(() => void load(), 0);
    return () => window.clearTimeout(timer);
  }, []);

  async function login(formData: FormData) {
    setPending(true);
    setError("");
    const response = await fetch("/api/portal/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: formData.get("email"), password: formData.get("password") }),
    });
    const data = await response.json();
    setPending(false);
    if (!response.ok) {
      setError(data.error || "Sign-in did not go through.");
      return;
    }
    await load();
  }

  async function logout() {
    await fetch("/api/portal/logout", { method: "POST" });
    setSignedIn(false);
    setPortals([]);
  }

  if (portals === null) return <p className="text-muted">Opening your portal…</p>;

  return (
    <div className="mx-auto max-w-3xl">
      <p className="eyebrow">Client portal</p>
      <h1 className="mt-4 text-5xl">Your work with the studio.</h1>
      <p className="mt-4 text-lg leading-8 text-muted">
        Milestones, documents, requests, meeting summaries, and the record of WhatsApp, email, and calls. It stays here after the project ends.
      </p>
      {signedIn ? (
        <div className="mt-8 grid gap-3">
          {portals.map((portal) => (
            <Link key={portal.id} href={`/portal/${portal.id}`} className="border border-line p-5">
              <p className="text-sm font-semibold text-muted">{portal.status === "complete" ? "Complete" : "Active"}</p>
              <h2 className="mt-1 text-2xl">{portal.project}</h2>
            </Link>
          ))}
          <button type="button" className="more w-fit" onClick={() => void logout()}>
            Sign out
          </button>
        </div>
      ) : (
        <form action={login} className="mt-8 grid gap-3">
          <input required type="email" name="email" placeholder="Email" autoComplete="email" className={inputClass} />
          <input required type="password" name="password" placeholder="Password" autoComplete="current-password" className={inputClass} />
          {error ? <p className="text-sm text-accent">{error}</p> : null}
          <button disabled={pending} className="btn w-fit">
            {pending ? "Opening…" : "Sign in"}
          </button>
          <p className="text-sm text-muted">The studio opens a portal when a consultation becomes a project, and sends you the password.</p>
        </form>
      )}
    </div>
  );
}
