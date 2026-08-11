import { api } from '@/api/client'
import type { Application, Status } from '@/types'

export type AppPayload = {
  company: string
  role: string
  status?: Status
  appliedDate: string
  jobLink?: string
  notes?: string
  color?: string
}

export function listApplications() {
  return api<Application[]>('/api/applications')
}

export function createApplication(body: AppPayload) {
  return api<Application>('/api/applications', {
    method: 'POST',
    body: JSON.stringify(body),
  })
}

export function updateApplication(id: string, body: Partial<AppPayload>) {
  return api<Application>(`/api/applications/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(body),
  })
}

export function deleteApplication(id: string) {
  return api<{ message: string }>(`/api/applications/${id}`, {
    method: 'DELETE',
  })
}
