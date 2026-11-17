"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import { ArrowDownRight, Download, FileText } from "lucide-react";
import { profile } from "@/content/site";
import { Magnetic } from "./motion-kit";
import { Terminal } from "./terminal";

const EXPO = [0.16, 1, 0.3, 1] as const;

// The film-style opening plays once per page load, not every time you come back to the home page
let introPlayed = false;

function RotatingRole() {
  const [i, setI] = useState(0);
  const reduce = useReducedMotion();
  useEffect(() => {
    if (reduce) return;
    const id = setInterval(() => setI((v) => (v + 1) % profile.roles.length), 3200);
    return () => clearInterval(id);
  }, [reduce]);

  return (
    <span className="relative inline-flex h-[1.3em] overflow-hidden align-bottom">
      <span className="sr-only">{profile.roles.join(", ")}</span>
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={profile.roles[i]}
          aria-hidden
          initial={{ y: "110%" }}
          animate={{ y: "0%" }}
          exit={{ y: "-110%" }}
          transition={{ duration: 0.7, ease: EXPO }}
          className="inline-block whitespace-nowrap text-accent"
        >
          {profile.roles[i]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

function MaskWord({ children, delay }: { children: React.ReactNode; delay: number }) {
  return (
    <span className="inline-block overflow-hidden pb-[0.08em] align-bottom">
      <motion.span
        className="text-cinema inline-block"
        initial={{ y: "105%" }}
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
  const [intro] = useState(() => !introPlayed);
  // The bars are removed once they have opened, so they can never replay when you return to this page
  const [barsOpen, setBarsOpen] = useState(false);
  useEffect(() => {
    introPlayed = true;
  }, []);

  // With the intro: start as the letterbox opens. Without: come in almost at once.
  const t0 = intro && !reduce ? 0.35 : 0.1;

  // Scroll-out: content drifts up, shrinks slightly and fades — like a camera pulling away
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const contentScale = useTransform(scrollYProgress, [0, 1], [1, 0.94]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);
  const cueOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
  const bgY = useTransform(scrollYProgress, [0, 1], [0, 160]);

  // Cursor spotlight (mouse only). It is one layer that slides with transforms,
  // so following the mouse never repaints the hero background.
  const mx = useMotionValue(720);
  const my = useMotionValue(360);
  const sx = useSpring(mx, { stiffness: 60, damping: 20 });
  const sy = useSpring(my, { stiffness: 60, damping: 20 });

  function onMove(e: React.PointerEvent<HTMLElement>) {
    if (reduce || e.pointerType !== "mouse" || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    mx.set(e.clientX - r.left);
    my.set(e.clientY - r.top);
  }

  const lines = [profile.firstName.split(" "), [profile.lastName]];
  let w = 0;

  return (
    <section
      ref={ref}
      onPointerMove={onMove}
      className="relative isolate flex min-h-[min(100svh,52rem)] items-end overflow-hidden pb-16 pt-32 md:pb-24 lg:min-h-[100svh]"
    >
      {/* Background: grid, two soft lights, cursor spotlight. Moves slower than the content. */}
      <motion.div
        aria-hidden
        style={reduce ? undefined : { y: bgY }}
        className="absolute inset-0 -z-10 [mask-image:linear-gradient(180deg,black_65%,transparent)]"
      >
        <div className="bg-grid absolute inset-0 [mask-image:radial-gradient(ellipse_at_50%_40%,black_20%,transparent_75%)]" />
        <div className="glow drift -left-[20vmax] -top-[18vmax] [--glow-a:0.22]" />
        <div className="glow drift -bottom-[34vmax] -right-[24vmax] [--glow-a:0.14]" data-slow="true" />
        <motion.div
          className="absolute left-0 top-0 -ml-[560px] -mt-[560px] size-[1120px] rounded-full bg-[radial-gradient(closest-side,var(--accent-soft),transparent)]"
          style={{ x: sx, y: sy }}
        />
      </motion.div>

      {/* Letterbox intro: two bars part like a film opening (CSS-driven, see globals.css) */}
      {intro && !barsOpen && (
        <>
          <div aria-hidden className="letterbox" data-edge="top" onAnimationEnd={() => setBarsOpen(true)} />
          <div aria-hidden className="letterbox" data-edge="bottom" />
        </>
      )}

      <motion.div
        style={reduce ? undefined : { y: contentY, scale: contentScale, opacity: contentOpacity }}
        className="container-page grid w-full origin-bottom items-end gap-12 lg:grid-cols-12 lg:gap-6"
      >
        <div className="lg:col-span-8">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: t0 + 0.25, duration: 0.8 }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-line bg-surface/60 px-3 py-1.5 font-mono text-xs text-muted backdrop-blur"
          >
            <span className="pulse-dot size-2 rounded-full bg-ok" />
            {profile.availability}
          </motion.p>

          <h1 className="text-[clamp(3.25rem,10.5vw,8.75rem)] font-bold leading-[0.92] tracking-[-0.045em]">
            {lines.map((line, li) => (
              <span key={li} className="block">
                {line.map((word) => {
                  const d = t0 + 0.2 + w++ * 0.09;
                  return (
                    <span key={word} className="mr-[0.22em] last:mr-0">
                      <MaskWord delay={d}>
                        {word}
                        {li === lines.length - 1 && <span className="text-accent">.</span>}
                      </MaskWord>
                    </span>
                  );
                })}
              </span>
            ))}
          </h1>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: t0 + 0.7, duration: 0.9, ease: EXPO }}
            className="mt-8 grid max-w-[38rem] gap-6"
          >
            <p className="font-display text-[clamp(1.25rem,2.2vw,1.75rem)] font-medium leading-snug">
              <RotatingRole />
            </p>
            <p className="text-lg text-muted">{profile.intro}</p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Magnetic>
                <Link
                  href="/#projects"
                  className="group inline-flex h-12 items-center gap-2 rounded-full bg-fg px-6 font-medium text-bg transition-[transform,box-shadow] duration-200 hover:shadow-[0_8px_30px_-6px_rgba(var(--glow),0.55)] active:scale-[0.97]"
                >
                  View projects
                  <ArrowDownRight
                    size={18}
                    className="transition-transform duration-300 ease-out group-hover:-rotate-45"
                  />
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
        </div>

        {/* The deploy log needs room: wide screens only */}
        <motion.div
          initial={{ opacity: 0, y: 40, rotateX: 12 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{ delay: t0 + 0.5, duration: 1.1, ease: EXPO }}
          className="hidden [perspective:1200px] lg:col-span-4 lg:block"
        >
          <Terminal startDelay={t0 + 1.1} />
        </motion.div>
      </motion.div>

      {/* Scroll cue */}
      <motion.div
        aria-hidden
        style={{ opacity: cueOpacity }}
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 lg:flex"
      >
        <span className="label text-[10px]">Scroll</span>
        <span className="relative h-10 w-px overflow-hidden bg-line">
          <motion.span
            className="absolute inset-x-0 top-0 h-1/2 bg-fg"
            animate={reduce ? undefined : { y: ["-100%", "200%"] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: [0.65, 0, 0.35, 1] }}
          />
        </span>
      </motion.div>
    </section>
  );
}
