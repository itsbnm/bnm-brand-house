import { NextResponse } from "next/server";
import { connection } from "next/server";
import { classroomCourse, findLesson, outline } from "@/lib/courses";
import { currentLearner, learnerCookie, signLearner } from "@/lib/learner";
import { readStore, updateStore } from "@/lib/store";

export async function GET(
  _request: Request,
  context: { params: Promise<{ slug: string }> },
) {
  await connection();
  const { slug } = await context.params;
  const store = readStore();
  const course = store.courses.find((item) => item.slug === slug && item.status === "published");
  if (!course) return NextResponse.json({ error: "Course not found." }, { status: 404 });
  const email = await currentLearner();
  const enrollment = store.enrollments.find((item) => item.courseId === course.id && item.email === email);
  if (!enrollment) return NextResponse.json({ course: outline(course), enrolled: false, completed: [] });
  return NextResponse.json({
    course: classroomCourse(course),
    enrolled: true,
    completed: enrollment.completed,
  });
}

export async function POST(
  request: Request,
  context: { params: Promise<{ slug: string }> },
) {
  await connection();
  const { slug } = await context.params;
  const body = await request.json().catch(() => null);
  const course = readStore().courses.find((item) => item.slug === slug && item.status === "published");
  if (!course) return NextResponse.json({ error: "Course not found." }, { status: 404 });

  if (body?.action === "progress") {
    const email = await currentLearner();
    const lessonId = String(body.lessonId || "");
    if (!email || !findLesson(course, lessonId)) {
      return NextResponse.json({ error: "Enrol before marking a lesson." }, { status: 401 });
    }
    updateStore((data) => {
      const enrollment = data.enrollments.find((item) => item.courseId === course.id && item.email === email);
      if (enrollment && !enrollment.completed.includes(lessonId)) enrollment.completed.push(lessonId);
    });
    return NextResponse.json({ ok: true });
  }

  const name = String(body?.name || "").trim();
  const email = String(body?.email || "").trim().toLowerCase();
  if (name.length < 2 || !email.includes("@")) {
    return NextResponse.json({ error: "Add your name and email." }, { status: 400 });
  }
  updateStore((data) => {
    const existing = data.enrollments.find((item) => item.courseId === course.id && item.email === email);
    if (existing) return;
    data.enrollments.unshift({
      id: crypto.randomUUID(),
      courseId: course.id,
      name,
      email,
      createdAt: new Date().toISOString(),
      completed: [],
    });
  });
  const response = NextResponse.json({ ok: true });
  response.cookies.set(learnerCookie, signLearner(email), {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 180,
  });
  return response;
}
