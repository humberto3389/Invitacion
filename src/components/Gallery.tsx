import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, EffectCreative, Pagination } from 'swiper/modules'
import 'swiper/swiper-bundle.css'
import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import { motion } from 'framer-motion'

type Photo = { name: string; publicUrl: string }

export default function Gallery() {
  const [images, setImages] = useState<Photo[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let ignore = false
    async function listFolder(prefix: string) {
      const { data, error } = await supabase.storage.from('gallery').list(prefix, { 
        limit: 100, 
        sortBy: { column: 'created_at', order: 'desc' } 
      })
      if (error) { 
        console.error('list error', error); 
        return [] as string[] 
      }
      const files = (data || []) as Array<{ name: string }>
      return files
        .map((f) => (prefix ? `${prefix}/${f.name}` : f.name))
        .filter((p) => p && !p.endsWith('/'))
    }

    async function getSignedUrls(paths: string[]) {
      // Procesar en lotes de 5 para no sobrecargar
      const results: Photo[] = []
      const batchSize = 5
      for (let i = 0; i < paths.length; i += batchSize) {
        const batch = paths.slice(i, i + batchSize)
        const promises = batch.map(p => 
          supabase.storage.from('gallery').createSignedUrl(p, 60 * 60 * 12)
            .then(({data, error}) => {
              if (error) {
                console.error('signed url error', error)
                return null
              }
              return { name: p, publicUrl: data.signedUrl }
            })
        )
        const batchResults = await Promise.all(promises)
        results.push(...batchResults.filter((r): r is Photo => r !== null))
        
        // Pequeña pausa entre lotes para no sobrecargar
        if (i + batchSize < paths.length) {
          await new Promise(resolve => setTimeout(resolve, 100))
        }
      }
      return results
    }

    async function load() {
      setLoading(true)
      try {
        // lista raíz y carpeta uploads/
        const [rootPaths, uploadPaths] = await Promise.all([
          listFolder(''),
          listFolder('uploads'),
        ])
        const allPaths = [...rootPaths, ...uploadPaths]
        const photos = await getSignedUrls(allPaths)
        if (!ignore) setImages(photos)
      } catch (error) {
        console.error('Error loading images:', error)
      } finally {
        if (!ignore) setLoading(false)
      }
    }

    load()
    return () => { ignore = true }
  }, [])

  if (loading) {
    return (
      <div className="rounded-3xl overflow-hidden aspect-[16/9] bg-gradient-to-br from-neutral-50 to-white border border-white/30 shadow-2xl shadow-black/10 grid place-items-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center p-8"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
            className="w-12 h-12 border-4 border-gold/30 border-t-gold rounded-full mx-auto mb-4"
          />
          <p className="text-neutral-500 font-light">Cargando galería...</p>
        </motion.div>
      </div>
    )
  }

  if (!images.length) {
    return (
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-3xl overflow-hidden aspect-[16/9] bg-gradient-to-br from-neutral-50 to-white border border-white/30 shadow-2xl shadow-black/10 grid place-items-center relative"
      >
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmNWY1ZjUiIj48cGF0aCBkPSJNMzYgMzRjMC0xLjEwNC0uODk2LTItMi0ycy0yIC44OTYtMiAyIC44OTYgMiAyIDIgMi0uODk2IDItMnptLTItMTJjLTEuMTA0IDAtMiAuODk2LTIgMnMuODk2IDIgMiAyIDItLjg5NiAyLTItLjg5Ni0yLTItMnptMCA2Yy0yLjIwOSAwLTQgMS43OTEtNCA0aDhjMC0yLjIwOS0xLjc5MS00LTQtNHoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-10" />
        
        <div className="text-center p-8 relative z-10">
          <svg className="w-16 h-16 mx-auto text-neutral-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
          </svg>
          <h3 className="text-lg font-medium text-neutral-600 mb-2">Galería vacía</h3>
          <p className="text-neutral-500 font-light">Sube tus fotos en /admin</p>
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
      className="rounded-3xl overflow-hidden shadow-2xl shadow-black/10 border border-white/30 relative group"
    >
      {/* Efecto de borde luminoso sutil */}
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-gold/5 to-rose-500/5 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      <Swiper
        modules={[Autoplay, EffectCreative, Pagination]}
        effect={'creative'}
        creativeEffect={{
          prev: {
            shadow: false,
            translate: ['-100%', 0, -200],
          },
          next: {
            shadow: false,
            translate: ['100%', 0, -200],
          },
        }}
        loop={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: true,
          pauseOnMouseEnter: true,
        }}
        speed={800}
        watchSlidesProgress={true}
        pagination={{
          clickable: true,
          el: '.custom-pagination',
          bulletClass: 'custom-bullet',
          bulletActiveClass: 'custom-bullet-active',
          renderBullet: function (className) {
            return `<span class="${className}">
              <span class="bullet-progress"></span>
            </span>`;
          }
        }}
        breakpoints={{
          320: {
            creativeEffect: {
              prev: { translate: ['-100%', 0, -100] },
              next: { translate: ['100%', 0, -100] }
            }
          },
          640: {
            creativeEffect: {
              prev: { translate: ['-100%', 0, -200] },
              next: { translate: ['100%', 0, -200] }
            }
          }
        }}
        className="aspect-[16/9] relative"
      >
        {/* Fondo parallax para efecto de profundidad */}
        <div slot="container-start" className="parallax-bg" data-swiper-parallax="-23%"></div>
        
        {images.map((p, i) => (
          <SwiperSlide key={i} className="relative">
            {/* Overlay con gradiente suave */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent z-10" />
            
            {/* Imagen con efecto parallax */}
            <div 
              className="h-full w-full relative overflow-hidden"
              data-swiper-parallax="-30%"
            >
              <img 
                src={p.publicUrl} 
                alt={p.name}
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover transform transition-transform duration-700 group-hover:scale-105 sm:group-hover:scale-105" 
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 1200px"
              />
            </div>
            
            {/* Información de la imagen con efecto glassmorphism */}
            <div 
              className="absolute bottom-3 sm:bottom-6 left-3 sm:left-6 z-20 bg-black/20 backdrop-blur-md rounded-xl sm:rounded-2xl p-2 sm:p-4 border border-white/10 shadow-lg transform transition-transform duration-500 hover:translate-y-[-5px] max-w-[calc(100%-24px)]"
              data-swiper-parallax="-100"
              data-swiper-parallax-duration="800"
            >
              <h3 className="text-white text-sm sm:text-lg font-light mb-0.5 sm:mb-1 truncate">Momento especial</h3>
              <p className="text-white/80 text-xs sm:text-sm">Foto {i+1} de {images.length}</p>
            </div>
          </SwiperSlide>
        ))}
        
        {/* Contador personalizado con glassmorphism */}
        <div className="absolute top-3 sm:top-6 right-3 sm:right-6 z-20 bg-black/30 text-white text-xs sm:text-sm px-2 sm:px-3 py-1 sm:py-1.5 rounded-full backdrop-blur-md border border-white/10">
          <span className="swiper-pagination-current font-medium"></span> 
          <span className="mx-1">/</span> 
          <span className="swiper-pagination-total"></span>
        </div>
        
        {/* Flechas de navegación personalizadas */}
        <div className="absolute left-2 sm:left-6 bottom-1/2 transform translate-y-1/2 z-20 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-300">
          <button className="swiper-button-prev-custom bg-black/30 hover:bg-black/50 backdrop-blur-md rounded-full w-8 h-8 sm:w-12 sm:h-12 flex items-center justify-center border border-white/10 transition-colors duration-300">
            <svg className="w-4 h-4 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
            </svg>
          </button>
        </div>
        
        <div className="absolute right-2 sm:right-6 bottom-1/2 transform translate-y-1/2 z-20 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-300">
          <button className="swiper-button-next-custom bg-black/30 hover:bg-black/50 backdrop-blur-md rounded-full w-8 h-8 sm:w-12 sm:h-12 flex items-center justify-center border border-white/10 transition-colors duration-300">
            <svg className="w-4 h-4 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
            </svg>
          </button>
        </div>
      </Swiper>
      
      {/* Paginación personalizada con efecto de progreso */}
      <div className="custom-pagination absolute bottom-4 left-1/2 transform -translate-x-1/2 z-20 flex space-x-2"></div>
      
      {/* Estilos personalizados para la paginación */}
      <style>{`
        .custom-bullet {
          width: 30px;
          height: 4px;
          background: rgba(255, 255, 255, 0.3);
          border-radius: 2px;
          overflow: hidden;
          cursor: pointer;
          position: relative;
          transition: all 0.3s ease;
          margin: 0 3px;
        }
        
        .custom-bullet-active {
          background: rgba(255, 255, 255, 0.5);
        }
        
        .custom-bullet-active .bullet-progress {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          height: 100%;
          width: 0%;
          background: white;
          animation: progress 4.5s linear;
        }
        
        @keyframes progress {
          0% { width: 0%; }
          100% { width: 100%; }
        }
      `}</style>
    </motion.div>
  )
}