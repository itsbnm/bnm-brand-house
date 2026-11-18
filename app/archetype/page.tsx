import type { Metadata } from "next";
import { ArchetypeTest } from "@/components/archetype-test";

export const metadata: Metadata = {
  title: "Brand archetype test",
  description: "A few relatable questions for a person or a business. A main brand archetype and a secondary one.",
};

export default function ArchetypePage() {
  return (
    <div className="mx-auto max-w-[1072px] px-5 pt-[clamp(72px,10vw,128px)] pb-10">
      <header className="reveal text-center">
        <p className="eyebrow">Brand archetype test</p>
        <h1 className="mx-auto mt-4 max-w-[860px] text-[clamp(44px,7vw,84px)] leading-[1.02]">
          Every brand has a character. <span className="text-[#86868b]">Find yours.</span>
        </h1>
        <p className="mx-auto mt-6 max-w-[600px] text-[21px] leading-[1.45] text-muted">
          Relatable questions, no right answers. You’ll get the archetype your brand leads with, and the one it leans on.
        </p>
      </header>
      <ArchetypeTest />
    </div>
  );
}
