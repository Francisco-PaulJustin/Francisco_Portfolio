"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll, useSpring } from "motion/react";
import { useLenis } from "lenis/react";
import { Menu, Moon, Sun, X } from "lucide-react";
import { profile } from "@/content/site";

// The page's stages, in order. Numbers are real: this is the reading order.
export const STAGES = [
  { id: "top", label: "Boot", nav: false },
  { id: "about", label: "About", nav: true },
  { id: "projects", label: "Projects", nav: true },
  { id: "skills", label: "Stack", nav: true },
  { id: "journey", label: "Journey", nav: true },
  { id: "contact", label: "Contact", nav: true },
];
const LINKS = STAGES.filter((s) => s.nav);
const pad = (n: number) => String(n).padStart(2, "0");

function ThemeToggle() {
  // The theme lives on <html data-theme>; CSS picks the icon, so no React state is needed
  function toggle() {
    const root = document.documentElement;
    const next = root.dataset.theme === "light" ? "dark" : "light";
    root.dataset.theme = next;
    try {
      localStorage.setItem("theme", next);
    } catch {}
  }
  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Toggle light and dark theme"
      className="grid size-10 place-items-center rounded-full border border-line text-muted transition-colors duration-200 hover:border-line-strong hover:text-fg"
    >
      <Sun size={16} className="hidden dark:block" />
      <Moon size={16} className="block dark:hidden" />
    </button>
  );
}

/** Which stage is under the middle of the screen (home page only). */
function useActiveStage(enabled: boolean) {
  const [active, setActive] = useState<string | null>(null);
  useEffect(() => {
    if (!enabled) return;
    const els = STAGES.map((s) => (s.id === "top" ? document.querySelector("main section") : document.getElementById(s.id)))
      .filter((el): el is HTMLElement => !!el);
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(e.target.id || "top");
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [enabled]);
  return enabled ? active : null;
}

export function Nav() {
  const pathname = usePathname();
  const active = useActiveStage(pathname === "/");
  const lenis = useLenis();
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);

  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setScrolled(y > 24);
    setHidden(y > prev && y > 200 && !open);
  });

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    lenis?.stop();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        menuButton.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      lenis?.start();
      window.removeEventListener("keydown", onKey);
    };
  }, [open, lenis]);

  return (
    <>
      <motion.header
        animate={{ y: hidden ? "-110%" : "0%" }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        onFocusCapture={() => setHidden(false)}
        className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color] duration-300 ${
          scrolled || open ? "border-b border-line bg-bg/85 backdrop-blur-md" : "border-b border-transparent"
        }`}
      >
        <nav className="container-page flex h-16 items-center justify-between gap-6" aria-label="Main">
          <Link href="/" className="group -ml-1 inline-flex h-11 items-center gap-3 px-1" aria-label={`${profile.name}, home`}>
            <span className="grid size-8 place-items-center rounded-md bg-fg font-mono text-[11px] font-semibold text-bg transition-colors duration-200 group-hover:bg-accent group-hover:text-accent-fg">
              {profile.initials}
            </span>
            <span className="hidden font-display text-sm font-semibold tracking-tight [font-stretch:112%] sm:block">
              {profile.name}
            </span>
          </Link>

          <div className="hidden items-center gap-6 lg:flex">
            <ul className="flex items-center gap-1">
              {LINKS.map((l) => {
                const i = STAGES.indexOf(l);
                const isActive = active === l.id;
                return (
                  <li key={l.id}>
                    <Link
                      href={`/#${l.id}`}
                      aria-current={isActive ? "location" : undefined}
                      className={`group inline-flex h-10 items-center gap-1.5 rounded-full px-3 text-sm transition-colors duration-200 hover:text-fg ${
                        isActive ? "text-fg" : "text-muted"
                      }`}
                    >
                      <span className={`font-mono text-[10px] transition-colors ${isActive ? "text-accent" : "text-muted/70"}`}>
                        {pad(i)}
                      </span>
                      {l.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
            <span className="inline-flex items-center gap-2 rounded-full border border-line px-3 py-1.5 font-mono text-[11px] text-muted">
              <span className="pulse-dot size-1.5 rounded-full bg-ok" />
              {profile.availability}
            </span>
            <ThemeToggle />
          </div>

          <div className="flex items-center gap-2 lg:hidden">
            <ThemeToggle />
            <button
              ref={menuButton}
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Close menu" : "Open menu"}
              className="grid size-10 place-items-center rounded-full border border-line transition-colors duration-200 hover:border-line-strong"
            >
              {open ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </nav>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12, transition: { duration: 0.2 } }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-40 overflow-y-auto bg-bg pb-10 pt-24 lg:hidden"
          >
            <ul className="container-page grid">
              {LINKS.map((l, i) => (
                <motion.li
                  key={l.id}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.06 + i * 0.05, duration: 0.4 }}
                >
                  <Link
                    href={`/#${l.id}`}
                    onClick={() => setOpen(false)}
                    className="flex items-baseline gap-4 border-b border-line py-5"
                  >
                    <span className="font-mono text-xs text-accent">{pad(STAGES.indexOf(l))}</span>
                    <span className="display-h text-4xl">{l.label}</span>
                  </Link>
                </motion.li>
              ))}
            </ul>
            <p className="container-page mt-8 inline-flex items-center gap-2 font-mono text-xs text-muted">
              <span className="size-1.5 rounded-full bg-ok" /> {profile.availability}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

/**
 * Pipeline progress rail (large screens, home page): a line that fills as you scroll,
 * with a node per stage. Nodes link to their stage.
 */
export function StageRail() {
  const pathname = usePathname();
  const active = useActiveStage(pathname === "/");
  const { scrollYProgress } = useScroll();
  const fill = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });
  if (pathname !== "/") return null;
  const activeIndex = STAGES.findIndex((s) => s.id === active);

  return (
    <nav
      aria-label="Page progress"
      className="fixed left-5 top-1/2 z-40 hidden -translate-y-1/2 2xl:block"
    >
      <div className="relative flex flex-col items-center gap-7 py-1">
        <span aria-hidden className="absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-line" />
        <motion.span
          aria-hidden
          style={{ scaleY: fill }}
          className="absolute inset-y-0 left-1/2 w-px origin-top -translate-x-1/2 bg-accent"
        />
        {STAGES.map((s, i) => {
          const done = activeIndex > i;
          const current = activeIndex === i;
          return (
            <a
              key={s.id}
              href={s.id === "top" ? "#top" : `#${s.id}`}
              aria-label={`${pad(i)} ${s.label}`}
              aria-current={current ? "location" : undefined}
              className="group relative grid size-5 place-items-center"
            >
              <span
                className={`block size-2.5 rounded-full border transition-[background-color,border-color,transform] duration-300 ${
                  current
                    ? "scale-125 border-accent bg-accent"
                    : done
                      ? "border-accent bg-bg"
                      : "border-line-strong bg-bg"
                }`}
              />
              <span className="pointer-events-none absolute left-7 whitespace-nowrap rounded-md border border-line bg-surface px-2 py-1 font-mono text-[11px] text-muted opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100">
                {pad(i)} {s.label}
              </span>
            </a>
          );
        })}
      </div>
    </nav>
  );
}
