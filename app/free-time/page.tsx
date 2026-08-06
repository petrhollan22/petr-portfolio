import { sports } from '@/data/sports';

export default function FreeTimePage() {
  return (
    <div className="bg-gradient-to-b from-primary to-secondary">
      <section className="container py-20">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4 gradient-text">Volný čas</h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Sport mě drží v rovnováze s prací. Tady najdeš, čemu se věnuji a kam se u toho dá kouknout.
          </p>
        </div>
      </section>

      <section className="container py-8">
        <div className="space-y-8">
          {sports.map((sport) => (
            <div key={sport.id} className="card">
              <h2 className="text-3xl font-bold mb-3">{sport.name}</h2>
              <p className="text-gray-400 mb-6">{sport.description}</p>

              <div className="bg-primary rounded-lg p-5 mb-6">
                <h3 className="text-lg font-semibold mb-3 text-purple-400">Úspěchy</h3>
                <ul className="space-y-2">
                  {sport.achievements.map((achievement, idx) => (
                    <li key={idx} className="text-gray-300 flex items-start gap-3">
                      <span className="text-purple-400 shrink-0">✓</span>
                      <span>{achievement}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {sport.coaching && (
                <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-5 mb-6">
                  <h3 className="text-lg font-semibold mb-3 text-purple-400">Trénink</h3>
                  <p className="text-gray-300 mb-4">{sport.coaching}</p>
                  <a href="/schedule-time" className="btn-primary text-sm inline-block">
                    Domluvit trénink →
                  </a>
                </div>
              )}

              {sport.links && sport.links.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-3 text-purple-400">Odkazy</h3>
                  <ul className="grid sm:grid-cols-2 gap-2">
                    {sport.links.map((link) => (
                      <li key={link.url}>
                        <a href={link.url} target="_blank" rel="noopener noreferrer"
                          className="block px-4 py-2 bg-primary rounded-lg text-sm text-gray-300 hover:text-purple-400 transition-colors">
                          {link.label} ↗
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {sport.videos && sport.videos.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold mb-3 text-purple-400">Videa</h3>
                  <ul className="space-y-2">
                    {sport.videos.map((video) => (
                      <li key={video.url}>
                        <a href={video.url} target="_blank" rel="noopener noreferrer"
                          className="block px-4 py-2 bg-primary rounded-lg text-sm text-gray-300 hover:text-purple-400 transition-colors">
                          ▶ {video.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      <section className="container py-16 text-center">
        <h2 className="text-3xl font-bold mb-4">Chceš si zahrát?</h2>
        <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
          Ať už jde o fotbal, volejbal, bouldering nebo šachovou lekci — dá se se mnou domluvit čas.
        </p>
        <a href="/schedule-time" className="btn-primary">Rezervuj si čas →</a>
      </section>
    </div>
  );
}
