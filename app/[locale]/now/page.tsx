import { Link } from '@/i18n/routing';
import PageGlow from '@/components/PageGlow';
import { buildMetadata } from '@/lib/metadata';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return buildMetadata(locale, 'nowTitle', 'nowDescription', '/now');
}

export default function NowPage() {
  return (
    <div className="bg-gradient-to-b from-primary to-secondary">
      <section className="relative overflow-hidden container pt-20 pb-16 max-w-2xl mx-auto">
        <PageGlow />
        <p className="mono-label text-red-400 mb-4">Aktualizováno: září 2026</p>
        <h1 className="text-5xl font-bold mb-12 gradient-text">Teď</h1>
        <div className="space-y-10">
          <div>
            <h2 className="text-sm font-mono text-gray-500 uppercase tracking-widest mb-3">Čtu</h2>
            <p className="text-gray-300 leading-relaxed">
              <a href="https://www.alza.cz/media/zluta-kniha-budovani-znacky-dvanact-fenomenalnich-principu-pro-efektivni-budovani-osobni-firemni-ne-d12592840.htm" target="_blank" rel="noopener noreferrer" className="text-white font-semibold hover:text-red-400 transition-colors">Zluta kniha budovani znacky</a> — Michal Pastier. Dvanact principu, ktere jsem si puvodne koupil kvuli osobnimu brandu. Dostal jsem z toho vic.
            </p>
          </div>
          <div>
            <h2 className="text-sm font-mono text-gray-500 uppercase tracking-widest mb-3">Pracuju na</h2>
            <p className="text-gray-300 leading-relaxed">Porovnani loyalty metrik pro nekolik brandu v retailu. K tomu refaktoring cizich kodu a snaha pochopit byzny logiku, ktera za nimi stoji.</p>
          </div>
          <div>
            <h2 className="text-sm font-mono text-gray-500 uppercase tracking-widest mb-3">Resim</h2>
            <p className="text-gray-300 leading-relaxed">Jak prioritizovat vlastni zajmy a nepracovat na vecech, ktere dlouhodobe nedavaji smysl. Davat rychlou zpetnou vazbu, rikat co se mi nelibi. Jednodussi v teorii nez v praxi.</p>
          </div>
          <div>
            <h2 className="text-sm font-mono text-gray-500 uppercase tracking-widest mb-3">Planuju</h2>
            <ul className="space-y-3 text-gray-300">
              <li className="flex gap-3">
                <span className="mono-label text-red-400 shrink-0">8. 9.</span>
                <a href="https://lu.ma/3l2kk0j6" target="_blank" rel="noopener noreferrer" className="hover:text-red-400 transition-colors">DATA mesh #38 by Appsatori</a>
              </li>
              <li className="flex gap-3">
                <span className="mono-label text-red-400 shrink-0">30. 9.</span>
                <a href="https://msrehab.cz/novinka/rs-run-2026-bezime-pro-lepsi-zivot-s-roztrousenou-sklerozou" target="_blank" rel="noopener noreferrer" className="hover:text-red-400 transition-colors">RS Run 2026</a>
              </li>
              <li className="flex gap-3">
                <span className="mono-label text-red-400 shrink-0">Zari</span>
                <span>Business networking v Rumunsku a Bulharsku</span>
              </li>
              <li className="flex gap-3">
                <span className="mono-label text-red-400 shrink-0">3. 10.</span>
                <a href="https://naturemarathon.cz/propozice-a-program/" target="_blank" rel="noopener noreferrer" className="hover:text-red-400 transition-colors">Trebonskky pulmaraton</a>
              </li>
              <li className="flex gap-3">
                <span className="mono-label text-red-400 shrink-0">Rijen</span>
                <span>Prednaška o vnitrni odolnosti</span>
              </li>
            </ul>
          </div>
          <div>
            <h2 className="text-sm font-mono text-gray-500 uppercase tracking-widest mb-3">Hledam</h2>
            <p className="text-gray-300 leading-relaxed">Zajimave projekty a lidi. Pokud vis o necem, co by mohlo davat smysl — <Link href="/schedule-time" className="text-red-400 hover:text-red-300 transition-colors">ozvi se</Link>.</p>
          </div>
        </div>
        <p className="text-xs text-gray-600 mt-16">Inspired by <a href="https://nownownow.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-500 transition-colors">nownownow.com</a></p>
      </section>
    </div>
  );
}
