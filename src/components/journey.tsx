"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { journey } from "@/content/site";
import { Reveal } from "./motion-kit";
import { SectionHeading } from "./section-heading";

export function Journey() {
  const ref = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 75%", "end 55%"] });
  const line = useSpring(scrollYProgress, { stiffness: 90, damping: 25 });

  return (
    <section id="journey" className="relative isolate overflow-hidden py-28 md:py-40">
      <div aria-hidden className="glow -right-[30vmax] top-[20%] [--glow-a:0.14]" />
      <div className="container-page">
        <SectionHeading eyebrow="Journey" title="Education and certification." />

        <div className="grid md:grid-cols-12 md:gap-6">
          <ol ref={ref} className="relative grid gap-14 pl-8 md:col-span-9 md:col-start-4 md:pl-12">
            {/* track + scroll-drawn line */}
            <span aria-hidden className="absolute bottom-2 left-[5px] top-2 w-px bg-line md:left-[9px]" />
            <motion.span
              aria-hidden
              style={{ scaleY: line }}
              className="absolute bottom-2 left-[5px] top-2 w-px origin-top bg-accent md:left-[9px]"
            />

            {journey.map((j) => (
              <li key={j.title} className="relative">
                <span
                  aria-hidden
                  className="absolute -left-8 top-2 size-[11px] rounded-full border-2 border-accent bg-bg md:-left-12 md:size-[19px] md:top-1"
                />
                <Reveal className="grid gap-3 md:grid-cols-9 md:gap-6">
                  <div className="grid content-start gap-1 md:col-span-3">
                    <span className="font-mono text-sm text-accent">{j.when}</span>
                    <span className="label">{j.kind}</span>
                  </div>
                  <div className="grid gap-2 md:col-span-6">
                    <h3 className="text-2xl font-semibold leading-tight md:text-3xl">{j.title}</h3>
                    <p className="text-muted">{j.where}</p>
                    {j.detail && <p className="max-w-[56ch] text-muted">{j.detail}</p>}
                    {j.link && (
                      <a
                        href={j.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex w-fit items-center gap-1 text-sm font-medium text-accent hover:underline"
                      >
                        View credential <ArrowUpRight size={14} />
                      </a>
                    )}
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
