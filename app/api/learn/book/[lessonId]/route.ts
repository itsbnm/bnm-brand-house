import { connection } from "next/server";
import { openMedia } from "@/lib/course-media";

export async function GET(
  request: Request,
  context: { params: Promise<{ lessonId: string }> },
) {
  await connection();
  const { lessonId } = await context.params;
  const { readStore } = await import("@/lib/store");
  let mediaId = "";
  for (const course of readStore().courses) {
    for (const module of course.modules) {
      const lesson = module.lessons.find((item) => item.id === lessonId && item.kind === "book");
      if (lesson?.mediaId) mediaId = lesson.mediaId;
    }
  }
  if (!mediaId) return new Response("Not found", { status: 404 });
  return openMedia(mediaId, request, "application/pdf");
}
