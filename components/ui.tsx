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
      <span className="font-semibold text-[#424245]">{label}</span>
      {children}
    </label>
  );
}

export const inputClass =
  "mt-2 w-full rounded-xl border border-line bg-white px-4 py-3 text-[17px] text-ink outline-none transition";

export function PrimaryLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link href={href} className="btn">
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
    <Link href={href} className="btn-ghost">
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
    <header className="reveal mx-auto max-w-3xl">
      <p className="eyebrow">{eyebrow}</p>
      <h1 className="mt-4 text-[clamp(40px,6vw,72px)] leading-[1.04]">{title}</h1>
      <p className="mt-5 text-[clamp(19px,2vw,22px)] leading-[1.45] text-muted">{text}</p>
    </header>
  );
}

export function Chapter({
  number,
  label,
  title,
  muted,
  text,
  center = true,
}: {
  number: string;
  label: string;
  title: string;
  muted?: string;
  text?: string;
  center?: boolean;
}) {
  return (
    <header className={center ? "mx-auto max-w-[900px] text-center" : "max-w-[900px]"}>
      <p className="eyebrow">
        Chapter {number} · {label}
      </p>
      <h2 className="mt-4 text-[clamp(36px,5.6vw,64px)] leading-[1.06]">
        {title} {muted ? <span className="text-[#86868b]">{muted}</span> : null}
      </h2>
      {text ? (
        <p className={`mt-5 text-[21px] leading-[1.45] text-muted ${center ? "mx-auto max-w-[620px]" : "max-w-[620px]"}`}>{text}</p>
      ) : null}
    </header>
  );
}
