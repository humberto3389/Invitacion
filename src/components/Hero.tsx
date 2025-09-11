import { motion } from 'framer-motion'

// Elementos decorativos estáticos (sin animaciones)
const StaticDecorations = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Solo 3 elementos decorativos estáticos */}
      <div className="absolute top-1/4 left-10 w-2 h-2 rounded-full bg-gold/40"></div>
      <div className="absolute top-1/3 right-16 w-2 h-2 rounded-full bg-white/30"></div>
      <div className="absolute bottom-1/3 right-10 w-2 h-2 rounded-full bg-gold/30"></div>
    </div>
  )
}

export default function Hero() {

  return (
    <section className="relative h-[100svh] min-h-[500px] sm:min-h-[600px] lg:min-h-[700px] w-full overflow-hidden" aria-label="Hero">
      {/* Imagen de fondo estática (sin animación parallax) */}
      <div className="absolute inset-0 z-0">
        <img
          src="/boda.jpg"
          className="h-full w-full object-cover"
          alt="Imagen de boda"
          loading="eager"
          decoding="async"
          width="1920"
          height="1080"
        />
      </div>

      {/* Overlays con gradientes */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/40 to-black/70 z-1" />
      <div className="absolute inset-0 bg-gradient-to-r from-purple-900/10 via-transparent to-rose-900/10 z-1" />
      
      {/* Elementos decorativos estáticos */}
      <StaticDecorations />

      <div className="relative z-10 mx-auto flex h-full max-w-6xl flex-col items-center justify-end px-4 sm:px-6 text-center text-white pb-16 sm:pb-24 md:pb-32">
        <div className="relative w-full">
          {/* Halo radial sutil detrás del texto, sin caja visible */}
          <div className="pointer-events-none absolute inset-0 -z-10">
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] max-w-[900px] h-[60vh] max-h-[520px] rounded-full opacity-60"
                 style={{ background: 'radial-gradient(closest-side, rgba(0,0,0,0.45), rgba(0,0,0,0.2) 55%, transparent 70%)' }} />
          </div>

          {/* Contenido principal sin caja */}
          <div className="relative px-4 md:px-6 py-4">
            <p className="tracking-[0.3em] text-sm uppercase text-white/95 font-light mb-3" style={{ textShadow: '0 2px 12px rgba(0,0,0,0.65)' }}>
              Nos Casamos
            </p>
            
            <h1 className="mt-2 font-display text-4xl sm:text-6xl lg:text-7xl font-light" style={{ textShadow: '0 4px 18px rgba(0,0,0,0.7)' }}>
              Humberto <span className="text-gold font-script text-6xl sm:text-8xl lg:text-9xl relative top-2">&</span> Nelida
            </h1>
            
            <p className="mt-4 text-sm uppercase tracking-[0.2em] text-white/80 font-medium" style={{ textShadow: '0 2px 10px rgba(0,0,0,0.6)' }}>
              Boda Cristiana ✝
            </p>
            
            <div className="mx-auto mt-6 h-px w-32 bg-gradient-to-r from-transparent via-gold to-transparent" />
            
            <p className="mt-6 text-lg text-white/90 font-light tracking-wide" style={{ textShadow: '0 2px 12px rgba(0,0,0,0.6)' }}>
              Sábado, 24 de Enero 2026 · 6:00 PM
            </p>
            
            <p className="mt-4 text-base text-white/85 max-w-2xl mx-auto italic font-light" style={{ textShadow: '0 2px 12px rgba(0,0,0,0.6)' }}>
              "El amor es paciente, es bondadoso… el amor nunca deja de ser." — 1 Co. 13
            </p>
            
            <p className="mt-6 text-[1.05rem] text-white/95 font-light" style={{ textShadow: '0 3px 14px rgba(0,0,0,0.6)' }}>
              Están cordialmente invitados a celebrar con nosotros este día tan especial.
            </p>
            
            <div className="mt-10 flex flex-wrap items-center justify-center gap-5">
              <a href="#rsvp" className="rounded-full bg-gold px-8 py-4 font-medium text-neutral-900 shadow-2xl shadow-black/30 hover:brightness-105 transition-all duration-300">
                Confirmar asistencia
              </a>
              
              <a href="#galeria" className="rounded-full border border-white/40 px-8 py-4 text-white hover:bg-white/10 transition-all duration-300">
                Ver galería
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Flecha de scroll down estática */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
        <div className="flex flex-col items-center">
          <span className="text-white/70 text-sm mb-2">Scroll</span>
          <svg width="30" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 5V19M12 19L19 12M12 19L5 12" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>
    </section>
  )
}