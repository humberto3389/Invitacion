import './index.css'
import BackgroundAudio from './components/BackgroundAudio'
import Countdown from './components/Countdown'
import Gallery from './components/Gallery'
import RSVPForm from './components/RSVPForm'
import Guestbook from './components/Guestbook'
import Hero from './components/Hero'
import SectionTitle from './components/SectionTitle'

export default function App() {
  return (
    <div className="min-h-screen">
      {/* Backgrounds removidos para optimizar rendimiento */}
      <header className="relative">
        <Hero />
      </header>

      <main className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <section id="cuenta-regresiva" className="py-8 sm:py-12 lg:py-16 border-t border-neutral-100">
          <SectionTitle>Cuenta regresiva</SectionTitle>
          <Countdown date="2026-01-24T18:00:00" />
        </section>

        <section id="galeria" className="py-8 sm:py-12 lg:py-16 border-t border-neutral-100">
          <SectionTitle>Galería</SectionTitle>
          <Gallery />
        </section>

        <section id="mapa" className="py-16 border-t border-neutral-100">
          <SectionTitle>Ubicación</SectionTitle>
          <div className="aspect-[16/9] w-full overflow-hidden rounded-2xl bg-neutral-100 flex items-center justify-center">
            <div className="text-center p-8">
              <div className="w-16 h-16 mx-auto mb-4 bg-gold/20 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                </svg>
              </div>
              <h3 className="text-lg font-medium text-neutral-700 mb-2">Iglesia San José</h3>
              <p className="text-neutral-600 mb-4">Av. Principal 123, Ciudad</p>
              <button 
                onClick={() => window.open('https://maps.google.com/?q=Iglesia+San+Jose', '_blank')}
                className="bg-gold text-neutral-900 px-6 py-2 rounded-full hover:scale-105 transition-transform"
              >
                Ver en Google Maps
              </button>
            </div>
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
