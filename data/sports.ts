import type { Localized } from '@/lib/localized';

export interface SportLink {
  label: Localized;
  url: string;
  thumbnail?: string;
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
  imageCaption?: Localized;
  image2?: string;
  image2Caption?: Localized;
  blogSlug?: string;
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
      { cs: "1. místo na MČR družstev starších žáků v rapid šachu (2014)", en: "1st place, Czech Junior Team Rapid Championship (2014)" },
      { cs: "3. místo na MČR mládeže v kategorii H16 (2015)", en: "3rd place, Czech Youth Championship U16 (2015)" },
      { cs: "Získání titulu FIDE Master (2015)", en: "Awarded the FIDE Master title (2015)" },
      { cs: "Kapitán vítězného týmu PROMAT OAZA PRAHA na MČR družstev mládeže 2015/2016", en: "Captain of PROMAT OAZA PRAHA, winners of the Czech Youth Team Championship 2015/2016" },
      { cs: "Účast na Mistrovství Evropy chlapců do 18 let (2016)", en: "European Youth Championship U18 (2016)" },
      { cs: "První sezóna v české šachové extralize 2016/2017 za tým Tatran Litovel", en: "First season in the Czech Chess Extraliga 2016/2017 with Tatran Litovel" },
      { cs: "Vícemistr na Mistrovství ČR juniorů a dorostenců (2019)", en: "Runner-up, Czech Junior Championship (2019)" },
      { cs: "Nejlepší streamer na Otevřeném MČR v online bleskovém šachu (2020)", en: "Best streamer, Czech Open Online Blitz Championship (2020)" },
      { cs: "Kapitán a hráč týmu VŠE v Collegiate Chess League (Fall 2025)", en: "Captain and player for VŠE in the Collegiate Chess League (Fall 2025)" }
    ],
    links: [
      { label: { cs: "Profil na Chess.com", en: "Chess.com profile" }, url: "https://www.chess.com/cs/member/pedroholly22" },
      { label: { cs: "FIDE profil", en: "FIDE profile" }, url: "https://ratings.fide.com/profile/360945" },
      { label: { cs: "ME chlapců do 18 let (2016)", en: "European Youth U18 (2016)" }, url: "http://chess-results.com/tnr233629.aspx?lan=5&art=9&fed=CZE&flag=30&snr=40" },
      { label: { cs: "Extraliga 2016/2017, Tatran Litovel", en: "Extraliga 2016/2017, Tatran Litovel" }, url: "https://www.chess.cz/soutez/2002/" },
      { label: { cs: "MČR družstev mládeže 2015/2016", en: "Czech Youth Team Championship 2015/2016" }, url: "https://www.chess.cz/soutez/1511/" },
      { label: { cs: "MČR mládeže H16 (2015)", en: "Czech Youth Championship U16 (2015)" }, url: "http://chess-results.com/tnr158508.aspx?lan=5&art=1" },
      { label: { cs: "MČR družstev v rapid šachu", en: "Czech Junior Team Rapid Championship" }, url: "http://chess-results.com/tnr136062.aspx?lan=5" },
      { label: { cs: "Collegiate Chess League (Fall 2025)", en: "Collegiate Chess League (Fall 2025)" }, url: "https://www.chess.cz/collegiate-chess-league-fall-2025/" },
      { label: { cs: "Vícemistr ČR juniorů (2019)", en: "Czech Junior Championship runner-up (2019)" }, url: "https://s1.chess-results.com/tnr417722.aspx?lan=5&art=1&turdet=YES&SNode=S0" },
      { label: { cs: "Nejlepší streamer, Online bleskové MČR (2020)", en: "Best streamer, Online Blitz Championship (2020)" }, url: "https://s1.chess-results.com/tnr526939.aspx?lan=5&art=9&fed=CZE&snr=48&SNode=S0" }
    ],
    videos: [
      { label: { cs: "Komentář 3. kola šachy.cz Extraligy (2021)", en: "Commentary, round 3 of the Czech Extraliga (2021)" }, url: "https://www.youtube.com/watch?v=zazc-USGY5k", thumbnail: "https://img.youtube.com/vi/zazc-USGY5k/hqdefault.jpg" },
      { label: { cs: "Komentář 4. kola šachy.cz Extraligy (2021)", en: "Commentary, round 4 of the Czech Extraliga (2021)" }, url: "https://www.youtube.com/watch?v=zsJukjgxGfo", thumbnail: "https://img.youtube.com/vi/zsJukjgxGfo/hqdefault.jpg" },
      { label: { cs: "Hodinka s mistrem ... s FM Petrem Hollanem", en: "An hour with a master ... with FM Petr Hollan" }, url: "https://www.youtube.com/watch?v=0dPcM4IDOJo", thumbnail: "https://img.youtube.com/vi/0dPcM4IDOJo/hqdefault.jpg" }
    ],
    image: "/images/sports/chess.jpg",
    imageCaption: { cs: "Rilton Cup 2025/2026 · Stockholm", en: "Rilton Cup 2025/2026 · Stockholm" },
    coaching: {
      cs: "Šachům se věnuji přes patnáct let, v šachové škole Vávra & Černoušek trénuji od roku 2020. Nezáleží na věku, pohlaví ani na tom, jak daleko jste. Důležitý je zájem se něco dozvědět. Mám zkušenosti se skupinovými i individuálními tréninky a vedu je offline i online podle domluvy.",
      en: "I have been playing and coaching chess for over fifteen years, with the Vávra & Černoušek chess school since 2020. Age, gender and current level do not matter. What matters is the willingness to learn. I work with both groups and individuals, in person or online."
    }
  },
  {
    id: "running",
    name: { cs: "Běh", en: "Running" },
    description: {
      cs: "Běh je pro mě protiváha k práci u počítače: jasně měřitelný pokrok a čas o samotě. Střídám závodní tempo s během v přírodě.",
      en: "Running balances out desk work: measurable progress and time alone. I mix race pace with easy runs outdoors."
    },
    achievements: [
      { cs: "Maraton 4:17:59", en: "Marathon 4:17:59" },
      { cs: "Půlmaraton 1:44:32", en: "Half marathon 1:44:32" }
    ],
    links: [
      { label: { cs: "Běžecké tabulky na triatlony.com", en: "Race results on triatlony.com" }, url: "https://www.triatlony.com/bezecke-tabulky/zavodnici/286167-hollan-petr" }
    ],
    image: "/images/sports/maraton.jpeg",
    imageCaption: { cs: "Vodafone Prague Marathon 2026", en: "Vodafone Prague Marathon 2026" },
    image2: "/images/sports/pulmaraton.jpeg",
    image2Caption: { cs: "Půlmaraton 1:44:32", en: "Half marathon 1:44:32" }
  },
  {
    id: "volleyball",
    name: { cs: "Volejbal", en: "Volleyball" },
    description: {
      cs: "Volejbal jsem hrál během svého pobytu v USA. Baví mě na něm kombinace týmové souhry a rychlého rozhodování.",
      en: "I played volleyball during my time in the United States. I enjoy the mix of team play and fast decisions."
    },
    achievements: [
      { cs: "1. místo, Buckskin Classic 2018 (Conestoga Valley High School, USA)", en: "1st place, Buckskin Classic 2018 (Conestoga Valley High School, USA)" },
      { cs: "3. místo, KPMG Fit Cup 2022", en: "3rd place, KPMG Fit Cup 2022" },
      { cs: "3. místo, Volejbalový turnaj Třebešín 2023", en: "3rd place, Třebešín Volleyball Tournament 2023" }
    ],
    links: [
      { label: { cs: "Výsledky KPMG Fit Cup 2022", en: "Results KPMG Fit Cup 2022" }, url: "https://volejbal.vse.cz/wp-content/uploads/post/7527/KPMG_Fit_Cup_2022-vysledky_nizsi_vykonnost.pdf" },
      { label: { cs: "Výsledky Třebešín 2023", en: "Results Třebešín 2023" }, url: "https://volejbal.vse.cz/wp-content/uploads/post/8212/volejbalovy-turnaj-trebesin-2023-NV.pdf" }
    ],
    image: "/images/sports/volejbal.jpg",
    imageCaption: { cs: "Buckskin Classic 2018 · Pensylvánie", en: "Buckskin Classic 2018 · Pennsylvania" }
  },
  {
    id: "football",
    name: { cs: "Fotbal", en: "Football" },
    description: {
      cs: "Fotbal jsem hrál několik sezón v Hanspaulské lize za Zenit Buštěhrad, většinou v bráně. Kromě toho pár přátelských turnajů, kde jsem získal medaile. Svůj fotbalový um nejčastěji uplatňuju na turnajích se šachisty, kde je konkurence… řekněme přiměřená.",
      en: "I played football for several seasons in Prague's Hanspaulka league with Zenit Buštěhrad, mostly in goal. Plus a few friendly tournaments where I picked up some medals. These days I mostly deploy my footballing skills at tournaments with chess players, where the competition is… let's say manageable."
    },
    achievements: [],
    links: [
      { label: { cs: "Zenit Buštěhrad, PSMF", en: "Zenit Buštěhrad, PSMF" }, url: "https://www.psmf.cz/souteze/2021-hanspaulska-liga-podzim/8-a/tymy/zenit-bustehrad/" }
    ],
    blogSlug: "fotbal-je-o-lidech-ne-o-skore"
  }
];
