import fs from "fs";
import path from "path";
import type { StudioData } from "./types";

const file = path.join(process.cwd(), "data", "studio.json");

function empty(): StudioData {
  return { orders: [], bookings: [], enquiries: [], testimonials: [], articles: [], courses: [], enrollments: [], portals: [] };
}

export function readStore(): StudioData {
  const base = empty();
  try {
    const parsed = JSON.parse(fs.readFileSync(file, "utf8")) as Partial<StudioData>;
    return {
      ...base,
      ...parsed,
      orders: parsed.orders ?? base.orders,
      bookings: parsed.bookings ?? base.bookings,
      enquiries: parsed.enquiries ?? base.enquiries,
      testimonials: parsed.testimonials ?? base.testimonials,
      articles: parsed.articles ?? base.articles,
      courses: parsed.courses ?? base.courses,
      enrollments: parsed.enrollments ?? base.enrollments,
      portals: parsed.portals ?? base.portals,
    };
  } catch {
    return base;
  }
}

export function writeStore(data: StudioData) {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, JSON.stringify(data, null, 2));
}

export function updateStore(change: (data: StudioData) => void) {
  const data = readStore();
  change(data);
  writeStore(data);
  return data;
}
