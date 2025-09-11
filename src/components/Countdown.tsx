import { useEffect, useMemo, useState } from 'react'

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
      {/* Título */}
      <div className="text-center mb-12">
        <p className="text-neutral-500 font-serif">Para nuestro día especial</p>
        <div className="mx-auto mt-4 h-1 w-16 bg-gradient-to-r from-gold/70 to-rose-400/70 rounded-full"></div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-5 text-center">
        {items.map((it, index) => (
          <div 
            key={it.label}
            className="relative group"
          >
            {/* Efecto de brillo al pasar el mouse */}
            <div className="absolute inset-0 bg-gradient-to-br from-gold/10 to-rose-400/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-md group-hover:blur-lg"></div>
            
            {/* Tarjeta principal optimizada */}
            <div className="relative rounded-2xl bg-white/80 backdrop-blur-md border border-white/30 p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
              
              {/* Contenedor del número */}
              <div className="h-20 flex items-center justify-center">
                <span className="text-5xl font-bold text-neutral-800 tabular-nums font-serif">
                  {String(it.value).padStart(2, '0')}
                </span>
              </div>
              
              {/* Etiqueta */}
              <div className="text-neutral-600 text-sm font-medium mt-3 tracking-wider uppercase font-serif">
                {it.label}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Mensaje inspirador */}
      <div className="text-center mt-12">
        <p className="text-neutral-500 italic font-light font-script text-lg">
          "Cada segundo nos acerca a nuestro eterno comienzo"
        </p>
      </div>
    </div>
  )
}