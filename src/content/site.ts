/**
 * ─────────────────────────────────────────────────────────────
 *  ALL SITE CONTENT LIVES IN THIS FILE.
 *  Search for "FILL IN" to find everything still to add.
 *  Until you add them, the site shows "coming soon" placeholders
 *  (photo, screenshots, résumé) or simply hides the item (links).
 * ─────────────────────────────────────────────────────────────
 */

export type Project = {
  slug: string;
  title: string;
  kicker: string; // short label above the title
  year: string;
  summary: string; // one or two lines for the card
  role: string;
  team: string;
  tags: string[];
  /** Path inside /public, e.g. "/images/projects/techprime.jpg" (16:10 works best). FILL IN */
  cover: string | null;
  repo: string | null;
  live: string | null;
  caseStudy: {
    problem: string;
    built: string[]; // what YOU built
    stack: string[];
    outcome: string | null; // FILL IN: result, grade, feedback, numbers
    learned: string | null; // FILL IN: 1–2 sentences in your own words
  };
};

export const profile = {
  name: "Paul Justin Francisco",
  firstName: "Paul Justin",
  lastName: "Francisco",
  initials: "PJF",
  availability: "Open to OJT · 2026",
  roles: ["Web Developer", "Cloud & DevOps", "BSIT Student"],
  intro:
    "4th-year BSIT student at Pamantasan ng Lungsod ng Pasig. I build web apps with JavaScript, PHP and MySQL, and ship them with Docker and AWS.",
  location: "Metro Manila, PH",
  email: "pauljustinfrancisco@gmail.com",
  github: "https://github.com/Francisco-PaulJustin",
  /** FILL IN: your LinkedIn URL, e.g. "https://www.linkedin.com/in/your-name". Leave null to hide it. */
  linkedin: null as string | null,
  /** Résumé PDF in /public. Set to null to show "Résumé on request" instead. */
  resumeUrl: "/Francisco_PaulJustin_Resume.pdf" as string | null,
  /** Headshot in /public. Set to null to show the "Photo coming soon" placeholder. */
  photo: "/images/profile.jpg" as string | null,
};

export const about = {
  paragraphs: [
    "I'm a Dean's Lister who likes taking a project from the database all the way to deployment. My capstone team built an inventory, POS and online store for a real PC shop, and in our integrated lab I containerized microservices and deployed them on AWS.",
    "I'm looking for an OJT placement where I can work on real systems, learn from an experienced team, and help ship features that people use.",
  ],
  /** FILL IN (optional): one personal line, e.g. about the PLP Taekwondo Team. Leave null to hide it. */
  personal: null as string | null,
  stats: [
    { value: 4, suffix: "th", label: "Year in BSIT" },
    { value: 3, suffix: "×", label: "Dean's Lister" },
    { value: 1, suffix: "", label: "Cloud certificate" },
  ],
};

/**
 * Skills, drawn as the layers of a web system: a request travels from the client to the cloud.
 * `icon` is a Lucide icon name used by the Skills section.
 */
export const stackLayers = [
  { id: "client", icon: "monitor", title: "Client", note: "What people see", items: ["HTML", "CSS", "JavaScript", "Figma"] },
  { id: "server", icon: "server", title: "Server", note: "Logic and APIs", items: ["PHP", "Python", "C++", "Postman"] },
  { id: "data", icon: "database", title: "Data", note: "Where it's stored", items: ["MySQL", "Supabase"] },
  { id: "container", icon: "box", title: "Container", note: "How it's packaged", items: ["Docker", "Microservices"] },
  { id: "cloud", icon: "cloud", title: "Cloud", note: "Where it runs", items: ["AWS ECS", "AWS ECR", "Google Cloud"] },
] as const;

/** Tools that sit alongside every layer */
export const toolbelt = ["Git & GitHub", "API testing", "Windows Server", "Active Directory"];

export const projects: Project[] = [
  {
    slug: "techprime-ai",
    title: "TechPrime AI",
    kicker: "Capstone project",
    year: "2026",
    summary:
      "Inventory, POS and online store for EasyPC's One Oasis branch in Pasig, with a PC builder that checks part compatibility.",
    role: "Co-developer · PC-builder compatibility logic",
    team: "Capstone team",
    tags: ["E-commerce", "POS", "AI assistant"],
    cover: null,
    repo: "https://github.com/samanthajms/TechPrime-AI",
    live: null,
    caseStudy: {
      problem:
        "EasyPC's One Oasis branch needed one system for stock management, receiving, point-of-sale checkout and reports, plus an online store where customers can shop and build a PC.",
      built: [
        "The PC builder's compatibility-checking logic, which validates part combinations before checkout.",
        "Worked with the team on online shopping and Primo, an AI shopping assistant.",
      ],
      /** FILL IN: the languages and frameworks TechPrime AI uses */
      stack: [],
      outcome: null,
      learned: null,
    },
  },
  {
    slug: "clinic-management-system",
    title: "Clinic Management System",
    kicker: "Integrated lab project",
    year: "2026",
    summary:
      "A microservices clinic system built by a 32-student class in 4 weeks. I containerized services and deployed them on AWS.",
    role: "Cloud deployment · ECR and ECS setup",
    team: "32-student class",
    tags: ["Microservices", "Docker", "AWS"],
    cover: null,
    /** FILL IN: repo link if it is public, otherwise leave null */
    repo: null,
    live: null,
    caseStudy: {
      problem:
        "Our class had four weeks to build a clinic management system as separate microservices, with each group owning a service, and run it in the cloud.",
      built: [
        "Created Amazon ECR repositories to store each microservice's Docker image.",
        "Wrote ECS task definitions to run the containerized services on AWS.",
      ],
      stack: ["Docker", "Amazon ECR", "Amazon ECS", "Microservices"],
      outcome: null,
      learned: null,
    },
  },
  {
    slug: "portfolio",
    title: "This portfolio",
    kicker: "Personal project",
    year: "2026",
    summary:
      "Designed and built from scratch with Next.js and Motion, deployed on Vercel with automatic builds on every push.",
    role: "Design, development and deployment",
    team: "Solo",
    tags: ["Next.js", "Motion", "Vercel"],
    cover: null,
    repo: "https://github.com/Francisco-PaulJustin",
    live: null,
    caseStudy: {
      problem:
        "I wanted one place where recruiters can see who I am, what I've built, and how to reach me, without digging through files.",
      built: [
        "A responsive single-page site on a 12-column grid, with light and dark themes.",
        "Scroll-driven animation that switches off for visitors who prefer reduced motion.",
        "Automatic deployment: every push to GitHub goes live on Vercel.",
      ],
      stack: ["Next.js", "TypeScript", "Tailwind CSS", "Motion", "Vercel"],
      outcome: null,
      learned: null,
    },
  },
];

export const journey = [
  {
    when: "Aug 2026",
    title: "Google Cloud Fundamentals: Core Infrastructure",
    where: "Google Cloud · Coursera",
    detail: null as string | null,
    /** FILL IN (optional): your Coursera certificate link */
    link: null as string | null,
    kind: "Certificate",
  },
  {
    when: "2023 – Present",
    title: "BS Information Technology",
    where: "Pamantasan ng Lungsod ng Pasig",
    detail:
      "Dean's Lister: 1st Year, 3rd Year and 3rd Year Midyear. Coursework in web development, advanced databases, systems integration, networking and security.",
    link: null as string | null,
    kind: "Education",
  },
  {
    when: "2021 – 2023",
    title: "Senior High School · TVL–ICT",
    where: "Buting Senior High School",
    detail: "Graduated with honors.",
    link: null as string | null,
    kind: "Education",
  },
];

/** FILL IN: create a free form at formspree.io, then add NEXT_PUBLIC_FORMSPREE_ID to .env.local and to Vercel. */
export const formspreeId = process.env.NEXT_PUBLIC_FORMSPREE_ID ?? null;

export const siteUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : "http://localhost:3000";
