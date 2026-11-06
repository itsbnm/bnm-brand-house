import { NextResponse } from "next/server";
import { reference } from "@/lib/money";
import { upcomingSlots } from "@/lib/slots";
import { readStore, updateStore } from "@/lib/store";
import type { Booking } from "@/lib/types";

export async function GET() {
  const taken = readStore()
    .bookings.filter((booking) => booking.status !== "cancelled")
    .map((booking) => booking.slotId);
  return NextResponse.json({ slots: upcomingSlots(taken) });
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  if (!body || body.company) {
    return NextResponse.json({ error: "Unable to book that session." }, { status: 400 });
  }
  const name = String(body.name || "").trim();
  const email = String(body.email || "").trim();
  const phone = String(body.phone || "").trim();
  const slotId = String(body.slotId || "");
  const audience = body.audience === "business" ? "business" : "personal";
  if (name.length < 2 || !email.includes("@") || phone.length < 6 || !slotId) {
    return NextResponse.json({ error: "Add your details and choose a time." }, { status: 400 });
  }

  const taken = readStore()
    .bookings.filter((booking) => booking.status !== "cancelled")
    .map((booking) => booking.slotId);
  const slot = upcomingSlots(taken).find((item) => item.id === slotId);
  if (!slot) {
    return NextResponse.json({ error: "That time was just taken. Choose another." }, { status: 409 });
  }

  const booking: Booking = {
    id: crypto.randomUUID(),
    reference: reference("SES"),
    createdAt: new Date().toISOString(),
    slotId,
    slotLabel: slot.label,
    audience,
    customer: { name, email, phone },
    focus: String(body.focus || "").slice(0, 800),
    status: "reserved",
  };
  let saved = false;
  updateStore((data) => {
    const held = data.bookings.some((item) => item.slotId === slotId && item.status !== "cancelled");
    if (held) return;
    data.bookings.unshift(booking);
    saved = true;
  });
  if (!saved) {
    return NextResponse.json({ error: "That time was just taken. Choose another." }, { status: 409 });
  }
  return NextResponse.json({ id: booking.id, reference: booking.reference, slotLabel: booking.slotLabel });
}
