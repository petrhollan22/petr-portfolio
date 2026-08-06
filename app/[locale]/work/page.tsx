import Link from 'next/link';
import { projects } from '@/data/projects';
import { workServices } from '@/data/services';
import ContactForm from '@/components/ContactForm';

export default function WorkPage() {
  return (
    <div className="bg-gradient-to-b from-primary to-secondary">
      {/* Hero */}
      <section className="container py-20">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4 gradient-text">Moje práce</h1>
          <p className="text-xl text-gray-400">
            Data engineering, AI solutions, a web development. Tady najdeš mé projekty a služby.
          </p>
        </div>
      </section>

      {/* Projects */}
      <section className="container py-16">
        <h2 className="section-title">Akademické projekty</h2>
        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project) => (
            <div key={project.id} className="card">
              <div className="mb-4">
                <span className="text-sm text-purple-400 font-semibold">{project.year}</span>
                <h3 className="text-2xl font-bold mt-2">{project.title}</h3>
              </div>

              <p className="text-gray-400 mb-4">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-2 mb-6">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-purple-500/20 text-purple-300 text-sm rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block btn-primary text-sm"
              >
                Čti práci →
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* Services */}
      <section className="container py-16">
        <h2 className="section-title">Moje služby</h2>
        <p className="text-gray-400 mb-12 text-center max-w-2xl mx-auto">
          Nabízím řadu služeb zaměřených na data engineering, AI implementaci a web development. 
          Kontaktuj mě pro konzultaci nebo klikni na "Schedule time" a rezervuj si čas.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {workServices.map((service) => (
            <div
              key={service.id}
              className={`card bg-gradient-to-br ${service.color} hover:scale-105 transition-transform`}
            >
              <div className="text-5xl mb-4">{service.icon}</div>
              <h3 className="text-xl font-bold mb-3">{service.name}</h3>
              <p className="text-gray-100 text-sm">
                {service.description}
              </p>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link href="/schedule-time" className="btn-primary">
            Rezervuj si čas →
          </Link>
        </div>
      </section>

      {/* Contact */}
      <section className="container py-16">
        <ContactForm />
      </section>
    </div>
  );
}
