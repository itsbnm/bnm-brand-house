import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/auth";
import { currentClient } from "@/lib/portal";
import { updateStore } from "@/lib/store";
import { saveUpload } from "@/lib/uploads";

const allowed = new Set(["pdf", "png", "jpg", "jpeg", "webp", "doc", "docx", "ppt", "pptx", "xls", "xlsx", "txt", "zip", "mp4"]);

export async function POST(request: Request, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params;
  const studio = await isAdmin();
  const email = await currentClient();
  const form = await request.formData();
  const file = form.get("file");
  const note = String(form.get("note") || "").trim().slice(0, 300);
  if (!(file instanceof File) || file.size === 0) return NextResponse.json({ error: "Choose a file." }, { status: 400 });
  if (file.size > 25 * 1024 * 1024) return NextResponse.json({ error: "Keep each file under 25 MB." }, { status: 400 });
  const ext = file.name.split(".").pop()?.toLowerCase() || "";
  if (!allowed.has(ext)) return NextResponse.json({ error: "Use a PDF, image, Office file, text, zip, or MP4." }, { status: 400 });

  let saved = false;
  const mediaId = `${crypto.randomUUID()}.${ext}`;
  updateStore((data) => {
    const portal = data.portals.find((item) => item.id === id);
    if (!portal) return;
    if (!studio && portal.email !== email) return;
    if (!studio && !email) return;
    portal.files.unshift({
      id: crypto.randomUUID(),
      name: file.name.replace(/[^\w.\- ()]+/g, "").slice(0, 120) || `file.${ext}`,
      mediaId,
      from: studio ? "studio" : "client",
      note,
      createdAt: new Date().toISOString(),
    });
    saved = true;
  });
  if (!saved) return NextResponse.json({ error: "This portal is not open to you." }, { status: 404 });
  saveUpload(mediaId, Buffer.from(await file.arrayBuffer()));
  return NextResponse.json({ ok: true });
}
