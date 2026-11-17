import type { Metadata } from "next";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import { connection } from "next/server";
import { CourseEnroll } from "@/components/course-enroll";
import { lessonCount } from "@/lib/courses";
import { currentLearner } from "@/lib/learner";
import { money } from "@/lib/money";
import { readStore } from "@/lib/store";

export const metadata: Metadata = { title: "Course" };

export default function CoursePage({ params }: { params: Promise<{ slug: string }> }) {
  return (
    <Suspense fallback={<p className="px-5 py-14 text-muted">Opening the course…</p>}>
      <CourseBody params={params} />
    </Suspense>
  );
}

async function CourseBody({ params }: { params: Promise<{ slug: string }> }) {
  await connection();
  const { slug } = await params;
  const course = readStore().courses.find((item) => item.slug === slug && item.status === "published");
  if (!course) notFound();
  const email = await currentLearner();
  const enrolled = readStore().enrollments.some((item) => item.courseId === course.id && item.email === email);

  return (
    <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 lg:grid-cols-[1.3fr_0.7fr]">
      <div>
        <p className="text-[11px] tracking-[0.28em] text-muted uppercase">
          {course.level} · {lessonCount(course)} lessons
        </p>
        <h1 className="mt-3 text-5xl">{course.title}</h1>
        <p className="mt-4 max-w-2xl text-lg leading-8 text-muted">{course.summary}</p>
        <p className="mt-6 max-w-2xl leading-8">{course.description}</p>
        <h2 className="mt-12 text-3xl">Syllabus</h2>
        <ol className="mt-4 grid gap-4">
          {course.modules.map((module, index) => (
            <li key={module.id} className="border border-line/70 p-5">
              <p className="text-xs tracking-[0.16em] text-muted uppercase">Week {index + 1}</p>
              <h3 className="mt-1 text-2xl">{module.title}</h3>
              <ul className="mt-3 grid gap-2 text-sm text-muted">
                {module.lessons.map((lesson) => (
                  <li key={lesson.id}>
                    {lesson.kind === "video" ? "Video" : lesson.kind === "book" ? "Book" : "Reading"} · {lesson.title}
                    {lesson.minutes ? ` · ${lesson.minutes} min` : ""}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
      </div>
      <aside className="lg:sticky lg:top-24 lg:self-start">
        <p className="text-3xl">{course.price === 0 ? "Free" : money(course.price)}</p>
        <div className="mt-4">
          <CourseEnroll slug={course.slug} price={course.price} enrolled={enrolled} />
        </div>
      </aside>
    </div>
  );
}
