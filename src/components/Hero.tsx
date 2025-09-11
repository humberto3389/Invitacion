
export default function Hero() {

  return (
    <section className="relative h-screen w-full overflow-hidden" aria-label="Hero">
      {/* Imagen de fondo con parallax y overlay elegante */}
      <div className="absolute inset-0 z-0">
        <img
          src="/boda.jpg"
          className="h-full w-full object-cover scale-110 animate-pulse-slow"
          alt="Imagen de boda"
          loading="eager"
          decoding="async"
          width="1920"
          height="1080"
        />
        {/* Overlay con gradiente sofisticado */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/40 via-black/30 to-black/70" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
      </div>
      
      {/* Elementos decorativos modernos */}
      <div className="absolute inset-0 z-1 pointer-events-none overflow-hidden">
        {/* Círculos decorativos grandes */}
        <div className="absolute -top-20 -right-20 w-80 h-80 bg-gold/5 rounded-full blur-3xl animate-float-1"></div>
        <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-white/3 rounded-full blur-3xl animate-float-2"></div>
        
        {/* Partículas flotantes elegantes */}
        <div className="absolute top-1/4 left-1/4 w-1 h-1 bg-gold/60 rounded-full animate-float-3"></div>
        <div className="absolute top-1/3 right-1/3 w-0.5 h-0.5 bg-white/80 rounded-full animate-float-1"></div>
        <div className="absolute bottom-1/4 left-1/5 w-1.5 h-1.5 bg-gold/40 rounded-full animate-float-2"></div>
        <div className="absolute bottom-1/3 right-1/4 w-0.5 h-0.5 bg-white/60 rounded-full animate-float-3"></div>
        
        {/* Líneas decorativas sutiles */}
        <div className="absolute top-0 left-1/2 w-px h-32 bg-gradient-to-b from-gold/30 to-transparent transform -translate-x-1/2"></div>
        <div className="absolute bottom-0 left-1/2 w-px h-24 bg-gradient-to-t from-gold/30 to-transparent transform -translate-x-1/2"></div>
      </div>

      {/* Contenido principal con diseño moderno */}
      <div className="relative z-10 flex h-full items-center justify-center px-4 sm:px-6">
        <div className="text-center text-white max-w-4xl mx-auto">
          
          {/* Etiqueta superior elegante */}
          <div className="mb-6 sm:mb-8">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20">
              <span className="text-xs sm:text-sm font-light tracking-[0.3em] uppercase text-white/90">
                Nos Casamos
              </span>
            </div>
          </div>
          
          {/* Nombres de los novios con tipografía especial */}
          <div className="mb-6 sm:mb-8">
            <h1 className="relative">
              {/* Humberto con fuente elegante */}
              <span className="block font-serif text-4xl sm:text-6xl lg:text-7xl font-light text-white tracking-wide drop-shadow-2xl mb-2 sm:mb-4">
                Humberto
              </span>
              
              {/* Símbolo & con diseño especial */}
              <div className="relative flex items-center justify-center my-4 sm:my-6">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 sm:w-24 h-px bg-gradient-to-r from-transparent via-gold to-transparent"></div>
                </div>
                <span className="relative bg-black/20 backdrop-blur-sm px-4 py-2 rounded-full text-gold text-3xl sm:text-5xl lg:text-6xl font-light">
                  &
                </span>
              </div>
              
              {/* Nelida con fuente elegante */}
              <span className="block font-serif text-4xl sm:text-6xl lg:text-7xl font-light text-white tracking-wide drop-shadow-2xl">
                Nelida
              </span>
            </h1>
          </div>
          
          {/* Subtítulo con estilo moderno */}
          <div className="mb-8 sm:mb-10">
            <p className="text-sm sm:text-base font-light tracking-[0.2em] uppercase text-white/80 mb-4">
              Boda Cristiana ✝
            </p>
            
            {/* Línea decorativa con puntos */}
            <div className="flex items-center justify-center space-x-2 mb-6">
              <div className="w-2 h-2 bg-gold/60 rounded-full"></div>
              <div className="w-16 sm:w-24 h-px bg-gradient-to-r from-gold/60 via-gold to-gold/60"></div>
              <div className="w-2 h-2 bg-gold/60 rounded-full"></div>
            </div>
            
            <p className="text-lg sm:text-xl lg:text-2xl font-light text-white/95 tracking-wide">
              Sábado, 24 de Enero 2026
            </p>
            <p className="text-base sm:text-lg text-gold font-light mt-2">
              6:00 PM
            </p>
          </div>
          
          {/* Cita bíblica con diseño elegante */}
          <div className="mb-8 sm:mb-12 max-w-2xl mx-auto">
            <div className="relative">
              <div className="absolute -top-2 -left-2 text-gold/30 text-4xl font-serif">"</div>
              <p className="text-sm sm:text-base lg:text-lg font-light italic text-white/85 leading-relaxed px-4">
                El amor es paciente, es bondadoso… el amor nunca deja de ser.
              </p>
              <div className="absolute -bottom-2 -right-2 text-gold/30 text-4xl font-serif">"</div>
            </div>
            <p className="text-xs sm:text-sm text-gold/80 font-light mt-3 tracking-wider">
              — 1 Corintios 13
            </p>
          </div>
          
          {/* Invitación con estilo moderno */}
          <div className="mb-10 sm:mb-12">
            <p className="text-base sm:text-lg font-light text-white/90 max-w-xl mx-auto leading-relaxed">
              Están cordialmente invitados a celebrar con nosotros este día tan especial.
            </p>
          </div>
          
          {/* Botones con diseño moderno */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
            <a 
              href="#rsvp" 
              className="group relative inline-flex items-center px-8 py-4 rounded-full bg-gradient-to-r from-gold to-amber-500 text-black font-medium text-sm sm:text-base shadow-2xl shadow-gold/30 hover:shadow-gold/50 transition-all duration-300 hover:scale-105 overflow-hidden"
            >
              <span className="relative z-10">Confirmar Asistencia</span>
              <div className="absolute inset-0 bg-gradient-to-r from-amber-400 to-gold opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </a>
            
            <a 
              href="#galeria" 
              className="group inline-flex items-center px-8 py-4 rounded-full border-2 border-white/30 text-white font-medium text-sm sm:text-base backdrop-blur-sm hover:bg-white/10 hover:border-white/50 transition-all duration-300"
            >
              <span>Ver Galería</span>
              <svg className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      {/* Indicador de scroll elegante */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
        <div className="flex flex-col items-center text-white/60 animate-bounce">
          <span className="text-xs font-light mb-2 tracking-wider">Desliza</span>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>

    </section>
  )
}