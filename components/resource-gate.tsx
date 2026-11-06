"use client";

import Link from "next/link";
import { useSyncExternalStore } from "react";
import type { Resource } from "@/lib/types";

function ownedSlugs() {
  try {
    const owned = JSON.parse(localStorage.getItem("bnm-resources") || "[]") as string[];
    return Array.isArray(owned) ? owned.join(",") : "";
  } catch {
    return "";
  }
}

export function ResourceGate({ resource }: { resource: Resource }) {
  const owned = useSyncExternalStore(
    () => () => undefined,
    ownedSlugs,
    () => "",
  );
  const open = resource.price === 0 || owned.split(",").includes(resource.slug);

  if (!open) {
    return (
      <div className="mt-8 rounded-3xl border border-line bg-card p-6">
        <p className="text-muted">Reserve this to read it on the site. It stays available in this browser after checkout.</p>
        <Link href={`/checkout?resource=${resource.slug}`} className="mt-4 inline-flex rounded-full bg-ink px-5 py-2.5 text-sm text-paper">
          Reserve access
        </Link>
      </div>
    );
  }

  return (
    <div className="mt-8 grid gap-6">
      {resource.body.map((section) => (
        <section key={section.heading}>
          <h2 className="text-2xl">{section.heading}</h2>
          {section.paragraphs.map((paragraph) => (
            <p key={paragraph} className="mt-3 max-w-3xl leading-8 text-muted">
              {paragraph}
            </p>
          ))}
        </section>
      ))}
    </div>
  );
}
