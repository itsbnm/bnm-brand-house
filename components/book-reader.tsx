"use client";

import { useEffect, useRef, useState } from "react";
import { PageFlip } from "page-flip";

type Flip = PageFlip & {
  destroy: () => void;
  getPageCount: () => number;
};

export function BookReader({ lessonId }: { lessonId: string }) {
  const box = useRef<HTMLDivElement>(null);
  const flip = useRef<Flip | null>(null);
  const [status, setStatus] = useState("Opening the book…");
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    let cancelled = false;
    const host = box.current;
    (async () => {
      const pdfjs = await import("pdfjs-dist");
      pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs";
      const response = await fetch(`/api/learn/book/${lessonId}`);
      if (!response.ok) {
        if (!cancelled) setStatus("This book opens after you enrol.");
        return;
      }
      const pdf = await pdfjs.getDocument({ data: new Uint8Array(await response.arrayBuffer()) }).promise;
      const count = Math.min(pdf.numPages, 80);
      const images: string[] = [];
      for (let number = 1; number <= count; number += 1) {
        if (cancelled) return;
        const sheet = await pdf.getPage(number);
        const viewport = sheet.getViewport({ scale: 1.35 });
        const canvas = document.createElement("canvas");
        canvas.width = viewport.width;
        canvas.height = viewport.height;
        const context = canvas.getContext("2d");
        if (!context) continue;
        await sheet.render({ canvas, canvasContext: context, viewport }).promise;
        images.push(canvas.toDataURL("image/jpeg", 0.86));
        setStatus(`Preparing page ${number} of ${count}`);
      }
      if (cancelled || !host) return;
      const book = new PageFlip(host, {
        width: 420,
        height: 594,
        size: "stretch",
        minWidth: 260,
        maxWidth: 560,
        minHeight: 360,
        maxHeight: 820,
        drawShadow: true,
        flippingTime: 800,
        usePortrait: true,
        showCover: true,
        mobileScrollSupport: false,
        maxShadowOpacity: 0.4,
      }) as Flip;
      book.loadFromImages(images);
      book.on("flip", (event: { data: number }) => setPage(event.data + 1));
      flip.current = book;
      setTotal(count);
      setPage(1);
      setStatus(count < pdf.numPages ? "Showing the first 80 pages." : "");
    })().catch(() => {
      if (!cancelled) setStatus("The book could not be opened.");
    });
    return () => {
      cancelled = true;
      flip.current?.destroy();
      flip.current = null;
    };
  }, [lessonId]);

  return (
    <div className="select-none" onContextMenu={(event) => event.preventDefault()}>
      <div ref={box} className="mx-auto h-[68vh] min-h-80 w-full max-w-3xl bg-[#0c0a16]" />
      <div className="mt-4 flex items-center justify-between gap-3 text-sm">
        <button type="button" className="rounded-full border border-line px-4 py-2" onClick={() => flip.current?.flipPrev()}>
          Previous page
        </button>
        <p className="text-muted">{status || (total ? `Page ${page} of ${total}` : "")}</p>
        <button type="button" className="rounded-full border border-line px-4 py-2" onClick={() => flip.current?.flipNext()}>
          Next page
        </button>
      </div>
    </div>
  );
}
