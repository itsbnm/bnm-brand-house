"use client";

import Link from "next/link";
import { useState } from "react";
import {
  archetypeQuestions,
  readArchetypes,
  type ArchetypeId,
  type Audience,
} from "@/lib/archetypes";

const letters = ["A", "B", "C", "D", "E", "F"];

export function ArchetypeTest() {
  const [audience, setAudience] = useState<Audience | "">("");
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<ArchetypeId[]>([]);

  const total = archetypeQuestions.length;
  const finished = audience !== "" && answers.length === total;
  const result = finished ? readArchetypes(answers) : null;
  const question = audience && !finished ? archetypeQuestions[step] : null;

  function restart(next: Audience | "" = "") {
    setAudience(next);
    setStep(0);
    setAnswers([]);
  }

  if (result && audience) {
    const business = audience === "business";
    return (
      <div className="reveal mt-12" aria-live="polite">
        <section className="on-night rounded-[32px] bg-black px-[clamp(28px,6vw,72px)] py-[clamp(48px,7vw,88px)] text-center text-[#f5f5f7]">
          <p className="eyebrow !text-[#a1a1a6]">{business ? "Your business brand archetype" : "Your personal brand archetype"}</p>
          <h2 className="mt-4 text-[clamp(48px,8vw,96px)] leading-none font-bold tracking-[-0.04em]">{result.primary.name}</h2>
          <p className="mx-auto mt-6 max-w-[640px] text-[clamp(21px,2.4vw,26px)] leading-[1.35] font-medium">{result.primary.line}</p>
          <p className="mx-auto mt-6 max-w-[620px] text-[19px] leading-[1.5] text-[#a1a1a6]">
            You lead with this, with a streak of <strong className="font-semibold text-[#f5f5f7]">{result.secondary.name}</strong>.
          </p>
        </section>

        <div className="mt-5 grid gap-5 md:grid-cols-2">
          <div className="rounded-3xl bg-card p-9">
            <p className="text-[13px] font-semibold text-muted">What it means</p>
            <p className="mt-3 text-[19px] leading-[1.55]">{result.primary.reading}</p>
            {result.close ? (
              <p className="mt-4 text-[15px] leading-[1.5] text-muted">
                These two finished level. The main reading is the one your later answers kept returning to.
              </p>
            ) : null}
          </div>
          <div className="rounded-3xl border border-line p-9">
            <p className="text-[13px] font-semibold text-muted">Your secondary archetype</p>
            <h3 className="mt-2 text-[28px]">{result.secondary.name}</h3>
            <p className="mt-3 text-[17px] leading-[1.55] text-muted">{result.secondary.reading}</p>
          </div>
        </div>

        <section className="mt-5 rounded-[32px] bg-card px-8 py-[clamp(40px,6vw,64px)] text-center">
          <h2 className="mx-auto max-w-[720px] text-[clamp(30px,4.2vw,48px)] leading-[1.08] font-bold">
            {business ? "Now make the whole business sound like it." : "Now build a personal brand that sounds like you."}
          </h2>
          <p className="mx-auto mt-4 max-w-[560px] text-[19px] leading-[1.47] text-muted">
            Bring this result to a one-to-one session, or learn the full method in the Academy.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link href="/consult" className="btn">
              Talk it through · $250
            </Link>
            <Link href="/learn" className="btn-ghost">
              Explore the Academy
            </Link>
          </div>
          <div className="mt-7 flex flex-wrap justify-center gap-7">
            <button type="button" className="more min-h-11" onClick={() => restart(audience)}>
              Retake the test
            </button>
            <button type="button" className="more min-h-11" onClick={() => restart(business ? "personal" : "business")}>
              {business ? "Take the personal test" : "Take the business test"}
            </button>
          </div>
        </section>
      </div>
    );
  }

  if (!audience) {
    return (
      <div className="mt-14">
        <p className="mb-5 text-center text-[17px] font-semibold">Who are we discovering today?</p>
        <div className="grid gap-5 md:grid-cols-2">
          <button
            type="button"
            onClick={() => restart("personal")}
            className="lift flex min-h-[260px] flex-col gap-3 rounded-[28px] bg-card p-10 text-left"
          >
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true">
              <circle cx="12" cy="8" r="4" />
              <path d="M4 21c0-4.4 3.6-8 8-8s8 3.6 8 8" />
            </svg>
            <span className="mt-auto text-[32px] font-bold tracking-tight">For myself</span>
            <span className="text-[17px] leading-[1.45] text-muted">A personal brand, a founder, or a public name.</span>
            <span className="more">Start the personal test ›</span>
          </button>
          <button
            type="button"
            onClick={() => restart("business")}
            className="lift on-night flex min-h-[260px] flex-col gap-3 rounded-[28px] bg-black p-10 text-left text-[#f5f5f7]"
          >
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true">
              <rect x="3" y="7" width="18" height="14" rx="2" />
              <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M3 13h18" />
            </svg>
            <span className="mt-auto text-[32px] font-bold tracking-tight">For a business</span>
            <span className="text-[17px] leading-[1.45] text-[#a1a1a6]">A company, a practice, or a product with its own name.</span>
            <span className="more">Start the business test ›</span>
          </button>
        </div>
        <p className="mt-8 text-center text-[15px] text-muted">
          {total} questions · about 2 minutes · based on the twelve classic brand archetypes
        </p>
      </div>
    );
  }

  if (!question) return null;

  return (
    <div className="mx-auto mt-12 max-w-[760px]">
      <div className="flex justify-between text-sm font-medium text-muted">
        <span>{audience === "personal" ? "Personal brand" : "Business brand"}</span>
        <span>
          Question {step + 1} of {total}
        </span>
      </div>
      <div className="mt-3 h-1 overflow-hidden rounded-full bg-[#e8e8ed]">
        <div className="h-full rounded-full bg-accent transition-[width] duration-500" style={{ width: `${(step / total) * 100}%` }} />
      </div>
      <fieldset className="mt-14">
        <legend className="text-[clamp(30px,4.6vw,52px)] leading-[1.08] font-bold tracking-[-0.03em]">
          {audience === "personal" ? question.personal : question.business}
        </legend>
        <p className="mt-3 text-[17px] text-muted">Pick the closest one. There isn’t a right answer.</p>
        <div className="mt-8 grid gap-3">
          {question.choices.map((choice, index) => (
            <button
              key={choice.id}
              type="button"
              className="flex min-h-16 items-center gap-4 rounded-[20px] border border-line bg-white px-6 py-4 text-left text-[19px] transition hover:-translate-y-0.5 hover:border-accent"
              onClick={() => {
                setAnswers((current) => [...current, choice.id]);
                setStep((value) => value + 1);
              }}
            >
              <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-card text-sm font-semibold text-muted">{letters[index]}</span>
              <span className="leading-[1.35]">{audience === "personal" ? choice.personal : choice.business}</span>
            </button>
          ))}
        </div>
      </fieldset>
      <div className="mt-7 flex justify-between">
        <button
          type="button"
          className="more min-h-11"
          onClick={() => {
            if (step === 0) {
              setAudience("");
              return;
            }
            setAnswers((current) => current.slice(0, -1));
            setStep((value) => value - 1);
          }}
        >
          ‹ Back
        </button>
        <button type="button" className="min-h-11 text-[17px] text-muted" onClick={() => restart()}>
          Start over
        </button>
      </div>
    </div>
  );
}
