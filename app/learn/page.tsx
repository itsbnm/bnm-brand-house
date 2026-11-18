import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { connection } from "next/server";
import { lessonCount, outline } from "@/lib/courses";
import { money } from "@/lib/money";
import { readStore } from "@/lib/store";

export const metadata: Metadata = {
  title: "BNM Academy",
  description: "Courses from BNM Brand House. Video, readings, and books you study on the site.",
};

const covers = ["bg-[#1d1d1f] text-[#f5f5f7]", "bg-accent text-white", "bg-[#e8e8ed] text-ink", "bg-black text-[#f5f5f7]"];

export default function LearnPage() {
  return (
    <div>
      <div className="border-b border-[#e8e8ed]">
        <div className="mx-auto flex min-h-14 max-w-[1120px] items-center gap-8 px-5">
          <span className="text-[21px] font-bold tracking-tight">BNM Academy</span>
          <span className="text-[15px] text-muted">Courses · Books · Readings</span>
        </div>
      </div>

      <section className="px-5 pt-[clamp(64px,9vw,112px)] pb-[clamp(40px,5vw,56px)] text-center">
        <div className="reveal">
          <h1 className="mx-auto max-w-[900px] text-[clamp(42px,6.6vw,80px)] leading-[1.03]">
            Learn branding the way <span className="text-[#86868b]">the studio practises it.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-[620px] text-[21px] leading-[1.45] text-muted">
            Video lessons, readings, and books you read page by page, at your own pace. A book stays on the page. You turn it. It is not a file to take away.
          </p>
        </div>
      </section>

      <section className="px-5 pb-[clamp(80px,10vw,120px)]">
        <div className="mx-auto max-w-[1120px]">
          <Suspense fallback={<p className="text-center text-muted">Opening the catalogue…</p>}>
            <CourseList />
          </Suspense>
        </div>
      </section>

      <section className="bg-card px-5 py-[clamp(96px,12vw,150px)]">
        <div className="mx-auto max-w-[1120px]">
          <h2 className="text-center text-[clamp(36px,5.2vw,60px)] leading-[1.06]">How learning works here.</h2>
          <div className="mt-[clamp(48px,6vw,72px)] grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {[
              ["Watch", "Short video lessons, one idea at a time."],
              ["Read", "Lessons and full books in a page-turning reader. Read-only, on the site."],
              ["Practise", "Apply each lesson to your own brand as you go."],
              ["Finish", "Track your progress across every module, week by week."],
            ].map(([title, text]) => (
              <div key={title} className="flex min-h-[200px] flex-col gap-3 rounded-3xl bg-white p-8">
                <h3 className="mt-auto text-2xl">{title}</h3>
                <p className="leading-[1.47] text-muted">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

async function CourseList() {
  await connection();
  const courses = readStore().courses.filter((course) => course.status === "published");
  if (courses.length === 0) {
    return <p className="text-center text-[19px] text-muted">The first course will appear here when the studio publishes it.</p>;
  }
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {courses.map((course, index) => {
        const card = outline(course);
        return (
          <Link key={course.id} href={`/learn/${course.slug}`} className="lift flex flex-col overflow-hidden rounded-3xl border border-[#e8e8ed] bg-white text-ink">
            <div className={`flex h-48 flex-col p-6 ${covers[index % covers.length]}`}>
              <span className="text-xs font-semibold tracking-[0.1em] uppercase opacity-70">{course.level}</span>
              <span className="mt-auto text-[28px] leading-[1.05] font-bold tracking-tight">{course.title}</span>
            </div>
            <div className="flex flex-1 flex-col gap-2.5 p-6">
              <p className="text-[13px] text-muted">BNM Brand House</p>
              <h2 className="text-[21px]">{course.title}</h2>
              <p className="text-[15px] leading-[1.45] text-muted">{course.summary}</p>
              <div className="mt-auto flex items-center justify-between border-t border-[#e8e8ed] pt-4 text-sm">
                <span className="text-muted">{lessonCount(course)} lessons</span>
                <span className="text-base font-semibold">{card.price === 0 ? "Free" : money(card.price)}</span>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
