"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll, useSpring } from "motion/react";
import { useLenis } from "lenis/react";
import { Menu, Moon, Sun, X } from "lucide-react";
import { profile } from "@/content/site";

// Same order as the sections on the page
const LINKS = [
  { id: "about", label: "About" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "journey", label: "Journey" },
  { id: "contact", label: "Contact" },
];

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
      className="grid size-11 place-items-center rounded-full text-muted transition-colors duration-200 hover:bg-accent-soft hover:text-fg"
    >
      <Sun size={18} className="hidden dark:block" />
      <Moon size={18} className="block dark:hidden" />
    </button>
  );
}

/** Which section is under the middle of the screen (home page only). */
function useActiveSection(enabled: boolean) {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    if (!enabled) return;
    const sections = LINKS.map((l) => document.getElementById(l.id)).filter((el): el is HTMLElement => !!el);
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setActive(e.target.id);
        }
      },
      // a thin band just above the middle of the viewport
      { rootMargin: "-45% 0px -50% 0px" },
    );
    sections.forEach((s) => io.observe(s));
    const onTop = () => {
      if (window.scrollY < 200) setActive(null);
    };
    window.addEventListener("scroll", onTop, { passive: true });
    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onTop);
    };
  }, [enabled]);

  return enabled ? active : null;
}

export function Nav() {
  const pathname = usePathname();
  const active = useActiveSection(pathname === "/");
  const lenis = useLenis();
  const { scrollY, scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);

  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setScrolled(y > 24);
    setHidden(y > prev && y > 160 && !open);
  });

  // While the menu is open: freeze the page behind it, and let Escape close it
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
        // a keyboard user tabbing into a hidden bar brings it back
        onFocusCapture={() => setHidden(false)}
        className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color] duration-300 ${
          scrolled || open ? "border-b border-line bg-bg/75 backdrop-blur-xl" : "border-b border-transparent"
        }`}
      >
        <nav className="container-page flex h-16 items-center justify-between" aria-label="Main">
          <Link
            href="/"
            className="-ml-2 inline-flex h-11 items-center rounded-full px-2 font-display text-lg font-bold tracking-tight"
            aria-label={`${profile.name}, home`}
          >
            {profile.initials}
            <span className="text-accent">.</span>
          </Link>

          <div className="hidden items-center gap-1 md:flex">
            <ul className="flex items-center">
              {LINKS.map((l) => {
                const isActive = active === l.id;
                return (
                  <li key={l.id}>
                    <Link
                      href={`/#${l.id}`}
                      aria-current={isActive ? "location" : undefined}
                      className={`relative inline-flex h-10 items-center rounded-full px-4 text-sm transition-colors duration-200 hover:text-fg ${
                        isActive ? "text-fg" : "text-muted"
                      }`}
                    >
                      {isActive && (
                        <motion.span
                          layoutId="nav-active"
                          className="absolute inset-0 rounded-full bg-accent-soft"
                          transition={{ type: "spring", stiffness: 380, damping: 32 }}
                        />
                      )}
                      <span className="relative">{l.label}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
            <ThemeToggle />
          </div>

          <div className="flex items-center md:hidden">
            <ThemeToggle />
            <button
              ref={menuButton}
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Close menu" : "Open menu"}
              className="-mr-2 grid size-11 place-items-center rounded-full transition-colors duration-200 hover:bg-accent-soft"
            >
              {open ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </nav>
        {/* Reading progress */}
        <motion.div
          aria-hidden
          style={{ scaleX: progress }}
          className="absolute inset-x-0 bottom-0 h-px origin-left bg-accent"
        />
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)", transition: { duration: 0.35, ease: [0.76, 0, 0.24, 1] } }}
            transition={{ duration: 0.55, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-40 overflow-y-auto bg-bg pb-10 pt-24 md:hidden"
          >
            <ul className="container-page grid">
              {LINKS.map((l, i) => (
                <motion.li
                  key={l.id}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.12 + i * 0.05, duration: 0.45 }}
                >
                  <Link
                    href={`/#${l.id}`}
                    onClick={() => setOpen(false)}
                    aria-current={active === l.id ? "location" : undefined}
                    className="flex items-baseline justify-between border-b border-line py-4 font-display text-4xl font-semibold aria-[current]:text-accent"
                  >
                    {l.label}
                    <span className="label">0{i + 1}</span>
                  </Link>
                </motion.li>
              ))}
            </ul>
            <p className="container-page mt-8 text-sm text-muted">{profile.availability}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
