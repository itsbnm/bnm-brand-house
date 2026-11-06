import type { Metadata } from "next";
import { Suspense } from "react";
import { ContactTopic } from "@/components/contact-topic";
import { studio } from "@/lib/content";
import { PageIntro } from "@/components/ui";

export const metadata: Metadata = { title: "Contact" };

export default function ContactPage() {
  return (
    <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 lg:grid-cols-[0.8fr_1.2fr]">
      <div>
        <PageIntro
          eyebrow="Contact"
          title="A person reads what the desk cannot price."
          text="General questions, scoped services, and anything with a deadline land here. Fixed packages and consultations do not need this form."
        />
        <div className="mt-8 text-sm leading-7">
          <a className="block" href={`mailto:${studio.email}`}>
            {studio.email}
          </a>
          <a className="block" href={studio.phoneHref}>
            {studio.phone}
          </a>
          <p>{studio.hours}</p>
          <p>Lagos</p>
        </div>
      </div>
      <Suspense fallback={<p className="text-muted">Opening the form…</p>}>
        <ContactTopic />
      </Suspense>
    </div>
  );
}
