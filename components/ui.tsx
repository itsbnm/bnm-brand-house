import Link from "next/link";

export function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block text-sm">
      <span className="text-muted">{label}</span>
      {children}
    </label>
  );
}

export const inputClass =
  "mt-1 w-full rounded-md border border-line bg-card px-3 py-2.5 text-ink outline-none";

export function PrimaryLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="inline-flex items-center justify-center rounded-full bg-accent px-5 py-2.5 text-sm text-white hover:bg-[#db4f28]"
    >
      {children}
    </Link>
  );
}

export function GhostLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="inline-flex items-center justify-center rounded-full border border-line px-5 py-2.5 text-sm hover:border-ink"
    >
      {children}
    </Link>
  );
}

export function PageIntro({
  eyebrow,
  title,
  text,
}: {
  eyebrow: string;
  title: string;
  text: string;
}) {
  return (
    <header className="mx-auto max-w-3xl">
      <p className="text-xs tracking-[0.22em] text-gold uppercase">{eyebrow}</p>
      <h1 className="mt-3 text-4xl leading-tight sm:text-5xl">{title}</h1>
      <p className="mt-4 text-lg leading-8 text-muted">{text}</p>
    </header>
  );
}
