import Link from "next/link";
import { studio } from "@/lib/content";

const columns: { title: string; links: [string, string][] }[] = [
  {
    title: "Explore",
    links: [
      ["Services", "/services"],
      ["Work", "/work"],
      ["Shop", "/shop"],
      ["Academy", "/learn"],
      ["Resources", "/resources"],
      ["Journal", "/journal"],
      ["About", "/about"],
    ],
  },
  {
    title: "Take a step",
    links: [
      ["Find your next step", "/guide"],
      ["Brand archetype test", "/archetype"],
      ["Book a consultation", "/consult"],
      ["Client portal", "/portal"],
      ["Custom print estimate", "/shop/custom"],
      ["Contact", "/contact"],
      ["Client feedback", "/testimonials"],
    ],
  },
  {
    title: "Policies",
    links: [
      ["Terms", "/legal/terms"],
      ["Privacy", "/legal/privacy"],
      ["Refunds", "/legal/refunds"],
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-line bg-card text-[13px] text-muted">
      <div className="mx-auto grid max-w-[1120px] gap-10 px-5 py-12 sm:grid-cols-2 lg:grid-cols-5">
        <div className="lg:col-span-2">
          <p className="text-[15px] font-semibold text-ink">{studio.name}</p>
          <p className="mt-2 leading-6">
            {studio.promise}
            <br />
            {studio.line}
          </p>
          <div className="mt-5 grid gap-1.5">
            <a href={`mailto:${studio.email}`} className="text-[#424245] hover:underline">
              {studio.email}
            </a>
            <a href={studio.phoneHref} className="text-[#424245] hover:underline">
              {studio.phone}
            </a>
            <span>{studio.hours}</span>
            <span>Lagos</span>
          </div>
        </div>
        {columns.map((column) => (
          <div key={column.title}>
            <p className="font-semibold text-ink">{column.title}</p>
            <div className="mt-3 grid gap-2">
              {column.links.map(([label, href]) => (
                <Link key={href} href={href} className="text-[#424245] hover:underline">
                  {label}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="border-t border-line px-5 py-5">
        <div className="mx-auto flex max-w-[1120px] flex-wrap justify-between gap-2">
          <span>© 2026 {studio.name}</span>
          <Link href="/admin" className="hover:underline">
            Studio desk
          </Link>
        </div>
      </div>
    </footer>
  );
}
