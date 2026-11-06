import type { Metadata } from "next";
import Link from "next/link";
import { PageIntro } from "@/components/ui";
import { resources } from "@/lib/content";
import { money } from "@/lib/money";

export const metadata: Metadata = { title: "Resources" };

export default function ResourcesPage() {
  return (
    <div className="mx-auto max-w-6xl px-5 py-14">
      <PageIntro
        eyebrow="Resources"
        title="Read the decision before you buy the engagement."
        text="Free pieces open immediately. Paid pieces unlock on this site after checkout. A fuller course platform can be added later without moving these pages."
      />
      <div className="mt-10 grid gap-4 md:grid-cols-3">
        {resources.map((resource) => (
          <Link key={resource.slug} href={`/resources/${resource.slug}`} className="rounded-3xl border border-line bg-card p-5">
            <p className="text-xs tracking-[0.16em] text-gold uppercase">
              {resource.price === 0 ? "Free" : money(resource.price)} · {resource.length}
            </p>
            <h2 className="mt-3 text-2xl">{resource.title}</h2>
            <p className="mt-2 text-sm leading-6 text-muted">{resource.summary}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
