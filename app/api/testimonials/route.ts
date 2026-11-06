import { NextResponse } from "next/server";
import { readStore, updateStore } from "@/lib/store";
import type { Testimonial } from "@/lib/types";

export async function GET() {
  const approved = readStore().testimonials.filter((item) => item.status === "approved");
  return NextResponse.json({ testimonials: approved });
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  if (!body || body.company) {
    return NextResponse.json({ error: "Unable to save that." }, { status: 400 });
  }
  const name = String(body.name || "").trim();
  const quote = String(body.quote || "").trim();
  if (name.length < 2 || quote.length < 20) {
    return NextResponse.json(
      { error: "Add your name and at least a sentence of feedback." },
      { status: 400 },
    );
  }
  const testimonial: Testimonial = {
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    name,
    role: String(body.role || "").slice(0, 120),
    quote: quote.slice(0, 800),
    status: "pending",
  };
  updateStore((data) => {
    data.testimonials.unshift(testimonial);
  });
  return NextResponse.json({ ok: true });
}
