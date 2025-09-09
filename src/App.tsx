import './index.css'
import Countdown from './components/Countdown'
import Gallery from './components/Gallery'
import BackgroundAudio from './components/BackgroundAudio'
import RSVPForm from './components/RSVPForm'
import Guestbook from './components/Guestbook'
import Hero from './components/Hero'
import SectionTitle from './components/SectionTitle'
import ParticlesBackground from './components/ParticlesBackground'
import SnowBackground from './components/SnowBackground'

export default function App() {
  return (
    <div className="min-h-screen">
      <ParticlesBackground />
      <SnowBackground />
      <header className="relative">
        <Hero />
      </header>

      <main className="mx-auto max-w-5xl px-6">
        <section id="cuenta-regresiva" className="py-16 border-t border-neutral-100">
          <SectionTitle>Cuenta regresiva</SectionTitle>
          <Countdown date="2026-01-24T18:00:00" />
        </section>

        <section id="galeria" className="py-16 border-t border-neutral-100">
          <SectionTitle>Galería</SectionTitle>
          <Gallery />
        </section>

        <section id="mapa" className="py-16 border-t border-neutral-100">
          <SectionTitle>Ubicación</SectionTitle>
          <div className="aspect-[16/9] w-full overflow-hidden rounded-2xl">
            <iframe
              title="Ubicación"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.086693940412!2d-122.419415!3d37.774929!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzfCsDQ2JzMwLjgiTiAxMjLCsDI1JzA5LjkiVw!5e0!3m2!1ses!2s!4v1610000000000!5m2!1ses!2s"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
        </section>

        <section id="rsvp" className="py-16 border-t border-neutral-100">
          <SectionTitle>Confirma tu asistencia</SectionTitle>
          <div className="mx-auto max-w-xl rounded-2xl bg-white/70 backdrop-blur-md p-6 shadow-md ring-1 ring-neutral-100">
            <RSVPForm />
          </div>
        </section>

        <section id="muro" className="py-16 border-t border-neutral-100">
          <SectionTitle>Déjanos un mensaje</SectionTitle>
          <Guestbook />
        </section>
      </main>

      <footer className="border-t border-neutral-100 py-8 text-center text-neutral-500">
        Con amor, Humberto & Nelida
      </footer>
      <BackgroundAudio src="/audio.mp3" />
      </div>
  )
}
