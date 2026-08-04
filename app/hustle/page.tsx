import Link from 'next/link';
import { hustleProjects } from '@/data/hustle';
import ContactForm from '@/components/ContactForm';

export default function HustlePage() {
  return (
    <div className="bg-gradient-to-b from-primary to-secondary">
      {/* Hero */}
      <section className="container py-20">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4 gradient-text">Hustle</h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Vedle práce a sportu si rád věnuji svůj čas koučování, organizování akcí a dobrovolnické činnosti.
          </p>
        </div>
      </section>

      {/* Projects */}
      <section className="container py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {hustleProjects.map((project) => (
            <div key={project.id} className="card group hover:scale-105 transition-transform">
              <div className="text-5xl mb-4">{project.icon}</div>

              <h3 className="text-2xl font-bold mb-3">{project.title}</h3>

              <p className="text-gray-400 mb-6">
                {project.description}
              </p>

              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-purple-400 uppercase tracking-wider">
                  {project.type === 'coaching' && '🎓 Koučování'}
                  {project.type === 'event' && '🎉 Event'}
                  {project.type === 'volunteer' && '🤝 Dobrovolnictví'}
                  {project.type === 'competition' && '🏆 Soutěž'}
                </span>
              </div>

              {project.ctaLink && (
                <a
                  href={project.ctaLink}
                  className="inline-block mt-6 btn-primary text-sm"
                >
                  {project.cta} →
                </a>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Volunteer Experience Details */}
      <section className="container py-16">
        <h2 className="section-title">Dobrovolnická zkušenost</h2>

        <div className="space-y-8">
          {/* University Ambassador */}
          <div className="card">
            <div className="flex items-start gap-4 mb-4">
              <span className="text-4xl">🎓</span>
              <div>
                <h3 className="text-2xl font-bold">University Ambassador</h3>
                <p className="text-purple-400 font-semibold">Říjen 2021 – Leden 2026</p>
              </div>
            </div>

            <p className="text-gray-400 mb-4">
              Představitel Fakulty informatiky a statistiky VŠE, zodpovědný za propagaci studijních programů.
            </p>

            <ul className="space-y-2 text-gray-300">
              <li className="flex items-start gap-2">
                <span className="text-purple-400">✓</span>
                Návštěvy na středních školách s informacemi o studiu
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-400">✓</span>
                Fyzická a digitální propagace studijních materiálů
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-400">✓</span>
                Přednášky o studijních programech na dnu otevřených dveří
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-400">✓</span>
                Prezentace fakulty na festivalech vzdělání Gaudeamus v Praze a Brně
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-400">✓</span>
                Konzultace s uchazeči o studium
              </li>
            </ul>

            <a
              href="https://cz.linkedin.com/school/fisvse/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-6 btn-primary text-sm"
            >
              FIS VŠE →
            </a>
          </div>

          {/* Sports Event Coordinator */}
          <div className="card">
            <div className="flex items-start gap-4 mb-4">
              <span className="text-4xl">🏐</span>
              <div>
                <h3 className="text-2xl font-bold">Sports Event Coordinator</h3>
                <p className="text-purple-400 font-semibold">Leden 2022 – Leden 2026</p>
              </div>
            </div>

            <p className="text-gray-400 mb-4">
              Koordinátor sportovních akcí pro studenty VŠE. Odpovídám za pořádání a realizaci sportovních aktivit.
            </p>

            <ul className="space-y-2 text-gray-300">
              <li className="flex items-start gap-2">
                <span className="text-purple-400">✓</span>
                Koordinace volejbalu, badmintonu, boulderingu a dalších aktivit
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-400">✓</span>
                Komunikace s účastníky a profesionální email korespondence
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-400">✓</span>
                Zajištění vhodných prostor a vybavení pro jednotlivé akce
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-400">✓</span>
                Podpora osobního rozvoje studentů prostřednictvím sportu
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-400">✓</span>
                Facilitation sociálních interakcí mezi studenty
              </li>
            </ul>

            <a
              href="https://cz.linkedin.com/company/4fis"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-6 btn-primary text-sm"
            >
              4FIS →
            </a>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container py-16 text-center">
        <h2 className="text-3xl font-bold mb-4">Chceš se zapojit?</h2>
        <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
          Ať už chceš lekci šachu, chceš si zahrát sport nebo mě pozvat na event — kontaktuj mě!
        </p>
        <Link href="/schedule-time" className="btn-primary">
          Rezervuj si čas →
        </Link>
      </section>

      {/* Contact */}
      <section className="container py-16">
        <ContactForm />
      </section>
    </div>
  );
}
