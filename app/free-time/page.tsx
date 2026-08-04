import { sports } from '@/data/sports';

export default function FreeTimePage() {
  return (
    <div className="bg-gradient-to-b from-primary to-secondary">
      {/* Hero */}
      <section className="container py-20">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4 gradient-text">Volný čas</h1>
          <p className="text-xl text-gray-400">
            Stejně jako v práci, mám rád výzvy i ve sportu. Tady se dozvíš víc o mých aktivitách.
          </p>
        </div>
      </section>

      {/* Sports Grid */}
      <section className="container py-16">
        <div className="grid md:grid-cols-2 gap-8">
          {sports.map((sport) => (
            <div key={sport.id} className="card">
              {/* Header */}
              <div className="mb-6">
                <h2 className="text-3xl font-bold mb-3">{sport.name}</h2>
                <p className="text-gray-400">
                  {sport.description}
                </p>
              </div>

              {/* Achievements */}
              <div className="bg-primary rounded-lg p-4 mb-6">
                <h3 className="text-lg font-semibold mb-3 text-purple-400">Úspěchy</h3>
                <ul className="space-y-2">
                  {sport.achievements.map((achievement, idx) => (
                    <li key={idx} className="text-gray-300 flex items-start">
                      <span className="mr-3 text-purple-400">✓</span>
                      {achievement}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Link */}
              {sport.link && (
                <a
                  href={sport.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block btn-primary text-sm"
                >
                  Více informací →
                </a>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Gallery Placeholder */}
      <section className="container py-16">
        <h2 className="section-title">Galerie</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="aspect-square bg-secondary rounded-lg flex items-center justify-center text-gray-500"
            >
              <div className="text-center">
                <div className="text-4xl mb-2">📸</div>
                <p className="text-sm">Fotka {i + 1}</p>
              </div>
            </div>
          ))}
        </div>
        <p className="text-center text-gray-400 mt-6">
          Fotky budou přidány brzy. Už jsi si připravil/a ty svoje? 😊
        </p>
      </section>

      {/* CTA */}
      <section className="container py-16 text-center">
        <h2 className="text-3xl font-bold mb-4">Chceš si zahrát?</h2>
        <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
          Ať už je to fotbal, volejbal, bouldering nebo cokoli dalšího — 
          můžeš si se mnou zamluvit čas!
        </p>
        <a href="/schedule-time" className="btn-primary">
          Rezervuj si čas →
        </a>
      </section>
    </div>
  );
}
