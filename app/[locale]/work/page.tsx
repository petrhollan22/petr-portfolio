import { useTranslations, useLocale } from 'next-intl';
import { Link } from '@/i18n/routing';
import { projects } from '@/data/projects';
import { workServices } from '@/data/services';
import { pick } from '@/lib/localized';
import ContactForm from '@/components/ContactForm';
import { buildMetadata } from '@/lib/metadata';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return buildMetadata(locale, 'workTitle', 'workDescription', '/work');
}

export default function WorkPage() {
  const t = useTranslations('work');
  const locale = useLocale();

  const categories = ['thesis', 'competition'] as const;

  return (
    <div className="bg-gradient-to-b from-primary to-secondary">
      <section className="container pt-20 pb-4 text-center">
        <h1 className="text-5xl font-bold mb-4 gradient-text">{t('title')}</h1>
        <p className="text-xl text-gray-400 max-w-2xl mx-auto">{t('lead')}</p>
      </section>

      {categories.map((cat) => {
        const items = projects
          .filter((p) => p.category === cat)
          .sort((a, b) => b.year.localeCompare(a.year));

        if (items.length === 0) return null;

        return (
          <section key={cat} className="container pt-16 pb-12">
            <h2 className="section-title">
              {cat === 'thesis' ? t('thesesTitle') : t('competitionsTitle')}
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              {items.map((p) => (
                <div key={p.id} className="card">
                  <span className="mono-label text-red-400">{p.year}</span>
                  <h3 className="text-2xl font-bold mt-2 mb-4">{pick(p.title, locale)}</h3>
                  <p className="text-gray-400 mb-4">{pick(p.description, locale)}</p>

                  {p.image && (
                    <img
                      src={p.image}
                      alt={pick(p.title, locale)}
                      className="w-full rounded-lg mb-4"
                      loading="lazy"
                    />
                  )}

                  <div className="flex flex-wrap gap-2 mb-6">
                    {p.tags.map((tag) => (
                      <span key={tag} className="px-3 py-1 bg-gray-700/50 text-gray-300 text-sm rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>

                  {p.url && (
                    <a href={p.url} target="_blank" rel="noopener noreferrer" className="inline-block btn-primary text-sm">
                      {t('readThesis')} →
                    </a>
                  )}

                  {p.links && p.links.length > 0 && (
                    <ul className="grid sm:grid-cols-2 gap-2">
                      {p.links.map((l) => (
                        <li key={l.url}>
                          <a href={l.url} target="_blank" rel="noopener noreferrer"
                            className="block px-4 py-2 bg-primary rounded-lg text-sm text-gray-300 hover:text-red-400 transition-colors">
                            {pick(l.label, locale)} ↗
                          </a>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </section>
        );
      })}

      <section className="container py-12">
        <h2 className="section-title">{t('servicesTitle')}</h2>
        <p className="text-gray-400 mb-12 text-center max-w-2xl mx-auto">{t('servicesLead')}</p>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {workServices.filter((s) => !s.hidden).map((s) => (
            <div key={s.id} className="card">
              <h3 className="text-xl font-bold mb-3">{pick(s.name, locale)}</h3>
              <p className="text-gray-400 text-sm">{pick(s.description, locale)}</p>
            </div>
          ))}
        </div>
        <div className="text-center">
          <Link href="/schedule-time" className="btn-primary">{t('bookCta')} →</Link>
        </div>
      </section>

      <section className="container py-16">
        <ContactForm />
      </section>
    </div>
  );
}
