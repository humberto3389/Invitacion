import { useRef, useState } from 'react'
import { supabase } from '../lib/supabase'

export default function AdminUploader() {
  const inputRef = useRef<HTMLInputElement | null>(null)
  const [uploading, setUploading] = useState(false)
  const [message, setMessage] = useState<string | null>(null)

  async function onPick() {
    inputRef.current?.click()
  }

  async function onFilesSelected(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files || [])
    if (!files.length) return
    setUploading(true)
    setMessage(null)
    try {
      for (const file of files) {
        const ext = file.name.split('.').pop()
        const fileName = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`
        const { error } = await supabase.storage.from('gallery').upload(fileName, file, { cacheControl: '3600', upsert: false })
        if (error) throw error
      }
      setMessage('Imágenes subidas correctamente.')
    } catch (err: any) {
      setMessage('Error subiendo imágenes: ' + (err?.message || ''))
    } finally {
      setUploading(false)
      if (inputRef.current) inputRef.current.value = ''
    }
  }

  return (
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
  )
}


