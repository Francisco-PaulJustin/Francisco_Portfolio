import { Reveal } from "./motion-kit";

export function SectionHeading({
  eyebrow,
  title,
  lede,
}: {
  eyebrow: string;
  title: string;
  lede?: string;
}) {
  return (
    <Reveal className="mb-12 grid gap-4 md:mb-16 md:grid-cols-12 md:gap-6">
      <p className="label md:col-span-3 md:pt-3">{eyebrow}</p>
      <div className="grid gap-4 md:col-span-9">
        <h2 className="text-cinema text-[clamp(2rem,4.5vw,3.5rem)] font-semibold leading-[1.05] tracking-[-0.03em]">{title}</h2>
        {lede && <p className="max-w-[60ch] text-lg text-muted">{lede}</p>}
      </div>
    </Reveal>
  );
}
