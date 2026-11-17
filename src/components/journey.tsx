"use client";

import { ArrowUpRight } from "lucide-react";
import { journey } from "@/content/site";
import { RevealGroup, RevealItem } from "./motion-kit";
import { SectionHeading } from "./section-heading";

/** Education and certification as a release log: newest first, one row per entry. */
export function Journey() {
  return (
    <section id="journey" className="relative py-28 md:py-40">
      <div className="container-page">
        <SectionHeading stage={4} eyebrow="Journey" title="Education and certification." />

        <RevealGroup as="ol" className="border-t border-line">
          {journey.map((j, i) => (
            <RevealItem
              as="li"
              key={j.title}
              className="group grid gap-3 border-b border-line py-8 transition-colors duration-300 hover:bg-raised md:grid-cols-12 md:gap-6 md:px-4"
            >
              <div className="flex items-center gap-3 md:col-span-3 md:flex-col md:items-start md:gap-1">
                <span className="font-mono text-sm text-accent">{j.when}</span>
                <span className="label">{j.kind}</span>
              </div>
              <div className="grid gap-2 md:col-span-7">
                <h3 className="display-h text-2xl md:text-[1.75rem]">{j.title}</h3>
                <p className="text-muted">{j.where}</p>
                {j.detail && <p className="max-w-[60ch] text-muted">{j.detail}</p>}
                {j.link && (
                  <a
                    href={j.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-11 w-fit items-center gap-1 text-sm font-medium text-accent hover:underline"
                  >
                    View credential <ArrowUpRight size={14} aria-hidden />
                  </a>
                )}
              </div>
              <span aria-hidden className="hidden text-right font-mono text-xs text-muted md:col-span-2 md:block">
                {i === 0 ? "latest" : ""}
              </span>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
