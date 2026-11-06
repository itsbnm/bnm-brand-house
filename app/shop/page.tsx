import type { Metadata } from "next";
import Link from "next/link";
import { ShopFilter } from "@/components/filters";
import { PageIntro } from "@/components/ui";

export const metadata: Metadata = { title: "Shop" };

export default function ShopPage() {
  return (
    <div className="mx-auto max-w-6xl px-5 py-14">
      <PageIntro
        eyebrow="Shop"
        title="Ready-made goods, with a separate door for anything custom."
        text="These pieces have a price, a colour, and a size. Branded runs, packaging, and executive programmes are estimated before they are made."
      />
      <div className="mt-8">
        <ShopFilter />
      </div>
      <Link href="/shop/custom" className="mt-8 inline-flex rounded-full border border-line px-5 py-2.5 text-sm">
        Custom or bulk print
      </Link>
    </div>
  );
}
