"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { ArrowDownRight, Download, FileText, MapPin } from "lucide-react";
import { profile } from "@/content/site";
import { Magnetic } from "./motion-kit";
import { Pipeline } from "./pipeline";

const EXPO = [0.16, 1, 0.3, 1] as const;

// The boot bar plays once per page load, not every time you come back to the home page
let booted = false;

function RotatingRole() {
  const [i, setI] = useState(0);
  const reduce = useReducedMotion();
  useEffect(() => {
    if (reduce) return;
    const id = setInterval(() => setI((v) => (v + 1) % profile.roles.length), 3000);
    return () => clearInterval(id);
  }, [reduce]);

  return (
    <span className="relative inline-flex h-[1.4em] overflow-hidden align-bottom">
      <span className="sr-only">{profile.roles.join(", ")}</span>
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={profile.roles[i]}
          aria-hidden
          initial={{ y: "110%" }}
          animate={{ y: "0%" }}
          exit={{ y: "-110%" }}
          transition={{ duration: 0.6, ease: EXPO }}
          className="inline-block whitespace-nowrap text-accent"
        >
          {profile.roles[i]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

/** One line of the name, wiped up from behind a clip edge */
function Line({ children, delay }: { children: React.ReactNode; delay: number }) {
  return (
    <span className="block overflow-hidden pb-[0.06em]">
      <motion.span
        className="block"
        initial={{ y: "100%" }}
        animate={{ y: "0%" }}
        transition={{ duration: 0.9, ease: EXPO, delay }}
      >
        {children}
      </motion.span>
    </span>
  );
}

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const [boot] = useState(() => !booted);
  useEffect(() => {
    booted = true;
  }, []);
  const t0 = boot && !reduce ? 0.25 : 0.05;

  // Scroll-out: the content drifts up and fades (no scale: resizing huge type redraws it every frame)
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const bgY = useTransform(scrollYProgress, [0, 1], [0, 140]);

  return (
    <section
      ref={ref}
      aria-labelledby="hero-title"
      className="relative isolate flex min-h-[min(100svh,56rem)] flex-col justify-end overflow-hidden pb-14 pt-28 md:pb-20 lg:min-h-svh"
    >
      {boot && <div aria-hidden className="boot-bar" />}

      {/* Background: grid + one warm light, fading into the page. Plain overlays, no masks. */}
      <motion.div aria-hidden style={reduce ? undefined : { y: bgY }} className="absolute inset-0 -z-10">
        <div className="bg-grid absolute inset-0" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_35%,transparent_10%,var(--bg)_70%)]" />
        <div className="glow right-[-20vmax] top-[-25vmax] [--glow-a:0.16]" />
      </motion.div>
      <div aria-hidden className="absolute inset-x-0 bottom-0 -z-10 h-1/3 bg-[linear-gradient(180deg,transparent,var(--bg))]" />

      <motion.div style={reduce ? undefined : { y, opacity }} className="container-page w-full">
        {/* Stage line */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: t0, duration: 0.6 }}
          className="mb-8 flex items-center gap-4"
        >
          <span className="font-mono text-xs text-accent">00</span>
          <span className="label">Boot</span>
          <span aria-hidden className="h-px flex-1 bg-line" />
          <span className="label hidden items-center gap-1.5 sm:inline-flex">
            <MapPin size={13} aria-hidden /> {profile.location}
          </span>
        </motion.div>

        <h1 id="hero-title" className="display-x text-[clamp(2.6rem,8vw,7.75rem)]">
          <Line delay={t0 + 0.1}>{profile.firstName}</Line>
          <Line delay={t0 + 0.2}>
            {profile.lastName}
            <span className="text-accent">.</span>
          </Line>
        </h1>

        <div className="mt-12 grid gap-12 border-t border-line pt-10 lg:grid-cols-12 lg:gap-6">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: t0 + 0.45, duration: 0.8, ease: EXPO }}
            className="grid content-start gap-6 lg:col-span-6"
          >
            <p className="font-display text-[clamp(1.25rem,2vw,1.6rem)] font-semibold [font-stretch:112%]">
              <RotatingRole />
            </p>
            <p className="max-w-[46ch] text-lg text-muted">{profile.intro}</p>
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <Magnetic>
                <Link
                  href="/#projects"
                  className="group inline-flex h-12 items-center gap-2 rounded-full bg-accent px-6 font-medium text-accent-fg transition-[transform,box-shadow] duration-200 hover:shadow-[0_10px_30px_-8px_rgba(var(--glow),0.6)] active:scale-[0.97]"
                >
                  View projects
                  <ArrowDownRight size={18} className="transition-transform duration-300 ease-out group-hover:-rotate-45" />
                </Link>
              </Magnetic>
              <Magnetic>
                {profile.resumeUrl ? (
                  <a
                    href={profile.resumeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-12 items-center gap-2 rounded-full border border-line-strong px-6 font-medium transition-[transform,border-color,background-color] duration-200 hover:border-fg hover:bg-fg/5 active:scale-[0.97]"
                  >
                    <Download size={18} />
                    Download résumé
                    <span className="sr-only"> (PDF, opens in a new tab)</span>
                  </a>
                ) : (
                  <Link
                    href="/#contact"
                    className="inline-flex h-12 items-center gap-2 rounded-full border border-line-strong px-6 font-medium transition-[transform,border-color,background-color] duration-200 hover:border-fg hover:bg-fg/5 active:scale-[0.97]"
                  >
                    <FileText size={18} />
                    Résumé on request
                  </Link>
                )}
              </Magnetic>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: t0 + 0.55, duration: 0.9, ease: EXPO }}
            className="lg:col-span-5 lg:col-start-8"
          >
            <Pipeline startDelay={t0 + 0.5} />
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
