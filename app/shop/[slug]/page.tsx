import type { Metadata } from "next";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import { ProductBuy } from "@/components/product-buy";
import { findProduct } from "@/lib/catalogue";
import { products } from "@/lib/content";
import { money } from "@/lib/money";

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = findProduct(slug);
  return { title: product?.name ?? "Product", description: product?.summary };
}

export default function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  return (
    <Suspense fallback={<p className="px-5 py-14 text-muted">Opening the product…</p>}>
      <ProductBody params={params} />
    </Suspense>
  );
}

async function ProductBody({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = findProduct(slug);
  if (!product) notFound();

  return (
    <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 lg:grid-cols-2">
      <div className="panel min-h-80 rounded-3xl p-6">
        <p className="text-xs tracking-[0.18em] text-gold uppercase">{product.category}</p>
        <h1 className="mt-4 text-5xl">{product.name}</h1>
        <p className="mt-4 max-w-sm text-muted">{product.summary}</p>
      </div>
      <div>
        <p className="text-3xl">{money(product.price)}</p>
        <p className="mt-4 leading-7 text-muted">{product.description}</p>
        <p className="mt-3 text-sm text-muted">{product.lead}</p>
        <div className="mt-6 max-w-sm">
          <ProductBuy product={product} />
        </div>
      </div>
    </div>
  );
}
