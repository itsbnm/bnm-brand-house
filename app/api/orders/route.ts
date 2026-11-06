import { NextResponse } from "next/server";
import { deliveryFee, priceCatalogueLine } from "@/lib/catalogue";
import { reference } from "@/lib/money";
import { initializePaystack, requestOrigin } from "@/lib/paystack";
import { updateStore } from "@/lib/store";
import type { Order, OrderLine } from "@/lib/types";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  if (!body || body.company) {
    return NextResponse.json({ error: "Unable to place that order." }, { status: 400 });
  }
  const name = String(body.name || "").trim();
  const email = String(body.email || "").trim();
  const phone = String(body.phone || "").trim();
  if (name.length < 2 || !email.includes("@") || phone.length < 6) {
    return NextResponse.json({ error: "Add your name, email, and phone." }, { status: 400 });
  }
  const requested = (Array.isArray(body.lines) ? body.lines : []).slice(0, 20) as {
    kind?: string;
    id?: string;
    qty?: number;
    options?: string;
  }[];
  const lines = requested
    .map((line) =>
      priceCatalogueLine({
        kind: line.kind === "service" || line.kind === "resource" ? line.kind : "product",
        id: String(line.id || ""),
        qty: Number(line.qty || 1),
        options: line.options ? String(line.options) : undefined,
      }),
    )
    .filter((line): line is OrderLine => line !== null);
  if (!lines.length) {
    return NextResponse.json({ error: "Nothing in this order can be reserved." }, { status: 400 });
  }
  const hasProduct = lines.some((line) => line.kind === "product");
  const shipping = deliveryFee(String(body.delivery || "pickup"), hasProduct);
  const goods = lines.reduce((sum, line) => sum + line.unitPrice * line.qty, 0);
  const order: Order = {
    id: crypto.randomUUID(),
    reference: reference("BNM"),
    createdAt: new Date().toISOString(),
    customer: { name, email, phone },
    lines,
    delivery: shipping.delivery,
    deliveryFee: shipping.fee,
    total: goods + shipping.fee,
    status: "reserved",
    note: String(body.note || "").slice(0, 800),
  };
  updateStore((data) => {
    data.orders.unshift(order);
  });
  const payment = await initializePaystack({
    email,
    amountMajor: order.total,
    reference: order.reference,
    callbackUrl: `${requestOrigin(request)}/pay/return`,
    metadata: {
      kind: "order",
      orderId: order.id,
      customer: name,
      phone,
      summary: lines.map((line) => `${line.name} x${line.qty}`).join("; ").slice(0, 400),
    },
  });
  if (!payment.ok && payment.reason === "failed") {
    updateStore((data) => {
      const saved = data.orders.find((item) => item.id === order.id);
      if (saved && saved.status === "reserved") saved.status = "cancelled";
    });
    return NextResponse.json({ error: payment.message }, { status: 502 });
  }
  return NextResponse.json({
    id: order.id,
    reference: order.reference,
    total: order.total,
    lines: order.lines,
    authorizationUrl: payment.ok ? payment.url : undefined,
  });
}
