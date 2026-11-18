import type { Metadata } from "next";
import { GuideWizard } from "@/components/guide-wizard";

export const metadata: Metadata = {
  title: "Find your next step",
  description: "Three questions. A recommendation, a price where one exists, and what to prepare.",
};

export default function GuidePage() {
  return (
    <div className="mx-auto max-w-[760px] px-5 pt-[clamp(72px,10vw,128px)] pb-10">
      <header className="reveal text-center">
        <p className="eyebrow">The guide</p>
        <h1 className="mt-4 text-[clamp(42px,6.4vw,72px)] leading-[1.04]">Tell the desk what is stuck.</h1>
        <p className="mx-auto mt-5 max-w-[540px] text-[21px] leading-[1.45] text-muted">
          Three answers. You get the door that matches: a session, a fixed package, the shop, a print estimate, or something to read first.
        </p>
      </header>
      <GuideWizard />
    </div>
  );
}
