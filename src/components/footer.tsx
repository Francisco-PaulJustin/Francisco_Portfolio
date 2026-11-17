"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { ArrowUp } from "lucide-react";
import { profile } from "@/content/site";

export function Footer() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end end"] });
  const y = useTransform(scrollYProgress, [0, 1], ["40%", "0%"]);
  const opacity = useTransform(scrollYProgress, [0, 1], [0.2, 1]);

  return (
    <footer ref={ref} className="relative overflow-hidden border-t border-line pt-16">
      <div className="container-page flex flex-wrap items-center justify-between gap-4 text-sm text-muted">
        <p>© 2026 {profile.name}</p>
        <p>Built with Next.js and Motion · Hosted on Vercel</p>
        <a href="#top" className="group inline-flex min-h-11 items-center gap-2 transition-colors duration-200 hover:text-fg">
          Back to top <ArrowUp size={15} className="transition-transform duration-300 ease-out group-hover:-translate-y-1" />
        </a>
      </div>
      <motion.p
        aria-hidden
        style={{ y, opacity }}
        className="text-outline mt-10 select-none whitespace-nowrap text-center font-display text-[17vw] font-bold leading-[0.8] tracking-[-0.05em]"
      >
        {profile.lastName}
      </motion.p>
    </footer>
  );
}
