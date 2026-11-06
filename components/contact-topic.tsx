"use client";

import { useSearchParams } from "next/navigation";
import { EnquiryForm } from "./enquiry-form";

export function ContactTopic() {
  const topic = useSearchParams().get("topic") || "General enquiry";
  return <EnquiryForm initialTopic={topic} />;
}
