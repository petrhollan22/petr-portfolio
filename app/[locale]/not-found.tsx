import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import PageGlow from '@/components/PageGlow';

export default function NotFound() {
  const t = useTranslations('notFound');

  return (
    <div className="bg-gradient-to-b from-primary to-secondary min-h-[70vh] flex items-center">
      <section className="relative overflow-hidden container py-20">
        <PageGlow />
        <div className="max-w-xl mx-auto text-center">
          <span className="inline-flex items-center justify-center w-12 h-12 rounded-md bg-red-600 text-white font-display font-bold text-lg mb-8">
            PH
          </span>
          <h1 className="text-3xl md:text-4xl font-bold mb-4 gradient-text">{t('title')}</h1>
          <p className="text-gray-400 mb-8">{t('lead')}</p>
          <ul className="text-gray-400 text-sm space-y-2 mb-10 text-left inline-block">
            <li>{t('option1')}</li>
            <li>{t('option2')}</li>
            <li>{t('option3')}</li>
          </ul>
          <div>
            <Link href="/" className="btn-primary">{t('cta')}<span className="btn-arrow">→</span></Link>
          </div>
        </div>
      </section>
    </div>
  );
}
