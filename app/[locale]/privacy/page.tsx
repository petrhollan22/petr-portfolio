import { useTranslations } from 'next-intl';
import { buildMetadata } from '@/lib/metadata';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return buildMetadata(locale, 'privacyTitle', 'privacyDescription', '/privacy');
}

export default function PrivacyPage() {
  const t = useTranslations('privacy');

  return (
    <div className="bg-gradient-to-b from-primary to-secondary">
      <section className="container pt-20 pb-16 max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 gradient-text">{t('title')}</h1>
        <div className="space-y-6 text-gray-400 leading-relaxed">
          <p>{t('intro')}</p>

          <div>
            <h2 className="text-xl font-bold text-white mb-2">{t('formsTitle')}</h2>
            <p>{t('formsText')}</p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-white mb-2">{t('storageTitle')}</h2>
            <p>{t('storageText')}</p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-white mb-2">{t('protectionTitle')}</h2>
            <p>{t('protectionText')}</p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-white mb-2">{t('rightsTitle')}</h2>
            <p>{t('rightsText')}</p>
          </div>

          <p className="text-sm text-gray-500 pt-4 border-t border-gray-700">{t('disclaimer')}</p>
        </div>
      </section>
    </div>
  );
}
