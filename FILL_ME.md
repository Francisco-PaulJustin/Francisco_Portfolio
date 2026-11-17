# What I still need to add

Text and links are in **`src/content/site.ts`** (search for `FILL IN`). Images go in `public/images/`.

Until something is added, the site shows a "coming soon" placeholder or hides it.

| What | Where it goes | Until then, the site shows |
|------|---------------|----------------------------|
| **Résumé PDF** | `public/resume.pdf`, then set `resumeUrl: "/resume.pdf"` | "Résumé on request" button that scrolls to Contact |
| **Headshot photo** | `public/images/profile.jpg`, then set `photo: "/images/profile.jpg"` | Initials + "Photo coming soon" |
| **TechPrime AI screenshot** | `public/images/projects/techprime-ai.jpg`, then set its `cover` | Empty browser frame + "Screenshots coming soon" |
| **Clinic system screenshot** | `public/images/projects/clinic-management-system.jpg`, then set its `cover` | Same |
| **Portfolio screenshot** | `public/images/projects/portfolio.jpg`, then set its `cover` | Same |
| **TechPrime AI tech stack** | `projects[0].caseStudy.stack`, e.g. `["PHP", "MySQL", "JavaScript"]` | Listed under "Work in progress" on the case study |
| **Results** (per project) | `caseStudy.outcome` | Listed under "Work in progress" |
| **What I learned** (per project) | `caseStudy.learned` | Listed under "Work in progress" |
| **LinkedIn URL** | `profile.linkedin` | Hidden |
| **Contact form** | `NEXT_PUBLIC_FORMSPREE_ID` in `.env.local` and in Vercel → Settings → Environment Variables | "Write an email" button |
| Clinic repo link (if public) | `projects[1].repo` | Hidden |
| Personal line (e.g. PLP Taekwondo Team) | `about.personal` | Hidden |
| Coursera certificate link | `journey[0].link` | Hidden |
| Live demo links | `projects[n].live` | Hidden |

Images: photo 4:5 or square, at least 800px wide. Screenshots 16:10, at least 1600px wide.
