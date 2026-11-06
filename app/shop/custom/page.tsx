import type { Metadata } from "next";
import { CustomForm } from "@/components/custom-form";
import { PageIntro } from "@/components/ui";

export const metadata: Metadata = { title: "Custom print" };

export default function CustomPage() {
  return (
    <div className="mx-auto max-w-6xl px-5 py-14">
      <PageIntro
        eyebrow="Custom and bulk"
        title="An estimate before a person confirms the job."
        text="Tell the desk the item, the quantity, and the deadline. The range updates as you choose. Production starts only after the studio accepts the quote."
      />
      <div className="mt-10">
        <CustomForm />
      </div>
    </div>
  );
}
