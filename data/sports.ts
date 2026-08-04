export interface Sport {
  id: string;
  name: string;
  description: string;
  achievements: string[];
  link?: string;
  image?: string;
  color: string;
}

export const sports: Sport[] = [
  {
    id: "running",
    name: "Běh",
    description: "Marathon a ultra-distance běh je pro mě o překonávání limitů a mentální odolnosti. Kombinuji závodní přístup s příjemností běhání v přírodě.",
    achievements: [
      "Maraton sub 4:20",
      "Half marathon sub 1:45",
      "Pravidelné tréninky a závody"
    ],
    image: "/images/sports/running.jpg",
    color: "from-red-400 to-orange-500"
  },
  {
    id: "chess",
    name: "Šachy",
    description: "Šachy jsou mojí strategickou vášní od školních let. Kombinuji turnajový šach s výukou začínajících hráčů.",
    achievements: [
      "FIDE Master od 2015",
      "ELO rating 2200+",
      "Pravidelný účastník turnajů"
    ],
    link: "https://ratings.fide.com/profile/360945",
    image: "/images/sports/chess.jpg",
    color: "from-blue-400 to-indigo-600"
  },
  {
    id: "volleyball",
    name: "Volejbal",
    description: "Volejbal jsem hral během své doby v USA. Miluju kombinaci týmové práce a atletických výzev. Pravidelně hraji i doma v Praze.",
    achievements: [
      "Zkušenosti z amerických ligů",
      "Aktivní člen místního volejbalového klubu",
      "Turnajová zkušenost"
    ],
    image: "/images/sports/volleyball.jpg",
    color: "from-yellow-400 to-orange-500"
  },
  {
    id: "football",
    name: "Fotbal",
    description: "Fotbal jsem hrál za Zenit Buštěhrad v Hanspaulské lize. Rádo bych se k tomu vrátil a hrajeme občasně přátelská utkání.",
    achievements: [
      "Několik sezón v Hanspaulské lize",
      "Klub: Zenit Buštěhrad",
      "Zkušenost z ligových zápasů"
    ],
    link: "https://www.psmf.cz/souteze/2021-hanspaulska-liga-podzim/8-a/tymy/zenit-bustehrad/",
    image: "/images/sports/football.jpg",
    color: "from-green-400 to-emerald-600"
  }
];
