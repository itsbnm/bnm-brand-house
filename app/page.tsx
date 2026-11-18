import Link from "next/link";
import { Mark } from "@/components/header";
import { ObjectReel } from "@/components/object-reel";
import { TeeStudio } from "@/components/tee-studio";
import { Chapter } from "@/components/ui";
import { approach, articles, resources, services, studio } from "@/lib/content";
import { money } from "@/lib/money";

const chapters = [
  ["01", "The belief", "#belief"],
  ["02", "The method", "#method"],
  ["03", "The proof", "#work"],
  ["04", "The offer", "#services"],
  ["05", "Your next step", "#next"],
];

const serviceTags: Record<string, string> = {
  "brand-strategy": "Begins here",
  "brand-identity": "Priced as a system",
  "public-relations": "Scoped",
  outdoor: "Scoped",
  websites: "Build",
  "social-media": "System",
};

export default function HomePage() {
  return (
    <div>
      {/* HERO */}
      <section className="px-5 pt-[clamp(88px,12vw,160px)] pb-[clamp(64px,8vw,104px)] text-center">
        <div className="reveal">
          <p className="text-[19px] font-semibold text-muted">{studio.line}</p>
          <h1 className="mx-auto mt-5 max-w-[980px] text-[clamp(48px,8vw,96px)] leading-[1.02]">{studio.promise}</h1>
          <p className="mx-auto mt-7 max-w-[620px] text-[clamp(19px,2vw,24px)] leading-[1.4] text-muted">
            A branding and communications studio in Lagos. Identity, campaigns, and the objects a brand is held in.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link href="/guide" className="btn">
              Find your next step
            </Link>
            <Link href="#work" className="btn-ghost">
              View the work
            </Link>
          </div>
        </div>
        <ol aria-label="Chapters" className="mx-auto mt-[clamp(72px,9vw,112px)] grid max-w-[880px] grid-cols-[repeat(auto-fit,minmax(150px,1fr))] border-t border-line">
          {chapters.map(([number, label, href]) => (
            <li key={number}>
              <a href={href} className="block px-2 py-5 text-left hover:opacity-70">
                <span className="block text-xs font-medium text-muted">Chapter {number}</span>
                <span className="text-[15px] font-semibold">{label}</span>
              </a>
            </li>
          ))}
        </ol>
      </section>

      {/* 01 BELIEF */}
      <section id="belief" className="scroll-mt-14 bg-card px-5 py-[clamp(96px,12vw,160px)] text-center">
        <Chapter number="01" label="The belief" title="Strategy sits inside the brand." muted="It is not an extra." />
        <div className="mx-auto mt-[clamp(56px,7vw,88px)] grid h-[clamp(160px,22vw,240px)] w-[clamp(160px,22vw,240px)] place-items-center rounded-[28%] bg-[#1d1d1f]">
          <Mark size={120} invert />
        </div>
        <p className="mx-auto mt-10 max-w-[600px] text-[clamp(19px,2vw,22px)] leading-[1.5]">
          The mark is a B with a fragment of a chessboard in it. <strong className="font-semibold">The decision, not the whole game.</strong> Every engagement here begins with that decision, before a single design file opens.
        </p>
        <p className="mt-12">
          <a href="#method" className="more">
            So how does the work move? ↓
          </a>
        </p>
      </section>

      {/* 02 METHOD */}
      <section id="method" className="scroll-mt-14 px-5 py-[clamp(96px,12vw,160px)]">
        <div className="mx-auto max-w-[1120px]">
          <Chapter number="02" label="The method" title="Four steps. In this order. Every time." />
          <ol className="mt-[clamp(56px,7vw,88px)] grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {approach.map((item, index) => {
              const last = index === approach.length - 1;
              return (
                <li
                  key={item.step}
                  className={`flex min-h-[260px] flex-col gap-3 rounded-3xl p-8 ${last ? "bg-[#1d1d1f] text-[#f5f5f7]" : "bg-card"}`}
                >
                  <span className={`text-[56px] leading-none font-light tracking-tight ${last ? "text-[#a1a1a6]" : "text-[#86868b]"}`}>{item.step}</span>
                  <h3 className="mt-auto text-[28px]">{item.title}</h3>
                  <p className={`text-[17px] leading-[1.47] ${last ? "text-[#a1a1a6]" : "text-muted"}`}>{item.text}</p>
                </li>
              );
            })}
          </ol>
          <p className="mt-12 text-center">
            <a href="#work" className="more">
              See what it produces ↓
            </a>
          </p>
        </div>
      </section>

      {/* 03 PROOF */}
      <section id="work" className="scroll-mt-14 bg-card px-5 py-[clamp(96px,12vw,160px)]">
        <div className="mx-auto max-w-[1120px]">
          <Chapter
            number="03"
            label="The proof"
            title="Work you can hold."
            text="Identity doesn’t live in a PDF. It lives on a cup, a cap, a wall."
          />
        </div>
        <ObjectReel />
        <p className="mt-12 text-center">
          <Link href="/work" className="more">
            See all the work ›
          </Link>
        </p>
      </section>

      <TeeStudio />

      {/* 04 OFFER */}
      <section id="services" className="scroll-mt-14 bg-card px-5 py-[clamp(96px,12vw,160px)]">
        <div className="mx-auto max-w-[1120px]">
          <Chapter number="04" label="The offer" title="Six ways into the house." />
          <div className="mt-[clamp(56px,7vw,80px)] grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <Link
                key={service.slug}
                href={`/services/${service.slug}`}
                className="lift flex min-h-[220px] flex-col gap-3 rounded-3xl bg-white p-8 text-ink"
              >
                <span className="text-[13px] font-semibold text-muted">{serviceTags[service.slug] ?? "Service"}</span>
                <span className="text-[26px] font-semibold tracking-tight">{service.name}</span>
                <span className="leading-[1.47] text-muted">{service.summary}</span>
                <span className="mt-auto font-medium text-accent">Learn more ›</span>
              </Link>
            ))}
          </div>
          <div className="mt-5 flex flex-wrap items-center justify-between gap-6 rounded-3xl bg-white p-9">
            <div className="max-w-xl">
              <h3 className="text-[28px]">The rest of the house.</h3>
              <p className="mt-2 text-[17px] leading-[1.47] text-muted">
                Caps, cups, totes, and gift sets are ready to order. A run with your own artwork is priced on the print desk.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link href="/shop" className="btn">
                Shop
              </Link>
              <Link href="/shop/custom" className="btn-ghost">
                Print estimate
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CONSULTATION */}
      <section className="on-night bg-black px-5 py-[clamp(110px,14vw,180px)] text-center text-[#f5f5f7]">
        <p className="eyebrow !text-[#a1a1a6]">Consultation</p>
        <h2 className="mx-auto mt-4 max-w-[860px] text-[clamp(38px,6vw,72px)] leading-[1.04] font-bold tracking-[-0.035em]">
          One-to-one, for a personal brand or a business.
        </h2>
        <div className="mx-auto mt-14 grid max-w-[760px] gap-8 sm:grid-cols-3">
          <div>
            <div className="text-5xl font-semibold tracking-tight">
              75<span className="text-[22px] text-[#a1a1a6]"> min</span>
            </div>
            <div className="mt-1 text-[15px] text-[#a1a1a6]">One focused working session</div>
          </div>
          <div>
            <div className="text-5xl font-semibold tracking-tight">1</div>
            <div className="mt-1 text-[15px] text-[#a1a1a6]">Position to test when you leave</div>
          </div>
          <div>
            <div className="text-5xl font-semibold tracking-tight">{money(250)}</div>
            <div className="mt-1 text-[15px] text-[#a1a1a6]">Held when you confirm</div>
          </div>
        </div>
        <p className="mx-auto mt-12 max-w-[540px] text-[19px] leading-[1.47] text-[#a1a1a6]">
          You leave with a position to test and the next engagement, if one is warranted. Weekday times are held when you confirm.
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-6">
          <Link href="/consult" className="btn !bg-[#0071e3]">
            See open times
          </Link>
          <Link href="/journal/what-a-consultation-covers" className="more">
            What a session covers ›
          </Link>
        </div>
      </section>

      {/* KNOW YOURSELF / LEARN */}
      <section className="px-5 py-[clamp(96px,12vw,160px)]">
        <div className="mx-auto grid max-w-[1120px] gap-5 md:grid-cols-2">
          <Link href="/archetype" className="lift on-night flex min-h-[360px] flex-col gap-4 rounded-[28px] bg-black p-[clamp(36px,5vw,56px)] text-[#f5f5f7]">
            <span className="eyebrow !text-[#a1a1a6]">Free · 2 minutes</span>
            <span className="text-[clamp(32px,4vw,48px)] leading-[1.06] font-bold tracking-tight">Who is your brand, really?</span>
            <span className="text-[18px] leading-[1.47] text-[#a1a1a6]">
              A few relatable questions reveal your brand archetype, for you as a person or for your business.
            </span>
            <span className="more mt-auto">Take the archetype test ›</span>
          </Link>
          <Link href="/learn" className="lift flex min-h-[360px] flex-col gap-4 rounded-[28px] bg-card p-[clamp(36px,5vw,56px)] text-ink">
            <span className="eyebrow">BNM Academy</span>
            <span className="text-[clamp(32px,4vw,48px)] leading-[1.06] font-bold tracking-tight">Learn it the way the studio practises it.</span>
            <span className="text-[18px] leading-[1.47] text-muted">
              Video lessons, readings, and books you read page by page, right here.
            </span>
            <span className="more mt-auto">Explore courses ›</span>
          </Link>
        </div>
      </section>

      {/* READ FIRST */}
      <section className="px-5 pb-[clamp(96px,12vw,160px)]">
        <div className="mx-auto max-w-[1120px]">
          <h2 className="mb-[clamp(48px,6vw,72px)] text-center text-[clamp(36px,5.6vw,64px)] leading-[1.06]">
            Not ready to talk? <span className="text-[#86868b]">Read first.</span>
          </h2>
          <div className="grid gap-5 lg:grid-cols-2">
            <div className="rounded-3xl bg-card p-8">
              <h3 className="eyebrow">Resources</h3>
              <ul className="mt-2">
                {resources.map((resource, index) => (
                  <li key={resource.slug} className={index < resources.length - 1 ? "border-b border-line" : ""}>
                    <Link href={`/resources/${resource.slug}`} className="flex justify-between gap-4 py-5 text-ink">
                      <span className="text-[19px] font-medium">{resource.title}</span>
                      <span className="text-[15px] whitespace-nowrap text-muted">
                        {resource.price === 0 ? "Free" : money(resource.price)} · {resource.kind}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-3xl bg-card p-8">
              <h3 className="eyebrow">From the journal</h3>
              <ul className="mt-2">
                {articles.slice(0, 3).map((article, index) => (
                  <li key={article.slug} className={index < 2 ? "border-b border-line" : ""}>
                    <Link href={`/journal/${article.slug}`} className="block py-5 text-ink">
                      <span className="block text-[19px] font-medium">{article.title}</span>
                      <span className="mt-1 block text-[15px] leading-[1.45] text-muted">{article.excerpt}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="mt-5 flex flex-wrap items-center justify-between gap-4 rounded-3xl border border-line p-8">
            <div className="max-w-xl">
              <h3 className="text-[21px]">Client words, after review.</h3>
              <p className="mt-1.5 text-muted">Feedback can be left on the site. It is published only after the studio approves it.</p>
            </div>
            <Link href="/testimonials" className="more">
              Read or leave feedback ›
            </Link>
          </div>
        </div>
      </section>

      {/* 05 NEXT */}
      <section id="next" className="scroll-mt-14 bg-card px-5 py-[clamp(110px,14vw,180px)] text-center">
        <Chapter
          number="05"
          label="Your next step"
          title="Tell the desk what is stuck."
          text="Three answers. We’ll show you the door that matches: a session, a package, the shop, or something to read first."
        />
        <div className="mt-10">
          <Link href="/guide" className="btn !min-h-[52px] !px-8 !text-[19px]">
            Start the guide
          </Link>
        </div>
      </section>
    </div>
  );
}
