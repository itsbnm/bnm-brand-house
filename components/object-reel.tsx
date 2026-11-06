"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const slides = [
  {
    href: "/work/harbor-and-hearth",
    kind: "Mug",
    title: "Harbor & Hearth",
    line: "A matte cup. The name sits once, low, and nowhere else.",
    object: "mug" as const,
  },
  {
    href: "/work/atelier-sola",
    kind: "Cap",
    title: "Atelier",
    line: "An unstructured cap with a woven mark and an empty brim.",
    object: "cap" as const,
  },
  {
    href: "/work/fieldnote-foundation",
    kind: "Signage",
    title: "Fieldnote",
    line: "Letters with depth, set for a wall rather than a feed.",
    object: "sign" as const,
  },
  {
    href: "/work/northline-advisory",
    kind: "Signage",
    title: "Northline",
    line: "A second face of the same system: quieter, still dimensional.",
    object: "sign-2" as const,
  },
];

export function ObjectReel() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || paused) return;
    const id = window.setInterval(() => {
      setIndex((current) => (current + 1) % slides.length);
    }, 5200);
    return () => window.clearInterval(id);
  }, [paused]);

  function step(direction: -1 | 1) {
    setIndex((current) => (current + direction + slides.length) % slides.length);
  }

  return (
    <section
      className="mx-auto mt-6 max-w-6xl px-5"
      aria-roledescription="carousel"
      aria-label="Selected objects"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div className="flex items-end justify-between gap-6">
        <div>
          <p className="text-[11px] tracking-[0.28em] text-muted uppercase">Selected objects</p>
          <h2 className="mt-3 text-3xl sm:text-4xl">Work you can hold.</h2>
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            className="h-10 w-10 rounded-full border border-line text-sm"
            aria-label="Previous object"
            onClick={() => step(-1)}
          >
            ←
          </button>
          <button
            type="button"
            className="h-10 w-10 rounded-full border border-line text-sm"
            aria-label="Next object"
            onClick={() => step(1)}
          >
            →
          </button>
        </div>
      </div>

      <div className="mt-8 w-full overflow-hidden">
        <div
          className="flex w-full transition-transform duration-700 ease-out motion-reduce:transition-none"
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {slides.map((slide) => (
            <article key={slide.title} className="grid w-full shrink-0 gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center" aria-hidden={slide !== slides[index]}>
              <div className="flex min-h-[22rem] items-center justify-center rounded-2xl border border-line/70 bg-[#0c0a16]">
                <ObjectArt kind={slide.object} />
              </div>
              <div className="lg:pl-6">
                <p className="text-[11px] tracking-[0.24em] text-muted uppercase">{slide.kind}</p>
                <h3 className="mt-3 text-4xl">{slide.title}</h3>
                <p className="mt-4 max-w-sm text-base leading-7 text-muted">{slide.line}</p>
                <Link href={slide.href} className="mt-8 inline-flex text-sm tracking-wide text-gold-2">
                  View the project
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>

      <div className="mt-6 flex gap-2" role="tablist" aria-label="Objects">
        {slides.map((slide, slideIndex) => (
          <button
            key={slide.title}
            type="button"
            role="tab"
            aria-selected={slideIndex === index}
            aria-label={slide.title}
            className={`h-1.5 rounded-full transition-all ${slideIndex === index ? "w-8 bg-ink" : "w-4 bg-line"}`}
            onClick={() => setIndex(slideIndex)}
          />
        ))}
      </div>
    </section>
  );
}

function ObjectArt({ kind }: { kind: (typeof slides)[number]["object"] }) {
  if (kind === "mug") return <Mug />;
  if (kind === "cap") return <Cap />;
  if (kind === "sign") return <Sign word="FIELD" />;
  return <Sign word="NORTH" />;
}

function Mug() {
  return (
    <svg viewBox="0 0 420 320" className="h-64 w-auto" role="img" aria-label="Matte mug mockup">
      <ellipse cx="190" cy="268" rx="92" ry="12" fill="#000" opacity="0.35" />
      <path d="M250 108c28 6 46 28 46 56s-18 50-46 56" fill="none" stroke="#d9d4c8" strokeWidth="18" strokeLinecap="round" />
      <path d="M108 78h164v132c0 36-36 62-82 62s-82-26-82-62z" fill="#e6e1d6" />
      <ellipse cx="190" cy="78" rx="82" ry="18" fill="#f4f0e8" />
      <ellipse cx="190" cy="80" rx="58" ry="11" fill="#b7b1a6" />
      <text x="190" y="176" textAnchor="middle" fill="#3a342c" fontSize="15" letterSpacing="4">
        HARBOR
      </text>
    </svg>
  );
}

function Cap() {
  return (
    <svg viewBox="0 0 420 300" className="h-56 w-auto" role="img" aria-label="Face cap mockup">
      <ellipse cx="210" cy="214" rx="150" ry="22" fill="#07060d" />
      <path d="M78 196c18 16 86 28 150 16 28-6 70-8 112-22-18 28-70 46-132 46S96 230 78 196z" fill="#1c1a28" />
      <path d="M96 188c8-78 220-78 228 0-70-18-158-18-228 0z" fill="#12101a" />
      <path d="M168 92c14-16 70-16 84 0" fill="none" stroke="#f2f2f3" strokeOpacity="0.35" strokeWidth="1.5" />
      <circle cx="210" cy="78" r="5" fill="#f2f2f3" />
      <text x="210" y="168" textAnchor="middle" fill="#f2f2f3" fontSize="13" letterSpacing="6">
        ATELIER
      </text>
    </svg>
  );
}

function Sign({ word }: { word: string }) {
  return (
    <svg viewBox="0 0 480 300" className="h-56 w-auto" role="img" aria-label="Three-dimensional signage mockup">
      <rect x="36" y="48" width="408" height="204" fill="#080712" />
      <text x="58" y="178" fill="#16343a" fontSize="78" fontWeight="600" letterSpacing="-2">
        {word}
      </text>
      <text x="48" y="168" fill="#f2f2f3" fontSize="78" fontWeight="600" letterSpacing="-2">
        {word}
      </text>
      <text x="50" y="214" fill="#82d1fe" fontSize="13" letterSpacing="6">
        LAGOS
      </text>
    </svg>
  );
}
