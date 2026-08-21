import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';

export default function Footer() {
  const t = useTranslations('footer');
  const nav = useTranslations('nav');

  return (
    <footer className="bg-primary mt-32 border-t border-gray-800">
      <div className="container py-20 border-b border-gray-800">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl mb-6">{t('bannerTitle')}</h2>
          <p className="text-gray-400 mb-10 leading-relaxed">{t('bannerLead')}</p>
          <Link href="/schedule-time" className="btn-primary">{t('bannerButton')}</Link>
        </div>
      </div>

      <div className="container py-16">
        <div className="grid md:grid-cols-3 gap-20 mb-16">
          <div>
            <h3 className="text-lg font-bold mb-6">Petr Hollan</h3>
            <p className="text-gray-400 text-sm mb-6 leading-relaxed">{t('bio')}</p>
            <Link href="/schedule-time" className="text-sm text-white hover:opacity-75 transition-opacity font-medium">
              {t('footerCta')} →
            </Link>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-6">{t('navTitle')}</h3>
            <ul className="space-y-3 text-gray-400 text-sm">
              <li><Link href="/work" className="hover:text-white transition-colors">{nav('work')}</Link></li>
              <li><Link href="/cv" className="hover:text-white transition-colors">{nav('cv')}</Link></li>
              <li><Link href="/free-time" className="hover:text-white transition-colors">{nav('freeTime')}</Link></li>
              <li><Link href="/schedule-time" className="hover:text-white transition-colors">{nav('scheduleTime')}</Link></li>
              <li><Link href="/hustle" className="hover:text-white transition-colors">{nav('hustle')}</Link></li>
              <li><Link href="/inspiration" className="hover:text-white transition-colors">{nav('inspiration')}</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-6">{t('contactTitle')}</h3>
            <ul className="space-y-3 text-gray-400 text-sm">
              <li><a href="mailto:petr@hollan.eu" className="hover:text-white transition-colors">petr@hollan.eu</a></li>
              <li><a href="https://cz.linkedin.com/in/petr-hollan" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">LinkedIn ↗</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-12 text-center text-gray-600 text-xs space-y-3">
          <p>&copy; 2026 Petr Hollan</p>
          <Link href="/privacy" className="hover:text-gray-400 transition-colors">Ochrana soukromí</Link>
        </div>
      </div>
    </footer>
  );
}
