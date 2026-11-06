import { NextResponse } from "next/server";
import { readStore } from "@/lib/store";

export async function GET(
  _request: Request,
  context: { params: Promise<{ id: string }> },
) {
  const { id } = await context.params;
  const booking = readStore().bookings.find((item) => item.id === id);
  if (!booking) return NextResponse.json({ error: "Booking not found." }, { status: 404 });
  return NextResponse.json(booking);
}
