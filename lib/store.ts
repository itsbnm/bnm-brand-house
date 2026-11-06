import fs from "fs";
import path from "path";
import type { StudioData } from "./types";

const file = path.join(process.cwd(), "data", "studio.json");

function empty(): StudioData {
  return { orders: [], bookings: [], enquiries: [], testimonials: [], articles: [] };
}

export function readStore(): StudioData {
  try {
    const parsed = JSON.parse(fs.readFileSync(file, "utf8")) as Partial<StudioData>;
    return { ...empty(), ...parsed };
  } catch {
    return empty();
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
