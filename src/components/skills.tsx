import { Cloud, Code2, Wrench } from "lucide-react";
import { skillGroups } from "@/content/site";
import { RevealGroup, RevealItem } from "./motion-kit";
import { SectionHeading } from "./section-heading";

const ICONS = [Code2, Cloud, Wrench];

function Marquee({ items, reverse = false, duration = 50 }: { items: string[]; reverse?: boolean; duration?: number }) {
  const row = [...items, ...items];
  return (
    <div className="marquee overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_10%,black_90%,transparent)]">
      <div
        className="marquee-track flex w-max gap-10 pr-10"
        data-reverse={reverse}
        style={{ "--marquee-duration": `${duration}s` } as React.CSSProperties}
      >
        {row.map((t, i) => (
          <span
            key={i}
            className={`whitespace-nowrap font-display text-[clamp(3rem,8vw,6.5rem)] font-bold leading-none tracking-[-0.04em] ${
              i % 2 ? "text-outline" : "text-fg/90"
            }`}
          >
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}

export function Skills() {
  const web = skillGroups[0].items;
  const cloud = [...skillGroups[1].items, ...skillGroups[2].items];

  return (
    <section id="skills" className="relative isolate overflow-hidden py-28 md:py-40">
      <div aria-hidden className="glow -left-[30vmax] bottom-0 [--glow-a:0.12]" />

      {/* Decorative band: the readable list is the cards below */}
      <div aria-hidden className="mb-20 grid gap-4 md:mb-28">
        <Marquee items={web} duration={55} />
        <Marquee items={cloud} reverse duration={70} />
      </div>

      <div className="container-page">
        <SectionHeading
          eyebrow="Skills"
          title="From the database to the cloud."
          lede="I write the app, set up the data, and package it to run anywhere. These are the tools I've used in school and team projects."
        />
        <RevealGroup className="grid gap-6 md:grid-cols-12">
          {skillGroups.map((g, i) => {
            const Icon = ICONS[i % ICONS.length];
            return (
              <RevealItem
                key={g.title}
                className="group relative grid content-start gap-6 overflow-hidden rounded-2xl border border-line bg-surface/60 p-7 transition-[border-color,transform] duration-300 ease-out hover:-translate-y-1 hover:border-accent/50 md:col-span-4"
              >
                <span className="grid size-12 place-items-center rounded-xl border border-line bg-bg text-accent transition-colors duration-300 group-hover:border-accent/40">
                  <Icon size={22} aria-hidden />
                </span>
                <div className="grid gap-1">
                  <h3 className="text-2xl font-semibold">{g.title}</h3>
                  <p className="text-sm text-muted">{g.note}</p>
                </div>
                <ul className="flex flex-wrap gap-2">
                  {g.items.map((s) => (
                    <li key={s} className="rounded-full border border-line px-3 py-1.5 text-sm">
                      {s}
                    </li>
                  ))}
                </ul>
                <span
                  aria-hidden
                  className="pointer-events-none absolute -right-24 -top-24 size-64 rounded-full bg-[radial-gradient(closest-side,rgba(var(--glow),0.18),transparent)] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                />
              </RevealItem>
            );
          })}
        </RevealGroup>
      </div>
    </section>
  );
}
