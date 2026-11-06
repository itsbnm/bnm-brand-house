import type { Metadata } from "next";
import { approach, studio } from "@/lib/content";
import { PageIntro } from "@/components/ui";

export const metadata: Metadata = { title: "About" };

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-6xl px-5 py-14">
      <PageIntro
        eyebrow="About"
        title="Strategy sits inside the brand. It is not an extra."
        text="BNM Brand House builds brands that are remembered, respected, and positioned with intent. The mark is a B with a fragment of a chessboard in it: the decision, not the whole game."
      />
      <div className="mt-12 grid gap-10 lg:grid-cols-2">
        <div className="max-w-xl text-lg leading-8 text-muted">
          <p>
            The practice covers strategy, identity, public relations, outdoor advertising, websites, and social systems, plus the physical goods a brand eventually needs. Visual identity is priced as a system. Strategy, PR, outdoor, and bespoke partnerships are scoped, because the variables are the work.
          </p>
          <p className="mt-4">
            Engagements move in four steps. Discover the facts. Define the direction in writing. Design only what the team will use. Deliver files and a rule for what comes back.
          </p>
        </div>
        <ol className="grid gap-4">
          {approach.map((item) => (
            <li key={item.step} className="rounded-3xl border border-line bg-card p-5">
              <p className="text-xs text-gold">{item.step}</p>
              <h2 className="mt-1 text-2xl">{item.title}</h2>
              <p className="mt-2 text-sm leading-6 text-muted">{item.text}</p>
            </li>
          ))}
        </ol>
      </div>
      <section className="mt-14 max-w-3xl">
        <h2 className="text-3xl">What the studio will not pretend</h2>
        <ul className="mt-4 grid gap-3 text-muted">
          <li>A logo package does not include a full brand strategy unless the scope says so.</li>
          <li>A custom print run is not a cart item. It is estimated, then confirmed.</li>
          <li>Client quotes are published only after someone at the studio has read them.</li>
          <li>Leadership portraits are added when the studio publishes them. This page does not invent a team.</li>
        </ul>
        <p className="mt-6 text-sm">
          {studio.email} · {studio.phone} · {studio.hours}
        </p>
      </section>
    </div>
  );
}
