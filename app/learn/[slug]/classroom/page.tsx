import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import { connection } from "next/server";
import { Classroom } from "@/components/classroom";
import { readStore } from "@/lib/store";

export const metadata: Metadata = { title: "Classroom", robots: { index: false, follow: false } };

export default function ClassroomPage({ params }: { params: Promise<{ slug: string }> }) {
  return (
    <Suspense fallback={<p className="px-5 py-14 text-center text-muted">Opening the classroom…</p>}>
      <ClassroomBody params={params} />
    </Suspense>
  );
}

async function ClassroomBody({ params }: { params: Promise<{ slug: string }> }) {
  await connection();
  const { slug } = await params;
  const course = readStore().courses.find((item) => item.slug === slug && item.status === "published");
  if (!course) notFound();
  return (
    <div className="mx-auto max-w-[1360px] px-5 py-8">
      <Link href={`/learn/${slug}`} className="text-[15px] text-accent hover:underline">
        ‹ {course.title}
      </Link>
      <div className="mt-6">
        <Classroom slug={slug} />
      </div>
    </div>
  );
}
