import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'post',
  title: 'Článek',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Nadpis',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'URL adresa',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'excerpt',
      title: 'Krátký popis',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'coverImage',
      title: 'Titulní obrázek',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'publishedAt',
      title: 'Datum publikace',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: 'body',
      title: 'Obsah',
      type: 'array',
      of: [
        { type: 'block' },
        { type: 'image', options: { hotspot: true } },
        {
          type: 'object',
          name: 'embed',
          title: 'Vložený widget',
          fields: [
            { name: 'url', title: 'Embed URL nebo kód', type: 'text' },
            { name: 'caption', title: 'Popisek', type: 'string' },
          ],
        },
      ],
    }),
  ],
});
