import { useCallback, useState } from 'react'
import {
  createApplication,
  deleteApplication,
  listApplications,
  updateApplication,
  type AppPayload,
} from '@/api/applications'
import type { Application, Status } from '@/types'

export function useApps() {
  const [apps, setApps] = useState<Application[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const refresh = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await listApplications()
      setApps(data)
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to load')
      throw e
    } finally {
      setLoading(false)
    }
  }, [])

  const saveApp = useCallback(async (data: AppPayload & { id?: string }) => {
    if (data.id) {
      const { id, ...rest } = data
      const updated = await updateApplication(id, rest)
      setApps((prev) => prev.map((a) => (a.id === id ? updated : a)))
      return updated
    }
    const created = await createApplication(data)
    setApps((prev) => [created, ...prev])
    return created
  }, [])

  const removeApp = useCallback(async (id: string) => {
    await deleteApplication(id)
    setApps((prev) => prev.filter((a) => a.id !== id))
  }, [])

  const moveApp = useCallback(async (id: string, status: Status, prevStatus: Status) => {
    setApps((list) => list.map((a) => (a.id === id ? { ...a, status } : a)))
    try {
      const updated = await updateApplication(id, { status })
      setApps((list) => list.map((a) => (a.id === id ? updated : a)))
    } catch (e) {
      setApps((list) => list.map((a) => (a.id === id ? { ...a, status: prevStatus } : a)))
      throw e
    }
  }, [])

  return { apps, setApps, loading, error, refresh, saveApp, removeApp, moveApp }
}
