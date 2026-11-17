"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { ArrowUp } from "lucide-react";
import { profile } from "@/content/site";

// Vercel sets this at build time; it shows which commit is live (a small developer touch)
const build = process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA?.slice(0, 7);

export function Footer({ version }: { version: string }) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end end"] });
  const y = useTransform(scrollYProgress, [0, 1], ["35%", "0%"]);

  return (
    <footer ref={ref} className="relative overflow-hidden border-t border-line pt-10">
      <div className="container-page flex flex-wrap items-center justify-between gap-x-8 gap-y-3 font-mono text-xs text-muted">
        <p>© 2026 {profile.name}</p>
        <p className="inline-flex items-center gap-2">
          <span className="size-1.5 rounded-full bg-ok" />
          v{version} · Built with Next.js · Deployed on Vercel{build ? ` · build ${build}` : ""}
        </p>
        <a href="#top" className="group inline-flex min-h-11 items-center gap-2 transition-colors duration-200 hover:text-fg">
          Back to top <ArrowUp size={14} className="transition-transform duration-300 ease-out group-hover:-translate-y-1" />
        </a>
      </div>
      <motion.p
        aria-hidden
        style={reduce ? undefined : { y }}
        className="display-x text-outline mt-6 select-none whitespace-nowrap text-center text-[12.4vw] leading-[0.78]"
      >
        {profile.lastName}
      </motion.p>
    </footer>
  );
}
