"use client";

import Link from "next/link";
import { useState } from "react";

type Who = "personal" | "business" | "organisation";
type Need = "position" | "identity" | "visibility" | "website" | "goods" | "learn";
type When = "exploring" | "month" | "deadline";

const steps = ["Who it is for", "What is stuck", "How soon"] as const;

export function GuideWizard() {
  const [step, setStep] = useState(0);
  const [who, setWho] = useState<Who | "">("");
  const [need, setNeed] = useState<Need | "">("");
  const [when, setWhen] = useState<When | "">("");

  const result = who && need && when ? recommend(who, need, when) : null;

  return (
    <div className="mt-10 rounded-3xl border border-line bg-card p-6 sm:p-8">
      <ol className="flex gap-4 text-xs tracking-[0.16em] text-muted uppercase">
        {steps.map((label, index) => (
          <li key={label} className={index === step && !result ? "text-ink" : undefined}>
            0{index + 1} {label}
          </li>
        ))}
      </ol>
      {result ? (
        <div className="mt-8">
          <p className="text-xs tracking-[0.18em] text-gold uppercase">Your next step</p>
          <h2 className="mt-2 text-3xl">{result.title}</h2>
          <p className="mt-3 max-w-2xl leading-7 text-muted">{result.text}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href={result.href} className="rounded-full bg-accent px-5 py-2.5 text-sm text-white">
              {result.action}
            </Link>
            <button
              type="button"
              className="rounded-full border border-line px-5 py-2.5 text-sm"
              onClick={() => {
                setStep(0);
                setWho("");
                setNeed("");
                setWhen("");
              }}
            >
              Start again
            </button>
          </div>
          <h3 className="mt-8 text-xl">Prepare this</h3>
          <ul className="mt-3 grid gap-2 text-sm leading-6 text-muted">
            {result.prepare.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      ) : (
        <fieldset className="mt-8">
          <legend className="text-2xl">{steps[step]}</legend>
          <div className="mt-4 grid gap-3">
            {options[step].map((option) => (
              <button
                key={option.id}
                type="button"
                className="rounded-2xl border border-line px-4 py-3 text-left hover:border-ink"
                onClick={() => {
                  if (step === 0) setWho(option.id as Who);
                  if (step === 1) setNeed(option.id as Need);
                  if (step === 2) setWhen(option.id as When);
                  setStep((value) => value + 1);
                }}
              >
                <span className="block">{option.label}</span>
                <span className="mt-1 block text-sm text-muted">{option.detail}</span>
              </button>
            ))}
          </div>
          {step > 0 ? (
            <button type="button" className="mt-4 text-sm text-muted" onClick={() => setStep((value) => value - 1)}>
              Back
            </button>
          ) : null}
        </fieldset>
      )}
    </div>
  );
}

const options = [
  [
    { id: "personal", label: "A personal brand", detail: "A founder, speaker, or public figure." },
    { id: "business", label: "A business", detail: "A company with an offer to sharpen or dress." },
    { id: "organisation", label: "An organisation", detail: "A foundation, institution, or group brand." },
  ],
  [
    { id: "position", label: "The position is unclear", detail: "People cannot repeat what you are for." },
    { id: "identity", label: "The look is inconsistent", detail: "Every item feels designed from scratch." },
    { id: "visibility", label: "The right people are not hearing it", detail: "PR, social, or a public story." },
    { id: "website", label: "The site does not help anyone act", detail: "A brochure, or no site at all." },
    { id: "goods", label: "You need physical branded goods", detail: "Staff kits, gifts, packaging, or an event run." },
    { id: "learn", label: "You want to decide before you hire", detail: "A checklist, workbook, or the short course." },
  ],
  [
    { id: "exploring", label: "Still exploring", detail: "No date. You want the right door." },
    { id: "month", label: "This month", detail: "You can start a fixed package or a session now." },
    { id: "deadline", label: "There is a fixed deadline", detail: "An event, launch, or board date." },
  ],
];

function recommend(who: Who, need: Need, when: When) {
  const prepare = [
    "One sentence on who it is for and what changes for them.",
    "Two or three examples of the current public face.",
    "The date the work needs to be in use, if you have one.",
  ];
  if (need === "learn") {
    return {
      title: "Read first, then book only if the checklist says so",
      text: "Start with the open checklist. If the position is the gap, the workbook is the next hour. If you want the studio’s sequence, take Brand decisions.",
      href: "/resources",
      action: "Open resources",
      prepare,
    };
  }
  if (need === "goods") {
    return {
      title: when === "deadline" ? "Get a print estimate today" : "Buy ready-made, or price a custom run",
      text: "Ready-made pieces check out immediately. Anything with your artwork goes through the custom desk, which returns a range before a producer confirms it.",
      href: when === "exploring" ? "/shop" : "/shop/custom",
      action: when === "exploring" ? "Browse the shop" : "Estimate a print run",
      prepare: ["Vector artwork, if you have it.", "Quantity and the day you need the goods in hand.", ...prepare],
    };
  }
  if (need === "position" || when === "exploring") {
    return {
      title: who === "personal" ? "Book a session for the personal brand" : "Book a strategy session before a larger engagement",
      text: "Seventy-five minutes, a written summary, and a decision about whether identity, PR, or a site should come next. Strategy engagements beyond the session are quoted.",
      href: "/consult",
      action: "Choose a time",
      prepare,
    };
  }
  if (need === "identity") {
    const offer = who === "organisation" ? "signature" : who === "personal" ? "presence" : "presence";
    return {
      title: who === "organisation" ? "Start with Signature, or ask for Premium" : "Brand Presence is the likely fit",
      text:
        who === "organisation"
          ? "An organisation usually needs a system, not a starter logo. Signature is $2,500 and can be reserved now. Premium and bespoke are there if the footprint is wider."
          : "Presence is $1,500 and covers a consistent public face. Essentials is enough only if you are launching with a short list of materials.",
      href: `/checkout?offer=${offer}`,
      action: "Reserve this package",
      prepare,
    };
  }
  if (need === "visibility") {
    return {
      title: "Start with the social audit, then scope PR if the story needs a public placement",
      text: "The audit is $400 and returns a 30-day correction. A PR or outdoor campaign is quoted, because the city, the story, and the duration change the price.",
      href: "/checkout?offer=social-audit",
      action: "Reserve the audit",
      prepare,
    };
  }
  if (need === "website") {
    return {
      title: when === "deadline" ? "Tell us the date, and reserve a launch site if the scope is a marketing site" : "A launch site is the fixed start",
      text: "A marketing site is $2,200. Shops, booking, and member areas are quoted as a platform, because the operation decides the build.",
      href: when === "deadline" ? "/contact?topic=Website%20with%20a%20deadline" : "/checkout?offer=site-launch",
      action: when === "deadline" ? "Send the deadline" : "Reserve a launch site",
      prepare,
    };
  }
  return {
    title: "Book the session",
    text: "The guide could not see a fixed package that matches. A consultation will.",
    href: "/consult",
    action: "Choose a time",
    prepare,
  };
}
