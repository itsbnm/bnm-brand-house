import type { Metadata } from "next";
import Link from "next/link";
import { CourseDesk } from "@/components/course-desk";

export const metadata: Metadata = { title: "Courses desk", robots: { index: false, follow: false } };

export default function CourseAdminPage() {
  return (
    <div className="mx-auto max-w-5xl px-5 py-14">
      <p className="text-xs tracking-[0.18em] text-gold uppercase">Studio</p>
      <h1 className="mt-3 text-5xl">Courses</h1>
      <p className="mt-4 max-w-2xl text-muted">
        Build a course in weeks. Add a video, a reading, or a PDF book. Publish it when the syllabus is ready. Books open on the site with a page turn, and the page does not offer a download.
      </p>
      <p className="mt-3 text-sm">
        <Link href="/admin" className="text-gold-2">
          Back to the desk
        </Link>
      </p>
      <CourseDesk />
    </div>
  );
}
