import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { PortalBoard } from "@/components/portal-board";

export const metadata: Metadata = { title: "Your project", robots: { index: false, follow: false } };

export default function PortalProjectPage({ params }: { params: Promise<{ id: string }> }) {
  return (
    <Suspense fallback={<p className="px-5 py-14 text-muted">Opening the project…</p>}>
      <ProjectBody params={params} />
    </Suspense>
  );
}

async function ProjectBody({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return (
    <div className="mx-auto max-w-5xl px-5 py-14">
      <Link href="/portal" className="more">
        All projects
      </Link>
      <div className="mt-6">
        <PortalBoard id={id} />
      </div>
    </div>
  );
}
