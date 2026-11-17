# What I need from you

Everything else is done. These are the only things that have to come from you.
While `npm run dev` is running, each missing item shows on the page as a dashed **✎ Fill in** label.
The labels never appear on the live site: empty items are hidden there.

Text blanks are in **`src/content/site.ts`** (search for `FILL IN`).

## Must have before you send the link to recruiters

| # | What | Where it goes | Notes |
|---|------|---------------|-------|
| 1 | **Résumé PDF** | `public/resume.pdf` | Use exactly this file name. The "Download résumé" button links here. |
| 2 | **Headshot photo** | `public/images/profile.jpg`, then in `site.ts` set `photo: "/images/profile.jpg"` | Portrait (4:5) or square, well lit, at least 800px wide. |
| 3 | **TechPrime AI screenshot** | `public/images/projects/techprime-ai.jpg`, then set `cover: "/images/projects/techprime-ai.jpg"` | 16:10, at least 1600px wide. Pick the PC builder screen if you can. |
| 4 | **Clinic system screenshot** | `public/images/projects/clinic-management-system.jpg`, then set `cover` | The app or your AWS ECS console both work. |
| 5 | **Portfolio screenshot** | `public/images/projects/portfolio.jpg`, then set `cover` | Take it after deploying. |
| 6 | **TechPrime AI tech stack** | `projects[0].caseStudy.stack` | e.g. `["PHP", "MySQL", "JavaScript"]`. Your résumé doesn't say. |

## Recommended

| # | What | Where | Notes |
|---|------|-------|-------|
| 7 | **LinkedIn URL** | `profile.linkedin` | Leave `null` to hide it. |
| 8 | **Contact form** | `.env.local` → `NEXT_PUBLIC_FORMSPREE_ID=xxxxxxx` | Free at formspree.io. Create a form with your Gmail and copy the ID after `/f/`. Add the same variable in Vercel → Settings → Environment Variables. Without it, the site shows your email instead of a form. |
| 9 | **What you learned** (per project) | `caseStudy.learned` | 1–2 sentences in your own words. Recruiters read this. |
| 10 | **Outcome** (per project) | `caseStudy.outcome` | Grade, panel feedback, numbers, or "deployed and used by…". |
| 11 | **Clinic repo link** | `projects[1].repo` | Only if it's public. |

## Optional

| # | What | Where |
|---|------|-------|
| 12 | Personal line (e.g. PLP Taekwondo Team) | `about.personal` |
| 13 | Coursera certificate link | `journey[0].link` |
| 14 | Live demo links | `projects[n].live` |
