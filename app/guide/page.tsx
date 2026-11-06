import type { Metadata } from "next";
import { GuideWizard } from "@/components/guide-wizard";
import { PageIntro } from "@/components/ui";

export const metadata: Metadata = {
  title: "Find your next step",
  description: "Three questions. A recommendation, a price where one exists, and what to prepare.",
};

export default function GuidePage() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-14">
      <PageIntro
        eyebrow="Guide"
        title="Tell the desk what is stuck."
        text="Three answers. You get the door that matches: a session, a fixed package, the shop, a print estimate, or something to read first."
      />
      <GuideWizard />
    </div>
  );
}
