import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-xl px-5 py-24">
      <p className="text-xs tracking-[0.18em] text-gold uppercase">Missing</p>
      <h1 className="mt-3 text-5xl">That page is not on the site.</h1>
      <Link href="/guide" className="mt-6 inline-block text-gold">
        Find your next step
      </Link>
    </div>
  );
}
