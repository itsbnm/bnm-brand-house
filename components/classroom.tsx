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
        <Link href={`/learn/${slug}`} className="more">
          Back to the course
        </Link>
      </p>
    );
  }

  return (
    <div className="flex flex-wrap items-start gap-8">
      <aside aria-label="Course outline" className="min-w-0 flex-[1_1_280px] lg:sticky lg:top-20 lg:max-h-[82vh] lg:max-w-[360px] lg:overflow-auto">
        <p className="text-[13px] text-muted">BNM Academy</p>
        <p className="mt-1 text-[21px] font-bold tracking-tight">{data.course.title}</p>
        <div className="mt-4 flex items-center gap-3">
          <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-[#e8e8ed]">
            <div className="h-full rounded-full bg-accent transition-[width] duration-500" style={{ width: `${progress}%` }} />
          </div>
          <span className="text-sm text-muted">{progress}% complete</span>
        </div>
        <nav className="mt-6 grid gap-5">
          {data.course.modules.map((module, moduleIndex) => (
            <div key={module.id}>
              <p className="eyebrow px-3 !text-xs">Module {moduleIndex + 1}</p>
              <p className="px-3 pt-1 pb-2 font-semibold">{module.title}</p>
              <ul className="grid gap-0.5">
                {module.lessons.map((item) => {
                  const on = item.id === lesson?.id;
                  const finished = data.completed.includes(item.id);
                  return (
                    <li key={item.id}>
                      <button
                        type="button"
                        aria-current={on ? "step" : undefined}
                        className={`flex min-h-11 w-full items-start gap-3 rounded-xl px-3 py-2.5 text-left hover:bg-card ${on ? "bg-card shadow-[inset_3px_0_0_#0066cc]" : ""}`}
                        onClick={() => setCurrent(item.id)}
                      >
                        <Tick done={finished} />
                        <span className="flex min-w-0 flex-col">
                          <span className="text-[15px] leading-snug font-medium">{item.title}</span>
                          <span className="text-[13px] text-muted">
                            {label(item.kind)}
                            {item.minutes ? ` · ${item.minutes} min` : ""}
                          </span>
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </nav>
      </aside>
      <section className="min-w-0 flex-[999_1_560px]">
        {lesson ? (
          <>
            <p className="text-[13px] font-semibold text-muted">{label(lesson.kind)}</p>
            <h1 className="mt-1.5 text-[clamp(28px,3.6vw,40px)] leading-[1.1]">{lesson.title}</h1>
            <div className="mt-6">
              {lesson.kind === "video" ? <Video url={lesson.videoUrl || ""} /> : null}
              {lesson.kind === "text" ? <Reading text={lesson.text || ""} /> : null}
              {lesson.kind === "book" ? <BookReader lessonId={lesson.id} /> : null}
            </div>
            <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-[#e8e8ed] pt-6">
              <button
                type="button"
                className="more min-h-11 disabled:opacity-30"
                disabled={index <= 0}
                onClick={() => lessons[index - 1] && setCurrent(lessons[index - 1].id)}
              >
                ‹ Previous
              </button>
              <button type="button" className="btn-ghost" onClick={() => void complete()}>
                {data.completed.includes(lesson.id) ? "Completed ✓" : "Mark as complete"}
              </button>
              <button
                type="button"
                className="btn disabled:opacity-30"
                disabled={index >= lessons.length - 1}
                onClick={() => lessons[index + 1] && setCurrent(lessons[index + 1].id)}
              >
                {lessons[index + 1] ? `Next: ${lessons[index + 1].title} ›` : "Last lesson"}
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

function Tick({ done }: { done: boolean }) {
  return done ? (
    <svg width="20" height="20" viewBox="0 0 24 24" className="mt-0.5 shrink-0" role="img" aria-label="Completed">
      <circle cx="12" cy="12" r="10" fill="#1a7f37" />
      <path d="M7.5 12.5l3 3 6-6.5" fill="none" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ) : (
    <svg width="20" height="20" viewBox="0 0 24 24" className="mt-0.5 shrink-0" aria-hidden="true">
      <circle cx="12" cy="12" r="9.5" fill="none" stroke="#c7c7cc" strokeWidth="1.5" />
    </svg>
  );
}

function label(kind: Lesson["kind"]) {
  if (kind === "video") return "Video";
  if (kind === "book") return "Book";
  return "Reading";
}

function Reading({ text }: { text: string }) {
  return (
    <div className="grid max-w-[680px] gap-5">
      {text.split(/\n{2,}/).map((paragraph) => (
        <p key={paragraph.slice(0, 40)} className="text-[19px] leading-[1.65]">
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
        className="aspect-video w-full rounded-[20px]"
        src={`https://www.youtube-nocookie.com/embed/${youtube[1]}`}
        title="Lesson video"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    );
  }
  const vimeo = url.match(/vimeo\.com\/(\d+)/);
  if (vimeo) {
    return <iframe className="aspect-video w-full rounded-[20px]" src={`https://player.vimeo.com/video/${vimeo[1]}`} title="Lesson video" allowFullScreen />;
  }
  return <video key={url} className="aspect-video w-full rounded-[20px] bg-black" controls controlsList="nodownload" src={url} />;
}
