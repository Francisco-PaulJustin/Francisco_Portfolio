/**
 * Marks content that still needs your input.
 * Visible only while developing (`npm run dev`); renders nothing on the live site.
 */
import { PencilLine } from "lucide-react";

export function Blank({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  if (process.env.NODE_ENV === "production") return null;
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-md border border-dashed border-accent bg-accent-soft px-2 py-1 font-mono text-xs text-accent ${className}`}
    >
      <PencilLine size={13} aria-hidden className="shrink-0" /> Fill in: {children}
    </span>
  );
}
