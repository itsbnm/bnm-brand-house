import { NextResponse } from "next/server";
import { clientCookie, passwordOk, signClient } from "@/lib/portal";
import { readStore } from "@/lib/store";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const email = String(body?.email || "").trim().toLowerCase();
  const password = String(body?.password || "");
  const portals = readStore().portals.filter((item) => item.email === email);
  const match = portals.find((item) => passwordOk(password, item.passwordHash));
  if (!match) return NextResponse.json({ error: "That email or password is not recognised." }, { status: 401 });
  const response = NextResponse.json({ ok: true });
  response.cookies.set(clientCookie, signClient(email), {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 180,
  });
  return response;
}
