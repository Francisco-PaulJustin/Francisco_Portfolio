import Image from "next/image";
import { ImageIcon } from "lucide-react";
import type { Project } from "@/content/site";

/** Project screenshot, or an empty browser window waiting for one. Fills its parent. */
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

      {/* An empty browser window — the screenshot goes here */}
      <div className="relative w-[80%] max-w-[560px] overflow-hidden rounded-xl border border-line bg-bg/85 shadow-[0_30px_60px_-30px_rgba(0,0,0,0.5)]">
        <div aria-hidden className="flex items-center gap-1.5 border-b border-line px-3 py-2.5">
          <span className="size-2 rounded-full bg-line-strong/60" />
          <span className="size-2 rounded-full bg-line-strong/60" />
          <span className="size-2 rounded-full bg-line-strong/60" />
          <span className="ml-3 h-3.5 flex-1 rounded-full bg-line" />
        </div>
        <div className="grid justify-items-center gap-2 px-6 py-7 text-center sm:gap-3 sm:py-10">
          <span className="hidden size-11 place-items-center rounded-full border border-line text-muted sm:grid">
            <ImageIcon size={18} aria-hidden />
          </span>
          <p className="font-display text-lg font-semibold tracking-tight text-fg/80 sm:text-xl">{project.title}</p>
          <p className="label">Screenshots coming soon</p>
        </div>
      </div>
    </div>
  );
}
