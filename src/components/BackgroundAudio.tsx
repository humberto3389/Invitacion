import { useEffect, useRef, useState } from 'react'
import { Howl } from 'howler'

export default function BackgroundAudio({ src }: { src: string }) {
  const soundRef = useRef<Howl | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [needsUnlock, setNeedsUnlock] = useState(false)
  const soundIdRef = useRef<number | null>(null) // Referencia para el ID del sonido

  useEffect(() => {
    // Crear instancia: empezar silenciado e intentar autoplay
    soundRef.current = new Howl({ 
      src: [src], 
      loop: true, 
      volume: 0, 
      html5: true, 
      preload: false, // Cambiar a false para cargar solo cuando sea necesario
      onplay: (id) => {
        soundIdRef.current = id // Guardar el ID del sonido
        setIsPlaying(true)
        setNeedsUnlock(false)
        // Aplicar fade-in al ID específico del sonido
        if (soundRef.current && soundIdRef.current !== null) {
          // Desmutear antes del fade-in para navegadores que permiten unmute tras autoplay
          soundRef.current.mute(false)
          soundRef.current.fade(0, 0.5, 1500, soundIdRef.current)
        }
      }
    })

    // Forzar mute inicial para cumplir políticas de autoplay
    try {
      soundRef.current.mute(true)
    } catch {}

    const tryAutoPlay = async () => {
      try {
        if (!soundRef.current) return
        if (!soundRef.current.playing()) {
          soundRef.current.play()
        }
        // Comprobar tras un breve tiempo si realmente está reproduciendo
        setTimeout(() => {
          if (!soundRef.current) return
          const actuallyPlaying = soundRef.current.playing()
          if (!actuallyPlaying) {
            setNeedsUnlock(true)
          }
        }, 500)
        // Si logra reproducir, el onplay hará unmute + fade automáticamente
      } catch {
        // Bloqueado por política de autoplay
        setNeedsUnlock(true)
      }
    }

    // Intento inmediato
    void tryAutoPlay()

    // Desbloquear en primera interacción
    const unlock = () => { 
      // En el primer gesto del usuario, desmutear y hacer fade-in inmediatamente
      try {
        if (soundRef.current) {
          if (!soundRef.current.playing()) {
            soundRef.current.play()
          }
          soundRef.current.mute(false)
          if (soundIdRef.current !== null) {
            soundRef.current.fade(0, 0.5, 1000, soundIdRef.current)
          }
        }
      } catch {}
      removeListeners() 
    }
    
    const addListeners = () => {
      const opts: AddEventListenerOptions = { once: true }
      window.addEventListener('pointerdown', unlock, opts)
      window.addEventListener('click', unlock, opts)
      window.addEventListener('keydown', unlock, opts)
      window.addEventListener('scroll', unlock, opts)
      window.addEventListener('wheel', unlock, opts)
      window.addEventListener('mousemove', unlock, opts)
      window.addEventListener('touchstart', unlock, opts)
      document.addEventListener('visibilitychange', () => {
        if (document.visibilityState === 'visible') unlock()
      }, { once: true })
    }
    
    const removeListeners = () => {
      window.removeEventListener('pointerdown', unlock)
      window.removeEventListener('click', unlock)
      window.removeEventListener('keydown', unlock)
      window.removeEventListener('scroll', unlock)
      window.removeEventListener('wheel', unlock)
      window.removeEventListener('mousemove', unlock)
      window.removeEventListener('touchstart', unlock)
      // visibilitychange listener fue once: true, no es necesario remover manualmente
    }
    
    addListeners()

    return () => {
      removeListeners()
      soundRef.current?.unload()
    }
  }, [src])

  const toggle = () => {
    if (!soundRef.current) return
    
    if (soundRef.current.playing()) {
      // Aplicar fade-out antes de pausar
      if (soundIdRef.current !== null) {
        soundRef.current.fade(soundRef.current.volume(), 0, 1000, soundIdRef.current)
        setTimeout(() => {
          soundRef.current?.pause()
          setIsPlaying(false)
        }, 1000)
      } else {
        soundRef.current.pause()
        setIsPlaying(false)
      }
    } else {
      // No mostrar opción de reproducir manualmente si no fue bloqueado
      // Solo se dará en el caso de desbloqueo manual
      soundRef.current.mute(false)
      soundRef.current.play()
    }
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {needsUnlock && (
        <button
          onClick={toggle}
          className="mb-2 w-full rounded-full bg-gold px-4 py-2 text-neutral-900 shadow hover:brightness-95"
        >
          Activar sonido
        </button>
      )}
      {isPlaying && (
        <button
          onClick={toggle}
          className="rounded-full bg-neutral-900 text-white px-4 py-2 shadow hover:bg-neutral-800"
        >
          Pausar música
        </button>
      )}
    </div>
  )
}