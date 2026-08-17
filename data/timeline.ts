import type { Localized } from '@/lib/localized';

export interface TimelineEntry {
  year: string;
  icon: "trophy" | "crown" | "flag" | "airplane" | "medal" | "video" | "briefcase" | "users" | "graduation" | "pin" | "chart" | "certificate";
  title: Localized;
  text: Localized;
}

export const timeline: TimelineEntry[] = [
  {
    year: "2014",
    icon: "trophy",
    title: { cs: "První velký titul", en: "First big title" },
    text: { cs: "1. místo na MČR družstev v rapid šachu.", en: "1st place, Czech Junior Team Rapid Championship." }
  },
  {
    year: "2015",
    icon: "crown",
    title: { cs: "FIDE Master", en: "FIDE Master" },
    text: { cs: "Získal jsem titul FIDE Master.", en: "Awarded the FIDE Master title." }
  },
  {
    year: "2016",
    icon: "flag",
    title: { cs: "Reprezentace na Mistrovství Evropy", en: "Representing the country at the European Championship" },
    text: { cs: "Účast na Mistrovství Evropy U18 v šachu.", en: "Competed at the European Youth U18 Chess Championship." }
  },
  {
    year: "2017–2018",
    icon: "airplane",
    title: { cs: "Rok v USA", en: "A year in the US" },
    text: { cs: "Výměnný rok v Pensylvánii, senior year na Elizabethtown Area High School. Vedle školy volejbal pětkrát týdně.", en: "Exchange year in Pennsylvania, senior year at Elizabethtown Area High School. Played volleyball five times a week alongside school." }
  },
  {
    year: "2019",
    icon: "medal",
    title: { cs: "Vícemistr České republiky", en: "Czech Republic runner-up" },
    text: { cs: "2. místo na MČR juniorů v šachu.", en: "2nd place, Czech Junior Chess Championship." }
  },
  {
    year: "2020",
    icon: "video",
    title: { cs: "Šachy se přesunuly online", en: "Chess moved online" },
    text: { cs: "S příchodem covidu se změnil i šachový svět. Na Otevřeném MČR v online bleskovém šachu jsem získal ocenění pro nejlepšího streamera.", en: "With COVID, the chess world shifted online. I was named best streamer at the Czech Open Online Blitz Championship." }
  },
  {
    year: "2021",
    icon: "briefcase",
    title: { cs: "První větší krok do businessu", en: "First real step into business" },
    text: { cs: "ALM Specialist v UniCredit a zároveň ambasador fakulty.", en: "ALM Specialist at UniCredit, and became a faculty ambassador at the same time." }
  },
  {
    year: "2022",
    icon: "users",
    title: { cs: "Od účastníka k organizátorovi", en: "From participant to organiser" },
    text: { cs: "Koordinátor sportovních akcí ve 4FIS.", en: "Sports event coordinator at 4FIS." }
  },
  {
    year: "2023",
    icon: "graduation",
    title: { cs: "Data, AI a dokončený bakalář", en: "Data, AI and a finished bachelor's degree" },
    text: { cs: "Bakalářský titul na VŠE, Data Analyst v Samsungu a finále Profinit AI Talents.", en: "Bachelor's degree from VŠE, Data Analyst at Samsung, and finalist at Profinit AI Talents." }
  },
  {
    year: "2024",
    icon: "pin",
    title: { cs: "Erasmus+ v Lichtenštejnsku", en: "Erasmus+ in Liechtenstein" },
    text: { cs: "Semestr na Universität Liechtenstein, který propojil mezinárodní prostředí, technologie a business.", en: "A semester at the University of Liechtenstein, bridging international environment, technology and business." }
  },
  {
    year: "2025",
    icon: "chart",
    title: { cs: "Business Intelligence & šachový leadership", en: "Business Intelligence & chess leadership" },
    text: { cs: "BI Analyst v Albertu a kapitán týmu VŠE v Collegiate Chess League.", en: "BI Analyst at Albert and captain of the VŠE team in the Collegiate Chess League." }
  },
  {
    year: "2026",
    icon: "certificate",
    title: { cs: "Ing.", en: "Ing." },
    text: { cs: "Další velký milník splněn. Získal jsem titul inženýr.", en: "Another big milestone reached. Earned my engineering degree (Ing.)." }
  }
];
