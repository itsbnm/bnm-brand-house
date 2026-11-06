import type { Metadata } from "next";
import { ConsultBooker } from "@/components/consult-booker";
import { PageIntro } from "@/components/ui";

export const metadata: Metadata = {
  title: "Book a consultation",
  description: "A 75-minute brand strategy session for a personal brand or a business brand.",
};

export default function ConsultPage() {
  return (
    <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 lg:grid-cols-[0.8fr_1.2fr]">
      <div>
        <PageIntro
          eyebrow="Consultation"
          title="A working session, not a tour."
          text="For personal brands and business brands. You should leave knowing the position to test and whether a larger engagement is warranted."
        />
        <ul className="mt-8 grid gap-3 text-sm leading-6 text-muted">
          <li>75 minutes, weekdays, held in Africa/Lagos time.</li>
          <li>$250, charged on Paystack. Without the studio key, the time is held and collected against the reference.</li>
          <li>Bring the checklist if you can. Blank answers are allowed. Hidden ones are not useful.</li>
          <li>You receive the time, the reference, and what to send before the call.</li>
        </ul>
      </div>
      <ConsultBooker />
    </div>
  );
}
