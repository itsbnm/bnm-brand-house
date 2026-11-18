import type { Metadata } from "next";
import { PortalHome } from "@/components/portal-home";

export const metadata: Metadata = {
  title: "Client portal",
  robots: { index: false, follow: false },
};

export default function PortalPage() {
  return (
    <div className="mx-auto max-w-6xl px-5 py-14">
      <PortalHome />
    </div>
  );
}
