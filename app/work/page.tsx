import type { Metadata } from "next";
import { WorkFilter } from "@/components/filters";
import { PageIntro } from "@/components/ui";

export const metadata: Metadata = { title: "Work" };

export default function WorkPage() {
  return (
    <div className="mx-auto max-w-6xl px-5 py-14">
      <PageIntro
        eyebrow="Work"
        title="Selected engagements, told as decisions."
        text="These are representative studio engagements, grouped by the service they belong to. Filter to the kind of problem you have."
      />
      <div className="mt-10">
        <WorkFilter />
      </div>
    </div>
  );
}
