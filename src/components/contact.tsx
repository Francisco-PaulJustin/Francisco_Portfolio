"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRight, Check, Copy, Loader2, Mail, MapPin, Send } from "lucide-react";
import { formspreeId, profile } from "@/content/site";
import { GitHubIcon, LinkedInIcon } from "./icons";
import { Magnetic, Reveal } from "./motion-kit";
import { Blank } from "./blank";

function CopyEmail() {
  const [copied, setCopied] = useState(false);
  async function copy() {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      window.location.href = `mailto:${profile.email}`;
    }
  }
  return (
    <Magnetic strength={0.2} className="inline-block max-w-full">
      <button
        type="button"
        onClick={copy}
        aria-label={`Copy email address ${profile.email}`}
        className="group inline-flex min-h-12 max-w-full items-center gap-3 rounded-full border border-line-strong bg-surface py-2 pl-5 pr-2 text-left transition-[border-color,transform] duration-200 hover:border-accent active:scale-[0.98]"
      >
        <span className="truncate font-mono text-sm sm:text-base">{profile.email}</span>
        <span className="inline-flex h-9 shrink-0 items-center gap-1.5 rounded-full bg-accent px-3 text-sm font-medium text-accent-fg">
          {copied ? <Check size={15} aria-hidden /> : <Copy size={14} aria-hidden />}
          <span aria-live="polite">{copied ? "Copied" : "Copy"}</span>
        </span>
      </button>
    </Magnetic>
  );
}

type Status = "idle" | "sending" | "sent" | "error";
type FieldName = "name" | "email" | "message";

const FIELDS: { name: FieldName; label: string; hint?: string }[] = [
  { name: "name", label: "Your name" },
  { name: "email", label: "Your email", hint: "I'll only use it to reply to you." },
  { name: "message", label: "Message" },
];

function validate(name: FieldName, value: string) {
  const v = value.trim();
  if (name === "name" && !v) return "Please enter your name.";
  if (name === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v))
    return "Please enter a valid email, like name@company.com.";
  if (name === "message" && v.length < 10) return "Please write at least a short sentence.";
  return "";
}

function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Partial<Record<FieldName, string>>>({});

  function check(name: FieldName, value: string) {
    setErrors((prev) => ({ ...prev, [name]: validate(name, value) }));
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const next: Partial<Record<FieldName, string>> = {};
    for (const f of FIELDS) next[f.name] = validate(f.name, String(data.get(f.name) ?? ""));
    setErrors(next);

    // Send focus to the first field that needs fixing
    const firstBad = FIELDS.find((f) => next[f.name]);
    if (firstBad) {
      form.querySelector<HTMLElement>(`[name="${firstBad.name}"]`)?.focus();
      return;
    }

    setStatus("sending");
    try {
      const res = await fetch(`https://formspree.io/f/${formspreeId}`, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });
      if (!res.ok) throw new Error();
      setStatus("sent");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  const field =
    "w-full rounded-xl border border-line-strong bg-bg px-4 py-3 text-base outline-none transition-[border-color,box-shadow] duration-200 focus:border-accent focus:shadow-[0_0_0_4px_var(--accent-soft)] aria-[invalid=true]:border-danger";

  return (
    <form onSubmit={onSubmit} noValidate className="grid gap-5">
      {/* Spam trap: hidden from people, filled only by bots */}
      <input type="text" name="_gotcha" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />

      {FIELDS.map((f) => {
        const id = `contact-${f.name}`;
        const error = errors[f.name];
        const describedBy = [error ? `${id}-error` : null, f.hint ? `${id}-hint` : null].filter(Boolean).join(" ");
        const common = {
          id,
          name: f.name,
          required: true,
          "aria-invalid": !!error,
          "aria-describedby": describedBy || undefined,
          disabled: status === "sending",
          onBlur: (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => check(f.name, e.target.value),
          className: f.name === "message" ? `${field} resize-y` : field,
        };
        return (
          <div key={f.name} className="grid gap-2">
            <label htmlFor={id} className="text-sm font-medium">
              {f.label}
            </label>
            {f.name === "message" ? (
              <textarea rows={5} {...common} />
            ) : (
              <input
                type={f.name === "email" ? "email" : "text"}
                autoComplete={f.name === "email" ? "email" : "name"}
                inputMode={f.name === "email" ? "email" : undefined}
                {...common}
              />
            )}
            {f.hint && !error && (
              <p id={`${id}-hint`} className="text-sm text-muted">
                {f.hint}
              </p>
            )}
            {error && (
              <p id={`${id}-error`} role="alert" className="text-sm text-danger">
                {error}
              </p>
            )}
          </div>
        );
      })}

      <div className="flex flex-wrap items-center gap-4">
        <button
          type="submit"
          disabled={status === "sending"}
          className="inline-flex h-12 items-center gap-2 rounded-full bg-accent px-6 font-medium text-accent-fg transition-[transform,box-shadow,opacity] duration-200 hover:shadow-[0_8px_30px_-6px_rgba(var(--glow),0.6)] active:scale-[0.97] disabled:opacity-60"
        >
          {status === "sending" ? <Loader2 size={18} className="animate-spin" aria-hidden /> : <Send size={17} aria-hidden />}
          {status === "sending" ? "Sending…" : "Send message"}
        </button>
        <AnimatePresence mode="wait">
          {status === "sent" && (
            <motion.p
              key="ok"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              role="status"
              className="inline-flex items-center gap-2 text-sm text-ok"
            >
              <Check size={16} aria-hidden /> Sent. I’ll reply to your email soon.
            </motion.p>
          )}
          {status === "error" && (
            <motion.p
              key="err"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              role="alert"
              className="text-sm text-danger"
            >
              The message didn’t send. Check your connection and try again, or email me directly.
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </form>
  );
}

/** Shown until a Formspree ID is set: a direct email button, so the section always has a clear action. */
function EmailFallback() {
  return (
    <div className="grid content-start gap-5">
      <h3 className="text-2xl font-semibold">Send me an email</h3>
      <p className="text-muted">
        Tell me about the role and your team. I usually reply within a day.
      </p>
      <a
        href={`mailto:${profile.email}?subject=${encodeURIComponent("OJT opportunity")}`}
        className="inline-flex h-12 w-fit items-center gap-2 rounded-full bg-accent px-6 font-medium text-accent-fg transition-[transform,box-shadow] duration-200 hover:shadow-[0_8px_30px_-6px_rgba(var(--glow),0.6)] active:scale-[0.97]"
      >
        <Mail size={18} aria-hidden /> Write an email
      </a>
      <Blank className="w-fit">NEXT_PUBLIC_FORMSPREE_ID in .env.local to show a contact form here</Blank>
    </div>
  );
}

export function Contact() {
  return (
    <section id="contact" className="relative py-28 md:py-40">
      <div className="container-page">
        {/* The climax of the page: the accent light is at its strongest here */}
        <div className="relative isolate overflow-hidden rounded-[2rem] border border-line bg-surface px-6 py-14 md:px-12 md:py-20">
          <div aria-hidden className="glow -right-[22vmax] -top-[30vmax] [--glow-a:0.3]" />
          <div aria-hidden className="glow -bottom-[40vmax] -left-[26vmax] [--glow-a:0.16]" />
          <div aria-hidden className="bg-grid absolute inset-0 -z-10 [mask-image:linear-gradient(180deg,black,transparent_70%)]" />

          <div className="grid gap-14 lg:grid-cols-12 lg:gap-6">
            <Reveal className="grid content-start gap-8 lg:col-span-7">
              <p className="label">Contact</p>
              <h2 className="text-cinema text-[clamp(2.75rem,7vw,5.5rem)] font-bold leading-[0.95] tracking-[-0.045em]">
                Let’s build
                <br />
                something<span className="text-accent">.</span>
              </h2>
              <p className="max-w-[44ch] text-lg text-muted">
                I’m looking for an OJT placement for 2026. If your team has a spot, I’d love to hear from you.
              </p>
              <CopyEmail />
              <ul className="flex flex-wrap gap-x-6 gap-y-1 text-sm">
                <li>
                  <a
                    href={profile.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-11 items-center gap-2 text-muted transition-colors duration-200 hover:text-fg"
                  >
                    <GitHubIcon /> GitHub <ArrowUpRight size={14} aria-hidden />
                  </a>
                </li>
                {profile.linkedin ? (
                  <li>
                    <a
                      href={profile.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex min-h-11 items-center gap-2 text-muted transition-colors duration-200 hover:text-fg"
                    >
                      <LinkedInIcon /> LinkedIn <ArrowUpRight size={14} aria-hidden />
                    </a>
                  </li>
                ) : (
                  process.env.NODE_ENV !== "production" && (
                    <li className="inline-flex min-h-11 items-center">
                      <Blank>LinkedIn URL in src/content/site.ts</Blank>
                    </li>
                  )
                )}
                <li className="inline-flex min-h-11 items-center gap-2 text-muted">
                  <MapPin size={16} aria-hidden /> {profile.location}
                </li>
              </ul>
            </Reveal>

            <Reveal delay={0.12} className="lg:col-span-5 lg:pt-12">
              {formspreeId ? <ContactForm /> : <EmailFallback />}
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
