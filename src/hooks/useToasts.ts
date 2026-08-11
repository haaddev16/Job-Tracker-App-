import { useCallback, useState } from 'react'
import { uid } from '@/utils/helpers'
import type { ToastItem } from '@/types'

export function useToasts() {
  const [toasts, setToasts] = useState<ToastItem[]>([])

  const dismiss = useCallback((id: string) => {
    setToasts((prev) => prev.map((t) => (t.id === id ? { ...t, leaving: true } : t)))
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id))
    }, 220)
  }, [])

  const addToast = useCallback(
    (message: string, type: ToastItem['type'] = 'success') => {
      const id = uid()
      setToasts((prev) => [...prev, { id, message, type }])
      setTimeout(() => {
        setToasts((prev) => prev.map((t) => (t.id === id ? { ...t, leaving: true } : t)))
        setTimeout(() => {
          setToasts((prev) => prev.filter((t) => t.id !== id))
        }, 220)
      }, 3200)
    },
    [],
  )

  return { toasts, addToast, dismiss }
}
