import type { Localized } from '@/lib/localized';

export interface SportLink {
  label: Localized;
  url: string;
}

export interface Sport {
  id: string;
  name: Localized;
  description: Localized;
  achievements: Localized[];
  links?: SportLink[];
  videos?: SportLink[];
  coaching?: Localized;
  image?: string;
}

export const sports: Sport[] = [
  {
    id: "chess",
    name: { cs: "Šachy", en: "Chess" },
    description: {
      cs: "Šachy hraji od sedmi let a závodně od devíti. Za tu dobu jsem prošel juniorskými reprezentačními akcemi, extraligou i kapitánskou rolí. Dnes u šachu zůstávám hlavně jako trenér a organizátor.",
      en: "I have played chess since the age of seven and competitively since nine. Along the way I played junior international events, the national top league, and captained teams. These days I stay involved mainly as a coach and organiser."
    },
    achievements: [
      { cs: "FIDE Master", en: "FIDE Master" },
      { cs: "Účast na Mistrovství Evropy chlapců do 18 let (2016)", en: "European Youth Championship U18 (2016)" },
      { cs: "Česká šachová extraliga 2016/2017 za tým Tatran Litovel", en: "Czech Chess Extraliga 2016/2017 with Tatran Litovel" },
      { cs: "Kapitán vítězného týmu PROMAT OAZA PRAHA na MČR družstev mládeže 2015/2016", en: "Captain of PROMAT OAZA PRAHA, winners of the Czech Youth Team Championship 2015/2016" },
      { cs: "3. místo na MČR mládeže v kategorii H16 (2015)", en: "3rd place, Czech Youth Championship U16 (2015)" },
      { cs: "1. místo na MČR družstev starších žáků v rapid šachu", en: "1st place, Czech Junior Team Rapid Championship" },
      { cs: "Kapitán a hráč týmu VŠE v Collegiate Chess League (Fall 2025)", en: "Captain and player for VŠE in the Collegiate Chess League (Fall 2025)" }
    ],
    links: [
      { label: { cs: "Profil na Chess.com", en: "Chess.com profile" }, url: "https://www.chess.com/cs/member/pedroholly22" },
      { label: { cs: "FIDE profil", en: "FIDE profile" }, url: "https://ratings.fide.com/profile/360945" },
      { label: { cs: "ME chlapců do 18 let (2016)", en: "European Youth U18 (2016)" }, url: "http://chess-results.com/tnr233629.aspx?lan=5&art=9&fed=CZE&flag=30&snr=40" },
      { label: { cs: "Extraliga 2016/2017 — Tatran Litovel", en: "Extraliga 2016/2017 — Tatran Litovel" }, url: "https://www.chess.cz/soutez/2002/" },
      { label: { cs: "MČR družstev mládeže 2015/2016", en: "Czech Youth Team Championship 2015/2016" }, url: "https://www.chess.cz/soutez/1511/" },
      { label: { cs: "MČR mládeže H16 (2015)", en: "Czech Youth Championship U16 (2015)" }, url: "http://chess-results.com/tnr158508.aspx?lan=5&art=1" },
      { label: { cs: "MČR družstev v rapid šachu", en: "Czech Junior Team Rapid Championship" }, url: "http://chess-results.com/tnr136062.aspx?lan=5" },
      { label: { cs: "Collegiate Chess League (Fall 2025)", en: "Collegiate Chess League (Fall 2025)" }, url: "https://www.chess.cz/collegiate-chess-league-fall-2025/" }
    ],
    videos: [
      { label: { cs: "Komentář 3. kola šachy.cz Extraligy (2021)", en: "Commentary, round 3 of the Czech Extraliga (2021)" }, url: "https://www.youtube.com/watch?v=zazc-USGY5k" },
      { label: { cs: "Komentář 4. kola šachy.cz Extraligy (2021)", en: "Commentary, round 4 of the Czech Extraliga (2021)" }, url: "https://www.youtube.com/watch?v=zsJukjgxGfo" }
    ],
    image: "/images/sports/chess.jpg",
    coaching: {
      cs: "Šachy trénuji přes patnáct let. Nezáleží na věku, pohlaví ani na tom, jak daleko jste — důležitý je zájem se něco dozvědět. Mám zkušenosti se skupinovými i individuálními tréninky a vedu je offline i online podle domluvy.",
      en: "I have been coaching chess for over fifteen years. Age, gender and current level do not matter — what matters is the willingness to learn. I work with both groups and individuals, in person or online."
    }
  },
  {
    id: "running",
    name: { cs: "Běh", en: "Running" },
    description: {
      cs: "Běh je pro mě protiváha k práci u počítače — jasně měřitelný pokrok a čas o samotě. Střídám závodní tempo s během v přírodě.",
      en: "Running balances out desk work — measurable progress and time alone. I mix race pace with easy runs outdoors."
    },
    achievements: [
      { cs: "Maraton pod 4:20", en: "Marathon under 4:20" },
      { cs: "Půlmaraton pod 1:45", en: "Half marathon under 1:45" }
    ],
    links: [
      { label: { cs: "Běžecké tabulky na triatlony.com", en: "Race results on triatlony.com" }, url: "https://www.triatlony.com/bezecke-tabulky/zavodnici/286167-hollan-petr" }
    ]
  },
  {
    id: "volleyball",
    name: { cs: "Volejbal", en: "Volleyball" },
    description: {
      cs: "Volejbal jsem hrál během svého pobytu v USA. Baví mě na něm kombinace týmové souhry a rychlého rozhodování.",
      en: "I played volleyball during my time in the United States. I enjoy the mix of team play and fast decisions."
    },
    achievements: [
      { cs: "Hráno během pobytu v USA", en: "Played during a stay in the United States" }
    ]
  },
  {
    id: "football",
    name: { cs: "Fotbal", en: "Football" },
    description: {
      cs: "Fotbal jsem několik sezón hrál v Hanspaulské lize za Zenit Buštěhrad.",
      en: "I played several seasons of Prague's Hanspaulka league for Zenit Buštěhrad."
    },
    achievements: [
      { cs: "Několik sezón v Hanspaulské lize", en: "Several seasons in the Hanspaulka league" },
      { cs: "Tým Zenit Buštěhrad", en: "Zenit Buštěhrad" }
    ],
    links: [
      { label: { cs: "Zenit Buštěhrad — PSMF", en: "Zenit Buštěhrad — PSMF" }, url: "https://www.psmf.cz/souteze/2021-hanspaulska-liga-podzim/8-a/tymy/zenit-bustehrad/" }
    ]
  }
];
