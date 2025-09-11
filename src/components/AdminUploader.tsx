import { useRef, useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'

type GalleryImage = {
  name: string
  url: string
  created_at: string
}

export default function AdminUploader() {
  const inputRef = useRef<HTMLInputElement | null>(null)
  const [uploading, setUploading] = useState(false)
  const [deleting, setDeleting] = useState<string | null>(null)
  const [message, setMessage] = useState<string | null>(null)
  const [images, setImages] = useState<GalleryImage[]>([])
  const [loading, setLoading] = useState(true)

  async function onPick() {
    inputRef.current?.click()
  }

  // Cargar imágenes existentes
  useEffect(() => {
    loadImages()
  }, [])

  async function loadImages() {
    try {
      setLoading(true)
      const { data, error } = await supabase.storage.from('gallery').list('', {
        limit: 100,
        sortBy: { column: 'created_at', order: 'desc' }
      })
      if (error) throw error
      
      const imageList: GalleryImage[] = []
      for (const file of data || []) {
        const { data: urlData } = supabase.storage.from('gallery').getPublicUrl(file.name)
        imageList.push({
          name: file.name,
          url: urlData.publicUrl,
          created_at: file.created_at || ''
        })
      }
      setImages(imageList)
    } catch (err: any) {
      setMessage('Error cargando imágenes: ' + (err?.message || ''))
    } finally {
      setLoading(false)
    }
  }

  async function onFilesSelected(e: any) {
    const files = Array.from(e.target.files || [])
    if (!files.length) return
    setUploading(true)
    setMessage(null)
    try {
      for (const file of files as File[]) {
        const ext = file.name.split('.').pop()
        const fileName = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`
        const { error } = await supabase.storage.from('gallery').upload(fileName, file, { cacheControl: '3600', upsert: false })
        if (error) throw error
      }
      setMessage('Imágenes subidas correctamente.')
      await loadImages() // Recargar la lista
    } catch (err: any) {
      setMessage('Error subiendo imágenes: ' + (err?.message || ''))
    } finally {
      setUploading(false)
      if (inputRef.current) inputRef.current.value = ''
    }
  }

  async function deleteImage(imageName: string) {
    if (!confirm('¿Estás seguro de que quieres eliminar esta imagen?')) return
    
    try {
      setDeleting(imageName)
      setMessage(null)
      const { error } = await supabase.storage.from('gallery').remove([imageName])
      if (error) throw error
      
      setMessage('Imagen eliminada correctamente.')
      await loadImages() // Recargar la lista
    } catch (err: any) {
      setMessage('Error eliminando imagen: ' + (err?.message || ''))
    } finally {
      setDeleting(null)
    }
  }

  return (
    <div className="space-y-6">
      {/* Sección de subida */}
      <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-neutral-100">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h3 className="font-display text-xl">Subir imágenes a la galería</h3>
            <p className="text-sm text-neutral-500">Bucket: gallery (público)</p>
          </div>
          <div className="flex items-center gap-3">
            <input ref={inputRef} type="file" accept="image/*" multiple className="hidden" onChange={onFilesSelected} />
            <button onClick={onPick} disabled={uploading} className="rounded-xl bg-neutral-900 px-4 py-2 text-white disabled:opacity-60">
              {uploading ? 'Subiendo...' : 'Elegir imágenes'}
            </button>
          </div>
        </div>
        {message && <p className="mt-3 text-sm text-neutral-600">{message}</p>}
      </div>

      {/* Sección de gestión de imágenes */}
      <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-neutral-100">
        <div className="flex items-center justify-between gap-4 mb-4">
          <h3 className="font-display text-xl">Gestionar imágenes ({images.length})</h3>
          <button 
            onClick={loadImages} 
            disabled={loading}
            className="rounded-xl border border-neutral-300 px-4 py-2 text-neutral-700 hover:bg-neutral-50 disabled:opacity-60"
          >
            {loading ? 'Cargando...' : 'Actualizar'}
          </button>
        </div>
        
        {loading ? (
          <div className="text-center py-8">
            <div className="w-8 h-8 border-4 border-neutral-300 border-t-neutral-900 rounded-full mx-auto mb-4 animate-spin" />
            <p className="text-neutral-500">Cargando imágenes...</p>
          </div>
        ) : images.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-neutral-500">No hay imágenes en la galería</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {images.map((image) => (
              <div key={image.name} className="relative group">
                <div className="aspect-square rounded-lg overflow-hidden bg-neutral-100">
                  <img 
                    src={image.url} 
                    alt={image.name}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                <button
                  onClick={() => deleteImage(image.name)}
                  disabled={deleting === image.name}
                  className="absolute top-2 right-2 w-8 h-8 bg-red-500 hover:bg-red-600 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity disabled:opacity-50 flex items-center justify-center text-sm font-bold"
                  title="Eliminar imagen"
                >
                  {deleting === image.name ? '...' : '×'}
                </button>
                <div className="mt-2 text-xs text-neutral-500 truncate" title={image.name}>
                  {image.name}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}


