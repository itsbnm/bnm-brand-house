import fs from "fs";
import { Readable } from "stream";
import { NextResponse } from "next/server";
import { currentLearner } from "./learner";
import { readStore } from "./store";
import { uploadFile } from "./uploads";

export async function openMedia(mediaId: string, request: Request, contentType: string) {
  const email = await currentLearner();
  const store = readStore();
  const allowed = store.courses.some((course) => {
    const enrolled = store.enrollments.some((item) => item.courseId === course.id && item.email === email);
    return enrolled && course.modules.some((module) => module.lessons.some((lesson) => lesson.mediaId === mediaId));
  });
  const file = allowed ? uploadFile(mediaId) : null;
  if (!file) return NextResponse.json({ error: "This file stays inside the course." }, { status: 403 });
  const stat = fs.statSync(file);
  const range = request.headers.get("range");
  const headers = {
    "Content-Type": contentType,
    "Accept-Ranges": "bytes",
    "Cache-Control": "private, no-store",
    "Content-Disposition": "inline",
    "X-Content-Type-Options": "nosniff",
  };
  if (range) {
    const [startRaw, endRaw] = range.replace("bytes=", "").split("-");
    const start = Number(startRaw);
    const end = endRaw ? Number(endRaw) : Math.min(start + 1024 * 1024 - 1, stat.size - 1);
    if (Number.isNaN(start) || start < 0 || end >= stat.size || end < start) {
      return new NextResponse(null, { status: 416 });
    }
    const stream = fs.createReadStream(file, { start, end });
    return new NextResponse(Readable.toWeb(stream) as ReadableStream, {
      status: 206,
      headers: {
        ...headers,
        "Content-Range": `bytes ${start}-${end}/${stat.size}`,
        "Content-Length": String(end - start + 1),
      },
    });
  }
  const stream = fs.createReadStream(file);
  return new NextResponse(Readable.toWeb(stream) as ReadableStream, {
    headers: { ...headers, "Content-Length": String(stat.size) },
  });
}
