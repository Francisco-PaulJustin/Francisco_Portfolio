"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRight, Check, Copy, Loader2, Mail, MapPin, Send } from "lucide-react";
import { formspreeId, profile } from "@/content/site";
import { GitHubIcon, LinkedInIcon } from "./icons";
import { Magnetic, Reveal } from "./motion-kit";

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
      <h3 className="display-h text-2xl">Send me an email</h3>
      <p className="text-muted">
        Tell me about the role and your team. I usually reply within a day.
      </p>
      <a
        href={`mailto:${profile.email}?subject=${encodeURIComponent("OJT opportunity")}`}
        className="inline-flex h-12 w-fit items-center gap-2 rounded-full bg-accent px-6 font-medium text-accent-fg transition-[transform,box-shadow] duration-200 hover:shadow-[0_8px_30px_-6px_rgba(var(--glow),0.6)] active:scale-[0.97]"
      >
        <Mail size={18} aria-hidden /> Write an email
      </a>
    </div>
  );
}

export function Contact() {
  return (
    <section id="contact" className="relative isolate overflow-hidden py-28 md:py-40">
      {/* The final stage: the warm light is strongest here */}
      <div aria-hidden className="glow bottom-[-45vmax] left-1/2 -translate-x-1/2 [--glow-a:0.22]" />

      <div className="container-page">
        <Reveal className="mb-10 flex items-center gap-4">
          <span className="font-mono text-xs text-accent">05</span>
          <span className="label">Contact</span>
          <span aria-hidden className="h-px flex-1 bg-line" />
          <span className="label hidden items-center gap-1.5 sm:inline-flex">
            <span className="pulse-dot size-1.5 rounded-full bg-ok" /> {profile.availability}
          </span>
        </Reveal>

        <Reveal>
          <h2 className="display-x text-[clamp(2.9rem,9.4vw,8.5rem)]">
            Let’s ship
            <br />
            something<span className="text-accent">.</span>
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-14 border-t border-line pt-10 lg:grid-cols-12 lg:gap-6">
          <Reveal className="grid content-start gap-8 lg:col-span-6">
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
              {profile.linkedin && (
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
              )}
              <li className="inline-flex min-h-11 items-center gap-2 text-muted">
                <MapPin size={16} aria-hidden /> {profile.location}
              </li>
            </ul>
          </Reveal>

          <Reveal delay={0.12} className="lg:col-span-5 lg:col-start-8">
            <div className="rounded-2xl border border-line bg-surface p-6 md:p-8">
              {formspreeId ? <ContactForm /> : <EmailFallback />}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
