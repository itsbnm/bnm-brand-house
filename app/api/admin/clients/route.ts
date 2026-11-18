import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/auth";
import { buildMilestones, hashPassword, publicPortal } from "@/lib/portal";
import { readStore, updateStore } from "@/lib/store";
import type { ClientPortal } from "@/lib/types";

export async function GET() {
  if (!(await isAdmin())) return NextResponse.json({ error: "Sign in required." }, { status: 401 });
  return NextResponse.json({
    portals: readStore().portals.map((portal) => ({
      id: portal.id,
      name: portal.name,
      email: portal.email,
      project: portal.project,
      status: portal.status,
      startsOn: portal.startsOn,
      days: portal.days,
      createdAt: portal.createdAt,
    })),
  });
}

export async function POST(request: Request) {
  if (!(await isAdmin())) return NextResponse.json({ error: "Sign in required." }, { status: 401 });
  const body = await request.json().catch(() => null);
  const name = String(body?.name || "").trim();
  const email = String(body?.email || "").trim().toLowerCase();
  const phone = String(body?.phone || "").trim();
  const project = String(body?.project || "").trim();
  const summary = String(body?.summary || "").trim();
  const password = String(body?.password || "");
  const startsOn = /^\d{4}-\d{2}-\d{2}$/.test(String(body?.startsOn || ""))
    ? String(body.startsOn)
    : new Date().toISOString().slice(0, 10);
  const days = Math.min(365, Math.max(7, Math.round(Number(body?.days) || 30)));
  const weeks = Math.min(8, Math.max(1, Math.round(Number(body?.weeks) || 4)));
  if (name.length < 2 || !email.includes("@") || project.length < 3) {
    return NextResponse.json({ error: "Add the client’s name, email, and project." }, { status: 400 });
  }
  if (password.length < 8) {
    return NextResponse.json({ error: "Give the client a password of at least 8 characters." }, { status: 400 });
  }
  const portal: ClientPortal = {
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    name: name.slice(0, 80),
    email,
    phone: phone.slice(0, 40),
    passwordHash: hashPassword(password),
    project: project.slice(0, 140),
    summary: summary.slice(0, 2000),
    startsOn,
    days,
    status: "active",
    milestones: buildMilestones(startsOn, days, weeks),
    files: [],
    requests: [],
    meetings: [],
    links: [],
    messages: [],
  };
  updateStore((data) => {
    data.portals.unshift(portal);
  });
  return NextResponse.json(publicPortal(portal));
}
