"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { money } from "@/lib/money";
import { inputClass } from "./ui";

export function CourseEnroll({
  slug,
  price,
  enrolled,
}: {
  slug: string;
  price: number;
  enrolled: boolean;
}) {
  const router = useRouter();
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  async function submit(formData: FormData) {
    setPending(true);
    setError("");
    const response = await fetch(`/api/learn/${slug}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: formData.get("name"), email: formData.get("email") }),
    });
    const data = await response.json();
    setPending(false);
    if (!response.ok) {
      setError(data.error || "Enrolment did not go through.");
      return;
    }
    router.push(`/learn/${slug}/classroom`);
  }

  if (enrolled) {
    return (
      <a href={`/learn/${slug}/classroom`} className="inline-flex rounded-full bg-accent px-5 py-2.5 text-sm text-white">
        Continue the course
      </a>
    );
  }

  return (
    <form action={submit} className="grid gap-3 border border-line/80 p-5">
      <p className="text-sm text-muted">{price > 0 ? `Enrol for ${money(price)}. The lessons open on this site.` : "Free to enrol. The lessons open on this site."}</p>
      <input required name="name" placeholder="Name" className={inputClass} autoComplete="name" />
      <input required type="email" name="email" placeholder="Email" className={inputClass} autoComplete="email" />
      {error ? <p className="text-sm text-gold">{error}</p> : null}
      <button disabled={pending} className="rounded-full bg-accent px-5 py-2.5 text-sm text-white disabled:opacity-60">
        {pending ? "Opening…" : "Enrol"}
      </button>
    </form>
  );
}
