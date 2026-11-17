import { connection } from "next/server";
import { openMedia } from "@/lib/course-media";

export async function GET(
  request: Request,
  context: { params: Promise<{ mediaId: string }> },
) {
  await connection();
  const { mediaId } = await context.params;
  const type = mediaId.endsWith(".webm") ? "video/webm" : mediaId.endsWith(".pdf") ? "application/pdf" : "video/mp4";
  return openMedia(mediaId, request, type);
}
