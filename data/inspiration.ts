import type { Localized } from '@/lib/localized';

export interface InspirationCategory {
  id: string;
  name: Localized;
  icon: "book" | "podcast" | "wrench" | "graduation" | "trophy" | "pin" | "user" | "sparkles";
}

export const inspirationCategories: InspirationCategory[] = [
  { id: "book", name: { cs: "Kniha", en: "Book" }, icon: "book" },
  { id: "podcast", name: { cs: "Podcast", en: "Podcast" }, icon: "podcast" },
  { id: "web", name: { cs: "Web nebo nástroj", en: "Website or tool" }, icon: "wrench" },
  { id: "course", name: { cs: "Kurz nebo workshop", en: "Course or workshop" }, icon: "graduation" },
  { id: "event", name: { cs: "Akce nebo soutěž", en: "Event or competition" }, icon: "trophy" },
  { id: "place", name: { cs: "Místo", en: "Place" }, icon: "pin" },
  { id: "person", name: { cs: "Osoba", en: "Person" }, icon: "user" },
  { id: "other", name: { cs: "Něco jiného", en: "Something else" }, icon: "sparkles" },
];
