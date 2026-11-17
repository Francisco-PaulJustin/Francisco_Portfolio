"use client";

import { motion } from "motion/react";

const LINES: { kind: "cmd" | "out" | "ok" | "ready"; text: string }[] = [
  { kind: "cmd", text: "git push origin main" },
  { kind: "out", text: "Enumerating objects… done" },
  { kind: "cmd", text: "docker build -t clinic-api ." },
  { kind: "ok", text: "image built" },
  { kind: "cmd", text: "docker push …ecr…/clinic-api" },
  { kind: "ok", text: "pushed to Amazon ECR" },
  { kind: "cmd", text: "aws ecs update-service …" },
  { kind: "ok", text: "service updated · 3/3 tasks running" },
  { kind: "ready", text: "ready for OJT" },
];

/** A deploy log that plays line by line: the hero's signature detail. Decorative. */
export function Terminal({ startDelay = 1.5 }: { startDelay?: number }) {
  return (
    <div
      aria-hidden
      className="relative overflow-hidden rounded-2xl border border-line bg-surface/70 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.45)] backdrop-blur-xl"
    >
      <div className="flex items-center gap-2 border-b border-line px-4 py-3">
        <span className="size-2.5 rounded-full bg-[#ff5f57]" />
        <span className="size-2.5 rounded-full bg-[#febc2e]" />
        <span className="size-2.5 rounded-full bg-[#28c840]" />
        <span className="ml-3 font-mono text-xs text-muted">deploy.log — zsh</span>
      </div>
      <div className="grid gap-1.5 p-5 font-mono text-[13px] leading-relaxed">
        {LINES.map((l, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: startDelay + i * 0.26, duration: 0.35, ease: "easeOut" }}
            className="truncate"
          >
            {l.kind === "cmd" && (
              <>
                <span className="text-accent">~ $</span> <span className="text-fg">{l.text}</span>
              </>
            )}
            {l.kind === "out" && <span className="pl-4 text-muted">{l.text}</span>}
            {l.kind === "ok" && (
              <span className="pl-4 text-muted">
                <span className="text-ok">✓</span> {l.text}
              </span>
            )}
            {l.kind === "ready" && (
              <span className="mt-2 inline-flex items-center gap-2 text-ok">
                <span className="size-2 rounded-full bg-ok" /> {l.text}
                <span className="caret ml-0.5 inline-block h-4 w-2 translate-y-0.5 bg-fg" />
              </span>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
