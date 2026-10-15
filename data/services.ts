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
      cs: "Daty se živím, takže tady pozor: začátečník nejsem. Nejčastěji SQL, Databricks, PySpark a Power BI. Baví mě hlavně ta část mezi \"někde máme data\" a \"někdo podle nich dokáže udělat rozhodnutí\".",
      en: "Data is my day job, so careful here: not a beginner. Mostly SQL, Databricks, PySpark and Power BI. I enjoy the part between \"we have data somewhere\" and \"someone can actually make decisions with it\"."
    }
  },
  {
    id: "ai-solutions",
    tier: "main",
    name: { cs: "AI", en: "AI" },
    description: {
      cs: "AI řeším v práci i ve vlastních projektech a napsal jsem o ní diplomku: jak ji zavádí osm českých firem a co se mezi prezentací o AI a skutečným nasazením obvykle pokazí. Expertem mě to dělá asi tak, jako z přečtení kuchařky dělá šéfkuchaře. Ale pokecám o tom rád.",
      en: "I work with AI in my job and side projects, and wrote my thesis on it: how eight Czech companies adopt AI and what usually goes wrong between the AI presentation and actual deployment. That makes me an expert roughly the way reading a cookbook makes you a chef. Happy to talk about it though."
    }
  },
  {
    id: "web-design",
    tier: "side",
    name: { cs: "Weby & vlastní projekty", en: "Websites & side projects" },
    description: {
      cs: "Tenhle web jsem si postavil sám. Pak jsem zjistil, že mě to baví, a začal stavět další: menší weby a nástroje v Next.js, zatím hlavně pro sebe a lidi kolem mě. Jak se mi to daří, posuď sám. Právě se na to díváš.",
      en: "I built this site myself. Then I realised I enjoyed it and kept going: smaller sites and tools in Next.js, so far mostly for myself and people I know. Judge the result yourself. You're looking at it."
    }
  },
  {
    id: "chess-coaching",
    tier: "other",
    name: { cs: "Šachový trénink", en: "Chess coaching" },
    description: {
      cs: "Tady výjimečně začátečník nejsem. Šachy hraju závodně přes dvacet let, mám titul FIDE Master a od roku 2020 trénuju v šachové škole Vávra & Černoušek. Individuálně i skupinově, online i osobně.",
      en: "One place where I'm definitely not a beginner. I've played competitive chess for over twenty years, hold the FIDE Master title and have coached at the Vávra & Černoušek chess school since 2020. Individually or in groups, online or in person."
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
