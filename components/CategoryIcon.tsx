'use client';

import { BookOpen, Microphone, Wrench, GraduationCap, Trophy, MapPin, User, Sparkle } from '@phosphor-icons/react';

const categoryIconMap: Record<string, any> = {
  Kniha: BookOpen, Book: BookOpen,
  Podcast: Microphone,
  'Web nebo nástroj': Wrench, 'Website or tool': Wrench,
  'Kurz nebo workshop': GraduationCap, 'Course or workshop': GraduationCap,
  'Akce nebo soutěž': Trophy, 'Event or competition': Trophy,
  Místo: MapPin, Place: MapPin,
  Osoba: User, Person: User,
  'Něco jiného': Sparkle, 'Something else': Sparkle,
};

export default function CategoryIcon({ category, colorText }: { category: string; colorText: string }) {
  const Icon = categoryIconMap[category] || Sparkle;
  return <Icon weight="regular" className="w-6 h-6" style={{ color: colorText }} />;
}
