import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/auth";
import { readStore, updateStore } from "@/lib/store";
import type { ExtraArticle } from "@/lib/types";

export async function GET() {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Sign in required." }, { status: 401 });
  }
  return NextResponse.json(readStore());
}

export async function PATCH(request: Request) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Sign in required." }, { status: 401 });
  }
  const body = await request.json().catch(() => null);
  if (!body?.action || !body?.id) {
    return NextResponse.json({ error: "Missing action." }, { status: 400 });
  }
  const id = String(body.id);
  updateStore((data) => {
    if (body.action === "order") {
      const order = data.orders.find((item) => item.id === id);
      if (order && ["reserved", "paid", "fulfilled", "cancelled"].includes(body.status)) {
        order.status = body.status;
      }
    }
    if (body.action === "booking") {
      const booking = data.bookings.find((item) => item.id === id);
      if (booking && ["reserved", "paid", "done", "cancelled"].includes(body.status)) {
        booking.status = body.status;
      }
    }
    if (body.action === "enquiry") {
      const enquiry = data.enquiries.find((item) => item.id === id);
      if (enquiry && ["new", "reviewing", "closed"].includes(body.status)) {
        enquiry.status = body.status;
      }
    }
    if (body.action === "testimonial") {
      const item = data.testimonials.find((entry) => entry.id === id);
      if (item && ["pending", "approved", "rejected"].includes(body.status)) {
        item.status = body.status;
      }
    }
  });
  return NextResponse.json(readStore());
}

export async function POST(request: Request) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Sign in required." }, { status: 401 });
  }
  const body = await request.json().catch(() => null);
  const title = String(body?.title || "").trim();
  const paragraphs = String(body?.body || "")
    .split(/\n+/)
    .map((part: string) => part.trim())
    .filter(Boolean);
  if (title.length < 4 || paragraphs.length === 0) {
    return NextResponse.json({ error: "Add a title and a body." }, { status: 400 });
  }
  const slug = title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
    .slice(0, 80);
  const article: ExtraArticle = {
    id: crypto.randomUUID(),
    slug: `${slug}-${Date.now().toString(36)}`,
    title,
    date: new Date().toISOString().slice(0, 10),
    category: String(body.category || "Studio").slice(0, 40),
    excerpt: String(body.excerpt || paragraphs[0]).slice(0, 220),
    paragraphs,
    related: [],
    status: "published",
  };
  updateStore((data) => {
    data.articles.unshift(article);
  });
  return NextResponse.json(article);
}
