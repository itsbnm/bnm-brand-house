"use client";

import { useState } from "react";
import { products } from "@/lib/content";
import { money } from "@/lib/money";
import { useCart } from "./cart";

const tee = products.find((product) => product.slug === "heavyweight-tee");

const colours = [
  { name: "White", fill: "#f3f0e8", ink: "#141226" },
  { name: "Black", fill: "#141226", ink: "#f2f2f3" },
  { name: "Red", fill: "#d7263d", ink: "#f7f4ee" },
];

const suggestions = ["BNM", "THE HOUSE", "LAGOS"];
const maxLength = 16;

export function TeeStudio() {
  const cart = useCart();
  const [colour, setColour] = useState(colours[0]);
  const [line, setLine] = useState(suggestions[0]);
  const [size, setSize] = useState(tee?.sizes[2] ?? "L");
  const [added, setAdded] = useState(false);

  if (!tee) return null;

  const text = line.trim().slice(0, maxLength);

  return (
    <section className="mx-auto mt-24 max-w-6xl px-5">
      <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="flex items-center justify-center py-6">
          <Shirt fill={colour.fill} ink={colour.ink} text={text || "YOUR LINE"} />
        </div>
        <div>
          <p className="text-[11px] tracking-[0.28em] text-muted uppercase">Merch</p>
          <h2 className="mt-3 text-4xl">Set the shirt before you order it.</h2>
          <p className="mt-4 max-w-md text-sm leading-7 text-muted">
            Three cloth colours. One line, set by you. A single piece is {money(tee.price)}. Larger runs with your own artwork are quoted separately.
          </p>

          <fieldset className="mt-8">
            <legend className="text-[11px] tracking-[0.2em] text-muted uppercase">Colour</legend>
            <div className="mt-3 flex gap-3">
              {colours.map((item) => (
                <button
                  key={item.name}
                  type="button"
                  aria-pressed={item.name === colour.name}
                  onClick={() => {
                    setColour(item);
                    setAdded(false);
                  }}
                  className={`flex items-center gap-2 rounded-full border px-3 py-1.5 text-sm ${
                    item.name === colour.name ? "border-ink" : "border-line"
                  }`}
                >
                  <span className="h-3.5 w-3.5 rounded-full border border-white/30" style={{ background: item.fill }} />
                  {item.name}
                </button>
              ))}
            </div>
          </fieldset>

          <div className="mt-8">
            <label htmlFor="tee-line" className="text-[11px] tracking-[0.2em] text-muted uppercase">
              Line on the chest
            </label>
            <input
              id="tee-line"
              value={line}
              maxLength={maxLength}
              onChange={(event) => {
                setLine(event.target.value.toUpperCase());
                setAdded(false);
              }}
              className="mt-3 w-full border-b border-line bg-transparent py-2 text-2xl tracking-[0.12em] outline-none"
            />
            <div className="mt-3 flex flex-wrap gap-2">
              {suggestions.map((suggestion) => (
                <button
                  key={suggestion}
                  type="button"
                  className="rounded-full border border-line px-3 py-1 text-xs tracking-[0.14em]"
                  onClick={() => {
                    setLine(suggestion);
                    setAdded(false);
                  }}
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>

          <label className="mt-8 block text-[11px] tracking-[0.2em] text-muted uppercase" htmlFor="tee-size">
            Size
            <select
              id="tee-size"
              value={size}
              onChange={(event) => setSize(event.target.value)}
              className="mt-3 block w-full border-b border-line bg-transparent py-2 text-base tracking-normal text-ink outline-none"
            >
              {tee.sizes.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </label>

          <button
            type="button"
            className="mt-8 rounded-full bg-accent px-5 py-2.5 text-sm text-white disabled:opacity-40"
            disabled={text.length === 0}
            onClick={() => {
              cart.add({
                id: tee.slug,
                qty: 1,
                options: `${colour.name} · ${size} · “${text}”`,
              });
              setAdded(true);
            }}
          >
            Add this shirt · {money(tee.price)}
          </button>
          {added ? <p className="mt-3 text-sm text-muted">In the cart, with this colour and this line.</p> : null}
        </div>
      </div>
    </section>
  );
}

function Shirt({ fill, ink, text }: { fill: string; ink: string; text: string }) {
  const size = text.length > 12 ? 11 : text.length > 8 ? 14 : 18;
  return (
    <svg viewBox="0 0 280 300" className="h-80 w-auto max-w-full" role="img" aria-label={`${text} on a shirt`}>
      <ellipse cx="140" cy="286" rx="62" ry="7" fill="#000" opacity="0.28" />
      <path
        fill={fill}
        fillRule="evenodd"
        d="M92 46c10 16 86 16 96 0l28 12 22 36-22 10-12-22v150H76V82L64 104 42 94l22-36z M112 50c8 14 48 14 56 0 6 12-62 12-56 0z"
      />
      <text
        x="140"
        y="156"
        textAnchor="middle"
        fill={ink}
        fontSize={size}
        letterSpacing="2.4"
        fontFamily="var(--font-sofia), ui-sans-serif, sans-serif"
      >
        {text}
      </text>
    </svg>
  );
}
