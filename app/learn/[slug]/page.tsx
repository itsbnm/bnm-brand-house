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
    <Suspense fallback={<p className="px-5 py-14 text-center text-muted">Opening the course…</p>}>
      <CourseBody params={params} />
    </Suspense>
  );
}

function kindLabel(kind: string) {
  return kind === "video" ? "Video" : kind === "book" ? "Book · read-only" : "Reading";
}

async function CourseBody({ params }: { params: Promise<{ slug: string }> }) {
  await connection();
  const { slug } = await params;
  const course = readStore().courses.find((item) => item.slug === slug && item.status === "published");
  if (!course) notFound();
  const email = await currentLearner();
  const enrolled = readStore().enrollments.some((item) => item.courseId === course.id && item.email === email);

  return (
    <div>
      <section className="on-night bg-black px-5 py-[clamp(72px,10vw,120px)] text-[#f5f5f7]">
        <div className="mx-auto grid max-w-[1120px] items-end gap-10 lg:grid-cols-[1.4fr_0.6fr]">
          <div className="reveal">
            <p className="eyebrow !text-[#a1a1a6]">
              BNM Academy · {course.level} · {lessonCount(course)} lessons
            </p>
            <h1 className="mt-4 text-[clamp(40px,6vw,72px)] leading-[1.04]">{course.title}</h1>
            <p className="mt-5 max-w-2xl text-[21px] leading-[1.45] text-[#a1a1a6]">{course.summary}</p>
          </div>
          <div className="rounded-3xl bg-[#1d1d1f] p-7">
            <p className="text-[34px] font-semibold tracking-tight">{course.price === 0 ? "Free" : money(course.price)}</p>
            <div className="mt-4 [&_.text-muted]:text-[#a1a1a6]">
              <CourseEnroll slug={course.slug} price={course.price} enrolled={enrolled} />
            </div>
          </div>
        </div>
      </section>

      <section className="px-5 py-[clamp(72px,9vw,112px)]">
        <div className="mx-auto max-w-[860px]">
          {course.description ? <p className="text-[21px] leading-[1.6]">{course.description}</p> : null}
          <h2 className="mt-14 text-[clamp(30px,4vw,44px)]">Syllabus</h2>
          <ol className="mt-6 grid gap-4">
            {course.modules.map((module, index) => (
              <li key={module.id} className="rounded-3xl bg-card p-7">
                <p className="eyebrow">Module {index + 1}</p>
                <h3 className="mt-1.5 text-2xl">{module.title}</h3>
                <ul className="mt-4 grid gap-2.5">
                  {module.lessons.map((lesson) => (
                    <li key={lesson.id} className="flex flex-wrap justify-between gap-2 border-t border-line pt-2.5 text-[17px]">
                      <span>{lesson.title}</span>
                      <span className="text-[15px] text-muted">
                        {kindLabel(lesson.kind)}
                        {lesson.minutes ? ` · ${lesson.minutes} min` : ""}
                      </span>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </div>
  );
}
