import { NextResponse } from "next/server";
import { estimatePrint } from "@/lib/quote";
import { reference } from "@/lib/money";
import { updateStore } from "@/lib/store";
import type { Enquiry } from "@/lib/types";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  if (!body || body.company) {
    return NextResponse.json({ error: "Unable to send that." }, { status: 400 });
  }
  const name = String(body.name || "").trim();
  const email = String(body.email || "").trim();
  const phone = String(body.phone || "").trim();
  const message = String(body.message || "").trim();
  const kind = body.kind === "custom" || body.kind === "service" ? body.kind : "general";
  if (name.length < 2 || !email.includes("@") || message.length < 8) {
    return NextResponse.json({ error: "Add your name, email, and a short brief." }, { status: 400 });
  }

  let estimate: Enquiry["estimate"];
  let topic = String(body.topic || "General enquiry").slice(0, 160);
  if (kind === "custom") {
    const quantity = Number(body.quantity || 0);
    if (!quantity) {
      return NextResponse.json({ error: "Add a quantity." }, { status: 400 });
    }
    const quote = estimatePrint({
      product: String(body.product || "other"),
      quantity,
      sides: body.sides === 2 ? 2 : 1,
      rush: Boolean(body.rush),
    });
    estimate = quote;
    topic = `Custom ${body.product || "print"} · ${quantity}`;
  }

  const enquiry: Enquiry = {
    id: crypto.randomUUID(),
    reference: reference(kind === "custom" ? "PRT" : "ENQ"),
    createdAt: new Date().toISOString(),
    kind,
    customer: { name, email, phone },
    topic,
    message: message.slice(0, 4000),
    estimate,
    status: "new",
  };
  updateStore((data) => {
    data.enquiries.unshift(enquiry);
  });
  return NextResponse.json({
    id: enquiry.id,
    reference: enquiry.reference,
    estimate: enquiry.estimate ?? null,
  });
}
