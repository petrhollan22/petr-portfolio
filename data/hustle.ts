import type { Localized } from '@/lib/localized';

export interface HustleProject {
  id: string;
  title: Localized;
  description: Localized;
  type: "coaching" | "event" | "volunteer";
  cta: Localized;
  ctaLink: string;
  period?: string;
  bullets?: Localized[];
  image?: string;
}

export const hustleProjects: HustleProject[] = [
  {
    id: "chess-coaching",
    title: { cs: "Šachový trénink", en: "Chess coaching" },
    description: {
      cs: "Trénuji začínající šachisty i juniory. Zaměřuji se na zahájení, taktiku a strategii. Lekce vedu individuálně i skupinově, online nebo osobně.",
      en: "I coach beginners and junior players, focusing on openings, tactics and strategy. Lessons run one-on-one or in groups, online or in person."
    },
    type: "coaching",
    cta: { cs: "Domluvit lekci", en: "Book a lesson" },
    ctaLink: "/schedule-time"
  },
  {
    id: "sports-events",
    title: { cs: "Organizace sportovních akcí", en: "Sports event coordination" },
    description: {
      cs: "Jako koordinátor sportovních akcí ve spolku 4FIS zajišťuji volejbal, badminton, bouldering a další aktivity pro studenty VŠE. Komunikuji s účastníky a zařizuji prostory.",
      en: "As a sports event coordinator at the 4FIS student association I organise volleyball, badminton, bouldering and other activities for VŠE students, handling participant communication and venues."
    },
    type: "event",
    period: "2022–2026",
    cta: { cs: "Web 4FIS", en: "4FIS website" },
    ctaLink: "https://4fis.cz/",
    bullets: [
      { cs: "Koordinace volejbalu, badmintonu, boulderingu a dalších aktivit", en: "Coordinating volleyball, badminton, bouldering and other activities" },
      { cs: "Komunikace s účastníky a profesionální korespondence", en: "Participant communication and professional correspondence" },
      { cs: "Zajištění vhodných prostor a vybavení", en: "Securing suitable venues and equipment" },
      { cs: "Vytváření příležitostí k setkávání a osobnímu rozvoji studentů", en: "Creating opportunities for students to connect and grow" }
    ]
  },
  {
    id: "university-ambassador",
    title: { cs: "Ambasador fakulty", en: "University ambassador" },
    description: {
      cs: "Ambasador Fakulty informatiky a statistiky VŠE a člen studentského spolku Stačí se zeptat. Propaguji studijní programy na středních školách, na dnech otevřených dveří a na veletrzích Gaudeamus v Praze a Brně.",
      en: "Ambassador for the Faculty of Informatics and Statistics at VŠE and member of the Stačí se zeptat student association. I promote study programmes at secondary schools, open days and the Gaudeamus education fairs in Prague and Brno."
    },
    type: "volunteer",
    period: "2021–2026",
    cta: { cs: "Fakulta na LinkedIn", en: "Faculty on LinkedIn" },
    ctaLink: "https://cz.linkedin.com/school/fisvse/",
    bullets: [
      { cs: "Člen studentské organizace Stačí se zeptat", en: "Member of the Stačí se zeptat student association" },
      { cs: "Návštěvy středních škol s informacemi o studiu", en: "School visits presenting study information" },
      { cs: "Digitální i fyzická propagace studijních materiálů", en: "Digital and physical promotion of study materials" },
      { cs: "Přednášky na dnech otevřených dveří", en: "Talks at open days" },
      { cs: "Prezentace fakulty a konzultace s uchazeči na veletrzích Gaudeamus v Praze a Brně", en: "Representing the faculty and advising applicants at the Gaudeamus fairs in Prague and Brno" }
    ]
  },
  {
    id: "profinit-ai-hotspot",
    title: { cs: "Profinit AI Hotspot", en: "Profinit AI Hotspot" },
    description: {
      cs: "Účast na konferenci Profinit AI Hotspot věnované praktickému nasazení umělé inteligence. Setkání propojilo lidi z byznysu i technické praxe nad tím, kde AI reálně přináší hodnotu.",
      en: "Attended the Profinit AI Hotspot conference on practical AI adoption, bringing together business and technical perspectives on where AI actually delivers value."
    },
    type: "event",
    cta: { cs: "Příspěvek na LinkedIn", en: "LinkedIn post" },
    ctaLink: "https://www.linkedin.com/posts/petr-hollan_last-week-i-had-the-privilege-of-attending-share-7264032563231342593-dgmb/",
    image: "/images/hustle/profinit.jpg"
  },
  {
    id: "sales-management-video",
    title: { cs: "Jak se dostat na Sales Management", en: "Getting into Sales Management" },
    description: {
      cs: "Sales Management je nejžádanější vedlejší specializace na VŠE a přijímací řízení stojí na jednominutovém videu. Nikde nebyla dostupná ukázka, jak takové video vypadá, tak jsem zveřejnil to svoje, se kterým jsem uspěl.",
      en: "Sales Management is the most sought-after minor at VŠE and admission hinges on a one-minute video. No examples were publicly available, so I published the one that got me in."
    },
    type: "volunteer",
    cta: { cs: "Podívat se na video", en: "Watch the video" },
    ctaLink: "https://www.linkedin.com/posts/petr-hollan_chcete-zv%C3%BD%C5%A1it-svoji-%C5%A1anci-se-dostat-na-ugcPost-7246797614686384129-8zq6/"
  }
];
