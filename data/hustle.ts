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
      cs: "Jako koordinátor sportovních akcí na VŠE zajišťuji volejbal, badminton, bouldering a další aktivity pro studenty. Komunikuji s účastníky a zařizuji prostory.",
      en: "As a sports event coordinator at VŠE I organise volleyball, badminton, bouldering and other activities for students, handling participant communication and venues."
    },
    type: "event",
    period: "2022–2026",
    cta: { cs: "Zjistit víc", en: "Learn more" },
    ctaLink: "https://cz.linkedin.com/company/4fis",
    bullets: [
      { cs: "Koordinace volejbalu, badmintonu, boulderingu a dalších aktivit", en: "Coordinating volleyball, badminton, bouldering and other activities" },
      { cs: "Komunikace s účastníky a profesionální korespondence", en: "Participant communication and professional correspondence" },
      { cs: "Zajištění vhodných prostor a vybavení", en: "Securing suitable venues and equipment" }
    ]
  },
  {
    id: "university-ambassador",
    title: { cs: "Ambasador fakulty", en: "University ambassador" },
    description: {
      cs: "Ambasador Fakulty informatiky a statistiky VŠE. Propaguji studijní programy na středních školách, na dnech otevřených dveří a na veletrzích Gaudeamus v Praze a Brně.",
      en: "Ambassador for the Faculty of Informatics and Statistics at VŠE. I promote study programmes at secondary schools, open days and the Gaudeamus education fairs in Prague and Brno."
    },
    type: "volunteer",
    period: "2021–2026",
    cta: { cs: "Fakulta na LinkedIn", en: "Faculty on LinkedIn" },
    ctaLink: "https://cz.linkedin.com/school/fisvse/",
    bullets: [
      { cs: "Návštěvy středních škol s informacemi o studiu", en: "Visits to secondary schools with study information" },
      { cs: "Přednášky na dnech otevřených dveří", en: "Talks at open days" },
      { cs: "Prezentace fakulty na veletrzích Gaudeamus", en: "Representing the faculty at Gaudeamus fairs" },
      { cs: "Konzultace s uchazeči o studium", en: "Consultations with applicants" }
    ]
  }
];
