"use client";

import { createContext, useContext, useMemo, useSyncExternalStore } from "react";

export type CartLine = {
  id: string;
  qty: number;
  options: string;
};

type CartContextValue = {
  lines: CartLine[];
  count: number;
  add: (line: CartLine) => void;
  update: (index: number, qty: number) => void;
  clear: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);
const storageKey = "bnm-cart";
const changeEvent = "bnm-cart-change";

const emptyCart: CartLine[] = [];
let cachedRaw = "";
let cachedLines: CartLine[] = emptyCart;

function readCart(): CartLine[] {
  const raw = localStorage.getItem(storageKey) || "[]";
  if (raw === cachedRaw) return cachedLines;
  cachedRaw = raw;
  try {
    const saved = JSON.parse(raw) as CartLine[];
    cachedLines = Array.isArray(saved) ? saved : emptyCart;
  } catch {
    cachedLines = emptyCart;
  }
  return cachedLines;
}

function writeCart(lines: CartLine[]) {
  localStorage.setItem(storageKey, JSON.stringify(lines));
  window.dispatchEvent(new Event(changeEvent));
}

function subscribe(onStoreChange: () => void) {
  window.addEventListener(changeEvent, onStoreChange);
  window.addEventListener("storage", onStoreChange);
  return () => {
    window.removeEventListener(changeEvent, onStoreChange);
    window.removeEventListener("storage", onStoreChange);
  };
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const lines = useSyncExternalStore(subscribe, readCart, () => emptyCart);
  const value = useMemo<CartContextValue>(
    () => ({
      lines,
      count: lines.reduce((sum, line) => sum + line.qty, 0),
      add: (line) => {
        const current = readCart();
        const index = current.findIndex((item) => item.id === line.id && item.options === line.options);
        const next =
          index === -1
            ? [...current, line]
            : current.map((item, itemIndex) =>
                itemIndex === index ? { ...item, qty: Math.min(99, item.qty + line.qty) } : item,
              );
        writeCart(next);
      },
      update: (index, qty) => {
        const next = readCart().flatMap((item, itemIndex) => {
          if (itemIndex !== index) return [item];
          if (qty <= 0) return [];
          return [{ ...item, qty }];
        });
        writeCart(next);
      },
      clear: () => writeCart([]),
    }),
    [lines],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const value = useContext(CartContext);
  if (!value) throw new Error("Cart is unavailable");
  return value;
}
