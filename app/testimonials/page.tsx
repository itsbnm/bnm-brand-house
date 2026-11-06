import type { Metadata } from "next";
import { FeedbackWall } from "@/components/feedback";
import { PageIntro } from "@/components/ui";

export const metadata: Metadata = { title: "Client feedback" };

export default function TestimonialsPage() {
  return (
    <div className="mx-auto max-w-6xl px-5 py-14">
      <PageIntro
        eyebrow="Feedback"
        title="Published only after a person has read it."
        text="Leave a note if you have worked with the studio. It does not appear on the site until it is approved."
      />
      <FeedbackWall />
    </div>
  );
}
