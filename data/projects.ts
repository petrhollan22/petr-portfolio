import type { Localized } from '@/lib/localized';

export interface Project {
  id: string;
  title: Localized;
  description: Localized;
  url?: string;
  tags: string[];
  year: string;
  image?: string;
  links?: { label: Localized; url: string }[];
}

export const projects: Project[] = [
  {
    id: "bachelor",
    title: {
      cs: "Optimalizace digitální komunikace Fakulty informatiky a statistiky",
      en: "Optimising digital communication at the Faculty of Informatics and Statistics"
    },
    description: {
      cs: "Bakalářská práce zaměřená na komunikaci fakulty VŠE na sociálních sítích. Zahrnovala dotazníkové šetření se 194 respondenty, focus groups a benchmarking ostatních fakult, na jehož základě vznikla sada doporučení pro obsah, formu i cílení.",
      en: "Bachelor's thesis on the faculty's social media communication. It combined a survey of 194 respondents, focus groups and benchmarking against other faculties, resulting in recommendations on content, format and targeting."
    },
    url: "https://vskp.vse.cz/89655_optimalizace-digitalni-komunikace-fakulty-informatiky-a-statistiky?author=Hollan&page=1",
    tags: ["social media", "research", "communication"],
    year: "2022–2023"
  },
  {
    id: "master",
    title: {
      cs: "Implementace umělé inteligence ve firmách: Přínosy, výzvy a strategie",
      en: "AI adoption in companies: benefits, challenges and strategies"
    },
    description: {
      cs: "Diplomová práce o zralosti a strategiích adopce AI v českých firmách. Kvalitativní výzkum formou osmi srovnávacích případových studií od technologických startupů po nadnárodní korporace, s důrazem na governance a rámec EU AI Act.",
      en: "Master's thesis on AI maturity and adoption strategies in Czech companies. Qualitative research across eight comparative case studies, from technology startups to multinationals, focused on governance and the EU AI Act."
    },
    url: "https://vskp.vse.cz/98708_implementace-umele-inteligence-ve-firmach-prinosy-vyzvy-a-strategie?author=Hollan&page=1",
    tags: ["AI", "research", "strategy", "governance"],
    year: "2025"
  },
  {
    id: "meetings-optimization",
    title: {
      cs: "Online Meetings Optimization",
      en: "Online Meetings Optimization"
    },
    description: {
      cs: "Týmový projekt zkoumající, jak mohou AI asistenti ušetřit čas strávený na online schůzkách. Vznikl s Kristiánem Mellešem a Samuelem Čandíkem a probojoval se mezi deset finalistů soutěže Profinit AI Talents.",
      en: "A team project exploring how AI assistants can cut down the time spent in online meetings. Built with Kristián Melleš and Samuel Čandík, it reached the top ten in the Profinit AI Talents competition."
    },
    tags: ["AI", "productivity", "LLM"],
    year: "2024"
  },
  {
    id: "bizsim-cup",
    title: {
      cs: "BIZ SIM CUP 2023 — 6. místo",
      en: "BIZ SIM CUP 2023 — 6th place"
    },
    description: {
      cs: "Republikové finále manažersko-ekonomické soutěže v centrále Škoda Auto v Kosmonosech. V týmu VALENTYNKY jsme za VŠE obsadili 6. místo v mezinárodní konkurenci. Deset kol simulace ERPsim v prostředí SAP S/4HANA, kde jsme řídili obchodní a logistické operace, tvořili cenovou strategii a modelovali tržní trendy.",
      en: "National finals of a business simulation competition held at Škoda Auto headquarters. Competing for VŠE as team VALENTYNKY, we placed 6th in an international field. Ten rounds of ERPsim in SAP S/4HANA, running sales and logistics operations, setting pricing strategy and modelling market trends."
    },
    tags: ["SAP", "ERPsim", "business simulation"],
    year: "2023",
    image: "/images/projects/bizsim.jpg",
    links: [
      { label: { cs: "Výsledky soutěže", en: "Competition results" }, url: "https://bizsimcup.cz/results.aspx" },
      { label: { cs: "Článek na webu FIS", en: "Article on the FIS website" }, url: "https://fis.vse.cz/aktuality/uspech-studentu-fis-v-soutezi-bizsimcup-2023/" }
    ]
  }
];
