import { createHmac, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";

export const learnerCookie = "bnm_learner";

function secret() {
  return process.env.ADMIN_SECRET || "bnm-studio-local-secret";
}

export function signLearner(email: string) {
  const norm = email.trim().toLowerCase();
  const sig = createHmac("sha256", secret()).update(`learner:${norm}`).digest("hex");
  return `${Buffer.from(norm).toString("base64url")}.${sig}`;
}

export function readLearner(value: string | undefined) {
  if (!value) return "";
  const [encoded, sig] = value.split(".");
  if (!encoded || !sig) return "";
  let email = "";
  try {
    email = Buffer.from(encoded, "base64url").toString("utf8");
  } catch {
    return "";
  }
  const expected = signLearner(email).split(".")[1];
  const left = Buffer.from(sig);
  const right = Buffer.from(expected);
  if (left.length !== right.length || !timingSafeEqual(left, right)) return "";
  return email;
}

export async function currentLearner() {
  const jar = await cookies();
  return readLearner(jar.get(learnerCookie)?.value);
}
