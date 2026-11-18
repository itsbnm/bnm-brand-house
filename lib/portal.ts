import { createHmac, randomBytes, scryptSync, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";
import type { ClientPortal, Milestone } from "./types";

export const clientCookie = "bnm_client";

const weekCopy = [
  {
    title: "Share the brief",
    clientExpects: "Send the materials you already have, and the questions you want answered.",
    studioExpects: "Read what you send and name what is still missing.",
  },
  {
    title: "Set the direction",
    clientExpects: "Answer the requests we send, and say what does not fit.",
    studioExpects: "Propose the direction for the work.",
  },
  {
    title: "Make the work",
    clientExpects: "Review what we send and tell us what should change.",
    studioExpects: "Produce the pieces we agreed.",
  },
  {
    title: "Hand it over",
    clientExpects: "Confirm what you are taking away.",
    studioExpects: "Deliver the files, the links, and a short record of the work.",
  },
];

function secret() {
  return process.env.ADMIN_SECRET || "bnm-studio-local-secret";
}

export function hashPassword(password: string) {
  const salt = randomBytes(16).toString("hex");
  const hash = scryptSync(password, salt, 32).toString("hex");
  return `${salt}.${hash}`;
}

export function passwordOk(password: string, stored: string) {
  const [salt, hash] = stored.split(".");
  if (!salt || !hash) return false;
  const next = scryptSync(password, salt, 32);
  const prev = Buffer.from(hash, "hex");
  if (next.length !== prev.length) return false;
  return timingSafeEqual(next, prev);
}

export function signClient(email: string) {
  const norm = email.trim().toLowerCase();
  const sig = createHmac("sha256", secret()).update(`client:${norm}`).digest("hex");
  return `${Buffer.from(norm).toString("base64url")}.${sig}`;
}

export function readClient(value: string | undefined) {
  if (!value) return "";
  const [encoded, sig] = value.split(".");
  if (!encoded || !sig) return "";
  let email = "";
  try {
    email = Buffer.from(encoded, "base64url").toString("utf8");
  } catch {
    return "";
  }
  const expected = signClient(email).split(".")[1];
  const left = Buffer.from(sig);
  const right = Buffer.from(expected);
  if (left.length !== right.length || !timingSafeEqual(left, right)) return "";
  return email;
}

export async function currentClient() {
  const jar = await cookies();
  return readClient(jar.get(clientCookie)?.value);
}

function addDays(iso: string, days: number) {
  const date = new Date(`${iso}T00:00:00Z`);
  date.setUTCDate(date.getUTCDate() + days);
  return date.toISOString().slice(0, 10);
}

export function buildMilestones(startsOn: string, days: number, count: number): Milestone[] {
  const weeks = Math.min(8, Math.max(1, count));
  const span = Math.max(weeks, days);
  const chunk = Math.floor(span / weeks);
  return Array.from({ length: weeks }, (_, index) => {
    const startOffset = index * chunk;
    const endOffset = index === weeks - 1 ? span - 1 : startOffset + chunk - 1;
    const copy = weekCopy[index] || {
      title: `Week ${index + 1}`,
      clientExpects: "Send what this week asks for.",
      studioExpects: "Complete the work promised for this week.",
    };
    return {
      id: crypto.randomUUID(),
      title: copy.title,
      startsOn: addDays(startsOn, startOffset),
      endsOn: addDays(startsOn, endOffset),
      clientExpects: copy.clientExpects,
      studioExpects: copy.studioExpects,
      status: index === 0 ? "current" : "upcoming",
    };
  });
}

export function publicPortal(portal: ClientPortal) {
  const { passwordHash: _password, ...rest } = portal;
  return rest;
}

export function advanceMilestones(portal: ClientPortal, milestoneId: string, status: Milestone["status"]) {
  const milestone = portal.milestones.find((item) => item.id === milestoneId);
  if (!milestone) return;
  milestone.status = status;
  if (status === "done" && !portal.milestones.some((item) => item.status === "current")) {
    const next = portal.milestones.find((item) => item.status === "upcoming");
    if (next) next.status = "current";
  }
}
