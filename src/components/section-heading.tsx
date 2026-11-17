import { Reveal } from "./motion-kit";

/**
 * Stage header: a mono stage number + name on a rule, then the headline.
 * `stage` is the section's position in the page (see STAGES in nav.tsx).
 */
export function SectionHeading({
  stage,
  eyebrow,
  title,
  lede,
  id,
}: {
  stage: number;
  eyebrow: string;
  title: string;
  lede?: string;
  id?: string;
}) {
  return (
    <Reveal className="mb-14 grid gap-8 md:mb-20">
      <div className="flex items-center gap-4">
        <span className="font-mono text-xs text-accent">{String(stage).padStart(2, "0")}</span>
        <span className="label">{eyebrow}</span>
        <span aria-hidden className="h-px flex-1 bg-line" />
      </div>
      <div className="grid gap-5 md:grid-cols-12 md:gap-6">
        <h2 id={id} className="display-h text-[clamp(2.1rem,4.6vw,3.75rem)] md:col-span-8">
          {title}
        </h2>
        {lede && <p className="max-w-[44ch] self-end text-lg text-muted md:col-span-4">{lede}</p>}
      </div>
    </Reveal>
  );
}
