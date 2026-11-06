import { NextResponse } from "next/server";
import { readStore } from "@/lib/store";

export async function GET(
  _request: Request,
  context: { params: Promise<{ id: string }> },
) {
  const { id } = await context.params;
  const order = readStore().orders.find((item) => item.id === id);
  if (!order) return NextResponse.json({ error: "Order not found." }, { status: 404 });
  return NextResponse.json(order);
}
