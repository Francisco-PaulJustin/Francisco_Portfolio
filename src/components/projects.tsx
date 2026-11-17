"use client";

import Link from "next/link";
import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { profile, projects, type Project } from "@/content/site";
import { GitHubIcon } from "./icons";
import { Reveal } from "./motion-kit";
import { ProjectCover } from "./project-cover";
import { SectionHeading } from "./section-heading";

function ProjectRow({ project, index }: { project: Project; index: number }) {
  const coverRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  // The cover's contents drift slightly against the scroll: depth without moving the frame
  const { scrollYProgress } = useScroll({ target: coverRef, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-5%", "5%"]);
  const flip = index % 2 === 1;
  const href = `/projects/${project.slug}`;

  return (
    <Reveal>
      <article className="group relative grid gap-8 border-t border-line py-12 md:py-16 lg:grid-cols-12 lg:gap-6">
        {/* Cover */}
        <div
          ref={coverRef}
          className={`relative aspect-[16/10] overflow-hidden rounded-2xl border border-line lg:col-span-7 ${
            flip ? "lg:order-2 lg:col-start-6" : ""
          }`}
        >
          <motion.div style={reduce ? undefined : { y }} className="absolute inset-[-6%]">
            <div className="absolute inset-0 transition-transform duration-700 ease-out-expo group-hover:scale-[1.03]">
              <ProjectCover project={project} />
            </div>
          </motion.div>
        </div>

        {/* Spec */}
        <div className={`flex flex-col justify-between gap-8 lg:col-span-5 ${flip ? "lg:order-1 lg:col-start-1" : "lg:col-start-8"}`}>
          <div className="grid gap-4">
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs text-accent">{String(index + 1).padStart(2, "0")}</span>
              <span className="label">{project.kicker}</span>
            </div>
            <h3 className="display-h text-[clamp(2rem,3.4vw,2.9rem)]">
              {/* The title link covers the whole row, so the row is one big click target */}
              <Link href={href} className="after:absolute after:inset-0 after:content-['']">
                {project.title}
              </Link>
            </h3>
            <p className="text-muted">{project.summary}</p>
          </div>

          <dl className="grid border-t border-line text-sm">
            {[
              ["My part", project.role],
              ["Team", project.team],
              ["Year", project.year],
            ].map(([k, v]) => (
              <div key={k} className="flex justify-between gap-6 border-b border-line py-3">
                <dt className="label pt-0.5">{k}</dt>
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
            <span aria-hidden className="inline-flex items-center gap-2 text-sm font-medium transition-colors duration-200 group-hover:text-accent">
              Case study
              <ArrowRight size={16} className="transition-transform duration-300 ease-out group-hover:translate-x-1" />
            </span>
          </div>
        </div>
      </article>
    </Reveal>
  );
}

export function Projects() {
  return (
    <section id="projects" className="relative py-28 md:py-40">
      <div className="container-page">
        <SectionHeading
          stage={2}
          eyebrow="Projects"
          title="Things I helped build and ship."
          lede="Each one opens a short case study: the problem, what I built myself, and the tools we used."
        />

        <div className="border-b border-line">
          {projects.map((p, i) => (
            <ProjectRow key={p.slug} project={p} index={i} />
          ))}
        </div>

        <Reveal className="mt-10 flex flex-wrap items-center justify-between gap-4">
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
