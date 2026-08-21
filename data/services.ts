import type { Localized } from '@/lib/localized';

export interface Service {
  id: string;
  name: Localized;
  description: Localized;
  hidden?: boolean;
}

export const workServices: Service[] = [
  {
    id: "web-design",
    name: { cs: "Web development", en: "Web development" },
    description: {
      cs: "Osobní weby a menší aplikace v Next.js. Stavím vlastní projekty a pomáhám s weby přátelům a známým.",
      en: "Personal sites and smaller apps in Next.js. I build my own projects and help friends and people I know."
    }
  },
  {
    id: "ai-solutions",
    name: { cs: "AI řešení", en: "AI solutions" },
    description: {
      cs: "Praktické nasazení AI a ML do tvého byznysu. Integrace LLM, stavba inteligentních chatbotů a automatizace procesů.",
      en: "Practical AI and ML deployment for your business. LLM integration, building intelligent chatbots and process automation."
    }
  },
  {
    id: "data-analytics",
    name: { cs: "Datová analytika", en: "Data analytics" },
    description: {
      cs: "Zpracování a analýza dat v Databricks a PySparku. Přehledné vizualizace, Business Intelligence a efektivní datové pipeline.",
      en: "Data processing and analysis in Databricks and PySpark. Clear visualisations, business intelligence and efficient data pipelines."
    }
  },
  {
    id: "ai-audit",
    name: { cs: "AI audit & Governance", en: "AI Audit & Governance" },
    description: {
      cs: "Analýza AI use cases, rizik a governance s ohledem na požadavky EU AI Act. Vychází z diplomové práce o zavádění AI v českých firmách.",
      en: "Analysis of AI use cases, risks and governance with regard to EU AI Act requirements. Based on my thesis research on AI adoption in Czech companies."
    }
  },
  {
    id: "social-media",
    name: { cs: "Sociální sítě", en: "Social media" },
    description: {
      cs: "Tvorba obsahu a růstová strategie pro vaše profily. Správa komunity, plánování a vyhodnocování dosahu.",
      en: "Content creation and growth strategy for your profiles. Community management, planning and reach analysis."
    }
  },
  {
    id: "cv-request",
    hidden: true,
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
      cs: "Individuální i skupinové lekce šachu pro začátečníky i pokročilé. Online formou nebo osobně.",
      en: "Individual and group chess lessons for beginners and advanced players. Online or in person."
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
  { cs: "Workshop", en: "Workshop" },
];
