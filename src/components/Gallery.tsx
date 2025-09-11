import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'

type Photo = { name: string; publicUrl: string }

export default function Gallery() {
  const [images, setImages] = useState<Photo[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedImage, setSelectedImage] = useState<number | null>(null)

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
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="aspect-square bg-gradient-to-br from-neutral-100 to-neutral-200 rounded-2xl animate-pulse">
            <div className="w-full h-full flex items-center justify-center">
              <div className="w-8 h-8 border-2 border-gold/30 border-t-gold rounded-full animate-spin" />
            </div>
          </div>
        ))}
      </div>
    )
  }

  if (!images.length) {
    return (
      <div className="text-center py-16">
        <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-gold/20 to-gold/10 rounded-full flex items-center justify-center">
          <svg className="w-12 h-12 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
          </svg>
        </div>
        <h3 className="font-brush text-3xl text-neutral-600 mb-2">Galería vacía</h3>
        <p className="text-neutral-500 font-serif">Sube tus fotos en /admin</p>
      </div>
    )
  }

  const openLightbox = (index: number) => {
    setSelectedImage(index)
  }

  const closeLightbox = () => {
    setSelectedImage(null)
  }

  const nextImage = () => {
    if (selectedImage !== null) {
      setSelectedImage((selectedImage + 1) % images.length)
    }
  }

  const prevImage = () => {
    if (selectedImage !== null) {
      setSelectedImage(selectedImage === 0 ? images.length - 1 : selectedImage - 1)
    }
  }

  return (
    <>
      {/* Grid de imágenes */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {images.map((photo, index) => (
          <div
            key={index}
            className="group relative aspect-square overflow-hidden rounded-2xl bg-gradient-to-br from-neutral-100 to-neutral-200 cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
            onClick={() => openLightbox(index)}
          >
            <img
              src={photo.publicUrl}
              alt={`Foto ${index + 1}`}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
              loading="lazy"
              decoding="async"
            />
            
            {/* Overlay con efecto hover */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            
            {/* Icono de expansión */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="bg-white/20 backdrop-blur-md rounded-full p-3 border border-white/30">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                </svg>
              </div>
            </div>
            
            {/* Número de foto */}
            <div className="absolute top-3 right-3 bg-black/50 backdrop-blur-md text-white text-xs px-2 py-1 rounded-full border border-white/20">
              {index + 1}
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {selectedImage !== null && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4">
          {/* Botón cerrar */}
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 z-60 bg-black/50 hover:bg-black/70 text-white rounded-full p-3 transition-colors duration-200"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Navegación anterior */}
          <button
            onClick={prevImage}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 z-60 bg-black/50 hover:bg-black/70 text-white rounded-full p-3 transition-colors duration-200"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Navegación siguiente */}
          <button
            onClick={nextImage}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 z-60 bg-black/50 hover:bg-black/70 text-white rounded-full p-3 transition-colors duration-200"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Imagen principal */}
          <div className="relative max-w-4xl max-h-full">
            <img
              src={images[selectedImage].publicUrl}
              alt={`Foto ${selectedImage + 1}`}
              className="max-w-full max-h-[80vh] object-contain rounded-lg shadow-2xl"
            />
            
            {/* Información de la imagen */}
            <div className="absolute bottom-4 left-4 right-4 bg-black/50 backdrop-blur-md text-white p-4 rounded-lg border border-white/20">
              <h3 className="font-brush text-2xl mb-1">Momento especial</h3>
              <p className="text-sm opacity-80">Foto {selectedImage + 1} de {images.length}</p>
            </div>
          </div>

          {/* Indicadores de posición */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`w-2 h-2 rounded-full transition-all duration-200 ${
                  index === selectedImage ? 'bg-white' : 'bg-white/40 hover:bg-white/60'
                }`}
              />
            ))}
          </div>
        </div>
      )}
    </>
  )
}