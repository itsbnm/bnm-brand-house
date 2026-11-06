"use client";

import { useState } from "react";
import type { Product } from "@/lib/types";
import { useCart } from "./cart";
import { Field, inputClass } from "./ui";

export function ProductBuy({ product }: { product: Product }) {
  const cart = useCart();
  const [color, setColor] = useState(product.colors[0]);
  const [size, setSize] = useState(product.sizes[0]);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  return (
    <form
      className="grid gap-3"
      onSubmit={(event) => {
        event.preventDefault();
        cart.add({ id: product.slug, qty, options: `${color} · ${size}` });
        setAdded(true);
      }}
    >
      <Field label="Colour">
        <select className={inputClass} value={color} onChange={(event) => setColor(event.target.value)}>
          {product.colors.map((item) => (
            <option key={item}>{item}</option>
          ))}
        </select>
      </Field>
      <Field label="Size">
        <select className={inputClass} value={size} onChange={(event) => setSize(event.target.value)}>
          {product.sizes.map((item) => (
            <option key={item}>{item}</option>
          ))}
        </select>
      </Field>
      <Field label="Quantity">
        <input
          type="number"
          min={1}
          max={99}
          className={inputClass}
          value={qty}
          onChange={(event) => setQty(Number(event.target.value))}
        />
      </Field>
      <button className="rounded-full bg-accent px-5 py-2.5 text-sm text-white">Add to cart</button>
      {added ? <p className="text-sm text-muted">Added. The cart keeps it on this browser.</p> : null}
    </form>
  );
}
