import fs from "fs";
import path from "path";

const root = path.join(process.cwd(), "data", "uploads");

export function saveUpload(filename: string, data: Buffer) {
  const safe = path.basename(filename);
  fs.mkdirSync(root, { recursive: true });
  fs.writeFileSync(path.join(root, safe), data);
  return safe;
}

export function uploadFile(filename: string) {
  const safe = path.basename(filename);
  const full = path.join(root, safe);
  if (!full.startsWith(root) || !fs.existsSync(full)) return null;
  return full;
}
