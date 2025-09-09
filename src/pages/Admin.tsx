import { useEffect, useMemo, useState } from 'react'
import { supabase } from '../lib/supabase'
import AdminUploader from '../components/AdminUploader'

type RSVP = { name: string; email: string; phone?: string; guests: number; createdAt?: any }
type Message = { name: string; message: string; createdAt?: any }

function toDate(ts?: any) {
  try { return ts?.toDate?.() as Date | undefined } catch { return undefined }
}

export default function Admin() {
  const [authed, setAuthed] = useState(() => sessionStorage.getItem('adminAuthed') === 'true')
  const [pass, setPass] = useState('')
  const expectedPass = (import.meta as any).env.VITE_ADMIN_PASS as string | undefined
  const [rsvps, setRsvps] = useState<RSVP[]>([])
  const [messages, setMessages] = useState<Message[]>([])
  const totalGuests = useMemo(() => rsvps.reduce((a, r) => a + (Number(r.guests) || 0), 0), [rsvps])

  useEffect(() => {
    if (!authed) return
    (async () => {
      const { data: rData } = await supabase.from('rsvps').select('*').order('created_at', { ascending: false })
      setRsvps((rData as any) || [])
      const { data: mData } = await supabase.from('messages').select('*').order('created_at', { ascending: false })
      setMessages((mData as any) || [])
    })()
  }, [authed])

  // Limpiar el campo de contraseña cuando se vuelve al login
  useEffect(() => {
    if (!authed) setPass('')
  }, [authed])

  function downloadCSV(filename: string, rows: Array<Record<string, unknown>>) {
    const headers = Array.from(new Set(rows.flatMap((r) => Object.keys(r))))
    const csv = [headers.join(','), ...rows.map((r) => headers.map((h) => JSON.stringify((r as any)[h] ?? '')).join(','))].join('\n')
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = filename
    a.click()
    URL.revokeObjectURL(url)
  }

  if (!authed) {
    return (
      <div className="min-h-screen grid place-items-center px-6">
        <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-sm ring-1 ring-neutral-100">
          <h1 className="font-display text-2xl mb-4 text-center">Acceso administrador</h1>
          <div className="grid gap-3">
            <input
              type="password"
              placeholder="Contraseña"
              autoComplete="new-password"
              className="w-full rounded-xl border-neutral-300 focus:border-neutral-400 focus:ring-0"
              value={pass}
              onChange={(e) => setPass(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter') (e.currentTarget.nextSibling as HTMLButtonElement)?.click() }}
            />
            <button
              className="rounded-xl bg-neutral-900 px-4 py-2 text-white hover:bg-neutral-800"
              onClick={() => {
                if (!expectedPass) {
                  alert('Configura VITE_ADMIN_PASS en .env.local')
                  return
                }
                if (pass === expectedPass) {
                  sessionStorage.setItem('adminAuthed', 'true')
                  setAuthed(true)
                } else {
                  alert('Contraseña incorrecta')
                }
              }}
            >
              Ingresar
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-6xl px-6 py-10">
      <div className="mb-6 flex items-center justify-between gap-4">
        <h1 className="font-display text-3xl">Panel de Administración</h1>
        <button
          className="rounded-xl border border-neutral-300 px-4 py-2 text-neutral-700 hover:bg-neutral-50"
          onClick={() => { sessionStorage.removeItem('adminAuthed'); setAuthed(false) }}
        >
          Cerrar sesión
        </button>
      </div>

      <div className="mb-8">
        <AdminUploader />
      </div>

      <div className="grid gap-6 sm:grid-cols-3 mb-10">
        <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-neutral-100">
          <div className="text-sm text-neutral-500">RSVPs recibidos</div>
          <div className="mt-2 text-3xl font-bold">{rsvps.length}</div>
        </div>
        <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-neutral-100">
          <div className="text-sm text-neutral-500">Total invitados confirmados</div>
          <div className="mt-2 text-3xl font-bold">{totalGuests}</div>
        </div>
        <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-neutral-100">
          <div className="text-sm text-neutral-500">Mensajes</div>
          <div className="mt-2 text-3xl font-bold">{messages.length}</div>
        </div>
      </div>

      <div className="flex items-center justify-between mb-4">
        <h2 className="font-display text-2xl">Confirmaciones (RSVP)</h2>
        <button className="rounded-xl bg-neutral-900 px-4 py-2 text-white" onClick={() => downloadCSV('rsvps.csv', rsvps as any)}>Exportar CSV</button>
      </div>
      <div className="overflow-x-auto rounded-2xl bg-white shadow-sm ring-1 ring-neutral-100 mb-10">
        <table className="min-w-full text-sm">
          <thead className="bg-neutral-50 text-neutral-600">
            <tr>
              <th className="px-4 py-3 text-left">Nombre</th>
              <th className="px-4 py-3 text-left">Email</th>
              <th className="px-4 py-3 text-left">Teléfono</th>
              <th className="px-4 py-3 text-left">Acompañantes</th>
              <th className="px-4 py-3 text-left">Fecha</th>
            </tr>
          </thead>
          <tbody>
            {rsvps.map((r, i) => (
              <tr key={i} className="odd:bg-white even:bg-neutral-50">
                <td className="px-4 py-3">{r.name}</td>
                <td className="px-4 py-3">{r.email}</td>
                <td className="px-4 py-3">{r.phone || '-'}</td>
                <td className="px-4 py-3">{r.guests}</td>
                <td className="px-4 py-3">{(r as any).created_at ? new Date((r as any).created_at).toLocaleString() : '-'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between mb-4">
        <h2 className="font-display text-2xl">Mensajes</h2>
        <button className="rounded-xl bg-neutral-900 px-4 py-2 text-white" onClick={() => downloadCSV('messages.csv', messages as any)}>Exportar CSV</button>
      </div>
      <div className="overflow-x-auto rounded-2xl bg-white shadow-sm ring-1 ring-neutral-100">
        <table className="min-w-full text-sm">
          <thead className="bg-neutral-50 text-neutral-600">
            <tr>
              <th className="px-4 py-3 text-left">Nombre</th>
              <th className="px-4 py-3 text-left">Mensaje</th>
              <th className="px-4 py-3 text-left">Fecha</th>
            </tr>
          </thead>
          <tbody>
            {messages.map((m, i) => (
              <tr key={i} className="odd:bg-white even:bg-neutral-50">
                <td className="px-4 py-3">{m.name}</td>
                <td className="px-4 py-3 max-w-[600px]">{m.message}</td>
                <td className="px-4 py-3">{(m as any).created_at ? new Date((m as any).created_at).toLocaleString() : '-'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}


