import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/auth";
import { updateStore } from "@/lib/store";
import { saveUpload } from "@/lib/uploads";
import type { Lesson } from "@/lib/types";

export async function POST(request: Request) {
  if (!(await isAdmin())) return NextResponse.json({ error: "Sign in required." }, { status: 401 });
  const form = await request.formData();
  const courseId = String(form.get("courseId") || "");
  const moduleId = String(form.get("moduleId") || "");
  const title = String(form.get("title") || "").trim();
  const kind = String(form.get("kind") || "");
  const text = String(form.get("text") || "").trim();
  const videoUrl = String(form.get("videoUrl") || "").trim();
  const file = form.get("file");
  if (!["video", "text", "book"].includes(kind) || title.length < 2) {
    return NextResponse.json({ error: "Add a lesson title and a type." }, { status: 400 });
  }

  let mediaId = "";
  if (file instanceof File && file.size > 0) {
    if (file.size > 40 * 1024 * 1024) {
      return NextResponse.json({ error: "Keep each file under 40 MB." }, { status: 400 });
    }
    const ext = kind === "book" ? ".pdf" : file.type.includes("webm") ? ".webm" : ".mp4";
    if (kind === "book" && file.type !== "application/pdf") {
      return NextResponse.json({ error: "Books need to be a PDF." }, { status: 400 });
    }
    mediaId = saveUpload(`${crypto.randomUUID()}${ext}`, Buffer.from(await file.arrayBuffer()));
  }

  if (kind === "book" && !mediaId) return NextResponse.json({ error: "Upload the PDF." }, { status: 400 });
  if (kind === "video" && !mediaId && !videoUrl.startsWith("http")) {
    return NextResponse.json({ error: "Add a video file or a video link." }, { status: 400 });
  }
  if (kind === "text" && text.length < 8) return NextResponse.json({ error: "Write the lesson." }, { status: 400 });

  const lesson: Lesson = {
    id: crypto.randomUUID(),
    title: title.slice(0, 140),
    kind: kind as Lesson["kind"],
    text: kind === "text" ? text.slice(0, 20000) : undefined,
    videoUrl: kind === "video" && videoUrl.startsWith("http") ? videoUrl.slice(0, 500) : undefined,
    mediaId: mediaId || undefined,
    minutes: Math.max(0, Math.round(Number(form.get("minutes")) || 0)) || undefined,
  };

  let saved = false;
  updateStore((data) => {
    const course = data.courses.find((item) => item.id === courseId);
    const module = course?.modules.find((item) => item.id === moduleId);
    if (!module) return;
    module.lessons.push(lesson);
    saved = true;
  });
  if (!saved) return NextResponse.json({ error: "That week was not found." }, { status: 404 });
  return NextResponse.json(lesson);
}
