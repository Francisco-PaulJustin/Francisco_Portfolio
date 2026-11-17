# Paul Justin Francisco — Portfolio

Personal portfolio for OJT applications. Built with Next.js 16, TypeScript, Tailwind CSS 4 and Motion (Framer Motion), with Lenis smooth scrolling. Deployed on Vercel.

**What still needs your input:** see [FILL_ME.md](FILL_ME.md).

## Run it on your computer

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Edit content

All text, links and project details are in [`src/content/site.ts`](src/content/site.ts). Images go in `public/images/`.

| Section | Component |
|---------|-----------|
| Navigation | `src/components/nav.tsx` |
| Hero + letterbox intro + deploy terminal | `src/components/hero.tsx`, `terminal.tsx` |
| About (scroll-lit statement, portrait, stats) | `src/components/about.tsx` |
| Skills (marquee + groups) | `src/components/skills.tsx` |
| Projects (stacking cards) | `src/components/projects.tsx` |
| Case-study pages | `src/app/projects/[slug]/page.tsx` |
| Journey timeline | `src/components/journey.tsx` |
| Contact | `src/components/contact.tsx` |
| Colors, fonts, grid | `src/app/globals.css` |

## Deploy to Vercel (free)

1. Create a repository on GitHub, e.g. `portfolio`, under `Francisco-PaulJustin`.
2. Push this project:
   ```bash
   git remote add origin https://github.com/Francisco-PaulJustin/portfolio.git
   git push -u origin main
   ```
3. Go to [vercel.com](https://vercel.com), sign in with GitHub, click **Add New → Project**, import the repo, and click **Deploy**. No settings to change.
4. Optional: add `NEXT_PUBLIC_FORMSPREE_ID` under **Settings → Environment Variables**, then redeploy.

From then on, every `git push` updates the live site automatically.

## Checks

```bash
npm run lint
npm run build
```
