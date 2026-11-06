import type { Metadata } from "next";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import { ResourceGate } from "@/components/resource-gate";
import { findResource } from "@/lib/catalogue";
import { resources } from "@/lib/content";
import { money } from "@/lib/money";

export function generateStaticParams() {
  return resources.map((resource) => ({ slug: resource.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const resource = findResource(slug);
  return { title: resource?.title ?? "Resource", description: resource?.summary };
}

export default function ResourcePage({ params }: { params: Promise<{ slug: string }> }) {
  return (
    <Suspense fallback={<p className="px-5 py-14 text-muted">Opening the resource…</p>}>
      <ResourceBody params={params} />
    </Suspense>
  );
}

async function ResourceBody({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const resource = findResource(slug);
  if (!resource) notFound();

  return (
    <article className="mx-auto max-w-3xl px-5 py-14">
      <p className="text-xs tracking-[0.18em] text-gold uppercase">
        {resource.kind} · {resource.price === 0 ? "Free" : money(resource.price)} · {resource.length}
      </p>
      <h1 className="mt-3 text-5xl">{resource.title}</h1>
      <p className="mt-4 text-lg leading-8 text-muted">{resource.summary}</p>
      <ul className="mt-6 grid gap-2 text-muted">
        {resource.preview.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
      <ResourceGate resource={resource} />
    </article>
  );
}
