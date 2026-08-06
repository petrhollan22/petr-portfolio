export interface SportLink {
  label: string;
  url: string;
}

export interface Sport {
  id: string;
  name: string;
  description: string;
  achievements: string[];
  links?: SportLink[];
  videos?: SportLink[];
  coaching?: string;
  color: string;
}

export const sports: Sport[] = [
  {
    id: "chess",
    name: "Šachy",
    description:
      "Šachy hraji od sedmi let a závodně od devíti. Za tu dobu jsem prošel juniorskými reprezentačními akcemi, extraligou i kapitánskou rolí. Dnes u šachu zůstávám hlavně jako trenér a organizátor.",
    achievements: [
      "FIDE Master",
      "Účast na Mistrovství Evropy chlapců do 18 let (2016)",
      "Česká šachová extraliga 2016/2017 za tým Tatran Litovel",
      "Kapitán vítězného týmu PROMAT OAZA PRAHA na MČR družstev mládeže 2015/2016",
      "3. místo na MČR mládeže v kategorii H16 (2015)",
      "1. místo na MČR družstev starších žáků v rapid šachu",
      "Kapitán a hráč týmu VŠE v Collegiate Chess League (Fall 2025)",
    ],
    links: [
      { label: "Profil na Chess.com", url: "https://www.chess.com/cs/member/pedroholly22" },
      { label: "FIDE profil", url: "https://ratings.fide.com/profile/360945" },
      { label: "ME chlapců do 18 let (2016)", url: "http://chess-results.com/tnr233629.aspx?lan=5&art=9&fed=CZE&flag=30&snr=40" },
      { label: "Extraliga 2016/2017 — Tatran Litovel", url: "https://www.chess.cz/soutez/2002/" },
      { label: "MČR družstev mládeže 2015/2016", url: "https://www.chess.cz/soutez/1511/" },
      { label: "MČR mládeže H16 (2015)", url: "http://chess-results.com/tnr158508.aspx?lan=5&art=1" },
      { label: "MČR družstev v rapid šachu", url: "http://chess-results.com/tnr136062.aspx?lan=5" },
      { label: "Collegiate Chess League (Fall 2025)", url: "https://www.chess.cz/collegiate-chess-league-fall-2025/" },
    ],
    videos: [
      { label: "Komentář 3. kola šachy.cz Extraligy (2021)", url: "https://www.youtube.com/watch?v=zazc-USGY5k" },
      { label: "Komentář 4. kola šachy.cz Extraligy (2021)", url: "https://www.youtube.com/watch?v=zsJukjgxGfo" },
    ],
    coaching:
      "Šachy trénuji přes osm let. Nezáleží na věku, pohlaví ani na tom, jak daleko jste — důležitý je zájem se něco dozvědět. Mám zkušenosti se skupinovými i individuálními tréninky a vedu je offline i online podle domluvy.",
    color: "from-blue-400 to-indigo-600",
  },
  {
    id: "running",
    name: "Běh",
    description:
      "Běh je pro mě protiváha k práci u počítače — jasně měřitelný pokrok a čas o samotě. Střídám závodní tempo s během v přírodě.",
    achievements: ["Maraton pod 4:20", "Půlmaraton pod 1:45"],
    links: [
      { label: "Běžecké tabulky na triatlony.com", url: "https://www.triatlony.com/bezecke-tabulky/zavodnici/286167-hollan-petr" },
    ],
    color: "from-red-400 to-orange-500",
  },
  {
    id: "volleyball",
    name: "Volejbal",
    description:
      "Volejbal jsem hrál během svého pobytu v USA. Baví mě na něm kombinace týmové souhry a rychlého rozhodování.",
    achievements: ["Hráno během pobytu v USA"],
    color: "from-yellow-400 to-orange-500",
  },
  {
    id: "football",
    name: "Fotbal",
    description:
      "Fotbal jsem několik sezón hrál v Hanspaulské lize za Zenit Buštěhrad.",
    achievements: ["Několik sezón v Hanspaulské lize", "Tým Zenit Buštěhrad"],
    links: [
      { label: "Zenit Buštěhrad — PSMF", url: "https://www.psmf.cz/souteze/2021-hanspaulska-liga-podzim/8-a/tymy/zenit-bustehrad/" },
    ],
    color: "from-green-400 to-emerald-600",
  },
];
