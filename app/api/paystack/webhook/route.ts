import { NextResponse } from "next/server";
import { settleReference, signatureMatches, verifyPaystack } from "@/lib/paystack";

export async function POST(request: Request) {
  const raw = await request.text();
  if (!signatureMatches(raw, request.headers.get("x-paystack-signature"))) {
    return NextResponse.json({ error: "Invalid signature." }, { status: 401 });
  }
  let event: { event?: string; data?: { reference?: string } };
  try {
    event = JSON.parse(raw) as { event?: string; data?: { reference?: string } };
  } catch {
    return NextResponse.json({ error: "Invalid payload." }, { status: 400 });
  }
  const reference = event.data?.reference;
  if (event.event === "charge.success" && reference) {
    const verified = await verifyPaystack(reference);
    if (verified.ok) settleReference(reference, verified);
  }
  return NextResponse.json({ received: true });
}
