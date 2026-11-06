import { NextResponse } from "next/server";
import { adminCookie, adminToken, passwordMatches } from "@/lib/auth";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const password = String(body?.password || "");
  if (!passwordMatches(password)) {
    return NextResponse.json({ error: "That password is not recognised." }, { status: 401 });
  }
  const response = NextResponse.json({ ok: true });
  response.cookies.set(adminCookie, adminToken(), {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 14,
  });
  return response;
}
