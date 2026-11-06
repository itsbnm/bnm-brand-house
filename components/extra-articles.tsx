"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { ExtraArticle } from "@/lib/types";

export function ExtraArticles() {
  const [articles, setArticles] = useState<ExtraArticle[]>([]);
  useEffect(() => {
    fetch("/api/articles")
      .then((response) => response.json())
      .then((data) => setArticles(data.articles || []))
      .catch(() => setArticles([]));
  }, []);
  if (!articles.length) return null;
  return (
    <div className="mt-6 grid gap-4">
      {articles.map((article) => (
        <Link key={article.id} href={`/journal/${article.slug}`} className="rounded-3xl border border-line bg-card p-5">
          <p className="text-xs tracking-[0.16em] text-gold uppercase">{article.category}</p>
          <h2 className="mt-2 text-2xl">{article.title}</h2>
          <p className="mt-2 text-sm text-muted">{article.excerpt}</p>
        </Link>
      ))}
    </div>
  );
}

export function ExtraArticleBody({ slug }: { slug: string }) {
  const [article, setArticle] = useState<ExtraArticle | null>(null);
  const [checked, setChecked] = useState(false);
  useEffect(() => {
    fetch("/api/articles")
      .then((response) => response.json())
      .then((data: { articles: ExtraArticle[] }) => {
        setArticle((data.articles || []).find((item) => item.slug === slug) || null);
        setChecked(true);
      })
      .catch(() => setChecked(true));
  }, [slug]);
  if (!checked) return <p className="text-muted">Looking for that article…</p>;
  if (!article) {
    return (
      <div>
        <h1 className="text-4xl">That article is not on the journal.</h1>
        <Link href="/journal" className="mt-4 inline-block text-gold">
          Back to the journal
        </Link>
      </div>
    );
  }
  return (
    <article>
      <p className="text-xs tracking-[0.18em] text-gold uppercase">{article.category}</p>
      <h1 className="mt-3 text-4xl sm:text-5xl">{article.title}</h1>
      <p className="mt-3 text-sm text-muted">{article.date}</p>
      <div className="mt-8 grid gap-4">
        {article.paragraphs.map((paragraph) => (
          <p key={paragraph} className="max-w-3xl text-lg leading-8">
            {paragraph}
          </p>
        ))}
      </div>
    </article>
  );
}
