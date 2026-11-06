import type { Metadata } from "next";
import Link from "next/link";
import { PageIntro } from "@/components/ui";
import { services } from "@/lib/content";
import { money } from "@/lib/money";

export const metadata: Metadata = { title: "Services" };

export default function ServicesPage() {
  return (
    <div className="mx-auto max-w-6xl px-5 py-14">
      <PageIntro
        eyebrow="Services"
        title="Fixed where the work is fixed. Quoted where it is not."
        text="Each service tells you who it is for, what it includes, and the next action: reserve a price, request a quote, or book a consultation."
      />
      <div className="mt-10 grid gap-4">
        {services.map((service) => {
          const priced = service.offers.filter((offer) => offer.price != null);
          return (
            <Link key={service.slug} href={`/services/${service.slug}`} className="rounded-3xl border border-line bg-card p-6">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <h2 className="text-3xl">{service.name}</h2>
                <p className="text-sm text-muted">
                  {priced.length
                    ? `From ${money(Math.min(...priced.map((offer) => offer.price || 0)))}`
                    : "Quoted"}
                </p>
              </div>
              <p className="mt-3 max-w-2xl text-muted">{service.summary}</p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
