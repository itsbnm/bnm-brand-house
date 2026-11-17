"use client";

import Link from "next/link";
import { useState } from "react";
import {
  archetypeQuestions,
  readArchetypes,
  type ArchetypeId,
  type Audience,
} from "@/lib/archetypes";

export function ArchetypeTest() {
  const [audience, setAudience] = useState<Audience | "">("");
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<ArchetypeId[]>([]);

  const finished = audience !== "" && answers.length === archetypeQuestions.length;
  const result = finished ? readArchetypes(answers) : null;
  const question = audience && !finished ? archetypeQuestions[step] : null;

  function restart() {
    setAudience("");
    setStep(0);
    setAnswers([]);
  }

  return (
    <div className="mt-10 border border-line/80 p-6 sm:p-8">
      {result && audience ? (
        <div>
          <p className="text-[11px] tracking-[0.28em] text-muted uppercase">
            {audience === "personal" ? "For you" : "For the business"}
          </p>
          <h2 className="mt-3 text-4xl">{result.primary.name}</h2>
          <p className="mt-3 max-w-xl text-lg leading-8">{result.primary.line}</p>
          <p className="mt-4 max-w-2xl leading-7 text-muted">{result.primary.reading}</p>
          {result.close ? (
            <p className="mt-4 max-w-2xl text-sm leading-6 text-muted">
              These two finished level. The main reading is the one your later answers kept returning to.
            </p>
          ) : null}
          <div className="mt-8 border-t border-line/80 pt-6">
            <p className="text-[11px] tracking-[0.28em] text-muted uppercase">Secondary</p>
            <h3 className="mt-2 text-2xl">{result.secondary.name}</h3>
            <p className="mt-2 max-w-2xl leading-7 text-muted">{result.secondary.reading}</p>
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/consult" className="rounded-full bg-accent px-5 py-2.5 text-sm text-white">
              Talk it through · $250
            </Link>
            <button type="button" className="rounded-full border border-line px-5 py-2.5 text-sm" onClick={restart}>
              Take it again
            </button>
          </div>
        </div>
      ) : !audience ? (
        <fieldset>
          <legend className="text-2xl">Who is this for?</legend>
          <div className="mt-4 grid gap-3">
            <Choice
              label="For myself"
              detail="A personal brand, a founder, or a public name."
              onClick={() => setAudience("personal")}
            />
            <Choice
              label="For a business"
              detail="A company, a practice, or a product with its own name."
              onClick={() => setAudience("business")}
            />
          </div>
        </fieldset>
      ) : question ? (
        <fieldset>
          <p className="text-[11px] tracking-[0.22em] text-muted uppercase">
            Question {step + 1} of {archetypeQuestions.length}
          </p>
          <legend className="mt-3 text-2xl">{audience === "personal" ? question.personal : question.business}</legend>
          <div className="mt-4 grid gap-3">
            {question.choices.map((choice) => (
              <Choice
                key={choice.id}
                label={audience === "personal" ? choice.personal : choice.business}
                onClick={() => {
                  setAnswers((current) => [...current, choice.id]);
                  setStep((value) => value + 1);
                }}
              />
            ))}
          </div>
          <button
            type="button"
            className="mt-4 text-sm text-muted"
            onClick={() => {
              if (step === 0) {
                setAudience("");
                return;
              }
              setAnswers((current) => current.slice(0, -1));
              setStep((value) => value - 1);
            }}
          >
            Back
          </button>
        </fieldset>
      ) : null}
    </div>
  );
}

function Choice({ label, detail, onClick }: { label: string; detail?: string; onClick: () => void }) {
  return (
    <button type="button" className="border border-line px-4 py-3 text-left hover:border-ink" onClick={onClick}>
      <span className="block">{label}</span>
      {detail ? <span className="mt-1 block text-sm text-muted">{detail}</span> : null}
    </button>
  );
}
