const services = [
  {
    number: '01',
    title: 'Marke & Strategie',
    description:
      'Wir entwickeln klare Identitäten, starke Positionierungen und Marken, die im Kopf bleiben.',
  },
  {
    number: '02',
    title: 'Websites & Landingpages',
    description:
      'Digitale Erlebnisse, die komplexe Themen verständlich machen und Menschen überzeugen.',
  },
  {
    number: '03',
    title: 'Video & Animation',
    description:
      'Bewegte Bilder, die Technologien erklären, Emotionen wecken und Aufmerksamkeit schaffen.',
  },
  {
    number: '04',
    title: '3D Produktkommunikation',
    description:
      'Präzise Visualisierungen, die Produkte aus jeder Perspektive erlebbar machen.',
  },
]

function ArrowIcon() {
  return <span aria-hidden="true">↗</span>
}

function Header() {
  return (
    <header className="header">
      <a className="logo" href="#" aria-label="Maveo Startseite">
        MAVEO
      </a>

      <nav aria-label="Hauptnavigation">
        <a href="#services">Leistungen</a>
        <a href="#services">Agentur</a>
        <a href="#contact">Kontakt</a>
      </nav>

      <a className="header-cta" href="#contact">
        Kostenloses Erstgespräch <ArrowIcon />
      </a>
    </header>
  )
}

function VideoPlaceholder() {
  return (
    <div
      className="video-placeholder"
      role="img"
      aria-label="Showreel video placeholder"
    >
      <div className="video-grid" aria-hidden="true" />
      <div className="play-button" aria-hidden="true">
        <span>▶</span>
      </div>
      <div className="video-label">
        <span>Video placeholder</span>
        <strong>Showreel</strong>
      </div>
      <span className="video-duration">01:24</span>
    </div>
  )
}

function Hero() {
  return (
    <section className="hero" data-testid="hero">
      <div className="page-width">
        <Header />

        <div className="hero-layout">
          <div className="hero-copy">
            <p className="eyebrow">
              Kreativagentur für Marken- & Produktkommunikation
            </p>
            <h1>
              B2B beginnt <span>hier.</span>
            </h1>
            <p className="hero-intro">
              Wir machen komplexe Produkte sichtbar — klar, mutig und digital.
            </p>
          </div>

          <VideoPlaceholder />
        </div>

        <a className="scroll-cue" href="#services">
          Entdecken <span aria-hidden="true">↓</span>
        </a>
      </div>
    </section>
  )
}

function ServiceCard({ number, title, description }) {
  return (
    <article className="service-card">
      <div className="service-card-top">
        <span>{number}</span>
        <ArrowIcon />
      </div>
      <h3>{title}</h3>
      <p>{description}</p>
    </article>
  )
}

function ServicesSection() {
  return (
    <section className="services" id="services" data-testid="services">
      <div className="page-width">
        <div className="intro-grid">
          <p className="section-kicker">Was wir bewegen</p>
          <div>
            <h2>
              Wir machen B2B <span>sichtbar.</span>
            </h2>
            <p>
              Mit Strategie, Design und Technologie bringen wir Marken und
              Produkte auf den Punkt — für Kommunikation, die hängen bleibt.
            </p>
          </div>
        </div>

        <div className="services-heading">
          <p className="section-kicker">Leistungen & Lösungen</p>
          <p>
            Von der Markenidee bis zur digitalen Inszenierung: alles aus einer
            Hand, immer mit Fokus auf das Wesentliche.
          </p>
        </div>

        <div className="service-grid">
          {services.map((service) => (
            <ServiceCard key={service.title} {...service} />
          ))}
        </div>

        <a className="services-cta" id="contact" href="mailto:hello@maveo.de">
          Projekt starten <ArrowIcon />
        </a>
      </div>
    </section>
  )
}

export default function App() {
  return (
    <main className="site-shell">
      <Hero />
      <ServicesSection />
    </main>
  )
}
