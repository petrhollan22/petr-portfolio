export interface HustleProject {
  id: string;
  title: string;
  description: string;
  type: "coaching" | "event" | "volunteer" | "competition";
  cta: string;
  ctaLink?: string;
  icon: string;
  image?: string;
}

export const hustleProjects: HustleProject[] = [
  {
    id: "chess-coaching",
    title: "Chess coaching",
    description: "Koučuji začínající šachisty a juniory. Zaměřuji se na otevírací teorii, taktiku a strategii. Personalizované lekce online i offline.",
    type: "coaching",
    cta: "Zažádat o lekcí",
    ctaLink: "#contact",
    icon: "♟️",
    image: "/images/hustle/chess.jpg"
  },
  {
    id: "organizing-events",
    title: "Organizování sportovních akcí",
    description: "Jako sports event coordinator na VŠE jsem odpovědný za pořádání sportovních akcí pro studenty. Volejbal, badminton, bouldering, a další aktivity pro osobnostní rozvoj.",
    type: "event",
    cta: "Zjistit více",
    ctaLink: "https://cz.linkedin.com/company/4fis",
    icon: "🏐",
    image: "/images/hustle/events.jpg"
  },
  {
    id: "university-ambassador",
    title: "University Ambassador",
    description: "Jsem ambasadorem Fakulty informatiky a statistiky VŠE. Propaguju studijní programy na středních školách, účastním se dne otevřených dveří a edukačních festivalů (Gaudeamus Prague & Brno).",
    type: "volunteer",
    cta: "Spojit se",
    ctaLink: "#contact",
    icon: "🎓",
    image: "/images/hustle/ambassador.jpg"
  }
];
