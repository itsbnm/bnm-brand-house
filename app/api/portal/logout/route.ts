import { NextResponse } from "next/server";
import { clientCookie } from "@/lib/portal";

export async function POST() {
  const response = NextResponse.json({ ok: true });
  response.cookies.set(clientCookie, "", { httpOnly: true, path: "/", maxAge: 0 });
  return response;
}
