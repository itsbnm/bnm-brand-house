"use client";

import { useEffect, useState } from "react";
import type { Course } from "@/lib/types";
import { inputClass } from "./ui";

export function CourseDesk() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [error, setError] = useState("");
  const [authed, setAuthed] = useState<boolean | null>(null);

  async function load() {
    const response = await fetch("/api/admin/courses");
    if (response.status === 401) {
      setAuthed(false);
      return;
    }
    const data = await response.json();
    setCourses(data.courses || []);
    setAuthed(true);
  }

  useEffect(() => {
    const timer = window.setTimeout(() => {
      void load();
    }, 0);
    return () => window.clearTimeout(timer);
  }, []);

  async function create(formData: FormData) {
    setError("");
    const response = await fetch("/api/admin/courses", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        action: "create",
        title: formData.get("title"),
        summary: formData.get("summary"),
        description: formData.get("description"),
        level: formData.get("level"),
        price: formData.get("price"),
      }),
    });
    const data = await response.json();
    if (!response.ok) {
      setError(data.error || "The course was not created.");
      return;
    }
    await load();
  }

  async function act(body: Record<string, string>) {
    const response = await fetch("/api/admin/courses", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    if (!response.ok) {
      const data = await response.json();
      setError(data.error || "That change did not save.");
      return;
    }
    await load();
  }

  async function addLesson(formData: FormData) {
    setError("");
    const response = await fetch("/api/admin/courses/upload", { method: "POST", body: formData });
    const data = await response.json();
    if (!response.ok) {
      setError(data.error || "The lesson was not added.");
      return;
    }
    await load();
  }

  if (authed === null) return <p className="mt-8 text-muted">Opening courses…</p>;
  if (!authed) return <p className="mt-8 text-muted">Sign in on the studio desk first.</p>;

  return (
    <div className="mt-8 grid gap-10">
      <form action={create} className="grid gap-3 border border-line/70 p-5">
        <h2 className="text-2xl">New course</h2>
        <input name="title" required placeholder="Course title" className={inputClass} />
        <input name="summary" required placeholder="One-line summary" className={inputClass} />
        <textarea name="description" rows={4} placeholder="What a learner will be able to do" className={inputClass} />
        <div className="grid gap-3 sm:grid-cols-2">
          <select name="level" className={inputClass} defaultValue="Beginner">
            <option>Beginner</option>
            <option>Intermediate</option>
            <option>Advanced</option>
          </select>
          <input name="price" type="number" min={0} placeholder="Price in USD, 0 if free" className={inputClass} />
        </div>
        <button className="w-fit rounded-full bg-accent px-5 py-2.5 text-sm text-white">Create course</button>
      </form>
      {error ? <p className="text-sm text-gold">{error}</p> : null}
      {courses.map((course) => (
        <article key={course.id} className="border border-line/70 p-5">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <h2 className="text-2xl">{course.title}</h2>
              <p className="mt-1 text-sm text-muted">{course.summary}</p>
            </div>
            <button
              type="button"
              className="rounded-full border border-line px-4 py-2 text-sm"
              onClick={() => void act({ action: "status", courseId: course.id, status: course.status === "published" ? "draft" : "published" })}
            >
              {course.status === "published" ? "Unpublish" : "Publish"}
            </button>
          </div>
          <form
            className="mt-4 flex gap-2"
            onSubmit={(event) => {
              event.preventDefault();
              const data = new FormData(event.currentTarget);
              void act({ action: "module", courseId: course.id, title: String(data.get("title") || "") });
              event.currentTarget.reset();
            }}
          >
            <input name="title" placeholder="Add a week" className={inputClass} />
            <button className="rounded-full border border-line px-4 text-sm">Add</button>
          </form>
          <div className="mt-4 grid gap-4">
            {course.modules.map((module, index) => (
              <div key={module.id} className="border border-line/60 p-4">
                <p className="text-xs tracking-[0.16em] text-muted uppercase">Week {index + 1}</p>
                <h3 className="mt-1 text-lg">{module.title}</h3>
                <ul className="mt-2 grid gap-1 text-sm text-muted">
                  {module.lessons.map((lesson) => (
                    <li key={lesson.id} className="flex justify-between gap-3">
                      <span>
                        {lesson.kind} · {lesson.title}
                      </span>
                      <button type="button" onClick={() => void act({ action: "remove-lesson", courseId: course.id, moduleId: module.id, lessonId: lesson.id })}>
                        Remove
                      </button>
                    </li>
                  ))}
                </ul>
                <form action={addLesson} className="mt-3 grid gap-2">
                  <input type="hidden" name="courseId" value={course.id} />
                  <input type="hidden" name="moduleId" value={module.id} />
                  <input name="title" required placeholder="Lesson title" className={inputClass} />
                  <div className="grid gap-2 sm:grid-cols-2">
                    <select name="kind" className={inputClass} defaultValue="video">
                      <option value="video">Video</option>
                      <option value="text">Text</option>
                      <option value="book">Book (PDF)</option>
                    </select>
                    <input name="minutes" type="number" min={0} placeholder="Minutes" className={inputClass} />
                  </div>
                  <input name="videoUrl" placeholder="Video link, if you are not uploading a file" className={inputClass} />
                  <textarea name="text" rows={3} placeholder="Reading text" className={inputClass} />
                  <input name="file" type="file" accept="video/mp4,video/webm,application/pdf" className="text-sm" />
                  <button className="w-fit rounded-full bg-accent px-4 py-2 text-sm text-white">Add lesson</button>
                </form>
              </div>
            ))}
          </div>
        </article>
      ))}
    </div>
  );
}
