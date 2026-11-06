import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import { findService } from "@/lib/catalogue";
import { projects, services } from "@/lib/content";
import { money } from "@/lib/money";

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = findService(slug);
  return { title: service?.name ?? "Service", description: service?.summary };
}

export default function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  return (
    <Suspense fallback={<p className="px-5 py-14 text-muted">Opening the service…</p>}>
      <ServiceBody params={params} />
    </Suspense>
  );
}

async function ServiceBody({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = findService(slug);
  if (!service) notFound();
  const related = projects.filter((project) => service.work.includes(project.slug));

  return (
    <div className="mx-auto max-w-6xl px-5 py-14">
      <p className="text-xs tracking-[0.18em] text-gold uppercase">Service</p>
      <h1 className="mt-3 max-w-3xl text-5xl">{service.name}</h1>
      <p className="mt-4 max-w-2xl text-lg leading-8 text-muted">{service.summary}</p>
      <div className="mt-10 grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="grid gap-6">
          <section>
            <h2 className="text-2xl">Who it is for</h2>
            <p className="mt-2 leading-7 text-muted">{service.forWhom}</p>
          </section>
          <section>
            <h2 className="text-2xl">Outcomes</h2>
            <ul className="mt-2 grid gap-2 text-muted">
              {service.outcomes.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>
          {service.notes.map((note) => (
            <p key={note} className="text-sm leading-6 text-muted">
              {note}
            </p>
          ))}
          <Link href="/consult" className="text-sm text-gold">
            Not sure? Book a consultation
          </Link>
        </div>
        <div className="grid gap-4">
          {service.offers.map((offer) => (
            <article key={offer.id} className="rounded-3xl border border-line bg-card p-5">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h2 className="text-2xl">{offer.name}</h2>
                <p>{offer.price == null ? "Quoted" : money(offer.price)}</p>
              </div>
              <p className="mt-2 text-sm text-muted">{offer.summary}</p>
              <p className="mt-2 text-sm">Best for {offer.bestFor}</p>
              <ul className="mt-3 grid gap-1 text-sm text-muted">
                {offer.includes.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              {offer.price == null ? (
                <Link href={`/contact?topic=${encodeURIComponent(service.name)}`} className="mt-4 inline-flex text-sm text-gold">
                  Request a quote
                </Link>
              ) : offer.id === "strategy-session" ? (
                <Link href="/consult" className="mt-4 inline-flex rounded-full bg-ink px-4 py-2 text-sm text-paper">
                  Book now
                </Link>
              ) : (
                <Link href={`/checkout?offer=${offer.id}`} className="mt-4 inline-flex rounded-full bg-ink px-4 py-2 text-sm text-paper">
                  Reserve · {money(offer.price)}
                </Link>
              )}
            </article>
          ))}
        </div>
      </div>
      {related.length ? (
        <section className="mt-12">
          <h2 className="text-2xl">Related work</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {related.map((project) => (
              <Link key={project.slug} href={`/work/${project.slug}`} className="rounded-2xl border border-line p-4">
                <span className="text-xl">{project.title}</span>
                <span className="mt-1 block text-sm text-muted">{project.summary}</span>
              </Link>
            ))}
          </div>
        </section>
      ) : null}
    </div>
  );
}
