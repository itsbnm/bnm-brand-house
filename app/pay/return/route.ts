import { NextResponse } from "next/server";
import { settleReference, verifyPaystack } from "@/lib/paystack";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const reference = url.searchParams.get("reference") || url.searchParams.get("trxref") || "";
  const home = new URL("/checkout?payment=failed", url.origin);
  if (!reference) return NextResponse.redirect(home);
  const verified = await verifyPaystack(reference);
  if (!verified.ok || verified.status !== "success") return NextResponse.redirect(home);
  const settled = settleReference(reference, verified);
  if (!settled.settled) return NextResponse.redirect(home);
  return NextResponse.redirect(new URL(`/confirmed?kind=${settled.kind}&id=${settled.id}`, url.origin));
}
