import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'recommendationPost',
  title: 'Doporučení',
  type: 'document',
  fields: [
    defineField({
      name: 'category',
      title: 'Kategorie',
      type: 'string',
      options: {
        list: [
          { title: 'Knihy', value: 'books' },
          { title: 'Podcasty', value: 'podcasts' },
          { title: 'Nástroje', value: 'tools' },
          { title: 'Zahraniční zdroje', value: 'international' },
        ],
        layout: 'radio',
      },
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'emoji',
      title: 'Emoji (volitelné)',
      type: 'string',
      description: 'např. 📚 nebo 🎙️',
    }),
    defineField({
      name: 'intro',
      title: 'Úvodní text',
      type: 'text',
      rows: 4,
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'items',
      title: 'Položky',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'title', title: 'Název', type: 'string', validation: (r) => r.required() }),
            defineField({ name: 'author', title: 'Autor / zdroj', type: 'string' }),
            defineField({ name: 'url', title: 'Odkaz', type: 'url' }),
            defineField({ name: 'note', title: 'Popisek', type: 'text', rows: 2 }),
          ],
          preview: {
            select: { title: 'title', subtitle: 'author' },
          },
        },
      ],
      validation: (r) => r.required().min(1),
    }),
    defineField({
      name: 'question',
      title: 'Závěrečná otázka (volitelná)',
      type: 'string',
      description: 'např. Máte některou přečtenou?',
    }),
    defineField({
      name: 'publishedAt',
      title: 'Datum publikace',
      type: 'datetime',
      validation: (r) => r.required(),
    }),
  ],
  orderings: [
    {
      title: 'Nejnovější',
      name: 'publishedAtDesc',
      by: [{ field: 'publishedAt', direction: 'desc' }],
    },
  ],
  preview: {
    select: { title: 'intro', subtitle: 'category' },
    prepare({ title, subtitle }) {
      const labels: Record<string, string> = {
        books: '📚 Knihy',
        podcasts: '🎙️ Podcasty',
        tools: '⚡ Nástroje',
        international: '🌍 Zahraniční',
      };
      return { title: title?.slice(0, 60), subtitle: labels[subtitle] ?? subtitle };
    },
  },
});
