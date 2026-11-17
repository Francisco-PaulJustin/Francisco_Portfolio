"use client";

import { Box, Cloud, Database, Monitor, Server } from "lucide-react";
import { motion } from "motion/react";
import { stackLayers, toolbelt } from "@/content/site";
import { RevealGroup, RevealItem } from "./motion-kit";
import { SectionHeading } from "./section-heading";

const ICONS = { monitor: Monitor, server: Server, database: Database, box: Box, cloud: Cloud };

/**
 * Skills drawn as a system diagram: the layers a request passes through, from the client to the cloud.
 * On wide screens a connector line draws across the layers and a packet travels along it.
 */
export function Skills() {
  return (
    <section id="skills" className="relative py-28 md:py-40">
      <div className="container-page">
        <SectionHeading
          stage={3}
          eyebrow="Stack"
          title="From the browser to the cloud."
          lede="Every layer a request passes through, and the tools I've used at each one in school and team projects."
        />

        <div>
          {/* Connector rail (wide screens): a node above each layer, a line between them, a packet riding it */}
          <div aria-hidden className="relative mb-5 hidden h-3 lg:block">
            <div className="packet-track absolute inset-x-[10%] top-1/2 h-px -translate-y-1/2">
              <motion.span
                className="absolute inset-0 origin-left bg-line-strong"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true, margin: "0px 0px -15% 0px" }}
                transition={{ duration: 1.2, ease: [0.65, 0, 0.35, 1] }}
              />
              <span className="packet absolute -top-[3px] left-0 block h-[7px] w-10 rounded-full bg-accent shadow-[0_0_14px_rgba(var(--glow),0.8)]" />
            </div>
            <div className="relative grid h-full grid-cols-5 gap-4">
              {stackLayers.map((l) => (
                <span key={l.id} className="mx-auto size-3 rounded-full border-2 border-accent bg-bg" />
              ))}
            </div>
          </div>

          <RevealGroup as="ol" className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {stackLayers.map((layer, i) => {
              const Icon = ICONS[layer.icon];
              return (
                <RevealItem
                  as="li"
                  key={layer.id}
                  className="group grid content-start gap-5 rounded-2xl border border-line bg-surface p-5 transition-[border-color,transform] duration-300 ease-out hover:-translate-y-1 hover:border-accent/50"
                >
                  <div className="flex items-center justify-between">
                    <span className="grid size-11 place-items-center rounded-xl border border-line bg-bg text-accent transition-colors duration-300 group-hover:border-accent/50">
                      <Icon size={20} aria-hidden />
                    </span>
                    <span className="font-mono text-[11px] text-muted">L{i + 1}</span>
                  </div>
                  <div className="grid gap-0.5">
                    <h3 className="display-h text-xl">{layer.title}</h3>
                    <p className="text-sm text-muted">{layer.note}</p>
                  </div>
                  <ul className="grid gap-1.5 border-t border-line pt-4">
                    {layer.items.map((s) => (
                      <li key={s} className="flex items-center gap-2 text-sm">
                        <span aria-hidden className="size-1 rounded-full bg-accent" />
                        {s}
                      </li>
                    ))}
                  </ul>
                </RevealItem>
              );
            })}
          </RevealGroup>
        </div>

        {/* Tools used across every layer */}
        <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3 rounded-2xl border border-dashed border-line-strong px-5 py-4">
          <span className="label">Across every layer</span>
          <ul className="flex flex-wrap gap-2">
            {toolbelt.map((t) => (
              <li key={t} className="rounded-md border border-line px-2.5 py-1 font-mono text-xs">
                {t}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
