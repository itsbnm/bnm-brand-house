"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { BookReader } from "./book-reader";

type Lesson = {
  id: string;
  title: string;
  kind: "video" | "text" | "book";
  minutes: number | null;
  text?: string;
  videoUrl?: string;
};

type Module = { id: string; title: string; lessons: Lesson[] };

type Payload = {
  enrolled: boolean;
  completed: string[];
  course: {
    slug: string;
    title: string;
    modules: Module[];
  };
};

export function Classroom({ slug }: { slug: string }) {
  const [data, setData] = useState<Payload | null>(null);
  const [error, setError] = useState("");
  const [current, setCurrent] = useState("");

  async function load() {
    const response = await fetch(`/api/learn/${slug}`);
    const payload = await response.json();
    if (!response.ok) {
      setError(payload.error || "The course could not be opened.");
      return;
    }
    setData(payload);
    const first = payload.course.modules.flatMap((module: Module) => module.lessons)[0];
    setCurrent((value) => value || first?.id || "");
  }

  useEffect(() => {
    const timer = window.setTimeout(() => {
      void load();
    }, 0);
    return () => window.clearTimeout(timer);
  }, [slug]);

  const lessons = useMemo(() => data?.course.modules.flatMap((module) => module.lessons) ?? [], [data]);
  const lesson = lessons.find((item) => item.id === current) ?? lessons[0];
  const index = lessons.findIndex((item) => item.id === lesson?.id);
  const done = data?.completed.length ?? 0;
  const progress = lessons.length ? Math.round((done / lessons.length) * 100) : 0;

  async function complete() {
    if (!lesson) return;
    await fetch(`/api/learn/${slug}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "progress", lessonId: lesson.id }),
    });
    await load();
  }

  if (error) return <p className="text-muted">{error}</p>;
  if (!data) return <p className="text-muted">Opening the course…</p>;
  if (!data.enrolled) {
    return (
      <p className="text-muted">
        Enrol on the course page before the lessons open.{" "}
        <Link href={`/learn/${slug}`} className="text-gold-2">
          Back to the course
        </Link>
      </p>
    );
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[16rem_1fr]">
      <aside className="border border-line/70 p-4 lg:max-h-[78vh] lg:overflow-auto">
        <p className="text-[11px] tracking-[0.22em] text-muted uppercase">{progress}% complete</p>
        <div className="mt-2 h-1 bg-line">
          <div className="h-1 bg-accent" style={{ width: `${progress}%` }} />
        </div>
        <div className="mt-5 grid gap-4">
          {data.course.modules.map((module, moduleIndex) => (
            <div key={module.id}>
              <p className="text-xs tracking-[0.16em] text-muted uppercase">Week {moduleIndex + 1}</p>
              <p className="mt-1 text-sm">{module.title}</p>
              <ul className="mt-2 grid gap-1">
                {module.lessons.map((item) => (
                  <li key={item.id}>
                    <button
                      type="button"
                      className={`w-full px-2 py-1.5 text-left text-sm ${item.id === lesson?.id ? "bg-card" : ""}`}
                      onClick={() => setCurrent(item.id)}
                    >
                      <span className="text-muted">{data.completed.includes(item.id) ? "Done · " : ""}</span>
                      {item.title}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </aside>
      <section>
        {lesson ? (
          <>
            <p className="text-[11px] tracking-[0.22em] text-muted uppercase">{label(lesson.kind)}</p>
            <h2 className="mt-2 text-3xl">{lesson.title}</h2>
            <div className="mt-6">
              {lesson.kind === "video" ? <Video url={lesson.videoUrl || ""} /> : null}
              {lesson.kind === "text" ? <Reading text={lesson.text || ""} /> : null}
              {lesson.kind === "book" ? <BookReader lessonId={lesson.id} /> : null}
            </div>
            <div className="mt-8 flex flex-wrap items-center justify-between gap-3 border-t border-line/70 pt-4">
              <button
                type="button"
                className="text-sm text-muted"
                disabled={index <= 0}
                onClick={() => lessons[index - 1] && setCurrent(lessons[index - 1].id)}
              >
                Previous
              </button>
              <button type="button" className="rounded-full bg-accent px-4 py-2 text-sm text-white" onClick={() => void complete()}>
                {data.completed.includes(lesson.id) ? "Completed" : "Mark as complete"}
              </button>
              <button
                type="button"
                className="text-sm text-gold-2"
                disabled={index >= lessons.length - 1}
                onClick={() => lessons[index + 1] && setCurrent(lessons[index + 1].id)}
              >
                Next
              </button>
            </div>
          </>
        ) : (
          <p className="text-muted">This course has no lessons yet.</p>
        )}
      </section>
    </div>
  );
}

function label(kind: Lesson["kind"]) {
  if (kind === "video") return "Video";
  if (kind === "book") return "Book";
  return "Reading";
}

function Reading({ text }: { text: string }) {
  return (
    <div className="grid max-w-2xl gap-4">
      {text.split(/\n{2,}/).map((paragraph) => (
        <p key={paragraph.slice(0, 40)} className="leading-8 text-muted">
          {paragraph}
        </p>
      ))}
    </div>
  );
}

function Video({ url }: { url: string }) {
  if (!url) return <p className="text-muted">The video has not been added yet.</p>;
  const youtube = url.match(/(?:youtu\.be\/|v=)([\w-]{6,})/);
  if (youtube) {
    return (
      <iframe
        className="aspect-video w-full"
        src={`https://www.youtube-nocookie.com/embed/${youtube[1]}`}
        title="Lesson video"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    );
  }
  const vimeo = url.match(/vimeo\.com\/(\d+)/);
  if (vimeo) {
    return <iframe className="aspect-video w-full" src={`https://player.vimeo.com/video/${vimeo[1]}`} title="Lesson video" allowFullScreen />;
  }
  return <video key={url} className="aspect-video w-full bg-black" controls controlsList="nodownload" src={url} />;
}
