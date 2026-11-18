"use client";

import { useEffect, useState } from "react";
import type { ClientPortal, Milestone, PortalChannel } from "@/lib/types";
import { inputClass } from "./ui";

type View = Omit<ClientPortal, "passwordHash">;

const channels: { id: PortalChannel; label: string }[] = [
  { id: "whatsapp", label: "WhatsApp" },
  { id: "email", label: "Email" },
  { id: "call", label: "Call" },
  { id: "portal", label: "Portal" },
];

function dayLabel(iso: string) {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
}

function journeyDay(startsOn: string, days: number) {
  const start = new Date(`${startsOn}T00:00:00Z`).getTime();
  const elapsed = Math.floor((Date.now() - start) / 86400000) + 1;
  return Math.min(days, Math.max(1, elapsed));
}

export function PortalBoard({ id, studio }: { id: string; studio?: boolean }) {
  const [portal, setPortal] = useState<View | null>(null);
  const [role, setRole] = useState<"client" | "studio" | "">("");
  const [error, setError] = useState("");

  async function load() {
    const response = await fetch(`/api/portal/${id}`);
    const data = await response.json();
    if (!response.ok) {
      setError(data.error || "This portal could not be opened.");
      return;
    }
    setPortal(data.portal);
    setRole(data.role);
    setError("");
  }

  useEffect(() => {
    const timer = window.setTimeout(() => void load(), 0);
    return () => window.clearTimeout(timer);
  }, [id]);

  async function act(body: Record<string, string>) {
    setError("");
    const response = await fetch(`/api/portal/${id}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    const data = await response.json();
    if (!response.ok) {
      setError(data.error || "That did not save.");
      return;
    }
    await load();
  }

  async function upload(formData: FormData) {
    setError("");
    const response = await fetch(`/api/portal/${id}/upload`, { method: "POST", body: formData });
    const data = await response.json();
    if (!response.ok) {
      setError(data.error || "The file was not added.");
      return;
    }
    await load();
  }

  if (error && !portal) return <p className="text-muted">{error}</p>;
  if (!portal) return <p className="text-muted">Opening the portal…</p>;

  const studioView = studio || role === "studio";
  const done = portal.milestones.filter((item) => item.status === "done").length;
  const progress = portal.milestones.length ? Math.round((done / portal.milestones.length) * 100) : 0;
  const clientFiles = portal.files.filter((file) => file.from === "client");
  const studioFiles = portal.files.filter((file) => file.from === "studio");

  return (
    <div className="grid gap-10">
      <header>
        <p className="eyebrow">{portal.status === "complete" ? "Complete" : `Day ${journeyDay(portal.startsOn, portal.days)} of ${portal.days}`}</p>
        <h1 className="mt-3 text-5xl">{portal.project}</h1>
        <p className="mt-3 text-muted">
          {portal.name}
          {portal.phone ? ` · ${portal.phone}` : ""} · {dayLabel(portal.startsOn)} to {dayLabel(addIso(portal.startsOn, portal.days - 1))}
        </p>
        {portal.summary ? <p className="mt-4 max-w-2xl leading-7">{portal.summary}</p> : null}
        <div className="mt-5 h-1.5 max-w-md overflow-hidden rounded-full bg-card">
          <div className="h-full bg-accent" style={{ width: `${progress}%` }} />
        </div>
        <p className="mt-2 text-sm text-muted">{progress}% of the milestones are done.</p>
      </header>
      {error ? <p className="text-sm text-accent">{error}</p> : null}

      <section>
        <h2 className="text-3xl">Milestones</h2>
        <div className="mt-4 grid gap-3 md:grid-cols-2">
          {portal.milestones.map((milestone, index) => (
            <article key={milestone.id} className="border border-line p-5">
              <p className="text-sm font-semibold text-muted">
                Week {index + 1} · {labelStatus(milestone.status)} · {dayLabel(milestone.startsOn)} – {dayLabel(milestone.endsOn)}
              </p>
              <h3 className="mt-2 text-2xl">{milestone.title}</h3>
              <p className="mt-3 text-sm leading-6">
                <span className="font-semibold">From you. </span>
                {milestone.clientExpects}
              </p>
              <p className="mt-2 text-sm leading-6">
                <span className="font-semibold">From the studio. </span>
                {milestone.studioExpects}
              </p>
              {studioView ? <MilestoneForm milestone={milestone} onSave={act} /> : null}
            </article>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-3xl">Requests</h2>
        <p className="mt-2 max-w-2xl text-muted">When the studio asks for something, it appears here. Your reply stays with the request.</p>
        <div className="mt-4 grid gap-3">
          {portal.requests.length === 0 ? <p className="text-sm text-muted">No open requests.</p> : null}
          {portal.requests.map((item) => (
            <article key={item.id} className="border border-line p-5">
              <p className="text-sm font-semibold text-muted">{item.status === "open" ? "Waiting on you" : "Answered"}</p>
              <h3 className="mt-1 text-xl">{item.title}</h3>
              {item.detail ? <p className="mt-2 leading-7">{item.detail}</p> : null}
              {item.reply ? <p className="mt-3 leading-7 text-muted">Your reply: {item.reply}</p> : null}
              {!studioView && item.status === "open" ? (
                <form
                  className="mt-3 grid gap-2"
                  onSubmit={(event) => {
                    event.preventDefault();
                    const data = new FormData(event.currentTarget);
                    void act({ action: "reply", requestId: item.id, reply: String(data.get("reply") || "") });
                  }}
                >
                  <textarea name="reply" required rows={3} placeholder="Your reply" className={inputClass} />
                  <button className="btn w-fit">Send reply</button>
                </form>
              ) : null}
            </article>
          ))}
        </div>
        {studioView ? (
          <form
            className="mt-4 grid gap-2"
            onSubmit={(event) => {
              event.preventDefault();
              const data = new FormData(event.currentTarget);
              void act({ action: "request", title: String(data.get("title") || ""), detail: String(data.get("detail") || "") });
              event.currentTarget.reset();
            }}
          >
            <input name="title" required placeholder="What you need from the client" className={inputClass} />
            <textarea name="detail" rows={3} placeholder="The detail" className={inputClass} />
            <button className="btn w-fit">Ask the client</button>
          </form>
        ) : null}
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <FileColumn title="Documents from you" files={clientFiles} />
        <FileColumn title="Documents from the studio" files={studioFiles} />
      </section>
      <form action={upload} className="grid gap-2 border border-line p-5">
        <h2 className="text-2xl">{studioView ? "Add a file" : "Send a document"}</h2>
        <input name="note" placeholder="What this file is" className={inputClass} />
        <input required name="file" type="file" className="text-sm" />
        <button className="btn w-fit">Upload</button>
      </form>

      <section>
        <h2 className="text-3xl">Meetings</h2>
        <div className="mt-4 grid gap-3">
          {portal.meetings.length === 0 ? <p className="text-sm text-muted">Meeting summaries will be kept here.</p> : null}
          {portal.meetings.map((meeting) => (
            <article key={meeting.id} className="border border-line p-5">
              <p className="text-sm font-semibold text-muted">{dayLabel(meeting.heldOn)}</p>
              <h3 className="mt-1 text-xl">{meeting.title}</h3>
              <p className="mt-2 leading-7">{meeting.summary}</p>
            </article>
          ))}
        </div>
        {studioView ? (
          <form
            className="mt-4 grid gap-2"
            onSubmit={(event) => {
              event.preventDefault();
              const data = new FormData(event.currentTarget);
              void act({
                action: "meeting",
                heldOn: String(data.get("heldOn") || ""),
                title: String(data.get("title") || ""),
                summary: String(data.get("summary") || ""),
              });
              event.currentTarget.reset();
            }}
          >
            <input name="heldOn" type="date" required className={inputClass} />
            <input name="title" required placeholder="Meeting title" className={inputClass} />
            <textarea name="summary" required rows={4} placeholder="What was decided" className={inputClass} />
            <button className="btn w-fit">Save the summary</button>
          </form>
        ) : null}
      </section>

      <section>
        <h2 className="text-3xl">Links</h2>
        <ul className="mt-4 grid gap-2">
          {portal.links.length === 0 ? <li className="text-sm text-muted">Links the studio shares will stay here.</li> : null}
          {portal.links.map((link) => (
            <li key={link.id}>
              <a href={link.url} className="more" target="_blank" rel="noreferrer">
                {link.title}
              </a>
              {link.note ? <p className="text-sm text-muted">{link.note}</p> : null}
            </li>
          ))}
        </ul>
        {studioView ? (
          <form
            className="mt-4 grid gap-2"
            onSubmit={(event) => {
              event.preventDefault();
              const data = new FormData(event.currentTarget);
              void act({
                action: "link",
                title: String(data.get("title") || ""),
                url: String(data.get("url") || ""),
                note: String(data.get("note") || ""),
              });
              event.currentTarget.reset();
            }}
          >
            <input name="title" required placeholder="Link name" className={inputClass} />
            <input name="url" required placeholder="https://" className={inputClass} />
            <input name="note" placeholder="Why it matters" className={inputClass} />
            <button className="btn w-fit">Add the link</button>
          </form>
        ) : null}
      </section>

      <section>
        <h2 className="text-3xl">The record</h2>
        <p className="mt-2 max-w-2xl text-muted">
          Notes from the portal, WhatsApp, email, and calls live here, so a later visit does not depend on finding the old thread.
        </p>
        <ol className="mt-4 grid gap-3">
          {portal.messages.length === 0 ? <li className="text-sm text-muted">Nothing has been recorded yet.</li> : null}
          {portal.messages.map((message) => (
            <li key={message.id} className="border border-line p-4">
              <p className="text-sm font-semibold text-muted">
                {channels.find((item) => item.id === message.channel)?.label} · {message.author === "studio" ? "Studio" : portal.name} ·{" "}
                {dayLabel(message.createdAt.slice(0, 10))}
              </p>
              <p className="mt-2 leading-7">{message.body}</p>
            </li>
          ))}
        </ol>
        <form
          className="mt-4 grid gap-2"
          onSubmit={(event) => {
            event.preventDefault();
            const data = new FormData(event.currentTarget);
            void act({ action: "message", channel: String(data.get("channel") || "portal"), body: String(data.get("body") || "") });
            event.currentTarget.reset();
          }}
        >
          {studioView ? (
            <select name="channel" className={inputClass} defaultValue="whatsapp">
              {channels.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.label}
                </option>
              ))}
            </select>
          ) : null}
          <textarea name="body" required rows={3} placeholder={studioView ? "Record what was said" : "Send a note to the studio"} className={inputClass} />
          <button className="btn w-fit">{studioView ? "Add to the record" : "Send the note"}</button>
        </form>
      </section>

      {studioView ? (
        <form
          onSubmit={(event) => {
            event.preventDefault();
            const data = new FormData(event.currentTarget);
            void act({ action: "project", status: String(data.get("status") || "active"), summary: String(data.get("summary") || "") });
          }}
        >
          <h2 className="text-3xl">Project</h2>
          <textarea name="summary" defaultValue={portal.summary} rows={3} className={inputClass} />
          <select name="status" defaultValue={portal.status} className={inputClass}>
            <option value="active">Active</option>
            <option value="complete">Complete</option>
          </select>
          <button className="btn mt-3">Save the project</button>
        </form>
      ) : null}
    </div>
  );
}

function FileColumn({ title, files }: { title: string; files: View["files"] }) {
  return (
    <div>
      <h2 className="text-2xl">{title}</h2>
      <ul className="mt-3 grid gap-2">
        {files.length === 0 ? <li className="text-sm text-muted">None yet.</li> : null}
        {files.map((file) => (
          <li key={file.id}>
            <a className="more" href={`/api/portal/file/${file.id}`}>
              {file.name}
            </a>
            {file.note ? <p className="text-sm text-muted">{file.note}</p> : null}
          </li>
        ))}
      </ul>
    </div>
  );
}

function MilestoneForm({ milestone, onSave }: { milestone: Milestone; onSave: (body: Record<string, string>) => Promise<void> }) {
  return (
    <form
      className="mt-4 grid gap-2"
      onSubmit={(event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        void onSave({
          action: "milestone",
          milestoneId: milestone.id,
          title: String(data.get("title") || ""),
          clientExpects: String(data.get("clientExpects") || ""),
          studioExpects: String(data.get("studioExpects") || ""),
          status: String(data.get("status") || milestone.status),
        });
      }}
    >
      <input name="title" defaultValue={milestone.title} className={inputClass} />
      <textarea name="clientExpects" defaultValue={milestone.clientExpects} rows={2} className={inputClass} />
      <textarea name="studioExpects" defaultValue={milestone.studioExpects} rows={2} className={inputClass} />
      <select name="status" defaultValue={milestone.status} className={inputClass}>
        <option value="upcoming">Upcoming</option>
        <option value="current">Current</option>
        <option value="done">Done</option>
      </select>
      <button className="btn-ghost w-fit">Update this week</button>
    </form>
  );
}

function addIso(iso: string, days: number) {
  const date = new Date(`${iso}T00:00:00Z`);
  date.setUTCDate(date.getUTCDate() + days);
  return date.toISOString().slice(0, 10);
}

function labelStatus(status: Milestone["status"]) {
  if (status === "done") return "Done";
  if (status === "current") return "This week";
  return "Ahead";
}
