import type { Course, CourseModule, Lesson } from "./types";

export function courseSlug(title: string, taken: string[]) {
  const base =
    title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "")
      .slice(0, 60) || "course";
  let slug = base;
  let n = 2;
  while (taken.includes(slug)) {
    slug = `${base}-${n}`;
    n += 1;
  }
  return slug;
}

export function lessonCount(course: Course) {
  return course.modules.reduce((sum, module) => sum + module.lessons.length, 0);
}

export function findLesson(course: Course, lessonId: string) {
  for (const module of course.modules) {
    const lesson = module.lessons.find((item) => item.id === lessonId);
    if (lesson) return { module, lesson };
  }
  return null;
}

export function outline(course: Course) {
  return {
    id: course.id,
    slug: course.slug,
    title: course.title,
    summary: course.summary,
    description: course.description,
    level: course.level,
    price: course.price,
    status: course.status,
    lessons: lessonCount(course),
    modules: course.modules.map((module) => ({
      id: module.id,
      title: module.title,
      lessons: module.lessons.map((lesson) => ({
        id: lesson.id,
        title: lesson.title,
        kind: lesson.kind,
        minutes: lesson.minutes ?? null,
      })),
    })),
  };
}

export function classroomCourse(course: Course) {
  return {
    ...outline(course),
    modules: course.modules.map((module: CourseModule) => ({
      id: module.id,
      title: module.title,
      lessons: module.lessons.map((lesson: Lesson) => ({
        id: lesson.id,
        title: lesson.title,
        kind: lesson.kind,
        minutes: lesson.minutes ?? null,
        text: lesson.text ?? "",
        videoUrl: lesson.videoUrl || (lesson.kind === "video" && lesson.mediaId ? `/api/learn/media/${lesson.mediaId}` : ""),
      })),
    })),
  };
}
