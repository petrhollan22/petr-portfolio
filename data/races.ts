import type { Localized } from '@/lib/localized';

export interface Race {
  date: string;
  isoDate: string;
  day: string;
  time?: string;
  name: string;
  url: string;
  place: string;
  distance: number;
  shortVariant?: string;
  surface: string;
  profile: string;
}

export const races: Race[] = [
  { date: '22.03.2026', isoDate: '2026-03-22', day: 'Neděle', time: '10:00', name: 'Vysokomýtský půlmaraton', url: 'https://www.vysokomytskypulmaraton.cz/', place: 'Vysoké Mýto', distance: 21.1, surface: 'Asfalt', profile: 'Zvlněná rovina' },
  { date: '02.04.2026', isoDate: '2026-04-02', day: 'Čtvrtek', time: '19:30', name: 'Česko běží modře', url: 'https://www.ceskobezi.cz/', place: 'Praha Stromovka', distance: 4.8, surface: 'Asfalt', profile: 'Rovina' },
  { date: '03.04.2026', isoDate: '2026-04-03', day: 'Pátek', name: 'Pražský půlmaraton', url: 'https://www.runczech.com/', place: 'Praha', distance: 21.1, surface: 'Asfalt', profile: 'Rovina' },
  { date: '15.04.2026', isoDate: '2026-04-15', day: 'Středa', time: '18:00', name: 'Zbraslavská pila', url: 'https://www.trailrunningcup.cz/', place: 'Praha - Zbraslav', distance: 7, surface: 'Terén', profile: 'Kopce' },
  { date: '22.04.2026', isoDate: '2026-04-22', day: 'Středa', time: '19:00', name: 'Vaše liga', url: 'https://www.vaseliga.cz/behaci-liga/', place: 'Praha - Braník', distance: 10, shortVariant: '5', surface: 'Asfalt', profile: 'Rovina' },
  { date: '03.05.2026', isoDate: '2026-05-03', day: 'Neděle', time: '09:00', name: 'Runczech - Pražský maraton', url: 'https://www.runczech.com/', place: 'Praha', distance: 42.2, surface: 'Asfalt', profile: 'Rovina' },
  { date: '12.05.2026', isoDate: '2026-05-12', day: 'Úterý', name: 'ADRA Běh', url: 'https://adrabeh.cz/', place: 'Praha Hostivař', distance: 7, shortVariant: '3.5', surface: 'Asfalt/Terén', profile: 'Zvlněné' },
  { date: '16.05.2026', isoDate: '2026-05-16', day: 'Sobota', name: 'Martin Myšák', url: 'https://www.trailrunningcup.cz/', place: 'Orlické hory', distance: 21, shortVariant: '10', surface: 'Trail', profile: 'Kopce' },
  { date: '20.05.2026', isoDate: '2026-05-20', day: 'Středa', time: '18:00', name: 'Trail Modřanskou roklí', url: 'https://www.trailrunningcup.cz/', place: 'Praha - Modřany', distance: 15, shortVariant: '8', surface: 'Terén', profile: 'Kopce' },
  { date: '27.05.2026', isoDate: '2026-05-27', day: 'Středa', time: '19:00', name: 'Vaše liga', url: 'https://www.vaseliga.cz/behaci-liga/', place: 'Praha - Braník', distance: 10, shortVariant: '5', surface: 'Asfalt', profile: 'Rovina' },
  { date: '10.06.2026', isoDate: '2026-06-10', day: 'Středa', time: '18:00', name: 'Trail Zlíchovskými vyhlídkami', url: 'https://www.trailrunningcup.cz/', place: 'Praha Dívčí hrady', distance: 14, shortVariant: '7', surface: 'Terén', profile: 'Kopce' },
  { date: '14.06.2026', isoDate: '2026-06-14', day: 'Neděle', time: '10:30', name: 'Dobývání dívčích hradů', url: 'https://www.behej.com/terminovka', place: 'Praha - Hlubočepy', distance: 2, surface: 'Asfalt', profile: 'Do vrchu' },
  { date: '24.06.2026', isoDate: '2026-06-24', day: 'Středa', time: '19:00', name: 'Vaše liga', url: 'https://www.vaseliga.cz/behaci-liga/', place: 'Praha - Braník', distance: 10, shortVariant: '5', surface: 'Asfalt', profile: 'Rovina' },
  { date: '11.07.2026', isoDate: '2026-07-11', day: 'Sobota', name: 'Klínovec', url: 'https://www.trailrunningcup.cz/', place: 'Loučná pod Klínovcem', distance: 23, shortVariant: '11', surface: 'Trail', profile: 'Kopce' },
  { date: '29.08.2026', isoDate: '2026-08-29', day: 'Sobota', name: 'Jizerská 50', url: 'https://jiz50.cz/', place: 'Bedřichov', distance: 50, shortVariant: '23', surface: 'Trail', profile: 'Kopce' },
  { date: '05.09.2026', isoDate: '2026-09-05', day: 'Sobota', name: 'Birell Grand Prix', url: 'https://www.runczech.com/', place: 'Praha - Na Příkopě', distance: 10, surface: 'Asfalt/Dlažba', profile: 'Rovina' },
  { date: '13.09.2026', isoDate: '2026-09-13', day: 'Neděle', time: '09:35', name: 'Tiramisu Run', url: 'https://pikola.cc/', place: 'Praha 7', distance: 7, surface: '', profile: '' },
  { date: '16.09.2026', isoDate: '2026-09-16', day: 'Středa', name: 'Vaše liga', url: 'https://www.vaseliga.cz/behaci-liga/', place: 'Praha - Braník', distance: 10, surface: 'Asfalt', profile: 'Rovina' },
  { date: '19.09.2026', isoDate: '2026-09-19', day: 'Sobota', name: 'Železná Ruda', url: 'https://www.trailrunningcup.cz/', place: 'Železná Ruda', distance: 18, shortVariant: '13', surface: 'Trail', profile: 'Kopce' },
  { date: '27.09.2026', isoDate: '2026-09-27', day: 'Neděle', name: 'Praha - Běchovice', url: 'https://www.bechovice-praha.cz/', place: 'Běchovice', distance: 10, surface: 'Asfalt', profile: 'Zvlněná rovina' },
  { date: '30.09.2026', isoDate: '2026-09-30', day: 'Středa', name: 'RS Run - Obora Hvězda', url: 'https://www.behej.com/terminovka', place: 'Praha - Obora Hvězda', distance: 5, surface: '', profile: '' },
  { date: '03.10.2026', isoDate: '2026-10-03', day: 'Sobota', name: 'PUMA Třeboňský maraton', url: 'https://www.naturemarathon.cz/', place: 'Třeboň', distance: 42.2, shortVariant: '21.1, 10, 5', surface: 'Asfalt', profile: 'Rovina' },
  { date: '03.10.2026', isoDate: '2026-10-03', day: 'Sobota', name: 'Liberec Trail run', url: 'https://www.trailrunningcup.cz/', place: 'Liberec', distance: 22, shortVariant: '12', surface: 'Trail', profile: 'Kopce' },
  { date: '04.10.2026', isoDate: '2026-10-04', day: 'Neděle', name: 'Hradecký půlmaraton', url: 'https://www.hradeckypulmaraton.cz/', place: 'Hradec Králové', distance: 21.1, surface: 'Asfalt', profile: 'Rovina' },
  { date: '18.10.2026', isoDate: '2026-10-18', day: 'Neděle', name: 'Klánovický půlmaraton', url: 'https://www.klanovickypulmaraton.cz/', place: 'Praha - Klánovice', distance: 21.1, surface: 'Terén', profile: 'Zvlněná rovina' },
  { date: '18.10.2026', isoDate: '2026-10-18', day: 'Neděle', name: 'Klánovická 10ka', url: 'https://www.klanovickypulmaraton.cz/', place: 'Praha - Klánovice', distance: 10, surface: 'Terén', profile: 'Zvlněná rovina' },
  { date: '26.10.2026', isoDate: '2026-10-26', day: 'Neděle', name: 'Dresden Marathon', url: 'https://www.dresden-marathon.com/', place: 'Drážďany', distance: 42.2, surface: 'Asfalt', profile: 'Rovina' },
  { date: '26.10.2026', isoDate: '2026-10-26', day: 'Neděle', name: 'Dresden Půlmaraton', url: 'https://www.dresden-marathon.com/', place: 'Drážďany', distance: 21.1, surface: 'Asfalt', profile: 'Rovina' },
  { date: '28.10.2026', isoDate: '2026-10-28', day: 'Středa', name: 'Vaše liga - půlmaraton', url: 'https://www.vaseliga.cz/behaci-liga/', place: 'Praha - Braník', distance: 21.1, surface: 'Asfalt', profile: 'Rovina' },
  { date: '17.11.2026', isoDate: '2026-11-17', day: 'Úterý', name: 'Sametový běh', url: 'https://www.behej.com/terminovka', place: 'Odolena Voda', distance: 10, surface: 'Asfalt/Terén', profile: 'Zvlněný terén' },
  { date: '02.05.2027', isoDate: '2027-05-02', day: 'Neděle', time: '08:00', name: 'Vodafone Pražský maraton 2027', url: 'https://www.runczech.com/cs/akce/vodafone-maraton-praha-2027', place: 'Praha', distance: 42.2, shortVariant: '2Run', surface: 'Asfalt', profile: 'Rovina' },
];
