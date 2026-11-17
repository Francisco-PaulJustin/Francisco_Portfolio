"use client";

import Link from "next/link";
import { useRef, useSyncExternalStore } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { profile, projects, type Project } from "@/content/site";
import { GitHubIcon } from "./icons";
import { Reveal } from "./motion-kit";
import { ProjectCover } from "./project-cover";
import { SectionHeading } from "./section-heading";

// Must match the .stack-card media query in globals.css
const STACK_QUERY = "(min-width: 1024px) and (min-height: 720px) and (prefers-reduced-motion: no-preference)";

/** True where the cards pile up (large, tall screens, motion allowed). Elsewhere they are a plain list. */
function useStacking() {
  return useSyncExternalStore(
    (onChange) => {
      const mq = window.matchMedia(STACK_QUERY);
      mq.addEventListener("change", onChange);
      return () => mq.removeEventListener("change", onChange);
    },
    () => window.matchMedia(STACK_QUERY).matches,
    () => false,
  );
}

function StackCard({
  project,
  index,
  total,
  progress,
  stacking,
}: {
  project: Project;
  index: number;
  total: number;
  progress: MotionValue<number>;
  stacking: boolean;
}) {
  // Earlier cards shrink and dim as later cards slide over them
  const behind = total - 1 - index;
  const scale = useTransform(progress, [index / total, 1], [1, 1 - behind * 0.05]);
  const dim = useTransform(progress, [index / total, 1], [0, behind * 0.3]);

  return (
    <li className="stack-card" style={{ "--stack-i": index } as React.CSSProperties}>
      <motion.article
        style={stacking ? { scale } : undefined}
        className="group relative origin-top overflow-hidden rounded-3xl border border-line bg-surface shadow-[0_40px_100px_-40px_rgba(0,0,0,0.6)] transition-colors duration-300 hover:border-line-strong"
      >
        <div className="grid lg:grid-cols-12">
          {/* Spec */}
          <div className="flex flex-col justify-between gap-8 p-7 md:p-10 lg:col-span-5">
            <div className="grid gap-4">
              <div className="flex items-center justify-between gap-4">
                <span className="flex items-center gap-3">
                  <span className="font-mono text-xs text-accent">{String(index + 1).padStart(2, "0")}</span>
                  <span className="label">{project.kicker}</span>
                </span>
                <span className="label">{project.year}</span>
              </div>
              <h3 className="display-h text-[clamp(2rem,3.2vw,2.75rem)]">
                {/* The title link covers the whole card, so the card is one big click target */}
                <Link href={`/projects/${project.slug}`} className="after:absolute after:inset-0 after:z-10 after:rounded-3xl after:content-['']">
                  {project.title}
                </Link>
              </h3>
              <p className="text-muted">{project.summary}</p>
            </div>

            <dl className="grid border-t border-line text-sm">
              {[
                ["My part", project.role],
                ["Team", project.team],
              ].map(([k, v]) => (
                <div key={k} className="flex justify-between gap-6 border-b border-line py-3">
                  <dt className="label shrink-0 pt-0.5">{k}</dt>
                  <dd className="text-right">{v}</dd>
                </div>
              ))}
            </dl>

            <div className="flex flex-wrap items-center justify-between gap-4">
              <ul className="flex flex-wrap gap-2">
                {project.tags.map((t) => (
                  <li key={t} className="rounded-md border border-line px-2.5 py-1 font-mono text-xs text-muted">
                    {t}
                  </li>
                ))}
              </ul>
              <span aria-hidden className="inline-flex items-center gap-3 text-sm font-medium">
                Read case study
                <span className="grid size-10 place-items-center rounded-full bg-fg text-bg transition-[transform,background-color,color] duration-300 ease-out group-hover:rotate-45 group-hover:bg-accent group-hover:text-accent-fg group-active:scale-90">
                  <ArrowUpRight size={17} />
                </span>
              </span>
            </div>
          </div>

          {/* Cover: first on small screens, beside the text on large ones */}
          <div className="relative order-first aspect-[16/10] overflow-hidden border-b border-line lg:order-none lg:col-span-7 lg:aspect-auto lg:min-h-[440px] lg:border-b-0 lg:border-l">
            <div className="absolute inset-0 transition-transform duration-700 ease-out-expo group-hover:scale-[1.04]">
              <ProjectCover project={project} />
            </div>
          </div>
        </div>

        {stacking && <motion.div aria-hidden style={{ opacity: dim }} className="pointer-events-none absolute inset-0 z-20 bg-bg" />}
      </motion.article>
    </li>
  );
}

export function Projects() {
  const ref = useRef<HTMLOListElement>(null);
  const stacking = useStacking();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  return (
    <section id="projects" className="relative py-28 md:py-40">
      <div className="container-page">
        <SectionHeading
          stage={2}
          eyebrow="Projects"
          title="Things I helped build and ship."
          lede="Each one opens a short case study: the problem, what I built myself, and the tools we used."
        />

        <ol ref={ref} className="relative">
          {projects.map((p, i) => (
            <StackCard key={p.slug} project={p} index={i} total={projects.length} progress={scrollYProgress} stacking={stacking} />
          ))}
        </ol>

        <Reveal className="mt-16 flex flex-wrap items-center justify-between gap-4 border-t border-line pt-8">
          <p className="text-muted">More code, experiments and school work are on GitHub.</p>
          <a
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex h-12 items-center gap-2 rounded-full border border-line-strong px-6 font-medium transition-[border-color,background-color,transform] duration-200 hover:border-fg hover:bg-fg/5 active:scale-[0.97]"
          >
            <GitHubIcon />
            See my GitHub
            <ArrowUpRight size={16} className="transition-transform duration-300 ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </a>
        </Reveal>
      </div>
    </section>
  );
}
