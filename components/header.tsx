"use client";

import Link from "next/link";
import { useState } from "react";
import { studio } from "@/lib/content";
import { useCart } from "./cart";

const links = [
  ["Guide", "/guide"],
  ["Services", "/services"],
  ["Work", "/work"],
  ["Shop", "/shop"],
  ["Resources", "/resources"],
  ["Journal", "/journal"],
  ["About", "/about"],
];

export function Header() {
  const { count } = useCart();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-30 border-b border-line/80 bg-paper/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-3">
        <Link href="/" className="flex items-center" onClick={() => setOpen(false)}>
          <img src="/logo-lockup.svg" alt={studio.name} className="h-9 w-auto sm:h-10" />
        </Link>
        <nav className="hidden items-center gap-5 text-sm lg:flex" aria-label="Primary">
          {links.map(([label, href]) => (
            <Link key={href} href={href} className="hover:text-gold">
              {label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <Link href="/cart" className="rounded-full border border-line px-3 py-1.5 text-sm">
            Cart{count > 0 ? ` ${count}` : ""}
          </Link>
          <Link
            href="/consult"
            className="hidden rounded-full bg-accent px-4 py-1.5 text-sm text-white sm:inline-flex"
          >
            Book a consultation
          </Link>
          <button
            type="button"
            className="rounded-full border border-line px-3 py-1.5 text-sm lg:hidden"
            aria-expanded={open}
            onClick={() => setOpen((value) => !value)}
          >
            Menu
          </button>
        </div>
      </div>
      {open ? (
        <nav className="border-t border-line px-5 py-4 lg:hidden" aria-label="Mobile">
          <div className="grid gap-3 text-lg">
            {links.map(([label, href]) => (
              <Link key={href} href={href} onClick={() => setOpen(false)}>
                {label}
              </Link>
            ))}
            <Link href="/consult" onClick={() => setOpen(false)}>
              Book a consultation
            </Link>
            <Link href="/contact" onClick={() => setOpen(false)}>
              Contact
            </Link>
          </div>
        </nav>
      ) : null}
    </header>
  );
}
