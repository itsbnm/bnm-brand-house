import { NextResponse } from "next/server";
import { connection } from "next/server";
import { outline } from "@/lib/courses";
import { readStore } from "@/lib/store";

export async function GET() {
  await connection();
  const courses = readStore()
    .courses.filter((course) => course.status === "published")
    .map(outline);
  return NextResponse.json({ courses });
}
