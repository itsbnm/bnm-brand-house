import type { Metadata } from "next";
import { ArchetypeTest } from "@/components/archetype-test";
import { PageIntro } from "@/components/ui";

export const metadata: Metadata = {
  title: "Brand archetype",
  description: "Six questions for a person or a business. A main brand archetype and a secondary one.",
};

export default function ArchetypePage() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-14">
      <PageIntro
        eyebrow="Archetype"
        title="The character the brand already leans toward."
        text="Six easy questions, for yourself or for a business. Pick the answer that feels closest. You leave with a main archetype and the one beside it."
      />
      <ArchetypeTest />
    </div>
  );
}
