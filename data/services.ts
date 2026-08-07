import type { Localized } from '@/lib/localized';

export interface Service {
  id: string;
  name: Localized;
  description: Localized;
}

export const workServices: Service[] = [
  {
    id: "web-design",
    name: { cs: "Web design", en: "Web design" },
    description: {
      cs: "Návrh a stavba moderních webových aplikací v Reactu a Next.js, responzivní design, optimalizace pro uživatele.",
      en: "Design and build of modern web applications in React and Next.js, responsive layouts, user-focused optimisation."
    }
  },
  {
    id: "ai-solutions",
    name: { cs: "AI řešení", en: "AI solutions" },
    description: {
      cs: "Nasazení AI a ML řešení, integrace jazykových modelů, chatboti, automatizace procesů.",
      en: "Deploying AI and ML solutions, language model integrations, chatbots, process automation."
    }
  },
  {
    id: "data-analytics",
    name: { cs: "Datová analytika", en: "Data analytics" },
    description: {
      cs: "Analýza dat v Databricks a PySparku, vizualizace, business intelligence, optimalizace datových pipeline.",
      en: "Data analysis in Databricks and PySpark, visualisation, business intelligence, pipeline optimisation."
    }
  },
  {
    id: "ai-audit",
    name: { cs: "AI audit", en: "AI audit" },
    description: {
      cs: "Audit AI systémů, soulad s EU AI Act, posouzení modelů, nastavení governance.",
      en: "Auditing AI systems, EU AI Act compliance, model assessment, governance frameworks."
    }
  },
  {
    id: "social-media",
    name: { cs: "Sociální sítě", en: "Social media" },
    description: {
      cs: "Strategie sociálních sítí, plánování obsahu, analýza dosahu a zapojení, správa komunity.",
      en: "Social media strategy, content planning, reach and engagement analysis, community management."
    }
  },
  {
    id: "cv-request",
    name: { cs: "Žádost o životopis", en: "CV request" },
    description: {
      cs: "Pošlu ti kompletní životopis v PDF včetně kontaktních údajů.",
      en: "I'll send you the full CV as a PDF, including contact details."
    }
  },
  {
    id: "chess-coaching",
    name: { cs: "Šachový trénink", en: "Chess coaching" },
    description: {
      cs: "Individuální i skupinové lekce šachu pro všechny úrovně, online i offline.",
      en: "Individual and group chess lessons for all levels, online or in person."
    }
  }
];

export const scheduleActivities: Localized[] = [
  { cs: "Bouldering", en: "Bouldering" },
  { cs: "Badminton", en: "Badminton" },
  { cs: "Padel", en: "Padel" },
  { cs: "Squash", en: "Squash" },
  { cs: "Lyžování", en: "Skiing" },
  { cs: "Hory a turistika", en: "Hiking" },
  { cs: "Cestování", en: "Travel" },
  { cs: "Společenské akce", en: "Social events" },
  { cs: "Workshop", en: "Workshop" }
];
