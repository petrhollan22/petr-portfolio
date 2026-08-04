export interface Project {
  id: string;
  title: string;
  description: string;
  url: string;
  tags: string[];
  year: string;
  image?: string;
}

export const projects: Project[] = [
  {
    id: "bachelor",
    title: "Optimalizace digitální komunikace Fakulty informatiky a statistiky",
    description: "Bakalářská práce zaměřená na optimalizaci komunikace VŠE na sociálních sítích (Facebook, Instagram, LinkedIn). Zahrnovala kvalitativní výzkum (194 respondentů, focus groups) a konkrétní doporučení pro zlepšení efektivity komunikace se studenty, uchazeči a absolventy.",
    url: "https://vskp.vse.cz/89655_optimalizace-digitalni-komunikace-fakulty-informatiky-a-statistiky?author=Hollan&page=1",
    tags: ["social media", "research", "communication"],
    year: "2022–2023",
    image: "/images/projects/bachelor.jpg"
  },
  {
    id: "master",
    title: "Implementace umělé inteligence ve firmách: Přínosy, výzvy a strategie",
    description: "Diplomová práce na téma AI maturity a strategie adopce AI v českých firmách. Výzkum zahrnoval 8 případových studií technologických startupů až nadnárodních korporací s důrazem na governance, legislativu (EU AI Act) a praktické překážky implementace.",
    url: "https://vskp.vse.cz/98708_implementace-umele-inteligence-ve-firmach-prinosy-vyzvy-a-strategie?author=Hollan&page=1",
    tags: ["AI", "research", "strategy", "governance"],
    year: "2025",
    image: "/images/projects/master.jpg"
  }
];
