import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import { findService } from "@/lib/catalogue";
import { projects } from "@/lib/content";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);
  return { title: project?.title ?? "Work", description: project?.summary };
}

export default function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  return (
    <Suspense fallback={<p className="px-5 py-14 text-muted">Opening the project…</p>}>
      <ProjectBody params={params} />
    </Suspense>
  );
}

async function ProjectBody({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);
  if (!project) notFound();
  const service = findService(project.service);

  return (
    <article className="mx-auto max-w-3xl px-5 py-14">
      <p className="text-xs tracking-[0.18em] text-gold uppercase">
        {project.sector} · {project.year}
      </p>
      <h1 className="mt-3 text-5xl">{project.title}</h1>
      <p className="mt-4 text-lg leading-8 text-muted">{project.summary}</p>
      <div className="mt-10 grid gap-8">
        <section>
          <h2 className="text-2xl">Brief</h2>
          <p className="mt-2 leading-7 text-muted">{project.brief}</p>
        </section>
        <section>
          <h2 className="text-2xl">Solution</h2>
          <p className="mt-2 leading-7 text-muted">{project.solution}</p>
        </section>
        <section>
          <h2 className="text-2xl">Outcome</h2>
          <p className="mt-2 leading-7 text-muted">{project.outcome}</p>
        </section>
      </div>
      {service ? (
        <Link href={`/services/${service.slug}`} className="mt-10 inline-block text-gold">
          See {service.name}
        </Link>
      ) : null}
    </article>
  );
}
