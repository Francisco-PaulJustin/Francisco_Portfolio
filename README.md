# Paul Justin Francisco — Portfolio

Personal portfolio for OJT applications. Built with Next.js 16, TypeScript, Tailwind CSS 4 and Motion (Framer Motion), with Lenis smooth scrolling. The design reads like a deployment pipeline: each section is a numbered stage. Deployed on Vercel.

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
| Navigation + pipeline progress rail | `src/components/nav.tsx` |
| 00 Hero + animated deploy pipeline | `src/components/hero.tsx`, `pipeline.tsx` |
| 01 About (scroll-lit statement, portrait, facts) | `src/components/about.tsx` |
| 02 Projects (spec-sheet rows) | `src/components/projects.tsx` |
| Case-study pages | `src/app/projects/[slug]/page.tsx` |
| 03 Stack (architecture diagram) | `src/components/skills.tsx` |
| 04 Journey | `src/components/journey.tsx` |
| 05 Contact | `src/components/contact.tsx` |
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

## Versioning

The site version lives in `package.json` and shows in the footer (e.g. `v2.0.0`). Every release is listed in [CHANGELOG.md](CHANGELOG.md) and tagged in git (`v2.0.0`).

Pick the number by what changed (Semantic Versioning, **MAJOR.MINOR.PATCH**):

| Change | Command | Example |
|--------|---------|---------|
| Fix or small content update | `npm version patch` | 2.0.0 → 2.0.1 |
| New section, page or feature | `npm version minor` | 2.0.1 → 2.1.0 |
| Big visible change, like a redesign | `npm version major` | 2.1.0 → 3.0.0 |

To release:

1. Commit your changes in GitHub Desktop.
2. Add an entry at the top of `CHANGELOG.md` describing the change, and commit it.
3. Run the matching `npm version …` command in the terminal. It updates `package.json`, commits, and creates the tag (e.g. `v2.0.1`). It refuses to run if you have uncommitted changes.
4. Push in GitHub Desktop (it pushes tags too), or run `git push --follow-tags`.
5. Optional: on GitHub, open **Releases → Draft a new release**, pick the tag, and click **Generate release notes**.

## Checks

```bash
npm run lint
npm run build
```
