import { useEffect, useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

function getTimeParts(target: Date) {
  const now = new Date().getTime()
  const diff = Math.max(0, target.getTime() - now)
  const days = Math.floor(diff / (1000 * 60 * 60 * 24))
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24)
  const minutes = Math.floor((diff / (1000 * 60)) % 60)
  const seconds = Math.floor((diff / 1000) % 60)
  return { days, hours, minutes, seconds }
}

export default function Countdown({ date }: { date: string }) {
  const target = useMemo(() => new Date(date), [date])
  const [time, setTime] = useState(() => getTimeParts(target))
  const [prevTime, setPrevTime] = useState(time)

  useEffect(() => {
    const id = setInterval(() => {
      setPrevTime(time)
      setTime(getTimeParts(target))
    }, 1000)
    return () => clearInterval(id)
  }, [target, time])

  const items = [
    { label: 'Días', value: time.days, prev: prevTime.days },
    { label: 'Horas', value: time.hours, prev: prevTime.hours },
    { label: 'Minutos', value: time.minutes, prev: prevTime.minutes },
    { label: 'Segundos', value: time.seconds, prev: prevTime.seconds },
  ]

  return (
    <div className="max-w-4xl mx-auto">
      {/* Título con animación */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <p className="text-neutral-500">Para nuestro día especial</p>
        <div className="mx-auto mt-4 h-1 w-16 bg-gradient-to-r from-gold/70 to-rose-400/70 rounded-full"></div>
      </motion.div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-5 text-center">
        {items.map((it, index) => (
          <motion.div 
            key={it.label}
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: index * 0.1 + 0.3, duration: 0.5 }}
            className="relative group"
          >
            {/* Efecto de brillo al pasar el mouse */}
            <div className="absolute inset-0 bg-gradient-to-br from-gold/10 to-rose-400/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-md group-hover:blur-lg"></div>
            
            {/* Tarjeta principal con glassmorphism */}
            <div className="relative rounded-2xl bg-white/80 backdrop-blur-md border border-white/30 p-6 shadow-lg shadow-black/5 hover:shadow-xl hover:shadow-black/10 transition-all duration-300 overflow-hidden">
              
              {/* Efecto de borde luminoso sutil */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-gold/5 to-rose-400/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              {/* Contenedor del número con perspectiva 3D */}
              <div className="relative z-10 h-20 flex items-center justify-center perspective-1000">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={it.value}
                    initial={{ 
                      y: -40, 
                      opacity: 0,
                      rotateX: -90,
                    }}
                    animate={{ 
                      y: 0, 
                      opacity: 1,
                      rotateX: 0,
                    }}
                    exit={{ 
                      y: 40, 
                      opacity: 0,
                      rotateX: 90,
                    }}
                    transition={{ duration: 0.5 }}
                    className="absolute inset-0 flex items-center justify-center"
                  >
                    <span className="text-5xl font-bold text-neutral-800 tabular-nums bg-gradient-to-br from-neutral-800 to-neutral-700 bg-clip-text text-transparent">
                      {String(it.value).padStart(2, '0')}
                    </span>
                  </motion.div>
                </AnimatePresence>
              </div>
              
              {/* Etiqueta */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.1 + 0.6 }}
                className="text-neutral-600 text-sm font-medium mt-3 tracking-wider uppercase relative z-10"
              >
                {it.label}
              </motion.div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Mensaje inspirador que aparece después de la animación inicial */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="text-center mt-12"
      >
        <p className="text-neutral-500 italic font-light">
          "Cada segundo nos acerca a nuestro eterno comienzo"
        </p>
      </motion.div>
    </div>
  )
}