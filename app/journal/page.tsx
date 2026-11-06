import type { Metadata } from "next";
import Link from "next/link";
import { ExtraArticles } from "@/components/extra-articles";
import { PageIntro } from "@/components/ui";
import { articles } from "@/lib/content";

export const metadata: Metadata = { title: "Journal" };

export default function JournalPage() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-14">
      <PageIntro
        eyebrow="Journal"
        title="Notes from the practice."
        text="Articles the studio publishes directly. New pieces can be added from the studio desk without a developer."
      />
      <div className="mt-10 grid gap-4">
        {articles.map((article) => (
          <Link key={article.slug} href={`/journal/${article.slug}`} className="rounded-3xl border border-line bg-card p-5">
            <p className="text-xs tracking-[0.16em] text-gold uppercase">
              {article.category} · {article.date}
            </p>
            <h2 className="mt-2 text-3xl">{article.title}</h2>
            <p className="mt-2 text-muted">{article.excerpt}</p>
          </Link>
        ))}
      </div>
      <ExtraArticles />
    </div>
  );
}
