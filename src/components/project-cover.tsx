import Image from "next/image";
import type { Project } from "@/content/site";
import { Blank } from "./blank";

/** Project screenshot, or a designed placeholder until one is added. Fills its parent. */
export function ProjectCover({ project, priority = false }: { project: Project; priority?: boolean }) {
  if (project.cover) {
    return (
      <Image
        src={project.cover}
        alt={`Screenshot of ${project.title}`}
        fill
        priority={priority}
        sizes="(min-width: 1024px) 60vw, 100vw"
        className="object-cover"
      />
    );
  }
  return (
    <div className="absolute inset-0 grid place-items-center">
      <div aria-hidden className="bg-grid absolute inset-0" />
      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,var(--accent-soft),transparent_60%)]"
      />
      <span className="relative px-6 text-center font-display text-[clamp(2.5rem,6vw,5rem)] font-bold leading-none tracking-[-0.04em] text-fg/15">
        {project.title}
      </span>
      <Blank className="absolute bottom-4 left-4">
        screenshot → public/images/projects/{project.slug}.jpg
      </Blank>
    </div>
  );
}
