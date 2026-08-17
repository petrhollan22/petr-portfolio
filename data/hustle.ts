import type { Localized } from '@/lib/localized';

export interface HustleProject {
  id: string;
  title: Localized;
  description: Localized;
  type: "coaching" | "event" | "volunteer";
  cta: Localized;
  ctaLink: string;
  period?: string;
  bullets?: Localized[];
  image?: string;
}

export const hustleProjects: HustleProject[] = [
  {
    id: "chess-coaching",
    title: { cs: "Šachový trénink & mentoring", en: "Chess coaching & mentoring" },
    description: {
      cs: "Za šachovnicí jsem pracoval s různorodými skupinami, od začátečníků a juniorů až po ambiciózní hráče, kteří se chtěli výrazně posunout. Vedl jsem individuální i skupinové tréninky, přednášky, besedy i simultánky. Trénoval jsem v češtině, angličtině a několik svěřenců dokonce i ve španělštině. Dokážu pomoct také s přípravou na turnaje nebo se změnou mindsetu.",
      en: "Over the board I have worked with a wide range of groups, from beginners and juniors to ambitious players wanting to make a real leap forward. I have run individual and group lessons, talks, discussions and simultaneous exhibitions. I coach in Czech, English, and have taught a few students in Spanish as well. I can also help with tournament preparation or with a shift in mindset."
    },
    type: "coaching",
    cta: { cs: "Domluvit lekci", en: "Book a lesson" },
    ctaLink: "/schedule-time",
    bullets: [
      { cs: "Zapálení jedinci s ambicí se šachově významně zlepšit", en: "Committed individuals aiming for a real leap in their chess" },
      { cs: "Individuální příprava a plnění zadaných (ne)šachových úkolů", en: "Individual preparation and completing assigned chess (and non-chess) tasks" },
      { cs: "Přístup, disciplína a velké cíle", en: "Attitude, discipline and big goals" }
    ]
  },
  {
    id: "sports-events",
    title: { cs: "Organizace sportovních akcí", en: "Sports event coordination" },
    description: {
      cs: "Staral jsem se o to, aby studenti VŠE měli kde a s kým sportovat. Organizoval jsem turnaje a pravidelné akce ve volejbalu, badmintonu nebo třeba boulderingu.",
      en: "I made sure VŠE students had somewhere to play sports and people to play with. I organised tournaments and regular sessions in volleyball, badminton and bouldering, among others."
    },
    type: "event",
    period: "2022–2026",
    cta: { cs: "Web 4FIS", en: "4FIS website" },
    ctaLink: "https://4fis.cz/",
    bullets: [
      { cs: "Pořádání sportovních turnajů, tréninků a workshopů", en: "Running sports tournaments, training sessions and workshops" },
      { cs: "Zajištění sportovišť, vybavení a související logistiky", en: "Securing venues, equipment and related logistics" },
      { cs: "Hladká komunikace s účastníky i partnery akcí", en: "Smooth communication with participants and event partners" },
      { cs: "Vytváření příležitostí k setkávání a osobnímu rozvoji studentů", en: "Creating opportunities for students to connect and grow" }
    ]
  },
  {
    id: "university-ambassador",
    title: { cs: "Ambasador fakulty", en: "University ambassador" },
    description: {
      cs: "Pomáhal jsem středoškolákům s výběrem vysoké školy a představoval jim život na Fakultě informatiky a statistiky. Propojoval jsem uchazeče se světem dat a IT.",
      en: "I helped secondary school students choose their university and showed them what life at the Faculty of Informatics and Statistics is like, connecting applicants with the world of data and IT."
    },
    type: "volunteer",
    period: "2021–2026",
    cta: { cs: "Fakulta na LinkedIn", en: "Faculty on LinkedIn" },
    ctaLink: "https://cz.linkedin.com/school/fisvse/",
    image: "/images/hustle/plakat.jpg",
    bullets: [
      { cs: "Reprezentace fakulty: přednášky na Dnech otevřených dveří a veletrzích Gaudeamus (Praha a Brno)", en: "Representing the faculty: talks at Open Days and the Gaudeamus fairs (Prague and Brno)" },
      { cs: "Středoškolské výjezdy: osobní prezentace studijních programů na středních školách (přes 30 realizovaných přednášek)", en: "Secondary school visits: presenting study programmes at schools in person (30+ talks delivered)" },
      { cs: "Konzultace a mentoring: osobní i online poradenství pro budoucí studenty a uchazeče", en: "Consultations and mentoring: in-person and online guidance for prospective students and applicants" }
    ]
  },
  {
    id: "profinit-ai-hotspot",
    title: { cs: "Profinit AI Talents, finalista", en: "Profinit AI Talents, finalist" },
    description: {
      cs: "Finalista soutěže Profinit AI Talents. S Kristiánem Mellešem a Samuelem Čandíkem jsme se s projektem Online Meetings Optimization probojovali mezi deset nejlepších a představili ho ve finále na konferenci AI HotSpot.",
      en: "Finalist in the Profinit AI Talents competition. Together with Kristián Melleš and Samuel Čandík, our Online Meetings Optimization project reached the top ten and was presented at the AI HotSpot conference finals."
    },
    type: "event",
    cta: { cs: "O konferenci AI HotSpot", en: "About AI HotSpot" },
    ctaLink: "https://profinit.eu/events/ai-hotspot/",
    image: "/images/hustle/profinit.jpg"
  },
  {
    id: "sales-management-video",
    title: { cs: "Jak se dostat na Sales Management", en: "Getting into Sales Management" },
    description: {
      cs: "Sales Management je nejžádanější vedlejší specializace na VŠE a přijímací řízení stojí na jednominutovém videu. Nikde nebyla dostupná ukázka, jak takové video vypadá, tak jsem zveřejnil to svoje, se kterým jsem uspěl.",
      en: "Sales Management is the most sought-after minor at VŠE and admission hinges on a one-minute video. No examples were publicly available, so I published the one that got me in."
    },
    type: "volunteer",
    cta: { cs: "Podívat se na video", en: "Watch the video" },
    ctaLink: "https://www.linkedin.com/posts/petr-hollan_chcete-zv%C3%BD%C5%A1it-svoji-%C5%A1anci-se-dostat-na-ugcPost-7246797614686384129-8zq6/"
  }
];
