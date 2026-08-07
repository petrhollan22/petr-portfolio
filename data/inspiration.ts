import type { Localized } from '@/lib/localized';

export interface InspirationCategory {
  id: string;
  name: Localized;
}

export const inspirationCategories: InspirationCategory[] = [
  { id: "book", name: { cs: "Kniha", en: "Book" } },
  { id: "podcast", name: { cs: "Podcast", en: "Podcast" } },
  { id: "web", name: { cs: "Web nebo nástroj", en: "Website or tool" } },
  { id: "course", name: { cs: "Kurz nebo workshop", en: "Course or workshop" } },
  { id: "event", name: { cs: "Akce nebo soutěž", en: "Event or competition" } },
  { id: "place", name: { cs: "Místo", en: "Place" } },
  { id: "person", name: { cs: "Osoba", en: "Person" } },
  { id: "other", name: { cs: "Něco jiného", en: "Something else" } }
];
