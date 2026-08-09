export const categoryColorMap: Record<string, { bg: string; text: string }> = {
  Kniha: { bg: '#CECBF6', text: '#3C3489' },
  Book: { bg: '#CECBF6', text: '#3C3489' },
  Podcast: { bg: '#9FE1CB', text: '#085041' },
  'Web nebo nástroj': { bg: '#F0997B', text: '#4A1B0C' },
  'Website or tool': { bg: '#F0997B', text: '#4A1B0C' },
  'Kurz nebo workshop': { bg: '#85B7EB', text: '#042C53' },
  'Course or workshop': { bg: '#85B7EB', text: '#042C53' },
  'Akce nebo soutěž': { bg: '#F5C4B3', text: '#712B13' },
  'Event or competition': { bg: '#F5C4B3', text: '#712B13' },
  Místo: { bg: '#97C459', text: '#173404' },
  Place: { bg: '#97C459', text: '#173404' },
  Osoba: { bg: '#ED93B1', text: '#4B1528' },
  Person: { bg: '#ED93B1', text: '#4B1528' },
  'Něco jiného': { bg: '#B4B2A9', text: '#2C2C2A' },
  'Something else': { bg: '#B4B2A9', text: '#2C2C2A' },
};

export function getCategoryColor(category: string) {
  return categoryColorMap[category] || { bg: '#B4B2A9', text: '#2C2C2A' };
}
