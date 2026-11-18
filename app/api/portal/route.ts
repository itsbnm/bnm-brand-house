import { NextResponse } from "next/server";
import { connection } from "next/server";
import { currentClient, publicPortal } from "@/lib/portal";
import { readStore } from "@/lib/store";

export async function GET() {
  await connection();
  const email = await currentClient();
  if (!email) return NextResponse.json({ error: "Sign in required." }, { status: 401 });
  const portals = readStore()
    .portals.filter((item) => item.email === email)
    .map(publicPortal);
  return NextResponse.json({ portals });
}
