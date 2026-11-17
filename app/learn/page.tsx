import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { connection } from "next/server";
import { lessonCount, outline } from "@/lib/courses";
import { money } from "@/lib/money";
import { readStore } from "@/lib/store";

export const metadata: Metadata = {
  title: "Courses",
  description: "Courses from BNM Brand House. Video, readings, and books you study on the site.",
};

export default function LearnPage() {
  return (
    <div className="mx-auto max-w-6xl px-5 py-14">
      <p className="text-[11px] tracking-[0.28em] text-muted uppercase">Courses</p>
      <h1 className="mt-3 max-w-3xl text-5xl">Study a course, week by week.</h1>
      <p className="mt-4 max-w-xl text-muted">Video, reading, and books. A book stays on the page. You turn it. It is not a file to take away.</p>
      <Suspense fallback={<p className="mt-10 text-muted">Opening the catalogue…</p>}>
        <CourseList />
      </Suspense>
    </div>
  );
}

async function CourseList() {
  await connection();
  const courses = readStore().courses.filter((course) => course.status === "published");
  if (courses.length === 0) {
    return <p className="mt-10 text-muted">The first course will appear here when the studio publishes it.</p>;
  }
  return (
    <div className="mt-10 grid gap-4 md:grid-cols-2">
      {courses.map((course) => {
        const card = outline(course);
        return (
          <Link key={course.id} href={`/learn/${course.slug}`} className="border border-line/70 p-6">
            <p className="text-xs tracking-[0.16em] text-muted uppercase">
              {course.level} · {lessonCount(course)} lessons
            </p>
            <h2 className="mt-3 text-3xl">{course.title}</h2>
            <p className="mt-3 text-sm leading-6 text-muted">{course.summary}</p>
            <p className="mt-4 text-sm">{card.price === 0 ? "Free" : money(card.price)}</p>
          </Link>
        );
      })}
    </div>
  );
}
