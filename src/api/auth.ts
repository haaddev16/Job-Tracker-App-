import { api, setToken } from '@/api/client'
import type { User } from '@/types'

type TokenOut = {
  access_token: string
  token_type: string
  user: User
}

export async function signup(name: string, email: string, password: string) {
  const data = await api<TokenOut>('/api/auth/signup', {
    method: 'POST',
    body: JSON.stringify({ name, email, password }),
  })
  setToken(data.access_token)
  return data.user
}

export async function login(email: string, password: string) {
  const data = await api<TokenOut>('/api/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  })
  setToken(data.access_token)
  return data.user
}

export async function logout() {
  try {
    await api('/api/auth/logout', { method: 'POST' })
  } finally {
    setToken(null)
  }
}

export async function forgotPassword(email: string) {
  return api<{ message: string; reset_token?: string }>('/api/auth/forgot-password', {
    method: 'POST',
    body: JSON.stringify({ email }),
  })
}

export async function getMe() {
  return api<User>('/api/auth/me')
}

export async function updateMe(body: { name?: string; email?: string; password?: string }) {
  return api<User>('/api/auth/me', {
    method: 'PATCH',
    body: JSON.stringify(body),
  })
}

export async function deleteMe() {
  await api('/api/auth/me', { method: 'DELETE' })
  setToken(null)
}
