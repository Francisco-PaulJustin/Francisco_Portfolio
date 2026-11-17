import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { projects } from "@/content/site";
import { ProjectCover } from "@/components/project-cover";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion-kit";
import { GitHubIcon } from "@/components/icons";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/projects/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return {};
  return { title: project.title, description: project.summary };
}

export default function ProjectPage({ params }: PageProps<"/projects/[slug]">) {
  // URL data is read inside <Suspense> so navigation stays instant (Cache Components rule)
  return (
    <Suspense fallback={<div className="min-h-svh" />}>
      <ProjectContent params={params} />
    </Suspense>
  );
}

async function ProjectContent({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const index = projects.findIndex((p) => p.slug === slug);
  if (index === -1) notFound();
  const project = projects[index];
  const next = projects[(index + 1) % projects.length];
  const cs = project.caseStudy;

  // What is still to come, listed in a short note at the end of the case study
  const pending = [
    !project.cover && "screenshots",
    !cs.stack.length && "the full tech stack",
    !cs.outcome && "the results",
    !cs.learned && "what I learned",
  ].filter((x): x is string => !!x);

  const meta = [
    { k: "Year", v: project.year },
    { k: "My role", v: project.role },
    { k: "Team", v: project.team },
  ];

  return (
    <article className="pb-28 pt-28 md:pb-40 md:pt-36">
      <div className="container-page">
        <Reveal>
          <Link
            href="/#projects"
            className="group inline-flex min-h-11 items-center gap-2 text-sm text-muted transition-colors duration-200 hover:text-fg"
          >
            <ArrowLeft size={16} className="transition-transform duration-300 ease-out group-hover:-translate-x-1" /> All projects
          </Link>
        </Reveal>

        <header className="mt-10 grid gap-8 md:grid-cols-12 md:gap-6">
          <Reveal className="grid gap-5 md:col-span-8">
            <p className="label">{project.kicker}</p>
            <h1 className="text-cinema text-[clamp(2.75rem,8vw,6.5rem)] font-bold leading-[0.95] tracking-[-0.04em]">
              {project.title}
            </h1>
            <p className="max-w-[56ch] text-xl text-muted">{project.summary}</p>
          </Reveal>
          <Reveal delay={0.1} className="flex flex-wrap content-end gap-3 md:col-span-4 md:justify-end">
            {project.repo && (
              <a
                href={project.repo}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-12 items-center gap-2 rounded-full border border-line-strong px-5 font-medium transition-[border-color,background-color,transform] duration-200 hover:border-fg hover:bg-fg/5 active:scale-[0.97]"
              >
                <GitHubIcon /> Code
              </a>
            )}
            {project.live && (
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-12 items-center gap-2 rounded-full bg-fg px-5 font-medium text-bg transition-transform duration-200 active:scale-[0.97]"
              >
                Live demo <ArrowUpRight size={16} />
              </a>
            )}
          </Reveal>
        </header>

        <Reveal delay={0.15} className="mt-14">
          <div className="relative aspect-[16/9] overflow-hidden rounded-3xl border border-line bg-surface">
            <ProjectCover project={project} priority />
          </div>
        </Reveal>

        <dl className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-3">
          {meta.map((m) => (
            <div key={m.k} className="grid gap-1 bg-bg p-6">
              <dt className="label">{m.k}</dt>
              <dd>{m.v}</dd>
            </div>
          ))}
        </dl>

        <div className="mt-24 grid gap-20">
          <Section title="The problem">
            <p>{cs.problem}</p>
          </Section>

          <Section title="What I built">
            <RevealGroup as="ul" className="grid gap-4">
              {cs.built.map((b) => (
                <RevealItem as="li" key={b} className="grid grid-cols-[20px_1fr] gap-3">
                  <span aria-hidden className="mt-3 h-px w-4 bg-accent" />
                  <span>{b}</span>
                </RevealItem>
              ))}
            </RevealGroup>
          </Section>

          {cs.stack.length > 0 && (
            <Section title="Tools">
              <ul className="flex flex-wrap gap-2">
                {cs.stack.map((s) => (
                  <li key={s} className="rounded-full border border-line px-4 py-2 font-mono text-sm">
                    {s}
                  </li>
                ))}
              </ul>
            </Section>
          )}

          {cs.outcome && (
            <Section title="Outcome">
              <p>{cs.outcome}</p>
            </Section>
          )}

          {cs.learned && (
            <Section title="What I learned">
              <p>{cs.learned}</p>
            </Section>
          )}

          {pending.length > 0 && (
            <Reveal>
              <aside className="grid gap-3 rounded-2xl border border-line bg-surface p-6 md:grid-cols-12 md:gap-6 md:p-8">
                <p className="label inline-flex items-center gap-2 md:col-span-3">
                  <span className="pulse-dot size-2 rounded-full bg-ok" /> Work in progress
                </p>
                <p className="text-muted md:col-span-8 md:col-start-5">
                  I’m still writing this one up. Coming soon:{" "}
                  {new Intl.ListFormat("en", { type: "conjunction" }).format(pending)}.
                </p>
              </aside>
            </Reveal>
          )}
        </div>

        <Reveal className="mt-32">
          <Link
            href={`/projects/${next.slug}`}
            className="group grid gap-3 border-t border-line pt-10"
          >
            <span className="label">Next project</span>
            <span className="flex items-center justify-between gap-6">
              <span className="text-[clamp(2rem,6vw,4.5rem)] font-bold leading-none tracking-[-0.04em] font-display">
                {next.title}
              </span>
              <span className="grid size-14 shrink-0 place-items-center rounded-full bg-fg text-bg transition-[transform,background-color,color] duration-300 ease-out group-hover:translate-x-2 group-hover:bg-accent group-hover:text-accent-fg">
                <ArrowRight />
              </span>
            </span>
          </Link>
        </Reveal>
      </div>
    </article>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <Reveal className="grid gap-4 md:grid-cols-12 md:gap-6">
      <h2 className="label md:col-span-3 md:pt-1.5">{title}</h2>
      <div className="max-w-[62ch] text-lg leading-relaxed md:col-span-8 md:col-start-5">{children}</div>
    </Reveal>
  );
}
