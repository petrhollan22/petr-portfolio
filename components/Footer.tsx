import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-secondary mt-20 py-12 border-t border-gray-700">
      <div className="container">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-xl font-bold mb-4 gradient-text">Petr Hollan</h3>
            <p className="text-gray-400 text-sm">Data &amp; AI. Praha, Česká republika.</p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Navigace</h3>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><Link href="/work" className="hover:text-purple-400 transition-colors">Work</Link></li>
              <li><Link href="/free-time" className="hover:text-purple-400 transition-colors">Free time</Link></li>
              <li><Link href="/schedule-time" className="hover:text-purple-400 transition-colors">Schedule time</Link></li>
              <li><Link href="/hustle" className="hover:text-purple-400 transition-colors">Hustle</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Kontakt</h3>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><a href="mailto:petr@hollan.eu" className="hover:text-purple-400 transition-colors">petr@hollan.eu</a></li>
              <li><a href="https://cz.linkedin.com/in/petr-hollan" target="_blank" rel="noopener noreferrer" className="hover:text-purple-400 transition-colors">LinkedIn ↗</a></li>
              <li><a href="https://www.chess.com/cs/member/pedroholly22" target="_blank" rel="noopener noreferrer" className="hover:text-purple-400 transition-colors">Chess.com ↗</a></li>
              <li><a href="https://www.triatlony.com/bezecke-tabulky/zavodnici/286167-hollan-petr" target="_blank" rel="noopener noreferrer" className="hover:text-purple-400 transition-colors">Běžecké výsledky ↗</a></li>
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
