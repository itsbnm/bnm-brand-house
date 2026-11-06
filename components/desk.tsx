"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { answerDesk, deskAnswers } from "@/lib/desk";

export function Desk() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const answer = useMemo(() => (query.trim() ? answerDesk(query) : null), [query]);

  return (
    <div className="fixed right-4 bottom-4 z-40">
      {open ? (
        <div className="mb-3 w-[min(22rem,calc(100vw-2rem))] rounded-2xl border border-line bg-card p-4 shadow-xl">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-xs tracking-[0.18em] text-gold uppercase">Studio desk</p>
              <p className="mt-1 text-sm text-muted">Ask where to start. The desk answers from the studio’s own rules.</p>
            </div>
            <button type="button" className="text-sm" onClick={() => setOpen(false)} aria-label="Close desk">
              Close
            </button>
          </div>
          <label className="mt-3 block text-sm">
            <span className="sr-only">Question</span>
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Pricing, booking, print, courses…"
              className="mt-1 w-full rounded-md border border-line bg-paper px-3 py-2"
            />
          </label>
          {answer ? (
            <div className="mt-3 text-sm leading-6">
              <p>{answer.a}</p>
              <Link href={answer.href} className="mt-2 inline-block text-gold" onClick={() => setOpen(false)}>
                {answer.label}
              </Link>
            </div>
          ) : (
            <ul className="mt-3 grid gap-2 text-sm">
              {deskAnswers.slice(0, 4).map((item) => (
                <li key={item.q}>
                  <button type="button" className="text-left hover:text-gold" onClick={() => setQuery(item.q)}>
                    {item.q}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      ) : null}
      <button
        type="button"
        className="rounded-full bg-accent px-4 py-2.5 text-sm text-white shadow-lg"
        onClick={() => setOpen((value) => !value)}
      >
        {open ? "Hide desk" : "Ask the desk"}
      </button>
    </div>
  );
}
