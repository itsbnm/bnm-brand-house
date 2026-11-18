import fs from "fs";
import { Readable } from "stream";
import { NextResponse } from "next/server";
import { connection } from "next/server";
import { isAdmin } from "@/lib/auth";
import { currentClient } from "@/lib/portal";
import { readStore } from "@/lib/store";
import { uploadFile } from "@/lib/uploads";

const types: Record<string, string> = {
  pdf: "application/pdf",
  png: "image/png",
  jpg: "image/jpeg",
  jpeg: "image/jpeg",
  webp: "image/webp",
  txt: "text/plain",
  mp4: "video/mp4",
  zip: "application/zip",
};

export async function GET(_request: Request, context: { params: Promise<{ fileId: string }> }) {
  await connection();
  const { fileId } = await context.params;
  const store = readStore();
  const portal = store.portals.find((item) => item.files.some((file) => file.id === fileId));
  const file = portal?.files.find((item) => item.id === fileId);
  if (!portal || !file) return NextResponse.json({ error: "File not found." }, { status: 404 });
  const allowed = (await isAdmin()) || (await currentClient()) === portal.email;
  const path = allowed ? uploadFile(file.mediaId) : null;
  if (!path) return NextResponse.json({ error: "This file stays inside the portal." }, { status: 403 });
  const ext = file.mediaId.split(".").pop()?.toLowerCase() || "";
  const stream = fs.createReadStream(path);
  return new NextResponse(Readable.toWeb(stream) as ReadableStream, {
    headers: {
      "Content-Type": types[ext] || "application/octet-stream",
      "Content-Length": String(fs.statSync(path).size),
      "Content-Disposition": `attachment; filename="${file.name.replace(/"/g, "")}"`,
      "Cache-Control": "private, no-store",
      "X-Content-Type-Options": "nosniff",
    },
  });
}
