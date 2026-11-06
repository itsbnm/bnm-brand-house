import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { ExtraArticleBody } from "@/components/extra-articles";
import { findService } from "@/lib/catalogue";
import { articles } from "@/lib/content";

export function generateStaticParams() {
  return articles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = articles.find((item) => item.slug === slug);
  return { title: article?.title ?? "Journal", description: article?.excerpt };
}

export default function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  return (
    <Suspense fallback={<p className="px-5 py-14 text-muted">Opening the article…</p>}>
      <ArticleBody params={params} />
    </Suspense>
  );
}

async function ArticleBody({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = articles.find((item) => item.slug === slug);
  if (!article) {
    return (
      <div className="mx-auto max-w-3xl px-5 py-14">
        <ExtraArticleBody slug={slug} />
      </div>
    );
  }

  return (
    <article className="mx-auto max-w-3xl px-5 py-14">
      <p className="text-xs tracking-[0.18em] text-gold uppercase">
        {article.category} · {article.date}
      </p>
      <h1 className="mt-3 text-5xl">{article.title}</h1>
      <div className="mt-8 grid gap-4">
        {article.paragraphs.map((paragraph) => (
          <p key={paragraph} className="text-lg leading-8">
            {paragraph}
          </p>
        ))}
      </div>
      <div className="mt-8 flex flex-wrap gap-4 text-sm">
        {article.related.map((slug) => {
          const service = findService(slug);
          return service ? (
            <Link key={slug} href={`/services/${slug}`} className="text-gold">
              {service.name}
            </Link>
          ) : null;
        })}
        <Link href="/guide" className="text-gold">
          Find your next step
        </Link>
      </div>
    </article>
  );
}
