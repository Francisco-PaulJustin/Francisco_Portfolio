import type { Metadata, Viewport } from "next";
import { DM_Sans, JetBrains_Mono, Space_Grotesk } from "next/font/google";
import "lenis/dist/lenis.css";
import "./globals.css";
import { profile, siteUrl } from "@/content/site";
import { Providers } from "@/components/providers";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";

const display = Space_Grotesk({ variable: "--font-space-grotesk", subsets: ["latin"], display: "swap" });
const body = DM_Sans({ variable: "--font-dm-sans", subsets: ["latin"], display: "swap" });
const mono = JetBrains_Mono({ variable: "--font-jetbrains-mono", subsets: ["latin"], display: "swap" });

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
    { media: "(prefers-color-scheme: dark)", color: "#0a0c10" },
    { media: "(prefers-color-scheme: light)", color: "#f6f7f9" },
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
          <main id="main" className="overflow-x-clip">{children}</main>
          <Footer />
        </Providers>
        <div aria-hidden className="grain" />
      </body>
    </html>
  );
}
