import { createHmac, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";

export const adminCookie = "bnm_admin";

function secret() {
  return process.env.ADMIN_SECRET || "bnm-studio-local-secret";
}

export function expectedPassword() {
  return process.env.ADMIN_PASSWORD || "brandhouse";
}

export function adminReadyForProduction() {
  if (process.env.VERCEL !== "1") return true;
  return Boolean(process.env.ADMIN_PASSWORD && process.env.ADMIN_SECRET);
}

export function adminToken() {
  return createHmac("sha256", secret()).update("bnm-admin").digest("hex");
}

export function passwordMatches(input: string) {
  const given = Buffer.from(input);
  const expected = Buffer.from(expectedPassword());
  if (given.length !== expected.length) return false;
  return timingSafeEqual(given, expected);
}

export async function isAdmin() {
  const jar = await cookies();
  const value = jar.get(adminCookie)?.value;
  if (!value) return false;
  const token = Buffer.from(adminToken());
  const given = Buffer.from(value);
  if (given.length !== token.length) return false;
  return timingSafeEqual(given, token);
}
