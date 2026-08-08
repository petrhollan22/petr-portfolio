import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'inspirationTip',
  title: 'Tip z Inspirace',
  type: 'document',
  fields: [
    defineField({ name: 'category', title: 'Kategorie', type: 'string' }),
    defineField({ name: 'name', title: 'Název', type: 'string' }),
    defineField({ name: 'link', title: 'Odkaz', type: 'url' }),
    defineField({ name: 'why', title: 'Proč', type: 'text' }),
    defineField({ name: 'from', title: 'Od koho', type: 'string' }),
    defineField({
      name: 'submittedAt',
      title: 'Odesláno',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: 'usedInDigest',
      title: 'Použito v souhrnu',
      type: 'boolean',
      initialValue: false,
    }),
  ],
});
