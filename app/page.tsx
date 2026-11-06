import Link from "next/link";
import { ObjectReel } from "@/components/object-reel";
import { TeeStudio } from "@/components/tee-studio";
import { approach, articles, resources, services, studio } from "@/lib/content";
import { money } from "@/lib/money";

export default function HomePage() {
  return (
    <div>
      <section className="mx-auto max-w-6xl px-5 pt-20 pb-10 lg:pt-28">
        <p className="text-[11px] tracking-[0.32em] text-muted uppercase">{studio.line}</p>
        <h1 className="mt-6 max-w-3xl text-5xl leading-[0.98] font-medium sm:text-7xl">{studio.promise}</h1>
        <p className="mt-6 max-w-md text-base leading-7 text-muted">
          A branding and communications studio in Lagos. Identity, campaigns, and the objects a brand is held in.
        </p>
        <div className="mt-10 flex flex-wrap items-center gap-6">
          <Link href="/guide" className="rounded-full bg-accent px-5 py-2.5 text-sm text-white">
            Find your next step
          </Link>
          <Link href="/work" className="text-sm text-gold-2">
            View the work
          </Link>
        </div>
      </section>

      <ObjectReel />
      <TeeStudio />

      <section className="mx-auto mt-28 max-w-6xl px-5">
        <div className="flex items-end justify-between gap-4">
          <h2 className="text-3xl">Services</h2>
          <Link href="/services" className="text-sm text-gold">
            All services
          </Link>
        </div>
        <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <Link key={service.slug} href={`/services/${service.slug}`} className="border border-line/70 p-6">
              <h3 className="text-2xl">{service.name}</h3>
              <p className="mt-2 text-sm leading-6 text-muted">{service.summary}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto mt-28 grid max-w-6xl gap-6 px-5 lg:grid-cols-2">
        <div className="flex flex-col justify-between">
          <div>
            <h2 className="text-3xl">The rest of the house</h2>
            <p className="mt-3 max-w-md text-sm leading-7 text-muted">
              Caps, cups, totes, and gift sets are ready to order. A run with your own artwork is priced on the print desk.
            </p>
          </div>
          <div className="mt-6 flex gap-6 text-sm">
            <Link href="/shop" className="text-gold-2">
              Shop
            </Link>
            <Link href="/shop/custom" className="text-gold-2">
              Print estimate
            </Link>
          </div>
        </div>
        <div className="border border-line/80 p-8">
          <p className="text-xs tracking-[0.18em] text-gold uppercase">Consultation</p>
          <h2 className="mt-3 text-3xl">One-to-one, for a personal brand or a business.</h2>
          <p className="mt-3 leading-7 text-muted">
            Seventy-five minutes. You leave with a position to test and the next engagement, if one is warranted. Weekday times are held when you confirm.
          </p>
          <Link href="/consult" className="mt-6 inline-flex rounded-full bg-accent px-5 py-2.5 text-sm text-white">
            See open times · $250
          </Link>
        </div>
      </section>

      <section className="mx-auto mt-16 max-w-6xl px-5">
        <h2 className="text-3xl">How the work moves</h2>
        <ol className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {approach.map((item) => (
            <li key={item.step} className="border border-line/70 p-6">
              <p className="text-xs text-gold">{item.step}</p>
              <h3 className="mt-2 text-2xl">{item.title}</h3>
              <p className="mt-2 text-sm leading-6 text-muted">{item.text}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="mx-auto mt-16 grid max-w-6xl gap-8 px-5 lg:grid-cols-2">
        <div>
          <h2 className="text-3xl">Resources</h2>
          <ul className="mt-6 grid gap-3">
            {resources.map((resource) => (
              <li key={resource.slug}>
                <Link href={`/resources/${resource.slug}`} className="block border border-line/70 p-5">
                  <span className="text-xs tracking-[0.16em] text-gold uppercase">
                    {resource.price === 0 ? "Free" : money(resource.price)} · {resource.kind}
                  </span>
                  <span className="mt-1 block text-xl">{resource.title}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="text-3xl">From the journal</h2>
          <ul className="mt-6 grid gap-3">
            {articles.slice(0, 3).map((article) => (
              <li key={article.slug}>
                <Link href={`/journal/${article.slug}`} className="block border border-line/70 p-5">
                  <span className="text-xs text-muted">{article.date}</span>
                  <span className="mt-1 block text-xl">{article.title}</span>
                  <span className="mt-1 block text-sm text-muted">{article.excerpt}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mx-auto mt-16 max-w-6xl px-5">
        <div className="border border-line/70 p-6 sm:flex sm:items-center sm:justify-between">
          <div>
            <h2 className="text-3xl">Client words, after review</h2>
            <p className="mt-2 max-w-xl text-sm leading-6 text-muted">
              Feedback can be left on the site. It is published only after the studio approves it.
            </p>
          </div>
          <Link href="/testimonials" className="mt-4 inline-flex text-sm text-gold sm:mt-0">
            Read or leave feedback
          </Link>
        </div>
      </section>
    </div>
  );
}
