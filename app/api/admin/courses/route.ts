import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/auth";
import { courseSlug } from "@/lib/courses";
import { readStore, updateStore } from "@/lib/store";
import type { Course } from "@/lib/types";

export async function GET() {
  if (!(await isAdmin())) return NextResponse.json({ error: "Sign in required." }, { status: 401 });
  return NextResponse.json({ courses: readStore().courses });
}

export async function POST(request: Request) {
  if (!(await isAdmin())) return NextResponse.json({ error: "Sign in required." }, { status: 401 });
  const body = await request.json().catch(() => null);
  const action = String(body?.action || "");

  if (action === "create") {
    const title = String(body.title || "").trim();
    const summary = String(body.summary || "").trim();
    const description = String(body.description || "").trim();
    if (title.length < 3 || summary.length < 8) {
      return NextResponse.json({ error: "Add a title and a short summary." }, { status: 400 });
    }
    const level = body.level === "Intermediate" || body.level === "Advanced" ? body.level : "Beginner";
    const course: Course = {
      id: crypto.randomUUID(),
      slug: courseSlug(title, readStore().courses.map((item) => item.slug)),
      title,
      summary: summary.slice(0, 280),
      description: description.slice(0, 4000),
      level,
      price: Math.max(0, Math.round(Number(body.price) || 0)),
      status: "draft",
      createdAt: new Date().toISOString(),
      modules: [],
    };
    updateStore((data) => {
      data.courses.unshift(course);
    });
    return NextResponse.json(course);
  }

  if (action === "module") {
    const title = String(body.title || "").trim();
    const course = readStore().courses.find((item) => item.id === body.courseId);
    if (!course || title.length < 2) return NextResponse.json({ error: "Name the week." }, { status: 400 });
    updateStore((data) => {
      const saved = data.courses.find((item) => item.id === course.id);
      saved?.modules.push({ id: crypto.randomUUID(), title: title.slice(0, 120), lessons: [] });
    });
    return NextResponse.json({ ok: true });
  }

  if (action === "status") {
    const status = body.status === "published" ? "published" : "draft";
    updateStore((data) => {
      const saved = data.courses.find((item) => item.id === body.courseId);
      if (saved) saved.status = status;
    });
    return NextResponse.json({ ok: true });
  }

  if (action === "remove-lesson") {
    updateStore((data) => {
      const saved = data.courses.find((item) => item.id === body.courseId);
      const module = saved?.modules.find((item) => item.id === body.moduleId);
      if (module) module.lessons = module.lessons.filter((lesson) => lesson.id !== body.lessonId);
    });
    return NextResponse.json({ ok: true });
  }

  return NextResponse.json({ error: "Unknown action." }, { status: 400 });
}
