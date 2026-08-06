import Link from 'next/link';

export default function Home() {
  return (
    <div className="bg-gradient-to-b from-primary via-secondary to-primary">
      <section className="container py-32 text-center">
        <h1 className="text-6xl md:text-7xl font-black mb-6 gradient-text">Petr Hollan</h1>
        <p className="text-2xl text-gray-300 mb-4">Data &amp; AI</p>
        <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-12">
          Pracuji s daty a umělou inteligencí. Mimo práci běhám, hraji a trénuji šachy a organizuji sportovní akce.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-20">
          <Link href="/work" className="btn-primary">Moje práce →</Link>
          <Link href="/schedule-time" className="btn-secondary">Rezervuj si čas</Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Link href="/work" className="card text-left hover:border-purple-500">
            <h3 className="text-xl font-bold mb-2">Work</h3>
            <p className="text-sm text-gray-400">Projekty a služby</p>
          </Link>
          <Link href="/free-time" className="card text-left hover:border-purple-500">
            <h3 className="text-xl font-bold mb-2">Free time</h3>
            <p className="text-sm text-gray-400">Sport a aktivity</p>
          </Link>
          <Link href="/schedule-time" className="card text-left hover:border-purple-500">
            <h3 className="text-xl font-bold mb-2">Schedule</h3>
            <p className="text-sm text-gray-400">Rezervace času</p>
          </Link>
          <Link href="/hustle" className="card text-left hover:border-purple-500">
            <h3 className="text-xl font-bold mb-2">Hustle</h3>
            <p className="text-sm text-gray-400">Projekty a akce</p>
          </Link>
        </div>
      </section>

      <section className="container py-20 border-t border-gray-800">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-6">O mně</h2>
            <p className="text-gray-400 mb-4">
              Věnuji se datům a umělé inteligenci. Vystudoval jsem VŠE, kde jsem se v diplomové práci zabýval tím, jak české firmy zavádějí AI do praxe.
            </p>
            <p className="text-gray-400 mb-6">
              Mimo práci jsem FIDE Master v šachu, běhám maratony a čtyři roky jsem na VŠE organizoval sportovní akce pro studenty.
            </p>
            <Link href="/work" className="btn-primary">Víc o mně →</Link>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="card text-center"><p className="font-semibold">Data Engineering</p></div>
            <div className="card text-center"><p className="font-semibold">AI Solutions</p></div>
            <div className="card text-center"><p className="font-semibold">Web Design</p></div>
            <div className="card text-center"><p className="font-semibold">Chess Coaching</p></div>
          </div>
        </div>
      </section>
    </div>
  );
}
