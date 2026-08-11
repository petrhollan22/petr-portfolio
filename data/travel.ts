import type { Localized } from '@/lib/localized';

export interface Country {
  name: Localized;
  flag: string;
}

export const countriesVisited: Country[] = [
  { name: { cs: "Anglie", en: "England" }, flag: "" },
  { name: { cs: "Belgie", en: "Belgium" }, flag: "🇧🇪" },
  { name: { cs: "Chorvatsko", en: "Croatia" }, flag: "🇭🇷" },
  { name: { cs: "Dominikánská republika", en: "Dominican Republic" }, flag: "🇩🇴" },
  { name: { cs: "Dánsko", en: "Denmark" }, flag: "🇩🇰" },
  { name: { cs: "Francie", en: "France" }, flag: "🇫🇷" },
  { name: { cs: "Irsko", en: "Ireland" }, flag: "🇮🇪" },
  { name: { cs: "Itálie", en: "Italy" }, flag: "🇮🇹" },
  { name: { cs: "Kanada", en: "Canada" }, flag: "🇨🇦" },
  { name: { cs: "Lichtenštejnsko", en: "Liechtenstein" }, flag: "🇱🇮" },
  { name: { cs: "Maďarsko", en: "Hungary" }, flag: "🇭🇺" },
  { name: { cs: "Monako", en: "Monaco" }, flag: "🇲🇨" },
  { name: { cs: "Nizozemsko", en: "Netherlands" }, flag: "🇳🇱" },
  { name: { cs: "Německo", en: "Germany" }, flag: "🇩🇪" },
  { name: { cs: "Polsko", en: "Poland" }, flag: "🇵🇱" },
  { name: { cs: "Portugalsko", en: "Portugal" }, flag: "🇵🇹" },
  { name: { cs: "Rakousko", en: "Austria" }, flag: "🇦🇹" },
  { name: { cs: "San Marino", en: "San Marino" }, flag: "🇸🇲" },
  { name: { cs: "Slovensko", en: "Slovakia" }, flag: "🇸🇰" },
  { name: { cs: "Slovinsko", en: "Slovenia" }, flag: "🇸🇮" },
  { name: { cs: "Thajsko", en: "Thailand" }, flag: "🇹🇭" },
  { name: { cs: "Tunisko", en: "Tunisia" }, flag: "🇹🇳" },
  { name: { cs: "Turecko", en: "Turkey" }, flag: "🇹🇷" },
  { name: { cs: "USA", en: "USA" }, flag: "🇺🇸" },
  { name: { cs: "Vatikán", en: "Vatican" }, flag: "🇻🇦" },
  { name: { cs: "Wales", en: "Wales" }, flag: "" },
  { name: { cs: "Česko", en: "Czech Republic" }, flag: "🇨🇿" },
  { name: { cs: "Řecko", en: "Greece" }, flag: "🇬🇷" },
  { name: { cs: "Španělsko", en: "Spain" }, flag: "🇪🇸" },
  { name: { cs: "Švédsko", en: "Sweden" }, flag: "🇸🇪" },
  { name: { cs: "Švýcarsko", en: "Switzerland" }, flag: "🇨🇭" },
];
