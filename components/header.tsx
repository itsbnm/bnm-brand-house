"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { studio } from "@/lib/content";
import { useCart } from "./cart";

const links = [
  ["Guide", "/guide"],
  ["Archetype", "/archetype"],
  ["Services", "/services"],
  ["Work", "/work"],
  ["Academy", "/learn"],
  ["Shop", "/shop"],
  ["Resources", "/resources"],
  ["Journal", "/journal"],
  ["About", "/about"],
];

export function Header() {
  const { count } = useCart();
  const [open, setOpen] = useState(false);
  const pathname = usePathname() || "/";

  return (
    <header className="sticky top-0 z-30 border-b border-black/[0.08] bg-white/80 backdrop-blur-xl backdrop-saturate-150">
      <div className="mx-auto flex min-h-[52px] max-w-[1120px] items-center justify-between gap-4 px-5">
        <Link href="/" className="flex items-center gap-2.5" onClick={() => setOpen(false)} aria-label={studio.name}>
          <Mark />
          <span className="text-[15px] font-semibold tracking-tight">{studio.name}</span>
        </Link>
        <nav className="hidden items-center gap-7 text-[13px] lg:flex" aria-label="Primary">
          {links.map(([label, href]) => {
            const active = pathname === href || pathname.startsWith(`${href}/`);
            return (
              <Link
                key={href}
                href={href}
                className={`transition-opacity ${active ? "font-semibold opacity-100" : "opacity-80 hover:opacity-100"}`}
              >
                {label}
              </Link>
            );
          })}
        </nav>
        <div className="flex items-center gap-3">
          <Link href="/cart" className="flex min-h-11 items-center gap-1.5 text-[13px] opacity-85 hover:opacity-100" aria-label={`Bag${count ? `, ${count} items` : ""}`}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M5 8h14l-1 12H6L5 8z" />
              <path d="M9 8V6a3 3 0 0 1 6 0v2" />
            </svg>
            {count > 0 ? <span>{count}</span> : null}
          </Link>
          <Link
            href="/consult"
            className="hidden min-h-8 items-center rounded-full bg-accent px-3.5 text-[13px] font-medium text-white sm:inline-flex"
          >
            Book a consultation
          </Link>
          <button
            type="button"
            className="flex min-h-11 min-w-11 items-center justify-center lg:hidden"
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((value) => !value)}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" aria-hidden="true">
              {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 9h16M4 15h16" />}
            </svg>
          </button>
        </div>
      </div>
      {open ? (
        <nav className="border-t border-black/[0.08] bg-white px-5 pt-4 pb-8 lg:hidden" aria-label="Mobile">
          <div className="mx-auto grid max-w-[1120px] gap-1">
            {[...links, ["Book a consultation", "/consult"], ["Client portal", "/portal"], ["Contact", "/contact"]].map(([label, href]) => (
              <Link
                key={href}
                href={href}
                onClick={() => setOpen(false)}
                className="py-2 text-[28px] font-semibold tracking-tight"
              >
                {label}
              </Link>
            ))}
          </div>
        </nav>
      ) : null}
    </header>
  );
}

export function Mark({ size = 22, invert = false }: { size?: number; invert?: boolean }) {
  const ground = invert ? "#ffffff" : "#1d1d1f";
  const ink = invert ? "#1d1d1f" : "#ffffff";
  return (
    <svg width={size} height={size} viewBox="0 0 22 22" aria-hidden="true">
      <rect width="22" height="22" rx="5" fill={ground} />
      <text x="4.2" y="16.5" fontSize="14" fontWeight="700" fill={ink} fontFamily="-apple-system, Helvetica, Arial, sans-serif">
        B
      </text>
      <rect x="14" y="14" width="3" height="3" fill={ink} />
      <rect x="17" y="17" width="3" height="3" fill={ink} />
    </svg>
  );
}
