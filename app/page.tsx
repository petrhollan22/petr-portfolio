import Link from 'next/link';

export default function Home() {
  return (
    <div className="bg-gradient-to-b from-primary via-secondary to-primary">
      {/* Hero */}
      <section className="container py-40 text-center">
        <h1 className="text-6xl md:text-7xl font-black mb-6 gradient-text">
          Petr Hollan
        </h1>

        <p className="text-2xl text-gray-300 mb-4">
          Data Engineer & AI Consultant
        </p>

        <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-12">
          Specializing in data engineering, AI implementations, and web development.
          Marathon runner, chess master, football player. Always learning.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-20">
          <Link href="/work" className="btn-primary">
            Můj work →
          </Link>
          <Link href="/schedule-time" className="btn-secondary">
            Rezervuj si čas
          </Link>
        </div>

        {/* Quick Links */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Link href="/work" className="card text-left hover:border-purple-500">
            <h3 className="text-xl font-bold mb-2">💼 Work</h3>
            <p className="text-sm text-gray-400">Projekty a služby</p>
          </Link>

          <Link href="/free-time" className="card text-left hover:border-purple-500">
            <h3 className="text-xl font-bold mb-2">⚽ Free time</h3>
            <p className="text-sm text-gray-400">Sport a aktivity</p>
          </Link>

          <Link href="/schedule-time" className="card text-left hover:border-purple-500">
            <h3 className="text-xl font-bold mb-2">📅 Schedule</h3>
            <p className="text-sm text-gray-400">Rezervace času</p>
          </Link>

          <Link href="/hustle" className="card text-left hover:border-purple-500">
            <h3 className="text-xl font-bold mb-2">🚀 Hustle</h3>
            <p className="text-sm text-gray-400">Projekty & Events</p>
          </Link>
        </div>
      </section>

      {/* About Preview */}
      <section className="container py-20 border-t border-gray-800">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-6">O mně</h2>
            <p className="text-gray-400 mb-4">
              Jsem data engineer s pasí pro umělou inteligenci a optimalizaci procesů.
              Pracuji s Databricks, PySpark a Azure. Vedu data analytics projekty a konzultuji implementaci AI.
            </p>
            <p className="text-gray-400 mb-6">
              Mimo práci mám rád sport, cestování a vzdělávání dalších. Jsem FIDE master v šachách,
              maratonský běžec a aktivní v organizování sportovních akcí.
            </p>
            <Link href="/work" className="btn-primary">
              Víc o mně →
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="card text-center">
              <div className="text-4xl mb-2">📊</div>
              <p className="font-semibold">Data Engineering</p>
            </div>
            <div className="card text-center">
              <div className="text-4xl mb-2">🤖</div>
              <p className="font-semibold">AI Solutions</p>
            </div>
            <div className="card text-center">
              <div className="text-4xl mb-2">🎨</div>
              <p className="font-semibold">Web Design</p>
            </div>
            <div className="card text-center">
              <div className="text-4xl mb-2">♟️</div>
              <p className="font-semibold">Chess Master</p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="container py-20">
        <div className="grid md:grid-cols-4 gap-6 text-center">
          <div>
            <div className="text-4xl font-bold text-purple-400 mb-2">2</div>
            <p className="text-gray-400">Academic Degrees</p>
          </div>
          <div>
            <div className="text-4xl font-bold text-purple-400 mb-2">5+</div>
            <p className="text-gray-400">Years Experience</p>
          </div>
          <div>
            <div className="text-4xl font-bold text-purple-400 mb-2">2200+</div>
            <p className="text-gray-400">Chess ELO</p>
          </div>
          <div>
            <div className="text-4xl font-bold text-purple-400 mb-2">10</div>
            <p className="text-gray-400">Marathons Completed</p>
          </div>
        </div>
      </section>
    </div>
  );
}
