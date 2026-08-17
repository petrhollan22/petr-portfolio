import type { Localized } from '@/lib/localized';

export interface Job {
  title: Localized;
  org: string;
  period: string;
  description?: Localized;
}

export interface Education {
  title: Localized;
  org: string;
  period: string;
}

export const jobs: Job[] = [
  {
    title: { cs: "Business Intelligence Analyst", en: "Business Intelligence Analyst" },
    org: "Albert Česká republika",
    period: "04/2025 – @present",
    description: {
      cs: "Datové modely, dashboardy a analytické reporty pro rozhodování napříč Českem, Řeckem, Rumunskem a Srbskem. Koordinace mezi byznysem a centrální datovou platformou včetně pravidelné prezentace výsledků managementu.",
      en: "Data models, dashboards and analytical reports supporting decisions across Czechia, Greece, Romania and Serbia. Coordination between business teams and the central data platform, including regular reporting to management."
    }
  },
  {
    title: { cs: "Datový analytik", en: "Data Analyst" },
    org: "Samsung Electronics",
    period: "11/2023 – 04/2025",
    description: {
      cs: "Analýza zákaznických dat, pravidelné i ad-hoc reporty a datová podpora rozhodování pro divizi mobilních zařízení.",
      en: "Customer data analysis, recurring and ad-hoc reporting, and decision support for the mobile devices division."
    }
  },
  {
    title: { cs: "Stáž: implementace interního chatbota", en: "Internship: internal chatbot implementation" },
    org: "Albert Česká republika",
    period: "06/2023 – 09/2023",
    description: {
      cs: "Výběr chatbotového řešení, UX testování prototypu, mapování dat a tvorba funkční specifikace pro dodavatele. Vedení design thinking workshopu pro zaměstnance.",
      en: "Vendor selection, prototype UX testing, data mapping and functional specification. Ran a design thinking workshop for employees."
    }
  },
  {
    title: { cs: "ALM Specialist", en: "ALM Specialist" },
    org: "UniCredit Bank",
    period: "09/2021 – 01/2022",
    description: {
      cs: "Datová analýza a reporting v SQL a Excelu, výpočty nákladů pro korporátní a retailový segment.",
      en: "Data analysis and reporting in SQL and Excel, cost calculations for the corporate and retail segments."
    }
  },
  {
    title: { cs: "Trenér šachu", en: "Chess coach" },
    org: "Šachová škola Vávra a Černoušek",
    period: "09/2020 – @present",
    description: {
      cs: "Individuální a skupinové tréninky pro hráče všech věkových kategorií.",
      en: "Individual and group coaching for players of all ages."
    }
  }
];

export const earlierRoles: Localized = {
  cs: "Dříve: lektor angličtiny a matematiky · turistický průvodce · tazatel marketingového průzkumu",
  en: "Earlier: English and maths tutor · tour guide · market research interviewer"
};

export const education: Education[] = [
  { title: { cs: "Kognitivní informatika (Ing.)", en: "Cognitive Informatics (MSc)" }, org: "VŠE Praha", period: "2023–2026" },
  { title: { cs: "Informační média a služby (Bc.)", en: "Information Media and Services (BSc)" }, org: "VŠE Praha", period: "2020–2023" },
  { title: { cs: "Information Systems", en: "Information Systems" }, org: "Erasmus+, Liechtenstein", period: "2024–2025" },
  { title: { cs: "Sales Management", en: "Sales Management" }, org: "VŠE Praha, @minor", period: "" }
];

export const skillsDaily = ["SQL", "Python", "Databricks", "PySpark", "Power BI", "Azure"];
export const skillsBasic = ["R", "JavaScript", "Tableau", "Git", "HTML / CSS", "Figma", "Linux"];

export const languages: { name: Localized; level: Localized }[] = [
  { name: { cs: "Čeština", en: "Czech" }, level: { cs: "rodilý mluvčí", en: "native" } },
  { name: { cs: "Angličtina", en: "English" }, level: { cs: "C1", en: "C1" } },
  { name: { cs: "Španělština", en: "Spanish" }, level: { cs: "B1", en: "B1" } }
];

export const certificates = [
  "Certificate in Advanced English (CAE)",
  "Introduction to Databricks",
  "Introduction to Power BI",
  "Elements of AI"
];
