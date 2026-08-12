const TOKEN_KEY = 'job-tracker-token'

const LOCAL_API = 'http://127.0.0.1:8000'
const PRODUCTION_API = 'https://job-tracker-app-production-9485.up.railway.app'

/**
 * API base URL resolution (no trailing slash):
 * 1. VITE_API_URL (Vercel / preferred)
 * 2. VITE_API_BASE_URL (legacy env name)
 * 3. Local default only in Vite dev mode
 * 4. Production Railway URL as final deploy safety net
 */
function resolveApiBase(): string {
  const fromEnv =
    import.meta.env.VITE_API_URL ||
    import.meta.env.VITE_API_BASE_URL ||
    ''

  const trimmed = String(fromEnv).trim().replace(/\/$/, '')
  if (trimmed) return trimmed

  if (import.meta.env.DEV) return LOCAL_API
  return PRODUCTION_API
}

export const API_BASE = resolveApiBase()

/** Build absolute API URL — never a same-origin relative path in production. */
export function apiUrl(path: string): string {
  if (path.startsWith('http://') || path.startsWith('https://')) return path
  const normalized = path.startsWith('/') ? path : `/${path}`
  return `${API_BASE}${normalized}`
}

export function getToken(): string | null {
  return localStorage.getItem(TOKEN_KEY)
}

export function setToken(token: string | null) {
  if (token) localStorage.setItem(TOKEN_KEY, token)
  else localStorage.removeItem(TOKEN_KEY)
}

export class ApiError extends Error {
  status: number
  constructor(status: number, message: string) {
    super(message)
    this.status = status
  }
}

export async function api<T>(
  path: string,
  options: RequestInit = {},
): Promise<T> {
  const headers = new Headers(options.headers)
  if (!headers.has('Content-Type') && options.body) {
    headers.set('Content-Type', 'application/json')
  }
  const token = getToken()
  if (token) headers.set('Authorization', `Bearer ${token}`)

  const url = apiUrl(path)
  const res = await fetch(url, { ...options, headers })
  const text = await res.text()
  const data = text ? JSON.parse(text) : null

  if (!res.ok) {
    const msg =
      (data && (data.detail || data.error || data.message)) ||
      res.statusText ||
      'Request failed'
    const detail = Array.isArray(msg) ? msg.map((m) => m.msg || m).join(', ') : String(msg)
    throw new ApiError(res.status, detail)
  }
  return data as T
}
