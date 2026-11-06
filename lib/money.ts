export function money(amount: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function reference(prefix: string) {
  const chunk = Math.random().toString(36).slice(2, 6).toUpperCase();
  const time = Date.now().toString(36).slice(-4).toUpperCase();
  return `${prefix}-${time}${chunk}`;
}
