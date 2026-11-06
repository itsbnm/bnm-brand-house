export const printProducts = [
  { id: "tee", label: "T-shirts and apparel", unit: 12, minimum: 12 },
  { id: "cup", label: "Cups and drinkware", unit: 8, minimum: 24 },
  { id: "box", label: "Packaging boxes", unit: 6, minimum: 50 },
  { id: "bag", label: "Bags and totes", unit: 10, minimum: 25 },
  { id: "cap", label: "Caps", unit: 9, minimum: 24 },
  { id: "gift", label: "Executive gift sets", unit: 28, minimum: 10 },
  { id: "other", label: "Other print or branding", unit: 14, minimum: 20 },
] as const;

export type PrintProductId = (typeof printProducts)[number]["id"];

export function estimatePrint(input: {
  product: string;
  quantity: number;
  sides: 1 | 2;
  rush: boolean;
}) {
  const item = printProducts.find((entry) => entry.id === input.product) ?? printProducts[6];
  const quantity = Math.max(1, Math.floor(input.quantity));
  let unit = item.unit;
  if (quantity >= 50) unit *= 0.86;
  if (quantity >= 200) unit *= 0.78;
  if (quantity >= 500) unit *= 0.7;
  if (input.sides === 2) unit *= 1.4;
  if (input.rush) unit *= 1.25;
  const low = Math.max(item.minimum * item.unit * 0.7, Math.round(unit * quantity));
  const high = Math.round(low * 1.16);
  const assumptions = [
    `${item.label}, ${quantity} units`,
    input.sides === 2 ? "Print on two sides" : "Print on one side",
    input.rush ? "Rush production" : "Standard production window",
    quantity < item.minimum
      ? `Typical minimum for this item is ${item.minimum}. Smaller runs cost more per unit.`
      : "Quantity is within a standard production run.",
    "Artwork should be vector (AI, EPS, SVG, or PDF) with outlined type.",
    "This is an automated studio estimate. A producer confirms the final quote before anything is made.",
  ];
  return { low: Math.round(low), high, assumptions, minimum: item.minimum };
}
