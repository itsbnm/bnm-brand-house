import { NextResponse } from "next/server";
import { connection } from "next/server";
import { isAdmin } from "@/lib/auth";
import { advanceMilestones, currentClient, publicPortal } from "@/lib/portal";
import { readStore, updateStore } from "@/lib/store";
import type { PortalChannel } from "@/lib/types";

async function access(id: string) {
  const portal = readStore().portals.find((item) => item.id === id);
  if (!portal) return { portal: null, role: "" as const };
  if (await isAdmin()) return { portal, role: "studio" as const };
  const email = await currentClient();
  if (email && email === portal.email) return { portal, role: "client" as const };
  return { portal: null, role: "" as const };
}

export async function GET(_request: Request, context: { params: Promise<{ id: string }> }) {
  await connection();
  const { id } = await context.params;
  const { portal, role } = await access(id);
  if (!portal) return NextResponse.json({ error: "This portal is not open to you." }, { status: 404 });
  return NextResponse.json({ portal: publicPortal(portal), role });
}

export async function POST(request: Request, context: { params: Promise<{ id: string }> }) {
  await connection();
  const { id } = await context.params;
  const { portal, role } = await access(id);
  if (!portal || !role) return NextResponse.json({ error: "This portal is not open to you." }, { status: 404 });
  const body = await request.json().catch(() => null);
  const action = String(body?.action || "");

  if (action === "message") {
    const text = String(body.body || "").trim();
    if (text.length < 2) return NextResponse.json({ error: "Write the note." }, { status: 400 });
    const channels: PortalChannel[] = ["portal", "whatsapp", "email", "call"];
    const channel = role === "studio" && channels.includes(body.channel) ? (body.channel as PortalChannel) : "portal";
    updateStore((data) => {
      data.portals
        .find((item) => item.id === id)
        ?.messages.unshift({
          id: crypto.randomUUID(),
          createdAt: new Date().toISOString(),
          channel,
          author: role,
          body: text.slice(0, 4000),
        });
    });
    return NextResponse.json({ ok: true });
  }

  if (action === "reply" && role === "client") {
    const reply = String(body.reply || "").trim();
    if (reply.length < 2) return NextResponse.json({ error: "Write your reply." }, { status: 400 });
    let found = false;
    updateStore((data) => {
      const requestItem = data.portals.find((item) => item.id === id)?.requests.find((item) => item.id === body.requestId);
      if (!requestItem) return;
      requestItem.reply = reply.slice(0, 4000);
      requestItem.repliedAt = new Date().toISOString();
      requestItem.status = "answered";
      found = true;
    });
    if (!found) return NextResponse.json({ error: "That request was not found." }, { status: 404 });
    return NextResponse.json({ ok: true });
  }

  if (role !== "studio") return NextResponse.json({ error: "The studio updates this part." }, { status: 403 });

  if (action === "milestone") {
    updateStore((data) => {
      const saved = data.portals.find((item) => item.id === id);
      const milestone = saved?.milestones.find((item) => item.id === body.milestoneId);
      if (!saved || !milestone) return;
      if (body.title) milestone.title = String(body.title).trim().slice(0, 80);
      if (body.clientExpects) milestone.clientExpects = String(body.clientExpects).trim().slice(0, 500);
      if (body.studioExpects) milestone.studioExpects = String(body.studioExpects).trim().slice(0, 500);
      const status = body.status === "done" || body.status === "current" || body.status === "upcoming" ? body.status : milestone.status;
      advanceMilestones(saved, milestone.id, status);
    });
    return NextResponse.json({ ok: true });
  }

  if (action === "request") {
    const title = String(body.title || "").trim();
    const detail = String(body.detail || "").trim();
    if (title.length < 3) return NextResponse.json({ error: "Name the request." }, { status: 400 });
    updateStore((data) => {
      data.portals
        .find((item) => item.id === id)
        ?.requests.unshift({
          id: crypto.randomUUID(),
          createdAt: new Date().toISOString(),
          title: title.slice(0, 140),
          detail: detail.slice(0, 2000),
          status: "open",
          reply: "",
          repliedAt: "",
        });
    });
    return NextResponse.json({ ok: true });
  }

  if (action === "meeting") {
    const title = String(body.title || "").trim();
    const summary = String(body.summary || "").trim();
    const heldOn = /^\d{4}-\d{2}-\d{2}$/.test(String(body.heldOn || "")) ? String(body.heldOn) : new Date().toISOString().slice(0, 10);
    if (title.length < 3 || summary.length < 8) return NextResponse.json({ error: "Add a title and a short summary." }, { status: 400 });
    updateStore((data) => {
      data.portals
        .find((item) => item.id === id)
        ?.meetings.unshift({
          id: crypto.randomUUID(),
          createdAt: new Date().toISOString(),
          heldOn,
          title: title.slice(0, 140),
          summary: summary.slice(0, 4000),
        });
    });
    return NextResponse.json({ ok: true });
  }

  if (action === "link") {
    const title = String(body.title || "").trim();
    const url = String(body.url || "").trim();
    if (title.length < 2 || !url.startsWith("http")) return NextResponse.json({ error: "Add a name and a full link." }, { status: 400 });
    updateStore((data) => {
      data.portals
        .find((item) => item.id === id)
        ?.links.unshift({
          id: crypto.randomUUID(),
          createdAt: new Date().toISOString(),
          title: title.slice(0, 140),
          url: url.slice(0, 500),
          note: String(body.note || "").trim().slice(0, 400),
        });
    });
    return NextResponse.json({ ok: true });
  }

  if (action === "project") {
    const status = body.status === "complete" ? "complete" : "active";
    updateStore((data) => {
      const saved = data.portals.find((item) => item.id === id);
      if (!saved) return;
      saved.status = status;
      if (body.summary) saved.summary = String(body.summary).trim().slice(0, 2000);
    });
    return NextResponse.json({ ok: true });
  }

  return NextResponse.json({ error: "Unknown action." }, { status: 400 });
}
