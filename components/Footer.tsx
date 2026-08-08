import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';

export default function Footer() {
  const t = useTranslations('footer');
  const nav = useTranslations('nav');

  return (
    <footer className="bg-secondary mt-20 border-t border-gray-700">
      <div className="container py-14 border-b border-gray-700 text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-3">{t('bannerTitle')}</h2>
        <p className="text-gray-400 mb-6 max-w-xl mx-auto">{t('bannerLead')}</p>
        <Link href="/schedule-time" className="btn-primary">{t('bannerButton')} →</Link>
      </div>

      <div className="container py-12">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-xl font-bold mb-4 gradient-text">Petr Hollan</h3>
            <p className="text-gray-400 text-sm mb-4">{t('bio')}</p>
            <Link href="/schedule-time" className="text-sm text-red-400 hover:text-red-300 transition-colors font-medium">
              {t('footerCta')} →
            </Link>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">{t('navTitle')}</h3>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><Link href="/work" className="hover:text-red-400 transition-colors">{nav('work')}</Link></li>
              <li><Link href="/cv" className="hover:text-red-400 transition-colors">{nav('cv')}</Link></li>
              <li><Link href="/free-time" className="hover:text-red-400 transition-colors">{nav('freeTime')}</Link></li>
              <li><Link href="/schedule-time" className="hover:text-red-400 transition-colors">{nav('scheduleTime')}</Link></li>
              <li><Link href="/hustle" className="hover:text-red-400 transition-colors">{nav('hustle')}</Link></li>
              <li><Link href="/inspiration" className="hover:text-red-400 transition-colors">{nav('inspiration')}</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">{t('contactTitle')}</h3>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><a href="mailto:petr@hollan.eu" className="hover:text-red-400 transition-colors">petr@hollan.eu</a></li>
              <li><a href="https://cz.linkedin.com/in/petr-hollan" target="_blank" rel="noopener noreferrer" className="hover:text-red-400 transition-colors">LinkedIn ↗</a></li>
              <li><a href="https://www.chess.com/cs/member/pedroholly22" target="_blank" rel="noopener noreferrer" className="hover:text-red-400 transition-colors">Chess.com ↗</a></li>
              <li><a href="https://www.triatlony.com/bezecke-tabulky/zavodnici/286167-hollan-petr" target="_blank" rel="noopener noreferrer" className="hover:text-red-400 transition-colors">{t('running')} ↗</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 pt-8 text-center text-gray-500 text-sm">
          <p>&copy; 2026 Petr Hollan</p>
        </div>
      </div>
    </footer>
  );
}
