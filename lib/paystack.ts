import { createHmac, timingSafeEqual } from "crypto";
import { updateStore } from "./store";

const CONSULT_PRICE = 250;

export function paystackCurrency() {
  return process.env.PAYSTACK_CURRENCY || "USD";
}

export function paystackReady() {
  return Boolean(process.env.PAYSTACK_SECRET_KEY);
}

export function requestOrigin(request: Request) {
  const url = new URL(request.url);
  const host = request.headers.get("x-forwarded-host") || url.host;
  const proto = request.headers.get("x-forwarded-proto") || url.protocol.replace(":", "");
  return `${proto}://${host}`;
}

export async function initializePaystack(input: {
  email: string;
  amountMajor: number;
  reference: string;
  callbackUrl: string;
  metadata: Record<string, string>;
}) {
  const secret = process.env.PAYSTACK_SECRET_KEY;
  if (!secret) return { ok: false as const, reason: "unconfigured" as const };
  const response = await fetch("https://api.paystack.co/transaction/initialize", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${secret}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: input.email,
      amount: Math.round(input.amountMajor * 100),
      currency: paystackCurrency(),
      reference: input.reference,
      callback_url: input.callbackUrl,
      metadata: input.metadata,
    }),
  });
  const payload = (await response.json().catch(() => null)) as {
    status?: boolean;
    message?: string;
    data?: { authorization_url?: string };
  } | null;
  const url = payload?.data?.authorization_url;
  if (!response.ok || !payload?.status || !url) {
    return {
      ok: false as const,
      reason: "failed" as const,
      message: payload?.message || "Paystack did not start the payment.",
    };
  }
  return { ok: true as const, url };
}

type Verified = {
  ok: true;
  amount: number;
  currency: string;
  status: string;
};

export async function verifyPaystack(reference: string): Promise<Verified | { ok: false; message: string }> {
  const secret = process.env.PAYSTACK_SECRET_KEY;
  if (!secret) return { ok: false, message: "Paystack is not connected." };
  const response = await fetch(`https://api.paystack.co/transaction/verify/${encodeURIComponent(reference)}`, {
    headers: { Authorization: `Bearer ${secret}` },
    cache: "no-store",
  });
  const payload = (await response.json().catch(() => null)) as {
    status?: boolean;
    message?: string;
    data?: { status?: string; amount?: number; currency?: string };
  } | null;
  if (!response.ok || !payload?.status || !payload.data) {
    return { ok: false, message: payload?.message || "Paystack could not verify that payment." };
  }
  return {
    ok: true,
    amount: Number(payload.data.amount || 0),
    currency: String(payload.data.currency || ""),
    status: String(payload.data.status || ""),
  };
}

export function signatureMatches(raw: string, signature: string | null) {
  const secret = process.env.PAYSTACK_SECRET_KEY;
  if (!secret || !signature) return false;
  const hash = createHmac("sha512", secret).update(raw).digest("hex");
  const left = Buffer.from(hash);
  const right = Buffer.from(signature);
  if (left.length !== right.length) return false;
  return timingSafeEqual(left, right);
}

export function settleReference(reference: string, paid: { amount: number; currency: string; status: string }) {
  if (paid.status !== "success" || paid.currency !== paystackCurrency()) {
    return { settled: false as const };
  }
  let kind: "order" | "booking" | null = null;
  let id = "";
  updateStore((data) => {
    const order = data.orders.find((item) => item.reference === reference);
    if (order) {
      if (paid.amount !== Math.round(order.total * 100)) return;
      if (order.status === "reserved") order.status = "paid";
      kind = "order";
      id = order.id;
      return;
    }
    const booking = data.bookings.find((item) => item.reference === reference);
    if (!booking) return;
    if (paid.amount !== CONSULT_PRICE * 100) return;
    if (booking.status === "reserved") booking.status = "paid";
    kind = "booking";
    id = booking.id;
  });
  if (!kind) return { settled: false as const };
  return { settled: true as const, kind, id };
}
