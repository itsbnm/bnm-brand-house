import Link from "next/link";
import { approach, articles, products, projects, resources, services, studio } from "@/lib/content";
import { money } from "@/lib/money";

export default function HomePage() {
  return (
    <div>
      <section className="mx-auto grid max-w-6xl gap-10 px-5 py-16 lg:grid-cols-[1.2fr_0.8fr] lg:py-24">
        <div>
          <p className="text-xs tracking-[0.22em] text-gold uppercase">{studio.line}</p>
          <h1 className="mt-4 max-w-xl text-5xl leading-[1.05] sm:text-6xl">{studio.promise}</h1>
          <p className="mt-6 max-w-xl text-lg leading-8 text-muted">
            BNM Brand House is a branding and communications studio. The site is built so you can decide, book, buy, or request a quote without waiting for a reply to find the door.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/guide" className="rounded-full bg-ink px-5 py-2.5 text-sm text-paper">
              Find your next step
            </Link>
            <Link href="/services" className="rounded-full border border-line px-5 py-2.5 text-sm">
              Explore services
            </Link>
            <Link href="/shop" className="rounded-full border border-line px-5 py-2.5 text-sm">
              Shop products
            </Link>
            <Link href="/work" className="rounded-full border border-line px-5 py-2.5 text-sm">
              View the work
            </Link>
          </div>
        </div>
        <div className="panel flex min-h-72 flex-col justify-between rounded-3xl p-6 text-paper">
          <p className="text-xs tracking-[0.2em] text-gold-2 uppercase">A visitor should be able to</p>
          <ul className="mt-6 grid gap-3 text-lg">
            <li>Understand the practice in a minute</li>
            <li>Book a fixed service or a consultation</li>
            <li>Buy ready-made goods, or price a custom run</li>
            <li>Read the work before hiring anyone</li>
          </ul>
          <Link href="/consult" className="mt-8 text-sm text-gold-2">
            Book a consultation
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5">
        <div className="flex items-end justify-between gap-4">
          <h2 className="text-3xl">Services</h2>
          <Link href="/services" className="text-sm text-gold">
            All services
          </Link>
        </div>
        <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <Link key={service.slug} href={`/services/${service.slug}`} className="rounded-3xl border border-line bg-card p-5">
              <h3 className="text-2xl">{service.name}</h3>
              <p className="mt-2 text-sm leading-6 text-muted">{service.summary}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto mt-16 max-w-6xl px-5">
        <div className="flex items-end justify-between gap-4">
          <h2 className="text-3xl">Selected work</h2>
          <Link href="/work" className="text-sm text-gold">
            Portfolio
          </Link>
        </div>
        <div className="mt-6 flex gap-4 overflow-x-auto pb-2">
          {projects.map((project) => (
            <Link
              key={project.slug}
              href={`/work/${project.slug}`}
              className="min-w-[18rem] rounded-3xl border border-line bg-card p-5"
            >
              <p className="text-xs tracking-[0.16em] text-gold uppercase">{project.sector}</p>
              <h3 className="mt-3 text-3xl">{project.title}</h3>
              <p className="mt-2 text-sm leading-6 text-muted">{project.summary}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto mt-16 grid max-w-6xl gap-6 px-5 lg:grid-cols-2">
        <div>
          <h2 className="text-3xl">Ready to buy</h2>
          <div className="mt-6 grid gap-3">
            {products.slice(0, 4).map((product) => (
              <Link key={product.slug} href={`/shop/${product.slug}`} className="flex items-center justify-between rounded-2xl border border-line bg-card px-4 py-3">
                <span>
                  <span className="block">{product.name}</span>
                  <span className="text-sm text-muted">{product.category}</span>
                </span>
                <span>{money(product.price)}</span>
              </Link>
            ))}
          </div>
          <Link href="/shop/custom" className="mt-4 inline-block text-sm text-gold">
            Need it branded? Get a print estimate
          </Link>
        </div>
        <div className="rounded-3xl border border-line bg-card p-6">
          <p className="text-xs tracking-[0.18em] text-gold uppercase">Consultation</p>
          <h2 className="mt-3 text-3xl">One-to-one, for a personal brand or a business.</h2>
          <p className="mt-3 leading-7 text-muted">
            Seventy-five minutes. You leave with a position to test and the next engagement, if one is warranted. Weekday times are held when you confirm.
          </p>
          <Link href="/consult" className="mt-6 inline-flex rounded-full bg-ink px-5 py-2.5 text-sm text-paper">
            See open times · $250
          </Link>
        </div>
      </section>

      <section className="mx-auto mt-16 max-w-6xl px-5">
        <h2 className="text-3xl">How the work moves</h2>
        <ol className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {approach.map((item) => (
            <li key={item.step} className="rounded-3xl border border-line p-5">
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
                <Link href={`/resources/${resource.slug}`} className="block rounded-2xl border border-line bg-card p-4">
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
                <Link href={`/journal/${article.slug}`} className="block rounded-2xl border border-line bg-card p-4">
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
        <div className="rounded-3xl border border-line bg-card p-6 sm:flex sm:items-center sm:justify-between">
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
