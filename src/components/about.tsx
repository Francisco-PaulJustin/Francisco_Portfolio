"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { about, profile } from "@/content/site";
import { CountUp, Reveal, RevealGroup, RevealItem } from "./motion-kit";
import { Blank } from "./blank";

function Word({
  children,
  progress,
  range,
}: {
  children: string;
  progress: MotionValue<number>;
  range: [number, number];
}) {
  const opacity = useTransform(progress, range, [0.16, 1]);
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
    <p
      ref={ref}
      className="font-display text-[clamp(1.6rem,3.6vw,3rem)] font-medium leading-[1.2] tracking-[-0.02em]"
    >
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
  const y = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);
  const clip = useTransform(scrollYProgress, [0, 0.35], ["inset(18% 18% 18% 18% round 24px)", "inset(0% 0% 0% 0% round 24px)"]);

  return (
    <motion.div
      ref={ref}
      style={{ clipPath: clip }}
      className="relative aspect-[4/5] w-full overflow-hidden rounded-3xl border border-line bg-surface"
    >
      {profile.photo ? (
        <motion.div style={{ y }} className="absolute inset-[-10%]">
          <Image
            src={profile.photo}
            alt={`Portrait of ${profile.name}`}
            fill
            sizes="(min-width: 768px) 33vw, 100vw"
            className="object-cover"
          />
        </motion.div>
      ) : (
        <div className="bg-grid absolute inset-0 grid place-items-center">
          <span className="font-display text-7xl font-bold text-line">{profile.initials}</span>
          <Blank className="absolute bottom-4 left-4">headshot → public/images/profile.jpg</Blank>
        </div>
      )}
    </motion.div>
  );
}

export function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="relative isolate py-28 md:py-40">
      <div aria-hidden className="glow -left-[30vmax] top-[10%] [--glow-a:0.07]" />
      <div className="container-page grid gap-16 md:gap-24">
        <div className="grid gap-6 md:grid-cols-12">
          <h2 id="about-title" className="label md:col-span-3 md:pt-4">
            About <span className="sr-only">{profile.name}</span>
          </h2>
          <div className="md:col-span-9">
            <ScrubStatement text={about.paragraphs[0]} />
          </div>
        </div>

        {/* Paragraph aligns to the top of the portrait, stats to its bottom */}
        <div className="grid gap-12 md:grid-cols-12 md:gap-6">
          <div className="md:col-span-4">
            <Portrait />
          </div>
          <div className="flex flex-col justify-between gap-10 md:col-span-7 md:col-start-6">
            <Reveal className="grid justify-items-start gap-4 text-lg text-muted md:text-xl">
              <p className="max-w-[48ch]">{about.paragraphs[1]}</p>
              {about.personal ? (
                <p className="max-w-[48ch]">{about.personal}</p>
              ) : (
                <Blank>optional personal line (e.g. PLP Taekwondo Team)</Blank>
              )}
              <a
                href={profile.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group mt-2 inline-flex min-h-11 items-center gap-2 text-base font-medium text-fg"
              >
                <span className="border-b border-line-strong pb-0.5 transition-colors duration-200 group-hover:border-accent group-hover:text-accent">
                  Read my full résumé
                </span>
                <ArrowUpRight
                  size={16}
                  className="transition-transform duration-300 ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </a>
            </Reveal>
            <RevealGroup as="ul" className="grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-3">
              {about.stats.map((s) => (
                <RevealItem as="li" key={s.label} className="grid gap-1 bg-bg p-6">
                  <span className="font-display text-5xl font-semibold tracking-tight">
                    <CountUp to={s.value} suffix={s.suffix} />
                  </span>
                  <span className="text-sm text-muted">{s.label}</span>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </div>
      </div>
    </section>
  );
}
