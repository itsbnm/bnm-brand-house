import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { PortalBoard } from "@/components/portal-board";

export const metadata: Metadata = { title: "Client portal", robots: { index: false, follow: false } };

export default function StudioClientPage({ params }: { params: Promise<{ id: string }> }) {
  return (
    <Suspense fallback={<p className="px-5 py-14 text-muted">Opening the client…</p>}>
      <Body params={params} />
    </Suspense>
  );
}

async function Body({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return (
    <div className="mx-auto max-w-5xl px-5 py-14">
      <Link href="/admin/clients" className="more">
        All clients
      </Link>
      <div className="mt-6">
        <PortalBoard id={id} studio />
      </div>
    </div>
  );
}
