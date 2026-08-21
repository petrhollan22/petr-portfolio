import type { Localized } from '@/lib/localized';

export interface TimelineEntry {
  year: string;
  icon: "trophy" | "crown" | "flag" | "airplane" | "medal" | "video" | "briefcase" | "users" | "graduation" | "pin" | "chart" | "certificate";
  title: Localized;
  text: Localized;
}

export const timeline: TimelineEntry[] = [
  {
    year: "Základní škola",
    icon: "users",
    title: { cs: "První kariérní rozhodnutí", en: "First career decision" },
    text: { cs: "Na základce jsem zjistil, že se rukama živit nebudu. Umřel bych hlady.", en: "In primary school I figured out I wouldn't make a living with my hands. I'd starve." }
  },
  {
    year: "2014",
    icon: "trophy",
    title: { cs: "První velký titul", en: "First big title" },
    text: { cs: "Obsadil jsem 1. místo na MČR družstev v rapid šachu.", en: "I took 1st place at the Czech Junior Team Rapid Championship." }
  },
  {
    year: "2015",
    icon: "crown",
    title: { cs: "FIDE Master", en: "FIDE Master" },
    text: { cs: "Získal jsem titul FIDE Master.", en: "I was awarded the FIDE Master title." }
  },
  {
    year: "2016",
    icon: "flag",
    title: { cs: "Reprezentace na Mistrovství Evropy", en: "Representing the country at the European Championship" },
    text: { cs: "Reprezentoval jsem Českou republiku na Mistrovství Evropy U18 v šachu.", en: "I represented the Czech Republic at the European Youth U18 Chess Championship." }
  },
  {
    year: "2017",
    icon: "graduation",
    title: { cs: "Čtyřka z informatiky", en: "A D in computer science" },
    text: { cs: "Na gymnáziu jsem dostal čtyřku z informatiky. Fakulta informatiky a statistiky pak byla jasná volba.", en: "I got a D in computer science at grammar school. The Faculty of Informatics and Statistics was then an obvious choice." }
  },
  {
    year: "2017–2018",
    icon: "airplane",
    title: { cs: "Rok v USA", en: "A year in the US" },
    text: { cs: "Strávil jsem rok v Pensylvánii a dokončil senior year na Elizabethtown Area High School. Vedle školy jsem pětkrát týdně trénoval volejbal.", en: "I spent a year in Pennsylvania and finished my senior year at Elizabethtown Area High School. Alongside school I trained volleyball five times a week." }
  },
  {
    year: "2019",
    icon: "medal",
    title: { cs: "Vícemistr České republiky", en: "Czech Republic runner-up" },
    text: { cs: "Obsadil jsem 2. místo na MČR juniorů v šachu.", en: "I took 2nd place at the Czech Junior Chess Championship." }
  },
  {
    year: "2020",
    icon: "video",
    title: { cs: "Šachy se přesunuly online", en: "Chess moved online" },
    text: { cs: "S příchodem covidu se změnil i šachový svět. Na Otevřeném MČR v online bleskovém šachu jsem získal ocenění pro nejlepšího streamera.", en: "With COVID, the chess world shifted online. I was named best streamer at the Czech Open Online Blitz Championship." }
  },
  {
    year: "2020",
    icon: "graduation",
    title: { cs: "Maturita a jedna dvojka", en: "Graduation and one B" },
    text: { cs: "Odmaturoval jsem se samými jedničkami, kromě jedné dvojky z ekonomie. Šel jsem tedy na VŠE, abych si to doučil.", en: "I graduated with straight A's, except one B in economics. So I went to the University of Economics to catch up." }
  },
  {
    year: "2021",
    icon: "briefcase",
    title: { cs: "První větší krok do businessu", en: "First real step into business" },
    text: { cs: "Nastoupil jsem jako ALM Specialist do UniCredit a zároveň jsem začal působit jako ambasador fakulty.", en: "I joined UniCredit as an ALM Specialist and became a faculty ambassador at the same time." }
  },
  {
    year: "2022",
    icon: "users",
    title: { cs: "Od účastníka k organizátorovi", en: "From participant to organiser" },
    text: { cs: "Stal jsem se součástí 4FISu jako koordinátor sportovních akcí.", en: "I joined 4FIS as a sports event coordinator." }
  },
  {
    year: "2023",
    icon: "graduation",
    title: { cs: "Data, AI a dokončený bakalář", en: "Data, AI and a finished bachelor's degree" },
    text: { cs: "Dokončil jsem bakalářské studium na VŠE, pracoval jako Data Analyst v Samsungu a dostal se do finále Profinit AI Talents.", en: "I finished my bachelor's degree at VŠE, worked as a Data Analyst at Samsung, and reached the finals of Profinit AI Talents." }
  },
  {
    year: "2024",
    icon: "pin",
    title: { cs: "Erasmus+ v Lichtenštejnsku", en: "Erasmus+ in Liechtenstein" },
    text: { cs: "Strávil jsem semestr na Universität Liechtenstein, kde se propojilo mezinárodní prostředí, technologie a business.", en: "I spent a semester at the University of Liechtenstein, where international environment, technology and business came together." }
  },
  {
    year: "2025",
    icon: "chart",
    title: { cs: "Business Intelligence & šachový leadership", en: "Business Intelligence & chess leadership" },
    text: { cs: "Nastoupil jsem jako BI Analyst v Albertu a zároveň vedl tým VŠE jako kapitán v Collegiate Chess League.", en: "I joined Albert as a BI Analyst and captained the VŠE team in the Collegiate Chess League." }
  },
  {
    year: "2026",
    icon: "certificate",
    title: { cs: "Ing.", en: "Ing." },
    text: { cs: "Další velký milník splněn. Dokončil jsem inženýrské studium.", en: "Another big milestone reached. I completed my engineering degree (Ing.)." }
  }
];
