import type { Localized } from '@/lib/localized';

export interface Service {
  id: string;
  name: Localized;
  description: Localized;
  tier: 'main' | 'side' | 'other';
  hidden?: boolean;
}

export const workServices: Service[] = [
  {
    id: "data-analytics",
    tier: "main",
    name: { cs: "Data & BI", en: "Data & BI" },
    description: {
      cs: "Daty se živím. Nejčastěji SQL, Databricks, PySpark a Power BI. Baví mě hlavně ta část mezi \"někde máme data\" a \"někdo podle nich dokáže udělat rozhodnutí\".",
      en: "Data is my day job. Mostly SQL, Databricks, PySpark and Power BI. I enjoy the part between \"we have data somewhere\" and \"someone can actually make decisions with it\"."
    }
  },
  {
    id: "ai-solutions",
    tier: "main",
    name: { cs: "AI", en: "AI" },
    description: {
      cs: "AI řeším v práci, vlastních projektech i akademicky. V diplomce jsem zkoumal, jak ji zavádí osm českých firem — a co se mezi prezentací o AI a skutečným nasazením obvykle pokazí. Pokud řešíte podobný problém, rád se na něj podívám s vámi.",
      en: "I work with AI professionally, in my own projects and academically. My thesis looked at how eight Czech companies adopt AI — and what usually goes wrong between the AI presentation and actual deployment. If you're facing something similar, I'm happy to take a look."
    }
  },
  {
    id: "web-design",
    tier: "side",
    name: { cs: "Weby & vlastní projekty", en: "Websites & side projects" },
    description: {
      cs: "Tenhle web jsem si postavil sám. Pak jsem zjistil, že mě to baví, a začal stavět další. Dělám hlavně menší weby a nástroje v Next.js — zatím spíš vlastní projekty a weby pro lidi kolem mě.",
      en: "I built this site myself. Then I realised I enjoyed it and started building more. Mostly smaller sites and tools in Next.js — so far mainly my own projects and sites for people I know."
    }
  },
  {
    id: "chess-coaching",
    tier: "other",
    name: { cs: "Šachový trénink", en: "Chess coaching" },
    description: {
      cs: "Šachy hraju závodně přes dvacet let a mám titul FIDE Master. Trénuju individuálně i skupinově, online i osobně.",
      en: "I've played chess competitively for over twenty years and hold the FIDE Master title. I coach individually and in groups, online and in person."
    }
  },
  {
    id: "ai-audit",
    tier: "side",
    hidden: true,
    name: { cs: "AI governance readiness", en: "AI governance readiness" },
    description: {
      cs: "Analýza AI use cases a governance s ohledem na EU AI Act. Vychází z diplomové práce o zavádění AI v českých firmách.",
      en: "Analysis of AI use cases and governance with regard to EU AI Act. Based on my thesis research on AI adoption in Czech companies."
    }
  },
  {
    id: "cv-request",
    hidden: true,
    tier: "other",
    name: { cs: "Žádost o životopis", en: "CV request" },
    description: {
      cs: "Pošlu ti kompletní životopis v PDF včetně kontaktních údajů.",
      en: "I'll send you the full CV as a PDF, including contact details."
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
  { cs: "Běh", en: "Running" },
  { cs: "Cestování", en: "Travel" },
  { cs: "Společenské akce", en: "Social events" },
  { cs: "Workshop", en: "Workshop" },
];
