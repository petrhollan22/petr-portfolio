import type { Localized } from '@/lib/localized';

export interface InspirationCategory {
  id: string;
  name: Localized;
  emoji: string;
}

export const inspirationCategories: InspirationCategory[] = [
  { id: "book", name: { cs: "Kniha", en: "Book" }, emoji: "📚" },
  { id: "podcast", name: { cs: "Podcast", en: "Podcast" }, emoji: "🎙️" },
  { id: "web", name: { cs: "Web nebo nástroj", en: "Website or tool" }, emoji: "🔧" },
  { id: "course", name: { cs: "Kurz nebo workshop", en: "Course or workshop" }, emoji: "🎓" },
  { id: "event", name: { cs: "Akce nebo soutěž", en: "Event or competition" }, emoji: "🏆" },
  { id: "place", name: { cs: "Místo", en: "Place" }, emoji: "📍" },
  { id: "person", name: { cs: "Osoba", en: "Person" }, emoji: "👤" },
  { id: "other", name: { cs: "Něco jiného", en: "Something else" }, emoji: "✨" },
];
