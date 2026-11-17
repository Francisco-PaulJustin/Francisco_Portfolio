import type { Metadata, Viewport } from "next";
import { Archivo, Geist, Geist_Mono } from "next/font/google";
import "lenis/dist/lenis.css";
import "./globals.css";
import { profile, siteUrl } from "@/content/site";
// The site version shown in the footer. Bump it with `npm version patch|minor|major` (see README).
import pkg from "../../package.json";
import { Providers } from "@/components/providers";
import { Nav, StageRail } from "@/components/nav";
import { Footer } from "@/components/footer";

// Archivo with its width axis, so headlines can be stretched wide (font-stretch: 112–125%)
const display = Archivo({ variable: "--font-archivo", subsets: ["latin"], axes: ["wdth"], display: "swap" });
const body = Geist({ variable: "--font-geist", subsets: ["latin"], display: "swap" });
const mono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"], display: "swap" });

const description = `${profile.name}: ${profile.intro}`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${profile.name} · Web & Cloud Developer`,
    template: `%s · ${profile.name}`,
  },
  description,
  openGraph: {
    type: "website",
    title: `${profile.name} · Web & Cloud Developer`,
    description,
    siteName: profile.name,
    locale: "en_PH",
  },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0e0f11" },
    { media: "(prefers-color-scheme: light)", color: "#f4f4f2" },
  ],
};

// Runs before paint so the saved theme never flashes. Dark is the default look.
const themeScript = `try{var t=localStorage.getItem('theme');document.documentElement.dataset.theme=t==='light'?'light':'dark'}catch(e){document.documentElement.dataset.theme='dark'}`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-theme="dark"
      suppressHydrationWarning
      className={`${display.variable} ${body.variable} ${mono.variable} antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      {/* suppressHydrationWarning: browser extensions (e.g. Grammarly) add attributes to <body> before React loads */}
      <body id="top" className="min-h-screen" suppressHydrationWarning>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-fg focus:px-4 focus:py-2 focus:text-bg"
        >
          Skip to content
        </a>
        <Providers>
          <Nav />
          <StageRail />
          <main id="main" className="overflow-x-clip">{children}</main>
          <Footer version={pkg.version} />
        </Providers>
        <div aria-hidden className="grain" />
      </body>
    </html>
  );
}
