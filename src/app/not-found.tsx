import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <section className="container-page grid min-h-[80svh] content-center gap-6 py-32">
      <p className="label">Error 404</p>
      <h1 className="text-[clamp(3rem,10vw,8rem)] font-bold leading-[0.9] tracking-[-0.04em]">
        Page not found<span className="text-accent">.</span>
      </h1>
      <p className="max-w-[44ch] text-lg text-muted">
        The page you’re looking for doesn’t exist or was moved.
      </p>
      <Link
        href="/"
        className="inline-flex h-12 w-fit items-center gap-2 rounded-full bg-fg px-6 font-medium text-bg transition-transform duration-200 active:scale-[0.97]"
      >
        <ArrowLeft size={18} /> Back home
      </Link>
    </section>
  );
}
