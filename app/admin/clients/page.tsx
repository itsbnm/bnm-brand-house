import type { Metadata } from "next";
import Link from "next/link";
import { ClientDesk } from "@/components/client-desk";

export const metadata: Metadata = { title: "Client portals", robots: { index: false, follow: false } };

export default function ClientsPage() {
  return (
    <div className="mx-auto max-w-5xl px-5 py-14">
      <p className="eyebrow">Studio</p>
      <h1 className="mt-3 text-5xl">Client portals</h1>
      <p className="mt-4 max-w-2xl text-lg leading-8 text-muted">
        Open a portal when the consultation becomes a project. The weeks, the documents, the requests, the meeting summaries, and the WhatsApp and email record stay with that client.
      </p>
      <p className="mt-3">
        <Link href="/admin" className="more">
          Back to the desk
        </Link>
      </p>
      <ClientDesk />
    </div>
  );
}
