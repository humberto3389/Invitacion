
export default function Hero() {

  return (
    <section className="relative h-screen sm:h-[100svh] w-full overflow-hidden" aria-label="Hero">
      {/* Imagen de fondo única para todos los dispositivos */}
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

      {/* Overlay simplificado para móviles */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/60 z-1" />
      

      <div className="relative z-10 mx-auto flex h-full max-w-6xl flex-col items-center justify-center px-4 sm:px-6 text-center text-white">
        <div className="relative w-full">

          {/* Contenido principal sin caja */}
          <div className="relative px-4 md:px-6 py-4">
            <p className="tracking-[0.3em] text-xs sm:text-sm uppercase text-white/95 font-serif mb-2 drop-shadow-lg">
              Nos Casamos
            </p>
            
            <h1 className="mt-1 font-script text-3xl sm:text-6xl lg:text-7xl font-normal drop-shadow-2xl leading-tight">
              Humberto <span className="text-gold text-4xl sm:text-8xl lg:text-9xl relative top-1">&</span> Nelida
            </h1>
            
            <p className="mt-2 text-xs sm:text-sm uppercase tracking-[0.2em] text-white/80 font-serif drop-shadow-lg">
              Boda Cristiana ✝
            </p>
            
            <div className="mx-auto mt-4 h-px w-24 sm:w-32 bg-gradient-to-r from-transparent via-gold to-transparent" />
            
            <p className="mt-4 text-sm sm:text-lg text-white/90 font-serif tracking-wide drop-shadow-lg">
              Sábado, 24 de Enero 2026 · 6:00 PM
            </p>
            
            <p className="mt-3 text-sm sm:text-base text-white/85 max-w-xs sm:max-w-2xl mx-auto italic font-serif drop-shadow-lg">
              "El amor es paciente, es bondadoso… el amor nunca deja de ser." — 1 Co. 13
            </p>
            
            <p className="mt-4 text-sm sm:text-lg text-white/95 font-serif drop-shadow-lg max-w-sm sm:max-w-none mx-auto">
              Están cordialmente invitados a celebrar con nosotros este día tan especial.
            </p>
            
            <div className="mt-6 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-5">
              <a href="#rsvp" className="rounded-full bg-gold px-6 sm:px-8 py-3 sm:py-4 font-serif text-sm sm:text-base text-neutral-900 shadow-2xl hover:scale-105 transition-transform duration-300">
                Confirmar asistencia
              </a>
              
              <a href="#galeria" className="rounded-full border border-white/40 px-6 sm:px-8 py-3 sm:py-4 text-white font-serif text-sm sm:text-base hover:bg-white/10 transition-colors duration-300">
                Ver galería
              </a>
            </div>
          </div>
        </div>
      </div>

    </section>
  )
}