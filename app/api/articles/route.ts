import { connection, NextResponse } from "next/server";
import { readStore } from "@/lib/store";

export async function GET() {
  await connection();
  const articles = readStore().articles.filter((article) => article.status === "published");
  return NextResponse.json({ articles });
}
