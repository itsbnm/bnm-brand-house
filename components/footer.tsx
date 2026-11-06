import Link from "next/link";
import { studio } from "@/lib/content";

export function Footer() {
  return (
    <footer className="mt-20 border-t border-line">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-12 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <p className="text-sm tracking-[0.16em] uppercase">{studio.name}</p>
          <p className="mt-3 text-sm leading-6 text-muted">
            {studio.promise} {studio.line}
          </p>
        </div>
        <div className="text-sm leading-7">
          <p className="text-muted">Visit</p>
          <Link href="/services" className="block">
            Services
          </Link>
          <Link href="/work" className="block">
            Work
          </Link>
          <Link href="/shop" className="block">
            Shop
          </Link>
          <Link href="/resources" className="block">
            Resources
          </Link>
          <Link href="/journal" className="block">
            Journal
          </Link>
        </div>
        <div className="text-sm leading-7">
          <p className="text-muted">Take a step</p>
          <Link href="/guide" className="block">
            Find your next step
          </Link>
          <Link href="/consult" className="block">
            Book a consultation
          </Link>
          <Link href="/shop/custom" className="block">
            Custom print estimate
          </Link>
          <Link href="/contact" className="block">
            Contact
          </Link>
          <Link href="/testimonials" className="block">
            Client feedback
          </Link>
        </div>
        <div className="text-sm leading-7">
          <p className="text-muted">Studio</p>
          <a className="block" href={`mailto:${studio.email}`}>
            {studio.email}
          </a>
          <a className="block" href={studio.phoneHref}>
            {studio.phone}
          </a>
          <p>{studio.hours}</p>
          <p>Lagos</p>
        </div>
      </div>
      <div className="border-t border-line px-5 py-4 text-xs text-muted">
        <div className="mx-auto flex max-w-6xl flex-wrap justify-between gap-2">
          <span>© 2026 {studio.name}</span>
          <Link href="/admin">Studio desk</Link>
        </div>
      </div>
    </footer>
  );
}
