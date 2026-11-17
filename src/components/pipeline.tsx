"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { Check } from "lucide-react";

const STEPS = [
  { name: "Build", detail: "next build" },
  { name: "Test", detail: "lint · types" },
  { name: "Containerize", detail: "docker build" },
  { name: "Push", detail: "amazon ecr" },
  { name: "Deploy", detail: "amazon ecs" },
];

/**
 * The hero's signature detail: a CI/CD run that plays through once on load and ends "live".
 * Decorative (aria-hidden): the same facts are in the text around it.
 */
export function Pipeline({ startDelay = 0.8 }: { startDelay?: number }) {
  const reduce = useReducedMotion();
  // how many steps are finished; the next one is "running". With reduced motion, show the finished run.
  const [progress, setProgress] = useState(0);
  const done = reduce ? STEPS.length : progress;

  useEffect(() => {
    if (reduce) return;
    const timers: ReturnType<typeof setTimeout>[] = [];
    STEPS.forEach((_, i) => {
      timers.push(setTimeout(() => setProgress(i + 1), (startDelay + 0.55 + i * 0.6) * 1000));
    });
    return () => timers.forEach(clearTimeout);
  }, [reduce, startDelay]);

  const live = done === STEPS.length;

  return (
    <div aria-hidden className="overflow-hidden rounded-2xl border border-line bg-surface">
      <div className="flex items-center justify-between gap-4 border-b border-line px-5 py-3.5">
        <span className="font-mono text-xs text-muted">
          deploy <span className="text-fg">portfolio</span> @ main
        </span>
        <span
          className={`inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 font-mono text-[11px] transition-colors duration-300 ${
            live ? "bg-ok/15 text-ok" : "bg-accent-soft text-accent"
          }`}
        >
          <span className={`size-1.5 rounded-full ${live ? "bg-ok" : "bg-accent"}`} />
          {live ? "live" : "running"}
        </span>
      </div>

      <ol className="grid gap-px bg-line">
        {STEPS.map((s, i) => {
          const state = i < done ? "done" : i === done ? "running" : "queued";
          return (
            <li key={s.name} className="flex items-center gap-4 bg-surface px-5 py-3">
              <span className="relative grid size-5 shrink-0 place-items-center">
                {state === "done" && (
                  <motion.span
                    initial={{ scale: 0.4, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 500, damping: 26 }}
                    className="grid size-5 place-items-center rounded-full bg-ok text-bg"
                  >
                    <Check size={12} strokeWidth={3} />
                  </motion.span>
                )}
                {state === "running" && (
                  <span className="spin size-4 rounded-full border-2 border-accent border-t-transparent" />
                )}
                {state === "queued" && <span className="size-3 rounded-full border border-line-strong" />}
              </span>
              <span className={`text-sm font-medium transition-colors ${state === "queued" ? "text-muted" : "text-fg"}`}>
                {s.name}
              </span>
              <span className="ml-auto font-mono text-xs text-muted">{s.detail}</span>
            </li>
          );
        })}
      </ol>

      <div className="border-t border-line px-5 py-4">
        <div className="h-1 overflow-hidden rounded-full bg-line">
          <motion.div
            className={`h-full origin-left rounded-full transition-colors duration-500 ${live ? "bg-ok" : "bg-accent"}`}
            initial={false}
            animate={{ scaleX: done / STEPS.length }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          />
        </div>
        <p className="mt-3 font-mono text-xs text-muted">
          {live ? (
            <>
              <span className="text-ok">●</span> deployed · ready for OJT
            </>
          ) : (
            <>
              step {Math.min(done + 1, STEPS.length)} of {STEPS.length}
            </>
          )}
        </p>
      </div>
    </div>
  );
}
