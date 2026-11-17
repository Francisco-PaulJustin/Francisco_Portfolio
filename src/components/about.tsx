"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "motion/react";
import { ArrowUpRight, Camera } from "lucide-react";
import { about, profile } from "@/content/site";
import { Reveal, RevealGroup, RevealItem } from "./motion-kit";
import { SectionHeading } from "./section-heading";

function Word({ children, progress, range }: { children: string; progress: MotionValue<number>; range: [number, number] }) {
  const opacity = useTransform(progress, range, [0.18, 1]);
  return (
    <motion.span style={{ opacity }} className="mr-[0.25em] inline-block">
      {children}
    </motion.span>
  );
}

/** Statement that lights up word by word as you scroll through it. */
function ScrubStatement({ text }: { text: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 85%", "end 50%"] });
  const words = text.split(" ");

  return (
    <p ref={ref} className="display-h text-[clamp(1.6rem,3.4vw,2.85rem)] font-semibold leading-[1.18] [font-stretch:105%]">
      {reduce ? (
        text
      ) : (
        <>
          <span className="sr-only">{text}</span>
          <span aria-hidden>
            {words.map((word, i) => (
              <Word key={i} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]}>
                {word}
              </Word>
            ))}
          </span>
        </>
      )}
    </p>
  );
}

function Portrait() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);

  return (
    <div ref={ref} className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl border border-line bg-surface">
      {profile.photo ? (
        <motion.div style={{ y }} className="absolute inset-[-8%]">
          <Image src={profile.photo} alt={`Portrait of ${profile.name}`} fill sizes="(min-width: 768px) 33vw, 100vw" className="object-cover" />
        </motion.div>
      ) : (
        <div className="bg-grid absolute inset-0 grid place-items-center">
          <div aria-hidden className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,var(--accent-soft),transparent_65%)]" />
          <span aria-hidden className="display-x relative text-7xl text-fg/10">
            {profile.initials}
          </span>
          <span className="label absolute bottom-5 left-5 inline-flex items-center gap-2">
            <Camera size={14} aria-hidden /> Photo coming soon
          </span>
        </div>
      )}
    </div>
  );
}

export function About() {
  return (
    <section id="about" className="relative py-28 md:py-40">
      <div className="container-page">
        <SectionHeading stage={1} eyebrow="About" title="Database to deployment." id="about-title" />

        <div className="grid gap-14 md:grid-cols-12 md:gap-6">
          <div className="md:col-span-4">
            <Portrait />
          </div>

          <div className="grid content-between gap-12 md:col-span-7 md:col-start-6">
            <ScrubStatement text={about.paragraphs[0]} />

            <div className="grid gap-8">
              <Reveal className="grid justify-items-start gap-4 text-lg text-muted">
                <p className="max-w-[52ch]">{about.paragraphs[1]}</p>
                {about.personal && <p className="max-w-[52ch]">{about.personal}</p>}
                <a
                  href={profile.resumeUrl ?? "/#contact"}
                  {...(profile.resumeUrl ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="group mt-1 inline-flex min-h-11 items-center gap-2 text-base font-medium text-fg"
                >
                  <span className="border-b border-line-strong pb-0.5 transition-colors duration-200 group-hover:border-accent group-hover:text-accent">
                    {profile.resumeUrl ? "Read my full résumé" : "Ask me for my full résumé"}
                  </span>
                  <ArrowUpRight size={16} className="transition-transform duration-300 ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </a>
              </Reveal>

              {/* Spec sheet: facts as label / value rows */}
              <RevealGroup as="ul" className="grid border-t border-line">
                {about.stats.map((s) => (
                  <RevealItem as="li" key={s.label} className="flex items-baseline justify-between gap-6 border-b border-line py-4">
                    <span className="label">{s.label}</span>
                    <span className="display-x text-3xl tabular-nums">
                      {s.value}
                      {s.suffix}
                    </span>
                  </RevealItem>
                ))}
              </RevealGroup>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
