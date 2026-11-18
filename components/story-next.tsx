"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

/** The site reads as one story. Each main page ends by handing over to the next. */
const story: { href: string; title: string; line: string }[] = [
  { href: "/", title: "The house", line: "The belief, the method and the proof." },
  { href: "/guide", title: "Find your next step", line: "Three questions. The door that matches." },
  { href: "/archetype", title: "Know your brand’s character", line: "A short test, for you or your business." },
  { href: "/services", title: "Six ways into the house", line: "Strategy, identity, PR, outdoor, web and social." },
  { href: "/work", title: "Work you can hold", line: "The proof, project by project." },
  { href: "/consult", title: "A working session", line: "75 minutes. One decision." },
  { href: "/learn", title: "BNM Academy", line: "Learn the method at your own pace." },
  { href: "/resources", title: "Read first", line: "Checklists, workbooks and courses." },
  { href: "/shop", title: "The rest of the house", line: "Caps, cups, totes and gift sets." },
  { href: "/journal", title: "From the journal", line: "Notes on how brands are built." },
  { href: "/about", title: "About the studio", line: "Strategy sits inside the brand." },
];

export function StoryNext() {
  const pathname = usePathname() || "/";
  const index = story.findIndex((step) => step.href === pathname);
  if (index <= 0) return null;
  const prev = story[index - 1];
  const next = story[(index + 1) % story.length];

  return (
    <nav aria-label="Continue the story" className="bg-card px-5 py-20 sm:py-28">
      <p className="eyebrow text-center">
        Chapter {String(index + 1).padStart(2, "0")} of {story.length}
      </p>
      <div className="mx-auto mt-8 grid max-w-[1120px] gap-5 md:grid-cols-2">
        <Link href={prev.href} className="lift flex min-h-40 flex-col gap-2 rounded-3xl bg-white p-8 text-ink">
          <span className="text-[13px] font-semibold text-muted">‹ Previous</span>
          <span className="text-[28px] font-semibold tracking-tight">{prev.title}</span>
          <span className="text-muted">{prev.line}</span>
        </Link>
        <Link href={next.href} className="lift flex min-h-40 flex-col gap-2 rounded-3xl bg-[#1d1d1f] p-8 text-right text-[#f5f5f7]">
          <span className="text-[13px] font-semibold text-[#a1a1a6]">Next ›</span>
          <span className="text-[28px] font-semibold tracking-tight">{next.title}</span>
          <span className="text-[#a1a1a6]">{next.line}</span>
        </Link>
      </div>
    </nav>
  );
}
