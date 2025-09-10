import { motion } from 'framer-motion'

// Componente de partículas para el fondo
const FloatingParticles = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(25)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-white/5"
          initial={{
            x: Math.random() * 100 + 'vw',
            y: Math.random() * 100 + 'vh',
            scale: Math.random() * 0.7 + 0.3,
            opacity: Math.random() * 0.3 + 0.1,
          }}
          animate={{
            x: [
              Math.random() * 100 + 'vw',
              Math.random() * 100 + 'vw',
              Math.random() * 100 + 'vw',
            ],
            y: [
              Math.random() * 100 + 'vh',
              Math.random() * 100 + 'vh',
              Math.random() * 100 + 'vh',
            ],
          }}
          transition={{
            duration: Math.random() * 40 + 20,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{
            width: Math.random() * 20 + 5 + 'px',
            height: Math.random() * 20 + 5 + 'px',
          }}
        />
      ))}
    </div>
  )
}

// Componente de efecto de confeti sutil
const SubtleConfetti = () => {
  const confetti = [...Array(15)]
  
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {confetti.map((_, i) => (
        <motion.div
          key={i}
          className="absolute"
          initial={{
            x: Math.random() * 100 + 'vw',
            y: -50,
            rotate: Math.random() * 360,
            opacity: 0,
          }}
          animate={{
            y: '100vh',
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: Math.random() * 5 + 3,
            delay: Math.random() * 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{
            width: '8px',
            height: '8px',
            background: ['#FFD700', '#FF6B6B', '#4ECDC4', '#C9A0DC', '#FFFFFF'][i % 5],
            borderRadius: i % 2 === 0 ? '50%' : '2px',
          }}
        />
      ))}
    </div>
  )
}

// Destellos elegantes (glints) con animación sutil
const SparkleGlints = () => {
  const glints = [...Array(36)]
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {glints.map((_, i) => (
        <motion.div
          key={i}
          className="absolute"
          initial={{
            x: Math.random() * 100 + 'vw',
            y: Math.random() * 100 + 'vh',
            scale: 0.7 + Math.random() * 1.1,
            rotate: Math.random() * 360,
            opacity: 0,
          }}
          animate={{
            opacity: [0, 1, 0],
            scale: [0.75, 1.2, 0.75],
            rotate: [0, 60, 0],
          }}
          transition={{
            duration: 3.2 + Math.random() * 3.5,
            delay: Math.random() * 5,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          style={{
            width: 16 + Math.random() * 22 + 'px',
            height: 16 + Math.random() * 22 + 'px',
            filter: 'drop-shadow(0 0 10px rgba(255,215,130,0.5)) drop-shadow(0 0 20px rgba(255,215,130,0.25))',
          }}
        >
          <svg viewBox="0 0 24 24" width="100%" height="100%" aria-hidden="true">
            <g>
              <path
                d="M12 2 L13.2 7.5 L18 9 L13.2 10.5 L12 16 L10.8 10.5 L6 9 L10.8 7.5 Z"
                fill="rgba(255, 245, 220, 1)"
              />
              <circle cx="12" cy="12" r="6" fill="url(#glow)" opacity="0.12" />
              <defs>
                <radialGradient id="glow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="rgba(255,230,150,0.6)" />
                  <stop offset="100%" stopColor="rgba(255,230,150,0)" />
                </radialGradient>
              </defs>
            </g>
          </svg>
        </motion.div>
      ))}
    </div>
  )
}

export default function Hero() {

  return (
    <section className="relative h-[100svh] min-h-[500px] sm:min-h-[600px] lg:min-h-[700px] w-full overflow-hidden" aria-label="Hero">
      {/* Imagen de fondo con efecto parallax */}
      <motion.div 
        initial={{ scale: 1.2 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.8, ease: "easeOut" }}
        className="absolute inset-0 z-0"
      >
        <video
          src="/hero.mp4"
          className="h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-label="Video de boda"
        />
      </motion.div>

      {/* Overlays con gradientes */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/40 to-black/70 z-1" />
      <div className="absolute inset-0 bg-gradient-to-r from-purple-900/10 via-transparent to-rose-900/10 z-1" />
      
      {/* Efecto de partículas */}
      <FloatingParticles />
      <SubtleConfetti />
      <SparkleGlints />

      {/* Elementos decorativos */}
      <div className="absolute top-1/4 left-10 w-2 h-2 rounded-full bg-gold/60 animate-pulse"></div>
      <div className="absolute top-1/3 right-16 w-3 h-3 rounded-full bg-white/40 animate-pulse"></div>
      <div className="absolute bottom-1/4 left-20 w-2 h-2 rounded-full bg-gold/40 animate-pulse"></div>
      <div className="absolute bottom-1/3 right-10 w-3 h-3 rounded-full bg-white/30 animate-pulse"></div>

      <div className="relative z-10 mx-auto flex h-full max-w-6xl flex-col items-center justify-end px-4 sm:px-6 text-center text-white pb-16 sm:pb-24 md:pb-32">
        <motion.div 
          initial={{ y: 50, opacity: 0, scale: 0.95 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="relative w-full"
        >
          {/* Halo radial sutil detrás del texto, sin caja visible */}
          <div className="pointer-events-none absolute inset-0 -z-10">
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] max-w-[900px] h-[60vh] max-h-[520px] rounded-full opacity-60"
                 style={{ background: 'radial-gradient(closest-side, rgba(0,0,0,0.45), rgba(0,0,0,0.2) 55%, transparent 70%)' }} />
          </div>

          {/* Contenido principal sin caja */}
          <div className="relative px-4 md:px-6 py-4">
            <motion.p 
              initial={{ y: 20, opacity: 0 }} 
              animate={{ y: 0, opacity: 1 }} 
              transition={{ delay: 0.3, duration: 0.8 }} 
              className="tracking-[0.3em] text-sm uppercase text-white/95 font-light mb-3"
              style={{ textShadow: '0 2px 12px rgba(0,0,0,0.65)' }}
            >
              Nos Casamos
            </motion.p>
            
            <motion.h1 
              initial={{ y: 30, opacity: 0 }} 
              animate={{ y: 0, opacity: 1 }} 
              transition={{ delay: 0.5, duration: 1, type: "spring", stiffness: 100 }}
              className="mt-2 font-display text-4xl sm:text-6xl lg:text-7xl font-light"
              style={{ textShadow: '0 4px 18px rgba(0,0,0,0.7)' }}
            >
              Humberto <span className="text-gold font-script text-6xl sm:text-8xl lg:text-9xl relative top-2">&</span> Nelida
            </motion.h1>
            
            <motion.p 
              initial={{ y: 20, opacity: 0 }} 
              animate={{ y: 0, opacity: 1 }} 
              transition={{ delay: 0.7, duration: 0.8 }} 
              className="mt-4 text-sm uppercase tracking-[0.2em] text-white/80 font-medium"
              style={{ textShadow: '0 2px 10px rgba(0,0,0,0.6)' }}
            >
              Boda Cristiana ✝
            </motion.p>
            
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.9, duration: 1.2 }}
              className="mx-auto mt-6 h-px w-32 bg-gradient-to-r from-transparent via-gold to-transparent"
            />
            
            <motion.p 
              initial={{ y: 20, opacity: 0 }} 
              animate={{ y: 0, opacity: 1 }} 
              transition={{ delay: 1.0, duration: 0.8 }} 
              className="mt-6 text-lg text-white/90 font-light tracking-wide"
              style={{ textShadow: '0 2px 12px rgba(0,0,0,0.6)' }}
            >
              Sábado, 24 de Enero 2026 · 6:00 PM
            </motion.p>
            
            <motion.p 
              initial={{ y: 20, opacity: 0 }} 
              animate={{ y: 0, opacity: 1 }} 
              transition={{ delay: 1.1, duration: 0.8 }} 
              className="mt-4 text-base text-white/85 max-w-2xl mx-auto italic font-light"
              style={{ textShadow: '0 2px 12px rgba(0,0,0,0.6)' }}
            >
              "El amor es paciente, es bondadoso… el amor nunca deja de ser." — 1 Co. 13
            </motion.p>
            
            <motion.p 
              initial={{ y: 20, opacity: 0 }} 
              animate={{ y: 0, opacity: 1 }} 
              transition={{ delay: 1.2, duration: 0.8 }} 
              className="mt-6 text-[1.05rem] text-white/95 font-light"
              style={{ textShadow: '0 3px 14px rgba(0,0,0,0.6)' }}
            >
              Están cordialmente invitados a celebrar con nosotros este día tan especial.
            </motion.p>
            
            <motion.div 
              initial={{ y: 20, opacity: 0 }} 
              animate={{ y: 0, opacity: 1 }} 
              transition={{ delay: 1.3, duration: 0.8 }} 
              className="mt-10 flex flex-wrap items-center justify-center gap-5"
            >
              <motion.a 
                whileHover={{ 
                  scale: 1.05, 
                  boxShadow: "0 10px 30px -5px rgba(0, 0, 0, 0.3)" 
                }}
                whileTap={{ scale: 0.98 }}
                href="#rsvp" 
                className="rounded-full bg-gold px-8 py-4 font-medium text-neutral-900 shadow-2xl shadow-black/30 hover:brightness-105 transition-all duration-300 relative group overflow-hidden"
              >
                <span className="relative z-10">Confirmar asistencia</span>
                <div className="absolute inset-0 bg-gradient-to-r from-amber-200 to-gold opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </motion.a>
              
              <motion.a 
                whileHover={{ 
                  scale: 1.05, 
                  backgroundColor: "rgba(255, 255, 255, 0.15)" 
                }}
                whileTap={{ scale: 0.98 }}
                href="#galeria" 
                className="rounded-full border border-white/40 px-8 py-4 text-white hover:bg-white/10 transition-all duration-300 relative group overflow-hidden"
              >
                <span className="relative z-10">Ver galería</span>
                <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </motion.a>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Flecha de scroll down */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.0 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="flex flex-col items-center"
        >
          <span className="text-white/70 text-sm mb-2">Scroll</span>
          <svg width="30" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 5V19M12 19L19 12M12 19L5 12" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </motion.div>
      </motion.div>
    </section>
  )
}